#!/usr/bin/env node
// gen-batch11b.mjs — tools 229-250
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

// Write each tool: json config + js file separately (no embedded template literals for JS)
function tool(slug, category, icon, widget, en, pt, jsContent) {
  console.log(`\n[${slug}]`);
  const config = { slug, category, icon, script: `${slug}.js`, widget, strings: { en, pt } };
  write(`data/tools/${slug}.json`, JSON.stringify(config, null, 2));
  write(`public/assets/tools/${slug}.js`, jsContent);
}

// ─── 229  Emoji Text Translator ───────────────────────────────────────────────
tool('emojitranslator', 'fun', '[E]',
`<div id="et-app"><textarea id="et-in" rows="4" style="width:100%;padding:0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text);font-size:1rem" placeholder="{{ui.placeholder}}"></textarea><button class="btn" id="et-go" style="margin-top:0.5rem">{{ui.convert}}</button><div id="et-out" style="margin-top:0.75rem;padding:0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);font-size:1.1rem;min-height:3rem;word-break:break-all;line-height:1.8"></div></div>`,
{title:'Emoji Text Translator',metaDescription:'Type text and automatically add relevant emojis based on keywords.',h1:'Emoji Text Translator',intro:'Type your text and click Convert to automatically add relevant emojis based on keywords.',faq_title:'Emoji translator FAQ',ui:{placeholder:'Type your text here and we will add emojis...',convert:'Add Emojis'},faq:[
  {q:'How does the emoji translation work?',a:'The tool scans your text for keywords and appends relevant emojis after matching words.'},
  {q:'Why do some words not get emojis?',a:'Only words in the keyword database get emojis. Abstract concepts and proper nouns may not have mappings.'},
  {q:'Can I use this for professional communication?',a:'Use with caution in professional contexts. Emojis can add warmth to casual messages but are inappropriate for formal documents.'}
]},
{title:'Tradutor de Emoji de Texto',metaDescription:'Digite texto e adicione automaticamente emojis relevantes.',h1:'Tradutor de Emoji de Texto',intro:'Digite seu texto e clique em Converter para adicionar emojis relevantes automaticamente.',faq_title:'FAQ tradutor de emoji',ui:{placeholder:'Digite seu texto aqui e adicionaremos emojis...',convert:'Adicionar Emojis'},faq:[
  {q:'Como funciona a traducao de emoji?',a:'A ferramenta verifica seu texto em busca de palavras-chave e adiciona emojis relevantes apos as palavras correspondentes.'},
  {q:'Por que algumas palavras nao recebem emojis?',a:'Apenas palavras no banco de dados recebem emojis.'},
  {q:'Posso usar isso para comunicacao profissional?',a:'Use com cautela. Emojis sao geralmente inadequados para documentos formais.'}
]},
// JS written as a regular string (no embedded template literal)
[
'(function(){',
'  var map={',
'    happy:":-)", sad:":-(",  love:"<3",   heart:"<3",',
'    sun:"[sun]",  moon:"[moon]", star:"[star]", fire:"[fire]",',
'    water:"[~]",  earth:"[O]",  rain:"[r]",  snow:"[*]",',
'    food:"[f]",   pizza:"[p]",  coffee:"[c]", beer:"[b]",',
'    cat:"[cat]",  dog:"[dog]",  fish:"[^]",  bird:"[>]",',
'    tree:"[T]",   flower:"[fl]", music:"[♪]", sport:"[s]",',
'    game:"[G]",   book:"[B]",   home:"[H]",  car:"[C]",',
'    plane:"[>]",  money:"[$]",  work:"[W]",  phone:"[P]",',
'    computer:"[pc]", sleep:"[z]", laugh:"xD", cry:"TT",',
'    angry:"[!]",  cool:"B)",   party:"\\\\o/", gift:"[g]",',
'    good:"(+1)",  bad:"(-1)",  strong:"[s]", run:"[>]",',
'    eat:"[e]",    gym:"[G]",   travel:"[T]", idea:"[!]",',
'    yes:"[Y]",    no:"[N]",    warning:"[W]", code:"[{}]",',
'    art:"[art]"',
'  };',
'  document.getElementById("et-go").onclick = function() {',
'    var text = document.getElementById("et-in").value;',
'    var result = text.replace(/\\b(\\w+)\\b/g, function(word) {',
'      var em = map[word.toLowerCase()];',
'      return em ? word + " " + em : word;',
'    });',
'    document.getElementById("et-out").textContent = result || "Type something above!";',
'  };',
'})();',
].join('\n')
);

// ─── 230  Keyboard Shortcut Reference ─────────────────────────────────────────
tool('keyboardshortcuts', 'productivity', '[KB]',
`<div id="ks-app"><div class="row"><input type="text" id="ks-search" placeholder="{{ui.search}}" style="flex:1;padding:0.5rem 0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)"><select id="ks-app-sel" style="padding:0.5rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)"><option value="all">All</option><option value="windows">Windows</option><option value="mac">Mac</option><option value="excel">Excel</option><option value="vscode">VS Code</option><option value="chrome">Chrome</option></select></div><div id="ks-list" style="display:grid;gap:0.3rem;margin-top:0.5rem"></div></div>`,
{title:'Keyboard Shortcut Reference',metaDescription:'Browse and search keyboard shortcuts for Windows, Mac, Excel, VS Code and Chrome.',h1:'Keyboard Shortcut Reference',intro:'Browse and search keyboard shortcuts for Windows, Mac, Excel, VS Code and Chrome. Filter by application.',faq_title:'Keyboard shortcuts FAQ',ui:{search:'Search shortcuts...'},faq:[
  {q:'What are the most important keyboard shortcuts?',a:'Ctrl+C (Copy), Ctrl+X (Cut), Ctrl+V (Paste), Ctrl+Z (Undo), Ctrl+S (Save), Ctrl+A (Select all), Ctrl+F (Find).'},
  {q:'How do I learn keyboard shortcuts?',a:'Learn 2-3 new shortcuts per week until they become automatic. Print a cheat sheet.'},
  {q:'Do shortcuts differ between Windows and Mac?',a:'Yes. Mac uses Cmd instead of Ctrl. Windows uses Alt for menu access.'}
]},
{title:'Referencia de Atalhos de Teclado',metaDescription:'Navegue e pesquise atalhos para Windows, Mac, Excel, VS Code e Chrome.',h1:'Referencia de Atalhos de Teclado',intro:'Navegue e pesquise atalhos de teclado. Filtre por aplicativo.',faq_title:'FAQ atalhos',ui:{search:'Pesquisar atalhos...'},faq:[
  {q:'Quais sao os atalhos mais importantes?',a:'Ctrl+C, Ctrl+V, Ctrl+Z, Ctrl+S, Ctrl+A, Ctrl+F.'},
  {q:'Como aprendo atalhos?',a:'Aprenda 2-3 novos atalhos por semana ate que se tornem automaticos.'},
  {q:'Os atalhos diferem entre Windows e Mac?',a:'Sim. Mac usa Cmd em vez de Ctrl para a maioria dos atalhos.'}
]},
[
'(function(){',
'  var shortcuts=[',
'    {app:"windows",key:"Ctrl+C",desc:"Copy"},{app:"windows",key:"Ctrl+X",desc:"Cut"},{app:"windows",key:"Ctrl+V",desc:"Paste"},',
'    {app:"windows",key:"Ctrl+Z",desc:"Undo"},{app:"windows",key:"Ctrl+Y",desc:"Redo"},{app:"windows",key:"Ctrl+S",desc:"Save"},',
'    {app:"windows",key:"Ctrl+A",desc:"Select all"},{app:"windows",key:"Ctrl+F",desc:"Find"},{app:"windows",key:"Alt+F4",desc:"Close window"},',
'    {app:"windows",key:"Win+D",desc:"Show desktop"},{app:"windows",key:"Win+E",desc:"File Explorer"},{app:"windows",key:"Win+L",desc:"Lock screen"},',
'    {app:"windows",key:"Alt+Tab",desc:"Switch windows"},{app:"windows",key:"Ctrl+Shift+Esc",desc:"Task Manager"},',
'    {app:"mac",key:"Cmd+C",desc:"Copy"},{app:"mac",key:"Cmd+X",desc:"Cut"},{app:"mac",key:"Cmd+V",desc:"Paste"},',
'    {app:"mac",key:"Cmd+Z",desc:"Undo"},{app:"mac",key:"Cmd+Shift+Z",desc:"Redo"},{app:"mac",key:"Cmd+S",desc:"Save"},',
'    {app:"mac",key:"Cmd+A",desc:"Select all"},{app:"mac",key:"Cmd+Space",desc:"Spotlight search"},{app:"mac",key:"Cmd+Q",desc:"Quit app"},',
'    {app:"mac",key:"Cmd+Tab",desc:"Switch apps"},{app:"mac",key:"Cmd+Shift+3",desc:"Screenshot"},',
'    {app:"excel",key:"Ctrl+;",desc:"Insert date"},{app:"excel",key:"Ctrl+Home",desc:"Go to A1"},',
'    {app:"excel",key:"F2",desc:"Edit cell"},{app:"excel",key:"Alt+=",desc:"AutoSum"},{app:"excel",key:"Ctrl+1",desc:"Format Cells"},',
'    {app:"excel",key:"Ctrl+Shift+L",desc:"Toggle filters"},{app:"excel",key:"F4",desc:"Toggle $ in formula"},',
'    {app:"vscode",key:"Ctrl+P",desc:"Quick open file"},{app:"vscode",key:"Ctrl+Shift+P",desc:"Command palette"},',
'    {app:"vscode",key:"Ctrl+/",desc:"Toggle comment"},{app:"vscode",key:"Alt+Up",desc:"Move line up"},',
'    {app:"vscode",key:"Ctrl+D",desc:"Multi-cursor on word"},{app:"vscode",key:"F12",desc:"Go to definition"},',
'    {app:"chrome",key:"Ctrl+T",desc:"New tab"},{app:"chrome",key:"Ctrl+W",desc:"Close tab"},',
'    {app:"chrome",key:"Ctrl+L",desc:"Focus address bar"},{app:"chrome",key:"Ctrl+Shift+T",desc:"Reopen closed tab"},',
'    {app:"chrome",key:"Ctrl+R",desc:"Reload"},{app:"chrome",key:"F12",desc:"DevTools"}',
'  ];',
'  function render(){',
'    var q=document.getElementById("ks-search").value.toLowerCase();',
'    var app=document.getElementById("ks-app-sel").value;',
'    var f=shortcuts.filter(function(s){return (app==="all"||s.app===app)&&(!q||(s.key+s.desc).toLowerCase().indexOf(q)>=0);});',
'    document.getElementById("ks-list").innerHTML=f.map(function(s){',
'      return "<div style=\\"display:grid;grid-template-columns:160px 1fr auto;gap:0.5rem;align-items:center;padding:0.4rem 0.6rem;background:var(--surface);border:1px solid var(--line);border-radius:6px;font-size:0.875rem\\"><code style=\\"font-family:monospace;color:var(--accent,#6366f1)\\">"+s.key+"</code><span>"+s.desc+"</span><span style=\\"opacity:0.4;font-size:0.75rem\\">"+s.app+"</span></div>";',
'    }).join("");',
'  }',
'  document.getElementById("ks-search").addEventListener("input",render);',
'  document.getElementById("ks-app-sel").addEventListener("change",render);',
'  render();',
'})();',
].join('\n')
);

// ─── 231  NATO Phonetic Alphabet ───────────────────────────────────────────────
tool('natoalphabet', 'utility', '[NA]',
`<div id="na-app"><div class="field"><input type="text" id="na-in" placeholder="{{ui.placeholder}}" style="width:100%;padding:0.5rem 0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text);font-size:1.1rem"></div><div id="na-out" style="margin-top:0.75rem;font-size:1rem;line-height:2;display:flex;flex-wrap:wrap;gap:0.4rem"></div></div>`,
{title:'NATO Phonetic Alphabet Converter',metaDescription:'Convert text to NATO phonetic alphabet (Alpha, Bravo, Charlie...).',h1:'NATO Phonetic Alphabet',intro:'Type any text to convert it to NATO phonetic alphabet. Useful for spelling out words clearly over phone or radio.',faq_title:'NATO alphabet FAQ',ui:{placeholder:'Type text to convert...'},faq:[
  {q:'What is the NATO phonetic alphabet?',a:'Alpha, Bravo, Charlie, Delta, Echo, Foxtrot, Golf, Hotel, India, Juliet, Kilo, Lima, Mike, November, Oscar, Papa, Quebec, Romeo, Sierra, Tango, Uniform, Victor, Whiskey, X-ray, Yankee, Zulu.'},
  {q:'When is the phonetic alphabet used?',a:'Military, police, aviation, emergency services, telephone customer service for spelling out identifiers.'},
  {q:'Why these words?',a:'Chosen to be phonetically distinct in all major languages. Adopted by NATO in 1956.'}
]},
{title:'Conversor de Alfabeto Fonetico OTAN',metaDescription:'Converta texto para alfabeto fonetico OTAN.',h1:'Alfabeto Fonetico OTAN',intro:'Digite qualquer texto para converte-lo em alfabeto fonetico OTAN.',faq_title:'FAQ OTAN',ui:{placeholder:'Digite texto para converter...'},faq:[
  {q:'O que e o alfabeto fonetico OTAN?',a:'Alpha, Bravo, Charlie, Delta, Echo, Foxtrot, Golf, Hotel, India, Juliet, Kilo, Lima, Mike, November, Oscar, Papa, Quebec, Romeo, Sierra, Tango, Uniform, Victor, Whiskey, X-ray, Yankee, Zulu.'},
  {q:'Quando o alfabeto fonetico e usado?',a:'Comunicacoes militares e policiais, aviacao, servicos de emergencia.'},
  {q:'Por que essas palavras?',a:'Escolhidas por serem foneticamente distintas em todos os principais idiomas. Adotado pela OTAN em 1956.'}
]},
[
'(function(){',
'  var nato={A:"Alpha",B:"Bravo",C:"Charlie",D:"Delta",E:"Echo",F:"Foxtrot",G:"Golf",H:"Hotel",',
'    I:"India",J:"Juliet",K:"Kilo",L:"Lima",M:"Mike",N:"November",O:"Oscar",P:"Papa",',
'    Q:"Quebec",R:"Romeo",S:"Sierra",T:"Tango",U:"Uniform",V:"Victor",W:"Whiskey",',
'    X:"X-ray",Y:"Yankee",Z:"Zulu",',
'    0:"Zero",1:"One",2:"Two",3:"Three",4:"Four",5:"Five",6:"Six",7:"Seven",8:"Eight",9:"Niner"',
'  };',
'  document.getElementById("na-in").addEventListener("input",function(){',
'    var chars=this.value.toUpperCase().split("");',
'    document.getElementById("na-out").innerHTML=chars.map(function(c){',
'      if(c===" ")return "<div style=\\"width:1rem\\"></div>";',
'      var word=nato[c]||c;',
'      return "<div style=\\"background:var(--surface);border:1px solid var(--line);border-radius:6px;padding:0.2rem 0.5rem\\"><strong>"+c+"</strong> "+word+"</div>";',
'    }).join("");',
'  });',
'})();',
].join('\n')
);

// ─── 232  Morse Code Trainer ───────────────────────────────────────────────────
tool('morsetrainer', 'fun', '[MT]',
`<div id="mt2-app" style="text-align:center"><p style="opacity:0.7;font-size:0.875rem">{{ui.instruction}}</p><div id="mt2-display" style="font-size:3rem;font-weight:800;margin:1rem 0;min-height:3rem;letter-spacing:0.2em"></div><div class="row" style="justify-content:center;gap:0.5rem"><button class="btn" id="mt2-dit">. Dit (tap)</button><button class="btn" id="mt2-dah">- Dah (hold)</button></div><button class="btn" id="mt2-next" style="margin-top:0.5rem">{{ui.next}}</button><p id="mt2-result" style="margin-top:0.75rem;min-height:1.5rem"></p></div>`,
{title:'Morse Code Trainer',metaDescription:'Practice decoding Morse code. A letter is shown as dots and dashes.',h1:'Morse Code Trainer',intro:'Practice decoding Morse code. A letter is shown as dots and dashes - press Dit and Dah to input the code.',faq_title:'Morse code FAQ',ui:{instruction:'Decode the Morse code by pressing Dit (.) and Dah (-)',next:'Next Letter'},faq:[
  {q:'What is Morse code?',a:'Character encoding using dots (short) and dashes (long). Developed by Samuel Morse in the 1830s for telegraphs.'},
  {q:'What are dit and dah?',a:'Dit = short signal (dot, 1 unit). Dah = long signal (dash, 3 units).'},
  {q:'Is Morse code still used?',a:'Yes. Amateur radio operators, aviation navigation beacons and SOS distress signal.'}
]},
{title:'Treinador de Codigo Morse',metaDescription:'Pratique decodificacao do codigo Morse.',h1:'Treinador de Codigo Morse',intro:'Pratique a decodificacao do codigo Morse.',faq_title:'FAQ Morse',ui:{instruction:'Decodifique o codigo Morse pressionando Dit (.) e Dah (-)',next:'Proxima Letra'},faq:[
  {q:'O que e codigo Morse?',a:'Codificacao de caracteres usando pontos e tracoes. Desenvolvido por Samuel Morse na decada de 1830.'},
  {q:'O que sao dit e dah?',a:'Dit = sinal curto (ponto, 1 unidade). Dah = sinal longo (traco, 3 unidades).'},
  {q:'O codigo Morse ainda e usado?',a:'Sim. Operadores de radio amador e SOS.'}
]},
[
'(function(){',
'  var mc={A:".-",B:"-...",C:"-.-.",D:"-..",E:".",F:"..-.",G:"--.",H:"....",I:"..",J:".---",',
'    K:"-.-",L:".-..",M:"--",N:"-.",O:"---",P:".--.",Q:"--.-",R:".-.",S:"...",T:"-",',
'    U:"..-",V:"...-",W:".--",X:"-..-",Y:"-.--",Z:"--.."};',
'  var letters=Object.keys(mc);',
'  var current="",input="";',
'  function next(){current=letters[Math.floor(Math.random()*letters.length)];input="";document.getElementById("mt2-display").textContent=mc[current];document.getElementById("mt2-result").textContent="";}',
'  function check(){',
'    if(input===mc[current]){document.getElementById("mt2-result").innerHTML="<span style=\\"color:#22c55e\\">Correct! That was "+current+"</span>";setTimeout(next,1200);}',
'    else if(mc[current].indexOf(input)===0){document.getElementById("mt2-result").textContent="Keep going...";}',
'    else{document.getElementById("mt2-result").innerHTML="<span style=\\"color:#ef4444\\">Wrong. Answer was "+current+" ("+mc[current]+")</span>";setTimeout(function(){input="";check();},1500);}',
'  }',
'  document.getElementById("mt2-dit").onclick=function(){input+=".";check();};',
'  document.getElementById("mt2-dah").onclick=function(){input+="-";check();};',
'  document.getElementById("mt2-next").onclick=next;',
'  next();',
'})();',
].join('\n')
);

// ─── 233  Date Add/Subtract ────────────────────────────────────────────────────
tool('datemath', 'utility', '[DM]',
`<form id="dm-form"><div class="row"><div class="field"><label for="dm-date">{{ui.startDate}}</label><input type="date" id="dm-date"></div><div class="field"><label for="dm-op">{{ui.operation}}</label><select id="dm-op"><option value="add">Add</option><option value="sub">Subtract</option></select></div></div><div class="row"><div class="field"><label for="dm-n">{{ui.amount}}</label><input type="number" id="dm-n" min="0" value="30" inputmode="numeric"></div><div class="field"><label for="dm-unit">{{ui.unit}}</label><select id="dm-unit"><option value="days">Days</option><option value="weeks">Weeks</option><option value="months">Months</option><option value="years">Years</option></select></div></div><button class="btn" type="submit">{{ui.calculate}}</button></form><div id="dm-out" hidden class="result" style="text-align:center"></div>`,
{title:'Date Add/Subtract Calculator',metaDescription:'Add or subtract days, weeks, months or years from any date.',h1:'Date Add/Subtract Calculator',intro:'Add or subtract days, weeks, months or years from a start date to calculate a future or past date.',faq_title:'Date math FAQ',ui:{startDate:'Start date',operation:'Operation',amount:'Amount',unit:'Unit',calculate:'Calculate'},faq:[
  {q:'How does adding months work?',a:'Adding months adds to the month number. Adding 1 month to January 31 gives the last day of February.'},
  {q:'Difference between 30 days and 1 month?',a:'30 days is always exactly 30 days. 1 month goes to the same date next month (28-31 days).'},
  {q:'What can I use this for?',a:'Payment due dates, warranty expiration, project deadlines, trial period end dates.'}
]},
{title:'Calculadora de Adicao/Subtracao de Datas',metaDescription:'Adicione ou subtraia dias, semanas, meses ou anos de qualquer data.',h1:'Calculadora de Adicao/Subtracao de Datas',intro:'Adicione ou subtraia dias, semanas, meses ou anos de uma data de inicio.',faq_title:'FAQ datas',ui:{startDate:'Data de inicio',operation:'Operacao',amount:'Quantidade',unit:'Unidade',calculate:'Calcular'},faq:[
  {q:'Como funciona a adicao de meses?',a:'Adicionar meses adiciona ao numero do mes.'},
  {q:'Diferenca entre 30 dias e 1 mes?',a:'30 dias e sempre exatamente 30 dias. 1 mes pode ser 28-31 dias.'},
  {q:'Para que posso usar isso?',a:'Datas de vencimento, expiracao de garantia, prazos de projeto.'}
]},
[
'(function(){',
'  document.getElementById("dm-date").value=new Date().toISOString().split("T")[0];',
'  document.getElementById("dm-form").addEventListener("submit",function(e){',
'    e.preventDefault();',
'    var d=new Date(document.getElementById("dm-date").value);',
'    var op=document.getElementById("dm-op").value;',
'    var n=parseInt(document.getElementById("dm-n").value);',
'    var unit=document.getElementById("dm-unit").value;',
'    var sign=op==="add"?1:-1;',
'    var result=new Date(d);',
'    if(unit==="days")result.setDate(result.getDate()+sign*n);',
'    else if(unit==="weeks")result.setDate(result.getDate()+sign*n*7);',
'    else if(unit==="months")result.setMonth(result.getMonth()+sign*n);',
'    else result.setFullYear(result.getFullYear()+sign*n);',
'    var diff=Math.round((result-d)/86400000);',
'    var out=document.getElementById("dm-out");out.hidden=false;',
'    out.innerHTML="<div style=\\"font-size:1.5rem;font-weight:800\\">"+result.toDateString()+"</div><p style=\\"opacity:0.6\\">"+Math.abs(diff)+" days "+(diff>=0?"after":"before")+" the start date</p>";',
'  });',
'})();',
].join('\n')
);

// ─── 234  Numerology Name Calculator ──────────────────────────────────────────
tool('numerologyname', 'numerology', '[NUM]',
`<form id="nn-form"><div class="field"><label for="nn-in">Your name</label><input type="text" id="nn-in" placeholder="Enter your full name" autocomplete="off"></div><button class="btn" type="submit">Calculate</button></form><div id="nn-out" hidden class="result" style="text-align:center"></div>`,
{title:'Numerology Name Number Calculator',metaDescription:'Calculate your numerology name number from your full name.',h1:'Numerology Name Number',intro:'Enter your full name to calculate your numerology number using the Pythagorean system.',faq_title:'Numerology FAQ',ui:{},faq:[
  {q:'What is numerology?',a:'A belief system that assigns mystical significance to numbers derived from names and birth dates. Based on Pythagorean number reduction.'},
  {q:'How is the name number calculated?',a:'Each letter is assigned a number 1-9 (A=1, B=2...Z=8). All values are summed, then reduced to a single digit (or master number 11, 22, 33).'},
  {q:'What are master numbers?',a:'11, 22 and 33 are considered master numbers and are not reduced further in most numerology systems.'}
]},
{title:'Calculadora de Numero Numerologico do Nome',metaDescription:'Calcule seu numero numerologico a partir do seu nome completo.',h1:'Numero Numerologico do Nome',intro:'Insira seu nome completo para calcular seu numero numerologico usando o sistema Pitagorico.',faq_title:'FAQ numerologia',ui:{},faq:[
  {q:'O que e numerologia?',a:'Sistema de crencas que atribui significado mistico a numeros derivados de nomes e datas de nascimento.'},
  {q:'Como o numero do nome e calculado?',a:'Cada letra recebe um numero 1-9. Todos os valores sao somados e reduzidos a um unico digito.'},
  {q:'O que sao numeros mestres?',a:'11, 22 e 33 sao considerados numeros mestres e nao sao reduzidos na maioria dos sistemas de numerologia.'}
]},
[
'(function(){',
'  var vals={a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,j:1,k:2,l:3,m:4,n:5,o:6,p:7,q:8,r:9,s:1,t:2,u:3,v:4,w:5,x:6,y:7,z:8};',
'  function reduce(n){while(n>9&&n!==11&&n!==22&&n!==33){var d=String(n).split("");n=d.reduce(function(a,x){return a+parseInt(x);},0);}return n;}',
'  var meanings={1:"Leadership and independence",2:"Cooperation and diplomacy",3:"Creativity and self-expression",',
'    4:"Practicality and hard work",5:"Freedom and adventure",6:"Nurturing and responsibility",',
'    7:"Spirituality and analysis",8:"Ambition and material success",9:"Compassion and humanitarianism",',
'    11:"Master number: intuition",22:"Master number: master builder",33:"Master number: master teacher"};',
'  document.getElementById("nn-form").addEventListener("submit",function(e){',
'    e.preventDefault();',
'    var name=document.getElementById("nn-in").value.toLowerCase().replace(/[^a-z]/g,"");',
'    var sum=name.split("").reduce(function(a,c){return a+(vals[c]||0);},0);',
'    var num=reduce(sum);',
'    var out=document.getElementById("nn-out");out.hidden=false;',
'    out.innerHTML="<div style=\\"font-size:3rem;font-weight:800;color:var(--accent,#6366f1)\\">"+num+"</div><p style=\\"font-weight:600\\">Life Path Number</p><p style=\\"opacity:0.7\\">"+(meanings[num]||"Powerful energy")+"</p><p style=\\"font-size:0.8rem;opacity:0.5\\">Sum of letters: "+sum+"</p>";',
'  });',
'})();',
].join('\n')
);

// ─── 235  Love Compatibility ───────────────────────────────────────────────────
tool('lovecalculator', 'fun', '[LV]',
`<div id="lc-app"><div class="field"><label for="lc-n1">Your name</label><input type="text" id="lc-n1" placeholder="Enter your name" autocomplete="off"></div><div class="field"><label for="lc-n2">Partner name</label><input type="text" id="lc-n2" placeholder="Enter partner name" autocomplete="off"></div><button class="btn" id="lc-go" style="margin-top:0.5rem">Calculate Love %</button><div id="lc-out" hidden class="result" style="text-align:center"></div></div>`,
{title:'Love Compatibility Calculator',metaDescription:'Fun love compatibility calculator based on names.',h1:'Love Compatibility Calculator',intro:'Enter two names to get a fun compatibility percentage. Just for entertainment!',faq_title:'Love calc FAQ',ui:{},faq:[
  {q:'How is the percentage calculated?',a:'A deterministic algorithm based on character values in both names. Always gives the same result for the same pair of names.'},
  {q:'Is this scientifically accurate?',a:'No! This is purely for fun. Real compatibility depends on shared values, communication and mutual respect.'},
  {q:'Why do I get different results for name order?',a:'The algorithm combines both names so order matters. Try both orders to see different results.'}
]},
{title:'Calculadora de Compatibilidade Amorosa',metaDescription:'Calculadora de compatibilidade amorosa divertida baseada em nomes.',h1:'Calculadora de Compatibilidade Amorosa',intro:'Insira dois nomes para obter uma porcentagem de compatibilidade divertida. Apenas para entretenimento!',faq_title:'FAQ amor',ui:{},faq:[
  {q:'Como a porcentagem e calculada?',a:'Um algoritmo deterministico baseado em valores de caracteres em ambos os nomes.'},
  {q:'Isso e cientificamente preciso?',a:'Nao! Isso e puramente para diversao.'},
  {q:'Por que obtenho resultados diferentes para a ordem dos nomes?',a:'O algoritmo combina ambos os nomes, entao a ordem importa.'}
]},
[
'(function(){',
'  document.getElementById("lc-go").onclick=function(){',
'    var n1=document.getElementById("lc-n1").value.trim();',
'    var n2=document.getElementById("lc-n2").value.trim();',
'    if(!n1||!n2)return;',
'    var seed=(n1+n2).split("").reduce(function(a,c){return a+c.charCodeAt(0);},0);',
'    var pct=((seed*1234567)%100+100)%100;',
'    var msg=pct<30?"Maybe just friends":pct<60?"Good potential":pct<80?"Great match!":"Soul mates!";',
'    var out=document.getElementById("lc-out");out.hidden=false;',
'    out.innerHTML="<div style=\\"font-size:3rem;font-weight:800;color:var(--accent,#6366f1)\\">"+pct+"%</div><p style=\\"font-weight:600\\">"+msg+"</p><p style=\\"font-size:0.75rem;opacity:0.4;margin-top:0.5rem\\">Just for fun - not scientifically accurate!</p>";',
'  };',
'})();',
].join('\n')
);

// ─── 236  Sunrise / Sunset Estimator ──────────────────────────────────────────
tool('sunrisesunset', 'utility', '[SRS]',
`<form id="ss-form"><div class="row"><div class="field"><label for="ss-lat">Latitude</label><input type="number" id="ss-lat" step="any" value="40.7128" inputmode="decimal"></div><div class="field"><label for="ss-lon">Longitude</label><input type="number" id="ss-lon" step="any" value="-74.0060" inputmode="decimal"></div><div class="field"><label for="ss-date">Date</label><input type="date" id="ss-date"></div></div><button class="btn" type="submit">Calculate</button></form><div id="ss-out" hidden class="result" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:0.5rem"></div>`,
{title:'Sunrise and Sunset Estimator',metaDescription:'Calculate sunrise and sunset times for any location and date.',h1:'Sunrise and Sunset Estimator',intro:'Enter latitude, longitude and a date to estimate sunrise, sunset and day length.',faq_title:'Sunrise FAQ',ui:{},faq:[
  {q:'How accurate is this?',a:'Estimates are accurate to within a few minutes. Exact times depend on local terrain, refraction and your time zone.'},
  {q:'What is polar night?',a:'In arctic regions in winter the sun never rises. In summer (midnight sun) it never sets. The calculator detects these cases.'},
  {q:'What coordinates for my city?',a:'Google your city name followed by coordinates. New York: 40.71, -74.01. London: 51.51, -0.13. Tokyo: 35.68, 139.69.'}
]},
{title:'Estimador de Nascer e Por do Sol',metaDescription:'Calcule horarios de nascer e por do sol para qualquer local e data.',h1:'Estimador de Nascer e Por do Sol',intro:'Insira latitude, longitude e uma data para estimar nascer do sol, por do sol e duracao do dia.',faq_title:'FAQ nascer do sol',ui:{},faq:[
  {q:'Qual a precisao?',a:'As estimativas sao precisas em alguns minutos. Os horarios exatos dependem do terreno local e do fuso horario.'},
  {q:'O que e noite polar?',a:'Em regioes articas no inverno o sol nunca nasce. No verao (sol da meia-noite) nunca se poe.'},
  {q:'Quais coordenadas para minha cidade?',a:'Pesquise o nome da sua cidade seguido de coordenadas. Nova York: 40,71, -74,01. Londres: 51,51, -0,13.'}
]},
[
'(function(){',
'  document.getElementById("ss-date").value=new Date().toISOString().split("T")[0];',
'  document.getElementById("ss-form").addEventListener("submit",function(e){',
'    e.preventDefault();',
'    var lat=parseFloat(document.getElementById("ss-lat").value)*Math.PI/180;',
'    var lon=parseFloat(document.getElementById("ss-lon").value);',
'    var d=new Date(document.getElementById("ss-date").value);',
'    var J=Math.floor(d/86400000)+2440587.5;',
'    var n=J-2451545-0.0009-(lon/360);',
'    var M=(357.5291+0.98560028*n)%360*Math.PI/180;',
'    var C=1.9148*Math.sin(M)+0.0200*Math.sin(2*M)+0.0003*Math.sin(3*M);',
'    var lam=((280.4665+0.98564736*n+C)%360)*Math.PI/180;',
'    var dec=Math.asin(Math.sin(-23.4559*Math.PI/180)*Math.cos(lam));',
'    var cosHA=(Math.sin(-0.0145*Math.PI/180)-Math.sin(lat)*Math.sin(dec))/(Math.cos(lat)*Math.cos(dec));',
'    var out=document.getElementById("ss-out");out.hidden=false;',
'    if(Math.abs(cosHA)>1){out.innerHTML="<p>"+(cosHA<-1?"Midnight sun (no sunset)":"Polar night (no sunrise)")+"</p>";return;}',
'    var HA=Math.acos(cosHA)*180/Math.PI;',
'    var transit=2451545+0.0009+(lon/360)+n-J+2440587.5;',
'    var rise=transit-HA/360;',
'    var set2=transit+HA/360;',
'    function fmt(jd){var t=new Date((jd-2440587.5)*86400000);return t.toUTCString().split(" ")[4]+" UTC";}',
'    var day=(HA*2/180).toFixed(1);',
'    var items=[["Sunrise",fmt(rise)],["Sunset",fmt(set2)],["Day length",day+" hours"]];',
'    out.innerHTML=items.map(function(kv){return "<div style=\\"background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem\\"><div style=\\"font-size:0.75rem;opacity:0.6\\">"+kv[0]+"</div><strong>"+kv[1]+"</strong></div>";}).join("");',
'  });',
'})();',
].join('\n')
);

// ─── 237  Network Speed Calculator ────────────────────────────────────────────
tool('networkspeedcalc', 'utility', '[NS]',
`<form id="ns-form"><div class="row"><div class="field"><label for="ns-size">File size</label><input type="number" id="ns-size" step="any" value="1" inputmode="decimal"></div><div class="field"><label for="ns-sunit">Size unit</label><select id="ns-sunit"><option value="MB">MB</option><option value="GB">GB</option><option value="TB">TB</option></select></div></div><div class="row"><div class="field"><label for="ns-speed">Connection speed (Mbps)</label><input type="number" id="ns-speed" step="any" value="100" inputmode="decimal"></div></div><button class="btn" type="submit">Calculate</button></form><div id="ns-out" hidden class="result" style="text-align:center"></div>`,
{title:'Network Speed / File Transfer Time Calculator',metaDescription:'Calculate how long it takes to transfer a file at a given network speed.',h1:'Network Speed Calculator',intro:'Enter file size and connection speed to calculate estimated transfer time.',faq_title:'Network speed FAQ',ui:{},faq:[
  {q:'Why is actual speed slower?',a:'Network overhead, protocol headers, connection latency, server limits, Wi-Fi interference and router capacity all reduce real throughput.'},
  {q:'Mbps vs MBps?',a:'Mbps = megabits per second (used by ISPs). MBps = megabytes per second (used for files). 1 MBps = 8 Mbps.'},
  {q:'What is a good internet speed?',a:'4 Mbps: SD video. 25 Mbps: HD video. 100 Mbps: comfortable for a household. 1 Gbps: fiber, excellent.'}
]},
{title:'Calculadora de Velocidade de Rede',metaDescription:'Calcule quanto tempo leva para transferir um arquivo a uma velocidade de rede.',h1:'Calculadora de Velocidade de Rede',intro:'Insira o tamanho do arquivo e a velocidade de conexao para calcular o tempo estimado de transferencia.',faq_title:'FAQ velocidade de rede',ui:{},faq:[
  {q:'Por que a velocidade real e mais lenta?',a:'Sobrecarga de rede, latencia de conexao, limites do servidor e interferencia de Wi-Fi reduzem o throughput real.'},
  {q:'Mbps vs MBps?',a:'Mbps = megabits por segundo (usado por ISPs). MBps = megabytes por segundo. 1 MBps = 8 Mbps.'},
  {q:'Qual e uma boa velocidade de internet?',a:'4 Mbps: video SD. 25 Mbps: video HD. 100 Mbps: confortavel para uma residencia.'}
]},
[
'(function(){',
'  document.getElementById("ns-form").addEventListener("submit",function(e){',
'    e.preventDefault();',
'    var size=parseFloat(document.getElementById("ns-size").value);',
'    var unit=document.getElementById("ns-sunit").value;',
'    var speed=parseFloat(document.getElementById("ns-speed").value);',
'    var mult={MB:1,GB:1024,TB:1024*1024};',
'    var bits=size*mult[unit]*8;',
'    var secs=bits/speed;',
'    var time;',
'    if(secs<60)time=secs.toFixed(1)+" seconds";',
'    else if(secs<3600)time=(secs/60).toFixed(1)+" minutes";',
'    else time=(secs/3600).toFixed(2)+" hours";',
'    var out=document.getElementById("ns-out");out.hidden=false;',
'    out.innerHTML="<div style=\\"font-size:1.8rem;font-weight:800\\">"+time+"</div><p style=\\"opacity:0.6\\">"+size+" "+unit+" at "+speed+" Mbps</p>";',
'  });',
'})();',
].join('\n')
);

// ─── 238  Lucky Number Generator ──────────────────────────────────────────────
tool('luckynumber', 'fun', '[LN]',
`<div id="ln-app" style="text-align:center"><div id="ln-out" style="font-size:2.5rem;font-weight:800;color:var(--accent,#6366f1);min-height:4rem;margin:1rem 0">?</div><div class="row" style="justify-content:center;gap:0.5rem"><button class="btn" id="ln-gen">Generate Lucky Numbers</button><div class="field"><label for="ln-range">Range</label><select id="ln-range"><option value="49">1-49 (Lotto)</option><option value="70">1-70 (Powerball)</option><option value="36">1-36 (Custom)</option></select></div></div></div>`,
{title:'Lucky Number Generator',metaDescription:'Generate a set of lucky lottery numbers.',h1:'Lucky Number Generator',intro:'Generate a unique set of lucky numbers for your favorite lottery. Numbers are randomly selected without repetition.',faq_title:'Lucky numbers FAQ',ui:{},faq:[
  {q:'Are these numbers truly random?',a:'Yes. They use the browser built-in Math.random() which is a pseudo-random number generator. Equally likely as any hand-picked numbers.'},
  {q:'Can I use these for real lottery?',a:'Yes, but lottery outcomes are completely random. Past numbers, lucky picks or any system cannot improve your odds.'},
  {q:'What range should I pick?',a:'Match your local lottery: 6/49 (most common), Powerball 5/70, custom for other games.'}
]},
{title:'Gerador de Numero da Sorte',metaDescription:'Gere um conjunto de numeros da sorte para loteria.',h1:'Gerador de Numero da Sorte',intro:'Gere um conjunto unico de numeros da sorte para sua loteria favorita.',faq_title:'FAQ numeros da sorte',ui:{},faq:[
  {q:'Esses numeros sao verdadeiramente aleatorios?',a:'Sim. Eles usam o Math.random() integrado do navegador.'},
  {q:'Posso usa-los para loteria real?',a:'Sim, mas os resultados da loteria sao completamente aleatorios. Nenhum sistema pode melhorar suas chances.'},
  {q:'Qual intervalo devo escolher?',a:'Corresponda a sua loteria local: 6/49 (mais comum), Powerball 5/70.'}
]},
[
'(function(){',
'  document.getElementById("ln-gen").onclick=function(){',
'    var max=parseInt(document.getElementById("ln-range").value);',
'    var nums=[];',
'    while(nums.length<6){var n=Math.floor(Math.random()*max)+1;if(nums.indexOf(n)<0)nums.push(n);}',
'    nums.sort(function(a,b){return a-b;});',
'    document.getElementById("ln-out").innerHTML=nums.map(function(n){',
'      return "<span style=\\"display:inline-block;margin:0.2rem;background:var(--surface);border:2px solid var(--accent,#6366f1);border-radius:50%;width:48px;height:48px;line-height:48px;text-align:center\\">"+n+"</span>";',
'    }).join("");',
'  };',
'})();',
].join('\n')
);

// ─── 239  Coin and Note Counter ───────────────────────────────────────────────
tool('coinconverter', 'finance', '[$]',
`<div id="cc2-app"><p style="opacity:0.7;font-size:0.875rem">Enter quantity of each denomination:</p><div id="cc2-coins" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:0.5rem"></div><div class="result" style="text-align:center;margin-top:0.75rem"><span class="big" id="cc2-total">$0.00</span></div></div>`,
{title:'Coin and Note Counter',metaDescription:'Count US coins and banknotes and calculate the total value.',h1:'Coin and Note Counter',intro:'Enter the quantity of each US denomination to calculate the total value. Great for counting your cash.',faq_title:'Coin counter FAQ',ui:{},faq:[
  {q:'What denominations are included?',a:'Bills: $100, $50, $20, $10, $5, $1. Coins: Quarter (25c), Dime (10c), Nickel (5c), Penny (1c).'},
  {q:'Does this support other currencies?',a:'Currently US dollars only. The calculation logic is the same for any currency - just substitute your denomination values.'},
  {q:'Can I use this for a cash register count?',a:'Yes. This is useful for end-of-day cash drawer reconciliation. Enter your physical count for each denomination.'}
]},
{title:'Contador de Moedas e Notas',metaDescription:'Conte moedas e cedulas americanas e calcule o valor total.',h1:'Contador de Moedas e Notas',intro:'Insira a quantidade de cada denominacao americana para calcular o valor total.',faq_title:'FAQ contador',ui:{},faq:[
  {q:'Quais denominacoes estao incluidas?',a:'Cedulas: $100, $50, $20, $10, $5, $1. Moedas: Quarter (25c), Dime (10c), Nickel (5c), Penny (1c).'},
  {q:'Isso suporta outras moedas?',a:'Atualmente apenas dolares americanos.'},
  {q:'Posso usar para contagem de caixa?',a:'Sim. Util para reconciliacao do caixa no final do dia.'}
]},
[
'(function(){',
'  var denoms=[["$100",10000],["$50",5000],["$20",2000],["$10",1000],["$5",500],["$1",100],["25c",25],["10c",10],["5c",5],["1c",1]];',
'  var cont=document.getElementById("cc2-coins");',
'  var inputs=denoms.map(function(d){',
'    var div=document.createElement("div");',
'    div.style.cssText="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem";',
'    div.innerHTML="<label style=\\"font-size:0.8rem;opacity:0.7\\">"+d[0]+"</label><input type=\\"number\\" min=\\"0\\" step=\\"1\\" value=\\"0\\" style=\\"width:100%;padding:0.3rem;border:1px solid var(--line);border-radius:6px;background:var(--surface);color:var(--text);text-align:center;font-size:1.1rem\\">";',
'    cont.appendChild(div);',
'    var inp=div.querySelector("input");',
'    inp.addEventListener("input",update);',
'    return {inp:inp,cents:d[1]};',
'  });',
'  function update(){',
'    var total=inputs.reduce(function(a,x){return a+parseInt(x.inp.value||0)*x.cents;},0);',
'    document.getElementById("cc2-total").textContent="$"+(total/100).toFixed(2);',
'  }',
'  update();',
'})();',
].join('\n')
);

// ─── 240  Font Properties Preview ─────────────────────────────────────────────
tool('fontidentifier', 'design', '[FN]',
`<div id="fi-app"><div class="row"><div class="field"><label for="fi-text">Preview text</label><input type="text" id="fi-text" value="The quick brown fox jumps over the lazy dog"></div></div><div class="row"><div class="field"><label for="fi-family">Font family</label><input type="text" id="fi-family" value="Georgia, serif" list="fi-fonts"><datalist id="fi-fonts"><option value="Arial, sans-serif"><option value="Georgia, serif"><option value="Courier New, monospace"><option value="Times New Roman, serif"><option value="Verdana, sans-serif"><option value="Inter, sans-serif"><option value="Roboto, sans-serif"></datalist></div><div class="field"><label for="fi-size">Size (px)</label><input type="number" id="fi-size" value="24" min="8" max="120"></div><div class="field"><label for="fi-weight">Weight</label><select id="fi-weight"><option value="300">Light</option><option value="400" selected>Regular</option><option value="600">Semi-bold</option><option value="700">Bold</option><option value="900">Black</option></select></div></div><div id="fi-preview" style="margin-top:0.75rem;padding:1rem;background:var(--surface);border:1px solid var(--line);border-radius:12px;min-height:60px"></div></div>`,
{title:'Font Properties Preview',metaDescription:'Preview any font family, size and weight combination.',h1:'Font Properties Preview',intro:'Type your text and select font properties to preview typography combinations instantly.',faq_title:'Font preview FAQ',ui:{},faq:[
  {q:'What fonts are available?',a:'Any font installed on your system or loaded by the page. Common web-safe fonts: Arial, Georgia, Courier New, Times New Roman, Verdana.'},
  {q:'How do I use Google Fonts?',a:'Type the Google Font name (e.g., Inter, Roboto, Lato). It must be loaded by the page or your OS for the preview to work.'},
  {q:'What font weight values are valid?',a:'100 (Thin), 200, 300 (Light), 400 (Regular), 500 (Medium), 600 (Semi-bold), 700 (Bold), 800, 900 (Black).'}
]},
{title:'Previa de Propriedades de Fonte',metaDescription:'Previa de qualquer combinacao de familia, tamanho e peso de fonte.',h1:'Previa de Propriedades de Fonte',intro:'Digite seu texto e selecione propriedades de fonte para previsualizar combinacoes de tipografia instantaneamente.',faq_title:'FAQ previa de fonte',ui:{},faq:[
  {q:'Quais fontes estao disponiveis?',a:'Qualquer fonte instalada em seu sistema ou carregada pela pagina.'},
  {q:'Como usar Google Fonts?',a:'Digite o nome da Google Font. Ela deve ser carregada pela pagina ou sistema para a previa funcionar.'},
  {q:'Quais valores de peso de fonte sao validos?',a:'100, 200, 300, 400, 500, 600, 700, 800, 900.'}
]},
[
'(function(){',
'  function update(){',
'    var t=document.getElementById("fi-text").value;',
'    var f=document.getElementById("fi-family").value;',
'    var s=document.getElementById("fi-size").value;',
'    var w=document.getElementById("fi-weight").value;',
'    var p=document.getElementById("fi-preview");',
'    p.textContent=t;p.style.fontFamily=f;p.style.fontSize=s+"px";p.style.fontWeight=w;',
'  }',
'  ["fi-text","fi-family","fi-size","fi-weight"].forEach(function(id){',
'    document.getElementById(id).addEventListener("input",update);',
'  });',
'  update();',
'})();',
].join('\n')
);

// ─── 241  Password Strength Analyzer ──────────────────────────────────────────
tool('passwordstrength', 'security', '[PWS]',
`<div id="pws-app"><div class="field"><label for="pws-in">Password</label><div style="position:relative"><input type="password" id="pws-in" style="width:100%;padding:0.5rem 2.5rem 0.5rem 0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)" placeholder="Enter password to analyze"><button id="pws-toggle" style="position:absolute;right:0.5rem;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;opacity:0.6">show</button></div></div><div style="margin-top:0.75rem"><div style="height:8px;border-radius:4px;background:#374151"><div id="pws-fill" style="height:100%;border-radius:4px;width:0;transition:all 0.3s"></div></div><div id="pws-label" style="text-align:right;font-size:0.8rem;margin-top:0.3rem;font-weight:600"></div></div><div id="pws-checks" style="display:grid;gap:0.25rem;margin-top:0.5rem;font-size:0.875rem"></div></div>`,
{title:'Password Strength Analyzer',metaDescription:'Analyze password strength and get actionable improvement tips.',h1:'Password Strength Analyzer',intro:'Enter a password to analyze its strength. Runs entirely in your browser - nothing is sent to any server.',faq_title:'Password strength FAQ',ui:{},faq:[
  {q:'What makes a strong password?',a:'Length (12+ chars), mix of uppercase/lowercase/numbers/symbols, no dictionary words, no personal info. Use a passphrase or a password manager.'},
  {q:'Is my password sent anywhere?',a:'No. The analysis runs entirely in your browser using JavaScript. Your password is never sent to any server.'},
  {q:'Should I use a password manager?',a:'Yes. Password managers (Bitwarden, 1Password, Dashlane) generate and store unique strong passwords for every site.'}
]},
{title:'Analisador de Forca de Senha',metaDescription:'Analise a forca da senha e obtenha dicas de melhoria.',h1:'Analisador de Forca de Senha',intro:'Digite uma senha para analisar sua forca. Executado inteiramente no navegador.',faq_title:'FAQ forca de senha',ui:{},faq:[
  {q:'O que torna uma senha forte?',a:'Comprimento (12+ chars), mistura de maiusculas/minusculas/numeros/simbolos, sem palavras do dicionario.'},
  {q:'Minha senha e enviada para algum lugar?',a:'Nao. A analise e executada inteiramente no navegador. Sua senha nunca e enviada para nenhum servidor.'},
  {q:'Devo usar um gerenciador de senhas?',a:'Sim. Gerenciadores de senha geram e armazenam senhas fortes unicas para cada site.'}
]},
[
'(function(){',
'  var show=false;',
'  document.getElementById("pws-toggle").onclick=function(){',
'    show=!show;',
'    document.getElementById("pws-in").type=show?"text":"password";',
'    this.textContent=show?"hide":"show";',
'  };',
'  document.getElementById("pws-in").addEventListener("input",function(){',
'    var p=this.value;',
'    var checks=[',
'      ["At least 8 characters",p.length>=8],',
'      ["At least 12 characters",p.length>=12],',
'      ["Uppercase letters",/[A-Z]/.test(p)],',
'      ["Lowercase letters",/[a-z]/.test(p)],',
'      ["Numbers",/[0-9]/.test(p)],',
'      ["Symbols (!@#...)",/[^a-zA-Z0-9]/.test(p)],',
'      ["No common patterns",!/(123|abc|password|qwerty)/i.test(p)]',
'    ];',
'    var score=checks.filter(function(c){return c[1];}).length;',
'    var colors=["#ef4444","#ef4444","#f97316","#eab308","#84cc16","#22c55e","#22c55e"];',
'    var labels=["Very Weak","Weak","Poor","Fair","Good","Strong","Very Strong"];',
'    document.getElementById("pws-fill").style.width=((score/7)*100)+"%";',
'    document.getElementById("pws-fill").style.background=colors[score];',
'    document.getElementById("pws-label").style.color=colors[score];',
'    document.getElementById("pws-label").textContent=labels[score];',
'    document.getElementById("pws-checks").innerHTML=checks.map(function(c){',
'      return "<div style=\\"color:"+(c[1]?"#22c55e":"#6b7280")+"\\">"+(c[1]?"[+]":"[ ]")+" "+c[0]+"</div>";',
'    }).join("");',
'  });',
'})();',
].join('\n')
);

// ─── 242  Character and Word Counter ──────────────────────────────────────────
tool('charactercounter', 'utility', '[CC]',
`<div id="ctr-app"><textarea id="ctr-in" rows="8" placeholder="Type or paste text here..." style="width:100%;padding:0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text);font-size:1rem;resize:vertical"></textarea><div id="ctr-stats" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:0.4rem;margin-top:0.5rem"></div></div>`,
{title:'Character and Word Counter',metaDescription:'Count characters, words, sentences, paragraphs and estimated reading time.',h1:'Character and Word Counter',intro:'Type or paste your text to instantly count characters, words, lines, sentences and get a reading time estimate.',faq_title:'Word count FAQ',ui:{},faq:[
  {q:'How is reading time calculated?',a:'Average reading speed is 200-250 words per minute. Reading time = word count / 200 (rounded up).'},
  {q:'What counts as a word?',a:'A sequence of non-whitespace characters separated by spaces, tabs or newlines. Punctuation attached to words is counted as part of the word.'},
  {q:'What is the Twitter character limit?',a:'280 characters. Instagram captions: 2,200. LinkedIn posts: 3,000. SMS: 160 per message segment.'}
]},
{title:'Contador de Caracteres e Palavras',metaDescription:'Conte caracteres, palavras, frases, paragrafos e tempo de leitura estimado.',h1:'Contador de Caracteres e Palavras',intro:'Digite ou cole seu texto para contar instantaneamente caracteres, palavras, linhas e obter estimativa de tempo de leitura.',faq_title:'FAQ contador de palavras',ui:{},faq:[
  {q:'Como o tempo de leitura e calculado?',a:'Velocidade media de leitura e 200-250 palavras por minuto. Tempo = contagem de palavras / 200.'},
  {q:'O que conta como uma palavra?',a:'Uma sequencia de caracteres que nao sao espacos em branco separados por espacos, tabulacoes ou novas linhas.'},
  {q:'Qual e o limite de caracteres do Twitter?',a:'280 caracteres. Instagram: 2.200. LinkedIn: 3.000. SMS: 160 por segmento.'}
]},
[
'(function(){',
'  document.getElementById("ctr-in").addEventListener("input",function(){',
'    var text=this.value;',
'    var chars=text.length;',
'    var nosp=text.replace(/\\s/g,"").length;',
'    var words=text.trim()?text.trim().split(/\\s+/).length:0;',
'    var lines=text?text.split("\\n").length:0;',
'    var sents=text.split(/[.!?]+/).filter(function(s){return s.trim();}).length;',
'    var para=text.split(/\\n\\s*\\n/).filter(function(p){return p.trim();}).length;',
'    var read=Math.ceil(words/200);',
'    var items=[["Characters",chars],["No spaces",nosp],["Words",words],["Lines",lines],["Sentences",sents],["Paragraphs",para],["Read time",read+" min"]];',
'    document.getElementById("ctr-stats").innerHTML=items.map(function(kv){',
'      return "<div style=\\"background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.4rem 0.6rem;text-align:center\\"><div style=\\"font-size:0.65rem;opacity:0.6;text-transform:uppercase\\">"+kv[0]+"</div><strong style=\\"font-size:1.2rem\\">"+kv[1]+"</strong></div>";',
'    }).join("");',
'  });',
'})();',
].join('\n')
);

// ─── 243  Extended Unit Converter ─────────────────────────────────────────────
tool('unitconverterx', 'utility', '[UC]',
`<div id="ucx-app"><div class="row"><div class="field"><label for="ucx-cat">Category</label><select id="ucx-cat"><option value="speed">Speed</option><option value="pressure">Pressure</option><option value="energy">Energy</option><option value="power">Power</option><option value="data">Data storage</option></select></div></div><div class="row"><div class="field"><label for="ucx-val">Value</label><input type="number" id="ucx-val" step="any" value="1" inputmode="decimal"></div><div class="field"><label for="ucx-from">From</label><select id="ucx-from"></select></div></div><div id="ucx-out" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:0.4rem;margin-top:0.5rem"></div></div>`,
{title:'Extended Unit Converter - Speed, Pressure, Energy, Power, Data',metaDescription:'Convert between speed, pressure, energy, power and data storage units.',h1:'Extended Unit Converter',intro:'Convert between speed, pressure, energy, power and data storage units.',faq_title:'Unit converter FAQ',ui:{},faq:[
  {q:'What units are supported?',a:'Speed: m/s, km/h, mph, knots, ft/s. Pressure: Pa, kPa, bar, psi, atm. Energy: J, kJ, cal, kcal, Wh, BTU. Power: W, kW, MW, hp. Data: Bytes, KB, MB, GB, TB.'},
  {q:'What is 1 horsepower in watts?',a:'1 hp = 745.7 W. Different definitions exist: mechanical hp (745.7W), metric hp (735.5W) and electrical hp (746W).'},
  {q:'What is 1 BTU?',a:'British Thermal Unit: energy to raise 1 pound of water by 1 degree Fahrenheit. 1 BTU = 1055.06 joules.'}
]},
{title:'Conversor de Unidades Estendido',metaDescription:'Converta entre unidades de velocidade, pressao, energia, potencia e armazenamento de dados.',h1:'Conversor de Unidades Estendido',intro:'Converta entre unidades de velocidade, pressao, energia, potencia e armazenamento de dados.',faq_title:'FAQ conversor de unidades',ui:{},faq:[
  {q:'Quais unidades sao suportadas?',a:'Velocidade: m/s, km/h, mph, nos, ft/s. Pressao: Pa, kPa, bar, psi, atm. Energia: J, kJ, cal, kcal, Wh, BTU. Potencia: W, kW, MW, hp.'},
  {q:'Quanto e 1 cavalo-vapor em watts?',a:'1 hp = 745,7 W.'},
  {q:'O que e 1 BTU?',a:'Unidade Termica Britanica: energia para elevar 1 libra de agua em 1 grau Fahrenheit. 1 BTU = 1055,06 joules.'}
]},
[
'(function(){',
'  var cats={',
'    speed:{units:[["m/s",1],["km/h",1/3.6],["mph",1/2.237],["knots",1/1.944],["ft/s",1/3.281]],base:"m/s"},',
'    pressure:{units:[["Pa",1],["kPa",1000],["MPa",1e6],["bar",1e5],["psi",6894.76],["atm",101325],["mmHg",133.322]],base:"Pa"},',
'    energy:{units:[["J",1],["kJ",1000],["MJ",1e6],["cal",4.184],["kcal",4184],["Wh",3600],["kWh",3600000],["BTU",1055.06]],base:"J"},',
'    power:{units:[["W",1],["kW",1000],["MW",1e6],["hp",745.7],["BTU/h",0.2931]],base:"W"},',
'    data:{units:[["Bytes",1],["KB",1024],["MB",1048576],["GB",1073741824],["TB",1099511627776],["Bits",0.125],["Kbits",128],["Mbits",131072]],base:"Bytes"}',
'  };',
'  function populate(){',
'    var cat=cats[document.getElementById("ucx-cat").value];',
'    var sel=document.getElementById("ucx-from");',
'    sel.innerHTML=cat.units.map(function(u){return "<option value=\\""+u[0]+"\\">"+u[0]+"</option>";}).join("");',
'  }',
'  function convert(){',
'    var cat=cats[document.getElementById("ucx-cat").value];',
'    var v=parseFloat(document.getElementById("ucx-val").value);',
'    var from=document.getElementById("ucx-from").value;',
'    var fromFactor=cat.units.filter(function(u){return u[0]===from;})[0][1];',
'    var base=v*fromFactor;',
'    document.getElementById("ucx-out").innerHTML=cat.units.map(function(u){',
'      var res=base/u[1];',
'      return "<div style=\\"background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.4rem 0.6rem\\"><div style=\\"font-size:0.7rem;opacity:0.6\\">"+u[0]+"</div><strong style=\\"font-size:0.9rem\\">"+res.toPrecision(6).replace(/\\.?0+$/,"")+"</strong></div>";',
'    }).join("");',
'  }',
'  document.getElementById("ucx-cat").addEventListener("change",function(){populate();convert();});',
'  document.getElementById("ucx-from").addEventListener("change",convert);',
'  document.getElementById("ucx-val").addEventListener("input",convert);',
'  populate();convert();',
'})();',
].join('\n')
);

// ─── 244  Tipping Guide ────────────────────────────────────────────────────────
tool('tippingguide', 'finance', '[$]',
`<div id="tg-app"><div class="field"><input type="text" id="tg-search" placeholder="Search country or service..." style="width:100%;padding:0.5rem 0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)"></div><div id="tg-list" style="display:grid;gap:0.3rem;margin-top:0.5rem"></div></div>`,
{title:'Tipping Guide by Country',metaDescription:'How much to tip in different countries and services.',h1:'Tipping Guide by Country',intro:'Find appropriate tip amounts for restaurants, taxis, hotels and other services around the world.',faq_title:'Tipping FAQ',ui:{},faq:[
  {q:'Is tipping mandatory?',a:'No, but in some countries (especially the US) it is strongly expected for service workers. In Japan tipping is considered rude.'},
  {q:'Should I tip on pre-tax or post-tax?',a:'In the US, most people tip on the pre-tax amount. Some tip on the total. Either is acceptable.'},
  {q:'What if the service was bad?',a:'In the US, leaving a small tip (10-12%) signals poor service better than no tip, which can be interpreted as forgetting.'}
]},
{title:'Guia de Gorjetas por Pais',metaDescription:'Quanto deixar de gorjeta em diferentes paises e servicos.',h1:'Guia de Gorjetas por Pais',intro:'Encontre valores adequados de gorjeta para restaurantes, taxis, hoteis e outros servicos ao redor do mundo.',faq_title:'FAQ gorjetas',ui:{},faq:[
  {q:'A gorjeta e obrigatoria?',a:'Nao, mas em alguns paises (especialmente nos EUA) e fortemente esperada. No Japao, dar gorjeta e considerado rude.'},
  {q:'Devo dar gorjeta antes ou apos os impostos?',a:'Nos EUA, a maioria das pessoas da gorjeta sobre o valor antes dos impostos.'},
  {q:'E se o servico foi ruim?',a:'Nos EUA, deixar uma gorjeta pequena sinaliza mau servico melhor do que nenhuma gorjeta.'}
]},
[
'(function(){',
'  var tips=[',
'    ["USA","Restaurant","15-20%","Expected; 20%+ for good service"],',
'    ["USA","Bar","$1-2/drink","Per drink or 15-20% of tab"],',
'    ["USA","Taxi","10-15%","Round up to nearest dollar"],',
'    ["USA","Hotel porter","$1-2/bag","Standard"],',
'    ["Canada","Restaurant","15-20%","Similar to USA"],',
'    ["UK","Restaurant","10-12.5%","Often included as service charge"],',
'    ["UK","Taxi","10%","Round up"],',
'    ["Germany","Restaurant","5-10%","Round up the bill"],',
'    ["France","Restaurant","0-5%","Service compris usually included"],',
'    ["Italy","Restaurant","0-5%","Cover charge (coperto) is separate"],',
'    ["Japan","Restaurant","0%","Tipping is considered rude"],',
'    ["Australia","Restaurant","0-10%","Not expected, appreciated for good service"],',
'    ["Brazil","Restaurant","10%","Usually added automatically"],',
'    ["Mexico","Restaurant","10-15%","Standard"],',
'    ["Spain","Restaurant","5-10%","Not required but appreciated"],',
'    ["Netherlands","Restaurant","5-10%","Round up is common"],',
'    ["UAE","Restaurant","10-15%","Service charge often added"]',
'  ];',
'  function render(q){',
'    var f=q?tips.filter(function(t){return (t[0]+t[1]).toLowerCase().indexOf(q.toLowerCase())>=0;}):tips;',
'    document.getElementById("tg-list").innerHTML=f.map(function(t){',
'      return "<div style=\\"display:grid;grid-template-columns:100px 100px 80px 1fr;gap:0.5rem;align-items:center;padding:0.4rem 0.6rem;background:var(--surface);border:1px solid var(--line);border-radius:6px;font-size:0.875rem\\"><strong>"+t[0]+"</strong><span style=\\"opacity:0.7\\">"+t[1]+"</span><span style=\\"color:var(--accent,#6366f1);font-weight:600\\">"+t[2]+"</span><span style=\\"opacity:0.6;font-size:0.8rem\\">"+t[3]+"</span></div>";',
'    }).join("");',
'  }',
'  document.getElementById("tg-search").addEventListener("input",function(){render(this.value);});',
'  render("");',
'})();',
].join('\n')
);

// ─── 245  Age in Different Units ──────────────────────────────────────────────
tool('ageincalculator', 'utility', '[AI]',
`<form id="ai-form"><div class="row"><div class="field"><label for="ai-dob">Date of birth</label><input type="date" id="ai-dob"></div></div><button class="btn" type="submit">Calculate</button></form><div id="ai-out" hidden class="result" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:0.5rem"></div>`,
{title:'Age in Different Units Calculator',metaDescription:'Calculate your age in years, months, weeks, days, hours, minutes and seconds.',h1:'Age in Different Units',intro:'Enter your birthdate to see your age expressed in years, months, weeks, days, hours, minutes and seconds.',faq_title:'Age calculator FAQ',ui:{},faq:[
  {q:'How many days old am I?',a:'Multiply years by 365.25 (accounting for leap years). Then add extra days and months. This tool calculates it precisely.'},
  {q:'How many seconds in a year?',a:'365.25 days x 24 hours x 60 minutes x 60 seconds = 31,557,600 seconds per year (accounting for leap years).'},
  {q:'What is a Gregorian age?',a:'Standard calendar age: how many birthdays have passed. This is the most common age measurement worldwide.'}
]},
{title:'Calculadora de Idade em Diferentes Unidades',metaDescription:'Calcule sua idade em anos, meses, semanas, dias, horas, minutos e segundos.',h1:'Idade em Diferentes Unidades',intro:'Insira sua data de nascimento para ver sua idade expressa em anos, meses, semanas, dias, horas, minutos e segundos.',faq_title:'FAQ calculadora de idade',ui:{},faq:[
  {q:'Quantos dias tenho de vida?',a:'Multiplique os anos por 365,25 (contabilizando anos bissextos). Depois adicione dias e meses extras.'},
  {q:'Quantos segundos ha em um ano?',a:'365,25 dias x 24 horas x 60 minutos x 60 segundos = 31.557.600 segundos por ano.'},
  {q:'O que e idade gregoriana?',a:'Idade do calendario padrao: quantos aniversarios ja passaram.'}
]},
[
'(function(){',
'  document.getElementById("ai-form").addEventListener("submit",function(e){',
'    e.preventDefault();',
'    var dob=new Date(document.getElementById("ai-dob").value);',
'    var now=new Date();',
'    var ms=now-dob;',
'    var secs=ms/1000;',
'    var mins=secs/60;',
'    var hrs=mins/60;',
'    var days=hrs/24;',
'    var weeks=days/7;',
'    var yrs=now.getFullYear()-dob.getFullYear()-(now<new Date(now.getFullYear(),dob.getMonth(),dob.getDate())?1:0);',
'    var months=yrs*12+(now.getMonth()-dob.getMonth()+(now.getDate()<dob.getDate()?-1:0));',
'    var items=[["Years",yrs],["Months",months],["Weeks",Math.floor(weeks)],["Days",Math.floor(days)],["Hours",Math.floor(hrs)],["Minutes",Math.floor(mins)],["Seconds",Math.floor(secs)]];',
'    var out=document.getElementById("ai-out");out.hidden=false;',
'    out.innerHTML=items.map(function(kv){',
'      return "<div style=\\"background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem\\"><div style=\\"font-size:0.7rem;opacity:0.6\\">"+kv[0]+"</div><strong style=\\"font-size:0.95rem\\">"+kv[1].toLocaleString()+"</strong></div>";',
'    }).join("");',
'  });',
'})();',
].join('\n')
);

// ─── 246  Scientific Notation Converter ───────────────────────────────────────
tool('scinotation', 'science', '[SN]',
`<form id="sn-form"><div class="field"><label for="sn-type">Convert</label><select id="sn-type"><option value="toSci">Standard to Scientific</option><option value="toStd">Scientific to Standard</option></select></div><div class="field" id="sn-std-field"><label for="sn-std">Standard number</label><input type="number" id="sn-std" step="any" value="123456789" inputmode="decimal"></div><div class="field" id="sn-sci-field" style="display:none"><div class="row"><div class="field"><label for="sn-coeff">Coefficient</label><input type="number" id="sn-coeff" step="any" value="1.23" inputmode="decimal"></div><div class="field"><label for="sn-exp">Exponent (n)</label><input type="number" id="sn-exp" step="1" value="8" inputmode="numeric"></div></div></div><button class="btn" type="submit">Convert</button></form><div id="sn-out" hidden class="result" style="text-align:center;font-family:monospace;font-size:1.2rem"></div>`,
{title:'Scientific Notation Converter',metaDescription:'Convert between standard numbers and scientific notation.',h1:'Scientific Notation Converter',intro:'Convert numbers between standard form and scientific notation (e.g., 123456789 to 1.23456789 x 10^8).',faq_title:'Scientific notation FAQ',ui:{},faq:[
  {q:'What is scientific notation?',a:'A way to express very large or small numbers: a x 10^n where 1 <= a < 10. Example: 6.022 x 10^23 (Avogadro number).'},
  {q:'When is scientific notation used?',a:'Physics, chemistry, astronomy, engineering. Any field dealing with very large (distance in km) or very small (atomic size) values.'},
  {q:'What is E notation?',a:'Computer shorthand for scientific notation: 1.23E8 = 1.23 x 10^8. Used in calculators and programming languages.'}
]},
{title:'Conversor de Notacao Cientifica',metaDescription:'Converta entre numeros padrao e notacao cientifica.',h1:'Conversor de Notacao Cientifica',intro:'Converta numeros entre forma padrao e notacao cientifica.',faq_title:'FAQ notacao cientifica',ui:{},faq:[
  {q:'O que e notacao cientifica?',a:'Uma forma de expressar numeros muito grandes ou pequenos: a x 10^n onde 1 <= a < 10.'},
  {q:'Quando a notacao cientifica e usada?',a:'Fisica, quimica, astronomia, engenharia.'},
  {q:'O que e notacao E?',a:'Abreviacao de computador para notacao cientifica: 1,23E8 = 1,23 x 10^8.'}
]},
[
'(function(){',
'  document.getElementById("sn-type").addEventListener("change",function(){',
'    document.getElementById("sn-std-field").style.display=this.value==="toSci"?"":"none";',
'    document.getElementById("sn-sci-field").style.display=this.value==="toSci"?"none":"";',
'  });',
'  document.getElementById("sn-form").addEventListener("submit",function(e){',
'    e.preventDefault();',
'    var type=document.getElementById("sn-type").value;',
'    var out=document.getElementById("sn-out");out.hidden=false;',
'    if(type==="toSci"){',
'      var n=parseFloat(document.getElementById("sn-std").value);',
'      var exp=Math.floor(Math.log10(Math.abs(n)));',
'      var coeff=n/Math.pow(10,exp);',
'      out.textContent=coeff.toPrecision(6).replace(/\\.?0+$/,"")+" x 10^"+exp;',
'    }else{',
'      var c=parseFloat(document.getElementById("sn-coeff").value);',
'      var ex=parseInt(document.getElementById("sn-exp").value);',
'      var std=c*Math.pow(10,ex);',
'      out.textContent=std.toPrecision(10).replace(/\\.?0+$/,"");',
'    }',
'  });',
'})();',
].join('\n')
);

// ─── 247  Biorhythm Calculator ────────────────────────────────────────────────
tool('biorhythm', 'fun', '[BR]',
`<form id="br-form"><div class="row"><div class="field"><label for="br-dob">Date of birth</label><input type="date" id="br-dob"></div></div><button class="btn" type="submit">Calculate</button></form><div id="br-out" hidden class="result" style="text-align:center"></div>`,
{title:'Biorhythm Calculator',metaDescription:'Calculate physical, emotional and intellectual biorhythm cycles from your birthdate.',h1:'Biorhythm Calculator',intro:'Enter your birthdate to see your current physical, emotional and intellectual biorhythm cycle values.',faq_title:'Biorhythm FAQ',ui:{},faq:[
  {q:'What are biorhythms?',a:'Three sinusoidal cycles from birth: Physical (23 days), Emotional (28 days), Intellectual (33 days). Values range from -100% to +100%.'},
  {q:'Is biorhythm theory scientific?',a:'No. Multiple peer-reviewed studies found no correlation between biorhythm peaks and performance or cognitive tests.'},
  {q:'Why is it popular?',a:'Fun self-reflection tool. People notice coincidences when the theory seems correct (confirmation bias).'}
]},
{title:'Calculadora de Biorritmo',metaDescription:'Calcule ciclos de biorritmo fisico, emocional e intelectual.',h1:'Calculadora de Biorritmo',intro:'Insira sua data de nascimento para ver seus valores atuais de ciclo de biorritmo.',faq_title:'FAQ biorritmo',ui:{},faq:[
  {q:'O que sao biorritmos?',a:'Tres ciclos senoidais a partir do nascimento: Fisico (23 dias), Emocional (28 dias), Intelectual (33 dias).'},
  {q:'A teoria do biorritmo e cientifica?',a:'Nao. Multiplos estudos nao encontraram correlacao entre picos de biorritmo e desempenho.'},
  {q:'Por que e popular?',a:'Ferramenta de auto-reflexao divertida.'}
]},
[
'(function(){',
'  document.getElementById("br-form").addEventListener("submit",function(e){',
'    e.preventDefault();',
'    var dob=new Date(document.getElementById("br-dob").value);',
'    var now=new Date();',
'    var days=Math.floor((now-dob)/86400000);',
'    var phys=Math.round(Math.sin(2*Math.PI*days/23)*100);',
'    var emo=Math.round(Math.sin(2*Math.PI*days/28)*100);',
'    var intl=Math.round(Math.sin(2*Math.PI*days/33)*100);',
'    var out=document.getElementById("br-out");out.hidden=false;',
'    function barHTML(v){',
'      var c=v>=0?"#22c55e":"#ef4444";var w=Math.abs(v);',
'      return "<div style=\\"display:flex;align-items:center;gap:0.5rem\\"><div style=\\"width:50%;display:flex;justify-content:flex-end\\"><div style=\\"width:"+(v<0?w:0)+"%;height:12px;background:"+c+";border-radius:4px\\"></div></div><div style=\\"width:50%\\"><div style=\\"width:"+(v>=0?w:0)+"%;height:12px;background:"+c+";border-radius:4px\\"></div></div></div>";',
'    }',
'    var rows=[["Physical (23d)",phys,"#6366f1"],["Emotional (28d)",emo,"#ec4899"],["Intellectual (33d)",intl,"#f59e0b"]];',
'    out.innerHTML="<p style=\\"opacity:0.6;font-size:0.85rem\\">Day "+days+" of life</p><div style=\\"display:grid;gap:0.75rem;margin-top:0.5rem\\">"+rows.map(function(r){return "<div><div style=\\"display:flex;justify-content:space-between;margin-bottom:0.3rem\\"><span>"+r[0]+"</span><strong style=\\"color:"+r[2]+"\\">"+(r[1]>0?"+":"")+r[1]+"%</strong></div>"+barHTML(r[1])+"</div>";}).join("")+"</div>";',
'  });',
'})();',
].join('\n')
);

// ─── 248  Name Day Lookup ─────────────────────────────────────────────────────
tool('nameday', 'fun', '[ND]',
`<form id="nd-form"><div class="row"><div class="field"><label for="nd-name">First name</label><input type="text" id="nd-name" placeholder="e.g. John, Maria, Peter..." autocomplete="off"></div><button class="btn" type="submit" style="align-self:flex-end">Look up</button></div></form><div id="nd-out" hidden class="result" style="text-align:center"></div>`,
{title:'Name Day Lookup',metaDescription:'Find the traditional Catholic and European name day for any first name.',h1:'Name Day Lookup',intro:'Enter a first name to find its traditional name day date in the Catholic/European calendar.',faq_title:'Name day FAQ',ui:{},faq:[
  {q:'What is a name day?',a:'Feast days of saints in the Christian calendar, traditionally celebrated by people sharing that name.'},
  {q:'Is a name day the same as a birthday?',a:'No. A name day is a fixed calendar date based on the saint feast day, not the birth date.'},
  {q:'Which countries celebrate name days?',a:'Poland, Hungary, Czech Republic, Slovakia, Greece, Sweden, Finland, Bulgaria, Croatia, Italy, Spain, Portugal.'}
]},
{title:'Consulta de Dia do Nome',metaDescription:'Encontre o dia do nome tradicional para qualquer primeiro nome.',h1:'Consulta de Dia do Nome',intro:'Insira um primeiro nome para encontrar sua data de dia do nome.',faq_title:'FAQ dia do nome',ui:{},faq:[
  {q:'O que e um dia do nome?',a:'Dias de festa de santos no calendario cristao, celebrados por pessoas que compartilham o nome desse santo.'},
  {q:'O dia do nome e o mesmo que aniversario?',a:'Nao. Um dia do nome e uma data fixa baseada no dia da festa do santo.'},
  {q:'Quais paises celebram dias do nome?',a:'Polonia, Hungria, Republica Tcheca, Eslovaquia, Grecia, Suecia, Finlandia, Bulgaria, Croacia, Italia, Espanha, Portugal.'}
]},
[
'(function(){',
'  var db={John:"June 24",Mary:"September 8",Peter:"June 29",Paul:"June 29",James:"July 25",Andrew:"November 30",',
'    Philip:"May 3",Thomas:"July 3",Matthew:"September 21",Mark:"April 25",Luke:"October 18",',
'    Stephen:"December 26",Joseph:"March 19",Michael:"September 29",Gabriel:"September 29",',
'    Elizabeth:"November 5",Anna:"July 26",Catherine:"November 25",Barbara:"December 4",',
'    Nicholas:"December 6",Anthony:"June 13",Francis:"October 4",George:"April 23",',
'    Christopher:"July 25",Sebastian:"January 20",Valentine:"February 14",Patrick:"March 17",',
'    David:"March 1",Martin:"November 11",Benedict:"July 11",Gregory:"September 3",',
'    Teresa:"October 15",Agnes:"January 21",Rose:"August 23",Monica:"August 27",',
'    Helen:"August 18",Lucia:"December 13",Cecilia:"November 22"};',
'  document.getElementById("nd-form").addEventListener("submit",function(e){',
'    e.preventDefault();',
'    var name=document.getElementById("nd-name").value.trim();',
'    var out=document.getElementById("nd-out");out.hidden=false;',
'    var key=Object.keys(db).find(function(k){return k.toLowerCase()===name.toLowerCase();});',
'    if(key){out.innerHTML="<div style=\\"font-size:1.5rem;font-weight:700\\">"+key+"</div><div style=\\"font-size:1.1rem;color:var(--accent,#6366f1);margin-top:0.3rem\\">"+db[key]+"</div>";}',
'    else{out.innerHTML="<p>Name day not found for \\""+name+"\\". Try common Western names.</p>";}',
'  });',
'})();',
].join('\n')
);

// ─── 249  Rhyme Finder ────────────────────────────────────────────────────────
tool('rhymefinder', 'fun', '[RF]',
`<form id="rf-form"><div class="row"><div class="field"><label for="rf-word">Word</label><input type="text" id="rf-word" placeholder="e.g. cat, moon, fire..." autocomplete="off"></div><button class="btn" type="submit">Find Rhymes</button></div></form><div id="rf-out" style="margin-top:0.75rem"></div>`,
{title:'Rhyme Finder',metaDescription:'Find words that rhyme with any English word. Great for poetry and lyrics.',h1:'Rhyme Finder',intro:'Enter a word to find rhymes from our word list. Great for poetry, lyrics or wordplay.',faq_title:'Rhyme FAQ',ui:{},faq:[
  {q:'What is a perfect rhyme?',a:'Identical sounds from the final stressed vowel: cat/bat, moon/tune.'},
  {q:'How are rhymes found?',a:'The tool extracts the ending sound and finds words with matching endings from a curated word list.'},
  {q:'Types of rhyme?',a:'Perfect rhyme, slant rhyme, eye rhyme (same spelling different sound), rich rhyme (homophones).'}
]},
{title:'Localizador de Rimas',metaDescription:'Encontre palavras que rimam com qualquer palavra em ingles.',h1:'Localizador de Rimas',intro:'Insira uma palavra para encontrar rimas da nossa lista de palavras.',faq_title:'FAQ rimas',ui:{},faq:[
  {q:'O que e uma rima perfeita?',a:'Sons identicos a partir da vogal tonica final: cat/bat, moon/tune.'},
  {q:'Como as rimas sao encontradas?',a:'A ferramenta extrai o som final e encontra palavras com terminacoes correspondentes.'},
  {q:'Tipos de rima?',a:'Rima perfeita, rima aproximada, rima visual (mesma grafia som diferente).'}
]},
[
'(function(){',
'  var wordList="cat bat fat hat mat pat rat sat vat flat brat chat day bay hay jay lay may pay ray say way play pray tray they grey okay blue clue due flew glue hue new dew knew few brew grew true moon tune boon croon dune loon noon soon spoon boom doom gloom loom room zoom bloom groom fume sure cure pure star bar car far jar tar war scar gate late mate rate fate date great eight wait bait state plate weight height bright night right fight light might tight white write bite cite kite mite quite site spite time lime dime crime grime mime prime rhyme slime chime life wife knife strife fire hire wire tire desire require aspire inspire retire admire".split(" ");',
'  var unique=wordList.filter(function(v,i,a){return a.indexOf(v)===i;});',
'  function ending(w){var v="aeiou";for(var i=w.length-1;i>=0;i--){if(v.indexOf(w[i].toLowerCase())>=0)return w.slice(i);}return w.slice(-2);}',
'  document.getElementById("rf-form").addEventListener("submit",function(e){',
'    e.preventDefault();',
'    var word=document.getElementById("rf-word").value.trim().toLowerCase();',
'    var end=ending(word);',
'    var rhymes=unique.filter(function(w){return w!==word&&w.slice(-end.length)===end;});',
'    var out=document.getElementById("rf-out");',
'    if(!rhymes.length){out.innerHTML="<p>No rhymes found for \\""+word+"\\". Try a shorter word.</p>";return;}',
'    out.innerHTML="<p style=\\"opacity:0.6;font-size:0.875rem;margin-bottom:0.5rem\\">"+rhymes.length+" rhyme(s) for \\""+word+"\\":</p><div style=\\"display:flex;flex-wrap:wrap;gap:0.4rem\\">"+rhymes.map(function(r){return "<span style=\\"padding:0.3rem 0.6rem;background:var(--surface);border:1px solid var(--line);border-radius:6px;font-size:0.9rem\\">"+r+"</span>";}).join("")+"</div>";',
'  });',
'})();',
].join('\n')
);

// ─── 250  Semaphore Flag Encoder ───────────────────────────────────────────────
tool('semaphore', 'fun', '[SEM]',
`<div id="sem-app"><div class="field"><input type="text" id="sem-in" placeholder="Type text to encode..." style="width:100%;padding:0.5rem 0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text);text-transform:uppercase"></div><div id="sem-out" style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-top:0.75rem"></div></div>`,
{title:'Flag Semaphore Encoder',metaDescription:'Encode text as flag semaphore arm positions.',h1:'Flag Semaphore Encoder',intro:'Type text to see the flag semaphore arm positions for each letter. Used in maritime signaling.',faq_title:'Semaphore FAQ',ui:{},faq:[
  {q:'What is flag semaphore?',a:'Visual communication system using two flags held in specific arm positions to represent letters and numbers.'},
  {q:'When was semaphore used?',a:'18th-19th century for military and maritime communication. Replaced by radio in the 20th century.'},
  {q:'What does SOS look like?',a:'S = both arms down diagonal. O = both arms horizontal. Each letter signaled sequentially.'}
]},
{title:'Codificador de Semaforo de Bandeiras',metaDescription:'Codifique texto em posicoes de semaforo de bandeiras.',h1:'Codificador de Semaforo de Bandeiras',intro:'Digite texto para ver as posicoes de braco do semaforo de bandeiras para cada letra.',faq_title:'FAQ semaforo',ui:{},faq:[
  {q:'O que e semaforo de bandeiras?',a:'Sistema de comunicacao visual usando duas bandeiras em posicoes especificas de braco para representar letras.'},
  {q:'Quando o semaforo era usado?',a:'Seculo XVIII-XIX para comunicacao militar e maritima.'},
  {q:'Como e o SOS?',a:'S = ambos os bracos diagonais abaixo. O = ambos os bracos horizontais.'}
]},
[
'(function(){',
'  var pos={A:"L-down R-down-right",B:"L-down R-right",C:"L-down R-up-right",D:"L-down R-up",',
'    E:"L-down R-up-left",F:"L-down R-left",G:"L-down-right R-down",H:"L-right R-down-right",',
'    I:"L-right R-right",J:"L-up R-down",K:"L-down-right R-up",L:"L-down-right R-up-right",',
'    M:"L-down-right R-up-left",N:"L-down-right R-left",O:"L-right R-up-right",P:"L-right R-up-left",',
'    Q:"L-right R-left",R:"L-up-right R-up-left",S:"L-up-right R-left",T:"L-up R-up-left",',
'    U:"L-up R-left",V:"L-up-left R-left",W:"L-down R-up-left",X:"L-up-right R-down-right",',
'    Y:"L-down-right R-right",Z:"L-right R-down"};',
'  document.getElementById("sem-in").addEventListener("input",function(){',
'    var chars=this.value.toUpperCase().split("");',
'    document.getElementById("sem-out").innerHTML=chars.map(function(c){',
'      if(c===" ")return "<div style=\\"width:1.5rem\\"></div>";',
'      var desc=pos[c]||c;',
'      return "<div style=\\"background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem;text-align:center;min-width:60px\\"><div style=\\"font-size:1.2rem;font-weight:800\\">"+c+"</div><div style=\\"font-size:0.65rem;opacity:0.6;line-height:1.3;max-width:80px\\">"+desc+"</div></div>";',
'    }).join("");',
'  });',
'})();',
].join('\n')
);

console.log('\nBatch 11b (tools 229-250) complete.');
console.log('Total tools: 250');
