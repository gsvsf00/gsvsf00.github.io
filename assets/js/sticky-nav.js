// Sticky Navigation Menu
document.addEventListener('DOMContentLoaded', function() {
    const stickyNav = document.getElementById('sticky-nav');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Toggle menu visibility
    navToggle.addEventListener('click', function() {
        stickyNav.classList.toggle('active');
    });
    
    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Smooth scroll to the section
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Close the menu
                stickyNav.classList.remove('active');
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        const isClickInside = stickyNav.contains(e.target);
        
        if (!isClickInside && stickyNav.classList.contains('active')) {
            stickyNav.classList.remove('active');
        }
    });
    
    // Show/hide navigation based on scroll position
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add small active indicator when scrolled down
        if (currentScrollTop > 300) {
            navToggle.classList.add('scrolled');
        } else {
            navToggle.classList.remove('scrolled');
        }
        
        // Update last scroll position
        lastScrollTop = currentScrollTop;
    });
    
    // Highlight current section in the menu
    window.addEventListener('scroll', highlightCurrentSection);
    
    function highlightCurrentSection() {
        const sections = document.querySelectorAll('section, div[id^="fh5co-"]');
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (sectionId && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}); 