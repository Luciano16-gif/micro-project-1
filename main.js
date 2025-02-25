/**
 * Simon Says Game
 * But now its BETTER! with improved version with better structure, error handling and organization
 */

// -----------------------------------------
// Constants and Config
// -----------------------------------------
const GAME_CONFIG = {
    COUNTDOWN_DURATION: 3,
    PATTERN_DELAY: 500,
    NEXT_SEQUENCE_DELAY: 400,
    SCORE_RESET_DELAY: 700,
    HIGH_SCORES_KEY: 'simonHighScores',
    MAX_NAME_LENGTH: 10,
    BUTTON_COLORS: ['green', 'red', 'blue', 'yellow'],
    FLASH_DURATION: 300,
    RESTART_COOLDOWN: 5000
  };
  
  const AUDIO_CONFIG = {
    green: './assets/sonido-verde.mp3',
    red: './assets/sonido-rojo.mp3',
    yellow: './assets/sonido-amarillo.mp3',
    blue: './assets/sonido-azul.mp3',
  };
  
  // -----------------------------------------
  // Game State
  // -----------------------------------------
  const GameState = {
    computerSequence: [0],
    playerSequence: [],
    isButtonsEnabled: false,
    isRestartEnabled: true,
    isOnMenu: true,
    score: 1,
    currentPlayer: '',
    
    reset() {
      this.computerSequence = [0];
      this.playerSequence = [];
      this.score = 1;
    },
    
    addToComputerSequence() {
      const newElement = Math.floor(Math.random() * 4);
      this.computerSequence.push(newElement);
      return newElement;
    },
    
    resetPlayerSequence() {
      this.playerSequence = [];
    },
    
    addToPlayerSequence(value) {
      this.playerSequence.push(value);
    }
  };
  
  // -----------------------------------------
  // DOM Elements Cache
  // -----------------------------------------
  const DOM = {
    // Buttons
    buttons: {
      green: document.getElementById('green'),
      red: document.getElementById('red'),
      yellow: document.getElementById('yellow'),
      blue: document.getElementById('blue'),
      startButton: document.getElementById('start-btn'),
      tryAgainBtn: document.getElementById('try-again-btn'),
      restartBtn: document.getElementById('restart-btn'),
      returnMenuBtn: document.getElementById('return-menu-btn'),
      showScoresBtn: document.getElementById('show-scores-btn'),
      showScoresLoseBtn: document.getElementById('show-scores-lose-btn'),
      closeScoresBtn: document.getElementById('close-scores-btn')
    },
    
    // Containers and screens
    containers: {
      startContainer: document.getElementById('start-container'),
      countdownOverlay: document.getElementById('countdown-overlay'),
      loseScreen: document.getElementById('lose-screen'),
      inGameControls: document.getElementById('in-game-controls'),
      highScoresContainer: document.getElementById('high-scores-container')
    },
    
    // Text and display elements
    display: {
      userInput: document.getElementById('user-input'),
      maxScore: document.getElementById('score-value'),
      currentScore: document.getElementById('round-display'),
      countdownElement: document.getElementById('countdown'),
      highScoresTbody: document.getElementById('high-scores-tbody')
    }
  };
  
  // -----------------------------------------
  // 1. Button Functions and Input Handling
  // -----------------------------------------
  
  /**
   * Initializes all button event listeners
   */
  function initializeButtons() {
    DOM.buttons.green.addEventListener('click', () => handleButtonClick(0, 'green'));
    DOM.buttons.red.addEventListener('click', () => handleButtonClick(1, 'red'));
    DOM.buttons.blue.addEventListener('click', () => handleButtonClick(2, 'blue'));
    DOM.buttons.yellow.addEventListener('click', () => handleButtonClick(3, 'yellow'));
    
    DOM.buttons.startButton.addEventListener('click', validateAndStartGame);
    DOM.buttons.tryAgainBtn.addEventListener('click', resetGame);
    DOM.buttons.restartBtn.addEventListener('click', handleRestart);
    DOM.buttons.returnMenuBtn.addEventListener('click', returnToMenu);
    
    DOM.buttons.showScoresBtn.addEventListener('click', showHighScores);
    DOM.buttons.showScoresLoseBtn.addEventListener('click', showHighScores);
    DOM.buttons.closeScoresBtn.addEventListener('click', hideHighScores);
    
    DOM.display.userInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        validateAndStartGame();
      }
    });
  }
  
  /**
   * Handles button clicks during gameplay
   * @param {number} value - The value/index associated with the button
   * @param {string} buttonId - The id of the button element
   */
  function handleButtonClick(value, buttonId) {
    if (!GameState.isButtonsEnabled) {
      return;
    }
    
    GameState.addToPlayerSequence(value);
    flashButton(buttonId);
    playSound(buttonId);
    
    // Compare sequences after player input
    compareSequences();
  }
  
  /**
   * Creates visual feedback by flashing a button
   * @param {string} buttonId - The id of the button to flash
   */
  function flashButton(buttonId) {
    const button = document.getElementById(buttonId);
    if (!button) {
      console.error(`Button with id ${buttonId} not found`);
      return;
    }
    
    // Remove flash class if already present to restart animation
    button.classList.remove('flash');
    // Force reflow to ensure animation restarts
    void button.offsetWidth;
    
    // Add flash class and set timeout to remove it
    button.classList.add('flash');
    setTimeout(() => {
      button.classList.remove('flash');
    }, GAME_CONFIG.FLASH_DURATION);
  }
  
  /**
   * Plays sound associated with a button color
   * @param {string} color - The color of the button
   */
  function playSound(color) {
    try {
      const soundPath = AUDIO_CONFIG[color];
      if (!soundPath) {
        console.warn(`No sound defined for color: ${color}`);
        return;
      }
      
      const audio = new Audio(soundPath);
      audio.play().catch(error => {
        console.warn(`Sound playback failed: ${error.message}`);
        // Continue game even if sound fails
      });
    } catch (error) {
      console.error('Error playing sound:', error);
      // Game can continue without sound
    }
  }
  
  /**
   * Enables or disables button interaction
   * @param {boolean} enable - Whether to enable buttons
   */
  function toggleButtons(enable) {
    GameState.isButtonsEnabled = enable;
  }
  
  // -----------------------------------------
  // 2. Game Logic
  // -----------------------------------------
  
  /**
   * Compares player and computer sequences
   */
  function compareSequences() {
    const playerSeq = GameState.playerSequence;
    const computerSeq = GameState.computerSequence;
    
    // Check if player made a mistake
    for (let i = 0; i < playerSeq.length; i++) {
      if (computerSeq[i] !== playerSeq[i]) {
        GameState.resetPlayerSequence();
        showLoseScreen();
        return;
      }
    }
    
    // Update score display
    updateScoreDisplay();
    
    // If player successfully completed the sequence
    if (playerSeq.length === computerSeq.length) {
      setTimeout(() => {
        if (GameState.isOnMenu) return;
        
        GameState.resetPlayerSequence();
        GameState.addToComputerSequence();
        
        // Reset current score display
        setTimeout(() => {
          DOM.display.currentScore.textContent = '0';
        }, GAME_CONFIG.SCORE_RESET_DELAY);
        
        // Show the next pattern
        setTimeout(() => {
          showPattern(GameState.computerSequence);
        }, GAME_CONFIG.NEXT_SEQUENCE_DELAY);
      }, GAME_CONFIG.NEXT_SEQUENCE_DELAY);
    }
  }
  
  /**
   * Updates the score displays
   */
  function updateScoreDisplay() {
    // Update max score (round number)
    DOM.display.maxScore.textContent = GameState.computerSequence.length;
    
    // Update current progress
    DOM.display.currentScore.textContent = GameState.playerSequence.length;
  }
  
  /**
   * Shows the pattern for the player to repeat
   * @param {Array} sequence - The pattern to display
   */
  function showPattern(sequence) {
    if (GameState.isOnMenu) return;
    
    toggleButtons(false);
    let index = 0;
    
    const interval = setInterval(() => {
      if (index >= sequence.length || GameState.isOnMenu) {
        clearInterval(interval);
        toggleButtons(true);
        return;
      }
      
      const buttonValue = sequence[index];
      const buttonColor = GAME_CONFIG.BUTTON_COLORS[buttonValue];
      
      flashButton(buttonColor);
      playSound(buttonColor);
      
      index++;
    }, GAME_CONFIG.PATTERN_DELAY);
  }
  
  // -----------------------------------------
  // 3. Game Flow Management
  // -----------------------------------------
  
  /**
   * Validates player name and starts the game
   */
  function validateAndStartGame() {
    const name = DOM.display.userInput.value.trim();
    
    if (name === "" || name.length > GAME_CONFIG.MAX_NAME_LENGTH) {
      alert(`Please enter a valid name (1-${GAME_CONFIG.MAX_NAME_LENGTH} characters).`);
      return;
    }
    
    GameState.currentPlayer = name;
    GameState.isOnMenu = false;
    
    setTimeout(() => {
      DOM.containers.startContainer.style.display = "none";
      startCountdown();
    }, GAME_CONFIG.NEXT_SEQUENCE_DELAY);
  }
  
  /**
   * Starts the countdown before gameplay begins
   */
  function startCountdown() {
    if (GameState.isOnMenu) return;
    
    DOM.containers.countdownOverlay.style.display = 'flex';
    
    let count = GAME_CONFIG.COUNTDOWN_DURATION;
    DOM.display.countdownElement.textContent = count;
    DOM.display.countdownElement.classList.remove('fade-out', 'start');
    
    count--;
    
    const interval = setInterval(() => {
      if (GameState.isOnMenu) {
        clearInterval(interval);
        return;
      }
      
      if (count > 0) {
        DOM.display.countdownElement.textContent = count;
        count--;
      } else {
        DOM.display.countdownElement.textContent = 'Start';
        DOM.display.countdownElement.classList.add('start');
        clearInterval(interval);
        
        setTimeout(() => {
          DOM.display.countdownElement.classList.add('fade-out');
          
          setTimeout(() => {
            DOM.containers.countdownOverlay.style.display = 'none';
            
            if (!GameState.isOnMenu) {
              DOM.containers.inGameControls.style.display = 'block';
              showPattern(GameState.computerSequence);
            }
          }, 500);
        }, 1000);
      }
    }, 1000);
  }
  
  /**
   * Shows the lose screen and saves the score
   */
  function showLoseScreen() {
    if (GameState.isOnMenu) return;
    
    toggleButtons(false);
    DOM.containers.loseScreen.style.display = 'flex';
    
    // Get final score and save it
    const finalScore = parseInt(DOM.display.maxScore.textContent);
    saveHighScore(GameState.currentPlayer, finalScore);
  }
  
  /**
   * Resets the game after losing
   */
  function resetGame() {
    if (GameState.isOnMenu) return;
    
    GameState.reset();
    
    // Update score displays
    DOM.display.currentScore.textContent = '0';
    DOM.display.maxScore.textContent = '0';
    
    // Hide lose screen
    DOM.containers.loseScreen.style.display = 'none';
    
    // Start new game with countdown
    startCountdown();
  }
  
  /**
   * Handles restart button with cooldown prevention
   */
  function handleRestart() {
    if (!GameState.isRestartEnabled || GameState.isOnMenu) return;
    
    GameState.isRestartEnabled = false;
    resetGame();
    
    // Enable restart button after cooldown
    setTimeout(() => {
      GameState.isRestartEnabled = true;
    }, GAME_CONFIG.RESTART_COOLDOWN);
  }
  
  /**
   * Returns to the main menu
   */
  function returnToMenu() {
    GameState.isOnMenu = true;
    GameState.reset();
    GameState.currentPlayer = '';
    
    // Reset displays
    DOM.display.maxScore.textContent = '0';
    DOM.display.currentScore.textContent = '0';
    
    // Hide game screens
    DOM.containers.loseScreen.style.display = 'none';
    DOM.containers.countdownOverlay.style.display = 'none';
    DOM.containers.inGameControls.style.display = 'none';
    
    // Disable buttons
    toggleButtons(false);
    
    // Show start screen
    DOM.containers.startContainer.style.display = 'flex';
    
    // Clear input field
    DOM.display.userInput.value = "";
  }
  
  // -----------------------------------------
  // 4. High Scores Management
  // -----------------------------------------
  
  /**
   * Retrieves high scores from localStorage
   * @returns {Array} Array of score objects
   */
  function getHighScores() {
    try {
      const scores = localStorage.getItem(GAME_CONFIG.HIGH_SCORES_KEY);
      return scores ? JSON.parse(scores) : [];
    } catch (error) {
      console.error('Failed to retrieve high scores:', error);
      return [];
    }
  }
  
  /**
   * Saves a high score to localStorage
   * @param {string} playerName - The player's name
   * @param {number} score - The player's score
   */
  function saveHighScore(playerName, score) {
    try {
      let highScores = getHighScores();
      
      // Find if player already exists
      const existingPlayerIndex = highScores.findIndex(entry => entry.name === playerName);
      
      if (existingPlayerIndex !== -1) {
        // Update score only if new score is higher
        if (score > highScores[existingPlayerIndex].score) {
          highScores[existingPlayerIndex].score = score;
        }
      } else {
        // Add new player
        highScores.push({ name: playerName, score: score });
      }
      
      // Sort scores (highest first)
      highScores.sort((a, b) => b.score - a.score);
      
      // Save to localStorage
      localStorage.setItem(GAME_CONFIG.HIGH_SCORES_KEY, JSON.stringify(highScores));
    } catch (error) {
      console.error('Failed to save high score:', error);
    }
  }
  
  /**
   * Updates the high scores table in the DOM
   */
  function updateHighScoresTable() {
    const highScores = getHighScores();
    const tableBody = DOM.display.highScoresTbody;
    
    // Clear existing rows
    tableBody.innerHTML = '';
    
    // Add score rows
    highScores.forEach((score, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${score.name}</td>
        <td>${score.score}</td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  /**
   * Shows the high scores screen
   */
  function showHighScores() {
    updateHighScoresTable();
    DOM.containers.highScoresContainer.style.display = 'flex';
  }
  
  /**
   * Hides the high scores screen
   */
  function hideHighScores() {
    DOM.containers.highScoresContainer.style.display = 'none';
  }
  
  // -----------------------------------------
  // Initialize the game
  // -----------------------------------------
  function initGame() {
    initializeButtons();
  }
  
  // Start the game when the page loads
  document.addEventListener('DOMContentLoaded', initGame);