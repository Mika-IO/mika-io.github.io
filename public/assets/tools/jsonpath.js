(function(){
  document.getElementById('jp-go').onclick=function(){
    const raw=document.getElementById('jp-json').value.trim();
    const key=document.getElementById('jp-key').value.trim();
    const out=document.getElementById('jp-out');
    try{
      const obj=JSON.parse(raw);
      const parts=key.replace(/\[(\d+)\]/g,'.$1').split('.').filter(Boolean);
      let cur=obj;
      for(const part of parts){if(cur===null||cur===undefined){cur=undefined;break;}cur=cur[part];}
      out.textContent=cur===undefined?'undefined':JSON.stringify(cur,null,2);
    }catch(e){out.textContent='Error: '+e.message;}
  };
  document.getElementById('jp-json').value='{\n  "user": {\n    "name": "Alice",\n    "age": 30,\n    "scores": [95, 87, 92]\n  }\n}';
})();