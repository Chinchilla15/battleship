export default function Players(gameBoard) {
  const playersInfo = [
    {
      name: "Player one",
      isAI: false,
      win: false,
    },
    {
      name: "Player two",
      isAI: true,
      win: false,
    },
  ];

  function computerAttack() {
    let row;
    let col;

    do {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
    } while (
      // eslint-disable-next-line no-loop-func
      gameBoard.allShots.some((shot) => shot.row === row && shot.col === col)
    ); // Ensure AI does not attack the same cell twice and within bounds

    gameBoard.receiveAttack(row, col);
    const coordinates = { row, col };
    return { coordinates };
  }

  function playerAttack(row, col) {
    gameBoard.receiveAttack(row, col);
  }

  return { playersInfo, computerAttack, playerAttack };
}
