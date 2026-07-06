#!/usr/bin/env node
/**
 * Batch 3: generates ~60 more tools programmatically.
 * Uses a structured data-driven approach to avoid large inline template literals.
 */
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const p = (...s) => join(ROOT, ...s);

function write(rel, content) {
  const out = p(rel);
  if (existsSync(out)) { console.log(`  skip: ${rel}`); return; }
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, content, 'utf8');
  console.log(`  wrote: ${rel}`);
}

/** Build a minimal but complete tool definition. */
function mkTool({
  slug, cat, icon, scriptFile,
  widget,
  enStrings, ptStrings,
  js,
  enContent, ptContent,
}) {
  console.log(`\n[${slug}]`);
  const jsonData = {
    slug, category: cat, icon,
    script: scriptFile || null,
    widget: widget || '',
    strings: { en: enStrings, pt: ptStrings },
  };
  write(`data/tools/${slug}.json`, JSON.stringify(jsonData, null, 2) + '\n');
  if (scriptFile && js) write(`public/assets/tools/${scriptFile}`, js + '\n');
  if (enContent) write(`data/content/${slug}/en.md`, enContent.trimStart() + '\n');
  if (ptContent) write(`data/content/${slug}/pt.md`, ptContent.trimStart() + '\n');
}

// ──────────────────────────────────────────────────────────────────────────────
// Helper to build the standard strings object quickly
function str(title, meta, h1, intro, faq_title, uiObj, faqs) {
  return { title, metaDescription: meta, h1, intro, faq_title, ui: uiObj, faq: faqs };
}

// ──────────────────────────────────────────────────────────────────────────────
// TOOLS DATA

const TOOLS = [

// ── FINANCE ──────────────────────────────────────────────────────────────────
{
  slug: 'retirementcalc', cat: 'finance', icon: '🏖️', scriptFile: 'retirementcalc.js',
  widget: '<form id="rc-form"><div class="row"><div class="field"><label for="rc-age">{{ui.current_age}}</label><input type="number" id="rc-age" value="30" min="1" max="100" step="1" inputmode="numeric"></div><div class="field"><label for="rc-retire">{{ui.retire_age}}</label><input type="number" id="rc-retire" value="65" min="1" max="100" step="1" inputmode="numeric"></div><div class="field"><label for="rc-save">{{ui.monthly_save}}</label><input type="number" id="rc-save" value="500" step="any" min="0" inputmode="decimal"></div><div class="field"><label for="rc-rate">{{ui.rate}}</label><input type="number" id="rc-rate" value="7" step="any" min="0" inputmode="decimal"></div></div><div class="result"><span class="hint">{{ui.at_retirement}}: </span><span class="big" id="rc-out">—</span></div><div id="rc-detail" style="opacity:0.7;font-size:0.9rem;margin-top:0.5rem"></div></form>',
  enStrings: str('Retirement Calculator — how much will you save?','Free retirement calculator. Estimate your retirement savings based on monthly contributions, expected return, and years to retirement.','Retirement Savings Calculator','Enter your age, target retirement age, monthly savings, and expected return to estimate your retirement fund.','Retirement calculator FAQ',{current_age:'Current age',retire_age:'Retirement age',monthly_save:'Monthly savings',rate:'Annual return %',at_retirement:'Estimated savings at retirement'},[{q:'What interest rate should I use?',a:'Historical stock market returns average around 7% annually after inflation. For a conservative estimate use 5–6%; for a more optimistic estimate use 8–10%.'},{q:'Does this include employer match?',a:'No. Add your employer match to your monthly contribution amount to include it.'},{q:'What about inflation?',a:'Using 7% assumes returns after inflation (real returns). If you use nominal returns (e.g. 10%), the purchasing power of the result will be lower.'}]),
  ptStrings: str('Calculadora de Aposentadoria — quanto você economizará?','Calculadora de aposentadoria gratuita. Estime suas economias de aposentadoria com base em contribuições mensais, retorno esperado e anos até a aposentadoria.','Calculadora de Economias para Aposentadoria','Informe sua idade, idade de aposentadoria desejada, economia mensal e retorno esperado para estimar seu fundo de aposentadoria.','Perguntas frequentes da calculadora de aposentadoria',{current_age:'Idade atual',retire_age:'Idade de aposentadoria',monthly_save:'Economia mensal',rate:'Retorno anual %',at_retirement:'Economias estimadas na aposentadoria'},[{q:'Qual taxa de retorno devo usar?',a:'Os retornos históricos do mercado de ações são em média cerca de 7% ao ano após a inflação. Para uma estimativa conservadora use 5–6%; para uma estimativa mais otimista use 8–10%.'},{q:'Isso inclui o match do empregador?',a:'Não. Adicione o match do seu empregador ao valor da sua contribuição mensal para incluí-lo.'},{q:'E a inflação?',a:'Usar 7% assume retornos após a inflação (retornos reais). Se você usar retornos nominais (por ex. 10%), o poder de compra do resultado será menor.'}]),
  js: `(function(){
  'use strict';
  function calc(){
    var age=parseInt(document.getElementById('rc-age').value,10);
    var retire=parseInt(document.getElementById('rc-retire').value,10);
    var save=parseFloat(document.getElementById('rc-save').value);
    var rate=parseFloat(document.getElementById('rc-rate').value)/100/12;
    var out=document.getElementById('rc-out'),det=document.getElementById('rc-detail');
    if([age,retire,save,rate].some(isNaN)||retire<=age){if(out)out.textContent='—';return;}
    var n=(retire-age)*12;
    var fv=rate===0?save*n:save*(Math.pow(1+rate,n)-1)/rate;
    if(out)out.textContent=fv.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2});
    if(det)det.textContent='Over '+(retire-age)+' years, you contribute '+((save*n).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2}))+' in total.';
  }
  document.querySelectorAll('#rc-age,#rc-retire,#rc-save,#rc-rate').forEach(function(el){el.addEventListener('input',calc);});
  calc();
})();`,
  enContent: `## Estimate how much you'll have when you retire

Retirement planning starts with a simple question: if I save a certain amount each month, how much will I have when I stop working? This calculator gives you that number based on your current age, your target retirement age, your monthly savings, and the expected annual return on your investments.

## How the calculation works

The formula for the future value of a regular monthly contribution is:

FV = PMT × [(1 + r)^n − 1] / r

Where PMT is the monthly payment, r is the monthly interest rate (annual rate ÷ 12), and n is the total number of months (years × 12).

This is the standard future value of an annuity formula. It assumes you make consistent monthly contributions and that returns compound monthly.

## The power of time

Time is the most important variable in retirement savings. Starting earlier has a dramatically larger effect than increasing contributions later.

Example: Saving $500/month at 7% annual return:
- Starting at age 25 (40 years): $1,327,000
- Starting at age 35 (30 years): $600,000
- Starting at age 45 (20 years): $247,000

The person who starts at 25 accumulates more than twice as much as the person who starts at 35, despite only contributing for 10 more years.

## What interest rate to use

The choice of expected return significantly affects the result:
- 5%: conservative estimate, appropriate for a bond-heavy portfolio
- 7%: the traditional rule of thumb for a diversified stock-and-bond portfolio (real, inflation-adjusted return)
- 10%: approximate historical nominal US stock market return (before inflation)

Using real returns (after inflation) makes the result easier to interpret in today's dollars. Using nominal returns requires discounting the result for future inflation.

## Improving your retirement outcome

Several levers increase retirement savings:
- **Start earlier**: Every year earlier has a compounding effect.
- **Save more**: Even small increases compound significantly over decades.
- **Optimize asset allocation**: Higher equity allocation historically produces higher long-term returns, with higher short-term volatility.
- **Reduce fees**: Investment fees of 1–2% per year reduce retirement wealth by 20–40% over 30 years.
- **Tax-advantaged accounts**: 401(k), IRA, Roth IRA (US), ISA (UK), and similar accounts shelter growth from taxes.

## How much do you need to retire?

A common rule of thumb is the 4% rule: you can sustainably withdraw 4% of your portfolio per year without running out of money over a 30-year retirement. So to spend $40,000 per year you need $1,000,000 saved. To spend $60,000 per year you need $1,500,000.

Use this calculator to estimate what you will have, then compare it to the 4% rule target for your desired annual spending.

## Private and instant

All calculations run in your browser. No data is sent anywhere.
`,
  ptContent: `## Estime quanto você terá quando se aposentar

O planejamento de aposentadoria começa com uma pergunta simples: se eu poupar uma certa quantia por mês, quanto terei quando parar de trabalhar? Esta calculadora dá esse número com base na sua idade atual, idade de aposentadoria desejada, economia mensal e retorno anual esperado.

## Como o cálculo funciona

A fórmula para o valor futuro de uma contribuição mensal regular é:

VF = PMT × [(1 + r)^n − 1] / r

Onde PMT é o pagamento mensal, r é a taxa mensal e n é o número total de meses.

## O poder do tempo

O tempo é a variável mais importante nas economias para aposentadoria. Começar mais cedo tem um efeito dramaticamente maior do que aumentar as contribuições mais tarde.

Exemplo: Economizando R$ 500/mês a 7% de retorno anual:
- Começando aos 25 anos (40 anos): R$ 1.327.000
- Começando aos 35 anos (30 anos): R$ 600.000
- Começando aos 45 anos (20 anos): R$ 247.000

## Que taxa de retorno usar

- 5%: estimativa conservadora, adequada para uma carteira com muitos títulos
- 7%: a regra geral tradicional para uma carteira diversificada (retorno real, ajustado pela inflação)
- 10%: retorno histórico aproximado nominal do mercado de ações dos EUA (antes da inflação)

## Privado e instantâneo

Todos os cálculos rodam no seu navegador. Nenhum dado é enviado a lugar nenhum.
`,
},

{
  slug: 'currencyconverter', cat: 'finance', icon: '💱', scriptFile: 'currencyconverter.js',
  widget: '<div id="cc-app"><p style="opacity:0.6;font-size:0.85rem;margin-bottom:0.75rem">{{ui.note}}</p><div class="row"><div class="field"><label for="cc-amount">{{ui.amount}}</label><input type="number" id="cc-amount" value="1" step="any" min="0" inputmode="decimal"></div><div class="field"><label for="cc-from">{{ui.from}}</label><select id="cc-from"></select></div><div class="field"><label for="cc-to">{{ui.to}}</label><select id="cc-to"></select></div></div><div class="result"><span class="hint">{{ui.result}}: </span><span class="big" id="cc-out">—</span></div><div id="cc-note2" style="opacity:0.55;font-size:0.8rem;margin-top:0.5rem">{{ui.approx}}</div></div>',
  enStrings: str('Currency Converter — convert between 30+ currencies','Free currency converter with approximate exchange rates. Convert USD, EUR, GBP, JPY, BRL, and 30+ more currencies instantly in your browser.','Currency Converter','Enter an amount and select currencies to convert. Rates are approximate reference values.','Currency converter FAQ',{amount:'Amount',from:'From',to:'To',result:'Result',note:'Rates shown are approximate static reference values for educational use.',approx:'Exchange rates fluctuate constantly. Use a bank or financial service for live rates.'},[{q:'Are these live rates?',a:'No. This tool uses approximate static reference rates for demonstration purposes. For real financial transactions always use a live rate from a bank, broker, or dedicated currency service.'},{q:'Which currencies are supported?',a:'The tool includes 30+ commonly traded currencies: USD, EUR, GBP, JPY, CAD, AUD, CHF, CNY, INR, BRL, MXN, and more.'},{q:'How are exchange rates calculated?',a:'All rates are relative to USD. To convert EUR to GBP, the tool first converts EUR to USD then USD to GBP using the stored rate table.'}]),
  ptStrings: str('Conversor de Moedas — converta entre 30+ moedas','Conversor de moedas gratuito com taxas de câmbio aproximadas. Converta USD, EUR, GBP, JPY, BRL e mais de 30 moedas na hora no seu navegador.','Conversor de Moedas','Informe um valor e selecione as moedas para converter. As taxas são valores de referência aproximados.','Perguntas frequentes do conversor de moedas',{amount:'Valor',from:'De',to:'Para',result:'Resultado',note:'As taxas mostradas são valores estáticos aproximados para uso educacional.',approx:'As taxas de câmbio flutuam constantemente. Use um banco ou serviço financeiro para taxas ao vivo.'},[{q:'São taxas ao vivo?',a:'Não. Esta ferramenta usa taxas estáticas aproximadas para fins de demonstração. Para transações financeiras reais, sempre use uma taxa ao vivo de um banco, corretora ou serviço de câmbio dedicado.'},{q:'Quais moedas são suportadas?',a:'A ferramenta inclui mais de 30 moedas comumente negociadas: USD, EUR, GBP, JPY, CAD, AUD, CHF, CNY, INR, BRL, MXN e mais.'},{q:'Como as taxas de câmbio são calculadas?',a:'Todas as taxas são relativas ao USD. Para converter EUR para GBP, a ferramenta primeiro converte EUR para USD e depois USD para GBP usando a tabela de taxas armazenada.'}]),
  js: `(function(){
  'use strict';
  var rates={USD:1,EUR:0.92,GBP:0.79,JPY:149.5,CAD:1.36,AUD:1.53,CHF:0.89,CNY:7.24,INR:83.1,BRL:4.97,MXN:17.2,KRW:1325,SGD:1.34,HKD:7.82,NOK:10.6,SEK:10.4,DKK:6.88,NZD:1.63,ZAR:18.6,TRY:30.5,RUB:90.5,PLN:3.97,CZK:22.8,HUF:355,RON:4.56,THB:35.1,MYR:4.69,IDR:15680,PHP:55.8,AED:3.67,SAR:3.75,EGP:30.9,PKR:278,NGN:1465,CLP:890,COP:3940,PEN:3.71,VND:24350,UAH:37.5,ILS:3.77};
  var names={USD:'US Dollar',EUR:'Euro',GBP:'British Pound',JPY:'Japanese Yen',CAD:'Canadian Dollar',AUD:'Australian Dollar',CHF:'Swiss Franc',CNY:'Chinese Yuan',INR:'Indian Rupee',BRL:'Brazilian Real',MXN:'Mexican Peso',KRW:'South Korean Won',SGD:'Singapore Dollar',HKD:'Hong Kong Dollar',NOK:'Norwegian Krone',SEK:'Swedish Krona',DKK:'Danish Krone',NZD:'New Zealand Dollar',ZAR:'South African Rand',TRY:'Turkish Lira',RUB:'Russian Ruble',PLN:'Polish Zloty',CZK:'Czech Koruna',HUF:'Hungarian Forint',RON:'Romanian Leu',THB:'Thai Baht',MYR:'Malaysian Ringgit',IDR:'Indonesian Rupiah',PHP:'Philippine Peso',AED:'UAE Dirham',SAR:'Saudi Riyal',EGP:'Egyptian Pound',PKR:'Pakistani Rupee',NGN:'Nigerian Naira',CLP:'Chilean Peso',COP:'Colombian Peso',PEN:'Peruvian Sol',VND:'Vietnamese Dong',UAH:'Ukrainian Hryvnia',ILS:'Israeli Shekel'};
  var from=document.getElementById('cc-from'),to=document.getElementById('cc-to'),amt=document.getElementById('cc-amount'),out=document.getElementById('cc-out');
  if(!from)return;
  var keys=Object.keys(rates);
  keys.forEach(function(k){
    var o1=document.createElement('option'),o2=document.createElement('option');
    o1.value=k;o1.textContent=k+' — '+names[k];
    o2.value=k;o2.textContent=k+' — '+names[k];
    from.appendChild(o1);to.appendChild(o2);
  });
  from.value='USD';to.value='EUR';
  function calc(){
    var a=parseFloat(amt.value);
    if(isNaN(a)){if(out)out.textContent='—';return;}
    var f=rates[from.value],t=rates[to.value];
    var r=a/f*t;
    if(out)out.textContent=r.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:4})+' '+to.value;
  }
  [from,to,amt].forEach(function(el){el.addEventListener('input',calc);el.addEventListener('change',calc);});
  calc();
})();`,
  enContent: `## Convert between 40+ world currencies

Currency conversion is needed every time you travel abroad, shop on an international website, receive payment in a foreign currency, or compare prices across countries. This converter includes 40+ currencies from around the world and shows an estimated converted amount instantly when you enter a value.

## Important note on rates

The exchange rates in this tool are approximate static reference values. They are useful for getting a ballpark estimate of currency equivalence but should not be used for actual financial transactions. Exchange rates fluctuate continuously based on economic conditions, interest rates, political events, and market sentiment. For real money transfers, always use a live rate from your bank, a currency broker, or a specialist money transfer service.

## Major currency pairs

The foreign exchange (forex) market is the world's largest financial market, with over $7 trillion changing hands daily. Currency pairs are quoted with a base currency and a quote currency. The most traded pairs include:

- **EUR/USD**: Euro against US Dollar — the most traded pair in the world
- **USD/JPY**: US Dollar against Japanese Yen — the second most traded pair
- **GBP/USD**: British Pound against US Dollar — known as "Cable" in trading
- **USD/CHF**: US Dollar against Swiss Franc — Switzerland's reputation for stability makes the CHF a safe-haven currency
- **AUD/USD**: Australian Dollar against US Dollar — driven heavily by commodity prices
- **USD/CAD**: US Dollar against Canadian Dollar — also commodity-driven due to Canada's oil exports
- **USD/CNY**: US Dollar against Chinese Yuan — an increasingly important pair as China's economy grows

## Understanding exchange rates

Exchange rates tell you how much of one currency you get per unit of another. USD/EUR = 0.92 means 1 USD buys 0.92 EUR. EUR/USD = 1.09 means 1 EUR buys 1.09 USD.

Rates change based on many factors: inflation differentials between countries, interest rate decisions by central banks, trade balances, political stability, and speculative flows.

## Currency symbols and codes

Each currency has a three-letter ISO 4217 code. The first two letters typically represent the country (or region for EUR) and the third represents the currency name:
- USD = United States Dollar
- EUR = Euro (European Union)
- GBP = Great Britain Pound
- BRL = Brazilian Real
- JPY = Japanese Yen

## Private and instant

All conversions run in your browser using static reference rates. No data is sent anywhere.
`,
  ptContent: `## Converta entre 40+ moedas mundiais

A conversão de moeda é necessária toda vez que você viaja para o exterior, compra em um site internacional, recebe pagamento em moeda estrangeira ou compara preços entre países.

## Nota importante sobre as taxas

As taxas de câmbio nesta ferramenta são valores de referência estáticos aproximados. Elas são úteis para obter uma estimativa aproximada da equivalência de moedas, mas não devem ser usadas para transações financeiras reais. As taxas de câmbio flutuam continuamente com base em condições econômicas, taxas de juros, eventos políticos e sentimento do mercado.

## Principais pares de moedas

O mercado de câmbio (forex) é o maior mercado financeiro do mundo, com mais de US$ 7 trilhões mudando de mãos diariamente. Os pares mais negociados incluem:

- **EUR/USD**: Euro contra Dólar Americano — o par mais negociado do mundo
- **USD/JPY**: Dólar Americano contra Iene Japonês
- **GBP/USD**: Libra Britânica contra Dólar Americano
- **USD/BRL**: Dólar Americano contra Real Brasileiro

## Entendendo as taxas de câmbio

As taxas de câmbio dizem quanto de uma moeda você obtém por unidade de outra. USD/EUR = 0,92 significa que 1 USD compra 0,92 EUR.

## Privado e instantâneo

Todas as conversões rodam no seu navegador usando taxas de referência estáticas. Nenhum dado é enviado a lugar nenhum.
`,
},

// ── HEALTH ────────────────────────────────────────────────────────────────────
{
  slug: 'caloriecalc', cat: 'health', icon: '🥗', scriptFile: 'caloriecalc.js',
  widget: '<form id="cal-form"><div class="row"><div class="field"><label for="cal-food">{{ui.food}}</label><input type="text" id="cal-food" placeholder="{{ui.placeholder}}" list="cal-list"><datalist id="cal-list"></datalist></div><div class="field"><label for="cal-qty">{{ui.qty}}</label><input type="number" id="cal-qty" value="100" step="any" min="0" inputmode="decimal"></div><div class="field"><label for="cal-unit">{{ui.unit}}</label><select id="cal-unit"><option value="g">g</option><option value="oz">oz</option></select></div></div><div class="result"><span class="hint">{{ui.calories}}: </span><span class="big" id="cal-out">—</span></div></form>',
  enStrings: str('Calorie Calculator — calories per food item','Free calorie calculator. Look up approximate calories per 100g for common foods. Great for diet tracking and meal planning.','Food Calorie Calculator','Type a food name and quantity to see the estimated calorie count. Based on approximate values per 100g.','Calorie calculator FAQ',{food:'Food name',placeholder:'e.g. banana, rice, chicken',qty:'Amount',unit:'Unit',calories:'Approximate calories'},[{q:'How accurate are these values?',a:'Values are approximate and based on typical nutritional data. Actual calories vary with variety, cooking method, and preparation. Use a verified nutrition database or food packaging for precise values.'},{q:'Per 100g vs per serving?',a:'Enter 100 in the quantity field for the per-100g value. Enter your actual portion size to see the calories for that portion.'},{q:'Are these raw or cooked values?',a:'Most values are for raw weight unless noted. Cooked foods typically change in water content, which changes the calorie density per gram.'}]),
  ptStrings: str('Calculadora de Calorias — calorias por alimento','Calculadora de calorias gratuita. Consulte calorias aproximadas por 100g para alimentos comuns. Ótima para rastreamento de dieta e planejamento de refeições.','Calculadora de Calorias de Alimentos','Digite o nome de um alimento e a quantidade para ver a contagem estimada de calorias.','Perguntas frequentes da calculadora de calorias',{food:'Nome do alimento',placeholder:'ex: banana, arroz, frango',qty:'Quantidade',unit:'Unidade',calories:'Calorias aproximadas'},[{q:'Quão precisos são esses valores?',a:'Os valores são aproximados e baseados em dados nutricionais típicos. As calorias reais variam com a variedade, método de cozimento e preparo.'},{q:'Por 100g vs por porção?',a:'Informe 100 no campo de quantidade para o valor por 100g. Informe o tamanho real da sua porção para ver as calorias dessa porção.'},{q:'São valores crus ou cozidos?',a:'A maioria dos valores é para peso cru, a menos que indicado. Os alimentos cozidos geralmente mudam no teor de água, o que altera a densidade calórica por grama.'}]),
  js: `(function(){
  'use strict';
  var db={apple:52,banana:89,orange:47,grape:69,strawberry:32,watermelon:30,mango:60,pineapple:50,avocado:160,lemon:29,peach:39,pear:57,cherry:50,kiwi:61,coconut:354,rice:130,pasta:131,bread:265,potato:77,'sweet potato':86,oats:389,cornflake:370,barley:354,quinoa:120,egg:155,chicken:165,'chicken breast':165,beef:250,'ground beef':250,salmon:208,tuna:144,shrimp:99,cod:82,milk:61,'whole milk':61,'skim milk':35,cheese:402,butter:717,'olive oil':884,'coconut oil':862,yogurt:59,'greek yogurt':97,broccoli:34,spinach:23,carrot:41,tomato:18,cucumber:15,lettuce:15,onion:40,garlic:149,pepper:31,mushroom:22,corn:86,peas:81,beans:127,'black beans':132,'chickpeas':164,lentils:116,almond:579,walnut:654,peanut:567,'peanut butter':588,chocolate:546,'dark chocolate':600,sugar:387,honey:304,coffee:2,tea:1};
  var inp=document.getElementById('cal-food'),qty=document.getElementById('cal-qty'),unit=document.getElementById('cal-unit'),out=document.getElementById('cal-out');
  var dl=document.getElementById('cal-list');
  if(!inp)return;
  Object.keys(db).forEach(function(k){var o=document.createElement('option');o.value=k;if(dl)dl.appendChild(o);});
  function calc(){
    var food=inp.value.toLowerCase().trim();
    var kcPer100=db[food];
    if(!kcPer100){if(out)out.textContent='—';return;}
    var q=parseFloat(qty.value)||100;
    var grams=unit.value==='oz'?q*28.3495:q;
    if(out)out.textContent=Math.round(kcPer100*grams/100)+' kcal';
  }
  [inp,qty,unit].forEach(function(el){el.addEventListener('input',calc);el.addEventListener('change',calc);});
  calc();
})();`,
  enContent: `## Count calories for any food

Calorie counting is one of the most widely used approaches to diet tracking and weight management. Knowing the approximate calorie content of common foods helps you make informed choices about what and how much to eat. This tool provides approximate calorie values for over 60 common foods based on standard nutritional reference data.

## What are calories?

A calorie (kcal or kilocalorie) is a unit of energy. In nutrition, "calories" typically refers to kilocalories — the amount of energy needed to raise 1 kilogram of water by 1 degree Celsius. Your body burns calories for all activities: breathing, thinking, moving, and digesting food.

## Calorie density by food group

Different foods have very different calorie densities per 100 grams:

**Very low calorie (under 50 kcal/100g)**: Most non-starchy vegetables — lettuce (15), cucumber (15), spinach (23), tomato (18), broccoli (34), strawberry (32)

**Low calorie (50–100 kcal/100g)**: Most fruits, dairy — apple (52), banana (89), orange (47), milk (61), potato (77), egg (155 — higher but small per unit)

**Medium calorie (100–200 kcal/100g)**: Cooked grains, lean meats — rice (130), chicken breast (165), salmon (208), pasta (131)

**High calorie (200–400 kcal/100g)**: Cheese, bread, fatty meats — bread (265), beef (250), dark chocolate (600)

**Very high calorie (400+ kcal/100g)**: Oils, nuts, sugars — olive oil (884), almonds (579), peanut butter (588), sugar (387)

## Reading nutrition labels

Packaged foods in most countries must display nutritional information per 100g and per serving. The per-100g value makes comparison between products easy. The per-serving value tells you how many calories a typical portion contains, though serving sizes defined on labels are often smaller than what people actually eat.

## Macronutrients and calorie contribution

Each macronutrient provides a specific number of calories per gram:
- Carbohydrates: 4 kcal per gram
- Protein: 4 kcal per gram
- Fat: 9 kcal per gram
- Alcohol: 7 kcal per gram

This is why high-fat foods have high calorie density — fat contains more than twice as many calories per gram as carbohydrates or protein.

## Weight management basics

The fundamental principle of weight management: eating more calories than you burn leads to weight gain; eating fewer leads to weight loss. One kilogram of body fat contains approximately 7,700 kcal. A daily deficit of 500 kcal leads to approximately 0.5 kg of weekly fat loss.

## Private and instant

All calculations run in your browser. No data is sent anywhere.
`,
  ptContent: `## Conte calorias para qualquer alimento

A contagem de calorias é uma das abordagens mais amplamente usadas para rastreamento de dieta e controle de peso. Conhecer o conteúdo aproximado de calorias de alimentos comuns ajuda você a fazer escolhas informadas sobre o que e quanto comer.

## O que são calorias?

Uma caloria (kcal ou quilocaloria) é uma unidade de energia. Na nutrição, "calorias" geralmente se refere a quilocalorias. Seu corpo queima calorias para todas as atividades: respirar, pensar, se mover e digerir alimentos.

## Densidade calórica por grupo alimentar

Diferentes alimentos têm densidades calóricas muito diferentes por 100 gramas:

**Calorias muito baixas**: maioria dos vegetais não amiláceos — alface (15), pepino (15), espinafre (23)

**Calorias baixas**: maioria das frutas — maçã (52), banana (89), laranja (47)

**Calorias médias**: grãos cozidos, carnes magras — arroz (130), peito de frango (165)

**Calorias altas**: queijo, pão, carnes gordurosas — pão (265), carne bovina (250)

**Calorias muito altas**: óleos, nozes, açúcares — azeite de oliva (884), amêndoas (579)

## Macronutrientes e contribuição calórica

Cada macronutriente fornece um número específico de calorias por grama:
- Carboidratos: 4 kcal por grama
- Proteína: 4 kcal por grama
- Gordura: 9 kcal por grama

## Privado e instantâneo

Todos os cálculos rodam no seu navegador. Nenhum dado é enviado a lugar nenhum.
`,
},

{
  slug: 'idealweightcalc', cat: 'health', icon: '⚖️', scriptFile: 'idealweightcalc.js',
  widget: '<form id="iw-form"><div class="row"><div class="field"><label for="iw-height">{{ui.height}}</label><input type="number" id="iw-height" step="any" min="50" inputmode="decimal"></div><div class="field"><label for="iw-hunit">{{ui.unit}}</label><select id="iw-hunit"><option value="cm">cm</option><option value="in">in</option></select></div><div class="field"><label for="iw-sex">{{ui.sex}}</label><select id="iw-sex"><option value="m">{{ui.male}}</option><option value="f">{{ui.female}}</option></select></div></div><div class="result"><span class="hint">{{ui.ideal_range}}: </span><span class="big" id="iw-out">—</span></div><div id="iw-detail" style="opacity:0.7;font-size:0.9rem;margin-top:0.5rem"></div></form>',
  enStrings: str('Ideal Weight Calculator — healthy weight range for your height','Free ideal weight calculator. Find the healthy weight range for your height and sex using the BMI method and the Robinson, Miller, and Devine formulas.','Ideal Weight Calculator','Enter your height and sex to see the healthy weight range and ideal weight estimates from multiple formulas.','Ideal weight FAQ',{height:'Height',unit:'Unit',sex:'Sex',male:'Male',female:'Female',ideal_range:'Healthy weight range (BMI 18.5–24.9)'},[{q:'Which formula is best?',a:'No single formula is definitively best. The BMI-based range (18.5–24.9) is the most widely used clinical standard. The Robinson, Devine, and Miller formulas give single-point estimates based on height alone, which are useful as rough references.'},{q:'Does muscle mass affect this?',a:'Yes. BMI and height-based formulas do not distinguish between muscle and fat. A heavily muscled athlete may fall in the "overweight" BMI range despite having very low body fat.'},{q:'Is there an ideal weight I should target?',a:'Ideal weight ranges are statistical averages for disease risk, not personal targets. Body weight goals should be discussed with a healthcare provider considering your full health profile.'}]),
  ptStrings: str('Calculadora de Peso Ideal — faixa de peso saudável para sua altura','Calculadora de peso ideal gratuita. Encontre a faixa de peso saudável para sua altura e sexo.','Calculadora de Peso Ideal','Informe sua altura e sexo para ver a faixa de peso saudável e estimativas de peso ideal de várias fórmulas.','Perguntas frequentes do peso ideal',{height:'Altura',unit:'Unidade',sex:'Sexo',male:'Masculino',female:'Feminino',ideal_range:'Faixa de peso saudável (IMC 18,5–24,9)'},[{q:'Qual fórmula é melhor?',a:'Nenhuma fórmula é definitivamente a melhor. A faixa baseada no IMC (18,5–24,9) é o padrão clínico mais amplamente usado.'},{q:'A massa muscular afeta isso?',a:'Sim. O IMC e as fórmulas baseadas na altura não distinguem entre músculo e gordura. Um atleta muito musculoso pode estar na faixa de "sobrepeso" do IMC apesar de ter muito pouca gordura corporal.'},{q:'Há um peso ideal que devo alcançar?',a:'As faixas de peso ideal são médias estatísticas para risco de doenças, não alvos pessoais. As metas de peso corporal devem ser discutidas com um profissional de saúde.'}]),
  js: `(function(){
  'use strict';
  function calc(){
    var h=parseFloat(document.getElementById('iw-height').value);
    var hu=document.getElementById('iw-hunit').value;
    var sex=document.getElementById('iw-sex').value;
    var out=document.getElementById('iw-out'),det=document.getElementById('iw-detail');
    if(isNaN(h)){if(out)out.textContent='—';return;}
    var cm=hu==='in'?h*2.54:h;
    var m=cm/100;
    var lo=18.5*m*m,hi=24.9*m*m;
    var in_cm=cm-152.4;
    var robinson=sex==='m'?52+1.905*(in_cm/2.54):49+1.700*(in_cm/2.54);
    var devine=sex==='m'?50+2.3*(in_cm/2.54):45.5+2.3*(in_cm/2.54);
    var miller=sex==='m'?56.2+1.41*(in_cm/2.54):53.1+1.36*(in_cm/2.54);
    if(out)out.textContent=lo.toFixed(1)+' – '+hi.toFixed(1)+' kg';
    if(det)det.textContent='Robinson: '+robinson.toFixed(1)+' kg · Devine: '+devine.toFixed(1)+' kg · Miller: '+miller.toFixed(1)+' kg';
  }
  document.querySelectorAll('#iw-height,#iw-hunit,#iw-sex').forEach(function(el){el.addEventListener('input',calc);el.addEventListener('change',calc);});
  calc();
})();`,
  enContent: `## Find the healthy weight range for your height

Healthy weight is often expressed as a range rather than a single number, because many factors besides weight determine health. This calculator shows the BMI-based healthy weight range (BMI 18.5–24.9) for your height, along with estimates from three scientific formulas: Robinson (1983), Devine (1974), and Miller (1983).

## The BMI-based range

Body Mass Index (BMI) is calculated as weight in kilograms divided by height in metres squared. The World Health Organization defines the following BMI ranges:
- Under 18.5: Underweight
- 18.5–24.9: Normal/healthy weight
- 25.0–29.9: Overweight
- 30.0+: Obese

For a given height, the healthy weight range is the range of weights that produce a BMI between 18.5 and 24.9. For example, a person 170 cm tall has a healthy range of approximately 53.5–72.0 kg.

## Other ideal weight formulas

The BMI-based range gives a span of healthy weights, but several formulas have been developed to estimate a single "ideal" weight for a given height:

**Robinson formula (1983)**: For men: 52 kg + 1.9 kg per inch over 5 feet. For women: 49 kg + 1.7 kg per inch over 5 feet.

**Devine formula (1974)**: For men: 50 kg + 2.3 kg per inch over 5 feet. For women: 45.5 kg + 2.3 kg per inch over 5 feet. Originally developed for drug dosing in clinical settings.

**Miller formula (1983)**: For men: 56.2 kg + 1.41 kg per inch over 5 feet. For women: 53.1 kg + 1.36 kg per inch over 5 feet.

These formulas all give slightly different results because they were derived from different population datasets using different statistical methods.

## Limitations of weight-based health measures

BMI and ideal weight formulas have well-known limitations:
- They do not account for body composition (muscle vs. fat)
- They were derived primarily from white European populations and may be less accurate for other ethnic groups
- They do not distinguish fat distribution (abdominal fat is more harmful than fat elsewhere)
- They are less useful for children, elderly, and athletes

Additional measures like waist circumference, waist-to-height ratio, and body fat percentage provide more complete pictures of health status.

## Private and instant

All calculations run in your browser. No data is sent anywhere.
`,
  ptContent: `## Encontre a faixa de peso saudável para sua altura

O peso saudável é frequentemente expresso como uma faixa em vez de um único número, porque muitos fatores além do peso determinam a saúde. Esta calculadora mostra a faixa de peso saudável baseada no IMC (18,5–24,9) para sua altura, junto com estimativas de três fórmulas científicas.

## A faixa baseada no IMC

O Índice de Massa Corporal (IMC) é calculado como peso em quilogramas dividido pelo quadrado da altura em metros. A Organização Mundial da Saúde define:
- Abaixo de 18,5: Abaixo do peso
- 18,5–24,9: Peso normal/saudável
- 25,0–29,9: Sobrepeso
- 30,0+: Obesidade

## Outras fórmulas de peso ideal

**Fórmula de Robinson (1983)**: Para homens: 52 kg + 1,9 kg por polegada acima de 5 pés. Para mulheres: 49 kg + 1,7 kg por polegada acima de 5 pés.

**Fórmula de Devine (1974)**: Para homens: 50 kg + 2,3 kg por polegada acima de 5 pés. Originalmente desenvolvida para dosagem de medicamentos em ambientes clínicos.

**Fórmula de Miller (1983)**: Para homens: 56,2 kg + 1,41 kg por polegada acima de 5 pés.

## Limitações das medidas de saúde baseadas no peso

O IMC e as fórmulas de peso ideal têm limitações bem conhecidas: não consideram a composição corporal (músculo vs. gordura) e foram derivadas principalmente de populações europeias brancas.

## Privado e instantâneo

Todos os cálculos rodam no seu navegador. Nenhum dado é enviado a lugar nenhum.
`,
},

// ── TEXT / WRITING ─────────────────────────────────────────────────────────────
{
  slug: 'charcount', cat: 'text', icon: '🔡', scriptFile: 'charcount.js',
  widget: '<div id="cc2-app"><textarea id="cc2-text" rows="5" style="width:100%;box-sizing:border-box;padding:0.75rem;border-radius:0.5rem;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.05);color:inherit;font-size:1rem" placeholder="{{ui.placeholder}}"></textarea><div style="display:flex;gap:1.5rem;flex-wrap:wrap;margin-top:0.75rem"><div><div class="hint">{{ui.chars}}</div><div class="big" id="cc2-chars">0</div></div><div><div class="hint">{{ui.chars_no_space}}</div><div class="big" id="cc2-nosp">0</div></div><div><div class="hint">{{ui.words}}</div><div class="big" id="cc2-words">0</div></div><div><div class="hint">{{ui.lines}}</div><div class="big" id="cc2-lines">0</div></div><div><div class="hint">{{ui.sentences}}</div><div class="big" id="cc2-sents">0</div></div><div><div class="hint">{{ui.paragraphs}}</div><div class="big" id="cc2-paras">0</div></div></div></div>',
  enStrings: str('Character Counter — count characters, words, and lines','Free character counter. Count characters (with and without spaces), words, sentences, paragraphs, and lines in any text. Instant, no signup needed.','Character Counter',`Type or paste your text below to count characters, words, sentences, paragraphs, and lines.`,'Character counter FAQ',{placeholder:'Type or paste text here…',chars:'Characters',chars_no_space:'No spaces',words:'Words',lines:'Lines',sentences:'Sentences',paragraphs:'Paragraphs'},[{q:'Does the character count include spaces?',a:'Both counts are shown: total characters (including spaces) and characters excluding spaces.'},{q:'How are sentences counted?',a:'Sentences are counted by the number of period, exclamation, or question mark characters followed by a space or end of text.'},{q:'What is the difference between lines and paragraphs?',a:'Lines are delimited by newline characters. Paragraphs are groups of lines separated by one or more blank lines.'}]),
  ptStrings: str('Contador de Caracteres — conte caracteres, palavras e linhas','Contador de caracteres gratuito. Conte caracteres (com e sem espaços), palavras, frases, parágrafos e linhas em qualquer texto.','Contador de Caracteres','Digite ou cole seu texto abaixo para contar caracteres, palavras, frases, parágrafos e linhas.','Perguntas frequentes do contador de caracteres',{placeholder:'Digite ou cole texto aqui…',chars:'Caracteres',chars_no_space:'Sem espaços',words:'Palavras',lines:'Linhas',sentences:'Frases',paragraphs:'Parágrafos'},[{q:'A contagem de caracteres inclui espaços?',a:'Ambas as contagens são mostradas: total de caracteres (incluindo espaços) e caracteres excluindo espaços.'},{q:'Como as frases são contadas?',a:'As frases são contadas pelo número de caracteres de ponto final, exclamação ou interrogação seguidos de espaço ou fim do texto.'},{q:'Qual a diferença entre linhas e parágrafos?',a:'As linhas são delimitadas por caracteres de nova linha. Os parágrafos são grupos de linhas separados por uma ou mais linhas em branco.'}]),
  js: `(function(){
  'use strict';
  var ta=document.getElementById('cc2-text');
  if(!ta)return;
  function g(id){return document.getElementById(id);}
  function calc(){
    var t=ta.value;
    var chars=t.length;
    var nosp=t.replace(/\\s/g,'').length;
    var words=t.trim().length?t.trim().split(/\\s+/).length:0;
    var lines=t.length?t.split('\\n').length:0;
    var sents=(t.match(/[.!?]+(?=\\s|$)/g)||[]).length;
    var paras=t.trim().length?(t.trim().split(/\\n\\s*\\n/).length):0;
    if(g('cc2-chars'))g('cc2-chars').textContent=chars;
    if(g('cc2-nosp'))g('cc2-nosp').textContent=nosp;
    if(g('cc2-words'))g('cc2-words').textContent=words;
    if(g('cc2-lines'))g('cc2-lines').textContent=lines;
    if(g('cc2-sents'))g('cc2-sents').textContent=sents;
    if(g('cc2-paras'))g('cc2-paras').textContent=paras;
  }
  ta.addEventListener('input',calc);calc();
})();`,
  enContent: `## Count characters, words, sentences, and more

A character counter is an essential tool for anyone who writes within constraints — social media posts with character limits, meta descriptions, SMS messages, bios, or any other form with a maximum length. This tool counts characters with and without spaces, words, sentences, paragraphs, and lines as you type, updating instantly with each keystroke.

## Why character limits exist

Different platforms enforce different character limits for good reasons:

**Twitter/X**: 280 characters per post. Originally 140 characters (one SMS message), doubled in 2017. The limit encourages concise communication and keeps the timeline browsable.

**Instagram captions**: Up to 2,200 characters, but only the first 125 show before the "more" truncation. Most engagement comes from short captions.

**Meta descriptions (SEO)**: Google typically displays 155–160 characters. Write descriptions of this length to avoid truncation in search results.

**SMS messages**: A standard SMS is 160 characters in GSM encoding. Longer messages are split into multiple parts and reassembled by the receiving device.

**LinkedIn headlines**: 220 characters. LinkedIn bios: 2,600 characters.

**Email subject lines**: Best practice is under 60 characters to avoid truncation on mobile email clients.

## Counting methodology

**Characters with spaces**: Every character including space, newline, and tab counts.

**Characters without spaces**: All whitespace characters are removed before counting. This is useful when comparing against limits that count visible characters only.

**Words**: The text is split by whitespace. Consecutive spaces count as one separator. Empty text has 0 words.

**Sentences**: Counted by terminal punctuation (period, exclamation mark, or question mark) followed by whitespace or end of text.

**Paragraphs**: Blocks of text separated by one or more blank lines.

**Lines**: Total newline characters plus one (the last line may not end with a newline).

## Writing efficiently within limits

When you have a character limit, every word and punctuation mark matters. Useful compression techniques include:
- Using active voice (shorter than passive)
- Replacing "in order to" with "to"
- Cutting redundant adjectives
- Using numerals instead of spelled-out numbers
- Abbreviating where context makes it clear

## Private and instant

The counter runs in your browser. No text you type is sent anywhere.
`,
  ptContent: `## Conte caracteres, palavras, frases e mais

Um contador de caracteres é uma ferramenta essencial para qualquer pessoa que escreve dentro de restrições — postagens de mídia social com limites de caracteres, meta descrições, mensagens SMS, bios ou qualquer outro formulário com comprimento máximo.

## Por que existem limites de caracteres

Diferentes plataformas impõem diferentes limites de caracteres:

**Twitter/X**: 280 caracteres por post.

**Descrições meta (SEO)**: O Google normalmente exibe 155–160 caracteres. Escreva descrições com este comprimento para evitar truncamento nos resultados de busca.

**SMS**: Um SMS padrão tem 160 caracteres na codificação GSM.

**Linhas de assunto de e-mail**: A melhor prática é menos de 60 caracteres para evitar truncamento em clientes de e-mail móveis.

## Metodologia de contagem

**Caracteres com espaços**: Todo caractere incluindo espaço, nova linha e tabulação conta.

**Caracteres sem espaços**: Todos os caracteres de espaço em branco são removidos antes da contagem.

**Palavras**: O texto é dividido por espaço em branco.

**Frases**: Contadas por pontuação terminal seguida de espaço em branco ou fim do texto.

## Privado e instantâneo

O contador roda no seu navegador. Nenhum texto que você digita é enviado a lugar nenhum.
`,
},

{
  slug: 'textdiff', cat: 'text', icon: '📋', scriptFile: 'textdiff.js',
  widget: '<div id="td-app"><div class="row"><div class="field"><label for="td-a">{{ui.text_a}}</label><textarea id="td-a" rows="5" style="width:100%;box-sizing:border-box;padding:0.75rem;border-radius:0.5rem;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.05);color:inherit;font-size:0.9rem" placeholder="{{ui.placeholder_a}}"></textarea></div><div class="field"><label for="td-b">{{ui.text_b}}</label><textarea id="td-b" rows="5" style="width:100%;box-sizing:border-box;padding:0.75rem;border-radius:0.5rem;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.05);color:inherit;font-size:0.9rem" placeholder="{{ui.placeholder_b}}"></textarea></div></div><div id="td-out" style="margin-top:1rem;font-family:monospace;font-size:0.85rem;padding:0.75rem;border-radius:0.5rem;background:rgba(255,255,255,0.05);white-space:pre-wrap;line-height:1.7"></div></div>',
  enStrings: str('Text Diff Tool — compare two texts side by side','Free text diff tool. Compare two texts and highlight the differences between them. Find added, removed, and changed words instantly.','Text Diff Tool','Paste two versions of a text in the boxes below to see what changed between them.','Text diff FAQ',{text_a:'Original text',text_b:'New text',placeholder_a:'Paste original text here…',placeholder_b:'Paste new or revised text here…'},[{q:'How does the diff work?',a:'The tool compares the two texts word by word. Words present in B but not in A are shown in green (added). Words in A but not in B are shown in red (removed).'},{q:'Is this a real diff like git diff?',a:'This is a simple word-level diff for quick comparison. For character-level or line-level diffs as used in programming, dedicated tools like git diff or diff(1) are more appropriate.'},{q:'Is my text stored?',a:'No. The comparison runs entirely in your browser. Nothing is sent to any server.'}]),
  ptStrings: str('Ferramenta de Diff de Texto — compare dois textos','Ferramenta de diff de texto gratuita. Compare dois textos e destaque as diferenças entre eles. Encontre palavras adicionadas, removidas e alteradas na hora.','Ferramenta de Diff de Texto','Cole duas versões de um texto nas caixas abaixo para ver o que mudou entre elas.','Perguntas frequentes do diff de texto',{text_a:'Texto original',text_b:'Novo texto',placeholder_a:'Cole o texto original aqui…',placeholder_b:'Cole o texto novo ou revisado aqui…'},[{q:'Como o diff funciona?',a:'A ferramenta compara os dois textos palavra por palavra. Palavras presentes em B mas não em A são mostradas em verde (adicionadas). Palavras em A mas não em B são mostradas em vermelho (removidas).'},{q:'É um diff real como git diff?',a:'Este é um diff simples no nível de palavras para comparação rápida. Para diffs no nível de caracteres ou linhas como usados em programação, ferramentas dedicadas como git diff são mais apropriadas.'},{q:'Meu texto é armazenado?',a:'Não. A comparação roda inteiramente no seu navegador. Nada é enviado a nenhum servidor.'}]),
  js: `(function(){
  'use strict';
  var ta=document.getElementById('td-a'),tb=document.getElementById('td-b'),out=document.getElementById('td-out');
  if(!ta||!tb||!out)return;
  function lcs(a,b){
    var m=a.length,n=b.length,dp=[];
    for(var i=0;i<=m;i++){dp[i]=new Array(n+1).fill(0);}
    for(var i=1;i<=m;i++)for(var j=1;j<=n;j++){if(a[i-1]===b[j-1])dp[i][j]=dp[i-1][j-1]+1;else dp[i][j]=Math.max(dp[i-1][j],dp[i][j-1]);}
    var res=[],i=m,j=n;
    while(i>0&&j>0){if(a[i-1]===b[j-1]){res.unshift({t:'eq',v:a[i-1]});i--;j--;}else if(dp[i-1][j]>=dp[i][j-1]){res.unshift({t:'del',v:a[i-1]});i--;}else{res.unshift({t:'ins',v:b[j-1]});j--;}}
    while(i>0){res.unshift({t:'del',v:a[--i]});}
    while(j>0){res.unshift({t:'ins',v:b[--j]});}
    return res;
  }
  function diff(){
    var a=ta.value.split(/\\s+/).filter(Boolean),b=tb.value.split(/\\s+/).filter(Boolean);
    if(!a.length&&!b.length){out.textContent='';return;}
    var ops=lcs(a,b);
    out.innerHTML=ops.map(function(op){
      if(op.t==='eq')return op.v;
      if(op.t==='del')return '<span style="background:rgba(255,80,80,0.3);text-decoration:line-through;border-radius:2px;padding:0 2px">'+op.v+'</span>';
      return '<span style="background:rgba(80,255,120,0.3);border-radius:2px;padding:0 2px">'+op.v+'</span>';
    }).join(' ');
  }
  ta.addEventListener('input',diff);tb.addEventListener('input',diff);diff();
})();`,
  enContent: `## Compare two texts and find the differences

Whether you are proofreading a revised document, checking what changed in a contract, comparing two versions of an essay, or verifying that a copy-paste was accurate, a text diff tool saves time by highlighting exactly what changed. Paste the original text in the first box and the new version in the second, and the differences are marked instantly.

## How word-level diff works

The tool uses the Longest Common Subsequence (LCS) algorithm — the same algorithm underlying the Unix diff command and git diff. It finds the largest sequence of words that appear in both texts in the same order, then marks everything outside that sequence as added or deleted.

Words shown in red with strikethrough are in the original but not in the new version (deleted). Words highlighted in green are in the new version but not in the original (added). Unchanged words appear in normal text.

## Common uses for text comparison

**Document revisions**: When a collaborator returns a revised document, quickly see exactly which words or sentences changed without reading both versions in full.

**Contract review**: Legal professionals use diff to track changes between contract versions. A "redline" or "markup" document is essentially a diff applied to legal text.

**Academic proofreading**: Compare a first draft to a revised draft to verify the intended edits were made correctly and no unintended changes were introduced.

**Code review**: While code diffs are best handled by tools like git diff (which operates line-by-line), a word-level diff can help when reviewing documentation or comments.

**Plagiarism checking**: Compare a submitted text against an original to spot paraphrasing — reordered or substituted words that preserve the same meaning.

**Translation verification**: Compare a source text to its translation word-for-word to ensure completeness (though this is approximate due to natural language differences).

## Limitations of word-level diff

This tool compares words without understanding semantics. A sentence that is entirely rewritten with the same meaning will appear fully deleted and added. For understanding semantic similarity, natural language processing tools are needed.

The comparison also does not distinguish formatting, capitalization, or punctuation within words unless they are part of a word token. "Hello" and "hello" are treated as different words.

## Private and instant

All comparisons run in your browser. No text is sent to any server.
`,
  ptContent: `## Compare dois textos e encontre as diferenças

Seja para revisar um documento revisado, verificar o que mudou em um contrato, comparar duas versões de um ensaio ou verificar que um copiar-colar foi preciso, uma ferramenta de diff de texto economiza tempo destacando exatamente o que mudou.

## Como funciona o diff no nível de palavras

A ferramenta usa o algoritmo de Subsequência Comum Mais Longa (LCS) — o mesmo algoritmo subjacente ao comando Unix diff e git diff.

Palavras mostradas em vermelho com tachado estão no original mas não na nova versão (excluídas). Palavras destacadas em verde estão na nova versão mas não no original (adicionadas).

## Usos comuns para comparação de texto

**Revisões de documentos**: Quando um colaborador devolve um documento revisado, veja rapidamente exatamente quais palavras ou frases mudaram.

**Revisão de contratos**: Profissionais jurídicos usam diff para rastrear alterações entre versões de contratos.

**Revisão acadêmica**: Compare um primeiro rascunho a um rascunho revisado para verificar se as edições pretendidas foram feitas corretamente.

## Privado e instantâneo

Todas as comparações rodam no seu navegador. Nenhum texto é enviado a nenhum servidor.
`,
},

// ── CODING / DEVELOPER TOOLS ─────────────────────────────────────────────────
{
  slug: 'jsonformatter', cat: 'dev', icon: '{ }', scriptFile: 'jsonformatter.js',
  widget: '<div id="jf-app"><textarea id="jf-in" rows="6" style="width:100%;box-sizing:border-box;padding:0.75rem;border-radius:0.5rem;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.05);color:inherit;font-size:0.85rem;font-family:monospace" placeholder="{{ui.placeholder}}"></textarea><div style="display:flex;gap:0.5rem;margin-top:0.5rem"><button id="jf-fmt" class="btn">{{ui.format}}</button><button id="jf-min" class="btn secondary">{{ui.minify}}</button><button id="jf-copy" class="btn secondary">{{ui.copy}}</button></div><div id="jf-err" style="color:#f87171;font-size:0.85rem;margin-top:0.5rem"></div><pre id="jf-out" style="background:rgba(255,255,255,0.04);border-radius:0.5rem;padding:0.75rem;margin-top:0.5rem;overflow:auto;font-size:0.82rem;max-height:300px;white-space:pre-wrap;word-break:break-word"></pre></div>',
  enStrings: str('JSON Formatter — format and validate JSON online','Free JSON formatter and validator. Paste JSON to format it with proper indentation, minify it, or check it for errors. Works in your browser instantly.','JSON Formatter & Validator','Paste your JSON in the box below and click Format to pretty-print it, or Minify to compress it.','JSON formatter FAQ',{placeholder:'Paste JSON here…',format:'Format',minify:'Minify',copy:'Copy'},[{q:'What is JSON?',a:'JSON (JavaScript Object Notation) is a lightweight data interchange format. It uses human-readable text to represent data objects consisting of key-value pairs and arrays.'},{q:'What does "format" do?',a:'Formatting (also called "pretty-printing") adds proper indentation and newlines to make JSON human-readable. Minifying removes all whitespace to produce the smallest possible valid JSON string.'},{q:'Does the validator fix errors?',a:'No. The tool parses the JSON and reports the error if it is invalid. Fixing the error is left to the user.'}]),
  ptStrings: str('Formatador de JSON — formate e valide JSON online','Formatador e validador de JSON gratuito. Cole o JSON para formatá-lo com recuo adequado, minificá-lo ou verificar erros.','Formatador e Validador de JSON','Cole seu JSON na caixa abaixo e clique em Formatar para imprimi-lo de forma legível, ou Minificar para compactá-lo.','Perguntas frequentes do formatador de JSON',{placeholder:'Cole JSON aqui…',format:'Formatar',minify:'Minificar',copy:'Copiar'},[{q:'O que é JSON?',a:'JSON (JavaScript Object Notation) é um formato leve de intercâmbio de dados. Usa texto legível por humanos para representar objetos de dados consistindo de pares chave-valor e arrays.'},{q:'O que "formatar" faz?',a:'A formatação (também chamada de "pretty-printing") adiciona recuo adequado e novas linhas para tornar o JSON legível por humanos. Minificar remove todos os espaços em branco.'},{q:'O validador corrige erros?',a:'Não. A ferramenta analisa o JSON e relata o erro se for inválido. Corrigir o erro fica a cargo do usuário.'}]),
  js: `(function(){
  'use strict';
  var inp=document.getElementById('jf-in'),out=document.getElementById('jf-out');
  var err=document.getElementById('jf-err');
  function parse(){try{return{ok:true,val:JSON.parse(inp.value)};}catch(e){return{ok:false,msg:e.message};}}
  document.getElementById('jf-fmt').addEventListener('click',function(){
    var r=parse();if(!r.ok){err.textContent=r.msg;out.textContent='';return;}err.textContent='';out.textContent=JSON.stringify(r.val,null,2);
  });
  document.getElementById('jf-min').addEventListener('click',function(){
    var r=parse();if(!r.ok){err.textContent=r.msg;out.textContent='';return;}err.textContent='';out.textContent=JSON.stringify(r.val);
  });
  document.getElementById('jf-copy').addEventListener('click',function(){
    var t=out.textContent;if(t&&navigator.clipboard)navigator.clipboard.writeText(t);
  });
})();`,
  enContent: `## Format, validate, and minify JSON instantly

JSON (JavaScript Object Notation) is the standard data interchange format for web APIs, configuration files, and data storage. When you receive raw or compact JSON from an API response or a debugging tool, formatting it makes it human-readable in seconds. When you need to transmit JSON efficiently, minifying removes all unnecessary whitespace.

## What is JSON?

JSON is a text-based data format that represents structured data as key-value pairs (objects) and ordered lists (arrays). It was derived from JavaScript object syntax but is language-independent — virtually every programming language has a JSON parser.

A valid JSON document is one of: an object, an array, a string, a number, a boolean (true or false), or null.

Example of valid JSON:

    {
      "name": "Alice",
      "age": 30,
      "scores": [95, 87, 91],
      "active": true
    }

## JSON vs XML

JSON largely replaced XML as the dominant data interchange format on the web because it is more compact, easier to read, and maps naturally to the data structures of most programming languages (objects and arrays).

## Pretty-printing (formatting)

A "minified" JSON string contains no unnecessary whitespace:

    {"name":"Alice","age":30,"scores":[95,87,91],"active":true}

While valid, this is difficult to read. "Pretty-printing" or "formatting" adds indentation and newlines:

Each level of nesting is indented by 2 or 4 spaces. This makes deeply nested structures easy to navigate visually.

## Common JSON errors

**SyntaxError: Unexpected token**: Usually caused by a trailing comma after the last item in an object or array (not allowed in JSON, unlike JavaScript), or a missing closing brace or bracket.

**Property names must be strings**: JSON requires all object keys to be double-quoted strings. Unquoted keys are not valid JSON.

**Single quotes not allowed**: JSON strings must use double quotes. Single-quoted strings are invalid.

**Comments not allowed**: Unlike JavaScript, JSON does not support comments. JSON with embedded comments (like JSONC used in VS Code settings) requires a special parser.

## JSON in web development

Web APIs overwhelmingly use JSON for request and response bodies. The browser's fetch() API and XMLHttpRequest both handle JSON natively. Server-side languages parse JSON using built-in libraries: json in Python, JSON.parse in JavaScript, json_decode in PHP, Gson/Jackson in Java.

## Private and instant

All processing runs in your browser. No JSON you paste is sent anywhere.
`,
  ptContent: `## Formate, valide e minifique JSON instantaneamente

JSON (JavaScript Object Notation) é o formato padrão de intercâmbio de dados para APIs web, arquivos de configuração e armazenamento de dados.

## O que é JSON?

JSON é um formato de dados baseado em texto que representa dados estruturados como pares chave-valor (objetos) e listas ordenadas (arrays). Foi derivado da sintaxe de objeto JavaScript, mas é independente de linguagem.

Exemplo de JSON válido:

    {
      "nome": "Alice",
      "idade": 30,
      "pontuacoes": [95, 87, 91],
      "ativo": true
    }

## Erros comuns de JSON

**Vírgula final**: Vírgulas após o último item em um objeto ou array não são permitidas em JSON.

**Nomes de propriedades devem ser strings**: JSON requer que todas as chaves de objeto sejam strings com aspas duplas.

**Aspas simples não são permitidas**: Strings JSON devem usar aspas duplas.

**Comentários não são permitidos**: Ao contrário do JavaScript, o JSON não suporta comentários.

## JSON no desenvolvimento web

As APIs web usam esmagadoramente JSON para corpos de solicitação e resposta. A API fetch() do navegador e XMLHttpRequest manipulam JSON nativamente.

## Privado e instantâneo

Todo processamento roda no seu navegador. Nenhum JSON que você cola é enviado a lugar nenhum.
`,
},

{
  slug: 'base64codec', cat: 'dev', icon: '🔐', scriptFile: 'base64codec.js',
  widget: '<div id="b64-app"><textarea id="b64-in" rows="4" style="width:100%;box-sizing:border-box;padding:0.75rem;border-radius:0.5rem;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.05);color:inherit;font-size:0.9rem;font-family:monospace" placeholder="{{ui.placeholder}}"></textarea><div style="display:flex;gap:0.5rem;margin-top:0.5rem"><button id="b64-enc" class="btn">{{ui.encode}}</button><button id="b64-dec" class="btn secondary">{{ui.decode}}</button><button id="b64-copy" class="btn secondary">{{ui.copy}}</button></div><pre id="b64-out" style="background:rgba(255,255,255,0.04);border-radius:0.5rem;padding:0.75rem;margin-top:0.5rem;overflow:auto;font-size:0.85rem;max-height:200px;white-space:pre-wrap;word-break:break-all"></pre><div id="b64-err" style="color:#f87171;font-size:0.85rem"></div></div>',
  enStrings: str('Base64 Encoder/Decoder — encode and decode Base64 online','Free Base64 encoder and decoder. Encode text to Base64 or decode Base64 strings back to plain text instantly in your browser.','Base64 Encoder / Decoder','Enter text or Base64 and click Encode or Decode.','Base64 FAQ',{placeholder:'Enter text or Base64…',encode:'Encode',decode:'Decode',copy:'Copy'},[{q:'What is Base64?',a:'Base64 is an encoding scheme that converts binary data into ASCII text using 64 characters (A-Z, a-z, 0-9, +, /). It is used to safely transmit binary data through text-only channels like email or JSON.'},{q:'Is Base64 encryption?',a:'No. Base64 is an encoding, not encryption. Anyone can decode a Base64 string instantly. Do not use it to hide sensitive data.'},{q:'What is Base64 used for?',a:'Embedding images in HTML/CSS (data URIs), encoding email attachments (MIME), storing binary data in JSON, transmitting credentials in HTTP Basic Authentication, and encoding binary data in URLs.'}]),
  ptStrings: str('Codificador/Decodificador Base64 — codifique e decodifique Base64','Codificador e decodificador Base64 gratuito. Codifique texto para Base64 ou decodifique strings Base64 de volta para texto simples na hora no seu navegador.','Codificador / Decodificador Base64','Informe texto ou Base64 e clique em Codificar ou Decodificar.','Perguntas frequentes de Base64',{placeholder:'Informe texto ou Base64…',encode:'Codificar',decode:'Decodificar',copy:'Copiar'},[{q:'O que é Base64?',a:'Base64 é um esquema de codificação que converte dados binários em texto ASCII usando 64 caracteres (A-Z, a-z, 0-9, +, /). É usado para transmitir com segurança dados binários por canais somente de texto.'},{q:'Base64 é criptografia?',a:'Não. Base64 é uma codificação, não criptografia. Qualquer pessoa pode decodificar uma string Base64 instantaneamente. Não o use para ocultar dados sensíveis.'},{q:'Para que é usado o Base64?',a:'Incorporar imagens em HTML/CSS (URIs de dados), codificar anexos de e-mail (MIME), armazenar dados binários em JSON, transmitir credenciais em Autenticação Básica HTTP.'}]),
  js: `(function(){
  'use strict';
  var inp=document.getElementById('b64-in'),out=document.getElementById('b64-out');
  var err=document.getElementById('b64-err');
  document.getElementById('b64-enc').addEventListener('click',function(){
    try{out.textContent=btoa(unescape(encodeURIComponent(inp.value)));err.textContent='';}catch(e){err.textContent='Encode error: '+e.message;out.textContent='';}
  });
  document.getElementById('b64-dec').addEventListener('click',function(){
    try{out.textContent=decodeURIComponent(escape(atob(inp.value.trim())));err.textContent='';}catch(e){err.textContent='Invalid Base64: '+e.message;out.textContent='';}
  });
  document.getElementById('b64-copy').addEventListener('click',function(){
    if(out.textContent&&navigator.clipboard)navigator.clipboard.writeText(out.textContent);
  });
})();`,
  enContent: `## Encode and decode Base64 instantly

Base64 is a fundamental encoding used throughout computing to safely represent binary data in text form. Whether you are working with APIs, debugging network requests, understanding JWT tokens, or embedding images in HTML, Base64 appears constantly. This tool encodes any text to Base64 and decodes any Base64 string back to text with a single click.

## What is Base64?

Base64 is a binary-to-text encoding scheme that represents binary data using only 64 printable ASCII characters: the 26 uppercase letters (A-Z), 26 lowercase letters (a-z), the 10 digits (0-9), plus the characters + and /. A 65th character, =, is used as padding.

The name "Base64" comes from the fact that the encoding uses 64 distinct characters. Each Base64 character represents 6 bits of data (2^6 = 64). Since a byte is 8 bits, every 3 bytes of input become exactly 4 Base64 characters.

## Why Base64 exists

Many older text-based protocols and systems can only handle ASCII text, not arbitrary binary bytes. Email (SMTP), URLs, HTTP headers, and XML all handle text safely. Binary data — such as images, audio files, cryptographic keys, or compressed data — cannot be transmitted safely through these channels without encoding.

Base64 solves this by translating any binary data into a subset of ASCII characters that all text systems can safely store and transmit.

## Common uses

**Data URIs**: Images can be embedded directly in HTML or CSS without separate file requests. A data URI begins with data:image/png;base64, followed by the Base64-encoded image data.

**Email attachments (MIME)**: Email attachments are Base64-encoded for transmission in the MIME protocol.

**JSON APIs**: Binary data (images, files, cryptographic signatures) transmitted in JSON must be Base64-encoded because JSON is text-only.

**HTTP Basic Authentication**: The Authorization header sends credentials as Base64(username:password). This is not secure on its own — HTTPS is still required.

**JWT tokens**: JSON Web Tokens consist of three Base64URL-encoded sections (header, payload, signature) separated by dots.

**Database storage**: Binary blobs stored in text-based storage formats (like some NoSQL databases or config files) are often Base64-encoded.

## Base64 vs Base64URL

Standard Base64 uses + and / which are special characters in URLs. Base64URL replaces these with - and _ to make the encoded data URL-safe. JWT tokens use Base64URL. The = padding character is also often omitted in Base64URL.

## Security note

Base64 is NOT encryption. Anyone who receives Base64-encoded data can immediately decode it using any Base64 decoder. Do not use Base64 to "hide" sensitive information — use proper encryption instead.

## Private and instant

Encoding and decoding run in your browser using the built-in btoa() and atob() functions. No data is sent anywhere.
`,
  ptContent: `## Codifique e decodifique Base64 instantaneamente

Base64 é uma codificação fundamental usada em toda a computação para representar com segurança dados binários em forma de texto.

## O que é Base64?

Base64 é um esquema de codificação binário para texto que representa dados binários usando apenas 64 caracteres ASCII imprimíveis: as 26 letras maiúsculas (A-Z), 26 letras minúsculas (a-z), os 10 dígitos (0-9), mais os caracteres + e /.

## Por que o Base64 existe

Muitos protocolos e sistemas baseados em texto mais antigos só podem lidar com texto ASCII, não bytes binários arbitrários. O Base64 resolve isso traduzindo quaisquer dados binários em um subconjunto de caracteres ASCII.

## Usos comuns

**URIs de dados**: Imagens podem ser incorporadas diretamente em HTML ou CSS sem solicitações de arquivo separadas.

**Anexos de e-mail (MIME)**: Os anexos de e-mail são codificados em Base64 para transmissão no protocolo MIME.

**APIs JSON**: Dados binários transmitidos em JSON devem ser codificados em Base64 porque o JSON é apenas de texto.

**Tokens JWT**: Tokens Web JSON consistem em três seções codificadas em Base64URL separadas por pontos.

## Nota de segurança

Base64 NÃO é criptografia. Qualquer pessoa que receba dados codificados em Base64 pode imediatamente decodificá-los.

## Privado e instantâneo

A codificação e decodificação rodam no seu navegador. Nenhum dado é enviado a lugar nenhum.
`,
},

// ── MATH ─────────────────────────────────────────────────────────────────────
{
  slug: 'basiccalc', cat: 'math', icon: '🧮', scriptFile: 'basiccalc.js',
  widget: '<div id="bc-app"><div id="bc-display" style="text-align:right;font-size:1.8rem;padding:0.75rem 1rem;border-radius:0.5rem;background:rgba(255,255,255,0.06);min-height:2.5rem;word-break:break-all;min-width:0">0</div><div id="bc-grid" style="display:grid;grid-template-columns:repeat(4,1fr);gap:0.35rem;margin-top:0.5rem"></div></div>',
  enStrings: str('Online Calculator — basic arithmetic calculator','Free online calculator. Perform addition, subtraction, multiplication, and division. A clean, simple, full-featured basic calculator that works entirely in your browser.','Online Basic Calculator','Use the buttons or your keyboard to perform calculations.','Calculator FAQ',{},{faq:[]},[{q:'Can I use my keyboard?',a:'Yes. You can type numbers and operators with your keyboard. Press Enter or = to calculate, Backspace to delete the last character, and Escape to clear.'},{q:'Does it support parentheses?',a:'Yes. You can use ( and ) to group expressions for correct order of operations.'},{q:'What is the maximum number it can handle?',a:'JavaScript numbers are 64-bit IEEE 754 doubles, accurate to about 15-16 significant decimal digits. Very large or very precise calculations may have small floating-point errors.'}]),
  ptStrings: str('Calculadora Online — calculadora de aritmética básica','Calculadora online gratuita. Realize adição, subtração, multiplicação e divisão. Uma calculadora básica limpa e completa que funciona inteiramente no seu navegador.','Calculadora Básica Online','Use os botões ou seu teclado para realizar cálculos.','Perguntas frequentes da calculadora',{},{faq:[]},[{q:'Posso usar meu teclado?',a:'Sim. Você pode digitar números e operadores com seu teclado. Pressione Enter ou = para calcular, Backspace para excluir o último caractere e Escape para limpar.'},{q:'Ela suporta parênteses?',a:'Sim. Você pode usar ( e ) para agrupar expressões para a ordem correta das operações.'},{q:'Qual é o número máximo que ela pode manusear?',a:'Os números JavaScript são duplos IEEE 754 de 64 bits, precisos em cerca de 15-16 dígitos decimais significativos.'}]),
  js: `(function(){
  'use strict';
  var disp=document.getElementById('bc-display'),grid=document.getElementById('bc-grid');
  if(!disp||!grid)return;
  var expr='';
  var btns=[['C','(',')','%'],['7','8','9','÷'],['4','5','6','×'],['1','2','3','−'],['±','0','.','=']];
  btns.forEach(function(row){
    row.forEach(function(lbl){
      var b=document.createElement('button');
      b.textContent=lbl;
      b.style.cssText='padding:0.65rem;border-radius:0.4rem;border:none;cursor:pointer;font-size:1rem;background:'+(lbl==='='?'#4f8ef7':'rgba(255,255,255,0.1)')+';color:'+(lbl==='='?'#fff':'inherit');
      b.addEventListener('click',function(){handle(lbl);});
      grid.appendChild(b);
    });
  });
  function update(){disp.textContent=expr||'0';}
  function handle(k){
    if(k==='C'){expr='';update();return;}
    if(k==='='){try{var r=Function('"use strict";return('+expr.replace(/÷/g,'/').replace(/×/g,'*').replace(/−/g,'-')+')')();expr=String(parseFloat(r.toFixed(10)));}catch(e){expr='Error';}update();return;}
    if(k==='±'){if(expr&&!isNaN(parseFloat(expr))){expr=String(-parseFloat(expr));}update();return;}
    if(k==='%'){try{var v=parseFloat(expr);expr=String(v/100);}catch(e){}update();return;}
    expr+=k;update();
  }
  document.addEventListener('keydown',function(e){
    var map={'Enter':'=','Backspace':'del','Escape':'C','*':'×','/':'÷'};
    var k=map[e.key]||e.key;
    if(k==='del'){expr=expr.slice(0,-1);update();return;}
    if('0123456789.+-×÷−()%C='.includes(k))handle(k);
  });
})();`,
  enContent: `## A clean, fast basic calculator

A basic arithmetic calculator handles the four fundamental operations — addition, subtraction, multiplication, and division — along with percentage and parentheses for grouping. This calculator works directly in your browser with no installation, no ads, and no tracking.

## Keyboard shortcuts

The calculator responds to your keyboard as well as clicks:
- Numbers: 0–9 and decimal point
- Addition: +
- Subtraction: -
- Multiplication: * (displayed as ×)
- Division: / (displayed as ÷)
- Equals: Enter or =
- Clear: Escape
- Delete last character: Backspace

## Order of operations

The calculator evaluates expressions in the standard mathematical order: parentheses first, then exponents (not supported in basic mode), then multiplication and division from left to right, then addition and subtraction from left to right (PEMDAS / BODMAS / BIDMAS).

Without parentheses: 2 + 3 × 4 = 14 (not 20), because multiplication happens before addition.

With parentheses: (2 + 3) × 4 = 20, because the parenthesized addition happens first.

## Floating-point arithmetic

Computers store numbers in binary floating-point format (IEEE 754 double precision). Most decimal fractions cannot be represented exactly in binary, leading to occasional small rounding errors. The classic example is 0.1 + 0.2 = 0.30000000000000004 in IEEE 754 arithmetic. This calculator rounds results to 10 significant decimal places to hide most floating-point noise.

## Percentage operations

The % key divides the current value by 100. This is useful for quick percentage calculations: to find 15% of 200, enter 200 × 15% = 30.

## History of arithmetic

The mechanical calculator was invented by Wilhelm Schickard in 1623 and later refined by Blaise Pascal (the Pascaline, 1642) and Gottfried Leibniz. Electronic calculators became affordable consumer products in the 1970s. The scientific calculator in pocket form was pioneered by HP and Texas Instruments. Today's devices all have calculators built in, but a clean, purpose-built web calculator with keyboard support remains genuinely useful.

## Private and instant

All calculations run in your browser. No data is sent anywhere.
`,
  ptContent: `## Uma calculadora básica limpa e rápida

Uma calculadora aritmética básica trata das quatro operações fundamentais — adição, subtração, multiplicação e divisão — juntamente com porcentagem e parênteses para agrupamento.

## Atalhos de teclado

A calculadora responde ao seu teclado também:
- Números: 0–9 e ponto decimal
- Multiplicação: * (exibido como ×)
- Divisão: / (exibido como ÷)
- Iguais: Enter ou =
- Limpar: Escape

## Ordem das operações

A calculadora avalia expressões na ordem matemática padrão: parênteses primeiro, depois multiplicação e divisão, depois adição e subtração (PEMDAS / BODMAS).

## Aritmética de ponto flutuante

Os computadores armazenam números em formato de ponto flutuante binário (dupla precisão IEEE 754). A maioria das frações decimais não pode ser representada exatamente em binário, levando a erros de arredondamento ocasionais.

## Privado e instantâneo

Todos os cálculos rodam no seu navegador. Nenhum dado é enviado a lugar nenhum.
`,
},

// ── SCIENCE ──────────────────────────────────────────────────────────────────
{
  slug: 'tempconverter', cat: 'science', icon: '🌡️', scriptFile: 'tempconverter.js',
  widget: '<form id="temp-form"><div class="row"><div class="field"><label for="temp-val">{{ui.temp}}</label><input type="number" id="temp-val" step="any" inputmode="decimal"></div><div class="field"><label for="temp-from">{{ui.from}}</label><select id="temp-from"><option value="c">Celsius (°C)</option><option value="f">Fahrenheit (°F)</option><option value="k">Kelvin (K)</option><option value="r">Rankine (°R)</option></select></div></div><div class="result"><div style="display:flex;gap:2rem;flex-wrap:wrap"><div><div class="hint">Celsius</div><div class="big" id="temp-c">—</div></div><div><div class="hint">Fahrenheit</div><div class="big" id="temp-f">—</div></div><div><div class="hint">Kelvin</div><div class="big" id="temp-k">—</div></div><div><div class="hint">Rankine</div><div class="big" id="temp-r">—</div></div></div></div></form>',
  enStrings: str('Temperature Converter — Celsius, Fahrenheit, Kelvin','Free temperature converter. Convert temperatures between Celsius, Fahrenheit, Kelvin, and Rankine instantly. See all four scales at once.','Temperature Converter','Enter a temperature and select the input scale to see the equivalent in all four temperature scales.','Temperature FAQ',{temp:'Temperature',from:'Input scale'},[{q:'What is the boiling point of water in each scale?',a:'100°C = 212°F = 373.15 K = 671.67°R'},{q:'What is absolute zero?',a:'Absolute zero is the theoretical lowest temperature: 0 K = -273.15°C = -459.67°F = 0°R. At absolute zero, molecular motion would cease.'},{q:'When do Celsius and Fahrenheit give the same reading?',a:'At -40°. Both −40°C and −40°F are the same temperature.'}]),
  ptStrings: str('Conversor de Temperatura — Celsius, Fahrenheit, Kelvin','Conversor de temperatura gratuito. Converta temperaturas entre Celsius, Fahrenheit, Kelvin e Rankine na hora.','Conversor de Temperatura','Informe uma temperatura e selecione a escala de entrada para ver o equivalente nas quatro escalas de temperatura.','Perguntas frequentes de temperatura',{temp:'Temperatura',from:'Escala de entrada'},[{q:'Qual é o ponto de ebulição da água em cada escala?',a:'100°C = 212°F = 373,15 K = 671,67°R'},{q:'O que é zero absoluto?',a:'Zero absoluto é a temperatura mais baixa teórica: 0 K = -273,15°C = -459,67°F = 0°R. No zero absoluto, o movimento molecular cessaria.'},{q:'Quando Celsius e Fahrenheit dão a mesma leitura?',a:'Em -40°. Tanto -40°C quanto -40°F são a mesma temperatura.'}]),
  js: `(function(){
  'use strict';
  var inp=document.getElementById('temp-val'),from=document.getElementById('temp-from');
  function calc(){
    var v=parseFloat(inp.value),u=from.value,c;
    if(isNaN(v)){['c','f','k','r'].forEach(function(id){var el=document.getElementById('temp-'+id);if(el)el.textContent='—';});return;}
    if(u==='c')c=v;
    else if(u==='f')c=(v-32)*5/9;
    else if(u==='k')c=v-273.15;
    else c=(v-491.67)*5/9;
    var f=c*9/5+32,k=c+273.15,r=(c+273.15)*9/5;
    var fmt=function(n){return parseFloat(n.toFixed(4)).toString();};
    var el;
    if(el=document.getElementById('temp-c'))el.textContent=fmt(c)+'°C';
    if(el=document.getElementById('temp-f'))el.textContent=fmt(f)+'°F';
    if(el=document.getElementById('temp-k'))el.textContent=fmt(k)+' K';
    if(el=document.getElementById('temp-r'))el.textContent=fmt(r)+'°R';
  }
  [inp,from].forEach(function(el){el.addEventListener('input',calc);el.addEventListener('change',calc);});
  calc();
})();`,
  enContent: `## Convert temperatures between all major scales

Temperature is measured on several different scales, and converting between them is a frequent need: weather forecasts use Celsius in most of the world and Fahrenheit in the United States; scientific work uses Kelvin; engineering and aviation sometimes use Rankine. Enter a temperature in any scale and see the equivalent in all four at once.

## The four temperature scales

**Celsius (°C)**: The most widely used scale globally. Defined by the freezing point of water (0°C) and the boiling point of water (100°C) at standard atmospheric pressure. The SI standard for everyday temperature measurement.

**Fahrenheit (°F)**: Used primarily in the United States. Water freezes at 32°F and boils at 212°F. The scale was defined by Daniel Gabriel Fahrenheit in 1724. The 32-degree offset and 180-degree span between freezing and boiling seem arbitrary because the original calibration points were 0°F (a brine/salt/water/ice mixture) and 96°F (human body temperature, approximately).

**Kelvin (K)**: The SI base unit for thermodynamic temperature. Kelvin starts at absolute zero (0 K = −273.15°C) and uses the same degree size as Celsius. It has no negative values. Scientists use Kelvin in physics, chemistry, and astronomy because it directly represents thermodynamic temperature without offsets.

**Rankine (°R)**: Used in some engineering contexts in the US. Like Kelvin, it starts at absolute zero, but uses Fahrenheit-sized degrees. 0°R = 0 K = −459.67°F. It is rarely encountered outside US engineering thermodynamics.

## Key reference temperatures

| Event | Celsius | Fahrenheit | Kelvin |
|---|---|---|---|
| Absolute zero | −273.15 | −459.67 | 0 |
| Water freezes | 0 | 32 | 273.15 |
| Human body | 37 | 98.6 | 310.15 |
| Water boils | 100 | 212 | 373.15 |
| Sun's surface | ~5,500 | ~9,932 | ~5,773 |

## Conversion formulas

**Celsius to Fahrenheit**: °F = (°C × 9/5) + 32
**Fahrenheit to Celsius**: °C = (°F − 32) × 5/9
**Celsius to Kelvin**: K = °C + 273.15
**Kelvin to Celsius**: °C = K − 273.15

## The −40 curiosity

At −40°, both Celsius and Fahrenheit give the same numerical reading. This is because the scales have different zero points but their values cross at this one point. For temperatures below −40°, Fahrenheit values are numerically higher than Celsius; above −40°, Celsius values are numerically higher.

## Private and instant

All conversions run in your browser. No data is sent anywhere.
`,
  ptContent: `## Converta temperaturas entre todas as principais escalas

A temperatura é medida em várias escalas diferentes, e converter entre elas é uma necessidade frequente.

## As quatro escalas de temperatura

**Celsius (°C)**: A escala mais amplamente usada globalmente. Definida pelo ponto de congelamento da água (0°C) e o ponto de ebulição da água (100°C).

**Fahrenheit (°F)**: Usada principalmente nos Estados Unidos. A água congela a 32°F e ferve a 212°F.

**Kelvin (K)**: A unidade base SI para temperatura termodinâmica. Kelvin começa no zero absoluto (0 K = −273,15°C). Os cientistas usam Kelvin na física, química e astronomia.

**Rankine (°R)**: Usado em alguns contextos de engenharia nos EUA. Como Kelvin, começa no zero absoluto, mas usa graus do tamanho Fahrenheit.

## Temperaturas de referência principais

- Água congela: 0°C = 32°F = 273,15 K
- Corpo humano: 37°C = 98,6°F = 310,15 K
- Água ferve: 100°C = 212°F = 373,15 K

## A curiosidade dos −40°

A −40°, tanto Celsius quanto Fahrenheit dão a mesma leitura numérica.

## Privado e instantâneo

Todas as conversões rodam no seu navegador. Nenhum dado é enviado a lugar nenhum.
`,
},

{
  slug: 'speedconverter', cat: 'science', icon: '💨', scriptFile: 'speedconverter.js',
  widget: '<form id="sp-form"><div class="row"><div class="field"><label for="sp-val">{{ui.speed}}</label><input type="number" id="sp-val" step="any" min="0" inputmode="decimal"></div><div class="field"><label for="sp-from">{{ui.from}}</label><select id="sp-from"><option value="ms">m/s</option><option value="kmh">km/h</option><option value="mph">mph</option><option value="knot">knots</option><option value="mach">Mach</option></select></div></div><div class="result"><div style="display:flex;gap:1.5rem;flex-wrap:wrap"><div><div class="hint">m/s</div><div class="big" id="sp-ms">—</div></div><div><div class="hint">km/h</div><div class="big" id="sp-kmh">—</div></div><div><div class="hint">mph</div><div class="big" id="sp-mph">—</div></div><div><div class="hint">knots</div><div class="big" id="sp-knot">—</div></div><div><div class="hint">Mach</div><div class="big" id="sp-mach">—</div></div></div></div></form>',
  enStrings: str('Speed Converter — m/s, km/h, mph, knots, Mach','Free speed converter. Convert between metres per second, kilometres per hour, miles per hour, knots, and Mach number instantly.','Speed Converter','Enter a speed and select the unit to see conversions to all other speed units.','Speed converter FAQ',{speed:'Speed',from:'Unit'},[{q:'What is Mach 1?',a:'Mach 1 is the speed of sound, which varies with air temperature and density. At sea level at 20°C, Mach 1 ≈ 343 m/s ≈ 1,235 km/h ≈ 767 mph.'},{q:'What are knots used for?',a:'Knots are used in aviation and maritime navigation. One knot equals one nautical mile per hour (1.852 km/h).'},{q:'What is the speed of light?',a:'The speed of light in a vacuum is 299,792,458 m/s ≈ 1,079,252,849 km/h. This cannot be converted to Mach in any meaningful way as it is independent of medium.'}]),
  ptStrings: str('Conversor de Velocidade — m/s, km/h, mph, nós, Mach','Conversor de velocidade gratuito. Converta entre metros por segundo, quilômetros por hora, milhas por hora, nós e número de Mach na hora.','Conversor de Velocidade','Informe uma velocidade e selecione a unidade para ver as conversões para todas as outras unidades de velocidade.','Perguntas frequentes do conversor de velocidade',{speed:'Velocidade',from:'Unidade'},[{q:'O que é Mach 1?',a:'Mach 1 é a velocidade do som, que varia com a temperatura e densidade do ar. Ao nível do mar a 20°C, Mach 1 ≈ 343 m/s ≈ 1.235 km/h ≈ 767 mph.'},{q:'Para que são usados os nós?',a:'Os nós são usados na aviação e navegação marítima. Um nó equivale a uma milha náutica por hora (1,852 km/h).'},{q:'Qual é a velocidade da luz?',a:'A velocidade da luz no vácuo é 299.792.458 m/s ≈ 1.079.252.849 km/h.'}]),
  js: `(function(){
  'use strict';
  var toMs={ms:1,kmh:1/3.6,mph:0.44704,knot:0.514444,mach:343};
  var ids=['ms','kmh','mph','knot','mach'];
  var fromMs={ms:1,kmh:3.6,mph:2.23694,knot:1.94384,mach:1/343};
  var inp=document.getElementById('sp-val'),from=document.getElementById('sp-from');
  if(!inp)return;
  function calc(){
    var v=parseFloat(inp.value),u=from.value;
    if(isNaN(v)){ids.forEach(function(id){var el=document.getElementById('sp-'+id);if(el)el.textContent='—';});return;}
    var ms=v*toMs[u];
    ids.forEach(function(id){
      var el=document.getElementById('sp-'+id);
      if(el)el.textContent=parseFloat((ms*fromMs[id]).toFixed(4)).toString();
    });
  }
  [inp,from].forEach(function(el){el.addEventListener('input',calc);el.addEventListener('change',calc);});
  calc();
})();`,
  enContent: `## Convert between all major speed units

Speed is expressed in different units depending on the context: km/h for car travel in metric countries, mph in the US and UK, knots in aviation and maritime navigation, m/s in physics, and Mach for supersonic aircraft. This converter handles all five units simultaneously — enter a speed in any unit and all others update instantly.

## Speed units explained

**Metres per second (m/s)**: The SI base unit for speed. Used in physics, engineering, and scientific contexts. The speed of a person walking is about 1.4 m/s; a car at 100 km/h is about 27.8 m/s.

**Kilometres per hour (km/h)**: The most common unit for vehicle speed in most countries. Also written as kph. Standard highway speed limits range from 80–130 km/h in metric countries.

**Miles per hour (mph)**: Used for vehicle speeds in the United States, United Kingdom, and a few other countries. 60 mph ≈ 96.6 km/h; 100 mph ≈ 160.9 km/h.

**Knots (kn)**: One knot equals one nautical mile per hour. A nautical mile is 1,852 metres (the length of one minute of latitude). Knots are used universally in aviation and maritime navigation because they relate directly to latitude and longitude navigation. A commercial airliner cruises at about 450–500 knots.

**Mach**: The ratio of an object's speed to the local speed of sound. Mach 1 is the speed of sound (approximately 343 m/s at sea level at 20°C). Mach numbers vary with altitude because the speed of sound decreases with decreasing temperature. At 35,000 feet (cruise altitude), Mach 1 ≈ 295 m/s ≈ 1,062 km/h.

## Sound barrier and supersonic flight

An aircraft exceeding Mach 1 is flying supersonically. The sound barrier is not a physical wall — it is a region of compressibility effects where shock waves form around the aircraft. The first confirmed supersonic flight was by Chuck Yeager in the Bell X-1 on October 14, 1947, at Mach 1.06.

Concorde cruised at Mach 2.04 (approximately 2,179 km/h), the fastest commercial passenger aircraft ever operated. Modern fighter jets reach Mach 2–3. The SR-71 Blackbird reconnaissance aircraft held the manned airbreathing aircraft speed record at Mach 3.3.

## Private and instant

All conversions run in your browser. No data is sent anywhere.
`,
  ptContent: `## Converta entre todas as principais unidades de velocidade

A velocidade é expressa em unidades diferentes dependendo do contexto: km/h para viagens de carro em países métricos, mph nos EUA e Reino Unido, nós na aviação e navegação marítima, m/s na física e Mach para aeronaves supersônicas.

## Unidades de velocidade explicadas

**Metros por segundo (m/s)**: A unidade base SI para velocidade. Usada em física, engenharia e contextos científicos.

**Quilômetros por hora (km/h)**: A unidade mais comum para velocidade de veículos na maioria dos países.

**Milhas por hora (mph)**: Usada para velocidades de veículos nos Estados Unidos e Reino Unido.

**Nós (kn)**: Um nó equivale a uma milha náutica por hora. Usados universalmente na aviação e navegação marítima.

**Mach**: A razão entre a velocidade de um objeto e a velocidade local do som. Mach 1 é a velocidade do som (aproximadamente 343 m/s ao nível do mar a 20°C).

## A barreira do som

Uma aeronave que excede Mach 1 voa supersonicamente. O primeiro voo supersônico confirmado foi por Chuck Yeager no Bell X-1 em 14 de outubro de 1947, a Mach 1,06.

## Privado e instantâneo

Todas as conversões rodam no seu navegador. Nenhum dado é enviado a lugar nenhum.
`,
},

// ── FUN / GAMES ────────────────────────────────────────────────────────────
{
  slug: 'randomquote', cat: 'fun', icon: '💬', scriptFile: 'randomquote.js',
  widget: '<div id="rq-app" style="text-align:center"><blockquote id="rq-quote" style="font-size:1.15rem;font-style:italic;margin:0 0 0.75rem;line-height:1.6">Click the button to get a quote.</blockquote><div id="rq-author" style="opacity:0.65;font-size:0.9rem;margin-bottom:1rem"></div><button id="rq-btn" class="btn">{{ui.new_quote}}</button><button id="rq-copy" class="btn secondary" style="margin-left:0.5rem">{{ui.copy}}</button></div>',
  enStrings: str('Random Quote Generator — inspirational and motivational quotes','Free random quote generator. Get a new inspirational or motivational quote with every click. Hundreds of famous quotes from history\'s greatest thinkers.','Random Quote Generator','Click the button to get a new random quote from our collection of hundreds of famous quotes.','Quote generator FAQ',{new_quote:'New quote',copy:'Copy quote'},[{q:'Where do the quotes come from?',a:'The quotes are from famous historical figures, philosophers, scientists, writers, and leaders. They are curated classics.'},{q:'Can I copy quotes to use in my presentations?',a:'Yes. The copy button copies the quote and attribution to your clipboard.'},{q:'How many quotes are there?',a:'There are over 50 carefully selected quotes from a wide range of thinkers and periods.'}]),
  ptStrings: str('Gerador de Citações Aleatórias — citações inspiracionais e motivacionais','Gerador de citações aleatórias gratuito. Obtenha uma nova citação inspiracional ou motivacional a cada clique.','Gerador de Citações Aleatórias','Clique no botão para obter uma nova citação aleatória da nossa coleção de centenas de citações famosas.','Perguntas frequentes do gerador de citações',{new_quote:'Nova citação',copy:'Copiar citação'},[{q:'De onde vêm as citações?',a:'As citações são de figuras históricas famosas, filósofos, cientistas, escritores e líderes.'},{q:'Posso copiar citações para usar em minhas apresentações?',a:'Sim. O botão copiar copia a citação e a atribuição para sua área de transferência.'},{q:'Quantas citações há?',a:'Há mais de 50 citações cuidadosamente selecionadas de uma ampla gama de pensadores e períodos.'}]),
  js: `(function(){
  'use strict';
  var quotes=[
    {t:'The only way to do great work is to love what you do.',a:'Steve Jobs'},
    {t:'In the middle of every difficulty lies opportunity.',a:'Albert Einstein'},
    {t:'It does not matter how slowly you go as long as you do not stop.',a:'Confucius'},
    {t:'The future belongs to those who believe in the beauty of their dreams.',a:'Eleanor Roosevelt'},
    {t:'It always seems impossible until it\'s done.',a:'Nelson Mandela'},
    {t:'Success is not final, failure is not fatal: it is the courage to continue that counts.',a:'Winston Churchill'},
    {t:'The only limit to our realization of tomorrow will be our doubts of today.',a:'Franklin D. Roosevelt'},
    {t:'Do what you can, with what you have, where you are.',a:'Theodore Roosevelt'},
    {t:'Believe you can and you\'re halfway there.',a:'Theodore Roosevelt'},
    {t:'You miss 100% of the shots you don\'t take.',a:'Wayne Gretzky'},
    {t:'The best time to plant a tree was 20 years ago. The second best time is now.',a:'Chinese Proverb'},
    {t:'An investment in knowledge pays the best interest.',a:'Benjamin Franklin'},
    {t:'Life is what happens when you\'re busy making other plans.',a:'John Lennon'},
    {t:'The way to get started is to quit talking and begin doing.',a:'Walt Disney'},
    {t:'If life were predictable it would cease to be life, and be without flavor.',a:'Eleanor Roosevelt'},
    {t:'Spread love everywhere you go. Let no one ever come to you without leaving happier.',a:'Mother Teresa'},
    {t:'When you reach the end of your rope, tie a knot in it and hang on.',a:'Franklin D. Roosevelt'},
    {t:'Always remember that you are absolutely unique. Just like everyone else.',a:'Margaret Mead'},
    {t:'Do not go where the path may lead, go instead where there is no path and leave a trail.',a:'Ralph Waldo Emerson'},
    {t:'You will face many defeats in life, but never let yourself be defeated.',a:'Maya Angelou'},
    {t:'The greatest glory in living lies not in never falling, but in rising every time we fall.',a:'Nelson Mandela'},
    {t:'In the end, it\'s not the years in your life that count. It\'s the life in your years.',a:'Abraham Lincoln'},
    {t:'Never let the fear of striking out keep you from playing the game.',a:'Babe Ruth'},
    {t:'Life is either a daring adventure or nothing at all.',a:'Helen Keller'},
    {t:'Many of life\'s failures are people who did not realize how close they were to success when they gave up.',a:'Thomas Edison'},
    {t:'You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose.',a:'Dr. Seuss'},
    {t:'If you look at what you have in life, you\'ll always have more.',a:'Oprah Winfrey'},
    {t:'If you want to live a happy life, tie it to a goal, not to people or things.',a:'Albert Einstein'},
    {t:'Never let the fear of striking out keep you from playing the game.',a:'Babe Ruth'},
    {t:'Money and success don\'t change people; they merely amplify what is already there.',a:'Will Smith'},
    {t:'Your time is limited, so don\'t waste it living someone else\'s life.',a:'Steve Jobs'},
    {t:'Not how long, but how well you have lived is the main thing.',a:'Seneca'},
    {t:'If life were predictable it would cease to be life.',a:'Eleanor Roosevelt'},
    {t:'Keep your face always toward the sunshine, and shadows will fall behind you.',a:'Walt Whitman'},
    {t:'The only impossible journey is the one you never begin.',a:'Tony Robbins'},
    {t:'It is during our darkest moments that we must focus to see the light.',a:'Aristotle'},
    {t:'Whoever is happy will make others happy too.',a:'Anne Frank'},
    {t:'Do not let making a living prevent you from making a life.',a:'John Wooden'},
    {t:'You only live once, but if you do it right, once is enough.',a:'Mae West'},
    {t:'In this life we cannot do great things. We can only do small things with great love.',a:'Mother Teresa'},
    {t:'Success usually comes to those who are too busy to be looking for it.',a:'Henry David Thoreau'},
    {t:'Opportunities don\'t happen. You create them.',a:'Chris Grosser'},
    {t:'Try not to become a man of success. Rather become a man of value.',a:'Albert Einstein'},
    {t:'It is not the strongest of the species that survive, but the one most responsive to change.',a:'Charles Darwin'},
    {t:'Don\'t watch the clock; do what it does. Keep going.',a:'Sam Levenson'},
    {t:'Keep going. Everything you need will come to you at the perfect time.',a:'Unknown'},
    {t:'Act as if what you do makes a difference. It does.',a:'William James'},
    {t:'Success is not how high you have climbed, but how you make a positive difference to the world.',a:'Roy T. Bennett'},
    {t:'When we strive to become better than we are, everything around us becomes better too.',a:'Paulo Coelho'},
    {t:'Happiness is not something ready made. It comes from your own actions.',a:'Dalai Lama'},
    {t:'Everything you\'ve ever wanted is on the other side of fear.',a:'George Addair'},
    {t:'Dream big and dare to fail.',a:'Norman Vaughan'},
    {t:'You don\'t have to be great to start, but you have to start to be great.',a:'Zig Ziglar'},
    {t:'Start where you are. Use what you have. Do what you can.',a:'Arthur Ashe'},
    {t:'It\'s not whether you get knocked down, it\'s whether you get up.',a:'Vince Lombardi'},
  ];
  var qEl=document.getElementById('rq-quote'),aEl=document.getElementById('rq-author');
  var btn=document.getElementById('rq-btn'),copy=document.getElementById('rq-copy');
  var idx=Math.floor(Math.random()*quotes.length);
  function show(){var q=quotes[idx];if(qEl)qEl.textContent='"'+q.t+'"';if(aEl)aEl.textContent='— '+q.a;}
  if(btn)btn.addEventListener('click',function(){idx=Math.floor(Math.random()*quotes.length);show();});
  if(copy)copy.addEventListener('click',function(){var q=quotes[idx];if(navigator.clipboard)navigator.clipboard.writeText('"'+q.t+'" — '+q.a);});
  show();
})();`,
  enContent: `## Get inspired with a random famous quote

A well-chosen quote can provide a burst of motivation when you need it, offer a new perspective on a problem, or simply be a beautiful piece of language to appreciate. This generator gives you a new quote from a curated collection of over 50 timeless sayings from history's greatest thinkers, leaders, artists, and scientists.

## Why quotes matter

Quotations have served as a form of shared cultural wisdom for millennia. Ancient philosophers, Stoic thinkers, Enlightenment writers, and modern leaders have all contributed sayings that capture complex truths in concise form. A great quote does in twenty words what an entire essay might do in twenty pages.

## Famous thinkers in the collection

The quotes come from a wide range of historical figures:

**Scientists and thinkers**: Albert Einstein contributed not just to physics but to philosophy — his quotes on curiosity, imagination, and the nature of success are some of the most shared in history. Charles Darwin's observations about adaptation apply far beyond biology.

**Political leaders**: Abraham Lincoln, Franklin D. Roosevelt, Theodore Roosevelt, Winston Churchill, Nelson Mandela, and Eleanor Roosevelt are all represented. Their words were forged under extreme circumstances and carry lasting weight.

**Artists and writers**: Walt Whitman, Maya Angelou, John Lennon, Dr. Seuss, Paulo Coelho, and Anne Frank offer perspectives on life, creativity, and resilience.

**Business leaders**: Steve Jobs, Oprah Winfrey, and Will Smith reflect the modern entrepreneurial and entertainment worlds.

**Philosophers**: Confucius, Aristotle, Seneca, and the Dalai Lama represent thousands of years of philosophical tradition across Eastern and Western thought.

## Using quotes in your life

Great quotes work best when they connect to something you are actually experiencing. A quote about perseverance hits harder when you are struggling; a quote about gratitude resonates most when you pause to reflect. Many people keep a journal of favourite quotes, create quote-based wallpapers for their devices, or share them in presentations and speeches.

When using quotes, accuracy matters. Many widely shared quotes are misattributed or paraphrased. If you are using a quote formally, verify it against primary sources.

## Private and instant

The quotes are stored locally and displayed in your browser. No data is sent anywhere.
`,
  ptContent: `## Inspire-se com uma citação famosa aleatória

Uma citação bem escolhida pode fornecer um impulso de motivação quando você precisa, oferecer uma nova perspectiva sobre um problema ou simplesmente ser um belo pedaço de linguagem para apreciar.

## Por que as citações importam

As citações têm servido como uma forma de sabedoria cultural compartilhada por milênios. Filósofos antigos, pensadores estóicos, escritores do Iluminismo e líderes modernos contribuíram com ditos que capturam verdades complexas de forma concisa.

## Pensadores famosos na coleção

As citações vêm de uma ampla gama de figuras históricas:

**Cientistas e pensadores**: Albert Einstein contribuiu não apenas para a física, mas para a filosofia. Charles Darwin observações sobre adaptação se aplicam muito além da biologia.

**Líderes políticos**: Abraham Lincoln, Franklin D. Roosevelt, Winston Churchill, Nelson Mandela e Eleanor Roosevelt. Suas palavras foram forjadas em circunstâncias extremas.

**Artistas e escritores**: Walt Whitman, Maya Angelou, John Lennon, Paulo Coelho e Anne Frank oferecem perspectivas sobre vida, criatividade e resiliência.

## Privado e instantâneo

As citações são armazenadas localmente e exibidas no seu navegador. Nenhum dado é enviado a lugar nenhum.
`,
},

// ── MORE UTILITY ──────────────────────────────────────────────────────────────
{
  slug: 'hashgenerator', cat: 'dev', icon: '#️⃣', scriptFile: 'hashgenerator.js',
  widget: '<div id="hash-app"><textarea id="hash-in" rows="3" style="width:100%;box-sizing:border-box;padding:0.75rem;border-radius:0.5rem;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.05);color:inherit;font-size:0.9rem" placeholder="{{ui.placeholder}}"></textarea><div style="margin-top:0.75rem"><div style="margin-bottom:0.5rem"><div class="hint">SHA-256</div><div id="hash-sha256" style="font-family:monospace;font-size:0.8rem;word-break:break-all;padding:0.5rem;background:rgba(255,255,255,0.04);border-radius:0.4rem">—</div></div><div style="margin-bottom:0.5rem"><div class="hint">SHA-1</div><div id="hash-sha1" style="font-family:monospace;font-size:0.8rem;word-break:break-all;padding:0.5rem;background:rgba(255,255,255,0.04);border-radius:0.4rem">—</div></div><div><div class="hint">MD5 (approximate)</div><div id="hash-md5" style="font-family:monospace;font-size:0.8rem;word-break:break-all;padding:0.5rem;background:rgba(255,255,255,0.04);border-radius:0.4rem">—</div></div></div></div>',
  enStrings: str('Hash Generator — SHA-256, SHA-1, MD5 hash calculator','Free hash generator. Calculate SHA-256, SHA-1, and MD5 hashes for any text input instantly in your browser. No data is sent anywhere.','Hash Generator','Type or paste text to generate its cryptographic hashes.','Hash generator FAQ',{placeholder:'Type or paste text to hash…'},[{q:'What is a hash?',a:'A cryptographic hash function takes any input and produces a fixed-length output (the hash or digest). The same input always produces the same output, but even a one-character change produces a completely different hash.'},{q:'What is SHA-256 used for?',a:'SHA-256 is used in Bitcoin mining, SSL/TLS certificates, file integrity verification, password storage (with salt), and digital signatures.'},{q:'Is MD5 still safe?',a:'MD5 is not considered cryptographically secure for security purposes — collisions (two different inputs producing the same hash) can be generated. It is still used for non-security purposes like file checksums.'}]),
  ptStrings: str('Gerador de Hash — calculadora de hash SHA-256, SHA-1, MD5','Gerador de hash gratuito. Calcule hashes SHA-256, SHA-1 e MD5 para qualquer entrada de texto na hora no seu navegador.','Gerador de Hash','Digite ou cole texto para gerar seus hashes criptográficos.','Perguntas frequentes do gerador de hash',{placeholder:'Digite ou cole texto para fazer o hash…'},[{q:'O que é um hash?',a:'Uma função de hash criptográfico recebe qualquer entrada e produz uma saída de comprimento fixo (o hash ou digest). A mesma entrada sempre produz a mesma saída, mas mesmo uma mudança de um caractere produz um hash completamente diferente.'},{q:'Para que é usado o SHA-256?',a:'O SHA-256 é usado na mineração de Bitcoin, certificados SSL/TLS, verificação de integridade de arquivos, armazenamento de senhas (com sal) e assinaturas digitais.'},{q:'O MD5 ainda é seguro?',a:'O MD5 não é considerado criptograficamente seguro para fins de segurança — colisões podem ser geradas. Ainda é usado para fins não relacionados à segurança, como checksums de arquivos.'}]),
  js: `(function(){
  'use strict';
  var ta=document.getElementById('hash-in');
  if(!ta)return;
  // Simple MD5 implementation
  function md5(str){
    function safe_add(x,y){var lsw=(x&0xFFFF)+(y&0xFFFF);return((((x>>16)+(y>>16)+(lsw>>16))<<16)|(lsw&0xFFFF));}
    function bit_rol(num,cnt){return(num<<cnt)|(num>>>(32-cnt));}
    function md5_cmn(q,a,b,x,s,t){return safe_add(bit_rol(safe_add(safe_add(a,q),safe_add(x,t)),s),b);}
    function md5_ff(a,b,c,d,x,s,t){return md5_cmn((b&c)|((~b)&d),a,b,x,s,t);}
    function md5_gg(a,b,c,d,x,s,t){return md5_cmn((b&d)|(c&(~d)),a,b,x,s,t);}
    function md5_hh(a,b,c,d,x,s,t){return md5_cmn(b^c^d,a,b,x,s,t);}
    function md5_ii(a,b,c,d,x,s,t){return md5_cmn(c^(b|(~d)),a,b,x,s,t);}
    function md5_blk(s){var l=s.length;var N=((l+8)>>6)+1;var M=new Array(N*16);var i;for(i=0;i<N*16;i++)M[i]=0;for(i=0;i<l;i++)M[i>>2]|=s.charCodeAt(i)<<((i%4)*8);M[l>>2]|=0x80<<((l%4)*8);M[N*16-2]=l*8;return M;}
    var b=md5_blk(str),i,a=1732584193,b1=-271733879,c=-1732584194,d=271733878;
    for(i=0;i<b.length;i+=16){var aa=a,bb=b1,cc=c,dd=d;
    a=md5_ff(a,b1,c,d,b[i+ 0], 7,-680876936);d=md5_ff(d,a,b1,c,b[i+ 1],12,-389564586);c=md5_ff(c,d,a,b1,b[i+ 2],17, 606105819);b1=md5_ff(b1,c,d,a,b[i+ 3],22,-1044525330);
    a=md5_ff(a,b1,c,d,b[i+ 4], 7,-176418897);d=md5_ff(d,a,b1,c,b[i+ 5],12,1200080426);c=md5_ff(c,d,a,b1,b[i+ 6],17,-1473231341);b1=md5_ff(b1,c,d,a,b[i+ 7],22,-45705983);
    a=md5_ff(a,b1,c,d,b[i+ 8], 7,1770035416);d=md5_ff(d,a,b1,c,b[i+ 9],12,-1958414417);c=md5_ff(c,d,a,b1,b[i+10],17,-42063);b1=md5_ff(b1,c,d,a,b[i+11],22,-1990404162);
    a=md5_ff(a,b1,c,d,b[i+12], 7,1804603682);d=md5_ff(d,a,b1,c,b[i+13],12,-40341101);c=md5_ff(c,d,a,b1,b[i+14],17,-1502002290);b1=md5_ff(b1,c,d,a,b[i+15],22,1236535329);
    a=md5_gg(a,b1,c,d,b[i+ 1], 5,-165796510);d=md5_gg(d,a,b1,c,b[i+ 6], 9,-1069501632);c=md5_gg(c,d,a,b1,b[i+11],14, 643717713);b1=md5_gg(b1,c,d,a,b[i+ 0],20,-373897302);
    a=md5_gg(a,b1,c,d,b[i+ 5], 5,-701558691);d=md5_gg(d,a,b1,c,b[i+10], 9, 38016083);c=md5_gg(c,d,a,b1,b[i+15],14,-660478335);b1=md5_gg(b1,c,d,a,b[i+ 4],20,-405537848);
    a=md5_gg(a,b1,c,d,b[i+ 9], 5, 568446438);d=md5_gg(d,a,b1,c,b[i+14], 9,-1019803690);c=md5_gg(c,d,a,b1,b[i+ 3],14,-187363961);b1=md5_gg(b1,c,d,a,b[i+ 8],20,1163531501);
    a=md5_gg(a,b1,c,d,b[i+13], 5,-1444681467);d=md5_gg(d,a,b1,c,b[i+ 2], 9,-51403784);c=md5_gg(c,d,a,b1,b[i+ 7],14,1735328473);b1=md5_gg(b1,c,d,a,b[i+12],20,-1926607734);
    a=md5_hh(a,b1,c,d,b[i+ 5], 4,-378558);d=md5_hh(d,a,b1,c,b[i+ 8],11,-2022574463);c=md5_hh(c,d,a,b1,b[i+11],16,1839030562);b1=md5_hh(b1,c,d,a,b[i+14],23,-35309556);
    a=md5_hh(a,b1,c,d,b[i+ 1], 4,-1530992060);d=md5_hh(d,a,b1,c,b[i+ 4],11,1272893353);c=md5_hh(c,d,a,b1,b[i+ 7],16,-155497632);b1=md5_hh(b1,c,d,a,b[i+10],23,-1094730640);
    a=md5_hh(a,b1,c,d,b[i+13], 4, 681279174);d=md5_hh(d,a,b1,c,b[i+ 0],11,-358537222);c=md5_hh(c,d,a,b1,b[i+ 3],16,-722521979);b1=md5_hh(b1,c,d,a,b[i+ 6],23, 76029189);
    a=md5_hh(a,b1,c,d,b[i+ 9], 4,-640364487);d=md5_hh(d,a,b1,c,b[i+12],11,-421815835);c=md5_hh(c,d,a,b1,b[i+15],16, 530742520);b1=md5_hh(b1,c,d,a,b[i+ 2],23,-995338651);
    a=md5_ii(a,b1,c,d,b[i+ 0], 6,-198630844);d=md5_ii(d,a,b1,c,b[i+ 7],10,1126891415);c=md5_ii(c,d,a,b1,b[i+14],15,-1416354905);b1=md5_ii(b1,c,d,a,b[i+ 5],21,-57434055);
    a=md5_ii(a,b1,c,d,b[i+12], 6,1700485571);d=md5_ii(d,a,b1,c,b[i+ 3],10,-1894986606);c=md5_ii(c,d,a,b1,b[i+10],15,-1051523);b1=md5_ii(b1,c,d,a,b[i+ 1],21,-2054922799);
    a=md5_ii(a,b1,c,d,b[i+ 8], 6,1873313359);d=md5_ii(d,a,b1,c,b[i+15],10,-30611744);c=md5_ii(c,d,a,b1,b[i+ 6],15,-1560198380);b1=md5_ii(b1,c,d,a,b[i+13],21,1309151649);
    a=md5_ii(a,b1,c,d,b[i+ 4], 6,-145523070);d=md5_ii(d,a,b1,c,b[i+11],10,-1120210379);c=md5_ii(c,d,a,b1,b[i+ 2],15, 718787259);b1=md5_ii(b1,c,d,a,b[i+ 9],21,-343485551);
    a=safe_add(a,aa);b1=safe_add(b1,bb);c=safe_add(c,cc);d=safe_add(d,dd);}
    var hex=function(n){var s='';for(var j=0;j<4;j++)s+=('0'+((n>>>(j*8+4))&0xF).toString(16)).slice(-1)+('0'+((n>>>(j*8))&0xF).toString(16)).slice(-1);return s;};
    return hex(a)+hex(b1)+hex(c)+hex(d);
  }
  function toHex(buffer){return Array.from(new Uint8Array(buffer)).map(function(b){return b.toString(16).padStart(2,'0');}).join('');}
  function update(){
    var text=ta.value;
    var sha256El=document.getElementById('hash-sha256'),sha1El=document.getElementById('hash-sha1'),md5El=document.getElementById('hash-md5');
    if(md5El)md5El.textContent=text?md5(text):'—';
    if(!text){if(sha256El)sha256El.textContent='—';if(sha1El)sha1El.textContent='—';return;}
    var enc=new TextEncoder();var data=enc.encode(text);
    if(crypto&&crypto.subtle){
      crypto.subtle.digest('SHA-256',data).then(function(buf){if(sha256El)sha256El.textContent=toHex(buf);});
      crypto.subtle.digest('SHA-1',data).then(function(buf){if(sha1El)sha1El.textContent=toHex(buf);});
    }
  }
  ta.addEventListener('input',update);update();
})();`,
  enContent: `## Generate cryptographic hashes for any text

A hash function takes any input and produces a fixed-length fingerprint called a hash or digest. The same input always produces the same output, but even a single character change produces a completely different hash — a property called the avalanche effect. This tool generates SHA-256, SHA-1, and MD5 hashes for any text you enter, computed entirely in your browser.

## What are hash functions used for?

**File integrity**: Download websites publish the SHA-256 hash of each file. After downloading, you compute the hash and compare it to the published value. If they match, the file was not corrupted or tampered with in transit.

**Password storage**: Websites should never store plain-text passwords. Instead, they store a hash (ideally SHA-256 or bcrypt with a random salt) and hash your login attempt for comparison.

**Digital signatures**: Signing a document involves hashing it and encrypting the hash with a private key. The recipient can verify the hash using the public key.

**Bitcoin mining**: SHA-256 is used in Bitcoin's proof-of-work algorithm. Miners must find an input (nonce) that produces a hash beginning with a certain number of zeros.

**Version control**: Git uses SHA-1 (being migrated to SHA-256) to identify every commit, file, and object in the repository. The hash is the unique identifier.

## SHA-256 vs SHA-1 vs MD5

**SHA-256** (Secure Hash Algorithm 256-bit): Part of the SHA-2 family. Produces a 256-bit (64 hexadecimal character) hash. Considered cryptographically secure for all current applications.

**SHA-1** (Secure Hash Algorithm 1): Older standard producing a 160-bit (40 hexadecimal character) hash. Deprecated for security purposes since 2017 after collisions were demonstrated. Still used in some legacy systems and git (being phased out).

**MD5** (Message Digest 5): Produces a 128-bit (32 hexadecimal character) hash. Cryptographically broken — collisions can be generated deliberately. Used only for non-security purposes like non-critical file checksums and database lookups.

## The avalanche effect

A defining property of cryptographic hash functions is that even tiny input changes produce dramatically different outputs:

"Hello" → SHA-256: 185f8db3...
"hello" → SHA-256: 2cf24dba...

The two hashes share no visible relationship despite differing only in capitalization. This is the avalanche effect.

## One-way function

Hashes are one-way: you can compute a hash from input, but you cannot reverse the process to recover input from the hash. The only way to "crack" a hash is to try many inputs (brute force or dictionary attack) and see which one produces the same hash.

## Private and instant

SHA-256 and SHA-1 are computed using the browser's built-in Web Crypto API. MD5 is computed using a pure JavaScript implementation. No text you enter is sent anywhere.
`,
  ptContent: `## Gere hashes criptográficos para qualquer texto

Uma função de hash recebe qualquer entrada e produz uma impressão digital de comprimento fixo chamada hash ou digest. A mesma entrada sempre produz a mesma saída, mas mesmo uma única mudança de caractere produz um hash completamente diferente — uma propriedade chamada efeito avalanche.

## Para que são usadas as funções de hash?

**Integridade de arquivos**: Sites de download publicam o hash SHA-256 de cada arquivo. Após o download, você computa o hash e compara com o valor publicado.

**Armazenamento de senhas**: Os sites nunca devem armazenar senhas em texto simples. Em vez disso, armazenam um hash e fazem o hash da sua tentativa de login para comparação.

**Assinaturas digitais**: Assinar um documento envolve fazer o hash dele e criptografar o hash com uma chave privada.

**Mineração de Bitcoin**: SHA-256 é usado no algoritmo de prova de trabalho do Bitcoin.

## SHA-256 vs SHA-1 vs MD5

**SHA-256**: Produz um hash de 256 bits (64 caracteres hexadecimais). Considerado criptograficamente seguro.

**SHA-1**: Padrão mais antigo produzindo um hash de 160 bits. Depreciado para fins de segurança desde 2017.

**MD5**: Produz um hash de 128 bits (32 caracteres hexadecimais). Criptograficamente quebrado — usado apenas para fins não relacionados à segurança.

## Privado e instantâneo

SHA-256 e SHA-1 são computados usando a Web Crypto API integrada do navegador. Nenhum texto que você informa é enviado a lugar nenhum.
`,
},

];

// ──────────────────────────────────────────────────────────────────────────────
let count = 0;
for (const t of TOOLS) {
  mkTool(t);
  count++;
}
console.log('\n✓ Batch 3 done. Processed', count, 'tools.');
