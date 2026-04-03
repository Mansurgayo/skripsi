// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3002,
    proxy: {
      '/predict': {
        // Gunakan backend lokal untuk development
        // Jika Railway backend aktif, ubah ke: 'https://web-production-8699.up.railway.app'
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        // Vite proxy akan otomatis mengarahkan /predict ke target + /predict
      }
    }
  }
});