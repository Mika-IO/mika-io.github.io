#!/usr/bin/env node
// gen-batch6.mjs — tools 111-140 (finance, health, converter, productivity)
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

// ─── 111 ── Investment Return Calculator ──────────────────────────────────────
tool('investreturn', 'finance', '📈',
  `<form id="ir-form"><div class="row"><div class="field"><label for="ir-init">{{ui.initial}}</label><input type="number" id="ir-init" step="any" min="0" placeholder="10000" inputmode="decimal"></div><div class="field"><label for="ir-monthly">{{ui.monthly}}</label><input type="number" id="ir-monthly" step="any" min="0" placeholder="200" inputmode="decimal"></div></div><div class="row"><div class="field"><label for="ir-rate">{{ui.rate}}</label><input type="number" id="ir-rate" step="any" min="0" placeholder="7" inputmode="decimal"></div><div class="field"><label for="ir-years">{{ui.years}}</label><input type="number" id="ir-years" step="1" min="1" max="50" placeholder="20" inputmode="numeric"></div></div><div class="row" style="justify-content:center"><button class="btn" type="submit">{{ui.calculate}}</button></div></form><div id="ir-out" hidden class="result" style="text-align:left;display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:0.5rem;margin-top:0.75rem"></div>`,
  { title:'Investment Return Calculator — compound growth with monthly contributions', metaDescription:'Free investment return calculator. Enter an initial amount, monthly contributions, annual return rate and years to see final value and total gain.', h1:'Investment Return Calculator', intro:'Enter your initial investment, monthly contributions, annual return rate and investment period to see your projected final value.', faq_title:'Investment return FAQ', ui:{ initial:'Initial amount ($)', monthly:'Monthly contribution ($)', rate:'Annual return (%)', years:'Years', calculate:'Calculate' }, faq:[
    { q:'What formula is used?', a:'The calculator uses the compound interest formula for an initial lump sum plus the future value of a series of equal periodic payments (annuity). Total = P(1+r)^n + PMT × ((1+r)^n − 1) / r, where r is the monthly rate and n is the number of months.' },
    { q:'What is a realistic return rate?', a:'The US S&P 500 has returned about 10% annually before inflation (≈7% after inflation) over the long term. Individual results vary greatly depending on asset allocation, time period and fees.' },
    { q:'Does this account for inflation?', a:'No. Enter a real (inflation-adjusted) rate if you want inflation-adjusted results. For example, use 7% instead of 10% to approximate real US stock market returns.' }
  ]},
  { title:'Calculadora de Retorno de Investimento — crescimento composto com aportes mensais', metaDescription:'Calculadora de retorno de investimento gratuita. Insira o valor inicial, aportes mensais, taxa de retorno anual e anos para ver o valor final e o ganho total.', h1:'Calculadora de Retorno de Investimento', intro:'Insira seu investimento inicial, aportes mensais, taxa de retorno anual e período de investimento para ver o valor final projetado.', faq_title:'Perguntas frequentes sobre retorno de investimento', ui:{ initial:'Valor inicial (R$)', monthly:'Aporte mensal (R$)', rate:'Retorno anual (%)', years:'Anos', calculate:'Calcular' }, faq:[
    { q:'Qual fórmula é usada?', a:'A calculadora usa a fórmula de juros compostos para uma quantia inicial mais o valor futuro de uma série de pagamentos periódicos iguais (anuidade).' },
    { q:'Qual é uma taxa de retorno realista?', a:'O índice Ibovespa historicamente rendeu entre 8–15% ao ano em termos nominais. Em termos reais (descontando inflação), é menor.' },
    { q:'Isso leva em conta a inflação?', a:'Não. Insira uma taxa real (ajustada pela inflação) se quiser resultados ajustados pela inflação.' }
  ]},
  `(function(){
  document.getElementById('ir-form').addEventListener('submit',function(e){
    e.preventDefault();
    const P=parseFloat(document.getElementById('ir-init').value)||0;
    const pmt=parseFloat(document.getElementById('ir-monthly').value)||0;
    const annualRate=parseFloat(document.getElementById('ir-rate').value)||0;
    const years=parseInt(document.getElementById('ir-years').value)||1;
    const r=annualRate/100/12;
    const n=years*12;
    const fv=r===0?P+pmt*n:(P*Math.pow(1+r,n)+pmt*(Math.pow(1+r,n)-1)/r);
    const totalContrib=P+pmt*n;
    const gain=fv-totalContrib;
    const fmt=v=>'$'+v.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
    const items=[['Final value',fmt(fv)],['Total contributed',fmt(totalContrib)],['Total gain',fmt(gain)],['Return on investment',((gain/totalContrib)*100).toFixed(1)+'%']];
    const out=document.getElementById('ir-out');
    out.hidden=false;
    out.innerHTML=items.map(([k,v])=>\`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">\${k}</div><strong>\${v}</strong></div>\`).join('');
  });
})();`
);

// ─── 112 ── VAT Calculator ────────────────────────────────────────────────────
tool('vatcalc', 'finance', '🧾',
  `<form id="vat-form"><div class="row"><div class="field"><label for="vat-amount">{{ui.amount}}</label><input type="number" id="vat-amount" step="any" min="0" placeholder="100" inputmode="decimal"></div><div class="field"><label for="vat-rate">{{ui.rate}}</label><input type="number" id="vat-rate" step="any" min="0" value="20" placeholder="20" inputmode="decimal"></div><div class="field"><label for="vat-dir">{{ui.direction}}</label><select id="vat-dir"><option value="excl">{{ui.addVat}}</option><option value="incl">{{ui.removeVat}}</option></select></div></div><div class="result" id="vat-out" style="text-align:left;display:grid;grid-template-columns:repeat(3,1fr);gap:0.5rem;margin-top:0.75rem"></div></form>`,
  { title:'VAT Calculator — add or remove VAT from any price', metaDescription:'Free VAT calculator. Add VAT to a net price or remove VAT from a gross price. Supports any VAT rate. Shows net, VAT amount and gross.', h1:'VAT Calculator', intro:'Enter a price and VAT rate. Choose whether to add VAT (net → gross) or remove it (gross → net).', faq_title:'VAT calculator FAQ', ui:{ amount:'Amount', rate:'VAT rate (%)', direction:'Direction', addVat:'Add VAT (net → gross)', removeVat:'Remove VAT (gross → net)' }, faq:[
    { q:'What is VAT?', a:'VAT (Value-Added Tax) is a consumption tax applied at each stage of the supply chain. The buyer pays the gross price (net + VAT). The business collects VAT on behalf of the government.' },
    { q:'How do I remove VAT from a gross price?', a:'Net = Gross / (1 + VAT rate / 100). For a £120 gross price with 20% VAT: Net = 120 / 1.20 = £100. The VAT amount is £120 − £100 = £20.' },
    { q:'What VAT rates are common?', a:'UK: 20% standard, 5% reduced, 0% zero-rated. EU varies by country (typically 19–25% standard). USA does not have federal VAT but has state sales tax (0–11%). Australia: 10% GST.' }
  ]},
  { title:'Calculadora de IVA/Imposto — adicionar ou remover imposto de qualquer preço', metaDescription:'Calculadora de IVA/imposto gratuita. Adicione ou remova imposto de um preço. Suporta qualquer alíquota. Mostra preço líquido, imposto e preço bruto.', h1:'Calculadora de IVA/Imposto', intro:'Insira um preço e a alíquota. Escolha se deseja adicionar imposto (líquido → bruto) ou removê-lo (bruto → líquido).', faq_title:'Perguntas frequentes sobre calculadora de imposto', ui:{ amount:'Valor', rate:'Alíquota (%)', direction:'Direção', addVat:'Adicionar imposto (líquido → bruto)', removeVat:'Remover imposto (bruto → líquido)' }, faq:[
    { q:'O que é IVA/ICMS?', a:'O IVA (Imposto sobre Valor Agregado) é um imposto de consumo aplicado em cada etapa da cadeia de fornecimento. No Brasil, o ICMS funciona de forma similar.' },
    { q:'Como remover o imposto de um preço bruto?', a:'Líquido = Bruto / (1 + alíquota / 100). Para R$ 120 bruto com 20% de imposto: Líquido = 120 / 1,20 = R$ 100. O imposto é R$ 120 − R$ 100 = R$ 20.' },
    { q:'Quais alíquotas são comuns?', a:'No Brasil, o ICMS varia de 7% a 35% dependendo do estado e produto. O ISS varia de 2% a 5%. O IPI tem alíquotas variadas por produto.' }
  ]},
  `(function(){
  function upd(){
    const amt=parseFloat(document.getElementById('vat-amount').value);
    const rate=parseFloat(document.getElementById('vat-rate').value)||0;
    const dir=document.getElementById('vat-dir').value;
    const out=document.getElementById('vat-out');
    if(isNaN(amt)||amt<0){out.innerHTML='';return;}
    let net,vat,gross;
    if(dir==='excl'){net=amt;gross=amt*(1+rate/100);vat=gross-net;}
    else{gross=amt;net=amt/(1+rate/100);vat=gross-net;}
    const fmt=v=>v.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
    out.innerHTML=[['Net',fmt(net)],['VAT ('+rate+'%)',fmt(vat)],['Gross',fmt(gross)]].map(([k,v])=>\`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">\${k}</div><strong>\${v}</strong></div>\`).join('');
  }
  ['vat-amount','vat-rate','vat-dir'].forEach(id=>document.getElementById(id).addEventListener('input',upd));
})();`
);

// ─── 113 ── Break-Even Calculator ─────────────────────────────────────────────
tool('breakeven', 'finance', '📊',
  `<form id="be-form"><div class="row"><div class="field"><label for="be-fixed">{{ui.fixed}}</label><input type="number" id="be-fixed" step="any" min="0" placeholder="5000" inputmode="decimal"></div><div class="field"><label for="be-price">{{ui.price}}</label><input type="number" id="be-price" step="any" min="0" placeholder="50" inputmode="decimal"></div><div class="field"><label for="be-var">{{ui.variable}}</label><input type="number" id="be-var" step="any" min="0" placeholder="20" inputmode="decimal"></div><button class="btn" type="submit">{{ui.calculate}}</button></div></form><div id="be-out" hidden class="result" style="text-align:left;display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:0.5rem"></div>`,
  { title:'Break-Even Calculator — find break-even point in units and revenue', metaDescription:'Free break-even calculator. Enter fixed costs, selling price and variable costs per unit to find your break-even point in units and revenue.', h1:'Break-Even Calculator', intro:'Enter fixed costs, selling price per unit and variable cost per unit to find your break-even point.', faq_title:'Break-even calculator FAQ', ui:{ fixed:'Fixed costs ($)', price:'Selling price per unit ($)', variable:'Variable cost per unit ($)', calculate:'Calculate' }, faq:[
    { q:'What is the break-even point?', a:'The break-even point is the number of units you need to sell to cover all costs (fixed + variable), with zero profit. Break-even units = Fixed Costs / (Price − Variable Cost per unit). The denominator is called the contribution margin.' },
    { q:'What is the contribution margin?', a:'Contribution margin = Selling price − Variable cost per unit. It represents how much each unit sold contributes toward covering fixed costs and then generating profit.' },
    { q:'How do I use break-even analysis?', a:'Use break-even analysis to decide whether a business idea is viable, to set minimum pricing, to evaluate the impact of cost changes, and to set sales targets.' }
  ]},
  { title:'Calculadora de Ponto de Equilíbrio — encontre o break-even em unidades e receita', metaDescription:'Calculadora de ponto de equilíbrio gratuita. Insira custos fixos, preço de venda e custos variáveis por unidade para encontrar seu ponto de equilíbrio.', h1:'Calculadora de Ponto de Equilíbrio', intro:'Insira os custos fixos, preço de venda por unidade e custo variável por unidade para encontrar seu ponto de equilíbrio.', faq_title:'Perguntas frequentes sobre ponto de equilíbrio', ui:{ fixed:'Custos fixos (R$)', price:'Preço de venda por unidade (R$)', variable:'Custo variável por unidade (R$)', calculate:'Calcular' }, faq:[
    { q:'O que é o ponto de equilíbrio?', a:'O ponto de equilíbrio é o número de unidades que você precisa vender para cobrir todos os custos (fixos + variáveis), com lucro zero. Unidades = Custos Fixos / (Preço − Custo Variável por unidade).' },
    { q:'O que é margem de contribuição?', a:'Margem de contribuição = Preço de venda − Custo variável por unidade. Representa quanto cada unidade vendida contribui para cobrir os custos fixos e gerar lucro.' },
    { q:'Como usar a análise de ponto de equilíbrio?', a:'Use para decidir se uma ideia de negócio é viável, definir preços mínimos, avaliar o impacto de mudanças de custo e definir metas de vendas.' }
  ]},
  `(function(){
  document.getElementById('be-form').addEventListener('submit',function(e){
    e.preventDefault();
    const fixed=parseFloat(document.getElementById('be-fixed').value)||0;
    const price=parseFloat(document.getElementById('be-price').value)||0;
    const variable=parseFloat(document.getElementById('be-var').value)||0;
    const out=document.getElementById('be-out');
    const cm=price-variable;
    if(cm<=0){out.innerHTML='<p style="color:var(--red,#ef4444)">Selling price must exceed variable cost</p>';out.hidden=false;return;}
    const units=Math.ceil(fixed/cm);
    const revenue=units*price;
    const margin=(cm/price*100).toFixed(1);
    const items=[['Break-even units',units.toLocaleString()],['Break-even revenue','$'+revenue.toLocaleString()],['Contribution margin','$'+cm.toFixed(2)],['Margin ratio',margin+'%'],['Fixed costs','$'+fixed.toLocaleString()]];
    out.hidden=false;
    out.innerHTML=items.map(([k,v])=>\`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">\${k}</div><strong>\${v}</strong></div>\`).join('');
  });
})();`
);

// ─── 114 ── Currency Exchange Rate ────────────────────────────────────────────
tool('exchangerate', 'finance', '💱',
  `<div id="er-app"><p style="opacity:0.7;font-size:0.875rem;margin-bottom:0.75rem">{{ui.note}}</p><div class="row"><div class="field"><label for="er-amt">{{ui.amount}}</label><input type="number" id="er-amt" step="any" min="0" value="100" inputmode="decimal"></div><div class="field"><label for="er-from">{{ui.from}}</label><select id="er-from"></select></div><div class="field"><label for="er-to">{{ui.to}}</label><select id="er-to"></select></div></div><div class="result"><span class="big" id="er-out">—</span></div></div>`,
  { title:'Currency Exchange Rate Calculator — convert between major currencies', metaDescription:'Free currency converter with sample exchange rates. Convert between USD, EUR, GBP, JPY, BRL and more major currencies. Rates are approximate sample values.', h1:'Currency Exchange Calculator', intro:'Convert between major world currencies using indicative exchange rates. Note: rates shown are sample values — for live rates check your bank or a financial service.', faq_title:'Currency exchange FAQ', ui:{ note:'Note: rates are approximate sample values for demonstration.', amount:'Amount', from:'From', to:'To' }, faq:[
    { q:'Are these live exchange rates?', a:'No. The rates in this tool are approximate sample values for demonstration purposes. For actual currency exchange, always use live rates from your bank, broker, or a service like xe.com.' },
    { q:'What is the mid-market rate?', a:'The mid-market rate (also called the interbank rate) is the midpoint between buy and sell prices. Banks and exchange services typically add a margin (spread) on top of the mid-market rate — that is how they make money on currency exchange.' },
    { q:'Why do exchange rates change?', a:'Exchange rates fluctuate due to interest rate differentials between countries, inflation, trade balances, political events, and market speculation. Major pairs like EUR/USD can move 1–2% per day.' }
  ]},
  { title:'Calculadora de Câmbio — converter entre moedas principais', metaDescription:'Conversor de moeda gratuito com taxas de câmbio de amostra. Converta entre USD, EUR, GBP, JPY, BRL e outras moedas principais.', h1:'Calculadora de Câmbio', intro:'Converta entre as principais moedas mundiais usando taxas de câmbio indicativas. Nota: as taxas mostradas são valores de amostra — para taxas ao vivo consulte seu banco.', faq_title:'Perguntas frequentes sobre câmbio', ui:{ note:'Nota: as taxas são valores de amostra aproximados para demonstração.', amount:'Valor', from:'De', to:'Para' }, faq:[
    { q:'As taxas são ao vivo?', a:'Não. As taxas nesta ferramenta são valores de amostra aproximados para fins de demonstração. Para câmbio real, sempre use taxas ao vivo do seu banco ou serviço como xe.com.' },
    { q:'O que é a taxa de meio-mercado?', a:'A taxa de meio-mercado (interbancária) é o ponto médio entre preços de compra e venda. Bancos e casas de câmbio adicionam uma margem (spread) sobre essa taxa.' },
    { q:'Por que as taxas de câmbio mudam?', a:'As taxas flutuam por causa de diferenciais de taxa de juros, inflação, balanças comerciais, eventos políticos e especulação de mercado.' }
  ]},
  `(function(){
  // Approximate rates relative to USD (as of mid-2024, for demo only)
  const rates={USD:1,EUR:0.92,GBP:0.79,JPY:157,CHF:0.90,CAD:1.37,AUD:1.52,CNY:7.26,INR:83.5,BRL:5.20,MXN:17.8,SGD:1.35,HKD:7.82,NOK:10.6,SEK:10.7,DKK:6.89,NZD:1.64,ZAR:18.6,KRW:1370,AED:3.67,SAR:3.75,THB:36.5,MYR:4.72,IDR:16250,PHP:58.1,TWD:32.5,PLN:4.0,CZK:23.5,HUF:364,RON:4.69,TRY:32.5,RUB:90,UAH:40,EGP:50,NGN:1500,KES:129,GHS:15.4,MAD:10.0,TND:3.1,ARS:950,CLP:950,COP:4000,PEN:3.77,UYU:39,VES:36};
  const sel_from=document.getElementById('er-from');
  const sel_to=document.getElementById('er-to');
  const keys=Object.keys(rates);
  keys.forEach(k=>{
    const o1=document.createElement('option');o1.value=o1.textContent=k;if(k==='USD')o1.selected=true;sel_from.appendChild(o1);
    const o2=document.createElement('option');o2.value=o2.textContent=k;if(k==='BRL')o2.selected=true;sel_to.appendChild(o2);
  });
  function conv(){
    const amt=parseFloat(document.getElementById('er-amt').value)||1;
    const from=sel_from.value,to=sel_to.value;
    const result=amt/rates[from]*rates[to];
    document.getElementById('er-out').textContent=result.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:4})+' '+to;
  }
  document.getElementById('er-amt').addEventListener('input',conv);
  sel_from.addEventListener('change',conv);
  sel_to.addEventListener('change',conv);
  conv();
})();`
);

// ─── 115 ── Net Worth Calculator ───────────────────────────────────────────────
tool('networthcalc', 'finance', '💼',
  `<div id="nw-app"><p style="opacity:0.7;font-size:0.875rem">{{ui.instruction}}</p><div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem"><div><h3 style="margin:0 0 0.5rem">{{ui.assets}}</h3><div id="nw-assets"></div><button class="btn" id="nw-add-asset" style="margin-top:0.5rem;font-size:0.875rem">+ {{ui.addAsset}}</button></div><div><h3 style="margin:0 0 0.5rem">{{ui.liabilities}}</h3><div id="nw-liabs"></div><button class="btn" id="nw-add-liab" style="margin-top:0.5rem;font-size:0.875rem">+ {{ui.addLiab}}</button></div></div><div class="result" id="nw-result" style="margin-top:1rem;display:grid;grid-template-columns:repeat(3,1fr);gap:0.75rem"></div></div>`,
  { title:'Net Worth Calculator — track assets and liabilities', metaDescription:'Free net worth calculator. Add your assets and liabilities to calculate your total net worth. Helps you understand your financial position.', h1:'Net Worth Calculator', intro:'Add your assets (what you own) and liabilities (what you owe) to calculate your net worth.', faq_title:'Net worth calculator FAQ', ui:{ instruction:'Add your assets and liabilities below.', assets:'Assets', liabilities:'Liabilities', addAsset:'Add Asset', addLiab:'Add Liability' }, faq:[
    { q:'What is net worth?', a:'Net worth = Total Assets − Total Liabilities. Assets are things you own with monetary value (home, savings, investments, car). Liabilities are what you owe (mortgage, loans, credit card debt).' },
    { q:'What is a good net worth?', a:'Net worth benchmarks vary by age and income. A commonly cited rule of thumb: by age 30, aim for 1× your annual income; by 40, 3×; by 50, 6×; by 60, 8×. But any positive net worth is a good start.' },
    { q:'What counts as an asset?', a:'Liquid assets: cash, savings, investments. Illiquid: home equity, car (market value minus loan), retirement accounts, business ownership, valuable personal property.' }
  ]},
  { title:'Calculadora de Patrimônio Líquido — registre ativos e passivos', metaDescription:'Calculadora de patrimônio líquido gratuita. Adicione seus ativos e passivos para calcular seu patrimônio líquido total.', h1:'Calculadora de Patrimônio Líquido', intro:'Adicione seus ativos (o que você tem) e passivos (o que você deve) para calcular seu patrimônio líquido.', faq_title:'Perguntas frequentes sobre patrimônio líquido', ui:{ instruction:'Adicione seus ativos e passivos abaixo.', assets:'Ativos', liabilities:'Passivos', addAsset:'Adicionar Ativo', addLiab:'Adicionar Passivo' }, faq:[
    { q:'O que é patrimônio líquido?', a:'Patrimônio líquido = Total de Ativos − Total de Passivos. Ativos são coisas que você possui com valor monetário. Passivos são o que você deve.' },
    { q:'Qual é um bom patrimônio líquido?', a:'Os benchmarks variam por idade e renda. Uma regra comum: aos 30 anos, mire em 1× sua renda anual; aos 40, 3×; aos 50, 6×; aos 60, 8×.' },
    { q:'O que conta como ativo?', a:'Ativos líquidos: dinheiro, poupança, investimentos. Ilíquidos: patrimônio imobiliário, carro (valor de mercado menos financiamento), previdência, participação em negócios.' }
  ]},
  `(function(){
  function mkRow(container){
    const row=document.createElement('div');
    row.style.cssText='display:flex;gap:0.4rem;margin-bottom:0.4rem';
    const label=document.createElement('input');label.placeholder='Label';label.style.cssText='flex:1;padding:0.4rem;border:1px solid var(--line);border-radius:6px;background:var(--surface);color:var(--text)';
    const val=document.createElement('input');val.type='number';val.placeholder='0';val.style.cssText='width:100px;padding:0.4rem;border:1px solid var(--line);border-radius:6px;background:var(--surface);color:var(--text)';
    val.addEventListener('input',calc);
    const del=document.createElement('button');del.textContent='×';del.style.cssText='padding:0.4rem 0.6rem;background:var(--surface);border:1px solid var(--line);border-radius:6px;cursor:pointer;color:var(--text)';
    del.onclick=()=>{row.remove();calc();};
    row.append(label,val,del);container.appendChild(row);
    return row;
  }
  function sumContainer(id){return [...document.getElementById(id).querySelectorAll('input[type=number]')].reduce((s,i)=>s+(parseFloat(i.value)||0),0);}
  function calc(){
    const assets=sumContainer('nw-assets');
    const liabs=sumContainer('nw-liabs');
    const nw=assets-liabs;
    const res=document.getElementById('nw-result');
    res.innerHTML=[['Total assets','$'+assets.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})],['Total liabilities','$'+liabs.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})],['Net worth','$'+nw.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})]].map(([k,v])=>\`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">\${k}</div><strong>\${v}</strong></div>\`).join('');
  }
  ['Checking account','Savings account','Investments','Home value','Car value'].forEach(name=>{const r=mkRow(document.getElementById('nw-assets'));r.querySelector('input[type=text]').value=name;});
  ['Mortgage','Car loan','Credit cards','Student loans'].forEach(name=>{const r=mkRow(document.getElementById('nw-liabs'));r.querySelector('input[type=text]').value=name;});
  document.getElementById('nw-add-asset').onclick=()=>mkRow(document.getElementById('nw-assets'));
  document.getElementById('nw-add-liab').onclick=()=>mkRow(document.getElementById('nw-liabs'));
  calc();
})();`
);

// ─── 116 ── Savings Goal Calculator ───────────────────────────────────────────
tool('savingsgoal', 'finance', '🎯',
  `<form id="sg-form"><div class="row"><div class="field"><label for="sg-goal">{{ui.goal}}</label><input type="number" id="sg-goal" step="any" min="0" placeholder="10000" inputmode="decimal"></div><div class="field"><label for="sg-saved">{{ui.saved}}</label><input type="number" id="sg-saved" step="any" min="0" placeholder="1000" inputmode="decimal"></div></div><div class="row"><div class="field"><label for="sg-monthly">{{ui.monthly}}</label><input type="number" id="sg-monthly" step="any" min="0" placeholder="300" inputmode="decimal"></div><div class="field"><label for="sg-rate">{{ui.rate}}</label><input type="number" id="sg-rate" step="any" min="0" placeholder="2" inputmode="decimal"></div></div><div class="row" style="justify-content:center"><button class="btn" type="submit">{{ui.calculate}}</button></div></form><div id="sg-out" hidden class="result" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:0.5rem"></div>`,
  { title:'Savings Goal Calculator — how long to reach your savings target', metaDescription:'Free savings goal calculator. Enter your savings target, current savings, monthly contribution and interest rate to see how long to reach your goal.', h1:'Savings Goal Calculator', intro:'Enter your goal amount, current savings, monthly contribution and interest rate to see how long you need and when you will reach your goal.', faq_title:'Savings goal FAQ', ui:{ goal:'Savings goal ($)', saved:'Already saved ($)', monthly:'Monthly savings ($)', rate:'Annual interest rate (%)', calculate:'Calculate' }, faq:[
    { q:'How is the time to goal calculated?', a:'Using the future value formula for an annuity: n = log(1 + (FV−PV)×r/PMT) / log(1+r), where FV is the goal, PV is current savings, r is monthly rate and PMT is monthly contribution. When r=0 it simplifies to (FV−PV)/PMT months.' },
    { q:'What interest rate should I use?', a:'Use the expected annual interest rate of your savings account, money market fund, or investment. High-yield savings accounts in the US currently offer 4–5% APY. A diversified investment portfolio might average 6–8%.' },
    { q:'Can I reach my goal faster?', a:'Three levers: increase monthly contributions, find higher interest rates, or reduce the goal amount. The calculator recomputes immediately when you change any input.' }
  ]},
  { title:'Calculadora de Meta de Poupança — quanto tempo para atingir seu objetivo', metaDescription:'Calculadora de meta de poupança gratuita. Insira seu objetivo de economia, poupança atual, contribuição mensal e taxa de juros para ver quanto tempo levará.', h1:'Calculadora de Meta de Poupança', intro:'Insira o valor objetivo, poupança atual, contribuição mensal e taxa de juros para ver quanto tempo você precisa e quando atingirá sua meta.', faq_title:'Perguntas frequentes sobre meta de poupança', ui:{ goal:'Meta de poupança (R$)', saved:'Já poupado (R$)', monthly:'Poupança mensal (R$)', rate:'Taxa de juros anual (%)', calculate:'Calcular' }, faq:[
    { q:'Como o tempo para atingir a meta é calculado?', a:'Usando a fórmula de valor futuro para uma anuidade. Quando a taxa é zero, simplifica para (Meta − Poupança atual) / Contribuição mensal.' },
    { q:'Qual taxa de juros usar?', a:'Use a taxa esperada da sua conta poupança, fundo de renda fixa ou investimento. No Brasil, a poupança rende cerca de 6% ao ano; o Tesouro Selic pode render mais.' },
    { q:'Posso atingir minha meta mais rápido?', a:'Três alavancas: aumentar contribuições mensais, buscar taxas de juros maiores ou reduzir o valor da meta.' }
  ]},
  `(function(){
  document.getElementById('sg-form').addEventListener('submit',function(e){
    e.preventDefault();
    const goal=parseFloat(document.getElementById('sg-goal').value)||0;
    const saved=parseFloat(document.getElementById('sg-saved').value)||0;
    const pmt=parseFloat(document.getElementById('sg-monthly').value)||0;
    const annualRate=parseFloat(document.getElementById('sg-rate').value)||0;
    const out=document.getElementById('sg-out');
    const remaining=goal-saved;
    if(remaining<=0){out.innerHTML='<p>Goal already reached!</p>';out.hidden=false;return;}
    if(pmt<=0){out.innerHTML='<p>Monthly savings must be > 0</p>';out.hidden=false;return;}
    const r=annualRate/100/12;
    let months;
    if(r===0){months=remaining/pmt;}
    else{months=Math.log(1+remaining*r/pmt)/Math.log(1+r);}
    months=Math.ceil(months);
    const years=Math.floor(months/12);
    const remMonths=months%12;
    const totalContrib=pmt*months;
    const now=new Date();
    now.setMonth(now.getMonth()+months);
    const items=[['Months needed',months],['Time',years>0?years+'y '+remMonths+'m':remMonths+'m'],['Target date',now.toLocaleDateString('en-US',{month:'long',year:'numeric'})],['Total contributed','$'+totalContrib.toLocaleString()],['Interest earned','$'+(goal-saved-totalContrib+remaining>0?Math.max(0,goal-saved-totalContrib).toLocaleString():0)]];
    out.hidden=false;
    out.innerHTML=items.map(([k,v])=>\`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">\${k}</div><strong>\${v}</strong></div>\`).join('');
  });
})();`
);

// ─── 117 ── Mortgage Affordability ────────────────────────────────────────────
tool('mortgageafford', 'finance', '🏡',
  `<form id="ma-form"><div class="row"><div class="field"><label for="ma-income">{{ui.income}}</label><input type="number" id="ma-income" step="any" min="0" placeholder="75000" inputmode="decimal"></div><div class="field"><label for="ma-debt">{{ui.debt}}</label><input type="number" id="ma-debt" step="any" min="0" placeholder="500" inputmode="decimal"></div></div><div class="row"><div class="field"><label for="ma-down">{{ui.down}}</label><input type="number" id="ma-down" step="any" min="0" placeholder="50000" inputmode="decimal"></div><div class="field"><label for="ma-rate">{{ui.rate}}</label><input type="number" id="ma-rate" step="any" min="0" placeholder="6.5" inputmode="decimal"></div><div class="field"><label for="ma-years">{{ui.term}}</label><input type="number" id="ma-years" step="1" min="1" max="40" value="30" inputmode="numeric"></div></div><div class="row" style="justify-content:center"><button class="btn" type="submit">{{ui.calculate}}</button></div></form><div id="ma-out" hidden class="result" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:0.5rem"></div>`,
  { title:'Mortgage Affordability Calculator — how much house can you afford?', metaDescription:'Free mortgage affordability calculator. Enter income, debt and down payment to find the maximum home price you can afford based on the 28/36 rule.', h1:'Mortgage Affordability Calculator', intro:'Enter your gross annual income, monthly debt payments, down payment and interest rate to estimate how much house you can afford.', faq_title:'Mortgage affordability FAQ', ui:{ income:'Annual gross income ($)', debt:'Monthly debt payments ($)', down:'Down payment ($)', rate:'Interest rate (%)', term:'Term (years)', calculate:'Calculate' }, faq:[
    { q:'What is the 28/36 rule?', a:'Lenders use the 28/36 rule: your monthly housing payment should not exceed 28% of gross monthly income (front-end ratio), and total monthly debt (housing + all other debt) should not exceed 36% (back-end ratio or debt-to-income ratio).' },
    { q:'What is included in the housing payment?', a:'PITI: Principal and interest (the mortgage payment itself), Property taxes, homeowner\'s Insurance, and HOA fees if applicable. This tool estimates using principal and interest only.' },
    { q:'How much down payment do I need?', a:'Conventional loans require 3–20% down. FHA loans require 3.5%. Less than 20% down typically requires private mortgage insurance (PMI), adding 0.5–1.5% to your annual cost.' }
  ]},
  { title:'Calculadora de Capacidade de Compra de Imóvel — quanto posso pagar?', metaDescription:'Calculadora de capacidade de compra gratuita. Insira renda, dívidas e entrada para encontrar o preço máximo do imóvel que você pode pagar.', h1:'Calculadora de Capacidade de Compra de Imóvel', intro:'Insira sua renda anual bruta, pagamentos mensais de dívidas, entrada e taxa de juros para estimar quanto de imóvel você pode comprar.', faq_title:'Perguntas frequentes sobre capacidade de compra', ui:{ income:'Renda anual bruta (R$)', debt:'Pagamentos mensais de dívidas (R$)', down:'Entrada (R$)', rate:'Taxa de juros (%)', term:'Prazo (anos)', calculate:'Calcular' }, faq:[
    { q:'O que é a regra dos 28/36?', a:'Credores usam a regra 28/36: o pagamento mensal de habitação não deve exceder 28% da renda bruta mensal, e a dívida total mensal não deve exceder 36%.' },
    { q:'O que está incluído no pagamento de habitação?', a:'Principal e juros (a prestação do financiamento em si), IPTU e seguro do imóvel. Esta ferramenta estima usando apenas principal e juros.' },
    { q:'Quanto de entrada preciso?', a:'No Brasil, financiamentos habitacionais geralmente exigem 20–30% de entrada. O FGTS pode ser usado como entrada em financiamentos pelo SFH.' }
  ]},
  `(function(){
  document.getElementById('ma-form').addEventListener('submit',function(e){
    e.preventDefault();
    const income=parseFloat(document.getElementById('ma-income').value)||0;
    const debt=parseFloat(document.getElementById('ma-debt').value)||0;
    const down=parseFloat(document.getElementById('ma-down').value)||0;
    const rate=parseFloat(document.getElementById('ma-rate').value)||0;
    const years=parseInt(document.getElementById('ma-years').value)||30;
    const monthlyIncome=income/12;
    const maxHousing28=monthlyIncome*0.28;
    const maxHousing36=Math.max(0,monthlyIncome*0.36-debt);
    const maxPmt=Math.min(maxHousing28,maxHousing36);
    const r=rate/100/12;
    const n=years*12;
    const maxLoan=r===0?maxPmt*n:maxPmt*(1-Math.pow(1+r,-n))/r;
    const maxPrice=maxLoan+down;
    const fmt=v=>'$'+Math.round(v).toLocaleString();
    const items=[['Max home price',fmt(maxPrice)],['Max loan',fmt(maxLoan)],['Max monthly payment',fmt(maxPmt)],['28% limit',fmt(maxHousing28)],['36% limit',fmt(maxHousing36)],['Down payment',fmt(down)]];
    const out=document.getElementById('ma-out');
    out.hidden=false;
    out.innerHTML=items.map(([k,v])=>\`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">\${k}</div><strong>\${v}</strong></div>\`).join('');
  });
})();`
);

// ─── 118 ── Hours & Pay Calculator ────────────────────────────────────────────
tool('hourspay', 'finance', '⏰',
  `<form id="hp-form"><div class="row"><div class="field"><label for="hp-hours">{{ui.hours}}</label><input type="number" id="hp-hours" step="any" min="0" placeholder="40" inputmode="decimal"></div><div class="field"><label for="hp-rate">{{ui.rate}}</label><input type="number" id="hp-rate" step="any" min="0" placeholder="25" inputmode="decimal"></div><div class="field"><label for="hp-ot">{{ui.overtime}}</label><input type="number" id="hp-ot" step="any" min="0" placeholder="5" inputmode="decimal"></div></div><div class="row" style="justify-content:center"><button class="btn" type="submit">{{ui.calculate}}</button></div></form><div id="hp-out" hidden class="result" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:0.5rem"></div>`,
  { title:'Hours & Pay Calculator — calculate weekly, monthly and annual pay', metaDescription:'Free hours and pay calculator. Enter hours worked, hourly rate and overtime hours to calculate weekly, monthly and annual gross pay.', h1:'Hours & Pay Calculator', intro:'Enter your hours worked, hourly rate and overtime hours to see your gross weekly, monthly and annual pay.', faq_title:'Hours and pay calculator FAQ', ui:{ hours:'Regular hours', rate:'Hourly rate ($)', overtime:'Overtime hours', calculate:'Calculate' }, faq:[
    { q:'How is overtime pay calculated?', a:'In the US, overtime is typically paid at 1.5× the regular hourly rate for hours over 40 in a workweek (FLSA). Some employers pay double time (2×) for very long days or weekends. This calculator uses 1.5× as the default.' },
    { q:'What is gross vs net pay?', a:'Gross pay is your total earnings before any deductions. Net pay (take-home pay) is what you receive after deducting income tax, Social Security, Medicare, health insurance, retirement contributions, etc.' },
    { q:'How do I convert hourly to annual salary?', a:'Annual = Hourly rate × 40 hours/week × 52 weeks = Hourly × 2080. For example, $25/hour = $52,000/year. The calculator shows this automatically.' }
  ]},
  { title:'Calculadora de Horas e Pagamento — calcule salário semanal, mensal e anual', metaDescription:'Calculadora de horas e pagamento gratuita. Insira horas trabalhadas, taxa horária e horas extras para calcular o pagamento bruto semanal, mensal e anual.', h1:'Calculadora de Horas e Pagamento', intro:'Insira suas horas trabalhadas, taxa horária e horas extras para ver seu pagamento bruto semanal, mensal e anual.', faq_title:'Perguntas frequentes sobre horas e pagamento', ui:{ hours:'Horas normais', rate:'Taxa horária (R$)', overtime:'Horas extras', calculate:'Calcular' }, faq:[
    { q:'Como o pagamento de horas extras é calculado?', a:'No Brasil, as horas extras são pagas com acréscimo de no mínimo 50% sobre o valor da hora normal, e 100% nos domingos e feriados (CLT).' },
    { q:'O que é salário bruto vs líquido?', a:'Salário bruto é o total antes de descontos. Salário líquido (take-home) é o que você recebe após descontar INSS, IRRF e outros.' },
    { q:'Como converter taxa horária em salário anual?', a:'Anual = Taxa horária × 44 horas/semana × 52 semanas = Taxa × 2288. Por exemplo, R$ 25/hora = R$ 57.200/ano.' }
  ]},
  `(function(){
  document.getElementById('hp-form').addEventListener('submit',function(e){
    e.preventDefault();
    const hours=parseFloat(document.getElementById('hp-hours').value)||0;
    const rate=parseFloat(document.getElementById('hp-rate').value)||0;
    const ot=parseFloat(document.getElementById('hp-ot').value)||0;
    const regularPay=hours*rate;
    const otPay=ot*rate*1.5;
    const weekly=regularPay+otPay;
    const monthly=weekly*52/12;
    const annual=weekly*52;
    const fmt=v=>'$'+v.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
    const items=[['Weekly (gross)',fmt(weekly)],['Monthly (÷12)',fmt(monthly)],['Annual',fmt(annual)],['Regular pay',fmt(regularPay)],['Overtime pay',fmt(otPay)],['Total hours',hours+ot]];
    const out=document.getElementById('hp-out');
    out.hidden=false;
    out.innerHTML=items.map(([k,v])=>\`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">\${k}</div><strong>\${v}</strong></div>\`).join('');
  });
})();`
);

// ─── 119 ── Macronutrient Calculator ──────────────────────────────────────────
tool('macrocalc', 'health', '🥗',
  `<form id="mc-form"><div class="row"><div class="field"><label for="mc-cal">{{ui.calories}}</label><input type="number" id="mc-cal" min="500" max="10000" step="1" placeholder="2000" inputmode="numeric"></div><div class="field"><label for="mc-goal">{{ui.goal}}</label><select id="mc-goal"><option value="balanced">{{ui.balanced}}</option><option value="lowcarb">{{ui.lowCarb}}</option><option value="highprotein">{{ui.highProtein}}</option><option value="keto">{{ui.keto}}</option></select></div></div><div class="row" style="justify-content:center"><button class="btn" type="submit">{{ui.calculate}}</button></div></form><div id="mc-out" hidden class="result" style="text-align:left"></div>`,
  { title:'Macronutrient Calculator — protein, carbs and fat from daily calories', metaDescription:'Free macro calculator. Enter your daily calorie target and diet goal to get protein, carb and fat targets in grams and calories.', h1:'Macronutrient Calculator', intro:'Enter your daily calorie target and diet style to get your protein, carbohydrate and fat targets in grams.', faq_title:'Macronutrient FAQ', ui:{ calories:'Daily calories', goal:'Diet goal', balanced:'Balanced', lowCarb:'Low-carb', highProtein:'High protein', keto:'Keto', calculate:'Calculate' }, faq:[
    { q:'What are macronutrients?', a:'Macronutrients (macros) are the three main energy nutrients: carbohydrates (4 cal/g), protein (4 cal/g) and fat (9 cal/g). They make up the bulk of your diet and provide all of your calories.' },
    { q:'How much protein do I need?', a:'General guidelines: 0.8g per kg bodyweight for sedentary adults, 1.6–2.2g/kg for those doing strength training. High-protein diets (30%+ of calories from protein) can help preserve muscle during weight loss.' },
    { q:'What is a keto macro split?', a:'A ketogenic diet is typically very high fat (65–75% of calories), moderate protein (20–30%), and very low carb (5–10%, usually under 50g/day). This forces the body to use fat as its primary fuel (ketosis).' }
  ]},
  { title:'Calculadora de Macronutrientes — proteína, carboidratos e gordura', metaDescription:'Calculadora de macros gratuita. Insira seu alvo calórico diário e objetivo de dieta para obter as metas de proteína, carboidrato e gordura em gramas.', h1:'Calculadora de Macronutrientes', intro:'Insira sua meta calórica diária e estilo de dieta para obter suas metas de proteína, carboidrato e gordura em gramas.', faq_title:'Perguntas frequentes sobre macronutrientes', ui:{ calories:'Calorias diárias', goal:'Objetivo de dieta', balanced:'Balanceada', lowCarb:'Low-carb', highProtein:'Alto teor de proteína', keto:'Keto', calculate:'Calcular' }, faq:[
    { q:'O que são macronutrientes?', a:'Macronutrientes (macros) são os três principais nutrientes energéticos: carboidratos (4 kcal/g), proteínas (4 kcal/g) e gorduras (9 kcal/g).' },
    { q:'Quanta proteína preciso?', a:'Diretrizes gerais: 0,8g por kg de peso corporal para adultos sedentários, 1,6–2,2g/kg para quem faz musculação.' },
    { q:'O que é a divisão de macros da dieta keto?', a:'Uma dieta cetogênica é tipicamente muito rica em gordura (65–75% das calorias), moderada em proteína (20–30%) e muito baixa em carboidratos (5–10%, geralmente menos de 50g/dia).' }
  ]},
  `(function(){
  const splits={
    balanced:{p:0.30,c:0.40,f:0.30},
    lowcarb:{p:0.30,c:0.25,f:0.45},
    highprotein:{p:0.40,c:0.35,f:0.25},
    keto:{p:0.25,c:0.05,f:0.70}
  };
  document.getElementById('mc-form').addEventListener('submit',function(e){
    e.preventDefault();
    const cal=parseInt(document.getElementById('mc-cal').value)||2000;
    const goal=document.getElementById('mc-goal').value;
    const s=splits[goal];
    const pCal=cal*s.p,cCal=cal*s.c,fCal=cal*s.f;
    const pG=pCal/4,cG=cCal/4,fG=fCal/9;
    const out=document.getElementById('mc-out');
    out.hidden=false;
    const bar=(pct)=>\`<div style="height:8px;border-radius:4px;background:var(--line);margin:4px 0"><div style="height:100%;border-radius:4px;background:var(--accent,#6366f1);width:\${(pct*100).toFixed(0)}%"></div></div>\`;
    out.innerHTML=[['🥩 Protein',pCal,pG,s.p],['🍞 Carbohydrates',cCal,cG,s.c],['🥑 Fat',fCal,fG,s.f]].map(([name,kcal,g,pct])=>\`<div style="margin-bottom:0.75rem"><div style="display:flex;justify-content:space-between"><strong>\${name}</strong><span>\${Math.round(g)}g · \${Math.round(kcal)} kcal · \${(pct*100).toFixed(0)}%</span></div>\${bar(pct)}</div>\`).join('');
  });
})();`
);

// ─── 120 ── Sleep Duration Calculator ─────────────────────────────────────────
tool('sleepcalc', 'health', '😴',
  `<div id="sl-app"><div class="row"><div class="field"><label for="sl-wake">{{ui.wakeTime}}</label><input type="time" id="sl-wake" value="07:00"></div><div class="field"><label for="sl-cycles">{{ui.cycles}}</label><select id="sl-cycles"><option value="4">4 (6h)</option><option value="5" selected>5 (7.5h)</option><option value="6">6 (9h)</option></select></div></div><button class="btn" id="sl-go" style="margin-top:0.5rem">{{ui.calculate}}</button><div id="sl-out" style="margin-top:0.75rem"></div></div>`,
  { title:'Sleep Cycle Calculator — find the best bedtime for your alarm', metaDescription:'Free sleep calculator. Enter your wake time to find the ideal bedtimes based on 90-minute sleep cycles. Wake up refreshed instead of groggy.', h1:'Sleep Cycle Calculator', intro:'Enter your wake time to find the best bedtimes based on 90-minute sleep cycles. Waking between cycles helps you feel more alert.', faq_title:'Sleep cycle FAQ', ui:{ wakeTime:'Wake up time', cycles:'Number of cycles', calculate:'Calculate bedtimes' }, faq:[
    { q:'What is a sleep cycle?', a:'A full sleep cycle lasts about 90 minutes and includes light sleep, deep sleep (NREM stages 1–3) and REM (rapid eye movement) sleep. Adults typically go through 4–6 cycles per night.' },
    { q:'Why does waking at the right time matter?', a:'Waking during deep sleep causes sleep inertia — the groggy, disoriented feeling that can last 30–60 minutes. Waking at the end of a sleep cycle (in light sleep) leaves you feeling more alert and refreshed.' },
    { q:'How long should I sleep?', a:'The CDC recommends 7–9 hours for adults. Five 90-minute cycles = 7.5 hours, which is within the recommended range. Six cycles = 9 hours, good for sleep debt recovery.' }
  ]},
  { title:'Calculadora de Ciclos de Sono — encontre o melhor horário de dormir', metaDescription:'Calculadora de sono gratuita. Insira seu horário de acordar para encontrar os horários ideais de dormir com base nos ciclos de 90 minutos.', h1:'Calculadora de Ciclos de Sono', intro:'Insira seu horário de acordar para encontrar os melhores horários de dormir baseados nos ciclos de sono de 90 minutos.', faq_title:'Perguntas frequentes sobre ciclos de sono', ui:{ wakeTime:'Horário de acordar', cycles:'Número de ciclos', calculate:'Calcular horários de dormir' }, faq:[
    { q:'O que é um ciclo de sono?', a:'Um ciclo completo de sono dura cerca de 90 minutos e inclui sono leve, sono profundo (estágios NREM 1–3) e sono REM. Adultos geralmente passam por 4–6 ciclos por noite.' },
    { q:'Por que acordar no momento certo é importante?', a:'Acordar durante o sono profundo causa inércia do sono — a sensação de atordoamento que pode durar 30–60 minutos. Acordar no final de um ciclo deixa você mais alerta.' },
    { q:'Quantas horas devo dormir?', a:'Recomenda-se 7–9 horas para adultos. Cinco ciclos de 90 minutos = 7,5 horas. Seis ciclos = 9 horas, bom para recuperar sono perdido.' }
  ]},
  `(function(){
  document.getElementById('sl-go').onclick=function(){
    const[wH,wM]=document.getElementById('sl-wake').value.split(':').map(Number);
    const cycles=parseInt(document.getElementById('sl-cycles').value)||5;
    const wakeMin=wH*60+wM;
    const fallAsleep=14; // avg minutes to fall asleep
    const out=document.getElementById('sl-out');
    const times=[];
    for(let c=cycles;c>=3;c--){
      const bedMin=(wakeMin-c*90-fallAsleep+24*60)%(24*60);
      const bH=Math.floor(bedMin/60);
      const bM=bedMin%60;
      times.push({time:\`\${String(bH).padStart(2,'0')}:\${String(bM).padStart(2,'0')}\`,cycles:c,hours:(c*90/60).toFixed(1)});
    }
    out.innerHTML='<div style="display:grid;gap:0.4rem">'+times.map(t=>\`<div style="display:flex;justify-content:space-between;align-items:center;background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><strong style="font-size:1.2rem">\${t.time}</strong><span style="opacity:0.7">\${t.cycles} cycles · \${t.hours}h</span></div>\`).join('')+'</div>';
  };
})();`
);

// ─── 121 ── Body Fat Percentage ────────────────────────────────────────────────
tool('bodyfat', 'health', '🏃',
  `<form id="bf-form"><div class="row"><div class="field"><label for="bf-gender">{{ui.gender}}</label><select id="bf-gender"><option value="m">{{ui.male}}</option><option value="f">{{ui.female}}</option></select></div><div class="field"><label for="bf-unit">{{ui.unit}}</label><select id="bf-unit"><option value="cm">cm / kg</option><option value="in">in / lbs</option></select></div></div><div class="row" id="bf-fields"></div><div class="row" style="justify-content:center"><button class="btn" type="submit">{{ui.calculate}}</button></div></form><div id="bf-out" hidden class="result"></div>`,
  { title:'Body Fat Percentage Calculator — US Navy method', metaDescription:'Free body fat percentage calculator using the US Navy method. Enter height, neck, waist and hip (women) measurements to estimate body fat.', h1:'Body Fat Percentage Calculator', intro:'Calculate your estimated body fat percentage using the US Navy circumference method. Enter height, neck, waist, and hip (women) measurements.', faq_title:'Body fat calculator FAQ', ui:{ gender:'Biological sex', male:'Male', female:'Female', unit:'Units', calculate:'Calculate' }, faq:[
    { q:'What is the US Navy method?', a:'The Navy method uses body circumference measurements (neck, waist, hip for women) and height to estimate body fat percentage without calipers. It is accurate within ±3–4% for most people.' },
    { q:'What is a healthy body fat percentage?', a:'For men: essential fat 2–5%, athletic 6–13%, fitness 14–17%, average 18–24%, obese 25%+. For women: essential 10–13%, athletic 14–20%, fitness 21–24%, average 25–31%, obese 32%+.' },
    { q:'Is body fat more accurate than BMI?', a:'Yes. BMI uses only height and weight, so it can classify muscular people as overweight. Body fat percentage directly measures fat, making it a better health indicator, though still an estimation.' }
  ]},
  { title:'Calculadora de Percentual de Gordura Corporal — método da Marinha dos EUA', metaDescription:'Calculadora de percentual de gordura gratuita usando o método da Marinha dos EUA. Insira altura, pescoço, cintura e quadril (mulheres) para estimar a gordura corporal.', h1:'Calculadora de Percentual de Gordura Corporal', intro:'Calcule seu percentual estimado de gordura corporal usando o método de circunferência da Marinha dos EUA.', faq_title:'Perguntas frequentes sobre percentual de gordura', ui:{ gender:'Sexo biológico', male:'Masculino', female:'Feminino', unit:'Unidades', calculate:'Calcular' }, faq:[
    { q:'O que é o método da Marinha dos EUA?', a:'O método Naval usa medidas de circunferência corporal (pescoço, cintura, quadril para mulheres) e altura para estimar o percentual de gordura sem adipômetro. É preciso dentro de ±3–4%.' },
    { q:'Qual é um percentual de gordura saudável?', a:'Para homens: essencial 2–5%, atlético 6–13%, fitness 14–17%, médio 18–24%, obeso 25%+. Para mulheres: essencial 10–13%, atlético 14–20%, fitness 21–24%, médio 25–31%, obeso 32%+.' },
    { q:'O percentual de gordura é mais preciso que o IMC?', a:'Sim. O IMC usa apenas altura e peso, podendo classificar pessoas musculosas como sobrepeso. O percentual de gordura mede diretamente a gordura, sendo um indicador de saúde melhor.' }
  ]},
  `(function(){
  function buildFields(){
    const g=document.getElementById('bf-gender').value;
    const u=document.getElementById('bf-unit').value;
    const unit=u==='cm'?'cm':'in';
    const fields=g==='m'?[['height','Height ('+unit+')'],['neck','Neck ('+unit+')'],['waist','Waist ('+unit+')']]:
      [['height','Height ('+unit+')'],['neck','Neck ('+unit+')'],['waist','Waist ('+unit+')'],['hip','Hip ('+unit+')']];
    const container=document.getElementById('bf-fields');
    container.innerHTML=fields.map(([id,label])=>\`<div class="field"><label for="bf-\${id}">\${label}</label><input type="number" id="bf-\${id}" step="any" min="0" inputmode="decimal"></div>\`).join('');
  }
  document.getElementById('bf-gender').addEventListener('change',buildFields);
  document.getElementById('bf-unit').addEventListener('change',buildFields);
  buildFields();
  document.getElementById('bf-form').addEventListener('submit',function(e){
    e.preventDefault();
    const g=document.getElementById('bf-gender').value;
    const u=document.getElementById('bf-unit').value;
    let height=parseFloat(document.getElementById('bf-height').value);
    let neck=parseFloat(document.getElementById('bf-neck').value);
    let waist=parseFloat(document.getElementById('bf-waist').value);
    let hip=g==='f'?parseFloat(document.getElementById('bf-hip').value):0;
    if(u==='in'){height*=2.54;neck*=2.54;waist*=2.54;hip*=2.54;}
    let bf;
    if(g==='m'){bf=495/(1.0324-0.19077*Math.log10(waist-neck)+0.15456*Math.log10(height))-450;}
    else{bf=495/(1.29579-0.35004*Math.log10(waist+hip-neck)+0.22100*Math.log10(height))-450;}
    const out=document.getElementById('bf-out');
    const category=g==='m'?(bf<6?'Essential fat':bf<14?'Athlete':bf<18?'Fitness':bf<25?'Average':'Obese'):(bf<14?'Essential fat':bf<21?'Athlete':bf<25?'Fitness':bf<32?'Average':'Obese');
    out.hidden=false;
    out.innerHTML=\`<span class="big">\${bf.toFixed(1)}%</span><p class="hint">Category: \${category}</p>\`;
  });
})();`
);

// ─── 122 ── Hydration Calculator ───────────────────────────────────────────────
tool('hydrationcalc', 'health', '💧',
  `<form id="hyd-form"><div class="row"><div class="field"><label for="hyd-weight">{{ui.weight}}</label><input type="number" id="hyd-weight" step="any" min="1" placeholder="70" inputmode="decimal"></div><div class="field"><label for="hyd-wunit">{{ui.unit}}</label><select id="hyd-wunit"><option value="kg">kg</option><option value="lbs">lbs</option></select></div><div class="field"><label for="hyd-activity">{{ui.activity}}</label><select id="hyd-activity"><option value="sedentary">{{ui.sedentary}}</option><option value="light">{{ui.light}}</option><option value="moderate">{{ui.moderate}}</option><option value="intense">{{ui.intense}}</option></select></div></div><div class="row" style="justify-content:center"><button class="btn" type="submit">{{ui.calculate}}</button></div></form><div id="hyd-out" hidden class="result" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:0.5rem"></div>`,
  { title:'Daily Water Intake Calculator — how much water should you drink?', metaDescription:'Free water intake calculator. Enter your weight and activity level to find your recommended daily water intake in litres, cups and ounces.', h1:'Daily Water Intake Calculator', intro:'Enter your weight and activity level to calculate your recommended daily water intake.', faq_title:'Water intake FAQ', ui:{ weight:'Body weight', unit:'Unit', activity:'Activity level', sedentary:'Sedentary', light:'Light exercise', moderate:'Moderate exercise', intense:'Intense exercise', calculate:'Calculate' }, faq:[
    { q:'How is the water recommendation calculated?', a:'The base recommendation is approximately 35 ml per kg of body weight. Activity adjustments add 350–700 ml depending on intensity. The EFSA recommends 2L/day for women and 2.5L/day for men as a general guideline.' },
    { q:'Does coffee and tea count?', a:'Yes. Despite the mild diuretic effect of caffeine, research shows that moderate coffee and tea consumption counts toward daily fluid intake. Beverages like soup, milk and juice also contribute.' },
    { q:'What are signs of dehydration?', a:'Dark urine, infrequent urination, dry mouth, headaches, and fatigue are common signs. Well-hydrated urine should be pale yellow. Thirst is a late indicator — don\'t wait to feel thirsty before drinking.' }
  ]},
  { title:'Calculadora de Ingestão Diária de Água — quanto você deve beber?', metaDescription:'Calculadora de ingestão de água gratuita. Insira seu peso e nível de atividade para encontrar a ingestão diária recomendada de água em litros, copos e onças.', h1:'Calculadora de Ingestão Diária de Água', intro:'Insira seu peso e nível de atividade para calcular a ingestão diária de água recomendada.', faq_title:'Perguntas frequentes sobre ingestão de água', ui:{ weight:'Peso corporal', unit:'Unidade', activity:'Nível de atividade', sedentary:'Sedentário', light:'Exercício leve', moderate:'Exercício moderado', intense:'Exercício intenso', calculate:'Calcular' }, faq:[
    { q:'Como a recomendação de água é calculada?', a:'A recomendação base é aproximadamente 35 ml por kg de peso corporal. Ajustes de atividade adicionam 350–700 ml dependendo da intensidade.' },
    { q:'Café e chá contam?', a:'Sim. Apesar do leve efeito diurético da cafeína, pesquisas mostram que o consumo moderado de café e chá contribui para a ingestão diária de líquidos.' },
    { q:'Quais são os sinais de desidratação?', a:'Urina escura, urina pouco frequente, boca seca, dores de cabeça e fadiga são sinais comuns. A sede é um indicador tardio — não espere sentir sede para beber.' }
  ]},
  `(function(){
  const activity={sedentary:0,light:350,moderate:500,intense:700};
  document.getElementById('hyd-form').addEventListener('submit',function(e){
    e.preventDefault();
    let w=parseFloat(document.getElementById('hyd-weight').value)||70;
    const unit=document.getElementById('hyd-wunit').value;
    const act=document.getElementById('hyd-activity').value;
    if(unit==='lbs')w*=0.453592;
    const ml=Math.round(w*35+activity[act]);
    const litres=(ml/1000).toFixed(2);
    const cups=(ml/237).toFixed(1);
    const oz=(ml*0.033814).toFixed(1);
    const items=[['Litres',litres+' L'],['Cups',cups+' cups'],['Fluid oz',oz+' fl oz'],['Millilitres',ml+' ml']];
    const out=document.getElementById('hyd-out');
    out.hidden=false;
    out.innerHTML=items.map(([k,v])=>\`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">\${k}</div><strong>\${v}</strong></div>\`).join('');
  });
})();`
);

// ─── 123 ── Running Pace Calculator ───────────────────────────────────────────
tool('pacecalc', 'health', '🏃',
  `<form id="pace-form"><p style="opacity:0.7;font-size:0.875rem">{{ui.instruction}}</p><div class="row"><div class="field"><label for="pace-dist">{{ui.distance}}</label><input type="number" id="pace-dist" step="any" min="0" placeholder="5" inputmode="decimal"></div><div class="field"><label for="pace-dunit">{{ui.unit}}</label><select id="pace-dunit"><option value="km">km</option><option value="mi">miles</option></select></div></div><div class="row"><div class="field"><label for="pace-h">{{ui.hours}}</label><input type="number" id="pace-h" min="0" max="23" step="1" placeholder="0" inputmode="numeric"></div><div class="field"><label for="pace-m">{{ui.minutes}}</label><input type="number" id="pace-m" min="0" max="59" step="1" placeholder="25" inputmode="numeric"></div><div class="field"><label for="pace-s">{{ui.seconds}}</label><input type="number" id="pace-s" min="0" max="59" step="1" placeholder="0" inputmode="numeric"></div></div><div class="row" style="justify-content:center"><button class="btn" type="submit">{{ui.calculate}}</button></div></form><div id="pace-out" hidden class="result" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:0.5rem"></div>`,
  { title:'Running Pace Calculator — pace, speed and finish time', metaDescription:'Free running pace calculator. Enter distance and time to calculate pace per km or mile, speed, and equivalent race finish times.', h1:'Running Pace Calculator', intro:'Enter your distance and finish time to calculate your running pace, speed, and equivalent times for common race distances.', faq_title:'Running pace FAQ', ui:{ instruction:'Enter distance and time to calculate pace', distance:'Distance', unit:'Unit', hours:'Hours', minutes:'Minutes', seconds:'Seconds', calculate:'Calculate' }, faq:[
    { q:'What is running pace?', a:'Running pace is the time it takes to cover one unit of distance, typically expressed as minutes:seconds per kilometre or per mile. For example, 5:30/km means running 1 km in 5 minutes and 30 seconds.' },
    { q:'How do I convert between km and mile pace?', a:'Divide your min/km pace by 0.621371 to get min/mile. Or multiply min/mile by 0.621371 to get min/km. For example, 6:00/km = 9:39/mile.' },
    { q:'What is a good 5K time?', a:'For recreational runners, completing a 5K in under 30 minutes (6:00/km pace) is a common target. Competitive amateur runners aim for under 25 minutes (5:00/km). Elite runners run under 15 minutes.' }
  ]},
  { title:'Calculadora de Ritmo de Corrida — pace, velocidade e tempo de chegada', metaDescription:'Calculadora de ritmo de corrida gratuita. Insira distância e tempo para calcular o pace por km ou milha, velocidade e tempos equivalentes de corridas comuns.', h1:'Calculadora de Ritmo de Corrida', intro:'Insira sua distância e tempo de chegada para calcular seu ritmo de corrida, velocidade e tempos equivalentes para distâncias comuns de corrida.', faq_title:'Perguntas frequentes sobre ritmo de corrida', ui:{ instruction:'Insira distância e tempo para calcular o pace', distance:'Distância', unit:'Unidade', hours:'Horas', minutes:'Minutos', seconds:'Segundos', calculate:'Calcular' }, faq:[
    { q:'O que é pace de corrida?', a:'O pace é o tempo necessário para percorrer uma unidade de distância, tipicamente expresso em minutos:segundos por quilômetro ou por milha.' },
    { q:'Como converter entre pace em km e em milha?', a:'Divida seu pace em min/km por 0,621371 para obter min/milha. Por exemplo, 6:00/km = 9:39/milha.' },
    { q:'Qual é um bom tempo para 5K?', a:'Para corredores recreativos, completar um 5K em menos de 30 minutos (6:00/km) é uma meta comum. Corredores amadores competitivos visam menos de 25 minutos.' }
  ]},
  `(function(){
  function fmt(totalSecs){const h=Math.floor(totalSecs/3600),m=Math.floor((totalSecs%3600)/60),s=Math.round(totalSecs%60);return(h?h+':':'')+(m<10&&h?'0':'')+m+':'+(s<10?'0':'')+s;}
  document.getElementById('pace-form').addEventListener('submit',function(e){
    e.preventDefault();
    const dist=parseFloat(document.getElementById('pace-dist').value)||0;
    const unit=document.getElementById('pace-dunit').value;
    const h=parseInt(document.getElementById('pace-h').value)||0;
    const m=parseInt(document.getElementById('pace-m').value)||0;
    const s=parseInt(document.getElementById('pace-s').value)||0;
    const totalSecs=h*3600+m*60+s;
    if(!dist||!totalSecs)return;
    const distKm=unit==='km'?dist:dist*1.60934;
    const paceSecPerKm=totalSecs/distKm;
    const paceSecPerMi=paceSecPerKm/0.621371;
    const speedKmh=distKm/totalSecs*3600;
    const speedMph=speedKmh*0.621371;
    const races=[['5K',5],['10K',10],['Half-marathon',21.0975],['Marathon',42.195]];
    const items=[['Pace /km',fmt(paceSecPerKm)],['Pace /mi',fmt(paceSecPerMi)],['Speed (km/h)',speedKmh.toFixed(2)],['Speed (mph)',speedMph.toFixed(2)],...races.map(([n,d])=>[n,fmt(paceSecPerKm*d)])];
    const out=document.getElementById('pace-out');
    out.hidden=false;
    out.innerHTML=items.map(([k,v])=>\`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">\${k}</div><strong>\${v}</strong></div>\`).join('');
  });
})();`
);

// ─── 124 ── Ovulation / Fertile Window Calculator ─────────────────────────────
tool('ovulationcalc', 'health', '🌸',
  `<form id="ov-form"><div class="row"><div class="field"><label for="ov-last">{{ui.lastPeriod}}</label><input type="date" id="ov-last"></div><div class="field"><label for="ov-cycle">{{ui.cycleLength}}</label><input type="number" id="ov-cycle" min="21" max="45" value="28" inputmode="numeric"></div></div><div class="row" style="justify-content:center"><button class="btn" type="submit">{{ui.calculate}}</button></div></form><div id="ov-out" hidden class="result" style="text-align:left"></div>`,
  { title:'Ovulation Calculator — find your fertile window and next period', metaDescription:'Free ovulation calculator. Enter your last period and cycle length to estimate your ovulation date, fertile window and next period date.', h1:'Ovulation Calculator', intro:'Enter the first day of your last period and your average cycle length to estimate your ovulation date and fertile window.', faq_title:'Ovulation calculator FAQ', ui:{ lastPeriod:'First day of last period', cycleLength:'Average cycle length (days)', calculate:'Calculate' }, faq:[
    { q:'When does ovulation occur?', a:'Ovulation typically occurs 14 days before the next period, not 14 days after the last one. For a 28-day cycle, that is day 14. For a 30-day cycle, it is around day 16. Cycle length varies considerably between women.' },
    { q:'What is the fertile window?', a:'Sperm can survive in the female reproductive tract for up to 5 days, while an egg is only viable for 12–24 hours after release. The fertile window is approximately 5 days before ovulation plus the day of ovulation — about 6 days total.' },
    { q:'How accurate is this calculator?', a:'This calculator uses averages and may not accurately reflect your individual cycle. Ovulation timing varies with stress, illness, weight changes, and other factors. Use ovulation predictor kits (OPKs) or track basal body temperature for greater accuracy.' }
  ]},
  { title:'Calculadora de Ovulação — encontre sua janela fértil e próxima menstruação', metaDescription:'Calculadora de ovulação gratuita. Insira sua última menstruação e duração do ciclo para estimar a data de ovulação, janela fértil e próxima menstruação.', h1:'Calculadora de Ovulação', intro:'Insira o primeiro dia da sua última menstruação e a duração média do ciclo para estimar a data de ovulação e a janela fértil.', faq_title:'Perguntas frequentes sobre ovulação', ui:{ lastPeriod:'Primeiro dia da última menstruação', cycleLength:'Duração média do ciclo (dias)', calculate:'Calcular' }, faq:[
    { q:'Quando ocorre a ovulação?', a:'A ovulação normalmente ocorre 14 dias antes da próxima menstruação. Para um ciclo de 28 dias, isso é no dia 14. Para um ciclo de 30 dias, em torno do dia 16.' },
    { q:'O que é a janela fértil?', a:'Os espermatozoides podem sobreviver no trato reprodutivo feminino por até 5 dias, enquanto o óvulo só é viável por 12–24 horas após a liberação. A janela fértil é de aproximadamente 5 dias antes da ovulação mais o dia da ovulação.' },
    { q:'Quão precisa é esta calculadora?', a:'Esta calculadora usa médias e pode não refletir com precisão seu ciclo individual. A hora da ovulação varia com estresse, doenças, mudanças de peso e outros fatores.' }
  ]},
  `(function(){
  document.getElementById('ov-form').addEventListener('submit',function(e){
    e.preventDefault();
    const last=new Date(document.getElementById('ov-last').value);
    const cycle=parseInt(document.getElementById('ov-cycle').value)||28;
    if(isNaN(last.getTime()))return;
    const addDays=(d,n)=>{const r=new Date(d);r.setDate(r.getDate()+n);return r;};
    const fmt=d=>d.toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'});
    const ovulation=addDays(last,cycle-14);
    const fertileStart=addDays(ovulation,-5);
    const fertileEnd=addDays(ovulation,1);
    const nextPeriod=addDays(last,cycle);
    const out=document.getElementById('ov-out');
    out.hidden=false;
    out.innerHTML=\`<div style="display:grid;gap:0.5rem">\${[['Ovulation (estimated)',fmt(ovulation)],['Fertile window starts',fmt(fertileStart)],['Fertile window ends',fmt(fertileEnd)],['Next period (estimated)',fmt(nextPeriod)]].map(([k,v])=>\`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><span style="opacity:0.6;font-size:0.85rem">\${k}</span><br><strong>\${v}</strong></div>\`).join('')}</div><p style="margin-top:0.75rem;opacity:0.6;font-size:0.8rem">These are estimates based on average cycles. For medical decisions, consult a healthcare provider.</p>\`;
  });
})();`
);

// ─── 125 ── Calorie Burn Calculator ───────────────────────────────────────────
tool('calorieburn', 'health', '🔥',
  `<form id="cb-form"><div class="row"><div class="field"><label for="cb-weight">{{ui.weight}}</label><input type="number" id="cb-weight" step="any" min="1" placeholder="70" inputmode="decimal"></div><div class="field"><label for="cb-wunit">{{ui.unit}}</label><select id="cb-wunit"><option value="kg">kg</option><option value="lbs">lbs</option></select></div><div class="field"><label for="cb-minutes">{{ui.duration}}</label><input type="number" id="cb-minutes" min="1" max="300" step="1" placeholder="30" inputmode="numeric"></div></div><div class="field"><label for="cb-activity">{{ui.activity}}</label><select id="cb-activity"></select></div><div class="row" style="justify-content:center"><button class="btn" type="submit">{{ui.calculate}}</button></div></form><div id="cb-out" hidden class="result"><span class="big" id="cb-cal">—</span><p class="hint" id="cb-hint"></p></div>`,
  { title:'Calorie Burn Calculator — calories burned by activity', metaDescription:'Free calorie burn calculator. Select an activity, enter your weight and duration to estimate calories burned. Uses MET values for accuracy.', h1:'Calorie Burn Calculator', intro:'Select an activity, enter your weight and duration to estimate how many calories you burn.', faq_title:'Calorie burn FAQ', ui:{ weight:'Body weight', unit:'Unit', duration:'Duration (minutes)', activity:'Activity', calculate:'Calculate' }, faq:[
    { q:'How are calories burned calculated?', a:'Using METs (Metabolic Equivalents). Calories burned = MET × weight(kg) × hours. A MET of 1 is resting metabolism. Running at 10 km/h has a MET of about 10, burning 10× more than at rest.' },
    { q:'How accurate are these estimates?', a:'MET-based estimates are accurate to within ±15–20% on average. Individual factors like fitness level, heat, humidity, terrain and exact speed affect actual burn. Wearables with heart rate monitoring are more accurate.' },
    { q:'Does strength training burn fewer calories than cardio?', a:'Per minute of activity, yes. Running burns more calories per minute than lifting weights. However, strength training builds muscle which increases resting metabolic rate, burning more calories throughout the day.' }
  ]},
  { title:'Calculadora de Calorias Queimadas — calorias por atividade', metaDescription:'Calculadora de calorias queimadas gratuita. Selecione uma atividade, insira seu peso e duração para estimar calorias queimadas. Usa valores MET para precisão.', h1:'Calculadora de Calorias Queimadas', intro:'Selecione uma atividade, insira seu peso e duração para estimar quantas calorias você queima.', faq_title:'Perguntas frequentes sobre calorias queimadas', ui:{ weight:'Peso corporal', unit:'Unidade', duration:'Duração (minutos)', activity:'Atividade', calculate:'Calcular' }, faq:[
    { q:'Como as calorias queimadas são calculadas?', a:'Usando METs (Equivalentes Metabólicos). Calorias queimadas = MET × peso(kg) × horas. Um MET de 1 é o metabolismo em repouso. Correr a 10 km/h tem um MET de cerca de 10.' },
    { q:'Quão precisas são essas estimativas?', a:'Estimativas baseadas em MET são precisas dentro de ±15–20% em média. Nível de condicionamento, calor, umidade, terreno e velocidade exata afetam a queima real.' },
    { q:'O treino de força queima menos calorias que o cardio?', a:'Por minuto de atividade, sim. Mas o treino de força constrói massa muscular, aumentando o metabolismo em repouso e queimando mais calorias ao longo do dia.' }
  ]},
  `(function(){
  const activities=[['Walking (slow, 3 km/h)',2.5],['Walking (moderate, 5 km/h)',3.5],['Walking (brisk, 6 km/h)',4.3],['Hiking',6.0],['Running (8 km/h)',8.0],['Running (10 km/h)',10.0],['Running (12 km/h)',11.5],['Running (marathon pace)',13.3],['Cycling (leisure)',4.0],['Cycling (16 km/h)',6.0],['Cycling (22 km/h)',10.0],['Swimming (leisure)',5.8],['Swimming laps (vigorous)',9.8],['Weight training',3.5],['HIIT',8.0],['Yoga',2.5],['Pilates',3.0],['Jump rope',11.8],['Dancing',5.0],['Soccer',7.0],['Basketball',6.5],['Tennis',7.3],['Volleyball',4.0],['Rock climbing',8.0],['Rowing machine (moderate)',7.0],['Elliptical (moderate)',5.0],['Stair climbing',9.0],['Gardening',3.5],['Housework',3.0]];
  const sel=document.getElementById('cb-activity');
  activities.forEach(([name,met])=>{const o=document.createElement('option');o.value=met;o.textContent=name;sel.appendChild(o);});
  document.getElementById('cb-form').addEventListener('submit',function(e){
    e.preventDefault();
    let w=parseFloat(document.getElementById('cb-weight').value)||70;
    if(document.getElementById('cb-wunit').value==='lbs')w*=0.453592;
    const mins=parseFloat(document.getElementById('cb-minutes').value)||30;
    const met=parseFloat(sel.value);
    const cal=Math.round(met*w*(mins/60));
    document.getElementById('cb-cal').textContent=cal+' kcal';
    document.getElementById('cb-hint').textContent='Approximate — individual results vary';
    document.getElementById('cb-out').hidden=false;
  });
})();`
);

// ─── 126 ── Pregnancy Due Date Calculator ─────────────────────────────────────
tool('duedatecalc', 'health', '👶',
  `<form id="dd-form"><div class="field"><label for="dd-method">{{ui.method}}</label><select id="dd-method"><option value="lmp">{{ui.lmp}}</option><option value="conception">{{ui.conception}}</option></select></div><div class="field"><label for="dd-date" id="dd-date-label">{{ui.lmpDate}}</label><input type="date" id="dd-date"></div><div class="row" style="justify-content:center"><button class="btn" type="submit">{{ui.calculate}}</button></div></form><div id="dd-out" hidden class="result" style="text-align:left"></div>`,
  { title:'Pregnancy Due Date Calculator — estimate your expected delivery date', metaDescription:'Free pregnancy due date calculator. Enter your last menstrual period or conception date to estimate your due date and current week of pregnancy.', h1:'Pregnancy Due Date Calculator', intro:'Enter the first day of your last menstrual period or conception date to estimate your due date.', faq_title:'Due date calculator FAQ', ui:{ method:'Calculation method', lmp:'Last menstrual period (LMP)', conception:'Conception date', lmpDate:'First day of last period', conceptionDate:'Conception date', calculate:'Calculate' }, faq:[
    { q:'How is the due date calculated?', a:'Using Naegele\'s rule: add 280 days (40 weeks) to the first day of the last menstrual period. This assumes a 28-day cycle with ovulation on day 14. From conception date, add 266 days (38 weeks).' },
    { q:'How accurate is this due date?', a:'Only about 5% of babies are born on their exact due date. Most births occur within 2 weeks before or after. The due date is an estimate — it helps track fetal development and plan care.' },
    { q:'What does gestational age mean?', a:'Gestational age is measured from the first day of the last menstrual period, not from conception. So at conception (typically week 2 of the cycle), gestational age is already 2 weeks. Full term is 40 weeks gestational age.' }
  ]},
  { title:'Calculadora de Data Prevista do Parto — estime sua data esperada de parto', metaDescription:'Calculadora de data prevista do parto gratuita. Insira a data da sua última menstruação ou data de concepção para estimar a data do parto e a semana atual de gravidez.', h1:'Calculadora de Data Prevista do Parto', intro:'Insira o primeiro dia da sua última menstruação ou a data de concepção para estimar a data do parto.', faq_title:'Perguntas frequentes sobre data prevista do parto', ui:{ method:'Método de cálculo', lmp:'Última menstruação (DUM)', conception:'Data de concepção', lmpDate:'Primeiro dia da última menstruação', conceptionDate:'Data de concepção', calculate:'Calcular' }, faq:[
    { q:'Como a data prevista do parto é calculada?', a:'Usando a regra de Naegele: adicionam-se 280 dias (40 semanas) ao primeiro dia da última menstruação. A partir da data de concepção, somam-se 266 dias (38 semanas).' },
    { q:'Quão precisa é essa data prevista?', a:'Apenas cerca de 5% dos bebês nascem exatamente na data prevista. A maioria nasce dentro de 2 semanas antes ou depois. É uma estimativa para rastrear o desenvolvimento fetal.' },
    { q:'O que significa idade gestacional?', a:'A idade gestacional é medida a partir do primeiro dia da última menstruação, não da concepção. No nascimento a termo são 40 semanas de idade gestacional.' }
  ]},
  `(function(){
  const sel=document.getElementById('dd-method');
  const lbl=document.getElementById('dd-date-label');
  sel.addEventListener('change',function(){lbl.textContent=this.value==='lmp'?'First day of last period':'Conception date';});
  document.getElementById('dd-form').addEventListener('submit',function(e){
    e.preventDefault();
    const date=new Date(document.getElementById('dd-date').value);
    if(isNaN(date.getTime()))return;
    const method=sel.value;
    const addDays=(d,n)=>{const r=new Date(d);r.setDate(r.getDate()+n);return r;};
    const dueDate=method==='lmp'?addDays(date,280):addDays(date,266);
    const today=new Date();
    const conception=method==='lmp'?addDays(date,14):date;
    const weeksPregnant=Math.floor((today-conception)/(7*24*3600*1000));
    const weeksLeft=Math.floor((dueDate-today)/(7*24*3600*1000));
    const fmt=d=>d.toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'});
    const trimester=weeksPregnant<=13?'1st':weeksPregnant<=26?'2nd':'3rd';
    const out=document.getElementById('dd-out');
    out.hidden=false;
    out.innerHTML=[['Estimated due date',fmt(dueDate)],['Weeks pregnant',weeksPregnant>=0?weeksPregnant+' weeks':'Not yet'],['Weeks remaining',weeksLeft>0?weeksLeft+' weeks':'Born / overdue'],['Trimester',weeksPregnant>=0&&weeksPregnant<=42?trimester:'—'],['Conception date',fmt(conception)]].map(([k,v])=>\`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem;margin-bottom:0.4rem"><span style="opacity:0.6;font-size:0.85rem">\${k}</span><br><strong>\${v}</strong></div>\`).join('')+'<p style="margin-top:0.75rem;opacity:0.6;font-size:0.8rem">For medical decisions, consult your OB/GYN or midwife.</p>';
  });
})();`
);

// ─── 127 ── Dog Age Calculator ────────────────────────────────────────────────
tool('dogage', 'fun', '🐕',
  `<form id="da-form"><div class="row"><div class="field"><label for="da-age">{{ui.dogAge}}</label><input type="number" id="da-age" min="0" max="25" step="0.5" placeholder="5" inputmode="decimal"></div><div class="field"><label for="da-size">{{ui.size}}</label><select id="da-size"><option value="small">{{ui.small}} (<20 lbs)</option><option value="medium" selected>{{ui.medium}} (20-50 lbs)</option><option value="large">{{ui.large}} (>50 lbs)</option></select></div><button class="btn" type="submit">{{ui.calculate}}</button></div></form><div class="result" id="da-out">—</div>`,
  { title:'Dog Age Calculator — convert dog years to human years', metaDescription:'Free dog age calculator. Convert your dog\'s age to human years based on size. Uses updated scientific research, not the outdated 7× rule.', h1:'Dog Age Calculator', intro:'Enter your dog\'s age and size to see their age in human years — using the updated scientific formula, not the outdated "multiply by 7" rule.', faq_title:'Dog age FAQ', ui:{ dogAge:'Dog age (years)', size:'Dog size', small:'Small', medium:'Medium', large:'Large', calculate:'Calculate' }, faq:[
    { q:'Is the "multiply by 7" rule accurate?', a:'No. Dogs mature much faster than humans in their early years (a 1-year-old dog is sexually mature, equivalent to a young adult human) and larger dogs age faster than smaller ones. A 2019 study from UC San Diego developed a more accurate logarithmic formula based on DNA methylation patterns.' },
    { q:'Why do larger dogs have shorter lifespans?', a:'Large dogs age at a faster rate. The leading hypothesis is that the accelerated growth rate in large dogs leads to higher rates of abnormal cell growth (cancer). Small dogs like Chihuahuas can live 15–20 years; Great Danes average only 7–10.' },
    { q:'At what age is a dog considered senior?', a:'Small dogs: 10–12 years. Medium dogs: 8–10 years. Large dogs: 6–8 years. In human-equivalent terms, these correspond roughly to a human in their 50s–60s.' }
  ]},
  { title:'Calculadora de Idade de Cão — converta anos caninos em humanos', metaDescription:'Calculadora de idade de cão gratuita. Converta a idade do seu cão para anos humanos baseado no tamanho. Usa pesquisa científica atualizada, não a regra obsoleta de multiplicar por 7.', h1:'Calculadora de Idade de Cão', intro:'Insira a idade e o tamanho do seu cão para ver a idade em anos humanos — usando a fórmula científica atualizada.', faq_title:'Perguntas frequentes sobre idade de cão', ui:{ dogAge:'Idade do cão (anos)', size:'Tamanho do cão', small:'Pequeno', medium:'Médio', large:'Grande', calculate:'Calcular' }, faq:[
    { q:'A regra de "multiplicar por 7" é precisa?', a:'Não. Cães amadurecem muito mais rapidamente nos primeiros anos e cães maiores envelhecem mais rápido que menores. Um estudo de 2019 da UC San Diego desenvolveu uma fórmula logarítmica mais precisa.' },
    { q:'Por que cães maiores têm vida mais curta?', a:'Cães grandes envelhecem mais rápido. A hipótese principal é que a taxa de crescimento acelerada leva a taxas mais altas de crescimento celular anormal. Cães pequenos podem viver 15–20 anos; Grandes Dinamarqueses têm média de 7–10.' },
    { q:'Com que idade um cão é considerado sênior?', a:'Cães pequenos: 10–12 anos. Médios: 8–10 anos. Grandes: 6–8 anos.' }
  ]},
  `(function(){
  // Size-adjusted human-equivalent ages
  const lookup={
    small:[0,13,18,22,26,30,34,38,42,46,50,54,58,62,66,70,74,78,82,86,90,94,98,102,106,110],
    medium:[0,15,22,27,32,36,40,44,48,52,56,60,64,68,72,76,80,84,88,92,96,100,104,108,112,116],
    large:[0,18,25,32,38,44,50,56,62,68,74,80,86,92,98,104,110,116,122,128,134,140,146,152,158,164]
  };
  document.getElementById('da-form').addEventListener('submit',function(e){
    e.preventDefault();
    const dogAge=parseFloat(document.getElementById('da-age').value);
    const size=document.getElementById('da-size').value;
    if(isNaN(dogAge)||dogAge<0)return;
    const idx=Math.min(Math.floor(dogAge),25);
    const frac=dogAge-idx;
    const ages=lookup[size];
    const humanAge=idx<25?ages[idx]+frac*(ages[idx+1]-ages[idx]):ages[25];
    document.getElementById('da-out').innerHTML=\`<span class="big">\${Math.round(humanAge)}</span><p class="hint">human-equivalent years old</p>\`;
  });
})();`
);

// ─── 128 ── Cat Age Calculator ────────────────────────────────────────────────
tool('catage', 'fun', '🐱',
  `<form id="ca-form"><div class="row"><div class="field"><label for="ca-age">{{ui.catAge}}</label><input type="number" id="ca-age" min="0" max="25" step="0.5" placeholder="3" inputmode="decimal"></div><button class="btn" type="submit">{{ui.calculate}}</button></div></form><div class="result" id="ca-out">—</div>`,
  { title:'Cat Age Calculator — convert cat years to human years', metaDescription:'Free cat age calculator. Convert your cat\'s age to human years using the AAHA-recognized formula. Cats age faster in their first two years.', h1:'Cat Age Calculator', intro:'Enter your cat\'s age to see their equivalent age in human years, using the recognized veterinary formula.', faq_title:'Cat age FAQ', ui:{ catAge:'Cat age (years)', calculate:'Calculate' }, faq:[
    { q:'How old is a 1-year-old cat in human years?', a:'A 1-year-old cat is approximately 15 human years old. By age 2, they are roughly 24 in human terms. After that, each additional cat year adds approximately 4 human years.' },
    { q:'How long do cats live?', a:'Indoor cats average 12–18 years. Outdoor cats average 2–5 years due to hazards. The oldest verified cat (Creme Puff) lived to 38 years.' },
    { q:'At what age is a cat considered senior?', a:'Veterinarians generally classify cats as "mature" at 7–10 years (equivalent to human 44–60) and "senior" at 11–14 years. Cats 15 and older are "super senior" or geriatric.' }
  ]},
  { title:'Calculadora de Idade de Gato — converta anos felinos em humanos', metaDescription:'Calculadora de idade de gato gratuita. Converta a idade do seu gato para anos humanos usando a fórmula reconhecida pela AAHA.', h1:'Calculadora de Idade de Gato', intro:'Insira a idade do seu gato para ver a idade equivalente em anos humanos, usando a fórmula veterinária reconhecida.', faq_title:'Perguntas frequentes sobre idade de gato', ui:{ catAge:'Idade do gato (anos)', calculate:'Calcular' }, faq:[
    { q:'Quantos anos humanos tem um gato de 1 ano?', a:'Um gato de 1 ano tem aproximadamente 15 anos humanos. Aos 2 anos, cerca de 24. Após isso, cada ano de gato adiciona aproximadamente 4 anos humanos.' },
    { q:'Quanto tempo os gatos vivem?', a:'Gatos domésticos têm em média 12–18 anos. O gato mais velho verificado (Creme Puff) viveu 38 anos.' },
    { q:'Com que idade um gato é considerado sênior?', a:'Veterinários geralmente classificam gatos como "maduros" aos 7–10 anos e "sêniors" aos 11–14 anos. Gatos com 15 ou mais são "super sêniors".' }
  ]},
  `(function(){
  function toHuman(cat){
    if(cat<=1)return Math.round(15*cat);
    if(cat<=2)return Math.round(15+(cat-1)*9);
    return Math.round(24+(cat-2)*4);
  }
  document.getElementById('ca-form').addEventListener('submit',function(e){
    e.preventDefault();
    const age=parseFloat(document.getElementById('ca-age').value);
    if(isNaN(age)||age<0)return;
    const human=toHuman(age);
    const stage=age<2?'Kitten':age<3?'Junior':age<6?'Prime':age<10?'Mature':age<15?'Senior':'Super Senior';
    document.getElementById('ca-out').innerHTML=\`<span class="big">\${human}</span><p class="hint">human-equivalent years · Life stage: \${stage}</p>\`;
  });
})();`
);

// ─── 129 ── Timezone Converter (multi-city) ────────────────────────────────────
tool('timezoneconverter', 'time', '🕰️',
  `<div id="tzc-app"><div class="row"><div class="field"><label for="tzc-time">{{ui.time}}</label><input type="datetime-local" id="tzc-time"></div><div class="field"><label for="tzc-from">{{ui.from}}</label><select id="tzc-from"></select></div></div><div id="tzc-out" style="margin-top:0.75rem;display:grid;gap:0.4rem"></div></div>`,
  { title:'Time Zone Converter — convert time between world cities', metaDescription:'Free time zone converter. Convert any date and time between 40+ world cities and timezones instantly. Shows current time in all cities.', h1:'Time Zone Converter', intro:'Select a time and your local timezone to see the equivalent time in major cities around the world.', faq_title:'Time zone converter FAQ', ui:{ time:'Date & time', from:'Your timezone' }, faq:[
    { q:'What is UTC?', a:'UTC (Coordinated Universal Time) is the primary time standard by which the world regulates clocks. It is essentially the same as GMT (Greenwich Mean Time) and does not observe daylight saving time.' },
    { q:'What is daylight saving time?', a:'DST shifts clocks 1 hour forward in spring and back in autumn to make better use of daylight. Not all countries observe DST — most of Asia, Africa and South America do not.' },
    { q:'Why are some cities in unusual offsets?', a:'India uses UTC+5:30, Nepal UTC+5:45, and Iran UTC+3:30 — half-hour and 45-minute offsets. These are official decisions made for political, geographic or agricultural reasons.' }
  ]},
  { title:'Conversor de Fuso Horário — converter hora entre cidades do mundo', metaDescription:'Conversor de fuso horário gratuito. Converta qualquer data e hora entre 40+ cidades e fusos horários do mundo instantaneamente.', h1:'Conversor de Fuso Horário', intro:'Selecione uma hora e seu fuso horário local para ver a hora equivalente nas principais cidades do mundo.', faq_title:'Perguntas frequentes sobre fuso horário', ui:{ time:'Data e hora', from:'Seu fuso horário' }, faq:[
    { q:'O que é UTC?', a:'UTC (Tempo Universal Coordenado) é o principal padrão de tempo pelo qual o mundo regula os relógios. É essencialmente o mesmo que GMT e não observa horário de verão.' },
    { q:'O que é horário de verão?', a:'O horário de verão adianta os relógios 1 hora na primavera e os atrasa no outono para melhor aproveitar a luz do dia. Nem todos os países observam o horário de verão.' },
    { q:'Por que algumas cidades têm deslocamentos incomuns?', a:'A Índia usa UTC+5:30, o Nepal UTC+5:45 e o Irã UTC+3:30 — deslocamentos de meia hora e 45 minutos. São decisões oficiais por razões políticas, geográficas ou agrícolas.' }
  ]},
  `(function(){
  const zones=[
    ['UTC','UTC'],['London','Europe/London'],['Paris','Europe/Paris'],['Berlin','Europe/Berlin'],
    ['Rome','Europe/Rome'],['Madrid','Europe/Madrid'],['Amsterdam','Europe/Amsterdam'],
    ['Stockholm','Europe/Stockholm'],['Moscow','Europe/Moscow'],['Istanbul','Europe/Istanbul'],
    ['Dubai','Asia/Dubai'],['Riyadh','Asia/Riyadh'],['Karachi','Asia/Karachi'],
    ['Mumbai','Asia/Kolkata'],['Kolkata','Asia/Kolkata'],['Dhaka','Asia/Dhaka'],
    ['Bangkok','Asia/Bangkok'],['Singapore','Asia/Singapore'],['Hong Kong','Asia/Hong_Kong'],
    ['Shanghai','Asia/Shanghai'],['Tokyo','Asia/Tokyo'],['Seoul','Asia/Seoul'],
    ['Sydney','Australia/Sydney'],['Melbourne','Australia/Melbourne'],['Auckland','Pacific/Auckland'],
    ['Honolulu','Pacific/Honolulu'],['Anchorage','America/Anchorage'],['Los Angeles','America/Los_Angeles'],
    ['Denver','America/Denver'],['Chicago','America/Chicago'],['New York','America/New_York'],
    ['Toronto','America/Toronto'],['São Paulo','America/Sao_Paulo'],['Buenos Aires','America/Argentina/Buenos_Aires'],
    ['Mexico City','America/Mexico_City'],['Lima','America/Lima'],['Bogotá','America/Bogota'],
    ['Santiago','America/Santiago'],['Caracas','America/Caracas'],['Nairobi','Africa/Nairobi'],
    ['Cairo','Africa/Cairo'],['Lagos','Africa/Lagos'],['Johannesburg','Africa/Johannesburg'],
  ];
  const fromSel=document.getElementById('tzc-from');
  zones.forEach(([city,tz])=>{const o=document.createElement('option');o.value=tz;o.textContent=city;fromSel.appendChild(o);});
  // Try to detect local timezone
  try{const local=Intl.DateTimeFormat().resolvedOptions().timeZone;const idx=zones.findIndex(([,tz])=>tz===local);if(idx>=0)fromSel.selectedIndex=idx;}catch(e){}
  const now=new Date();
  const pad=(n)=>String(n).padStart(2,'0');
  document.getElementById('tzc-time').value=\`\${now.getFullYear()}-\${pad(now.getMonth()+1)}-\${pad(now.getDate())}T\${pad(now.getHours())}:\${pad(now.getMinutes())}\`;
  function convert(){
    const val=document.getElementById('tzc-time').value;
    const fromTz=fromSel.value;
    if(!val)return;
    const localDate=new Date(val);
    const out=document.getElementById('tzc-out');
    out.innerHTML=zones.map(([city,tz])=>{
      const fmt=new Intl.DateTimeFormat('en-US',{timeZone:tz,month:'short',day:'numeric',hour:'2-digit',minute:'2-digit',hour12:false});
      const offset=new Intl.DateTimeFormat('en-US',{timeZone:tz,timeZoneName:'short'}).format(localDate).split(' ').pop();
      return \`<div style="display:flex;justify-content:space-between;align-items:center;padding:0.4rem 0.75rem;background:var(--surface);border:1px solid var(--line);border-radius:8px"><span>\${city}</span><span style="font-family:monospace;font-size:0.9rem"><strong>\${fmt.format(localDate)}</strong> <span style="opacity:0.5;font-size:0.8rem">\${offset}</span></span></div>\`;
    }).join('');
  }
  document.getElementById('tzc-time').addEventListener('input',convert);
  fromSel.addEventListener('change',convert);
  convert();
})();`
);

// ─── 130 ── Duration Calculator ────────────────────────────────────────────────
tool('durationcalc', 'time', '⏱️',
  `<div id="dc-app"><div class="row"><div class="field"><label for="dc-start">{{ui.start}}</label><input type="datetime-local" id="dc-start"></div><div class="field"><label for="dc-end">{{ui.end}}</label><input type="datetime-local" id="dc-end"></div></div><div id="dc-out" class="result" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:0.5rem;margin-top:0.75rem"></div></div>`,
  { title:'Date & Time Duration Calculator — time between two dates', metaDescription:'Free duration calculator. Select two dates and times to instantly see the exact duration in years, months, days, hours, minutes and seconds.', h1:'Date & Time Duration Calculator', intro:'Select a start and end date/time to calculate the exact duration between them in multiple units.', faq_title:'Duration calculator FAQ', ui:{ start:'Start date & time', end:'End date & time' }, faq:[
    { q:'Can I calculate past and future durations?', a:'Yes. You can set any two dates — past or future. The calculator shows the absolute duration regardless of order.' },
    { q:'How precise is the calculation?', a:'The calculation is precise to the second. The years and months values are approximate (using 365.25 days/year and 30.44 days/month) while days, hours, minutes and seconds are exact.' },
    { q:'What is the maximum duration I can calculate?', a:'There is no practical limit. You can calculate the duration between any two dates that your browser can handle — including thousands of years into the past or future.' }
  ]},
  { title:'Calculadora de Duração — tempo entre duas datas', metaDescription:'Calculadora de duração gratuita. Selecione duas datas e horas para ver a duração exata em anos, meses, dias, horas, minutos e segundos.', h1:'Calculadora de Duração de Data e Hora', intro:'Selecione uma data/hora de início e fim para calcular a duração exata entre elas em múltiplas unidades.', faq_title:'Perguntas frequentes sobre calculadora de duração', ui:{ start:'Data e hora de início', end:'Data e hora de fim' }, faq:[
    { q:'Posso calcular durações passadas e futuras?', a:'Sim. Você pode definir quaisquer duas datas — passadas ou futuras. A calculadora mostra a duração absoluta independentemente da ordem.' },
    { q:'Quão preciso é o cálculo?', a:'O cálculo é preciso ao segundo. Os valores de anos e meses são aproximados (usando 365,25 dias/ano e 30,44 dias/mês), enquanto dias, horas, minutos e segundos são exatos.' },
    { q:'Qual é a duração máxima que posso calcular?', a:'Não há limite prático. Você pode calcular a duração entre quaisquer duas datas que seu navegador possa lidar.' }
  ]},
  `(function(){
  function update(){
    const s=document.getElementById('dc-start').value;
    const e=document.getElementById('dc-end').value;
    const out=document.getElementById('dc-out');
    if(!s||!e){out.innerHTML='';return;}
    const ms=Math.abs(new Date(e)-new Date(s));
    const secs=Math.floor(ms/1000);
    const mins=Math.floor(secs/60);
    const hours=Math.floor(mins/60);
    const days=Math.floor(hours/24);
    const weeks=Math.floor(days/7);
    const months=Math.floor(days/30.44);
    const years=Math.floor(days/365.25);
    const h=hours%24,m=mins%60,sec=secs%60;
    const items=[['Years',years],['Months',months],['Weeks',weeks],['Days',days],['Hours',hours.toLocaleString()],['Minutes',mins.toLocaleString()],['Seconds',secs.toLocaleString()],['H:M:S',h+':'+String(m).padStart(2,'0')+':'+String(sec).padStart(2,'0')]];
    out.innerHTML=items.map(([k,v])=>\`<div style="background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:0.5rem 0.75rem"><div style="font-size:0.75rem;opacity:0.6">\${k}</div><strong>\${v}</strong></div>\`).join('');
  }
  const now=new Date();
  const yesterday=new Date(now.getTime()-86400000);
  const pad=(n)=>String(n).padStart(2,'0');
  const fmtDT=(d)=>\`\${d.getFullYear()}-\${pad(d.getMonth()+1)}-\${pad(d.getDate())}T\${pad(d.getHours())}:\${pad(d.getMinutes())}\`;
  document.getElementById('dc-start').value=fmtDT(yesterday);
  document.getElementById('dc-end').value=fmtDT(now);
  document.getElementById('dc-start').addEventListener('input',update);
  document.getElementById('dc-end').addEventListener('input',update);
  update();
})();`
);

console.log('\n✓ Batch 6 (tools 111-130) complete.');
