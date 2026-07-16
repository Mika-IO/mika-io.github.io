(function(){
  document.getElementById('html-enc').onclick=function(){
    const t=document.getElementById('html-in').value;
    document.getElementById('html-out').value=t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  };
  document.getElementById('html-dec').onclick=function(){
    const t=document.getElementById('html-in').value;
    const d=document.createElement('div');d.innerHTML=t;
    document.getElementById('html-out').value=d.textContent||d.innerText||'';
  };
})();