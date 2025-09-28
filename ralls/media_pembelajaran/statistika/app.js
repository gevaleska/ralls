// Global variables
let currentSection = 'beranda';
let currentTopic = 'pengenalan';
let currentChart = null;
let quizData = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let quizScore = 0;

// Initialize MathJax
window.MathJax = {
    tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']]
    },
    svg: {
        fontCache: 'global'
    }
};

// Quiz Questions Data
const quizQuestions = [
    {
        id: 1,
        question: "Dari data: 5, 7, 8, 6, 9, 5, 7, 8, 6, 9. Berapakah mean dari data tersebut?",
        type: "input",
        correctAnswer: "7",
        explanation: "Mean = (5+7+8+6+9+5+7+8+6+9)/10 = 70/10 = 7"
    },
    {
        id: 2,
        question: "Median dari data: 12, 15, 10, 18, 14, 16, 11 adalah...",
        type: "multiple",
        options: ["12", "14", "15", "16"],
        correctAnswer: "14",
        explanation: "Data diurutkan: 10, 11, 12, 14, 15, 16, 18. Median = nilai tengah = 14"
    },
    {
        id: 3,
        question: "Manakah yang termasuk data kualitatif?",
        type: "multiple",
        options: ["Tinggi badan siswa", "Jenis kelamin", "Umur siswa", "Berat badan"],
        correctAnswer: "Jenis kelamin",
        explanation: "Jenis kelamin adalah data kualitatif karena berupa kategori/atribut, bukan angka"
    },
    {
        id: 4,
        question: "Jika range suatu data adalah 25 dan nilai terendah adalah 15, maka nilai tertinggi adalah...",
        type: "input",
        correctAnswer: "40",
        explanation: "Range = Nilai tertinggi - Nilai terendah, maka 25 = Nilai tertinggi - 15, sehingga Nilai tertinggi = 40"
    },
    {
        id: 5,
        question: "Modus dari data: 3, 5, 7, 5, 8, 5, 9, 7 adalah...",
        type: "multiple",
        options: ["3", "5", "7", "8"],
        correctAnswer: "5",
        explanation: "Modus adalah nilai yang paling sering muncul. Nilai 5 muncul 3 kali, paling sering"
    },
    {
        id: 6,
        question: "Dalam pembuatan histogram, sumbu X mewakili...",
        type: "multiple",
        options: ["Frekuensi", "Kelas interval", "Titik tengah", "Jumlah data"],
        correctAnswer: "Kelas interval",
        explanation: "Pada histogram, sumbu X (horizontal) mewakili kelas interval data"
    },
    {
        id: 7,
        question: "Dari data: 20, 25, 30, 35, 40. Berapakah simpangan baku populasi?",
        type: "input",
        correctAnswer: "7.07",
        explanation: "Mean = 30, Variance = ((20-30)²+(25-30)²+(30-30)²+(35-30)²+(40-30)²)/5 = 50, Simpangan baku = √50 ≈ 7.07"
    },
    {
        id: 8,
        question: "Kuartil pertama (Q1) membagi data menjadi berapa persen?",
        type: "multiple",
        options: ["25%", "50%", "75%", "100%"],
        correctAnswer: "25%",
        explanation: "Q1 (kuartil pertama) membagi data menjadi 25% data di bawahnya dan 75% data di atasnya"
    },
    {
        id: 9,
        question: "Manakah rumus yang benar untuk menghitung mean data berkelompok?",
        type: "multiple",
        options: ["Σx/n", "Σ(f·x)/Σf", "Σf/x", "Σx·f"],
        correctAnswer: "Σ(f·x)/Σf",
        explanation: "Untuk data berkelompok, mean = Σ(f·x)/Σf, dimana f adalah frekuensi dan x adalah titik tengah kelas"
    },
    {
        id: 10,
        question: "Dalam diagram lingkaran, jika suatu kategori memiliki frekuensi 15 dari total 60 data, maka sudut sektornya adalah...",
        type: "input",
        correctAnswer: "90",
        explanation: "Sudut = (frekuensi/total) × 360° = (15/60) × 360° = 90°"
    }
];

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for all resources to load
    setTimeout(() => {
        initializeApp();
        initializeQuiz();
    }, 100);
});

function initializeApp() {
    // Set up navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            navigateToSection(section);
        });
    });

    // Set up topic navigation
    const topicBtns = document.querySelectorAll('.topic-btn');
    topicBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const topic = this.getAttribute('data-topic');
            switchTopic(topic);
        });
    });

    // Initialize MathJax rendering
    if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise().catch(function (err) {
            console.log('MathJax typeset failed: ' + err.message);
        });
    }
}

function navigateToSection(section) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(sec => sec.classList.remove('active'));

    // Show target section
    const targetSection = document.getElementById(section);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Update navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === section) {
            link.classList.add('active');
        }
    });

    currentSection = section;

    // Special handling for quiz section
    if (section === 'latihan') {
        setTimeout(() => {
            initializeQuiz();
        }, 100);
    }
}

function switchTopic(topic) {
    // Hide all topic contents
    const contents = document.querySelectorAll('.topic-content');
    contents.forEach(content => content.classList.remove('active'));

    // Show target topic
    const targetTopic = document.getElementById(topic);
    if (targetTopic) {
        targetTopic.classList.add('active');
    }

    // Update topic buttons
    const buttons = document.querySelectorAll('.topic-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-topic') === topic) {
            btn.classList.add('active');
        }
    });

    currentTopic = topic;

    // Re-render MathJax for the new content
    if (window.MathJax && window.MathJax.typesetPromise) {
        setTimeout(() => {
            window.MathJax.typesetPromise([targetTopic]).catch(function (err) {
                console.log('MathJax typeset failed: ' + err.message);
            });
        }, 100);
    }
}

// Statistics Calculator Functions
function calculateStats() {
    const input = document.getElementById('dataInput').value.trim();
    if (!input) {
        alert('Masukkan data terlebih dahulu!');
        return;
    }

    try {
        const data = input.split(',').map(x => parseFloat(x.trim())).filter(x => !isNaN(x));
        
        if (data.length === 0) {
            alert('Data tidak valid! Pastikan menggunakan format yang benar.');
            return;
        }

        const stats = {
            mean: calculateMean(data),
            median: calculateMedian(data),
            mode: calculateMode(data),
            range: calculateRange(data)
        };

        displayStats(stats);
    } catch (error) {
        alert('Terjadi kesalahan dalam perhitungan. Periksa format data Anda.');
    }
}

function calculateMean(data) {
    const sum = data.reduce((acc, val) => acc + val, 0);
    return (sum / data.length).toFixed(2);
}

function calculateMedian(data) {
    const sorted = [...data].sort((a, b) => a - b);
    const n = sorted.length;
    if (n % 2 === 0) {
        return ((sorted[n/2 - 1] + sorted[n/2]) / 2).toFixed(2);
    } else {
        return sorted[Math.floor(n/2)].toFixed(2);
    }
}

function calculateMode(data) {
    const frequency = {};
    data.forEach(val => {
        frequency[val] = (frequency[val] || 0) + 1;
    });

    let maxFreq = 0;
    let modes = [];
    
    for (let val in frequency) {
        if (frequency[val] > maxFreq) {
            maxFreq = frequency[val];
            modes = [val];
        } else if (frequency[val] === maxFreq) {
            modes.push(val);
        }
    }

    return modes.length === data.length ? 'Tidak ada modus' : modes.join(', ');
}

function calculateRange(data) {
    const min = Math.min(...data);
    const max = Math.max(...data);
    return (max - min).toFixed(2);
}

function displayStats(stats) {
    document.getElementById('meanResult').textContent = stats.mean;
    document.getElementById('medianResult').textContent = stats.median;
    document.getElementById('modeResult').textContent = stats.mode;
    document.getElementById('rangeResult').textContent = stats.range;
    
    document.getElementById('statsResults').classList.remove('hidden');
}

// Chart Generation Functions
function generateChart() {
    const labelsInput = document.getElementById('chartLabels').value.trim();
    const dataInput = document.getElementById('chartData').value.trim();
    const chartType = document.getElementById('chartType').value;

    if (!labelsInput || !dataInput) {
        alert('Masukkan label dan data terlebih dahulu!');
        return;
    }

    try {
        const labels = labelsInput.split(',').map(x => x.trim());
        const data = dataInput.split(',').map(x => parseFloat(x.trim())).filter(x => !isNaN(x));

        if (labels.length !== data.length) {
            alert('Jumlah label dan data harus sama!');
            return;
        }

        // Wait for Chart.js to be available
        if (typeof Chart === 'undefined') {
            alert('Chart library sedang dimuat, silakan coba lagi dalam beberapa detik.');
            return;
        }

        const ctx = document.getElementById('myChart');
        if (!ctx) {
            alert('Canvas untuk chart tidak ditemukan.');
            return;
        }

        const context = ctx.getContext('2d');
        
        // Destroy existing chart
        if (currentChart) {
            currentChart.destroy();
            currentChart = null;
        }

        const colors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B'];

        const config = {
            type: chartType,
            data: {
                labels: labels,
                datasets: [{
                    label: 'Data',
                    data: data,
                    backgroundColor: colors.slice(0, data.length),
                    borderColor: colors.slice(0, data.length),
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: `Grafik ${chartType === 'bar' ? 'Batang' : chartType === 'pie' ? 'Lingkaran' : 'Garis'}`
                    },
                    legend: {
                        display: chartType === 'pie'
                    }
                },
                scales: chartType !== 'pie' ? {
                    y: {
                        beginAtZero: true
                    }
                } : {}
            }
        };

        currentChart = new Chart(context, config);
        
        // Show success message
        setTimeout(() => {
            alert('Grafik berhasil dibuat!');
        }, 500);

    } catch (error) {
        console.error('Chart generation error:', error);
        alert('Terjadi kesalahan dalam pembuatan grafik. Pastikan Chart.js sudah dimuat.');
    }
}

// Quiz Functions
function initializeQuiz() {
    // Reset quiz state
    quizData = [...quizQuestions];
    currentQuestionIndex = 0;
    userAnswers = [];
    quizScore = 0;
    
    // Reset displays
    document.getElementById('currentScore').textContent = '0';
    
    // Show quiz question container and hide results
    const quizQuestion = document.getElementById('quizQuestion');
    const quizResults = document.getElementById('quizResults');
    
    if (quizQuestion) {
        quizQuestion.classList.remove('hidden');
    }
    if (quizResults) {
        quizResults.classList.add('hidden');
    }
    
    // Load first question
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestionIndex >= quizData.length) {
        showQuizResults();
        return;
    }

    const question = quizData[currentQuestionIndex];
    
    // Update question text
    const questionTextElement = document.getElementById('questionText');
    if (questionTextElement) {
        questionTextElement.textContent = question.question;
    }
    
    // Update counter
    const questionCounter = document.getElementById('questionCounter');
    if (questionCounter) {
        questionCounter.textContent = `${currentQuestionIndex + 1}/${quizData.length}`;
    }
    
    // Update progress bar
    const progressPercent = ((currentQuestionIndex) / quizData.length) * 100;
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = `${progressPercent}%`;
    }

    // Build answer options
    const optionsContainer = document.getElementById('answerOptions');
    if (!optionsContainer) {
        console.error('Answer options container not found');
        return;
    }
    
    optionsContainer.innerHTML = '';

    if (question.type === 'multiple') {
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'answer-option';
            optionElement.textContent = option;
            optionElement.onclick = () => selectOption(optionElement, option);
            optionsContainer.appendChild(optionElement);
        });
    } else if (question.type === 'input') {
        const inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.className = 'answer-input';
        inputElement.id = 'answerInput';
        inputElement.placeholder = 'Masukkan jawaban Anda...';
        optionsContainer.appendChild(inputElement);
    }

    // Reset buttons
    const submitBtn = document.getElementById('submitAnswer');
    const nextBtn = document.getElementById('nextQuestion');
    const feedbackElement = document.getElementById('quizFeedback');
    
    if (submitBtn) submitBtn.classList.remove('hidden');
    if (nextBtn) nextBtn.classList.add('hidden');
    if (feedbackElement) feedbackElement.classList.add('hidden');
}

function selectOption(element, answer) {
    // Remove selection from other options
    const options = document.querySelectorAll('.answer-option');
    options.forEach(opt => opt.classList.remove('selected'));
    
    // Select current option
    element.classList.add('selected');
    element.setAttribute('data-answer', answer);
}

function submitAnswer() {
    const question = quizData[currentQuestionIndex];
    let userAnswer = '';

    if (question.type === 'multiple') {
        const selectedOption = document.querySelector('.answer-option.selected');
        if (!selectedOption) {
            alert('Pilih jawaban terlebih dahulu!');
            return;
        }
        userAnswer = selectedOption.getAttribute('data-answer');
    } else if (question.type === 'input') {
        const inputElement = document.getElementById('answerInput');
        userAnswer = inputElement.value.trim();
        if (!userAnswer) {
            alert('Masukkan jawaban terlebih dahulu!');
            return;
        }
    }

    // Check answer
    const isCorrect = checkAnswer(userAnswer, question.correctAnswer);
    userAnswers.push({
        question: question.question,
        userAnswer: userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect: isCorrect
    });

    if (isCorrect) {
        quizScore++;
    }

    // Update score display
    const currentScoreElement = document.getElementById('currentScore');
    if (currentScoreElement) {
        currentScoreElement.textContent = quizScore;
    }

    // Show feedback
    showFeedback(isCorrect, question.explanation);
    
    // Update button states
    const submitBtn = document.getElementById('submitAnswer');
    const nextBtn = document.getElementById('nextQuestion');
    
    if (submitBtn) submitBtn.classList.add('hidden');
    if (nextBtn) nextBtn.classList.remove('hidden');
}

function checkAnswer(userAnswer, correctAnswer) {
    // For numeric answers, allow small tolerance
    if (!isNaN(userAnswer) && !isNaN(correctAnswer)) {
        return Math.abs(parseFloat(userAnswer) - parseFloat(correctAnswer)) < 0.01;
    }
    
    // For string answers, case-insensitive comparison
    return userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
}

function showFeedback(isCorrect, explanation) {
    const feedbackElement = document.getElementById('quizFeedback');
    const titleElement = document.getElementById('feedbackTitle');
    const explanationElement = document.getElementById('feedbackExplanation');

    if (titleElement) {
        titleElement.textContent = isCorrect ? '✅ Benar!' : '❌ Salah!';
        titleElement.className = isCorrect ? 'correct' : 'incorrect';
    }
    
    if (explanationElement) {
        explanationElement.textContent = explanation;
    }

    if (feedbackElement) {
        feedbackElement.classList.remove('hidden');
    }

    // Mark options with correct/incorrect colors
    if (quizData[currentQuestionIndex].type === 'multiple') {
        const options = document.querySelectorAll('.answer-option');
        options.forEach(option => {
            const answer = option.getAttribute('data-answer') || option.textContent;
            if (answer === quizData[currentQuestionIndex].correctAnswer) {
                option.classList.add('correct');
            } else if (option.classList.contains('selected') && !isCorrect) {
                option.classList.add('incorrect');
            }
        });
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

function showQuizResults() {
    // Hide question interface
    const quizQuestion = document.getElementById('quizQuestion');
    const quizFeedback = document.getElementById('quizFeedback');
    
    if (quizQuestion) quizQuestion.classList.add('hidden');
    if (quizFeedback) quizFeedback.classList.add('hidden');
    
    // Show results
    const resultsElement = document.getElementById('quizResults');
    const finalScoreElement = document.getElementById('finalScore');
    const percentageElement = document.getElementById('scorePercentage');
    
    const percentage = Math.round((quizScore / quizData.length) * 100);
    
    if (finalScoreElement) {
        finalScoreElement.textContent = quizScore;
    }
    
    if (percentageElement) {
        percentageElement.textContent = `${percentage}%`;
    }
    
    // Update progress bar to 100%
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = '100%';
    }
    
    if (resultsElement) {
        resultsElement.classList.remove('hidden');
    }
}

function restartQuiz() {
    // Reset quiz state
    currentQuestionIndex = 0;
    userAnswers = [];
    quizScore = 0;
    
    // Reset displays
    const currentScoreElement = document.getElementById('currentScore');
    if (currentScoreElement) {
        currentScoreElement.textContent = '0';
    }
    
    const quizQuestion = document.getElementById('quizQuestion');
    const quizResults = document.getElementById('quizResults');
    
    if (quizQuestion) quizQuestion.classList.remove('hidden');
    if (quizResults) quizResults.classList.add('hidden');
    
    // Load first question
    loadQuestion();
}

// Utility Functions
function smoothScrollTo(element) {
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Export functions for global access
window.navigateToSection = navigateToSection;
window.switchTopic = switchTopic;
window.calculateStats = calculateStats;
window.generateChart = generateChart;
window.submitAnswer = submitAnswer;
window.nextQuestion = nextQuestion;
window.restartQuiz = restartQuiz;