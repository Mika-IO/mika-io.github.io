(function(){
  const KEY='notepad_v1';let cur=null,debounce;
  function load(){try{return JSON.parse(localStorage.getItem(KEY))||{};}catch{return{};}}
  function save(d){localStorage.setItem(KEY,JSON.stringify(d));}
  function listNotes(){
    const d=load();const sel=document.getElementById('np-notes');const prev=sel.value;
    sel.innerHTML=Object.keys(d).map(k=>`<option value="${k}">${k}</option>`).join('');
    if(prev&&d[prev])sel.value=prev;
    if(sel.options.length&&!sel.value)sel.selectedIndex=0;
  }
  function loadNote(name){
    if(!name)return;const d=load();cur=name;
    document.getElementById('np-title').value=name;
    document.getElementById('np-body').value=d[name]||'';
  }
  document.getElementById('np-save').onclick=function(){
    const title=document.getElementById('np-title').value.trim()||'Untitled';
    const body=document.getElementById('np-body').value;
    const d=load();d[title]=body;save(d);cur=title;listNotes();document.getElementById('np-notes').value=title;
    document.getElementById('np-status').textContent='Saved at '+new Date().toLocaleTimeString(window.__LANG||undefined);
  };
  document.getElementById('np-new').onclick=function(){cur=null;document.getElementById('np-title').value='';document.getElementById('np-body').value='';};
  document.getElementById('np-del').onclick=function(){
    const name=document.getElementById('np-notes').value;if(!name)return;
    const d=load();delete d[name];save(d);listNotes();
    if(document.getElementById('np-notes').options.length)loadNote(document.getElementById('np-notes').value);
    else{document.getElementById('np-title').value='';document.getElementById('np-body').value='';}
  };
  document.getElementById('np-notes').addEventListener('change',function(){loadNote(this.value);});
  document.getElementById('np-body').addEventListener('input',function(){
    clearTimeout(debounce);debounce=setTimeout(()=>{
      const title=document.getElementById('np-title').value.trim()||'Untitled';
      const d=load();d[title]=this.value;save(d);listNotes();
      document.getElementById('np-status').textContent='Auto-saved';
    },800);
  });
  listNotes();if(document.getElementById('np-notes').value)loadNote(document.getElementById('np-notes').value);
})();