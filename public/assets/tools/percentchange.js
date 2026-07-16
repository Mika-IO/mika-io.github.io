(function(){
  function upd(){
    const o=parseFloat(document.getElementById('pc-old').value);
    const n=parseFloat(document.getElementById('pc-new').value);
    const out=document.getElementById('pc-out');
    const lbl=document.getElementById('pc-label');
    if(isNaN(o)||isNaN(n)||o===0){out.textContent='—';lbl.textContent='';return;}
    const pct=((n-o)/Math.abs(o))*100;
    const sign=pct>=0?'+':'';
    out.textContent=sign+pct.toFixed(2)+'%';
    out.style.color=pct>=0?'var(--green,#22c55e)':'var(--red,#ef4444)';
    lbl.textContent=(pct>=0?'Increase':'Decrease')+' of '+Math.abs(n-o).toPrecision(6);
  }
  document.getElementById('pc-old').addEventListener('input',upd);
  document.getElementById('pc-new').addEventListener('input',upd);
})();