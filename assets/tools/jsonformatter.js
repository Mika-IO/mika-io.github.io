(function(){
  'use strict';
  var inp=document.getElementById('jf-in'),out=document.getElementById('jf-out');
  var err=document.getElementById('jf-err');
  function parse(){try{return{ok:true,val:JSON.parse(inp.value)};}catch(e){return{ok:false,msg:e.message};}}
  document.getElementById('jf-fmt').addEventListener('click',function(){
    var r=parse();if(!r.ok){err.textContent=r.msg;out.textContent='';return;}err.textContent='';out.textContent=JSON.stringify(r.val,null,2);
  });
  document.getElementById('jf-min').addEventListener('click',function(){
    var r=parse();if(!r.ok){err.textContent=r.msg;out.textContent='';return;}err.textContent='';out.textContent=JSON.stringify(r.val);
  });
  document.getElementById('jf-copy').addEventListener('click',function(){
    var t=out.textContent;if(t&&navigator.clipboard)navigator.clipboard.writeText(t);
  });
})();
