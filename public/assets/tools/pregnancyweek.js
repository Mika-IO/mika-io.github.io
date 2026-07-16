(function(){
  document.getElementById('pw-form').addEventListener('submit',function(e){
    e.preventDefault();
    const dateVal=document.getElementById('pw-lmp').value;
    const method=document.getElementById('pw-method').value;
    if(!dateVal)return;
    let lmp=new Date(dateVal);
    if(method==='conception')lmp=new Date(lmp.getTime()-14*86400000);
    const now=new Date();
    const diffDays=Math.floor((now-lmp)/86400000);
    const weeks=Math.floor(diffDays/7);const days=diffDays%7;
    const edd=new Date(lmp.getTime()+280*86400000);
    const trimester=weeks<=12?'1st':weeks<=26?'2nd':'3rd';
    const daysLeft=Math.max(0,Math.round((edd-now)/86400000));
    const out=document.getElementById('pw-out');out.hidden=false;
    const items=[['Current week',weeks+' weeks '+days+' days'],['Trimester',trimester],['Due date (EDD)',edd.toDateString()],['Days remaining',daysLeft+' days'],['LMP',lmp.toDateString()]];
    out.innerHTML=items.map(([k,v])=>`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">${k}</div><strong>${v}</strong></div>`).join('');
  });
})();