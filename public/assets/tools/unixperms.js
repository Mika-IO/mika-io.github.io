(function(){
  function calc(){
    const perms={o:0,g:0,w:0};
    document.querySelectorAll('.up-cb').forEach(function(cb){if(cb.checked)perms[cb.dataset.who]+=parseInt(cb.dataset.bit);});
    const octal=perms.o*100+perms.g*10+perms.w;
    function sym(who){return((who&4)?'r':'-')+((who&2)?'w':'-')+((who&1)?'x':'-');}
    const str=sym(perms.o)+sym(perms.g)+sym(perms.w);
    document.getElementById('up-octal').textContent=octal.toString().padStart(3,'0');
    document.getElementById('up-sym').textContent=str;
    document.getElementById('up-cmd').textContent='chmod '+octal.toString().padStart(3,'0')+' filename';
  }
  document.querySelectorAll('.up-cb').forEach(function(cb){cb.addEventListener('change',calc);});calc();
})();