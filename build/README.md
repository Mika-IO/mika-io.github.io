# Free-tools site generator

Data-driven static generator for the mikaio.dev/freetools programmatic-SEO tools
site. Zero runtime dependencies (Node ≥ 18). Turns `data/` + `templates/` +
`public/assets/` into committed static HTML under `public/<lang>/<slug>/`.

250 tools × 10 languages = 2500 pages, all committed and served as-is by GitHub
Pages (CI uploads `public/` and does **not** run the build — see `.github/`).

## Build

```bash
node build/generate.mjs           # build; warns on <1000-word pages / missing strings
node build/generate.mjs --strict  # build; exit 1 if any page <1000 words or a ref is missing
```

`generate.mjs` is the live build. The pages are committed static HTML, so the
site works without it — but any edit to a tool JSON, a content file, a template
or the stylesheet only reaches `public/` when you re-run it. Do not delete it.

Outputs (all committed, served by GitHub Pages):

- `/<lang>/index.html` — localized home per language
- `/<lang>/<slug>/index.html` — each tool, each language
- `freetools.html` — the all-tools index (was `glossary.html`; a redirect stub is
  no longer emitted)
- `sitemap.xml`, `robots.txt`, `llms.txt`

## Layout

```
data/meta.json             langs, categories, site url+brand, root experiment files
data/i18n/<lang>.json       shared chrome strings (nav, footer, category names)
data/tools/<slug>.json      one tool: category, icon, script, widget, per-lang strings
data/content/<slug>/<lang>.md   the >=1000-word body copy (one file per language)
templates/*.html            page shells (tool, home, glossary)
public/assets/tools.css     single shared stylesheet (inlined into every page)
public/assets/tool-runtime.js  shared helpers (copy buttons, etc.)
public/assets/tools/<slug>.js  per-tool calculator logic
```

Remaining build scripts (the one-shot scaffolding generators were removed once
the catalogue was complete; they live in git history):

- `generate.mjs` — the live build (above).
- `translate-mass.mjs` — fills every language gap from English via a keyless
  translation endpoint, with an on-disk cache. See **Translation**.
- `audit-es.mjs` — QA: renders every page in headless Chrome and reports English
  that leaked into a translated widget. See **QA**.

## Add a new tool

1. **`data/tools/<slug>.json`** — set `slug`, `category` (must exist in
   `meta.json`), `icon`, `script` (filename in `public/assets/tools/`), and a
   `widget` HTML string. Every visible label in the widget is a `{{ui.key}}`
   token. Provide `strings.en` only — `title`, `metaDescription`, `h1`, `intro`,
   `faq_title`, a `ui` map (the widget tokens) and a `faq` array. The other nine
   languages are generated (see **Translation**). Reference: `data/tools/bmicalc.json`.
2. **`public/assets/tools/<slug>.js`** — the calculator. Any string the JS writes
   to the DOM at runtime (a button that flips to "Pause", a result label, an
   option list) must go through `T('key','English fallback')`, not a literal, or
   it renders English on a translated page. See **Runtime i18n**. Register each
   such `key` in `strings.en.ui`.
3. **`data/content/<slug>/en.md`** — ≥1000-word English body. Supports `##`/`###`
   headings, paragraphs, `-`/`1.` lists, `**bold**`, `*italic*`, `` `code` `` and
   `[text](url)` links.
4. `node build/translate-mass.mjs` — generates the nine other `strings.<lang>`
   blocks and `<lang>.md` files.
5. `node build/generate.mjs --strict`, then commit `public/` and `data/`.

## Translation

```bash
node build/translate-mass.mjs                 # fill every missing language everywhere
node build/translate-mass.mjs --dry           # report the work, no network
node build/translate-mass.mjs --only=<slug>   # one tool
node build/translate-mass.mjs --phase=strings # strings only (skip markdown bodies)
```

Translation goes through the public `translate.googleapis.com` gtx endpoint (no
key, no account) and is cached on disk in `.cache/` (git-ignored), so a re-run
only pays for new material. It **never overwrites** an existing translation — it
fills gaps: missing `strings.<lang>` blocks, missing `ui`/top-level keys within a
block, and missing `<lang>.md` files. Safe to run repeatedly as tools are added.

Guards learned the hard way, all applied automatically:

- **Literal labels** (`A–Z`, `0–9`, `!@#…`, a `listen`/`silent` anagram demo) are
  detected and copied verbatim instead of translated — otherwise `A–Z` became the
  Cyrillic `А–Я`. A label is literal when it has no run of two or more Latin letters.
- **Capitalization** is matched to English (`fecha` → `Fecha`), because the endpoint
  lower-cases as it pleases.
- **Ambiguous words** must be disambiguated at the English source: `Resume` became
  "CV" and `Fair` became "funfair". Prefer `Continue` / `Medium`.
- **Markdown structure** survives: bodies are translated line by line (newlines are
  preserved verbatim in every language; an inline separator token is not — CJK
  reorders clauses across it). Code spans and link targets are masked first.

## Runtime i18n

`generate.mjs` emits, before each tool script:

```html
<script>window.__LANG="es";window.__T={…ui map…};window.T=function(k,d){return (window.__T&&window.__T[k])||d};</script>
```

So tool JS localizes anything it builds at runtime with `T('key','English')`, and
formats dates/numbers with the page language via `toLocaleString(window.__LANG)`.
Never format with a hardcoded `'en-US'` for display, and never write an English
literal to the DOM.

## CSS variable contract

`public/assets/tools.css` defines the theme in `:root` and a
`prefers-color-scheme: dark` block. Widgets may use:

`--bg --card --ink --muted --line --brand --brand-ink --ok --accent`
and the aliases `--surface --text --red --green`.

Use only these. A widget that invents `var(--whatever, #fff)` falls back to that
hardcoded colour and breaks contrast in the other theme — this is exactly why
`--surface`/`--text` had to be added after the fact.

## Live-data tools

`currencyconverter` and `exchangerate` fetch live rates from the keyless,
CORS-open `open.er-api.com`. Each ships a dated snapshot as an offline fallback
and labels which one is shown ("Live rates · …" vs "Offline snapshot …"). This is
the sanctioned pattern for live data on a static host: fetch when possible, fall
back to a dated snapshot, and never present a stale number as current.

## SEO wiring (automatic per page)

Canonical, full `hreflang` set + `x-default`, Open Graph, `dir="rtl"` for `ar`/`ur`,
and JSON-LD (`WebApplication` + `BreadcrumbList`, plus `FAQPage` when a `faq`
exists) are all emitted by the generator. New tools inherit them with no extra
work. The header language switcher links to the same tool in the target language
(not the home page); the home switcher links between localized homes.

## QA

```bash
cd public && python3 -m http.server 8099    # serve, so tool JS actually runs
node build/audit-es.mjs                      # report English leaking into es widgets
node build/audit-es.mjs --lang=pt            # any language
```

Pages load their scripts by absolute path, so `file://` will not run them — serve
`public/` over HTTP first. The audit renders each page, lets the tool JS run, and
flags English words left in the widget. Words identical across languages (Color,
No, Total) are false positives.

## Notes

- Brand is `meta.site.brand` (`mikaio.dev/freetools`); `meta.site.name` still
  drives `<title>` and JSON-LD.
- Root experiment HTML (`index.html`, `matrix.html`, `miblo/…`) is never modified;
  it is only listed in `sitemap.xml` via `meta.json > rootExperiments`.
```
