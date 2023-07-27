const gameBoard = (() => {

    const grid = [[null, null, null], 
                  [null, null, null], 
                  [null, null, null]];
    
    return {grid};

})();



const Player = (thisPlayer, playerNumber) => {

    let marker = null;

    if (playerNumber == 1) {
        marker = 'x';
    } else if (playerNumber == 2) {
        marker = 'o';
    } else {
        console.log(`Too many players! ${thisPlayer} cannot enter`);
        return;
    }

    const name = thisPlayer;
    const index = playerNumber;

    return {name, index, marker};

}



const match = (() => {

    const playGame = (playerOne, playerTwo) => {
        alert("Enter row and column index with a comma in between to successfully make your move! i.e. row 1, column 0 = \"1,0\"");
        let playerTurn = 1; // Start with playerOne
        for (let turns = 0; turns < 9; turns++) {
            if (playerTurn == playerOne.index) {
                playRound(playerOne);
                playerTurn = 2;
            }   else if (playerTurn == playerTwo.index) {
                playRound(playerTwo);
                playerTurn = 1;
            }
            let winner = checkForWinner();
            if (winner !== undefined) {
                return console.log(`${winner.name} won!`);
            }
            if (turns == 9) {
                return console.log("Tie game, play again!");
            }
        }
    }

    const playRound = (player) => {
        let roundComplete = false;
        do {
            let move = prompt(`${player.name}: Make your move!`); // user input must be row index followed by column index, and comma separated
            let rowIndex = Number(move.charAt(0));
            let colIndex = Number(move.charAt(2));
            if (move.length == 3 &&
                typeof rowIndex === 'number' &&
                typeof colIndex === 'number') {
                if (gameBoard.grid[rowIndex][colIndex] == null) {
                    gameBoard.grid[rowIndex][colIndex] = player;
                    roundComplete = true;
                } else {
                    console.log('This cell\'s been occupied!');
                }
            } else {
                console.log('Invalid input, try again!');
            }
        } while (roundComplete == false);
    }

    const checkForWinner = () => {
        for (let gridLength = 0; gridLength < 3; gridLength++) {
            // horizontal
            if (gameBoard.grid[gridLength][0] !== null &&
                (gameBoard.grid[gridLength][0] == gameBoard.grid[gridLength][1] &&
                 gameBoard.grid[gridLength][0] == gameBoard.grid[gridLength][2] &&
                 gameBoard.grid[gridLength][1] == gameBoard.grid[gridLength][2])) {
                    return gameBoard.grid[gridLength][0];
                }
            // vertical
            if (gameBoard.grid[0][gridLength] !== null && 
                (gameBoard.grid[0][gridLength] == gameBoard.grid[1][gridLength] &&
                 gameBoard.grid[0][gridLength] == gameBoard.grid[2][gridLength] &&
                 gameBoard.grid[1][gridLength] == gameBoard.grid[2][gridLength])) {
                    return gameBoard.grid[0][gridLength];
            }
        }
        // diagonal
        if (gameBoard.grid[0][0] !== null && 
            (gameBoard.grid[0][0] == gameBoard.grid[1][1] &&
             gameBoard.grid[0][0] == gameBoard.grid[2][2] &&
             gameBoard.grid[1][1] == gameBoard.grid[2][2])) {
                return gameBoard.grid[0][0];
        }
        if (gameBoard.grid[0][2] !== null &&
            (gameBoard.grid[0][2] == gameBoard.grid[1][1] &&
             gameBoard.grid[0][2] == gameBoard.grid[2][0] &&
             gameBoard.grid[1][1] == gameBoard.grid[2][0])) {
                return gameBoard.grid[0][2];
            }
    }

    return {playGame};

})();


const inputOne = prompt("Enter player one name");
const inputTwo = prompt("Enter player two name");
const playerOne = Player(inputOne, 1);
const playerTwo = Player(inputTwo, 2);

console.log(playerOne, playerTwo);
console.log(gameBoard.grid);
match.playGame(playerOne, playerTwo);






// const displayController =  ((display) => {

//     // Sequence of events once a player makes a move:

//     // Event listener for user input
//     display.addEventListener('click', (event) => {
//         console.log(event.target.id);
//     })


//     // Display player marker in HTML

//     const writeToDOM = () => {

//         let childNumber = 0;

//         for (let r = 0; r < 3; r++) { // loop through grid row
//             for (let c = 0; c < 3; c++) { // loop through grid column
//                 if (grid[r][c] == null) { // check if grid cell has input
//                     childNumber ++;
//                 } else {
//                     display.children[childNumber].innerHTML = grid[r][c];
//                     console.log(grid[r][c]);
//                     childNumber ++;
//                 }
//             }
//         }

//         console.log(gameBoard.grid);

//     }

//     return {writeToDOM};

// })(document.getElementById('grid-container'));