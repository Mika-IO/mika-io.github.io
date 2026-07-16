(function(){
  function gcd(a,b){return b===0?a:gcd(b,a%b);}
  document.getElementById('dtf-form').addEventListener('submit',function(e){
    e.preventDefault();
    const v=document.getElementById('dtf-val').value.trim();
    const d=parseFloat(v);
    const out=document.getElementById('dtf-out');
    if(isNaN(d)){out.textContent='—';return;}
    if(Number.isInteger(d)){out.textContent=d+'/1';return;}
    const decimals=(v.split('.')[1]||'').length;
    const mult=Math.pow(10,decimals);
    let num=Math.round(Math.abs(d)*mult);
    let den=mult;
    const g=gcd(num,den);
    num/=g;den/=g;
    if(d<0)num=-num;
    out.innerHTML=`${num}&#8260;${den} <span style="font-size:1rem;opacity:0.6">= ${d}</span>`;
  });
})();