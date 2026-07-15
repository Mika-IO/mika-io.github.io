# TAREFA 01 — Traduzir uma tool existente para os 10 idiomas

> Documento auto-contido. Executor: modelo barato (Haiku ou similar).
> Leia inteiro antes de editar qualquer arquivo. Não improvise fora do que está aqui.

## 0. Como esta tarefa funciona (leia isto primeiro)

**A unidade de trabalho é UMA tool.** Um ciclo = 1 tool traduzida nos 10 idiomas, verificada e
commitada. O trabalho é feito **um ciclo de cada vez**, em sequência.

Se o pedido foi "traduza todas as tools que faltam" (são ~76), isso **não** significa segurar 76
tools na cabeça de uma vez. Significa: **repita o ciclo, uma tool por vez, até acabar.** Cada
ciclo termina em commit e é independente. Nada se perde se a sessão morrer no meio — o §11 mostra
como retomar.

### Regras anti-travamento

Proibido — isto faz a tarefa parar sem entregar nada:

- ❌ Não peça confirmação para começar. O escopo está definido aqui.
- ❌ Não proponha "piloto para você revisar antes". A verificação do §7 é a revisão.
- ❌ Não recuse por volume. Você nunca edita 76 tools numa tacada: edita 1, verifica, commita.
- ❌ Não faça duas tools no mesmo ciclo.
- ❌ Não entregue tradução parcial ("fiz 4 idiomas, faço o resto depois"). Ciclo = os 10.

Ciclo que falhar duas vezes: pule a tool, anote o motivo, siga a fila.

## 0.1. Escolhendo o slug do ciclo (você mesmo descobre)

Ninguém precisa te passar o slug. Rode isto e pegue **o primeiro da lista**:

```bash
node -e '
const fs=require("fs");
const langs=JSON.parse(fs.readFileSync("data/meta.json","utf8")).langs.map(l=>l.code);
const pendentes=fs.readdirSync("data/tools").map(f=>f.replace(/\.json$/,"")).filter(slug=>{
  const t=JSON.parse(fs.readFileSync("data/tools/"+slug+".json","utf8"));
  return langs.some(l=>!t.strings[l] || !fs.existsSync("data/content/"+slug+"/"+l+".md"));
});
console.log("pendentes:",pendentes.length);
console.log("PRÓXIMO SLUG:",pendentes[0]);
console.log("fila:",pendentes.slice(0,10).join(" "));
'
```

O estado vem do **sistema de arquivos**. Tool cujo JSON tem os 10 blocos `strings` e cujos 10
`.md` existem está pronta e some da fila sozinha. Não há planilha de progresso para desatualizar.

A tool que você pegar já existe: já tem `data/tools/<slug>.json` com `en` (e normalmente `pt`), já
tem `public/assets/tools/<slug>.js`, e já tem `data/content/<slug>/en.md`. Muitas já têm vários
`.md` traduzidos **sem** o bloco `strings` correspondente — nesse caso o `.md` não se reescreve,
só se acrescenta o bloco que falta.

Se o slug não existir em `data/tools/`, é tool nova → **TAREFA 02**, não esta.

## 1. Os 10 idiomas (lista fechada — nunca invente outro código)

| code | idioma          | dir |
|------|-----------------|-----|
| `en` | Inglês          | ltr |
| `zh` | Chinês mandarim | ltr |
| `hi` | Hindi           | ltr |
| `es` | Espanhol        | ltr |
| `fr` | Francês         | ltr |
| `ar` | Árabe padrão    | rtl |
| `bn` | Bengali         | ltr |
| `pt` | Português (BR)  | ltr |
| `ru` | Russo           | ltr |
| `ur` | Urdu            | rtl |

`ar` e `ur` são RTL, mas **você não escreve nenhuma marcação de RTL**. O gerador já emite
`dir="rtl"` sozinho. Só escreva o texto natural no idioma.

## 2. Exatamente 2 coisas por idioma (nada mais)

Para cada idioma `<lang>` dos 10:

1. **Bloco `strings.<lang>`** dentro de `data/tools/<slug>.json`
2. **Arquivo `data/content/<slug>/<lang>.md`** com ≥ 1000 palavras

Total do PR: **1 arquivo JSON editado + até 10 arquivos .md** (+ o output gerado em `public/`).

## 3. Arquivos que você PODE tocar

```
data/tools/<slug>.json          (SÓ adicionar blocos strings.<lang> faltantes)
data/content/<slug>/<lang>.md   (criar os que faltam)
public/**                       (SÓ via `node build/generate.mjs` — nunca editar à mão)
```

## 4. Arquivos PROIBIDOS (tocar = tarefa reprovada)

```
build/*            templates/*        data/meta.json      data/i18n/*
public/assets/*    src/*              pages/*             miblo/*
index.html na raiz       qualquer outro data/tools/*.json
```

Observação: `src/content/tools/` é uma **cópia morta/legada**. O gerador NÃO lê de lá.
Ignore completamente. Não crie nada em `src/`.

## 5. Regras do bloco `strings.<lang>`

Copie a **forma exata** de `strings.en` do mesmo arquivo. O bloco tem 6 campos, sempre:

```json
"<lang>": {
  "title": "…",
  "metaDescription": "…",
  "h1": "…",
  "intro": "…",
  "faq_title": "…",
  "ui": { "…": "…" },
  "faq": [ { "q": "…", "a": "…" } ]
}
```

Regras duras:

- **`ui` precisa ter EXATAMENTE as mesmas chaves de `strings.en.ui`** — mesma quantidade,
  mesmos nomes, mesma ordem. Traduza só os **valores**. Nunca renomeie, adicione ou remova chave.
  Motivo: o `widget` do JSON referencia `{{ui.chave}}`; chave faltando vira label quebrado na página.
- **`faq` precisa ter o mesmo número de itens de `strings.en.faq`** (normalmente 3).
- `title`: até ~60 caracteres. `metaDescription`: 120–160 caracteres. Ambos precisam conter a
  palavra-chave principal no idioma (ex.: "Calculadora de IMC", "حاسبة مؤشر كتلة الجسم").
- Números, fórmulas, unidades e faixas de valores são **idênticos** ao `en`. Traduzir texto,
  nunca alterar matemática. Se o `en` diz `18.5`, o `pt` diz `18,5` (só a vírgula decimal local),
  **não** `18.6`.
- Não traduza: `mikaio.dev`, nomes de formato (`JSON`, `Base64`, `UTM`, `QR`), siglas que o idioma
  já usa em inglês. Use a sigla local quando ela existir de fato (`BMI` → `IMC` em pt/es, `ИМТ` em ru).
- Se você não tem certeza do termo técnico no idioma, **mantenha o termo em inglês**.
  Nunca invente uma palavra.
- JSON válido: aspas escapadas, sem vírgula sobrando, sem comentário.

### Qualidade da tradução (o README do projeto exige isso)

> "Be very careful with translations so they don't sound robotic or nonsensical."

Escreva como falante nativo escreveria do zero. Reordene a frase se o idioma pedir. É
**proibido** traduzir palavra-por-palavra do inglês. Se o resultado soa como Google Tradutor,
está errado.

Use `data/tools/bmicalc.json` como **referência de qualidade** — ele tem os 10 idiomas prontos
e bem escritos. Leia o bloco do idioma que você vai escrever antes de escrever.

## 6. Regras do arquivo `data/content/<slug>/<lang>.md`

### 6.1 Tamanho — a regra que mais reprova

Mínimo **1000 palavras** contadas pelo gerador (corpo + FAQ juntos).
**Escreva mirando 1150–1250 palavras** para ter margem.

Para `zh` (chinês), o gerador conta **cada ideograma como 1 palavra**. Mire em
**1200–1400 caracteres chineses**.

### 6.2 Markdown suportado (subset — o resto quebra)

Permitido, e só isso:

```
## Título de seção
### Subtítulo
Parágrafo normal.
- item de lista
1. item numerado
**negrito**  *itálico*  `código`
[texto](https://url)
```

**PROIBIDO** (o parser do projeto não entende e a página sai quebrada):
tabelas, imagens, HTML cru, blocos de código com ``` , blockquote `>`, `# H1`
(o H1 vem do `strings.<lang>.h1`), notas de rodapé, checkbox.

Não use links externos. Se o `en.md` não tem link, o seu também não tem.

### 6.3 Conteúdo

- Mesma **estrutura de seções** do `en.md` (mesmos `##`), texto **reescrito no idioma**, não
  traduzido ao pé da letra. Adaptar exemplos ao contexto local é bem-vindo (moeda, unidade,
  cidade), desde que não contradiga a lógica da tool.
- **Zero fatos inventados.** Sem estatística sem fonte, sem "estudos mostram que", sem citar
  órgão/autoridade que você não confirmou, sem número inventado. Se o `en.md` não afirma, você
  não afirma.
- Nada de alucinação de funcionalidade: descreva **só o que o widget realmente faz**. Abra
  `data/tools/<slug>.json` (campo `widget`) e `public/assets/tools/<slug>.js` e descreva aquilo.
  Se a tool não exporta CSV, não escreva que exporta CSV.
- Sempre reforce o argumento de privacidade (roda 100% no navegador, nada é enviado) — é verdade
  neste projeto e é bom para SEO.

## 7. Verificação obrigatória (rode; não pule)

```bash
# 1. JSON é válido?
node -e "JSON.parse(require('fs').readFileSync('data/tools/<slug>.json','utf8')); console.log('JSON OK')"

# 2. Os 10 idiomas existem, com ui/faq batendo com o inglês e o .md no lugar?
node -e "
const fs=require('fs');
const SLUG='<slug>';
const langs=JSON.parse(fs.readFileSync('data/meta.json','utf8')).langs.map(l=>l.code);
const t=JSON.parse(fs.readFileSync('data/tools/'+SLUG+'.json','utf8'));
const base=Object.keys(t.strings.en.ui).sort().join(',');
const nFaq=t.strings.en.faq.length;
let bad=0;
for(const l of langs){
  const s=t.strings[l];
  if(!s){ console.log('✗ falta strings.'+l); bad++; continue; }
  if(Object.keys(s.ui||{}).sort().join(',')!==base){ console.log('✗ ui divergente em',l); bad++; }
  if((s.faq||[]).length!==nFaq){ console.log('✗ faq com tamanho errado em',l); bad++; }
  for(const f of ['title','metaDescription','h1','intro','faq_title'])
    if(!s[f]){ console.log('✗ campo',f,'faltando em',l); bad++; }
  if(!fs.existsSync('data/content/'+SLUG+'/'+l+'.md')){ console.log('✗ falta data/content/'+SLUG+'/'+l+'.md'); bad++; }
}
console.log(bad?('✗ '+bad+' problema(s)'):'✓ 10 idiomas completos');"

# 3. Contagem de palavras por idioma (mesmo algoritmo do gerador)
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

# 4. Build — nenhum aviso pode citar o seu slug
node build/generate.mjs 2>&1 | grep "<slug>"    # saída esperada: VAZIA
```

O passo 4 é o portão final. Se aparecer `strings:<slug>/xx` → falta bloco de idioma.
Se aparecer `xx/<slug> = 940w` → o .md daquele idioma está curto: **escreva mais texto útil**
(nova seção `##`, novo caso de uso, novo item de FAQ no corpo). Nunca encha linguiça repetindo
frase, nunca cole parágrafo duplicado — Google pune e o objetivo é ser útil.

Ignore avisos de **outros** slugs: o repositório hoje tem pendências antigas, elas não são suas.

```bash
# 5. Diff limpo?
git status --short
# só pode aparecer: data/tools/<slug>.json, data/content/<slug>/*.md e arquivos de public/
```

## 8. Definition of Done

- [ ] `data/tools/<slug>.json` tem os 10 blocos `strings` (`en zh hi es fr ar bn pt ru ur`)
- [ ] Toda `ui` tem as mesmas chaves de `en`; todo `faq` tem o mesmo tamanho de `en`
- [ ] `data/content/<slug>/<lang>.md` existe para os 10, cada um ≥ 1000 palavras (zh ≥ 1200 chars)
- [ ] `node build/generate.mjs | grep <slug>` sai vazio
- [ ] `git status` só mostra os arquivos permitidos
- [ ] Nenhum arquivo da lista do §4 foi tocado

## 9. Commit (fecha o ciclo)

Uma tool por commit. **Commite antes de pegar a próxima** — é isso que torna a fila retomável.

```bash
git add data/tools/<slug>.json data/content/<slug>/ public/
git commit -m "i18n(<slug>): traduz tool para os 10 idiomas"
```

## 10. O ciclo, do começo ao fim

```
1. Rode o script do §0.1                   → PRÓXIMO SLUG
2. Leia strings.en do JSON e o en.md       → gabarito (chaves de ui, nº de faq, seções)
3. Acrescente os blocos strings.<lang> que faltam   (§5)
4. Escreva os data/content/<slug>/<lang>.md que faltam  (§6)
5. Verificação §7 (5 checks)               → tudo limpo?
6. Commit §9
7. Volte ao passo 1.
```

Passo 5 acusou problema → conserte e re-rode. Não commite quebrado. Falhou duas vezes → pule a
tool (não commite nada dela) e volte ao passo 1.

## 11. Executando a fila inteira (~76 tools)

Estado atual (jul/2026): 79 tools existem. `en` e `pt` têm strings completas nas 79. Os outros 8
idiomas têm strings em **apenas 3 tools**. Ou seja: **~76 tools esperando esta tarefa**.

Muitas já têm o `.md` traduzido mas **não** o bloco `strings` — hoje essas páginas saem com corpo
traduzido e título/botões/FAQ em inglês. É o bug mais visível do site e esta tarefa o conserta.

Como executar:

- **Ordem**: a do script do §0.1 (alfabética de `data/tools/`). Não reordene.
- **Um ciclo por vez.** Nunca abra a próxima tool antes de commitar a atual.
- **Retomada**: o estado é o sistema de arquivos. Sessão nova, contexto zerado — roda o script do
  §0.1 e ele diz onde parar. Não há nada para "lembrar".
- **Não pare para reportar progresso a cada tool.** Siga a fila. Se for interrompido, o commit mais
  recente é o ponto de retomada.
- **Não planeje nem resuma o plano antes de agir.** Execute o §10.

Uma tool certa vale mais que cinco quebradas — mas "vou fazer só algumas para você revisar" **não
é uma opção**: o §7 é a revisão.
