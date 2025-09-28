// Bunga dan Anuitas - Financial Mathematics Learning Application
class FinancialMathApp {
  constructor() {
    this.currentSection = 'beranda';
    this.charts = {};
    
    // Practice problems data
    this.problems = [
      {
        id: 1,
        question: "Modal Rp 5.000.000 dengan bunga tunggal 8% per tahun selama 3 tahun. Berapa total bunganya?",
        answer: "1200000",
        hint: "Gunakan rumus I = P × r × t",
        solution: "I = 5.000.000 × 0,08 × 3 = Rp 1.200.000"
      },
      {
        id: 2,
        question: "Sari menginvestasikan Rp 10.000.000 dengan bunga majemuk 10% per tahun selama 5 tahun. Berapa nilai akhirnya?",
        answer: "16105100",
        hint: "Gunakan rumus A = P(1 + r)^n",
        solution: "A = 10.000.000 × (1,10)^5 = 10.000.000 × 1,61051 = Rp 16.105.100"
      },
      {
        id: 3,
        question: "Berapa nilai sekarang dari Rp 20.000.000 yang akan diterima 4 tahun lagi dengan tingkat diskonto 12%?",
        answer: "12710186",
        hint: "Gunakan rumus PV = FV / (1 + r)^n",
        solution: "PV = 20.000.000 / (1,12)^4 = 20.000.000 / 1,5735 = Rp 12.710.186"
      },
      {
        id: 4,
        question: "Pinjaman KPR Rp 300.000.000 dengan bunga 9% per tahun untuk 20 tahun. Berapa cicilan bulanannya?",
        answer: "2698026",
        hint: "Gunakan rumus anuitas PMT = PV × [r(1+r)^n] / [(1+r)^n - 1]",
        solution: "PMT = 300.000.000 × [0,0075 × (1,0075)^240] / [(1,0075)^240 - 1] = Rp 2.698.026"
      },
      {
        id: 5,
        question: "Untuk mencapai target Rp 500.000.000 dalam 15 tahun dengan return 8% per tahun, berapa investasi bulanan yang diperlukan?",
        answer: "1420245",
        hint: "Gunakan rumus FV annuity terbalik",
        solution: "PMT = 500.000.000 × 0,08/12 / [((1 + 0,08/12)^180 - 1)] = Rp 1.420.245"
      },
      {
        id: 6,
        question: "Tabungan Rp 15.000.000 dengan bunga majemuk 6% per tahun. Berapa nilainya setelah 8 tahun?",
        answer: "23930892",
        hint: "Gunakan A = P(1 + r)^n",
        solution: "A = 15.000.000 × (1,06)^8 = 15.000.000 × 1,5939 = Rp 23.930.892"
      },
      {
        id: 7,
        question: "Jika inflasi 5% per tahun, berapa daya beli Rp 10.000.000 setelah 10 tahun?",
        answer: "6139133",
        hint: "Gunakan rumus present value untuk menghitung daya beli",
        solution: "Daya beli = 10.000.000 / (1,05)^10 = 10.000.000 / 1,6289 = Rp 6.139.133"
      },
      {
        id: 8,
        question: "Dana pensiun Rp 2 miliar dalam 25 tahun dengan return 11% per tahun. Berapa investasi bulanan yang diperlukan?",
        answer: "1456859",
        hint: "Gunakan rumus future value annuity",
        solution: "PMT = 2.000.000.000 × 0,11/12 / [((1 + 0,11/12)^300 - 1)] = Rp 1.456.859"
      },
      {
        id: 9,
        question: "Bunga majemuk vs tunggal: Modal Rp 8.000.000, bunga 7% per tahun, 6 tahun. Berapa selisih keuntungannya?",
        answer: "664073",
        hint: "Hitung kedua jenis bunga lalu cari selisihnya",
        solution: "Majemuk: 8.000.000×(1,07)^6 = 12.010.497; Tunggal: 8.000.000×(1+0,07×6) = 11.360.000; Selisih = Rp 650.497"
      },
      {
        id: 10,
        question: "Anuitas Rp 2.000.000 per bulan selama 10 tahun dengan bunga 8% per tahun. Berapa total nilai sekarangnya?",
        answer: "164701578",
        hint: "Gunakan rumus present value annuity",
        solution: "PV = 2.000.000 × [(1-(1,0067)^-120)/0,0067] = 2.000.000 × 82,35 = Rp 164.701.578"
      }
    ];
    
    this.currentProblem = 0;
    this.score = 0;
    this.correctAnswers = 0;
    this.wrongAnswers = 0;
    this.completedProblems = 0;
    
    this.init();
  }
  
  init() {
    console.log('Initializing Financial Math App...');
    this.setupEventListeners();
    this.showSection('beranda');
    
    // Initialize after DOM is ready
    setTimeout(() => {
      this.updateProblemDisplay();
      this.setupAllCalculators();
      this.calculateSimpleInterest(); // Initialize simple interest calculator
    }, 100);
  }
  
  setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Navigation - Fixed to handle all navigation properly
    document.querySelectorAll('.nav__btn[data-section]').forEach(element => {
      element.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const section = element.getAttribute('data-section');
        if (section) {
          console.log('Nav navigation clicked:', section);
          this.showSection(section);
        }
      });
    });
    
    // Feature cards navigation
    document.querySelectorAll('.feature-card[data-section]').forEach(element => {
      element.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const section = element.getAttribute('data-section');
        if (section) {
          console.log('Feature card clicked:', section);
          this.showSection(section);
        }
      });
    });
    
    // Feature card buttons navigation
    document.querySelectorAll('.feature-card .btn[data-section]').forEach(element => {
      element.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const section = element.closest('.feature-card').getAttribute('data-section');
        if (section) {
          console.log('Feature button clicked:', section);
          this.showSection(section);
        }
      });
    });
    
    this.setupCalculatorListeners();
    this.setupPracticeListeners();
    this.setupPortfolioListeners();
  }
  
  setupCalculatorListeners() {
    // Simple Interest
    const calcSimpleBtn = document.getElementById('calc-simple');
    if (calcSimpleBtn) {
      calcSimpleBtn.addEventListener('click', () => {
        console.log('Simple interest calculate button clicked');
        this.calculateSimpleInterest();
      });
    }
    
    // Compound Interest
    const calcCompoundBtn = document.getElementById('calc-compound');
    if (calcCompoundBtn) {
      calcCompoundBtn.addEventListener('click', () => {
        console.log('Compound interest calculate button clicked');
        this.calculateCompoundInterest();
      });
    }
    
    // Present Value
    const calcPvBtn = document.getElementById('calc-pv');
    if (calcPvBtn) {
      calcPvBtn.addEventListener('click', () => this.calculatePresentValue());
    }
    
    // Future Value
    const calcFvBtn = document.getElementById('calc-fv');
    if (calcFvBtn) {
      calcFvBtn.addEventListener('click', () => this.calculateFutureValue());
    }
    
    // Annuity
    const calcAnnuityBtn = document.getElementById('calc-annuity');
    if (calcAnnuityBtn) {
      calcAnnuityBtn.addEventListener('click', () => this.calculateAnnuity());
    }
    
    // KPR Calculator
    const calcKprBtn = document.getElementById('calc-kpr');
    if (calcKprBtn) {
      calcKprBtn.addEventListener('click', () => this.calculateKPR());
    }
    
    // Investment Calculator
    const calcInvestmentBtn = document.getElementById('calc-investment');
    if (calcInvestmentBtn) {
      calcInvestmentBtn.addEventListener('click', () => this.calculateInvestment());
    }
    
    // Retirement Calculator
    const calcRetirementBtn = document.getElementById('calc-retirement');
    if (calcRetirementBtn) {
      calcRetirementBtn.addEventListener('click', () => this.calculateRetirement());
    }
    
    // Planning Calculators
    const calcEmergencyBtn = document.getElementById('calc-emergency');
    if (calcEmergencyBtn) {
      calcEmergencyBtn.addEventListener('click', () => this.calculateEmergency());
    }
    
    const calcEducationBtn = document.getElementById('calc-education');
    if (calcEducationBtn) {
      calcEducationBtn.addEventListener('click', () => this.calculateEducation());
    }
    
    const calcHouseBtn = document.getElementById('calc-house');
    if (calcHouseBtn) {
      calcHouseBtn.addEventListener('click', () => this.calculateHouse());
    }
  }
  
  setupPracticeListeners() {
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
  
  setupPortfolioListeners() {
    // Portfolio sliders
    const stockSlider = document.getElementById('stock-allocation');
    const bondSlider = document.getElementById('bond-allocation');
    const cashSlider = document.getElementById('cash-allocation');
    
    if (stockSlider) {
      stockSlider.addEventListener('input', (e) => {
        document.getElementById('stock-percentage').textContent = e.target.value + '%';
        this.adjustPortfolioSliders('stock', parseInt(e.target.value));
      });
    }
    
    if (bondSlider) {
      bondSlider.addEventListener('input', (e) => {
        document.getElementById('bond-percentage').textContent = e.target.value + '%';
        this.adjustPortfolioSliders('bond', parseInt(e.target.value));
      });
    }
    
    if (cashSlider) {
      cashSlider.addEventListener('input', (e) => {
        document.getElementById('cash-percentage').textContent = e.target.value + '%';
        this.adjustPortfolioSliders('cash', parseInt(e.target.value));
      });
    }
    
    // Run Simulation
    const runSimBtn = document.getElementById('run-simulation');
    if (runSimBtn) {
      runSimBtn.addEventListener('click', () => this.runPortfolioSimulation());
    }
  }
  
  setupAllCalculators() {
    // Set up global calculator functions
    window.calcSaving = () => this.calcSaving();
    window.calcDeposit = () => this.calcDeposit();
    window.calcMutualFund = () => this.calcMutualFund();
    window.calcStock = () => this.calcStock();
    window.calcInsurance = () => this.calcInsurance();
  }
  
  // Section navigation - Fixed
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
    console.log('Initializing features for section:', sectionName);
    switch (sectionName) {
      case 'bunga-tunggal':
        this.calculateSimpleInterest();
        break;
      case 'bunga-majemuk':
        this.calculateCompoundInterest();
        break;
      case 'nilai-waktu':
        this.calculatePresentValue();
        this.calculateFutureValue();
        this.drawTimelineChart();
        break;
      case 'anuitas':
        this.calculateAnnuity();
        break;
      case 'kalkulator':
        this.calculateKPR();
        this.calculateInvestment();
        this.calculateRetirement();
        break;
      case 'simulasi':
        this.runPortfolioSimulation();
        break;
      case 'perencanaan':
        this.calculateEmergency();
        this.calculateEducation();
        this.calculateHouse();
        break;
      case 'latihan':
        this.updateProblemDisplay();
        break;
    }
  }
  
  // Simple Interest Calculator - Fixed
  calculateSimpleInterest() {
    console.log('Calculating simple interest...');
    
    const principalEl = document.getElementById('simple-principal');
    const rateEl = document.getElementById('simple-rate');
    const timeEl = document.getElementById('simple-time');
    const resultEl = document.getElementById('simple-result');
    
    if (!principalEl || !rateEl || !timeEl || !resultEl) {
      console.error('Simple interest elements not found');
      return;
    }
    
    const principal = parseFloat(principalEl.value || 1000000);
    const rate = parseFloat(rateEl.value || 8) / 100;
    const time = parseFloat(timeEl.value || 3);
    
    console.log('Simple interest inputs:', { principal, rate, time });
    
    const interest = principal * rate * time;
    const total = principal + interest;
    
    console.log('Simple interest results:', { interest, total });
    
    resultEl.innerHTML = `
      <div class="animate-value">
        <h4>📊 Hasil Bunga Tunggal</h4>
        <p><strong>Modal Awal:</strong> ${this.formatRupiah(principal)}</p>
        <p><strong>Tingkat Bunga:</strong> ${(rate * 100).toFixed(1)}% per tahun</p>
        <p><strong>Jangka Waktu:</strong> ${time} tahun</p>
        <hr>
        <p><strong>Bunga:</strong> <span class="highlight-positive">${this.formatRupiah(interest)}</span></p>
        <p><strong>Total Akhir:</strong> <span class="highlight-positive">${this.formatRupiah(total)}</span></p>
        <p><em>Rumus: I = P × r × t</em></p>
        <p><em>Perhitungan: ${this.formatRupiah(principal)} × ${(rate * 100)}% × ${time} tahun = ${this.formatRupiah(interest)}</em></p>
      </div>
    `;
    
    this.drawSimpleInterestChart(principal, rate, time);
  }
  
  drawSimpleInterestChart(principal, rate, time) {
    const ctx = document.getElementById('simple-interest-chart');
    if (!ctx) {
      console.log('Simple interest chart canvas not found');
      return;
    }
    
    console.log('Drawing simple interest chart...');
    
    // Destroy existing chart
    if (this.charts.simpleInterest) {
      this.charts.simpleInterest.destroy();
    }
    
    const years = [];
    const values = [];
    
    for (let i = 0; i <= time; i++) {
      years.push(`Tahun ${i}`);
      values.push(principal * (1 + rate * i));
    }
    
    this.charts.simpleInterest = new Chart(ctx, {
      type: 'line',
      data: {
        labels: years,
        datasets: [{
          label: 'Nilai Investasi (Bunga Tunggal)',
          data: values,
          borderColor: '#1FB8CD',
          backgroundColor: 'rgba(31, 184, 205, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Pertumbuhan Linear Bunga Tunggal'
          },
          legend: {
            display: true
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              callback: function(value) {
                return 'Rp ' + value.toLocaleString();
              }
            }
          }
        }
      }
    });
  }
  
  // Compound Interest Calculator
  calculateCompoundInterest() {
    const principal = parseFloat(document.getElementById('compound-principal')?.value || 1000000);
    const rate = parseFloat(document.getElementById('compound-rate')?.value || 8) / 100;
    const time = parseFloat(document.getElementById('compound-time')?.value || 3);
    const frequency = parseFloat(document.getElementById('compound-frequency')?.value || 12);
    
    const amount = principal * Math.pow(1 + rate / frequency, frequency * time);
    const interest = amount - principal;
    
    // Compare with simple interest
    const simpleInterest = principal * rate * time;
    const simpleTotal = principal + simpleInterest;
    const advantage = amount - simpleTotal;
    
    const resultEl = document.getElementById('compound-result');
    if (resultEl) {
      resultEl.innerHTML = `
        <div class="animate-value">
          <h4>📈 Hasil Bunga Majemuk</h4>
          <p><strong>Modal Awal:</strong> ${this.formatRupiah(principal)}</p>
          <p><strong>Tingkat Bunga:</strong> ${(rate * 100).toFixed(1)}% per tahun</p>
          <p><strong>Jangka Waktu:</strong> ${time} tahun</p>
          <p><strong>Frekuensi:</strong> ${frequency}x per tahun</p>
          <hr>
          <p><strong>Bunga Majemuk:</strong> <span class="highlight-positive">${this.formatRupiah(interest)}</span></p>
          <p><strong>Total Akhir:</strong> <span class="highlight-positive">${this.formatRupiah(amount)}</span></p>
          <hr>
          <p><strong>Keuntungan vs Bunga Tunggal:</strong> <span class="highlight-positive">${this.formatRupiah(advantage)}</span></p>
          <p><em>Rumus: A = P(1 + r/n)^(nt)</em></p>
        </div>
      `;
    }
    
    this.drawComparisonChart(principal, rate, time, frequency);
  }
  
  drawComparisonChart(principal, rate, time, frequency) {
    const ctx = document.getElementById('comparison-chart');
    if (!ctx) return;
    
    // Destroy existing chart
    if (this.charts.comparison) {
      this.charts.comparison.destroy();
    }
    
    const years = [];
    const simpleValues = [];
    const compoundValues = [];
    
    for (let i = 0; i <= time; i += 0.5) {
      years.push(`${i} tahun`);
      simpleValues.push(principal * (1 + rate * i));
      compoundValues.push(principal * Math.pow(1 + rate / frequency, frequency * i));
    }
    
    this.charts.comparison = new Chart(ctx, {
      type: 'line',
      data: {
        labels: years,
        datasets: [
          {
            label: 'Bunga Tunggal',
            data: simpleValues,
            borderColor: '#FFC185',
            backgroundColor: 'rgba(255, 193, 133, 0.1)',
            borderWidth: 3,
            fill: false,
            tension: 0
          },
          {
            label: 'Bunga Majemuk',
            data: compoundValues,
            borderColor: '#1FB8CD',
            backgroundColor: 'rgba(31, 184, 205, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Perbandingan Bunga Tunggal vs Majemuk'
          },
          legend: {
            display: true
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              callback: function(value) {
                return 'Rp ' + value.toLocaleString();
              }
            }
          }
        }
      }
    });
  }
  
  // Present Value Calculator
  calculatePresentValue() {
    const futureValue = parseFloat(document.getElementById('pv-future')?.value || 2000000);
    const rate = parseFloat(document.getElementById('pv-rate')?.value || 10) / 100;
    const period = parseFloat(document.getElementById('pv-period')?.value || 5);
    
    const presentValue = futureValue / Math.pow(1 + rate, period);
    
    const resultEl = document.getElementById('pv-result');
    if (resultEl) {
      resultEl.innerHTML = `
        <div class="animate-value">
          <h4>⏰ Hasil Present Value</h4>
          <p><strong>Future Value:</strong> ${this.formatRupiah(futureValue)}</p>
          <p><strong>Tingkat Diskonto:</strong> ${(rate * 100).toFixed(1)}%</p>
          <p><strong>Periode:</strong> ${period} tahun</p>
          <hr>
          <p><strong>Present Value:</strong> <span class="highlight-positive">${this.formatRupiah(presentValue)}</span></p>
          <p><em>Artinya: ${this.formatRupiah(presentValue)} hari ini setara dengan ${this.formatRupiah(futureValue)} dalam ${period} tahun</em></p>
        </div>
      `;
    }
  }
  
  // Future Value Calculator
  calculateFutureValue() {
    const presentValue = parseFloat(document.getElementById('fv-present')?.value || 1000000);
    const rate = parseFloat(document.getElementById('fv-rate')?.value || 10) / 100;
    const period = parseFloat(document.getElementById('fv-period')?.value || 5);
    
    const futureValue = presentValue * Math.pow(1 + rate, period);
    
    const resultEl = document.getElementById('fv-result');
    if (resultEl) {
      resultEl.innerHTML = `
        <div class="animate-value">
          <h4>📈 Hasil Future Value</h4>
          <p><strong>Present Value:</strong> ${this.formatRupiah(presentValue)}</p>
          <p><strong>Tingkat Bunga:</strong> ${(rate * 100).toFixed(1)}%</p>
          <p><strong>Periode:</strong> ${period} tahun</p>
          <hr>
          <p><strong>Future Value:</strong> <span class="highlight-positive">${this.formatRupiah(futureValue)}</span></p>
          <p><em>Artinya: ${this.formatRupiah(presentValue)} hari ini akan menjadi ${this.formatRupiah(futureValue)} dalam ${period} tahun</em></p>
        </div>
      `;
    }
  }
  
  drawTimelineChart() {
    const ctx = document.getElementById('timeline-chart');
    if (!ctx) return;
    
    // Destroy existing chart
    if (this.charts.timeline) {
      this.charts.timeline.destroy();
    }
    
    const pv = 1000000;
    const rate = 0.10;
    const periods = [0, 1, 2, 3, 4, 5];
    const values = periods.map(p => pv * Math.pow(1 + rate, p));
    
    this.charts.timeline = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: periods.map(p => `Tahun ${p}`),
        datasets: [{
          label: 'Nilai Uang',
          data: values,
          backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545'],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Timeline Nilai Waktu Uang (10% per tahun)'
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              callback: function(value) {
                return 'Rp ' + value.toLocaleString();
              }
            }
          }
        }
      }
    });
  }
  
  // Annuity Calculator
  calculateAnnuity() {
    const pv = parseFloat(document.getElementById('annuity-pv')?.value || 100000000);
    const annualRate = parseFloat(document.getElementById('annuity-rate')?.value || 12) / 100;
    const years = parseFloat(document.getElementById('annuity-period')?.value || 5);
    
    const monthlyRate = annualRate / 12;
    const numberOfPayments = years * 12;
    
    const payment = pv * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    const totalPayments = payment * numberOfPayments;
    const totalInterest = totalPayments - pv;
    
    const resultEl = document.getElementById('annuity-result');
    if (resultEl) {
      resultEl.innerHTML = `
        <div class="animate-value">
          <h4>💳 Hasil Perhitungan Anuitas</h4>
          <p><strong>Nilai Pinjaman:</strong> ${this.formatRupiah(pv)}</p>
          <p><strong>Tingkat Bunga:</strong> ${(annualRate * 100).toFixed(1)}% per tahun</p>
          <p><strong>Jangka Waktu:</strong> ${years} tahun (${numberOfPayments} bulan)</p>
          <hr>
          <p><strong>Cicilan Bulanan:</strong> <span class="highlight-positive">${this.formatRupiah(payment)}</span></p>
          <p><strong>Total Pembayaran:</strong> ${this.formatRupiah(totalPayments)}</p>
          <p><strong>Total Bunga:</strong> <span class="highlight-negative">${this.formatRupiah(totalInterest)}</span></p>
          <p><strong>Rasio Bunga:</strong> ${((totalInterest / pv) * 100).toFixed(1)}%</p>
        </div>
      `;
    }
    
    this.generateAmortizationTable(pv, monthlyRate, numberOfPayments, payment);
  }
  
  generateAmortizationTable(pv, monthlyRate, numPayments, payment) {
    const tableEl = document.getElementById('amortization-table');
    if (!tableEl) return;
    
    let html = `
      <table>
        <thead>
          <tr>
            <th>Bulan</th>
            <th>Saldo Awal</th>
            <th>Cicilan</th>
            <th>Bunga</th>
            <th>Pokok</th>
            <th>Saldo Akhir</th>
          </tr>
        </thead>
        <tbody>
    `;
    
    let balance = pv;
    const maxRows = Math.min(numPayments, 12); // Show first 12 months
    
    for (let i = 1; i <= maxRows; i++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = payment - interestPayment;
      const newBalance = balance - principalPayment;
      
      html += `
        <tr>
          <td>${i}</td>
          <td>${this.formatRupiah(balance)}</td>
          <td>${this.formatRupiah(payment)}</td>
          <td>${this.formatRupiah(interestPayment)}</td>
          <td>${this.formatRupiah(principalPayment)}</td>
          <td>${this.formatRupiah(newBalance)}</td>
        </tr>
      `;
      
      balance = newBalance;
    }
    
    if (numPayments > 12) {
      html += `
        <tr>
          <td colspan="6" style="text-align: center; font-style: italic; color: var(--color-text-secondary);">
            ... menampilkan 12 bulan pertama dari ${numPayments} bulan total
          </td>
        </tr>
      `;
    }
    
    html += '</tbody></table>';
    tableEl.innerHTML = html;
  }
  
  // KPR Calculator
  calculateKPR() {
    const housePrice = parseFloat(document.getElementById('kpr-price')?.value || 500000000);
    const dpPercentage = parseFloat(document.getElementById('kpr-dp')?.value || 20) / 100;
    const annualRate = parseFloat(document.getElementById('kpr-rate')?.value || 8) / 100;
    const years = parseFloat(document.getElementById('kpr-period')?.value || 15);
    
    const downPayment = housePrice * dpPercentage;
    const loanAmount = housePrice - downPayment;
    const monthlyRate = annualRate / 12;
    const numPayments = years * 12;
    
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    const totalPayments = monthlyPayment * numPayments;
    const totalInterest = totalPayments - loanAmount;
    
    const resultEl = document.getElementById('kpr-result');
    if (resultEl) {
      resultEl.innerHTML = `
        <div class="animate-value">
          <h4>🏠 Hasil Perhitungan KPR</h4>
          <p><strong>Harga Rumah:</strong> ${this.formatRupiah(housePrice)}</p>
          <p><strong>DP (${(dpPercentage * 100)}%):</strong> ${this.formatRupiah(downPayment)}</p>
          <p><strong>Jumlah Pinjaman:</strong> ${this.formatRupiah(loanAmount)}</p>
          <hr>
          <p><strong>Cicilan Bulanan:</strong> <span class="highlight-positive">${this.formatRupiah(monthlyPayment)}</span></p>
          <p><strong>Total Pembayaran:</strong> ${this.formatRupiah(totalPayments)}</p>
          <p><strong>Total Bunga:</strong> <span class="highlight-negative">${this.formatRupiah(totalInterest)}</span></p>
          <p><em>Pastikan cicilan tidak melebihi 30% dari penghasilan bulanan</em></p>
        </div>
      `;
    }
  }
  
  // Investment Calculator
  calculateInvestment() {
    const initialInvestment = parseFloat(document.getElementById('invest-initial')?.value || 10000000);
    const monthlyInvestment = parseFloat(document.getElementById('invest-monthly')?.value || 1000000);
    const annualReturn = parseFloat(document.getElementById('invest-return')?.value || 12) / 100;
    const years = parseFloat(document.getElementById('invest-period')?.value || 10);
    
    const monthlyReturn = annualReturn / 12;
    const numMonths = years * 12;
    
    // Future value of initial investment
    const futureValueInitial = initialInvestment * Math.pow(1 + monthlyReturn, numMonths);
    
    // Future value of monthly payments (annuity)
    const futureValueMonthly = monthlyInvestment * ((Math.pow(1 + monthlyReturn, numMonths) - 1) / monthlyReturn);
    
    const totalFutureValue = futureValueInitial + futureValueMonthly;
    const totalInvested = initialInvestment + (monthlyInvestment * numMonths);
    const totalReturn = totalFutureValue - totalInvested;
    
    const resultEl = document.getElementById('investment-result');
    if (resultEl) {
      resultEl.innerHTML = `
        <div class="animate-value">
          <h4>💰 Hasil Proyeksi Investasi</h4>
          <p><strong>Investasi Awal:</strong> ${this.formatRupiah(initialInvestment)}</p>
          <p><strong>Investasi Bulanan:</strong> ${this.formatRupiah(monthlyInvestment)}</p>
          <p><strong>Return:</strong> ${(annualReturn * 100).toFixed(1)}% per tahun</p>
          <p><strong>Periode:</strong> ${years} tahun</p>
          <hr>
          <p><strong>Total Diinvestasikan:</strong> ${this.formatRupiah(totalInvested)}</p>
          <p><strong>Nilai Akhir:</strong> <span class="highlight-positive">${this.formatRupiah(totalFutureValue)}</span></p>
          <p><strong>Keuntungan:</strong> <span class="highlight-positive">${this.formatRupiah(totalReturn)}</span></p>
          <p><strong>ROI:</strong> ${((totalReturn / totalInvested) * 100).toFixed(1)}%</p>
        </div>
      `;
    }
  }
  
  // Retirement Calculator
  calculateRetirement() {
    const target = parseFloat(document.getElementById('retire-target')?.value || 5000000000);
    const currentAge = parseFloat(document.getElementById('retire-current-age')?.value || 30);
    const retireAge = parseFloat(document.getElementById('retire-target-age')?.value || 55);
    const annualReturn = parseFloat(document.getElementById('retire-return')?.value || 10) / 100;
    
    const yearsToRetire = retireAge - currentAge;
    const monthlyReturn = annualReturn / 12;
    const numMonths = yearsToRetire * 12;
    
    // Calculate required monthly investment
    const monthlyInvestment = target * monthlyReturn / (Math.pow(1 + monthlyReturn, numMonths) - 1);
    const totalInvested = monthlyInvestment * numMonths;
    
    const resultEl = document.getElementById('retirement-result');
    if (resultEl) {
      resultEl.innerHTML = `
        <div class="animate-value">
          <h4>🏖️ Hasil Perencanaan Pensiun</h4>
          <p><strong>Target Dana Pensiun:</strong> ${this.formatRupiah(target)}</p>
          <p><strong>Waktu Tersisa:</strong> ${yearsToRetire} tahun</p>
          <p><strong>Return Investasi:</strong> ${(annualReturn * 100).toFixed(1)}% per tahun</p>
          <hr>
          <p><strong>Investasi Bulanan Diperlukan:</strong> <span class="highlight-positive">${this.formatRupiah(monthlyInvestment)}</span></p>
          <p><strong>Total Yang Diinvestasikan:</strong> ${this.formatRupiah(totalInvested)}</p>
          <p><strong>Keuntungan Investasi:</strong> <span class="highlight-positive">${this.formatRupiah(target - totalInvested)}</span></p>
          <p><em>Mulai investasi sekarang untuk memanfaatkan compound interest!</em></p>
        </div>
      `;
    }
  }
  
  // Application calculators
  calcSaving() {
    const amount = parseFloat(document.getElementById('saving-amount')?.value || 5000000);
    const rate = parseFloat(document.getElementById('saving-rate')?.value || 2.5) / 100;
    
    const monthlyInterest = amount * (rate / 12);
    const yearlyGrowth = amount * Math.pow(1 + rate / 12, 12);
    
    const resultEl = document.getElementById('saving-result');
    if (resultEl) {
      resultEl.innerHTML = `
        <p><strong>Bunga bulanan:</strong> ${this.formatRupiah(monthlyInterest)}</p>
        <p><strong>Nilai setelah 1 tahun:</strong> ${this.formatRupiah(yearlyGrowth)}</p>
      `;
    }
  }
  
  calcDeposit() {
    const amount = parseFloat(document.getElementById('deposit-amount')?.value || 10000000);
    const rate = parseFloat(document.getElementById('deposit-rate')?.value || 6) / 100;
    const months = parseFloat(document.getElementById('deposit-period')?.value || 12);
    
    const maturityValue = amount * Math.pow(1 + rate / 12, months);
    const interest = maturityValue - amount;
    
    const resultEl = document.getElementById('deposit-result');
    if (resultEl) {
      resultEl.innerHTML = `
        <p><strong>Nilai jatuh tempo:</strong> ${this.formatRupiah(maturityValue)}</p>
        <p><strong>Bunga yang diperoleh:</strong> ${this.formatRupiah(interest)}</p>
      `;
    }
  }
  
  calcMutualFund() {
    const monthly = parseFloat(document.getElementById('mutual-monthly')?.value || 500000);
    const returnRate = parseFloat(document.getElementById('mutual-return')?.value || 12) / 100;
    const years = parseFloat(document.getElementById('mutual-years')?.value || 10);
    
    const monthlyReturn = returnRate / 12;
    const numMonths = years * 12;
    const futureValue = monthly * ((Math.pow(1 + monthlyReturn, numMonths) - 1) / monthlyReturn);
    const totalInvested = monthly * numMonths;
    
    const resultEl = document.getElementById('mutual-result');
    if (resultEl) {
      resultEl.innerHTML = `
        <p><strong>Total diinvestasikan:</strong> ${this.formatRupiah(totalInvested)}</p>
        <p><strong>Nilai akhir:</strong> ${this.formatRupiah(futureValue)}</p>
        <p><strong>Keuntungan:</strong> ${this.formatRupiah(futureValue - totalInvested)}</p>
      `;
    }
  }
  
  calcStock() {
    const initial = parseFloat(document.getElementById('stock-initial')?.value || 20000000);
    const returnRate = parseFloat(document.getElementById('stock-return')?.value || 15) / 100;
    const years = parseFloat(document.getElementById('stock-years')?.value || 5);
    
    const futureValue = initial * Math.pow(1 + returnRate, years);
    const profit = futureValue - initial;
    
    const resultEl = document.getElementById('stock-result');
    if (resultEl) {
      resultEl.innerHTML = `
        <p><strong>Nilai akhir:</strong> ${this.formatRupiah(futureValue)}</p>
        <p><strong>Capital gain:</strong> ${this.formatRupiah(profit)}</p>
        <p><strong>ROI:</strong> ${((profit / initial) * 100).toFixed(1)}%</p>
      `;
    }
  }
  
  calcInsurance() {
    const premium = parseFloat(document.getElementById('insurance-premium')?.value || 12000000);
    const returnRate = parseFloat(document.getElementById('insurance-return')?.value || 8) / 100;
    const years = parseFloat(document.getElementById('insurance-years')?.value || 20);
    
    // Assume 70% goes to investment, 30% to insurance cost
    const investmentPortion = premium * 0.7;
    const futureValue = investmentPortion * ((Math.pow(1 + returnRate, years) - 1) / returnRate);
    const totalPremium = premium * years;
    
    const resultEl = document.getElementById('insurance-result');
    if (resultEl) {
      resultEl.innerHTML = `
        <p><strong>Total premi:</strong> ${this.formatRupiah(totalPremium)}</p>
        <p><strong>Nilai investasi:</strong> ${this.formatRupiah(futureValue)}</p>
        <p><em>Plus perlindungan asuransi jiwa</em></p>
      `;
    }
  }
  
  // Planning calculators
  calculateEmergency() {
    const monthlyExpense = parseFloat(document.getElementById('emergency-expense')?.value || 5000000);
    const targetMonths = parseFloat(document.getElementById('emergency-months')?.value || 6);
    
    const emergencyFund = monthlyExpense * targetMonths;
    
    const resultEl = document.getElementById('emergency-result');
    if (resultEl) {
      resultEl.innerHTML = `
        <div class="animate-value">
          <h4>🚨 Dana Darurat</h4>
          <p><strong>Pengeluaran Bulanan:</strong> ${this.formatRupiah(monthlyExpense)}</p>
          <p><strong>Target:</strong> ${targetMonths} bulan</p>
          <hr>
          <p><strong>Dana Darurat Diperlukan:</strong> <span class="highlight-positive">${this.formatRupiah(emergencyFund)}</span></p>
          <p><em>Simpan di instrumen likuid seperti tabungan atau deposito jangka pendek</em></p>
        </div>
      `;
    }
  }
  
  calculateEducation() {
    const currentCost = parseFloat(document.getElementById('education-current')?.value || 200000000);
    const years = parseFloat(document.getElementById('education-years')?.value || 15);
    const inflation = parseFloat(document.getElementById('education-inflation')?.value || 10) / 100;
    
    const futureCost = currentCost * Math.pow(1 + inflation, years);
    
    const resultEl = document.getElementById('education-result');
    if (resultEl) {
      resultEl.innerHTML = `
        <div class="animate-value">
          <h4>🎓 Dana Pendidikan</h4>
          <p><strong>Biaya Saat Ini:</strong> ${this.formatRupiah(currentCost)}</p>
          <p><strong>Waktu:</strong> ${years} tahun</p>
          <p><strong>Inflasi Pendidikan:</strong> ${(inflation * 100)}% per tahun</p>
          <hr>
          <p><strong>Biaya di Masa Depan:</strong> <span class="highlight-positive">${this.formatRupiah(futureCost)}</span></p>
          <p><em>Mulai investasi dengan return > ${(inflation * 100)}% untuk mengalahkan inflasi</em></p>
        </div>
      `;
    }
  }
  
  calculateHouse() {
    const housePrice = parseFloat(document.getElementById('house-price')?.value || 800000000);
    const dpPercentage = parseFloat(document.getElementById('house-dp')?.value || 30) / 100;
    const monthlyIncome = parseFloat(document.getElementById('house-income')?.value || 15000000);
    
    const downPayment = housePrice * dpPercentage;
    const loanAmount = housePrice - downPayment;
    
    // Assume 8% interest, 15 years
    const monthlyRate = 0.08 / 12;
    const numPayments = 15 * 12;
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    const affordabilityRatio = (monthlyPayment / monthlyIncome) * 100;
    
    const resultEl = document.getElementById('house-result');
    if (resultEl) {
      const canAfford = affordabilityRatio <= 30;
      resultEl.innerHTML = `
        <div class="animate-value">
          <h4>🏠 Analisis Kemampuan Beli Rumah</h4>
          <p><strong>Harga Rumah:</strong> ${this.formatRupiah(housePrice)}</p>
          <p><strong>DP (${(dpPercentage * 100)}%):</strong> ${this.formatRupiah(downPayment)}</p>
          <p><strong>Pinjaman KPR:</strong> ${this.formatRupiah(loanAmount)}</p>
          <hr>
          <p><strong>Cicilan Bulanan:</strong> ${this.formatRupiah(monthlyPayment)}</p>
          <p><strong>Rasio terhadap Penghasilan:</strong> ${affordabilityRatio.toFixed(1)}%</p>
          <p><strong>Status:</strong> <span class="${canAfford ? 'highlight-positive' : 'highlight-negative'}">${canAfford ? 'Mampu' : 'Belum Mampu'}</span></p>
          <p><em>Rekomendasi: Cicilan maksimal 30% dari penghasilan</em></p>
        </div>
      `;
    }
  }
  
  // Portfolio simulation
  adjustPortfolioSliders(changedSlider, newValue) {
    const stockSlider = document.getElementById('stock-allocation');
    const bondSlider = document.getElementById('bond-allocation');
    const cashSlider = document.getElementById('cash-allocation');
    
    if (!stockSlider || !bondSlider || !cashSlider) return;
    
    let stock = parseInt(stockSlider.value);
    let bond = parseInt(bondSlider.value);
    let cash = parseInt(cashSlider.value);
    
    // Update the changed slider
    if (changedSlider === 'stock') stock = newValue;
    else if (changedSlider === 'bond') bond = newValue;
    else if (changedSlider === 'cash') cash = newValue;
    
    // Adjust other sliders to maintain 100% total
    const total = stock + bond + cash;
    if (total !== 100) {
      const excess = total - 100;
      if (changedSlider !== 'stock') {
        stock = Math.max(0, stock - excess / 2);
      }
      if (changedSlider !== 'bond') {
        bond = Math.max(0, bond - excess / 2);
      }
      if (changedSlider !== 'cash') {
        cash = Math.max(0, cash - excess / 2);
      }
      
      // Final adjustment to ensure exactly 100%
      const newTotal = stock + bond + cash;
      if (newTotal !== 100) {
        if (changedSlider !== 'stock') stock += (100 - newTotal);
        else if (changedSlider !== 'bond') bond += (100 - newTotal);
        else cash += (100 - newTotal);
      }
    }
    
    // Update sliders and displays
    stockSlider.value = Math.round(stock);
    bondSlider.value = Math.round(bond);
    cashSlider.value = Math.round(cash);
    
    document.getElementById('stock-percentage').textContent = Math.round(stock) + '%';
    document.getElementById('bond-percentage').textContent = Math.round(bond) + '%';
    document.getElementById('cash-percentage').textContent = Math.round(cash) + '%';
  }
  
  runPortfolioSimulation() {
    const stockAllocation = parseFloat(document.getElementById('stock-allocation')?.value || 60) / 100;
    const bondAllocation = parseFloat(document.getElementById('bond-allocation')?.value || 30) / 100;
    const cashAllocation = parseFloat(document.getElementById('cash-allocation')?.value || 10) / 100;
    const initialAmount = parseFloat(document.getElementById('portfolio-amount')?.value || 100000000);
    const years = parseFloat(document.getElementById('simulation-years')?.value || 10);
    
    // Expected returns (simplified)
    const stockReturn = 0.12; // 12%
    const bondReturn = 0.06;  // 6%
    const cashReturn = 0.03;  // 3%
    
    const portfolioReturn = (stockAllocation * stockReturn) + (bondAllocation * bondReturn) + (cashAllocation * cashReturn);
    const futureValue = initialAmount * Math.pow(1 + portfolioReturn, years);
    const totalReturn = futureValue - initialAmount;
    
    const resultEl = document.getElementById('portfolio-result');
    if (resultEl) {
      resultEl.innerHTML = `
        <div class="animate-value">
          <h4>💹 Hasil Simulasi Portofolio</h4>
          <p><strong>Alokasi:</strong> Saham ${(stockAllocation * 100)}%, Obligasi ${(bondAllocation * 100)}%, Kas ${(cashAllocation * 100)}%</p>
          <p><strong>Expected Return:</strong> ${(portfolioReturn * 100).toFixed(1)}% per tahun</p>
          <p><strong>Modal Awal:</strong> ${this.formatRupiah(initialAmount)}</p>
          <hr>
          <p><strong>Nilai Akhir (${years} tahun):</strong> <span class="highlight-positive">${this.formatRupiah(futureValue)}</span></p>
          <p><strong>Total Return:</strong> <span class="highlight-positive">${this.formatRupiah(totalReturn)}</span></p>
          <p><strong>CAGR:</strong> ${((Math.pow(futureValue / initialAmount, 1 / years) - 1) * 100).toFixed(1)}%</p>
        </div>
      `;
    }
    
    this.drawPortfolioChart(initialAmount, portfolioReturn, years);
  }
  
  drawPortfolioChart(initial, returnRate, years) {
    const ctx = document.getElementById('portfolio-chart');
    if (!ctx) return;
    
    // Destroy existing chart
    if (this.charts.portfolio) {
      this.charts.portfolio.destroy();
    }
    
    const yearLabels = [];
    const values = [];
    
    for (let i = 0; i <= years; i++) {
      yearLabels.push(`Tahun ${i}`);
      values.push(initial * Math.pow(1 + returnRate, i));
    }
    
    this.charts.portfolio = new Chart(ctx, {
      type: 'line',
      data: {
        labels: yearLabels,
        datasets: [{
          label: 'Nilai Portofolio',
          data: values,
          borderColor: '#1FB8CD',
          backgroundColor: 'rgba(31, 184, 205, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Proyeksi Pertumbuhan Portofolio'
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              callback: function(value) {
                return 'Rp ' + value.toLocaleString();
              }
            }
          }
        }
      }
    });
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
    
    const userAnswer = answerInput.value.trim().replace(/[.,\s]/g, '');
    const problem = this.problems[this.currentProblem];
    
    if (!userAnswer) {
      this.showFeedback('Masukkan jawaban terlebih dahulu!', 'hint');
      return;
    }
    
    const correctAnswer = problem.answer;
    const isCorrect = this.checkAnswerEquivalence(userAnswer, correctAnswer);
    
    if (isCorrect) {
      this.correctAnswers++;
      this.score += 10;
      this.showFeedback('🎉 Benar! Jawaban Anda tepat.', 'correct');
    } else {
      this.wrongAnswers++;
      this.showFeedback(`❌ Kurang tepat. Jawaban yang benar adalah: Rp ${parseInt(problem.answer).toLocaleString()}`, 'incorrect');
    }
    
    this.completedProblems = Math.max(this.completedProblems, this.currentProblem + 1);
    this.updateStats();
  }
  
  checkAnswerEquivalence(userAnswer, correctAnswer) {
    // Remove non-numeric characters and compare
    const normalizedUser = userAnswer.replace(/[^0-9]/g, '');
    const normalizedCorrect = correctAnswer.replace(/[^0-9]/g, '');
    
    if (normalizedUser === normalizedCorrect) return true;
    
    // Check for numerical equivalence with tolerance
    try {
      const userNum = parseFloat(normalizedUser);
      const correctNum = parseFloat(normalizedCorrect);
      
      if (!isNaN(userNum) && !isNaN(correctNum)) {
        const tolerance = correctNum * 0.05; // 5% tolerance
        return Math.abs(userNum - correctNum) <= tolerance;
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
  
  // Utility functions
  formatRupiah(amount) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Initializing Financial Mathematics Learning App...');
  window.app = new FinancialMathApp();
  console.log('App initialized successfully!');
});

// Handle window resize for charts
window.addEventListener('resize', () => {
  if (window.app && window.app.charts) {
    Object.values(window.app.charts).forEach(chart => {
      if (chart && typeof chart.resize === 'function') {
        chart.resize();
      }
    });
  }
});