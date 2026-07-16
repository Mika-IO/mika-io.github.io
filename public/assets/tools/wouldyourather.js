(function(){
  const q=[
    {a:'Fly like a bird',b:'Breathe underwater',pa:62},
    {a:'Always be 10 minutes late',b:'Always be 20 minutes early',pa:44},
    {a:'Have unlimited money but no friends',b:'Have great friends but no money',pa:28},
    {a:'Live in the mountains',b:'Live by the beach',pa:53},
    {a:'Be able to speak every language',b:'Be able to play every instrument',pa:67},
    {a:'Never need sleep',b:'Never need food',pa:71},
    {a:'Have a dog-sized elephant',b:'Have an elephant-sized dog',pa:58},
    {a:'Know when you will die',b:'Know how you will die',pa:45},
    {a:'Be famous but miserable',b:'Be unknown but happy',pa:18},
    {a:'Eat only sweet food forever',b:'Eat only salty food forever',pa:55},
    {a:'Have the ability to time travel',b:'Have the ability to teleport',pa:41},
    {a:'Never use the internet again',b:'Never watch TV again',pa:29},
    {a:'Always be slightly cold',b:'Always be slightly hot',pa:39},
    {a:'Be invisible',b:'Be able to read minds',pa:47},
    {a:'Have a photographic memory',b:'Increase your IQ by 30 points',pa:54},
    {a:'Live in the city',b:'Live in the countryside',pa:48},
    {a:'Be the funniest person in the room',b:'Be the smartest person in the room',pa:43},
    {a:'Only eat pizza for a year',b:'Never eat pizza again',pa:72},
    {a:'Always have to sing instead of speak',b:'Always have to dance instead of walk',pa:38},
    {a:'Know all the secrets of the universe',b:'Have unlimited power',pa:61},
    {a:'Meet your ancestors',b:'Meet your great-grandchildren',pa:55},
    {a:'Live without music',b:'Live without movies',pa:32},
    {a:'Have a rewind button for life',b:'Have a pause button for life',pa:64},
    {a:'Be stranded on an island with friends',b:'Be comfortable at home alone',pa:57},
    {a:'Have hair that changes color with your mood',b:'Have eyes that change color with your mood',pa:49},
    {a:'Always know the right thing to say',b:'Never say the wrong thing',pa:53},
    {a:'Explore outer space',b:'Explore the deep ocean',pa:60},
    {a:'Give up social media for a year',b:'Give up coffee for a year',pa:44},
    {a:'Be a superhero with a secret identity',b:'Be a superhero with a famous identity',pa:51},
    {a:'Travel back in time once',b:'Travel forward in time once',pa:42},
  ];
  let idx=0,answered=false;const order=[...Array(q.length).keys()].sort(()=>Math.random()-0.5);
  function show(){
    const item=q[order[idx%q.length]];answered=false;
    const c=document.getElementById('wyr-choices');
    c.innerHTML=[{txt:item.a,pct:item.pa},{txt:item.b,pct:100-item.pa}].map((o,i)=>`<button id="wyr-opt${i}" style="padding:1rem;background:var(--surface);border:2px solid var(--line);border-radius:16px;cursor:pointer;color:var(--text);font-size:0.95rem;font-weight:600;transition:all 0.2s">${o.txt}</button>`).join('');
    [0,1].forEach(i=>{
      document.getElementById('wyr-opt'+i).onclick=function(){
        if(answered)return;answered=true;
        const pcts=[item.pa,100-item.pa];
        [0,1].forEach(j=>{
          const btn=document.getElementById('wyr-opt'+j);
          btn.style.background=j===i?'var(--accent,#6366f1)':'var(--surface)';
          btn.style.color=j===i?'#fff':'var(--text)';
          btn.insertAdjacentHTML('beforeend','<div style="margin-top:0.4rem;font-size:0.85rem;opacity:0.8">'+pcts[j]+'%</div>');
        });
      };
    });
  }
  document.getElementById('wyr-next').onclick=()=>{idx++;show();};
  show();
})();