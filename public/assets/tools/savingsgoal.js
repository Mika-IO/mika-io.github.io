(function(){
  document.getElementById('sg-form').addEventListener('submit',function(e){
    e.preventDefault();
    const goal=parseFloat(document.getElementById('sg-goal').value)||0;
    const saved=parseFloat(document.getElementById('sg-saved').value)||0;
    const pmt=parseFloat(document.getElementById('sg-monthly').value)||0;
    const annualRate=parseFloat(document.getElementById('sg-rate').value)||0;
    const out=document.getElementById('sg-out');
    const remaining=goal-saved;
    if(remaining<=0){out.innerHTML='<p>Goal already reached!</p>';out.hidden=false;return;}
    if(pmt<=0){out.innerHTML='<p>Monthly savings must be > 0</p>';out.hidden=false;return;}
    const r=annualRate/100/12;
    let months;
    if(r===0){months=remaining/pmt;}
    else{months=Math.log(1+remaining*r/pmt)/Math.log(1+r);}
    months=Math.ceil(months);
    const years=Math.floor(months/12);
    const remMonths=months%12;
    const totalContrib=pmt*months;
    const now=new Date();
    now.setMonth(now.getMonth()+months);
    const items=[['Months needed',months],['Time',years>0?years+'y '+remMonths+'m':remMonths+'m'],['Target date',now.toLocaleDateString((window.__LANG||"en"),{month:'long',year:'numeric'})],['Total contributed','$'+totalContrib.toLocaleString(window.__LANG||undefined)],['Interest earned','$'+(goal-saved-totalContrib+remaining>0?Math.max(0,goal-saved-totalContrib).toLocaleString(window.__LANG||undefined):0)]];
    out.hidden=false;
    out.innerHTML=items.map(([k,v])=>`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">${k}</div><strong>${v}</strong></div>`).join('');
  });
})();