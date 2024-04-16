"use strict";

// Constants for the players
const PLAYER_X = 'X';
const PLAYER_O = 'O';
const EMPTY = ' ';

// Variables to keep track of the game state
let currentPlayer = PLAYER_X,
    grid = new Array(9).fill(EMPTY),
    gameOver = false,
    score = { 'X': 0, 'O': 0, 'ties': 0 };

// Winning combinations using the index of the grid
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Initialize game
function initialize() {
    document.querySelectorAll('.td_game div').forEach(cell => {
        cell.textContent = '';
        cell.className = 'fixed'; // Reset class
        cell.addEventListener('click', cellClicked);
    });
    updateScores();
    document.getElementById('restart').addEventListener('click', resetGame);
}

// Handle cell click
function cellClicked(event) {
    const cell = event.target;
    const index = parseInt(cell.id.substring(4), 10);

    if (grid[index] !== EMPTY || gameOver) {
        return; // Cell is already taken, or the game is over
    }

    // Update grid and UI
    grid[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('player' + currentPlayer); // Add color class based on the player
    
    // Check for a win or tie
    if (checkForWin(currentPlayer)) {
        gameOver = true;
        score[currentPlayer]++;
        alert(`Player ${currentPlayer} wins!`);
        updateScores();
        highlightWin();
    } else if (grid.every(cell => cell !== EMPTY)) {
        gameOver = true;
        score['ties']++;
        alert('Tie game!');
        updateScores();
    } else {
        // Swap players
        currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
        
        // If the current player is AI (PLAYER_O), let AI make a move
        if (currentPlayer === PLAYER_O) {
            const aiMove = getBestMove();
            const aiCell = document.getElementById('cell' + aiMove);
            setTimeout(() => {
                cellClicked({ target: aiCell });
            }, 1000); // Delay for better visualization
        }
    }
}

// Check for a win
function checkForWin(player) {
    return winningCombinations.some(combination => {
        if (combination.every(index => grid[index] === player)) {
            return true;
        }
        return false;
    });
}

// Highlight the winning combination
function highlightWin() {
    winningCombinations.forEach(combination => {
        const [a, b, c] = combination;
        const cellA = document.getElementById('cell' + a);
        const cellB = document.getElementById('cell' + b);
        const cellC = document.getElementById('cell' + c);
        if (grid[a] === grid[b] && grid[b] === grid[c] && grid[a] !== EMPTY) {
            cellA.style.backgroundColor = cellB.style.backgroundColor = cellC.style.backgroundColor = 'white';
        }
    });
}

// Reset the game
function resetGame() {
    grid.fill(EMPTY);
    gameOver = false;
    currentPlayer = PLAYER_X;
    document.querySelectorAll('.td_game div').forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('playerX', 'playerO');
        cell.style.backgroundColor = 'black'; // Reset cell color
    });
    updateScores();
}

// Update the scoreboard
function updateScores() {
    document.getElementById('player_score').textContent = score['X'];
    document.getElementById('computer_score').textContent = score['O'];
    document.getElementById('tie_score').textContent = score['ties'];
}

// Start the game
initialize();

