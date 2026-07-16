(function(){
  function gcd(a,b){return b===0?a:gcd(b,a%b);}
  document.getElementById('rat-form').addEventListener('submit',function(e){
    e.preventDefault();
    let a=parseFloat(document.getElementById('rat-a').value);
    let b=parseFloat(document.getElementById('rat-b').value);
    if(isNaN(a)||isNaN(b)||a<=0||b<=0){document.getElementById('rat-out').textContent='Enter positive values';return;}
    const mult=Math.pow(10,Math.max((a.toString().split('.')[1]||'').length,(b.toString().split('.')[1]||'').length));
    a=Math.round(a*mult);b=Math.round(b*mult);
    const d=gcd(a,b);
    document.getElementById('rat-out').innerHTML=`${a/d} : ${b/d} &nbsp;<span style="font-size:1rem;opacity:0.6">(1 : ${(b/a).toFixed(4)})</span>`;
  });
})();