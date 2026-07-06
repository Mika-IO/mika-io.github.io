/* Prime number checker */
(function () {
  'use strict';
  function factors(n) {
    var f=[]; for(var i=2;i*i<=n;i++){while(n%i===0){f.push(i);n=Math.floor(n/i);}} if(n>1)f.push(n); return f;
  }
  function divisors(n) {
    var d=[]; for(var i=1;i*i<=n;i++){if(n%i===0){d.push(i);if(i!==n/i)d.push(n/i);}} return d.sort(function(a,b){return a-b;});
  }
  var inp = document.getElementById('prime-n');
  var out = document.getElementById('prime-out');
  var facEl = document.getElementById('prime-factors');
  if (!out) return;
  function check() {
    var n = parseInt(inp.value, 10);
    if (isNaN(n)||n<1){out.textContent='—';if(facEl)facEl.textContent='';return;}
    if (n===1){out.textContent='1 is neither prime nor composite';if(facEl)facEl.textContent='';return;}
    var f = factors(n);
    var isPrime = f.length===1 && f[0]===n;
    out.textContent = isPrime ? n+' is PRIME ✓' : n+' is composite';
    if (facEl) {
      if (isPrime) { facEl.textContent = 'Divisors: 1, '+n; }
      else {
        var div = divisors(n);
        var pf = [];
        var tmp = [...f]; var map = {};
        tmp.forEach(function(p){map[p]=(map[p]||0)+1;});
        Object.keys(map).forEach(function(p){pf.push(map[p]>1?p+'<sup>'+map[p]+'</sup>':p);});
        facEl.innerHTML = 'Prime factorization: '+pf.join('×')+' &nbsp;·&nbsp; Divisors: '+div.join(', ');
      }
    }
  }
  if (inp) inp.addEventListener('input', check);
  check();
})();
