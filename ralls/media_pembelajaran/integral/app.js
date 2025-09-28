// Application data
const integralData = {
    problems: {
        basic: [
            {
                problem: "∫(3x² + 2x + 1)dx",
                solution: "x³ + x² + x + C",
                steps: ["Gunakan aturan pangkat untuk setiap suku", "∫3x²dx = 3∫x²dx = 3(x³/3) = x³", "∫2xdx = 2∫xdx = 2(x²/2) = x²", "∫1dx = x", "Tambahkan konstanta integrasi C", "Hasil: x³ + x² + x + C"]
            },
            {
                problem: "∫(5x⁴ - 2x + 7)dx",
                solution: "x⁵ - x² + 7x + C",
                steps: ["Gunakan aturan pangkat untuk setiap suku", "∫5x⁴dx = 5(x⁵/5) = x⁵", "∫-2xdx = -2(x²/2) = -x²", "∫7dx = 7x", "Tambahkan konstanta integrasi C", "Hasil: x⁵ - x² + 7x + C"]
            }
        ],
        intermediate: [
            {
                problem: "∫xe^x dx",
                solution: "(x-1)e^x + C",
                steps: ["Gunakan integrasi parsial", "Misalkan u = x, maka du = dx", "Misalkan dv = e^x dx, maka v = e^x", "Terapkan rumus: ∫u dv = uv - ∫v du", "= xe^x - ∫e^x dx", "= xe^x - e^x + C = (x-1)e^x + C"]
            },
            {
                problem: "∫x·sin(x)dx",
                solution: "-x·cos(x) + sin(x) + C",
                steps: ["Gunakan integrasi parsial", "Misalkan u = x, maka du = dx", "Misalkan dv = sin(x)dx, maka v = -cos(x)", "Terapkan rumus: ∫u dv = uv - ∫v du", "= x(-cos(x)) - ∫(-cos(x))dx", "= -x·cos(x) + ∫cos(x)dx", "= -x·cos(x) + sin(x) + C"]
            }
        ],
        advanced: [
            {
                problem: "∫₀^π sin²(x)dx",
                solution: "π/2",
                steps: ["Gunakan identitas trigonometri", "sin²(x) = (1 - cos(2x))/2", "∫₀^π sin²(x)dx = ∫₀^π (1 - cos(2x))/2 dx", "= (1/2)∫₀^π (1 - cos(2x))dx", "= (1/2)[x - sin(2x)/2]₀^π", "= (1/2)[(π - 0) - (0 - 0)] = π/2"]
            },
            {
                problem: "∫₁^e (ln(x)/x)dx",
                solution: "1/2",
                steps: ["Gunakan substitusi u = ln(x)", "du = (1/x)dx", "Batas: x=1 → u=0, x=e → u=1", "∫₀¹ u du = [u²/2]₀¹", "= 1/2 - 0 = 1/2"]
            }
        ]
    },
    quizQuestions: [
        {
            question: "Hasil dari ∫2x dx adalah:",
            options: ["x² + C", "2x² + C", "x²/2 + C", "2x + C"],
            correct: 0
        },
        {
            question: "Metode integrasi yang tepat untuk ∫x·sin(x)dx:",
            options: ["Substitusi", "Integrasi parsial", "Pecahan parsial", "Langsung"],
            correct: 1
        },
        {
            question: "∫e^x dx =",
            options: ["xe^x + C", "e^x + C", "e^(x+1) + C", "e^x·x + C"],
            correct: 1
        },
        {
            question: "Teorema fundamental kalkulus menghubungkan:",
            options: ["Limit dan turunan", "Turunan dan integral", "Integral dan limit", "Fungsi dan grafik"],
            correct: 1
        },
        {
            question: "∫₀¹ x dx =",
            options: ["1", "1/2", "2", "0"],
            correct: 1
        }
    ]
};

// Global variables
let currentQuestionIndex = 0;
let currentScore = 0;
let currentQuiz = [];
let stats = {
    totalQuestions: 0,
    correctAnswers: 0
};

// DOM elements
const themeToggle = document.getElementById('theme-toggle');
const gameModal = document.getElementById('game-modal');
const closeBtn = document.querySelector('.close-btn');
const canvas = document.getElementById('integral-canvas');
const ctx = canvas.getContext('2d');

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadProblems('basic');
    initializeSimulation();
    updateQuizStats();
});

function initializeApp() {
    // Set initial theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-color-scheme', savedTheme);
    updateThemeToggle(savedTheme);
}

function setupEventListeners() {
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const level = this.dataset.level;
            setActiveTab(this);
            loadProblems(level);
        });
    });
    
    // Game cards
    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('click', function() {
            const gameType = this.dataset.game;
            startGame(gameType);
        });
    });
    
    // Modal close
    closeBtn.addEventListener('click', closeModal);
    gameModal.addEventListener('click', function(e) {
        if (e.target === gameModal) closeModal();
    });
    
    // Quiz buttons
    document.getElementById('start-main-quiz').addEventListener('click', function() {
        startGame('quiz');
    });
    
    // Simulation controls
    setupSimulationControls();
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-color-scheme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-color-scheme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggle(newTheme);
}

function updateThemeToggle(theme) {
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function setActiveTab(activeTab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    activeTab.classList.add('active');
}

function loadProblems(level) {
    const problemContent = document.getElementById('problem-content');
    const problems = integralData.problems[level];
    
    let html = '';
    problems.forEach((problem, index) => {
        html += `
            <div class="problem-item">
                <div class="problem-statement">
                    <strong>Soal ${index + 1}:</strong> $${problem.problem}$
                </div>
                <div class="solution-steps">
                    <h4>Penyelesaian:</h4>
                    <ol>
                        ${problem.steps.map(step => `<li>${step}</li>`).join('')}
                    </ol>
                    <div class="math-formula">
                        <strong>Jawaban:</strong> $${problem.solution}$
                    </div>
                </div>
            </div>
        `;
    });
    
    problemContent.innerHTML = html;
    
    // Re-render MathJax
    if (window.MathJax) {
        MathJax.typesetPromise([problemContent]);
    }
}

// Simulation functions
function setupSimulationControls() {
    const functionSelect = document.getElementById('function-select');
    const lowerBound = document.getElementById('lower-bound');
    const upperBound = document.getElementById('upper-bound');
    const riemannSlices = document.getElementById('riemann-slices');
    
    const lowerValue = document.getElementById('lower-value');
    const upperValue = document.getElementById('upper-value');
    const slicesValue = document.getElementById('slices-value');
    
    // Event listeners
    functionSelect.addEventListener('change', updateSimulation);
    lowerBound.addEventListener('input', function() {
        lowerValue.textContent = this.value;
        updateSimulation();
    });
    upperBound.addEventListener('input', function() {
        upperValue.textContent = this.value;
        updateSimulation();
    });
    riemannSlices.addEventListener('input', function() {
        slicesValue.textContent = this.value;
        updateSimulation();
    });
}

function initializeSimulation() {
    updateSimulation();
}

function updateSimulation() {
    const functionSelect = document.getElementById('function-select');
    const lowerBound = document.getElementById('lower-bound');
    const upperBound = document.getElementById('upper-bound');
    const riemannSlices = document.getElementById('riemann-slices');
    
    const funcStr = functionSelect.value;
    const a = parseFloat(lowerBound.value);
    const b = parseFloat(upperBound.value);
    const n = parseInt(riemannSlices.value);
    
    drawFunction(funcStr, a, b, n);
}

function evaluateFunction(funcStr, x) {
    try {
        return eval(funcStr.replace(/x/g, x));
    } catch (e) {
        return 0;
    }
}

function drawFunction(funcStr, a, b, n) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const padding = 50;
    const width = canvas.width - 2 * padding;
    const height = canvas.height - 2 * padding;
    
    // Find function range for scaling
    let minY = 0, maxY = 0;
    const step = 0.1;
    for (let x = a; x <= b; x += step) {
        const y = evaluateFunction(funcStr, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
    }
    
    // Add some padding to y-range
    const yRange = maxY - minY;
    minY -= yRange * 0.1;
    maxY += yRange * 0.1;
    
    // Draw axes
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 1;
    ctx.beginPath();
    
    // X-axis
    const yZero = padding + height - (0 - minY) / (maxY - minY) * height;
    ctx.moveTo(padding, yZero);
    ctx.lineTo(padding + width, yZero);
    
    // Y-axis
    const xZero = padding + (0 - a) / (b - a) * width;
    ctx.moveTo(xZero, padding);
    ctx.lineTo(xZero, padding + height);
    ctx.stroke();
    
    // Draw function curve
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    let firstPoint = true;
    for (let x = a; x <= b; x += step) {
        const y = evaluateFunction(funcStr, x);
        const pixelX = padding + (x - a) / (b - a) * width;
        const pixelY = padding + height - (y - minY) / (maxY - minY) * height;
        
        if (firstPoint) {
            ctx.moveTo(pixelX, pixelY);
            firstPoint = false;
        } else {
            ctx.lineTo(pixelX, pixelY);
        }
    }
    ctx.stroke();
    
    // Draw Riemann rectangles
    const dx = (b - a) / n;
    let area = 0;
    
    ctx.fillStyle = 'rgba(37, 99, 235, 0.3)';
    ctx.strokeStyle = 'rgba(37, 99, 235, 0.6)';
    ctx.lineWidth = 1;
    
    for (let i = 0; i < n; i++) {
        const x = a + i * dx;
        const y = evaluateFunction(funcStr, x);
        
        const rectX = padding + (x - a) / (b - a) * width;
        const rectY = padding + height - (Math.max(0, y) - minY) / (maxY - minY) * height;
        const rectWidth = dx / (b - a) * width;
        const rectHeight = Math.abs(y) / (maxY - minY) * height;
        
        if (y >= 0) {
            ctx.fillRect(rectX, yZero - rectHeight, rectWidth, rectHeight);
            ctx.strokeRect(rectX, yZero - rectHeight, rectWidth, rectHeight);
        } else {
            ctx.fillRect(rectX, yZero, rectWidth, rectHeight);
            ctx.strokeRect(rectX, yZero, rectWidth, rectHeight);
        }
        
        area += y * dx;
    }
    
    // Update area result
    document.getElementById('area-result').textContent = area.toFixed(4);
    
    // Draw labels
    ctx.fillStyle = '#374151';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    
    // X-axis labels
    const xLabels = [a, (a + b) / 2, b];
    xLabels.forEach(x => {
        const pixelX = padding + (x - a) / (b - a) * width;
        ctx.fillText(x.toFixed(1), pixelX, yZero + 20);
    });
    
    // Y-axis labels
    const yLabels = [minY, (minY + maxY) / 2, maxY];
    ctx.textAlign = 'right';
    yLabels.forEach(y => {
        const pixelY = padding + height - (y - minY) / (maxY - minY) * height;
        ctx.fillText(y.toFixed(1), xZero - 10, pixelY + 5);
    });
}

// Game functions
function startGame(gameType) {
    if (gameType === 'quiz') {
        startQuiz();
    } else if (gameType === 'match') {
        startMatchingGame();
    } else if (gameType === 'method') {
        startMethodGame();
    }
}

function startQuiz() {
    currentQuiz = [...integralData.quizQuestions].sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    currentScore = 0;
    
    document.getElementById('game-title').textContent = 'Kuis Integral';
    showModal();
    displayQuestion();
}

function startMatchingGame() {
    document.getElementById('game-title').textContent = 'Cocokkan Integral';
    document.getElementById('game-content').innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <h4>Game Mencocokkan</h4>
            <p>Fitur ini akan dikembangkan lebih lanjut!</p>
            <button class="btn btn--primary" onclick="closeModal()">Kembali</button>
        </div>
    `;
    showModal();
}

function startMethodGame() {
    document.getElementById('game-title').textContent = 'Pilih Metode Integrasi';
    document.getElementById('game-content').innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <h4>Game Pilih Metode</h4>
            <p>Fitur ini akan dikembangkan lebih lanjut!</p>
            <button class="btn btn--primary" onclick="closeModal()">Kembali</button>
        </div>
    `;
    showModal();
}

function displayQuestion() {
    if (currentQuestionIndex >= currentQuiz.length) {
        showQuizResult();
        return;
    }
    
    const question = currentQuiz[currentQuestionIndex];
    const progress = ((currentQuestionIndex) / currentQuiz.length) * 100;
    
    document.getElementById('progress').style.width = progress + '%';
    document.getElementById('question-counter').textContent = `${currentQuestionIndex + 1}/${currentQuiz.length}`;
    document.getElementById('question-text').innerHTML = question.question;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(button);
    });
    
    document.getElementById('next-question').classList.add('hidden');
    document.getElementById('finish-quiz').classList.add('hidden');
    
    // Render MathJax for question
    if (window.MathJax) {
        MathJax.typesetPromise([document.getElementById('question-text')]);
    }
}

function selectAnswer(selectedIndex) {
    const question = currentQuiz[currentQuestionIndex];
    const options = document.querySelectorAll('.option-btn');
    
    options.forEach((btn, index) => {
        btn.onclick = null; // Disable further clicks
        if (index === question.correct) {
            btn.classList.add('correct');
        } else if (index === selectedIndex) {
            btn.classList.add('incorrect');
        }
    });
    
    if (selectedIndex === question.correct) {
        currentScore++;
        stats.correctAnswers++;
    }
    
    stats.totalQuestions++;
    
    if (currentQuestionIndex === currentQuiz.length - 1) {
        document.getElementById('finish-quiz').classList.remove('hidden');
    } else {
        document.getElementById('next-question').classList.remove('hidden');
    }
    
    updateQuizStats();
}

function nextQuestion() {
    currentQuestionIndex++;
    displayQuestion();
}

function finishQuiz() {
    showQuizResult();
}

function showQuizResult() {
    document.getElementById('final-score').textContent = currentScore;
    document.getElementById('quiz-result').classList.remove('hidden');
    document.getElementById('next-question').classList.add('hidden');
    document.getElementById('finish-quiz').classList.add('hidden');
    
    const progress = 100;
    document.getElementById('progress').style.width = progress + '%';
}

function updateQuizStats() {
    document.getElementById('total-questions').textContent = stats.totalQuestions;
    document.getElementById('correct-answers').textContent = stats.correctAnswers;
    const accuracy = stats.totalQuestions > 0 ? Math.round((stats.correctAnswers / stats.totalQuestions) * 100) : 0;
    document.getElementById('accuracy-rate').textContent = accuracy + '%';
}

// Application calculators
function calculateDistance() {
    const velocityFunc = document.getElementById('velocity-func').value || 't*t + 2*t';
    const result = document.getElementById('distance-result');
    
    try {
        // Simple symbolic integration for demonstration
        let integralResult = '';
        if (velocityFunc.includes('t*t')) {
            integralResult = 'Jarak = ∫(t² + 2t)dt = t³/3 + t² + C';
        } else if (velocityFunc.includes('t')) {
            integralResult = 'Jarak = ∫t dt = t²/2 + C';
        } else {
            integralResult = 'Masukkan fungsi kecepatan yang valid (contoh: t*t + 2*t)';
        }
        
        result.innerHTML = integralResult;
    } catch (error) {
        result.innerHTML = 'Error dalam perhitungan. Periksa format fungsi.';
    }
}

function calculateVolume() {
    const volumeFunc = document.getElementById('volume-func').value || 'x';
    const result = document.getElementById('volume-result');
    
    try {
        let integralResult = '';
        if (volumeFunc === 'x') {
            integralResult = 'Volume = π∫₀² x² dx = π[x³/3]₀² = π(8/3) ≈ 8.38';
        } else if (volumeFunc.includes('x*x')) {
            integralResult = 'Volume = π∫ x⁴ dx = π(x⁵/5) + C';
        } else {
            integralResult = 'Masukkan fungsi yang valid (contoh: x atau x*x)';
        }
        
        result.innerHTML = integralResult;
    } catch (error) {
        result.innerHTML = 'Error dalam perhitungan. Periksa format fungsi.';
    }
}

function calculateSurplus() {
    const demandFunc = document.getElementById('demand-func').value || '100 - 2*q';
    const result = document.getElementById('surplus-result');
    
    try {
        let integralResult = '';
        if (demandFunc.includes('100 - 2*q')) {
            integralResult = 'Surplus = ∫₀²⁵ (100 - 2q - 50) dq = ∫₀²⁵ (50 - 2q) dq = [50q - q²]₀²⁵ = 625';
        } else {
            integralResult = 'Masukkan fungsi demand yang valid (contoh: 100 - 2*q)';
        }
        
        result.innerHTML = integralResult;
    } catch (error) {
        result.innerHTML = 'Error dalam perhitungan. Periksa format fungsi.';
    }
}

// Modal functions
function showModal() {
    gameModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    gameModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Event listeners for quiz buttons
document.addEventListener('click', function(e) {
    if (e.target.id === 'next-question') {
        nextQuestion();
    } else if (e.target.id === 'finish-quiz') {
        finishQuiz();
    }
});

// Utility functions
window.scrollToSection = scrollToSection;
window.calculateDistance = calculateDistance;
window.calculateVolume = calculateVolume;
window.calculateSurplus = calculateSurplus;
window.closeModal = closeModal;