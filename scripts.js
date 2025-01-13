let GameBoard = (function () {
  let board = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  // const getBoard = () => board;

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
  const getActivePlayer = () => activePlayer;

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
    getBoard: GameBoard,
    getActivePlayer,
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

function ScreenController() {
  let submitBttn = document.getElementById("submit");
  submitBttn.addEventListener("click", func);
  const boardDiv = document.querySelector(".board");
  const playerTurnDiv = document.querySelector(".turn");
  let choice;
  let p1choice;
  let p1Name;
  let p2choice;
  let p2Name;
  function func() {
    choice = document.getElementsByName("choice");
    for (let i = 0; i < choice.length; i++) {
      if (choice[i].checked) {
        p1choice = choice[i].value;
      }
    }
    p1Name = document.getElementById("p1name").value;
    p2Name = document.getElementById("p2name").value;
    p2choice = p1choice === "x" ? "o" : "x";
    document.getElementById("form").remove();
    console.log(p2choice);
    return {
      p1choice,
      p1Name,
      p2Name,
      p2choice,
    };
  }

  const game = gameController(
    Player(p1Name, p1choice),
    Player(p2Name, p2choice)
  );
  const updateScreen = () => {
    // clear the board
    boardDiv.textContent = "";

    // get the newest version of the board and player turn
    const board = game.getBoard;
    const activePlayer = game.getActivePlayer();

    // Display player's turn
    playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;

    // Render board squares
    board.forEach((row) => {
      row.forEach((cell, index) => {
        // Anything clickable should be a button!!
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        // Create a data attribute to identify the column
        // This makes it easier to pass into our `playRound` function
        cellButton.dataset.column = index;
        // cellButton.textContent = cell.getValue();
        boardDiv.appendChild(cellButton);
      });
    });
  };

  // Add event listener for the board
  function clickHandlerBoard(e) {
    const selectedColumn = e.target.dataset.column;
    // Make sure I've clicked a column and not the gaps in between
    if (!selectedColumn) return;

    game.playRound(selectedColumn);
    updateScreen();
  }
  boardDiv.addEventListener("click", clickHandlerBoard);

  // Initial render
  updateScreen();

  // We don't need to return anything from this module because everything is encapsulated inside this screen controller.
}

ScreenController();

// let rass = Player("rass", "x");
// let ra = Player("ra", "o");

// const game = gameController(rass, ra);
// game.playRound(1); // X in position 1
// game.playRound(2); // O in position 2
// game.playRound(3); // X in position 3
// game.playRound(5); // O in position 5
// game.playRound(6); // X in position 6
// game.playRound(4); // O in position 4
// game.playRound(7); // X in position 7
// game.playRound(9); // O in position 9
// game.playRound(8); // X in position 8
