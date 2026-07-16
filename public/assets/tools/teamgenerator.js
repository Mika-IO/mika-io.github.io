(function(){
  document.getElementById('tg-go').onclick=function(){
    const names=document.getElementById('tg-names').value.trim().split('\n').map(s=>s.trim()).filter(Boolean);
    const n=Math.max(2,Math.min(20,parseInt(document.getElementById('tg-num').value)||2));
    const out=document.getElementById('tg-out');
    if(names.length<n){out.innerHTML='<p>Add more names than teams</p>';return;}
    const shuffled=[...names].sort(()=>Math.random()-0.5);
    const teams=Array.from({length:n},()=>[]);
    shuffled.forEach((name,i)=>teams[i%n].push(name));
    out.innerHTML='<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:0.75rem">'+teams.map((t,i)=>'<div style="background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:0.75rem"><strong style="display:block;margin-bottom:0.4rem">Team '+(i+1)+'</strong>'+t.map(n=>'<div style="padding:2px 0;font-size:0.9rem">'+n+'</div>').join('')+'</div>').join('')+'</div>';
  };
})();