/* eslint-disable no-return-assign */
import Ship from "./ship";
import GameBoard from "./gameboard";
import Players from "./player";
import { Dom } from "./dom";

export default function Game() {
  const playerOneBoard = GameBoard();
  const playerTwoBoard = GameBoard();

  const playerOne = Players(playerTwoBoard);
  const playerTwo = Players(playerOneBoard);

  let activePlayerIndex = 0; // Start with player one

  const players = [playerOne, playerTwo];
  let activePlayer = players[activePlayerIndex].playersInfo[activePlayerIndex];

  const playerWon =
    players[activePlayerIndex].playersInfo[activePlayerIndex].win;

  function switchPlayer() {
    activePlayerIndex = activePlayerIndex === 0 ? 1 : 0;
    activePlayer = players[activePlayerIndex].playersInfo[activePlayerIndex];
  }

  function restartPlayer() {
    activePlayerIndex = activePlayerIndex === 1 ? 0 : 0;
    activePlayer = players[activePlayerIndex].playersInfo[activePlayerIndex];
  }

  // If active player = true && player = playerOne make player attack

  function initializeGame() {
    playerOneBoard.initializeBoard();
    playerTwoBoard.initializeBoard();

    playerOneBoard.placeShip(8, 1, 5, "horizontal");

    playerTwoBoard.placeShip(2, 4, 5, "vertical");
  }

  function renderBoards() {
    Dom.renderBoard(playerOneBoard, "player-one-container", false);
    Dom.renderBoard(playerTwoBoard, "player-two-container", true);
  }

  function startGame() {
    initializeGame();
    renderBoards();
  }

  function attackPlayerOneBoard() {
    Dom.updatePlayerOneBoard(
      playerOneBoard,
      "player-one-container",
      playerTwo.computerAttack().coordinates,
    );
    // console.log(playerOneBoard.getBoard());
  }
  /*
  function attackPlayerTwoBoard(row, col) {
    playerOne.playerAttack(row, col);
  }
*/
  function playRound() {}

  startGame();
  /* 
Loop to test computer attacks 
  for (let i = 0; i < 50; i++) {
    Dom.updatePlayerOneBoard(
      playerOneBoard,
      "player-one-container",
      playerTwo.computerAttack().coordinates,
    );
  }
*/

  return { initializeGame, startGame, playerOneBoard, playerTwoBoard };
}
