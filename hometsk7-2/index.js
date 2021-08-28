"use strict"

document.body.addEventListener('mousedown',mousedown,false);
document.body.addEventListener('mousemove',mousemove,false);
document.body.addEventListener('mouseup',mouseup,false);


function mousedown (EO) {
    EO=EO||window.event;
    var pictureObj=document.getElementById('picture');
    pictureObj.style.position='absolute';

}

function mousemove (EO) {
    EO=EO||window.event;
    var pictureObj=document.getElementById('picture');
    pictureObj.style.position='absolute';
    pictureObj.style.left=EO.pageX+"px";
    pictureObj.style.top=EO.pageY+"px";
}

function mouseup (EO) {
    EO=EO||window.event;

}
