var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d"); 
var dx = 0;
var dy = 0;
var snakeWidth = 20;
var snakeHeight = 20;
var snakeX = 2.5;
var snakeY = 2.5;
var foodX = 112.5;
var foodY = 112.5;
var foodRadius = 8;
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var score = 0;
var snakeQx = [];
var snakeQy = [];
var headX = 25;
var headY = 25;
var tailX = 25;
var tailY = 25;
var count = 0;
var change = false;


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
    else if(e.keyCode == 38) {
        upPressed = true;
    }
    else if(e.keyCode == 40) {
        downPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
    else if(e.keyCode == 38) {
        upPressed = false;
    }
    else if(e.keyCode == 40) {
        downPressed = false;
    }
}

function drawHead(x, y) {
    ctx.beginPath();
    ctx.rect(x, y, snakeWidth, snakeHeight);
         if(y > 0 && y < 99){ctx.fillStyle = "#FF0000";}
    else if(y > 99 && y < 174){ctx.fillStyle = "#FF8000";}
    else if(y > 174 && y < 249){ctx.fillStyle = "#FFFF00";}
    else if(y > 249 && y < 324){ctx.fillStyle = "#008000";}
    else if(y > 324 && y < 399){ctx.fillStyle = "#0000FF";}
    else if(y > 399 && y < 500){ctx.fillStyle = "#A000C0";}
    else {ctx.fillStyle = "black";}
    ctx.fill();
    ctx.closePath();
}

function drawFood() {
    ctx.beginPath();
    ctx.arc(foodX, foodY, foodRadius, 0, Math.PI*2);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}

function clearTail() {
    ctx.clearRect(tailX, tailY, snakeWidth, snakeHeight);
}

function snakeEat() {
    if(snakeX + snakeWidth / 2 < foodX + foodRadius && snakeX + snakeWidth / 2  > foodX - foodRadius && snakeY + snakeHeight / 2 < foodY + foodRadius && snakeY + snakeHeight / 2 > foodY - foodRadius){
        foodX = Math.floor((Math.random() * 19) + 1) * 25 + 12.5;
        foodY = Math.floor((Math.random() * 19) + 1) * 25 + 12.5;
        snakeQx.push(snakeX);
        snakeQy.push(snakeY);
    }
}

function checkCollision(){
    for(var i = 0; i < snakeQx.length - 1; i++){
        if(snakeQx[i] == snakeX && snakeQy[i] == snakeY){
                alert("Game Over :: OUROBOROS");
                window.location.replace("play.html");
        }
    }
    if(snakeX > canvas.width || snakeX < 0 || snakeY > canvas.height || snakeY < 0){
            alert("Game Over")
            window.location.replace("play.html");
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(snakeQx.length == 0){
        snakeQx.push(snakeX);
        snakeQy.push(snakeY);
    }
    for(var i = 0; i < snakeQx.length; i++){
        drawHead(snakeQx[i],snakeQy[i]);
    }
    drawFood();
    snakeEat();
    if(count >= 12){
        if(dx != 0){snakeX += dx;}
        if(dy != 0){snakeY += dy;}
        snakeQx.push(snakeX);
        snakeQy.push(snakeY);
        snakeQx.shift();
        snakeQy.shift();
        count = 0;
        change = false;
        checkCollision();
    }
    if(rightPressed && dx == 0 && !change){
        dx = 25;
        dy = 0;
        change = true;
    }
    else if(leftPressed && dx == 0 && !change){
        dx = -25;
        dy = 0;
        change = true;
    }
    else if(upPressed && dy == 0 && !change){
        dy = -25;
        dx = 0;
        change = true;
    }
    else if(downPressed && dy == 0 && !change){
        dy = 25;
        dx = 0;
        change = true;
    }
    count++;
    requestAnimationFrame(draw);
}

draw();