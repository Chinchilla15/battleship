import { initializeGame } from "./game.js";
import { renderBoard } from "./dom.js";

function startGame() {
  const { playerOneBoard, playerTwoBoard, playerOne, playerTwo } =
    initializeGame();

  renderBoard(playerOneBoard, "player-one-container");
  renderBoard(playerTwoBoard, "player-two-container");
}

export { startGame };
