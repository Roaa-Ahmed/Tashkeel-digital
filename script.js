// Home Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add active class to clicked link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Add loading animation to profile image
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        profileImage.addEventListener('error', function() {
            this.src = '/placeholder.svg?height=400&width=400&text=Profile+Image';
        });
    }

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');
        const heroText = document.querySelector('.hero-text');
        
        if (heroImage && heroText) {
            const parallaxSpeed = scrolled * 0.1;
            heroImage.style.transform = `translateY(${parallaxSpeed}px)`;
            heroText.style.transform = `translateY(${-parallaxSpeed}px)`;
        }
    });

    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click ripple effect to buttons
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 1;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Performance optimization for mobile devices
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        // Reduce animation complexity on mobile
        const decoration = document.querySelector('.image-decoration');
        if (decoration) {
            decoration.style.animationDuration = '45s';
        }
    }

    // Handle device orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            // Recalculate layout after orientation change
            window.scrollTo(0, 0);
        }, 100);
    });
});

// إضافة فانكشن لفتح الإنستا
function openInstagram() {
    // يمكنك تغيير اليوزرنيم هنا
    const instagramUsername = 'tashkeel_digital'; // غير ده باليوزرنيم الصحيح
    
    // محاولة فتح الأبليكيشن الأول
    const instagramApp = `instagram://user?username=${instagramUsername}`;
    const instagramWeb = `https://www.instagram.com/${instagramUsername}/`;
    
    // إنشاء لينك مؤقت للتجربة
    const tempLink = document.createElement('a');
    tempLink.href = instagramApp;
    tempLink.style.display = 'none';
    document.body.appendChild(tempLink);
    
    // محاولة فتح الأبليكيشن
    tempLink.click();
    
    // إذا فشل فتح الأبليكيشن، افتح الموقع
    setTimeout(() => {
        window.open(instagramWeb, '_blank');
        document.body.removeChild(tempLink);
    }, 500);
}

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Add smooth scroll behavior for internal links
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

// Add loading states and error handling
window.addEventListener('load', function() {
    // Hide loading spinner if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
    
    // Show main content
    document.body.style.opacity = '1';
});

// Handle network errors
window.addEventListener('error', function(e) {
    console.log('Resource loading error:', e.target.src || e.target.href);
});

// Add performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
}