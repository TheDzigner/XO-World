const close_dashboard = 

document.querySelector('#close_dashboard ')

const open_dashboard = 

document.querySelector('#open_dashboard ')

let player_1_wrapper = 

document.querySelector('.player_1_wrapper')

let player_2_wrapper = 

document.querySelector('.player_2_wrapper')

var cells = document.querySelectorAll("#board td");

var gameOver = false;

var XOTurn =

document.querySelector(".result_container p");

var IsWins = 

document.querySelector('.result_container span')

var displayWinner = 

document.querySelector('.result_container h3')

var resetButton = document.getElementById("reset-button");

let start_btn =

  document.querySelector('#start')

  

var restartButton = 

document.getElementById('restart-button')

let reset_button = 

document.querySelector('#reset-button')

reset_button.classList.add('dis')

restartButton.classList.add('dis')

// player name inputs

var player1_name = 

document.querySelector('#player1_name')

var player2_name = 

document.querySelector('#player2_name')

var timer_wrapper = 

document.querySelector('.timer')

let timer;

let currentPlayer = "O";

let minutes = 0 

let seconds = 0

let player1Score = 0

let player2Score = 0

let movesMade = 0

let matchWon = localStorage.getItem('numberMatchWon',0)

let matchPlayed = localStorage.getItem('matchPlayed',0)

let matchLoose =  localStorage.getItem('matchLoose',0)

let draw = 0

var winningCombinations = [

  [0, 1, 2],

  [3, 4, 5],

  [6, 7, 8],

  [0, 3, 6],

  [1, 4, 7],

  [2, 5, 8],

  [0, 4, 8],

  [2, 4, 6]

];

open_dashboard.addEventListener('click',function(){

  document.querySelector('.dashboard_container').classList.add('active')

})

close_dashboard.addEventListener('click',function(){

  document.querySelector('.dashboard_container').classList.remove('active')

})

function disabledCell()

{

  cells.forEach(cell =>{

  cell.classList.add('disabled')

})

}

disabledCell()

function getPlayersName()

{

  player1_name.value = player1_name.value

  player2_name.value = player2_name.value

  

  localStorage.setItem('firstPlayerName',player1_name.value)

  

  localStorage.setItem('secondPlayerName',player2_name.value)

}

function showPlayersName()

{

let firstPlayerName = localStorage.getItem('firstPlayerName')

let secondPlayerName = localStorage.getItem('secondPlayerName')

if (firstPlayerName) {

  player1_name.value = firstPlayerName

}else {

  player1_name.value = ''

}

if (secondPlayerName) {

  player2_name.value = secondPlayerName

}else {

  player2_name.value = ''

}

}

showPlayersName()

function startCounter()

{

  timer = setInterval(()=>{

   seconds++

   if (seconds == 59) {

     minutes++

     seconds = 0

   }

   timer_wrapper.innerHTML = `

   <span class="material-symbols-outlined">

           timer

         </span>

     ${minutes.toString().padStart(2,'0')} : ${seconds.toString().padStart(2,'0')}

   `

  },1000)

  

}

function startGame() {

  if (player1_name.value === "" || player2_name.value === "") {

    // display a message to enter player names

    alert("Please enter player names before starting the game!");

    return;

  }

  

document.querySelector('.result_container').classList.add('active')

  cells.forEach(cell => {

    cell.classList.remove('disabled')

  });

  getPlayersName();

  startCounter();

  switchPlayer();

  start_btn.classList.add('dis')

}

start_btn.addEventListener('click',startGame)

 for (var i = 0; i < cells.length; i++) {

  cells[i].addEventListener("click", cellClicked);

 }

function cellClicked() {

  if (!gameOver && this.textContent === "") {

    this.textContent = currentPlayer;

    this.classList.add('active')

    if (this.textContent == 'X') {

        this.classList.add('x')

    }else {

      this.classList.add('o')

    }

    movesMade++

    

    checkWin();

    switchPlayer();

  }

}

function switchPlayer() {

  if (currentPlayer === "O") {

    currentPlayer = "X";

    XOTurn.innerHTML = player1_name.value + ' ' +' ' + '(X)'

  } else {

    currentPlayer = "O";

  XOTurn.innerHTML = player2_name.value + ' ' +' ' + '(O)'

  }

}

function checkWin() {

  for (var i = 0; i < winningCombinations.length; i++) {

    if (cells[winningCombinations[i][0]].textContent === currentPlayer &&

        cells[winningCombinations[i][1]].textContent === currentPlayer &&

        cells[winningCombinations[i][2]].textContent === currentPlayer) {

       gameOver = true;

       clearInterval(timer)

       

    if (currentPlayer === 'X') {

       player1Score++ 

      checkWinner(player1Score,player2Score)

      saveScore(player1Score,player2Score) 

       movesMade = 0

      IsWins.innerHTML = player1_name.value + " wins!"

      XOTurn.style.display = 'none'

      player_1_wrapper.innerHTML = `

      <input type="text" name="" id="player1_name" placeholder="player 1 name" value=${player1_name.value}>

   <span id='score1'>${player1Score}</span>

   <span>Time - ${minutes} : ${seconds}</span>

      ` 

     reset_button.classList.remove('dis')

      disabledCell()

     } else {

        player2Score++ 

        movesMade = 0

      checkWinner(player1Score,player2Score)

        XOTurn.style.display = 'none'

     saveScore(player1Score,player2Score) 

       IsWins.innerHTML = player2_name. value+ ' Wins'; 

       reset_button.classList.remove('dis')

       player_2_wrapper.innerHTML = `

      <input type="text" name="" id="player2_name" placeholder="player 1 name" value=${player2_name.value}>

   <span id='score2'>${player2Score}</span>

   <span>Time - ${minutes} : ${seconds}</span>

      `

     disabledCell()

     }

      resetButton.style.display = "block";

      break;

    } if (!gameOver && movesMade == cells.length){

        IsWins.innerHTML = 'It\'s a draw'

        XOTurn.display = 'none'

        movesMade = 0

        draw++

      localStorage.setItem('draw',Number(draw))

        clearInterval(timer)

        gameOver=true;

        reset_button.classList.remove('dis')

    }

  }

}

function checkWinner(firstScore,secondScore)

{

 let firstPlayer =

 localStorage.getItem('firstPlayerName')

 

 let secondPlayer =

 localStorage.getItem('secondPlayerName')

 

  if (firstScore == 3) {

    displayWinner.innerHTML = firstPlayer +' ' + 'Won this Round'

    restartButton.classList.remove('dis')

    IsWins.style.display = 'none'

    resetButton.classList.add('dis')

    displayWinner.classList.add('anim')

    restartButton.classList.remove('dis')

    matchPlayed++

    matchWon++ 

    localStorage.setItem('numberMatchWon',Number(matchWon))

   localStorage.setItem('matchPlayed',Number(matchPlayed))

     player1Score = 0

     player2Score = 0

    localStorage.setItem('player1Score',0)

    localStorage.setItem('player2Score',0)

    dashboard()

  }else if (secondScore == 3){

    displayWinner.innerHTML = secondPlayer + ' ' + 'Won this Round'

     IsWins.style.display = 'none'

    restartButton.classList.remove('dis')

    reset_button.classList.add('dis')

    displayWinner.classList.add('anim')

    matchLoose++

    matchPlayed++

    localStorage.setItem('matchPlayed',Number(matchPlayed))

    localStorage.setItem('matchLoose',matchLoose)

    player1Score = 0

    player2Score = 0

    localStorage.setItem('player1Score',0)

    localStorage.setItem('player2Score',0)

    dashboard()

  }

  

  }

function dashboard()

{

  let retrieveMatchPlayed = 

 localStorage.getItem('matchPlayed') || 0

 

 let retrieveMatchLoose = 

 localStorage.getItem('matchLoose') || 0

 

 let retrieveDraw = 

 localStorage.getItem('draw') || 0

 

 let retrieveMatchWon =

 localStorage.getItem('numberMatchWon') || 0

 

 document.querySelector('#numberMatchPlayed').innerHTML = retrieveMatchPlayed

 

 document.querySelector('#numberMatchLost').innerHTML = retrieveMatchLoose

 

 document.querySelector('#numberDraw').innerHTML = retrieveDraw

 

 document.querySelector('#numberMatchWon').innerHTML = retrieveMatchWon

}

dashboard()

function saveScore(player1Score,player2Score) {

  // save player 1's score

  localStorage.setItem('player1Score', Number(player1Score));

  // save player 2's score

  localStorage.setItem('player2Score', Number(player2Score));

  

  

  let retrieveScore1 = localStorage.getItem('player1Score')

  

let retrieveScore2 = localStorage.getItem('player2Score')

  

  if (retrieveScore1 == 3) {

      checkWinner()

  }else if (retrieveScore1 == 3){

    checkWinner()

  }

  

  

}

function retrieveScore() {

  // retrieve player 1's score

  player1Score = localStorage.getItem('player1Score') || 0;

  // retrieve player 2's score

  player2Score = localStorage.getItem('player2Score') || 0;

  

  player1Name = 

  localStorage.getItem('firstPlayerName')

  player2Name = 

  localStorage.getItem('secondPlayerName')

  

  

  document.querySelector('#score1').textContent = player1Score

  document.querySelector('#score2').textContent = player2Score

  

  

}

retrieveScore()

function restartGame()

{

  window.location.reload(true);

}

restartButton.onclick = restartGame

function resetGame() {

  for (var i = 0; i < cells.length; i++) {

    cells[i].textContent = "";

  }

  minutes = 0 

  seconds = 0

  startCounter()

  gameOver = false;

  

 cells.forEach(cell =>{

  cell.classList.remove('disabled')

  cell.classList.remove('active')

  cell.classList.remove('o')

  cell.classList.remove('x')

})

 XOTurn.style.display = 'block'

 IsWins.innerHTML = ''

reset_button.classList.add('dis')

}

resetButton.addEventListener('click',resetGame)

