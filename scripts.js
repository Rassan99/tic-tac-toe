let GameBoard = (function () {
  let board = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  return board;
})();
let number = (function () {
  let num = [];
  return num;
})();
function Player(n, x) {
  let name = n;
  let xO = x;
  return { name, xO };
}
function gameController(p1, p2) {
  let board = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  let activePlayer = p1;
  let switchPlayer = () => {
    if (activePlayer === p1) {
      activePlayer = p2;
    } else {
      activePlayer = p1;
    }
  };

  const printNewRound = () => {
    console.log(GameBoard);
    console.log(`${activePlayer.name}'s turn.`);
  };
  const playRound = (num) => {
    console.log(
      `Putting ${activePlayer.name}'s ${activePlayer.xO} into square ${num}...`
    );
    if (changeBoard(num, activePlayer)) {
      number.push(num);
      if (checkWins()) {
        number = [];
        GameBoard = board;
        console.log(` ${activePlayer.name}'s ${activePlayer.xO} Won!`);
      }
      if (number.length == 9) {
        number = [];
        GameBoard = board;
        console.log(` it's a Draw!`);
      }
      switchPlayer();
      printNewRound();
    }
  };
  return {
    playRound,
  };
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
  if (number.includes(pickedNumber)) {
    return false;
  } else {
    GameBoard[result[0]][result[1]] = xO;
    return true;
  }
}

function checkWins() {
  if (
    GameBoard[0][0] === GameBoard[1][1] &&
    GameBoard[1][1] === GameBoard[2][2]
  ) {
    return true;
  } else if (
    GameBoard[0][2] === GameBoard[1][1] &&
    GameBoard[1][1] === GameBoard[2][0]
  ) {
    return true;
  }

  for (let i = 0; i < 3; i++) {
    if (
      GameBoard[i][0] === GameBoard[i][1] &&
      GameBoard[i][1] === GameBoard[i][2]
    ) {
      return true;
    }
  }

  for (let j = 0; j < 3; j++) {
    if (
      GameBoard[0][j] === GameBoard[1][j] &&
      GameBoard[1][j] === GameBoard[2][j]
    ) {
      return true;
    }
  }
  return false;
}
