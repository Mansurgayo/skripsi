// src/main.js
import { AppController } from './controllers/AppController.js';
import { NavigationController } from './controllers/NavigationController.js';
import { DetectorController } from './controllers/DetectorController.js';
import { ContactController } from './controllers/ContactController.js';

// Initialize the application
class App {
    constructor() {
        console.log('[App] Constructor called');
        this.appController = null;
        this.navigationController = null;
        this.detectorController = null;
        this.contactController = null;
        
        this.init();
    }

    init() {
        console.log('[App] Init called');
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            console.log('[App] DOM still loading, waiting...');
            document.addEventListener('DOMContentLoaded', () => this.start());
        } else {
            console.log('[App] DOM ready, starting immediately');
            this.start();
        }
    }

    start() {
        console.log('🚀 Stress Chat Detector App Started');
        
        try {
            // Check if required HTML elements exist
            this.checkRequiredElements();
            
            // Initialize controllers
            console.log('[App] Initializing controllers...');
            this.appController = new AppController();
            this.navigationController = new NavigationController();
            this.detectorController = new DetectorController();
            this.contactController = new ContactController();
            
            this.appController.init();
            this.navigationController.init();
            this.detectorController.init();
            this.contactController.init();

            console.log('[App] Controllers initialized successfully');

            // Show home page by default with delay
            setTimeout(() => {
                console.log('[App] Navigating to home page...');
                this.navigationController.navigateToPage('home');
            }, 100);

            // Global error handling
            this.setupGlobalErrorHandling();
            
        } catch (error) {
            console.error('[App] Error during startup:', error);
            this.handleStartupError(error);
        }
    }

    checkRequiredElements() {
        console.log('[App] Checking required HTML elements...');
        
        // Check for main content area
        const mainContent = document.getElementById('mainContent') || 
                           document.querySelector('.main-content') ||
                           document.querySelector('main');
                           
        if (!mainContent) {
            console.warn('[App] Main content element not found, will create one');
            this.createMainContentElement();
        } else {
            console.log('[App] Main content element found:', mainContent.id || mainContent.className);
        }
    }

    createMainContentElement() {
        console.log('[App] Creating main content element');
        const mainContent = document.createElement('div');
        mainContent.id = 'mainContent';
        mainContent.className = 'main-content';
        
        // Try to find app container or use body
        const appContainer = document.getElementById('app') || document.body;
        appContainer.appendChild(mainContent);
        
        console.log('[App] Main content element created and appended');
    }

    handleStartupError(error) {
        console.error('[App] Startup error:', error);
        
        // Show basic error message
        const errorHtml = `
            <div style="padding: 20px; text-align: center; color: #721c24; background: #f8d7da; border: 1px solid #f5c6cb; border-radius: 5px; margin: 20px;">
                <h2>🚫 Aplikasi Gagal Dimuat</h2>
                <p>Terjadi kesalahan saat memulai aplikasi.</p>
                <p><strong>Error:</strong> ${error.message}</p>
                <button onclick="location.reload()" style="padding: 10px 20px; background: #dc3545; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    Coba Lagi
                </button>
            </div>
        `;
        
        const container = document.getElementById('mainContent') || 
                         document.getElementById('app') || 
                         document.body;
        container.innerHTML = errorHtml;
    }

    setupGlobalErrorHandling() {
        console.log('[App] Setting up global error handling');
        
        window.addEventListener('error', (e) => {
            console.error('[App] Global error:', e.error);
            if (this.appController && typeof this.appController.showAlert === 'function') {
                this.appController.showAlert('Terjadi kesalahan yang tidak terduga. Silakan refresh halaman.', 'error');
            }
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.error('[App] Unhandled promise rejection:', e.reason);
            if (this.appController && typeof this.appController.showAlert === 'function') {
                this.appController.showAlert('Terjadi kesalahan dalam memproses permintaan.', 'error');
            }
        });
    }
}

console.log('[Main] Starting application...');
const app = new App();

// Export for global access
window.app = app;
window.navigateToPage = (page) => {
    console.log(`[Global] Navigate to page: ${page}`);
    if (app.navigationController && typeof app.navigationController.navigateToPage === 'function') {
        app.navigationController.navigateToPage(page);
        // Smooth scroll to top after navigation
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
    } else {
        console.error('[Global] Navigation controller not available');
    }
};

// Enhanced smooth navigation function
window.navigateToPageSmooth = (page, targetElement = null) => {
    console.log(`[Global] Navigate to page with smooth scroll: ${page}`);
    
    if (app.navigationController && typeof app.navigationController.navigateToPage === 'function') {
        // Navigate to the page first
        app.navigationController.navigateToPage(page);
        
        // Then handle smooth scrolling
        setTimeout(() => {
            if (targetElement) {
                // If specific element is provided, scroll to it
                const element = document.querySelector(targetElement) || document.getElementById(targetElement);
                if (element) {
                    element.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start',
                        inline: 'nearest'
                    });
                } else {
                    // Fallback to top if element not found
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            } else {
                // Default scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }, 150); // Slight delay to ensure page content is rendered
    } else {
        console.error('[Global] Navigation controller not available');
    }
};

// Global detector functions with smooth scrolling
window.analyzeStress = () => {
    console.log('[Global] Analyze stress called');
    if (app.detectorController && typeof app.detectorController.analyzeStress === 'function') {
        app.detectorController.analyzeStress();
        
        // Smooth scroll to results section after analysis
        setTimeout(() => {
            const resultSection = document.querySelector('.result-section') || 
                                 document.querySelector('.analysis-result') ||
                                 document.getElementById('resultSection');
            
            if (resultSection) {
                resultSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, 500); // Delay to allow analysis to complete
    } else {
        console.error('[Global] Detector controller not available');
    }
};

window.resetForm = () => {
    console.log('[Global] Reset form called');
    if (app.detectorController && typeof app.detectorController.resetForm === 'function') {
        app.detectorController.resetForm();
        
        // Smooth scroll to top after reset
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
    } else {
        console.error('[Global] Detector controller not available');
    }
};

// Additional smooth scroll utilities
window.smoothScrollTo = (targetElement, offset = 0) => {
    const element = typeof targetElement === 'string' 
        ? document.querySelector(targetElement) || document.getElementById(targetElement)
        : targetElement;
    
    if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition + offset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
};

window.smoothScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

console.log('[Main] Application setup complete with smooth navigation');