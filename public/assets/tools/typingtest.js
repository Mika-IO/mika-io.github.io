(function(){
  const texts=['The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump. The five boxing wizards jump quickly.','Typing is a skill that improves with consistent practice. Focus on accuracy first, then speed. Touch typists use all ten fingers on the home row keys without looking at the keyboard.','Programming requires typing many special characters. Parentheses, brackets, and semicolons appear frequently in code. Developing good keyboard habits early makes coding much more efficient and enjoyable.'];
  let timer,startTime,running=false,text='';
  const prompt=document.getElementById('tt-prompt');
  const input=document.getElementById('tt-input');
  const stats=document.getElementById('tt-stats');
  const btn=document.getElementById('tt-start');
  function renderPrompt(typed){
    prompt.innerHTML=[...text].map((c,i)=>{
      const tc=typed[i];
      if(tc===undefined)return`<span>${c==='  '?'&nbsp;':c}</span>`;
      if(tc===c)return`<span style="color:var(--green,#22c55e)">${c}</span>`;
      return`<span style="color:var(--red,#ef4444);text-decoration:underline">${c==='  '?'&nbsp;':c}</span>`;
    }).join('');
  }
  function calcStats(typed){
    const elapsed=(Date.now()-startTime)/60000;
    const correct=[...typed].filter((c,i)=>c===text[i]).length;
    const wpm=Math.round(correct/5/elapsed);
    const acc=typed.length?Math.round(correct/typed.length*100):100;
    return{wpm,acc,time:Math.floor((Date.now()-startTime)/1000)};
  }
  btn.addEventListener('click',function(){
    if(running){return;}
    text=texts[Math.floor(Math.random()*texts.length)];
    renderPrompt('');input.value='';input.disabled=false;input.focus();
    running=true;startTime=Date.now();btn.textContent='…';
    let sec=60;
    timer=setInterval(()=>{
      const typed=input.value;
      renderPrompt(typed);
      const s=calcStats(typed);
      stats.innerHTML=`<span>⏱ ${60-sec}s</span><span>⚡ ${s.wpm} WPM</span><span>🎯 ${s.acc}%</span>`;
      if(--sec<0||typed===text){
        clearInterval(timer);input.disabled=true;running=false;btn.textContent='Restart';
        const fin=calcStats(typed);
        stats.innerHTML=`<strong>Done! ${fin.wpm} WPM · ${fin.acc}% accuracy</strong>`;
      }
    },1000);
  });
  text=texts[0];renderPrompt('');
})();