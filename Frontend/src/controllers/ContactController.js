// Contact Controller
export class ContactController {
    constructor() {
        this.contactForm = null;
    }

    init() {
        console.log('ContactController initialized');
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Listen for page changes to initialize contact form
        document.addEventListener('pageRendered', (e) => {
            if (e.detail.page === 'contact') {
                this.initializeContactForm();
            }
        });
    }

    initializeContactForm() {
        this.contactForm = document.getElementById('contactForm');
        if (!this.contactForm) return;

        this.contactForm.addEventListener('submit', (e) => this.handleContactSubmit(e));
    }

    handleContactSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        // Validate form
        const validation = this.validateContactForm(data);
        if (!validation.isValid) {
            window.app.appController.showAlert(validation.message, 'warning');
            return;
        }

        // Submit form
        this.submitContactForm(e.target, data);
    }

    validateContactForm(data) {
        if (!data.name || !data.email || !data.subject || !data.message) {
            return {
                isValid: false,
                message: 'Mohon lengkapi semua field yang wajib diisi'
            };
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            return {
                isValid: false,
                message: 'Format email tidak valid'
            };
        }

        return { isValid: true };
    }

    submitContactForm(form, data) {
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        // Update button state
        submitBtn.textContent = 'Mengirim...';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            console.log('Contact form submitted:', data);
            window.app.appController.showAlert('Pesan berhasil dikirim! Kami akan segera menghubungi Anda.', 'success');
            
            // Reset form
            form.reset();
            
            // Restore button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }
}