// Arrays to store values
let arrayPC = [0]; // starts with 0 so it always starts with green
let arrayPlayer = [];
let isButtonsEnabled = false; // Flag to control button interactions
let score = 1; // Initialize score

// -----------------------------------------
// 1. Button functions
// -----------------------------------------

// Get the buttons by ID
const greenButton = document.getElementById('green');
const redButton = document.getElementById('red');
const yellowButton = document.getElementById('yellow');
const blueButton = document.getElementById('blue');

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

    // If all common elements are equal and the round is complete
    if ((arrayPC.length === arrayPlayer.length) && areEqual) {
        console.log("The arrays are equal. Updating arrays...");

        score++; // Increment score
        document.getElementById('score-value').textContent = score;

        // Add an element to arrayPC
        let newElement = generateRandomNumber();
        arrayPC.push(newElement);
        console.log(`Element ${newElement} was added to arrayPC.`);

        // Reset arrayPlayer
        arrayPlayer.length = 0; 
        setTimeout(() => {
            showPattern(arrayPC);
        }, 400);
    }

    console.log("Current state:");
    console.log("arrayPC:", arrayPC);
    console.log("arrayPlayer:", arrayPlayer);
    return;
}

// -----------------------------------------
// 3. Start the game with a name 
// -----------------------------------------

const startContainer = document.getElementById("start-container");
const userInput = document.getElementById("user-input");
const startButton = document.getElementById("start-btn");

function getUser() {
    const name = userInput.value.trim();
    if (name === "") {
        alert("Please enter your name to start the game.");
        return;
    }
  
    // Fade-out effect before hiding the start screen
    startContainer.classList.add("fade-out");
    setTimeout(() => {
        startContainer.style.display = "none";
        startCountdown(); // Begin the countdown after the start screen fades
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
    const countdownOverlay = document.getElementById('countdown-overlay');
    const countdownElement = document.getElementById('countdown');
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
                    showPattern(arrayPC);
                }, 500);
            }, 1000);
        }
    }, 1000);
}

// -----------------------------------------
// 5. Make the game work (show pattern)
// -----------------------------------------

function showPattern(arrayPC) { 
    toggleButtons(false);
    let i = 0;
    const interval = setInterval(() => {
        if (i > arrayPC.length - 1) {
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
    }, 700);
}

// -----------------------------------------
// 6. Lose screen logic
// -----------------------------------------

function showLoseScreen() {
    toggleButtons(false);
    const loseScreen = document.getElementById('lose-screen');
    loseScreen.style.display = 'flex';
}


function resetGame() {
    // Reset score and update display
    score = 1;
    document.getElementById('score-value').textContent = score;
    // Reset game arrays
    arrayPC = [0, 1, 2, 3];
    arrayPlayer = [];
    // Hide the lose screen
    document.getElementById('lose-screen').style.display = 'none';
    // Restart the game (using the countdown)
    startCountdown();
}

// Reset the game on try again button click
document.getElementById('try-again-btn').addEventListener('click', resetGame);
