(function(){
  let items=['Pizza','Sushi','Tacos','Burger','Pasta','Salad','Ramen','Curry'];
  let angle=0,spinning=false;
  const colors=['#6366f1','#ec4899','#f59e0b','#10b981','#3b82f6','#ef4444','#8b5cf6','#14b8a6'];
  const canvas=document.getElementById('wsp-canvas');const ctx=canvas.getContext('2d');
  function draw(ang){
    const cx=150,cy=150,r=140;ctx.clearRect(0,0,300,300);
    const slice=(2*Math.PI)/items.length;
    items.forEach((item,i)=>{
      ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,r,ang+i*slice,ang+(i+1)*slice);ctx.closePath();
      ctx.fillStyle=colors[i%colors.length];ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.stroke();
      ctx.save();ctx.translate(cx,cy);ctx.rotate(ang+(i+0.5)*slice);ctx.textAlign='right';ctx.fillStyle='#fff';ctx.font='bold '+Math.min(14,300/items.length/3)+'px sans-serif';
      ctx.fillText(item.length>12?item.slice(0,11)+'…':item,r-8,4);ctx.restore();
    });
    // Pointer
    ctx.beginPath();ctx.moveTo(285,150);ctx.lineTo(270,140);ctx.lineTo(270,160);ctx.closePath();ctx.fillStyle='#fff';ctx.fill();ctx.strokeStyle='#333';ctx.lineWidth=1;ctx.stroke();
  }
  function spin(){
    if(spinning)return;spinning=true;document.getElementById('wsp-result').textContent='';
    const extra=Math.PI*2*5+Math.random()*Math.PI*2;
    const duration=3000+Math.random()*2000;const start=Date.now();const startAngle=angle;
    function frame(){const elapsed=Date.now()-start;const t=Math.min(1,elapsed/duration);const ease=1-Math.pow(1-t,4);angle=startAngle+extra*ease;draw(angle);
      if(t<1){requestAnimationFrame(frame);}
      else{spinning=false;const norm=((2*Math.PI)-(angle%(2*Math.PI))+Math.PI*2)%(Math.PI*2);const slice=(2*Math.PI)/items.length;const winner=Math.floor(norm/slice)%items.length;document.getElementById('wsp-result').textContent='🎉 '+items[winner];}
    }
    requestAnimationFrame(frame);
  }
  document.getElementById('wsp-spin').onclick=spin;
  document.getElementById('wsp-edit').onclick=function(){const a=document.getElementById('wsp-edit-area');a.style.display=a.style.display==='none'?'':'none';if(a.style.display!=='none')document.getElementById('wsp-items').value=items.join('\n');};
  document.getElementById('wsp-apply').onclick=function(){const raw=document.getElementById('wsp-items').value.trim().split('\n').map(s=>s.trim()).filter(Boolean);if(raw.length>=2){items=raw;draw(angle);document.getElementById('wsp-edit-area').style.display='none';}};
  draw(0);
})();