function player(name, signifier) {
  const getName = () => {
    return name;
  };

  const getSignifier = () => {
    return signifier;
  };

  return { getName, getSignifier };
}

// declare players before their use in the modules below

const player1 = player("player1", "X");
const player2 = player("player2", "O");

const gameController = (function () {
  let currentPlayer = player1;

  const getCurrentPlayer = () => {
    return currentPlayer;
  };

  const playRound = (square) => {
    let index = square.id.split("-")[1] - 1;

    board.changeBoardArray(index, currentPlayer.getSignifier());
    board.changeBoardHTML(square, currentPlayer.getSignifier());
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  return { getCurrentPlayer, playRound };
})();

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

      cell.addEventListener("click", (e) => {
        // if the cell is empty then play round, otherwise do nothing
        if (!e.target.innerHTML) {
          gameController.playRound(e.target);
        }
      });

      boardContainer.appendChild(cell);
    });
  };

  const changeBoardArray = (index, signifier) => {
    currentBoardState[index] = signifier;
    console.log(currentBoardState);
  };

  const changeBoardHTML = (square, signifier) => {
    square.innerHTML = signifier;
  };

  return {
    getBoardState,
    generateHTMLBoard,
    changeBoardArray,
    changeBoardHTML,
  };
})();

board.generateHTMLBoard();
