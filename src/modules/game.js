import GameBoard from "./gameboard";
import Players from "./player";
import { Dom } from "./dom";

export default function Game() {
  const p2Board = document.getElementById("player-two-container");
  const p2Container = document.getElementById("p2-container");
  const randomBtn = document.getElementById("random-btn");
  const playGameBtn = document.getElementById("play-game-btn");
  const playAgainBtn = document.createElement("button");
  const winnerMessage = document.getElementById("winner");

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

  function initializeGame() {
    playerOneBoard.initializeBoard();
    playerTwoBoard.initializeBoard();
  }

  function renderBoards() {
    Dom.renderBoard(playerOneBoard, "player-one-container", false);
    Dom.renderBoard(playerTwoBoard, "player-two-container", true);
  }

  function attackPlayerOneBoard() {
    const attackCoordinates = playerTwo.computerAttack().coordinates;
    Dom.updatePlayerOneBoard(
      playerOneBoard,
      "player-one-container",
      attackCoordinates,
    );
  }

  function addPlayAgainBtn() {
    const btnsContainer = document.getElementById("buttons-container");

    playAgainBtn.style.display = "block";
    playAgainBtn.setAttribute("title", "Play Again");
    playAgainBtn.innerHTML = "<i class=\"fa-solid fa-repeat fa-2xl \"></i>";
    btnsContainer.appendChild(playAgainBtn);
  }

  function playGame() {
    while (
      activePlayer.isAI === true &&
      !playerOne.playersInfo[0].win &&
      !playerTwo.playersInfo[1].win
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
        playerTwo.playersInfo[1].win = true;
        winnerMessage.innerHTML = `${playerTwo.playersInfo[1].name} wins!`;
        p2Board.style.pointerEvents = "none";

        addPlayAgainBtn();
      }
      if (playerTwoBoard.allShipsSunk()) {
        playerOne.playersInfo[0].win = true;
        p2Board.style.pointerEvents = "none";
        winnerMessage.innerHTML = `${playerOne.playersInfo[0].name} wins!`;

        addPlayAgainBtn();
      }
    }
  }

  function startGame() {
    initializeGame();
    renderBoards();
    p2Container.style.display = "none";
    playGameBtn.disabled = true;
    playGameBtn.style.pointerEvents = "none";
  }

  function handlePlayerTwoBoardClick() {
    switchPlayer();
    playGame();
  }

  randomBtn.addEventListener("click", () => {
    playerOneBoard.placeShipRandom();
    Dom.renderBoard(playerOneBoard, "player-one-container", false);

    playGameBtn.style.pointerEvents = "auto";
    playGameBtn.disabled = false;
  });

  playGameBtn.addEventListener("click", () => {
    // playGame();

    playerTwoBoard.placeShipRandom();
    p2Container.style.display = "flex";

    randomBtn.style.display = "none";
    playGameBtn.style.display = "none";
    playAgainBtn.style.display = "none";

    p2Board.style.pointerEvents = "auto";
    winnerMessage.innerHTML = "";

    p2Board.addEventListener("click", handlePlayerTwoBoardClick);
  });

  playAgainBtn.addEventListener("click", () => {
    playerOne.playersInfo[0].win = false;
    playerTwo.playersInfo[1].win = false;

    restartPlayer();
    startGame();

    randomBtn.style.display = "block";
    playGameBtn.style.display = "block";
    playAgainBtn.style.display = "none";

    winnerMessage.innerHTML = "";

    p2Board.removeEventListener("click", handlePlayerTwoBoardClick);
  });

  return {
    startGame,
    playGame,
  };
}
