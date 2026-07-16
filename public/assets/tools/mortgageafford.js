(function(){
  document.getElementById('ma-form').addEventListener('submit',function(e){
    e.preventDefault();
    const income=parseFloat(document.getElementById('ma-income').value)||0;
    const debt=parseFloat(document.getElementById('ma-debt').value)||0;
    const down=parseFloat(document.getElementById('ma-down').value)||0;
    const rate=parseFloat(document.getElementById('ma-rate').value)||0;
    const years=parseInt(document.getElementById('ma-years').value)||30;
    const monthlyIncome=income/12;
    const maxHousing28=monthlyIncome*0.28;
    const maxHousing36=Math.max(0,monthlyIncome*0.36-debt);
    const maxPmt=Math.min(maxHousing28,maxHousing36);
    const r=rate/100/12;
    const n=years*12;
    const maxLoan=r===0?maxPmt*n:maxPmt*(1-Math.pow(1+r,-n))/r;
    const maxPrice=maxLoan+down;
    const fmt=v=>'$'+Math.round(v).toLocaleString(window.__LANG||undefined);
    const items=[['Max home price',fmt(maxPrice)],['Max loan',fmt(maxLoan)],['Max monthly payment',fmt(maxPmt)],['28% limit',fmt(maxHousing28)],['36% limit',fmt(maxHousing36)],['Down payment',fmt(down)]];
    const out=document.getElementById('ma-out');
    out.hidden=false;
    out.innerHTML=items.map(([k,v])=>`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">${k}</div><strong>${v}</strong></div>`).join('');
  });
})();