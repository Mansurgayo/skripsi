# Fix Error 404 "Application not found"

## Masalah

Error 404 "Application not found" terjadi karena:
1. **URL Backend tidak konsisten**: README menyebut `8699`, tapi config menggunakan `1151`
2. **Backend server mungkin tidak aktif** di Railway
3. **Proxy tidak menemukan aplikasi** di URL yang dikonfigurasi

## Solusi yang Sudah Diterapkan

✅ **1. Update URL di vite.config.js**
- Diubah dari `https://web-production-1151.up.railway.app` 
- Menjadi `https://web-production-8699.up.railway.app` (sesuai README)

✅ **2. Improved Error Handling**
- Error messages lebih informatif
- Deteksi error 404 secara spesifik
- Logging untuk debugging

## Langkah Selanjutnya

### 1. RESTART Development Server (WAJIB!)

Setelah perubahan config, **HARUS restart** server:

```bash
cd Frontend
# Stop server (Ctrl+C)
npm run dev
```

### 2. Test Lagi

Coba upload file dan analisis lagi. Jika masih error 404, berarti:
- Backend server di Railway mungkin tidak aktif
- URL masih salah

### 3. Alternatif: Gunakan Backend Lokal

Jika Railway backend tidak tersedia, bisa jalankan backend lokal:

#### Option A: Python Flask Backend

```bash
cd Backend
# Install dependencies (jika belum)
pip install -r requirements.txt

# Jalankan server
python app.py
```

Server akan jalan di `http://localhost:5000` (atau PORT dari env)

Lalu update `vite.config.js`:
```js
proxy: {
  '/predict': {
    target: 'http://localhost:5000',  // Backend lokal
    changeOrigin: true,
    secure: false,
  }
}
```

#### Option B: Node.js Hapi Backend

```bash
cd Backend/hapi-backend
npm install
npm start
```

Server akan jalan di `http://localhost:3000`

Lalu update `vite.config.js`:
```js
proxy: {
  '/predict': {
    target: 'http://localhost:3000',  // Backend lokal
    changeOrigin: true,
    secure: false,
  }
}
```

### 4. Verifikasi URL Backend

Untuk cek apakah backend aktif, bisa test manual:

**Windows PowerShell:**
```powershell
Invoke-WebRequest -Uri "https://web-production-8699.up.railway.app/predict" -Method POST -ContentType "application/json" -Body '{"text":"test"}'
```

**Atau gunakan browser extension seperti Postman/Thunder Client**

**Atau buka di browser:**
- `https://web-production-8699.up.railway.app/predict` 
- Akan error 405 (Method Not Allowed) jika server aktif
- Akan error 404 jika server tidak aktif

## Catatan

- **Proxy hanya bekerja saat development server Vite berjalan**
- **Setelah mengubah vite.config.js, HARUS restart server**
- **Path relatif `/predict` akan di-proxy ke target URL yang dikonfigurasi**



