/* Water intake calculator */
(function () {
  'use strict';
  var wIn=document.getElementById('water-weight');
  var uSel=document.getElementById('water-unit');
  var aSel=document.getElementById('water-activity');
  var out=document.getElementById('water-out');
  if(!out) return;
  function calc(){
    var w=parseFloat(wIn.value);
    if(isNaN(w)||w<=0){out.textContent='—';return;}
    var kg=uSel&&uSel.value==='lb'?w*0.453592:w;
    var base=kg*35; // ml
    var mult=aSel?{low:1,mod:1.2,high:1.5}[aSel.value]||1:1;
    var ml=Math.round(base*mult);
    var l=(ml/1000).toFixed(1);
    var oz=Math.round(ml/29.5735);
    out.textContent=l+' L / '+oz+' fl oz per day';
  }
  [wIn,uSel,aSel].forEach(function(el){if(el)el.addEventListener('change',calc);});
  if(wIn) wIn.addEventListener('input',calc);
  calc();
})();
