(function(){
  const activity={sedentary:0,light:350,moderate:500,intense:700};
  document.getElementById('hyd-form').addEventListener('submit',function(e){
    e.preventDefault();
    let w=parseFloat(document.getElementById('hyd-weight').value)||70;
    const unit=document.getElementById('hyd-wunit').value;
    const act=document.getElementById('hyd-activity').value;
    if(unit==='lbs')w*=0.453592;
    const ml=Math.round(w*35+activity[act]);
    const litres=(ml/1000).toFixed(2);
    const cups=(ml/237).toFixed(1);
    const oz=(ml*0.033814).toFixed(1);
    const items=[['Litres',litres+' L'],['Cups',cups+' cups'],['Fluid oz',oz+' fl oz'],['Millilitres',ml+' ml']];
    const out=document.getElementById('hyd-out');
    out.hidden=false;
    out.innerHTML=items.map(([k,v])=>`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">${k}</div><strong>${v}</strong></div>`).join('');
  });
})();