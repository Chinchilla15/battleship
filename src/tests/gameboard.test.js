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

describe("receiveAttack() Functionality", () => {
  let gameBoard = GameBoard();

  beforeEach(() => {
    gameBoard.initializeBoard();
    gameBoard.placeShip(0, 0, 3, "vertical");
  });

  test("Ship gets a hit and the counter hit counter is updated", () => {
    let ship = gameBoard.getBoard()[0][0];
    expect(ship.hits).toBe(0);

    gameBoard.receiveAttack(0, 0);

    expect(ship.hits).toBe(1);
  });

  test("Gameboard keeps track of missed shots", () => {
    gameBoard.receiveAttack(0, 1);
    let missedShot = gameBoard.getBoard()[0][1];

    expect(gameBoard.missedShots.length).toBe(1);
    expect(missedShot).not.toBeNull();
  });

  test("Ship updates sunk property after receiveing the 3 hits", () => {
    let ship = gameBoard.getBoard()[0][0];

    gameBoard.receiveAttack(0, 0);
    gameBoard.receiveAttack(1, 0);
    gameBoard.receiveAttack(2, 0);

    expect(ship.hits).toBe(3);
    expect(ship.sunk).toBeTruthy();
  });
});

describe("allShipsSunk() Functionality", () => {
  const gameBoard = GameBoard();
  beforeEach(() => {
    gameBoard.initializeBoard();
  });

  test("All ships are sunk", () => {
    // Place all ships and receive attacks on each ship until they are all sunk
    gameBoard.placeShip(4, 4, 1, "vertical");
    gameBoard.placeShip(8, 8, 1, "vertical");
    gameBoard.placeShip(6, 1, 2, "horizontal");
    gameBoard.placeShip(0, 0, 3, "vertical");
    gameBoard.placeShip(0, 9, 3, "vertical");
    gameBoard.placeShip(5, 5, 4, "horizontal");
    gameBoard.placeShip(8, 1, 5, "horizontal");
    gameBoard.receiveAttack(0, 0);
    gameBoard.receiveAttack(1, 0);
    gameBoard.receiveAttack(2, 0);
    gameBoard.receiveAttack(0, 9);
    gameBoard.receiveAttack(1, 9);
    gameBoard.receiveAttack(2, 9);
    gameBoard.receiveAttack(4, 4);
    gameBoard.receiveAttack(8, 8);
    gameBoard.receiveAttack(5, 5);
    gameBoard.receiveAttack(5, 6);
    gameBoard.receiveAttack(5, 7);
    gameBoard.receiveAttack(5, 8);
    gameBoard.receiveAttack(6, 1);
    gameBoard.receiveAttack(6, 2);
    gameBoard.receiveAttack(8, 1);
    gameBoard.receiveAttack(8, 2);
    gameBoard.receiveAttack(8, 3);
    gameBoard.receiveAttack(8, 4);
    gameBoard.receiveAttack(8, 5);

    expect(gameBoard.allShipsSunk()).toBeTruthy();
  });

  test("Some ships are sunk", () => {
    // Place some ships and receive attacks only on part of them
    gameBoard.placeShip(0, 0, 1, "vertical");
    gameBoard.placeShip(0, 1, 1, "vertical");
    gameBoard.placeShip(0, 2, 2, "vertical");
    gameBoard.placeShip(0, 3, 3, "vertical");
    gameBoard.placeShip(0, 4, 3, "vertical");
    gameBoard.receiveAttack(0, 0);
    gameBoard.receiveAttack(0, 1);
    gameBoard.receiveAttack(0, 2);
    gameBoard.receiveAttack(1, 2);

    expect(gameBoard.allShipsSunk()).toBeFalsy();
  });

  test("No ships are sunk", () => {
    // No attacks were received
    gameBoard.placeShip(0, 0, 1, "vertical");
    gameBoard.placeShip(0, 1, 1, "vertical");
    gameBoard.placeShip(0, 2, 2, "vertical");
    gameBoard.placeShip(0, 3, 3, "vertical");
    gameBoard.placeShip(0, 4, 3, "vertical");
    gameBoard.placeShip(0, 5, 4, "vertical");
    gameBoard.placeShip(0, 6, 5, "vertical");

    expect(gameBoard.allShipsSunk()).toBeFalsy();
  });
});
