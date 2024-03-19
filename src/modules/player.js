export default function Players(gameBoard) {
  let getAllShots = gameBoard.allShots;
  let getMissedShots = gameBoard.missedShots;

  const playersInfo = [
    {
      name: "Player one",
      isAI: false,
      turn: true,
      win: false,
    },
    {
      name: "Player two",
      isAI: true,
      turn: false,
      win: false,
    },
  ];

  function computerAttack() {
    let row, col;

    do {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
    } while (getAllShots.some((shot) => shot.row === row && shot.col === col)); // Ensure AI does not attack the same cell twice and within bounds

    gameBoard.receiveAttack(row, col);
  }

  function playerAttack(row, col) {
    gameBoard.receiveAttack(row, col);
  }

  return { playersInfo, computerAttack, playerAttack };
}
