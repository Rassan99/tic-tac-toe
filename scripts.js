const GameBoard = (function () {
  const board = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  return board;
})();
function Player(n, x) {
  let name = n;
  let xO = x;
  return { name, xO };
}
function changeBoard(num, p1) {
  let result = [-1, -1];
  let pickedNumber = num;
  const xO = p1.xO;
  for (let i = 0; i < GameBoard.length; i++) {
    for (let j = 0; j < GameBoard[i].length; j++) {
      if (GameBoard[i][j] == pickedNumber) {
        result[0] = i;
        result[1] = j;
      }
    }
  }
  GameBoard[result[0]][result[1]] = xO;
  let winners = checkWins(GameBoard);
  if (winners.includes("wins")) {
    console.log(winners);
  }
  console.log(GameBoard);
}

function checkWins(board) {
  if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    return board[0][0] + " wins";
  } else if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
    return board[0][2] + " wins";
  }

  for (let i = 0; i < 3; i++) {
    if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
      return board[i][0] + " wins";
    }
  }

  for (let j = 0; j < 3; j++) {
    if (board[0][j] === board[1][j] && board[1][j] === board[2][j]) {
      return board[0][j] + " wins";
    }
  }
  return "nothing";
}
let rass = Player("rass", "x");
let ra = Player("ra", "o");
changeBoard(9, rass);
changeBoard(5, rass);
changeBoard(1, rass);
