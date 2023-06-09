import Player from './player.mjs';
import Cat from './cat.mjs';

export default class Board {
    constructor() {
      this.players = [
        new Player('Player 1', 'X'),
        new Player('Player 2', 'O')
      ];
      this.currentPlayerIndex = 0;
      this.messageElement = document.getElementById('message');
      this.cells = document.getElementsByClassName('cell');
			this.won = false;
			this.tie = false;
  
      this.initializeBoard();
    }
  
    initializeBoard() {
			// new Cat();
			this.won = false;
			Array.prototype.forEach.call(this.cells, (cell) => {
				cell.className = "cell";
			});

			const board = [
				['', '', ''],
				['', '', ''],
				['', '', '']
			];

      for (let i = 0; i < this.cells.length; i++) {
        this.cells[i].innerText = '';
        this.cells[i].addEventListener('click', () => this.makeMove(i, board));
      }
      this.messageElement.innerText = `${this.players[this.currentPlayerIndex].name}'s turn (${this.players[this.currentPlayerIndex].marker})`;
			this.setMessageColor(this.currentPlayerIndex);
    }
  
    makeMove(index, board) {
      const row = Math.floor(index / 3);
      const col = index % 3;
  
      if (board[row][col] !== '') {
        this.messageElement.innerText = 'Invalid move!';
        return;
      }
      
			if (!this.checkWin(board)) {
				board[row][col] = this.players[this.currentPlayerIndex].marker;
				this.cells[index].innerText = this.players[this.currentPlayerIndex].marker;
				this.cells[index].classList.add(this.players[this.currentPlayerIndex].marker.toLowerCase());		
			}
			
			if (this.checkWin(board)) {
					this.messageElement.innerText = `${this.players[this.currentPlayerIndex].name} wins!`;
					if (!this.won) {
						this.playAgain();
					}
					this.won = true;
					return;
			} 

			this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
			this.messageElement.innerText = `${this.players[this.currentPlayerIndex].name}'s turn (${this.players[this.currentPlayerIndex].marker})`;
			this.setMessageColor(this.currentPlayerIndex);
  
    }

		setMessageColor(index) {
			if (this.players[index].marker === 'X') {
				this.messageElement.style.color = "#764de4";
			} else {
				this.messageElement.style.color = "#c6dc37";
			}
		}

    checkWin(board) {
        // Check rows
        for (let row = 0; row < 3; row++) {
            if (board[row][0] !== '' &&
                board[row][0] === board[row][1] &&
                board[row][0] === board[row][2]) {
									return true;
            }
        }

        // Check columns
        for (let col = 0; col < 3; col++) {
            if (board[0][col] !== '' &&
                board[0][col] === board[1][col] &&
                board[0][col] === board[2][col]) {
									return true;
            }
        }

        // Check diagonals
        if (board[0][0] !== '' &&
            board[0][0] === board[1][1] &&
            board[0][0] === board[2][2]) {
							return true;
        }

        if (board[2][0] !== '' &&
            board[2][0] === board[1][1] &&
            board[2][0] === board[0][2]) {
							return true;
        }

        return false;
    }

		playAgain() {
			const messageParent = document.getElementById("message-parent");
			const playAgainButton = document.createElement("div");

			playAgainButton.setAttribute("class", "message");
			playAgainButton.setAttribute("id", "play-btn");
			playAgainButton.innerHTML = "Play again";
			
			playAgainButton.addEventListener("click", () => {
				this.initializeBoard();
				messageParent.removeChild(playAgainButton);
			});

			messageParent.appendChild(playAgainButton);
		}
			
  }