(function(){
  document.getElementById('ef-form').addEventListener('submit',function(e){
    e.preventDefault();
    const exp=parseFloat(document.getElementById('ef-exp').value);
    const months=parseInt(document.getElementById('ef-months').value);
    const saved=parseFloat(document.getElementById('ef-saved').value)||0;
    const monthly=parseFloat(document.getElementById('ef-monthly').value)||1;
    const target=exp*months;const remaining=Math.max(0,target-saved);
    const monthsToGoal=remaining>0?Math.ceil(remaining/monthly):0;
    const pct=Math.min(100,Math.round((saved/target)*100));
    const fmt=n=>'$'+n.toLocaleString((window.__LANG||"en"),{minimumFractionDigits:0,maximumFractionDigits:0});
    const out=document.getElementById('ef-out');out.hidden=false;
    const items=[['Target fund',fmt(target)],['Already saved',fmt(saved)],['Still needed',fmt(remaining)],['Progress',pct+'%'],['Months to goal',monthsToGoal>0?monthsToGoal+' months':'✅ Goal reached!']];
    out.innerHTML=items.map(([k,v])=>`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">${k}</div><strong>${v}</strong></div>`).join('')+'<div style="grid-column:1/-1"><div style="height:8px;background:var(--line);border-radius:4px"><div style="height:100%;width:'+pct+'%;background:var(--accent,#6366f1);border-radius:4px;transition:width 0.5s"></div></div></div>';
  });
})();