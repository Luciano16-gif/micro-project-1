// -----------------------------------------
// 1. Start the game with a name 
// -----------------------------------------

const startContainer = document.getElementById("start-container");
const userInput = document.getElementById("user-input");
const startButton = document.getElementById("start-btn");

// Function to handle starting the game
function startGame() {
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
        startGame();
    }
});

// Listen for a click on the start button
startButton.addEventListener("click", startGame);

// -----------------------------------------
// 2. Countdown logic 
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
                    // Here you can trigger additional game logic if needed
                }, 500);
            }, 1000);
        }
    }, 1000);
}