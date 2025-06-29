// About Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize about page animations
    initializeAboutAnimations();
    
    // Add page flip effect for navigation
    addPageFlipNavigation();
    
    // Add smooth scrolling for read more button
    addSmoothScrollToSkills();
    
    // Add skill items hover effects
    addSkillItemEffects();
});

function initializeAboutAnimations() {
    // Stagger animations for skill items
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease-out';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 200 * (index + 1));
    });
    
    // Add intersection observer for skills section
    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-skills');
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(skillsSection);
    }
}

function addPageFlipNavigation() {
    // Add page flip effect when navigating from other pages
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') !== 'about.html') {
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

function addSmoothScrollToSkills() {
    const readMoreButton = document.querySelector('.read-more-button');
    
    if (readMoreButton) {
        readMoreButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            const skillsSection = document.querySelector('#skills');
            if (skillsSection) {
                skillsSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Add highlight effect to skills section
                skillsSection.style.animation = 'highlightSection 2s ease-out';
            }
        });
    }
}

function addSkillItemEffects() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        // Add random floating animation delay
        const randomDelay = Math.random() * 2;
        const skillIcon = item.querySelector('.skill-icon');
        
        if (skillIcon) {
            skillIcon.style.animationDelay = `${randomDelay}s`;
        }
        
        // Add click effect
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        // Add mouse move parallax effect
        item.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            const moveX = (x - 0.5) * 10;
            const moveY = (y - 0.5) * 10;
            
            this.style.transform = `translateY(-10px) translateX(${moveX}px) translateY(${moveY}px)`;
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Add CSS animations via JavaScript
const aboutStyles = document.createElement('style');
aboutStyles.textContent = `
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
    
    @keyframes highlightSection {
        0%, 100% {
            background: rgba(255, 255, 255, 0.05);
        }
        50% {
            background: rgba(255, 107, 53, 0.1);
        }
    }
    
    .animate-skills .skill-item {
        animation: skillItemPop 0.6s ease-out both;
    }
    
    @keyframes skillItemPop {
        0% {
            transform: scale(0.8) translateY(20px);
            opacity: 0;
        }
        50% {
            transform: scale(1.05) translateY(-5px);
        }
        100% {
            transform: scale(1) translateY(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(aboutStyles);

// Add page transition effect on load
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

// Handle page visibility for animations
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        // Restart animations when page becomes visible
        const animatedElements = document.querySelectorAll('.about-image, .about-text');
        animatedElements.forEach(el => {
            el.style.animation = 'none';
            setTimeout(() => {
                el.style.animation = '';
            }, 10);
        });
    }
});