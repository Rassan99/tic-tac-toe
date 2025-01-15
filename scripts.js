let GameBoard = (function () {
  let board = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  const getBoard = () => board;
  let resetBoard = () =>
    (board = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);
  return { getBoard, resetBoard };
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
  // let board = [
  //   [1, 2, 3],
  //   [4, 5, 6],
  //   [7, 8, 9],
  // ];
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
    const headerDiv = document.querySelector(".header");
    headerDiv.textContent = "";
    console.log("length of number =" + number);
    console.log(
      `Putting ${activePlayer.name}'s ${activePlayer.xO} into square ${num}...`
    );
    if (changeBoard(num, activePlayer)) {
      if (typeof num === "number") {
        number.push(num);
      }
      if (checkWins()) {
        number = [];
        GameBoard.resetBoard();
        const winner = document.createElement("p");
        winner.id = "winner";
        winner.textContent = ` ${activePlayer.name}'s ${activePlayer.xO} Won!`;
        headerDiv.appendChild(winner);
        console.log(` ${activePlayer.name}'s ${activePlayer.xO} Won!`);
      }
      if (number.length == 9) {
        number = [];
        GameBoard.resetBoard();
        const draw = document.createElement("p");
        draw.id = "draw";
        draw.textContent = ` it's a Draw!!`;
        headerDiv.appendChild(draw);
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
  for (let i = 0; i < GameBoard.getBoard().length; i++) {
    for (let j = 0; j < GameBoard.getBoard()[i].length; j++) {
      if (GameBoard.getBoard()[i][j] == pickedNumber) {
        result[0] = i;
        result[1] = j;
      }
    }
  }
  // if (typeof pickedNumber != "number") {
  //   return false;
  // number.includes(pickedNumber) || }
  if (isNaN(num)) {
    return false;
  } else {
    GameBoard.getBoard()[result[0]][result[1]] = xO;
    return true;
  }
}

function checkWins() {
  if (
    GameBoard.getBoard()[0][0] === GameBoard.getBoard()[1][1] &&
    GameBoard.getBoard()[1][1] === GameBoard.getBoard()[2][2]
  ) {
    return true;
  } else if (
    GameBoard.getBoard()[0][2] === GameBoard.getBoard()[1][1] &&
    GameBoard.getBoard()[1][1] === GameBoard.getBoard()[2][0]
  ) {
    return true;
  }

  for (let i = 0; i < 3; i++) {
    if (
      GameBoard.getBoard()[i][0] === GameBoard.getBoard()[i][1] &&
      GameBoard.getBoard()[i][1] === GameBoard.getBoard()[i][2]
    ) {
      return true;
    }
  }

  for (let j = 0; j < 3; j++) {
    if (
      GameBoard.getBoard()[0][j] === GameBoard.getBoard()[1][j] &&
      GameBoard.getBoard()[1][j] === GameBoard.getBoard()[2][j]
    ) {
      return true;
    }
  }
  return false;
}

function ScreenController() {
  let submitBttn = document.getElementById("submit");
  let form = document.getElementById("forma");
  submitBttn.addEventListener("click", func);
  const boardDiv = document.querySelector(".board");
  const playerTurnDiv = document.querySelector(".turn");
  boardDiv.style.display = "none";
  let choice;
  let p1choice;
  let p1Name;
  let p2choice;
  let p2Name;
  let game;
  function func() {
    if (form[0].checkValidity()) {
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
      game = gameController(Player(p1Name, p1choice), Player(p2Name, p2choice));
      boardDiv.style.display = "grid";
      const activePlayer = game.getActivePlayer();
      playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;
    }
  }
  const updateScreen = () => {
    const board = GameBoard.getBoard();
    boardDiv.textContent = "";

    board.forEach((row) => {
      row.forEach((cell, index) => {
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        cellButton.dataset.column = index;
        cellButton.textContent = cell;
        boardDiv.appendChild(cellButton);
      });
    });
  };

  function clickHandlerBoard(e) {
    const selectedColumn = parseInt(e.target.textContent, 10);
    const activePlayer = game.getActivePlayer();
    playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;
    game.playRound(selectedColumn);
    console.log("the display choice " + selectedColumn);

    updateScreen();
  }
  boardDiv.addEventListener("click", clickHandlerBoard);

  updateScreen();
}

ScreenController();
