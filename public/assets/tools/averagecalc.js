(function(){
  document.getElementById('avg-form').addEventListener('submit',function(e){
    e.preventDefault();
    const nums=document.getElementById('avg-in').value.split(',').map(s=>parseFloat(s.trim())).filter(n=>!isNaN(n));
    if(!nums.length)return;
    const n=nums.length;
    const sum=nums.reduce((s,v)=>s+v,0);
    const arith=sum/n;
    const geomPossible=nums.every(v=>v>0);
    const geom=geomPossible?Math.pow(nums.reduce((p,v)=>p*v,1),1/n):null;
    const harmPossible=nums.every(v=>v!==0);
    const harm=harmPossible?n/nums.reduce((s,v)=>s+1/v,0):null;
    const items=[
      ['Count',n],['Sum',sum.toPrecision(8)],['Arithmetic mean',arith.toPrecision(8)],
      ['Geometric mean',geom!==null?geom.toPrecision(8):'N/A (needs positives)'],
      ['Harmonic mean',harm!==null?harm.toPrecision(8):'N/A (needs non-zero)'],
    ];
    const out=document.getElementById('avg-out');
    out.hidden=false;
    out.innerHTML=items.map(([k,v])=>`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">${k}</div><strong>${v}</strong></div>`).join('');
  });
})();