"use strict";

const canvas=document.getElementById('canvas');
const context=canvas.getContext('2d');
const rules=document.getElementById('rulesInfo');
const container=document.getElementById('container');
const rulesInfo=document.getElementById('rulesInfo');
const rulesContainer=document.getElementById('rulesContainer');
const recordsContainer=document.getElementById('recordsContainer');

// canvas.width=container.offsetWidth;
// canvas.height=container.offsetHeight;

// const nameContainer=document.getElementById('nameContainer');
let requestG;
let gameNow; //идет ли сейчас игра
let pauseButton=false;
const state={ballSpeedX:0, ballSpeedY:0, racketSpeedX:0, ballPosX:0, ballPosY:0, racketPosX:0, racketPosY:0};
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
    lev:1,
    updateB: function(){
        context.fillStyle='rgb(130 136 140)';
        context.beginPath();
        context.arc(this.posX,this.posY,this.width/2,0,Math.PI*2,false);
        context.fill();
    }
}
score.innerHTML=`Счет: ${ball.acWin}/${ball.acGame}`;
level.innerHTML=`Уровень: ${ball.lev}`
//поле
const area={
    width:canvas.width,
    height:400
}
console.log (area.width);

//кирпичи
class Brick {
    constructor(posX,posY,width,height,color) {
        this.posX=posX;
        this.posY=posY;
        this.width=width;
        this.height=height;
        this.color=color;
    }
    isTouch(ball){
        if (ball.posY-ball.width/2<this.posY+this.height&&ball.posY+ball.width/2>=this.posY) {
            if (ball.posX+ball.width/2>=this.posX&&ball.posX-this.width/2<this.posX+this.width) {
                return true;
            }
        }
    }
}
let bricks=[];
const amountInRow=4;
const amountOfRows=3;
const horisontalMargin=5;
const brickWidth=(area.width-(amountInRow+1)*horisontalMargin)/amountInRow;
const brickHeight=20;
const verticalMargin=5;

context.drawBrick= function(brick) {
    this.fillStyle=brick.color;
    this.fillRect(brick.posX,brick.posY,brick.width,brick.height);
}

fillBricks()

//начало игры
function start(){
    gameNow=true;
    cancelAnimationFrame(requestG);
    ball.posX=250;
    ball.posY=371;
    ball.speedX=2*(-1)^Math.round(Math.random());
    ball.speedY=-2*(-1)^Math.round(Math.random());
    racket.posX=200;
    racket.posY=385;
    if (bricks.length==0) {
        fillBricks()
    }

    if (gameNow){
        ball.speedX=2*(-1)^Math.round(Math.random());
        ball.speedY=-2*(-1)^Math.round(Math.random());
        window.addEventListener('keydown',keydown,false);
        window.addEventListener('keyup',keyup,false);
        canvas.addEventListener('mousemove',mousemove,false);
        canvas.addEventListener('touchstart',touchstart,false);
        canvas.addEventListener('touchend',touchend,false);
    }

    //если была включена пауза
    if (pauseButton) {
        pauseButton=false;
        ball.speedY=state.ballSpeedY;
        ball.speedX=state.ballSpeedX;
        ball.posX=state.ballPosX;
        ball.posY=state.ballPosY;
        racket.speedX=state.racketSpeedX;
        racket.posX=state.racketPosX;
        racket.posY=state.racketPosY;
    }

    clickSoundStartInit()
    clickSoundInit()  //запускае звук по нажатию на кнопку
    clickSoundBrickInit()
    clickSoundStart()
    requestG=requestAnimationFrame(tick);
}

function tick() {
    context.clearRect(0,0,canvas.width,canvas.height);
    ball.posX+=ball.speedX;
    ball.posY+=ball.speedY;
    racket.posX+=racket.speedX;
    score.innerHTML=`Счет: ${ball.acWin}/${ball.acGame}`;
    level.innerHTML=`Уровень: ${ball.lev}`
    
    //ударился ли мяч о кирпичик
    for (let i=0; i<bricks.length; i++) {
        if (bricks[i].isTouch(ball)) {
            bricks.splice(i,1);
            ball.speedY=-ball.speedY;
            clickSoundBrick();
            vibro(true);
            break;
        }
    }
    //строим блоки
    bricks.forEach(brick => {
        context.drawBrick(brick)
    });

    //если кирпичи выбились, то игра останавливается
    if (bricks.length==0&&gameNow) {
        gameNow=false;
        ball.speedY=0;
        ball.speedX=0;
        ball.acWin+=1;
        ball.lev+=1;
    }

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
        vibro(false)
    }
    //вылетел ли мячик вправо
    if (ball.posX+ball.width/2>area.width) {
        ball.posX=area.width-ball.width/2;
        ball.speedX=-ball.speedX;
        vibro(false)
    }
    //вылетел ли мячик вверх
    if (ball.posY-ball.width/2<0) {
        ball.speedY=-ball.speedY;
        ball.posY=ball.width/2;
        vibro(false)
    }
    //вылетел ли мячик вниз
    if (ball.posY+ball.width/2>area.height) {
        ball.speedY=0;
        ball.speedX=0;
        ball.posY=area.height-ball.width/2;
        ball.acGame+=1;
        clickSound();
        gameNow=false;
    }
    // ударился ли мяч о ракетку
    if (ball.posY+ball.width/2>racket.posY+racket.height/2) {
        if (ball.posX+ball.width/2>=racket.posX&&ball.posX<racket.posX+racket.width) {
            ball.speedY=-ball.speedY;
            ball.speedX=ball.speedX;
            vibro(true);
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
    racket.posX=EO.pageX-canvas.offsetLeft-racket.width/2;
}
//построение блоков
function fillBricks() {
    for (let row=0; row<amountOfRows; row++){
        for (let column=0; column<amountInRow; column++){
            const brick=new Brick(column*brickWidth+(column+1)*horisontalMargin,row*brickHeight+(row+1)*verticalMargin,brickWidth,brickHeight,`rgb(${getRandomColor(0,255)}, ${getRandomColor(0,255)}, ${getRandomColor(0,255)}`);
            bricks.push(brick);
            context.drawBrick(brick)
        }
    }
}

//touch события
let currentRacket;
let touchX=0;
function touchstart (EO) {
    EO=EO || window.event; 
    if (!gameNow) {
        return
    }
    currentRacket=EO.target;
    touchX=EO.pageX;
    canvas.ontouchmove = (event)=>{
        event.preventDefault()
        const touch = event.touches[0] || event.changedTouches[0];
        event.pageX = touch.pageX;
        mousemove(event);
    };
}

function touchend(EO) {
    canvas.ontouchmove = undefined;
    EO=EO || window.event; 
    if (currentRacket) {
        currentRacket=undefined;
    }
}

//звуки
const clickAudio= new Audio("./6-track-6.mp3");
const clickAudioBrick= new Audio("./brick.mp3");
const clickAudioStart= new Audio("./start.mp3");

function clickSoundInit() {
    clickAudio.play(); //запускаем звук
    clickAudio.pause(); //и сразу выключаем
}
function clickSound() {
    clickAudio.currentTime=0;
    clickAudio.play();
}
function clickSoundBrickInit() {
    clickAudioBrick.play();
    clickAudioBrick.pause();
}
function clickSoundBrick() {
    clickAudioBrick.currentTime=0;
    clickAudioBrick.play();
}
function clickSoundStartInit() {
    clickAudioStart.play(); 
    clickAudioStart.pause(); 
}
function clickSoundStart() {
    clickAudioStart.currentTime=0;
    clickAudioStart.play();
}
//вибро
function vibro(longFlag) {
    if ( navigator.vibrate ) { // есть поддержка Vibration API?
        if ( !longFlag )
            window.navigator.vibrate(100); // вибрация 100мс
        else
            window.navigator.vibrate([100,50,100,50,100]); // вибрация 3 раза по 100мс с паузами 50мс
    }
}
//SPA
window.onhashchange=switchToStateFromURLHash;
// текущее состояние приложения
let SPAState={};
let stateStr="";
function switchToStateFromURLHash() {
    let URLHash=window.location.hash;
    // убираем из закладки УРЛа решётку
    stateStr=URLHash.substr(1);
    if (stateStr!="") {       // если закладка непустая, читаем из неё состояние и отображаем
        let parts=stateStr.split("_");
        SPAState={pagename: parts[0]};// первая часть закладки - номер страницы
    }
    else
        SPAState={pagename: 'Main'};
    // обновляем вариабельную часть страницы под текущее состояние
    // это реализация View из MVC - отображение состояния модели в HTML-код
    switch (SPAState.pagename) {
        case 'Rules':
            rulesContainer.style.display='block';
            recordsContainer.style.display='none';
            container.style.display='none';
            // nameContainer.style.display='none';
            pause();
            break
        case 'Main':
            rulesContainer.style.display='none';
            recordsContainer.style.display='none';
            // nameContainer.style.display='none';
            container.style.display='block';
            break
        case 'Records':
            // nameContainer.style.display='none';
            recordsContainer.style.display='block';
            rulesContainer.style.display='none';
            container.style.display='none';
            pause();
            break
        // case 'Name':
        //     rulesContainer.style.display='none';
        //     recordsContainer.style.display='none';
        //     nameContainer.style.display='block';
        //     container.style.display='none';
        //     break
    }
}
function switchToState(newState) {
    // устанавливаем закладку УРЛа
    // нужно для правильной работы кнопок навигации браузера
    // (т.к. записывается новый элемент истории просмотренных страниц)
    // и для возможности передачи УРЛа другим лицам
    stateStr=newState.pagename;
    location.hash=stateStr;
}

function switchToMainPage() {
    switchToState({pagename: 'Main'});
}
function switchToRules() {
    switchToState({pagename:'Rules'});
}
function switchToRecords(){
    switchToState({pagename:'Records'});
}
// function switchToName() {
//     switchToState({pagename:'Name'});
// }

switchToStateFromURLHash();

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// //предупреждение о потере данных
// window.onbeforeunload=befUnload;
// function befUnload(EO) {
//     EO=EO || window.event; 
//     EO.returnValue='Несохраненные данные будут утеряны';
// }

//РАНДОМНЫЙ ЦВЕТ
function getRandomColor(min, max) {
    return Math.ceil(Math.random()*(max-min)+min)
}

//пауза
function pause() {
    state.ballSpeedX=ball.speedX;
    state.ballSpeedY=ball.speedY;
    state.racketSpeedX=racket.speedX;
    state.ballPosX=ball.posX;
    state.ballPosY=ball.posY;
    state.racketPosY=racket.posY;
    state.racketPosX=racket.posX;
    pauseButton=true;
    gameNow=false;
    ball.speedY=0;
    ball.speedX=0;
}


//таблица рекордов
const ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
let messages; // элемент массива - {name:'Иванов',score:'1'};
let updatePassword;
const stringName='MIKHAILOVSKAYA_ARKANOID';
// показывает все сообщения из messages на страницу
function showMessages() {
    let str='';
    for (let m=0; m<messages.length; m++) {
        let message=messages[m];
        str+='<tr>'+'<td style="width: 50%; text-align: center">'+escapeHTML(message.name)+'</td>'+'<td style="width: 50%; text-align: center">'+escapeHTML(message.score)+'</td>'+'</tr>';
    }
    document.getElementById('tablerecords').innerHTML=str;
} 
function escapeHTML(text) {
    if ( !text )
        return text;
    text=text.toString()
        .split("&").join("&amp;")
        .split("<").join("&lt;")
        .split(">").join("&gt;")
        .split('"').join("&quot;")
        .split("'").join("&#039;");
    return text;
}
// получает сообщения с сервера и потом показывает
function refreshMessages() {
    $.ajax( {
        url : ajaxHandlerScript,
        type : 'POST', dataType:'json',
        data : { f : 'READ', n : stringName },
        cache : false,
        success : readReady,
        error : errorHandler
    }
    );
}

function readReady(callresult) { // сообщения получены - показывает
    if ( callresult.error!=undefined )
        alert(callresult.error);
    else {
        messages=[];
        if ( callresult.result!="" ) { // либо строка пустая - сообщений нет
            // либо в строке - JSON-представление массива сообщений
            messages=JSON.parse(callresult.result);
            // вдруг кто-то сохранил мусор 
            if ( !Array.isArray(messages) )
                messages=[];
        }
        showMessages();
    }
}
// получает сообщения с сервера, добавляет новое,
// показывает и сохраняет на сервере
function sendMessage() {
    // switchToState({pagename: 'Main'});
    updatePassword=Math.random();
    $.ajax( {
            url : ajaxHandlerScript,
            type : 'POST', dataType:'json',
            data : { f : 'LOCKGET', n : stringName,
                p : updatePassword },
            cache : false,
            success : lockGetReady,
            error : errorHandler
        }
    );
}
// сообщения получены, добавляет, показывает, сохраняет
function lockGetReady(callresult) {
    if ( callresult.error!=undefined )
        alert(callresult.error);
    else {
        messages=[];
        if ( callresult.result!="" ) { // либо строка пустая - сообщений нет
            // либо в строке - JSON-представление массива сообщений
            messages=JSON.parse(callresult.result);
            // вдруг кто-то сохранил мусор 
            if ( !Array.isArray(messages) )
                messages=[];
        }
    const senderName=document.getElementById('IName').value;
    let message=ball.acWin+"/"+ball.acGame;
    messages.push({name:senderName, score:message});
    if ( messages.length>10 ){
        messages=messages.slice(messages.length-10);
    }
    showMessages();
    $.ajax( {
        url : ajaxHandlerScript,
        type : 'POST', dataType:'json',
        data : { f : 'UPDATE', n : stringName,
            v : JSON.stringify(messages), p : updatePassword },
        cache : false,
        success : updateReady,
        error : errorHandler
            }
        );
    }
}
// сообщения вместе с новым сохранены на сервере
function updateReady(callresult) {
    if ( callresult.error!=undefined )
        alert(callresult.error);
}
function errorHandler(jqXHR,statusStr,errorStr) {
    alert(statusStr+' '+errorStr);
}
refreshMessages();