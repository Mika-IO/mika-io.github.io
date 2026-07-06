/* QR code generator using qrcode.js CDN */
(function () {
  'use strict';
  var txt=document.getElementById('qr-text');
  var sizeSel=document.getElementById('qr-size');
  var outEl=document.getElementById('qr-out');
  if(!txt||!outEl) return;
  function generate(){
    var v=txt.value.trim();
    var sz=sizeSel?parseInt(sizeSel.value,10):300;
    outEl.innerHTML='';
    if(!v) return;
    // Use Google Charts API as a simple fallback (no external JS needed)
    var url='https://chart.googleapis.com/chart?chs='+sz+'x'+sz+'&cht=qr&chl='+encodeURIComponent(v)+'&choe=UTF-8';
    var img=document.createElement('img');
    img.src=url; img.alt='QR Code'; img.style.borderRadius='0.5rem';
    img.style.cursor='pointer'; img.title='Click to download';
    img.addEventListener('click',function(){
      var a=document.createElement('a');a.href=url;a.download='qrcode.png';a.click();
    });
    outEl.appendChild(img);
    var note=document.createElement('p');
    note.style.fontSize='0.8rem';note.style.opacity='0.6';note.style.margin='0.25rem 0 0';
    note.textContent='Click image to download PNG';
    outEl.appendChild(note);
  }
  txt.addEventListener('input',generate);
  if(sizeSel)sizeSel.addEventListener('change',generate);
  generate();
})();
