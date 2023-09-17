window.onload = function () {
  init();
  draw();
};

function init() {
  grid = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  newGrid = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  canvas = document.getElementById('board');
  ctx = canvas.getContext('2d');
  gravity = 0;
  canMove = true;
  pause = false;
  yPos = 0;
  stoppedTime = 0;

  ctx.canvas.width = COLS * BLOCK_SIZE;
  ctx.canvas.height = ROWS * BLOCK_SIZE;
  ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
}

function draw() {
  resetGrid();
  spawnBlock();
  setInterval(() => {
    resetGrid();
    fallingBlock();
    drawBlock();
  }, 250);
  setInterval(() => {
    location.reload(true);
  }, 60000);
}

function resetGrid() {
  newGrid.forEach((arr, y) => {
    arr.forEach((num, x) => {
      grid[y][x] = num;
    });
  });
  ctx.fillStyle = 'white';
  grid.forEach((arr, y) => {
    arr.forEach((num, x) => {
      if (num == 0) {
        ctx.fillRect(x, y, 1, 1);
      }
    });
  });
}

function spawnBlock() {
  let ran = Math.floor(Math.random() * 7 + 1);
  if (ran == 1) {
    block = ZBLOCK;
    color = 'red';
  }
  if (ran == 2) {
    block = LBLOCK;
    color = 'orange';
  }
  if (ran == 3) {
    block = OBLOCK;
    color = 'gold';
  }
  if (ran == 4) {
    block = SBLOCK;
    color = 'green';
  }
  if (ran == 5) {
    block = IBLOCK;
    color = 'aqua';
  }
  if (ran == 6) {
    block = JBLOCK;
    color = 'blue';
  }
  if (ran == 7) {
    block = TBLOCK;
    color = 'darkviolet';
  }
  block.forEach((arr, y) => {
    arr.forEach((num, x) => {
      if (num > 0 && y - 2 >= 0) {
        grid[y - 2][x + 3] = num;
      }
    });
  });
}

function fallingBlock() {
  if (!pause && canMove && yPos <= 18) gravity += 1;
  let g = Math.floor(gravity);
  block.forEach((arr, y) => {
    arr.forEach((num, x) => {
      if (num > 0 && y + g - 2 >= 0) {
        grid[y + g - 2][x + 3] = num;
        if (yPos <= y + g - 2) yPos = y + g - 2;
        if (yPos != 19 && grid[yPos + 1][x + 3] != 0) canMove = false;
      }
    });
  });
  if (stoppedTime == 4) {
    canMove = true;
    yPos = 0;
    stoppedTime = 0;
    gravity = 0;
    grid.forEach((arr, y) => {
      arr.forEach((num, x) => {
        newGrid[y][x] = num;
      });
    });
    spawnBlock();
  }
  if (yPos == 19) canMove = false;
  if (!canMove) stoppedTime += 1;
}

function drawBlock() {
  grid.forEach((arr, y) => {
    arr.forEach((num, x) => {
      if (num > 0) {
        if (num == 1) color = 'red';
        if (num == 2) color = 'orange';
        if (num == 3) color = 'gold';
        if (num == 4) color = 'green';
        if (num == 5) color = 'aqua';
        if (num == 6) color = 'blue';
        if (num == 7) color = 'darkviolet';

        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);
      }
    });
  });
}

function start() {
  pause = !pause;
}
