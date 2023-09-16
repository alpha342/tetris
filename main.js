window.onload = function () {
  init();
  draw();
};

function init() {
  canvas = document.getElementById('board');
  ctx = canvas.getContext('2d');

  ctx.canvas.width = COLS * BLOCK_SIZE;
  ctx.canvas.height = ROWS * BLOCK_SIZE;
  ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
  spawnGrid();
}

function draw() {
  spawnBlock();
  setInterval(() => {
    reset();
    drawBlock();
  }, 1);
}

function spawnGrid() {
  grid = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
}

function reset() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 10, 20);
  grid.forEach((row, y) => {
    ctx.fillStyle = 'black';
    row.forEach((value, x) => {
      if (value >= 1) {
        if (value == 1) ctx.fillStyle = 'red';
        if (value == 2) ctx.fillStyle = 'orange';
        if (value == 3) ctx.fillStyle = 'gold';
        if (value == 4) ctx.fillStyle = 'green';
        if (value == 5) ctx.fillStyle = 'aqua';
        if (value == 6) ctx.fillStyle = 'blue';
        if (value == 7) ctx.fillStyle = 'darkviolet';
        ctx.fillRect(x, y, 1, 1);
        ctx.fillStyle = 'black';
      }
    });
  });
}

http: function spawnBlock() {
  ran = Math.floor(Math.random() * 7 + 1);
  switch (ran) {
    case 1:
      block = OBLOCK;
      color = 'gold';
      break;
    case 2:
      block = IBLOCK;
      color = 'aqua';
      break;
    case 3:
      block = JBLOCK;
      color = 'blue';
      break;
    case 4:
      block = LBLOCK;
      color = 'orange';
      break;
    case 5:
      block = SBLOCK;
      color = 'green';
      break;
    case 6:
      block = ZBLOCK;
      color = 'red';
      break;
    case 7:
      block = TBLOCK;
      color = 'darkviolet';
      break;
  }

  ctx.fillStyle = color;
  block.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value == 1) {
        ctx.fillRect(x + 3, y - 2, 1, 1);
      }
    });
  });
}

function drawBlock() {
  let g = Math.floor(gravity);
  ctx.fillStyle = color;
  block.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value >= 1) {
        ctx.fillRect(x + 3, y - 2 + g, 1, 1);
        if (yPos <= y + g - 2) yPos = y + g - 2;
        if (yPos == 19) {
          grid[y + g - 2][x + 3] = value;
        }
      }
    });
  });
  if (yPos == 19) {
    canMove = false;
    stoppedTime += 1;
  }
  if (stoppedTime == 100 /*800 */) {
    yPos = 0;
    canMove = true;
    stoppedTime = 0;
    gravity = 0;
    spawnBlock();
  }
  if (canMove) gravity += 0.05 /*0.004 */;
}

function start() {
  canMove = !canMove;
}
