const Dom = (function () {
  function renderBoat(cell) {
    cell.classList.add("ship");
  }

  function renderBoard(gameBoard, containerId, handleClick) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    const board = gameBoard.getBoard();

    board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellElement = document.createElement("div");
        cellElement.className = "cell";
        cellElement.dataset.row = rowIndex; // Attach row and column index as data attributes
        cellElement.dataset.col = colIndex;

        if (cell === false) {
          cellElement.classList.add("miss");
        }

        if (cell !== null) {
          renderBoat(cellElement);
        }

        cellElement.addEventListener("click", () => {
          console.log(
            `Cell at row ${rowIndex}, column ${colIndex} was clicked.`,
            typeof cell === "object",
          );
        });

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
