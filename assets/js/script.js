
var win = 0;
var lose = 0;
var timeLeft;
var blankArry;
var randomWordArry;
var isWin;

var timerEl = document.querySelector(".time-left");
var startButton = document.querySelector("#start");
var resetButton = document.querySelector("#reset");
var wordBlank = document.querySelector(".guess");
var loseEl = document.querySelector(".lose");
var winEl = document.querySelector(".win");
var guessingField = document.querySelector(".guess");

var words = ["ivysaur", "eevee", "raichu", "gengar", "growlithe"];

winEl.textContent = win;
loseEl.textContent = lose;

// The init function is called when the page loads 
function init() {
    getWin();
    getLose();
}

function playGame() {;

    isWin= false;
    timeLeft = 10;
    countdown();

    pickWord();

    renderBlanks(randomWordArry);

}


//sets the countdown going
function countdown () {

    //not displaying time reamaining 1 skipping from 2 to 0
    var timer = setInterval(function () {
        timerEl.textContent = timeLeft;
        timeLeft--;

        if(timeLeft >=0) {
            //test to see if we won
            if(isWin && timeLeft > 0) {
                win++;
                guessingField.textContent = "You Win";
                setWin();
                clearInterval(timer);
            }
        }
        if(timeLeft === 0) {
            timerEl.textContent = timeLeft;
            lose++;
            guessingField.textContent = "Game over"
            setLose();
            clearInterval(timer);
        }
    }, 1000);
}

//creates an array where every letter of the randomWord is replaced with a _ then removes it from an array and puts a space between each "letter" 
function renderBlanks(randomWordArry) {
    blankArry = [];

    for (i = 0; i < randomWordArry.length; i++) {
        blankArry[i] = "_";

        var blankWord = blankArry.join(" ");
        wordBlank.textContent = blankWord;
    }
}

//picks a random word from the words array
function pickWord () {
    var randomIndex = Math.floor(Math.random() * words.length);
    var randomWord = words[randomIndex];
    
    randomWordArry = randomWord.split("");
    console.log(randomWordArry);

    return randomWordArry;
}


//log keystrokes and checks if the the key press matches with a letter in the word. If yes then replace the blank with the letter
document.addEventListener("keydown", function () {

    var letter = event.key;
    
    var guessed = false;

    for (i = 0; i < randomWordArry.length; i++) {

        if (randomWordArry[i] === letter) {
            guessed = true;
        }
    }
    if(guessed) {
        for (j = 0; j < blankArry.length; j++) {
            if(randomWordArry[j] === letter){
                blankArry[j] = letter;
            }
        }
        wordBlank.textContent = blankArry.join(" "); 
    }
    checkWin();
    
});

//checks whether the user has guessed the word before the timer reaches 0
function checkWin () {
    if (!blankArry.includes("_") && timeLeft != 0) {
        isWin = true;
    }
}

//sets a win and sends the data to local storage
function setWin() {
    winEl.textContent = win;
    localStorage.setItem("win", win);
    
}

//sets a loss and sends the data to local storage
function setLose() {
    loseEl.textContent = lose;
    localStorage.setItem("lose", lose);
    
}


// //gets the wins from local storage
function getWin () {
    var storedWin = localStorage.getItem("win");
    if (storedWin === 0 ) {
        win = 0;
    } else {
        win = storedWin;
    }
}

// //get the losses from local storage
function getLose () {
    var storedLoss = localStorage.getItem("lose");
    if (storedLoss === 0) {
        lose = 0;
    } else {
        lose = storedLoss;
    }
}


// Calls init() so that it fires when page opened
init();

startButton.addEventListener("click", playGame);


resetButton.addEventListener("click", resetScore);
//resets the scores to 0 when you hit the reset button
function resetScore () {
    win = 0;
    lose = 0;
    setWin();
    setLose();
}
