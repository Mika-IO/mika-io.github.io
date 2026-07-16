(function(){
  const scale=[['A+',97],['A',93],['A-',90],['B+',87],['B',83],['B-',80],['C+',77],['C',73],['C-',70],['D+',67],['D',63],['D-',60],['F',0]];
  document.getElementById('tg-form').addEventListener('submit',function(e){
    e.preventDefault();
    const score=parseFloat(document.getElementById('tg-score').value);
    const total=parseFloat(document.getElementById('tg-total').value);
    const pct=score/total*100;
    const letter=scale.find(([,min])=>pct>=min)?.[0]||'F';
    const color=pct>=90?'#22c55e':pct>=80?'#84cc16':pct>=70?'#eab308':pct>=60?'#f97316':'#ef4444';
    const out=document.getElementById('tg-out');out.hidden=false;
    out.innerHTML=`<div style="font-size:3rem;font-weight:800;color:${color}">${letter}</div><div style="font-size:1.5rem;font-weight:600">${pct.toFixed(2)}%</div><p style="opacity:0.6">${score} / ${total} points</p>`;
  });
})();