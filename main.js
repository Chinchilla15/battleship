/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => {
  // webpackBootstrap
  /******/ "use strict";
  /******/ var __webpack_modules__ = {
    /***/ "./src/index.js":
      /*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__,
      ) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/game */ "./src/modules/game.js");\n\n\nconst game = (0,_modules_game__WEBPACK_IMPORTED_MODULE_0__["default"])();\ngame.startGame();\n\n\n//# sourceURL=webpack://project-name-here/./src/index.js?',
        );

        /***/
      },

    /***/ "./src/modules/dom.js":
      /*!****************************!*\
  !*** ./src/modules/dom.js ***!
  \****************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__,
      ) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Dom: () => (/* binding */ Dom)\n/* harmony export */ });\nconst Dom = (() => {\n  function renderBoat(cell) {\n    cell.classList.add("ship");\n  }\n\n  function showAttack(cell) {\n    cell.classList.remove("ship");\n    cell.classList.add("hit");\n  }\n\n  function showMiss(cell) {\n    cell.classList.add("miss");\n  }\n\n  function updatePlayerOneBoard(gameBoard, containerId, coordinates) {\n    const container = document.getElementById(containerId);\n    const cells = container.querySelectorAll(".cell");\n    const { row } = coordinates;\n    const { col } = coordinates;\n    let shipSunk = null;\n\n    cells.forEach((cell) => {\n      const rowIndex = Number(cell.dataset.row);\n      const colIndex = Number(cell.dataset.col);\n      const cellData = gameBoard.getBoard()[rowIndex][colIndex];\n      if (cellData === false) {\n        showMiss(cell);\n      } else if (cellData && rowIndex === row && colIndex === col) {\n        showAttack(cell);\n        if (cellData.isSunk()) {\n          shipSunk = cellData;\n        }\n      }\n    });\n    // Find the sunk ship and add the sunk class\n    if (shipSunk !== null) {\n      cells.forEach((cell) => {\n        const rowIndex = cell.dataset.row;\n        const colIndex = cell.dataset.col;\n        const cellData = gameBoard.getBoard()[rowIndex][colIndex];\n\n        if (cellData === shipSunk) {\n          cell.classList.remove("hit");\n          cell.classList.add("sunk");\n        }\n      });\n    }\n  }\n\n  function updatePlayerTwoBoard(\n    gameBoard,\n    containerId,\n    clickedRow,\n    clickedCol,\n  ) {\n    const container = document.getElementById(containerId);\n    const cells = container.querySelectorAll(".cell");\n    let shipSunk = null; // Variable to keep track if a ship has been sunk\n\n    cells.forEach((cell) => {\n      const rowIndex = Number(cell.dataset.row);\n      const colIndex = Number(cell.dataset.col);\n      const cellData = gameBoard.getBoard()[rowIndex][colIndex];\n\n      if (cellData === false) {\n        showMiss(cell);\n      } else if (\n        cellData &&\n        rowIndex === clickedRow &&\n        colIndex === clickedCol\n      ) {\n        showAttack(cell);\n\n        if (cellData.isSunk()) {\n          shipSunk = cellData; // Mark that a ship has been sunk\n        }\n      }\n    });\n\n    // Find the sunk ship and add the sunk class\n    if (shipSunk !== null) {\n      cells.forEach((cell) => {\n        const rowIndex = cell.dataset.row;\n        const colIndex = cell.dataset.col;\n        const cellData = gameBoard.getBoard()[rowIndex][colIndex];\n\n        if (cellData === shipSunk) {\n          cell.classList.remove("hit");\n          cell.classList.add("sunk");\n        }\n      });\n    }\n  }\n\n  // Function to handle the logic when a cell is clicked\n  function cellClickHandler(event, gameBoard, containerId) {\n    const cellElement = event.target;\n    const rowData = Number(cellElement.dataset.row);\n    const colData = Number(cellElement.dataset.col);\n\n    gameBoard.receiveAttack(rowData, colData);\n\n    updatePlayerTwoBoard(gameBoard, containerId, rowData, colData);\n\n    cellElement.removeEventListener("click", cellElement.clickHandler);\n  }\n\n  function renderBoard(gameBoard, containerId, isPlayerTwoBoard) {\n    const container = document.getElementById(containerId);\n    container.innerHTML = "";\n\n    const board = gameBoard.getBoard();\n\n    board.forEach((row, rowIndex) => {\n      row.forEach((cell, colIndex) => {\n        const cellElement = document.createElement("div");\n        cellElement.className = "cell";\n        cellElement.dataset.row = rowIndex;\n        cellElement.dataset.col = colIndex;\n\n        if (cell) renderBoat(cellElement);\n\n        if (isPlayerTwoBoard) {\n          cellElement.clickHandler = (event) =>\n            cellClickHandler(event, gameBoard, containerId);\n\n          cellElement.addEventListener("click", cellElement.clickHandler);\n        }\n\n        container.appendChild(cellElement);\n      });\n    });\n  }\n\n  return {\n    renderBoard,\n    updatePlayerOneBoard,\n    updatePlayerTwoBoard,\n  };\n})();\n\n\n\n\n//# sourceURL=webpack://project-name-here/./src/modules/dom.js?',
        );

        /***/
      },

    /***/ "./src/modules/game.js":
      /*!*****************************!*\
  !*** ./src/modules/game.js ***!
  \*****************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__,
      ) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/modules/gameboard.js");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/modules/player.js");\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom */ "./src/modules/dom.js");\n\n\n\n\nfunction Game() {\n  const p2Board = document.getElementById("player-two-container");\n  const p2Container = document.getElementById("p2-container");\n  const randomBtn = document.getElementById("random-btn");\n  const playGameBtn = document.getElementById("play-game-btn");\n  const playAgainBtn = document.createElement("button");\n  const winnerMessage = document.getElementById("winner");\n\n  const playerOneBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])();\n  const playerTwoBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])();\n\n  const playerOne = (0,_player__WEBPACK_IMPORTED_MODULE_1__["default"])(playerTwoBoard);\n  const playerTwo = (0,_player__WEBPACK_IMPORTED_MODULE_1__["default"])(playerOneBoard);\n\n  const players = [playerOne, playerTwo];\n\n  let activePlayerIndex = 0; // Start with player one\n\n  let activePlayer = players[activePlayerIndex].playersInfo[activePlayerIndex];\n\n  function switchPlayer() {\n    activePlayerIndex = activePlayerIndex === 0 ? 1 : 0;\n    activePlayer = players[activePlayerIndex].playersInfo[activePlayerIndex];\n  }\n\n  function restartPlayer() {\n    activePlayerIndex = activePlayerIndex === 1 ? 0 : 0;\n    activePlayer = players[activePlayerIndex].playersInfo[activePlayerIndex];\n  }\n\n  function initializeGame() {\n    playerOneBoard.initializeBoard();\n    playerTwoBoard.initializeBoard();\n  }\n\n  function renderBoards() {\n    _dom__WEBPACK_IMPORTED_MODULE_2__.Dom.renderBoard(playerOneBoard, "player-one-container", false);\n    _dom__WEBPACK_IMPORTED_MODULE_2__.Dom.renderBoard(playerTwoBoard, "player-two-container", true);\n  }\n\n  function attackPlayerOneBoard() {\n    const attackCoordinates = playerTwo.computerAttack().coordinates;\n    _dom__WEBPACK_IMPORTED_MODULE_2__.Dom.updatePlayerOneBoard(\n      playerOneBoard,\n      "player-one-container",\n      attackCoordinates,\n    );\n  }\n\n  function addPlayAgainBtn() {\n    const btnsContainer = document.getElementById("buttons-container");\n\n    playAgainBtn.style.display = "block";\n    playAgainBtn.setAttribute("title", "Play Again");\n    playAgainBtn.innerHTML = "<i class=\\"fa-solid fa-repeat fa-2xl \\"></i>";\n    btnsContainer.appendChild(playAgainBtn);\n  }\n\n  function playGame() {\n    while (\n      activePlayer.isAI === true &&\n      !playerOne.playersInfo[0].win &&\n      !playerTwo.playersInfo[1].win\n    ) {\n      setTimeout(() => {\n        try {\n          attackPlayerOneBoard();\n        } catch (err) {\n          console.log(err);\n        }\n      }, 0);\n\n      switchPlayer();\n\n      if (playerOneBoard.allShipsSunk()) {\n        playerTwo.playersInfo[1].win = true;\n        winnerMessage.innerHTML = `${playerTwo.playersInfo[1].name} wins!`;\n        p2Board.style.pointerEvents = "none";\n\n        addPlayAgainBtn();\n      }\n      if (playerTwoBoard.allShipsSunk()) {\n        playerOne.playersInfo[0].win = true;\n        p2Board.style.pointerEvents = "none";\n        winnerMessage.innerHTML = `${playerOne.playersInfo[0].name} wins!`;\n\n        addPlayAgainBtn();\n      }\n    }\n  }\n\n  function startGame() {\n    initializeGame();\n    renderBoards();\n    p2Container.style.display = "none";\n    playGameBtn.disabled = true;\n    playGameBtn.style.pointerEvents = "none";\n  }\n\n  function handlePlayerTwoBoardClick() {\n    switchPlayer();\n    playGame();\n  }\n\n  randomBtn.addEventListener("click", () => {\n    playerOneBoard.placeShipRandom();\n    _dom__WEBPACK_IMPORTED_MODULE_2__.Dom.renderBoard(playerOneBoard, "player-one-container", false);\n\n    playGameBtn.style.pointerEvents = "auto";\n    playGameBtn.disabled = false;\n  });\n\n  playGameBtn.addEventListener("click", () => {\n    // playGame();\n\n    playerTwoBoard.placeShipRandom();\n    p2Container.style.display = "flex";\n\n    randomBtn.style.display = "none";\n    playGameBtn.style.display = "none";\n    playAgainBtn.style.display = "none";\n\n    p2Board.style.pointerEvents = "auto";\n    winnerMessage.innerHTML = "";\n\n    p2Board.addEventListener("click", handlePlayerTwoBoardClick);\n  });\n\n  playAgainBtn.addEventListener("click", () => {\n    playerOne.playersInfo[0].win = false;\n    playerTwo.playersInfo[1].win = false;\n\n    restartPlayer();\n    startGame();\n\n    randomBtn.style.display = "block";\n    playGameBtn.style.display = "block";\n    playAgainBtn.style.display = "none";\n\n    winnerMessage.innerHTML = "";\n\n    p2Board.removeEventListener("click", handlePlayerTwoBoardClick);\n  });\n\n  return {\n    startGame,\n    playGame,\n  };\n}\n\n\n//# sourceURL=webpack://project-name-here/./src/modules/game.js?',
        );

        /***/
      },

    /***/ "./src/modules/gameboard.js":
      /*!**********************************!*\
  !*** ./src/modules/gameboard.js ***!
  \**********************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__,
      ) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ GameBoard)\n/* harmony export */ });\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/modules/ship.js");\n\n\nfunction GameBoard() {\n  const board = [];\n  const missedShots = [];\n  const allShots = [];\n\n  function initializeBoard() {\n    for (let i = 0; i < 10; i++) {\n      board[i] = [];\n      for (let j = 0; j < 10; j++) {\n        board[i][j] = null;\n      }\n    }\n  }\n\n  function validatePlacement(row, col, length, orientation) {\n    if (orientation === "horizontal") {\n      if (col + length > 10) return false;\n      for (let i = col; i < col + length; i++) {\n        if (board[row][i] !== null) return false;\n      }\n    } else if (orientation === "vertical") {\n      if (row + length > 10) return false;\n      for (let i = row; i < row + length; i++) {\n        if (board[i][col] !== null) return false;\n      }\n    }\n    return true;\n  }\n\n  function placeShipHorizontal(row, col, ship) {\n    for (let i = col; i < col + ship.length; i++) {\n      board[row][i] = ship;\n    }\n    // return true;\n  }\n\n  function placeShipVertical(row, col, ship) {\n    for (let i = row; i < row + ship.length; i++) {\n      board[i][col] = ship;\n    }\n    // return true;\n  }\n\n  function placeShip(row, col, length, orientation) {\n    const ship = new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](length);\n\n    if (!validatePlacement(row, col, length, orientation)) {\n      throw new Error(\n        "Invalid placement: either out of bounds or overlapping with another ship.",\n      );\n    }\n\n    if (orientation === "horizontal") {\n      placeShipHorizontal(row, col, ship);\n      // return true;\n    } else if (orientation === "vertical") {\n      placeShipVertical(row, col, ship);\n    }\n\n    return false;\n  }\n\n  function placeShipRandom() {\n    const shipLengths = [1, 1, 2, 3, 3, 4, 5];\n    initializeBoard();\n\n    shipLengths.forEach((length) => {\n      let placed = false;\n\n      while (!placed) {\n        const row = Math.floor(Math.random() * 10);\n        const col = Math.floor(Math.random() * 10);\n        const orientation = Math.random() < 0.5 ? "horizontal" : "vertical";\n\n        if (validatePlacement(row, col, length, orientation)) {\n          placeShip(row, col, length, orientation);\n          placed = true;\n        }\n      }\n    });\n  }\n\n  function receiveAttack(row, col) {\n    const target = board[row][col];\n    allShots.push({ row, col });\n\n    if (target === null) {\n      board[row][col] = false; // CHANGE THIS ONCE THE UI IS READY\n      missedShots.push({ row, col });\n      return false;\n    }\n    if (target.hits < target.length) {\n      target.hit();\n      return true;\n    }\n    console.error("Cannot hit target: Cell has already been targeted");\n    return false;\n  }\n  // console.log(missedShots);\n\n  const getBoard = () => board;\n\n  function allShipsSunk() {\n    // eslint-disable-next-line no-shadow\n    const board = getBoard();\n    const shipLengths = [1, 1, 2, 3, 3, 4, 5];\n\n    // Initialize an object to track the sunk status of each ship length\n    const sunkShips = Object.fromEntries(\n      shipLengths.map((length) => [length, false]),\n    );\n\n    for (let i = 0; i < board.length; i++) {\n      for (let j = 0; j < board[i].length; j++) {\n        const cell = board[i][j];\n        if (cell !== null && cell.sunk) {\n          sunkShips[cell.length] = true;\n        }\n      }\n    }\n\n    // Check if all ships of each length are sunk\n    // console.log(Object.values(sunkShips)); CHECK ON THIS\n    return Object.values(sunkShips).every((sunk) => sunk);\n  }\n\n  return {\n    initializeBoard,\n    placeShip,\n    receiveAttack,\n    getBoard,\n    allShipsSunk,\n    placeShipRandom,\n    missedShots,\n    allShots,\n  };\n}\n\n\n//# sourceURL=webpack://project-name-here/./src/modules/gameboard.js?',
        );

        /***/
      },

    /***/ "./src/modules/player.js":
      /*!*******************************!*\
  !*** ./src/modules/player.js ***!
  \*******************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__,
      ) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ Players)\n/* harmony export */ });\nfunction Players(gameBoard) {\n  const playersInfo = [\n    {\n      name: "Player one",\n      isAI: false,\n      win: false,\n    },\n    {\n      name: "Player two",\n      isAI: true,\n      win: false,\n    },\n  ];\n\n  function computerAttack() {\n    let row;\n    let col;\n\n    do {\n      row = Math.floor(Math.random() * 10);\n      col = Math.floor(Math.random() * 10);\n    } while (\n      // eslint-disable-next-line no-loop-func\n      gameBoard.allShots.some((shot) => shot.row === row && shot.col === col)\n    ); // Ensure AI does not attack the same cell twice and within bounds\n\n    gameBoard.receiveAttack(row, col);\n    const coordinates = { row, col };\n    return { coordinates };\n  }\n\n  function playerAttack(row, col) {\n    gameBoard.receiveAttack(row, col);\n  }\n\n  return { playersInfo, computerAttack, playerAttack };\n}\n\n\n//# sourceURL=webpack://project-name-here/./src/modules/player.js?',
        );

        /***/
      },

    /***/ "./src/modules/ship.js":
      /*!*****************************!*\
  !*** ./src/modules/ship.js ***!
  \*****************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__,
      ) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ Ship)\n/* harmony export */ });\n/* eslint-disable no-param-reassign */\nfunction Ship(length) {\n  this.length = length;\n  this.hits = 0;\n  this.sunk = false;\n\n  function hit() {\n    this.hits += 1;\n    this.isSunk();\n  }\n\n  function isSunk() {\n    if (this.length === this.hits) {\n      this.sunk = true;\n      return true;\n    }\n    return false;\n  }\n\n  return {\n    length,\n    hits: this.hits,\n    sunk: this.sunk,\n    hit,\n    isSunk,\n  };\n}\n\n\n//# sourceURL=webpack://project-name-here/./src/modules/ship.js?',
        );

        /***/
      },

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId](
      module,
      module.exports,
      __webpack_require__,
    );
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/define property getters */
  /******/ (() => {
    /******/ // define getter functions for harmony exports
    /******/ __webpack_require__.d = (exports, definition) => {
      /******/ for (var key in definition) {
        /******/ if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          /******/ Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/ (() => {
    /******/ __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop);
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/make namespace object */
  /******/ (() => {
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = (exports) => {
      /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, {
          value: "Module",
        });
        /******/
      }
      /******/ Object.defineProperty(exports, "__esModule", { value: true });
      /******/
    };
    /******/
  })();
  /******/
  /************************************************************************/
  /******/
  /******/ // startup
  /******/ // Load entry module and return exports
  /******/ // This entry module can't be inlined because the eval devtool is used.
  /******/ var __webpack_exports__ = __webpack_require__("./src/index.js");
  /******/
  /******/
})();
