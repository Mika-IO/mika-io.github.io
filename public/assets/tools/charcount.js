(function(){
  'use strict';
  var ta=document.getElementById('cc2-text');
  if(!ta)return;
  function g(id){return document.getElementById(id);}
  function calc(){
    var t=ta.value;
    var chars=t.length;
    var nosp=t.replace(/\s/g,'').length;
    var words=t.trim().length?t.trim().split(/\s+/).length:0;
    var lines=t.length?t.split('\n').length:0;
    var sents=(t.match(/[.!?]+(?=\s|$)/g)||[]).length;
    var paras=t.trim().length?(t.trim().split(/\n\s*\n/).length):0;
    if(g('cc2-chars'))g('cc2-chars').textContent=chars;
    if(g('cc2-nosp'))g('cc2-nosp').textContent=nosp;
    if(g('cc2-words'))g('cc2-words').textContent=words;
    if(g('cc2-lines'))g('cc2-lines').textContent=lines;
    if(g('cc2-sents'))g('cc2-sents').textContent=sents;
    if(g('cc2-paras'))g('cc2-paras').textContent=paras;
  }
  ta.addEventListener('input',calc);calc();
})();
