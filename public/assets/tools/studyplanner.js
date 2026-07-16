(function(){
  document.getElementById('sp-go').onclick=function(){
    const examDate=new Date(document.getElementById('sp-exam').value);
    const totalHours=parseFloat(document.getElementById('sp-hours').value)||40;
    const dailyHours=parseFloat(document.getElementById('sp-daily').value)||2;
    const topics=document.getElementById('sp-topics').value.trim().split('\n').map(s=>s.trim()).filter(Boolean);
    const out=document.getElementById('sp-out');
    if(!document.getElementById('sp-exam').value){out.innerHTML='<p>Please enter an exam date</p>';return;}
    const today=new Date();today.setHours(0,0,0,0);
    const daysLeft=Math.max(1,Math.round((examDate-today)/86400000));
    const totalAvailable=daysLeft*dailyHours;
    const hoursPerTopic=topics.length?totalHours/topics.length:totalHours;
    const html=['<div style="display:grid;gap:0.5rem">',
      '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:0.5rem">',
      [T('daysremaining','Days remaining'),daysLeft],[T('totalhours','Total hours'),totalHours],[T('available','Available'),totalAvailable.toFixed(0)+T('hrs',' hrs')],[T('dailytarget','Daily target'),dailyHours+T('hrsperday',' hrs/day')]
      .map(([k,v])=>`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">${k}</div><strong>${v}</strong></div>`).join(''),
      '</div>',
    ];
    if(topics.length){
      html.push('<div style="margin-top:0.5rem"><strong>Topic schedule ('+hoursPerTopic.toFixed(1)+' hrs each)</strong></div>');
      html.push('<div style="display:grid;gap:0.3rem">');
      topics.forEach(t=>{const daysForTopic=Math.ceil(hoursPerTopic/dailyHours);html.push(`<div style="display:flex;justify-content:space-between;padding:0.4rem 0.6rem;background:var(--surface);border-left:3px solid var(--accent,#6366f1);border-radius:0 6px 6px 0;font-size:0.9rem"><span>${t}</span><span style="opacity:0.6">${hoursPerTopic.toFixed(1)} hrs · ~${daysForTopic}d</span></div>`);});
      html.push('</div>');
    }
    html.push('</div>');
    out.innerHTML=html.join('');
  };
})();