(function(){
  const stops=new Set('the a an and or but in on at to of is it this that was were are be been have has do did will would could should for from with about as by i me my we our you your he him she her they them'.split(' '));
  document.getElementById('ts-go').onclick=function(){
    const text=document.getElementById('ts-in').value.trim();
    const n=Math.min(20,Math.max(1,parseInt(document.getElementById('ts-n').value)||3));
    const out=document.getElementById('ts-out');
    if(!text){out.innerHTML='';return;}
    const sentences=text.match(/[^.!?]+[.!?]+/g)||[text];
    if(sentences.length<=n){out.innerHTML='<p style="opacity:0.6">Text has fewer sentences than requested.</p><blockquote style="margin:0.5rem 0;padding:0.5rem 1rem;border-left:3px solid var(--accent,#6366f1)">'+text+'</blockquote>';return;}
    const wordFreq={};
    text.toLowerCase().replace(/[^a-z\s]/g,' ').split(/\s+/).filter(w=>w&&!stops.has(w)).forEach(w=>{wordFreq[w]=(wordFreq[w]||0)+1;});
    const scored=sentences.map((sent,i)=>{
      const words=sent.toLowerCase().replace(/[^a-z\s]/g,' ').split(/\s+/).filter(w=>w&&!stops.has(w));
      const score=words.reduce((s,w)=>s+(wordFreq[w]||0),0)/(words.length||1)+(i===0||i===sentences.length-1?2:0);
      return{sent:sent.trim(),score,i};
    });
    const top=scored.slice().sort((a,b)=>b.score-a.score).slice(0,n).sort((a,b)=>a.i-b.i);
    out.innerHTML='<blockquote style="margin:0;padding:0.75rem 1rem;border-left:3px solid var(--accent,#6366f1);background:var(--surface);border-radius:0 8px 8px 0">'+top.map(s=>s.sent).join(' ')+'</blockquote>';
  };
})();