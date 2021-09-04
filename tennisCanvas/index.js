"use strict";

const canvas=document.getElementById('CVS');
const context=canvas.getContext('2d');

let gameNow; //идет ли сейчас игра

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
account.innerHTML=ball.acLeft+':'+ball.acRight;

//поле
const area={
    width:500,
    height:300
}

//рандомный угол


function start() {
    gameNow=true;

    ball.posX=250;
    ball.posY=150;
    let direction=(-1)^Math.round(Math.random()); //направление,получаем либо 1 либо -1
    let angle=direction*Math.PI*(2/3*Math.random()+1/6); // рандомный угол, исключая направление вверх и вниз
    ball.speedY=2*Math.cos(angle);
    ball.speedX=2*Math.sin(angle);
    racketRight.posY=110;
    racketLeft.posY=110;
    console.log(ball);

    //нажатие клавиш
    if (gameNow){
        window.addEventListener('keydown',keydown,false);
        window.addEventListener('keyup',keyup,false);
    }
}
requestAnimationFrame(tick);


function tick() {
    context.fillStyle='yellow';
    context.fillRect(0,0,canvas.width,canvas.height);
    ball.posX+=ball.speedX;
    ball.posY+=ball.speedY;
    racketLeft.posY+=racketLeft.speedY;
    racketRight.posY+=racketRight.speedY;
    account.innerHTML=ball.acLeft+':'+ball.acRight;


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
    //вылетел ли мячик вверх и вниз
    if (ball.posY-ball.height/2<0) {
        ball.speedY=-ball.speedY;
        ball.posY=ball.height/2;
    }
    if (ball.posY+ball.height/2>area.height) {
        ball.speedY=-ball.speedY;
        ball.posY=area.height-ball.height/2;
    }
    //вылетел ли мячик влево 
    if (ball.posX-ball.width/2<0) {
        ball.speedX=0;
        ball.speedY=0;
        ball.posX=ball.width/2;
        ball.acLeft+=1;
        gameNow=false;
        // cancelAnimationFrame(requestID);
    }
    //вылетел ли мячик вправо
    if (ball.posX+ball.width/2>area.width) {
        ball.speedX=0;
        ball.speedY=0;
        ball.posX=area.width-ball.width/2;
        ball.acRight+=1;
        gameNow=false;
        // cancelAnimationFrame(requestID);
    }
    //ударился ли мячик о левую ракетку
    if (ball.posX-ball.width/2<racketLeft.width) {
        if (ball.posY>=racketLeft.posY&&ball.posY<racketLeft.posY+racketLeft.height){
            ball.speedX=-ball.speedX;
            ball.posX=racketLeft.width+ball.width/2; 
        }
    }

    //ударился ли мячик о правую ракетку
    if (ball.posX+ball.width/2>area.width-racketRight.width) {
        if (ball.posY>=racketRight.posY&&ball.posY<racketRight.posY+racketRight.height) {
            ball.speedX=-ball.speedX;
            ball.posX=area.width-racketRight.width-ball.width/2;
        }
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
    if (!gameNow) {
        return
    } 
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
    if (!gameNow) {
        return
    }
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

function randomDiap() {
    return Math.round(Math.random());
}