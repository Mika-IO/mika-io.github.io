(function(){
  const data=[
    ['😀','grinning face happy smile'],['😂','face joy tears laugh'],['🥰','face hearts smiling love'],['😍','heart eyes love'],['🤔','thinking hmm'],['😎','sunglasses cool'],['🥺','pleading puppy eyes sad'],['😭','crying loud sob'],['😡','angry mad red'],['🤯','mind blown exploding'],
    ['❤️','red heart love'],['🧡','orange heart'],['💛','yellow heart'],['💚','green heart'],['💙','blue heart'],['💜','purple heart'],['🖤','black heart'],['🤍','white heart'],['💔','broken heart'],['❤️‍🔥','heart fire love'],
    ['👋','wave hand hello goodbye'],['👍','thumbs up like good'],['👎','thumbs down dislike'],['🙏','folded hands pray please'],['👏','clapping hands applause'],['🤝','handshake deal agreement'],['💪','flexed bicep strong'],['🤞','crossed fingers luck'],['✌️','victory peace fingers'],['🖕','middle finger'],
    ['🐶','dog puppy animal'],['🐱','cat kitten animal'],['🐭','mouse animal'],['🐹','hamster animal'],['🐰','rabbit bunny animal'],['🦊','fox animal'],['🐻','bear animal'],['🐼','panda animal'],['🐨','koala animal'],['🐯','tiger animal'],
    ['🦁','lion animal'],['🐮','cow animal'],['🐷','pig animal'],['🐸','frog animal'],['🐵','monkey animal'],['🐔','chicken animal'],['🐧','penguin animal'],['🐦','bird animal'],['🦅','eagle bird'],['🦄','unicorn animal magic'],
    ['🍎','apple fruit red'],['🍊','orange fruit'],['🍋','lemon fruit yellow'],['🍇','grapes fruit'],['🍓','strawberry fruit'],['🍒','cherries fruit'],['🍑','peach fruit'],['🥝','kiwi fruit'],['🍕','pizza food'],['🍔','hamburger burger food'],
    ['🌍','earth globe world'],['🌙','moon night crescent'],['⭐','star'],['🌟','star glowing'],['☀️','sun sunny'],['⚡','lightning bolt'],['🔥','fire flame hot'],['💧','droplet water'],['🌊','wave ocean water'],['🌈','rainbow'],
    ['🎉','party popper celebration'],['🎊','confetti celebration'],['🎈','balloon party'],['🎁','gift present'],['🏆','trophy award winner'],['🥇','gold medal first'],['🎯','target bullseye'],['🎮','game controller video'],['🎸','guitar music'],['🎵','music note'],
    ['✈️','airplane flight travel'],['🚀','rocket space launch'],['🚗','car vehicle'],['🏠','house home'],['💻','laptop computer'],['📱','mobile phone'],['📷','camera photo'],['📚','books reading'],['💡','lightbulb idea'],['🔑','key lock'],
    ['💰','money bag rich'],['💳','credit card payment'],['📈','chart increasing graph'],['📉','chart decreasing graph'],['🛒','shopping cart buy'],['🧾','receipt bill'],['💎','diamond gem'],['🏅','medal sport'],['⚽','soccer ball football'],['🏀','basketball sport'],
    ['🤣','rolling floor laughing'],['😄','grinning big smile'],['😅','grin sweat'],['🙃','upside down smile'],['😴','sleeping zzz'],['🤗','hugging face'],['🤫','shushing face quiet'],['😬','grimacing face'],['🥳','partying face celebration'],['😇','angel halo innocent'],
  ];
  const grid=document.getElementById('em-grid');
  function render(list){
    grid.innerHTML=list.map(([e,kw])=>`<button title="${kw.split(' ')[0]}" style="font-size:1.5rem;background:none;border:none;cursor:pointer;padding:4px;border-radius:6px;transition:transform .1s" onmouseenter="this.style.transform='scale(1.3)'" onmouseleave="this.style.transform=''" onclick="navigator.clipboard.writeText('${e}');document.getElementById('em-hint').textContent='${e} copied!'">${e}</button>`).join('');
  }
  render(data);
  document.getElementById('em-search').addEventListener('input',function(){
    const q=this.value.toLowerCase().trim();
    render(q?data.filter(([e,kw])=>kw.includes(q)||e===q):data);
  });
})();