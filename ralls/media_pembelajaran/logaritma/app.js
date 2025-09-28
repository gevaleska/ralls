// Logarithm Learning Application
class LogarithmApp {
  constructor() {
    this.currentSection = 'beranda';
    this.currentProperty = 1;
    this.currentCalculatorMode = 'basic';
    
    // Logarithm properties data
    this.properties = [
      {
        id: 1,
        title: "Logaritma Basis Terhadap Dirinya Sendiri",
        formula: "log_a(a) = 1",
        description: "Logaritma suatu bilangan terhadap dirinya sendiri selalu bernilai 1",
        example: "log₅(5) = 1, log₁₀(10) = 1",
        proof: "Karena a¹ = a, maka log_a(a) = 1"
      },
      {
        id: 2,
        title: "Logaritma dari 1",
        formula: "log_a(1) = 0",
        description: "Logaritma dari 1 dengan basis apapun selalu bernilai 0",
        example: "log₂(1) = 0, log₁₀(1) = 0",
        proof: "Karena a⁰ = 1 untuk semua a ≠ 0, maka log_a(1) = 0"
      },
      {
        id: 3,
        title: "Logaritma dari Pangkat Basis",
        formula: "log_a(a^x) = x",
        description: "Logaritma dari basis yang dipangkatkan sama dengan pangkatnya",
        example: "log₃(3⁵) = 5, log₂(2⁻²) = -2",
        proof: "Definisi logaritma sebagai invers dari eksponen"
      },
      {
        id: 4,
        title: "Basis Dipangkatkan Logaritma",
        formula: "a^(log_a(x)) = x",
        description: "Basis dipangkatkan logaritma dari x sama dengan x",
        example: "2^(log₂(8)) = 8, 10^(log₁₀(100)) = 100",
        proof: "Sifat invers antara logaritma dan eksponen"
      },
      {
        id: 5,
        title: "Sifat Perkalian (Penjumlahan)",
        formula: "log_a(xy) = log_a(x) + log_a(y)",
        description: "Logaritma dari perkalian sama dengan jumlah logaritma",
        example: "log₂(8×4) = log₂(8) + log₂(4) = 3 + 2 = 5",
        proof: "Dari a^m × a^n = a^(m+n)"
      },
      {
        id: 6,
        title: "Sifat Pembagian (Pengurangan)",
        formula: "log_a(x/y) = log_a(x) - log_a(y)",
        description: "Logaritma dari pembagian sama dengan selisih logaritma",
        example: "log₃(27/9) = log₃(27) - log₃(9) = 3 - 2 = 1",
        proof: "Dari a^m ÷ a^n = a^(m-n)"
      },
      {
        id: 7,
        title: "Sifat Perpangkatan",
        formula: "log_a(x^n) = n × log_a(x)",
        description: "Logaritma dari bilangan berpangkat sama dengan pangkat dikalikan logaritma bilangan",
        example: "log₂(5³) = 3 × log₂(5)",
        proof: "Dari (a^m)^n = a^(mn)"
      },
      {
        id: 8,
        title: "Perubahan Basis",
        formula: "log_a(x) = log_b(x) / log_b(a)",
        description: "Formula untuk mengubah basis logaritma",
        example: "log₃(10) = log₁₀(10) / log₁₀(3) = 1 / log₁₀(3)",
        proof: "Dari definisi logaritma dan sifat pembagian"
      },
      {
        id: 9,
        title: "Sifat Rantai (Chain Rule)",
        formula: "log_a(x) × log_x(y) = log_a(y)",
        description: "Perkalian logaritma dengan basis yang berkaitan",
        example: "log₂(3) × log₃(8) = log₂(8) = 3",
        proof: "Menggunakan perubahan basis dan sederhanakan"
      },
      {
        id: 10,
        title: "Logaritma Kebalikan",
        formula: "log_a(1/x) = -log_a(x)",
        description: "Logaritma dari kebalikan suatu bilangan",
        example: "log₅(1/25) = -log₅(25) = -2",
        proof: "Dari sifat pembagian: log_a(1/x) = log_a(1) - log_a(x) = 0 - log_a(x)"
      }
    ];
    
    // Practice problems
    this.problems = [
      {
        id: 1,
        question: "Hitunglah log₂(32)",
        answer: "5",
        hint: "Cari pangkat berapa dari 2 yang menghasilkan 32",
        solution: "log₂(32) = log₂(2⁵) = 5"
      },
      {
        id: 2,
        question: "Sederhanakan log₃(9) + log₃(3)",
        answer: "3",
        hint: "Gunakan sifat penjumlahan logaritma: log_a(x) + log_a(y) = log_a(xy)",
        solution: "log₃(9) + log₃(3) = log₃(9×3) = log₃(27) = log₃(3³) = 3"
      },
      {
        id: 3,
        question: "Selesaikan log₅(x) = 3",
        answer: "125",
        hint: "Ubah persamaan logaritma ke bentuk eksponensial",
        solution: "log₅(x) = 3 → x = 5³ = 125"
      },
      {
        id: 4,
        question: "Hitung log₂(10) menggunakan logaritma basis 10",
        answer: "log(10)/log(2)",
        hint: "Gunakan formula perubahan basis: log_a(x) = log_b(x)/log_b(a)",
        solution: "log₂(10) = log₁₀(10)/log₁₀(2) = 1/log₁₀(2) ≈ 3.322"
      },
      {
        id: 5,
        question: "Sederhanakan 2×log₄(8) - log₄(2)",
        answer: "2.5",
        hint: "Gunakan sifat perpangkatan dan pengurangan logaritma",
        solution: "2×log₄(8) - log₄(2) = log₄(8²) - log₄(2) = log₄(64/2) = log₄(32) = log₄(4^2.5) = 2.5"
      },
      {
        id: 6,
        question: "Selesaikan 3^x = 81",
        answer: "4",
        hint: "Ubah 81 ke bentuk pangkat basis 3, atau gunakan logaritma",
        solution: "3^x = 81 → 3^x = 3⁴ → x = 4"
      },
      {
        id: 7,
        question: "Berapa pH larutan dengan [H⁺] = 10⁻⁴ M?",
        answer: "4",
        hint: "Gunakan rumus pH = -log₁₀[H⁺]",
        solution: "pH = -log₁₀[H⁺] = -log₁₀(10⁻⁴) = -(-4) = 4"
      },
      {
        id: 8,
        question: "Investasi Rp5 juta dengan bunga 12%/tahun. Berapa tahun untuk menjadi Rp10 juta?",
        answer: "6.12",
        hint: "Gunakan rumus bunga majemuk dan ubah ke bentuk logaritma",
        solution: "A = P(1+r)^t → 10 = 5(1.12)^t → 2 = 1.12^t → t = log₁.₁₂(2) = log(2)/log(1.12) ≈ 6.12 tahun"
      }
    ];
    
    this.currentProblem = 0;
    this.score = 0;
    this.correctAnswers = 0;
    this.wrongAnswers = 0;
    this.completedProblems = 0;
    
    // Calculator history
    this.calculatorHistory = [];
    
    this.init();
  }
  
  init() {
    console.log('Initializing Logarithm App...');
    this.setupEventListeners();
    this.showSection('beranda');
    
    // Initialize canvases after DOM is ready
    setTimeout(() => {
      this.setupCanvases();
      this.updateProblemDisplay();
      this.updatePropertyDisplay();
    }, 100);
  }
  
  setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Main navigation buttons
    document.querySelectorAll('.nav__btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const section = btn.getAttribute('data-section');
        console.log('Nav button clicked:', section);
        if (section) {
          this.showSection(section);
        }
      });
    });
    
    // Feature cards navigation
    document.querySelectorAll('.feature-card').forEach(card => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const section = card.getAttribute('data-section');
        console.log('Feature card clicked:', section);
        if (section) {
          this.showSection(section);
        }
      });
    });
    
    // Feature card buttons
    document.querySelectorAll('.feature-card .btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const card = btn.closest('.feature-card');
        const section = card.getAttribute('data-section');
        console.log('Feature button clicked:', section);
        if (section) {
          this.showSection(section);
        }
      });
    });
    
    // Setup all other event listeners immediately
    this.setupControlEventListeners();
  }
  
  setupControlEventListeners() {
    // Properties of logarithms
    document.querySelectorAll('.property-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const propertyId = parseInt(btn.getAttribute('data-property'));
        this.showProperty(propertyId);
      });
    });
    
    // Demo calculation
    const demoBtn = document.getElementById('demo-calculate');
    if (demoBtn) {
      demoBtn.addEventListener('click', () => this.calculateDemo());
    }
    
    // Operations calculators
    const calcLogAddBtn = document.getElementById('calc-log-addition');
    const calcLogSubBtn = document.getElementById('calc-log-subtraction');
    const calcChangeBaseBtn = document.getElementById('calc-change-base');
    const calcPowerLogBtn = document.getElementById('calc-power-log');
    
    if (calcLogAddBtn) calcLogAddBtn.addEventListener('click', () => this.calculateLogAddition());
    if (calcLogSubBtn) calcLogSubBtn.addEventListener('click', () => this.calculateLogSubtraction());
    if (calcChangeBaseBtn) calcChangeBaseBtn.addEventListener('click', () => this.calculateChangeBase());
    if (calcPowerLogBtn) calcPowerLogBtn.addEventListener('click', () => this.calculatePowerLog());
    
    // Equation solvers
    const solveSimpleBtn = document.getElementById('solve-simple');
    const solveExpBtn = document.getElementById('solve-exponential');
    
    if (solveSimpleBtn) solveSimpleBtn.addEventListener('click', () => this.solveSimpleEquation());
    if (solveExpBtn) solveExpBtn.addEventListener('click', () => this.solveExponentialEquation());
    
    // Graph controls
    const plotGraphBtn = document.getElementById('plot-graph');
    if (plotGraphBtn) plotGraphBtn.addEventListener('click', () => this.plotGraph());
    
    // Preset graph functions
    document.querySelectorAll('[data-preset]').forEach(btn => {
      btn.addEventListener('click', () => {
        const preset = parseFloat(btn.getAttribute('data-preset'));
        this.setGraphPreset(preset);
      });
    });
    
    // Calculator modes
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.getAttribute('data-mode');
        this.switchCalculatorMode(mode);
      });
    });
    
    // Calculator functions
    const calculateLogBtn = document.getElementById('calculate-log');
    const clearHistoryBtn = document.getElementById('clear-calc-history');
    
    if (calculateLogBtn) calculateLogBtn.addEventListener('click', () => this.calculateLogarithm());
    if (clearHistoryBtn) clearHistoryBtn.addEventListener('click', () => this.clearCalculatorHistory());
    
    // Quick calculations
    document.querySelectorAll('[data-quick]').forEach(btn => {
      btn.addEventListener('click', () => {
        const quick = btn.getAttribute('data-quick');
        this.performQuickCalculation(quick);
      });
    });
    
    // Application calculators
    const calcPhBtn = document.getElementById('calc-ph');
    const calcRichterBtn = document.getElementById('calc-richter');
    const calcDecibelBtn = document.getElementById('calc-decibel');
    const calcCompoundBtn = document.getElementById('calc-compound');
    const calcPopulationBtn = document.getElementById('calc-population');
    
    if (calcPhBtn) calcPhBtn.addEventListener('click', () => this.calculatePH());
    if (calcRichterBtn) calcRichterBtn.addEventListener('click', () => this.calculateRichter());
    if (calcDecibelBtn) calcDecibelBtn.addEventListener('click', () => this.calculateDecibel());
    if (calcCompoundBtn) calcCompoundBtn.addEventListener('click', () => this.calculateCompoundInterest());
    if (calcPopulationBtn) calcPopulationBtn.addEventListener('click', () => this.calculatePopulationGrowth());
    
    // Practice problems
    const checkBtn = document.getElementById('check-answer');
    const hintBtn = document.getElementById('show-hint');
    const solutionBtn = document.getElementById('show-solution');
    const prevBtn = document.getElementById('prev-problem');
    const nextBtn = document.getElementById('next-problem');
    
    if (checkBtn) checkBtn.addEventListener('click', () => this.checkAnswer());
    if (hintBtn) hintBtn.addEventListener('click', () => this.showHint());
    if (solutionBtn) solutionBtn.addEventListener('click', () => this.showSolution());
    if (prevBtn) prevBtn.addEventListener('click', () => this.previousProblem());
    if (nextBtn) nextBtn.addEventListener('click', () => this.nextProblem());
    
    // Enter key for inputs
    const answerInput = document.getElementById('answer-input');
    if (answerInput) {
      answerInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.checkAnswer();
      });
    }
  }
  
  setupCanvases() {
    console.log('Setting up canvases...');
    this.drawHeroVisualization();
    this.drawTheoryVisualization();
    this.plotGraph();
  }
  
  // Section navigation - Fixed implementation
  showSection(sectionName) {
    console.log('Showing section:', sectionName);
    
    // Update navigation state
    document.querySelectorAll('.nav__btn').forEach(btn => {
      btn.classList.remove('active', 'btn--primary');
      btn.classList.add('btn--outline');
      
      if (btn.getAttribute('data-section') === sectionName) {
        btn.classList.remove('btn--outline');
        btn.classList.add('active', 'btn--primary');
      }
    });
    
    // Hide all sections first
    document.querySelectorAll('.section').forEach(section => {
      section.classList.remove('active');
      section.style.display = 'none';
    });
    
    // Show target section
    const targetSection = document.getElementById(`${sectionName}-section`);
    if (targetSection) {
      targetSection.classList.add('active');
      targetSection.style.display = 'block';
      console.log('Section activated successfully:', sectionName);
    } else {
      console.error('Section not found:', `${sectionName}-section`);
      return;
    }
    
    this.currentSection = sectionName;
    
    // Initialize section-specific features
    setTimeout(() => {
      this.initializeSectionFeatures(sectionName);
    }, 50);
  }
  
  initializeSectionFeatures(sectionName) {
    console.log('Initializing features for section:', sectionName);
    
    switch (sectionName) {
      case 'beranda':
        this.drawHeroVisualization();
        break;
      case 'teori':
        this.drawTheoryVisualization();
        break;
      case 'sifat':
        this.updatePropertyDisplay();
        break;
      case 'operasi':
        this.initializeOperations();
        break;
      case 'persamaan':
        // Equations are ready
        break;
      case 'grafik':
        this.plotGraph();
        break;
      case 'kalkulator':
        this.switchCalculatorMode(this.currentCalculatorMode);
        break;
      case 'aplikasi':
        // Applications are ready
        break;
      case 'latihan':
        this.updateProblemDisplay();
        break;
    }
  }
  
  // Canvas drawing functions
  drawHeroVisualization() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    // Draw logarithmic function y = log₂(x) and exponential y = 2^x
    const padding = 40;
    const graphWidth = width - 2 * padding;
    const graphHeight = height - 2 * padding;
    
    // Draw axes
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding); // x-axis
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(padding, padding); // y-axis
    ctx.stroke();
    
    // Draw logarithmic curve y = log₂(x)
    ctx.strokeStyle = '#21808D';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    let firstPoint = true;
    for (let x = 0.1; x <= 8; x += 0.1) {
      const canvasX = padding + (x / 8) * graphWidth;
      const y = Math.log2(x);
      const canvasY = height - padding - ((y + 2) / 5) * graphHeight; // y range: -2 to 3
      
      if (firstPoint) {
        ctx.moveTo(canvasX, canvasY);
        firstPoint = false;
      } else {
        ctx.lineTo(canvasX, canvasY);
      }
    }
    ctx.stroke();
    
    // Draw exponential curve y = 2^x (portion)
    ctx.strokeStyle = '#FF6B6B';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    firstPoint = true;
    for (let x = -2; x <= 3; x += 0.1) {
      const canvasX = padding + ((x + 2) / 5) * graphWidth; // x range: -2 to 3
      const y = Math.pow(2, x);
      const canvasY = height - padding - (y / 8) * graphHeight;
      
      if (canvasY >= padding && canvasY <= height - padding) {
        if (firstPoint) {
          ctx.moveTo(canvasX, canvasY);
          firstPoint = false;
        } else {
          ctx.lineTo(canvasX, canvasY);
        }
      }
    }
    ctx.stroke();
    
    // Add labels
    ctx.fillStyle = '#21808D';
    ctx.font = 'bold 16px Arial';
    ctx.fillText('y = log₂(x)', width - 120, 60);
    
    ctx.fillStyle = '#FF6B6B';
    ctx.fillText('y = 2^x', 60, height - 60);
    
    // Mark key points
    const points = [
      {x: 1, y: 0, label: '(1,0)'},
      {x: 2, y: 1, label: '(2,1)'},
      {x: 4, y: 2, label: '(4,2)'}
    ];
    
    points.forEach(point => {
      const canvasX = padding + (point.x / 8) * graphWidth;
      const canvasY = height - padding - ((point.y + 2) / 5) * graphHeight;
      
      ctx.beginPath();
      ctx.arc(canvasX, canvasY, 4, 0, 2 * Math.PI);
      ctx.fillStyle = '#21808D';
      ctx.fill();
      
      ctx.fillStyle = '#333';
      ctx.font = '12px Arial';
      ctx.fillText(point.label, canvasX - 15, canvasY - 10);
    });
    
    // Add title
    ctx.fillStyle = '#21808D';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Hubungan Logaritma dan Eksponensial', width/2, 25);
    ctx.textAlign = 'left';
  }
  
  drawTheoryVisualization() {
    const canvas = document.getElementById('theory-visualization');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    // Demonstrate log₂(8) = 3 because 2³ = 8
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Draw the relationship visually
    ctx.fillStyle = '#4ECDC4';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    
    // Show the logarithm
    ctx.fillText('log₂(8) = ?', centerX, centerY - 80);
    
    // Show the exponential relationship
    ctx.fillStyle = '#21808D';
    ctx.font = '18px Arial';
    ctx.fillText('Karena 2³ = 8', centerX, centerY - 40);
    
    // Visual representation with boxes
    ctx.fillStyle = '#FF6B6B';
    const boxSize = 20;
    let x = centerX - 40;
    let y = centerY - 10;
    
    // Draw 8 small boxes arranged as 2×2×2
    for (let layer = 0; layer < 2; layer++) {
      for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 2; col++) {
          ctx.fillRect(
            x + col * boxSize + layer * 10,
            y + row * boxSize + layer * 10,
            boxSize - 2,
            boxSize - 2
          );
        }
      }
    }
    
    // Show the answer
    ctx.fillStyle = '#21808D';
    ctx.font = 'bold 24px Arial';
    ctx.fillText('Maka log₂(8) = 3', centerX, centerY + 60);
    
    // Add explanation
    ctx.fillStyle = '#666';
    ctx.font = '14px Arial';
    ctx.fillText('8 kubus dapat disusun sebagai 2×2×2', centerX, centerY + 85);
    
    ctx.textAlign = 'left';
  }
  
  // Properties functionality
  showProperty(propertyId) {
    this.currentProperty = propertyId;
    this.updatePropertyDisplay();
  }
  
  updatePropertyDisplay() {
    const property = this.properties.find(p => p.id === this.currentProperty);
    if (!property) return;
    
    // Update property buttons
    document.querySelectorAll('.property-btn').forEach(btn => {
      btn.classList.remove('active', 'btn--primary');
      btn.classList.add('btn--outline');
      
      if (parseInt(btn.getAttribute('data-property')) === this.currentProperty) {
        btn.classList.remove('btn--outline');
        btn.classList.add('active', 'btn--primary');
      }
    });
    
    // Update property display
    const titleEl = document.getElementById('property-title');
    const formulaEl = document.getElementById('property-formula');
    const descriptionEl = document.getElementById('property-description');
    const exampleEl = document.getElementById('property-example-text');
    const proofEl = document.getElementById('property-proof-text');
    
    if (titleEl) titleEl.textContent = property.title;
    if (formulaEl) formulaEl.textContent = property.formula;
    if (descriptionEl) descriptionEl.textContent = property.description;
    if (exampleEl) exampleEl.textContent = property.example;
    if (proofEl) proofEl.textContent = property.proof;
  }
  
  calculateDemo() {
    const baseInput = document.getElementById('demo-base');
    const valueInput = document.getElementById('demo-value');
    const resultEl = document.getElementById('demo-result');
    
    if (!baseInput || !valueInput || !resultEl) return;
    
    const base = parseFloat(baseInput.value) || 2;
    const value = parseFloat(valueInput.value) || 8;
    
    if (base <= 0 || base === 1 || value <= 0) {
      resultEl.innerHTML = '<p style="color: var(--color-error);">Error: Basis harus > 0 dan ≠ 1, nilai harus > 0</p>';
      return;
    }
    
    try {
      const result = Math.log(value) / Math.log(base);
      const verification = Math.pow(base, result);
      
      resultEl.innerHTML = `
        <div style="color: var(--color-success);">
          <h4>📊 Hasil Perhitungan</h4>
          <p><strong>log₍${base}₎(${value}) = ${result.toFixed(4)}</strong></p>
          <p><strong>Verifikasi:</strong> ${base}^${result.toFixed(4)} ≈ ${verification.toFixed(4)}</p>
          <p><strong>Sifat yang berlaku:</strong> ${this.identifyProperty(base, value, result)}</p>
        </div>
      `;
      
    } catch (error) {
      resultEl.innerHTML = `
        <div style="color: var(--color-error);">
          <h4>❌ Error</h4>
          <p>Terjadi kesalahan dalam perhitungan</p>
        </div>
      `;
    }
  }
  
  identifyProperty(base, value, result) {
    if (Math.abs(value - base) < 0.001) return `log_a(a) = 1`;
    if (Math.abs(value - 1) < 0.001) return `log_a(1) = 0`;
    if (Math.abs(result - Math.round(result)) < 0.001) return `log_a(a^n) = n`;
    return `Sifat umum logaritma`;
  }
  
  // Operations functionality
  initializeOperations() {
    this.calculateLogAddition();
    this.calculateLogSubtraction();
    this.calculateChangeBase();
    this.calculatePowerLog();
  }
  
  calculateLogAddition() {
    const base1 = parseFloat(document.getElementById('add-base')?.value) || 2;
    const x = parseFloat(document.getElementById('add-x')?.value) || 4;
    const base2 = parseFloat(document.getElementById('add-base2')?.value) || 2;
    const y = parseFloat(document.getElementById('add-y')?.value) || 8;
    const resultEl = document.getElementById('addition-log-result');
    
    if (!resultEl) return;
    
    if (Math.abs(base1 - base2) > 0.001) {
      resultEl.textContent = `Error: Basis harus sama untuk penjumlahan logaritma`;
      return;
    }
    
    const logX = Math.log(x) / Math.log(base1);
    const logY = Math.log(y) / Math.log(base1);
    const sum = logX + logY;
    const product = x * y;
    
    resultEl.textContent = `log₍${base1}₎(${x}) + log₍${base1}₎(${y}) = ${logX.toFixed(3)} + ${logY.toFixed(3)} = ${sum.toFixed(3)} = log₍${base1}₎(${product})`;
  }
  
  calculateLogSubtraction() {
    const base1 = parseFloat(document.getElementById('sub-base')?.value) || 3;
    const x = parseFloat(document.getElementById('sub-x')?.value) || 81;
    const base2 = parseFloat(document.getElementById('sub-base2')?.value) || 3;
    const y = parseFloat(document.getElementById('sub-y')?.value) || 9;
    const resultEl = document.getElementById('subtraction-log-result');
    
    if (!resultEl) return;
    
    if (Math.abs(base1 - base2) > 0.001) {
      resultEl.textContent = `Error: Basis harus sama untuk pengurangan logaritma`;
      return;
    }
    
    const logX = Math.log(x) / Math.log(base1);
    const logY = Math.log(y) / Math.log(base1);
    const difference = logX - logY;
    const quotient = x / y;
    
    resultEl.textContent = `log₍${base1}₎(${x}) - log₍${base1}₎(${y}) = ${logX.toFixed(3)} - ${logY.toFixed(3)} = ${difference.toFixed(3)} = log₍${base1}₎(${quotient})`;
  }
  
  calculateChangeBase() {
    const baseA = parseFloat(document.getElementById('change-base-a')?.value) || 3;
    const x = parseFloat(document.getElementById('change-x')?.value) || 10;
    const baseB = parseFloat(document.getElementById('change-base-b')?.value) || 10;
    const resultEl = document.getElementById('change-base-result');
    
    if (!resultEl) return;
    
    const logAX = Math.log(x) / Math.log(baseA);
    const logBX = Math.log(x) / Math.log(baseB);
    const logBA = Math.log(baseA) / Math.log(baseB);
    const result = logBX / logBA;
    
    resultEl.textContent = `log₍${baseA}₎(${x}) = log₍${baseB}₎(${x}) / log₍${baseB}₎(${baseA}) = ${logBX.toFixed(3)} / ${logBA.toFixed(3)} = ${result.toFixed(3)}`;
  }
  
  calculatePowerLog() {
    const base = parseFloat(document.getElementById('power-base')?.value) || 2;
    const x = parseFloat(document.getElementById('power-x')?.value) || 5;
    const n = parseFloat(document.getElementById('power-n')?.value) || 3;
    const resultEl = document.getElementById('power-log-result');
    
    if (!resultEl) return;
    
    const logX = Math.log(x) / Math.log(base);
    const nLogX = n * logX;
    
    resultEl.textContent = `log₍${base}₎(${x}^${n}) = ${n} × log₍${base}₎(${x}) = ${n} × ${logX.toFixed(3)} = ${nLogX.toFixed(3)}`;
  }
  
  // Equation solving
  solveSimpleEquation() {
    const base = parseFloat(document.getElementById('simple-base')?.value) || 3;
    const result = parseFloat(document.getElementById('simple-result')?.value) || 4;
    const solutionEl = document.getElementById('simple-solution');
    
    if (!solutionEl) return;
    
    const x = Math.pow(base, result);
    
    solutionEl.innerHTML = `
      <div style="color: var(--color-success);">
        <h4>✅ Solusi Persamaan</h4>
        <p><strong>Persamaan:</strong> log₍${base}₎(x) = ${result}</p>
        <p><strong>Langkah 1:</strong> Ubah ke bentuk eksponensial</p>
        <p><strong>Langkah 2:</strong> x = ${base}^${result}</p>
        <p><strong>Jawaban:</strong> x = ${x}</p>
        <p><strong>Verifikasi:</strong> log₍${base}₎(${x}) = ${result}</p>
      </div>
    `;
  }
  
  solveExponentialEquation() {
    const base = parseFloat(document.getElementById('exp-base')?.value) || 2;
    const result = parseFloat(document.getElementById('exp-result')?.value) || 16;
    const solutionEl = document.getElementById('exp-solution');
    
    if (!solutionEl) return;
    
    const x = Math.log(result) / Math.log(base);
    
    solutionEl.innerHTML = `
      <div style="color: var(--color-success);">
        <h4>✅ Solusi Persamaan</h4>
        <p><strong>Persamaan:</strong> ${base}^x = ${result}</p>
        <p><strong>Langkah 1:</strong> Ambil logaritma kedua ruas</p>
        <p><strong>Langkah 2:</strong> x × log(${base}) = log(${result})</p>
        <p><strong>Langkah 3:</strong> x = log(${result}) / log(${base})</p>
        <p><strong>Jawaban:</strong> x = ${x.toFixed(4)}</p>
        <p><strong>Verifikasi:</strong> ${base}^${x.toFixed(4)} ≈ ${Math.pow(base, x).toFixed(4)}</p>
      </div>
    `;
  }
  
  // Graph plotting
  plotGraph() {
    const canvas = document.getElementById('graph-canvas');
    if (!canvas) return;
    
    const base = parseFloat(document.getElementById('graph-base')?.value) || 2;
    const range = parseInt(document.getElementById('graph-range')?.value) || 10;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    const padding = 60;
    const graphWidth = width - 2 * padding;
    const graphHeight = height - 2 * padding;
    
    // Draw grid
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    
    // Vertical grid lines
    for (let i = 0; i <= 10; i++) {
      const x = padding + (i / 10) * graphWidth;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
      ctx.stroke();
    }
    
    // Horizontal grid lines
    for (let i = 0; i <= 10; i++) {
      const y = padding + (i / 10) * graphHeight;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }
    
    // Draw axes
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding); // x-axis
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(padding, padding); // y-axis
    ctx.stroke();
    
    // Draw logarithmic function
    ctx.strokeStyle = '#21808D';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    let firstPoint = true;
    for (let x = 0.1; x <= range; x += 0.1) {
      const y = Math.log(x) / Math.log(base);
      
      // Map to canvas coordinates
      const canvasX = padding + (x / range) * graphWidth;
      const canvasY = height - padding - ((y + 5) / 10) * graphHeight; // y range: -5 to 5
      
      if (canvasY >= padding && canvasY <= height - padding) {
        if (firstPoint) {
          ctx.moveTo(canvasX, canvasY);
          firstPoint = false;
        } else {
          ctx.lineTo(canvasX, canvasY);
        }
      }
    }
    ctx.stroke();
    
    // Add labels
    ctx.fillStyle = '#333';
    ctx.font = '14px Arial';
    
    // X-axis labels
    for (let i = 0; i <= range; i += Math.ceil(range / 10)) {
      const x = padding + (i / range) * graphWidth;
      ctx.textAlign = 'center';
      ctx.fillText(i.toString(), x, height - padding + 20);
    }
    
    // Y-axis labels
    for (let i = -4; i <= 4; i += 2) {
      const y = height - padding - ((i + 5) / 10) * graphHeight;
      ctx.textAlign = 'right';
      ctx.fillText(i.toString(), padding - 10, y + 5);
    }
    
    // Title
    ctx.fillStyle = '#21808D';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`y = log₍${base}₎(x)`, width/2, 30);
    
    // Mark key points
    const keyPoints = [1, base, Math.pow(base, 2)].filter(x => x <= range);
    keyPoints.forEach(x => {
      const y = Math.log(x) / Math.log(base);
      const canvasX = padding + (x / range) * graphWidth;
      const canvasY = height - padding - ((y + 5) / 10) * graphHeight;
      
      if (canvasY >= padding && canvasY <= height - padding) {
        ctx.beginPath();
        ctx.arc(canvasX, canvasY, 4, 0, 2 * Math.PI);
        ctx.fillStyle = '#FF6B6B';
        ctx.fill();
        
        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`(${x}, ${y.toFixed(1)})`, canvasX + 8, canvasY - 8);
      }
    });
    
    ctx.textAlign = 'left';
  }
  
  setGraphPreset(preset) {
    const baseInput = document.getElementById('graph-base');
    if (baseInput) {
      baseInput.value = preset;
      this.plotGraph();
    }
  }
  
  // Calculator functionality
  switchCalculatorMode(mode) {
    this.currentCalculatorMode = mode;
    
    // Update mode buttons
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.classList.remove('active', 'btn--primary');
      btn.classList.add('btn--outline');
      
      if (btn.getAttribute('data-mode') === mode) {
        btn.classList.remove('btn--outline');
        btn.classList.add('active', 'btn--primary');
      }
    });
    
    // Show/hide panels
    document.querySelectorAll('.calculator-panel').forEach(panel => {
      panel.classList.add('hidden');
    });
    
    const targetPanel = document.getElementById(`${mode}-calculator`);
    if (targetPanel) {
      targetPanel.classList.remove('hidden');
    }
  }
  
  calculateLogarithm() {
    const baseInput = document.getElementById('calc-base');
    const numerusInput = document.getElementById('calc-numerus');
    const resultEl = document.getElementById('calc-result');
    
    if (!baseInput || !numerusInput || !resultEl) return;
    
    const base = parseFloat(baseInput.value);
    const numerus = parseFloat(numerusInput.value);
    
    if (base <= 0 || base === 1) {
      resultEl.innerHTML = '<p style="color: var(--color-error);">Error: Basis harus > 0 dan ≠ 1</p>';
      return;
    }
    
    if (numerus <= 0) {
      resultEl.innerHTML = '<p style="color: var(--color-error);">Error: Numerus harus > 0</p>';
      return;
    }
    
    try {
      const result = Math.log(numerus) / Math.log(base);
      const verification = Math.pow(base, result);
      const calculation = `log₍${base}₎(${numerus}) = ${result.toFixed(6)}`;
      
      resultEl.innerHTML = `
        <div style="color: var(--color-success);">
          <h4>✅ Hasil Perhitungan</h4>
          <p><strong>Operasi:</strong> log₍${base}₎(${numerus})</p>
          <p><strong>Hasil:</strong> ${result.toFixed(6)}</p>
          <p><strong>Verifikasi:</strong> ${base}^${result.toFixed(6)} ≈ ${verification.toFixed(6)}</p>
          <p><strong>Desimal:</strong> ${result}</p>
        </div>
      `;
      
      // Add to history
      this.addToCalculatorHistory(calculation);
      
    } catch (error) {
      resultEl.innerHTML = `
        <div style="color: var(--color-error);">
          <h4>❌ Error</h4>
          <p>Terjadi kesalahan dalam perhitungan</p>
        </div>
      `;
    }
  }
  
  performQuickCalculation(quickType) {
    const calculations = {
      'log10-100': { base: 10, numerus: 100, result: 2 },
      'log2-8': { base: 2, numerus: 8, result: 3 },
      'ln-e': { base: Math.E, numerus: Math.E, result: 1 },
      'log3-27': { base: 3, numerus: 27, result: 3 }
    };
    
    const calc = calculations[quickType];
    if (!calc) return;
    
    const baseInput = document.getElementById('calc-base');
    const numerusInput = document.getElementById('calc-numerus');
    
    if (baseInput) baseInput.value = calc.base === Math.E ? '2.718' : calc.base;
    if (numerusInput) numerusInput.value = calc.numerus;
    
    this.calculateLogarithm();
  }
  
  addToCalculatorHistory(calculation) {
    this.calculatorHistory.unshift(calculation);
    
    // Limit history to 10 items
    if (this.calculatorHistory.length > 10) {
      this.calculatorHistory = this.calculatorHistory.slice(0, 10);
    }
    
    this.updateCalculatorHistory();
  }
  
  updateCalculatorHistory() {
    const historyEl = document.getElementById('calc-history-list');
    if (!historyEl) return;
    
    if (this.calculatorHistory.length === 0) {
      historyEl.innerHTML = '<p class="history-empty">Belum ada perhitungan</p>';
      return;
    }
    
    const historyHtml = this.calculatorHistory
      .map(calc => `<div class="history-item">${calc}</div>`)
      .join('');
    
    historyEl.innerHTML = historyHtml;
  }
  
  clearCalculatorHistory() {
    this.calculatorHistory = [];
    this.updateCalculatorHistory();
  }
  
  // Application calculators
  calculatePH() {
    const concentrationInput = document.getElementById('ph-concentration');
    const resultEl = document.getElementById('ph-result');
    
    if (!concentrationInput || !resultEl) return;
    
    const concentration = parseFloat(concentrationInput.value) || 0.01;
    
    if (concentration <= 0) {
      resultEl.innerHTML = 'Error: Konsentrasi harus > 0';
      return;
    }
    
    const pH = -Math.log10(concentration);
    let category = '';
    
    if (pH < 7) category = 'asam';
    else if (pH === 7) category = 'netral';
    else category = 'basa';
    
    resultEl.innerHTML = `
      <div>
        <h4>🧪 Hasil Perhitungan pH</h4>
        <p><strong>Konsentrasi H⁺:</strong> ${concentration} M</p>
        <p><strong>Rumus:</strong> pH = -log₁₀[H⁺]</p>
        <p><strong>Perhitungan:</strong> pH = -log₁₀(${concentration}) = ${pH.toFixed(2)}</p>
        <p><strong>Kategori:</strong> ${category} ${pH < 3 ? '(sangat asam)' : pH > 11 ? '(sangat basa)' : ''}</p>
      </div>
    `;
  }
  
  calculateRichter() {
    const amplitudeInput = document.getElementById('richter-amplitude');
    const referenceInput = document.getElementById('richter-reference');
    const resultEl = document.getElementById('richter-result');
    
    if (!amplitudeInput || !referenceInput || !resultEl) return;
    
    const amplitude = parseFloat(amplitudeInput.value) || 1000;
    const reference = parseFloat(referenceInput.value) || 1;
    
    const magnitude = Math.log10(amplitude / reference);
    
    let intensity = '';
    if (magnitude < 3) intensity = 'lemah';
    else if (magnitude < 5) intensity = 'sedang';
    else if (magnitude < 7) intensity = 'kuat';
    else intensity = 'sangat kuat';
    
    resultEl.innerHTML = `
      <div>
        <h4>🌍 Hasil Perhitungan Magnitudo</h4>
        <p><strong>Amplitudo:</strong> ${amplitude}</p>
        <p><strong>Referensi:</strong> ${reference}</p>
        <p><strong>Rumus:</strong> M = log₁₀(A/A₀)</p>
        <p><strong>Perhitungan:</strong> M = log₁₀(${amplitude}/${reference}) = ${magnitude.toFixed(1)}</p>
        <p><strong>Kategori:</strong> ${intensity}</p>
      </div>
    `;
  }
  
  calculateDecibel() {
    const intensityInput = document.getElementById('decibel-intensity');
    const resultEl = document.getElementById('decibel-result');
    
    if (!intensityInput || !resultEl) return;
    
    const intensity = parseFloat(intensityInput.value) || 0.001;
    const referenceIntensity = 1e-12; // 10^-12 W/m²
    
    const decibel = 10 * Math.log10(intensity / referenceIntensity);
    
    let level = '';
    if (decibel < 30) level = 'sangat tenang';
    else if (decibel < 60) level = 'tenang';
    else if (decibel < 90) level = 'normal';
    else if (decibel < 120) level = 'keras';
    else level = 'sangat keras (berbahaya)';
    
    resultEl.innerHTML = `
      <div>
        <h4>🔊 Hasil Perhitungan Desibel</h4>
        <p><strong>Intensitas:</strong> ${intensity} W/m²</p>
        <p><strong>Referensi:</strong> ${referenceIntensity} W/m²</p>
        <p><strong>Rumus:</strong> dB = 10 × log₁₀(I/I₀)</p>
        <p><strong>Perhitungan:</strong> dB = 10 × log₁₀(${intensity}/${referenceIntensity}) = ${decibel.toFixed(1)} dB</p>
        <p><strong>Kategori:</strong> ${level}</p>
      </div>
    `;
  }
  
  calculateCompoundInterest() {
    const principalInput = document.getElementById('compound-principal');
    const amountInput = document.getElementById('compound-amount');
    const rateInput = document.getElementById('compound-rate');
    const resultEl = document.getElementById('compound-result');
    
    if (!principalInput || !amountInput || !rateInput || !resultEl) return;
    
    const principal = parseFloat(principalInput.value) || 10000000;
    const amount = parseFloat(amountInput.value) || 20000000;
    const rate = parseFloat(rateInput.value) || 0.08;
    
    if (amount <= principal) {
      resultEl.innerHTML = 'Error: Target akhir harus lebih besar dari modal awal';
      return;
    }
    
    const time = Math.log(amount / principal) / Math.log(1 + rate);
    
    resultEl.innerHTML = `
      <div>
        <h4>💰 Hasil Perhitungan Bunga Majemuk</h4>
        <p><strong>Modal Awal:</strong> Rp ${principal.toLocaleString()}</p>
        <p><strong>Target Akhir:</strong> Rp ${amount.toLocaleString()}</p>
        <p><strong>Bunga:</strong> ${(rate * 100).toFixed(1)}% per tahun</p>
        <p><strong>Rumus:</strong> t = log(A/P) / log(1+r)</p>
        <p><strong>Perhitungan:</strong> t = log(${amount}/${principal}) / log(${1 + rate}) = ${time.toFixed(2)} tahun</p>
        <p><strong>Waktu yang dibutuhkan:</strong> ${Math.floor(time)} tahun ${Math.floor((time % 1) * 12)} bulan</p>
      </div>
    `;
  }
  
  calculatePopulationGrowth() {
    const initialInput = document.getElementById('population-initial');
    const targetInput = document.getElementById('population-target');
    const rateInput = document.getElementById('population-rate');
    const resultEl = document.getElementById('population-result');
    
    if (!initialInput || !targetInput || !rateInput || !resultEl) return;
    
    const initial = parseFloat(initialInput.value) || 1000;
    const target = parseFloat(targetInput.value) || 10000;
    const rate = parseFloat(rateInput.value) || 0.1;
    
    if (target <= initial) {
      resultEl.innerHTML = 'Error: Populasi target harus lebih besar dari populasi awal';
      return;
    }
    
    const time = Math.log(target / initial) / Math.log(1 + rate);
    
    resultEl.innerHTML = `
      <div>
        <h4>🦠 Hasil Perhitungan Pertumbuhan Populasi</h4>
        <p><strong>Populasi Awal:</strong> ${initial.toLocaleString()}</p>
        <p><strong>Populasi Target:</strong> ${target.toLocaleString()}</p>
        <p><strong>Tingkat Pertumbuhan:</strong> ${(rate * 100).toFixed(1)}% per periode</p>
        <p><strong>Rumus:</strong> t = log(N/N₀) / log(1+r)</p>
        <p><strong>Perhitungan:</strong> t = log(${target}/${initial}) / log(${1 + rate}) = ${time.toFixed(2)} periode</p>
        <p><strong>Faktor Pertumbuhan:</strong> ${(target / initial).toFixed(1)}x lipat</p>
      </div>
    `;
  }
  
  // Practice problems
  updateProblemDisplay() {
    const problem = this.problems[this.currentProblem];
    if (!problem) return;
    
    const problemNumber = document.getElementById('problem-number');
    const totalProblems = document.getElementById('total-problems');
    const totalProblems2 = document.getElementById('total-problems-2');
    const problemText = document.getElementById('problem-text');
    
    if (problemNumber) problemNumber.textContent = this.currentProblem + 1;
    if (totalProblems) totalProblems.textContent = this.problems.length;
    if (totalProblems2) totalProblems2.textContent = this.problems.length;
    if (problemText) problemText.textContent = problem.question;
    
    // Clear previous answer and feedback
    const answerInput = document.getElementById('answer-input');
    const answerFeedback = document.getElementById('answer-feedback');
    
    if (answerInput) answerInput.value = '';
    if (answerFeedback) {
      answerFeedback.innerHTML = '';
      answerFeedback.className = 'answer-feedback';
    }
    
    // Update navigation buttons
    const prevBtn = document.getElementById('prev-problem');
    const nextBtn = document.getElementById('next-problem');
    
    if (prevBtn) prevBtn.disabled = this.currentProblem === 0;
    if (nextBtn) nextBtn.disabled = this.currentProblem === this.problems.length - 1;
    
    // Update progress
    const progress = (this.completedProblems / this.problems.length) * 100;
    const progressFill = document.getElementById('progress-fill');
    const completedProblemsEl = document.getElementById('completed-problems');
    
    if (progressFill) progressFill.style.width = `${progress}%`;
    if (completedProblemsEl) completedProblemsEl.textContent = this.completedProblems;
    
    // Update stats
    const currentScore = document.getElementById('current-score');
    const correctCount = document.getElementById('correct-count');
    const wrongCount = document.getElementById('wrong-count');
    const accuracy = document.getElementById('accuracy');
    
    if (currentScore) currentScore.textContent = this.score;
    if (correctCount) correctCount.textContent = this.correctAnswers;
    if (wrongCount) wrongCount.textContent = this.wrongAnswers;
    
    const totalAnswered = this.correctAnswers + this.wrongAnswers;
    const accuracyPercent = totalAnswered > 0 ? Math.round((this.correctAnswers / totalAnswered) * 100) : 0;
    if (accuracy) accuracy.textContent = `${accuracyPercent}%`;
  }
  
  checkAnswer() {
    const answerInput = document.getElementById('answer-input');
    if (!answerInput) return;
    
    const userAnswer = answerInput.value.trim().toLowerCase();
    const problem = this.problems[this.currentProblem];
    
    if (!userAnswer) {
      this.showFeedback('Masukkan jawaban terlebih dahulu!', 'hint');
      return;
    }
    
    const correctAnswer = problem.answer.toLowerCase();
    let isCorrect = false;
    
    // Check for different answer formats
    if (userAnswer === correctAnswer) {
      isCorrect = true;
    } else {
      // Check various equivalent forms
      const normalizedUser = userAnswer.replace(/\s/g, '');
      const normalizedCorrect = correctAnswer.replace(/\s/g, '');
      
      if (normalizedUser === normalizedCorrect) {
        isCorrect = true;
      }
      
      // Check for mathematical equivalence (e.g., 125 vs 5^3)
      if (this.checkMathematicalEquivalence(userAnswer, correctAnswer)) {
        isCorrect = true;
      }
    }
    
    if (isCorrect) {
      this.correctAnswers++;
      this.score += 10;
      this.showFeedback('🎉 Benar! Jawaban Anda tepat.', 'correct');
      
      // Add animation to score
      const currentScore = document.getElementById('current-score');
      if (currentScore) {
        currentScore.classList.add('animate-log');
        setTimeout(() => {
          currentScore.classList.remove('animate-log');
        }, 1000);
      }
    } else {
      this.wrongAnswers++;
      this.showFeedback(`❌ Kurang tepat. Jawaban yang benar adalah: ${problem.answer}`, 'incorrect');
    }
    
    this.completedProblems = Math.max(this.completedProblems, this.currentProblem + 1);
    this.updateProblemDisplay();
  }
  
  checkMathematicalEquivalence(userAnswer, correctAnswer) {
    // Simple check for mathematical equivalence
    // This could be expanded for more sophisticated checking
    try {
      const userNum = parseFloat(userAnswer);
      const correctNum = parseFloat(correctAnswer);
      
      if (!isNaN(userNum) && !isNaN(correctNum)) {
        return Math.abs(userNum - correctNum) < 0.001;
      }
    } catch (error) {
      // Not numerical answers
    }
    
    return false;
  }
  
  showHint() {
    const problem = this.problems[this.currentProblem];
    this.showFeedback(`💡 Petunjuk: ${problem.hint}`, 'hint');
  }
  
  showSolution() {
    const problem = this.problems[this.currentProblem];
    this.showFeedback(`📝 Pembahasan: ${problem.solution}`, 'hint');
  }
  
  showFeedback(message, type) {
    const feedback = document.getElementById('answer-feedback');
    if (feedback) {
      feedback.innerHTML = message;
      feedback.className = `answer-feedback ${type}`;
    }
  }
  
  previousProblem() {
    if (this.currentProblem > 0) {
      this.currentProblem--;
      this.updateProblemDisplay();
    }
  }
  
  nextProblem() {
    if (this.currentProblem < this.problems.length - 1) {
      this.currentProblem++;
      this.updateProblemDisplay();
    }
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Initializing Logarithm Learning App...');
  window.app = new LogarithmApp();
  console.log('App initialized successfully!');
});

// Handle window resize
window.addEventListener('resize', () => {
  if (window.app && window.app.setupCanvases) {
    setTimeout(() => window.app.setupCanvases(), 100);
  }
});