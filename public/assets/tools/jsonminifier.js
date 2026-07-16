(function(){
  function proc(indent){
    const raw=document.getElementById('jm-in').value.trim();
    if(!raw)return;
    try{
      const parsed=JSON.parse(raw);
      const out=JSON.stringify(parsed,null,indent);
      document.getElementById('jm-out').value=out;
      document.getElementById('jm-stats').textContent=`Original: ${raw.length} chars → Output: ${out.length} chars`;
    }catch(e){document.getElementById('jm-out').value='Invalid JSON: '+e.message;document.getElementById('jm-stats').textContent='';}
  }
  document.getElementById('jm-min').onclick=()=>proc(undefined);
  document.getElementById('jm-fmt').onclick=()=>proc(2);
  document.getElementById('jm-copy').onclick=function(){const v=document.getElementById('jm-out').value;if(v)navigator.clipboard.writeText(v);};
})();