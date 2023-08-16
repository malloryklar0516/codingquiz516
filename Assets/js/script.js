var timer = document.getElementById("timer");
var btnA = document.getElementById("a");
var btnB = document.getElementById("b");
var btnC = document.getElementById("c");
var btnD = document.getElementById("d");
var questionEl = document.getElementById("quiz-question");
var startEl = document.getElementById("start");
var startButton = document.getElementById("startbtn");
var highscoreEl = document.getElementById("highscore");
var quizEl = document.getElementById("quiz");
var endGame = document.getElementById("gameover");
var initialsInput = document.getElementById("initials");
var resultsEl = document.getElementById("results");
var submitButton =document.getElementById("submit");
var highscoreDisplay = document.getElementById("score-initials");
var replayButton =document.getElementById("replay");
var clearButton=document.getElementById("clear-scores");
var isCorrect=document.getElementById("correct");
// creates array of questions and answers
var questions = [{
    question: "1. How can you make a numbered list in HTML?",
    optionA: "ul",
    optionB: "l",
    optionC: "ol",
    optionD: "nl",
    answer: "c"},
    {question: "2. What does CSS stand for?",
    optionA: "coding standard styles",
    optionB: "coding style sheets",
    optionC: "cascading style sheets",
    optionD: "coding storage site",
    answer: "c"},
    {question: "3. Which of the following is used to change the background color in CSS?",
    optionA: "color",
    optionB: "background",
    optionC: "background-color",
    optionD: "bgc",
    answer: "c"},
    {question: "4. How do you insert a comment in javascript?",
    optionA: "/* comment */",
    optionB: "//comment",
    optionC: "/comment//",
    optionD: "**comment**",
    answer: "b"},
    {question: "5. ____ selectors are used to specify a group of elements.",
    optionA: "class",
    optionB: "id",
    optionC: "group",
    optionD: "all of the above",
    answer: "a"}
];
//defines variables that will be used below
var timeInterval;
var userScore=0;
var timeLeft = 80;
var correct;
var currentQuestion = 0;
var savedScores=[];
//creates function that generates question to be displayed;
function generateQuestion () {
    if (currentQuestion === questions.length){
       displayScore();
    }
    var showQuestion = questions[currentQuestion];
    questionEl.innerHTML = "<p>"+showQuestion.question + "</p>";
    btnA.innerHTML=showQuestion.optionA;
    btnB.innerHTML=showQuestion.optionB;
    btnC.innerHTML=showQuestion.optionC;
    btnD.innerHTML=showQuestion.optionD;

}
//creates function that starts quiz, starts a timer, and displays questions
function startQuiz(){
    startEl.style.display ="none";
    endGame.style.display = "none";
    quizEl.style.display = "flex";
    quizEl.style.flexDirection="column";
    highscoreEl.style.display="none";
    generateQuestion();
    timeInterval = setInterval(function(){
        if (timeLeft > 0){
            timeLeft--;
            timer.textContent = "time left: " + timeLeft;
        }
        else if(timeLeft === 0){
            clearInterval(timeInterval);
            displayScore();
        }
       
    }, 1000);
    }
    //creates function to check answer and display result
    function checkAnswer(answer){
       var correctAnswer = questions[currentQuestion].answer;
        if(answer === correctAnswer && currentQuestion!= questions.length){
            userScore++
            isCorrect.textContent="Correct!";
            currentQuestion++;
            generateQuestion();
        }
        else if (answer != correctAnswer && currentQuestion!=questions.length){
            isCorrect.textContent="Incorrect.";
            currentQuestion++;
            generateQuestion();
        }   
        setTimeout(() => {
            isCorrect.textContent="";  
        }, 2000);
       
     }
  //at end of quiz or when time runs out displays end of game screen with user score, clears timer   
function displayScore() {
    quizEl.style.display="none";
    startEl.style.display="none";
    endGame.style.display="flex"
    endGame.style.flexDirection="column"; 
    clearInterval(timeInterval);
    resultsEl.innerHTML = "<p> Your final score is: " + userScore + "</p>";
        }
//starts quiz when start button is clicked       
startButton.addEventListener("click",startQuiz);
//creates function that is executed when submit score button is clicked and locally saves scores to be displayed
submitButton.addEventListener("click", function(event){
   if (initialsInput.value ===""){
    alert("you must enter your initials");
   }
   else{
    var userInitials = initialsInput.value.trim();
    var userHighscore = {
        initials: userInitials,
        score: userScore
    }
    savedScores = JSON.parse(localStorage.getItem("savedScores")) || [];
    savedScores.push(userHighscore);
    localStorage.setItem("savedScores", JSON.stringify(savedScores));
    initialsInput.value="";
    displayHighscore();
   }
})
//displays list of saved highscores
function displayHighscore(){
    quizEl.style.display="none";
    startEl.style.display="none";
    endGame.style.display="none";
    highscoreEl.style.display="flex";
    highscoreEl.style.flexDirection="column";
    highscoreDisplay.textContent = ""
    savedScores = JSON.parse(localStorage.getItem("savedScores")) || [];
    for (i=0; i < savedScores.length; i++){
        var currentData = document.createElement("li");
        currentData.textContent = savedScores[i].initials + "-" + savedScores[i].score;
        highscoreDisplay.appendChild(currentData);
        currentData.style.listStyleType="none";
    }

}
//when replay button is clicked, the quiz starts over
replayButton.addEventListener("click", function replay(){
    userScore=0;
    currentQuestion=0;
    timeLeft=80;
    startQuiz();
});
//when clear button is clicked, the saved scores clear
clearButton.addEventListener("click", function clearScores(){
    window.localStorage.clear();
    highscoreDisplay.textContent='';
})
