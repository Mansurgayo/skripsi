// controllers/DetectorController.js
import { StressAnalysisModel } from '../models/StressAnalysisModel.js';
import { FileUploadModel } from '../models/FileUploadModel.js';

export class DetectorController {
    constructor() {
        this.selectedFile = null;
        this.stressModel = new StressAnalysisModel();
        this.fileUploadModel = new FileUploadModel();
        this.isAnalyzing = false;
        this.isInitialized = false;
        
        // DOM elements
        this.uploadSection = null;
        this.fileInput = null;
        this.previewSection = null;
        this.previewImage = null;
        this.fileInfo = null;
        this.analyzeBtn = null;
        this.loadingSection = null;
        this.resultSection = null;
        this.resetBtn = null;

        // Bound methods untuk cleanup
        this.boundHandlers = {};
    }

    init() {
        console.log('DetectorController initialized');
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Cegah duplicate listeners
        if (this.pageRenderedListener) {
            document.removeEventListener('pageRendered', this.pageRenderedListener);
        }

        this.pageRenderedListener = (e) => {
            if (e.detail.page === 'detector') {
                console.log('Detector page rendered, initializing elements...');
                setTimeout(() => {
                    this.initializeDetectorElements();
                }, 100);
            }
        };

        document.addEventListener('pageRendered', this.pageRenderedListener);
    }

    initializeDetectorElements() {
        // Cegah multiple initialization
        if (this.isInitialized) {
            console.log('Detector already initialized, skipping...');
            return;
        }

        console.log('Initializing detector elements...');
        
        // Get DOM elements
        this.uploadSection = document.getElementById('uploadSection');
        this.fileInput = document.getElementById('fileInput');
        this.previewSection = document.getElementById('previewSection');
        this.previewImage = document.getElementById('previewImage');
        this.fileInfo = document.getElementById('fileInfo');
        this.analyzeBtn = document.getElementById('analyzeBtn');
        this.loadingSection = document.getElementById('loadingSection');
        this.resultSection = document.getElementById('resultSection');
        this.resetBtn = document.getElementById('resetBtn');

        // Check if elements exist
        if (!this.uploadSection || !this.fileInput) {
            console.error('Required detector elements not found');
            return;
        }

        this.cleanupEventListeners();
    }

    // Check apakah DetectorView pattern sedang aktif
    isViewPatternActive() {
        return window.app && window.app.currentView && 
               (window.app.currentView.constructor.name === 'DetectorView' ||
                window.app.currentView.pageId === 'detector');
    }

    cleanupEventListeners() {
        Object.values(this.boundHandlers).forEach(handler => {
            if (handler.element && handler.event && handler.callback) {
                handler.element.removeEventListener(handler.event, handler.callback);
            }
        });
        this.boundHandlers = {};
    }

    setupDragAndDrop() {
        if (!this.uploadSection) return;

        const handleDragOver = (e) => this.handleDragOver(e);
        const handleDragLeave = () => this.handleDragLeave();
        const handleDrop = (e) => this.handleDrop(e);

        this.uploadSection.addEventListener('dragover', handleDragOver);
        this.uploadSection.addEventListener('dragleave', handleDragLeave);
        this.uploadSection.addEventListener('drop', handleDrop);

        // Store for cleanup
        this.boundHandlers.dragover = { element: this.uploadSection, event: 'dragover', callback: handleDragOver };
        this.boundHandlers.dragleave = { element: this.uploadSection, event: 'dragleave', callback: handleDragLeave };
        this.boundHandlers.drop = { element: this.uploadSection, event: 'drop', callback: handleDrop };
    }

    setupFileInput() {
        if (!this.fileInput) return;

        const handleFileChange = (e) => {
            console.log('File input change event triggered');
            if (e.target.files.length > 0) {
                this.handleFileSelect(e.target.files[0]);
            }
        };

        this.fileInput.addEventListener('change', handleFileChange);
        this.boundHandlers.filechange = { element: this.fileInput, event: 'change', callback: handleFileChange };
    }

    setupUploadButton() {
        const uploadBtn = document.querySelector('.upload-btn') || document.getElementById('uploadBtn');
        if (!uploadBtn) return;

        const handleUploadClick = () => {
            console.log('Upload button clicked');
            if (this.fileInput) {
                this.fileInput.click();
            }
        };

        uploadBtn.addEventListener('click', handleUploadClick);
        this.boundHandlers.uploadclick = { element: uploadBtn, event: 'click', callback: handleUploadClick };
    }

    setupAnalyzeButton() {
        if (!this.analyzeBtn) return;

        const handleAnalyzeClick = () => this.analyzeStress();
        this.analyzeBtn.addEventListener('click', handleAnalyzeClick);
        this.boundHandlers.analyzeclick = { element: this.analyzeBtn, event: 'click', callback: handleAnalyzeClick };
    }

    setupResetButton() {
        if (!this.resetBtn) return;

        const handleResetClick = () => this.resetForm();
        this.resetBtn.addEventListener('click', handleResetClick);
        
        // Store for cleanup
        this.boundHandlers.resetclick = { element: this.resetBtn, event: 'click', callback: handleResetClick };
    }

    handleDragOver(e) {
        e.preventDefault();
        if (this.uploadSection) {
            this.uploadSection.classList.add('dragover');
        }
    }

    handleDragLeave() {
        if (this.uploadSection) {
            this.uploadSection.classList.remove('dragover');
        }
    }

    handleDrop(e) {
        e.preventDefault();
        if (this.uploadSection) {
            this.uploadSection.classList.remove('dragover');
        }
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            this.handleFileSelect(files[0]);
        }
    }

    handleFileSelect(file) {
        console.log('DetectorController: File selected:', file.name);
        
        const validation = this.fileUploadModel.validateFile(file);
        if (!validation.isValid) {
            this.showAlert(validation.message, 'error');
            return;
        }

        this.selectedFile = file;
        this.displayFilePreview(file);
    }

    displayFilePreview(file) {
        if (!this.previewSection || !this.previewImage || !this.fileInfo) return;

        const reader = new FileReader();
        
        reader.onload = (e) => {
            this.previewImage.src = e.target.result;
            this.previewSection.style.display = 'block';
            this.fileInfo.innerHTML = `
                <strong>📄 ${file.name}</strong><br>
                Ukuran: ${this.formatFileSize(file.size)}<br>
                Type: ${file.type}
            `;
        };
        
        reader.onerror = () => {
            this.showAlert('Gagal membaca file. Silakan coba lagi.', 'error');
        };
        
        reader.readAsDataURL(file);
    }

    async analyzeStress() {
        if (!this.selectedFile) {
            this.showAlert('Silakan pilih file terlebih dahulu', 'warning');
            return;
        }

        if (this.isAnalyzing) return;

        try {
            this.isAnalyzing = true;
            this.showLoading(true);
            this.setAnalyzeButtonState(false);
            this.hideResults();

            const result = await this.stressModel.analyzeStress(this.selectedFile);
            this.displayResults(result);
            
        } catch (error) {
            console.error('Analysis error:', error);
            const errorMessage = this.handleAPIError(error);
            this.showAlert(errorMessage, 'error');
        } finally {
            this.isAnalyzing = false;
            this.showLoading(false);
            this.setAnalyzeButtonState(true);
        }
    }

    displayResults(result) {
        if (!this.resultSection) return;
        const stressLevel = result.stress_level || 0;
        this.updateStressMeter(stressLevel);
        this.updateResultText(result, stressLevel);
        this.resultSection.style.display = 'block';
        this.resultSection.scrollIntoView({ behavior: 'smooth' });
    }

    updateStressMeter(stressLevel) {
        const stressFill = document.getElementById('stressFill');
        if (!stressFill) return;
        
        // Animate the fill
        setTimeout(() => {
            stressFill.style.width = stressLevel + '%';
        }, 100);
        stressFill.className = 'stress-fill';
        if (stressLevel < 30) {
            stressFill.classList.add('stress-low');
        } else if (stressLevel < 70) {
            stressFill.classList.add('stress-medium');
        } else {
            stressFill.classList.add('stress-high');
        }
    }

    updateResultText(result, stressLevel) {
        const elements = {
            category: document.getElementById('stressCategory'),
            percentage: document.getElementById('stressPercentage'),
            words: document.getElementById('stressWords'),
            sentiment: document.getElementById('sentiment'),
            recommendation: document.getElementById('recommendation')
        };

        if (elements.category) {
            elements.category.textContent = `Tingkat Stress: ${result.category || 'Tidak Diketahui'}`;
        }
        
        if (elements.percentage) {
            elements.percentage.textContent = `${stressLevel}% dari tingkat stress maksimal`;
        }
        
        if (elements.words) {
            elements.words.textContent = result.stress_words ? result.stress_words.join(', ') : 'Tidak terdeteksi';
        }
        
        if (elements.sentiment) {
            elements.sentiment.textContent = result.sentiment || 'Netral';
        }
        
        if (elements.recommendation) {
            elements.recommendation.textContent = result.recommendation || 'Tidak ada rekomendasi khusus';
        }
    }

    showLoading(show) {
        if (this.loadingSection) {
            this.loadingSection.style.display = show ? 'block' : 'none';
        }
    }

    setAnalyzeButtonState(enabled) {
        if (this.analyzeBtn) {
            this.analyzeBtn.disabled = !enabled;
        }
    }

    hideResults() {
        if (this.resultSection) {
            this.resultSection.style.display = 'none';
        }
    }

    resetForm() {
        this.selectedFile = null;
        
        if (this.previewSection) this.previewSection.style.display = 'none';
        if (this.resultSection) this.resultSection.style.display = 'none';
        if (this.loadingSection) this.loadingSection.style.display = 'none';
        if (this.fileInput) this.fileInput.value = '';
        
        // Reset stress meter
        const stressFill = document.getElementById('stressFill');
        if (stressFill) {
            stressFill.style.width = '0%';
            stressFill.className = 'stress-fill';
        }
    }

    // Method untuk cleanup saat controller tidak lagi digunakan
    cleanup() {
        console.log('Cleaning up DetectorController...');

        this.cleanupEventListeners();
        if (this.pageRenderedListener) {
            document.removeEventListener('pageRendered', this.pageRenderedListener);
            this.pageRenderedListener = null;
        }
        
        // Reset state
        this.isInitialized = false;
        this.selectedFile = null;
        this.isAnalyzing = false;
        
        // Clear DOM references
        this.uploadSection = null;
        this.fileInput = null;
        this.previewSection = null;
        this.previewImage = null;
        this.fileInfo = null;
        this.analyzeBtn = null;
        this.loadingSection = null;
        this.resultSection = null;
        this.resetBtn = null;
    }

    // Utility methods
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    handleAPIError(error) {
        if (error.name === 'NetworkError') {
            return 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.';
        } else if (error.status === 413) {
            return 'File terlalu besar. Maksimal ukuran file adalah 5MB.';
        } else if (error.status === 415) {
            return 'Format file tidak didukung. Gunakan JPG, PNG, atau JPEG.';
        } else {
            return 'Terjadi kesalahan saat menganalisis. Silakan coba lagi.';
        }
    }

    showAlert(message, type = 'info') {
        if (window.app && window.app.appController && window.app.appController.showAlert) {
            window.app.appController.showAlert(message, type);
        } else {
            console.log(`Alert [${type}]:`, message);
            alert(message);
        }
    }
}