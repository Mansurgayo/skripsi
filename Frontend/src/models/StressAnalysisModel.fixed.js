import Tesseract from 'tesseract.js';

export class StressAnalysisModel {
    constructor() {
        this.API_URL = '/predict';
        this.tesseractWorker = null;
        this.ocrConfig = {
            lang: 'ind+eng',
            whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
            psm: Tesseract.PSM.AUTO_OSD,
            logger: m => console.debug('Tesseract:', m)
        };
    }

    async analyzeStress(file) {
        if (!file || !(file instanceof File)) {
            throw new Error('Invalid file input');
        }

        const extractedText = await this.extractTextFromImage(file);
        const cleanedText = this.cleanExtractedText(extractedText);

        const apiResponse = await this.sendToStressAPI(cleanedText);
        return this.formatResult(apiResponse, extractedText);
    }

    async extractTextFromImage(file) {
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
        if (!text || text.trim().length === 0) {
            throw new Error('Tidak dapat membaca teks dari gambar');
        }

        return text.trim();
    }

    cleanExtractedText(text) {
        if (!text) return '';
        return text
            .replace(/\s+/g, ' ')
            .replace(/[|_~]+/g, ' ')
            .replace(/([.,!?:;])\1+/g, '$1')
            .split(/\n+/)
            .map(line => line.trim())
            .filter(line => line.length > 2)
            .join(' ')
            .trim();
    }

    async sendToStressAPI(text) {
        const response = await fetch(this.API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: text.substring(0, 1000) })
        });

        if (!response.ok) {
            const data = await response.json().catch(() => ({}));
            throw new Error(data.message || data.error || `Error dari server (${response.status})`);
        }

        return response.json();
    }

    formatResult(apiResult, originalText) {
        const stressLevel = Math.min(100, Math.max(0, apiResult.stress_percent || 0));
        const prediction = apiResult.prediction || 'Unknown';

        const stressWords = this.extractStressKeywords(originalText || '');

        return {
            stress_level: stressLevel,
            prediction,
            stress_words: stressWords,
            sentiment: prediction === 'Negative' ? 'Negatif' : 'Positif/Netral',
            recommendation: this.generateRecommendation(stressLevel),
            confidence: this.calculateConfidence(stressLevel)
        };
    }

    extractStressKeywords(text) {
        if (!text || typeof text !== 'string') return [];

        const lexicon = [
            'stress', 'stres', 'tertekan', 'frustasi', 'panik',
            'cemas', 'khawatir', 'gelisah', 'sedih', 'kecewa',
            'capek', 'lelah', 'penat', 'pusing', 'sakit kepala',
            'deadline', 'tumpuk', 'numpuk', 'beban kerja', 'target',
            'gabut', 'bete', 'drama', 'risih', 'jengkel', 'masalah',
            'sulit', 'susah', 'repot', 'ribet', 'buntu', 'stuck',
            'overwhelmed', 'burnout', 'anxiety', 'depresi', 'marah',
            'kesal', 'bosan', 'males', 'malas', 'engga', 'enggak',
            'gak', 'ga', 'udah', 'udh', 'tired', 'exhausted',
            'worried', 'anxious', 'pressure', 'burden', 'beban',
            'kerja', 'kerjanya', 'kerjaan', 'tugas', 'tugasnya',
            'krusial', 'kritis', 'genting', 'darurat', 'emergency',
            'krisis', 'parah', 'berat', 'urgent', 'penting',
            'di', 'tu', 'tau', 'tahu', 'gimana', 'bagaimana', 'kok',
            'kenapa', 'mengapa', 'lah', 'dong', 'sih', 'ya', 'yah',
            'deh', 'mah', 'nih', 'lo', 'lu', 'gue', 'aku', 'kamu',
            'dia', 'mereka', 'kita', 'kalian', 'banget', 'bgt', 'bt'
        ];

        const normalized = text.toLowerCase();
        const words = normalized.split(/[^\p{L}\p{N}]+/u).filter(Boolean);

        const found = [];
        for (const word of words) {
            for (const key of lexicon) {
                if (word === key || word.includes(key) || key.includes(word)) {
                    if (!found.includes(word)) found.push(word);
                    break;
                }
            }
        }
        return found.slice(0, 5);
    }

    generateRecommendation(score) {
        if (score >= 80) return 'Tingkat stress sangat tinggi. Segera cari dukungan profesional.';
        if (score >= 60) return 'Tingkat stress tinggi. Coba teknik relaksasi atau bicara dengan teman.';
        if (score >= 40) return 'Tingkat stress sedang. Luangkan waktu untuk istirahat.';
        return 'Tingkat stress rendah. Pertahankan kondisi baik Anda.';
    }

    calculateConfidence(stressLevel) {
        if (stressLevel >= 80) return 90;
        if (stressLevel >= 60) return 80;
        if (stressLevel >= 40) return 70;
        return 60;
    }
}
