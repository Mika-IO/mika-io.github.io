# TAREFA 02 — Implementar uma tool nova (do zero, nos 10 idiomas)

> Documento auto-contido. Executor: modelo barato (Haiku ou similar).
> Leia inteiro antes de criar qualquer arquivo. Não improvise fora do que está aqui.

## 0. Como esta tarefa funciona (leia isto primeiro)

**A unidade de trabalho é UMA tool.** Um ciclo = 1 tool completa (12 arquivos), verificada e
commitada. O trabalho é feito **um ciclo de cada vez**, em sequência.

Se o pedido foi "faça todas as tools que faltam" (são ~177), isso **não** significa segurar 177
tools na cabeça ao mesmo tempo. Significa: **repita o ciclo abaixo, uma tool por vez, até acabar
ou até você ser interrompido.** Cada ciclo é independente e termina em commit. Nada se perde se a
sessão morrer no meio — o §12 mostra como retomar exatamente de onde parou.

### Regras anti-travamento (o motivo de esta seção existir)

Estas coisas são **proibidas** — elas fazem a tarefa parar sem entregar nada:

- ❌ Não peça confirmação para começar. O escopo já está definido aqui.
- ❌ Não proponha "piloto de 10 primeiro para você revisar". Cada tool já é verificada no §7.
- ❌ Não pergunte "quais categorias priorizar". A ordem está no §12: é a ordem do catálogo.
- ❌ Não recuse por volume ("são 2000 arquivos, é arriscado"). Você **nunca** cria 2000 arquivos
  numa tacada: você cria 12, verifica, commita, e só então pega a próxima.
- ❌ Não crie stub/rascunho "para revisar depois". Cada ciclo entrega tool **completa e publicável**.
- ❌ Não faça duas tools no mesmo ciclo. Terminou uma, commitou, aí sim a próxima.

Se um ciclo falhar e você não conseguir consertar, **pule a tool**, anote o motivo, e siga para a
próxima. Uma tool travada não pode parar a fila.

## 0.1. Escolhendo o slug do ciclo (você mesmo descobre)

Ninguém precisa te passar o slug. Rode isto e pegue **o primeiro da lista**:

```bash
node -e '
const fs=require("fs");
const md=fs.readFileSync("docs/free_tools_ideas.md","utf8");
const catalogo=[...new Set([...md.matchAll(/\]\(https:\/\/mikaio\.dev\/([a-z0-9-]+)\)/g)].map(m=>m[1]))];
const feitas=new Set(fs.readdirSync("data/tools").map(f=>f.replace(/\.json$/,"")));
const pendentes=catalogo.filter(s=>!feitas.has(s));
console.log("pendentes:",pendentes.length);
console.log("PRÓXIMO SLUG:",pendentes[0]);
console.log("fila:",pendentes.slice(0,10).join(" "));
'
```

O estado vem do **sistema de arquivos**, não de uma lista que você guarda na memória. Se
`data/tools/<slug>.json` existe, a tool está feita. Por isso não existe planilha de progresso para
desatualizar, e por isso retomar é trivial.

Agora pegue a **linha desse slug** no catálogo — ela define categoria e escopo:

```bash
grep -i "mikaio.dev/<slug>)" docs/free_tools_ideas.md
```

A linha te dá a **categoria** e a **descrição** da tool. É ela que define o escopo.
Não invente funcionalidade além do que a linha descreve.

Guardas (raras, mas checáveis):

- Slug não aparece no `free_tools_ideas.md` → não é do catálogo, pule.
- `data/tools/<slug>.json` já existe → tool já feita; o script acima nunca te daria ela.

## 1. O que o projeto é (para você não quebrar nada)

Site estático de SEO programático em GitHub Pages. Um gerador em Node (`build/generate.mjs`,
zero dependências) lê `data/` + `templates/` + `public/assets/` e escreve HTML committado em
`public/<lang>/<slug>/index.html`. Sitemap, robots, llms.txt, hreflang, JSON-LD e o glossário
são **gerados automaticamente** — você nunca edita nenhum deles.

Consequências duras:

- **Nada de rede em runtime.** Sem `fetch`, sem API, sem CDN, sem script externo. Se a tool
  precisa de dado ao vivo (câmbio, cripto), ela embarca um **snapshot estático com data visível**
  no widget, igual `currencyconverter`.
- **Nada de build step.** Sem npm, sem bundler, sem TypeScript. JS puro no navegador.
- **Sem backend, sem storage de usuário.** Tudo roda no browser do visitante.

## 2. Exatamente 3 tipos de arquivo (nada mais)

| # | Arquivo | Qtd |
|---|---------|-----|
| 1 | `data/tools/<slug>.json` | 1 |
| 2 | `public/assets/tools/<slug>.js` | 1 |
| 3 | `data/content/<slug>/<lang>.md` | 10 |

Total: **12 arquivos criados** (+ o output gerado em `public/<lang>/<slug>/`).

## 3. Arquivos PROIBIDOS (tocar = tarefa reprovada)

```
build/*              templates/*          data/meta.json       data/i18n/*
public/assets/tools.css                   public/assets/tool-runtime.js
public/sitemap.xml   public/robots.txt    public/llms.txt      public/glossary.html
src/*                pages/*              miblo/*              index.html da raiz
outros data/tools/*.json
```

Você **não** registra a tool em lugar nenhum: o gerador varre `data/tools/` sozinho e a tool
aparece na home, no glossário, no sitemap e no llms.txt automaticamente.

`src/content/tools/` é cópia morta/legada. O gerador não lê de lá. Não crie nada em `src/`.

## 4. Arquivo 1 — `data/tools/<slug>.json`

Referência canônica de qualidade: **`data/tools/bmicalc.json`**. Leia antes de escrever.

Formato:

```json
{
  "slug": "<slug>",
  "category": "<uma das 10 abaixo>",
  "icon": "🔢",
  "script": "<slug>.js",
  "widget": "<html em UMA linha, com tokens {{ui.chave}}>",
  "strings": {
    "en": { "title": "…", "metaDescription": "…", "h1": "…", "intro": "…",
            "faq_title": "…", "ui": { … }, "faq": [ {"q":"…","a":"…"} ] },
    "zh": { … }, "hi": { … }, "es": { … }, "fr": { … },
    "ar": { … }, "bn": { … }, "pt": { … }, "ru": { … }, "ur": { … }
  }
}
```

### 4.1 `category` — lista fechada, copie o `id` exato

`time` · `math` · `finance` · `random` · `games` · `text` · `social` · `health` · `home` · `utility`

Mapeamento a partir do `free_tools_ideas.md`: Tempo e Datas→`time`, Matemática→`math`,
Finanças→`finance`, Aleatórios→`random`, Jogos/Diversão→`games`, Texto→`text`,
Redes Sociais→`social`, Saúde→`health`, Casa/Automóvel→`home`, Utilidades→`utility`.

**Categoria inventada = build quebrado.** Se a linha do catálogo não encaixar em nenhuma das 10,
use `utility`.

### 4.2 `icon`

Um único emoji. Nada de SVG, nada de `<img>`.

### 4.3 `widget` — HTML em string única

Regras duras:

- **Todo texto visível vem de um token `{{ui.chave}}`.** Zero palavra em inglês hard-coded no
  widget. Isso inclui `placeholder`, `aria-label`, `title` e texto de `<option>`.
  Exceção única: símbolos e unidades neutras (`px`, `%`, `kg`, `16:9`).
- Todo `id` do HTML começa com um prefixo do slug (ex.: `bmi-form`, `bmi-height`) para não colidir
  com o header/footer da página.
- Classes CSS: **use só as que já existem** em `public/assets/tools.css`:
  `field` · `row` · `btn` · `secondary` · `result` · `big` · `hint` · `widget`.
  Não crie classe nova (você não pode editar o CSS).
- **Zero JavaScript inline.** Sem `onclick=`, sem `<script>` dentro do widget.
- Rótulos localizados que o **JS** precisa (ex.: "Abaixo do peso") vão como
  `data-*` no elemento raiz do widget: `data-under="{{ui.under}}"`. Ver `bmicalc.json`.
- HTML válido e acessível: todo `<input>`/`<select>` tem `<label for="…">`.

### 4.4 `strings.<lang>` — os 10 idiomas

Os 10 códigos, fechados: `en` `zh` `hi` `es` `fr` `ar` `bn` `pt` `ru` `ur`.
(`ar` e `ur` são RTL — mas você **não** escreve marcação de RTL, o gerador cuida disso.)

- Escreva o bloco `en` primeiro e completo. Ele vira o gabarito.
- Todos os outros 9 blocos têm **exatamente as mesmas chaves de `ui`** que o `en` (mesmos nomes,
  mesma quantidade) e o **mesmo número de itens em `faq`** (mínimo 3). Só os valores mudam.
- `title` ≤ ~60 chars, com a palavra-chave no idioma. `metaDescription` 120–160 chars.
- Tradução de qualidade nativa, **nunca literal** (o README exige: *"translations must not sound
  robotic or nonsensical"*). Se soa como Google Tradutor, está errado.
- Não invente termo técnico: em dúvida, mantenha o termo em inglês.

## 5. Arquivo 2 — `public/assets/tools/<slug>.js`

Referência canônica: **`public/assets/tools/bmicalc.js`**. Leia antes de escrever.

Regras duras:

```js
/* <Nome da tool>. Localized labels come from data-* attributes on the widget. */
(function () {
  'use strict';
  var form = document.getElementById('<prefixo>-form');
  if (!form) return;              // guarda obrigatória: a página existe sem o widget
  var d = form.dataset;           // rótulos traduzidos SÓ daqui
  …
})();
```

- **IIFE + `'use strict'`.** Zero variável global, zero `export`, zero `import`.
- **JS neutro de idioma.** Nenhuma string visível ao usuário dentro do `.js`. Todo texto sai de
  `data-*`. Se você escrever `"Invalid input"` no JS, a tarefa está errada.
- **`textContent`, nunca `innerHTML` com entrada do usuário** (XSS).
- **Zero dependência, zero rede.** Sem `fetch`, `XMLHttpRequest`, `import()`, CDN.
- Sintaxe conservadora (`var`, `function`) para casar com o resto do projeto e rodar em qualquer
  navegador. Sem otimização prematura.
- Trate entrada inválida sem quebrar: valor vazio/NaN/negativo → esconda o resultado
  (`resultBox.hidden = true`) e retorne. Nunca `alert()`, nunca `console.log` deixado para trás.
- Divisão por zero, data inválida, campo vazio: sempre um caminho de saída silencioso.
- Botão de copiar: **não implemente**. Use o runtime compartilhado — basta
  `<button class="btn secondary" data-copy="#<id-do-output>" data-copied="{{ui.copied}}">{{ui.copy}}</button>`.
  `public/assets/tool-runtime.js` já está carregado em toda página.

## 6. Arquivo 3 — `data/content/<slug>/<lang>.md` (×10)

### 6.1 Tamanho — a regra que mais reprova

Mínimo **1000 palavras** contadas pelo gerador (corpo + FAQ). **Mire em 1150–1250.**
Em `zh` cada ideograma conta como 1 palavra → mire em **1200–1400 caracteres**.

### 6.2 Markdown suportado (subset — o resto sai quebrado na página)

Permitido:

```
## Seção
### Subseção
Parágrafo.
- lista
1. lista numerada
**negrito**  *itálico*  `código`
[texto](https://url)
```

**PROIBIDO:** tabela, imagem, HTML cru, bloco ``` , blockquote `>`, `# H1`
(o H1 vem do `strings.<lang>.h1`).

### 6.3 Conteúdo

Estrutura sugerida (~6 seções `##`, que é o que chega a 1000+ palavras com folga):

1. O que a tool faz / como usar
2. A fórmula ou a lógica por trás (com exemplo numérico resolvido passo a passo)
3. Casos de uso reais
4. Erros comuns e como evitar
5. Limitações / quando **não** usar
6. Privacidade (roda 100% no navegador, nada é enviado)

Regras duras:

- **Descreva só o que o widget realmente faz.** Nada de funcionalidade inventada
  (não escreva "exporta PDF" se o JS não exporta PDF).
- **Zero fato inventado.** Sem estatística sem fonte, sem "estudos mostram", sem citar
  autoridade/órgão não confirmado, sem número chutado. Matemática pode: fórmula e exemplo
  resolvido você confere na mão.
- Cada idioma é **escrito no idioma**, não traduzido literalmente do inglês. Exemplos podem ser
  adaptados ao contexto local (moeda, unidade, cidade) desde que a lógica não mude.
- Não repita parágrafo para encher palavra. Conteúdo duplicado derruba o SEO — o objetivo é ser
  genuinamente útil.

## 7. Verificação obrigatória (rode; não pule)

```bash
# 1. JSON válido
node -e "JSON.parse(require('fs').readFileSync('data/tools/<slug>.json','utf8'));console.log('JSON OK')"

# 2. Categoria existe, script bate, ui consistente nos 10, todo token do widget resolve
node -e "
const fs=require('fs');
const meta=JSON.parse(fs.readFileSync('data/meta.json','utf8'));
const t=JSON.parse(fs.readFileSync('data/tools/<slug>.json','utf8'));
const langs=meta.langs.map(l=>l.code);
if(!meta.categories.some(c=>c.id===t.category)) console.log('✗ categoria inválida:',t.category);
if(t.script!==t.slug+'.js') console.log('✗ script deveria ser',t.slug+'.js');
if(!fs.existsSync('public/assets/tools/'+t.script)) console.log('✗ JS não existe:',t.script);
const base=Object.keys(t.strings.en.ui).sort().join(',');
for(const l of langs){
  const s=t.strings[l];
  if(!s){console.log('✗ falta strings.'+l);continue;}
  if(Object.keys(s.ui||{}).sort().join(',')!==base) console.log('✗ ui divergente em',l);
  if((s.faq||[]).length!==t.strings.en.faq.length) console.log('✗ faq divergente em',l);
  if(!fs.existsSync('data/content/'+t.slug+'/'+l+'.md')) console.log('✗ falta content',l+'.md');
}
const tokens=[...t.widget.matchAll(/\{\{\s*ui\.(\w+)\s*\}\}/g)].map(m=>m[1]);
for(const k of new Set(tokens)) if(!(k in t.strings.en.ui)) console.log('✗ token {{ui.'+k+'}} sem chave em ui');
if(/onclick=|<script/i.test(t.widget)) console.log('✗ JS inline no widget');
console.log('checagem estrutural concluída');"

# 3. Contagem de palavras dos 10 .md (mesmo algoritmo do gerador)
node -e "
const fs=require('fs');
const CJK=/[぀-ヿ㐀-䶿一-鿿豈-﫿]/gu;
for(const f of fs.readdirSync('data/content/<slug>')){
  const txt=fs.readFileSync('data/content/<slug>/'+f,'utf8');
  const cjk=(txt.match(CJK)||[]).length;
  const rest=(txt.replace(CJK,' ').match(/[\p{L}\p{N}]+/gu)||[]).length;
  const n=cjk+rest;
  console.log((n<1000?'✗':'✓'), f, n+'w');
}"

# 4. JS sem rede e sem string visível hard-coded (revise os hits à mão)
grep -nE "fetch\(|XMLHttpRequest|import |require\(|alert\(|innerHTML" public/assets/tools/<slug>.js

# 5. Build — nenhum aviso pode citar o seu slug
node build/generate.mjs 2>&1 | grep "<slug>"     # saída esperada: VAZIA

# 6. As 10 páginas nasceram?
ls -d public/*/<slug>/    # esperado: 10 diretórios (ar bn en es fr hi pt ru ur zh)

# 7. Diff limpo?
git status --short   # só: data/tools/<slug>.json, public/assets/tools/<slug>.js,
                     #     data/content/<slug>/*.md, e arquivos gerados em public/
```

Avisos do build sobre **outros** slugs são pendências antigas do repositório. Ignore-os.
Só o seu slug tem que estar limpo.

## 8. Smoke test da página gerada (obrigatório, sem navegador)

Você roda em terminal, sem navegador. Estes 3 checks substituem o teste manual:

```bash
# 8a. O JS tem sintaxe válida?
node --check public/assets/tools/<slug>.js && echo "✓ sintaxe OK"

# 8b. A página gerada ficou sem token não resolvido e o RTL saiu certo?
node -e "
const fs=require('fs');
for(const l of ['en','ar','zh']){
  const h=fs.readFileSync('public/'+l+'/<slug>/index.html','utf8');
  if(h.includes('{{')) console.log('✗ token não resolvido em',l);
  if(!h.includes('id=\"tool\"')) console.log('✗ widget não renderizou em',l);
}
const ar=fs.readFileSync('public/ar/<slug>/index.html','utf8');
if(!ar.includes('dir=\"rtl\"')) console.log('✗ ar sem dir=rtl');
console.log('✓ smoke test da página OK');"

# 8c. A matemática está certa? (obrigatório para calculadoras)
```

Para 8c: pegue **um exemplo com resultado conhecido**, calcule à mão, e confira contra a fórmula
que você escreveu no `.js`. Ex.: regra de três `2/4 = 5/x` → `x = 10`. Se o `.js` não produz 10, a
tool está errada. Escreva esse mesmo exemplo resolvido dentro do `.md` (seção 2 do §6.3) — assim o
exemplo do conteúdo e a lógica do código se validam mutuamente.

Se um navegador estiver disponível, `python3 -m http.server 8000 --directory public` e abrir
`/en/<slug>/` é bônus — não é bloqueante.

## 9. Definition of Done

- [ ] Slug veio do script do §0.1 e `data/tools/<slug>.json` não existia
- [ ] 12 arquivos criados (1 JSON + 1 JS + 10 MD), e mais nenhum
- [ ] Nenhum arquivo do §3 foi tocado
- [ ] `category` é um dos 10 ids; `script` == `<slug>.js`; todo `{{ui.x}}` tem chave
- [ ] Os 10 blocos `strings` com `ui`/`faq` do mesmo formato do `en`
- [ ] 10 `.md` com ≥ 1000 palavras (zh ≥ 1200 chars)
- [ ] `node build/generate.mjs 2>&1 | grep <slug>` sai vazio
- [ ] §8 passou: sintaxe OK, sem `{{` na página, `ar` em RTL, exemplo numérico confere
- [ ] Zero rede, zero dependência, zero string visível dentro do `.js`

## 10. Commit (fecha o ciclo)

Uma tool por commit. **Commite antes de começar a próxima tool** — é isso que torna a fila
retomável.

```bash
git add data/tools/<slug>.json public/assets/tools/<slug>.js data/content/<slug>/ public/
git commit -m "feat(<slug>): adiciona <nome da tool> nos 10 idiomas"
```

## 11. O ciclo, do começo ao fim

```
1. Rode o script do §0.1        → PRÓXIMO SLUG
2. grep da linha no catálogo    → categoria + escopo
3. Escreva data/tools/<slug>.json          (§4)  — bloco `en` primeiro, depois os 9
4. Escreva public/assets/tools/<slug>.js   (§5)
5. Escreva os 10 data/content/<slug>/*.md  (§6)
6. Verificação §7 (7 checks)    → tudo limpo?
7. Smoke test §8                → tudo limpo?
8. Commit §10
9. Volte ao passo 1.
```

Passo 6 ou 7 acusou problema → **conserte e re-rode**, não commite quebrado. Se depois de duas
tentativas ainda falhar, pule a tool (não commite nada dela) e vá ao passo 1. Ao final, liste as
tools puladas e o motivo.

## 12. Executando a fila inteira (~177 tools)

Estado atual (jul/2026): o catálogo tem **242 slugs**, **79 tools existem**, **177 pendentes**
(14 das 79 existentes são extras fora do catálogo). Fazer as 177 leva o site a ~256 tools ×
10 idiomas.

Como executar:

- **Ordem**: a do script do §0.1, que é a ordem do catálogo. Não reordene, não escolha "as fáceis
  primeiro". Ordem fixa = fila determinística = retomável por qualquer sessão.
- **Um ciclo por vez.** Nunca abra a próxima tool antes de commitar a atual.
- **Retomada**: o estado é o sistema de arquivos. Sessão nova, contexto zerado, sem histórico —
  roda o script do §0.1 e ele diz exatamente onde parar. Não existe nada para "lembrar".
- **Não pare para reportar progresso a cada tool.** Siga a fila. Se for interrompido, o commit
  mais recente é o ponto de retomada.
- **Não estime, não planeje, não resuma o plano antes de agir.** Execute o §11.

Uma tool certa vale mais que cinco quebradas: se algo do §7 ou §8 falhar, conserte antes de
commitar. Mas "vou fazer só algumas para você revisar" **não é uma opção** — o §7 e o §8 são a
revisão.
