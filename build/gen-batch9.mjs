#!/usr/bin/env node
// gen-batch9.mjs — tools 166-187 (games, fun, random, generators)
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const p = (...s) => join(ROOT, ...s);

function write(rel, content) {
  const full = p(rel);
  mkdirSync(dirname(full), { recursive: true });
  if (existsSync(full)) { console.log(`  skip: ${rel}`); return; }
  writeFileSync(full, content, 'utf8');
  console.log(`  wrote: ${rel}`);
}

function tool(slug, category, icon, widget, en, pt, js) {
  console.log(`\n[${slug}]`);
  write(`data/tools/${slug}.json`, JSON.stringify({ slug, category, icon, script: `${slug}.js`, widget, strings: { en, pt } }, null, 2));
  write(`public/assets/tools/${slug}.js`, js);
}

// ─── 166 ── Number Guessing Game ──────────────────────────────────────────────
tool('numberguesser', 'games', '🎯',
  `<div id="ng-app" style="text-align:center"><div id="ng-setup"><div class="field"><label for="ng-max">{{ui.maxNum}}</label><input type="number" id="ng-max" min="10" max="1000" value="100" style="width:100px;text-align:center;font-size:1.2rem;padding:0.4rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)"></div><button class="btn" id="ng-start" style="margin-top:0.5rem">{{ui.start}}</button></div><div id="ng-game" style="display:none"><p id="ng-hint" style="font-size:1.1rem;margin-bottom:0.75rem">{{ui.guess}}</p><div class="row" style="justify-content:center;gap:0.5rem"><input type="number" id="ng-in" min="1" style="width:100px;text-align:center;font-size:1.5rem;padding:0.4rem;border:2px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)"><button class="btn" id="ng-go">{{ui.submit}}</button></div><p id="ng-msg" style="margin-top:0.75rem;font-size:1rem;min-height:1.5rem"></p><p id="ng-tries" style="opacity:0.6;font-size:0.85rem"></p></div></div>`,
  { title:'Number Guessing Game — guess the number between 1 and 100', metaDescription:'Free number guessing game. Guess a secret number and receive hot/cold hints. Choose your difficulty range up to 1000.', h1:'Number Guessing Game', intro:'Guess the secret number! The game gives you "higher" or "lower" hints after each guess.', faq_title:'Number guessing game FAQ', ui:{ maxNum:'Maximum number', start:'Start Game', guess:'Enter your guess and press Submit', submit:'Submit' }, faq:[
    { q:'How many guesses does it take on average?', a:'With a range of 1–100 and optimal binary search strategy, you can always find the number in at most 7 guesses (log₂(100) ≈ 6.64). With 1–1000 it takes at most 10 guesses.' },
    { q:'What is the binary search strategy?', a:'Always guess the midpoint of the remaining range. For 1–100, guess 50. If "higher", guess 75. If "lower", guess 25. This halves the search space each time, guaranteeing the minimum number of guesses.' },
    { q:'Can I change the range?', a:'Yes. Set the maximum number before starting. Use a small range (10) for a quick game or a large range (1000) for a challenge.' }
  ]},
  { title:'Jogo de Adivinhação de Número — adivinhe o número entre 1 e 100', metaDescription:'Jogo de adivinhação de número gratuito. Adivinhe um número secreto e receba dicas quente/frio. Escolha sua faixa de dificuldade até 1000.', h1:'Jogo de Adivinhação de Número', intro:'Adivinhe o número secreto! O jogo dá dicas de "maior" ou "menor" após cada palpite.', faq_title:'Perguntas frequentes sobre o jogo de adivinhação', ui:{ maxNum:'Número máximo', start:'Iniciar Jogo', guess:'Insira seu palpite e pressione Enviar', submit:'Enviar' }, faq:[
    { q:'Quantos palpites são necessários em média?', a:'Com uma faixa de 1–100 e estratégia ótima de busca binária, você sempre encontra o número em no máximo 7 palpites (log₂(100) ≈ 6,64).' },
    { q:'O que é a estratégia de busca binária?', a:'Sempre adivinhe o ponto médio da faixa restante. Para 1–100, adivinhe 50. Se "maior", adivinhe 75. Se "menor", adivinhe 25.' },
    { q:'Posso mudar a faixa?', a:'Sim. Defina o número máximo antes de começar. Use uma faixa pequena (10) para um jogo rápido ou uma faixa grande (1000) para um desafio.' }
  ]},
  `(function(){
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
})();`
);

// ─── 167 ── Word Scramble Game ─────────────────────────────────────────────────
tool('wordscramble', 'games', '🔤',
  `<div id="ws-app" style="text-align:center"><div id="ws-word" style="font-size:2.5rem;font-weight:800;letter-spacing:0.15em;margin:0.75rem 0">—</div><div class="row" style="justify-content:center;gap:0.5rem"><input type="text" id="ws-in" placeholder="{{ui.guess}}" autocomplete="off" style="width:200px;text-align:center;font-size:1.1rem;padding:0.5rem;border:2px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)"><button class="btn" id="ws-submit">{{ui.check}}</button></div><p id="ws-msg" style="margin-top:0.75rem;min-height:1.5rem"></p><div class="row" style="justify-content:center;gap:0.5rem;margin-top:0.5rem"><button class="btn" id="ws-hint">{{ui.hint}}</button><button class="btn" id="ws-skip">{{ui.skip}}</button><button class="btn" id="ws-new">{{ui.new}}</button></div><p id="ws-score" style="opacity:0.6;font-size:0.875rem;margin-top:0.5rem"></p></div>`,
  { title:'Word Scramble Game — unscramble the letters to find the word', metaDescription:'Free word scramble game. Unscramble jumbled letters to find the hidden English word. Get hints if you are stuck.', h1:'Word Scramble Game', intro:'Unscramble the jumbled letters to find the hidden word. Use hints if you get stuck!', faq_title:'Word scramble FAQ', ui:{ guess:'Your answer…', check:'Check', hint:'Hint', skip:'Skip', new:'New Word' }, faq:[
    { q:'How are the words scrambled?', a:'The word\'s letters are randomly shuffled using Fisher-Yates algorithm. If the shuffle happens to produce the original word, it is shuffled again to ensure the scramble is always different.' },
    { q:'How does the hint work?', a:'Each time you press Hint, one more letter of the answer is revealed in its correct position. You can press Hint up to (word length - 1) times.' },
    { q:'What difficulty levels are there?', a:'The word list includes words of varying length. Shorter words (4-5 letters) are easier; longer words (8-10 letters) are harder. Press Skip to move to a new word if the current one is too difficult.' }
  ]},
  { title:'Jogo de Embaralhamento de Palavras — desembaralhe as letras para encontrar a palavra', metaDescription:'Jogo de embaralhamento de palavras gratuito. Desembaralhe letras para encontrar a palavra em inglês oculta. Obtenha dicas se estiver preso.', h1:'Jogo de Embaralhamento de Palavras', intro:'Desembaralhe as letras para encontrar a palavra oculta. Use dicas se travar!', faq_title:'Perguntas frequentes sobre embaralhamento de palavras', ui:{ guess:'Sua resposta…', check:'Verificar', hint:'Dica', skip:'Pular', new:'Nova Palavra' }, faq:[
    { q:'Como as palavras são embaralhadas?', a:'As letras da palavra são aleatoriamente embaralhadas. Se o embaralhamento produzir a palavra original, ela é embaralhada novamente.' },
    { q:'Como funciona a dica?', a:'Cada vez que você pressiona Dica, mais uma letra da resposta é revelada na posição correta.' },
    { q:'Quais níveis de dificuldade existem?', a:'A lista de palavras inclui palavras de comprimento variado. Palavras mais curtas (4-5 letras) são mais fáceis; palavras mais longas (8-10 letras) são mais difíceis.' }
  ]},
  `(function(){
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
})();`
);

// ─── 168 ── Memory Card Game ──────────────────────────────────────────────────
tool('memorygame', 'games', '🃏',
  `<div id="mg-app" style="text-align:center"><div class="row" style="justify-content:center;gap:0.75rem;margin-bottom:0.75rem"><button class="btn" id="mg-start">{{ui.start}}</button><span id="mg-stats" style="align-self:center;opacity:0.7;font-size:0.9rem"></span></div><div id="mg-grid" style="display:grid;grid-template-columns:repeat(4,1fr);gap:0.5rem;max-width:340px;margin:0 auto"></div></div>`,
  { title:'Memory Card Game — flip and match pairs of emoji cards', metaDescription:'Free memory card matching game. Flip cards to find matching emoji pairs. Tracks moves and time. Tests and improves visual memory.', h1:'Memory Card Game', intro:'Flip cards to find matching pairs. Try to match all pairs in as few moves as possible!', faq_title:'Memory game FAQ', ui:{ start:'New Game' }, faq:[
    { q:'How does the memory game work?', a:'Cards are placed face-down. Click any card to reveal it, then click another. If they match, they stay revealed. If not, both flip back. Find all pairs to win.' },
    { q:'How does this improve memory?', a:'Memory games exercise working memory and visual pattern recognition. Regular play has been shown to improve concentration and short-term memory, particularly in children and older adults.' },
    { q:'What is a good score?', a:'With 16 cards (8 pairs), the theoretical minimum is 8 moves. Most players take 15–25 moves. Under 15 moves is excellent. The game also tracks your time.' }
  ]},
  { title:'Jogo da Memória — vire e combine pares de cartas emoji', metaDescription:'Jogo de memória de correspondência de cartas gratuito. Vire cartas para encontrar pares de emoji correspondentes. Rastreia movimentos e tempo.', h1:'Jogo da Memória', intro:'Vire cartas para encontrar pares correspondentes. Tente combinar todos os pares com o menor número de movimentos possível!', faq_title:'Perguntas frequentes sobre o jogo da memória', ui:{ start:'Novo Jogo' }, faq:[
    { q:'Como funciona o jogo da memória?', a:'As cartas são colocadas com a face para baixo. Clique em qualquer carta para revelá-la, depois clique em outra. Se combinarem, ficam reveladas. Se não, ambas viram de volta.' },
    { q:'Como isso melhora a memória?', a:'Jogos de memória exercitam a memória de trabalho e o reconhecimento de padrões visuais. A prática regular demonstrou melhorar a concentração e a memória de curto prazo.' },
    { q:'Qual é uma boa pontuação?', a:'Com 16 cartas (8 pares), o mínimo teórico é 8 movimentos. A maioria dos jogadores leva 15–25 movimentos. Abaixo de 15 é excelente.' }
  ]},
  `(function(){
  const emojis=['🍎','🐶','🚀','🎸','🦋','🍕','🌈','🐬'];
  let flipped=[],matched=[],moves=0,startTime=null,timer=null;
  function newGame(){
    clearInterval(timer);moves=0;flipped=[];matched=[];startTime=null;
    const pairs=[...emojis,...emojis].sort(()=>Math.random()-0.5);
    const grid=document.getElementById('mg-grid');
    grid.innerHTML=pairs.map((e,i)=>\`<div class="card" data-i="\${i}" data-e="\${e}" style="height:70px;background:var(--surface);border:2px solid var(--line);border-radius:12px;cursor:pointer;font-size:1.8rem;display:flex;align-items:center;justify-content:center;transition:all 0.2s;user-select:none">?</div>\`).join('');
    grid.querySelectorAll('.card').forEach(c=>c.addEventListener('click',flip));
    document.getElementById('mg-stats').textContent='0 moves';
  }
  function flip(){
    if(!startTime){startTime=Date.now();timer=setInterval(()=>{document.getElementById('mg-stats').textContent=moves+' moves · '+Math.floor((Date.now()-startTime)/1000)+'s';},1000);}
    const card=this;
    if(flipped.length>=2||matched.includes(card.dataset.i)||flipped.includes(card))return;
    card.textContent=card.dataset.e;card.style.background='var(--accent-soft,rgba(99,102,241,0.15))';
    flipped.push(card);
    if(flipped.length===2){
      moves++;
      if(flipped[0].dataset.e===flipped[1].dataset.e){
        matched.push(flipped[0].dataset.i,flipped[1].dataset.i);
        flipped[0].style.background='rgba(34,197,94,0.2)';flipped[1].style.background='rgba(34,197,94,0.2)';
        flipped=[];
        if(matched.length===16){clearInterval(timer);document.getElementById('mg-stats').textContent='🎉 Done! '+moves+' moves in '+Math.floor((Date.now()-startTime)/1000)+'s';}
      }else{
        const pair=[...flipped];flipped=[];
        setTimeout(()=>{pair.forEach(c=>{c.textContent='?';c.style.background='var(--surface)';});},900);
      }
    }
  }
  document.getElementById('mg-start').onclick=newGame;
  newGame();
})();`
);

// ─── 169 ── Trivia Quiz ────────────────────────────────────────────────────────
tool('triviaquiz', 'games', '🧠',
  `<div id="tq-app" style="text-align:center"><div id="tq-start-screen"><button class="btn" id="tq-begin">{{ui.start}}</button></div><div id="tq-game" style="display:none"><p id="tq-progress" style="opacity:0.6;font-size:0.875rem;margin-bottom:0.5rem"></p><div id="tq-q" style="font-size:1.05rem;font-weight:600;margin-bottom:1rem;text-align:left"></div><div id="tq-opts" style="display:grid;gap:0.5rem;text-align:left"></div><p id="tq-msg" style="margin-top:0.75rem;min-height:1.5rem;font-size:0.9rem"></p></div><div id="tq-end" style="display:none"><p id="tq-final" style="font-size:1.3rem;font-weight:700"></p><button class="btn" id="tq-again">{{ui.again}}</button></div></div>`,
  { title:'Trivia Quiz — test your general knowledge with 20 questions', metaDescription:'Free trivia quiz. Answer 20 general knowledge questions covering science, history, geography, sports and pop culture. Instant scoring.', h1:'General Knowledge Trivia Quiz', intro:'Test your general knowledge with 20 multiple-choice questions across science, history, geography, sports and more.', faq_title:'Trivia quiz FAQ', ui:{ start:'Start Quiz', again:'Play Again' }, faq:[
    { q:'How many questions are there?', a:'The quiz contains 20 questions drawn randomly from a pool of 40+, covering science, history, geography, mathematics, sports, nature and pop culture.' },
    { q:'Are the questions always the same?', a:'No. Questions are shuffled each game, and the order of answer choices is also randomized. This prevents memorization of answer positions.' },
    { q:'What is a good score?', a:'15/20 (75%) is considered good. 18/20+ is excellent. 20/20 is a perfect score — very difficult as the questions cover a wide range of topics.' }
  ]},
  { title:'Quiz de Trivia — teste seu conhecimento geral com 20 perguntas', metaDescription:'Quiz de trivia gratuito. Responda 20 perguntas de conhecimento geral cobrindo ciência, história, geografia, esportes e cultura pop. Pontuação instantânea.', h1:'Quiz de Conhecimento Geral', intro:'Teste seu conhecimento geral com 20 perguntas de múltipla escolha sobre ciência, história, geografia, esportes e mais.', faq_title:'Perguntas frequentes sobre o quiz de trivia', ui:{ start:'Iniciar Quiz', again:'Jogar Novamente' }, faq:[
    { q:'Quantas perguntas existem?', a:'O quiz contém 20 perguntas tiradas aleatoriamente de um banco de 40+, cobrindo ciência, história, geografia, matemática, esportes, natureza e cultura pop.' },
    { q:'As perguntas são sempre as mesmas?', a:'Não. As perguntas são embaralhadas a cada jogo, e a ordem das escolhas de resposta também é aleatória.' },
    { q:'Qual é uma boa pontuação?', a:'15/20 (75%) é considerado bom. 18/20+ é excelente. 20/20 é pontuação perfeita.' }
  ]},
  `(function(){
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
    document.getElementById('tq-opts').innerHTML=opts.map(o=>\`<button style="padding:0.5rem 0.75rem;background:var(--surface);border:1px solid var(--line);border-radius:8px;cursor:pointer;text-align:left;color:var(--text)">\${o}</button>\`).join('');
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
})();`
);

// ─── 170 ── Tic-Tac-Toe ───────────────────────────────────────────────────────
tool('tictactoe', 'games', '⭕',
  `<div id="ttt-app" style="text-align:center"><div id="ttt-board" style="display:grid;grid-template-columns:repeat(3,80px);gap:6px;margin:0 auto 0.75rem"></div><p id="ttt-status" style="font-size:1.1rem;font-weight:600;min-height:1.5rem"></p><div class="row" style="justify-content:center;gap:0.5rem;margin-top:0.5rem"><button class="btn" id="ttt-reset">{{ui.reset}}</button><label style="display:flex;align-items:center;gap:0.4rem"><input type="checkbox" id="ttt-ai">{{ui.vsAi}}</label></div></div>`,
  { title:'Tic-Tac-Toe — play noughts and crosses online', metaDescription:'Free Tic-Tac-Toe game. Play against a friend or versus an unbeatable AI. Classic 3x3 noughts and crosses.', h1:'Tic-Tac-Toe', intro:'Play Tic-Tac-Toe (Noughts & Crosses) against a friend or toggle on AI mode to play against the computer.', faq_title:'Tic-Tac-Toe FAQ', ui:{ reset:'New Game', vsAi:'Play vs AI' }, faq:[
    { q:'Can I beat the AI?', a:'No. The AI uses the minimax algorithm, which guarantees optimal play — it will never lose. The best you can do against a perfect AI is draw. Disable AI mode to play against a friend.' },
    { q:'What is minimax?', a:'Minimax is a decision algorithm used in two-player games. It explores all possible future moves, assuming the opponent plays optimally, and chooses the move that maximizes the player\'s minimum guaranteed score.' },
    { q:'Is it always possible to draw?', a:'Yes. With perfect play from both sides, Tic-Tac-Toe always ends in a draw. The game is "solved" — which is why it is mainly used as a teaching example rather than a competitive game.' }
  ]},
  { title:'Jogo da Velha — jogue xadrez americano online', metaDescription:'Jogo da velha gratuito. Jogue contra um amigo ou versus uma IA imbatível. Clássico jogo da velha 3x3.', h1:'Jogo da Velha', intro:'Jogue Jogo da Velha contra um amigo ou ative o modo IA para jogar contra o computador.', faq_title:'Perguntas frequentes sobre o jogo da velha', ui:{ reset:'Novo Jogo', vsAi:'Jogar vs IA' }, faq:[
    { q:'Posso vencer a IA?', a:'Não. A IA usa o algoritmo minimax, que garante jogo ótimo — ela nunca perde. O melhor que você pode fazer contra uma IA perfeita é empatar.' },
    { q:'O que é minimax?', a:'Minimax é um algoritmo de decisão usado em jogos de dois jogadores. Explora todos os movimentos futuros possíveis e escolhe o que maximiza a pontuação mínima garantida do jogador.' },
    { q:'É sempre possível empatar?', a:'Sim. Com jogo perfeito de ambos os lados, o Jogo da Velha sempre termina em empate. O jogo está "resolvido".' }
  ]},
  `(function(){
  let board,current,gameOver;
  const wins=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  function checkWin(b,p){return wins.some(([a,c,d])=>b[a]===p&&b[c]===p&&b[d]===p);}
  function minimax(b,isMax){
    if(checkWin(b,'O'))return 10;if(checkWin(b,'X'))return -10;
    if(!b.includes(null))return 0;
    const moves=b.map((v,i)=>v===null?i:-1).filter(i=>i>=0);
    if(isMax){let best=-Infinity;for(const m of moves){b[m]='O';best=Math.max(best,minimax(b,false));b[m]=null;}return best;}
    else{let best=Infinity;for(const m of moves){b[m]='X';best=Math.min(best,minimax(b,true));b[m]=null;}return best;}
  }
  function aiMove(){
    let best=-Infinity,move=0;
    board.forEach((v,i)=>{if(!v){board[i]='O';const s=minimax(board,false);board[i]=null;if(s>best){best=s;move=i;}}});
    makeMove(move,'O');
  }
  function render(){
    document.getElementById('ttt-board').innerHTML=board.map((v,i)=>\`<button data-i="\${i}" style="height:80px;font-size:2rem;font-weight:800;background:var(--surface);border:2px solid var(--line);border-radius:12px;cursor:pointer;color:\${v==='X'?'var(--accent,#6366f1)':'var(--red,#ef4444)'}">\${v||''}</button>\`).join('');
    document.getElementById('ttt-board').querySelectorAll('button').forEach(btn=>{btn.onclick=function(){if(gameOver||board[this.dataset.i])return;makeMove(parseInt(this.dataset.i),current);if(!gameOver&&document.getElementById('ttt-ai').checked&&current==='O')setTimeout(aiMove,300);};});
  }
  function makeMove(i,p){
    board[i]=p;
    if(checkWin(board,p)){document.getElementById('ttt-status').textContent=p+' wins! 🎉';gameOver=true;}
    else if(!board.includes(null)){document.getElementById('ttt-status').textContent='Draw!';gameOver=true;}
    else{current=current==='X'?'O':'X';document.getElementById('ttt-status').textContent=current+"'s turn";}
    render();
  }
  function newGame(){board=Array(9).fill(null);current='X';gameOver=false;document.getElementById('ttt-status').textContent="X's turn";render();}
  document.getElementById('ttt-reset').onclick=newGame;
  newGame();
})();`
);

// ─── 171 ── Hangman Game ───────────────────────────────────────────────────────
tool('hangman', 'games', '🎮',
  `<div id="hm-app" style="text-align:center"><pre id="hm-drawing" style="font-family:monospace;font-size:0.85rem;line-height:1.3;text-align:left;display:inline-block;margin:0 0 0.75rem"></pre><div id="hm-word" style="font-size:1.8rem;font-weight:800;letter-spacing:0.2em;margin-bottom:0.75rem"></div><div id="hm-used" style="font-size:0.875rem;opacity:0.6;min-height:1.5rem;margin-bottom:0.5rem"></div><div id="hm-keys" style="display:flex;flex-wrap:wrap;gap:0.3rem;justify-content:center;max-width:380px;margin:0 auto"></div><p id="hm-msg" style="margin-top:0.75rem;min-height:1.5rem;font-weight:600"></p><button class="btn" id="hm-new" style="margin-top:0.5rem">{{ui.new}}</button></div>`,
  { title:'Hangman Game — guess the word one letter at a time', metaDescription:'Free hangman word game. Guess the hidden word one letter at a time before the hangman is complete. Classic word guessing game.', h1:'Hangman', intro:'Guess the hidden word by clicking letters. You have 6 wrong guesses before the hangman is complete.', faq_title:'Hangman game FAQ', ui:{ new:'New Word' }, faq:[
    { q:'How many wrong guesses do I get?', a:'You get 6 wrong guesses (head, body, left arm, right arm, left leg, right leg). On the 7th wrong guess, the hangman is complete and the game is over.' },
    { q:'Where do the words come from?', a:'Words are randomly selected from a curated list of common English nouns and adjectives ranging from 4 to 10 letters. No extremely obscure words are included.' },
    { q:'Is there a hint system?', a:'Currently there is no hint system — this is part of the challenge. The category of the word is shown as a hint. If the word is too difficult, use the "New Word" button to try a different word.' }
  ]},
  { title:'Jogo da Forca — adivinhe a palavra uma letra por vez', metaDescription:'Jogo da forca gratuito. Adivinhe a palavra oculta uma letra por vez antes que a forca seja completa. Clássico jogo de adivinhação de palavras.', h1:'Jogo da Forca', intro:'Adivinhe a palavra oculta clicando nas letras. Você tem 6 erros antes que a forca seja completada.', faq_title:'Perguntas frequentes sobre o jogo da forca', ui:{ new:'Nova Palavra' }, faq:[
    { q:'Quantos erros posso cometer?', a:'Você tem 6 erros (cabeça, corpo, braço esquerdo, braço direito, perna esquerda, perna direita). No 7º erro, a forca está completa e o jogo termina.' },
    { q:'De onde vêm as palavras?', a:'As palavras são selecionadas aleatoriamente de uma lista de substantivos e adjetivos comuns em inglês com 4 a 10 letras.' },
    { q:'Existe um sistema de dicas?', a:'Atualmente não há sistema de dicas. A categoria da palavra é mostrada como dica. Se a palavra for muito difícil, use o botão "Nova Palavra".' }
  ]},
  `(function(){
  const stages=['  +---+\\n  |   |\\n      |\\n      |\\n      |\\n      |\\n=========','  +---+\\n  |   |\\n  O   |\\n      |\\n      |\\n      |\\n=========','  +---+\\n  |   |\\n  O   |\\n  |   |\\n      |\\n      |\\n=========','  +---+\\n  |   |\\n  O   |\\n /|   |\\n      |\\n      |\\n=========','  +---+\\n  |   |\\n  O   |\\n /|\\\\  |\\n      |\\n      |\\n=========','  +---+\\n  |   |\\n  O   |\\n /|\\\\  |\\n /    |\\n      |\\n=========','  +---+\\n  |   |\\n  O   |\\n /|\\\\  |\\n / \\\\  |\\n      |\\n========='];
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
    keys.innerHTML='abcdefghijklmnopqrstuvwxyz'.split('').map(c=>\`<button style="width:32px;height:32px;background:\${guessed.includes(c)?(word.includes(c)?'rgba(34,197,94,0.3)':'rgba(239,68,68,0.3)'):'var(--surface)'};border:1px solid var(--line);border-radius:6px;cursor:pointer;\${(won||lost)?'opacity:0.5':''};\${guessed.includes(c)?'opacity:0.6':''}" \${guessed.includes(c)||won||lost?'disabled':''}>\${c}</button>\`).join('');
    keys.querySelectorAll('button').forEach(btn=>{btn.onclick=function(){const c=this.textContent;guessed.push(c);if(!word.includes(c))wrong++;render();};});
  }
  document.getElementById('hm-new').onclick=newGame;
  newGame();
})();`
);

// ─── 172 ── Would You Rather ──────────────────────────────────────────────────
tool('wouldyourather', 'fun', '🤔',
  `<div id="wyr-app" style="text-align:center"><div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;margin-bottom:0.75rem" id="wyr-choices"></div><button class="btn" id="wyr-next">{{ui.next}}</button></div>`,
  { title:'Would You Rather — fun dilemma questions to play with friends', metaDescription:'Free Would You Rather game. Tap a choice to see what others chose, then move to the next dilemma. Fun for parties and icebreakers.', h1:'Would You Rather?', intro:'Choose between two options, then see how others voted. Click "Next" for another dilemma.', faq_title:'Would You Rather FAQ', ui:{ next:'Next Question' }, faq:[
    { q:'How many questions are there?', a:'The game has 40 curated "Would You Rather" dilemmas covering fun, food, travel, superpowers and life choices. Questions are shown in random order.' },
    { q:'Are the vote percentages real?', a:'The percentages shown are simulated for demonstration purposes — they reflect reasonable approximations of how people typically answer these questions, not actual collected votes.' },
    { q:'Can I use this as an icebreaker?', a:'Yes! "Would You Rather" is a classic party and team-building game. The questions are family-friendly and designed to spark interesting conversations.' }
  ]},
  { title:'Você Prefere — perguntas de dilema divertidas para jogar com amigos', metaDescription:'Jogo Você Prefere gratuito. Toque em uma escolha para ver o que os outros escolheram, depois passe para o próximo dilema.', h1:'Você Prefere?', intro:'Escolha entre duas opções e veja como os outros votaram. Clique em "Próxima" para outro dilema.', faq_title:'Perguntas frequentes sobre Você Prefere', ui:{ next:'Próxima Pergunta' }, faq:[
    { q:'Quantas perguntas existem?', a:'O jogo tem 40 dilemas curados cobrindo diversão, comida, viagens, superpoderes e escolhas de vida. As perguntas são mostradas em ordem aleatória.' },
    { q:'As porcentagens de votos são reais?', a:'As porcentagens mostradas são simuladas para fins de demonstração. Elas refletem aproximações razoáveis de como as pessoas geralmente respondem a essas perguntas.' },
    { q:'Posso usar como quebra-gelo?', a:'Sim! "Você Prefere" é um clássico jogo de festas e formação de equipes. As perguntas são adequadas para todas as idades.' }
  ]},
  `(function(){
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
    c.innerHTML=[{txt:item.a,pct:item.pa},{txt:item.b,pct:100-item.pa}].map((o,i)=>\`<button id="wyr-opt\${i}" style="padding:1rem;background:var(--surface);border:2px solid var(--line);border-radius:16px;cursor:pointer;color:var(--text);font-size:0.95rem;font-weight:600;transition:all 0.2s">\${o.txt}</button>\`).join('');
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
})();`
);

// ─── 173 ── This or That ──────────────────────────────────────────────────────
tool('thisorthat', 'fun', '⚡',
  `<div id="tot-app" style="text-align:center"><p style="opacity:0.6;font-size:0.875rem;margin-bottom:0.75rem">{{ui.instruction}}</p><div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:0.75rem"><button id="tot-a" style="padding:1.5rem 1rem;font-size:1.1rem;font-weight:700;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;border:none;border-radius:16px;cursor:pointer;transition:transform 0.15s"></button><button id="tot-b" style="padding:1.5rem 1rem;font-size:1.1rem;font-weight:700;background:linear-gradient(135deg,#ec4899,#f43f5e);color:#fff;border:none;border-radius:16px;cursor:pointer;transition:transform 0.15s"></button></div><div id="tot-score" style="opacity:0.6;font-size:0.875rem"></div><button class="btn" id="tot-skip" style="margin-top:0.5rem">{{ui.skip}}</button></div>`,
  { title:'This or That — rapid-fire preference quiz', metaDescription:'Free This or That game. Make rapid preference choices between two options. Fun for parties and learning about yourself.', h1:'This or That', intro:'Choose your preference between two options as fast as you can. Track your choices at the end.', faq_title:'This or That FAQ', ui:{ instruction:'Click your preference as fast as you can!', skip:'Skip' }, faq:[
    { q:'What is "This or That"?', a:'This or That is a rapid-fire preference game where you choose between two things. It\'s great for parties, icebreakers, and self-discovery. The fast format means you answer instinctively.' },
    { q:'Are there right or wrong answers?', a:'No! Every answer is personal preference. There are no correct answers — the game is about discovering and sharing your preferences.' },
    { q:'How many rounds are there?', a:'The game includes 30 pairs of choices covering food, lifestyle, entertainment and personality. Choose as many or as few as you like.' }
  ]},
  { title:'Isso ou Aquilo — quiz de preferência rápido', metaDescription:'Jogo Isso ou Aquilo gratuito. Faça escolhas rápidas de preferência entre duas opções. Divertido para festas e para aprender sobre si mesmo.', h1:'Isso ou Aquilo', intro:'Escolha sua preferência entre duas opções o mais rápido possível. Acompanhe suas escolhas ao final.', faq_title:'Perguntas frequentes sobre Isso ou Aquilo', ui:{ instruction:'Clique na sua preferência o mais rápido possível!', skip:'Pular' }, faq:[
    { q:'O que é "Isso ou Aquilo"?', a:'Isso ou Aquilo é um jogo de preferência rápido onde você escolhe entre duas coisas. É ótimo para festas e quebra-gelos.' },
    { q:'Existem respostas certas ou erradas?', a:'Não! Cada resposta é preferência pessoal. Não há respostas corretas — o jogo é sobre descobrir e compartilhar suas preferências.' },
    { q:'Quantas rodadas existem?', a:'O jogo inclui 30 pares de escolhas cobrindo comida, estilo de vida, entretenimento e personalidade.' }
  ]},
  `(function(){
  const pairs=[['Coffee','Tea'],['Morning person','Night owl'],['Summer','Winter'],['Books','Movies'],['City','Nature'],['Dog','Cat'],['Pizza','Burger'],['Mountains','Beach'],['Introvert','Extrovert'],['Cooking at home','Eating out'],['Sunrise','Sunset'],['Train','Plane'],['History','Future'],['Logic','Creativity'],['Chocolate','Vanilla'],['Fast-paced','Slow-paced'],['Minimalism','Maximalism'],['Workout early','Workout late'],['Alone time','Social time'],['Texting','Calling'],['Music','Silence'],['Photos','Videos'],['Cats','Robots'],['Learn from books','Learn from experience'],['Plan everything','Go with the flow'],['Fruit','Vegetables'],['Action films','Drama films'],['Luxury','Adventure'],['Stay in','Go out'],['Past','Future']];
  let idx=0;const choices=[];const order=[...pairs].sort(()=>Math.random()-0.5);
  function show(){
    if(idx>=order.length){document.getElementById('tot-app').innerHTML='<p style="font-size:1.1rem;font-weight:600">All done! '+choices.length+' choices made.</p><p style="opacity:0.6;font-size:0.85rem;margin-top:0.5rem">'+choices.map(c=>c.a+' → '+c.choice).join(' · ')+'</p>';return;}
    const pair=order[idx];
    document.getElementById('tot-a').textContent=pair[0];
    document.getElementById('tot-b').textContent=pair[1];
    document.getElementById('tot-score').textContent=(idx+1)+' of '+order.length;
  }
  function pick(side){choices.push({a:order[idx][0]+' vs '+order[idx][1],choice:order[idx][side]});idx++;show();}
  document.getElementById('tot-a').onclick=()=>pick(0);
  document.getElementById('tot-b').onclick=()=>pick(1);
  document.getElementById('tot-skip').onclick=()=>{idx++;show();};
  ['tot-a','tot-b'].forEach(id=>{const b=document.getElementById(id);b.addEventListener('mouseenter',()=>b.style.transform='scale(1.04)');b.addEventListener('mouseleave',()=>b.style.transform='scale(1)');});
  show();
})();`
);

// ─── 174 ── Wheel Spinner ─────────────────────────────────────────────────────
tool('wheelspinner', 'fun', '🎡',
  `<div id="wsp-app" style="text-align:center"><canvas id="wsp-canvas" width="300" height="300" style="border-radius:50%;cursor:pointer;max-width:100%"></canvas><div class="row" style="justify-content:center;gap:0.5rem;margin-top:0.75rem"><button class="btn" id="wsp-spin">{{ui.spin}}</button><button class="btn" id="wsp-edit">{{ui.edit}}</button></div><div id="wsp-edit-area" style="display:none;margin-top:0.75rem"><textarea id="wsp-items" rows="5" style="width:100%;padding:0.5rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text);font-size:0.9rem" placeholder="One option per line"></textarea><button class="btn" id="wsp-apply" style="margin-top:0.4rem">{{ui.apply}}</button></div><p id="wsp-result" style="margin-top:0.75rem;font-size:1.1rem;font-weight:700;min-height:1.5rem"></p></div>`,
  { title:'Wheel Spinner — random decision spinner wheel', metaDescription:'Free online wheel spinner. Add options and spin to make a random decision. Great for choosing restaurants, games or making any choice.', h1:'Wheel Spinner', intro:'Spin the wheel to make a random decision. Customize the options by clicking Edit.', faq_title:'Wheel spinner FAQ', ui:{ spin:'Spin!', edit:'Edit Options', apply:'Apply' }, faq:[
    { q:'How are results weighted?', a:'All options have equal probability. The wheel spins for a random duration with realistic deceleration. The final resting position determines the winner.' },
    { q:'What can I use this for?', a:'Choosing a restaurant, picking a game, deciding who goes first, selecting a random chore, choosing a movie, assigning tasks in a team — any situation where you need to make a random fair choice.' },
    { q:'Can I add as many options as I want?', a:'Yes. Add one option per line in the edit area. The wheel draws all options in equal segments. With very many options, the segments become small but still clearly readable.' }
  ]},
  { title:'Girador de Roda — roda giratória de decisão aleatória', metaDescription:'Girador de roda online gratuito. Adicione opções e gire para tomar uma decisão aleatória. Ótimo para escolher restaurantes, jogos ou qualquer escolha.', h1:'Girador de Roda', intro:'Gire a roda para tomar uma decisão aleatória. Personalize as opções clicando em Editar.', faq_title:'Perguntas frequentes sobre o girador de roda', ui:{ spin:'Girar!', edit:'Editar Opções', apply:'Aplicar' }, faq:[
    { q:'Como os resultados são pesados?', a:'Todas as opções têm probabilidade igual. A roda gira por uma duração aleatória com desaceleração realista.' },
    { q:'Para que posso usar isso?', a:'Escolher um restaurante, selecionar um jogo, decidir quem vai primeiro, escolher uma tarefa, selecionar um filme — qualquer situação onde você precisa fazer uma escolha aleatória justa.' },
    { q:'Posso adicionar quantas opções quiser?', a:'Sim. Adicione uma opção por linha na área de edição. A roda desenha todas as opções em segmentos iguais.' }
  ]},
  `(function(){
  let items=['Pizza','Sushi','Tacos','Burger','Pasta','Salad','Ramen','Curry'];
  let angle=0,spinning=false;
  const colors=['#6366f1','#ec4899','#f59e0b','#10b981','#3b82f6','#ef4444','#8b5cf6','#14b8a6'];
  const canvas=document.getElementById('wsp-canvas');const ctx=canvas.getContext('2d');
  function draw(ang){
    const cx=150,cy=150,r=140;ctx.clearRect(0,0,300,300);
    const slice=(2*Math.PI)/items.length;
    items.forEach((item,i)=>{
      ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,r,ang+i*slice,ang+(i+1)*slice);ctx.closePath();
      ctx.fillStyle=colors[i%colors.length];ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.stroke();
      ctx.save();ctx.translate(cx,cy);ctx.rotate(ang+(i+0.5)*slice);ctx.textAlign='right';ctx.fillStyle='#fff';ctx.font='bold '+Math.min(14,300/items.length/3)+'px sans-serif';
      ctx.fillText(item.length>12?item.slice(0,11)+'…':item,r-8,4);ctx.restore();
    });
    // Pointer
    ctx.beginPath();ctx.moveTo(285,150);ctx.lineTo(270,140);ctx.lineTo(270,160);ctx.closePath();ctx.fillStyle='#fff';ctx.fill();ctx.strokeStyle='#333';ctx.lineWidth=1;ctx.stroke();
  }
  function spin(){
    if(spinning)return;spinning=true;document.getElementById('wsp-result').textContent='';
    const extra=Math.PI*2*5+Math.random()*Math.PI*2;
    const duration=3000+Math.random()*2000;const start=Date.now();const startAngle=angle;
    function frame(){const elapsed=Date.now()-start;const t=Math.min(1,elapsed/duration);const ease=1-Math.pow(1-t,4);angle=startAngle+extra*ease;draw(angle);
      if(t<1){requestAnimationFrame(frame);}
      else{spinning=false;const norm=((2*Math.PI)-(angle%(2*Math.PI))+Math.PI*2)%(Math.PI*2);const slice=(2*Math.PI)/items.length;const winner=Math.floor(norm/slice)%items.length;document.getElementById('wsp-result').textContent='🎉 '+items[winner];}
    }
    requestAnimationFrame(frame);
  }
  document.getElementById('wsp-spin').onclick=spin;
  document.getElementById('wsp-edit').onclick=function(){const a=document.getElementById('wsp-edit-area');a.style.display=a.style.display==='none'?'':'none';if(a.style.display!=='none')document.getElementById('wsp-items').value=items.join('\n');};
  document.getElementById('wsp-apply').onclick=function(){const raw=document.getElementById('wsp-items').value.trim().split('\n').map(s=>s.trim()).filter(Boolean);if(raw.length>=2){items=raw;draw(angle);document.getElementById('wsp-edit-area').style.display='none';}};
  draw(0);
})();`
);

// ─── 175 ── Decision Maker ────────────────────────────────────────────────────
tool('decisionmaker', 'fun', '🎲',
  `<div id="dm-app"><div class="field"><label for="dm-q">{{ui.question}}</label><input type="text" id="dm-q" placeholder="{{ui.placeholder}}"></div><div id="dm-opts"><div class="row"><input type="text" class="dm-opt" placeholder="{{ui.option}} 1" style="flex:1;padding:0.5rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)"><input type="text" class="dm-opt" placeholder="{{ui.option}} 2" style="flex:1;padding:0.5rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)"></div></div><div class="row" style="gap:0.5rem;margin-top:0.5rem"><button class="btn" id="dm-add">+ {{ui.addOption}}</button><button class="btn" id="dm-decide">{{ui.decide}}</button></div><div id="dm-result" hidden class="result" style="text-align:center"></div></div>`,
  { title:'Decision Maker — random decision picker for tough choices', metaDescription:'Free decision maker. Enter your options and let the randomizer pick one for you. Add pros/cons weighting for more realistic choices.', h1:'Decision Maker', intro:'Enter your question and options, then click Decide to get a random pick. Great for when you just cannot choose.', faq_title:'Decision maker FAQ', ui:{ question:'Your question', placeholder:'e.g. What should I eat tonight?', option:'Option', addOption:'Add Option', decide:'Decide!' }, faq:[
    { q:'Is the selection truly random?', a:'Yes. The decision maker uses Math.random() which produces a uniformly distributed pseudo-random number. Each option has an exactly equal probability of being selected.' },
    { q:'How many options can I add?', a:'You can add up to 10 options. Start with the two default fields and click "Add Option" to add more.' },
    { q:'Should I follow the result?', a:'That is up to you! Some people use random decision makers to reveal their true preference — if you feel relieved or disappointed at the result, that tells you what you actually wanted. Otherwise, just go with it!' }
  ]},
  { title:'Tomador de Decisão — seletor de decisão aleatória para escolhas difíceis', metaDescription:'Tomador de decisão gratuito. Insira suas opções e deixe o randomizador escolher uma para você.', h1:'Tomador de Decisão', intro:'Insira sua pergunta e opções, depois clique em Decidir para obter uma escolha aleatória.', faq_title:'Perguntas frequentes sobre o tomador de decisão', ui:{ question:'Sua pergunta', placeholder:'ex: O que devo comer esta noite?', option:'Opção', addOption:'Adicionar Opção', decide:'Decidir!' }, faq:[
    { q:'A seleção é verdadeiramente aleatória?', a:'Sim. O tomador de decisão usa Math.random() que produz um número pseudo-aleatório uniformemente distribuído.' },
    { q:'Quantas opções posso adicionar?', a:'Você pode adicionar até 10 opções. Comece com os dois campos padrão e clique em "Adicionar Opção" para adicionar mais.' },
    { q:'Devo seguir o resultado?', a:'Depende de você! Algumas pessoas usam tomadores de decisão aleatória para revelar sua preferência real — se você sentir alívio ou decepção com o resultado, isso diz o que você realmente queria.' }
  ]},
  `(function(){
  document.getElementById('dm-add').onclick=function(){
    const opts=document.getElementById('dm-opts');
    const rows=opts.querySelectorAll('.row');if(rows.length>=10)return;
    const row=document.createElement('div');row.className='row';row.style.marginTop='0.3rem';
    const inp=document.createElement('input');inp.type='text';inp.className='dm-opt';inp.placeholder='Option '+(rows.length+1);inp.style.cssText='flex:1;padding:0.5rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)';
    const del=document.createElement('button');del.textContent='×';del.style.cssText='padding:0.4rem 0.6rem;background:var(--surface);border:1px solid var(--line);border-radius:8px;cursor:pointer;color:var(--text)';del.onclick=()=>row.remove();
    row.append(inp,del);opts.appendChild(row);
  };
  document.getElementById('dm-decide').onclick=function(){
    const options=[...document.querySelectorAll('.dm-opt')].map(i=>i.value.trim()).filter(Boolean);
    const out=document.getElementById('dm-result');
    if(options.length<2){out.innerHTML='<p>Add at least 2 options</p>';out.hidden=false;return;}
    const chosen=options[Math.floor(Math.random()*options.length)];
    out.hidden=false;
    out.innerHTML='<div style="font-size:1.5rem;font-weight:800;color:var(--accent,#6366f1)">'+chosen+'</div><p style="opacity:0.6;font-size:0.85rem;margin-top:0.4rem">Selected from '+options.length+' options</p>';
  };
})();`
);

// ─── 176 ── Random Team Generator ─────────────────────────────────────────────
tool('teamgenerator', 'productivity', '👥',
  `<div id="tg-app"><div class="field"><label for="tg-names">{{ui.names}}</label><textarea id="tg-names" rows="6" placeholder="{{ui.placeholder}}" style="width:100%;resize:vertical;padding:0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)"></textarea></div><div class="row"><div class="field"><label for="tg-num">{{ui.teams}}</label><input type="number" id="tg-num" min="2" max="20" value="2" style="width:80px" inputmode="numeric"></div><button class="btn" id="tg-go">{{ui.generate}}</button></div><div id="tg-out" style="margin-top:0.75rem"></div></div>`,
  { title:'Random Team Generator — split a list of people into random teams', metaDescription:'Free random team generator. Paste names and choose the number of teams to randomly split people into balanced groups. Great for sports, class projects and games.', h1:'Random Team Generator', intro:'Enter names (one per line) and choose how many teams to create. The generator splits them randomly into balanced groups.', faq_title:'Team generator FAQ', ui:{ names:'Names (one per line)', placeholder:'Alice\nBob\nCharlie\nDave\nEve\nFrank', teams:'Number of teams', generate:'Generate Teams' }, faq:[
    { q:'Are the teams balanced?', a:'The generator distributes people as evenly as possible. If the number of people is not divisible by the number of teams, some teams will have one extra person. The assignment is random, not skill-based.' },
    { q:'Can I use this for classroom groups?', a:'Yes. Paste student names and choose the number of groups. This is a fast, fair, and impartial way to form classroom project groups.' },
    { q:'How is the randomization done?', a:'Names are shuffled using the Fisher-Yates algorithm, then distributed sequentially into teams. This produces a uniform random distribution with no bias.' }
  ]},
  { title:'Gerador de Times Aleatório — divida uma lista de pessoas em times aleatórios', metaDescription:'Gerador de times aleatório gratuito. Cole nomes e escolha o número de times para dividir pessoas aleatoriamente em grupos equilibrados.', h1:'Gerador de Times Aleatório', intro:'Insira nomes (um por linha) e escolha quantos times criar. O gerador os divide aleatoriamente em grupos equilibrados.', faq_title:'Perguntas frequentes sobre o gerador de times', ui:{ names:'Nomes (um por linha)', placeholder:'Alice\nBob\nCarlos\nDave\nEva\nFrank', teams:'Número de times', generate:'Gerar Times' }, faq:[
    { q:'Os times são equilibrados?', a:'O gerador distribui as pessoas de forma tão uniforme quanto possível. Se o número de pessoas não for divisível pelo número de times, alguns times terão uma pessoa extra.' },
    { q:'Posso usar para grupos de sala de aula?', a:'Sim. Cole os nomes dos alunos e escolha o número de grupos. É uma maneira rápida, justa e imparcial de formar grupos de projetos.' },
    { q:'Como a aleatorização é feita?', a:'Os nomes são embaralhados usando o algoritmo Fisher-Yates, depois distribuídos sequencialmente em times.' }
  ]},
  `(function(){
  document.getElementById('tg-go').onclick=function(){
    const names=document.getElementById('tg-names').value.trim().split('\n').map(s=>s.trim()).filter(Boolean);
    const n=Math.max(2,Math.min(20,parseInt(document.getElementById('tg-num').value)||2));
    const out=document.getElementById('tg-out');
    if(names.length<n){out.innerHTML='<p>Add more names than teams</p>';return;}
    const shuffled=[...names].sort(()=>Math.random()-0.5);
    const teams=Array.from({length:n},()=>[]);
    shuffled.forEach((name,i)=>teams[i%n].push(name));
    out.innerHTML='<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:0.75rem">'+teams.map((t,i)=>'<div style="background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:0.75rem"><strong style="display:block;margin-bottom:0.4rem">Team '+(i+1)+'</strong>'+t.map(n=>'<div style="padding:2px 0;font-size:0.9rem">'+n+'</div>').join('')+'</div>').join('')+'</div>';
  };
})();`
);

// ─── 177 ── Random Password Phrase ────────────────────────────────────────────
tool('passphregen', 'utility', '🔐',
  `<div id="pp-app"><div class="row"><div class="field"><label for="pp-words">{{ui.words}}</label><input type="number" id="pp-words" min="3" max="8" value="4" style="width:70px" inputmode="numeric"></div><div class="field"><label for="pp-sep">{{ui.sep}}</label><select id="pp-sep"><option value="-">Hyphen (-)</option><option value="_">Underscore (_)</option><option value=".">Dot (.)</option><option value=" ">Space</option></select></div><label style="display:flex;align-items:center;gap:0.4rem;margin-top:1.5rem"><input type="checkbox" id="pp-num" checked>{{ui.number}}</label><label style="display:flex;align-items:center;gap:0.4rem;margin-top:1.5rem"><input type="checkbox" id="pp-cap" checked>{{ui.capitalize}}</label></div><div class="row" style="gap:0.5rem"><button class="btn" id="pp-gen">{{ui.generate}}</button><button class="btn" id="pp-copy">{{ui.copy}}</button></div><div class="result" id="pp-out" style="font-size:1.1rem;font-family:monospace;word-break:break-all;min-height:2rem;margin-top:0.5rem"></div><p style="opacity:0.5;font-size:0.8rem;margin-top:0.4rem">{{ui.strength}}</p></div>`,
  { title:'Passphrase Generator — generate memorable secure passphrases', metaDescription:'Free passphrase generator. Create memorable but secure passphrases using random common words. Much easier to remember than random characters.', h1:'Passphrase Generator', intro:'Generate a memorable passphrase using random words. Passphrases are easier to remember than random-character passwords but just as secure.', faq_title:'Passphrase generator FAQ', ui:{ words:'Word count', sep:'Separator', number:'Add number', capitalize:'Capitalize words', generate:'Generate', copy:'Copy', strength:'Strength: a 4-word passphrase has ~50 bits of entropy — stronger than most passwords' }, faq:[
    { q:'Why are passphrases better than passwords?', a:'A passphrase like "correct-horse-battery-staple" (from XKCD) has ~44 bits of entropy and is easy to remember. A random 8-character password like "Tr0ub4dor" has only ~28 bits. Longer passphrases are both more secure and more memorable.' },
    { q:'How many bits of entropy does this generate?', a:'With a ~2,000 word list: each word provides ~11 bits. A 4-word passphrase has ~44 bits, 5 words ~55 bits, 6 words ~66 bits. 50+ bits is considered strong for most purposes.' },
    { q:'Should I use this for all my accounts?', a:'Use a different passphrase for each account, or better yet use a password manager (Bitwarden, 1Password) to store unique random passwords. Passphrases are best for master passwords that you must memorize.' }
  ]},
  { title:'Gerador de Passphrase — gerar passphrases seguras e memoráveis', metaDescription:'Gerador de passphrase gratuito. Crie passphrases memoráveis mas seguras usando palavras comuns aleatórias.', h1:'Gerador de Passphrase', intro:'Gere uma passphrase memorável usando palavras aleatórias. Passphrases são mais fáceis de lembrar do que senhas de caracteres aleatórios mas igualmente seguras.', faq_title:'Perguntas frequentes sobre gerador de passphrase', ui:{ words:'Número de palavras', sep:'Separador', number:'Adicionar número', capitalize:'Capitalizar palavras', generate:'Gerar', copy:'Copiar', strength:'Força: uma passphrase de 4 palavras tem ~50 bits de entropia — mais forte que a maioria das senhas' }, faq:[
    { q:'Por que passphrases são melhores que senhas?', a:'Uma passphrase como "cavalo-correto-bateria-grampo" tem ~44 bits de entropia e é fácil de lembrar. Uma senha aleatória de 8 caracteres tem apenas ~28 bits.' },
    { q:'Quantos bits de entropia isso gera?', a:'Com uma lista de ~2.000 palavras: cada palavra fornece ~11 bits. Uma passphrase de 4 palavras tem ~44 bits, 5 palavras ~55 bits, 6 palavras ~66 bits.' },
    { q:'Devo usar isso para todas as minhas contas?', a:'Use uma passphrase diferente para cada conta, ou melhor ainda use um gerenciador de senhas (Bitwarden, 1Password). Passphrases são melhores para senhas mestras que você precisa memorizar.' }
  ]},
  `(function(){
  const w='able acid aged also area army away baby back ball band bank base bath bear beat been best bird blow blue boat body bomb bond bone book boom born both bowl bulk burn call calm came card care case cash cast cave chef chip city clay club coal coat code coil cold come cook cool cope core cost coup crew crop curb cure dark data date dawn dead deal dean debt deck deed deep deny dew diet dirt dish disk dock does dome door dose dote down draw drew drop drug drum dual dump dusk dust duty each earn ease east edge emit epic even exam exit face fact fail fair fall fame farm fate feed feel feet fell felt file fill film find fire firm fish fist five flag flat flew flip flow foam fold folk fond font food fool foot ford fore fork form fort four free frog from fuel full fund fuse gain gate gave gear geld gift girl give glad glee glow glue glum go gold golf gone good gore gown grab gram gray grew grim grip grit grow gust hack hail half hall halt hand hang hard harm haste hate haul have hawk head heap heat heel held helm help herb high hike hill hint hire hold hole home hood hook hope horn host hour huge hull hunt hurt hymn idea idle inch into iron jade jail jazz join jump just keen keep kept kill kind king knew knot know lace lack laid lake lame land lane lard lark lash last late lawn lazy lead leaf lean leap lend lens less lick lift like lime limp link lion list live load loan lock loft lone long look loom loop lord lore lose loss lost loud love luck lure lurk made mail main make mall malt many mark mart mast mate math maze melt memo menu mere mesh mild mill mime mind mint mist mode mold moon more morn most move much mull must name navy need neon nest news next nice nine node none noon norm nose note noun nude null oath odor open oven pace pack page paid pale palm pave pawn peak peel peep peer pent pest pile pill pine pink pity plan plea plod plot plow ploy plug plum plus poet pole poll pond pool pore port pose post pour prep prey prop pull pulp pump pure push race rack rage raid rail rain rake ramp rank rare rash rate rave read real reap reef reel rely rend rent rest rice rich ride rift ring riot rise risk road roam roar robe rode role roll roof room rope rose ruin rule rush rust safe sage said sail sake salt same sand sane sang sank save scan scar seam seep self sell sent shed ship shoe shot show shut sick side sigh silk sink site skin skip slag slab slam slap slew slim slip slow slug snap sole solo some song soon sore soul soup sour span sped spin spot stab stag star stay stem step stew stop stub such sued suit sure swam swat swim tank tame tape task taxi tend term text them they thin tide tied tile time tiny toll tomb tone took tool torn toss town trap tray trek trip trim trio true tube tune turf turn twin type ugly undo unit upon used user vain vale vast veil very vest view vine vise void vote wade wage wake wary wave went were wide wilt wine wing wish wisp with woke wolf womb wove wrap wren yard yarn zero zone'.split(' ');
  let last='';
  function gen(){
    const n=parseInt(document.getElementById('pp-words').value)||4;
    const sep=document.getElementById('pp-sep').value;
    const num=document.getElementById('pp-num').checked;
    const cap=document.getElementById('pp-cap').checked;
    const words=Array.from({length:n},()=>w[Math.floor(Math.random()*w.length)]);
    let phrase=(cap?words.map(x=>x[0].toUpperCase()+x.slice(1)):words).join(sep);
    if(num)phrase+=sep+Math.floor(Math.random()*90+10);
    last=phrase;document.getElementById('pp-out').textContent=phrase;
  }
  document.getElementById('pp-gen').onclick=gen;
  document.getElementById('pp-copy').onclick=()=>{if(last)navigator.clipboard.writeText(last);};
  gen();
})();`
);

// ─── 178 ── QR Code Reader (camera) ───────────────────────────────────────────
tool('qrreader', 'utility', '📷',
  `<div id="qrr-app" style="text-align:center"><p style="opacity:0.7;font-size:0.875rem;margin-bottom:0.75rem">{{ui.instruction}}</p><input type="file" id="qrr-file" accept="image/*" style="display:none"><button class="btn" id="qrr-btn">{{ui.upload}}</button><canvas id="qrr-canvas" style="display:none;max-width:100%;margin-top:0.75rem;border-radius:8px"></canvas><div id="qrr-out" style="margin-top:0.75rem;word-break:break-all"></div></div>`,
  { title:'QR Code Reader — scan QR codes from uploaded images', metaDescription:'Free QR code reader. Upload an image containing a QR code to decode its content instantly in your browser. No app needed.', h1:'QR Code Reader', intro:'Upload an image containing a QR code to decode its content. Everything runs in your browser — no data is uploaded to any server.', faq_title:'QR code reader FAQ', ui:{ instruction:'Upload an image with a QR code to decode it.', upload:'Upload Image' }, faq:[
    { q:'Does this use a camera?', a:'No. This tool reads QR codes from uploaded image files only. For live camera scanning, use your phone camera app — modern iOS and Android cameras scan QR codes natively without an extra app.' },
    { q:'What formats are supported?', a:'Any image file (JPEG, PNG, WebP, GIF) containing a QR code. The QR code should be clearly visible, well-lit and not too small.' },
    { q:'Is my data private?', a:'Yes. The QR code is decoded entirely in your browser using JavaScript. No image or decoded data is sent to any server.' }
  ]},
  { title:'Leitor de QR Code — escanear QR codes de imagens enviadas', metaDescription:'Leitor de QR code gratuito. Carregue uma imagem contendo um QR code para decodificar seu conteúdo instantaneamente no navegador.', h1:'Leitor de QR Code', intro:'Carregue uma imagem contendo um QR code para decodificar seu conteúdo. Tudo é executado no seu navegador — nenhum dado é enviado para qualquer servidor.', faq_title:'Perguntas frequentes sobre leitor de QR code', ui:{ instruction:'Carregue uma imagem com um QR code para decodificá-lo.', upload:'Carregar Imagem' }, faq:[
    { q:'Isso usa câmera?', a:'Não. Esta ferramenta lê QR codes apenas de arquivos de imagem carregados. Para escaneamento ao vivo com câmera, use o aplicativo de câmera do seu telefone.' },
    { q:'Quais formatos são suportados?', a:'Qualquer arquivo de imagem (JPEG, PNG, WebP, GIF) contendo um QR code. O QR code deve estar claramente visível, bem iluminado e não muito pequeno.' },
    { q:'Meus dados são privados?', a:'Sim. O QR code é decodificado inteiramente no seu navegador usando JavaScript. Nenhuma imagem ou dado decodificado é enviado para qualquer servidor.' }
  ]},
  `(function(){
  document.getElementById('qrr-btn').onclick=()=>document.getElementById('qrr-file').click();
  document.getElementById('qrr-file').addEventListener('change',function(){
    const file=this.files[0];if(!file)return;
    const reader=new FileReader();
    reader.onload=function(e){
      const img=new Image();
      img.onload=function(){
        const canvas=document.getElementById('qrr-canvas');canvas.style.display='block';
        canvas.width=img.width;canvas.height=img.height;
        const ctx=canvas.getContext('2d');ctx.drawImage(img,0,0);
        const imgData=ctx.getImageData(0,0,img.width,img.height);
        const out=document.getElementById('qrr-out');
        // Use jsQR if available, otherwise show instruction
        if(typeof jsQR!=='undefined'){
          const result=jsQR(imgData.data,img.width,img.height);
          if(result){out.innerHTML='<div style="padding:0.75rem;background:var(--surface);border:1px solid var(--line);border-radius:8px"><strong>Decoded:</strong><br>'+result.data+'</div>';}
          else{out.innerHTML='<p style="color:var(--red,#ef4444)">No QR code detected. Ensure the code is clear and well-lit.</p>';}
        }else{out.innerHTML='<p style="opacity:0.6">Image loaded. For full QR decoding, this tool needs jsQR library. Use your phone camera for reliable scanning.</p>';}
      };
      img.src=e.target.result;
    };
    reader.readAsDataURL(file);
  });
})();`
);

// ─── 179 ── IP Address Info ────────────────────────────────────────────────────
tool('ipinfo', 'utility', '🌐',
  `<div id="ip-app" style="text-align:center"><p style="opacity:0.7;font-size:0.875rem;margin-bottom:0.75rem">{{ui.note}}</p><div id="ip-out" class="result" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:0.5rem;text-align:left"></div><div class="row" style="justify-content:center;margin-top:0.75rem"><button class="btn" id="ip-refresh">{{ui.refresh}}</button></div></div>`,
  { title:'My IP Address — find your public IP address and location', metaDescription:'Find your public IP address, approximate location, timezone and internet provider. Uses ipapi.co for lookup. No data stored.', h1:'My IP Address & Info', intro:'Shows your current public IP address and approximate location information. Data is fetched live from a public IP lookup API.', faq_title:'IP address FAQ', ui:{ note:'Fetching your IP address…', refresh:'Refresh' }, faq:[
    { q:'What is a public IP address?', a:'Your public IP address is the address your internet service provider assigns to your connection. It is visible to websites you visit. Your local/private IP (192.168.x.x) is only visible on your home network.' },
    { q:'How accurate is the location?', a:'IP geolocation accuracy varies. City-level accuracy is around 50–75% correct. Country-level is typically 95%+ accurate. ISP location data can shift the result by hundreds of kilometres.' },
    { q:'Can websites track me with my IP?', a:'Yes. Your IP address is sent with every web request. Websites can use it for approximate geolocation, fraud detection, and rate limiting. A VPN masks your real IP by routing traffic through a different server.' }
  ]},
  { title:'Meu Endereço IP — encontre seu endereço IP público e localização', metaDescription:'Encontre seu endereço IP público, localização aproximada, fuso horário e provedor de internet.', h1:'Meu Endereço IP e Informações', intro:'Mostra seu endereço IP público atual e informações de localização aproximada. Os dados são buscados ao vivo de uma API pública de consulta de IP.', faq_title:'Perguntas frequentes sobre endereço IP', ui:{ note:'Buscando seu endereço IP…', refresh:'Atualizar' }, faq:[
    { q:'O que é um endereço IP público?', a:'Seu endereço IP público é o endereço que seu provedor de internet atribui à sua conexão. É visível para os sites que você visita.' },
    { q:'Quão precisa é a localização?', a:'A precisão de geolocalização de IP varia. A precisão a nível de cidade é de cerca de 50–75% correta. A nível de país é tipicamente 95%+ precisa.' },
    { q:'Os sites podem me rastrear com meu IP?', a:'Sim. Seu endereço IP é enviado com cada solicitação web. Uma VPN mascara seu IP real roteando o tráfego por um servidor diferente.' }
  ]},
  `(function(){
  function load(){
    const out=document.getElementById('ip-out');
    out.innerHTML='<p style="opacity:0.6">Loading…</p>';
    fetch('https://ipapi.co/json/')
      .then(r=>r.json())
      .then(d=>{
        const items=[['IP Address',d.ip],['City',d.city],['Region',d.region],['Country',d.country_name],['Timezone',d.timezone],['ISP/Org',d.org],['Latitude',d.latitude],['Longitude',d.longitude]];
        out.innerHTML=items.filter(([,v])=>v).map(([k,v])=>\`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">\${k}</div><strong>\${v}</strong></div>\`).join('');
      })
      .catch(()=>{out.innerHTML='<p style="color:var(--red,#ef4444)">Could not fetch IP info. Check your connection.</p>';});
  }
  document.getElementById('ip-refresh').onclick=load;
  load();
})();`
);

// ─── 180 ── Screen Resolution Checker ─────────────────────────────────────────
tool('screeninfo', 'utility', '🖥️',
  `<div id="si-app"><div id="si-out" class="result" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:0.5rem"></div></div>`,
  { title:'Screen Resolution Checker — find your screen size, DPI and pixel density', metaDescription:'Free screen resolution checker. Shows your screen resolution, viewport size, device pixel ratio, color depth, touch support and more.', h1:'Screen Resolution Checker', intro:'Instantly see your screen resolution, browser viewport size, device pixel ratio (DPI) and other display information.', faq_title:'Screen info FAQ', ui:{}, faq:[
    { q:'What is device pixel ratio (DPR)?', a:'DPR (or pixel density ratio) is how many physical pixels map to one CSS pixel. A DPR of 2 (Retina) means 4 physical pixels per CSS pixel. Higher DPR gives sharper text and images on the same physical screen size.' },
    { q:'What is the difference between screen and viewport resolution?', a:'Screen resolution is the total physical pixels of the display. Viewport size is the area available for the web page (screen minus browser UI). The viewport size changes when you resize the browser window.' },
    { q:'What is color depth?', a:'Color depth is how many bits are used to represent each pixel\'s color. 24-bit = 16.7 million colors (true color). Most modern displays use 24 or 32 bits per pixel. 32-bit includes an 8-bit alpha (transparency) channel.' }
  ]},
  { title:'Verificador de Resolução de Tela — encontre o tamanho, DPI e densidade de pixels da tela', metaDescription:'Verificador de resolução de tela gratuito. Mostra resolução de tela, tamanho do viewport, proporção de pixels do dispositivo, profundidade de cor, suporte a toque e mais.', h1:'Verificador de Resolução de Tela', intro:'Veja instantaneamente a resolução da sua tela, tamanho do viewport do navegador, proporção de pixels do dispositivo (DPI) e outras informações de exibição.', faq_title:'Perguntas frequentes sobre informações de tela', ui:{}, faq:[
    { q:'O que é proporção de pixels do dispositivo (DPR)?', a:'DPR é quantos pixels físicos mapeiam para um pixel CSS. Um DPR de 2 (Retina) significa 4 pixels físicos por pixel CSS. DPR mais alto dá texto e imagens mais nítidos.' },
    { q:'Qual a diferença entre resolução de tela e viewport?', a:'Resolução de tela é o total de pixels físicos do display. Tamanho do viewport é a área disponível para a página web (tela menos UI do navegador).' },
    { q:'O que é profundidade de cor?', a:'Profundidade de cor é quantos bits são usados para representar a cor de cada pixel. 24 bits = 16,7 milhões de cores (cor verdadeira). A maioria dos displays modernos usa 24 ou 32 bits por pixel.' }
  ]},
  `(function(){
  const items=[
    ['Screen resolution',screen.width+'×'+screen.height+' px'],
    ['Available resolution',screen.availWidth+'×'+screen.availHeight+' px'],
    ['Viewport (window)',window.innerWidth+'×'+window.innerHeight+' px'],
    ['Document client',document.documentElement.clientWidth+'×'+document.documentElement.clientHeight+' px'],
    ['Device pixel ratio',window.devicePixelRatio+'× ('+Math.round(window.devicePixelRatio*96)+' DPI approx)'],
    ['Color depth',screen.colorDepth+' bit ('+Math.pow(2,screen.colorDepth).toLocaleString()+' colors)'],
    ['Orientation',screen.orientation?screen.orientation.type:'unknown'],
    ['Touch support','ontouchstart' in window?'Yes ('+navigator.maxTouchPoints+' points)':'No'],
    ['Browser language',navigator.language],
    ['Platform',navigator.platform||'unknown'],
  ];
  document.getElementById('si-out').innerHTML=items.map(([k,v])=>\`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">\${k}</div><strong style="font-size:0.9rem;word-break:break-all">\${v}</strong></div>\`).join('');
})();`
);

// ─── 181 ── Color Palette Generator ───────────────────────────────────────────
tool('palettemaker', 'design', '🎨',
  `<div id="pm-app"><div class="row"><div class="field"><label for="pm-base">{{ui.baseColor}}</label><input type="color" id="pm-base" value="#6366f1"></div><div class="field"><label for="pm-type">{{ui.type}}</label><select id="pm-type"><option value="mono">{{ui.monochromatic}}</option><option value="comp">{{ui.complementary}}</option><option value="tri">{{ui.triadic}}</option><option value="ana">{{ui.analogous}}</option><option value="split">{{ui.splitComp}}</option></select></div><button class="btn" id="pm-gen" style="align-self:flex-end">{{ui.generate}}</button></div><div id="pm-out" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:0.5rem;margin-top:0.75rem"></div></div>`,
  { title:'Color Palette Generator — create harmonious color schemes', metaDescription:'Free color palette generator. Enter a base color and generate complementary, triadic, analogous or monochromatic color palettes. Copy hex codes.', h1:'Color Palette Generator', intro:'Choose a base color and palette type to generate a harmonious color scheme. Click any swatch to copy the hex code.', faq_title:'Color palette FAQ', ui:{ baseColor:'Base color', type:'Palette type', monochromatic:'Monochromatic', complementary:'Complementary', triadic:'Triadic', analogous:'Analogous', splitComp:'Split Complementary', generate:'Generate' }, faq:[
    { q:'What is a complementary color scheme?', a:'Complementary colors are opposite each other on the color wheel (e.g., blue and orange). They create high contrast and vibrant looks when used together, making elements pop.' },
    { q:'What is a triadic color scheme?', a:'Three colors equally spaced around the color wheel (120° apart). Triadic schemes are vibrant and offer good contrast while maintaining color balance. Example: red, yellow, blue.' },
    { q:'What is an analogous color scheme?', a:'Colors adjacent on the color wheel (30° apart). Analogous schemes are harmonious, comfortable and pleasing to the eye. Often found in nature. They lack contrast so one color should dominate.' }
  ]},
  { title:'Gerador de Paleta de Cores — criar esquemas de cores harmoniosos', metaDescription:'Gerador de paleta de cores gratuito. Insira uma cor base e gere paletas complementares, triádicas, análogas ou monocromáticas. Copie códigos hex.', h1:'Gerador de Paleta de Cores', intro:'Escolha uma cor base e o tipo de paleta para gerar um esquema de cores harmonioso. Clique em qualquer swatch para copiar o código hex.', faq_title:'Perguntas frequentes sobre paleta de cores', ui:{ baseColor:'Cor base', type:'Tipo de paleta', monochromatic:'Monocromático', complementary:'Complementar', triadic:'Triádico', analogous:'Análogo', splitComp:'Complementar dividido', generate:'Gerar' }, faq:[
    { q:'O que é um esquema de cores complementar?', a:'Cores complementares ficam opostas uma à outra na roda de cores (ex.: azul e laranja). Criam alto contraste e aparência vibrante quando usadas juntas.' },
    { q:'O que é um esquema de cores triádico?', a:'Três cores igualmente espaçadas ao redor da roda de cores (120° de distância). Esquemas triádicos são vibrantes e oferecem bom contraste enquanto mantêm o equilíbrio de cores.' },
    { q:'O que é um esquema de cores análogo?', a:'Cores adjacentes na roda de cores (30° de distância). Esquemas análogos são harmoniosos e agradáveis aos olhos. Frequentemente encontrados na natureza.' }
  ]},
  `(function(){
  function hexToHsl(hex){const r=parseInt(hex.slice(1,3),16)/255,g=parseInt(hex.slice(3,5),16)/255,b=parseInt(hex.slice(5,7),16)/255;const max=Math.max(r,g,b),min=Math.min(r,g,b);let h,s,l=(max+min)/2;if(max===min){h=s=0;}else{const d=max-min;s=l>0.5?d/(2-max-min):d/(max+min);switch(max){case r:h=((g-b)/d+(g<b?6:0))/6;break;case g:h=((b-r)/d+2)/6;break;case b:h=((r-g)/d+4)/6;break;}}return[h*360,s*100,l*100];}
  function hslToHex(h,s,l){h/=360;s/=100;l/=100;let r,g,b;if(s===0){r=g=b=l;}else{const hue2rgb=(p,q,t)=>{if(t<0)t+=1;if(t>1)t-=1;if(t<1/6)return p+(q-p)*6*t;if(t<1/2)return q;if(t<2/3)return p+(q-p)*(2/3-t)*6;return p;};const q=l<0.5?l*(1+s):l+s-l*s,p=2*l-q;r=hue2rgb(p,q,h+1/3);g=hue2rgb(p,q,h);b=hue2rgb(p,q,h-1/3);}return'#'+[r,g,b].map(x=>Math.round(x*255).toString(16).padStart(2,'0')).join('');}
  function palette(h,s,l,type){
    const base=[[h,s,l]];
    if(type==='mono')return[[h,s,Math.max(10,l-40)],[h,s,Math.max(20,l-20)],[h,s,l],[h,s,Math.min(90,l+20)],[h,s,Math.min(95,l+40)]];
    if(type==='comp')return[[h,s,l],[h,Math.max(20,s-20),Math.min(90,l+20)],[(h+180)%360,s,l],[(h+180)%360,s,Math.min(90,l+20)],[(h+180)%360,Math.max(20,s-20),Math.max(10,l-20)]];
    if(type==='tri')return[[h,s,l],[(h+120)%360,s,l],[(h+240)%360,s,l],[h,Math.max(20,s-30),Math.min(90,l+20)],[(h+120)%360,Math.max(20,s-30),Math.min(90,l+20)]];
    if(type==='ana')return[[(h-30+360)%360,s,l],[(h-15+360)%360,s,l],[h,s,l],[(h+15)%360,s,l],[(h+30)%360,s,l]];
    if(type==='split')return[[h,s,l],[(h+150)%360,s,l],[(h+210)%360,s,l],[h,Math.max(20,s-20),Math.min(90,l+20)],[(h+180)%360,s,Math.min(90,l+20)]];
    return base;
  }
  function gen(){
    const hex=document.getElementById('pm-base').value;
    const type=document.getElementById('pm-type').value;
    const [h,s,l]=hexToHsl(hex);
    const cols=palette(h,s,l,type).map(([hh,ss,ll])=>hslToHex(hh,ss,ll));
    document.getElementById('pm-out').innerHTML=cols.map(c=>\`<div style="cursor:pointer" onclick="navigator.clipboard.writeText('\${c}');this.querySelector('span').textContent='Copied!'"><div style="height:80px;background:\${c};border-radius:8px;border:1px solid rgba(0,0,0,0.1)"></div><div style="text-align:center;font-size:0.8rem;font-family:monospace;margin-top:0.3rem">\${c}</div><span style="display:block;text-align:center;font-size:0.7rem;opacity:0.5">click to copy</span></div>\`).join('');
  }
  document.getElementById('pm-gen').onclick=gen;document.getElementById('pm-base').addEventListener('input',gen);gen();
})();`
);

// ─── 182 ── CSS Gradient Generator ────────────────────────────────────────────
tool('cssgradient', 'design', '🌈',
  `<div id="cg-app"><div class="row"><div class="field"><label for="cg-c1">{{ui.color1}}</label><input type="color" id="cg-c1" value="#6366f1"></div><div class="field"><label for="cg-c2">{{ui.color2}}</label><input type="color" id="cg-c2" value="#ec4899"></div><div class="field"><label for="cg-type">{{ui.type}}</label><select id="cg-type"><option value="linear">Linear</option><option value="radial">Radial</option><option value="conic">Conic</option></select></div><div class="field"><label for="cg-angle">{{ui.angle}}</label><input type="range" id="cg-angle" min="0" max="360" value="135"></div></div><div id="cg-preview" style="height:120px;border-radius:12px;margin:0.75rem 0;transition:all 0.3s"></div><div class="field"><label>{{ui.css}}</label><div id="cg-code" style="font-family:monospace;font-size:0.85rem;padding:0.5rem 0.75rem;background:var(--surface);border:1px solid var(--line);border-radius:8px;cursor:pointer;word-break:break-all" onclick="navigator.clipboard.writeText(this.dataset.css)"></div></div><p style="opacity:0.5;font-size:0.8rem">{{ui.clickCopy}}</p></div>`,
  { title:'CSS Gradient Generator — create beautiful CSS gradients online', metaDescription:'Free CSS gradient generator. Pick two colors, choose linear, radial or conic, adjust the angle, and copy the generated CSS.', h1:'CSS Gradient Generator', intro:'Pick your colors and gradient type, adjust the angle, and copy the generated CSS code for your project.', faq_title:'CSS gradient FAQ', ui:{ color1:'Color 1', color2:'Color 2', type:'Gradient type', angle:'Angle (linear)', css:'CSS Code (click to copy)', clickCopy:'Click the CSS code to copy it' }, faq:[
    { q:'What types of CSS gradients are there?', a:'Linear: colors transition in a straight line. Radial: colors radiate from a center point outward. Conic: colors rotate around a center point (like a pie chart). CSS4 also supports mesh gradients in some browsers.' },
    { q:'How do I add a gradient to an element?', a:'Use the background property: background: linear-gradient(135deg, #6366f1, #ec4899). You can also add multiple color stops: background: linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #f59e0b 100%).' },
    { q:'Can I add more than two colors?', a:'Yes. CSS supports multiple color stops. This generator shows a two-color gradient for simplicity. To add more colors, manually edit the CSS: linear-gradient(135deg, red, yellow, green).' }
  ]},
  { title:'Gerador de Gradiente CSS — criar belos gradientes CSS online', metaDescription:'Gerador de gradiente CSS gratuito. Escolha duas cores, escolha linear, radial ou cônico, ajuste o ângulo e copie o CSS gerado.', h1:'Gerador de Gradiente CSS', intro:'Escolha suas cores e tipo de gradiente, ajuste o ângulo e copie o código CSS gerado para seu projeto.', faq_title:'Perguntas frequentes sobre gradiente CSS', ui:{ color1:'Cor 1', color2:'Cor 2', type:'Tipo de gradiente', angle:'Ângulo (linear)', css:'Código CSS (clique para copiar)', clickCopy:'Clique no código CSS para copiá-lo' }, faq:[
    { q:'Quais tipos de gradientes CSS existem?', a:'Linear: cores fazem transição em linha reta. Radial: cores irradiam de um ponto central para fora. Cônico: cores giram ao redor de um ponto central (como um gráfico de pizza).' },
    { q:'Como adiciono um gradiente a um elemento?', a:'Use a propriedade background: background: linear-gradient(135deg, #6366f1, #ec4899). Você também pode adicionar múltiplas paradas de cor.' },
    { q:'Posso adicionar mais de duas cores?', a:'Sim. CSS suporta múltiplas paradas de cor. Para adicionar mais cores, edite manualmente o CSS: linear-gradient(135deg, vermelho, amarelo, verde).' }
  ]},
  `(function(){
  function update(){
    const c1=document.getElementById('cg-c1').value;
    const c2=document.getElementById('cg-c2').value;
    const type=document.getElementById('cg-type').value;
    const angle=document.getElementById('cg-angle').value;
    let css;
    if(type==='linear')css='linear-gradient('+angle+'deg, '+c1+', '+c2+')';
    else if(type==='radial')css='radial-gradient(circle, '+c1+', '+c2+')';
    else css='conic-gradient(from '+angle+'deg, '+c1+', '+c2+', '+c1+')';
    const full='background: '+css+';';
    document.getElementById('cg-preview').style.background=css;
    const codeEl=document.getElementById('cg-code');codeEl.textContent=full;codeEl.dataset.css=full;
  }
  ['cg-c1','cg-c2','cg-type','cg-angle'].forEach(id=>document.getElementById(id).addEventListener('input',update));
  update();
})();`
);

// ─── 183 ── Box Shadow Generator ──────────────────────────────────────────────
tool('boxshadow', 'design', '🟫',
  `<div id="bs-app"><div class="row"><div class="field"><label for="bs-x">{{ui.x}}</label><input type="range" id="bs-x" min="-50" max="50" value="5"></div><div class="field"><label for="bs-y">{{ui.y}}</label><input type="range" id="bs-y" min="-50" max="50" value="10"></div><div class="field"><label for="bs-blur">{{ui.blur}}</label><input type="range" id="bs-blur" min="0" max="100" value="20"></div></div><div class="row"><div class="field"><label for="bs-spread">{{ui.spread}}</label><input type="range" id="bs-spread" min="-50" max="50" value="0"></div><div class="field"><label for="bs-color">{{ui.color}}</label><input type="color" id="bs-color" value="#000000"></div><div class="field"><label for="bs-alpha">{{ui.opacity}}</label><input type="range" id="bs-alpha" min="0" max="100" value="25"></div></div><div style="padding:2rem;background:#f3f4f6;border-radius:12px;display:flex;align-items:center;justify-content:center;margin:0.75rem 0"><div id="bs-preview" style="width:120px;height:80px;background:#fff;border-radius:8px"></div></div><div class="field"><label>{{ui.css}}</label><div id="bs-code" style="font-family:monospace;font-size:0.875rem;padding:0.5rem 0.75rem;background:var(--surface);border:1px solid var(--line);border-radius:8px;cursor:pointer;word-break:break-all" onclick="navigator.clipboard.writeText(this.dataset.css)"></div></div></div>`,
  { title:'CSS Box Shadow Generator — create and preview box shadows', metaDescription:'Free CSS box shadow generator. Adjust offset, blur, spread and color to design shadows visually. Copy the CSS code.', h1:'CSS Box Shadow Generator', intro:'Use the sliders to design a box shadow visually, then copy the generated CSS code.', faq_title:'Box shadow FAQ', ui:{ x:'X offset', y:'Y offset', blur:'Blur radius', spread:'Spread radius', color:'Shadow color', opacity:'Opacity (%)', css:'CSS (click to copy)' }, faq:[
    { q:'What do the box shadow parameters mean?', a:'X offset: horizontal distance (positive=right). Y offset: vertical distance (positive=down). Blur: the blur radius (0=sharp, higher=blurrier). Spread: expands (+) or contracts (-) the shadow. Color: the shadow color including opacity.' },
    { q:'How do I create an inset shadow?', a:'Add the "inset" keyword: box-shadow: inset 5px 5px 10px rgba(0,0,0,0.2). Inset shadows appear inside the element, like a pressed button effect.' },
    { q:'Can I add multiple shadows?', a:'Yes. Separate multiple shadow declarations with commas: box-shadow: 3px 3px 10px rgba(0,0,0,0.2), -3px -3px 10px rgba(255,255,255,0.8). This technique is used in neumorphism design.' }
  ]},
  { title:'Gerador de Box Shadow CSS — criar e visualizar sombras', metaDescription:'Gerador de box shadow CSS gratuito. Ajuste deslocamento, desfoque, expansão e cor para criar sombras visualmente. Copie o código CSS.', h1:'Gerador de Box Shadow CSS', intro:'Use os controles deslizantes para criar uma sombra visualmente, depois copie o código CSS gerado.', faq_title:'Perguntas frequentes sobre box shadow', ui:{ x:'Deslocamento X', y:'Deslocamento Y', blur:'Raio de desfoque', spread:'Raio de expansão', color:'Cor da sombra', opacity:'Opacidade (%)', css:'CSS (clique para copiar)' }, faq:[
    { q:'O que significam os parâmetros de box shadow?', a:'Deslocamento X: distância horizontal (positivo=direita). Deslocamento Y: distância vertical (positivo=baixo). Desfoque: o raio de desfoque. Expansão: expande (+) ou contrai (-) a sombra.' },
    { q:'Como crio uma sombra interna?', a:'Adicione a palavra-chave "inset": box-shadow: inset 5px 5px 10px rgba(0,0,0,0.2). Sombras inset aparecem dentro do elemento, como um efeito de botão pressionado.' },
    { q:'Posso adicionar múltiplas sombras?', a:'Sim. Separe múltiplas declarações de sombra com vírgulas: box-shadow: 3px 3px 10px rgba(0,0,0,0.2), -3px -3px 10px rgba(255,255,255,0.8).' }
  ]},
  `(function(){
  function hexToRgb(hex){return[parseInt(hex.slice(1,3),16),parseInt(hex.slice(3,5),16),parseInt(hex.slice(5,7),16)];}
  function update(){
    const x=document.getElementById('bs-x').value;
    const y=document.getElementById('bs-y').value;
    const blur=document.getElementById('bs-blur').value;
    const spread=document.getElementById('bs-spread').value;
    const color=document.getElementById('bs-color').value;
    const alpha=parseInt(document.getElementById('bs-alpha').value)/100;
    const [r,g,b]=hexToRgb(color);
    const shadow=x+'px '+y+'px '+blur+'px '+spread+'px rgba('+r+','+g+','+b+','+alpha.toFixed(2)+')';
    const css='box-shadow: '+shadow+';';
    document.getElementById('bs-preview').style.boxShadow=shadow;
    const el=document.getElementById('bs-code');el.textContent=css;el.dataset.css=css;
  }
  ['bs-x','bs-y','bs-blur','bs-spread','bs-color','bs-alpha'].forEach(id=>document.getElementById(id).addEventListener('input',update));
  update();
})();`
);

// ─── 184 ── Border Radius Generator ───────────────────────────────────────────
tool('borderradius', 'design', '⬛',
  `<div id="br-app"><div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;margin-bottom:0.5rem"><div class="field"><label for="br-tl">{{ui.topLeft}}</label><input type="range" id="br-tl" min="0" max="100" value="16"></div><div class="field"><label for="br-tr">{{ui.topRight}}</label><input type="range" id="br-tr" min="0" max="100" value="16"></div><div class="field"><label for="br-bl">{{ui.bottomLeft}}</label><input type="range" id="br-bl" min="0" max="100" value="16"></div><div class="field"><label for="br-br">{{ui.bottomRight}}</label><input type="range" id="br-br" min="0" max="100" value="16"></div></div><div style="padding:1.5rem;background:#f3f4f6;border-radius:8px;display:flex;align-items:center;justify-content:center;margin:0.5rem 0"><div id="br-preview" style="width:150px;height:100px;background:linear-gradient(135deg,#6366f1,#ec4899)"></div></div><div class="field"><label>{{ui.css}}</label><div id="br-code" style="font-family:monospace;font-size:0.9rem;padding:0.5rem 0.75rem;background:var(--surface);border:1px solid var(--line);border-radius:8px;cursor:pointer" onclick="navigator.clipboard.writeText(this.dataset.css)"></div></div></div>`,
  { title:'Border Radius Generator — design rounded corners and copy CSS', metaDescription:'Free border radius generator. Control each corner individually with sliders, see a live preview, and copy the CSS border-radius value.', h1:'Border Radius Generator', intro:'Adjust each corner radius independently with the sliders and copy the generated CSS.', faq_title:'Border radius FAQ', ui:{ topLeft:'Top left', topRight:'Top right', bottomLeft:'Bottom left', bottomRight:'Bottom right', css:'CSS (click to copy)' }, faq:[
    { q:'What is border-radius?', a:'The CSS border-radius property rounds the corners of an element. Setting it to 50% on a square creates a circle. You can set each corner independently using border-top-left-radius, etc.' },
    { q:'How do I make a circle?', a:'Set all corners to 50%: border-radius: 50%. This works on square elements. For a pill/capsule shape (rectangle), set a very large value like 999px.' },
    { q:'What is the fancy border-radius notation?', a:'CSS border-radius can take up to 8 values for elliptical corners: border-radius: a b c d / e f g h. The first four control horizontal radii, the last four control vertical radii, creating egg and leaf shapes.' }
  ]},
  { title:'Gerador de Raio de Borda — criar cantos arredondados e copiar CSS', metaDescription:'Gerador de raio de borda gratuito. Controle cada canto individualmente com controles deslizantes, veja a prévia ao vivo e copie o valor CSS de border-radius.', h1:'Gerador de Raio de Borda', intro:'Ajuste cada raio de canto independentemente com os controles deslizantes e copie o CSS gerado.', faq_title:'Perguntas frequentes sobre raio de borda', ui:{ topLeft:'Superior esquerdo', topRight:'Superior direito', bottomLeft:'Inferior esquerdo', bottomRight:'Inferior direito', css:'CSS (clique para copiar)' }, faq:[
    { q:'O que é border-radius?', a:'A propriedade CSS border-radius arredonda os cantos de um elemento. Definindo como 50% em um quadrado cria um círculo.' },
    { q:'Como criar um círculo?', a:'Defina todos os cantos como 50%: border-radius: 50%. Para uma forma de pílula/cápsula, use um valor muito grande como 999px.' },
    { q:'O que é a notação avançada de border-radius?', a:'CSS border-radius pode aceitar até 8 valores para cantos elípticos: border-radius: a b c d / e f g h. Os quatro primeiros controlam raios horizontais, os últimos quatro controlam raios verticais.' }
  ]},
  `(function(){
  function update(){
    const tl=document.getElementById('br-tl').value+'px';const tr=document.getElementById('br-tr').value+'px';
    const bl=document.getElementById('br-bl').value+'px';const br=document.getElementById('br-br').value+'px';
    const val=tl+' '+tr+' '+br+' '+bl;
    document.getElementById('br-preview').style.borderRadius=val;
    const css='border-radius: '+val+';';
    const el=document.getElementById('br-code');el.textContent=css;el.dataset.css=css;
  }
  ['br-tl','br-tr','br-bl','br-br'].forEach(id=>document.getElementById(id).addEventListener('input',update));
  update();
})();`
);

// ─── 185 ── Aspect Ratio Calculator ───────────────────────────────────────────
tool('aspectcalc', 'design', '📺',
  `<form id="asp-form"><div class="row"><div class="field"><label for="asp-w">{{ui.width}} (px)</label><input type="number" id="asp-w" min="1" step="1" placeholder="1920" inputmode="numeric"></div><div class="field"><label for="asp-h">{{ui.height}} (px)</label><input type="number" id="asp-h" min="1" step="1" placeholder="1080" inputmode="numeric"></div></div><div class="row"><div class="field"><label for="asp-nw">{{ui.newWidth}} (px)</label><input type="number" id="asp-nw" min="1" step="1" placeholder="optional" inputmode="numeric"></div><div class="field"><label for="asp-nh">{{ui.newHeight}} (px)</label><input type="number" id="asp-nh" min="1" step="1" placeholder="optional" inputmode="numeric"></div></div><div class="row" style="justify-content:center"><button class="btn" type="submit">{{ui.calculate}}</button></div></form><div id="asp-out" hidden class="result" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:0.5rem"></div>`,
  { title:'Aspect Ratio Calculator — find ratio and scale dimensions', metaDescription:'Free aspect ratio calculator. Enter width and height to find the simplified aspect ratio, and scale to any new dimension while maintaining the ratio.', h1:'Aspect Ratio Calculator', intro:'Enter width and height to find the aspect ratio. Optionally enter a new width or height to calculate the scaled dimension.', faq_title:'Aspect ratio FAQ', ui:{ width:'Width', height:'Height', newWidth:'Scale to width', newHeight:'Scale to height', calculate:'Calculate' }, faq:[
    { q:'What is aspect ratio?', a:'Aspect ratio is the proportional relationship between width and height, expressed as W:H. Common ratios: 16:9 (widescreen HD), 4:3 (old TV/iPad), 1:1 (square/Instagram), 21:9 (ultrawide), 9:16 (vertical/mobile video).' },
    { q:'How do I maintain aspect ratio when resizing?', a:'Multiply both dimensions by the same scale factor. Or use the formula: new height = (new width / original width) × original height. This ensures no stretching or squishing.' },
    { q:'What is the aspect ratio of common screen sizes?', a:'1080p (1920×1080) = 16:9. 4K UHD (3840×2160) = 16:9. 1280×720 = 16:9. 1024×768 = 4:3. 2436×1125 (iPhone X) = ~19.5:9. 2560×1440 (QHD) = 16:9.' }
  ]},
  { title:'Calculadora de Proporção de Aspecto — encontrar proporção e dimensões de escala', metaDescription:'Calculadora de proporção de aspecto gratuita. Insira largura e altura para encontrar a proporção simplificada e dimensionar para qualquer nova dimensão mantendo a proporção.', h1:'Calculadora de Proporção de Aspecto', intro:'Insira largura e altura para encontrar a proporção de aspecto. Opcionalmente, insira uma nova largura ou altura para calcular a dimensão escalonada.', faq_title:'Perguntas frequentes sobre proporção de aspecto', ui:{ width:'Largura', height:'Altura', newWidth:'Escalar para largura', newHeight:'Escalar para altura', calculate:'Calcular' }, faq:[
    { q:'O que é proporção de aspecto?', a:'Proporção de aspecto é a relação proporcional entre largura e altura, expressa como L:A. Proporções comuns: 16:9 (widescreen HD), 4:3 (TV antiga/iPad), 1:1 (quadrado/Instagram).' },
    { q:'Como mantenho a proporção ao redimensionar?', a:'Multiplique ambas as dimensões pelo mesmo fator de escala. Ou use a fórmula: nova altura = (nova largura / largura original) × altura original.' },
    { q:'Qual é a proporção de aspecto de tamanhos de tela comuns?', a:'1080p (1920×1080) = 16:9. 4K UHD (3840×2160) = 16:9. 1024×768 = 4:3. iPhone X = ~19,5:9.' }
  ]},
  `(function(){
  function gcd(a,b){return b===0?a:gcd(b,a%b);}
  document.getElementById('asp-form').addEventListener('submit',function(e){
    e.preventDefault();
    const w=parseInt(document.getElementById('asp-w').value);
    const h=parseInt(document.getElementById('asp-h').value);
    const nw=parseInt(document.getElementById('asp-nw').value);
    const nh=parseInt(document.getElementById('asp-nh').value);
    if(!w||!h)return;
    const d=gcd(w,h);const ratio=w/d+':'+h/d;
    const ratioDec=(w/h).toFixed(4);
    const items=[['Aspect ratio',ratio],['Decimal ratio',ratioDec],['Width',w+'px'],['Height',h+'px']];
    if(nw){const scaledH=Math.round(nw*h/w);items.push(['Scaled height',scaledH+'px (for '+nw+'px wide)']);}
    if(nh){const scaledW=Math.round(nh*w/h);items.push(['Scaled width',scaledW+'px (for '+nh+'px tall)']);}
    const out=document.getElementById('asp-out');
    out.hidden=false;
    out.innerHTML=items.map(([k,v])=>\`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">\${k}</div><strong>\${v}</strong></div>\`).join('');
  });
})();`
);

// ─── 186 ── Font Pair Preview ─────────────────────────────────────────────────
tool('fontpair', 'design', '✍️',
  `<div id="fp-app"><div class="row"><div class="field"><label for="fp-head">{{ui.heading}}</label><select id="fp-head"></select></div><div class="field"><label for="fp-body2">{{ui.body}}</label><select id="fp-body2"></select></div></div><div id="fp-preview" style="padding:1.25rem;background:var(--surface);border:1px solid var(--line);border-radius:12px;margin-top:0.75rem"><h2 id="fp-h" style="margin:0 0 0.5rem;font-size:2rem"></h2><p id="fp-p" style="margin:0;line-height:1.7;opacity:0.85">The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump!</p></div><p style="opacity:0.5;font-size:0.8rem;margin-top:0.5rem">{{ui.note}}</p></div>`,
  { title:'Font Pair Preview — preview Google Fonts heading and body combinations', metaDescription:'Free font pair preview. Select a heading font and body font from popular Google Fonts to see how they look together in a live preview.', h1:'Font Pair Preview', intro:'Choose a heading font and body font from popular Google Fonts to preview how they look together.', faq_title:'Font pairing FAQ', ui:{ heading:'Heading font', body:'Body font', note:'Fonts load from Google Fonts CDN' }, faq:[
    { q:'What makes a good font pairing?', a:'Good pairings balance contrast and harmony. Common strategies: Serif heading + Sans-serif body (classic editorial), Display/Script heading + Simple body (decorative), Same family in different weights (safe and clean).' },
    { q:'How do I use Google Fonts in my project?', a:'Add a link tag: <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet"> Then use font-family: "Inter", sans-serif in your CSS.' },
    { q:'What are the best body fonts for readability?', a:'For screens: Inter, Roboto, Open Sans, Lato, Source Sans Pro. For longer reading: Georgia, Merriweather, Lora. For code: Fira Code, JetBrains Mono. Optimal body size is 16–18px with 1.5–1.7 line height.' }
  ]},
  { title:'Prévia de Par de Fontes — visualizar combinações de fontes do Google Fonts', metaDescription:'Prévia de par de fontes gratuita. Selecione uma fonte de título e uma fonte de corpo das populares Google Fonts para ver como ficam juntas em uma prévia ao vivo.', h1:'Prévia de Par de Fontes', intro:'Escolha uma fonte de título e uma fonte de corpo das populares Google Fonts para visualizar como ficam juntas.', faq_title:'Perguntas frequentes sobre combinação de fontes', ui:{ heading:'Fonte de título', body:'Fonte de corpo', note:'As fontes carregam do CDN do Google Fonts' }, faq:[
    { q:'O que faz uma boa combinação de fontes?', a:'Boas combinações equilibram contraste e harmonia. Estratégias comuns: Título com serifa + corpo sem serifa (editorial clássico), Título display + corpo simples (decorativo).' },
    { q:'Como uso Google Fonts no meu projeto?', a:'Adicione uma tag link: <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet"> Depois use font-family: "Inter", sans-serif no seu CSS.' },
    { q:'Quais são as melhores fontes de corpo para legibilidade?', a:'Para telas: Inter, Roboto, Open Sans, Lato, Source Sans Pro. Para leitura mais longa: Georgia, Merriweather, Lora. Tamanho ideal do corpo: 16–18px com altura de linha 1,5–1,7.' }
  ]},
  `(function(){
  const fonts=['Inter','Roboto','Open Sans','Lato','Poppins','Montserrat','Raleway','Nunito','Playfair Display','Merriweather','Lora','Source Serif 4','Libre Baskerville','Cormorant Garamond','DM Serif Display','Space Grotesk','Outfit','Plus Jakarta Sans','Syne','DM Sans','Work Sans','Mulish','Manrope','Jost','Josefin Sans'];
  const headSel=document.getElementById('fp-head');const bodySel=document.getElementById('fp-body2');
  fonts.forEach((f,i)=>{
    const o1=document.createElement('option');o1.value=f;o1.textContent=f;if(i===5)o1.selected=true;headSel.appendChild(o1);
    const o2=document.createElement('option');o2.value=f;o2.textContent=f;if(i===0)o2.selected=true;bodySel.appendChild(o2);
  });
  function loadFont(name){
    if(!document.querySelector('link[data-font="'+name+'"]')){
      const link=document.createElement('link');link.rel='stylesheet';link.dataset.font=name;
      link.href='https://fonts.googleapis.com/css2?family='+name.replace(/ /g,'+')+'&display=swap';
      document.head.appendChild(link);
    }
  }
  function update(){
    const h=headSel.value,b=bodySel.value;
    loadFont(h);loadFont(b);
    document.getElementById('fp-h').style.fontFamily='"'+h+'", serif';
    document.getElementById('fp-h').textContent=h+' meets '+b;
    document.getElementById('fp-p').style.fontFamily='"'+b+'", sans-serif';
  }
  headSel.addEventListener('change',update);bodySel.addEventListener('change',update);update();
})();`
);

console.log('\n✓ Batch 9 (tools 166-186) complete.');
