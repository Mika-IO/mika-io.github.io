(function(){
  document.getElementById('kin-form').addEventListener('submit',function(e){
    e.preventDefault();
    let v0=parseFloat(document.getElementById('kin-v0').value);
    let v=parseFloat(document.getElementById('kin-v').value);
    let a=parseFloat(document.getElementById('kin-a').value);
    let t=parseFloat(document.getElementById('kin-t').value);
    let d=parseFloat(document.getElementById('kin-d').value);
    // Solve known combinations
    for(let iter=0;iter<5;iter++){
      if(!isNaN(v0)&&!isNaN(a)&&!isNaN(t)){if(isNaN(v))v=v0+a*t;if(isNaN(d))d=v0*t+0.5*a*t*t;}
      if(!isNaN(v0)&&!isNaN(v)&&!isNaN(a)){if(isNaN(t))t=(v-v0)/a;if(isNaN(d))d=(v*v-v0*v0)/(2*a);}
      if(!isNaN(v0)&&!isNaN(v)&&!isNaN(t)){if(isNaN(a))a=(v-v0)/t;if(isNaN(d))d=(v0+v)/2*t;}
      if(!isNaN(v0)&&!isNaN(d)&&!isNaN(t)){if(isNaN(a))a=2*(d-v0*t)/(t*t);if(isNaN(v))v=v0+a*t;}
      if(!isNaN(v)&&!isNaN(a)&&!isNaN(t)){if(isNaN(v0))v0=v-a*t;if(isNaN(d))d=v*t-0.5*a*t*t;}
    }
    const known=[!isNaN(v0),!isNaN(v),!isNaN(a),!isNaN(t),!isNaN(d)].filter(Boolean).length;
    if(known<3){alert('Need at least 3 known values');return;}
    const fmt=x=>isNaN(x)?'—':x.toPrecision(6).replace(/\.?0+$/,'');
    const items=[['v₀ (m/s)',fmt(v0)],['v (m/s)',fmt(v)],['a (m/s²)',fmt(a)],['t (s)',fmt(t)],['d (m)',fmt(d)]];
    const out=document.getElementById('kin-out');
    out.hidden=false;
    out.innerHTML=items.map(([k,v2])=>`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">${k}</div><strong>${v2}</strong></div>`).join('');
  });
})();