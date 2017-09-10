var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var startClicked = false;
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

function draw() {
    drawStartScreen();

    requestAnimationFrame(draw);
}

draw();