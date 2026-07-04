/* Fraction calculator */
(function () {
  'use strict';
  function gcd(a, b) { a=Math.abs(a); b=Math.abs(b); while(b){var t=b;b=a%b;a=t;} return a||1; }
  function calc() {
    var an=parseInt(document.getElementById('frac-a-num').value,10);
    var ad=parseInt(document.getElementById('frac-a-den').value,10);
    var bn=parseInt(document.getElementById('frac-b-num').value,10);
    var bd=parseInt(document.getElementById('frac-b-den').value,10);
    var op=document.getElementById('frac-op').value;
    var out=document.getElementById('frac-out');
    var dec=document.getElementById('frac-decimal');
    if ([an,ad,bn,bd].some(isNaN)){out.textContent='—';if(dec)dec.textContent='';return;}
    if (ad===0||bd===0){out.textContent='undefined';if(dec)dec.textContent='';return;}
    var rn,rd;
    if(op==='+'){rn=an*bd+bn*ad;rd=ad*bd;}
    else if(op==='-'){rn=an*bd-bn*ad;rd=ad*bd;}
    else if(op==='*'){rn=an*bn;rd=ad*bd;}
    else {if(bn===0){out.textContent='undefined';return;}rn=an*bd;rd=ad*bn;}
    var g=gcd(Math.abs(rn),Math.abs(rd));
    rn=rn/g; rd=rd/g;
    if(rd<0){rn=-rn;rd=-rd;}
    out.textContent = rd===1 ? rn : rn+'/'+rd;
    if(dec) dec.textContent = '= ' + (rn/rd).toLocaleString([],{maximumFractionDigits:8});
  }
  document.querySelectorAll('#frac-a-num,#frac-a-den,#frac-b-num,#frac-b-den,#frac-op').forEach(function(el){el.addEventListener('input',calc);});
  calc();
})();
