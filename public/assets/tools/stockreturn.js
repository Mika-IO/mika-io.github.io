(function(){
  document.getElementById('sr-form').addEventListener('submit',function(e){
    e.preventDefault();
    const buy=parseFloat(document.getElementById('sr-buy').value);
    const sell=parseFloat(document.getElementById('sr-sell').value);
    const shares=parseFloat(document.getElementById('sr-shares').value);
    const div=parseFloat(document.getElementById('sr-div').value)||0;
    const years=parseFloat(document.getElementById('sr-years').value)||1;
    const cost=buy*shares;const proceeds=sell*shares+div;const profit=proceeds-cost;
    const pct=(profit/cost)*100;
    const cagr=years>0?(Math.pow(proceeds/cost,1/years)-1)*100:0;
    const out=document.getElementById('sr-out');out.hidden=false;
    const fmt=n=>'$'+Math.abs(n).toLocaleString((window.__LANG||"en"),{minimumFractionDigits:2,maximumFractionDigits:2});
    const fmtPct=n=>(n>=0?'+':'')+n.toFixed(2)+'%';
    const items=[['Total invested',fmt(cost)],['Total return',fmt(proceeds)],['Profit/Loss',fmt(profit)],['Return %',fmtPct(pct)],['CAGR',fmtPct(cagr)],['Dividends',fmt(div)]];
    out.innerHTML=items.map(([k,v])=>`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">${k}</div><strong style="color:${v.includes('-')||v.includes('−')?'var(--red,#ef4444)':'inherit'}">${v}</strong></div>`).join('');
  });
})();