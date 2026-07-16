(function(){
  function escape(val,sep){
    const s=String(val===null||val===undefined?'':val);
    if(s.includes(sep)||s.includes('"')||s.includes('\n'))return '"'+s.replace(/"/g,'""')+'"';
    return s;
  }
  document.getElementById('j2c-go').onclick=function(){
    const raw=document.getElementById('j2c-in').value.trim();
    const sep=document.getElementById('j2c-sep').value;
    const out=document.getElementById('j2c-out');
    try{
      const data=JSON.parse(raw);
      if(!Array.isArray(data)||!data.length){out.value='Input must be a non-empty JSON array';return;}
      const headers=[...new Set(data.flatMap(obj=>Object.keys(obj)))];
      const rows=[headers.join(sep),...data.map(obj=>headers.map(h=>escape(obj[h],sep)).join(sep))];
      out.value=rows.join('\n');
    }catch(e){out.value='Invalid JSON: '+e.message;}
  };
  document.getElementById('j2c-copy').onclick=function(){navigator.clipboard.writeText(document.getElementById('j2c-out').value);};
})();