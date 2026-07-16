(function(){
  document.getElementById('tb-enc').onclick=function(){
    const text=document.getElementById('tb-in').value;
    document.getElementById('tb-out').value=[...text].map(c=>c.charCodeAt(0).toString(2).padStart(8,'0')).join(' ');
  };
  document.getElementById('tb-dec').onclick=function(){
    const bin=document.getElementById('tb-in').value.trim().replace(/[^01 ]/g,'');
    try{document.getElementById('tb-out').value=bin.split(' ').filter(b=>b.length===8).map(b=>String.fromCharCode(parseInt(b,2))).join('');}
    catch(e){document.getElementById('tb-out').value='Invalid binary';}
  };
})();