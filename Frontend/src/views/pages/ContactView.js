export class ContactView {
    constructor() {
        this.container = null;
        this.form = null;
    }

    render() {
        return `
            <div class="content-container">
                <div class="page-header">
                    <h1>📞 Hubungi Kami</h1>
                    <p class="page-subtitle">Kami siap membantu Anda dengan pertanyaan, masukan, atau dukungan teknis terkait Stress Chat Detector</p>
                </div>
                
                <div class="contact-content">
                    <!-- Contact Information -->
                    <div class="contact-info">
                        <div class="contact-item">
                            <div class="contact-icon">📧</div>
                            <div class="contact-details">
                                <h3>Email Support</h3>
                                <p>support@stresschatdetector.com</p>
                                <p class="contact-note">Respon dalam 24 jam</p>
                                <a href="mailto:support@stresschatdetector.com" class="contact-link">
                                    📤 Kirim Email
                                </a>
                            </div>
                        </div>
                        
                        <div class="contact-item">
                            <div class="contact-icon">🌐</div>
                            <div class="contact-details">
                                <h3>Website Resmi</h3>
                                <p>www.stresschatdetector.com</p>
                                <p class="contact-note">Dokumentasi & Update</p>
                                <a href="#" class="contact-link">
                                    🔗 Kunjungi Website
                                </a>
                            </div>
                        </div>
                        
                        <div class="contact-item">
                            <div class="contact-icon">📱</div>
                            <div class="contact-details">
                                <h3>Media Sosial</h3>
                                <p>Ikuti update dan tips terbaru</p>
                                <div class="social-links">
                                    <a href="#" class="social-btn">📘 Facebook</a>
                                    <a href="#" class="social-btn">📷 Instagram</a>
                                    <a href="#" class="social-btn">💼 LinkedIn</a>
                                </div>
                            </div>
                        </div>
                        
                        <div class="contact-item">
                            <div class="contact-icon">🕒</div>
                            <div class="contact-details">
                                <h3>Jam Layanan</h3>
                                <p><strong>Email Support:</strong> 24/7</p>
                                <p><strong>Live Chat:</strong> 09:00 - 21:00 WIB</p>
                                <p class="contact-note">Senin - Minggu</p>
                            </div>
                        </div>
                    </div>

                    <!-- Contact Form -->
                    <form class="contact-form" id="contactForm">
                        <h2>💬 Kirim Pesan</h2>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="name">Nama Lengkap *</label>
                                <input type="text" id="name" name="name" required placeholder="Masukkan nama lengkap Anda">
                                <span class="form-error" id="nameError"></span>
                            </div>
                            <div class="form-group">
                                <label for="email">Alamat Email *</label>
                                <input type="email" id="email" name="email" required placeholder="nama@email.com">
                                <span class="form-error" id="emailError"></span>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="subject">Kategori Pesan *</label>
                            <select id="subject" name="subject" required>
                                <option value="">-- Pilih Kategori --</option>
                                <option value="bug">🐛 Laporan Bug / Error</option>
                                <option value="feature">💡 Saran Fitur Baru</option>
                                <option value="support">🛠️ Bantuan Teknis</option>
                                <option value="feedback">💬 Feedback & Review</option>
                                <option value="partnership">🤝 Kerjasama Bisnis</option>
                                <option value="general">📋 Pertanyaan Umum</option>
                            </select>
                            <span class="form-error" id="subjectError"></span>
                        </div>
                        
                        <div class="form-group">
                            <label for="message">Pesan Anda *</label>
                            <textarea 
                                id="message" 
                                name="message" 
                                rows="6" 
                                required 
                                placeholder="Tuliskan pesan Anda dengan detail di sini. Semakin spesifik informasi yang Anda berikan, semakin baik kami dapat membantu Anda."
                                maxlength="500"
                            ></textarea>
                            <span class="form-error" id="messageError"></span>
                            <div class="char-counter">
                                <span id="charCount">0</span>/500 karakter
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label class="checkbox-label">
                                <input type="checkbox" id="privacy" name="privacy" required>
                                <span class="checkmark"></span>
                                Saya menyetujui <a href="#" class="privacy-link">Kebijakan Privasi</a> dan <a href="#" class="privacy-link">Syarat Layanan</a> *
                            </label>
                            <span class="form-error" id="privacyError"></span>
                        </div>
                        
                        <button type="submit" class="submit-btn" id="submitBtn">
                            <span class="btn-text">📤 Kirim Pesan</span>
                            <span class="btn-loading">⏳ Mengirim...</span>
                        </button>
                    </form>
                </div>

                <!-- FAQ Section -->
                <div class="contact-faq">
                    <h2>❓ Pertanyaan yang Sering Diajukan</h2>
                    <div class="faq-grid">
                        <div class="faq-card">
                            <h4>🐛 Bagaimana cara melaporkan bug atau error?</h4>
                            <p>Pilih kategori "Laporan Bug / Error" dan berikan detail lengkap tentang masalah yang Anda alami, termasuk screenshot dan langkah-langkah untuk mereproduksi masalah tersebut.</p>
                        </div>
                        
                        <div class="faq-card">
                            <h4>💡 Bisakah saya mengusulkan fitur baru?</h4>
                            <p>Tentu saja! Kami sangat menghargai masukan dari pengguna. Pilih kategori "Saran Fitur Baru" dan jelaskan secara detail fitur yang Anda inginkan beserta alasan mengapa fitur tersebut berguna.</p>
                        </div>
                        
                        <div class="faq-card">
                            <h4>⏰ Berapa lama waktu respon dari tim support?</h4>
                            <p>Kami berusaha merespon email dalam waktu maksimal 24 jam. Untuk masalah urgent yang memerlukan respon cepat, mohon cantumkan kata "URGENT" di subjek pesan Anda.</p>
                        </div>
                        
                        <div class="faq-card">
                            <h4>🔒 Apakah data saya aman saat menghubungi support?</h4>
                            <p>Ya, semua komunikasi dengan tim support kami dilindungi dengan enkripsi dan kebijakan privasi yang ketat. Kami tidak akan membagikan informasi pribadi Anda kepada pihak ketiga.</p>
                        </div>
                        
                        <div class="faq-card">
                            <h4>📱 Apakah ada dukungan untuk platform mobile?</h4>
                            <p>Saat ini aplikasi web kami sudah responsive dan dapat diakses melalui browser mobile. Aplikasi mobile native sedang dalam tahap pengembangan dan akan segera diluncurkan.</p>
                        </div>
                        
                        <div class="faq-card">
                            <h4>🆓 Apakah layanan ini gratis atau berbayar?</h4>
                            <p>Stress Chat Detector menyediakan versi gratis dengan fitur dasar. Untuk fitur advanced dan kapasitas analisis yang lebih besar, tersedia paket premium dengan harga terjangkau.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    init(container) {
        this.container = container;
        this.container.innerHTML = this.render();
        this.form = this.container.querySelector('#contactForm');
        this.addEventListeners();
        this.addScrollAnimation();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    addEventListeners() {
        if (this.form) {
            this.form.addEventListener('submit', this.handleSubmit.bind(this));
            
            // Real-time validation
            const inputs = this.form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => {
                    this.clearError(input);
                    if (input.type === 'email' && input.value) {
                        this.validateField(input);
                    }
                });
            });

            // Character counter for message
            const messageField = this.form.querySelector('#message');
            const charCount = this.form.querySelector('#charCount');
            
            if (messageField && charCount) {
                messageField.addEventListener('input', (e) => {
                    const count = e.target.value.length;
                    charCount.textContent = count;
                    
                    const counter = charCount.parentElement;
                    if (count > 450) {
                        counter.classList.add('char-limit-exceeded');
                    } else {
                        counter.classList.remove('char-limit-exceeded');
                    }
                });
            }
        }
    }

    addScrollAnimation() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -30px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Animate contact items
        const contactItems = this.container.querySelectorAll('.contact-item');
        contactItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
            observer.observe(item);
        });

        // Animate FAQ cards
        const faqCards = this.container.querySelectorAll('.faq-card');
        faqCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = `opacity 0.4s ease ${index * 0.1}s, transform 0.4s ease ${index * 0.1}s`;
            observer.observe(card);
        });

        // Animate form
        const form = this.container.querySelector('.contact-form');
        if (form) {
            form.style.opacity = '0';
            form.style.transform = 'translateX(20px)';
            form.style.transition = 'opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s';
            observer.observe(form);
        }
    }

    validateField(field) {
        const errorElement = this.container.querySelector(`#${field.name}Error`);
        let isValid = true;
        let errorMessage = '';

        if (field.required && !field.value.trim()) {
            isValid = false;
            errorMessage = 'Field ini wajib diisi';
        } else if (field.value.trim()) {
            switch (field.type) {
                case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(field.value)) {
                        isValid = false;
                        errorMessage = 'Format email tidak valid';
                    }
                    break;
                case 'text':
                    if (field.value.trim().length < 2) {
                        isValid = false;
                        errorMessage = 'Minimal 2 karakter';
                    } else if (field.value.trim().length > 50) {
                        isValid = false;
                        errorMessage = 'Maksimal 50 karakter';
                    }
                    break;
            }
        }

        // Special validation for textarea
        if (field.tagName === 'TEXTAREA') {
            if (field.required && field.value.trim().length < 10) {
                isValid = false;
                errorMessage = 'Pesan minimal 10 karakter';
            } else if (field.value.length > 500) {
                isValid = false;
                errorMessage = 'Pesan maksimal 500 karakter';
            }
        }

        // Special validation for checkbox
        if (field.type === 'checkbox' && field.required && !field.checked) {
            isValid = false;
            errorMessage = 'Anda harus menyetujui kebijakan privasi';
        }

        // Special validation for select
        if (field.tagName === 'SELECT' && field.required && !field.value) {
            isValid = false;
            errorMessage = 'Silakan pilih salah satu kategori';
        }

        if (errorElement) {
            errorElement.textContent = errorMessage;
            field.classList.toggle('error', !isValid);
        }

        return isValid;
    }

    clearError(field) {
        const errorElement = this.container.querySelector(`#${field.name}Error`);
        if (errorElement) {
            errorElement.textContent = '';
            field.classList.remove('error');
        }
    }

    validateForm() {
        const fields = this.form.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm()) {
            this.showAlert('Mohon perbaiki kesalahan pada form', 'error');
            return;
        }

        const formData = new FormData(this.form);
        const submitBtn = this.form.querySelector('#submitBtn');
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        try {
            // Simulate API call
            await this.simulateFormSubmission(formData);
            
            this.showAlert('Pesan berhasil dikirim! Kami akan segera menghubungi Anda.', 'success');
            this.form.reset();
            this.container.querySelector('#charCount').textContent = '0';
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.showAlert('Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.', 'error');
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    }

    async simulateFormSubmission(formData) {
        // Simulate network delay
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Form data:', Object.fromEntries(formData));
                resolve();
            }, 2000);
        });
    }

    showAlert(message, type = 'info') {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.innerHTML = `
            <div class="alert-content">
                <span class="alert-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
                <span class="alert-message">${message}</span>
                <button class="alert-close" onclick="this.parentElement.parentElement.remove()">✕</button>
            </div>
        `;
        
        // Add to top of container
        this.container.insertBefore(alertDiv, this.container.firstChild);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }

    destroy() {
        if (this.container) {
            this.container.innerHTML = '';
        }
    }

    getMetadata() {
        return {
            title: 'Kontak - Stress Chat Detector',
            description: 'Hubungi tim support Stress Chat Detector untuk bantuan, feedback, atau pertanyaan',
            keywords: 'contact, support, feedback, help, stress chat detector'
        };
    }
}