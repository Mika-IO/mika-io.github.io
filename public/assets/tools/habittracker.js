(function(){
  const KEY='habit_tracker_v1';
  function load(){try{return JSON.parse(localStorage.getItem(KEY))||[];}catch{return[];}}
  function save(d){localStorage.setItem(KEY,JSON.stringify(d));}
  function todayStr(){return new Date().toISOString().slice(0,10);}
  function render(){
    const data=load();const today=todayStr();
    const list=document.getElementById('ht-list');
    if(!data.length){list.innerHTML='<p style="opacity:0.6">'+T('nohabits','No habits yet. Add one above!')+'</p>';return;}
    list.innerHTML=data.map((h,i)=>{
      const done=h.days&&h.days.includes(today);
      const streak=calcStreak(h.days||[]);
      const total=h.days?h.days.length:0;
      return `<div style="display:flex;align-items:center;gap:0.5rem;padding:0.6rem 0.75rem;background:var(--surface);border:1px solid var(--line);border-radius:8px;margin-bottom:0.4rem">
        <button onclick="toggleDay(${i})" style="font-size:1.5rem;background:none;border:none;cursor:pointer">${done?'✅':'⬜'}</button>
        <div style="flex:1"><strong>${h.name}</strong><div style="font-size:0.8rem;opacity:0.6">🔥 ${streak} day streak · ${total} total</div></div>
        <button onclick="deleteHabit(${i})" style="background:none;border:none;cursor:pointer;opacity:0.4;font-size:1.1rem">🗑</button>
      </div>`;
    }).join('');
  }
  function calcStreak(days){
    if(!days.length)return 0;
    const sorted=[...days].sort().reverse();
    let streak=0,prev=new Date();prev.setHours(0,0,0,0);
    for(const d of sorted){
      const dt=new Date(d);const diff=(prev-dt)/(864e5);
      if(diff<=1){streak++;prev=dt;}else break;
    }
    return streak;
  }
  window.toggleDay=function(i){const data=load();const today=todayStr();if(!data[i].days)data[i].days=[];const idx=data[i].days.indexOf(today);if(idx>=0)data[i].days.splice(idx,1);else data[i].days.push(today);save(data);render();};
  window.deleteHabit=function(i){const data=load();data.splice(i,1);save(data);render();};
  document.getElementById('ht-add').onclick=function(){
    const name=document.getElementById('ht-new').value.trim();
    if(!name)return;const data=load();data.push({name,days:[]});save(data);document.getElementById('ht-new').value='';render();
  };
  document.getElementById('ht-new').addEventListener('keydown',function(e){if(e.key==='Enter')document.getElementById('ht-add').click();});
  render();
})();