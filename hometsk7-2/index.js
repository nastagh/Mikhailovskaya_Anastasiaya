"use strict"


// const imgElem=document.getElementById('picture');
// console.log(imgElem);


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
        currentPicture.style.position='absolute';
        clickX=event.pageX-currentPicture.offsetLeft;
        clickY=event.pageY-currentPicture.offsetTop;
    console.log(clickY,clickX);
    }
    // console.log(currentPicture);
}

function mousemove (event) {
    event=event||window.event;
    if (currentPicture) {
        currentPicture.style.left=event.pageX-clickX+"px";
        currentPicture.style.top=event.pageY-clickY+"px";
        console.log(currentPicture);
    }
}

function mouseup (event) {
    event=event||window.event;
    if (currentPicture) {
        currentPicture=undefined;
    }
}
