const gameBoard = (() => {
    const grid = [[null, null, null], 
                  [null, null, null], 
                  [null, null, null]];
    return {grid};
})();



const Player = (playerName, playerNumber) => {
    let marker = null;
    if (playerNumber == 1) {
        marker = 'x';
    } else if (playerNumber == 2) {
        marker = 'o';
    }
    const name = playerName;
    const index = playerNumber;
    return {name, index, marker};
}



const game = (() => {

    let roundCount = 1;
    let playerTurn = 1; // playerOne starts first
    let winner = null;

    const start = () => {
        roundCount = 1;
        playerTurn = 1;
        winner = null;
        let starter = checkTurn();
        displayControl.start(starter);
    }

    const checkTurn = () => { // if it's player's turn, return the player
        if (playerTurn == 1) {
            return playerOne;
        } else {
            return playerTwo;
        }
    }

    const nextTurn = (player) => { // change to next player once round is complete
        if (player.index == 1) {
            playerTurn = 2;
        } else {
            playerTurn = 1;
        }
    }

    const playRound = (gridIndex, rowIndex, colIndex) => {
        let player = checkTurn();
        if (gameBoard.grid[rowIndex][colIndex] == null) { // return true if round is successfully played
            gameBoard.grid[rowIndex][colIndex] = player;          
            displayControl.addMarker(gridIndex, player);
            return checkRound(player);
        } else { // return false if cell has been occupied
            displayControl.blocker(player);
        }
    }

    const checkRound = (player) => {
        winner = checkForWin();
        if (winner) {
            displayControl.announceWinner(player);
            return true;
        } else if (roundCount == 9) {
            displayControl.tieGame();
            return true;
        } else {
            nextTurn(player);
            displayControl.nextTurn(checkTurn());
            roundCount++;
        }
    }

    const checkForWin = () => {
        for (let gridLength = 0; gridLength < 3; gridLength++) {
            // check horizontal
            if (gameBoard.grid[gridLength][0] !== null &&
                (gameBoard.grid[gridLength][0] == gameBoard.grid[gridLength][1] &&
                 gameBoard.grid[gridLength][0] == gameBoard.grid[gridLength][2] &&
                 gameBoard.grid[gridLength][1] == gameBoard.grid[gridLength][2])) {
                    return true;
                }
            // check vertical
            if (gameBoard.grid[0][gridLength] !== null && 
                (gameBoard.grid[0][gridLength] == gameBoard.grid[1][gridLength] &&
                 gameBoard.grid[0][gridLength] == gameBoard.grid[2][gridLength] &&
                 gameBoard.grid[1][gridLength] == gameBoard.grid[2][gridLength])) {
                    return true;
            }
        }
        // check diagonal
        if (gameBoard.grid[0][0] !== null && 
            (gameBoard.grid[0][0] == gameBoard.grid[1][1] &&
             gameBoard.grid[0][0] == gameBoard.grid[2][2] &&
             gameBoard.grid[1][1] == gameBoard.grid[2][2])) {
                return true;
        }
        if (gameBoard.grid[0][2] !== null &&
            (gameBoard.grid[0][2] == gameBoard.grid[1][1] &&
             gameBoard.grid[0][2] == gameBoard.grid[2][0] &&
             gameBoard.grid[1][1] == gameBoard.grid[2][0])) {
                return true;
            }
    }

    return {start, playRound};

})();



const displayControl = ((grid, instruction, playAgain) => {

    let gameOver = false;

    const playerInput = () => {
        grid.addEventListener('click', (event) => {
            if (!gameOver) {
                let gridIndex = event.target.id; // get gridIndex
                let rowIndex = gridIndex.charAt(5);
                let colIndex = gridIndex.charAt(6);
                gameOver = game.playRound(gridIndex, rowIndex, colIndex); // play round
                if (gameOver) {
                    playAgain.style.display = 'block';
                }
            }
        });

    }

    const replay = () => {
        playAgain.addEventListener('click', () => {
            for (let r = 0; r < 3; r++) {
                for (let c = 0; c < 3; c++) {
                    gameBoard.grid[r][c] = null;
                    document.getElementById(`grid-${r}${c}`).innerHTML = "";
                }
            }
            playAgain.style.display = 'none';
            gameOver = false;
            game.start();
        });
    }

    const start = (starter) => {
        instruction.innerHTML = `${starter.name} starts first!`;
    }
    
    const addMarker = (gridIndex, player) => {
        document.getElementById(gridIndex).innerHTML = player.marker;
    }

    const nextTurn = (player) => {
        instruction.innerHTML = `${player.name}'s turn!`;
    }

    const blocker = (player) => {
        instruction.innerHTML = `This cell's occupied! It's still ${player.name}'s turn.`;
    }

    const announceWinner = (player) => {
        instruction.innerHTML = `${player.name} won!`;
    }

    const tieGame = () => {
        instruction.innerHTML = 'It\'s a tie!';
    }

    return {playerInput, replay, start, addMarker, nextTurn, blocker, announceWinner, tieGame};
})(document.getElementById('grid-container'), 
   document.getElementById('instruction'),
   document.getElementById('play-again'));



const formControl = ((form, formContainer) => {

    const openForm = () => {
        formContainer.style.display = 'grid';
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            if (form.elements['player-1'].value !== '') {
                playerOne.name = form.elements['player-1'].value;
            }
            if (form.elements['player-2'].value !== '') {
                playerTwo.name = form.elements['player-2'].value;
            }
            closeForm();
            game.start();
            displayControl.playerInput();
            displayControl.replay();
        });
    }

    const closeForm = () => {
        formContainer.style.display = 'none';
    }

    return {openForm};

})(document.getElementById('form'),
   document.getElementById('form-container'));

const playerOne = Player('Player 1', 1);
const playerTwo = Player('Player 2', 2);
formControl.openForm();