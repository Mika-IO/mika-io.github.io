(function(){
  const words=['apple','bridge','candle','danger','empire','forest','garden','hollow','island','jungle','kernel','locket','mango','napkin','orange','pillow','rabbit','silver','tangle','urgent','valley','walnut','yellow','zipper','branch','castle','dragon','finger','glider','hammer','insect','jigsaw','kitten','lemon','mirror','needle','oyster','pepper','quartz','riddle','saddle','turtle','violin','winter','yogurt','zebra','anchor','butter','cactus','dollar','engine','falcon','giraffe','harbor','iceberg','jasmine','kettle','lantern','magnet','noodle','octopus','parrot','radish','salmon','thistle','umbrella','velvet','walrus','xylophone','yonder','zephyr'];
  let current='',revealed=0,score=0,total=0;
  function scramble(w){let a=[...w];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a.join('');}
  function newWord(){current=words[Math.floor(Math.random()*words.length)];let sc=scramble(current);while(sc===current)sc=scramble(current);revealed=0;document.getElementById('ws-word').textContent=sc.toUpperCase();document.getElementById('ws-msg').textContent='';document.getElementById('ws-in').value='';document.getElementById('ws-in').focus();}
  function check(){const g=document.getElementById('ws-in').value.trim().toLowerCase();const msg=document.getElementById('ws-msg');if(g===current){score++;total++;msg.innerHTML='<strong style="color:var(--green,#22c55e)">✅ Correct! It was "'+current+'"</strong>';document.getElementById('ws-score').textContent='Score: '+score+'/'+total;setTimeout(newWord,1200);}else{msg.innerHTML='<span style="color:var(--red,#ef4444)">❌ Try again!</span>';total++;document.getElementById('ws-score').textContent='Score: '+score+'/'+total;}}
  document.getElementById('ws-submit').onclick=check;
  document.getElementById('ws-in').addEventListener('keydown',e=>{if(e.key==='Enter')check();});
  document.getElementById('ws-hint').onclick=function(){revealed=Math.min(revealed+1,current.length-1);const partial=current.split('').map((c,i)=>i<revealed?c:'_').join(' ');document.getElementById('ws-msg').textContent='Hint: '+partial;};
  document.getElementById('ws-skip').onclick=function(){total++;document.getElementById('ws-score').textContent='Score: '+score+'/'+total;newWord();};
  document.getElementById('ws-new').onclick=newWord;
  newWord();
})();