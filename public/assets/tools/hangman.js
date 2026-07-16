(function(){
  const stages=['  +---+\n  |   |\n      |\n      |\n      |\n      |\n=========','  +---+\n  |   |\n  O   |\n      |\n      |\n      |\n=========','  +---+\n  |   |\n  O   |\n  |   |\n      |\n      |\n=========','  +---+\n  |   |\n  O   |\n /|   |\n      |\n      |\n=========','  +---+\n  |   |\n  O   |\n /|\\  |\n      |\n      |\n=========','  +---+\n  |   |\n  O   |\n /|\\  |\n /    |\n      |\n=========','  +---+\n  |   |\n  O   |\n /|\\  |\n / \\  |\n      |\n========='];
  const words=['castle','jungle','rocket','bridge','planet','feather','kitchen','dolphin','crystal','thunder','mustard','blanket','sunrise','pilgrim','lantern','wombat','glacier','phantom','lobster','spinach','quantum','ancient','triumph','emperor','horizon','balance','chapter','century','desktop','eastern','fiction','harvest','monarch','pattern','quarter','silence','stadium','subject','village','volcano'];
  let word,guessed,wrong;
  function newGame(){word=words[Math.floor(Math.random()*words.length)];guessed=[];wrong=0;render();}
  function render(){
    document.getElementById('hm-drawing').textContent=stages[wrong];
    document.getElementById('hm-word').textContent=[...word].map(c=>guessed.includes(c)?c:'_').join(' ');
    const bad=guessed.filter(g=>!word.includes(g));
    document.getElementById('hm-used').textContent=bad.length?'Wrong: '+bad.join(', '):'';
    const won=[...word].every(c=>guessed.includes(c));
    const lost=wrong>=6;
    const msg=document.getElementById('hm-msg');
    if(won){msg.innerHTML='<span style="color:var(--green,#22c55e)">🎉 You won!</span>';}
    else if(lost){msg.innerHTML='<span style="color:var(--red,#ef4444)">💀 Game over! Word: '+word+'</span>';}
    else msg.textContent='';
    const keys=document.getElementById('hm-keys');
    keys.innerHTML='abcdefghijklmnopqrstuvwxyz'.split('').map(c=>`<button style="width:32px;height:32px;background:${guessed.includes(c)?(word.includes(c)?'rgba(34,197,94,0.3)':'rgba(239,68,68,0.3)'):'var(--surface)'};border:1px solid var(--line);border-radius:6px;cursor:pointer;${(won||lost)?'opacity:0.5':''};${guessed.includes(c)?'opacity:0.6':''}" ${guessed.includes(c)||won||lost?'disabled':''}>${c}</button>`).join('');
    keys.querySelectorAll('button').forEach(btn=>{btn.onclick=function(){const c=this.textContent;guessed.push(c);if(!word.includes(c))wrong++;render();};});
  }
  document.getElementById('hm-new').onclick=newGame;
  newGame();
})();