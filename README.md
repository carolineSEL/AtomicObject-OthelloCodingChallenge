
# Othello Project (Atomic)
##  Overview
This project presents a simulated Othello game between a bot and random player. The bot is designed to connect to an Othello game server, interpret the game state, and make strategic moves based on an evaluation strategy.

## Recommended Software
* Node 8.12.0
* NPM 6.8.0

## Strategy and Implementation
The cornerstone of this strategy is a matrix-based evaluation system:

## Matrix-Based Evaluation
Board Weights Matrix: The bot employs a weighted matrix to assign strategic values to each position on the Othello board. This matrix guides the bot in evaluating the positional strength of potential moves.
K
### Key Components:
- Corners and Edges: Given high weights due to their strategic importance and stability.
- Adjacent to Corners: Assigned lower or negative weights to avoid risky moves that might lead to the opponent capturing a corner.
- Central Control: Central positions are given moderate weights, balancing the need for board control and flexibility.

### Move Evaluation Process
- Counting Flipped Pieces: For each potential move, the bot calculates how many opponent pieces would be flipped, contributing to immediate board advantage.
- Positional Value: The bot then adds the strategic value of the move's position from the weighted board matrix.
- Move Selection: The bot chooses the move with the highest combined score of flipped pieces and positional value.

## ⚠️Running the Project
### Starting the Othello Game Server

- Requirements: Java must be installed on your system.
- Server Launch:

1) clone repository and install dependencies with: npm install
  
2) open a terminal and navigate to the directory where the othello.jar file is located- if you have not moved this file it will be located in he root directory of this project.

3) To start the server, run: java -jar othello.jar --p1-type remote --p2-type random --wait-for-ui

4) To connect client run: node client.js

- The client is set to connect to a server running on localhost at a specified port. Ensure the server is active before initiating the client.


## Instructions
Make sure you have the required npm package(s) installed: `npm install`
To run the client: `node client.js [optional port] [optional hostname]`

To run all tests, run `npm run test`
To run the 'returns a valid move' test, run `npm run test -- -t 'returns a valid move'`
To run the 'returns a valid response', run `npm run test -- -t 'returns a valid response'`

## Recommended Software
* Node 8.12.0
* NPM 6.8.0
