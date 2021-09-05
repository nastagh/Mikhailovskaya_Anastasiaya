"use strict";

const canvas=document.getElementById('canvas');
const context=canvas.getContext('2d');

let requestG;

let gameNow; //идет ли сейчас игра

//счет
const score=document.getElementById('score');
//уровень
const level=document.getElementById('level');

//рисуем ракетку
const racket={
    posX:200,
    posY:385,
    width:100,
    height:10,
    speedX:0,
    updateR: function(){
        context.fillStyle='rgb(29 111 84)';
        context.fillRect(this.posX,this.posY,this.width,this.height);
    }
}
//рисуем мяч
const ball={
    posX:250,
    posY:371,
    width:25,
    speedX:2,
    speedY:-2,
    acWin:0,
    acGame:0,
    updateB: function(){
        context.fillStyle='rgb(130 136 140)';
        context.beginPath();
        context.arc(this.posX,this.posY,this.width/2,0,Math.PI*2,false);
        context.fill();
    }
}
score.innerHTML=`Score: ${ball.acWin}/${ball.acGame}`;
level.innerHTML=`Level:1`
//поле
const area={
    width:500,
    height:400
}


//кирпичи
class Brick {
    constructor(posX,posY,width,height,color) {
        this.posX=posX;
        this.posY=posY;
        this.width=width;
        this.height=height;
        this.color=color;
    }
}

let bricks=[];
const amountInRow=4;
const amountOfRows=3;
const brickWidth=area.width/amountInRow;
const brickHeith=10;


// for (row=0; row<amountOfRows; row++){
//     for (column=0; column<amountInRow; column++){
//         const brick=new Brick(column*brickWidth,row*brickHeith,brickWidth,brickHeith,'red');
//         bricks.push(brick);
//         context.drawBrick(brick)
//     }
// }
context.drawBrick= function(brick) {
    this.fillStyle=brick.color;
    this.fillRect(brick.posX,brick.posY,brick.width,brick.heith);
}



function start(){
    gameNow=true;
    cancelAnimationFrame(requestG);
    ball.posX=250;
    ball.posY=371;
    ball.speedX=2;
    ball.speedY=-2;
    racket.posX=200;
    racket.posY=385;
    if (gameNow){
        window.addEventListener('keydown',keydown,false);
        window.addEventListener('keyup',keyup,false);
        canvas.addEventListener('mousemove',mousemove,false);
    }
    
    for (let row=0; row<amountOfRows; row++){
        for (let column=0; column<amountInRow; column++){
            const brick=new Brick(column*brickWidth,row*brickHeith,brickWidth,brickHeith,'red');
            bricks.push(brick);
            context.drawBrick(brick)
        }
    }
    
    requestG=requestAnimationFrame(tick);
}



function tick() {
    context.clearRect(0,0,canvas.width,canvas.height);
    ball.posX+=ball.speedX;
    ball.posY+=ball.speedY;
    racket.posX+=racket.speedX;
    score.innerHTML=`Score: ${ball.acWin}/${ball.acGame}`;


    //ушла ли ракетка за поле
    if (racket.posX<0) {
        racket.posX=0;
    }
    if (racket.posX+racket.width>area.width) {
        racket.posX=area.width-racket.width;
    }
    //вылетел ли мячик влево
    if (ball.posX-ball.width/2<0) {
        ball.speedX=-ball.speedX;
        ball.posX=ball.width/2;
    }
    //вылетел ли мячик вправо
    if (ball.posX+ball.width/2>area.width) {
        ball.posX=area.width-ball.width/2;
        ball.speedX=-ball.speedX;
    }
    //вылетел ли мячик вверх
    if (ball.posY-ball.width/2<0) {
        ball.speedY=-ball.speedY;
        ball.posY=ball.width/2;
    }
    //вылетел ли мячик вниз
    if (ball.posY+ball.width/2>area.height) {
        ball.speedY=0;
        ball.speedX=0;
        ball.posY=area.height-ball.width/2;
        ball.acGame+=1;
        gameNow=false;
    }
    // ударился ли мяч о ракетку
    if (ball.posY+ball.width/2>racket.posY+racket.height/2) {
        if (ball.posX>=racket.posX&&ball.posX<racket.posX+racket.width) {
            ball.speedY=-ball.speedY;
            ball.speedX=ball.speedX;
        }
    }


    ball.updateB();
    racket.updateR();
    requestG=requestAnimationFrame(tick);
}
ball.updateB();
racket.updateR();




        
//клавиатура
function keydown(EO){
    EO=EO || window.event;
    if (!gameNow) {
        return
    } 
    const key=EO.code;
    if (key==='ArrowLeft') {
        racket.speedX=-2;
    }
    if (key==='ArrowRight') {
        racket.speedX=2;
    }
    EO.preventDefault(); 
}

function keyup(EO) {
    EO=EO || window.event; 
    if (!gameNow) {
        return
    }
    const key=EO.code;
    if (key==='ArrowLeft') {
        racket.speedX=0;
    }
    if (key==='ArrowRight') {
        racket.speedX=0;
    }
    EO.preventDefault(); 
}
//движение мыши
function mousemove(EO){
    EO=EO || window.event; 
    if (!gameNow) {
        return
    }
    racket.posX=EO.pageX-canvas.offsetLeft;
}

