// views/pages/HomeView.js
export class HomeView {
    constructor() {
        this.pageId = 'home';
        this.isActive = false;
        this.animationObserver = null;
        this.typingInterval = null;
        this.currentTextIndex = 0;
        this.heroTexts = [
            "Deteksi tingkat stress dalam percakapan chat dengan teknologi AI",
            "Analisis mendalam untuk komunikasi yang lebih sehat",
            "Tingkatkan kualitas hubungan digital Anda"
        ];
    }

    render() {
        console.log('[HomeView] render called');
        return `
            <div id="home" class="page-section ${this.isActive ? 'active' : ''}">
                <div class="hero-section">
                    <div class="hero-content">
                        <h1>🧠 Stress Chat Detector</h1>
                        <p class="hero-subtitle" id="dynamicSubtitle">Deteksi tingkat stress dalam percakapan chat dengan teknologi AI</p>
                        <div class="hero-features">
                            <div class="feature" data-aos="fade-up" data-aos-delay="100">
                                <div class="feature-icon">📱</div>
                                <h3>Upload Screenshot</h3>
                                <p>Upload screenshot chat dari berbagai platform media sosial dan aplikasi pesan dengan mudah dan cepat</p>
                            </div>
                            <div class="feature" data-aos="fade-up" data-aos-delay="200">
                                <div class="feature-icon">🔍</div>
                                <h3>Analisis AI</h3>
                                <p>Menggunakan teknologi AI terdepan untuk menganalisis tingkat stress, sentimen, dan pola komunikasi</p>
                            </div>
                            <div class="feature" data-aos="fade-up" data-aos-delay="300">
                                <div class="feature-icon">📊</div>
                                <h3>Hasil Detail</h3>
                                <p>Mendapatkan hasil analisis komprehensif dengan visualisasi menarik dan rekomendasi actionable</p>
                            </div>
                        </div>
                        
                        <button class="cta-button" id="startDetectionBtn" data-aos="zoom-in" data-aos-delay="500">
                            Mulai Deteksi
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    mount(container) {
        if (!container) {
            console.error('[HomeView] Container element not found');
            return;
        }
        
        console.log('[HomeView] Mounting view to container');
        container.innerHTML = this.render();
        
        // Langsung bind events setelah mount
        this.bindEvents();
        this.initializeAnimations();
        this.startDynamicText();
    }

    bindEvents() {
        console.log('[HomeView] Binding events');
        const startBtn = document.getElementById('startDetectionBtn');
        
        if (startBtn) {
            // Remove existing listeners first
            startBtn.removeEventListener('click', this.boundHandleStartClick);
            
            // Bind the method to maintain correct 'this' context
            this.boundHandleStartClick = this.handleStartClick.bind(this);
            
            // Add new listener
            startBtn.addEventListener('click', this.boundHandleStartClick);
            
            // Add pulse animation on hover
            startBtn.addEventListener('mouseenter', () => {
                startBtn.classList.add('pulse');
            });
            
            startBtn.addEventListener('mouseleave', () => {
                startBtn.classList.remove('pulse');
            });
            
            console.log('[HomeView] Start button event bound successfully');
        } else {
            console.warn('[HomeView] Start button not found');
        }

        // Add feature card interactions
        this.addFeatureCardEffects();
        
        // Add scroll animations
        this.addScrollAnimations();
    }

    addFeatureCardEffects() {
        const featureCards = document.querySelectorAll('.feature');
        
        featureCards.forEach((card, index) => {
            // Add staggered entrance animation
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150);
            
            // Enhanced hover effects
            card.addEventListener('mouseenter', () => {
                // Add ripple effect
                this.createRippleEffect(card);
                
                // Animate other cards
                featureCards.forEach((otherCard, otherIndex) => {
                    if (otherCard !== card) {
                        otherCard.style.transform = 'scale(0.95)';
                        otherCard.style.opacity = '0.7';
                    }
                });
            });
            
            card.addEventListener('mouseleave', () => {
                // Reset all cards
                featureCards.forEach(otherCard => {
                    otherCard.style.transform = 'scale(1)';
                    otherCard.style.opacity = '1';
                });
            });
            
            // Add click animation
            card.addEventListener('click', () => {
                card.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    card.style.transform = 'scale(1)';
                }, 150);
            });
        });
    }

    createRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(102, 126, 234, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.marginLeft = '-10px';
        ripple.style.marginTop = '-10px';
        ripple.style.zIndex = '1';
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }

    addScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Trigger counter animation for stats
                    if (entry.target.classList.contains('stat-item')) {
                        this.animateStatNumbers(entry.target);
                    }
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });

        const animatableElements = document.querySelectorAll('.stat-item, .feature');
        animatableElements.forEach(el => observer.observe(el));
        
        this.animationObserver = observer;
    }

    animateStatNumbers(statItem) {
        const numberElement = statItem.querySelector('.stat-number');
        if (!numberElement) return;
        
        const targetText = numberElement.textContent;
        
        // Only animate if it's a number
        const targetNumber = parseInt(targetText);
        if (!isNaN(targetNumber)) {
            let currentNumber = 0;
            const increment = targetNumber / 30;
            
            const counter = setInterval(() => {
                currentNumber += increment;
                if (currentNumber >= targetNumber) {
                    numberElement.textContent = targetText;
                    clearInterval(counter);
                } else {
                    numberElement.textContent = Math.floor(currentNumber);
                }
            }, 50);
        }
    }

    initializeAnimations() {
        // Add CSS animations keyframes if not already added
        if (!document.querySelector('#homeAnimations')) {
            const style = document.createElement('style');
            style.id = 'homeAnimations';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
                
                .feature {
                    opacity: 0;
                    transform: translateY(30px);
                    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                
                .animate-in {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
                
                .cta-button.pulse {
                    animation: buttonPulse 0.6s ease-in-out;
                }
                
                @keyframes buttonPulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    startDynamicText() {
        const subtitleElement = document.getElementById('dynamicSubtitle');
        if (!subtitleElement) return;
        
        let currentIndex = 0;
        
        const changeText = () => {
            // Fade out
            subtitleElement.style.opacity = '0';
            subtitleElement.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                // Change text
                currentIndex = (currentIndex + 1) % this.heroTexts.length;
                subtitleElement.textContent = this.heroTexts[currentIndex];
                
                // Fade in
                subtitleElement.style.opacity = '1';
                subtitleElement.style.transform = 'translateY(0)';
            }, 300);
        };
        
        // Change text every 4 seconds
        this.typingInterval = setInterval(changeText, 4000);
    }

    handleStartClick(event) {
        event.preventDefault();
        console.log('[HomeView] Start detection button clicked');
        
        const button = event.target;
        
        // Prevent multiple clicks
        if (button.disabled) {
            console.log('[HomeView] Button already disabled, ignoring click');
            return;
        }
        
        // Add click animation
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
        
        // Add loading state
        const originalText = button.innerHTML;
        button.innerHTML = 'Memuat...';
        button.disabled = true;
        
        // Navigate to detector page
        setTimeout(() => {
            try {
                this.navigateToDetector();
            } catch (error) {
                console.error('[HomeView] Navigation error:', error);
                button.innerHTML = originalText;
                button.disabled = false;
            }
        }, 500);
    }

    navigateToDetector() {
        console.log('[HomeView] Navigating to detector');
        
        // Method 1: Try global navigation function
        if (typeof window.navigateToPage === 'function') {
            console.log('[HomeView] Using global navigateToPage function');
            window.navigateToPage('detector');
            return;
        }
        
        // Method 2: Try custom event
        console.log('[HomeView] Using custom navigation event');
        const event = new CustomEvent('navigate', {
            detail: { page: 'detector' }
        });
        window.dispatchEvent(event);
        
        // Method 3: Try direct navigation controller access
        if (window.app && window.app.navigationController) {
            console.log('[HomeView] Using direct navigation controller');
            window.app.navigationController.navigateToPage('detector');
            return;
        }
        
        // Method 4: Fallback - try to find navigation controller
        if (window.navigationController) {
            console.log('[HomeView] Using window.navigationController');
            window.navigationController.navigateToPage('detector');
            return;
        }
        
        console.warn('[HomeView] No navigation method available');
    }

    activate() {
        console.log('[HomeView] Activating view');
        this.isActive = true;
        const element = document.getElementById(this.pageId);
        if (element) {
            element.classList.add('active');
            console.log('[HomeView] View activated successfully');
        } else {
            console.warn('[HomeView] Home element not found for activation');
        }
    }

    deactivate() {
        console.log('[HomeView] Deactivating view');
        this.isActive = false;
        const element = document.getElementById(this.pageId);
        if (element) {
            element.classList.remove('active');
        }
    }

    init(container) {
        console.log('[HomeView] Init method called');
        this.mount(container);
        this.activate();
    }

    destroy() {
        console.log('[HomeView] Destroying view');
        
        // Clear intervals
        if (this.typingInterval) {
            clearInterval(this.typingInterval);
            this.typingInterval = null;
        }
        
        // Disconnect observer
        if (this.animationObserver) {
            this.animationObserver.disconnect();
            this.animationObserver = null;
        }
        
        // Clean up event listeners
        const startBtn = document.getElementById('startDetectionBtn');
        if (startBtn && this.boundHandleStartClick) {
            startBtn.removeEventListener('click', this.boundHandleStartClick);
        }
        
        // Remove dynamic styles
        const dynamicStyles = document.querySelector('#homeAnimations');
        if (dynamicStyles) {
            dynamicStyles.remove();
        }
        
        this.deactivate();
    }

    // Method to load external CSS if needed
    loadStylesheet() {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = './styles/home-styles.css';
        link.onload = () => {
            console.log('Home page styles loaded successfully');
        };
        document.head.appendChild(link);
    }

    // Method to get page metadata
    getMetadata() {
        return {
            title: 'Home - Stress Chat Detector',
            description: 'Deteksi tingkat stress dalam percakapan chat dengan teknologi AI. Analisis mendalam untuk komunikasi yang lebih sehat.',
            keywords: 'stress detection, AI, chat analysis, mental health, communication',
            author: 'Stress Chat Detector Team',
            robots: 'index, follow'
        };
    }

    // Method to preload assets
    preloadAssets() {
        const preloadLinks = [
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