(function(){
  'use strict';
  var inp=document.getElementById('sq-n'),out=document.getElementById('sq-out'),sqEl=document.getElementById('sq-sq');
  if(!inp)return;
  function calc(){
    var n=parseFloat(inp.value);
    if(isNaN(n)){out.textContent='—';if(sqEl)sqEl.textContent='—';return;}
    if(n<0){out.textContent='imaginary';if(sqEl)sqEl.textContent=(n*n).toLocaleString([],{maximumFractionDigits:8});return;}
    out.textContent=Math.sqrt(n).toLocaleString([],{maximumFractionDigits:10});
    if(sqEl)sqEl.textContent=(n*n).toLocaleString([],{maximumFractionDigits:8});
  }
  inp.addEventListener('input',calc);calc();
})();
