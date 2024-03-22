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

  function updatePlayerOneBoard(gameBoard, containerId) {
    const container = document.getElementById(containerId);
    const cells = container.querySelectorAll(".cell");

    gameBoard.getBoard().forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        // Find the corresponding cell element in the DOM
        const cellElement = [...cells].find(
          (element) =>
            parseInt(element.dataset.row, 10) === rowIndex &&
            parseInt(element.dataset.col, 10) === colIndex,
        );

        // if (!cellElement) return; // Skip if no corresponding element is found

        // Clear previous state classes to prevent visual bugs
        //  cellElement.classList.remove("hit", "miss", "sunk");

        if (cell === false) {
          showMiss(cellElement);
        } else if (cell && typeof cell === "object") {
          console.log(cell.hits);
        }
        // If the cell has a ship that hasn't been hit, it might not do anything visually here, depending on game rules about revealing ships
      });
    });
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
          cellElement.addEventListener("click", (event) => {
            cellClickHandler(event, gameBoard, containerId);
          });
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
