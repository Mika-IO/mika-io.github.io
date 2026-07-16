(function(){
  function test(){
    const pat=document.getElementById('rx-pat').value;
    const flags=document.getElementById('rx-flags').value;
    const str=document.getElementById('rx-test').value;
    const out=document.getElementById('rx-out');
    if(!pat||!str){out.innerHTML='';return;}
    try{
      const rx=new RegExp(pat,flags.replace('g','')||'');
      const rxg=new RegExp(pat,'g'+(flags.replace('g','')));
      const matches=[...str.matchAll(rxg)];
      if(!matches.length){out.innerHTML='<p style="color:var(--red,#ef4444)">No matches</p>';return;}
      let html=`<p style="color:var(--green,#22c55e)">${matches.length} match${matches.length!==1?'es':''}</p>`;
      html+='<ul style="list-style:none;padding:0;margin:0.5rem 0;font-family:monospace;font-size:0.875rem">';
      matches.slice(0,20).forEach((m,i)=>{
        html+=`<li style="padding:4px 8px;background:var(--surface);border:1px solid var(--line);border-radius:6px;margin-bottom:4px"><span style="opacity:0.5">#${i+1}</span> "${m[0]}" at index ${m.index}${m.length>1?' | groups: '+m.slice(1).map(g=>'"'+(g||'undefined')+'"').join(', '):''}</li>`;
      });
      if(matches.length>20)html+=`<li style="opacity:0.6">…and ${matches.length-20} more</li>`;
      html+='</ul>';
      out.innerHTML=html;
    }catch(e){out.innerHTML='<p style="color:var(--red,#ef4444)">Invalid regex: '+e.message+'</p>';}
  }
  document.getElementById('rx-pat').addEventListener('input',test);
  document.getElementById('rx-flags').addEventListener('input',test);
  document.getElementById('rx-test').addEventListener('input',test);
})();