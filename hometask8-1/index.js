'use strict'

const hourCount=12; //количество кружочков
const clock=document.querySelector('.container');
const radius=clock.offsetWidth/2;
const smallRadius=radius/7.5; //радиус маленьких кружочков
const distance=radius*4/5; //расстояние между центрами
const sectorAngle=Math.PI*2/hourCount; //угол сектора

const hourArrowWidth=10;
const hourArrowLength=radius*0.6;
const minutArrowWidth=7;
const minutArrowLength=radius*0.7;
const secondArrowWidth=5;
const secondArrowLength=radius*0.8;

function updateTime() {
    const date=new Date();
    const hours=date.getHours();
    const minuts=date.getMinutes();
    const second=date.getSeconds();
    const sec=360/60*second;
    const min=360/60*minuts;
    const hou=360/hourCount*(hours+minuts/60);
    hourArrow.style.transform=`rotate(${hou+180}deg)`;
    minutArrow.style.transform=`rotate(${min+180}deg)`;
    secondArrow.style.transform=`rotate(${sec+180}deg)`;
    timeNow.innerHTML=getCurrentTimeString();
    setTimeout(updateTime,1000-date.getMilliseconds());
}


// рисуем маленькие кружочки
for (let i=1; i<=hourCount; i++) {
    let hourClock=document.createElement('div');
    hourClock.textContent=i;
    hourClock.classList.add('hourClock');
    hourClock.style.height=smallRadius*2+'px';
    hourClock.style.width=smallRadius*2+'px';
    hourClock.style.left=(radius+distance*Math.sin(i*sectorAngle)-smallRadius)+'px';
    hourClock.style.top=(radius-distance*Math.cos(i*sectorAngle)-smallRadius)+'px';
    clock.appendChild(hourClock);
}

// выставляем время
const timeNow=document.createElement('span');
function getCurrentTimeString() {
    let date=new Date();
    return date.toTimeString().split(" ")[0];
}
timeNow.innerHTML=getCurrentTimeString();
timeNow.style.position='absolute';
timeNow.style.left=(radius+distance*Math.sin(hourCount*sectorAngle)-smallRadius)+'px';
timeNow.style.top=radius/2+'px';
clock.appendChild(timeNow);


// создаем часовую стрелку
const hourArrow=createArrow(radius, hourArrowWidth, hourArrowLength);
clock.appendChild(hourArrow);

// создаем минутную стрелку
const minutArrow=createArrow(radius, minutArrowWidth, minutArrowLength);
clock.appendChild(minutArrow);


//создаем секундную стрелку
const secondArrow=createArrow(radius, secondArrowWidth, secondArrowLength);
clock.appendChild(secondArrow);
updateTime();


function createArrow(clockRadius,width,length) {
    const arrow=document.createElement('div');
    arrow.classList.add('arrow');
    arrow.style.width=width+'px';
    arrow.style.height=length+'px';
    arrow.style.left=clockRadius-width/2+'px';
    arrow.style.top=clockRadius-width/2+'px';
    arrow.style.transformOrigin=`center ${width/2}px`;
    return arrow
}












