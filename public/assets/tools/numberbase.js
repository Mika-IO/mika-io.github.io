(function(){
  const sel=document.getElementById('nb-from');
  const custom=document.getElementById('nb-custom-from');
  sel.addEventListener('change',function(){custom.hidden=this.value!=='custom';convert();});
  document.getElementById('nb-val').addEventListener('input',convert);
  custom.addEventListener('input',convert);
  function convert(){
    const raw=document.getElementById('nb-val').value.trim().toUpperCase();
    const fromBase=sel.value==='custom'?parseInt(custom.value)||10:parseInt(sel.value);
    const div=document.getElementById('nb-results');
    if(!raw){div.innerHTML='';return;}
    const dec=parseInt(raw,fromBase);
    if(isNaN(dec)){div.innerHTML='<p style="color:red">Invalid input for this base</p>';return;}
    const bases=[[2,'Binary'],[8,'Octal'],[10,'Decimal'],[16,'Hex'],[32,'Base 32'],[36,'Base 36']];
    div.innerHTML=bases.map(([b,label])=>`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem;display:flex;justify-content:space-between"><span style="opacity:0.6">${label} (${b})</span><strong style="font-family:monospace">${dec.toString(b).toUpperCase()}</strong></div>`).join('');
  }
})();