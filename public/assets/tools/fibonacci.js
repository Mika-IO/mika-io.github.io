(function(){
  document.getElementById('fib-form').addEventListener('submit',function(e){
    e.preventDefault();
    const n=Math.min(80,Math.max(1,parseInt(document.getElementById('fib-n').value)||10));
    const seq=[0,1];
    for(let i=2;i<n;i++)seq.push(seq[i-1]+seq[i-2]);
    const terms=seq.slice(0,n);
    document.getElementById('fib-out').innerHTML=`<div style="font-family:monospace;word-break:break-all;line-height:1.8">${terms.map((v,i)=>`<span style="display:inline-block;margin:2px 4px;padding:2px 6px;background:var(--surface);border:1px solid var(--line);border-radius:4px">${v}</span>`).join('')}</div><p style="opacity:0.6;font-size:0.85rem;margin-top:0.5rem">φ ratio (last two): ${n>=2?(terms[n-1]/terms[n-2]).toFixed(10):''}</p>`;
  });
})();