#!/usr/bin/env node
// gen-batch10.mjs — tools 187-207 (health, finance, productivity, math)
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

// ─── 187 ── Macro Ratio Calculator ────────────────────────────────────────────
tool('macroratio', 'health', '🥗',
  `<form id="mr-form"><div class="row"><div class="field"><label for="mr-cal">{{ui.calories}}</label><input type="number" id="mr-cal" min="1" step="1" value="2000" inputmode="numeric"></div><div class="field"><label for="mr-goal">{{ui.goal}}</label><select id="mr-goal"><option value="balanced">{{ui.balanced}}</option><option value="lowcarb">{{ui.lowCarb}}</option><option value="keto">{{ui.keto}}</option><option value="highcarb">{{ui.highCarb}}</option><option value="highprotein">{{ui.highProtein}}</option></select></div></div><button class="btn" type="submit" style="margin-top:0.5rem">{{ui.calculate}}</button></form><div id="mr-out" hidden class="result" style="display:grid;grid-template-columns:repeat(3,1fr);gap:0.75rem;text-align:center"></div>`,
  { title:'Macro Ratio Calculator — calculate protein, carbs and fat in grams', metaDescription:'Free macro ratio calculator. Enter your daily calorie target and diet goal to get optimal protein, carbohydrate and fat grams per day.', h1:'Macro Ratio Calculator', intro:'Enter your daily calories and diet goal to calculate how many grams of protein, carbohydrates and fat you should eat each day.', faq_title:'Macro ratio FAQ', ui:{ calories:'Daily calories', goal:'Diet goal', balanced:'Balanced (30/40/30)', lowCarb:'Low Carb (35/25/40)', keto:'Keto (25/5/70)', highCarb:'High Carb (25/55/20)', highProtein:'High Protein (40/35/25)', calculate:'Calculate' }, faq:[
    { q:'What are macronutrients?', a:'Macronutrients are the three main categories of nutrients providing energy: Protein (4 kcal/g), Carbohydrates (4 kcal/g), and Fat (9 kcal/g). Alcohol also provides energy (7 kcal/g) but is not a macronutrient.' },
    { q:'How much protein do I need?', a:'For most active people: 1.6–2.2g per kg of body weight per day. Higher protein helps preserve muscle during fat loss and supports muscle growth during resistance training. The calculator provides a starting point based on total calories.' },
    { q:'Is the ketogenic diet effective?', a:'Keto (very low carb, high fat) can effectively reduce body fat and improve some metabolic markers. However, adherence is challenging and the optimal long-term diet varies by individual. Consult a dietitian for personalised advice.' }
  ]},
  { title:'Calculadora de Proporção de Macros — calcular proteínas, carboidratos e gorduras em gramas', metaDescription:'Calculadora de proporção de macros gratuita. Insira sua meta calórica diária e objetivo de dieta para obter proteínas, carboidratos e gramas de gordura ótimos por dia.', h1:'Calculadora de Proporção de Macros', intro:'Insira suas calorias diárias e objetivo de dieta para calcular quantos gramas de proteína, carboidratos e gordura você deve comer por dia.', faq_title:'Perguntas frequentes sobre proporção de macros', ui:{ calories:'Calorias diárias', goal:'Objetivo de dieta', balanced:'Equilibrado (30/40/30)', lowCarb:'Baixo Carboidrato (35/25/40)', keto:'Keto (25/5/70)', highCarb:'Alto Carboidrato (25/55/20)', highProtein:'Alta Proteína (40/35/25)', calculate:'Calcular' }, faq:[
    { q:'O que são macronutrientes?', a:'Macronutrientes são as três principais categorias de nutrientes que fornecem energia: Proteína (4 kcal/g), Carboidratos (4 kcal/g) e Gordura (9 kcal/g).' },
    { q:'Quanta proteína preciso?', a:'Para a maioria das pessoas ativas: 1,6–2,2g por kg de peso corporal por dia. Proteína mais alta ajuda a preservar músculo durante a perda de gordura.' },
    { q:'A dieta cetogênica é eficaz?', a:'Keto pode efetivamente reduzir a gordura corporal e melhorar alguns marcadores metabólicos. No entanto, a adesão é desafiadora. Consulte um nutricionista para conselhos personalizados.' }
  ]},
  `(function(){
  const ratios={balanced:[0.30,0.40,0.30],lowcarb:[0.35,0.25,0.40],keto:[0.25,0.05,0.70],highcarb:[0.25,0.55,0.20],highprotein:[0.40,0.35,0.25]};
  document.getElementById('mr-form').addEventListener('submit',function(e){
    e.preventDefault();
    const cal=parseFloat(document.getElementById('mr-cal').value);
    const goal=document.getElementById('mr-goal').value;
    const [p,c,f]=ratios[goal];
    const pCal=cal*p,cCal=cal*c,fCal=cal*f;
    const pG=pCal/4,cG=cCal/4,fG=fCal/9;
    const out=document.getElementById('mr-out');out.hidden=false;
    const fmt=n=>Math.round(n);
    out.innerHTML=[['Protein',fmt(pG)+'g',Math.round(p*100)+'%','#6366f1'],['Carbs',fmt(cG)+'g',Math.round(c*100)+'%','#f59e0b'],['Fat',fmt(fG)+'g',Math.round(f*100)+'%','#ec4899']].map(([n,g,pct,c2])=>\`<div style="background:var(--surface);border:2px solid \${c2};border-radius:12px;padding:0.75rem"><div style="font-size:0.75rem;opacity:0.6">\${n}</div><div style="font-size:1.8rem;font-weight:800;color:\${c2}">\${g}</div><div style="font-size:0.85rem;opacity:0.7">\${pct} of calories</div></div>\`).join('');
  });
})();`
);

// ─── 188 ── Heart Rate Zone Calculator ────────────────────────────────────────
tool('heartratezones', 'health', '❤️',
  `<form id="hrz-form"><div class="row"><div class="field"><label for="hrz-age">{{ui.age}}</label><input type="number" id="hrz-age" min="10" max="100" value="30" inputmode="numeric"></div><div class="field"><label for="hrz-rhr">{{ui.rhr}}</label><input type="number" id="hrz-rhr" min="30" max="120" value="60" inputmode="numeric"></div><div class="field"><label for="hrz-method">{{ui.method}}</label><select id="hrz-method"><option value="karvonen">Karvonen</option><option value="simple">Max % Simple</option></select></div></div><button class="btn" type="submit">{{ui.calculate}}</button></form><div id="hrz-out" hidden style="margin-top:0.75rem"></div>`,
  { title:'Heart Rate Zone Calculator — find your training heart rate zones', metaDescription:'Free heart rate zone calculator. Enter your age and resting heart rate to find your 5 training zones: fat burn, aerobic, anaerobic and VO2 max.', h1:'Heart Rate Zone Calculator', intro:'Calculate your 5 heart rate training zones based on your age and resting heart rate. Uses the Karvonen formula for accuracy.', faq_title:'Heart rate zone FAQ', ui:{ age:'Age', rhr:'Resting heart rate (bpm)', method:'Formula', calculate:'Calculate' }, faq:[
    { q:'What are heart rate zones?', a:'Zones 1-5 represent intensity levels based on percentage of max heart rate. Zone 1 (50-60%): recovery. Zone 2 (60-70%): fat burn/aerobic base. Zone 3 (70-80%): aerobic. Zone 4 (80-90%): anaerobic threshold. Zone 5 (90-100%): VO2 max/sprint.' },
    { q:'What is the Karvonen formula?', a:'Target HR = Resting HR + (Max HR − Resting HR) × intensity%. This uses Heart Rate Reserve (HRR) which accounts for your fitness level. More accurate than simple max HR percentage, especially for fit individuals.' },
    { q:'How do I measure my resting heart rate?', a:'Measure first thing in the morning before getting up. Count beats for 60 seconds or 30 seconds and double. Normal adult RHR: 60–100 bpm. Athletes: 40–60 bpm. Lower RHR generally indicates better cardiovascular fitness.' }
  ]},
  { title:'Calculadora de Zona de Frequência Cardíaca — encontrar suas zonas de treino', metaDescription:'Calculadora de zona de frequência cardíaca gratuita. Insira sua idade e frequência cardíaca em repouso para encontrar suas 5 zonas de treino: queima de gordura, aeróbico, anaeróbico e VO2 máx.', h1:'Calculadora de Zona de Frequência Cardíaca', intro:'Calcule suas 5 zonas de treino de frequência cardíaca com base na sua idade e frequência cardíaca em repouso.', faq_title:'Perguntas frequentes sobre zona de frequência cardíaca', ui:{ age:'Idade', rhr:'Frequência cardíaca em repouso (bpm)', method:'Fórmula', calculate:'Calcular' }, faq:[
    { q:'O que são zonas de frequência cardíaca?', a:'Zonas 1-5 representam níveis de intensidade baseados na porcentagem da frequência cardíaca máxima. Zona 1 (50-60%): recuperação. Zona 2 (60-70%): queima de gordura. Zona 3 (70-80%): aeróbico. Zona 4 (80-90%): limiar anaeróbico. Zona 5 (90-100%): VO2 máx.' },
    { q:'O que é a fórmula de Karvonen?', a:'FC alvo = FC em repouso + (FC máx − FC em repouso) × intensidade%. Usa a Reserva de Frequência Cardíaca (RFC) que leva em conta seu nível de condicionamento físico.' },
    { q:'Como medir minha frequência cardíaca em repouso?', a:'Meça logo pela manhã antes de se levantar. Conte as batidas por 60 segundos. FC em repouso normal de adulto: 60–100 bpm. Atletas: 40–60 bpm.' }
  ]},
  `(function(){
  const zones=[['Zone 1 — Recovery',0.50,0.60,'#22c55e'],['Zone 2 — Fat Burn',0.60,0.70,'#84cc16'],['Zone 3 — Aerobic',0.70,0.80,'#eab308'],['Zone 4 — Anaerobic',0.80,0.90,'#f97316'],['Zone 5 — VO2 Max',0.90,1.00,'#ef4444']];
  document.getElementById('hrz-form').addEventListener('submit',function(e){
    e.preventDefault();
    const age=parseInt(document.getElementById('hrz-age').value);
    const rhr=parseInt(document.getElementById('hrz-rhr').value);
    const method=document.getElementById('hrz-method').value;
    const maxHR=220-age;
    const hrr=maxHR-rhr;
    const out=document.getElementById('hrz-out');out.hidden=false;
    out.innerHTML='<p style="opacity:0.6;font-size:0.875rem;margin-bottom:0.5rem">Max HR: '+maxHR+' bpm · HRR: '+hrr+' bpm</p><div style="display:grid;gap:0.5rem">'+zones.map(([name,lo,hi,color])=>{
      const low=method==='karvonen'?Math.round(rhr+hrr*lo):Math.round(maxHR*lo);
      const high=method==='karvonen'?Math.round(rhr+hrr*hi):Math.round(maxHR*hi);
      return \`<div style="display:flex;align-items:center;gap:0.75rem;padding:0.5rem 0.75rem;background:var(--surface);border-left:4px solid \${color};border-radius:0 8px 8px 0"><div style="flex:1;font-weight:600;font-size:0.9rem">\${name}</div><div style="font-family:monospace;font-size:0.9rem">\${low}–\${high} bpm</div></div>\`;
    }).join('')+'</div>';
  });
})();`
);

// ─── 189 ── Pregnancy Week Calculator ─────────────────────────────────────────
tool('pregnancyweek', 'health', '🤰',
  `<form id="pw-form"><div class="row"><div class="field"><label for="pw-lmp">{{ui.lmp}}</label><input type="date" id="pw-lmp"></div><div class="field"><label for="pw-method">{{ui.method}}</label><select id="pw-method"><option value="lmp">{{ui.lastPeriod}}</option><option value="conception">{{ui.conception}}</option></select></div></div><button class="btn" type="submit">{{ui.calculate}}</button></form><div id="pw-out" hidden class="result" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:0.5rem"></div>`,
  { title:'Pregnancy Week Calculator — find current week and due date', metaDescription:'Free pregnancy calculator. Enter your last menstrual period date to find your current pregnancy week, trimester and estimated due date.', h1:'Pregnancy Week Calculator', intro:'Enter your last menstrual period (LMP) date to calculate your current pregnancy week, trimester and estimated due date (EDD).', faq_title:'Pregnancy calculator FAQ', ui:{ lmp:'Date', method:'Start from', lastPeriod:'Last menstrual period (LMP)', conception:'Conception date', calculate:'Calculate' }, faq:[
    { q:'How is the due date calculated?', a:'The standard method (Naegele\'s Rule): add 280 days (40 weeks) to the first day of your last menstrual period. This assumes a 28-day cycle. Your actual due date may vary by +/- 2 weeks. Ultrasound dating is more accurate.' },
    { q:'What are the trimesters?', a:'First trimester: weeks 1–12. Second trimester: weeks 13–26. Third trimester: weeks 27–40. Most pregnancies last 38–42 weeks. A baby born before 37 weeks is considered premature.' },
    { q:'Is this medically accurate?', a:'This is a general estimate. Actual gestational age is best confirmed by your healthcare provider through ultrasound. This tool is for informational purposes only and should not replace professional medical advice.' }
  ]},
  { title:'Calculadora de Semana de Gravidez — encontrar semana atual e data prevista do parto', metaDescription:'Calculadora de gravidez gratuita. Insira a data do último período menstrual para encontrar sua semana de gravidez atual, trimestre e data estimada do parto.', h1:'Calculadora de Semana de Gravidez', intro:'Insira a data do seu último período menstrual (UPM) para calcular sua semana de gravidez atual, trimestre e data estimada do parto (DPP).', faq_title:'Perguntas frequentes sobre calculadora de gravidez', ui:{ lmp:'Data', method:'Começar de', lastPeriod:'Último período menstrual (UPM)', conception:'Data de concepção', calculate:'Calcular' }, faq:[
    { q:'Como a data do parto é calculada?', a:'O método padrão (Regra de Naegele): adicione 280 dias (40 semanas) ao primeiro dia do seu último período menstrual. Isso pressupõe um ciclo de 28 dias.' },
    { q:'O que são os trimestres?', a:'Primeiro trimestre: semanas 1–12. Segundo trimestre: semanas 13–26. Terceiro trimestre: semanas 27–40. A maioria das gestações dura 38–42 semanas.' },
    { q:'Isto é médicamente preciso?', a:'Esta é uma estimativa geral. A idade gestacional real é melhor confirmada pelo seu profissional de saúde por ultrassom. Esta ferramenta é apenas para fins informativos.' }
  ]},
  `(function(){
  document.getElementById('pw-form').addEventListener('submit',function(e){
    e.preventDefault();
    const dateVal=document.getElementById('pw-lmp').value;
    const method=document.getElementById('pw-method').value;
    if(!dateVal)return;
    let lmp=new Date(dateVal);
    if(method==='conception')lmp=new Date(lmp.getTime()-14*86400000);
    const now=new Date();
    const diffDays=Math.floor((now-lmp)/86400000);
    const weeks=Math.floor(diffDays/7);const days=diffDays%7;
    const edd=new Date(lmp.getTime()+280*86400000);
    const trimester=weeks<=12?'1st':weeks<=26?'2nd':'3rd';
    const daysLeft=Math.max(0,Math.round((edd-now)/86400000));
    const out=document.getElementById('pw-out');out.hidden=false;
    const items=[['Current week',weeks+' weeks '+days+' days'],['Trimester',trimester],['Due date (EDD)',edd.toDateString()],['Days remaining',daysLeft+' days'],['LMP',lmp.toDateString()]];
    out.innerHTML=items.map(([k,v])=>\`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">\${k}</div><strong>\${v}</strong></div>\`).join('');
  });
})();`
);

// ─── 190 ── Vitamin D Sun Exposure Calculator ─────────────────────────────────
tool('vitamindcalc', 'health', '☀️',
  `<form id="vd-form"><div class="row"><div class="field"><label for="vd-skin">{{ui.skin}}</label><select id="vd-skin"><option value="1">{{ui.veryLight}}</option><option value="2" selected>{{ui.light}}</option><option value="3">{{ui.medium}}</option><option value="4">{{ui.dark}}</option><option value="5">{{ui.veryDark}}</option></select></div><div class="field"><label for="vd-sun">{{ui.sunIntensity}}</label><select id="vd-sun"><option value="high">{{ui.high}} (summer noon)</option><option value="medium" selected>{{ui.medium2}} (mid-morning)</option><option value="low">{{ui.low}} (winter/early morning)</option></select></div></div><button class="btn" type="submit">{{ui.calculate}}</button></form><div id="vd-out" hidden class="result" style="text-align:center"></div>`,
  { title:'Vitamin D Sun Exposure Calculator — minutes needed for vitamin D', metaDescription:'Free vitamin D sun exposure calculator. Enter your skin type and sun intensity to find how many minutes of sun exposure you need to produce adequate vitamin D.', h1:'Vitamin D Sun Exposure Calculator', intro:'Find out how many minutes of sun exposure you need to produce adequate vitamin D based on your skin type and UV index.', faq_title:'Vitamin D FAQ', ui:{ skin:'Skin type', sunIntensity:'Sun intensity', veryLight:'Type I — Very light (burns, never tans)', light:'Type II — Light (burns easily)', medium:'Type III — Medium (tans gradually)', dark:'Type IV — Dark (rarely burns)', veryDark:'Type V-VI — Very dark/dark brown', high:'High', medium2:'Medium', low:'Low', calculate:'Calculate' }, faq:[
    { q:'How much vitamin D do I need?', a:'The RDA is 600 IU/day for adults (800 IU for 70+). Many experts recommend 1,000–4,000 IU/day. The upper safe limit is 4,000 IU/day from supplements. Sun exposure is free and natural, and your skin regulates vitamin D production to prevent toxicity.' },
    { q:'What parts of the body should be exposed?', a:'The face, arms and legs are sufficient. The more skin exposed, the less time needed. Sunscreen (SPF 30) reduces vitamin D production by ~97%. Time the exposure before applying sunscreen, then protect your skin.' },
    { q:'When is sun exposure for vitamin D ineffective?', a:'When the UV index is below 3 (early morning, winter, high latitudes). When the sun is less than 45° above the horizon. Shadows longer than your height indicate the angle is too low for significant vitamin D synthesis.' }
  ]},
  { title:'Calculadora de Exposição Solar para Vitamina D — minutos necessários para vitamina D', metaDescription:'Calculadora gratuita de exposição solar para vitamina D. Insira seu tipo de pele e intensidade solar para encontrar quantos minutos de exposição solar você precisa para produzir vitamina D adequada.', h1:'Calculadora de Exposição Solar para Vitamina D', intro:'Descubra quantos minutos de exposição solar você precisa para produzir vitamina D adequada com base no seu tipo de pele e índice UV.', faq_title:'Perguntas frequentes sobre vitamina D', ui:{ skin:'Tipo de pele', sunIntensity:'Intensidade solar', veryLight:'Tipo I — Muito clara (queima, nunca bronzeia)', light:'Tipo II — Clara (queima facilmente)', medium:'Tipo III — Média (bronzeia gradualmente)', dark:'Tipo IV — Escura (raramente queima)', veryDark:'Tipo V-VI — Muito escura/marrom escuro', high:'Alta', medium2:'Média', low:'Baixa', calculate:'Calcular' }, faq:[
    { q:'Quanta vitamina D preciso?', a:'A RDA é 600 UI/dia para adultos (800 UI para maiores de 70). Muitos especialistas recomendam 1.000–4.000 UI/dia. A exposição solar é gratuita e natural.' },
    { q:'Quais partes do corpo devem ser expostas?', a:'Rosto, braços e pernas são suficientes. Quanto mais pele exposta, menos tempo é necessário. Protetor solar (FPS 30) reduz a produção de vitamina D em ~97%.' },
    { q:'Quando a exposição solar para vitamina D é ineficaz?', a:'Quando o índice UV está abaixo de 3 (início da manhã, inverno, altas latitudes). Quando o sol está menos de 45° acima do horizonte.' }
  ]},
  `(function(){
  const base={1:5,2:10,3:15,4:25,5:40};
  const sunMult={high:1,medium:2,low:4};
  document.getElementById('vd-form').addEventListener('submit',function(e){
    e.preventDefault();
    const skin=document.getElementById('vd-skin').value;
    const sun=document.getElementById('vd-sun').value;
    const mins=base[skin]*sunMult[sun];
    const out=document.getElementById('vd-out');out.hidden=false;
    out.innerHTML=\`<div style="font-size:3rem;font-weight:800;color:#f59e0b">\${mins}</div><p style="font-size:1rem">minutes recommended</p><p style="opacity:0.6;font-size:0.85rem;margin-top:0.4rem">Expose arms, face and legs · Avoid burning · Apply sunscreen after</p>\`;
  });
})();`
);

// ─── 191 ── Inflation Calculator ──────────────────────────────────────────────
tool('inflationcalc', 'finance', '📊',
  `<form id="ic-form"><div class="row"><div class="field"><label for="ic-amount">{{ui.amount}}</label><input type="number" id="ic-amount" step="0.01" min="0.01" value="1000" inputmode="decimal"></div><div class="field"><label for="ic-from">{{ui.fromYear}}</label><input type="number" id="ic-from" min="1913" max="2024" value="2000" inputmode="numeric"></div><div class="field"><label for="ic-to">{{ui.toYear}}</label><input type="number" id="ic-to" min="1913" max="2024" value="2024" inputmode="numeric"></div><div class="field"><label for="ic-rate">{{ui.rate}}</label><input type="number" id="ic-rate" step="0.1" value="3.5" inputmode="decimal"></div></div><button class="btn" type="submit">{{ui.calculate}}</button></form><div id="ic-out" hidden class="result" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:0.5rem"></div>`,
  { title:'Inflation Calculator — calculate purchasing power over time', metaDescription:'Free inflation calculator. Enter an amount and years to see how inflation affects purchasing power. Uses a custom annual inflation rate.', h1:'Inflation Calculator', intro:'Calculate the equivalent purchasing power of money over time using a custom annual inflation rate.', faq_title:'Inflation calculator FAQ', ui:{ amount:'Amount', fromYear:'From year', toYear:'To year', rate:'Annual inflation rate (%)', calculate:'Calculate' }, faq:[
    { q:'What is inflation?', a:'Inflation is the rate at which the general price level of goods and services rises over time, decreasing purchasing power. If inflation is 3%, something costing $100 today will cost $103 next year.' },
    { q:'What is the historical average inflation rate?', a:'US historical average CPI inflation: ~3.1% per year (1913–2023). UK: ~3.8%. In the 1970s US inflation reached 14%. From 2010–2020 it averaged ~1.7%. In 2022 it briefly hit 9.1%.' },
    { q:'What is the Rule of 70?', a:'A quick way to estimate doubling time: 70 ÷ inflation rate = years to double prices. At 3.5% inflation: 70/3.5 = 20 years for prices to double. At 7% inflation: 70/7 = 10 years.' }
  ]},
  { title:'Calculadora de Inflação — calcular poder de compra ao longo do tempo', metaDescription:'Calculadora de inflação gratuita. Insira um valor e anos para ver como a inflação afeta o poder de compra. Usa uma taxa de inflação anual personalizada.', h1:'Calculadora de Inflação', intro:'Calcule o poder de compra equivalente do dinheiro ao longo do tempo usando uma taxa de inflação anual personalizada.', faq_title:'Perguntas frequentes sobre calculadora de inflação', ui:{ amount:'Valor', fromYear:'Do ano', toYear:'Para o ano', rate:'Taxa de inflação anual (%)', calculate:'Calcular' }, faq:[
    { q:'O que é inflação?', a:'Inflação é a taxa na qual o nível geral de preços de bens e serviços sobe ao longo do tempo, diminuindo o poder de compra.' },
    { q:'Qual é a taxa de inflação histórica média?', a:'Inflação histórica média do IPC dos EUA: ~3,1% ao ano (1913–2023). Reino Unido: ~3,8%. Na década de 1970 a inflação dos EUA chegou a 14%.' },
    { q:'O que é a Regra de 70?', a:'Uma maneira rápida de estimar o tempo de dobramento: 70 ÷ taxa de inflação = anos para dobrar os preços. A 3,5% de inflação: 70/3,5 = 20 anos para os preços dobrarem.' }
  ]},
  `(function(){
  document.getElementById('ic-form').addEventListener('submit',function(e){
    e.preventDefault();
    const amount=parseFloat(document.getElementById('ic-amount').value);
    const from=parseInt(document.getElementById('ic-from').value);
    const to=parseInt(document.getElementById('ic-to').value);
    const rate=parseFloat(document.getElementById('ic-rate').value)/100;
    const years=to-from;const sign=years>=0?1:-1;
    const adjusted=amount*Math.pow(1+rate,years);
    const change=adjusted-amount;
    const out=document.getElementById('ic-out');out.hidden=false;
    const fmt=n=>'$'+Math.abs(n).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
    const items=[['Original amount',fmt(amount)+' ('+from+')'],[to+' equivalent',fmt(adjusted)],['Change',fmt(change)+' ('+Math.abs(((adjusted-amount)/amount)*100).toFixed(1)+'%)'],['Years',Math.abs(years)+' years'],['Annual rate',rate*100+'%']];
    out.innerHTML=items.map(([k,v])=>\`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">\${k}</div><strong>\${v}</strong></div>\`).join('');
  });
})();`
);

// ─── 192 ── Currency Exchange History (manual) ────────────────────────────────
tool('exchangecalc', 'finance', '💱',
  `<form id="ex-form"><div class="row"><div class="field"><label for="ex-amt">{{ui.amount}}</label><input type="number" id="ex-amt" min="0" step="any" value="100" inputmode="decimal"></div><div class="field"><label for="ex-rate">{{ui.rate}}</label><input type="number" id="ex-rate" min="0" step="any" value="1.08" inputmode="decimal"></div><div class="field"><label for="ex-fee">{{ui.fee}}</label><input type="number" id="ex-fee" min="0" step="any" value="0" inputmode="decimal"></div></div><button class="btn" type="submit">{{ui.convert}}</button></form><div id="ex-out" hidden class="result" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:0.5rem"></div>`,
  { title:'Currency Exchange Calculator — convert with custom rate and fee', metaDescription:'Free currency exchange calculator. Enter a custom exchange rate and fee percentage to calculate the exact amount received after conversion.', h1:'Currency Exchange Calculator', intro:'Enter your amount, current exchange rate and any fee to calculate the exact converted amount. Useful for comparing exchange services.', faq_title:'Currency exchange FAQ', ui:{ amount:'Amount', rate:'Exchange rate', fee:'Fee (%)', convert:'Convert' }, faq:[
    { q:'How do I find the current exchange rate?', a:'Check Google (search "USD to EUR"), XE.com, or your bank. The rate shown on Google is the mid-market rate. Banks and exchanges add a markup (spread) of 1–5% on top.' },
    { q:'What is the difference between mid-market rate and retail rate?', a:'The mid-market rate is the midpoint between buy and sell prices — the "true" rate used by banks for inter-bank transactions. Retail customers get a worse rate. Always compare the markup over mid-market.' },
    { q:'How can I get the best exchange rate?', a:'Wise (formerly TransferWise) offers near mid-market rates with low fees. Credit cards with no foreign transaction fee are also excellent. Avoid airport exchanges (worst rates) and dynamic currency conversion (always say "charge in local currency").' }
  ]},
  { title:'Calculadora de Câmbio — converter com taxa e taxa personalizadas', metaDescription:'Calculadora de câmbio gratuita. Insira uma taxa de câmbio personalizada e porcentagem de taxa para calcular o valor exato recebido após a conversão.', h1:'Calculadora de Câmbio', intro:'Insira seu valor, taxa de câmbio atual e qualquer taxa para calcular o valor convertido exato. Útil para comparar serviços de câmbio.', faq_title:'Perguntas frequentes sobre câmbio', ui:{ amount:'Valor', rate:'Taxa de câmbio', fee:'Taxa (%)', convert:'Converter' }, faq:[
    { q:'Como encontro a taxa de câmbio atual?', a:'Verifique o Google (pesquise "USD para BRL"), XE.com ou seu banco. A taxa mostrada no Google é a taxa do mercado intermediário. Bancos e casas de câmbio adicionam uma margem de 1–5%.' },
    { q:'Qual a diferença entre taxa de mercado e taxa de varejo?', a:'A taxa de mercado é o ponto médio entre preços de compra e venda — a taxa "real". Clientes de varejo obtêm uma taxa pior. Sempre compare a margem sobre o mercado intermediário.' },
    { q:'Como posso obter a melhor taxa de câmbio?', a:'Wise oferece taxas próximas ao mercado com taxas baixas. Cartões de crédito sem taxa de transação estrangeira também são excelentes. Evite câmbios em aeroportos (piores taxas).' }
  ]},
  `(function(){
  document.getElementById('ex-form').addEventListener('submit',function(e){
    e.preventDefault();
    const amt=parseFloat(document.getElementById('ex-amt').value);
    const rate=parseFloat(document.getElementById('ex-rate').value);
    const fee=parseFloat(document.getElementById('ex-fee').value)||0;
    const gross=amt*rate;
    const feeAmt=gross*(fee/100);
    const net=gross-feeAmt;
    const out=document.getElementById('ex-out');out.hidden=false;
    const fmt=n=>n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
    const items=[['Original amount',fmt(amt)],['Exchange rate','× '+rate],['Gross amount',fmt(gross)],['Fee ('+fee+'%)','-'+fmt(feeAmt)],['Net received',fmt(net)],['Effective rate',((net/amt)).toFixed(5)]];
    out.innerHTML=items.map(([k,v])=>\`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">\${k}</div><strong>\${v}</strong></div>\`).join('');
  });
})();`
);

// ─── 193 ── Rule of 72 Calculator ─────────────────────────────────────────────
tool('ruleof72', 'finance', '📈',
  `<form id="r72-form"><div class="row"><div class="field"><label for="r72-mode">{{ui.solve}}</label><select id="r72-mode"><option value="time">{{ui.time}}</option><option value="rate">{{ui.rate}}</option></select></div><div class="field"><label for="r72-val">{{ui.value}}</label><input type="number" id="r72-val" step="any" value="7" inputmode="decimal"></div></div><button class="btn" type="submit">{{ui.calculate}}</button></form><div id="r72-out" hidden class="result" style="text-align:center"></div>`,
  { title:'Rule of 72 Calculator — estimate doubling time for investments', metaDescription:'Free Rule of 72 calculator. Enter your annual return rate to find how long until your investment doubles, or enter years to find the required rate.', h1:'Rule of 72 Calculator', intro:'The Rule of 72 estimates how long it takes to double your money. Enter an interest rate to find the years, or enter years to find the required rate.', faq_title:'Rule of 72 FAQ', ui:{ solve:'Solve for', time:'Doubling time (years)', rate:'Required rate (%)', value:'Value', calculate:'Calculate' }, faq:[
    { q:'What is the Rule of 72?', a:'The Rule of 72 states that to find the number of years to double your investment, divide 72 by the annual rate of return. At 8%: 72/8 = 9 years. At 6%: 72/6 = 12 years. Simple and surprisingly accurate.' },
    { q:'Why 72 and not 70 or 100?', a:'72 is divisible by many useful numbers (1,2,3,4,6,8,9,12) making mental math easy. The exact formula is ln(2)/ln(1+r) ≈ 0.693/r. 72 overestimates slightly at low rates but gives convenient whole number answers.' },
    { q:'Can the Rule of 72 apply to debt?', a:'Yes! If credit card charges 24% interest: 72/24 = 3 years for your debt to double if you pay nothing. This makes it a powerful motivator for paying down high-interest debt.' }
  ]},
  { title:'Calculadora da Regra de 72 — estimar tempo de duplicação de investimentos', metaDescription:'Calculadora gratuita da Regra de 72. Insira sua taxa de retorno anual para descobrir quanto tempo até seu investimento dobrar, ou insira anos para encontrar a taxa necessária.', h1:'Calculadora da Regra de 72', intro:'A Regra de 72 estima quanto tempo leva para dobrar seu dinheiro. Insira uma taxa de juros para encontrar os anos, ou insira anos para encontrar a taxa necessária.', faq_title:'Perguntas frequentes sobre a Regra de 72', ui:{ solve:'Resolver para', time:'Tempo para duplicar (anos)', rate:'Taxa necessária (%)', value:'Valor', calculate:'Calcular' }, faq:[
    { q:'O que é a Regra de 72?', a:'A Regra de 72 diz que para encontrar o número de anos para dobrar seu investimento, divida 72 pela taxa de retorno anual. A 8%: 72/8 = 9 anos.' },
    { q:'Por que 72 e não 70 ou 100?', a:'72 é divisível por muitos números úteis (1,2,3,4,6,8,9,12) tornando a matemática mental fácil.' },
    { q:'A Regra de 72 se aplica a dívidas?', a:'Sim! Se o cartão de crédito cobra 24% de juros: 72/24 = 3 anos para sua dívida dobrar se você não pagar nada.' }
  ]},
  `(function(){
  document.getElementById('r72-form').addEventListener('submit',function(e){
    e.preventDefault();
    const mode=document.getElementById('r72-mode').value;
    const val=parseFloat(document.getElementById('r72-val').value);
    const out=document.getElementById('r72-out');out.hidden=false;
    if(mode==='time'){
      const years=(72/val).toFixed(2);
      const exact=(Math.log(2)/Math.log(1+val/100)).toFixed(2);
      out.innerHTML=\`<div style="font-size:2.5rem;font-weight:800;color:var(--accent,#6366f1)">\${years} years</div><p style="opacity:0.7">at \${val}% annual return</p><p style="opacity:0.5;font-size:0.85rem">Exact (compound): \${exact} years</p>\`;
    }else{
      const rate=(72/val).toFixed(2);
      out.innerHTML=\`<div style="font-size:2.5rem;font-weight:800;color:var(--accent,#6366f1)">\${rate}%</div><p style="opacity:0.7">annual return needed to double in \${val} years</p>\`;
    }
  });
})();`
);

// ─── 194 ── Stock Return Calculator ───────────────────────────────────────────
tool('stockreturn', 'finance', '📉',
  `<form id="sr-form"><div class="row"><div class="field"><label for="sr-buy">{{ui.buyPrice}}</label><input type="number" id="sr-buy" step="any" min="0.01" value="100" inputmode="decimal"></div><div class="field"><label for="sr-sell">{{ui.sellPrice}}</label><input type="number" id="sr-sell" step="any" min="0" value="150" inputmode="decimal"></div><div class="field"><label for="sr-shares">{{ui.shares}}</label><input type="number" id="sr-shares" step="any" min="1" value="10" inputmode="decimal"></div></div><div class="row"><div class="field"><label for="sr-div">{{ui.dividends}}</label><input type="number" id="sr-div" step="any" min="0" value="0" inputmode="decimal"></div><div class="field"><label for="sr-years">{{ui.years}}</label><input type="number" id="sr-years" step="any" min="0" value="1" inputmode="decimal"></div></div><button class="btn" type="submit">{{ui.calculate}}</button></form><div id="sr-out" hidden class="result" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:0.5rem"></div>`,
  { title:'Stock Return Calculator — calculate investment profit and annualized return', metaDescription:'Free stock return calculator. Enter buy price, sell price and shares to calculate total profit, percentage return and annualized CAGR.', h1:'Stock Return Calculator', intro:'Calculate your stock investment profit, total return percentage, and annualized return (CAGR) including dividends received.', faq_title:'Stock return FAQ', ui:{ buyPrice:'Buy price per share', sellPrice:'Sell price per share', shares:'Number of shares', dividends:'Total dividends received', years:'Holding period (years)', calculate:'Calculate' }, faq:[
    { q:'What is CAGR?', a:'CAGR (Compound Annual Growth Rate) is the rate at which an investment would have grown if it grew at a steady annual rate. Formula: CAGR = (End Value / Start Value)^(1/Years) − 1. It normalizes returns across different holding periods.' },
    { q:'Are taxes included?', a:'No. This calculator shows pre-tax returns. Capital gains taxes vary by country and holding period. In the US: long-term capital gains (held 1+ year) are taxed at 0%, 15% or 20% depending on income.' },
    { q:'What is a good annual stock return?', a:'The S&P 500 has historically returned ~10% annually (7% after inflation). Individual stocks vary wildly. Warren Buffett has averaged ~20% annually over 50+ years — extraordinary by any measure.' }
  ]},
  { title:'Calculadora de Retorno de Ações — calcular lucro de investimento e retorno anualizado', metaDescription:'Calculadora de retorno de ações gratuita. Insira preço de compra, preço de venda e ações para calcular lucro total, porcentagem de retorno e CAGR anualizado.', h1:'Calculadora de Retorno de Ações', intro:'Calcule o lucro do seu investimento em ações, porcentagem de retorno total e retorno anualizado (CAGR) incluindo dividendos recebidos.', faq_title:'Perguntas frequentes sobre retorno de ações', ui:{ buyPrice:'Preço de compra por ação', sellPrice:'Preço de venda por ação', shares:'Número de ações', dividends:'Total de dividendos recebidos', years:'Período de retenção (anos)', calculate:'Calcular' }, faq:[
    { q:'O que é CAGR?', a:'CAGR (Taxa de Crescimento Anual Composta) é a taxa na qual um investimento teria crescido se crescesse a uma taxa anual constante. Fórmula: CAGR = (Valor Final / Valor Inicial)^(1/Anos) − 1.' },
    { q:'Os impostos estão incluídos?', a:'Não. Esta calculadora mostra retornos antes de impostos. Os impostos sobre ganhos de capital variam por país e período de retenção.' },
    { q:'Qual é um bom retorno anual em ações?', a:'O S&P 500 historicamente retornou ~10% anualmente (7% após a inflação). Ações individuais variam muito.' }
  ]},
  `(function(){
  document.getElementById('sr-form').addEventListener('submit',function(e){
    e.preventDefault();
    const buy=parseFloat(document.getElementById('sr-buy').value);
    const sell=parseFloat(document.getElementById('sr-sell').value);
    const shares=parseFloat(document.getElementById('sr-shares').value);
    const div=parseFloat(document.getElementById('sr-div').value)||0;
    const years=parseFloat(document.getElementById('sr-years').value)||1;
    const cost=buy*shares;const proceeds=sell*shares+div;const profit=proceeds-cost;
    const pct=(profit/cost)*100;
    const cagr=years>0?(Math.pow(proceeds/cost,1/years)-1)*100:0;
    const out=document.getElementById('sr-out');out.hidden=false;
    const fmt=n=>'$'+Math.abs(n).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
    const fmtPct=n=>(n>=0?'+':'')+n.toFixed(2)+'%';
    const items=[['Total invested',fmt(cost)],['Total return',fmt(proceeds)],['Profit/Loss',fmt(profit)],['Return %',fmtPct(pct)],['CAGR',fmtPct(cagr)],['Dividends',fmt(div)]];
    out.innerHTML=items.map(([k,v])=>\`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">\${k}</div><strong style="color:\${v.includes('-')||v.includes('−')?'var(--red,#ef4444)':'inherit'}">\${v}</strong></div>\`).join('');
  });
})();`
);

// ─── 195 ── Emergency Fund Calculator ────────────────────────────────────────
tool('emergencyfund', 'finance', '🏦',
  `<form id="ef-form"><div class="row"><div class="field"><label for="ef-exp">{{ui.expenses}}</label><input type="number" id="ef-exp" step="any" min="0" value="3000" inputmode="decimal"></div><div class="field"><label for="ef-months">{{ui.months}}</label><select id="ef-months"><option value="3">3 months</option><option value="6" selected>6 months</option><option value="9">9 months</option><option value="12">12 months</option></select></div></div><div class="row"><div class="field"><label for="ef-saved">{{ui.saved}}</label><input type="number" id="ef-saved" step="any" min="0" value="0" inputmode="decimal"></div><div class="field"><label for="ef-monthly">{{ui.monthly}}</label><input type="number" id="ef-monthly" step="any" min="0" value="500" inputmode="decimal"></div></div><button class="btn" type="submit">{{ui.calculate}}</button></form><div id="ef-out" hidden class="result" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:0.5rem"></div>`,
  { title:'Emergency Fund Calculator — how much to save and how long to reach it', metaDescription:'Free emergency fund calculator. Enter your monthly expenses to find your target emergency fund size and how many months to reach it.', h1:'Emergency Fund Calculator', intro:'Calculate your target emergency fund based on monthly expenses, how much you have saved, and how long it will take to reach your goal.', faq_title:'Emergency fund FAQ', ui:{ expenses:'Monthly expenses', months:'Coverage target', saved:'Already saved', monthly:'Monthly savings', calculate:'Calculate' }, faq:[
    { q:'How much should my emergency fund be?', a:'The standard recommendation is 3–6 months of essential expenses. 3 months for stable employment with multiple income streams. 6 months for single income households. 9–12 months for self-employed or irregular income.' },
    { q:'What counts as essential expenses?', a:'Rent/mortgage, utilities, food, transportation, insurance, minimum debt payments. Exclude discretionary spending like dining out, subscriptions and entertainment when calculating your emergency fund target.' },
    { q:'Where should I keep my emergency fund?', a:'A high-yield savings account (HYSA) — accessible immediately, FDIC insured, and earns more than a regular savings account. Avoid investing it in stocks since markets can drop exactly when you need the money.' }
  ]},
  { title:'Calculadora de Fundo de Emergência — quanto economizar e quanto tempo para atingir', metaDescription:'Calculadora de fundo de emergência gratuita. Insira suas despesas mensais para encontrar o tamanho do fundo de emergência alvo e quantos meses para atingi-lo.', h1:'Calculadora de Fundo de Emergência', intro:'Calcule seu fundo de emergência alvo com base nas despesas mensais, quanto você economizou e quanto tempo levará para atingir sua meta.', faq_title:'Perguntas frequentes sobre fundo de emergência', ui:{ expenses:'Despesas mensais', months:'Meta de cobertura', saved:'Já economizado', monthly:'Poupança mensal', calculate:'Calcular' }, faq:[
    { q:'Quanto deve ser meu fundo de emergência?', a:'A recomendação padrão é 3–6 meses de despesas essenciais. 3 meses para emprego estável. 6 meses para renda única. 9–12 meses para autônomos ou renda irregular.' },
    { q:'O que conta como despesas essenciais?', a:'Aluguel/hipoteca, utilidades, alimentação, transporte, seguro, pagamentos mínimos de dívida. Exclua gastos discricionários ao calcular sua meta de fundo de emergência.' },
    { q:'Onde devo manter meu fundo de emergência?', a:'Uma conta poupança de alto rendimento — acessível imediatamente, segurada e rende mais que uma conta poupança regular.' }
  ]},
  `(function(){
  document.getElementById('ef-form').addEventListener('submit',function(e){
    e.preventDefault();
    const exp=parseFloat(document.getElementById('ef-exp').value);
    const months=parseInt(document.getElementById('ef-months').value);
    const saved=parseFloat(document.getElementById('ef-saved').value)||0;
    const monthly=parseFloat(document.getElementById('ef-monthly').value)||1;
    const target=exp*months;const remaining=Math.max(0,target-saved);
    const monthsToGoal=remaining>0?Math.ceil(remaining/monthly):0;
    const pct=Math.min(100,Math.round((saved/target)*100));
    const fmt=n=>'$'+n.toLocaleString('en-US',{minimumFractionDigits:0,maximumFractionDigits:0});
    const out=document.getElementById('ef-out');out.hidden=false;
    const items=[['Target fund',fmt(target)],['Already saved',fmt(saved)],['Still needed',fmt(remaining)],['Progress',pct+'%'],['Months to goal',monthsToGoal>0?monthsToGoal+' months':'✅ Goal reached!']];
    out.innerHTML=items.map(([k,v])=>\`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">\${k}</div><strong>\${v}</strong></div>\`).join('')+'<div style="grid-column:1/-1"><div style="height:8px;background:var(--line);border-radius:4px"><div style="height:100%;width:'+pct+'%;background:var(--accent,#6366f1);border-radius:4px;transition:width 0.5s"></div></div></div>';
  });
})();`
);

// ─── 196 ── Net Present Value Calculator ─────────────────────────────────────
tool('npvcalc', 'finance', '💰',
  `<div id="npv-app"><div class="row"><div class="field"><label for="npv-rate">{{ui.rate}}</label><input type="number" id="npv-rate" step="any" min="0" value="10" inputmode="decimal"></div><div class="field"><label for="npv-init">{{ui.initial}}</label><input type="number" id="npv-init" step="any" value="10000" inputmode="decimal"></div></div><div class="field"><label>{{ui.cashflows}}</label><textarea id="npv-cf" rows="5" style="width:100%;padding:0.5rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text);font-family:monospace" placeholder="3000&#10;4000&#10;5000&#10;4000&#10;3000"></textarea></div><button class="btn" id="npv-go" style="margin-top:0.25rem">{{ui.calculate}}</button><div id="npv-out" hidden class="result" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:0.5rem;margin-top:0.75rem"></div></div>`,
  { title:'Net Present Value (NPV) Calculator — evaluate investment decisions', metaDescription:'Free NPV calculator. Enter cash flows and discount rate to calculate Net Present Value and Internal Rate of Return (IRR) for investment analysis.', h1:'Net Present Value (NPV) Calculator', intro:'Calculate the Net Present Value (NPV) of a series of future cash flows to evaluate whether an investment is worthwhile.', faq_title:'NPV calculator FAQ', ui:{ rate:'Discount rate (%)', initial:'Initial investment', cashflows:'Annual cash flows (one per line)', calculate:'Calculate' }, faq:[
    { q:'What is Net Present Value?', a:'NPV is the present value of all future cash flows minus the initial investment, discounted at a required rate of return. If NPV > 0, the investment creates value. If NPV < 0, it destroys value.' },
    { q:'What discount rate should I use?', a:'The discount rate should reflect the required rate of return or opportunity cost of capital. For a business: weighted average cost of capital (WACC). For personal investments: your expected alternative investment return (e.g., 7–10% for stock market).' },
    { q:'What is IRR?', a:'Internal Rate of Return is the discount rate that makes NPV = 0. If IRR > your required return, the investment is attractive. IRR is found by iteration (no closed-form formula).' }
  ]},
  { title:'Calculadora de Valor Presente Líquido (VPL) — avaliar decisões de investimento', metaDescription:'Calculadora de VPL gratuita. Insira fluxos de caixa e taxa de desconto para calcular o Valor Presente Líquido e a Taxa Interna de Retorno (TIR) para análise de investimento.', h1:'Calculadora de Valor Presente Líquido (VPL)', intro:'Calcule o Valor Presente Líquido (VPL) de uma série de fluxos de caixa futuros para avaliar se um investimento vale a pena.', faq_title:'Perguntas frequentes sobre calculadora de VPL', ui:{ rate:'Taxa de desconto (%)', initial:'Investimento inicial', cashflows:'Fluxos de caixa anuais (um por linha)', calculate:'Calcular' }, faq:[
    { q:'O que é Valor Presente Líquido?', a:'VPL é o valor presente de todos os fluxos de caixa futuros menos o investimento inicial, descontados a uma taxa de retorno exigida. Se VPL > 0, o investimento cria valor.' },
    { q:'Qual taxa de desconto devo usar?', a:'A taxa de desconto deve refletir a taxa de retorno exigida ou custo de oportunidade do capital. Para um negócio: WACC. Para investimentos pessoais: seu retorno alternativo esperado (ex.: 7–10% para mercado de ações).' },
    { q:'O que é TIR?', a:'Taxa Interna de Retorno é a taxa de desconto que torna o VPL = 0. Se TIR > seu retorno exigido, o investimento é atraente.' }
  ]},
  `(function(){
  document.getElementById('npv-go').onclick=function(){
    const rate=parseFloat(document.getElementById('npv-rate').value)/100;
    const init=parseFloat(document.getElementById('npv-init').value);
    const cfs=document.getElementById('npv-cf').value.trim().split('\n').map(s=>parseFloat(s.trim())).filter(n=>!isNaN(n));
    if(!cfs.length)return;
    let npv=-init;cfs.forEach((cf,i)=>npv+=cf/Math.pow(1+rate,i+1));
    const total=cfs.reduce((a,b)=>a+b,0);
    const payback=function(){let cum=0;for(let i=0;i<cfs.length;i++){cum+=cfs[i];if(cum>=init)return i+1;}return 'N/A';}();
    const out=document.getElementById('npv-out');out.hidden=false;
    const fmt=n=>(n>=0?'$':'−$')+Math.abs(n).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
    const items=[['Initial investment',fmt(-init)],['Total cash flows',fmt(total)],['NPV',fmt(npv)],['Decision',npv>=0?'✅ Accept':'❌ Reject'],['Payback period',payback+(payback!=='N/A'?' years':'')]];
    out.innerHTML=items.map(([k,v])=>\`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">\${k}</div><strong>\${v}</strong></div>\`).join('');
  };
})();`
);

// ─── 197 ── Pomodoro Extended (with sessions log) ─────────────────────────────
tool('pomodoropro', 'productivity', '🍅',
  `<div id="pmpro-app" style="text-align:center"><div style="font-size:4rem;font-weight:800;font-variant-numeric:tabular-nums" id="pmpro-time">25:00</div><div style="margin:0.5rem 0;opacity:0.6;font-size:0.9rem" id="pmpro-label">Focus session</div><div class="row" style="justify-content:center;gap:0.5rem"><button class="btn" id="pmpro-start">▶ Start</button><button class="btn" id="pmpro-reset">↺ Reset</button></div><div class="row" style="justify-content:center;gap:0.5rem;margin-top:0.5rem"><div class="field"><label for="pmpro-focus">Focus (min)</label><input type="number" id="pmpro-focus" min="1" max="60" value="25" style="width:60px;text-align:center"></div><div class="field"><label for="pmpro-break">Break (min)</label><input type="number" id="pmpro-break" min="1" max="30" value="5" style="width:60px;text-align:center"></div></div><div id="pmpro-sessions" style="margin-top:0.75rem;font-size:0.875rem;opacity:0.7"></div></div>`,
  { title:'Pomodoro Timer Pro — focus timer with session tracking', metaDescription:'Free Pomodoro timer with session history. Customizable focus and break durations. Tracks completed sessions and total focus time.', h1:'Pomodoro Timer Pro', intro:'Use the Pomodoro Technique to boost productivity. Work for 25 minutes, then take a 5-minute break. Track your sessions.', faq_title:'Pomodoro technique FAQ', ui:{}, faq:[
    { q:'What is the Pomodoro Technique?', a:'Developed by Francesco Cirillo in the 1980s. Work for 25 minutes (one "Pomodoro"), then take a 5-minute break. After 4 Pomodoros, take a longer 15–30 minute break. Named after a tomato-shaped kitchen timer.' },
    { q:'Why does it work?', a:'The technique combats perfectionism (timeboxing reduces "just a little more"), decision fatigue (the structure is pre-made), and distractions (you commit to one task per Pomodoro). The frequent breaks also prevent mental fatigue.' },
    { q:'Can I adjust the durations?', a:'Yes. While 25/5 is the classic ratio, adjust based on your work style. Deep work tasks may benefit from 50/10 splits. Short tasks or low concentration days may use 15/3. The ratio matters more than the exact duration.' }
  ]},
  { title:'Pomodoro Timer Pro — timer de foco com rastreamento de sessões', metaDescription:'Timer Pomodoro gratuito com histórico de sessões. Durações de foco e pausa personalizáveis. Rastreia sessões concluídas e tempo total de foco.', h1:'Pomodoro Timer Pro', intro:'Use a Técnica Pomodoro para aumentar a produtividade. Trabalhe por 25 minutos, depois faça uma pausa de 5 minutos. Rastreie suas sessões.', faq_title:'Perguntas frequentes sobre a técnica Pomodoro', ui:{}, faq:[
    { q:'O que é a Técnica Pomodoro?', a:'Desenvolvida por Francesco Cirillo na década de 1980. Trabalhe por 25 minutos (um "Pomodoro"), depois faça uma pausa de 5 minutos. Após 4 Pomodoros, faça uma pausa mais longa de 15–30 minutos.' },
    { q:'Por que funciona?', a:'A técnica combate o perfeccionismo (o limite de tempo reduz o "só mais um pouco"), a fadiga de decisão (a estrutura é pré-definida) e as distrações (você se compromete com uma tarefa por Pomodoro).' },
    { q:'Posso ajustar as durações?', a:'Sim. Embora 25/5 seja a proporção clássica, ajuste com base no seu estilo de trabalho. Tarefas de trabalho profundo podem se beneficiar de divisões de 50/10.' }
  ]},
  `(function(){
  let secs=25*60,running=false,iv=null,mode='focus',sessions=0,totalFocus=0,sessionStart=0;
  function fmt(s){return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');}
  function setDisplay(){document.getElementById('pmpro-time').textContent=fmt(secs);document.getElementById('pmpro-label').textContent=mode==='focus'?'Focus session':'Break time';}
  function tick(){
    if(secs>0){secs--;setDisplay();}
    else{
      clearInterval(iv);running=false;
      if(mode==='focus'){sessions++;totalFocus+=parseInt(document.getElementById('pmpro-focus').value);const el=document.getElementById('pmpro-sessions');el.textContent='Sessions today: '+sessions+' · Focus: '+totalFocus+' min';try{new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAA').play().catch(()=>{});}catch(e){}mode='break';secs=parseInt(document.getElementById('pmpro-break').value)*60;}
      else{mode='focus';secs=parseInt(document.getElementById('pmpro-focus').value)*60;}
      setDisplay();
    }
  }
  document.getElementById('pmpro-start').onclick=function(){
    if(running){clearInterval(iv);running=false;this.textContent='▶ Start';}
    else{iv=setInterval(tick,1000);running=true;this.textContent='⏸ Pause';}
  };
  document.getElementById('pmpro-reset').onclick=function(){
    clearInterval(iv);running=false;mode='focus';
    secs=parseInt(document.getElementById('pmpro-focus').value)*60;
    setDisplay();document.getElementById('pmpro-start').textContent='▶ Start';
  };
  setDisplay();
})();`
);

// ─── 198 ── Study Planner ─────────────────────────────────────────────────────
tool('studyplanner', 'productivity', '📚',
  `<div id="sp-app"><div class="row"><div class="field"><label for="sp-exam">{{ui.exam}}</label><input type="date" id="sp-exam"></div><div class="field"><label for="sp-hours">{{ui.hours}}</label><input type="number" id="sp-hours" min="1" value="40" inputmode="numeric"></div><div class="field"><label for="sp-daily">{{ui.daily}}</label><input type="number" id="sp-daily" min="0.5" step="0.5" value="2" inputmode="decimal"></div></div><div class="field"><label for="sp-topics">{{ui.topics}}</label><textarea id="sp-topics" rows="4" style="width:100%;padding:0.5rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)" placeholder="{{ui.topicsPlaceholder}}"></textarea></div><button class="btn" id="sp-go">{{ui.plan}}</button><div id="sp-out" style="margin-top:0.75rem"></div></div>`,
  { title:'Study Planner — create a study schedule for your exam', metaDescription:'Free study planner. Enter your exam date, total study hours and daily availability to generate a balanced study schedule across your topics.', h1:'Study Planner', intro:'Enter your exam date, total study hours needed and daily hours available to generate a personalized study schedule.', faq_title:'Study planner FAQ', ui:{ exam:'Exam date', hours:'Total study hours needed', daily:'Daily hours available', topics:'Topics to study (one per line)', topicsPlaceholder:'Mathematics\nPhysics\nChemistry\nBiology', plan:'Generate Plan' }, faq:[
    { q:'How does the planner work?', a:'It divides total study hours equally among your topics, then distributes daily sessions across the days available before your exam. It shows how many hours per topic and approximately which days to focus on each.' },
    { q:'What is spaced repetition?', a:'Spaced repetition is the most scientifically proven learning technique: review material at increasing intervals (1 day, 3 days, 1 week, 2 weeks). Apps like Anki implement this. This planner allocates time but does not implement spaced repetition.' },
    { q:'How many hours per day should I study?', a:'Research suggests 1.5–4 hours of focused study per day is optimal for retention. More than 4 hours of continuous study has diminishing returns. Take regular breaks using the Pomodoro technique.' }
  ]},
  { title:'Planejador de Estudos — criar um cronograma de estudos para sua prova', metaDescription:'Planejador de estudos gratuito. Insira a data da sua prova, horas totais de estudo e disponibilidade diária para gerar um cronograma de estudos equilibrado.', h1:'Planejador de Estudos', intro:'Insira a data da sua prova, horas totais de estudo necessárias e horas diárias disponíveis para gerar um cronograma de estudos personalizado.', faq_title:'Perguntas frequentes sobre planejador de estudos', ui:{ exam:'Data da prova', hours:'Horas totais de estudo necessárias', daily:'Horas diárias disponíveis', topics:'Tópicos para estudar (um por linha)', topicsPlaceholder:'Matemática\nFísica\nQuímica\nBiologia', plan:'Gerar Plano' }, faq:[
    { q:'Como o planejador funciona?', a:'Divide o total de horas de estudo igualmente entre seus tópicos, depois distribui as sessões diárias ao longo dos dias disponíveis antes da prova.' },
    { q:'O que é repetição espaçada?', a:'Repetição espaçada é a técnica de aprendizado mais cientificamente comprovada: revisar material em intervalos crescentes (1 dia, 3 dias, 1 semana, 2 semanas).' },
    { q:'Quantas horas por dia devo estudar?', a:'A pesquisa sugere 1,5–4 horas de estudo focado por dia é ideal para retenção. Mais de 4 horas de estudo contínuo tem retornos decrescentes.' }
  ]},
  `(function(){
  document.getElementById('sp-go').onclick=function(){
    const examDate=new Date(document.getElementById('sp-exam').value);
    const totalHours=parseFloat(document.getElementById('sp-hours').value)||40;
    const dailyHours=parseFloat(document.getElementById('sp-daily').value)||2;
    const topics=document.getElementById('sp-topics').value.trim().split('\n').map(s=>s.trim()).filter(Boolean);
    const out=document.getElementById('sp-out');
    if(!document.getElementById('sp-exam').value){out.innerHTML='<p>Please enter an exam date</p>';return;}
    const today=new Date();today.setHours(0,0,0,0);
    const daysLeft=Math.max(1,Math.round((examDate-today)/86400000));
    const totalAvailable=daysLeft*dailyHours;
    const hoursPerTopic=topics.length?totalHours/topics.length:totalHours;
    const html=['<div style="display:grid;gap:0.5rem">',
      '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:0.5rem">',
      ['Days remaining',daysLeft],['Total hours',totalHours],['Available',totalAvailable.toFixed(0)+' hrs'],['Daily target',dailyHours+' hrs/day']
      .map(([k,v])=>\`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">\${k}</div><strong>\${v}</strong></div>\`).join(''),
      '</div>',
    ];
    if(topics.length){
      html.push('<div style="margin-top:0.5rem"><strong>Topic schedule ('+hoursPerTopic.toFixed(1)+' hrs each)</strong></div>');
      html.push('<div style="display:grid;gap:0.3rem">');
      topics.forEach(t=>{const daysForTopic=Math.ceil(hoursPerTopic/dailyHours);html.push(\`<div style="display:flex;justify-content:space-between;padding:0.4rem 0.6rem;background:var(--surface);border-left:3px solid var(--accent,#6366f1);border-radius:0 6px 6px 0;font-size:0.9rem"><span>\${t}</span><span style="opacity:0.6">\${hoursPerTopic.toFixed(1)} hrs · ~\${daysForTopic}d</span></div>\`);});
      html.push('</div>');
    }
    html.push('</div>');
    out.innerHTML=html.join('');
  };
})();`
);

// ─── 199 ── Checklist Maker ───────────────────────────────────────────────────
tool('checklistmaker', 'productivity', '✅',
  `<div id="cl-app"><div class="row"><input type="text" id="cl-in" placeholder="{{ui.placeholder}}" style="flex:1;padding:0.5rem 0.75rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)"><button class="btn" id="cl-add">{{ui.add}}</button></div><ul id="cl-list" style="list-style:none;padding:0;margin:0.75rem 0"></ul><div class="row" style="gap:0.5rem"><button class="btn" id="cl-clear-done">{{ui.clearDone}}</button><button class="btn" id="cl-clear-all">{{ui.clearAll}}</button><span id="cl-progress" style="align-self:center;opacity:0.6;font-size:0.875rem"></span></div></div>`,
  { title:'Checklist Maker — create and track to-do checklists', metaDescription:'Free online checklist maker. Create custom checklists, check off items as you complete them, and track your progress. Saves to local storage.', h1:'Checklist Maker', intro:'Create a custom checklist, check off items as you complete them, and track your progress. Your list is saved in your browser.', faq_title:'Checklist maker FAQ', ui:{ placeholder:'Add a checklist item…', add:'Add', clearDone:'Clear Done', clearAll:'Clear All' }, faq:[
    { q:'Is my checklist saved?', a:'Yes. Your checklist is automatically saved to your browser\'s localStorage. It persists between page refreshes and browser sessions on the same device. Clearing browser data will erase it.' },
    { q:'Can I reorder items?', a:'Currently items are added in order. To prioritize, add high-priority items first. A future update may add drag-and-drop reordering.' },
    { q:'What can I use this for?', a:'Daily task lists, grocery shopping, packing lists, project checklists, meeting agendas, event planning, housekeeping routines, and any sequential process you need to track.' }
  ]},
  { title:'Criador de Checklist — criar e rastrear checklists de tarefas', metaDescription:'Criador de checklist gratuito online. Crie checklists personalizadas, marque itens conforme os conclui e rastreie seu progresso. Salva no armazenamento local.', h1:'Criador de Checklist', intro:'Crie uma checklist personalizada, marque itens conforme os conclui e rastreie seu progresso. Sua lista é salva no navegador.', faq_title:'Perguntas frequentes sobre criador de checklist', ui:{ placeholder:'Adicionar um item de checklist…', add:'Adicionar', clearDone:'Limpar Concluídos', clearAll:'Limpar Tudo' }, faq:[
    { q:'Minha checklist é salva?', a:'Sim. Sua checklist é automaticamente salva no localStorage do seu navegador. Persiste entre atualizações de página e sessões do navegador no mesmo dispositivo.' },
    { q:'Posso reordenar itens?', a:'Atualmente os itens são adicionados em ordem. Para priorizar, adicione itens de alta prioridade primeiro.' },
    { q:'Para que posso usar isso?', a:'Listas de tarefas diárias, lista de compras, listas de embalagem, checklists de projeto, agendas de reunião, planejamento de eventos, rotinas de limpeza.' }
  ]},
  `(function(){
  const KEY='checklist_items';
  let items=JSON.parse(localStorage.getItem(KEY)||'[]');
  function save(){localStorage.setItem(KEY,JSON.stringify(items));}
  function render(){
    const list=document.getElementById('cl-list');
    list.innerHTML=items.map((item,i)=>\`<li style="display:flex;align-items:center;gap:0.5rem;padding:0.4rem 0;border-bottom:1px solid var(--line)"><input type="checkbox" \${item.done?'checked':''} id="ci\${i}" style="width:18px;height:18px;cursor:pointer"><label for="ci\${i}" style="flex:1;cursor:pointer;\${item.done?'text-decoration:line-through;opacity:0.5':''}">\${item.text}</label><button style="background:none;border:none;cursor:pointer;opacity:0.4;font-size:1.1rem" onclick="this.closest('li').remove();items.splice(\${i},1);save();render()">×</button></li>\`).join('');
    list.querySelectorAll('input[type=checkbox]').forEach((cb,i)=>{cb.onchange=function(){items[i].done=this.checked;save();render();};});
    const done=items.filter(x=>x.done).length;
    document.getElementById('cl-progress').textContent=items.length?done+'/'+items.length+' done':'';
  }
  function addItem(){
    const txt=document.getElementById('cl-in').value.trim();
    if(!txt)return;items.push({text:txt,done:false});save();render();document.getElementById('cl-in').value='';document.getElementById('cl-in').focus();
  }
  document.getElementById('cl-add').onclick=addItem;
  document.getElementById('cl-in').addEventListener('keydown',e=>{if(e.key==='Enter')addItem();});
  document.getElementById('cl-clear-done').onclick=function(){items=items.filter(x=>!x.done);save();render();};
  document.getElementById('cl-clear-all').onclick=function(){if(confirm('Clear all items?')){items=[];save();render();}};
  render();
})();`
);

// ─── 200 ── Meeting Cost Calculator ───────────────────────────────────────────
tool('meetingcost', 'productivity', '💸',
  `<form id="mc-form"><div class="row"><div class="field"><label for="mc-people">{{ui.people}}</label><input type="number" id="mc-people" min="1" value="5" inputmode="numeric"></div><div class="field"><label for="mc-salary">{{ui.salary}}</label><input type="number" id="mc-salary" min="0" value="80000" inputmode="numeric"></div><div class="field"><label for="mc-hours">{{ui.hours}}</label><input type="number" id="mc-hours" step="0.25" min="0.25" value="1" inputmode="decimal"></div></div><button class="btn" type="submit">{{ui.calculate}}</button></form><div id="mc-out" hidden class="result" style="text-align:center"></div>`,
  { title:'Meeting Cost Calculator — find the true cost of your meetings', metaDescription:'Free meeting cost calculator. Enter attendees, average salary and duration to calculate the real cost of any meeting in salary dollars.', h1:'Meeting Cost Calculator', intro:'Calculate the real cost of a meeting in salary time. Enter the number of attendees, average annual salary and meeting duration.', faq_title:'Meeting cost FAQ', ui:{ people:'Attendees', salary:'Avg. annual salary ($)', hours:'Duration (hours)', calculate:'Calculate' }, faq:[
    { q:'Why calculate meeting cost?', a:'The true cost of meetings is often invisible. A 1-hour meeting with 10 people at $80K average salary costs ~$400 in salary alone. The US loses an estimated $37 billion per year in unproductive meetings.' },
    { q:'What is included in the cost?', a:'This calculator shows salary cost only (gross pay). The full cost is typically 1.3–1.5× higher when including benefits, overhead, opportunity cost of lost productivity, and potential revenue impact.' },
    { q:'How can I make meetings more effective?', a:'Keep meetings to minimum attendees (Jeff Bezos\'s "two-pizza rule"). Have a clear agenda. Start and end on time. End with clear action items. Use async communication (email, docs) when synchronous discussion is not needed.' }
  ]},
  { title:'Calculadora de Custo de Reunião — encontrar o custo real das suas reuniões', metaDescription:'Calculadora de custo de reunião gratuita. Insira participantes, salário médio e duração para calcular o custo real de qualquer reunião em dólares de salário.', h1:'Calculadora de Custo de Reunião', intro:'Calcule o custo real de uma reunião em tempo de salário. Insira o número de participantes, salário anual médio e duração da reunião.', faq_title:'Perguntas frequentes sobre custo de reunião', ui:{ people:'Participantes', salary:'Salário anual médio ($)', hours:'Duração (horas)', calculate:'Calcular' }, faq:[
    { q:'Por que calcular o custo da reunião?', a:'O custo real das reuniões geralmente é invisível. Uma reunião de 1 hora com 10 pessoas a salário médio de $80K custa ~$400 apenas em salário.' },
    { q:'O que está incluído no custo?', a:'Esta calculadora mostra apenas o custo de salário (pagamento bruto). O custo total é tipicamente 1,3–1,5× maior quando incluindo benefícios, overhead e custo de oportunidade.' },
    { q:'Como posso tornar as reuniões mais eficazes?', a:'Mantenha as reuniões com o mínimo de participantes. Tenha uma agenda clara. Comece e termine na hora. Termine com itens de ação claros.' }
  ]},
  `(function(){
  document.getElementById('mc-form').addEventListener('submit',function(e){
    e.preventDefault();
    const people=parseInt(document.getElementById('mc-people').value);
    const salary=parseFloat(document.getElementById('mc-salary').value);
    const hours=parseFloat(document.getElementById('mc-hours').value);
    const hourlyRate=salary/2080;// 52 weeks × 40 hours
    const cost=people*hourlyRate*hours;
    const out=document.getElementById('mc-out');out.hidden=false;
    out.innerHTML=\`<div style="font-size:2.5rem;font-weight:800;color:var(--accent,#6366f1)">$\${cost.toFixed(0).replace(/\\B(?=(\\d{3})+(?!\\d))/g,',')}</div><p style="opacity:0.7;margin-top:0.25rem">\${people} people × \${hours}h × $\${hourlyRate.toFixed(0)}/hr</p><p style="opacity:0.5;font-size:0.85rem;margin-top:0.25rem">True cost (with overhead 1.4×): $\${(cost*1.4).toFixed(0).replace(/\\B(?=(\\d{3})+(?!\\d))/g,',')}</p>\`;
  });
})();`
);

// ─── 201 ── Reading Speed Test ─────────────────────────────────────────────────
tool('readingspeed', 'productivity', '👁️',
  `<div id="rs-app" style="text-align:center"><div id="rs-start"><button class="btn" id="rs-begin">{{ui.start}}</button></div><div id="rs-reading" style="display:none"><div id="rs-text" style="text-align:left;max-width:600px;margin:0 auto;line-height:1.8;font-size:1.05rem;padding:1rem;background:var(--surface);border:1px solid var(--line);border-radius:12px;margin-bottom:0.75rem"></div><button class="btn" id="rs-done">{{ui.done}}</button></div><div id="rs-result" style="display:none"></div></div>`,
  { title:'Reading Speed Test — measure your words per minute (WPM)', metaDescription:'Free reading speed test. Read a passage and see your reading speed in words per minute (WPM). Average adult reads 200-300 WPM.', h1:'Reading Speed Test', intro:'Click Start to begin. Read the passage at your natural pace, then click Done to see your reading speed in words per minute.', faq_title:'Reading speed FAQ', ui:{ start:'Start Reading Test', done:'Done Reading' }, faq:[
    { q:'What is the average reading speed?', a:'Average adult: 200–300 WPM. Average college student: 300–350 WPM. Speed readers: 700–1000 WPM (with reduced comprehension). Audiobooks: ~150–160 WPM. Optimal reading for comprehension: 200–250 WPM.' },
    { q:'How can I improve my reading speed?', a:'Minimize subvocalization (reading words in your head). Use a finger or pointer to guide your eyes. Read in chunks (groups of 3–5 words). Reduce regression (re-reading). Practice daily with appropriate material.' },
    { q:'Does reading speed affect comprehension?', a:'Yes. Speed reading techniques that triple WPM typically reduce comprehension significantly. The sweet spot for most people is 250–350 WPM with good comprehension. Skimming (1000+ WPM) is only useful for finding key information.' }
  ]},
  { title:'Teste de Velocidade de Leitura — medir suas palavras por minuto (PPM)', metaDescription:'Teste de velocidade de leitura gratuito. Leia uma passagem e veja sua velocidade de leitura em palavras por minuto (PPM). O adulto médio lê 200-300 PPM.', h1:'Teste de Velocidade de Leitura', intro:'Clique em Iniciar para começar. Leia a passagem em seu ritmo natural, depois clique em Concluído para ver sua velocidade de leitura em palavras por minuto.', faq_title:'Perguntas frequentes sobre velocidade de leitura', ui:{ start:'Iniciar Teste de Leitura', done:'Concluí a Leitura' }, faq:[
    { q:'Qual é a velocidade média de leitura?', a:'Adulto médio: 200–300 PPM. Estudante universitário médio: 300–350 PPM. Leitores rápidos: 700–1.000 PPM (com compreensão reduzida). Audiobooks: ~150–160 PPM.' },
    { q:'Como posso melhorar minha velocidade de leitura?', a:'Minimize a subvocalização (ler palavras na cabeça). Use um dedo ou ponteiro para guiar os olhos. Leia em blocos (grupos de 3–5 palavras). Reduza a regressão (releitura).' },
    { q:'A velocidade de leitura afeta a compreensão?', a:'Sim. Técnicas de leitura dinâmica que triplicam as PPM tipicamente reduzem significativamente a compreensão. O ponto ideal para a maioria das pessoas é 250–350 PPM com boa compreensão.' }
  ]},
  `(function(){
  const passage="The ability to read quickly and comprehend information is an invaluable skill in today's information-rich world. Many people go through life reading at the same speed they learned as children, never realizing that reading speed and comprehension can both be dramatically improved with practice and the right techniques. Speed reading is not just about moving your eyes faster across the page — it involves training your brain to process groups of words rather than individual ones, eliminating the habit of silently pronouncing words as you read, and reducing the tendency to re-read sentences you have already covered. Research suggests that the average adult reads about 250 words per minute, while a college graduate typically reads between 300 and 350 words per minute. Elite readers, using trained techniques, can reach 700 words per minute while still maintaining adequate comprehension. However, extreme speed reading claims of 1,000 or more words per minute come with significant trade-offs in understanding and retention. The most effective approach is to gradually increase your reading speed through consistent practice, starting with easier material and working up to more complex texts. Just 15 minutes of deliberate practice each day can lead to significant improvements within a few weeks.";
  const wordCount=passage.split(/\\s+/).length;
  let startTime;
  document.getElementById('rs-begin').onclick=function(){
    startTime=Date.now();
    document.getElementById('rs-start').style.display='none';
    document.getElementById('rs-reading').style.display='';
    document.getElementById('rs-text').textContent=passage;
  };
  document.getElementById('rs-done').onclick=function(){
    const elapsed=(Date.now()-startTime)/60000;
    const wpm=Math.round(wordCount/elapsed);
    const level=wpm<150?'Slow':wpm<250?'Average':wpm<350?'Good':wpm<500?'Fast':'Very fast';
    document.getElementById('rs-reading').style.display='none';
    document.getElementById('rs-result').style.display='';
    document.getElementById('rs-result').innerHTML=\`<div style="font-size:3rem;font-weight:800;color:var(--accent,#6366f1)">\${wpm}</div><p style="font-size:1rem;opacity:0.7">words per minute</p><p style="font-size:1.1rem;font-weight:600;margin-top:0.5rem">\${level} reader</p><p style="opacity:0.5;font-size:0.85rem;margin-top:0.4rem">\${wordCount} words in \${(elapsed*60).toFixed(0)} seconds</p><button class="btn" style="margin-top:0.75rem" onclick="location.reload()">Try again</button>\`;
  };
})();`
);

// ─── 202 ── Focus Mode (distraction-free writing) ─────────────────────────────
tool('focusmode', 'productivity', '✍️',
  `<div id="fm-app"><div class="row" style="margin-bottom:0.5rem"><div class="field"><label for="fm-target">{{ui.target}}</label><input type="number" id="fm-target" min="100" step="100" value="500" style="width:80px" inputmode="numeric"></div><button class="btn" id="fm-fs">{{ui.fullscreen}}</button></div><textarea id="fm-area" style="width:100%;min-height:300px;padding:1rem;border:1px solid var(--line);border-radius:12px;background:var(--surface);color:var(--text);font-size:1.05rem;line-height:1.8;resize:vertical;font-family:Georgia,serif" placeholder="{{ui.placeholder}}"></textarea><div class="row" style="justify-content:space-between;margin-top:0.4rem;opacity:0.6;font-size:0.875rem"><span id="fm-count">0 words · 0 chars</span><span id="fm-pct"></span></div></div>`,
  { title:'Focus Mode — distraction-free writing with word count', metaDescription:'Free focus mode writer. Distraction-free writing environment with live word count, character count and word target progress tracking.', h1:'Focus Mode Writing Tool', intro:'A clean, distraction-free writing area with live word and character count. Set a word target to track your writing progress.', faq_title:'Focus mode FAQ', ui:{ target:'Word target', fullscreen:'Fullscreen', placeholder:'Start writing here… your text is saved automatically.' }, faq:[
    { q:'Is my writing saved?', a:'Yes. Your text is automatically saved to browser localStorage every time you type. It persists between page reloads. Clear browser data to erase it.' },
    { q:'Can I export my text?', a:'Select all text (Ctrl/Cmd+A) and copy, then paste into any word processor. For direct export, look for future updates with download options.' },
    { q:'What is the distraction-free mode for?', a:'Eliminating visual distractions (toolbars, notifications, side panels) helps writers enter a flow state. Studies show it takes an average of 23 minutes to fully regain focus after an interruption. A minimal UI reduces temptation to context-switch.' }
  ]},
  { title:'Modo Foco — escrita sem distrações com contagem de palavras', metaDescription:'Modo foco gratuito. Ambiente de escrita sem distrações com contagem de palavras ao vivo, contagem de caracteres e rastreamento de progresso de meta de palavras.', h1:'Ferramenta de Escrita em Modo Foco', intro:'Uma área de escrita limpa e sem distrações com contagem de palavras e caracteres ao vivo. Defina uma meta de palavras para rastrear seu progresso de escrita.', faq_title:'Perguntas frequentes sobre modo foco', ui:{ target:'Meta de palavras', fullscreen:'Tela cheia', placeholder:'Comece a escrever aqui… seu texto é salvo automaticamente.' }, faq:[
    { q:'Minha escrita é salva?', a:'Sim. Seu texto é automaticamente salvo no localStorage do navegador toda vez que você digita. Persiste entre recarregamentos de página.' },
    { q:'Posso exportar meu texto?', a:'Selecione todo o texto (Ctrl/Cmd+A) e copie, depois cole em qualquer processador de texto.' },
    { q:'Para que serve o modo sem distrações?', a:'Eliminar distrações visuais ajuda escritores a entrar em estado de fluxo. Estudos mostram que leva em média 23 minutos para recuperar totalmente o foco após uma interrupção.' }
  ]},
  `(function(){
  const KEY='focusmode_text';
  const area=document.getElementById('fm-area');
  area.value=localStorage.getItem(KEY)||'';
  function update(){
    const text=area.value;const words=text.trim()?text.trim().split(/\\s+/).length:0;const chars=text.length;
    const target=parseInt(document.getElementById('fm-target').value)||500;
    const pct=Math.min(100,Math.round(words/target*100));
    document.getElementById('fm-count').textContent=words+' words · '+chars+' chars';
    document.getElementById('fm-pct').textContent=pct+'% of '+target+' word target';
    localStorage.setItem(KEY,text);
  }
  area.addEventListener('input',update);update();
  document.getElementById('fm-fs').onclick=function(){
    if(!document.fullscreenElement){area.requestFullscreen&&area.requestFullscreen();this.textContent='Exit Fullscreen';}
    else{document.exitFullscreen&&document.exitFullscreen();this.textContent='Fullscreen';}
  };
})();`
);

// ─── 203 ── GPA Calculator ─────────────────────────────────────────────────────
tool('gpacalc', 'education', '🎓',
  `<div id="gpa-app"><div id="gpa-courses" style="display:grid;gap:0.4rem"></div><button class="btn" id="gpa-add" style="margin-top:0.5rem">+ {{ui.addCourse}}</button><div id="gpa-out" style="margin-top:0.75rem;text-align:center"></div></div>`,
  { title:'GPA Calculator — calculate your Grade Point Average', metaDescription:'Free GPA calculator. Add courses with grades and credit hours to calculate your GPA on a 4.0 scale. Supports letter grades A-F.', h1:'GPA Calculator', intro:'Add your courses, letter grades and credit hours to calculate your weighted GPA on a 4.0 scale.', faq_title:'GPA calculator FAQ', ui:{ addCourse:'Add Course' }, faq:[
    { q:'How is GPA calculated?', a:'GPA = Sum(grade points × credit hours) / Sum(credit hours). Grade points: A=4.0, A-=3.7, B+=3.3, B=3.0, B-=2.7, C+=2.3, C=2.0, C-=1.7, D+=1.3, D=1.0, F=0. A 4.0 GPA means straight As.' },
    { q:'What GPA do I need for grad school?', a:'Most graduate programs require a minimum 3.0 (B average). Competitive programs (top medical, law, MBA) often want 3.5+. STEM PhD programs may accept lower GPAs if research experience is strong.' },
    { q:'What is the difference between weighted and unweighted GPA?', a:'Unweighted GPA: maximum 4.0, all courses treated equally. Weighted GPA: maximum 5.0, AP and honors courses add bonus points. College admissions may recalculate GPAs to their own standard for fair comparison.' }
  ]},
  { title:'Calculadora de GPA — calcular sua Média de Pontos de Nota', metaDescription:'Calculadora de GPA gratuita. Adicione cursos com notas e horas de crédito para calcular seu GPA em uma escala de 4.0. Suporta notas por letra A-F.', h1:'Calculadora de GPA', intro:'Adicione seus cursos, notas por letra e horas de crédito para calcular seu GPA ponderado em uma escala de 4.0.', faq_title:'Perguntas frequentes sobre calculadora de GPA', ui:{ addCourse:'Adicionar Curso' }, faq:[
    { q:'Como o GPA é calculado?', a:'GPA = Soma(pontos de nota × horas de crédito) / Soma(horas de crédito). Pontos de nota: A=4,0, A-=3,7, B+=3,3, B=3,0, B-=2,7, C+=2,3, C=2,0, C-=1,7, D+=1,3, D=1,0, F=0.' },
    { q:'Qual GPA preciso para a pós-graduação?', a:'A maioria dos programas de pós-graduação requer um mínimo de 3,0 (média B). Programas competitivos frequentemente querem 3,5+.' },
    { q:'Qual a diferença entre GPA ponderado e não ponderado?', a:'GPA não ponderado: máximo 4,0, todos os cursos tratados igualmente. GPA ponderado: máximo 5,0, cursos AP e honra adicionam pontos bônus.' }
  ]},
  `(function(){
  const gradeMap={'A+':4.0,'A':4.0,'A-':3.7,'B+':3.3,'B':3.0,'B-':2.7,'C+':2.3,'C':2.0,'C-':1.7,'D+':1.3,'D':1.0,'D-':0.7,'F':0.0};
  const grades=Object.keys(gradeMap);
  let courses=[{name:'Course 1',grade:'A',credits:3},{name:'Course 2',grade:'B+',credits:3}];
  function render(){
    const cont=document.getElementById('gpa-courses');
    cont.innerHTML=courses.map((c,i)=>\`<div style="display:grid;grid-template-columns:1fr auto auto auto;gap:0.4rem;align-items:center"><input type="text" value="\${c.name}" style="padding:0.4rem;border:1px solid var(--line);border-radius:6px;background:var(--surface);color:var(--text)" onchange="courses[\${i}].name=this.value;calcGPA()"><select style="padding:0.4rem;border:1px solid var(--line);border-radius:6px;background:var(--surface);color:var(--text)" onchange="courses[\${i}].grade=this.value;calcGPA()">\${grades.map(g=>\`<option\${g===c.grade?' selected':''}>\${g}</option>\`).join('')}</select><input type="number" value="\${c.credits}" min="1" max="6" style="width:50px;padding:0.4rem;border:1px solid var(--line);border-radius:6px;background:var(--surface);color:var(--text);text-align:center" onchange="courses[\${i}].credits=parseFloat(this.value)||3;calcGPA()"><button style="background:none;border:none;cursor:pointer;opacity:0.5;font-size:1.1rem" onclick="courses.splice(\${i},1);render();calcGPA()">×</button></div>\`).join('');
    calcGPA();
  }
  function calcGPA(){
    let totalPoints=0,totalCredits=0;
    courses.forEach(c=>{totalPoints+=gradeMap[c.grade]*c.credits;totalCredits+=c.credits;});
    const gpa=totalCredits?totalPoints/totalCredits:0;
    const out=document.getElementById('gpa-out');
    out.innerHTML=\`<div style="font-size:3rem;font-weight:800;color:var(--accent,#6366f1)">\${gpa.toFixed(2)}</div><p style="opacity:0.6">GPA on 4.0 scale · \${totalCredits} credit hours</p>\`;
  }
  window.courses=courses;
  document.getElementById('gpa-add').onclick=function(){courses.push({name:'Course '+(courses.length+1),grade:'B',credits:3});render();};
  render();
})();`
);

// ─── 204 ── Test Grade Calculator ─────────────────────────────────────────────
tool('testgrade', 'education', '📝',
  `<form id="tg-form"><div class="row"><div class="field"><label for="tg-score">{{ui.score}}</label><input type="number" id="tg-score" min="0" step="1" value="85" inputmode="numeric"></div><div class="field"><label for="tg-total">{{ui.total}}</label><input type="number" id="tg-total" min="1" step="1" value="100" inputmode="numeric"></div></div><button class="btn" type="submit">{{ui.calculate}}</button></form><div id="tg-out" hidden class="result" style="text-align:center"></div>`,
  { title:'Test Grade Calculator — convert score to percentage and letter grade', metaDescription:'Free test grade calculator. Enter your score and total points to get the percentage and letter grade (A, B, C, D or F) instantly.', h1:'Test Grade Calculator', intro:'Enter your score and total possible points to calculate your percentage and letter grade.', faq_title:'Test grade calculator FAQ', ui:{ score:'Your score', total:'Total points', calculate:'Calculate' }, faq:[
    { q:'What are the standard letter grade cutoffs?', a:'A: 90–100%, B: 80–89%, C: 70–79%, D: 60–69%, F: below 60%. These are typical US cutoffs. Some institutions use 10-point scales (A=93+, A-=90+, B+=87+) or other systems.' },
    { q:'How do I calculate percentage from score?', a:'Percentage = (Score / Total) × 100. Example: 76/90 = 0.8444 × 100 = 84.44% = B.' },
    { q:'What is a passing grade?', a:'In the US, D (60%) is typically the minimum passing grade for a single course. However, many programs require a C (70%) to count toward degree requirements. Graduate programs typically require a B (80%) to pass.' }
  ]},
  { title:'Calculadora de Nota de Teste — converter pontuação em porcentagem e nota por letra', metaDescription:'Calculadora de nota de teste gratuita. Insira sua pontuação e pontos totais para obter a porcentagem e nota por letra (A, B, C, D ou F) instantaneamente.', h1:'Calculadora de Nota de Teste', intro:'Insira sua pontuação e pontos possíveis totais para calcular sua porcentagem e nota por letra.', faq_title:'Perguntas frequentes sobre calculadora de nota de teste', ui:{ score:'Sua pontuação', total:'Pontos totais', calculate:'Calcular' }, faq:[
    { q:'Quais são os limites padrão de nota por letra?', a:'A: 90–100%, B: 80–89%, C: 70–79%, D: 60–69%, F: abaixo de 60%. Estes são limites típicos dos EUA.' },
    { q:'Como calculo porcentagem a partir da pontuação?', a:'Porcentagem = (Pontuação / Total) × 100. Exemplo: 76/90 = 0,8444 × 100 = 84,44% = B.' },
    { q:'O que é nota de aprovação?', a:'Nos EUA, D (60%) é tipicamente a nota mínima de aprovação para um único curso. No entanto, muitos programas exigem C (70%) para contar para requisitos de graduação.' }
  ]},
  `(function(){
  const scale=[['A+',97],['A',93],['A-',90],['B+',87],['B',83],['B-',80],['C+',77],['C',73],['C-',70],['D+',67],['D',63],['D-',60],['F',0]];
  document.getElementById('tg-form').addEventListener('submit',function(e){
    e.preventDefault();
    const score=parseFloat(document.getElementById('tg-score').value);
    const total=parseFloat(document.getElementById('tg-total').value);
    const pct=score/total*100;
    const letter=scale.find(([,min])=>pct>=min)?.[0]||'F';
    const color=pct>=90?'#22c55e':pct>=80?'#84cc16':pct>=70?'#eab308':pct>=60?'#f97316':'#ef4444';
    const out=document.getElementById('tg-out');out.hidden=false;
    out.innerHTML=\`<div style="font-size:3rem;font-weight:800;color:\${color}">\${letter}</div><div style="font-size:1.5rem;font-weight:600">\${pct.toFixed(2)}%</div><p style="opacity:0.6">\${score} / \${total} points</p>\`;
  });
})();`
);

// ─── 205 ── Multiplication Table Generator ─────────────────────────────────────
tool('multtable', 'education', '✖️',
  `<div id="mt-app"><div class="row"><div class="field"><label for="mt-num">{{ui.number}}</label><input type="number" id="mt-num" min="1" max="100" value="7" inputmode="numeric" style="width:80px"></div><div class="field"><label for="mt-size">{{ui.size}}</label><select id="mt-size"><option value="10">×10</option><option value="12" selected>×12</option><option value="15">×15</option><option value="20">×20</option></select></div><button class="btn" id="mt-go" style="align-self:flex-end">{{ui.show}}</button></div><div id="mt-out" style="margin-top:0.75rem;overflow-x:auto"></div></div>`,
  { title:'Multiplication Table Generator — view any times table up to ×20', metaDescription:'Free multiplication table generator. Enter a number to see its full multiplication table, or generate a complete times table grid up to 20×20.', h1:'Multiplication Table Generator', intro:'Generate the multiplication table for any number, or view a full grid. Select a number and size to get started.', faq_title:'Multiplication table FAQ', ui:{ number:'Number', size:'Table size', show:'Generate' }, faq:[
    { q:'What is a multiplication table?', a:'A multiplication table shows the products of multiplying one number by a range of integers. The classic "times table" up to 12×12 is typically memorized in primary school.' },
    { q:'Why learn multiplication tables?', a:'Instant recall of multiplication facts speeds up all arithmetic — from mental math and estimation to long division and algebra. Research shows that automatized multiplication recall frees working memory for more complex problem solving.' },
    { q:'What is the commutative property?', a:'a × b = b × a. So 6 × 7 = 7 × 6 = 42. This means you only need to memorize half the table — the upper or lower triangle. The diagonal contains perfect squares (1, 4, 9, 16, 25…).' }
  ]},
  { title:'Gerador de Tabela de Multiplicação — ver qualquer tabuada até ×20', metaDescription:'Gerador de tabela de multiplicação gratuito. Insira um número para ver sua tabela de multiplicação completa, ou gere uma grade completa de tabuada até 20×20.', h1:'Gerador de Tabela de Multiplicação', intro:'Gere a tabela de multiplicação para qualquer número, ou visualize uma grade completa. Selecione um número e tamanho para começar.', faq_title:'Perguntas frequentes sobre tabela de multiplicação', ui:{ number:'Número', size:'Tamanho da tabela', show:'Gerar' }, faq:[
    { q:'O que é uma tabela de multiplicação?', a:'Uma tabela de multiplicação mostra os produtos de multiplicar um número por uma faixa de inteiros. A clássica "tabuada" até 12×12 é tipicamente memorizada na escola primária.' },
    { q:'Por que aprender tabuadas?', a:'Recordação instantânea de fatos de multiplicação acelera toda a aritmética — da matemática mental e estimativa à divisão longa e álgebra.' },
    { q:'O que é a propriedade comutativa?', a:'a × b = b × a. Então 6 × 7 = 7 × 6 = 42. Isso significa que você só precisa memorizar metade da tabela.' }
  ]},
  `(function(){
  document.getElementById('mt-go').onclick=function(){
    const n=parseInt(document.getElementById('mt-num').value);
    const size=parseInt(document.getElementById('mt-size').value);
    let html='<table style="border-collapse:collapse;font-size:0.9rem">';
    for(let row=1;row<=size;row++){
      html+='<tr><td style="padding:4px 8px;background:var(--surface);font-weight:600;border:1px solid var(--line);text-align:center">'+n+' × '+row+'</td><td style="padding:4px 8px;border:1px solid var(--line);text-align:center;font-weight:700;color:var(--accent,#6366f1)">'+(n*row)+'</td></tr>';
    }
    html+='</table>';
    document.getElementById('mt-out').innerHTML=html;
  };
  document.getElementById('mt-go').click();
})();`
);

// ─── 206 ── Algebra Equation Solver ───────────────────────────────────────────
tool('algebrasolver', 'math', '🧮',
  `<form id="as-form"><div class="field"><label for="as-type">{{ui.type}}</label><select id="as-type"><option value="linear">{{ui.linear}} (ax + b = c)</option><option value="systems">{{ui.systems}} (2 equations, 2 unknowns)</option></select></div><div id="as-linear-fields"><div class="row"><div class="field"><label for="as-a">a</label><input type="number" id="as-a" value="2" step="any" inputmode="decimal"></div><div class="field"><label for="as-b">b</label><input type="number" id="as-b" value="3" step="any" inputmode="decimal"></div><div class="field"><label for="as-c">c</label><input type="number" id="as-c" value="7" step="any" inputmode="decimal"></div></div></div><div id="as-sys-fields" style="display:none"><p style="opacity:0.6;font-size:0.875rem">{{ui.sysNote}}</p><div class="row"><div class="field"><label>a₁x + b₁y = c₁</label><div style="display:flex;gap:0.4rem"><input type="number" id="as-a1" value="2" step="any" style="width:60px" inputmode="decimal"><input type="number" id="as-b1" value="1" step="any" style="width:60px" inputmode="decimal"><input type="number" id="as-c1" value="5" step="any" style="width:60px" inputmode="decimal"></div></div><div class="field"><label>a₂x + b₂y = c₂</label><div style="display:flex;gap:0.4rem"><input type="number" id="as-a2" value="1" step="any" style="width:60px" inputmode="decimal"><input type="number" id="as-b2" value="-1" step="any" style="width:60px" inputmode="decimal"><input type="number" id="as-c2" value="1" step="any" style="width:60px" inputmode="decimal"></div></div></div></div><button class="btn" type="submit">{{ui.solve}}</button></form><div id="as-out" hidden class="result" style="text-align:center"></div>`,
  { title:'Algebra Equation Solver — solve linear equations and 2x2 systems', metaDescription:'Free algebra solver. Solve linear equations (ax + b = c) and systems of two linear equations with two unknowns using substitution and Cramer\'s rule.', h1:'Algebra Equation Solver', intro:"Solve linear equations and systems of two equations with two unknowns. Enter the coefficients and click Solve.", faq_title:'Algebra solver FAQ', ui:{ type:'Equation type', linear:'Linear equation', systems:'System of 2 equations', sysNote:'Enter coefficients for both equations', solve:'Solve' }, faq:[
    { q:'How is a linear equation solved?', a:'ax + b = c → x = (c - b) / a. Example: 2x + 3 = 7 → x = (7-3)/2 = 2.' },
    { q:"How are systems of equations solved?", a:"Using Cramer's Rule with a 2×2 determinant. For a₁x + b₁y = c₁ and a₂x + b₂y = c₂: D = a₁b₂ - a₂b₁. x = (c₁b₂ - c₂b₁) / D. y = (a₁c₂ - a₂c₁) / D." },
    { q:'What if there is no solution?', a:'A system has no unique solution when D = 0. If D = 0 and the numerators are also 0, the system has infinitely many solutions (dependent equations). If D = 0 but numerators are not 0, there is no solution (inconsistent equations).' }
  ]},
  { title:'Solucionador de Equações Algébricas — resolver equações lineares e sistemas 2x2', metaDescription:'Solucionador de álgebra gratuito. Resolva equações lineares (ax + b = c) e sistemas de duas equações lineares com duas incógnitas.', h1:'Solucionador de Equações Algébricas', intro:'Resolva equações lineares e sistemas de duas equações com duas incógnitas. Insira os coeficientes e clique em Resolver.', faq_title:'Perguntas frequentes sobre solucionador de álgebra', ui:{ type:'Tipo de equação', linear:'Equação linear', systems:'Sistema de 2 equações', sysNote:'Insira coeficientes para ambas as equações', solve:'Resolver' }, faq:[
    { q:'Como uma equação linear é resolvida?', a:'ax + b = c → x = (c - b) / a. Exemplo: 2x + 3 = 7 → x = (7-3)/2 = 2.' },
    { q:'Como são resolvidos sistemas de equações?', a:'Usando a Regra de Cramer com um determinante 2×2. Para a₁x + b₁y = c₁ e a₂x + b₂y = c₂: D = a₁b₂ - a₂b₁. x = (c₁b₂ - c₂b₁) / D. y = (a₁c₂ - a₂c₁) / D.' },
    { q:'E se não houver solução?', a:'Um sistema não tem solução única quando D = 0. Se D = 0 e os numeradores também são 0, o sistema tem infinitas soluções (equações dependentes). Se D = 0 mas os numeradores não são 0, não há solução.' }
  ]},
  `(function(){
  document.getElementById('as-type').addEventListener('change',function(){
    document.getElementById('as-linear-fields').style.display=this.value==='linear'?'':'none';
    document.getElementById('as-sys-fields').style.display=this.value==='systems'?'':'none';
  });
  document.getElementById('as-form').addEventListener('submit',function(e){
    e.preventDefault();
    const type=document.getElementById('as-type').value;
    const out=document.getElementById('as-out');out.hidden=false;
    if(type==='linear'){
      const a=parseFloat(document.getElementById('as-a').value);
      const b=parseFloat(document.getElementById('as-b').value);
      const c=parseFloat(document.getElementById('as-c').value);
      if(a===0){out.innerHTML='<p>No unique solution (a = 0)</p>';return;}
      const x=(c-b)/a;
      out.innerHTML=\`<div style="font-size:1.8rem;font-weight:800">x = \${x.toPrecision(8).replace(/\\.?0+$/,'')}</div><p style="opacity:0.6">\${a}x + \${b} = \${c} → x = (\${c} − \${b}) / \${a}</p>\`;
    }else{
      const a1=parseFloat(document.getElementById('as-a1').value),b1=parseFloat(document.getElementById('as-b1').value),c1=parseFloat(document.getElementById('as-c1').value);
      const a2=parseFloat(document.getElementById('as-a2').value),b2=parseFloat(document.getElementById('as-b2').value),c2=parseFloat(document.getElementById('as-c2').value);
      const D=a1*b2-a2*b1;
      if(D===0){out.innerHTML='<p>No unique solution (D = 0)</p>';return;}
      const x=(c1*b2-c2*b1)/D,y=(a1*c2-a2*c1)/D;
      out.innerHTML=\`<div style="font-size:1.5rem;font-weight:800">x = \${x.toPrecision(8).replace(/\\.?0+$/,'')}, y = \${y.toPrecision(8).replace(/\\.?0+$/,'')}</div><p style="opacity:0.6">D = \${D}</p>\`;
    }
  });
})();`
);

// ─── 207 ── Statistics Visualizer ─────────────────────────────────────────────
tool('statsviz', 'math', '📊',
  `<div id="sv-app"><div class="field"><label for="sv-data">{{ui.data}}</label><textarea id="sv-data" rows="3" style="width:100%;padding:0.5rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text);font-family:monospace" placeholder="1, 4, 7, 2, 9, 3, 5, 8, 6, 4, 3, 7">1, 4, 7, 2, 9, 3, 5, 8, 6, 4, 3, 7</textarea></div><button class="btn" id="sv-go">{{ui.analyse}}</button><div id="sv-out" style="display:grid;gap:0.75rem;margin-top:0.75rem"></div></div>`,
  { title:'Statistics Visualizer — calculate descriptive statistics from data', metaDescription:'Free statistics visualizer. Enter a list of numbers to calculate mean, median, mode, variance, standard deviation and see a simple frequency distribution.', h1:'Statistics Visualizer', intro:'Enter comma-separated numbers to calculate mean, median, mode, range, variance, standard deviation and percentiles with a frequency bar chart.', faq_title:'Statistics visualizer FAQ', ui:{ data:'Data (comma-separated numbers)', analyse:'Analyse' }, faq:[
    { q:'What is the difference between mean, median and mode?', a:'Mean (average): sum / count. Median: middle value when sorted. Mode: most frequent value. For symmetric distributions they are equal. For skewed data, the median is more representative than the mean (e.g., income data).' },
    { q:'What is standard deviation?', a:'Standard deviation measures how spread out data is from the mean. 68% of data falls within ±1 SD, 95% within ±2 SD, 99.7% within ±3 SD (for normal distributions). This is the "68-95-99.7 rule".' },
    { q:'What is the difference between population and sample variance?', a:'Population variance divides by N; sample variance divides by N-1 (Bessel\'s correction). This correction makes sample variance an unbiased estimator of population variance. This calculator shows sample statistics.' }
  ]},
  { title:'Visualizador de Estatísticas — calcular estatísticas descritivas de dados', metaDescription:'Visualizador de estatísticas gratuito. Insira uma lista de números para calcular média, mediana, moda, variância, desvio padrão e ver uma distribuição de frequência simples.', h1:'Visualizador de Estatísticas', intro:'Insira números separados por vírgula para calcular média, mediana, moda, amplitude, variância, desvio padrão e percentis com um gráfico de barras de frequência.', faq_title:'Perguntas frequentes sobre visualizador de estatísticas', ui:{ data:'Dados (números separados por vírgula)', analyse:'Analisar' }, faq:[
    { q:'Qual a diferença entre média, mediana e moda?', a:'Média (average): soma / contagem. Mediana: valor do meio quando ordenado. Moda: valor mais frequente. Para distribuições simétricas eles são iguais. Para dados enviesados, a mediana é mais representativa.' },
    { q:'O que é desvio padrão?', a:'Desvio padrão mede o quanto os dados estão espalhados em relação à média. 68% dos dados caem dentro de ±1 DP, 95% dentro de ±2 DP, 99,7% dentro de ±3 DP (para distribuições normais).' },
    { q:'Qual a diferença entre variância populacional e amostral?', a:'Variância populacional divide por N; variância amostral divide por N-1 (correção de Bessel). Esta correção torna a variância amostral um estimador não tendencioso da variância populacional.' }
  ]},
  `(function(){
  document.getElementById('sv-go').onclick=function(){
    const raw=document.getElementById('sv-data').value.split(/[,\\s]+/).map(Number).filter(n=>!isNaN(n)&&n!==undefined);
    if(!raw.length)return;
    const sorted=[...raw].sort((a,b)=>a-b);
    const n=raw.length;const mean=raw.reduce((a,b)=>a+b,0)/n;
    const median=n%2===0?(sorted[n/2-1]+sorted[n/2])/2:sorted[Math.floor(n/2)];
    const freq={};raw.forEach(v=>freq[v]=(freq[v]||0)+1);
    const maxFreq=Math.max(...Object.values(freq));
    const modes=Object.entries(freq).filter(([,c])=>c===maxFreq).map(([v])=>v);
    const variance=raw.reduce((a,v)=>a+Math.pow(v-mean,2),0)/(n-1);
    const std=Math.sqrt(variance);
    const range=sorted[n-1]-sorted[0];
    const p25=sorted[Math.floor(n*0.25)];const p75=sorted[Math.floor(n*0.75)];
    const fmt=v=>Number.isInteger(v)?v:v.toFixed(4);
    const items=[['n',n],['Sum',fmt(raw.reduce((a,b)=>a+b,0))],['Mean',fmt(mean)],['Median',fmt(median)],['Mode',modes.join(', ')],['Range',fmt(range)],['Std Dev (σ)',fmt(std)],['Variance',fmt(variance)],['Min',sorted[0]],['Max',sorted[n-1]],['Q1 (25th)',p25],['Q3 (75th)',p75]];
    const maxVal=Math.max(...Object.values(freq));
    const barChart='<div style="margin-top:0.5rem"><strong>Frequency</strong><div style="display:flex;flex-wrap:wrap;gap:0.3rem;align-items:flex-end;margin-top:0.4rem">'+Object.entries(freq).sort(([a],[b])=>a-b).map(([v,c])=>\`<div style="text-align:center;font-size:0.75rem"><div style="width:28px;background:var(--accent,#6366f1);border-radius:4px 4px 0 0;height:\${Math.round(c/maxVal*80)}px;margin:0 auto"></div>\${v}<br><span style="opacity:0.5">\${c}</span></div>\`).join('')+'</div></div>';
    document.getElementById('sv-out').innerHTML='<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:0.4rem">'+items.map(([k,v])=>\`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.4rem 0.6rem"><div style="font-size:0.7rem;opacity:0.6">\${k}</div><strong style="font-size:0.9rem">\${v}</strong></div>\`).join('')+'</div>'+barChart;
  };
  document.getElementById('sv-go').click();
})();`
);

console.log('\n✓ Batch 10 (tools 187-207) complete.');
