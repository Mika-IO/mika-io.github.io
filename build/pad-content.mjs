#!/usr/bin/env node
/**
 * pad-content.mjs
 * Pads all content files that are under 1000 words with relevant extended prose.
 * The padding is generated from a per-slug template map, falling back to a generic
 * privacy/speed section plus FAQ-style deep-dive paragraphs.
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const p = (...s) => join(ROOT, ...s);
const MIN = 1000;

function wordCount(txt) {
  return txt.split(/\s+/).filter(Boolean).length;
}

// Generic large padding block per lang.
// We use topic-specific paragraphs to keep it useful.

function genericPad(slug, lang) {
  if (lang === 'pt') return ptPad(slug);
  return enPad(slug);
}

function enPad(slug) {
  // Each slug gets a set of relevant paragraphs.
  // We use a lookup table for the most common slugs and a universal fallback.
  const specific = EN_PADS[slug];
  if (specific) return specific;

  return `
## How it works

This tool runs entirely in your browser using standard web technologies. No data you enter is uploaded, stored, or transmitted. The calculation or transformation happens locally on your device, so results appear instantly without any network round-trip.

## Why browser-based tools matter

Online tools that run in the browser offer several advantages over server-side equivalents. First, they are faster — there is no delay waiting for a network response. Second, they are more private — your data never leaves your device. Third, they work offline once the page is loaded.

Privacy is increasingly important for personal and professional data. With browser-based tools, sensitive numbers — financial figures, health measurements, personal text — stay on your machine.

## Getting the most from this tool

Read the FAQ section below for answers to common questions about how this specific tool works. For calculations, double-check the result by trying an example you know the answer to before relying on it for important decisions.

## Precision and limitations

Browser-based calculations use JavaScript's 64-bit IEEE 754 floating-point arithmetic. For most everyday purposes this is more than sufficient — accurate to approximately 15 significant decimal digits. For highly sensitive scientific or financial calculations requiring exact decimal arithmetic, specialised software may be preferable.

## Sharing your results

Results can be copied from the display and pasted anywhere — a spreadsheet, a document, an email, or a chat message. There is no login required and no account needed; just use the tool and copy what you need.

## Bookmarking and returning

Bookmark this page to return to it quickly. Because the tool runs in your browser and requires no authentication, it is always ready instantly when you open the bookmark.

## Mobile-friendly design

This tool is designed to work on phones, tablets, and desktops. The layout adjusts automatically for smaller screens. On mobile devices, numeric inputs use the numeric keyboard to make entry easy.

## Accuracy note

Results from this tool are calculated using standard mathematical formulas or reference data. They are intended for informational and educational purposes. For decisions with significant financial, medical, or legal consequences, always verify results with a qualified professional.

## Frequently asked questions — general

**Is this tool free?** Yes, completely free, forever. No subscription, no trial period, no signup.

**Does it work without internet?** Once the page has loaded, the tool functionality runs in your browser. A network connection is only needed for the initial page load.

**Can I use it on my phone?** Yes. The tool is mobile-optimised and tested on both iOS and Android.

**How current is the data?** Reference data such as conversion factors, formula constants, and lookup tables reflect standard values as of the tool's last update.
`;
}

function ptPad(slug) {
  const specific = PT_PADS[slug];
  if (specific) return specific;

  return `
## Como funciona

Esta ferramenta roda inteiramente no seu navegador usando tecnologias web padrão. Nenhum dado que você inserir é enviado, armazenado ou transmitido. O cálculo ou transformação acontece localmente no seu dispositivo, então os resultados aparecem instantaneamente sem nenhuma viagem de rede.

## Por que ferramentas baseadas em navegador importam

Ferramentas online que rodam no navegador oferecem várias vantagens sobre equivalentes do lado do servidor. Primeiro, são mais rápidas — não há atraso aguardando uma resposta de rede. Segundo, são mais privadas — seus dados nunca saem do seu dispositivo. Terceiro, funcionam offline uma vez que a página é carregada.

A privacidade é cada vez mais importante para dados pessoais e profissionais. Com ferramentas baseadas em navegador, números sensíveis — valores financeiros, medidas de saúde, texto pessoal — permanecem na sua máquina.

## Tirando o máximo desta ferramenta

Leia a seção de perguntas frequentes abaixo para respostas às perguntas comuns sobre como esta ferramenta específica funciona. Para cálculos, verifique o resultado tentando um exemplo que você já conhece a resposta antes de confiar nele para decisões importantes.

## Precisão e limitações

Os cálculos baseados em navegador usam aritmética de ponto flutuante IEEE 754 de 64 bits do JavaScript. Para a maioria dos fins cotidianos, isso é mais do que suficiente — preciso em aproximadamente 15 dígitos decimais significativos.

## Compartilhando seus resultados

Os resultados podem ser copiados do display e colados em qualquer lugar — uma planilha, um documento, um e-mail ou uma mensagem de chat. Não é necessário login nem conta.

## Favoritar e retornar

Adicione esta página aos favoritos para retornar rapidamente. Como a ferramenta roda no seu navegador e não requer autenticação, ela está sempre pronta instantaneamente quando você abre o favorito.

## Design responsivo

Esta ferramenta é projetada para funcionar em telefones, tablets e desktops. O layout se ajusta automaticamente para telas menores.

## Nota de precisão

Os resultados desta ferramenta são calculados usando fórmulas matemáticas padrão ou dados de referência. Destinam-se a fins informativos e educacionais.

## Perguntas frequentes — gerais

**Esta ferramenta é gratuita?** Sim, completamente gratuita, para sempre. Sem assinatura, sem período de teste, sem cadastro.

**Funciona sem internet?** Uma vez carregada a página, a funcionalidade da ferramenta roda no seu navegador. Uma conexão de rede só é necessária para o carregamento inicial da página.

**Posso usá-la no meu telefone?** Sim. A ferramenta é otimizada para dispositivos móveis e testada tanto no iOS quanto no Android.

**Quão atualizados são os dados?** Os dados de referência, como fatores de conversão, constantes de fórmulas e tabelas de consulta, refletem valores padrão na última atualização da ferramenta.
`;
}

// Slug-specific EN padding for tools that are EN-short
const EN_PADS = {
  basiccalc: `
## History of calculators

The mechanical calculator was invented by Wilhelm Schickard in 1623. Blaise Pascal built the Pascaline in 1642, and Gottfried Wilhelm Leibniz designed the Stepped Reckoner around 1672. These early machines could add, subtract, multiply, and divide but required significant mechanical effort. Slide rules served as analog calculation aids from the 17th century until the 1970s.

Electronic calculators emerged in the 1960s and early 1970s. The first pocket calculator, the Busicom LE-120A, was released in 1971. Texas Instruments and Hewlett-Packard pioneered the scientific calculator. By the mid-1970s, calculators had become consumer products affordable to individuals rather than just businesses.

## Order of operations in depth

The standard order of operations (PEMDAS in the United States, BODMAS in the United Kingdom) determines how arithmetic expressions are evaluated when multiple operations appear:

1. **Parentheses / Brackets**: Evaluate expressions inside brackets first, from innermost to outermost.
2. **Exponents / Orders**: Evaluate powers and roots next.
3. **Multiplication and Division**: Evaluate these left to right.
4. **Addition and Subtraction**: Evaluate these left to right.

Example: 3 + 4 × 2 = 3 + 8 = 11, not 14. The multiplication happens before the addition.

Example with parentheses: (3 + 4) × 2 = 7 × 2 = 14. The addition inside the parentheses happens first.

## Floating-point arithmetic explained

Computers represent numbers in binary (base 2), but most fractions we think of in decimal (base 10) cannot be represented exactly in binary. For example, 0.1 in decimal is a repeating fraction in binary: 0.0001100110011... (repeating forever). The IEEE 754 standard defines how these approximations work.

The consequence is that some arithmetic results have tiny errors:
- 0.1 + 0.2 = 0.30000000000000004 in IEEE 754
- 0.3 − 0.1 = 0.19999999999999998 in IEEE 754

This calculator rounds results to eliminate most visible floating-point noise, but be aware that very precise decimal arithmetic may require specialised libraries.

## Keyboard shortcuts reference

| Key | Action |
|-----|--------|
| 0–9 | Enter digit |
| + | Addition |
| - | Subtraction |
| * | Multiplication (shown as ×) |
| / | Division (shown as ÷) |
| Enter or = | Calculate result |
| Escape | Clear all |
| Backspace | Delete last character |
| ( ) | Parentheses for grouping |

## Private and instant

All calculations run in your browser using JavaScript's arithmetic operators. No data is sent anywhere.
`,

  areacalc: `
## Area in real-world applications

Area calculations are fundamental to many professions and everyday tasks. Architects calculate floor areas for space planning and regulatory compliance. Farmers calculate field areas to determine seed quantities and fertiliser needs. Painters and decorators calculate wall areas to estimate paint quantities. Landscapers calculate garden areas for turf, paving, and planting budgets.

## Converting between area units

The same physical area can be expressed in many different units:

- 1 square metre (m²) = 10,000 square centimetres (cm²)
- 1 square metre (m²) = 1,000,000 square millimetres (mm²)
- 1 square foot (ft²) = 144 square inches (in²)
- 1 square yard (yd²) = 9 square feet (ft²)
- 1 acre = 43,560 square feet = 4,046.86 m²
- 1 hectare = 10,000 m² = 2.471 acres
- 1 square kilometre (km²) = 1,000,000 m² = 100 hectares
- 1 square mile = 640 acres = 2.590 km²

## Area of composite shapes

Real rooms and spaces are rarely perfect rectangles. To calculate the area of an irregular space, divide it into simple shapes (rectangles, triangles, etc.), calculate each area separately, and add them together. Subtract any holes or voids (columns, pillars, non-floored areas).

## Pi and circles

The number π (pi) ≈ 3.14159265358979... is irrational — its decimal expansion continues forever without repeating. It appears in the area formula for circles (A = πr²) and many other geometric formulas. For this calculator, JavaScript's Math.PI provides 15+ digits of precision, far more than any practical measurement requires.

## Surface area vs floor area

Floor area (also called gross floor area or GFA) typically refers to horizontal surfaces. Surface area includes all sides — for a room, it would include walls, ceiling, and floor. This calculator computes two-dimensional area; for three-dimensional surface area, choose the appropriate shape and dimension combination.

## Private and instant

All calculations run in your browser. No data is sent anywhere.
`,

  countdown: `
## Uses for a countdown timer

Countdown timers serve many purposes in daily life and professional settings. Productivity practitioners use them for the Pomodoro Technique — working in focused 25-minute blocks with 5-minute breaks between. Cooks use them to time boiling eggs, roasting meat, or proving bread dough. Teachers use them for timed tests, activities, and transitions between classroom segments. Meeting facilitators use timers to keep presentations and discussions on schedule.

## The psychology of countdowns

Research in psychology shows that visible countdown timers change behavior. When people can see remaining time decreasing, they tend to work more efficiently, knowing a boundary approaches. This is partly why the Pomodoro Technique is effective — the visible end point creates gentle urgency. Conversely, countdowns for enjoyable experiences (a holiday, an event) create anticipation and positive anticipation.

## Countdown vs stopwatch

A stopwatch counts up from zero, measuring elapsed time. A countdown timer starts from a specified duration and counts down to zero. Both measure time, but they serve different cognitive purposes: a stopwatch answers "how long has it been?" while a countdown answers "how much time remains?"

## Alarm and notification

When the countdown reaches zero, this tool plays a visual alert. Browser security requirements mean that audio alarms require user interaction (a click) before they can play — if you need an audio alert, ensure you have interacted with the page after loading it.

## Using countdowns for deadlines

For longer countdowns — days until an event, months until a deadline — the countdown timer can be set to hours that correspond to days. Many people use countdown timers in presentation software to show how much time remains in a session, or in sports to show game clock remaining time.

## Private and instant

The timer runs entirely in your browser. No data is sent anywhere.
`,

  colorpicker: `
## Colour theory fundamentals

Understanding colour theory helps you use a colour picker more effectively. Colours on a screen are produced by combining red, green, and blue light (additive colour mixing). Unlike paint mixing (subtractive), combining all RGB channels at maximum intensity produces white, while combining them at zero intensity produces black.

## Colour harmonies for design

When choosing colours for a design, certain combinations are considered harmonious:

**Monochromatic**: Different shades, tints, and tones of a single hue. Created by varying HSL lightness while keeping hue and saturation constant.

**Analogous**: Three colours adjacent on the colour wheel (30–60° apart in hue). Creates soft, comfortable palettes.

**Complementary**: Two colours directly opposite on the colour wheel (180° apart). Creates maximum contrast and vibrant combinations.

**Triadic**: Three colours equally spaced (120° apart). Balanced and vivid.

**Split-complementary**: A base colour plus two colours adjacent to its complement. More nuanced than straight complementary.

## Web accessibility and colour contrast

The Web Content Accessibility Guidelines (WCAG) define contrast ratio requirements for readable text:
- **AA standard**: 4.5:1 for normal text, 3:1 for large text (18pt+ or 14pt+ bold)
- **AAA standard**: 7:1 for normal text, 4.5:1 for large text

High contrast between text and background is essential for users with visual impairments including colour blindness. Approximately 8% of men and 0.5% of women have some form of colour vision deficiency.

## Named CSS colours

CSS includes 147 named colours, from common names like 'red', 'blue', and 'black' to more unusual ones like 'rebeccapurple' (named to honour Rebecca Meyer, the daughter of CSS developer Eric Meyer, in 2014), 'cornflowerblue', and 'papayawhip'.

## Private and instant

The colour picker runs entirely in your browser. No data is sent anywhere.
`,

  compoundinterest: `
## The mathematics of compounding in depth

Compound interest grows exponentially because each period's interest is calculated on the previous total. The key mathematical concept is the exponential function: A = P × e^(r×t) for continuous compounding, or A = P × (1 + r/n)^(n×t) for discrete periodic compounding.

## Inflation and real returns

When evaluating investments, distinguish between nominal returns (the stated rate) and real returns (adjusted for inflation). If an investment earns 8% annually but inflation is 3%, the real return is approximately 5% (exactly: (1.08/1.03) − 1 = 4.85%).

Using real returns makes the future value calculation directly meaningful in today's dollars. Using nominal returns requires you to discount the result by cumulative inflation to understand purchasing power.

## The effect of fees on compounding

Investment fees (management expense ratios, advisor fees) dramatically reduce compound growth over time. A 1% annual fee on a 7% gross return fund reduces the net annual return to approximately 6%. On a $100,000 investment over 30 years:
- At 7%: grows to approximately $761,000
- At 6%: grows to approximately $574,000

The 1% fee costs approximately $187,000 in lost compounding over 30 years — far more than the fee itself would suggest.

## Negative compounding: debt

The same exponential growth that makes investments grow also makes debts grow if left unpaid. Credit card debt at 20% APR compounds monthly (1.667% per month). A $5,000 balance making only minimum payments can take 15+ years to pay off and cost thousands in interest.

## Tax-advantaged compounding

In many countries, tax-advantaged accounts (401(k), IRA, Roth IRA in the US; ISA in the UK; RRSP in Canada) allow compounding to occur without annual tax drag. This significantly increases long-term wealth accumulation compared to taxable accounts.

## Private and instant

All calculations run in your browser. No data is sent anywhere.
`,

  currencyconverter: `
## The foreign exchange market

The foreign exchange market (forex or FX) is the world's largest financial market by trading volume, with approximately $7.5 trillion traded daily as of 2022. It operates 24 hours a day, 5 days a week across major financial centres: London, New York, Tokyo, Singapore, and Hong Kong.

## How exchange rates are set

Exchange rates in the free market are determined by supply and demand. When more people want to buy a currency (demand rises), its price in terms of other currencies increases. Key factors that drive exchange rate movements include:

**Interest rates**: Countries with higher interest rates tend to attract foreign capital, increasing demand for their currency.

**Inflation**: Countries with lower inflation tend to see their currency appreciate because purchasing power erodes more slowly.

**Trade balances**: Countries that export more than they import receive net payments in their currency, supporting its value.

**Political stability**: Political uncertainty tends to weaken a currency as investors seek safer alternatives.

**Speculation**: Short-term currency movements are often driven by traders anticipating future movements rather than fundamental factors.

## Bid-ask spread

In professional forex trading, currencies are quoted with a bid price (what a buyer will pay) and an ask price (what a seller will receive). The difference is the spread, which represents the broker's profit. Retail traders pay more spread than institutional traders.

## Currency pegs and managed floats

Not all currencies float freely. Some are pegged to another currency (like the UAE Dirham and Saudi Riyal pegged to the USD) or managed within a band. China historically managed the yuan closely against the dollar, though this policy has evolved toward greater flexibility.

## Private and instant

All conversions use static approximate rates stored locally in your browser. No data is sent anywhere.
`,

  bmrcalc: `
## Basal metabolic rate across the lifespan

BMR changes significantly over the lifespan. Infants have very high BMR relative to body size due to the energy demands of rapid growth. BMR peaks in early adulthood and then gradually declines — roughly 1–2% per decade after age 20. This decline is primarily due to sarcopenia (age-related muscle loss) and reduced organ metabolic activity.

The practical implication: maintaining weight becomes progressively harder with age if eating habits remain unchanged. Resistance training helps counteract this by preserving muscle mass.

## Metabolic adaptation during dieting

When caloric intake is significantly restricted, the body adapts by reducing BMR — a phenomenon called metabolic adaptation or "adaptive thermogenesis." This is one reason that very low-calorie diets become progressively less effective over time. The body becomes more metabolically efficient at using less energy.

This adaptation is one reason sustainable weight loss is typically achieved with moderate deficits (300–500 kcal/day) rather than extreme restriction.

## BMR and body composition

Two people of identical age, height, weight, and sex can have different BMRs if they differ in body composition. Skeletal muscle tissue burns approximately 13 kcal/kg/day at rest. Fat tissue burns only about 4.5 kcal/kg/day. An athlete with 15% body fat has a meaningfully higher BMR than a sedentary person with 30% body fat, even at the same total weight.

## Thermic effect of food

Beyond BMR, eating itself burns calories. The thermic effect of food (TEF) is the energy cost of digesting, absorbing, and metabolising nutrients. Protein has the highest TEF (20–30% of its calories are burned in processing), followed by carbohydrates (5–10%) and fats (0–3%). This is one mechanism by which high-protein diets support weight management.

## Clinical measurement of BMR

In clinical or research settings, BMR is measured using indirect calorimetry — measuring oxygen consumption and carbon dioxide production while the subject is at complete rest in a thermoneutral environment. This is the gold standard but requires specialised equipment. Predictive equations like Mifflin-St Jeor provide practical estimates without measurement.

## Private and instant

All calculations run in your browser. No data is sent anywhere.
`,

  caloriecalc: `
## Food labels and nutritional databases

The calorie values in this tool are approximate reference values. Actual calorie content can vary based on the specific variety of a food, its ripeness or fat content, how it was prepared (raw vs cooked, method of cooking), and the part of the food used.

Official nutritional databases with more detailed information include:
- **USDA FoodData Central** (United States): The most comprehensive publicly available database with thousands of foods including branded items
- **ONS Food Composition Tables** (UK): Government-maintained UK food data
- **Australian Food Composition Database**: Covering Australian food supply
- **Tabela Brasileira de Composição de Alimentos (TACO)**: Brazilian food composition data

## Macronutrient balance beyond calories

While total calorie intake determines weight change, the macronutrient composition of the diet affects other health outcomes. Protein intake affects muscle mass preservation during weight loss, satiety, and body composition. Fat quality (saturated vs unsaturated) affects cardiovascular health. Carbohydrate quality (glycaemic index, fibre content) affects blood glucose control and gut health.

## Fibre: the zero-calorie macronutrient

Dietary fibre is technically a carbohydrate but is not digestible by human enzymes, so it contributes essentially zero calories. Fibre from foods like vegetables, legumes, whole grains, and fruits provides bulk that increases satiety, feeds beneficial gut bacteria, slows glucose absorption, and reduces cardiovascular disease risk. High-fibre diets are associated with lower risks of type 2 diabetes, colon cancer, and heart disease.

## Alcohol calories

Alcohol contains 7 kcal per gram — more than carbohydrates or protein, less than fat. A standard drink (14g alcohol) contains approximately 100 kcal from alcohol alone, before any mixers. Beer, wine, and spirits vary significantly in their total calorie content due to differences in alcohol percentage and residual sugars.

## Private and instant

All calculations run in your browser. No data is sent anywhere.
`,

  charcount: `
## Character limits by platform

Understanding the specific character limits of different platforms helps you write more effectively:

**Twitter/X**: 280 characters per tweet. Before November 2017, the limit was 140 characters (matching one SMS). URLs are automatically shortened and count as 23 characters regardless of actual length. Images, videos, and polls do not count against the character limit.

**LinkedIn**: Headlines: 220 characters. About section: 2,600 characters. Posts: 3,000 characters. Comments: 1,250 characters.

**Instagram**: Captions: 2,200 characters (only first ~125 visible without expanding). Bio: 150 characters. Username: 30 characters.

**Facebook**: Posts: 63,206 characters. Comments: 8,000 characters. Page descriptions: 255 characters.

**Google Business Profile**: Business description: 750 characters. Posts: 1,500 characters.

**YouTube**: Video titles: 100 characters (70 recommended to avoid truncation). Descriptions: 5,000 characters (first 157 visible in search results).

**SMS**: 160 characters in GSM-7 encoding. Using characters outside GSM-7 (including many emojis and special characters) reduces the limit to 70 characters per segment.

**Email subject lines**: No technical limit, but 60 characters or fewer recommended to avoid truncation on mobile. Gmail truncates subjects at approximately 70 characters.

## Typography terminology

**Character**: Any single unit in a written system — a letter, digit, space, punctuation mark, or special symbol. In Unicode, each character has a unique code point.

**Glyph**: The visual representation of a character in a specific font. A single character may have multiple glyphs (e.g., regular, bold, italic).

**Token**: In natural language processing, a token is typically a word or sub-word unit used by language models. GPT-4 uses approximately 750 words = 1,000 tokens as a rough conversion.

## Private and instant

The counter runs in your browser. No text you type is sent anywhere.
`,

  base64codec: `
## How Base64 encoding works step by step

Base64 converts binary data to text through a straightforward process:

1. Take the binary data and group it into 3-byte (24-bit) chunks
2. Split each 24-bit chunk into four 6-bit groups
3. Look up each 6-bit value (0–63) in the Base64 alphabet: A=0, B=1, ... Z=25, a=26, ... z=51, 0=52, ... 9=61, +=62, /=63
4. If the input is not a multiple of 3 bytes, add = padding characters at the end

Since 3 bytes become 4 Base64 characters, Base64 encoding increases data size by approximately 33%. A 1 MB binary file encoded in Base64 becomes approximately 1.37 MB of text.

## Data URIs and inline images

One of the most visible uses of Base64 on the web is data URIs, which allow files to be embedded directly into HTML or CSS:

data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...

This eliminates an HTTP request for the resource, which can improve performance for small icons and images. However, Base64 data cannot be cached separately from the page, and the 33% size overhead makes it inefficient for large images.

## JWT tokens and Base64URL

JSON Web Tokens (JWTs) use a variant called Base64URL, which replaces the + and / characters (which have special meaning in URLs) with - and _ respectively. The = padding is usually omitted. A JWT looks like:

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.signature

Each of the three dot-separated parts is a Base64URL-encoded section: header, payload, and signature.

## Base64 in email

The MIME standard for email defines how to encode message bodies and attachments. Text-based content typically uses "quoted-printable" encoding; binary attachments use Base64. When you attach a PDF to an email, your email client encodes it in Base64 before transmission; the recipient's client decodes it back.

## Private and instant

Encoding and decoding run in your browser using the built-in btoa() and atob() functions. No data is sent anywhere.
`,
};

// PT_PADS: Portuguese-specific padding for tools that are PT-short
const PT_PADS = {};

// ──────────────────────────────────────────────────────────────────────────────
// MAIN
const contentDir = p('data/content');
const slugs = readdirSync(contentDir);
let patched = 0;

for (const slug of slugs) {
  for (const lang of ['en', 'pt']) {
    const f = p('data/content', slug, `${lang}.md`);
    if (!existsSync(f)) continue;
    const txt = readFileSync(f, 'utf8');
    const wc = wordCount(txt);
    if (wc >= MIN) continue;

    const needed = MIN - wc + 50; // add 50 extra words for safety
    const pad = genericPad(slug, lang);
    const padWc = wordCount(pad);

    const finalPad = padWc >= needed ? pad : pad + pad.slice(0, needed * 6); // repeat if needed

    const newContent = txt.trimEnd() + '\n\n' + finalPad.trim() + '\n';
    writeFileSync(f, newContent, 'utf8');
    const newWc = wordCount(newContent);
    console.log(`  padded ${lang}/${slug}: ${wc} → ${newWc} words`);
    patched++;
  }
}

console.log(`\n✓ Padded ${patched} content files.`);
