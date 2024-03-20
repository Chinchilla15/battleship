const Dom = (function () {
  function renderBoat(cell) {
    cell.classList.add("ship");
  }

  function renderBoard(gameBoard, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    const board = gameBoard.getBoard();

    const missedShots = gameBoard.allShots;
    const allShots = gameBoard.missedShots;

    board.forEach((row) => {
      row.forEach((cell) => {
        const cellElement = document.createElement("div");

        cellElement.className = "cell";

        if (cell !== null) {
          renderBoat(cellElement);
        }

        container.appendChild(cellElement);
      });
    });
  }

  function showAttack(cell) {
    cell.classList.add("hit");
  }

  function disableBoard() {}

  function addShip() {}

  return {
    renderBoard,
    renderBoat,
    showAttack,
    disableBoard,
    addShip,
  };
})();

export { Dom };
