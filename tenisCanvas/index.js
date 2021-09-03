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
    speedY:1,
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
    speedY:1,
    updateR: function() {
        context.fillStyle='blue';
        context.fillRect(490,this.posY,this.width,this.height);
    }
}
//рисуем мяч
const ball={
    posX:250,
    posY:150,
    width:10,
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
    requestAnimationFrame(tick);
    ball.posX=250;
    ball.posY=150;
    racketLeft.posY=110;
    racketRight.posY=110;
    // //нажатие клавиш
    window.addEventListener('keydown',keydown,false);
    window.addEventListener('keyup',keyup,false);

}

function tick() {
    ball.posX+=ball.speedX;
    ball.posY+=ball.speedY;
    context.fillStyle='yellow';
    context.fillRect(0,0,canvas.width,canvas.height);
    ball.updateB();
    racketLeft.updateL();
    racketRight.updateR();
    requestAnimationFrame(tick);
}

ball.updateB();
racketLeft.updateL();
racketRight.updateR();



function keydown(EO){
    EO=EO || window.event; 
    const key=EO.code;
    if (key==='ShiftLeft') {
        racketLeft.posY-=racketLeft.speedY;
    }
    if (key==='ControlLeft') {
        racketLeft.posY+=racketLeft.speedY;
    }
    if (key==='ArrowUp') {
        racketRight.posY-=racketRight.speedY;
    }
    if (key==='ArrowDown') {
        racketRight.posY+=racketRight.speedY;
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


