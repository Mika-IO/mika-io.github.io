(function(){
  document.getElementById('ic-form').addEventListener('submit',function(e){
    e.preventDefault();
    const amount=parseFloat(document.getElementById('ic-amount').value);
    const from=parseInt(document.getElementById('ic-from').value);
    const to=parseInt(document.getElementById('ic-to').value);
    const rate=parseFloat(document.getElementById('ic-rate').value)/100;
    const years=to-from;const sign=years>=0?1:-1;
    const adjusted=amount*Math.pow(1+rate,years);
    const change=adjusted-amount;
    const out=document.getElementById('ic-out');out.hidden=false;
    const fmt=n=>'$'+Math.abs(n).toLocaleString((window.__LANG||"en"),{minimumFractionDigits:2,maximumFractionDigits:2});
    const items=[['Original amount',fmt(amount)+' ('+from+')'],[to+' equivalent',fmt(adjusted)],['Change',fmt(change)+' ('+Math.abs(((adjusted-amount)/amount)*100).toFixed(1)+'%)'],['Years',Math.abs(years)+' years'],['Annual rate',rate*100+'%']];
    out.innerHTML=items.map(([k,v])=>`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">${k}</div><strong>${v}</strong></div>`).join('');
  });
})();