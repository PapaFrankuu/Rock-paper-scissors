const score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

const moveAfter = JSON.parse(localStorage.getItem("moveAfter")) || {
  Rock: { Rock: 0, Paper: 0, Scissors: 0 },
  Paper: { Rock: 0, Paper: 0, Scissors: 0 },
  Scissors: { Rock: 0, Paper: 0, Scissors: 0 },
};

let lastPlayerMove = JSON.parse(localStorage.getItem("lastPlayerMove")) || null;

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
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.setItem("score", JSON.stringify(score));

  // Clear pattern history
  for (const move of ["Rock", "Paper", "Scissors"]) {
    for (const nextMove of ["Rock", "Paper", "Scissors"]) {
      moveAfter[move][nextMove] = 0;
    }
  }
  lastPlayerMove = null;

  localStorage.setItem("moveAfter", JSON.stringify(moveAfter));
  localStorage.setItem("lastPlayerMove", JSON.stringify(lastPlayerMove));

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
  updatePattern(playerMove);
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


function updatePattern(currentMove) {
  if (lastPlayerMove !== null) {
    moveAfter[lastPlayerMove][currentMove]++;
    localStorage.setItem("moveAfter", JSON.stringify(moveAfter));
  }
  lastPlayerMove = currentMove;
  localStorage.setItem("lastPlayerMove", JSON.stringify(lastPlayerMove));
}

function predictNextMove() {
  if (lastPlayerMove === null) {
    const moves = ["Rock", "Paper", "Scissors"];
    return moves[Math.floor(Math.random() * 3)];
  }

  const nextMoves = moveAfter[lastPlayerMove];
  let predicted = "Rock";
  for (const move of ["Rock", "Paper", "Scissors"]) {
    if (nextMoves[move] > nextMoves[predicted]) {
      predicted = move;
    }
  }
  return predicted;
}

function pickComputerMove() {
  if (Math.random() < 0.2) {
    const moves = ["Rock", "Paper", "Scissors"];
    computerMove = moves[Math.floor(Math.random() * 3)];
    return;
  }

  const predictedPlayerMove = predictNextMove();

  if (predictedPlayerMove === "Rock") computerMove = "Paper";
  else if (predictedPlayerMove === "Paper") computerMove = "Scissors";
  else computerMove = "Rock";
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

window.onload = () => {
  const storedMoveAfter = localStorage.getItem("moveAfter");
  const storedLastPlayerMove = localStorage.getItem("lastPlayerMove");

  if (storedMoveAfter) {
    Object.assign(moveAfter, JSON.parse(storedMoveAfter));
  }
  if (storedLastPlayerMove) {
    lastPlayerMove = JSON.parse(storedLastPlayerMove);
  }
};
