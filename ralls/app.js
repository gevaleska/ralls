// Mathematics Learning Platform JavaScript

// Learning tools data
const learningToolsData = [
    {
        id: 'tes-matematika-dasar',
        title: 'Tes Matematika Dasar',
        category: 'Assessment',
        grades: ['SD', 'SMP', 'SMA'],
        description: 'Game penilaian kemampuan dasar matematika',
        url: 'kuis_matematika.html'
    },
    {
    id: 'interactive-calculator',
    title: 'Kalkulator Interaktif',
    category: 'Tools',
    grades: ['SMP', 'SMA', 'SMK'],
    description: 'Kalkulator canggih dengan langkah-langkah penyelesaian yang ditampilkan secara visual',
    url: '../ralls/media_pembelajaran/interactive_calculator/index.html'
    },
    {
        id: 'function-grapher',
        title: 'Grafik Fungsi Interaktif',
        category: 'Algebra',
        grades: ['SMA', 'SMK'],
        description: 'Alat untuk membuat dan menganalisis grafik fungsi matematika dengan animasi yang menarik',
        url: '../ralls/media_pembelajaran/fungsi/index.html'
    },
    {
        id: 'geometry-constructor',
        title: 'Bidang Datar',
        category: 'Geometry',
        grades: ['SD, SMP', 'SMA'],
        description: 'Konstruksi bidang datar interaktif untuk memahami konsep-konsep datar bidang datar',
        url: '../ralls/media_pembelajaran/bidang_datar/index.html'
    },
    {
        id: 'equation-solver',
        title: 'Solver Persamaan',
        category: 'Algebra',
        grades: ['SMP', 'SMA', 'SMK'],
        description: 'Penyelesai persamaan dengan metode grafis dan numerik, lengkap dengan langkah-langkah',
        url: '../ralls/media_pembelajaran/sistem_persamaan/index.html'
    },
    {
        id: 'statistics-analyzer',
        title: 'Analisis Data Statistik',
        category: 'Statistics',
        grades: ['SMA', 'SMK'],
        description: 'Tool untuk analisis data statistik dengan visualisasi grafik dan perhitungan otomatis',
        url: '../ralls/media_pembelajaran/statistika/index.html'
    },
    {
        id: 'kalkulus-integral',
        title: 'Integral',
        category: 'Kalkulus',
        grades: ['SMA', 'SMK'],
        description: 'Kalkulus interaktif untuk memahami konsep integral',
        url: '../ralls/media_pembelajaran/integral/index.html'
    },
    {
        id: ' Arithmetic-games',
        title: 'Game Operasi Hitung',
        category: 'Arithmetic',
        grades: ['SMP'],
        description: 'Kumpulan game interaktif untuk melatih operasi hitung dasar dengan cara yang menyenangkan',
        url: '#'
    },
    {
    id: 'Eksponen',
    title: 'Eksponen',
    category: 'Arithmetic',
    grades: ['SMP', 'SMA', 'SMK'],
    description: 'Eksponen interaktif untuk memahami konsep eksponen',
    url: '../ralls/media_pembelajaran/eksponen/index.html'
    },

    {
    id: 'Logaritma',
    title: 'Logaritma',
    category: 'Arithmetic',
    grades: ['SMA', 'SMK'],
    description: 'Logaritma interaktif untuk memahami konsep logaritma',
    url: '../ralls/media_pembelajaran/logaritma/index.html'
    },

    {
    id: 'Bunga dan Anuitas',
    title: 'Bunga dan Anuitas',
    category: 'Ekonomi',
    grades: ['SMA', 'SMK'],
    description: 'Bunga dan Anuitas interaktif',
    url: '../ralls/media_pembelajaran/bunga_anuitas/index.html'
    },

];

// Mathematical symbols and formulas for animations
const mathSymbols = ['π', '∑', '∞', '√', '∆', '∫', 'α', 'β', 'γ', 'θ', 'λ', 'μ', 'σ', 'φ', 'ψ', 'ω', '≠', '≤', '≥', '±', '∈', '∉', '⊂', '⊆', '∪', '∩'];
const mathFormulas = [
    'E = mc²',
    'a² + b² = c²',
    'x = (-b ± √(b²-4ac)) / 2a',
    '∫f(x)dx',
    '∑(i=1 to n) xi',
    'lim(x→∞) f(x)',
    'sin²θ + cos²θ = 1',
    'e^(iπ) + 1 = 0',
    'F = ma',
    '∇·F = ρ/ε₀'
];

// Calculator display equations
const calculatorEquations = [
    'π = 3.14159...',
    '√2 = 1.41421...',
    'e = 2.71828...',
    '∫x²dx = x³/3 + C',
    'sin(π/2) = 1',
    'log₂(8) = 3',
    '2² + 3² = 13',
    'φ = (1+√5)/2'
];

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    showLoadingScreen();
    
    // Initialize all components
    setTimeout(() => {
        initNavigation();
        initMathBackground();
        initFloatingFormulas();
        initCalculatorAnimation();
        initSearchAndFilter();
        initToolButtons();
        initScrollAnimations();
        initSmoothScrolling();
        initContactForm();
        initFooterLinks();
        hideLoadingScreen();
    }, 1500);
});

// Loading Screen
function showLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.display = 'flex';
    }
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
}

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!navbar || !navToggle || !navMenu) return;

    // Mobile menu toggle
    navToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Navbar scroll behavior
    window.addEventListener('scroll', throttle(function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveNavLink();
    }, 100));

    // Initial active link update
    updateActiveNavLink();
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Mathematical background animation
function initMathBackground() {
    const mathBg = document.getElementById('math-symbols-bg');
    if (!mathBg) return;

    // Create floating symbols
    for (let i = 0; i < 15; i++) {
        createFloatingSymbol(mathBg, i);
    }
}

function createFloatingSymbol(container, index) {
    const symbol = document.createElement('div');
    symbol.textContent = mathSymbols[Math.floor(Math.random() * mathSymbols.length)];
    symbol.style.cssText = `
        position: absolute;
        font-size: ${Math.random() * 30 + 20}px;
        color: rgba(var(--color-primary-rgb, 33, 128, 141), ${Math.random() * 0.1 + 0.02});
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: floatSymbol ${Math.random() * 20 + 20}s linear infinite;
        animation-delay: ${Math.random() * -20}s;
        pointer-events: none;
        user-select: none;
    `;
    
    container.appendChild(symbol);
}

// Add CSS for floating symbols animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floatSymbol {
        0% { transform: translateY(100vh) rotate(0deg) scale(0.5); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100px) rotate(360deg) scale(1.2); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Floating formulas in hero
function initFloatingFormulas() {
    const formulasContainer = document.getElementById('floating-formulas');
    if (!formulasContainer) return;

    mathFormulas.forEach((formula, index) => {
        const formulaElement = document.createElement('div');
        formulaElement.textContent = formula;
        formulaElement.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 8 + 12}px;
            left: ${Math.random() * 80 + 10}%;
            top: ${Math.random() * 80 + 10}%;
            animation: floatFormula ${Math.random() * 15 + 15}s ease-in-out infinite;
            animation-delay: ${index * 2}s;
            opacity: 0;
        `;
        formulasContainer.appendChild(formulaElement);
    });
}

// Add CSS for floating formulas
const formulaStyle = document.createElement('style');
formulaStyle.textContent = `
    @keyframes floatFormula {
        0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0; }
        10%, 90% { opacity: 1; }
        50% { transform: translateY(-20px) translateX(10px) rotate(2deg); opacity: 0.8; }
    }
`;
document.head.appendChild(formulaStyle);

// Calculator animation
function initCalculatorAnimation() {
    const calcDisplay = document.getElementById('calc-display');
    if (!calcDisplay) return;

    let equationIndex = 0;
    
    function updateCalculatorDisplay() {
        calcDisplay.style.opacity = '0';
        setTimeout(() => {
            calcDisplay.textContent = calculatorEquations[equationIndex];
            calcDisplay.style.opacity = '1';
            equationIndex = (equationIndex + 1) % calculatorEquations.length;
        }, 300);
    }

    // Initial display
    updateCalculatorDisplay();
    
    // Update every 3 seconds
    setInterval(updateCalculatorDisplay, 3000);
}

// Search and filter functionality - FIXED
function initSearchAndFilter() {
    const searchInput = document.getElementById('search-tools');
    const gradeFilter = document.getElementById('grade-filter');
    const categoryFilter = document.getElementById('category-filter');
    const toolsGrid = document.getElementById('tools-grid');

    if (!searchInput || !gradeFilter || !categoryFilter || !toolsGrid) {
        console.error('Search/filter elements not found');
        return;
    }

    console.log('Initializing search and filters...');

    // Search functionality with debounce
    searchInput.addEventListener('input', debounce(function() {
        console.log('Search input changed:', this.value);
        filterTools();
    }, 300));

    // Filter functionality - explicitly handle change events
    gradeFilter.addEventListener('change', function() {
        console.log('Grade filter changed:', this.value);
        filterTools();
    });

    categoryFilter.addEventListener('change', function() {
        console.log('Category filter changed:', this.value);
        filterTools();
    });

    function filterTools() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const selectedGrade = gradeFilter.value;
        const selectedCategory = categoryFilter.value;
        const toolCards = toolsGrid.querySelectorAll('.tool-card');

        console.log('Filtering with:', { searchTerm, selectedGrade, selectedCategory });

        let visibleCount = 0;

        toolCards.forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            const description = card.querySelector('.card-description').textContent.toLowerCase();
            const cardCategory = card.getAttribute('data-category');
            const cardGrades = card.getAttribute('data-grade').split(' ');

            // Search match
            const searchMatch = !searchTerm || 
                title.includes(searchTerm) || 
                description.includes(searchTerm);

            // Grade match
            const gradeMatch = selectedGrade === 'all' || 
                cardGrades.some(grade => grade.includes(selectedGrade));

            // Category match
            const categoryMatch = selectedCategory === 'all' || 
                cardCategory === selectedCategory;

            if (searchMatch && gradeMatch && categoryMatch) {
                card.style.display = 'block';
                card.style.animation = `fadeInUp 0.6s ease-out ${visibleCount * 0.1}s both`;
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        console.log('Visible cards:', visibleCount);

        // Show "no results" message if needed
        showNoResultsMessage(visibleCount === 0);
    }

    function showNoResultsMessage(show) {
        let noResultsMsg = document.getElementById('no-results-message');
        
        if (show && !noResultsMsg) {
            noResultsMsg = document.createElement('div');
            noResultsMsg.id = 'no-results-message';
            noResultsMsg.className = 'no-results';
            noResultsMsg.innerHTML = `
                <div style="text-align: center; padding: 60px 20px; color: var(--color-text-secondary);">
                    <div style="font-size: 4rem; margin-bottom: 20px;">🔍</div>
                    <h3>Tidak ada alat pembelajaran yang ditemukan</h3>
                    <p>Coba ubah kata kunci pencarian atau filter yang digunakan</p>
                </div>
            `;
            toolsGrid.appendChild(noResultsMsg);
        } else if (!show && noResultsMsg) {
            noResultsMsg.remove();
        }
    }
}

// Tool buttons functionality - FIXED
function initToolButtons() {
    console.log('Initializing tool buttons...');
    
    // Use event delegation to handle button clicks
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('card-btn') || e.target.closest('.card-btn')) {
            e.preventDefault();
            e.stopPropagation();
            
            const button = e.target.classList.contains('card-btn') ? e.target : e.target.closest('.card-btn');
            const toolId = button.getAttribute('data-tool-id');
            
            console.log('Tool button clicked:', toolId);
            
            if (toolId) {
                openTool(toolId);
            } else {
                console.error('No tool ID found on button');
            }
        }
    });
}

function openTool(toolId) {
    console.log('Opening tool:', toolId);
    
    // Find the tool data
    const tool = learningToolsData.find(t => t.id === toolId);
    
    if (tool) {
        // Show confirmation with tool info
        showToolModal(tool);
    } else {
        showNotification('Tool belum tersedia. Akan segera hadir!', 'info');
    }
}

function showToolModal(tool) {
    console.log('Showing modal for tool:', tool.title);
    
    // Remove existing modal if any
    const existingModal = document.querySelector('.tool-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'tool-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>${tool.title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>${tool.description}</p>
                <div class="modal-info">
                    <span class="modal-category">📚 ${tool.category}</span>
                    <span class="modal-grades">🎯 ${tool.grades.join(', ')}</span>
                </div>
                <p><strong>Catatan:</strong> Tool ini akan terbuka di tab baru dalam mode fullscreen untuk pengalaman pembelajaran yang optimal.</p>
            </div>
            <div class="modal-footer">
                <button class="btn btn--outline modal-cancel">Batal</button>
                <button class="btn btn--primary modal-launch" data-tool-id="${tool.id}">Buka Tool</button>
            </div>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease-out;
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Event listeners
    modal.querySelector('.modal-close').addEventListener('click', closeToolModal);
    modal.querySelector('.modal-cancel').addEventListener('click', closeToolModal);
    modal.querySelector('.modal-overlay').addEventListener('click', closeToolModal);
    modal.querySelector('.modal-launch').addEventListener('click', function() {
        launchTool(this.getAttribute('data-tool-id'));
    });
    
    // Add modal styles to document if not already added
    if (!document.getElementById('tool-modal-styles')) {
        const modalStyles = document.createElement('style');
        modalStyles.id = 'tool-modal-styles';
        modalStyles.textContent = `
            .tool-modal .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                backdrop-filter: blur(5px);
            }
            .tool-modal .modal-content {
                position: relative;
                background: var(--color-surface);
                border-radius: var(--radius-lg);
                max-width: 500px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: var(--shadow-lg);
                animation: slideInUp 0.3s ease-out;
            }
            .tool-modal .modal-header {
                padding: var(--space-24);
                border-bottom: 1px solid var(--color-border);
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .tool-modal .modal-header h3 {
                margin: 0;
                color: var(--color-primary);
            }
            .tool-modal .modal-close {
                background: none;
                border: none;
                font-size: var(--font-size-xl);
                color: var(--color-text-secondary);
                cursor: pointer;
                padding: var(--space-4);
            }
            .tool-modal .modal-body {
                padding: var(--space-24);
            }
            .tool-modal .modal-info {
                display: flex;
                gap: var(--space-16);
                margin: var(--space-16) 0;
                flex-wrap: wrap;
            }
            .tool-modal .modal-category,
            .tool-modal .modal-grades {
                background: var(--color-bg-1);
                padding: var(--space-4) var(--space-8);
                border-radius: var(--radius-sm);
                font-size: var(--font-size-sm);
            }
            .tool-modal .modal-footer {
                padding: var(--space-24);
                border-top: 1px solid var(--color-border);
                display: flex;
                gap: var(--space-12);
                justify-content: flex-end;
            }
            @keyframes slideInUp {
                from { transform: translateY(30px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(modalStyles);
    }
}

function closeToolModal() {
    const modal = document.querySelector('.tool-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

function launchTool(toolId) {
    const tool = learningToolsData.find(t => t.id === toolId);
    if (tool) {
        console.log('Launching tool:', tool.title);
        
        // Open in new tab
        const newWindow = window.open(tool.url, '_blank');
        if (newWindow) {
            newWindow.focus();
            closeToolModal();
            showNotification(`${tool.title} telah dibuka di tab baru`, 'success');
        } else {
            showNotification('Pop-up diblokir. Mohon izinkan pop-up untuk situs ini.', 'error');
        }
    }
}

// Footer links functionality
function initFooterLinks() {
    const footerCategoryLinks = document.querySelectorAll('[data-filter-category]');
    
    footerCategoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-filter-category');
            filterByCategory(category);
        });
    });
}

function filterByCategory(category) {
    const categoryFilter = document.getElementById('category-filter');
    const toolsSection = document.getElementById('alat-pembelajaran');
    
    if (categoryFilter && toolsSection) {
        categoryFilter.value = category;
        
        // Scroll to tools section
        toolsSection.scrollIntoView({ behavior: 'smooth' });
        
        // Trigger filter after scroll
        setTimeout(() => {
            categoryFilter.dispatchEvent(new Event('change'));
        }, 500);
    }
}

// Scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.tool-card, .feature-item, .stat-item, .testimonial-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `all 0.8s ease-out ${index * 0.1}s`;
        observer.observe(element);
    });
}

// Smooth scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.getElementById('navbar')?.offsetHeight || 0;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact form functionality - FIXED
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) {
        console.error('Contact form not found');
        return;
    }

    console.log('Initializing contact form...');

    // Get form elements with specific IDs
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectSelect = document.getElementById('contact-subject');
    const messageTextarea = document.getElementById('contact-message');
    const submitBtn = document.getElementById('submit-btn');

    // Validate that all form elements exist
    if (!nameInput || !emailInput || !subjectSelect || !messageTextarea || !submitBtn) {
        console.error('Contact form elements not found');
        return;
    }

    // Real-time validation
    nameInput.addEventListener('blur', () => validateField(nameInput));
    emailInput.addEventListener('blur', () => validateField(emailInput));
    subjectSelect.addEventListener('change', () => validateField(subjectSelect));
    messageTextarea.addEventListener('blur', () => validateField(messageTextarea));

    // Clear errors on input
    nameInput.addEventListener('input', () => clearFieldError(nameInput));
    emailInput.addEventListener('input', () => clearFieldError(emailInput));
    subjectSelect.addEventListener('change', () => clearFieldError(subjectSelect));
    messageTextarea.addEventListener('input', () => clearFieldError(messageTextarea));

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('Contact form submitted');

        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name')?.trim() || '',
            email: formData.get('email')?.trim() || '',
            subject: formData.get('subject') || '',
            message: formData.get('message')?.trim() || ''
        };
        
        console.log('Form data:', data);

        // Validate all fields
        let isValid = true;
        
        if (!validateField(nameInput)) isValid = false;
        if (!validateField(emailInput)) isValid = false;
        if (!validateField(subjectSelect)) isValid = false;
        if (!validateField(messageTextarea)) isValid = false;

        if (!isValid) {
            showNotification('Mohon perbaiki kesalahan pada form.', 'error');
            return;
        }
        
        // Simulate form submission
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Mengirim...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Pesan berhasil dikirim! Saya akan segera menghubungi Anda.', 'success');
            contactForm.reset();
            clearAllErrors();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

function validateField(field) {
    const value = field.value?.trim() || '';
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';

    // Clear previous error
    clearFieldError(field);

    // Required field validation
    if (!value) {
        errorMessage = 'Field ini wajib diisi.';
        isValid = false;
    } else {
        // Specific validations
        switch(fieldName) {
            case 'name':
                if (value.length < 2) {
                    errorMessage = 'Nama harus minimal 2 karakter.';
                    isValid = false;
                }
                break;
            case 'email':
                if (!isValidEmail(value)) {
                    errorMessage = 'Format email tidak valid.';
                    isValid = false;
                }
                break;
            case 'message':
                if (value.length < 10) {
                    errorMessage = 'Pesan harus minimal 10 karakter.';
                    isValid = false;
                }
                break;
        }
    }

    if (!isValid) {
        showFieldError(field, errorMessage);
    }

    return isValid;
}

function showFieldError(field, message) {
    const errorElement = document.getElementById(field.name + '-error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        errorElement.style.color = 'var(--color-error)';
    }
    field.style.borderColor = 'var(--color-error)';
}

function clearFieldError(field) {
    const errorElement = document.getElementById(field.name + '-error');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
    field.style.borderColor = '';
}

function clearAllErrors() {
    const errorElements = document.querySelectorAll('.form-error');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
    
    const inputs = document.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.style.borderColor = '';
    });
}

// Utility functions
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

function throttle(func, wait) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, wait);
        }
    };
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    const colors = {
        success: 'var(--color-success)',
        error: 'var(--color-error)',
        info: 'var(--color-info)',
        warning: 'var(--color-warning)'
    };
    
    const icons = {
        success: '✓',
        error: '✕',
        info: 'ℹ',
        warning: '⚠'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${icons[type] || icons.info}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Apply styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 16px 20px;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease-out;
        max-width: 400px;
        font-size: var(--font-size-md);
        animation: slideInRight 0.3s ease-out forwards;
    `;
    
    // Add notification styles if not already added
    if (!document.getElementById('notification-styles')) {
        const notificationStyles = document.createElement('style');
        notificationStyles.id = 'notification-styles';
        notificationStyles.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); }
                to { transform: translateX(0); }
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 18px;
                cursor: pointer;
                margin-left: auto;
                padding: 0 4px;
                line-height: 1;
                opacity: 0.8;
                border-radius: 4px;
            }
            .notification-close:hover {
                opacity: 1;
                background: rgba(255, 255, 255, 0.1);
            }
        `;
        document.head.appendChild(notificationStyles);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Handle resize events
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            const navMenu = document.getElementById('nav-menu');
            const navToggle = document.getElementById('nav-toggle');
            if (navMenu && navToggle) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
        
        // Update nav links
        updateActiveNavLink();
    }, 250);
});

// Keyboard shortcuts and accessibility
document.addEventListener('keydown', function(e) {
    // Close modal with Escape
    if (e.key === 'Escape') {
        const modal = document.querySelector('.tool-modal');
        if (modal) {
            closeToolModal();
        }
    }
    
    // Quick search with Ctrl/Cmd + K
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('search-tools');
        if (searchInput) {
            searchInput.focus();
            searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});

// Performance optimization
window.addEventListener('load', function() {
    // Performance logging
    if ('performance' in window) {
        const perfData = performance.getEntriesByType('navigation')[0];
        if (perfData) {
            console.log(`Page load time: ${Math.round(perfData.loadEventEnd - perfData.loadEventStart)}ms`);
        }
    }
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    showNotification('Terjadi kesalahan. Silakan refresh halaman.', 'error');
});

// Add some interactive calculator buttons functionality
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('calc-btn')) {
        e.target.style.transform = 'scale(0.95)';
        setTimeout(() => {
            e.target.style.transform = '';
        }, 150);
        
        // Play a subtle click effect
        const calcDisplay = document.getElementById('calc-display');
        if (calcDisplay) {
            calcDisplay.style.color = 'var(--color-white)';
            setTimeout(() => {
                calcDisplay.style.color = 'var(--color-teal-300)';
            }, 200);
        }
    }
});

// Initialize particle effects for mathematical theme
function createParticleEffect() {
    const particleContainer = document.createElement('div');
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    document.body.appendChild(particleContainer);
    
    // Create mathematical particles occasionally
    setInterval(() => {
        if (Math.random() > 0.7) {
            createMathParticle(particleContainer);
        }
    }, 3000);
}

function createMathParticle(container) {
    const particle = document.createElement('div');
    const symbol = mathSymbols[Math.floor(Math.random() * mathSymbols.length)];
    
    particle.textContent = symbol;
    particle.style.cssText = `
        position: absolute;
        font-size: ${Math.random() * 20 + 10}px;
        color: rgba(var(--color-primary-rgb, 33, 128, 141), ${Math.random() * 0.3 + 0.1});
        left: ${Math.random() * 100}%;
        top: 100%;
        animation: particleFloat ${Math.random() * 10 + 10}s linear forwards;
        pointer-events: none;
        user-select: none;
    `;
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
    }, 20000);
}

// Add particle animation styles
const particleStyles = document.createElement('style');
particleStyles.textContent = `
    @keyframes particleFloat {
        0% { transform: translateY(0) rotate(0deg); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }
`;
document.head.appendChild(particleStyles);

// Initialize particle effects after page load
window.addEventListener('load', () => {
    setTimeout(createParticleEffect, 2000);
});

// Track user interactions for analytics (placeholder)
function trackEvent(category, action, label) {
    console.log(`Event: ${category} - ${action} - ${label}`);
    // Future: Implement actual analytics tracking
}

// Track important user interactions
document.addEventListener('click', function(e) {
    if (e.target.matches('.card-btn')) {
        trackEvent('Tool', 'Open', e.target.closest('.tool-card').querySelector('.card-title').textContent);
    } else if (e.target.matches('.btn--primary')) {
        trackEvent('Button', 'Click', e.target.textContent.trim());
    } else if (e.target.matches('.filter-select')) {
        trackEvent('Filter', 'Change', e.target.value);
    }
});

// Add additional debugging for initialization
console.log('Mathematics Learning Platform JavaScript loaded successfully! 🧮📊📐');