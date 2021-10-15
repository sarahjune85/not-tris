// This uses the canvas element new with HTML5, which allows us to create and use 2D shapes with ease.
const canvas = document.getElementById("board");
// Get conext of canvas and draw a 2d thing on it:
const ctx = canvas.getContext("2d");

// Calculate size of canvas from constants.
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

// Scale blocks
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

const KEY = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  SPACE: 32,
};
Object.freeze(KEY);

moves = {
  [KEY.LEFT]: (p) => ({ ...p, x: p.x - 1 }),
  [KEY.RIGHT]: (p) => ({ ...p, x: p.x + 1 }),
  [KEY.DOWN]: (p) => ({ ...p, y: p.y + 1 }),
  [KEY.UP]: (p) => board.rotate(p),
  [KEY.SPACE]: (p) => ({ ...p, y: p.y + 1 }),
};

let requestId = null;

let board = new Board();

function handleKeyPress(event) {
  // Stop the event from bubbling.
  event.preventDefault();

  if (moves[event.keyCode]) {
    // Get new state of piece
    let p = moves[event.keyCode](board.piece);

    if (event.keyCode === KEY.SPACE) {
      // Hard drop
      while (board.valid(p)) {
        board.piece.move(p);
        p = moves[KEY.SPACE](board.piece);
      }
    }

    if (board.valid(p)) {
      board.piece.move(p);
    }
  }
}

// keypress event listeners:
function addEventListener() {
  document.removeEventListener("keydown", handleKeyPress);
  document.addEventListener("keydown", handleKeyPress);
}

// clears old shape location and redraws:
function draw() {
  const { width, height } = ctx.canvas;
  ctx.clearRect(0, 0, width, height);
  // to keep the drawings together we add the board’s draw method to our main draw function:
  board.draw();
  board.piece.draw();
}

function play() {
  board = new Board(ctx);
  addEventListener();
  // If we have an old game running then cancel it
  if (requestId) {
    cancelAnimationFrame(requestId);
  }
  // set the starting time with the performance.now() method, which returns a timestamp measured in milliseconds.
  time.start = performance.now();
  animate();
}

let time = { start: 0, elapsed: 0, level: 1000 };

// Game loop:
// To create our game loop, we use requestAnimationFrame. It tells the browser that we want to animate, and it should call a function to update an animation before the next repaint.
// Why should we use requestAnimationFrame instead of setInterval or setTimeout?
// It enables browser optimizations.
// It handles the frame rate.
// Animations only run when visible.
function animate(now = 0) {
  // Update elapsed time.
  time.elapsed = now - time.start;
  // If elapsed time has passed time for current level
  if (time.elapsed > time.level) {
    // Restart counting from now
    time.start = now;
    board.drop();
  }
  draw();
  requestId = requestAnimationFrame(animate);
}
