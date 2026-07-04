/* Pythagorean theorem */
(function () {
  'use strict';
  var a=document.getElementById('pyth-a'), b=document.getElementById('pyth-b'), c=document.getElementById('pyth-c');
  var out=document.getElementById('pyth-out');
  if (!out) return;
  function calc() {
    var av=parseFloat(a.value),bv=parseFloat(b.value),cv=parseFloat(c.value);
    var filled=[!isNaN(av)&&av>0,!isNaN(bv)&&bv>0,!isNaN(cv)&&cv>0].filter(Boolean).length;
    if (filled<2){out.textContent='—';return;}
    var r;
    if(isNaN(cv)||cv<=0) r='c = '+Math.sqrt(av*av+bv*bv).toLocaleString([],{maximumFractionDigits:6});
    else if(isNaN(av)||av<=0) r='a = '+Math.sqrt(cv*cv-bv*bv).toLocaleString([],{maximumFractionDigits:6});
    else r='b = '+Math.sqrt(cv*cv-av*av).toLocaleString([],{maximumFractionDigits:6});
    out.textContent=r;
  }
  [a,b,c].forEach(function(el){if(el)el.addEventListener('input',calc);});
  calc();
})();
