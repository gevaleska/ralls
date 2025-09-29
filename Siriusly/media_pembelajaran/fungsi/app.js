// Function Mathematics Learning Application
class FunctionApp {
  constructor() {
    this.currentSection = 'beranda';
    this.currentFunctionType = 'linear';
    this.chart = null;
    this.transformationChart = null;
    
    // Function types data from the JSON
    this.functionTypes = {
      linear: {
        name: "Fungsi Linear",
        formula: "f(x) = mx + b",
        description: "Fungsi polinomial berderajat satu yang grafiknya berupa garis lurus",
        characteristics: ["Grafik berupa garis lurus", "m = gradien/kemiringan", "b = titik potong sumbu y"],
        example: "f(x) = 2x + 3",
        domain: "ℝ",
        range: "ℝ"
      },
      quadratic: {
        name: "Fungsi Kuadrat", 
        formula: "f(x) = ax² + bx + c",
        description: "Fungsi polinomial berderajat dua yang grafiknya berupa parabola",
        characteristics: ["Grafik berupa parabola", "Memiliki titik ekstrem (maksimum/minimum)", "Simetris terhadap sumbu vertikal"],
        example: "f(x) = x² - 4x + 3",
        domain: "ℝ",
        range: "[k, ∞) atau (-∞, k] tergantung arah parabola"
      },
      polynomial: {
        name: "Fungsi Polinomial",
        formula: "f(x) = aₙxⁿ + aₙ₋₁xⁿ⁻¹ + ... + a₁x + a₀",
        description: "Fungsi yang terdiri dari suku-suku dengan pangkat bulat non-negatif",
        characteristics: ["Kontinu di seluruh domainnya", "Dapat memiliki beberapa titik ekstrem", "Derajat menentukan perilaku ujung"],
        example: "f(x) = 2x³ - 5x² + 3x - 1",
        domain: "ℝ",
        range: "ℝ (untuk polinomial derajat ganjil)"
      },
      rational: {
        name: "Fungsi Rasional",
        formula: "f(x) = P(x)/Q(x)",
        description: "Fungsi yang merupakan perbandingan dua polinomial",
        characteristics: ["Dapat memiliki asimtot vertikal dan horizontal", "Domain terbatas oleh pembuat nol penyebut", "Dapat diskontinu"],
        example: "f(x) = (x² + 1)/(x - 2)",
        domain: "ℝ \\ {nilai yang membuat penyebut = 0}",
        range: "Tergantung pada fungsi spesifik"
      },
      exponential: {
        name: "Fungsi Eksponensial",
        formula: "f(x) = aˣ",
        description: "Fungsi dengan variabel sebagai pangkat dari suatu basis tetap",
        characteristics: ["Selalu positif", "Pertumbuhan/peluruhan eksponensial", "Asimtot horizontal y = 0"],
        example: "f(x) = 2ˣ",
        domain: "ℝ",
        range: "(0, ∞)"
      },
      logarithmic: {
        name: "Fungsi Logaritma",
        formula: "f(x) = logₐ(x)",
        description: "Fungsi invers dari fungsi eksponensial",
        characteristics: ["Hanya terdefinisi untuk x > 0", "Asimtot vertikal x = 0", "Melewati titik (1, 0)"],
        example: "f(x) = log₂(x)",
        domain: "(0, ∞)",
        range: "ℝ"
      },
      trigonometric: {
        name: "Fungsi Trigonometri",
        formula: "f(x) = sin(x), cos(x), tan(x), ...",
        description: "Fungsi yang berkaitan dengan ukuran sudut dan sisi segitiga",
        characteristics: ["Bersifat periodik", "Nilai terbatas (kecuali tan, cot)", "Simetri tertentu"],
        example: "f(x) = sin(x)",
        domain: "ℝ (untuk sin, cos)",
        range: "[-1, 1] (untuk sin, cos)"
      },
      absolute: {
        name: "Fungsi Nilai Mutlak",
        formula: "f(x) = |x|",
        description: "Fungsi yang menghasilkan nilai non-negatif dari inputnya",
        characteristics: ["Selalu non-negatif", "Grafik berbentuk V", "Simetris terhadap sumbu y"],
        example: "f(x) = |x - 3|",
        domain: "ℝ",
        range: "[0, ∞)"
      }
    };
    
    // Practice problems
    this.problems = [
      {
        id: 1,
        question: "Tentukan domain dan range dari f(x) = √(x - 2)",
        answer: "Domain: [2, ∞), Range: [0, ∞)",
        hint: "Untuk fungsi akar, nilai di dalam akar harus non-negatif",
        solution: "Domain: x - 2 ≥ 0, sehingga x ≥ 2. Range: √(x-2) ≥ 0 untuk semua x dalam domain"
      },
      {
        id: 2,
        question: "Jika f(x) = 2x² - 3x + 1, hitunglah f(3)",
        answer: "10",
        hint: "Substitusi x = 3 ke dalam fungsi",
        solution: "f(3) = 2(3)² - 3(3) + 1 = 2(9) - 9 + 1 = 18 - 9 + 1 = 10"
      },
      {
        id: 3,
        question: "Jika f(x) = x + 2 dan g(x) = x², tentukan (f ∘ g)(x)",
        answer: "x² + 2",
        hint: "Komposisi berarti menerapkan f pada hasil dari g(x)",
        solution: "(f ∘ g)(x) = f(g(x)) = f(x²) = x² + 2"
      },
      {
        id: 4,
        question: "Tentukan invers dari f(x) = 3x - 5",
        answer: "f⁻¹(x) = (x + 5)/3",
        hint: "Tukar x dan y, lalu selesaikan untuk y",
        solution: "y = 3x - 5 → x = 3y - 5 → 3y = x + 5 → y = (x + 5)/3"
      },
      {
        id: 5,
        question: "Bagaimana grafik y = x² berubah menjadi y = 2(x - 3)² + 1?",
        answer: "Geser 3 satuan kanan, regangkan vertikal 2 kali, geser 1 satuan atas",
        hint: "Identifikasi transformasi: h (horizontal), k (vertikal), a (peregangan)",
        solution: "y = 2(x - 3)² + 1: geser kanan 3, regangkan vertikal faktor 2, geser atas 1"
      },
      {
        id: 6,
        question: "Apakah f(x) = x³ - x adalah fungsi ganjil, genap, atau keduanya?",
        answer: "Fungsi ganjil",
        hint: "Uji f(-x) dan bandingkan dengan f(x) dan -f(x)",
        solution: "f(-x) = (-x)³ - (-x) = -x³ + x = -(x³ - x) = -f(x), jadi fungsi ganjil"
      },
      {
        id: 7,
        question: "Tentukan asimtot vertikal dari f(x) = (x + 1)/(x² - 4)",
        answer: "x = 2 dan x = -2",
        hint: "Asimtot vertikal terjadi ketika penyebut = 0 dan pembilang ≠ 0",
        solution: "x² - 4 = 0 → (x-2)(x+2) = 0 → x = 2 atau x = -2"
      },
      {
        id: 8,
        question: "Bola dilempar dengan h(t) = -5t² + 20t + 2. Kapan bola mencapai ketinggian maksimum?",
        answer: "t = 2 detik",
        hint: "Untuk f(x) = ax² + bx + c, titik ekstrem di x = -b/(2a)",
        solution: "Fungsi kuadrat mencapai ekstrem di t = -b/(2a) = -20/(2×(-5)) = 2"
      }
    ];
    
    this.currentProblem = 0;
    this.score = 0;
    this.correctAnswers = 0;
    this.wrongAnswers = 0;
    this.completedProblems = 0;
    
    // Transformation parameters
    this.transformParams = {
      h: 0, k: 0, a: 1, b: 1,
      reflectX: false, reflectY: false
    };
    
    this.init();
  }
  
  init() {
    console.log('Initializing Function App...');
    this.setupEventListeners();
    this.showSection('beranda');
    
    // Initialize canvases and charts after DOM is ready
    setTimeout(() => {
      this.setupCanvases();
      this.updateProblemDisplay();
      this.updateFunctionTypeDisplay();
    }, 100);
  }
  
  setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Navigation
    document.querySelectorAll('.nav__btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const section = btn.getAttribute('data-section');
        if (section) this.showSection(section);
      });
    });
    
    // Feature cards navigation
    document.querySelectorAll('.feature-card').forEach(card => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const section = card.getAttribute('data-section');
        if (section) this.showSection(section);
      });
    });
    
    // Feature card buttons
    document.querySelectorAll('.feature-card .btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const card = btn.closest('.feature-card');
        const section = card.getAttribute('data-section');
        if (section) this.showSection(section);
      });
    });
    
    this.setupControlEventListeners();
  }
  
  setupControlEventListeners() {
    // Function type buttons
    document.querySelectorAll('.type-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.getAttribute('data-type');
        this.showFunctionType(type);
      });
    });
    
    // Domain analysis
    const analyzeDomainBtn = document.getElementById('analyze-domain');
    if (analyzeDomainBtn) {
      analyzeDomainBtn.addEventListener('click', () => this.analyzeDomainRange());
    }
    
    // Graph plotting
    const plotFunctionBtn = document.getElementById('plot-function');
    if (plotFunctionBtn) {
      plotFunctionBtn.addEventListener('click', () => this.plotFunction());
    }
    
    // Preset functions
    document.querySelectorAll('[data-function]').forEach(btn => {
      btn.addEventListener('click', () => {
        const func = btn.getAttribute('data-function');
        this.setPresetFunction(func);
      });
    });
    
    // Transformation controls
    this.setupTransformationControls();
    
    // Composition calculator
    const calcCompositionBtn = document.getElementById('calculate-composition');
    if (calcCompositionBtn) {
      calcCompositionBtn.addEventListener('click', () => this.calculateComposition());
    }
    
    // Inverse calculator
    const calcInverseBtn = document.getElementById('calculate-inverse');
    if (calcInverseBtn) {
      calcInverseBtn.addEventListener('click', () => this.calculateInverse());
    }
    
    // Application calculators
    this.setupApplicationCalculators();
    
    // Practice problems
    this.setupPracticeControls();
  }
  
  setupTransformationControls() {
    // Sliders
    const sliders = ['h-slider', 'k-slider', 'a-slider', 'b-slider'];
    sliders.forEach(sliderId => {
      const slider = document.getElementById(sliderId);
      if (slider) {
        slider.addEventListener('input', (e) => {
          const param = sliderId.split('-')[0];
          this.transformParams[param] = parseFloat(e.target.value);
          this.updateTransformationDisplay();
        });
      }
    });
    
    // Checkboxes
    const reflectX = document.getElementById('reflect-x');
    const reflectY = document.getElementById('reflect-y');
    
    if (reflectX) {
      reflectX.addEventListener('change', (e) => {
        this.transformParams.reflectX = e.target.checked;
        this.updateTransformationDisplay();
      });
    }
    
    if (reflectY) {
      reflectY.addEventListener('change', (e) => {
        this.transformParams.reflectY = e.target.checked;
        this.updateTransformationDisplay();
      });
    }
    
    // Reset button
    const resetBtn = document.getElementById('reset-transformation');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => this.resetTransformation());
    }
  }
  
  setupApplicationCalculators() {
    const calculators = [
      { id: 'calc-physics', method: 'calculatePhysics' },
      { id: 'calc-economics', method: 'calculateEconomics' },
      { id: 'calc-biology', method: 'calculateBiology' },
      { id: 'calc-finance', method: 'calculateFinance' }
    ];
    
    calculators.forEach(calc => {
      const btn = document.getElementById(calc.id);
      if (btn) {
        btn.addEventListener('click', () => this[calc.method]());
      }
    });
  }
  
  setupPracticeControls() {
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
    
    // Enter key for answer input
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
    this.updateFunctionTypeDisplay();
    this.plotFunction();
    this.updateTransformationDisplay();
  }
  
  // Section navigation
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
    
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
      section.classList.remove('active');
      section.style.display = 'none';
    });
    
    // Show target section
    const targetSection = document.getElementById(`${sectionName}-section`);
    if (targetSection) {
      targetSection.classList.add('active');
      targetSection.style.display = 'block';
    }
    
    this.currentSection = sectionName;
    
    // Initialize section-specific features
    setTimeout(() => {
      this.initializeSectionFeatures(sectionName);
    }, 50);
  }
  
  initializeSectionFeatures(sectionName) {
    switch (sectionName) {
      case 'beranda':
        this.drawHeroVisualization();
        break;
      case 'teori':
        this.drawTheoryVisualization();
        break;
      case 'jenis':
        this.updateFunctionTypeDisplay();
        break;
      case 'grafik':
        this.plotFunction();
        break;
      case 'transformasi':
        this.updateTransformationDisplay();
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
    
    // Draw multiple function types
    const padding = 60;
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
    
    // Draw grid
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    for (let i = 1; i < 10; i++) {
      const x = padding + (i / 10) * graphWidth;
      const y = padding + (i / 10) * graphHeight;
      
      // Vertical lines
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
      ctx.stroke();
      
      // Horizontal lines
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }
    
    // Draw linear function y = x
    this.drawFunction(ctx, (x) => x, padding, graphWidth, graphHeight, '#1FB8CD', 3);
    
    // Draw quadratic function y = 0.3x²
    this.drawFunction(ctx, (x) => 0.3 * x * x, padding, graphWidth, graphHeight, '#FFC185', 3);
    
    // Draw sine function y = 2sin(x)
    this.drawFunction(ctx, (x) => 2 * Math.sin(x), padding, graphWidth, graphHeight, '#B4413C', 3);
    
    // Add labels
    ctx.fillStyle = '#1FB8CD';
    ctx.font = 'bold 14px Arial';
    ctx.fillText('y = x', width - 80, height - 80);
    
    ctx.fillStyle = '#FFC185';
    ctx.fillText('y = x²', 80, 80);
    
    ctx.fillStyle = '#B4413C';
    ctx.fillText('y = sin(x)', width - 100, 100);
    
    // Title
    ctx.fillStyle = '#21808D';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Berbagai Jenis Fungsi Matematika', width/2, 30);
    ctx.textAlign = 'left';
  }
  
  drawFunction(ctx, func, padding, graphWidth, graphHeight, color, lineWidth) {
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    
    let firstPoint = true;
    const xMin = -5, xMax = 5;
    const yMin = -3, yMax = 3;
    
    for (let i = 0; i <= 200; i++) {
      const x = xMin + (i / 200) * (xMax - xMin);
      const y = func(x);
      
      if (y >= yMin && y <= yMax) {
        const canvasX = padding + ((x - xMin) / (xMax - xMin)) * graphWidth;
        const canvasY = padding + graphHeight - ((y - yMin) / (yMax - yMin)) * graphHeight;
        
        if (firstPoint) {
          ctx.moveTo(canvasX, canvasY);
          firstPoint = false;
        } else {
          ctx.lineTo(canvasX, canvasY);
        }
      }
    }
    ctx.stroke();
  }
  
  drawTheoryVisualization() {
    const canvas = document.getElementById('theory-visualization');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    // Draw mapping diagram for f(x) = x² with domain {-2, -1, 0, 1, 2}
    const centerX = width / 2;
    const domainX = centerX - 120;
    const rangeX = centerX + 120;
    
    // Domain set
    ctx.fillStyle = '#4ECDC4';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Domain', domainX, 50);
    
    const domainValues = [-2, -1, 0, 1, 2];
    const rangeValues = [4, 1, 0, 1, 4];
    
    domainValues.forEach((val, i) => {
      const y = 100 + i * 40;
      
      // Domain element
      ctx.beginPath();
      ctx.arc(domainX, y, 15, 0, 2 * Math.PI);
      ctx.fillStyle = '#1FB8CD';
      ctx.fill();
      
      ctx.fillStyle = 'white';
      ctx.font = 'bold 12px Arial';
      ctx.fillText(val.toString(), domainX, y + 4);
      
      // Arrow
      ctx.strokeStyle = '#21808D';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(domainX + 20, y);
      ctx.lineTo(rangeX - 20, 100 + rangeValues.indexOf(rangeValues[i]) * 40);
      ctx.stroke();
      
      // Arrow head
      const targetY = 100 + rangeValues.indexOf(rangeValues[i]) * 40;
      ctx.beginPath();
      ctx.moveTo(rangeX - 20, targetY);
      ctx.lineTo(rangeX - 25, targetY - 3);
      ctx.lineTo(rangeX - 25, targetY + 3);
      ctx.closePath();
      ctx.fillStyle = '#21808D';
      ctx.fill();
    });
    
    // Range set
    ctx.fillStyle = '#4ECDC4';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Range', rangeX, 50);
    
    const uniqueRange = [...new Set(rangeValues)].sort((a, b) => a - b);
    uniqueRange.forEach((val, i) => {
      const y = 100 + i * 40;
      
      // Range element
      ctx.beginPath();
      ctx.arc(rangeX, y, 15, 0, 2 * Math.PI);
      ctx.fillStyle = '#FFC185';
      ctx.fill();
      
      ctx.fillStyle = 'black';
      ctx.font = 'bold 12px Arial';
      ctx.fillText(val.toString(), rangeX, y + 4);
    });
    
    // Function notation
    ctx.fillStyle = '#21808D';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('f(x) = x²', centerX, height - 30);
    ctx.textAlign = 'left';
  }
  
  // Function types management
  showFunctionType(type) {
    this.currentFunctionType = type;
    this.updateFunctionTypeDisplay();
  }
  
  updateFunctionTypeDisplay() {
    const typeData = this.functionTypes[this.currentFunctionType];
    if (!typeData) return;
    
    // Update type buttons
    document.querySelectorAll('.type-btn').forEach(btn => {
      btn.classList.remove('active', 'btn--primary');
      btn.classList.add('btn--outline');
      
      if (btn.getAttribute('data-type') === this.currentFunctionType) {
        btn.classList.remove('btn--outline');
        btn.classList.add('active', 'btn--primary');
      }
    });
    
    // Update display
    const titleEl = document.getElementById('type-title');
    const formulaEl = document.getElementById('type-formula');
    const descriptionEl = document.getElementById('type-description');
    const characteristicsEl = document.getElementById('type-characteristics-list');
    const exampleEl = document.getElementById('type-example-text');
    const domainEl = document.getElementById('type-domain');
    const rangeEl = document.getElementById('type-range');
    
    if (titleEl) titleEl.textContent = typeData.name;
    if (formulaEl) formulaEl.textContent = typeData.formula;
    if (descriptionEl) descriptionEl.textContent = typeData.description;
    if (exampleEl) exampleEl.textContent = typeData.example;
    if (domainEl) domainEl.textContent = typeData.domain;
    if (rangeEl) rangeEl.textContent = typeData.range;
    
    if (characteristicsEl) {
      characteristicsEl.innerHTML = typeData.characteristics
        .map(char => `<li>${char}</li>`)
        .join('');
    }
    
    // Draw type graph
    this.drawTypeGraph();
  }
  
  drawTypeGraph() {
    const canvas = document.getElementById('type-graph-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const padding = 40;
    const graphWidth = canvas.width - 2 * padding;
    const graphHeight = canvas.height - 2 * padding;
    
    // Draw axes
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.moveTo(padding, canvas.height - padding);
    ctx.lineTo(padding, padding);
    ctx.stroke();
    
    // Draw function based on type
    let func;
    switch (this.currentFunctionType) {
      case 'linear':
        func = (x) => 0.5 * x + 1;
        break;
      case 'quadratic':
        func = (x) => 0.2 * x * x - 1;
        break;
      case 'polynomial':
        func = (x) => 0.05 * x * x * x - 0.3 * x;
        break;
      case 'rational':
        func = (x) => x !== 1 ? 1 / (x - 1) : undefined;
        break;
      case 'exponential':
        func = (x) => Math.pow(1.5, x);
        break;
      case 'logarithmic':
        func = (x) => x > 0 ? Math.log(x) : undefined;
        break;
      case 'trigonometric':
        func = (x) => Math.sin(x);
        break;
      case 'absolute':
        func = (x) => Math.abs(x - 1);
        break;
      default:
        func = (x) => x;
    }
    
    this.drawFunction(ctx, func, padding, graphWidth, graphHeight, '#1FB8CD', 3);
  }
  
  // Domain and range analysis
  analyzeDomainRange() {
    const functionInput = document.getElementById('domain-function');
    const resultEl = document.getElementById('domain-analysis');
    
    if (!functionInput || !resultEl) return;
    
    const funcStr = functionInput.value.trim();
    if (!funcStr) {
      resultEl.innerHTML = '<p style="color: var(--color-error);">Masukkan fungsi terlebih dahulu</p>';
      return;
    }
    
    try {
      const analysis = this.analyzeFunctionDomain(funcStr);
      resultEl.innerHTML = `
        <div style="color: var(--color-success);">
          <h4>📊 Analisis Domain dan Range</h4>
          <p><strong>Fungsi:</strong> f(x) = ${funcStr}</p>
          <p><strong>Domain:</strong> ${analysis.domain}</p>
          <p><strong>Range:</strong> ${analysis.range}</p>
          <p><strong>Penjelasan:</strong> ${analysis.explanation}</p>
        </div>
      `;
    } catch (error) {
      resultEl.innerHTML = `
        <div style="color: var(--color-error);">
          <h4>❌ Error</h4>
          <p>Tidak dapat menganalisis fungsi ini. Pastikan sintaks benar.</p>
          <p><strong>Contoh format:</strong> sqrt(x-2), 1/(x-3), x^2</p>
        </div>
      `;
    }
  }
  
  analyzeFunctionDomain(funcStr) {
    // Simple domain analysis based on common patterns
    let domain = "ℝ (semua bilangan real)";
    let range = "ℝ (semua bilangan real)";
    let explanation = "Fungsi terdefinisi untuk semua bilangan real";
    
    if (funcStr.includes('sqrt')) {
      const match = funcStr.match(/sqrt\((.*?)\)/);
      if (match) {
        const inside = match[1];
        if (inside.includes('x')) {
          domain = "[nilai minimum yang membuat argumen ≥ 0, ∞)";
          range = "[0, ∞)";
          explanation = "Akar kuadrat hanya terdefinisi untuk nilai non-negatif";
        }
      }
    } else if (funcStr.includes('1/')) {
      domain = "ℝ \\ {nilai yang membuat penyebut = 0}";
      range = "ℝ \\ {0} (kemungkinan)";
      explanation = "Pembagian dengan nol tidak terdefinisi";
    } else if (funcStr.includes('ln') || funcStr.includes('log')) {
      domain = "(0, ∞)";
      range = "ℝ";
      explanation = "Logaritma hanya terdefinisi untuk bilangan positif";
    } else if (funcStr.includes('x^2') || funcStr.includes('x²')) {
      range = "[0, ∞)";
      explanation = "Kuadrat selalu menghasilkan nilai non-negatif";
    }
    
    return { domain, range, explanation };
  }
  
  // Graph plotting with Chart.js
  plotFunction() {
    const canvas = document.getElementById('graph-canvas');
    if (!canvas) return;
    
    const funcInput = document.getElementById('graph-function');
    const xMinInput = document.getElementById('graph-x-min');
    const xMaxInput = document.getElementById('graph-x-max');
    
    const funcStr = funcInput ? funcInput.value : 'x^2';
    const xMin = xMinInput ? parseFloat(xMinInput.value) : -5;
    const xMax = xMaxInput ? parseFloat(xMaxInput.value) : 5;
    
    // Destroy existing chart
    if (this.chart) {
      this.chart.destroy();
    }
    
    // Generate data points
    const data = [];
    const labels = [];
    const step = (xMax - xMin) / 200;
    
    for (let x = xMin; x <= xMax; x += step) {
      try {
        const y = this.evaluateFunction(funcStr, x);
        if (y !== undefined && !isNaN(y) && isFinite(y)) {
          labels.push(x.toFixed(2));
          data.push({ x: x, y: y });
        }
      } catch (error) {
        // Skip invalid points
      }
    }
    
    const ctx = canvas.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [{
          label: `f(x) = ${funcStr}`,
          data: data,
          borderColor: '#1FB8CD',
          backgroundColor: 'rgba(31, 184, 205, 0.1)',
          borderWidth: 3,
          fill: false,
          pointRadius: 0,
          tension: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: `Grafik f(x) = ${funcStr}`,
            font: { size: 16, weight: 'bold' },
            color: '#21808D'
          },
          legend: {
            display: true,
            position: 'top'
          }
        },
        scales: {
          x: {
            type: 'linear',
            position: 'center',
            title: {
              display: true,
              text: 'x',
              font: { size: 14, weight: 'bold' }
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          },
          y: {
            type: 'linear',
            position: 'center',
            title: {
              display: true,
              text: 'f(x)',
              font: { size: 14, weight: 'bold' }
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          }
        },
        interaction: {
          intersect: false
        }
      }
    });
  }
  
  evaluateFunction(funcStr, x) {
    // Simple function evaluator - replace with more sophisticated parser if needed
    let expression = funcStr
      .replace(/x/g, `(${x})`)
      .replace(/\^/g, '**')
      .replace(/sin/g, 'Math.sin')
      .replace(/cos/g, 'Math.cos')
      .replace(/tan/g, 'Math.tan')
      .replace(/sqrt/g, 'Math.sqrt')
      .replace(/ln/g, 'Math.log')
      .replace(/log/g, 'Math.log10')
      .replace(/abs/g, 'Math.abs')
      .replace(/pi/g, 'Math.PI')
      .replace(/e/g, 'Math.E');
    
    // Safety check - only allow safe mathematical expressions
    if (/[^0-9+\-*/.()Math\s]/.test(expression.replace(/Math\.\w+/g, ''))) {
      throw new Error('Invalid expression');
    }
    
    return Function(`"use strict"; return (${expression})`)();
  }
  
  setPresetFunction(func) {
    const functionInput = document.getElementById('graph-function');
    if (functionInput) {
      functionInput.value = func;
      this.plotFunction();
    }
  }
  
  // Transformation functionality
  updateTransformationDisplay() {
    // Update slider value displays
    document.getElementById('h-value').textContent = this.transformParams.h;
    document.getElementById('k-value').textContent = this.transformParams.k;
    document.getElementById('a-value').textContent = this.transformParams.a;
    document.getElementById('b-value').textContent = this.transformParams.b;
    
    // Update function display
    this.updateTransformedFunction();
    this.plotTransformation();
  }
  
  updateTransformedFunction() {
    const { h, k, a, b, reflectX, reflectY } = this.transformParams;
    
    let func = `f(x) = x²`; // base function
    let transformed = '';
    
    // Build transformation
    let parts = [];
    if (reflectX) parts.push('-');
    if (a !== 1) parts.push(`${a}`);
    
    let innerFunc = 'x';
    if (reflectY) innerFunc = `(-x)`;
    if (b !== 1) innerFunc = `${b}x`;
    if (h !== 0) {
      innerFunc = h > 0 ? `(x - ${h})` : `(x + ${Math.abs(h)})`;
      if (b !== 1) innerFunc = `${b}${innerFunc}`;
    }
    
    transformed = `g(x) = ${parts.join('')}(${innerFunc})²`;
    if (k !== 0) {
      transformed += k > 0 ? ` + ${k}` : ` - ${Math.abs(k)}`;
    }
    
    document.getElementById('base-function').textContent = func;
    document.getElementById('transformed-function').textContent = transformed;
  }
  
  plotTransformation() {
    const canvas = document.getElementById('transformation-canvas');
    if (!canvas) return;
    
    // Destroy existing chart
    if (this.transformationChart) {
      this.transformationChart.destroy();
    }
    
    const { h, k, a, b, reflectX, reflectY } = this.transformParams;
    
    // Generate data for base and transformed functions
    const baseData = [];
    const transformedData = [];
    
    for (let x = -5; x <= 5; x += 0.1) {
      // Base function: f(x) = x²
      const baseY = x * x;
      baseData.push({ x: x, y: baseY });
      
      // Transformed function
      let transformedX = x;
      if (reflectY) transformedX = -transformedX;
      transformedX = b * transformedX;
      
      let transformedY = (transformedX - h * b) * (transformedX - h * b) / (b * b);
      transformedY = a * transformedY;
      if (reflectX) transformedY = -transformedY;
      transformedY = transformedY + k;
      
      if (!isNaN(transformedY) && isFinite(transformedY)) {
        transformedData.push({ x: x, y: transformedY });
      }
    }
    
    const ctx = canvas.getContext('2d');
    this.transformationChart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [{
          label: 'f(x) = x² (asli)',
          data: baseData,
          borderColor: '#B4413C',
          backgroundColor: 'rgba(180, 65, 60, 0.1)',
          borderWidth: 2,
          fill: false,
          pointRadius: 0,
          tension: 0
        }, {
          label: 'g(x) (transformasi)',
          data: transformedData,
          borderColor: '#1FB8CD',
          backgroundColor: 'rgba(31, 184, 205, 0.1)',
          borderWidth: 3,
          fill: false,
          pointRadius: 0,
          tension: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Transformasi Fungsi',
            font: { size: 16, weight: 'bold' },
            color: '#21808D'
          },
          legend: {
            display: true,
            position: 'top'
          }
        },
        scales: {
          x: {
            type: 'linear',
            position: 'center',
            min: -6,
            max: 6,
            title: {
              display: true,
              text: 'x',
              font: { size: 14, weight: 'bold' }
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          },
          y: {
            type: 'linear',
            position: 'center',
            min: -10,
            max: 10,
            title: {
              display: true,
              text: 'y',
              font: { size: 14, weight: 'bold' }
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          }
        }
      }
    });
  }
  
  resetTransformation() {
    this.transformParams = { h: 0, k: 0, a: 1, b: 1, reflectX: false, reflectY: false };
    
    // Reset UI elements
    document.getElementById('h-slider').value = 0;
    document.getElementById('k-slider').value = 0;
    document.getElementById('a-slider').value = 1;
    document.getElementById('b-slider').value = 1;
    document.getElementById('reflect-x').checked = false;
    document.getElementById('reflect-y').checked = false;
    
    this.updateTransformationDisplay();
  }
  
  // Composition and inverse
  calculateComposition() {
    const fInput = document.getElementById('func-f');
    const gInput = document.getElementById('func-g');
    const xInput = document.getElementById('composition-x');
    const resultEl = document.getElementById('composition-steps');
    
    if (!fInput || !gInput || !xInput || !resultEl) return;
    
    const f = fInput.value.trim();
    const g = gInput.value.trim();
    const x = parseFloat(xInput.value);
    
    if (!f || !g || isNaN(x)) {
      resultEl.innerHTML = '<p style="color: var(--color-error);">Lengkapi semua input</p>';
      return;
    }
    
    try {
      const gx = this.evaluateFunction(g, x);
      const fgx = this.evaluateFunction(f, gx);
      const gfx = this.evaluateFunction(g, this.evaluateFunction(f, x));
      
      resultEl.innerHTML = `
        <div style="color: var(--color-success);">
          <h4>🔗 Hasil Komposisi Fungsi</h4>
          <p><strong>f(x) = ${f}</strong></p>
          <p><strong>g(x) = ${g}</strong></p>
          <p><strong>x = ${x}</strong></p>
          <hr>
          <h5>(f ∘ g)(${x}) = f(g(${x}))</h5>
          <p>1. g(${x}) = ${gx.toFixed(4)}</p>
          <p>2. f(${gx.toFixed(4)}) = ${fgx.toFixed(4)}</p>
          <p><strong>Jadi (f ∘ g)(${x}) = ${fgx.toFixed(4)}</strong></p>
          <hr>
          <h5>(g ∘ f)(${x}) = g(f(${x}))</h5>
          <p>1. f(${x}) = ${this.evaluateFunction(f, x).toFixed(4)}</p>
          <p>2. g(${this.evaluateFunction(f, x).toFixed(4)}) = ${gfx.toFixed(4)}</p>
          <p><strong>Jadi (g ∘ f)(${x}) = ${gfx.toFixed(4)}</strong></p>
        </div>
      `;
    } catch (error) {
      resultEl.innerHTML = `
        <div style="color: var(--color-error);">
          <h4>❌ Error</h4>
          <p>Tidak dapat menghitung komposisi. Periksa format fungsi.</p>
        </div>
      `;
    }
  }
  
  calculateInverse() {
    const funcInput = document.getElementById('inverse-function');
    const resultEl = document.getElementById('inverse-steps');
    
    if (!funcInput || !resultEl) return;
    
    const func = funcInput.value.trim();
    if (!func) {
      resultEl.innerHTML = '<p style="color: var(--color-error);">Masukkan fungsi terlebih dahulu</p>';
      return;
    }
    
    // Simple inverse calculation for common functions
    const inverse = this.findInverse(func);
    
    resultEl.innerHTML = `
      <div style="color: var(--color-success);">
        <h4>↩️ Langkah-langkah Mencari Invers</h4>
        <p><strong>Fungsi:</strong> f(x) = ${func}</p>
        <p><strong>Langkah-langkah:</strong></p>
        ${inverse.steps}
        <p><strong>Hasil:</strong> f⁻¹(x) = ${inverse.result}</p>
        <p><strong>Verifikasi:</strong> ${inverse.verification}</p>
      </div>
    `;
  }
  
  findInverse(func) {
    // Simple inverse finder for linear functions
    if (func.match(/^\s*(\d*\.?\d*)\s*\*?\s*x\s*([+-]\s*\d+\.?\d*)\s*$/)) {
      const match = func.match(/^(\d*\.?\d*)\s*\*?\s*x\s*([+-]\s*\d+\.?\d*)$/);
      const a = parseFloat(match[1]) || 1;
      const b = parseFloat(match[2].replace(/\s/g, '')) || 0;
      
      return {
        steps: `
          <ol>
            <li>y = ${func}</li>
            <li>Tukar x dan y: x = ${func.replace('x', 'y')}</li>
            <li>Selesaikan untuk y: y = (x - ${b})/${a}</li>
          </ol>
        `,
        result: `(x - ${b})/${a}`,
        verification: `f(f⁻¹(x)) = x dan f⁻¹(f(x)) = x`
      };
    }
    
    return {
      steps: `
        <ol>
          <li>y = ${func}</li>
          <li>Tukar x dan y</li>
          <li>Selesaikan untuk y</li>
        </ol>
      `,
      result: 'Perlu perhitungan manual untuk fungsi ini',
      verification: 'Verifikasi dengan substitusi'
    };
  }
  
  // Application calculators
  calculatePhysics() {
    const s0 = parseFloat(document.getElementById('physics-s0')?.value) || 2;
    const v0 = parseFloat(document.getElementById('physics-v0')?.value) || 20;
    const a = parseFloat(document.getElementById('physics-a')?.value) || -10;
    const t = parseFloat(document.getElementById('physics-t')?.value) || 1;
    
    const position = s0 + v0 * t + 0.5 * a * t * t;
    const velocity = v0 + a * t;
    
    const resultEl = document.getElementById('physics-result');
    if (resultEl) {
      resultEl.innerHTML = `
        <div>
          <h4>⚡ Hasil Perhitungan Fisika</h4>
          <p><strong>Posisi pada t=${t}s:</strong></p>
          <p>s(${t}) = ${s0} + ${v0}(${t}) + ½(${a})(${t})² = ${position.toFixed(2)} meter</p>
          <p><strong>Kecepatan pada t=${t}s:</strong></p>
          <p>v(${t}) = ${v0} + ${a}(${t}) = ${velocity.toFixed(2)} m/s</p>
        </div>
      `;
    }
  }
  
  calculateEconomics() {
    const fixed = parseFloat(document.getElementById('econ-fixed')?.value) || 1000;
    const variable = parseFloat(document.getElementById('econ-variable')?.value) || 50;
    const price = parseFloat(document.getElementById('econ-price')?.value) || 100;
    const quantity = parseFloat(document.getElementById('econ-quantity')?.value) || 50;
    
    const cost = fixed + variable * quantity;
    const revenue = price * quantity;
    const profit = revenue - cost;
    const breakEven = fixed / (price - variable);
    
    const resultEl = document.getElementById('economics-result');
    if (resultEl) {
      resultEl.innerHTML = `
        <div>
          <h4>💰 Hasil Analisis Ekonomi</h4>
          <p><strong>Biaya Total:</strong> C(${quantity}) = ${fixed} + ${variable}(${quantity}) = ${cost} ribu</p>
          <p><strong>Pendapatan:</strong> R(${quantity}) = ${price}(${quantity}) = ${revenue} ribu</p>
          <p><strong>Keuntungan:</strong> P(${quantity}) = ${revenue} - ${cost} = ${profit} ribu</p>
          <p><strong>Break Even Point:</strong> ${breakEven.toFixed(1)} unit</p>
        </div>
      `;
    }
  }
  
  calculateBiology() {
    const p0 = parseFloat(document.getElementById('bio-p0')?.value) || 100;
    const r = parseFloat(document.getElementById('bio-r')?.value) || 0.1;
    const t = parseFloat(document.getElementById('bio-t')?.value) || 5;
    
    const population = p0 * Math.exp(r * t);
    const doubleTime = Math.log(2) / r;
    
    const resultEl = document.getElementById('biology-result');
    if (resultEl) {
      resultEl.innerHTML = `
        <div>
          <h4>🦠 Hasil Perhitungan Biologi</h4>
          <p><strong>Populasi pada t=${t}:</strong></p>
          <p>P(${t}) = ${p0} × e^(${r}×${t}) = ${population.toFixed(0)} organisme</p>
          <p><strong>Waktu penggandaan:</strong> ${doubleTime.toFixed(2)} periode</p>
          <p><strong>Faktor pertumbuhan:</strong> ${(population/p0).toFixed(2)}x lipat</p>
        </div>
      `;
    }
  }
  
  calculateFinance() {
    const p = parseFloat(document.getElementById('finance-p')?.value) || 10;
    const r = parseFloat(document.getElementById('finance-r')?.value) || 0.08;
    const t = parseFloat(document.getElementById('finance-t')?.value) || 10;
    
    const amount = p * Math.pow(1 + r, t);
    const interest = amount - p;
    
    const resultEl = document.getElementById('finance-result');
    if (resultEl) {
      resultEl.innerHTML = `
        <div>
          <h4>💱 Hasil Perhitungan Keuangan</h4>
          <p><strong>Nilai akhir:</strong></p>
          <p>A(${t}) = ${p}(1 + ${r})^${t} = ${amount.toFixed(2)} juta</p>
          <p><strong>Total bunga:</strong> ${interest.toFixed(2)} juta</p>
          <p><strong>Pertumbuhan:</strong> ${((amount/p - 1) * 100).toFixed(1)}%</p>
        </div>
      `;
    }
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
    
    // Update progress and stats
    this.updateStats();
  }
  
  updateStats() {
    const progress = (this.completedProblems / this.problems.length) * 100;
    const progressFill = document.getElementById('progress-fill');
    const completedProblemsEl = document.getElementById('completed-problems');
    
    if (progressFill) progressFill.style.width = `${progress}%`;
    if (completedProblemsEl) completedProblemsEl.textContent = this.completedProblems;
    
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
    const isCorrect = this.checkAnswerEquivalence(userAnswer, correctAnswer);
    
    if (isCorrect) {
      this.correctAnswers++;
      this.score += 10;
      this.showFeedback('🎉 Benar! Jawaban Anda tepat.', 'correct');
    } else {
      this.wrongAnswers++;
      this.showFeedback(`❌ Kurang tepat. Jawaban yang benar adalah: ${problem.answer}`, 'incorrect');
    }
    
    this.completedProblems = Math.max(this.completedProblems, this.currentProblem + 1);
    this.updateStats();
  }
  
  checkAnswerEquivalence(userAnswer, correctAnswer) {
    // Remove spaces and compare
    const normalizedUser = userAnswer.replace(/\s/g, '');
    const normalizedCorrect = correctAnswer.replace(/\s/g, '');
    
    if (normalizedUser === normalizedCorrect) return true;
    
    // Check for mathematical equivalence
    try {
      const userNum = parseFloat(userAnswer);
      const correctNum = parseFloat(correctAnswer);
      
      if (!isNaN(userNum) && !isNaN(correctNum)) {
        return Math.abs(userNum - correctNum) < 0.001;
      }
    } catch (error) {
      // Not numerical
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
  console.log('Initializing Function Learning App...');
  window.app = new FunctionApp();
  console.log('App initialized successfully!');
});

// Handle window resize
window.addEventListener('resize', () => {
  if (window.app) {
    // Resize charts
    if (window.app.chart) window.app.chart.resize();
    if (window.app.transformationChart) window.app.transformationChart.resize();
    
    // Redraw canvases
    setTimeout(() => {
      if (window.app.setupCanvases) window.app.setupCanvases();
    }, 100);
  }
});