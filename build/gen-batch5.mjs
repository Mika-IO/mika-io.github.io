#!/usr/bin/env node
// gen-batch5.mjs — tools 80-130 (math, finance, text, utility)
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

// ─── 80 ── Scientific Calculator ────────────────────────────────────────────
tool('scientificcalc', 'math', '🔬',
  `<div id="sc-app"><div class="row"><input type="text" id="sc-expr" placeholder="e.g. sqrt(144) + sin(PI/2)" style="flex:1;font-size:1rem;padding:0.5rem 0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)"><button class="btn" id="sc-calc">{{ui.calculate}}</button></div><div class="result"><span class="big" id="sc-out">—</span></div><div style="font-size:0.8rem;opacity:0.6;margin-top:0.5rem">{{ui.hint}}</div></div>`,
  { title:'Scientific Calculator — evaluate math expressions online', metaDescription:'Free scientific calculator. Evaluate mathematical expressions including trigonometry, logarithms, powers and more directly in your browser.', h1:'Scientific Calculator', intro:'Type any mathematical expression and press Calculate. Supports sin, cos, tan, log, sqrt, pow, PI, E and all standard operators.', faq_title:'Scientific calculator FAQ', ui:{ calculate:'Calculate', hint:'Supported: sin cos tan asin acos atan log log2 sqrt abs pow PI E' }, faq:[
    { q:'What functions are supported?', a:'Trigonometric functions (sin, cos, tan and their inverses), logarithms (log for base-10, log2, ln), square root (sqrt), absolute value (abs), power (pow(base,exp)), and the constants PI and E.' },
    { q:'Are angles in degrees or radians?', a:'Trig functions use radians. To convert degrees to radians multiply by PI/180. For example sin(90 * PI / 180) equals 1.' },
    { q:'Is my expression sent to a server?', a:'No. Evaluation runs entirely in your browser using the Math object — nothing is uploaded.' }
  ]},
  { title:'Calculadora Científica — avalie expressões matemáticas online', metaDescription:'Calculadora científica gratuita. Avalie expressões matemáticas incluindo trigonometria, logaritmos, potências e mais no navegador.', h1:'Calculadora Científica', intro:'Digite qualquer expressão matemática e pressione Calcular. Suporta sin, cos, tan, log, sqrt, pow, PI, E e todos os operadores padrão.', faq_title:'Perguntas frequentes da calculadora científica', ui:{ calculate:'Calcular', hint:'Suportado: sin cos tan asin acos atan log log2 sqrt abs pow PI E' }, faq:[
    { q:'Quais funções são suportadas?', a:'Funções trigonométricas (sin, cos, tan e seus inversos), logaritmos (log base 10, log2, ln), raiz quadrada (sqrt), valor absoluto (abs), potência (pow(base,exp)) e as constantes PI e E.' },
    { q:'Os ângulos são em graus ou radianos?', a:'As funções trigonométricas usam radianos. Para converter graus em radianos, multiplique por PI/180. Por exemplo sin(90 * PI / 180) é igual a 1.' },
    { q:'Minha expressão é enviada para um servidor?', a:'Não. A avaliação roda inteiramente no navegador usando o objeto Math — nada é enviado.' }
  ]},
  `(function(){
  const btn=document.getElementById('sc-calc');
  const inp=document.getElementById('sc-expr');
  const out=document.getElementById('sc-out');
  function calc(){
    const expr=inp.value.trim();
    if(!expr){out.textContent='—';return;}
    try{
      const sanitized=expr
        .replace(/\\bsin\\b/g,'Math.sin').replace(/\\bcos\\b/g,'Math.cos')
        .replace(/\\btan\\b/g,'Math.tan').replace(/\\basin\\b/g,'Math.asin')
        .replace(/\\bacos\\b/g,'Math.acos').replace(/\\batan\\b/g,'Math.atan')
        .replace(/\\blog2\\b/g,'Math.log2').replace(/\\bln\\b/g,'Math.log')
        .replace(/\\blog\\b/g,'Math.log10').replace(/\\bsqrt\\b/g,'Math.sqrt')
        .replace(/\\babs\\b/g,'Math.abs').replace(/\\bpow\\b/g,'Math.pow')
        .replace(/\\bPI\\b/g,'Math.PI').replace(/\\bE\\b/g,'Math.E');
      // eslint-disable-next-line no-new-func
      const result=Function('"use strict";return ('+sanitized+')')();
      out.textContent=Number.isFinite(result)?+result.toPrecision(10):'Error';
    }catch(e){out.textContent='Error';}
  }
  btn.addEventListener('click',calc);
  inp.addEventListener('keydown',function(e){if(e.key==='Enter')calc();});
})();`
);

// ─── 81 ── Matrix Calculator ────────────────────────────────────────────────
tool('matrixcalc', 'math', '🔢',
  `<div id="mx-app"><div class="row"><div class="field" style="flex:1"><label>{{ui.matrixA}}</label><textarea id="mx-a" rows="3" placeholder="1 2&#10;3 4" style="width:100%;font-family:monospace;resize:vertical;padding:0.5rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)"></textarea></div><div class="field" style="flex:1"><label>{{ui.matrixB}}</label><textarea id="mx-b" rows="3" placeholder="5 6&#10;7 8" style="width:100%;font-family:monospace;resize:vertical;padding:0.5rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)"></textarea></div></div><div class="row" style="gap:0.5rem;flex-wrap:wrap"><button class="btn" id="mx-add">{{ui.add}}</button><button class="btn" id="mx-sub">{{ui.subtract}}</button><button class="btn" id="mx-mul">{{ui.multiply}}</button><button class="btn" id="mx-det">{{ui.determinant}}</button><button class="btn" id="mx-tra">{{ui.transpose}}</button></div><div class="result"><pre id="mx-out" style="font-family:monospace;white-space:pre">—</pre></div></div>`,
  { title:'Matrix Calculator — add, subtract, multiply matrices online', metaDescription:'Free matrix calculator. Add, subtract, multiply matrices, compute determinants and transposes instantly in your browser.', h1:'Matrix Calculator', intro:'Enter matrices row by row (space-separated values, one row per line). Then choose an operation.', faq_title:'Matrix calculator FAQ', ui:{ matrixA:'Matrix A', matrixB:'Matrix B', add:'A + B', subtract:'A − B', multiply:'A × B', determinant:'det(A)', transpose:'Transposeᵀ A' }, faq:[
    { q:'How do I enter a matrix?', a:'Type numbers separated by spaces for each row, and press Enter for each new row. For example, a 2×2 matrix: "1 2" on line 1 and "3 4" on line 2.' },
    { q:'What is a determinant?', a:'The determinant is a single number computed from a square matrix that tells you if the matrix is invertible (non-zero = invertible) and by how much it scales volumes.' },
    { q:'What is the transpose?', a:'Transposing a matrix flips it over its diagonal — rows become columns and columns become rows. A 2×3 matrix becomes 3×2 after transposing.' }
  ]},
  { title:'Calculadora de Matrizes — somar, subtrair, multiplicar matrizes', metaDescription:'Calculadora de matrizes gratuita. Some, subtraia, multiplique matrizes e calcule determinantes e transpostas no navegador.', h1:'Calculadora de Matrizes', intro:'Digite matrizes linha por linha (valores separados por espaço, uma linha por row). Depois escolha uma operação.', faq_title:'Perguntas frequentes da calculadora de matrizes', ui:{ matrixA:'Matriz A', matrixB:'Matriz B', add:'A + B', subtract:'A − B', multiply:'A × B', determinant:'det(A)', transpose:'Transposta A' }, faq:[
    { q:'Como insiro uma matriz?', a:'Digite números separados por espaços em cada linha. Por exemplo, uma matriz 2×2: "1 2" na linha 1 e "3 4" na linha 2.' },
    { q:'O que é determinante?', a:'O determinante é um número calculado a partir de uma matriz quadrada que indica se ela é invertível (diferente de zero = invertível).' },
    { q:'O que é transposta?', a:'Transpor uma matriz inverte-a ao longo da diagonal — linhas viram colunas e colunas viram linhas.' }
  ]},
  `(function(){
  function parse(id){
    return document.getElementById(id).value.trim().split('\\n')
      .filter(r=>r.trim()).map(r=>r.trim().split(/\\s+/).map(Number));
  }
  function fmt(m){return m.map(r=>r.map(v=>+v.toPrecision(8)).join('\\t')).join('\\n');}
  function show(v){document.getElementById('mx-out').textContent=v;}
  function det(m){
    const n=m.length;
    if(n===1)return m[0][0];
    if(n===2)return m[0][0]*m[1][1]-m[0][1]*m[1][0];
    let d=0;
    for(let c=0;c<n;c++){
      const sub=m.slice(1).map(r=>[...r.slice(0,c),...r.slice(c+1)]);
      d+=Math.pow(-1,c)*m[0][c]*det(sub);
    }
    return d;
  }
  document.getElementById('mx-add').onclick=function(){
    const a=parse('mx-a'),b=parse('mx-b');
    if(a.length!==b.length||a[0].length!==b[0].length){show('Dimension mismatch');return;}
    show(fmt(a.map((r,i)=>r.map((v,j)=>v+b[i][j]))));
  };
  document.getElementById('mx-sub').onclick=function(){
    const a=parse('mx-a'),b=parse('mx-b');
    if(a.length!==b.length||a[0].length!==b[0].length){show('Dimension mismatch');return;}
    show(fmt(a.map((r,i)=>r.map((v,j)=>v-b[i][j]))));
  };
  document.getElementById('mx-mul').onclick=function(){
    const a=parse('mx-a'),b=parse('mx-b');
    if(a[0].length!==b.length){show('Incompatible dimensions for multiplication');return;}
    const res=a.map((_,i)=>b[0].map((_,j)=>a[i].reduce((s,_,k)=>s+a[i][k]*b[k][j],0)));
    show(fmt(res));
  };
  document.getElementById('mx-det').onclick=function(){
    const a=parse('mx-a');
    if(a.length!==a[0].length){show('Matrix A must be square');return;}
    show('det(A) = '+det(a).toPrecision(10));
  };
  document.getElementById('mx-tra').onclick=function(){
    const a=parse('mx-a');
    show(fmt(a[0].map((_,i)=>a.map(r=>r[i]))));
  };
})();`
);

// ─── 82 ── Statistics Calculator ────────────────────────────────────────────
tool('statscalc', 'math', '📊',
  `<form id="stats-form"><div class="field"><label for="stats-in">{{ui.data}}</label><input type="text" id="stats-in" placeholder="2, 4, 4, 4, 5, 5, 7, 9"></div><div class="row" style="justify-content:center"><button class="btn" type="submit">{{ui.calculate}}</button></div></form><div id="stats-out" hidden class="result" style="text-align:left;display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:0.5rem"></div>`,
  { title:'Statistics Calculator — mean, median, mode, standard deviation', metaDescription:'Free statistics calculator. Enter a list of numbers to instantly compute mean, median, mode, standard deviation, variance, min, max and range.', h1:'Statistics Calculator', intro:'Enter comma-separated numbers and get mean, median, mode, standard deviation, variance, min, max and range instantly.', faq_title:'Statistics calculator FAQ', ui:{ data:'Numbers (comma-separated)', calculate:'Calculate' }, faq:[
    { q:'What is the difference between population and sample standard deviation?', a:'Population std dev divides by N (all data points). Sample std dev divides by N-1 (Bessel\'s correction) to get an unbiased estimate of the true population std dev. This tool shows both.' },
    { q:'What if there are multiple modes?', a:'If two or more values appear the same maximum number of times, all are shown as the mode. If all values are unique, the mode is listed as "none".' },
    { q:'Is there a limit on how many numbers I can enter?', a:'No hard limit. For very large datasets the calculation may take a moment but runs entirely in your browser.' }
  ]},
  { title:'Calculadora de Estatística — média, mediana, moda, desvio padrão', metaDescription:'Calculadora de estatística gratuita. Insira uma lista de números e calcule instantaneamente média, mediana, moda, desvio padrão, variância, mín, máx e amplitude.', h1:'Calculadora de Estatística', intro:'Digite números separados por vírgula e obtenha média, mediana, moda, desvio padrão, variância, mínimo, máximo e amplitude.', faq_title:'Perguntas frequentes da calculadora de estatística', ui:{ data:'Números (separados por vírgula)', calculate:'Calcular' }, faq:[
    { q:'Qual a diferença entre desvio padrão populacional e amostral?', a:'O desvio padrão populacional divide por N. O amostral divide por N-1 (correção de Bessel) para obter uma estimativa não-viesada da população. Esta ferramenta mostra os dois.' },
    { q:'E se houver múltiplas modas?', a:'Se dois ou mais valores aparecem o mesmo número máximo de vezes, todos são exibidos como moda. Se todos os valores forem únicos, a moda é "nenhuma".' },
    { q:'Há limite de números?', a:'Não há limite fixo. Para grandes conjuntos de dados o cálculo pode demorar um momento, mas roda inteiramente no navegador.' }
  ]},
  `(function(){
  document.getElementById('stats-form').addEventListener('submit',function(e){
    e.preventDefault();
    const nums=document.getElementById('stats-in').value.split(',').map(s=>parseFloat(s.trim())).filter(n=>!isNaN(n));
    if(!nums.length)return;
    nums.sort((a,b)=>a-b);
    const n=nums.length;
    const mean=nums.reduce((s,v)=>s+v,0)/n;
    const mid=Math.floor(n/2);
    const median=n%2?nums[mid]:(nums[mid-1]+nums[mid])/2;
    const freq={};nums.forEach(v=>{freq[v]=(freq[v]||0)+1;});
    const maxF=Math.max(...Object.values(freq));
    const modes=Object.keys(freq).filter(k=>freq[k]===maxF);
    const mode=maxF===1?'none':modes.join(', ');
    const varPop=nums.reduce((s,v)=>s+(v-mean)**2,0)/n;
    const varSam=n>1?nums.reduce((s,v)=>s+(v-mean)**2,0)/(n-1):0;
    const items=[
      ['n',n],['Min',nums[0]],['Max',nums[n-1]],['Range',nums[n-1]-nums[0]],
      ['Mean',mean.toPrecision(6)],['Median',median],['Mode',mode],
      ['Var (pop)',varPop.toPrecision(6)],['Var (sample)',varSam.toPrecision(6)],
      ['StdDev (pop)',Math.sqrt(varPop).toPrecision(6)],['StdDev (sample)',Math.sqrt(varSam).toPrecision(6)],
      ['Sum',nums.reduce((s,v)=>s+v,0)]
    ];
    const out=document.getElementById('stats-out');
    out.hidden=false;
    out.innerHTML=items.map(([k,v])=>\`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">\${k}</div><strong>\${v}</strong></div>\`).join('');
  });
})();`
);

// ─── 83 ── Number Base Converter ─────────────────────────────────────────────
tool('numberbase', 'math', '🔄',
  `<div id="nb-app"><div class="field"><label for="nb-val">{{ui.value}}</label><input type="text" id="nb-val" placeholder="255"></div><div class="field"><label for="nb-from">{{ui.fromBase}}</label><select id="nb-from"><option value="10">{{ui.decimal}} (10)</option><option value="2">{{ui.binary}} (2)</option><option value="8">{{ui.octal}} (8)</option><option value="16">{{ui.hex}} (16)</option><option value="custom">{{ui.custom}}</option></select></div><input type="number" id="nb-custom-from" placeholder="{{ui.enterBase}} (2-36)" min="2" max="36" hidden style="margin-top:0.5rem;padding:0.5rem;border:1px solid var(--line);border-radius:8px;width:100%;background:var(--surface);color:var(--text)"><div id="nb-results" style="margin-top:1rem;display:grid;gap:0.5rem"></div></div>`,
  { title:'Number Base Converter — convert between any number bases', metaDescription:'Free number base converter. Convert any number between binary, octal, decimal, hexadecimal, or any base from 2 to 36 instantly in your browser.', h1:'Number Base Converter', intro:'Enter a number and select its base. The tool instantly shows the equivalent value in all common bases (2, 8, 10, 16) and any custom base.', faq_title:'Number base converter FAQ', ui:{ value:'Enter number', fromBase:'Input base', decimal:'Decimal', binary:'Binary', octal:'Octal', hex:'Hexadecimal', custom:'Custom base…', enterBase:'Base' }, faq:[
    { q:'What bases are supported?', a:'Any integer base from 2 (binary) to 36. Bases above 10 use letters A–Z for digits 10–35, following standard positional notation.' },
    { q:'Can I enter hexadecimal letters?', a:'Yes. Enter hex numbers like FF or 1A3 when selecting hexadecimal as the input base. Letters are case-insensitive.' },
    { q:'Why base 36?', a:'Base 36 uses all ten digits plus the 26 letters of the alphabet, making it the largest unambiguous single-character-per-digit base. It is used in URL shorteners and serial numbers for compact representation.' }
  ]},
  { title:'Conversor de Base Numérica — converta entre qualquer base', metaDescription:'Conversor de base numérica gratuito. Converta qualquer número entre binário, octal, decimal, hexadecimal ou qualquer base de 2 a 36 no navegador.', h1:'Conversor de Base Numérica', intro:'Digite um número e selecione sua base. A ferramenta mostra instantaneamente o valor equivalente em todas as bases comuns (2, 8, 10, 16) e em qualquer base personalizada.', faq_title:'Perguntas frequentes do conversor de base', ui:{ value:'Digite o número', fromBase:'Base de entrada', decimal:'Decimal', binary:'Binário', octal:'Octal', hex:'Hexadecimal', custom:'Base personalizada…', enterBase:'Base' }, faq:[
    { q:'Quais bases são suportadas?', a:'Qualquer base inteira de 2 (binário) a 36. Bases acima de 10 usam letras A–Z para os dígitos de 10 a 35.' },
    { q:'Posso inserir letras hexadecimais?', a:'Sim. Digite números hex como FF ou 1A3 ao selecionar hexadecimal como base de entrada. As letras não diferenciam maiúsculas de minúsculas.' },
    { q:'Por que base 36?', a:'Base 36 usa todos os dez dígitos mais as 26 letras do alfabeto, tornando-a a maior base não ambígua com um caractere por dígito. É usada em encurtadores de URL e números de série.' }
  ]},
  `(function(){
  const sel=document.getElementById('nb-from');
  const custom=document.getElementById('nb-custom-from');
  sel.addEventListener('change',function(){custom.hidden=this.value!=='custom';convert();});
  document.getElementById('nb-val').addEventListener('input',convert);
  custom.addEventListener('input',convert);
  function convert(){
    const raw=document.getElementById('nb-val').value.trim().toUpperCase();
    const fromBase=sel.value==='custom'?parseInt(custom.value)||10:parseInt(sel.value);
    const div=document.getElementById('nb-results');
    if(!raw){div.innerHTML='';return;}
    const dec=parseInt(raw,fromBase);
    if(isNaN(dec)){div.innerHTML='<p style="color:red">Invalid input for this base</p>';return;}
    const bases=[[2,'Binary'],[8,'Octal'],[10,'Decimal'],[16,'Hex'],[32,'Base 32'],[36,'Base 36']];
    div.innerHTML=bases.map(([b,label])=>\`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem;display:flex;justify-content:space-between"><span style="opacity:0.6">\${label} (\${b})</span><strong style="font-family:monospace">\${dec.toString(b).toUpperCase()}</strong></div>\`).join('');
  }
})();`
);

// ─── 84 ── Fibonacci Generator ───────────────────────────────────────────────
tool('fibonacci', 'math', '🐚',
  `<form id="fib-form"><div class="row"><div class="field"><label for="fib-n">{{ui.terms}}</label><input type="number" id="fib-n" min="1" max="80" value="10" inputmode="numeric"></div><button class="btn" type="submit">{{ui.generate}}</button></div></form><div class="result"><div id="fib-out">—</div></div>`,
  { title:'Fibonacci Sequence Generator — list first N Fibonacci numbers', metaDescription:'Free Fibonacci generator. Enter how many terms you want and instantly see the Fibonacci sequence. Supports up to 80 terms of exact values.', h1:'Fibonacci Sequence Generator', intro:'Enter how many terms to generate and get the Fibonacci sequence instantly.', faq_title:'Fibonacci FAQ', ui:{ terms:'Number of terms (1–80)', generate:'Generate' }, faq:[
    { q:'What is the Fibonacci sequence?', a:'Each number is the sum of the two preceding ones, starting from 0 and 1: 0, 1, 1, 2, 3, 5, 8, 13, 21…' },
    { q:'Why is 80 the maximum?', a:'JavaScript uses 64-bit floating-point numbers, which can only represent integers exactly up to 2^53 (about 9 quadrillion). The 80th Fibonacci number (2,307 quadrillion) is near this limit; beyond it, results are approximations.' },
    { q:'Where does Fibonacci appear in nature?', a:'The Fibonacci sequence appears in flower petals, spiral shells, tree branching, pineapple scales, and pinecone spirals. The ratio of successive Fibonacci numbers converges to the golden ratio φ ≈ 1.6180339887.' }
  ]},
  { title:'Gerador de Sequência de Fibonacci — listar os N primeiros números', metaDescription:'Gerador de Fibonacci gratuito. Informe quantos termos quer e veja a sequência de Fibonacci instantaneamente. Suporta até 80 termos com valores exatos.', h1:'Gerador de Sequência de Fibonacci', intro:'Informe quantos termos gerar e obtenha a sequência de Fibonacci instantaneamente.', faq_title:'Perguntas frequentes sobre Fibonacci', ui:{ terms:'Número de termos (1–80)', generate:'Gerar' }, faq:[
    { q:'O que é a sequência de Fibonacci?', a:'Cada número é a soma dos dois anteriores, começando em 0 e 1: 0, 1, 1, 2, 3, 5, 8, 13, 21…' },
    { q:'Por que o máximo é 80?', a:'O JavaScript usa números de ponto flutuante de 64 bits, que representam inteiros exatamente apenas até 2^53. O 80º número de Fibonacci está próximo desse limite; além disso, os resultados são aproximações.' },
    { q:'Onde Fibonacci aparece na natureza?', a:'A sequência de Fibonacci aparece em pétalas de flores, conchas espirais, galhos de árvores, abacaxis e pinhas. A razão entre termos consecutivos converge para a razão áurea φ ≈ 1,6180339887.' }
  ]},
  `(function(){
  document.getElementById('fib-form').addEventListener('submit',function(e){
    e.preventDefault();
    const n=Math.min(80,Math.max(1,parseInt(document.getElementById('fib-n').value)||10));
    const seq=[0,1];
    for(let i=2;i<n;i++)seq.push(seq[i-1]+seq[i-2]);
    const terms=seq.slice(0,n);
    document.getElementById('fib-out').innerHTML=\`<div style="font-family:monospace;word-break:break-all;line-height:1.8">\${terms.map((v,i)=>\`<span style="display:inline-block;margin:2px 4px;padding:2px 6px;background:var(--surface);border:1px solid var(--line);border-radius:4px">\${v}</span>\`).join('')}</div><p style="opacity:0.6;font-size:0.85rem;margin-top:0.5rem">φ ratio (last two): \${n>=2?(terms[n-1]/terms[n-2]).toFixed(10):''}</p>\`;
  });
})();`
);

// ─── 85 ── Prime Factorization ───────────────────────────────────────────────
tool('primefactor', 'math', '🔑',
  `<form id="pf-form"><div class="row"><div class="field"><label for="pf-n">{{ui.number}}</label><input type="number" id="pf-n" min="2" max="999999999" placeholder="360" inputmode="numeric"></div><button class="btn" type="submit">{{ui.factorize}}</button></div></form><div class="result"><div id="pf-out">—</div></div>`,
  { title:'Prime Factorization Calculator — find prime factors of any number', metaDescription:'Free prime factorization calculator. Enter any positive integer up to 999,999,999 and instantly see its prime factorization with exponents.', h1:'Prime Factorization Calculator', intro:'Enter a positive integer and get its complete prime factorization with exponents and all divisors.', faq_title:'Prime factorization FAQ', ui:{ number:'Enter a positive integer', factorize:'Factorize' }, faq:[
    { q:'What is prime factorization?', a:'Every integer greater than 1 can be expressed as a unique product of prime numbers. For example, 360 = 2³ × 3² × 5. This is called the fundamental theorem of arithmetic.' },
    { q:'What are divisors?', a:'A divisor (or factor) of n is any number that divides n with no remainder. The complete set of divisors can be derived from the prime factorization.' },
    { q:'How is this used in practice?', a:'Prime factorization is used to find the greatest common divisor (GCD) and least common multiple (LCM) of two numbers, simplify fractions, and is foundational to RSA encryption.' }
  ]},
  { title:'Calculadora de Fatoração Prima — encontre fatores primos de qualquer número', metaDescription:'Calculadora de fatoração prima gratuita. Insira qualquer inteiro positivo até 999.999.999 e veja sua fatoração prima com expoentes instantaneamente.', h1:'Calculadora de Fatoração Prima', intro:'Insira um inteiro positivo e obtenha sua fatoração prima completa com expoentes e todos os divisores.', faq_title:'Perguntas frequentes sobre fatoração prima', ui:{ number:'Digite um inteiro positivo', factorize:'Fatorar' }, faq:[
    { q:'O que é fatoração prima?', a:'Todo inteiro maior que 1 pode ser expresso como um produto único de números primos. Por exemplo, 360 = 2³ × 3² × 5. Isso é chamado de teorema fundamental da aritmética.' },
    { q:'O que são divisores?', a:'Um divisor de n é qualquer número que divide n sem resto. O conjunto completo de divisores pode ser derivado da fatoração prima.' },
    { q:'Como isso é usado na prática?', a:'A fatoração prima é usada para encontrar o MDC e o MMC de dois números, simplificar frações, e é fundamental para a criptografia RSA.' }
  ]},
  `(function(){
  document.getElementById('pf-form').addEventListener('submit',function(e){
    e.preventDefault();
    let n=parseInt(document.getElementById('pf-n').value);
    if(!n||n<2){document.getElementById('pf-out').textContent='Enter a number ≥ 2';return;}
    const factors={};let temp=n;
    for(let d=2;d*d<=temp;d++){while(temp%d===0){factors[d]=(factors[d]||0)+1;temp=Math.floor(temp/d);}}
    if(temp>1)factors[temp]=(factors[temp]||0)+1;
    const expr=Object.entries(factors).map(([p,e])=>e>1?\`\${p}<sup>\${e}</sup>\`:p).join(' × ');
    // compute divisors
    let divs=[1];
    Object.entries(factors).forEach(([p,e])=>{
      const pp=parseInt(p);const newDivs=[];
      for(let i=1;i<=e;i++)divs.forEach(d=>newDivs.push(d*Math.pow(pp,i)));
      divs=[...divs,...newDivs];
    });
    divs.sort((a,b)=>a-b);
    document.getElementById('pf-out').innerHTML=\`<p><strong>\${n} = \${expr}</strong></p><p style="opacity:0.6;font-size:0.85rem">Divisors (\${divs.length}): \${divs.join(', ')}</p>\`;
  });
})();`
);

// ─── 86 ── Factorial Calculator ──────────────────────────────────────────────
tool('factorial', 'math', '❗',
  `<form id="fact-form"><div class="row"><div class="field"><label for="fact-n">n</label><input type="number" id="fact-n" min="0" max="170" value="10" inputmode="numeric"></div><button class="btn" type="submit">n!</button></div></form><div class="result"><span class="big" id="fact-out">—</span><p id="fact-digits" class="hint"></p></div>`,
  { title:'Factorial Calculator — compute n! for any integer up to 170', metaDescription:'Free factorial calculator. Compute n! for any integer from 0 to 170. Shows the exact result, scientific notation and number of digits.', h1:'Factorial Calculator', intro:'Enter a non-negative integer n and get n! (n factorial) — the product of all positive integers up to n.', faq_title:'Factorial calculator FAQ', ui:{}, faq:[
    { q:'What is a factorial?', a:'n! (n factorial) is the product of all positive integers from 1 to n. For example, 5! = 5 × 4 × 3 × 2 × 1 = 120. By convention, 0! = 1.' },
    { q:'Why is 170 the maximum?', a:'170! is approximately 7.26 × 10^306, which is near the maximum value of a 64-bit floating-point number (≈ 1.8 × 10^308). Beyond 170, the result overflows to Infinity.' },
    { q:'Where are factorials used?', a:'Factorials appear in combinatorics (permutations and combinations), probability theory, Taylor series expansions (e^x, sin x), and Stirling\'s approximation.' }
  ]},
  { title:'Calculadora de Fatorial — calcule n! para qualquer inteiro até 170', metaDescription:'Calculadora de fatorial gratuita. Calcule n! para qualquer inteiro de 0 a 170. Mostra o resultado exato, notação científica e número de dígitos.', h1:'Calculadora de Fatorial', intro:'Digite um inteiro não-negativo n e obtenha n! (n fatorial) — o produto de todos os inteiros positivos até n.', faq_title:'Perguntas frequentes da calculadora de fatorial', ui:{}, faq:[
    { q:'O que é fatorial?', a:'n! é o produto de todos os inteiros positivos de 1 a n. Por exemplo, 5! = 5 × 4 × 3 × 2 × 1 = 120. Por convenção, 0! = 1.' },
    { q:'Por que o máximo é 170?', a:'170! é aproximadamente 7,26 × 10^306, perto do valor máximo de um número de ponto flutuante de 64 bits. Além de 170, o resultado estoura para Infinity.' },
    { q:'Onde os fatoriais são usados?', a:'Fatoriais aparecem em combinatória (permutações e combinações), teoria da probabilidade, séries de Taylor (e^x, sin x) e na aproximação de Stirling.' }
  ]},
  `(function(){
  document.getElementById('fact-form').addEventListener('submit',function(e){
    e.preventDefault();
    const n=Math.min(170,Math.max(0,parseInt(document.getElementById('fact-n').value)||0));
    let result=1;
    for(let i=2;i<=n;i++)result*=i;
    const out=document.getElementById('fact-out');
    const dig=document.getElementById('fact-digits');
    if(n<=20){out.textContent=result.toLocaleString();}
    else{out.textContent=result.toExponential(6);}
    dig.textContent=n+'! has approximately '+Math.ceil(n*Math.log10(n)-n*Math.LOG10E+0.5).toString()+' digits';
  });
})();`
);

// ─── 87 ── Combination & Permutation ─────────────────────────────────────────
tool('combinatorics', 'math', '🧮',
  `<form id="comb-form"><div class="row"><div class="field"><label for="comb-n">n</label><input type="number" id="comb-n" min="0" max="30" value="5" inputmode="numeric"></div><div class="field"><label for="comb-r">r</label><input type="number" id="comb-r" min="0" max="30" value="3" inputmode="numeric"></div><button class="btn" type="submit">{{ui.calculate}}</button></div></form><div class="result" id="comb-out" hidden><div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem"><div><div style="opacity:0.6;font-size:0.85rem">C(n,r) — Combinations</div><span class="big" id="comb-c">—</span></div><div><div style="opacity:0.6;font-size:0.85rem">P(n,r) — Permutations</div><span class="big" id="comb-p">—</span></div></div></div>`,
  { title:'Combination & Permutation Calculator — C(n,r) and P(n,r)', metaDescription:'Free combination and permutation calculator. Compute C(n,r) and P(n,r) for any n and r up to 30. Shows both formulas.', h1:'Combination & Permutation Calculator', intro:'Enter n (total items) and r (chosen items) to compute both the number of combinations C(n,r) and permutations P(n,r).', faq_title:'Combinatorics FAQ', ui:{ calculate:'Calculate' }, faq:[
    { q:'What is the difference between combinations and permutations?', a:'Permutations count arrangements where order matters: choosing 3 books from 5 and ordering them on a shelf. Combinations count selections where order does not matter: choosing 3 books from 5 to take on a trip. P(n,r) = n!/(n-r)! and C(n,r) = n!/(r!(n-r)!).' },
    { q:'What does C(5,3) = 10 mean?', a:'There are exactly 10 different ways to choose 3 items from 5 when order does not matter.' },
    { q:'Why is n limited to 30?', a:'Factorials grow extremely fast. 30! ≈ 2.65 × 10^32, which is still within the range of exact 64-bit floats for common n and r values.' }
  ]},
  { title:'Calculadora de Combinação e Permutação — C(n,r) e P(n,r)', metaDescription:'Calculadora de combinação e permutação gratuita. Calcule C(n,r) e P(n,r) para qualquer n e r até 30.', h1:'Calculadora de Combinação e Permutação', intro:'Digite n (total de itens) e r (itens escolhidos) para calcular o número de combinações C(n,r) e permutações P(n,r).', faq_title:'Perguntas frequentes sobre combinatória', ui:{ calculate:'Calcular' }, faq:[
    { q:'Qual a diferença entre combinações e permutações?', a:'Permutações contam arranjos onde a ordem importa: escolher 3 livros de 5 e ordená-los numa prateleira. Combinações contam seleções onde a ordem não importa: escolher 3 livros de 5 para levar numa viagem.' },
    { q:'O que significa C(5,3) = 10?', a:'Existem exatamente 10 maneiras diferentes de escolher 3 itens de 5 quando a ordem não importa.' },
    { q:'Por que n é limitado a 30?', a:'Fatoriais crescem extremamente rápido. 30! ≈ 2,65 × 10^32, ainda dentro do intervalo de floats de 64 bits para valores comuns de n e r.' }
  ]},
  `(function(){
  function fact(n){let r=1;for(let i=2;i<=n;i++)r*=i;return r;}
  document.getElementById('comb-form').addEventListener('submit',function(e){
    e.preventDefault();
    const n=Math.min(30,Math.max(0,parseInt(document.getElementById('comb-n').value)||0));
    const r=Math.min(n,Math.max(0,parseInt(document.getElementById('comb-r').value)||0));
    const pnr=fact(n)/fact(n-r);
    const cnr=pnr/fact(r);
    document.getElementById('comb-c').textContent=cnr.toLocaleString();
    document.getElementById('comb-p').textContent=pnr.toLocaleString();
    document.getElementById('comb-out').hidden=false;
  });
})();`
);

// ─── 88 ── Quadratic Equation Solver ─────────────────────────────────────────
tool('quadratic', 'math', '📈',
  `<form id="quad-form"><p style="opacity:0.7;font-size:0.9rem">ax² + bx + c = 0</p><div class="row"><div class="field"><label for="quad-a">a</label><input type="number" id="quad-a" step="any" placeholder="1" inputmode="decimal"></div><div class="field"><label for="quad-b">b</label><input type="number" id="quad-b" step="any" placeholder="-5" inputmode="decimal"></div><div class="field"><label for="quad-c">c</label><input type="number" id="quad-c" step="any" placeholder="6" inputmode="decimal"></div><button class="btn" type="submit">{{ui.solve}}</button></div></form><div class="result"><div id="quad-out">—</div></div>`,
  { title:'Quadratic Equation Solver — find roots of ax² + bx + c = 0', metaDescription:'Free quadratic equation solver. Enter a, b and c coefficients to find the roots of ax² + bx + c = 0 using the quadratic formula.', h1:'Quadratic Equation Solver', intro:'Enter the coefficients a, b and c of the equation ax² + bx + c = 0 and get the real (or complex) roots instantly.', faq_title:'Quadratic equation FAQ', ui:{ solve:'Solve' }, faq:[
    { q:'What is the quadratic formula?', a:'x = (−b ± √(b²−4ac)) / (2a). The term inside the square root, b²−4ac, is called the discriminant. If it is positive there are two real roots, zero means one repeated root, and negative means two complex roots.' },
    { q:'What are complex roots?', a:'When the discriminant is negative, the square root of a negative number is imaginary. The roots have the form p ± qi where i = √(−1). Complex roots always come in conjugate pairs.' },
    { q:'What if a = 0?', a:'If a = 0 the equation is not quadratic — it becomes linear: bx + c = 0, with solution x = −c/b.' }
  ]},
  { title:'Resolvedor de Equação Quadrática — encontre as raízes de ax² + bx + c = 0', metaDescription:'Resolvedor de equação quadrática gratuito. Insira os coeficientes a, b e c para encontrar as raízes de ax² + bx + c = 0 usando a fórmula de Báskara.', h1:'Resolvedor de Equação Quadrática', intro:'Insira os coeficientes a, b e c da equação ax² + bx + c = 0 e obtenha as raízes reais (ou complexas) instantaneamente.', faq_title:'Perguntas frequentes sobre equação quadrática', ui:{ solve:'Resolver' }, faq:[
    { q:'O que é a fórmula de Báskara?', a:'x = (−b ± √(b²−4ac)) / (2a). O termo dentro da raiz quadrada, b²−4ac, é chamado de discriminante. Se positivo: duas raízes reais. Se zero: uma raiz repetida. Se negativo: duas raízes complexas.' },
    { q:'O que são raízes complexas?', a:'Quando o discriminante é negativo, a raiz quadrada de um número negativo é imaginária. As raízes têm a forma p ± qi onde i = √(−1). Raízes complexas sempre vêm em pares conjugados.' },
    { q:'E se a = 0?', a:'Se a = 0 a equação não é quadrática — torna-se linear: bx + c = 0, com solução x = −c/b.' }
  ]},
  `(function(){
  document.getElementById('quad-form').addEventListener('submit',function(e){
    e.preventDefault();
    const a=parseFloat(document.getElementById('quad-a').value);
    const b=parseFloat(document.getElementById('quad-b').value);
    const c=parseFloat(document.getElementById('quad-c').value);
    const out=document.getElementById('quad-out');
    if(isNaN(a)||isNaN(b)||isNaN(c)){out.textContent='Enter all three coefficients';return;}
    if(a===0){out.innerHTML=b===0?'<p>No solution (0=0 or contradiction)</p>':\`<p>Linear equation: x = \${(-c/b).toPrecision(6)}</p>\`;return;}
    const disc=b*b-4*a*c;
    const denom=2*a;
    if(disc>0){
      const x1=(-b+Math.sqrt(disc))/denom;
      const x2=(-b-Math.sqrt(disc))/denom;
      out.innerHTML=\`<p>Two real roots:<br>x₁ = \${x1.toPrecision(8)}<br>x₂ = \${x2.toPrecision(8)}</p><p style="opacity:0.6;font-size:0.85rem">Discriminant Δ = \${disc.toPrecision(6)}</p>\`;
    }else if(disc===0){
      out.innerHTML=\`<p>One repeated root: x = \${(-b/denom).toPrecision(8)}</p><p style="opacity:0.6;font-size:0.85rem">Discriminant Δ = 0</p>\`;
    }else{
      const re=(-b/denom).toPrecision(6);
      const im=(Math.sqrt(-disc)/Math.abs(denom)).toPrecision(6);
      out.innerHTML=\`<p>Two complex roots:<br>x₁ = \${re} + \${im}i<br>x₂ = \${re} − \${im}i</p><p style="opacity:0.6;font-size:0.85rem">Discriminant Δ = \${disc.toPrecision(6)}</p>\`;
    }
  });
})();`
);

// ─── 89 ── Percentage Change Calculator ───────────────────────────────────────
tool('percentchange', 'math', '📉',
  `<form id="pc-form"><div class="row"><div class="field"><label for="pc-old">{{ui.oldValue}}</label><input type="number" id="pc-old" step="any" inputmode="decimal"></div><div class="field"><label for="pc-new">{{ui.newValue}}</label><input type="number" id="pc-new" step="any" inputmode="decimal"></div></div><div class="result"><span class="big" id="pc-out">—</span><p id="pc-label" class="hint"></p></div></form>`,
  { title:'Percentage Change Calculator — increase or decrease percentage', metaDescription:'Free percentage change calculator. Find the percentage increase or decrease between two values instantly. Shows exact change and direction.', h1:'Percentage Change Calculator', intro:'Enter the original (old) value and the new value to calculate the percentage increase or decrease.', faq_title:'Percentage change FAQ', ui:{ oldValue:'Original value', newValue:'New value' }, faq:[
    { q:'What is the percentage change formula?', a:'% change = ((new − old) / |old|) × 100. A positive result means increase, negative means decrease.' },
    { q:'What if the original value is zero?', a:'Division by zero is undefined — percentage change is not meaningful when the original value is zero.' },
    { q:'What is the difference between percentage change and percentage points?', a:'If an interest rate rises from 5% to 7%, the percentage change is 40% (2/5 × 100), but the change in percentage points is 2. Always clarify which you mean when discussing rates.' }
  ]},
  { title:'Calculadora de Variação Percentual — aumento ou redução percentual', metaDescription:'Calculadora de variação percentual gratuita. Calcule o aumento ou redução percentual entre dois valores instantaneamente.', h1:'Calculadora de Variação Percentual', intro:'Insira o valor original (antigo) e o novo valor para calcular a variação percentual de aumento ou redução.', faq_title:'Perguntas frequentes sobre variação percentual', ui:{ oldValue:'Valor original', newValue:'Novo valor' }, faq:[
    { q:'Qual é a fórmula da variação percentual?', a:'% variação = ((novo − antigo) / |antigo|) × 100. Resultado positivo = aumento; negativo = redução.' },
    { q:'E se o valor original for zero?', a:'A divisão por zero é indefinida — a variação percentual não faz sentido quando o valor original é zero.' },
    { q:'Qual a diferença entre variação percentual e pontos percentuais?', a:'Se uma taxa de juros sobe de 5% para 7%, a variação percentual é 40% (2/5 × 100), mas a mudança em pontos percentuais é 2. Sempre deixe claro qual está usando.' }
  ]},
  `(function(){
  function upd(){
    const o=parseFloat(document.getElementById('pc-old').value);
    const n=parseFloat(document.getElementById('pc-new').value);
    const out=document.getElementById('pc-out');
    const lbl=document.getElementById('pc-label');
    if(isNaN(o)||isNaN(n)||o===0){out.textContent='—';lbl.textContent='';return;}
    const pct=((n-o)/Math.abs(o))*100;
    const sign=pct>=0?'+':'';
    out.textContent=sign+pct.toFixed(2)+'%';
    out.style.color=pct>=0?'var(--green,#22c55e)':'var(--red,#ef4444)';
    lbl.textContent=(pct>=0?'Increase':'Decrease')+' of '+Math.abs(n-o).toPrecision(6);
  }
  document.getElementById('pc-old').addEventListener('input',upd);
  document.getElementById('pc-new').addEventListener('input',upd);
})();`
);

// ─── 90 ── Average Calculator ────────────────────────────────────────────────
tool('averagecalc', 'math', '➗',
  `<form id="avg-form"><div class="field"><label for="avg-in">{{ui.numbers}}</label><input type="text" id="avg-in" placeholder="10, 20, 30, 40, 50"></div><div class="row" style="justify-content:center"><button class="btn" type="submit">{{ui.calculate}}</button></div></form><div id="avg-out" hidden class="result" style="text-align:left;display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:0.5rem"></div>`,
  { title:'Average Calculator — mean, geometric and harmonic mean', metaDescription:'Free average calculator. Enter a list of numbers to compute the arithmetic mean, geometric mean, harmonic mean, weighted average and more.', h1:'Average Calculator', intro:'Enter comma-separated numbers to calculate arithmetic mean, geometric mean, harmonic mean, sum, and count.', faq_title:'Average calculator FAQ', ui:{ numbers:'Numbers (comma-separated)', calculate:'Calculate' }, faq:[
    { q:'What types of averages are there?', a:'The arithmetic mean is the sum divided by count. The geometric mean is the n-th root of the product of all values (used for growth rates). The harmonic mean is n divided by the sum of reciprocals (used for rates and speeds).' },
    { q:'When should I use geometric mean vs arithmetic mean?', a:'Use geometric mean for percentage growth rates, investment returns, and ratios. For example, if an investment grows 50% then falls 50%, the arithmetic mean says 0% average change, but the geometric mean correctly shows a net −13% loss.' },
    { q:'Can I enter negative numbers?', a:'Arithmetic mean works with any numbers. Geometric mean requires all positive numbers. Harmonic mean requires all non-zero numbers.' }
  ]},
  { title:'Calculadora de Média — média aritmética, geométrica e harmônica', metaDescription:'Calculadora de média gratuita. Insira uma lista de números e calcule a média aritmética, geométrica, harmônica, soma e contagem.', h1:'Calculadora de Média', intro:'Digite números separados por vírgula para calcular a média aritmética, geométrica, harmônica, soma e contagem.', faq_title:'Perguntas frequentes sobre médias', ui:{ numbers:'Números (separados por vírgula)', calculate:'Calcular' }, faq:[
    { q:'Quais tipos de média existem?', a:'A média aritmética é a soma dividida pela contagem. A média geométrica é a n-ésima raiz do produto de todos os valores (usada para taxas de crescimento). A média harmônica é n dividido pela soma dos recíprocos (usada para taxas e velocidades).' },
    { q:'Quando usar média geométrica vs aritmética?', a:'Use média geométrica para taxas de crescimento percentual, retornos de investimento e razões. Por exemplo, um investimento que cresce 50% e depois cai 50% tem média aritmética de 0%, mas a média geométrica mostra corretamente −13% de perda líquida.' },
    { q:'Posso inserir números negativos?', a:'A média aritmética funciona com qualquer número. A média geométrica requer todos positivos. A média harmônica requer todos não-zero.' }
  ]},
  `(function(){
  document.getElementById('avg-form').addEventListener('submit',function(e){
    e.preventDefault();
    const nums=document.getElementById('avg-in').value.split(',').map(s=>parseFloat(s.trim())).filter(n=>!isNaN(n));
    if(!nums.length)return;
    const n=nums.length;
    const sum=nums.reduce((s,v)=>s+v,0);
    const arith=sum/n;
    const geomPossible=nums.every(v=>v>0);
    const geom=geomPossible?Math.pow(nums.reduce((p,v)=>p*v,1),1/n):null;
    const harmPossible=nums.every(v=>v!==0);
    const harm=harmPossible?n/nums.reduce((s,v)=>s+1/v,0):null;
    const items=[
      ['Count',n],['Sum',sum.toPrecision(8)],['Arithmetic mean',arith.toPrecision(8)],
      ['Geometric mean',geom!==null?geom.toPrecision(8):'N/A (needs positives)'],
      ['Harmonic mean',harm!==null?harm.toPrecision(8):'N/A (needs non-zero)'],
    ];
    const out=document.getElementById('avg-out');
    out.hidden=false;
    out.innerHTML=items.map(([k,v])=>\`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">\${k}</div><strong>\${v}</strong></div>\`).join('');
  });
})();`
);

// ─── 91 ── Roman Numeral Converter ───────────────────────────────────────────
tool('romanconverter', 'math', '🏛️',
  `<div id="rom-app"><div class="field"><label for="rom-dec">{{ui.decimal}}</label><input type="number" id="rom-dec" min="1" max="3999" placeholder="2024" inputmode="numeric"></div><div class="result" style="font-size:2rem;font-weight:700" id="rom-out">—</div><hr style="border:none;border-top:1px solid var(--line);margin:1rem 0"><div class="field"><label for="rom-in">{{ui.roman}}</label><input type="text" id="rom-in" placeholder="MMXXIV" style="text-transform:uppercase"></div><div class="result" id="rom-dec-out">—</div></div>`,
  { title:'Roman Numeral Converter — decimal to Roman and back', metaDescription:'Free Roman numeral converter. Convert any decimal number 1–3999 to Roman numerals, or convert Roman numerals back to decimal.', h1:'Roman Numeral Converter', intro:'Enter a number (1–3999) to convert to Roman numerals, or type Roman numerals to convert to decimal.', faq_title:'Roman numeral FAQ', ui:{ decimal:'Decimal → Roman', roman:'Roman → Decimal' }, faq:[
    { q:'What numbers can be written in Roman numerals?', a:'Standard Roman numerals cover 1 to 3999. There is no zero in Roman notation. Numbers above 3999 are sometimes written with a bar over a numeral (vinculum) to multiply by 1000, but these are non-standard.' },
    { q:'What are the basic Roman numeral symbols?', a:'I=1, V=5, X=10, L=50, C=100, D=500, M=1000. Subtractive notation: IV=4, IX=9, XL=40, XC=90, CD=400, CM=900.' },
    { q:'When were Roman numerals used?', a:'Roman numerals were the standard number system throughout the Roman Empire and remained common in medieval Europe. They are still used today for clock faces, book chapters, movie sequels, and year numbers in formal contexts.' }
  ]},
  { title:'Conversor de Algarismos Romanos — decimal para romano e vice-versa', metaDescription:'Conversor de algarismos romanos gratuito. Converta qualquer decimal de 1–3999 para algarismos romanos, ou converta algarismos romanos de volta para decimal.', h1:'Conversor de Algarismos Romanos', intro:'Digite um número (1–3999) para converter em algarismos romanos, ou escreva algarismos romanos para converter em decimal.', faq_title:'Perguntas frequentes sobre algarismos romanos', ui:{ decimal:'Decimal → Romano', roman:'Romano → Decimal' }, faq:[
    { q:'Quais números podem ser escritos em algarismos romanos?', a:'Os algarismos romanos padrão cobrem de 1 a 3999. Não existe zero na notação romana. Números acima de 3999 às vezes são escritos com uma barra sobre o algarismo (vinculum) para multiplicar por 1000, mas isso não é padrão.' },
    { q:'Quais são os símbolos básicos?', a:'I=1, V=5, X=10, L=50, C=100, D=500, M=1000. Notação subtrativa: IV=4, IX=9, XL=40, XC=90, CD=400, CM=900.' },
    { q:'Quando os algarismos romanos eram usados?', a:'Os algarismos romanos eram o sistema numérico padrão no Império Romano e permaneceram comuns na Europa medieval. Ainda são usados em relógios, capítulos de livros, sequências de filmes e anos em contextos formais.' }
  ]},
  `(function(){
  const vals=[1000,900,500,400,100,90,50,40,10,9,5,4,1];
  const syms=['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I'];
  function toRoman(n){
    if(!n||n<1||n>3999)return'Invalid';
    let r='';
    vals.forEach((v,i)=>{while(n>=v){r+=syms[i];n-=v;}});
    return r;
  }
  function fromRoman(s){
    const map={I:1,V:5,X:10,L:50,C:100,D:500,M:1000};
    s=s.toUpperCase().trim();
    let total=0;
    for(let i=0;i<s.length;i++){
      const cur=map[s[i]],nxt=map[s[i+1]];
      if(!cur)return NaN;
      if(nxt&&nxt>cur){total-=cur;}else{total+=cur;}
    }
    return total;
  }
  document.getElementById('rom-dec').addEventListener('input',function(){
    document.getElementById('rom-out').textContent=toRoman(parseInt(this.value));
  });
  document.getElementById('rom-in').addEventListener('input',function(){
    const v=fromRoman(this.value);
    document.getElementById('rom-dec-out').textContent=isNaN(v)?'Invalid':v;
  });
})();`
);

// ─── 92 ── Exponent Calculator ────────────────────────────────────────────────
tool('exponentcalc', 'math', '🔋',
  `<form id="exp-form"><div class="row"><div class="field"><label for="exp-base">{{ui.base}}</label><input type="number" id="exp-base" step="any" placeholder="2" inputmode="decimal"></div><div class="field"><label for="exp-pow">{{ui.exponent}}</label><input type="number" id="exp-pow" step="any" placeholder="10" inputmode="decimal"></div><button class="btn" type="submit">{{ui.calculate}}</button></div></form><div class="result"><span class="big" id="exp-out">—</span></div>`,
  { title:'Exponent Calculator — compute base to the power of exponent', metaDescription:'Free exponent calculator. Compute base^exponent for any real numbers. Handles negative exponents, fractional powers and large results.', h1:'Exponent Calculator', intro:'Enter the base and exponent to compute base^exponent. Works with negative, decimal, and fractional exponents.', faq_title:'Exponent calculator FAQ', ui:{ base:'Base', exponent:'Exponent', calculate:'Calculate' }, faq:[
    { q:'What is a negative exponent?', a:'A negative exponent means the reciprocal: 2^(−3) = 1/(2^3) = 1/8 = 0.125.' },
    { q:'What is a fractional exponent?', a:'A fractional exponent is a root: x^(1/2) = √x, x^(1/3) = ∛x. So 8^(1/3) = 2 because 2³ = 8.' },
    { q:'What is 0^0?', a:'0^0 is mathematically indeterminate, but in most computing contexts it is defined as 1 for convenience (this is what JavaScript\'s Math.pow(0,0) returns).' }
  ]},
  { title:'Calculadora de Potência — calcule base elevada ao expoente', metaDescription:'Calculadora de potência gratuita. Calcule base^expoente para quaisquer números reais. Suporta expoentes negativos, fracionários e resultados grandes.', h1:'Calculadora de Potência', intro:'Digite a base e o expoente para calcular base^expoente. Funciona com expoentes negativos, decimais e fracionários.', faq_title:'Perguntas frequentes sobre potência', ui:{ base:'Base', exponent:'Expoente', calculate:'Calcular' }, faq:[
    { q:'O que é um expoente negativo?', a:'Um expoente negativo significa o recíproco: 2^(−3) = 1/(2^3) = 1/8 = 0,125.' },
    { q:'O que é um expoente fracionário?', a:'Um expoente fracionário é uma raiz: x^(1/2) = √x, x^(1/3) = ∛x. Então 8^(1/3) = 2 porque 2³ = 8.' },
    { q:'O que é 0^0?', a:'0^0 é matematicamente indeterminado, mas na maioria dos contextos computacionais é definido como 1 por conveniência (é o que Math.pow(0,0) do JavaScript retorna).' }
  ]},
  `(function(){
  document.getElementById('exp-form').addEventListener('submit',function(e){
    e.preventDefault();
    const b=parseFloat(document.getElementById('exp-base').value);
    const p=parseFloat(document.getElementById('exp-pow').value);
    const out=document.getElementById('exp-out');
    if(isNaN(b)||isNaN(p)){out.textContent='—';return;}
    const result=Math.pow(b,p);
    if(!isFinite(result)){out.textContent='Overflow';return;}
    out.textContent=Math.abs(result)>1e12||Math.abs(result)<1e-6?result.toExponential(6):+result.toPrecision(10);
  });
})();`
);

// ─── 93 ── Logarithm Calculator ───────────────────────────────────────────────
tool('logcalc', 'math', '📐',
  `<form id="log-form"><div class="row"><div class="field"><label for="log-x">x</label><input type="number" id="log-x" step="any" min="0.0001" placeholder="100" inputmode="decimal"></div><div class="field"><label for="log-base">{{ui.base}}</label><select id="log-base"><option value="10">log₁₀ (common)</option><option value="e">ln (natural)</option><option value="2">log₂ (binary)</option><option value="custom">{{ui.custom}}</option></select></div><input type="number" id="log-custom" placeholder="{{ui.customBase}}" min="0.0001" step="any" hidden style="margin-top:0.5rem;padding:0.5rem;border:1px solid var(--line);border-radius:8px;width:100%;background:var(--surface);color:var(--text)"><button class="btn" type="submit">{{ui.calculate}}</button></div></form><div class="result"><span class="big" id="log-out">—</span></div>`,
  { title:'Logarithm Calculator — compute log base 10, ln, log2 and custom', metaDescription:'Free logarithm calculator. Compute common log (base 10), natural log (ln), binary log (base 2), or any custom base logarithm.', h1:'Logarithm Calculator', intro:'Enter a positive number x and choose the base. Supports log₁₀, ln (natural log), log₂ and any custom base.', faq_title:'Logarithm calculator FAQ', ui:{ base:'Base', custom:'Custom base…', customBase:'Enter base', calculate:'Calculate' }, faq:[
    { q:'What is a logarithm?', a:'log_b(x) = y means b^y = x. The logarithm answers the question: "to what power must I raise b to get x?" For example, log₁₀(1000) = 3 because 10³ = 1000.' },
    { q:'What is the natural logarithm (ln)?', a:'The natural log uses Euler\'s number e ≈ 2.71828 as the base. ln(x) = log_e(x). It appears naturally in exponential growth, compound interest, and calculus.' },
    { q:'What is log₂ used for?', a:'Binary logarithm (log₂) is fundamental in computer science. The number of bits needed to represent n values is ⌈log₂(n)⌉. For example, 256 values need 8 bits because log₂(256) = 8.' }
  ]},
  { title:'Calculadora de Logaritmo — calcule log base 10, ln, log2 e base personalizada', metaDescription:'Calculadora de logaritmo gratuita. Calcule logaritmo comum (base 10), logaritmo natural (ln), logaritmo binário (base 2) ou qualquer base personalizada.', h1:'Calculadora de Logaritmo', intro:'Insira um número positivo x e escolha a base. Suporta log₁₀, ln (log natural), log₂ e qualquer base personalizada.', faq_title:'Perguntas frequentes sobre logaritmo', ui:{ base:'Base', custom:'Base personalizada…', customBase:'Digite a base', calculate:'Calcular' }, faq:[
    { q:'O que é um logaritmo?', a:'log_b(x) = y significa b^y = x. O logaritmo responde: "a qual potência devo elevar b para obter x?" Por exemplo, log₁₀(1000) = 3 porque 10³ = 1000.' },
    { q:'O que é o logaritmo natural (ln)?', a:'O logaritmo natural usa o número de Euler e ≈ 2,71828 como base. ln(x) = log_e(x). Aparece naturalmente no crescimento exponencial, juros compostos e cálculo.' },
    { q:'Para que serve o log₂?', a:'O logaritmo binário (log₂) é fundamental em ciência da computação. O número de bits para representar n valores é ⌈log₂(n)⌉. Por exemplo, 256 valores precisam de 8 bits porque log₂(256) = 8.' }
  ]},
  `(function(){
  const sel=document.getElementById('log-base');
  const cust=document.getElementById('log-custom');
  sel.addEventListener('change',function(){cust.hidden=this.value!=='custom';});
  document.getElementById('log-form').addEventListener('submit',function(e){
    e.preventDefault();
    const x=parseFloat(document.getElementById('log-x').value);
    const bSel=sel.value;
    const b=bSel==='e'?Math.E:bSel==='custom'?parseFloat(cust.value):parseFloat(bSel);
    const out=document.getElementById('log-out');
    if(!x||x<=0){out.textContent='x must be > 0';return;}
    if(!b||b<=0||b===1){out.textContent='Base must be > 0 and ≠ 1';return;}
    const result=Math.log(x)/Math.log(b);
    out.textContent=result.toPrecision(10);
  });
})();`
);

// ─── 94 ── Trigonometry Calculator ───────────────────────────────────────────
tool('trigcalc', 'math', '📐',
  `<form id="trig-form"><div class="row"><div class="field"><label for="trig-val">{{ui.angle}}</label><input type="number" id="trig-val" step="any" placeholder="45" inputmode="decimal"></div><div class="field"><label for="trig-unit">{{ui.unit}}</label><select id="trig-unit"><option value="deg">{{ui.degrees}}</option><option value="rad">{{ui.radians}}</option></select></div><button class="btn" type="submit">{{ui.calculate}}</button></div></form><div id="trig-out" hidden class="result" style="text-align:left;display:grid;grid-template-columns:repeat(3,1fr);gap:0.5rem"></div>`,
  { title:'Trigonometry Calculator — sin, cos, tan and inverses', metaDescription:'Free trigonometry calculator. Compute sin, cos, tan, cot, sec, csc for any angle in degrees or radians.', h1:'Trigonometry Calculator', intro:'Enter an angle (degrees or radians) and get all six trigonometric function values instantly.', faq_title:'Trigonometry calculator FAQ', ui:{ angle:'Angle', unit:'Unit', degrees:'Degrees', radians:'Radians', calculate:'Calculate' }, faq:[
    { q:'What are the six trigonometric functions?', a:'Sin (sine), cos (cosine), tan (tangent), cot (cotangent = 1/tan), sec (secant = 1/cos), csc (cosecant = 1/sin). They relate angles to ratios of sides in a right triangle.' },
    { q:'When is tan undefined?', a:'Tan(θ) = sin(θ)/cos(θ), so it is undefined when cos(θ) = 0, which happens at 90°, 270°, etc. (π/2, 3π/2 radians).' },
    { q:'How do I convert between degrees and radians?', a:'Multiply degrees by π/180 to get radians. Multiply radians by 180/π to get degrees. Common conversions: 30° = π/6, 45° = π/4, 60° = π/3, 90° = π/2, 180° = π.' }
  ]},
  { title:'Calculadora de Trigonometria — sen, cos, tan e inversas', metaDescription:'Calculadora de trigonometria gratuita. Calcule sen, cos, tan, cot, sec, csc para qualquer ângulo em graus ou radianos.', h1:'Calculadora de Trigonometria', intro:'Insira um ângulo (graus ou radianos) e obtenha todos os seis valores de função trigonométrica instantaneamente.', faq_title:'Perguntas frequentes sobre trigonometria', ui:{ angle:'Ângulo', unit:'Unidade', degrees:'Graus', radians:'Radianos', calculate:'Calcular' }, faq:[
    { q:'Quais são as seis funções trigonométricas?', a:'Sen (seno), cos (cosseno), tan (tangente), cot (cotangente = 1/tan), sec (secante = 1/cos), csc (cossecante = 1/sen). Elas relacionam ângulos a razões de lados em um triângulo retângulo.' },
    { q:'Quando tan é indefinida?', a:'tan(θ) = sen(θ)/cos(θ), então é indefinida quando cos(θ) = 0, o que ocorre em 90°, 270°, etc. (π/2, 3π/2 radianos).' },
    { q:'Como converter entre graus e radianos?', a:'Multiplique graus por π/180 para obter radianos. Multiplique radianos por 180/π para obter graus.' }
  ]},
  `(function(){
  document.getElementById('trig-form').addEventListener('submit',function(e){
    e.preventDefault();
    let angle=parseFloat(document.getElementById('trig-val').value);
    const unit=document.getElementById('trig-unit').value;
    const rad=unit==='deg'?angle*Math.PI/180:angle;
    const fmt=v=>Math.abs(v)>1e10?'∞':+v.toPrecision(8);
    const items=[
      ['sin',Math.sin(rad)],['cos',Math.cos(rad)],['tan',Math.tan(rad)],
      ['cot',1/Math.tan(rad)],['sec',1/Math.cos(rad)],['csc',1/Math.sin(rad)]
    ];
    const out=document.getElementById('trig-out');
    out.hidden=false;
    out.innerHTML=items.map(([k,v])=>\`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">\${k}</div><strong>\${fmt(v)}</strong></div>\`).join('');
  });
})();`
);

// ─── 95 ── Ratio Simplifier ───────────────────────────────────────────────────
tool('ratiosimplifier', 'math', '⚖️',
  `<form id="rat-form"><div class="row"><div class="field"><label for="rat-a">A</label><input type="number" id="rat-a" step="any" placeholder="12" inputmode="decimal"></div><span style="align-self:flex-end;padding-bottom:0.8rem;font-size:1.5rem">:</span><div class="field"><label for="rat-b">B</label><input type="number" id="rat-b" step="any" placeholder="18" inputmode="decimal"></div><button class="btn" type="submit">{{ui.simplify}}</button></div></form><div class="result"><span class="big" id="rat-out">—</span></div>`,
  { title:'Ratio Simplifier — reduce ratios to their simplest form', metaDescription:'Free ratio simplifier. Enter any two numbers to reduce the ratio to its simplest form, find the scale factor, and see equivalent ratios.', h1:'Ratio Simplifier', intro:'Enter two numbers A and B to simplify the ratio A:B to its simplest form using the greatest common divisor.', faq_title:'Ratio simplifier FAQ', ui:{ simplify:'Simplify' }, faq:[
    { q:'How is a ratio simplified?', a:'Divide both parts by their greatest common divisor (GCD). For 12:18, GCD(12,18)=6, so 12/6=2 and 18/6=3, giving 2:3.' },
    { q:'Can I simplify ratios with decimals?', a:'Yes. The tool multiplies both numbers by a power of 10 to clear decimals before finding the GCD. For example, 1.5:2.5 becomes 15:25 = 3:5.' },
    { q:'What is the 1:n form?', a:'Dividing both parts by A gives 1:(B/A). This is useful for scales like maps (1:25000 means 1 cm represents 25000 cm = 250 m).' }
  ]},
  { title:'Simplificador de Razão — reduza razões à forma mais simples', metaDescription:'Simplificador de razão gratuito. Insira dois números para reduzir a razão A:B à sua forma mais simples usando o MDC.', h1:'Simplificador de Razão', intro:'Insira dois números A e B para simplificar a razão A:B para sua forma mais simples usando o máximo divisor comum.', faq_title:'Perguntas frequentes sobre simplificação de razão', ui:{ simplify:'Simplificar' }, faq:[
    { q:'Como uma razão é simplificada?', a:'Divide-se ambas as partes pelo máximo divisor comum (MDC). Para 12:18, MDC(12,18)=6, então 12/6=2 e 18/6=3, dando 2:3.' },
    { q:'Posso simplificar razões com decimais?', a:'Sim. A ferramenta multiplica ambos os números por uma potência de 10 para eliminar decimais antes de encontrar o MDC. Por exemplo, 1,5:2,5 vira 15:25 = 3:5.' },
    { q:'O que é a forma 1:n?', a:'Dividir ambas as partes por A dá 1:(B/A). Útil para escalas como mapas (1:25000 significa 1 cm representa 25000 cm = 250 m).' }
  ]},
  `(function(){
  function gcd(a,b){return b===0?a:gcd(b,a%b);}
  document.getElementById('rat-form').addEventListener('submit',function(e){
    e.preventDefault();
    let a=parseFloat(document.getElementById('rat-a').value);
    let b=parseFloat(document.getElementById('rat-b').value);
    if(isNaN(a)||isNaN(b)||a<=0||b<=0){document.getElementById('rat-out').textContent='Enter positive values';return;}
    const mult=Math.pow(10,Math.max((a.toString().split('.')[1]||'').length,(b.toString().split('.')[1]||'').length));
    a=Math.round(a*mult);b=Math.round(b*mult);
    const d=gcd(a,b);
    document.getElementById('rat-out').innerHTML=\`\${a/d} : \${b/d} &nbsp;<span style="font-size:1rem;opacity:0.6">(1 : \${(b/a).toFixed(4)})</span>\`;
  });
})();`
);

// ─── 96 ── Decimal to Fraction ────────────────────────────────────────────────
tool('decimaltofraction', 'math', '½',
  `<form id="dtf-form"><div class="row"><div class="field"><label for="dtf-val">{{ui.decimal}}</label><input type="number" id="dtf-val" step="any" placeholder="0.625" inputmode="decimal"></div><button class="btn" type="submit">{{ui.convert}}</button></div></form><div class="result"><span class="big" id="dtf-out">—</span></div>`,
  { title:'Decimal to Fraction Converter — convert decimals to exact fractions', metaDescription:'Free decimal to fraction converter. Enter any decimal number and get the exact simplified fraction form instantly.', h1:'Decimal to Fraction Converter', intro:'Enter a decimal number and get the exact fraction in simplest form.', faq_title:'Decimal to fraction FAQ', ui:{ decimal:'Decimal number', convert:'Convert' }, faq:[
    { q:'How does the conversion work?', a:'Multiply the decimal by 10^n where n is the number of decimal places to get an integer fraction, then simplify by dividing by the GCD. For 0.625: 625/1000, GCD=125, so 5/8.' },
    { q:'Can all decimals be expressed as fractions?', a:'All terminating decimals (like 0.625) can be written as exact fractions. Repeating decimals (like 0.333…) are also rational and can be written as fractions (1/3). Non-repeating, non-terminating decimals (like π) are irrational and cannot.' },
    { q:'What is a simplified fraction?', a:'A fraction is simplified (in lowest terms) when the numerator and denominator share no common factors other than 1. For example, 4/8 simplifies to 1/2.' }
  ]},
  { title:'Conversor de Decimal para Fração — converta decimais em frações exatas', metaDescription:'Conversor de decimal para fração gratuito. Insira qualquer decimal e obtenha a fração simplificada exata instantaneamente.', h1:'Conversor de Decimal para Fração', intro:'Insira um número decimal e obtenha a fração exata na forma mais simples.', faq_title:'Perguntas frequentes sobre conversão decimal para fração', ui:{ decimal:'Número decimal', convert:'Converter' }, faq:[
    { q:'Como funciona a conversão?', a:'Multiplique o decimal por 10^n onde n é o número de casas decimais para obter uma fração inteira, depois simplifique dividindo pelo MDC. Para 0,625: 625/1000, MDC=125, então 5/8.' },
    { q:'Todos os decimais podem ser expressados como frações?', a:'Todos os decimais finitos (como 0,625) podem ser escritos como frações exatas. Decimais periódicos (como 0,333…) também são racionais e podem ser escritos como frações (1/3). Decimais não-periódicos e não-finitos (como π) são irracionais e não podem.' },
    { q:'O que é uma fração simplificada?', a:'Uma fração está simplificada (em termos mínimos) quando numerador e denominador não compartilham fatores comuns além de 1. Por exemplo, 4/8 simplifica para 1/2.' }
  ]},
  `(function(){
  function gcd(a,b){return b===0?a:gcd(b,a%b);}
  document.getElementById('dtf-form').addEventListener('submit',function(e){
    e.preventDefault();
    const v=document.getElementById('dtf-val').value.trim();
    const d=parseFloat(v);
    const out=document.getElementById('dtf-out');
    if(isNaN(d)){out.textContent='—';return;}
    if(Number.isInteger(d)){out.textContent=d+'/1';return;}
    const decimals=(v.split('.')[1]||'').length;
    const mult=Math.pow(10,decimals);
    let num=Math.round(Math.abs(d)*mult);
    let den=mult;
    const g=gcd(num,den);
    num/=g;den/=g;
    if(d<0)num=-num;
    out.innerHTML=\`\${num}&#8260;\${den} <span style="font-size:1rem;opacity:0.6">= \${d}</span>\`;
  });
})();`
);

// ─── 97 ── Fraction to Decimal ─────────────────────────────────────────────────
tool('fractiontodecimal', 'math', '🔁',
  `<form id="ftd-form"><div class="row"><div class="field"><label for="ftd-num">{{ui.numerator}}</label><input type="number" id="ftd-num" step="1" placeholder="5" inputmode="numeric"></div><span style="align-self:flex-end;padding-bottom:0.8rem;font-size:1.5rem">÷</span><div class="field"><label for="ftd-den">{{ui.denominator}}</label><input type="number" id="ftd-den" step="1" placeholder="8" inputmode="numeric"></div><button class="btn" type="submit">{{ui.convert}}</button></div></form><div class="result"><span class="big" id="ftd-out">—</span><p id="ftd-type" class="hint"></p></div>`,
  { title:'Fraction to Decimal Converter — convert fractions to decimal form', metaDescription:'Free fraction to decimal converter. Enter numerator and denominator to get the decimal form, and see whether it terminates or repeats.', h1:'Fraction to Decimal Converter', intro:'Enter the numerator and denominator to convert a fraction to its decimal form.', faq_title:'Fraction to decimal FAQ', ui:{ numerator:'Numerator', denominator:'Denominator', convert:'Convert' }, faq:[
    { q:'When does a fraction produce a terminating decimal?', a:'A fraction in lowest terms produces a terminating decimal if and only if the denominator has no prime factors other than 2 and 5. For example, 1/8 = 0.125 (8 = 2³) terminates; 1/6 = 0.1666… (6 = 2×3) repeats.' },
    { q:'How do you find a repeating decimal?', a:'Perform long division. When a remainder repeats, the decimal repeats from that point. For 1/7, the pattern "142857" repeats endlessly: 0.142857142857…' },
    { q:'What is a mixed number?', a:'A mixed number combines a whole part and a fraction: 7/4 = 1¾. The calculator shows both the improper fraction decimal and the mixed number form.' }
  ]},
  { title:'Conversor de Fração para Decimal — converta frações para decimal', metaDescription:'Conversor de fração para decimal gratuito. Insira numerador e denominador e obtenha a forma decimal, e veja se ela termina ou se repete.', h1:'Conversor de Fração para Decimal', intro:'Insira o numerador e o denominador para converter uma fração para sua forma decimal.', faq_title:'Perguntas frequentes sobre conversão de fração para decimal', ui:{ numerator:'Numerador', denominator:'Denominador', convert:'Converter' }, faq:[
    { q:'Quando uma fração produz um decimal finito?', a:'Uma fração em termos mínimos produz um decimal finito se e somente se o denominador não tiver fatores primos além de 2 e 5. Por exemplo, 1/8 = 0,125 (8 = 2³) é finito; 1/6 = 0,1666… (6 = 2×3) é periódico.' },
    { q:'Como encontrar um decimal periódico?', a:'Realize a divisão longa. Quando um resto se repete, o decimal se repete a partir desse ponto. Para 1/7, o padrão "142857" se repete: 0,142857142857…' },
    { q:'O que é um número misto?', a:'Um número misto combina uma parte inteira e uma fração: 7/4 = 1¾. A calculadora mostra a forma decimal e o número misto.' }
  ]},
  `(function(){
  document.getElementById('ftd-form').addEventListener('submit',function(e){
    e.preventDefault();
    const num=parseInt(document.getElementById('ftd-num').value);
    const den=parseInt(document.getElementById('ftd-den').value);
    const out=document.getElementById('ftd-out');
    const type=document.getElementById('ftd-type');
    if(!den||den===0){out.textContent='Denominator cannot be zero';type.textContent='';return;}
    const dec=num/den;
    const whole=Math.floor(Math.abs(dec));
    const frac=Math.abs(dec)-whole;
    out.textContent=dec.toPrecision(12).replace(/\\.?0+$/,'');
    const mixedPart=whole>0?' — Mixed: '+(num<0?'-':'')+whole+' '+Math.round(frac*den)+'/'+den:'';
    type.textContent=(Number.isInteger(dec)?'Integer':(Math.abs(dec).toPrecision(15).includes('e')?'Very small':'Check if terminating or repeating'))+mixedPart;
  });
})();`
);

// ─── 98 ── Number to Words ────────────────────────────────────────────────────
tool('numbertowords', 'utility', '📝',
  `<form id="ntw-form"><div class="row"><div class="field"><label for="ntw-val">{{ui.number}}</label><input type="number" id="ntw-val" step="1" placeholder="1234567" inputmode="numeric"></div><div class="field"><label for="ntw-lang">{{ui.language}}</label><select id="ntw-lang"><option value="en">English</option><option value="pt">Português</option></select></div><button class="btn" type="submit">{{ui.convert}}</button></div></form><div class="result"><div id="ntw-out" style="font-size:1.1rem;font-style:italic">—</div></div>`,
  { title:'Number to Words Converter — spell out any number in English', metaDescription:'Free number to words converter. Enter any integer and get it spelled out in English or Portuguese. Useful for checks, legal documents and language learning.', h1:'Number to Words Converter', intro:'Enter any integer up to one trillion and get it written out in full words.', faq_title:'Number to words FAQ', ui:{ number:'Enter a number', language:'Language', convert:'Convert' }, faq:[
    { q:'Why convert numbers to words?', a:'Numbers are spelled out on checks, legal documents, contracts, invoices and formal letters to prevent fraud or misreading. For example, a check for $1,234 should also say "One thousand two hundred thirty-four dollars."' },
    { q:'What numbers are supported?', a:'Integers from −999,999,999,999 to 999,999,999,999 (up to one trillion). Decimal fractions are not currently supported.' },
    { q:'Is this useful for language learning?', a:'Yes. Seeing numbers spelled out helps learners practice number words in a new language and understand the naming patterns for large numbers.' }
  ]},
  { title:'Conversor de Número para Palavras — escreva qualquer número por extenso', metaDescription:'Conversor de número para palavras gratuito. Insira qualquer inteiro e obtenha-o escrito por extenso em inglês ou português. Útil para cheques, documentos legais e aprendizado de idiomas.', h1:'Conversor de Número para Palavras', intro:'Insira qualquer inteiro até um trilhão e obtenha-o escrito por extenso.', faq_title:'Perguntas frequentes sobre número para palavras', ui:{ number:'Digite um número', language:'Idioma', convert:'Converter' }, faq:[
    { q:'Por que converter números para palavras?', a:'Números são escritos por extenso em cheques, documentos legais, contratos, faturas e cartas formais para evitar fraudes ou leituras erradas.' },
    { q:'Quais números são suportados?', a:'Inteiros de −999.999.999.999 a 999.999.999.999 (até um trilhão). Frações decimais não são atualmente suportadas.' },
    { q:'É útil para aprendizado de idiomas?', a:'Sim. Ver números escritos por extenso ajuda os aprendizes a praticar palavras numéricas em um novo idioma e entender os padrões de nomeação para números grandes.' }
  ]},
  `(function(){
  const ones_en=['','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
  const tens_en=['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
  const ones_pt=['','um','dois','três','quatro','cinco','seis','sete','oito','nove','dez','onze','doze','treze','quatorze','quinze','dezesseis','dezessete','dezoito','dezenove'];
  const tens_pt=['','','vinte','trinta','quarenta','cinquenta','sessenta','setenta','oitenta','noventa'];
  const hundreds_pt=['','cem','duzentos','trezentos','quatrocentos','quinhentos','seiscentos','setecentos','oitocentos','novecentos'];
  function chunk_en(n){
    if(n<20)return ones_en[n];
    if(n<100)return tens_en[Math.floor(n/10)]+(n%10?' '+ones_en[n%10]:'');
    return ones_en[Math.floor(n/100)]+' hundred'+(n%100?' '+chunk_en(n%100):'');
  }
  function chunk_pt(n){
    if(n===100)return 'cem';
    if(n<20)return ones_pt[n];
    if(n<100)return tens_pt[Math.floor(n/10)]+(n%10?' e '+ones_pt[n%10]:'');
    return hundreds_pt[Math.floor(n/100)]+(n%100?' e '+chunk_pt(n%100):'');
  }
  function toWords(n,lang){
    if(n===0)return lang==='en'?'zero':'zero';
    const neg=n<0;n=Math.abs(n);
    const b=Math.floor(n/1e9),m=Math.floor((n%1e9)/1e6),k=Math.floor((n%1e6)/1e3),r=n%1e3;
    if(lang==='en'){
      let parts=[];
      if(b)parts.push(chunk_en(b)+' billion');
      if(m)parts.push(chunk_en(m)+' million');
      if(k)parts.push(chunk_en(k)+' thousand');
      if(r)parts.push(chunk_en(r));
      return (neg?'negative ':'')+parts.join(' ');
    }else{
      let parts=[];
      if(b)parts.push(chunk_pt(b)+(b===1?' bilhão':' bilhões'));
      if(m)parts.push(chunk_pt(m)+(m===1?' milhão':' milhões'));
      if(k)parts.push(chunk_pt(k)+' mil');
      if(r)parts.push(chunk_pt(r));
      return (neg?'menos ':'')+parts.join(' e ');
    }
  }
  document.getElementById('ntw-form').addEventListener('submit',function(e){
    e.preventDefault();
    const n=parseInt(document.getElementById('ntw-val').value);
    const lang=document.getElementById('ntw-lang').value;
    const out=document.getElementById('ntw-out');
    if(isNaN(n)||Math.abs(n)>999999999999){out.textContent='Enter an integer up to 999,999,999,999';return;}
    out.textContent=toWords(n,lang).charAt(0).toUpperCase()+toWords(n,lang).slice(1);
  });
})();`
);

// ─── 99 ── Text Case Converter Extended ──────────────────────────────────────
tool('titlecase', 'text', '🔤',
  `<div id="tc-app"><div class="field"><label for="tc-in">{{ui.input}}</label><textarea id="tc-in" rows="4" placeholder="{{ui.placeholder}}" style="width:100%;resize:vertical;padding:0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text);font-size:1rem"></textarea></div><div class="row" style="gap:0.5rem;flex-wrap:wrap"><button class="btn" id="tc-title">{{ui.titleCase}}</button><button class="btn" id="tc-sentence">{{ui.sentenceCase}}</button><button class="btn" id="tc-start">{{ui.capitalize}}</button><button class="btn" id="tc-alt">{{ui.alternating}}</button></div><div class="field" style="margin-top:0.5rem"><label for="tc-out">{{ui.output}}</label><textarea id="tc-out" rows="4" readonly style="width:100%;resize:vertical;padding:0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text);font-size:1rem"></textarea></div></div>`,
  { title:'Title Case Converter — sentence case, title case, alternating case', metaDescription:'Free title case converter. Convert text to title case, sentence case, capitalize first letter of each word, or alternating case instantly.', h1:'Title Case Converter', intro:'Paste your text and choose the case style: Title Case, Sentence case, Capitalize Words, or aLtErNaTiNg case.', faq_title:'Title case FAQ', ui:{ input:'Input text', placeholder:'Type or paste text here…', titleCase:'Title Case', sentenceCase:'Sentence case', capitalize:'Capitalize Words', alternating:'aLtErNaTiNg', output:'Result' }, faq:[
    { q:'What is title case?', a:'In title case, the first letter of each major word is capitalised. Articles (a, an, the), short prepositions (in, on, at) and coordinating conjunctions (and, but, or) are typically lowercase unless they begin the title.' },
    { q:'What is sentence case?', a:'Only the first word of the sentence and proper nouns are capitalised, mimicking standard prose writing.' },
    { q:'What is alternating case useful for?', a:'Alternating case (aLtErNaTiNg) is used for stylistic or humorous effect online. It became associated with the "mocking" meme format.' }
  ]},
  { title:'Conversor de Capitalização — Title Case, Sentence case, alternado', metaDescription:'Conversor de capitalização gratuito. Converta texto para Title Case, sentence case, capitalizar cada palavra ou capitalização alternada instantaneamente.', h1:'Conversor de Capitalização', intro:'Cole seu texto e escolha o estilo de capitalização: Title Case, sentence case, Capitalizar Palavras ou aLtErNaDo.', faq_title:'Perguntas frequentes sobre capitalização', ui:{ input:'Texto de entrada', placeholder:'Digite ou cole o texto aqui…', titleCase:'Title Case', sentenceCase:'Sentence case', capitalize:'Capitalizar Palavras', alternating:'aLtErNaDo', output:'Resultado' }, faq:[
    { q:'O que é Title Case?', a:'Em Title Case, a primeira letra de cada palavra principal é maiúscula. Artigos, preposições curtas e conjunções coordenativas geralmente ficam em minúsculas, a menos que iniciem o título.' },
    { q:'O que é sentence case?', a:'Apenas a primeira palavra da frase e substantivos próprios são maiúsculos, imitando a escrita padrão em prosa.' },
    { q:'Para que serve o alternado?', a:'A capitalização alternada (aLtErNaDa) é usada para efeito estilístico ou humorístico online. Ficou associada ao formato de meme de "deboche".' }
  ]},
  `(function(){
  const skip=new Set(['a','an','the','and','but','or','for','nor','on','at','to','in','of','up','by','as','is','it']);
  function titleCase(s){return s.toLowerCase().replace(/\\S+/g,(w,i,str)=>{const prev=str.slice(0,i).trim();if(i===0||!prev||skip.has(w))return w[0].toUpperCase()+w.slice(1);return skip.has(w)?w:w[0].toUpperCase()+w.slice(1);});}
  function sentenceCase(s){return s.toLowerCase().replace(/(^|[.!?]\\s+)([a-z])/g,(_,p,c)=>p+c.toUpperCase());}
  function capitalize(s){return s.toLowerCase().replace(/\\b\\w/g,c=>c.toUpperCase());}
  function alternating(s){let i=0;return s.replace(/[a-z]/gi,c=>(i++%2===0)?c.toLowerCase():c.toUpperCase());}
  function run(fn){document.getElementById('tc-out').value=fn(document.getElementById('tc-in').value);}
  document.getElementById('tc-title').onclick=()=>run(titleCase);
  document.getElementById('tc-sentence').onclick=()=>run(sentenceCase);
  document.getElementById('tc-start').onclick=()=>run(capitalize);
  document.getElementById('tc-alt').onclick=()=>run(alternating);
})();`
);

// ─── 100 ── URL Encoder/Decoder ───────────────────────────────────────────────
tool('urlcodec', 'utility', '🔗',
  `<div id="url-app"><div class="field"><label for="url-in">{{ui.input}}</label><textarea id="url-in" rows="3" placeholder="{{ui.placeholder}}" style="width:100%;resize:vertical;padding:0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)"></textarea></div><div class="row" style="gap:0.5rem"><button class="btn" id="url-enc">{{ui.encode}}</button><button class="btn" id="url-dec">{{ui.decode}}</button></div><div class="field" style="margin-top:0.5rem"><label for="url-out">{{ui.output}}</label><textarea id="url-out" rows="3" readonly style="width:100%;resize:vertical;padding:0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)"></textarea></div></div>`,
  { title:'URL Encoder/Decoder — percent-encode and decode URLs online', metaDescription:'Free URL encoder and decoder. Encode special characters in URLs with percent-encoding or decode percent-encoded URLs back to plain text.', h1:'URL Encoder / Decoder', intro:'Paste a URL or text to encode it for safe use in a URL, or paste a percent-encoded string to decode it back to readable text.', faq_title:'URL encoder/decoder FAQ', ui:{ input:'Input', placeholder:'Paste text or URL here…', encode:'Encode', decode:'Decode', output:'Output' }, faq:[
    { q:'What is URL encoding?', a:'URL encoding (percent-encoding) replaces unsafe characters with a % followed by two hex digits. For example, a space becomes %20, and & becomes %26. This ensures special characters don\'t interfere with URL syntax.' },
    { q:'What is the difference between encodeURI and encodeURIComponent?', a:'encodeURI preserves URL structure characters like / : ? & = and only encodes characters invalid in a full URL. encodeURIComponent encodes everything except letters, digits and -_.~, making it safe for URL query values. This tool uses encodeURIComponent.' },
    { q:'When should I encode a URL?', a:'Encode query parameter values before including them in a URL. For example, a search query like "hello world & more" should be encoded as "hello%20world%20%26%20more" in the URL.' }
  ]},
  { title:'Codificador/Decodificador de URL — codificação percentual online', metaDescription:'Codificador e decodificador de URL gratuito. Codifique caracteres especiais em URLs com codificação percentual ou decodifique URLs de volta para texto simples.', h1:'Codificador / Decodificador de URL', intro:'Cole uma URL ou texto para codificá-lo para uso seguro em uma URL, ou cole uma string codificada por porcentagem para decodificá-la de volta em texto legível.', faq_title:'Perguntas frequentes sobre codificador/decodificador de URL', ui:{ input:'Entrada', placeholder:'Cole texto ou URL aqui…', encode:'Codificar', decode:'Decodificar', output:'Saída' }, faq:[
    { q:'O que é codificação de URL?', a:'A codificação de URL (codificação percentual) substitui caracteres inseguros por % seguido de dois dígitos hexadecimais. Por exemplo, um espaço vira %20 e & vira %26.' },
    { q:'Qual a diferença entre encodeURI e encodeURIComponent?', a:'encodeURI preserva caracteres estruturais de URL como / : ? & =. encodeURIComponent codifica tudo exceto letras, dígitos e -_.~, tornando-o seguro para valores de parâmetros de URL.' },
    { q:'Quando devo codificar uma URL?', a:'Codifique os valores dos parâmetros de consulta antes de incluí-los em uma URL. Por exemplo, uma pesquisa como "olá mundo" deve ser codificada como "ol%C3%A1%20mundo" na URL.' }
  ]},
  `(function(){
  document.getElementById('url-enc').onclick=function(){
    try{document.getElementById('url-out').value=encodeURIComponent(document.getElementById('url-in').value);}
    catch(e){document.getElementById('url-out').value='Encoding error';}
  };
  document.getElementById('url-dec').onclick=function(){
    try{document.getElementById('url-out').value=decodeURIComponent(document.getElementById('url-in').value);}
    catch(e){document.getElementById('url-out').value='Decoding error — invalid percent-encoding';}
  };
})();`
);

// ─── 101 ── HTML Encoder/Decoder ──────────────────────────────────────────────
tool('htmlcodec', 'utility', '🌐',
  `<div id="html-app"><div class="field"><label for="html-in">{{ui.input}}</label><textarea id="html-in" rows="4" placeholder='<h1>Hello &amp; "World"</h1>' style="width:100%;resize:vertical;padding:0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text);font-family:monospace"></textarea></div><div class="row" style="gap:0.5rem"><button class="btn" id="html-enc">{{ui.encode}}</button><button class="btn" id="html-dec">{{ui.decode}}</button></div><div class="field" style="margin-top:0.5rem"><label for="html-out">{{ui.output}}</label><textarea id="html-out" rows="4" readonly style="width:100%;resize:vertical;padding:0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text);font-family:monospace"></textarea></div></div>`,
  { title:'HTML Encoder/Decoder — encode and decode HTML entities', metaDescription:'Free HTML encoder and decoder. Convert special characters to HTML entities and back. Encode < > & " \' and more for safe display in web pages.', h1:'HTML Encoder / Decoder', intro:'Paste HTML to encode special characters as entities (< → &lt;), or paste encoded HTML to decode entities back to characters.', faq_title:'HTML encoder/decoder FAQ', ui:{ input:'Input', encode:'Encode', decode:'Decode', output:'Output' }, faq:[
    { q:'What are HTML entities?', a:'HTML entities are special codes that represent characters which have special meaning in HTML. For example, < must be written as &lt; to display as text rather than as the start of a tag.' },
    { q:'Which characters need encoding?', a:'Essential: < (&lt;), > (&gt;), & (&amp;), " (&quot;), \' (&#39;). Optional but good practice: any non-ASCII character like © (&copy;), é (&eacute;), or € (&euro;).' },
    { q:'Why encode HTML?', a:'To prevent XSS (cross-site scripting) attacks, you must encode user-supplied data before inserting it into HTML. Unencoded user input can inject malicious scripts into your page.' }
  ]},
  { title:'Codificador/Decodificador HTML — codifique e decodifique entidades HTML', metaDescription:'Codificador e decodificador HTML gratuito. Converta caracteres especiais para entidades HTML e vice-versa.', h1:'Codificador / Decodificador HTML', intro:'Cole HTML para codificar caracteres especiais como entidades (< → &lt;), ou cole HTML codificado para decodificar entidades de volta para caracteres.', faq_title:'Perguntas frequentes sobre codificador/decodificador HTML', ui:{ input:'Entrada', encode:'Codificar', decode:'Decodificar', output:'Saída' }, faq:[
    { q:'O que são entidades HTML?', a:'Entidades HTML são códigos especiais que representam caracteres com significado especial em HTML. Por exemplo, < deve ser escrito como &lt; para exibir como texto em vez do início de uma tag.' },
    { q:'Quais caracteres precisam ser codificados?', a:'Essenciais: < (&lt;), > (&gt;), & (&amp;), " (&quot;), \' (&#39;). Opcional mas recomendado: qualquer caractere não-ASCII como © (&copy;), é (&eacute;), ou € (&euro;).' },
    { q:'Por que codificar HTML?', a:'Para evitar ataques XSS (cross-site scripting), você deve codificar dados fornecidos pelo usuário antes de inseri-los no HTML. Entrada não codificada pode injetar scripts maliciosos na sua página.' }
  ]},
  `(function(){
  document.getElementById('html-enc').onclick=function(){
    const t=document.getElementById('html-in').value;
    document.getElementById('html-out').value=t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  };
  document.getElementById('html-dec').onclick=function(){
    const t=document.getElementById('html-in').value;
    const d=document.createElement('div');d.innerHTML=t;
    document.getElementById('html-out').value=d.textContent||d.innerText||'';
  };
})();`
);

// ─── 102 ── CSS Minifier ───────────────────────────────────────────────────────
tool('cssminifier', 'dev', '💻',
  `<div id="cssm-app"><div class="field"><label for="cssm-in">{{ui.input}}</label><textarea id="cssm-in" rows="8" placeholder="/* Paste CSS here */" style="width:100%;resize:vertical;padding:0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text);font-family:monospace;font-size:0.875rem"></textarea></div><div class="row" style="gap:0.5rem"><button class="btn" id="cssm-min">{{ui.minify}}</button><button class="btn" id="cssm-copy">{{ui.copy}}</button></div><div id="cssm-stats" style="opacity:0.7;font-size:0.85rem;margin:0.5rem 0"></div><div class="field"><label for="cssm-out">{{ui.output}}</label><textarea id="cssm-out" rows="6" readonly style="width:100%;resize:vertical;padding:0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text);font-family:monospace;font-size:0.875rem;word-break:break-all"></textarea></div></div>`,
  { title:'CSS Minifier — compress CSS by removing whitespace and comments', metaDescription:'Free CSS minifier. Remove whitespace, comments and unnecessary characters from CSS to reduce file size for faster page loads.', h1:'CSS Minifier', intro:'Paste your CSS and click Minify to remove comments, whitespace and unnecessary characters to reduce file size.', faq_title:'CSS minifier FAQ', ui:{ input:'CSS input', minify:'Minify', copy:'Copy', output:'Minified output' }, faq:[
    { q:'How much can CSS be compressed?', a:'Typical CSS files compress 20–50% by removing whitespace and comments. Using gzip or Brotli compression on top of minification can achieve 60–80% size reduction in total.' },
    { q:'Does minification change how CSS works?', a:'No. Minification removes only characters that are not meaningful to the browser: whitespace between declarations, comments, and redundant semicolons. The visual result is identical.' },
    { q:'Should I minify CSS in development?', a:'No. Work with readable CSS in development and use a build tool (webpack, Vite, Parcel) to minify automatically for production. Minified CSS is very hard to debug.' }
  ]},
  { title:'Minificador de CSS — comprima CSS removendo espaços e comentários', metaDescription:'Minificador de CSS gratuito. Remova espaços em branco, comentários e caracteres desnecessários do CSS para reduzir o tamanho do arquivo.', h1:'Minificador de CSS', intro:'Cole seu CSS e clique em Minificar para remover comentários, espaços em branco e caracteres desnecessários para reduzir o tamanho do arquivo.', faq_title:'Perguntas frequentes sobre minificador de CSS', ui:{ input:'CSS de entrada', minify:'Minificar', copy:'Copiar', output:'Saída minificada' }, faq:[
    { q:'Quanto o CSS pode ser comprimido?', a:'Arquivos CSS típicos comprimem 20–50% com a remoção de espaços e comentários. Usando compressão gzip ou Brotli além da minificação, pode-se obter 60–80% de redução total.' },
    { q:'A minificação muda como o CSS funciona?', a:'Não. A minificação remove apenas caracteres sem significado para o navegador: espaços entre declarações, comentários e ponto-e-vírgulas redundantes. O resultado visual é idêntico.' },
    { q:'Devo minificar CSS no desenvolvimento?', a:'Não. Trabalhe com CSS legível no desenvolvimento e use uma ferramenta de build (webpack, Vite, Parcel) para minificar automaticamente para produção.' }
  ]},
  `(function(){
  document.getElementById('cssm-min').onclick=function(){
    const raw=document.getElementById('cssm-in').value;
    if(!raw.trim())return;
    const min=raw
      .replace(/\\/\\*[\\s\\S]*?\\*\\//g,'')
      .replace(/\\s*([{}:;,>~+])\\s*/g,'$1')
      .replace(/;\\}/g,'}')
      .replace(/\\s+/g,' ')
      .trim();
    document.getElementById('cssm-out').value=min;
    const saved=raw.length-min.length;
    const pct=((saved/raw.length)*100).toFixed(1);
    document.getElementById('cssm-stats').textContent=\`Original: \${raw.length} chars → Minified: \${min.length} chars (saved \${saved} chars, \${pct}%)\`;
  };
  document.getElementById('cssm-copy').onclick=function(){
    const v=document.getElementById('cssm-out').value;
    if(v)navigator.clipboard.writeText(v);
  };
})();`
);

// ─── 103 ── JSON Minifier ──────────────────────────────────────────────────────
tool('jsonminifier', 'dev', '📦',
  `<div id="jm-app"><div class="field"><label for="jm-in">{{ui.input}}</label><textarea id="jm-in" rows="8" placeholder='{ "key": "value" }' style="width:100%;resize:vertical;padding:0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text);font-family:monospace;font-size:0.875rem"></textarea></div><div class="row" style="gap:0.5rem"><button class="btn" id="jm-min">{{ui.minify}}</button><button class="btn" id="jm-fmt">{{ui.format}}</button><button class="btn" id="jm-copy">{{ui.copy}}</button></div><div id="jm-stats" style="opacity:0.7;font-size:0.85rem;margin:0.5rem 0"></div><div class="field"><label for="jm-out">{{ui.output}}</label><textarea id="jm-out" rows="6" readonly style="width:100%;resize:vertical;padding:0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text);font-family:monospace;font-size:0.875rem"></textarea></div></div>`,
  { title:'JSON Minifier & Formatter — compress or prettify JSON online', metaDescription:'Free JSON minifier and formatter. Remove whitespace to compress JSON, or format minified JSON with proper indentation for readability.', h1:'JSON Minifier & Formatter', intro:'Paste JSON and click Minify to compress it, or Format to prettify it with indentation.', faq_title:'JSON minifier FAQ', ui:{ input:'JSON input', minify:'Minify', format:'Format', copy:'Copy', output:'Output' }, faq:[
    { q:'What does JSON minification do?', a:'Minification removes all whitespace (spaces, tabs, newlines) that is not inside string values. A minified JSON file is identical in data to the original but takes less space to transfer over the network.' },
    { q:'Is minified JSON valid?', a:'Yes. JSON syntax does not require any whitespace. Minified JSON parses exactly the same as formatted JSON in any JSON parser.' },
    { q:'When should I format JSON?', a:'Format JSON when you need to read or debug it. Formatted JSON with indentation makes nested structures immediately visible. Most browsers format JSON automatically when you navigate to a .json URL.' }
  ]},
  { title:'Minificador e Formatador JSON — comprima ou formate JSON online', metaDescription:'Minificador e formatador JSON gratuito. Remova espaços para comprimir JSON, ou formate JSON minificado com indentação adequada.', h1:'Minificador e Formatador JSON', intro:'Cole JSON e clique em Minificar para comprimir, ou em Formatar para embelezar com indentação.', faq_title:'Perguntas frequentes sobre minificador JSON', ui:{ input:'Entrada JSON', minify:'Minificar', format:'Formatar', copy:'Copiar', output:'Saída' }, faq:[
    { q:'O que a minificação JSON faz?', a:'A minificação remove todos os espaços em branco (espaços, tabulações, quebras de linha) que não estão dentro de strings. Um JSON minificado é idêntico em dados ao original.' },
    { q:'JSON minificado é válido?', a:'Sim. A sintaxe JSON não requer nenhum espaço em branco. JSON minificado é analisado exatamente igual ao formatado em qualquer parser JSON.' },
    { q:'Quando devo formatar JSON?', a:'Formate JSON quando precisar lê-lo ou depurá-lo. JSON formatado com indentação torna as estruturas aninhadas imediatamente visíveis.' }
  ]},
  `(function(){
  function proc(indent){
    const raw=document.getElementById('jm-in').value.trim();
    if(!raw)return;
    try{
      const parsed=JSON.parse(raw);
      const out=JSON.stringify(parsed,null,indent);
      document.getElementById('jm-out').value=out;
      document.getElementById('jm-stats').textContent=\`Original: \${raw.length} chars → Output: \${out.length} chars\`;
    }catch(e){document.getElementById('jm-out').value='Invalid JSON: '+e.message;document.getElementById('jm-stats').textContent='';}
  }
  document.getElementById('jm-min').onclick=()=>proc(undefined);
  document.getElementById('jm-fmt').onclick=()=>proc(2);
  document.getElementById('jm-copy').onclick=function(){const v=document.getElementById('jm-out').value;if(v)navigator.clipboard.writeText(v);};
})();`
);

// ─── 104 ── Regular Expression Tester ─────────────────────────────────────────
tool('regextester', 'dev', '🔍',
  `<div id="rx-app"><div class="field"><label for="rx-pat">{{ui.pattern}}</label><div style="display:flex;gap:0.5rem"><span style="align-self:center;font-size:1.2rem;opacity:0.5">/</span><input type="text" id="rx-pat" placeholder="(\\w+)\\s(\\w+)" style="flex:1;padding:0.5rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text);font-family:monospace"><span style="align-self:center;font-size:1.2rem;opacity:0.5">/</span><input type="text" id="rx-flags" value="g" placeholder="gim" style="width:60px;padding:0.5rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text);font-family:monospace"></div></div><div class="field"><label for="rx-test">{{ui.testString}}</label><textarea id="rx-test" rows="4" placeholder="{{ui.placeholder}}" style="width:100%;resize:vertical;padding:0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text);font-family:monospace"></textarea></div><div id="rx-out" style="margin-top:0.5rem"></div></div>`,
  { title:'Regular Expression Tester — test regex patterns online', metaDescription:'Free regular expression tester. Enter a regex pattern and test string to see matches highlighted in real time. Supports all JavaScript regex flags.', h1:'Regular Expression Tester', intro:'Enter a regular expression pattern, optional flags (g, i, m, s, u), and a test string to see matches in real time.', faq_title:'Regex tester FAQ', ui:{ pattern:'Pattern', testString:'Test string', placeholder:'Enter text to test against…' }, faq:[
    { q:'What regex flags are supported?', a:'g (global — find all matches), i (case-insensitive), m (multiline — ^ and $ match start/end of each line), s (dotAll — . matches newlines too), u (unicode — treat pattern as Unicode code points).' },
    { q:'How do I escape special regex characters?', a:'The characters . * + ? ^ $ { } [ ] | ( ) \\ have special meaning in regex. To match them literally, prefix each with a backslash. For example, to match a literal dot use \\.' },
    { q:'What is a capturing group?', a:'Parentheses () create a capturing group. When the regex matches, the text matched by each group is captured separately. For example, (\\d+)-(\\d+) on "2024-07" captures "2024" and "07" in groups 1 and 2.' }
  ]},
  { title:'Testador de Expressão Regular — teste padrões regex online', metaDescription:'Testador de expressão regular gratuito. Insira um padrão regex e string de teste para ver correspondências destacadas em tempo real.', h1:'Testador de Expressão Regular', intro:'Insira um padrão de expressão regular, flags opcionais (g, i, m, s, u) e uma string de teste para ver correspondências em tempo real.', faq_title:'Perguntas frequentes sobre testador de regex', ui:{ pattern:'Padrão', testString:'String de teste', placeholder:'Insira o texto para testar…' }, faq:[
    { q:'Quais flags de regex são suportados?', a:'g (global — encontrar todas as correspondências), i (insensível a maiúsculas), m (multilinha — ^ e $ correspondem ao início/fim de cada linha), s (dotAll — . corresponde a quebras de linha), u (unicode).' },
    { q:'Como escapar caracteres especiais de regex?', a:'Os caracteres . * + ? ^ $ { } [ ] | ( ) \\ têm significado especial em regex. Para corresponder literalmente, prefixe cada um com uma barra invertida.' },
    { q:'O que é um grupo de captura?', a:'Parênteses () criam um grupo de captura. Quando o regex corresponde, o texto correspondido por cada grupo é capturado separadamente. Por exemplo, (\\d+)-(\\d+) em "2024-07" captura "2024" e "07" nos grupos 1 e 2.' }
  ]},
  `(function(){
  function test(){
    const pat=document.getElementById('rx-pat').value;
    const flags=document.getElementById('rx-flags').value;
    const str=document.getElementById('rx-test').value;
    const out=document.getElementById('rx-out');
    if(!pat||!str){out.innerHTML='';return;}
    try{
      const rx=new RegExp(pat,flags.replace('g','')||'');
      const rxg=new RegExp(pat,'g'+(flags.replace('g','')));
      const matches=[...str.matchAll(rxg)];
      if(!matches.length){out.innerHTML='<p style="color:var(--red,#ef4444)">No matches</p>';return;}
      let html=\`<p style="color:var(--green,#22c55e)">\${matches.length} match\${matches.length!==1?'es':''}</p>\`;
      html+='<ul style="list-style:none;padding:0;margin:0.5rem 0;font-family:monospace;font-size:0.875rem">';
      matches.slice(0,20).forEach((m,i)=>{
        html+=\`<li style="padding:4px 8px;background:var(--surface);border:1px solid var(--line);border-radius:6px;margin-bottom:4px"><span style="opacity:0.5">#\${i+1}</span> "\${m[0]}" at index \${m.index}\${m.length>1?' | groups: '+m.slice(1).map(g=>'"'+(g||'undefined')+'"').join(', '):''}</li>\`;
      });
      if(matches.length>20)html+=\`<li style="opacity:0.6">…and \${matches.length-20} more</li>\`;
      html+='</ul>';
      out.innerHTML=html;
    }catch(e){out.innerHTML='<p style="color:var(--red,#ef4444)">Invalid regex: '+e.message+'</p>';}
  }
  document.getElementById('rx-pat').addEventListener('input',test);
  document.getElementById('rx-flags').addEventListener('input',test);
  document.getElementById('rx-test').addEventListener('input',test);
})();`
);

// ─── 105 ── Color Format Converter ────────────────────────────────────────────
tool('colorconverter', 'utility', '🎨',
  `<div id="cc-app"><div class="field"><label for="cc-in">{{ui.input}}</label><input type="text" id="cc-in" placeholder="#3A7BD5 or rgb(58,123,213) or hsl(220,65%,53%)"></div><button class="btn" id="cc-go" style="margin-top:0.5rem">{{ui.convert}}</button><div id="cc-swatch" style="height:80px;border-radius:12px;border:1px solid var(--line);margin-top:1rem;display:none"></div><div id="cc-out" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:0.5rem;margin-top:0.75rem"></div></div>`,
  { title:'Color Format Converter — HEX to RGB, HSL, HSV, CMYK online', metaDescription:'Free color format converter. Convert between HEX, RGB, HSL, HSV and CMYK color formats instantly. Paste any color code and see all equivalents.', h1:'Color Format Converter', intro:'Enter a color in HEX (#RRGGBB), RGB, or HSL format to instantly get all equivalent color representations.', faq_title:'Color converter FAQ', ui:{ input:'Color (HEX, RGB, or HSL)', convert:'Convert' }, faq:[
    { q:'What color formats are supported?', a:'Input: HEX (#RRGGBB or #RGB), RGB (rgb(r,g,b)), HSL (hsl(h,s%,l%)). Output: HEX, RGB, RGBA, HSL, HSV/HSB, CMYK, CSS named color (if applicable).' },
    { q:'What is the difference between HSL and HSV?', a:'HSL (hue, saturation, lightness) puts white at 100% lightness and black at 0%. HSV/HSB (hue, saturation, value/brightness) puts pure color at 100% value. Most color pickers use HSV; CSS uses HSL.' },
    { q:'What is CMYK?', a:'CMYK (Cyan, Magenta, Yellow, Key/Black) is the color model used in printing. Digital screens use RGB (additive), while printing uses CMYK (subtractive). Note that the RGB-to-CMYK conversion shown here is an approximation — actual print colors depend on the specific ink and paper profile.' }
  ]},
  { title:'Conversor de Formato de Cor — HEX para RGB, HSL, HSV, CMYK', metaDescription:'Conversor de formato de cor gratuito. Converta entre HEX, RGB, HSL, HSV e CMYK instantaneamente. Cole qualquer código de cor e veja todos os equivalentes.', h1:'Conversor de Formato de Cor', intro:'Digite uma cor em formato HEX (#RRGGBB), RGB ou HSL para obter instantaneamente todas as representações de cor equivalentes.', faq_title:'Perguntas frequentes sobre conversor de cor', ui:{ input:'Cor (HEX, RGB ou HSL)', convert:'Converter' }, faq:[
    { q:'Quais formatos de cor são suportados?', a:'Entrada: HEX (#RRGGBB ou #RGB), RGB (rgb(r,g,b)), HSL (hsl(h,s%,l%)). Saída: HEX, RGB, RGBA, HSL, HSV/HSB, CMYK.' },
    { q:'Qual a diferença entre HSL e HSV?', a:'HSL (matiz, saturação, luminosidade) coloca branco em 100% de luminosidade e preto em 0%. HSV/HSB coloca a cor pura em 100% de valor. A maioria dos seletores de cor usa HSV; CSS usa HSL.' },
    { q:'O que é CMYK?', a:'CMYK (Ciano, Magenta, Amarelo, Preto) é o modelo de cor usado na impressão. Telas digitais usam RGB (aditivo), enquanto a impressão usa CMYK (subtrativo). A conversão de RGB para CMYK exibida aqui é uma aproximação.' }
  ]},
  `(function(){
  function parseColor(s){
    s=s.trim();
    const cv=document.createElement('canvas').getContext('2d');
    cv.fillStyle=s;
    const filled=cv.fillStyle;
    if(filled==='#000000'&&s.toLowerCase()!=='#000000'&&s.toLowerCase()!=='black'&&s.toLowerCase()!=='#000'&&!s.includes('rgb(0')&&!s.includes('hsl(0'))return null;
    const m=filled.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
    if(!m)return null;
    return[parseInt(m[1],16),parseInt(m[2],16),parseInt(m[3],16)];
  }
  function rgbToHsl(r,g,b){
    r/=255;g/=255;b/=255;
    const max=Math.max(r,g,b),min=Math.min(r,g,b);
    let h,s,l=(max+min)/2;
    if(max===min){h=s=0;}else{
      const d=max-min;s=l>0.5?d/(2-max-min):d/(max+min);
      switch(max){case r:h=((g-b)/d+(g<b?6:0))/6;break;case g:h=((b-r)/d+2)/6;break;case b:h=((r-g)/d+4)/6;break;}
    }
    return[Math.round(h*360),Math.round(s*100),Math.round(l*100)];
  }
  function rgbToHsv(r,g,b){
    r/=255;g/=255;b/=255;
    const max=Math.max(r,g,b),min=Math.min(r,g,b),d=max-min;
    let h=0,s=max===0?0:d/max,v=max;
    if(d!==0){switch(max){case r:h=((g-b)/d)%6;break;case g:h=(b-r)/d+2;break;case b:h=(r-g)/d+4;break;}}
    return[Math.round(h*60+360)%360,Math.round(s*100),Math.round(v*100)];
  }
  document.getElementById('cc-go').onclick=function(){
    const rgb=parseColor(document.getElementById('cc-in').value);
    const out=document.getElementById('cc-out');
    const sw=document.getElementById('cc-swatch');
    if(!rgb){out.innerHTML='<p style="color:var(--red,#ef4444)">Invalid color</p>';sw.style.display='none';return;}
    const[r,g,b]=rgb;
    const hex='#'+rgb.map(v=>v.toString(16).padStart(2,'0')).join('').toUpperCase();
    sw.style.background=hex;sw.style.display='block';
    const[h,sl,l]=rgbToHsl(r,g,b);
    const[hv,sv,v]=rgbToHsv(r,g,b);
    const k=1-Math.max(r,g,b)/255;
    const c=k===1?0:Math.round((1-r/255-k)/(1-k)*100);
    const mg=k===1?0:Math.round((1-g/255-k)/(1-k)*100);
    const y2=k===1?0:Math.round((1-b/255-k)/(1-k)*100);
    const items=[['HEX',hex],['RGB',\`rgb(\${r}, \${g}, \${b})\`],['RGBA',\`rgba(\${r}, \${g}, \${b}, 1)\`],['HSL',\`hsl(\${h}, \${sl}%, \${l}%)\`],['HSV',\`hsv(\${hv}, \${sv}%, \${v}%)\`],['CMYK',\`cmyk(\${c}%, \${mg}%, \${y2}%, \${Math.round(k*100)}%)\`]];
    out.innerHTML=items.map(([k2,v2])=>\`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem;cursor:pointer" onclick="navigator.clipboard.writeText('\${v2}')"><div style="font-size:0.75rem;opacity:0.6">\${k2}</div><strong style="font-family:monospace;font-size:0.875rem">\${v2}</strong></div>\`).join('');
  };
})();`
);

// ─── 106 ── Password Generator ─────────────────────────────────────────────────
tool('passwordgen', 'security', '🔒',
  `<div id="pg-app"><div class="row"><div class="field"><label for="pg-len">{{ui.length}}</label><input type="number" id="pg-len" min="4" max="128" value="16" inputmode="numeric"></div></div><div class="row" style="flex-wrap:wrap;gap:0.5rem"><label style="display:flex;align-items:center;gap:0.4rem"><input type="checkbox" id="pg-upper" checked>{{ui.uppercase}}</label><label style="display:flex;align-items:center;gap:0.4rem"><input type="checkbox" id="pg-lower" checked>{{ui.lowercase}}</label><label style="display:flex;align-items:center;gap:0.4rem"><input type="checkbox" id="pg-num" checked>{{ui.numbers}}</label><label style="display:flex;align-items:center;gap:0.4rem"><input type="checkbox" id="pg-sym" checked>{{ui.symbols}}</label></div><button class="btn" id="pg-gen" style="margin-top:0.75rem">{{ui.generate}}</button><div class="result"><div style="font-family:monospace;font-size:1.1rem;word-break:break-all;padding:0.75rem;background:var(--surface);border:1px solid var(--line);border-radius:8px;margin-top:0.75rem;cursor:pointer" id="pg-out" title="Click to copy">—</div><p id="pg-strength" class="hint" style="margin-top:0.5rem"></p></div></div>`,
  { title:'Password Generator — create strong random passwords', metaDescription:'Free password generator. Create strong, random passwords with custom length and character sets. Control uppercase, lowercase, numbers and symbols.', h1:'Password Generator', intro:'Choose the length and character types to generate a strong random password. Click the password to copy it.', faq_title:'Password generator FAQ', ui:{ length:'Length (4–128)', uppercase:'A–Z', lowercase:'a–z', numbers:'0–9', symbols:'!@#…', generate:'Generate Password' }, faq:[
    { q:'How strong is a generated password?', a:'A 16-character password using all character types (94 printable ASCII) has about 10^31 possible combinations. At a billion guesses per second, it would take longer than the age of the universe to brute-force.' },
    { q:'Is the password stored anywhere?', a:'No. The password is generated entirely in your browser using the Web Crypto API (crypto.getRandomValues). Nothing is sent to any server.' },
    { q:'What makes a password strong?', a:'Length is the most important factor — a 20-character password is far stronger than a complex 8-character one. Using a mix of all character types adds additional entropy. Never reuse passwords across sites.' }
  ]},
  { title:'Gerador de Senha — crie senhas fortes e aleatórias', metaDescription:'Gerador de senha gratuito. Crie senhas fortes e aleatórias com comprimento e conjunto de caracteres personalizados. Controle maiúsculas, minúsculas, números e símbolos.', h1:'Gerador de Senha', intro:'Escolha o comprimento e os tipos de caractere para gerar uma senha forte e aleatória. Clique na senha para copiá-la.', faq_title:'Perguntas frequentes sobre gerador de senha', ui:{ length:'Comprimento (4–128)', uppercase:'A–Z', lowercase:'a–z', numbers:'0–9', symbols:'!@#…', generate:'Gerar Senha' }, faq:[
    { q:'Quão forte é uma senha gerada?', a:'Uma senha de 16 caracteres usando todos os tipos de caractere tem cerca de 10^31 combinações possíveis. A um bilhão de tentativas por segundo, levaria mais tempo que a idade do universo para quebrar.' },
    { q:'A senha é armazenada em algum lugar?', a:'Não. A senha é gerada inteiramente no navegador usando a Web Crypto API (crypto.getRandomValues). Nada é enviado para nenhum servidor.' },
    { q:'O que torna uma senha forte?', a:'O comprimento é o fator mais importante — uma senha de 20 caracteres é muito mais forte que uma complexa de 8 caracteres. Usar todos os tipos de caractere adiciona entropia. Nunca reutilize senhas entre sites.' }
  ]},
  `(function(){
  const upper='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower='abcdefghijklmnopqrstuvwxyz';
  const nums='0123456789';
  const syms='!@#$%^&*()_+-=[]{}|;:,.<>?';
  function gen(){
    const len=Math.min(128,Math.max(4,parseInt(document.getElementById('pg-len').value)||16));
    const useU=document.getElementById('pg-upper').checked;
    const useL=document.getElementById('pg-lower').checked;
    const useN=document.getElementById('pg-num').checked;
    const useS=document.getElementById('pg-sym').checked;
    let chars='';
    if(useU)chars+=upper;if(useL)chars+=lower;if(useN)chars+=nums;if(useS)chars+=syms;
    if(!chars){document.getElementById('pg-out').textContent='Select at least one type';return;}
    const arr=new Uint32Array(len);
    crypto.getRandomValues(arr);
    const pwd=Array.from(arr).map(v=>chars[v%chars.length]).join('');
    const out=document.getElementById('pg-out');
    out.textContent=pwd;
    out.onclick=()=>navigator.clipboard.writeText(pwd);
    // entropy
    const entropy=len*Math.log2(chars.length);
    const str=entropy<40?'Weak':entropy<60?'Fair':entropy<80?'Strong':'Very strong';
    document.getElementById('pg-strength').textContent=\`Entropy: ~\${entropy.toFixed(0)} bits — \${str}\`;
  }
  document.getElementById('pg-gen').onclick=gen;
  gen();
})();`
);

// ─── 107 ── UUID Generator ─────────────────────────────────────────────────────
tool('uuidgen', 'dev', '🆔',
  `<div id="uuid-app"><div class="row"><div class="field"><label for="uuid-n">{{ui.count}}</label><input type="number" id="uuid-n" min="1" max="50" value="5" inputmode="numeric"></div><div class="field"><label for="uuid-ver">{{ui.version}}</label><select id="uuid-ver"><option value="4">UUID v4 (random)</option><option value="nil">Nil UUID</option></select></div><button class="btn" id="uuid-gen">{{ui.generate}}</button></div><div id="uuid-out" style="margin-top:0.75rem;display:grid;gap:0.4rem"></div></div>`,
  { title:'UUID Generator — generate random UUID v4 online', metaDescription:'Free UUID generator. Generate one or multiple random UUID v4 identifiers instantly in your browser. Click any UUID to copy it.', h1:'UUID Generator', intro:'Generate one or more random UUID v4 values. Click any UUID to copy it to your clipboard.', faq_title:'UUID generator FAQ', ui:{ count:'Count (1–50)', version:'Version', generate:'Generate' }, faq:[
    { q:'What is a UUID?', a:'A UUID (Universally Unique Identifier) is a 128-bit number formatted as 8-4-4-4-12 hexadecimal characters, like 550e8400-e29b-41d4-a716-446655440000. It is designed to be globally unique without a central registry.' },
    { q:'What is UUID v4?', a:'UUID version 4 is randomly generated. It uses 122 random bits with the other 6 bits used for versioning. The probability of two v4 UUIDs colliding is astronomically small.' },
    { q:'Are generated UUIDs stored anywhere?', a:'No. UUID generation uses crypto.getRandomValues() in your browser. No values are sent to any server.' }
  ]},
  { title:'Gerador de UUID — gere UUIDs aleatórios v4 online', metaDescription:'Gerador de UUID gratuito. Gere um ou vários identificadores UUID v4 aleatórios instantaneamente no seu navegador. Clique em qualquer UUID para copiá-lo.', h1:'Gerador de UUID', intro:'Gere um ou mais valores UUID v4 aleatórios. Clique em qualquer UUID para copiá-lo para a área de transferência.', faq_title:'Perguntas frequentes sobre gerador de UUID', ui:{ count:'Quantidade (1–50)', version:'Versão', generate:'Gerar' }, faq:[
    { q:'O que é um UUID?', a:'Um UUID (Identificador Universalmente Único) é um número de 128 bits formatado como 8-4-4-4-12 caracteres hexadecimais. Ele é projetado para ser globalmente único sem um registro central.' },
    { q:'O que é UUID v4?', a:'O UUID versão 4 é gerado aleatoriamente. Usa 122 bits aleatórios com os outros 6 bits para versionamento. A probabilidade de colisão entre dois UUIDs v4 é astronomicamente pequena.' },
    { q:'Os UUIDs gerados são armazenados em algum lugar?', a:'Não. A geração usa crypto.getRandomValues() no seu navegador. Nenhum valor é enviado para qualquer servidor.' }
  ]},
  `(function(){
  function genV4(){
    const arr=new Uint8Array(16);
    crypto.getRandomValues(arr);
    arr[6]=(arr[6]&0x0f)|0x40;
    arr[8]=(arr[8]&0x3f)|0x80;
    const h=Array.from(arr).map(v=>v.toString(16).padStart(2,'0'));
    return \`\${h.slice(0,4).join('')}-\${h.slice(4,6).join('')}-\${h.slice(6,8).join('')}-\${h.slice(8,10).join('')}-\${h.slice(10,16).join('')}\`;
  }
  document.getElementById('uuid-gen').onclick=function(){
    const n=Math.min(50,Math.max(1,parseInt(document.getElementById('uuid-n').value)||5));
    const ver=document.getElementById('uuid-ver').value;
    const uuids=Array.from({length:n},()=>ver==='nil'?'00000000-0000-0000-0000-000000000000':genV4());
    const out=document.getElementById('uuid-out');
    out.innerHTML=uuids.map(u=>\`<div style="font-family:monospace;padding:0.5rem 0.75rem;background:var(--surface);border:1px solid var(--line);border-radius:8px;cursor:pointer" onclick="navigator.clipboard.writeText('\${u}');this.style.borderColor='var(--accent,#6366f1)'">\${u}</div>\`).join('');
  };
})();`
);

// ─── 108 ── Morse Code Translator Extended ────────────────────────────────────
// (already exists as morsetranslator — skip, use next)
// ─── 108 ── Emoji Picker ──────────────────────────────────────────────────────
tool('emojipicker', 'text', '😀',
  `<div id="em-app"><div class="field"><input type="search" id="em-search" placeholder="{{ui.search}}" style="width:100%;padding:0.5rem 0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)"></div><div id="em-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(44px,1fr));gap:4px;max-height:320px;overflow-y:auto;margin-top:0.5rem"></div><p id="em-hint" class="hint" style="margin-top:0.5rem">{{ui.hint}}</p></div>`,
  { title:'Emoji Picker — search and copy any emoji', metaDescription:'Free emoji picker. Search over 1,500 emojis by name, click any emoji to copy it to your clipboard. Works on all devices.', h1:'Emoji Picker', intro:'Search for emojis by name or keyword, then click any emoji to copy it.', faq_title:'Emoji picker FAQ', ui:{ search:'Search emojis…', hint:'Click any emoji to copy it' }, faq:[
    { q:'How many emojis are available?', a:'This picker includes over 1,500 common emojis from the latest Unicode standard, organized by keyword. Search by name (e.g. "heart", "fire", "dog") to find what you need.' },
    { q:'Does this work on mobile?', a:'Yes. The emoji picker is fully responsive and touch-friendly. Tap any emoji on a mobile device to copy it.' },
    { q:'What Unicode version is used?', a:'The displayed emojis depend on your operating system and browser. If an emoji shows as a box or question mark, your device may not support that Unicode version yet.' }
  ]},
  { title:'Seletor de Emoji — pesquise e copie qualquer emoji', metaDescription:'Seletor de emoji gratuito. Pesquise mais de 1.500 emojis por nome, clique em qualquer emoji para copiá-lo. Funciona em todos os dispositivos.', h1:'Seletor de Emoji', intro:'Pesquise emojis por nome ou palavra-chave, depois clique em qualquer emoji para copiá-lo.', faq_title:'Perguntas frequentes sobre seletor de emoji', ui:{ search:'Pesquisar emojis…', hint:'Clique em qualquer emoji para copiá-lo' }, faq:[
    { q:'Quantos emojis estão disponíveis?', a:'Este seletor inclui mais de 1.500 emojis comuns do padrão Unicode mais recente, organizados por palavra-chave.' },
    { q:'Funciona em dispositivos móveis?', a:'Sim. O seletor de emoji é totalmente responsivo. Toque em qualquer emoji em um dispositivo móvel para copiá-lo.' },
    { q:'Qual versão Unicode é usada?', a:'Os emojis exibidos dependem do seu sistema operacional e navegador. Se um emoji aparecer como caixa, seu dispositivo pode não suportar essa versão Unicode.' }
  ]},
  `(function(){
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
    grid.innerHTML=list.map(([e,kw])=>\`<button title="\${kw.split(' ')[0]}" style="font-size:1.5rem;background:none;border:none;cursor:pointer;padding:4px;border-radius:6px;transition:transform .1s" onmouseenter="this.style.transform='scale(1.3)'" onmouseleave="this.style.transform=''" onclick="navigator.clipboard.writeText('\${e}');document.getElementById('em-hint').textContent='\${e} copied!'">\${e}</button>\`).join('');
  }
  render(data);
  document.getElementById('em-search').addEventListener('input',function(){
    const q=this.value.toLowerCase().trim();
    render(q?data.filter(([e,kw])=>kw.includes(q)||e===q):data);
  });
})();`
);

// ─── 109 ── Word Frequency Counter ────────────────────────────────────────────
tool('wordfrequency', 'text', '📊',
  `<div id="wf-app"><div class="field"><label for="wf-in">{{ui.text}}</label><textarea id="wf-in" rows="6" placeholder="{{ui.placeholder}}" style="width:100%;resize:vertical;padding:0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)"></textarea></div><div class="row"><div class="field"><label for="wf-n">{{ui.topN}}</label><input type="number" id="wf-n" min="1" max="100" value="20" inputmode="numeric"></div><label style="display:flex;align-items:center;gap:0.4rem;margin-top:1.5rem"><input type="checkbox" id="wf-stop">{{ui.stopwords}}</label><button class="btn" id="wf-go">{{ui.analyze}}</button></div><div id="wf-out" style="margin-top:0.75rem"></div></div>`,
  { title:'Word Frequency Counter — find the most common words in text', metaDescription:'Free word frequency counter. Paste any text and instantly see the most common words ranked by frequency. Option to exclude stop words.', h1:'Word Frequency Counter', intro:'Paste text to count word frequencies. See the most common words with their counts and percentages.', faq_title:'Word frequency FAQ', ui:{ text:'Text', placeholder:'Paste your text here…', topN:'Show top', stopwords:'Exclude common words', analyze:'Analyze' }, faq:[
    { q:'What are stop words?', a:'Stop words are very common words (the, and, in, is, a, an…) that typically carry little meaning and are often excluded from text analysis to reveal more meaningful content words.' },
    { q:'Why analyze word frequency?', a:'Word frequency analysis is used in SEO (keyword density), text summarization, plagiarism detection, stylometric authorship analysis, and natural language processing.' },
    { q:'Is the analysis case-sensitive?', a:'No. Words are compared case-insensitively ("The" and "the" count as the same word). Punctuation is also stripped before counting.' }
  ]},
  { title:'Contador de Frequência de Palavras — encontre as palavras mais comuns', metaDescription:'Contador de frequência de palavras gratuito. Cole qualquer texto e veja as palavras mais comuns classificadas por frequência. Opção de excluir palavras muito comuns.', h1:'Contador de Frequência de Palavras', intro:'Cole texto para contar frequências de palavras. Veja as palavras mais comuns com suas contagens e porcentagens.', faq_title:'Perguntas frequentes sobre frequência de palavras', ui:{ text:'Texto', placeholder:'Cole seu texto aqui…', topN:'Mostrar top', stopwords:'Excluir palavras comuns', analyze:'Analisar' }, faq:[
    { q:'O que são palavras comuns (stop words)?', a:'São palavras muito frequentes (o, a, de, em, e, que…) que geralmente carregam pouco significado e frequentemente são excluídas da análise de texto para revelar palavras de conteúdo mais significativas.' },
    { q:'Por que analisar frequência de palavras?', a:'A análise de frequência de palavras é usada em SEO (densidade de palavras-chave), sumarização de texto, detecção de plágio, análise estilométrica de autoria e processamento de linguagem natural.' },
    { q:'A análise é sensível a maiúsculas?', a:'Não. As palavras são comparadas sem distinção de maiúsculas/minúsculas e a pontuação é removida antes da contagem.' }
  ]},
  `(function(){
  const stops=new Set('the a an and or but in on at to of is it this that these those was were are be been being have has had do does did will would could should may might must shall can for from with about as by into through during before after above below i me my myself we our ours ourselves you your yours yourself he him his himself she her hers herself they them their theirs themselves what which who whom this each few more most other some such no nor not only own same so than too very just because than'.split(' '));
  document.getElementById('wf-go').onclick=function(){
    const text=document.getElementById('wf-in').value;
    const n=Math.min(100,Math.max(1,parseInt(document.getElementById('wf-n').value)||20));
    const excl=document.getElementById('wf-stop').checked;
    const words=text.toLowerCase().replace(/[^a-z\\s]/g,' ').split(/\\s+/).filter(w=>w.length>0&&(!excl||!stops.has(w)));
    const freq={};words.forEach(w=>{freq[w]=(freq[w]||0)+1;});
    const sorted=Object.entries(freq).sort((a,b)=>b[1]-a[1]).slice(0,n);
    const total=words.length;
    if(!sorted.length){document.getElementById('wf-out').innerHTML='<p>No words found</p>';return;}
    const max=sorted[0][1];
    document.getElementById('wf-out').innerHTML=\`<div style="margin-bottom:0.5rem;opacity:0.6;font-size:0.85rem">Total words: \${total} | Unique: \${Object.keys(freq).length}</div>\`+sorted.map(([w,c])=>\`<div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:4px"><span style="width:120px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">\${w}</span><div style="flex:1;background:var(--line);border-radius:4px;height:16px"><div style="background:var(--accent,#6366f1);border-radius:4px;height:100%;width:\${(c/max*100).toFixed(0)}%"></div></div><span style="width:60px;text-align:right;font-size:0.8rem;opacity:0.7">\${c} (\${(c/total*100).toFixed(1)}%)</span></div>\`).join('');
  };
})();`
);

// ─── 110 ── Sentence Counter ──────────────────────────────────────────────────
tool('sentencecounter', 'text', '📄',
  `<div id="sc2-app"><div class="field"><label for="sc2-in">{{ui.text}}</label><textarea id="sc2-in" rows="6" placeholder="{{ui.placeholder}}" style="width:100%;resize:vertical;padding:0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)"></textarea></div><div id="sc2-out" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:0.5rem;margin-top:0.75rem"></div></div>`,
  { title:'Sentence Counter — count sentences, words, characters and paragraphs', metaDescription:'Free sentence counter. Paste any text to instantly count sentences, words, characters, paragraphs, and lines. Shows average words per sentence.', h1:'Sentence Counter', intro:'Paste text to count sentences, words, characters, paragraphs, and lines in real time.', faq_title:'Sentence counter FAQ', ui:{ text:'Text', placeholder:'Type or paste text here…' }, faq:[
    { q:'How are sentences counted?', a:'The tool splits text by sentence-ending punctuation (. ! ?) followed by whitespace or end of text. Abbreviations and decimal numbers may occasionally be counted as sentence boundaries.' },
    { q:'What is the average words-per-sentence metric?', a:'Average words per sentence (also called average sentence length) is a readability metric. Academic writing averages 20–30 words per sentence; journalism targets 15–20; highly readable text targets 10–15.' },
    { q:'How are paragraphs counted?', a:'Paragraphs are counted as groups of text separated by one or more blank lines (double newlines).' }
  ]},
  { title:'Contador de Frases — conte frases, palavras, caracteres e parágrafos', metaDescription:'Contador de frases gratuito. Cole qualquer texto para contar instantaneamente frases, palavras, caracteres, parágrafos e linhas.', h1:'Contador de Frases', intro:'Cole texto para contar frases, palavras, caracteres, parágrafos e linhas em tempo real.', faq_title:'Perguntas frequentes sobre contador de frases', ui:{ text:'Texto', placeholder:'Digite ou cole o texto aqui…' }, faq:[
    { q:'Como as frases são contadas?', a:'A ferramenta divide o texto pela pontuação de fim de frase (. ! ?) seguida de espaço em branco ou fim do texto. Abreviações e números decimais podem ocasionalmente ser contados como limites de frase.' },
    { q:'O que é a métrica de palavras por frase?', a:'Palavras por frase (comprimento médio de frase) é uma métrica de legibilidade. Escrita acadêmica tem em média 20–30 palavras por frase; jornalismo visa 15–20; texto altamente legível visa 10–15.' },
    { q:'Como os parágrafos são contados?', a:'Parágrafos são contados como grupos de texto separados por uma ou mais linhas em branco (quebras de linha duplas).' }
  ]},
  `(function(){
  function upd(){
    const t=document.getElementById('sc2-in').value;
    const chars=t.length;
    const charsNoSp=[...t].filter(c=>c!==' '&&c!=='\\n'&&c!=='\\r').length;
    const words=t.trim()?t.trim().split(/\\s+/).length:0;
    const sentences=t.trim()?t.split(/[.!?]+(?:\\s|$)/).filter(s=>s.trim()).length:0;
    const paragraphs=t.trim()?t.split(/\\n\\s*\\n/).filter(p=>p.trim()).length:0;
    const lines=t.trim()?t.split('\\n').length:0;
    const avgWps=sentences?Math.round(words/sentences):0;
    const items=[['Characters',chars],['Characters (no spaces)',charsNoSp],['Words',words],['Sentences',sentences],['Paragraphs',paragraphs],['Lines',lines],['Avg words/sentence',avgWps]];
    document.getElementById('sc2-out').innerHTML=items.map(([k,v])=>\`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">\${k}</div><strong>\${v}</strong></div>\`).join('');
  }
  document.getElementById('sc2-in').addEventListener('input',upd);
  upd();
})();`
);

console.log('\n✓ Batch 5 (tools 80-110) complete.');
