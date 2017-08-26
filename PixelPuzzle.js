var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var squareWidth = 30;
var squareHeight = 30;
var numColumns = 10;
var mouseDown = false;
var x = 20;
var y = 20;
var leftPadding = 100;
var topPadding = 100;
var ctrlPressed = false;
var shiftPressed = false;
var xPressed = false;
var zPressed = false;
var firstClick = 3;
var puzzleNum = 0;
var solved = false;
var startClicked = false;
var startX = 160;
var startY = 250;
var startW = 180;
var startH = 50;
var xx = 198;
var yy = 310;
var ww = 104;
var hh = 50;

var skinColor = "#d9bb7b";
var yellow = "#eef30c";
var silver = "#b5b5b5";
var red = "#ff0000";
var blue = "#1b5b96";

var pixel = [];
for(i = 0; i < 100; i++){pixel.push(0);}
var pixelSolution = [];
for(i = 0; i < 100; i++){pixelSolution.push(0);}
var pixelSolution1 = [0,0,0,0,0,0,0,0,0,0,
                     0,0,0,0,0,0,0,0,0,0,
                     0,0,0,0,0,0,0,0,0,1,
                     0,0,0,0,0,0,0,1,1,0,
                     0,0,0,0,0,0,1,0,0,0,
                     0,0,0,0,0,1,0,0,0,0,
                     0,0,0,0,1,0,0,0,0,0,
                     0,0,0,0,1,0,0,1,1,1,
                     0,0,0,1,0,0,1,1,1,1,
                     0,0,0,1,0,0,1,1,1,1];

var pixelSolution2 = [0,0,0,0,0,0,0,0,0,0,
                      0,0,0,0,0,0,0,0,0,0,
                      1,1,0,0,0,0,0,0,0,0,
                      0,1,1,0,0,0,0,0,0,0,
                      0,0,1,1,1,1,0,0,0,0,
                      0,0,1,1,1,1,1,1,1,1,
                      0,0,1,1,0,0,0,0,0,1,
                      0,0,0,0,0,0,1,1,1,0,
                      1,0,0,1,1,0,1,1,1,1,
                      1,0,0,0,1,0,1,1,1,1];

var pixelSolution3 = [0,0,0,0,0,0,0,0,0,0,
                      0,0,0,0,0,0,0,0,0,0,
                      0,0,0,0,0,0,0,0,0,0,
                      0,0,0,0,0,0,0,0,0,0,
                      0,0,0,0,0,0,0,0,0,0,
                      0,0,0,0,0,0,0,0,0,0,
                      1,0,0,0,0,0,0,0,0,0,
                      1,0,0,0,0,0,0,0,0,0,
                      1,0,0,0,0,0,0,0,0,0,
                      1,0,0,0,0,0,0,0,0,0];

var pixelSolution4 = [0,0,0,1,0,1,1,1,0,1,
                      0,0,0,1,0,1,1,1,1,1,
                      0,0,0,0,1,0,1,1,0,0,
                      0,0,0,0,0,1,1,1,1,0,
                      0,0,1,1,1,1,1,1,1,0,
                      0,0,1,0,0,0,1,1,1,0,
                      0,0,1,0,0,0,1,1,1,1,
                      0,0,1,0,0,0,1,1,1,1,
                      0,0,1,1,1,1,1,1,1,1,
                      0,0,1,1,1,1,0,1,1,1];

var pixelSolution5 = [0,0,1,1,1,0,0,1,1,1,
                      1,1,1,0,1,0,0,1,1,1,
                      0,0,0,1,1,1,0,0,0,1,
                      0,0,1,0,0,1,1,1,0,1,
                      0,0,1,1,0,0,0,1,0,1,
                      0,0,0,0,0,0,0,0,1,1,
                      0,0,0,0,0,0,1,0,1,1,
                      1,0,0,0,0,1,0,1,1,1,
                      1,1,1,0,0,1,0,1,1,1,
                      0,0,0,0,0,1,0,1,1,1];

var pixelSolution6 = [1,1,0,0,0,0,0,0,0,0,
                      1,1,1,0,0,0,0,0,0,0,
                      1,1,1,0,0,0,0,0,0,0,
                      1,1,1,1,0,0,0,0,0,0,
                      1,1,1,1,0,0,0,0,0,0,
                      1,1,1,1,1,0,0,0,0,0,
                      1,1,1,1,1,0,0,0,0,0,
                      1,1,1,1,1,0,0,0,0,0,
                      1,1,1,1,1,0,0,0,0,0,
                      1,1,1,1,0,0,0,0,0,0];

var pixelSolution7 = [0,0,1,1,1,1,1,0,1,0,
                      0,0,0,1,1,0,1,1,0,0,
                      0,0,0,1,0,0,0,0,0,0,
                      0,0,0,0,1,0,0,0,0,1,
                      0,0,0,0,0,1,0,0,1,0,
                      0,0,0,0,0,0,1,1,0,0,
                      0,0,0,0,0,0,0,0,0,0,
                      0,0,0,0,0,0,0,0,0,0,
                      0,0,0,0,0,0,0,0,0,0,
                      0,0,0,0,0,0,0,0,0,1];

var pixelSolution8 = [0,0,0,1,1,1,0,1,1,1,
                      0,0,1,0,0,1,1,0,0,1,
                      1,1,0,0,0,0,0,0,0,0,
                      0,0,1,0,0,0,0,0,0,1,
                      0,0,1,0,0,0,0,0,0,1,
                      0,0,1,1,1,1,0,0,1,1,
                      0,0,1,1,1,1,1,1,1,1,
                      0,1,0,1,1,1,1,1,1,1,
                      1,0,0,0,1,1,1,1,1,0,
                      0,0,0,0,0,1,1,1,0,0];

var pixelSolution9 = [1,1,1,1,0,0,0,0,0,0,
                      1,1,1,0,0,1,1,0,0,0,
                      1,1,0,0,1,0,1,1,0,0,
                      1,1,1,1,0,0,0,0,1,0,
                      1,1,1,1,1,1,0,0,1,0,
                      1,1,1,1,1,0,0,0,1,0,
                      1,1,1,1,1,1,1,1,0,0,
                      0,0,0,0,0,0,0,0,0,0,
                      1,0,0,0,0,0,0,0,0,0,
                      0,1,0,0,0,0,0,0,0,0];

var wonderWoman = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                   0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                   0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                   0,0,0,0,0,0,0,1,1,2,2,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                   0,0,0,0,0,0,1,2,2,2,2,2,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                   0,0,0,0,0,1,2,2,2,2,2,2,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,
                   0,0,0,0,1,2,2,2,2,2,2,2,1,1,2,2,2,2,2,1,1,0,0,0,0,0,0,0,0,0,
                   0,0,0,0,1,2,2,1,1,1,2,2,2,2,2,2,1,1,1,2,1,0,0,0,0,0,0,0,0,0,
                   0,0,0,1,2,2,1,1,1,1,1,2,2,1,1,2,1,1,1,1,1,0,0,0,0,0,0,0,0,0,
                   0,0,0,1,2,2,1,1,1,1,1,3,3,3,1,2,1,1,1,1,1,0,0,0,0,0,0,0,0,0,
                   0,0,0,1,2,1,1,1,3,5,3,3,5,5,1,2,2,1,1,1,1,1,0,0,0,0,0,0,0,0,
                   0,0,0,1,2,1,1,1,5,4,5,5,5,3,1,2,2,1,1,1,1,1,1,0,0,0,0,0,0,0,
                   0,0,0,0,1,2,1,1,3,3,3,3,3,1,1,1,2,2,2,1,1,1,1,0,0,0,0,0,0,0,
                   0,0,0,0,0,1,1,1,1,3,3,3,1,7,7,1,1,1,2,1,1,1,1,1,0,0,0,0,0,0,
                   0,0,1,1,1,1,1,1,1,3,3,3,6,6,3,3,3,1,2,1,1,1,1,1,0,0,0,0,0,0,
                   0,0,1,3,3,3,1,1,1,3,3,3,3,3,3,3,3,2,1,1,1,1,1,1,1,0,0,0,0,0,
                   0,0,1,3,3,3,1,1,1,1,3,3,3,3,3,3,1,2,1,1,1,1,1,1,1,0,0,0,0,0,
                   0,0,1,3,3,3,1,1,1,1,1,3,3,3,3,1,2,1,1,1,1,1,1,1,1,0,0,0,0,0,
                   0,0,1,2,2,1,1,1,1,1,1,1,1,3,3,1,2,1,1,1,1,1,1,1,1,0,0,0,0,0,
                   0,0,1,2,2,1,2,1,1,1,3,3,3,3,3,1,2,1,1,1,1,1,1,1,0,0,0,0,0,0,
                   0,0,1,2,2,1,1,2,1,3,3,3,3,5,5,1,2,5,5,1,1,1,1,1,0,0,0,0,0,0, 
                   0,0,0,1,2,3,1,1,3,3,3,3,5,4,4,5,1,4,4,5,1,1,1,0,0,1,1,0,0,0,
                   0,0,0,1,3,3,3,3,3,3,1,1,4,4,4,4,4,4,4,4,1,1,0,0,1,3,1,1,0,0,
                   0,0,0,0,1,3,3,3,3,1,0,0,1,4,4,4,4,4,4,1,1,1,1,1,3,3,3,3,1,0,
                   0,0,0,0,0,1,3,3,1,0,0,0,1,4,4,4,4,4,4,1,7,7,7,7,1,1,3,3,1,0,
                   0,0,0,0,0,0,1,1,0,0,0,0,1,5,5,5,4,4,5,1,7,7,7,7,1,3,3,3,1,0,
                   0,0,0,0,0,0,0,0,0,0,0,0,6,6,6,6,5,5,6,1,1,1,1,1,1,1,1,1,0,0,
                   0,0,0,0,0,0,0,0,0,0,0,1,3,6,6,6,6,6,6,6,0,0,0,0,0,0,0,0,0,0,
                   0,0,0,0,0,0,0,0,0,0,1,3,3,3,6,6,6,6,6,3,1,0,0,0,0,0,0,0,0,0,
                   0,0,0,0,0,0,0,0,0,1,3,3,3,3,3,6,6,6,3,3,3,1,0,0,0,0,0,0,0,0];


    var gradient=ctx.createLinearGradient(100,100,400,400);
    gradient.addColorStop("0.08","#FF0000");
    gradient.addColorStop("0.17","#FF8000");
    gradient.addColorStop("0.25","#FFFF00");
    gradient.addColorStop("0.33","#008000");
    gradient.addColorStop("0.42","#0000FF");
    gradient.addColorStop("0.5","#A000C0");
    gradient.addColorStop("0.58","#FF0000");
    gradient.addColorStop("0.66","#FF8000");
    gradient.addColorStop("0.75","#FFFF00");
    gradient.addColorStop("0.83","#008000");
    gradient.addColorStop("0.92","#0000FF");
    gradient.addColorStop("1.0","#A000C0");

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
    
var gradient2=ctx.createLinearGradient(0,0,500,500);
    gradient2.addColorStop("0.08","#FF0000");
    gradient2.addColorStop("0.25","#0000FF");
    gradient2.addColorStop("0.42","#A000C0");
    gradient2.addColorStop("0.58","#FF0000");
    gradient2.addColorStop("0.75","#0000FF");
    gradient2.addColorStop("1.0","#A000C0");

document.addEventListener("mousedown", mouseDownHandler, false);
document.addEventListener("mouseup", mouseUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


function mouseDownHandler(e) {
    mouseDown = true;
    var relativeX = e.clientX - canvas.offsetLeft;
    var relativeY = e.clientY - canvas.offsetTop;
    if(solved){
        if(relativeX > startX && relativeX < startX + startW && relativeY > startY && relativeY < startY + startH){
            startClicked = true;
        }
        else if(relativeX > xx && relativeX < xx + ww && relativeY > yy && relativeY < yy + hh){
            window.location.replace("play.html");
        }
    }
    else if(relativeX > 10 && relativeX < 50 && relativeY > 10 && relativeY < 38){
        window.location.replace("play.html");
    }
    else if(relativeX >= leftPadding && relativeX <= canvas.width - leftPadding && relativeY >= topPadding && relativeY <= canvas.height - topPadding){
       relativeX = Math.floor(parseFloat((relativeX - leftPadding))/squareWidth);
        relativeY = Math.floor(parseFloat((relativeY - topPadding))/squareHeight);
    }
    firstClick = pixel[relativeY*numColumns + relativeX];
    if(ctrlPressed){
        if(pixel[relativeY*numColumns + relativeX] === 0){
            
            pixel[relativeY*numColumns + relativeX] = 2;
        }
        else{
            pixel[relativeY*numColumns + relativeX] = 0;
        }
    }
    else if(shiftPressed){
        if(pixel[relativeY*numColumns + relativeX] === 0){
            pixel[relativeY*numColumns + relativeX] = 1;
        }
        else{
            pixel[relativeY*numColumns + relativeX] = 0;
        }
    }
    
}

function mouseUpHandler(e){
    mouseDown = false;
}

function mouseMoveHandler(e){
    var dragX = e.clientX - canvas.offsetLeft;
    var dragY = e.clientY - canvas.offsetTop;
    if(mouseDown){
        if(dragX > leftPadding && dragX < canvas.width - leftPadding && dragY > topPadding && dragY < canvas.height - topPadding){
            dragX = Math.floor(parseFloat((dragX - leftPadding))/squareWidth);
            dragY = Math.floor(parseFloat((dragY - topPadding))/squareHeight);
        }
        if(ctrlPressed){
            if(firstClick == 0){
                if(pixel[dragY*numColumns + dragX] == 0){
                    pixel[dragY*numColumns + dragX] = 2;
                }
            }
            else{
                pixel[dragY*numColumns + dragX] = 0;
            }
        }
        else if(shiftPressed){
            if(firstClick == 0){
                if(pixel[dragY*numColumns + dragX] == 0){
                    pixel[dragY*numColumns + dragX] = 1;
                }
            }
            else{
                pixel[dragY*numColumns + dragX] = 0;
            }
        }
    }
}

function keyDownHandler(e){
    if(e.keyCode == 17) {
        ctrlPressed = true;
    }
    if(e.keyCode == 16) {
        shiftPressed = true;
    }
    if(e.keyCode == 90) {
        zPressed = true;
    }
    if(e.keyCode == 88) {
        xPressed = true;
    }
}
function keyUpHandler(e){
    if(e.keyCode == 17) {
        ctrlPressed = false;
    }
    if(e.keyCode == 16) {
        shiftPressed = false;
    }
    if(e.keyCode == 90) {
        zPressed = false;
    }
    if(e.keyCode == 88) {
        xPressed = false;
    }
}

function fillIn(i){
    ctx.beginPath();
    var squareX = (i%10)*squareWidth + leftPadding;
    var squareY = Math.floor(parseFloat(i)/10)*squareHeight + topPadding;
    ctx.rect(squareX, squareY,squareWidth, squareHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function drawX(a){
    ctx.beginPath();
    var x = (a%10)*squareWidth + leftPadding;
    var y = Math.floor(parseFloat(a)/10)*squareHeight + topPadding;
    ctx.moveTo(x,y);
    ctx.lineTo(x+30,y+30);
    ctx.moveTo(x+30,y);
    ctx.lineTo(x,y+30);
    ctx.stroke();
}

function drawPixel(){
    for(i = 0; i < pixel.length; i++){
        var a = i;
        if(pixel[i] === 1){
            fillIn(i);
        }
        else if(pixel[a] === 2){
            drawX(a);
        }
    }
}

function drawGrid(){
        
    for(i = 0; i <= 10; i++){
        ctx.beginPath();
        ctx.moveTo(i * 30 + 100, 100);
        ctx.lineTo(i * 30 + 100, 400);
        ctx.strokeStyle = gradient;
        if(i == 5){ctx.lineWidth = 3;}
        else{ctx.lineWidth = 1;}
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(100,i * 30 + 100);
        ctx.lineTo(400,i * 30 + 100);
        ctx.strokeStyle = gradient;
        if(i == 5){ctx.lineWidth = 3;}
        else{ctx.lineWidth = 1;}
        ctx.stroke();
    }
}

function drawPixelNumbers(start, end,increment,horizontal) {
   var num = [];
   var num2 = [];
   var temp = 0;
   var flag = false;
   for(var i = end; i >= start; i = i - increment){
       if(flag){
            if(pixelSolution[i] === 1){temp++;}
            else{
                flag = false;
                num.push(temp);
                temp = 0;
            }
       }
       else{
           if(pixelSolution[i] === 1){
               temp++;
               flag = true;
           }
       }
   }
   if(temp != 0){num.push(temp);}
   temp = 0;
   flag = false;
   for(var x = end; x >= start; x = x - increment){
       if(flag){
            if(pixel[x] === 1){temp++;}
            else{
                flag = false;
                num2.push(temp);
                temp = 0;
            }
       }
       else{
           if(pixel[x] === 1){
               temp++;
               flag = true;
           }
       }
   }
   if(temp != 0){num2.push(temp);}
   temp = 0;
   if(num.length == 0){
       ctx.font="25px Pokemon_Pixel";
       ctx.fillStyle=gradient2;
       if(num2.length == 0){ctx.fillStyle = "white";}
       if(horizontal){ctx.fillText("0",80,122 + 30*(parseFloat(start)/10.0));}
       else{ctx.fillText("0",start*30 + 110,90);}
       
   }
   else{   
       for(i = 0; i < num.length; i++){
            ctx.font="25px Pokemon_Pixel";
            ctx.fillStyle=gradient2;
            if(i <= num2.length && num2[i] == num[i]){ctx.fillStyle = "white";}
            var number = num[i].toString();
           if(horizontal){ctx.fillText(number,100-20*(i+1), 122 + 30*(parseFloat(start)/10));}
           else{ctx.fillText(number,start*30 + 112, 110-20*(i + 1));}
            
       }
   }
    num = [];
    num2 = [];
}

function checkSolution(){
    for(var i = 0; i < pixel.length; i++){
        if(pixelSolution[i] == 1 && pixel[i] != 1){
            return false;
        }
        else if(pixelSolution[i] == 0 && pixel[i] == 1){
            return false;
        }
    }
    return true;
}

function drawNumbers(){
    //drawHorizontalNumbers(10,20,1);
    for(x = 0; x < 10; x++){
        drawPixelNumbers(x*10, x*10+9, 1, true);
        drawPixelNumbers(x, 90+x,10, false);
    }
}

function drawControls(){
    if(shiftPressed && !ctrlPressed){
        ctx.beginPath();
        ctx.rect(85,440, 158, 50);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
        ctx.fillStyle = gradient2;
        ctx.moveTo(85, 440);
        ctx.lineTo(85+158, 440);
        ctx.moveTo(85, 440 + 50);
        ctx.lineTo(85+158, 440 +50);
        ctx.moveTo(85, 440);
        ctx.lineTo(85, 440 + 50);
        ctx.moveTo(85+158, 440);
        ctx.lineTo(85+158, 440 +50);
        ctx.stroke();
    }
    if(ctrlPressed && !shiftPressed){
        ctx.beginPath();
        ctx.rect(260,440, 150, 50);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
        ctx.fillStyle = gradient2;
        ctx.moveTo(260, 440);
        ctx.lineTo(260+150, 440);
        ctx.moveTo(260, 440 + 50);
        ctx.lineTo(260+150, 440 +50);
        ctx.moveTo(260, 440);
        ctx.lineTo(260, 440 + 50);
        ctx.moveTo(260+150, 440);
        ctx.lineTo(260+150, 440 +50);
        ctx.stroke();
    }
    ctx.beginPath();
    ctx.rect(95, 450,squareWidth, squareHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = gradient2;
    
    ctx.moveTo(95, 450);
    ctx.lineTo(95+30, 450);
    
    ctx.moveTo(95, 450 + 30);
    ctx.lineTo(95+30, 450 +30);
    
    ctx.moveTo(95, 450);
    ctx.lineTo(95, 450 + 30);
    
    ctx.moveTo(95+30, 450);
    ctx.lineTo(95+30, 450 +30);
    ctx.stroke();
    
    ctx.font="25px Pokemon_Pixel";
    ctx.fillStyle=gradient2;
    ctx.fillText("= Shift + Click", 130, 470);
    ctx.beginPath();
        ctx.fillStyle = gradient2;
    
    ctx.moveTo(270, 450);
    ctx.lineTo(270+30, 450);
    
    ctx.moveTo(270, 450 + 30);
    ctx.lineTo(270+30, 450 +30);
    
    ctx.moveTo(270, 450);
    ctx.lineTo(270, 450 + 30);
    
    ctx.moveTo(270+30, 450);
    ctx.lineTo(270+30, 450 +30);
    ctx.moveTo(270,450);
    ctx.lineTo(270+30,450+30);
    ctx.moveTo(270+30,450);
    ctx.lineTo(270,450+30);
    ctx.stroke();
    ctx.fillText("= Ctrl + Click", 305, 470);
    ctx.closePath();
}

function drawSolved(){
    ctx.font="80px Pokemon_Pixel";
    ctx.fillStyle=gradient3;
    
    if(puzzleNum != 0){ctx.fillText("Puzzle Solved!", 75, 220);}
    else{ctx.fillText("Pixel Puzzle!", 95, 225);}
    ctx.closePath();
}

function drawStart(){
    ctx.beginPath();
    ctx.rect(startX,startY, startW, startH);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = gradient3;
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX+startW, startY);
    ctx.moveTo(startX, startY + startH);
    ctx.lineTo(startX+startW, startY +startH);
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX, startY + startH);
    ctx.moveTo(startX+startW, startY);
    ctx.lineTo(startX+startW, startY + startH);
    ctx.stroke();
    ctx.font="36px Pokemon_Pixel";
    ctx.fillStyle = gradient3;
    var str1 = "Start Puzzle ";
    var str2 = (puzzleNum + 1).toString();
    ctx.fillText(str1.concat(str2), startX + 10, startY + 36);
}

function drawGoBack(){

    ctx.rect(xx,yy, ww, hh);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = gradient3;
    ctx.moveTo(xx, yy);
    ctx.lineTo(xx+ww, yy);
    ctx.moveTo(xx, yy + hh);
    ctx.lineTo(xx+ww, yy +hh);
    ctx.moveTo(xx, yy);
    ctx.lineTo(xx, yy + hh);
    ctx.moveTo(xx+ww, yy);
    ctx.lineTo(xx+ww, yy + hh);
    ctx.stroke();
    ctx.font="36px Pokemon_Pixel";
    ctx.fillStyle = gradient3;
    ctx.fillText("Go Back", xx + 10, yy+36);
}

function drawQuit(){
    ctx.closePath();
    ctx.font="26px Pokemon_Pixel";
    ctx.fillStyle = gradient2;
    ctx.fillText("Quit", 15, 30);
    
}


function drawWonderWoman(){

    
    for(var w = 0; w < wonderWoman.length; w++){
        if((puzzleNum == 1 && w <= 300 && w%30 < 10 )||
          (puzzleNum == 2 && w <= 300 && w%30 < 20) ||
          (puzzleNum == 3 && w <= 300 )||
          (puzzleNum == 4 && w <= 600 && (w <= 300 || w%30 < 10) )||
          (puzzleNum == 5 && w <= 600 && (w <= 300 || w%30 < 20) )||
          (puzzleNum == 6 && w <= 600 )||
          (puzzleNum == 7 && (w <= 600 || w%30 < 10) )||
          (puzzleNum == 8 && (w <= 600 || w%30 < 20) )||
          (puzzleNum == 9)){
          if(wonderWoman[w] != 0){
                ctx.beginPath();
                var wonderX = (w%30)*16.67;
                var wonderY = Math.floor(parseFloat(w)/30)*16.67;
                ctx.rect(wonderX, wonderY,16.67, 16.67);
                if(wonderWoman[w] == 1){ctx.fillStyle = "black";}
                else if(wonderWoman[w] == 2){ctx.fillStyle = silver;}
                else if(wonderWoman[w] == 3){ctx.fillStyle = skinColor;}
                else if(wonderWoman[w] == 4){ctx.fillStyle = red;}
                else if(wonderWoman[w] == 5){ctx.fillStyle = yellow;}
                else if(wonderWoman[w] == 6){ctx.fillStyle = blue;}
                else if(wonderWoman[w] == 7){ctx.fillStyle = "white";}
                ctx.fill();
                ctx.closePath();
            }
        }
    }
    ctx.beginPath();
    ctx.fillStyle = gradient3;
    ctx.moveTo(166.7, 0);
    ctx.lineTo(166.7, 500);
    ctx.moveTo(333.33, 0);
    ctx.lineTo(333.33, 500);
    ctx.moveTo(0, 166.7);
    ctx.lineTo(500, 166.7);
    ctx.moveTo(0, 333.33);
    ctx.lineTo(500, 333.33);
    ctx.stroke();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPixel();
    drawGrid();
    drawNumbers();
    drawControls();
    drawQuit();
    if(checkSolution()){
        solved = true;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if(puzzleNum != 0){drawWonderWoman();}
        drawSolved();
        if(puzzleNum != 9){drawStart();}
        drawGoBack();
        if(startClicked){
            startClicked = false;
            solved = false;
            if(puzzleNum == 0){puzzleNum = 1; pixelSolution = pixelSolution1;}
            else if(puzzleNum == 1){puzzleNum = 2; pixelSolution = pixelSolution2;}
            else if(puzzleNum == 2){puzzleNum = 3; pixelSolution = pixelSolution3;}
            else if(puzzleNum == 3){puzzleNum = 4; pixelSolution = pixelSolution4;}
            else if(puzzleNum == 4){puzzleNum = 5; pixelSolution = pixelSolution5;}
            else if(puzzleNum == 5){puzzleNum = 6; pixelSolution = pixelSolution6;}
            else if(puzzleNum == 6){puzzleNum = 7; pixelSolution = pixelSolution7;}
            else if(puzzleNum == 7){puzzleNum = 8; pixelSolution = pixelSolution8;}
            else if(puzzleNum == 8){puzzleNum = 9; pixelSolution = pixelSolution9;}
            pixel = [];
            for(i = 0; i < 100; i++){pixel.push(0);}
            
        }
    }

    
    
    requestAnimationFrame(draw);
}

draw();