(function(){
  const facts=[
    {cat:'Science',text:'Honey never spoils — archaeologists have found 3,000-year-old honey in Egyptian tombs that was still edible.'},
    {cat:'Science',text:'A day on Venus is longer than a year on Venus — it takes 243 Earth days to rotate once but only 225 Earth days to orbit the Sun.'},
    {cat:'Science',text:'Hot water can freeze faster than cold water under certain conditions — this is called the Mpemba effect.'},
    {cat:'Science',text:'There are more possible iterations of a game of chess than there are atoms in the observable universe.'},
    {cat:'Science',text:'Octopuses have three hearts, blue blood, and nine brains (one central and one in each tentacle).'},
    {cat:'Science',text:'The human nose can detect over 1 trillion different smells.'},
    {cat:'Science',text:'A single bolt of lightning contains enough energy to toast 100,000 slices of bread.'},
    {cat:'Science',text:'The mantis shrimp can punch with the force of a bullet and see 16 types of color receptors (humans have 3).'},
    {cat:'Math',text:'There are more ways to arrange a deck of 52 cards than there have been seconds since the Big Bang.'},
    {cat:'Math',text:'If you shuffle a deck of cards properly, the order you get has almost certainly never existed before in history.'},
    {cat:'Math',text:'0.999... (repeating) is mathematically exactly equal to 1.'},
    {cat:'Math',text:'The sum of all natural numbers (1+2+3+…) is, in a specific mathematical sense, equal to −1/12.'},
    {cat:'Math',text:'A googol (10^100) is larger than the number of atoms in the observable universe (~10^80).'},
    {cat:'History',text:'Cleopatra lived closer in time to the Moon landing than to the construction of the Great Pyramid.'},
    {cat:'History',text:'Oxford University is older than the Aztec Empire. Teaching began at Oxford around 1096; the Aztec Empire was founded in 1428.'},
    {cat:'History',text:'The fax machine was invented (1843) before the telephone (1876).'},
    {cat:'History',text:'Nintendo was founded in 1889 — as a playing card company — long before video games existed.'},
    {cat:'History',text:'The last time all of humanity was on Earth was May 25, 1973, before Skylab carried astronauts to space.'},
    {cat:'Nature',text:'There are more trees on Earth than stars in the Milky Way galaxy — about 3 trillion trees vs 400 billion stars.'},
    {cat:'Nature',text:'A group of flamingos is called a flamboyance. A group of crows is called a murder.'},
    {cat:'Nature',text:'Bananas are technically berries; strawberries are not. Neither are raspberries.'},
    {cat:'Nature',text:'Tardigrades (water bears) can survive in outer space, extreme radiation, and can live for 30 years without food or water.'},
    {cat:'Nature',text:'Sharks are older than trees. Sharks have existed for ~450 million years; trees first appeared ~350 million years ago.'},
    {cat:'Space',text:'One teaspoon of a neutron star would weigh about 10 million tons.'},
    {cat:'Space',text:'The footprints left on the Moon by Apollo astronauts will last for millions of years — there is no wind or rain to erode them.'},
    {cat:'Space',text:'Light from the Sun takes 8 minutes and 20 seconds to reach Earth, but takes 100,000 years to travel from the Sun\'s core to its surface.'},
    {cat:'Space',text:'If the Sun were the size of a white blood cell, the Milky Way galaxy would be the size of the continental USA.'},
    {cat:'Tech',text:'The first computer bug was a literal bug — an actual moth was found trapped in a relay of the Harvard Mark II computer in 1947.'},
    {cat:'Tech',text:'The average smartphone in 2024 has more computing power than all of NASA had when they sent men to the Moon in 1969.'},
    {cat:'Tech',text:'The first website went live on August 6, 1991. It explained what the World Wide Web was and how to use it.'},
    {cat:'Tech',text:'Wi-Fi was partly invented in Australia after a failed experiment to detect mini black holes resulted in radio signal-cleaning algorithms.'},
    {cat:'Human',text:'Your body replaces all of its cells approximately every 7–10 years — though neurons and some other cells last much longer.'},
    {cat:'Human',text:'The human brain uses about 20% of the body's total energy despite being only 2% of body weight.'},
    {cat:'Human',text:'Humans are the only animals that blush.'},
    {cat:'Human',text:'Your stomach gets a new lining every 3–4 days to prevent it from digesting itself.'},
  ];
  const cats=[...new Set(facts.map(f=>f.cat))];
  let activeCat=null;
  const catDiv=document.getElementById('rf-cats');
  catDiv.innerHTML=cats.map(c=>`<button style="padding:4px 12px;border:1px solid var(--line);border-radius:20px;background:var(--surface);color:var(--text);cursor:pointer;font-size:0.8rem" data-cat="${c}">${c}</button>`).join('');
  catDiv.querySelectorAll('button').forEach(btn=>{
    btn.addEventListener('click',function(){
      if(activeCat===this.dataset.cat){activeCat=null;catDiv.querySelectorAll('button').forEach(b=>b.style.background='var(--surface)');}
      else{activeCat=this.dataset.cat;catDiv.querySelectorAll('button').forEach(b=>b.style.background=b.dataset.cat===activeCat?'var(--accent,#6366f1)':'var(--surface)');catDiv.querySelectorAll('button').forEach(b=>{if(b.dataset.cat===activeCat)b.style.color='#fff';else b.style.color='var(--text)';})}
    });
  });
  document.getElementById('rf-btn').addEventListener('click',function(){
    const pool=activeCat?facts.filter(f=>f.cat===activeCat):facts;
    const f=pool[Math.floor(Math.random()*pool.length)];
    const el=document.getElementById('rf-fact');
    el.style.opacity='0';
    setTimeout(()=>{el.innerHTML=`<div><span style="font-size:0.75rem;opacity:0.5;text-transform:uppercase;letter-spacing:0.1em">${f.cat}</span><br>${f.text}</div>`;el.style.opacity='1';el.style.transition='opacity 0.3s';},150);
  });
})();