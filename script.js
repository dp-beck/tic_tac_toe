//TO DO: Implement an AI Option for either player
//TO DO: Style the display
//TO DO: Style and Center the Player Marks
//TO DO: Player's should not be able to make a move after one character wins.
//TO DO: Create a Reset Button

//TO DO: Put the methods on the prototype.
const Player = (name, playerPiece, isHuman) => {
    const checkWin = () => {
        if ((game.board[0] === playerPiece && game.board[1] === playerPiece && game.board[2] === playerPiece) ||
            (game.board[3] === playerPiece && game.board[4] === playerPiece && game.board[5] === playerPiece) ||
            (game.board[6] === playerPiece && game.board[7] === playerPiece && game.board[8] === playerPiece) ||
            (game.board[0] === playerPiece && game.board[3] === playerPiece && game.board[6] === playerPiece) ||
            (game.board[1] === playerPiece && game.board[4] === playerPiece && game.board[7] === playerPiece) ||
            (game.board[2] === playerPiece && game.board[5] === playerPiece && game.board[8] === playerPiece) ||
            (game.board[0] === playerPiece && game.board[4] === playerPiece && game.board[8] === playerPiece) ||
            (game.board[2] === playerPiece && game.board[4] === playerPiece && game.board[6] === playerPiece)) 
            {
              game.displayMessage = `${name} wins!`;
            } else if (game.movesPlayed == 9) {
                game.displayMessage = "It's a Tie!";
            }
            else {game.displayMessage = `${game.nextTurn.name}'s Turn`;}
    }
    const makeMove = (position) => {
        game.board[position] = playerPiece;
        checkWin(); 
    };
    return {name, playerPiece, isHuman, makeMove }
};

//storing the tic tac toe board in an object--module pattern
const game = (() => {
    const board =  ["", "", "",
                    "", "", "",
                    "", "", ""];
    let movesPlayed = 0;
    let displayMessage = "Player One's Turn";
    const player1 = Player("Player One", "X", true);
    const player2 = Player("Player Two", "O", true);
    let whoseTurn = player1;
    let nextTurn = player2;
    return { board, movesPlayed, displayMessage, whoseTurn, nextTurn };
})();

//TO DO = Do I need those extra set of parentheses?
const displayController = ((clickedId) => {
    game.movesPlayed ++;
    game.whoseTurn.makeMove(parseInt(clickedId, 10));
    document.getElementById(clickedId).innerHTML = game.whoseTurn.playerPiece;
    document.getElementById("displayMessage").innerHTML = game.displayMessage;
    let temp = game.whoseTurn;
    game.whoseTurn = game.nextTurn;
    game.nextTurn = temp;
    document.getElementById(clickedId).onclick = "";
});