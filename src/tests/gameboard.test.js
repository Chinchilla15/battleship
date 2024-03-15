import GameBoard from "../modules/gameboard";

describe("Initialize Board", () => {
  test("Should initialize board filled with null values", () => {
    const gameboard = GameBoard();
    gameboard.initializeBoard();
    const board = gameboard.getBoard();
    expect(board.length).toBe(10);
    board.forEach((row) => {
      expect(row.length).toBe(10);
      row.forEach((cell) => {
        expect(cell).toBeNull();
      });
    });
  });
});

describe("placeShip functionality", () => {
  let gameBoard;

  beforeEach(() => {
    gameBoard = GameBoard();
    gameBoard.initializeBoard();
  });

  test("Place ship horizontally on the board", () => {
    const length = 3;
    gameBoard.placeShip(0, 0, length, "horizontal");
    const board = gameBoard.getBoard();
    for (let i = 0; i < length; i++) {
      expect(board[0][i]).not.toBeNull();
    }
  });

  test("Should place a ship vertically on the board", () => {
    const length = 4;
    gameBoard.placeShip(0, 0, length, "vertical");
    const board = gameBoard.getBoard();
    for (let i = 0; i < length; i++) {
      expect(board[i][0]).not.toBeNull();
    }
  });

  test("should not place a ship outside of the board", () => {
    expect(() => {
      gameBoard.placeShip(0, 8, 4, "horizontal");
    }).toThrow(
      "Invalid placement: either out of bounds or overlapping with another ship.",
    );
  });
});

test("Verify all ships are added on the board when placed randomly", () => {
  let gameBoard = GameBoard();

  gameBoard.placeShipRandom();
  const board = gameBoard.getBoard();

  // Total length of all ships expected to be placed
  const totalShipLength = [1, 1, 2, 3, 3, 4, 5].reduce((a, b) => a + b, 0);

  // Calculate total ship segments present on the board
  let actualShipSegments = 0;
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      if (board[row][col] !== null) actualShipSegments++;
    }
  }

  // Verify the total number of ship segments matches the expected total
  expect(actualShipSegments).toBe(totalShipLength);
});
