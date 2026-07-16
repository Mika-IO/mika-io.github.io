(function(){
  const stops=new Set('the a an and or but in on at to of is it this that these those was were are be been being have has had do does did will would could should may might must shall can for from with about as by into through during before after above below i me my myself we our ours ourselves you your yours yourself he him his himself she her hers herself they them their theirs themselves what which who whom this each few more most other some such no nor not only own same so than too very just because than'.split(' '));
  document.getElementById('wf-go').onclick=function(){
    const text=document.getElementById('wf-in').value;
    const n=Math.min(100,Math.max(1,parseInt(document.getElementById('wf-n').value)||20));
    const excl=document.getElementById('wf-stop').checked;
    const words=text.toLowerCase().replace(/[^a-z\s]/g,' ').split(/\s+/).filter(w=>w.length>0&&(!excl||!stops.has(w)));
    const freq={};words.forEach(w=>{freq[w]=(freq[w]||0)+1;});
    const sorted=Object.entries(freq).sort((a,b)=>b[1]-a[1]).slice(0,n);
    const total=words.length;
    if(!sorted.length){document.getElementById('wf-out').innerHTML='<p>No words found</p>';return;}
    const max=sorted[0][1];
    document.getElementById('wf-out').innerHTML=`<div style="margin-bottom:0.5rem;opacity:0.6;font-size:0.85rem">Total words: ${total} | Unique: ${Object.keys(freq).length}</div>`+sorted.map(([w,c])=>`<div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:4px"><span style="width:120px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${w}</span><div style="flex:1;background:var(--line);border-radius:4px;height:16px"><div style="background:var(--accent,#6366f1);border-radius:4px;height:100%;width:${(c/max*100).toFixed(0)}%"></div></div><span style="width:60px;text-align:right;font-size:0.8rem;opacity:0.7">${c} (${(c/total*100).toFixed(1)}%)</span></div>`).join('');
  };
})();