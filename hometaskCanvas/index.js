"use strict";
   
   var cvs=document.getElementById('CVE');
   var z=600;
    cvs.setAttribute("width",z+50); 
    cvs.setAttribute("height",z+50); 
   var context=cvs.getContext('2d');
   var z=500;

  var currTime1=new Date();         
  var min=parseInt(formatDateMin(currTime1));
  var hou=parseInt(formatDateHou(currTime1));
  
  if (hou>12) hou=hou-12;
    updateTime() 
    setInterval(updateTime,1000);

    function updateTime()  {
        context.strokeStyle='yellow';
        context.fillStyle='yellow';
        context.beginPath();
        context.arc(z/2+25,z/2+25,z/2,0,Math.PI*2,false);
        context.fill();
        context.lineWidth=0.05;

        var newClockX=z/2;
        var newClockY=z/2;     
        for(var i=0;i<12;i++)  {
            var k1=i*30;
            var j=i;
            if (j==0) j=12;
            var k=parseFloat(k1)/180*Math.PI
            var newCifX=z/2+25+z/2.5*Math.sin(k);
            var newCifY=z/2+25-z/2.5*Math.cos(k);  
            context.strokeStyle='green';
            context.fillStyle='green';
            context.beginPath();
            context.arc(newCifX,newCifY,z/16,0,Math.PI*2,false);
            context.stroke();
            context.fill();
            context.lineWidth=0.05;

            var aa=z/35;
            if (j>9) aa=z/20;
            context.fillStyle='black';
            context.font=z/10+'px Arial sans-serif';
            context.fillText(j,newCifX-aa,newCifY+z/35);
        }

        var currTime=new Date();
        var newTime1=formatDateTime(currTime);                                 
        var sec=parseInt(formatDateCec(currTime));
        var angle=parseFloat(sec*6)/180*Math.PI;
        var newSecX=(z/2+z/2.2*Math.sin(angle));
        var newSecY=(z/2-z/2.2*Math.cos(angle));
        var newSecX1=(z/2-z/36.2*Math.sin(angle));
        var newSecY1=(z/2+z/36.2*Math.cos(angle));
        context.strokeStyle='black';
        context.lineWidth=z/60;
        context.lineCap='round';
        context.beginPath();
        context.moveTo(25+newSecX1,25+newSecY1);
        context.lineTo(25+newSecX,25+newSecY);
        context.stroke();


  
         
         var cX=1/60;
         min=(min+cX);  
        var angle1=parseFloat(min*6)/180*Math.PI;
        var newMinX=(z/2+z/3*Math.sin(angle1));
        var newMinY=(z/2-z/3*Math.cos(angle1));

        context.strokeStyle='black';
        context.lineWidth=z/40;
        context.lineCap='round';
        context.beginPath();
        context.moveTo(z/2+25,z/2+25);
        context.lineTo(25+newMinX,25+newMinY);
        context.stroke();
   

        hou=(hou+cX/60);
        var angle2=parseFloat(hou*30)/180*Math.PI;
        var newHouX=(z/2+z/4*Math.sin(angle2));
        var newHouY=(z/2-z/4*Math.cos(angle2));  


        context.strokeStyle='black';
        context.lineWidth=z/30;
        context.lineCap='round';
        context.beginPath();
        context.moveTo(z/2+25,z/2+25);
        context.lineTo(25+newHouX,25+newHouY);
        context.stroke();

    
        context.fillStyle='black';
        context.font=z/8+'px Arial sans-serif';
        context.fillText(newTime1,z/3.5,z/2.7);
    }

      function formatDateTime(dt) {       
        var hours=dt.getHours();
        var minutes=dt.getMinutes();
        var seconds=dt.getSeconds();
        return  str0l(hours,2) + ':' + str0l(minutes,2) + ':' + str0l(seconds,2);
        }

     function formatDateHou(dt) {       
        var hours=(dt.getHours());       
        return  str0l(hours,2);
        }  


    function formatDateCec(dt) {              
        var seconds=(dt.getSeconds());
        return str0l(seconds,2);
        }

    function formatDateMin(dt) {              
        var minutes=(dt.getMinutes());       
        return str0l(minutes,2);
        }

    function str0l(val,len) {
        var strVal=val.toString();
        while ( strVal.length < len )
            strVal='0'+strVal;
        return strVal;
        }