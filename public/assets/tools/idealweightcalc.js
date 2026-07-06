(function(){
  'use strict';
  function calc(){
    var h=parseFloat(document.getElementById('iw-height').value);
    var hu=document.getElementById('iw-hunit').value;
    var sex=document.getElementById('iw-sex').value;
    var out=document.getElementById('iw-out'),det=document.getElementById('iw-detail');
    if(isNaN(h)){if(out)out.textContent='—';return;}
    var cm=hu==='in'?h*2.54:h;
    var m=cm/100;
    var lo=18.5*m*m,hi=24.9*m*m;
    var in_cm=cm-152.4;
    var robinson=sex==='m'?52+1.905*(in_cm/2.54):49+1.700*(in_cm/2.54);
    var devine=sex==='m'?50+2.3*(in_cm/2.54):45.5+2.3*(in_cm/2.54);
    var miller=sex==='m'?56.2+1.41*(in_cm/2.54):53.1+1.36*(in_cm/2.54);
    if(out)out.textContent=lo.toFixed(1)+' – '+hi.toFixed(1)+' kg';
    if(det)det.textContent='Robinson: '+robinson.toFixed(1)+' kg · Devine: '+devine.toFixed(1)+' kg · Miller: '+miller.toFixed(1)+' kg';
  }
  document.querySelectorAll('#iw-height,#iw-hunit,#iw-sex').forEach(function(el){el.addEventListener('input',calc);el.addEventListener('change',calc);});
  calc();
})();
