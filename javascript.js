const gameBoard = (() => {

    const grid = [[null, null, null], 
                  [null, null, null], 
                  [null, null, null]];

    const add = (name, marker, rowRef, colRef) => {
        grid[rowRef][colRef] = {marker};
    }
    
    return {grid, add};

})();



const Player = (thisPlayer) => {

    const name = thisPlayer.value;
    let marker = null;

    if (thisPlayer.id == 'player-1') {
        marker = 'x';
    } else {
        marker = 'o';
    }

    return {name, marker};

}



const displayController =  ((display, grid) => {

    // Sequence of events once a player makes a move:

    // 1. Display player marker in HTML

    const writeToDOM = () => {

        let childNumber = 0;

        for (let r = 0; r < 3; r++) { // loop through grid row
            for (let c = 0; c < 3; c++) { // loop through grid column
                if (grid[r][c] == null) { // check if grid cell has input
                    childNumber ++;
                } else {
                    display.children[childNumber].innerHTML = grid[r][c].marker;
                    console.log(grid[r][c].marker);
                    childNumber ++;
                }
            }
        }

        console.log(gameBoard.grid);

    }

    return {writeToDOM};

})(document.getElementById('grid-container'), gameBoard.grid);

displayController.writeToDOM();