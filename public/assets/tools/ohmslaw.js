(function(){
  document.getElementById('ol-form').addEventListener('submit',function(e){
    e.preventDefault();
    const vEl=document.getElementById('ol-v'),iEl=document.getElementById('ol-i'),rEl=document.getElementById('ol-r');
    let v=parseFloat(vEl.value),i=parseFloat(iEl.value),r=parseFloat(rEl.value);
    const known=[!isNaN(v),!isNaN(i),!isNaN(r)].filter(Boolean).length;
    if(known<2){alert('Enter at least 2 values');return;}
    if(isNaN(v))v=i*r;
    else if(isNaN(i))i=v/r;
    else if(isNaN(r))r=v/i;
    const p=v*i;
    const fmt=n=>n.toPrecision(6).replace(/\.?0+$/,'');
    const items=[['Voltage (V)',fmt(v)+' V'],['Current (I)',fmt(i)+' A'],['Resistance (R)',fmt(r)+' Ω'],['Power (P)',fmt(p)+' W']];
    const out=document.getElementById('ol-out');
    out.hidden=false;
    out.innerHTML=items.map(([k,v2])=>`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">${k}</div><strong>${v2}</strong></div>`).join('');
  });
})();