// Word list with hints
const words = [
    { word: "APPLE", hint: "A fruit that keeps the doctor away" },
    { word: "BOOK", hint: "Something you can read" },
    { word: "CODING", hint: "The process of creating computer software" },
    { word: "JAVASCRIPT", hint: "A programming language for the web" },
    { word: "PUZZLE", hint: "A game that tests your ingenuity" },
    { word: "KEYBOARD", hint: "Used to type on a computer" },
    { word: "MOUNTAIN", hint: "A large natural elevation of the earth's surface" },
    { word: "OCEAN", hint: "A vast expanse of salt water" },
    { word: "DIAMOND", hint: "A precious gemstone" },
    { word: "CALENDAR", hint: "Used to keep track of days and events" },
    { word: "CHOCOLATE", hint: "A sweet treat made from cocoa" },
    { word: "ELEPHANT", hint: "The largest land animal" },
    { word: "GUITAR", hint: "A musical instrument with strings" },
    { word: "LIBRARY", hint: "A place full of books" },
    { word: "RAINBOW", hint: "A meteorological phenomenon with seven colors" },
    { word: "UNIVERSE", hint: "All of space and time and their contents" },
    { word: "VACATION", hint: "A period for rest and relaxation" },
    { word: "KITCHEN", hint: "A room where food is prepared" },
    { word: "BUTTERFLY", hint: "An insect with colorful wings" },
    { word: "ADVENTURE", hint: "An exciting or remarkable experience" }
];

// Game variables
let currentWord = "";
let currentScrambledWord = "";
let currentHint = "";
let score = 0;
let timeLeft = 60;
let timer;

// DOM elements
const scrambledWordElement = document.getElementById("scrambled-word");
const hintElement = document.getElementById("hint");
const userInputElement = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const newWordBtn = document.getElementById("new-word-btn");
const messageElement = document.getElementById("message");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");

// Function to scramble a word
function scrambleWord(word) {
    const wordArray = word.split("");
    
    // Shuffle the array
    for (let i = wordArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    
    // Make sure the scrambled word is different from the original
    let scrambled = wordArray.join("");
    if (scrambled === word) {
        return scrambleWord(word); // Try again
    }
    
    return scrambled;
}

// Function to select a random word
function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

// Function to set a new word
function setNewWord() {
    const wordObj = getRandomWord();
    currentWord = wordObj.word;
    currentHint = wordObj.hint;
    currentScrambledWord = scrambleWord(currentWord);
    
    scrambledWordElement.textContent = currentScrambledWord;
    hintElement.textContent = `Hint: ${currentHint}`;
    userInputElement.value = "";
    messageElement.textContent = "";
    messageElement.className = "message";
}

// Function to check if the user's answer is correct
function checkAnswer() {
    const userAnswer = userInputElement.value.trim().toUpperCase();
    
    if (userAnswer === currentWord) {
        messageElement.textContent = "Correct! Well done!";
        messageElement.className = "message correct";
        score += 10;
        scoreElement.textContent = score;
        setNewWord();
    } else {
        messageElement.textContent = "Try again!";
        messageElement.className = "message incorrect";
    }
}

// Function to update timer
function updateTimer() {
    timeLeft--;
    timeElement.textContent = timeLeft;
    
    if (timeLeft <= 0) {
        endGame();
    }
}

// Function to end the game
function endGame() {
    clearInterval(timer);
    userInputElement.disabled = true;
    checkBtn.disabled = true;
    newWordBtn.disabled = true;
    
    messageElement.textContent = `Game Over! Your final score is ${score}.`;
    messageElement.className = "message";
    
    // Add a restart button
    const restartBtn = document.createElement("button");
    restartBtn.textContent = "Play Again";
    restartBtn.addEventListener("click", startGame);
    document.querySelector(".input-area").appendChild(restartBtn);
}

// Function to start the game
function startGame() {
    // Reset game variables
    score = 0;
    timeLeft = 60;
    scoreElement.textContent = score;
    timeElement.textContent = timeLeft;
    
    // Enable inputs
    userInputElement.disabled = false;
    checkBtn.disabled = false;
    newWordBtn.disabled = false;
    
    // Remove restart button if exists
    const restartBtn = document.querySelector(".input-area button:nth-child(3)");
    if (restartBtn) {
        restartBtn.remove();
    }
    
    // Set a new word
    setNewWord();
    
    // Start the timer
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}

// Event listeners
checkBtn.addEventListener("click", checkAnswer);

newWordBtn.addEventListener("click", setNewWord);

userInputElement.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        checkAnswer();
    }
});

// Start the game when page loads
window.addEventListener("DOMContentLoaded", startGame);