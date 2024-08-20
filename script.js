const gameCells = document.querySelectorAll('.cell');
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');
const restartBtn = document.querySelector('.restartBtn');
const alertBox = document.querySelector('.alertBox');


//making variables 
let currentPlayer = 'X';
let nextPlayer = 'O';
let playerTurn = currentPlayer;

player1.textContent = `Player 1: ${currentPlayer}`;
player2.textContent = `Player 2: ${nextPlayer}`;

//function to start the game
const startGame = () => {
    gameCells.forEach(cells => {
        cells.addEventListener('click', clickHandle);
    });
}

// function to switch players
const switchPlayer = () => {
    /*  
    if(playerTurn === currentPlayer){
          playerTurn = nextPlayer;
          //console.log(playerTurn);
      } else {
          playerTurn = currentPlayer;
          //console.log(playerTurn);
      }
    */
    playerTurn = playerTurn === currentPlayer ? nextPlayer : currentPlayer;
}

//function to check the game winner
const winnerCheck = () => {
    const winningConditions =
        [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
    for (let i = 0; i < winningConditions.length; i++) {
        const [pos1, pos2, pos3] = winningConditions[i];
        if (gameCells[pos1].textContent === playerTurn && gameCells[pos2].textContent === playerTurn && gameCells[pos3].textContent === playerTurn) {
            //console.log('winner');
            console.log(`${playerTurn} wins`);

            //highlight the winning cells
            gameCells[pos1].style.backgroundColor = 'green';
            gameCells[pos2].style.backgroundColor = 'green';
            gameCells[pos3].style.backgroundColor = 'green';
            return true;
        }



        
        console.log(`${pos1} ${pos2} ${pos3}`);
    }
    return false;
}

//function to check the game draw
const checkDraw = () => {
    let emptycellsCount = 0;
    gameCells.forEach(cells => {
        if (cells.textContent === '') {
            emptycellsCount++;
        }
    });

    return emptycellsCount === 0 && !winnerCheck();
}

//function to handle the click event
const clickHandle = (e) => {
    if (e.target.textContent === '') {
        e.target.textContent = playerTurn;
        if(winnerCheck()) {
            //console.log(`${playerTurn} is a wins`);
            showAlert(`${playerTurn} is a wins`);
            disableCells();
        } else if (checkDraw()) {
            //console.log('Its a Tie!');
            showAlert('Its a Tie!');
            gameCells.forEach(cells => {
                cells.style.backgroundColor = 'silver';
            });
           disableCells();
        } else {
            //console.log(`${playerTurn}'s turn`);
            showAlert(`${playerTurn}'s turn`);
            switchPlayer();
        }
    }
}

//function to disable the empty cells
const disableCells = () => {
    gameCells.forEach(cells => {
        cells.removeEventListener('click', clickHandle);
        cells.classList.add('disabled');
    });
}

//function to restart the game
const restartGame = () => {
    gameCells.forEach(cells => {
        cells.textContent = '';
        cells.style.backgroundColor = '';
        cells.classList.remove('disabled');
    });
    playerTurn = currentPlayer;
    startGame();
}

//function to show the alert message
const showAlert = (message) => {
    alertBox.style.display = 'block';
    alertBox.textContent = message;
    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 4000);
}


//adding event listener to restart button
restartBtn.addEventListener('click', restartGame);

//calling function to restart the game
startGame();