(function(){
  'use strict';
  var inp=document.getElementById('temp-val'),from=document.getElementById('temp-from');
  function calc(){
    var v=parseFloat(inp.value),u=from.value,c;
    if(isNaN(v)){['c','f','k','r'].forEach(function(id){var el=document.getElementById('temp-'+id);if(el)el.textContent='—';});return;}
    if(u==='c')c=v;
    else if(u==='f')c=(v-32)*5/9;
    else if(u==='k')c=v-273.15;
    else c=(v-491.67)*5/9;
    var f=c*9/5+32,k=c+273.15,r=(c+273.15)*9/5;
    var fmt=function(n){return parseFloat(n.toFixed(4)).toString();};
    var el;
    if(el=document.getElementById('temp-c'))el.textContent=fmt(c)+'°C';
    if(el=document.getElementById('temp-f'))el.textContent=fmt(f)+'°F';
    if(el=document.getElementById('temp-k'))el.textContent=fmt(k)+' K';
    if(el=document.getElementById('temp-r'))el.textContent=fmt(r)+'°R';
  }
  [inp,from].forEach(function(el){el.addEventListener('input',calc);el.addEventListener('change',calc);});
  calc();
})();
