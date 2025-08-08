const score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

const playerHistory = {
  Rock: 0,
  Paper: 0,
  Scissors: 0,
};

updateScore();

let computerMove = "";
let result = "";

function reset() {
  const msgElm = document.querySelector(".resetMess");
  msgElm.innerHTML = "Score Reset Successfully!";
  msgElm.classList.add("show");

  setTimeout(() => {
    msgElm.classList.remove("show");
    setTimeout(() => {
      msgElm.innerHTML = "";
    }, 500);
  }, 2000);

  clearDuel();
}

function playGame(playerMove) {
  playerHistory[playerMove]++; 
  pickComputerMove(); 

  if (playerMove === "Scissors") {
    if (computerMove === "Rock") result = "You Lose.";
    else if (computerMove === "Paper") result = "You Win.";
    else result = "Tie.";
  } else if (playerMove === "Rock") {
    if (computerMove === "Rock") result = "Tie.";
    else if (computerMove === "Paper") result = "You Lose.";
    else result = "You Win.";
  } else if (playerMove === "Paper") {
    if (computerMove === "Rock") result = "You Win.";
    else if (computerMove === "Paper") result = "Tie.";
    else result = "You Lose.";
  }

  if (result === "You Win.") score.wins++;
  else if (result === "You Lose.") score.losses++;
  else score.ties++;

  localStorage.setItem("score", JSON.stringify(score));
  updateScore();

  document.querySelector(".js-moves").innerHTML = `You ${getMoveIcon(
    playerMove
  )} VS ${getMoveIcon(computerMove)} Computer`;
  document.querySelector(".js-result").innerHTML = result;
}

// Get image for move
function getMoveIcon(move) {
  if (move === "Rock") {
    return `<img src="https://img.icons8.com/?size=100&id=16486&format=png&color=000000" class="icon small" alt="Rock">`;
  } else if (move === "Paper") {
    return `<img src="https://img.icons8.com/?size=100&id=2727&format=png&color=000000" class="icon small" alt="Paper">`;
  } else if (move === "Scissors") {
    return `<img src="https://img.icons8.com/?size=100&id=44377&format=png&color=000000" class="icon small" alt="Scissors">`;
  }
}

function pickComputerMove() {
  if (Math.random() < 0.2) {
    const random = Math.floor(Math.random() * 3);
    computerMove = ["Rock", "Paper", "Scissors"][random];
    return;
  }

  const predicted = Object.keys(playerHistory).reduce((a, b) =>
    playerHistory[a] > playerHistory[b] ? a : b
  );

  if (predicted === "Rock") computerMove = "Paper";
  else if (predicted === "Paper") computerMove = "Scissors";
  else computerMove = "Rock";
}

function clearDuel() {
  document.querySelector(".js-moves").innerHTML = "";
  document.querySelector(".js-result").innerHTML = "";
}

function updateScore() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins:${score.wins} Losses:${score.losses} Ties:${score.ties}`;
}
