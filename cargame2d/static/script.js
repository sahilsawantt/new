let car = document.getElementById("car");
let gameArea = document.getElementById("gameArea");
let score = document.getElementById("score");
let gameOver = document.getElementById("gameOver");
let submitBtn = document.getElementById("submitBtn");
let playerName = document.getElementById("PlayerName");
let restartBtn = document.getElementById("restartBtn");

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

document.addEventListener("keydown", (e) => {
    keys[e.key] = true;
});

document.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});

function moveLines() {
    lines.forEach((line) => {
        let top = parseInt(line.style.top);
        if (top >= 600) top = -100;
        line.style.top = top + player.speed + "px";
    });
}

function moveEnemies() {
    enemies.forEach((enemy) => {
        let top = parseInt(enemy.style.top);
        if (top >= 600) {
            top = -100;
            enemy.style.left = Math.floor(Math.random() * 350) + "px";
        }
        enemy.style.top = top + player.speed + "px";

        if (isCollide(car, enemy)) {
            player.start = false;
            gameOver.style.display = "block";
        }
    });
}

function isCollide(a, b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();
    return !(
        aRect.bottom < bRect.top ||
        aRect.top > bRect.bottom ||
        aRect.right < bRect.left ||
        aRect.left > bRect.right
    );
}

function gamePlay() {
    if (!player.start) return;

    moveLines();
    moveEnemies();

    // Movement fix
    let carLeft = parseInt(car.style.left) || 175;

    if (keys["ArrowLeft"] && carLeft > 0)
        car.style.left = carLeft - player.speed + "px";

    if (keys["ArrowRight"] && carLeft < 350)
        car.style.left = carLeft + player.speed + "px";

    // Slower score update
    scoreCounter++;
    if (scoreCounter % 10 === 0) {
        player.score++;
        score.innerText = "Score: " + player.score;
    }

    requestAnimationFrame(gamePlay);
}

function startGame() {
    player.start = true;
    player.score = 0;
    scoreCounter = 0;

    car.style.left = "175px";

    enemies.forEach((enemy, index) => {
        enemy.style.top = (index + 1) * -150 + "px";
        enemy.style.left = Math.floor(Math.random() * 350) + "px";
    });

    lines.forEach((line, index) => {
        line.style.top = index * 150 + "px";
        line.style.left = "195px";
    });

    gameOver.style.display = "none";
    requestAnimationFrame(gamePlay);
}

submitBtn?.addEventListener("click", () => {
    fetch("/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: playerName.value, score: player.score }),
    })
        .then((res) => res.json())
        .then((data) => {
            alert(data.message);
        });
});

restartBtn?.addEventListener("click", startGame);
window.onload = startGame;