export function createDiv(className) {
  const div = document.createElement('div');
  div.classList.add(className);
  return div;
}

export function updateBlock(shape, action) {
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      action(x, y);
    }
  }
}

export function cellAt(targetBoard, x, y) {
  const board = targetBoard;
  const cell = board.querySelectorAll('.row')[y].querySelectorAll('.cell')[x];
  return cell;
}

export function setCellStyle(cell, color) {
  cell.style.backgroundColor = color;
}
