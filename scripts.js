const board = (function () {
  let boardState = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

  const getBoardState = () => {
    // returns a shallow copy of the current board so you can't accidentally modify it
    return [...boardState];
  };

  return { getBoardState };
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
