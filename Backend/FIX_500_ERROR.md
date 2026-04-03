# Fix Error 500 Internal Server Error

## Perbaikan yang Sudah Diterapkan

### 1. Enhanced Error Logging
- Menambahkan logging detail di setiap step proses
- Error traceback akan ditampilkan di console
- Error message lebih informatif

### 2. Improved Model Loading
- Error handling saat load model dan tokenizer
- Logging path file model/tokenizer

### 3. Better Preprocessing
- NLTK data download dengan error handling
- Download hanya jika belum ada

### 4. Debug Mode
- Flask debug mode diaktifkan (untuk development)
- Error detail akan muncul di console backend

## Langkah untuk Melihat Error Detail

### 1. Restart Backend Server

**WAJIB restart backend setelah perubahan:**

```powershell
# Stop backend yang sedang berjalan (Ctrl+C di terminal backend)

# Jalankan lagi
cd Backend
python app.py
```

### 2. Lihat Console Backend

Sekarang error detail akan muncul di terminal tempat backend berjalan. Cari pesan seperti:
- `Error in predict: ...`
- `Traceback: ...`

### 3. Test Request

Setelah backend restart, coba lagi dari frontend. Error detail akan muncul di:
1. **Console backend** (terminal tempat `python app.py` berjalan)
2. **Response body** (dalam format JSON)

## Kemungkinan Penyebab Error 500

### 1. Model Tidak Kompatibel
- Model mungkin dibuat dengan versi TensorFlow berbeda
- **Solusi**: Pastikan versi TensorFlow sesuai

### 2. NLTK Data Tidak Tersedia
- NLTK perlu download data (punkt, stopwords)
- **Solusi**: Sudah diperbaiki dengan auto-download

### 3. Tokenizer Error
- Tokenizer tidak cocok dengan teks input
- **Solusi**: Cek error message di console

### 4. Memory Error
- Model terlalu besar untuk memori
- **Solusi**: Close aplikasi lain atau restart komputer

## Debugging Tips

1. **Cek Console Backend**: Error detail ada di terminal backend
2. **Test dengan Simple Text**: Coba dengan teks pendek dulu
3. **Cek Model File**: Pastikan file model tidak corrupt
4. **Cek Dependencies**: Pastikan semua package terinstall

## Jika Masih Error

Copy error message lengkap dari console backend dan cari solusinya, atau:
1. Cek apakah model file ada dan tidak corrupt
2. Cek versi TensorFlow: `python -c "import tensorflow as tf; print(tf.__version__)"`
3. Coba reinstall dependencies: `python -m pip install -r requirements.txt --force-reinstall`



