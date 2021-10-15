// This uses the canvas element new with HTML5, which allows us to create and use 2D shapes with ease.
const canvas = document.getElementById("board");

// Then in the JavaScript code, call HTMLCanvasElement.getContext() to get a drawing context and start // drawing onto the canvas:
const ctx = canvas.getContext("2d");

// Calculate size of canvas from constants.
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

// Scale blocks
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

// calls board class and creates a new board, using ctx values:
function play() {
  board = new Board(ctx);
  console.table(board);
}
