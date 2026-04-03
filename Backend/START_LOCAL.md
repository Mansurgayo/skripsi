# Menjalankan Backend Lokal

## Prerequisites

1. Python 3.8+ terinstall
2. pip terinstall

## Langkah Instalasi

### 1. Install Dependencies

```bash
cd Backend
pip install -r requirements.txt
```

**Catatan:** Jika ada error saat install TensorFlow, coba:
```bash
pip install tensorflow --upgrade
```

### 2. Verifikasi Model File

Pastikan file model ada di folder `Backend/model/`:
- `model_lstm_stress.h5`
- `tokenizer_stress.pkl`

### 3. Jalankan Backend Server

**Windows PowerShell:**
```powershell
# Pastikan sudah di folder Backend
cd Backend

# Jalankan server
python app.py
```

**Atau menggunakan script:**
```powershell
cd Backend
.\start_backend.bat
```

**Linux/Mac:**
```bash
cd Backend
python3 app.py
```

Server akan berjalan di `http://localhost:5000`

Anda akan melihat output seperti:
```
 * Running on http://0.0.0.0:5000
```

### 4. Test Backend (Optional)

Test apakah backend berjalan dengan baik:

**Windows PowerShell:**
```powershell
Invoke-WebRequest -Uri "http://localhost:5000/predict" -Method POST -ContentType "application/json" -Body '{"text":"aku stres hari ini"}'
```

**Atau menggunakan curl (jika tersedia):**
```bash
curl -X POST http://localhost:5000/predict -H "Content-Type: application/json" -d "{\"text\":\"aku stres hari ini\"}"
```

**Response yang diharapkan:**
```json
{
  "prediction": "Negative",
  "stress_percent": 85.5
}
```

## Konfigurasi Frontend

Frontend sudah dikonfigurasi untuk menggunakan backend lokal di `Frontend/vite.config.js`:
- Target: `http://localhost:5000`
- Port: `5000`

## Troubleshooting

### Error: Module not found
```bash
pip install -r requirements.txt
```

### Error: Model file not found
- Pastikan file model ada di `Backend/model/`
- Cek path di `app.py` (baris 15-16)

### Error: Port already in use
- Ganti port di `app.py` (baris 110):
```python
port = int(os.environ.get("PORT", 5001))  # Gunakan port lain
```

### Backend berjalan tapi frontend tidak bisa connect
- Pastikan frontend menggunakan proxy dengan target `http://localhost:5000`
- Restart frontend development server setelah mengubah config

## Menggunakan Backend Railway (Production)

Jika ingin menggunakan backend Railway, update `Frontend/vite.config.js`:

```js
proxy: {
  '/predict': {
    target: 'https://web-production-8699.up.railway.app',
    changeOrigin: true,
    secure: false,
  }
}
```

**PENTING:** Restart frontend server setelah mengubah config!

