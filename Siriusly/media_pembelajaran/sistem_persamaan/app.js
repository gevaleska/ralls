// Global variables
let currentGameData = {};
let userProgress = {
    completedLevels: 0,
    score: 0,
    gamesPlayed: []
};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
});

// Initialize the application
function initializeApp() {
    // Initialize canvas for SPLDV simulation
    const canvas = document.getElementById('spldv-canvas');
    if (canvas) {
        setupCanvas(canvas);
    }
    
    // Set default values for demonstrations
    setDefaultValues();
    
    // Initialize tabs
    showTab('materi');
}

// Setup event listeners
function setupEventListeners() {
    // Main tab navigation
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tab = e.target.getAttribute('data-tab');
            showTab(tab);
        });
    });
    
    // Simulation tabs
    document.querySelectorAll('.sim-tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const sim = e.target.getAttribute('data-sim');
            showSimulation(sim);
        });
    });
    
    // Example tabs
    document.querySelectorAll('.example-tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const category = e.target.getAttribute('data-category');
            showExampleCategory(category);
        });
    });
    
    // Calculator tabs
    document.querySelectorAll('.calc-tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const calc = e.target.getAttribute('data-calc');
            showCalculator(calc);
        });
    });

    // Add input validation for all number inputs
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('input', function(e) {
            // Ensure we have a valid number
            const value = parseFloat(e.target.value);
            if (isNaN(value) && e.target.value !== '') {
                e.target.value = '';
            }
        });
    });
}

// Tab navigation functions
function showTab(tabName) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(tabName);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update active tab button
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeBtn = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}

function showSimulation(simName) {
    document.querySelectorAll('.sim-content').forEach(content => {
        content.classList.remove('active');
    });
    
    document.getElementById(`${simName}-sim`).classList.add('active');
    
    document.querySelectorAll('.sim-tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeBtn = document.querySelector(`[data-sim="${simName}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}

function showExampleCategory(category) {
    document.querySelectorAll('.example-content').forEach(content => {
        content.classList.remove('active');
    });
    
    document.getElementById(`${category}-examples`).classList.add('active');
    
    document.querySelectorAll('.example-tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeBtn = document.querySelector(`[data-category="${category}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}

function showCalculator(calcName) {
    document.querySelectorAll('.calc-content').forEach(content => {
        content.classList.remove('active');
    });
    
    document.getElementById(`${calcName}-calc`).classList.add('active');
    
    document.querySelectorAll('.calc-tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeBtn = document.querySelector(`[data-calc="${calcName}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}

// Set default values for inputs
function setDefaultValues() {
    // Default SPLDV values
    if (document.getElementById('a1')) {
        document.getElementById('a1').value = 2;
        document.getElementById('b1').value = 3;
        document.getElementById('c1').value = 8;
        document.getElementById('d1').value = 1;
        document.getElementById('e1').value = -1;
        document.getElementById('f1').value = 1;
    }
}

// Canvas setup for SPLDV visualization
function setupCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    
    // Draw coordinate system
    drawCoordinateSystem(ctx, canvas.width, canvas.height);
}

function drawCoordinateSystem(ctx, width, height) {
    const centerX = width / 2;
    const centerY = height / 2;
    const gridSize = 20;
    
    ctx.clearRect(0, 0, width, height);
    
    // Set styles
    ctx.strokeStyle = '#e5e5e5';
    ctx.lineWidth = 1;
    
    // Draw grid
    for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }
    
    for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
    
    // Draw axes
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    
    // X-axis
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();
    
    // Y-axis
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();
    
    // Add axis labels
    ctx.fillStyle = '#666';
    ctx.font = '12px Arial';
    ctx.fillText('0', centerX + 5, centerY + 15);
    ctx.fillText('x', width - 15, centerY + 15);
    ctx.fillText('y', centerX + 5, 15);
}

// SPLDV plotting function
function plotSPLDV() {
    const a = parseFloat(document.getElementById('a1').value) || 0;
    const b = parseFloat(document.getElementById('b1').value) || 0;
    const c = parseFloat(document.getElementById('c1').value) || 0;
    const d = parseFloat(document.getElementById('d1').value) || 0;
    const e = parseFloat(document.getElementById('e1').value) || 0;
    const f = parseFloat(document.getElementById('f1').value) || 0;
    
    const canvas = document.getElementById('spldv-canvas');
    const ctx = canvas.getContext('2d');
    
    // Redraw coordinate system
    drawCoordinateSystem(ctx, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = 20; // pixels per unit
    
    // Plot first line: ax + by = c
    plotLine(ctx, a, b, c, centerX, centerY, scale, '#1FB8CD', 'Persamaan 1');
    
    // Plot second line: dx + ey = f
    plotLine(ctx, d, e, f, centerX, centerY, scale, '#FFC185', 'Persamaan 2');
    
    // Solve and show intersection
    const solution = solveSPLDV(a, b, c, d, e, f);
    const solutionDiv = document.getElementById('spldv-solution');
    
    if (solution.type === 'unique') {
        // Mark intersection point
        const pixelX = centerX + solution.x * scale;
        const pixelY = centerY - solution.y * scale;
        
        ctx.fillStyle = '#DB4545';
        ctx.beginPath();
        ctx.arc(pixelX, pixelY, 5, 0, 2 * Math.PI);
        ctx.fill();
        
        solutionDiv.innerHTML = `
            <h4>Solusi Unik</h4>
            <p><strong>x = ${solution.x.toFixed(2)}</strong></p>
            <p><strong>y = ${solution.y.toFixed(2)}</strong></p>
            <p>Titik potong: (${solution.x.toFixed(2)}, ${solution.y.toFixed(2)})</p>
        `;
    } else if (solution.type === 'infinite') {
        solutionDiv.innerHTML = `
            <h4>Tak Terhingga Solusi</h4>
            <p>Kedua persamaan menghasilkan garis yang sama.</p>
        `;
    } else {
        solutionDiv.innerHTML = `
            <h4>Tidak Ada Solusi</h4>
            <p>Garis-garis sejajar dan tidak berpotongan.</p>
        `;
    }
}

function plotLine(ctx, a, b, c, centerX, centerY, scale, color, label) {
    if (a === 0 && b === 0) return;
    
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    
    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;
    
    ctx.beginPath();
    
    if (b !== 0) {
        // Line in form y = (c - ax) / b
        const x1 = -(canvasWidth / 2) / scale;
        const y1 = (c - a * x1) / b;
        const x2 = (canvasWidth / 2) / scale;
        const y2 = (c - a * x2) / b;
        
        const pixelX1 = centerX + x1 * scale;
        const pixelY1 = centerY - y1 * scale;
        const pixelX2 = centerX + x2 * scale;
        const pixelY2 = centerY - y2 * scale;
        
        ctx.moveTo(pixelX1, pixelY1);
        ctx.lineTo(pixelX2, pixelY2);
    } else if (a !== 0) {
        // Vertical line x = c/a
        const x = c / a;
        const pixelX = centerX + x * scale;
        
        ctx.moveTo(pixelX, 0);
        ctx.lineTo(pixelX, canvasHeight);
    }
    
    ctx.stroke();
    
    // Add label
    ctx.fillStyle = color;
    ctx.font = '12px Arial';
    ctx.fillText(label, 10, label === 'Persamaan 1' ? 20 : 35);
}

// Solve SPLDV system
function solveSPLDV(a, b, c, d, e, f) {
    const determinant = a * e - b * d;
    
    if (Math.abs(determinant) < 1e-10) {
        // Check if system is inconsistent or has infinite solutions
        const ratio1 = Math.abs(a) > 1e-10 ? c / a : (Math.abs(b) > 1e-10 ? c / b : 0);
        const ratio2 = Math.abs(d) > 1e-10 ? f / d : (Math.abs(e) > 1e-10 ? f / e : 0);
        
        if (Math.abs(ratio1 - ratio2) < 1e-10) {
            return { type: 'infinite' };
        } else {
            return { type: 'none' };
        }
    }
    
    const x = (c * e - b * f) / determinant;
    const y = (a * f - c * d) / determinant;
    
    return { type: 'unique', x: x, y: y };
}

// Solve SPLTV system
function solveSPLTV() {
    const a = parseFloat(document.getElementById('a2').value) || 0;
    const b = parseFloat(document.getElementById('b2').value) || 0;
    const c = parseFloat(document.getElementById('c2').value) || 0;
    const d = parseFloat(document.getElementById('d2').value) || 0;
    const e = parseFloat(document.getElementById('e2').value) || 0;
    const f = parseFloat(document.getElementById('f2').value) || 0;
    const g = parseFloat(document.getElementById('g2').value) || 0;
    const h = parseFloat(document.getElementById('h2').value) || 0;
    const i = parseFloat(document.getElementById('i2').value) || 0;
    const j = parseFloat(document.getElementById('j2').value) || 0;
    const k = parseFloat(document.getElementById('k2').value) || 0;
    const l = parseFloat(document.getElementById('l2').value) || 0;
    
    const solution = solveSPLTVSystem(a, b, c, d, e, f, g, h, i, j, k, l);
    const solutionDiv = document.getElementById('spltv-solution');
    
    if (solution.type === 'unique') {
        solutionDiv.innerHTML = `
            <h4>Solusi SPLTV</h4>
            <p><strong>x = ${solution.x.toFixed(3)}</strong></p>
            <p><strong>y = ${solution.y.toFixed(3)}</strong></p>
            <p><strong>z = ${solution.z.toFixed(3)}</strong></p>
            <div class="solution-correct">Sistem memiliki solusi unik!</div>
        `;
        
        // Update 3D visualization
        update3DVisualization(solution.x, solution.y, solution.z);
    } else {
        solutionDiv.innerHTML = `
            <h4>Sistem Tidak Memiliki Solusi Unik</h4>
            <p>Sistem mungkin tidak memiliki solusi atau memiliki tak hingga solusi.</p>
            <div class="solution-incorrect">Periksa kembali persamaan Anda.</div>
        `;
    }
}

function solveSPLTVSystem(a, b, c, d, e, f, g, h, i, j, k, l) {
    // Using Gaussian elimination
    const matrix = [
        [a, b, c, d],
        [e, f, g, h],
        [i, j, k, l]
    ];
    
    // Forward elimination
    for (let i = 0; i < 3; i++) {
        // Find pivot
        let maxRow = i;
        for (let k = i + 1; k < 3; k++) {
            if (Math.abs(matrix[k][i]) > Math.abs(matrix[maxRow][i])) {
                maxRow = k;
            }
        }
        
        // Swap rows
        [matrix[i], matrix[maxRow]] = [matrix[maxRow], matrix[i]];
        
        // Make all rows below this one 0 in current column
        for (let k = i + 1; k < 3; k++) {
            if (Math.abs(matrix[i][i]) < 1e-10) continue;
            
            const factor = matrix[k][i] / matrix[i][i];
            for (let j = i; j < 4; j++) {
                matrix[k][j] -= factor * matrix[i][j];
            }
        }
    }
    
    // Back substitution
    const solution = [0, 0, 0];
    
    for (let i = 2; i >= 0; i--) {
        if (Math.abs(matrix[i][i]) < 1e-10) {
            return { type: 'none' };
        }
        
        solution[i] = matrix[i][3];
        for (let j = i + 1; j < 3; j++) {
            solution[i] -= matrix[i][j] * solution[j];
        }
        solution[i] /= matrix[i][i];
    }
    
    return {
        type: 'unique',
        x: solution[0],
        y: solution[1],
        z: solution[2]
    };
}

function update3DVisualization(x, y, z) {
    const visualDiv = document.getElementById('spltv-visualization');
    visualDiv.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <h4>Titik Potong 3D</h4>
            <div style="font-size: 24px; color: var(--color-primary); margin: 20px 0;">
                (${x.toFixed(2)}, ${y.toFixed(2)}, ${z.toFixed(2)})
            </div>
            <div style="background: var(--color-bg-1); padding: 15px; border-radius: 8px; margin: 10px 0;">
                <strong>Koordinat X:</strong> ${x.toFixed(2)}<br>
                <strong>Koordinat Y:</strong> ${y.toFixed(2)}<br>
                <strong>Koordinat Z:</strong> ${z.toFixed(2)}
            </div>
            <p style="color: var(--color-text-secondary);">
                Titik ini adalah perpotongan dari ketiga bidang dalam ruang 3D.
            </p>
        </div>
    `;
}

// Method demonstration functions
function showMethod(method) {
    const demoArea = document.getElementById('method-demo');
    
    switch(method) {
        case 'substitusi':
            demoArea.innerHTML = `
                <h4>Metode Substitusi</h4>
                <div class="method-steps">
                    <p><strong>Contoh:</strong> 2x + 3y = 8 dan x - y = 1</p>
                    <p><strong>Langkah 1:</strong> Dari persamaan kedua: x = 1 + y</p>
                    <p><strong>Langkah 2:</strong> Substitusi ke persamaan pertama:</p>
                    <p>2(1 + y) + 3y = 8</p>
                    <p>2 + 2y + 3y = 8</p>
                    <p>5y = 6</p>
                    <p>y = 6/5 = 1.2</p>
                    <p><strong>Langkah 3:</strong> Substitusi kembali: x = 1 + 1.2 = 2.2</p>
                    <div class="solution-correct">Solusi: x = 2.2, y = 1.2</div>
                </div>
            `;
            break;
        case 'eliminasi':
            demoArea.innerHTML = `
                <h4>Metode Eliminasi</h4>
                <div class="method-steps">
                    <p><strong>Contoh:</strong> 2x + 3y = 8 dan x - y = 1</p>
                    <p><strong>Eliminasi x:</strong> Kalikan persamaan kedua dengan 2:</p>
                    <p>2x + 3y = 8</p>
                    <p>2x - 2y = 2</p>
                    <p>Kurangkan: 5y = 6, maka y = 1.2</p>
                    <p><strong>Eliminasi y:</strong> Kalikan persamaan kedua dengan 3:</p>
                    <p>2x + 3y = 8</p>
                    <p>3x - 3y = 3</p>
                    <p>Jumlahkan: 5x = 11, maka x = 2.2</p>
                    <div class="solution-correct">Solusi: x = 2.2, y = 1.2</div>
                </div>
            `;
            break;
        case 'grafik':
            demoArea.innerHTML = `
                <h4>Metode Grafik</h4>
                <div class="method-steps">
                    <p><strong>Contoh:</strong> 2x + 3y = 8 dan x - y = 1</p>
                    <p><strong>Langkah 1:</strong> Ubah ke bentuk y = mx + c</p>
                    <p>Persamaan 1: y = (8 - 2x) / 3</p>
                    <p>Persamaan 2: y = x - 1</p>
                    <p><strong>Langkah 2:</strong> Gambar kedua garis pada koordinat</p>
                    <p><strong>Langkah 3:</strong> Titik potong adalah solusinya</p>
                    <div class="solution-correct">Titik potong: (2.2, 1.2)</div>
                    <p style="color: var(--color-text-secondary);">Gunakan simulasi di tab Simulasi untuk melihat visualisasi!</p>
                </div>
            `;
            break;
    }
}

// Solution display functions
function showSolution(type) {
    const solutionDiv = document.getElementById(`solution-${type}`);
    if (solutionDiv.classList.contains('hidden')) {
        solutionDiv.classList.remove('hidden');
    } else {
        solutionDiv.classList.add('hidden');
    }
}

// Game functions
function startGame(gameType) {
    const gameArea = document.getElementById(`${gameType}-game`);
    gameArea.classList.remove('hidden');
    
    switch(gameType) {
        case 'race':
            initializeRaceGame();
            break;
        case 'space':
            initializeSpaceGame();
            break;
        case 'builder':
            initializeBuilderGame();
            break;
    }
}

function initializeRaceGame() {
    currentGameData.race = {
        score: 0,
        level: 1,
        currentQuestion: null
    };
    
    generateRaceQuestion();
}

function generateRaceQuestion() {
    const level = currentGameData.race.level;
    const difficulty = Math.min(level, 5);
    
    // Generate random SPLDV problem
    const a = Math.floor(Math.random() * difficulty) + 1;
    const b = Math.floor(Math.random() * difficulty) + 1;
    const c = Math.floor(Math.random() * 10) + 5;
    const d = Math.floor(Math.random() * difficulty) + 1;
    const e = -Math.floor(Math.random() * difficulty) - 1;
    const f = Math.floor(Math.random() * 10) + 1;
    
    const solution = solveSPLDV(a, b, c, d, e, f);
    
    if (solution.type === 'unique') {
        currentGameData.race.currentQuestion = {
            equations: [`${a}x + ${b}y = ${c}`, `${d}x + ${e}y = ${f}`],
            correct: solution,
            options: generateOptions(solution)
        };
        
        displayRaceQuestion();
    } else {
        // Generate new question if no unique solution
        generateRaceQuestion();
    }
}

function generateOptions(correctSolution) {
    const options = [
        `(${correctSolution.x.toFixed(1)}, ${correctSolution.y.toFixed(1)})`,
        `(${(correctSolution.x + 1).toFixed(1)}, ${correctSolution.y.toFixed(1)})`,
        `(${correctSolution.x.toFixed(1)}, ${(correctSolution.y + 1).toFixed(1)})`,
        `(${(correctSolution.x - 1).toFixed(1)}, ${(correctSolution.y - 1).toFixed(1)})`
    ];
    
    // Shuffle options
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }
    
    return options;
}

function displayRaceQuestion() {
    const questionDiv = document.getElementById('race-question');
    const question = currentGameData.race.currentQuestion;
    
    questionDiv.innerHTML = `
        <h4>Level ${currentGameData.race.level}</h4>
        <p>Selesaikan sistem persamaan berikut:</p>
        <div class="math-formula">
            <div>${question.equations[0]}</div>
            <div>${question.equations[1]}</div>
        </div>
        <p>Pilih solusi yang tepat:</p>
    `;
    
    const answerBtns = document.querySelectorAll('.answer-btn');
    answerBtns.forEach((btn, index) => {
        btn.textContent = `${String.fromCharCode(65 + index)}. ${question.options[index]}`;
    });
}

function checkAnswer(gameType, optionIndex) {
    if (gameType === 'race') {
        const question = currentGameData.race.currentQuestion;
        const correctAnswer = `(${question.correct.x.toFixed(1)}, ${question.correct.y.toFixed(1)})`;
        
        if (question.options[optionIndex] === correctAnswer) {
            currentGameData.race.score += 10;
            currentGameData.race.level++;
            
            document.getElementById('race-score').textContent = currentGameData.race.score;
            document.getElementById('race-level').textContent = currentGameData.race.level;
            
            // Generate new question
            setTimeout(() => {
                generateRaceQuestion();
            }, 1000);
            
            showGameFeedback('Benar! +10 poin', true);
        } else {
            showGameFeedback('Salah! Coba lagi.', false);
        }
    }
}

function showGameFeedback(message, isCorrect) {
    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = isCorrect ? 'solution-correct' : 'solution-incorrect';
    feedbackDiv.textContent = message;
    feedbackDiv.style.position = 'fixed';
    feedbackDiv.style.top = '20px';
    feedbackDiv.style.right = '20px';
    feedbackDiv.style.zIndex = '1000';
    feedbackDiv.style.padding = '10px 20px';
    feedbackDiv.style.borderRadius = '8px';
    
    document.body.appendChild(feedbackDiv);
    
    setTimeout(() => {
        feedbackDiv.remove();
    }, 2000);
}

function initializeSpaceGame() {
    currentGameData.space = {
        position: { x: 0, y: 0, z: 0 },
        target: { x: 10, y: 10, z: 10 }
    };
    
    generateSpaceQuestion();
}

function generateSpaceQuestion() {
    const questionDiv = document.getElementById('space-question');
    questionDiv.innerHTML = `
        <h4>Navigasi Ruang 3D</h4>
        <p>Selesaikan sistem SPLTV berikut untuk bergerak ke koordinat target:</p>
        <div class="math-formula">
            <div>x + y + z = 6</div>
            <div>2x + y - z = 1</div>
            <div>x - y + 2z = 3</div>
        </div>
        <p>Masukkan jawaban dalam format: x,y,z</p>
    `;
}

function checkSpaceAnswer() {
    const answer = document.getElementById('space-answer').value;
    const coords = answer.split(',').map(x => parseFloat(x.trim()));
    
    if (coords.length === 3 && !coords.some(isNaN)) {
        // Check if answer is correct (solution is x=1, y=2, z=3)
        if (Math.abs(coords[0] - 1) < 0.1 && Math.abs(coords[1] - 2) < 0.1 && Math.abs(coords[2] - 3) < 0.1) {
            showGameFeedback('Benar! Anda berhasil bergerak ke koordinat target!', true);
            document.getElementById('space-coords').textContent = `(${coords[0]}, ${coords[1]}, ${coords[2]})`;
        } else {
            showGameFeedback('Koordinat salah. Periksa perhitungan Anda.', false);
        }
    } else {
        showGameFeedback('Format jawaban salah. Gunakan format: x,y,z', false);
    }
}

function initializeBuilderGame() {
    // Drag and drop functionality already set up in HTML
    showGameFeedback('Seret bagian persamaan ke area builder!', true);
}

// Drag and drop functions
function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

// Application functions with improved validation
function optimizeBudget() {
    const totalBudget = parseFloat(document.getElementById('total-budget').value);
    const catAMin = parseFloat(document.getElementById('cat-a-min').value);
    const catBMin = parseFloat(document.getElementById('cat-b-min').value);
    
    const resultDiv = document.getElementById('budget-result');
    
    // Validation
    if (isNaN(totalBudget) || totalBudget <= 0) {
        resultDiv.innerHTML = '<div class="solution-incorrect">Error: Masukkan total budget yang valid (lebih dari 0)</div>';
        return;
    }
    
    if (isNaN(catAMin) || isNaN(catBMin) || catAMin < 0 || catBMin < 0) {
        resultDiv.innerHTML = '<div class="solution-incorrect">Error: Masukkan persentase minimum yang valid (≥ 0)</div>';
        return;
    }
    
    if (catAMin + catBMin > 100) {
        resultDiv.innerHTML = '<div class="solution-incorrect">Error: Total persentase minimum melebihi 100%</div>';
        return;
    }
    
    const catAMinAmount = (catAMin / 100) * totalBudget;
    const catBMinAmount = (catBMin / 100) * totalBudget;
    const remainingBudget = totalBudget - catAMinAmount - catBMinAmount;
    
    // Distribute remaining budget equally
    const catA = catAMinAmount + (remainingBudget / 2);
    const catB = catBMinAmount + (remainingBudget / 2);
    
    const percentA = (catA / totalBudget) * 100;
    const percentB = (catB / totalBudget) * 100;
    
    resultDiv.innerHTML = `
        <h4>Hasil Optimasi Budget</h4>
        <p><strong>Kategori A:</strong> Rp ${catA.toLocaleString('id-ID')}</p>
        <p><strong>Kategori B:</strong> Rp ${catB.toLocaleString('id-ID')}</p>
        <p><strong>Persentase A:</strong> ${percentA.toFixed(1)}%</p>
        <p><strong>Persentase B:</strong> ${percentB.toFixed(1)}%</p>
        <div class="solution-correct">Budget berhasil dioptimalkan!</div>
    `;
}

function planProduction() {
    const machineHours = parseFloat(document.getElementById('machine-hours').value);
    const rawMaterial = parseFloat(document.getElementById('raw-material').value);
    const laborHours = parseFloat(document.getElementById('labor-hours').value);
    
    const resultDiv = document.getElementById('production-result');
    
    // Validation
    if (isNaN(machineHours) || isNaN(rawMaterial) || isNaN(laborHours) || 
        machineHours <= 0 || rawMaterial <= 0 || laborHours <= 0) {
        resultDiv.innerHTML = '<div class="solution-incorrect">Error: Masukkan nilai yang valid untuk semua kapasitas (> 0)</div>';
        return;
    }
    
    // Simplified production planning calculation
    const productA = Math.floor(Math.min(machineHours * 0.4, rawMaterial * 0.2, laborHours * 0.5));
    const productB = Math.floor(Math.min(machineHours * 0.3, rawMaterial * 0.5, laborHours * 0.3));
    const productC = Math.floor(Math.min(machineHours * 0.3, rawMaterial * 0.3, laborHours * 0.2));
    
    resultDiv.innerHTML = `
        <h4>Rencana Produksi Optimal</h4>
        <p><strong>Produk A:</strong> ${productA} unit</p>
        <p><strong>Produk B:</strong> ${productB} unit</p>
        <p><strong>Produk C:</strong> ${productC} unit</p>
        <p><strong>Total Produksi:</strong> ${productA + productB + productC} unit</p>
        <div class="solution-correct">Rencana produksi berhasil dihitung!</div>
    `;
}

function calculateShopping() {
    const budget = parseFloat(document.getElementById('shop-budget').value);
    const priceA = parseFloat(document.getElementById('item-a-price').value);
    const priceB = parseFloat(document.getElementById('item-b-price').value);
    const minA = parseFloat(document.getElementById('min-item-a').value);
    
    const resultDiv = document.getElementById('shopping-result');
    
    // Validation
    if (isNaN(budget) || budget <= 0) {
        resultDiv.innerHTML = '<div class="solution-incorrect">Error: Masukkan budget yang valid (> 0)</div>';
        return;
    }
    
    if (isNaN(priceA) || isNaN(priceB) || priceA <= 0 || priceB <= 0) {
        resultDiv.innerHTML = '<div class="solution-incorrect">Error: Masukkan harga yang valid (> 0)</div>';
        return;
    }
    
    if (isNaN(minA) || minA < 0) {
        resultDiv.innerHTML = '<div class="solution-incorrect">Error: Masukkan minimum item A yang valid (≥ 0)</div>';
        return;
    }
    
    const costMinA = minA * priceA;
    
    if (costMinA > budget) {
        resultDiv.innerHTML = '<div class="solution-incorrect">Error: Budget tidak cukup untuk minimum Item A yang diinginkan</div>';
        return;
    }
    
    const remainingBudget = budget - costMinA;
    const maxB = Math.floor(remainingBudget / priceB);
    const totalCost = costMinA + (maxB * priceB);
    
    resultDiv.innerHTML = `
        <h4>Kombinasi Belanja Optimal</h4>
        <p><strong>Item A:</strong> ${minA} buah (Rp ${costMinA.toLocaleString('id-ID')})</p>
        <p><strong>Item B:</strong> ${maxB} buah (Rp ${(maxB * priceB).toLocaleString('id-ID')})</p>
        <p><strong>Total Biaya:</strong> Rp ${totalCost.toLocaleString('id-ID')}</p>
        <p><strong>Sisa Budget:</strong> Rp ${(budget - totalCost).toLocaleString('id-ID')}</p>
        <div class="solution-correct">Kombinasi belanja berhasil dihitung!</div>
    `;
}

// Calculator functions with improved input handling
function solveSPLDVCalculator() {
    const a = parseFloat(document.getElementById('calc-a1').value) || 0;
    const b = parseFloat(document.getElementById('calc-b1').value) || 0;
    const c = parseFloat(document.getElementById('calc-c1').value) || 0;
    const d = parseFloat(document.getElementById('calc-d1').value) || 0;
    const e = parseFloat(document.getElementById('calc-e1').value) || 0;
    const f = parseFloat(document.getElementById('calc-f1').value) || 0;
    const method = document.getElementById('spldv-method').value;
    
    const solution = solveSPLDV(a, b, c, d, e, f);
    const resultDiv = document.getElementById('spldv-calc-result');
    
    let methodSteps = '';
    
    if (solution.type === 'unique') {
        switch(method) {
            case 'eliminasi':
                methodSteps = generateEliminationSteps(a, b, c, d, e, f);
                break;
            case 'substitusi':
                methodSteps = generateSubstitutionSteps(a, b, c, d, e, f);
                break;
            case 'campuran':
                methodSteps = generateMixedSteps(a, b, c, d, e, f);
                break;
        }
        
        resultDiv.innerHTML = `
            <h4>Solusi SPLDV (Metode ${method.charAt(0).toUpperCase() + method.slice(1)})</h4>
            <div class="method-steps">
                ${methodSteps}
            </div>
            <div class="solution-correct">
                <strong>Hasil Akhir:</strong><br>
                x = ${solution.x.toFixed(3)}<br>
                y = ${solution.y.toFixed(3)}
            </div>
        `;
    } else {
        resultDiv.innerHTML = `
            <h4>Sistem Tidak Memiliki Solusi Unik</h4>
            <div class="solution-incorrect">
                Sistem ${solution.type === 'infinite' ? 'memiliki tak hingga solusi' : 'tidak memiliki solusi'}
            </div>
        `;
    }
}

function generateEliminationSteps(a, b, c, d, e, f) {
    const det = a * e - b * d;
    if (Math.abs(det) < 1e-10) return '<p>Determinant = 0, sistem tidak memiliki solusi unik</p>';
    
    return `
        <p><strong>Persamaan:</strong></p>
        <p>${a}x + ${b}y = ${c} ... (1)</p>
        <p>${d}x + ${e}y = ${f} ... (2)</p>
        
        <p><strong>Eliminasi x:</strong></p>
        <p>Kalikan persamaan (1) dengan ${d}, persamaan (2) dengan ${a}</p>
        <p>${a*d}x + ${b*d}y = ${c*d}</p>
        <p>${d*a}x + ${e*a}y = ${f*a}</p>
        <p>Kurangkan: ${b*d - e*a}y = ${c*d - f*a}</p>
        <p>y = ${((c*d - f*a)/(b*d - e*a)).toFixed(3)}</p>
        
        <p><strong>Substitusi ke persamaan (1):</strong></p>
        <p>${a}x + ${b}(${((c*d - f*a)/(b*d - e*a)).toFixed(3)}) = ${c}</p>
        <p>x = ${((c - b*((c*d - f*a)/(b*d - e*a)))/a).toFixed(3)}</p>
    `;
}

function generateSubstitutionSteps(a, b, c, d, e, f) {
    if (a === 0 && d === 0) return '<p>Tidak dapat menyelesaikan dengan substitusi (kedua koefisien x = 0)</p>';
    
    const useEq1 = a !== 0;
    const [coefX, coefY, constant, otherA, otherB, otherC] = useEq1 ? 
        [a, b, c, d, e, f] : [d, e, f, a, b, c];
    
    return `
        <p><strong>Persamaan:</strong></p>
        <p>${a}x + ${b}y = ${c} ... (1)</p>
        <p>${d}x + ${e}y = ${f} ... (2)</p>
        
        <p><strong>Dari persamaan ${useEq1 ? '(1)' : '(2)'}:</strong></p>
        <p>x = (${constant} - ${coefY}y) / ${coefX}</p>
        
        <p><strong>Substitusi ke persamaan ${useEq1 ? '(2)' : '(1)'}:</strong></p>
        <p>${otherA}((${constant} - ${coefY}y) / ${coefX}) + ${otherB}y = ${otherC}</p>
        
        <p><strong>Selesaikan untuk y:</strong></p>
        <p>y = ${((otherC - otherA*constant/coefX)/(otherB - otherA*coefY/coefX)).toFixed(3)}</p>
        
        <p><strong>Substitusi kembali:</strong></p>
        <p>x = ${((constant - coefY*((otherC - otherA*constant/coefX)/(otherB - otherA*coefY/coefX)))/coefX).toFixed(3)}</p>
    `;
}

function generateMixedSteps(a, b, c, d, e, f) {
    return `
        <p><strong>Metode Campuran (Eliminasi + Substitusi)</strong></p>
        <p><strong>Persamaan:</strong></p>
        <p>${a}x + ${b}y = ${c} ... (1)</p>
        <p>${d}x + ${e}y = ${f} ... (2)</p>
        
        <p><strong>Langkah 1 - Eliminasi y:</strong></p>
        <p>Kalikan persamaan (1) dengan ${e}, persamaan (2) dengan ${b}</p>
        <p>${a*e}x + ${b*e}y = ${c*e}</p>
        <p>${d*b}x + ${e*b}y = ${f*b}</p>
        <p>Kurangkan: ${a*e - d*b}x = ${c*e - f*b}</p>
        <p>x = ${((c*e - f*b)/(a*e - d*b)).toFixed(3)}</p>
        
        <p><strong>Langkah 2 - Substitusi:</strong></p>
        <p>Substitusi x ke persamaan (1):</p>
        <p>${a}(${((c*e - f*b)/(a*e - d*b)).toFixed(3)}) + ${b}y = ${c}</p>
        <p>y = ${((c - a*((c*e - f*b)/(a*e - d*b)))/b).toFixed(3)}</p>
    `;
}

function solveSPLTVCalculator() {
    const a = parseFloat(document.getElementById('calc-a2').value) || 0;
    const b = parseFloat(document.getElementById('calc-b2').value) || 0;
    const c = parseFloat(document.getElementById('calc-c2').value) || 0;
    const d = parseFloat(document.getElementById('calc-d2').value) || 0;
    const e = parseFloat(document.getElementById('calc-e2').value) || 0;
    const f = parseFloat(document.getElementById('calc-f2').value) || 0;
    const g = parseFloat(document.getElementById('calc-g2').value) || 0;
    const h = parseFloat(document.getElementById('calc-h2').value) || 0;
    const i = parseFloat(document.getElementById('calc-i2').value) || 0;
    const j = parseFloat(document.getElementById('calc-j2').value) || 0;
    const k = parseFloat(document.getElementById('calc-k2').value) || 0;
    const l = parseFloat(document.getElementById('calc-l2').value) || 0;
    
    const solution = solveSPLTVSystem(a, b, c, d, e, f, g, h, i, j, k, l);
    const resultDiv = document.getElementById('spltv-calc-result');
    
    if (solution.type === 'unique') {
        resultDiv.innerHTML = `
            <h4>Solusi SPLTV</h4>
            <div class="method-steps">
                <p><strong>Sistem Persamaan:</strong></p>
                <p>${a}x + ${b}y + ${c}z = ${d}</p>
                <p>${e}x + ${f}y + ${g}z = ${h}</p>
                <p>${i}x + ${j}y + ${k}z = ${l}</p>
                
                <p><strong>Menggunakan Metode Eliminasi Gauss</strong></p>
                <p>Setelah eliminasi maju dan substitusi mundur:</p>
            </div>
            <div class="solution-correct">
                <strong>Hasil Akhir:</strong><br>
                x = ${solution.x.toFixed(3)}<br>
                y = ${solution.y.toFixed(3)}<br>
                z = ${solution.z.toFixed(3)}
            </div>
            <div style="margin-top: 10px; padding: 10px; background: var(--color-bg-1); border-radius: 6px;">
                <strong>Verifikasi:</strong> Substitusi hasil ke persamaan asli untuk memastikan kebenaran solusi.
            </div>
        `;
    } else {
        resultDiv.innerHTML = `
            <h4>Sistem Tidak Memiliki Solusi Unik</h4>
            <div class="solution-incorrect">
                Sistem tidak konsisten atau memiliki tak hingga solusi
            </div>
        `;
    }
}

function generateProblem() {
    const problemType = document.getElementById('problem-type').value;
    const difficulty = document.getElementById('difficulty').value;
    const resultDiv = document.getElementById('generated-problem');
    
    if (problemType === 'spldv') {
        generateSPLDVProblem(difficulty, resultDiv);
    } else {
        generateSPLTVProblem(difficulty, resultDiv);
    }
}

function generateSPLDVProblem(difficulty, resultDiv) {
    const problems = {
        mudah: [
            {
                context: "Sebuah toko menjual dua jenis buah. Apel seharga x rupiah per kg dan jeruk seharga y rupiah per kg.",
                eq1: "2x + 3y = 15000",
                eq2: "x + y = 6000",
                question: "Tentukan harga per kg apel dan jeruk!"
            },
            {
                context: "Dalam sebuah kandang terdapat ayam dan kambing. Total kepala 20 dan total kaki 56.",
                eq1: "x + y = 20",
                eq2: "2x + 4y = 56",
                question: "Berapa banyak ayam (x) dan kambing (y)?"
            }
        ],
        sedang: [
            {
                context: "Modal awal Ani 3 kali modal Budi. Setelah 1 tahun, modal Ani bertambah 20% dan modal Budi bertambah 30%. Total modal mereka menjadi 26 juta.",
                eq1: "x = 3y",
                eq2: "1.2x + 1.3y = 26000000",
                question: "Tentukan modal awal masing-masing!"
            }
        ],
        sulit: [
            {
                context: "Sebuah perusahaan memproduksi 2 jenis produk. Produk A memerlukan 2 jam mesin dan 3 jam tenaga kerja. Produk B memerlukan 4 jam mesin dan 1 jam tenaga kerja. Tersedia 100 jam mesin dan 80 jam tenaga kerja.",
                eq1: "2x + 4y = 100",
                eq2: "3x + y = 80",
                question: "Berapa banyak produk A dan B yang bisa diproduksi?"
            }
        ]
    };
    
    const problemSet = problems[difficulty];
    const selectedProblem = problemSet[Math.floor(Math.random() * problemSet.length)];
    
    resultDiv.innerHTML = `
        <div class="card">
            <div class="card__header">
                <h4>Soal SPLDV - Tingkat ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</h4>
            </div>
            <div class="card__body">
                <p><strong>Konteks:</strong> ${selectedProblem.context}</p>
                <div class="math-formula">
                    <div>${selectedProblem.eq1}</div>
                    <div>${selectedProblem.eq2}</div>
                </div>
                <p><strong>Pertanyaan:</strong> ${selectedProblem.question}</p>
                <button class="btn btn--secondary mt-16" onclick="showGeneratedSolution('${difficulty}')">Tampilkan Solusi</button>
                <div id="generated-solution" class="step-solution hidden mt-16"></div>
            </div>
        </div>
    `;
}

function generateSPLTVProblem(difficulty, resultDiv) {
    const problems = {
        mudah: [
            {
                context: "Seorang petani menanam 3 jenis tanaman: padi (x), jagung (y), dan kedelai (z). Total luas lahan 10 hektar.",
                eq1: "x + y + z = 10",
                eq2: "2x + y + 3z = 25",
                eq3: "x + 2y + z = 15",
                question: "Tentukan luas lahan masing-masing tanaman!"
            }
        ],
        sedang: [
            {
                context: "Sebuah pabrik memproduksi 3 jenis barang dengan menggunakan 3 mesin. Total waktu produksi 480 menit dengan berbagai kombinasi waktu per barang.",
                eq1: "2x + 3y + z = 480",
                eq2: "x + 2y + 3z = 450",
                eq3: "3x + y + 2z = 420",
                question: "Berapa unit masing-masing barang yang diproduksi?"
            }
        ],
        sulit: [
            {
                context: "Investor menginvestasikan uang dalam 3 portofolio dengan tingkat keuntungan berbeda dan batasan risiko tertentu.",
                eq1: "x + y + z = 1000000",
                eq2: "0.08x + 0.12y + 0.15z = 110000",
                eq3: "0.1x + 0.05y + 0.2z = 95000",
                question: "Berapa investasi optimal untuk setiap portofolio?"
            }
        ]
    };
    
    const problemSet = problems[difficulty];
    const selectedProblem = problemSet[Math.floor(Math.random() * problemSet.length)];
    
    resultDiv.innerHTML = `
        <div class="card">
            <div class="card__header">
                <h4>Soal SPLTV - Tingkat ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</h4>
            </div>
            <div class="card__body">
                <p><strong>Konteks:</strong> ${selectedProblem.context}</p>
                <div class="math-formula">
                    <div>${selectedProblem.eq1}</div>
                    <div>${selectedProblem.eq2}</div>
                    <div>${selectedProblem.eq3}</div>
                </div>
                <p><strong>Pertanyaan:</strong> ${selectedProblem.question}</p>
                <button class="btn btn--secondary mt-16" onclick="showGeneratedSolution('${difficulty}')">Tampilkan Solusi</button>
                <div id="generated-solution" class="step-solution hidden mt-16"></div>
            </div>
        </div>
    `;
}

function showGeneratedSolution(difficulty) {
    const solutionDiv = document.getElementById('generated-solution');
    if (solutionDiv.classList.contains('hidden')) {
        solutionDiv.classList.remove('hidden');
        solutionDiv.innerHTML = `
            <h5>Petunjuk Penyelesaian:</h5>
            <p><strong>Langkah 1:</strong> Identifikasi variabel dan buat persamaan</p>
            <p><strong>Langkah 2:</strong> Pilih metode penyelesaian yang sesuai</p>
            <p><strong>Langkah 3:</strong> Lakukan eliminasi atau substitusi</p>
            <p><strong>Langkah 4:</strong> Verifikasi jawaban dengan substitusi ke persamaan asli</p>
            <div style="margin-top: 10px; padding: 10px; background: var(--color-bg-3); border-radius: 6px;">
                <strong>Tips:</strong> Gunakan kalkulator ${difficulty === 'mudah' ? 'SPLDV' : 'SPLTV'} untuk memverifikasi jawaban Anda!
            </div>
        `;
    } else {
        solutionDiv.classList.add('hidden');
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add some initial animation delay
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});