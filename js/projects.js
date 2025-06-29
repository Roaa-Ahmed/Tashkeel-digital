// Projects Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    const videoModal = document.getElementById('videoModal');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.querySelector('.modal-overlay');
    const projectVideo = document.getElementById('projectVideo');
    const videoTitle = document.getElementById('videoTitle');
    const videoDescription = document.getElementById('videoDescription');
    
    // Project data with video sources and descriptions
    const projectData = {
        restaurant: {
            title: 'Restaurant Website',
            description: 'A modern restaurant website with online ordering system, menu management, and reservation booking. Built with React and Node.js for optimal performance.',
            video: '/placeholder-video.mp4' // Replace with actual video URL
        },
        carshow: {
            title: 'Car Show Platform',
            description: 'An interactive car showcase platform featuring 3D car models, detailed specifications, and virtual showroom experience. Developed using Vue.js and Three.js.',
            video: '/placeholder-video.mp4' // Replace with actual video URL
        },
        gloryscout: {
            title: 'Glory Scout Sports Platform',
            description: 'A comprehensive sports management platform for scouts and athletes. Features player profiles, performance analytics, and recruitment tools built with Angular.',
            video: '/placeholder-video.mp4' // Replace with actual video URL
        },
        sushi: {
            title: 'Sushi Restaurant',
            description: 'An elegant Japanese restaurant website with online ordering, delivery tracking, and loyalty program. Integrated with Stripe for secure payments.',
            video: '/placeholder-video.mp4' // Replace with actual video URL
        },
        makeup: {
            title: 'Makeup Studio',
            description: 'A beautiful beauty and cosmetics e-commerce platform with virtual try-on features, appointment booking, and product customization using AR technology.',
            video: '/placeholder-video.mp4' // Replace with actual video URL
        },
        gym: {
            title: 'Gym & Fitness Center',
            description: 'A complete fitness center management system with membership tracking, workout plans, trainer scheduling, and progress monitoring dashboard.',
            video: '/placeholder-video.mp4' // Replace with actual video URL
        }
    };
    
    // Add click event listeners to project cards
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectType = this.getAttribute('data-project');
            const project = projectData[projectType];
            
            if (project) {
                openVideoModal(project);
            }
        });
        
        // Add hover effect for play button
        const playButton = card.querySelector('.play-button');
        if (playButton) {
            playButton.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.2) rotate(5deg)';
            });
            
            playButton.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0deg)';
            });
        }
    });
    
    // Open video modal
    function openVideoModal(project) {
        videoTitle.textContent = project.title;
        videoDescription.textContent = project.description;
        projectVideo.src = project.video;
        
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Play video after modal opens
        setTimeout(() => {
            projectVideo.play().catch(e => {
                console.log('Video autoplay prevented:', e);
            });
        }, 300);
    }
    
    // Close video modal
    function closeVideoModal() {
        videoModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Pause and reset video
        projectVideo.pause();
        projectVideo.currentTime = 0;
        projectVideo.src = '';
    }
    
    // Modal close event listeners
    modalClose.addEventListener('click', closeVideoModal);
    modalOverlay.addEventListener('click', closeVideoModal);
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeVideoModal();
        }
    });
    
    // Prevent modal content click from closing modal
    document.querySelector('.modal-content').addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Add loading animation to project cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    projectCards.forEach(card => {
        observer.observe(card);
    });
    
    // Add parallax effect to project cards
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.1;
        
        projectCards.forEach((card, index) => {
            const speed = (index % 2 === 0) ? parallax : -parallax;
            card.style.transform = `translateY(${speed}px)`;
        });
    });
    
    // Add ripple effect to project cards
    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
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
                background: rgba(255, 107, 53, 0.3);
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
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .project-card {
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
    
    // Add loading states for images
    const projectImages = document.querySelectorAll('.card-img');
    projectImages.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.src = '/placeholder.svg?height=300&width=400&text=Project+Image';
        });
    });
});

// Add performance optimization
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('.card-img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}