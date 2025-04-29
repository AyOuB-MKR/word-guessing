// Game elements
const guessInput = document.getElementById('guess-input');
const guessBtn = document.getElementById('guess-btn');
const resetBtn = document.getElementById('reset-btn');
const messageEl = document.getElementById('message');
const guessesListEl = document.getElementById('guesses-list');
const guessesLeftEl = document.getElementById('guesses-left');

// Game variables
let targetNumber;
let guessesLeft;
let gameOver;
let guesses;

// Initialize game
function initGame() {
    targetNumber = Math.floor(Math.random() * 11); // 0-10
    guessesLeft = 3;
    gameOver = false;
    guesses = [];
    
    guessesLeftEl.textContent = guessesLeft;
    guessesListEl.textContent = '';
    messageEl.textContent = '';
    messageEl.className = '';
    guessInput.value = '';
    
    console.log('Target number:', targetNumber); // For debugging
}

// Check the guess
function checkGuess() {
    if (gameOver) return;
    
    const userGuess = parseInt(guessInput.value);
    
    // Validate input
    if (isNaN(userGuess)) {
        messageEl.textContent = 'Please enter a number!';
        messageEl.className = 'wrong';
        return;
    }
    
    if (userGuess < 0 || userGuess > 10) {
        messageEl.textContent = 'Please enter a number between 0 and 10!';
        messageEl.className = 'wrong';
        return;
    }
    
    // Process valid guess
    guesses.push(userGuess);
    guessesLeft--;
    
    // Update UI
    guessesLeftEl.textContent = guessesLeft;
    guessesListEl.textContent = guesses.join(', ');
    
    // Check if correct
    if (userGuess === targetNumber) {
        messageEl.textContent = `Congratulations! ${targetNumber} is correct!`;
        messageEl.className = 'correct';
        gameOver = true;
        return;
    }
    
    // Give hint
    if (userGuess < targetNumber) {
        messageEl.textContent = 'Too low! Try higher.';
    } else {
        messageEl.textContent = 'Too high! Try lower.';
    }
    messageEl.className = 'wrong';
    
    // Check if game over
    if (guessesLeft <= 0) {
        messageEl.textContent = `Game over! The number was ${targetNumber}.`;
        gameOver = true;
    }
    
    // Clear input
    guessInput.value = '';
    guessInput.focus();
}

// Event listeners
guessBtn.addEventListener('click', checkGuess);

guessInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkGuess();
    }
});

resetBtn.addEventListener('click', initGame);

// Start the game
initGame();