// Services Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize services page animations
    initializeServicesAnimations();
    
    // Add page flip navigation
    addPageFlipNavigation();
    
    // Add service item interactions
    addServiceItemInteractions();
    
    // Add scroll animations
    addScrollAnimations();
});

function initializeServicesAnimations() {
    // Stagger animations for service items
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach((item, index) => {
        // Add random floating animation delay
        const randomDelay = Math.random() * 2;
        const serviceIcon = item.querySelector('.service-icon');
        
        if (serviceIcon) {
            serviceIcon.style.animationDelay = `${randomDelay}s`;
        }
        
        // Add intersection observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(item);
    });
}

function addPageFlipNavigation() {
    // Add page flip effect when navigating from other pages
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') !== 'services.html') {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Add page flip out animation
                document.body.style.animation = 'pageFlipOut 0.8s ease-in forwards';
                
                setTimeout(() => {
                    window.location.href = this.getAttribute('href');
                }, 800);
            });
        }
    });
}

function addServiceItemInteractions() {
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach(item => {
        // Add click effect
        item.addEventListener('click', function() {
            this.style.transform = 'translateY(-15px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
        
        // Add mouse move parallax effect
        item.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            const moveX = (x - 0.5) * 15;
            const moveY = (y - 0.5) * 15;
            
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = `translateY(-10px) translateX(${moveX}px) translateY(${moveY}px)`;
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = '';
            }
        });
        
        // Add feature tag hover effects
        const featureTags = item.querySelectorAll('.feature-tag');
        featureTags.forEach(tag => {
            tag.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1) rotate(2deg)';
            });
            
            tag.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    });
}

function addScrollAnimations() {
    // Add scroll-triggered animations
    const animatedElements = document.querySelectorAll('.services-cta, .footer');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => {
        scrollObserver.observe(el);
    });
    
    // Add parallax effect to service icons on scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const serviceIcons = document.querySelectorAll('.service-icon');
        
        serviceIcons.forEach((icon, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            icon.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Add CSS animations via JavaScript
const servicesStyles = document.createElement('style');
servicesStyles.textContent = `
    @keyframes pageFlipOut {
        0% {
            transform: perspective(1000px) rotateY(0deg);
            opacity: 1;
        }
        100% {
            transform: perspective(1000px) rotateY(90deg);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: slideInFromBottom 0.8s ease-out both;
    }
    
    @keyframes slideInFromBottom {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .service-item:hover .service-icon {
        animation-play-state: paused;
        transform: translateY(-15px) scale(1.1);
    }
    
    .service-item:hover .feature-tag {
        animation: tagFloat 0.6s ease-in-out infinite alternate;
    }
    
    @keyframes tagFloat {
        0% {
            transform: translateY(0px);
        }
        100% {
            transform: translateY(-3px);
        }
    }
`;
document.head.appendChild(servicesStyles);

// Add page transition effect on load
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

// Handle page visibility for animations
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        // Restart animations when page becomes visible
        const animatedElements = document.querySelectorAll('.services-header, .service-item');
        animatedElements.forEach(el => {
            el.style.animation = 'none';
            setTimeout(() => {
                el.style.animation = '';
            }, 10);
        });
    }
});

// Add smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});