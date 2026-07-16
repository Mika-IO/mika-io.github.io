(function(){
  document.getElementById('trig-form').addEventListener('submit',function(e){
    e.preventDefault();
    let angle=parseFloat(document.getElementById('trig-val').value);
    const unit=document.getElementById('trig-unit').value;
    const rad=unit==='deg'?angle*Math.PI/180:angle;
    const fmt=v=>Math.abs(v)>1e10?'∞':+v.toPrecision(8);
    const items=[
      ['sin',Math.sin(rad)],['cos',Math.cos(rad)],['tan',Math.tan(rad)],
      ['cot',1/Math.tan(rad)],['sec',1/Math.cos(rad)],['csc',1/Math.sin(rad)]
    ];
    const out=document.getElementById('trig-out');
    out.hidden=false;
    out.innerHTML=items.map(([k,v])=>`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">${k}</div><strong>${fmt(v)}</strong></div>`).join('');
  });
})();