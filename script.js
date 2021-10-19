const container = document.querySelector('#container');
const board = document.querySelector('#board');

const gameBoard = (() => {
    const boardArray = ['X', 'O', 'O', 
                        'O', 'X', 'X',
                        'X', 'X', 'O'];
    return {boardArray};
})();

const displayController = (() => {
    function displayGameBoard(gameBoard) {
        for(let i=0; i<gameBoard.boardArray.length; i++) {
            const boardPara = document.createElement('p');
            boardPara.setAttribute('class', 'boardSquare');
            boardPara.textContent = gameBoard.boardArray[i];
            board.appendChild(boardPara);
        }
    }
    return {displayGameBoard};
})();

const playerFactory = (name) => {
    return {name};
}

displayController.displayGameBoard(gameBoard);