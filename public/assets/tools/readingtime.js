/* Reading time calculator */
(function () {
  'use strict';
  var txt=document.getElementById('rt-text');
  var wordsEl=document.getElementById('rt-words');
  var timeEl=document.getElementById('rt-time');
  var speakEl=document.getElementById('rt-speak');
  if(!txt) return;
  var READ_WPM=238, SPEAK_WPM=150;
  function calc(){
    var words=(txt.value.trim().match(/S+/g)||[]).length;
    var rMin=words/READ_WPM, sMin=words/SPEAK_WPM;
    if(wordsEl) wordsEl.textContent=words.toLocaleString(window.__LANG||undefined);
    if(timeEl) timeEl.textContent=rMin<1?Math.ceil(rMin*60)+'s':rMin.toFixed(1)+' min';
    if(speakEl) speakEl.textContent=sMin<1?Math.ceil(sMin*60)+'s':sMin.toFixed(1)+' min';
  }
  txt.addEventListener('input',calc);
  calc();
})();
