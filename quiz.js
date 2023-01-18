const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');
// const timeCounterText = document.getElementById('timeCounter')

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];
// Questions List
let questions = [
    {
        question: 'Commonly used data types DO NOT include:',
        choice1: '<strings>',
        choice2: '<booleans>',
        choice3: '<alerts>',
        choice4: '<numbers>',
        answer: 3,
    },
    {
        question:
            "The condition in an if / else statement is enclosed within ____",
        choice1: "<quotes>",
        choice2: "<curly brackets'>",
        choice3: "<parentheses>",
        choice4: "<square brackets>",
        answer: 3,
    },
    {
        question: "Arrays in JavaScript can be used to store _____",
        choice1: "<numbers and strings>",
        choice2: "<other arrays>",
        choice3: "<booleans>",
        choice4: "<all of the above>",
        answer: 4,
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables",
        choice1: "<commas>",
        choice2: "<quotes>",
        choice3: "<curly brackets>",
        choice4: "<parentheses>",
        answer: 2,
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choice1: "<JavaScript>",
        choice2: "<terminal / bash>",
        choice3: "<for loops>",
        choice4: "<console.log>",
        answer: 4,
    },
];

// CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        //Go to the end page
        return window.location.assign('end.html');
    }
    
    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
    // Random order questions
    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });
    // Removes last questions from selectable questions
    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};
// Choices function being either correct / incorrect
choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
        selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        // Correct Score
        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }
        // Incorrect decrement to time
        if (classToApply === "incorrect") {
        timeleft = timeleft-4
        }
      selectedChoice.parentElement.classList.add(classToApply);
  
      setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
    }, 1000);
    });
});
// Timer Function
var timeleft = 35;
var downloadTimer = setInterval(function() {
  timeleft--;
    document.getElementById("timeCounter").textContent = timeleft;
    if(timeleft <= 1) {
        clearInterval(downloadTimer);
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign('end.html');
        
    }},1000);

// Adds Ten points per correct answer
incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();