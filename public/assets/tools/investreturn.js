(function(){
  document.getElementById('ir-form').addEventListener('submit',function(e){
    e.preventDefault();
    const P=parseFloat(document.getElementById('ir-init').value)||0;
    const pmt=parseFloat(document.getElementById('ir-monthly').value)||0;
    const annualRate=parseFloat(document.getElementById('ir-rate').value)||0;
    const years=parseInt(document.getElementById('ir-years').value)||1;
    const r=annualRate/100/12;
    const n=years*12;
    const fv=r===0?P+pmt*n:(P*Math.pow(1+r,n)+pmt*(Math.pow(1+r,n)-1)/r);
    const totalContrib=P+pmt*n;
    const gain=fv-totalContrib;
    const fmt=v=>'$'+v.toLocaleString((window.__LANG||"en"),{minimumFractionDigits:2,maximumFractionDigits:2});
    const items=[['Final value',fmt(fv)],['Total contributed',fmt(totalContrib)],['Total gain',fmt(gain)],['Return on investment',((gain/totalContrib)*100).toFixed(1)+'%']];
    const out=document.getElementById('ir-out');
    out.hidden=false;
    out.innerHTML=items.map(([k,v])=>`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">${k}</div><strong>${v}</strong></div>`).join('');
  });
})();