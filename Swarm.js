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
var angle = 0;
var s = true;
var asteroids = [];
var ship = {};

var gradient3 = ctx.createLinearGradient(0, 0, 500, 500);
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


function Asteroid(cx,cy,cr,angle, asteroidSides, speed){
    this.asteroidSides = asteroidSides;
    this.angle = angle;
    this.cx = cx;
    this.cy = cy;
    this.cr = cr;
    this.points = [];
    this.direction = (Math.PI / 180) * Math.floor((Math.random() * 359));
    this.speed = speed;
    this.dx = Math.cos(this.direction)*this.speed;
    this.dy = Math.sin(this.direction)*this.speed;
    this.build = function(){
        var arc = 0;
        var indent = 0;
        var arcLength = 360/this.asteroidSides;
        for(var i = 0; i < this.asteroidSides; i++){
            arc = Math.floor((Math.random() * arcLength));
            indent = Math.floor((Math.random() * 7));
            this.points.push(rotate(this.cx,this.cy,this.cx + this.cr - indent, this.cy, arc + i*arcLength));
        }
    };
    this.rotate = function(){
        for(var i = 0; i < this.asteroidSides; i++){
            this.points[i] = rotate(this.cx, this.cy, this.points[i][0],this.points[i][1], this.angle);
        }
    };
    this.move = function(){
        this.cx+=this.dx;
        this.cy+=this.dy;
        for(var i = 0; i < this.asteroidSides; i++){
            this.points[i][0] = this.points[i][0] + this.dx;
            this.points[i][1] = this.points[i][1] + this.dy;
        }
    };
    this.draw = function(){
        ctx.beginPath();
        ctx.fillStyle = gradient3;
        for(var i = 0; i < this.asteroidSides; i++){
            ctx.moveTo(this.points[i][0], this.points[i][1]);
            if(i == this.asteroidSides - 1){ctx.lineTo(this.points[0][0], this.points[0][1]);}
            else{ctx.lineTo(this.points[i + 1][0], this.points[i + 1][1]);}
        }
        ctx.stroke();
    };
    this.changeDirection = function(){
        this.direction = (Math.PI / 180) * Math.floor((Math.random() * 359));
        this.dx = Math.cos(this.direction)*this.speed;
        this.dy = Math.sin(this.direction)*this.speed;
    };
}

function SpaceShip(x,y,r,angle){
    this.x = x;
    this.y = y;
    this.r = r;
    this.angle = angle;
    this.drawShip = function(){
        ctx.beginPath();
        ctx.fillStyle = gradient3;
        var point_one = rotate(this.x,this.y, this.x, this.y - this.r, this.angle);
        var point_two = rotate(this.x,this.y, this.x + this.r, this.y + this.r, this.angle);
        var point_three = rotate(this.x,this.y, this.x - this.r, this.y + this.r, this.angle);
        var point_four = rotate(this.x,this.y, this.x, this.y + 3*this.r/4, this.angle);
        ctx.moveTo(point_one[0], point_one[1]);
        ctx.lineTo(point_two[0], point_two[1]);
        ctx.moveTo(point_one[0], point_one[1]);
        ctx.lineTo(point_three[0], point_three[1]);
        ctx.moveTo(point_two[0], point_two[1]);
        ctx.lineTo(point_four[0], point_four[1]);
        ctx.moveTo(point_four[0], point_four[1]);
        ctx.lineTo(point_three[0], point_three[1]);
        ctx.stroke();
    };
    this.drawPuff = function(x2,y2){
        ctx.beginPath();
        ctx.arc(this.x + 3.5 * x2, this.y + 3.5 * y2, 1,0, 2*Math.PI);
        ctx.fillStyle = "rgba(255,255,255,.2)";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(this.x + 3 * x2, this.y + 3 * y2, 2,0, 2*Math.PI);
        ctx.fillStyle = "rgba(255,255,255,.4)";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(this.x + 2.5 * x2, this.y + 2.5 * y2, 3,0, 2*Math.PI);
        ctx.fillStyle = "rgba(255,255,255,.7)";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(this.x + 2 * x2, this.y + 2 * y2, 4,0, 2*Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    };
    this.moveShip = function(){
        var point = rotate(this.x, this.y, this.x, this.y - this.r, this.angle);
        var dy = this.y - point[1];
        var dx = this.x - point[0];
        if(upPressed){
            this.drawPuff(dx, dy);
            if(this.y - dy> this.r && this.y - dy < canvas.height - this.r && this.x - dx > this.r && this.x - dx < canvas.width - this.r){
                this.y-= dy;
                this.x-= dx;
            }
        }
        if(downPressed){
            if(this.y + dy> this.r && this.y + dy < canvas.height - this.r && this.x + dx > this.r && this.x + dx < canvas.width - this.r){
                this.y+= dy/2;
                this.x+= dx/2;
            }
        }
        if(leftPressed){
            this.angle+=5;
            if(this.angle > 359){this.angle = this.angle - 360;}
            
        }
        if(rightPressed){
            this.angle-=5;
            if(this.angle < 1){this.angle = this.angle + 360;}
        }
    };
}

function checkCollision(){
    for(var a = 0; a < asteroids.length; a++){
        if(ship.x + ship.r/4> asteroids[a].cx - asteroids[a].cr &&  ship.x - ship.r/4 < asteroids[a].cx + asteroids[a].cr && ship.y + ship.r/4 > asteroids[a].cy - asteroids[a].cr && ship.y - ship.r/4 < asteroids[a].cy + asteroids[a].cr){
            window.location.replace("play.html");
        }
        if(asteroids[a].cx - asteroids[a].cr > canvas.width){
            asteroids[a].cx -= canvas.width + 2*asteroids[a].cr - 1;
            for(var i = 0; i < asteroids[a].asteroidSides; i++){
                asteroids[a].points[i][0] -= canvas.width + 2*asteroids[a].cr - 1;
            }
            asteroids[a].changeDirection();
        } 
        else if (asteroids[a].cx + asteroids[a].cr < 0){
            asteroids[a].cx += canvas.width + 2*asteroids[a].cr - 1;
            for(var i = 0; i < asteroids[a].asteroidSides; i++){
                asteroids[a].points[i][0] += canvas.width + 2*asteroids[a].cr - 1;
            }
            asteroids[a].changeDirection();
           }
        else if(asteroids[a].cy - asteroids[a].cr > canvas.height){
            asteroids[a].cy -= canvas.height + 2*asteroids[a].cr - 1;
            for(var i = 0; i < asteroids[a].asteroidSides; i++){
                asteroids[a].points[i][1] -= canvas.height + 2*asteroids[a].cr - 1;
            }
            asteroids[a].changeDirection();
           }
        else if(asteroids[a].cy + asteroids[a].cr < 0){
            asteroids[a].cy += canvas.height + 2*asteroids[a].cr - 1;
            for(var i = 0; i < asteroids[a].asteroidSides; i++){
                asteroids[a].points[i][1] += canvas.height + 2*asteroids[a].cr - 1;
            }
            asteroids[a].changeDirection();
           }
    }
}

function rotate(cx, cy, x1, y1, angle) {
    var radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (x1 - cx)) + (sin * (y1 - cy)) + cx,
        ny = (cos * (y1 - cy)) - (sin * (x1 - cx)) + cy;
    return [nx, ny];
}

function draw() {
    drawStartScreen();
    if(startClicked){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if(s){
            ship = new SpaceShip(250,250,7,0);
            asteroids.push(new Asteroid(200,200,20, 1, 12,1)); 
            asteroids[0].build(); 
            s=false;
        }

        asteroids[0].rotate();
        
        asteroids[0].draw();
        asteroids[0].move();
        ship.moveShip();
        ship.drawShip();
        checkCollision();
    }

    requestAnimationFrame(draw);
}

draw();