import Player from './player.mjs';

export default class Board {
    constructor() {
      this.board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ];
      this.players = [
        new Player('Player 1', 'X'),
        new Player('Player 2', 'O')
      ];
      this.currentPlayerIndex = 0;
      this.messageElement = document.getElementById('message');
      this.cells = document.getElementsByClassName('cell');
  
      this.initializeBoard();
    }
  
    initializeBoard() {
      for (let i = 0; i < this.cells.length; i++) {
        this.cells[i].innerText = '';
        this.cells[i].addEventListener('click', () => this.makeMove(i));
      }
      this.messageElement.innerText = `${this.players[this.currentPlayerIndex].name}'s turn (${this.players[this.currentPlayerIndex].marker})`;
    }
  
    makeMove(index) {
      const row = Math.floor(index / 3);
      const col = index % 3;
  
      if (this.board[row][col] !== '') {
        this.messageElement.innerText = 'Invalid move!';
        return;
      }
      
			if (this.checkWin()) {
					this.messageElement.innerText = `${this.players[this.currentPlayerIndex].name} wins!`;
					return;
			}

      this.board[row][col] = this.players[this.currentPlayerIndex].marker;
      this.cells[index].innerText = this.players[this.currentPlayerIndex].marker;
      this.cells[index].classList.add(this.players[this.currentPlayerIndex].marker.toLowerCase());
  
  
      this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
      this.messageElement.innerText = `${this.players[this.currentPlayerIndex].name}'s turn (${this.players[this.currentPlayerIndex].marker})`;
    }

    checkWin() {
        // Check rows
        for (let row = 0; row < 3; row++) {
            if (this.board[row][0] !== '' &&
                this.board[row][0] === this.board[row][1] &&
                this.board[row][0] === this.board[row][2]) {
                return true;
            }
        }

        // Check columns
        for (let col = 0; col < 3; col++) {
            if (this.board[0][col] !== '' &&
                this.board[0][col] === this.board[1][col] &&
                this.board[0][col] === this.board[2][col]) {
                return true;
            }
        }

        // Check diagonals
        if (this.board[0][0] !== '' &&
            this.board[0][0] === this.board[1][1] &&
            this.board[0][0] === this.board[2][2]) {
            return true;
        }

        if (this.board[2][0] !== '' &&
            this.board[2][0] === this.board[1][1] &&
            this.board[2][0] === this.board[0][2]) {
            return true;
        }

        return false;
    }
  }
  
  