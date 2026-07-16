(function(){
  document.getElementById('r72-form').addEventListener('submit',function(e){
    e.preventDefault();
    const mode=document.getElementById('r72-mode').value;
    const val=parseFloat(document.getElementById('r72-val').value);
    const out=document.getElementById('r72-out');out.hidden=false;
    if(mode==='time'){
      const years=(72/val).toFixed(2);
      const exact=(Math.log(2)/Math.log(1+val/100)).toFixed(2);
      out.innerHTML=`<div style="font-size:2.5rem;font-weight:800;color:var(--accent,#6366f1)">${years} years</div><p style="opacity:0.7">at ${val}% annual return</p><p style="opacity:0.5;font-size:0.85rem">Exact (compound): ${exact} years</p>`;
    }else{
      const rate=(72/val).toFixed(2);
      out.innerHTML=`<div style="font-size:2.5rem;font-weight:800;color:var(--accent,#6366f1)">${rate}%</div><p style="opacity:0.7">annual return needed to double in ${val} years</p>`;
    }
  });
})();