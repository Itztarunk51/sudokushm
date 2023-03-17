class SudokuSolver {
  constructor(board) {
    this.board = board;
  }

  solve() {
    if (this.solveCell(0, 0)) {
      return this.board;
    } else {
      return null;
    }
  }

  solveCell(row, col) {
    if (row === 9) {
      row = 0;
      col += 1;
      if (col === 9) {
        return true;
      }
    }

    if (this.board[row][col] !== 0) {
      return this.solveCell(row + 1, col);
    }

    for (let value = 1; value <= 9; value++) {
      if (this.isValid(row, col, value)) {
        this.board[row][col] = value;
        if (this.solveCell(row + 1, col)) {
          return true;
        }
        this.board[row][col] = 0;
      }
    }

    return false;
  }

  isValid(row, col, value) {
    // Check row
    for (let i = 0; i < 9; i++) {
      if (this.board[row][i] === value) {
        return false;
      }
    }

    // Check column
    for (let i = 0; i < 9; i++) {
      if (this.board[i][col] === value) {
        return false;
      }
    }

    // Check box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;

    for (let i = boxRow; i < boxRow + 3; i++) {
      for (let j = boxCol; j < boxCol + 3; j++) {
        if (this.board[i][j] === value) {
          return false;
        }
      }
    }

    return true;
  }
}

export default SudokuSolver;
