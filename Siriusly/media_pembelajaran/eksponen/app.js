// Exponent Learning Application
class ExponentApp {
  constructor() {
    this.currentSection = 'beranda';
    this.currentLaw = 1;
    this.currentSimulation = 'growth';
    this.currentCalculatorMode = 'basic';
    
    // Exponent laws data
    this.laws = [
      {
        id: 1,
        title: "Sifat Perkalian Pangkat",
        formula: "aᵐ × aⁿ = aᵐ⁺ⁿ",
        description: "Perkalian bilangan berpangkat dengan basis sama, pangkatnya dijumlahkan",
        example: "3² × 3⁴ = 3²⁺⁴ = 3⁶ = 729"
      },
      {
        id: 2,
        title: "Sifat Pembagian Pangkat",
        formula: "aᵐ ÷ aⁿ = aᵐ⁻ⁿ",
        description: "Pembagian bilangan berpangkat dengan basis sama, pangkatnya dikurangkan",
        example: "5⁶ ÷ 5² = 5⁶⁻² = 5⁴ = 625"
      },
      {
        id: 3,
        title: "Sifat Pangkat dari Pangkat",
        formula: "(aᵐ)ⁿ = aᵐˣⁿ",
        description: "Bilangan berpangkat yang dipangkatkan lagi, pangkatnya dikalikan",
        example: "(2³)⁴ = 2³ˣ⁴ = 2¹² = 4096"
      },
      {
        id: 4,
        title: "Sifat Pangkat Perkalian",
        formula: "(a×b)ⁿ = aⁿ × bⁿ",
        description: "Perkalian yang dipangkatkan, masing-masing faktor dipangkatkan",
        example: "(3×4)² = 3² × 4² = 9 × 16 = 144"
      },
      {
        id: 5,
        title: "Sifat Pangkat Pembagian",
        formula: "(a/b)ⁿ = aⁿ / bⁿ",
        description: "Pembagian yang dipangkatkan, pembilang dan penyebut dipangkatkan",
        example: "(6/2)³ = 6³ / 2³ = 216 / 8 = 27"
      },
      {
        id: 6,
        title: "Sifat Pangkat Nol",
        formula: "a⁰ = 1",
        description: "Setiap bilangan (kecuali 0) dipangkatkan 0 hasilnya 1",
        example: "7⁰ = 1, 100⁰ = 1, (-5)⁰ = 1"
      },
      {
        id: 7,
        title: "Sifat Pangkat Negatif",
        formula: "a⁻ⁿ = 1/aⁿ",
        description: "Pangkat negatif menghasilkan kebalikan dari pangkat positif",
        example: "2⁻³ = 1/2³ = 1/8 = 0.125"
      },
      {
        id: 8,
        title: "Sifat Pangkat Pecahan",
        formula: "aᵐ/ⁿ = ⁿ√(aᵐ)",
        description: "Pangkat pecahan equivalen dengan operasi akar",
        example: "8²/³ = ³√(8²) = ³√64 = 4"
      }
    ];
    
    // Practice problems
    this.problems = [
      {
        id: 1,
        question: "Hitunglah 2⁵",
        answer: "32",
        hint: "Kalikan 2 sebanyak 5 kali",
        solution: "2⁵ = 2 × 2 × 2 × 2 × 2 = 32"
      },
      {
        id: 2,
        question: "Sederhanakan 3⁴ × 3²",
        answer: "3⁶",
        hint: "Gunakan sifat perkalian pangkat: aᵐ × aⁿ = aᵐ⁺ⁿ",
        solution: "3⁴ × 3² = 3⁴⁺² = 3⁶ = 729"
      },
      {
        id: 3,
        question: "Sederhanakan 5⁸ ÷ 5³",
        answer: "5⁵",
        hint: "Gunakan sifat pembagian pangkat: aᵐ ÷ aⁿ = aᵐ⁻ⁿ",
        solution: "5⁸ ÷ 5³ = 5⁸⁻³ = 5⁵ = 3125"
      },
      {
        id: 4,
        question: "Sederhanakan (2³)⁴",
        answer: "2¹²",
        hint: "Gunakan sifat pangkat dari pangkat: (aᵐ)ⁿ = aᵐˣⁿ",
        solution: "(2³)⁴ = 2³ˣ⁴ = 2¹² = 4096"
      },
      {
        id: 5,
        question: "Hitunglah 4⁻²",
        answer: "1/16",
        hint: "Pangkat negatif: a⁻ⁿ = 1/aⁿ",
        solution: "4⁻² = 1/4² = 1/16 = 0.0625"
      },
      {
        id: 6,
        question: "Hitunglah 10⁰",
        answer: "1",
        hint: "Setiap bilangan (kecuali 0) dipangkatkan 0 hasilnya 1",
        solution: "10⁰ = 1 (setiap bilangan pangkat 0 = 1)"
      },
      {
        id: 7,
        question: "Tulis 4500000 dalam notasi ilmiah",
        answer: "4.5 × 10⁶",
        hint: "Pindahkan koma desimal sehingga ada satu digit di depan koma",
        solution: "4500000 = 4.5 × 1000000 = 4.5 × 10⁶"
      },
      {
        id: 8,
        question: "Hitunglah 27^(1/3)",
        answer: "3",
        hint: "Pangkat pecahan 1/n berarti akar pangkat n",
        solution: "27^(1/3) = ³√27 = 3"
      }
    ];
    
    this.currentProblem = 0;
    this.score = 0;
    this.correctAnswers = 0;
    this.wrongAnswers = 0;
    this.completedProblems = 0;
    
    // Calculator history
    this.calculatorHistory = [];
    
    // Animation states
    this.growthAnimation = null;
    this.isAnimating = false;
    
    this.init();
  }
  
  init() {
    console.log('Initializing Exponent App...');
    this.setupEventListeners();
    this.showSection('beranda');
    
    // Initialize canvases after DOM is ready
    setTimeout(() => {
      this.setupCanvases();
      this.updateProblemDisplay();
      this.updateLawDisplay();
    }, 100);
  }
  
  setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // FIXED: Main navigation buttons
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
  }
  
  setupControlEventListeners() {
    // Laws of exponents
    document.querySelectorAll('.law-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lawId = parseInt(btn.getAttribute('data-law'));
        this.showLaw(lawId);
      });
    });
    
    // Simulation tabs
    document.querySelectorAll('.sim-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const simulation = tab.getAttribute('data-sim');
        this.showSimulation(simulation);
      });
    });
    
    // Growth simulation controls
    const baseSlider = document.getElementById('base-slider');
    const maxExpSlider = document.getElementById('max-exp-slider');
    const animateBtn = document.getElementById('animate-growth');
    const resetBtn = document.getElementById('reset-growth');
    
    if (baseSlider) {
      baseSlider.addEventListener('input', () => this.updateGrowthVisualization());
    }
    if (maxExpSlider) {
      maxExpSlider.addEventListener('input', () => this.updateGrowthVisualization());
    }
    if (animateBtn) {
      animateBtn.addEventListener('click', () => this.animateGrowth());
    }
    if (resetBtn) {
      resetBtn.addEventListener('click', () => this.resetGrowthVisualization());
    }
    
    // Visual calculator
    const calcVisualBtn = document.getElementById('calculate-visual');
    if (calcVisualBtn) {
      calcVisualBtn.addEventListener('click', () => this.calculateVisual());
    }
    
    // Comparison tool
    const compareBtns = document.getElementById('compare-bases');
    if (compareBtns) {
      compareBtns.addEventListener('click', () => this.compareBasesVisualization());
    }
    
    // Scientific notation converter
    const convertBtn = document.getElementById('convert-btn');
    if (convertBtn) {
      convertBtn.addEventListener('click', () => this.convertToScientificNotation());
    }
    
    // Calculator modes
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.getAttribute('data-mode');
        this.switchCalculatorMode(mode);
      });
    });
    
    // Basic calculator
    const calcBasicBtn = document.getElementById('calc-basic');
    if (calcBasicBtn) {
      calcBasicBtn.addEventListener('click', () => this.calculateBasic());
    }
    
    // Clear history
    const clearHistoryBtn = document.getElementById('clear-history');
    if (clearHistoryBtn) {
      clearHistoryBtn.addEventListener('click', () => this.clearCalculatorHistory());
    }
    
    // Equation solver
    const solveEquationBtn = document.getElementById('solve-equation');
    if (solveEquationBtn) {
      solveEquationBtn.addEventListener('click', () => this.solveEquation());
    }
    
    // Roots calculator
    const calcRootBtn = document.getElementById('calc-root');
    if (calcRootBtn) {
      calcRootBtn.addEventListener('click', () => this.calculateRoot());
    }
    
    // Application calculators
    const compoundBtn = document.getElementById('calc-compound');
    const populationBtn = document.getElementById('calc-population');
    const storageBtn = document.getElementById('calc-storage');
    const decayBtn = document.getElementById('calc-decay');
    
    if (compoundBtn) compoundBtn.addEventListener('click', () => this.calculateCompoundInterest());
    if (populationBtn) populationBtn.addEventListener('click', () => this.calculatePopulationGrowth());
    if (storageBtn) storageBtn.addEventListener('click', () => this.convertStorage());
    if (decayBtn) decayBtn.addEventListener('click', () => this.calculateRadioactiveDecay());
    
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
    
    const numberInput = document.getElementById('number-input');
    if (numberInput) {
      numberInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.convertToScientificNotation();
      });
    }
  }
  
  setupCanvases() {
    console.log('Setting up canvases...');
    this.drawHeroVisualization();
    this.drawTheoryVisualization();
  }
  
  // FIXED: Section navigation
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
    });
    
    // Show target section
    const targetSection = document.getElementById(`${sectionName}-section`);
    if (targetSection) {
      targetSection.classList.add('active');
      console.log('Section activated successfully:', sectionName);
    } else {
      console.error('Section not found:', `${sectionName}-section`);
      return;
    }
    
    this.currentSection = sectionName;
    
    // Initialize section-specific features with delay
    setTimeout(() => {
      this.initializeSectionFeatures(sectionName);
    }, 100);
  }
  
  initializeSectionFeatures(sectionName) {
    console.log('Initializing features for section:', sectionName);
    
    // Setup section-specific event listeners
    this.setupControlEventListeners();
    
    switch (sectionName) {
      case 'beranda':
        this.drawHeroVisualization();
        break;
      case 'teori':
        this.drawTheoryVisualization();
        break;
      case 'sifat':
        this.updateLawDisplay();
        break;
      case 'simulasi':
        this.showSimulation(this.currentSimulation);
        break;
      case 'notasi':
        // Scientific notation section is ready
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
    
    // Draw exponential growth visualization
    ctx.strokeStyle = '#21808D';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    const base = 1.5;
    const steps = 50;
    
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * (width - 40) + 20;
      const exp = (i / steps) * 4; // 0 to 4
      const y = height - 20 - (Math.pow(base, exp) - 1) * (height - 40) / (Math.pow(base, 4) - 1);
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.stroke();
    
    // Add labels
    ctx.fillStyle = '#21808D';
    ctx.font = 'bold 16px Arial';
    ctx.fillText('f(x) = aˣ', 20, 30);
    ctx.fillText('Pertumbuhan Eksponensial', width - 200, height - 10);
    
    // Draw points
    for (let i = 0; i <= 4; i++) {
      const x = 20 + (i / 4) * (width - 40);
      const y = height - 20 - (Math.pow(base, i) - 1) * (height - 40) / (Math.pow(base, 4) - 1);
      
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, 2 * Math.PI);
      ctx.fillStyle = '#FF6B6B';
      ctx.fill();
      
      // Label points
      ctx.fillStyle = '#21808D';
      ctx.font = '12px Arial';
      ctx.fillText(`(${i}, ${Math.pow(base, i).toFixed(1)})`, x - 15, y - 15);
    }
  }
  
  drawTheoryVisualization() {
    const canvas = document.getElementById('theory-visualization');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    // Draw visual representation of 2³
    const base = 2;
    const exponent = 3;
    const blockSize = 40;
    const spacing = 10;
    
    ctx.fillStyle = '#4ECDC4';
    ctx.strokeStyle = '#21808D';
    ctx.lineWidth = 2;
    
    // Draw multiplication process
    for (let step = 0; step < exponent; step++) {
      const startY = 50 + step * (blockSize + spacing + 30);
      const blocks = Math.pow(base, step + 1);
      
      // Draw blocks for current step
      for (let i = 0; i < blocks; i++) {
        const x = 50 + (i % 4) * (blockSize + spacing);
        const y = startY + Math.floor(i / 4) * (blockSize + spacing);
        
        ctx.fillRect(x, y, blockSize, blockSize);
        ctx.strokeRect(x, y, blockSize, blockSize);
      }
      
      // Draw step label
      ctx.fillStyle = '#21808D';
      ctx.font = 'bold 14px Arial';
      ctx.fillText(`2^${step + 1} = ${Math.pow(base, step + 1)}`, 220, startY + blockSize/2);
      
      ctx.fillStyle = '#4ECDC4';
    }
    
    // Final result
    ctx.fillStyle = '#21808D';
    ctx.font = 'bold 18px Arial';
    ctx.fillText('2³ = 2 × 2 × 2 = 8', 50, height - 20);
  }
  
  // Laws of exponents functionality
  showLaw(lawId) {
    this.currentLaw = lawId;
    this.updateLawDisplay();
  }
  
  updateLawDisplay() {
    const law = this.laws.find(l => l.id === this.currentLaw);
    if (!law) return;
    
    // Update law buttons
    document.querySelectorAll('.law-btn').forEach(btn => {
      btn.classList.remove('active', 'btn--primary');
      btn.classList.add('btn--outline');
      
      if (parseInt(btn.getAttribute('data-law')) === this.currentLaw) {
        btn.classList.remove('btn--outline');
        btn.classList.add('active', 'btn--primary');
      }
    });
    
    // Update law display
    const titleEl = document.getElementById('law-title');
    const formulaEl = document.getElementById('law-formula');
    const descriptionEl = document.getElementById('law-description');
    const exampleEl = document.getElementById('law-example-text');
    
    if (titleEl) titleEl.textContent = law.title;
    if (formulaEl) formulaEl.textContent = law.formula;
    if (descriptionEl) descriptionEl.textContent = law.description;
    if (exampleEl) exampleEl.textContent = law.example;
    
    this.drawLawVisualization(law);
  }
  
  drawLawVisualization(law) {
    const canvas = document.getElementById('law-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    ctx.fillStyle = '#21808D';
    ctx.font = 'bold 16px Arial';
    
    switch (law.id) {
      case 1: // Multiplication law
        this.drawMultiplicationLaw(ctx, width, height);
        break;
      case 2: // Division law
        this.drawDivisionLaw(ctx, width, height);
        break;
      case 3: // Power of power
        this.drawPowerOfPowerLaw(ctx, width, height);
        break;
      case 6: // Zero exponent
        this.drawZeroExponentLaw(ctx, width, height);
        break;
      case 7: // Negative exponent
        this.drawNegativeExponentLaw(ctx, width, height);
        break;
      default:
        ctx.fillText('Visualisasi untuk sifat ini', width/2 - 80, height/2);
        ctx.fillText('akan segera hadir', width/2 - 60, height/2 + 20);
    }
  }
  
  drawMultiplicationLaw(ctx, width, height) {
    // Visual representation of a^m × a^n = a^(m+n)
    const y = height/2;
    
    // Draw first term
    ctx.fillStyle = '#4ECDC4';
    for (let i = 0; i < 2; i++) {
      ctx.fillRect(50 + i * 25, y - 10, 20, 20);
    }
    ctx.fillStyle = '#21808D';
    ctx.fillText('a²', 50, y - 15);
    
    // Draw multiplication sign
    ctx.fillText('×', 130, y + 5);
    
    // Draw second term
    ctx.fillStyle = '#FF6B6B';
    for (let i = 0; i < 3; i++) {
      ctx.fillRect(170 + i * 25, y - 10, 20, 20);
    }
    ctx.fillStyle = '#21808D';
    ctx.fillText('a³', 170, y - 15);
    
    // Draw equals sign
    ctx.fillText('=', 270, y + 5);
    
    // Draw result
    ctx.fillStyle = '#45B7D1';
    for (let i = 0; i < 5; i++) {
      ctx.fillRect(300 + i * 25, y - 10, 20, 20);
    }
    ctx.fillStyle = '#21808D';
    ctx.fillText('a⁵', 300, y - 15);
    
    ctx.fillText('a² × a³ = a²⁺³ = a⁵', 50, y + 40);
  }
  
  drawDivisionLaw(ctx, width, height) {
    const y = height/2;
    
    // Draw dividend
    ctx.fillStyle = '#4ECDC4';
    for (let i = 0; i < 5; i++) {
      ctx.fillRect(50 + i * 25, y - 30, 20, 20);
    }
    ctx.fillStyle = '#21808D';
    ctx.fillText('a⁵', 50, y - 35);
    
    // Draw division line
    ctx.strokeStyle = '#21808D';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(50, y);
    ctx.lineTo(175, y);
    ctx.stroke();
    
    // Draw divisor
    ctx.fillStyle = '#FF6B6B';
    for (let i = 0; i < 2; i++) {
      ctx.fillRect(50 + i * 25, y + 10, 20, 20);
    }
    ctx.fillStyle = '#21808D';
    ctx.fillText('a²', 50, y + 35);
    
    // Draw equals sign
    ctx.fillText('=', 200, y + 5);
    
    // Draw result
    ctx.fillStyle = '#45B7D1';
    for (let i = 0; i < 3; i++) {
      ctx.fillRect(230 + i * 25, y - 10, 20, 20);
    }
    ctx.fillStyle = '#21808D';
    ctx.fillText('a³', 230, y - 15);
    
    ctx.fillText('a⁵ ÷ a² = a⁵⁻² = a³', 50, y + 60);
  }
  
  drawPowerOfPowerLaw(ctx, width, height) {
    const y = height/2;
    
    // Draw base with exponent
    ctx.fillStyle = '#21808D';
    ctx.font = 'bold 20px Arial';
    ctx.fillText('(a²)³', 50, y);
    
    // Draw equals sign
    ctx.fillText('=', 150, y);
    
    // Draw expanded form
    ctx.font = 'bold 16px Arial';
    ctx.fillText('a² × a² × a²', 180, y);
    
    // Draw final result
    ctx.font = 'bold 20px Arial';
    ctx.fillText('= a⁶', 320, y);
    
    // Visual representation with boxes
    ctx.fillStyle = '#4ECDC4';
    for (let group = 0; group < 3; group++) {
      for (let i = 0; i < 2; i++) {
        ctx.fillRect(50 + group * 60 + i * 25, y + 20, 20, 20);
      }
    }
  }
  
  drawZeroExponentLaw(ctx, width, height) {
    const y = height/2;
    
    ctx.fillStyle = '#21808D';
    ctx.font = 'bold 24px Arial';
    ctx.fillText('a⁰ = 1', width/2 - 40, y);
    
    ctx.font = 'bold 16px Arial';
    ctx.fillText('untuk setiap a ≠ 0', width/2 - 70, y + 30);
    
    // Examples
    ctx.font = '14px Arial';
    ctx.fillText('5⁰ = 1', 50, y + 60);
    ctx.fillText('100⁰ = 1', 150, y + 60);
    ctx.fillText('(-7)⁰ = 1', 250, y + 60);
  }
  
  drawNegativeExponentLaw(ctx, width, height) {
    const y = height/2;
    
    ctx.fillStyle = '#21808D';
    ctx.font = 'bold 20px Arial';
    ctx.fillText('a⁻ⁿ = 1/aⁿ', 50, y);
    
    // Draw fraction visualization
    ctx.strokeStyle = '#21808D';
    ctx.lineWidth = 2;
    
    // Fraction bar
    ctx.beginPath();
    ctx.moveTo(200, y - 10);
    ctx.lineTo(280, y - 10);
    ctx.stroke();
    
    ctx.font = 'bold 16px Arial';
    ctx.fillText('1', 235, y - 20);
    ctx.fillText('aⁿ', 230, y + 10);
    
    // Example
    ctx.font = '14px Arial';
    ctx.fillText('Contoh: 2⁻³ = 1/2³ = 1/8', 50, y + 40);
  }
  
  // Simulation functions
  showSimulation(simulationType) {
    this.currentSimulation = simulationType;
    
    // Update tabs
    document.querySelectorAll('.sim-tab').forEach(tab => {
      tab.classList.remove('active', 'btn--primary');
      tab.classList.add('btn--outline');
      
      if (tab.getAttribute('data-sim') === simulationType) {
        tab.classList.remove('btn--outline');
        tab.classList.add('active', 'btn--primary');
      }
    });
    
    // Show/hide panels
    document.querySelectorAll('.simulation-panel').forEach(panel => {
      panel.classList.add('hidden');
    });
    
    const targetPanel = document.getElementById(`${simulationType}-simulation`);
    if (targetPanel) {
      targetPanel.classList.remove('hidden');
    }
    
    // Initialize specific simulation
    switch (simulationType) {
      case 'growth':
        this.initializeGrowthSimulation();
        break;
      case 'calculator':
        this.initializeVisualCalculator();
        break;
      case 'comparison':
        this.initializeComparisonTool();
        break;
    }
  }
  
  initializeGrowthSimulation() {
    this.updateGrowthVisualization();
  }
  
  updateGrowthVisualization() {
    const baseSlider = document.getElementById('base-slider');
    const maxExpSlider = document.getElementById('max-exp-slider');
    const baseValueEl = document.getElementById('base-value');
    const maxExpValueEl = document.getElementById('max-exp-value');
    
    if (!baseSlider || !maxExpSlider) return;
    
    const base = parseFloat(baseSlider.value);
    const maxExp = parseInt(maxExpSlider.value);
    
    if (baseValueEl) baseValueEl.textContent = base;
    if (maxExpValueEl) maxExpValueEl.textContent = maxExp;
    
    this.drawGrowthChart(base, maxExp);
    this.updateCalculationSteps(base, maxExp);
  }
  
  drawGrowthChart(base, maxExp) {
    const canvas = document.getElementById('growth-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    // Calculate values
    const values = [];
    for (let i = 0; i <= maxExp; i++) {
      values.push(Math.pow(base, i));
    }
    
    const maxValue = Math.max(...values);
    const margin = 60;
    const chartWidth = width - 2 * margin;
    const chartHeight = height - 2 * margin;
    
    // Draw axes
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(margin, height - margin);
    ctx.lineTo(width - margin, height - margin); // x-axis
    ctx.moveTo(margin, height - margin);
    ctx.lineTo(margin, margin); // y-axis
    ctx.stroke();
    
    // Draw chart
    ctx.strokeStyle = '#21808D';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    for (let i = 0; i <= maxExp; i++) {
      const x = margin + (i / maxExp) * chartWidth;
      const y = height - margin - (values[i] / maxValue) * chartHeight;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.stroke();
    
    // Draw points
    ctx.fillStyle = '#FF6B6B';
    for (let i = 0; i <= maxExp; i++) {
      const x = margin + (i / maxExp) * chartWidth;
      const y = height - margin - (values[i] / maxValue) * chartHeight;
      
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, 2 * Math.PI);
      ctx.fill();
      
      // Label points
      ctx.fillStyle = '#21808D';
      ctx.font = '12px Arial';
      ctx.fillText(`(${i}, ${values[i].toFixed(1)})`, x - 15, y - 15);
      ctx.fillStyle = '#FF6B6B';
    }
    
    // Labels
    ctx.fillStyle = '#21808D';
    ctx.font = 'bold 14px Arial';
    ctx.fillText('Pangkat (n)', width/2 - 30, height - 10);
    ctx.save();
    ctx.translate(15, height/2);
    ctx.rotate(-Math.PI/2);
    ctx.fillText(`${base}ⁿ`, -20, 0);
    ctx.restore();
  }
  
  updateCalculationSteps(base, maxExp) {
    const stepsEl = document.getElementById('calculation-steps');
    if (!stepsEl) return;
    
    let html = '';
    for (let i = 0; i <= maxExp; i++) {
      const value = Math.pow(base, i);
      const process = i === 0 ? '1' : `${base}${i > 1 ? ` × ${base}`.repeat(i - 1) : ''}`;
      html += `<div>${base}^${i} = ${process} = ${value.toFixed(2)}</div>`;
    }
    
    stepsEl.innerHTML = html;
  }
  
  animateGrowth() {
    const btn = document.getElementById('animate-growth');
    if (!btn) return;
    
    if (this.isAnimating) {
      this.stopGrowthAnimation();
      return;
    }
    
    this.isAnimating = true;
    btn.textContent = '⏸️ Stop';
    btn.classList.remove('btn--primary');
    btn.classList.add('btn--secondary');
    
    const baseSlider = document.getElementById('base-slider');
    const maxExpSlider = document.getElementById('max-exp-slider');
    
    if (!baseSlider || !maxExpSlider) return;
    
    const base = parseFloat(baseSlider.value);
    const maxExp = parseInt(maxExpSlider.value);
    
    let currentStep = 0;
    
    this.growthAnimation = setInterval(() => {
      if (currentStep > maxExp) {
        currentStep = 0;
      }
      
      this.drawGrowthAnimationStep(base, maxExp, currentStep);
      currentStep++;
    }, 1000);
  }
  
  stopGrowthAnimation() {
    if (this.growthAnimation) {
      clearInterval(this.growthAnimation);
      this.growthAnimation = null;
    }
    
    this.isAnimating = false;
    const btn = document.getElementById('animate-growth');
    if (btn) {
      btn.textContent = '▶️ Animasi';
      btn.classList.remove('btn--secondary');
      btn.classList.add('btn--primary');
    }
    
    this.updateGrowthVisualization();
  }
  
  drawGrowthAnimationStep(base, maxExp, currentStep) {
    const canvas = document.getElementById('growth-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    // Calculate values up to current step
    const values = [];
    for (let i = 0; i <= currentStep; i++) {
      values.push(Math.pow(base, i));
    }
    
    const allValues = [];
    for (let i = 0; i <= maxExp; i++) {
      allValues.push(Math.pow(base, i));
    }
    
    const maxValue = Math.max(...allValues);
    const margin = 60;
    const chartWidth = width - 2 * margin;
    const chartHeight = height - 2 * margin;
    
    // Draw axes
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(margin, height - margin);
    ctx.lineTo(width - margin, height - margin);
    ctx.moveTo(margin, height - margin);
    ctx.lineTo(margin, margin);
    ctx.stroke();
    
    // Draw animated line
    if (currentStep > 0) {
      ctx.strokeStyle = '#21808D';
      ctx.lineWidth = 3;
      ctx.beginPath();
      
      for (let i = 0; i <= currentStep; i++) {
        const x = margin + (i / maxExp) * chartWidth;
        const y = height - margin - (values[i] / maxValue) * chartHeight;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.stroke();
    }
    
    // Draw points
    ctx.fillStyle = '#FF6B6B';
    for (let i = 0; i <= currentStep; i++) {
      const x = margin + (i / maxExp) * chartWidth;
      const y = height - margin - (values[i] / maxValue) * chartHeight;
      
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, 2 * Math.PI);
      ctx.fill();
      
      // Highlight current point
      if (i === currentStep) {
        ctx.strokeStyle = '#21808D';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, 2 * Math.PI);
        ctx.stroke();
        
        // Show calculation
        ctx.fillStyle = '#21808D';
        ctx.font = 'bold 16px Arial';
        ctx.fillText(`${base}^${i} = ${values[i].toFixed(1)}`, x + 20, y - 10);
      }
    }
    
    // Update calculation steps with highlight
    const stepsEl = document.getElementById('calculation-steps');
    if (stepsEl) {
      let html = '';
      for (let i = 0; i <= maxExp; i++) {
        const value = Math.pow(base, i);
        const process = i === 0 ? '1' : `${base}${i > 1 ? ` × ${base}`.repeat(i - 1) : ''}`;
        const highlight = i === currentStep ? ' style="background-color: var(--color-bg-1); padding: 4px; border-radius: 4px;"' : '';
        html += `<div${highlight}>${base}^${i} = ${process} = ${value.toFixed(2)}</div>`;
      }
      stepsEl.innerHTML = html;
    }
  }
  
  resetGrowthVisualization() {
    this.stopGrowthAnimation();
    
    const baseSlider = document.getElementById('base-slider');
    const maxExpSlider = document.getElementById('max-exp-slider');
    
    if (baseSlider) baseSlider.value = 2;
    if (maxExpSlider) maxExpSlider.value = 8;
    
    this.updateGrowthVisualization();
  }
  
  // Visual calculator
  initializeVisualCalculator() {
    this.calculateVisual();
  }
  
  calculateVisual() {
    const baseInput = document.getElementById('visual-base');
    const expInput = document.getElementById('visual-exp');
    const resultEl = document.getElementById('visual-result');
    const processEl = document.getElementById('visual-process');
    
    if (!baseInput || !expInput || !resultEl || !processEl) return;
    
    const base = parseFloat(baseInput.value) || 2;
    const exponent = parseFloat(expInput.value) || 3;
    
    const result = Math.pow(base, exponent);
    
    resultEl.textContent = result.toFixed(2);
    
    if (exponent >= 0 && exponent % 1 === 0 && exponent <= 5) {
      // Show multiplication process for integer exponents
      const multiplication = Array(exponent).fill(base).join(' × ');
      processEl.textContent = `${base}^${exponent} = ${multiplication} = ${result.toFixed(2)}`;
    } else {
      processEl.textContent = `${base}^${exponent} = ${result.toFixed(2)}`;
    }
    
    this.drawVisualCalculation(base, exponent, result);
  }
  
  drawVisualCalculation(base, exponent, result) {
    const canvas = document.getElementById('visual-calc-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    if (exponent >= 1 && exponent <= 4 && exponent % 1 === 0) {
      // Visual representation with blocks
      const blockSize = 30;
      const spacing = 5;
      const totalBlocks = Math.pow(base, exponent);
      
      if (totalBlocks <= 50) { // Limit visual representation
        ctx.fillStyle = '#4ECDC4';
        ctx.strokeStyle = '#21808D';
        ctx.lineWidth = 1;
        
        const cols = Math.ceil(Math.sqrt(totalBlocks));
        const rows = Math.ceil(totalBlocks / cols);
        
        const startX = (width - cols * (blockSize + spacing)) / 2;
        const startY = (height - rows * (blockSize + spacing)) / 2;
        
        for (let i = 0; i < totalBlocks; i++) {
          const row = Math.floor(i / cols);
          const col = i % cols;
          const x = startX + col * (blockSize + spacing);
          const y = startY + row * (blockSize + spacing);
          
          ctx.fillRect(x, y, blockSize, blockSize);
          ctx.strokeRect(x, y, blockSize, blockSize);
        }
        
        // Add label
        ctx.fillStyle = '#21808D';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`${base}^${exponent} = ${totalBlocks} blocks`, width/2, height - 20);
        ctx.textAlign = 'left';
      }
    } else {
      // Show exponential curve for non-integer or large exponents
      this.drawExponentialCurve(ctx, width, height, base, exponent);
    }
  }
  
  drawExponentialCurve(ctx, width, height, base, targetExp) {
    const margin = 40;
    const chartWidth = width - 2 * margin;
    const chartHeight = height - 2 * margin;
    
    // Draw axes
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(margin, height - margin);
    ctx.lineTo(width - margin, height - margin);
    ctx.moveTo(margin, height - margin);
    ctx.lineTo(margin, margin);
    ctx.stroke();
    
    // Draw curve
    ctx.strokeStyle = '#21808D';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    const steps = 100;
    const maxExp = Math.max(4, targetExp + 1);
    
    for (let i = 0; i <= steps; i++) {
      const exp = (i / steps) * maxExp;
      const value = Math.pow(base, exp);
      const maxValue = Math.pow(base, maxExp);
      
      const x = margin + (exp / maxExp) * chartWidth;
      const y = height - margin - (value / maxValue) * chartHeight;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.stroke();
    
    // Highlight target point
    const targetValue = Math.pow(base, targetExp);
    const maxValue = Math.pow(base, maxExp);
    const targetX = margin + (targetExp / maxExp) * chartWidth;
    const targetY = height - margin - (targetValue / maxValue) * chartHeight;
    
    ctx.fillStyle = '#FF6B6B';
    ctx.beginPath();
    ctx.arc(targetX, targetY, 6, 0, 2 * Math.PI);
    ctx.fill();
    
    // Label
    ctx.fillStyle = '#21808D';
    ctx.font = '12px Arial';
    ctx.fillText(`(${targetExp}, ${targetValue.toFixed(2)})`, targetX + 10, targetY - 10);
  }
  
  // Comparison tool
  initializeComparisonTool() {
    this.compareBasesVisualization();
  }
  
  compareBasesVisualization() {
    const base1Input = document.getElementById('compare-base1');
    const base2Input = document.getElementById('compare-base2');
    const maxExpInput = document.getElementById('compare-max-exp');
    
    if (!base1Input || !base2Input || !maxExpInput) return;
    
    const base1 = parseFloat(base1Input.value) || 2;
    const base2 = parseFloat(base2Input.value) || 3;
    const maxExp = parseInt(maxExpInput.value) || 6;
    
    this.drawComparisonChart(base1, base2, maxExp);
  }
  
  drawComparisonChart(base1, base2, maxExp) {
    const canvas = document.getElementById('comparison-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    // Calculate values for both bases
    const values1 = [];
    const values2 = [];
    
    for (let i = 0; i <= maxExp; i++) {
      values1.push(Math.pow(base1, i));
      values2.push(Math.pow(base2, i));
    }
    
    const maxValue = Math.max(...values1, ...values2);
    const margin = 60;
    const chartWidth = width - 2 * margin;
    const chartHeight = height - 2 * margin;
    
    // Draw axes
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(margin, height - margin);
    ctx.lineTo(width - margin, height - margin);
    ctx.moveTo(margin, height - margin);
    ctx.lineTo(margin, margin);
    ctx.stroke();
    
    // Draw first base curve
    ctx.strokeStyle = '#4ECDC4';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    for (let i = 0; i <= maxExp; i++) {
      const x = margin + (i / maxExp) * chartWidth;
      const y = height - margin - (values1[i] / maxValue) * chartHeight;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.stroke();
    
    // Draw second base curve
    ctx.strokeStyle = '#FF6B6B';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    for (let i = 0; i <= maxExp; i++) {
      const x = margin + (i / maxExp) * chartWidth;
      const y = height - margin - (values2[i] / maxValue) * chartHeight;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.stroke();
    
    // Draw points for both curves
    ctx.fillStyle = '#4ECDC4';
    for (let i = 0; i <= maxExp; i++) {
      const x = margin + (i / maxExp) * chartWidth;
      const y = height - margin - (values1[i] / maxValue) * chartHeight;
      
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
    }
    
    ctx.fillStyle = '#FF6B6B';
    for (let i = 0; i <= maxExp; i++) {
      const x = margin + (i / maxExp) * chartWidth;
      const y = height - margin - (values2[i] / maxValue) * chartHeight;
      
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
    }
    
    // Legend
    ctx.fillStyle = '#4ECDC4';
    ctx.fillRect(width - 150, 20, 15, 15);
    ctx.fillStyle = '#21808D';
    ctx.font = '14px Arial';
    ctx.fillText(`y = ${base1}^x`, width - 130, 32);
    
    ctx.fillStyle = '#FF6B6B';
    ctx.fillRect(width - 150, 45, 15, 15);
    ctx.fillStyle = '#21808D';
    ctx.fillText(`y = ${base2}^x`, width - 130, 57);
    
    // Labels
    ctx.fillStyle = '#21808D';
    ctx.font = 'bold 14px Arial';
    ctx.fillText('x', width - 30, height - 10);
    ctx.save();
    ctx.translate(15, 30);
    ctx.rotate(-Math.PI/2);
    ctx.fillText('f(x)', -10, 0);
    ctx.restore();
  }
  
  // Scientific notation converter
  convertToScientificNotation() {
    const numberInput = document.getElementById('number-input');
    const resultEl = document.getElementById('conversion-result');
    
    if (!numberInput || !resultEl) return;
    
    const inputValue = numberInput.value.trim();
    
    if (!inputValue) {
      resultEl.innerHTML = '<p>Masukkan bilangan untuk melihat konversi</p>';
      return;
    }
    
    try {
      const number = parseFloat(inputValue);
      
      if (isNaN(number)) {
        throw new Error('Input bukan bilangan yang valid');
      }
      
      if (number === 0) {
        resultEl.innerHTML = `
          <div>
            <p><strong>Bilangan asli:</strong> 0</p>
            <p><strong>Notasi ilmiah:</strong> 0</p>
            <p><strong>Catatan:</strong> Nol tidak memerlukan notasi ilmiah</p>
          </div>
        `;
        return;
      }
      
      // Convert to scientific notation
      const exponent = Math.floor(Math.log10(Math.abs(number)));
      const mantissa = number / Math.pow(10, exponent);
      
      // Format the result
      const mantissaFormatted = mantissa.toFixed(2).replace(/\.?0+$/, '');
      const sign = exponent >= 0 ? '' : '⁻';
      const expFormatted = Math.abs(exponent);
      
      resultEl.innerHTML = `
        <div>
          <p><strong>Bilangan asli:</strong> ${number.toLocaleString()}</p>
          <p><strong>Notasi ilmiah:</strong> ${mantissaFormatted} × 10${sign}${expFormatted}</p>
          <p><strong>Proses:</strong></p>
          <p>• Pindahkan koma desimal ${Math.abs(exponent)} tempat ke ${exponent < 0 ? 'kanan' : 'kiri'}</p>
          <p>• Mantissa: ${mantissaFormatted} (antara 1 dan 10)</p>
          <p>• Eksponen: ${exponent} (jumlah perpindahan koma)</p>
        </div>
      `;
      
    } catch (error) {
      resultEl.innerHTML = `
        <div style="color: var(--color-error);">
          <p><strong>Error:</strong> ${error.message}</p>
          <p>Contoh format yang benar: 300000000, 0.000001, 1.23e6</p>
        </div>
      `;
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
  
  calculateBasic() {
    const baseInput = document.getElementById('calc-base');
    const expInput = document.getElementById('calc-exp');
    const resultEl = document.getElementById('basic-result');
    
    if (!baseInput || !expInput || !resultEl) return;
    
    const base = parseFloat(baseInput.value);
    const exponent = parseFloat(expInput.value);
    
    if (isNaN(base) || isNaN(exponent)) {
      resultEl.innerHTML = '<p style="color: var(--color-error);">Masukkan nilai yang valid</p>';
      return;
    }
    
    try {
      const result = Math.pow(base, exponent);
      
      if (!isFinite(result)) {
        throw new Error('Hasil terlalu besar atau tidak terdefinisi');
      }
      
      const calculation = `${base}^${exponent} = ${result}`;
      
      resultEl.innerHTML = `
        <div style="color: var(--color-success);">
          <h4>✅ Hasil Perhitungan</h4>
          <p><strong>Operasi:</strong> ${base}^${exponent}</p>
          <p><strong>Hasil:</strong> ${result}</p>
          ${exponent >= 0 && exponent % 1 === 0 && exponent <= 5 ? 
            `<p><strong>Proses:</strong> ${Array(exponent).fill(base).join(' × ')}</p>` : ''}
        </div>
      `;
      
      // Add to history
      this.addToCalculatorHistory(calculation);
      
    } catch (error) {
      resultEl.innerHTML = `
        <div style="color: var(--color-error);">
          <h4>❌ Error</h4>
          <p>${error.message}</p>
        </div>
      `;
    }
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
    const historyEl = document.getElementById('calc-history');
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
  
  solveEquation() {
    const typeInputs = document.querySelectorAll('input[name="equation-type"]');
    const baseInput = document.getElementById('eq-base');
    const resultInput = document.getElementById('eq-result');
    const solutionEl = document.getElementById('equation-solution');
    
    if (!baseInput || !resultInput || !solutionEl) return;
    
    let equationType = '';
    typeInputs.forEach(input => {
      if (input.checked) equationType = input.value;
    });
    
    const base = parseFloat(baseInput.value);
    const result = parseFloat(resultInput.value);
    
    if (isNaN(base) || isNaN(result) || base <= 0 || result <= 0) {
      solutionEl.innerHTML = '<p style="color: var(--color-error);">Masukkan nilai positif yang valid</p>';
      return;
    }
    
    try {
      if (equationType === 'find-x') {
        // Solve a^x = b for x
        if (base === 1) {
          throw new Error('Basis tidak boleh 1 untuk mencari pangkat');
        }
        
        const x = Math.log(result) / Math.log(base);
        
        solutionEl.innerHTML = `
          <div style="color: var(--color-success);">
            <h4>✅ Solusi Persamaan</h4>
            <p><strong>Persamaan:</strong> ${base}^x = ${result}</p>
            <p><strong>Solusi:</strong> x = ${x.toFixed(4)}</p>
            <p><strong>Penjelasan:</strong> Gunakan logaritma</p>
            <p>x = log₍${base}₎(${result}) = ln(${result})/ln(${base})</p>
            <p><strong>Verifikasi:</strong> ${base}^${x.toFixed(4)} ≈ ${Math.pow(base, x).toFixed(4)}</p>
          </div>
        `;
      } else {
        // Solve a^n = b for a
        throw new Error('Fitur mencari basis akan segera tersedia');
      }
      
    } catch (error) {
      solutionEl.innerHTML = `
        <div style="color: var(--color-error);">
          <h4>❌ Error</h4>
          <p>${error.message}</p>
        </div>
      `;
    }
  }
  
  calculateRoot() {
    const numberInput = document.getElementById('root-number');
    const indexInput = document.getElementById('root-index');
    const solutionEl = document.getElementById('roots-solution');
    
    if (!numberInput || !indexInput || !solutionEl) return;
    
    const number = parseFloat(numberInput.value);
    const index = parseFloat(indexInput.value);
    
    if (isNaN(number) || isNaN(index) || number < 0 || index <= 0) {
      solutionEl.innerHTML = '<p style="color: var(--color-error);">Masukkan nilai yang valid (bilangan ≥ 0, indeks > 0)</p>';
      return;
    }
    
    try {
      const result = Math.pow(number, 1/index);
      const fractionalExponent = `1/${index}`;
      
      solutionEl.innerHTML = `
        <div style="color: var(--color-success);">
          <h4>✅ Hasil Perhitungan Akar</h4>
          <p><strong>Operasi:</strong> ⁿ√${number} (akar pangkat ${index})</p>
          <p><strong>Dalam bentuk pangkat:</strong> ${number}^(${fractionalExponent})</p>
          <p><strong>Hasil:</strong> ${result.toFixed(4)}</p>
          <p><strong>Verifikasi:</strong> ${result.toFixed(4)}^${index} ≈ ${Math.pow(result, index).toFixed(4)}</p>
          <p><strong>Penjelasan:</strong> Akar pangkat n sama dengan pangkat 1/n</p>
        </div>
      `;
      
    } catch (error) {
      solutionEl.innerHTML = `
        <div style="color: var(--color-error);">
          <h4>❌ Error</h4>
          <p>Terjadi kesalahan dalam perhitungan</p>
        </div>
      `;
    }
  }
  
  // Application calculators
  calculateCompoundInterest() {
    const principalInput = document.getElementById('principal');
    const rateInput = document.getElementById('interest-rate');
    const timeInput = document.getElementById('time-years');
    const resultEl = document.getElementById('compound-result');
    
    if (!principalInput || !rateInput || !timeInput || !resultEl) return;
    
    const principal = parseFloat(principalInput.value);
    const rate = parseFloat(rateInput.value) / 100; // Convert percentage
    const time = parseFloat(timeInput.value);
    
    if (isNaN(principal) || isNaN(rate) || isNaN(time) || principal <= 0 || rate < 0 || time <= 0) {
      resultEl.innerHTML = '<p style="color: var(--color-error);">Masukkan nilai yang valid</p>';
      return;
    }
    
    const amount = principal * Math.pow(1 + rate, time);
    const interest = amount - principal;
    
    resultEl.innerHTML = `
      <div>
        <h4>💰 Hasil Perhitungan Bunga Majemuk</h4>
        <p><strong>Modal Awal:</strong> Rp ${principal.toLocaleString('id-ID')}</p>
        <p><strong>Suku Bunga:</strong> ${(rate * 100).toFixed(1)}% per tahun</p>
        <p><strong>Waktu:</strong> ${time} tahun</p>
        <hr>
        <p><strong>Rumus:</strong> A = P(1 + r)^t</p>
        <p><strong>Perhitungan:</strong> A = ${principal.toLocaleString('id-ID')} × (1 + ${rate})^${time}</p>
        <p><strong>A = ${principal.toLocaleString('id-ID')} × ${(1 + rate).toFixed(3)}^${time}</strong></p>
        <p><strong>A = ${principal.toLocaleString('id-ID')} × ${Math.pow(1 + rate, time).toFixed(3)}</strong></p>
        <hr>
        <p><strong>Jumlah Akhir:</strong> Rp ${amount.toLocaleString('id-ID', { maximumFractionDigits: 0 })}</p>
        <p><strong>Bunga yang Diperoleh:</strong> Rp ${interest.toLocaleString('id-ID', { maximumFractionDigits: 0 })}</p>
      </div>
    `;
  }
  
  calculatePopulationGrowth() {
    const initialPopInput = document.getElementById('initial-pop');
    const growthFactorInput = document.getElementById('growth-factor');
    const timeInput = document.getElementById('time-hours');
    const resultEl = document.getElementById('population-result');
    
    if (!initialPopInput || !growthFactorInput || !timeInput || !resultEl) return;
    
    const initialPop = parseFloat(initialPopInput.value);
    const growthFactor = parseFloat(growthFactorInput.value);
    const time = parseFloat(timeInput.value);
    
    if (isNaN(initialPop) || isNaN(growthFactor) || isNaN(time) || initialPop <= 0 || growthFactor <= 0 || time < 0) {
      resultEl.innerHTML = '<p style="color: var(--color-error);">Masukkan nilai yang valid</p>';
      return;
    }
    
    const finalPop = initialPop * Math.pow(growthFactor, time);
    const growth = finalPop - initialPop;
    
    resultEl.innerHTML = `
      <div>
        <h4>📈 Hasil Perhitungan Pertumbuhan Populasi</h4>
        <p><strong>Populasi Awal:</strong> ${initialPop.toLocaleString('id-ID')}</p>
        <p><strong>Faktor Pertumbuhan:</strong> ${growthFactor}x per jam</p>
        <p><strong>Waktu:</strong> ${time} jam</p>
        <hr>
        <p><strong>Rumus:</strong> P(t) = P₀ × r^t</p>
        <p><strong>Perhitungan:</strong> P(${time}) = ${initialPop.toLocaleString('id-ID')} × ${growthFactor}^${time}</p>
        <p><strong>P(${time}) = ${initialPop.toLocaleString('id-ID')} × ${Math.pow(growthFactor, time).toFixed(2)}</strong></p>
        <hr>
        <p><strong>Populasi Akhir:</strong> ${Math.round(finalPop).toLocaleString('id-ID')}</p>
        <p><strong>Pertumbuhan:</strong> ${Math.round(growth).toLocaleString('id-ID')} (${((growth/initialPop)*100).toFixed(1)}%)</p>
      </div>
    `;
  }
  
  convertStorage() {
    const valueInput = document.getElementById('storage-value');
    const fromSelect = document.getElementById('storage-from');
    const toSelect = document.getElementById('storage-to');
    const resultEl = document.getElementById('storage-result');
    
    if (!valueInput || !fromSelect || !toSelect || !resultEl) return;
    
    const value = parseFloat(valueInput.value);
    const fromUnit = fromSelect.value;
    const toUnit = toSelect.value;
    
    if (isNaN(value) || value < 0) {
      resultEl.innerHTML = '<p style="color: var(--color-error);">Masukkan nilai yang valid</p>';
      return;
    }
    
    // Storage unit powers (in bytes)
    const units = {
      'byte': 0,
      'kb': 10,
      'mb': 20,
      'gb': 30,
      'tb': 40
    };
    
    // Convert to bytes first, then to target unit
    const bytesValue = value * Math.pow(2, units[fromUnit]);
    const result = bytesValue / Math.pow(2, units[toUnit]);
    
    const unitNames = {
      'byte': 'Byte',
      'kb': 'KB',
      'mb': 'MB', 
      'gb': 'GB',
      'tb': 'TB'
    };
    
    resultEl.innerHTML = `
      <div>
        <h4>💾 Hasil Konversi Penyimpanan Digital</h4>
        <p><strong>Input:</strong> ${value} ${unitNames[fromUnit]}</p>
        <p><strong>Output:</strong> ${result.toLocaleString('id-ID')} ${unitNames[toUnit]}</p>
        <hr>
        <p><strong>Proses Perhitungan:</strong></p>
        <p>1 ${unitNames[fromUnit]} = 2^${units[fromUnit]} bytes</p>
        <p>1 ${unitNames[toUnit]} = 2^${units[toUnit]} bytes</p>
        <p><strong>Dalam bytes:</strong> ${value} × 2^${units[fromUnit]} = ${bytesValue.toLocaleString('id-ID')} bytes</p>
        <p><strong>Konversi:</strong> ${bytesValue.toLocaleString('id-ID')} ÷ 2^${units[toUnit]} = ${result.toLocaleString('id-ID')} ${unitNames[toUnit]}</p>
      </div>
    `;
  }
  
  calculateRadioactiveDecay() {
    const initialAmountInput = document.getElementById('initial-amount');
    const halfLifeInput = document.getElementById('half-life');
    const timeInput = document.getElementById('decay-time');
    const resultEl = document.getElementById('decay-result');
    
    if (!initialAmountInput || !halfLifeInput || !timeInput || !resultEl) return;
    
    const initialAmount = parseFloat(initialAmountInput.value);
    const halfLife = parseFloat(halfLifeInput.value);
    const time = parseFloat(timeInput.value);
    
    if (isNaN(initialAmount) || isNaN(halfLife) || isNaN(time) || initialAmount <= 0 || halfLife <= 0 || time < 0) {
      resultEl.innerHTML = '<p style="color: var(--color-error);">Masukkan nilai yang valid</p>';
      return;
    }
    
    const remainingAmount = initialAmount * Math.pow(0.5, time / halfLife);
    const decayedAmount = initialAmount - remainingAmount;
    const percentageRemaining = (remainingAmount / initialAmount) * 100;
    
    resultEl.innerHTML = `
      <div>
        <h4>☢️ Hasil Perhitungan Peluruhan Radioaktif</h4>
        <p><strong>Jumlah Awal:</strong> ${initialAmount.toLocaleString('id-ID')}</p>
        <p><strong>Waktu Paruh:</strong> ${halfLife.toLocaleString('id-ID')} tahun</p>
        <p><strong>Waktu Elapsed:</strong> ${time.toLocaleString('id-ID')} tahun</p>
        <hr>
        <p><strong>Rumus:</strong> N(t) = N₀ × (1/2)^(t/T)</p>
        <p><strong>Perhitungan:</strong> N(${time}) = ${initialAmount.toLocaleString('id-ID')} × (0.5)^(${time}/${halfLife})</p>
        <p><strong>N(${time}) = ${initialAmount.toLocaleString('id-ID')} × (0.5)^${(time/halfLife).toFixed(3)}</strong></p>
        <p><strong>N(${time}) = ${initialAmount.toLocaleString('id-ID')} × ${Math.pow(0.5, time/halfLife).toFixed(6)}</strong></p>
        <hr>
        <p><strong>Jumlah Tersisa:</strong> ${remainingAmount.toFixed(2)} (${percentageRemaining.toFixed(1)}%)</p>
        <p><strong>Jumlah yang Meluruh:</strong> ${decayedAmount.toFixed(2)} (${(100-percentageRemaining).toFixed(1)}%)</p>
        <p><strong>Jumlah Waktu Paruh:</strong> ${(time/halfLife).toFixed(2)} kali</p>
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
      // Try to parse as numbers
      const userNum = parseFloat(userAnswer);
      const correctNum = parseFloat(correctAnswer);
      
      if (!isNaN(userNum) && !isNaN(correctNum)) {
        isCorrect = Math.abs(userNum - correctNum) < 0.01;
      }
      
      // Check for fraction formats
      if (!isCorrect && correctAnswer.includes('/')) {
        const userFraction = userAnswer.replace(/\s/g, '');
        const correctFraction = correctAnswer.replace(/\s/g, '');
        isCorrect = userFraction === correctFraction;
      }
    }
    
    if (isCorrect) {
      this.correctAnswers++;
      this.score += 10;
      this.showFeedback('🎉 Benar! Jawaban Anda tepat.', 'correct');
      
      // Add animation to score
      const currentScore = document.getElementById('current-score');
      if (currentScore) {
        currentScore.classList.add('animate-exponential');
        setTimeout(() => {
          currentScore.classList.remove('animate-exponential');
        }, 1000);
      }
    } else {
      this.wrongAnswers++;
      this.showFeedback(`❌ Kurang tepat. Jawaban yang benar adalah: ${problem.answer}`, 'incorrect');
    }
    
    this.completedProblems = Math.max(this.completedProblems, this.currentProblem + 1);
    this.updateProblemDisplay();
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
  console.log('Initializing Exponent Learning App...');
  window.app = new ExponentApp();
  console.log('App initialized successfully!');
});

// Handle window resize
window.addEventListener('resize', () => {
  if (window.app && window.app.setupCanvases) {
    setTimeout(() => window.app.setupCanvases(), 100);
  }
});