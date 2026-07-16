/* Morse code translator */
(function () {
  'use strict';
  var CODE={A:'.-',B:'-...',C:'-.-.',D:'-..',E:'.',F:'..-.',G:'--.',H:'....',I:'..',J:'.---',K:'-.-',L:'.-..',M:'--',N:'-.',O:'---',P:'.--.',Q:'--.-',R:'.-.',S:'...',T:'-',U:'..-',V:'...-',W:'.--',X:'-..-',Y:'-.--',Z:'--..',1:'.----',2:'..---',3:'...--',4:'....-',5:'.....',6:'-....',7:'--...',8:'---..',9:'----.',0:'-----'};
  var DECODE={};
  Object.keys(CODE).forEach(function(k){DECODE[CODE[k]]=k;});
  var inEl=document.getElementById('morse-in');
  var outEl=document.getElementById('morse-out');
  var decIn=document.getElementById('morse-decode-in');
  var decOut=document.getElementById('morse-decoded');
  var playBtn=document.getElementById('morse-play');
  function encode(t){
    return t.toUpperCase().split('').map(function(c){
      if(c===' ')return '/';
      return CODE[c]||'';
    }).filter(function(c,i,a){return c!==''||a[i-1]!=='';}).join(' ');
  }
  function decode(m){
    return m.split(/\s*\/\s*|\s{3,}/).map(function(word){
      return word.trim().split(/s+/).map(function(sym){return DECODE[sym]||'?';}).join('');
    }).join(' ');
  }
  if(inEl) inEl.addEventListener('input',function(){if(outEl)outEl.textContent=encode(inEl.value)||'—';});
  if(decIn) decIn.addEventListener('input',function(){if(decOut)decOut.textContent=decode(decIn.value)||'—';});
  if(playBtn&&inEl) playBtn.addEventListener('click',function(){
    var morse=encode(inEl.value);
    try{
      var ctx=new(window.AudioContext||window.webkitAudioContext)();
      var unit=0.08;
      var t=ctx.currentTime+0.1;
      morse.split('').forEach(function(c){
        if(c==='.'){var o=ctx.createOscillator();var g=ctx.createGain();o.connect(g);g.connect(ctx.destination);o.frequency.value=700;g.gain.setValueAtTime(0.3,t);o.start(t);o.stop(t+unit);t+=unit*2;}
        else if(c==='-'){var o=ctx.createOscillator();var g=ctx.createGain();o.connect(g);g.connect(ctx.destination);o.frequency.value=700;g.gain.setValueAtTime(0.3,t);o.start(t);o.stop(t+unit*3);t+=unit*4;}
        else if(c===' '){t+=unit*2;}
        else if(c==='/'){t+=unit*4;}
      });
    }catch(e){}
  });
})();
