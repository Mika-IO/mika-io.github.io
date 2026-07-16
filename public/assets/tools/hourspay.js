(function(){
  document.getElementById('hp-form').addEventListener('submit',function(e){
    e.preventDefault();
    const hours=parseFloat(document.getElementById('hp-hours').value)||0;
    const rate=parseFloat(document.getElementById('hp-rate').value)||0;
    const ot=parseFloat(document.getElementById('hp-ot').value)||0;
    const regularPay=hours*rate;
    const otPay=ot*rate*1.5;
    const weekly=regularPay+otPay;
    const monthly=weekly*52/12;
    const annual=weekly*52;
    const fmt=v=>'$'+v.toLocaleString((window.__LANG||"en"),{minimumFractionDigits:2,maximumFractionDigits:2});
    const items=[['Weekly (gross)',fmt(weekly)],['Monthly (÷12)',fmt(monthly)],['Annual',fmt(annual)],['Regular pay',fmt(regularPay)],['Overtime pay',fmt(otPay)],['Total hours',hours+ot]];
    const out=document.getElementById('hp-out');
    out.hidden=false;
    out.innerHTML=items.map(([k,v])=>`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">${k}</div><strong>${v}</strong></div>`).join('');
  });
})();