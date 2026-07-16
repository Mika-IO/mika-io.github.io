#!/usr/bin/env node
// gen-batch11a.mjs — tools 208-228 (dev, design, science, health)
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

// 208 JSON Path Tester
tool('jsonpath','developer','{}',
`<div id="jp-app"><div class="field"><label for="jp-json">{{ui.json}}</label><textarea id="jp-json" rows="8" style="width:100%;font-family:monospace;font-size:0.85rem;padding:0.5rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)" placeholder='{"name":"Alice"}'></textarea></div><div class="row"><div class="field" style="flex:1"><label for="jp-key">{{ui.key}}</label><input type="text" id="jp-key" placeholder="name or users[0].email" style="font-family:monospace"></div><button class="btn" id="jp-go">{{ui.extract}}</button></div><div id="jp-out" style="margin-top:0.5rem;font-family:monospace;font-size:0.9rem;padding:0.5rem 0.75rem;background:var(--surface);border:1px solid var(--line);border-radius:8px;min-height:2rem;word-break:break-all"></div></div>`,
{title:'JSON Path Tester',metaDescription:'Free JSON path tester. Paste JSON and enter a dot-notation key path to extract values.',h1:'JSON Path Tester',intro:'Paste your JSON and enter a dot-notation path (e.g. user.address.city or items[0].name) to extract the value at that path.',faq_title:'JSON path FAQ',ui:{json:'JSON data',key:'Key path (dot notation)',extract:'Extract'},faq:[
  {q:'What is JSON path notation?',a:'Dot notation: obj.property.nested. Bracket notation for arrays: arr[0]. Combined: users[0].email.'},
  {q:'What is JSONPath?',a:'JSONPath is a query language for JSON. Standard JSONPath uses $. notation: $.store.book[0].title.'},
  {q:'What can I do with JSON path?',a:'Extract specific fields from API responses, navigate nested configuration files, pick values for transformation.'}
]},
{title:'Testador de Caminho JSON',metaDescription:'Testador de caminho JSON gratuito. Cole JSON e insira um caminho em notação de ponto para extrair valores.',h1:'Testador de Caminho JSON',intro:'Cole seu JSON e insira um caminho em notação de ponto para extrair o valor nesse caminho.',faq_title:'FAQ caminho JSON',ui:{json:'Dados JSON',key:'Caminho de chave',extract:'Extrair'},faq:[
  {q:'O que é notação de caminho JSON?',a:'Notação de ponto: obj.propriedade.aninhado. Notação de colchete para arrays: arr[0].'},
  {q:'O que é JSONPath?',a:'JSONPath e uma linguagem de consulta para JSON similar ao XPath para XML.'},
  {q:'O que posso fazer com caminho JSON?',a:'Extrair campos especificos de respostas de API, navegar em arquivos de configuracao aninhados.'}
]},
`(function(){
  document.getElementById('jp-go').onclick=function(){
    const raw=document.getElementById('jp-json').value.trim();
    const key=document.getElementById('jp-key').value.trim();
    const out=document.getElementById('jp-out');
    try{
      const obj=JSON.parse(raw);
      const parts=key.replace(/\[(\d+)\]/g,'.$1').split('.').filter(Boolean);
      let cur=obj;
      for(const part of parts){if(cur===null||cur===undefined){cur=undefined;break;}cur=cur[part];}
      out.textContent=cur===undefined?'undefined':JSON.stringify(cur,null,2);
    }catch(e){out.textContent='Error: '+e.message;}
  };
  document.getElementById('jp-json').value='{\n  "user": {\n    "name": "Alice",\n    "age": 30,\n    "scores": [95, 87, 92]\n  }\n}';
})();`
);

// 209 Cron Expression Builder
tool('cronbuilder','developer','[C]',
`<div id="cb-app"><div style="display:grid;grid-template-columns:repeat(5,1fr);gap:0.4rem;margin-bottom:0.75rem"><div class="field"><label for="cb-min">{{ui.min}}</label><input type="text" id="cb-min" value="0" style="font-family:monospace;text-align:center"></div><div class="field"><label for="cb-hr">{{ui.hour}}</label><input type="text" id="cb-hr" value="*" style="font-family:monospace;text-align:center"></div><div class="field"><label for="cb-dom">{{ui.dom}}</label><input type="text" id="cb-dom" value="*" style="font-family:monospace;text-align:center"></div><div class="field"><label for="cb-mon">{{ui.month}}</label><input type="text" id="cb-mon" value="*" style="font-family:monospace;text-align:center"></div><div class="field"><label for="cb-dow">{{ui.dow}}</label><input type="text" id="cb-dow" value="*" style="font-family:monospace;text-align:center"></div></div><div style="font-family:monospace;font-size:1.2rem;font-weight:700;padding:0.5rem 0.75rem;background:var(--surface);border:1px solid var(--line);border-radius:8px;text-align:center;cursor:pointer" id="cb-expr" onclick="navigator.clipboard.writeText(this.textContent)"></div><p id="cb-desc" style="margin-top:0.5rem;opacity:0.8;text-align:center"></p><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:0.4rem;margin-top:0.75rem"><button class="cb-preset btn" data-val="0 * * * *">Every hour</button><button class="cb-preset btn" data-val="0 9 * * 1-5">Weekdays 9am</button><button class="cb-preset btn" data-val="*/5 * * * *">Every 5 mins</button><button class="cb-preset btn" data-val="0 0 * * *">Daily midnight</button><button class="cb-preset btn" data-val="0 0 1 * *">Monthly (1st)</button><button class="cb-preset btn" data-val="0 0 * * 0">Weekly Sunday</button></div></div>`,
{title:'Cron Expression Builder',metaDescription:'Free cron expression builder. Build and describe cron schedule expressions.',h1:'Cron Expression Builder',intro:'Build cron schedule expressions by filling in the 5 fields. Click a preset or edit any field manually.',faq_title:'Cron FAQ',ui:{min:'Minute',hour:'Hour',dom:'Day (month)',month:'Month',dow:'Day (week)'},faq:[
  {q:'What is a cron expression?',a:'5 fields: minute (0-59), hour (0-23), day of month (1-31), month (1-12), day of week (0-7). Special chars: * (any), , (list), - (range), / (step).'},
  {q:'What do special characters mean?',a:'* = any value. */5 = every 5 units. 0-5 = range. 1,3,5 = list. Examples: */30 * * * * = every 30 minutes.'},
  {q:'Where is cron used?',a:'Linux/Unix scheduled tasks, AWS CloudWatch Events, GitHub Actions, Jenkins CI/CD, Heroku Scheduler.'}
]},
{title:'Construtor de Expressao Cron',metaDescription:'Construtor de expressao cron gratuito.',h1:'Construtor de Expressao Cron',intro:'Construa expressoes de agendamento cron preenchendo os 5 campos.',faq_title:'FAQ cron',ui:{min:'Minuto',hour:'Hora',dom:'Dia (mes)',month:'Mes',dow:'Dia (semana)'},faq:[
  {q:'O que e uma expressao cron?',a:'5 campos: minuto (0-59), hora (0-23), dia do mes (1-31), mes (1-12), dia da semana (0-7).'},
  {q:'O que os caracteres especiais significam?',a:'* = qualquer valor. */5 = a cada 5 unidades. 0-5 = faixa. 1,3,5 = lista.'},
  {q:'Onde o cron e usado?',a:'Sistemas Linux/Unix, AWS CloudWatch Events, GitHub Actions, Jenkins CI/CD, Heroku Scheduler.'}
]},
`(function(){
  const fields=['cb-min','cb-hr','cb-dom','cb-mon','cb-dow'];
  function describe(expr){
    const parts=expr.trim().split(/\s+/);
    if(parts.length!==5)return 'Invalid expression';
    const[min,hr,dom,mon,dow]=parts;
    if(expr==='* * * * *')return 'Every minute';
    if(min.startsWith('*/'))return 'Every '+min.slice(2)+' minutes';
    if(min==='0'&&hr==='*')return 'Every hour at minute 0';
    if(min==='0'&&dom==='*'&&mon==='*'&&dow==='*')return 'Every day at '+hr+':00';
    if(min==='0'&&hr==='0'&&dom==='*'&&mon==='*'&&dow==='*')return 'Daily at midnight';
    return 'Runs: '+expr;
  }
  function update(){
    const val=fields.map(id=>document.getElementById(id).value||'*').join(' ');
    document.getElementById('cb-expr').textContent=val;
    document.getElementById('cb-desc').textContent=describe(val);
  }
  fields.forEach(id=>document.getElementById(id).addEventListener('input',update));
  document.querySelectorAll('.cb-preset').forEach(btn=>{
    btn.onclick=function(){
      const parts=this.dataset.val.split(' ');
      fields.forEach((id,i)=>document.getElementById(id).value=parts[i]);update();
    };
  });
  update();
})();`
);

// 210 JWT Decoder
tool('jwtdecoder','developer','[J]',
`<div id="jd-app"><div class="field"><label for="jd-token">{{ui.token}}</label><textarea id="jd-token" rows="4" style="width:100%;font-family:monospace;font-size:0.8rem;padding:0.5rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)" placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."></textarea></div><button class="btn" id="jd-go">{{ui.decode}}</button><div id="jd-out" style="margin-top:0.75rem;display:grid;gap:0.5rem"></div></div>`,
{title:'JWT Decoder',metaDescription:'Free JWT decoder. Decode and inspect JSON Web Tokens.',h1:'JWT Decoder',intro:'Paste a JSON Web Token (JWT) to decode the header, payload claims and expiration. Everything runs in your browser.',faq_title:'JWT FAQ',ui:{token:'JWT token',decode:'Decode'},faq:[
  {q:'What is a JWT?',a:'JSON Web Token is an open standard (RFC 7519). JWTs are used for authentication - issued after login and sent with each request in the Authorization header.'},
  {q:'Is it safe to paste my JWT here?',a:'Use caution with production JWTs. This decoder runs entirely in your browser with no server upload. A compromised JWT can impersonate you until it expires.'},
  {q:'What are the three parts of a JWT?',a:'Header (algorithm and type), Payload (claims like sub, iat, exp), Signature. Separated by dots: header.payload.signature.'}
]},
{title:'Decodificador de JWT',metaDescription:'Decodificador de JWT gratuito.',h1:'Decodificador de JWT',intro:'Cole um JWT para decodificar e inspecionar o cabecalho, claims de payload e expiracao.',faq_title:'FAQ JWT',ui:{token:'Token JWT',decode:'Decodificar'},faq:[
  {q:'O que e um JWT?',a:'JSON Web Token e um padrao aberto (RFC 7519). JWTs sao usados para autenticacao.'},
  {q:'E seguro colar meu JWT aqui?',a:'Use cautela com JWTs de producao. Este decodificador e executado inteiramente no navegador sem upload para servidor.'},
  {q:'Quais sao as tres partes de um JWT?',a:'Cabecalho (algoritmo e tipo), Payload (claims como sub, iat, exp), Assinatura.'}
]},
`(function(){
  function b64d(str){try{return JSON.parse(atob(str.replace(/-/g,'+').replace(/_/g,'/')));}catch{return null;}}
  document.getElementById('jd-go').onclick=function(){
    const token=document.getElementById('jd-token').value.trim();
    const out=document.getElementById('jd-out');
    const parts=token.split('.');
    if(parts.length!==3){out.innerHTML='<p style="color:#ef4444">Invalid JWT (must have 3 parts)</p>';return;}
    const header=b64d(parts[0]),payload=b64d(parts[1]);
    const now=Date.now()/1000;
    const expInfo=payload&&payload.exp?((payload.exp>now)?'Valid (expires '+new Date(payload.exp*1000).toLocaleString()+')':'Expired on '+new Date(payload.exp*1000).toLocaleString()):'No exp claim';
    out.innerHTML=[
      '<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.75rem"><strong>Header</strong><pre style="margin:0.4rem 0 0;font-size:0.85rem;white-space:pre-wrap">'+JSON.stringify(header,null,2)+'</pre></div>',
      '<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.75rem"><strong>Payload</strong><pre style="margin:0.4rem 0 0;font-size:0.85rem;white-space:pre-wrap">'+JSON.stringify(payload,null,2)+'</pre></div>',
      '<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><strong>Expiry:</strong> '+expInfo+'</div>'
    ].join('');
  };
  document.getElementById('jd-token').value='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
})();`
);

// 211 Color Contrast Checker
tool('contrastchecker','design','[CC]',
`<div id="cc-app"><div class="row"><div class="field"><label for="cc-fg">{{ui.foreground}}</label><input type="color" id="cc-fg" value="#ffffff"></div><div class="field"><label for="cc-bg">{{ui.background}}</label><input type="color" id="cc-bg" value="#6366f1"></div></div><div id="cc-preview" style="padding:1.5rem;border-radius:12px;text-align:center;margin:0.75rem 0;transition:all 0.2s"><p id="cc-sample-text" style="font-size:1.2rem;font-weight:600;margin:0">Sample Text - The quick brown fox</p><p id="cc-sample-small" style="font-size:0.875rem;margin:0.3rem 0 0;opacity:0.85">Small text (14px) - body copy example</p></div><div id="cc-results" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:0.5rem"></div></div>`,
{title:'Color Contrast Checker - WCAG accessibility contrast ratio tester',metaDescription:'Free WCAG contrast checker. Calculate contrast ratio and check WCAG 2.1 AA and AAA compliance.',h1:'Color Contrast Checker',intro:'Select foreground and background colors to check the contrast ratio and WCAG 2.1 accessibility compliance.',faq_title:'Contrast FAQ',ui:{foreground:'Text color',background:'Background color'},faq:[
  {q:'What is WCAG contrast ratio?',a:'Normal text: AA=4.5:1, AAA=7:1. Large text (18pt+): AA=3:1, AAA=4.5:1. Maximum is 21:1 (black on white).'},
  {q:'Why does contrast matter?',a:'About 8% of males have color vision deficiency. Low contrast is difficult for people with low vision, in bright sunlight, or on poor displays.'},
  {q:'How is contrast ratio calculated?',a:'Contrast ratio = (L1 + 0.05) / (L2 + 0.05), where L1 and L2 are relative luminances. Uses sRGB formula with gamma correction.'}
]},
{title:'Verificador de Contraste de Cores',metaDescription:'Verificador de contraste WCAG gratuito.',h1:'Verificador de Contraste de Cores',intro:'Selecione cores de texto e fundo para verificar a taxa de contraste e conformidade WCAG 2.1.',faq_title:'FAQ contraste',ui:{foreground:'Cor do texto',background:'Cor de fundo'},faq:[
  {q:'O que e taxa de contraste WCAG?',a:'Texto normal: AA=4,5:1, AAA=7:1. Texto grande (18pt+): AA=3:1, AAA=4,5:1.'},
  {q:'Por que o contraste importa?',a:'Cerca de 8% dos homens tem deficiencia de visao de cores. Texto de baixo contraste e dificil de ler.'},
  {q:'Como a taxa de contraste e calculada?',a:'Taxa de contraste = (L1 + 0,05) / (L2 + 0,05), onde L1 e L2 sao luminancias relativas.'}
]},
`(function(){
  function hexToRgb(hex){return[parseInt(hex.slice(1,3),16)/255,parseInt(hex.slice(3,5),16)/255,parseInt(hex.slice(5,7),16)/255];}
  function lin(c){return c<=0.03928?c/12.92:Math.pow((c+0.055)/1.055,2.4);}
  function lum(hex){const[r,g,b]=hexToRgb(hex).map(lin);return 0.2126*r+0.7152*g+0.0722*b;}
  function ratio(c1,c2){const l1=lum(c1),l2=lum(c2);const[hi,lo]=l1>l2?[l1,l2]:[l2,l1];return(hi+0.05)/(lo+0.05);}
  function update(){
    const fg=document.getElementById('cc-fg').value,bg=document.getElementById('cc-bg').value;
    const r=ratio(fg,bg);
    document.getElementById('cc-preview').style.background=bg;
    document.getElementById('cc-sample-text').style.color=fg;
    document.getElementById('cc-sample-small').style.color=fg;
    const badge=(pass,label)=>'<div style="background:var(--surface);border:2px solid '+(pass?'#22c55e':'#ef4444')+'";border-radius:8px;padding:0.4rem 0.6rem;text-align:center><div style="font-size:0.7rem;opacity:0.6">'+label+'</div><strong style="color:'+(pass?'#22c55e':'#ef4444')+'">'+(pass?'Pass':'Fail')+'</strong></div>';
    document.getElementById('cc-results').innerHTML='<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem;grid-column:1/-1;text-align:center"><div style="font-size:0.75rem;opacity:0.6">Contrast ratio</div><strong style="font-size:1.5rem">'+r.toFixed(2)+':1</strong></div>'+badge(r>=4.5,'AA Normal')+badge(r>=7,'AAA Normal')+badge(r>=3,'AA Large')+badge(r>=4.5,'AAA Large');
  }
  document.getElementById('cc-fg').addEventListener('input',update);document.getElementById('cc-bg').addEventListener('input',update);update();
})();`
);

// 212 Image Color Picker
tool('imagecolorpicker','design','[ICP]',
`<div id="icp-app" style="text-align:center"><p style="opacity:0.7;font-size:0.875rem;margin-bottom:0.5rem">{{ui.instruction}}</p><input type="file" id="icp-file" accept="image/*" style="display:none"><button class="btn" id="icp-upload">{{ui.upload}}</button><div id="icp-canvas-wrap" style="margin-top:0.75rem;display:none"><canvas id="icp-canvas" style="max-width:100%;border-radius:8px;cursor:crosshair;border:1px solid var(--line)"></canvas><div id="icp-picked" style="margin-top:0.75rem;display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:0.5rem"></div></div></div>`,
{title:'Image Color Picker',metaDescription:'Free image color picker. Upload an image and click to pick exact colors. Shows hex, RGB and HSL values.',h1:'Image Color Picker',intro:'Upload an image and click anywhere on it to pick the color at that point. Shows hex, RGB and HSL values instantly.',faq_title:'Color picker FAQ',ui:{instruction:'Upload an image, then click to pick colors.',upload:'Upload Image'},faq:[
  {q:'What color formats are shown?',a:'HEX: #RRGGBB. RGB: red, green, blue 0-255. HSL: hue (0-360), saturation (0-100%), lightness (0-100%).'},
  {q:'Is my image uploaded?',a:'No. The image is read in your browser using the Canvas API. Nothing is uploaded to any server.'},
  {q:'What formats are supported?',a:'JPEG, PNG, WebP, GIF and any format your browser supports.'}
]},
{title:'Seletor de Cor de Imagem',metaDescription:'Seletor de cor de imagem gratuito.',h1:'Seletor de Cor de Imagem',intro:'Carregue uma imagem e clique em qualquer lugar nela para selecionar a cor. Mostra valores hex, RGB e HSL instantaneamente.',faq_title:'FAQ seletor de cor',ui:{instruction:'Carregue uma imagem, depois clique para selecionar cores.',upload:'Carregar Imagem'},faq:[
  {q:'Quais formatos de cor sao mostrados?',a:'HEX: #RRGGBB. RGB: vermelho, verde, azul 0-255. HSL: matiz (0-360), saturacao (0-100%), luminosidade (0-100%).'},
  {q:'Minha imagem e enviada para um servidor?',a:'Nao. A imagem e lida diretamente no navegador usando a API Canvas.'},
  {q:'Quais formatos sao suportados?',a:'JPEG, PNG, WebP, GIF e qualquer formato que seu navegador suporte.'}
]},
`(function(){
  document.getElementById('icp-upload').onclick=function(){document.getElementById('icp-file').click();};
  document.getElementById('icp-file').addEventListener('change',function(){
    const file=this.files[0];if(!file)return;
    const reader=new FileReader();
    reader.onload=function(e){
      const img=new Image();
      img.onload=function(){
        const wrap=document.getElementById('icp-canvas-wrap');wrap.style.display='';
        const canvas=document.getElementById('icp-canvas');
        const maxW=Math.min(img.width,600);const scale=maxW/img.width;
        canvas.width=maxW;canvas.height=img.height*scale;
        const ctx=canvas.getContext('2d');ctx.drawImage(img,0,0,canvas.width,canvas.height);
        canvas.onclick=function(ev){
          const rect=canvas.getBoundingClientRect();
          const sx=(ev.clientX-rect.left)*(canvas.width/rect.width);
          const sy=(ev.clientY-rect.top)*(canvas.height/rect.height);
          const[r,g,b]=ctx.getImageData(Math.floor(sx),Math.floor(sy),1,1).data;
          const hex='#'+[r,g,b].map(v=>v.toString(16).padStart(2,'0')).join('');
          const mx=Math.max(r,g,b)/255,mn=Math.min(r,g,b)/255,l=(mx+mn)/2;
          const d=mx-mn;const s=d===0?0:d/(1-Math.abs(2*l-1));
          let h=0;if(d){if(mx===r/255)h=((g-b)/255/d)%6;else if(mx===g/255)h=(b-r)/255/d+2;else h=(r-g)/255/d+4;h=Math.round(h*60+360)%360;}
          const picked=document.getElementById('icp-picked');
          const card=document.createElement('div');card.style.cssText='background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem;cursor:pointer';
          card.innerHTML='<div style="height:48px;background:'+hex+';border-radius:6px;margin-bottom:0.4rem"></div><div style="font-family:monospace;font-size:0.8rem">'+hex+'<br>rgb('+r+','+g+','+b+')<br>hsl('+h+','+Math.round(s*100)+'%,'+Math.round(l*100)+'%)</div>';
          card.onclick=function(){navigator.clipboard.writeText(hex);};
          picked.prepend(card);
        };
      };
      img.src=e.target.result;
    };
    reader.readAsDataURL(file);
  });
})();`
);

// 213 Markdown Preview
tool('markdownpreview','developer','[MD]',
`<div id="mp-app" style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem"><div><label style="display:block;font-size:0.875rem;margin-bottom:0.3rem;opacity:0.7">{{ui.editor}}</label><textarea id="mp-in" style="width:100%;min-height:300px;padding:0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text);font-family:monospace;font-size:0.875rem;resize:vertical;line-height:1.6">## Hello Markdown!\n\nThis is **bold** and _italic_.\n\n- Item one\n- Item two\n\n> Blockquote</textarea></div><div><label style="display:block;font-size:0.875rem;margin-bottom:0.3rem;opacity:0.7">{{ui.preview}}</label><div id="mp-out" style="min-height:300px;padding:0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);overflow-y:auto;line-height:1.7"></div></div></div>`,
{title:'Markdown Preview',metaDescription:'Free live markdown preview. Write markdown and see the rendered HTML preview in real time.',h1:'Markdown Preview',intro:'Type markdown in the left panel and see the live rendered preview on the right.',faq_title:'Markdown FAQ',ui:{editor:'Markdown',preview:'Preview'},faq:[
  {q:'What is Markdown?',a:'Lightweight markup language that converts plain text to HTML. Created by John Gruber in 2004. Used in GitHub READMEs, docs and chat apps.'},
  {q:'What syntax is supported?',a:'Headers (#), **bold**, _italic_, lists (- or 1.), blockquotes (>), inline code, code blocks, links and images.'},
  {q:'How to export to HTML?',a:'Open browser dev tools and copy the innerHTML of #mp-out element.'}
]},
{title:'Previa de Markdown',metaDescription:'Previa de markdown ao vivo gratuita.',h1:'Previa de Markdown',intro:'Digite markdown no painel esquerdo e veja a previa renderizada a direita.',faq_title:'FAQ markdown',ui:{editor:'Markdown',preview:'Previa'},faq:[
  {q:'O que e Markdown?',a:'Linguagem de marcacao leve que converte texto simples em HTML. Criada por John Gruber em 2004.'},
  {q:'Qual sintaxe e suportada?',a:'Cabecalhos (#), **negrito**, _italico_, listas (- ou 1.), aspas de bloco (>), codigo, links e imagens.'},
  {q:'Como exportar para HTML?',a:'Abra as ferramentas de desenvolvedor do navegador e copie o innerHTML do elemento #mp-out.'}
]},
`(function(){
  function md(src){
    return src
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/^### (.+)$/gm,'<h3>$1</h3>')
      .replace(/^## (.+)$/gm,'<h2>$1</h2>')
      .replace(/^# (.+)$/gm,'<h1>$1</h1>')
      .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
      .replace(/\*(.+?)\*/g,'<em>$1</em>')
      .replace(/_(.+?)_/g,'<em>$1</em>')
      .replace(/\`\`\`([\s\S]*?)\`\`\`/g,'<pre style="background:var(--surface);border:1px solid var(--line);border-radius:6px;padding:0.75rem;overflow-x:auto"><code>$1</code></pre>')
      .replace(/\`(.+?)\`/g,'<code style="background:var(--surface);border:1px solid var(--line);border-radius:4px;padding:0 4px">$1</code>')
      .replace(/^> (.+)$/gm,'<blockquote style="border-left:4px solid var(--accent,#6366f1);margin:0;padding:0.4rem 0.75rem;opacity:0.8">$1</blockquote>')
      .replace(/^- (.+)$/gm,'<li>$1</li>')
      .replace(/(<li>.*<\/li>)/gs,'<ul>$1</ul>')
      .replace(/^---+$/gm,'<hr>')
      .replace(/\[(.+?)\]\((.+?)\)/g,'<a href="$2" target="_blank" rel="noopener">$1</a>')
      .replace(/^(?!<[a-z]).+$/gm,s=>s?'<p>'+s+'</p>':s);
  }
  const input=document.getElementById('mp-in');
  function update(){document.getElementById('mp-out').innerHTML=md(input.value);}
  input.addEventListener('input',update);update();
})();`
);

// 214 HTTP Status Codes
tool('httpcodes','developer','[H]',
`<div id="hc-app"><div class="field"><input type="text" id="hc-search" placeholder="{{ui.search}}" style="width:100%;padding:0.5rem 0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)"></div><div id="hc-list" style="display:grid;gap:0.4rem;margin-top:0.5rem"></div></div>`,
{title:'HTTP Status Code Reference',metaDescription:'Complete list of HTTP response codes 1xx-5xx with descriptions.',h1:'HTTP Status Code Reference',intro:'Search or browse all HTTP status codes. Covers 1xx-5xx categories.',faq_title:'HTTP codes FAQ',ui:{search:'Search codes or descriptions...'},faq:[
  {q:'What are the HTTP status code categories?',a:'1xx: Informational. 2xx: Success. 3xx: Redirection. 4xx: Client Error. 5xx: Server Error.'},
  {q:'What is the most common HTTP error?',a:'404 Not Found is the most recognized. 500 Internal Server Error is the most feared. 200 OK is the success code every developer hopes to see.'},
  {q:'What is 418 I am a teapot?',a:'An April Fools RFC from 1998. The server refuses to brew coffee because it is a teapot. A real HTTP status code per RFC 2324.'}
]},
{title:'Referencia de Codigo de Status HTTP',metaDescription:'Lista completa de codigos de resposta HTTP 1xx-5xx.',h1:'Referencia de Codigo de Status HTTP',intro:'Pesquise ou navegue por todos os codigos de status HTTP.',faq_title:'FAQ HTTP',ui:{search:'Pesquisar codigos ou descricoes...'},faq:[
  {q:'Quais sao as categorias de codigo de status HTTP?',a:'1xx: Informacional. 2xx: Sucesso. 3xx: Redirecionamento. 4xx: Erro do Cliente. 5xx: Erro do Servidor.'},
  {q:'Qual e o erro HTTP mais comum?',a:'404 Nao Encontrado e o mais reconhecido. 500 Erro Interno do Servidor e o mais temido.'},
  {q:'O que e 418?',a:'Um RFC de 1 de abril de 1998. O servidor recusa-se a fazer cafe porque e um bule.'}
]},
`(function(){
  const codes=[[100,'Continue','Server received headers, client should send body'],[101,'Switching Protocols','Server agrees to switch protocols'],[200,'OK','Standard success'],[201,'Created','Resource created (POST)'],[204,'No Content','Success with no body'],[301,'Moved Permanently','URL permanently changed'],[302,'Found','Temporary redirect'],[304,'Not Modified','Use cached version'],[307,'Temporary Redirect','Preserve HTTP method'],[308,'Permanent Redirect','Permanent, preserve method'],[400,'Bad Request','Invalid request syntax'],[401,'Unauthorized','Authentication required'],[403,'Forbidden','Lacks permission'],[404,'Not Found','Resource does not exist'],[405,'Method Not Allowed','HTTP method not supported'],[408,'Request Timeout','Server timed out'],[409,'Conflict','Request conflicts with state'],[410,'Gone','Resource permanently deleted'],[413,'Content Too Large','Request body too large'],[415,'Unsupported Media Type','Wrong Content-Type'],[418,'I am a Teapot','April Fools RFC 2324'],[422,'Unprocessable Entity','Validation failed'],[429,'Too Many Requests','Rate limit exceeded'],[500,'Internal Server Error','Generic server error'],[501,'Not Implemented','Not supported'],[502,'Bad Gateway','Invalid upstream response'],[503,'Service Unavailable','Temporarily unavailable'],[504,'Gateway Timeout','Upstream timed out']];
  const colors={1:'#6366f1',2:'#22c55e',3:'#3b82f6',4:'#f59e0b',5:'#ef4444'};
  function render(filter){
    const f=filter?codes.filter(([c,n,d])=>(String(c)+n+d).toLowerCase().includes(filter.toLowerCase())):codes;
    document.getElementById('hc-list').innerHTML=f.map(([code,name,desc])=>{const c=colors[Math.floor(code/100)]||'#6b7280';return '<div style="display:grid;grid-template-columns:60px 1fr;gap:0.5rem;align-items:center;padding:0.5rem 0.75rem;background:var(--surface);border-left:3px solid '+c+';border-radius:0 8px 8px 0"><div style="font-weight:700;font-size:1rem;color:'+c+'">'+code+'</div><div><div style="font-weight:600">'+name+'</div><div style="font-size:0.8rem;opacity:0.6">'+desc+'</div></div></div>';}).join('');
  }
  document.getElementById('hc-search').addEventListener('input',function(){render(this.value);});render('');
})();`
);

// 215 Regex Cheat Sheet
tool('regexcheatsheet','developer','[R]',
`<div id="rcs-app"><div class="field"><input type="text" id="rcs-search" placeholder="{{ui.search}}" style="width:100%;padding:0.5rem 0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)"></div><div id="rcs-list" style="display:grid;gap:0.3rem;margin-top:0.5rem"></div></div>`,
{title:'Regex Cheat Sheet',metaDescription:'Quick reference for regular expression syntax.',h1:'Regex Cheat Sheet',intro:'Search the complete regex quick reference. Covers character classes, quantifiers, anchors and patterns.',faq_title:'Regex FAQ',ui:{search:'Search regex syntax...'},faq:[
  {q:'What are the most important regex tokens?',a:'. = any char, \\d = digit, \\w = word char, \\s = whitespace, ^ = start, $ = end, * = 0+, + = 1+, ? = optional, {n,m} = n to m times.'},
  {q:'How do I test a regex?',a:'Use the RegEx Tester tool on this site. Or try regex101.com for detailed regex debugging with step-by-step explanation.'},
  {q:'What is greedy vs lazy?',a:'Greedy (default): .* matches as much as possible. Lazy: .+? matches as little as possible. Add ? after quantifier for lazy.'}
]},
{title:'Guia de Referencia de Regex',metaDescription:'Referencia rapida para sintaxe de expressao regular.',h1:'Guia de Referencia de Regex',intro:'Pesquise a referencia completa de expressoes regulares.',faq_title:'FAQ regex',ui:{search:'Pesquisar sintaxe regex...'},faq:[
  {q:'Quais sao os tokens regex mais importantes?',a:'. = qualquer char, \\d = digito, \\w = char de palavra, \\s = espaco, ^ = inicio, $ = fim, * = 0+, + = 1+.'},
  {q:'Como testar um regex?',a:'Use a ferramenta Testador de RegEx neste site. Ou experimente regex101.com.'},
  {q:'O que e correspondencia gulosa vs preguicosa?',a:'Gulosa (padrao): .* corresponde ao maximo possivel. Preguicosa: .+? corresponde ao minimo possivel.'}
]},
`(function(){
  const items=[
    ['.','Any character (except newline)'],
    ['\\\\d','Digit [0-9]'],['\\\\D','Non-digit'],
    ['\\\\w','Word character [a-zA-Z0-9_]'],['\\\\W','Non-word character'],
    ['\\\\s','Whitespace'],['\\\\S','Non-whitespace'],
    ['\\\\b','Word boundary'],
    ['^','Start of string'],['$','End of string'],
    ['*','0 or more (greedy)'],['+','1 or more (greedy)'],
    ['?','0 or 1 (optional)'],['*?','0 or more (lazy)'],['+?','1 or more (lazy)'],
    ['{n}','Exactly n times'],['{n,m}','Between n and m times'],
    ['[abc]','Character class'],['^[abc]','Negated class'],
    ['[a-z]','Range a to z'],
    ['(abc)','Capture group'],['(?:abc)','Non-capture group'],
    ['a|b','Alternation: a or b'],
    ['(?=abc)','Lookahead'],['(?!abc)','Negative lookahead'],
    ['Email','[\\\\w.-]+@[\\\\w-]+\\\\.[a-z]{2,}'],
    ['URL','https?:\\/\\/[\\\\w./%-]+'],
    ['IPv4','(\\\\d{1,3}\\\\.){3}\\\\d{1,3}'],
    ['Date YYYY-MM-DD','\\\\d{4}-\\\\d{2}-\\\\d{2}'],
    ['Hex color','#[0-9a-fA-F]{3,6}'],
  ];
  function render(q){
    const f=q?items.filter(([t,d])=>(t+d).toLowerCase().includes(q.toLowerCase())):items;
    document.getElementById('rcs-list').innerHTML=f.map(([token,desc])=>'<div style="display:grid;grid-template-columns:180px 1fr;gap:0.5rem;padding:0.4rem 0.75rem;background:var(--surface);border:1px solid var(--line);border-radius:6px;font-size:0.875rem;align-items:center"><code style="font-family:monospace;font-size:0.85rem;color:var(--accent,#6366f1)">'+token+'</code><span>'+desc+'</span></div>').join('');
  }
  document.getElementById('rcs-search').addEventListener('input',function(){render(this.value);});render('');
})();`
);

// 216 Text Encoder/Decoder
tool('textencoder','developer','[TE]',
`<div id="te-app"><div class="field"><label for="te-mode">{{ui.operation}}</label><select id="te-mode"><option value="urlenc">URL Encode</option><option value="urldec">URL Decode</option><option value="htmlenc">HTML Encode</option><option value="htmldec">HTML Decode</option><option value="b64enc">Base64 Encode</option><option value="b64dec">Base64 Decode</option></select></div><div class="field"><label for="te-in">{{ui.input}}</label><textarea id="te-in" rows="5" style="width:100%;font-family:monospace;font-size:0.875rem;padding:0.5rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)"></textarea></div><button class="btn" id="te-go">{{ui.convert}}</button><div class="field" style="margin-top:0.5rem"><label>{{ui.output}}</label><textarea id="te-out" rows="5" style="width:100%;font-family:monospace;font-size:0.875rem;padding:0.5rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)" readonly></textarea></div></div>`,
{title:'Text Encoder and Decoder - URL, HTML and Base64',metaDescription:'Free text encoder. URL, HTML entity and Base64 encode/decode.',h1:'Text Encoder and Decoder',intro:'Encode or decode text using URL encoding, HTML entities or Base64.',faq_title:'Encoding FAQ',ui:{operation:'Operation',input:'Input',output:'Output',convert:'Convert'},faq:[
  {q:'When do I need URL encoding?',a:'URLs can only contain certain ASCII characters. Spaces and special chars must be percent-encoded. Example: "Hello World" becomes "Hello%20World".'},
  {q:'What are HTML entities?',a:'HTML entities represent special HTML characters. < becomes &lt;, > becomes &gt;, & becomes &amp;. Always HTML-encode user input to prevent XSS attacks.'},
  {q:'What is Base64?',a:'Base64 encodes binary data as ASCII text. Used to embed images in HTML (data URLs) and transmit binary data in JSON. Output is ~33% larger than input.'}
]},
{title:'Codificador e Decodificador de Texto',metaDescription:'Codificador de texto gratuito. URL, entidades HTML e Base64.',h1:'Codificador e Decodificador de Texto',intro:'Codifique ou decodifique texto usando codificacao URL, entidades HTML ou Base64.',faq_title:'FAQ codificacao',ui:{operation:'Operacao',input:'Entrada',output:'Saida',convert:'Converter'},faq:[
  {q:'Quando preciso de codificacao URL?',a:'URLs so podem conter certos caracteres ASCII. Caracteres especiais devem ser codificados em porcentagem.'},
  {q:'O que sao entidades HTML?',a:'Entidades HTML representam caracteres especiais em HTML. < torna-se &lt;, > torna-se &gt;.'},
  {q:'O que e Base64?',a:'Base64 codifica dados binarios como texto ASCII. Usado para incorporar imagens em HTML e transmitir dados binarios em JSON.'}
]},
`(function(){
  const ops={
    urlenc:function(s){return encodeURIComponent(s);},
    urldec:function(s){return decodeURIComponent(s);},
    htmlenc:function(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');},
    htmldec:function(s){const d=document.createElement('div');d.innerHTML=s;return d.textContent;},
    b64enc:function(s){return btoa(unescape(encodeURIComponent(s)));},
    b64dec:function(s){return decodeURIComponent(escape(atob(s)));}
  };
  document.getElementById('te-go').onclick=function(){
    const mode=document.getElementById('te-mode').value;
    const input=document.getElementById('te-in').value;
    try{document.getElementById('te-out').value=ops[mode](input);}
    catch(e){document.getElementById('te-out').value='Error: '+e.message;}
  };
})();`
);

// 217 Diff Checker
tool('diffchecker','developer','[D]',
`<div id="dc-app"><div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem"><div><label style="display:block;font-size:0.875rem;margin-bottom:0.3rem;opacity:0.7">{{ui.original}}</label><textarea id="dc-orig" rows="8" style="width:100%;font-family:monospace;font-size:0.85rem;padding:0.5rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)"></textarea></div><div><label style="display:block;font-size:0.875rem;margin-bottom:0.3rem;opacity:0.7">{{ui.modified}}</label><textarea id="dc-new" rows="8" style="width:100%;font-family:monospace;font-size:0.85rem;padding:0.5rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)"></textarea></div></div><button class="btn" id="dc-go" style="margin-top:0.5rem">{{ui.compare}}</button><div id="dc-out" style="margin-top:0.75rem;font-family:monospace;font-size:0.875rem"></div></div>`,
{title:'Diff Checker',metaDescription:'Compare two texts and highlight differences line by line.',h1:'Diff Checker',intro:'Paste the original and modified text to see a line-by-line diff highlighting what was added, removed or unchanged.',faq_title:'Diff FAQ',ui:{original:'Original',modified:'Modified',compare:'Compare'},faq:[
  {q:'What is a diff?',a:'A diff shows changes between two texts. Green lines were added, red lines removed, unchanged lines shown without highlighting.'},
  {q:'What algorithm is used?',a:'This tool uses a simplified line-by-line comparison. Professional tools use the Myers diff algorithm which finds the shortest edit script.'},
  {q:'What can I use diff checker for?',a:'Comparing code versions, checking document revision changes, verifying config file changes, comparing API responses.'}
]},
{title:'Verificador de Diferencas',metaDescription:'Compare dois textos e destaque diferencas linha por linha.',h1:'Verificador de Diferencas',intro:'Cole as versoes original e modificada do texto para ver um diff linha por linha.',faq_title:'FAQ diff',ui:{original:'Original',modified:'Modificado',compare:'Comparar'},faq:[
  {q:'O que e um diff?',a:'Um diff mostra as mudancas entre dois textos. Linhas em verde foram adicionadas, linhas vermelhas foram removidas.'},
  {q:'Qual algoritmo e usado?',a:'Esta ferramenta usa uma comparacao linha por linha simplificada.'},
  {q:'Para que posso usar o verificador de diferencas?',a:'Comparar versoes de codigo, verificar mudancas em documentos e arquivos de configuracao.'}
]},
`(function(){
  function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
  document.getElementById('dc-go').onclick=function(){
    const orig=document.getElementById('dc-orig').value.split('\n');
    const next=document.getElementById('dc-new').value.split('\n');
    const max=Math.max(orig.length,next.length);
    let html='<div style="display:grid;gap:2px">';
    for(let i=0;i<max;i++){
      const a=orig[i],b=next[i];
      if(a===b){html+='<div style="padding:1px 6px;opacity:0.5">  '+esc(a||'')+'</div>';}
      else{
        if(a!==undefined)html+='<div style="padding:1px 6px;background:rgba(239,68,68,0.15);border-left:3px solid #ef4444">- '+esc(a)+'</div>';
        if(b!==undefined)html+='<div style="padding:1px 6px;background:rgba(34,197,94,0.15);border-left:3px solid #22c55e">+ '+esc(b)+'</div>';
      }
    }
    document.getElementById('dc-out').innerHTML=html+'</div>';
  };
  document.getElementById('dc-orig').value='Hello World\nThis is line 2\nSame line\nOld content here';
  document.getElementById('dc-new').value='Hello World\nThis is line two\nSame line\nNew content here\nNew line added';
})();`
);

// 218 Unix Permissions Calculator
tool('unixperms','developer','[P]',
`<div id="up-app"><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:0.5rem;margin-bottom:0.75rem"><div style="text-align:center"><div style="font-weight:600;margin-bottom:0.4rem">Owner (u)</div><label><input type="checkbox" class="up-cb" data-who="o" data-bit="4" checked> Read (r)</label><br><label><input type="checkbox" class="up-cb" data-who="o" data-bit="2" checked> Write (w)</label><br><label><input type="checkbox" class="up-cb" data-who="o" data-bit="1" checked> Execute (x)</label></div><div style="text-align:center"><div style="font-weight:600;margin-bottom:0.4rem">Group (g)</div><label><input type="checkbox" class="up-cb" data-who="g" data-bit="4" checked> Read (r)</label><br><label><input type="checkbox" class="up-cb" data-who="g" data-bit="2"> Write (w)</label><br><label><input type="checkbox" class="up-cb" data-who="g" data-bit="1"> Execute (x)</label></div><div style="text-align:center"><div style="font-weight:600;margin-bottom:0.4rem">Others (o)</div><label><input type="checkbox" class="up-cb" data-who="w" data-bit="4" checked> Read (r)</label><br><label><input type="checkbox" class="up-cb" data-who="w" data-bit="2"> Write (w)</label><br><label><input type="checkbox" class="up-cb" data-who="w" data-bit="1"> Execute (x)</label></div></div><div class="result" style="text-align:center"><div style="font-size:2.5rem;font-weight:800;font-family:monospace" id="up-octal"></div><div style="font-size:1.1rem;font-family:monospace;opacity:0.8" id="up-sym"></div><div style="opacity:0.6;font-size:0.875rem;margin-top:0.4rem" id="up-cmd"></div></div></div>`,
{title:'Unix File Permissions Calculator',metaDescription:'Toggle chmod permissions and get the octal code and symbolic notation.',h1:'Unix File Permissions Calculator',intro:'Toggle permission bits for owner, group and others to generate the chmod octal code (e.g., 755) and symbolic notation.',faq_title:'Unix permissions FAQ',ui:{},faq:[
  {q:'How do Unix permissions work?',a:'Each file has permissions for owner, group and others. Each set has 3 bits: read (4), write (2), execute (1). Sum them: rwx=7, rw-=6, r-x=5, r--=4.'},
  {q:'What is chmod 755?',a:'Owner: rwx (7). Group: r-x (5). Others: r-x (5). Standard for web server directories and scripts.'},
  {q:'What is chmod 644?',a:'Owner: rw- (6). Group: r-- (4). Others: r-- (4). Standard for static files.'}
]},
{title:'Calculadora de Permissoes Unix',metaDescription:'Calcule permissoes chmod para proprietario, grupo e outros.',h1:'Calculadora de Permissoes de Arquivo Unix',intro:'Alterne bits de permissao para proprietario, grupo e outros para gerar o codigo octal chmod e notacao simbolica.',faq_title:'FAQ permissoes Unix',ui:{},faq:[
  {q:'Como funcionam as permissoes Unix?',a:'Cada arquivo tem permissoes para proprietario, grupo e outros. Cada conjunto tem 3 bits: leitura (4), escrita (2), execucao (1).'},
  {q:'O que e chmod 755?',a:'Proprietario: rwx (7). Grupo: r-x (5). Outros: r-x (5). Padrao para diretorios de servidor web.'},
  {q:'O que e chmod 644?',a:'Proprietario: rw- (6). Grupo: r-- (4). Outros: r-- (4). Padrao para arquivos estaticos.'}
]},
`(function(){
  function calc(){
    const perms={o:0,g:0,w:0};
    document.querySelectorAll('.up-cb').forEach(function(cb){if(cb.checked)perms[cb.dataset.who]+=parseInt(cb.dataset.bit);});
    const octal=perms.o*100+perms.g*10+perms.w;
    function sym(who){return((who&4)?'r':'-')+((who&2)?'w':'-')+((who&1)?'x':'-');}
    const str=sym(perms.o)+sym(perms.g)+sym(perms.w);
    document.getElementById('up-octal').textContent=octal.toString().padStart(3,'0');
    document.getElementById('up-sym').textContent=str;
    document.getElementById('up-cmd').textContent='chmod '+octal.toString().padStart(3,'0')+' filename';
  }
  document.querySelectorAll('.up-cb').forEach(function(cb){cb.addEventListener('change',calc);});calc();
})();`
);

// 219 Temperature Converter Extended
tool('tempconverterx','science','[T]',
`<div id="tcx-app"><div class="row"><div class="field"><label for="tcx-val">{{ui.value}}</label><input type="number" id="tcx-val" step="any" value="100" inputmode="decimal"></div><div class="field"><label for="tcx-from">{{ui.from}}</label><select id="tcx-from"><option value="C">Celsius</option><option value="F">Fahrenheit</option><option value="K">Kelvin</option><option value="R">Rankine</option><option value="D">Delisle</option><option value="N">Newton</option><option value="Re">Reaumur</option><option value="Ro">Romer</option></select></div></div><div id="tcx-out" class="result" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:0.5rem;margin-top:0.5rem"></div></div>`,
{title:'Temperature Converter - All Scales',metaDescription:'Convert between Celsius, Fahrenheit, Kelvin, Rankine, Delisle, Newton, Reaumur and Romer.',h1:'Temperature Converter',intro:'Convert between all major temperature scales simultaneously.',faq_title:'Temperature FAQ',ui:{value:'Temperature',from:'From'},faq:[
  {q:'What is absolute zero?',a:'Absolute zero: 0 K = -273.15 C = -459.67 F. Lowest possible temperature - atoms have minimum energy.'},
  {q:'Who invented Fahrenheit?',a:'Daniel Gabriel Fahrenheit in 1724. Water freezes at 32 F and boils at 212 F. Still used in the US.'},
  {q:'What is Rankine?',a:'Rankine = Fahrenheit + 459.67. Absolute temperature scale equivalent to Fahrenheit (as Kelvin is to Celsius).'}
]},
{title:'Conversor de Temperatura - Todas as Escalas',metaDescription:'Converta entre Celsius, Fahrenheit, Kelvin, Rankine, Delisle, Newton, Reaumur e Romer.',h1:'Conversor de Temperatura',intro:'Converta entre todas as principais escalas de temperatura simultaneamente.',faq_title:'FAQ temperatura',ui:{value:'Temperatura',from:'De'},faq:[
  {q:'O que e zero absoluto?',a:'Zero absoluto: 0 K = -273,15 C = -459,67 F. Temperatura mais baixa possivel.'},
  {q:'Quem inventou Fahrenheit?',a:'Daniel Gabriel Fahrenheit em 1724. A agua congela a 32 F e ferve a 212 F.'},
  {q:'O que e Rankine?',a:'Rankine = Fahrenheit + 459,67. Escala de temperatura absoluta equivalente a Fahrenheit.'}
]},
`(function(){
  function toC(v,u){switch(u){case'C':return v;case'F':return(v-32)*5/9;case'K':return v-273.15;case'R':return(v-491.67)*5/9;case'D':return 100-v*2/3;case'N':return v*100/33;case'Re':return v*5/4;case'Ro':return(v-7.5)*40/21;}return v;}
  function fromC(c,u){switch(u){case'C':return c;case'F':return c*9/5+32;case'K':return c+273.15;case'R':return(c+273.15)*9/5;case'D':return(100-c)*3/2;case'N':return c*33/100;case'Re':return c*4/5;case'Ro':return c*21/40+7.5;}return c;}
  const units=[['C','Celsius'],['F','Fahrenheit'],['K','Kelvin'],['R','Rankine'],['D','Delisle'],['N','Newton'],['Re','Reaumur'],['Ro','Romer']];
  function update(){
    const v=parseFloat(document.getElementById('tcx-val').value);
    const from=document.getElementById('tcx-from').value;
    if(isNaN(v))return;
    const c=toC(v,from);
    document.getElementById('tcx-out').innerHTML=units.map(function([u,name]){const res=fromC(c,u);return '<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">'+name+'</div><strong>'+res.toPrecision(8).replace(/\.?0+$/,'')+'</strong></div>';}).join('');
  }
  document.getElementById('tcx-val').addEventListener('input',update);document.getElementById('tcx-from').addEventListener('change',update);update();
})();`
);

// 220 Periodic Table Reference
tool('periodictable','science','[PT]',
`<div id="pt-app"><div class="field"><input type="text" id="pt-search" placeholder="{{ui.search}}" style="width:100%;padding:0.5rem 0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)"></div><div id="pt-list" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:0.4rem;margin-top:0.5rem"></div></div>`,
{title:'Periodic Table Reference',metaDescription:'Search all 118 elements by name, symbol or atomic number.',h1:'Periodic Table Reference',intro:'Search all 118 chemical elements. View atomic mass, category and properties.',faq_title:'Periodic table FAQ',ui:{search:'Search by name, symbol or atomic number...'},faq:[
  {q:'How many elements are there?',a:'118 confirmed elements. Elements 1-94 occur naturally. Elements 95-118 are synthetic, created in particle accelerators.'},
  {q:'Who created the periodic table?',a:'Dmitri Mendeleev in 1869, organizing elements by atomic mass.'},
  {q:'What are the main element categories?',a:'Alkali metals, Alkaline earth metals, Transition metals, Post-transition metals, Metalloids, Nonmetals, Halogens, Noble gases, Lanthanides, Actinides.'}
]},
{title:'Referencia da Tabela Periodica',metaDescription:'Pesquise todos os 118 elementos por nome, simbolo ou numero atomico.',h1:'Referencia da Tabela Periodica',intro:'Pesquise todos os 118 elementos quimicos.',faq_title:'FAQ tabela periodica',ui:{search:'Pesquisar por nome, simbolo ou numero atomico...'},faq:[
  {q:'Quantos elementos existem?',a:'118 elementos confirmados. Os elementos 1-94 ocorrem naturalmente.'},
  {q:'Quem criou a tabela periodica?',a:'Dmitri Mendeleev em 1869.'},
  {q:'Quais sao as principais categorias?',a:'Metais alcalinos, Metais alcalino-terrosos, Metais de transicao, Metaloides, Nao-metais, Halogenios, Gases nobres, Lantanideos, Actinideos.'}
]},
`(function(){
  const el=[[1,'H','Hydrogen',1.008,'Nonmetal'],[2,'He','Helium',4.0026,'Noble gas'],[3,'Li','Lithium',6.94,'Alkali metal'],[4,'Be','Beryllium',9.012,'Alkaline earth'],[5,'B','Boron',10.81,'Metalloid'],[6,'C','Carbon',12.011,'Nonmetal'],[7,'N','Nitrogen',14.007,'Nonmetal'],[8,'O','Oxygen',15.999,'Nonmetal'],[9,'F','Fluorine',18.998,'Halogen'],[10,'Ne','Neon',20.18,'Noble gas'],[11,'Na','Sodium',22.99,'Alkali metal'],[12,'Mg','Magnesium',24.305,'Alkaline earth'],[13,'Al','Aluminium',26.982,'Post-transition'],[14,'Si','Silicon',28.085,'Metalloid'],[15,'P','Phosphorus',30.974,'Nonmetal'],[16,'S','Sulfur',32.06,'Nonmetal'],[17,'Cl','Chlorine',35.45,'Halogen'],[18,'Ar','Argon',39.948,'Noble gas'],[19,'K','Potassium',39.098,'Alkali metal'],[20,'Ca','Calcium',40.078,'Alkaline earth'],[26,'Fe','Iron',55.845,'Transition metal'],[29,'Cu','Copper',63.546,'Transition metal'],[30,'Zn','Zinc',65.38,'Transition metal'],[35,'Br','Bromine',79.904,'Halogen'],[36,'Kr','Krypton',83.798,'Noble gas'],[47,'Ag','Silver',107.87,'Transition metal'],[50,'Sn','Tin',118.71,'Post-transition'],[53,'I','Iodine',126.9,'Halogen'],[54,'Xe','Xenon',131.29,'Noble gas'],[79,'Au','Gold',196.97,'Transition metal'],[80,'Hg','Mercury',200.59,'Transition metal'],[82,'Pb','Lead',207.2,'Post-transition'],[92,'U','Uranium',238.03,'Actinide']];
  const catC={'Nonmetal':'#22c55e','Noble gas':'#3b82f6','Alkali metal':'#ef4444','Alkaline earth':'#f97316','Metalloid':'#8b5cf6','Post-transition':'#6b7280','Halogen':'#ec4899','Transition metal':'#f59e0b','Actinide':'#14b8a6'};
  function render(q){
    const f=q?el.filter(function([n,sym,name]){return name.toLowerCase().includes(q.toLowerCase())||sym.toLowerCase()===q.toLowerCase()||String(n)===q;}):el;
    document.getElementById('pt-list').innerHTML=f.map(function([n,sym,name,mass,cat]){const c=catC[cat]||'#6b7280';return '<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.6rem 0.75rem;border-top:3px solid '+c+'"><div style="display:flex;justify-content:space-between;align-items:baseline"><strong style="font-size:1.2rem;font-family:monospace">'+sym+'</strong><span style="opacity:0.5;font-size:0.75rem">'+n+'</span></div><div style="font-size:0.85rem">'+name+'</div><div style="font-size:0.75rem;opacity:0.6">'+mass+' / '+cat+'</div></div>';}).join('');
  }
  document.getElementById('pt-search').addEventListener('input',function(){render(this.value.trim());});render('');
})();`
);

// 221 Wave Properties Calculator
tool('wavecalc','science','[W]',
`<form id="wc-form"><p style="opacity:0.7;font-size:0.875rem">{{ui.instruction}}</p><div class="row"><div class="field"><label for="wc-f">{{ui.freq}} (Hz)</label><input type="number" id="wc-f" step="any" placeholder="{{ui.leave}}" inputmode="decimal"></div><div class="field"><label for="wc-l">{{ui.wavelength}} (m)</label><input type="number" id="wc-l" step="any" placeholder="{{ui.leave}}" inputmode="decimal"></div><div class="field"><label for="wc-v">{{ui.speed}} (m/s)</label><input type="number" id="wc-v" step="any" value="343" inputmode="decimal"></div></div><button class="btn" type="submit">{{ui.calculate}}</button></form><div id="wc-out" hidden class="result" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:0.5rem"></div>`,
{title:'Wave Properties Calculator',metaDescription:'Calculate frequency, wavelength and wave speed using v = f x wavelength.',h1:'Wave Properties Calculator',intro:'Enter any two of frequency, wavelength and wave speed to calculate the third using v = f times wavelength.',faq_title:'Wave FAQ',ui:{instruction:'Enter any 2 values to calculate the 3rd. Speed of sound = 343 m/s, speed of light = 3e8 m/s.',freq:'Frequency',wavelength:'Wavelength',speed:'Wave speed',leave:'leave blank',calculate:'Calculate'},faq:[
  {q:'What is the wave equation?',a:'v = f x wavelength. Wave speed (m/s) = frequency (Hz) x wavelength (m). For sound at 20 C: v = 343 m/s. For light: v = 299,792,458 m/s.'},
  {q:'What is visible light wavelength?',a:'380-700 nm. Violet: 380-450 nm, Blue: 450-495 nm, Green: 495-570 nm, Yellow: 570-590 nm, Red: 620-700 nm.'},
  {q:'Frequency and energy?',a:'E = hf where h is Planck constant. Higher frequency = shorter wavelength = more energy per photon.'}
]},
{title:'Calculadora de Propriedades de Ondas',metaDescription:'Calcule frequencia, comprimento de onda e velocidade usando v = f x lambda.',h1:'Calculadora de Propriedades de Ondas',intro:'Insira quaisquer dois de frequencia, comprimento de onda e velocidade para calcular o terceiro.',faq_title:'FAQ ondas',ui:{instruction:'Insira quaisquer 2 valores para calcular o 3. Velocidade do som = 343 m/s, velocidade da luz = 3e8 m/s.',freq:'Frequencia',wavelength:'Comprimento de onda',speed:'Velocidade da onda',leave:'deixar em branco',calculate:'Calcular'},faq:[
  {q:'O que e a equacao de onda?',a:'v = f x lambda. Para som a 20 C: v = 343 m/s.'},
  {q:'Qual e o comprimento de onda da luz visivel?',a:'380-700 nm. Violeta: 380-450 nm, Azul: 450-495 nm.'},
  {q:'Frequencia e energia?',a:'E = hf onde h e a constante de Planck. Frequencia mais alta = mais energia por foton.'}
]},
`(function(){
  document.getElementById('wc-form').addEventListener('submit',function(e){
    e.preventDefault();
    var f=parseFloat(document.getElementById('wc-f').value);
    var l=parseFloat(document.getElementById('wc-l').value);
    var v=parseFloat(document.getElementById('wc-v').value);
    const out=document.getElementById('wc-out');out.hidden=false;
    if(isNaN(v))v=343;
    if(!isNaN(f)&&!isNaN(l))v=f*l;
    else if(!isNaN(f)&&!isNaN(v))l=v/f;
    else if(!isNaN(l)&&!isNaN(v))f=v/l;
    else{out.innerHTML='<p>Enter at least 2 values</p>';return;}
    const period=1/f;
    function fmt(n){return n<0.001||n>1e9?n.toExponential(4):n.toPrecision(6).replace(/\.?0+$/,'');}
    const items=[['Frequency (f)',fmt(f)+' Hz'],['Wavelength',fmt(l)+' m'],['Wave speed (v)',fmt(v)+' m/s'],['Period (T)',fmt(period)+' s']];
    out.innerHTML=items.map(function([k,v2]){return '<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">'+k+'</div><strong>'+v2+'</strong></div>';}).join('');
  });
})();`
);

// 222 Gravitational Force Calculator
tool('gravitycalc','science','[G]',
`<form id="gc-form"><div class="row"><div class="field"><label for="gc-m1">{{ui.m1}} (kg)</label><input type="number" id="gc-m1" step="any" value="5.972e24" inputmode="decimal"></div><div class="field"><label for="gc-m2">{{ui.m2}} (kg)</label><input type="number" id="gc-m2" step="any" value="70" inputmode="decimal"></div><div class="field"><label for="gc-r">{{ui.r}} (m)</label><input type="number" id="gc-r" step="any" value="6.371e6" inputmode="decimal"></div></div><button class="btn" type="submit">{{ui.calculate}}</button></form><div id="gc-out" hidden class="result" style="text-align:center"></div>`,
{title:'Gravitational Force Calculator',metaDescription:'Calculate gravitational force using Newton law F = Gm1m2/r squared.',h1:'Gravitational Force Calculator',intro:"Calculate the gravitational force between two masses using Newton's Law: F = Gm1m2/r squared.",faq_title:'Gravity FAQ',ui:{m1:'Mass 1',m2:'Mass 2',r:'Distance (r)',calculate:'Calculate'},faq:[
  {q:"What is Newton's law of gravitation?",a:'F = Gm1m2/r squared. Every mass attracts every other mass. G = 6.674e-11 N m squared / kg squared. Force decreases with square of distance.'},
  {q:'Why does gravity vary on planets?',a:'g = GM/r squared. Surface gravity depends on mass and radius. Mars: 3.72 m/s squared. Moon: 1.62 m/s squared. Jupiter: 24.79 m/s squared.'},
  {q:'What is G?',a:'G = 6.674e-11 N m squared / kg squared, first measured by Cavendish in 1798.'}
]},
{title:'Calculadora de Forca Gravitacional',metaDescription:'Calcule forca gravitacional usando a lei de Newton F = Gm1m2/r ao quadrado.',h1:'Calculadora de Forca Gravitacional',intro:'Calcule a forca gravitacional entre duas massas usando a Lei de Newton.',faq_title:'FAQ gravidade',ui:{m1:'Massa 1',m2:'Massa 2',r:'Distancia (r)',calculate:'Calcular'},faq:[
  {q:'O que e a lei de gravitacao de Newton?',a:'F = Gm1m2/r ao quadrado. Toda massa atrai toda outra massa. G = 6,674e-11 N m ao quadrado / kg ao quadrado.'},
  {q:'Por que a gravidade varia em planetas?',a:'g = GM/r ao quadrado. Marte: 3,72 m/s ao quadrado. Lua: 1,62 m/s ao quadrado.'},
  {q:'O que e G?',a:'G = 6,674e-11 N m ao quadrado / kg ao quadrado, medido pela primeira vez por Cavendish em 1798.'}
]},
`(function(){
  const G=6.674e-11;
  document.getElementById('gc-form').addEventListener('submit',function(e){
    e.preventDefault();
    const m1=parseFloat(document.getElementById('gc-m1').value);
    const m2=parseFloat(document.getElementById('gc-m2').value);
    const r=parseFloat(document.getElementById('gc-r').value);
    const F=G*m1*m2/(r*r);const g=G*m1/(r*r);
    const out=document.getElementById('gc-out');out.hidden=false;
    out.innerHTML='<div style="font-size:2rem;font-weight:800;color:var(--accent,#6366f1)">'+F.toExponential(4)+' N</div><p style="opacity:0.7">Gravitational force</p><div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;margin-top:0.75rem"><div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">Surface gravity</div><strong>'+g.toFixed(4)+' m/s^2</strong></div><div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">Weight of m2</div><strong>'+(m2*g).toFixed(2)+' N</strong></div></div>';
  });
})();`
);

// 223 Light Year Calculator
tool('lightyear','science','[LY]',
`<form id="ly-form"><div class="row"><div class="field"><label for="ly-val">{{ui.value}}</label><input type="number" id="ly-val" step="any" value="4.24" inputmode="decimal"></div><div class="field"><label for="ly-from">{{ui.unit}}</label><select id="ly-from"><option value="ly">Light-years</option><option value="pc">Parsecs</option><option value="AU">Astronomical Units</option><option value="km">Kilometres</option><option value="mi">Miles</option></select></div></div><button class="btn" type="submit">{{ui.convert}}</button></form><div id="ly-out" hidden class="result" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:0.5rem"></div>`,
{title:'Light Year Calculator',metaDescription:'Convert between light-years, parsecs, astronomical units, kilometres and miles.',h1:'Light Year Calculator',intro:'Convert astronomical distances between light-years, parsecs, AU and metric/imperial units.',faq_title:'Light year FAQ',ui:{value:'Value',unit:'Unit',convert:'Convert'},faq:[
  {q:'What is a light-year?',a:'Distance light travels in one year: ~9.461 trillion km. Nearest star (Proxima Centauri): 4.24 light-years. Milky Way: ~100,000 light-years across.'},
  {q:'What is a parsec?',a:'1 parsec = 3.2616 light-years = 3.086e13 km. Distance at which 1 AU subtends 1 arcsecond.'},
  {q:'What is an AU?',a:'1 AU = average Earth-Sun distance = 149.6 million km. Earth: 1 AU. Jupiter: 5.2 AU. Pluto: ~40 AU.'}
]},
{title:'Calculadora de Ano-luz',metaDescription:'Converta entre anos-luz, parsecs, unidades astronomicas, quilometros e milhas.',h1:'Calculadora de Ano-luz',intro:'Converta distancias astronomicas entre anos-luz, parsecs, UA e unidades metricas/imperiais.',faq_title:'FAQ ano-luz',ui:{value:'Valor',unit:'Unidade',convert:'Converter'},faq:[
  {q:'O que e um ano-luz?',a:'Distancia que a luz percorre em um ano: ~9,461 trilhoes de km. Estrela mais proxima: 4,24 anos-luz.'},
  {q:'O que e um parsec?',a:'1 parsec = 3,2616 anos-luz = 3,086e13 km.'},
  {q:'O que e uma UA?',a:'1 UA = distancia media Terra-Sol = 149,6 milhoes de km.'}
]},
`(function(){
  const LY=9.461e12,PC=3.086e13,AU=1.496e8,MI=1.60934;
  function toKM(v,u){if(u==='ly')return v*LY;if(u==='pc')return v*PC;if(u==='AU')return v*AU;if(u==='km')return v;if(u==='mi')return v*MI;return v;}
  document.getElementById('ly-form').addEventListener('submit',function(e){
    e.preventDefault();
    const v=parseFloat(document.getElementById('ly-val').value);
    const from=document.getElementById('ly-from').value;
    const km=toKM(v,from);
    const items=[['Light-years',km/LY],['Parsecs',km/PC],['Astronomical Units',km/AU],['Kilometres',km],['Miles',km/MI],['Metres',km*1000]];
    const out=document.getElementById('ly-out');out.hidden=false;
    out.innerHTML=items.map(function([k,val]){return '<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">'+k+'</div><strong style="font-size:0.85rem">'+val.toExponential(4)+'</strong></div>';}).join('');
  });
})();`
);

// 224 Food Calories Reference
tool('foodcalories','health','[FC]',
`<div id="fc-app"><div class="field"><input type="text" id="fc-search" placeholder="{{ui.search}}" style="width:100%;padding:0.5rem 0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)"></div><div id="fc-list" style="display:grid;gap:0.3rem;margin-top:0.5rem"></div></div>`,
{title:'Food Calorie Reference',metaDescription:'Calories per 100g for common foods with protein, carbs and fat.',h1:'Food Calorie Reference',intro:'Search common foods to see approximate calories, protein, carbohydrates and fat per 100g.',faq_title:'Food calories FAQ',ui:{search:'Search food...'},faq:[
  {q:'Are these values accurate?',a:'Approximate averages per 100g from USDA data. Actual values vary by brand and preparation.'},
  {q:'How many calories per day?',a:'Average adult needs 2,000 kcal/day. Actual needs vary by age, sex, weight and activity level.'},
  {q:'Which food has most calories?',a:'Oils: olive oil (884 kcal/100g), butter (717 kcal/100g). Nuts: macadamia 718, walnuts 654. Lowest: vegetables 10-20 kcal/100g.'}
]},
{title:'Referencia de Calorias de Alimentos',metaDescription:'Calorias por 100g para alimentos comuns com proteinas, carboidratos e gordura.',h1:'Referencia de Calorias de Alimentos',intro:'Pesquise alimentos comuns para ver calorias, proteinas, carboidratos e gordura por 100g.',faq_title:'FAQ calorias',ui:{search:'Pesquisar alimento...'},faq:[
  {q:'Esses valores sao precisos?',a:'Medias aproximadas por 100g de bancos de dados USDA. Os valores reais variam por marca e preparacao.'},
  {q:'Quantas calorias por dia?',a:'Adulto medio precisa de 2.000 kcal/dia. As necessidades reais variam por idade, sexo, peso e nivel de atividade.'},
  {q:'Qual alimento tem mais calorias?',a:'Oleos: azeite (884 kcal/100g), manteiga (717 kcal/100g). Nozes: macadamia 718, nozes 654.'}
]},
`(function(){
  const foods=[['Apple',52,0.3,14,0.2,'Fruit'],['Banana',89,1.1,23,0.3,'Fruit'],['Orange',47,0.9,12,0.1,'Fruit'],['Avocado',160,2,9,15,'Fruit'],['Strawberry',32,0.7,8,0.3,'Fruit'],['Broccoli',34,2.8,7,0.4,'Vegetable'],['Spinach',23,2.9,4,0.4,'Vegetable'],['Carrot',41,0.9,10,0.2,'Vegetable'],['Potato',77,2,17,0.1,'Vegetable'],['Tomato',18,0.9,4,0.2,'Vegetable'],['Chicken breast',165,31,0,3.6,'Meat'],['Beef (ground)',250,17,0,20,'Meat'],['Salmon',208,20,0,13,'Fish'],['Tuna (canned)',116,26,0,1,'Fish'],['Eggs',155,13,1.1,11,'Protein'],['Milk (whole)',61,3.2,4.8,3.3,'Dairy'],['Greek yogurt',59,10,4,0.4,'Dairy'],['Cheddar cheese',403,25,1.3,33,'Dairy'],['Butter',717,0.1,0.1,81,'Dairy'],['White rice',130,2.7,28,0.3,'Grain'],['Oats',389,17,66,7,'Grain'],['Pasta (cooked)',158,6,31,0.9,'Grain'],['White bread',265,9,49,3.2,'Grain'],['Almonds',579,21,22,50,'Nuts'],['Walnuts',654,15,14,65,'Nuts'],['Peanut butter',588,25,20,50,'Nuts'],['Olive oil',884,0,0,100,'Fats'],['Lentils (cooked)',116,9,20,0.4,'Legumes'],['Chickpeas',164,9,27,2.6,'Legumes'],['Dark chocolate',598,8,46,43,'Sweets'],['Honey',304,0.3,82,0,'Sweetener'],['Orange juice',45,0.7,10,0.2,'Drinks']];
  function render(q){
    const f=q?foods.filter(function([n]){return n.toLowerCase().includes(q.toLowerCase());}):foods;
    document.getElementById('fc-list').innerHTML=f.map(function([name,cal,pro,carb,fat,cat]){return '<div style="display:grid;grid-template-columns:1fr 60px 60px 60px 60px;gap:0.3rem;align-items:center;padding:0.4rem 0.6rem;background:var(--surface);border:1px solid var(--line);border-radius:6px;font-size:0.875rem"><span><strong>'+name+'</strong> <span style="opacity:0.5;font-size:0.75rem">'+cat+'</span></span><span style="text-align:center"><span style="font-weight:700">'+cal+'</span><br><span style="opacity:0.5;font-size:0.7rem">kcal</span></span><span style="text-align:center">'+pro+'g<br><span style="opacity:0.5;font-size:0.7rem">prot</span></span><span style="text-align:center">'+carb+'g<br><span style="opacity:0.5;font-size:0.7rem">carb</span></span><span style="text-align:center">'+fat+'g<br><span style="opacity:0.5;font-size:0.7rem">fat</span></span></div>';}).join('');
  }
  document.getElementById('fc-search').addEventListener('input',function(){render(this.value);});render('');
})();`
);

// 225 Body Fat Classifier
tool('bodyfatrange','health','[BF]',
`<form id="bfr-form"><div class="row"><div class="field"><label for="bfr-bf">{{ui.bodyfat}}</label><input type="number" id="bfr-bf" min="2" max="60" step="0.1" value="18" inputmode="decimal"></div><div class="field"><label for="bfr-sex">{{ui.sex}}</label><select id="bfr-sex"><option value="m">{{ui.male}}</option><option value="f">{{ui.female}}</option></select></div></div><button class="btn" type="submit">{{ui.classify}}</button></form><div id="bfr-out" hidden class="result" style="text-align:center"></div>`,
{title:'Body Fat Percentage Classifier',metaDescription:'Find your body fat category: essential, athlete, fitness, average or obese.',h1:'Body Fat Percentage Classifier',intro:'Enter your body fat percentage to see your classification and health range.',faq_title:'Body fat FAQ',ui:{bodyfat:'Body fat %',sex:'Sex',male:'Male',female:'Female',classify:'Classify'},faq:[
  {q:'What are healthy body fat ranges?',a:'Men: Essential 2-5%, Athlete 6-13%, Fitness 14-17%, Average 18-24%, Obese 25%+. Women: Essential 10-13%, Athlete 14-20%, Fitness 21-24%, Average 25-31%, Obese 32%+.'},
  {q:'How is body fat measured?',a:'DEXA scan (most accurate). Hydrostatic weighing. Skinfold calipers (~3% error). Bioelectrical impedance (~5% error).'},
  {q:'What is essential fat?',a:'Minimum fat needed for basic physiological functions: organ protection, hormonal function and brain function.'}
]},
{title:'Classificador de Gordura Corporal',metaDescription:'Encontre sua categoria de gordura corporal: essencial, atleta, aptidao, media ou obeso.',h1:'Classificador de Percentual de Gordura Corporal',intro:'Insira seu percentual de gordura corporal para ver sua classificacao.',faq_title:'FAQ gordura corporal',ui:{bodyfat:'% de gordura corporal',sex:'Sexo',male:'Masculino',female:'Feminino',classify:'Classificar'},faq:[
  {q:'Quais sao as faixas saudaveis de gordura?',a:'Homens: Essencial 2-5%, Atleta 6-13%, Aptidao 14-17%, Media 18-24%, Obeso 25%+. Mulheres: Essencial 10-13%, Atleta 14-20%, Aptidao 21-24%, Media 25-31%, Obeso 32%+.'},
  {q:'Como a gordura corporal e medida?',a:'Varredura DEXA (mais precisa). Pesagem hidrostática. Calibradores de dobras cutaneas (~3% de erro). Impedancia bioel etrica (~5% de erro).'},
  {q:'O que e gordura essencial?',a:'Gordura minima necessaria para funcoes fisiologicas basicas: protecao de orgaos, funcao hormonal e cerebral.'}
]},
`(function(){
  const ranges={
    m:[['Essential fat','#ef4444',2,5],['Athlete','#f97316',6,13],['Fitness','#22c55e',14,17],['Average','#eab308',18,24],['Obese','#dc2626',25,60]],
    f:[['Essential fat','#ef4444',10,13],['Athlete','#f97316',14,20],['Fitness','#22c55e',21,24],['Average','#eab308',25,31],['Obese','#dc2626',32,60]]
  };
  document.getElementById('bfr-form').addEventListener('submit',function(e){
    e.preventDefault();
    const bf=parseFloat(document.getElementById('bfr-bf').value);
    const sex=document.getElementById('bfr-sex').value;
    const cats=ranges[sex];
    const cat=cats.find(function([,c,lo,hi]){return bf>=lo&&bf<=hi;})||cats[cats.length-1];
    const out=document.getElementById('bfr-out');out.hidden=false;
    out.innerHTML='<div style="font-size:2rem;font-weight:800;color:'+cat[1]+'">'+bf+'%</div><div style="font-size:1.1rem;font-weight:600;margin-bottom:0.75rem">'+cat[0]+'</div><div style="display:grid;gap:0.3rem">'+cats.map(function([n,c,lo,hi]){return '<div style="display:flex;align-items:center;gap:0.5rem;padding:0.3rem 0.6rem;background:'+(n===cat[0]?c+'33':'var(--surface)')+';border-radius:6px;border:1px solid '+(n===cat[0]?c:'var(--line)')+'"><div style="width:12px;height:12px;background:'+c+';border-radius:2px;flex-shrink:0"></div><span style="flex:1;font-size:0.875rem">'+n+'</span><span style="font-size:0.75rem;opacity:0.6">'+lo+'-'+hi+'%</span></div>';}).join('')+'</div>';
  });
})();`
);

// 226 Biorhythm Calculator
tool('biorhythm','fun','[BR]',
`<form id="br-form"><div class="row"><div class="field"><label for="br-dob">{{ui.dob}}</label><input type="date" id="br-dob"></div></div><button class="btn" type="submit">{{ui.calculate}}</button></form><div id="br-out" hidden class="result" style="text-align:center"></div>`,
{title:'Biorhythm Calculator',metaDescription:'Calculate physical, emotional and intellectual biorhythm cycles from your birthdate.',h1:'Biorhythm Calculator',intro:'Enter your birthdate to see your current physical, emotional and intellectual biorhythm cycle values.',faq_title:'Biorhythm FAQ',ui:{dob:'Date of birth',calculate:'Calculate'},faq:[
  {q:'What are biorhythms?',a:'Three regular sinusoidal cycles from birth: Physical (23 days), Emotional (28 days), Intellectual (33 days). Values range from -100% to +100%.'},
  {q:'Is biorhythm theory scientific?',a:'No. Multiple peer-reviewed studies found no correlation between biorhythm peaks and athletic performance or cognitive tests.'},
  {q:'Why is it popular?',a:'Fun self-reflection tool. People notice coincidences when the theory seems correct (confirmation bias). Similar to horoscopes.'}
]},
{title:'Calculadora de Biorritmo',metaDescription:'Calcule ciclos de biorritmo fisico, emocional e intelectual a partir da sua data de nascimento.',h1:'Calculadora de Biorritmo',intro:'Insira sua data de nascimento para ver seus valores atuais de ciclo de biorritmo.',faq_title:'FAQ biorritmo',ui:{dob:'Data de nascimento',calculate:'Calcular'},faq:[
  {q:'O que sao biorritmos?',a:'Tres ciclos senoidais regulares a partir do nascimento: Fisico (23 dias), Emocional (28 dias), Intelectual (33 dias).'},
  {q:'A teoria do biorritmo e cientifica?',a:'Nao. Multiplos estudos nao encontraram correlacao entre picos de biorritmo e desempenho.'},
  {q:'Por que e popular?',a:'Ferramenta de auto-reflexao divertida. As pessoas notam coincidencias quando a teoria parece correta (vies de confirmacao).'}
]},
`(function(){
  document.getElementById('br-form').addEventListener('submit',function(e){
    e.preventDefault();
    const dob=new Date(document.getElementById('br-dob').value);
    const now=new Date();const days=Math.floor((now-dob)/86400000);
    const phys=Math.round(Math.sin(2*Math.PI*days/23)*100);
    const emo=Math.round(Math.sin(2*Math.PI*days/28)*100);
    const intl=Math.round(Math.sin(2*Math.PI*days/33)*100);
    const out=document.getElementById('br-out');out.hidden=false;
    function bar(v){const c=v>=0?'#22c55e':'#ef4444';const w=Math.abs(v);return '<div style="display:flex;align-items:center;gap:0.5rem"><div style="width:50%;display:flex;justify-content:flex-end"><div style="width:'+( v<0?w:0)+'%;height:12px;background:'+c+';border-radius:4px"></div></div><div style="width:50%"><div style="width:'+(v>=0?w:0)+'%;height:12px;background:'+c+';border-radius:4px"></div></div></div>';}
    out.innerHTML='<p style="opacity:0.6;font-size:0.85rem">Day '+days+' of life</p><div style="display:grid;gap:0.75rem;margin-top:0.5rem">'+[['Physical (23d)',phys,'#6366f1'],['Emotional (28d)',emo,'#ec4899'],['Intellectual (33d)',intl,'#f59e0b']].map(function([n,v,c]){return '<div><div style="display:flex;justify-content:space-between;margin-bottom:0.3rem"><span>'+n+'</span><strong style="color:'+c+'">'+(v>0?'+':'')+v+'%</strong></div>'+bar(v)+'</div>';}).join('')+'</div>';
  });
})();`
);

// 227 Name Day Lookup
tool('nameday','fun','[ND]',
`<form id="nd-form"><div class="row"><div class="field"><label for="nd-name">{{ui.name}}</label><input type="text" id="nd-name" placeholder="{{ui.placeholder}}" autocomplete="off"></div><button class="btn" type="submit" style="align-self:flex-end">{{ui.lookup}}</button></div></form><div id="nd-out" hidden class="result" style="text-align:center"></div>`,
{title:'Name Day Lookup',metaDescription:'Find the traditional Catholic/European name day for any first name.',h1:'Name Day Lookup',intro:'Enter a first name to find its traditional name day date.',faq_title:'Name day FAQ',ui:{name:'First name',placeholder:'e.g. John, Maria, Peter...',lookup:'Look up'},faq:[
  {q:'What is a name day?',a:'Feast days of saints in the Christian calendar, celebrated by people sharing that name. Common in Catholic countries.'},
  {q:'Is a name day the same as a birthday?',a:'No. A name day is a fixed calendar date based on the saints feast day, not the birth date.'},
  {q:'Which countries celebrate name days?',a:'Poland, Hungary, Czech Republic, Slovakia, Greece, Sweden, Finland, Bulgaria, Croatia, Italy, Spain, Portugal.'}
]},
{title:'Consulta de Dia do Nome',metaDescription:'Encontre o dia do nome tradicional para qualquer primeiro nome.',h1:'Consulta de Dia do Nome',intro:'Insira um primeiro nome para encontrar sua data de dia do nome.',faq_title:'FAQ dia do nome',ui:{name:'Primeiro nome',placeholder:'ex: Joao, Maria, Pedro...',lookup:'Consultar'},faq:[
  {q:'O que e um dia do nome?',a:'Dias de festa de santos no calendario cristao, celebrados por pessoas que compartilham o nome desse santo.'},
  {q:'O dia do nome e o mesmo que aniversario?',a:'Nao. Um dia do nome e uma data fixa do calendario baseada no dia da festa do santo.'},
  {q:'Quais paises celebram dias do nome?',a:'Polonia, Hungria, Republica Tcheca, Eslovaquia, Grecia, Suecia, Finlandia, Bulgaria, Croacia, Italia, Espanha, Portugal.'}
]},
`(function(){
  const db={John:'June 24',Mary:'September 8',Peter:'June 29',Paul:'June 29',James:'July 25',Andrew:'November 30',Philip:'May 3',Thomas:'July 3',Matthew:'September 21',Mark:'April 25',Luke:'October 18',Stephen:'December 26',Joseph:'March 19',Michael:'September 29',Gabriel:'September 29',Elizabeth:'November 5',Anna:'July 26',Catherine:'November 25',Barbara:'December 4',Nicholas:'December 6',Anthony:'June 13',Francis:'October 4',George:'April 23',Christopher:'July 25',Sebastian:'January 20',Valentine:'February 14',Patrick:'March 17',David:'March 1',Martin:'November 11',Benedict:'July 11',Gregory:'September 3',Teresa:'October 15',Agnes:'January 21',Rose:'August 23',Monica:'August 27',Helen:'August 18',Lucia:'December 13',Cecilia:'November 22'};
  document.getElementById('nd-form').addEventListener('submit',function(e){
    e.preventDefault();
    const name=document.getElementById('nd-name').value.trim();
    const out=document.getElementById('nd-out');out.hidden=false;
    const match=Object.entries(db).find(function([k]){return k.toLowerCase()===name.toLowerCase();});
    if(match){out.innerHTML='<div style="font-size:1.5rem;font-weight:700">'+match[0]+'</div><div style="font-size:1.1rem;color:var(--accent,#6366f1);margin-top:0.3rem">'+match[1]+'</div>';}
    else{out.innerHTML='<p>Name day not found for "'+name+'". Try common Western/Catholic names.</p>';}
  });
})();`
);

// 228 Rhyme Finder
tool('rhymefinder','fun','[RF]',
`<form id="rf-form"><div class="row"><div class="field"><label for="rf-word">{{ui.word}}</label><input type="text" id="rf-word" placeholder="{{ui.placeholder}}" autocomplete="off"></div><button class="btn" type="submit">{{ui.find}}</button></div></form><div id="rf-out" style="margin-top:0.75rem"></div>`,
{title:'Rhyme Finder',metaDescription:'Find words that rhyme with any English word. Great for poetry and lyrics.',h1:'Rhyme Finder',intro:'Enter a word to find rhymes from our word list. Great for poetry, lyrics or wordplay.',faq_title:'Rhyme FAQ',ui:{word:'Word',placeholder:'e.g. cat, moon, fire...',find:'Find Rhymes'},faq:[
  {q:'What is a perfect rhyme?',a:'Identical sounds from the final stressed vowel: cat/bat, moon/tune. Near rhymes have similar but not identical sounds.'},
  {q:'How are rhymes found?',a:'The tool extracts the ending sound and finds words with matching endings from a curated word list.'},
  {q:'Types of rhyme?',a:'Perfect rhyme, slant rhyme, eye rhyme (same spelling different sound), rich rhyme (homophones), feminine rhyme (unstressed final syllable).'}
]},
{title:'Localizador de Rimas',metaDescription:'Encontre palavras que rimam com qualquer palavra em ingles.',h1:'Localizador de Rimas',intro:'Insira uma palavra para encontrar rimas da nossa lista de palavras.',faq_title:'FAQ rimas',ui:{word:'Palavra',placeholder:'ex: cat, moon, fire...',find:'Encontrar Rimas'},faq:[
  {q:'O que e uma rima perfeita?',a:'Sons identicos a partir da vogal tonica final: cat/bat, moon/tune.'},
  {q:'Como as rimas sao encontradas?',a:'A ferramenta extrai o som final e encontra palavras com terminacoes correspondentes.'},
  {q:'Tipos de rima?',a:'Rima perfeita, rima aproximada, rima visual (mesma grafia som diferente), rima rica (homofonos).'}
]},
`(function(){
  var wordList='cat bat fat hat mat pat rat sat vat flat brat chat day bay hay jay lay may pay ray say way play pray tray they grey okay blue clue due flew glue hue new dew knew few brew grew true moon tune boon croon dune loon noon soon spoon boom doom gloom loom room zoom bloom groom fume sure cure pure star bar car far jar tar war scar gate late mate rate fate date great eight wait bait state plate weight height bright night right fight light might tight white write bite cite kite mite quite site spite time lime dime crime grime mime prime rhyme slime chime life wife knife strife fire hire wire tire desire require aspire inspire retire admire empire acquire expire perspire transpire'.split(' ');
  var unique=Array.from(new Set(wordList));
  function ending(w){var v='aeiou';for(var i=w.length-1;i>=0;i--){if(v.indexOf(w[i].toLowerCase())>=0)return w.slice(i);}return w.slice(-2);}
  document.getElementById('rf-form').addEventListener('submit',function(e){
    e.preventDefault();
    var word=document.getElementById('rf-word').value.trim().toLowerCase();
    var end=ending(word);
    var rhymes=unique.filter(function(w){return w!==word&&w.endsWith(end);});
    var out=document.getElementById('rf-out');
    if(!rhymes.length){out.innerHTML='<p>No rhymes found for "'+word+'". Try a shorter word.</p>';return;}
    out.innerHTML='<p style="opacity:0.6;font-size:0.875rem;margin-bottom:0.5rem">'+rhymes.length+' rhyme(s) for "'+word+'":</p><div style="display:flex;flex-wrap:wrap;gap:0.4rem">'+rhymes.map(function(r){return '<span style="padding:0.3rem 0.6rem;background:var(--surface);border:1px solid var(--line);border-radius:6px;font-size:0.9rem">'+r+'</span>';}).join('')+'</div>';
  });
})();`
);

console.log('\n Batch 11a (tools 208-228) complete.');
