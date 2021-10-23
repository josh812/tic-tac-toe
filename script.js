const container = document.querySelector('#container');
const board = document.querySelector('#board');

const gameBoard = (() => {
    const boardArray = [' ', ' ', ' ', 
                        ' ', ' ', ' ',
                        ' ', ' ', ' '];
    function markBoardSquare(turn, spaceNum) {
        boardArray[spaceNum] = turn;
    }

    return {boardArray, markBoardSquare};
})();


const displayController = (() => {
    let turn = "X";

    function displayGameBoard() {
        board.textContent = "";
        for(let i=0; i < gameBoard.boardArray.length; i++) {
            const boardDiv = document.createElement('div');
            boardDiv.setAttribute('class', 'boardSquare');
            boardDiv.setAttribute('id', i);
            const boardPara = document.createElement('p');
            boardPara.textContent = gameBoard.boardArray[i];
            board.appendChild(boardDiv);
            boardDiv.appendChild(boardPara);
        }
        
        if(document.querySelector('#turn-para') != undefined) {
            document.querySelector('#turn-para').textContent = `${turn}'s turn!`;
        } else {
            const turnPara = document.createElement('p');
            turnPara.setAttribute('id', 'turn-para');
            turnPara.textContent = `${turn}'s turn!`;
            container.appendChild(turnPara);
        }
    }

    function changeTurn(currentTurn) {
        if(turn === "X") {
            turn = "O";
        } else if(turn === "O") {
            turn = "X";
        }
    }

    function fullTurn(e) {
        gameBoard.markBoardSquare(turn, e.target.getAttribute('id'));
        changeTurn(turn);
        displayGameBoard();
        const squares = document.querySelectorAll('.boardSquare');
        squares.forEach(square => {
            square.removeEventListener('click', displayController.fullTurn);
            square.addEventListener('click', displayController.fullTurn);
        });
    }

    return {displayGameBoard, fullTurn};
})();


const playerFactory = (name) => {
    return {name};
}

displayController.displayGameBoard();

const squares = document.querySelectorAll('.boardSquare');
squares.forEach(square => {
    square.addEventListener('click', displayController.fullTurn);
});