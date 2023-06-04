import Board from './board.mjs'
class Player {
    constructor(symbol) {
        this.symbol = symbol;
    }
}

class TicTacToe {
    constructor() {
        this.board = new Board();
        this.players = [new Player('X'), new Player('O')];
        this.currentPlayerIndex = 0;
    }

    makeMove(row, col) {
        if (this.board.makeMove(row, col, this.players[this.currentPlayerIndex])) {
            if (this.board.checkWin()) {
                console.log(`Player ${this.players[this.currentPlayerIndex].symbol} wins!`);
                return;
            }
            this.currentPlayerIndex = 1 - this.currentPlayerIndex;  // switch player
        }
    }
}

let game = new TicTacToe();
game.makeMove(0, 0);
game.makeMove(1, 1);
game.makeMove(0, 1);
game.makeMove(2, 2);
game.makeMove(0, 2);  