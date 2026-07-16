(function(){
  document.getElementById('ph-form').addEventListener('submit',function(e){
    e.preventDefault();
    const type=document.getElementById('ph-type').value;
    const val=parseFloat(document.getElementById('ph-val').value);
    const out=document.getElementById('ph-out');
    let ph,h,oh;
    if(type==='h'){h=val;ph=-Math.log10(h);}
    else if(type==='oh'){oh=val;ph=14+Math.log10(oh);}
    else{ph=val;h=Math.pow(10,-ph);}
    if(isNaN(ph)||ph<0||ph>14){out.innerHTML='<p style="color:var(--red,#ef4444)">Invalid input</p>';out.hidden=false;return;}
    h=h||Math.pow(10,-ph);oh=oh||(1e-14/h);
    const category=ph<2?'Strongly acidic':ph<4?'Acidic':ph<6?'Weakly acidic':ph<7?'Slightly acidic':ph===7?'Neutral':ph<8?'Slightly basic':ph<10?'Weakly basic':ph<12?'Basic':'Strongly basic';
    const hue=ph<=7?Math.round(0+ph*17):Math.round(119+(ph-7)*12);
    out.hidden=false;
    out.innerHTML=`<div style="font-size:3rem;font-weight:800;color:hsl(${hue},80%,50%)">${ph.toFixed(4)}</div><p style="font-size:1rem;opacity:0.8">${category}</p><div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;margin-top:0.75rem;text-align:left"><div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">[H⁺]</div><strong>${h.toExponential(3)} mol/L</strong></div><div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">[OH⁻]</div><strong>${oh.toExponential(3)} mol/L</strong></div></div>`;
  });
})();