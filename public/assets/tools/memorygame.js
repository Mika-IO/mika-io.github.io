(function(){
  const emojis=['🍎','🐶','🚀','🎸','🦋','🍕','🌈','🐬'];
  let flipped=[],matched=[],moves=0,startTime=null,timer=null;
  function newGame(){
    clearInterval(timer);moves=0;flipped=[];matched=[];startTime=null;
    const pairs=[...emojis,...emojis].sort(()=>Math.random()-0.5);
    const grid=document.getElementById('mg-grid');
    grid.innerHTML=pairs.map((e,i)=>`<div class="card" data-i="${i}" data-e="${e}" style="height:70px;background:var(--surface);border:2px solid var(--line);border-radius:12px;cursor:pointer;font-size:1.8rem;display:flex;align-items:center;justify-content:center;transition:all 0.2s;user-select:none">?</div>`).join('');
    grid.querySelectorAll('.card').forEach(c=>c.addEventListener('click',flip));
    document.getElementById('mg-stats').textContent='0 moves';
  }
  function flip(){
    if(!startTime){startTime=Date.now();timer=setInterval(()=>{document.getElementById('mg-stats').textContent=moves+' moves · '+Math.floor((Date.now()-startTime)/1000)+'s';},1000);}
    const card=this;
    if(flipped.length>=2||matched.includes(card.dataset.i)||flipped.includes(card))return;
    card.textContent=card.dataset.e;card.style.background='var(--accent-soft,rgba(99,102,241,0.15))';
    flipped.push(card);
    if(flipped.length===2){
      moves++;
      if(flipped[0].dataset.e===flipped[1].dataset.e){
        matched.push(flipped[0].dataset.i,flipped[1].dataset.i);
        flipped[0].style.background='rgba(34,197,94,0.2)';flipped[1].style.background='rgba(34,197,94,0.2)';
        flipped=[];
        if(matched.length===16){clearInterval(timer);document.getElementById('mg-stats').textContent='🎉 Done! '+moves+' moves in '+Math.floor((Date.now()-startTime)/1000)+'s';}
      }else{
        const pair=[...flipped];flipped=[];
        setTimeout(()=>{pair.forEach(c=>{c.textContent='?';c.style.background='var(--surface)';});},900);
      }
    }
  }
  document.getElementById('mg-start').onclick=newGame;
  newGame();
})();