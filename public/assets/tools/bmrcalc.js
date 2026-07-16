(function(){
  'use strict';
  function calc(){
    var w=parseFloat(document.getElementById('bmr-weight').value);
    var wu=document.getElementById('bmr-wunit').value;
    var h=parseFloat(document.getElementById('bmr-height').value);
    var hu=document.getElementById('bmr-hunit').value;
    var age=parseFloat(document.getElementById('bmr-age').value);
    var sex=document.getElementById('bmr-sex').value;
    var out=document.getElementById('bmr-out');
    if([w,h,age].some(isNaN)){if(out)out.textContent='—';return;}
    var kg=wu==='lb'?w*0.453592:w;
    var cm=hu==='in'?h*2.54:h;
    var bmr=10*kg+6.25*cm-5*age+(sex==='m'?5:-161);
    if(out)out.textContent=Math.round(bmr).toLocaleString(window.__LANG||undefined)+' kcal/day';
  }
  document.querySelectorAll('#bmr-weight,#bmr-wunit,#bmr-height,#bmr-hunit,#bmr-age,#bmr-sex').forEach(function(el){el.addEventListener('input',calc);el.addEventListener('change',calc);});
  calc();
})();
