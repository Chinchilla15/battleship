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

  beforeAll(() => {
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

  test("should place a ship vertically on the board", () => {
    const length = 4;
    gameBoard.placeShip(0, 0, length, "vertical");
    const board = gameBoard.getBoard();
    for (let i = 0; i < length; i++) {
      expect(board[i][0]).not.toBeNull();
    }
  });

  test("should not place a ship outside of the board", () => {
    const result = gameBoard.placeShip(0, 8, 4, "horizontal");
  });
});
