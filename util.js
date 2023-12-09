function getMove(player, board) {

  //finds all valid moves for player 
  const validMoves = findValidMoves(player, board);

  // var for the best move; initialize as null bc no move has been chosen yet
  let bestMove = null;
  let bestScore = -Infinity; //var for best score; will be updated

  validMoves.forEach(move => {
    const score = evaluateMove(move, board, player);
    if (score > bestScore) { //chekc if current move score is better than the bestScore
      bestScore = score; //update vars
      bestMove = move;
    }
  });

  return bestMove || [0,0]; //return best move or default to [0,0] if no moves are available
}

function findValidMoves(player, board) {
  let validMoves = []; //empty array to hold valid moves

    //iterate through each cell
    board.forEach((row, rowNum) => {
        row.forEach((cell, colNum) => {
            if (cell === 0) { // Check if the cell is empty, if so, add to array
                if (isValidMove(player, board, rowNum, colNum)) {
                    validMoves.push([rowNum, colNum]);
                }
            }
        });
    });

    return validMoves;
}

//helper function to check whether move is valid
function isValidMove(player, board, row, col) {
    // directions to check up, down, left, right, and diagonals
    const directions = [
      [-1, 0], // up
      [1, 0],  // down
      [0, -1], // left
      [0, 1],  // right
      [-1, -1],// up-left
      [-1, 1], // up-right
      [1, -1], // down-left
      [1, 1]   // down-right
  ];

  // determine opponent's player number (p1 or p2)
  const opponent = player === 1 ? 2 : 1;

    // loop through each direction 
    for (let [dx, dy] of directions) {
        let x = row + dx;
        let y = col + dy;
        let foundOpponent = false;

        // move in the direction until we hit the edge of the board or an empty cell.
        while (x >= 0 && x < board.length && y >= 0 && y < board[x].length && board[x][y] !== 0) {
            // if the cell contains an opponent's piece
            if (board[x][y] === opponent) {
                foundOpponent = true;
              // if it reaches a player's piece and has found an opponent's piece before
            } else if (board[x][y] === player && foundOpponent) {
                // found a valid sandwich in this direction.
                return true;
            } else {
                break; // not a valid move in this direction.
            }

            // move to the next cell in the direction
            x += dx;
            y += dy;
        }
    }

    // no valid move found in any direction.
    return false;
}

//create a weighted board to be used in evaluateMove functin, which will implement strategy:
//every position on the board is assigned a value based on its strategic importance, high positive values are assigned to corners because they are most advantageous, and negative values assigned to positions adjacent to corners
// because they can potentially lead to losing a corner. Center pieces are positive but low because they have less advantage than edges, but still have strategic value
const weightedBoard = [
  [100, -10, 11, 6, 6, 11, -10, 100],
  [-10, -20,  1,  2,  2,  1, -20, -10],
  [ 10,   1,  5,  4,  4,  5,   1,  10],
  [ 6,   2,  4,  2,  2,  4,   2,  6],
  [ 6,   2,  4,  2,  2,  4,   2,  6],
  [ 10,   1,  5,  4,  4,  5,   1,  10],
  [-10, -20,  1,  2,  2,  1, -20, -10],
  [100, -10, 11, 6, 6, 11, -10, 100]
];

function evaluateMove(move, board, player) {
  let score = 0;
  const [row, col] = move;

  score += countFlippedPieces(move, board, player); //add score based on the number of opponent pieces that would be flipped

  score += weightedBoard[row][col]; //add strategic value of the position from the weighted board

  return score;
}

function countFlippedPieces(move, board, player) {
  const opponent = player === 1 ? 2 : 1;
  let flippedCount = 0; // var to keep track of pieces that have been flipped

  //all possible directions from move position
  const directions = [
      [-1, 0], [1, 0], [0, -1], [0, 1],
      [-1, -1], [-1, 1], [1, -1], [1, 1]
  ];

  //iterate through each direction to count flippable pieces
  directions.forEach(([dx, dy]) => {
      
      let x = move[0] + dx; //start checking from cell next to move position
      let y = move[1] + dy;
      let piecesToFlip = 0;

      // continue in same direction
      while (x >= 0 && x < board.length && y >= 0 && y < board[x].length) {
          //if cell contains opponents piece, increment count
          if (board[x][y] === opponent) {
              piecesToFlip++;
            //if it reaches a piece and has found opponent pieces before, increment total flipped count, and we can stop checking in this direction
          } else if (board[x][y] === player && piecesToFlip > 0) {
              flippedCount += piecesToFlip;
              break;
            // if empty cell or edge is reached, stop checking this direction
          } else {
              break;
          }
          //moves to the next cell in the direction
          x += dx;
          y += dy;
      }
  });

  return flippedCount; //return total number of pieces that would be flipped by making this move
}


function prepareResponse(move) {
  const response = `${JSON.stringify(move)}\n`;
  console.log(`Sending response ${response}`);
  return response;
}

module.exports = {getMove, prepareResponse};
