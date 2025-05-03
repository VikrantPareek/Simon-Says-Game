let level = 0;
let userFlash = [];
let gameFlash = [];
let highScore = 0;
let started = false;

const colors = ["pink", "blue", "orange", "purple"];
const heading = document.querySelector("h3");

document.addEventListener("keydown", function () {
  if (!started) {
    heading.innerText = `Level ${level + 1}`;
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  userFlash = [];

  const randomColor = colors[Math.floor(Math.random() * 4)];
  gameFlash.push(randomColor);

  // Flash the new color
  flashButton(randomColor);

  level++;
  high()
}

function high(){
  const score = document.querySelector("h2");
  heading.innerText = `Level ${level}`;
  if(highScore < level){
    highScore = level;
    score.innerText = `High Score : ${highScore}`;
  }
}

function flashButton(color) {
  const btn = document.querySelector(`.${color}`);
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 200);
}

function gameOver() {
  document.body.classList.add("game-over");
  setTimeout(() => {
    document.body.classList.remove("game-over");
  }, 200);
  heading.innerText = `Game Over! Your score was ${level}. Press any key to restart.`;
  resetGame();
}

function resetGame() {
  level = 0;
  gameFlash = [];
  userFlash = [];
  started = false;
}

document.querySelectorAll(".pink, .blue, .orange, .purple").forEach(btn => {
  btn.addEventListener("click", function () {
    const colorClicked = this.classList[0];
    userFlash.push(colorClicked);
    flashButton(colorClicked);
    checkAnswer(userFlash.length - 1);
  });
});

function checkAnswer(index) {
  if (userFlash[index] !== gameFlash[index]) {
    gameOver();
    return;
  }

  if (userFlash.length === gameFlash.length) {
    setTimeout(() => {
      nextSequence();
    }, 1000);
  }
}
