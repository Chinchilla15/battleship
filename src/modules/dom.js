const Dom = (() => {
  function renderBoat(cell) {
    cell.classList.add("ship");
  }

  function showAttack(cell) {
    cell.classList.add("hit");
  }

  function showMiss(cell) {
    cell.classList.add("miss");
  }

  function updatePlayerOneBoard(gameBoard, containerId, coordinates) {
    const container = document.getElementById(containerId);
    const cells = container.querySelectorAll(".cell");
    const row = coordinates[0];
    const col = coordinates[1];
    let shipSunk = null;

    cells.forEach((cell) => {
      const rowIndex = Number(cell.dataset.row);
      const colIndex = Number(cell.dataset.col);
      const cellData = gameBoard.getBoard()[rowIndex][colIndex];
      if (cellData === false) {
        showMiss(cell);
      } else if (cellData && rowIndex === row && colIndex === col) {
        showAttack(cell);
        if (cellData.isSunk()) {
          shipSunk = cellData;
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

  function updatePlayerTwoBoard(
    gameBoard,
    containerId,
    clickedRow,
    clickedCol,
  ) {
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

  // Function to handle the logic when a cell is clicked
  function cellClickHandler(event, gameBoard, containerId) {
    const cellElement = event.target;
    const rowData = cellElement.dataset.row;
    const colData = cellElement.dataset.col;

    gameBoard.receiveAttack(rowData, colData);

    updatePlayerTwoBoard(gameBoard, containerId, rowData, colData);

    cellElement.removeEventListener("click", cellElement.clickHandler);
  }

  function renderBoard(gameBoard, containerId, isPlayerTwoBoard) {
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

        if (isPlayerTwoBoard) {
          cellElement.clickHandler = (event) =>
            cellClickHandler(event, gameBoard, containerId);

          cellElement.addEventListener("click", cellElement.clickHandler);
        }

        container.appendChild(cellElement);
      });
    });
  }

  function disableBoard() {}

  function addShip() {}

  return {
    renderBoard,
    updatePlayerOneBoard,
    updatePlayerTwoBoard,
    disableBoard,
    addShip,
    cellClickHandler,
  };
})();

export { Dom };
