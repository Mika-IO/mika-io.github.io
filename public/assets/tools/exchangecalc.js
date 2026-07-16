(function(){
  document.getElementById('ex-form').addEventListener('submit',function(e){
    e.preventDefault();
    const amt=parseFloat(document.getElementById('ex-amt').value);
    const rate=parseFloat(document.getElementById('ex-rate').value);
    const fee=parseFloat(document.getElementById('ex-fee').value)||0;
    const gross=amt*rate;
    const feeAmt=gross*(fee/100);
    const net=gross-feeAmt;
    const out=document.getElementById('ex-out');out.hidden=false;
    const fmt=n=>n.toLocaleString((window.__LANG||"en"),{minimumFractionDigits:2,maximumFractionDigits:2});
    const items=[['Original amount',fmt(amt)],['Exchange rate','× '+rate],['Gross amount',fmt(gross)],['Fee ('+fee+'%)','-'+fmt(feeAmt)],['Net received',fmt(net)],['Effective rate',((net/amt)).toFixed(5)]];
    out.innerHTML=items.map(([k,v])=>`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">${k}</div><strong>${v}</strong></div>`).join('');
  });
})();