let car = document.getElementById("car");
let gameArea = document.getElementById("gameArea");
let score = document.getElementById("score");
let gameOver = document.getElementById("gameOver");
let submitBtn = document.getElementById("submitBtn");
let playerName = document.getElementById("PlayerName");
let restartBtn = document.getElementById("restartBtn");

const bgSound = new Audio("/static/sounds/bg.mp3");
bgSound.loop = true;
bgSound.volume = 0.4;

const carSound = new Audio("/static/sounds/car.mp3");
carSound.volume = 0.6;

let enemies = [
    document.getElementById("enemy1"),
    document.getElementById("enemy2"),
    document.getElementById("enemy3")
];

let lines = [
    document.getElementById("line1"),
    document.getElementById("line2"),
    document.getElementById("line3")
];

let player = { speed: 5, score: 0, start: false };
let keys = {};
let scoreCounter = 0;
let speedIncrement = 0.002;
let maxSpeed = 10;
let bgStarted = false;

// 🎵 Sound only starts after game starts
document.getElementById("gameArea").addEventListener("click", () => {
    if (!player.start) {
        startGame();
    }
});

// ⌨️ Controls
document.addEventListener("keydown", (e) => {
    keys[e.key] = true;

    if (["ArrowLeft", "ArrowRight"].includes(e.key) && player.start) {
        carSound.currentTime = 0;
        carSound.play().catch(() => {});
    }
});

document.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});

// 🛣️ Road
function moveLines() {
    lines.forEach((line) => {
        let top = parseInt(line.style.top);
        if (top >= 600) top = -100;
        line.style.top = top + player.speed + "px";
    });
}

// 🚗 Enemies
function moveEnemies() {
    enemies.forEach((enemy) => {
        let top = parseInt(enemy.style.top);
        if (top >= 600) {
            top = -100;
            enemy.style.left = Math.floor(Math.random() * 350) + "px";
        }
        enemy.style.top = top + player.speed + "px";

        if (isCollide(car, enemy)) {
            endGame();
        }
    });
}

function isCollide(a, b) {
    const aRect = a.getBoundingClientRect();
    const bRect = b.getBoundingClientRect();
    const buffer = 25;

    return !(
        aRect.bottom - buffer < bRect.top ||
        aRect.top + buffer > bRect.bottom ||
        aRect.right - buffer < bRect.left ||
        aRect.left + buffer > bRect.right
    );
}

function gamePlay() {
    if (!player.start) return;

    if (player.speed < maxSpeed) player.speed += speedIncrement;

    moveLines();
    moveEnemies();

    let carLeft = parseInt(car.style.left) || 175;
    if (keys["ArrowLeft"] && carLeft > 0) car.style.left = carLeft - player.speed + "px";
    if (keys["ArrowRight"] && carLeft < 350) car.style.left = carLeft + player.speed + "px";

    scoreCounter++;
    if (scoreCounter % 10 === 0) {
        player.score++;
        score.innerText = "Score: " + player.score;
    }

    requestAnimationFrame(gamePlay);
}

// ▶️ Start Game

function startGame() {
 
if (player.start) return;

    player = { speed: 5, score: 0, start: true };
    scoreCounter = 0;
    score.innerText = "Score: 0";
    car.style.left = "175px";
    car.style.bottom = "10px";

    enemies.forEach((enemy, index) => {
        enemy.style.top = (index + 1) * -150 + "px";
        enemy.style.left = Math.floor(Math.random() * 350) + "px";
    });

    lines.forEach((line, index) => {
        line.style.top = index * 150 + "px";
        line.style.left = "195px";
    });

    gameOver.style.display = "none";

    if (!bgStarted) {
        bgSound.play().catch(() => {});
        bgStarted = true;
    }

    requestAnimationFrame(gamePlay);
}

// 💥 End Game
function endGame() {
    player.start = false;
    gameOver.style.display = "block";

    bgSound.pause();
    bgSound.currentTime = 0;
    bgStarted = false;

    carSound.pause();
    carSound.currentTime = 0;
}

// 📤 Submit
submitBtn?.addEventListener("click", () => {
    fetch("/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: playerName.value, score: player.score }),
    })
        .then((res) => res.json())
        .then((data) => alert(data.message));
});

// 🔁 Restart
restartBtn?.addEventListener("click", () => {
    console.log("Restart clicked");
    startGame();
});