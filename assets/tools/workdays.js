(function(){
  'use strict';
  var from=document.getElementById('wd-from'),to=document.getElementById('wd-to');
  var out=document.getElementById('wd-out'),det=document.getElementById('wd-detail');
  var today=new Date().toISOString().slice(0,10);
  if(from)from.value=today;
  if(to){var d=new Date();d.setDate(d.getDate()+30);to.value=d.toISOString().slice(0,10);}
  function countWorkdays(a,b){
    var s=new Date(a<b?a:b),e=new Date(a<b?b:a);
    var count=0;
    for(var d=new Date(s);d<=e;d.setDate(d.getDate()+1)){var day=d.getDay();if(day!==0&&day!==6)count++;}
    return count;
  }
  function calc(){
    if(!from.value||!to.value){out.textContent='—';return;}
    var w=countWorkdays(from.value,to.value);
    var total=Math.round(Math.abs(new Date(to.value)-new Date(from.value))/86400000)+1;
    out.textContent=w+' working days';
    if(det)det.textContent='('+total+' calendar days, '+(total-w)+' weekend days)';
  }
  if(from)from.addEventListener('change',calc);
  if(to)to.addEventListener('change',calc);
  calc();
})();
