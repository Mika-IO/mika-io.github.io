(function(){
  const pool=[
    {q:'What planet is closest to the Sun?',a:'Mercury',w:['Venus','Mars','Earth']},
    {q:'How many sides does a hexagon have?',a:'6',w:['5','7','8']},
    {q:'What is the chemical symbol for gold?',a:'Au',w:['Ag','Fe','Cu']},
    {q:'Who painted the Mona Lisa?',a:'Leonardo da Vinci',w:['Michelangelo','Raphael','Botticelli']},
    {q:'What is the largest ocean on Earth?',a:'Pacific',w:['Atlantic','Indian','Arctic']},
    {q:'In what year did World War II end?',a:'1945',w:['1944','1946','1943']},
    {q:'What gas do plants absorb from the atmosphere?',a:'Carbon dioxide',w:['Oxygen','Nitrogen','Hydrogen']},
    {q:'How many bones are in the adult human body?',a:'206',w:['208','196','212']},
    {q:'What is the capital of Australia?',a:'Canberra',w:['Sydney','Melbourne','Brisbane']},
    {q:'What is the fastest land animal?',a:'Cheetah',w:['Lion','Pronghorn antelope','Greyhound']},
    {q:'What is the square root of 144?',a:'12',w:['11','13','14']},
    {q:'How many continents are there?',a:'7',w:['5','6','8']},
    {q:'What language has the most native speakers?',a:'Mandarin Chinese',w:['English','Spanish','Hindi']},
    {q:'What element has the atomic number 1?',a:'Hydrogen',w:['Helium','Lithium','Carbon']},
    {q:'What is the longest river in the world?',a:'Nile',w:['Amazon','Yangtze','Mississippi']},
    {q:'How many players are on a basketball team on court?',a:'5',w:['6','7','4']},
    {q:'What is the hardest natural substance?',a:'Diamond',w:['Quartz','Topaz','Corundum']},
    {q:'What year was the first iPhone released?',a:'2007',w:['2005','2008','2006']},
    {q:'Who wrote "Romeo and Juliet"?',a:'William Shakespeare',w:['Charles Dickens','Jane Austen','Homer']},
    {q:'What is the speed of light approximately?',a:'300,000 km/s',w:['150,000 km/s','500,000 km/s','30,000 km/s']},
    {q:'Which country invented pizza?',a:'Italy',w:['Greece','Spain','USA']},
    {q:'What is the smallest prime number?',a:'2',w:['1','3','5']},
    {q:'What is H₂O commonly known as?',a:'Water',w:['Hydrogen peroxide','Ozone','Steam']},
    {q:'Which planet has the most moons?',a:'Saturn',w:['Jupiter','Uranus','Neptune']},
    {q:'What is the tallest mountain in the world?',a:'Mount Everest',w:['K2','Kangchenjunga','Makalu']},
    {q:'How many strings does a standard guitar have?',a:'6',w:['4','5','7']},
    {q:'What is the currency of Japan?',a:'Yen',w:['Won','Yuan','Baht']},
    {q:'Which organ pumps blood through the body?',a:'Heart',w:['Liver','Lungs','Kidneys']},
    {q:'What is the main ingredient in guacamole?',a:'Avocado',w:['Lime','Tomato','Onion']},
    {q:'In which sport is a "birdie" scored?',a:'Golf',w:['Badminton','Tennis','Cricket']},
  ];
  let questions,idx,score;
  function start(){
    questions=[...pool].sort(()=>Math.random()-0.5).slice(0,20);
    idx=0;score=0;
    document.getElementById('tq-start-screen').style.display='none';
    document.getElementById('tq-end').style.display='none';
    document.getElementById('tq-game').style.display='';
    showQ();
  }
  function showQ(){
    if(idx>=questions.length){endGame();return;}
    const q=questions[idx];
    const opts=[q.a,...q.w].sort(()=>Math.random()-0.5);
    document.getElementById('tq-progress').textContent='Question '+(idx+1)+' of '+questions.length+' · Score: '+score;
    document.getElementById('tq-q').textContent=q.q;
    document.getElementById('tq-msg').textContent='';
    document.getElementById('tq-opts').innerHTML=opts.map(o=>`<button style="padding:0.5rem 0.75rem;background:var(--surface);border:1px solid var(--line);border-radius:8px;cursor:pointer;text-align:left;color:var(--text)">${o}</button>`).join('');
    document.getElementById('tq-opts').querySelectorAll('button').forEach(btn=>{
      btn.onclick=function(){
        const correct=this.textContent===q.a;
        this.style.background=correct?'rgba(34,197,94,0.3)':'rgba(239,68,68,0.3)';
        if(correct)score++;else{document.getElementById('tq-opts').querySelectorAll('button').forEach(b=>{if(b.textContent===q.a)b.style.background='rgba(34,197,94,0.3)';});}
        document.getElementById('tq-msg').textContent=correct?'✅ Correct!':'❌ Wrong. Answer: '+q.a;
        document.getElementById('tq-opts').querySelectorAll('button').forEach(b=>b.disabled=true);
        idx++;setTimeout(showQ,1200);
      };
    });
  }
  function endGame(){document.getElementById('tq-game').style.display='none';document.getElementById('tq-end').style.display='';document.getElementById('tq-final').textContent='You scored '+score+'/'+questions.length+' ('+Math.round(score/questions.length*100)+'%)';}
  document.getElementById('tq-begin').onclick=start;
  document.getElementById('tq-again').onclick=start;
})();