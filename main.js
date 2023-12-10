import { createDiv, updateBlock, cellAt, setCellStyle } from './utils.js';
const COLS = 10;
const ROWS = 22;

const board = document.querySelector('.game-board');
let boardState = Array.from({ length: ROWS }, () => Array(COLS).fill(0));

let row = -1;
let col = 3;

let curBlock;
let bag = [];
let stop = false;

const blocks = [
  {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    color: '#ef4e69',
    rotateState: 0,
  },
  {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: '#f78828',
    rotateState: 0,
  },
  {
    shape: [
      [0, 1, 1, 0],
      [0, 1, 1, 0],
    ],
    color: '#fad03d',
    rotateState: 0,
  },
  {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    color: '#52b84f',
    rotateState: 0,
  },
  {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: '#58d0f5',
    rotateState: 0,
  },
  {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: '#3398f4',
    rotateState: 0,
  },
  {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: '#d556eb',
    rotateState: 0,
  },
];

function createBoard() {
  for (let r = 0; r < ROWS; r++) {
    const rowDiv = createDiv('row');
    for (let c = 0; c < COLS; c++) {
      const cellDiv = createDiv('cell');
      rowDiv.appendChild(cellDiv);
    }
    board.appendChild(rowDiv);
  }
}

function drawDeadZoon() {
  for (let y = 0; y < 2; y++) {
    for (let x = 0; x < COLS; x++) {
      const cell = board.querySelectorAll('.row')[y].querySelectorAll('.cell')[x];
      if (cell.style.borderStyle != 'outset') cell.style.backgroundColor = 'darkgray';
    }
  }
}

function createBlock() {
  let ran = Math.floor(Math.random() * blocks.length); //0~6
  while (bag.includes(ran)) ran = Math.floor(Math.random() * blocks.length);

  bag.push(ran);
  if (bag.length == blocks.length) bag = [];

  return blocks[ran];
}

function spawnBlock() {
  col = 3;
  row = -1;
  curBlock = createBlock();
  for (let i = 0; i < curBlock.rotateState; i++) rotateBlock();
}

function drawBlock() {
  const { shape, color } = curBlock;

  updateBlock(shape, (x, y) => {
    if (shape[y][x] !== 0 && y + row >= 0) {
      const cell = cellAt(x + col, y + row);
      setCellStyle(cell, color, 'outset');
    }
  });
}

function eraseBlock() {
  const { shape } = curBlock;

  updateBlock(shape, (x, y) => {
    if (shape[y][x] !== 0 && y + row >= 0) {
      boardState[y + row][x + col] = 0;
      const cell = cellAt(x + col, y + row);
      setCellStyle(cell, 'white', 'inset');
    }
  });

  drawDeadZoon();
}

function moveCheck(direction) {
  const { shape } = curBlock;
  let canMove = true;
  let yOffset, xOffset;

  if (direction == 'down') {
    yOffset = 1;
    xOffset = 0;
  }
  if (direction == 'left') {
    yOffset = 0;
    xOffset = -1;
  }
  if (direction == 'right') {
    yOffset = 0;
    xOffset = 1;
  }

  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x] == 1) {
        let r = row + y + yOffset;
        let c = col + x + xOffset;

        if (row >= 0 && r >= ROWS && direction == 'down') canMove = false;
        else if (row >= -1 && boardState[r][c] == 1) canMove = false;
        else if (c < 0 || c > COLS - 1) canMove = false;

        if (direction == 'down' && canMove == false) {
          if (row == 0) location.reload();
          lockBlock();
          spawnBlock();
          canMove = true;
        }
      }
    }
  }
  return canMove;
}

function lockBlock() {
  const block = curBlock;
  const shape = block.shape;
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x] != 0 && y + row >= 0) {
        boardState[y + row][x + col] = 1;
      }
    }
  }
}

function moveBlock(direction) {
  if (direction == 'down' && moveCheck(direction)) {
    eraseBlock();
    row++;
    drawBlock();
  }
  if ((direction == 'left' || direction == 'right') && moveCheck(direction)) {
    eraseBlock();
    col += direction == 'left' ? -1 : 1;
    drawBlock();
  }
}

function rotateBlock() {
  const block = curBlock;
  const shape = block.shape;

  let arr = Array.from({ length: shape.length }, () => Array(shape.length).fill(0));
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      arr[y][x] = block.shape[-1 * x + shape.length - 1][y];
    }
  }
  eraseBlock();
  block.rotateState = (block.rotateState + 1) % 4;
  block.shape = arr;
  drawBlock();
}

function holdBlock() {
  eraseBlock();
  spawnBlock();
  row++;
  drawBlock();
}

function handleKeyDown(e) {
  if (e.key == 's') {
    stop = !stop;
  }
  if (e.key == 'r') {
    location.reload();
  }
  if (e.key == 'ArrowLeft') {
    moveBlock('left');
  }
  if (e.key == 'ArrowRight') {
    moveBlock('right');
  }
  if (e.key == 'ArrowDown') {
    moveBlock('down');
  }
  if (e.key == 'ArrowUp') {
    rotateBlock();
  }
  if (e.key == 'Shift') {
    holdBlock();
  }
}

createBoard();
spawnBlock();

setInterval(() => {
  if (!stop) moveBlock('down');
}, 500);

window.addEventListener('keydown', handleKeyDown);
