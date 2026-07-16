(function(){
  document.getElementById('url-enc').onclick=function(){
    try{document.getElementById('url-out').value=encodeURIComponent(document.getElementById('url-in').value);}
    catch(e){document.getElementById('url-out').value='Encoding error';}
  };
  document.getElementById('url-dec').onclick=function(){
    try{document.getElementById('url-out').value=decodeURIComponent(document.getElementById('url-in').value);}
    catch(e){document.getElementById('url-out').value='Decoding error — invalid percent-encoding';}
  };
})();