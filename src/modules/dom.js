function renderBoard(gameBoard, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  const board = gameBoard.getBoard();
  board.forEach((row) => {
    row.forEach((cell) => {
      const cellElement = document.createElement("div");
      cellElement.className = "cell";
      if (cell !== null) {
        cellElement.classList.add("ship");
      }
      container.appendChild(cellElement);
    });
  });
}

export { renderBoard };
