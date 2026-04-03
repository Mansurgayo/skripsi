# Stress Chat Detector

Website frontend untuk mendeteksi tingkat stress dari screenshot percakapan chat menggunakan teknologi Machine Learning dan Computer Vision.

## 🚀 Fitur

- **Upload Gambar**: Drag & drop atau klik untuk upload screenshot chat
- **Preview**: Preview gambar sebelum analisis
- **Analisis Real-time**: Deteksi tingkat stress dengan visualisasi meter
- **Detail Hasil**: Menampilkan kata-kata indikator stress, sentimen, dan rekomendasi
- **Responsive Design**: Tampilan optimal di desktop dan mobile
- **Error Handling**: Validasi file dan penanganan error yang komprehensif

## 🛠️ Setup & Installation

1. **Clone atau download project ini**
2. **Buka folder project di VS Code**
3. **Buka terminal dan jalankan `npm install`**
4. **Setelah node modules terinstall jalankan `npm run dev`"**

## 📝 Format API Response

Backend API diharapkan mengembalikan response dalam format JSON:

```json
{
  "stress_level": 75,
  "category": "Tinggi",
  "stress_words": ["deadline", "capek", "frustasi"],
  "sentiment": "Negatif", 
  "recommendation": "Disarankan untuk istirahat dan melakukan aktivitas relaksasi"
}
```

### Field Description:
- `stress_level`: Integer 0-100 (tingkat stress dalam persen)
- `category`: String ("Rendah", "Sedang", "Tinggi")
- `stress_words`: Array string (kata-kata indikator stress)
- `sentiment`: String (sentimen dominan dalam chat)
- `recommendation`: String (rekomendasi untuk user)

## 🎨 Customization

### Mengubah Warna Theme:
Edit file `css/style.css` pada bagian:
```css
/* Main gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Button colors */
.upload-btn {
    background: linear-gradient(45deg, #667eea, #764ba2);
}
```

### Mengubah Ukuran Maksimal File:
Edit file `js/script.js`:
```javascript
const CONFIG = {
    MAX_FILE_SIZE: 5 * 1024 * 1024, // Ubah angka 5 sesuai kebutuhan (dalam MB)
};
```

## 🔧 Error Handling

Website ini sudah dilengkapi dengan error handling untuk:
- File type tidak didukung
- File size terlalu besar  
- Network errors
- API errors (400, 401, 413, 429, 500)
- Uncaught JavaScript errors

## 📱 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari  
- ✅ Edge
- ⚠️ Internet Explorer (limited support)

## 🚀 Performance Tips

1. **Compress gambar** sebelum upload untuk performa optimal
2. **Gunakan HTTPS** untuk production deployment
3. **Enable GZIP compression** di server
4. **Optimize gambar** di folder assets jika menambah asset

## 📋 TODO / Future Enhancements

- [ ] Implementasi progress bar untuk upload
- [ ] Batch analysis (multiple files)
- [ ] Export hasil analisis ke PDF
- [ ] Dark mode toggle
- [ ] Multilingual support

## 🤝 Contributing

1. Fork repository ini
2. Buat branch baru (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

Jika ada pertanyaan atau issues, silakan buat issue di repository ini atau hubungi developer.

---

**Happy Coding! 🎉**