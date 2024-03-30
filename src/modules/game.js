/* eslint-disable import/no-cycle */
import Ship from "./ship";
import GameBoard from "./gameboard";
import Players from "./player";
import { Dom } from "./dom";

export default function Game() {
  const p2Board = document.getElementById("player-two-container");

  const playerOneBoard = GameBoard();
  const playerTwoBoard = GameBoard();

  const playerOne = Players(playerTwoBoard);
  const playerTwo = Players(playerOneBoard);

  const players = [playerOne, playerTwo];

  let activePlayerIndex = 0; // Start with player one

  let activePlayer = players[activePlayerIndex].playersInfo[activePlayerIndex];

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

    playerOneBoard.placeShipRandom();

    playerTwoBoard.placeShipRandom();
  }

  function renderBoards() {
    Dom.renderBoard(playerOneBoard, "player-one-container", false);
    Dom.renderBoard(playerTwoBoard, "player-two-container", true);
  }

  function attackPlayerOneBoard() {
    Dom.updatePlayerOneBoard(
      playerOneBoard,
      "player-one-container",
      playerTwo.computerAttack().coordinates,
    );
  }

  function playRound() {
    if (activePlayer.isAI === false) {
      switchPlayer();
    }
    if (playerOneBoard.allShipsSunk()) {
      playerTwo.playersInfo[0].win = true;
    }
    if (playerTwoBoard.allShipsSunk()) {
      playerOne.playersInfo[0].win = true;
    }
  }

  function playGame() {
    //  playRound();
    while (
      activePlayer.isAI === true &&
      !playerOne.playersInfo[0].win &&
      !playerTwo.playersInfo[0].win
    ) {
      setTimeout(() => {
        try {
          attackPlayerOneBoard();
        } catch (err) {
          console.log(err);
        }
      }, 0);

      switchPlayer();
      if (playerOneBoard.allShipsSunk()) {
        playerTwo.playersInfo[0].win = true;
        console.log("game over");
      }
      if (playerTwoBoard.allShipsSunk()) {
        playerOne.playersInfo[0].win = true;
        console.log("game over");
      }
    }
  }

  function startGame() {
    initializeGame();
    renderBoards();
    // playGame();
  }

  // startGame();

  p2Board.addEventListener("click", () => {
    switchPlayer();
    playGame();
  });

  return {
    initializeGame,
    startGame,
    playerOneBoard,
    playerTwoBoard,
    switchPlayer,
    activePlayer,
    playRound,
    playGame,
  };
}
