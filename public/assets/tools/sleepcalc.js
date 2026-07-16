(function(){
  document.getElementById('sl-go').onclick=function(){
    const[wH,wM]=document.getElementById('sl-wake').value.split(':').map(Number);
    const cycles=parseInt(document.getElementById('sl-cycles').value)||5;
    const wakeMin=wH*60+wM;
    const fallAsleep=14; // avg minutes to fall asleep
    const out=document.getElementById('sl-out');
    const times=[];
    for(let c=cycles;c>=3;c--){
      const bedMin=(wakeMin-c*90-fallAsleep+24*60)%(24*60);
      const bH=Math.floor(bedMin/60);
      const bM=bedMin%60;
      times.push({time:`${String(bH).padStart(2,'0')}:${String(bM).padStart(2,'0')}`,cycles:c,hours:(c*90/60).toFixed(1)});
    }
    out.innerHTML='<div style="display:grid;gap:0.4rem">'+times.map(t=>`<div style="display:flex;justify-content:space-between;align-items:center;background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><strong style="font-size:1.2rem">${t.time}</strong><span style="opacity:0.7">${t.cycles} cycles · ${t.hours}h</span></div>`).join('')+'</div>';
  };
})();