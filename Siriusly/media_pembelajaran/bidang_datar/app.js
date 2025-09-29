// Bidang Datar Learning Application
class BidangDatarApp {
  constructor() {
    this.currentSection = 'beranda';
    this.currentShape = 'square';
    this.currentPropertyShape = 'square';
    this.currentSymmetryShape = 'square';
    this.constructionTool = 'compass';
    
    // Shape data from JSON
    this.shapeData = {
      square: {
        name: "Persegi",
        formula: "L = s², K = 4s",
        description: "Bangun datar segiempat dengan keempat sisi sama panjang dan keempat sudut siku-siku",
        properties: ["Keempat sisi sama panjang", "Keempat sudutnya siku-siku", "Diagonal sama panjang dan berpotongan tegak lurus", "Memiliki 4 sumbu simetri"],
        examples: "Papan catur, kertas origami, keramik lantai, jendela persegi",
        sides: 4, angles: 4, symmetry: 4, diagonals: "2 diagonal sama panjang"
      },
      rectangle: {
        name: "Persegi Panjang", 
        formula: "L = p × l, K = 2(p + l)",
        description: "Bangun datar segiempat dengan sisi berhadapan sama panjang dan keempat sudut siku-siku",
        properties: ["Sisi berhadapan sama panjang dan sejajar", "Keempat sudutnya siku-siku", "Diagonal sama panjang", "Memiliki 2 sumbu simetri"],
        examples: "Pintu, buku, layar TV, meja persegi panjang",
        sides: 4, angles: 4, symmetry: 2, diagonals: "2 diagonal sama panjang"
      },
      triangle: {
        name: "Segitiga",
        formula: "L = ½ × a × t, K = a + b + c", 
        description: "Bangun datar yang dibentuk oleh tiga garis lurus yang bertemu di tiga titik",
        properties: ["Jumlah sudut = 180°", "Memiliki 3 sisi dan 3 sudut", "Dapat berbentuk sama sisi, sama kaki, atau sembarang", "Sisi terpanjang berhadapan dengan sudut terbesar"],
        examples: "Atap rumah, bendera segitiga, penggaris segitiga, rambu lalu lintas",
        sides: 3, angles: 3, symmetry: 3, diagonals: "Tidak ada diagonal"
      },
      circle: {
        name: "Lingkaran",
        formula: "L = πr², K = 2πr",
        description: "Bangun datar yang dibentuk oleh himpunan titik-titik yang berjarak sama dari suatu titik pusat",
        properties: ["Tidak memiliki sudut", "Semua titik pada lingkaran berjarak sama dari pusat", "Memiliki tak terhingga sumbu simetri", "Diameter = 2 × radius"],
        examples: "Roda, jam dinding, piring, koin",
        sides: 0, angles: 0, symmetry: "∞", diagonals: "Tidak berlaku"
      },
      parallelogram: {
        name: "Jajar Genjang",
        formula: "L = a × t, K = 2(a + b)",
        description: "Bangun datar segiempat dengan sisi berhadapan sejajar dan sama panjang",
        properties: ["Sisi berhadapan sejajar dan sama panjang", "Sudut berhadapan sama besar", "Diagonal berpotongan di tengah", "Tidak memiliki sumbu simetri"],
        examples: "Atap rumah miring, papan tulis miring, permukaan meja miring",
        sides: 4, angles: 4, symmetry: 0, diagonals: "2 diagonal berbeda panjang"
      },
      rhombus: {
        name: "Belah Ketupat",
        formula: "L = ½ × d₁ × d₂, K = 4s",
        description: "Bangun datar segiempat dengan keempat sisi sama panjang",
        properties: ["Keempat sisi sama panjang", "Sudut berhadapan sama besar", "Diagonal berpotongan tegak lurus", "Memiliki 2 sumbu simetri"],
        examples: "Ketupat tradisional, berlian, rambu jalan belah ketupat",
        sides: 4, angles: 4, symmetry: 2, diagonals: "2 diagonal berpotongan tegak lurus"
      },
      kite: {
        name: "Layang-layang",
        formula: "L = ½ × d₁ × d₂, K = 2(a + b)",
        description: "Bangun datar segiempat dengan dua pasang sisi berdekatan sama panjang",
        properties: ["Dua pasang sisi berdekatan sama panjang", "Satu diagonal membagi sudut sama besar", "Diagonal berpotongan tegak lurus", "Memiliki 1 sumbu simetri"],
        examples: "Layang-layang mainan, wau tradisional, bentuk kristal",
        sides: 4, angles: 4, symmetry: 1, diagonals: "2 diagonal berpotongan tegak lurus"
      },
      trapezoid: {
        name: "Trapesium",
        formula: "L = ½ × (a + b) × t, K = a + b + c + d",
        description: "Bangun datar segiempat dengan sepasang sisi berhadapan sejajar",
        properties: ["Sepasang sisi berhadapan sejajar", "Sudut pada sisi sejajar berjumlah 180°", "Memiliki tinggi tegak lurus", "Dapat berbentuk siku-siku atau sama kaki"],
        examples: "Atap rumah trapesium, meja trapesium, bendungan",
        sides: 4, angles: 4, symmetry: "0-1", diagonals: "2 diagonal tidak sama panjang"
      }
    };
    
    // Practice problems
    this.problems = [
      {
        id: 1,
        question: "Sebuah persegi memiliki sisi 8 cm. Hitunglah luasnya!",
        answer: "64",
        hint: "Gunakan rumus luas persegi: L = s × s = s²",
        solution: "L = s² = 8² = 64 cm²"
      },
      {
        id: 2,
        question: "Persegi panjang dengan panjang 12 cm dan lebar 8 cm. Hitunglah kelilingnya!",
        answer: "40",
        hint: "Gunakan rumus keliling persegi panjang: K = 2(p + l)",
        solution: "K = 2(p + l) = 2(12 + 8) = 2(20) = 40 cm"
      },
      {
        id: 3,
        question: "Segitiga dengan alas 10 cm dan tinggi 6 cm. Hitunglah luasnya!",
        answer: "30",
        hint: "Gunakan rumus luas segitiga: L = ½ × alas × tinggi",
        solution: "L = ½ × a × t = ½ × 10 × 6 = 30 cm²"
      },
      {
        id: 4,
        question: "Lingkaran dengan jari-jari 7 cm. Hitunglah luasnya! (π = 22/7)",
        answer: "154",
        hint: "Gunakan rumus luas lingkaran: L = πr²",
        solution: "L = πr² = (22/7) × 7² = (22/7) × 49 = 154 cm²"
      },
      {
        id: 5,
        question: "Berapa banyak sumbu simetri yang dimiliki persegi?",
        answer: "4",
        hint: "Hitung garis yang dapat membagi persegi menjadi dua bagian yang sama",
        solution: "Persegi memiliki 4 sumbu simetri: 2 diagonal dan 2 garis tengah"
      },
      {
        id: 6,
        question: "Luas persegi panjang 48 cm² dengan panjang 8 cm. Berapakah lebarnya?",
        answer: "6",
        hint: "Gunakan rumus L = p × l, maka l = L ÷ p",
        solution: "l = L ÷ p = 48 ÷ 8 = 6 cm"
      },
      {
        id: 7,
        question: "Keliling lingkaran 44 cm. Hitunglah jari-jarinya! (π = 22/7)",
        answer: "7",
        hint: "Gunakan rumus K = 2πr, maka r = K ÷ (2π)",
        solution: "r = K ÷ (2π) = 44 ÷ (2 × 22/7) = 44 ÷ (44/7) = 7 cm"
      },
      {
        id: 8,
        question: "Bangun datar yang memiliki 3 sisi dan jumlah sudut 180° adalah...",
        answer: "segitiga",
        hint: "Pikirkan bangun dengan 3 sisi",
        solution: "Segitiga adalah bangun datar dengan 3 sisi dan jumlah sudut 180°"
      }
    ];
    
    this.currentProblem = 0;
    this.score = 0;
    this.correctAnswers = 0;
    this.wrongAnswers = 0;
    this.completedProblems = 0;
    
    // Construction points
    this.constructionPoints = [];
    this.constructionLines = [];
    this.constructionArcs = [];
    
    this.init();
  }
  
  init() {
    console.log('Initializing Bidang Datar App...');
    this.setupEventListeners();
    this.showSection('beranda');
    
    // Initialize canvases after DOM is ready
    setTimeout(() => {
      this.setupCanvases();
      this.updateProblemDisplay();
      this.updateShapeDisplay();
      this.updatePropertyDisplay();
      this.updateCalculatorInputs();
    }, 100);
  }
  
  setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Navigation
    document.querySelectorAll('[data-section]').forEach(element => {
      element.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const section = element.getAttribute('data-section');
        if (section) {
          console.log('Navigation clicked:', section);
          this.showSection(section);
        }
      });
    });
    
    this.setupControlEventListeners();
  }
  
  setupControlEventListeners() {
    // Shape type buttons
    document.querySelectorAll('.shape-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const shape = btn.getAttribute('data-shape');
        if (shape) {
          console.log('Shape selected:', shape);
          this.showShape(shape);
        }
      });
    });
    
    // Property shape buttons
    document.querySelectorAll('.property-shape-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const shape = btn.getAttribute('data-prop-shape');
        if (shape) {
          console.log('Property shape selected:', shape);
          this.showPropertyShape(shape);
        }
      });
    });
    
    // Calculator shape selector
    const calcShape = document.getElementById('calc-shape');
    if (calcShape) {
      calcShape.addEventListener('change', () => {
        this.updateCalculatorInputs();
      });
    }
    
    // Calculate button
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
      calculateBtn.addEventListener('click', () => this.calculateAreaPerimeter());
    }
    
    // Advanced calculator
    const advancedCalculateBtn = document.getElementById('advanced-calculate');
    if (advancedCalculateBtn) {
      advancedCalculateBtn.addEventListener('click', () => this.performAdvancedCalculation());
    }
    
    // Construction tools
    this.setupConstructionControls();
    
    // Symmetry controls
    this.setupSymmetryControls();
    
    // Application calculators
    this.setupApplicationCalculators();
    
    // Practice problems
    this.setupPracticeControls();
  }
  
  setupConstructionControls() {
    // Tool buttons
    document.querySelectorAll('.tool-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tool = btn.id.replace('-tool', '').replace('tool-', '');
        if (tool === 'clear') {
          this.clearConstruction();
        } else {
          this.selectConstructionTool(tool);
        }
      });
    });
    
    // Instruction tabs
    document.querySelectorAll('.instruction-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        const instruction = btn.getAttribute('data-instruction');
        this.showInstruction(instruction);
      });
    });
    
    // Canvas interaction
    const constructionCanvas = document.getElementById('construction-canvas');
    if (constructionCanvas) {
      constructionCanvas.addEventListener('click', (e) => {
        this.handleConstructionClick(e);
      });
    }
  }
  
  setupSymmetryControls() {
    const symmetryShape = document.getElementById('symmetry-shape');
    const rotationSlider = document.getElementById('rotation-slider');
    const showLineSymmetry = document.getElementById('show-line-symmetry');
    const showRotationCenter = document.getElementById('show-rotation-center');
    
    if (symmetryShape) {
      symmetryShape.addEventListener('change', () => {
        this.currentSymmetryShape = symmetryShape.value;
        this.drawSymmetry();
      });
    }
    
    if (rotationSlider) {
      rotationSlider.addEventListener('input', (e) => {
        const rotationValue = document.getElementById('rotation-value');
        if (rotationValue) {
          rotationValue.textContent = e.target.value + '°';
        }
        this.drawSymmetry();
      });
    }
    
    if (showLineSymmetry) {
      showLineSymmetry.addEventListener('change', () => this.drawSymmetry());
    }
    
    if (showRotationCenter) {
      showRotationCenter.addEventListener('change', () => this.drawSymmetry());
    }
  }
  
  setupApplicationCalculators() {
    const calculators = [
      { id: 'calc-architecture', method: 'calculateArchitecture' },
      { id: 'calc-art', method: 'calculateArt' },
      { id: 'calc-agriculture', method: 'calculateAgriculture' },
      { id: 'calc-sports', method: 'calculateSports' }
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
    this.updateShapeDisplay();
    this.updatePropertyDisplay();
    this.drawCalculationVisualization();
    this.initializeConstruction();
    this.drawSymmetry();
  }
  
  // Section navigation - FIXED
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
      console.log('Section displayed:', sectionName);
    } else {
      console.error('Section not found:', `${sectionName}-section`);
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
        this.updateShapeDisplay();
        break;
      case 'sifat':
        this.updatePropertyDisplay();
        break;
      case 'luas-keliling':
        this.updateCalculatorInputs();
        this.drawCalculationVisualization();
        break;
      case 'konstruksi':
        this.initializeConstruction();
        break;
      case 'simetri':
        this.drawSymmetry();
        break;
      case 'kalkulator':
        this.performAdvancedCalculation();
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
    
    // Draw multiple 2D shapes showcase
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Background grid
    this.drawGrid(ctx, width, height, 20);
    
    // Draw various shapes with labels
    const shapes = [
      { type: 'square', x: centerX - 200, y: centerY - 100, size: 60, color: '#1FB8CD' },
      { type: 'rectangle', x: centerX - 60, y: centerY - 100, size: 60, color: '#FFC185' },
      { type: 'triangle', x: centerX + 80, y: centerY - 100, size: 60, color: '#B4413C' },
      { type: 'circle', x: centerX + 200, y: centerY - 100, size: 30, color: '#ECEBD5' },
      { type: 'rhombus', x: centerX - 130, y: centerY + 60, size: 50, color: '#5D878F' },
      { type: 'trapezoid', x: centerX + 20, y: centerY + 60, size: 60, color: '#DB4545' },
      { type: 'hexagon', x: centerX + 150, y: centerY + 60, size: 40, color: '#D2BA4C' }
    ];
    
    shapes.forEach(shape => {
      this.drawShape(ctx, shape.type, shape.x, shape.y, shape.size, shape.color);
    });
    
    // Title
    ctx.fillStyle = '#21808D';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Berbagai Jenis Bidang Datar', centerX, 40);
    ctx.font = '16px Arial';
    ctx.fillText('Bentuk geometri 2 dimensi dengan luas dan keliling', centerX, 65);
    ctx.textAlign = 'left';
  }
  
  drawGrid(ctx, width, height, spacing) {
    ctx.strokeStyle = '#e8e8e8';
    ctx.lineWidth = 1;
    
    // Vertical lines
    for (let x = 0; x <= width; x += spacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    // Horizontal lines
    for (let y = 0; y <= height; y += spacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  }
  
  drawShape(ctx, type, x, y, size, color) {
    ctx.fillStyle = color;
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    
    switch (type) {
      case 'square':
        ctx.fillRect(x - size/2, y - size/2, size, size);
        ctx.strokeRect(x - size/2, y - size/2, size, size);
        this.drawLabel(ctx, 'Persegi', x, y + size/2 + 20);
        break;
        
      case 'rectangle':
        ctx.fillRect(x - size/2, y - size/3, size, size*2/3);
        ctx.strokeRect(x - size/2, y - size/3, size, size*2/3);
        this.drawLabel(ctx, 'Persegi Panjang', x, y + size/2 + 20);
        break;
        
      case 'triangle':
        ctx.beginPath();
        ctx.moveTo(x, y - size/2);
        ctx.lineTo(x - size/2, y + size/3);
        ctx.lineTo(x + size/2, y + size/3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        this.drawLabel(ctx, 'Segitiga', x, y + size/2 + 20);
        break;
        
      case 'circle':
        ctx.beginPath();
        ctx.arc(x, y, size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        this.drawLabel(ctx, 'Lingkaran', x, y + size + 20);
        break;
        
      case 'rhombus':
        ctx.beginPath();
        ctx.moveTo(x, y - size/2);
        ctx.lineTo(x + size/2, y);
        ctx.lineTo(x, y + size/2);
        ctx.lineTo(x - size/2, y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        this.drawLabel(ctx, 'Belah Ketupat', x, y + size/2 + 20);
        break;
        
      case 'trapezoid':
        ctx.beginPath();
        ctx.moveTo(x - size/3, y - size/3);
        ctx.lineTo(x + size/3, y - size/3);
        ctx.lineTo(x + size/2, y + size/3);
        ctx.lineTo(x - size/2, y + size/3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        this.drawLabel(ctx, 'Trapesium', x, y + size/2 + 20);
        break;
        
      case 'hexagon':
        const angle = Math.PI / 3;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const px = x + size * Math.cos(i * angle);
          const py = y + size * Math.sin(i * angle);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        this.drawLabel(ctx, 'Segi Enam', x, y + size + 20);
        break;
    }
  }
  
  drawLabel(ctx, text, x, y) {
    ctx.fillStyle = '#333';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(text, x, y);
    ctx.textAlign = 'left';
  }
  
  drawTheoryVisualization() {
    const canvas = document.getElementById('theory-visualization');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    // Draw 2D vs 3D comparison
    const centerX = width / 2;
    const centerY = height / 2;
    
    // 2D Shape (left side)
    ctx.fillStyle = '#1FB8CD';
    ctx.fillRect(50, centerY - 60, 120, 80);
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 3;
    ctx.strokeRect(50, centerY - 60, 120, 80);
    
    // Labels and dimensions
    ctx.fillStyle = '#333';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('BIDANG DATAR', 110, centerY - 80);
    ctx.fillText('(2 Dimensi)', 110, centerY - 65);
    
    // Dimension arrows
    ctx.strokeStyle = '#D2BA4C';
    ctx.lineWidth = 2;
    
    // Length arrow
    ctx.beginPath();
    ctx.moveTo(60, centerY + 50);
    ctx.lineTo(160, centerY + 50);
    ctx.stroke();
    this.drawArrow(ctx, 160, centerY + 50, 0);
    this.drawArrow(ctx, 60, centerY + 50, Math.PI);
    
    ctx.fillStyle = '#D2BA4C';
    ctx.font = '12px Arial';
    ctx.fillText('Panjang', 110, centerY + 65);
    
    // Width arrow
    ctx.strokeStyle = '#D2BA4C';
    ctx.beginPath();
    ctx.moveTo(35, centerY - 50);
    ctx.lineTo(35, centerY + 30);
    ctx.stroke();
    this.drawArrow(ctx, 35, centerY - 50, -Math.PI/2);
    this.drawArrow(ctx, 35, centerY + 30, Math.PI/2);
    
    ctx.save();
    ctx.translate(20, centerY - 10);
    ctx.rotate(-Math.PI/2);
    ctx.fillText('Lebar', 0, 0);
    ctx.restore();
    
    // Properties comparison
    ctx.font = '16px Arial';
    ctx.fillStyle = '#21808D';
    ctx.fillText('Karakteristik Bidang Datar:', centerX, height - 60);
    
    ctx.font = '12px Arial';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'left';
    ctx.fillText('• Hanya memiliki panjang dan lebar', 20, height - 40);
    ctx.fillText('• Tidak memiliki tinggi atau ketebalan', 20, height - 25);
    ctx.fillText('• Dapat dihitung luas dan kelilingnya', 20, height - 10);
    ctx.textAlign = 'left';
  }
  
  drawArrow(ctx, x, y, angle) {
    const headLength = 8;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-headLength, -headLength/2);
    ctx.lineTo(-headLength, headLength/2);
    ctx.closePath();
    ctx.fillStyle = '#D2BA4C';
    ctx.fill();
    ctx.restore();
  }
  
  // Shape types management - FIXED
  showShape(shape) {
    console.log('Setting current shape to:', shape);
    this.currentShape = shape;
    this.updateShapeDisplay();
  }
  
  updateShapeDisplay() {
    const shapeData = this.shapeData[this.currentShape];
    if (!shapeData) {
      console.error('Shape data not found for:', this.currentShape);
      return;
    }
    
    console.log('Updating shape display for:', this.currentShape);
    
    // Update shape buttons
    document.querySelectorAll('.shape-btn').forEach(btn => {
      btn.classList.remove('active', 'btn--primary');
      btn.classList.add('btn--outline');
      
      if (btn.getAttribute('data-shape') === this.currentShape) {
        btn.classList.remove('btn--outline');
        btn.classList.add('active', 'btn--primary');
      }
    });
    
    // Update display elements
    const titleEl = document.getElementById('shape-title');
    const formulaEl = document.getElementById('shape-formula');
    const descriptionEl = document.getElementById('shape-description');
    const propertiesEl = document.getElementById('shape-properties-list');
    const examplesEl = document.getElementById('shape-examples-text');
    
    if (titleEl) {
      titleEl.textContent = shapeData.name;
      console.log('Updated title:', shapeData.name);
    }
    if (formulaEl) formulaEl.textContent = shapeData.formula;
    if (descriptionEl) descriptionEl.textContent = shapeData.description;
    if (examplesEl) examplesEl.textContent = shapeData.examples;
    
    if (propertiesEl) {
      propertiesEl.innerHTML = shapeData.properties
        .map(prop => `<li>${prop}</li>`)
        .join('');
    }
    
    // Draw shape visualization
    this.drawShapeVisualization();
  }
  
  drawShapeVisualization() {
    const canvas = document.getElementById('shape-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    const centerX = width / 2;
    const centerY = height / 2;
    const size = 120;
    
    // Draw the selected shape with measurements
    ctx.fillStyle = 'rgba(31, 184, 205, 0.3)';
    ctx.strokeStyle = '#1FB8CD';
    ctx.lineWidth = 3;
    
    switch (this.currentShape) {
      case 'square':
        ctx.fillRect(centerX - size/2, centerY - size/2, size, size);
        ctx.strokeRect(centerX - size/2, centerY - size/2, size, size);
        this.drawDimensions(ctx, centerX, centerY, size, size, 's', 's');
        break;
        
      case 'rectangle':
        const rectWidth = size * 1.4;
        const rectHeight = size * 0.8;
        ctx.fillRect(centerX - rectWidth/2, centerY - rectHeight/2, rectWidth, rectHeight);
        ctx.strokeRect(centerX - rectWidth/2, centerY - rectHeight/2, rectWidth, rectHeight);
        this.drawDimensions(ctx, centerX, centerY, rectWidth, rectHeight, 'p', 'l');
        break;
        
      case 'triangle':
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - size/2);
        ctx.lineTo(centerX - size/2, centerY + size/3);
        ctx.lineTo(centerX + size/2, centerY + size/3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        this.drawTriangleDimensions(ctx, centerX, centerY, size);
        break;
        
      case 'circle':
        ctx.beginPath();
        ctx.arc(centerX, centerY, size/2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        this.drawCircleDimensions(ctx, centerX, centerY, size/2);
        break;
        
      case 'parallelogram':
        ctx.beginPath();
        ctx.moveTo(centerX - size/2 + 20, centerY - size/3);
        ctx.lineTo(centerX + size/2 + 20, centerY - size/3);
        ctx.lineTo(centerX + size/2 - 20, centerY + size/3);
        ctx.lineTo(centerX - size/2 - 20, centerY + size/3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        break;
        
      case 'rhombus':
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - size/2);
        ctx.lineTo(centerX + size/2, centerY);
        ctx.lineTo(centerX, centerY + size/2);
        ctx.lineTo(centerX - size/2, centerY);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        this.drawRhombusDiagonals(ctx, centerX, centerY, size);
        break;
        
      case 'kite':
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - size/2);
        ctx.lineTo(centerX + size/3, centerY);
        ctx.lineTo(centerX, centerY + size/1.5);
        ctx.lineTo(centerX - size/3, centerY);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        break;
        
      case 'trapezoid':
        ctx.beginPath();
        ctx.moveTo(centerX - size/3, centerY - size/3);
        ctx.lineTo(centerX + size/3, centerY - size/3);
        ctx.lineTo(centerX + size/2, centerY + size/3);
        ctx.lineTo(centerX - size/2, centerY + size/3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        break;
    }
  }
  
  drawDimensions(ctx, centerX, centerY, width, height, widthLabel, heightLabel) {
    ctx.strokeStyle = '#D2BA4C';
    ctx.lineWidth = 2;
    ctx.fillStyle = '#D2BA4C';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    
    // Width dimension
    const y1 = centerY + height/2 + 20;
    ctx.beginPath();
    ctx.moveTo(centerX - width/2, y1);
    ctx.lineTo(centerX + width/2, y1);
    ctx.stroke();
    this.drawArrow(ctx, centerX - width/2, y1, Math.PI);
    this.drawArrow(ctx, centerX + width/2, y1, 0);
    ctx.fillText(widthLabel, centerX, y1 + 15);
    
    // Height dimension
    const x1 = centerX + width/2 + 20;
    ctx.beginPath();
    ctx.moveTo(x1, centerY - height/2);
    ctx.lineTo(x1, centerY + height/2);
    ctx.stroke();
    this.drawArrow(ctx, x1, centerY - height/2, -Math.PI/2);
    this.drawArrow(ctx, x1, centerY + height/2, Math.PI/2);
    
    ctx.save();
    ctx.translate(x1 + 15, centerY);
    ctx.rotate(-Math.PI/2);
    ctx.fillText(heightLabel, 0, 0);
    ctx.restore();
  }
  
  drawTriangleDimensions(ctx, centerX, centerY, size) {
    ctx.strokeStyle = '#D2BA4C';
    ctx.lineWidth = 2;
    ctx.fillStyle = '#D2BA4C';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    
    // Base
    const baseY = centerY + size/3 + 20;
    ctx.beginPath();
    ctx.moveTo(centerX - size/2, baseY);
    ctx.lineTo(centerX + size/2, baseY);
    ctx.stroke();
    this.drawArrow(ctx, centerX - size/2, baseY, Math.PI);
    this.drawArrow(ctx, centerX + size/2, baseY, 0);
    ctx.fillText('alas (a)', centerX, baseY + 15);
    
    // Height
    ctx.strokeStyle = '#DB4545';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - size/2);
    ctx.lineTo(centerX, centerY + size/3);
    ctx.stroke();
    ctx.setLineDash([]);
    
    ctx.fillStyle = '#DB4545';
    ctx.save();
    ctx.translate(centerX - 20, centerY - 10);
    ctx.rotate(-Math.PI/2);
    ctx.fillText('tinggi (t)', 0, 0);
    ctx.restore();
  }
  
  drawCircleDimensions(ctx, centerX, centerY, radius) {
    ctx.strokeStyle = '#D2BA4C';
    ctx.lineWidth = 2;
    ctx.fillStyle = '#D2BA4C';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    
    // Radius line
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + radius, centerY);
    ctx.stroke();
    
    // Radius label
    ctx.fillText('r', centerX + radius/2, centerY - 10);
    
    // Center point
    ctx.beginPath();
    ctx.arc(centerX, centerY, 3, 0, 2 * Math.PI);
    ctx.fill();
  }
  
  drawRhombusDiagonals(ctx, centerX, centerY, size) {
    // Draw diagonals
    ctx.strokeStyle = '#DB4545';
    ctx.setLineDash([5, 5]);
    ctx.lineWidth = 2;
    
    // Diagonal 1 (vertical)
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - size/2);
    ctx.lineTo(centerX, centerY + size/2);
    ctx.stroke();
    
    // Diagonal 2 (horizontal)
    ctx.beginPath();
    ctx.moveTo(centerX - size/2, centerY);
    ctx.lineTo(centerX + size/2, centerY);
    ctx.stroke();
    
    ctx.setLineDash([]);
    
    // Labels
    ctx.fillStyle = '#DB4545';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('d₁', centerX + 10, centerY - size/4);
    ctx.fillText('d₂', centerX + size/4, centerY - 10);
  }
  
  // Property management - FIXED
  showPropertyShape(shape) {
    console.log('Setting current property shape to:', shape);
    this.currentPropertyShape = shape;
    this.updatePropertyDisplay();
  }
  
  updatePropertyDisplay() {
    const shapeData = this.shapeData[this.currentPropertyShape];
    if (!shapeData) {
      console.error('Property shape data not found for:', this.currentPropertyShape);
      return;
    }
    
    console.log('Updating property display for:', this.currentPropertyShape);
    
    // Update property shape buttons
    document.querySelectorAll('.property-shape-btn').forEach(btn => {
      btn.classList.remove('active', 'btn--primary');
      btn.classList.add('btn--outline');
      
      if (btn.getAttribute('data-prop-shape') === this.currentPropertyShape) {
        btn.classList.remove('btn--outline');
        btn.classList.add('active', 'btn--primary');
      }
    });
    
    // Update property display
    const nameEl = document.getElementById('property-shape-name');
    const sidesEl = document.getElementById('prop-sides');
    const anglesEl = document.getElementById('prop-angles');
    const symmetryEl = document.getElementById('prop-symmetry');
    const diagonalsEl = document.getElementById('prop-diagonals');
    
    if (nameEl) {
      nameEl.textContent = shapeData.name;
      console.log('Updated property name:', shapeData.name);
    }
    if (sidesEl) sidesEl.textContent = shapeData.sides;
    if (anglesEl) anglesEl.textContent = shapeData.angles;
    if (symmetryEl) symmetryEl.textContent = shapeData.symmetry;
    if (diagonalsEl) diagonalsEl.textContent = shapeData.diagonals;
    
    // Draw property visualization
    this.drawPropertyVisualization();
  }
  
  drawPropertyVisualization() {
    const canvas = document.getElementById('property-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    const centerX = width / 2;
    const centerY = height / 2;
    const size = 100;
    
    // Draw shape with properties highlighted
    this.drawShapeWithProperties(ctx, this.currentPropertyShape, centerX, centerY, size);
  }
  
  drawShapeWithProperties(ctx, shapeType, centerX, centerY, size) {
    ctx.fillStyle = 'rgba(31, 184, 205, 0.2)';
    ctx.strokeStyle = '#1FB8CD';
    ctx.lineWidth = 3;
    
    switch (shapeType) {
      case 'square':
        // Draw square
        ctx.fillRect(centerX - size/2, centerY - size/2, size, size);
        ctx.strokeRect(centerX - size/2, centerY - size/2, size, size);
        
        // Draw symmetry lines
        ctx.strokeStyle = '#DB4545';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        
        // Vertical symmetry
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - size/2);
        ctx.lineTo(centerX, centerY + size/2);
        ctx.stroke();
        
        // Horizontal symmetry
        ctx.beginPath();
        ctx.moveTo(centerX - size/2, centerY);
        ctx.lineTo(centerX + size/2, centerY);
        ctx.stroke();
        
        // Diagonal symmetries
        ctx.beginPath();
        ctx.moveTo(centerX - size/2, centerY - size/2);
        ctx.lineTo(centerX + size/2, centerY + size/2);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(centerX + size/2, centerY - size/2);
        ctx.lineTo(centerX - size/2, centerY + size/2);
        ctx.stroke();
        
        ctx.setLineDash([]);
        break;
        
      case 'rectangle':
        // Draw rectangle
        const rectWidth = size * 1.3;
        const rectHeight = size * 0.7;
        ctx.fillRect(centerX - rectWidth/2, centerY - rectHeight/2, rectWidth, rectHeight);
        ctx.strokeRect(centerX - rectWidth/2, centerY - rectHeight/2, rectWidth, rectHeight);
        
        // Draw symmetry lines
        ctx.strokeStyle = '#DB4545';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        
        // Vertical symmetry
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - rectHeight/2);
        ctx.lineTo(centerX, centerY + rectHeight/2);
        ctx.stroke();
        
        // Horizontal symmetry
        ctx.beginPath();
        ctx.moveTo(centerX - rectWidth/2, centerY);
        ctx.lineTo(centerX + rectWidth/2, centerY);
        ctx.stroke();
        
        ctx.setLineDash([]);
        break;
        
      case 'triangle':
        // Draw equilateral triangle
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - size/2);
        ctx.lineTo(centerX - size/2, centerY + size/3);
        ctx.lineTo(centerX + size/2, centerY + size/3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // Draw symmetry lines for equilateral triangle
        ctx.strokeStyle = '#DB4545';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        
        // Three symmetry lines
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - size/2);
        ctx.lineTo(centerX, centerY + size/3);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(centerX - size/2, centerY + size/3);
        ctx.lineTo(centerX + size/4, centerY - size/4);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(centerX + size/2, centerY + size/3);
        ctx.lineTo(centerX - size/4, centerY - size/4);
        ctx.stroke();
        
        ctx.setLineDash([]);
        break;
        
      case 'circle':
        // Draw circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, size/2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        
        // Show infinite symmetry by drawing several lines
        ctx.strokeStyle = '#DB4545';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        
        for (let i = 0; i < 8; i++) {
          const angle = (i * Math.PI) / 4;
          const x1 = centerX + (size/2) * Math.cos(angle);
          const y1 = centerY + (size/2) * Math.sin(angle);
          const x2 = centerX - (size/2) * Math.cos(angle);
          const y2 = centerY - (size/2) * Math.sin(angle);
          
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
        
        ctx.setLineDash([]);
        break;
    }
  }
  
  // Calculation functions
  updateCalculatorInputs() {
    const calcShape = document.getElementById('calc-shape');
    const inputsContainer = document.getElementById('calc-inputs');
    
    if (!calcShape || !inputsContainer) return;
    
    const selectedShape = calcShape.value;
    inputsContainer.innerHTML = '';
    
    switch (selectedShape) {
      case 'square':
        inputsContainer.innerHTML = `
          <div class="input-group">
            <label class="form-label">Panjang sisi (s) cm:</label>
            <input type="number" id="square-side" class="form-control" value="5" step="0.1">
          </div>
        `;
        break;
        
      case 'rectangle':
        inputsContainer.innerHTML = `
          <div class="input-group">
            <label class="form-label">Panjang (p) cm:</label>
            <input type="number" id="rect-length" class="form-control" value="8" step="0.1">
          </div>
          <div class="input-group">
            <label class="form-label">Lebar (l) cm:</label>
            <input type="number" id="rect-width" class="form-control" value="5" step="0.1">
          </div>
        `;
        break;
        
      case 'triangle':
        inputsContainer.innerHTML = `
          <div class="input-group">
            <label class="form-label">Alas (a) cm:</label>
            <input type="number" id="triangle-base" class="form-control" value="6" step="0.1">
          </div>
          <div class="input-group">
            <label class="form-label">Tinggi (t) cm:</label>
            <input type="number" id="triangle-height" class="form-control" value="4" step="0.1">
          </div>
        `;
        break;
        
      case 'circle':
        inputsContainer.innerHTML = `
          <div class="input-group">
            <label class="form-label">Jari-jari (r) cm:</label>
            <input type="number" id="circle-radius" class="form-control" value="7" step="0.1">
          </div>
        `;
        break;
        
      case 'parallelogram':
        inputsContainer.innerHTML = `
          <div class="input-group">
            <label class="form-label">Alas (a) cm:</label>
            <input type="number" id="para-base" class="form-control" value="8" step="0.1">
          </div>
          <div class="input-group">
            <label class="form-label">Tinggi (t) cm:</label>
            <input type="number" id="para-height" class="form-control" value="5" step="0.1">
          </div>
        `;
        break;
        
      case 'rhombus':
        inputsContainer.innerHTML = `
          <div class="input-group">
            <label class="form-label">Diagonal 1 (d₁) cm:</label>
            <input type="number" id="rhombus-d1" class="form-control" value="8" step="0.1">
          </div>
          <div class="input-group">
            <label class="form-label">Diagonal 2 (d₂) cm:</label>
            <input type="number" id="rhombus-d2" class="form-control" value="6" step="0.1">
          </div>
        `;
        break;
    }
  }
  
  calculateAreaPerimeter() {
    const calcShape = document.getElementById('calc-shape');
    const resultEl = document.getElementById('calc-result');
    
    if (!calcShape || !resultEl) return;
    
    const selectedShape = calcShape.value;
    let area = 0, perimeter = 0, steps = '';
    
    try {
      switch (selectedShape) {
        case 'square':
          const s = parseFloat(document.getElementById('square-side').value);
          area = s * s;
          perimeter = 4 * s;
          steps = `
            <h4>🔹 Perhitungan Persegi</h4>
            <p><strong>Diketahui:</strong> sisi (s) = ${s} cm</p>
            <p><strong>Luas:</strong> L = s² = ${s}² = ${area} cm²</p>
            <p><strong>Keliling:</strong> K = 4s = 4 × ${s} = ${perimeter} cm</p>
          `;
          break;
          
        case 'rectangle':
          const p = parseFloat(document.getElementById('rect-length').value);
          const l = parseFloat(document.getElementById('rect-width').value);
          area = p * l;
          perimeter = 2 * (p + l);
          steps = `
            <h4>🔸 Perhitungan Persegi Panjang</h4>
            <p><strong>Diketahui:</strong> panjang (p) = ${p} cm, lebar (l) = ${l} cm</p>
            <p><strong>Luas:</strong> L = p × l = ${p} × ${l} = ${area} cm²</p>
            <p><strong>Keliling:</strong> K = 2(p + l) = 2(${p} + ${l}) = ${perimeter} cm</p>
          `;
          break;
          
        case 'triangle':
          const a = parseFloat(document.getElementById('triangle-base').value);
          const t = parseFloat(document.getElementById('triangle-height').value);
          area = 0.5 * a * t;
          perimeter = 'Perlu panjang ketiga sisi';
          steps = `
            <h4>🔺 Perhitungan Segitiga</h4>
            <p><strong>Diketahui:</strong> alas (a) = ${a} cm, tinggi (t) = ${t} cm</p>
            <p><strong>Luas:</strong> L = ½ × a × t = ½ × ${a} × ${t} = ${area} cm²</p>
            <p><strong>Keliling:</strong> Membutuhkan panjang ketiga sisi untuk dihitung</p>
          `;
          break;
          
        case 'circle':
          const r = parseFloat(document.getElementById('circle-radius').value);
          area = Math.PI * r * r;
          perimeter = 2 * Math.PI * r;
          steps = `
            <h4>⭕ Perhitungan Lingkaran</h4>
            <p><strong>Diketahui:</strong> jari-jari (r) = ${r} cm</p>
            <p><strong>Luas:</strong> L = πr² = π × ${r}² = ${area.toFixed(2)} cm²</p>
            <p><strong>Keliling:</strong> K = 2πr = 2 × π × ${r} = ${perimeter.toFixed(2)} cm</p>
          `;
          break;
          
        case 'parallelogram':
          const paraBase = parseFloat(document.getElementById('para-base').value);
          const paraHeight = parseFloat(document.getElementById('para-height').value);
          area = paraBase * paraHeight;
          steps = `
            <h4>🔷 Perhitungan Jajar Genjang</h4>
            <p><strong>Diketahui:</strong> alas (a) = ${paraBase} cm, tinggi (t) = ${paraHeight} cm</p>
            <p><strong>Luas:</strong> L = a × t = ${paraBase} × ${paraHeight} = ${area} cm²</p>
            <p><strong>Keliling:</strong> Membutuhkan panjang sisi miring untuk perhitungan lengkap</p>
          `;
          break;
          
        case 'rhombus':
          const d1 = parseFloat(document.getElementById('rhombus-d1').value);
          const d2 = parseFloat(document.getElementById('rhombus-d2').value);
          area = 0.5 * d1 * d2;
          steps = `
            <h4>💎 Perhitungan Belah Ketupat</h4>
            <p><strong>Diketahui:</strong> diagonal 1 (d₁) = ${d1} cm, diagonal 2 (d₂) = ${d2} cm</p>
            <p><strong>Luas:</strong> L = ½ × d₁ × d₂ = ½ × ${d1} × ${d2} = ${area} cm²</p>
            <p><strong>Keliling:</strong> K = 4s (membutuhkan panjang sisi)</p>
          `;
          break;
      }
      
      resultEl.innerHTML = `
        <div style="color: var(--color-success);">
          ${steps}
        </div>
      `;
    } catch (error) {
      resultEl.innerHTML = `
        <div style="color: var(--color-error);">
          <p>❌ Terjadi kesalahan dalam perhitungan. Periksa input Anda.</p>
        </div>
      `;
    }
    
    // Update visualization
    this.drawCalculationVisualization();
  }
  
  drawCalculationVisualization() {
    const canvas = document.getElementById('calc-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Draw the shape being calculated
    const calcShape = document.getElementById('calc-shape');
    if (calcShape) {
      const selectedShape = calcShape.value;
      this.drawCalculatedShape(ctx, selectedShape, centerX, centerY);
    }
  }
  
  drawCalculatedShape(ctx, shapeType, centerX, centerY) {
    ctx.fillStyle = 'rgba(31, 184, 205, 0.3)';
    ctx.strokeStyle = '#1FB8CD';
    ctx.lineWidth = 3;
    
    const size = 120;
    
    switch (shapeType) {
      case 'square':
        const sideInput = document.getElementById('square-side');
        if (sideInput) {
          const side = parseFloat(sideInput.value) * 4; // Scale for visualization
          ctx.fillRect(centerX - side/2, centerY - side/2, side, side);
          ctx.strokeRect(centerX - side/2, centerY - side/2, side, side);
        }
        break;
        
      case 'rectangle':
        const lengthInput = document.getElementById('rect-length');
        const widthInput = document.getElementById('rect-width');
        if (lengthInput && widthInput) {
          const length = parseFloat(lengthInput.value) * 6;
          const width = parseFloat(widthInput.value) * 6;
          ctx.fillRect(centerX - length/2, centerY - width/2, length, width);
          ctx.strokeRect(centerX - length/2, centerY - width/2, length, width);
        }
        break;
        
      case 'circle':
        const radiusInput = document.getElementById('circle-radius');
        if (radiusInput) {
          const radius = parseFloat(radiusInput.value) * 6;
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
          ctx.fill();
          ctx.stroke();
        }
        break;
        
      // Add other shapes as needed
    }
  }
  
  // Advanced calculator
  performAdvancedCalculation() {
    const calcType = document.getElementById('calc-type');
    const resultEl = document.getElementById('calculator-result');
    
    if (!calcType || !resultEl) return;
    
    const type = calcType.value;
    
    switch (type) {
      case 'single':
        resultEl.innerHTML = `
          <div>
            <h4>Perhitungan Bangun Tunggal</h4>
            <p>Pilih bangun pada bagian "Luas & Keliling" untuk perhitungan detail.</p>
          </div>
        `;
        break;
        
      case 'composite':
        resultEl.innerHTML = `
          <div>
            <h4>Perhitungan Bangun Gabungan</h4>
            <p>Contoh: Luas persegi panjang + setengah lingkaran</p>
            <p><strong>Langkah:</strong></p>
            <ol>
              <li>Hitung luas masing-masing bangun</li>
              <li>Jumlahkan semua luas</li>
              <li>Untuk keliling: perhatikan sisi yang bertemu</li>
            </ol>
          </div>
        `;
        break;
        
      case 'compare':
        resultEl.innerHTML = `
          <div>
            <h4>Perbandingan Bangun</h4>
            <p>Membandingkan luas dan keliling dua bangun berbeda</p>
            <p><strong>Contoh perbandingan:</strong></p>
            <ul>
              <li>Persegi sisi 4 cm: L = 16 cm², K = 16 cm</li>
              <li>Lingkaran r = 2.26 cm: L ≈ 16 cm², K ≈ 14.2 cm</li>
              <li>Kesimpulan: Luas sama, keliling lingkaran lebih kecil</li>
            </ul>
          </div>
        `;
        break;
    }
  }
  
  // Construction tools
  selectConstructionTool(tool) {
    this.constructionTool = tool;
    
    // Update active tool button
    document.querySelectorAll('.tool-btn').forEach(btn => {
      btn.classList.remove('active', 'btn--primary');
      btn.classList.add('btn--outline');
      
      if (btn.id === `${tool}-tool`) {
        btn.classList.remove('btn--outline');
        btn.classList.add('active', 'btn--primary');
      }
    });
  }
  
  clearConstruction() {
    this.constructionPoints = [];
    this.constructionLines = [];
    this.constructionArcs = [];
    this.initializeConstruction();
  }
  
  initializeConstruction() {
    const canvas = document.getElementById('construction-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid
    this.drawConstructionGrid(ctx, canvas.width, canvas.height);
  }
  
  drawConstructionGrid(ctx, width, height) {
    ctx.strokeStyle = '#f0f0f0';
    ctx.lineWidth = 1;
    
    const spacing = 20;
    
    // Vertical lines
    for (let x = 0; x <= width; x += spacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    // Horizontal lines
    for (let y = 0; y <= height; y += spacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  }
  
  handleConstructionClick(e) {
    const canvas = document.getElementById('construction-canvas');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    switch (this.constructionTool) {
      case 'compass':
        this.handleCompassClick(x, y);
        break;
      case 'ruler':
        this.handleRulerClick(x, y);
        break;
      case 'protractor':
        this.handleProtractorClick(x, y);
        break;
    }
  }
  
  handleCompassClick(x, y) {
    const canvas = document.getElementById('construction-canvas');
    const ctx = canvas.getContext('2d');
    
    if (this.constructionPoints.length % 2 === 0) {
      // First point - center of arc
      this.constructionPoints.push({ x, y, type: 'center' });
      
      // Draw center point
      ctx.fillStyle = '#DB4545';
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, 2 * Math.PI);
      ctx.fill();
    } else {
      // Second point - determines radius
      const centerPoint = this.constructionPoints[this.constructionPoints.length - 1];
      const radius = Math.sqrt((x - centerPoint.x) ** 2 + (y - centerPoint.y) ** 2);
      
      // Draw arc
      ctx.strokeStyle = '#1FB8CD';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerPoint.x, centerPoint.y, radius, 0, 2 * Math.PI);
      ctx.stroke();
      
      this.constructionArcs.push({
        center: centerPoint,
        radius: radius
      });
    }
  }
  
  handleRulerClick(x, y) {
    const canvas = document.getElementById('construction-canvas');
    const ctx = canvas.getContext('2d');
    
    this.constructionPoints.push({ x, y, type: 'line' });
    
    // Draw point
    ctx.fillStyle = '#D2BA4C';
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, 2 * Math.PI);
    ctx.fill();
    
    if (this.constructionPoints.filter(p => p.type === 'line').length >= 2) {
      const linePoints = this.constructionPoints.filter(p => p.type === 'line').slice(-2);
      
      // Draw line
      ctx.strokeStyle = '#D2BA4C';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(linePoints[0].x, linePoints[0].y);
      ctx.lineTo(linePoints[1].x, linePoints[1].y);
      ctx.stroke();
      
      this.constructionLines.push({
        start: linePoints[0],
        end: linePoints[1]
      });
    }
  }
  
  handleProtractorClick(x, y) {
    // Simple protractor functionality - draw angle measurement
    const canvas = document.getElementById('construction-canvas');
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#5D878F';
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fill();
  }
  
  showInstruction(instructionType) {
    // Update active instruction tab
    document.querySelectorAll('.instruction-tab').forEach(btn => {
      btn.classList.remove('active', 'btn--primary');
      btn.classList.add('btn--outline');
      
      if (btn.getAttribute('data-instruction') === instructionType) {
        btn.classList.remove('btn--outline');
        btn.classList.add('active', 'btn--primary');
      }
    });
    
    const contentEl = document.getElementById('instruction-content');
    if (!contentEl) return;
    
    switch (instructionType) {
      case 'perpendicular':
        contentEl.innerHTML = `
          <h4>Membuat Garis Tegak Lurus</h4>
          <ol>
            <li>Pilih jangka dan klik pada ujung pertama garis</li>
            <li>Klik di tempat lain untuk membuat busur</li>
            <li>Klik pada ujung kedua garis dengan jari-jari sama</li>
            <li>Klik di tempat lain untuk membuat busur kedua</li>
            <li>Pilih penggaris dan hubungkan perpotongan busur</li>
          </ol>
        `;
        break;
        
      case 'bisector':
        contentEl.innerHTML = `
          <h4>Membuat Pembagi Sudut</h4>
          <ol>
            <li>Pilih jangka dan klik pada titik sudut</li>
            <li>Buat busur yang memotong kedua sisi sudut</li>
            <li>Dari titik potong pertama, buat busur ke dalam sudut</li>
            <li>Dari titik potong kedua, buat busur dengan jari-jari sama</li>
            <li>Hubungkan titik sudut dengan perpotongan busur</li>
          </ol>
        `;
        break;
        
      case 'triangle':
        contentEl.innerHTML = `
          <h4>Membuat Segitiga dari Tiga Sisi</h4>
          <ol>
            <li>Gunakan penggaris untuk membuat sisi pertama</li>
            <li>Dari ujung kiri, gunakan jangka dengan panjang sisi kedua</li>
            <li>Dari ujung kanan, gunakan jangka dengan panjang sisi ketiga</li>
            <li>Hubungkan perpotongan busur dengan kedua ujung</li>
          </ol>
        `;
        break;
    }
  }
  
  // Symmetry functions
  drawSymmetry() {
    const canvas = document.getElementById('symmetry-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    const centerX = width / 2;
    const centerY = height / 2;
    const size = 100;
    
    const rotation = parseFloat(document.getElementById('rotation-slider')?.value || 0);
    const showLineSymmetry = document.getElementById('show-line-symmetry')?.checked;
    const showRotationCenter = document.getElementById('show-rotation-center')?.checked;
    
    // Draw the shape with rotation
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.translate(-centerX, -centerY);
    
    this.drawSymmetryShape(ctx, this.currentSymmetryShape, centerX, centerY, size);
    
    ctx.restore();
    
    // Draw symmetry lines
    if (showLineSymmetry) {
      this.drawSymmetryLines(ctx, this.currentSymmetryShape, centerX, centerY, size);
    }
    
    // Draw rotation center
    if (showRotationCenter) {
      ctx.fillStyle = '#DB4545';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
  
  drawSymmetryShape(ctx, shapeType, centerX, centerY, size) {
    ctx.fillStyle = 'rgba(31, 184, 205, 0.4)';
    ctx.strokeStyle = '#1FB8CD';
    ctx.lineWidth = 3;
    
    switch (shapeType) {
      case 'square':
        ctx.fillRect(centerX - size/2, centerY - size/2, size, size);
        ctx.strokeRect(centerX - size/2, centerY - size/2, size, size);
        break;
        
      case 'rectangle':
        const rectWidth = size * 1.3;
        const rectHeight = size * 0.7;
        ctx.fillRect(centerX - rectWidth/2, centerY - rectHeight/2, rectWidth, rectHeight);
        ctx.strokeRect(centerX - rectWidth/2, centerY - rectHeight/2, rectWidth, rectHeight);
        break;
        
      case 'triangle':
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - size/2);
        ctx.lineTo(centerX - size/2, centerY + size/3);
        ctx.lineTo(centerX + size/2, centerY + size/3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        break;
        
      case 'circle':
        ctx.beginPath();
        ctx.arc(centerX, centerY, size/2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        break;
        
      case 'rhombus':
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - size/2);
        ctx.lineTo(centerX + size/2, centerY);
        ctx.lineTo(centerX, centerY + size/2);
        ctx.lineTo(centerX - size/2, centerY);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        break;
    }
  }
  
  drawSymmetryLines(ctx, shapeType, centerX, centerY, size) {
    ctx.strokeStyle = '#DB4545';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    
    switch (shapeType) {
      case 'square':
        // 4 symmetry lines
        // Vertical
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - size);
        ctx.lineTo(centerX, centerY + size);
        ctx.stroke();
        
        // Horizontal
        ctx.beginPath();
        ctx.moveTo(centerX - size, centerY);
        ctx.lineTo(centerX + size, centerY);
        ctx.stroke();
        
        // Diagonal 1
        ctx.beginPath();
        ctx.moveTo(centerX - size, centerY - size);
        ctx.lineTo(centerX + size, centerY + size);
        ctx.stroke();
        
        // Diagonal 2
        ctx.beginPath();
        ctx.moveTo(centerX + size, centerY - size);
        ctx.lineTo(centerX - size, centerY + size);
        ctx.stroke();
        break;
        
      case 'rectangle':
        // 2 symmetry lines
        // Vertical
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - size);
        ctx.lineTo(centerX, centerY + size);
        ctx.stroke();
        
        // Horizontal
        ctx.beginPath();
        ctx.moveTo(centerX - size, centerY);
        ctx.lineTo(centerX + size, centerY);
        ctx.stroke();
        break;
        
      case 'triangle':
        // 3 symmetry lines for equilateral triangle
        for (let i = 0; i < 3; i++) {
          const angle = (i * Math.PI * 2) / 3 - Math.PI / 2;
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(
            centerX + size * Math.cos(angle),
            centerY + size * Math.sin(angle)
          );
          ctx.stroke();
        }
        break;
        
      case 'circle':
        // Show several symmetry lines (infinite)
        for (let i = 0; i < 8; i++) {
          const angle = (i * Math.PI) / 4;
          ctx.beginPath();
          ctx.moveTo(
            centerX + size * Math.cos(angle),
            centerY + size * Math.sin(angle)
          );
          ctx.lineTo(
            centerX - size * Math.cos(angle),
            centerY - size * Math.sin(angle)
          );
          ctx.stroke();
        }
        break;
        
      case 'rhombus':
        // 2 symmetry lines (diagonals)
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - size);
        ctx.lineTo(centerX, centerY + size);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(centerX - size, centerY);
        ctx.lineTo(centerX + size, centerY);
        ctx.stroke();
        break;
    }
    
    ctx.setLineDash([]);
  }
  
  // Application calculators
  calculateArchitecture() {
    const length = parseFloat(document.getElementById('room-length')?.value || 8);
    const width = parseFloat(document.getElementById('room-width')?.value || 6);
    const tileSize = parseFloat(document.getElementById('tile-size')?.value || 30);
    
    const roomArea = length * width; // m²
    const roomAreaCm = roomArea * 10000; // cm²
    const tileArea = tileSize * tileSize; // cm²
    const tilesNeeded = Math.ceil(roomAreaCm / tileArea);
    
    const resultEl = document.getElementById('architecture-result');
    if (resultEl) {
      resultEl.innerHTML = `
        <div>
          <h4>🏗️ Hasil Perhitungan Keramik</h4>
          <p><strong>Luas ruangan:</strong> ${roomArea} m² = ${roomAreaCm.toLocaleString()} cm²</p>
          <p><strong>Luas per keramik:</strong> ${tileArea} cm²</p>
          <p><strong>Kebutuhan keramik:</strong> ${tilesNeeded.toLocaleString()} buah</p>
          <p><strong>Rekomendasi:</strong> Tambah 5-10% untuk cadangan</p>
        </div>
      `;
    }
  }
  
  calculateArt() {
    const canvasSize = parseFloat(document.getElementById('canvas-size')?.value || 50);
    const motifSize = parseFloat(document.getElementById('motif-size')?.value || 5);
    const patternType = document.getElementById('pattern-type')?.value || 'square';
    
    const canvasArea = canvasSize * canvasSize;
    const motifArea = motifSize * motifSize;
    let motifsNeeded = 0;
    
    switch (patternType) {
      case 'square':
        motifsNeeded = Math.floor(canvasArea / motifArea);
        break;
      case 'hexagon':
        // Hexagon packing is more efficient
        motifsNeeded = Math.floor(canvasArea / (motifArea * 0.866));
        break;
      case 'triangle':
        motifsNeeded = Math.floor(canvasArea / (motifArea * 0.5));
        break;
    }
    
    const resultEl = document.getElementById('art-result');
    if (resultEl) {
      resultEl.innerHTML = `
        <div>
          <h4>🎨 Hasil Perhitungan Motif</h4>
          <p><strong>Luas kanvas:</strong> ${canvasArea} cm²</p>
          <p><strong>Luas per motif:</strong> ${motifArea} cm²</p>
          <p><strong>Jenis pola:</strong> ${patternType}</p>
          <p><strong>Jumlah motif:</strong> ${motifsNeeded} buah</p>
        </div>
      `;
    }
  }
  
  calculateAgriculture() {
    const length = parseFloat(document.getElementById('land-length')?.value || 100);
    const width = parseFloat(document.getElementById('land-width')?.value || 80);
    const fertilizerRate = parseFloat(document.getElementById('fertilizer-rate')?.value || 0.5);
    
    const landArea = length * width; // m²
    const fertilizerNeeded = landArea * fertilizerRate; // kg
    const costPerKg = 15000; // Rp per kg (example)
    const totalCost = fertilizerNeeded * costPerKg;
    
    const resultEl = document.getElementById('agriculture-result');
    if (resultEl) {
      resultEl.innerHTML = `
        <div>
          <h4>🌱 Hasil Perhitungan Pertanian</h4>
          <p><strong>Luas lahan:</strong> ${landArea.toLocaleString()} m²</p>
          <p><strong>Kebutuhan pupuk:</strong> ${fertilizerNeeded.toLocaleString()} kg</p>
          <p><strong>Estimasi biaya:</strong> Rp ${totalCost.toLocaleString()}</p>
          <p><strong>Catatan:</strong> Sesuaikan dengan jenis tanaman dan kondisi tanah</p>
        </div>
      `;
    }
  }
  
  calculateSports() {
    const fieldType = document.getElementById('field-type')?.value || 'football';
    const costPerSqm = parseFloat(document.getElementById('cost-per-sqm')?.value || 100);
    
    let fieldDimensions = {};
    
    switch (fieldType) {
      case 'football':
        fieldDimensions = { length: 100, width: 64, name: 'Sepak Bola' };
        break;
      case 'basketball':
        fieldDimensions = { length: 28, width: 15, name: 'Basket' };
        break;
      case 'tennis':
        fieldDimensions = { length: 23.77, width: 10.97, name: 'Tenis' };
        break;
      case 'badminton':
        fieldDimensions = { length: 13.4, width: 6.1, name: 'Bulu Tangkis' };
        break;
    }
    
    const area = fieldDimensions.length * fieldDimensions.width;
    const totalCost = area * costPerSqm * 1000; // in Rupiah
    
    const resultEl = document.getElementById('sports-result');
    if (resultEl) {
      resultEl.innerHTML = `
        <div>
          <h4>⚽ Hasil Perhitungan Lapangan ${fieldDimensions.name}</h4>
          <p><strong>Dimensi:</strong> ${fieldDimensions.length} × ${fieldDimensions.width} m</p>
          <p><strong>Luas lapangan:</strong> ${area.toFixed(1)} m²</p>
          <p><strong>Biaya konstruksi:</strong> Rp ${totalCost.toLocaleString()}</p>
          <p><strong>Catatan:</strong> Belum termasuk fasilitas pendukung</p>
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
    
    // Check for numerical equivalence
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
  console.log('Initializing Bidang Datar Learning App...');
  window.app = new BidangDatarApp();
  console.log('App initialized successfully!');
});

// Handle window resize
window.addEventListener('resize', () => {
  if (window.app) {
    // Redraw canvases
    setTimeout(() => {
      if (window.app.setupCanvases) window.app.setupCanvases();
    }, 100);
  }
});