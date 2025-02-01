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

  const dialog = document.querySelector("dialog");
  const resetButton = document.querySelector("#reset-button");

  resetButton.addEventListener("click", () => {
    dialog.close();
    board.generateHTMLBoard();
    board.resetBoardArray();
  });

  const getCurrentPlayer = () => {
    return currentPlayer;
  };

  const playRound = (square) => {
    let index = square.id.split("-")[1] - 1;
    const gameResult = document.querySelector("#game-result");

    board.changeBoardArray(index, currentPlayer.getSignifier());
    board.changeBoardHTML(square, currentPlayer.getSignifier());

    if (checkForWin(board)) {
      dialog.showModal();
      gameResult.innerHTML = `Player ${currentPlayer.getSignifier()} Wins!`;
    } else {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
    }
  };

  const checkForWin = (board) => {
    const winConditions = [
      // horizontal win
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // vertical win
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // diagonal win
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let condition of winConditions) {
      let [a, b, c] = condition;

      let currentBoard = board.getBoardState();
      // checks if currentBoard[a] is a truthy value, then checks if there is a win
      if (currentBoard[a] !== " ")
        if (
          currentBoard[a] === currentBoard[b] &&
          currentBoard[a] === currentBoard[c]
        ) {
          return true;
        }
    }

    return false;
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
    boardContainer.innerHTML = "";
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

  const resetBoardArray = () => {
    currentBoardState = [...initialBoardState];
  };

  return {
    getBoardState,
    generateHTMLBoard,
    changeBoardArray,
    changeBoardHTML,
    resetBoardArray,
  };
})();

board.generateHTMLBoard();
