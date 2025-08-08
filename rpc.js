// Score tracking and player move history
const score = { wins: 0, losses: 0, ties: 0 };
const playerHistory = { Rock: 0, Paper: 0, Scissors: 0 };

let computerMove = "";
let result = "";

// Taunt messages
const tauntsComputerWins = [
  "You suck!",
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

// Select GIF overlay elements
const gifOverlay = document.querySelector(".gif-overlay");
const resultGif = document.getElementById("result-gif");
const resetBtn = document.querySelector(".reset-btn");

updateScore();

function newGame() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;

  playerHistory.Rock = 0;
  playerHistory.Paper = 0;
  playerHistory.Scissors = 0;

  updateScore();
  clearDuel();

  document.querySelector(".picks").style.display = "flex";
  resetBtn.style.display = "none";

  // Hide GIF overlay on new game start
  gifOverlay.style.display = "none";
  resultGif.src = "";
}

function playGame(playerMove) {
  if (score.wins >= 3 || score.losses >= 3) return;

  playerHistory[playerMove]++;

  pickComputerMove();

  if (playerMove === "Scissors") {
    result =
      computerMove === "Rock"
        ? "You Lose."
        : computerMove === "Paper"
        ? "You Win."
        : "Tie.";
  } else if (playerMove === "Rock") {
    result =
      computerMove === "Paper"
        ? "You Lose."
        : computerMove === "Scissors"
        ? "You Win."
        : "Tie.";
  } else if (playerMove === "Paper") {
    result =
      computerMove === "Scissors"
        ? "You Lose."
        : computerMove === "Rock"
        ? "You Win."
        : "Tie.";
  }

  if (result === "You Win.") score.wins++;
  else if (result === "You Lose.") score.losses++;
  else score.ties++;

  updateScore();

  let tauntMessage = "";
  if (result === "You Lose.") {
    tauntMessage =
      tauntsComputerWins[
        Math.floor(Math.random() * tauntsComputerWins.length)
      ];
  } else if (result === "You Win.") {
    tauntMessage =
      tauntsPlayerWins[Math.floor(Math.random() * tauntsPlayerWins.length)];
  } else {
    tauntMessage = tauntsTie[Math.floor(Math.random() * tauntsTie.length)];
  }

  // Capitalize player name
  const rawName = getQueryParam("player") || "Player";
  const playerName = capitalizeName(rawName);

  document.querySelector(
    ".js-moves"
  ).innerHTML = `${playerName} The Undying ${getMoveIcon(
    playerMove
  )} VS ${getMoveIcon(computerMove)} Genichiro Ashina`;

  document.querySelector(".js-result").innerHTML = result;
  document.querySelector(".js-taunt").innerText = tauntMessage;

  // SHOW GIF based on result
  if (result === "You Win.") {
    resultGif.src = "https://media.tenor.com/0u8rbO7y8LgAAAAd/revenge.gif";
    gifOverlay.style.display = "block";
  } else if (result === "You Lose.") {
    resultGif.src = "https://media.tenor.com/7577620470218150413.gif";
    gifOverlay.style.display = "block";
  } else {
    // Hide GIF on tie
    gifOverlay.style.display = "none";
    resultGif.src = "";
  }

  // End game conditions
  if (score.wins >= 3 || score.losses >= 3) {
    document.querySelector(".picks").style.display = "none";
    resetBtn.style.display = "block";
    document.querySelector(".js-result").innerHTML =
      score.wins >= 3 ? "🎉 You Win the Match!" : "💀 You Lost the Match!";
  }
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
  computerMove =
    predicted === "Rock"
      ? "Paper"
      : predicted === "Paper"
      ? "Scissors"
      : "Rock";
}

function clearDuel() {
  document.querySelector(".js-moves").innerHTML = "";
  document.querySelector(".js-result").innerHTML = "";
  document.querySelector(".js-taunt").innerText = "";
}

function updateScore() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`;
}

function getQueryParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

function capitalizeName(name) {
  if (!name) return "Player";
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}
