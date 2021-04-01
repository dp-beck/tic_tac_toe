const gameBoard = (() => {
    const board =  ["", "", "",
                    "", "", "",
                    "", "", ""];
    return { board };
})();

const Player = (name, playerPiece, humanOrComputer) => {
    const getName = () => name;
    const getPlayerPiece = () => playerPiece;
    const getHumanOrCompluter = () => humanOrComputer;
    const checkWin = () => {
        if ((gameBoard.board[0] === playerPiece && gameBoard.board[1] === playerPiece && gameBoard.board[2] === playerPiece) ||
            (gameBoard.board[3] === playerPiece && gameBoard.board[4] === playerPiece && gameBoard.board[5] === playerPiece) ||
            (gameBoard.board[6] === playerPiece && gameBoard.board[7] === playerPiece && gameBoard.board[8] === playerPiece) ||
            (gameBoard.board[0] === playerPiece && gameBoard.board[3] === playerPiece && gameBoard.board[6] === playerPiece) ||
            (gameBoard.board[1] === playerPiece && gameBoard.board[4] === playerPiece && gameBoard.board[7] === playerPiece) ||
            (gameBoard.board[2] === playerPiece && gameBoard.board[5] === playerPiece && gameBoard.board[8] === playerPiece) ||
            (gameBoard.board[0] === playerPiece && gameBoard.board[4] === playerPiece && gameBoard.board[8] === playerPiece) ||
            (gameBoard.board[2] === playerPiece && gameBoard.board[4] === playerPiece && gameBoard.board[6] === playerPiece)) 
            {
              displayMessage = `${getName()} wins!`;
            } else if (counter == 9) {
                displayMessage = "It's a Tie!";
            }
            else {displayMessage = `${nextTurn.getName()}'s Turn`;}
    }
    const makeMove = (position) => {
        gameBoard.board[position] = getPlayerPiece();
        checkWin(); 
    };
    return {getName, getPlayerPiece, makeMove }
};

const player1 = Player("Player One", "X", "Human");
const player2 = Player("Player Two", "O", "Human");
let displayMessage = "Player One's Turn";
let whoseTurn = player1;
let nextTurn = player2;
let temp;
let counter = 0;

const displayController = ((clickedId) => {
    counter ++;
    whoseTurn.makeMove(parseInt(clickedId, 10));
    document.getElementById(clickedId).innerHTML = whoseTurn.getPlayerPiece();
    document.getElementById("displayMessage").innerHTML = displayMessage;
    temp = whoseTurn
    whoseTurn = nextTurn;
    nextTurn = temp;
    document.getElementById(clickedId).onclick = "";
});