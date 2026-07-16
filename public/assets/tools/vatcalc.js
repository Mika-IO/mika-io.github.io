(function(){
  function upd(){
    const amt=parseFloat(document.getElementById('vat-amount').value);
    const rate=parseFloat(document.getElementById('vat-rate').value)||0;
    const dir=document.getElementById('vat-dir').value;
    const out=document.getElementById('vat-out');
    if(isNaN(amt)||amt<0){out.innerHTML='';return;}
    let net,vat,gross;
    if(dir==='excl'){net=amt;gross=amt*(1+rate/100);vat=gross-net;}
    else{gross=amt;net=amt/(1+rate/100);vat=gross-net;}
    const fmt=v=>v.toLocaleString((window.__LANG||"en"),{minimumFractionDigits:2,maximumFractionDigits:2});
    out.innerHTML=[['Net',fmt(net)],['VAT ('+rate+'%)',fmt(vat)],['Gross',fmt(gross)]].map(([k,v])=>`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">${k}</div><strong>${v}</strong></div>`).join('');
  }
  ['vat-amount','vat-rate','vat-dir'].forEach(id=>document.getElementById(id).addEventListener('input',upd));
})();