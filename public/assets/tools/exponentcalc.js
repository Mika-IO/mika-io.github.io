(function(){
  document.getElementById('exp-form').addEventListener('submit',function(e){
    e.preventDefault();
    const b=parseFloat(document.getElementById('exp-base').value);
    const p=parseFloat(document.getElementById('exp-pow').value);
    const out=document.getElementById('exp-out');
    if(isNaN(b)||isNaN(p)){out.textContent='—';return;}
    const result=Math.pow(b,p);
    if(!isFinite(result)){out.textContent='Overflow';return;}
    out.textContent=Math.abs(result)>1e12||Math.abs(result)<1e-6?result.toExponential(6):+result.toPrecision(10);
  });
})();