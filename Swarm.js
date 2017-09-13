var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var startX = 160;
var startY = 250;
var startW = 180;
var startH = 50;
var xx = 198;
var yy = 310;
var ww = 104;
var hh = 50;
var startMenu = true;
var startClicked = false;
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var x = 250;
var y = 250;
var r = 7;
angle = 0;
var cnt = 0;

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


document.addEventListener("mousedown", mouseDownHandler, false);
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function mouseDownHandler(e) {
    mouseDown = true;
    var relativeX = e.clientX - canvas.offsetLeft;
    var relativeY = e.clientY - canvas.offsetTop;
    if(startMenu){
        if(relativeX > startX && relativeX < startX + startW && relativeY > startY && relativeY < startY + startH){
            startClicked = true;
        }
        else if(relativeX > xx && relativeX < xx + ww && relativeY > yy && relativeY < yy + hh){
            window.location.replace("play.html");
        }
    }
}
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


function drawStartScreen(){
     ctx.font="80px Pokemon_Pixel";
    ctx.strokeStyle=gradient3;
    ctx.strokeText("Swarm!", 165, 220);
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
    ctx.fillText("Play", startX +65, startY + 36);
    ctx.beginPath();
    ctx.rect(xx,yy, ww, hh);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.strokeStyle = gradient3;
    ctx.stroke();
    ctx.closePath();
    ctx.font="36px Pokemon_Pixel";
    ctx.fillStyle = gradient3;
    ctx.fillText("Go Back", xx + 10, yy+36);
}

function drawTriangle(){
    ctx.beginPath();
    ctx.fillStyle = gradient3;
    var point_one = rotate(x,y, x, y - r, angle);
    var point_two = rotate(x,y, x + r, y + r, angle);
    var point_three = rotate(x,y, x - r, y + r, angle);
    var point_four = rotate(x,y, x, y + 3*r/4, angle);
    ctx.moveTo(point_one[0], point_one[1]);
    ctx.lineTo(point_two[0], point_two[1]);
    ctx.moveTo(point_one[0], point_one[1]);
    ctx.lineTo(point_three[0], point_three[1]);
    ctx.moveTo(point_two[0], point_two[1]);
    ctx.lineTo(point_four[0], point_four[1]);
    ctx.moveTo(point_four[0], point_four[1]);
    ctx.lineTo(point_three[0], point_three[1]);
    ctx.stroke();
}

function rotate(cx, cy, x1, y1, angle) {
    var radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (x1 - cx)) + (sin * (y1 - cy)) + cx,
        ny = (cos * (y1 - cy)) - (sin * (x1 - cx)) + cy;
    return [nx, ny];
}

function drawPuff(x2,y2){
    ctx.beginPath();
    ctx.arc(x + 3.5 * x2, y + 3.5 * y2, 1,0, 2*Math.PI);
    ctx.fillStyle = "rgba(255,255,255,.2)";
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(x + 3 * x2, y + 3 * y2, 2,0, 2*Math.PI);
    ctx.fillStyle = "rgba(255,255,255,.4)";
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(x + 2.5 * x2, y + 2.5 * y2, 3,0, 2*Math.PI);
    ctx.fillStyle = "rgba(255,255,255,.7)";
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(x + 2 * x2, y + 2 * y2, 4,0, 2*Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}


function draw() {
    drawStartScreen();
    if(startClicked){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawTriangle();
        var point = rotate(x, y, x, y - r, angle);
        dy = y - point[1];
        dx = x - point[0];
        if(upPressed){
            cnt++;
            if(cnt == 1) {drawPuff(dx, dy);cnt = 0;}
            if(y - dy> r && y - dy < canvas.height - r && x - dx > r && x - dx < canvas.width - r){
                y-= dy;
                x-= dx;
            }
        }
        if(downPressed){
            if(y + dy> r && y + dy < canvas.height - r && x + dx > r && x + dx < canvas.width - r){
                y+= dy;
                x+= dx;
            }
        }
        if(leftPressed){
            angle+=3;
            if(angle > 359){angle = 0;}
            
        }
        if(rightPressed){
            angle-=3;
            if(angle < 1){angle = 360;}
        }
    }

    requestAnimationFrame(draw);
}

draw();