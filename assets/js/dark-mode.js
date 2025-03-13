/**
 * Dark Mode Toggle Functionality
 * Handles switching between light and dark themes
 */
const ThemeToggle = {
  // DOM element for the theme toggle
  toggleSwitch: null,
  
  // Initialize the theme toggle
  init: function() {
    console.log('ThemeToggle initializing...');
    
    // Get the toggle switch element
    this.toggleSwitch = document.getElementById('theme-toggle');
    
    // If toggle switch doesn't exist, log error and return
    if (!this.toggleSwitch) {
      console.error('Theme toggle element not found');
      return;
    }
    
    console.log('Theme toggle found:', this.toggleSwitch);
    
    // Check for saved theme preference or use OS preference
    const currentTheme = localStorage.getItem('theme') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    console.log('Current theme:', currentTheme);
    
    // Apply the saved theme
    if (currentTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      this.toggleSwitch.checked = true;
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      this.toggleSwitch.checked = false;
    }
    
    // Add event listener for theme toggle
    this.toggleSwitch.addEventListener('change', this.switchTheme.bind(this));
    console.log('Theme toggle event listener added');
  },
  
  // Switch between light and dark themes
  switchTheme: function(e) {
    console.log('Theme toggle changed:', e.target.checked);
    
    if (e.target.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      console.log('Dark theme applied');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      console.log('Light theme applied');
    }
    
    // Update language switcher if it exists
    if (window.LanguageSwitcher && typeof window.LanguageSwitcher.updateActiveButton === 'function') {
      window.LanguageSwitcher.updateActiveButton();
      console.log('Language switcher updated after theme change');
    }
    
    // Update charts if they exist
    this.updateCharts();
  },
  
  // Update charts with new theme colors
  updateCharts: function() {
    if (typeof $.fn.easyPieChart !== 'undefined') {
      // Get the current theme's chart border color from CSS variables
      const chartColor = getComputedStyle(document.documentElement).getPropertyValue('--chart-border-color').trim() || '#FF9000';
      const trackColor = document.documentElement.getAttribute('data-theme') === 'dark' ? '#333' : '#f5f5f5';
      
      // Destroy and recreate charts with new colors
      $('.chart').each(function() {
        const $this = $(this);
        
        // Destroy existing chart
        $this.data('easyPieChart', null);
        
        // The HTML already contains the correct structure with spans and skill names
        // We don't need to modify it, just reinitialize the chart
        
        // Initialize the chart
        $this.easyPieChart({
          scaleColor: false,
          lineWidth: 4,
          lineCap: 'butt',
          barColor: chartColor,
          trackColor: trackColor,
          size: 160,
          animate: 1000
        });
      });
      
      console.log('Charts updated with new theme colors');
    }
  }
};

// Make ThemeToggle globally accessible
window.ThemeToggle = ThemeToggle;

// Initialize theme toggle when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing theme toggle');
  ThemeToggle.init();
});

// Also check if DOM is already loaded (for faster initialization)
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  console.log('DOM already loaded, initializing theme toggle immediately');
  ThemeToggle.init();
} 