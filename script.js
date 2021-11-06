const container = document.querySelector('#container');
const board = document.querySelector('#board');
var game_active = true;
var turn_count = 0;

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
            document.querySelector('#turn-para').textContent = `${boardArray[0]} wins!`;
            game_active = false;
        } else if(boardArray[3] === boardArray[4] && boardArray[4] === boardArray[5] && boardArray[3] !== ' ') {
            document.querySelector('#turn-para').textContent = `${boardArray[3]} wins!`;
            game_active = false;
        } else if(boardArray[6] === boardArray[7] && boardArray[7] === boardArray[8] && boardArray[6] !== ' ') {
            document.querySelector('#turn-para').textContent = `${boardArray[6]} wins!`;
            game_active = false;
        } else if(boardArray[0] === boardArray[3] && boardArray[3] === boardArray[6] && boardArray[0] !== ' ') {
            document.querySelector('#turn-para').textContent = `${boardArray[0]} wins!`;
            game_active = false;
        } else if(boardArray[1] === boardArray[4] && boardArray[4] === boardArray[7] && boardArray[1] !== ' ') {
            document.querySelector('#turn-para').textContent = `${boardArray[1]} wins!`;
            game_active = false;
        } else if(boardArray[2] === boardArray[5] && boardArray[5] === boardArray[8] && boardArray[2] !== ' ') {
            document.querySelector('#turn-para').textContent = `${boardArray[2]} wins!`;
            game_active = false;
        } else if(boardArray[0] === boardArray[4] && boardArray[4] === boardArray[8] && boardArray[0] !== ' ') {
            document.querySelector('#turn-para').textContent = `${boardArray[0]} wins!`;
            game_active = false;
        } else if(boardArray[2] === boardArray[4] && boardArray[4] === boardArray[6] && boardArray[2] !== ' ') {
            document.querySelector('#turn-para').textContent = `${boardArray[2]} wins!`;
            game_active = false;
        } else if(turn_count === 8) {
            document.querySelector('#turn-para').textContent = 'Draw!';
            game_active = false;
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
        if(game_active === true) {
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
            turn_count++;
        }
    }

    return {displayGameBoard, fullTurn, game_active};
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
