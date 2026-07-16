(function(){
  function beautifyHtml(html,indentStr){
    const INDENT=indentStr;
    const voidTags=new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);
    let formatted='';let depth=0;
    const tokens=html.replace(/></g,'>\n<').split('\n');
    tokens.forEach(token=>{
      token=token.trim();if(!token)return;
      const isClose=/^<\/[^>]+>/.test(token);
      const isVoid=new RegExp('^<('+[...voidTags].join('|')+')[^>]*>$','i').test(token);
      const isSelfClose=/\/>$/.test(token);
      if(isClose&&!isVoid)depth=Math.max(0,depth-1);
      formatted+=INDENT.repeat(depth)+token+'\n';
      if(!isClose&&!isVoid&&!isSelfClose&&/^<[^!/?]/.test(token))depth++;
    });
    return formatted.trim();
  }
  document.getElementById('hb-go').onclick=function(){
    const html=document.getElementById('hb-in').value;
    const indentSel=document.getElementById('hb-indent').value;
    const indentStr=indentSel==='tab'?'\t':' '.repeat(parseInt(indentSel));
    document.getElementById('hb-out').value=beautifyHtml(html,indentStr);
  };
  document.getElementById('hb-copy').onclick=function(){navigator.clipboard.writeText(document.getElementById('hb-out').value);};
})();