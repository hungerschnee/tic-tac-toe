// matryoshka.ts
enum PieceSize {
    Small = 'small',
    Medium = 'medium',
    Large = 'large',
}

class TicTacToeMatrjoschka extends TicTacToeStandard {
    private matryoshkaBoard: { size: PieceSize; player?: Player }[][];

    constructor() {
        super();
        this.matryoshkaBoard = [
            [{ size: PieceSize.Small }, { size: PieceSize.Small }, { size: PieceSize.Small }],
            [{ size: PieceSize.Small }, { size: PieceSize.Small }, { size: PieceSize.Small }],
            [{ size: PieceSize.Small }, { size: PieceSize.Small }, { size: PieceSize.Small }],
        ];
    }

    private renderMatryoshkaBoard() {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const matryoshkaPiece = this.matryoshkaBoard[row][col];
                const pieceSize = matryoshkaPiece.size;

                if (matryoshkaPiece.player) {
                    // Render player's piece
                    this.board[row][col] = matryoshkaPiece.player;
                }

                const td = document.createElement('td');
                td.textContent = this.board[row][col];
                td.classList.add(pieceSize);
                td.addEventListener('click', () => this.matryoshkaCellClick(row, col, pieceSize));
                document.querySelectorAll('tr')[row].appendChild(td);
            }
        }
    }

    private matryoshkaCellClick(row: number, col: number, size: PieceSize) {
        const standardPiece = this.board[row][col];

        if (standardPiece === Player.None && this.matryoshkaBoard[row][col].size === size) {
            this.matryoshkaBoard[row][col].player = this.currentPlayer;
            this.matryoshkaBoard[row][col].size = PieceSize.Small; // You can modify this logic for larger pieces
            this.renderMatryoshkaBoard();

            if (this.checkWinner()) {
                this.snackbarWhoWins(this.currentPlayer, false);
                this.resetGame();
            } else if (this.isBoardFull()) {
                this.snackbarWhoWins(this.currentPlayer, true);
                this.resetGame();
            } else {
                // Fix: Switch player only if a valid move is made
                this.currentPlayer = this.currentPlayer === Player.X ? Player.O : Player.X;
            }
        }
    }


    override renderBoard() {
        super.renderBoard();
        this.renderMatryoshkaBoard();
    }
}

const matryoshkaGame = new TicTacToeMatrjoschka();
