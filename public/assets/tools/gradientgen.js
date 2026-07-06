(function(){
  'use strict';
  var c1=document.getElementById('grad-c1'),c2=document.getElementById('grad-c2');
  var type=document.getElementById('grad-type'),angle=document.getElementById('grad-angle');
  var preview=document.getElementById('grad-preview'),cssEl=document.getElementById('grad-css');
  var copyBtn=document.getElementById('grad-copy');
  if(!c1)return;
  function update(){
    var col1=c1.value,col2=c2.value,t=type.value,a=angle.value;
    var css=t==='radial'?'radial-gradient(circle, '+col1+', '+col2+')':'linear-gradient('+a+'deg, '+col1+', '+col2+')';
    if(preview)preview.style.background=css;
    if(cssEl)cssEl.textContent='background: '+css+';';
  }
  [c1,c2,type,angle].forEach(function(el){if(el){el.addEventListener('input',update);el.addEventListener('change',update);}});
  if(copyBtn)copyBtn.addEventListener('click',function(){var t=cssEl?cssEl.textContent:'';if(t&&navigator.clipboard)navigator.clipboard.writeText(t).then(function(){copyBtn.textContent='Copied!';setTimeout(function(){copyBtn.textContent='Copy CSS';},2000);});});
  update();
})();
