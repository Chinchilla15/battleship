/* eslint-disable no-return-assign */
import Ship from "./ship";
import GameBoard from "./gameboard";
import Players from "./player";
import { Dom } from "./dom";

export default function Game() {
  const playerOneBoard = GameBoard();
  playerOneBoard.initializeBoard();

  const playerTwoBoard = GameBoard();
  playerTwoBoard.initializeBoard();

  const playerOne = Players(playerTwoBoard);
  const playerTwo = Players(playerOneBoard);

  let activePlayer = playerOne.playersInfo[0];

  const switchPlayer = () =>
    (activePlayer =
      activePlayer === playerOne.playersInfo[0]
        ? playerTwo.playersInfo[1]
        : playerOne.playersInfo[0]);

  const restartPlayer = () =>
    (activePlayer =
      activePlayer === playerTwo.playersInfo[1]
        ? playerOne.playersInfo[0]
        : playerOne.playersInfo[0]);

  function initializeGame() {
    playerOneBoard.placeShip(8, 1, 5, "horizontal");

    playerTwoBoard.placeShip(2, 4, 5, "vertical");
  }

  function renderBoards() {
    Dom.renderBoard(playerOneBoard, "player-one-container");
    Dom.renderBoard(playerTwoBoard, "player-two-container");
  }

  function startGame() {
    initializeGame();
    renderBoards();
  }

  function attackPlayerOneBoard(row, col) {
    playerOneBoard.receiveAttack(row, col);
  }

  function attackPlayerTwoBoard(row, col) {
    playerTwoBoard.receiveAttack(row, col);
  }

  startGame();

  /*
  console.log(playerOne.playersInfo[0].isAI);
  console.log(playerTwo.playersInfo[1].isAI);
*/

  return { initializeGame, startGame, playerOneBoard, playerTwoBoard };
}
