
var startButton = document.querySelector("#start-button");
var questionsArray = ["Commonly used data types do NOT include", 
    "How do you create a button using Javascript DOM?", 
        "What function allows you to set a trigger for a certain event in Javascript?", 
            "What does HTML stand for?"];
var answerChoiceArray = [["String", "Integer", "Prompt", "Boolean"], 
    ["element.createButton()", "document.createElement('button')", 
        "document.createButton()", "document.makeButtonElement()"], 
            ["addEventListener()", "addListenerTrigger()", "elementTriggerEvent()", "addTrigger()"], 
            ["Hypertext Mix Language", "Hyper Textual Millenium Learnings",
                 "Hypertext Markup List", "Hypertext Markup Language"]];
var correctAnswersArray = ["Prompt", "document.createElement('button')", "addEventListener()",
     "Hypertext Markup Language"];
var questionText = document.querySelector("#text");

var buttonContainer = document.querySelector(".button-container");
var ul = document.querySelector("ul");
buttonContainer.appendChild(ul);
var alertText = document.createElement("h2"); //pops up when user is wrong or correct
var questionNum = 0;
var numQuestionsCorrect = 0;

var secondsLeft = 60;
var timeEl = document.querySelector("#time");
timeEl.style.fontFamily = "Arial";
var SECONDS_DEDUCTION = 10;
var timeRanOut = 0;
var quizFinished = 0;



function quizFunction(questionNum) {

    for (var i = 0; i < answerChoiceArray[questionNum].length; i++) {
        questionText.textContent = questionsArray[questionNum];
        var answerButton = document.createElement("button");
        
        var li = document.createElement("li");
        li.style = "list-style:none; margin: 10px 0px 10px 0px";
       
        ul.appendChild(li);
        li.appendChild(answerButton).textContent = answerChoiceArray[questionNum][i];
        answerButton.addEventListener("click", function (event) {
            var element = event.target;
            alertText.style.fontFamily = "Arial";
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
            setTimeout(function () {
                alertText.parentElement.removeChild(alertText);
            }, 2000);
            questionNum++;
            ul.innerHTML = '';
            //display ending screen at end of quiz
            if (questionNum === questionsArray.length) {
                quizFinished = 1;
                quizEndDisplay();
            }
            quizFunction(questionNum);
        });
    }
};

function quizEndDisplay() {
    buttonContainer.innerHTML = '';
    buttonContainer.style.fontFamily = "Arial";
    if (timeRanOut === 0) {
        
        questionText.textContent = 'You finished the quiz! You got ' + numQuestionsCorrect + ' questions correct!'
    }
    else {
        questionText.textContent = 'Time ran out! You got ' + numQuestionsCorrect + ' questions correct!'
    }
    var initialsForSave = document.createElement("input");
    initialsForSave.setAttribute("type", "text");
    initialsForSave.placeholder = "Type your initials here!";
    initialsForSave.style = "margin-left: 10px";
    var submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    buttonContainer.appendChild(document.createElement("p")).innerText = "Type your initials here to save your quiz score: "
    buttonContainer.appendChild(initialsForSave);
    buttonContainer.appendChild(submitButton);
    submitButton.style = "margin-left: 10px";

    submitButton.addEventListener("click", function (event) {
        var user = initialsForSave.value;
        var usernameAndScoreObject = {
            username: user,
            highscore: numQuestionsCorrect
        };
        if (localStorage.getItem("highScoresString") !== null) { //checks if there are past high scores on users PC
            var highScoresString = localStorage.getItem("highScoresString");
            var highScoresArray = JSON.parse(highScoresString);
        }
        else {
            var highScoresArray = [];
        }
        highScoresArray.push(usernameAndScoreObject);
        var newHighScoresString = JSON.stringify(highScoresArray);
        localStorage.setItem("highScoresString", newHighScoresString);
        pastQuizUsers();
    });



};

function pastQuizUsers() {

    var highScoresString = localStorage.getItem("highScoresString");
    var highScoresArray = JSON.parse(highScoresString);
    buttonContainer.innerHTML = '';
    questionText.textContent = "Top High Scores";
    var ul = document.createElement("ul");
    buttonContainer.appendChild(ul);

    for (var i = 0; i < highScoresArray.length; i++) {
        var usernameAndScore = document.createElement("li");
        usernameAndScore.innerHTML = "<strong>" + highScoresArray[i].username + ": </strong>  "
            + highScoresArray[i].highscore + "";
        usernameAndScore.style = "list-style: none";
        ul.appendChild(usernameAndScore);

    };

    var newButtonDiv = document.createElement("div");
    document.body.appendChild(newButtonDiv);
    newButtonDiv.style.textAlign="center";



    var clearHighScores = document.createElement("button"); //creating clear scores button
    clearHighScores.textContent = "Clear High Scores";
    clearHighScores.style = "margin: 10px 10px 0px 0px";
    newButtonDiv.appendChild(clearHighScores);

    clearHighScores.addEventListener("click", function(event) { //clears local storage when button clicked
        localStorage.clear();
        ul.textContent="";
    });

    var backButton = document.createElement("button"); //creating back button
    backButton.textContent = "Go back!";
    backButton.style = "margin-top: 10px";
    newButtonDiv.append(backButton);

    backButton.addEventListener("click", function (event) {
        landingPage();
    })


}



startButton.addEventListener("click", function (event) {
    var timerInterval = setInterval(function () { //sets 60 second timer
        secondsLeft--;
        timeEl.textContent = secondsLeft;
        if (quizFinished === 1) { //when user finishes quiz timer stops
            clearInterval(timerInterval);
            quizEndDisplay();
        }
        if (secondsLeft === 0) { //quiz ending page shows when timer hits zero
            clearInterval(timerInterval);
            timeRanOut = 1;
            quizEndDisplay();
        }
    }, 1000);
    startButton.parentElement.removeChild(startButton); //remove the start button
    quizFunction(questionNum);
});

function landingPage() {
    location.reload();
};