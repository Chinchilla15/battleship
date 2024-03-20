import Ship from "./ship";
import GameBoard from "./gameboard";
import Players from "./player";

function initializeGame() {
  const playerOneBoard = GameBoard();
  playerOneBoard.initializeBoard();

  const playerTwoBoard = GameBoard();
  playerTwoBoard.initializeBoard();

  const playerOne = Players(playerOneBoard);
  const playerTwo = Players(playerTwoBoard);

  playerOneBoard.placeShip(4, 4, 1, "vertical");
  playerOneBoard.placeShip(8, 8, 1, "vertical");
  playerOneBoard.placeShip(6, 1, 2, "horizontal");
  playerOneBoard.placeShip(0, 0, 3, "vertical");
  playerOneBoard.placeShip(0, 9, 3, "vertical");
  playerOneBoard.placeShip(5, 5, 4, "horizontal");
  playerOneBoard.placeShip(8, 1, 5, "horizontal");

  playerTwoBoard.placeShip(2, 3, 3, "vertical");

  return {
    playerOneBoard,
    playerTwoBoard,
    playerOne,
    playerTwo,
  };
}

export { initializeGame };
