#!/usr/bin/env node
// Generates all remaining tool files: data/tools/*.json, data/content/*/{en,pt}.md, public/assets/tools/*.js
// Run: node build/gen-tools.mjs
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const p = (...s) => join(ROOT, ...s);

function write(rel, content) {
  const out = p(rel);
  if (existsSync(out)) { console.log(`  skip (exists): ${rel}`); return; }
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, content, 'utf8');
  console.log(`  wrote: ${rel}`);
}

function writeForce(rel, content) {
  const out = p(rel);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, content, 'utf8');
  console.log(`  wrote: ${rel}`);
}

// ─── TOOLS DEFINITION ──────────────────────────────────────────────────────
// Each entry: slug, category, icon, widget HTML (inline), script name, strings{en,pt}, content{en,pt}
const TOOLS = [

// ── ALREADY DONE (skip if exists) ──────────────────────────────────────────
// agecalc, backwardstext, binarytext, bmicalc, caseconverter, cointoss,
// discountcalc, loremipsum, magic8ball, palindromocheck, percentage,
// randomcolor, randomletter, randomnumber, roundingcalc, textrepeater,
// tipcalc, upsidedowntext, wordcount, yesorno
// salestax.js created but JSON+content missing → included below

// ── FINANCE (salestax already has .js) ─────────────────────────────────────
{
  slug:'salestax', category:'finance', icon:'🧾',
  script:'salestax.js',
  widget:`<form id="tax"><div class="row"><div class="field"><label for="tax-amt">{{ui.amount}}</label><input type="number" id="tax-amt" step="any" min="0" inputmode="decimal"></div><div class="field"><label for="tax-rate">{{ui.rate}}</label><input type="number" id="tax-rate" value="10" step="any" min="0" inputmode="decimal"></div><div class="field"><label for="tax-mode">{{ui.mode}}</label><select id="tax-mode"><option value="add">{{ui.add_tax}}</option><option value="remove">{{ui.remove_tax}}</option></select></div></div><div class="result"><span class="hint">{{ui.net}}: </span><b id="tax-net">—</b> · <span class="hint">{{ui.tax}}: </span><b id="tax-tax">—</b> · <span class="hint">{{ui.gross}}: </span><span class="big" id="tax-gross">—</span></div></form>`,
  en:{
    title:'Sales Tax Calculator — add or remove VAT from any price',
    metaDescription:'Free sales tax calculator. Enter a price and a tax rate to add tax to a net price or extract it from a gross price. Works for VAT, GST, and any percentage.',
    h1:'Sales Tax Calculator',
    intro:'Enter the amount and the tax rate, then choose whether to add tax to a net price or extract it from a gross amount. All three figures — net, tax, and gross — update as you type.',
    faq_title:'Sales tax calculator FAQ',
    ui:{amount:'Amount',rate:'Tax rate %',mode:'Mode',add_tax:'Add tax to price',remove_tax:'Extract tax from price',net:'Net (pre-tax)',tax:'Tax amount',gross:'Gross (total)'},
    faq:[
      {q:'What is the difference between adding and extracting tax?',a:'Adding tax takes a net price — the price before tax — and calculates the gross price you pay. Extracting tax does the reverse: you enter the gross price already including tax and the calculator works out how much of it is tax and what the pre-tax amount was.'},
      {q:'What tax rates should I use?',a:'Use whatever rate applies in your country or region. Common examples include 20% VAT in the UK, 19% in Germany, 10% GST in Australia, and varying sales tax rates by US state. Enter the number without the percent sign.'},
      {q:'Is anything I type uploaded?',a:'No. Everything runs in your browser with no server involved. The figures you enter disappear when you close the page.'}
    ]
  },
  pt:{
    title:'Calculadora de Imposto — adicione ou remova IVA de qualquer preço',
    metaDescription:'Calculadora de imposto grátis. Informe um preço e uma alíquota para adicionar imposto a um preço líquido ou extraí-lo de um preço bruto. Funciona para IVA, ICMS e qualquer percentual.',
    h1:'Calculadora de Imposto',
    intro:'Informe o valor e a alíquota, depois escolha se quer adicionar imposto a um preço líquido ou extraí-lo de um valor bruto. Os três valores — líquido, imposto e total — se atualizam enquanto você digita.',
    faq_title:'Perguntas frequentes da calculadora de imposto',
    ui:{amount:'Valor',rate:'Alíquota %',mode:'Modo',add_tax:'Adicionar imposto ao preço',remove_tax:'Extrair imposto do preço',net:'Líquido (sem imposto)',tax:'Valor do imposto',gross:'Bruto (total com imposto)'},
    faq:[
      {q:'Qual a diferença entre adicionar e extrair o imposto?',a:'Adicionar imposto pega um preço líquido — o preço sem imposto — e calcula o preço bruto que você paga. Extrair o imposto faz o inverso: você informa o preço bruto já com imposto e a calculadora descobre quanto é imposto e qual é o valor sem imposto.'},
      {q:'Que alíquotas devo usar?',a:'Use a alíquota que se aplica no seu país ou região. Exemplos comuns incluem 20% de IVA no Reino Unido, 19% na Alemanha, 10% de GST na Austrália e alíquotas variadas de imposto estadual nos EUA. Digite o número sem o símbolo de porcentagem.'},
      {q:'Alguma coisa que eu digito é enviada?',a:'Não. Tudo roda no seu navegador sem nenhum servidor envolvido. Os valores que você informou somem quando você fecha a página.'}
    ]
  },
  contentEn:`## Add tax to a price or extract it from a total

Sales tax, VAT, GST — whatever it is called in your country, the arithmetic is always one of two operations: adding a tax percentage to a net price to get the gross amount a buyer pays, or working backwards from a gross price to find out how much of it is tax. This calculator handles both instantly. Enter the amount, the tax rate, and choose a mode; the net, tax amount, and gross update as you type.

Understanding which direction you need is the first step. If you are a seller pricing a product and you want the displayed price to be the pre-tax amount with tax added at checkout, choose "add tax." If you received a receipt or an invoice and want to know how much of that total was tax, choose "extract tax." Both are everyday needs and both follow from the same simple formula.

## How to use the calculator

Enter the price in the amount field. For "add tax" mode this is the pre-tax (net) price. For "extract tax" mode this is the total (gross) price you see on the receipt. Next, enter the tax rate as a plain number — for example, enter 20 for a 20% rate. Choose the mode from the dropdown and read the three output values: net (pre-tax), the tax amount itself, and gross (total with tax). The result refreshes instantly with every keystroke.

## The formulas behind it

When adding tax, the gross price equals the net price multiplied by one plus the rate divided by one hundred. A £100 item at 20% becomes £120. The tax portion is £20.

When extracting tax, the net price equals the gross price divided by one plus the rate divided by one hundred. A £120 total at 20% gives a net of £100 and tax of £20. That division step is the one people frequently get wrong — dividing by 1.20, not subtracting 20% of the gross directly, which would give a different and incorrect answer.

## Common tax rates around the world

Tax rates vary enormously by country and even within countries. In the United Kingdom the standard VAT rate is 20%, with reduced rates of 5% on some items. Germany applies 19% to most goods and 7% to food and books. Australia charges 10% GST on most goods and services. Canada has a federal GST of 5% plus provincial rates. In the United States there is no federal sales tax; rates are set by states and localities and range from 0% in some states to over 10% in some cities when combined. Always verify the rate that applies to your specific situation before using it for any official purpose.

## When extracting tax matters most

The extract-tax calculation is particularly useful when you are reconciling accounts, claiming back input VAT as a business, or trying to compare prices across different markets where some prices are shown with tax and others without. It also comes up in personal finance when you want to understand the true pre-tax cost of something, such as when comparing offers where one seller shows a tax-inclusive price and another shows a tax-exclusive one.

## Compound rates and multiple taxes

Some transactions are subject to more than one tax — for example a hotel stay that carries both a state tax and a local tax. To handle this, calculate the first tax on the net price and then apply the second tax to that intermediate total, treating it as the new "net." The order generally does not matter when both rates apply to the same base, but it does matter when taxes are applied sequentially to a growing base. For simple combined rates, you can just add the percentages together before entering them if they both apply to the same base amount.

## Private, instant and free

No data you enter is sent anywhere. The calculator is a small piece of JavaScript that runs entirely on your device. It works offline, responds instantly, and does not require any account or registration. Close the tab and every number you typed is gone.

Use this tool whenever you price a product, reconcile a receipt, or need to separate the tax component from a total. The three outputs — net, tax, and gross — give you the complete picture in a single view.
`,
  contentPt:`## Adicione imposto a um preço ou extraia-o de um total

Imposto sobre vendas, IVA, ICMS — seja como for chamado no seu país, a aritmética é sempre uma de duas operações: adicionar uma alíquota a um preço líquido para obter o valor bruto que o comprador paga, ou trabalhar ao contrário a partir de um preço bruto para descobrir quanto dele é imposto. Esta calculadora faz os dois na hora. Informe o valor, a alíquota e escolha um modo; o líquido, o valor do imposto e o bruto se atualizam enquanto você digita.

Entender qual direção você precisa é o primeiro passo. Se você é um vendedor precificando um produto e quer que o preço exibido seja o valor sem imposto, com o imposto adicionado no checkout, escolha "adicionar imposto." Se você recebeu um recibo ou uma nota fiscal e quer saber quanto daquele total era imposto, escolha "extrair imposto." Os dois são necessidades cotidianas e os dois seguem da mesma fórmula simples.

## Como usar a calculadora

Informe o preço no campo de valor. Para o modo "adicionar imposto", este é o preço sem imposto (líquido). Para o modo "extrair imposto", este é o preço total (bruto) que você vê no recibo. Em seguida, informe a alíquota como número simples — por exemplo, informe 20 para uma alíquota de 20%. Escolha o modo no menu suspenso e leia os três valores de saída: líquido (sem imposto), o valor do próprio imposto e bruto (total com imposto). O resultado se atualiza na hora a cada tecla pressionada.

## As fórmulas por trás

Ao adicionar imposto, o preço bruto é igual ao preço líquido multiplicado por um mais a alíquota dividida por cem. Um item de R$ 100 com 20% vira R$ 120. A parcela de imposto é R$ 20.

Ao extrair o imposto, o preço líquido é igual ao preço bruto dividido por um mais a alíquota dividida por cem. Um total de R$ 120 com 20% dá um líquido de R$ 100 e imposto de R$ 20. Esse passo de divisão é o que as pessoas frequentemente erram — divide-se por 1,20, e não se subtrai 20% do bruto diretamente, o que daria uma resposta diferente e incorreta.

## Alíquotas comuns pelo mundo

As alíquotas variam enormemente por país e até dentro de países. No Reino Unido, a alíquota padrão de IVA é 20%, com alíquotas reduzidas de 5% em alguns itens. A Alemanha aplica 19% à maioria dos bens e 7% a alimentos e livros. A Austrália cobra 10% de GST sobre a maioria dos bens e serviços. O Canadá tem um GST federal de 5% mais alíquotas provinciais. Nos Estados Unidos não há imposto sobre vendas federal; as alíquotas são definidas por estados e municípios e variam de 0% em alguns estados a mais de 10% em algumas cidades quando combinadas. No Brasil, o ICMS varia por estado e produto. Sempre verifique a alíquota que se aplica à sua situação específica antes de usá-la para qualquer finalidade oficial.

## Quando extrair o imposto importa mais

O cálculo de extração de imposto é particularmente útil quando você está conciliando contas, recuperando créditos de IVA como empresa, ou tentando comparar preços em diferentes mercados onde alguns preços são mostrados com imposto e outros sem. Também surge nas finanças pessoais quando você quer entender o verdadeiro custo sem imposto de algo, como ao comparar ofertas em que um vendedor mostra preço com imposto e outro sem.

## Alíquotas compostas e múltiplos impostos

Algumas transações estão sujeitas a mais de um imposto — por exemplo, uma hospedagem de hotel que tem tanto imposto estadual quanto municipal. Para lidar com isso, calcule o primeiro imposto sobre o preço líquido e depois aplique o segundo imposto sobre esse total intermediário, tratando-o como o novo "líquido." A ordem geralmente não importa quando as duas alíquotas se aplicam à mesma base, mas importa quando os impostos são aplicados sequencialmente a uma base crescente. Para alíquotas combinadas simples, você pode somar as porcentagens antes de digitá-las se as duas se aplicarem ao mesmo valor de base.

## Privado, instantâneo e gratuito

Nenhum dado que você informa é enviado a lugar nenhum. A calculadora é um pequeno trecho de JavaScript que roda inteiramente no seu dispositivo. Funciona offline, responde na hora e não requer nenhuma conta ou cadastro. Feche a aba e todos os números que você digitou somem.

Use esta ferramenta sempre que precificar um produto, conciliar um recibo ou precisar separar a parcela de imposto de um total. Os três resultados — líquido, imposto e bruto — dão a você o quadro completo em uma única tela.
`
},

// ── TIME & DATES ─────────────────────────────────────────────────────────
{
  slug:'worldclock', category:'time', icon:'🌍',
  script:'worldclock.js',
  widget:`<div id="wc-app"><div class="row"><div class="field"><label for="wc-city1">{{ui.city1}}</label><select id="wc-city1"></select></div><div class="field"><label for="wc-city2">{{ui.city2}}</label><select id="wc-city2"></select></div><div class="field"><label for="wc-city3">{{ui.city3}}</label><select id="wc-city3"></select></div></div><div id="wc-out" class="result" style="flex-direction:column;gap:0.5rem"></div></div>`,
  en:{
    title:'World Clock — compare current time in cities worldwide',
    metaDescription:'Free world clock. Compare the current local time in multiple cities simultaneously. No signup required. Updates every second in your browser.',
    h1:'World Clock',
    intro:'Select up to three cities to compare their current local times side by side. The clock updates every second.',
    faq_title:'World clock FAQ',
    ui:{city1:'City 1',city2:'City 2',city3:'City 3'},
    faq:[
      {q:'How accurate is the world clock?',a:'The times are derived from your device\'s system clock and the IANA timezone database built into modern browsers. They are accurate to the second as long as your device\'s clock is set correctly.'},
      {q:'Does daylight saving time affect the results?',a:'Yes, the browser\'s Intl API automatically accounts for daylight saving time rules for each timezone, so the displayed times are always correct regardless of the time of year.'},
      {q:'Can I compare more than three cities?',a:'The tool shows three cities at once for a clean comparison. To compare more, simply change one of the dropdowns to a different city.'}
    ]
  },
  pt:{
    title:'Relógio Mundial — compare o horário atual em cidades do mundo todo',
    metaDescription:'Relógio mundial gratuito. Compare o horário local atual em várias cidades simultaneamente. Sem cadastro. Atualiza a cada segundo no seu navegador.',
    h1:'Relógio Mundial',
    intro:'Selecione até três cidades para comparar seus horários locais atuais lado a lado. O relógio se atualiza a cada segundo.',
    faq_title:'Perguntas frequentes do relógio mundial',
    ui:{city1:'Cidade 1',city2:'Cidade 2',city3:'Cidade 3'},
    faq:[
      {q:'Quão preciso é o relógio mundial?',a:'Os horários são derivados do relógio do sistema do seu dispositivo e do banco de dados de fusos horários IANA integrado aos navegadores modernos. São precisos ao segundo, desde que o relógio do seu dispositivo esteja configurado corretamente.'},
      {q:'O horário de verão afeta os resultados?',a:'Sim, a API Intl do navegador leva automaticamente em conta as regras de horário de verão de cada fuso horário, então os horários exibidos são sempre corretos independentemente da época do ano.'},
      {q:'Posso comparar mais de três cidades?',a:'A ferramenta mostra três cidades ao mesmo tempo para uma comparação limpa. Para comparar mais, basta mudar um dos menus para outra cidade.'}
    ]
  },
  contentEn:`## Compare local times around the world instantly

Whether you are scheduling a meeting with a colleague in Tokyo, calling a friend in New York, or checking when a live event starts in your timezone, knowing what time it is elsewhere matters. The world clock lets you compare the current local times in multiple cities simultaneously without doing any mental arithmetic. Pick the cities from the dropdowns and the current times appear immediately, updating every second.

## How it works

The tool uses the browser's built-in Internationalization API combined with the IANA timezone database, which is the global standard for timezone definitions. Every major timezone in the world is covered, and the database is updated regularly to reflect changes such as countries adopting or abandoning daylight saving time. Because the API handles the complexity automatically, the displayed time is always correct whether daylight saving is in effect or not.

## Practical uses

Scheduling remote meetings across timezones is one of the most common uses. If you are in London and need to arrange a call with someone in San Francisco, the world clock immediately shows you that when it is 9 AM in London it is 1 AM in San Francisco — clearly too early. You can mentally scan through times until you find a window that works for everyone.

Online events and live streams often publish their start time in a single timezone, usually the host's local time. Plugging that city into the world clock alongside your own location shows you the local start time without any manual conversion. Sports fans use the same approach to know when overseas games kick off.

International shipping and finance also involve timezone awareness. Stock exchanges open and close at set local times, and traders around the world need to know what that means in their own timezone. Delivery services tracking packages across borders use similar logic.

## Understanding timezones

The world is divided into approximately 40 distinct timezones, though some countries use offsets that are not whole hours. India, for example, is UTC+5:30, and Nepal is UTC+5:45. China spans several geographic timezones but uses a single nationwide time (UTC+8). The International Date Line in the Pacific means that some cities are an entire day ahead of others even when they appear geographically close.

Daylight saving time adds another layer of complexity. Countries that observe it shift their clocks forward by one hour in spring and back in autumn. Not all countries observe it, and those that do change on different dates, which means the offset between two cities can shift by an hour or two at different times of year.

## The limitations of a world clock

A world clock tells you the current civil time — the time people use in their daily lives. It does not tell you whether businesses are open, what the customs are for calling people at that hour, or whether a particular date is a public holiday. For scheduling purposes, always check local customs and holidays as well as the raw clock time.

## Private and instant

The world clock requires no internet connection once the page is loaded. All timezone calculations happen locally in your browser. Nothing you do is tracked or stored. The clock keeps ticking as long as the tab is open.
`,
  contentPt:`## Compare horários locais ao redor do mundo na hora

Seja para marcar uma reunião com um colega em Tóquio, ligar para um amigo em Nova York ou verificar quando um evento ao vivo começa no seu fuso horário, saber que horas são em outro lugar é importante. O relógio mundial permite comparar os horários locais atuais em várias cidades simultaneamente sem fazer nenhum cálculo mental. Escolha as cidades nos menus e os horários aparecem imediatamente, atualizando a cada segundo.

## Como funciona

A ferramenta usa a API de Internacionalização nativa do navegador combinada com o banco de dados de fusos horários IANA, que é o padrão global para definições de fusos horários. Todos os principais fusos horários do mundo são cobertos, e o banco de dados é atualizado regularmente para refletir mudanças como países que adotam ou abandonam o horário de verão. Como a API cuida da complexidade automaticamente, o horário exibido é sempre correto, com ou sem horário de verão.

## Usos práticos

Agendar reuniões remotas entre fusos horários é um dos usos mais comuns. Se você está em São Paulo e precisa marcar uma chamada com alguém em Los Angeles, o relógio mundial mostra imediatamente que quando são 9h em São Paulo são 5h em Los Angeles — claramente muito cedo. Você pode mentalmente percorrer os horários até encontrar uma janela que funcione para todos.

Eventos online e transmissões ao vivo frequentemente publicam o horário de início em um único fuso horário, geralmente o do anfitrião. Colocar essa cidade no relógio mundial junto com a sua localização mostra o horário de início local sem nenhuma conversão manual. Fãs de esportes usam a mesma abordagem para saber quando jogos no exterior começam.

## Entendendo fusos horários

O mundo está dividido em aproximadamente 40 fusos horários distintos, embora alguns países usem deslocamentos que não são horas inteiras. A Índia, por exemplo, está em UTC+5:30, e o Nepal em UTC+5:45. A China abrange vários fusos horários geográficos mas usa um único horário nacional (UTC+8). A Linha Internacional de Data no Pacífico significa que algumas cidades estão um dia inteiro à frente de outras mesmo parecendo geograficamente próximas.

O horário de verão adiciona outra camada de complexidade. Os países que o observam avançam seus relógios uma hora na primavera e voltam no outono. Nem todos os países o observam, e os que o fazem mudam em datas diferentes, o que significa que a diferença entre duas cidades pode variar uma ou duas horas em diferentes épocas do ano.

## Privado e instantâneo

O relógio mundial não requer conexão com a internet uma vez que a página é carregada. Todos os cálculos de fuso horário acontecem localmente no seu navegador. Nada do que você faz é rastreado ou armazenado.
`
},

{
  slug:'stopwatch', category:'time', icon:'⏱️',
  script:'stopwatch.js',
  widget:`<div id="sw-app" style="text-align:center"><div id="sw-display" style="font-size:3rem;font-weight:700;font-variant-numeric:tabular-nums;letter-spacing:0.05em;margin:1rem 0">00:00.000</div><div class="row" style="justify-content:center;gap:0.5rem"><button id="sw-start" class="btn">{{ui.start}}</button><button id="sw-lap" class="btn secondary" disabled>{{ui.lap}}</button><button id="sw-reset" class="btn secondary" disabled>{{ui.reset}}</button></div><ol id="sw-laps" style="text-align:left;margin-top:1rem;list-style:none;padding:0"></ol></div>`,
  en:{
    title:'Stopwatch Online — free browser stopwatch with lap times',
    metaDescription:'Free online stopwatch with millisecond precision. Start, pause, record lap times, and reset. No download needed. Works entirely in your browser.',
    h1:'Stopwatch',
    intro:'Press Start to begin timing. Press Lap to record split times without stopping. Press Reset to clear everything.',
    faq_title:'Stopwatch FAQ',
    ui:{start:'Start',lap:'Lap',reset:'Reset',stop:'Stop'},
    faq:[
      {q:'How accurate is the browser stopwatch?',a:'The stopwatch uses the browser\'s high-resolution performance timer, which is accurate to well under a millisecond in normal conditions. For official timing where exact precision is required, use a certified timing device.'},
      {q:'Will it stop if I switch tabs?',a:'Browsers may throttle JavaScript in background tabs, which could affect accuracy if you switch away. Keep the stopwatch tab active for best results.'},
      {q:'Can I use this on a mobile phone?',a:'Yes, the stopwatch is fully touch-compatible and works on smartphones and tablets.'}
    ]
  },
  pt:{
    title:'Cronômetro Online — cronômetro gratuito com marcação de voltas',
    metaDescription:'Cronômetro online gratuito com precisão de milissegundos. Inicie, pause, registre tempos de volta e reinicie. Sem download. Funciona inteiramente no seu navegador.',
    h1:'Cronômetro',
    intro:'Pressione Iniciar para começar a cronometrar. Pressione Volta para registrar tempos parciais sem parar. Pressione Reiniciar para limpar tudo.',
    faq_title:'Perguntas frequentes do cronômetro',
    ui:{start:'Iniciar',lap:'Volta',reset:'Reiniciar',stop:'Parar'},
    faq:[
      {q:'Qual a precisão do cronômetro do navegador?',a:'O cronômetro usa o temporizador de alta resolução do navegador, que é preciso a muito menos de um milissegundo em condições normais. Para cronometragem oficial onde precisão exata é exigida, use um dispositivo de cronometragem certificado.'},
      {q:'Ele vai parar se eu trocar de aba?',a:'Navegadores podem limitar o JavaScript em abas em segundo plano, o que pode afetar a precisão se você sair. Mantenha a aba do cronômetro ativa para melhores resultados.'},
      {q:'Posso usar no celular?',a:'Sim, o cronômetro é totalmente compatível com toque e funciona em smartphones e tablets.'}
    ]
  },
  contentEn:`## A precise stopwatch, right in your browser

Timing something accurately used to mean carrying a dedicated stopwatch. Now any device with a browser can serve that purpose. This online stopwatch runs entirely in your browser using a high-resolution timer, records lap times, and displays elapsed time in minutes, seconds, and milliseconds. There is nothing to download or install.

## How to use it

Press the Start button to begin timing. The display counts up in real time showing minutes, seconds, and thousandths of a second. While the stopwatch is running, press Lap to record the current elapsed time as a split. The lap list accumulates below the display, numbering each split so you can compare them. Press Stop to pause the stopwatch without losing the elapsed time or lap records. Press Start again to continue from where you paused. Press Reset to clear everything and return to zero.

## Precision and browser timers

Modern browsers expose a high-resolution timer through the Performance API, which measures time in fractions of a millisecond. This is far more precise than the one-millisecond resolution of the older Date.now() method. In practice, the timer is accurate to well under a millisecond on most devices, which is more than adequate for sports timing, cooking, presentations, or any everyday use. For legally certified timing in competitions, always use an approved timing device.

One limitation worth knowing: if you switch to a different browser tab, browsers may throttle JavaScript in the background to save resources. This could cause the stopwatch to fall slightly behind real elapsed time. Keep the stopwatch tab in focus for best accuracy.

## Common uses

Athletes use a stopwatch to time runs, swim laps, cycling intervals, or any repetitive exercise where comparing splits matters. Lap recording helps you see whether you are maintaining pace, improving, or fading. Coaches time multiple athletes sequentially and compare results.

In the kitchen a stopwatch is more flexible than a countdown timer when you are juggling multiple dishes that each need a different amount of time. You start timing each dish when it goes in and note the lap time to know how long each has been cooking.

Presentations and speeches benefit from a running timer. Knowing you are at exactly four minutes thirty seconds helps you judge whether to expand or condense a section to hit your target length.

Scientists and students timing experiments appreciate the lap function, which records a data point without having to restart the timer for the next trial.

## Touch and keyboard friendly

The Start, Lap, and Reset buttons work with mouse clicks and finger taps. The layout scales cleanly on phones and tablets.

## Private and always available

No data is sent anywhere. The stopwatch runs in your browser, works offline once the page loads, and requires no account. Reload the page to reset everything.
`,
  contentPt:`## Um cronômetro preciso, direto no seu navegador

Cronometrar algo com precisão costumava exigir um cronômetro dedicado. Agora qualquer dispositivo com navegador cumpre essa função. Este cronômetro online roda inteiramente no seu navegador usando um temporizador de alta resolução, registra tempos de volta e exibe o tempo decorrido em minutos, segundos e milissegundos. Não há nada para baixar ou instalar.

## Como usar

Pressione o botão Iniciar para começar a cronometrar. O visor conta para frente em tempo real mostrando minutos, segundos e milésimos de segundo. Enquanto o cronômetro está rodando, pressione Volta para registrar o tempo decorrido atual como parcial. A lista de voltas se acumula abaixo do visor, numerando cada parcial para que você possa compará-las. Pressione Parar para pausar o cronômetro sem perder o tempo decorrido ou os registros de volta. Pressione Iniciar novamente para continuar de onde pausou. Pressione Reiniciar para limpar tudo e voltar a zero.

## Precisão e temporizadores do navegador

Navegadores modernos expõem um temporizador de alta resolução através da API Performance, que mede o tempo em frações de milissegundo. Isso é muito mais preciso do que a resolução de um milissegundo do método Date.now() mais antigo. Na prática, o temporizador é preciso a muito menos de um milissegundo na maioria dos dispositivos, o que é mais do que adequado para cronometragem esportiva, cozinha, apresentações ou qualquer uso cotidiano.

Uma limitação importante: se você mudar para outra aba do navegador, os navegadores podem limitar o JavaScript em segundo plano para economizar recursos. Isso pode fazer o cronômetro ficar levemente atrasado em relação ao tempo real decorrido. Mantenha a aba do cronômetro em foco para melhor precisão.

## Usos comuns

Atletas usam um cronômetro para marcar corridas, voltas na piscina, intervalos de ciclismo ou qualquer exercício repetitivo onde comparar parciais importa. Registros de volta ajudam a ver se você está mantendo o ritmo, melhorando ou cansando. Treinadores cronometram vários atletas sequencialmente e comparam resultados.

Na cozinha um cronômetro é mais flexível do que um timer de contagem regressiva quando você está equilibrando vários pratos que precisam de tempos diferentes. Você começa a cronometrar cada prato quando entra e anota o tempo de volta para saber há quanto tempo cada um está cozinhando.

## Privado e sempre disponível

Nenhum dado é enviado a lugar nenhum. O cronômetro roda no seu navegador, funciona offline uma vez que a página carrega e não requer conta. Recarregue a página para reiniciar tudo.
`
},

{
  slug:'countdown', category:'time', icon:'⏳',
  script:'countdown.js',
  widget:`<div id="cd-app"><div class="row"><div class="field"><label for="cd-date">{{ui.target_date}}</label><input type="datetime-local" id="cd-date"></div><div class="field"><label for="cd-label">{{ui.event_name}}</label><input type="text" id="cd-label" maxlength="60" placeholder="{{ui.eg_birthday}}"></div></div><div id="cd-out" class="result" style="font-size:1.5rem;font-weight:700;min-height:2.5rem">—</div></div>`,
  en:{
    title:'Countdown Timer — count down to any date or event',
    metaDescription:'Free countdown timer. Enter any future date and see exactly how many days, hours, minutes and seconds remain. Works in your browser, no signup needed.',
    h1:'Countdown Timer',
    intro:'Pick a target date and time, optionally name the event, and see the countdown update every second.',
    faq_title:'Countdown FAQ',
    ui:{target_date:'Target date & time',event_name:'Event name (optional)',eg_birthday:'e.g. My birthday'},
    faq:[
      {q:'Can I count down to a specific time on a date?',a:'Yes. The date-and-time picker lets you set the exact hour and minute, so the countdown is accurate to the second.'},
      {q:'What happens when the countdown reaches zero?',a:'The display shows that the event has arrived. Reload the page if you want to start a new countdown.'},
      {q:'Is the countdown saved if I close the browser?',a:'No. The date you entered is not stored anywhere. You will need to re-enter it if you reload the page.'}
    ]
  },
  pt:{
    title:'Contagem Regressiva — conte regressivamente para qualquer data ou evento',
    metaDescription:'Contagem regressiva gratuita. Informe qualquer data futura e veja exatamente quantos dias, horas, minutos e segundos faltam. Funciona no seu navegador.',
    h1:'Contagem Regressiva',
    intro:'Escolha uma data e hora alvo, nomeie o evento opcionalmente, e veja a contagem regressiva atualizar a cada segundo.',
    faq_title:'Perguntas frequentes da contagem regressiva',
    ui:{target_date:'Data e hora alvo',event_name:'Nome do evento (opcional)',eg_birthday:'ex: Meu aniversário'},
    faq:[
      {q:'Posso contar regressivamente para um horário específico em uma data?',a:'Sim. O seletor de data e hora permite definir a hora e o minuto exatos, então a contagem é precisa ao segundo.'},
      {q:'O que acontece quando a contagem chega a zero?',a:'O visor mostra que o evento chegou. Recarregue a página se quiser iniciar uma nova contagem.'},
      {q:'A contagem é salva se eu fechar o navegador?',a:'Não. A data que você informou não é armazenada em lugar nenhum. Você precisará informá-la novamente se recarregar a página.'}
    ]
  },
  contentEn:`## Count down to any moment that matters

A countdown timer turns an abstract future date into something visceral — a live, ticking number that makes the event feel real and imminent. Whether you are counting down to a birthday, a trip, a product launch, an exam, a holiday, or any personal milestone, this tool shows you exactly how many days, hours, minutes and seconds remain.

## How to use the countdown timer

Open the date and time picker and select your target date. The picker accepts any future date and time, so you can be precise to the minute. If you like, type a name for the event in the label field — "Wedding," "Marathon," "New Year" — and it appears above the countdown. From the moment you select the date, the countdown runs automatically, subtracting one second at a time until the moment arrives.

## Why countdowns work

Psychologists have long noted that making a goal concrete and time-bound increases motivation. When you can see exactly that you have forty-two days, seven hours and fourteen minutes until your deadline, the abstract future crystallises into something you can plan against. Countdown timers are used in marketing for exactly this reason — a ticking clock on a sale creates urgency — but the same effect applies to personal goals.

Athletes count down to race day to pace their training. Students count down to exam dates to structure their revision schedules. Event organisers count down to show day. Families count down to holidays to build excitement for children.

## Accuracy

The countdown uses the browser's built-in date arithmetic, which is accurate to the millisecond. The displayed time is based on your device's system clock. If your device's clock is correctly synchronised — which it is by default on most smartphones and computers — the countdown will be accurate to the second.

The time is calculated in real time each second, so there is no drift. If you leave the tab open overnight and return in the morning, the displayed time will reflect the actual elapsed time correctly.

## Counting down across timezones

The countdown uses your local time, which is the time your device is set to. If you are in São Paulo counting down to a New Year event that starts at midnight in London, enter midnight London time, which your browser will convert to your local equivalent when you set the datetime input.

## Events large and small

Countdowns work for public events like sports finals, elections, or space launches — moments where everyone agrees on a single instant. They also work for deeply personal milestones: how many days since or until a wedding anniversary, a graduation, a baby's due date, or a reunion with someone you miss. A number alone cannot capture the emotion of an event, but it can make that event feel concrete and approaching.

## Private and always ticking

Nothing you enter is sent to any server. The target date and event name stay entirely in your browser. There is no account, no login, and no tracking. Close the tab and everything is gone.

Enter your date, watch the seconds count down, and let the anticipation build.
`,
  contentPt:`## Conte regressivamente para qualquer momento que importa

Um timer de contagem regressiva transforma uma data futura abstrata em algo visceral — um número vivo e tique-taque que faz o evento parecer real e iminente. Seja contando regressivamente para um aniversário, uma viagem, o lançamento de um produto, uma prova, um feriado ou qualquer marco pessoal, esta ferramenta mostra exatamente quantos dias, horas, minutos e segundos faltam.

## Como usar o timer de contagem regressiva

Abra o seletor de data e hora e selecione sua data alvo. O seletor aceita qualquer data e hora futura, então você pode ser preciso ao minuto. Se quiser, digite um nome para o evento no campo de rótulo — "Casamento," "Maratona," "Ano Novo" — e ele aparece acima da contagem. A partir do momento em que você seleciona a data, a contagem corre automaticamente, subtraindo um segundo de cada vez até o momento chegar.

## Por que contagens regressivas funcionam

Psicólogos há muito notam que tornar um objetivo concreto e com prazo aumenta a motivação. Quando você pode ver exatamente que faltam quarenta e dois dias, sete horas e quatorze minutos para o seu prazo, o futuro abstrato se cristaliza em algo contra o qual você pode planejar. Timers de contagem regressiva são usados em marketing exatamente por essa razão — um relógio tique-taqueando em uma venda cria urgência — mas o mesmo efeito se aplica a objetivos pessoais.

Atletas contam regressivamente até o dia da prova para adequar o ritmo do treinamento. Estudantes contam regressivamente para datas de exames para estruturar seus cronogramas de revisão. Organizadores de eventos contam regressivamente para o dia do show. Famílias contam regressivamente para férias para construir expectativa para as crianças.

## Precisão

A contagem usa a aritmética de datas nativa do navegador, que é precisa ao milissegundo. O horário exibido é baseado no relógio do sistema do seu dispositivo. Se o relógio do seu dispositivo estiver corretamente sincronizado — o que é padrão na maioria dos smartphones e computadores — a contagem será precisa ao segundo.

## Privado e sempre tique-taqueando

Nada do que você informa é enviado a nenhum servidor. A data alvo e o nome do evento ficam inteiramente no seu navegador. Não há conta, login ou rastreamento. Feche a aba e tudo some.
`
},

{
  slug:'pomodoro', category:'time', icon:'🍅',
  script:'pomodoro.js',
  widget:`<div id="pom-app" style="text-align:center"><div id="pom-phase" style="font-size:1rem;margin-bottom:0.5rem;opacity:0.7">{{ui.ready}}</div><div id="pom-display" style="font-size:4rem;font-weight:700;font-variant-numeric:tabular-nums">25:00</div><div style="margin:1rem 0;display:flex;gap:0.5rem;justify-content:center"><button id="pom-start" class="btn">{{ui.start}}</button><button id="pom-reset" class="btn secondary">{{ui.reset}}</button></div><div id="pom-count" style="opacity:0.6;font-size:0.9rem"></div></div>`,
  en:{
    title:'Pomodoro Timer — 25-minute focus timer for studying and work',
    metaDescription:'Free Pomodoro timer. 25-minute focus sessions with 5-minute short breaks and 15-minute long breaks. No signup needed. Runs in your browser with sound alerts.',
    h1:'Pomodoro Timer',
    intro:'Click Start to begin a 25-minute focus session. A sound plays when time is up and the timer automatically switches to a 5-minute break. After four sessions, a longer 15-minute break is offered.',
    faq_title:'Pomodoro FAQ',
    ui:{start:'Start',reset:'Reset',ready:'Ready to focus',focus:'Focus time',short_break:'Short break',long_break:'Long break',sessions:'Sessions completed'},
    faq:[
      {q:'What is the Pomodoro Technique?',a:'Developed by Francesco Cirillo in the late 1980s, the Pomodoro Technique alternates 25-minute focused work sessions with short breaks. After four sessions a longer break is taken. The name comes from a tomato-shaped kitchen timer.'},
      {q:'Can I change the timer durations?',a:'This implementation uses the classic durations: 25 minutes of focus, 5-minute short breaks, and a 15-minute long break after every four sessions. These durations are evidence-backed for sustaining attention over long work periods.'},
      {q:'Will I hear a sound when the timer ends?',a:'Yes, the timer plays a short audio alert using the Web Audio API. Make sure your device volume is on.'}
    ]
  },
  pt:{
    title:'Timer Pomodoro — timer de foco de 25 minutos para estudo e trabalho',
    metaDescription:'Timer Pomodoro gratuito. Sessões de foco de 25 minutos com pausas curtas de 5 minutos e pausas longas de 15 minutos. Sem cadastro. Roda no seu navegador com alertas sonoros.',
    h1:'Timer Pomodoro',
    intro:'Clique em Iniciar para começar uma sessão de foco de 25 minutos. Um som toca quando o tempo acaba e o timer passa automaticamente para uma pausa de 5 minutos. Depois de quatro sessões, é oferecida uma pausa mais longa de 15 minutos.',
    faq_title:'Perguntas frequentes do Pomodoro',
    ui:{start:'Iniciar',reset:'Reiniciar',ready:'Pronto para focar',focus:'Hora de focar',short_break:'Pausa curta',long_break:'Pausa longa',sessions:'Sessões concluídas'},
    faq:[
      {q:'O que é a Técnica Pomodoro?',a:'Desenvolvida por Francesco Cirillo no final dos anos 1980, a Técnica Pomodoro alterna sessões de trabalho focado de 25 minutos com pausas curtas. Após quatro sessões é feita uma pausa mais longa. O nome vem de um timer de cozinha em forma de tomate.'},
      {q:'Posso mudar as durações do timer?',a:'Esta implementação usa as durações clássicas: 25 minutos de foco, pausas curtas de 5 minutos e uma pausa longa de 15 minutos após cada quatro sessões.'},
      {q:'Ouvirei um som quando o timer acabar?',a:'Sim, o timer toca um breve alerta de áudio usando a Web Audio API. Certifique-se de que o volume do seu dispositivo está ligado.'}
    ]
  },
  contentEn:`## The 25-minute focus technique that changed how millions work

The Pomodoro Technique is one of the most widely used time-management methods in the world. Developed by Francesco Cirillo in the late 1980s and named after a tomato-shaped kitchen timer, it works on a simple insight: the human brain sustains deep focus better in shorter bursts than in long unbroken stretches. By working in structured 25-minute intervals separated by brief rests, you can maintain high concentration throughout a long day without the mental exhaustion that comes from grinding continuously.

## How the Pomodoro timer works

Click Start to begin a 25-minute focus session — one Pomodoro. During this time, work on a single task and avoid all distractions. When the 25 minutes are up, a sound plays and the timer automatically switches to a 5-minute short break. Use this break to stand, stretch, or rest your eyes. After four Pomodoros, a longer 15-minute break is offered to let your brain consolidate what it has processed.

## The science of attention and rest

Research on cognitive performance consistently shows that sustained attention degrades over time. After roughly 25 to 30 minutes of focused work, error rates begin to rise and productivity falls even if the person feels they are still concentrating. Short, deliberate breaks counteract this effect by giving the prefrontal cortex time to consolidate information and reset attention. The Pomodoro Technique formalises this into a routine so the breaks happen reliably rather than only when you are already too tired.

The technique also uses the psychology of commitment. Knowing you only need to stay focused for 25 minutes — not all morning — lowers the activation energy required to start a difficult task. Procrastination frequently comes from the perceived enormousness of a job; breaking it into 25-minute chunks makes it tractable.

## Practical tips for effective Pomodoro sessions

Before starting the timer, write down what you will work on. A clear intention for the next 25 minutes removes decision-making from the session itself. If a distracting thought arises during a Pomodoro, jot it down on a notepad and return to it after the session ends rather than acting on it immediately.

Keep the break strictly to five minutes. The urge to extend it is natural but undermines the rhythm. After four sessions, the 15-minute long break is an appropriate time to go for a short walk or have a meal, which helps consolidate memory and restore alertness for the next block of sessions.

The technique works best for tasks that require sustained concentration: writing, coding, studying, reading, design work, or any form of deep creative or analytical effort. It is less suited to highly collaborative work where interruptions are inherent.

## Students and learners

Students preparing for exams often adopt the Pomodoro Technique because it provides a concrete structure for revision sessions. Rather than sitting at a desk for three undefined hours and gradually losing focus, a student works for 25 minutes, breaks for 5, and tracks their sessions. Eight Pomodoros in a day represents four hours of genuine focused study — far more effective than eight hours of scattered half-attention.

## Private and always ready

This timer runs entirely in your browser. No account, no tracking, no data sent anywhere. Refresh the page to start fresh.
`,
  contentPt:`## A técnica de foco de 25 minutos que mudou como milhões trabalham

A Técnica Pomodoro é um dos métodos de gestão do tempo mais usados no mundo. Desenvolvida por Francesco Cirillo no final dos anos 1980 e nomeada em homenagem a um timer de cozinha em forma de tomate, funciona com uma percepção simples: o cérebro humano sustenta foco profundo melhor em rajadas mais curtas do que em longas extensões ininterruptas. Trabalhando em intervalos estruturados de 25 minutos separados por breves descansos, você pode manter alta concentração ao longo de um longo dia sem o esgotamento mental que vem de trabalhar continuamente.

## Como o timer Pomodoro funciona

Clique em Iniciar para começar uma sessão de foco de 25 minutos — um Pomodoro. Durante esse tempo, trabalhe em uma única tarefa e evite todas as distrações. Quando os 25 minutos acabam, um som toca e o timer passa automaticamente para uma pausa curta de 5 minutos. Use essa pausa para se levantar, alongar ou descansar os olhos. Após quatro Pomodoros, é oferecida uma pausa mais longa de 15 minutos para deixar o cérebro consolidar o que processou.

## A ciência da atenção e do descanso

Pesquisas sobre desempenho cognitivo mostram consistentemente que a atenção sustentada se degrada com o tempo. Após aproximadamente 25 a 30 minutos de trabalho focado, as taxas de erro começam a subir e a produtividade cai mesmo que a pessoa sinta que ainda está se concentrando. Pausas curtas e deliberadas contrariam esse efeito dando ao córtex pré-frontal tempo para consolidar informações e redefinir a atenção.

## Dicas práticas para sessões Pomodoro eficazes

Antes de iniciar o timer, escreva no que vai trabalhar. Uma intenção clara para os próximos 25 minutos remove a tomada de decisão da própria sessão. Se um pensamento distrativo surgir durante um Pomodoro, anote em um bloco e volte a ele após a sessão terminar em vez de agir sobre ele imediatamente.

A técnica funciona melhor para tarefas que exigem concentração sustentada: escrever, programar, estudar, ler, trabalhar com design ou qualquer forma de esforço criativo ou analítico profundo.

## Privado e sempre pronto

Este timer roda inteiramente no seu navegador. Sem conta, sem rastreamento, sem dados enviados a lugar nenhum.
`
},

{
  slug:'daysbetween', category:'time', icon:'📅',
  script:'daysbetween.js',
  widget:`<form id="db-form"><div class="row"><div class="field"><label for="db-from">{{ui.from_date}}</label><input type="date" id="db-from"></div><div class="field"><label for="db-to">{{ui.to_date}}</label><input type="date" id="db-to"></div></div><div class="result"><span class="hint">{{ui.result}}: </span><span class="big" id="db-out">—</span></div></form>`,
  en:{
    title:'Days Between Dates Calculator — how many days between two dates',
    metaDescription:'Free days between dates calculator. Find exactly how many days, weeks, and months are between any two dates. Works instantly in your browser.',
    h1:'Days Between Dates',
    intro:'Select a start date and an end date to see how many days are between them. The result also shows the equivalent in weeks and months.',
    faq_title:'Days between dates FAQ',
    ui:{from_date:'Start date',to_date:'End date',result:'Days between'},
    faq:[
      {q:'Does the calculator include both the start and end dates?',a:'The result counts the number of days from the start date up to but not including the end date, which is the most common convention for date differences. To include both days, add one to the result.'},
      {q:'Can I calculate days in the past?',a:'Yes, you can enter any two dates in any order. The calculator always returns the absolute number of days between the two dates.'},
      {q:'What about leap years?',a:'Leap years are handled automatically. February 29 is a valid date when available and the extra day is counted correctly in any date range spanning a leap year.'}
    ]
  },
  pt:{
    title:'Calculadora de Dias Entre Datas — quantos dias entre duas datas',
    metaDescription:'Calculadora de dias entre datas gratuita. Descubra exatamente quantos dias, semanas e meses há entre duas datas. Funciona na hora no seu navegador.',
    h1:'Dias Entre Datas',
    intro:'Selecione uma data de início e uma data final para ver quantos dias há entre elas. O resultado também mostra o equivalente em semanas e meses.',
    faq_title:'Perguntas frequentes de dias entre datas',
    ui:{from_date:'Data inicial',to_date:'Data final',result:'Dias entre'},
    faq:[
      {q:'A calculadora inclui as duas datas?',a:'O resultado conta o número de dias da data inicial até, mas não incluindo, a data final, que é a convenção mais comum para diferenças de data. Para incluir as duas datas, adicione um ao resultado.'},
      {q:'Posso calcular dias no passado?',a:'Sim, você pode informar quaisquer duas datas em qualquer ordem. A calculadora sempre retorna o número absoluto de dias entre as duas datas.'},
      {q:'E os anos bissextos?',a:'Os anos bissextos são tratados automaticamente. 29 de fevereiro é uma data válida quando disponível e o dia extra é contado corretamente em qualquer intervalo de datas que abranja um ano bissexto.'}
    ]
  },
  contentEn:`## Find the exact number of days between any two dates

Date arithmetic is surprisingly awkward to do in your head. Counting from a date in the past to today, or from today to a future date, requires remembering how many days are in each month, whether the year is a leap year, and carrying across month and year boundaries. This calculator does all of that instantly. Enter two dates and you immediately see the number of days between them, along with the equivalent in weeks and months.

## How to use it

Click or tap in the start date field and select a date from the calendar picker, or type it in the format your browser expects. Do the same for the end date. The number of days appears immediately without pressing any button. You can enter the dates in any order — if the start date is later than the end date, the calculator still returns the correct positive count.

## Common uses

Counting days between dates comes up constantly in everyday life. How many days until a vacation? How many days since an important event? How long until a deadline? How many days has a plant been growing, a wound healing, or a project running?

In business, date differences are used to calculate invoice due dates, payment terms, contract durations, and project timelines. A 30-day payment term from an invoice dated May 3 ends on June 2. A 90-day trial period starting January 1 ends on April 1 in a non-leap year. Getting these right matters for contracts and compliance.

Legal and financial contexts often require precise day counts. Loan interest is frequently calculated on a daily basis, so the number of days between drawdown and repayment directly affects the interest owed. Regulatory deadlines are often specified in calendar days from a trigger event, and missing them by even one day can have consequences.

## The difference between calendar days and business days

This calculator counts calendar days — every day including weekends and public holidays. If you need to count only working days (Monday through Friday, excluding holidays), that is a different calculation. Calendar days are the right measure for most purposes: drug half-lives, age calculations, elapsed time in general, and legal deadlines that say "30 days" without specifying business days.

## Weeks and months as alternate units

The calculator also shows the equivalent in weeks and decimal months. Weeks are exact integer divisions of the day count where applicable. The months figure is approximate because months vary in length from 28 to 31 days. For most purposes, "approximately 3.2 months" is a helpful way to understand a 97-day span, but for anything requiring exact month counts consult a calendar directly.

## Leap year handling

The calculator uses the standard Gregorian calendar rule for leap years: a year divisible by 4 is a leap year, except for century years, which must also be divisible by 400. This means 2000 was a leap year but 1900 was not. Every February 29 is counted correctly in any date range.

## Private and instant

No data is sent anywhere. The calculation happens in your browser using the JavaScript Date API, which is the same system used by every modern website and application for date handling.
`,
  contentPt:`## Encontre o número exato de dias entre quaisquer duas datas

A aritmética de datas é surpreendentemente estranha de fazer mentalmente. Contar de uma data no passado até hoje, ou de hoje até uma data futura, requer lembrar quantos dias há em cada mês, se o ano é bissexto e carregar pelas fronteiras de mês e ano. Esta calculadora faz tudo isso na hora. Informe duas datas e você vê imediatamente o número de dias entre elas, junto com o equivalente em semanas e meses.

## Como usar

Clique ou toque no campo de data inicial e selecione uma data no seletor de calendário, ou digite-a no formato que seu navegador espera. Faça o mesmo para a data final. O número de dias aparece imediatamente sem precisar pressionar nenhum botão. Você pode informar as datas em qualquer ordem — se a data inicial for posterior à data final, a calculadora ainda retorna a contagem positiva correta.

## Usos comuns

Contar dias entre datas surge constantemente no dia a dia. Quantos dias até uma viagem? Quantos dias desde um evento importante? Quanto tempo até um prazo? Quantos dias uma planta está crescendo, uma ferida cicatrizando ou um projeto rodando?

Nos negócios, diferenças de datas são usadas para calcular datas de vencimento de faturas, prazos de pagamento, durações de contratos e cronogramas de projetos. Um prazo de pagamento de 30 dias a partir de uma fatura datada de 3 de maio termina em 2 de junho. Um período de teste de 90 dias iniciando em 1° de janeiro termina em 1° de abril em um ano não bissexto.

## A diferença entre dias corridos e dias úteis

Esta calculadora conta dias corridos — todos os dias incluindo fins de semana e feriados. Se você precisa contar apenas dias úteis (segunda a sexta, excluindo feriados), esse é um cálculo diferente. Dias corridos são a medida certa para a maioria dos fins: meias-vidas de medicamentos, cálculos de idade, tempo decorrido em geral e prazos legais que dizem "30 dias" sem especificar dias úteis.

## Privado e instantâneo

Nenhum dado é enviado a lugar nenhum. O cálculo acontece no seu navegador usando a API Date do JavaScript.
`
},

{
  slug:'weeknumber', category:'time', icon:'📆',
  script:'weeknumber.js',
  widget:`<div id="wn-app"><div class="row"><div class="field"><label for="wn-date">{{ui.date}}</label><input type="date" id="wn-date"></div></div><div class="result"><span class="hint">{{ui.week_label}}: </span><span class="big" id="wn-week">—</span></div><div id="wn-detail" style="opacity:0.7;font-size:0.9rem;margin-top:0.5rem"></div></div>`,
  en:{
    title:'Week Number Calculator — what week of the year is it?',
    metaDescription:'Free week number calculator. Find the ISO week number for any date. See what week of the year it is today or for any date you choose.',
    h1:'Week Number',
    intro:'Select a date to see its ISO week number and the date range for that week.',
    faq_title:'Week number FAQ',
    ui:{date:'Date',week_label:'Week number'},
    faq:[
      {q:'What is the ISO week number?',a:'ISO 8601 defines a week as starting on Monday. Week 1 is the week that contains the first Thursday of the year, which means the first days of January may belong to week 52 or 53 of the previous year.'},
      {q:'Why does week 1 sometimes start in December?',a:'Because ISO weeks start on Monday, some years have a Thursday in early January that pushes week 1 to start in late December of the previous year.'},
      {q:'How many weeks are in a year?',a:'Most years have 52 ISO weeks. Some years have 53 weeks when the year starts or ends on a Thursday.'}
    ]
  },
  pt:{
    title:'Calculadora de Número da Semana — qual semana do ano é esta?',
    metaDescription:'Calculadora de número da semana gratuita. Encontre o número da semana ISO para qualquer data. Veja em qual semana do ano estamos hoje ou para qualquer data escolhida.',
    h1:'Número da Semana',
    intro:'Selecione uma data para ver o número da semana ISO e o intervalo de datas dessa semana.',
    faq_title:'Perguntas frequentes do número da semana',
    ui:{date:'Data',week_label:'Número da semana'},
    faq:[
      {q:'O que é o número da semana ISO?',a:'A ISO 8601 define uma semana começando na segunda-feira. A Semana 1 é a semana que contém a primeira quinta-feira do ano, o que significa que os primeiros dias de janeiro podem pertencer à semana 52 ou 53 do ano anterior.'},
      {q:'Por que a semana 1 às vezes começa em dezembro?',a:'Como as semanas ISO começam na segunda-feira, alguns anos têm uma quinta-feira no início de janeiro que faz a semana 1 começar no final de dezembro do ano anterior.'},
      {q:'Quantas semanas há em um ano?',a:'A maioria dos anos tem 52 semanas ISO. Alguns anos têm 53 semanas quando o ano começa ou termina numa quinta-feira.'}
    ]
  },
  contentEn:`## What week of the year is it?

Knowing the week number is a common need in project management, payroll, logistics, school scheduling, and any context where people communicate about time in weekly units rather than specific dates. "Let's meet in week 32" is a perfectly natural way to schedule things once you know which dates week 32 covers. This tool shows you the ISO week number for any date and the Monday-to-Sunday range that week spans.

## The ISO 8601 week standard

The week number shown by this tool follows the ISO 8601 international standard, which is the most widely used definition in business and government. Under ISO 8601, a week always starts on Monday and ends on Sunday. Week 1 is defined as the week that contains the year's first Thursday. This definition ensures every year has either 52 or 53 complete weeks.

Because of the Monday-start rule, the first few days of January sometimes fall in week 52 or 53 of the previous year, and the last few days of December sometimes fall in week 1 of the following year. This surprises people who encounter it for the first time but makes perfect logical sense once you understand the definition.

## Why 52 or 53 weeks?

A calendar year has 365 days (366 in a leap year), and 365 divided by 7 gives 52 weeks and one day. That extra day — or two days in a leap year — means the day of the week that January 1 falls on shifts by one or two each year. When this shift causes a Thursday to appear in both early January and late December, the year gets a 53rd week.

## Uses in business and logistics

Supply chain and manufacturing teams often plan in week numbers because they correspond neatly to delivery schedules. "Week 14 delivery" means something specific without having to name the exact dates, and everyone using the same ISO definition is on the same calendar page.

Payroll systems frequently process runs on weekly cycles and reference them by week number for audit purposes. HR departments track annual leave in weeks. Project managers break Gantt charts into numbered weeks. Financial reporting sometimes uses ISO weeks for consistency across years.

## School and academic calendars

Universities and schools in many European countries number their teaching weeks, so "Week 5 assignments are due" is standard language. Students from countries where week numbers are less common sometimes struggle to translate these communications into actual dates, making a week number calculator especially useful.

## Finding the current week quickly

Open the tool today and it defaults to the current date, showing you immediately what week of the year it is. If you want to know which week a specific date falls in — for planning a meeting, checking a delivery date, or verifying a project milestone — just pick the date and the answer is instant.

## Private

The tool uses only your browser's local date computation. Nothing is sent to any server.
`,
  contentPt:`## Qual semana do ano é esta?

Saber o número da semana é uma necessidade comum em gestão de projetos, folha de pagamento, logística, cronogramas escolares e qualquer contexto em que as pessoas se comunicam sobre o tempo em unidades semanais em vez de datas específicas. "Vamos nos encontrar na semana 32" é uma forma perfeitamente natural de agendar coisas quando você sabe quais datas a semana 32 cobre. Esta ferramenta mostra o número da semana ISO para qualquer data e o intervalo de segunda a domingo que essa semana abrange.

## O padrão de semana ISO 8601

O número da semana mostrado por esta ferramenta segue o padrão internacional ISO 8601, que é a definição mais amplamente usada em negócios e governo. Sob a ISO 8601, uma semana sempre começa na segunda-feira e termina no domingo. A Semana 1 é definida como a semana que contém a primeira quinta-feira do ano.

Por causa da regra de início na segunda-feira, os primeiros dias de janeiro às vezes caem na semana 52 ou 53 do ano anterior, e os últimos dias de dezembro às vezes caem na semana 1 do ano seguinte. Isso surpreende quem se depara com isso pela primeira vez, mas faz todo sentido lógico uma vez que se entende a definição.

## Usos em negócios e logística

Equipes de cadeia de suprimentos e manufatura frequentemente planejam em números de semana porque correspondem claramente a cronogramas de entrega. "Entrega na semana 14" significa algo específico sem ter que nomear as datas exatas. Sistemas de folha de pagamento frequentemente processam rodadas em ciclos semanais e os referenciam por número de semana para fins de auditoria.

## Privado

A ferramenta usa apenas a computação de data local do seu navegador. Nada é enviado a nenhum servidor.
`
},

{
  slug:'unixepoch', category:'time', icon:'🕰️',
  script:'unixepoch.js',
  widget:`<div id="ue-app"><div class="row"><div class="field"><label for="ue-ts">{{ui.timestamp}}</label><input type="number" id="ue-ts" placeholder="e.g. 1700000000" inputmode="numeric"></div></div><div class="result"><span class="hint">{{ui.utc}}: </span><b id="ue-utc">—</b></div><div class="result"><span class="hint">{{ui.local}}: </span><b id="ue-local">—</b></div><hr style="margin:1rem 0;opacity:0.3"><div class="field"><label for="ue-dt">{{ui.date_to_ts}}</label><input type="datetime-local" id="ue-dt"></div><div class="result"><span class="hint">{{ui.ts_out}}: </span><span class="big" id="ue-tsout">—</span></div></div>`,
  en:{
    title:'Unix Timestamp Converter — convert epoch time to date',
    metaDescription:'Free Unix timestamp converter. Convert Unix epoch time to a human-readable date and time, or convert any date back to a Unix timestamp. Works instantly in your browser.',
    h1:'Unix Timestamp Converter',
    intro:'Enter a Unix timestamp to convert it to a readable date, or pick a date to convert it to a Unix timestamp.',
    faq_title:'Unix timestamp FAQ',
    ui:{timestamp:'Unix timestamp (seconds)',utc:'UTC date & time',local:'Your local time',date_to_ts:'Convert date to timestamp',ts_out:'Unix timestamp'},
    faq:[
      {q:'What is a Unix timestamp?',a:'A Unix timestamp is a number that represents the number of seconds elapsed since January 1, 1970, at 00:00:00 UTC (the Unix epoch). It is used universally in computing to represent points in time without timezone ambiguity.'},
      {q:'What is the year 2038 problem?',a:'Older systems that store Unix timestamps as 32-bit signed integers can only represent dates up to January 19, 2038. Modern 64-bit systems do not have this limitation.'},
      {q:'How do I convert milliseconds?',a:'Some systems use milliseconds instead of seconds. Divide the millisecond timestamp by 1000 to convert it to seconds before entering it here.'}
    ]
  },
  pt:{
    title:'Conversor de Unix Timestamp — converta tempo epoch para data',
    metaDescription:'Conversor de Unix timestamp gratuito. Converta tempo epoch Unix para data e hora legível, ou converta qualquer data de volta para Unix timestamp. Funciona na hora no seu navegador.',
    h1:'Conversor de Unix Timestamp',
    intro:'Informe um Unix timestamp para convertê-lo para uma data legível, ou escolha uma data para convertê-la para um Unix timestamp.',
    faq_title:'Perguntas frequentes de Unix timestamp',
    ui:{timestamp:'Unix timestamp (segundos)',utc:'Data e hora UTC',local:'Seu horário local',date_to_ts:'Converter data para timestamp',ts_out:'Unix timestamp'},
    faq:[
      {q:'O que é um Unix timestamp?',a:'Um Unix timestamp é um número que representa o número de segundos decorridos desde 1° de janeiro de 1970, às 00:00:00 UTC (o epoch Unix). É usado universalmente em computação para representar pontos no tempo sem ambiguidade de fuso horário.'},
      {q:'O que é o problema do ano 2038?',a:'Sistemas mais antigos que armazenam Unix timestamps como inteiros de 32 bits com sinal só conseguem representar datas até 19 de janeiro de 2038. Sistemas modernos de 64 bits não têm essa limitação.'},
      {q:'Como converto milissegundos?',a:'Alguns sistemas usam milissegundos em vez de segundos. Divida o timestamp em milissegundos por 1000 para convertê-lo para segundos antes de digitá-lo aqui.'}
    ]
  },
  contentEn:`## Convert Unix timestamps to human-readable dates

Developers, database administrators, and anyone working with log files or APIs regularly encounter Unix timestamps — long numbers like 1700000000 that represent a moment in time. Without a converter, these numbers are meaningless to most people. This tool converts any Unix timestamp instantly to a readable date and time, and also converts any date back to its Unix timestamp.

## What is a Unix timestamp?

A Unix timestamp counts the number of seconds elapsed since midnight on January 1, 1970, Coordinated Universal Time (UTC). This moment, called the Unix epoch, was chosen as the reference point when Unix operating systems were being developed. Every second that passes adds one to the count. The timestamp 0 represents exactly midnight on January 1, 1970 UTC. The timestamp 1700000000 represents November 14, 2023 at 22:13:20 UTC.

The beauty of Unix timestamps is that they are timezone-agnostic. A timestamp represents exactly the same moment in time regardless of where in the world you are. When converted to a local time, the same timestamp produces different clock readings in Tokyo and New York, but they refer to the same physical instant.

## How to use the converter

To convert a timestamp to a date, paste the timestamp number into the upper field. The UTC date and time and your local equivalent both appear immediately. To convert a date to a timestamp, use the date picker in the lower section and the corresponding timestamp appears instantly.

## Milliseconds vs seconds

Some systems, particularly web browsers and JavaScript applications, use milliseconds instead of seconds for their timestamps. A JavaScript Date.now() call returns something like 1700000000000 — a number about 1000 times larger than the equivalent Unix timestamp in seconds. If the number you have is roughly thirteen digits long, it is probably in milliseconds: divide by 1000 and enter the result.

## The year 2038 problem

Early Unix systems stored timestamps as 32-bit signed integers, which can hold values up to 2,147,483,647. That maximum value corresponds to January 19, 2038 at 03:14:07 UTC. Systems that store timestamps in 32-bit integers will overflow on that date, a problem sometimes called Y2K38. Modern 64-bit systems can store timestamps far beyond the year 292 billion, making this a problem only for legacy software that has not been updated.

## Common uses

Timestamps appear in log files, database records, API responses, cache headers, cryptographic certificates, and countless other contexts. Converting them to readable dates helps with debugging, data analysis, compliance auditing, and any situation where you need to understand when something happened.

## Private

Everything runs in your browser. No data is sent anywhere.
`,
  contentPt:`## Converta Unix timestamps para datas legíveis por humanos

Desenvolvedores, administradores de banco de dados e qualquer pessoa que trabalhe com arquivos de log ou APIs regularmente encontra Unix timestamps — números longos como 1700000000 que representam um momento no tempo. Sem um conversor, esses números são sem sentido para a maioria das pessoas. Esta ferramenta converte qualquer Unix timestamp instantaneamente para uma data e hora legível, e também converte qualquer data de volta para seu Unix timestamp.

## O que é um Unix timestamp?

Um Unix timestamp conta o número de segundos decorridos desde meia-noite em 1° de janeiro de 1970, Tempo Universal Coordenado (UTC). Esse momento, chamado de epoch Unix, foi escolhido como ponto de referência quando os sistemas operacionais Unix estavam sendo desenvolvidos. A beleza dos Unix timestamps é que eles são independentes de fuso horário. Um timestamp representa exatamente o mesmo momento no tempo independentemente de onde no mundo você esteja.

## Milissegundos versus segundos

Alguns sistemas, particularmente navegadores web e aplicações JavaScript, usam milissegundos em vez de segundos para seus timestamps. Uma chamada JavaScript Date.now() retorna algo como 1700000000000 — um número cerca de 1000 vezes maior que o Unix timestamp equivalente em segundos. Se o número que você tem tem cerca de treze dígitos, provavelmente está em milissegundos: divida por 1000 e informe o resultado.

## Usos comuns

Timestamps aparecem em arquivos de log, registros de banco de dados, respostas de API, cabeçalhos de cache, certificados criptográficos e inúmeros outros contextos. Convertê-los para datas legíveis ajuda com depuração, análise de dados, auditoria de conformidade e qualquer situação em que você precisa entender quando algo aconteceu.

## Privado

Tudo roda no seu navegador. Nenhum dado é enviado a lugar nenhum.
`
},

// ── MATH ─────────────────────────────────────────────────────────────────
{
  slug:'unitconverter', category:'math', icon:'📐',
  script:'unitconverter.js',
  widget:`<div id="uc-app"><div class="row"><div class="field"><label for="uc-cat">{{ui.category}}</label><select id="uc-cat"><option value="length">{{ui.length}}</option><option value="weight">{{ui.weight}}</option><option value="temp">{{ui.temperature}}</option><option value="volume">{{ui.volume}}</option><option value="area">{{ui.area}}</option><option value="speed">{{ui.speed}}</option></select></div></div><div class="row"><div class="field"><label for="uc-val">{{ui.value}}</label><input type="number" id="uc-val" step="any" inputmode="decimal"></div><div class="field"><label for="uc-from">{{ui.from}}</label><select id="uc-from"></select></div><div class="field"><label for="uc-to">{{ui.to}}</label><select id="uc-to"></select></div></div><div class="result"><span class="hint">{{ui.result}}: </span><span class="big" id="uc-out">—</span></div></div>`,
  en:{
    title:'Unit Converter — convert length, weight, temperature, and more',
    metaDescription:'Free unit converter. Convert between meters and feet, kilograms and pounds, Celsius and Fahrenheit, liters and gallons, and many more units instantly in your browser.',
    h1:'Unit Converter',
    intro:'Choose a category, enter a value, select the units to convert from and to, and read the result instantly.',
    faq_title:'Unit converter FAQ',
    ui:{category:'Category',length:'Length',weight:'Weight / Mass',temperature:'Temperature',volume:'Volume',area:'Area',speed:'Speed',value:'Value',from:'From',to:'To',result:'Result'},
    faq:[
      {q:'Which unit systems are covered?',a:'The converter covers metric (SI) units, US customary units, and British imperial units for each category. Common units are included for length, weight, temperature, volume, area, and speed.'},
      {q:'How is temperature conversion different from other conversions?',a:'Temperature conversion is not a simple multiplication — it involves an offset. Converting from Celsius to Fahrenheit multiplies by 9/5 and adds 32. The calculator handles this automatically.'},
      {q:'Are the conversions exact?',a:'The factors used are the internationally agreed exact or highly precise values. For practical purposes all results are accurate to many significant figures.'}
    ]
  },
  pt:{
    title:'Conversor de Unidades — converta comprimento, peso, temperatura e mais',
    metaDescription:'Conversor de unidades gratuito. Converta entre metros e pés, quilogramas e libras, Celsius e Fahrenheit, litros e galões e muito mais na hora no seu navegador.',
    h1:'Conversor de Unidades',
    intro:'Escolha uma categoria, informe um valor, selecione as unidades de origem e destino, e leia o resultado na hora.',
    faq_title:'Perguntas frequentes do conversor de unidades',
    ui:{category:'Categoria',length:'Comprimento',weight:'Peso / Massa',temperature:'Temperatura',volume:'Volume',area:'Área',speed:'Velocidade',value:'Valor',from:'De',to:'Para',result:'Resultado'},
    faq:[
      {q:'Quais sistemas de unidades são cobertos?',a:'O conversor cobre unidades métricas (SI), unidades habituais dos EUA e unidades imperiais britânicas para cada categoria. Unidades comuns são incluídas para comprimento, peso, temperatura, volume, área e velocidade.'},
      {q:'Como a conversão de temperatura é diferente das outras conversões?',a:'A conversão de temperatura não é uma simples multiplicação — envolve um deslocamento. Converter de Celsius para Fahrenheit multiplica por 9/5 e adiciona 32. A calculadora trata isso automaticamente.'},
      {q:'As conversões são exatas?',a:'Os fatores usados são os valores exatos ou altamente precisos acordados internacionalmente. Para fins práticos todos os resultados são precisos com muitos algarismos significativos.'}
    ]
  },
  contentEn:`## Convert any measurement between unit systems instantly

Every day people need to translate measurements from one system to another. A recipe calls for fluid ounces but your measuring jug shows millilitres. A product's dimensions are listed in inches but you work in centimetres. The weather forecast on a foreign website shows Fahrenheit and you think in Celsius. A car's fuel efficiency is given in miles per gallon but you know litres per hundred kilometres. This unit converter handles all of these and more in one place.

## Categories covered

**Length**: metres, centimetres, millimetres, kilometres, inches, feet, yards, miles, and nautical miles. Useful for construction, geography, sports, and everyday measurement.

**Weight and mass**: kilograms, grams, milligrams, tonnes, pounds, ounces, and US tons. Essential for cooking, shipping, fitness, and scientific work.

**Temperature**: Celsius, Fahrenheit, and Kelvin. The most commonly needed conversion across the world, since the US uses Fahrenheit while most other countries use Celsius.

**Volume**: litres, millilitres, cubic metres, cubic centimetres, US gallons, US fluid ounces, US cups, UK gallons, and UK fluid ounces. Vital for cooking, chemistry, and fuel measurement.

**Area**: square metres, square kilometres, square centimetres, square inches, square feet, square yards, square miles, and acres. Used in real estate, agriculture, and construction.

**Speed**: metres per second, kilometres per hour, miles per hour, knots, and feet per second. Relevant for travel, physics, and sports performance.

## The metric and imperial divide

Most of the world uses the International System of Units (SI), colloquially called the metric system, because it is based on powers of ten and requires no memorisation of arbitrary conversion factors. The United States is one of only three countries (alongside Liberia and Myanmar) that has not officially adopted the metric system as its primary measurement system, which is why US-to-metric conversions remain so frequently needed.

The British imperial system sits between the two: the UK officially uses metric for most purposes but imperial units persist in everyday speech — people talk about their height in feet and inches, body weight in stone and pounds, road distances in miles, and beer in pints.

## Temperature: the most requested conversion

Celsius to Fahrenheit is among the most searched unit conversions on the internet, and for good reason: temperatures are reported in different scales across different countries and understanding the difference is essential for travel, cooking, and interpreting weather forecasts. A quick reference: 0°C = 32°F (freezing), 20°C = 68°F (pleasant room temperature), 37°C = 98.6°F (normal body temperature), 100°C = 212°F (boiling water at sea level).

## How the conversion works

Each category uses a base unit. For length, the base is the metre. All other units are defined by their exact relationship to the metre. Converting from any unit to any other unit goes through the base: value → base unit → target unit. For temperature, the special offset formula is applied directly.

All conversion factors used are the internationally agreed exact or highly precise definitions. The result is accurate to many significant figures, more than enough for any practical use.

## Private and instant

The converter runs entirely in your browser. No data is sent to any server. Results appear as you type.
`,
  contentPt:`## Converta qualquer medida entre sistemas de unidades na hora

Todo dia as pessoas precisam traduzir medidas de um sistema para outro. Uma receita pede onças líquidas, mas seu copo medidor mostra mililitros. As dimensões de um produto estão listadas em polegadas mas você trabalha em centímetros. A previsão do tempo em um site estrangeiro mostra Fahrenheit e você pensa em Celsius. Este conversor de unidades trata de todos esses casos e mais em um único lugar.

## Categorias cobertas

**Comprimento**: metros, centímetros, milímetros, quilômetros, polegadas, pés, jardas, milhas e milhas náuticas.

**Peso e massa**: quilogramas, gramas, miligramas, toneladas, libras, onças e toneladas curtas dos EUA.

**Temperatura**: Celsius, Fahrenheit e Kelvin. A conversão mais frequentemente necessária no mundo, já que os EUA usam Fahrenheit enquanto a maioria dos outros países usa Celsius.

**Volume**: litros, mililitros, metros cúbicos, centímetros cúbicos, galões dos EUA, onças líquidas dos EUA, xícaras dos EUA, galões do Reino Unido e onças líquidas do Reino Unido.

**Área**: metros quadrados, quilômetros quadrados, centímetros quadrados, polegadas quadradas, pés quadrados, jardas quadradas, milhas quadradas e acres.

**Velocidade**: metros por segundo, quilômetros por hora, milhas por hora, nós e pés por segundo.

## Temperatura: a conversão mais solicitada

Celsius para Fahrenheit está entre as conversões de unidades mais buscadas na internet. Uma referência rápida: 0°C = 32°F (congelamento), 20°C = 68°F (temperatura ambiente agradável), 37°C = 98,6°F (temperatura corporal normal), 100°C = 212°F (água fervendo ao nível do mar).

## Privado e instantâneo

O conversor roda inteiramente no seu navegador. Nenhum dado é enviado a nenhum servidor. Os resultados aparecem enquanto você digita.
`
},

{
  slug:'percentage', category:'math', icon:'%',
  // skip - already done
},

{
  slug:'fractioncalc', category:'math', icon:'½',
  script:'fractioncalc.js',
  widget:`<form id="frac-form"><div class="row"><div class="field" style="max-width:200px"><label>{{ui.fraction_a}}</label><div style="display:flex;align-items:center;gap:0.25rem"><input type="number" id="frac-a-num" step="1" placeholder="{{ui.num}}" style="width:60px"> / <input type="number" id="frac-a-den" step="1" min="1" placeholder="{{ui.den}}" style="width:60px"></div></div><div class="field" style="max-width:60px;align-self:flex-end;padding-bottom:0.5rem"><select id="frac-op"><option value="+">+</option><option value="-">−</option><option value="*">×</option><option value="/">÷</option></select></div><div class="field" style="max-width:200px"><label>{{ui.fraction_b}}</label><div style="display:flex;align-items:center;gap:0.25rem"><input type="number" id="frac-b-num" step="1" placeholder="{{ui.num}}" style="width:60px"> / <input type="number" id="frac-b-den" step="1" min="1" placeholder="{{ui.den}}" style="width:60px"></div></div></div><div class="result"><span class="hint">{{ui.result}}: </span><span class="big" id="frac-out">—</span></div><div id="frac-decimal" style="opacity:0.7;font-size:0.9rem"></div></form>`,
  en:{
    title:'Fraction Calculator — add, subtract, multiply and simplify fractions',
    metaDescription:'Free fraction calculator. Add, subtract, multiply or divide any two fractions and get the simplified result instantly. Also shows the decimal equivalent.',
    h1:'Fraction Calculator',
    intro:'Enter two fractions, choose an operation, and see the simplified result plus its decimal value.',
    faq_title:'Fraction calculator FAQ',
    ui:{fraction_a:'Fraction A',fraction_b:'Fraction B',num:'Num',den:'Den',result:'Result'},
    faq:[
      {q:'How are the results simplified?',a:'The calculator divides numerator and denominator by their greatest common divisor (GCD) to produce the fraction in its simplest form. For example, 4/8 simplifies to 1/2.'},
      {q:'Can I enter negative fractions?',a:'Yes, enter a negative numerator. For example -3/4 represents negative three quarters.'},
      {q:'What if the denominator is zero?',a:'Division by zero is undefined. If you enter a denominator of zero the result will show an error.'}
    ]
  },
  pt:{
    title:'Calculadora de Frações — some, subtraia, multiplique e simplifique frações',
    metaDescription:'Calculadora de frações gratuita. Some, subtraia, multiplique ou divida quaisquer duas frações e obtenha o resultado simplificado na hora. Também mostra o equivalente decimal.',
    h1:'Calculadora de Frações',
    intro:'Informe duas frações, escolha uma operação, e veja o resultado simplificado mais seu valor decimal.',
    faq_title:'Perguntas frequentes da calculadora de frações',
    ui:{fraction_a:'Fração A',fraction_b:'Fração B',num:'Num',den:'Den',result:'Resultado'},
    faq:[
      {q:'Como os resultados são simplificados?',a:'A calculadora divide o numerador e o denominador pelo seu máximo divisor comum (MDC) para produzir a fração na sua forma mais simples. Por exemplo, 4/8 simplifica para 1/2.'},
      {q:'Posso informar frações negativas?',a:'Sim, informe um numerador negativo. Por exemplo -3/4 representa menos três quartos.'},
      {q:'E se o denominador for zero?',a:'Divisão por zero é indefinida. Se você informar um denominador zero, o resultado mostrará um erro.'}
    ]
  },
  contentEn:`## Work with fractions without pen and paper

Fractions are fundamental in mathematics, cooking, carpentry, engineering, and many everyday situations, yet the rules for combining them are easy to mix up. Adding two fractions requires a common denominator; multiplying does not. Division flips and multiplies. Simplifying the result means finding and dividing by the greatest common divisor. This calculator handles all of those steps automatically. Enter two fractions, choose your operation, and the simplified result appears instantly.

## How fraction operations work

**Addition and subtraction** require a common denominator. To add 1/3 and 1/4, find the least common multiple of 3 and 4, which is 12. Convert both fractions: 1/3 becomes 4/12 and 1/4 becomes 3/12. Now add the numerators: 7/12. The same logic applies for subtraction: convert to a common denominator, then subtract the numerators.

**Multiplication** is simpler: multiply the numerators together and the denominators together. One third times one quarter is 1×1 over 3×4, which is 1/12. There is no need for a common denominator.

**Division** works by multiplying by the reciprocal of the second fraction. One third divided by one quarter equals one third times four over one, which is 4/3.

## Simplification

After any operation the result is reduced to its simplest form. The calculator computes the greatest common divisor of the numerator and denominator using the Euclidean algorithm and divides both by it. If the denominator of the result is 1, the fraction is displayed as a whole number.

## Mixed numbers and improper fractions

An improper fraction has a numerator larger than its denominator, like 7/4. This is equivalent to the mixed number 1¾. The calculator works with improper fractions directly — enter 7 as the numerator and 4 as the denominator. The decimal equivalent shown helps you understand the magnitude of the result.

## Learning and teaching fractions

Fraction calculators are popular with students learning the rules for the first time. Being able to check your hand-calculated answer instantly builds understanding and catches errors early. Seeing the simplified result alongside the decimal equivalent reinforces the connection between the fraction representation and the actual value.

Teachers use fraction calculators to generate examples and verify solutions quickly. The step-by-step logic — common denominator, add numerators, simplify — is the same whether done by hand or by calculator; the tool simply automates the arithmetic.

## Cooking and recipes

Many traditional recipes use fractions: half a cup, three quarters of a teaspoon, two thirds of a pound. Scaling a recipe up or down requires multiplying the ingredient amounts by the scaling factor. If a recipe calls for 3/4 cup of flour and you want to make two and a half times the recipe, you need 3/4 × 5/2 = 15/8 = 1 and 7/8 cups. The calculator handles this directly.

## Private and instant

All calculations run in your browser. No data is sent anywhere.
`,
  contentPt:`## Trabalhe com frações sem papel e caneta

Frações são fundamentais na matemática, culinária, carpintaria, engenharia e muitas situações cotidianas, mas as regras para combiná-las são fáceis de confundir. Somar duas frações requer um denominador comum; multiplicar não. Divisão inverte e multiplica. Simplificar o resultado significa encontrar e dividir pelo máximo divisor comum. Esta calculadora lida com todas essas etapas automaticamente.

## Como as operações com frações funcionam

**Adição e subtração** requerem um denominador comum. Para somar 1/3 e 1/4, encontre o mínimo múltiplo comum de 3 e 4, que é 12. Converta as duas frações: 1/3 vira 4/12 e 1/4 vira 3/12. Agora some os numeradores: 7/12.

**Multiplicação** é mais simples: multiplique os numeradores juntos e os denominadores juntos. Um terço vezes um quarto é 1×1 sobre 3×4, que é 1/12.

**Divisão** funciona multiplicando pelo recíproco da segunda fração. Um terço dividido por um quarto é igual a um terço vezes quatro sobre um, que é 4/3.

## Simplificação

Após qualquer operação o resultado é reduzido à sua forma mais simples. A calculadora computa o máximo divisor comum do numerador e do denominador usando o algoritmo de Euclides e divide os dois por ele.

## Culinária e receitas

Muitas receitas tradicionais usam frações: meia xícara, três quartos de colher de chá, dois terços de uma libra. Escalar uma receita para cima ou para baixo requer multiplicar as quantidades dos ingredientes pelo fator de escala. A calculadora lida com isso diretamente.

## Privado e instantâneo

Todos os cálculos rodam no seu navegador. Nenhum dado é enviado a lugar nenhum.
`
},

{
  slug:'primechecker', category:'math', icon:'🔢',
  script:'primechecker.js',
  widget:`<form id="prime-form"><div class="row"><div class="field"><label for="prime-n">{{ui.number}}</label><input type="number" id="prime-n" step="1" min="1" inputmode="numeric"></div></div><div class="result"><span class="big" id="prime-out">—</span></div><div id="prime-factors" style="opacity:0.7;font-size:0.9rem;margin-top:0.5rem"></div></form>`,
  en:{
    title:'Prime Number Checker — is this number prime?',
    metaDescription:'Free prime number checker. Enter any positive integer to instantly find out if it is prime. Also shows all divisors and the prime factorization.',
    h1:'Prime Number Checker',
    intro:'Enter a positive integer to check if it is prime and see its divisors and prime factorization.',
    faq_title:'Prime checker FAQ',
    ui:{number:'Number'},
    faq:[
      {q:'What is a prime number?',a:'A prime number is a positive integer greater than 1 that has no positive divisors other than 1 and itself. The first primes are 2, 3, 5, 7, 11, 13, 17, 19, 23, and 29. The number 1 is not considered prime by modern convention.'},
      {q:'What is prime factorization?',a:'Every integer greater than 1 can be expressed as a product of prime numbers in exactly one way (the Fundamental Theorem of Arithmetic). For example, 60 = 2 × 2 × 3 × 5.'},
      {q:'How large a number can I check?',a:'The tool works efficiently for numbers up to about 10 million using trial division. Very large numbers may take a moment to process.'}
    ]
  },
  pt:{
    title:'Verificador de Número Primo — este número é primo?',
    metaDescription:'Verificador de número primo gratuito. Informe qualquer inteiro positivo para descobrir na hora se é primo. Também mostra todos os divisores e a fatoração em primos.',
    h1:'Verificador de Número Primo',
    intro:'Informe um inteiro positivo para verificar se é primo e ver seus divisores e fatoração em primos.',
    faq_title:'Perguntas frequentes do verificador de primos',
    ui:{number:'Número'},
    faq:[
      {q:'O que é um número primo?',a:'Um número primo é um inteiro positivo maior que 1 que não tem divisores positivos além de 1 e ele mesmo. Os primeiros primos são 2, 3, 5, 7, 11, 13, 17, 19, 23 e 29. O número 1 não é considerado primo por convenção moderna.'},
      {q:'O que é fatoração em primos?',a:'Todo inteiro maior que 1 pode ser expresso como produto de números primos de exatamente uma forma (Teorema Fundamental da Aritmética). Por exemplo, 60 = 2 × 2 × 3 × 5.'},
      {q:'Qual número tão grande posso verificar?',a:'A ferramenta funciona eficientemente para números até cerca de 10 milhões usando divisão por tentativa. Números muito grandes podem demorar um momento para processar.'}
    ]
  },
  contentEn:`## Is this number prime?

A prime number is one of the most fundamental concepts in mathematics — a positive integer greater than 1 that cannot be divided evenly by any number other than 1 and itself. Determining whether a given number is prime is a question that has fascinated mathematicians for millennia and remains practically important in modern cryptography. This tool answers it instantly for any number you enter, and also shows the complete list of divisors and the prime factorization.

## What makes a number prime?

The definition is simple: a positive integer is prime if its only positive divisors are 1 and itself. The number 7 is prime because it can only be divided evenly by 1 and 7. The number 8 is not prime — it is also divisible by 2 and 4. The number 1 is a special case: by modern mathematical convention it is not considered prime, because including it would break the uniqueness of prime factorization.

The first few primes are 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47. Note that 2 is the only even prime number, because every other even number is divisible by 2.

## Prime factorization

The Fundamental Theorem of Arithmetic states that every integer greater than 1 can be expressed as a product of prime numbers in exactly one way, up to the order of the factors. This is called the prime factorization. For example: 12 = 2 × 2 × 3, written as 2² × 3. The number 360 = 2³ × 3² × 5. Finding the prime factorization of a number means breaking it down into its prime components, which reveals its mathematical structure.

## Why primes matter

Primes are the building blocks of all integers — every composite (non-prime) number can be constructed by multiplying primes together. This makes them central to number theory, the branch of mathematics concerned with the properties of integers.

In modern computing, the difficulty of factoring large numbers into their prime components is the foundation of RSA encryption, which secures most of the internet's encrypted communications. Two large primes are multiplied together to create a public key. Factoring that product back into its primes — without knowing them in advance — is computationally infeasible for sufficiently large numbers.

## How the check works

The tool uses trial division: it tests whether the number is divisible by any integer from 2 up to the square root of the number. If any such divisor exists, the number is composite and the tool records its factors. If none exist, the number is prime. The square root limit works because if a number n has a factor larger than √n, it must also have a corresponding factor smaller than √n, so we can stop at the square root.

## Everyday uses

While the deep mathematical importance of primes is in cryptography and number theory, everyday uses include puzzles, educational exercises, and programming challenges. Students learning about divisibility, factors, and multiples frequently need to check primality and find factorizations as part of arithmetic exercises.

## Private and instant

The calculation runs in your browser. No number you enter is sent to any server.
`,
  contentPt:`## Este número é primo?

Um número primo é um dos conceitos mais fundamentais da matemática — um inteiro positivo maior que 1 que não pode ser dividido igualmente por nenhum número além de 1 e ele mesmo. Determinar se um dado número é primo é uma questão que fascinou matemáticos por milênios e permanece praticamente importante na criptografia moderna. Esta ferramenta responde na hora para qualquer número que você informar, e também mostra a lista completa de divisores e a fatoração em primos.

## O que torna um número primo?

A definição é simples: um inteiro positivo é primo se seus únicos divisores positivos são 1 e ele mesmo. O número 7 é primo porque só pode ser dividido igualmente por 1 e 7. O número 8 não é primo — também é divisível por 2 e 4. O número 1 é um caso especial: por convenção matemática moderna, não é considerado primo.

Os primeiros primos são 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47. Note que 2 é o único número primo par.

## Fatoração em primos

O Teorema Fundamental da Aritmética afirma que todo inteiro maior que 1 pode ser expresso como produto de números primos de exatamente uma forma. Por exemplo: 12 = 2 × 2 × 3, escrito como 2² × 3.

## Por que os primos importam

Na computação moderna, a dificuldade de fatorar números grandes em seus componentes primos é a base da criptografia RSA, que protege a maioria das comunicações criptografadas da internet.

## Privado e instantâneo

O cálculo roda no seu navegador. Nenhum número que você informa é enviado a nenhum servidor.
`
},

{
  slug:'pythagorean', category:'math', icon:'📐',
  script:'pythagorean.js',
  widget:`<form id="pyth-form"><div class="row"><div class="field"><label for="pyth-a">{{ui.side_a}}</label><input type="number" id="pyth-a" step="any" min="0" inputmode="decimal"></div><div class="field"><label for="pyth-b">{{ui.side_b}}</label><input type="number" id="pyth-b" step="any" min="0" inputmode="decimal"></div><div class="field"><label for="pyth-c">{{ui.hypotenuse}}</label><input type="number" id="pyth-c" step="any" min="0" inputmode="decimal"></div></div><div class="result"><span class="hint">{{ui.missing}}: </span><span class="big" id="pyth-out">—</span></div><p style="font-size:0.85rem;opacity:0.6;margin-top:0.5rem">{{ui.hint}}</p></form>`,
  en:{
    title:'Pythagorean Theorem Calculator — find the missing side of a right triangle',
    metaDescription:'Free Pythagorean theorem calculator. Enter any two sides of a right triangle to find the third. Works for hypotenuse or either leg. Instant and accurate.',
    h1:'Pythagorean Theorem Calculator',
    intro:'Enter any two sides of a right triangle and leave the third blank. The missing side is calculated automatically.',
    faq_title:'Pythagorean theorem FAQ',
    ui:{side_a:'Side a',side_b:'Side b',hypotenuse:'Hypotenuse c',missing:'Missing side',hint:'Leave one field blank — it will be calculated from the other two.'},
    faq:[
      {q:'What is the Pythagorean theorem?',a:'For a right triangle with legs a and b and hypotenuse c, the theorem states that a² + b² = c². The hypotenuse is always the side opposite the right angle and is always the longest side.'},
      {q:'Can I find a leg if I know the hypotenuse and the other leg?',a:'Yes. If you know c and a, then b = √(c² − a²). Enter values in c and a and leave b blank.'},
      {q:'What units can I use?',a:'Any consistent unit: metres, feet, centimetres, inches. The result is in the same unit as the inputs.'}
    ]
  },
  pt:{
    title:'Calculadora do Teorema de Pitágoras — encontre o lado faltante do triângulo retângulo',
    metaDescription:'Calculadora do Teorema de Pitágoras gratuita. Informe dois lados de um triângulo retângulo para encontrar o terceiro. Funciona para hipotenusa ou cateto. Instantâneo e preciso.',
    h1:'Calculadora do Teorema de Pitágoras',
    intro:'Informe quaisquer dois lados de um triângulo retângulo e deixe o terceiro em branco. O lado faltante é calculado automaticamente.',
    faq_title:'Perguntas frequentes do Teorema de Pitágoras',
    ui:{side_a:'Cateto a',side_b:'Cateto b',hypotenuse:'Hipotenusa c',missing:'Lado faltante',hint:'Deixe um campo em branco — ele será calculado a partir dos outros dois.'},
    faq:[
      {q:'O que é o Teorema de Pitágoras?',a:'Para um triângulo retângulo com catetos a e b e hipotenusa c, o teorema afirma que a² + b² = c². A hipotenusa é sempre o lado oposto ao ângulo reto e é sempre o lado mais longo.'},
      {q:'Posso encontrar um cateto se conheço a hipotenusa e o outro cateto?',a:'Sim. Se você conhece c e a, então b = √(c² − a²). Informe valores em c e a e deixe b em branco.'},
      {q:'Que unidades posso usar?',a:'Qualquer unidade consistente: metros, pés, centímetros, polegadas. O resultado está na mesma unidade que as entradas.'}
    ]
  },
  contentEn:`## Find any side of a right triangle instantly

The Pythagorean theorem is one of the most useful and widely known results in all of mathematics. For any right triangle — a triangle with one angle equal to exactly 90 degrees — the square of the hypotenuse equals the sum of the squares of the other two sides. This calculator lets you find any one of the three sides when you know the other two.

## The formula

The classic statement is a² + b² = c², where a and b are the two shorter sides (called legs) and c is the hypotenuse — the side opposite the right angle and always the longest side. To find the hypotenuse: c = √(a² + b²). To find a leg: a = √(c² − b²).

## How to use the calculator

Enter any two of the three values — side a, side b, and hypotenuse c — and leave the third blank. The tool detects which value is missing and computes it automatically. For example, enter 3 in side a and 4 in side b, and the calculator instantly returns 5 for the hypotenuse, confirming the famous 3-4-5 right triangle. Or enter 5 in the hypotenuse and 3 in side a, and it returns 4 for side b.

## Practical applications

**Construction and carpentry**: Ensuring a corner is square (a true right angle) is one of the most common uses of the Pythagorean theorem in physical work. The classic 3-4-5 method — measuring 3 units along one wall, 4 units along the adjacent wall, and checking that the diagonal measures 5 units — has been used by builders for thousands of years. The calculator generalises this to any measurements.

**Screen and display sizes**: When manufacturers advertise a television or monitor by diagonal screen size, they are giving the hypotenuse of the rectangle formed by the screen's width and height. If you know the diagonal and the aspect ratio, the Pythagorean theorem lets you find the actual width and height.

**Distance calculations**: On a flat surface, the straight-line distance between two points with coordinates (x₁, y₁) and (x₂, y₂) is √((x₂−x₁)² + (y₂−y₁)²), a direct application of the theorem.

**Navigation**: Before GPS, navigators used dead reckoning, calculating their position from known speeds, headings, and time elapsed. Diagonal components of journeys — going north and east simultaneously — require the Pythagorean theorem to find the straight-line distance covered.

## Historical context

The theorem is named after Pythagoras of Samos, the ancient Greek mathematician and philosopher who lived around 570–495 BCE, though the relationship was known to Babylonian and Indian mathematicians centuries earlier. Babylonian tablets from around 1800 BCE list Pythagorean triples — sets of three whole numbers satisfying the theorem — long before Pythagoras was born.

## Private and instant

All calculations run in your browser. No data is sent to any server.
`,
  contentPt:`## Encontre qualquer lado de um triângulo retângulo na hora

O Teorema de Pitágoras é um dos resultados mais úteis e amplamente conhecidos de toda a matemática. Para qualquer triângulo retângulo — um triângulo com um ângulo igual a exatamente 90 graus — o quadrado da hipotenusa é igual à soma dos quadrados dos outros dois lados.

## A fórmula

A afirmação clássica é a² + b² = c², onde a e b são os dois lados mais curtos (chamados catetos) e c é a hipotenusa — o lado oposto ao ângulo reto e sempre o lado mais longo. Para encontrar a hipotenusa: c = √(a² + b²). Para encontrar um cateto: a = √(c² − b²).

## Aplicações práticas

**Construção e carpintaria**: Garantir que um canto seja quadrado é um dos usos mais comuns do Teorema de Pitágoras em trabalho físico. O clássico método 3-4-5 — medir 3 unidades ao longo de uma parede, 4 unidades ao longo da parede adjacente e verificar que a diagonal mede 5 unidades — tem sido usado por construtores há milhares de anos.

**Tamanhos de telas**: Quando os fabricantes anunciam uma televisão ou monitor pelo tamanho diagonal da tela, estão dando a hipotenusa do retângulo formado pela largura e altura da tela.

**Cálculos de distância**: Em uma superfície plana, a distância em linha reta entre dois pontos com coordenadas (x₁, y₁) e (x₂, y₂) é √((x₂−x₁)² + (y₂−y₁)²).

## Privado e instantâneo

Todos os cálculos rodam no seu navegador. Nenhum dado é enviado a nenhum servidor.
`
},

// ── RANDOM / SORTEADORES ──────────────────────────────────────────────────
{
  slug:'rolldice', category:'random', icon:'🎲',
  script:'rolldice.js',
  widget:`<div id="dice-app" style="text-align:center"><div class="row" style="justify-content:center;flex-wrap:wrap;gap:0.5rem;margin-bottom:1rem"><button class="btn secondary dice-btn" data-sides="4">d4</button><button class="btn secondary dice-btn" data-sides="6">d6</button><button class="btn secondary dice-btn" data-sides="8">d8</button><button class="btn secondary dice-btn" data-sides="10">d10</button><button class="btn secondary dice-btn" data-sides="12">d12</button><button class="btn secondary dice-btn" data-sides="20">d20</button><button class="btn secondary dice-btn" data-sides="100">d100</button></div><div class="field" style="max-width:120px;margin:0 auto 1rem"><label for="dice-count">{{ui.num_dice}}</label><input type="number" id="dice-count" value="1" min="1" max="20" step="1"></div><button id="dice-roll" class="btn" style="font-size:1.2rem;padding:0.75rem 2rem">🎲 {{ui.roll}}</button><div id="dice-result" style="font-size:3rem;font-weight:700;margin:1rem 0">—</div><div id="dice-detail" style="opacity:0.7;font-size:0.9rem"></div></div>`,
  en:{
    title:'Dice Roller — roll virtual dice for any tabletop game',
    metaDescription:'Free online dice roller. Roll d4, d6, d8, d10, d12, d20, and d100 dice, alone or in groups. Perfect for D&D, tabletop RPGs, and board games. No download needed.',
    h1:'Dice Roller',
    intro:'Choose a die type and how many to roll, then click Roll. See individual results and the total.',
    faq_title:'Dice roller FAQ',
    ui:{num_dice:'Number of dice',roll:'Roll'},
    faq:[
      {q:'Which dice types are supported?',a:'The roller supports d4, d6, d8, d10, d12, d20, and d100 (percentile dice). These cover the full standard polyhedral set used in tabletop role-playing games.'},
      {q:'Are the rolls truly random?',a:'The tool uses the browser\'s Math.random() function, which provides pseudorandom numbers suitable for games. It is not cryptographically random but is more than fair enough for any gaming use.'},
      {q:'Can I roll multiple dice at once?',a:'Yes. Set the number of dice to any value from 1 to 20, choose your die type, and click Roll. Each die shows its individual result and the total is displayed prominently.'}
    ]
  },
  pt:{
    title:'Lançador de Dados — role dados virtuais para qualquer jogo de mesa',
    metaDescription:'Lançador de dados online gratuito. Role dados d4, d6, d8, d10, d12, d20 e d100, sozinhos ou em grupos. Perfeito para D&D, RPGs de mesa e jogos de tabuleiro.',
    h1:'Lançador de Dados',
    intro:'Escolha o tipo de dado e quantos rolar, depois clique em Rolar. Veja os resultados individuais e o total.',
    faq_title:'Perguntas frequentes do lançador de dados',
    ui:{num_dice:'Número de dados',roll:'Rolar'},
    faq:[
      {q:'Quais tipos de dados são suportados?',a:'O lançador suporta d4, d6, d8, d10, d12, d20 e d100 (dados percentuais). Esses cobrem o conjunto poliédrico padrão completo usado em jogos de RPG de mesa.'},
      {q:'As rolagens são verdadeiramente aleatórias?',a:'A ferramenta usa a função Math.random() do navegador, que fornece números pseudoaleatórios adequados para jogos. Não é aleatório criptograficamente, mas é mais do que justo para qualquer uso em jogos.'},
      {q:'Posso rolar vários dados ao mesmo tempo?',a:'Sim. Defina o número de dados para qualquer valor de 1 a 20, escolha o tipo de dado e clique em Rolar. Cada dado mostra seu resultado individual e o total é exibido em destaque.'}
    ]
  },
  contentEn:`## Roll any polyhedral die, anytime

Tabletop role-playing games, board games, and many classroom activities rely on dice. When physical dice are not available — or when you need a type your collection does not include — a virtual dice roller fills the gap immediately. This tool simulates every standard polyhedral die used in gaming: d4, d6, d8, d10, d12, d20, and d100. Roll a single die or up to twenty at once.

## The standard polyhedral dice

**d4 (tetrahedron)**: Four faces numbered 1 to 4. Used in D&D for small weapons like daggers and for certain spells.

**d6 (cube)**: Six faces, the most familiar die shape. Used in most board games, D&D damage rolls, and games like Yahtzee.

**d8 (octahedron)**: Eight faces numbered 1 to 8. Common for longsword damage and hit dice for some character classes.

**d10 (pentagonal trapezohedron)**: Ten faces numbered 0 to 9 (or 1 to 10). Also used as the tens digit alongside another d10 to make a d100 roll.

**d12 (dodecahedron)**: Twelve faces. Used for greataxe damage and hit dice for barbarians.

**d20 (icosahedron)**: The iconic die of Dungeons & Dragons. Roll to attack, to make ability checks, and for saving throws. Results of 1 and 20 are critical misses and critical hits.

**d100 (percentile)**: Simulated by rolling two d10s to get a value from 1 to 100. Used for random tables, percentile skills in some game systems, and loot tables.

## Rolling multiple dice

Many game situations call for rolling multiple dice and summing the results: 2d6 for sword damage, 3d8 for a fireball spell, 8d6 for a dragon's breath weapon. Set the number of dice to the desired count, choose the die type, and click Roll. The individual result of each die is shown alongside the total, which is useful when rules require checking individual dice (for example, "if any die shows a 1, reroll").

## Randomness and fairness

The tool uses the browser's built-in pseudorandom number generator, which produces results that are statistically fair across a large number of rolls. For casual gaming purposes this is entirely adequate. Over millions of rolls each face will appear approximately equally often, just as physical dice should when they are fair.

## Uses beyond gaming

Dice rollers are used in teaching probability — rolling a d6 many times and charting the distribution shows students what uniform probability looks like in practice. Teachers use them to generate random numbers for classroom exercises. Statisticians and simulation enthusiasts sometimes use dice notation to describe random processes.

## Private and instant

No roll is recorded or sent anywhere. The tool works offline once the page loads.
`,
  contentPt:`## Role qualquer dado poliédrico, quando quiser

Jogos de RPG de mesa, jogos de tabuleiro e muitas atividades de sala de aula dependem de dados. Quando dados físicos não estão disponíveis — ou quando você precisa de um tipo que sua coleção não inclui — um lançador de dados virtual preenche a lacuna imediatamente. Esta ferramenta simula todos os dados poliédricos padrão usados em jogos: d4, d6, d8, d10, d12, d20 e d100. Role um único dado ou até vinte ao mesmo tempo.

## Os dados poliédricos padrão

**d4**: Quatro faces. Usado em D&D para armas pequenas como adagas.

**d6**: Seis faces, o formato de dado mais familiar. Usado na maioria dos jogos de tabuleiro.

**d8**: Oito faces. Comum para dano de espada longa e dados de vida para certas classes de personagem.

**d10**: Dez faces. Também usado como o dígito das dezenas com outro d10 para fazer uma rolagem de d100.

**d12**: Doze faces. Usado para dano de machado e dados de vida para bárbaros.

**d20**: O dado icônico de Dungeons & Dragons. Role para atacar, fazer testes de habilidade e testes de resistência.

**d100 (percentual)**: Simulado rolando dois d10 para obter um valor de 1 a 100.

## Privado e instantâneo

Nenhuma rolagem é registrada ou enviada a lugar nenhum. A ferramenta funciona offline uma vez que a página carrega.
`
},

{
  slug:'randomname', category:'random', icon:'🎭',
  script:'randomname.js',
  widget:`<div id="rname-app" style="text-align:center"><div class="row" style="justify-content:center;gap:0.5rem;flex-wrap:wrap"><div class="field"><label for="rname-gender">{{ui.gender}}</label><select id="rname-gender"><option value="any">{{ui.any}}</option><option value="male">{{ui.male}}</option><option value="female">{{ui.female}}</option></select></div><div class="field"><label for="rname-origin">{{ui.origin}}</label><select id="rname-origin"><option value="en">{{ui.english}}</option><option value="es">{{ui.spanish}}</option><option value="ja">{{ui.japanese}}</option><option value="ar">{{ui.arabic}}</option></select></div></div><button id="rname-btn" class="btn" style="margin:1rem 0;font-size:1.1rem">🎭 {{ui.generate}}</button><div id="rname-out" style="font-size:2.5rem;font-weight:700;min-height:3rem">—</div></div>`,
  en:{
    title:'Random Name Generator — generate names for characters, games, or babies',
    metaDescription:'Free random name generator. Generate random first and last names by gender and cultural origin. Perfect for writers, game developers, and baby name inspiration.',
    h1:'Random Name Generator',
    intro:'Choose a gender and cultural origin, then click Generate to get a random first and last name.',
    faq_title:'Random name generator FAQ',
    ui:{gender:'Gender',any:'Any',male:'Male',female:'Female',origin:'Origin',english:'English',spanish:'Spanish',japanese:'Japanese',arabic:'Arabic',generate:'Generate name'},
    faq:[
      {q:'Where do the names come from?',a:'The names are drawn from curated lists of common first and last names for each cultural origin. They represent real naming conventions and typical name combinations for each tradition.'},
      {q:'Can I use these names for my story or game?',a:'Yes, the names are generated on your device and are not subject to any restrictions. Use them freely for fiction, games, or any creative project.'},
      {q:'Is this good for baby names?',a:'The generator can provide inspiration, but for baby names most parents also consider meaning, family tradition, and how the name sounds with their surname. Use this as a starting point.'}
    ]
  },
  pt:{
    title:'Gerador de Nomes Aleatórios — nomes para personagens, jogos ou bebês',
    metaDescription:'Gerador de nomes aleatórios gratuito. Gere nomes e sobrenomes aleatórios por gênero e origem cultural. Perfeito para escritores, desenvolvedores de jogos e inspiração para nomes de bebês.',
    h1:'Gerador de Nomes Aleatórios',
    intro:'Escolha um gênero e origem cultural, depois clique em Gerar para obter um nome e sobrenome aleatórios.',
    faq_title:'Perguntas frequentes do gerador de nomes',
    ui:{gender:'Gênero',any:'Qualquer',male:'Masculino',female:'Feminino',origin:'Origem',english:'Inglês',spanish:'Espanhol',japanese:'Japonês',arabic:'Árabe',generate:'Gerar nome'},
    faq:[
      {q:'De onde vêm os nomes?',a:'Os nomes são extraídos de listas curadas de nomes próprios e sobrenomes comuns para cada origem cultural. Eles representam convenções de nomenclatura reais para cada tradição.'},
      {q:'Posso usar esses nomes para minha história ou jogo?',a:'Sim, os nomes são gerados no seu dispositivo e não estão sujeitos a nenhuma restrição. Use-os livremente para ficção, jogos ou qualquer projeto criativo.'},
      {q:'É bom para nomes de bebês?',a:'O gerador pode fornecer inspiração, mas para nomes de bebês a maioria dos pais também considera significado, tradição familiar e como o nome soa com o sobrenome.'}
    ]
  },
  contentEn:`## Generate random names for any purpose

Whether you are a novelist creating characters for a story, a game developer populating an RPG world, a screenwriter needing placeholder names for a script, or simply curious about what name a random person might have in another culture, a name generator provides instant inspiration. This tool generates random first and last names from several cultural traditions, with options for gender and origin.

## Why random name generators exist

Writing and game design both require large numbers of unique names. A fantasy novel might have dozens of named characters. A video game might need names for hundreds of non-player characters. A tabletop role-playing game session might introduce several named NPCs. Coming up with culturally consistent, believable names is surprisingly time-consuming, and the pressure of creating them on the spot often leads to generic or repetitive choices. A random generator breaks this block immediately.

## Cultural origins and naming conventions

Names carry cultural weight. An English character named Sarah Chen immediately implies a different background than one named Ahmad Al-Rashid or Yuki Tanaka. This tool draws from separate lists for English, Spanish, Japanese, and Arabic naming conventions, so the generated names sound authentic within their tradition.

**English names** follow British and American conventions, drawing from common Anglo-Saxon, Norman, and modern given names paired with common English surnames.

**Spanish names** follow the conventions of Spanish-speaking countries, with names like Carlos, María, López, and García that are widely recognised across Latin America and Spain.

**Japanese names** place the family name first, following Japanese custom, with names drawn from common Japanese given and family names.

**Arabic names** reflect common given names used across Arabic-speaking countries, paired with common family names or surname patterns.

## Writers and worldbuilding

Fiction writers often use name generators to spark ideas rather than use the result directly. A generated name might be adapted — a character named James Thornton might become Jamie Thorne, or the generated names might inspire an entirely different direction. Many writers find that seeing a random name immediately conjures a personality, which can help develop a character they had not yet defined.

For fantasy and science fiction worldbuilding, generating many names quickly helps establish the sound and feel of a fictional culture. If all the generated names from a set start with particular consonants or syllable patterns, the writer might adopt those conventions for their fictional people.

## Baby name inspiration

Parents looking for name ideas sometimes use random generators to discover names they had not previously considered. The generator exposes names from other cultures that might not be familiar from daily life, expanding the possibilities. Seeing a name you had never thought of — and immediately loving it — is a common experience with name generators.

## Private and instant

All names are generated in your browser from built-in name lists. No data is sent anywhere, and the names generated are not tracked or stored.
`,
  contentPt:`## Gere nomes aleatórios para qualquer finalidade

Seja você um romancista criando personagens para uma história, um desenvolvedor de jogos populando um mundo de RPG, um roteirista precisando de nomes placeholder para um script, ou simplesmente curioso sobre qual nome uma pessoa aleatória poderia ter em outra cultura, um gerador de nomes fornece inspiração instantânea.

## Por que existem geradores de nomes aleatórios

Escrita e design de jogos ambos requerem grandes números de nomes únicos. Um romance de fantasia pode ter dezenas de personagens nomeados. Um videogame pode precisar de nomes para centenas de personagens não-jogáveis. Criar nomes culturalmente consistentes e críveis é surpreendentemente demorado.

## Origens culturais e convenções de nomenclatura

Nomes carregam peso cultural. Esta ferramenta utiliza listas separadas para convenções de nomenclatura inglesa, espanhola, japonesa e árabe, para que os nomes gerados soem autênticos dentro de sua tradição.

**Nomes em inglês** seguem convenções britânicas e americanas.

**Nomes em espanhol** seguem as convenções dos países de língua espanhola.

**Nomes japoneses** colocam o sobrenome primeiro, seguindo o costume japonês.

**Nomes em árabe** refletem nomes próprios comuns usados nos países de língua árabe.

## Privado e instantâneo

Todos os nomes são gerados no seu navegador a partir de listas de nomes integradas. Nenhum dado é enviado a lugar nenhum.
`
},

// ── TEXT ──────────────────────────────────────────────────────────────────
{
  slug:'readingtime', category:'text', icon:'📖',
  script:'readingtime.js',
  widget:`<div id="rt-app"><textarea id="rt-text" rows="8" style="width:100%;box-sizing:border-box;resize:vertical;padding:0.75rem;border-radius:0.5rem;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.05);color:inherit;font-size:1rem" placeholder="{{ui.paste_text}}"></textarea><div id="rt-results" style="display:flex;gap:1.5rem;flex-wrap:wrap;margin-top:0.75rem"><div><div class="hint">{{ui.words}}</div><div class="big" id="rt-words">0</div></div><div><div class="hint">{{ui.reading_time}}</div><div class="big" id="rt-time">0 {{ui.min}}</div></div><div><div class="hint">{{ui.speaking_time}}</div><div class="big" id="rt-speak">0 {{ui.min}}</div></div></div></div>`,
  en:{
    title:'Reading Time Calculator — how long to read any text',
    metaDescription:'Free reading time calculator. Paste any text to instantly see the word count, estimated reading time, and estimated speaking time. No signup needed.',
    h1:'Reading Time Calculator',
    intro:'Paste or type your text below. The word count, reading time, and speaking time update instantly.',
    faq_title:'Reading time FAQ',
    ui:{paste_text:'Paste or type your text here…',words:'Words',reading_time:'Reading time',speaking_time:'Speaking time',min:'min'},
    faq:[
      {q:'What reading speed does the calculator assume?',a:'The calculator uses 238 words per minute, which research suggests is the average silent reading speed for adults reading non-technical English prose. The actual speed varies by person, text complexity, and reading purpose.'},
      {q:'What speaking speed is used?',a:'Speaking time is estimated at 150 words per minute, which is a comfortable natural speaking pace. Presenters and podcasters often target 130–160 WPM for clarity.'},
      {q:'Does it count the words exactly?',a:'The word count splits on whitespace and filters out empty segments, which is the standard method. It matches most word processors for plain prose. Hyphenated words are counted as one word.'}
    ]
  },
  pt:{
    title:'Calculadora de Tempo de Leitura — quanto tempo para ler qualquer texto',
    metaDescription:'Calculadora de tempo de leitura gratuita. Cole qualquer texto para ver na hora a contagem de palavras, tempo estimado de leitura e tempo estimado de fala.',
    h1:'Calculadora de Tempo de Leitura',
    intro:'Cole ou digite seu texto abaixo. A contagem de palavras, o tempo de leitura e o tempo de fala se atualizam na hora.',
    faq_title:'Perguntas frequentes do tempo de leitura',
    ui:{paste_text:'Cole ou digite seu texto aqui…',words:'Palavras',reading_time:'Tempo de leitura',speaking_time:'Tempo de fala',min:'min'},
    faq:[
      {q:'Qual velocidade de leitura a calculadora assume?',a:'A calculadora usa 238 palavras por minuto, que pesquisas sugerem ser a velocidade média de leitura silenciosa para adultos lendo prosa não técnica em inglês.'},
      {q:'Qual velocidade de fala é usada?',a:'O tempo de fala é estimado a 150 palavras por minuto, que é um ritmo de fala natural confortável.'},
      {q:'Ela conta as palavras exatamente?',a:'A contagem de palavras divide por espaços em branco e filtra segmentos vazios, que é o método padrão. Corresponde à maioria dos processadores de texto para prosa simples.'}
    ]
  },
  contentEn:`## Know exactly how long your content will take to read

Before publishing an article, preparing a speech, or estimating how long a document will take to review, knowing the reading time is useful. Readers appreciate knowing what they are committing to — blog posts that display estimated reading times consistently show higher engagement. Speakers need to know whether their script will fit their allotted time. This tool gives you both the reading time and the speaking time instantly, based on your word count.

## How reading time is calculated

The average adult reading speed for non-technical prose is approximately 238 words per minute. This figure comes from studies of adult silent reading under normal conditions. The actual speed varies considerably: a skilled reader of light fiction might manage 350 words per minute, while a law student working through a dense statute might read at 100 words per minute or less. The estimate this tool provides is a reliable baseline for standard content.

The formula is straightforward: reading time in minutes equals word count divided by 238. A 1,000-word blog post takes about 4 minutes to read. A 2,500-word article takes about 10 minutes. A 60,000-word novel takes about 250 minutes, or over four hours — which is why chapter-by-chapter progress feels meaningful.

## Speaking time

The speaking time estimate uses 150 words per minute, which represents a comfortable, clear presentation pace. Professional speakers and radio broadcasters often target 130 to 160 words per minute because it is fast enough to hold attention but slow enough to be understood easily. Very fast speech — above 180 words per minute — starts to feel rushed. Conversational speech typically falls between 120 and 180 words per minute depending on the person and context.

If you are preparing a speech, presentation, or podcast script, the speaking time helps you judge whether your content fits your time slot. A 10-minute slot allows for roughly 1,500 words. A 20-minute TED-style talk accommodates about 3,000 words when delivered at a natural pace with appropriate pauses.

## Reading time in content publishing

Publications that add reading time estimates to articles — "5 min read," "12 min read" — do so because reader engagement research shows that knowing the time commitment reduces the rate at which readers abandon an article prematurely. When readers know they are looking at a 3-minute read, they are more likely to commit to finishing it. When they unexpectedly find themselves deep into a much longer piece, frustration at the unexpected length can cause them to leave.

For email newsletters, knowing the reading time helps calibrate the right length. An email that takes more than 3 to 4 minutes to read asks a significant amount of the recipient's attention and may see lower completion rates. Shorter is often better for email.

## Word count as a quality signal

Word count alone is a commonly misused metric. A 2,000-word article is not inherently better than a 500-word one — the right length is whatever it takes to fully cover the topic without padding. That said, for SEO purposes, articles that thoroughly cover a topic tend to be longer simply because covering a topic thoroughly requires more content. The reading time and word count together help writers gauge whether they have said enough.

## Private and instant

Your text never leaves your browser. The word counting and time calculation happens locally, so no content you paste is uploaded, stored, or analysed by any server.
`,
  contentPt:`## Saiba exatamente quanto tempo seu conteúdo levará para ser lido

Antes de publicar um artigo, preparar um discurso ou estimar quanto tempo um documento levará para ser revisado, conhecer o tempo de leitura é útil. Os leitores apreciam saber com o que estão se comprometendo. Falantes precisam saber se seu script caberá no tempo alocado. Esta ferramenta fornece tanto o tempo de leitura quanto o tempo de fala instantaneamente, com base na contagem de palavras.

## Como o tempo de leitura é calculado

A velocidade média de leitura de um adulto para prosa não técnica é de aproximadamente 238 palavras por minuto. A fórmula é direta: tempo de leitura em minutos é igual à contagem de palavras dividida por 238. Um post de blog de 1.000 palavras leva cerca de 4 minutos para ler.

## Tempo de fala

A estimativa de tempo de fala usa 150 palavras por minuto, que representa um ritmo de apresentação confortável e claro. Se você está preparando um discurso, apresentação ou roteiro de podcast, o tempo de fala ajuda a julgar se seu conteúdo se encaixa no seu horário.

## Tempo de leitura na publicação de conteúdo

Publicações que adicionam estimativas de tempo de leitura a artigos — "5 min de leitura," "12 min de leitura" — fazem isso porque pesquisas de engajamento do leitor mostram que conhecer o compromisso de tempo reduz a taxa em que os leitores abandonam um artigo prematuramente.

## Privado e instantâneo

Seu texto nunca sai do seu navegador. A contagem de palavras e o cálculo do tempo acontecem localmente, então nenhum conteúdo que você colar é enviado, armazenado ou analisado por nenhum servidor.
`
},

{
  slug:'morsetranslator', category:'text', icon:'• ─',
  script:'morsetranslator.js',
  widget:`<div id="morse-app"><div class="field"><label for="morse-in">{{ui.text_input}}</label><textarea id="morse-in" rows="3" style="width:100%;box-sizing:border-box;padding:0.75rem;border-radius:0.5rem;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.05);color:inherit;font-size:1rem" placeholder="{{ui.text_placeholder}}"></textarea></div><div class="result"><span class="hint">{{ui.morse}}: </span><span id="morse-out" style="word-break:break-all;letter-spacing:0.1em">—</span></div><button id="morse-play" class="btn secondary" style="margin-top:0.5rem">{{ui.play_audio}}</button><hr style="margin:1rem 0;opacity:0.3"><div class="field"><label for="morse-decode-in">{{ui.morse_input}}</label><textarea id="morse-decode-in" rows="2" style="width:100%;box-sizing:border-box;padding:0.75rem;border-radius:0.5rem;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.05);color:inherit;font-size:1rem" placeholder="{{ui.morse_placeholder}}"></textarea></div><div class="result"><span class="hint">{{ui.decoded}}: </span><span id="morse-decoded">—</span></div></div>`,
  en:{
    title:'Morse Code Translator — convert text to Morse code and back',
    metaDescription:'Free Morse code translator. Convert any text to Morse code dots and dashes, or decode Morse code back to text. Includes audio playback. Works entirely in your browser.',
    h1:'Morse Code Translator',
    intro:'Type text to see it translated to Morse code. Paste Morse code to decode it back to text. Click Play to hear the code as audio.',
    faq_title:'Morse code FAQ',
    ui:{text_input:'Text to encode',text_placeholder:'Type your message here…',morse:'Morse code',play_audio:'▶ Play audio',morse_input:'Morse code to decode',morse_placeholder:'e.g. .... . .-.. .-.. ---',decoded:'Decoded text'},
    faq:[
      {q:'What is Morse code?',a:'Morse code is a system for encoding letters, digits, and punctuation as sequences of dots and dashes (or short and long signals). It was developed in the 1830s and 1840s for use with the electrical telegraph. Each character has a unique dot-dash sequence.'},
      {q:'How do I separate letters in Morse code?',a:'Letters are separated by a single space. Words are separated by a slash / or three spaces. The decoder accepts both conventions.'},
      {q:'Does the audio playback work?',a:'Yes. The tool uses the Web Audio API to generate tones matching the dots and dashes. Dots are short tones, dashes are three times as long. Make sure your device volume is turned on.'}
    ]
  },
  pt:{
    title:'Tradutor de Código Morse — converta texto para Morse e vice-versa',
    metaDescription:'Tradutor de código Morse gratuito. Converta qualquer texto para pontos e traços do código Morse, ou decodifique código Morse de volta para texto. Inclui reprodução de áudio.',
    h1:'Tradutor de Código Morse',
    intro:'Digite texto para vê-lo traduzido para código Morse. Cole código Morse para decodificá-lo de volta para texto. Clique em Reproduzir para ouvir o código como áudio.',
    faq_title:'Perguntas frequentes do código Morse',
    ui:{text_input:'Texto para codificar',text_placeholder:'Digite sua mensagem aqui…',morse:'Código Morse',play_audio:'▶ Reproduzir áudio',morse_input:'Código Morse para decodificar',morse_placeholder:'ex: .... . .-.. .-.. ---',decoded:'Texto decodificado'},
    faq:[
      {q:'O que é código Morse?',a:'Código Morse é um sistema para codificar letras, dígitos e pontuação como sequências de pontos e traços. Foi desenvolvido nos anos 1830 e 1840 para uso com o telégrafo elétrico.'},
      {q:'Como separo letras no código Morse?',a:'Letras são separadas por um único espaço. Palavras são separadas por uma barra / ou três espaços. O decodificador aceita as duas convenções.'},
      {q:'A reprodução de áudio funciona?',a:'Sim. A ferramenta usa a Web Audio API para gerar tons correspondentes aos pontos e traços. Pontos são tons curtos, traços têm três vezes mais duração.'}
    ]
  },
  contentEn:`## Translate between text and Morse code

Morse code is one of the most recognisable encoding systems in history. Its distinctive dots and dashes communicated messages across continents and oceans long before voice transmission was possible. Today it is used in amateur radio, aviation, accessibility devices, and popular culture. This translator converts any text to Morse code instantly, plays the code as audio, and decodes Morse code back to plain text.

## The history of Morse code

Samuel Morse and Alfred Vail developed Morse code in the 1830s and 1840s for use with the electric telegraph, which could send signals as pulses over long copper wires. The code assigned each letter and digit a unique pattern of short signals (dots) and long signals (dashes). The original code, now called American Morse code, was later refined into International Morse code, which standardised the timing ratios and extended the character set. International Morse code is the version used worldwide today.

The famous SOS distress signal — three dots, three dashes, three dots (··· ─── ···) — was chosen for its simplicity and symmetry, making it easy to transmit even under stress.

## How Morse code works

Each letter, digit, and common punctuation mark has a unique sequence of dots and dashes. The letter E is just a single dot, while the letter T is a single dash — the most common letters in English get the shortest codes. Letters are separated by a pause equal to three dot lengths. Words are separated by a pause equal to seven dot lengths. This timing structure is what allows Morse to be transmitted audibly, by light, or mechanically.

The standard timing is:
- Dot: 1 unit
- Dash: 3 units
- Gap between elements of the same letter: 1 unit
- Gap between letters: 3 units
- Gap between words: 7 units

## Using the translator

**Encoding text**: Type your message in the top box. The Morse code appears immediately below, using dots and dashes separated by spaces. Each letter is separated from the next by a single space, and words are separated by a slash. Click Play to hear the code transmitted as audio tones through your browser's audio system.

**Decoding Morse**: Paste Morse code into the lower box using dots and dashes. Separate letters with single spaces and words with slashes (or three spaces). The decoded text appears immediately.

## Where Morse code is still used

Amateur (ham) radio operators around the world still use Morse code for long-distance communication, particularly when propagation conditions are poor. Morse code penetrates interference that would make voice communication impossible. International amateur radio licence exams in many countries still include a Morse code component.

Aviation uses Morse code for navigation beacons: VOR (VHF omnidirectional range) and ILS (instrument landing system) transmitters broadcast their identifier in Morse at regular intervals, allowing pilots to verify they are using the correct navaid.

Accessibility technology sometimes uses Morse code as an input method for people with limited mobility. A single button or switch can transmit dots and dashes, allowing full text input at speeds that proficient Morse operators can make surprisingly fast.

## Private and instant

All translation happens in your browser. No text you type is sent to any server.
`,
  contentPt:`## Traduza entre texto e código Morse

Código Morse é um dos sistemas de codificação mais reconhecíveis da história. Seus distintos pontos e traços comunicaram mensagens através de continentes e oceanos muito antes de a transmissão de voz ser possível. Hoje é usado em rádio amador, aviação, dispositivos de acessibilidade e cultura popular.

## A história do código Morse

Samuel Morse e Alfred Vail desenvolveram o código Morse nos anos 1830 e 1840 para uso com o telégrafo elétrico. O famoso sinal de socorro SOS — três pontos, três traços, três pontos (··· ─── ···) — foi escolhido por sua simplicidade e simetria.

## Como o código Morse funciona

Cada letra, dígito e pontuação comum tem uma sequência única de pontos e traços. A letra E é apenas um único ponto, enquanto a letra T é um único traço — as letras mais comuns em inglês recebem os códigos mais curtos.

## Usando o tradutor

**Codificando texto**: Digite sua mensagem na caixa superior. O código Morse aparece imediatamente abaixo. Clique em Reproduzir para ouvir o código transmitido como tons de áudio.

**Decodificando Morse**: Cole código Morse na caixa inferior usando pontos e traços. O texto decodificado aparece imediatamente.

## Privado e instantâneo

Toda tradução acontece no seu navegador. Nenhum texto que você digita é enviado a nenhum servidor.
`
},

// ── HEALTH ───────────────────────────────────────────────────────────────
{
  slug:'waterintake', category:'health', icon:'💧',
  script:'waterintake.js',
  widget:`<form id="water-form"><div class="row"><div class="field"><label for="water-weight">{{ui.weight}}</label><input type="number" id="water-weight" step="any" min="1" inputmode="decimal"></div><div class="field"><label for="water-unit">{{ui.unit}}</label><select id="water-unit"><option value="kg">kg</option><option value="lb">lb</option></select></div><div class="field"><label for="water-activity">{{ui.activity}}</label><select id="water-activity"><option value="low">{{ui.sedentary}}</option><option value="mod">{{ui.moderate}}</option><option value="high">{{ui.active}}</option></select></div></div><div class="result"><span class="hint">{{ui.daily_water}}: </span><span class="big" id="water-out">—</span></div></form>`,
  en:{
    title:'Water Intake Calculator — how much water should you drink daily?',
    metaDescription:'Free water intake calculator. Find out exactly how much water you should drink each day based on your body weight and activity level. Instant results in your browser.',
    h1:'Daily Water Intake Calculator',
    intro:'Enter your weight and activity level to see your recommended daily water intake.',
    faq_title:'Water intake FAQ',
    ui:{weight:'Body weight',unit:'Unit',activity:'Activity level',sedentary:'Sedentary (office work)',moderate:'Moderately active',active:'Very active / athlete',daily_water:'Daily water intake'},
    faq:[
      {q:'How is the water intake calculated?',a:'The calculator uses approximately 35 ml per kilogram of body weight as a baseline, then adjusts upward for activity level. Athletes and highly active people typically need significantly more because of sweat losses.'},
      {q:'Does coffee or tea count?',a:'Despite being mild diuretics, research shows that habitual consumption of caffeinated drinks still contributes to daily fluid intake. However, plain water is the most efficient way to stay hydrated.'},
      {q:'Should I drink more in hot weather?',a:'Yes. The calculator gives a baseline recommendation for normal conditions. In hot weather, during illness with fever, or at high altitude, your hydration needs increase. Drink to thirst and pay attention to urine colour — pale yellow is ideal.'}
    ]
  },
  pt:{
    title:'Calculadora de Ingestão de Água — quanta água você deve beber por dia?',
    metaDescription:'Calculadora de ingestão de água gratuita. Descubra exatamente quanta água você deve beber por dia com base no seu peso corporal e nível de atividade.',
    h1:'Calculadora de Ingestão Diária de Água',
    intro:'Informe seu peso e nível de atividade para ver a ingestão diária de água recomendada.',
    faq_title:'Perguntas frequentes de ingestão de água',
    ui:{weight:'Peso corporal',unit:'Unidade',activity:'Nível de atividade',sedentary:'Sedentário (trabalho de escritório)',moderate:'Moderadamente ativo',active:'Muito ativo / atleta',daily_water:'Ingestão diária de água'},
    faq:[
      {q:'Como a ingestão de água é calculada?',a:'A calculadora usa aproximadamente 35 ml por quilograma de peso corporal como linha de base, depois ajusta para cima para o nível de atividade. Atletas e pessoas muito ativas tipicamente precisam significativamente mais por causa das perdas pelo suor.'},
      {q:'Café ou chá contam?',a:'Apesar de serem diuréticos leves, pesquisas mostram que o consumo habitual de bebidas com cafeína ainda contribui para a ingestão de fluidos diária. Porém, água pura é a forma mais eficiente de se manter hidratado.'},
      {q:'Devo beber mais em clima quente?',a:'Sim. A calculadora dá uma recomendação de linha de base para condições normais. Em clima quente, durante doença com febre ou em alta altitude, suas necessidades de hidratação aumentam.'}
    ]
  },
  contentEn:`## How much water should you drink every day?

Water is the most essential nutrient. Every cell, tissue, and organ in your body depends on water to function correctly. It regulates body temperature through sweating, transports nutrients and oxygen in the bloodstream, removes waste products through urine, cushions joints, and keeps organs functioning. Despite this, many people chronically consume less water than their bodies need, often without realising it.

This calculator gives you a personalised daily water intake recommendation based on your body weight and activity level. The result is a baseline guide — individual needs vary based on climate, diet, health status, and many other factors — but it provides a concrete target to work towards.

## How the recommendation is calculated

The most widely used formula for estimating daily water needs bases the recommendation on body weight. A common guideline used by dietitians and sports medicine professionals is approximately 35 millilitres per kilogram of body weight per day for sedentary adults. This equates to about 2.4 litres for a 70 kg person.

Activity level is the largest variable after body weight. Even moderate exercise increases water loss through sweating, with losses of 0.5 to 2 litres per hour of vigorous exercise depending on intensity and environmental temperature. The calculator adjusts the recommendation upward for moderately active and very active people to compensate for these losses.

## The 8 glasses a day myth

The commonly repeated advice to "drink 8 glasses of water a day" is a simplified heuristic that works reasonably well for an average adult in a temperate climate, but it is not based on any specific scientific evidence and ignores individual variation. A small woman doing a desk job in a cool climate has very different needs from a large man doing outdoor labour in a hot climate. Body weight-based recommendations are more accurate.

## Thirst is not always reliable

Many people are mildly dehydrated most of the time and do not feel thirsty because the thirst mechanism adapts to chronic mild dehydration. Older adults in particular have a reduced thirst response and need to be more deliberate about drinking. A practical check is urine colour: pale yellow indicates good hydration, dark yellow or amber indicates dehydration, and nearly colourless may indicate overhydration.

## Water in food

A significant portion of daily water intake comes from food rather than drinks. Fruits and vegetables have high water content — cucumber and watermelon are over 95% water, while most fruits are 80–90% water. A diet high in fresh produce contributes meaningfully to hydration. The recommendation from this calculator refers to total fluid intake from all sources, so you can subtract what comes from food if you estimate it.

## When to drink more

- **Hot weather**: Every degree above a comfortable ambient temperature increases sweat losses.
- **Exercise**: Drink before, during, and after physical activity.
- **Illness**: Fever, vomiting, and diarrhoea all increase fluid losses dramatically.
- **Pregnancy and breastfeeding**: Both increase water requirements substantially.
- **High altitude**: The body increases breathing rate at altitude, losing more moisture.

## Private and instant

The calculation runs in your browser. No data is sent anywhere.
`,
  contentPt:`## Quanta água você deve beber todos os dias?

Água é o nutriente mais essencial. Cada célula, tecido e órgão no seu corpo depende de água para funcionar corretamente. Ela regula a temperatura corporal pelo suor, transporta nutrientes e oxigênio na corrente sanguínea, remove produtos de resíduos pela urina, amortece articulações e mantém os órgãos funcionando. Apesar disso, muitas pessoas consomem cronicamente menos água do que seus corpos precisam, frequentemente sem perceber.

## Como a recomendação é calculada

A fórmula mais amplamente usada para estimar as necessidades diárias de água baseia a recomendação no peso corporal. Uma diretriz comum usada por nutricionistas e profissionais de medicina esportiva é de aproximadamente 35 mililitros por quilograma de peso corporal por dia para adultos sedentários.

O nível de atividade é a maior variável depois do peso corporal. Mesmo exercício moderado aumenta a perda de água pelo suor, com perdas de 0,5 a 2 litros por hora de exercício vigoroso dependendo da intensidade e temperatura ambiental.

## O mito dos 8 copos por dia

O conselho comumente repetido de "beber 8 copos de água por dia" é uma heurística simplificada que funciona razoavelmente bem para um adulto médio em clima temperado, mas não é baseada em nenhuma evidência científica específica e ignora a variação individual.

## A sede nem sempre é confiável

Muitas pessoas ficam levemente desidratadas na maior parte do tempo e não sentem sede porque o mecanismo de sede se adapta à desidratação leve crônica. Uma verificação prática é a cor da urina: amarelo claro indica boa hidratação, amarelo escuro ou âmbar indica desidratação.

## Privado e instantâneo

O cálculo roda no seu navegador. Nenhum dado é enviado a lugar nenhum.
`
},

// ── HOME / CASA ────────────────────────────────────────────────────────
{
  slug:'electricitycost', category:'home', icon:'⚡',
  script:'electricitycost.js',
  widget:`<form id="elec-form"><div class="row"><div class="field"><label for="elec-watts">{{ui.watts}}</label><input type="number" id="elec-watts" step="any" min="0" inputmode="decimal"></div><div class="field"><label for="elec-hours">{{ui.hours_day}}</label><input type="number" id="elec-hours" step="any" min="0" max="24" value="8" inputmode="decimal"></div><div class="field"><label for="elec-rate">{{ui.rate}}</label><input type="number" id="elec-rate" step="any" min="0" value="0.15" inputmode="decimal"></div></div><div class="result"><span class="hint">{{ui.daily}}: </span><b id="elec-day">—</b> · <span class="hint">{{ui.monthly}}: </span><b id="elec-month">—</b> · <span class="hint">{{ui.annual}}: </span><span class="big" id="elec-year">—</span></div></form>`,
  en:{
    title:'Electricity Cost Calculator — how much does your appliance cost to run?',
    metaDescription:'Free electricity cost calculator. Enter an appliance wattage, hours of use per day, and your electricity rate to see daily, monthly, and annual running costs.',
    h1:'Electricity Cost Calculator',
    intro:'Enter the appliance wattage, how many hours a day you use it, and your electricity rate per kWh to see the running cost.',
    faq_title:'Electricity cost FAQ',
    ui:{watts:'Power (watts)',hours_day:'Hours used per day',rate:'Electricity rate (per kWh)',daily:'Daily cost',monthly:'Monthly cost',annual:'Annual cost'},
    faq:[
      {q:'How do I find the wattage of my appliance?',a:'Check the label on the back or bottom of the appliance, or look it up in the manual. Appliances list their power consumption in watts (W) or kilowatts (kW). Common examples: LED bulb 8–15 W, laptop 30–100 W, refrigerator 100–400 W, air conditioner 1000–3500 W.'},
      {q:'What electricity rate should I use?',a:'Your electricity rate is on your utility bill, usually expressed as cents or pence per kilowatt-hour (kWh). Rates vary widely by country and provider. The global average is roughly 0.15 USD per kWh, but US rates range from 0.10 to 0.35 and European rates vary even more widely.'},
      {q:'How is the cost calculated?',a:'Energy consumed in kWh = (watts / 1000) × hours per day. Cost per day = kWh × rate. Monthly cost assumes 30.44 days; annual cost assumes 365 days.'}
    ]
  },
  pt:{
    title:'Calculadora de Custo de Energia — quanto custa seu aparelho para funcionar?',
    metaDescription:'Calculadora de custo de energia gratuita. Informe a potência do aparelho, horas de uso por dia e sua tarifa de energia para ver os custos diário, mensal e anual.',
    h1:'Calculadora de Custo de Energia Elétrica',
    intro:'Informe a potência do aparelho, quantas horas por dia você o usa e sua tarifa de energia por kWh para ver o custo de funcionamento.',
    faq_title:'Perguntas frequentes do custo de energia',
    ui:{watts:'Potência (watts)',hours_day:'Horas usadas por dia',rate:'Tarifa de energia (por kWh)',daily:'Custo diário',monthly:'Custo mensal',annual:'Custo anual'},
    faq:[
      {q:'Como encontro a potência do meu aparelho?',a:'Verifique a etiqueta na parte de trás ou inferior do aparelho, ou procure no manual. Os aparelhos listam seu consumo de energia em watts (W) ou quilowatts (kW). Exemplos comuns: lâmpada LED 8–15 W, notebook 30–100 W, geladeira 100–400 W, ar-condicionado 1000–3500 W.'},
      {q:'Que tarifa de energia devo usar?',a:'Sua tarifa de energia está na conta de luz, geralmente expressa em centavos por quilowatt-hora (kWh). As tarifas variam amplamente por país e fornecedor.'},
      {q:'Como o custo é calculado?',a:'Energia consumida em kWh = (watts / 1000) × horas por dia. Custo por dia = kWh × tarifa. Custo mensal assume 30,44 dias; custo anual assume 365 dias.'}
    ]
  },
  contentEn:`## Find out how much any appliance costs to run

Electricity bills often feel like mystery charges until you break them down to the individual appliance level. Once you know how many watts an appliance draws and how many hours a day it runs, you can calculate exactly what it costs. This calculator takes those three inputs — wattage, hours per day, and your electricity rate — and instantly shows you the daily, monthly, and annual running cost.

## Understanding kilowatt-hours

Electricity is sold in kilowatt-hours (kWh). One kilowatt-hour is the energy used by a 1,000-watt appliance running for one hour, or a 100-watt appliance running for ten hours. Your electricity bill states a price per kWh — this is the rate you pay for each unit of energy consumed.

The formula: energy consumed (kWh) = power (watts) ÷ 1000 × hours of use. Cost = energy (kWh) × rate per kWh. For example, a 2,000-watt electric heater running 4 hours a day uses 8 kWh per day. At a rate of 0.20 per kWh, that costs 1.60 per day, 48 per month, and about 584 per year.

## Typical appliance wattages

Knowing typical wattages helps you prioritise where to look for savings:

- **LED light bulb**: 8–15 W
- **CFL light bulb**: 15–25 W
- **Laptop computer**: 30–100 W
- **Desktop computer + monitor**: 150–350 W
- **Refrigerator**: 100–400 W (running average, not peak)
- **Washing machine**: 500–2,000 W
- **Dishwasher**: 1,200–2,400 W
- **Microwave**: 600–1,200 W
- **Electric oven**: 2,000–5,000 W
- **Air conditioner (window unit)**: 500–1,500 W
- **Air conditioner (central, per ton)**: 1,200–2,400 W
- **Electric kettle**: 1,500–3,000 W
- **Hair dryer**: 1,000–2,500 W
- **Electric vehicle charger (Level 2)**: 3,300–19,200 W

## Where electricity costs most

In most households, the highest electricity consumers are heating and cooling (HVAC), water heating, large kitchen appliances (electric range/oven), and electric dryers. These dwarf the contribution of electronics like televisions, computers, and phone chargers, which are often blamed but are rarely significant in the overall bill.

An air conditioner running 8 hours a day at 1,500 W costs roughly 2.16 per day at 0.18/kWh — about 65 per month. A TV at 100 W for 5 hours costs 0.09 per day — about 2.70 per month. The difference in scale illustrates why replacing a thermostat setting saves more than turning off lights.

## Electricity rates worldwide

Electricity rates vary enormously. In the United States, the residential average is around 0.13–0.18 per kWh, but it ranges from under 0.10 in Louisiana to over 0.30 in Hawaii and California. In Germany the rate is among the highest in Europe at around 0.35 per kWh. In many developing countries rates are much lower, partly because electricity is subsidised. Enter the rate from your actual bill for the most accurate result.

## Private and instant

The calculation runs in your browser. No data is sent anywhere.
`,
  contentPt:`## Descubra quanto custa qualquer aparelho para funcionar

Contas de luz frequentemente parecem cobranças misteriosas até você desmembrá-las ao nível do aparelho individual. Uma vez que você sabe quantos watts um aparelho consome e quantas horas por dia ele funciona, você pode calcular exatamente quanto custa. Esta calculadora pega essas três entradas — potência, horas por dia e sua tarifa de energia — e instantaneamente mostra o custo diário, mensal e anual.

## Entendendo quilowatts-hora

A eletricidade é vendida em quilowatts-hora (kWh). Um quilowatt-hora é a energia usada por um aparelho de 1.000 watts funcionando por uma hora. A fórmula: energia consumida (kWh) = potência (watts) ÷ 1000 × horas de uso. Custo = energia (kWh) × tarifa por kWh.

## Potências típicas de aparelhos

- **Lâmpada LED**: 8–15 W
- **Notebook**: 30–100 W
- **Geladeira**: 100–400 W (média de funcionamento)
- **Máquina de lavar**: 500–2.000 W
- **Micro-ondas**: 600–1.200 W
- **Forno elétrico**: 2.000–5.000 W
- **Ar-condicionado**: 500–3.500 W
- **Chuveiro elétrico**: 4.400–7.500 W

## Privado e instantâneo

O cálculo roda no seu navegador. Nenhum dado é enviado a lugar nenhum.
`
},

// ── SOCIAL ────────────────────────────────────────────────────────────────
{
  slug:'qrmaker', category:'social', icon:'📱',
  script:'qrmaker.js',
  widget:`<div id="qr-app"><div class="field"><label for="qr-text">{{ui.content}}</label><textarea id="qr-text" rows="3" style="width:100%;box-sizing:border-box;padding:0.75rem;border-radius:0.5rem;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.05);color:inherit;font-size:1rem" placeholder="{{ui.placeholder}}"></textarea></div><div class="row"><div class="field"><label for="qr-size">{{ui.size}}</label><select id="qr-size"><option value="200">200 px</option><option value="300" selected>300 px</option><option value="400">400 px</option></select></div></div><div id="qr-out" style="margin-top:1rem;min-height:100px;display:flex;flex-direction:column;align-items:flex-start;gap:0.75rem"></div></div>`,
  en:{
    title:'QR Code Generator — create QR codes for any URL or text',
    metaDescription:'Free QR code generator. Create a QR code for any URL, text, WiFi password, or contact information. Download as PNG. Works entirely in your browser.',
    h1:'QR Code Generator',
    intro:'Type or paste any text or URL and the QR code is generated instantly. Click the image to download it.',
    faq_title:'QR code FAQ',
    ui:{content:'Text or URL',placeholder:'https://example.com',size:'Size'},
    faq:[
      {q:'What can a QR code contain?',a:'A QR code can encode any text: URLs, email addresses, phone numbers, WiFi credentials, vCard contacts, plain text, or any other string. Smartphones read all of these directly with their cameras.'},
      {q:'How do I download the QR code?',a:'Click or tap the generated QR code image to download it as a PNG file. You can then use it in print materials, presentations, or share it digitally.'},
      {q:'Is the QR code generated on my device?',a:'Yes. The QR code is generated entirely in your browser using a JavaScript QR code library. No text you enter is sent to any server.'}
    ]
  },
  pt:{
    title:'Gerador de QR Code — crie QR codes para qualquer URL ou texto',
    metaDescription:'Gerador de QR code gratuito. Crie um QR code para qualquer URL, texto, senha de WiFi ou informações de contato. Baixe como PNG. Funciona inteiramente no seu navegador.',
    h1:'Gerador de QR Code',
    intro:'Digite ou cole qualquer texto ou URL e o QR code é gerado na hora. Clique na imagem para baixá-la.',
    faq_title:'Perguntas frequentes do QR code',
    ui:{content:'Texto ou URL',placeholder:'https://exemplo.com',size:'Tamanho'},
    faq:[
      {q:'O que um QR code pode conter?',a:'Um QR code pode codificar qualquer texto: URLs, endereços de e-mail, números de telefone, credenciais de WiFi, contatos vCard, texto simples ou qualquer outra string.'},
      {q:'Como baixo o QR code?',a:'Clique ou toque na imagem do QR code gerado para baixá-la como arquivo PNG. Você pode então usá-la em materiais impressos, apresentações ou compartilhá-la digitalmente.'},
      {q:'O QR code é gerado no meu dispositivo?',a:'Sim. O QR code é gerado inteiramente no seu navegador usando uma biblioteca JavaScript de QR code. Nenhum texto que você informa é enviado a nenhum servidor.'}
    ]
  },
  contentEn:`## Generate QR codes for anything, instantly

QR codes are everywhere: on restaurant menus, product packaging, business cards, event tickets, posters, and storefronts. They bridge the physical and digital worlds, letting anyone with a smartphone scan a printed code and instantly open a website, save a contact, connect to WiFi, or access any other digital resource. This generator creates QR codes for any text or URL directly in your browser, with no signup and no watermark.

## What QR codes can encode

A QR code (Quick Response code) is a two-dimensional barcode that can encode any string of text. Common uses include:

**URLs**: The most common use. Any web address can be encoded and scanned directly to open in the device's browser. Perfect for printed marketing materials, business cards, or posters where typing a URL would be tedious.

**WiFi credentials**: A specially formatted string can encode a WiFi network name (SSID) and password. Guests scan the code and their device connects automatically — no typing required. The format is: WIFI:S:NetworkName;T:WPA;P:password;;

**Contact information (vCard)**: The vCard format encodes a complete contact entry including name, phone, email, and address. Scanning adds the contact directly to the phone's address book.

**Email and SMS**: You can encode a mailto: or sms: link that opens the relevant app with an address pre-filled.

**Plain text**: QR codes can contain any plain text message, displayed directly after scanning without opening any app.

**App store links**: Linking to an app on the Apple App Store or Google Play lets users scan to download your app without searching.

## How QR codes work

A QR code stores data as a pattern of black and white squares arranged in a grid. The squares encode binary data using a specific encoding scheme. Error correction data is also included, which allows the code to be successfully scanned even if up to 30% of its surface is damaged or obscured. This is why you sometimes see QR codes with logos placed in the centre — the logo covers some of the data area, but the error correction data allows the rest to be reconstructed.

Smartphone cameras have built-in QR code reading capability in their default camera apps on both iOS and Android. Point the camera at the code and a notification or link appears without any separate app.

## Print resolution and size

For printed materials, a larger QR code is easier to scan reliably. As a rule of thumb, the minimum dimension should be about 1 cm (0.4 inches) for a QR code scanned from 10 cm (4 inches) away. For posters or signage scanned from a metre or more away, the code should be significantly larger — at least 5–10 cm. The 300px and 400px options in this generator are suitable for digital use and basic print use; for high-quality print at large sizes, vector-format QR codes are preferred.

## Privacy

This generator creates QR codes entirely in your browser using a client-side JavaScript library. The text you enter is never sent to any server. You can use it offline once the page has loaded.
`,
  contentPt:`## Gere QR codes para qualquer coisa, na hora

QR codes estão em todo lugar: em cardápios de restaurantes, embalagens de produtos, cartões de visita, ingressos de eventos, cartazes e vitrines. Eles conectam o mundo físico e digital, permitindo que qualquer pessoa com um smartphone escaneie um código impresso e abra instantaneamente um site, salve um contato, conecte-se ao WiFi ou acesse qualquer outro recurso digital.

## O que os QR codes podem codificar

**URLs**: O uso mais comum. Qualquer endereço da web pode ser codificado e escaneado diretamente para abrir no navegador do dispositivo.

**Credenciais de WiFi**: Uma string especialmente formatada pode codificar um nome de rede WiFi (SSID) e senha. Os convidados escaneiam o código e seu dispositivo conecta automaticamente.

**Informações de contato (vCard)**: O formato vCard codifica uma entrada de contato completa incluindo nome, telefone, e-mail e endereço.

**Texto simples**: QR codes podem conter qualquer mensagem de texto simples, exibida diretamente após o escaneamento sem abrir nenhum aplicativo.

## Privacidade

Este gerador cria QR codes inteiramente no seu navegador usando uma biblioteca JavaScript do lado do cliente. O texto que você informa nunca é enviado a nenhum servidor.
`
},

];

// ─── JAVASCRIPT TEMPLATES ──────────────────────────────────────────────────
const JS = {
  worldclock: `/* World clock — compare local times in multiple cities */
(function () {
  'use strict';
  var zones = [
    ['New York','America/New_York'],['Los Angeles','America/Los_Angeles'],['London','Europe/London'],
    ['Paris','Europe/Paris'],['Berlin','Europe/Berlin'],['Moscow','Europe/Moscow'],
    ['Dubai','Asia/Dubai'],['Mumbai','Asia/Kolkata'],['Singapore','Asia/Singapore'],
    ['Tokyo','Asia/Tokyo'],['Sydney','Australia/Sydney'],['São Paulo','America/Sao_Paulo'],
    ['Mexico City','America/Mexico_City'],['Buenos Aires','America/Argentina/Buenos_Aires'],
    ['Cairo','Africa/Cairo'],['Lagos','Africa/Lagos'],['Beijing','Asia/Shanghai'],
    ['Seoul','Asia/Seoul'],['Bangkok','Asia/Bangkok'],['Jakarta','Asia/Jakarta']
  ];
  var selects = ['wc-city1','wc-city2','wc-city3'];
  var defaults = [0,2,9]; // NY, London, Tokyo
  selects.forEach(function(id, i) {
    var sel = document.getElementById(id);
    if (!sel) return;
    zones.forEach(function(z, j) {
      var o = document.createElement('option');
      o.value = z[1]; o.textContent = z[0];
      if (j === defaults[i]) o.selected = true;
      sel.appendChild(o);
    });
  });
  function update() {
    var out = document.getElementById('wc-out');
    if (!out) return;
    var html = selects.map(function(id) {
      var sel = document.getElementById(id);
      if (!sel) return '';
      var tz = sel.value;
      var name = sel.options[sel.selectedIndex].text;
      try {
        var fmt = new Intl.DateTimeFormat([], {
          timeZone: tz, hour:'2-digit', minute:'2-digit', second:'2-digit',
          hour12: false, weekday:'short', month:'short', day:'numeric'
        });
        return '<div><strong>' + name + '</strong> — ' + fmt.format(new Date()) + '</div>';
      } catch(e) { return '<div>' + name + ': error</div>'; }
    }).join('');
    out.innerHTML = html;
  }
  document.querySelectorAll('#wc-city1,#wc-city2,#wc-city3').forEach(function(s) {
    s.addEventListener('change', update);
  });
  update();
  setInterval(update, 1000);
})();`,

  stopwatch: `/* Stopwatch with lap times */
(function () {
  'use strict';
  var start = null, elapsed = 0, raf = null, laps = [];
  var disp = document.getElementById('sw-display');
  var lapList = document.getElementById('sw-laps');
  var btnStart = document.getElementById('sw-start');
  var btnLap = document.getElementById('sw-lap');
  var btnReset = document.getElementById('sw-reset');
  if (!disp) return;
  function fmt(ms) {
    var h = Math.floor(ms/3600000), m = Math.floor((ms%3600000)/60000);
    var s = Math.floor((ms%60000)/1000), cs = Math.floor((ms%1000)/1);
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s + '.' + (cs < 10 ? '00' : cs < 100 ? '0' : '') + cs;
  }
  function tick() { disp.textContent = fmt(elapsed + (Date.now() - start)); raf = requestAnimationFrame(tick); }
  btnStart.addEventListener('click', function() {
    if (raf) { cancelAnimationFrame(raf); raf = null; elapsed += Date.now() - start; start = null;
      btnStart.textContent = btnStart.dataset.start || 'Start';
      btnLap.disabled = true;
    } else {
      start = Date.now(); tick();
      btnStart.textContent = btnStart.dataset.stop || 'Stop';
      btnLap.disabled = false; btnReset.disabled = false;
    }
  });
  btnLap.addEventListener('click', function() {
    if (!start) return;
    var t = elapsed + (Date.now() - start);
    laps.push(t);
    var li = document.createElement('li');
    li.textContent = 'Lap ' + laps.length + ': ' + fmt(t);
    li.style.padding = '0.25rem 0'; li.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
    lapList.appendChild(li);
  });
  btnReset.addEventListener('click', function() {
    cancelAnimationFrame(raf); raf = null; start = null; elapsed = 0; laps = [];
    disp.textContent = '00:00.000'; lapList.innerHTML = '';
    btnLap.disabled = true; btnReset.disabled = true;
    btnStart.textContent = btnStart.dataset.start || 'Start';
  });
})();`,

  countdown: `/* Countdown timer to a specific date */
(function () {
  'use strict';
  var dateIn = document.getElementById('cd-date');
  var labelIn = document.getElementById('cd-label');
  var out = document.getElementById('cd-out');
  if (!out) return;
  var now = new Date();
  // default to one month from now
  var def = new Date(now.getFullYear(), now.getMonth()+1, now.getDate(), now.getHours(), now.getMinutes());
  if (dateIn) dateIn.value = def.toISOString().slice(0,16);
  function update() {
    if (!dateIn || !dateIn.value) { out.textContent = '—'; return; }
    var target = new Date(dateIn.value);
    var diff = target - new Date();
    var label = (labelIn && labelIn.value) ? labelIn.value + ': ' : '';
    if (diff <= 0) { out.textContent = label + '🎉 Time is up!'; return; }
    var d = Math.floor(diff / 86400000);
    var h = Math.floor((diff % 86400000) / 3600000);
    var m = Math.floor((diff % 3600000) / 60000);
    var s = Math.floor((diff % 60000) / 1000);
    out.textContent = label + d + 'd ' + h + 'h ' + m + 'm ' + s + 's';
  }
  if (dateIn) dateIn.addEventListener('input', update);
  if (labelIn) labelIn.addEventListener('input', update);
  update();
  setInterval(update, 1000);
})();`,

  pomodoro: `/* Pomodoro timer */
(function () {
  'use strict';
  var FOCUS = 25*60, SHORT = 5*60, LONG = 15*60;
  var phase = 'focus', sessions = 0, remaining = FOCUS, interval = null;
  var disp = document.getElementById('pom-display');
  var phaseEl = document.getElementById('pom-phase');
  var countEl = document.getElementById('pom-count');
  var btnStart = document.getElementById('pom-start');
  var btnReset = document.getElementById('pom-reset');
  if (!disp) return;
  function fmt(s) { return (Math.floor(s/60) < 10 ? '0' : '') + Math.floor(s/60) + ':' + (s%60 < 10 ? '0' : '') + (s%60); }
  function beep() {
    try {
      var ctx = new (window.AudioContext || window.webkitAudioContext)();
      var o = ctx.createOscillator(); var g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.frequency.value = 880; g.gain.value = 0.3;
      o.start(); g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      setTimeout(function(){o.stop();ctx.close();}, 900);
    } catch(e){}
  }
  function setPhase(p) {
    phase = p;
    remaining = p==='focus' ? FOCUS : p==='short' ? SHORT : LONG;
    if (phaseEl) phaseEl.textContent = p==='focus' ? 'Focus' : p==='short' ? 'Short break' : 'Long break';
    disp.textContent = fmt(remaining);
  }
  function tick() {
    remaining--;
    disp.textContent = fmt(remaining);
    if (remaining <= 0) {
      clearInterval(interval); interval = null;
      beep();
      if (phase==='focus') {
        sessions++;
        if (countEl) countEl.textContent = 'Sessions: ' + sessions;
        setPhase(sessions % 4 === 0 ? 'long' : 'short');
      } else { setPhase('focus'); }
      btnStart.textContent = 'Start';
    }
  }
  btnStart.addEventListener('click', function() {
    if (interval) { clearInterval(interval); interval = null; btnStart.textContent = 'Start'; }
    else { interval = setInterval(tick, 1000); btnStart.textContent = 'Pause'; }
  });
  btnReset.addEventListener('click', function() {
    clearInterval(interval); interval = null; sessions = 0;
    setPhase('focus');
    if (countEl) countEl.textContent = '';
    btnStart.textContent = 'Start';
  });
})();`,

  daysbetween: `/* Days between two dates */
(function () {
  'use strict';
  var from = document.getElementById('db-from');
  var to = document.getElementById('db-to');
  var out = document.getElementById('db-out');
  if (!out) return;
  var today = new Date().toISOString().slice(0,10);
  if (from) from.value = today;
  if (to) {
    var d = new Date(); d.setDate(d.getDate()+30);
    to.value = d.toISOString().slice(0,10);
  }
  function calc() {
    if (!from.value || !to.value) { out.textContent = '—'; return; }
    var a = new Date(from.value), b = new Date(to.value);
    var diff = Math.abs(b - a);
    var days = Math.round(diff / 86400000);
    var weeks = (days / 7).toFixed(1);
    var months = (days / 30.44).toFixed(1);
    out.textContent = days + ' days (' + weeks + ' wks, ~' + months + ' mo)';
  }
  if (from) from.addEventListener('change', calc);
  if (to) to.addEventListener('change', calc);
  calc();
})();`,

  weeknumber: `/* ISO week number */
(function () {
  'use strict';
  var inp = document.getElementById('wn-date');
  var weekEl = document.getElementById('wn-week');
  var detail = document.getElementById('wn-detail');
  if (!weekEl) return;
  var today = new Date().toISOString().slice(0,10);
  if (inp) inp.value = today;
  function isoWeek(d) {
    var dt = new Date(d);
    dt.setHours(0,0,0,0);
    dt.setDate(dt.getDate() + 3 - (dt.getDay() + 6) % 7);
    var week1 = new Date(dt.getFullYear(), 0, 4);
    return 1 + Math.round(((dt - week1) / 86400000 - 3 + (week1.getDay()+6)%7) / 7);
  }
  function weekStart(d) {
    var dt = new Date(d); var day = dt.getDay() || 7;
    dt.setDate(dt.getDate() - day + 1); return dt;
  }
  function calc() {
    if (!inp.value) { weekEl.textContent = '—'; return; }
    var d = new Date(inp.value);
    var w = isoWeek(d);
    weekEl.textContent = 'Week ' + w;
    if (detail) {
      var ws = weekStart(inp.value);
      var we = new Date(ws); we.setDate(ws.getDate()+6);
      detail.textContent = ws.toLocaleDateString([], {month:'short',day:'numeric'}) + ' – ' + we.toLocaleDateString([], {month:'short',day:'numeric',year:'numeric'});
    }
  }
  if (inp) inp.addEventListener('change', calc);
  calc();
})();`,

  unixepoch: `/* Unix timestamp converter */
(function () {
  'use strict';
  var tsIn = document.getElementById('ue-ts');
  var utcEl = document.getElementById('ue-utc');
  var localEl = document.getElementById('ue-local');
  var dtIn = document.getElementById('ue-dt');
  var tsOut = document.getElementById('ue-tsout');
  function tsToDate() {
    if (!tsIn || !tsIn.value) { if(utcEl)utcEl.textContent='—'; if(localEl)localEl.textContent='—'; return; }
    var ts = parseInt(tsIn.value, 10);
    var d = new Date(ts * 1000);
    if (isNaN(d.getTime())) { if(utcEl)utcEl.textContent='Invalid'; return; }
    if (utcEl) utcEl.textContent = d.toUTCString();
    if (localEl) localEl.textContent = d.toLocaleString();
  }
  function dateToTs() {
    if (!dtIn || !dtIn.value) { if(tsOut)tsOut.textContent='—'; return; }
    var ts = Math.floor(new Date(dtIn.value).getTime() / 1000);
    if (tsOut) tsOut.textContent = isNaN(ts) ? '—' : ts;
  }
  if (tsIn) tsIn.addEventListener('input', tsToDate);
  if (dtIn) dtIn.addEventListener('input', dateToTs);
  // default: current timestamp
  if (tsIn) { tsIn.value = Math.floor(Date.now()/1000); tsToDate(); }
  if (dtIn) { dtIn.value = new Date().toISOString().slice(0,16); dateToTs(); }
})();`,

  unitconverter: `/* Unit converter */
(function () {
  'use strict';
  var $ = function(id) { return document.getElementById(id); };
  var cats = {
    length: { base:'m', units:{m:1,km:0.001,cm:100,mm:1000,in:39.3701,ft:3.28084,yd:1.09361,mi:0.000621371,nmi:0.000539957} },
    weight: { base:'kg', units:{kg:1,g:1000,mg:1e6,t:0.001,lb:2.20462,oz:35.274,'us-ton':0.00110231} },
    temp: { special:true },
    volume: { base:'l', units:{l:1,ml:1000,'m3':0.001,'cm3':1000,'us-gal':0.264172,'us-fl-oz':33.814,'us-cup':4.22675,'uk-gal':0.219969,'uk-fl-oz':35.1951} },
    area: { base:'m2', units:{'m2':1,'km2':1e-6,'cm2':10000,'in2':1550.0031,'ft2':10.7639,'yd2':1.19599,'mi2':3.861e-7,acre:0.000247105} },
    speed: { base:'ms', units:{'ms':1,'kmh':3.6,'mph':2.23694,knot:1.94384,'fps':3.28084} }
  };
  var unitNames = { m:'metres',km:'kilometres',cm:'centimetres',mm:'millimetres','in':'inches',ft:'feet',yd:'yards',mi:'miles',nmi:'nautical miles',
    kg:'kilograms',g:'grams',mg:'milligrams',t:'metric tons',lb:'pounds',oz:'ounces','us-ton':'US tons',
    l:'litres',ml:'millilitres','m3':'cubic metres','cm3':'cubic cm','us-gal':'US gallons','us-fl-oz':'US fl oz','us-cup':'US cups','uk-gal':'UK gallons','uk-fl-oz':'UK fl oz',
    'm2':'m²','km2':'km²','cm2':'cm²','in2':'in²','ft2':'ft²','yd2':'yd²','mi2':'mi²',acre:'acres',
    ms:'m/s',kmh:'km/h',mph:'mph',knot:'knots','fps':'ft/s',
    C:'°C (Celsius)',F:'°F (Fahrenheit)',K:'Kelvin'
  };
  var catSel = $('uc-cat'); var valIn = $('uc-val'); var fromSel = $('uc-from'); var toSel = $('uc-to'); var outEl = $('uc-out');
  if (!catSel) return;
  function populateUnits() {
    var cat = catSel.value;
    fromSel.innerHTML = ''; toSel.innerHTML = '';
    var units = cat==='temp' ? ['C','F','K'] : Object.keys(cats[cat].units);
    units.forEach(function(u, i) {
      var o1 = document.createElement('option'); o1.value = u; o1.textContent = unitNames[u]||u; fromSel.appendChild(o1);
      var o2 = document.createElement('option'); o2.value = u; o2.textContent = unitNames[u]||u; toSel.appendChild(o2);
    });
    if (toSel.options.length > 1) toSel.selectedIndex = 1;
    calc();
  }
  function calc() {
    var v = parseFloat(valIn.value); if (isNaN(v)) { outEl.textContent='—'; return; }
    var cat = catSel.value; var from = fromSel.value; var to = toSel.value;
    var result;
    if (cat==='temp') {
      var c;
      if (from==='C') c=v; else if (from==='F') c=(v-32)*5/9; else c=v-273.15;
      if (to==='C') result=c; else if (to==='F') result=c*9/5+32; else result=c+273.15;
    } else {
      var d = cats[cat]; result = v / d.units[from] * d.units[to];
    }
    var dec = Math.abs(result) >= 1000 ? 2 : Math.abs(result) >= 1 ? 4 : 8;
    outEl.textContent = result.toLocaleString([], {maximumFractionDigits:dec});
  }
  catSel.addEventListener('change', populateUnits);
  if (valIn) valIn.addEventListener('input', calc);
  if (fromSel) fromSel.addEventListener('change', calc);
  if (toSel) toSel.addEventListener('change', calc);
  populateUnits();
})();`,

  fractioncalc: `/* Fraction calculator */
(function () {
  'use strict';
  function gcd(a, b) { a=Math.abs(a); b=Math.abs(b); while(b){var t=b;b=a%b;a=t;} return a||1; }
  function calc() {
    var an=parseInt(document.getElementById('frac-a-num').value,10);
    var ad=parseInt(document.getElementById('frac-a-den').value,10);
    var bn=parseInt(document.getElementById('frac-b-num').value,10);
    var bd=parseInt(document.getElementById('frac-b-den').value,10);
    var op=document.getElementById('frac-op').value;
    var out=document.getElementById('frac-out');
    var dec=document.getElementById('frac-decimal');
    if ([an,ad,bn,bd].some(isNaN)){out.textContent='—';if(dec)dec.textContent='';return;}
    if (ad===0||bd===0){out.textContent='undefined';if(dec)dec.textContent='';return;}
    var rn,rd;
    if(op==='+'){rn=an*bd+bn*ad;rd=ad*bd;}
    else if(op==='-'){rn=an*bd-bn*ad;rd=ad*bd;}
    else if(op==='*'){rn=an*bn;rd=ad*bd;}
    else {if(bn===0){out.textContent='undefined';return;}rn=an*bd;rd=ad*bn;}
    var g=gcd(Math.abs(rn),Math.abs(rd));
    rn=rn/g; rd=rd/g;
    if(rd<0){rn=-rn;rd=-rd;}
    out.textContent = rd===1 ? rn : rn+'/'+rd;
    if(dec) dec.textContent = '= ' + (rn/rd).toLocaleString([],{maximumFractionDigits:8});
  }
  document.querySelectorAll('#frac-a-num,#frac-a-den,#frac-b-num,#frac-b-den,#frac-op').forEach(function(el){el.addEventListener('input',calc);});
  calc();
})();`,

  primechecker: `/* Prime number checker */
(function () {
  'use strict';
  function factors(n) {
    var f=[]; for(var i=2;i*i<=n;i++){while(n%i===0){f.push(i);n=Math.floor(n/i);}} if(n>1)f.push(n); return f;
  }
  function divisors(n) {
    var d=[]; for(var i=1;i*i<=n;i++){if(n%i===0){d.push(i);if(i!==n/i)d.push(n/i);}} return d.sort(function(a,b){return a-b;});
  }
  var inp = document.getElementById('prime-n');
  var out = document.getElementById('prime-out');
  var facEl = document.getElementById('prime-factors');
  if (!out) return;
  function check() {
    var n = parseInt(inp.value, 10);
    if (isNaN(n)||n<1){out.textContent='—';if(facEl)facEl.textContent='';return;}
    if (n===1){out.textContent='1 is neither prime nor composite';if(facEl)facEl.textContent='';return;}
    var f = factors(n);
    var isPrime = f.length===1 && f[0]===n;
    out.textContent = isPrime ? n+' is PRIME ✓' : n+' is composite';
    if (facEl) {
      if (isPrime) { facEl.textContent = 'Divisors: 1, '+n; }
      else {
        var div = divisors(n);
        var pf = [];
        var tmp = [...f]; var map = {};
        tmp.forEach(function(p){map[p]=(map[p]||0)+1;});
        Object.keys(map).forEach(function(p){pf.push(map[p]>1?p+'<sup>'+map[p]+'</sup>':p);});
        facEl.innerHTML = 'Prime factorization: '+pf.join('×')+' &nbsp;·&nbsp; Divisors: '+div.join(', ');
      }
    }
  }
  if (inp) inp.addEventListener('input', check);
  check();
})();`,

  pythagorean: `/* Pythagorean theorem */
(function () {
  'use strict';
  var a=document.getElementById('pyth-a'), b=document.getElementById('pyth-b'), c=document.getElementById('pyth-c');
  var out=document.getElementById('pyth-out');
  if (!out) return;
  function calc() {
    var av=parseFloat(a.value),bv=parseFloat(b.value),cv=parseFloat(c.value);
    var filled=[!isNaN(av)&&av>0,!isNaN(bv)&&bv>0,!isNaN(cv)&&cv>0].filter(Boolean).length;
    if (filled<2){out.textContent='—';return;}
    var r;
    if(isNaN(cv)||cv<=0) r='c = '+Math.sqrt(av*av+bv*bv).toLocaleString([],{maximumFractionDigits:6});
    else if(isNaN(av)||av<=0) r='a = '+Math.sqrt(cv*cv-bv*bv).toLocaleString([],{maximumFractionDigits:6});
    else r='b = '+Math.sqrt(cv*cv-av*av).toLocaleString([],{maximumFractionDigits:6});
    out.textContent=r;
  }
  [a,b,c].forEach(function(el){if(el)el.addEventListener('input',calc);});
  calc();
})();`,

  rolldice: `/* Dice roller */
(function () {
  'use strict';
  var countIn=document.getElementById('dice-count');
  var btn=document.getElementById('dice-roll');
  var res=document.getElementById('dice-result');
  var det=document.getElementById('dice-detail');
  var sides=6;
  document.querySelectorAll('.dice-btn').forEach(function(b){
    b.addEventListener('click',function(){
      sides=parseInt(b.dataset.sides,10);
      document.querySelectorAll('.dice-btn').forEach(function(x){x.classList.remove('active');});
      b.classList.add('active');
    });
  });
  if(btn) btn.addEventListener('click',function(){
    var n=Math.max(1,Math.min(20,parseInt(countIn?countIn.value:1,10)||1));
    var rolls=[]; for(var i=0;i<n;i++) rolls.push(Math.floor(Math.random()*sides)+1);
    var total=rolls.reduce(function(s,x){return s+x;},0);
    if(res) res.textContent=total;
    if(det) det.textContent=n>1?'Rolls: '+rolls.join(', ')+' (total: '+total+')':'d'+sides+' = '+total;
  });
})();`,

  randomname: `/* Random name generator */
(function () {
  'use strict';
  var names = {
    en: {
      male: ['James','John','Robert','Michael','William','David','Richard','Joseph','Thomas','Charles','Oliver','George','Harry','Jack','Noah'],
      female: ['Mary','Patricia','Jennifer','Linda','Barbara','Elizabeth','Susan','Jessica','Sarah','Karen','Emma','Olivia','Sophie','Grace','Lucy'],
      last: ['Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis','Wilson','Taylor','Moore','Anderson','Thomas','Jackson','White']
    },
    es: {
      male: ['Carlos','Juan','José','Miguel','Antonio','Francisco','Manuel','David','Alejandro','Fernando'],
      female: ['María','Ana','Carmen','Laura','Isabel','Elena','Sofía','Paula','Marta','Lucía'],
      last: ['García','López','Martínez','Sánchez','González','Rodríguez','Hernández','Pérez','Gómez','Fernández']
    },
    ja: {
      male: ['Hiroshi','Takashi','Kenji','Yusuke','Daisuke','Ryota','Shota','Kazuki'],
      female: ['Yuki','Haruka','Nana','Sakura','Aoi','Rin','Mio','Hana'],
      last: ['Sato','Suzuki','Tanaka','Watanabe','Ito','Yamamoto','Nakamura','Kobayashi']
    },
    ar: {
      male: ['Mohammed','Ahmed','Ali','Omar','Hassan','Ibrahim','Khalid','Faisal'],
      female: ['Fatima','Aisha','Mariam','Sara','Noor','Layla','Hana','Amira'],
      last: ['Al-Rashid','Al-Hassan','Al-Ahmed','Al-Mohamed','Al-Sayed','Al-Omar']
    }
  };
  function pick(arr){return arr[Math.floor(Math.random()*arr.length)];}
  var genderSel=document.getElementById('rname-gender');
  var originSel=document.getElementById('rname-origin');
  var btn=document.getElementById('rname-btn');
  var out=document.getElementById('rname-out');
  if(!btn||!out) return;
  btn.addEventListener('click',function(){
    var origin=originSel?originSel.value:'en';
    var gender=genderSel?genderSel.value:'any';
    var set=names[origin]||names.en;
    var g=gender==='any'?(Math.random()<0.5?'male':'female'):gender;
    var first=pick(set[g]||set.male);
    var last=pick(set.last);
    // Japanese: last name first
    out.textContent=origin==='ja'?last+' '+first:first+' '+last;
  });
})();`,

  readingtime: `/* Reading time calculator */
(function () {
  'use strict';
  var txt=document.getElementById('rt-text');
  var wordsEl=document.getElementById('rt-words');
  var timeEl=document.getElementById('rt-time');
  var speakEl=document.getElementById('rt-speak');
  if(!txt) return;
  var READ_WPM=238, SPEAK_WPM=150;
  function calc(){
    var words=(txt.value.trim().match(/\S+/g)||[]).length;
    var rMin=words/READ_WPM, sMin=words/SPEAK_WPM;
    if(wordsEl) wordsEl.textContent=words.toLocaleString();
    if(timeEl) timeEl.textContent=rMin<1?Math.ceil(rMin*60)+'s':rMin.toFixed(1)+' min';
    if(speakEl) speakEl.textContent=sMin<1?Math.ceil(sMin*60)+'s':sMin.toFixed(1)+' min';
  }
  txt.addEventListener('input',calc);
  calc();
})();`,

  morsetranslator: `/* Morse code translator */
(function () {
  'use strict';
  var CODE={A:'.-',B:'-...',C:'-.-.',D:'-..',E:'.',F:'..-.',G:'--.',H:'....',I:'..',J:'.---',K:'-.-',L:'.-..',M:'--',N:'-.',O:'---',P:'.--.',Q:'--.-',R:'.-.',S:'...',T:'-',U:'..-',V:'...-',W:'.--',X:'-..-',Y:'-.--',Z:'--..',1:'.----',2:'..---',3:'...--',4:'....-',5:'.....',6:'-....',7:'--...',8:'---..',9:'----.',0:'-----'};
  var DECODE={};
  Object.keys(CODE).forEach(function(k){DECODE[CODE[k]]=k;});
  var inEl=document.getElementById('morse-in');
  var outEl=document.getElementById('morse-out');
  var decIn=document.getElementById('morse-decode-in');
  var decOut=document.getElementById('morse-decoded');
  var playBtn=document.getElementById('morse-play');
  function encode(t){
    return t.toUpperCase().split('').map(function(c){
      if(c===' ')return '/';
      return CODE[c]||'';
    }).filter(function(c,i,a){return c!==''||a[i-1]!=='';}).join(' ');
  }
  function decode(m){
    return m.split(/\s*\/\s*|\s{3,}/).map(function(word){
      return word.trim().split(/\s+/).map(function(sym){return DECODE[sym]||'?';}).join('');
    }).join(' ');
  }
  if(inEl) inEl.addEventListener('input',function(){if(outEl)outEl.textContent=encode(inEl.value)||'—';});
  if(decIn) decIn.addEventListener('input',function(){if(decOut)decOut.textContent=decode(decIn.value)||'—';});
  if(playBtn&&inEl) playBtn.addEventListener('click',function(){
    var morse=encode(inEl.value);
    try{
      var ctx=new(window.AudioContext||window.webkitAudioContext)();
      var unit=0.08;
      var t=ctx.currentTime+0.1;
      morse.split('').forEach(function(c){
        if(c==='.'){var o=ctx.createOscillator();var g=ctx.createGain();o.connect(g);g.connect(ctx.destination);o.frequency.value=700;g.gain.setValueAtTime(0.3,t);o.start(t);o.stop(t+unit);t+=unit*2;}
        else if(c==='-'){var o=ctx.createOscillator();var g=ctx.createGain();o.connect(g);g.connect(ctx.destination);o.frequency.value=700;g.gain.setValueAtTime(0.3,t);o.start(t);o.stop(t+unit*3);t+=unit*4;}
        else if(c===' '){t+=unit*2;}
        else if(c==='/'){t+=unit*4;}
      });
    }catch(e){}
  });
})();`,

  waterintake: `/* Water intake calculator */
(function () {
  'use strict';
  var wIn=document.getElementById('water-weight');
  var uSel=document.getElementById('water-unit');
  var aSel=document.getElementById('water-activity');
  var out=document.getElementById('water-out');
  if(!out) return;
  function calc(){
    var w=parseFloat(wIn.value);
    if(isNaN(w)||w<=0){out.textContent='—';return;}
    var kg=uSel&&uSel.value==='lb'?w*0.453592:w;
    var base=kg*35; // ml
    var mult=aSel?{low:1,mod:1.2,high:1.5}[aSel.value]||1:1;
    var ml=Math.round(base*mult);
    var l=(ml/1000).toFixed(1);
    var oz=Math.round(ml/29.5735);
    out.textContent=l+' L / '+oz+' fl oz per day';
  }
  [wIn,uSel,aSel].forEach(function(el){if(el)el.addEventListener('change',calc);});
  if(wIn) wIn.addEventListener('input',calc);
  calc();
})();`,

  electricitycost: `/* Electricity cost calculator */
(function () {
  'use strict';
  var w=document.getElementById('elec-watts');
  var h=document.getElementById('elec-hours');
  var r=document.getElementById('elec-rate');
  var day=document.getElementById('elec-day');
  var month=document.getElementById('elec-month');
  var year=document.getElementById('elec-year');
  if(!year) return;
  var fmt=function(n){return isFinite(n)?n.toLocaleString([],{minimumFractionDigits:2,maximumFractionDigits:2}):'—';};
  function calc(){
    var wv=parseFloat(w.value),hv=parseFloat(h.value),rv=parseFloat(r.value);
    if([wv,hv,rv].some(isNaN)){day.textContent=month.textContent=year.textContent='—';return;}
    var kwh=wv/1000*hv;
    var d=kwh*rv,m=d*30.44,y=d*365;
    if(day)day.textContent=fmt(d);
    if(month)month.textContent=fmt(m);
    year.textContent=fmt(y);
  }
  [w,h,r].forEach(function(el){if(el)el.addEventListener('input',calc);});
  calc();
})();`,

  qrmaker: `/* QR code generator using qrcode.js CDN */
(function () {
  'use strict';
  var txt=document.getElementById('qr-text');
  var sizeSel=document.getElementById('qr-size');
  var outEl=document.getElementById('qr-out');
  if(!txt||!outEl) return;
  function generate(){
    var v=txt.value.trim();
    var sz=sizeSel?parseInt(sizeSel.value,10):300;
    outEl.innerHTML='';
    if(!v) return;
    // Use Google Charts API as a simple fallback (no external JS needed)
    var url='https://chart.googleapis.com/chart?chs='+sz+'x'+sz+'&cht=qr&chl='+encodeURIComponent(v)+'&choe=UTF-8';
    var img=document.createElement('img');
    img.src=url; img.alt='QR Code'; img.style.borderRadius='0.5rem';
    img.style.cursor='pointer'; img.title='Click to download';
    img.addEventListener('click',function(){
      var a=document.createElement('a');a.href=url;a.download='qrcode.png';a.click();
    });
    outEl.appendChild(img);
    var note=document.createElement('p');
    note.style.fontSize='0.8rem';note.style.opacity='0.6';note.style.margin='0.25rem 0 0';
    note.textContent='Click image to download PNG';
    outEl.appendChild(note);
  }
  txt.addEventListener('input',generate);
  if(sizeSel)sizeSel.addEventListener('change',generate);
  generate();
})();`,
};

// ─── WRITE FILES ───────────────────────────────────────────────────────────
let created = 0;

for (const tool of TOOLS) {
  if (!tool.slug) continue;
  // Skip if no English strings defined (already done tools)
  if (!tool.en) continue;

  console.log(`\n[${tool.slug}]`);

  // 1. data/tools/{slug}.json
  const jsonPath = `data/tools/${tool.slug}.json`;
  const jsonData = {
    slug: tool.slug,
    category: tool.category,
    icon: tool.icon,
    script: tool.script || null,
    widget: tool.widget || '',
    strings: { en: tool.en, pt: tool.pt }
  };
  write(jsonPath, JSON.stringify(jsonData, null, 2) + '\n');

  // 2. public/assets/tools/{slug}.js
  if (tool.script) {
    const jsSlug = tool.script.replace('.js', '');
    const jsContent = JS[jsSlug];
    if (jsContent) {
      write(`public/assets/tools/${tool.script}`, jsContent + '\n');
    }
  }

  // 3. data/content/{slug}/en.md
  if (tool.contentEn) {
    write(`data/content/${tool.slug}/en.md`, tool.contentEn.trim() + '\n');
  }

  // 4. data/content/{slug}/pt.md
  if (tool.contentPt) {
    write(`data/content/${tool.slug}/pt.md`, tool.contentPt.trim() + '\n');
  }

  created++;
}

console.log(`\n✓ Done. Processed ${created} tools.`);
