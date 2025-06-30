const gameArea = document.getElementById("gameArea");
const playerCar = document.getElementById("playerCar");
let score = 0;
let currentLane = 1;
const lanePositions = [30, 120, 210];

// Move player car
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && currentLane > 0) {
    currentLane--;
    playerCar.style.left = lanePositions[currentLane] + "px";
  } else if (e.key === "ArrowRight" && currentLane < 2) {
    currentLane++;
    playerCar.style.left = lanePositions[currentLane] + "px";
  }
});

// Spawn enemy cars
function spawnEnemy() {
  const enemy = document.createElement("div");
  enemy.classList.add("enemy");
  const lane = Math.floor(Math.random() * 3);
  enemy.style.left = lanePositions[lane] + "px";
  gameArea.appendChild(enemy);

  let enemyTop = -100;
  const moveEnemy = setInterval(() => {
    if (enemyTop > 500) {
      clearInterval(moveEnemy);
      enemy.remove();
    } else {
      enemyTop += 5;
      enemy.style.top = enemyTop + "px";

      // Collision Detection
      const playerRect = playerCar.getBoundingClientRect();
      const enemyRect = enemy.getBoundingClientRect();

      if (
        enemyRect.top < playerRect.bottom &&
        enemyRect.bottom > playerRect.top &&
        enemyRect.left === playerRect.left
      ) {
        clearInterval(moveEnemy);
        clearInterval(spawnInterval);
        clearInterval(scoreInterval);

        document.getElementById("finalScore").innerText = score;
        document.getElementById("gameOverScreen").style.display = "block";
      }
    }
  }, 20);
}

// Start game loops
const spawnInterval = setInterval(spawnEnemy, 1500);
const scoreInterval = setInterval(() => {
  score++;
  document.getElementById("score").innerText = "Score: " + score;
}, 1000);

// 👇 Mobile detect kar ke control buttons dikhaye
if (/Mobi|Android/i.test(navigator.userAgent)) {
  document.getElementById("controls").style.display = "block";
}

document.getElementById("controls").style.display = "block";



function moveLeft() {
  if (currentLane > 0) {
    currentLane--;
    playerCar.style.left = lanePositions[currentLane] + "px";
  }
}

function moveRight() {
  if (currentLane < 2) {
    currentLane++;
    playerCar.style.left = lanePositions[currentLane] + "px";
  }
}
