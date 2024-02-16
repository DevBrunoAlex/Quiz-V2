const question = [
    {
        question: "O que é informática?",
        answers: [
            { text: "Estudo e aplicação de métodos para o processamento de informações por meio de computadores", correct: true },
            { text: "Curso fornecido pelo Senac", correct: false },
            { text: "Setor de uma empresa de tecnologia", correct: false },
            { text: "Um tipo de computador", correct: false },
        ]
    },
    {
        question: "O que é hardware?",
        answers: [
            { text: "Um conjunto de instruções", correct: false },
            { text: "Componentes físicos de um computador", correct: true },
            { text: "Sistema operacional de um computador", correct: false },
            { text: "Um software de segurança", correct: false },
        ]
    },
    {
        question: "O que é software?",
        answers: [
            { text: "A marca de um computador", correct: false },
            { text: "Todos os sistemas e programas de um computador", correct: true },
            { text: "Uma impressora 3D", correct: false },
            { text: "Um tipo de hardware", correct: false },
        ]
    },
    {
        question: "Quais das opções abaixo contém somente HARDWARES?",
        answers: [
            { text: "Word, excel e power point", correct: false },
            { text: "Netflix, youtube e instagram", correct: false },
            { text: "Steam, vs code e trello", correct: false },
            { text: "Memória ram, processador e ssd", correct: true },
        ]
    },
    {
        question: "Quais das opções abaixo contém somente SOFTWARES?",
        answers: [
            { text: "Monitor, teclado e mouse", correct: false },
            { text: "Placa de vídeo, cooler e HD", correct: false },
            { text: "Gmail, office e photoshop", correct: true },
            { text: "Fonte, web cam e caixa de som", correct: false },
        ]
    },
    {
        question: "Quem criou a MICROSOFT?",
        answers: [
            { text: "Satya Nadella", correct: false },
            { text: "Bill Gates", correct: true },
            { text: "Linus Torvalds", correct: false },
            { text: "Phil Spencer", correct: false },
        ]
    },
    {
        question: "Quem criou o sistema LINUX?",
        answers: [
            { text: "Satya Nadella", correct: false },
            { text: "Bill Gates", correct: false },
            { text: "Linus Torvalds", correct: true },
            { text: "Phil Spencer", correct: false },
        ]
    },
    {
        question: "Qual dessas interfaces não faz parte do sistema LINUX",
        answers: [
            { text: "Fedora", correct: false },
            { text: "Ubuntu", correct: false },
            { text: "Kali Linux", correct: false },
            { text: "Big Sur", correct: true },
        ]
    },
    {
        question: "Qual desses ativos a Microsoft abandonou?",
        answers: [
            { text: "Skype", correct: false },
            { text: "Windows Phone", correct: true },
            { text: "Xbox", correct: false },
            { text: "Linkedin", correct: false },
        ]
    },
    {
        question: "O que é dual boot?",
        answers: [
            { text: "Ter três sistemas no mesmo computador", correct: false },
            { text: "Uma empresa que a Microsoft comprou", correct: false },
            { text: "Ter dois sistema no mesmo computador", correct: true },
            { text: "Uma linguagem de programação", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Próxima";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = question[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Você acertou ${score} de ${question.length}`;
    nextButton.innerHTML = "Refazer";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < question.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < question.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();