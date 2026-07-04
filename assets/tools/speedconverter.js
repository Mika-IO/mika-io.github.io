(function(){
  'use strict';
  var toMs={ms:1,kmh:1/3.6,mph:0.44704,knot:0.514444,mach:343};
  var ids=['ms','kmh','mph','knot','mach'];
  var fromMs={ms:1,kmh:3.6,mph:2.23694,knot:1.94384,mach:1/343};
  var inp=document.getElementById('sp-val'),from=document.getElementById('sp-from');
  if(!inp)return;
  function calc(){
    var v=parseFloat(inp.value),u=from.value;
    if(isNaN(v)){ids.forEach(function(id){var el=document.getElementById('sp-'+id);if(el)el.textContent='—';});return;}
    var ms=v*toMs[u];
    ids.forEach(function(id){
      var el=document.getElementById('sp-'+id);
      if(el)el.textContent=parseFloat((ms*fromMs[id]).toFixed(4)).toString();
    });
  }
  [inp,from].forEach(function(el){el.addEventListener('input',calc);el.addEventListener('change',calc);});
  calc();
})();
