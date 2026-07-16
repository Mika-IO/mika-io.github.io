(function(){
  const splits={
    balanced:{p:0.30,c:0.40,f:0.30},
    lowcarb:{p:0.30,c:0.25,f:0.45},
    highprotein:{p:0.40,c:0.35,f:0.25},
    keto:{p:0.25,c:0.05,f:0.70}
  };
  document.getElementById('mc-form').addEventListener('submit',function(e){
    e.preventDefault();
    const cal=parseInt(document.getElementById('mc-cal').value)||2000;
    const goal=document.getElementById('mc-goal').value;
    const s=splits[goal];
    const pCal=cal*s.p,cCal=cal*s.c,fCal=cal*s.f;
    const pG=pCal/4,cG=cCal/4,fG=fCal/9;
    const out=document.getElementById('mc-out');
    out.hidden=false;
    const bar=(pct)=>`<div style="height:8px;border-radius:4px;background:var(--line);margin:4px 0"><div style="height:100%;border-radius:4px;background:var(--accent,#6366f1);width:${(pct*100).toFixed(0)}%"></div></div>`;
    out.innerHTML=[['🥩 Protein',pCal,pG,s.p],['🍞 Carbohydrates',cCal,cG,s.c],['🥑 Fat',fCal,fG,s.f]].map(([name,kcal,g,pct])=>`<div style="margin-bottom:0.75rem"><div style="display:flex;justify-content:space-between"><strong>${name}</strong><span>${Math.round(g)}g · ${Math.round(kcal)} kcal · ${(pct*100).toFixed(0)}%</span></div>${bar(pct)}</div>`).join('');
  });
})();