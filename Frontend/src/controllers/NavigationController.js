// controllers/NavigationController.js
import { ViewRenderer } from '../views/ViewRenderer.js';

export class NavigationController {
    constructor() {
        this.currentPage = 'home';
        this.viewRenderer = new ViewRenderer();
        this.navMenu = null;
        this.hamburger = null;
        this.isNavigating = false;
        this.isMobileMenuOpen = false;
        this.hamburgerInitialized = false;
    }

    init() {
        console.log('NavigationController initialized');
        this.setupEventListeners();
        this.setupResponsiveHandling();
        this.initializeHomePage();
    }

    async initializeHomePage() {
        try {
            console.log('Initializing home page...');
            await this.viewRenderer.renderPage('home');
            this.updateNavigation('home');
        } catch (error) {
            console.error('Error initializing home page:', error);
        }
    }

    setupEventListeners() {
        // Handle navigation clicks (both nav-link and footer-link)
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav-link') || e.target.classList.contains('footer-link')) {
                e.preventDefault();
                const page = e.target.getAttribute('data-page');
                if (page) {
                    this.navigateToPage(page);
                }
            }
        });

        // Global navigation function
        window.navigateToPage = (page) => {
            this.navigateToPage(page);
        };

        // Custom navigation event
        window.addEventListener('navigate', (e) => {
            if (e.detail && e.detail.page) {
                this.navigateToPage(e.detail.page);
            }
        });

        // Setup hamburger menu - wait for DOM to be ready
        document.addEventListener('DOMContentLoaded', () => {
            this.initHamburgerMenu();
        });

        // If DOM is already loaded
        if (document.readyState !== 'loading') {
            setTimeout(() => this.initHamburgerMenu(), 100);
        }

        // Handle page rendered event
        document.addEventListener('pageRendered', (e) => {
            console.log(`Page rendered successfully: ${e.detail.page}`);
            this.onPageRendered(e.detail.page, e.detail.view);
            // Re-initialize hamburger menu setelah page render
            setTimeout(() => this.initHamburgerMenu(), 100);
        });

        // Handle clicks outside mobile menu to close it
        document.addEventListener('click', (e) => {
            if (this.isMobileMenuOpen && 
                !this.navMenu.contains(e.target) && 
                !this.hamburger.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }

    initHamburgerMenu() {
        console.log('Initializing hamburger menu...');
        
        this.hamburger = document.querySelector('.hamburger') || document.getElementById('hamburger');
        this.navMenu = document.querySelector('.nav-menu') || document.getElementById('navMenu');
        
        console.log('Hamburger element:', this.hamburger);
        console.log('NavMenu element:', this.navMenu);
        
        if (this.hamburger && this.navMenu) {
            // Remove existing event listeners to prevent duplicates
            if (this.handleHamburgerClick) {
                this.hamburger.removeEventListener('click', this.handleHamburgerClick);
            }
            
            // Create bound function
            this.handleHamburgerClick = this.handleHamburgerClick.bind(this);
            
            // Add click event listener
            this.hamburger.addEventListener('click', this.handleHamburgerClick);
            
            // Ensure hamburger is visible on mobile
            this.ensureHamburgerVisibility();
            
            // Setup mobile menu styles
            this.setupMobileMenuStyles();
            
            // Mark as initialized
            this.hamburgerInitialized = true;
            
            console.log('Hamburger menu initialized successfully');
        } else {
            console.error('Hamburger or NavMenu not found!');
            console.log('Available elements with .hamburger class:', document.querySelectorAll('.hamburger'));
            console.log('Available elements with .nav-menu class:', document.querySelectorAll('.nav-menu'));
        }
    }

    ensureHamburgerVisibility() {
        if (!this.hamburger) return;
        
        // Force display the hamburger on mobile
        if (window.innerWidth <= 968) {
            this.hamburger.style.display = 'flex';
            this.hamburger.style.position = 'relative';
            this.hamburger.style.zIndex = '1001';
            
            console.log('Hamburger visibility ensured for mobile');
            console.log('Hamburger computed style:', window.getComputedStyle(this.hamburger).display);
        }
    }

    setupMobileMenuStyles() {
        if (!this.navMenu) return;
        
        // Apply mobile styles only on mobile screens
        if (window.innerWidth <= 968) {
            // Reset any previous styles
            this.navMenu.style.position = 'fixed';
            this.navMenu.style.top = '0';
            this.navMenu.style.left = this.isMobileMenuOpen ? '0' : '-100%';
            this.navMenu.style.width = '80%';
            this.navMenu.style.height = '100vh';
            this.navMenu.style.backgroundColor = '#fff';
            this.navMenu.style.display = 'flex';
            this.navMenu.style.flexDirection = 'column';
            this.navMenu.style.padding = '70px 20px 20px';
            this.navMenu.style.boxShadow = '2px 0 10px rgba(0,0,0,0.1)';
            this.navMenu.style.zIndex = '1000';
            this.navMenu.style.transition = 'left 0.3s ease';
            this.navMenu.style.listStyle = 'none';
            
            console.log('Mobile menu styles applied');
        }
    }

    handleHamburgerClick(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Hamburger clicked!');
        console.log('Hamburger element dimensions:', {
            width: this.hamburger.offsetWidth,
            height: this.hamburger.offsetHeight,
            display: window.getComputedStyle(this.hamburger).display
        });
        this.toggleMobileMenu();
    }

    setupResponsiveHandling() {
        window.addEventListener('resize', () => {
            if (window.innerWidth > 968) {
                // Desktop view - close menu and reset styles
                this.closeMobileMenu();
                this.resetDesktopStyles();
            } else {
                // Mobile view - ensure hamburger is visible and apply mobile styles
                this.ensureHamburgerVisibility();
                this.setupMobileMenuStyles();
            }
        });
    }

    resetDesktopStyles() {
        if (this.navMenu) {
            // Reset all mobile-specific styles for desktop
            this.navMenu.style.position = '';
            this.navMenu.style.top = '';
            this.navMenu.style.left = '';
            this.navMenu.style.width = '';
            this.navMenu.style.height = '';
            this.navMenu.style.backgroundColor = '';
            this.navMenu.style.flexDirection = '';
            this.navMenu.style.padding = '';
            this.navMenu.style.boxShadow = '';
            this.navMenu.style.zIndex = '';
            this.navMenu.style.transition = '';
            this.navMenu.style.display = '';
        }
        
        if (this.hamburger) {
            this.hamburger.style.display = '';
        }
    }

    async navigateToPage(page) {
        if (page === this.currentPage || this.isNavigating) return;
        
        console.log(`Navigating to: ${page}`);
        this.isNavigating = true;
        
        try {
            this.showLoadingIndicator();
            this.closeMobileMenu();

            // Add small delay for smooth transition
            await new Promise(resolve => setTimeout(resolve, 150));

            await this.viewRenderer.renderPage(page);
            this.currentPage = page;
            this.updateNavigation(page);
            
            // Smooth scroll to top with slight delay
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 100);
            
            console.log(`Successfully navigated to: ${page}`);
            
        } catch (error) {
            console.error('Navigation error:', error);
            this.showNavigationError(error);
        } finally {
            this.isNavigating = false;
            this.hideLoadingIndicator();
        }
    }

    onPageRendered(page, view) {
        console.log(`Setting up page-specific functionality for: ${page}`);
        if (page === 'detector' && window.app && window.app.detectorController) {
            // Detector-specific functionality
        }
    }

    updateNavigation(activePage) {
        // Update nav-link classes
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            const page = link.getAttribute('data-page');
            if (page === activePage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Update footer-link classes
        const footerLinks = document.querySelectorAll('.footer-link');
        footerLinks.forEach(link => {
            const page = link.getAttribute('data-page');
            if (page === activePage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Update page title
        this.updatePageTitle(activePage);
    }

    updatePageTitle(page) {
        const titles = {
            home: 'Beranda - Stress Chat Detector',
            detector: 'Detector - Stress Chat Detector',
            tutorial: 'Tutorial - Stress Chat Detector',
            about: 'Tentang - Stress Chat Detector',
            contact: 'Kontak - Stress Chat Detector'
        };
        
        document.title = titles[page] || 'Stress Chat Detector';
    }

    showLoadingIndicator() {
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            mainContent.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
            mainContent.style.opacity = '0.3';
            mainContent.style.transform = 'translateY(10px)';
        }
    }

    hideLoadingIndicator() {
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            setTimeout(() => {
                mainContent.style.opacity = '1';
                mainContent.style.transform = 'translateY(0)';
                setTimeout(() => {
                    mainContent.style.transition = '';
                }, 300);
            }, 50);
        }
    }

    showNavigationError(error) {
        if (window.app && window.app.appController && window.app.appController.showAlert) {
            window.app.appController.showAlert(
                'Terjadi kesalahan saat memuat halaman. Silakan coba lagi.',
                'error'
            );
        } else {
            console.error('Navigation error:', error);
            alert('Terjadi kesalahan saat memuat halaman. Silakan coba lagi.');
        }
    }

    toggleMobileMenu() {
        console.log('toggleMobileMenu called');
        console.log('Current menu state:', this.isMobileMenuOpen);
        
        if (!this.navMenu || !this.hamburger) {
            console.error('navMenu or hamburger not found!');
            return;
        }

        if (this.isMobileMenuOpen) {
            // Close menu
            console.log('Closing mobile menu');
            this.navMenu.classList.remove('active');
            this.hamburger.classList.remove('active');
            this.navMenu.style.left = '-100%';
            this.isMobileMenuOpen = false;
        } else {
            // Open menu
            console.log('Opening mobile menu');
            this.navMenu.classList.add('active');
            this.hamburger.classList.add('active');
            this.navMenu.style.left = '0';
            this.isMobileMenuOpen = true;
            
            // Add body scroll lock
            document.body.style.overflow = 'hidden';
        }
        
        console.log('Menu state after toggle:', this.isMobileMenuOpen);
        console.log('Menu classes:', this.navMenu.className);
        console.log('Menu left position:', this.navMenu.style.left);
    }

    closeMobileMenu() {
        if (this.navMenu) {
            this.navMenu.classList.remove('active');
            this.navMenu.style.left = '-100%';
        }
        if (this.hamburger) {
            this.hamburger.classList.remove('active');
        }
        this.isMobileMenuOpen = false;
        
        // Remove body scroll lock
        document.body.style.overflow = '';
    }

    getCurrentPage() {
        return this.currentPage;
    }

    getCurrentView() {
        return this.viewRenderer.getCurrentView();
    }

    async refreshCurrentPage() {
        await this.navigateToPage(this.currentPage);
    }

    destroy() {
        if (this.hamburger && this.handleHamburgerClick) {
            this.hamburger.removeEventListener('click', this.handleHamburgerClick);
        }
        this.hamburgerInitialized = false;
    }
}