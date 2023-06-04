export default class Board {
    constructor() {
        this.board = [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']
        ];
    }

    makeMove(row, col, player) {
        if (this.board[row][col] !== ' ') {
            console.log("Invalid move!");
            return false;
        }
        this.board[row][col] = player.symbol;
        this.printBoard();
        return true;
    }

    checkWin() {
        for (let i = 0; i < 3; i++) {
            if (this.board[i][0] !== ' ' &&
                this.board[i][0] === this.board[i][1] &&
                this.board[i][0] === this.board[i][2]) {
                return true;
            }
            if (this.board[0][i] !== ' ' &&
                this.board[0][i] === this.board[1][i] &&
                this.board[0][i] === this.board[2][i]) {
                return true;
            }
        }
        if (this.board[0][0] !== ' ' &&
            this.board[0][0] === this.board[1][1] &&
            this.board[0][0] === this.board[2][2]) {
            return true;
        }
        if (this.board[2][0] !== ' ' &&
            this.board[2][0] === this.board[1][1] &&
            this.board[2][0] === this.board[0][2]) {
            return true;
        }
        return false;
    }

    printBoard() {
        for (let i = 0; i < 3; i++) {
            console.log(this.board[i]);
        }
    }
}