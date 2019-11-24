startButton = document.querySelector("#start-button");
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
                secondsLeft -= 10;
            }
            document.body.appendChild(alertText); //display 'Correct' or 'Wrong' after selecting answer
            //remove alert 2 seconds after being displayed
            setTimeout(function () { alertText.parentElement.removeChild(alertText); }, 2000);
            questionNum++;
            buttonContainer.innerHTML = '';
            quizFunction(questionNum);
        });
    }
};


startButton.addEventListener("click", function (event) {
    

    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft;

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            alert("OUT OF TIME");
        }

    }, 1000);
    startButton.parentElement.removeChild(startButton); //remove the start button
    quizFunction(questionNum);
})