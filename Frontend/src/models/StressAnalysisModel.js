import Tesseract from 'tesseract.js';

export class StressAnalysisModel {
    constructor() {
        // Gunakan path relatif agar proxy Vite bekerja
        this.API_URL = '/predict';
        this.tesseractWorker = null;
        this.ocrConfig = {
            lang: 'ind',
            whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,!?:;()[]{}"\'-/@#$%^&*+=<>|\\~ ',
            psm: Tesseract.PSM.AUTO,
            logger: m => console.debug('Tesseract:', m)
        };
    }

    /**
     * Main analysis pipeline
     * @param {File} file - Image file containing chat text
     * @returns {Promise<Object>} Analysis result
     */
    async analyzeStress(file) {
        const startTime = performance.now();
        
        try {
            // Validate input
            if (!file || !(file instanceof File)) {
                throw new Error('Invalid file input');
            }

            // OCR Processing
            const extractedText = await this.extractTextFromImage(file);
            const cleanText = this.cleanExtractedText(extractedText);
            
            if (cleanText.split(' ').length < 3) {
                throw new Error('Teks terlalu pendek untuk analisis');
            }

            // Stress Analysis (gunakan cleanText untuk API)
            const apiResponse = await this.sendToStressAPI(cleanText);
            
            // Format comprehensive result (gunakan extractedText asli untuk ekstraksi kata stress)
            console.log('=== STRESS ANALYSIS DEBUG ===');
            console.log('Original extracted text length:', extractedText?.length || 0);
            console.log('Original extracted text (first 200 chars):', extractedText?.substring(0, 200) || 'EMPTY');
            console.log('Clean text length:', cleanText?.length || 0);
            
            const result = this.formatResult(apiResponse, extractedText);
            
            console.log('Result stress_words:', result.stress_words);
            console.log('Result stress_words type:', typeof result.stress_words);
            console.log('Result stress_words length:', result.stress_words?.length || 0);
            console.log(`Analysis completed in ${((performance.now() - startTime)/1000).toFixed(2)}s`);
            console.log('=== END DEBUG ===');
            return result;

        } catch (error) {
            console.error('Analysis pipeline error:', error);
            throw this.handleAnalysisError(error);
        }
    }

    /**
     * Extract text from image using OCR
     * @param {File} file - Image file
     * @returns {Promise<string>} Extracted text
     */
async extractTextFromImage(file) {
    try {
        if (!this.tesseractWorker) {
            this.tesseractWorker = Tesseract.createWorker({
                logger: this.ocrConfig.logger
            });
            await this.tesseractWorker.load();
            await this.tesseractWorker.loadLanguage(this.ocrConfig.lang);
            await this.tesseractWorker.initialize(this.ocrConfig.lang);
            await this.tesseractWorker.setParameters({
                tessedit_char_whitelist: this.ocrConfig.whitelist,
                tessedit_pageseg_mode: this.ocrConfig.psm
            });
        }
        const { data: { text } } = await this.tesseractWorker.recognize(file);
        return text;
    } catch (error) {
        console.error('OCR Error:', error);
        throw new Error('Gagal membaca teks dari gambar. Pastikan: \n1. Gambar jelas\n2. Teks terbaca\n3. Format didukung');
    }
}

    /**
     * Clean and normalize OCR output
     * @param {string} text - Raw OCR output
     * @returns {string} Cleaned text
     */
    cleanExtractedText(text) {
        if (!text) return '';
        
        return text
            .replace(/\s+/g, ' ')
            .replace(/[|_\-~]+/g, ' ')
            .replace(/([.,!?:;])\1+/g, '$1')
            .split('\n')
            .filter(line => {
                const trimmed = line.trim();
                return trimmed.length > 2 && 
                       !/^[\W\d_]+$/.test(trimmed);
            })
            .join(' ')
            .trim();
    }

    /**
     * Send text to stress detection API
     * @param {string} text - Text to analyze
     * @returns {Promise<Object>} API response
     */
async sendToStressAPI(text) {
    try {
        console.log('Sending request to:', this.API_URL);
        const response = await fetch(this.API_URL, { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: text.substring(0, 1000) }) 
        });

        console.log('Response status:', response.status, response.statusText);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorMessage = errorData.message || errorData.error || `Error dari server (${response.status})`;
            console.error('API Error Response:', errorData);
            throw new Error(errorMessage);
        }

        const result = await response.json();
        console.log('API Success Response:', result);
        return result;

    } catch (error) {
        console.error('API Communication Error:', error);
        
        // Provide more specific error messages
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            throw new Error('Tidak dapat terhubung ke server. Periksa koneksi internet Anda atau pastikan development server berjalan.');
        } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
            throw new Error('Koneksi ke server gagal. Pastikan backend server aktif dan proxy dikonfigurasi dengan benar.');
        } else {
            // Use the original error message if available, otherwise default
            throw new Error(error.message || 'Gagal menghubungi server analisis. Coba beberapa saat lagi.');
        }
    }
}

    /**
     * Format raw API response
     * @param {Object} apiResult 
     * @param {string} originalText
     * @returns {Object}
     */
    formatResult(apiResult, originalText) {
        console.log('=== formatResult START ===');
        console.log('originalText type:', typeof originalText);
        console.log('originalText length:', originalText?.length || 0);
        
        const stressLevel = Math.min(100, Math.max(0, apiResult.stress_percent || 0));
        const isStressed = apiResult.prediction === "Negative";

        // Extract stress keywords with proper error handling
        let stressWords = [];
        try {
            if (originalText && typeof originalText === 'string' && originalText.trim().length > 0) {
                stressWords = this.extractStressKeywords(originalText);
            } else {
                console.warn('formatResult: originalText is invalid, using empty array for stress_words');
            }
        } catch (error) {
            console.error('Error in extractStressKeywords:', error);
            stressWords = [];
        }
        
        console.log('stress_words result:', stressWords);
        console.log('=== formatResult END ===');

        return {
            stress_level: stressLevel,
            category: this.getStressCategory(stressLevel),
            prediction: apiResult.prediction,
            stress_words: stressWords, // Pastikan selalu array
            sentiment: isStressed ? 'Negatif' : 'Positif/Netral',
            recommendation: this.generateRecommendation(stressLevel),
            confidence: this.calculateConfidence(stressLevel),
            analysis_details: {
                key_phrases: this.extractKeyPhrases(originalText || ''),
                word_count: (originalText || '').split(/\s+/).length,
                readability: this.assessReadability(originalText || '')
            }
        };
    }

    // Helper methods
    getStressCategory(percentage) {
        const categories = [
            { threshold: 80, label: 'Sangat Tinggi', emoji: '🔥' },
            { threshold: 60, label: 'Tinggi', emoji: '⚠️' },
            { threshold: 40, label: 'Sedang', emoji: '😐' },
            { threshold: 20, label: 'Rendah', emoji: '😊' },
            { threshold: 0, label: 'Minimal', emoji: '😌' }
        ];
        
        return categories.find(c => percentage >= c.threshold) || categories[categories.length-1];
    }

    extractStressKeywords(text) {
        console.log('=== extractStressKeywords START ===');
        console.log('Input text type:', typeof text);
        console.log('Input text length:', text?.length || 0);
        console.log('Input text (first 300 chars):', text?.substring(0, 300) || 'EMPTY');
        
        if (!text || typeof text !== 'string' || text.trim().length === 0) {
            console.log('extractStressKeywords: text is empty or not a string');
            return [];
        }

        const stressLexicon = [
            'stress', 'stres', 'tertekan', 'frustasi', 'panik', 
            'cemas', 'khawatir', 'gelisah', 'sedih', 'kecewa',
            'capek', 'lelah', 'penat', 'pusing', 'sakit kepala',
            'deadline', 'tumpuk', 'numpuk', 'beban kerja', 'target',
            'gabut', 'bete', 'drama', 'risih', 'jengkel', 'masalah',
            'sulit', 'susah', 'repot', 'ribet', 'buntu', 'stuck',
            'overwhelmed', 'burnout', 'anxiety', 'depresi', 'marah',
            'kesal', 'bosan', 'males', 'malas', 'engga', 'enggak',
            'gak', 'ga', 'udah', 'udh', 'capek', 'tired', 'exhausted',
            'worried', 'anxious', 'overwhelming', 'pressure', 'burden',
            'beban', 'kerja', 'kerjanya', 'kerjaan', 'tugas', 'tugasnya',
            'deadline', 'target', 'numpuk', 'menumpuk', 'penat',
            'kepala', 'kepalanya', 'sakit', 'pusing', 'pusingnya'
        ];

        // Normalize text: lowercase untuk pencarian
        const normalizedText = text.toLowerCase();
        console.log('Normalized text (first 300 chars):', normalizedText.substring(0, 300));
        
        // Split berdasarkan whitespace dan tanda baca - lebih permissive
        const words = normalizedText.split(/[\s\n\r\t.,!?:;()\[\]{}\-"'`]+/).filter(w => w && w.trim().length > 0);
        
        console.log('Total words found:', words.length);
        console.log('First 30 words:', words.slice(0, 30));
        
        // Cari kata-kata yang mengandung atau sama dengan keyword
        const foundWords = [];
        for (const word of words) {
            // Bersihkan tanda baca tambahan dari kata
            const cleanWord = word.replace(/[^\w]/g, '').trim();
            if (!cleanWord || cleanWord.length < 2) continue;
            
            // Cek apakah kata mengandung atau sama dengan keyword
            for (const keyword of stressLexicon) {
                // Cek exact match atau contains (lebih permissive)
                if (cleanWord === keyword || 
                    cleanWord.includes(keyword) || 
                    keyword.includes(cleanWord) ||
                    cleanWord.startsWith(keyword) ||
                    keyword.startsWith(cleanWord)) {
                    // Jangan tambahkan jika sudah ada
                    if (cleanWord && !foundWords.includes(cleanWord)) {
                        foundWords.push(cleanWord);
                        console.log(`✓ Found stress keyword: "${cleanWord}" (matched with "${keyword}")`);
                    }
                    break; // Jangan cek keyword lain untuk kata ini
                }
            }
        }
        
        console.log(`Final found words (${foundWords.length}):`, foundWords);
        console.log('=== extractStressKeywords END ===');
        return foundWords.slice(0, 5);
    }

    generateRecommendation(percentage) {
        const recommendations = {
            high: [
                "Pertimbangkan konsultasi dengan profesional kesehatan mental",
                "Lakukan teknik grounding: fokus pada pernapasan dan lingkungan sekitar",
                "Batasi paparan terhadap sumber stres jika memungkinkan"
            ],
            medium: [
                "Lakukan aktivitas fisik ringan seperti jalan kaki",
                "Prakirakan teknik manajemen waktu seperti Pomodoro",
                "Diskusikan perasaan dengan orang terpercaya"
            ],
            low: [
                "Pertahankan rutinitas yang sehat dan seimbang",
                "Lakukan hobi atau aktivitas menyenangkan",
                "Latih mindfulness atau meditasi singkat"
            ]
        };

        const category = percentage >= 60 ? 'high' : 
                        percentage >= 30 ? 'medium' : 'low';
        
        return recommendations[category][
            Math.floor(Math.random() * recommendations[category].length)
        ];
    }

    calculateConfidence(stressLevel) {
        // Simple confidence calculation based on stress level
        if (stressLevel >= 80 || stressLevel <= 20) {
            return Math.min(95, 85 + Math.random() * 10);
        } else if (stressLevel >= 60 || stressLevel <= 40) {
            return Math.min(85, 75 + Math.random() * 10);
        } else {
            return Math.min(75, 65 + Math.random() * 10);
        }
    }

    extractKeyPhrases(text) {
        // Simple key phrase extraction
        const words = text.toLowerCase().split(/\s+/);
        const phrases = [];
        
        for (let i = 0; i < words.length - 1; i++) {
            if (words[i].length > 3 && words[i + 1].length > 3) {
                phrases.push(`${words[i]} ${words[i + 1]}`);
            }
        }
        
        return phrases.slice(0, 3);
    }

    assessReadability(text) {
        const avgWordsPerSentence = text.split(/[.!?]+/).filter(s => s.trim()).length;
        const avgCharsPerWord = text.replace(/\s+/g, '').length / text.split(/\s+/).length;
        
        if (avgWordsPerSentence < 10 && avgCharsPerWord < 6) {
            return 'Mudah dibaca';
        } else if (avgWordsPerSentence < 20 && avgCharsPerWord < 8) {
            return 'Sedang';
        } else {
            return 'Sulit dibaca';
        }
    }

    // Error handling
    handleAPIError(status, errorData) {
        const errors = {
            400: 'Teks tidak valid untuk analisis',
            413: 'Teks terlalu panjang',
            429: 'Terlalu banyak permintaan. Coba lagi nanti',
            500: 'Kesalahan server internal',
            503: 'Layanan tidak tersedia sementara'
        };

        return new Error(
            errorData.message || 
            errors[status] || 
            `Kesalahan server (${status})`
        );
    }

    handleAnalysisError(error) {
        const userFriendlyMessages = {
            'NetworkError': 'Koneksi internet bermasalah',
            'SyntaxError': 'Respons server tidak valid',
            'TypeError': 'Operasi tidak didukung'
        };

        return new Error(
            userFriendlyMessages[error.name] ||
            error.message ||
            'Terjadi kesalahan selama analisis'
        );
    }

    // Cleanup
    async cleanup() {
        if (this.tesseractWorker) {
            await this.tesseractWorker.terminate();
            this.tesseractWorker = null;
        }
    }
}