(function(){
  document.getElementById('quad-form').addEventListener('submit',function(e){
    e.preventDefault();
    const a=parseFloat(document.getElementById('quad-a').value);
    const b=parseFloat(document.getElementById('quad-b').value);
    const c=parseFloat(document.getElementById('quad-c').value);
    const out=document.getElementById('quad-out');
    if(isNaN(a)||isNaN(b)||isNaN(c)){out.textContent='Enter all three coefficients';return;}
    if(a===0){out.innerHTML=b===0?'<p>No solution (0=0 or contradiction)</p>':`<p>Linear equation: x = ${(-c/b).toPrecision(6)}</p>`;return;}
    const disc=b*b-4*a*c;
    const denom=2*a;
    if(disc>0){
      const x1=(-b+Math.sqrt(disc))/denom;
      const x2=(-b-Math.sqrt(disc))/denom;
      out.innerHTML=`<p>Two real roots:<br>x₁ = ${x1.toPrecision(8)}<br>x₂ = ${x2.toPrecision(8)}</p><p style="opacity:0.6;font-size:0.85rem">Discriminant Δ = ${disc.toPrecision(6)}</p>`;
    }else if(disc===0){
      out.innerHTML=`<p>One repeated root: x = ${(-b/denom).toPrecision(8)}</p><p style="opacity:0.6;font-size:0.85rem">Discriminant Δ = 0</p>`;
    }else{
      const re=(-b/denom).toPrecision(6);
      const im=(Math.sqrt(-disc)/Math.abs(denom)).toPrecision(6);
      out.innerHTML=`<p>Two complex roots:<br>x₁ = ${re} + ${im}i<br>x₂ = ${re} − ${im}i</p><p style="opacity:0.6;font-size:0.85rem">Discriminant Δ = ${disc.toPrecision(6)}</p>`;
    }
  });
})();