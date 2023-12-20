document.addEventListener('DOMContentLoaded', function () {
    const cells = document.querySelectorAll('.cell');
    const status = document.getElementById('status');
    const restartButton = document.querySelector('.restart');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);

    function handleCellClick() {
        const cellIndex = parseInt(this.dataset.cellIndex);

        if (gameBoard[cellIndex] === '' && gameActive) {
            gameBoard[cellIndex] = currentPlayer;
            this.textContent = currentPlayer;
            this.classList.add('selected');

            if (checkWin()) {
                status.textContent = `${currentPlayer} Wins!`;
                highlightWinningCells();
                gameActive = false;
            } else if (checkDraw()) {
                status.textContent = "It's a Draw!";
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                status.textContent = `${currentPlayer}'s turn`;
            }
        }
    }

    function checkWin() {
        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
        });
    }

    function highlightWinningCells() {
        winPatterns.forEach(pattern => {
            const [a, b, c] = pattern;
            const cellsToHighlight = [cells[a], cells[b], cells[c]];

            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                cellsToHighlight.forEach(cell => cell.classList.add('winning-cell'));
            }
        });
    }

    function checkDraw() {
        return !gameBoard.includes('');
    }

    function restartGame() {
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('selected', 'winning-cell');
        });

        currentPlayer = 'X';
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        status.textContent = `${currentPlayer}'s turn`;
    }
});


function highlightWinningCells() {
    winPatterns.forEach(pattern => {
        const [a, b, c] = pattern;
        const container = document.querySelector('.container');
        container.classList.add('winning-cell');
    });
}


