(function(){
  'use strict';
  function calc(){
    var w=parseFloat(document.getElementById('paint-w').value);
    var h=parseFloat(document.getElementById('paint-h').value);
    var unit=document.getElementById('paint-unit').value;
    var walls=parseInt(document.getElementById('paint-walls').value,10)||1;
    var coats=parseInt(document.getElementById('paint-coats').value,10)||2;
    var cov=parseFloat(document.getElementById('paint-cov').value)||10;
    var out=document.getElementById('paint-out');
    if([w,h].some(isNaN)){if(out)out.textContent='—';return;}
    var area=w*h*(unit==='ft'?0.0929:1)*walls;
    var litres=area*coats/cov;
    if(out)out.textContent=litres.toFixed(1)+' L ('+Math.ceil(litres)+' L rounded up)';
  }
  document.querySelectorAll('#paint-w,#paint-h,#paint-unit,#paint-walls,#paint-coats,#paint-cov').forEach(function(el){el.addEventListener('input',calc);el.addEventListener('change',calc);});
  calc();
})();
