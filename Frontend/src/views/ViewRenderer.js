// views/ViewRenderer.js
import { HomeView } from './pages/HomeView.js';
import { DetectorView } from './pages/DetectorView.js';
import { TutorialView } from './pages/TutorialView.js';
import { AboutView } from './pages/AboutView.js';
import { ContactView } from './pages/ContactView.js';

export class ViewRenderer {
    constructor() {
        this.views = {
            home: new HomeView(),
            detector: new DetectorView(),
            tutorial: new TutorialView(),
            about: new AboutView(),
            contact: new ContactView()
        };
        this.currentView = null;
        this.container = null;
    }

    async renderPage(pageName) {
        try {
            console.log(`Rendering page: ${pageName}`);
            
            // Get or create main container
            this.container = document.getElementById('main-content') || document.querySelector('.main-content') || document.querySelector('main');
            
            if (!this.container) {
                console.error('Main content container not found');
                return;
            }

            // Deactivate current view if exists
            if (this.currentView && typeof this.currentView.deactivate === 'function') {
                this.currentView.deactivate();
            }

            // Get the view
            const view = this.views[pageName];
            if (!view) {
                console.error(`View not found for page: ${pageName}`);
                return;
            }

            // Clear container
            this.container.innerHTML = '';

            // Mount the view
            if (typeof view.mount === 'function') {
                view.mount(this.container);
            } else if (typeof view.init === 'function') {
                view.init(this.container);
            } else if (typeof view.render === 'function') {
                this.container.innerHTML = view.render();
                
                // Initialize view-specific logic
                if (typeof view.bindEvents === 'function') {
                    view.bindEvents();
                }
                if (typeof view.initializeDragAndDrop === 'function') {
                    view.initializeDragAndDrop();
                }
            }

            // Activate the view
            if (typeof view.activate === 'function') {
                view.activate();
            }

            // Set current view
            this.currentView = view;

            // Dispatch page rendered event
            document.dispatchEvent(new CustomEvent('pageRendered', {
                detail: { 
                    page: pageName,
                    view: view 
                }
            }));

            console.log(`Page rendered successfully: ${pageName}`);
            
        } catch (error) {
            console.error(`Error rendering page ${pageName}:`, error);
            this.renderErrorPage(error);
        }
    }

    renderErrorPage(error) {
        if (this.container) {
            this.container.innerHTML = `
                <div class="error-page">
                    <div class="error-content">
                        <h1>🚨 Oops! Terjadi Kesalahan</h1>
                        <p>Maaf, halaman tidak dapat dimuat dengan benar.</p>
                        <p class="error-details">${error.message}</p>
                        <button onclick="window.location.reload()" class="btn btn-primary">
                            🔄 Muat Ulang Halaman
                        </button>
                    </div>
                </div>
            `;
        }
    }

    getCurrentView() {
        return this.currentView;
    }

    destroyCurrentView() {
        if (this.currentView && typeof this.currentView.destroy === 'function') {
            this.currentView.destroy();
        }
        this.currentView = null;
    }
}