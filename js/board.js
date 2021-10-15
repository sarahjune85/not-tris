// create a new instance of Board and a new instance of Piece every time a new piece enters the game,
// using a class:

// board references canvas every time game starts (ctx):

class Board {
  constructor(ctx) {
    this.ctx = ctx;
  }

  // fill empty cells with 0 and occupied cells with integers of 1-7 to represent colors:
  getEmptyBoard() {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  }
}
