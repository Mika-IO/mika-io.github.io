#!/usr/bin/env node
// gen-batch11c.mjs — final 4 tools to reach 250
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

function tool(slug, category, icon, widget, en, pt, jsLines) {
  console.log(`\n[${slug}]`);
  const config = { slug, category, icon, script: `${slug}.js`, widget, strings: { en, pt } };
  write(`data/tools/${slug}.json`, JSON.stringify(config, null, 2));
  write(`public/assets/tools/${slug}.js`, jsLines.join('\n'));
}

// 247 - ASL Finger Spelling
tool('fingerspelling', 'fun', '[FS]',
`<div id="fs-app" style="text-align:center"><div class="field"><input type="text" id="fs-in" placeholder="Type text to finger spell..." style="width:100%;padding:0.5rem 0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text);font-size:1.1rem"></div><div id="fs-out" style="display:flex;flex-wrap:wrap;gap:0.4rem;margin-top:0.75rem;justify-content:center"></div></div>`,
{title:'ASL Finger Spelling Reference',metaDescription:'See the ASL (American Sign Language) finger spelling for any word or letter.',h1:'ASL Finger Spelling',intro:'Type any text to see the ASL finger spelling description for each letter.',faq_title:'ASL FAQ',ui:{},faq:[
  {q:'What is finger spelling?',a:'Representing each letter with a specific hand shape. Used in sign languages to spell out names and words without a sign.'},
  {q:'Is ASL the same everywhere?',a:'No. ASL is used in North America. British Sign Language (BSL) uses a two-handed alphabet.'},
  {q:'How do I learn ASL?',a:'Start with the manual alphabet. Practice with a mirror. Take ASL classes or use the ASL Dictionary app.'}
]},
{title:'Referencia de Soletramento Digital ASL',metaDescription:'Veja o soletramento digital ASL para qualquer palavra ou letra.',h1:'Soletramento Digital ASL',intro:'Digite qualquer texto para ver a descricao do soletramento digital ASL para cada letra.',faq_title:'FAQ ASL',ui:{},faq:[
  {q:'O que e soletramento digital?',a:'Representar cada letra com uma forma especifica de mao. Usado em linguas de sinais para soletrar nomes.'},
  {q:'O ASL e o mesmo em todo o mundo?',a:'Nao. O ASL e usado na America do Norte. A BSL usa um alfabeto bimanual.'},
  {q:'Como aprendo ASL?',a:'Comece com o alfabeto manual. Pratique com um espelho.'}
]},
[
'(function(){',
'  var asl={A:"fist, thumb side",B:"four fingers up, thumb across",C:"curved C-shape",D:"index up, others curved",',
'    E:"all fingers bent",F:"index-thumb circle, others up",G:"index-thumb point side",H:"index-middle out side",',
'    I:"pinky up",J:"pinky, trace J",K:"index-middle V shape",L:"L-shape index up, thumb out",',
'    M:"three fingers over thumb",N:"two fingers over thumb",O:"O-shape all fingers",P:"K-shape pointing down",',
'    Q:"G-shape pointing down",R:"index-middle crossed",S:"fist, thumb over",T:"thumb between index-middle",',
'    U:"index-middle together up",V:"V peace sign",W:"three fingers up",X:"index hook",',
'    Y:"pinky and thumb out",Z:"index traces Z"};',
'  document.getElementById("fs-in").addEventListener("input",function(){',
'    var chars=this.value.toUpperCase().split("");',
'    document.getElementById("fs-out").innerHTML=chars.map(function(c){',
'      if(c===" ")return "<div style=\\"width:1rem\\"></div>";',
'      var desc=asl[c]||"?";',
'      return "<div style=\\"background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.6rem;min-width:60px;text-align:center\\"><div style=\\"font-size:1.3rem;font-weight:800\\">"+c+"</div><div style=\\"font-size:0.6rem;opacity:0.6;line-height:1.2;max-width:80px\\">"+desc+"</div></div>";',
'    }).join("");',
'  });',
'})();',
]
);

// 248 - Tip Split Calculator (different from tipping guide - calculates per-person)
tool('tipsplit', 'finance', '[$]',
`<form id="ts-form"><div class="row"><div class="field"><label for="ts-bill">Bill amount ($)</label><input type="number" id="ts-bill" step="0.01" value="80" inputmode="decimal"></div><div class="field"><label for="ts-tip">Tip %</label><input type="number" id="ts-tip" step="1" value="18" min="0" max="100" inputmode="numeric"></div><div class="field"><label for="ts-people">People</label><input type="number" id="ts-people" step="1" value="4" min="1" inputmode="numeric"></div></div><button class="btn" type="submit">Calculate</button></form><div id="ts-out" hidden class="result" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:0.5rem;text-align:center"></div>`,
{title:'Tip and Bill Split Calculator',metaDescription:'Calculate tip amount and split the bill evenly between multiple people.',h1:'Tip and Bill Split Calculator',intro:'Enter the bill total, tip percentage and number of people to calculate tip amount and per-person share.',faq_title:'Tip split FAQ',ui:{},faq:[
  {q:'How much should I tip?',a:'US restaurants: 15-20%. Bars: 15-20%. Taxi: 10-15%. Hotel porter: $1-2/bag. Fast food: no tip expected.'},
  {q:'Should I tip before or after tax?',a:'Tip on pre-tax amount strictly. Many people tip on the post-tax total - both are acceptable.'},
  {q:'What if one person ordered more?',a:'For fairness, consider itemized splitting or use a dedicated bill-splitting app for unequal orders.'}
]},
{title:'Calculadora de Gorjeta e Divisao de Conta',metaDescription:'Calcule o valor da gorjeta e divida a conta igualmente entre multiplas pessoas.',h1:'Calculadora de Gorjeta e Divisao de Conta',intro:'Insira o total da conta, percentual de gorjeta e numero de pessoas para calcular a gorjeta e a cota por pessoa.',faq_title:'FAQ divisao de conta',ui:{},faq:[
  {q:'Quanto devo dar de gorjeta?',a:'Restaurantes americanos: 15-20%. Bares: 15-20%. Taxi: 10-15%.'},
  {q:'Devo dar gorjeta antes ou apos os impostos?',a:'Gorjeta sobre o valor antes dos impostos e tecnicamente correto. Muitas pessoas dao gorjeta sobre o total pos-imposto.'},
  {q:'E se uma pessoa pediu mais?',a:'Para maior justica, considere divisao itemizada ou use um aplicativo dedicado a divisao de contas.'}
]},
[
'(function(){',
'  document.getElementById("ts-form").addEventListener("submit",function(e){',
'    e.preventDefault();',
'    var bill=parseFloat(document.getElementById("ts-bill").value);',
'    var tipPct=parseFloat(document.getElementById("ts-tip").value);',
'    var people=parseInt(document.getElementById("ts-people").value);',
'    var tipAmt=bill*tipPct/100;',
'    var total=bill+tipAmt;',
'    var perPerson=total/people;',
'    var tipPer=tipAmt/people;',
'    var out=document.getElementById("ts-out");out.hidden=false;',
'    var items=[',
'      ["Tip amount","$"+tipAmt.toFixed(2)],',
'      ["Total with tip","$"+total.toFixed(2)],',
'      ["Per person","$"+perPerson.toFixed(2)],',
'      ["Tip per person","$"+tipPer.toFixed(2)]',
'    ];',
'    out.innerHTML=items.map(function(kv){',
'      return "<div style=\\"background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.6rem 0.75rem\\"><div style=\\"font-size:0.75rem;opacity:0.6\\">"+kv[0]+"</div><strong style=\\"font-size:1.3rem\\">"+kv[1]+"</strong></div>";',
'    }).join("");',
'  });',
'})();',
]
);

// 249 - Fuel Cost Calculator
tool('fuelcost', 'finance', '[$]',
`<form id="fc2-form"><div class="row"><div class="field"><label for="fc2-dist">Distance</label><input type="number" id="fc2-dist" step="any" value="100" inputmode="decimal"></div><div class="field"><label for="fc2-dunit">Unit</label><select id="fc2-dunit"><option value="miles">Miles</option><option value="km">Kilometres</option></select></div></div><div class="row"><div class="field"><label for="fc2-mpg">Fuel efficiency</label><input type="number" id="fc2-mpg" step="any" value="30" inputmode="decimal"></div><div class="field"><label for="fc2-eunit">Unit</label><select id="fc2-eunit"><option value="mpg">MPG</option><option value="L100">L/100km</option><option value="kpl">km/L</option></select></div></div><div class="row"><div class="field"><label for="fc2-price">Fuel price per gallon/L ($)</label><input type="number" id="fc2-price" step="any" value="3.50" inputmode="decimal"></div><div class="field"><label for="fc2-punit">Price unit</label><select id="fc2-punit"><option value="gal">per gallon</option><option value="L">per litre</option></select></div></div><button class="btn" type="submit">Calculate</button></form><div id="fc2-out" hidden class="result" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:0.5rem;text-align:center"></div>`,
{title:'Fuel Cost Calculator',metaDescription:'Calculate fuel cost for any trip given distance, fuel efficiency and price.',h1:'Fuel Cost Calculator',intro:'Enter distance, fuel efficiency and price per gallon or litre to estimate the fuel cost of any trip.',faq_title:'Fuel cost FAQ',ui:{},faq:[
  {q:'What is MPG?',a:'Miles per gallon: how many miles you can drive on one US gallon (3.785 litres). Higher = more efficient.'},
  {q:'How do I convert MPG to L/100km?',a:'L/100km = 235.21 / MPG. Example: 30 MPG = 235.21/30 = 7.84 L/100km.'},
  {q:'What affects fuel economy?',a:'Speed (highway vs city), tyre pressure, AC use, payload weight, terrain, engine health and driving style all affect real-world MPG.'}
]},
{title:'Calculadora de Custo de Combustivel',metaDescription:'Calcule o custo de combustivel para qualquer viagem dado distancia, eficiencia e preco.',h1:'Calculadora de Custo de Combustivel',intro:'Insira distancia, eficiencia de combustivel e preco por galon ou litro para estimar o custo de combustivel.',faq_title:'FAQ custo de combustivel',ui:{},faq:[
  {q:'O que e MPG?',a:'Milhas por galon: quantas milhas voce pode dirigir com um galon americano. Quanto maior, mais eficiente.'},
  {q:'Como converter MPG para L/100km?',a:'L/100km = 235,21 / MPG. Exemplo: 30 MPG = 235,21/30 = 7,84 L/100km.'},
  {q:'O que afeta a economia de combustivel?',a:'Velocidade, pressao dos pneus, uso do ar condicionado, peso da carga, terreno e estilo de conducao.'}
]},
[
'(function(){',
'  document.getElementById("fc2-form").addEventListener("submit",function(e){',
'    e.preventDefault();',
'    var dist=parseFloat(document.getElementById("fc2-dist").value);',
'    var dunit=document.getElementById("fc2-dunit").value;',
'    var eff=parseFloat(document.getElementById("fc2-mpg").value);',
'    var eunit=document.getElementById("fc2-eunit").value;',
'    var price=parseFloat(document.getElementById("fc2-price").value);',
'    var punit=document.getElementById("fc2-punit").value;',
'    // Convert everything to miles and gallons',
'    var miles=dunit==="km"?dist*0.621371:dist;',
'    var mpg;',
'    if(eunit==="mpg")mpg=eff;',
'    else if(eunit==="L100")mpg=235.21/eff;',
'    else mpg=eff*2.352; // km/L to mpg',
'    var pricePerGal=punit==="L"?price*3.785:price;',
'    var gallons=miles/mpg;',
'    var cost=gallons*pricePerGal;',
'    var costPerMile=cost/miles;',
'    var out=document.getElementById("fc2-out");out.hidden=false;',
'    var items=[',
'      ["Total fuel cost","$"+cost.toFixed(2)],',
'      ["Fuel used",gallons.toFixed(2)+" gal / "+(gallons*3.785).toFixed(1)+" L"],',
'      ["Cost per mile","$"+costPerMile.toFixed(3)],',
'      ["Distance",miles.toFixed(1)+" mi / "+(miles*1.60934).toFixed(1)+" km"]',
'    ];',
'    out.innerHTML=items.map(function(kv){',
'      return "<div style=\\"background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.6rem 0.75rem\\"><div style=\\"font-size:0.75rem;opacity:0.6\\">"+kv[0]+"</div><strong style=\\"font-size:0.95rem\\">"+kv[1]+"</strong></div>";',
'    }).join("");',
'  });',
'})();',
]
);

// 250 - Loan EMI Calculator
tool('emicalculator', 'finance', '[$]',
`<form id="emi-form"><div class="row"><div class="field"><label for="emi-p">Loan amount ($)</label><input type="number" id="emi-p" step="any" value="10000" inputmode="decimal"></div><div class="field"><label for="emi-r">Annual interest rate (%)</label><input type="number" id="emi-r" step="any" value="8.5" inputmode="decimal"></div><div class="field"><label for="emi-n">Loan term (months)</label><input type="number" id="emi-n" step="1" value="36" inputmode="numeric"></div></div><button class="btn" type="submit">Calculate EMI</button></form><div id="emi-out" hidden class="result" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:0.5rem;text-align:center"></div>`,
{title:'Loan EMI Calculator',metaDescription:'Calculate monthly EMI, total interest and total payment for any loan.',h1:'Loan EMI Calculator',intro:'Enter loan amount, annual interest rate and term to calculate your monthly EMI (Equated Monthly Installment) and total cost.',faq_title:'EMI FAQ',ui:{},faq:[
  {q:'What is EMI?',a:'Equated Monthly Installment: fixed monthly payment covering both principal and interest. Formula: EMI = P x r x (1+r)^n / ((1+r)^n - 1) where r is monthly interest rate.'},
  {q:'How does interest rate affect EMI?',a:'Higher interest rate = higher EMI and much more total interest paid. A 1% rate increase on a $200k 30-year mortgage adds ~$130/month.'},
  {q:'Should I choose a shorter or longer term?',a:'Shorter term: higher EMI but much less total interest. Longer term: lower EMI but much more total interest paid overall.'}
]},
{title:'Calculadora de EMI de Emprestimo',metaDescription:'Calcule EMI mensal, juros totais e pagamento total para qualquer emprestimo.',h1:'Calculadora de EMI de Emprestimo',intro:'Insira o valor do emprestimo, taxa de juros anual e prazo para calcular seu EMI mensal e custo total.',faq_title:'FAQ EMI',ui:{},faq:[
  {q:'O que e EMI?',a:'Prestacao Mensal Equivalente: pagamento mensal fixo cobrindo principal e juros. Formula: EMI = P x r x (1+r)^n / ((1+r)^n - 1).'},
  {q:'Como a taxa de juros afeta o EMI?',a:'Taxa de juros mais alta = EMI mais alto e muito mais juros totais pagos.'},
  {q:'Devo escolher um prazo mais curto ou mais longo?',a:'Prazo mais curto: EMI mais alto mas muito menos juros totais. Prazo mais longo: EMI mais baixo mas muito mais juros totais.'}
]},
[
'(function(){',
'  document.getElementById("emi-form").addEventListener("submit",function(e){',
'    e.preventDefault();',
'    var P=parseFloat(document.getElementById("emi-p").value);',
'    var annualR=parseFloat(document.getElementById("emi-r").value);',
'    var n=parseInt(document.getElementById("emi-n").value);',
'    var r=annualR/(12*100);',
'    var emi;',
'    if(r===0){emi=P/n;}else{var pow=Math.pow(1+r,n);emi=P*r*pow/(pow-1);}',
'    var totalPayment=emi*n;',
'    var totalInterest=totalPayment-P;',
'    var out=document.getElementById("emi-out");out.hidden=false;',
'    var items=[',
'      ["Monthly EMI","$"+emi.toFixed(2)],',
'      ["Total interest","$"+totalInterest.toFixed(2)],',
'      ["Total payment","$"+totalPayment.toFixed(2)],',
'      ["Interest ratio",(totalInterest/P*100).toFixed(1)+"%"]',
'    ];',
'    out.innerHTML=items.map(function(kv){',
'      return "<div style=\\"background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.6rem 0.75rem\\"><div style=\\"font-size:0.75rem;opacity:0.6\\">"+kv[0]+"</div><strong style=\\"font-size:1.2rem\\">"+kv[1]+"</strong></div>";',
'    }).join("");',
'  });',
'})();',
]
);

const total = require('fs').readdirSync(require('path').join(process.cwd(),'data/tools')).filter(f=>f.endsWith('.json')).length;
console.log('\nBatch 11c complete.');
console.log('Grand total tools:', total);
