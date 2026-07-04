(function(){
  'use strict';
  var inp=document.getElementById('b64-in'),out=document.getElementById('b64-out');
  var err=document.getElementById('b64-err');
  document.getElementById('b64-enc').addEventListener('click',function(){
    try{out.textContent=btoa(unescape(encodeURIComponent(inp.value)));err.textContent='';}catch(e){err.textContent='Encode error: '+e.message;out.textContent='';}
  });
  document.getElementById('b64-dec').addEventListener('click',function(){
    try{out.textContent=decodeURIComponent(escape(atob(inp.value.trim())));err.textContent='';}catch(e){err.textContent='Invalid Base64: '+e.message;out.textContent='';}
  });
  document.getElementById('b64-copy').addEventListener('click',function(){
    if(out.textContent&&navigator.clipboard)navigator.clipboard.writeText(out.textContent);
  });
})();
