const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 40;

let canvas;
let ctx;
let block;
let color;
let gravity = 0;
let canMove = false;
let yPos = 0;
let stoppedTime = 0;
