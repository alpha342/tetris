import { createDiv, updateBlock, cellAt, setCellStyle } from './utils.js';

const holdBoard = document.querySelector('#hold-board');
let BOARD_LENGTH = 4;

let holdBlock = null;

function createHoldBoard() {
  for (let r = 0; r < BOARD_LENGTH; r++) {
    const rowDiv = createDiv('row');
    for (let c = 0; c < BOARD_LENGTH; c++) {
      const cellDiv = createDiv('cell');
      rowDiv.appendChild(cellDiv);
    }
    holdBoard.appendChild(rowDiv);
  }
}

export function drawHoldBlock(shape, color) {
  for (let y = 0; y < BOARD_LENGTH; y++) {
    for (let x = 0; x < BOARD_LENGTH; x++) {
      const cell = cellAt(holdBoard, x, y);
      setCellStyle(cell, 'white');
    }
  }

  updateBlock(shape, (x, y) => {
    if (shape[y][x] != 0) {
      const cell = cellAt(holdBoard, x, y + 1);
      setCellStyle(cell, color);
    }
  });
}

createHoldBoard();
