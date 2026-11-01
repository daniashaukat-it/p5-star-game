let basketX;
let basketWidth = 90;
let basketHeight = 20;

let starX, starY;
let starSize = 25;
let starSpeed = 4;

let score = 0;
let lives = 3;

function setup() {
  createCanvas(600, 400);
  basketX = width / 2 - basketWidth / 2;
  resetStar();
}

function draw() {
  background(22, 27, 34); // Dark futuristic background

  // Game Over Condition
  if (lives <= 0) {
    textSize(36);
    fill(255, 100, 100);
    textAlign(CENTER, CENTER);
    text("GAME OVER", width / 2, height / 2 - 20);
    
    textSize(18);
    fill(200);
    text("Press 'R' to Restart", width / 2, height / 2 + 30);
    return;
  }

  // Basket Movement (Left / Right Arrow Keys)
  if (keyIsDown(LEFT_ARROW)) {
    basketX -= 7;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    basketX += 7;
  }

  // Screen boundaries check for basket
  basketX = constrain(basketX, 0, width - basketWidth);

  // Fall down logic for star
  starY += starSpeed;

  // Collision Detection (Catching Star)
  if (
    starY + starSize / 2 >= height - basketHeight &&
    starX >= basketX &&
    starX <= basketX + basketWidth
  ) {
    score++;
    starSpeed += 0.15; // Speed increases gradually
    resetStar();
  }

  // Missed star check
  if (starY > height) {
    lives--;
    resetStar();
  }

  // Draw Basket (Player Paddle)
  fill(88, 166, 255); // Neon Blue
  noStroke();
  rect(basketX, height - basketHeight, basketWidth, basketHeight, 8);

  // Draw Falling Star
  fill(255, 215, 0); // Gold / Yellow
  ellipse(starX, starY, starSize, starSize);

  // Draw UI / Score & Lives Text
  textSize(16);
  fill(255);
  text("Score: " + score, 20, 30);
  text("Lives: " + lives, width - 80, 30);
}

// Reset Star to top at random horizontal position
function resetStar() {
  starX = random(starSize, width - starSize);
  starY = 0;
}

// Restart game on 'R' keypress after Game Over
function keyPressed() {
  if ((key === 'r' || key === 'R') && lives <= 0) {
    score = 0;
    lives = 3;
    starSpeed = 4;
    resetStar();
  }
}