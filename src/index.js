import Ship from "./modules/ship";
import GameBoard from "./modules/gameboard";

const gameboard = GameBoard();
gameboard.initializeBoard();
console.log(gameboard.getBoard());
gameboard.placeShip(0, 0, 3, "vertical");
console.log(gameboard.getBoard());
gameboard.placeShip(4, 2, 4, "horizontal");
console.log(gameboard.getBoard());
gameboard.placeShip(1, 0, 5, "vertical");
console.log(gameboard.getBoard());
