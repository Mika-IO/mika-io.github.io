(function(){
  'use strict';
  function syllables(word){
    word=word.toLowerCase().replace(/[^a-z]/g,'');
    if(!word)return 0;
    word=word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/,'');
    word=word.replace(/^y/,'');
    var m=word.match(/[aeiouy]{1,2}/g);
    return m?m.length:1;
  }
  var ta=document.getElementById('syl-text');
  var sc=document.getElementById('syl-count');
  var sw=document.getElementById('syl-words');
  if(!ta)return;
  function calc(){
    var words=(ta.value.trim().match(/[a-zA-Z']+/g)||[]);
    var total=words.reduce(function(s,w){return s+syllables(w);},0);
    if(sc)sc.textContent=total;
    if(sw)sw.textContent=words.length;
  }
  ta.addEventListener('input',calc);calc();
})();
