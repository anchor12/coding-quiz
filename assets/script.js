var startButton = document.querySelector("#start-button");
var questionsArray = ["Which is best animal?", "What colour is sky?", "What time is the night?", "How many legs does horse have?"];
var answerChoiceArray = [["Dog", "Cat", "Chicken", "Monkey"], ["Blue", "Green", "Pink", "Rainbow"], ["Late", "7am", "Lunchtime", "3pm"], ["4", "7", "1", "0"]]
var correctAnswersArray = ["Dog", "Blue", "Late", "4"];
var questionText = document.querySelector("#text");
var buttonContainer = document.querySelector(".button-container");
var alertText = document.createElement("h2"); //pops up when user is wrong or correct
var questionNum = 0;
var numQuestionsCorrect = 0;

var secondsLeft = 60;
var timeEl = document.querySelector("#time");
var SECONDS_DEDUCTION = 10;
var timeRanOut = 0;


function quizFunction(questionNum) {

    for (var i = 0; i < answerChoiceArray[questionNum].length; i++) {
        questionText.textContent = questionsArray[questionNum];
        var answerButton = document.createElement("button");
        buttonContainer.appendChild(answerButton).textContent = answerChoiceArray[questionNum][i];
        answerButton.addEventListener("click", function (event) {
            var element = event.target;
            if (element.textContent === correctAnswersArray[questionNum]) {
                alertText.textContent = 'Correct!';
                numQuestionsCorrect++;
            }
            else {
                alertText.textContent = 'Wrong!';
                secondsLeft -= SECONDS_DEDUCTION;
            }
            document.body.appendChild(alertText); //display 'Correct' or 'Wrong' after selecting answer
            //remove alert 2 seconds after being displayed
            setTimeout(function () { alertText.parentElement.removeChild(alertText); }, 2000);
            questionNum++;
            buttonContainer.innerHTML = '';
            //display ending screen at end of quiz
            if (questionNum === questionsArray.length) {
                quizEndDisplay();
            }
            quizFunction(questionNum);
        });
    }
};

function quizEndDisplay() {
    buttonContainer.innerHTML = '';
    if (timeRanOut===0) {
        questionText.textContent = 'You finished the quiz! You got ' + numQuestionsCorrect + ' questions correct!'
    }
    else {
        questionText.textContent = 'Time ran out! You got ' + numQuestionsCorrect + ' questions correct!'
    }
   

};


startButton.addEventListener("click", function (event) {


    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft;

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            timeRanOut = 1;
            quizEndDisplay();
        }

    }, 1000);
    startButton.parentElement.removeChild(startButton); //remove the start button
    quizFunction(questionNum);
})