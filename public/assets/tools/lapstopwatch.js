(function(){
  let start=0,elapsed=0,running=false,raf=null;
  const laps=[];
  const disp=document.getElementById('lsw-display');
  const lapList=document.getElementById('lsw-laps');
  const btnStart=document.getElementById('lsw-start');
  function fmt(ms){const m=Math.floor(ms/60000),s=Math.floor((ms%60000)/1000),cs=Math.floor((ms%1000)/10);return String(m).padStart(2,'0')+':'+String(s).padStart(2,'0')+'.'+String(cs).padStart(2,'0');}
  function render(ms){disp.textContent=fmt(ms);}
  function tick(){render(elapsed+Date.now()-start);raf=requestAnimationFrame(tick);}
  btnStart.addEventListener('click',function(){
    if(running){elapsed+=Date.now()-start;cancelAnimationFrame(raf);running=false;btnStart.textContent='Resume';}
    else{start=Date.now();running=true;btnStart.textContent='Stop';tick();}
  });
  document.getElementById('lsw-lap').addEventListener('click',function(){
    if(!running)return;
    const total=elapsed+Date.now()-start;
    const prev=laps.reduce((s,l)=>s+l.time,0);
    const lapTime=total-prev;
    laps.push({n:laps.length+1,time:lapTime,total});
    const minT=Math.min(...laps.map(l=>l.time)),maxT=Math.max(...laps.map(l=>l.time));
    lapList.innerHTML=laps.slice().reverse().map(l=>{
      const cls=l.time===minT?'color:var(--green,#22c55e)':l.time===maxT?'color:var(--red,#ef4444)':'';
      return `<div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid var(--line)"><span>Lap ${l.n}</span><span style="${cls};font-family:monospace">${fmt(l.time)}</span><span style="opacity:0.5;font-family:monospace">${fmt(l.total)}</span></div>`;
    }).join('');
  });
  document.getElementById('lsw-reset').addEventListener('click',function(){
    cancelAnimationFrame(raf);running=false;elapsed=0;laps.length=0;render(0);lapList.innerHTML='';btnStart.textContent='Start';
  });
})();