/* Electricity cost calculator */
(function () {
  'use strict';
  var w=document.getElementById('elec-watts');
  var h=document.getElementById('elec-hours');
  var r=document.getElementById('elec-rate');
  var day=document.getElementById('elec-day');
  var month=document.getElementById('elec-month');
  var year=document.getElementById('elec-year');
  if(!year) return;
  var fmt=function(n){return isFinite(n)?n.toLocaleString([],{minimumFractionDigits:2,maximumFractionDigits:2}):'—';};
  function calc(){
    var wv=parseFloat(w.value),hv=parseFloat(h.value),rv=parseFloat(r.value);
    if([wv,hv,rv].some(isNaN)){day.textContent=month.textContent=year.textContent='—';return;}
    var kwh=wv/1000*hv;
    var d=kwh*rv,m=d*30.44,y=d*365;
    if(day)day.textContent=fmt(d);
    if(month)month.textContent=fmt(m);
    year.textContent=fmt(y);
  }
  [w,h,r].forEach(function(el){if(el)el.addEventListener('input',calc);});
  calc();
})();
