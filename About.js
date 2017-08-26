var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

function Person(name){
    this.name = name;
}

function Dialog(paragraph){
    this.paragraph = paragraph;
    this.speak = function(){};
}

function Question(paragraph, choices){
    this.ask = function(){};
}

var player = new Person("John");
var input = new CanvasInput({
    canvas: document.getElementById('myCanvas')
});