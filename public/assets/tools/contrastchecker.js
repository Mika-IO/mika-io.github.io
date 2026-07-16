(function(){
  function hexToRgb(hex){return[parseInt(hex.slice(1,3),16)/255,parseInt(hex.slice(3,5),16)/255,parseInt(hex.slice(5,7),16)/255];}
  function lin(c){return c<=0.03928?c/12.92:Math.pow((c+0.055)/1.055,2.4);}
  function lum(hex){const[r,g,b]=hexToRgb(hex).map(lin);return 0.2126*r+0.7152*g+0.0722*b;}
  function ratio(c1,c2){const l1=lum(c1),l2=lum(c2);const[hi,lo]=l1>l2?[l1,l2]:[l2,l1];return(hi+0.05)/(lo+0.05);}
  function update(){
    const fg=document.getElementById('cc-fg').value,bg=document.getElementById('cc-bg').value;
    const r=ratio(fg,bg);
    document.getElementById('cc-preview').style.background=bg;
    document.getElementById('cc-sample-text').style.color=fg;
    document.getElementById('cc-sample-small').style.color=fg;
    const badge=(pass,label)=>'<div style="background:var(--surface);border:2px solid '+(pass?'#22c55e':'#ef4444')+'";border-radius:8px;padding:0.4rem 0.6rem;text-align:center><div style="font-size:0.7rem;opacity:0.6">'+label+'</div><strong style="color:'+(pass?'#22c55e':'#ef4444')+'">'+(pass?'Pass':'Fail')+'</strong></div>';
    document.getElementById('cc-results').innerHTML='<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem;grid-column:1/-1;text-align:center"><div style="font-size:0.75rem;opacity:0.6">Contrast ratio</div><strong style="font-size:1.5rem">'+r.toFixed(2)+':1</strong></div>'+badge(r>=4.5,'AA Normal')+badge(r>=7,'AAA Normal')+badge(r>=3,'AA Large')+badge(r>=4.5,'AAA Large');
  }
  document.getElementById('cc-fg').addEventListener('input',update);document.getElementById('cc-bg').addEventListener('input',update);update();
})();