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
MODEL_CONFIG = {
    'multiclass': {
        'type': 'multiclass',
        'model_path': os.path.join(os.path.dirname(__file__), 'model_multiclas', 'vanilla_multiclass_best.h5'),
        'tokenizer_path': os.path.join(os.path.dirname(__file__), 'model_multiclas', 'tokenizer.pkl')
    },
    'binary': {
        'type': 'binary',
        'model_path': os.path.join(os.path.dirname(__file__), 'model_biner', 'bilstm_binary_best.h5'),
        'tokenizer_path': os.path.join(os.path.dirname(__file__), 'model_biner', 'tokenizer.pkl')
    }
}
# Dataset label order (index -> label):
# 0: Tidak Stres
# 1: Ringan
# 2: Sedang
# 3: Berat
# 4: Sangat Berat
MULTICLASS_LABELS = ['Tidak Stres', 'Ringan', 'Sedang', 'Berat', 'Sangat Berat']
models = {}
tokenizers = {}
model_types = {}


def detect_model_type(loaded_model, expected_type=None):
    output_shape = getattr(loaded_model, 'output_shape', None)
    if isinstance(output_shape, tuple) and len(output_shape) >= 2:
        last_dim = output_shape[-1]
        if last_dim == 1:
            return 'binary'
        if last_dim > 1:
            return 'multiclass'
    if expected_type:
        return expected_type
    return 'binary'

for model_name, config in MODEL_CONFIG.items():
    try:
        print(f"Loading model '{model_name}' from: {config['model_path']}")
        loaded_model = load_model(config['model_path'])
        with open(config['tokenizer_path'], 'rb') as f:
            loaded_tokenizer = pickle.load(f)
        models[model_name] = loaded_model
        tokenizers[model_name] = loaded_tokenizer
        detected_type = detect_model_type(loaded_model, config['type'])
        model_types[model_name] = detected_type
        if detected_type != config['type']:
            print(f"Warning: Model '{model_name}' was configured as '{config['type']}' but detected as '{detected_type}'.")
        print(f"Model '{model_name}' loaded successfully! (detected type: {detected_type})")
    except Exception as e:
        print(f"Warning: Failed to load model '{model_name}' or tokenizer: {str(e)}")

if not models:
    raise RuntimeError('No machine learning models could be loaded. Check model files and tokenizer files.')

DEFAULT_MODEL = 'binary' if 'binary' in models else next(iter(models))
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

        selected_model = data.get('model', DEFAULT_MODEL)
        if selected_model != 'both' and selected_model not in models:
            return jsonify({
                "error": f"Model '{selected_model}' is not available. Available models: {', '.join(models.keys())}, both"
            }), 400

        print(f"Processing text: {text[:50]}...")
        cleaned_text = preprocess(text)
        print(f"Cleaned text: {cleaned_text[:50]}...")

        def run_model_prediction(model_name):
            tokenizer = tokenizers[model_name]
            sequence = tokenizer.texts_to_sequences([cleaned_text])
            print(f"[{model_name}] Sequence: {sequence}")
            padded = pad_sequences(sequence, maxlen=max_len)
            print(f"[{model_name}] Padded shape: {padded.shape}")

            raw = models[model_name].predict(padded, verbose=0)
            output = np.asarray(raw).squeeze(axis=0)  # Only remove batch dimension, not time dimension
            model_type = model_types[model_name]
            print(f"[{model_name}] Raw output shape: {output.shape if hasattr(output, 'shape') else 'scalar'}")
            print(f"[{model_name}] Model type: {model_type}, Output ndim: {output.ndim if hasattr(output, 'ndim') else 0}")

            # PRIORITAS 1: Check model_type dulu (bukan dimensi)
            if model_type == 'multiclass':
                # Multiclass: Output harus array 5 class probabilities
                probs = np.atleast_1d(np.asarray(output))  # Ensure at least 1D
                if probs.ndim > 1:
                    probs = probs.flatten()
                
                # Validate size matches multiclass labels
                if probs.size != len(MULTICLASS_LABELS):
                    print(f"[{model_name}] WARNING: Output size {probs.size} != expected {len(MULTICLASS_LABELS)}")
                    print(f"[{model_name}] Output: {probs}")
                
                class_index = int(np.argmax(probs))
                class_prob = float(probs[class_index])
                stress_percent = float(round(class_prob * 100, 2))
                class_label = MULTICLASS_LABELS[class_index] if class_index < len(MULTICLASS_LABELS) else f"Class_{class_index}"
                print(f"[{model_name}] Multiclass prediction: {class_label} (index={class_index}, prob={class_prob:.4f})")
                return {
                    "model": model_name,
                    "model_type": model_type,
                    "prediction": class_label,
                    "class_index": class_index,
                    "class_label": class_label,
                    "class_probability": class_prob,
                    "stress_percent": stress_percent,
                    "raw_output": probs.tolist()
                }
            else:
                # PRIORITAS 2: Binary model
                prob = float(output.item() if hasattr(output, 'item') else output)
                # Existing `prediction` kept as Negative/Positive for frontend compatibility
                prediction = "Negative" if prob < 0.5 else "Positive"
                # Map to dataset labels: 0 => Stres, 1 => Tidak Stres
                class_index = 0 if prob < 0.5 else 1
                class_label = 'Stres' if class_index == 0 else 'Tidak Stres'
                stress_percent = float(round((1 - prob) * 100, 2))
                print(f"[{model_name}] Binary prediction: {prediction} (prob={prob:.4f}, class_index={class_index})")
                return {
                    "model": model_name,
                    "model_type": model_type,
                    "prediction": prediction,
                    "probability": prob,
                    "class_index": class_index,
                    "class_label": class_label,
                    "stress_percent": stress_percent,
                    "raw_output": output.tolist() if hasattr(output, 'tolist') else float(output)
                }

        results = []
        if selected_model == 'both':
            for model_name in models:
                results.append(run_model_prediction(model_name))
            avg_prob = sum(r['probability'] for r in results if 'probability' in r) / len(results)
            prediction = "Negative" if avg_prob < 0.5 else "Positive"
            stress_percent = float(round((1 - avg_prob) * 100, 2))
            actual_model_type = results[0]['model_type'] if results else selected_model
        else:
            single_result = run_model_prediction(selected_model)
            results.append(single_result)
            prediction = single_result['prediction']
            stress_percent = single_result['stress_percent']
            actual_model_type = single_result['model_type']

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
            "stress_percent": stress_percent,
            "model_type": actual_model_type,
            "models_used": [r['model'] for r in results],
            "details": results
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
    port = int(os.environ.get("PORT", 5000))  
    print(f"Starting Flask server on port {port}...")
    print(f"Loaded models: {', '.join(models.keys())}")
    app.run(debug=True, host="0.0.0.0", port=port)  
    