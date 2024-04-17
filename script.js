"use strict";

// Constants for the players
const PLAYER_X = 'X';
const PLAYER_O = 'O';
const EMPTY = ' ';

// Variables to keep track of the game state
let currentPlayer = PLAYER_X, // Player X starts the game
    grid = new Array(16).fill(EMPTY), // Initialize the grid with empty cells
    gameOver = false, // Tracks if the game is over
    score = { 'X': 0, 'O': 0, 'ties': 0 }; // Object to keep track of scores

// Winning combinations for a 4x4 board
const winningCombinations = [
    [0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15], // Rows
    [0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15], // Columns
    [0, 5, 10, 15], [3, 6, 9, 12] // Diagonals
];

/**
 * Initializes the game board and event listeners.
 */
function initialize() {
    // Reset each cell in the grid
    document.querySelectorAll('.td_game div').forEach((cell, index) => {
        cell.textContent = ''; // Clear cell content
        cell.className = 'fixed'; // Reset cell class
        cell.id = 'cell' + index; // Assigns a specific id for each cell
        cell.addEventListener('click', cellClicked); // Add click event listener
    });
    updateScores(); // Update scores on the UI
    document.getElementById('restart').addEventListener('click', resetGame); // Add click event listener to restart button
}

/**
 * Handles cell click event.
 */
function cellClicked(event) {
    const cell = event.target;
    const index = parseInt(cell.id.substring(4), 10); // Extract cell index from id
    if (grid[index] === EMPTY && !gameOver) {
        grid[index] = currentPlayer; // Set player's symbol in the grid
        cell.textContent = currentPlayer; // Update cell content with player's symbol
        cell.classList.add('player' + currentPlayer); // Add appropriate class for styling
        checkGameStatus(); // Check for win or draw
        currentPlayer = (currentPlayer === PLAYER_X) ? PLAYER_O : PLAYER_X; // Switch players
        if (currentPlayer === PLAYER_O) {
            setTimeout(aiMove, 1000); // Delay AI move to allow UI to update
        }
    }
}

/**
 * Checks the game status for a win or draw.
 */
function checkGameStatus() {
    if (checkForWin(currentPlayer)) {
        alert(`Player ${currentPlayer} wins!`);
        updateScores();
        gameOver = true;
    } else if (grid.every(cell => cell !== EMPTY)) {
        alert('Tie game!');
        score['ties']++;
        updateScores();
        gameOver = true;
    }
}

/**
 * Initiates the AI's move.
 */
function aiMove() {
    const move = getBestMove();
    if (move !== -1) {
        document.getElementById('cell' + move).click(); // Simulate click on the best move
    }
}

/**
 * Checks if the current player has won the game.
 */
function checkForWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => grid[index] === player); // Check if all cells in any winning combination belong to the player
    });
}

/**
 * Resets the game state to start a new game.
 */
function resetGame() {
    grid.fill(EMPTY); // Clear the grid
    gameOver = false; // Flag to reset game over 
    currentPlayer = PLAYER_X; // Reset to player X
    document.querySelectorAll('.td_game div').forEach(cell => {
        cell.textContent = ''; // Clear cell content
        cell.className = 'fixed'; // Reset cell class
    });
    updateScores(); // Update scores on the UI
}

/**
 * Updates the scores displayed on the UI.
 */
function updateScores() {
    document.getElementById('player_score').textContent = score['X']; // Update player's score
    document.getElementById('computer_score').textContent = score['O']; // Update AI's score
    document.getElementById('tie_score').textContent = score['ties']; // Update tie score
}

/**
 * Determines the best move for the AI opponent using the minimax algorithm with alpha-beta pruning.
 */
function getBestMove() {
    let bestScore = -Infinity;
    let move = -1;
    for (let i = 0; i < grid.length; i++) {
        if (grid[i] === EMPTY) {
            grid[i] = PLAYER_O; // Simulates AI move
            let score = minimax(grid, 0, false, -Infinity, Infinity); // Get score for the current move
            grid[i] = EMPTY; // Reset grid
            if (score > bestScore) {
                bestScore = score; // Update best score
                move = i; // Update best move
            }
        }
    }
    return move;
}

/**
 * Implements the minimax algorithm with alpha-beta pruning to determine the optimal move.
 */
function minimax(grid, depth, isMaximizingPlayer, alpha, beta) {
    if (checkForWin(PLAYER_X)) return -10 + depth; // If player X wins, return score with depth penalty
    if (checkForWin(PLAYER_O)) return 10 - depth; // If player O wins, return score with depth bonus
    if (grid.every(cell => cell !== EMPTY)) return 0; // If the grid is full, return neutral score

    if (isMaximizingPlayer) {
        let bestScore = -Infinity;
        for (let i = 0; i < grid.length; i++) {
            if (grid[i] === EMPTY) {
                grid[i] = PLAYER_O; // Simulate AI move
                let score = minimax(grid, depth + 1, false, alpha, beta); // Get score for the current move
                grid[i] = EMPTY; // Reset grid
                bestScore = Math.max(score, bestScore); // Update best score
                alpha = Math.max(alpha, score); // Update alpha
                if (beta <= alpha) break; // Beta cutoff
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < grid.length; i++) {
            if (grid[i] === EMPTY) {
                grid[i] = PLAYER_X; // Simulate player's move
                let score = minimax(grid, depth + 1, true, alpha, beta); // Get score for the current move
                grid[i] = EMPTY; // Reset grid
                bestScore = Math.min(score, bestScore); // Update best score
                beta = Math.min(beta, score); // Update beta
                if (beta <= alpha) break; // Alpha cutoff
            }
        }
        return bestScore;
    }
}
