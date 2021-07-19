var quizStatus = true; // Know the status of the quiz. Quiz is not running = false , running = true
var questionNumber = 0; // Track the question answered.
var answerNumber = 0; // Track next answers to show
var score = 0; // Max value by decreasing each wrong answer
var highScore = 50; // Score add fix for ticking timer.
var finalAnswerCheck = 0 // If last answer was wrong it will be validated outside of the time interval and then display as enabled = 1 
var checkTimes = 1 // Check timer times call for function on last question
var viewHighScoresBtnEl = document.getElementById('view-high-scores'); // View High Scores Btn El
var startQuizBtnEl = document.getElementById('start-quiz'); // Start Quiz button Btn El
var answer1BtnEl = document.getElementById('answer1'); // Start Quiz button Btn El
var answer2BtnEl = document.getElementById('answer2'); // Start Quiz button Btn El
var answer3BtnEl = document.getElementById('answer3'); // Start Quiz button Btn El
var answer4BtnEl = document.getElementById('answer4'); // Start Quiz button Btn El
var submitScoreEl = document.getElementById('submitScore'); // Start Quiz button Btn El
var questionsEl = document.getElementById('questions'); // Questions for the main Div
var mainDivEl = document.getElementById('mainDiv'); // Main div container for all elements except for header elements
var htmlTimeLeft = document.getElementById('timeLeft'); // Display counter @ the html level.
var answerCorrectWrong = document.getElementById('answerCorrectWrong'); // Display counter @ the html level.
var questionDisplayEl = document.createElement("questionDisplay"); // Display Question
var finalScoreDisplayEl = document.createElement("finalScoreDisplay"); // Display Question
var enterInitialsEl = document.createElement("enterInitials"); // Enter initials
var enterInitialsTextAreaEl = document.createElement("enterInitialsTextArea"); // TextArea
var button1234 = document.createElement("button"); // Test answer 1
var timeLeft = 60; // Global time left assignment counter


// Do not display anything that is not ready to be displayed
answer1BtnEl.style.display = 'none';
answer2BtnEl.style.display = 'none';
answer3BtnEl.style.display = 'none';
answer4BtnEl.style.display = 'none';
submitScoreEl.style.display = 'none';
answerCorrectWrong.style.display = 'none';
enterInitialsTextArea.style.display = 'none';

var questionsObject = { // Object that holds correct answers.
    correct: {
        0: "Commonly used datatypes DO NOT include?",
        1: "The condition statement if/else is enclosed with the following:",
        2: "Arrays can be used to store the following", // Button #4 for 
        3: "A very useful tool to debug arrays is:", // Button #3
        4: "Strings must be enclosed with:"
    }
};

var answersObject = { // Object that holds correct answers.
    answers: {
        0: {
            0: "Strings",
            1: "Boolean",
            2: "Alerts",
            3: "Numbers"
        },
        1: {
            0: "Parentheses",
            1: "Curly Brackets",
            2: "Quotes",
            3: "Square Brackets"
        },
        2: { // Button #3
            0: "Javascript",
            1: "Terminal/bash",
            2: "For loops",
            3: "Console.log"
        },
        3: { // Answer to question 5 --> Button #2
            0: "Commas",
            1: "Curly brackets",
            2: "Quotes",
            3: "Parentheses"
        },
        4: { // Button #4
            0: "Number of strings",
            1: "Other arrays",
            2: "Booleans",
            3: "All of the above"
        },
    }
};

//Initialize the display timer at default value
htmlTimeLeft.textContent = timeLeft;

viewHighScoresBtnEl.addEventListener("click", function() { // View high scores

    var quizUsers = "";
    var substringTest = "";
    var highScores = "";

    for (var i = 0; i < localStorage.length; i++) {
        var checkUserValue = [];

        quizUsers = localStorage.getItem(localStorage.key(i));
        substringTest = quizUsers.substring(0, 4)
        if (substringTest == "quiz") {
            checkUserValue = quizUsers.split(",");
            var userName = checkUserValue[0]
            highScores += "User " + userName.substring(4) + " high score is: " + checkUserValue[1] + "\n";
        }
    }
    window.alert(highScores);

});

submitScoreEl.addEventListener("click", function() { // Submit high scores


    var quizLocalStorage = "quiz";
    var quizUserDetails = "";
    var value = [];

    //If good input the value will be assign properly.
    quizUserDetails = quizLocalStorage + enterInitialsTextArea.value
    value = [quizUserDetails, highScore] // Create an array for validation


    // Add test entry @local storage in order to be able to get the lentgh of the local storage.
    // If user clears the data at local storage the below code will not work unless there is at least on entry.
    if (!localStorage.length) {
        localStorage.setItem("test", "test");
    }


    for (var i = 0; i < localStorage.length; i++) {

        var checkUser = "";
        var checkUserValue = [];

        // Assign value again
        quizUserDetails = quizLocalStorage + enterInitialsTextArea.value;

        // Check if assigned value exist in the local storage
        checkUser = localStorage.getItem(quizUserDetails);
        // quizInitial + score will be checked against the input from the user to validate if exist already in local storage

        if (checkUser == null) { // New user, no need to split
            localStorage.setItem(quizUserDetails, value); // Value is equal to 
            window.alert("Your score of " + highScore + " has been submitted!")
            break;
        } else if (checkUser != null) {
            checkUserValue = checkUser.split(","); // Split since the ojbect exist in local storage


        }




        if (quizUserDetails == checkUserValue[0] && highScore == checkUserValue[1]) {


            // Only insert if the current highScore is higher, 
            // otherwise let the user know they had a higher score alreay
            localStorage.setItem(quizUserDetails, value); // Value is equal to 
            window.alert(highScore + " " + "is the latest entry for user initial " + enterInitialsTextArea.value + ". Entry will not be added.")
            break;
        } else if (enterInitialsTextArea.value == "") {
            window.alert("Please enter an initial");
            break;
        } else if (quizUserDetails == checkUserValue[0] && highScore > checkUserValue[1]) {
            // New high score submitted!
            localStorage.setItem(quizUserDetails, value); // Value is equal to 
            window.alert("New high score of " + highScore + " has been submitted!.\nYour previous score was " + checkUserValue[1])
            break;
        } else if (quizUserDetails == checkUserValue[0] && highScore < checkUserValue[1]) {
            // Your previous code was higher!
            localStorage.setItem(quizUserDetails, value); // Value is equal to 
            window.alert("Your previous code of " + checkUserValue[1] + " was higher. Entry will not be added.");
            break;

        } else { // New entry all together
            localStorage.setItem(quizUserDetails, value); // Value is equal to 
            window.alert("Your score of " + highScore + " has been submitted!")
            break;
        }

    }

});


answer1BtnEl.addEventListener("mouseover", function() {

    answerCorrectWrong.style.display = 'none';

});

answer2BtnEl.addEventListener("mouseover", function() {

    answerCorrectWrong.style.display = 'none';

});

answer3BtnEl.addEventListener("mouseover", function() {

    answerCorrectWrong.style.display = 'none';

});

answer4BtnEl.addEventListener("mouseover", function() {

    answerCorrectWrong.style.display = 'none';

});

submitScoreEl.addEventListener("mouseover", function() {

    answerCorrectWrong.style.display = 'none';

});

