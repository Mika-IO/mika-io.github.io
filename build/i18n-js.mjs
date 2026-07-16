#!/usr/bin/env node
/**
 * i18n-js.mjs
 * Moves user-visible English out of tool JS and into the translated ui map.
 *
 * Each tool page ships window.T(key, fallback) with its own localized ui strings
 * (emitted by generate.mjs). This rewrites `'Pause'` into `T('pause','Pause')`
 * and registers the key in strings.en.ui, so translate-mass fills the other nine
 * languages on its next run.
 *
 * The literal list is explicit per tool on purpose. An automatic sweep would also
 * rewrite localStorage keys ('todolist_v1'), CSS ('linear-gradient(') and format
 * notation ('HEX'), none of which are prose.
 *
 *   node build/i18n-js.mjs --dry
 *   node build/i18n-js.mjs
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const p = (...s) => join(ROOT, ...s);
const DRY = process.argv.includes('--dry');

// slug -> [ [english literal, ui key] ]
// Key names follow whatever the tool JSON already uses where one exists.
const SPEC = {
  countdowntimer: [['Resume', 'resume'], ['Pause', 'pause'], ['Start', 'start']],
  pomodoropro: [['▶ Start', 'startbtn'], ['⏸ Pause', 'pausebtn'], ['Focus session', 'focussession'],
    ['Break time', 'breaktime'], ['Sessions today: ', 'sessionstoday'], [' · Focus: ', 'focuslabel'], [' min', 'minshort']],
  durationcalc: [['Years', 'years'], ['Months', 'months'], ['Weeks', 'weeks'], ['Days', 'days'],
    ['Hours', 'hours'], ['Minutes', 'minutes'], ['Seconds', 'seconds']],
  sentencecounter: [['Characters (no spaces)', 'charsnospaces'], ['Characters', 'characters'], ['Words', 'words'],
    ['Sentences', 'sentences'], ['Paragraphs', 'paragraphs'], ['Lines', 'lines'], ['Avg words/sentence', 'avgwords']],
  ipinfo: [['IP Address', 'ipaddress'], ['City', 'city'], ['Region', 'region'], ['Country', 'country'],
    ['Timezone', 'timezone'], ['ISP/Org', 'isporg'], ['Latitude', 'latitude'], ['Longitude', 'longitude']],
  studyplanner: [['Days remaining', 'daysremaining'], ['Total hours', 'totalhours'], ['Available', 'available'],
    ['Daily target', 'dailytarget'], [' hrs/day', 'hrsperday'], [' hrs', 'hrs']],
  weeknumber: [['Week ', 'weeklabel']],
  leapyear: [[' is a leap year ✓', 'isleap'], [' is not a leap year', 'isnotleap'], ['Next leap year: ', 'nextleap']],
  utmbuilder: [['Copied!', 'copied'], ['Copy link', 'copylink']],
  gradientgen: [['Copied!', 'copied'], ['Copy CSS', 'copycss']],
  areacalc: [['Width (w)', 'width'], ['Height (h)', 'height'], ['Radius (r)', 'radius'], ['Base (b)', 'base'],
    ['Side (s)', 'side'], ['Base 1 (a)', 'base1'], ['Base 2 (b)', 'base2'], [' square units', 'squareunits']],
  cronbuilder: [['Invalid expression', 'invalidexpr']],
  tiktokcharcount: [['less than a minute', 'lessthanminute'], [' min read', 'minread'],
    ['Hashtags: ', 'hashtagslabel'], ['Words: ', 'wordslabel']],
  passwordgen: [['Select at least one type', 'selecttype'], ['Weak', 'weak'], ['Fair', 'fair'],
    ['Very strong', 'verystrong'], ['Strong', 'strong']],
};

// Prose welded inside an HTML string cannot be matched as a standalone literal,
// so these carry the exact surrounding markup and break out of it explicitly.
// slug -> [ [verbatim source fragment, replacement, ui key, english] ]
const RAW = {
  ipinfo: [[
    `'<p>Could not fetch IP info. Check your connection.</p>'`,
    `'<p>'+T('fetchfailed','Could not fetch IP info. Check your connection.')+'</p>'`,
    'fetchfailed', 'Could not fetch IP info. Check your connection.']],
  bodyfat: [[
    `[['height','Height ('+unit+')'],['neck','Neck ('+unit+')'],['waist','Waist ('+unit+')']]`,
    `[['height',T('height','Height')+' ('+unit+')'],['neck',T('neck','Neck')+' ('+unit+')'],['waist',T('waist','Waist')+' ('+unit+')']]`,
    'height', 'Height'],
    [`['hip','Hip ('+unit+')']`, `['hip',T('hip','Hip')+' ('+unit+')']`, 'hip', 'Hip']],
  unixepoch: [[
    `utcEl.textContent = d.toUTCString();`,
    `utcEl.textContent = d.toLocaleString(window.__LANG||undefined,{timeZone:'UTC',dateStyle:'medium',timeStyle:'medium'})+' UTC';`,
    'utcnote', 'UTC'],
    [`utcEl.textContent='Invalid'`, `utcEl.textContent=T('invalid','Invalid')`, 'invalid', 'Invalid']],
  habittracker: [[
    `'<p style="opacity:0.6">No habits yet. Add one above!</p>'`,
    `'<p style="opacity:0.6">'+T('nohabits','No habits yet. Add one above!')+'</p>'`,
    'nohabits', 'No habits yet. Add one above!']],
  todolist: [[
    `'<p style="opacity:0.6">No tasks here.</p>'`,
    `'<p style="opacity:0.6">'+T('notasks','No tasks here.')+'</p>'`,
    'notasks', 'No tasks here.']],
  colorconverter: [[
    `'<p style="color:var(--red,#ef4444)">Invalid color</p>'`,
    `'<p style="color:var(--red,#ef4444)">'+T('invalidcolor','Invalid color')+'</p>'`,
    'invalidcolor', 'Invalid color']],
};

let jsChanged = 0, jsonChanged = 0, keysAdded = 0, misses = [];

for (const [slug, edits] of Object.entries(RAW)) {
  const jsonPath = p('data/tools', `${slug}.json`);
  const tool = JSON.parse(readFileSync(jsonPath, 'utf8'));
  const jsPath = p('public/assets/tools', tool.script || `${slug}.js`);
  let js = readFileSync(jsPath, 'utf8');
  const before = js;
  tool.strings.en.ui = tool.strings.en.ui || {};
  for (const [from, to, key, english] of edits) {
    if (!js.includes(from)) { misses.push(`${slug}: raw fragment not found`); continue; }
    js = js.split(from).join(to);
    if (tool.strings.en.ui[key] === undefined) { tool.strings.en.ui[key] = english; keysAdded++; }
  }
  if (js !== before && !DRY) {
    writeFileSync(jsPath, js);
    writeFileSync(jsonPath, JSON.stringify(tool, null, 2) + '\n');
  }
  if (js !== before) { jsChanged++; jsonChanged++; }
}

for (const [slug, pairs] of Object.entries(SPEC)) {
  const jsonPath = p('data/tools', `${slug}.json`);
  if (!existsSync(jsonPath)) { misses.push(`${slug}: no tool json`); continue; }
  const tool = JSON.parse(readFileSync(jsonPath, 'utf8'));
  const jsPath = p('public/assets/tools', tool.script || `${slug}.js`);
  if (!existsSync(jsPath)) { misses.push(`${slug}: no js`); continue; }

  let js = readFileSync(jsPath, 'utf8');
  const before = js;
  tool.strings.en.ui = tool.strings.en.ui || {};

  for (const [text, key] of pairs) {
    // Match the literal in single, double or back quotes, but never when it is
    // already wrapped in a T() call from an earlier run.
    const esc = text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`(?<!T\\(['"\`][^'"\`]*['"\`],\\s*)(['"\`])${esc}\\1`, 'g');
    let hit = 0;
    js = js.replace(re, (m, q) => { hit++; return `T(${q}${key}${q},${q}${text}${q})`; });
    if (!hit) { misses.push(`${slug}: literal ${JSON.stringify(text)} not found`); continue; }
    if (tool.strings.en.ui[key] === undefined) { tool.strings.en.ui[key] = text; keysAdded++; }
  }

  if (js !== before) {
    if (!DRY) writeFileSync(jsPath, js);
    jsChanged++;
    if (!DRY) writeFileSync(jsonPath, JSON.stringify(tool, null, 2) + '\n');
    jsonChanged++;
  }
}

console.log(`${DRY ? 'would rewrite' : 'rewrote'}: ${jsChanged} js, ${jsonChanged} tool json, ${keysAdded} new en ui keys`);
if (misses.length) { console.log('\nnot applied:'); misses.forEach((m) => console.log('  ' + m)); }
console.log('\nnext: node build/translate-mass.mjs --phase=strings   (fills the new keys in 9 languages)');
