var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d"); 
var dx = 0;
var dy = 0;
var snakeWidth = 20;
var snakeHeight = 20;
var snakeX = 227.5;
var snakeY = 227.5;
var foodX = 262.5;
var foodY = 237.5;
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
var startClicked = false;
var startX = 160;
var startY = 250;
var startW = 180;
var startH = 50;
var xx = 160;
var yy = 310;
var ww = 180;
var hh = 50;
var gameOverClicked = false;
var gameOverMenu = false;
var counter = 0;
var drawDelay = 8;

var gradient3=ctx.createLinearGradient(0,0,500,500);
    gradient3.addColorStop("0.08","#FF0000");
    gradient3.addColorStop("0.17","#FF8000");
    gradient3.addColorStop("0.25","#FFFF00");
    gradient3.addColorStop("0.33","#008000");
    gradient3.addColorStop("0.42","#0000FF");
    gradient3.addColorStop("0.5","#A000C0");
    gradient3.addColorStop("0.58","#FF0000");
    gradient3.addColorStop("0.66","#FF8000");
    gradient3.addColorStop("0.75","#FFFF00");
    gradient3.addColorStop("0.83","#008000");
    gradient3.addColorStop("0.92","#0000FF");
    gradient3.addColorStop("1.0","#A000C0");

/****************************/
/****** EVENT HANDLERS ******/
/****************************/

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousedown", mouseDownHandler, false);

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


function mouseDownHandler(e) {
    mouseDown = true;
    var relativeX = e.clientX - canvas.offsetLeft;
    var relativeY = e.clientY - canvas.offsetTop;
    if(gameOverMenu){
        if(relativeX > startX && relativeX < startX + startW && relativeY > startY && relativeY < startY + startH){
            gameOverClicked = true;
        }
        else if(relativeX > xx && relativeX < xx + ww && relativeY > yy && relativeY < yy + hh){
            window.location.replace("MiniGames/Snake/snakemenu.html");
        }
    }
}

document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);
document.addEventListener('touchend', handleTouchEnd, false);

var xDown = null;                                                        
var yDown = null;                                                        

function handleTouchStart(evt) {                                         
    xDown = evt.touches[0].clientX;                                      
    yDown = evt.touches[0].clientY;                                      
};                                                

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            leftPressed = true; 
        } else {
            rightPressed = true;
        }                       
    } else {
        if ( yDiff > 0 ) {
            upPressed = true;
        } else { 
            downPressed = true;
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};

function handleTouchEnd(evt){
    leftPressed = false;
    rightPressed = false;
    upPressed = false;
    downPressed = false;
}

function drawHead(x, y, i) {
    ctx.beginPath();
    ctx.rect(x, y, snakeWidth, snakeHeight);
    /*
    if(y > 0 && y < 99){ctx.fillStyle = "#FF0000";}
    else if(y > 99 && y < 174){ctx.fillStyle = "#FF8000";}
    else if(y > 174 && y < 249){ctx.fillStyle = "#FFFF00";}
    else if(y > 249 && y < 324){ctx.fillStyle = "#008000";}
    else if(y > 324 && y < 399){ctx.fillStyle = "#0000FF";}
    else if(y > 399 && y < 500){ctx.fillStyle = "#A000C0";}
    else {ctx.fillStyle = "black";}
    */
    if(i % 6 == 0){ctx.strokeStyle = "#FF0000";}
    else if(i % 6 == 1){ctx.strokeStyle = "#FF8000";}
    else if(i % 6 == 2){ctx.strokeStyle = "#FFFF00";}
    else if(i % 6 == 3){ctx.strokeStyle = "#008000";}
    else if(i % 6 == 4){ctx.strokeStyle = "#0000FF";}
    else if(i % 6 == 5){ctx.strokeStyle = "#A000C0";}
    else {ctx.strokeStyle = "black";}
    ctx.stroke();
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function drawFood() {
    ctx.beginPath();
    ctx.arc(foodX, foodY, foodRadius, 0, Math.PI*2);
    
    if(counter % 6 == 5){ctx.fillStyle = "#FF0000";}
    else if(counter % 6 == 0){ctx.fillStyle = "#FF8000";}
    else if(counter % 6 == 1){ctx.fillStyle = "#FFFF00";}
    else if(counter % 6 == 2){ctx.fillStyle = "#008000";}
    else if(counter % 6 == 3){ctx.fillStyle = "#0000FF";}
    else if(counter % 6 == 4){ctx.fillStyle = "#A000C0";}
    else {ctx.fillStyle = "black";}
    ctx.fill();
    ctx.strokeStyle="white";
    ctx.lineWidth=2;
    ctx.stroke();
    ctx.lineWidth=1;
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
        counter+=1;
    }
}

function checkCollision(){
    for(var i = 0; i < snakeQx.length - 1; i++){
        if(snakeQx[i] == snakeX && snakeQy[i] == snakeY){
                drawGameOver(0);
                gameOverMenu = true;
        }
    }
    if(snakeX > canvas.width || snakeX < 0 || snakeY > canvas.height || snakeY < 0){
            drawGameOver(1);
            gameOverMenu = true;
    }
}

function drawGameOver(num){
    ctx.font="80px Pokemon_Pixel";
    ctx.strokeStyle=gradient3;
    if(num == 1){ctx.strokeText("GAME OVER", 125, 220);}
    if(num == 0){ctx.strokeText("OUROBOROS", 117, 220);}
    ctx.closePath();
    ctx.beginPath();
    ctx.rect(startX,startY, startW, startH);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.strokeStyle= gradient3;
    ctx.stroke();
    ctx.closePath();
    ctx.font="36px Pokemon_Pixel";
    ctx.fillStyle = gradient3;
    ctx.fillText("Try Again", startX +37, startY + 36);
    ctx.beginPath();
    ctx.rect(xx,yy, ww, hh);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.strokeStyle = gradient3;
    ctx.stroke();
    ctx.closePath();
    ctx.font="36px Pokemon_Pixel";
    ctx.fillStyle = gradient3;
    ctx.fillText("Back to Menu", xx + 22, yy+36);
}

function draw() {
    if(!gameOverMenu){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if(snakeQx.length == 0){
            snakeQx.push(snakeX);
            snakeQy.push(snakeY);
        }
        for(var i = 0; i < snakeQx.length; i++){
        drawHead(snakeQx[i],snakeQy[i], snakeQx.length - i - 1);
        }
        drawFood();
        snakeEat();
        if(count >= 8){
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
    }
    if(gameOverClicked){
        window.location.replace("snakemedium.html");
    }
    requestAnimationFrame(draw);
}

draw();