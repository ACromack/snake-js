// Constants
const CANVAS_BORDER_COLOUR = "black";
const CANVAS_BACKGROUND_COLOUR = "white";
const SNAKE_FILL_COLOUR = "lightgreen";
const SNAKE_OUTLINE_COLOUR = "darkgreen";

// Initial snake setup coordinates
let snake = [
    {x: 150, y: 150},
    {x: 140, y: 150},
    {x: 130, y: 150},
    {x: 120, y: 150},
    {x: 110, y: 150},
];

// Velocity of Snake - X Y
let dx = 10;
let dy = 0;

// Score
let score = 0;

// Get the canvas element
var gameCanvas = document.getElementById("gameCanvas");

// Return a 2-dimensional drawing context
var ctx = gameCanvas.getContext("2d");


// Begin the game
main();
// Create the first bit of food
createFood();
// Add listener for keyboard events (keydown)
document.addEventListener("keydown", changeDirection);

// Main function
function main() {

    if (didGameEnd()){
        document.getElementById("score").innerHTML = "END GAME - SCORE: " + score;
        return;
    }

    setTimeout(function onTick() {
        changingDirection = false;
        clearCanvas();
        drawFood();
        advanceSnake();
        drawSnake();
        // Call main again
        main();
    }, 60)
}


// Function to draw the background
function clearCanvas() {
    ctx.fillStyle = CANVAS_BACKGROUND_COLOUR;
    ctx.strokeStyle = CANVAS_BORDER_COLOUR;

    // Draw a "filled" rectangle to cover the entire canvas
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    // Draw a "border" around the entire canvas
    ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}

// Function to draw rect for each pair of coordinates
function drawSnakePart(snakePart) {
    ctx.fillStyle = SNAKE_FILL_COLOUR;
    ctx.strokeStyle = SNAKE_OUTLINE_COLOUR;

    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

// Draws the snake on the canvas
function drawSnake() {
    // Loop through each of the snake parts and draw
    snake.forEach(drawSnakePart);
}

// Function for moving the snake
function advanceSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);

    const didEatFood = snake[0].x === foodX && snake[0].y === foodY;
    if (didEatFood) {
        score += 10;
        document.getElementById("score").innerHTML = score;
        
        createFood();
    } else {
        snake.pop();
    }
}

// Function to handle the user input
function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    if(changingDirection) return;

    changingDirection = true;

    const keyPressed = event.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;


    if (keyPressed === 82) {
        resetGame();
    }

    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -10;
        dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -10;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 10;
        dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 10;
    }
}

// Function to draw the food
function drawFood() {
    ctx.fillStyle = "red";
    ctx.strokeStyle = "darkred";
    ctx.fillRect(foodX, foodY, 10, 10);
    ctx.strokeRect(foodX, foodY, 10, 10);
}

function randomTen(min, max) {
    return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}

function createFood() {
    // Generate a random number the food x-coordinate
    foodX = randomTen(0, gameCanvas.width - 10);
    // Generate a random number for the food y-coordinate
    foodY = randomTen(0, gameCanvas.height - 10);

    // if the new food location is where the snake currently is, generate a new food location
    snake.forEach(function isOnSnake(part) {
      if (part.x == foodX && part.y == foodY) createFood();
    });
}

function didGameEnd() {
    for (let i = 4; i < snake.length; i++) {
      const didCollide = snake[i].x === snake[0].x &&
        snake[i].y === snake[0].y
      if (didCollide) return true
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > gameCanvas.width - 10;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > gameCanvas.height - 10;
    return hitLeftWall || 
           hitRightWall || 
           hitToptWall ||
           hitBottomWall
}

function resetGame() {
    snake = [
        {x: 150, y: 150},
        {x: 140, y: 150},
        {x: 130, y: 150},
        {x: 120, y: 150},
        {x: 110, y: 150},
    ];

    didCollide = false;
    hitLeftWall = false;
    hitRightWall = false; 
    hitToptWall = false;
    hitBottomWall = false;

    dx = 10;
    dy = 0;

    score = 0;
    document.getElementById("score").innerHTML = "SCORE: " + score;

    main();
}