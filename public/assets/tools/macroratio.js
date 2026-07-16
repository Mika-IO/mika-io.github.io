(function(){
  const ratios={balanced:[0.30,0.40,0.30],lowcarb:[0.35,0.25,0.40],keto:[0.25,0.05,0.70],highcarb:[0.25,0.55,0.20],highprotein:[0.40,0.35,0.25]};
  document.getElementById('mr-form').addEventListener('submit',function(e){
    e.preventDefault();
    const cal=parseFloat(document.getElementById('mr-cal').value);
    const goal=document.getElementById('mr-goal').value;
    const [p,c,f]=ratios[goal];
    const pCal=cal*p,cCal=cal*c,fCal=cal*f;
    const pG=pCal/4,cG=cCal/4,fG=fCal/9;
    const out=document.getElementById('mr-out');out.hidden=false;
    const fmt=n=>Math.round(n);
    out.innerHTML=[['Protein',fmt(pG)+'g',Math.round(p*100)+'%','#6366f1'],['Carbs',fmt(cG)+'g',Math.round(c*100)+'%','#f59e0b'],['Fat',fmt(fG)+'g',Math.round(f*100)+'%','#ec4899']].map(([n,g,pct,c2])=>`<div style="background:var(--surface);border:2px solid ${c2};border-radius:12px;padding:0.75rem"><div style="font-size:0.75rem;opacity:0.6">${n}</div><div style="font-size:1.8rem;font-weight:800;color:${c2}">${g}</div><div style="font-size:0.85rem;opacity:0.7">${pct} of calories</div></div>`).join('');
  });
})();