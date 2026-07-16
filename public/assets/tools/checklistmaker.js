(function(){
  const KEY='checklist_items';
  let items=JSON.parse(localStorage.getItem(KEY)||'[]');
  function save(){localStorage.setItem(KEY,JSON.stringify(items));}
  function render(){
    const list=document.getElementById('cl-list');
    list.innerHTML=items.map((item,i)=>`<li style="display:flex;align-items:center;gap:0.5rem;padding:0.4rem 0;border-bottom:1px solid var(--line)"><input type="checkbox" ${item.done?'checked':''} id="ci${i}" style="width:18px;height:18px;cursor:pointer"><label for="ci${i}" style="flex:1;cursor:pointer;${item.done?'text-decoration:line-through;opacity:0.5':''}">${item.text}</label><button style="background:none;border:none;cursor:pointer;opacity:0.4;font-size:1.1rem" onclick="this.closest('li').remove();items.splice(${i},1);save();render()">×</button></li>`).join('');
    list.querySelectorAll('input[type=checkbox]').forEach((cb,i)=>{cb.onchange=function(){items[i].done=this.checked;save();render();};});
    const done=items.filter(x=>x.done).length;
    document.getElementById('cl-progress').textContent=items.length?done+'/'+items.length+' done':'';
  }
  function addItem(){
    const txt=document.getElementById('cl-in').value.trim();
    if(!txt)return;items.push({text:txt,done:false});save();render();document.getElementById('cl-in').value='';document.getElementById('cl-in').focus();
  }
  document.getElementById('cl-add').onclick=addItem;
  document.getElementById('cl-in').addEventListener('keydown',e=>{if(e.key==='Enter')addItem();});
  document.getElementById('cl-clear-done').onclick=function(){items=items.filter(x=>!x.done);save();render();};
  document.getElementById('cl-clear-all').onclick=function(){if(confirm('Clear all items?')){items=[];save();render();}};
  render();
})();