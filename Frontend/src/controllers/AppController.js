// Main Application Controller
export class AppController {
    constructor() {
        this.config = {
            MAX_FILE_SIZE: 5 * 1024 * 1024,
            ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png'],
            // Gunakan path relatif agar proxy Vite bekerja
            API_URL: '/predict'
        };
    }

    init() {
        console.log('AppController initialized');
        this.addAlertStyles();
    }

    getConfig() {
        return this.config;
    }

    showAlert(message, type = 'info') {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${type === 'error' ? '#dc3545' : type === 'warning' ? '#ffc107' : '#28a745'};
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                z-index: 10000;
                max-width: 300px;
                animation: slideIn 0.3s ease;
            ">
                ${message}
            </div>
        `;
        
        document.body.appendChild(alertDiv);
        
        // Remove after 5 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.parentNode.removeChild(alertDiv);
            }
        }, 5000);
    }

    addAlertStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    handleAPIError(error, response) {
        if (response) {
            switch (response.status) {
                case 400:
                    return 'Data yang dikirim tidak valid. Periksa kembali file yang diupload.';
                case 401:
                    return 'Tidak memiliki akses. Silakan login kembali.';
                case 413:
                    return 'File terlalu besar. Maksimal 5MB.';
                case 429:
                    return 'Terlalu banyak permintaan. Silakan tunggu sebentar.';
                case 500:
                    return 'Terjadi kesalahan server. Silakan coba lagi nanti.';
                default:
                    return 'Terjadi kesalahan saat menganalisis. Silakan coba lagi.';
            }
        }
        return error.message || 'Terjadi kesalahan yang tidak diketahui.';
    }
}