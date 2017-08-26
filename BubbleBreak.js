var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d"); 
var ballRadius = 7;
var x = canvas.width/2;
var y = canvas.height-5;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 6;
var brickColumnCount = 7;
var brickWidth = 70;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 55;
var brickOffsetLeft = 15;
var score = 0;
var lives = 3;

var bricks = [];
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}
function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score == brickRowCount*brickColumnCount) {
                        alert("YOU WIN, CONGRATS!");
                        window.location.replace("play.html");
                    }
                }
            }
        }
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}
function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "black";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
function drawScore() {
    ctx.font = "30px Pokemon_Pixel";
    ctx.fillStyle = "black";
    ctx.fillText("Score: "+score, 15, 30);
}
function drawLives() {
    ctx.font = "30px Pokemon_Pixel";
    ctx.fillStyle = "black";
    ctx.fillText("Lives: "+lives, canvas.width-85, 30);
}

function drawGameOver() {
    ctx.font = "120px Pokemon_Pixel";
    ctx.fillStyle = "black";
    ctx.fillText("GAME OVER", canvas.width / 4, canvas.height / 2);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();
    
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    }
    else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX -4 && x < paddleX + paddleWidth + 4) {
            dy = -dy;
        }
        else {
            lives--;
            if(!lives) {
                alert("GAME OVER");
                window.location.replace("play.html");
            }
            else {
                x = canvas.width/2;
                y = canvas.height-5;
                if(score > 5 && score < 15){
                    dx = 3;
                    dy = -3;
                }
                else if(score > 15 && score < 25){
                    dx = 4;
                    dy = -4;
                }
                else if(score > 25){
                    dx = 5;
                    dy = -5;
                }
                else{
                    dx = 2;
                    dy = -2;
                }
                paddleX = (canvas.width-paddleWidth)/2;
            }
        }
    }
    
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    
    if(score > 5 && score < 15){
        if(dx < 0){dx = -3;}
        else{dx = 3;}
        if(dy < 0){dy = -3;}
        else{dy = 3;}
    }
    if(score > 15){
        if(dx < 0){dx = -4;}
        else{dx = 4;}
        if(dy < 0){dy = -4;}
        else{dy = 4;}
    }
    if(score > 25){
        if(dx < 0){dx = -5;}
        else{dx = 5;}
        if(dy < 0){dy = -5;}
        else{dy = 5;}
    }
    
    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}

draw();