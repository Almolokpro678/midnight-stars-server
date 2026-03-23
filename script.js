    // Create animated stars background
function createStars() {
    const starsContainer = document.querySelector('.stars-container');
    const starCount = 150;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        
        // Vary star sizes
        const size = Math.random() * 3 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        starsContainer.appendChild(star);
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Gallery lightbox functionality - Removed
function initGalleryLightbox() {
    // Gallery functionality removed
}

function createLightbox(imgSrc, title, description) {
    // Lightbox functionality removed
}

// Form submission handler
function initContactForm() {
    const form = document.querySelector('.contact-form form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const name = form.querySelector('input[type="text"]').value;
            const email = form.querySelector('input[type="email"]').value;
            const message = form.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            form.reset();
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add notification styles
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            border-radius: 10px;
            color: white;
            font-weight: 600;
            z-index: 3000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        }
        
        .notification.success {
            background: linear-gradient(135deg, #10b981, #059669);
        }
        
        .notification.error {
            background: linear-gradient(135deg, #ef4444, #dc2626);
        }
        
        .notification.info {
            background: linear-gradient(135deg, #3b82f6, #2563eb);
        }
        
        .notification.show {
            opacity: 1;
            transform: translateX(0);
        }
    `;
    
    document.head.appendChild(notificationStyles);
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Button interactions
function initButtonAnimations() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            // Add ripple styles
            if (!document.querySelector('#ripple-styles')) {
                const rippleStyles = document.createElement('style');
                rippleStyles.id = 'ripple-styles';
                rippleStyles.textContent = `
                    .ripple {
                        position: absolute;
                        border-radius: 50%;
                        background: rgba(255, 255, 255, 0.3);
                        transform: scale(0);
                        animation: ripple-animation 0.6s ease-out;
                        pointer-events: none;
                    }
                    
                    @keyframes ripple-animation {
                        to {
                            transform: scale(4);
                            opacity: 0;
                        }
                    }
                    
                    .btn-primary, .btn-secondary {
                        position: relative;
                        overflow: hidden;
                    }
                `;
                document.head.appendChild(rippleStyles);
            }
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Add scroll animation styles
    const scrollStyles = document.createElement('style');
    scrollStyles.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .fade-in-up {
            opacity: 0;
        }
    `;
    document.head.appendChild(scrollStyles);
    
    // Observe elements
    const animateElements = document.querySelectorAll('.feature, .contact-method');
    animateElements.forEach(el => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(15, 15, 35, 0.95)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'rgba(15, 15, 35, 0.8)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
        
        lastScroll = currentScroll;
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    initSmoothScrolling();
    initGalleryLightbox();
    initContactForm();
    initButtonAnimations();
    initScrollAnimations();
    initNavbarScroll();
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.animation = 'fadeIn 1s ease forwards';
    
    const fadeInStyles = document.createElement('style');
    fadeInStyles.textContent = `
        @keyframes fadeIn {
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(fadeInStyles);
});

// Add some interactive particle effects on mouse movement
function initParticleEffects() {
    let particles = [];
    const maxParticles = 50;
    
    document.addEventListener('mousemove', (e) => {
        if (particles.length < maxParticles && Math.random() > 0.9) {
            createParticle(e.clientX, e.clientY);
        }
    });
    
    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = '#fbbf24';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '999';
        particle.style.animation = 'particle-float 2s ease-out forwards';
        
        const particleStyles = document.createElement('style');
        if (!document.querySelector('#particle-styles')) {
            particleStyles.id = 'particle-styles';
            particleStyles.textContent = `
                @keyframes particle-float {
                    to {
                        transform: translateY(-100px) scale(0);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(particleStyles);
        }
        
        document.body.appendChild(particle);
        particles.push(particle);
        
        setTimeout(() => {
            particle.remove();
            particles = particles.filter(p => p !== particle);
        }, 2000);
    }
}

// Initialize particle effects
initParticleEffects();
