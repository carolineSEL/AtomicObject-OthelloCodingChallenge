
# Othello Project (Atomic)
##  Overview
This project presents a simulated Othello game between a bot and random player. The bot is designed to connect to an Othello game server, interpret the game state, and make strategic moves based on an evaluation strategy.

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

- Requirements: Java must be installed on your system.
- Server Launch:

1) clone repository and install dependencies with: npm install
  
2) open a terminal and navigate to the directory where the othello.jar file is located- it should be located in he root directory of this project.

3) To start the server, run: java -jar othello.jar --p1-type remote --p2-type random --wait-for-ui (The --wait-for-ui flag allows you to view the game in the UI)
   
4) When the server is up with the --wait-for-ui flag, you can view a visual UI of the game on your localhost at http://localhost:8080

5) To connect client run: node client.js
6) NOTE: If you are having issues running the server or connecting the client, please check your background processes in your task manager to make sure nothing is running on the ports. Use the command: netstat -ano | findstr :8080 to view if any other processes are running. If so, locate the PID (the fourth column that displays from the previous command), search for that PID in the Task manaer, and end the task. With this being done the program should run smoothly.

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
