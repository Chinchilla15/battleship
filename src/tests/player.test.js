/* eslint-disable no-undef */
import Players from "../modules/player";
import GameBoard from "../modules/gameboard";

describe("Player module functionality ", () => {
  let gameBoard;
  let player;

  beforeEach(() => {
    gameBoard = GameBoard();
    player = Players(gameBoard);
    gameBoard.initializeBoard();
  });

  test("AI attacks proper gameboard", () => {
    player.computerAttack();

    const board = gameBoard.getBoard();

    expect(board.length).toBe(10);
    board.forEach((row) => {
      expect(row.length).toBe(10);
      row.forEach((cell) => {
        if (cell !== null) {
          expect(cell).toBeFalsy();
        }
      });
    });
  });

  test("AI does not hit the same cell twice", () => {
    const attackCoordinates = new Set();
    const totalAttacks = 100; // Simulating the 100 possible attacks
    for (let i = 0; i < totalAttacks; i++) {
      player.computerAttack();
    }

    const { allShots } = gameBoard;
    allShots.forEach(({ row, col }) => {
      const coordString = `${row},${col}`;
      attackCoordinates.add(coordString);
    });

    // allShots include every shot (hit or miss),
    // its length should equal the unique attackCoordinates size
    expect(attackCoordinates.size).toBe(allShots.length);
  });
});
