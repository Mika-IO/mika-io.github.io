#!/usr/bin/env node
// Batch 2: generates remaining tools not yet created
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

// Helper: build a tool definition quickly
function tool(slug, category, icon, script, widget, en, pt, jsCode, contentEn, contentPt) {
  return { slug, category, icon, script, widget, en, pt, jsCode, contentEn, contentPt };
}

// Minimum 1000-word content helper - pads short content
function padContent(text, extra) {
  return text + (extra || '');
}

const TOOLS = [

tool('timezonediff','time','🌐','timezonediff.js',
`<div id="tzd-app"><div class="row"><div class="field"><label for="tzd-tz1">{{ui.zone1}}</label><select id="tzd-tz1"></select></div><div class="field"><label for="tzd-tz2">{{ui.zone2}}</label><select id="tzd-tz2"></select></div></div><div class="result"><span class="hint">{{ui.difference}}: </span><span class="big" id="tzd-out">—</span></div><div id="tzd-detail" style="opacity:0.7;font-size:0.9rem;margin-top:0.5rem"></div></div>`,
{title:'Time Zone Difference Calculator — hours between any two time zones',metaDescription:'Free time zone difference calculator. Find the exact hour difference between any two cities or time zones worldwide. Instant results in your browser.',h1:'Time Zone Difference Calculator',intro:'Select two time zones to see the current hour difference between them.',faq_title:'Time zone FAQ',ui:{zone1:'Time zone 1',zone2:'Time zone 2',difference:'Difference'},faq:[{q:'Does daylight saving time affect the result?',a:'Yes. The difference is calculated using the current UTC offsets, which already include any active daylight saving time adjustments.'},{q:'Why does the difference change through the year?',a:'When one zone observes daylight saving and another does not, or when they change on different dates, the offset between them shifts by an hour.'},{q:'What if both cities are in the same time zone?',a:'The difference will be 0 hours.'}]},
{title:'Calculadora de Diferença de Fuso Horário — horas entre dois fusos',metaDescription:'Calculadora de diferença de fuso horário gratuita. Encontre a diferença exata de horas entre quaisquer duas cidades ou fusos horários do mundo.',h1:'Calculadora de Diferença de Fuso Horário',intro:'Selecione dois fusos horários para ver a diferença atual de horas entre eles.',faq_title:'Perguntas frequentes de fuso horário',ui:{zone1:'Fuso horário 1',zone2:'Fuso horário 2',difference:'Diferença'},faq:[{q:'O horário de verão afeta o resultado?',a:'Sim. A diferença é calculada usando os deslocamentos UTC atuais, que já incluem quaisquer ajustes de horário de verão ativos.'},{q:'Por que a diferença muda ao longo do ano?',a:'Quando um fuso observa o horário de verão e outro não, ou quando mudam em datas diferentes, o deslocamento entre eles muda em uma hora.'},{q:'E se as duas cidades estiverem no mesmo fuso horário?',a:'A diferença será de 0 horas.'}]},
`/* Time zone difference */
(function(){
  'use strict';
  var zones=[['New York','America/New_York'],['Los Angeles','America/Los_Angeles'],['Chicago','America/Chicago'],['London','Europe/London'],['Paris','Europe/Paris'],['Berlin','Europe/Berlin'],['Moscow','Europe/Moscow'],['Dubai','Asia/Dubai'],['Mumbai','Asia/Kolkata'],['Singapore','Asia/Singapore'],['Tokyo','Asia/Tokyo'],['Sydney','Australia/Sydney'],['São Paulo','America/Sao_Paulo'],['Buenos Aires','America/Argentina/Buenos_Aires'],['Cairo','Africa/Cairo'],['Beijing','Asia/Shanghai'],['Seoul','Asia/Seoul'],['Bangkok','Asia/Bangkok']];
  function getOffset(tz){try{var s=new Intl.DateTimeFormat('en',{timeZone:tz,timeZoneName:'shortOffset'}).format(new Date());var m=s.match(/GMT([+-]\d{1,2}(?::\d{2})?)/);if(!m)return 0;var p=m[1].split(':');return parseInt(p[0],10)+(p[1]?parseInt(p[1],10)/60*(p[0]<0?-1:1):0);}catch(e){return 0;}}
  ['tzd-tz1','tzd-tz2'].forEach(function(id,i){var sel=document.getElementById(id);if(!sel)return;zones.forEach(function(z,j){var o=document.createElement('option');o.value=z[1];o.textContent=z[0];if(j===(i===0?0:2))o.selected=true;sel.appendChild(o);});});
  function calc(){var s1=document.getElementById('tzd-tz1'),s2=document.getElementById('tzd-tz2'),out=document.getElementById('tzd-out'),det=document.getElementById('tzd-detail');if(!out)return;var o1=getOffset(s1.value),o2=getOffset(s2.value),diff=o2-o1;var sign=diff>=0?'+':'';out.textContent=sign+diff+' hours';if(det){var n1=s1.options[s1.selectedIndex].text,n2=s2.options[s2.selectedIndex].text;det.textContent='When it is noon in '+n1+', it is '+(12+diff)+':00 in '+n2+'.';}}
  document.querySelectorAll('#tzd-tz1,#tzd-tz2').forEach(function(s){s.addEventListener('change',calc);});
  calc();
})();`,
`## Calculate the time difference between any two cities

Whether you are arranging an international call, tracking a global event, or simply curious about how many hours separate two cities, a time zone difference calculator gives you the answer instantly. Select two locations and the tool shows the current offset between them in hours, accounting for any daylight saving time currently in effect.

## Why time zone differences change

The world is divided into approximately 40 distinct time zones, each defined by its offset from Coordinated Universal Time (UTC). Most offsets are whole hours, though some countries use half-hour or quarter-hour offsets — India is UTC+5:30, Nepal is UTC+5:45, and several Australian states use UTC+9:30 and UTC+10:30.

Daylight saving time (DST) complicates matters further. When one location observes DST and another does not, the effective offset between them changes. The United States and much of Europe both observe DST, but they change on different dates: the US changes in March and November while Europe changes in late March and October. During the period between these change dates, the US–Europe offset is one hour different from the rest of the year.

## Practical uses for travellers

Before an international trip, knowing the time difference helps you prepare mentally for jet lag and plan your first few days. A traveller flying from New York to London gains 5 hours (or 6 hours during certain parts of the year depending on DST). Planning to call home during the trip requires knowing when it is a reasonable hour in both locations simultaneously.

## Remote work and global teams

Remote teams increasingly span multiple time zones, making offset awareness essential. Many teams establish a core overlap window — the hours when most members are within normal working hours simultaneously. A 5-hour difference might still allow a 2-3 hour overlap window; a 12-hour difference requires someone to be at the fringe of their working day.

Scheduling tools, calendar applications, and project management platforms all handle time zones automatically, but understanding the underlying offset helps you reason about scheduling without relying on software.

## Financial markets

Stock exchanges operate in specific local time zones: the New York Stock Exchange opens at 9:30 AM Eastern Time, the London Stock Exchange at 8:00 AM GMT, and the Tokyo Stock Exchange at 9:00 AM JST. Traders in other time zones need to know what these opening times mean locally, particularly for futures and foreign exchange markets that operate nearly continuously.

## Aviation and logistics

Airlines publish timetables in local time at departure and arrival airports, which means a flight departing New York at 11 PM and arriving in London at 11 AM the next day takes 7 hours, not the apparent 12. Freight logistics similarly requires timezone awareness for customs documentation, perishable goods tracking, and just-in-time delivery windows.

## The International Date Line

An extreme case of time zone differences is the International Date Line in the Pacific Ocean. Crossing it eastward moves you back one calendar day; crossing it westward moves you forward one day. Some island nations close to the date line have unusual offsets: Kiribati (UTC+14) is 26 hours ahead of American Samoa (UTC-12), even though they are geographically relatively close.

## Private and instant

The tool uses your browser's built-in Intl API to determine current UTC offsets. No data is sent anywhere.
`,
`## Calcule a diferença de horário entre quaisquer duas cidades

Seja para organizar uma chamada internacional, acompanhar um evento global ou simplesmente ter curiosidade sobre quantas horas separam duas cidades, uma calculadora de diferença de fuso horário dá a resposta na hora. Selecione dois locais e a ferramenta mostra o deslocamento atual entre eles em horas, levando em conta qualquer horário de verão atualmente em vigor.

## Por que as diferenças de fuso horário mudam

O mundo está dividido em aproximadamente 40 fusos horários distintos, cada um definido por seu deslocamento em relação ao Tempo Universal Coordenado (UTC). A maioria dos deslocamentos são horas inteiras, embora alguns países usem deslocamentos de meia hora ou quarto de hora — a Índia está em UTC+5:30 e o Nepal em UTC+5:45.

O horário de verão complica ainda mais as coisas. Quando um local observa o horário de verão e outro não, o deslocamento efetivo entre eles muda. Os EUA e boa parte da Europa observam o horário de verão, mas mudam em datas diferentes: os EUA mudam em março e novembro, enquanto a Europa muda no final de março e outubro.

## Trabalho remoto e equipes globais

Equipes remotas cada vez mais abrangem múltiplos fusos horários, tornando a consciência de deslocamento essencial. Muitas equipes estabelecem uma janela de sobreposição central — as horas em que a maioria dos membros está dentro do horário de trabalho normal simultaneamente.

## Mercados financeiros

As bolsas de valores operam em fusos horários locais específicos: a Bolsa de Nova York abre às 9h30 no horário do Leste, a Bolsa de Londres às 8h GMT e a Bolsa de Tóquio às 9h JST. Traders em outros fusos horários precisam saber o que esses horários de abertura significam localmente.

## Privado e instantâneo

A ferramenta usa a API Intl integrada do seu navegador para determinar os deslocamentos UTC atuais. Nenhum dado é enviado a lugar nenhum.
`),

tool('leapyear','time','🗓️','leapyear.js',
`<form id="ly-form"><div class="row"><div class="field"><label for="ly-year">{{ui.year}}</label><input type="number" id="ly-year" step="1" min="1" inputmode="numeric"></div></div><div class="result"><span class="big" id="ly-out">—</span></div><div id="ly-next" style="opacity:0.7;font-size:0.9rem;margin-top:0.5rem"></div></form>`,
{title:'Leap Year Calculator — is this year a leap year?',metaDescription:'Free leap year calculator. Check if any year is a leap year and find the next leap year. Instant results in your browser.',h1:'Leap Year Calculator',intro:'Enter any year to find out if it is a leap year.',faq_title:'Leap year FAQ',ui:{year:'Year'},faq:[{q:'What makes a year a leap year?',a:'A year is a leap year if it is divisible by 4, except for century years (divisible by 100), which must also be divisible by 400. So 2000 was a leap year but 1900 was not.'},{q:'Why do we need leap years?',a:'A solar year is approximately 365.2422 days, not exactly 365. Without leap years, the calendar would drift against the seasons by about 6 hours per year.'},{q:'When is the next leap year?',a:'Enter the current year to see the next one, or the calculator shows it automatically for the current year.'}]},
{title:'Calculadora de Ano Bissexto — este ano é bissexto?',metaDescription:'Calculadora de ano bissexto gratuita. Verifique se qualquer ano é bissexto e encontre o próximo ano bissexto.',h1:'Calculadora de Ano Bissexto',intro:'Informe qualquer ano para descobrir se é bissexto.',faq_title:'Perguntas frequentes de ano bissexto',ui:{year:'Ano'},faq:[{q:'O que torna um ano bissexto?',a:'Um ano é bissexto se for divisível por 4, exceto anos seculares (divisíveis por 100), que também devem ser divisíveis por 400. Assim, 2000 foi bissexto mas 1900 não foi.'},{q:'Por que precisamos de anos bissextos?',a:'Um ano solar tem aproximadamente 365,2422 dias, não exatamente 365. Sem anos bissextos, o calendário se desviaria das estações cerca de 6 horas por ano.'},{q:'Quando é o próximo ano bissexto?',a:'Informe o ano atual para ver o próximo, ou a calculadora o mostra automaticamente para o ano corrente.'}]},
`(function(){
  'use strict';
  function isLeap(y){return y%4===0&&(y%100!==0||y%400===0);}
  var inp=document.getElementById('ly-year');
  var out=document.getElementById('ly-out');
  var next=document.getElementById('ly-next');
  if(!out)return;
  if(inp)inp.value=new Date().getFullYear();
  function calc(){
    var y=parseInt(inp.value,10);
    if(isNaN(y)){out.textContent='—';if(next)next.textContent='';return;}
    out.textContent=isLeap(y)?y+' is a leap year ✓':y+' is not a leap year';
    var n=y+1;while(!isLeap(n))n++;
    if(next)next.textContent='Next leap year: '+n;
  }
  if(inp)inp.addEventListener('input',calc);
  calc();
})();`,
`## Is this year a leap year?

A leap year is a calendar year containing an extra day — February 29 — making it 366 days long instead of the usual 365. Leap years exist to keep the calendar aligned with the Earth's orbit around the Sun, which takes approximately 365.2422 days rather than exactly 365. Without periodic corrections, the calendar would drift against the seasons by about 6 hours per year, accumulating to a full day's drift every four years and eventually moving Christmas into summer in the Northern Hemisphere.

## The Gregorian leap year rule

The modern Gregorian calendar, adopted gradually across the world from 1582 onward, uses a three-part rule to determine leap years:

1. A year divisible by 4 is a leap year — so 2024, 2028, and 2032 are all leap years.
2. **Exception**: A year divisible by 100 is not a leap year — so 1900, 1800, and 1700 were not leap years, despite being divisible by 4.
3. **Exception to the exception**: A year divisible by 400 is a leap year — so 2000 and 1600 were leap years.

This three-part rule means that over a 400-year cycle there are 97 leap years rather than 100, giving an average year length of 365.2425 days. This is extremely close to the solar year of 365.2422 days — the error is less than one day per 3,000 years.

## History: the Julian calendar and its drift

Before the Gregorian reform, the Julian calendar (introduced by Julius Caesar in 45 BCE) added a leap day every four years without the century exception. This resulted in an average year of 365.25 days — slightly too long. Over centuries, the Julian calendar drifted against the solar year by about 11 minutes per year, accumulating to 10 days by the 16th century. Pope Gregory XIII's 1582 reform deleted 10 days from the calendar and introduced the century exception to prevent future drift.

## Birthdays on February 29

People born on February 29 — sometimes called "leaplings" or "leap day babies" — technically have a birthday that exists only every four years. In common usage, they celebrate on either February 28 or March 1 in non-leap years. Legally, most jurisdictions count their birthday as February 28 or March 1 for official purposes.

The probability of being born on February 29 is approximately 1 in 1,461 (one in four years, each with 365 days plus one extra), or about 0.068%. Several million people worldwide are leap day babies.

## Effects on finance and law

Leap years affect interest calculations, contract durations, and legal deadlines. A loan with daily interest accrual accumulates one extra day of interest in a leap year. Annual contracts that specify 365 days may technically expire one day early in a leap year, depending on jurisdiction and contract language. Payroll systems for salaried employees may differ in how they handle the extra day — some annual salaries are divided by 365 or 366 depending on the year.

## Other calendar systems

The Islamic Hijri calendar is a purely lunar calendar and does not use the Gregorian leap year system, though it has its own leap year cycle for keeping lunar months aligned. The Hebrew calendar is a lunisolar calendar that adds an entire leap month (Adar I) seven times in every 19-year cycle. The Iranian (Solar Hijri) calendar has an 8-day leap year rule even more accurate than the Gregorian system.

## Private and instant

The leap year check uses simple arithmetic running in your browser. No data is sent anywhere.
`,
`## Este ano é bissexto?

Um ano bissexto é um ano de calendário contendo um dia extra — 29 de fevereiro — tornando-o 366 dias em vez dos usuais 365. Anos bissextos existem para manter o calendário alinhado com a órbita da Terra ao redor do Sol, que leva aproximadamente 365,2422 dias em vez de exatamente 365. Sem correções periódicas, o calendário se desviaria das estações cerca de 6 horas por ano.

## A regra gregoriana de ano bissexto

O moderno calendário gregoriano usa uma regra de três partes para determinar anos bissextos:

1. Um ano divisível por 4 é bissexto — então 2024, 2028 e 2032 são todos anos bissextos.
2. **Exceção**: Um ano divisível por 100 não é bissexto — então 1900, 1800 e 1700 não eram bissextos.
3. **Exceção à exceção**: Um ano divisível por 400 é bissexto — então 2000 e 1600 foram bissextos.

Esta regra de três partes significa que em um ciclo de 400 anos há 97 anos bissextos em vez de 100, dando um comprimento médio de ano de 365,2425 dias. Isso é extremamente próximo do ano solar de 365,2422 dias.

## Aniversários em 29 de fevereiro

Pessoas nascidas em 29 de fevereiro — às vezes chamadas de "saltadores" — tecnicamente têm um aniversário que existe apenas a cada quatro anos. No uso comum, elas comemoram em 28 de fevereiro ou 1° de março em anos não-bissextos.

## Efeitos em finanças e direito

Anos bissextos afetam cálculos de juros, durações de contratos e prazos legais. Um empréstimo com acumulação de juros diária acumula um dia extra de juros em um ano bissexto. Sistemas de folha de pagamento para funcionários assalariados podem diferir em como tratam o dia extra.

## Privado e instantâneo

A verificação de ano bissexto usa aritmética simples rodando no seu navegador. Nenhum dado é enviado a lugar nenhum.
`),

tool('timecalc','time','⏰','timecalc.js',
`<form id="tc-form"><div class="row"><div class="field"><label for="tc-h1">{{ui.time_a}}</label><div style="display:flex;gap:0.25rem;align-items:center"><input type="number" id="tc-h1" min="0" step="1" style="width:60px" placeholder="h"> : <input type="number" id="tc-m1" min="0" max="59" step="1" style="width:60px" placeholder="m"> : <input type="number" id="tc-s1" min="0" max="59" step="1" style="width:60px" placeholder="s"></div></div><div class="field" style="align-self:flex-end;padding-bottom:0.5rem"><select id="tc-op"><option value="+">+</option><option value="-">−</option></select></div><div class="field"><label for="tc-h2">{{ui.time_b}}</label><div style="display:flex;gap:0.25rem;align-items:center"><input type="number" id="tc-h2" min="0" step="1" style="width:60px" placeholder="h"> : <input type="number" id="tc-m2" min="0" max="59" step="1" style="width:60px" placeholder="m"> : <input type="number" id="tc-s2" min="0" max="59" step="1" style="width:60px" placeholder="s"></div></div></div><div class="result"><span class="hint">{{ui.result}}: </span><span class="big" id="tc-out">—</span></div></form>`,
{title:'Time Calculator — add and subtract hours, minutes and seconds',metaDescription:'Free time calculator. Add or subtract hours, minutes, and seconds easily. Great for calculating total work hours, travel times, and durations.',h1:'Time Calculator',intro:'Enter two time durations and choose to add or subtract them.',faq_title:'Time calculator FAQ',ui:{time_a:'Time A',time_b:'Time B',result:'Result'},faq:[{q:'Can I enter more than 24 hours?',a:'Yes. The hours field accepts any positive integer, so you can calculate total hours worked across multiple days.'},{q:'What if the result is negative?',a:'If subtracting gives a negative result, the calculator shows it prefixed with a minus sign.'},{q:'How do I calculate total work hours?',a:'Enter your start time as Time A (hours from midnight, e.g. 9h 0m for 9 AM), your end time as Time B, and choose subtract. The result is your hours worked.'}]},
{title:'Calculadora de Tempo — some e subtraia horas, minutos e segundos',metaDescription:'Calculadora de tempo gratuita. Some ou subtraia horas, minutos e segundos facilmente. Ótima para calcular total de horas trabalhadas, tempos de viagem e durações.',h1:'Calculadora de Tempo',intro:'Informe duas durações de tempo e escolha somá-las ou subtraí-las.',faq_title:'Perguntas frequentes da calculadora de tempo',ui:{time_a:'Tempo A',time_b:'Tempo B',result:'Resultado'},faq:[{q:'Posso informar mais de 24 horas?',a:'Sim. O campo de horas aceita qualquer inteiro positivo, então você pode calcular total de horas trabalhadas ao longo de vários dias.'},{q:'E se o resultado for negativo?',a:'Se a subtração der um resultado negativo, a calculadora mostra prefixado com sinal de menos.'},{q:'Como calculo o total de horas trabalhadas?',a:'Informe seu horário de início como Tempo A (horas desde meia-noite), seu horário de término como Tempo B e escolha subtrair. O resultado são suas horas trabalhadas.'}]},
`(function(){
  'use strict';
  var ids=['tc-h1','tc-m1','tc-s1','tc-h2','tc-m2','tc-s2','tc-op'];
  function g(id){return document.getElementById(id);}
  function calc(){
    var h1=parseInt(g('tc-h1').value||0,10),m1=parseInt(g('tc-m1').value||0,10),s1=parseInt(g('tc-s1').value||0,10);
    var h2=parseInt(g('tc-h2').value||0,10),m2=parseInt(g('tc-m2').value||0,10),s2=parseInt(g('tc-s2').value||0,10);
    var op=g('tc-op').value;
    var t1=h1*3600+m1*60+s1,t2=h2*3600+m2*60+s2;
    var r=op==='+'?t1+t2:t1-t2;
    var sign=r<0?'-':''; r=Math.abs(r);
    var h=Math.floor(r/3600),m=Math.floor((r%3600)/60),s=r%60;
    var out=document.getElementById('tc-out');
    if(out)out.textContent=sign+(h<10?'0':'')+h+'h '+(m<10?'0':'')+m+'m '+(s<10?'0':'')+s+'s';
  }
  ids.forEach(function(id){var el=g(id);if(el)el.addEventListener('input',calc);});
  calc();
})();`,
`## Add and subtract time durations easily

Adding or subtracting time seems simple until you hit the arithmetic. Hours, minutes, and seconds use a base-60 system rather than base-10, which means the usual mental arithmetic does not apply directly. Adding 2 hours 45 minutes to 1 hour 30 minutes gives 4 hours 15 minutes, not 4:75. This calculator handles the conversion automatically — enter the hours, minutes, and seconds for each duration, choose add or subtract, and the correctly formatted result appears instantly.

## Common uses for a time calculator

**Total work hours**: If you worked from 8:30 AM to 12:15 PM and then from 1:00 PM to 5:45 PM, add the two sessions to get your total. Enter 3 hours 45 minutes for the morning and 4 hours 45 minutes for the afternoon; the total is 8 hours 30 minutes.

**Travel time**: Adding driving, walking, and transit segments into a total journey time is a frequent use. Three separate legs of 45 minutes, 20 minutes, and 1 hour 10 minutes sum to 2 hours 15 minutes.

**Project tracking**: Summing the time spent on different tasks across a day or week gives total billable hours. Freelancers and contractors often track time in hours and minutes and need to sum multiple entries.

**Sports and competition**: Comparing lap times, summing stage times in a race, or calculating how much time a competitor needs to make up.

**Cooking**: Multiple dishes with different cooking times starting at different points can be tracked by adding elapsed times.

## The base-60 system

Time uses sexagesimal (base-60) arithmetic, inherited from ancient Babylonian mathematics. There are 60 seconds in a minute and 60 minutes in an hour, so carrying from seconds to minutes happens at 60, not at 100. This is why simple decimal addition produces wrong results for time: 45 minutes + 30 minutes = 75 minutes = 1 hour 15 minutes, not 0.75 hours.

The calculator converts all inputs to total seconds, performs the arithmetic in seconds, then converts back to hours, minutes, and seconds for display. This approach handles all carrying and borrowing correctly regardless of the values entered.

## Negative results

When subtracting, if Time A is less than Time B the result is negative — for example, if you subtract 3 hours from 1 hour you get minus 2 hours. The calculator displays the absolute value with a minus sign prefix. This can be useful for understanding how much time you are over a budget or target.

## Hours beyond 24

Unlike a clock, the hours field accepts any non-negative integer, so you can work with durations of 48 hours, 100 hours, or more. This is useful for multi-day project tracking, total marathon split times, or any other large-scale time arithmetic.

## Private and instant

All calculations run in your browser. No data is sent anywhere.
`,
`## Some e subtraia durações de tempo facilmente

Somar ou subtrair tempo parece simples até você bater na aritmética. Horas, minutos e segundos usam um sistema de base 60 em vez de base 10, o que significa que a aritmética mental usual não se aplica diretamente. Somar 2 horas 45 minutos a 1 hora 30 minutos dá 4 horas 15 minutos, não 4:75. Esta calculadora trata a conversão automaticamente.

## Usos comuns para uma calculadora de tempo

**Total de horas trabalhadas**: Se você trabalhou das 8h30 às 12h15 e depois das 13h às 17h45, some as duas sessões para obter o total.

**Tempo de viagem**: Somar segmentos de carro, caminhada e transporte em um tempo total de viagem é um uso frequente.

**Rastreamento de projetos**: Somar o tempo gasto em diferentes tarefas ao longo de um dia ou semana dá o total de horas faturáveis.

**Esportes e competição**: Comparar tempos de volta, somar tempos de etapas em uma corrida.

## O sistema de base 60

O tempo usa aritmética sexagesimal (base 60), herdada da matemática babilônica antiga. Há 60 segundos em um minuto e 60 minutos em uma hora, então o carry de segundos para minutos acontece em 60, não em 100.

## Privado e instantâneo

Todos os cálculos rodam no seu navegador. Nenhum dado é enviado a lugar nenhum.
`),

tool('workdays','time','📅','workdays.js',
`<form id="wd-form"><div class="row"><div class="field"><label for="wd-from">{{ui.from_date}}</label><input type="date" id="wd-from"></div><div class="field"><label for="wd-to">{{ui.to_date}}</label><input type="date" id="wd-to"></div></div><div class="result"><span class="hint">{{ui.workdays}}: </span><span class="big" id="wd-out">—</span></div><div id="wd-detail" style="opacity:0.7;font-size:0.9rem;margin-top:0.5rem"></div></form>`,
{title:'Work Days Calculator — count business days between two dates',metaDescription:'Free work days calculator. Count the number of business days (Monday–Friday) between any two dates, excluding weekends. Instant results in your browser.',h1:'Work Days Calculator',intro:'Select a start and end date to count the working days between them, excluding weekends.',faq_title:'Work days FAQ',ui:{from_date:'Start date',to_date:'End date',workdays:'Working days'},faq:[{q:'Does this include public holidays?',a:'No. This calculator excludes only weekends (Saturday and Sunday). Public holidays vary by country and cannot be determined automatically without knowing your location.'},{q:'Are the start and end dates included?',a:'Yes, both the start and end dates are included if they fall on a weekday.'},{q:'Can I calculate workdays in the past?',a:'Yes, enter any two dates in any order and the calculator returns the correct count.'}]},
{title:'Calculadora de Dias Úteis — conte dias úteis entre duas datas',metaDescription:'Calculadora de dias úteis gratuita. Conte o número de dias úteis (segunda a sexta) entre quaisquer duas datas, excluindo fins de semana.',h1:'Calculadora de Dias Úteis',intro:'Selecione uma data de início e fim para contar os dias úteis entre elas, excluindo fins de semana.',faq_title:'Perguntas frequentes de dias úteis',ui:{from_date:'Data inicial',to_date:'Data final',workdays:'Dias úteis'},faq:[{q:'Isso inclui feriados?',a:'Não. Esta calculadora exclui apenas fins de semana (sábado e domingo). Feriados variam por país e não podem ser determinados automaticamente sem saber sua localização.'},{q:'As datas de início e fim são incluídas?',a:'Sim, as datas de início e fim são incluídas se caírem em dia útil.'},{q:'Posso calcular dias úteis no passado?',a:'Sim, informe quaisquer duas datas em qualquer ordem e a calculadora retorna a contagem correta.'}]},
`(function(){
  'use strict';
  var from=document.getElementById('wd-from'),to=document.getElementById('wd-to');
  var out=document.getElementById('wd-out'),det=document.getElementById('wd-detail');
  var today=new Date().toISOString().slice(0,10);
  if(from)from.value=today;
  if(to){var d=new Date();d.setDate(d.getDate()+30);to.value=d.toISOString().slice(0,10);}
  function countWorkdays(a,b){
    var s=new Date(a<b?a:b),e=new Date(a<b?b:a);
    var count=0;
    for(var d=new Date(s);d<=e;d.setDate(d.getDate()+1)){var day=d.getDay();if(day!==0&&day!==6)count++;}
    return count;
  }
  function calc(){
    if(!from.value||!to.value){out.textContent='—';return;}
    var w=countWorkdays(from.value,to.value);
    var total=Math.round(Math.abs(new Date(to.value)-new Date(from.value))/86400000)+1;
    out.textContent=w+' working days';
    if(det)det.textContent='('+total+' calendar days, '+(total-w)+' weekend days)';
  }
  if(from)from.addEventListener('change',calc);
  if(to)to.addEventListener('change',calc);
  calc();
})();`,
`## Count business days between any two dates

Not all days are working days. Weekends interrupt the flow of business, and knowing how many actual working days exist between two dates is essential for project planning, contract management, invoice terms, legal deadlines, and HR calculations. This calculator counts Monday-through-Friday days between any start and end date, excluding Saturdays and Sundays.

## Business days vs calendar days

Calendar days count every day from start to finish, including weekends. Business days (also called working days or weekdays) exclude Saturdays and Sundays. The difference matters when:

- A contract specifies a "30 business day" delivery window — this is six calendar weeks, not 30 days.
- A legal deadline is 10 business days from an event — missing the calendar date would be an error.
- A payment is due "net 30 days" — this usually means 30 calendar days, but some jurisdictions interpret it as business days.
- An employment notice period of 2 weeks — this is 10 business days.

## How the calculator works

The calculator iterates through every day between the two dates and counts only those that fall on Monday, Tuesday, Wednesday, Thursday, or Friday. Both the start date and the end date are included if they are weekdays. The total also shows the breakdown: calendar days, working days, and weekend days.

## Project planning

Project managers use business day calculations constantly. A project plan with 20 tasks, each taking 2 business days, spans at minimum 40 business days — 8 calendar weeks. Adding buffer, dependencies, and review cycles requires knowing exactly how many working days fit into a given calendar span.

Sprint planning in software development typically uses 2-week sprints, which contain 10 working days. Knowing the business days in a longer roadmap horizon helps estimate how many sprints fit between now and a major milestone.

## Invoice and payment terms

Net 30, net 60, and net 90 payment terms are almost always in calendar days. However, some industries and contracts use business days, making the distinction important. A net 30 calendar day invoice issued on a Monday is due 30 calendar days later, regardless of how many weekends fall in between. A 30 business day term ends significantly later — over six calendar weeks.

## Employment and HR

Notice periods for employment termination are frequently specified in weeks or working days. A 2-week notice period starting on a Tuesday ends on the Monday two weeks later — 10 business days. Annual leave entitlements are often in working days per year. HR systems track working day balances for leave requests and approvals.

## Public holidays

This calculator excludes only weekends. Public holidays vary enormously by country, region, state, and even industry, and cannot be determined automatically without additional information. For calculations that must exclude specific holidays, use the result from this calculator as a starting point and manually subtract the relevant holidays that fall within the date range.

## Private and instant

All calculations run in your browser. No data is sent anywhere.
`,
`## Conte dias úteis entre quaisquer duas datas

Nem todos os dias são dias úteis. Os fins de semana interrompem o fluxo dos negócios, e saber quantos dias úteis reais existem entre duas datas é essencial para planejamento de projetos, gestão de contratos, termos de faturas, prazos legais e cálculos de RH. Esta calculadora conta os dias de segunda a sexta entre qualquer data de início e fim, excluindo sábados e domingos.

## Dias úteis vs dias corridos

Dias corridos contam todos os dias do início ao fim, incluindo fins de semana. Dias úteis excluem sábados e domingos. A diferença importa quando:

- Um contrato especifica um prazo de entrega de "30 dias úteis" — isso são seis semanas de calendário, não 30 dias.
- Um prazo legal é de 10 dias úteis a partir de um evento.
- Um pagamento vence em "30 dias" — isso geralmente significa 30 dias corridos.

## Planejamento de projetos

Gerentes de projeto usam cálculos de dias úteis constantemente. Um plano de projeto com 20 tarefas, cada uma levando 2 dias úteis, abrange no mínimo 40 dias úteis — 8 semanas de calendário.

## Termos de fatura e pagamento

Os termos de pagamento de 30, 60 e 90 dias quase sempre são em dias corridos. No entanto, alguns setores e contratos usam dias úteis, tornando a distinção importante.

## Feriados

Esta calculadora exclui apenas fins de semana. Feriados variam enormemente por país, região e estado, e não podem ser determinados automaticamente sem informações adicionais.

## Privado e instantâneo

Todos os cálculos rodam no seu navegador. Nenhum dado é enviado a lugar nenhum.
`),

tool('dayofweek','time','📆','dayofweek.js',
`<form id="dow-form"><div class="row"><div class="field"><label for="dow-date">{{ui.date}}</label><input type="date" id="dow-date"></div></div><div class="result"><span class="big" id="dow-out">—</span></div><div id="dow-detail" style="opacity:0.7;font-size:0.9rem;margin-top:0.5rem"></div></form>`,
{title:'Day of Week Calculator — what day of the week was any date?',metaDescription:'Free day of week calculator. Find out what day of the week any date falls on. Check birthdays, historical dates, or any future date instantly.',h1:'Day of the Week',intro:'Enter any date to find out which day of the week it falls on.',faq_title:'Day of week FAQ',ui:{date:'Date'},faq:[{q:'What day of the week was I born?',a:'Enter your birthday and the calculator shows the day of the week.'},{q:'How far back can I go?',a:'The calculator uses JavaScript\'s Date object, which reliably handles dates from the year 100 CE onward in the Gregorian calendar.'},{q:'Why is January 1, 2000 useful to know?',a:'January 1, 2000 was a Saturday. Y2K was on a weekend, which reduced the immediate disruption.'}]},
{title:'Calculador de Dia da Semana — em que dia da semana foi qualquer data?',metaDescription:'Calculadora de dia da semana gratuita. Descubra em que dia da semana cai qualquer data. Verifique aniversários, datas históricas ou qualquer data futura na hora.',h1:'Dia da Semana',intro:'Informe qualquer data para descobrir em que dia da semana ela cai.',faq_title:'Perguntas frequentes do dia da semana',ui:{date:'Data'},faq:[{q:'Em que dia da semana eu nasci?',a:'Informe seu aniversário e a calculadora mostra o dia da semana.'},{q:'Até quando posso voltar?',a:'A calculadora usa o objeto Date do JavaScript, que lida confiavelmente com datas a partir do ano 100 EC no calendário gregoriano.'},{q:'Por que 1° de janeiro de 2000 é útil saber?',a:'1° de janeiro de 2000 foi um sábado. O Y2K foi em um fim de semana, o que reduziu a disrupção imediata.'}]},
`(function(){
  'use strict';
  var days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var months=['January','February','March','April','May','June','July','August','September','October','November','December'];
  var inp=document.getElementById('dow-date');
  var out=document.getElementById('dow-out');
  var det=document.getElementById('dow-detail');
  if(!inp||!out)return;
  inp.value=new Date().toISOString().slice(0,10);
  function calc(){
    if(!inp.value){out.textContent='—';return;}
    var d=new Date(inp.value+'T12:00:00');
    out.textContent=days[d.getDay()];
    if(det){var today=new Date();today.setHours(12,0,0,0);var diff=Math.round((d-today)/86400000);var rel=diff===0?'(today)':diff===1?'(tomorrow)':diff===-1?'(yesterday)':diff>0?'(in '+diff+' days)':'('+Math.abs(diff)+' days ago)';det.textContent=months[d.getMonth()]+' '+d.getDate()+', '+d.getFullYear()+' '+rel;}
  }
  inp.addEventListener('change',calc);
  calc();
})();`,
`## Find the day of the week for any date

Knowing what day of the week a specific date falls on is useful for a surprising range of purposes: checking what day of the week you were born, finding out the day of an important historical event, verifying what day a future meeting or holiday lands on, or solving trivia questions. Enter any date and the day of the week is shown instantly.

## How day-of-week calculation works

The day of the week for any date can be determined through a formula called Zeller's Congruence or the Doomsday algorithm, both of which use modular arithmetic. The JavaScript Date object used by this calculator applies the Gregorian calendar rules automatically, giving accurate results for any date in the Gregorian calendar era.

## Historical curiosities

Several historically significant dates have interesting day-of-week properties:

- **January 1, 2000** (Y2K): Saturday — the widely feared computer bug hit on a weekend, reducing immediate business disruption.
- **July 4, 1776** (US Independence): Thursday — the Continental Congress approved the Declaration of Independence on a Thursday.
- **November 9, 1989** (Berlin Wall falls): Thursday.
- **September 11, 2001**: Tuesday — the attacks on the World Trade Center occurred on a Tuesday morning.
- **December 25, 2025** (Christmas): Thursday.

## Birthday curiosity

Many people are curious about what day of the week they were born. This calculation requires only the birth date. Famous birthdays reveal interesting patterns — Albert Einstein was born on a Friday (March 14, 1879), and William Shakespeare both was born and died on an April 23 that fell on a Tuesday (1564) and Wednesday (1616) respectively.

## Day of the week for planning

Knowing the day of the week for a future date helps with practical planning: confirming that a scheduled event does not fall on a weekend, checking which day of the week a public holiday falls on (a Monday holiday creates a long weekend), or verifying the day of the week for a visa appointment, flight booking, or contract deadline.

## The Gregorian calendar and other systems

The Gregorian calendar was introduced in 1582 by Pope Gregory XIII as a reform of the Julian calendar. Different countries adopted it at different times — Britain and its colonies switched in 1752, Russia not until 1918. Dates before a country's adoption of the Gregorian calendar technically fall under the Julian calendar, where the same date corresponds to a different day of the week. This calculator uses the proleptic Gregorian calendar — the Gregorian rules applied consistently backward — which is the standard approach for historical date calculations.

## Private and instant

The calculation uses JavaScript's Date object in your browser. No data is sent anywhere.
`,
`## Encontre o dia da semana para qualquer data

Saber em que dia da semana uma data específica cai é útil para uma surpreendente variedade de fins: verificar em que dia da semana você nasceu, descobrir o dia de um evento histórico importante, verificar em que dia uma reunião ou feriado futuro cai, ou resolver questões de trivia.

## Como funciona o cálculo do dia da semana

O dia da semana para qualquer data pode ser determinado por uma fórmula chamada Congruência de Zeller ou o algoritmo do Doomsday. O objeto Date do JavaScript usado por esta calculadora aplica as regras do calendário gregoriano automaticamente, dando resultados precisos para qualquer data na era do calendário gregoriano.

## Curiosidades históricas

Várias datas historicamente significativas têm propriedades interessantes de dia da semana:

- **1° de janeiro de 2000** (Y2K): Sábado — o amplamente temido bug computacional ocorreu em um fim de semana.
- **4 de julho de 1776** (Independência dos EUA): Quinta-feira.
- **9 de novembro de 1989** (Queda do Muro de Berlim): Quinta-feira.
- **11 de setembro de 2001**: Terça-feira.

## Privado e instantâneo

O cálculo usa o objeto Date do JavaScript no seu navegador. Nenhum dado é enviado a lugar nenhum.
`),

tool('romanmath','math','🔢','romanmath.js',
`<form id="roman-form"><div class="row"><div class="field"><label for="roman-dec">{{ui.decimal}}</label><input type="number" id="roman-dec" min="1" max="3999" step="1" inputmode="numeric"></div></div><div class="result"><span class="hint">{{ui.roman}}: </span><span class="big" id="roman-out">—</span></div><hr style="margin:1rem 0;opacity:0.3"><div class="field"><label for="roman-in">{{ui.roman_to_dec}}</label><input type="text" id="roman-in" style="text-transform:uppercase" maxlength="20"></div><div class="result"><span class="hint">{{ui.decimal}}: </span><span class="big" id="roman-dec-out">—</span></div></form>`,
{title:'Roman Numeral Converter — convert numbers to Roman numerals',metaDescription:'Free Roman numeral converter. Convert any number from 1 to 3999 to Roman numerals, or convert Roman numerals back to decimal. Instant and accurate.',h1:'Roman Numeral Converter',intro:'Enter a decimal number to convert to Roman numerals, or enter Roman numerals to convert to decimal.',faq_title:'Roman numerals FAQ',ui:{decimal:'Decimal number',roman:'Roman numeral',roman_to_dec:'Roman numeral to decimal'},faq:[{q:'What is the range for Roman numerals?',a:'Standard Roman numerals represent numbers from 1 to 3,999. The number 4,000 would require a symbol (M̄) with a bar that is not standard. This calculator supports 1–3,999.'},{q:'What are the Roman numeral symbols?',a:'I=1, V=5, X=10, L=50, C=100, D=500, M=1000. Subtractive notation: IV=4, IX=9, XL=40, XC=90, CD=400, CM=900.'},{q:'When are Roman numerals used today?',a:'Roman numerals appear on clock faces, book chapter headings, movie sequels (Rocky IV), Super Bowl numbers (Super Bowl LVII), year numbers in films and monuments, and outline formatting.'}]},
{title:'Conversor de Algarismos Romanos — converta números para romanos',metaDescription:'Conversor de algarismos romanos gratuito. Converta qualquer número de 1 a 3.999 para algarismos romanos, ou converta algarismos romanos para decimal.',h1:'Conversor de Algarismos Romanos',intro:'Informe um número decimal para converter para algarismos romanos, ou informe algarismos romanos para converter para decimal.',faq_title:'Perguntas frequentes de algarismos romanos',ui:{decimal:'Número decimal',roman:'Algarismo romano',roman_to_dec:'Algarismo romano para decimal'},faq:[{q:'Qual é o intervalo para algarismos romanos?',a:'Os algarismos romanos padrão representam números de 1 a 3.999. Este conversor suporta 1–3.999.'},{q:'Quais são os símbolos dos algarismos romanos?',a:'I=1, V=5, X=10, L=50, C=100, D=500, M=1000. Notação subtrativa: IV=4, IX=9, XL=40, XC=90, CD=400, CM=900.'},{q:'Quando os algarismos romanos são usados hoje?',a:'Os algarismos romanos aparecem em relógios, cabeçalhos de capítulos de livros, sequências de filmes (Rocky IV), números do Super Bowl, números de ano em filmes e monumentos.'}]},
`(function(){
  'use strict';
  var vals=[1000,900,500,400,100,90,50,40,10,9,5,4,1];
  var syms=['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I'];
  function toRoman(n){if(isNaN(n)||n<1||n>3999)return'';var r='';for(var i=0;i<vals.length;i++){while(n>=vals[i]){r+=syms[i];n-=vals[i];}}return r;}
  function fromRoman(s){s=s.toUpperCase().trim();var map={I:1,V:5,X:10,L:50,C:100,D:500,M:1000};var r=0;for(var i=0;i<s.length;i++){var cur=map[s[i]],next=map[s[i+1]];if(!cur)return NaN;if(next&&next>cur){r-=cur;}else r+=cur;}return r;}
  var decIn=document.getElementById('roman-dec'),romOut=document.getElementById('roman-out');
  var romIn=document.getElementById('roman-in'),decOut=document.getElementById('roman-dec-out');
  if(decIn)decIn.addEventListener('input',function(){if(romOut)romOut.textContent=toRoman(parseInt(decIn.value,10))||'—';});
  if(romIn)romIn.addEventListener('input',function(){var r=fromRoman(romIn.value);if(decOut)decOut.textContent=isNaN(r)||r<1?'—':r;});
})();`,
`## Convert between decimal numbers and Roman numerals

Roman numerals have been used for over two millennia and remain widely encountered today — on clock faces, in film and book titles, at the Super Bowl, in legal documents, and on monuments. This converter works in both directions: enter a decimal number to get its Roman numeral equivalent, or type Roman numerals to convert them back to decimal.

## The Roman numeral system

Roman numerals use seven Latin letters as symbols: I (1), V (5), X (10), L (50), C (100), D (500), and M (1000). Numbers are formed by combining these symbols following two main rules:

**Additive notation**: Symbols are placed from highest to lowest and their values are added. III = 1+1+1 = 3. VIII = 5+1+1+1 = 8. XIII = 10+3 = 13.

**Subtractive notation**: When a smaller value symbol appears before a larger one, it is subtracted. This avoids sequences of four repeated symbols. The subtractive pairs are: IV = 4 (not IIII), IX = 9 (not VIIII), XL = 40, XC = 90, CD = 400, CM = 900.

## Complete examples

- MMXXIV = 2000+20+4 = 2024 (the year 2024)
- XLII = 40+2 = 42
- CDXCIX = 400+90+9 = 499
- MCMXCIX = 1000+900+90+9 = 1999
- MMMDCCCLXXXVIII = 3888 (the longest standard Roman numeral)

## Where Roman numerals appear today

**Clocks and watches**: Many traditional clock faces use Roman numerals for hours. Note that IV is sometimes written as IIII on clocks for visual symmetry.

**Film and television**: Production years of films and TV shows are often displayed in Roman numerals in end credits. Film sequels frequently use them: Rocky IV, Star Wars Episode IV.

**Sports**: The Super Bowl has been numbered with Roman numerals since Super Bowl V. The Olympics also use Roman numerals for their numbered games.

**Monarchy and papacy**: Rulers with the same name are distinguished by ordinals in Roman numerals: Elizabeth II, Pope John XXIII, Henry VIII.

**Outlines and lists**: Formal outlines (I. II. III. A. B. C. i. ii. iii.) use Roman numerals for major section numbers.

**Architecture and monuments**: Year numbers on cornerstones, monuments, and public buildings are traditionally carved in Roman numerals.

## Limitations of Roman numerals

Roman numerals have no symbol for zero, no way to represent fractions, and no straightforward arithmetic — multiplying two Roman numerals by hand is laborious. This is why the system was gradually replaced by the Hindu-Arabic positional system (the digits 0–9) for calculation purposes.

## Private and instant

The conversion runs in your browser. No data is sent anywhere.
`,
`## Converta entre números decimais e algarismos romanos

Os algarismos romanos têm sido usados por mais de dois milênios e permanecem amplamente encontrados hoje — em relógios, títulos de filmes e livros, no Super Bowl, em documentos legais e em monumentos. Este conversor funciona em ambas as direções.

## O sistema de algarismos romanos

Os algarismos romanos usam sete letras latinas como símbolos: I (1), V (5), X (10), L (50), C (100), D (500) e M (1000).

**Notação aditiva**: Os símbolos são colocados do maior para o menor e seus valores são somados. III = 1+1+1 = 3.

**Notação subtrativa**: Quando um símbolo de valor menor aparece antes de um maior, ele é subtraído. IV = 4, IX = 9, XL = 40, XC = 90, CD = 400, CM = 900.

## Onde os algarismos romanos aparecem hoje

**Relógios**: Muitas faces de relógio tradicionais usam algarismos romanos para as horas.

**Filmes e televisão**: Anos de produção de filmes frequentemente são exibidos em algarismos romanos nos créditos finais.

**Esportes**: O Super Bowl tem sido numerado com algarismos romanos desde o Super Bowl V.

**Monarquia e papado**: Governantes com o mesmo nome são distinguidos por ordinais em algarismos romanos: Elizabeth II, Papa João XXIII.

## Privado e instantâneo

A conversão roda no seu navegador. Nenhum dado é enviado a lugar nenhum.
`),

tool('lcmcalc','math','🔢','lcmcalc.js',
`<form id="lcm-form"><div class="field"><label for="lcm-nums">{{ui.numbers}}</label><input type="text" id="lcm-nums" placeholder="{{ui.placeholder}}" inputmode="numeric"></div><div class="result"><span class="hint">LCM: </span><span class="big" id="lcm-out">—</span></div><div id="lcm-gcd-out" style="opacity:0.7;font-size:0.9rem;margin-top:0.5rem"></div></form>`,
{title:'LCM Calculator — Least Common Multiple of multiple numbers',metaDescription:'Free LCM calculator. Find the Least Common Multiple (LCM) of any set of numbers. Also shows the GCD. Instant results in your browser.',h1:'LCM Calculator',intro:'Enter two or more numbers separated by commas to find their Least Common Multiple.',faq_title:'LCM calculator FAQ',ui:{numbers:'Numbers (comma-separated)',placeholder:'e.g. 12, 18, 24'},faq:[{q:'What is the Least Common Multiple?',a:'The LCM of a set of numbers is the smallest positive integer that is divisible by all of them. For example, the LCM of 4 and 6 is 12, because 12 is the smallest number divisible by both 4 and 6.'},{q:'What is it used for?',a:'LCM is used when adding fractions with different denominators — find the LCM of the denominators to get the common denominator. It also appears in scheduling problems where events repeat at different intervals.'},{q:'What is the difference between LCM and GCD?',a:'GCD (Greatest Common Divisor) is the largest number that divides all given numbers. LCM is the smallest number divisible by all of them. They are related: LCM(a,b) = a×b / GCD(a,b).'}]},
{title:'Calculadora de MMC — Mínimo Múltiplo Comum de vários números',metaDescription:'Calculadora de MMC gratuita. Encontre o Mínimo Múltiplo Comum (MMC) de qualquer conjunto de números. Também mostra o MDC.',h1:'Calculadora de MMC',intro:'Informe dois ou mais números separados por vírgulas para encontrar o Mínimo Múltiplo Comum.',faq_title:'Perguntas frequentes da calculadora de MMC',ui:{numbers:'Números (separados por vírgula)',placeholder:'ex: 12, 18, 24'},faq:[{q:'O que é o Mínimo Múltiplo Comum?',a:'O MMC de um conjunto de números é o menor inteiro positivo divisível por todos eles. Por exemplo, o MMC de 4 e 6 é 12, porque 12 é o menor número divisível por 4 e 6.'},{q:'Para que é usado?',a:'O MMC é usado ao somar frações com denominadores diferentes — encontre o MMC dos denominadores para obter o denominador comum. Também aparece em problemas de agendamento onde eventos se repetem em intervalos diferentes.'},{q:'Qual a diferença entre MMC e MDC?',a:'MDC (Máximo Divisor Comum) é o maior número que divide todos os números dados. MMC é o menor número divisível por todos eles. Eles estão relacionados: MMC(a,b) = a×b / MDC(a,b).'}]},
`(function(){
  'use strict';
  function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=b;b=a%b;a=t;}return a;}
  function lcm(a,b){return a/gcd(a,b)*b;}
  var inp=document.getElementById('lcm-nums'),out=document.getElementById('lcm-out'),gcdOut=document.getElementById('lcm-gcd-out');
  if(!inp)return;
  function calc(){
    var nums=inp.value.split(',').map(function(s){return parseInt(s.trim(),10);}).filter(function(n){return!isNaN(n)&&n>0;});
    if(nums.length<2){out.textContent='—';if(gcdOut)gcdOut.textContent='';return;}
    var l=nums.reduce(lcm);
    var g=nums.reduce(gcd);
    out.textContent=l.toLocaleString();
    if(gcdOut)gcdOut.textContent='GCD: '+g.toLocaleString();
  }
  inp.addEventListener('input',calc);calc();
})();`,
`## Find the Least Common Multiple of any numbers

The Least Common Multiple (LCM) — also called Minimum Common Multiple or in Portuguese Mínimo Múltiplo Comum (MMC) — is the smallest positive integer that is evenly divisible by all the numbers in a given set. Enter two or more numbers separated by commas and the LCM appears instantly, along with the Greatest Common Divisor (GCD) as a bonus.

## Definition and examples

The LCM of a set of numbers is the smallest number that all of them divide into without a remainder.

- LCM(4, 6) = 12 — because 12 ÷ 4 = 3 and 12 ÷ 6 = 2, and no smaller number works for both.
- LCM(3, 5) = 15 — because 3 and 5 are coprime (share no common factors), their LCM is simply their product.
- LCM(12, 18, 24) = 72 — the smallest number divisible by all three.

## How LCM is calculated

The most efficient method uses the relationship between LCM and GCD: LCM(a, b) = |a × b| / GCD(a, b). For more than two numbers, the LCM is computed pairwise: LCM(a, b, c) = LCM(LCM(a, b), c).

The GCD is computed using the Euclidean algorithm, which repeatedly divides the larger number by the smaller and takes the remainder until the remainder is zero. The last non-zero remainder is the GCD.

## Adding fractions with different denominators

The most common everyday application of LCM is in fraction arithmetic. To add 1/4 and 1/6, you need a common denominator. The LCM of 4 and 6 is 12, so: 1/4 = 3/12 and 1/6 = 2/12, giving 5/12. Using the LCM gives the most reduced form immediately, whereas using any other common multiple (like 24) gives a result that still needs simplification.

## Scheduling and cycles

LCM appears in scheduling problems where events repeat at different intervals. If bus A runs every 12 minutes and bus B every 18 minutes, and both depart at 8:00 AM, when will they next depart simultaneously? LCM(12, 18) = 36, so they next coincide at 8:36 AM.

Similarly, gears in mechanical systems have tooth counts where LCM determines when the same teeth mesh again. Production lines with machines operating at different cycle times use LCM to find synchronization points.

## Music theory

In music, LCM determines when rhythmic patterns repeat. A pattern of 3 beats played against a pattern of 4 beats creates a cycle of LCM(3, 4) = 12 beats before the downbeats coincide again. This is the basis of polyrhythmic music.

## Private and instant

All calculations run in your browser using the Euclidean algorithm. No data is sent anywhere.
`,
`## Encontre o Mínimo Múltiplo Comum de quaisquer números

O Mínimo Múltiplo Comum (MMC) é o menor inteiro positivo que é igualmente divisível por todos os números em um determinado conjunto.

## Definição e exemplos

- MMC(4, 6) = 12 — porque 12 ÷ 4 = 3 e 12 ÷ 6 = 2, e nenhum número menor funciona para os dois.
- MMC(3, 5) = 15 — porque 3 e 5 são coprimos, seu MMC é simplesmente o produto deles.
- MMC(12, 18, 24) = 72 — o menor número divisível pelos três.

## Como o MMC é calculado

O método mais eficiente usa a relação entre MMC e MDC: MMC(a, b) = |a × b| / MDC(a, b).

## Somando frações com denominadores diferentes

A aplicação cotidiana mais comum do MMC é na aritmética de frações. Para somar 1/4 e 1/6, você precisa de um denominador comum. O MMC de 4 e 6 é 12, então: 1/4 = 3/12 e 1/6 = 2/12, dando 5/12.

## Agendamento e ciclos

O MMC aparece em problemas de agendamento onde eventos se repetem em intervalos diferentes. Se o ônibus A passa a cada 12 minutos e o ônibus B a cada 18 minutos, e ambos partem às 8h00, quando partirão simultaneamente pela próxima vez? MMC(12, 18) = 36, então coincidem às 8h36.

## Privado e instantâneo

Todos os cálculos rodam no seu navegador usando o algoritmo de Euclides. Nenhum dado é enviado a lugar nenhum.
`),

tool('gcdcalc','math','🔢','gcdcalc.js',
`<form id="gcd-form"><div class="field"><label for="gcd-nums">{{ui.numbers}}</label><input type="text" id="gcd-nums" placeholder="{{ui.placeholder}}" inputmode="numeric"></div><div class="result"><span class="hint">GCD: </span><span class="big" id="gcd-out">—</span></div><div id="gcd-lcm-out" style="opacity:0.7;font-size:0.9rem;margin-top:0.5rem"></div></form>`,
{title:'GCD Calculator — Greatest Common Divisor of multiple numbers',metaDescription:'Free GCD calculator. Find the Greatest Common Divisor (GCD/GCF/HCF) of any set of numbers. Also shows the LCM. Instant results in your browser.',h1:'GCD Calculator',intro:'Enter two or more numbers separated by commas to find their Greatest Common Divisor.',faq_title:'GCD calculator FAQ',ui:{numbers:'Numbers (comma-separated)',placeholder:'e.g. 48, 36, 24'},faq:[{q:'What is the GCD?',a:'The Greatest Common Divisor (GCD), also called Greatest Common Factor (GCF) or Highest Common Factor (HCF), is the largest positive integer that divides all given numbers without a remainder. GCD(12, 18) = 6.'},{q:'What is GCD used for?',a:'GCD is used to simplify fractions — divide numerator and denominator by their GCD. It is also used in cryptography, computer science algorithms, and determining the pitch of gear teeth in engineering.'},{q:'What if the numbers share no common factor?',a:'If two numbers share no common factor other than 1, their GCD is 1 and they are called coprime or relatively prime.'}]},
{title:'Calculadora de MDC — Máximo Divisor Comum de vários números',metaDescription:'Calculadora de MDC gratuita. Encontre o Máximo Divisor Comum (MDC) de qualquer conjunto de números. Também mostra o MMC.',h1:'Calculadora de MDC',intro:'Informe dois ou mais números separados por vírgulas para encontrar o Máximo Divisor Comum.',faq_title:'Perguntas frequentes da calculadora de MDC',ui:{numbers:'Números (separados por vírgula)',placeholder:'ex: 48, 36, 24'},faq:[{q:'O que é o MDC?',a:'O Máximo Divisor Comum (MDC) é o maior inteiro positivo que divide todos os números dados sem resto. MDC(12, 18) = 6.'},{q:'Para que é usado o MDC?',a:'O MDC é usado para simplificar frações — divida o numerador e o denominador pelo MDC. Também é usado em criptografia, algoritmos de ciência da computação e na engenharia.'},{q:'E se os números não compartilharem nenhum fator comum?',a:'Se dois números não compartilham nenhum fator comum além de 1, seu MDC é 1 e são chamados de coprimos ou primos entre si.'}]},
`(function(){
  'use strict';
  function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=b;b=a%b;a=t;}return a;}
  function lcm(a,b){return a/gcd(a,b)*b;}
  var inp=document.getElementById('gcd-nums'),out=document.getElementById('gcd-out'),lcmOut=document.getElementById('gcd-lcm-out');
  if(!inp)return;
  function calc(){
    var nums=inp.value.split(',').map(function(s){return parseInt(s.trim(),10);}).filter(function(n){return!isNaN(n)&&n>0;});
    if(nums.length<2){out.textContent='—';if(lcmOut)lcmOut.textContent='';return;}
    var g=nums.reduce(gcd);
    var l=nums.reduce(lcm);
    out.textContent=g.toLocaleString();
    if(lcmOut)lcmOut.textContent='LCM: '+l.toLocaleString();
  }
  inp.addEventListener('input',calc);calc();
})();`,
`## Find the Greatest Common Divisor of any numbers

The Greatest Common Divisor (GCD) — also called the Greatest Common Factor (GCF) or Highest Common Factor (HCF) — is the largest number that divides all given numbers without leaving a remainder. Enter two or more numbers separated by commas and the GCD is computed instantly using the Euclidean algorithm.

## Definition and examples

- GCD(12, 18) = 6 — because 6 is the largest number that divides both 12 and 18.
- GCD(48, 36, 24) = 12 — the largest number dividing all three.
- GCD(7, 13) = 1 — these are coprime (no common factor other than 1).

## The Euclidean algorithm

The most famous method for computing GCD is the Euclidean algorithm, described by Euclid around 300 BCE in his Elements. The algorithm states that GCD(a, b) = GCD(b, a mod b), and repeats until b = 0. For example: GCD(48, 36) → GCD(36, 12) → GCD(12, 0) = 12.

## Simplifying fractions

The most common everyday use of GCD is simplifying fractions to lowest terms. To simplify 48/72, compute GCD(48, 72) = 24, then divide both by 24: 2/3. The result is fully reduced because the numerator and denominator are now coprime.

## Cryptography

RSA encryption, the algorithm that secures most internet communications, depends fundamentally on number theory involving GCD and coprime numbers. The RSA key generation algorithm requires selecting two large prime numbers, which are always coprime to each other and to their products.

## Engineering

In mechanical engineering, the GCD of tooth counts on two gears determines how frequently the same pair of teeth meet. If gear A has 48 teeth and gear B has 36 teeth, GCD(48, 36) = 12, meaning every 12 teeth on gear A mesh with every 12 teeth on gear B.

## Private and instant

All calculations run in your browser. No data is sent anywhere.
`,
`## Encontre o Máximo Divisor Comum de quaisquer números

O Máximo Divisor Comum (MDC) é o maior número que divide todos os números dados sem deixar resto.

## Definição e exemplos

- MDC(12, 18) = 6 — porque 6 é o maior número que divide tanto 12 quanto 18.
- MDC(48, 36, 24) = 12 — o maior número que divide os três.
- MDC(7, 13) = 1 — esses são coprimos (nenhum fator comum além de 1).

## O algoritmo de Euclides

O método mais famoso para computar o MDC é o algoritmo de Euclides, descrito por Euclides por volta de 300 aC em seus Elementos. O algoritmo afirma que MDC(a, b) = MDC(b, a mod b), e repete até b = 0.

## Simplificando frações

O uso cotidiano mais comum do MDC é simplificar frações para termos mínimos. Para simplificar 48/72, compute MDC(48, 72) = 24, então divida os dois por 24: 2/3.

## Privado e instantâneo

Todos os cálculos rodam no seu navegador. Nenhum dado é enviado a lugar nenhum.
`),

tool('areacalc','math','📐','areacalc.js',
`<div id="area-app"><div class="field"><label for="area-shape">{{ui.shape}}</label><select id="area-shape"><option value="rect">{{ui.rectangle}}</option><option value="circle">{{ui.circle}}</option><option value="triangle">{{ui.triangle}}</option><option value="square">{{ui.square}}</option><option value="trapezoid">{{ui.trapezoid}}</option></select></div><div id="area-inputs" class="row" style="margin-top:1rem"></div><div class="result"><span class="hint">{{ui.area}}: </span><span class="big" id="area-out">—</span></div></div>`,
{title:'Area Calculator — calculate area of any shape',metaDescription:'Free area calculator. Calculate the area of rectangles, circles, triangles, squares, and trapezoids. Enter dimensions and get the area instantly in your browser.',h1:'Area Calculator',intro:'Select a shape, enter the dimensions, and see the area calculated instantly.',faq_title:'Area calculator FAQ',ui:{shape:'Shape',rectangle:'Rectangle',circle:'Circle',triangle:'Triangle',square:'Square',trapezoid:'Trapezoid',area:'Area',width:'Width',height:'Height',radius:'Radius',base:'Base',side:'Side',base1:'Base 1 (a)',base2:'Base 2 (b)'},faq:[{q:'What units are used?',a:'The area is in square units of whatever unit you enter. If you enter dimensions in metres, the area is in square metres (m²). In feet, it is in square feet (ft²).'},{q:'How is the circle area calculated?',a:'Area = π × r². Enter the radius (half the diameter) to get the area.'},{q:'How is the triangle area calculated?',a:'Area = ½ × base × height, where height is the perpendicular height from the base to the opposite vertex.'}]},
{title:'Calculadora de Área — calcule a área de qualquer forma',metaDescription:'Calculadora de área gratuita. Calcule a área de retângulos, círculos, triângulos, quadrados e trapézios. Informe as dimensões e obtenha a área na hora no seu navegador.',h1:'Calculadora de Área',intro:'Selecione uma forma, informe as dimensões e veja a área calculada na hora.',faq_title:'Perguntas frequentes da calculadora de área',ui:{shape:'Forma',rectangle:'Retângulo',circle:'Círculo',triangle:'Triângulo',square:'Quadrado',trapezoid:'Trapézio',area:'Área',width:'Largura',height:'Altura',radius:'Raio',base:'Base',side:'Lado',base1:'Base 1 (a)',base2:'Base 2 (b)'},faq:[{q:'Que unidades são usadas?',a:'A área está em unidades quadradas de qualquer unidade que você informar. Se informar dimensões em metros, a área está em metros quadrados (m²).'},{q:'Como a área do círculo é calculada?',a:'Área = π × r². Informe o raio (metade do diâmetro) para obter a área.'},{q:'Como a área do triângulo é calculada?',a:'Área = ½ × base × altura, onde altura é a altura perpendicular da base ao vértice oposto.'}]},
`(function(){
  'use strict';
  var shapes={
    rect:[['width','Width (w)'],['height','Height (h)']],
    circle:[['radius','Radius (r)']],
    triangle:[['base','Base (b)'],['height','Height (h)']],
    square:[['side','Side (s)']],
    trapezoid:[['base1','Base 1 (a)'],['base2','Base 2 (b)'],['height','Height (h)']]
  };
  var formulas={
    rect:function(v){return v.width*v.height;},
    circle:function(v){return Math.PI*v.radius*v.radius;},
    triangle:function(v){return 0.5*v.base*v.height;},
    square:function(v){return v.side*v.side;},
    trapezoid:function(v){return 0.5*(v.base1+v.base2)*v.height;}
  };
  var sel=document.getElementById('area-shape');
  var inputsDiv=document.getElementById('area-inputs');
  var out=document.getElementById('area-out');
  if(!sel)return;
  function buildInputs(){
    inputsDiv.innerHTML='';
    var shape=sel.value;
    (shapes[shape]||[]).forEach(function(pair){
      var div=document.createElement('div');div.className='field';
      var lbl=document.createElement('label');lbl.textContent=pair[1];lbl.htmlFor='area-'+pair[0];
      var inp=document.createElement('input');inp.type='number';inp.id='area-'+pair[0];inp.step='any';inp.min='0';inp.inputMode='decimal';
      inp.addEventListener('input',calc);
      div.appendChild(lbl);div.appendChild(inp);inputsDiv.appendChild(div);
    });
    calc();
  }
  function calc(){
    var shape=sel.value;
    var vals={};var ok=true;
    (shapes[shape]||[]).forEach(function(pair){
      var el=document.getElementById('area-'+pair[0]);
      var v=el?parseFloat(el.value):NaN;
      if(isNaN(v)||v<0)ok=false;
      vals[pair[0]]=v;
    });
    if(!ok){out.textContent='—';return;}
    var a=formulas[shape](vals);
    out.textContent=a.toLocaleString([],{maximumFractionDigits:6})+' square units';
  }
  sel.addEventListener('change',buildInputs);
  buildInputs();
})();`,
`## Calculate the area of any common shape

Area is one of the most fundamental measurements in mathematics, engineering, construction, and everyday life. Whether you are calculating how much paint covers a wall, how much flooring you need for a room, how much fabric is in a pattern piece, or solving a geometry problem, area calculation is essential. This calculator handles five common shapes instantly: rectangle, circle, triangle, square, and trapezoid.

## Rectangle

A rectangle's area is length multiplied by width: A = l × w. A room 5 metres wide and 4 metres long has an area of 20 square metres. The area of a rectangle is the basis for most building and interior design calculations.

## Circle

A circle's area is pi times the radius squared: A = π × r². The radius is half the diameter. A circular garden with a diameter of 6 metres has a radius of 3 metres and an area of π × 9 ≈ 28.27 square metres. For a circle, the area grows quadratically with radius — doubling the radius quadruples the area.

## Triangle

A triangle's area is half the base times the perpendicular height: A = ½ × b × h. The height must be the perpendicular distance from the base to the opposite vertex, not the length of a slanted side. A right triangle with legs 3 and 4 has area ½ × 3 × 4 = 6 square units.

## Square

A square's area is the side length squared: A = s². This is a special case of the rectangle formula. A 10-centimetre square has an area of 100 cm² = 0.01 m².

## Trapezoid

A trapezoid (or trapezium in British English) has two parallel sides called bases. Its area is half the sum of the parallel sides times the perpendicular height between them: A = ½ × (a + b) × h.

## Units

The area is always in square units: if dimensions are in metres, area is in m²; in feet, ft². To convert: 1 m² = 10.764 ft². 1 ft² = 0.0929 m².

## Practical applications

**Flooring**: Measure the length and width of a room to find the area. Add 10–15% for waste from cuts.

**Paint coverage**: Paint covers approximately 10–12 m² per litre (100–130 ft² per quart). Divide the wall area by the coverage rate to find the number of litres needed.

**Land and real estate**: Land is measured in square metres (most countries) or square feet (US). 1 hectare = 10,000 m². 1 acre = 43,560 ft² ≈ 4,047 m².

**Fabric and sewing**: Pattern pieces are measured by area to estimate fabric requirements.

**Agriculture**: Field sizes, crop yield per area, and irrigation planning all use area calculations.

## Private and instant

All calculations run in your browser. No data is sent anywhere.
`,
`## Calcule a área de qualquer forma comum

Área é uma das medições mais fundamentais na matemática, engenharia, construção e vida cotidiana. Esta calculadora trata cinco formas comuns instantaneamente: retângulo, círculo, triângulo, quadrado e trapézio.

## Retângulo

A área de um retângulo é comprimento multiplicado por largura: A = c × l. Um cômodo de 5 metros de largura e 4 metros de comprimento tem área de 20 metros quadrados.

## Círculo

A área de um círculo é pi vezes o raio ao quadrado: A = π × r². Um jardim circular com diâmetro de 6 metros tem raio de 3 metros e área de π × 9 ≈ 28,27 m².

## Triângulo

A área de um triângulo é metade da base vezes a altura perpendicular: A = ½ × b × h.

## Quadrado

A área de um quadrado é o lado ao quadrado: A = s². Um quadrado de 10 centímetros tem área de 100 cm².

## Trapézio

A área de um trapézio é metade da soma dos lados paralelos vezes a altura perpendicular entre eles: A = ½ × (a + b) × h.

## Aplicações práticas

**Pisos**: Meça o comprimento e a largura de um cômodo para encontrar a área.

**Cobertura de tinta**: A tinta cobre aproximadamente 10–12 m² por litro.

**Terra e imóveis**: 1 hectare = 10.000 m².

## Privado e instantâneo

Todos os cálculos rodam no seu navegador. Nenhum dado é enviado a lugar nenhum.
`),

tool('squarecalc','math','√','squarecalc.js',
`<form id="sq-form"><div class="row"><div class="field"><label for="sq-n">{{ui.number}}</label><input type="number" id="sq-n" step="any" min="0" inputmode="decimal"></div></div><div class="result"><span class="hint">√ = </span><span class="big" id="sq-out">—</span></div><div class="result" style="opacity:0.7;font-size:0.9rem"><span>n² = </span><span id="sq-sq">—</span></div></form>`,
{title:'Square Root Calculator — find the square root of any number',metaDescription:'Free square root calculator. Find the square root of any positive number instantly. Also shows the square (n²). Works in your browser with no signup required.',h1:'Square Root Calculator',intro:'Enter a number to find its square root. Also shows the square of the number.',faq_title:'Square root FAQ',ui:{number:'Number'},faq:[{q:'What is a square root?',a:'The square root of a number n is a value that, when multiplied by itself, gives n. For example, √9 = 3 because 3 × 3 = 9. Every positive number has two square roots: a positive and a negative one.'},{q:'What about negative numbers?',a:'The square root of a negative number is not a real number — it is an imaginary number. For example, √(-1) = i in the complex number system.'},{q:'What are perfect squares?',a:'A perfect square is a number whose square root is a whole integer: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100... are perfect squares.'}]},
{title:'Calculadora de Raiz Quadrada — encontre a raiz quadrada de qualquer número',metaDescription:'Calculadora de raiz quadrada gratuita. Encontre a raiz quadrada de qualquer número positivo na hora. Também mostra o quadrado (n²).',h1:'Calculadora de Raiz Quadrada',intro:'Informe um número para encontrar sua raiz quadrada. Também mostra o quadrado do número.',faq_title:'Perguntas frequentes da raiz quadrada',ui:{number:'Número'},faq:[{q:'O que é raiz quadrada?',a:'A raiz quadrada de um número n é um valor que, quando multiplicado por si mesmo, dá n. Por exemplo, √9 = 3 porque 3 × 3 = 9.'},{q:'E os números negativos?',a:'A raiz quadrada de um número negativo não é um número real — é um número imaginário. Por exemplo, √(-1) = i no sistema de números complexos.'},{q:'O que são quadrados perfeitos?',a:'Um quadrado perfeito é um número cuja raiz quadrada é um inteiro: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100... são quadrados perfeitos.'}]},
`(function(){
  'use strict';
  var inp=document.getElementById('sq-n'),out=document.getElementById('sq-out'),sqEl=document.getElementById('sq-sq');
  if(!inp)return;
  function calc(){
    var n=parseFloat(inp.value);
    if(isNaN(n)){out.textContent='—';if(sqEl)sqEl.textContent='—';return;}
    if(n<0){out.textContent='imaginary';if(sqEl)sqEl.textContent=(n*n).toLocaleString([],{maximumFractionDigits:8});return;}
    out.textContent=Math.sqrt(n).toLocaleString([],{maximumFractionDigits:10});
    if(sqEl)sqEl.textContent=(n*n).toLocaleString([],{maximumFractionDigits:8});
  }
  inp.addEventListener('input',calc);calc();
})();`,
`## Find the square root of any number instantly

The square root is one of the most commonly used mathematical operations. From the Pythagorean theorem to standard deviation, from quadratic equations to financial formulas, square roots appear everywhere. Enter any non-negative number and its square root is shown immediately, along with the square (n²) for reference.

## What is a square root?

The square root of a number n is the value that, when multiplied by itself, equals n. Written as √n or n^(1/2). For example:
- √9 = 3 because 3 × 3 = 9
- √25 = 5 because 5 × 5 = 25
- √2 ≈ 1.4142135... (an irrational number)
- √100 = 10

Every positive number has two square roots: a positive one and a negative one. The positive root is called the principal square root. The square root of zero is zero.

## Perfect squares

A perfect square is a number that has an integer square root:
- 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225...

Recognising perfect squares is useful in arithmetic, geometry, and algebra.

## Irrational square roots

Most numbers do not have exact integer square roots. √2, √3, √5, √6, √7, and many others are irrational — their decimal expansions are infinite and non-repeating. These values are important in geometry: the diagonal of a unit square has length √2 ≈ 1.41421356...

## Applications

**Pythagorean theorem**: The hypotenuse c of a right triangle satisfies c = √(a² + b²). Computing this requires taking a square root.

**Standard deviation**: The standard deviation of a dataset is the square root of the variance. Taking the square root returns the measure to the original units of the data.

**Quadratic formula**: The solutions to ax² + bx + c = 0 are x = (-b ± √(b² - 4ac)) / 2a. The discriminant b² - 4ac under the square root determines whether solutions are real.

**Distance formula**: The distance between two points (x₁, y₁) and (x₂, y₂) is √((x₂-x₁)² + (y₂-y₁)²).

**Financial models**: Standard deviation of returns measures investment risk. Portfolio mathematics uses square roots extensively.

**Physics**: Wave equations, energy calculations, and many physical relationships involve square roots.

## Negative numbers and imaginary numbers

The square root of a negative number is not a real number. In the complex number system, √(-1) is defined as the imaginary unit i. Complex numbers have the form a + bi and are used in electrical engineering, quantum mechanics, and many other fields.

## How the calculation works

The calculator uses JavaScript's Math.sqrt() function, which implements the IEEE 754 double-precision floating-point square root algorithm. Results are accurate to about 15-16 significant figures.

## Private and instant

The calculation runs in your browser. No data is sent anywhere.
`,
`## Encontre a raiz quadrada de qualquer número na hora

A raiz quadrada é uma das operações matemáticas mais usadas. Do Teorema de Pitágoras ao desvio padrão, de equações quadráticas a fórmulas financeiras, raízes quadradas aparecem em todo lugar.

## O que é raiz quadrada?

A raiz quadrada de um número n é o valor que, quando multiplicado por si mesmo, é igual a n. Por exemplo: √9 = 3 porque 3 × 3 = 9. √2 ≈ 1,4142135... (um número irracional).

## Quadrados perfeitos

Um quadrado perfeito é um número que tem uma raiz quadrada inteira: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100...

## Aplicações

**Teorema de Pitágoras**: A hipotenusa c de um triângulo retângulo satisfaz c = √(a² + b²).

**Desvio padrão**: O desvio padrão de um conjunto de dados é a raiz quadrada da variância.

**Fórmula de distância**: A distância entre dois pontos (x₁, y₁) e (x₂, y₂) é √((x₂-x₁)² + (y₂-y₁)²).

**Modelos financeiros**: O desvio padrão dos retornos mede o risco de investimento.

## Privado e instantâneo

O cálculo roda no seu navegador. Nenhum dado é enviado a lugar nenhum.
`),

// FINANCE remaining
tool('compoundinterest','finance','💰','compoundinterest.js',
`<form id="ci-form"><div class="row"><div class="field"><label for="ci-principal">{{ui.principal}}</label><input type="number" id="ci-principal" step="any" min="0" inputmode="decimal"></div><div class="field"><label for="ci-rate">{{ui.rate}}</label><input type="number" id="ci-rate" step="any" min="0" inputmode="decimal"></div><div class="field"><label for="ci-years">{{ui.years}}</label><input type="number" id="ci-years" step="1" min="0" inputmode="numeric"></div><div class="field"><label for="ci-freq">{{ui.freq}}</label><select id="ci-freq"><option value="1">{{ui.annually}}</option><option value="2">{{ui.semi}}</option><option value="4">{{ui.quarterly}}</option><option value="12" selected>{{ui.monthly}}</option><option value="365">{{ui.daily}}</option></select></div></div><div class="result"><span class="hint">{{ui.future}}: </span><span class="big" id="ci-out">—</span></div><div id="ci-interest" style="opacity:0.7;font-size:0.9rem;margin-top:0.5rem"></div></form>`,
{title:'Compound Interest Calculator — watch your investment grow',metaDescription:'Free compound interest calculator. Enter a principal, interest rate, and time period to see how compound interest grows your investment. Monthly, quarterly, or annual compounding.',h1:'Compound Interest Calculator',intro:'Enter the principal, interest rate, number of years, and compounding frequency to see the future value.',faq_title:'Compound interest FAQ',ui:{principal:'Principal (initial amount)',rate:'Annual interest rate %',years:'Years',freq:'Compounding',annually:'Annually',semi:'Semi-annually',quarterly:'Quarterly',monthly:'Monthly',daily:'Daily',future:'Future value',interest:'Total interest earned'},faq:[{q:'What is compound interest?',a:'Compound interest means interest is calculated on both the original principal and the accumulated interest from previous periods. This causes the balance to grow exponentially rather than linearly.'},{q:'What is the compound interest formula?',a:'A = P × (1 + r/n)^(n×t), where P is principal, r is annual rate (decimal), n is compounding frequency per year, and t is years.'},{q:'How does compounding frequency affect the result?',a:'More frequent compounding produces slightly higher returns. Monthly compounding earns more than annual compounding at the same rate, but the difference diminishes as compounding becomes more frequent.'}]},
{title:'Calculadora de Juros Compostos — veja seu investimento crescer',metaDescription:'Calculadora de juros compostos gratuita. Informe um capital, taxa de juros e período para ver como os juros compostos fazem seu investimento crescer.',h1:'Calculadora de Juros Compostos',intro:'Informe o capital, taxa de juros, número de anos e frequência de capitalização para ver o valor futuro.',faq_title:'Perguntas frequentes de juros compostos',ui:{principal:'Capital (valor inicial)',rate:'Taxa de juros anual %',years:'Anos',freq:'Capitalização',annually:'Anual',semi:'Semestral',quarterly:'Trimestral',monthly:'Mensal',daily:'Diária',future:'Valor futuro',interest:'Juros totais ganhos'},faq:[{q:'O que são juros compostos?',a:'Juros compostos significam que os juros são calculados tanto sobre o capital original quanto sobre os juros acumulados de períodos anteriores. Isso faz o saldo crescer exponencialmente em vez de linearmente.'},{q:'Qual é a fórmula de juros compostos?',a:'A = P × (1 + r/n)^(n×t), onde P é o capital, r é a taxa anual (decimal), n é a frequência de capitalização por ano e t é os anos.'},{q:'Como a frequência de capitalização afeta o resultado?',a:'Capitalização mais frequente produz retornos ligeiramente maiores. Capitalização mensal rende mais que capitalização anual à mesma taxa.'}]},
`(function(){
  'use strict';
  var lang=document.documentElement.lang||'en';
  var money=function(n){return isFinite(n)?n.toLocaleString(lang,{minimumFractionDigits:2,maximumFractionDigits:2}):'—';};
  function calc(){
    var p=parseFloat(document.getElementById('ci-principal').value);
    var r=parseFloat(document.getElementById('ci-rate').value)/100;
    var t=parseFloat(document.getElementById('ci-years').value);
    var n=parseFloat(document.getElementById('ci-freq').value);
    var out=document.getElementById('ci-out');
    var intEl=document.getElementById('ci-interest');
    if([p,r,t,n].some(isNaN)||p<0||t<0){if(out)out.textContent='—';return;}
    var a=p*Math.pow(1+r/n,n*t);
    var interest=a-p;
    if(out)out.textContent=money(a);
    if(intEl)intEl.textContent='Interest earned: '+money(interest);
  }
  document.querySelectorAll('#ci-principal,#ci-rate,#ci-years,#ci-freq').forEach(function(el){el.addEventListener('input',calc);});
  calc();
})();`,
`## Watch your investment grow with compound interest

Compound interest is one of the most powerful forces in personal finance. Albert Einstein is often (though apocryphally) quoted as calling it the eighth wonder of the world: "He who understands it, earns it; he who doesn't, pays it." This calculator shows you exactly how any starting amount grows over time at a given interest rate, with the compounding frequency of your choice.

## What is compound interest?

With simple interest, you earn a fixed amount of interest each period calculated only on the original principal. With compound interest, you earn interest on the principal plus on all previously accumulated interest. This causes balances to grow exponentially rather than linearly.

Example: Invest $1,000 at 10% annual interest.
- Simple interest after 10 years: $1,000 + ($100 × 10) = $2,000
- Compound interest (annual) after 10 years: $1,000 × 1.10^10 = $2,593.74

The difference, $593.74, is the extra growth from compounding. Over longer periods, this difference becomes enormous. At 10% for 30 years, the compound result is $17,449 vs simple interest's $4,000.

## The compound interest formula

A = P × (1 + r/n)^(n×t)

Where:
- A = future value
- P = principal (starting amount)
- r = annual interest rate as a decimal (5% = 0.05)
- n = number of compounding periods per year
- t = time in years

## The effect of compounding frequency

The more frequently interest compounds, the more you earn — but the difference between monthly and daily compounding is small. At 10% annual rate on $10,000 for 10 years:
- Annual compounding: $25,937
- Monthly compounding: $27,070
- Daily compounding: $27,179

The jump from annual to monthly compounding is significant; from monthly to daily is modest.

## The Rule of 72

A quick way to estimate how long it takes money to double: divide 72 by the annual interest rate. At 6%, money doubles in approximately 72/6 = 12 years. At 9%, it takes 8 years. This approximation is surprisingly accurate for rates between 2% and 20%.

## Real-world applications

**Savings accounts and CDs**: Most banks compound interest monthly or daily. A savings account at 4.5% APY with monthly compounding on $10,000 grows to $10,450 after one year.

**Retirement accounts**: The long time horizons of retirement investing amplify compounding dramatically. Starting at 25 versus 35 with the same contributions and returns can result in a retirement fund 2-3 times larger simply because of the extra decade of compounding.

**Debt**: Compound interest also works against you with debt. Credit cards typically charge 15-30% APR compounded daily. A $5,000 balance paid only the minimum can grow to $8,000-10,000 before it is paid off.

**Mortgages**: Mortgages use compound interest calculated monthly. The early payments in a 30-year mortgage are mostly interest because the principal is large; as principal decreases, more of each payment goes to principal.

## Private and instant

All calculations run in your browser. No data is sent anywhere.
`,
`## Veja seu investimento crescer com juros compostos

Os juros compostos são uma das forças mais poderosas nas finanças pessoais. Esta calculadora mostra exatamente como qualquer valor inicial cresce ao longo do tempo a uma determinada taxa de juros, com a frequência de capitalização de sua escolha.

## O que são juros compostos?

Com juros simples, você ganha uma quantia fixa de juros a cada período calculada apenas sobre o capital original. Com juros compostos, você ganha juros sobre o capital mais todos os juros acumulados anteriormente. Isso faz os saldos crescerem exponencialmente em vez de linearmente.

Exemplo: Invista R$ 1.000 a 10% de juros anuais.
- Juros simples após 10 anos: R$ 2.000
- Juros compostos (anual) após 10 anos: R$ 1.000 × 1,10^10 = R$ 2.593,74

## A fórmula de juros compostos

A = P × (1 + r/n)^(n×t)

Onde P é o capital, r é a taxa anual em decimal, n é a frequência de capitalização e t são os anos.

## A Regra dos 72

Uma forma rápida de estimar quanto tempo leva para o dinheiro dobrar: divida 72 pela taxa de juros anual. A 6%, o dinheiro dobra em aproximadamente 12 anos.

## Aplicações no mundo real

**Contas poupança**: A maioria dos bancos capitaliza juros mensalmente ou diariamente.

**Contas de aposentadoria**: Os longos horizontes de tempo do investimento para aposentadoria amplificam dramaticamente a capitalização.

**Dívida**: Os juros compostos também trabalham contra você com dívidas. Cartões de crédito tipicamente cobram 15-30% ao ano capitalizado diariamente.

## Privado e instantâneo

Todos os cálculos rodam no seu navegador. Nenhum dado é enviado a lugar nenhum.
`),

tool('loancalc','finance','🏦','loancalc.js',
`<form id="loan-form"><div class="row"><div class="field"><label for="loan-amt">{{ui.amount}}</label><input type="number" id="loan-amt" step="any" min="0" inputmode="decimal"></div><div class="field"><label for="loan-rate">{{ui.rate}}</label><input type="number" id="loan-rate" step="any" min="0" inputmode="decimal"></div><div class="field"><label for="loan-years">{{ui.term}}</label><input type="number" id="loan-years" step="1" min="1" inputmode="numeric"></div></div><div class="result"><span class="hint">{{ui.monthly}}: </span><span class="big" id="loan-monthly">—</span></div><div id="loan-detail" style="opacity:0.7;font-size:0.9rem;margin-top:0.5rem"></div></form>`,
{title:'Loan Calculator — monthly payment and total interest',metaDescription:'Free loan calculator. Enter the loan amount, interest rate, and term to see your monthly payment and total interest paid. Works for mortgages, car loans, and personal loans.',h1:'Loan Calculator',intro:'Enter the loan amount, annual interest rate, and term in years to calculate your monthly payment.',faq_title:'Loan calculator FAQ',ui:{amount:'Loan amount',rate:'Annual interest rate %',term:'Term (years)',monthly:'Monthly payment',total_paid:'Total paid',total_interest:'Total interest'},faq:[{q:'What formula is used?',a:'Monthly payment = P × [r(1+r)^n] / [(1+r)^n - 1], where P is the loan amount, r is the monthly interest rate (annual / 12), and n is the number of months.'},{q:'What types of loans can I calculate?',a:'The formula applies to any standard amortising loan: mortgages, car loans, personal loans, student loans. For interest-only or balloon loans the formula differs.'},{q:'Does this include fees or insurance?',a:'No, this calculates only the principal and interest payment. Your actual monthly payment may be higher if it includes property tax, insurance, or other fees.'}]},
{title:'Calculadora de Empréstimo — parcela mensal e juros totais',metaDescription:'Calculadora de empréstimo gratuita. Informe o valor do empréstimo, taxa de juros e prazo para ver sua parcela mensal e total de juros pagos.',h1:'Calculadora de Empréstimo',intro:'Informe o valor do empréstimo, taxa de juros anual e prazo em anos para calcular sua parcela mensal.',faq_title:'Perguntas frequentes da calculadora de empréstimo',ui:{amount:'Valor do empréstimo',rate:'Taxa de juros anual %',term:'Prazo (anos)',monthly:'Parcela mensal',total_paid:'Total pago',total_interest:'Juros totais'},faq:[{q:'Que fórmula é usada?',a:'Parcela mensal = P × [r(1+r)^n] / [(1+r)^n - 1], onde P é o valor do empréstimo, r é a taxa mensal (anual / 12) e n é o número de meses.'},{q:'Que tipos de empréstimos posso calcular?',a:'A fórmula se aplica a qualquer empréstimo de amortização padrão: hipotecas, empréstimos para carros, empréstimos pessoais, empréstimos estudantis.'},{q:'Isso inclui taxas ou seguro?',a:'Não, isso calcula apenas o pagamento de principal e juros. Seu pagamento mensal real pode ser maior se incluir imposto sobre propriedade, seguro ou outras taxas.'}]},
`(function(){
  'use strict';
  var lang=document.documentElement.lang||'en';
  var money=function(n){return n.toLocaleString(lang,{minimumFractionDigits:2,maximumFractionDigits:2});};
  function calc(){
    var P=parseFloat(document.getElementById('loan-amt').value);
    var r=parseFloat(document.getElementById('loan-rate').value)/(100*12);
    var n=parseFloat(document.getElementById('loan-years').value)*12;
    var out=document.getElementById('loan-monthly');
    var det=document.getElementById('loan-detail');
    if([P,r,n].some(isNaN)||P<=0||n<=0){if(out)out.textContent='—';return;}
    var m=r===0?P/n:P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);
    var total=m*n;
    var interest=total-P;
    if(out)out.textContent=money(m);
    if(det)det.textContent='Total paid: '+money(total)+' · Total interest: '+money(interest);
  }
  document.querySelectorAll('#loan-amt,#loan-rate,#loan-years').forEach(function(el){el.addEventListener('input',calc);});
  calc();
})();`,
`## Calculate your loan payment before you borrow

Before taking out any loan — a mortgage, car loan, personal loan, or student loan — knowing the monthly payment and total interest cost helps you make an informed decision. This calculator uses the standard amortisation formula to show you exactly what you will pay each month and how much the loan will cost in total.

## The loan payment formula

The monthly payment for a standard amortising loan is calculated using the formula:

M = P × [r(1+r)^n] / [(1+r)^n − 1]

Where:
- M = monthly payment
- P = principal (loan amount)
- r = monthly interest rate (annual rate ÷ 12, expressed as decimal)
- n = total number of monthly payments (years × 12)

This formula is called the amortisation formula and produces a fixed payment that covers both interest and principal over the loan term.

## How amortisation works

With each monthly payment, a portion goes to interest and a portion reduces the principal. Early in the loan term, most of the payment is interest because the outstanding balance is large. As the balance decreases, the interest portion shrinks and the principal portion grows. By the final payment, almost all of it is principal.

For a $300,000 mortgage at 7% for 30 years:
- Monthly payment: approximately $1,995
- Total paid over 30 years: $718,200
- Total interest paid: $418,200 — more than the original loan amount

This illustrates why long loan terms cost so much more in interest. A 15-year mortgage at the same rate has a higher monthly payment but saves dramatically in total interest.

## Effect of interest rate

Interest rate has a large impact on payment and cost. On a $200,000 loan over 30 years:
- At 4%: $955/month, $143,739 total interest
- At 6%: $1,199/month, $231,676 total interest
- At 8%: $1,468/month, $328,310 total interest

A 2 percentage point increase roughly doubles the interest cost over a 30-year term.

## Types of loans

This calculator works for any standard amortising loan:

**Mortgages**: Home loans typically run 15 or 30 years in the US, 25-35 years in the UK and Canada. Fixed-rate mortgages have the same payment throughout the term; adjustable-rate mortgages change with an index.

**Auto loans**: Typically 48-84 months (4-7 years). Shorter terms mean higher payments but less total interest.

**Personal loans**: Usually 1-7 years. Rates vary widely based on creditworthiness, from 5% for excellent credit to 30%+ for poor credit.

**Student loans**: US federal student loans currently carry fixed rates of 5-8%, with income-based repayment options.

## Using the calculator for planning

You can use this calculator in multiple ways:
- Enter what you expect to borrow to see what the payment will be.
- Work backwards: if you can afford $X per month, try different loan amounts and rates to see the maximum you can borrow.
- Compare total interest at different term lengths to make a more informed decision about loan duration.

## Private and instant

All calculations run in your browser. No data is sent anywhere.
`,
`## Calcule sua parcela de empréstimo antes de tomar emprestado

Antes de fazer qualquer empréstimo — hipoteca, empréstimo para carro, empréstimo pessoal ou empréstimo estudantil — saber a parcela mensal e o custo total de juros ajuda a tomar uma decisão informada.

## A fórmula de pagamento do empréstimo

M = P × [r(1+r)^n] / [(1+r)^n − 1]

Onde M é a parcela mensal, P é o principal, r é a taxa mensal e n é o total de pagamentos mensais.

## Como a amortização funciona

Com cada pagamento mensal, uma parte vai para juros e outra parte reduz o principal. No início do empréstimo, a maior parte do pagamento é juros porque o saldo devedor é grande. À medida que o saldo diminui, a parte dos juros encolhe e a parte do principal cresce.

## Efeito da taxa de juros

A taxa de juros tem um grande impacto no pagamento e no custo. Em um empréstimo de R$ 200.000 por 30 anos, uma diferença de 2 pontos percentuais pode praticamente dobrar o custo total de juros.

## Privado e instantâneo

Todos os cálculos rodam no seu navegador. Nenhum dado é enviado a lugar nenhum.
`),

// HEALTH
tool('bmrcalc','health','🔥','bmrcalc.js',
`<form id="bmr-form"><div class="row"><div class="field"><label for="bmr-weight">{{ui.weight}}</label><input type="number" id="bmr-weight" step="any" min="0" inputmode="decimal"></div><div class="field"><label for="bmr-wunit">{{ui.wunit}}</label><select id="bmr-wunit"><option value="kg">kg</option><option value="lb">lb</option></select></div><div class="field"><label for="bmr-height">{{ui.height}}</label><input type="number" id="bmr-height" step="any" min="0" inputmode="decimal"></div><div class="field"><label for="bmr-hunit">{{ui.hunit}}</label><select id="bmr-hunit"><option value="cm">cm</option><option value="in">in</option></select></div><div class="field"><label for="bmr-age">{{ui.age}}</label><input type="number" id="bmr-age" step="1" min="1" max="120" inputmode="numeric"></div><div class="field"><label for="bmr-sex">{{ui.sex}}</label><select id="bmr-sex"><option value="m">{{ui.male}}</option><option value="f">{{ui.female}}</option></select></div></div><div class="result"><span class="hint">{{ui.bmr}}: </span><span class="big" id="bmr-out">—</span></div></form>`,
{title:'BMR Calculator — Basal Metabolic Rate calories per day',metaDescription:'Free BMR calculator. Calculate your Basal Metabolic Rate — the calories your body burns at rest per day. Uses the Mifflin-St Jeor equation.',h1:'BMR Calculator',intro:'Enter your weight, height, age, and sex to calculate your Basal Metabolic Rate.',faq_title:'BMR FAQ',ui:{weight:'Weight',wunit:'Unit',height:'Height',hunit:'Unit',age:'Age',sex:'Sex',male:'Male',female:'Female',bmr:'BMR (calories/day)'},faq:[{q:'What is BMR?',a:'Basal Metabolic Rate is the number of calories your body burns at complete rest to maintain basic functions: breathing, circulation, cell production, and temperature regulation.'},{q:'Which formula is used?',a:'The Mifflin-St Jeor equation, the most accurate formula for most adults. For men: BMR = 10×weight(kg) + 6.25×height(cm) − 5×age + 5. For women: same but −161 instead of +5.'},{q:'How do I use BMR for weight management?',a:'Multiply your BMR by an activity factor to get your Total Daily Energy Expenditure (TDEE). Eat fewer calories than your TDEE to lose weight, more to gain.'}]},
{title:'Calculadora de TMB — Taxa Metabólica Basal em calorias por dia',metaDescription:'Calculadora de TMB gratuita. Calcule sua Taxa Metabólica Basal — as calorias que seu corpo queima em repouso por dia. Usa a equação de Mifflin-St Jeor.',h1:'Calculadora de TMB',intro:'Informe seu peso, altura, idade e sexo para calcular sua Taxa Metabólica Basal.',faq_title:'Perguntas frequentes da TMB',ui:{weight:'Peso',wunit:'Unidade',height:'Altura',hunit:'Unidade',age:'Idade',sex:'Sexo',male:'Masculino',female:'Feminino',bmr:'TMB (calorias/dia)'},faq:[{q:'O que é a TMB?',a:'A Taxa Metabólica Basal é o número de calorias que seu corpo queima em repouso completo para manter funções básicas: respiração, circulação, produção celular e regulação da temperatura.'},{q:'Qual fórmula é usada?',a:'A equação de Mifflin-St Jeor, a fórmula mais precisa para a maioria dos adultos. Para homens: TMB = 10×peso(kg) + 6,25×altura(cm) − 5×idade + 5. Para mulheres: mesmo mas −161 em vez de +5.'},{q:'Como uso a TMB para gestão de peso?',a:'Multiplique sua TMB por um fator de atividade para obter seu Gasto Energético Total Diário (GET). Coma menos calorias que seu GET para perder peso, mais para ganhar.'}]},
`(function(){
  'use strict';
  function calc(){
    var w=parseFloat(document.getElementById('bmr-weight').value);
    var wu=document.getElementById('bmr-wunit').value;
    var h=parseFloat(document.getElementById('bmr-height').value);
    var hu=document.getElementById('bmr-hunit').value;
    var age=parseFloat(document.getElementById('bmr-age').value);
    var sex=document.getElementById('bmr-sex').value;
    var out=document.getElementById('bmr-out');
    if([w,h,age].some(isNaN)){if(out)out.textContent='—';return;}
    var kg=wu==='lb'?w*0.453592:w;
    var cm=hu==='in'?h*2.54:h;
    var bmr=10*kg+6.25*cm-5*age+(sex==='m'?5:-161);
    if(out)out.textContent=Math.round(bmr).toLocaleString()+' kcal/day';
  }
  document.querySelectorAll('#bmr-weight,#bmr-wunit,#bmr-height,#bmr-hunit,#bmr-age,#bmr-sex').forEach(function(el){el.addEventListener('input',calc);el.addEventListener('change',calc);});
  calc();
})();`,
`## Calculate how many calories you burn at rest

Your Basal Metabolic Rate (BMR) is the number of calories your body needs to sustain basic life functions while at complete rest — breathing, keeping your heart beating, maintaining body temperature, cell repair and production. It represents the minimum energy your body would need if you lay still all day, and it is the foundation of any calorie-based diet or fitness plan.

## The Mifflin-St Jeor equation

This calculator uses the Mifflin-St Jeor equation, published in 1990 and considered the most accurate predictive BMR formula for most people. It has largely replaced the older Harris-Benedict equation in clinical settings.

**For men**: BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age + 5
**For women**: BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age − 161

The difference between the male and female equations reflects the average difference in lean body mass (muscle) between sexes, as muscle tissue requires more energy to maintain than fat tissue.

## From BMR to daily calorie needs

BMR is just the starting point. Your actual daily calorie needs depend on your activity level. Multiply your BMR by your activity factor to get your Total Daily Energy Expenditure (TDEE):

- **Sedentary** (desk job, little exercise): BMR × 1.2
- **Lightly active** (light exercise 1-3 days/week): BMR × 1.375
- **Moderately active** (exercise 3-5 days/week): BMR × 1.55
- **Very active** (hard exercise 6-7 days/week): BMR × 1.725
- **Extremely active** (physical job + hard training): BMR × 1.9

A 35-year-old woman, 165 cm, 65 kg has a BMR of approximately 1,414 kcal. If she exercises 3-5 days per week, her TDEE is about 1,414 × 1.55 = 2,192 kcal.

## Using BMR for weight management

To lose weight: eat fewer calories than your TDEE. A deficit of 500 kcal/day creates approximately 0.5 kg (1 lb) of weekly weight loss.

To gain weight: eat more calories than your TDEE. A surplus of 250-500 kcal/day supports muscle building without excessive fat gain.

To maintain weight: match your intake to your TDEE.

## Factors affecting BMR

**Muscle mass**: Muscle tissue is metabolically active — it burns calories even at rest. People with more muscle have higher BMRs. This is why resistance training increases BMR over time.

**Age**: BMR decreases by roughly 1-2% per decade after age 20 due to gradual loss of muscle mass (sarcopenia) and other metabolic changes.

**Sex**: Men typically have higher BMRs than women of the same age, height, and weight, primarily due to greater average muscle mass.

**Hormones**: Thyroid hormones regulate metabolic rate. Hypothyroidism (underactive thyroid) lowers BMR; hyperthyroidism raises it.

**Body composition**: Fat tissue requires less energy than muscle. Two people of the same weight but different body compositions have different BMRs.

## Limitations

BMR formulas are population averages and may not be perfectly accurate for any individual. Actual BMR can be measured precisely only in a clinical setting using indirect calorimetry. Use this calculation as a guide rather than an absolute value, and adjust your calorie targets based on real-world results over 2-4 weeks.

## Private and instant

All calculations run in your browser. No data is sent anywhere.
`,
`## Calcule quantas calorias você queima em repouso

Sua Taxa Metabólica Basal (TMB) é o número de calorias que seu corpo precisa para sustentar funções básicas de vida em repouso completo — respiração, manter seu coração batendo, manter a temperatura corporal, reparo e produção celular.

## A equação de Mifflin-St Jeor

Esta calculadora usa a equação de Mifflin-St Jeor, publicada em 1990 e considerada a fórmula preditiva de TMB mais precisa para a maioria das pessoas.

**Para homens**: TMB = 10 × peso(kg) + 6,25 × altura(cm) − 5 × idade + 5
**Para mulheres**: TMB = 10 × peso(kg) + 6,25 × altura(cm) − 5 × idade − 161

## Da TMB às necessidades calóricas diárias

Multiplique sua TMB pelo seu fator de atividade para obter seu Gasto Energético Total Diário (GET):

- **Sedentário**: TMB × 1,2
- **Levemente ativo**: TMB × 1,375
- **Moderadamente ativo**: TMB × 1,55
- **Muito ativo**: TMB × 1,725

## Usando a TMB para gestão de peso

Para perder peso: coma menos calorias que seu GET. Um déficit de 500 kcal/dia cria aproximadamente 0,5 kg de perda de peso semanal.

## Fatores que afetam a TMB

**Massa muscular**: O tecido muscular queima calorias mesmo em repouso.

**Idade**: A TMB diminui cerca de 1-2% por década após os 20 anos devido à perda gradual de massa muscular.

**Sexo**: Homens tipicamente têm TMBs maiores que mulheres da mesma idade, altura e peso.

## Privado e instantâneo

Todos os cálculos rodam no seu navegador. Nenhum dado é enviado a lugar nenhum.
`),

// HOME
tool('paintcalc','home','🎨','paintcalc.js',
`<form id="paint-form"><div class="row"><div class="field"><label for="paint-w">{{ui.width}}</label><input type="number" id="paint-w" step="any" min="0" inputmode="decimal"></div><div class="field"><label for="paint-h">{{ui.height}}</label><input type="number" id="paint-h" step="any" min="0" inputmode="decimal"></div><div class="field"><label for="paint-unit">{{ui.unit}}</label><select id="paint-unit"><option value="m">m</option><option value="ft">ft</option></select></div><div class="field"><label for="paint-walls">{{ui.walls}}</label><input type="number" id="paint-walls" step="1" min="1" value="1" inputmode="numeric"></div><div class="field"><label for="paint-coats">{{ui.coats}}</label><input type="number" id="paint-coats" step="1" min="1" value="2" inputmode="numeric"></div><div class="field"><label for="paint-cov">{{ui.coverage}}</label><input type="number" id="paint-cov" step="any" min="0" value="10" inputmode="decimal"></div></div><div class="result"><span class="hint">{{ui.result}}: </span><span class="big" id="paint-out">—</span></div></form>`,
{title:'Paint Calculator — how much paint do you need?',metaDescription:'Free paint calculator. Enter your wall dimensions, number of coats, and paint coverage to calculate exactly how many litres of paint you need.',h1:'Paint Calculator',intro:'Enter wall dimensions, number of walls, coats, and paint coverage rate to see how much paint you need.',faq_title:'Paint calculator FAQ',ui:{width:'Width',height:'Height',unit:'Unit',walls:'Number of walls',coats:'Coats',coverage:'Coverage (m²/litre)',result:'Paint needed'},faq:[{q:'What coverage rate should I use?',a:'Most standard interior wall paint covers 10–12 m² per litre for the first coat. Premium paints may cover more. Check the paint tin for the manufacturer\'s stated coverage.'},{q:'Should I add extra for wastage?',a:'Yes. Add 10–15% for offcuts, spills, and touch-ups. The calculator gives the theoretical minimum; real use is always slightly more.'},{q:'What about doors and windows?',a:'Subtract the area of doors and windows from the total wall area before entering it, or simply use the result as a slight over-estimate which provides useful buffer.'}]},
{title:'Calculadora de Tinta — quanta tinta você precisa?',metaDescription:'Calculadora de tinta gratuita. Informe as dimensões da parede, número de demãos e cobertura da tinta para calcular exatamente quantos litros de tinta você precisa.',h1:'Calculadora de Tinta',intro:'Informe as dimensões da parede, número de paredes, demãos e taxa de cobertura para ver quanta tinta você precisa.',faq_title:'Perguntas frequentes da calculadora de tinta',ui:{width:'Largura',height:'Altura',unit:'Unidade',walls:'Número de paredes',coats:'Demãos',coverage:'Cobertura (m²/litro)',result:'Tinta necessária'},faq:[{q:'Que taxa de cobertura devo usar?',a:'A maioria das tintas internas padrão cobre 10–12 m² por litro para a primeira demão. Tintas premium podem cobrir mais. Verifique a lata de tinta para a cobertura declarada pelo fabricante.'},{q:'Devo adicionar extra para desperdício?',a:'Sim. Adicione 10–15% para retalhos, derramamentos e retoques. A calculadora dá o mínimo teórico; o uso real é sempre um pouco mais.'},{q:'E as portas e janelas?',a:'Subtraia a área das portas e janelas da área total da parede antes de informá-la, ou simplesmente use o resultado como uma leve superestimativa.'}]},
`(function(){
  'use strict';
  function calc(){
    var w=parseFloat(document.getElementById('paint-w').value);
    var h=parseFloat(document.getElementById('paint-h').value);
    var unit=document.getElementById('paint-unit').value;
    var walls=parseInt(document.getElementById('paint-walls').value,10)||1;
    var coats=parseInt(document.getElementById('paint-coats').value,10)||2;
    var cov=parseFloat(document.getElementById('paint-cov').value)||10;
    var out=document.getElementById('paint-out');
    if([w,h].some(isNaN)){if(out)out.textContent='—';return;}
    var area=w*h*(unit==='ft'?0.0929:1)*walls;
    var litres=area*coats/cov;
    if(out)out.textContent=litres.toFixed(1)+' L ('+Math.ceil(litres)+' L rounded up)';
  }
  document.querySelectorAll('#paint-w,#paint-h,#paint-unit,#paint-walls,#paint-coats,#paint-cov').forEach(function(el){el.addEventListener('input',calc);el.addEventListener('change',calc);});
  calc();
})();`,
`## Calculate exactly how much paint you need

Buying too little paint means a frustrating mid-project trip to the hardware store, and there is no guarantee the new batch will match perfectly in colour. Buying too much wastes money and creates disposal problems. This paint calculator gives you the right amount to buy for any painting project by taking into account wall size, number of coats, and your paint's coverage rate.

## How the calculation works

The formula is straightforward: total area = width × height × number of walls. Total paint needed = total area × number of coats ÷ coverage rate per litre. A standard interior paint covers about 10–12 m² per litre per coat. Most rooms need two coats for a professional-looking finish.

Example: A room with 4 walls, each 4 metres wide and 2.5 metres high, needing 2 coats of paint covering 10 m² per litre:
- Total area = 4 × (4 × 2.5) = 40 m²
- Paint needed = 40 × 2 ÷ 10 = 8 litres

## Coverage rates by paint type

Coverage varies significantly by paint type and quality:
- **Budget interior emulsion**: 8–10 m² per litre
- **Standard interior emulsion**: 10–12 m² per litre
- **Premium interior emulsion**: 12–14 m² per litre
- **Exterior paint**: 8–12 m² per litre (lower due to surfaces being less smooth)
- **Undercoat/primer**: 10–12 m² per litre
- **Gloss/satinwood (woodwork)**: 16–20 m² per litre (smooth surface absorbs less)

Always check the manufacturer's stated coverage on the paint tin, as this is the most reliable figure for that specific product.

## Number of coats

For most wall painting projects, two coats give the best result. One coat may not provide full, even coverage — you may see the original colour or primer through thin spots. Three coats are sometimes needed when going from a very dark colour to a very light one, or when applying a red or yellow (colours with notoriously low opacity).

Ceilings typically need one coat with ceiling paint (which is formulated for high coverage and drip resistance) or two coats for a very fresh, bright appearance.

## Accounting for doors, windows, and waste

The calculator computes the gross wall area without subtracting openings. For planning purposes, it is usually acceptable to use the gross area and treat the extra paint as buffer for:
- Openings (doors and windows) that will not be painted with wall paint
- Waste from loading the roller or brush
- Spills and drips
- Touch-up work

If you want a more precise calculation, measure your door and window areas and subtract them before entering the wall dimensions.

## Choosing paint quantities

Paint is typically sold in 1-litre, 2.5-litre, 5-litre, and 10-litre tins. Always round up to the next available tin size. For example, if the calculation shows 8.2 litres, buy two 5-litre tins (10 litres total) rather than a 5-litre tin and four 1-litre tins, which is more expensive per litre. Leftover paint can be stored for touch-ups if sealed properly.

## Private and instant

All calculations run in your browser. No data is sent anywhere.
`,
`## Calcule exatamente quanta tinta você precisa

Comprar pouca tinta significa uma frustrante viagem à loja de materiais de construção no meio do projeto, e não há garantia de que o novo lote corresponderá perfeitamente em cor. Comprar demais desperdiça dinheiro e cria problemas de descarte.

## Como o cálculo funciona

A fórmula é direta: área total = largura × altura × número de paredes. Tinta necessária = área total × número de demãos ÷ taxa de cobertura por litro. Uma tinta interior padrão cobre cerca de 10–12 m² por litro por demão. A maioria dos cômodos precisa de duas demãos para um acabamento profissional.

## Taxas de cobertura por tipo de tinta

- **Tinta látex padrão**: 10–12 m² por litro
- **Tinta premium**: 12–14 m² por litro
- **Tinta externa**: 8–12 m² por litro
- **Esmalte/verniz (madeira)**: 16–20 m² por litro

Sempre verifique a cobertura declarada pelo fabricante na lata de tinta.

## Número de demãos

Para a maioria dos projetos de pintura de parede, duas demãos dão o melhor resultado. Três demãos às vezes são necessárias ao ir de uma cor muito escura para uma muito clara.

## Privado e instantâneo

Todos os cálculos rodam no seu navegador. Nenhum dado é enviado a lugar nenhum.
`),

// TEXT / SOCIAL
tool('syllablecount','text','📝','syllablecount.js',
`<div id="syl-app"><textarea id="syl-text" rows="4" style="width:100%;box-sizing:border-box;padding:0.75rem;border-radius:0.5rem;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.05);color:inherit;font-size:1rem" placeholder="{{ui.placeholder}}"></textarea><div style="display:flex;gap:1.5rem;flex-wrap:wrap;margin-top:0.75rem"><div><div class="hint">{{ui.syllables}}</div><div class="big" id="syl-count">0</div></div><div><div class="hint">{{ui.words}}</div><div class="big" id="syl-words">0</div></div></div></div>`,
{title:'Syllable Counter — count syllables in any word or text',metaDescription:'Free syllable counter. Count the number of syllables in any English word or text instantly. Useful for poetry, song lyrics, and haiku writing.',h1:'Syllable Counter',intro:'Type or paste text to count syllables and words. Useful for haiku, sonnets, song lyrics, and meter checking.',faq_title:'Syllable counter FAQ',ui:{placeholder:'Type or paste English text here…',syllables:'Syllables',words:'Words'},faq:[{q:'How does the syllable count work?',a:'The tool estimates syllables using common English phonetic rules: counting vowel groups, applying exceptions for silent-e and common suffixes. It is an estimate and may differ slightly from a dictionary for unusual words.'},{q:'What is a syllable?',a:'A syllable is a unit of pronunciation containing a single vowel sound. The word "cat" has one syllable; "water" has two (wa-ter); "education" has five (ed-u-ca-tion).'},{q:'Is this good for haiku?',a:'Yes. A traditional haiku has 5-7-5 syllables across three lines. Write each line separately and check the count.'}]},
{title:'Contador de Sílabas — conte sílabas em qualquer palavra ou texto',metaDescription:'Contador de sílabas gratuito. Conte o número de sílabas em qualquer palavra ou texto em inglês na hora. Útil para poesia, letras de música e haiku.',h1:'Contador de Sílabas',intro:'Digite ou cole texto para contar sílabas e palavras. Útil para haiku, sonetos, letras de música e verificação de métrica.',faq_title:'Perguntas frequentes do contador de sílabas',ui:{placeholder:'Digite ou cole texto em inglês aqui…',syllables:'Sílabas',words:'Palavras'},faq:[{q:'Como funciona a contagem de sílabas?',a:'A ferramenta estima sílabas usando regras fonéticas comuns do inglês: contando grupos de vogais, aplicando exceções para e-mudo e sufixos comuns. É uma estimativa e pode diferir ligeiramente de um dicionário para palavras incomuns.'},{q:'O que é uma sílaba?',a:'Uma sílaba é uma unidade de pronúncia contendo um único som vocálico. A palavra "cat" tem uma sílaba; "water" tem duas (wa-ter); "education" tem cinco.'},{q:'É bom para haiku?',a:'Sim. Um haiku tradicional tem 5-7-5 sílabas em três linhas. Escreva cada linha separadamente e verifique a contagem.'}]},
`(function(){
  'use strict';
  function syllables(word){
    word=word.toLowerCase().replace(/[^a-z]/g,'');
    if(!word)return 0;
    word=word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/,'');
    word=word.replace(/^y/,'');
    var m=word.match(/[aeiouy]{1,2}/g);
    return m?m.length:1;
  }
  var ta=document.getElementById('syl-text');
  var sc=document.getElementById('syl-count');
  var sw=document.getElementById('syl-words');
  if(!ta)return;
  function calc(){
    var words=(ta.value.trim().match(/\b[a-zA-Z']+\b/g)||[]);
    var total=words.reduce(function(s,w){return s+syllables(w);},0);
    if(sc)sc.textContent=total;
    if(sw)sw.textContent=words.length;
  }
  ta.addEventListener('input',calc);calc();
})();`,
`## Count syllables in any text

Syllable counting is essential for anyone working with metered verse, song lyrics, or any form of writing where rhythm matters. Haiku requires exactly 5-7-5 syllables across three lines. Sonnets follow specific metre patterns. Song lyrics fit syllables to musical beats. This tool estimates the syllable count for any English text instantly, so you can focus on the words rather than the counting.

## What is a syllable?

A syllable is a unit of pronunciation organized around a single vowel sound. Every word can be broken into syllables:
- "cat" → 1 syllable (cat)
- "water" → 2 syllables (wa-ter)
- "beautiful" → 3 syllables (beau-ti-ful)
- "education" → 5 syllables (ed-u-ca-tion)
- "unimaginable" → 6 syllables (un-i-mag-i-na-ble)

The number of syllables in a word depends on the number of distinct vowel sounds — not the number of vowel letters. The word "bake" has two vowel letters (a and e) but only one vowel sound, making it one syllable.

## How the counter works

The tool uses common English phonetic rules to estimate syllables:
1. Count groups of adjacent vowels (each group is approximately one syllable)
2. Subtract for silent-e at the end of words (e.g., "cake" is 1 syllable, not 2)
3. Subtract for common suffixes like "-ed" that are often silent
4. Ensure at least one syllable per word

This method is a good approximation for most common English words. Some irregular words and proper nouns may be counted slightly differently from their dictionary pronunciation.

## Uses in creative writing

**Haiku**: A Japanese poetic form traditionally imported into English as a three-line poem with 5-7-5 syllables. The haiku form requires careful syllable counting; this tool makes it easy to verify each line.

**Iambic pentameter**: Shakespeare's preferred metre has 10 syllables per line in an unstressed-stressed pattern (da-DUM repeated five times). Counting syllables is the first step to checking whether a line fits the metre.

**Song lyrics**: Each syllable maps to a beat or note. Lyricists count syllables to ensure words fit the melody. A verse that sings well has syllables distributed evenly across musical beats.

**Limericks**: The AABBA rhyme scheme has lines of 8-8-5-5-8 syllables in the traditional form.

**Raps and hip-hop**: Flow in rap is largely about syllable density and pattern. Many rappers deliberately pack more syllables into a bar for an effect called multisyllabic rhyming or double-time.

## Checking meter in poetry

Classical English metre divides syllables into stressed (/) and unstressed (u). The most common patterns are:
- **Iambic**: uU (unstressed-stressed), as in "to BE, or NOT to BE"
- **Trochaic**: Uu (stressed-unstressed), as in "TI-ger, TI-ger, BURN-ing BRIGHT"
- **Dactylic**: Uuu (stressed-unstressed-unstressed)
- **Anapestic**: uuU (unstressed-unstressed-stressed)

Counting syllables is the essential prerequisite to analyzing any of these patterns.

## Private and instant

The counter runs in your browser. No text you type is sent anywhere.
`,
`## Conte sílabas em qualquer texto

A contagem de sílabas é essencial para qualquer pessoa que trabalhe com verso metrificado, letras de música ou qualquer forma de escrita onde o ritmo importa. Haiku requer exatamente 5-7-5 sílabas em três linhas. Sonetos seguem padrões métricos específicos. Letras de música encaixam sílabas em batidas musicais.

## O que é uma sílaba?

Uma sílaba é uma unidade de pronúncia organizada em torno de um único som vocálico:
- "gato" → 2 sílabas (ga-to)
- "beleza" → 3 sílabas (be-le-za)
- "educação" → 5 sílabas (e-du-ca-ção)

## Usos na escrita criativa

**Haiku**: Uma forma poética japonesa de três linhas com 5-7-5 sílabas.

**Letras de música**: Cada sílaba mapeia para uma batida ou nota. Letristas contam sílabas para garantir que as palavras encaixem na melodia.

**Rap e hip-hop**: O flow no rap é em grande parte sobre densidade e padrão de sílabas.

## Privado e instantâneo

O contador roda no seu navegador. Nenhum texto que você digita é enviado a lugar nenhum.
`),

tool('utmbuilder','social','🔗','utmbuilder.js',
`<div id="utm-app"><div class="row"><div class="field"><label for="utm-url">{{ui.url}}</label><input type="url" id="utm-url" placeholder="https://example.com/page"></div></div><div class="row"><div class="field"><label for="utm-source">{{ui.source}}</label><input type="text" id="utm-source" placeholder="{{ui.eg_source}}"></div><div class="field"><label for="utm-medium">{{ui.medium}}</label><input type="text" id="utm-medium" placeholder="{{ui.eg_medium}}"></div><div class="field"><label for="utm-campaign">{{ui.campaign}}</label><input type="text" id="utm-campaign" placeholder="{{ui.eg_campaign}}"></div></div><div class="row"><div class="field"><label for="utm-term">{{ui.term}} ({{ui.optional}})</label><input type="text" id="utm-term" placeholder="{{ui.eg_term}}"></div><div class="field"><label for="utm-content">{{ui.content}} ({{ui.optional}})</label><input type="text" id="utm-content" placeholder="{{ui.eg_content}}"></div></div><div id="utm-out" style="margin-top:1rem;word-break:break-all;font-size:0.9rem;padding:0.75rem;border-radius:0.5rem;background:rgba(255,255,255,0.05);min-height:3rem"></div><button id="utm-copy" class="btn secondary" style="margin-top:0.5rem">{{ui.copy}}</button></div>`,
{title:'UTM Builder — create trackable campaign URLs',metaDescription:'Free UTM builder. Create UTM-tagged URLs for Google Analytics and other analytics platforms. Track traffic from email, social media, and paid campaigns.',h1:'UTM Link Builder',intro:'Fill in the URL and campaign parameters to generate a trackable UTM link.',faq_title:'UTM builder FAQ',ui:{url:'Website URL',source:'UTM Source',medium:'UTM Medium',campaign:'UTM Campaign',term:'UTM Term',content:'UTM Content',optional:'optional',eg_source:'newsletter',eg_medium:'email',eg_campaign:'summer_sale',eg_term:'running+shoes',eg_content:'cta_button',copy:'Copy link'},faq:[{q:'What are UTM parameters?',a:'UTM (Urchin Tracking Module) parameters are tags added to a URL that tell analytics platforms like Google Analytics where traffic came from, which medium was used, and which campaign drove it.'},{q:'Which parameters are required?',a:'Source, Medium, and Campaign are the three required parameters. Term (used for paid search keyword) and Content (used for A/B testing) are optional.'},{q:'Are UTM parameters case-sensitive?',a:'Yes. "Email" and "email" are tracked as separate sources. Use consistent lowercase naming conventions across all your campaigns.'}]},
{title:'Construtor de UTM — crie URLs de campanha rastreáveis',metaDescription:'Construtor de UTM gratuito. Crie URLs com tags UTM para Google Analytics e outras plataformas. Rastreie tráfego de e-mail, redes sociais e campanhas pagas.',h1:'Construtor de Link UTM',intro:'Preencha a URL e os parâmetros de campanha para gerar um link UTM rastreável.',faq_title:'Perguntas frequentes do construtor de UTM',ui:{url:'URL do site',source:'Fonte UTM',medium:'Meio UTM',campaign:'Campanha UTM',term:'Termo UTM',content:'Conteúdo UTM',optional:'opcional',eg_source:'newsletter',eg_medium:'email',eg_campaign:'venda_verao',eg_term:'tenis+corrida',eg_content:'botao_cta',copy:'Copiar link'},faq:[{q:'O que são parâmetros UTM?',a:'Parâmetros UTM (Urchin Tracking Module) são tags adicionadas a uma URL que informam plataformas de análise como o Google Analytics de onde o tráfego veio, qual meio foi usado e qual campanha o gerou.'},{q:'Quais parâmetros são obrigatórios?',a:'Fonte, Meio e Campanha são os três parâmetros obrigatórios. Termo (usado para palavras-chave de busca paga) e Conteúdo (usado para testes A/B) são opcionais.'},{q:'Os parâmetros UTM diferenciam maiúsculas e minúsculas?',a:'Sim. "Email" e "email" são rastreados como fontes separadas. Use convenções de nomenclatura minúsculas consistentes em todas as suas campanhas.'}]},
`(function(){
  'use strict';
  function build(){
    var url=document.getElementById('utm-url').value.trim();
    var src=document.getElementById('utm-source').value.trim();
    var med=document.getElementById('utm-medium').value.trim();
    var cam=document.getElementById('utm-campaign').value.trim();
    var term=document.getElementById('utm-term').value.trim();
    var con=document.getElementById('utm-content').value.trim();
    var out=document.getElementById('utm-out');
    if(!url||!src||!med||!cam){if(out)out.textContent='Fill in URL, Source, Medium and Campaign to generate the link.';return;}
    var p=new URLSearchParams({utm_source:src,utm_medium:med,utm_campaign:cam});
    if(term)p.set('utm_term',term);
    if(con)p.set('utm_content',con);
    var sep=url.includes('?')?'&':'?';
    var full=url+sep+p.toString();
    if(out)out.textContent=full;
  }
  document.querySelectorAll('#utm-url,#utm-source,#utm-medium,#utm-campaign,#utm-term,#utm-content').forEach(function(el){el.addEventListener('input',build);});
  var copyBtn=document.getElementById('utm-copy');
  if(copyBtn)copyBtn.addEventListener('click',function(){var t=document.getElementById('utm-out').textContent;if(t&&navigator.clipboard)navigator.clipboard.writeText(t).then(function(){copyBtn.textContent='Copied!';setTimeout(function(){copyBtn.textContent='Copy link';},2000);});});
  build();
})();`,
`## Build UTM-tagged URLs for accurate campaign tracking

UTM parameters are the standard way to tell analytics platforms like Google Analytics exactly where website traffic comes from. Without UTM tags, traffic from your email newsletter, your social media posts, and your paid ads all look the same in analytics — all classified as "direct" or lumped into generic referral categories. With UTM tags, you know precisely which campaign, which medium, and which source drove each visitor.

## What are UTM parameters?

UTM stands for Urchin Tracking Module. Urchin Software was a web analytics company acquired by Google in 2005, and its tracking module became the basis for Google Analytics. The UTM naming has stuck as the industry standard even though Urchin itself was discontinued.

UTM parameters are key-value pairs appended to a URL as a query string. For example:

https://example.com/sale?utm_source=newsletter&utm_medium=email&utm_campaign=summer_sale

When someone clicks this link and arrives on your website, Google Analytics (or any other analytics platform that supports UTM) records all three parameters alongside the visit data.

## The five UTM parameters

**utm_source** (required): Identifies where the traffic comes from. Examples: newsletter, facebook, google, linkedin, twitter, instagram, podcast.

**utm_medium** (required): Describes the marketing channel or mechanism. Examples: email, social, cpc (cost-per-click), organic, referral, banner, affiliate.

**utm_campaign** (required): Names the specific marketing campaign. Examples: summer_sale_2024, product_launch_v2, brand_awareness_q1.

**utm_term** (optional): Used primarily for paid search to identify the keyword that triggered the ad. Example: running+shoes, best+crm+software.

**utm_content** (optional): Used for A/B testing or to differentiate between multiple links in the same campaign. Examples: cta_button, hero_image, footer_link, version_a.

## Best practices for UTM naming

**Consistency is critical**: utm_source=Email and utm_source=email are treated as two different sources. Establish a naming convention and stick to it across your entire organization.

**Use lowercase**: Most teams use all-lowercase with underscores or hyphens. Avoid spaces (use + or %20 if necessary, but tools like this one handle encoding automatically).

**Be descriptive but concise**: utm_campaign=summer_sale_2024 tells you more than utm_campaign=campaign1.

**Do not use UTM on internal links**: UTM parameters reset the session in Google Analytics. Internal links with UTMs will incorrectly attribute traffic.

## Common campaign URL examples

Newsletter: utm_source=newsletter&utm_medium=email&utm_campaign=weekly_digest
Facebook ad: utm_source=facebook&utm_medium=cpc&utm_campaign=brand_awareness
LinkedIn post: utm_source=linkedin&utm_medium=social&utm_campaign=product_launch
QR code on a flyer: utm_source=print_flyer&utm_medium=qr_code&utm_campaign=event_2024

## Private and instant

The URL is built entirely in your browser. Nothing you enter is sent to any server.
`,
`## Crie URLs com tags UTM para rastreamento preciso de campanhas

Os parâmetros UTM são a forma padrão de dizer a plataformas de análise como o Google Analytics exatamente de onde o tráfego do site vem. Sem tags UTM, o tráfego da sua newsletter, posts de redes sociais e anúncios pagos parecem todos iguais na análise.

## O que são parâmetros UTM?

UTM significa Urchin Tracking Module. Os parâmetros UTM são pares chave-valor adicionados a uma URL como uma string de consulta. Quando alguém clica neste link e chega ao seu site, o Google Analytics registra todos os parâmetros junto com os dados da visita.

## Os cinco parâmetros UTM

**utm_source** (obrigatório): Identifica de onde o tráfego vem. Exemplos: newsletter, facebook, google, linkedin.

**utm_medium** (obrigatório): Descreve o canal de marketing. Exemplos: email, social, cpc, organico.

**utm_campaign** (obrigatório): Nomeia a campanha de marketing específica. Exemplos: venda_verao_2024.

**utm_term** (opcional): Usado principalmente para busca paga para identificar a palavra-chave.

**utm_content** (opcional): Usado para testes A/B ou para diferenciar links na mesma campanha.

## Boas práticas para nomenclatura UTM

**A consistência é crítica**: utm_source=Email e utm_source=email são tratados como duas fontes diferentes.

**Use minúsculas**: A maioria das equipes usa tudo em minúsculas com sublinhados ou hífens.

## Privado e instantâneo

A URL é construída inteiramente no seu navegador. Nada que você informa é enviado a nenhum servidor.
`),

// UTILITY tools
tool('colorpicker','utility','🎨','colorpicker.js',
`<div id="cp-app"><div class="row"><div class="field"><label for="cp-color">{{ui.pick_color}}</label><input type="color" id="cp-color" value="#4f8ef7" style="width:80px;height:48px;border:none;background:none;cursor:pointer"></div></div><div id="cp-results" style="display:flex;gap:1.5rem;flex-wrap:wrap;margin-top:0.75rem"><div><div class="hint">HEX</div><div class="big" id="cp-hex">#4f8ef7</div></div><div><div class="hint">RGB</div><div class="big" id="cp-rgb">—</div></div><div><div class="hint">HSL</div><div class="big" id="cp-hsl">—</div></div></div><div id="cp-swatch" style="margin-top:1rem;height:60px;border-radius:0.5rem;background:#4f8ef7"></div><button id="cp-copy-hex" class="btn secondary" style="margin-top:0.5rem">{{ui.copy_hex}}</button></div>`,
{title:'Color Picker — get HEX, RGB, and HSL color codes',metaDescription:'Free color picker. Select any color and instantly get its HEX, RGB, and HSL codes. Copy with one click. Works entirely in your browser.',h1:'Color Picker',intro:'Click the color swatch to open the color picker. The HEX, RGB, and HSL codes update instantly.',faq_title:'Color picker FAQ',ui:{pick_color:'Pick a color',copy_hex:'Copy HEX'},faq:[{q:'What are HEX, RGB, and HSL?',a:'HEX is a six-digit hexadecimal code like #ff5733. RGB specifies red, green, and blue channels from 0 to 255. HSL specifies hue (0-360°), saturation (%), and lightness (%). All three represent the same color differently.'},{q:'Which format should I use?',a:'HEX is most common in web design and CSS. RGB is used in programming and image editing. HSL is intuitive for humans because hue is easy to understand and adjust.'},{q:'Can I enter a specific color code?',a:'Use the color picker to select visually. For entering a specific HEX or RGB value precisely, use your browser\'s color input directly — click it and type the value.'}]},
{title:'Seletor de Cores — obtenha códigos HEX, RGB e HSL',metaDescription:'Seletor de cores gratuito. Selecione qualquer cor e obtenha instantaneamente seus códigos HEX, RGB e HSL. Copie com um clique.',h1:'Seletor de Cores',intro:'Clique na amostra de cor para abrir o seletor. Os códigos HEX, RGB e HSL se atualizam na hora.',faq_title:'Perguntas frequentes do seletor de cores',ui:{pick_color:'Escolha uma cor',copy_hex:'Copiar HEX'},faq:[{q:'O que são HEX, RGB e HSL?',a:'HEX é um código hexadecimal de seis dígitos como #ff5733. RGB especifica os canais vermelho, verde e azul de 0 a 255. HSL especifica matiz (0-360°), saturação (%) e luminosidade (%). Os três representam a mesma cor de formas diferentes.'},{q:'Qual formato devo usar?',a:'HEX é mais comum em design web e CSS. RGB é usado em programação e edição de imagens. HSL é intuitivo para humanos porque o matiz é fácil de entender e ajustar.'},{q:'Posso informar um código de cor específico?',a:'Use o seletor de cores para selecionar visualmente. Para informar um valor HEX ou RGB específico com precisão, use a entrada de cor do seu navegador diretamente.'}]},
`(function(){
  'use strict';
  var inp=document.getElementById('cp-color');
  var hexEl=document.getElementById('cp-hex'),rgbEl=document.getElementById('cp-rgb'),hslEl=document.getElementById('cp-hsl');
  var swatch=document.getElementById('cp-swatch');
  var copyBtn=document.getElementById('cp-copy-hex');
  if(!inp)return;
  function hexToRgb(hex){var r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);return{r:r,g:g,b:b};}
  function rgbToHsl(r,g,b){r/=255;g/=255;b/=255;var max=Math.max(r,g,b),min=Math.min(r,g,b),h,s,l=(max+min)/2;if(max===min){h=s=0;}else{var d=max-min;s=l>0.5?d/(2-max-min):d/(max+min);switch(max){case r:h=((g-b)/d+(g<b?6:0))/6;break;case g:h=((b-r)/d+2)/6;break;case b:h=((r-g)/d+4)/6;break;}}return{h:Math.round(h*360),s:Math.round(s*100),l:Math.round(l*100)};}
  function update(){
    var hex=inp.value;
    if(hexEl)hexEl.textContent=hex.toUpperCase();
    var rgb=hexToRgb(hex);
    if(rgbEl)rgbEl.textContent='rgb('+rgb.r+', '+rgb.g+', '+rgb.b+')';
    var hsl=rgbToHsl(rgb.r,rgb.g,rgb.b);
    if(hslEl)hslEl.textContent='hsl('+hsl.h+', '+hsl.s+'%, '+hsl.l+'%)';
    if(swatch)swatch.style.background=hex;
  }
  inp.addEventListener('input',update);
  if(copyBtn)copyBtn.addEventListener('click',function(){var t=hexEl?hexEl.textContent:'';if(t&&navigator.clipboard)navigator.clipboard.writeText(t).then(function(){copyBtn.textContent='Copied!';setTimeout(function(){copyBtn.textContent='Copy HEX';},2000);});});
  update();
})();`,
`## Pick any color and get its code instantly

Color codes are everywhere in web design, graphic design, and programming. When you see a color you want to use or reproduce, you need its code — whether that is a HEX value for CSS, an RGB triplet for Photoshop, or an HSL specification for programmatic color manipulation. This tool gives you all three formats at once for any color you pick.

## The three color code formats

**HEX (Hexadecimal)**: The most widely used format in web development. A six-character string of digits 0-9 and letters A-F, prefixed with a hash symbol. Each pair of characters represents one color channel: #RRGGBB. For example, #FF5733 has maximum red (FF = 255), moderate green (57 = 87), and low blue (33 = 51). HEX codes can also be written in shorthand when both characters in each pair are identical: #FF5500 becomes #F50.

**RGB (Red, Green, Blue)**: Specifies each color channel as an integer from 0 (none) to 255 (maximum). This is the native format for digital screens, which emit light in red, green, and blue. rgb(255, 87, 51) is the same color as #FF5733. RGB values are used in CSS (rgb(r, g, b)), JavaScript, Python, and most image editing software.

**HSL (Hue, Saturation, Lightness)**: A more human-intuitive format. Hue is the pure color expressed as an angle from 0° to 360° around a color wheel: 0° = red, 120° = green, 240° = blue. Saturation is how vivid or grey the color is (0% = grey, 100% = fully saturated). Lightness is how light or dark (0% = black, 100% = white, 50% = the "normal" fully saturated color). HSL is excellent for systematically adjusting colors: increase lightness to create tints, decrease it to create shades.

## Which format to use

**CSS and web design**: HEX and RGB are both widely supported, but HSL is increasingly preferred because it is so intuitive to adjust. Making a color 10% lighter is easy in HSL; in RGB, it requires calculating new channel values.

**Print design**: Print typically uses CMYK (Cyan, Magenta, Yellow, Key/Black), which this tool does not cover. For digital-to-print conversion, use professional software like Adobe Illustrator.

**Programming**: RGB is the native format for most graphics libraries. HSL is useful when you want to generate color palettes programmatically.

## Color theory basics

Understanding colors helps you use this tool more effectively:

**Complementary colors**: Colors opposite each other on the hue wheel (180° apart) create maximum contrast. Red (0°) and cyan (180°).

**Analogous colors**: Colors adjacent on the hue wheel (30-60° apart) create harmonious, low-contrast palettes.

**Triadic colors**: Three colors equally spaced at 120° apart create vibrant, balanced schemes.

**Tints and shades**: Increase HSL lightness above 50% to create tints (lighter versions). Decrease it below 50% for shades (darker versions).

## Accessibility and contrast

Web accessibility standards require sufficient contrast between text and background colors. The WCAG 2.1 guidelines specify a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text. Use the color codes from this picker in a dedicated contrast checker to verify accessibility.

## Private and instant

The color picker runs entirely in your browser using native browser color input. No data is sent anywhere.
`,
`## Escolha qualquer cor e obtenha seu código na hora

Códigos de cor estão em todo lugar no design web, design gráfico e programação. Esta ferramenta fornece todos os três formatos ao mesmo tempo para qualquer cor que você escolher.

## Os três formatos de código de cor

**HEX (Hexadecimal)**: O formato mais amplamente usado no desenvolvimento web. Uma string de seis caracteres com dígitos 0-9 e letras A-F, prefixada com o símbolo de hash. Cada par de caracteres representa um canal de cor: #RRGGBB.

**RGB (Vermelho, Verde, Azul)**: Especifica cada canal de cor como um inteiro de 0 (nenhum) a 255 (máximo). Este é o formato nativo para telas digitais.

**HSL (Matiz, Saturação, Luminosidade)**: Um formato mais intuitivo para humanos. Matiz é a cor pura expressa como um ângulo de 0° a 360°. Saturação é quão vívida ou cinza é a cor. Luminosidade é quão clara ou escura.

## Teoria básica das cores

**Cores complementares**: Cores opostas na roda de matiz (180° separadas) criam contraste máximo.

**Cores análogas**: Cores adjacentes na roda de matiz (30-60° separadas) criam paletas harmoniosas.

**Tints e sombras**: Aumente a luminosidade HSL acima de 50% para criar tints. Diminua abaixo de 50% para sombras.

## Privado e instantâneo

O seletor de cores roda inteiramente no seu navegador. Nenhum dado é enviado a lugar nenhum.
`),

tool('gradientgen','utility','🌈','gradientgen.js',
`<div id="grad-app"><div class="row"><div class="field"><label for="grad-c1">{{ui.color1}}</label><input type="color" id="grad-c1" value="#667eea" style="width:60px;height:44px;border:none;background:none;cursor:pointer"></div><div class="field"><label for="grad-c2">{{ui.color2}}</label><input type="color" id="grad-c2" value="#764ba2" style="width:60px;height:44px;border:none;background:none;cursor:pointer"></div><div class="field"><label for="grad-type">{{ui.type}}</label><select id="grad-type"><option value="linear">{{ui.linear}}</option><option value="radial">{{ui.radial}}</option></select></div><div class="field"><label for="grad-angle">{{ui.angle}}</label><input type="number" id="grad-angle" value="135" min="0" max="360" step="1"></div></div><div id="grad-preview" style="height:120px;border-radius:0.75rem;margin-top:1rem;background:linear-gradient(135deg,#667eea,#764ba2)"></div><div id="grad-css" style="margin-top:0.75rem;font-family:monospace;font-size:0.85rem;padding:0.5rem;border-radius:0.5rem;background:rgba(255,255,255,0.05);word-break:break-all"></div><button id="grad-copy" class="btn secondary" style="margin-top:0.5rem">{{ui.copy_css}}</button></div>`,
{title:'CSS Gradient Generator — create beautiful CSS gradients',metaDescription:'Free CSS gradient generator. Create linear and radial gradients with any colors and instantly get the CSS code. No signup needed.',h1:'CSS Gradient Generator',intro:'Pick two colors, choose the gradient type and angle, and copy the CSS code for your project.',faq_title:'Gradient generator FAQ',ui:{color1:'Color 1',color2:'Color 2',type:'Type',linear:'Linear',radial:'Radial',angle:'Angle (°)',copy_css:'Copy CSS'},faq:[{q:'What is a CSS gradient?',a:'A CSS gradient is a smooth transition between two or more colors, defined using CSS\'s background or background-image property without any image file.'},{q:'What is the difference between linear and radial?',a:'A linear gradient transitions in a straight line at a given angle. A radial gradient radiates outward from a center point in circular or elliptical shapes.'},{q:'Can I use more than two colors?',a:'Yes, CSS supports multiple color stops. This generator uses two colors; for more complex gradients, add additional color stops manually in the CSS code.'}]},
{title:'Gerador de Gradiente CSS — crie gradientes CSS lindos',metaDescription:'Gerador de gradiente CSS gratuito. Crie gradientes lineares e radiais com quaisquer cores e obtenha instantaneamente o código CSS. Sem cadastro.',h1:'Gerador de Gradiente CSS',intro:'Escolha duas cores, selecione o tipo e ângulo do gradiente e copie o código CSS para seu projeto.',faq_title:'Perguntas frequentes do gerador de gradiente',ui:{color1:'Cor 1',color2:'Cor 2',type:'Tipo',linear:'Linear',radial:'Radial',angle:'Ângulo (°)',copy_css:'Copiar CSS'},faq:[{q:'O que é um gradiente CSS?',a:'Um gradiente CSS é uma transição suave entre duas ou mais cores, definida usando a propriedade background ou background-image do CSS sem nenhum arquivo de imagem.'},{q:'Qual a diferença entre linear e radial?',a:'Um gradiente linear faz a transição em linha reta em um determinado ângulo. Um gradiente radial irradia para fora de um ponto central em formas circulares ou elípticas.'},{q:'Posso usar mais de duas cores?',a:'Sim, o CSS suporta múltiplas paradas de cor. Este gerador usa duas cores; para gradientes mais complexos, adicione paradas de cor adicionais manualmente no código CSS.'}]},
`(function(){
  'use strict';
  var c1=document.getElementById('grad-c1'),c2=document.getElementById('grad-c2');
  var type=document.getElementById('grad-type'),angle=document.getElementById('grad-angle');
  var preview=document.getElementById('grad-preview'),cssEl=document.getElementById('grad-css');
  var copyBtn=document.getElementById('grad-copy');
  if(!c1)return;
  function update(){
    var col1=c1.value,col2=c2.value,t=type.value,a=angle.value;
    var css=t==='radial'?'radial-gradient(circle, '+col1+', '+col2+')':'linear-gradient('+a+'deg, '+col1+', '+col2+')';
    if(preview)preview.style.background=css;
    if(cssEl)cssEl.textContent='background: '+css+';';
  }
  [c1,c2,type,angle].forEach(function(el){if(el){el.addEventListener('input',update);el.addEventListener('change',update);}});
  if(copyBtn)copyBtn.addEventListener('click',function(){var t=cssEl?cssEl.textContent:'';if(t&&navigator.clipboard)navigator.clipboard.writeText(t).then(function(){copyBtn.textContent='Copied!';setTimeout(function(){copyBtn.textContent='Copy CSS';},2000);});});
  update();
})();`,
`## Create stunning CSS gradients without any design tools

Gradients are one of the most effective ways to add visual depth and modern aesthetics to a website. CSS gradients require no image files and load instantly because they are generated by the browser. This generator lets you design a gradient visually by picking colors and adjusting the angle, then copies the exact CSS code you need to use it.

## Types of CSS gradients

**Linear gradients** transition in a straight line from one color to another. The angle determines the direction: 0° goes bottom to top, 90° goes left to right, 180° goes top to bottom, and 270° goes right to left. The most common angles for design are 135° (diagonal) and 90° (horizontal). Any angle between 0° and 360° is valid.

CSS: linear-gradient(135deg, #667eea, #764ba2)

**Radial gradients** emanate outward from a center point in circular or elliptical shapes. They are useful for spotlight effects, button hover states, and centered focal elements.

CSS: radial-gradient(circle, #667eea, #764ba2)

## Adding more color stops

The generator uses two colors, but CSS gradients support any number of color stops at any position. To add a third color midway:

linear-gradient(135deg, #667eea 0%, #ff6b6b 50%, #764ba2 100%)

You can also specify stops at specific percentages to control where transitions happen:

linear-gradient(90deg, #000000 0%, #000000 50%, #ff0000 50%, #ff0000 100%)

This creates a sharp split rather than a gradient — useful for certain design effects.

## Popular gradient palettes

Some well-loved gradient combinations:
- **Ocean**: #2193b0 → #6dd5ed
- **Sunset**: #FF512F → #DD2476
- **Forest**: #134E5E → #71B280
- **Purple dream**: #667eea → #764ba2
- **Fire**: #f7971e → #ffd200
- **Night sky**: #0f0c29 → #302b63 → #24243e

## Using gradients in CSS

The background shorthand property or background-image property accepts gradient functions directly:

    .header {
      background: linear-gradient(135deg, #667eea, #764ba2);
    }

Gradients can also be applied to text, borders, and mask layers using advanced CSS techniques.

## Browser support

Linear and radial gradients are supported in all modern browsers without any prefix. For Safari before 2013 and older Chrome versions, the -webkit- prefix was required, but this is no longer necessary for any browser in common use today.

## Combining gradients with images

CSS allows combining a gradient with a background image using multiple background layers:

    .hero {
      background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('photo.jpg') center/cover;
    }

This overlays a semi-transparent dark gradient over an image, improving text readability on hero sections.

## Private and instant

Everything runs in your browser. No data is sent anywhere.
`,
`## Crie gradientes CSS deslumbrantes sem nenhuma ferramenta de design

Gradientes são uma das formas mais eficazes de adicionar profundidade visual e estética moderna a um site. Os gradientes CSS não exigem arquivos de imagem e carregam instantaneamente porque são gerados pelo navegador.

## Tipos de gradientes CSS

**Gradientes lineares** fazem a transição em linha reta de uma cor para outra. O ângulo determina a direção: 0° vai de baixo para cima, 90° vai da esquerda para a direita.

CSS: linear-gradient(135deg, #667eea, #764ba2)

**Gradientes radiais** emanam para fora de um ponto central em formas circulares ou elípticas.

CSS: radial-gradient(circle, #667eea, #764ba2)

## Adicionando mais paradas de cor

O gerador usa duas cores, mas os gradientes CSS suportam qualquer número de paradas de cor em qualquer posição:

linear-gradient(135deg, #667eea 0%, #ff6b6b 50%, #764ba2 100%)

## Privado e instantâneo

Tudo roda no seu navegador. Nenhum dado é enviado a lugar nenhum.
`),

];

// ─── JAVASCRIPT for JS files not referenced above ──────────────────────────
const JS_EXTRA = {
  timezonediff: null, // defined inline above
  leapyear: null,
  timecalc: null,
  workdays: null,
  dayofweek: null,
  romanmath: null,
  lcmcalc: null,
  gcdcalc: null,
  areacalc: null,
  squarecalc: null,
  compoundinterest: null,
  loancalc: null,
  bmrcalc: null,
  paintcalc: null,
  syllablecount: null,
  utmbuilder: null,
  colorpicker: null,
  gradientgen: null,
};

let created = 0;
for (const t of TOOLS) {
  if (!t || !t.slug || !t.en) continue;
  console.log(`\n[${t.slug}]`);

  // data/tools JSON
  const jsonData = {
    slug: t.slug, category: t.category, icon: t.icon,
    script: t.script || null, widget: t.widget || '',
    strings: { en: t.en, pt: t.pt }
  };
  write(`data/tools/${t.slug}.json`, JSON.stringify(jsonData, null, 2) + '\n');

  // JS widget
  if (t.script && t.jsCode) {
    write(`public/assets/tools/${t.script}`, t.jsCode + '\n');
  }

  // content EN
  if (t.contentEn) write(`data/content/${t.slug}/en.md`, t.contentEn.trim() + '\n');
  // content PT
  if (t.contentPt) write(`data/content/${t.slug}/pt.md`, t.contentPt.trim() + '\n');

  created++;
}
console.log(`\n✓ Batch 2 done. Processed ${created} tools.`);
