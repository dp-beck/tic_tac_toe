
//Could store these somewhere instead of in the global environment
const controller = new AbortController();
const options = {
    once: true,
    signal: controller.signal,
};

const box0 = document.getElementById("0");
box0.addEventListener("click", function() { displayController(this.id); }, options);
const box1 = document.getElementById("1");
box1.addEventListener("click", function() { displayController(this.id); }, options);
const box2 = document.getElementById("2");
box2.addEventListener("click", function() { displayController(this.id); }, options);
const box3 = document.getElementById("3");
box3.addEventListener("click", function() { displayController(this.id); }, options);
const box4 = document.getElementById("4");
box4.addEventListener("click", function() { displayController(this.id); }, options);
const box5 = document.getElementById("5");
box5.addEventListener("click", function() { displayController(this.id); }, options);
const box6 = document.getElementById("6");
box6.addEventListener("click", function() { displayController(this.id); }, options);
const box7 = document.getElementById("7");
box7.addEventListener("click", function() { displayController(this.id); }, options);
const box8 = document.getElementById("8");
box8.addEventListener("click", function() { displayController(this.id); }, options);

// TO DO:make this whole bit appear only if the computer is chosen!
const computerChoice = document.getElementById("computerMove");
computerChoice.addEventListener("click", function() { displayController(this.id); }, {signal: controller.signal});

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
              controller.abort();
            } else if (game.movesPlayed == 9) {
                game.displayMessage = "It's a Tie!";
            }
            else {game.displayMessage = `${game.nextTurn.name}'s Turn`;}
    },
    makeMove(position) {
        game.board[position] = this.piece;
        document.getElementById(position).innerHTML = this.piece;
        this.checkWin(); 
    },
    pickRandomSpot() {
        let emptySpots = [];
        for (let i = 0; i<game.board.length; i++) {
            if (game.board[i] === '') {
                emptySpots.push(i);
            };
        };
        return emptySpots[Math.floor(Math.random() * emptySpots.length)];
    },
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
    let displayMessage = "";
    let humanOrComputer = confirm("Choose OK if you want Player Two to be human. Otherwise, you will play against the computer.");
    const player1 = createPlayer("Player One", "X", true);
    const player2 = createPlayer("Player Two", "O", humanOrComputer);
    let whoseTurn = player1;
    let nextTurn = player2;
    return { board, movesPlayed, displayMessage, whoseTurn, nextTurn };
})();

const displayController = (clickedId) => {
    game.movesPlayed ++;
    if (game.whoseTurn.isHuman === false) {
        game.whoseTurn.makeMove(game.whoseTurn.pickRandomSpot());
    } else {
        game.whoseTurn.makeMove(parseInt(clickedId, 10));
        };
    document.getElementById("displayMessage").innerHTML = game.displayMessage;
    let temp = game.whoseTurn;
    game.whoseTurn = game.nextTurn;
    game.nextTurn = temp;
    document.getElementById(clickedId).onclick = "";
};
