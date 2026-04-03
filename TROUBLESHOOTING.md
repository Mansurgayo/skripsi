# Troubleshooting - Error "Gagal menghubungi server analisis"

## Masalah yang Ditemukan

1. **URL Backend Tidak Konsisten:**
   - README menyebut: `https://web-production-8699.up.railway.app`
   - vite.config.js menggunakan: `https://web-production-1151.up.railway.app`

2. **CORS Configuration:**
   - Backend hanya mengizinkan origin: `https://stress-chat-detector.vercel.app`
   - Untuk development local, proxy Vite seharusnya mengatasi ini

## Solusi yang Sudah Diterapkan

✅ **Path Relatif untuk API:**
- Semua API calls sekarang menggunakan `/predict` (path relatif)
- Proxy Vite akan mengarahkan ke backend server

✅ **Error Handling yang Lebih Baik:**
- Error messages lebih informatif
- Console logging untuk debugging

## Langkah Troubleshooting

### 1. Pastikan Development Server Berjalan

```bash
cd Frontend
npm run dev
```

Server harus berjalan di `http://localhost:3002`

### 2. Periksa Console Browser (F12)

Buka Developer Tools (F12) dan cek:
- **Console tab**: Lihat error messages
- **Network tab**: Lihat request ke `/predict`
  - Status code
  - Response body
  - Headers

### 3. Verifikasi Backend Server Aktif

Coba akses langsung di browser atau dengan curl:

```bash
# Test endpoint (akan error karena butuh POST, tapi bisa cek apakah server aktif)
curl https://web-production-1151.up.railway.app/predict

# Atau test dengan POST
curl -X POST https://web-production-1151.up.railway.app/predict \
  -H "Content-Type: application/json" \
  -d '{"text":"test"}'
```

### 4. Periksa Proxy Configuration

Pastikan di `vite.config.js`:
- Target URL benar
- Proxy path `/predict` sudah dikonfigurasi

### 5. Jika Backend Down atau URL Berbeda

Jika backend server down atau URL berbeda, update `vite.config.js`:

```js
proxy: {
  '/predict': {
    target: 'https://web-production-8699.up.railway.app', // atau URL yang benar
    changeOrigin: true,
    secure: false,
  }
}
```

### 6. Restart Development Server

Setelah mengubah konfigurasi, **WAJIB restart** development server:

```bash
# Stop server (Ctrl+C)
# Lalu start lagi
npm run dev
```

## Catatan Penting

- **Proxy hanya bekerja saat development server aktif**
- **Path relatif (`/predict`) hanya bekerja dengan proxy**
- **Jika deploy ke production, gunakan URL penuh atau environment variable**

## Alternatif: Gunakan Environment Variable

Untuk fleksibilitas lebih, bisa gunakan environment variable:

1. Buat file `.env` di folder Frontend:
```
VITE_API_URL=https://web-production-1151.up.railway.app
```

2. Update `StressAnalysisModel.js`:
```js
this.API_URL = import.meta.env.VITE_API_URL + '/predict' || '/predict';
```

3. Untuk production, set environment variable di platform deployment (Vercel, dll)



