(function(){
  document.getElementById('stats-form').addEventListener('submit',function(e){
    e.preventDefault();
    const nums=document.getElementById('stats-in').value.split(',').map(s=>parseFloat(s.trim())).filter(n=>!isNaN(n));
    if(!nums.length)return;
    nums.sort((a,b)=>a-b);
    const n=nums.length;
    const mean=nums.reduce((s,v)=>s+v,0)/n;
    const mid=Math.floor(n/2);
    const median=n%2?nums[mid]:(nums[mid-1]+nums[mid])/2;
    const freq={};nums.forEach(v=>{freq[v]=(freq[v]||0)+1;});
    const maxF=Math.max(...Object.values(freq));
    const modes=Object.keys(freq).filter(k=>freq[k]===maxF);
    const mode=maxF===1?'none':modes.join(', ');
    const varPop=nums.reduce((s,v)=>s+(v-mean)**2,0)/n;
    const varSam=n>1?nums.reduce((s,v)=>s+(v-mean)**2,0)/(n-1):0;
    const items=[
      ['n',n],['Min',nums[0]],['Max',nums[n-1]],['Range',nums[n-1]-nums[0]],
      ['Mean',mean.toPrecision(6)],['Median',median],['Mode',mode],
      ['Var (pop)',varPop.toPrecision(6)],['Var (sample)',varSam.toPrecision(6)],
      ['StdDev (pop)',Math.sqrt(varPop).toPrecision(6)],['StdDev (sample)',Math.sqrt(varSam).toPrecision(6)],
      ['Sum',nums.reduce((s,v)=>s+v,0)]
    ];
    const out=document.getElementById('stats-out');
    out.hidden=false;
    out.innerHTML=items.map(([k,v])=>`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">${k}</div><strong>${v}</strong></div>`).join('');
  });
})();