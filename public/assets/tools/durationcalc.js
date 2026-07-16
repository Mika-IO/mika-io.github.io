(function(){
  function update(){
    const s=document.getElementById('dc-start').value;
    const e=document.getElementById('dc-end').value;
    const out=document.getElementById('dc-out');
    if(!s||!e){out.innerHTML='';return;}
    const ms=Math.abs(new Date(e)-new Date(s));
    const secs=Math.floor(ms/1000);
    const mins=Math.floor(secs/60);
    const hours=Math.floor(mins/60);
    const days=Math.floor(hours/24);
    const weeks=Math.floor(days/7);
    const months=Math.floor(days/30.44);
    const years=Math.floor(days/365.25);
    const h=hours%24,m=mins%60,sec=secs%60;
    const items=[[T('years','Years'),years],[T('months','Months'),months],[T('weeks','Weeks'),weeks],[T('days','Days'),days],[T('hours','Hours'),hours.toLocaleString(window.__LANG||undefined)],[T('minutes','Minutes'),mins.toLocaleString(window.__LANG||undefined)],[T('seconds','Seconds'),secs.toLocaleString(window.__LANG||undefined)],['H:M:S',h+':'+String(m).padStart(2,'0')+':'+String(sec).padStart(2,'0')]];
    out.innerHTML=items.map(([k,v])=>`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">${k}</div><strong>${v}</strong></div>`).join('');
  }
  const now=new Date();
  const yesterday=new Date(now.getTime()-86400000);
  const pad=(n)=>String(n).padStart(2,'0');
  const fmtDT=(d)=>`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  document.getElementById('dc-start').value=fmtDT(yesterday);
  document.getElementById('dc-end').value=fmtDT(now);
  document.getElementById('dc-start').addEventListener('input',update);
  document.getElementById('dc-end').addEventListener('input',update);
  update();
})();