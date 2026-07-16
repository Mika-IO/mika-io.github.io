(function(){
  let secret,tries,max;
  document.getElementById('ng-start').onclick=function(){
    max=parseInt(document.getElementById('ng-max').value)||100;
    secret=Math.floor(Math.random()*max)+1;tries=0;
    document.getElementById('ng-setup').style.display='none';
    document.getElementById('ng-game').style.display='';
    document.getElementById('ng-hint').textContent='Guess a number between 1 and '+max;
    document.getElementById('ng-msg').textContent='';document.getElementById('ng-tries').textContent='';
    document.getElementById('ng-in').max=max;document.getElementById('ng-in').value='';document.getElementById('ng-in').focus();
  };
  function check(){
    const g=parseInt(document.getElementById('ng-in').value);
    if(!g||g<1||g>max)return;
    tries++;
    const msg=document.getElementById('ng-msg');const tryEl=document.getElementById('ng-tries');
    if(g===secret){msg.innerHTML='<strong style="color:var(--green,#22c55e)">🎉 Correct! It was '+secret+'</strong>';tryEl.textContent='You got it in '+tries+' guess'+(tries!==1?'es':'')+'!';document.getElementById('ng-in').disabled=true;document.getElementById('ng-go').textContent='Play again';document.getElementById('ng-go').onclick=restart;}
    else if(g<secret){msg.textContent='📈 Higher!';tryEl.textContent=tries+' guess'+(tries!==1?'es':'');}
    else{msg.textContent='📉 Lower!';tryEl.textContent=tries+' guess'+(tries!==1?'es':'');}
    document.getElementById('ng-in').value='';document.getElementById('ng-in').focus();
  }
  function restart(){document.getElementById('ng-in').disabled=false;document.getElementById('ng-go').onclick=check;document.getElementById('ng-setup').style.display='';document.getElementById('ng-game').style.display='none';}
  document.getElementById('ng-go').onclick=check;
  document.getElementById('ng-in').addEventListener('keydown',e=>{if(e.key==='Enter')check();});
})();