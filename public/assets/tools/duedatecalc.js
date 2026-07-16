(function(){
  const sel=document.getElementById('dd-method');
  const lbl=document.getElementById('dd-date-label');
  sel.addEventListener('change',function(){lbl.textContent=this.value==='lmp'?'First day of last period':'Conception date';});
  document.getElementById('dd-form').addEventListener('submit',function(e){
    e.preventDefault();
    const date=new Date(document.getElementById('dd-date').value);
    if(isNaN(date.getTime()))return;
    const method=sel.value;
    const addDays=(d,n)=>{const r=new Date(d);r.setDate(r.getDate()+n);return r;};
    const dueDate=method==='lmp'?addDays(date,280):addDays(date,266);
    const today=new Date();
    const conception=method==='lmp'?addDays(date,14):date;
    const weeksPregnant=Math.floor((today-conception)/(7*24*3600*1000));
    const weeksLeft=Math.floor((dueDate-today)/(7*24*3600*1000));
    const fmt=d=>d.toLocaleDateString((window.__LANG||"en"),{month:'long',day:'numeric',year:'numeric'});
    const trimester=weeksPregnant<=13?'1st':weeksPregnant<=26?'2nd':'3rd';
    const out=document.getElementById('dd-out');
    out.hidden=false;
    out.innerHTML=[['Estimated due date',fmt(dueDate)],['Weeks pregnant',weeksPregnant>=0?weeksPregnant+' weeks':'Not yet'],['Weeks remaining',weeksLeft>0?weeksLeft+' weeks':'Born / overdue'],['Trimester',weeksPregnant>=0&&weeksPregnant<=42?trimester:'—'],['Conception date',fmt(conception)]].map(([k,v])=>`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem;margin-bottom:0.4rem"><span style="opacity:0.6;font-size:0.85rem">${k}</span><br><strong>${v}</strong></div>`).join('')+'<p style="margin-top:0.75rem;opacity:0.6;font-size:0.8rem">For medical decisions, consult your OB/GYN or midwife.</p>';
  });
})();