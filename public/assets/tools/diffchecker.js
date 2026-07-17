(function(){
  function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
  document.getElementById('dc-go').onclick=function(){
    const orig=document.getElementById('dc-orig').value.split('\n');
    const next=document.getElementById('dc-new').value.split('\n');
    const max=Math.max(orig.length,next.length);
    let html='<div style="display:grid;gap:2px">';
    for(let i=0;i<max;i++){
      const a=orig[i],b=next[i];
      if(a===b){html+='<div style="padding:1px 6px;opacity:0.5">  '+esc(a||'')+'</div>';}
      else{
        if(a!==undefined)html+='<div style="padding:1px 6px;background:rgba(239,68,68,0.15);border-left:3px solid #ef4444">- '+esc(a)+'</div>';
        if(b!==undefined)html+='<div style="padding:1px 6px;background:rgba(34,197,94,0.15);border-left:3px solid #22c55e">+ '+esc(b)+'</div>';
      }
    }
    document.getElementById('dc-out').innerHTML=html+'</div>';
  };
  document.getElementById('dc-orig').value='Hello World\nThis is line 2\nSame line\nOld content here';
  document.getElementById('dc-new').value='Hello World\nThis is line two\nSame line\nNew content here\nNew line added';
})();