(function(){
  'use strict';
  var inp=document.getElementById('cp-color');
  var hexEl=document.getElementById('cp-hex'),rgbEl=document.getElementById('cp-rgb'),hslEl=document.getElementById('cp-hsl');
  var swatch=document.getElementById('cp-swatch');
  var copyBtn=document.getElementById('cp-copy-hex');
  if(!inp)return;
  function hexToRgb(hex){var r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);return{r:r,g:g,b:b};}
  function rgbToHsl(r,g,b){r/=255;g/=255;b/=255;var max=Math.max(r,g,b),min=Math.min(r,g,b),h,s,l=(max+min)/2;if(max===min){h=s=0;}else{var d=max-min;s=l>0.5?d/(2-max-min):d/(max+min);switch(max){case r:h=((g-b)/d+(g<b?6:0))/6;break;case g:h=((b-r)/d+2)/6;break;case b:h=((r-g)/d+4)/6;break;}}return{h:Math.round(h*360),s:Math.round(s*100),l:Math.round(l*100)};}
  function update(){
    var hex=inp.value;
    if(hexEl)hexEl.textContent=hex.toUpperCase();
    var rgb=hexToRgb(hex);
    if(rgbEl)rgbEl.textContent='rgb('+rgb.r+', '+rgb.g+', '+rgb.b+')';
    var hsl=rgbToHsl(rgb.r,rgb.g,rgb.b);
    if(hslEl)hslEl.textContent='hsl('+hsl.h+', '+hsl.s+'%, '+hsl.l+'%)';
    if(swatch)swatch.style.background=hex;
  }
  inp.addEventListener('input',update);
  if(copyBtn)copyBtn.addEventListener('click',function(){var t=hexEl?hexEl.textContent:'';if(t&&navigator.clipboard)navigator.clipboard.writeText(t).then(function(){copyBtn.textContent='Copied!';setTimeout(function(){copyBtn.textContent='Copy HEX';},2000);});});
  update();
})();
