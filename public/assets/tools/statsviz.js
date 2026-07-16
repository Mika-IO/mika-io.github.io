(function(){
  document.getElementById('sv-go').onclick=function(){
    const raw=document.getElementById('sv-data').value.split(/[,\s]+/).map(Number).filter(n=>!isNaN(n)&&n!==undefined);
    if(!raw.length)return;
    const sorted=[...raw].sort((a,b)=>a-b);
    const n=raw.length;const mean=raw.reduce((a,b)=>a+b,0)/n;
    const median=n%2===0?(sorted[n/2-1]+sorted[n/2])/2:sorted[Math.floor(n/2)];
    const freq={};raw.forEach(v=>freq[v]=(freq[v]||0)+1);
    const maxFreq=Math.max(...Object.values(freq));
    const modes=Object.entries(freq).filter(([,c])=>c===maxFreq).map(([v])=>v);
    const variance=raw.reduce((a,v)=>a+Math.pow(v-mean,2),0)/(n-1);
    const std=Math.sqrt(variance);
    const range=sorted[n-1]-sorted[0];
    const p25=sorted[Math.floor(n*0.25)];const p75=sorted[Math.floor(n*0.75)];
    const fmt=v=>Number.isInteger(v)?v:v.toFixed(4);
    const items=[['n',n],['Sum',fmt(raw.reduce((a,b)=>a+b,0))],['Mean',fmt(mean)],['Median',fmt(median)],['Mode',modes.join(', ')],['Range',fmt(range)],['Std Dev (σ)',fmt(std)],['Variance',fmt(variance)],['Min',sorted[0]],['Max',sorted[n-1]],['Q1 (25th)',p25],['Q3 (75th)',p75]];
    const maxVal=Math.max(...Object.values(freq));
    const barChart='<div style="margin-top:0.5rem"><strong>Frequency</strong><div style="display:flex;flex-wrap:wrap;gap:0.3rem;align-items:flex-end;margin-top:0.4rem">'+Object.entries(freq).sort(([a],[b])=>a-b).map(([v,c])=>`<div style="text-align:center;font-size:0.75rem"><div style="width:28px;background:var(--accent,#6366f1);border-radius:4px 4px 0 0;height:${Math.round(c/maxVal*80)}px;margin:0 auto"></div>${v}<br><span style="opacity:0.5">${c}</span></div>`).join('')+'</div></div>';
    document.getElementById('sv-out').innerHTML='<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:0.4rem">'+items.map(([k,v])=>`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.4rem 0.6rem"><div style="font-size:0.7rem;opacity:0.6">${k}</div><strong style="font-size:0.9rem">${v}</strong></div>`).join('')+'</div>'+barChart;
  };
  document.getElementById('sv-go').click();
})();