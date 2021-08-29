"use strict"


document.body.ondragstart = function () {
    return false
};

const imgElem=document.getElementsByTagName('img');
const divElem=document.querySelector('.container');

window.onload=function() {
    Array.from(imgElem).forEach(element => {
        element.style.left=element.offsetLeft+'px';
        element.style.top=element.offsetTop+'px';
    });
    
    Array.from(imgElem).forEach(element => {
        element.style.position='absolute';
    });
}


document.body.addEventListener('mousedown',mousedown,false);
document.body.addEventListener('mousemove',mousemove,false);
document.body.addEventListener('mouseup',mouseup,false);


let currentPicture;
let clickX=0;
let clickY=0;

function mousedown (event) {
    event=event||window.event;
    currentPicture=event.target;
    if (currentPicture.tagName=='IMG') {
        currentPicture.style.cursor='pointer';
        currentPicture.style.position='absolute';
        clickX=event.pageX-currentPicture.offsetLeft;
        clickY=event.pageY-currentPicture.offsetTop;
        divElem.appendChild(currentPicture);
    }
}

function mousemove (event) {
    event=event||document.event;
    if (currentPicture) {
        currentPicture.style.left=event.pageX-clickX+"px";
        currentPicture.style.top=event.pageY-clickY+"px";
    }
}

function mouseup (event) {
    event=event||window.event;
    if (currentPicture) {
        currentPicture.style.cursor='default';
        currentPicture=undefined;
    }
}
