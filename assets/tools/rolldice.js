/* Dice roller */
(function () {
  'use strict';
  var countIn=document.getElementById('dice-count');
  var btn=document.getElementById('dice-roll');
  var res=document.getElementById('dice-result');
  var det=document.getElementById('dice-detail');
  var sides=6;
  document.querySelectorAll('.dice-btn').forEach(function(b){
    b.addEventListener('click',function(){
      sides=parseInt(b.dataset.sides,10);
      document.querySelectorAll('.dice-btn').forEach(function(x){x.classList.remove('active');});
      b.classList.add('active');
    });
  });
  if(btn) btn.addEventListener('click',function(){
    var n=Math.max(1,Math.min(20,parseInt(countIn?countIn.value:1,10)||1));
    var rolls=[]; for(var i=0;i<n;i++) rolls.push(Math.floor(Math.random()*sides)+1);
    var total=rolls.reduce(function(s,x){return s+x;},0);
    if(res) res.textContent=total;
    if(det) det.textContent=n>1?'Rolls: '+rolls.join(', ')+' (total: '+total+')':'d'+sides+' = '+total;
  });
})();
