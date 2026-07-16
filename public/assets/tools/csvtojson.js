(function(){
  function parseCSV(text,sep){
    const rows=[];let cur=[],field='',inQ=false;
    for(let i=0;i<text.length;i++){
      const c=text[i];
      if(inQ){if(c==='"'&&text[i+1]==='"'){field+='"';i++;}else if(c==='"'){inQ=false;}else{field+=c;}}
      else if(c==='"'){inQ=true;}
      else if(c===sep){cur.push(field);field='';}
      else if(c==='\n'||c==='\r'){if(c==='\r'&&text[i+1]==='\n')i++;cur.push(field);rows.push(cur);cur=[];field='';}
      else{field+=c;}
    }
    cur.push(field);if(cur.some(f=>f!==''))rows.push(cur);
    return rows;
  }
  function coerce(v){if(v==='')return null;if(v==='true')return true;if(v==='false')return false;const n=Number(v);return isNaN(n)?v:n;}
  document.getElementById('c2j-go').onclick=function(){
    const raw=document.getElementById('c2j-in').value.trim();
    const sep=document.getElementById('c2j-sep').value;
    const out=document.getElementById('c2j-out');
    const rows=parseCSV(raw,sep);
    if(rows.length<2){out.value='Need at least header row + one data row';return;}
    const headers=rows[0];
    const data=rows.slice(1).map(row=>Object.fromEntries(headers.map((h,i)=>[h.trim(),coerce(row[i]||'')])));
    out.value=JSON.stringify(data,null,2);
  };
  document.getElementById('c2j-copy').onclick=function(){navigator.clipboard.writeText(document.getElementById('c2j-out').value);};
})();