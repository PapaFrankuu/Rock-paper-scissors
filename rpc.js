const score = {
  wins: 0,
  losses: 0,
  ties: 0
};
localStorage.removeItem("score");

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
      }
      const moveRockImg = document.querySelector(".rock");
      const movePaperImg = document.querySelector(".paper");
      const moveScissorsImg = document.querySelector(".scissors");

      function playGame(playerMove) {
        pickComputerMove();
        if (playerMove === "Scissors") {
          if (computerMove === "Rock") {
            result = "You Lose.";
          } else if (computerMove === "Paper") {
            result = "You Win.";
          } else if (computerMove === "Scissors") {
            result = "Tie.";
          }
        } else if (playerMove === "Rock") {
          if (computerMove === "Rock") {
            result = "Tie.";
          } else if (computerMove === "Paper") {
            result = "You Lose.";
          } else if (computerMove === "Scissors") {
            result = "You Win.";
          }
        } else if (playerMove === "Paper") {
          if (computerMove === "Rock") {
            result = "You Win.";
          } else if (computerMove === "Paper") {
            result = "Tie.";
          } else if (computerMove === "Scissors") {
            result = "You Lose.";
          }
        }
        if (result === "You Win.") {
          score.wins += 1;
        } else if (result === "You Lose.") {
          score.losses += 1;
        } else if (result === "Tie.") {
          score.ties += 1;
        }
        localStorage.setItem("score", JSON.stringify(score));

        updateScore();

        document.querySelector(".js-moves").innerHTML = `You ${getMoveIcon(
          playerMove
        )}VS${getMoveIcon(computerMove)} Computer`;
        document.querySelector(".js-result").innerHTML = result;
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
        const randomNumber = Math.random();
        if (randomNumber >= 0 && randomNumber < 1 / 3) {
          computerMove = "Rock";
        } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
          computerMove = "Paper";
        } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
          computerMove = "Scissors";
        }
      }
      function clearDuel() {
        document.querySelector(".js-moves").innerHTML = "";
        document.querySelector(".js-result").innerHTML = "";
      }
      function removeResultAfterReset() {}
      function updateScore() {
        document.querySelector(
          ".js-score"
        ).innerHTML = `Wins:${score.wins} Losses:${score.losses} Ties:${score.ties}`;
      }
