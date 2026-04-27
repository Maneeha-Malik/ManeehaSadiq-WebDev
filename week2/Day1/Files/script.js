// Generate random number between 1 and 100
let treasure = Math.floor(Math.random() * 100) + 1;
let attemptsLeft = 7;

console.log("Treasure is at:", treasure); // for testing

function checkGuess() {
    const guessInput = document.getElementById('guess');
    const message = document.getElementById('message');
    const attemptsSpan = document.getElementById('attempts');
    const searchBtn = document.getElementById('searchBtn');
    const playAgainBtn = document.getElementById('playAgainBtn');

    const guess = parseInt(guessInput.value);

    // Check if input is empty or invalid
    if (!guess || guess < 1 || guess > 100) {
        message.textContent = '⚠️ Please enter a number between 1 and 100!';
        message.className = 'too-ahead';
        return;
    }

    // Reduce attempts
    attemptsLeft--;
    attemptsSpan.textContent = attemptsLeft;

    // Check guess
    if (guess > treasure) {
        message.textContent = '⬆️ Too Far Ahead!';
        message.className = 'too-ahead';
    } else if (guess < treasure) {
        message.textContent = '⬇️ Too Far Behind!';
        message.className = 'too-behind';
    } else {
        message.textContent = '🎉 Treasure Found!';
        message.className = 'found';
        endGame(searchBtn, guessInput, playAgainBtn);
        return;
    }

    // Check if game over
    if (attemptsLeft === 0) {
        message.textContent = `💀 Game Over! The treasure was at ${treasure}!`;
        message.className = 'game-over';
        endGame(searchBtn, guessInput, playAgainBtn);
    }

    // Clear input
    guessInput.value = '';
}

// End game function
function endGame(searchBtn, guessInput, playAgainBtn) {
    searchBtn.disabled = true;
    guessInput.disabled = true;
    playAgainBtn.style.display = 'block';
}

// Reset game function
function resetGame() {
    treasure = Math.floor(Math.random() * 100) + 1;
    attemptsLeft = 7;

    console.log("New treasure is at:", treasure); // for testing

    document.getElementById('attempts').textContent = 7;
    document.getElementById('message').textContent = '';
    document.getElementById('message').className = '';
    document.getElementById('guess').value = '';
    document.getElementById('guess').disabled = false;
    document.getElementById('searchBtn').disabled = false;
    document.getElementById('playAgainBtn').style.display = 'none';
}

// Allow pressing Enter to search
document.getElementById('guess').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkGuess();
    }
});