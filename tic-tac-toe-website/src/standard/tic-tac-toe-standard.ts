enum Player {
    None = "",
    X = "X",
    O = "O",
}

class TicTacToeStandard {
    protected board: Player[][];
    protected currentPlayer: Player;

    constructor() {
        this.board = [
            [Player.None, Player.None, Player.None],
            [Player.None, Player.None, Player.None],
            [Player.None, Player.None, Player.None],
        ];
        this.currentPlayer = Player.X;
        this.renderBoard();
    }

    protected renderBoard() {
        const table = document.getElementById("ticTacToe")!;
        table.innerHTML = "";

        for (let row = 0; row < 3; row++) {
            const tr = document.createElement("tr");
            for (let col = 0; col < 3; col++) {
                const td = document.createElement("td");
                td.textContent = this.board[row][col];
                td.addEventListener("click", () => this.cellClick(row, col));
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
    }

    private cellClick(row: number, col: number) {
        if (this.board[row][col] === Player.None) {
            this.board[row][col] = this.currentPlayer;
            this.renderBoard();

            if (this.checkWinner()) {
                this.snackbarWhoWins(this.currentPlayer, false)
                this.resetGame();
            } else if (this.isBoardFull()) {
                this.snackbarWhoWins(this.currentPlayer, true)
                this.resetGame();
            } else {
                this.currentPlayer = this.currentPlayer === Player.X ? Player.O : Player.X;
            }
        }
    }

    protected snackbarWhoWins(currentPlayer: Player, draw: boolean) {
        const snackbar = document.getElementById("snackbar");

        if (snackbar) {
            if (draw) {
                snackbar.textContent = 'It\'s a draw!'
            } else {
                snackbar.textContent = `Player ${currentPlayer} wins!`
            }
            snackbar.className = "show";

            // After 3 seconds, remove the show class from DIV
            setTimeout(function () {
                if (snackbar) {
                    snackbar.className = snackbar.className.replace("show", "");
                }
            }, 3000);
        }
    }


    protected checkWinner(): boolean {
        // Check rows, columns, and diagonals for a winner
        return (
            this.checkLine(0, 0, 0, 1, 0, 2) ||
            this.checkLine(1, 0, 1, 1, 1, 2) ||
            this.checkLine(2, 0, 2, 1, 2, 2) ||
            this.checkLine(0, 0, 1, 0, 2, 0) ||
            this.checkLine(0, 1, 1, 1, 2, 1) ||
            this.checkLine(0, 2, 1, 2, 2, 2) ||
            this.checkLine(0, 0, 1, 1, 2, 2) ||
            this.checkLine(0, 2, 1, 1, 2, 0)
        );
    }

    protected checkLine(r1: number, c1: number, r2: number, c2: number, r3: number, c3: number): boolean {
        return (
            this.board[r1][c1] !== Player.None &&
            this.board[r1][c1] === this.board[r2][c2] &&
            this.board[r1][c1] === this.board[r3][c3]
        );
    }

    protected isBoardFull(): boolean {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (this.board[row][col] === Player.None) {
                    return false;
                }
            }
        }
        return true;
    }

    protected resetGame() {
        this.board = [
            [Player.None, Player.None, Player.None],
            [Player.None, Player.None, Player.None],
            [Player.None, Player.None, Player.None],
        ];
        this.currentPlayer = Player.X;
        this.renderBoard();
    }
}

const game = new TicTacToeStandard();
