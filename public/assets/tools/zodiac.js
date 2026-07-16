(function(){
  const western=[
    {name:'Capricorn',emoji:'♑',dates:'Dec 22 – Jan 19',traits:'Ambitious, disciplined, practical, patient'},
    {name:'Aquarius',emoji:'♒',dates:'Jan 20 – Feb 18',traits:'Independent, original, humanitarian, intellectual'},
    {name:'Pisces',emoji:'♓',dates:'Feb 19 – Mar 20',traits:'Compassionate, artistic, intuitive, gentle'},
    {name:'Aries',emoji:'♈',dates:'Mar 21 – Apr 19',traits:'Courageous, energetic, enthusiastic, impulsive'},
    {name:'Taurus',emoji:'♉',dates:'Apr 20 – May 20',traits:'Reliable, patient, practical, devoted'},
    {name:'Gemini',emoji:'♊',dates:'May 21 – Jun 20',traits:'Adaptable, outgoing, curious, inconsistent'},
    {name:'Cancer',emoji:'♋',dates:'Jun 21 – Jul 22',traits:'Tenacious, loyal, emotional, imaginative'},
    {name:'Leo',emoji:'♌',dates:'Jul 23 – Aug 22',traits:'Creative, passionate, generous, dramatic'},
    {name:'Virgo',emoji:'♍',dates:'Aug 23 – Sep 22',traits:'Analytical, hardworking, kind, critical'},
    {name:'Libra',emoji:'♎',dates:'Sep 23 – Oct 22',traits:'Cooperative, diplomatic, gracious, fair-minded'},
    {name:'Scorpio',emoji:'♏',dates:'Oct 23 – Nov 21',traits:'Resourceful, brave, passionate, stubborn'},
    {name:'Sagittarius',emoji:'♐',dates:'Nov 22 – Dec 21',traits:'Generous, idealistic, great sense of humor'},
  ];
  const chinese=['Rat','Ox','Tiger','Rabbit','Dragon','Snake','Horse','Goat','Monkey','Rooster','Dog','Pig'];
  const cTraits={Rat:'Intelligent, adaptable, quick-witted',Ox:'Diligent, dependable, strong',Tiger:'Brave, confident, competitive',Rabbit:'Quiet, elegant, kind',Dragon:'Confident, intelligent, enthusiastic',Snake:'Enigmatic, intelligent, wise',Horse:'Animated, active, energetic',Goat:'Calm, gentle, sympathetic',Monkey:'Sharp, smart, curious',Rooster:'Observant, hardworking, courageous',Dog:'Loyal, honest, kind',Pig:'Compassionate, generous, diligent'};
  function getWestern(m,d){
    const md=m*100+d;
    if(md>=1222||md<=119)return western[0];if(md<=218)return western[1];if(md<=320)return western[2];if(md<=419)return western[3];if(md<=520)return western[4];if(md<=620)return western[5];if(md<=722)return western[6];if(md<=822)return western[7];if(md<=922)return western[8];if(md<=1022)return western[9];if(md<=1121)return western[10];return western[11];
  }
  document.getElementById('zod-form').addEventListener('submit',function(e){
    e.preventDefault();
    const d=new Date(document.getElementById('zod-date').value);
    if(isNaN(d.getTime()))return;
    const m=d.getMonth()+1,day=d.getDate(),y=d.getFullYear();
    const w=getWestern(m,day);
    const cIdx=(y-1900)%12;const cAnimal=chinese[(cIdx+12)%12];
    const out=document.getElementById('zod-out');
    out.hidden=false;
    out.innerHTML=`<div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem"><div style="padding:1rem;background:var(--surface);border:1px solid var(--line);border-radius:12px"><div style="font-size:2.5rem">${w.emoji}</div><strong>${w.name}</strong><div style="font-size:0.8rem;opacity:0.6">${w.dates}</div><div style="font-size:0.85rem;margin-top:0.5rem">${w.traits}</div></div><div style="padding:1rem;background:var(--surface);border:1px solid var(--line);border-radius:12px"><div style="font-size:2.5rem">🐾</div><strong>${cAnimal}</strong><div style="font-size:0.8rem;opacity:0.6">Chinese Zodiac</div><div style="font-size:0.85rem;margin-top:0.5rem">${cTraits[cAnimal]}</div></div></div>`;
  });
})();