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

  function switchPlayer() {
    activePlayerIndex = activePlayerIndex === 0 ? 1 : 0;
    activePlayer =
      !players[activePlayerIndex].playersInfo[activePlayerIndex].turn;
  }

  // If active player = true && player = playerOne make player attack

  function restartPlayer() {
    return (activePlayer = activePlayerIndex === 1 ? 0 : 0);
  }
  /*
  const restart = () =>
    (activePlayer =
      activePlayer === playerTwo.playersInfo[1]
        ? playerOne.playersInfo[0]
        : playerOne.playersInfo[0]);
*/
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
  /*
  function attackPlayerOneBoard() {
    playerTwo.computerAttack();
  }

  function attackPlayerTwoBoard(row, col) {
    playerOne.playerAttack(row, col);
  }
*/
  function playRound() {}

  startGame();
  playerOneBoard.receiveAttack(0, 0);
  playerTwo.computerAttack();
  console.log(playerOneBoard.getBoard());
  Dom.updatePlayerOneBoard(playerOneBoard, "player-one-container");

  return { initializeGame, startGame, playerOneBoard, playerTwoBoard };
}
