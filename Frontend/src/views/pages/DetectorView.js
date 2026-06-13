import Tesseract from 'tesseract.js';

export class DetectorView {
    constructor() {
        this.pageId = 'detector';
        this.isActive = false;
        this.selectedFile = null;
        this.selectedModel = 'binary';
        this.eventListenersAdded = false;
        this.config = {
            MAX_FILE_SIZE: 5 * 1024 * 1024,
            ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png'],
            // Gunakan path relatif agar proxy Vite bekerja
            API_URL: '/predict'
        };
        this.tesseractWorker = null;
    }

    render() {
        return `
            <section id="detector" class="page-section ${this.isActive ? 'active' : ''}">
                <div class="detector-container">
                    <div class="detector-header">
                        <h1>🔍 Stress Chat Detector</h1>
                        <p>Upload screenshot chat untuk mendeteksi tingkat stress dalam percakapan</p>
                    </div>

                    <div class="upload-section" id="uploadSection">
                        <div class="upload-icon">📱</div>
                        <div class="upload-text">
                            <strong>Klik atau drag & drop screenshot chat</strong><br>
                            Format: JPG, PNG, JPEG (Max 5MB)
                        </div>
                        <button class="upload-btn" id="uploadBtn">
                            Pilih File
                        </button>
                        <input type="file" id="fileInput" accept="image/*" style="display: none;" />
                    </div>

                    <div class="preview-section" id="previewSection" style="display: none;">
                        <img id="previewImage" class="preview-image" alt="Preview" />
                        <div class="file-info" id="fileInfo"></div>
                        <div class="model-selection" id="modelSelection">
                            <label for="modelSelect"><strong>Pilih Jenis Klasifikasi</strong></label>
                            <select id="modelSelect">
                                <option value="binary">Klasifikasi Biner</option>
                                <option value="multiclass">Klasifikasi Multiclass</option>
                            </select>
                        </div>
                        <button class="analyze-btn" id="analyzeBtn">
                            🔍 Analisis Tingkat Stress
                        </button>
                    </div>

                    <div class="loading" id="loadingSection" style="display: none;">
                        <div class="spinner"></div>
                        <p>Sedang menganalisis chat... Mohon tunggu sebentar</p>
                    </div>

                    <div class="result-section" id="resultSection" style="display: none;">
                        <div class="stress-level">
                            <h2>Hasil Analisis Stress</h2>
                            <div class="stress-meter">
                                <div class="stress-fill" id="stressFill"></div>
                            </div>
                            <h3 id="stressCategory">Tingkat Stress: -</h3>
                            <p id="stressPercentage">-</p>
                        </div>
                        
                        <div class="ocr-section">
                            <h4>📝 Teks yang Diekstrak (OCR)</h4>
                            <div id="extractedOCRText" class="extracted-text-box"></div>
                        </div>
                        
                        <div class="stress-details">
                            <h4>📊 Detail Analisis</h4>
                            <div id="analysisDetails">
                                <p><strong>Model yang digunakan:</strong> <span id="modelUsed">Binary</span></p>
                                <p><strong>Kata/frasa indikator stress dari chat:</strong></p>
                                <div id="stressWords" class="stress-words">-</div>
                                <p><strong>Sentimen dominan:</strong> <span id="sentiment">-</span></p>
                                <p><strong>Rekomendasi:</strong> <span id="recommendation">-</span></p>
                            </div>
                        </div>
                        
                        <button class="reset-btn" id="resetBtn">Analisis Chat Lain</button>
                    </div>
                </div>
            </section>
        `;
    }

    mount(container) {
        container.innerHTML = this.render();
        this.bindEvents();
        this.initializeDragAndDrop();
    }

    init(container) {
        this.mount(container);
    }

    bindEvents() {
        if (this.eventListenersAdded) {
            return;
        }

        const uploadBtn = document.getElementById('uploadBtn');
        const fileInput = document.getElementById('fileInput');
        const analyzeBtn = document.getElementById('analyzeBtn');
        const resetBtn = document.getElementById('resetBtn');

        if (uploadBtn && fileInput) {
            uploadBtn.removeEventListener('click', this.handleUploadClick);
            fileInput.removeEventListener('change', this.handleFileChange);

            this.handleUploadClick = this.handleUploadClick.bind(this);
            this.handleFileChange = this.handleFileChange.bind(this);

            uploadBtn.addEventListener('click', this.handleUploadClick);
            fileInput.addEventListener('change', this.handleFileChange);
        }

        const modelSelect = document.getElementById('modelSelect');
        if (modelSelect) {
            modelSelect.removeEventListener('change', this.handleModelChange);
            this.handleModelChange = this.handleModelChange.bind(this);
            modelSelect.addEventListener('change', this.handleModelChange);
        }

        if (analyzeBtn) {
            analyzeBtn.removeEventListener('click', this.handleAnalyzeClick);
            this.handleAnalyzeClick = this.handleAnalyzeClick.bind(this);
            analyzeBtn.addEventListener('click', this.handleAnalyzeClick);
        }

        if (resetBtn) {
            resetBtn.removeEventListener('click', this.handleResetClick);
            this.handleResetClick = this.handleResetClick.bind(this);
            resetBtn.addEventListener('click', this.handleResetClick);
        }

        this.eventListenersAdded = true;
    }

    handleUploadClick() {
        const fileInput = document.getElementById('fileInput');
        if (fileInput) {
            fileInput.click();
        }
    }

    handleFileChange(e) {
        if (e.target.files.length > 0) {
            this.handleFileSelect(e.target.files[0]);
        }
    }

    handleModelChange(e) {
        this.selectedModel = e.target.value;
        console.log('Selected model:', this.selectedModel);
    }

    handleAnalyzeClick() {
        this.analyzeStress();
    }

    handleResetClick() {
        this.resetForm();
    }

    initializeDragAndDrop() {
        const uploadSection = document.getElementById('uploadSection');
        if (!uploadSection) return;

        uploadSection.removeEventListener('dragover', this.handleDragOver);
        uploadSection.removeEventListener('dragleave', this.handleDragLeave);
        uploadSection.removeEventListener('drop', this.handleDrop);

        this.handleDragOver = this.handleDragOver.bind(this);
        this.handleDragLeave = this.handleDragLeave.bind(this);
        this.handleDrop = this.handleDrop.bind(this);

        uploadSection.addEventListener('dragover', this.handleDragOver);
        uploadSection.addEventListener('dragleave', this.handleDragLeave);
        uploadSection.addEventListener('drop', this.handleDrop);
    }

    handleDragOver(e) {
        e.preventDefault();
        const uploadSection = document.getElementById('uploadSection');
        if (uploadSection) {
            uploadSection.classList.add('dragover');
        }
    }

    handleDragLeave() {
        const uploadSection = document.getElementById('uploadSection');
        if (uploadSection) {
            uploadSection.classList.remove('dragover');
        }
    }

    handleDrop(e) {
        e.preventDefault();
        const uploadSection = document.getElementById('uploadSection');
        if (uploadSection) {
            uploadSection.classList.remove('dragover');
        }
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            this.handleFileSelect(files[0]);
        }
    }

    handleFileSelect(file) {
        console.log('File selected:', file.name);
        
        if (!this.validateFile(file)) {
            return;
        }

        this.selectedFile = file;
        this.displayFilePreview(file);
    }

    validateFile(file) {
        if (!this.config.ALLOWED_TYPES.includes(file.type)) {
            this.showAlert('Mohon pilih file gambar (JPG, PNG, JPEG)', 'error');
            return false;
        }

        if (file.size > this.config.MAX_FILE_SIZE) {
            this.showAlert('Ukuran file terlalu besar. Maksimal 5MB', 'error');
            return false;
        }

        return true;
    }

    displayFilePreview(file) {
        const previewSection = document.getElementById('previewSection');
        const previewImage = document.getElementById('previewImage');
        const fileInfo = document.getElementById('fileInfo');

        if (!previewSection || !previewImage || !fileInfo) return;

        const reader = new FileReader();
        
        reader.onload = (e) => {
            previewImage.src = e.target.result;
            previewSection.style.display = 'block';
            
            fileInfo.innerHTML = `
                <strong>📄 ${file.name}</strong><br>
                Ukuran: ${this.formatFileSize(file.size)} | Type: ${file.type}
            `;

            // Smooth scroll to preview
            setTimeout(() => {
                previewSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        };
        
        reader.onerror = () => {
            this.showAlert('Gagal membaca file. Silakan coba lagi.', 'error');
        };
        
        reader.readAsDataURL(file);
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }

    async analyzeStress() {
        if (!this.selectedFile) {
            this.showAlert('Silakan pilih file terlebih dahulu', 'warning');
            return;
        }

        try {
            this.showLoading(true);
            this.setAnalyzeButtonState(false);
            this.hideResults();
            const extractedText = await this.extractTextFromImage(this.selectedFile);
            
            if (!extractedText || extractedText.trim().length < 5) {
                throw new Error('Teks yang diekstrak terlalu pendek atau tidak dapat dibaca');
            }

            console.log('=== DetectorView Analysis ===');
            console.log('Extracted text (first 200 chars):', extractedText.substring(0, 200));
            
            const result = await this.sendToAPI(extractedText);
            const formattedResult = this.formatApiResult(result, extractedText);
            
            console.log('Formatted result stress_words:', formattedResult.stress_words);
            console.log('Formatted result stress_words length:', formattedResult.stress_words?.length || 0);
            
            this.displayResults(formattedResult);
            
        } catch (error) {
            console.error('Analysis error:', error);
            this.showAlert(error.message || 'Terjadi kesalahan saat menganalisis', 'error');
        } finally {
            this.showLoading(false);
            this.setAnalyzeButtonState(true);
        }
    }

    async extractTextFromImage(file) {
        try {
            if (!this.tesseractWorker) {
                this.tesseractWorker = await Tesseract.createWorker('ind');
                await this.tesseractWorker.setParameters({
                    tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,!?:;()[]{}"\'-/@#$%^&*+=<>|\\~ ',
                    tessedit_pageseg_mode: Tesseract.PSM.AUTO,
                });
            }

            const { data: { text } } = await this.tesseractWorker.recognize(file);
            // Simpan teks asli sebelum cleaning untuk ekstraksi kata stress
            this.originalExtractedText = text;
            // Return cleaned text untuk API, tapi simpan original untuk keyword extraction
            return this.cleanExtractedText(text);

        } catch (error) {
            console.error('OCR Error:', error);
            throw new Error('Gagal mengekstrak teks dari gambar. Pastikan gambar jelas dan berisi teks.');
        }
    }

        cleanExtractedText(text) {
        if (!text) return '';
        
        return text
            .replace(/\s+/g, ' ')
            .replace(/[|_\-~]+/g, ' ')
            .replace(/([.,!?:;])\1+/g, '$1')
            .split('\n')
            .filter(line => line.trim().length > 2)
            .join(' ')
            .trim();
    }

async sendToAPI(text) {
    try {
        console.log('Sending request to:', this.config.API_URL, 'model:', this.selectedModel);
        const response = await fetch(this.config.API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: text.substring(0, 1000), model: this.selectedModel })
        });
        console.log('Response status:', response.status, response.statusText);

        if (!response.ok) {
            let errorMessage = 'Error dari server analisis';
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorData.error || errorMessage;

                // Handle specific error cases
                if (response.status === 404) {
                    errorMessage = 'Server backend tidak ditemukan. Pastikan backend server aktif atau periksa konfigurasi URL.';
                } else if (response.status === 500) {
                    errorMessage = 'Kesalahan server internal. Silakan coba lagi nanti.';
                }
            } catch (e) {
                // If response is not JSON
                if (response.status === 404) {
                    errorMessage = 'Endpoint tidak ditemukan (404). Pastikan backend server aktif.';
                } else {
                    errorMessage = `Error dari server (${response.status}): ${response.statusText}`;
                }
            }
            throw new Error(errorMessage);
        }

        const result = await response.json();
        console.log('API Success Response:', result);
        return result;
    } catch (error) {
        console.error('API Communication Error:', error);
        
        // Provide more specific error messages
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            throw new Error('Tidak dapat terhubung ke server. Periksa koneksi internet atau pastikan development server berjalan.');
        } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
            throw new Error('Koneksi ke server gagal. Pastikan backend server aktif dan proxy dikonfigurasi dengan benar.');
        } else {
            // Use the original error message if available
            throw new Error(error.message || 'Gagal menghubungi server analisis. Coba beberapa saat lagi.');
        }
    }
}

        formatApiResult(apiResult, originalText) {
        const stressLevel = Math.min(100, Math.max(0, apiResult.stress_percent || 0));
        const rawPrediction = (apiResult.prediction || '').toString().trim();
        const modelType = apiResult.model_type || this.selectedModel || 'binary';
        const category = modelType === 'multiclass'
            ? (rawPrediction || this.getStressCategory(stressLevel))
            : this.getStressCategory(stressLevel);
        const sentiment = this.mapApiSentiment(rawPrediction, modelType);

        // Gunakan teks asli (sebelum cleaning) untuk ekstraksi kata stress
        const textForKeywordExtraction = this.originalExtractedText || originalText;
        const displayText = originalText;
        console.log('Extracting keyword phrases from text (first 200 chars):', textForKeywordExtraction?.substring(0, 200));

        const stressIndicators = this.extractStressIndicators(textForKeywordExtraction);

        const stressKeywords = [
            'stress', 'stres', 'tertekan', 'frustasi', 'panik', 
            'cemas', 'khawatir', 'gelisah', 'sedih', 'kecewa',
            'capek', 'lelah', 'penat', 'pusing', 'deadline',
            'tumpuk', 'numpuk', 'beban', 'kerja', 'kerjaan',
            'masalah', 'sulit', 'susah', 'repot', 'ribet',
            'buntu', 'gabut', 'bete', 'drama', 'risih',
            'jengkel', 'kesal', 'bosan', 'males', 'malas',
            'gak', 'ga', 'engga', 'enggak', 'udah'
        ];
        
        // Normalize text
        const normalizedText = (textForKeywordExtraction || '').toLowerCase();
        // Split dengan lebih permissive (termasuk tanda baca)
        const words = normalizedText.split(/[\s\n\r\t.,!?:;()\[\]{}\-"'`]+/).filter(w => w && w.trim().length > 0);
        
        console.log('Words to search in:', words.slice(0, 30));
        
        // Cari kata-kata yang mengandung keyword
        const foundStressWords = [];
        for (const word of words) {
            const cleanWord = word.replace(/[^\w]/g, '').trim();
            if (!cleanWord || cleanWord.length < 2) continue;
            
            for (const keyword of stressKeywords) {
                if (cleanWord === keyword || 
                    cleanWord.includes(keyword) || 
                    keyword.includes(cleanWord) ||
                    cleanWord.startsWith(keyword) ||
                    keyword.startsWith(cleanWord)) {
                    if (cleanWord && !foundStressWords.includes(cleanWord)) {
                        foundStressWords.push(cleanWord);
                        console.log(`✓ Found stress keyword: "${cleanWord}" (matched "${keyword}")`);
                    }
                    break;
                }
            }
        }
        
        console.log('Final found stress words:', foundStressWords);
        
        // Limit to 5 words
        const finalStressWords = foundStressWords.slice(0, 5);
        console.log('Final stress words (limited to 5):', finalStressWords);

        // Generate recommendation
        let recommendation;
        if (stressLevel >= 80) {
            recommendation = 'Tingkat stress sangat tinggi. Segera cari dukungan profesional.';
        } else if (stressLevel >= 60) {
            recommendation = 'Tingkat stress tinggi. Coba teknik relaksasi atau bicara dengan teman.';
        } else if (stressLevel >= 40) {
            recommendation = 'Tingkat stress sedang. Luangkan waktu untuk istirahat.';
        } else {
            recommendation = 'Tingkat stress rendah. Pertahankan kondisi baik Anda.';
        }

        return {
            stress_level: stressLevel,
            category: category,
            model_type: modelType,
            prediction: rawPrediction,
            stress_words: stressIndicators.length > 0 ? stressIndicators : finalStressWords,
            sentiment: sentiment,
            recommendation: recommendation,
            original_text: originalText,
            extracted_text: displayText
        };
    }

    normalizeApiCategory(prediction, modelType) {
        if (modelType === 'binary') {
            return prediction;
        }
        if (modelType === 'multiclass') {
            return prediction;
        }
        return prediction || this.getStressCategory(Math.min(100, Math.max(0, prediction || 0)));
    }

    mapApiSentiment(prediction, modelType) {
        if (modelType === 'binary') {
            return prediction === 'Negative' ? 'Negatif' : 'Positif/Netral';
        }
        if (modelType === 'multiclass') {
            return prediction.toLowerCase().includes('positif') ? 'Positif' : 'Negatif';
        }
        return prediction === 'Negative' ? 'Negatif' : 'Positif/Netral';
    }

    getStressCategory(percentage) {
        if (percentage >= 80) return 'Sangat Tinggi';
        if (percentage >= 60) return 'Tinggi';
        if (percentage >= 40) return 'Sedang';
        if (percentage >= 20) return 'Rendah';
        return 'Minimal';
    }

    generateMockResult() {
        const stressLevel = Math.floor(Math.random() * 100);
        const categories = ['Rendah', 'Sedang', 'Tinggi'];
        const stressWords = [
            ['deadline', 'capek', 'bingung'],
            ['stress', 'kesal', 'frustasi', 'berat'],
            ['panik', 'tertekan', 'overwhelmed', 'burnout']
        ];
        const sentiments = ['Negatif', 'Netral', 'Campuran'];
        const recommendations = [
            'Luangkan waktu untuk istirahat dan lakukan aktivitas yang menenangkan',
            'Coba praktikkan teknik pernapasan dalam atau meditasi singkat',
            'Berbicara dengan teman dekat atau keluarga dapat membantu mengurangi beban',
            'Lakukan aktivitas fisik ringan seperti jalan santai untuk meredakan stress',
            'Atur prioritas dan buat jadwal yang lebih realistis untuk menghindari tekanan berlebih'
        ];

        const categoryIndex = stressLevel < 30 ? 0 : stressLevel < 70 ? 1 : 2;

        return {
            stress_level: stressLevel,
            category: categories[categoryIndex],
            stress_words: stressWords[categoryIndex],
            sentiment: sentiments[Math.floor(Math.random() * sentiments.length)],
            recommendation: recommendations[Math.floor(Math.random() * recommendations.length)]
        };
    }

    displayResults(result) {
        const resultSection = document.getElementById('resultSection');
        if (!resultSection) return;

        const stressLevel = result.stress_level || 0;
        
        this.updateStressMeter(stressLevel);
        this.updateResultText(result, stressLevel);
        
        resultSection.style.display = 'block';
        
        // Smooth scroll to results
        setTimeout(() => {
            resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 200);
    }

    updateStressMeter(stressLevel) {
        const stressFill = document.getElementById('stressFill');
        if (!stressFill) return;
        
        // Reset classes first
        stressFill.className = 'stress-fill';
        
        // Add appropriate class based on stress level
        if (stressLevel < 30) {
            stressFill.classList.add('stress-low');
        } else if (stressLevel < 70) {
            stressFill.classList.add('stress-medium');
        } else {
            stressFill.classList.add('stress-high');
        }
        
        // Animate the fill
        setTimeout(() => {
            stressFill.style.width = stressLevel + '%';
        }, 100);
    }

    updateResultText(result, stressLevel) {
        const categoryEl = document.getElementById('stressCategory');
        const percentageEl = document.getElementById('stressPercentage');
        const wordsEl = document.getElementById('stressWords');
        const sentimentEl = document.getElementById('sentiment');
        const recommendationEl = document.getElementById('recommendation');
        const ocrEl = document.getElementById('extractedOCRText');

        const rawLabel = result.class_label || result.prediction || 'Tidak Diketahui';
        const sentimentLabel = this.normalizeBinaryLabel(rawLabel, result.model_type || this.selectedModel);
        const confidenceValue = result.class_probability != null
            ? `${Math.round(result.class_probability * 100)}%`
            : result.confidence != null
                ? `${result.confidence}%`
                : `${stressLevel}%`;
        const stressSeverity = this.getStressCategory(stressLevel);
        const sentimentDisplay = result.sentiment || sentimentLabel;

        if (categoryEl) {
            categoryEl.textContent = `Hasil Sentimen: ${sentimentLabel}`;
        }

        if (percentageEl) {
            percentageEl.textContent = `Confidence: ${confidenceValue} • ${stressSeverity}`;
        }
        
        if (ocrEl) {
            const rawOcr = this.originalExtractedText || result.extracted_text || '';
            ocrEl.innerHTML = rawOcr.trim().length > 0
                ? this.renderOcrChatBubbles(rawOcr)
                : '<p>Teks tidak tersedia</p>';
        }
        
        if (wordsEl) {
            wordsEl.innerHTML = result.stress_words && result.stress_words.length > 0 
                ? `<ul class="stress-word-list">${result.stress_words.map(item => `<li>${this.escapeHtml(item)}</li>`).join('')}</ul>`
                : 'Tidak terdeteksi';
        }
        
        if (sentimentEl) {
            sentimentEl.textContent = sentimentDisplay;
        }
        
        if (recommendationEl) {
            recommendationEl.textContent = result.recommendation || 'Tidak ada rekomendasi khusus';
        }

        const modelUsedEl = document.getElementById('modelUsed');
        if (modelUsedEl) {
            modelUsedEl.textContent = this.selectedModel === 'binary' ? 'Binary' : 'Multiclass';
        }
    }

    renderOcrChatBubbles(rawText) {
        const lines = rawText
            .split(/\r?\n/)
            .map(line => line.trim())
            .filter(line => line.length > 0);

        if (lines.length === 0) {
            return '<p>Teks tidak tersedia</p>';
        }

        return lines.map((line, index) => {
            const side = this.detectBubbleSide(line, index);
            return `<div class="chat-bubble ${side}">${this.escapeHtml(line)}</div>`;
        }).join('');
    }

    detectBubbleSide(line, index) {
        const lower = line.toLowerCase();
        const userMarkers = ['aku', 'saya', 'gue', 'gw', 'kamu', 'kmu', 'lu', 'lo', 'bro', 'sis', 'akun'];
        if (userMarkers.some(word => lower.startsWith(word + ' ') || lower.includes(' ' + word + ' '))) {
            return index % 2 === 0 ? 'right' : 'left';
        }
        return index % 2 === 0 ? 'left' : 'right';
    }

    escapeHtml(text) {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    extractStressIndicators(rawText) {
        if (!rawText || typeof rawText !== 'string') {
            return [];
        }

        const stressKeywords = [
            'stress', 'stres', 'tertekan', 'frustasi', 'panik',
            'cemas', 'khawatir', 'gelisah', 'sedih', 'kecewa',
            'capek', 'lelah', 'penat', 'pusing', 'deadline',
            'tumpuk', 'numpuk', 'beban', 'kerja', 'kerjaan',
            'masalah', 'sulit', 'susah', 'repot', 'ribet',
            'buntu', 'gabut', 'bete', 'drama', 'risih',
            'jengkel', 'kesal', 'bosan', 'males', 'malas',
            'ga', 'gak', 'engga', 'enggak', 'udah', 'gatau',
            'susah', 'nggak', 'stress banget', 'sangat stress'
        ];

        const lines = rawText
            .split(/\r?\n/)
            .map(line => line.trim())
            .filter(line => line.length > 0);

        const foundPhrases = [];
        for (const line of lines) {
            const lowerLine = line.toLowerCase();
            for (const keyword of stressKeywords) {
                if (lowerLine.includes(keyword)) {
                    if (!foundPhrases.includes(line)) {
                        foundPhrases.push(line);
                    }
                    break;
                }
            }
            if (foundPhrases.length >= 5) {
                break;
            }
        }

        return foundPhrases;
    }

    normalizeBinaryLabel(label, modelType) {
        const normalized = (label || '').toString().trim();
        if (modelType === 'binary' || this.selectedModel === 'binary') {
            const lower = normalized.toLowerCase();
            if (lower.includes('negative') || lower.includes('stres') || lower === 'negative') {
                return 'Stres';
            }
            if (lower.includes('positive') || lower.includes('tidak stres') || lower === 'positive') {
                return 'Tidak Stres';
            }
        }
        return normalized || 'Tidak Diketahui';
    }

    showLoading(show) {
        const loadingSection = document.getElementById('loadingSection');
        if (loadingSection) {
            loadingSection.style.display = show ? 'block' : 'none';
        }
    }

    setAnalyzeButtonState(enabled) {
        const analyzeBtn = document.getElementById('analyzeBtn');
        if (analyzeBtn) {
            analyzeBtn.disabled = !enabled;
            analyzeBtn.textContent = enabled ? '🔍 Analisis Tingkat Stress' : 'Sedang Menganalisis...';
        }
    }

    hideResults() {
        const resultSection = document.getElementById('resultSection');
        if (resultSection) {
            resultSection.style.display = 'none';
        }
    }

    resetForm() {
        this.selectedFile = null;
        
        const previewSection = document.getElementById('previewSection');
        const resultSection = document.getElementById('resultSection');
        const loadingSection = document.getElementById('loadingSection');
        const fileInput = document.getElementById('fileInput');
        const stressFill = document.getElementById('stressFill');
        const analyzeBtn = document.getElementById('analyzeBtn');

        if (previewSection) previewSection.style.display = 'none';
        if (resultSection) resultSection.style.display = 'none';
        if (loadingSection) loadingSection.style.display = 'none';
        if (fileInput) fileInput.value = '';
        
        if (stressFill) {
            stressFill.style.width = '0%';
            stressFill.className = 'stress-fill';
        }

        if (analyzeBtn) {
            analyzeBtn.textContent = '🔍 Analisis Tingkat Stress';
            analyzeBtn.disabled = false;
        }

        // Smooth scroll back to upload section
        const uploadSection = document.getElementById('uploadSection');
        if (uploadSection) {
            setTimeout(() => {
                uploadSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
    }

    showAlert(message, type = 'info') {
        if (window.app && window.app.showAlert) {
            window.app.showAlert(message, type);
        } else {
            // Enhanced fallback alert with better styling
            const alertDiv = document.createElement('div');
            alertDiv.className = `alert alert-${type}`;
            
            const bgColor = {
                'error': '#ef4444',
                'warning': '#f59e0b',
                'success': '#10b981',
                'info': '#3b82f6'
            }[type] || '#3b82f6';
            
            alertDiv.innerHTML = `
                <div style="
                    position: fixed;
                    top: 24px;
                    right: 24px;
                    background: ${bgColor};
                    color: white;
                    padding: 16px 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    z-index: 10000;
                    max-width: 320px;
                    font-size: 0.875rem;
                    font-weight: 500;
                    animation: slideInAlert 0.3s ease;
                ">
                    ${message}
                </div>
                <style>
                    @keyframes slideInAlert {
                        from { transform: translateX(100%); opacity: 0; }
                        to { transform: translateX(0); opacity: 1; }
                    }
                </style>
            `;
            
            document.body.appendChild(alertDiv);
            
            setTimeout(() => {
                if (alertDiv.parentNode) {
                    alertDiv.style.animation = 'slideInAlert 0.3s ease reverse';
                    setTimeout(() => {
                        if (alertDiv.parentNode) {
                            alertDiv.parentNode.removeChild(alertDiv);
                        }
                    }, 300);
                }
            }, 4000);
        }
    }

    activate() {
        this.isActive = true;
        const element = document.getElementById(this.pageId);
        if (element) {
            element.classList.add('active');
        }
    }

    deactivate() {
        this.isActive = false;
        const element = document.getElementById(this.pageId);
        if (element) {
            element.classList.remove('active');
        }
        this.eventListenersAdded = false;
    }

    async destroy() {
        // Cleanup Tesseract worker
        if (this.tesseractWorker) {
            await this.tesseractWorker.terminate();
            this.tesseractWorker = null;
        }
        
        // Original cleanup code
        this.selectedFile = null;
        this.eventListenersAdded = false;
        
        const uploadBtn = document.getElementById('uploadBtn');
        const fileInput = document.getElementById('fileInput');
        const analyzeBtn = document.getElementById('analyzeBtn');
        const resetBtn = document.getElementById('resetBtn');
        const uploadSection = document.getElementById('uploadSection');

        if (uploadBtn && this.handleUploadClick) {
            uploadBtn.removeEventListener('click', this.handleUploadClick);
        }
        if (fileInput && this.handleFileChange) {
            fileInput.removeEventListener('change', this.handleFileChange);
        }
        if (analyzeBtn && this.handleAnalyzeClick) {
            analyzeBtn.removeEventListener('click', this.handleAnalyzeClick);
        }
        if (resetBtn && this.handleResetClick) {
            resetBtn.removeEventListener('click', this.handleResetClick);
        }
        if (uploadSection) {
            if (this.handleDragOver) uploadSection.removeEventListener('dragover', this.handleDragOver);
            if (this.handleDragLeave) uploadSection.removeEventListener('dragleave', this.handleDragLeave);
            if (this.handleDrop) uploadSection.removeEventListener('drop', this.handleDrop);
        }
    }
}