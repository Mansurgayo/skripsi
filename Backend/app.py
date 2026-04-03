from flask import Flask, request, jsonify
from flask_cors import CORS
from preprocessing import preprocess
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
import pickle
import numpy as np
import os
import sqlite3

app = Flask(__name__)
# Allow CORS for both production and local development
CORS(app, resources={
    r"/predict": {
        "origins": ["https://stress-chat-detector.vercel.app", "http://localhost:3002", "http://localhost:5173"],
        "methods": ["POST", "OPTIONS"],
        "allow_headers": "*"
    }
}, supports_credentials=True)

# Load model dan tokenizer dengan path absolut
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'model', 'model_lstm_stress.h5')
TOKENIZER_PATH = os.path.join(os.path.dirname(__file__), 'model', 'tokenizer_stress.pkl')

# Load model dengan error handling
try:
    print(f"Loading model from: {MODEL_PATH}")
    print(f"Loading tokenizer from: {TOKENIZER_PATH}")
    model = load_model(MODEL_PATH)
    print("Model loaded successfully!")
    with open(TOKENIZER_PATH, 'rb') as f:
        tokenizer = pickle.load(f)
    print("Tokenizer loaded successfully!")
except Exception as e:
    print(f"Error loading model/tokenizer: {str(e)}")
    raise

max_len = 100  # sesuai saat training

DB_PATH = os.path.join(os.path.dirname(__file__), 'stresslog.db')

def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS predictions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL,
        prediction TEXT NOT NULL,
        stress_percent REAL NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )''')
    conn.commit()
    conn.close()

init_db()

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        print("Received data:", data)
        text = data.get("text", "")
        if not text:
            return jsonify({"error": "Text input is required"}), 400

        print(f"Processing text: {text[:50]}...")
        cleaned_text = preprocess(text)
        print(f"Cleaned text: {cleaned_text[:50]}...")
        
        sequence = tokenizer.texts_to_sequences([cleaned_text])
        print(f"Sequence: {sequence}")
        padded = pad_sequences(sequence, maxlen=max_len)
        print(f"Padded shape: {padded.shape}")

        print("Running prediction...")
        prob = float(model.predict(padded, verbose=0)[0][0])
        print(f"Prediction probability: {prob}")
        
        prediction = "Negative" if prob < 0.5 else "Positive"
        stress_percent = float(round((1 - prob) * 100, 2))

        # Simpan ke database
        try:
            conn = sqlite3.connect(DB_PATH)
            c = conn.cursor()
            c.execute('INSERT INTO predictions (text, prediction, stress_percent) VALUES (?, ?, ?)',
                      (text, prediction, stress_percent))
            conn.commit()
            conn.close()
        except Exception as db_error:
            print(f"Database error (non-fatal): {db_error}")

        return jsonify({
            "prediction": prediction,
            "stress_percent": stress_percent
        })

    except Exception as e:
        import traceback
        error_trace = traceback.format_exc()
        print(f"Error in predict: {str(e)}")
        print(f"Traceback: {error_trace}")
        return jsonify({
            "error": str(e),
            "type": type(e).__name__
        }), 500

@app.route("/logs", methods=["GET"])
def get_logs():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('SELECT id, text, prediction, stress_percent, created_at FROM predictions ORDER BY created_at DESC')
    rows = c.fetchall()
    conn.close()
    logs = [
        {
            "id": row[0],
            "text": row[1],
            "prediction": row[2],
            "stress_percent": row[3],
            "created_at": row[4]
        } for row in rows
    ]
    return jsonify(logs)

@app.route("/logs/<int:log_id>", methods=["DELETE"])
def delete_log(log_id):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('DELETE FROM predictions WHERE id = ?', (log_id,))
    conn.commit()
    conn.close()
    return jsonify({"status": "deleted", "id": log_id})

@app.after_request
def add_cors_headers(response):
    # Allow localhost for development
    origin = request.headers.get('Origin', '')
    allowed_origins = ['https://stress-chat-detector.vercel.app', 'http://localhost:3002', 'http://localhost:5173']
    if origin in allowed_origins:
        response.headers.add('Access-Control-Allow-Origin', origin)
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'POST,OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Gunakan PORT dari Railway
    print(f"Starting Flask server on port {port}...")
    print(f"Model path: {MODEL_PATH}")
    print(f"Tokenizer path: {TOKENIZER_PATH}")
    app.run(debug=True, host="0.0.0.0", port=port)  # Set debug=True untuk melihat error detail