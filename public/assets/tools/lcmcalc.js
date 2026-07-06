(function(){
  'use strict';
  function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=b;b=a%b;a=t;}return a;}
  function lcm(a,b){return a/gcd(a,b)*b;}
  var inp=document.getElementById('lcm-nums'),out=document.getElementById('lcm-out'),gcdOut=document.getElementById('lcm-gcd-out');
  if(!inp)return;
  function calc(){
    var nums=inp.value.split(',').map(function(s){return parseInt(s.trim(),10);}).filter(function(n){return!isNaN(n)&&n>0;});
    if(nums.length<2){out.textContent='—';if(gcdOut)gcdOut.textContent='';return;}
    var l=nums.reduce(lcm);
    var g=nums.reduce(gcd);
    out.textContent=l.toLocaleString();
    if(gcdOut)gcdOut.textContent='GCD: '+g.toLocaleString();
  }
  inp.addEventListener('input',calc);calc();
})();
