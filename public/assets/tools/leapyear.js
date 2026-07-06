(function(){
  'use strict';
  function isLeap(y){return y%4===0&&(y%100!==0||y%400===0);}
  var inp=document.getElementById('ly-year');
  var out=document.getElementById('ly-out');
  var next=document.getElementById('ly-next');
  if(!out)return;
  if(inp)inp.value=new Date().getFullYear();
  function calc(){
    var y=parseInt(inp.value,10);
    if(isNaN(y)){out.textContent='—';if(next)next.textContent='';return;}
    out.textContent=isLeap(y)?y+' is a leap year ✓':y+' is not a leap year';
    var n=y+1;while(!isLeap(n))n++;
    if(next)next.textContent='Next leap year: '+n;
  }
  if(inp)inp.addEventListener('input',calc);
  calc();
})();
