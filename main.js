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
}

function draw() {
  spawnBlock();
  setInterval(() => {
    reset();
    drawBlock();
  }, 1);
}

function reset() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 20, 40);
}

function spawnBlock() {
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
      color = 'greenyellow';
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
      if (value == 1) {
        ctx.fillRect(x + 3, y - 2 + g, 1, 1);
        if (yPos != y + g - 2) yPos = y + g - 2;
      }
    });
  });
  if (yPos == 19) {
    canMove = false;
    stoppedTime += 1;
  }
  if (stoppedTime == 250) {
    canMove = true;
    stoppedTime = 0;
    gravity = 0;
    spawnBlock();
  }
  if (canMove) gravity += 0.01;
}

function start() {
  canMove = !canMove;
}
