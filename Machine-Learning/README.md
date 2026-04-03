# 🧠 Deteksi Emosi Pengguna dari Teks Berbahasa Indonesia

## 📌 Deskripsi Singkat
Proyek ini merupakan sistem deteksi emosi pengguna berbasis teks, yang mengklasifikasikan input menjadi **Positif** atau **Negatif** menggunakan model deep learning (Bidirectional LSTM) yang dilatih dengan data Bahasa Indonesia. Model akhir disimpan dalam format `.h5` dan digunakan melalui API Flask.

---

## 🧠 Teknologi yang Digunakan

- **Bahasa:** Python
- **Library Utama:**
  - `TensorFlow`, `Keras`
  - `scikit-learn`
  - `NumPy`, `Pandas`
  - `NLTK`, `re` untuk preprocessing
- **Model:** LSTM
- **Deployment:** Flask
- **Ekspor Model:** `model.h5`, `tokenizer.json`

---

## 🔄 Alur Machine Learning

### 1. **Data Preprocessing**
- Pembersihan teks: lowercase, hapus tanda baca, angka, dan karakter spesial
- Konversi slang word Bahasa Indonesia
- Tokenisasi dan padding (`maxlen=30`)
- Encoding label (`LabelEncoder`)
- Pembagian data: 80% training, 20% testing

### 2. **Penanganan Class Imbalance**
- Menggunakan `class_weight='balanced'` dari `sklearn.utils.class_weight`

### 3. **Arsitektur Model (Modeling)**

Model dibangun menggunakan pendekatan deep learning berbasis **Bidirectional LSTM (Long Short-Term Memory)** dengan dukungan layer dropout dan dense layer. Arsitektur ini dirancang untuk memproses data teks berurutan dan menangkap konteks dari kedua arah.

#### 🔧 Arsitektur Lengkap:

```python
model = Sequential()
model.add(Embedding(input_dim=5000, output_dim=128, input_length=30))
model.add(SpatialDropout1D(0.2))
model.add(Bidirectional(LSTM(64, return_sequences=True)))
model.add(GlobalMaxPooling1D())
model.add(Dense(64, activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(2, activation='softmax'))
```

#### 📊 Ringkasan Model:
```
Model: "sequential"
_________________________________________________________________
 Layer (type)                Output Shape              Param #   
=================================================================
 embedding (Embedding)       (None, None, 128)         640000    
                                                                 
 lstm (LSTM)                 (None, 64)                49408     
                                                                 
 dropout (Dropout)           (None, 64)                0         
                                                                 
 dense (Dense)               (None, 1)                 65        
                                                                 
=================================================================
Total params: 689,473
Trainable params: 689,473
Non-trainable params: 0
```

#### ⚙️ Detail Konfigurasi:
- **Loss Function**: `sparse_categorical_crossentropy`
- **Optimizer**: `adam`
- **Metrics**: `accuracy`
- **Callbacks**:
  - `EarlyStopping(monitor='val_loss', patience=3, restore_best_weights=True)`
  - `ReduceLROnPlateau(monitor='val_loss', factor=0.2, patience=2)`

#### 🧪 Hasil Training:
- Akurasi validasi akhir: **sekitar 83%**
- Model disimpan sebagai: `model_saya.h5`
- Tokenizer disimpan sebagai: `tokenizer.json`

---

## 📦 File Output
```
model/
└── model_saya.h5
└── tokenizer.json
```

---

## 🚀 Prediksi (Inferensi)

```python
def predict_text(text, model, tokenizer, label_encoder, maxlen=30):
    sequence = tokenizer.texts_to_sequences([text])
    padded = pad_sequences(sequence, maxlen=maxlen)
    prediction = model.predict(padded)
    predicted_index = np.argmax(prediction)
    label = label_encoder.inverse_transform([predicted_index])[0]
    confidence = prediction[0][predicted_index]
    return label, confidence
```

---

## 🔍 Contoh Input & Output

**Input:**
```
"Aku merasa sangat sedih dan tidak punya semangat."
```

**Output:**
```
Label: Negative
Confidence: 91.2%
```

---

## 💡 Pengembangan Selanjutnya
- Dukungan untuk multi-label emosi (marah, takut, sedih, senang, dll)
- Penambahan fitur analisis tren emosi harian pengguna
- Integrasi dengan platform chatbot/webhook API

---

## 📄 Lisensi & Kontribusi
Open source untuk keperluan edukasi dan eksperimen lanjutan. Kontribusi sangat terbuka untuk pengembangan lebih lanjut.