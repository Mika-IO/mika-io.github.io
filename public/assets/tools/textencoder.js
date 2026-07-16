(function(){
  const ops={
    urlenc:function(s){return encodeURIComponent(s);},
    urldec:function(s){return decodeURIComponent(s);},
    htmlenc:function(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');},
    htmldec:function(s){const d=document.createElement('div');d.innerHTML=s;return d.textContent;},
    b64enc:function(s){return btoa(unescape(encodeURIComponent(s)));},
    b64dec:function(s){return decodeURIComponent(escape(atob(s)));}
  };
  document.getElementById('te-go').onclick=function(){
    const mode=document.getElementById('te-mode').value;
    const input=document.getElementById('te-in').value;
    try{document.getElementById('te-out').value=ops[mode](input);}
    catch(e){document.getElementById('te-out').value='Error: '+e.message;}
  };
})();