// Set up canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// Function to generate random numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate random RGB color
function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// Shape class
class Shape {
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
}

// Ball class extending Shape
class Ball extends Shape {
  constructor(x, y, velX, velY, color, size) {
    super(x, y, velX, velY);
    this.color = color;
    this.size = size;
    this.exists = true;
  }

  draw() {
    if (!this.exists) return;
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    if ((this.x + this.size) >= width || (this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= height || (this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (const ball of balls) {
      if (this !== ball && ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}

// EvilCircle class extending Shape
class EvilCircle extends Shape {
  constructor(x, y) {
    super(x, y, 20, 20);
    this.color = "white";
    this.size = 10;

    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "a":
          this.x -= this.velX;
          break;
        case "d":
          this.x += this.velX;
          break;
        case "w":
          this.y -= this.velY;
          break;
        case "s":
          this.y += this.velY;
          break;
      }
    });
  }

  draw() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }

  checkBounds() {
    if ((this.x + this.size) >= width) {
      this.x = width - this.size;
    }

    if ((this.x - this.size) <= 0) {
      this.x = this.size;
    }

    if ((this.y + this.size) >= height) {
      this.y = height - this.size;
    }

    if ((this.y - this.size) <= 0) {
      this.y = this.size;
    }
  }

  collisionDetect() {
    for (const ball of balls) {
      if (ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.exists = false;
          ballCount--;
          updateBallCount();
        }
      }
    }
  }
}

// Initialize balls and evil circle
const balls = [];
while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    random(size, width - size),
    random(size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );
  balls.push(ball);
}

const evilCircle = new EvilCircle(width / 2, height / 2);

// Ball count tracker
let ballCount = balls.length;
const ballCountDisplay = document.createElement("p");
ballCountDisplay.textContent = `Ball count: ${ballCount}`;
document.body.appendChild(ballCountDisplay);

function updateBallCount() {
  ballCountDisplay.textContent = `Ball count: ${ballCount}`;
}

// Animation loop
function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    if (ball.exists) {
      ball.draw();
      ball.update();
      ball.collisionDetect();
    }
  }

  evilCircle.draw();
  evilCircle.checkBounds();
  evilCircle.collisionDetect();

  requestAnimationFrame(loop);
}

loop();
