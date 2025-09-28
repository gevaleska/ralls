// Interactive Mathematics Calculator - Educational Platform
class MathCalculator {
    constructor() {
        this.currentMode = 'basic';
        this.expression = '';
        this.result = '';
        this.history = [];
        this.memory = 0;
        this.showSteps = false;
        this.lastCalculation = null;
        
        // Mathematical constants
        this.constants = {
            π: Math.PI,
            e: Math.E,
            φ: (1 + Math.sqrt(5)) / 2 // Golden ratio
        };
        
        // Chart instance for visualizations
        this.currentChart = null;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadHistory();
        this.updateDisplay();
        this.updateHistoryDisplay();
        
        console.log('Kalkulator Interaktif Matematika berhasil dimuat');
    }
    
    setupEventListeners() {
        // Keyboard support
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Prevent form submission on Enter
        document.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.calculateResult();
            }
        });
    }
    
    // Mode Management
    switchMode(mode) {
        this.currentMode = mode;
        
        // Update active tab
        document.querySelectorAll('.mode-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        const activeTab = document.querySelector(`[data-mode="${mode}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }
        
        // Update button grid
        document.querySelectorAll('.button-grid').forEach(grid => {
            grid.classList.remove('active');
        });
        const activeGrid = document.getElementById(`${mode}-buttons`);
        if (activeGrid) {
            activeGrid.classList.add('active');
        }
        
        // Clear display for mode change
        this.clearCalculator();
        
        console.log(`Mode berubah ke: ${mode}`);
    }
    
    // Input Handling
    insertNumber(num) {
        if (this.result && !this.expression.includes('=')) {
            this.expression = '';
            this.result = '';
        }
        this.expression += num;
        this.updateDisplay();
        this.animateButton();
    }
    
    insertOperator(op) {
        if (!this.expression) return;
        
        // Prevent multiple operators
        const lastChar = this.expression.slice(-1);
        if (['+', '-', '×', '÷', '^', ' '].includes(lastChar)) {
            this.expression = this.expression.trim().slice(0, -1);
        }
        
        this.expression += ` ${op} `;
        this.updateDisplay();
        this.animateButton();
    }
    
    insertFunction(func) {
        if (this.result && !this.expression.includes('=')) {
            this.expression = '';
            this.result = '';
        }
        this.expression += func;
        this.updateDisplay();
        this.animateButton();
    }
    
    insertConstant(constant) {
        if (this.result && !this.expression.includes('=')) {
            this.expression = '';
            this.result = '';
        }
        this.expression += constant;
        this.updateDisplay();
        this.animateButton();
    }
    
    // Calculation Engine
    calculateResult() {
        if (!this.expression.trim()) return;
        
        try {
            const calculation = this.parseExpression(this.expression);
            const result = this.evaluateExpression(calculation);
            
            this.result = this.formatResult(result);
            this.lastCalculation = {
                expression: this.expression,
                result: this.result,
                steps: this.generateSteps(this.expression, result)
            };
            
            // Add to history
            this.addToHistory(this.expression, this.result);
            
            // Update display
            this.updateDisplay();
            
            // Show steps if enabled
            if (this.showSteps) {
                this.displaySteps();
            }
            
            // Generate visualization for visual mode
            if (this.currentMode === 'visual') {
                this.generateVisualization();
            }
            
        } catch (error) {
            this.result = 'Error: ' + error.message;
            this.updateDisplay();
            this.showNotification('Error dalam perhitungan: ' + error.message, 'error');
            console.error('Calculation error:', error);
        }
    }
    
    parseExpression(expr) {
        // Replace mathematical symbols with JavaScript operators
        let parsed = expr
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/−/g, '-')
            .replace(/,/g, '.')
            .replace(/π/g, Math.PI.toString())
            .replace(/e(?![0-9])/g, Math.E.toString())
            .replace(/φ/g, ((1 + Math.sqrt(5)) / 2).toString());
        
        return parsed;
    }
    
    evaluateExpression(expr) {
        // Handle special functions
        expr = this.handleSpecialFunctions(expr);
        
        // Safe evaluation
        try {
            // Remove any potentially dangerous content
            if (expr.match(/[a-zA-Z]/g) && !expr.match(/Math\./g)) {
                throw new Error('Karakter tidak valid');
            }
            
            return Function('"use strict"; return (' + expr + ')')();
        } catch (error) {
            throw new Error('Ekspresi tidak valid');
        }
    }
    
    handleSpecialFunctions(expr) {
        // Handle mathematical functions
        expr = expr.replace(/sin\s*\(/g, 'Math.sin(');
        expr = expr.replace(/cos\s*\(/g, 'Math.cos(');
        expr = expr.replace(/tan\s*\(/g, 'Math.tan(');
        expr = expr.replace(/log\s*\(/g, 'Math.log10(');
        expr = expr.replace(/ln\s*\(/g, 'Math.log(');
        expr = expr.replace(/√\s*\(/g, 'Math.sqrt(');
        expr = expr.replace(/√(\d+)/g, 'Math.sqrt($1)');
        expr = expr.replace(/(\d+)!/g, (match, n) => this.factorial(parseInt(n)));
        expr = expr.replace(/\^/g, '**');
        
        // Handle percentage
        expr = expr.replace(/(\d+(?:\.\d+)?)\s*%/g, '($1/100)');
        
        return expr;
    }
    
    factorial(n) {
        if (n < 0) throw new Error('Faktorial tidak dapat dihitung untuk bilangan negatif');
        if (n > 170) throw new Error('Faktorial terlalu besar untuk dihitung');
        if (n <= 1) return 1;
        return n * this.factorial(n - 1);
    }
    
    formatResult(result) {
        if (typeof result !== 'number') return result.toString();
        
        if (isNaN(result)) return 'Tidak terdefinisi';
        if (!isFinite(result)) return result > 0 ? '∞' : '-∞';
        
        // Handle very large or very small numbers
        if (Math.abs(result) > 1e15 || (Math.abs(result) < 1e-10 && result !== 0)) {
            return result.toExponential(6);
        }
        
        // Round to prevent floating point errors
        const rounded = Math.round(result * 1e12) / 1e12;
        return rounded.toString().replace('.', ',');
    }
    
    // Step-by-Step Solution Generation
    generateSteps(expression, result) {
        const steps = [];
        
        try {
            steps.push({
                step: 1,
                description: 'Ekspresi yang akan dihitung',
                expression: expression,
                explanation: 'Mari kita selesaikan langkah demi langkah'
            });
            
            // Basic arithmetic steps
            if (this.isBasicArithmetic(expression)) {
                steps.push(...this.generateArithmeticSteps(expression));
            }
            
            // Function evaluation steps
            if (this.containsFunction(expression)) {
                steps.push(...this.generateFunctionSteps(expression));
            }
            
            // Final result
            steps.push({
                step: steps.length + 1,
                description: `Hasil akhir`,
                expression: this.formatResult(result),
                explanation: 'Perhitungan selesai'
            });
            
        } catch (error) {
            steps.length = 0;
            steps.push({
                step: 1,
                description: 'Ekspresi tidak dapat dianalisis step-by-step',
                expression: expression,
                explanation: 'Gunakan operasi yang lebih sederhana untuk melihat langkah-langkah'
            });
        }
        
        return steps;
    }
    
    isBasicArithmetic(expr) {
        return /^[\d\s+\-×÷(),\.]+$/.test(expr);
    }
    
    containsFunction(expr) {
        return /sin|cos|tan|log|ln|√|!|%/.test(expr);
    }
    
    generateArithmeticSteps(expression) {
        const steps = [];
        let currentExpr = expression.trim();
        
        // Handle parentheses first
        if (currentExpr.includes('(')) {
            steps.push({
                step: steps.length + 2,
                description: 'Selesaikan operasi dalam kurung terlebih dahulu',
                expression: currentExpr,
                explanation: 'Kurung memiliki prioritas tertinggi dalam urutan operasi (PEMDAS/BODMAS)'
            });
        }
        
        // Handle multiplication and division
        if (currentExpr.includes('×') || currentExpr.includes('÷')) {
            steps.push({
                step: steps.length + 2,
                description: 'Lakukan perkalian dan pembagian dari kiri ke kanan',
                expression: currentExpr,
                explanation: 'Perkalian dan pembagian memiliki prioritas yang sama, lebih tinggi dari penjumlahan dan pengurangan'
            });
        }
        
        // Handle addition and subtraction
        if (currentExpr.includes('+') || currentExpr.includes('−')) {
            steps.push({
                step: steps.length + 2,
                description: 'Lakukan penjumlahan dan pengurangan dari kiri ke kanan',
                expression: currentExpr,
                explanation: 'Penjumlahan dan pengurangan memiliki prioritas terendah'
            });
        }
        
        return steps;
    }
    
    generateFunctionSteps(expression) {
        const steps = [];
        
        if (expression.includes('sin(') || expression.includes('cos(') || expression.includes('tan(')) {
            steps.push({
                step: 2,
                description: 'Evaluasi fungsi trigonometri',
                expression: expression,
                explanation: 'Fungsi trigonometri dihitung menggunakan nilai dalam radian. Untuk derajat, kalikan dengan π/180'
            });
        }
        
        if (expression.includes('log(') || expression.includes('ln(')) {
            steps.push({
                step: steps.length + 2,
                description: 'Evaluasi fungsi logaritma',
                expression: expression,
                explanation: 'log() adalah logaritma basis 10, ln() adalah logaritma natural (basis e)'
            });
        }
        
        if (expression.includes('√')) {
            steps.push({
                step: steps.length + 2,
                description: 'Hitung akar kuadrat',
                expression: expression,
                explanation: 'Akar kuadrat dari bilangan n adalah bilangan yang jika dikuadratkan menghasilkan n'
            });
        }
        
        if (expression.includes('%')) {
            steps.push({
                step: steps.length + 2,
                description: 'Konversi persentase',
                expression: expression,
                explanation: 'Persentase dikonversi dengan membagi 100 (x% = x/100)'
            });
        }
        
        return steps;
    }
    
    // Display Management
    updateDisplay() {
        const expressionDisplay = document.getElementById('expression-display');
        const resultDisplay = document.getElementById('result-display');
        
        if (expressionDisplay) {
            expressionDisplay.textContent = this.expression || '0';
        }
        if (resultDisplay) {
            resultDisplay.textContent = this.result || '';
        }
        
        // Add animation
        if (resultDisplay && this.result) {
            resultDisplay.classList.add('fade-in');
            setTimeout(() => resultDisplay.classList.remove('fade-in'), 300);
        }
    }
    
    displaySteps() {
        if (!this.lastCalculation || !this.lastCalculation.steps) return;
        
        const stepsPanel = document.getElementById('steps-panel');
        const stepsContent = document.getElementById('steps-content');
        
        if (!stepsPanel || !stepsContent) return;
        
        stepsContent.innerHTML = '';
        
        this.lastCalculation.steps.forEach((step, index) => {
            const stepElement = document.createElement('div');
            stepElement.className = 'step-item';
            stepElement.style.animationDelay = `${index * 0.1}s`;
            
            stepElement.innerHTML = `
                <span class="step-number">${step.step}</span>
                <div class="step-description">
                    <div class="math-expression">${step.expression}</div>
                    <p><strong>${step.description}</strong></p>
                    <small style="color: var(--color-text-secondary); font-style: italic;">
                        ${step.explanation}
                    </small>
                </div>
            `;
            
            stepsContent.appendChild(stepElement);
        });
        
        stepsPanel.classList.remove('hidden');
    }
    
    // Memory Functions
    memoryFunction(operation) {
        const currentValue = parseFloat(this.result?.replace(',', '.')) || 0;
        
        switch (operation) {
            case 'MC':
                this.memory = 0;
                this.showNotification('Memori dihapus', 'info');
                break;
            case 'MR':
                if (this.result && !this.expression.includes('=')) {
                    this.expression = '';
                    this.result = '';
                }
                this.expression = this.memory.toString().replace('.', ',');
                this.updateDisplay();
                this.showNotification(`Memori dipanggil: ${this.memory}`, 'info');
                break;
            case 'M+':
                this.memory += currentValue;
                this.showNotification(`Ditambah ke memori: ${this.memory}`, 'success');
                break;
            case 'M-':
                this.memory -= currentValue;
                this.showNotification(`Dikurangi dari memori: ${this.memory}`, 'success');
                break;
        }
        
        this.animateButton();
    }
    
    // Clear Functions
    clearCalculator() {
        this.expression = '';
        this.result = '';
        this.updateDisplay();
        this.hideSteps();
        this.hideVisualization();
    }
    
    clearEntry() {
        this.expression = '';
        this.result = '';
        this.updateDisplay();
    }
    
    backspace() {
        if (this.expression) {
            this.expression = this.expression.slice(0, -1);
            this.updateDisplay();
        }
    }
    
    // Toggle Functions
    toggleSteps() {
        this.showSteps = !this.showSteps;
        const button = document.getElementById('show-steps-btn');
        
        if (this.showSteps) {
            if (button) button.classList.add('active');
            if (this.lastCalculation) {
                this.displaySteps();
            } else {
                this.showNotification('Lakukan perhitungan terlebih dahulu untuk melihat langkah-langkah', 'info');
            }
        } else {
            if (button) button.classList.remove('active');
            this.hideSteps();
        }
    }
    
    hideSteps() {
        const stepsPanel = document.getElementById('steps-panel');
        if (stepsPanel) {
            stepsPanel.classList.add('hidden');
        }
    }
    
    toggleHistory() {
        const panel = document.getElementById('history-panel');
        if (panel) {
            panel.classList.toggle('hidden');
            if (!panel.classList.contains('hidden')) {
                this.updateHistoryDisplay();
            }
        }
    }
    
    toggleHelp() {
        const panel = document.getElementById('help-panel');
        if (panel) {
            panel.classList.toggle('hidden');
        }
    }
    
    // History Management
    addToHistory(expression, result) {
        const historyItem = {
            expression,
            result,
            timestamp: new Date().toLocaleString('id-ID')
        };
        
        this.history.unshift(historyItem);
        
        // Keep only last 50 calculations
        if (this.history.length > 50) {
            this.history = this.history.slice(0, 50);
        }
        
        this.saveHistory();
    }
    
    updateHistoryDisplay() {
        const historyList = document.getElementById('history-list');
        if (!historyList) return;
        
        if (this.history.length === 0) {
            historyList.innerHTML = `
                <div class="history-item">
                    <div class="history-expression">Riwayat kosong</div>
                    <div class="history-note">Mulai menghitung untuk melihat riwayat</div>
                </div>
            `;
            return;
        }
        
        historyList.innerHTML = this.history.map((item, index) => `
            <div class="history-item" onclick="calculator.loadFromHistory(${index})">
                <div class="history-expression">${item.expression}</div>
                <div class="history-result">= ${item.result}</div>
                <div class="history-time">${item.timestamp}</div>
            </div>
        `).join('');
    }
    
    loadFromHistory(index) {
        if (this.history[index]) {
            const item = this.history[index];
            this.expression = item.expression;
            this.result = item.result;
            this.updateDisplay();
            this.toggleHistory(); // Close history panel
        }
    }
    
    clearHistory() {
        this.history = [];
        this.saveHistory();
        this.updateHistoryDisplay();
        this.showNotification('Riwayat dihapus', 'info');
    }
    
    saveHistory() {
        try {
            localStorage.setItem('calculator_history', JSON.stringify(this.history));
        } catch (error) {
            console.log('Cannot save history to localStorage');
        }
    }
    
    loadHistory() {
        try {
            const saved = localStorage.getItem('calculator_history');
            if (saved) {
                this.history = JSON.parse(saved);
            }
        } catch (error) {
            console.log('Cannot load history from localStorage');
        }
    }
    
    // Keyboard Support
    handleKeyboard(event) {
        const key = event.key;
        
        // Prevent default for certain keys
        if (['Enter', 'Escape', '='].includes(key)) {
            event.preventDefault();
        }
        
        // Number keys
        if (/[0-9]/.test(key)) {
            this.insertNumber(key);
        }
        
        // Operator keys
        switch (key) {
            case '+':
                this.insertOperator('+');
                break;
            case '-':
                this.insertOperator('−');
                break;
            case '*':
                this.insertOperator('×');
                break;
            case '/':
                this.insertOperator('÷');
                break;
            case '.':
            case ',':
                this.insertOperator('.');
                break;
            case 'Enter':
            case '=':
                this.calculateResult();
                break;
            case 'Escape':
                this.clearCalculator();
                break;
            case 'Backspace':
                this.backspace();
                break;
            case 's':
            case 'S':
                if (event.ctrlKey || event.metaKey) {
                    event.preventDefault();
                    this.toggleSteps();
                }
                break;
            case 'h':
            case 'H':
                if (event.ctrlKey || event.metaKey) {
                    event.preventDefault();
                    this.toggleHistory();
                }
                break;
        }
    }
    
    // Visualization Functions
    generateVisualization() {
        if (!this.lastCalculation) return;
        
        const expression = this.lastCalculation.expression;
        const result = parseFloat(this.lastCalculation.result.replace(',', '.'));
        
        // Show visualization panel
        const visualDisplay = document.getElementById('visual-display');
        if (visualDisplay) {
            visualDisplay.classList.remove('hidden');
        
            // Determine visualization type
            if (this.isFractionOperation(expression)) {
                this.visualizeFractionOperation(expression, result);
            } else if (this.isPercentageOperation(expression)) {
                this.visualizePercentage(expression, result);
            } else if (this.isSimpleArithmetic(expression)) {
                this.visualizeArithmetic(expression, result);
            } else {
                this.createGenericChart(expression, result);
            }
        }
    }
    
    isFractionOperation(expr) {
        return expr.includes('/') && !expr.includes('÷');
    }
    
    isPercentageOperation(expr) {
        return expr.includes('%');
    }
    
    isSimpleArithmetic(expr) {
        return /^[\d\s+\-×÷(),\.]+$/.test(expr) && expr.split(/[+\-×÷]/).length <= 4;
    }
    
    visualizeFractionOperation(expression, result) {
        const canvas = document.getElementById('visualization-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        if (this.currentChart) {
            this.currentChart.destroy();
        }
        
        this.currentChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Hasil', 'Sisa'],
                datasets: [{
                    data: [Math.abs(result), Math.max(0, 1 - Math.abs(result))],
                    backgroundColor: ['#1FB8CD', '#FFC185'],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: `Visualisasi: ${expression} = ${this.lastCalculation.result}`
                    },
                    legend: {
                        display: true,
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    visualizePercentage(expression, result) {
        const canvas = document.getElementById('visualization-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        if (this.currentChart) {
            this.currentChart.destroy();
        }
        
        const percentage = Math.abs(result * 100);
        
        this.currentChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Persentase', 'Sisa'],
                datasets: [{
                    data: [percentage, Math.max(0, 100 - percentage)],
                    backgroundColor: ['#B4413C', '#ECEBD5'],
                    borderWidth: 3,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: `Visualisasi Persentase: ${expression} = ${this.lastCalculation.result}`
                    }
                }
            }
        });
    }
    
    visualizeArithmetic(expression, result) {
        const parts = expression.split(/([+\-×÷])/).filter(p => p.trim());
        const numbers = parts.filter(p => !isNaN(parseFloat(p.replace(',', '.')))).map(n => parseFloat(n.replace(',', '.')));
        
        const canvas = document.getElementById('visualization-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        if (this.currentChart) {
            this.currentChart.destroy();
        }
        
        this.currentChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [...numbers.map((n, i) => `Bilangan ${i + 1}`), 'Hasil'],
                datasets: [{
                    label: 'Nilai',
                    data: [...numbers, result],
                    backgroundColor: ['#5D878F', '#DB4545', '#D2BA4C', '#1FB8CD'],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: `Visualisasi: ${expression} = ${this.lastCalculation.result}`
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    createGenericChart(expression, result) {
        const canvas = document.getElementById('visualization-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        if (this.currentChart) {
            this.currentChart.destroy();
        }
        
        this.currentChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Input', 'Proses', 'Output'],
                datasets: [{
                    label: 'Alur Perhitungan',
                    data: [0, result / 2, result],
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: `Hasil Perhitungan: ${expression} = ${this.lastCalculation.result}`
                    }
                }
            }
        });
    }
    
    hideVisualization() {
        const visualDisplay = document.getElementById('visual-display');
        if (visualDisplay) {
            visualDisplay.classList.add('hidden');
        }
        if (this.currentChart) {
            this.currentChart.destroy();
            this.currentChart = null;
        }
    }
    
    // Special Calculator Functions (Educational Mode)
    openFractionCalculator() {
        this.showNotification('Kalkulator Pecahan - Gunakan format a/b untuk pecahan', 'info');
        this.insertFunction('(');
    }
    
    openEquationSolver() {
        this.showNotification('Pemecah Persamaan - Fitur dalam pengembangan', 'info');
    }
    
    openGeometryCalculator() {
        this.showNotification('Kalkulator Geometri - Fitur dalam pengembangan', 'info');
    }
    
    openGraphPlotter() {
        this.showNotification('Pembuat Grafik - Fitur dalam pengembangan', 'info');
    }
    
    openBaseConverter() {
        this.showNotification('Konversi Basis - Fitur dalam pengembangan', 'info');
    }
    
    openUnitConverter() {
        this.showNotification('Konversi Unit - Fitur dalam pengembangan', 'info');
    }
    
    openStatistics() {
        this.showNotification('Statistik - Fitur dalam pengembangan', 'info');
    }
    
    showConstantsInfo() {
        this.showNotification(`π = ${Math.PI.toFixed(6)}, e = ${Math.E.toFixed(6)}, φ = ${((1 + Math.sqrt(5)) / 2).toFixed(6)}`, 'info');
    }
    
    // Visual mode functions
    visualizeFraction() {
        this.openFractionCalculator();
    }
    
    showNumberLine() {
        this.showNotification('Garis Bilangan - Fitur dalam pengembangan', 'info');
    }
    
    createChart() {
        if (this.lastCalculation) {
            this.generateVisualization();
        } else {
            this.showNotification('Lakukan perhitungan terlebih dahulu untuk membuat grafik', 'info');
        }
    }
    
    showPattern() {
        this.showNotification('Pola Bilangan - Fitur dalam pengembangan', 'info');
    }
    
    insertFraction() {
        this.insertOperator('/');
    }
    
    insertMixedNumber() {
        this.showNotification('Gunakan format: a + b/c untuk bilangan campuran', 'info');
    }
    
    insertPercentage() {
        this.insertFunction('%');
    }
    
    insertDecimal() {
        this.insertOperator('.');
    }
    
    // Utility Functions
    animateButton() {
        // Add subtle animation effect to last pressed button
        document.body.style.setProperty('--animation-trigger', 'true');
        setTimeout(() => {
            document.body.style.removeProperty('--animation-trigger');
        }, 150);
    }
    
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existing = document.querySelectorAll('.notification');
        existing.forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--color-${type === 'error' ? 'error' : type === 'success' ? 'success' : 'info'});
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            max-width: 350px;
            font-size: 14px;
            line-height: 1.4;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
}

// Global calculator instance
let calculator;

// Global functions for HTML onclick handlers
function switchMode(mode) {
    if (calculator) calculator.switchMode(mode);
}

function insertNumber(num) {
    if (calculator) calculator.insertNumber(num);
}

function insertOperator(op) {
    if (calculator) calculator.insertOperator(op);
}

function insertFunction(func) {
    if (calculator) calculator.insertFunction(func);
}

function insertConstant(constant) {
    if (calculator) calculator.insertConstant(constant);
}

function calculateResult() {
    if (calculator) calculator.calculateResult();
}

function clearCalculator() {
    if (calculator) calculator.clearCalculator();
}

function clearEntry() {
    if (calculator) calculator.clearEntry();
}

function backspace() {
    if (calculator) calculator.backspace();
}

function memoryFunction(op) {
    if (calculator) calculator.memoryFunction(op);
}

function toggleSteps() {
    if (calculator) calculator.toggleSteps();
}

function toggleHistory() {
    if (calculator) calculator.toggleHistory();
}

function toggleHelp() {
    if (calculator) calculator.toggleHelp();
}

function clearHistory() {
    if (calculator) calculator.clearHistory();
}

function hideVisualization() {
    if (calculator) calculator.hideVisualization();
}

// Educational mode functions
function openFractionCalculator() {
    if (calculator) calculator.openFractionCalculator();
}

function openEquationSolver() {
    if (calculator) calculator.openEquationSolver();
}

function openGeometryCalculator() {
    if (calculator) calculator.openGeometryCalculator();
}

function openGraphPlotter() {
    if (calculator) calculator.openGraphPlotter();
}

function openBaseConverter() {
    if (calculator) calculator.openBaseConverter();
}

function openUnitConverter() {
    if (calculator) calculator.openUnitConverter();
}

function openStatistics() {
    if (calculator) calculator.openStatistics();
}

function showConstantsInfo() {
    if (calculator) calculator.showConstantsInfo();
}

// Visual mode functions
function visualizeFraction() {
    if (calculator) calculator.visualizeFraction();
}

function showNumberLine() {
    if (calculator) calculator.showNumberLine();
}

function createChart() {
    if (calculator) calculator.createChart();
}

function showPattern() {
    if (calculator) calculator.showPattern();
}

function insertFraction() {
    if (calculator) calculator.insertFraction();
}

function insertMixedNumber() {
    if (calculator) calculator.insertMixedNumber();
}

function insertPercentage() {
    if (calculator) calculator.insertPercentage();
}

function insertDecimal() {
    if (calculator) calculator.insertDecimal();
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    calculator = new MathCalculator();
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .calc-btn:active {
            transform: scale(0.95) !important;
            transition: transform 0.1s ease-out;
        }
        
        .notification {
            font-family: var(--font-family-base);
        }
    `;
    document.head.appendChild(style);
    
    console.log('Kalkulator Interaktif Matematika siap digunakan!');
});

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('Calculator minimized');
    } else {
        console.log('Calculator restored');
    }
});