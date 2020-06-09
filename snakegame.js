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

// Get the canvas element
var gameCanvas = document.getElementById("gameCanvas");

// Return a 2-dimensional drawing context
var ctx = gameCanvas.getContext("2d");


// Begin the game
main();

// Main function
function main() {
    setTimeout(function onTick() {
        clearCanvas();
        advanceSnake();
        drawSnake();
        // Call main again
        main();
    }, 100)
}
document.addEventListener("keydown", changeDirection);

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
    snake.pop();
}

// Function to handle the user input
function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;
    const keyPressed = event.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;

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
    if (keyPressed === DOWN_KEY && !goingDown) {
        dx = 0;
        dy = 10;
    }
}