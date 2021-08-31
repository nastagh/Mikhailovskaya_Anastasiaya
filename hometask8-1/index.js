'use strict'

const hourCount=12;
const clock=document.querySelector('.container');
const radius=clock.offsetWidth/2;
const smallRadius=radius/7.5;
const distance=radius*4/5;
const sectorAngle=Math.PI*2/hourCount;

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

setInterval(getCurrentTimeString,1000);

const timeNow=document.createElement('span');
function getCurrentTimeString() {
    let date=new Date();
    // setTimeout(getCurrentTimeString, 1020-date.getMilliseconds());
    return date.toTimeString().split(" ")[0];
}
timeNow.innerHTML=getCurrentTimeString();
timeNow.style.position='absolute';
timeNow.style.left=(radius+distance*Math.sin(hourCount*sectorAngle)-smallRadius)+'px';
timeNow.style.top=radius/2+'px';
clock.appendChild(timeNow);

// setInterval(getCurrentTimeString,1020);

// создаем часовую стрелку
const hourArrow=document.createElement('div');
const arrowWidth=10;
const hourArrowHeight=radius*0.6;

hourArrow.classList.add('arrow');
hourArrow.style.height=hourArrowHeight+'px';
hourArrow.style.width=arrowWidth+'px';
hourArrow.style.left=radius-arrowWidth/2+'px';
hourArrow.style.top=radius/2+'px';
hourArrow.style.transformOrigin=`center ${hourArrowHeight-arrowWidth*1.5}px`;

clock.appendChild(hourArrow);

// создаем минутную стрелку
const minutArrow=document.createElement('div');
const minutWidth=7;
const minutArrowHeight=radius*0.7;
minutArrow.classList.add('arrow');
minutArrow.style.height=minutArrowHeight+'px';
minutArrow.style.width=minutWidth+'px';
minutArrow.style.left=radius-minutWidth/2+'px';
minutArrow.style.top=radius/3.3+'px';
minutArrow.style.transformOrigin=`center ${minutArrowHeight-minutWidth*1.5}px`;
// minutArrow.style.transform='rotate(60deg)';
clock.appendChild(minutArrow);

//создаем секундную стрелку
const secondArrow=document.createElement('div');
const secondWidth=5;
const secondArrowHeight=radius*0.8;
secondArrow.classList.add('arrow');
secondArrow.style.height=secondArrowHeight+'px';
secondArrow.style.width=secondWidth+'px';
secondArrow.style.left=radius-secondWidth/2+'px';
secondArrow.style.top=radius/3.8+'px';
secondArrow.style.transformOrigin=`center ${secondArrowHeight-secondWidth*1.5}px`;

clock.appendChild(secondArrow);



function updateTime() {
    const date=new Date();
    const hours=date.getHours();
    const minuts=date.getMinutes();
    const second=date.getSeconds();
    const sec=360/60*second;
    const min=360/60*minuts;
    const hou=360/hourCount*(hours+minuts/60);
    hourArrow.style.transform=`rotate(${hou}deg)`;
    minutArrow.style.transform=`rotate(${min}deg)`;
    secondArrow.style.transform=`rotate(${sec}deg)`;
}

setInterval(updateTime,1000);

// сделать через центр!!!!










