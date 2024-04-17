# Tic-Tac-Toe with AI Opponent

This repository contains a simple implementation of the classic Tic-Tac-Toe game with an AI opponent using the minimax algorithm with alpha-beta pruning.

## Description

Tic-Tac-Toe with AI Opponent is a web-based game where players can enjoy the classic Tic-Tac-Toe experience against an AI opponent. The AI opponent is powered by the minimax algorithm with alpha-beta pruning, providing a challenging gameplay experience.

The game features a user-friendly interface with a black game board that turns white when there is a winning configuration, providing visual feedback to the players. It also keeps track of scores for both the player and the AI opponent, allowing users to compete and track their performance over multiple games.

## Features

- Play against an AI opponent that uses the minimax algorithm for decision-making.
- User-friendly interface with a black board that turns white when there is a winning configuration.
- Keeps track of scores for the player and the AI opponent.
- Option to restart the game at any time.

## How to Play

To play the Tic-Tac-Toe game:

1. **Clone or Download**: Clone or download the repository to your local machine.
   
2. **Open with Visual Studio Code**: If you're using Visual Studio Code, you can easily view and run the web application using the Live Server extension. Open the project folder in Visual Studio Code and install the Live Server extension if you haven't already. Then, right-click on the `index.html` file and select "Open with Live Server" to launch the game in your default web browser.

3. **Alternatively**: You can simply open the `index.html` file in a web browser of your choice by double-clicking on it. This will also launch the game in your browser.

4. **Gameplay**: Click on any cell in the grid to make a move. Play against the AI opponent and try to win!

## Technologies Used

- HTML
- CSS
- JavaScript

## Project Structure

- `index.html`: Main HTML file containing the game interface.
- `script.js`: JavaScript file containing the game logic, including AI opponent implementation.
- `style.css`: CSS file for styling the game interface.

## Overview of Minimax Algorithm and Alpha-Beta Pruning

The AI opponent in this Tic-Tac-Toe game utilizes the minimax algorithm with alpha-beta pruning for decision-making. Minimax is a recursive algorithm that aims to minimize the possible loss for a worst-case scenario, while alpha-beta pruning reduces the number of nodes evaluated by the minimax algorithm.

## Known Issues/Limitations

- To consider the many combinatorial possibilities for the AI in the first two moves, it takes a minute for the AI to add its move. Thus, when you are playing, be mindful that the first two plays of AI will take a bit to actually load. After that, because it will consider less options, it will only take the time I have set to simulate the AI 'thinking' before choosing the next move in here 

        if (currentPlayer === PLAYER_O) {
            setTimeout(aiMove, 1000); 
        }

## Resources and Credits

- [W3Schools - HTML, CSS, JavaScript](https://www.w3schools.com/)
- [GeeksforGeeks - Minimax Algorithm in Game Theory](https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-1-introduction/)
- [Mozilla Developer Network (MDN) - JavaScript Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Codecademy - Learn JavaScript](https://www.codecademy.com/learn/introduction-to-javascript)
- Russell, Stuart, and Peter Norvig. *Artificial Intelligence: A Modern Approach.* Pearson, 2021.
