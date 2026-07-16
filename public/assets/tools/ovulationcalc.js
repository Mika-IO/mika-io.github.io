(function(){
  document.getElementById('ov-form').addEventListener('submit',function(e){
    e.preventDefault();
    const last=new Date(document.getElementById('ov-last').value);
    const cycle=parseInt(document.getElementById('ov-cycle').value)||28;
    if(isNaN(last.getTime()))return;
    const addDays=(d,n)=>{const r=new Date(d);r.setDate(r.getDate()+n);return r;};
    const fmt=d=>d.toLocaleDateString((window.__LANG||"en"),{month:'long',day:'numeric',year:'numeric'});
    const ovulation=addDays(last,cycle-14);
    const fertileStart=addDays(ovulation,-5);
    const fertileEnd=addDays(ovulation,1);
    const nextPeriod=addDays(last,cycle);
    const out=document.getElementById('ov-out');
    out.hidden=false;
    out.innerHTML=`<div style="display:grid;gap:0.5rem">${[['Ovulation (estimated)',fmt(ovulation)],['Fertile window starts',fmt(fertileStart)],['Fertile window ends',fmt(fertileEnd)],['Next period (estimated)',fmt(nextPeriod)]].map(([k,v])=>`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><span style="opacity:0.6;font-size:0.85rem">${k}</span><br><strong>${v}</strong></div>`).join('')}</div><p style="margin-top:0.75rem;opacity:0.6;font-size:0.8rem">These are estimates based on average cycles. For medical decisions, consult a healthcare provider.</p>`;
  });
})();