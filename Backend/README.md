# Capstone Project - Stress Detection API

API ini memungkinkan pengguna untuk melakukan deteksi tingkat stres berdasarkan analisis teks menggunakan model LSTM yang telah dilatih. Setiap hasil prediksi akan disimpan ke database (SQLite), dan tersedia endpoint untuk melihat serta menghapus riwayat prediksi.

---

## Endpoint

```
POST https://web-production-8699.up.railway.app/predict
GET  https://web-production-8699.up.railway.app/logs
DELETE https://web-production-8699.up.railway.app/logs/{id}
```

---

## Request

### /predict

#### Method

```
POST
```

#### Headers

| Key          | Value            |
| ------------ | ---------------- |
| Content-Type | application/json |

#### Body (JSON)

```json
{
  "text": "aku capek banget hari ini bener-bener stres karena kerjaan numpuk"
}
```

Kamu juga bisa memilih model yang digunakan dengan menambahkan field `model`:

```json
{
  "text": "aku capek banget hari ini bener-bener stres karena kerjaan numpuk",
  "model": "binary"
}
```

Nilai `model` yang valid:
- `binary` (model klasifikasi biner)
- `multiclass` (model klasifikasi multi-kelas)
- `both` (jika ingin menjalankan kedua model dan melihat detail kedua hasilnya)

---

## Response

### Contoh Response `200 OK` (POST /predict)

```json
{
  "prediction": "Negative",
  "stress_percent": 94.3
}
```

### Contoh Response `GET /logs`

```json
[
  {
    "id": 1,
    "text": "aku capek banget hari ini bener-bener stres karena kerjaan numpuk",
    "prediction": "Negative",
    "stress_percent": 94.3,
    "created_at": "2025-06-13 10:00:00"
  },
  // ...
]
```

### Contoh Response `DELETE /logs/{id}`

```json
{
  "status": "deleted",
  "id": 1
}
```

---

## Error Handling

### Contoh Response jika input kosong

```json
{
  "error": "Text input is required"
}
```

---

## Catatan Tambahan

- Model ini hanya mendukung input dalam Bahasa Indonesia.
- Hasil berupa `Negative` menandakan kemungkinan stres tinggi.
- Nilai `stress_percent` tidak mutlak, namun merupakan skor dari model LSTM hasil pembelajaran dataset.
- Semua hasil prediksi akan disimpan ke database dan dapat diakses melalui endpoint `/logs`.
- Backend juga tersedia dalam versi Hapi (Node.js) di folder `hapi-backend/` dengan endpoint serupa.
