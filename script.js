"use strict";

// Constants for the players
const PLAYER_X = 'X';
const PLAYER_O = 'O';
const EMPTY = ' ';

// Variables to keep track of the game state
let currentPlayer = PLAYER_X,
    grid = new Array(16).fill(EMPTY), 
    gameOver = false,
    score = { 'X': 0, 'O': 0, 'ties': 0 };

// Winning combinations for a 4x4 board
const winningCombinations = [
    [0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15], // Rows
    [0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15], // Columns
    [0, 5, 10, 15], [3, 6, 9, 12]                                 // Diagonals
];

function initialize() {
    document.querySelectorAll('.td_game div').forEach((cell, index) => {
        cell.textContent = '';
        cell.className = 'fixed';
        cell.id = 'cell' + index;  // Assigns a specific id for each cell
        cell.addEventListener('click', cellClicked);
    });
    updateScores();
    document.getElementById('restart').addEventListener('click', resetGame);
}

function cellClicked(event) {
    const cell = event.target;
    const index = parseInt(cell.id.substring(4), 10);
    if (grid[index] === EMPTY && !gameOver) {
        grid[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add('player' + currentPlayer);
        checkGameStatus(); // Checks here for win or draw
        currentPlayer = (currentPlayer === PLAYER_X) ? PLAYER_O : PLAYER_X; 
        if (currentPlayer === PLAYER_O) {
            setTimeout(aiMove, 1000); 
        }
    }
}

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

function aiMove() {
    const move = getBestMove();
    if (move !== -1) {
        document.getElementById('cell' + move).click();
    }
}

function checkForWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => grid[index] === player);
    });
}

function resetGame() {
    grid.fill(EMPTY);
    gameOver = false;
    currentPlayer = PLAYER_X;
    document.querySelectorAll('.td_game div').forEach(cell => {
        cell.textContent = '';
        cell.className = 'fixed';
    });
    updateScores();
}

function updateScores() {
    document.getElementById('player_score').textContent = score['X'];
    document.getElementById('computer_score').textContent = score['O'];
    document.getElementById('tie_score').textContent = score['ties'];
}

// AI logic using minimax algorithm with alpha-beta pruning
function getBestMove() {
    let bestScore = -Infinity;
    let move = -1;
    for (let i = 0; i < grid.length; i++) {
        if (grid[i] === EMPTY) {
            grid[i] = PLAYER_O;
            let score = minimax(grid, 0, false, -Infinity, Infinity);
            grid[i] = EMPTY;
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    return move;
}

function minimax(grid, depth, isMaximizingPlayer, alpha, beta) {
    if (checkForWin(PLAYER_X)) return -10 + depth;
    if (checkForWin(PLAYER_O)) return 10 - depth;
    if (grid.every(cell => cell !== EMPTY)) return 0;

    if (isMaximizingPlayer) {
        let bestScore = -Infinity;
        for (let i = 0; i < grid.length; i++) {
            if (grid[i] === EMPTY) {
                grid[i] = PLAYER_O;
                let score = minimax(grid, depth + 1, false, alpha, beta);
                grid[i] = EMPTY;
                bestScore = Math.max(score, bestScore);
                alpha = Math.max(alpha, score);
                if (beta <= alpha) break;
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < grid.length; i++) {
            if (grid[i] === EMPTY) {
                grid[i] = PLAYER_X;
                let score = minimax(grid, depth + 1, true, alpha, beta);
                grid[i] = EMPTY;
                bestScore = Math.min(score, bestScore);
                beta = Math.min(beta, score);
                if (beta <= alpha) break;
            }
        }
        return bestScore;
    }
}
