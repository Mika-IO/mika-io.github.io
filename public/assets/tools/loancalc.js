(function(){
  'use strict';
  var lang=document.documentElement.lang||'en';
  var money=function(n){return n.toLocaleString(lang,{minimumFractionDigits:2,maximumFractionDigits:2});};
  function calc(){
    var P=parseFloat(document.getElementById('loan-amt').value);
    var r=parseFloat(document.getElementById('loan-rate').value)/(100*12);
    var n=parseFloat(document.getElementById('loan-years').value)*12;
    var out=document.getElementById('loan-monthly');
    var det=document.getElementById('loan-detail');
    if([P,r,n].some(isNaN)||P<=0||n<=0){if(out)out.textContent='—';return;}
    var m=r===0?P/n:P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);
    var total=m*n;
    var interest=total-P;
    if(out)out.textContent=money(m);
    if(det)det.textContent='Total paid: '+money(total)+' · Total interest: '+money(interest);
  }
  document.querySelectorAll('#loan-amt,#loan-rate,#loan-years').forEach(function(el){el.addEventListener('input',calc);});
  calc();
})();
