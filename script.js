//TO DO: Implement an AI Option for either player
//TO DO: Style the display
//TO DO: Style and Center the Player Marks
//TO DO: Player's should not be able to make a move after one character wins.
//TO DO: Create a Reset Button

//Storing player actions in this prototype for the player objects.
const playerActions = {
    checkWin() {
        if ((game.board[0] === this.piece && game.board[1] === this.piece && game.board[2] === this.piece) ||
            (game.board[3] === this.piece && game.board[4] === this.piece && game.board[5] === this.piece) ||
            (game.board[6] === this.piece && game.board[7] === this.piece && game.board[8] === this.piece) ||
            (game.board[0] === this.piece && game.board[3] === this.piece && game.board[6] === this.piece) ||
            (game.board[1] === this.piece && game.board[4] === this.piece && game.board[7] === this.piece) ||
            (game.board[2] === this.piece && game.board[5] === this.piece && game.board[8] === this.piece) ||
            (game.board[0] === this.piece && game.board[4] === this.piece && game.board[8] === this.piece) ||
            (game.board[2] === this.piece && game.board[4] === this.piece && game.board[6] === this.piece)) 
            {
              game.displayMessage = `${this.name} wins!`;
            } else if (game.movesPlayed == 9) {
                game.displayMessage = "It's a Tie!";
            }
            else {game.displayMessage = `${game.nextTurn.name}'s Turn`;}
    },
    makeMove(position) {
        game.board[position] = this.piece;
        this.checkWin(); 
    }
};

const createPlayer = (name, piece, isHuman) => {
    let player = Object.create(playerActions);
    player.name = name;
    player.piece = piece;
    player.isHuman = isHuman;
    return player;
};

//Storing the tic tac toe board in an object--module pattern
const game = (() => {
    const board =  ["", "", "",
                    "", "", "",
                    "", "", ""];
    let movesPlayed = 0;
    let displayMessage = "Player One's Turn";
    const player1 = createPlayer("Player One", "X", true);
    const player2 = createPlayer("Player Two", "O", true);
    let whoseTurn = player1;
    let nextTurn = player2;
    return { board, movesPlayed, displayMessage, whoseTurn, nextTurn };
})();

const displayController = (clickedId) => {
    game.movesPlayed ++;
    game.whoseTurn.makeMove(parseInt(clickedId, 10));
    document.getElementById(clickedId).innerHTML = game.whoseTurn.piece;
    document.getElementById("displayMessage").innerHTML = game.displayMessage;
    let temp = game.whoseTurn;
    game.whoseTurn = game.nextTurn;
    game.nextTurn = temp;
    document.getElementById(clickedId).onclick = "";
};