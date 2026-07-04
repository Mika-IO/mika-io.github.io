(function(){
  'use strict';
  var days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var months=['January','February','March','April','May','June','July','August','September','October','November','December'];
  var inp=document.getElementById('dow-date');
  var out=document.getElementById('dow-out');
  var det=document.getElementById('dow-detail');
  if(!inp||!out)return;
  inp.value=new Date().toISOString().slice(0,10);
  function calc(){
    if(!inp.value){out.textContent='—';return;}
    var d=new Date(inp.value+'T12:00:00');
    out.textContent=days[d.getDay()];
    if(det){var today=new Date();today.setHours(12,0,0,0);var diff=Math.round((d-today)/86400000);var rel=diff===0?'(today)':diff===1?'(tomorrow)':diff===-1?'(yesterday)':diff>0?'(in '+diff+' days)':'('+Math.abs(diff)+' days ago)';det.textContent=months[d.getMonth()]+' '+d.getDate()+', '+d.getFullYear()+' '+rel;}
  }
  inp.addEventListener('change',calc);
  calc();
})();
