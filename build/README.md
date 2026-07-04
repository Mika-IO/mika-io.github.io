# Free-tools site generator

Data-driven static generator for the mikaio.dev programmatic-SEO tools site.
Zero runtime dependencies (Node ≥ 18). Turns `data/` + `templates/` + `assets/`
into committed static HTML under `/<lang>/<slug>/`.

## Build

```bash
node build/generate.mjs           # build; warns on <1000-word pages / missing strings
node build/generate.mjs --strict  # build; exit 1 if any page <1000 words or a ref is missing
```

Outputs (all committed, served by GitHub Pages):

- `/<lang>/index.html` — localized home per language
- `/<lang>/<slug>/index.html` — each tool, each language
- `sitemap.xml`, `robots.txt`, `llms.txt`, `glossary.html`

## Layout

```
data/meta.json            langs, categories, site url, root experiment files
data/i18n/<lang>.json      shared chrome strings (nav, footer, category names)
data/tools/<slug>.json     one tool: category, icon, script, widget, per-lang strings
data/content/<slug>/<lang>.md   the >=1000-word body copy (one file per language)
templates/*.html           page shells (tool, home, glossary)
assets/tools.css           single shared stylesheet (inlined into every page)
assets/tool-runtime.js      shared helpers (copy buttons, etc.)
assets/tools/<slug>.js      per-tool calculator logic
```

## Add a new tool (repeat for all ~250)

1. **`data/tools/<slug>.json`** — set `slug`, `category` (must exist in meta.json),
   `icon`, `script` (filename in `assets/tools/`), and a `widget` HTML string.
   Inside the widget, use `{{ui.key}}` tokens for every visible label. Add a
   `strings.<lang>` block for all 10 langs with `title`, `metaDescription`, `h1`,
   `intro`, `faq_title`, a `ui` map (the widget tokens), and a `faq` array. See
   `data/tools/bmicalc.json` as the reference.
2. **`assets/tools/<slug>.js`** — the calculator. Read localized labels from
   `data-*` attributes on the widget (see `bmicalc.js`) so the JS stays language-neutral.
3. **`data/content/<slug>/<lang>.md`** — ≥1000-word body, one file per language.
   Supports `##`/`###` headings, paragraphs, `-`/`1.` lists, `**bold**`, `*italic*`,
   `` `code` ``, and `[text](url)` links.
4. Run `node build/generate.mjs`. Fix any word-count / missing-ref warnings, then
   re-run with `--strict` before committing.

## SEO wiring (automatic per page)

Canonical, full `hreflang` set + `x-default`, Open Graph, `dir="rtl"` for `ar`/`ur`,
and JSON-LD (`WebApplication` + `BreadcrumbList`, plus `FAQPage` when a `faq` exists)
are all emitted by the generator. New tools inherit them with no extra work.

## Notes

- No external runtime calls: GitHub Pages is static. Tools needing live data
  (currency, crypto, etc.) must ship a static snapshot with a dated note.
- Root experiment HTML (`index.html`, `matrix.html`, `miblo/…`) is never modified;
  it is only listed in `sitemap.xml` via `meta.json > rootExperiments`.
```
