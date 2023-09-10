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
  drawGrid();
}

function drawGrid() {
  ctx.strokeStyle = '#ddd';
  ctx.lineWidth = 0.05;

  for (var i = 1; i < COLS; i++) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, ROWS);
    ctx.stroke();
  }
  for (var i = 1; i < ROWS; i++) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(COLS, i);
    ctx.stroke();
  }
}

function resetBoard() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, COLS, ROWS);
  drawGrid();
}

function start() {
  spawnGrid();
  spawnBlock();
  setInterval(() => {
    resetBoard();
    drawBlock();
  }, 1);
}

function spawnGrid() {
  grid = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
}

function spawnBlock() {
  ran = Math.floor(Math.random() * 7 + 1);
  switch (ran) {
    case 1:
      block = OBLOCK;
      color = 'yellow';
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
  block.forEach((arr, y) => {
    arr.forEach((num, x) => {
      if (num == 1) {
        ctx.fillRect(x + 3, y - 2, 1, 1);
      }
    });
  });
}

function drawBlock() {
  let g = Math.floor(gravity);
  ctx.fillStyle = color;
  block.forEach((arr, y) => {
    arr.forEach((num, x) => {
      if (num == 1) {
        ctx.fillRect(x + 3, y + g - 2, 1, 1);
      }
    });
  });
  gravity += 0.005;
}

function move() {}
