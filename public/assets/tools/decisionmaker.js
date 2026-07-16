(function(){
  document.getElementById('dm-add').onclick=function(){
    const opts=document.getElementById('dm-opts');
    const rows=opts.querySelectorAll('.row');if(rows.length>=10)return;
    const row=document.createElement('div');row.className='row';row.style.marginTop='0.3rem';
    const inp=document.createElement('input');inp.type='text';inp.className='dm-opt';inp.placeholder='Option '+(rows.length+1);inp.style.cssText='flex:1;padding:0.5rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)';
    const del=document.createElement('button');del.textContent='×';del.style.cssText='padding:0.4rem 0.6rem;background:var(--surface);border:1px solid var(--line);border-radius:8px;cursor:pointer;color:var(--text)';del.onclick=()=>row.remove();
    row.append(inp,del);opts.appendChild(row);
  };
  document.getElementById('dm-decide').onclick=function(){
    const options=[...document.querySelectorAll('.dm-opt')].map(i=>i.value.trim()).filter(Boolean);
    const out=document.getElementById('dm-result');
    if(options.length<2){out.innerHTML='<p>Add at least 2 options</p>';out.hidden=false;return;}
    const chosen=options[Math.floor(Math.random()*options.length)];
    out.hidden=false;
    out.innerHTML='<div style="font-size:1.5rem;font-weight:800;color:var(--accent,#6366f1)">'+chosen+'</div><p style="opacity:0.6;font-size:0.85rem;margin-top:0.4rem">Selected from '+options.length+' options</p>';
  };
})();