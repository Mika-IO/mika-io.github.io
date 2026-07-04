(function(){
  'use strict';
  function calc(){
    var age=parseInt(document.getElementById('rc-age').value,10);
    var retire=parseInt(document.getElementById('rc-retire').value,10);
    var save=parseFloat(document.getElementById('rc-save').value);
    var rate=parseFloat(document.getElementById('rc-rate').value)/100/12;
    var out=document.getElementById('rc-out'),det=document.getElementById('rc-detail');
    if([age,retire,save,rate].some(isNaN)||retire<=age){if(out)out.textContent='—';return;}
    var n=(retire-age)*12;
    var fv=rate===0?save*n:save*(Math.pow(1+rate,n)-1)/rate;
    if(out)out.textContent=fv.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2});
    if(det)det.textContent='Over '+(retire-age)+' years, you contribute '+((save*n).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2}))+' in total.';
  }
  document.querySelectorAll('#rc-age,#rc-retire,#rc-save,#rc-rate').forEach(function(el){el.addEventListener('input',calc);});
  calc();
})();
