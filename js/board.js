// class creates a new instance of Board and a new instance of Piece every time a new piece enters the game.
// board references canvas every time game starts (ctx) - sends canvas context to board:
class Board {
  constructor(ctx) {
    this.ctx = ctx;
    this.grid = this.getEmptyBoard();
    this.piece = new Piece(ctx);
  }

  // Get matrix filled with zeros.
  getEmptyBoard() {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  }

  // piece rotator:
  rotate(piece) {
    // Clone with JSON - stringify() method converts the matrix to a JSON string, and the
    // return parse() method parses the JSON string back to an object, cloning our matrix in the process
    let p = JSON.parse(JSON.stringify(piece));

    // Transpose matrix, p is the Piece
    for (let y = 0; y < p.shape.length; ++y) {
      for (let x = 0; x < y; ++x) {
        [p.shape[x][y], p.shape[y][x]] = [p.shape[y][x], p.shape[x][y]];
      }
    }
    // Reverse the order of the columns.
    p.shape.forEach((row) => row.reverse());

    return p;
  }

  // checks if the new position is valid and returns a Boolean.
  // dx and dy represent the coordinates of the 4x4 grid of the piece:
  // make sure that we don’t collide with frozen tetrominoes on the board. We can do this by checking that the cell is zero:
  valid(p) {
    return p.shape.every((row, dy) => {
      return row.every((value, dx) => {
        let x = p.x + dx;
        let y = p.y + dy;
        return value === 0 || (this.isInsideWalls(x, y) && this.isNotOccupied(x, y));
      });
    });
  }

  isNotOccupied(x, y) {
    return this.grid[y] && this.grid[y][x] === 0;
  }

  // stops piece inside boundaries:
  isInsideWalls(x, y) {
    return (
      x >= 0 && // Left wall
      x < COLS && // Right wall
      y < ROWS // Floor
    );
  }

  // if no valid down move - call freeze() before spawning a new tetromino:
  drop() {
    let p = moves[KEY.DOWN](this.piece);

    if (this.valid(p)) {
      this.piece.move(p);
    } else {
      this.freeze();
      this.piece = new Piece(this.ctx);
    }
  }

  // When the piece has no more valid moves downwards, it lands on its final resting place and moves over to the matrix (grid).
  freeze() {
    this.piece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.grid[y + this.piece.y][x + this.piece.x] = value;
        }
      });
    });
  }

  //method that draws the board with the landed pieces on it:
  draw() {
    this.grid.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.ctx.fillStyle = COLORS[value - 1];
          this.ctx.fillRect(x, y, 1, 1);
        }
      });
    });
  }
}
