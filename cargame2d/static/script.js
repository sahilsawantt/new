const car = document.getElementById("car");
const enemies = [document.getElementById("enemy1"), document.getElementById("enemy2"), document.getElementById("enemy3")];
const lines = [document.getElementById("line1"), document.getElementById("line2"), document.getElementById("line3")];
const scoreDisplay = document.getElementById("score");
const gameOverScreen = document.getElementById("gameOver");
const restartBtn = document.getElementById("restartBtn");
const submitBtn = document.getElementById("submitBtn");

let carX = 175;
let score = 0;
let enemySpeed = 5;
let lineSpeed = 6;
let gameRunning = true;

function randomX() {
  return Math.floor(Math.random() * 7) * 50;
}

enemies.forEach((e, i) => {
  e.style.left = randomX() + "px";
  e.style.top = (-i * 200) + "px";
});

lines.forEach((l, i) => {
  l.style.top = (i * 200) + "px";
});

function updateGame() {
  if (!gameRunning) return;

  enemies.forEach(enemy => {
    let top = parseInt(enemy.style.top);
    top += enemySpeed;
    if (top > 600) {
      top = -100;
      enemy.style.left = randomX() + "px";
      score++;
      scoreDisplay.innerText = "Score: " + score;
      if (score % 10 === 0) enemySpeed++;
    }
    enemy.style.top = top + "px";

    if (top + 100 >= 500 && top <= 600 &&
        parseInt(enemy.style.left) < carX + 50 &&
        parseInt(enemy.style.left) + 50 > carX) {
      gameRunning = false;
      gameOverScreen.style.display = "block";
    }
  });

  lines.forEach(line => {
    let top = parseInt(line.style.top);
    top += lineSpeed;
    if (top > 600) top = -80;
    line.style.top = top + "px";
  });

  requestAnimationFrame(updateGame);
}

document.addEventListener("keydown", (e) => {
  if (!gameRunning) return;
  if (e.key === "ArrowLeft" && carX > 0) carX -= 50;
  if (e.key === "ArrowRight" && carX < 350) carX += 50;
  car.style.left = carX + "px";
});

restartBtn.onclick = () => window.location.reload();

submitBtn.onclick = () => {
  const name = document.getElementById("playerName").value;
  fetch("/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, score })
  })
  .then(res => res.json())
  .then(data => {
    alert("Score saved!");
  });
};

updateGame();