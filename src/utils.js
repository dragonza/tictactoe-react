export function checkWin(squares, player) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  const plays = squares.reduce(
    (a, e, i) => (e === player ? a.concat(i) : a),
    []
  );

  let gameWon;
  lines.forEach((row, i) => {
    if (row.every(cell => plays.includes(cell))) {
      gameWon = { index: i, player: player };
    }
  });
  return gameWon;
}

export function minimax(newBoard, player, human, aiPlayer) {
  const emptyIndexes = newBoard.filter(cell => typeof cell === "number");
  if (checkWin(newBoard, human)) {
    return { score: -10 };
  } else if (checkWin(newBoard, aiPlayer)) {
    return { score: 10 };
  } else if (emptyIndexes.length === 0) {
    return { score: 0 };
  }
  let moves = [];
  for (let i = 0; i < emptyIndexes.length; i++) {
    let move = {};
    move.index = newBoard[emptyIndexes[i]];
    newBoard[emptyIndexes[i]] = player;

    if (player === aiPlayer) {
      let result = minimax(newBoard, human, human, aiPlayer);
      move.score = result.score;
    } else {
      let result = minimax(newBoard, aiPlayer, human, aiPlayer);
      move.score = result.score;
    }

    newBoard[emptyIndexes[i]] = move.index;

    moves.push(move);
  }

  let bestMove;
  if (player === aiPlayer) {
    let bestScore = -10000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    let bestScore = 10000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}

export function checkTie(board) {
  const emptySpots = board.filter(cell => typeof cell === "number");
  return emptySpots.length === 0;
}
