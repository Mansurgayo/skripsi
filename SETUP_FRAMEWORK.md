# Panduan Install dan Setup React / Vue.js

## 📋 Prerequisites
- Node.js >= 20.x sudah terinstall
- npm atau yarn sudah terinstall

## ⚛️ Cara Install dan Setup React

### 1. Install React dan Dependencies

```bash
cd Frontend
npm install react react-dom
npm install --save-dev @vitejs/plugin-react
```

### 2. Update vite.config.js untuk React

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3002,
    proxy: {
      '/predict': {
        target: 'https://web-production-1151.up.railway.app',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});
```

### 3. Buat file main.jsx (entry point React)

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### 4. Update index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Stress Chat Detector</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### 5. Jalankan React App

```bash
npm run dev
```

Aplikasi akan berjalan di: `http://localhost:3002`

---

## 🟢 Cara Install dan Setup Vue.js

### 1. Install Vue dan Dependencies

```bash
cd Frontend
npm install vue
npm install --save-dev @vitejs/plugin-vue
```

### 2. Update vite.config.js untuk Vue

```js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3002,
    proxy: {
      '/predict': {
        target: 'https://web-production-1151.up.railway.app',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});
```

### 3. Buat file main.js (entry point Vue)

```js
import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');
```

### 4. Update index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Stress Chat Detector</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

### 5. Jalankan Vue App

```bash
npm run dev
```

Aplikasi akan berjalan di: `http://localhost:3002`

---

## 🚀 Script yang Tersedia

Setelah setup, gunakan script berikut:

- `npm run dev` - Menjalankan development server
- `npm run build` - Build untuk production
- `npm run preview` - Preview build production
- `npm run serve` - Serve build di port 3002

---

## 📝 Catatan Penting

1. **Pilih salah satu**: React ATAU Vue, jangan install keduanya bersamaan
2. **File extension**: 
   - React menggunakan `.jsx` untuk component
   - Vue menggunakan `.vue` untuk component
3. **Import**: Pastikan import statement sesuai dengan framework yang dipilih

---

## 🔄 Migrasi dari Vanilla JS ke React/Vue

Jika ingin migrasi proyek yang ada:
1. Backup kode yang ada
2. Pilih framework (React atau Vue)
3. Install dependencies sesuai panduan di atas
4. Migrasi kode secara bertahap dari vanilla JS ke framework yang dipilih



