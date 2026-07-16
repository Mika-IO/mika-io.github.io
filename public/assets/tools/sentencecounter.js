(function(){
  function upd(){
    const t=document.getElementById('sc2-in').value;
    const chars=t.length;
    const charsNoSp=[...t].filter(c=>c!==' '&&c!=='\n'&&c!=='\r').length;
    const words=t.trim()?t.trim().split(/\s+/).length:0;
    const sentences=t.trim()?t.split(/[.!?]+(?:\s|$)/).filter(s=>s.trim()).length:0;
    const paragraphs=t.trim()?t.split(/\n\s*\n/).filter(p=>p.trim()).length:0;
    const lines=t.trim()?t.split('\n').length:0;
    const avgWps=sentences?Math.round(words/sentences):0;
    const items=[[T('characters','Characters'),chars],[T('charsnospaces','Characters (no spaces)'),charsNoSp],[T('words','Words'),words],[T('sentences','Sentences'),sentences],[T('paragraphs','Paragraphs'),paragraphs],[T('lines','Lines'),lines],[T('avgwords','Avg words/sentence'),avgWps]];
    document.getElementById('sc2-out').innerHTML=items.map(([k,v])=>`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">${k}</div><strong>${v}</strong></div>`).join('');
  }
  document.getElementById('sc2-in').addEventListener('input',upd);
  upd();
})();