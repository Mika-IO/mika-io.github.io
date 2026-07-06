(function(){
  'use strict';
  var inp=document.getElementById('alph-input');
  var btn=document.getElementById('alph-btn');
  var out=document.getElementById('alph-out');
  var copy=document.getElementById('alph-copy');
  function getMode(){
    var r=document.querySelector('input[name="alph-mode"]:checked');
    return r?r.value:'az';
  }
  function lastWord(s){
    var p=s.trim().split(/\s+/);
    return p[p.length-1].toLowerCase();
  }
  function doSort(){
    if(!inp||!out)return;
    var lines=inp.value.split('\n').map(function(l){return l.trimEnd();}).filter(function(l){return l!=='';});
    var mode=getMode();
    if(mode==='dedup'){
      var seen={};
      lines=lines.filter(function(l){
        var k=l.toLowerCase();
        if(seen[k])return false;
        seen[k]=true;
        return true;
      });
    } else if(mode==='az'){
      lines.sort(function(a,b){return a.toLowerCase().localeCompare(b.toLowerCase());});
    } else if(mode==='za'){
      lines.sort(function(a,b){return b.toLowerCase().localeCompare(a.toLowerCase());});
    } else if(mode==='last'){
      lines.sort(function(a,b){return lastWord(a).localeCompare(lastWord(b));});
    }
    out.textContent=lines.join('\n');
  }
  if(btn)btn.addEventListener('click',doSort);
  if(copy)copy.addEventListener('click',function(){
    if(out&&out.textContent&&navigator.clipboard)navigator.clipboard.writeText(out.textContent);
  });
})();
