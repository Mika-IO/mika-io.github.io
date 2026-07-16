#!/usr/bin/env node
// gen-batch8.mjs — tools 151-185 (converters, science, dev, utility, fun)
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

// ─── 151 ── Area Unit Converter ───────────────────────────────────────────────
tool('areaconverter', 'converter', '📐',
  `<div id="ac-app"><div class="row"><div class="field"><label for="ac-val">{{ui.value}}</label><input type="number" id="ac-val" step="any" value="1" inputmode="decimal"></div><div class="field"><label for="ac-from">{{ui.from}}</label><select id="ac-from"></select></div><div class="field"><label for="ac-to">{{ui.to}}</label><select id="ac-to"></select></div></div><div class="result"><span class="big" id="ac-out">—</span></div></div>`,
  { title:'Area Unit Converter — convert between m², ft², acres and more', metaDescription:'Free area converter. Convert between square metres, square feet, square miles, acres, hectares, square kilometres and more instantly.', h1:'Area Unit Converter', intro:'Convert area between metric and imperial units including square metres, acres, hectares, square feet and more.', faq_title:'Area converter FAQ', ui:{ value:'Value', from:'From', to:'To' }, faq:[
    { q:'How many square feet in an acre?', a:'1 acre = 43,560 square feet. An acre is roughly the area of a football field (without end zones). There are 640 acres in a square mile.' },
    { q:'How big is a hectare?', a:'1 hectare = 10,000 m² (100m × 100m). 1 hectare ≈ 2.47 acres. Hectares are the standard unit for land area in most countries that use the metric system.' },
    { q:'How many square metres in a square kilometre?', a:'1 km² = 1,000,000 m² (1,000m × 1,000m). The metric area system squares the linear units, so the conversion factor is always the linear factor squared.' }
  ]},
  { title:'Conversor de Área — converter entre m², ft², acres e mais', metaDescription:'Conversor de área gratuito. Converta entre metros quadrados, pés quadrados, milhas quadradas, acres, hectares, quilômetros quadrados e mais instantaneamente.', h1:'Conversor de Área', intro:'Converta área entre unidades métricas e imperiais incluindo metros quadrados, acres, hectares, pés quadrados e mais.', faq_title:'Perguntas frequentes sobre conversor de área', ui:{ value:'Valor', from:'De', to:'Para' }, faq:[
    { q:'Quantos pés quadrados há em um acre?', a:'1 acre = 43.560 pés quadrados. Um acre é aproximadamente a área de um campo de futebol americano (sem as zonas de fim). Há 640 acres em uma milha quadrada.' },
    { q:'Quão grande é um hectare?', a:'1 hectare = 10.000 m² (100m × 100m). 1 hectare ≈ 2,47 acres. Hectares são a unidade padrão para área de terra na maioria dos países que usam o sistema métrico.' },
    { q:'Quantos metros quadrados há em um quilômetro quadrado?', a:'1 km² = 1.000.000 m² (1.000m × 1.000m). O sistema métrico de área eleva ao quadrado as unidades lineares.' }
  ]},
  `(function(){
  const units=[['Square metre (m²)',1],['Square kilometre (km²)',1e6],['Square centimetre (cm²)',1e-4],['Square millimetre (mm²)',1e-6],['Hectare',1e4],['Acre',4046.856],['Square foot (ft²)',0.092903],['Square inch (in²)',6.4516e-4],['Square yard (yd²)',0.836127],['Square mile (mi²)',2589988.1],['Square nautical mile',3429904]];
  const sf=document.getElementById('ac-from'),st=document.getElementById('ac-to');
  units.forEach(([name],i)=>{const o1=document.createElement('option');o1.value=i;o1.textContent=name;sf.appendChild(o1);const o2=document.createElement('option');o2.value=i;o2.textContent=name;o2.selected=i===1;st.appendChild(o2);});
  function conv(){const v=parseFloat(document.getElementById('ac-val').value);if(isNaN(v))return;const base=v*units[sf.value][1];const res=base/units[st.value][1];document.getElementById('ac-out').textContent=res.toPrecision(8).replace(/\\.?0+$/,'');}
  document.getElementById('ac-val').addEventListener('input',conv);sf.addEventListener('change',conv);st.addEventListener('change',conv);conv();
})();`
);

// ─── 152 ── Volume Unit Converter ─────────────────────────────────────────────
tool('volumeconverter', 'converter', '🥤',
  `<div id="vc-app"><div class="row"><div class="field"><label for="vc-val">{{ui.value}}</label><input type="number" id="vc-val" step="any" value="1" inputmode="decimal"></div><div class="field"><label for="vc-from">{{ui.from}}</label><select id="vc-from"></select></div><div class="field"><label for="vc-to">{{ui.to}}</label><select id="vc-to"></select></div></div><div class="result"><span class="big" id="vc-out">—</span></div></div>`,
  { title:'Volume Unit Converter — convert litres, gallons, cups and more', metaDescription:'Free volume converter. Convert between litres, millilitres, US gallons, fluid ounces, cups, pints, quarts, cubic metres and more.', h1:'Volume Unit Converter', intro:'Convert volume between metric and imperial units including litres, gallons, cups, fluid ounces, pints and more.', faq_title:'Volume converter FAQ', ui:{ value:'Value', from:'From', to:'To' }, faq:[
    { q:'How many cups in a litre?', a:'1 litre ≈ 4.227 US cups. A US cup = 236.6 ml. Note that the UK metric cup = 250 ml (so 4 per litre), and the US legal cup (used in nutrition labelling) = 240 ml.' },
    { q:'How many fluid ounces in a gallon?', a:'1 US gallon = 128 US fluid ounces. 1 UK (imperial) gallon = 160 imperial fluid ounces. Note: US and UK gallons and fluid ounces are different sizes.' },
    { q:'What is the difference between a US and UK gallon?', a:'1 US gallon = 3.785 litres. 1 UK (imperial) gallon = 4.546 litres. The US gallon is about 83% the size of the UK gallon. This difference is important in international shipping and fuel economy comparisons.' }
  ]},
  { title:'Conversor de Volume — converter litros, galões, xícaras e mais', metaDescription:'Conversor de volume gratuito. Converta entre litros, mililitros, galões americanos, onças fluidas, xícaras, pintas, quartos, metros cúbicos e mais.', h1:'Conversor de Volume', intro:'Converta volume entre unidades métricas e imperiais incluindo litros, galões, xícaras, onças fluidas, pintas e mais.', faq_title:'Perguntas frequentes sobre conversor de volume', ui:{ value:'Valor', from:'De', to:'Para' }, faq:[
    { q:'Quantas xícaras há em um litro?', a:'1 litro ≈ 4,227 xícaras americanas. Uma xícara americana = 236,6 ml.' },
    { q:'Quantas onças fluidas há em um galão?', a:'1 galão americano = 128 onças fluidas americanas. 1 galão britânico (imperial) = 160 onças fluidas imperiais.' },
    { q:'Qual a diferença entre galão americano e britânico?', a:'1 galão americano = 3,785 litros. 1 galão britânico (imperial) = 4,546 litros. O galão americano é cerca de 83% do tamanho do galão britânico.' }
  ]},
  `(function(){
  const units=[['Litre (L)',1],['Millilitre (mL)',0.001],['Cubic metre (m³)',1000],['Cubic centimetre (cm³)',0.001],['US gallon',3.78541],['US quart',0.946353],['US pint',0.473176],['US cup',0.236588],['US fluid ounce',0.029574],['US tablespoon',0.014787],['US teaspoon',0.004929],['UK gallon',4.54609],['UK fluid ounce',0.028413],['UK pint',0.568261],['Cubic foot (ft³)',28.3168],['Cubic inch (in³)',0.016387]];
  const sf=document.getElementById('vc-from'),st=document.getElementById('vc-to');
  units.forEach(([name],i)=>{const o1=document.createElement('option');o1.value=i;o1.textContent=name;sf.appendChild(o1);const o2=document.createElement('option');o2.value=i;o2.textContent=name;o2.selected=i===1;st.appendChild(o2);});
  function conv(){const v=parseFloat(document.getElementById('vc-val').value);if(isNaN(v))return;const base=v*units[sf.value][1];const res=base/units[st.value][1];document.getElementById('vc-out').textContent=res.toPrecision(8).replace(/\\.?0+$/,'');}
  document.getElementById('vc-val').addEventListener('input',conv);sf.addEventListener('change',conv);st.addEventListener('change',conv);conv();
})();`
);

// ─── 153 ── Speed Unit Converter ──────────────────────────────────────────────
tool('speedconverter', 'converter', '🚀',
  `<div id="sc-app"><div class="row"><div class="field"><label for="sc-val">{{ui.value}}</label><input type="number" id="sc-val" step="any" value="100" inputmode="decimal"></div><div class="field"><label for="sc-from">{{ui.from}}</label><select id="sc-from"></select></div><div class="field"><label for="sc-to">{{ui.to}}</label><select id="sc-to"></select></div></div><div class="result"><span class="big" id="sc-out">—</span></div></div>`,
  { title:'Speed Unit Converter — convert km/h, mph, knots, Mach and more', metaDescription:'Free speed converter. Convert between km/h, mph, m/s, ft/s, knots, Mach and the speed of light instantly.', h1:'Speed Unit Converter', intro:'Convert speed between metric, imperial and special units including km/h, mph, knots, m/s and Mach number.', faq_title:'Speed converter FAQ', ui:{ value:'Value', from:'From', to:'To' }, faq:[
    { q:'What is a knot?', a:'A knot is 1 nautical mile per hour = 1.852 km/h = 1.151 mph. Knots are used in aviation and maritime navigation worldwide. A nautical mile is based on the Earth\'s circumference (1/60th of a degree of latitude).' },
    { q:'What is Mach number?', a:'Mach number is speed relative to the speed of sound. Mach 1 = the speed of sound ≈ 1235 km/h (at sea level, 15°C). It varies with altitude and temperature. Mach 1 at 30,000 feet is about 1062 km/h.' },
    { q:'How fast is the speed of light?', a:'The speed of light in a vacuum (c) is exactly 299,792,458 m/s ≈ 1,079,252,849 km/h ≈ 186,282 miles per second. This is an absolute universal speed limit — nothing with mass can reach or exceed it.' }
  ]},
  { title:'Conversor de Velocidade — converter km/h, mph, nós, Mach e mais', metaDescription:'Conversor de velocidade gratuito. Converta entre km/h, mph, m/s, ft/s, nós, Mach e a velocidade da luz instantaneamente.', h1:'Conversor de Velocidade', intro:'Converta velocidade entre unidades métricas, imperiais e especiais incluindo km/h, mph, nós, m/s e número de Mach.', faq_title:'Perguntas frequentes sobre conversor de velocidade', ui:{ value:'Valor', from:'De', to:'Para' }, faq:[
    { q:'O que é um nó (knot)?', a:'Um nó é 1 milha náutica por hora = 1,852 km/h = 1,151 mph. Nós são usados em aviação e navegação marítima em todo o mundo.' },
    { q:'O que é o número de Mach?', a:'O número de Mach é a velocidade em relação à velocidade do som. Mach 1 ≈ 1.235 km/h (ao nível do mar, 15°C).' },
    { q:'Qual é a velocidade da luz?', a:'A velocidade da luz no vácuo (c) é exatamente 299.792.458 m/s ≈ 1.079.252.849 km/h. Este é um limite de velocidade universal absoluto.' }
  ]},
  `(function(){
  const units=[['km/h',1],['m/s',3.6],['mph',1.60934],['ft/s',1.09728],['knot',1.852],['Mach (sea level)',1235.0],['Speed of light (c)',1.08e9]];
  const sf=document.getElementById('sc-from'),st=document.getElementById('sc-to');
  units.forEach(([name],i)=>{const o1=document.createElement('option');o1.value=i;o1.textContent=name;sf.appendChild(o1);const o2=document.createElement('option');o2.value=i;o2.textContent=name;o2.selected=i===2;st.appendChild(o2);});
  function conv(){const v=parseFloat(document.getElementById('sc-val').value);if(isNaN(v))return;const base=v*units[sf.value][1];const res=base/units[st.value][1];document.getElementById('sc-out').textContent=res.toPrecision(8).replace(/\\.?0+$/,'');}
  document.getElementById('sc-val').addEventListener('input',conv);sf.addEventListener('change',conv);st.addEventListener('change',conv);conv();
})();`
);

// ─── 154 ── Data Storage Converter ────────────────────────────────────────────
tool('storageconverter', 'converter', '💾',
  `<div id="ds-app"><div class="row"><div class="field"><label for="ds-val">{{ui.value}}</label><input type="number" id="ds-val" step="any" value="1" inputmode="decimal"></div><div class="field"><label for="ds-from">{{ui.from}}</label><select id="ds-from"></select></div><div class="field"><label for="ds-to">{{ui.to}}</label><select id="ds-to"></select></div></div><div class="result"><span class="big" id="ds-out">—</span></div></div>`,
  { title:'Data Storage Converter — convert bytes, KB, MB, GB, TB and more', metaDescription:'Free data storage converter. Convert between bits, bytes, kilobytes, megabytes, gigabytes, terabytes, petabytes and their binary counterparts.', h1:'Data Storage Converter', intro:'Convert between bit/byte units. Supports both decimal (SI) units (KB = 1000 bytes) and binary units (KiB = 1024 bytes).', faq_title:'Data storage converter FAQ', ui:{ value:'Value', from:'From', to:'To' }, faq:[
    { q:'What is the difference between KB and KiB?', a:'KB (kilobyte) in the SI system = 1,000 bytes. KiB (kibibyte) in the IEC binary system = 1,024 bytes. Hard drive manufacturers use SI (so 1 TB = 1,000,000,000,000 bytes), while operating systems often use binary (so Windows shows 1 TB drive as ~931 GiB).' },
    { q:'Why does my hard drive show less space than advertised?', a:'Hard drive manufacturers define 1 GB = 1,000,000,000 bytes (10^9). Windows shows space in GiB (gibibytes) where 1 GiB = 2^30 = 1,073,741,824 bytes. A 1 TB drive contains 1,000 GB (SI) ≈ 931 GiB — which is what Windows shows.' },
    { q:'What comes after terabyte?', a:'Petabyte (PB, 10^15 bytes), exabyte (EB, 10^18), zettabyte (ZB, 10^21), yottabyte (YB, 10^24). The world\'s total internet traffic is measured in exabytes per month. Global data storage is in the zettabyte range.' }
  ]},
  { title:'Conversor de Armazenamento de Dados — converter bytes, KB, MB, GB, TB e mais', metaDescription:'Conversor de armazenamento de dados gratuito. Converta entre bits, bytes, kilobytes, megabytes, gigabytes, terabytes, petabytes e seus equivalentes binários.', h1:'Conversor de Armazenamento de Dados', intro:'Converta entre unidades de bit/byte. Suporta unidades decimais (SI) (KB = 1000 bytes) e binárias (KiB = 1024 bytes).', faq_title:'Perguntas frequentes sobre conversor de armazenamento', ui:{ value:'Valor', from:'De', to:'Para' }, faq:[
    { q:'Qual a diferença entre KB e KiB?', a:'KB (kilobyte) no sistema SI = 1.000 bytes. KiB (kibibyte) no sistema binário IEC = 1.024 bytes. Fabricantes de HDs usam SI, sistemas operacionais frequentemente usam binário.' },
    { q:'Por que meu HD mostra menos espaço que o anunciado?', a:'Fabricantes de HD definem 1 GB = 1.000.000.000 bytes. O Windows mostra espaço em GiB onde 1 GiB = 1.073.741.824 bytes. Um HD de 1 TB ≈ 931 GiB.' },
    { q:'O que vem depois do terabyte?', a:'Petabyte (PB, 10^15 bytes), exabyte (EB, 10^18), zettabyte (ZB, 10^21), yottabyte (YB, 10^24).' }
  ]},
  `(function(){
  const units=[['Bit (b)',1/8],['Byte (B)',1],['Kilobyte (KB)',1e3],['Megabyte (MB)',1e6],['Gigabyte (GB)',1e9],['Terabyte (TB)',1e12],['Petabyte (PB)',1e15],['Exabyte (EB)',1e18],['Kibibyte (KiB)',1024],['Mebibyte (MiB)',1024**2],['Gibibyte (GiB)',1024**3],['Tebibyte (TiB)',1024**4]];
  const sf=document.getElementById('ds-from'),st=document.getElementById('ds-to');
  units.forEach(([name],i)=>{const o1=document.createElement('option');o1.value=i;o1.textContent=name;sf.appendChild(o1);const o2=document.createElement('option');o2.value=i;o2.textContent=name;o2.selected=i===4;st.appendChild(o2);});
  function conv(){const v=parseFloat(document.getElementById('ds-val').value);if(isNaN(v))return;const base=v*units[sf.value][1];const res=base/units[st.value][1];document.getElementById('ds-out').textContent=res.toPrecision(8).replace(/\\.?0+$/,'');}
  document.getElementById('ds-val').addEventListener('input',conv);sf.addEventListener('change',conv);st.addEventListener('change',conv);conv();
})();`
);

// ─── 155 ── Pressure Unit Converter ───────────────────────────────────────────
tool('pressureconverter', 'converter', '🌡️',
  `<div id="pc-app"><div class="row"><div class="field"><label for="pc-val">{{ui.value}}</label><input type="number" id="pc-val" step="any" value="1" inputmode="decimal"></div><div class="field"><label for="pc-from">{{ui.from}}</label><select id="pc-from"></select></div><div class="field"><label for="pc-to">{{ui.to}}</label><select id="pc-to"></select></div></div><div class="result"><span class="big" id="pc-out">—</span></div></div>`,
  { title:'Pressure Unit Converter — convert Pa, bar, psi, atm and more', metaDescription:'Free pressure converter. Convert between pascal, bar, psi, atmosphere, mmHg, inHg and other pressure units instantly.', h1:'Pressure Unit Converter', intro:'Convert pressure between SI, metric and imperial units including pascal, bar, psi, atmosphere and mmHg.', faq_title:'Pressure converter FAQ', ui:{ value:'Value', from:'From', to:'To' }, faq:[
    { q:'What is standard atmospheric pressure?', a:'1 standard atmosphere (atm) = 101,325 Pa = 1.01325 bar = 14.696 psi = 760 mmHg = 29.92 inHg. This is the reference pressure defined as average sea-level pressure on Earth.' },
    { q:'What is the difference between gauge and absolute pressure?', a:'Absolute pressure is measured relative to perfect vacuum (0 Pa). Gauge pressure is relative to atmospheric pressure (0 bar gauge = 1 atm absolute). Tire pressure and blood pressure are typically gauge pressure.' },
    { q:'What is mmHg used for?', a:'mmHg (millimetre of mercury) is used for blood pressure (normal is 120/80 mmHg) and atmospheric pressure in meteorology. 1 mmHg = 1 torr = 133.322 Pa.' }
  ]},
  { title:'Conversor de Pressão — converter Pa, bar, psi, atm e mais', metaDescription:'Conversor de pressão gratuito. Converta entre pascal, bar, psi, atmosfera, mmHg, inHg e outras unidades de pressão instantaneamente.', h1:'Conversor de Pressão', intro:'Converta pressão entre unidades SI, métricas e imperiais incluindo pascal, bar, psi, atmosfera e mmHg.', faq_title:'Perguntas frequentes sobre conversor de pressão', ui:{ value:'Valor', from:'De', to:'Para' }, faq:[
    { q:'O que é pressão atmosférica padrão?', a:'1 atmosfera padrão (atm) = 101.325 Pa = 1,01325 bar = 14,696 psi = 760 mmHg = 29,92 inHg.' },
    { q:'Qual a diferença entre pressão manométrica e absoluta?', a:'Pressão absoluta é medida em relação ao vácuo perfeito. Pressão manométrica é relativa à pressão atmosférica. Pressão de pneus e pressão arterial são tipicamente pressão manométrica.' },
    { q:'Para que é usado mmHg?', a:'mmHg (milímetro de mercúrio) é usado para pressão arterial (normal é 120/80 mmHg) e pressão atmosférica em meteorologia.' }
  ]},
  `(function(){
  const units=[['Pascal (Pa)',1],['Kilopascal (kPa)',1e3],['Megapascal (MPa)',1e6],['Bar',1e5],['Millibar (mbar)',100],['PSI',6894.76],['Atmosphere (atm)',101325],['mmHg (Torr)',133.322],['inHg',3386.39],['kg/cm²',98066.5]];
  const sf=document.getElementById('pc-from'),st=document.getElementById('pc-to');
  units.forEach(([name],i)=>{const o1=document.createElement('option');o1.value=i;o1.textContent=name;sf.appendChild(o1);const o2=document.createElement('option');o2.value=i;o2.textContent=name;o2.selected=i===3;st.appendChild(o2);});
  function conv(){const v=parseFloat(document.getElementById('pc-val').value);if(isNaN(v))return;const base=v*units[sf.value][1];const res=base/units[st.value][1];document.getElementById('pc-out').textContent=res.toPrecision(8).replace(/\\.?0+$/,'');}
  document.getElementById('pc-val').addEventListener('input',conv);sf.addEventListener('change',conv);st.addEventListener('change',conv);conv();
})();`
);

// ─── 156 ── Energy Unit Converter ─────────────────────────────────────────────
tool('energyconverter', 'converter', '⚡',
  `<div id="ec-app"><div class="row"><div class="field"><label for="ec-val">{{ui.value}}</label><input type="number" id="ec-val" step="any" value="1" inputmode="decimal"></div><div class="field"><label for="ec-from">{{ui.from}}</label><select id="ec-from"></select></div><div class="field"><label for="ec-to">{{ui.to}}</label><select id="ec-to"></select></div></div><div class="result"><span class="big" id="ec-out">—</span></div></div>`,
  { title:'Energy Unit Converter — convert joules, calories, kWh and more', metaDescription:'Free energy converter. Convert between joules, kilojoules, calories, kilocalories, watt-hours, kilowatt-hours, BTU, foot-pounds and electron volts.', h1:'Energy Unit Converter', intro:'Convert energy between SI, metric and other units including joules, calories, kilowatt-hours, BTU and more.', faq_title:'Energy converter FAQ', ui:{ value:'Value', from:'From', to:'To' }, faq:[
    { q:'What is the difference between calorie and Calorie?', a:'A calorie (lowercase c) = 4.184 joules — the energy to heat 1 gram of water by 1°C. A Calorie (uppercase C), also called kilocalorie (kcal), = 1,000 calories = 4,184 joules. Food labels always use Calories (kcal). A typical adult needs ~2,000 kcal/day.' },
    { q:'How much energy is 1 kWh?', a:'1 kilowatt-hour = 3,600,000 joules = 3.6 MJ. This is the energy a 1,000-watt device uses in 1 hour. Electricity bills are measured in kWh. A typical UK home uses about 3,500 kWh of electricity per year.' },
    { q:'What is a BTU?', a:'A BTU (British Thermal Unit) = 1,055 joules. It is the energy needed to heat 1 pound of water by 1°F. BTUs are used for heating/cooling equipment (air conditioners, furnaces) in the USA.' }
  ]},
  { title:'Conversor de Energia — converter joules, calorias, kWh e mais', metaDescription:'Conversor de energia gratuito. Converta entre joules, quilojoules, calorias, quilocalorias, watt-hora, quilowatt-hora, BTU, pés-libra e elétrons-volt.', h1:'Conversor de Energia', intro:'Converta energia entre unidades SI, métricas e outras incluindo joules, calorias, quilowatt-horas, BTU e mais.', faq_title:'Perguntas frequentes sobre conversor de energia', ui:{ value:'Valor', from:'De', to:'Para' }, faq:[
    { q:'Qual a diferença entre caloria e Caloria?', a:'Uma caloria (c minúsculo) = 4,184 joules. Uma Caloria (C maiúsculo), também chamada de quilocaloria (kcal) = 1.000 calorias. Rótulos de alimentos sempre usam Calorias (kcal).' },
    { q:'Quanta energia é 1 kWh?', a:'1 quilowatt-hora = 3.600.000 joules = 3,6 MJ. Esta é a energia que um dispositivo de 1.000 watts usa em 1 hora. As contas de eletricidade são medidas em kWh.' },
    { q:'O que é um BTU?', a:'Um BTU (Unidade Térmica Britânica) = 1.055 joules. É a energia necessária para aquecer 1 libra de água em 1°F. BTUs são usados para equipamentos de aquecimento/resfriamento nos EUA.' }
  ]},
  `(function(){
  const units=[['Joule (J)',1],['Kilojoule (kJ)',1e3],['Megajoule (MJ)',1e6],['Calorie (cal)',4.184],['Kilocalorie / Cal (kcal)',4184],['Watt-hour (Wh)',3600],['Kilowatt-hour (kWh)',3.6e6],['BTU',1055.06],['Foot-pound (ft·lbf)',1.35582],['Electron volt (eV)',1.60218e-19],['Erg',1e-7]];
  const sf=document.getElementById('ec-from'),st=document.getElementById('ec-to');
  units.forEach(([name],i)=>{const o1=document.createElement('option');o1.value=i;o1.textContent=name;sf.appendChild(o1);const o2=document.createElement('option');o2.value=i;o2.textContent=name;o2.selected=i===4;st.appendChild(o2);});
  function conv(){const v=parseFloat(document.getElementById('ec-val').value);if(isNaN(v))return;const base=v*units[sf.value][1];const res=base/units[st.value][1];document.getElementById('ec-out').textContent=res.toPrecision(8).replace(/\\.?0+$/,'');}
  document.getElementById('ec-val').addEventListener('input',conv);sf.addEventListener('change',conv);st.addEventListener('change',conv);conv();
})();`
);

// ─── 157 ── Frequency Unit Converter ──────────────────────────────────────────
tool('frequencyconverter', 'converter', '〰️',
  `<div id="fc2-app"><div class="row"><div class="field"><label for="fc2-val">{{ui.value}}</label><input type="number" id="fc2-val" step="any" value="440" inputmode="decimal"></div><div class="field"><label for="fc2-from">{{ui.from}}</label><select id="fc2-from"></select></div><div class="field"><label for="fc2-to">{{ui.to}}</label><select id="fc2-to"></select></div></div><div class="result"><span class="big" id="fc2-out">—</span></div></div>`,
  { title:'Frequency Unit Converter — convert Hz, kHz, MHz, GHz and RPM', metaDescription:'Free frequency converter. Convert between hertz, kilohertz, megahertz, gigahertz and revolutions per minute (RPM). Shows period in seconds.', h1:'Frequency Unit Converter', intro:'Convert frequency between hertz (Hz), kilohertz (kHz), megahertz (MHz), gigahertz (GHz) and RPM.', faq_title:'Frequency converter FAQ', ui:{ value:'Value', from:'From', to:'To' }, faq:[
    { q:'What is frequency?', a:'Frequency is the number of occurrences of a repeating event per unit of time. Measured in hertz (Hz) where 1 Hz = 1 cycle per second. A 440 Hz tone is concert A (A4), the note orchestras tune to.' },
    { q:'What frequency are radio stations?', a:'AM radio: 540–1700 kHz. FM radio: 87.5–108 MHz. Wi-Fi: 2.4 GHz and 5 GHz bands. 5G cellular: 600 MHz to 39 GHz depending on band. Visible light: ~400–700 THz.' },
    { q:'What is RPM and how does it relate to Hz?', a:'RPM (revolutions per minute) measures rotational frequency. 1 RPM = 1/60 Hz. So 60 RPM = 1 Hz. A car engine at 3,000 RPM = 50 Hz. Hard drives spin at 5,400–7,200 RPM = 90–120 Hz.' }
  ]},
  { title:'Conversor de Frequência — converter Hz, kHz, MHz, GHz e RPM', metaDescription:'Conversor de frequência gratuito. Converta entre hertz, quilohertz, megahertz, gigahertz e rotações por minuto (RPM).', h1:'Conversor de Frequência', intro:'Converta frequência entre hertz (Hz), quilohertz (kHz), megahertz (MHz), gigahertz (GHz) e RPM.', faq_title:'Perguntas frequentes sobre conversor de frequência', ui:{ value:'Valor', from:'De', to:'Para' }, faq:[
    { q:'O que é frequência?', a:'Frequência é o número de ocorrências de um evento repetitivo por unidade de tempo. Medida em hertz (Hz) onde 1 Hz = 1 ciclo por segundo.' },
    { q:'Qual frequência são as estações de rádio?', a:'Rádio AM: 540–1700 kHz. Rádio FM: 87,5–108 MHz. Wi-Fi: 2,4 GHz e 5 GHz. 5G celular: 600 MHz a 39 GHz.' },
    { q:'O que é RPM e como se relaciona com Hz?', a:'RPM (rotações por minuto) mede frequência rotacional. 1 RPM = 1/60 Hz. Portanto, 60 RPM = 1 Hz.' }
  ]},
  `(function(){
  const units=[['Hertz (Hz)',1],['Kilohertz (kHz)',1e3],['Megahertz (MHz)',1e6],['Gigahertz (GHz)',1e9],['Terahertz (THz)',1e12],['RPM (rev/min)',1/60],['Radians/second',1/(2*Math.PI)],['Cycles/minute',1/60]];
  const sf=document.getElementById('fc2-from'),st=document.getElementById('fc2-to');
  units.forEach(([name],i)=>{const o1=document.createElement('option');o1.value=i;o1.textContent=name;sf.appendChild(o1);const o2=document.createElement('option');o2.value=i;o2.textContent=name;o2.selected=i===2;st.appendChild(o2);});
  function conv(){const v=parseFloat(document.getElementById('fc2-val').value);if(isNaN(v))return;const base=v*units[sf.value][1];const res=base/units[st.value][1];document.getElementById('fc2-out').textContent=res.toPrecision(8).replace(/\\.?0+$/,'');}
  document.getElementById('fc2-val').addEventListener('input',conv);sf.addEventListener('change',conv);st.addEventListener('change',conv);conv();
})();`
);

// ─── 158 ── Angle Unit Converter ───────────────────────────────────────────────
tool('angleconverter', 'converter', '📐',
  `<div id="ang-app"><div class="row"><div class="field"><label for="ang-val">{{ui.value}}</label><input type="number" id="ang-val" step="any" value="180" inputmode="decimal"></div><div class="field"><label for="ang-from">{{ui.from}}</label><select id="ang-from"></select></div><div class="field"><label for="ang-to">{{ui.to}}</label><select id="ang-to"></select></div></div><div class="result"><span class="big" id="ang-out">—</span></div></div>`,
  { title:'Angle Unit Converter — convert degrees, radians, gradians and more', metaDescription:'Free angle converter. Convert between degrees, radians, gradians, arcminutes, arcseconds, turns and milliradians instantly.', h1:'Angle Unit Converter', intro:'Convert angles between degrees, radians, gradians, arcminutes, arcseconds, turns and milliradians.', faq_title:'Angle converter FAQ', ui:{ value:'Value', from:'From', to:'To' }, faq:[
    { q:'How many radians in a circle?', a:'A full circle = 2π radians ≈ 6.2832 radians. Radians are the natural unit for angles in mathematics because they directly relate arc length to radius: arc = radius × angle in radians.' },
    { q:'What are gradians?', a:'Gradians (also grads or gon) divide a full circle into 400 units, so a right angle = 100 gradians. Used primarily in surveying and civil engineering, especially in Europe. 90° = 100 grad = π/2 radians.' },
    { q:'What are arcminutes and arcseconds?', a:'1 degree = 60 arcminutes (\'). 1 arcminute = 60 arcseconds ("). Used in navigation, astronomy and geographic coordinates. Latitude/longitude are often expressed as degrees, minutes, seconds (DMS). 1 arcsecond ≈ 31 metres on Earth\'s surface.' }
  ]},
  { title:'Conversor de Ângulo — converter graus, radianos, gradianos e mais', metaDescription:'Conversor de ângulo gratuito. Converta entre graus, radianos, gradianos, arcminutos, arcssegundos, voltas e miliradianos instantaneamente.', h1:'Conversor de Ângulo', intro:'Converta ângulos entre graus, radianos, gradianos, arcminutos, arcssegundos, voltas e miliradianos.', faq_title:'Perguntas frequentes sobre conversor de ângulo', ui:{ value:'Valor', from:'De', to:'Para' }, faq:[
    { q:'Quantos radianos há em um círculo?', a:'Um círculo completo = 2π radianos ≈ 6,2832 radianos. Radianos são a unidade natural para ângulos em matemática.' },
    { q:'O que são gradianos?', a:'Gradianos dividem um círculo completo em 400 unidades, então um ângulo reto = 100 gradianos. Usados principalmente em levantamentos topográficos e engenharia civil.' },
    { q:'O que são arcminutos e arcssegundos?', a:'1 grau = 60 arcminutos (min). 1 arcminuto = 60 arcssegundos (s). Usados em navegação, astronomia e coordenadas geográficas.' }
  ]},
  `(function(){
  const DEG=1;const RAD=180/Math.PI;const GRAD=0.9;const MIN=1/60;const SEC=1/3600;const TURN=360;const MRAD=180/Math.PI/1000;
  const units=[['Degree (°)',DEG],['Radian (rad)',RAD],['Gradian (grad)',GRAD],['Arcminute (\')',MIN],['Arcsecond (\")',SEC],['Turn (revolution)',TURN],['Milliradian (mrad)',MRAD]];
  const sf=document.getElementById('ang-from'),st=document.getElementById('ang-to');
  units.forEach(([name],i)=>{const o1=document.createElement('option');o1.value=i;o1.textContent=name;sf.appendChild(o1);const o2=document.createElement('option');o2.value=i;o2.textContent=name;o2.selected=i===1;st.appendChild(o2);});
  function conv(){const v=parseFloat(document.getElementById('ang-val').value);if(isNaN(v))return;const deg=v*units[sf.value][1];const res=deg/units[st.value][1];document.getElementById('ang-out').textContent=res.toPrecision(10).replace(/\\.?0+$/,'');}
  document.getElementById('ang-val').addEventListener('input',conv);sf.addEventListener('change',conv);st.addEventListener('change',conv);conv();
})();`
);

// ─── 159 ── Ohm's Law Calculator ──────────────────────────────────────────────
tool('ohmslaw', 'science', '⚡',
  `<form id="ol-form"><p style="opacity:0.7;font-size:0.875rem">{{ui.instruction}}</p><div class="row"><div class="field"><label for="ol-v">{{ui.voltage}} (V)</label><input type="number" id="ol-v" step="any" placeholder="{{ui.leave}}..." inputmode="decimal"></div><div class="field"><label for="ol-i">{{ui.current}} (A)</label><input type="number" id="ol-i" step="any" placeholder="{{ui.leave}}..." inputmode="decimal"></div><div class="field"><label for="ol-r">{{ui.resistance}} (Ω)</label><input type="number" id="ol-r" step="any" placeholder="{{ui.leave}}..." inputmode="decimal"></div></div><div class="row" style="justify-content:center"><button class="btn" type="submit">{{ui.calculate}}</button></div></form><div id="ol-out" hidden class="result" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:0.5rem"></div>`,
  { title:"Ohm's Law Calculator — solve for voltage, current, resistance or power", metaDescription:"Free Ohm's Law calculator. Enter any two of voltage (V), current (A) or resistance (Ω) to calculate the missing value and power.", h1:"Ohm's Law Calculator", intro:"Enter any two of voltage, current or resistance to calculate the third. Power (watts) is also calculated automatically.", faq_title:"Ohm's Law FAQ", ui:{ instruction:'Enter any 2 of the 3 values to calculate the third.', voltage:'Voltage', current:'Current', resistance:'Resistance', leave:'leave blank', calculate:'Calculate' }, faq:[
    { q:"What is Ohm's Law?", a:"Ohm's Law states that the current through a conductor is proportional to the voltage across it and inversely proportional to its resistance: V = I × R. Formulated by Georg Simon Ohm in 1827." },
    { q:'What is power in an electrical circuit?', a:'Power (P) = V × I = I² × R = V² / R, measured in watts (W). Power is the rate of energy transfer. A 100W light bulb at 120V draws 100/120 ≈ 0.83 amperes.' },
    { q:"What are the units in Ohm's Law?", a:'V = voltage in volts (V). I = current in amperes (A). R = resistance in ohms (Ω). P = power in watts (W). 1 watt = 1 volt × 1 ampere. 1 ohm = 1 volt per ampere.' }
  ]},
  { title:"Calculadora da Lei de Ohm — resolver tensão, corrente, resistência ou potência", metaDescription:"Calculadora gratuita da Lei de Ohm. Insira quaisquer dois de tensão (V), corrente (A) ou resistência (Ω) para calcular o valor ausente e a potência.", h1:"Calculadora da Lei de Ohm", intro:"Insira quaisquer dois de tensão, corrente ou resistência para calcular o terceiro. A potência (watts) também é calculada automaticamente.", faq_title:"Perguntas frequentes sobre Lei de Ohm", ui:{ instruction:'Insira quaisquer 2 dos 3 valores para calcular o terceiro.', voltage:'Tensão', current:'Corrente', resistance:'Resistência', leave:'deixar em branco', calculate:'Calcular' }, faq:[
    { q:'O que é a Lei de Ohm?', a:"A Lei de Ohm afirma que a corrente através de um condutor é proporcional à tensão através dele e inversamente proporcional à sua resistência: V = I × R. Formulada por Georg Simon Ohm em 1827." },
    { q:'O que é potência em um circuito elétrico?', a:'Potência (P) = V × I = I² × R = V² / R, medida em watts (W). Potência é a taxa de transferência de energia.' },
    { q:'Quais são as unidades na Lei de Ohm?', a:'V = tensão em volts (V). I = corrente em amperes (A). R = resistência em ohms (Ω). P = potência em watts (W). 1 watt = 1 volt × 1 ampere.' }
  ]},
  `(function(){
  document.getElementById('ol-form').addEventListener('submit',function(e){
    e.preventDefault();
    const vEl=document.getElementById('ol-v'),iEl=document.getElementById('ol-i'),rEl=document.getElementById('ol-r');
    let v=parseFloat(vEl.value),i=parseFloat(iEl.value),r=parseFloat(rEl.value);
    const known=[!isNaN(v),!isNaN(i),!isNaN(r)].filter(Boolean).length;
    if(known<2){alert('Enter at least 2 values');return;}
    if(isNaN(v))v=i*r;
    else if(isNaN(i))i=v/r;
    else if(isNaN(r))r=v/i;
    const p=v*i;
    const fmt=n=>n.toPrecision(6).replace(/\\.?0+$/,'');
    const items=[['Voltage (V)',fmt(v)+' V'],['Current (I)',fmt(i)+' A'],['Resistance (R)',fmt(r)+' Ω'],['Power (P)',fmt(p)+' W']];
    const out=document.getElementById('ol-out');
    out.hidden=false;
    out.innerHTML=items.map(([k,v2])=>\`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">\${k}</div><strong>\${v2}</strong></div>\`).join('');
  });
})();`
);

// ─── 160 ── Resistor Color Code Calculator ─────────────────────────────────────
tool('resistorcolor', 'science', '🔩',
  `<div id="rc-app"><p style="opacity:0.7;font-size:0.875rem">{{ui.instruction}}</p><div id="rc-bands" style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:0.75rem"></div><div class="result"><span class="big" id="rc-out">—</span><p id="rc-range" style="opacity:0.6;font-size:0.875rem"></p></div></div>`,
  { title:'Resistor Color Code Calculator — decode resistor color bands', metaDescription:'Free resistor color code calculator. Select the color bands of a 4-band or 5-band resistor to decode its resistance value and tolerance.', h1:'Resistor Color Code Calculator', intro:'Select the color bands on your resistor to decode its resistance value and tolerance. Supports 4-band and 5-band resistors.', faq_title:'Resistor color code FAQ', ui:{ instruction:'Select the color of each band to read the resistor value.' }, faq:[
    { q:'What is a resistor color code?', a:'Resistors are too small for printed numbers, so colored bands represent digits and multipliers. Each color has an assigned value. Black=0, Brown=1, Red=2, Orange=3, Yellow=4, Green=5, Blue=6, Violet=7, Grey=8, White=9. The multiplier band represents a power of 10.' },
    { q:'How do I read a 4-band resistor?', a:'Bands 1 and 2: significant digits. Band 3: multiplier. Band 4: tolerance. Example: Red(2), Violet(7), Orange(×1000), Gold(±5%) = 27,000 Ω ±5% = 27 kΩ ±5%.' },
    { q:'How do I read a 5-band resistor?', a:'Bands 1, 2, and 3: significant digits. Band 4: multiplier. Band 5: tolerance. Offers higher precision. Example: Brown(1), Black(0), Black(0), Red(×100), Brown(±1%) = 10,000 Ω ±1% = 10 kΩ ±1%.' }
  ]},
  { title:'Calculadora de Código de Cores de Resistor — decodificar bandas de cores', metaDescription:'Calculadora gratuita de código de cores de resistor. Selecione as bandas de cores de um resistor de 4 ou 5 bandas para decodificar seu valor de resistência e tolerância.', h1:'Calculadora de Código de Cores de Resistor', intro:'Selecione as bandas de cores no seu resistor para decodificar seu valor de resistência e tolerância. Suporta resistores de 4 e 5 bandas.', faq_title:'Perguntas frequentes sobre código de cores de resistor', ui:{ instruction:'Selecione a cor de cada banda para ler o valor do resistor.' }, faq:[
    { q:'O que é um código de cores de resistor?', a:'Os resistores são pequenos demais para números impressos, então bandas coloridas representam dígitos e multiplicadores. Cada cor tem um valor atribuído: Preto=0, Marrom=1, Vermelho=2, Laranja=3, Amarelo=4, Verde=5, Azul=6, Violeta=7, Cinza=8, Branco=9.' },
    { q:'Como leio um resistor de 4 bandas?', a:'Bandas 1 e 2: dígitos significativos. Banda 3: multiplicador. Banda 4: tolerância. Exemplo: Vermelho(2), Violeta(7), Laranja(×1000), Ouro(±5%) = 27.000 Ω ±5% = 27 kΩ ±5%.' },
    { q:'Como leio um resistor de 5 bandas?', a:'Bandas 1, 2 e 3: dígitos significativos. Banda 4: multiplicador. Banda 5: tolerância. Oferece maior precisão.' }
  ]},
  `(function(){
  const colors=['Black','Brown','Red','Orange','Yellow','Green','Blue','Violet','Grey','White','Gold','Silver'];
  const vals={Black:0,Brown:1,Red:2,Orange:3,Yellow:4,Green:5,Blue:6,Violet:7,Grey:8,White:9};
  const mults={Black:1,Brown:10,Red:100,Orange:1e3,Yellow:1e4,Green:1e5,Blue:1e6,Violet:1e7,Grey:1e8,White:1e9,Gold:0.1,Silver:0.01};
  const tols={Brown:'±1%',Red:'±2%',Green:'±0.5%',Blue:'±0.25%',Violet:'±0.1%',Grey:'±0.05%',Gold:'±5%',Silver:'±10%'};
  const css={Black:'#111;color:#fff',Brown:'#8B4513;color:#fff',Red:'#e11d48;color:#fff',Orange:'#f97316;color:#000',Yellow:'#eab308;color:#000',Green:'#16a34a;color:#fff',Blue:'#2563eb;color:#fff',Violet:'#7c3aed;color:#fff',Grey:'#6b7280;color:#fff',White:'#fff;color:#000',Gold:'#d97706;color:#000',Silver:'#9ca3af;color:#000'};
  const sigColors=colors.slice(0,10);
  const multColors=colors;
  const tolColors=['Brown','Red','Green','Blue','Violet','Grey','Gold','Silver'];
  let bands=['Brown','Black','Red','Gold'];
  let mode=4;
  function mkSel(choices,val,onChange){
    const s=document.createElement('select');
    s.style.cssText='padding:0.4rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)';
    choices.forEach(c=>{const o=document.createElement('option');o.value=c;o.textContent=c;if(c===val)o.selected=true;s.appendChild(o);});
    s.addEventListener('change',onChange);return s;
  }
  function calc(){
    let ohm;
    if(mode===4){
      ohm=(vals[bands[0]]*10+vals[bands[1]])*mults[bands[2]];
    }else{
      ohm=(vals[bands[0]]*100+vals[bands[1]]*10+vals[bands[2]])*mults[bands[3]];
    }
    const tolBand=mode===4?bands[3]:bands[4];
    const tol=tols[tolBand]||'?';
    const fmt=v=>{if(v>=1e9)return(v/1e9).toPrecision(4).replace(/\\.?0+$/,'')+' GΩ';if(v>=1e6)return(v/1e6).toPrecision(4).replace(/\\.?0+$/,'')+' MΩ';if(v>=1e3)return(v/1e3).toPrecision(4).replace(/\\.?0+$/,'')+' kΩ';return v+' Ω';};
    document.getElementById('rc-out').textContent=fmt(ohm)+' '+tol;
    const tolPct=parseFloat(tol)/100;
    document.getElementById('rc-range').textContent='Range: '+fmt(ohm*(1-tolPct))+' – '+fmt(ohm*(1+tolPct));
  }
  function render(){
    const cont=document.getElementById('rc-bands');cont.innerHTML='';
    const modeToggle=document.createElement('select');
    modeToggle.innerHTML='<option value="4">4-band</option><option value="5">5-band</option>';
    modeToggle.value=String(mode);modeToggle.style.cssText='padding:0.4rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)';
    modeToggle.addEventListener('change',function(){mode=parseInt(this.value);bands=mode===4?['Brown','Black','Red','Gold']:['Brown','Black','Black','Red','Brown'];render();calc();});
    cont.appendChild(modeToggle);
    if(mode===4){
      [sigColors,sigColors,multColors,tolColors].forEach((choices,i)=>{
        const s=mkSel(choices,bands[i],function(){bands[i]=this.value;calc();});
        s.style.background=css[bands[i]].split(';')[0];cont.appendChild(s);
      });
    }else{
      [sigColors,sigColors,sigColors,multColors,tolColors].forEach((choices,i)=>{
        const s=mkSel(choices,bands[i],function(){bands[i]=this.value;calc();});cont.appendChild(s);
      });
    }
    calc();
  }
  render();
})();`
);

// ─── 161 ── pH Calculator ─────────────────────────────────────────────────────
tool('phcalculator', 'science', '🧪',
  `<form id="ph-form"><div class="row"><div class="field"><label for="ph-type">{{ui.type}}</label><select id="ph-type"><option value="h">{{ui.hydrogen}}</option><option value="oh">{{ui.hydroxide}}</option><option value="ph">{{ui.phValue}}</option></select></div><div class="field"><label for="ph-val">{{ui.value}}</label><input type="number" id="ph-val" step="any" placeholder="1e-7" inputmode="decimal"></div><button class="btn" type="submit">{{ui.calculate}}</button></div></form><div id="ph-out" hidden class="result" style="text-align:center"></div>`,
  { title:'pH Calculator — calculate pH from H⁺ concentration', metaDescription:'Free pH calculator. Enter hydrogen ion concentration [H⁺] or hydroxide concentration [OH⁻] to calculate pH and classify the solution.', h1:'pH Calculator', intro:'Enter a hydrogen ion concentration [H⁺] or hydroxide concentration [OH⁻] to calculate the pH of the solution and its acid/base classification.', faq_title:'pH calculator FAQ', ui:{ type:'Input type', hydrogen:'H⁺ concentration [H⁺] (mol/L)', hydroxide:'OH⁻ concentration [OH⁻] (mol/L)', phValue:'pH value (find [H⁺])', value:'Value', calculate:'Calculate' }, faq:[
    { q:'What is pH?', a:'pH = −log₁₀[H⁺], where [H⁺] is the hydrogen ion concentration in mol/L. The scale ranges from 0 (most acidic) to 14 (most basic/alkaline), with 7 being neutral. Each unit is a 10× change in [H⁺].' },
    { q:'What are some common pH values?', a:'Battery acid: ~1. Stomach acid: ~2. Lemon juice: ~2. Coffee: ~5. Milk: ~6.5. Pure water: 7. Blood: 7.35–7.45. Seawater: ~8.1. Baking soda: ~9. Bleach: ~12. Drain cleaner: ~14.' },
    { q:'What is the relationship between pH and pOH?', a:'pH + pOH = 14 (at 25°C). So if pH = 3, pOH = 11. pOH = −log₁₀[OH⁻]. The product [H⁺][OH⁻] = 10⁻¹⁴ at 25°C (the water dissociation constant Kw).' }
  ]},
  { title:'Calculadora de pH — calcular pH a partir da concentração de H⁺', metaDescription:'Calculadora de pH gratuita. Insira a concentração de íons de hidrogênio [H⁺] ou concentração de hidróxido [OH⁻] para calcular o pH e classificar a solução.', h1:'Calculadora de pH', intro:'Insira uma concentração de íons de hidrogênio [H⁺] ou concentração de hidróxido [OH⁻] para calcular o pH da solução e sua classificação ácido/base.', faq_title:'Perguntas frequentes sobre calculadora de pH', ui:{ type:'Tipo de entrada', hydrogen:'Concentração de H⁺ [H⁺] (mol/L)', hydroxide:'Concentração de OH⁻ [OH⁻] (mol/L)', phValue:'Valor de pH (encontrar [H⁺])', value:'Valor', calculate:'Calcular' }, faq:[
    { q:'O que é pH?', a:'pH = −log₁₀[H⁺], onde [H⁺] é a concentração de íons de hidrogênio em mol/L. A escala vai de 0 (mais ácido) a 14 (mais básico/alcalino), com 7 sendo neutro.' },
    { q:'Quais são alguns valores de pH comuns?', a:'Ácido de bateria: ~1. Suco gástrico: ~2. Suco de limão: ~2. Café: ~5. Leite: ~6,5. Água pura: 7. Sangue: 7,35–7,45. Água do mar: ~8,1. Bicarbonato: ~9. Alvejante: ~12.' },
    { q:'Qual é a relação entre pH e pOH?', a:'pH + pOH = 14 (a 25°C). Então se pH = 3, pOH = 11. pOH = −log₁₀[OH⁻]. O produto [H⁺][OH⁻] = 10⁻¹⁴ a 25°C.' }
  ]},
  `(function(){
  document.getElementById('ph-form').addEventListener('submit',function(e){
    e.preventDefault();
    const type=document.getElementById('ph-type').value;
    const val=parseFloat(document.getElementById('ph-val').value);
    const out=document.getElementById('ph-out');
    let ph,h,oh;
    if(type==='h'){h=val;ph=-Math.log10(h);}
    else if(type==='oh'){oh=val;ph=14+Math.log10(oh);}
    else{ph=val;h=Math.pow(10,-ph);}
    if(isNaN(ph)||ph<0||ph>14){out.innerHTML='<p style="color:var(--red,#ef4444)">Invalid input</p>';out.hidden=false;return;}
    h=h||Math.pow(10,-ph);oh=oh||(1e-14/h);
    const category=ph<2?'Strongly acidic':ph<4?'Acidic':ph<6?'Weakly acidic':ph<7?'Slightly acidic':ph===7?'Neutral':ph<8?'Slightly basic':ph<10?'Weakly basic':ph<12?'Basic':'Strongly basic';
    const hue=ph<=7?Math.round(0+ph*17):Math.round(119+(ph-7)*12);
    out.hidden=false;
    out.innerHTML=\`<div style="font-size:3rem;font-weight:800;color:hsl(\${hue},80%,50%)">\${ph.toFixed(4)}</div><p style="font-size:1rem;opacity:0.8">\${category}</p><div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;margin-top:0.75rem;text-align:left"><div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">[H⁺]</div><strong>\${h.toExponential(3)} mol/L</strong></div><div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">[OH⁻]</div><strong>\${oh.toExponential(3)} mol/L</strong></div></div>\`;
  });
})();`
);

// ─── 162 ── Ideal Gas Law Calculator ──────────────────────────────────────────
tool('idealgas', 'science', '💨',
  `<form id="ig-form"><p style="opacity:0.7;font-size:0.875rem">{{ui.instruction}}</p><div class="row"><div class="field"><label for="ig-p">{{ui.pressure}} (kPa)</label><input type="number" id="ig-p" step="any" placeholder="{{ui.leave}}" inputmode="decimal"></div><div class="field"><label for="ig-v">{{ui.volume}} (L)</label><input type="number" id="ig-v" step="any" placeholder="{{ui.leave}}" inputmode="decimal"></div><div class="field"><label for="ig-n">{{ui.moles}} (mol)</label><input type="number" id="ig-n" step="any" placeholder="{{ui.leave}}" inputmode="decimal"></div><div class="field"><label for="ig-t">{{ui.temp}} (K)</label><input type="number" id="ig-t" step="any" placeholder="{{ui.leave}}" inputmode="decimal"></div></div><div class="row" style="justify-content:center"><button class="btn" type="submit">{{ui.calculate}}</button></div></form><div id="ig-out" hidden class="result" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:0.5rem"></div>`,
  { title:'Ideal Gas Law Calculator — solve PV = nRT', metaDescription:'Free ideal gas law calculator. Enter any 3 of pressure, volume, moles and temperature to solve for the unknown variable using PV = nRT.', h1:'Ideal Gas Law Calculator', intro:'Enter any 3 of the 4 variables (pressure, volume, moles, temperature) to calculate the fourth using PV = nRT.', faq_title:'Ideal gas law FAQ', ui:{ instruction:'Enter any 3 variables to calculate the 4th. P in kPa, V in litres, T in Kelvin.', pressure:'Pressure', volume:'Volume', moles:'Amount', temp:'Temperature', leave:'leave blank', calculate:'Calculate' }, faq:[
    { q:'What is the Ideal Gas Law?', a:'PV = nRT where P = pressure, V = volume, n = amount of gas (moles), R = 8.314 J/(mol·K) (gas constant), T = temperature in Kelvin. It describes the behavior of an ideal gas where molecules have no volume and no intermolecular forces.' },
    { q:'How do I convert Celsius to Kelvin?', a:'K = °C + 273.15. So 0°C = 273.15 K, 25°C = 298.15 K. The Kelvin scale is absolute — 0 K is absolute zero, the lowest possible temperature where all molecular motion stops.' },
    { q:'When does the ideal gas law fail?', a:'The ideal gas law is an approximation that breaks down at high pressures and low temperatures where intermolecular forces and molecular volumes become significant. Real gases are better described by the van der Waals equation.' }
  ]},
  { title:'Calculadora da Lei do Gás Ideal — resolver PV = nRT', metaDescription:'Calculadora gratuita da lei do gás ideal. Insira qualquer 3 das 4 variáveis (pressão, volume, moles e temperatura) para resolver a variável desconhecida usando PV = nRT.', h1:'Calculadora da Lei do Gás Ideal', intro:'Insira qualquer 3 das 4 variáveis (pressão, volume, moles, temperatura) para calcular a quarta usando PV = nRT.', faq_title:'Perguntas frequentes sobre lei do gás ideal', ui:{ instruction:'Insira quaisquer 3 variáveis para calcular a 4ª. P em kPa, V em litros, T em Kelvin.', pressure:'Pressão', volume:'Volume', moles:'Quantidade', temp:'Temperatura', leave:'deixar em branco', calculate:'Calcular' }, faq:[
    { q:'O que é a Lei do Gás Ideal?', a:'PV = nRT onde P = pressão, V = volume, n = quantidade de gás (moles), R = 8,314 J/(mol·K) (constante dos gases), T = temperatura em Kelvin.' },
    { q:'Como converter Celsius para Kelvin?', a:'K = °C + 273,15. Então 0°C = 273,15 K, 25°C = 298,15 K. O Kelvin é absoluto — 0 K é o zero absoluto.' },
    { q:'Quando a lei do gás ideal falha?', a:'A lei do gás ideal é uma aproximação que falha a altas pressões e baixas temperaturas onde forças intermoleculares e volumes moleculares tornam-se significativos.' }
  ]},
  `(function(){
  const R=8.314/1000; // kPa·L/(mol·K)
  document.getElementById('ig-form').addEventListener('submit',function(e){
    e.preventDefault();
    let p=parseFloat(document.getElementById('ig-p').value);
    let v=parseFloat(document.getElementById('ig-v').value);
    let n=parseFloat(document.getElementById('ig-n').value);
    let t=parseFloat(document.getElementById('ig-t').value);
    const known=[!isNaN(p),!isNaN(v),!isNaN(n),!isNaN(t)].filter(Boolean).length;
    if(known<3){alert('Enter at least 3 values');return;}
    if(isNaN(p))p=n*R*t/v;
    else if(isNaN(v))v=n*R*t/p;
    else if(isNaN(n))n=p*v/(R*t);
    else if(isNaN(t))t=p*v/(n*R);
    const fmt=x=>x.toPrecision(6).replace(/\\.?0+$/,'');
    const items=[['Pressure (P)',fmt(p)+' kPa'],['Volume (V)',fmt(v)+' L'],['Amount (n)',fmt(n)+' mol'],['Temperature (T)',fmt(t)+' K ('+fmt(t-273.15)+'°C)']];
    const out=document.getElementById('ig-out');
    out.hidden=false;
    out.innerHTML=items.map(([k,v2])=>\`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">\${k}</div><strong>\${v2}</strong></div>\`).join('');
  });
})();`
);

// ─── 163 ── Molar Mass Calculator ─────────────────────────────────────────────
tool('molarmass', 'science', '⚗️',
  `<form id="mm-form"><div class="field"><label for="mm-formula">{{ui.formula}}</label><input type="text" id="mm-formula" placeholder="H2O" autocomplete="off" style="font-family:monospace;font-size:1.1rem"></div><button class="btn" type="submit" style="margin-top:0.5rem">{{ui.calculate}}</button></form><div id="mm-out" hidden class="result" style="text-align:left"></div>`,
  { title:'Molar Mass Calculator — calculate molecular weight from formula', metaDescription:'Free molar mass calculator. Enter a chemical formula like H2O or NaCl to calculate the molar mass (molecular weight) in g/mol.', h1:'Molar Mass Calculator', intro:'Enter a chemical formula (e.g. H2O, NaCl, C6H12O6) to calculate the molar mass in grams per mole.', faq_title:'Molar mass calculator FAQ', ui:{ formula:'Chemical formula', calculate:'Calculate' }, faq:[
    { q:'What is molar mass?', a:'Molar mass is the mass of one mole (6.022×10²³ particles) of a substance, expressed in g/mol. Numerically equal to the molecular weight in atomic mass units (u or Da). Used to convert between mass (grams) and amount (moles).' },
    { q:'How do I calculate molar mass?', a:'Sum the atomic masses of all atoms in the formula. For H2O: 2×H(1.008) + O(15.999) = 2.016 + 15.999 = 18.015 g/mol. Atomic masses come from the periodic table.' },
    { q:'What is a mole?', a:'A mole is the SI unit for amount of substance = 6.02214076×10²³ (Avogadro\'s number). 1 mole of H2O = 18.015 grams = 6.022×10²³ water molecules. Avogadro\'s number was defined exactly in 2019 as part of the SI redefinition.' }
  ]},
  { title:'Calculadora de Massa Molar — calcular peso molecular a partir da fórmula', metaDescription:'Calculadora de massa molar gratuita. Insira uma fórmula química como H2O ou NaCl para calcular a massa molar (peso molecular) em g/mol.', h1:'Calculadora de Massa Molar', intro:'Insira uma fórmula química (ex.: H2O, NaCl, C6H12O6) para calcular a massa molar em gramas por mol.', faq_title:'Perguntas frequentes sobre calculadora de massa molar', ui:{ formula:'Fórmula química', calculate:'Calcular' }, faq:[
    { q:'O que é massa molar?', a:'Massa molar é a massa de um mol (6,022×10²³ partículas) de uma substância, expressa em g/mol. Numericamente igual ao peso molecular em unidades de massa atômica.' },
    { q:'Como calculo a massa molar?', a:'Somo as massas atômicas de todos os átomos na fórmula. Para H2O: 2×H(1,008) + O(15,999) = 18,015 g/mol.' },
    { q:'O que é um mol?', a:'Um mol é a unidade SI para quantidade de substância = 6,02214076×10²³ (número de Avogadro). 1 mol de H2O = 18,015 gramas = 6,022×10²³ moléculas de água.' }
  ]},
  `(function(){
  const elements={H:1.008,He:4.0026,Li:6.94,Be:9.0122,B:10.81,C:12.011,N:14.007,O:15.999,F:18.998,Ne:20.180,Na:22.990,Mg:24.305,Al:26.982,Si:28.085,P:30.974,S:32.06,Cl:35.45,Ar:39.948,K:39.098,Ca:40.078,Sc:44.956,Ti:47.867,V:50.942,Cr:51.996,Mn:54.938,Fe:55.845,Co:58.933,Ni:58.693,Cu:63.546,Zn:65.38,Ga:69.723,Ge:72.630,As:74.922,Se:78.971,Br:79.904,Kr:83.798,Rb:85.468,Sr:87.62,Y:88.906,Zr:91.224,Nb:92.906,Mo:95.95,Tc:98,Ru:101.07,Rh:102.91,Pd:106.42,Ag:107.87,Cd:112.41,In:114.82,Sn:118.71,Sb:121.76,Te:127.60,I:126.90,Xe:131.29,Cs:132.91,Ba:137.33,La:138.91,Ce:140.12,Pr:140.91,Nd:144.24,Pm:145,Sm:150.36,Eu:151.96,Gd:157.25,Tb:158.93,Dy:162.50,Ho:164.93,Er:167.26,Tm:168.93,Yb:173.05,Lu:174.97,Hf:178.49,Ta:180.95,W:183.84,Re:186.21,Os:190.23,Ir:192.22,Pt:195.08,Au:196.97,Hg:200.59,Tl:204.38,Pb:207.2,Bi:208.98,Po:209,At:210,Rn:222,Fr:223,Ra:226,Ac:227,Th:232.04,Pa:231.04,U:238.03};
  function parseMM(formula){
    const stack=[{}];
    let i=0;
    while(i<formula.length){
      if(formula[i]==='('){stack.push({});i++;}
      else if(formula[i]===')'){
        i++;let mul=0;
        while(i<formula.length&&/\\d/.test(formula[i])){mul=mul*10+parseInt(formula[i]);i++;}
        if(mul===0)mul=1;
        const top=stack.pop();
        for(const el in top)(stack[stack.length-1][el]=(stack[stack.length-1][el]||0)+top[el]*mul);
      }else if(/[A-Z]/.test(formula[i])){
        let sym=formula[i++];
        while(i<formula.length&&/[a-z]/.test(formula[i]))sym+=formula[i++];
        let cnt=0;
        while(i<formula.length&&/\\d/.test(formula[i])){cnt=cnt*10+parseInt(formula[i]);i++;}
        if(cnt===0)cnt=1;
        stack[stack.length-1][sym]=(stack[stack.length-1][sym]||0)+cnt;
      }else i++;
    }
    return stack[0];
  }
  document.getElementById('mm-form').addEventListener('submit',function(e){
    e.preventDefault();
    const formula=document.getElementById('mm-formula').value.trim();
    const out=document.getElementById('mm-out');
    try{
      const composition=parseMM(formula);
      let totalMass=0;const breakdown=[];
      for(const sym in composition){
        if(!elements[sym]){out.innerHTML='<p style="color:var(--red,#ef4444)">Unknown element: '+sym+'</p>';out.hidden=false;return;}
        const cnt=composition[sym];const mass=elements[sym]*cnt;totalMass+=mass;
        breakdown.push(\`<div style="display:flex;justify-content:space-between;padding:3px 0;border-bottom:1px solid var(--line)"><span>\${sym} × \${cnt}</span><span>\${(elements[sym]).toFixed(3)} × \${cnt} = \${mass.toFixed(3)}</span></div>\`);
      }
      out.hidden=false;
      out.innerHTML='<strong style="font-size:1.4rem">'+totalMass.toFixed(4)+' g/mol</strong><div style="margin-top:0.75rem;font-size:0.875rem">'+breakdown.join('')+'</div>';
    }catch(err){out.innerHTML='<p style="color:var(--red,#ef4444)">Invalid formula</p>';out.hidden=false;}
  });
})();`
);

// ─── 164 ── Newton's Laws Problems ────────────────────────────────────────────
tool('newtonslaw', 'science', '🍎',
  `<form id="nl-form"><div class="field"><label for="nl-type">{{ui.problem}}</label><select id="nl-type"><option value="f">{{ui.force}} (F = ma)</option><option value="m">{{ui.mass}} (m = F/a)</option><option value="a">{{ui.acceleration}} (a = F/m)</option></select></div><div class="row"><div class="field"><label for="nl-a">{{ui.a}}</label><input type="number" id="nl-a" step="any" placeholder="—" inputmode="decimal"></div><div class="field"><label for="nl-b">{{ui.b}}</label><input type="number" id="nl-b" step="any" placeholder="—" inputmode="decimal"></div></div><div class="row" style="justify-content:center"><button class="btn" type="submit">{{ui.solve}}</button></div></form><div id="nl-out" hidden class="result"></div>`,
  { title:"Newton's Second Law Calculator — F = ma solver", metaDescription:"Free Newton's Second Law calculator. Solve for force (F), mass (m) or acceleration (a) using F = ma. Shows units and explanation.", h1:"Newton's Second Law Calculator (F = ma)", intro:"Solve for force, mass or acceleration using Newton's Second Law: F = ma. Select what you want to find and enter the other two values.", faq_title:"Newton's Law FAQ", ui:{ problem:'Solve for', force:'Force (F) in Newtons', mass:'Mass (m) in kg', acceleration:'Acceleration (a) in m/s²', a:'First value', b:'Second value', solve:'Solve' }, faq:[
    { q:"What is Newton's Second Law?", a:"Newton's Second Law states that the net force on an object equals its mass times acceleration: F = ma. It is one of the most important relationships in classical mechanics. Force is measured in Newtons (N), where 1 N = 1 kg·m/s²." },
    { q:'What is weight vs mass?', a:'Mass is the amount of matter in an object (kg). Weight is the gravitational force on that mass (N). W = mg, where g ≈ 9.81 m/s² on Earth. A 70 kg person has a mass of 70 kg and a weight of ~687 N.' },
    { q:"What are Newton's other laws?", a:"First Law (Inertia): An object at rest stays at rest, and an object in motion stays in motion unless acted on by a net external force. Third Law (Action-Reaction): For every action there is an equal and opposite reaction." }
  ]},
  { title:"Calculadora da Segunda Lei de Newton — solucionador F = ma", metaDescription:"Calculadora gratuita da Segunda Lei de Newton. Resolva para força (F), massa (m) ou aceleração (a) usando F = ma.", h1:"Calculadora da Segunda Lei de Newton (F = ma)", intro:"Resolva para força, massa ou aceleração usando a Segunda Lei de Newton: F = ma. Selecione o que você quer encontrar e insira os outros dois valores.", faq_title:"Perguntas frequentes sobre a Lei de Newton", ui:{ problem:'Resolver para', force:'Força (F) em Newtons', mass:'Massa (m) em kg', acceleration:'Aceleração (a) em m/s²', a:'Primeiro valor', b:'Segundo valor', solve:'Resolver' }, faq:[
    { q:'O que é a Segunda Lei de Newton?', a:"A Segunda Lei de Newton afirma que a força líquida sobre um objeto é igual à sua massa vezes a aceleração: F = ma. A força é medida em Newtons (N), onde 1 N = 1 kg·m/s²." },
    { q:'Qual a diferença entre peso e massa?', a:'Massa é a quantidade de matéria em um objeto (kg). Peso é a força gravitacional nessa massa (N). P = mg, onde g ≈ 9,81 m/s² na Terra.' },
    { q:'Quais são as outras leis de Newton?', a:'Primeira Lei (Inércia): Um objeto em repouso permanece em repouso, e um objeto em movimento permanece em movimento, a menos que uma força externa líquida atue sobre ele. Terceira Lei: Para toda ação há uma reação igual e oposta.' }
  ]},
  `(function(){
  const labels={f:['Mass (kg)','Acceleration (m/s²)'],m:['Force (N)','Acceleration (m/s²)'],a:['Force (N)','Mass (kg)']};
  function updateLabels(){
    const t=document.getElementById('nl-type').value;
    document.querySelector('[for=nl-a]').textContent=labels[t][0];
    document.querySelector('[for=nl-b]').textContent=labels[t][1];
  }
  document.getElementById('nl-type').addEventListener('change',updateLabels);
  updateLabels();
  document.getElementById('nl-form').addEventListener('submit',function(e){
    e.preventDefault();
    const t=document.getElementById('nl-type').value;
    const a=parseFloat(document.getElementById('nl-a').value);
    const b=parseFloat(document.getElementById('nl-b').value);
    const out=document.getElementById('nl-out');
    let result,unit,formula;
    if(t==='f'){result=a*b;unit='N';formula=a+' kg × '+b+' m/s² = ';}
    else if(t==='m'){result=a/b;unit='kg';formula=a+' N ÷ '+b+' m/s² = ';}
    else{result=a/b;unit='m/s²';formula=a+' N ÷ '+b+' kg = ';}
    out.hidden=false;
    out.innerHTML=\`<span class="big">\${formula}\${result.toPrecision(6).replace(/\\.?0+$/,'')} \${unit}</span>\`;
  });
})();`
);

// ─── 165 ── Kinematic Equations Solver ────────────────────────────────────────
tool('kinematics', 'science', '🏎️',
  `<form id="kin-form"><p style="opacity:0.7;font-size:0.875rem">{{ui.instruction}}</p><div class="row"><div class="field"><label for="kin-v0">{{ui.v0}} (m/s)</label><input type="number" id="kin-v0" step="any" placeholder="{{ui.optional}}" inputmode="decimal"></div><div class="field"><label for="kin-v">{{ui.v}} (m/s)</label><input type="number" id="kin-v" step="any" placeholder="{{ui.optional}}" inputmode="decimal"></div><div class="field"><label for="kin-a">{{ui.a}} (m/s²)</label><input type="number" id="kin-a" step="any" placeholder="{{ui.optional}}" inputmode="decimal"></div></div><div class="row"><div class="field"><label for="kin-t">{{ui.t}} (s)</label><input type="number" id="kin-t" step="any" placeholder="{{ui.optional}}" inputmode="decimal"></div><div class="field"><label for="kin-d">{{ui.d}} (m)</label><input type="number" id="kin-d" step="any" placeholder="{{ui.optional}}" inputmode="decimal"></div></div><div class="row" style="justify-content:center"><button class="btn" type="submit">{{ui.solve}}</button></div></form><div id="kin-out" hidden class="result" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:0.5rem"></div>`,
  { title:'Kinematic Equations Solver — solve for velocity, acceleration, time and distance', metaDescription:'Free kinematics solver. Enter any 3 of 5 variables (v₀, v, a, t, d) to solve the unknown kinematic variables using the equations of motion.', h1:'Kinematic Equations Solver', intro:'Enter any 3 of the 5 kinematic variables (initial velocity, final velocity, acceleration, time, displacement) to solve for the unknowns.', faq_title:'Kinematics FAQ', ui:{ instruction:'Enter at least 3 of the 5 variables.', v0:'Initial velocity v₀', v:'Final velocity v', a:'Acceleration a', t:'Time t', d:'Displacement d', optional:'optional', solve:'Solve' }, faq:[
    { q:'What are the kinematic equations?', a:'The four kinematic equations for constant acceleration: (1) v = v₀ + at, (2) d = v₀t + ½at², (3) v² = v₀² + 2ad, (4) d = (v₀+v)/2 × t. These describe motion in a straight line with constant acceleration.' },
    { q:'What does "constant acceleration" mean?', a:'Constant acceleration means the acceleration does not change over time. Common examples: free fall (a = 9.81 m/s² downward), a car accelerating uniformly from 0 to 60 mph. If acceleration varies, calculus is needed.' },
    { q:'What are the SI units for kinematics?', a:'Displacement (d): metres (m). Velocity (v, v₀): metres per second (m/s). Acceleration (a): metres per second squared (m/s²). Time (t): seconds (s). All kinematic equations are consistent in SI units.' }
  ]},
  { title:'Solucionador de Equações Cinemáticas — resolver velocidade, aceleração, tempo e distância', metaDescription:'Solucionador cinemático gratuito. Insira quaisquer 3 das 5 variáveis (v₀, v, a, t, d) para resolver as variáveis cinemáticas desconhecidas.', h1:'Solucionador de Equações Cinemáticas', intro:'Insira quaisquer 3 das 5 variáveis cinemáticas (velocidade inicial, velocidade final, aceleração, tempo, deslocamento) para resolver as incógnitas.', faq_title:'Perguntas frequentes sobre cinemática', ui:{ instruction:'Insira pelo menos 3 das 5 variáveis.', v0:'Velocidade inicial v₀', v:'Velocidade final v', a:'Aceleração a', t:'Tempo t', d:'Deslocamento d', optional:'opcional', solve:'Resolver' }, faq:[
    { q:'Quais são as equações cinemáticas?', a:'As quatro equações cinemáticas para aceleração constante: (1) v = v₀ + at, (2) d = v₀t + ½at², (3) v² = v₀² + 2ad, (4) d = (v₀+v)/2 × t.' },
    { q:'O que significa "aceleração constante"?', a:'Aceleração constante significa que a aceleração não muda ao longo do tempo. Exemplos comuns: queda livre (a = 9,81 m/s² para baixo), carro acelerando uniformemente.' },
    { q:'Quais são as unidades SI para cinemática?', a:'Deslocamento (d): metros (m). Velocidade: metros por segundo (m/s). Aceleração: metros por segundo ao quadrado (m/s²). Tempo: segundos (s).' }
  ]},
  `(function(){
  document.getElementById('kin-form').addEventListener('submit',function(e){
    e.preventDefault();
    let v0=parseFloat(document.getElementById('kin-v0').value);
    let v=parseFloat(document.getElementById('kin-v').value);
    let a=parseFloat(document.getElementById('kin-a').value);
    let t=parseFloat(document.getElementById('kin-t').value);
    let d=parseFloat(document.getElementById('kin-d').value);
    // Solve known combinations
    for(let iter=0;iter<5;iter++){
      if(!isNaN(v0)&&!isNaN(a)&&!isNaN(t)){if(isNaN(v))v=v0+a*t;if(isNaN(d))d=v0*t+0.5*a*t*t;}
      if(!isNaN(v0)&&!isNaN(v)&&!isNaN(a)){if(isNaN(t))t=(v-v0)/a;if(isNaN(d))d=(v*v-v0*v0)/(2*a);}
      if(!isNaN(v0)&&!isNaN(v)&&!isNaN(t)){if(isNaN(a))a=(v-v0)/t;if(isNaN(d))d=(v0+v)/2*t;}
      if(!isNaN(v0)&&!isNaN(d)&&!isNaN(t)){if(isNaN(a))a=2*(d-v0*t)/(t*t);if(isNaN(v))v=v0+a*t;}
      if(!isNaN(v)&&!isNaN(a)&&!isNaN(t)){if(isNaN(v0))v0=v-a*t;if(isNaN(d))d=v*t-0.5*a*t*t;}
    }
    const known=[!isNaN(v0),!isNaN(v),!isNaN(a),!isNaN(t),!isNaN(d)].filter(Boolean).length;
    if(known<3){alert('Need at least 3 known values');return;}
    const fmt=x=>isNaN(x)?'—':x.toPrecision(6).replace(/\\.?0+$/,'');
    const items=[['v₀ (m/s)',fmt(v0)],['v (m/s)',fmt(v)],['a (m/s²)',fmt(a)],['t (s)',fmt(t)],['d (m)',fmt(d)]];
    const out=document.getElementById('kin-out');
    out.hidden=false;
    out.innerHTML=items.map(([k,v2])=>\`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">\${k}</div><strong>\${v2}</strong></div>\`).join('');
  });
})();`
);

console.log('\n✓ Batch 8 (tools 151-165) complete.');
