(function(){
  const KEY='flashcards_v1';
  let idx=0,flipped=false;
  function load(){try{return JSON.parse(localStorage.getItem(KEY))||[];}catch{return[];}}
  function save(d){localStorage.setItem(KEY,JSON.stringify(d));}
  function showCard(i,flp){
    const cards=load();if(!cards.length)return;
    const card=cards[i];flipped=flp||false;
    const el=document.getElementById('fc-card');
    el.textContent=flipped?card.back:card.front;
    el.style.background=flipped?'var(--accent-soft,rgba(99,102,241,0.1))':'var(--surface)';
    document.getElementById('fc-progress').textContent=(i+1)+'/'+cards.length;
  }
  document.getElementById('fc-add').onclick=function(){
    const front=document.getElementById('fc-front').value.trim();
    const back=document.getElementById('fc-back').value.trim();
    if(!front||!back)return;
    const d=load();d.push({front,back});save(d);
    document.getElementById('fc-front').value='';document.getElementById('fc-back').value='';
    document.getElementById('fc-study').style.display='';
  };
  document.getElementById('fc-study').onclick=function(){
    const cards=load();if(!cards.length)return;idx=0;
    document.getElementById('fc-maker').style.display='none';
    document.getElementById('fc-study-mode').style.display='';
    showCard(idx,false);
  };
  document.getElementById('fc-card').onclick=()=>showCard(idx,!flipped);
  document.getElementById('fc-next').onclick=()=>{idx=(idx+1)%load().length;showCard(idx,false);};
  document.getElementById('fc-prev').onclick=()=>{const n=load().length;idx=(idx-1+n)%n;showCard(idx,false);};
  document.getElementById('fc-exit').onclick=function(){document.getElementById('fc-study-mode').style.display='none';document.getElementById('fc-maker').style.display='';if(load().length)document.getElementById('fc-study').style.display='';};
})();