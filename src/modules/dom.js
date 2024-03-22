const Dom = (function () {
  function renderBoat(cell) {
    cell.classList.add("ship");
  }

  function showAttack(cell) {
    cell.classList.add("hit");
  }

  function showMiss(cell) {
    cell.classList.add("miss");
  }

  function renderBoard(gameBoard, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    const board = gameBoard.getBoard();

    board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellElement = document.createElement("div");
        cellElement.className = "cell";
        cellElement.dataset.row = rowIndex;
        cellElement.dataset.col = colIndex;

        if (cell) renderBoat(cellElement);

        cellElement.addEventListener("click", () => {
          const rowData = cellElement.dataset.row;
          const colData = cellElement.dataset.col;

          gameBoard.receiveAttack(rowData, colData);
          console.log(board);

          updateBoard(gameBoard, containerId, rowData, colData);
        });

        container.appendChild(cellElement);
      });
    });
  }

  function updateBoard(gameBoard, containerId, clickedRow, clickedCol) {
    const container = document.getElementById(containerId);
    const cells = container.querySelectorAll(".cell");
    let shipSunk = null; // Variable to keep track if a ship has been sunk

    cells.forEach((cell) => {
      const rowIndex = cell.dataset.row;
      const colIndex = cell.dataset.col;
      const cellData = gameBoard.getBoard()[rowIndex][colIndex];

      if (cellData === false) {
        showMiss(cell);
      } else if (
        cellData &&
        rowIndex === clickedRow &&
        colIndex === clickedCol
      ) {
        showAttack(cell);
        if (cellData.isSunk()) {
          shipSunk = cellData; // Mark that a ship has been sunk
        }
      }
    });

    // Find the sunk ship and add the sunk class
    if (shipSunk !== null) {
      cells.forEach((cell) => {
        const rowIndex = cell.dataset.row;
        const colIndex = cell.dataset.col;
        const cellData = gameBoard.getBoard()[rowIndex][colIndex];

        if (cellData === shipSunk) {
          cell.classList.add("sunk");
        }
      });
    }
  }

  function disableBoard() {}

  function addShip() {}

  return {
    renderBoard,
    updateBoard,
    disableBoard,
    addShip,
  };
})();

export { Dom };
