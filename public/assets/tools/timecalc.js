(function(){
  'use strict';
  var ids=['tc-h1','tc-m1','tc-s1','tc-h2','tc-m2','tc-s2','tc-op'];
  function g(id){return document.getElementById(id);}
  function calc(){
    var h1=parseInt(g('tc-h1').value||0,10),m1=parseInt(g('tc-m1').value||0,10),s1=parseInt(g('tc-s1').value||0,10);
    var h2=parseInt(g('tc-h2').value||0,10),m2=parseInt(g('tc-m2').value||0,10),s2=parseInt(g('tc-s2').value||0,10);
    var op=g('tc-op').value;
    var t1=h1*3600+m1*60+s1,t2=h2*3600+m2*60+s2;
    var r=op==='+'?t1+t2:t1-t2;
    var sign=r<0?'-':''; r=Math.abs(r);
    var h=Math.floor(r/3600),m=Math.floor((r%3600)/60),s=r%60;
    var out=document.getElementById('tc-out');
    if(out)out.textContent=sign+(h<10?'0':'')+h+'h '+(m<10?'0':'')+m+'m '+(s<10?'0':'')+s+'s';
  }
  ids.forEach(function(id){var el=g(id);if(el)el.addEventListener('input',calc);});
  calc();
})();
