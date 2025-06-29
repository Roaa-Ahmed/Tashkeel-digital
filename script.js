// Enhanced Mobile Responsiveness
function handleMobileOptimizations() {
    // Detect mobile device
    const isMobile = window.innerWidth <= 768;
    const isTouch = 'ontouchstart' in window;
    
    if (isMobile) {
        // Optimize animations for mobile
        optimizeAnimationsForMobile();
        
        // Add mobile-specific interactions
        addMobileInteractions();
        
        // Optimize performance for mobile
        optimizePerformanceForMobile();
    }
}

function optimizeAnimationsForMobile() {
    // Reduce animation duration on mobile for better performance
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            * {
                animation-duration: 0.5s !important;
                transition-duration: 0.3s !important;
            }
        }
    `;
    document.head.appendChild(style);
}

function addMobileInteractions() {
    // Add touch feedback
    const interactiveElements = document.querySelectorAll('.nav-link, .social-link, .cta-button');
    
    interactiveElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.opacity = '0.7';
        });
        
        element.addEventListener('touchend', function() {
            this.style.opacity = '1';
        });
    });
    
    // Prevent zoom on double tap for buttons
    const buttons = document.querySelectorAll('.cta-button, .social-link');
    buttons.forEach(button => {
        button.addEventListener('touchend', function(e) {
            e.preventDefault();
        });
    });
}

function optimizePerformanceForMobile() {
    // Disable parallax effect on mobile for better performance
    if (window.innerWidth <= 768) {
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.removeEventListener('mousemove', function() {});
        }
    }
    
    // Lazy load animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.hero-text, .hero-image').forEach(el => {
        observer.observe(el);
    });
}

// Handle orientation changes
window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        handleMobileOptimizations();
        // Recalculate layout after orientation change
        window.dispatchEvent(new Event('resize'));
    }, 100);
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        handleMobileOptimizations();
    }, 250);
});

// Initialize mobile optimizations
handleMobileOptimizations();

// Add viewport meta tag if not present (for better mobile experience)
if (!document.querySelector('meta[name="viewport"]')) {
    const viewport = document.createElement('meta');
    viewport.name = 'viewport';
    viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    document.head.appendChild(viewport);
}