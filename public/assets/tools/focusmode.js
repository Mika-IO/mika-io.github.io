(function(){
  const KEY='focusmode_text';
  const area=document.getElementById('fm-area');
  area.value=localStorage.getItem(KEY)||'';
  function update(){
    const text=area.value;const words=text.trim()?text.trim().split(/\s+/).length:0;const chars=text.length;
    const target=parseInt(document.getElementById('fm-target').value)||500;
    const pct=Math.min(100,Math.round(words/target*100));
    document.getElementById('fm-count').textContent=words+' words · '+chars+' chars';
    document.getElementById('fm-pct').textContent=pct+'% of '+target+' word target';
    localStorage.setItem(KEY,text);
  }
  area.addEventListener('input',update);update();
  document.getElementById('fm-fs').onclick=function(){
    if(!document.fullscreenElement){area.requestFullscreen&&area.requestFullscreen();this.textContent='Exit Fullscreen';}
    else{document.exitFullscreen&&document.exitFullscreen();this.textContent='Fullscreen';}
  };
})();