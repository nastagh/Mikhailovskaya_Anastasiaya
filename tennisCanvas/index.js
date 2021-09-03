"use strict";

const canvas=document.getElementById('CVS');
const context=canvas.getContext('2d');

//рисуем поле
context.fillStyle='yellow';
context.fillRect(0,0,canvas.width,canvas.height);

//счет
const account=document.getElementById('account');
account.style.position='absolute';
account.style.left=220+'px';

//рисуем левую ракетку
const racketLeft={
    posY:110,
    width:10,
    height:80,
    speedY:0,
    updateL: function() {
        context.fillStyle='green';
        context.fillRect(0,this.posY,this.width,this.height);
    }
}
// рисуем правую ракетку
const racketRight={
    posY:110,
    width:10,
    height:80,
    speedY:0,
    updateR: function() {
        context.fillStyle='blue';
        context.fillRect(490,this.posY,this.width,this.height);
    }
}
//рисуем мяч
const ball={
    posX:250,
    posY:150,
    width:20,
    height:10,
    speedX:2,
    speedY:2,
    acLeft:0,
    acRight:0,
    updateB: function() {
        context.fillStyle='red';
        context.beginPath();
        context.arc(this.posX,this.posY,this.width/2,0,Math.PI*2,false);
        context.fill();
    }
}
//поле
const area={
    width:500,
    height:300
}

function start() {
    ball.posX=250;
    ball.posY=150;
    racketRight.posY=110;
    racketLeft.posY=110;
    // //нажатие клавиш
    window.addEventListener('keydown',keydown,false);
    window.addEventListener('keyup',keyup,false);

    requestAnimationFrame(tick);

}

function tick() {
    context.fillStyle='yellow';
    context.fillRect(0,0,canvas.width,canvas.height);
    ball.posX+=ball.speedX;
    ball.posY+=ball.speedY;
    racketLeft.posY+=racketLeft.speedY;
    racketRight.posY+=racketRight.speedY;


    //ушла ли ракетка за поле 
    if (racketLeft.posY<0) {
        racketLeft.posY=0;
    }
    if (racketLeft.posY+racketLeft.height>area.height) {
        racketLeft.posY=area.height-racketLeft.height;
    }
    if (racketRight.posY<0) {
        racketRight.posY=0;
    }
    if (racketRight.posY+racketRight.height>area.height) {
        racketRight.posY=area.height-racketRight.height;
    }







    ball.updateB();
    racketLeft.updateL();
    racketRight.updateR();

    requestAnimationFrame(tick);
}

ball.updateB();
racketLeft.updateL();
racketRight.updateR();


//клавиатура
function keydown(EO){
    EO=EO || window.event; 
    const key=EO.code;
    if (key==='ShiftLeft') {
        racketLeft.speedY=-2;
    }
    if (key==='ControlLeft') {
        racketLeft.speedY=2;
    }
    if (key==='ArrowUp') {
        racketRight.speedY=-2;
    }
    if (key==='ArrowDown') {
        racketRight.speedY=2;
    }
    EO.preventDefault(); 
}

function keyup(EO) {
    EO=EO || window.event; 
    const key=EO.code;
    if (key==='ShiftLeft') {
        racketLeft.speedY=0;
    }
    if (key==='ControlLeft') {
        racketLeft.speedY=0;
    }
    if (key==='ArrowUp') {
        racketRight.speedY=0;
    }
    if (key==='ArrowDown') {
        racketRight.speedY=0;
    }
    EO.preventDefault(); 
}


