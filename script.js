const beginButton = document.getElementById('begin-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElem = document.getElementById('questions-box')
const questionBoxElem = document.getElementById('question-box')
const questionElem = document.getElementById('question')
const answerButtonsElem = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

beginButton.addEventListener('click', startQuiz)
nextButton.addEventListener("click", changeQuestion);
let nextQuestionIndex = 1
let answersCorrect = 0

function startQuiz() {
shuffledQuestions = questions.sort(() => Math.random() - .5)
currentQuestionIndex = 0
questionContainerElem.classList.remove('hide')
console.log(shuffledQuestions)
setNextQuestion(shuffledQuestions) 
}

function setNextQuestion (shuffledQuestions) {
    // resetState()
    console.log(shuffledQuestions)
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  beginButton.classList.add('hide')
questionElem.innerHTML = question.question
answerButtonsElem.innerHTML = "";
question.answers.forEach(answer => {
   const button = document.createElement('button') 
   button.classList.add("button-answer")
   console.log(answer)
   button.innerHTML = answer.text
   button.classList.add('btn')
   if (answer.correct) {
    button.dataset.correct = answer.correct
   }
   button.addEventListener('click', selectAnswer)
   
   answerButtonsElem.appendChild(button)
  })

}

function resetState() {
    nextButton.classList.add('hide')
    while (answerButtonsElem.firstChild) {
    answerButtonsElem.removeChild(answerButtonsElem.firstChild)
    }
}


function selectAnswer(e) {
    const selectedButton = e.target
    if(selectedButton.dataset.correct) {
        selectedButton.classList.add("correct");
        answersCorrect += 1
    }else{
        selectedButton.classList.add("wrong");
    const buttons =  document.querySelectorAll(".button-answer")
    buttons.forEach(button => button.setAttribute("disabled", ""));
    }
    nextButton.classList.remove('hide')
}

function changeQuestion() {
    if(nextQuestionIndex >= 3) {
        
        questionsFinished()  
        return 
       }
    console.log(nextQuestionIndex)
    showQuestion(questions[nextQuestionIndex])
    nextQuestionIndex += 1 
   
}

function questionsFinished() {
    console.log('finished')
    answerButtonsElem.innerHTML = ""
    questionElem.innerHTML = `Total Questions Correct: ${answersCorrect}`
    nextButton.classList.add('hide')
    beginButton.classList.remove('hide')
    beginButton.innerHTML = "Begin Again"
     nextQuestionIndex = 1
     answersCorrect = 0
}


let questions = [
  {
    question: 'Who created the first Javascript?',
    answers: [
        { text: 'Brendan Eich', correct: true },
        { text: 'Lenny Fraiser', correct: false },
        { text: 'Guido van Rossum', correct: false },
        { text: 'Steve Jobs', correct: false }
    ]
  }  , 
  {
    question: 'what is a common Javascript data type?',
    answers: [
        { text: 'symbol', correct: false },
        { text: 'un-null', correct: false },
        { text: 'text', correct: false },
        { text: 'boolean', correct: true }
    ]
},
{
    question: 'what are the 3 ways to create pop-ups in javascript?',
    answers: [
        { text: 'confirm, alert, text-box', correct: false },
        { text: 'alert, confirm, promt', correct: true },
        { text: 'promt, text-box, pull down', correct: false },
        { text: 'text-box, promt, alert', correct: false }
    ]
}
]

