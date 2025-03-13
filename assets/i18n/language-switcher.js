/**
 * Language Switcher Functionality
 * Handles language switching and translation application
 */
const LanguageSwitcher = {
    /**
     * Default language for the site
     * @type {string}
     */
    defaultLanguage: 'pt-br',
    
    /**
     * Available languages
     * @type {Array}
     */
    languages: ['en', 'pt-br'],
    
    /**
     * Current active language
     * @type {string}
     */
    currentLanguage: 'pt-br',
    
    /**
     * Initialize language switcher
     */
    init: function() {
        // Try to get language from localStorage
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage && this.languages.includes(savedLanguage)) {
            this.currentLanguage = savedLanguage;
        } else {
            // Set default language based on browser language
            const browserLang = navigator.language || navigator.userLanguage;
            if (browserLang.startsWith('pt')) {
                this.currentLanguage = 'pt-br';
            } else {
                this.currentLanguage = 'en';
            }
            localStorage.setItem('language', this.currentLanguage);
        }
        
        // Apply language immediately if DOM is already loaded
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            this.applyLanguage();
            this.setupEventListeners();
        } else {
            // Initialize language after DOM is loaded
            document.addEventListener('DOMContentLoaded', () => {
                this.applyLanguage();
                this.setupEventListeners();
            });
        }
        
        // Also listen for page loads to ensure the correct language is applied
        window.addEventListener('load', () => {
            this.updateActiveButton();
            this.applyLanguage();
        });
    },
    
    /**
     * Setup event listeners for language switching
     */
    setupEventListeners: function() {
        const languageSwitcher = document.getElementById('language-switcher');
        if (languageSwitcher) {
            // Set initial state
            this.updateActiveButton();
            
            // Add click events
            const languageButtons = languageSwitcher.querySelectorAll('.language-btn');
            languageButtons.forEach(btn => {
                // Remove any existing event listeners to prevent duplicates
                const newBtn = btn.cloneNode(true);
                btn.parentNode.replaceChild(newBtn, btn);
                
                // Add new event listener
                newBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const newLang = newBtn.getAttribute('data-lang');
                    this.switchLanguage(newLang);
                });
            });
        }
    },
    
    /**
     * Update the active state of language buttons
     */
    updateActiveButton: function() {
        const languageSwitcher = document.getElementById('language-switcher');
        if (languageSwitcher) {
            const languageButtons = languageSwitcher.querySelectorAll('.language-btn');
            languageButtons.forEach(btn => {
                const lang = btn.getAttribute('data-lang');
                if (lang === this.currentLanguage) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }
    },
    
    /**
     * Switch to a different language
     * @param {string} language - The language code to switch to
     */
    switchLanguage: function(language) {
        if (this.languages.includes(language)) {
            // Always switch, even if it's the same language (to force refresh)
            this.currentLanguage = language;
            localStorage.setItem('language', language);
            
            // Update the active button
            this.updateActiveButton();
            
            // Apply the language
            this.applyLanguage();
            
            // Update HTML lang attribute
            document.documentElement.lang = this.currentLanguage;
            
            console.log('Language switched to:', language);
        }
    },
    
    /**
     * Apply the current language to the DOM
     */
    applyLanguage: function() {
        // Check if translations are loaded
        if (!window.i18n) {
            console.error('Translation data not found: i18n object is missing');
            return;
        }
        
        if (!window.i18n[this.currentLanguage]) {
            console.error('Translation data not found for language:', this.currentLanguage);
            return;
        }
        
        const elements = document.querySelectorAll('[data-i18n]');
        const translations = window.i18n[this.currentLanguage];
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[key]) {
                // Special handling for different element types
                if (element.tagName === 'INPUT') {
                    if (element.hasAttribute('placeholder')) {
                        element.setAttribute('placeholder', translations[key]);
                    }
                    if (element.type === 'submit' || element.type === 'button') {
                        element.value = translations[key];
                    }
                } else if (element.tagName === 'TEXTAREA' && element.hasAttribute('placeholder')) {
                    element.setAttribute('placeholder', translations[key]);
                } else {
                    element.textContent = translations[key];
                }
            } else {
                console.warn(`Translation missing for key: ${key} in language: ${this.currentLanguage}`);
            }
        });
        
        // Update CV download button href based on language
        this.updateCVDownloadButton();
        
        // Update HTML lang attribute
        document.documentElement.lang = this.currentLanguage;
        
        // Dispatch an event to notify other components that the language has changed
        const event = new CustomEvent('languageChanged', { 
            detail: { language: this.currentLanguage } 
        });
        document.dispatchEvent(event);
    },
    
    /**
     * Update CV download button href based on current language
     */
    updateCVDownloadButton: function() {
        const cvButton = document.getElementById('cv-download-btn');
        if (cvButton) {
            if (this.currentLanguage === 'en') {
                cvButton.href = 'assets/docs/CV_GABRIEL_DA_SILVA_VASCONCELOS_EN.pdf';
            } else {
                cvButton.href = 'assets/docs/CV_GABRIEL_DA_SILVA_VASCONCELOS_PT-BR.pdf';
            }
        }
    }
};

// Make LanguageSwitcher globally accessible
window.LanguageSwitcher = LanguageSwitcher;

// Initialize the language switcher
document.addEventListener('DOMContentLoaded', function() {
    LanguageSwitcher.init();
});

// Also initialize if the DOM is already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    LanguageSwitcher.init();
} 