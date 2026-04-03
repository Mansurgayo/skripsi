export class TutorialView {
    constructor() {
        this.container = null;
    }

    render() {
        return `
            <div class="content-container">
                <div class="page-header">
                    <h1>📖 Tutorial Penggunaan</h1>
                    <p class="page-subtitle">Pelajari cara menggunakan Stress Detector untuk menganalisis tingkat stress dari percakapan chat</p>
                </div>
                
                <div class="tutorial-content">
                    <div class="tutorial-steps">
                        <!-- Step 1: Screenshot -->
                        <div class="tutorial-step" data-step="0">
                            <div class="step-header">
                                <div class="step-number">1</div>
                                <div class="step-title">
                                    <h3>📱 Ambil Screenshot Chat</h3>
                                    <p class="step-subtitle">Persiapkan gambar percakapan yang akan dianalisis</p>
                                </div>
                            </div>
                            <div class="step-content">
                                <div class="step-visual">
                                    <div class="mock-phone">
                                        <div class="mock-chat">
                                            <div class="chat-bubble received">Gimana kabar?</div>
                                            <div class="chat-bubble sent">Besok deadline stress tau</div>
                                            <div class="chat-bubble received">Bisa yok! 💪</div>
                                            <div class="chat-bubble sent">Capek...</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="step-details">
                                    <p>Buat screenshot dari percakapan chat yang ingin dianalisis. Pastikan teks terlihat jelas dan tidak terpotong untuk hasil analisis yang optimal.</p>
                                    
                                    <div class="step-tips">
                                        <strong>📋 Tips untuk Screenshot Terbaik:</strong>
                                        <ul>
                                            <li><strong>Kualitas Gambar:</strong> Gunakan resolusi tinggi dan pastikan teks tidak blur</li>
                                            <li><strong>Pencahayaan:</strong> Hindari screenshot dalam kondisi gelap atau terlalu terang</li>
                                            <li><strong>Konten:</strong> Sertakan beberapa pesan untuk analisis yang lebih akurat</li>
                                            <li><strong>Platform:</strong> Mendukung WhatsApp, Telegram, LINE, Instagram, dan platform chat lainnya</li>
                                        </ul>
                                    </div>
                                    
                                    <div class="step-warning">
                                        <strong>⚠️ Perhatian Privasi:</strong>
                                        Pastikan tidak ada informasi sensitif seperti nomor telepon, alamat, atau data pribadi lainnya dalam screenshot.
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Step 2: Upload -->
                        <div class="tutorial-step" data-step="1">
                            <div class="step-header">
                                <div class="step-number">2</div>
                                <div class="step-title">
                                    <h3>📤 Upload Screenshot</h3>
                                    <p class="step-subtitle">Upload gambar ke sistem untuk diproses</p>
                                </div>
                            </div>
                            <div class="step-content">
                                <div class="step-visual">
                                    <div class="upload-demo">
                                        <div class="upload-area">
                                            <div class="upload-icon">📱</div>
                                            <div class="upload-text">Drag & Drop atau Klik untuk Upload</div>
                                        </div>
                                        <div class="file-preview">
                                            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkgMTJMMTIgMTVMMjIgNSIgc3Ryb2tlPSIjNDhCQjc4IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMjEgMTJWMTlBMiAyIDAgMCAxIDE5IDIxSDVBMiAyIDAgMCAxIDMgMTlWNUEyIDIgMCAwIDEgNSAzSDEzIiBzdHJva2U9IiM0OEJCNzgiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=" alt="Upload success">
                                            <div class="file-info">✅ chat-screenshot.png</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="step-details">
                                    <p>Navigasi ke halaman Detector dan upload screenshot yang sudah dibuat. Anda bisa menggunakan tombol "Pilih File" atau melakukan drag & drop langsung ke area upload.</p>
                                    
                                    <div class="step-tips">
                                        <strong>📋 Persyaratan File:</strong>
                                        <ul>
                                            <li><strong>Format:</strong> JPG, PNG, JPEG</li>
                                            <li><strong>Ukuran maksimal:</strong> 5MB</li>
                                            <li><strong>Resolusi minimal:</strong> 300x300 piksel</li>
                                            <li><strong>Orientasi:</strong> Portrait dan landscape keduanya didukung</li>
                                        </ul>
                                    </div>
                                    
                                    <div class="step-action">
                                        <button class="demo-btn primary" onclick="navigateToPageSmooth('detector')">
                                            🚀 Coba Upload Sekarang
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Step 3: Analysis -->
                        <div class="tutorial-step" data-step="2">
                            <div class="step-header">
                                <div class="step-number">3</div>
                                <div class="step-title">
                                    <h3>🔍 Proses Analisis</h3>
                                    <p class="step-subtitle">Sistem akan menganalisis teks dari screenshot</p>
                                </div>
                            </div>
                            <div class="step-content">
                                <div class="step-visual">
                                    <div class="analysis-process">
                                        <div class="process-step">
                                            <div class="process-icon">🔍</div>
                                            <div class="process-text">Ekstraksi Teks</div>
                                        </div>
                                        <div class="process-arrow">→</div>
                                        <div class="process-step">
                                            <div class="process-icon">🧠</div>
                                            <div class="process-text">Analisis AI</div>
                                        </div>
                                        <div class="process-arrow">→</div>
                                        <div class="process-step">
                                            <div class="process-icon">📊</div>
                                            <div class="process-text">Hasil</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="step-details">
                                    <p>Setelah file berhasil diupload, klik tombol "Analisis Tingkat Stress" dan tunggu proses analisis selesai. Sistem akan memproses gambar dan mengekstrak teks percakapan.</p>
                                    
                                    <div class="step-tips">
                                        <strong>🔧 Proses yang Terjadi:</strong>
                                        <ul>
                                            <li><strong>OCR Processing:</strong> Ekstraksi teks dari gambar screenshot</li>
                                            <li><strong>Text Analysis:</strong> Identifikasi kata-kata indikator stress</li>
                                            <li><strong>Sentiment Analysis:</strong> Analisis emosi dalam percakapan</li>
                                            <li><strong>Stress Calculation:</strong> Perhitungan tingkat stress berdasarkan algoritma</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Step 4: Results -->
                        <div class="tutorial-step" data-step="3">
                            <div class="step-header">
                                <div class="step-number">4</div>
                                <div class="step-title">
                                    <h3>📊 Pahami Hasil Analisis</h3>
                                    <p class="step-subtitle">Interpretasi hasil tingkat stress yang terdeteksi</p>
                                </div>
                            </div>
                            <div class="step-content">
                                <div class="step-visual">
                                    <div class="result-demo">
                                        <div class="stress-meter-demo">
                                            <div class="meter-label">Tingkat Stress</div>
                                            <div class="meter-bar">
                                                <div class="meter-fill" style="width: 75%;"></div>
                                            </div>
                                            <div class="meter-value">75% - Tinggi</div>
                                        </div>
                                        <div class="analysis-demo">
                                            <div class="analysis-item">
                                                <strong>Kata Kunci:</strong> stress, deadline, capek, lelah
                                            </div>
                                            <div class="analysis-item">
                                                <strong>Sentimen:</strong> Negatif (68%)
                                            </div>
                                            <div class="analysis-item">
                                                <strong>Kategori:</strong> Stress Kerja
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="step-details">
                                    <p>Hasil analisis akan ditampilkan dalam bentuk dashboard yang mudah dipahami, lengkap dengan persentase stress dan rekomendasi.</p>
                                    
                                    <div class="step-tips">
                                        <strong>📋 Komponen Hasil Analisis:</strong>
                                        <ul>
                                            <li><strong>Persentase Stress:</strong> Skala 0-100% dengan kategori visual</li>
                                            <li><strong>Kata Indikator:</strong> Kata-kata yang menunjukkan tingkat stress</li>
                                            <li><strong>Analisis Sentimen:</strong> Persentase emosi positif/negatif</li>
                                            <li><strong>Rekomendasi:</strong> Saran praktis untuk mengatasi stress</li>
                                        </ul>
                                    </div>
                                    
                                    <div class="step-interpretation">
                                        <strong>🎯 Skala Interpretasi Tingkat Stress:</strong>
                                        <div class="interpretation-grid">
                                            <div class="interpretation-item low">
                                                <div class="level-indicator">0-33%<br>Rendah</div>
                                            </div>
                                            <div class="interpretation-item medium">
                                                <div class="level-indicator">34-66%<br>Sedang</div>
                                            </div>
                                            <div class="interpretation-item high">
                                                <div class="level-indicator">67-100%<br>Tinggi</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Quick Tips Section -->
                    <div class="quick-tips-section">
                        <h2>💡 Tips Cepat</h2>
                        <div class="tips-grid">
                            <div class="tip-card">
                                <div class="tip-icon">📸</div>
                                <h3>Screenshot Berkualitas</h3>
                                <p>Pastikan teks jelas terbaca dan tidak ada bayangan atau pantulan pada screenshot</p>
                            </div>
                            <div class="tip-card">
                                <div class="tip-icon">🔒</div>
                                <h3>Privasi Terjaga</h3>
                                <p>Hapus atau tutup informasi pribadi sebelum mengambil screenshot untuk keamanan data</p>
                            </div>
                            <div class="tip-card">
                                <div class="tip-icon">📱</div>
                                <h3>Multi Platform</h3>
                                <p>Mendukung berbagai aplikasi chat seperti WhatsApp, Telegram, Line, dan lainnya</p>
                            </div>
                            <div class="tip-card">
                                <div class="tip-icon">⚡</div>
                                <h3>Hasil Cepat</h3>
                                <p>Proses analisis biasanya selesai dalam 10-30 detik tergantung ukuran gambar</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Action Buttons -->
                    <div class="tutorial-actions">
                        <h3>Siap Memulai Analisis?</h3>
                        <p>Ikuti langkah-langkah di atas dan mulai deteksi tingkat stress dari percakapan Anda</p>
                        <div class="action-buttons">
                            <button class="demo-btn primary" onclick="navigateToPageSmooth('detector')">
                                🎯 Mulai Analisis Sekarang
                            </button>
                            <button class="demo-btn secondary" onclick="navigateToPageSmooth('home')">
                                🏠 Kembali ke Beranda
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    init(container) {
        this.container = container;
        this.container.innerHTML = this.render();
        this.addScrollAnimation();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    addScrollAnimation() {
        // Add scroll-triggered animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Apply animation to tutorial steps
        const steps = this.container.querySelectorAll('.tutorial-step');
        steps.forEach((step, index) => {
            step.style.opacity = '0';
            step.style.transform = 'translateY(30px)';
            step.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(step);
        });

        // Apply animation to tip cards
        const tipCards = this.container.querySelectorAll('.tip-card');
        tipCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = `opacity 0.4s ease ${index * 0.1}s, transform 0.4s ease ${index * 0.1}s`;
            observer.observe(card);
        });
    }
}