export class AboutView {
    constructor() {
        this.container = null;
        this.animationObserver = null;
    }

    render() {
        return `
            <div class="content-container">
                <h1>ℹ️ Tentang Stress Chat Detector</h1>
                <div class="about-content">
                    <div class="about-intro">
                        <p>Stress Chat Detector adalah aplikasi berbasis web yang menggunakan teknologi Artificial Intelligence untuk menganalisis tingkat stress dalam percakapan chat melalui screenshot. Aplikasi ini dirancang untuk membantu Anda memahami dinamika komunikasi digital dan meningkatkan kesehatan mental.</p>
                    </div>

                    <div class="about-features">
                        <h2>🚀 Fitur Utama</h2>
                        <div class="features-grid">
                            <div class="feature-card" data-aos="fade-up" data-aos-delay="100">
                                <div class="feature-icon">🔍</div>
                                <h3>Deteksi Otomatis</h3>
                                <p>Menganalisis teks dalam screenshot secara otomatis menggunakan teknologi OCR canggih dan AI untuk hasil yang akurat dan cepat</p>
                            </div>
                            <div class="feature-card" data-aos="fade-up" data-aos-delay="200">
                                <div class="feature-icon">📊</div>
                                <h3>Analisis Mendalam</h3>
                                <p>Memberikan analisis komprehensif terhadap tingkat stress, sentimen, dan pola komunikasi dengan visualisasi yang mudah dipahami</p>
                            </div>
                            <div class="feature-card" data-aos="fade-up" data-aos-delay="300">
                                <div class="feature-icon">💡</div>
                                <h3>Rekomendasi Cerdas</h3>
                                <p>Memberikan saran dan rekomendasi personal untuk mengatasi stress yang terdeteksi berdasarkan analisis kontekstual</p>
                            </div>
                            <div class="feature-card" data-aos="fade-up" data-aos-delay="400">
                                <div class="feature-icon">🔒</div>
                                <h3>Privasi Terjamin</h3>
                                <p>Data diproses secara lokal tanpa menyimpan informasi pribadi, memastikan keamanan dan privasi Anda sepenuhnya</p>
                            </div>
                        </div>
                    </div>

                    <div class="about-technology">
                        <h2>⚡ Teknologi yang Digunakan</h2>
                        <div class="tech-list">
                            <div class="tech-item" data-aos="slide-right" data-aos-delay="100">
                                <strong>🧠 Natural Language Processing (NLP)</strong>
                                <p>Teknologi canggih untuk menganalisis sentimen, emosi, dan konteks percakapan dengan tingkat akurasi tinggi dalam bahasa Indonesia</p>
                            </div>
                            <div class="tech-item" data-aos="slide-right" data-aos-delay="200">
                                <strong>🤖 Machine Learning</strong>
                                <p>Model yang dilatih dengan dataset yang relevan untuk mendeteksi indikator stress, kecemasan, dan pola komunikasi negatif dalam teks</p>
                            </div>
                            <div class="tech-item" data-aos="slide-right" data-aos-delay="300">
                                <strong>👁️ Computer Vision</strong>
                                <p>Teknologi OCR (Optical Character Recognition) untuk mengekstrak teks dari screenshot dengan akurasi tinggi pada berbagai format</p>
                            </div>
                            <div class="tech-item" data-aos="slide-right" data-aos-delay="400">
                                <strong>⚙️ Tesseract.js</strong>
                                <p>Library OCR open-source terdepan untuk ekstraksi teks dari gambar secara real-time dengan dukungan multi-bahasa</p>
                            </div>
                        </div>
                    </div>

                    <div class="about-mission" data-aos="zoom-in">
                        <h2>🎯 Misi Kami</h2>
                        <p>Membantu individu dan komunitas untuk lebih aware terhadap tingkat stress dalam komunikasi digital, sehingga dapat meningkatkan kualitas hubungan interpersonal dan kesehatan mental di era digital. Kami percaya bahwa komunikasi yang sehat adalah kunci kebahagiaan.</p>
                    </div>

                    <div class="about-stats">
                        <h2>📈 Statistik & Performa</h2>
                        <div class="stats-grid">
                            <div class="stat-item" data-aos="flip-up" data-aos-delay="100">
                                <div class="stat-number" data-target="90">0</div>
                                <div class="stat-label">Tingkat Akurasi (%)</div>
                            </div>
                            <div class="stat-item" data-aos="flip-up" data-aos-delay="200">
                                <div class="stat-number" data-target="15">0</div>
                                <div class="stat-label">Platform Chat Didukung</div>
                            </div>
                            <div class="stat-item" data-aos="flip-up" data-aos-delay="300">
                                <div class="stat-number" data-target="5">0</div>
                                <div class="stat-label">Maksimal Ukuran (MB)</div>
                            </div>
                            <div class="stat-item" data-aos="flip-up" data-aos-delay="400">
                                <div class="stat-number">24/7</div>
                                <div class="stat-label">Tersedia Online</div>
                            </div>
                        </div>
                    </div>

                    <div class="about-team" data-aos="fade-up">
                        <h2>👥 Tim Pengembang</h2>
                        <p>Model Dikembangkan oleh tim Machine Learning, serta memiliki tampilan web yang modern. Kami berkomitmen untuk terus meningkatkan akurasi, menambah fitur inovatif, dan memastikan aplikasi ini dapat memberikan manfaat maksimal bagi pengguna dalam menjaga kesehatan mental di era digital.</p>
                    </div>
                </div>
            </div>
        `;
    }

    mount(container) {
        this.container = container;
        this.container.innerHTML = this.render();
        this.addEventListeners();
        this.initializeAnimations();
    }

    addEventListeners() {
        // Initialize statistics animation
        this.animateStats();
        
        // Add hover effects for feature cards
        this.addFeatureCardEffects();
        
        // Add scroll-triggered animations
        this.addScrollAnimations();
    }

    initializeAnimations() {
        // Add staggered animations for elements
        const elements = this.container.querySelectorAll('[data-aos]');
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                el.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    addFeatureCardEffects() {
        const featureCards = this.container.querySelectorAll('.feature-card');
        
        featureCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const icon = card.querySelector('.feature-icon');
                icon.style.transform = 'scale(1.2) rotate(10deg)';
            });
            
            card.addEventListener('mouseleave', () => {
                const icon = card.querySelector('.feature-icon');
                icon.style.transform = 'scale(1) rotate(0deg)';
            });
        });
    }

    addScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        const animatableElements = this.container.querySelectorAll('.tech-item, .stat-item');
        animatableElements.forEach(el => observer.observe(el));
    }

    animateStats() {
        const statNumbers = this.container.querySelectorAll('.stat-number[data-target]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateNumber(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });

        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }

    animateNumber(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
        
        // Add completion effect
        setTimeout(() => {
            element.style.transform = 'scale(1.1)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 200);
        }, duration);
    }

    destroy() {
        if (this.animationObserver) {
            this.animationObserver.disconnect();
        }
        
        if (this.container) {
            this.container.innerHTML = '';
        }
    }

    // Method to get page metadata
    getMetadata() {
        return {
            title: 'Tentang - Stress Chat Detector',
            description: 'Pelajari lebih lanjut tentang teknologi AI yang digunakan dalam Stress Chat Detector untuk analisis stress dalam komunikasi digital',
            keywords: 'about, AI, machine learning, stress detection, mental health, NLP, computer vision',
            author: 'Stress Chat Detector Team',
            robots: 'index, follow'
        };
    }

    // Method to load external CSS if needed
    loadStylesheet() {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = './styles/about-styles.css';
        link.onload = () => {
            console.log('About page styles loaded successfully');
        };
        document.head.appendChild(link);
    }

    // Method to preload assets
    preloadAssets() {
        // Preload any images or assets specific to about page
        const preloadLinks = [
            // Add any specific assets here
        ];
        
        preloadLinks.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = href;
            link.as = 'image';
            document.head.appendChild(link);
        });
    }
}