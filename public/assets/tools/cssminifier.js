(function(){
  document.getElementById('cssm-min').onclick=function(){
    const raw=document.getElementById('cssm-in').value;
    if(!raw.trim())return;
    const min=raw
      .replace(/\/\*[\s\S]*?\*\//g,'')
      .replace(/\s*([{}:;,>~+])\s*/g,'$1')
      .replace(/;\}/g,'}')
      .replace(/\s+/g,' ')
      .trim();
    document.getElementById('cssm-out').value=min;
    const saved=raw.length-min.length;
    const pct=((saved/raw.length)*100).toFixed(1);
    document.getElementById('cssm-stats').textContent=`Original: ${raw.length} chars → Minified: ${min.length} chars (saved ${saved} chars, ${pct}%)`;
  };
  document.getElementById('cssm-copy').onclick=function(){
    const v=document.getElementById('cssm-out').value;
    if(v)navigator.clipboard.writeText(v);
  };
})();