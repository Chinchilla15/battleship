import Ship from "./ship";

export default function GameBoard() {
  const board = [];
  const missedShots = [];
  const allShots = [];

  function initializeBoard() {
    for (let i = 0; i < 10; i++) {
      board[i] = [];
      for (let j = 0; j < 10; j++) {
        board[i][j] = null;
      }
    }
  }

  function validatePlacement(row, col, length, orientation) {
    if (orientation === "horizontal") {
      if (col + length > 10) return false;
      for (let i = col; i < col + length; i++) {
        if (board[row][i] !== null) return false;
      }
    } else if (orientation === "vertical") {
      if (row + length > 10) return false;
      for (let i = row; i < row + length; i++) {
        if (board[i][col] !== null) return false;
      }
    }
    return true;
  }

  function placeShipHorizontal(row, col, ship) {
    for (let i = col; i < col + ship.length; i++) {
      board[row][i] = ship;
    }
    // return true;
  }

  function placeShipVertical(row, col, ship) {
    for (let i = row; i < row + ship.length; i++) {
      board[i][col] = ship;
    }
    // return true;
  }

  function placeShip(row, col, length, orientation) {
    const ship = new Ship(length);

    if (!validatePlacement(row, col, length, orientation)) {
      throw new Error(
        "Invalid placement: either out of bounds or overlapping with another ship.",
      );
    }

    if (orientation === "horizontal") {
      placeShipHorizontal(row, col, ship);
      // return true;
    } else if (orientation === "vertical") {
      placeShipVertical(row, col, ship);
    }

    return false;
  }

  function placeShipRandom() {
    const shipLengths = [1, 1, 2, 3, 3, 4, 5];
    initializeBoard();

    shipLengths.forEach((length) => {
      let placed = false;

      while (!placed) {
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);
        const orientation = Math.random() < 0.5 ? "horizontal" : "vertical";

        if (validatePlacement(row, col, length, orientation)) {
          placeShip(row, col, length, orientation);
          placed = true;
        }
      }
    });
  }

  function receiveAttack(row, col) {
    const target = board[row][col];
    allShots.push({ row, col });

    if (target === null) {
      board[row][col] = false; // CHANGE THIS ONCE THE UI IS READY
      missedShots.push({ row, col });
      return false;
    }
    if (target.hits < target.length) {
      target.hit();
      return true;
    }
    console.error("Cannot hit target: Cell has already been targeted");
    return false;
  }
  // console.log(missedShots);

  const getBoard = () => board;

  function allShipsSunk() {
    // eslint-disable-next-line no-shadow
    const board = getBoard();
    const shipLengths = [1, 1, 2, 3, 3, 4, 5];

    // Initialize an object to track the sunk status of each ship length
    const sunkShips = Object.fromEntries(
      shipLengths.map((length) => [length, false]),
    );

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        const cell = board[i][j];
        if (cell !== null && cell.sunk) {
          sunkShips[cell.length] = true;
        }
      }
    }

    // Check if all ships of each length are sunk
    return Object.values(sunkShips).every((sunk) => sunk);
  }

  return {
    initializeBoard,
    placeShip,
    receiveAttack,
    getBoard,
    allShipsSunk,
    placeShipRandom,
    missedShots,
    allShots,
  };
}
