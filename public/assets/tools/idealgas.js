(function(){
  const R=8.314/1000; // kPa·L/(mol·K)
  document.getElementById('ig-form').addEventListener('submit',function(e){
    e.preventDefault();
    let p=parseFloat(document.getElementById('ig-p').value);
    let v=parseFloat(document.getElementById('ig-v').value);
    let n=parseFloat(document.getElementById('ig-n').value);
    let t=parseFloat(document.getElementById('ig-t').value);
    const known=[!isNaN(p),!isNaN(v),!isNaN(n),!isNaN(t)].filter(Boolean).length;
    if(known<3){alert('Enter at least 3 values');return;}
    if(isNaN(p))p=n*R*t/v;
    else if(isNaN(v))v=n*R*t/p;
    else if(isNaN(n))n=p*v/(R*t);
    else if(isNaN(t))t=p*v/(n*R);
    const fmt=x=>x.toPrecision(6).replace(/\.?0+$/,'');
    const items=[['Pressure (P)',fmt(p)+' kPa'],['Volume (V)',fmt(v)+' L'],['Amount (n)',fmt(n)+' mol'],['Temperature (T)',fmt(t)+' K ('+fmt(t-273.15)+'°C)']];
    const out=document.getElementById('ig-out');
    out.hidden=false;
    out.innerHTML=items.map(([k,v2])=>`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">${k}</div><strong>${v2}</strong></div>`).join('');
  });
})();