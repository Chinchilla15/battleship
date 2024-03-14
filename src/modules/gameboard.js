import Ship from "./ship";

export default function GameBoard() {
  const board = [];

  function initializeBoard() {
    for (let i = 0; i < 10; i++) {
      board[i] = [];
      for (let j = 0; j < 10; j++) {
        board[i][j] = null;
      }
    }
  }

  function validatePlacement(row, col, length) {
    const colValidation = () => {
      if (col + length < 10) return false;
      for (let i = col; i < col + length; i++) {
        if (board[row][i] !== null) return false;
      }
      return true;
    };

    const rowValidation = () => {
      if (row + length < 10) return false;
      for (let i = row; i < row + length; i++) {
        if (board[i][col] !== null) return false;
      }
      return true;
    };

    return { colValid: colValidation(), rowValid: rowValidation() };
  }

  function placeShipHorizontal(row, col, ship) {
    for (let i = col; i < col + ship.length; i++) {
      board[row][i] = ship;
    }
    return true;
  }

  function placeShipVertical(row, col, ship) {
    for (let i = row; i < row + ship.length; i++) {
      board[i][col] = ship;
    }
    return true;
  }

  function placeShip(row, col, length, orientation) {
    const ship = new Ship(length);

    const { colValid, rowValid } = validatePlacement(row, col, ship.length);

    if (orientation === "horizontal") {
      //if (!colValid) return false;
      placeShipHorizontal(row, col, ship);
      return true;
    }

    if (orientation === "vertical") {
      //if (!rowValid) return false;
      placeShipVertical(row, col, ship);
      return true;
    }
    return false;
  }

  function placeShipRandom() {}

  function receiveAttack(x, y) {
    /*
    const target = board[y][x];
    if (target) {
      target.ship.hit();
      target.ship.hits.push({ x, y });
      console.log(`Hit at ${x}, ${y}`);
    } else {
      board[y][x] = "miss";
      console.log(`Miss at ${x}, ${y}`);
    }
    */
  }

  const getBoard = () => board;

  function allShipsSunk() {}

  function clearBoard() {}

  // Return public methods and properties
  return { initializeBoard, placeShip, receiveAttack, getBoard, allShipsSunk };
}
