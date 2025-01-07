function GameBoard() {
  let board = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  return { board };
}
function Player(name, xO) {
  const name = name;
  const xO = choice;
  return { name, xO };
}
function changeBoard(number) {
  let result = [-1, -1];
  let pickedNumber = number;
  let updatedBoard = GameBoard();
  const { xO } = Player();
  for (let i = 0; i < updatedBoard.length; i++) {
    for (let j = 0; j < updatedBoard[i].length; j++) {
      if (updatedBoard[i][j] == pickedNumber) {
        result[0] = i;
        result[1] = j;
      }
    }
  }
  updatedBoard[result[0]][result[1]] = xO;

  return { updatedBoard };
}
