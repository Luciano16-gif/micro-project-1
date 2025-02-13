// Arrays to store values
let arrayPC = [0, 1, 2, 3];
let arrayPlayer = [];

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
    buttonInteraction(0, 'green');
    playSound(audioFiles.green);
});

redButton.addEventListener('click', () => {
    buttonInteraction(1, 'red');
    playSound(audioFiles.red);
});

blueButton.addEventListener('click', () => {
    buttonInteraction(2, 'blue');
    playSound(audioFiles.blue);
});

yellowButton.addEventListener('click', () => {
    buttonInteraction(3, 'yellow');
    playSound(audioFiles.yellow);
});

// Function to handle button interactions
function buttonInteraction(value, buttonId) {
    addValue(value);
    flashButton(buttonId);
}

// Function to play sound, this one fixes the problem with the audio not playing if its already playing
function playSound(soundPath) {
    const audio = new Audio(soundPath);
    audio.play()
        .catch(error => console.error('Error playing sound:', error));
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

// Function to disable buttons
// function disableButtons(boolean) {
//     if(boolean == true){
//         greenButton.disabled = true;
//         redButton.disabled = true;
//         blueButton.disabled = true;                      Todavía no funciona
//         yellowButton.disabled = true;
//     } else {
//         greenButton.disabled = false;
//         redButton.disabled = false;
//         blueButton.disabled = false;
//         yellowButton.disabled = false;
//     }
// }

// -----------------------------------------
// 2. Array functions for the game logic
// -----------------------------------------


// Function to generate a random number
function generateRandomNumber() {
    return Math.floor(Math.random() * 4);
}

// Function to add a value to the array
function addValue(valor) {
    arrayPlayer.push(valor); // Add value to player array
    
    console.log('Array actual:', arrayPlayer); // Show the array in the console
    compareArrays(arrayPC, arrayPlayer);
}

function compareArrays(arrayPC, arrayPlayer) {
    
    let areEqual = true;


    // Compare the common elements
    for (let i = 0; i < arrayPlayer.length; i++) {
        if (arrayPC[i] !== arrayPlayer[i]) {
            console.log(`Different at position ${i}: ${arrayPC[i]} and ${arrayPlayer[i]}`);
            areEqual = false;
            arrayPlayer.length = 0;
        }
    }

    // If all common elements are equal
    if (areEqual) {
        console.log("All common elements are equal.");
        if (arrayPC.length === arrayPlayer.length) {
            console.log("The arrays are equal. Updating arrays...");

            // Add an element to arrayPC
            let newElement = generateRandomNumber();
            arrayPC.push(newElement);
            console.log(`Element ${newElement} was added to arrayPC.`);
            arrayPlayer.length = 0; 
            setTimeout(() => {
                startGame(arrayPC, arrayPlayer);
            }, 400);
        }
    }

    // Show the current state of the arrays
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

// Function to handle starting the game
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
  
// Listen for the Enter key on the input field
userInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        getUser();
    }
});

// Listen for a click on the start button
startButton.addEventListener("click", getUser);

// -----------------------------------------
// 4. Countdown logic 
// -----------------------------------------

// Countdown Function
function startCountdown() {
    const countdownOverlay = document.getElementById('countdown-overlay');
    const countdownElement = document.getElementById('countdown');
    countdownOverlay.style.display = 'flex'; // Show the overlay

    let count = 3;
    countdownElement.textContent = count;
    countdownElement.classList.remove('fade-out', 'start'); // Reset classes if needed
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
                    startGame(arrayPC, arrayPlayer);
                }, 500);
            }, 1000);
        }
    }, 1000);
}

// -----------------------------------------
// 5. Make the game work
// -----------------------------------------

function startGame(arrayPC, arrayPlayer) {
    let i = 0;
    const interval = setInterval(() => {
        if (i > arrayPC.length - 1) {
            clearInterval(interval);
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
    }, 700)

    compareArrays(arrayPC, arrayPlayer);
}

  