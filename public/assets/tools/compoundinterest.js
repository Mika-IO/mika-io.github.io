(function(){
  'use strict';
  var lang=document.documentElement.lang||'en';
  var money=function(n){return isFinite(n)?n.toLocaleString(lang,{minimumFractionDigits:2,maximumFractionDigits:2}):'—';};
  function calc(){
    var p=parseFloat(document.getElementById('ci-principal').value);
    var r=parseFloat(document.getElementById('ci-rate').value)/100;
    var t=parseFloat(document.getElementById('ci-years').value);
    var n=parseFloat(document.getElementById('ci-freq').value);
    var out=document.getElementById('ci-out');
    var intEl=document.getElementById('ci-interest');
    if([p,r,t,n].some(isNaN)||p<0||t<0){if(out)out.textContent='—';return;}
    var a=p*Math.pow(1+r/n,n*t);
    var interest=a-p;
    if(out)out.textContent=money(a);
    if(intEl)intEl.textContent='Interest earned: '+money(interest);
  }
  document.querySelectorAll('#ci-principal,#ci-rate,#ci-years,#ci-freq').forEach(function(el){el.addEventListener('input',calc);});
  calc();
})();
