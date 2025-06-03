let car = document.getElementById("car");
let gameArea = document.getElementById("gameArea");
let score = document.getElementById("score");
let gameOver = document.getElementById("gameOver");
let submitBtn = document.getElementById("submitBtn");
let playerName = document.getElementById("PlayerName");
let restartBtn = document.getElementById("restartBtn");

// 🎵 Sound setup
const bgSound = new Audio("/static/sounds/bg.mp3");
bgSound.loop = true;
bgSound.volume = 0.5;



const carSound = new Audio("/static/sounds/car.mp3");
carSound.volume = 0.5;



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

// 🎵 Play background music on first user click
// window.addEventListener("click", () => {
//     if (player.start) {
//         bgSound.play().catch(err => console.log("BG Sound error:", err));
//     }
// }, { once: true });



let bgstarted = false;

window.addEventListener("click", () => {
    if (!bgstarted) {
        bgSound.play().then(() => {
            bgstarted = true
        }) .catch(err => 
            console.logI("bg sound erroe:", err));
        }
    });

// ⌨️ Keyboard input
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

// 🛣️ Move road lines
function moveLines() {
    lines.forEach((line) => {
        let top = parseInt(line.style.top);
        if (top >= 600) top = -100;
        line.style.top = top + player.speed + "px";
    });
}

// 🚗 Move enemy cars
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
            bgSound.pause();
            bgSound.currentTime = 0;
            bgstarted = false;
            carSound.pause();
           carSound.currentTime = 0;  

        }
    });
}

// 🚨 Collision detection
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

// 🕹️ Game play loop
function gamePlay() {
    if (!player.start) return;

    moveLines();
    moveEnemies();

    let carLeft = parseInt(car.style.left) || 175;

    if (keys["ArrowLeft"] && carLeft > 0) {
        car.style.left = carLeft - player.speed + "px";
    }

    if (keys["ArrowRight"] && carLeft < 350) {
        car.style.left = carLeft + player.speed + "px";
    }

    scoreCounter++;
    if (scoreCounter % 10 === 0) {
        player.score++;
        score.innerText = "Score: " + player.score;
    }

    requestAnimationFrame(gamePlay);
}

// ▶️ Start game
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
    bgSound.play().catch(err => console.log("BG Sound start error:", err));
    requestAnimationFrame(gamePlay); 

window.addEventListener("click", () => {
  bgSound.play()
    .then(() => console.log("BG music started"))
    .catch(err => console.log("BG Sound play error:", err));
}, { once: true });

}

// 📤 Submit score to backend
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

// 🔁 Restart game
restartBtn?.addEventListener("click", startGame);

// ✅ Start automatically
window.onload = startGame;