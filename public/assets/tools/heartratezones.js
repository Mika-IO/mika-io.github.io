(function(){
  const zones=[['Zone 1 — Recovery',0.50,0.60,'#22c55e'],['Zone 2 — Fat Burn',0.60,0.70,'#84cc16'],['Zone 3 — Aerobic',0.70,0.80,'#eab308'],['Zone 4 — Anaerobic',0.80,0.90,'#f97316'],['Zone 5 — VO2 Max',0.90,1.00,'#ef4444']];
  document.getElementById('hrz-form').addEventListener('submit',function(e){
    e.preventDefault();
    const age=parseInt(document.getElementById('hrz-age').value);
    const rhr=parseInt(document.getElementById('hrz-rhr').value);
    const method=document.getElementById('hrz-method').value;
    const maxHR=220-age;
    const hrr=maxHR-rhr;
    const out=document.getElementById('hrz-out');out.hidden=false;
    out.innerHTML='<p style="opacity:0.6;font-size:0.875rem;margin-bottom:0.5rem">Max HR: '+maxHR+' bpm · HRR: '+hrr+' bpm</p><div style="display:grid;gap:0.5rem">'+zones.map(([name,lo,hi,color])=>{
      const low=method==='karvonen'?Math.round(rhr+hrr*lo):Math.round(maxHR*lo);
      const high=method==='karvonen'?Math.round(rhr+hrr*hi):Math.round(maxHR*hi);
      return `<div style="display:flex;align-items:center;gap:0.75rem;padding:0.5rem 0.75rem;background:var(--surface);border-left:4px solid ${color};border-radius:0 8px 8px 0"><div style="flex:1;font-weight:600;font-size:0.9rem">${name}</div><div style="font-family:monospace;font-size:0.9rem">${low}–${high} bpm</div></div>`;
    }).join('')+'</div>';
  });
})();