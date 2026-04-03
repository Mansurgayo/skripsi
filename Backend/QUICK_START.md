# Quick Start - Backend Lokal

## 🚀 Cara Cepat Menjalankan Backend

### Di PowerShell (Windows):

```powershell
# 1. Masuk ke folder Backend
cd Backend

# 2. Install dependencies (jika belum)
python -m pip install -r requirements.txt
# Catatan: Gunakan "python -m pip" jika "pip" error "Access denied"

# 3. Jalankan backend
python app.py
```

### Atau menggunakan script:

```powershell
cd Backend
.\start_backend.bat
```

## ✅ Cek Backend Berjalan

Setelah backend berjalan, Anda akan melihat:
```
 * Running on http://0.0.0.0:5000
```

Untuk test, buka browser dan akses:
- `http://localhost:5000/predict` (akan error 405, itu normal karena butuh POST)

## 🔄 Jalankan Frontend

Di terminal **BARU** (biarkan backend tetap berjalan):

```powershell
cd Frontend
npm run dev
```

Frontend akan berjalan di `http://localhost:3002`

## 🎯 Test Aplikasi

1. Buka browser: `http://localhost:3002`
2. Upload screenshot chat
3. Klik "Analisis Tingkat Stress"

## ⚠️ Troubleshooting

**Error: Module not found**
```powershell
pip install -r requirements.txt
```

**Error: Port 5000 already in use**
- Tutup aplikasi lain yang menggunakan port 5000
- Atau ubah port di `app.py` baris 110

**Backend berjalan tapi frontend error**
- Pastikan backend masih berjalan di terminal
- Restart frontend server
- Cek `Frontend/vite.config.js` target: `http://localhost:5000`

