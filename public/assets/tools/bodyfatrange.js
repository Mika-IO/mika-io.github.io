(function(){
  const ranges={
    m:[['Essential fat','#ef4444',2,5],['Athlete','#f97316',6,13],['Fitness','#22c55e',14,17],['Average','#eab308',18,24],['Obese','#dc2626',25,60]],
    f:[['Essential fat','#ef4444',10,13],['Athlete','#f97316',14,20],['Fitness','#22c55e',21,24],['Average','#eab308',25,31],['Obese','#dc2626',32,60]]
  };
  document.getElementById('bfr-form').addEventListener('submit',function(e){
    e.preventDefault();
    const bf=parseFloat(document.getElementById('bfr-bf').value);
    const sex=document.getElementById('bfr-sex').value;
    const cats=ranges[sex];
    const cat=cats.find(function([,c,lo,hi]){return bf>=lo&&bf<=hi;})||cats[cats.length-1];
    const out=document.getElementById('bfr-out');out.hidden=false;
    out.innerHTML='<div style="font-size:2rem;font-weight:800;color:'+cat[1]+'">'+bf+'%</div><div style="font-size:1.1rem;font-weight:600;margin-bottom:0.75rem">'+cat[0]+'</div><div style="display:grid;gap:0.3rem">'+cats.map(function([n,c,lo,hi]){return '<div style="display:flex;align-items:center;gap:0.5rem;padding:0.3rem 0.6rem;background:'+(n===cat[0]?c+'33':'var(--surface)')+';border-radius:6px;border:1px solid '+(n===cat[0]?c:'var(--line)')+'"><div style="width:12px;height:12px;background:'+c+';border-radius:2px;flex-shrink:0"></div><span style="flex:1;font-size:0.875rem">'+n+'</span><span style="font-size:0.75rem;opacity:0.6">'+lo+'-'+hi+'%</span></div>';}).join('')+'</div>';
  });
})();