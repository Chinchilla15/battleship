export default function Players(gameBoard) {
  const { allShots } = gameBoard;
  const { missedShots } = gameBoard;

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
    let row;
    let col;

    do {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
      // eslint-disable-next-line no-loop-func
    } while (allShots.some((shot) => shot.row === row && shot.col === col)); // Ensure AI does not attack the same cell twice and within bounds

    gameBoard.receiveAttack(row, col);
    const coordinates = [row, col];
    return { coordinates };
  }

  function playerAttack(row, col) {
    gameBoard.receiveAttack(row, col);
  }

  return { playersInfo, computerAttack, playerAttack };
}
