const beginButton = document.getElementById('begin-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElem = document.getElementById('question-container')
const questionBoxElem = document.getElementById('question-box')
const questionElem = document.getElementById('question')
const answerButtonsElem = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

beginButton.addEventListener('click', startQuiz)

function startQuiz() {
beginButton.classList.add('hide')
shuffledQuestions = questions.sort(() => Math.random() - .5)
currentQuestionIndex = 0
questionContainerElem.classList.remove('hide')
setNextQuestion() 
}

function setNextQuestion () {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
questionElem.innerText = question.question
question.answers.forEach(answer => {
   const button = document.createElement('button') 
   button.innerText = answer.text
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
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElem.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    nextButton.classList.remove('hide')
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
       element.classList.add('correct') 
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Who created the first Javascript?',
    answers: [
        { text: 'Brendan Eich', correct: true },
        { text: 'Lenny Fraiser', correct: false },
        { text: 'Guido van Rossum', correct: false },
        { text: 'Steve Jobs', correct: false }
    ]
  }  
]