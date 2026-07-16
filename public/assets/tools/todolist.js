(function(){
  const KEY='todolist_v1';
  let filter='all';
  function load(){try{return JSON.parse(localStorage.getItem(KEY))||[];}catch{return[];}}
  function save(d){localStorage.setItem(KEY,JSON.stringify(d));}
  function render(){
    const data=load();const list=document.getElementById('todo-list');
    const shown=filter==='all'?data:filter==='active'?data.filter(t=>!t.done):data.filter(t=>t.done);
    if(!shown.length){list.innerHTML='<p style="opacity:0.6">'+T('notasks','No tasks here.')+'</p>';return;}
    list.innerHTML=shown.map(t=>{
      const i=data.indexOf(t);
      return `<div style="display:flex;align-items:center;gap:0.5rem;padding:0.5rem 0.75rem;background:var(--surface);border:1px solid var(--line);border-radius:8px;margin-bottom:0.3rem">
        <input type="checkbox" ${t.done?'checked':''} onchange="toggleTodo(${i})" style="width:1.1rem;height:1.1rem;cursor:pointer">
        <span style="flex:1;${t.done?'text-decoration:line-through;opacity:0.5':''}">${t.text}</span>
        <button onclick="deleteTodo(${i})" style="background:none;border:none;cursor:pointer;opacity:0.4">🗑</button>
      </div>`;
    }).join('');
  }
  window.toggleTodo=function(i){const d=load();d[i].done=!d[i].done;save(d);render();};
  window.deleteTodo=function(i){const d=load();d.splice(i,1);save(d);render();};
  document.getElementById('todo-add').onclick=function(){
    const text=document.getElementById('todo-new').value.trim();
    if(!text)return;const d=load();d.push({text,done:false});save(d);document.getElementById('todo-new').value='';render();
  };
  document.getElementById('todo-new').addEventListener('keydown',function(e){if(e.key==='Enter')document.getElementById('todo-add').click();});
  ['all','active','done'].forEach(f=>document.getElementById('todo-'+f).onclick=()=>{filter=f;render();});
  document.getElementById('todo-clear').onclick=()=>{save(load().filter(t=>!t.done));render();};
  render();
})();