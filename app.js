// Siriusly Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initLoading();
    initScrollAnimations();
    initSmoothScrolling();
    initNavbarEffects();
    initServiceCardEffects();
    initParallaxEffects();
});

// Loading Animation
function initLoading() {
    // Create loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading';
    loadingScreen.innerHTML = '<div class="loader"></div>';
    document.body.appendChild(loadingScreen);

    // Hide loading screen after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.classList.add('hide');
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 1000);
    });
}

// Scroll Animations
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.service-card, .feature, .contact-item, .about-text');
    
    // Add scroll-animate class to elements
    animateElements.forEach(element => {
        element.classList.add('scroll-animate');
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all animate elements
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Smooth Scrolling for Navigation
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-menu a, .hero-cta a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal links
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Navbar Effects
function initNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Change navbar opacity based on scroll
        if (scrollTop > 100) {
            navbar.style.background = `rgba(var(--color-slate-900-rgb), 0.98)`;
            navbar.style.boxShadow = 'var(--shadow-lg)';
        } else {
            navbar.style.background = `rgba(var(--color-slate-900-rgb), 0.95)`;
            navbar.style.boxShadow = 'none';
        }

        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    function highlightNavLink() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);
}

// Service Card Interactive Effects
function initServiceCardEffects() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        const icon = card.querySelector('.service-icon');
        const link = card.querySelector('.service-link');
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            // Add pulse animation to icon
            icon.style.animation = 'pulse 0.6s ease-in-out';
            
            // Add glow effect
            this.style.boxShadow = `
                0 20px 40px rgba(var(--color-teal-300-rgb), 0.15),
                0 0 0 1px rgba(var(--color-teal-300-rgb), 0.3)
            `;
        });

        card.addEventListener('mouseleave', function() {
            icon.style.animation = '';
            this.style.boxShadow = '';
        });

        // Card click effect
        card.addEventListener('click', function(e) {
            if (e.target.tagName !== 'A') {
                const serviceLink = this.querySelector('.service-link');
                serviceLink.click();
            }
        });

        // Button click effects
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create ripple effect
            createRippleEffect(this, e);
            
            // Simulate navigation (replace with actual URLs when available)
            const service = card.dataset.service;
            setTimeout(() => {
                console.log(`Navigating to ${service} service...`);
                // window.location.href = actualServiceURL;
                showNavigationMessage(service);
            }, 300);
        });
    });

    // Add pulse keyframe animation
    if (!document.querySelector('#pulse-animation')) {
        const style = document.createElement('style');
        style.id = 'pulse-animation';
        style.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Ripple Effect Function
function createRippleEffect(button, event) {
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    // Add ripple styles if not exist
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
            }
            @keyframes ripple-animation {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Navigation Message + Redirect ke Tab Baru
function showNavigationMessage(service, url) {
    const messages = {
        matematika: 'Media Pembelajaran Matematika',
        ipa: 'Media Pembelajaran IPA',
        academy: 'Siriusly Academy',
        digital: 'Siriusly Digital',
        shop: 'Online Shop'
    };

    const message = createNotification(`Mengarahkan ke ${messages[service]}...`, 'info');
    document.body.appendChild(message);

    // setelah 1 detik, buka tab baru
    setTimeout(() => {
        message.remove();
        window.open(url, "_blank"); // 👈 penting, buka di tab baru
    }, 1000);
}


// Notification System
function createNotification(text, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = text;
    
    // Add notification styles if not exist
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: var(--space-16) var(--space-24);
                border-radius: var(--radius-lg);
                color: white;
                font-weight: var(--font-weight-medium);
                z-index: 10000;
                animation: slideInRight 0.3s var(--ease-standard);
                max-width: 300px;
                box-shadow: var(--shadow-lg);
            }
            .notification--info {
                background: var(--color-primary);
            }
            .notification--success {
                background: var(--color-success);
            }
            .notification--error {
                background: var(--color-error);
            }
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    return notification;
}

// Parallax Effects
function initParallaxEffects() {
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Contact Form Animation (if added later)
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        const formInputs = contactForm.querySelectorAll('.form-control');
        
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
        });
    }
}

// Typing Animation for Hero Text
function initTypingAnimation() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        
        let i = 0;
        const typeWriter = function() {
            if (i < text.length) {
                heroSubtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1500);
    }
}

// Initialize typing animation after page loads
window.addEventListener('load', function() {
    setTimeout(initTypingAnimation, 2000);
});

// Scroll Progress Indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    document.body.appendChild(progressBar);
    
    // Add progress bar styles
    if (!document.querySelector('#progress-styles')) {
        const style = document.createElement('style');
        style.id = 'progress-styles';
        style.textContent = `
            .scroll-progress {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 3px;
                background: rgba(var(--color-border-rgb, 0, 0, 0), 0.1);
                z-index: 9999;
            }
            .scroll-progress-bar {
                height: 100%;
                background: linear-gradient(90deg, var(--color-teal-300), var(--color-teal-500));
                width: 0%;
                transition: width 0.1s ease;
            }
        `;
        document.head.appendChild(style);
    }
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.querySelector('.scroll-progress-bar').style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
initScrollProgress();

// Error handling
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
});

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Any intensive scroll operations can be debounced here
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);