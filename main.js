// Arrays to store values
let arrayPC = [0];
let arrayPlayer = [];
let isButtonsEnabled = false; // Flag to control button interactions
let isRestartEnabled = true; // Flag to control restart
let onMenu = true; // Flag to detect if the user is on the menu
let score = 1; 
const HIGH_SCORES_KEY = 'simonHighScores';
let currentPlayer = '';

// -----------------------------------------
// DOM Elements declarations
// -----------------------------------------
const greenButton = document.getElementById('green');
const redButton = document.getElementById('red');
const yellowButton = document.getElementById('yellow');
const blueButton = document.getElementById('blue');

const startContainer = document.getElementById("start-container");
const userInput = document.getElementById("user-input");
const startButton = document.getElementById("start-btn");
const maxScore = document.getElementById("score-value");
const currentScore = document.getElementById("round-display");

const countdownOverlay = document.getElementById('countdown-overlay');
const countdownElement = document.getElementById('countdown');

const loseScreen = document.getElementById('lose-screen');
const inGameControls = document.getElementById('in-game-controls');

const tryAgainBtn = document.getElementById('try-again-btn');
const restartBtn = document.getElementById('restart-btn');
const returnMenuBtn = document.getElementById('return-menu-btn');

const highScoresTbody = document.getElementById('high-scores-tbody');
const highScoresContainer = document.getElementById('high-scores-container');
const showScoresBtn = document.getElementById('show-scores-btn');
const showScoresLoseBtn = document.getElementById('show-scores-lose-btn');
const closeScoresBtn = document.getElementById('close-scores-btn');

// -----------------------------------------
// 1. Button functions
// -----------------------------------------

// Audio file paths
const audioFiles = {
    green: './assets/sonido-verde.mp3',
    red: './assets/sonido-rojo.mp3',
    yellow: './assets/sonido-amarillo.mp3',
    blue: './assets/sonido-azul.mp3'
};

// Assign click events to each button
greenButton.addEventListener('click', () => {
    if (!isButtonsEnabled) return; 
    buttonInteraction(0, 'green');
    playSound(audioFiles.green);
});

redButton.addEventListener('click', () => {
    if (!isButtonsEnabled) return;
    buttonInteraction(1, 'red');
    playSound(audioFiles.red);
});

blueButton.addEventListener('click', () => {
    if (!isButtonsEnabled) return;
    buttonInteraction(2, 'blue');
    playSound(audioFiles.blue);
});

yellowButton.addEventListener('click', () => {
    if (!isButtonsEnabled) return;
    buttonInteraction(3, 'yellow');
    playSound(audioFiles.yellow);
});

// Function to handle button interactions
function buttonInteraction(value, buttonId) {
    addValue(value);
    flashButton(buttonId);
}

// Function to play sound
function playSound(soundPath) {
    const audio = new Audio(soundPath);
    audio.play().catch(error => console.error('Error playing sound:', error));
}

// Function to flash a given button element by its ID
function flashButton(buttonId) {
    const button = document.getElementById(buttonId);
    if (!button) return;
    
    // Remove flash class if already present 
    button.classList.remove('flash');
    void button.offsetWidth; // Force reflow
  
    // Add the flash class to start the animation
    button.classList.add('flash');
  
    // Remove the class after the animation completes (0.3s here)
    setTimeout(() => {
      button.classList.remove('flash');
    }, 300);
}

// Function to toggle button interactions
function toggleButtons(enable) {
    isButtonsEnabled = enable;
}

// -----------------------------------------
// 2. Array functions for the game logic
// -----------------------------------------

// Function to generate a random number
function generateRandomNumber() {
    return Math.floor(Math.random() * 4);
}

// Function to add a value to the player's array
function addValue(valor) {
    arrayPlayer.push(valor);
    console.log('Array actual:', arrayPlayer);
    compareArrays(arrayPC, arrayPlayer);
}

function compareArrays(arrayPC, arrayPlayer) {

    let areEqual = true; // This in theory isnt needed but lets keep it just in case

    // Compare the common elements
    for (let i = 0; i < arrayPlayer.length; i++) {
        if (arrayPC[i] !== arrayPlayer[i]) {
            console.log(`Different at position ${i}: ${arrayPC[i]} and ${arrayPlayer[i]}`);
            arrayPlayer.length = 0;
            areEqual = false; 
            showLoseScreen();
            return; 
        }
    }

    // If all common elements are equal
    if (areEqual) {
        console.log("All common elements are equal.");
        setTimeout(() => {
            if (arrayPC.length === arrayPlayer.length) {
                console.log("The arrays are equal. Updating arrays...");
    
                // Add an element to arrayPC
                let newElement = generateRandomNumber();
                arrayPC.push(newElement);
                console.log(`Element ${newElement} was added to arrayPC.`);
                arrayPlayer.length = 0; 
                setTimeout(() => {
                    showPattern(arrayPC);
                }, 400);
            }
        }, 400);
        
    }

    console.log("Current state:");
    console.log("arrayPC:", arrayPC);
    console.log("arrayPlayer:", arrayPlayer);
    userScore(arrayPC, arrayPlayer);
    
    return;
}

// -----------------------------------------
// 3. Start the game with a name 
// -----------------------------------------

function getUser() {
    const name = userInput.value.trim();
    if (name === "" || name.length > 10) {
        alert("Please enter a valid name (1-10 characters).");
        return;
    }
    
    currentPlayer = name;
    onMenu = false;
    setTimeout(() => {
        startContainer.style.display = "none";
        startCountdown();
    }, 400);
}

userInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        getUser();
    }
});

startButton.addEventListener("click", getUser);

// -----------------------------------------
// 4. Countdown logic 
// -----------------------------------------

function startCountdown() {
    countdownOverlay.style.display = 'flex'; // Show the overlay

    let count = 3;
    countdownElement.textContent = count;
    countdownElement.classList.remove('fade-out', 'start'); // Reset classes
    count--;

    const interval = setInterval(() => {
        if (count > 0) {
            countdownElement.textContent = count;
            count--;
        } else {
            countdownElement.textContent = 'Start';
            countdownElement.classList.add('start');
            clearInterval(interval);
            setTimeout(() => {
                countdownElement.classList.add('fade-out');
                // Hide the countdown overlay after fade-out
                setTimeout(() => {
                    countdownOverlay.style.display = 'none';
                    if (!onMenu) {
                        inGameControls.style.display = 'block'; // Show the in-game controls if the user is not on the menu
                        showPattern(arrayPC);
                    };              
                }, 500);
            }, 1000);
        }
    }, 1000);
}

// -----------------------------------------
// 5. Show pattern and score
// -----------------------------------------

function showPattern(arrayPC) { 
    toggleButtons(false);
    let i = 0;
    const interval = setInterval(() => {
        if (i > arrayPC.length - 1 || onMenu) {
            clearInterval(interval);
            toggleButtons(true);
        }
        switch(arrayPC[i]) {
            case 0:
                flashButton("green");
                playSound(audioFiles.green);
                break;
            case 1:
                flashButton("red");
                playSound(audioFiles.red);
                break;
            case 2:
                flashButton("blue");
                playSound(audioFiles.blue);
                break;
            case 3:
                flashButton("yellow");
                playSound(audioFiles.yellow);
                break;
        }
        i++;
    }, 480)
    compareArrays(arrayPC, arrayPlayer);
}

function userScore(arrayPC, arrayPlayer) {
    for(let i = 0; i < arrayPC.length; i++) {
        maxScore.textContent = i + 1;
    }
    for(let i = 0; i < arrayPlayer.length; i++) {
        currentScore.textContent = i + 1;
    }
    if(arrayPC.length === arrayPlayer.length) {
        setTimeout(() => {
            currentScore.textContent = 0;
        }, 700);
    }
}

// -----------------------------------------
// 6. Lose screen logic
// -----------------------------------------

function showLoseScreen() {
    toggleButtons(false);
    loseScreen.style.display = 'flex';
    
    // Save the score when the game ends
    const finalScore = parseInt(maxScore.textContent);
    saveHighScore(currentPlayer, finalScore);
}

function resetGame() {
    isRestartEnabled = false;
    // Reset score and update display
    score = 0;
    currentScore.textContent = 0;
    maxScore.textContent = score;
    // Reset game arrays
    arrayPC = [0];
    arrayPlayer = [];
    // Hide the lose screen
    loseScreen.style.display = 'none';
    // Restart the game (using the countdown)
    startCountdown();
    setTimeout(() => {
        isRestartEnabled = true;
    }, 5000);
    
}

tryAgainBtn.addEventListener('click', resetGame);

// -----------------------------------------
// 7. Restart and return to menu buttons
// -----------------------------------------

function returnToMenu() {
    // Reset game state
    onMenu = true;
    arrayPC = [0];
    arrayPlayer = [];
    currentPlayer = '';
    score = 0; // Reset score to initial value

    // Reset score display
    maxScore.textContent = 0;
    currentScore.textContent = 0;

    // Hide any overlays
    loseScreen.style.display = 'none';
    countdownOverlay.style.display = 'none';

    // Disable button interactions
    toggleButtons(false);

    // Hide the in-game controls
    inGameControls.style.display = 'none';

    // Show the start screen again and clear the input field
    startContainer.style.display = 'flex';

    // Clear the input field
    userInput.value = "";
}

restartBtn.addEventListener('click', () => {
    if (!isRestartEnabled) return; 
    resetGame();
});

returnMenuBtn.addEventListener('click', returnToMenu);

// -----------------------------------------
// 8. LocalStorage and score table
// -----------------------------------------

function getHighScores() {
    const scores = localStorage.getItem(HIGH_SCORES_KEY);
    return scores ? JSON.parse(scores) : [];
}   

function saveHighScore(playerName, score) {
    let highScores = getHighScores();
    
    // Check if player already exists
    const existingPlayerIndex = highScores.findIndex(entry => entry.name === playerName);
    
    if (existingPlayerIndex !== -1) {
        // If player exists, update score only if new score is higher
        if (score > highScores[existingPlayerIndex].score) {
            highScores[existingPlayerIndex].score = score;
        }
    } else {
        // If player doesn't exist, add new entry
        highScores.push({ name: playerName, score: score });
    }
    
    // Sort by score (highest first)
    highScores.sort((a, b) => b.score - a.score);
    
    // Save to localStorage
    localStorage.setItem(HIGH_SCORES_KEY, JSON.stringify(highScores));
}

// Function to update high scores display
function updateHighScoresTable() {
    highScoresTbody.innerHTML = '';
    
    const highScores = getHighScores();
    
    highScores.forEach((score, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${score.name}</td>
            <td>${score.score}</td>
        `;
        highScoresTbody.appendChild(row);
    });
}

// Function to show high scores
function showHighScores() {
    updateHighScoresTable();
    highScoresContainer.style.display = 'flex';
}

// Function to hide high scores
function hideHighScores() {
    highScoresContainer.style.display = 'none';
}

// Eent listeners for the high scores buttons
showScoresBtn.addEventListener('click', showHighScores);
showScoresLoseBtn.addEventListener('click', showHighScores);
closeScoresBtn.addEventListener('click', hideHighScores);
