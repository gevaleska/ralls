// Loading Screen Management
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const mainContent = document.getElementById('mainContent');
    
    // Simulate loading time and show loading screen for 3.5 seconds
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        mainContent.classList.remove('hidden');
        
        // Remove loading screen from DOM after fade out
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 3500);
});

// Navigation Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(15px)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop;
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Subject Button Click Handler
function handleSubjectClick(subject) {
    // Create a loading animation for the button
    const button = event.target;
    const originalText = button.textContent;
    
    button.disabled = true;
    button.innerHTML = '<span style="animation: pulse 1s infinite;">Memuat...</span>';
    
    // Simulate loading for better UX
    setTimeout(() => {
        // This is where you would redirect to the actual subject page
        // For now, we'll show an alert
        alert(`Anda akan diarahkan ke halaman pembelajaran ${subject.toUpperCase()}. Silakan sediakan link tujuan untuk implementasi selanjutnya.`);
        
        // Reset button
        button.disabled = false;
        button.innerHTML = originalText;
    }, 1500);
}

// Contact Form Handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const button = this.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        
        // Show loading state
        button.disabled = true;
        button.innerHTML = '<span style="animation: pulse 1s infinite;">Mengirim...</span>';
        
        // Simulate form submission
        setTimeout(() => {
            alert('Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.');
            this.reset();
            
            // Reset button
            button.disabled = false;
            button.innerHTML = originalText;
        }, 2000);
    });
}

// Newsletter Form Handler
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const button = this.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        const input = this.querySelector('input[type="email"]');
        
        if (!input.value) {
            alert('Silakan masukkan alamat email Anda.');
            return;
        }
        
        // Show loading state
        button.disabled = true;
        button.innerHTML = '<span style="animation: pulse 1s infinite;">...</span>';
        
        // Simulate subscription
        setTimeout(() => {
            alert('Terima kasih! Anda telah berlangganan newsletter RALLS.');
            input.value = '';
            
            // Reset button
            button.disabled = false;
            button.innerHTML = originalText;
        }, 1500);
    });
}

// Intersection Observer for Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Special handling for stats animation
            if (entry.target.classList.contains('stat-item')) {
                animateCounter(entry.target);
            }
        }
    });
}, observerOptions);

// Observe elements for scroll animations
const animateElements = document.querySelectorAll('.section-header, .subject-card, .feature-card, .testimonial-card, .contact-item, .stat-item');

animateElements.forEach(el => {
    // Set initial state
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    // Observe for intersection
    observer.observe(el);
});

// Counter Animation for Statistics
function animateCounter(element) {
    const numberElement = element.querySelector('.stat-number');
    if (!numberElement || numberElement.dataset.animated) return;
    
    const target = numberElement.textContent;
    const isPercentage = target.includes('%');
    const isPlus = target.includes('+');
    const numericValue = parseInt(target.replace(/[^\d]/g, ''));
    
    let current = 0;
    const increment = numericValue / 60; // Animation duration
    const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
            current = numericValue;
            clearInterval(timer);
            numberElement.dataset.animated = 'true';
        }
        
        let displayValue = Math.floor(current);
        if (displayValue >= 1000) {
            displayValue = (displayValue / 1000).toFixed(1) + 'K';
        }
        
        numberElement.textContent = displayValue + (isPercentage ? '%' : '') + (isPlus ? '+' : '');
    }, 16);
}

// Add dynamic particle generation
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 8 + 's';
    particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
    
    document.querySelector('.particles-container').appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        particle.remove();
    }, 10000);
}

// Generate particles periodically
setInterval(createParticle, 2000);

// Add hover effects for subject cards
document.querySelectorAll('.subject-card').forEach(card => {
    const icon = card.querySelector('.card-icon');
    
    card.addEventListener('mouseenter', function() {
        icon.style.transform = 'scale(1.2) rotateZ(10deg)';
        icon.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        icon.style.transform = 'scale(1) rotateZ(0deg)';
    });
});

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.className = 'ripple';
    
    // Add ripple styles
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.5)';
    ripple.style.animation = 'ripple-animation 0.6s linear';
    ripple.style.pointerEvents = 'none';
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple effect styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple-animation {
        0% { transform: scale(0); opacity: 1; }
        100% { transform: scale(2); opacity: 0; }
    }
`;
document.head.appendChild(rippleStyle);

// Apply ripple effect to buttons
document.querySelectorAll('.btn-learn, .btn--primary').forEach(button => {
    button.addEventListener('click', createRipple);
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-content');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add floating animation to feature icons
document.querySelectorAll('.feature-icon').forEach((icon, index) => {
    icon.style.animationDelay = (index * 0.5) + 's';
});

// Add typing effect to loading text
let loadingTexts = [
    'Menginisialisasi Lingkungan Penelitian...',
    'Memuat Simulasi Sains...',
    'Menyiapkan Laboratorium Virtual...',
    'Mengaktifkan Mode Pembelajaran...'
];

let currentTextIndex = 0;
const loadingTextElement = document.querySelector('.loading-text');

if (loadingTextElement) {
    const typeText = () => {
        if (currentTextIndex < loadingTexts.length) {
            loadingTextElement.textContent = loadingTexts[currentTextIndex];
            currentTextIndex++;
        }
    };
    
    // Change text every 800ms during loading
    const textInterval = setInterval(typeText, 800);
    
    // Clear interval after loading completes
    setTimeout(() => {
        clearInterval(textInterval);
    }, 3500);
}

// Add search functionality (if needed in future)
function handleSearch(query) {
    // Placeholder for search functionality
    console.log('Searching for:', query);
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Enter key on focused elements
    if (e.key === 'Enter' && document.activeElement.classList.contains('subject-card')) {
        const subject = document.activeElement.getAttribute('data-subject');
        if (subject) {
            handleSubjectClick(subject);
        }
    }
});

// Add focus management for accessibility
document.querySelectorAll('.subject-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    
    card.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const subject = this.getAttribute('data-subject');
            if (subject) {
                handleSubjectClick(subject);
            }
        }
    });
});

// Add scroll-to-top functionality
const createScrollToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #00B4D8, #06D6A0);
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0, 180, 216, 0.3);
    `;
    
    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
    
    document.body.appendChild(button);
};

// Initialize scroll to top button after loading
setTimeout(createScrollToTopButton, 4000);

// Performance optimization: Debounce scroll events
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

// Apply debounce to scroll handlers
const debouncedScrollHandler = debounce(function() {
    // Handle scroll events here if needed
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Initialize tooltips for better UX
const addTooltips = () => {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = element.getAttribute('data-tooltip');
        tooltip.style.cssText = `
            position: absolute;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 12px;
            white-space: nowrap;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            pointer-events: none;
            z-index: 1000;
        `;
        
        element.addEventListener('mouseenter', () => {
            document.body.appendChild(tooltip);
            const rect = element.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            tooltip.style.opacity = '1';
            tooltip.style.visibility = 'visible';
        });
        
        element.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
            tooltip.style.visibility = 'hidden';
            setTimeout(() => {
                if (tooltip.parentNode) {
                    tooltip.parentNode.removeChild(tooltip);
                }
            }, 300);
        });
    });
};

// Initialize tooltips after loading
setTimeout(addTooltips, 4000);

// Add error handling for any JavaScript errors
window.addEventListener('error', function(e) {
    console.error('RALLS App Error:', e.error);
    // Optionally show user-friendly error message
});

// Final initialization
console.log('🧬 RALLS Science Media Platform Loaded Successfully!');
console.log('🔬 Ready for scientific exploration!');

// Export functions for potential external use
window.RallsApp = {
    handleSubjectClick,
    createRipple,
    createParticle
};