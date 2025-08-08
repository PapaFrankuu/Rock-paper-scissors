const score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

const playerHistory = JSON.parse(localStorage.getItem("history")) || {
  Rock: 0,
  Paper: 0,
  Scissors: 0,
};

updateScore();

let computerMove = "";
let result = "";

const tauntsComputerWins = [
  "You suck, mama's boy!",
  "Skill issue, lmao!",
  "Get good!",
  "Try harder next time!",
  "Is that all you've got?",
];

const tauntsPlayerWins = [
  "Damn, how?! Only one time!",
  "Lucky shot!",
  "Don't get cocky!",
  "You're messing with fire!",
  "No way, you won!",
];

const tauntsTie = [
  "We think the same!",
  "Great minds think alike!",
  "So close!",
  "Match made in heaven!",
  "It's a stalemate!",
];

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

  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.setItem("score", JSON.stringify(score));

  playerHistory.Rock = 0;
  playerHistory.Paper = 0;
  playerHistory.Scissors = 0;
  localStorage.setItem("history", JSON.stringify(playerHistory));

  updateScore();
  clearDuel();

  document.querySelector(".js-taunt").innerText = "";
}

function playGame(playerMove) {
  // Update history
  playerHistory[playerMove]++;
  localStorage.setItem("history", JSON.stringify(playerHistory));

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

  let tauntMessage = "";
  if (result === "You Lose.") {
    tauntMessage =
      tauntsComputerWins[Math.floor(Math.random() * tauntsComputerWins.length)];
  } else if (result === "You Win.") {
    tauntMessage =
      tauntsPlayerWins[Math.floor(Math.random() * tauntsPlayerWins.length)];
  } else {
    tauntMessage = tauntsTie[Math.floor(Math.random() * tauntsTie.length)];
  }

  document.querySelector(".js-moves").innerHTML = `You ${getMoveIcon(
    playerMove
  )} VS ${getMoveIcon(computerMove)} Computer`;
  document.querySelector(".js-result").innerHTML = result;
  document.querySelector(".js-taunt").innerText = tauntMessage;
}

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
  document.querySelector(".js-taunt").innerText = "";
}

function updateScore() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins:${score.wins} Losses:${score.losses} Ties:${score.ties}`;
}
