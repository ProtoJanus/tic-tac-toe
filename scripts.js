const gameController = (function () {})();

const board = (function () {
  const initialBoardState = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
  let currentBoardState = [...initialBoardState];

  const getBoardState = () => {
    // returns a shallow copy of the current board so you can't accidentally modify it
    return [...currentBoardState];
  };

  const generateHTMLBoard = () => {
    const boardContainer = document.querySelector("#board-container");
    let id = 1;

    initialBoardState.forEach((element) => {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.id = `cell-${id}`;
      id += 1;

      boardContainer.appendChild(cell);
    });
  };
  return { getBoardState, generateHTMLBoard };
})();

function player(name, signifier) {
  const getName = () => {
    return name;
  };

  const getSignifier = () => {
    return signifier;
  };

  return { getName, getSignifier };
}

const player1 = player("player1", "X");
const player2 = player("player2", "O");
console.table(board.getBoardState());

board.generateHTMLBoard();
