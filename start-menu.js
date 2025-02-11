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
        alert("Please enter your name to start the game."); // This can be changed later if we want to make it better, but it currently works just fine
        return;
    }
  
    // Fade-out effect before hiding the start screen (this looks really nice :D)
    startContainer.classList.add("fade-out");
    setTimeout(() => {
        startContainer.style.display = "none";
    }, 400); // Duration matches the CSS transition
}
  
// Listen for the Enter key on the input field
userInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        startGame();
    }
});
  
// Listen for a click on the start button
startButton.addEventListener("click", startGame);
