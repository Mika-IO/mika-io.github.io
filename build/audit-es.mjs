#!/usr/bin/env node
/**
 * audit-es.mjs
 * Loads every built Spanish tool page in headless Chrome, lets the tool's own JS
 * run, and reports English that leaked into the rendered widget.
 *
 * The static scan of the JS source only catches direct `x.textContent = 'Start'`
 * assignments. This catches whatever actually reaches the screen: option lists
 * built in JS, default results, placeholder output, en-US date formatting.
 *
 *   node build/audit-es.mjs            # all tools
 *   node build/audit-es.mjs --lang=pt  # another language
 *   node build/audit-es.mjs --only=x
 */
import { readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const exec = promisify(execFile);
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const p = (...s) => join(ROOT, ...s);
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
// Pages load /assets/... with absolute paths, so file:// resolves them outside the
// project and the tool JS never runs. Serve public/ over HTTP and audit that.
const BASE = process.env.AUDIT_BASE || 'http://127.0.0.1:8099';

const argv = process.argv.slice(2);
const flag = (n, d) => { const a = argv.find((x) => x.startsWith(`--${n}=`)); return a ? a.split('=')[1] : d; };
const LANG = flag('lang', 'es');
const ONLY = flag('only');
const TMP = flag('out', '/tmp/audit-es');

// Words that are unmistakably English UI, not proper nouns and not shared with
// Spanish. Kept tight on purpose: a false positive costs more review time than
// a missed one, and the obvious leaks all use this vocabulary.
const EN_WORDS = /\b(Start|Pause|Resume|Stop|Reset|Clear|Copied|Copy|Weak|Fair|Strong|Invalid|Error|Select|Enter|Please|Loading|Failed|Success|Done|Try again|Days?|Hours?|Minutes?|Seconds?|Weeks?|Months?|Years?|Add|Remove|Delete|Save|Submit|Search|Next|Previous|Back|Close|Show|Hide|Yes|No|None|Total|Result|Average|Score|Time|Date|Name|Value|Length|Width|Height|Size|Color|Random|Generate|Calculate|Convert|Download|Upload|Choose|Click|Type|Word|Words|Character|Characters|Line|Lines|Item|Items|Empty|Unknown|Untitled|and|the|with|your|from|for)\b/g;
// Months/short dates from Intl 'en-US' formatting.
const EN_DATE = /\b(Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b|\b(AM|PM)\b/g;

const slugs = readdirSync(p('data/tools'))
  .filter((f) => f.endsWith('.json'))
  .map((f) => f.replace(/\.json$/, ''))
  .filter((s) => !ONLY || s === ONLY);

mkdirSync(TMP, { recursive: true });

// Pull the rendered widget out of the dumped DOM and strip tags/attributes, so
// class names and ids never count as English prose.
function widgetText(html) {
  const m = html.match(/<section class="widget" id="tool">([\s\S]*?)<\/section>/);
  if (!m) return '';
  return m[1]
    .replace(/<(script|style)[\s\S]*?<\/\1>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function dump(slug) {
  const file = p('public', LANG, slug, 'index.html');
  if (!existsSync(file)) return null;
  const url = `${BASE}/${LANG}/${slug}/`;
  const out = join(TMP, `${slug}.html`);
  try {
    const { stdout } = await exec(CHROME, [
      '--headless', '--disable-gpu', '--no-sandbox', '--hide-scrollbars',
      '--virtual-time-budget=1500', '--dump-dom', url,
    ], { maxBuffer: 64 * 1024 * 1024, timeout: 30000 });
    writeFileSync(out, stdout);
    return stdout;
  } catch (err) {
    return null;
  }
}

const findings = [];
let done = 0;

async function audit(slug) {
  const html = await dump(slug);
  if (html === null) { findings.push({ slug, kind: 'render-failed', hits: [] }); return; }
  const text = widgetText(html);
  const en = [...new Set(text.match(EN_WORDS) || [])];
  const dates = [...new Set(text.match(EN_DATE) || [])];
  if (en.length || dates.length) {
    findings.push({ slug, kind: 'english-in-widget', hits: [...en, ...dates], sample: text.slice(0, 120) });
  }
  if (++done % 25 === 0) console.log(`  …${done}/${slugs.length}`);
}

// Chrome is the bottleneck; a few at a time keeps the machine responsive.
const N = 4;
let cursor = 0;
await Promise.all(Array.from({ length: N }, async () => {
  while (cursor < slugs.length) await audit(slugs[cursor++]);
}));

findings.sort((a, b) => b.hits.length - a.hits.length);
console.log(`\n${LANG}: ${findings.length} of ${slugs.length} tools show English in the rendered widget\n`);
for (const f of findings) {
  console.log(`${f.slug.padEnd(22)} ${f.kind === 'render-failed' ? 'RENDER FAILED' : f.hits.join(' ')}`);
}
writeFileSync(join(TMP, 'findings.json'), JSON.stringify(findings, null, 2));
console.log(`\nfull report: ${join(TMP, 'findings.json')}`);
