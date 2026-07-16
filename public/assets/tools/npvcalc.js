(function(){
  document.getElementById('npv-go').onclick=function(){
    const rate=parseFloat(document.getElementById('npv-rate').value)/100;
    const init=parseFloat(document.getElementById('npv-init').value);
    const cfs=document.getElementById('npv-cf').value.trim().split('\n').map(s=>parseFloat(s.trim())).filter(n=>!isNaN(n));
    if(!cfs.length)return;
    let npv=-init;cfs.forEach((cf,i)=>npv+=cf/Math.pow(1+rate,i+1));
    const total=cfs.reduce((a,b)=>a+b,0);
    const payback=function(){let cum=0;for(let i=0;i<cfs.length;i++){cum+=cfs[i];if(cum>=init)return i+1;}return 'N/A';}();
    const out=document.getElementById('npv-out');out.hidden=false;
    const fmt=n=>(n>=0?'$':'−$')+Math.abs(n).toLocaleString((window.__LANG||"en"),{minimumFractionDigits:2,maximumFractionDigits:2});
    const items=[['Initial investment',fmt(-init)],['Total cash flows',fmt(total)],['NPV',fmt(npv)],['Decision',npv>=0?'✅ Accept':'❌ Reject'],['Payback period',payback+(payback!=='N/A'?' years':'')]];
    out.innerHTML=items.map(([k,v])=>`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">${k}</div><strong>${v}</strong></div>`).join('');
  };
})();