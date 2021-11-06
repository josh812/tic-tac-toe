const container = document.querySelector('#container');
const board = document.querySelector('#board');

if(window.innerWidth >= window.innerHeight) {
    board.style.width = '75vh';
    board.style.height = '75vh';
} else {
    board.style.width = '75vw';
    board.style.height = '75vw';
}

const gameBoard = (() => {
    const boardArray = [' ', ' ', ' ',
                        ' ', ' ', ' ',
                        ' ', ' ', ' '];
    function markBoardSquare(turn, spaceNum) {
        boardArray[spaceNum] = turn;
    }

    function checkWinner() {
        if(boardArray[0] === boardArray[1] && boardArray[1] === boardArray[2] && boardArray[0] !== ' ') {
            console.log(`${boardArray[0]} wins!`);
        } else if(boardArray[3] === boardArray[4] && boardArray[4] === boardArray[5] && boardArray[3] !== ' ') {
            console.log(`${boardArray[3]} wins!`);
        } else if(boardArray[6] === boardArray[7] && boardArray[7] === boardArray[8] && boardArray[6] !== ' ') {
            console.log(`${boardArray[6]} wins!`);
        } else if(boardArray[0] === boardArray[3] && boardArray[3] === boardArray[6] && boardArray[0] !== ' ') {
            console.log(`${boardArray[0]} wins!`);
        } else if(boardArray[1] === boardArray[4] && boardArray[4] === boardArray[7] && boardArray[1] !== ' ') {
            console.log(`${boardArray[1]} wins!`);
        } else if(boardArray[2] === boardArray[5] && boardArray[5] === boardArray[8] && boardArray[2] !== ' ') {
            console.log(`${boardArray[2]} wins!`);
        } else if(boardArray[0] === boardArray[4] && boardArray[4] === boardArray[8] && boardArray[0] !== ' ') {
            console.log(`${boardArray[0]} wins!`);
        } else if(boardArray[2] === boardArray[4] && boardArray[4] === boardArray[6] && boardArray[2] !== ' ') {
            console.log(`${boardArray[2]} wins!`);
        }
    }

    return {boardArray, markBoardSquare, checkWinner};
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
            if(gameBoard.boardArray[i] === 'X') {
                boardPara.classList.add('x');
            } else if(gameBoard.boardArray[i] === 'O') {
                boardPara.classList.add('o');
            }
            boardPara.textContent = gameBoard.boardArray[i];
            board.appendChild(boardDiv);
            boardDiv.appendChild(boardPara);
        }
        
        if(document.querySelector('#turn-para') != undefined) {
            document.querySelector('#turn-para').textContent = `${turn}'s turn`;
        } else {
            const turnPara = document.createElement('p');
            turnPara.setAttribute('id', 'turn-para');
            turnPara.textContent = `${turn}'s turn`;
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
        if(e.target.textContent === ' ') {
            gameBoard.markBoardSquare(turn, e.target.getAttribute('id'));
            changeTurn(turn);
            displayGameBoard();
            const squares = document.querySelectorAll('.boardSquare');
            squares.forEach(square => {
                square.removeEventListener('click', displayController.fullTurn);
                square.addEventListener('click', displayController.fullTurn);
            });
        }
        gameBoard.checkWinner();
    }

    return {displayGameBoard, fullTurn};
})();


const playerFactory = (name) => {
    return {name};
}

displayController.displayGameBoard();

// Event Listeners

const squares = document.querySelectorAll('.boardSquare');
squares.forEach(square => {
    square.addEventListener('click', displayController.fullTurn);
});

window.addEventListener('resize', function() {
    if(window.innerWidth >= window.innerHeight) {
            board.style.width = '75vh';
            board.style.height = '75vh';
    } else {
            board.style.width = '75vw';
            board.style.height = '75vw';
    }
});
