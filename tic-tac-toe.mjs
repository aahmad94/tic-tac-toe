import Board from './board.mjs'

const game = new Board();

makeMove = (row, col) => {
  game.makeMove(row, col);
}