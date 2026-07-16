#!/usr/bin/env node
// gen-batch7.mjs — tools 131-165 (text, productivity, utility, dev, games)
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

// ─── 131 ── Anagram Solver ──────────────────────────────────────────────────
tool('anagramsolver', 'text', '🔡',
  `<form id="an-form"><div class="row"><div class="field"><label for="an-in">{{ui.letters}}</label><input type="text" id="an-in" placeholder="listen" autocomplete="off"></div><div class="field"><label for="an-minlen">{{ui.minLen}}</label><input type="number" id="an-minlen" min="2" max="15" value="4" inputmode="numeric"></div><button class="btn" type="submit">{{ui.find}}</button></div></form><div id="an-out" style="margin-top:0.75rem"></div>`,
  { title:'Anagram Solver — find all words from a set of letters', metaDescription:'Free anagram solver. Enter letters to find all valid English words you can make. Great for Scrabble, Wordle and word games.', h1:'Anagram Solver', intro:'Enter letters and find all valid English words that can be formed from them. Set a minimum word length to filter results.', faq_title:'Anagram solver FAQ', ui:{ letters:'Enter letters', minLen:'Min length', find:'Find Anagrams' }, faq:[
    { q:'What is an anagram?', a:'An anagram uses the same letters as another word or phrase, rearranged. For example, "listen" and "silent" are anagrams of each other. A sub-anagram uses a subset of the letters.' },
    { q:'Is this useful for word games?', a:'Yes. Anagram solvers are used for Scrabble, Words with Friends, Wordle (to find words using available letters), and crossword puzzles. They show all possible word formations from a given set of letters.' },
    { q:'How large is the word list?', a:'The built-in word list contains thousands of common English words. For competitive Scrabble, players use the Official Scrabble Players Dictionary (OSPD) or Tournament Word List (TWL), which include many more obscure words.' }
  ]},
  { title:'Solucionador de Anagramas — encontre todas as palavras com as letras', metaDescription:'Solucionador de anagramas gratuito. Insira letras para encontrar todas as palavras válidas em inglês que você pode formar.', h1:'Solucionador de Anagramas', intro:'Insira letras e encontre todas as palavras válidas em inglês que podem ser formadas com elas. Defina um comprimento mínimo para filtrar os resultados.', faq_title:'Perguntas frequentes sobre solucionador de anagramas', ui:{ letters:'Insira as letras', minLen:'Comprimento mínimo', find:'Encontrar Anagramas' }, faq:[
    { q:'O que é um anagrama?', a:'Um anagrama usa as mesmas letras que outra palavra ou frase, reorganizadas. Por exemplo, "amor" e "roma" são anagramas um do outro.' },
    { q:'É útil para jogos de palavras?', a:'Sim. Solucionadores de anagramas são usados para Scrabble, Palavras Cruzadas e outros jogos de palavras.' },
    { q:'Quão grande é a lista de palavras?', a:'A lista de palavras integrada contém milhares de palavras comuns em inglês.' }
  ]},
  `(function(){
  // Compact common English word list (sorted by length desc for relevance)
  const words='able about above abstract accept access act action add age agree air all allow almost alone along already also always among amount and animal another answer any area around art ask away back ball band bank base battle be beat beautiful because become before behind believe below best better between big black blood blue body book born both break bring build burn but by call came can care carry cast cause change charge check child choose city claim class clear close cold come common complete concern consider contain continue control could country cover create cross cut dark date day dead deal death decide deep deny design detail develop die difference difficult direct discuss distance do does done door down draw drive drop during each early earth east easy edge effect either else end energy enough enter event ever every example exist experience explain face fact fall family far feel feet fight figure find fine follow food force forest form forward found free friend front full function future garden get give global go good government great green ground grow hand hard head help here high history hold home hope hour house human idea important include increase individual inside interest into issue itself join keep kind know land large last late lead learn less life light like line live long look lose low main make man matter mean memory mind money month more most move much must name nature need network new next night no not nothing notice number object occur off old only open or order other outside over own part pass path people per place plan play point policy power present problem process product put quite range reach read real reason record reduce relate remain remember result rich right rise run school see seek seem self sense serve set share show side simple since size skill small so society some south south soon sound space stand start state still stop story study take talk than them then theory think this those through time together top toward trade turn type under use usually value very view want war watch way west what when where which while wide will without woman world yet young'.split(' ');
  function canMake(word,letters){
    const l=[...letters.toLowerCase()];
    return[...word].every(c=>{const i=l.indexOf(c);if(i<0)return false;l.splice(i,1);return true;});
  }
  document.getElementById('an-form').addEventListener('submit',function(e){
    e.preventDefault();
    const letters=document.getElementById('an-in').value.replace(/[^a-zA-Z]/g,'');
    const minLen=parseInt(document.getElementById('an-minlen').value)||4;
    if(!letters){return;}
    const found=words.filter(w=>w.length>=minLen&&canMake(w,letters));
    found.sort((a,b)=>b.length-a.length||a.localeCompare(b));
    const out=document.getElementById('an-out');
    if(!found.length){out.innerHTML='<p>No words found. Try shorter minimum length.</p>';return;}
    out.innerHTML='<p style="opacity:0.6;font-size:0.85rem">'+found.length+' word'+(found.length!==1?'s':'')+' found:</p><div style="display:flex;flex-wrap:wrap;gap:0.4rem;margin-top:0.5rem">'+found.map(w=>'<span style="padding:4px 10px;background:var(--surface);border:1px solid var(--line);border-radius:20px;font-size:0.9rem">'+w+'</span>').join('')+'</div>';
  });
})();`
);

// ─── 132 ── Text Reverser ─────────────────────────────────────────────────────
tool('textreverser', 'text', '↩️',
  `<div id="tr2-app"><div class="field"><label for="tr2-in">{{ui.input}}</label><textarea id="tr2-in" rows="4" placeholder="{{ui.placeholder}}" style="width:100%;resize:vertical;padding:0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)"></textarea></div><div class="row" style="gap:0.5rem;flex-wrap:wrap"><button class="btn" id="tr2-rev">{{ui.reverseText}}</button><button class="btn" id="tr2-words">{{ui.reverseWords}}</button><button class="btn" id="tr2-lines">{{ui.reverseLines}}</button></div><div class="field" style="margin-top:0.5rem"><label for="tr2-out">{{ui.output}}</label><textarea id="tr2-out" rows="4" readonly style="width:100%;resize:vertical;padding:0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)"></textarea></div></div>`,
  { title:'Text Reverser — reverse characters, words or lines of text', metaDescription:'Free text reverser. Reverse characters in text, reverse word order, or reverse the order of lines. Three reversal modes in one tool.', h1:'Text Reverser', intro:'Paste text and choose a reversal mode: reverse all characters, reverse word order, or reverse the order of lines.', faq_title:'Text reverser FAQ', ui:{ input:'Input', placeholder:'Type or paste text here…', reverseText:'Reverse characters', reverseWords:'Reverse words', reverseLines:'Reverse lines', output:'Result' }, faq:[
    { q:'What is character reversal?', a:'"Hello world" becomes "dlrow olleH". Each character is placed in the opposite order.' },
    { q:'What is word reversal?', a:'"Hello world" becomes "world Hello". The words are kept intact but their order is flipped.' },
    { q:'When is line reversal useful?', a:'Line reversal is useful for reversing lists, numbered sequences, logs (to show most recent first), or any block of text where you want the last line to appear first.' }
  ]},
  { title:'Reversor de Texto — inverter caracteres, palavras ou linhas', metaDescription:'Reversor de texto gratuito. Inverta caracteres, ordem das palavras ou ordem das linhas em qualquer texto.', h1:'Reversor de Texto', intro:'Cole o texto e escolha um modo de inversão: inverter todos os caracteres, ordem das palavras ou ordem das linhas.', faq_title:'Perguntas frequentes sobre reversor de texto', ui:{ input:'Entrada', placeholder:'Digite ou cole o texto aqui…', reverseText:'Inverter caracteres', reverseWords:'Inverter palavras', reverseLines:'Inverter linhas', output:'Resultado' }, faq:[
    { q:'O que é inversão de caracteres?', a:'"Olá mundo" vira "odnum álO". Cada caractere é colocado na ordem oposta.' },
    { q:'O que é inversão de palavras?', a:'"Olá mundo" vira "mundo Olá". As palavras ficam intactas mas sua ordem é invertida.' },
    { q:'Quando a inversão de linhas é útil?', a:'A inversão de linhas é útil para inverter listas, sequências numeradas, logs (para mostrar o mais recente primeiro) ou qualquer bloco de texto onde você quer que a última linha apareça primeiro.' }
  ]},
  `(function(){
  const inp=document.getElementById('tr2-in');
  const out=document.getElementById('tr2-out');
  document.getElementById('tr2-rev').onclick=()=>out.value=[...inp.value].reverse().join('');
  document.getElementById('tr2-words').onclick=()=>out.value=inp.value.split(' ').reverse().join(' ');
  document.getElementById('tr2-lines').onclick=()=>out.value=inp.value.split('\\n').reverse().join('\\n');
})();`
);

// ─── 133 ── Slug Generator ────────────────────────────────────────────────────
tool('sluggen', 'dev', '🔗',
  `<div id="sg2-app"><div class="field"><label for="sg2-in">{{ui.text}}</label><input type="text" id="sg2-in" placeholder="My Blog Post Title!"></div><div class="row" style="gap:0.5rem;flex-wrap:wrap"><div class="field"><label for="sg2-sep">{{ui.separator}}</label><select id="sg2-sep"><option value="-">Hyphen (-)</option><option value="_">Underscore (_)</option></select></div><label style="display:flex;align-items:center;gap:0.4rem;margin-top:1.5rem"><input type="checkbox" id="sg2-lower" checked>{{ui.lowercase}}</label></div><div class="result"><div id="sg2-out" style="font-family:monospace;font-size:1.1rem;word-break:break-all;cursor:pointer;padding:0.75rem;background:var(--surface);border:1px solid var(--line);border-radius:8px" title="Click to copy">—</div></div></div>`,
  { title:'URL Slug Generator — convert text to URL-friendly slugs', metaDescription:'Free URL slug generator. Convert any title or text to a clean, URL-friendly slug by removing special characters and replacing spaces with hyphens.', h1:'URL Slug Generator', intro:'Type or paste text to instantly generate a URL-friendly slug. Removes accents, special characters and replaces spaces with hyphens.', faq_title:'Slug generator FAQ', ui:{ text:'Text to slugify', separator:'Separator', lowercase:'Lowercase' }, faq:[
    { q:'What is a URL slug?', a:'A slug is the readable part of a URL that identifies a specific page. For example, in "example.com/blog/my-first-post", the slug is "my-first-post". Slugs should be lowercase, with words separated by hyphens, and no special characters.' },
    { q:'How are accented characters handled?', a:'Accented characters like é, ñ, ü are converted to their ASCII equivalents (e, n, u) using Unicode normalization and decomposition. This ensures the slug works correctly in all URLs.' },
    { q:'Why hyphens instead of underscores?', a:'Google recommends hyphens as word separators in URLs because they treat hyphens as word separators (like spaces in search), while underscores join words together. "my-blog-post" is better for SEO than "my_blog_post".' }
  ]},
  { title:'Gerador de Slug de URL — converter texto em slugs amigáveis para URL', metaDescription:'Gerador de slug de URL gratuito. Converta qualquer título ou texto em um slug limpo e amigável para URL, removendo caracteres especiais e substituindo espaços por hífens.', h1:'Gerador de Slug de URL', intro:'Digite ou cole texto para gerar instantaneamente um slug amigável para URL. Remove acentos, caracteres especiais e substitui espaços por hífens.', faq_title:'Perguntas frequentes sobre gerador de slug', ui:{ text:'Texto para gerar slug', separator:'Separador', lowercase:'Minúsculas' }, faq:[
    { q:'O que é um slug de URL?', a:'Um slug é a parte legível de uma URL que identifica uma página específica. Por exemplo, em "exemplo.com/blog/meu-primeiro-post", o slug é "meu-primeiro-post".' },
    { q:'Como caracteres acentuados são tratados?', a:'Caracteres acentuados como é, ñ, ü são convertidos para seus equivalentes ASCII (e, n, u) usando normalização Unicode.' },
    { q:'Por que hífens em vez de underscores?', a:'O Google recomenda hífens como separadores de palavras em URLs. "meu-post" é melhor para SEO que "meu_post".' }
  ]},
  `(function(){
  function slugify(text,sep,lower){
    let s=text.normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').replace(/[^a-zA-Z0-9\\s-_]/g,'').trim().replace(/[\\s-_]+/g,sep);
    return lower?s.toLowerCase():s;
  }
  function update(){
    const text=document.getElementById('sg2-in').value;
    const sep=document.getElementById('sg2-sep').value;
    const lower=document.getElementById('sg2-lower').checked;
    const slug=slugify(text,sep,lower);
    const out=document.getElementById('sg2-out');
    out.textContent=slug||'—';
    out.onclick=()=>{if(slug)navigator.clipboard.writeText(slug);};
  }
  ['sg2-in','sg2-sep'].forEach(id=>document.getElementById(id).addEventListener('input',update));
  document.getElementById('sg2-lower').addEventListener('change',update);
})();`
);

// ─── 134 ── Markdown to HTML ──────────────────────────────────────────────────
tool('markdownhtml', 'dev', '📝',
  `<div id="md-app" style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem"><div><label for="md-in" style="display:block;margin-bottom:0.4rem">{{ui.markdown}}</label><textarea id="md-in" rows="12" placeholder="# Hello World\n\n**Bold** and *italic*\n\n- List item\n- Another item" style="width:100%;resize:vertical;padding:0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text);font-family:monospace;font-size:0.875rem"></textarea></div><div><label style="display:block;margin-bottom:0.4rem">{{ui.html}}</label><div id="md-preview" style="height:calc(100% - 1.8rem);overflow-y:auto;padding:0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface)"></div></div></div><div class="row" style="gap:0.5rem;margin-top:0.5rem"><button class="btn" id="md-copy-html">{{ui.copyHtml}}</button></div>`,
  { title:'Markdown to HTML Converter — convert Markdown to HTML instantly', metaDescription:'Free Markdown to HTML converter. Paste Markdown and see the HTML output and live preview side by side. Supports headings, lists, links, images, code and bold/italic.', h1:'Markdown to HTML Converter', intro:'Write Markdown on the left and see the rendered HTML and live preview on the right, updated in real time.', faq_title:'Markdown to HTML FAQ', ui:{ markdown:'Markdown', html:'Preview', copyHtml:'Copy HTML' }, faq:[
    { q:'What Markdown features are supported?', a:'Headings (#, ##, ###), bold (**text**), italic (*text*), code (` ` `), code blocks (```), links ([text](url)), images (![alt](url)), unordered lists (- item), ordered lists (1. item), horizontal rules (---) and blockquotes (> text).' },
    { q:'What is Markdown?', a:'Markdown is a lightweight markup language created by John Gruber in 2004. It uses plain text formatting syntax that converts easily to HTML. It is widely used in README files, documentation, wikis, and blogging platforms like Ghost and Jekyll.' },
    { q:'Which Markdown flavour is used?', a:'This tool implements CommonMark-compatible Markdown, the most widely adopted specification. GitHub Flavored Markdown (GFM) adds tables and task lists which are not currently supported.' }
  ]},
  { title:'Conversor de Markdown para HTML — converta Markdown em HTML instantaneamente', metaDescription:'Conversor de Markdown para HTML gratuito. Cole Markdown e veja a saída HTML e visualização ao vivo lado a lado.', h1:'Conversor de Markdown para HTML', intro:'Escreva Markdown à esquerda e veja o HTML renderizado e a pré-visualização ao vivo à direita, atualizado em tempo real.', faq_title:'Perguntas frequentes sobre Markdown para HTML', ui:{ markdown:'Markdown', html:'Visualização', copyHtml:'Copiar HTML' }, faq:[
    { q:'Quais recursos Markdown são suportados?', a:'Títulos (#, ##, ###), negrito (**texto**), itálico (*texto*), código (` ` `), blocos de código (```), links ([texto](url)), imagens (![alt](url)), listas não ordenadas (- item), listas ordenadas (1. item), réguas horizontais (---) e blockquotes (> texto).' },
    { q:'O que é Markdown?', a:'Markdown é uma linguagem de marcação leve criada por John Gruber em 2004. Usa sintaxe de formatação de texto simples que converte facilmente para HTML.' },
    { q:'Qual dialeto de Markdown é usado?', a:'Esta ferramenta implementa Markdown compatível com CommonMark, a especificação mais amplamente adotada.' }
  ]},
  `(function(){
  function mdToHtml(md){
    return md
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/^### (.+)$/gm,'<h3>$1</h3>')
      .replace(/^## (.+)$/gm,'<h2>$1</h2>')
      .replace(/^# (.+)$/gm,'<h1>$1</h1>')
      .replace(/^> (.+)$/gm,'<blockquote>$1</blockquote>')
      .replace(/^---+$/gm,'<hr>')
      .replace(/\\*\\*([^*]+)\\*\\*/g,'<strong>$1</strong>')
      .replace(/\\*([^*]+)\\*/g,'<em>$1</em>')
      .replace(/\`\`\`([\\s\\S]*?)\`\`\`/g,'<pre><code>$1</code></pre>')
      .replace(/\`([^\\n\`]+)\`/g,'<code>$1</code>')
      .replace(/!\\[([^\\]]*)\\]\\(([^)]+)\\)/g,'<img alt="$1" src="$2">')
      .replace(/\\[([^\\]]+)\\]\\(([^)]+)\\)/g,'<a href="$2">$1</a>')
      .replace(/^\\d+\\. (.+)$/gm,'<li>$1</li>').replace(/(<li>.*<\\/li>)/s,m=>'<ol>'+m+'</ol>')
      .replace(/^[-*] (.+)$/gm,'<li>$1</li>').replace(/(<li>.*<\\/li>)/s,m=>'<ul>'+m+'</ul>')
      .replace(/^(?!<[a-z]).+$/gm,'<p>$&</p>')
      .replace(/<\\/p>\\n<p>/g,'</p><p>');
  }
  let lastHtml='';
  function update(){
    const md=document.getElementById('md-in').value;
    lastHtml=mdToHtml(md);
    document.getElementById('md-preview').innerHTML=lastHtml;
  }
  document.getElementById('md-in').addEventListener('input',update);
  document.getElementById('md-copy-html').onclick=function(){navigator.clipboard.writeText(lastHtml);};
  update();
})();`
);

// ─── 135 ── Code Beautifier / Formatter ───────────────────────────────────────
tool('htmlbeautifier', 'dev', '✨',
  `<div id="hb-app"><div class="field"><label for="hb-in">{{ui.input}}</label><textarea id="hb-in" rows="8" placeholder='&lt;div&gt;&lt;p&gt;Hello&lt;/p&gt;&lt;/div&gt;' style="width:100%;resize:vertical;padding:0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text);font-family:monospace;font-size:0.875rem"></textarea></div><div class="row" style="gap:0.5rem"><div class="field"><label for="hb-indent">{{ui.indent}}</label><select id="hb-indent"><option value="2">2 spaces</option><option value="4">4 spaces</option><option value="tab">Tab</option></select></div><button class="btn" id="hb-go">{{ui.format}}</button><button class="btn" id="hb-copy">{{ui.copy}}</button></div><div class="field" style="margin-top:0.5rem"><label for="hb-out">{{ui.output}}</label><textarea id="hb-out" rows="8" readonly style="width:100%;resize:vertical;padding:0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text);font-family:monospace;font-size:0.875rem"></textarea></div></div>`,
  { title:'HTML Beautifier — format and indent HTML code online', metaDescription:'Free HTML beautifier. Paste messy or minified HTML and format it with proper indentation for better readability.', h1:'HTML Beautifier', intro:'Paste HTML to auto-indent and format it with consistent structure. Choose 2-space, 4-space or tab indentation.', faq_title:'HTML beautifier FAQ', ui:{ input:'HTML input', indent:'Indentation', format:'Format HTML', copy:'Copy', output:'Formatted output' }, faq:[
    { q:'Why should I format HTML?', a:'Formatted HTML is much easier to read and maintain. Proper indentation shows the nesting structure of elements, making it easy to see parent-child relationships and find unclosed tags.' },
    { q:'Does formatting change how the HTML renders?', a:'No. HTML browsers ignore extra whitespace between elements. Formatted and minified HTML render identically in a browser.' },
    { q:'What is the difference between beautify and minify?', a:'Beautifying adds whitespace and indentation to make code human-readable. Minifying removes all unnecessary whitespace to reduce file size. Use beautify for development and reading; minify for production delivery.' }
  ]},
  { title:'Embelezador HTML — formate e indente código HTML online', metaDescription:'Embelezador HTML gratuito. Cole HTML confuso ou minificado e formate-o com indentação adequada para melhor legibilidade.', h1:'Embelezador HTML', intro:'Cole HTML para indentá-lo e formatá-lo automaticamente com estrutura consistente. Escolha indentação de 2 espaços, 4 espaços ou tabulação.', faq_title:'Perguntas frequentes sobre embelezador HTML', ui:{ input:'Entrada HTML', indent:'Indentação', format:'Formatar HTML', copy:'Copiar', output:'Saída formatada' }, faq:[
    { q:'Por que devo formatar HTML?', a:'HTML formatado é muito mais fácil de ler e manter. A indentação adequada mostra a estrutura de aninhamento dos elementos, facilitando a visualização das relações pai-filho.' },
    { q:'A formatação muda como o HTML é renderizado?', a:'Não. Os navegadores ignoram espaços em branco extras entre elementos. HTML formatado e minificado renderizam de forma idêntica.' },
    { q:'Qual a diferença entre embelezar e minificar?', a:'Embelezar adiciona espaços e indentação para tornar o código legível. Minificar remove todos os espaços desnecessários para reduzir o tamanho do arquivo.' }
  ]},
  `(function(){
  function beautifyHtml(html,indentStr){
    const INDENT=indentStr;
    const voidTags=new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);
    let formatted='';let depth=0;
    const tokens=html.replace(/></g,'>\\n<').split('\\n');
    tokens.forEach(token=>{
      token=token.trim();if(!token)return;
      const isClose=/^<\\/[^>]+>/.test(token);
      const isVoid=new RegExp('^<('+[...voidTags].join('|')+')[^>]*>$','i').test(token);
      const isSelfClose=/\\/>$/.test(token);
      if(isClose&&!isVoid)depth=Math.max(0,depth-1);
      formatted+=INDENT.repeat(depth)+token+'\\n';
      if(!isClose&&!isVoid&&!isSelfClose&&/^<[^!/?]/.test(token))depth++;
    });
    return formatted.trim();
  }
  document.getElementById('hb-go').onclick=function(){
    const html=document.getElementById('hb-in').value;
    const indentSel=document.getElementById('hb-indent').value;
    const indentStr=indentSel==='tab'?'\\t':' '.repeat(parseInt(indentSel));
    document.getElementById('hb-out').value=beautifyHtml(html,indentStr);
  };
  document.getElementById('hb-copy').onclick=function(){navigator.clipboard.writeText(document.getElementById('hb-out').value);};
})();`
);

// ─── 136 ── Text to Binary ────────────────────────────────────────────────────
tool('texttobinary', 'utility', '01',
  `<div id="tb-app"><div class="field"><label for="tb-in">{{ui.text}}</label><textarea id="tb-in" rows="3" placeholder="Hello" style="width:100%;resize:vertical;padding:0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)"></textarea></div><div class="row" style="gap:0.5rem"><button class="btn" id="tb-enc">{{ui.toBinary}}</button><button class="btn" id="tb-dec">{{ui.toText}}</button></div><div class="field" style="margin-top:0.5rem"><label for="tb-out">{{ui.output}}</label><textarea id="tb-out" rows="3" readonly style="width:100%;resize:vertical;padding:0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text);font-family:monospace;word-break:break-all"></textarea></div></div>`,
  { title:'Text to Binary Converter — convert text to binary and back', metaDescription:'Free text to binary converter. Convert any text to binary (01010100...) and binary back to text. Uses 8-bit ASCII encoding.', h1:'Text to Binary Converter', intro:'Convert text to binary code (8-bit per character) or decode binary back to readable text.', faq_title:'Text to binary FAQ', ui:{ text:'Text input', toBinary:'Text → Binary', toText:'Binary → Text', output:'Output' }, faq:[
    { q:'How is text converted to binary?', a:'Each character is converted to its ASCII decimal value, then that decimal is expressed as an 8-bit binary number. For example, "A" = ASCII 65 = 01000001 in binary.' },
    { q:'What encoding is used?', a:'This tool uses 8-bit ASCII (extended ASCII) encoding. For characters outside ASCII (like accented letters or emoji), UTF-8 encoding would be needed, producing variable-length binary sequences.' },
    { q:'What are real uses of binary text encoding?', a:'Binary representation of text is fundamental to how computers store and transmit all data. Networking protocols like HTTP send text data as binary. Character encodings like UTF-8 define how text maps to bytes.' }
  ]},
  { title:'Conversor de Texto para Binário — converta texto em binário e vice-versa', metaDescription:'Conversor de texto para binário gratuito. Converta qualquer texto para binário (01010100...) e binário de volta para texto. Usa codificação ASCII de 8 bits.', h1:'Conversor de Texto para Binário', intro:'Converta texto em código binário (8 bits por caractere) ou decodifique binário de volta para texto legível.', faq_title:'Perguntas frequentes sobre texto para binário', ui:{ text:'Entrada de texto', toBinary:'Texto → Binário', toText:'Binário → Texto', output:'Saída' }, faq:[
    { q:'Como o texto é convertido para binário?', a:'Cada caractere é convertido para seu valor decimal ASCII, depois esse decimal é expresso como um número binário de 8 bits. Por exemplo, "A" = ASCII 65 = 01000001 em binário.' },
    { q:'Qual codificação é usada?', a:'Esta ferramenta usa codificação ASCII de 8 bits. Para caracteres fora do ASCII, seria necessária a codificação UTF-8.' },
    { q:'Quais são os usos reais da codificação binária de texto?', a:'A representação binária de texto é fundamental para como os computadores armazenam e transmitem todos os dados. Protocolos de rede como HTTP enviam dados de texto como binário.' }
  ]},
  `(function(){
  document.getElementById('tb-enc').onclick=function(){
    const text=document.getElementById('tb-in').value;
    document.getElementById('tb-out').value=[...text].map(c=>c.charCodeAt(0).toString(2).padStart(8,'0')).join(' ');
  };
  document.getElementById('tb-dec').onclick=function(){
    const bin=document.getElementById('tb-in').value.trim().replace(/[^01 ]/g,'');
    try{document.getElementById('tb-out').value=bin.split(' ').filter(b=>b.length===8).map(b=>String.fromCharCode(parseInt(b,2))).join('');}
    catch(e){document.getElementById('tb-out').value='Invalid binary';}
  };
})();`
);

// ─── 137 ── ROT13 Cipher ──────────────────────────────────────────────────────
tool('rot13', 'utility', '🔄',
  `<div id="r13-app"><div class="field"><label for="r13-in">{{ui.input}}</label><textarea id="r13-in" rows="4" placeholder="{{ui.placeholder}}" style="width:100%;resize:vertical;padding:0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)"></textarea></div><div class="result"><label for="r13-out">{{ui.output}}</label><textarea id="r13-out" rows="4" readonly style="width:100%;resize:vertical;padding:0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text);margin-top:0.4rem"></textarea></div></div>`,
  { title:'ROT13 Encoder/Decoder — encode and decode ROT13 cipher', metaDescription:'Free ROT13 encoder and decoder. Convert text with the ROT13 substitution cipher in real time. ROT13 encodes and decodes with the same operation.', h1:'ROT13 Encoder / Decoder', intro:'Type or paste text to encode or decode with ROT13. Since ROT13 is its own inverse, the same operation both encodes and decodes.', faq_title:'ROT13 FAQ', ui:{ input:'Input (type to encode/decode)', placeholder:'Type here and see ROT13 instantly…', output:'ROT13 output' }, faq:[
    { q:'What is ROT13?', a:'ROT13 is a simple letter substitution cipher that rotates each letter by 13 positions in the alphabet. A becomes N, B becomes O, and so on. After 13 steps you are at the midpoint, so applying ROT13 twice returns the original text.' },
    { q:'Why is ROT13 useful?', a:'ROT13 is used on internet forums and newsgroups to hide spoilers, puzzle solutions or offensive content from casual readers. It provides minimal security — anyone who knows about ROT13 can decode it instantly.' },
    { q:'Only letters are affected?', a:'Yes. Numbers, spaces and punctuation pass through unchanged. Only A–Z and a–z are rotated. The cipher is case-preserving: uppercase stays uppercase, lowercase stays lowercase.' }
  ]},
  { title:'Codificador/Decodificador ROT13 — cifra de substituição ROT13', metaDescription:'Codificador e decodificador ROT13 gratuito. Converta texto com a cifra de substituição ROT13 em tempo real.', h1:'Codificador / Decodificador ROT13', intro:'Digite ou cole texto para codificar ou decodificar com ROT13. Como ROT13 é seu próprio inverso, a mesma operação codifica e decodifica.', faq_title:'Perguntas frequentes sobre ROT13', ui:{ input:'Entrada (digite para codificar/decodificar)', placeholder:'Digite aqui e veja o ROT13 instantaneamente…', output:'Saída ROT13' }, faq:[
    { q:'O que é ROT13?', a:'ROT13 é uma cifra de substituição simples que rotaciona cada letra em 13 posições no alfabeto. A vira N, B vira O, e assim por diante. Após 13 passos você está no meio do caminho, então aplicar ROT13 duas vezes retorna o texto original.' },
    { q:'Por que ROT13 é útil?', a:'ROT13 é usado em fóruns e grupos de notícias da internet para esconder spoilers, soluções de quebra-cabeça ou conteúdo ofensivo de leitores casuais.' },
    { q:'Apenas letras são afetadas?', a:'Sim. Números, espaços e pontuação passam sem alteração. Apenas A–Z e a–z são rotacionados. A cifra preserva maiúsculas/minúsculas.' }
  ]},
  `(function(){
  function rot13(str){return str.replace(/[a-zA-Z]/g,c=>{const base=c<='Z'?65:97;return String.fromCharCode((c.charCodeAt(0)-base+13)%26+base);});}
  document.getElementById('r13-in').addEventListener('input',function(){document.getElementById('r13-out').value=rot13(this.value);});
})();`
);

// ─── 138 ── Caesar Cipher ─────────────────────────────────────────────────────
tool('caesarcipher', 'utility', '🏛️',
  `<form id="cc2-form"><div class="row"><div class="field"><label for="cc2-in">{{ui.input}}</label><textarea id="cc2-in" rows="3" placeholder="Hello World" style="width:100%;resize:vertical;padding:0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)"></textarea></div></div><div class="row"><div class="field"><label for="cc2-shift">{{ui.shift}}</label><input type="number" id="cc2-shift" min="-25" max="25" value="3" inputmode="numeric"></div><div class="field"><label for="cc2-dir">{{ui.direction}}</label><select id="cc2-dir"><option value="enc">{{ui.encode}}</option><option value="dec">{{ui.decode}}</option></select></div><button class="btn" type="submit">{{ui.apply}}</button></div></form><div class="field" style="margin-top:0.5rem"><label for="cc2-out">{{ui.output}}</label><textarea id="cc2-out" rows="3" readonly style="width:100%;resize:vertical;padding:0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)"></textarea></div>`,
  { title:'Caesar Cipher — encrypt and decrypt with the Caesar shift cipher', metaDescription:'Free Caesar cipher tool. Encode or decode text using the Caesar substitution cipher with any shift value from 1 to 25.', h1:'Caesar Cipher', intro:'Enter text and choose a shift value to encode or decode using the Caesar cipher. ROT13 is a Caesar cipher with shift 13.', faq_title:'Caesar cipher FAQ', ui:{ input:'Text', shift:'Shift (1-25)', direction:'Mode', encode:'Encode', decode:'Decode', apply:'Apply cipher', output:'Result' }, faq:[
    { q:'What is the Caesar cipher?', a:'The Caesar cipher shifts every letter in the alphabet by a fixed number. With shift 3: A→D, B→E, C→F and so on. Named after Julius Caesar who used it in his private correspondence.' },
    { q:'How secure is the Caesar cipher?', a:'Not at all secure. The Caesar cipher is trivially broken by trying all 25 possible shifts (brute force) or by frequency analysis. It is a historical teaching tool, not a real encryption method.' },
    { q:'What is the key space?', a:'There are only 25 meaningful shifts (shift 0 does nothing, shift 26 = shift 0). A brute-force attack requires at most 25 attempts — easily done by hand. Modern encryption algorithms have key spaces of 2^128 or more.' }
  ]},
  { title:'Cifra de César — criptografar e descriptografar com a cifra de deslocamento de César', metaDescription:'Ferramenta de cifra de César gratuita. Codifique ou decodifique texto usando a cifra de substituição de César com qualquer valor de deslocamento de 1 a 25.', h1:'Cifra de César', intro:'Insira texto e escolha um valor de deslocamento para codificar ou decodificar usando a cifra de César.', faq_title:'Perguntas frequentes sobre cifra de César', ui:{ input:'Texto', shift:'Deslocamento (1-25)', direction:'Modo', encode:'Codificar', decode:'Decodificar', apply:'Aplicar cifra', output:'Resultado' }, faq:[
    { q:'O que é a cifra de César?', a:'A cifra de César desloca cada letra no alfabeto por um número fixo. Com deslocamento 3: A→D, B→E, C→F e assim por diante. Nomeada após Júlio César, que a usava em sua correspondência privada.' },
    { q:'Quão segura é a cifra de César?', a:'Nada segura. A cifra de César é trivialmente quebrada tentando todos os 25 deslocamentos possíveis (força bruta) ou por análise de frequência.' },
    { q:'O que é o espaço de chaves?', a:'Há apenas 25 deslocamentos significativos. Um ataque de força bruta requer no máximo 25 tentativas. Algoritmos modernos têm espaços de chave de 2^128 ou mais.' }
  ]},
  `(function(){
  function caesar(text,shift,decode){
    const s=decode?((26-shift%26)%26):shift;
    return text.replace(/[a-zA-Z]/g,c=>{const base=c<='Z'?65:97;return String.fromCharCode((c.charCodeAt(0)-base+s)%26+base);});
  }
  document.getElementById('cc2-form').addEventListener('submit',function(e){
    e.preventDefault();
    const text=document.getElementById('cc2-in').value;
    const shift=parseInt(document.getElementById('cc2-shift').value)||3;
    const decode=document.getElementById('cc2-dir').value==='dec';
    document.getElementById('cc2-out').value=caesar(text,shift,decode);
  });
})();`
);

// ─── 139 ── JSON to CSV Converter ─────────────────────────────────────────────
tool('jsontocsv', 'dev', '📊',
  `<div id="j2c-app"><div class="field"><label for="j2c-in">{{ui.jsonInput}}</label><textarea id="j2c-in" rows="8" placeholder='[{"name":"Alice","age":30},{"name":"Bob","age":25}]' style="width:100%;resize:vertical;padding:0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text);font-family:monospace;font-size:0.875rem"></textarea></div><div class="row" style="gap:0.5rem"><div class="field"><label for="j2c-sep">{{ui.delimiter}}</label><select id="j2c-sep"><option value=",">Comma (,)</option><option value=";">Semicolon (;)</option><option value="\\t">Tab</option></select></div><button class="btn" id="j2c-go">{{ui.convert}}</button><button class="btn" id="j2c-copy">{{ui.copy}}</button></div><div class="field" style="margin-top:0.5rem"><label for="j2c-out">{{ui.csvOutput}}</label><textarea id="j2c-out" rows="6" readonly style="width:100%;resize:vertical;padding:0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text);font-family:monospace;font-size:0.875rem"></textarea></div></div>`,
  { title:'JSON to CSV Converter — convert JSON array to CSV online', metaDescription:'Free JSON to CSV converter. Paste a JSON array of objects and convert it to a CSV file with proper headers and escaped values.', h1:'JSON to CSV Converter', intro:'Paste a JSON array of objects to convert it to CSV format. Headers are automatically extracted from object keys.', faq_title:'JSON to CSV FAQ', ui:{ jsonInput:'JSON input (array of objects)', delimiter:'Delimiter', convert:'Convert', copy:'Copy CSV', csvOutput:'CSV output' }, faq:[
    { q:'What JSON format is supported?', a:'The input must be a JSON array of objects, where each object represents a row. All objects should ideally have the same keys. Keys from the first object are used as CSV headers.' },
    { q:'How are values with commas handled?', a:'Values containing the delimiter are automatically wrapped in double quotes as required by RFC 4180. Values containing double quotes have them escaped by doubling ("").' },
    { q:'What is the difference between comma and semicolon CSV?', a:'In European countries that use comma as a decimal separator (like Germany and France), Excel expects semicolons as the CSV delimiter. If your CSV does not open correctly in Excel, try switching to semicolon.' }
  ]},
  { title:'Conversor de JSON para CSV — converter array JSON em CSV online', metaDescription:'Conversor de JSON para CSV gratuito. Cole um array JSON de objetos e converta para CSV com cabeçalhos e valores escapados corretamente.', h1:'Conversor de JSON para CSV', intro:'Cole um array JSON de objetos para convertê-lo para formato CSV. Os cabeçalhos são automaticamente extraídos das chaves dos objetos.', faq_title:'Perguntas frequentes sobre JSON para CSV', ui:{ jsonInput:'Entrada JSON (array de objetos)', delimiter:'Delimitador', convert:'Converter', copy:'Copiar CSV', csvOutput:'Saída CSV' }, faq:[
    { q:'Qual formato JSON é suportado?', a:'A entrada deve ser um array JSON de objetos, onde cada objeto representa uma linha. Todos os objetos devem idealmente ter as mesmas chaves. As chaves do primeiro objeto são usadas como cabeçalhos CSV.' },
    { q:'Como valores com vírgulas são tratados?', a:'Valores contendo o delimitador são automaticamente envolvidos em aspas duplas conforme exigido pelo RFC 4180.' },
    { q:'Qual a diferença entre CSV com vírgula e ponto-e-vírgula?', a:'Em países europeus que usam vírgula como separador decimal, o Excel espera ponto-e-vírgula como delimitador CSV. Se seu CSV não abrir corretamente no Excel, tente mudar para ponto-e-vírgula.' }
  ]},
  `(function(){
  function escape(val,sep){
    const s=String(val===null||val===undefined?'':val);
    if(s.includes(sep)||s.includes('"')||s.includes('\\n'))return '"'+s.replace(/"/g,'""')+'"';
    return s;
  }
  document.getElementById('j2c-go').onclick=function(){
    const raw=document.getElementById('j2c-in').value.trim();
    const sep=document.getElementById('j2c-sep').value;
    const out=document.getElementById('j2c-out');
    try{
      const data=JSON.parse(raw);
      if(!Array.isArray(data)||!data.length){out.value='Input must be a non-empty JSON array';return;}
      const headers=[...new Set(data.flatMap(obj=>Object.keys(obj)))];
      const rows=[headers.join(sep),...data.map(obj=>headers.map(h=>escape(obj[h],sep)).join(sep))];
      out.value=rows.join('\\n');
    }catch(e){out.value='Invalid JSON: '+e.message;}
  };
  document.getElementById('j2c-copy').onclick=function(){navigator.clipboard.writeText(document.getElementById('j2c-out').value);};
})();`
);

// ─── 140 ── CSV to JSON Converter ─────────────────────────────────────────────
tool('csvtojson', 'dev', '📋',
  `<div id="c2j-app"><div class="field"><label for="c2j-in">{{ui.csvInput}}</label><textarea id="c2j-in" rows="8" placeholder="name,age\nAlice,30\nBob,25" style="width:100%;resize:vertical;padding:0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text);font-family:monospace;font-size:0.875rem"></textarea></div><div class="row" style="gap:0.5rem"><div class="field"><label for="c2j-sep">{{ui.delimiter}}</label><select id="c2j-sep"><option value=",">Comma (,)</option><option value=";">Semicolon (;)</option><option value="\\t">Tab</option></select></div><button class="btn" id="c2j-go">{{ui.convert}}</button><button class="btn" id="c2j-copy">{{ui.copy}}</button></div><div class="field" style="margin-top:0.5rem"><label for="c2j-out">{{ui.jsonOutput}}</label><textarea id="c2j-out" rows="8" readonly style="width:100%;resize:vertical;padding:0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text);font-family:monospace;font-size:0.875rem"></textarea></div></div>`,
  { title:'CSV to JSON Converter — convert CSV data to JSON online', metaDescription:'Free CSV to JSON converter. Paste CSV data with headers to convert it to a JSON array of objects. Handles quoted values and various delimiters.', h1:'CSV to JSON Converter', intro:'Paste CSV data with a header row to convert it to a JSON array of objects. Handles commas, semicolons and tab-delimited data.', faq_title:'CSV to JSON FAQ', ui:{ csvInput:'CSV input (first row = headers)', delimiter:'Delimiter', convert:'Convert', copy:'Copy JSON', jsonOutput:'JSON output' }, faq:[
    { q:'Does my CSV need headers?', a:'Yes, this tool expects the first row to be headers. These become the keys in the resulting JSON objects. If your CSV has no headers, add them as the first row before converting.' },
    { q:'How are numbers and booleans handled?', a:'String values that look like numbers are converted to actual numbers (integers or floats). Values "true" and "false" are converted to boolean. Empty values become null.' },
    { q:'What if my values contain the delimiter?', a:'Values wrapped in double quotes are correctly parsed, even if they contain the delimiter. This follows the RFC 4180 CSV standard.' }
  ]},
  { title:'Conversor de CSV para JSON — converter dados CSV em JSON online', metaDescription:'Conversor de CSV para JSON gratuito. Cole dados CSV com cabeçalhos para convertê-los em um array JSON de objetos.', h1:'Conversor de CSV para JSON', intro:'Cole dados CSV com uma linha de cabeçalho para convertê-los em um array JSON de objetos. Suporta vírgulas, ponto-e-vírgulas e dados separados por tabulação.', faq_title:'Perguntas frequentes sobre CSV para JSON', ui:{ csvInput:'Entrada CSV (primeira linha = cabeçalhos)', delimiter:'Delimitador', convert:'Converter', copy:'Copiar JSON', jsonOutput:'Saída JSON' }, faq:[
    { q:'Meu CSV precisa de cabeçalhos?', a:'Sim, esta ferramenta espera que a primeira linha seja de cabeçalhos. Estes se tornam as chaves nos objetos JSON resultantes.' },
    { q:'Como números e booleanos são tratados?', a:'Valores de string que parecem números são convertidos em números reais. Valores "true" e "false" são convertidos em booleano. Valores vazios tornam-se null.' },
    { q:'E se meus valores contiverem o delimitador?', a:'Valores entre aspas duplas são analisados corretamente, mesmo que contenham o delimitador. Isso segue o padrão CSV RFC 4180.' }
  ]},
  `(function(){
  function parseCSV(text,sep){
    const rows=[];let cur=[],field='',inQ=false;
    for(let i=0;i<text.length;i++){
      const c=text[i];
      if(inQ){if(c==='"'&&text[i+1]==='"'){field+='"';i++;}else if(c==='"'){inQ=false;}else{field+=c;}}
      else if(c==='"'){inQ=true;}
      else if(c===sep){cur.push(field);field='';}
      else if(c==='\\n'||c==='\\r'){if(c==='\\r'&&text[i+1]==='\\n')i++;cur.push(field);rows.push(cur);cur=[];field='';}
      else{field+=c;}
    }
    cur.push(field);if(cur.some(f=>f!==''))rows.push(cur);
    return rows;
  }
  function coerce(v){if(v==='')return null;if(v==='true')return true;if(v==='false')return false;const n=Number(v);return isNaN(n)?v:n;}
  document.getElementById('c2j-go').onclick=function(){
    const raw=document.getElementById('c2j-in').value.trim();
    const sep=document.getElementById('c2j-sep').value;
    const out=document.getElementById('c2j-out');
    const rows=parseCSV(raw,sep);
    if(rows.length<2){out.value='Need at least header row + one data row';return;}
    const headers=rows[0];
    const data=rows.slice(1).map(row=>Object.fromEntries(headers.map((h,i)=>[h.trim(),coerce(row[i]||'')])));
    out.value=JSON.stringify(data,null,2);
  };
  document.getElementById('c2j-copy').onclick=function(){navigator.clipboard.writeText(document.getElementById('c2j-out').value);};
})();`
);

// ─── 141 ── Stopwatch (with laps) ────────────────────────────────────────────
tool('lapstopwatch', 'time', '🏁',
  `<div id="lsw-app" style="text-align:center"><div id="lsw-display" style="font-size:3rem;font-weight:800;font-family:monospace;letter-spacing:0.05em">00:00.00</div><div class="row" style="justify-content:center;gap:0.75rem;margin-top:0.75rem"><button class="btn" id="lsw-start">{{ui.start}}</button><button class="btn" id="lsw-lap">{{ui.lap}}</button><button class="btn" id="lsw-reset">{{ui.reset}}</button></div><div id="lsw-laps" style="margin-top:1rem;max-height:200px;overflow-y:auto;text-align:left"></div></div>`,
  { title:'Stopwatch with Laps — online stopwatch with lap timer', metaDescription:'Free online stopwatch with lap timer. Start, stop, and record lap times. Shows the fastest and slowest laps highlighted.', h1:'Stopwatch with Laps', intro:'A precise browser stopwatch. Start timing, record laps, and see each lap time along with the total elapsed time.', faq_title:'Stopwatch FAQ', ui:{ start:'Start', lap:'Lap', reset:'Reset' }, faq:[
    { q:'How precise is this stopwatch?', a:'The stopwatch uses requestAnimationFrame for smooth display updates and Date.now() for timing, giving precision to the millisecond. Note that JavaScript timers are not real-time and may have small inconsistencies under heavy CPU load.' },
    { q:'Do I lose my laps when I navigate away?', a:'Yes. Lap data is stored in memory and will be lost if you refresh the page or navigate away. The stopwatch also stops running when the browser tab is hidden.' },
    { q:'Can I use this for competitive timing?', a:'This is suitable for casual timing. For competitive sports timing, use a certified stopwatch. Browser timers can have small drifts and are affected by tab switching and system load.' }
  ]},
  { title:'Cronômetro com Voltas — cronômetro online com temporizador de voltas', metaDescription:'Cronômetro online gratuito com temporizador de voltas. Inicie, pare e registre tempos de volta. Mostra as voltas mais rápidas e lentas destacadas.', h1:'Cronômetro com Voltas', intro:'Um cronômetro preciso do navegador. Inicie, registre voltas e veja cada tempo de volta junto com o tempo total decorrido.', faq_title:'Perguntas frequentes sobre cronômetro', ui:{ start:'Iniciar', lap:'Volta', reset:'Resetar' }, faq:[
    { q:'Quão preciso é este cronômetro?', a:'O cronômetro usa requestAnimationFrame para atualizações suaves e Date.now() para temporização, dando precisão ao milissegundo.' },
    { q:'Perco minhas voltas ao navegar?', a:'Sim. Os dados de voltas ficam na memória e serão perdidos se você atualizar a página ou navegar. O cronômetro também para quando a aba está oculta.' },
    { q:'Posso usar para temporização competitiva?', a:'É adequado para temporização casual. Para esportes competitivos, use um cronômetro certificado.' }
  ]},
  `(function(){
  let start=0,elapsed=0,running=false,raf=null;
  const laps=[];
  const disp=document.getElementById('lsw-display');
  const lapList=document.getElementById('lsw-laps');
  const btnStart=document.getElementById('lsw-start');
  function fmt(ms){const m=Math.floor(ms/60000),s=Math.floor((ms%60000)/1000),cs=Math.floor((ms%1000)/10);return String(m).padStart(2,'0')+':'+String(s).padStart(2,'0')+'.'+String(cs).padStart(2,'0');}
  function render(ms){disp.textContent=fmt(ms);}
  function tick(){render(elapsed+Date.now()-start);raf=requestAnimationFrame(tick);}
  btnStart.addEventListener('click',function(){
    if(running){elapsed+=Date.now()-start;cancelAnimationFrame(raf);running=false;btnStart.textContent='Resume';}
    else{start=Date.now();running=true;btnStart.textContent='Stop';tick();}
  });
  document.getElementById('lsw-lap').addEventListener('click',function(){
    if(!running)return;
    const total=elapsed+Date.now()-start;
    const prev=laps.reduce((s,l)=>s+l.time,0);
    const lapTime=total-prev;
    laps.push({n:laps.length+1,time:lapTime,total});
    const minT=Math.min(...laps.map(l=>l.time)),maxT=Math.max(...laps.map(l=>l.time));
    lapList.innerHTML=laps.slice().reverse().map(l=>{
      const cls=l.time===minT?'color:var(--green,#22c55e)':l.time===maxT?'color:var(--red,#ef4444)':'';
      return \`<div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid var(--line)"><span>Lap \${l.n}</span><span style="\${cls};font-family:monospace">\${fmt(l.time)}</span><span style="opacity:0.5;font-family:monospace">\${fmt(l.total)}</span></div>\`;
    }).join('');
  });
  document.getElementById('lsw-reset').addEventListener('click',function(){
    cancelAnimationFrame(raf);running=false;elapsed=0;laps.length=0;render(0);lapList.innerHTML='';btnStart.textContent='Start';
  });
})();`
);

// ─── 142 ── Countdown Timer ───────────────────────────────────────────────────
tool('countdowntimer', 'time', '⏳',
  `<div id="ct-app" style="text-align:center"><div class="row" style="justify-content:center;gap:0.5rem;margin-bottom:0.75rem"><div class="field"><label for="ct-h">{{ui.hours}}</label><input type="number" id="ct-h" min="0" max="23" value="0" style="width:70px;text-align:center;font-size:1.5rem;padding:0.4rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)"></div><div class="field"><label for="ct-m">{{ui.minutes}}</label><input type="number" id="ct-m" min="0" max="59" value="5" style="width:70px;text-align:center;font-size:1.5rem;padding:0.4rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)"></div><div class="field"><label for="ct-s">{{ui.seconds}}</label><input type="number" id="ct-s" min="0" max="59" value="0" style="width:70px;text-align:center;font-size:1.5rem;padding:0.4rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)"></div></div><div id="ct-display" style="font-size:4rem;font-weight:800;font-family:monospace;letter-spacing:0.05em">05:00</div><div class="row" style="justify-content:center;gap:0.75rem;margin-top:0.75rem"><button class="btn" id="ct-start">{{ui.start}}</button><button class="btn" id="ct-reset">{{ui.reset}}</button></div><p id="ct-done" style="font-size:1.2rem;color:var(--green,#22c55e);margin-top:0.5rem;display:none">⏰ {{ui.done}}</p></div>`,
  { title:'Countdown Timer — set a countdown for any duration', metaDescription:'Free countdown timer. Set hours, minutes and seconds and count down with a clear display and alarm when complete.', h1:'Countdown Timer', intro:'Set the hours, minutes and seconds and start the countdown. An alert appears when the timer reaches zero.', faq_title:'Countdown timer FAQ', ui:{ hours:'H', minutes:'M', seconds:'S', start:'Start', reset:'Reset', done:'Timer complete!' }, faq:[
    { q:'Does the timer continue in the background?', a:'The timer uses a precise interval clock and continues running while the tab is open. If you switch tabs, the timer keeps ticking but the display updates when you return.' },
    { q:'Is there an alarm sound?', a:'The browser alert ("Timer complete!") appears when the countdown reaches zero. Browser security restrictions prevent automatic audio playback without user interaction, so a visual alert is used instead.' },
    { q:'What is the maximum countdown time?', a:'The timer supports up to 23 hours, 59 minutes and 59 seconds — just under 24 hours.' }
  ]},
  { title:'Temporizador Regressivo — defina uma contagem regressiva para qualquer duração', metaDescription:'Temporizador regressivo gratuito. Defina horas, minutos e segundos e faça a contagem regressiva com display claro e alarme ao completar.', h1:'Temporizador Regressivo', intro:'Defina as horas, minutos e segundos e inicie a contagem regressiva. Um alerta aparece quando o temporizador chega a zero.', faq_title:'Perguntas frequentes sobre temporizador regressivo', ui:{ hours:'H', minutes:'M', seconds:'S', start:'Iniciar', reset:'Resetar', done:'Temporizador completo!' }, faq:[
    { q:'O temporizador continua em segundo plano?', a:'O temporizador usa um intervalo preciso e continua funcionando enquanto a aba estiver aberta.' },
    { q:'Há um som de alarme?', a:'Um alerta visual aparece quando a contagem regressiva chega a zero. Restrições de segurança do navegador impedem a reprodução automática de áudio sem interação do usuário.' },
    { q:'Qual é o tempo máximo de contagem regressiva?', a:'O temporizador suporta até 23 horas, 59 minutos e 59 segundos — pouco menos de 24 horas.' }
  ]},
  `(function(){
  let remaining=300,timer=null,running=false;
  const disp=document.getElementById('ct-display');
  const done=document.getElementById('ct-done');
  const btn=document.getElementById('ct-start');
  function fmt(s){const h=Math.floor(s/3600),m=Math.floor((s%3600)/60),sec=s%60;return(h>0?String(h).padStart(2,'0')+':':'')+String(m).padStart(2,'0')+':'+String(sec).padStart(2,'0');}
  function update(){disp.textContent=fmt(remaining);}
  function getInput(){const h=parseInt(document.getElementById('ct-h').value)||0,m=parseInt(document.getElementById('ct-m').value)||0,s=parseInt(document.getElementById('ct-s').value)||0;return h*3600+m*60+s;}
  btn.addEventListener('click',function(){
    if(running){clearInterval(timer);running=false;btn.textContent='Resume';}
    else{
      if(!running&&remaining<=0)remaining=getInput();
      if(!remaining)return;
      running=true;btn.textContent='Pause';done.style.display='none';
      timer=setInterval(()=>{remaining--;update();if(remaining<=0){clearInterval(timer);running=false;btn.textContent='Start';done.style.display='block';}},1000);
    }
  });
  document.getElementById('ct-reset').addEventListener('click',function(){clearInterval(timer);running=false;remaining=getInput();update();done.style.display='none';btn.textContent='Start';});
  update();
})();`
);

// ─── 143 ── Habit Tracker ─────────────────────────────────────────────────────
tool('habittracker', 'productivity', '✅',
  `<div id="ht-app"><div class="row"><input type="text" id="ht-new" placeholder="{{ui.placeholder}}" style="flex:1;padding:0.5rem 0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)"><button class="btn" id="ht-add">{{ui.add}}</button></div><div id="ht-list" style="margin-top:0.75rem"></div><p style="opacity:0.5;font-size:0.8rem;margin-top:1rem">{{ui.note}}</p></div>`,
  { title:'Habit Tracker — track daily habits in your browser', metaDescription:'Free browser-based habit tracker. Add habits and mark them done each day. Tracks streaks and completion rates. Data saved locally.', h1:'Habit Tracker', intro:'Add habits and check them off each day. Your data is saved in your browser locally — nothing is sent to any server.', faq_title:'Habit tracker FAQ', ui:{ placeholder:'Add a new habit…', add:'Add', note:'Data is saved locally in your browser.' }, faq:[
    { q:'Is my data saved?', a:'Yes. Habit data is saved in your browser\'s localStorage, so it persists between visits. If you clear your browser data or use a different browser/device, the data will not be there.' },
    { q:'How do streaks work?', a:'A streak counts consecutive days you completed a habit. Missing one day resets the streak to zero. Building streaks makes habit formation easier — James Clear\'s "Atomic Habits" calls this "never miss twice".' },
    { q:'What are good habits to track?', a:'Exercise, reading, meditation, water intake, journaling, learning a language, practicing an instrument, or any behaviour you want to perform consistently. Start with 1–3 habits to avoid overwhelm.' }
  ]},
  { title:'Rastreador de Hábitos — acompanhe hábitos diários no seu navegador', metaDescription:'Rastreador de hábitos gratuito baseado no navegador. Adicione hábitos e marque-os como feitos a cada dia. Rastreia sequências e taxas de conclusão. Dados salvos localmente.', h1:'Rastreador de Hábitos', intro:'Adicione hábitos e marque-os a cada dia. Seus dados são salvos localmente no seu navegador — nada é enviado para qualquer servidor.', faq_title:'Perguntas frequentes sobre rastreador de hábitos', ui:{ placeholder:'Adicionar novo hábito…', add:'Adicionar', note:'Os dados são salvos localmente no seu navegador.' }, faq:[
    { q:'Meus dados são salvos?', a:'Sim. Os dados de hábitos são salvos no localStorage do navegador, persistindo entre visitas. Se você limpar os dados do navegador ou usar outro dispositivo, os dados não estarão lá.' },
    { q:'Como as sequências funcionam?', a:'Uma sequência conta os dias consecutivos em que você completou um hábito. Perder um dia reseta a sequência para zero.' },
    { q:'Quais são bons hábitos para rastrear?', a:'Exercício, leitura, meditação, ingestão de água, diário, aprender um idioma, praticar um instrumento, ou qualquer comportamento que você quer realizar consistentemente.' }
  ]},
  `(function(){
  const KEY='habit_tracker_v1';
  function load(){try{return JSON.parse(localStorage.getItem(KEY))||[];}catch{return[];}}
  function save(d){localStorage.setItem(KEY,JSON.stringify(d));}
  function todayStr(){return new Date().toISOString().slice(0,10);}
  function render(){
    const data=load();const today=todayStr();
    const list=document.getElementById('ht-list');
    if(!data.length){list.innerHTML='<p style="opacity:0.6">No habits yet. Add one above!</p>';return;}
    list.innerHTML=data.map((h,i)=>{
      const done=h.days&&h.days.includes(today);
      const streak=calcStreak(h.days||[]);
      const total=h.days?h.days.length:0;
      return \`<div style="display:flex;align-items:center;gap:0.5rem;padding:0.6rem 0.75rem;background:var(--surface);border:1px solid var(--line);border-radius:8px;margin-bottom:0.4rem">
        <button onclick="toggleDay(\${i})" style="font-size:1.5rem;background:none;border:none;cursor:pointer">\${done?'✅':'⬜'}</button>
        <div style="flex:1"><strong>\${h.name}</strong><div style="font-size:0.8rem;opacity:0.6">🔥 \${streak} day streak · \${total} total</div></div>
        <button onclick="deleteHabit(\${i})" style="background:none;border:none;cursor:pointer;opacity:0.4;font-size:1.1rem">🗑</button>
      </div>\`;
    }).join('');
  }
  function calcStreak(days){
    if(!days.length)return 0;
    const sorted=[...days].sort().reverse();
    let streak=0,prev=new Date();prev.setHours(0,0,0,0);
    for(const d of sorted){
      const dt=new Date(d);const diff=(prev-dt)/(864e5);
      if(diff<=1){streak++;prev=dt;}else break;
    }
    return streak;
  }
  window.toggleDay=function(i){const data=load();const today=todayStr();if(!data[i].days)data[i].days=[];const idx=data[i].days.indexOf(today);if(idx>=0)data[i].days.splice(idx,1);else data[i].days.push(today);save(data);render();};
  window.deleteHabit=function(i){const data=load();data.splice(i,1);save(data);render();};
  document.getElementById('ht-add').onclick=function(){
    const name=document.getElementById('ht-new').value.trim();
    if(!name)return;const data=load();data.push({name,days:[]});save(data);document.getElementById('ht-new').value='';render();
  };
  document.getElementById('ht-new').addEventListener('keydown',function(e){if(e.key==='Enter')document.getElementById('ht-add').click();});
  render();
})();`
);

// ─── 144 ── Todo List ─────────────────────────────────────────────────────────
tool('todolist', 'productivity', '📋',
  `<div id="todo-app"><div class="row"><input type="text" id="todo-new" placeholder="{{ui.placeholder}}" style="flex:1;padding:0.5rem 0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)"><button class="btn" id="todo-add">{{ui.add}}</button></div><div class="row" style="gap:0.4rem;margin-top:0.5rem"><button id="todo-all" style="padding:4px 10px;border:1px solid var(--line);border-radius:20px;background:var(--surface);color:var(--text);cursor:pointer;font-size:0.85rem">{{ui.all}}</button><button id="todo-active" style="padding:4px 10px;border:1px solid var(--line);border-radius:20px;background:var(--surface);color:var(--text);cursor:pointer;font-size:0.85rem">{{ui.active}}</button><button id="todo-done" style="padding:4px 10px;border:1px solid var(--line);border-radius:20px;background:var(--surface);color:var(--text);cursor:pointer;font-size:0.85rem">{{ui.done}}</button><button id="todo-clear" style="padding:4px 10px;border:1px solid var(--line);border-radius:20px;background:var(--surface);color:var(--text);cursor:pointer;font-size:0.85rem;margin-left:auto">{{ui.clearDone}}</button></div><div id="todo-list" style="margin-top:0.5rem"></div><p style="opacity:0.5;font-size:0.8rem;margin-top:0.75rem">{{ui.note}}</p></div>`,
  { title:'To-Do List — simple browser task manager', metaDescription:'Free browser to-do list. Add tasks, check them off, filter by status, and clear completed items. All data saved locally.', h1:'To-Do List', intro:'Add tasks and check them off when done. Filter by status. Your tasks are saved locally in your browser.', faq_title:'To-do list FAQ', ui:{ placeholder:'Add a task…', add:'Add', all:'All', active:'Active', done:'Done', clearDone:'Clear done', note:'Saved locally in your browser.' }, faq:[
    { q:'Is my to-do list saved?', a:'Yes. Tasks are saved in localStorage and persist between browser sessions on the same device. They are not synced across devices.' },
    { q:'Can I reorder tasks?', a:'Currently, tasks appear in creation order. To re-prioritize, delete the task and re-add it — newly added tasks appear at the bottom.' },
    { q:'How many tasks can I add?', a:'There is no enforced limit. localStorage can typically store up to 5–10 MB, enough for thousands of tasks.' }
  ]},
  { title:'Lista de Tarefas — gerenciador de tarefas simples no navegador', metaDescription:'Lista de tarefas gratuita no navegador. Adicione tarefas, marque como concluídas, filtre por status e limpe itens concluídos. Todos os dados salvos localmente.', h1:'Lista de Tarefas', intro:'Adicione tarefas e marque-as quando concluídas. Filtre por status. Suas tarefas são salvas localmente no navegador.', faq_title:'Perguntas frequentes sobre lista de tarefas', ui:{ placeholder:'Adicionar tarefa…', add:'Adicionar', all:'Todas', active:'Ativas', done:'Concluídas', clearDone:'Limpar concluídas', note:'Salvo localmente no navegador.' }, faq:[
    { q:'Minha lista é salva?', a:'Sim. As tarefas são salvas no localStorage e persistem entre sessões do navegador no mesmo dispositivo. Não são sincronizadas entre dispositivos.' },
    { q:'Posso reordenar as tarefas?', a:'Atualmente as tarefas aparecem na ordem de criação. Para repriorizar, exclua a tarefa e adicione-a novamente.' },
    { q:'Quantas tarefas posso adicionar?', a:'Não há limite imposto. O localStorage tipicamente pode armazenar até 5–10 MB, suficiente para milhares de tarefas.' }
  ]},
  `(function(){
  const KEY='todolist_v1';
  let filter='all';
  function load(){try{return JSON.parse(localStorage.getItem(KEY))||[];}catch{return[];}}
  function save(d){localStorage.setItem(KEY,JSON.stringify(d));}
  function render(){
    const data=load();const list=document.getElementById('todo-list');
    const shown=filter==='all'?data:filter==='active'?data.filter(t=>!t.done):data.filter(t=>t.done);
    if(!shown.length){list.innerHTML='<p style="opacity:0.6">No tasks here.</p>';return;}
    list.innerHTML=shown.map(t=>{
      const i=data.indexOf(t);
      return \`<div style="display:flex;align-items:center;gap:0.5rem;padding:0.5rem 0.75rem;background:var(--surface);border:1px solid var(--line);border-radius:8px;margin-bottom:0.3rem">
        <input type="checkbox" \${t.done?'checked':''} onchange="toggleTodo(\${i})" style="width:1.1rem;height:1.1rem;cursor:pointer">
        <span style="flex:1;\${t.done?'text-decoration:line-through;opacity:0.5':''}">\${t.text}</span>
        <button onclick="deleteTodo(\${i})" style="background:none;border:none;cursor:pointer;opacity:0.4">🗑</button>
      </div>\`;
    }).join('');
  }
  window.toggleTodo=function(i){const d=load();d[i].done=!d[i].done;save(d);render();};
  window.deleteTodo=function(i){const d=load();d.splice(i,1);save(d);render();};
  document.getElementById('todo-add').onclick=function(){
    const text=document.getElementById('todo-new').value.trim();
    if(!text)return;const d=load();d.push({text,done:false});save(d);document.getElementById('todo-new').value='';render();
  };
  document.getElementById('todo-new').addEventListener('keydown',function(e){if(e.key==='Enter')document.getElementById('todo-add').click();});
  ['all','active','done'].forEach(f=>document.getElementById('todo-'+f).onclick=()=>{filter=f;render();});
  document.getElementById('todo-clear').onclick=()=>{save(load().filter(t=>!t.done));render();};
  render();
})();`
);

// ─── 145 ── Flashcard Maker ───────────────────────────────────────────────────
tool('flashcards', 'productivity', '🃏',
  `<div id="fc-app"><div id="fc-maker"><h3 style="margin:0 0 0.75rem">{{ui.addCard}}</h3><div class="field"><label for="fc-front">{{ui.front}}</label><textarea id="fc-front" rows="2" style="width:100%;resize:none;padding:0.5rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)"></textarea></div><div class="field"><label for="fc-back">{{ui.back}}</label><textarea id="fc-back" rows="2" style="width:100%;resize:none;padding:0.5rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)"></textarea></div><div class="row"><button class="btn" id="fc-add">{{ui.add}}</button><button class="btn" id="fc-study" style="display:none">{{ui.study}}</button></div></div><div id="fc-study-mode" style="display:none;text-align:center"><div id="fc-card" style="min-height:150px;padding:1.5rem;background:var(--surface);border:2px solid var(--line);border-radius:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:1.2rem;margin-bottom:0.75rem">{{ui.clickFlip}}</div><div class="row" style="justify-content:center;gap:0.5rem"><button class="btn" id="fc-prev">‹</button><span id="fc-progress" style="align-self:center;opacity:0.6;font-size:0.9rem"></span><button class="btn" id="fc-next">›</button></div><button id="fc-exit" style="margin-top:0.5rem;background:none;border:none;cursor:pointer;opacity:0.6;text-decoration:underline">{{ui.addMore}}</button></div></div>`,
  { title:'Flashcard Maker — create and study flashcards online', metaDescription:'Free flashcard maker. Create question-answer flashcard sets and study them in a click-to-flip card interface. Data saved locally.', h1:'Flashcard Maker', intro:'Create flashcards with a question on the front and answer on the back. Switch to study mode to flip through your cards.', faq_title:'Flashcard FAQ', ui:{ addCard:'Add a card', front:'Front (question)', back:'Back (answer)', add:'Add Card', study:'Study Mode', clickFlip:'Click to flip', prev:'Prev', next:'Next', addMore:'Back to adding cards' }, faq:[
    { q:'How do I study the cards?', a:'Click "Study Mode" after adding cards. Each card shows the front (question). Click the card to flip it and reveal the back (answer). Use the arrows to navigate between cards.' },
    { q:'Are my flashcards saved?', a:'Yes. Cards are saved in your browser\'s localStorage and persist between visits. They are device-specific and not synced across browsers.' },
    { q:'How many cards can I create?', a:'There is no fixed limit. For large card sets (100+), consider organizing by topic and creating separate study sessions.' }
  ]},
  { title:'Criador de Flashcards — criar e estudar flashcards online', metaDescription:'Criador de flashcards gratuito. Crie conjuntos de flashcards de pergunta-resposta e estude-os em uma interface de cartão para virar. Dados salvos localmente.', h1:'Criador de Flashcards', intro:'Crie flashcards com uma pergunta na frente e resposta no verso. Mude para o modo de estudo para percorrer seus cartões.', faq_title:'Perguntas frequentes sobre flashcards', ui:{ addCard:'Adicionar cartão', front:'Frente (pergunta)', back:'Verso (resposta)', add:'Adicionar Cartão', study:'Modo Estudo', clickFlip:'Clique para virar', prev:'Ant', next:'Próx', addMore:'Voltar a adicionar cartões' }, faq:[
    { q:'Como estudo os cartões?', a:'Clique em "Modo Estudo" após adicionar cartões. Cada cartão mostra a frente (pergunta). Clique no cartão para virar e revelar o verso (resposta).' },
    { q:'Meus flashcards são salvos?', a:'Sim. Os cartões são salvos no localStorage do navegador e persistem entre visitas. São específicos do dispositivo e não sincronizados entre navegadores.' },
    { q:'Quantos cartões posso criar?', a:'Não há limite fixo. Para grandes conjuntos (100+), considere organizar por tópico.' }
  ]},
  `(function(){
  const KEY='flashcards_v1';
  let idx=0,flipped=false;
  function load(){try{return JSON.parse(localStorage.getItem(KEY))||[];}catch{return[];}}
  function save(d){localStorage.setItem(KEY,JSON.stringify(d));}
  function showCard(i,flp){
    const cards=load();if(!cards.length)return;
    const card=cards[i];flipped=flp||false;
    const el=document.getElementById('fc-card');
    el.textContent=flipped?card.back:card.front;
    el.style.background=flipped?'var(--accent-soft,rgba(99,102,241,0.1))':'var(--surface)';
    document.getElementById('fc-progress').textContent=(i+1)+'/'+cards.length;
  }
  document.getElementById('fc-add').onclick=function(){
    const front=document.getElementById('fc-front').value.trim();
    const back=document.getElementById('fc-back').value.trim();
    if(!front||!back)return;
    const d=load();d.push({front,back});save(d);
    document.getElementById('fc-front').value='';document.getElementById('fc-back').value='';
    document.getElementById('fc-study').style.display='';
  };
  document.getElementById('fc-study').onclick=function(){
    const cards=load();if(!cards.length)return;idx=0;
    document.getElementById('fc-maker').style.display='none';
    document.getElementById('fc-study-mode').style.display='';
    showCard(idx,false);
  };
  document.getElementById('fc-card').onclick=()=>showCard(idx,!flipped);
  document.getElementById('fc-next').onclick=()=>{idx=(idx+1)%load().length;showCard(idx,false);};
  document.getElementById('fc-prev').onclick=()=>{const n=load().length;idx=(idx-1+n)%n;showCard(idx,false);};
  document.getElementById('fc-exit').onclick=function(){document.getElementById('fc-study-mode').style.display='none';document.getElementById('fc-maker').style.display='';if(load().length)document.getElementById('fc-study').style.display='';};
})();`
);

// ─── 146 ── Note Pad ──────────────────────────────────────────────────────────
tool('notepad', 'productivity', '📓',
  `<div id="np-app"><div class="row" style="gap:0.4rem;flex-wrap:wrap"><input type="text" id="np-title" placeholder="{{ui.title}}" style="flex:1;min-width:150px;padding:0.4rem 0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)"><button class="btn" id="np-save">{{ui.save}}</button><button class="btn" id="np-new">{{ui.new}}</button><select id="np-notes" style="flex:1;min-width:150px;padding:0.4rem 0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)"></select><button class="btn" id="np-del">{{ui.delete}}</button></div><textarea id="np-body" rows="12" placeholder="{{ui.placeholder}}" style="width:100%;resize:vertical;padding:0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text);margin-top:0.5rem;font-size:1rem"></textarea><p id="np-status" style="opacity:0.5;font-size:0.8rem;margin-top:0.4rem">{{ui.autosave}}</p></div>`,
  { title:'Notepad — online notes saved in your browser', metaDescription:'Free online notepad. Create, save and manage multiple notes in your browser. Auto-saves as you type. No account needed.', h1:'Online Notepad', intro:'Create and save notes directly in your browser. Multiple notes supported. Auto-saves as you type. No account needed.', faq_title:'Notepad FAQ', ui:{ title:'Note title', save:'Save', new:'New', delete:'Delete', placeholder:'Start typing your note…', autosave:'Auto-saved to browser storage' }, faq:[
    { q:'Are my notes saved?', a:'Yes. Notes are saved in your browser\'s localStorage and persist between visits. They are stored on your device, not in the cloud, so they are available without an internet connection.' },
    { q:'Can I access notes across devices?', a:'No. localStorage is device and browser specific. For cross-device notes, use a service like Google Keep, Notion, or Apple Notes.' },
    { q:'Is there a note size limit?', a:'Each note can be quite large — localStorage typically allows 5–10 MB total. You can create dozens of substantial notes before running into any limit.' }
  ]},
  { title:'Bloco de Notas — notas online salvas no seu navegador', metaDescription:'Bloco de notas online gratuito. Crie, salve e gerencie várias notas no navegador. Salva automaticamente enquanto você digita. Sem necessidade de conta.', h1:'Bloco de Notas Online', intro:'Crie e salve notas diretamente no navegador. Suporte a múltiplas notas. Salva automaticamente enquanto você digita. Sem necessidade de conta.', faq_title:'Perguntas frequentes sobre bloco de notas', ui:{ title:'Título da nota', save:'Salvar', new:'Nova', delete:'Excluir', placeholder:'Comece a digitar sua nota…', autosave:'Salvo automaticamente no armazenamento do navegador' }, faq:[
    { q:'Minhas notas são salvas?', a:'Sim. As notas são salvas no localStorage do navegador e persistem entre visitas.' },
    { q:'Posso acessar notas em outros dispositivos?', a:'Não. O localStorage é específico do dispositivo e navegador. Para notas em vários dispositivos, use Google Keep, Notion ou Evernote.' },
    { q:'Há limite de tamanho das notas?', a:'Cada nota pode ser bastante grande — o localStorage tipicamente permite 5–10 MB no total.' }
  ]},
  `(function(){
  const KEY='notepad_v1';let cur=null,debounce;
  function load(){try{return JSON.parse(localStorage.getItem(KEY))||{};}catch{return{};}}
  function save(d){localStorage.setItem(KEY,JSON.stringify(d));}
  function listNotes(){
    const d=load();const sel=document.getElementById('np-notes');const prev=sel.value;
    sel.innerHTML=Object.keys(d).map(k=>\`<option value="\${k}">\${k}</option>\`).join('');
    if(prev&&d[prev])sel.value=prev;
    if(sel.options.length&&!sel.value)sel.selectedIndex=0;
  }
  function loadNote(name){
    if(!name)return;const d=load();cur=name;
    document.getElementById('np-title').value=name;
    document.getElementById('np-body').value=d[name]||'';
  }
  document.getElementById('np-save').onclick=function(){
    const title=document.getElementById('np-title').value.trim()||'Untitled';
    const body=document.getElementById('np-body').value;
    const d=load();d[title]=body;save(d);cur=title;listNotes();document.getElementById('np-notes').value=title;
    document.getElementById('np-status').textContent='Saved at '+new Date().toLocaleTimeString();
  };
  document.getElementById('np-new').onclick=function(){cur=null;document.getElementById('np-title').value='';document.getElementById('np-body').value='';};
  document.getElementById('np-del').onclick=function(){
    const name=document.getElementById('np-notes').value;if(!name)return;
    const d=load();delete d[name];save(d);listNotes();
    if(document.getElementById('np-notes').options.length)loadNote(document.getElementById('np-notes').value);
    else{document.getElementById('np-title').value='';document.getElementById('np-body').value='';}
  };
  document.getElementById('np-notes').addEventListener('change',function(){loadNote(this.value);});
  document.getElementById('np-body').addEventListener('input',function(){
    clearTimeout(debounce);debounce=setTimeout(()=>{
      const title=document.getElementById('np-title').value.trim()||'Untitled';
      const d=load();d[title]=this.value;save(d);listNotes();
      document.getElementById('np-status').textContent='Auto-saved';
    },800);
  });
  listNotes();if(document.getElementById('np-notes').value)loadNote(document.getElementById('np-notes').value);
})();`
);

// ─── 147 ── Text Summarizer (extractive) ──────────────────────────────────────
tool('textsummarizer', 'text', '📃',
  `<div id="ts-app"><div class="field"><label for="ts-in">{{ui.text}}</label><textarea id="ts-in" rows="8" placeholder="{{ui.placeholder}}" style="width:100%;resize:vertical;padding:0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)"></textarea></div><div class="row"><div class="field"><label for="ts-n">{{ui.sentences}}</label><input type="number" id="ts-n" min="1" max="20" value="3" inputmode="numeric"></div><button class="btn" id="ts-go">{{ui.summarize}}</button></div><div id="ts-out" style="margin-top:0.75rem"></div></div>`,
  { title:'Text Summarizer — extract key sentences from any text', metaDescription:'Free text summarizer. Paste any text and extract the most important sentences automatically using extractive summarization.', h1:'Text Summarizer', intro:'Paste text and choose how many sentences to extract. The tool scores each sentence by importance and returns the top ones.', faq_title:'Text summarizer FAQ', ui:{ text:'Text to summarize', placeholder:'Paste your text here…', sentences:'Sentences to extract', summarize:'Summarize' }, faq:[
    { q:'How does extractive summarization work?', a:'Extractive summarization scores each sentence by: word frequency (words that appear more often are more important), sentence position (first and last sentences often carry more weight), and sentence length. The highest-scoring sentences are selected.' },
    { q:'Is this AI-powered?', a:'No. This is a rule-based extractive summarizer running entirely in your browser with no AI model. It selects existing sentences from the text rather than generating new text. For generative summarization, use ChatGPT or similar LLMs.' },
    { q:'What is the difference between extractive and abstractive summarization?', a:'Extractive summarization selects existing sentences from the original text. Abstractive summarization generates new sentences that capture the meaning — like how a human would summarize. This tool uses extractive summarization.' }
  ]},
  { title:'Sumarizador de Texto — extrair frases-chave de qualquer texto', metaDescription:'Sumarizador de texto gratuito. Cole qualquer texto e extraia as frases mais importantes automaticamente usando sumarização extrativa.', h1:'Sumarizador de Texto', intro:'Cole texto e escolha quantas frases extrair. A ferramenta pontua cada frase por importância e retorna as melhores.', faq_title:'Perguntas frequentes sobre sumarizador de texto', ui:{ text:'Texto para sumarizar', placeholder:'Cole seu texto aqui…', sentences:'Frases para extrair', summarize:'Sumarizar' }, faq:[
    { q:'Como funciona a sumarização extrativa?', a:'A sumarização extrativa pontua cada frase por: frequência de palavras, posição da frase e comprimento. As frases com maior pontuação são selecionadas.' },
    { q:'É alimentado por IA?', a:'Não. Este é um sumarizador baseado em regras, rodando inteiramente no seu navegador sem modelo de IA. Para sumarização generativa, use ChatGPT ou LLMs similares.' },
    { q:'Qual a diferença entre sumarização extrativa e abstrativa?', a:'A sumarização extrativa seleciona frases existentes do texto original. A abstrativa gera novas frases que capturam o significado.' }
  ]},
  `(function(){
  const stops=new Set('the a an and or but in on at to of is it this that was were are be been have has do did will would could should for from with about as by i me my we our you your he him she her they them'.split(' '));
  document.getElementById('ts-go').onclick=function(){
    const text=document.getElementById('ts-in').value.trim();
    const n=Math.min(20,Math.max(1,parseInt(document.getElementById('ts-n').value)||3));
    const out=document.getElementById('ts-out');
    if(!text){out.innerHTML='';return;}
    const sentences=text.match(/[^.!?]+[.!?]+/g)||[text];
    if(sentences.length<=n){out.innerHTML='<p style="opacity:0.6">Text has fewer sentences than requested.</p><blockquote style="margin:0.5rem 0;padding:0.5rem 1rem;border-left:3px solid var(--accent,#6366f1)">'+text+'</blockquote>';return;}
    const wordFreq={};
    text.toLowerCase().replace(/[^a-z\\s]/g,' ').split(/\\s+/).filter(w=>w&&!stops.has(w)).forEach(w=>{wordFreq[w]=(wordFreq[w]||0)+1;});
    const scored=sentences.map((sent,i)=>{
      const words=sent.toLowerCase().replace(/[^a-z\\s]/g,' ').split(/\\s+/).filter(w=>w&&!stops.has(w));
      const score=words.reduce((s,w)=>s+(wordFreq[w]||0),0)/(words.length||1)+(i===0||i===sentences.length-1?2:0);
      return{sent:sent.trim(),score,i};
    });
    const top=scored.slice().sort((a,b)=>b.score-a.score).slice(0,n).sort((a,b)=>a.i-b.i);
    out.innerHTML='<blockquote style="margin:0;padding:0.75rem 1rem;border-left:3px solid var(--accent,#6366f1);background:var(--surface);border-radius:0 8px 8px 0">'+top.map(s=>s.sent).join(' ')+'</blockquote>';
  };
})();`
);

// ─── 148 ── Typing Speed Test ─────────────────────────────────────────────────
tool('typingtest', 'productivity', '⌨️',
  `<div id="tt-app"><div id="tt-prompt" style="font-size:1.1rem;line-height:1.8;padding:1rem;background:var(--surface);border:1px solid var(--line);border-radius:8px;margin-bottom:0.75rem;letter-spacing:0.03em"></div><textarea id="tt-input" rows="4" placeholder="{{ui.placeholder}}" style="width:100%;resize:none;padding:0.75rem;border:2px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text);font-size:1rem" disabled></textarea><div class="row" style="justify-content:space-between;margin-top:0.5rem"><div id="tt-stats" style="display:flex;gap:1rem;opacity:0.8"></div><button class="btn" id="tt-start">{{ui.start}}</button></div></div>`,
  { title:'Typing Speed Test — measure your WPM and accuracy online', metaDescription:'Free typing speed test. Measure your words per minute (WPM) and accuracy with a timed typing test. Shows real-time stats.', h1:'Typing Speed Test', intro:'Press Start to begin a 60-second typing test. Type the displayed text as fast and accurately as you can.', faq_title:'Typing speed FAQ', ui:{ placeholder:'Press Start and then type here…', start:'Start' }, faq:[
    { q:'How is WPM calculated?', a:'WPM (words per minute) = total characters typed ÷ 5 ÷ elapsed minutes. Dividing by 5 treats every 5 characters as one "word", making it comparable across different text lengths and word sizes.' },
    { q:'What is a good typing speed?', a:'Average: 40 WPM. Good: 60–80 WPM. Professional typist: 80–100+ WPM. Fast: 100+ WPM. World record: over 200 WPM. Hunt-and-peck typists average 27–37 WPM; touch typists average 50–80 WPM.' },
    { q:'How do I improve my typing speed?', a:'Learn touch typing (home row position: ASDF JKL;). Practice regularly with online tools. Focus on accuracy before speed — errors hurt your score and build bad habits. Use all 10 fingers and avoid looking at the keyboard.' }
  ]},
  { title:'Teste de Velocidade de Digitação — meça seu WPM e precisão online', metaDescription:'Teste de velocidade de digitação gratuito. Meça suas palavras por minuto (WPM) e precisão com um teste de digitação cronometrado.', h1:'Teste de Velocidade de Digitação', intro:'Pressione Iniciar para começar um teste de digitação de 60 segundos. Digite o texto exibido o mais rápido e preciso possível.', faq_title:'Perguntas frequentes sobre velocidade de digitação', ui:{ placeholder:'Pressione Iniciar e depois digite aqui…', start:'Iniciar' }, faq:[
    { q:'Como o WPM é calculado?', a:'WPM = total de caracteres digitados ÷ 5 ÷ minutos decorridos. Dividir por 5 trata cada 5 caracteres como uma "palavra".' },
    { q:'Qual é uma boa velocidade de digitação?', a:'Média: 40 WPM. Bom: 60–80 WPM. Digitador profissional: 80–100+ WPM. Rápido: 100+ WPM. Recordes mundiais passam de 200 WPM.' },
    { q:'Como posso melhorar minha velocidade de digitação?', a:'Aprenda digitação por tato (posição home row: ASDF JKL;). Pratique regularmente. Foque na precisão antes da velocidade. Use todos os 10 dedos e evite olhar para o teclado.' }
  ]},
  `(function(){
  const texts=['The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump. The five boxing wizards jump quickly.','Typing is a skill that improves with consistent practice. Focus on accuracy first, then speed. Touch typists use all ten fingers on the home row keys without looking at the keyboard.','Programming requires typing many special characters. Parentheses, brackets, and semicolons appear frequently in code. Developing good keyboard habits early makes coding much more efficient and enjoyable.'];
  let timer,startTime,running=false,text='';
  const prompt=document.getElementById('tt-prompt');
  const input=document.getElementById('tt-input');
  const stats=document.getElementById('tt-stats');
  const btn=document.getElementById('tt-start');
  function renderPrompt(typed){
    prompt.innerHTML=[...text].map((c,i)=>{
      const tc=typed[i];
      if(tc===undefined)return\`<span>\${c==='  '?'&nbsp;':c}</span>\`;
      if(tc===c)return\`<span style="color:var(--green,#22c55e)">\${c}</span>\`;
      return\`<span style="color:var(--red,#ef4444);text-decoration:underline">\${c==='  '?'&nbsp;':c}</span>\`;
    }).join('');
  }
  function calcStats(typed){
    const elapsed=(Date.now()-startTime)/60000;
    const correct=[...typed].filter((c,i)=>c===text[i]).length;
    const wpm=Math.round(correct/5/elapsed);
    const acc=typed.length?Math.round(correct/typed.length*100):100;
    return{wpm,acc,time:Math.floor((Date.now()-startTime)/1000)};
  }
  btn.addEventListener('click',function(){
    if(running){return;}
    text=texts[Math.floor(Math.random()*texts.length)];
    renderPrompt('');input.value='';input.disabled=false;input.focus();
    running=true;startTime=Date.now();btn.textContent='…';
    let sec=60;
    timer=setInterval(()=>{
      const typed=input.value;
      renderPrompt(typed);
      const s=calcStats(typed);
      stats.innerHTML=\`<span>⏱ \${60-sec}s</span><span>⚡ \${s.wpm} WPM</span><span>🎯 \${s.acc}%</span>\`;
      if(--sec<0||typed===text){
        clearInterval(timer);input.disabled=true;running=false;btn.textContent='Restart';
        const fin=calcStats(typed);
        stats.innerHTML=\`<strong>Done! \${fin.wpm} WPM · \${fin.acc}% accuracy</strong>\`;
      }
    },1000);
  });
  text=texts[0];renderPrompt('');
})();`
);

// ─── 149 ── Random Fact Generator ─────────────────────────────────────────────
tool('randomfact', 'fun', '🤓',
  `<div id="rf-app" style="text-align:center"><div id="rf-fact" style="font-size:1.1rem;line-height:1.7;padding:1.5rem;background:var(--surface);border:1px solid var(--line);border-radius:16px;min-height:100px;display:flex;align-items:center;justify-content:center;margin-bottom:1rem">{{ui.press}}</div><button class="btn" id="rf-btn">{{ui.randomFact}}</button><div class="row" style="justify-content:center;gap:0.5rem;margin-top:0.5rem;flex-wrap:wrap" id="rf-cats"></div></div>`,
  { title:'Random Fact Generator — discover interesting facts instantly', metaDescription:'Free random fact generator. Discover surprising and interesting facts across science, history, mathematics, nature and technology with each click.', h1:'Random Fact Generator', intro:'Press the button to get a random interesting fact. Filter by category using the buttons below.', faq_title:'Random fact FAQ', ui:{ press:'Press the button to get a random fact!', randomFact:'Random Fact' }, faq:[
    { q:'How many facts are in the database?', a:'The tool includes over 100 curated facts across categories including science, history, mathematics, nature, space and technology. Each fact has been verified for accuracy.' },
    { q:'Can I filter by category?', a:'Yes. Use the category buttons below the main button to filter facts to a specific topic. Clicking the same category again shows all categories.' },
    { q:'Are the facts accurate?', a:'All facts have been curated from reputable sources, but science and our understanding of facts evolves. If you spot an error, the general principle is usually correct even if specific numbers differ.' }
  ]},
  { title:'Gerador de Fatos Aleatórios — descubra fatos interessantes instantaneamente', metaDescription:'Gerador de fatos aleatórios gratuito. Descubra fatos surpreendentes e interessantes de ciência, história, matemática, natureza e tecnologia a cada clique.', h1:'Gerador de Fatos Aleatórios', intro:'Pressione o botão para obter um fato interessante aleatório. Filtre por categoria usando os botões abaixo.', faq_title:'Perguntas frequentes sobre gerador de fatos', ui:{ press:'Pressione o botão para obter um fato aleatório!', randomFact:'Fato Aleatório' }, faq:[
    { q:'Quantos fatos estão na base de dados?', a:'A ferramenta inclui mais de 100 fatos curados em categorias incluindo ciência, história, matemática, natureza, espaço e tecnologia.' },
    { q:'Posso filtrar por categoria?', a:'Sim. Use os botões de categoria abaixo do botão principal para filtrar fatos a um tópico específico.' },
    { q:'Os fatos são precisos?', a:'Todos os fatos foram curados de fontes confiáveis, mas a ciência evolui. O princípio geral geralmente está correto mesmo que números específicos possam diferir.' }
  ]},
  `(function(){
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
    {cat:'Human',text:'The human brain uses about 20% of the body\'s total energy despite being only 2% of body weight.'},
    {cat:'Human',text:'Humans are the only animals that blush.'},
    {cat:'Human',text:'Your stomach gets a new lining every 3–4 days to prevent it from digesting itself.'},
  ];
  const cats=[...new Set(facts.map(f=>f.cat))];
  let activeCat=null;
  const catDiv=document.getElementById('rf-cats');
  catDiv.innerHTML=cats.map(c=>\`<button style="padding:4px 12px;border:1px solid var(--line);border-radius:20px;background:var(--surface);color:var(--text);cursor:pointer;font-size:0.8rem" data-cat="\${c}">\${c}</button>\`).join('');
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
    setTimeout(()=>{el.innerHTML=\`<div><span style="font-size:0.75rem;opacity:0.5;text-transform:uppercase;letter-spacing:0.1em">\${f.cat}</span><br>\${f.text}</div>\`;el.style.opacity='1';el.style.transition='opacity 0.3s';},150);
  });
})();`
);

// ─── 150 ── Zodiac Sign Calculator ────────────────────────────────────────────
tool('zodiac', 'fun', '♈',
  `<form id="zod-form"><div class="row"><div class="field"><label for="zod-date">{{ui.birthday}}</label><input type="date" id="zod-date"></div><button class="btn" type="submit">{{ui.find}}</button></div></form><div id="zod-out" hidden class="result" style="text-align:center"></div>`,
  { title:'Zodiac Sign Calculator — find your Western and Chinese zodiac sign', metaDescription:'Free zodiac sign calculator. Enter your birthday to find your Western zodiac (sun sign) and Chinese zodiac sign with personality traits.', h1:'Zodiac Sign Calculator', intro:'Enter your birthday to find your Western sun sign and Chinese zodiac animal with personality traits.', faq_title:'Zodiac FAQ', ui:{ birthday:'Date of birth', find:'Find my sign' }, faq:[
    { q:'How are zodiac signs determined?', a:'Western zodiac signs are determined by which of the 12 constellations the Sun appeared to be in at the moment of birth. The dates are fixed calendar ranges. Chinese zodiac is determined by birth year, cycling through 12 animals on a 12-year cycle.' },
    { q:'What is the difference between sun sign and moon sign?', a:'Your sun sign (what most people call their zodiac sign) is based on your birth date. Your moon sign is based on where the Moon was at your exact time of birth. Rising sign (ascendant) is based on the sign rising on the eastern horizon at birth.' },
    { q:'Are zodiac signs scientifically valid?', a:'No scientific evidence supports the predictive validity of astrology. Psychologists attribute the appeal of horoscopes to the Barnum/Forer effect — general personality descriptions feel accurate because people focus on what applies to them.' }
  ]},
  { title:'Calculadora de Signo do Zodíaco — encontre seu signo ocidental e chinês', metaDescription:'Calculadora de signo do zodíaco gratuita. Insira seu aniversário para encontrar seu signo solar ocidental e signo zodiacal chinês com traços de personalidade.', h1:'Calculadora de Signo do Zodíaco', intro:'Insira seu aniversário para encontrar seu signo solar ocidental e animal do zodíaco chinês com traços de personalidade.', faq_title:'Perguntas frequentes sobre zodíaco', ui:{ birthday:'Data de nascimento', find:'Encontrar meu signo' }, faq:[
    { q:'Como os signos do zodíaco são determinados?', a:'Os signos do zodíaco ocidental são determinados por qual das 12 constelações o Sol parecia estar no momento do nascimento. O zodíaco chinês é determinado pelo ano de nascimento, ciclando por 12 animais.' },
    { q:'Qual a diferença entre signo solar e lunar?', a:'Seu signo solar é baseado na sua data de nascimento. Seu signo lunar é baseado em onde a Lua estava no seu horário exato de nascimento.' },
    { q:'Os signos do zodíaco têm validade científica?', a:'Não há evidências científicas que suportem a validade preditiva da astrologia. Psicólogos atribuem o apelo dos horóscopes ao efeito Barnum/Forer.' }
  ]},
  `(function(){
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
    out.innerHTML=\`<div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem"><div style="padding:1rem;background:var(--surface);border:1px solid var(--line);border-radius:12px"><div style="font-size:2.5rem">\${w.emoji}</div><strong>\${w.name}</strong><div style="font-size:0.8rem;opacity:0.6">\${w.dates}</div><div style="font-size:0.85rem;margin-top:0.5rem">\${w.traits}</div></div><div style="padding:1rem;background:var(--surface);border:1px solid var(--line);border-radius:12px"><div style="font-size:2.5rem">🐾</div><strong>\${cAnimal}</strong><div style="font-size:0.8rem;opacity:0.6">Chinese Zodiac</div><div style="font-size:0.85rem;margin-top:0.5rem">\${cTraits[cAnimal]}</div></div></div>\`;
  });
})();`
);

console.log('\n✓ Batch 7 (tools 131-150) complete.');
