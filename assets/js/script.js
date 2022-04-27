//selecting elements by id
const startBtn = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerEl = document.getElementById('question-container');
const questionEl = document.getElementById('question');
const answerButtonsEl = document.getElementById('answer-grid');
var timerEl = document.getElementById('timer');
//variables to make the timer 
var timer;
var timeLeft=60;


let shuffleQuestions, currentQuestionI;

//event listeners for start button and next button
startBtn.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionI++
    nextQuestion()
})
//hiding start btn after its clicked, and showing shuffled questions w answers
function startGame() {
    startBtn.classList.add('hide')
    questionContainerEl.classList.remove('hide')
    timerEl.classList.remove('hide')
    shuffleQuestions = questions.sort(() => Math.random() -.5)
    currentQuestionI=0
    nextQuestion()
    //timer init
    
        timer = setInterval(() => {
            timerEl.innerHTML=timeLeft;
            if(timeLeft === 0){
                clearInterval(timer)
            }
            timeLeft--
        }, 1000);
        
}

function nextQuestion() {
    resetState()
    showQuestion(shuffleQuestions[currentQuestionI])
    
}

function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach (answer => {
        const button = document.createElement('button')
            button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click',selectAnswer)
        answerButtonsEl.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild)
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target
    const correct = selectedBtn.dataset.correct
    setstatusClass(document.body, correct)
    Array.from(answerButtonsEl.children).forEach(button => {
        setstatusClass(button, button.dataset.correct)
    })
    if(shuffleQuestions.length > currentQuestionI + 1) {
        nextButton.classList.remove('hide')
    } else {
        startBtn.innerText = 'Restart'
        startBtn.classList.remove('hide')
    }
}

function setstatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('incorrect');
        timeLeft -=5;
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('incorrect')
}

const questions = [{
    question:"What is the '===' operator in javascript?",
    answers: [
        {text: 'assignment operator', correct:false },
        {text: 'comparison operator', correct: true },
        {text: 'ternary operator', correct:false },
        {text: 'addition operator', correct:false}
    ]},
{
    question:"boolean is a datatype in javascript?",
    answers: [
        {text: 'true', correct:true},
        {text: 'false', correct: false}
    ]
},
{
    question:"what does the 'this' keyword refer to?",
    answers:[
        {text:'the document object', correct:false},
        {text: 'a for loop',correct:false},
        {text:'the console log',correct:false},
        {text:'this refers to the object from where it was called',correct:true}
    ]
}]
