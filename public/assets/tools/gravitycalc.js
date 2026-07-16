(function(){
  const G=6.674e-11;
  document.getElementById('gc-form').addEventListener('submit',function(e){
    e.preventDefault();
    const m1=parseFloat(document.getElementById('gc-m1').value);
    const m2=parseFloat(document.getElementById('gc-m2').value);
    const r=parseFloat(document.getElementById('gc-r').value);
    const F=G*m1*m2/(r*r);const g=G*m1/(r*r);
    const out=document.getElementById('gc-out');out.hidden=false;
    out.innerHTML='<div style="font-size:2rem;font-weight:800;color:var(--accent,#6366f1)">'+F.toExponential(4)+' N</div><p style="opacity:0.7">Gravitational force</p><div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;margin-top:0.75rem"><div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">Surface gravity</div><strong>'+g.toFixed(4)+' m/s^2</strong></div><div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">Weight of m2</div><strong>'+(m2*g).toFixed(2)+' N</strong></div></div>';
  });
})();