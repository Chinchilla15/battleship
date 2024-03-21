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

  const switchPlayer = () => {
    activePlayer =
      activePlayer === playerOne.playersInfo[0]
        ? playerTwo.playersInfo[1]
        : playerOne.playersInfo[0];
  };

  const restartPlayer = () => {
    activePlayer =
      activePlayer === playerTwo.playersInfo[1]
        ? playerOne.playersInfo[0]
        : playerOne.playersInfo[0];
  };

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

  function attackPlayerOneBoard() {
    playerTwo.computerAttack();
  }

  function attackPlayerTwoBoard(row, col) {
    playerOne.playerAttack(row, col);
  }

  function handleAttack(row, col) {
    const currentPlayer = playerOne.playersInfo[0].turn ? playerOne : playerTwo;

    console.log(currentPlayer.playersInfo[0].isAI);
  }
  /*
  function switchPlayer() {
    playerOne.turn = !playerOne.turn;
    playerTwo.turn = !playerTwo.turn;
  }
*/
  attackPlayerTwoBoard(0, 1);
  attackPlayerOneBoard();

  playerTwoBoard.receiveAttack(0, 0);
  playerOneBoard.receiveAttack(0, 0);
  /*
  // Example attacks to test functionality
  attackPlayerOneBoard(0, 0);
  attackPlayerOneBoard(0, 1);
  attackPlayerOneBoard(0, 2);
  attackPlayerOneBoard(1, 0);
  attackPlayerOneBoard(2, 0);
  attackPlayerTwoBoard(1, 1);
  attackPlayerTwoBoard(5, 6);
  attackPlayerTwoBoard(1, 0);
*/

  console.log(playerOne.playersInfo[0].isAI);

  handleAttack();
  return { initializeGame, startGame, playerOneBoard, playerTwoBoard };
}
