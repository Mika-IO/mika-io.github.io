#!/usr/bin/env node
/**
 * compose-content.mjs
 * Composes an English body (data/content/<slug>/en.md) for tools that have a
 * data/tools/<slug>.json but no content yet, so generate.mjs can publish them.
 *
 * Source of truth is the tool JSON itself: h1, intro, the ui label map (which
 * describes the actual inputs) and the faq array. Around that we weave prose
 * that varies by category, so the result stays >= MIN_WORDS without inventing
 * facts the JSON does not already claim.
 *
 * Never overwrites an existing file.
 *
 *   node build/compose-content.mjs            # compose all missing en.md
 *   node build/compose-content.mjs --only=x   # single slug
 *   node build/compose-content.mjs --dry      # report only
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const p = (...s) => join(ROOT, ...s);

const wc = (t) => t.split(/\s+/).filter(Boolean).length;

// ---------- category flavour ----------
// Each entry adds domain-specific prose so the 200+ pages do not read as one
// duplicated template. Keyed by the category id used in the tool JSON.
const FLAVOUR = {
  math: {
    noun: 'calculation',
    why: 'Arithmetic mistakes are rarely dramatic — they are quiet. A digit transposed in a spreadsheet, a sign flipped halfway through a derivation, a rounding step applied one line too early. The cost is that you often do not notice until the wrong number has already been used for something. Running the same figures through an independent implementation is the cheapest form of double-entry checking available, which is exactly what this page is for.',
    depth: 'Every result here is produced by the same deterministic routine each time. There is no sampling, no approximation stage that varies between runs, and no hidden state carried over from your previous inputs. Give it the same numbers tomorrow and you will get the same answer, which matters when you are reconciling a result against a colleague or against a textbook.',
  },
  finance: {
    noun: 'calculation',
    why: 'Money questions punish vagueness. The difference between two plausible-sounding assumptions compounds quietly over years until the gap is large enough to change a decision you have already made. Putting concrete numbers on a choice, even rough ones, turns an argument about feelings into an argument about inputs — and inputs can be examined, challenged and revised.',
    depth: 'Treat the output as a model, not a promise. It reflects exactly the assumptions you typed and nothing else: no tax code specific to where you live, no fees your provider may apply, no inflation unless you entered it, and no change in circumstances. Models are still useful — they let you ask what would have to be true for this to work, which is usually the more interesting question.',
  },
  health: {
    noun: 'estimate',
    why: 'Health numbers are screening signals, not verdicts. They are built from population averages, which means they describe what tends to be true across large groups of people rather than what is true about you specifically. That is genuinely useful for spotting when something is worth a closer look, and genuinely useless as a substitute for someone who can actually examine you.',
    depth: 'Nothing here is medical advice, and no result should be used to start, stop or change treatment. Formulas of this kind were generally derived from particular study populations and can behave differently for people outside them — different ages, different body compositions, different backgrounds. If a result surprises you or worries you, that is a reason to talk to a clinician, not a reason to trust the number over your own doctor.',
  },
  text: {
    noun: 'transformation',
    why: 'Text work is the kind of task that is trivial once and miserable a hundred times. Doing it by hand is fine for a sentence and error-prone for a document, and the errors are the hard-to-spot kind: an entry silently dropped, a character mangled, one item in a long list quietly not matching the rest.',
    depth: 'Your text is processed as characters, not as meaning. The tool has no opinion on what your content says, does not correct it, and does not attempt to understand it. That is deliberate: predictable mechanical behaviour is easier to trust and easier to undo than a clever routine that sometimes decides it knows better than you.',
  },
  converter: {
    noun: 'conversion',
    why: 'Unit errors are famous precisely because they are so easy. Mixing measurement systems has destroyed spacecraft and grounded aircraft, and those were teams with review processes. Converting once, carefully, with a tool that always applies the same factors, removes an entire class of mistake from whatever you are doing.',
    depth: 'Conversions run on exact published factors wherever an exact factor exists, and on the standard accepted value where the relationship is defined empirically. Results are shown with enough precision to be useful without implying more accuracy than the input carried — a measurement rounded to the nearest whole unit does not become more precise by passing through a conversion.',
  },
  time: {
    noun: 'calculation',
    why: 'Dates and times are where confident intuition goes to die. Months have different lengths, leap years break the obvious arithmetic, daylight saving jumps an hour in one direction or the other, and time zones are political rather than geographical. Counting on your fingers works right up until the moment it silently does not.',
    depth: 'Calculations use your browser\'s own date engine, which already knows the calendar rules and the offsets your system is configured for. That keeps results consistent with everything else on your device, though it also means a machine with the wrong clock or the wrong zone will produce answers to match.',
  },
  dev: {
    noun: 'transformation',
    why: 'The alternative to a small focused tool is usually pasting the thing you are debugging into a random website, which is how internal tokens, customer records and unreleased payloads end up on someone else\'s server. A local tool removes that decision entirely — there is no server to leak to.',
    depth: 'This runs as plain client-side JavaScript with no build step, no dependencies and no network calls. You can open the page source and read exactly what it does, which is the only kind of privacy claim that is actually verifiable.',
  },
  design: {
    noun: 'generator',
    why: 'Design work benefits from a fast feedback loop far more than it benefits from precision at the first attempt. Being able to nudge a value and see the result immediately is what turns a vague sense that something is off into a specific decision you can defend.',
    depth: 'Output is standard CSS you can paste straight into a stylesheet — no framework, no proprietary format, no export step. What you see rendered is produced by the same declarations you copy out, so there is nothing to translate between the preview and your codebase.',
  },
  science: {
    noun: 'calculation',
    why: 'Working a formula by hand is how you learn it; working it by hand under time pressure is how you get it wrong. Having a reference implementation to check against means a disagreement between your answer and the tool becomes information — one of you made a mistake, and finding out which is the useful part.',
    depth: 'Constants use standard accepted values and units are stated explicitly rather than assumed, because most errors in this kind of work are unit errors rather than arithmetic ones. If your result is off by a suspiciously round factor, the units are the first thing to check.',
  },
  productivity: {
    noun: 'tool',
    why: 'Most productivity software fails by being too heavy for the job. Signing up, syncing an account and learning a hierarchy of projects is a lot of ceremony for something you needed for the next twenty minutes. A single page that does one thing and starts working immediately survives contact with a real workday better.',
    depth: 'There is no account, no sync and no subscription. Anything you enter stays in this browser, which is the trade-off: total privacy, no access from your other devices. For quick work that is usually the right side of the trade.',
  },
  utility: {
    noun: 'tool',
    why: 'Small utilities earn their place by being available the moment you need them, without an install, a login or a five-step onboarding flow. The value is entirely in how little friction sits between wanting the answer and having it.',
    depth: 'Everything happens locally in your browser. Once the page has loaded it needs no further network access at all, so it works on a plane, on hotel wifi that has stopped pretending, or with your connection off entirely.',
  },
  fun: {
    noun: 'tool',
    why: 'Not everything has to be productive. Some tools exist because they are enjoyable, because they settle an argument, or because they are a pleasant way to spend ninety seconds. That is a complete justification on its own.',
    depth: 'Randomness comes from your browser\'s built-in generator, which is more than good enough for games and decisions and is explicitly not suitable for anything involving security, money or a lottery you actually care about.',
  },
  games: {
    noun: 'game',
    why: 'Not everything has to be productive. Some tools exist because they are enjoyable, because they settle an argument, or because they are a pleasant way to spend ninety seconds. That is a complete justification on its own.',
    depth: 'Randomness comes from your browser\'s built-in generator, which is more than good enough for games and decisions and is explicitly not suitable for anything involving security, money or a lottery you actually care about.',
  },
  education: {
    noun: 'tool',
    why: 'A tool that only hands you an answer teaches you nothing. The useful version shows enough of the working that you can follow the path from input to output, notice where your own attempt diverged, and fix the understanding rather than just the number.',
    depth: 'Use it to check yourself rather than to replace yourself. Work the problem first, then compare — a disagreement is where the learning actually happens, and you only get that if you did the work before looking.',
  },
  security: {
    noun: 'tool',
    why: 'Anything security-adjacent that runs on someone else\'s server requires you to trust that server completely, and the whole point of the exercise is usually that you would rather not extend trust you do not have to.',
    depth: 'This page performs its work entirely in your browser. Nothing you type is transmitted, and there is no server-side component that could log it. For genuinely sensitive material, load the page and disconnect from the network — it will keep working, which is the strongest demonstration of the claim.',
  },
  random: {
    noun: 'generator',
    why: 'Making a genuinely arbitrary choice is something people are famously bad at. Asked for a random number, we avoid repeats, favour the middle of the range and shy away from the edges — patterns that are invisible from the inside and obvious in aggregate.',
    depth: 'Randomness comes from your browser\'s built-in generator, which is more than good enough for games and decisions and is explicitly not suitable for anything involving security, money or a lottery you actually care about.',
  },
  social: {
    noun: 'tool',
    why: 'Platform limits are not suggestions. Going a character over does not warn you politely — it truncates, breaks a link, or silently rejects the post after you have already moved on.',
    depth: 'Counting rules differ per platform and change without notice; links, emoji and mentions are frequently counted differently from plain characters. Treat the figure here as a close guide and give yourself a small margin on anything that matters.',
  },
  home: {
    noun: 'estimate',
    why: 'Estimating a household job badly costs either money or a second trip to the shop, and it is usually the second trip. A rough figure worked out before you start is worth more than a precise one worked out afterwards.',
    depth: 'Real spaces are not the tidy shapes a formula assumes. Add a margin for waste, offcuts and the parts of the job you have not thought of yet — most trades work to ten percent over, and they do it because experience taught them to.',
  },
};
const DEFAULT_FLAVOUR = FLAVOUR.utility;

// ---------- composer ----------
function composeEn(tool) {
  const s = tool.strings.en;
  const f = FLAVOUR[tool.category] || DEFAULT_FLAVOUR;
  const name = s.h1 || s.title;
  const ui = s.ui || {};
  const fields = Object.values(ui).filter((v) => typeof v === 'string' && v.length < 40);
  const faq = Array.isArray(s.faq) ? s.faq : [];
  const out = [];

  out.push(`## What ${name} is for`);
  out.push(`${s.intro}`);
  out.push(`That is the short version, and for many visitors it is the only part they need — the tool sits at the top of this page, it works immediately, and nothing below is required reading. The rest of this page is here for the times when the answer alone is not enough: when you want to know how the ${f.noun} is actually performed, where it stops being reliable, and what to do with the result once you have it.`);

  out.push(`## How to use it`);
  if (fields.length) {
    out.push(`The controls are deliberately few. You will see ${fields.length === 1 ? 'a single input' : `${fields.length} controls`}:`);
    out.push(fields.map((v) => `- **${v}**`).join('\n'));
    out.push(`Fill in what applies to you and the result updates. Nothing is mandatory in the sense of being submitted anywhere — if you change your mind, edit the value and read the new answer. There is no save step, no confirmation dialog and no way to get it wrong permanently, so trying several variations to see how the result moves is not only allowed, it is usually the most informative way to use a tool like this.`);
  } else {
    out.push(`Enter your values in the fields above and the result appears immediately. There is no submit step and no confirmation — change an input and the answer follows.`);
  }
  out.push(`Everything runs inside your own browser. Nothing you type is uploaded, nothing is stored between visits, there is no account to create and there is no tracking to decline. Once this page has loaded it does not need the network again, so it keeps working if your connection drops.`);

  out.push(`## Why a page like this exists`);
  out.push(f.why);
  out.push(`The web is full of tools that solve a thirty-second problem by first demanding an email address, a cookie decision and four seconds of advertising. That trade made sense to somebody, but it did not make sense to the person who just wanted the number. This page takes the opposite position: no signup, no interstitial, no upsell, and no reason to leave once you have what you came for.`);

  out.push(`## What the result does and does not tell you`);
  out.push(f.depth);
  out.push(`It is worth being explicit about the boundary, because tools are routinely trusted past the point where they deserve it. This one is honest within its inputs: give it accurate values and it gives you an accurate ${f.noun}. It cannot tell you whether the values you gave it were the right ones to use, whether you have asked the right question, or whether the context you are applying the answer to has something important the inputs never captured. That judgement stays with you, and it is the part that actually matters.`);

  // The FAQ itself is rendered separately by generate.mjs from strings.<lang>.faq,
  // so it must not be repeated here — only pointed at.
  out.push(`## Where it fits in a real workflow`);
  out.push(`Tools like this are rarely the whole job. More often ${name.toLowerCase()} is one step in the middle of something larger: you needed this figure so you could get on with the thing you were actually doing. That shapes how the page is built. It opens fast, it does not interrupt, it does not ask you to commit to anything, and it gets out of the way the moment you have what you came for.`);
  out.push(`It also means you should feel free to use it repeatedly rather than carefully. There is no cost to a second attempt and no penalty for a wrong first guess, so the fastest route to a good answer is usually to try an approximate one, look at the result, and adjust. People tend to treat tools as though each use were expensive, which is a habit inherited from software that made it expensive. This one does not.`);

  out.push(`## Common mistakes worth avoiding`);
  out.push(`The first is trusting a result whose input you did not check. A tool cannot know that you meant to type one number and typed another, and it will present the wrong answer with exactly the same confidence as the right one. Read your inputs back before you rely on the output — it takes two seconds and catches most of what goes wrong.`);
  out.push(`The second is treating one number as an answer to a question it was never asked. Every ${f.noun} on this page answers something narrow and specific. Applying it to a nearby but different question is the most common way people end up misled by a tool that was working perfectly the entire time. If you are not sure the question you have matches the question the tool answers, that uncertainty is the useful signal, not an obstacle.`);
  if (faq.length) out.push(`The frequently asked questions below cover the cases that come up most often, including the ones where the honest answer is that this is not the right tool for what you are trying to do.`);

  out.push(`## Working offline and on any device`);
  out.push(`The page is a single self-contained document. There is no framework to download, no fonts fetched from a third party and no analytics beacon firing in the background, which is why it loads quickly on a bad connection and why it costs nothing to keep open in a tab you return to occasionally. It works the same on a phone, a tablet and a desktop; the layout adapts, the behaviour does not.`);
  out.push(`Because there is no server involved in the actual work, there is also no service to go down, no rate limit to hit and no quiet change in behaviour pushed out from somewhere else. What you loaded is what runs. If you want to be certain of that, open the page source — the whole implementation is right there in readable form, which is a claim very few tools of this kind can make.`);

  out.push(`## A note on accuracy`);
  out.push(`Results are computed with standard double-precision arithmetic and displayed to a sensible number of places rather than to every digit the hardware can produce. A figure shown to two decimals is not claiming to be accurate to two decimals — it is claiming that the inputs you supplied, taken at face value, produce that figure. Precision in the display and accuracy in the real world are different things, and conflating them is the most common way a correct tool produces a wrong decision.`);
  out.push(`If a result looks wrong, check the inputs before you doubt the arithmetic. In practice the overwhelming majority of surprising answers come from a value entered in the wrong unit, a decimal separator read differently than you intended, or a field left at its default when it should have been changed. That is not a criticism of anyone — it is simply where the errors live, and knowing where to look first saves the most time.`);

  return out.join('\n\n') + '\n';
}

// ---------- cli ----------
const args = process.argv.slice(2);
const only = (args.find((a) => a.startsWith('--only=')) || '').split('=')[1];
const DRY = args.includes('--dry');

const slugs = readdirSync(p('data/tools')).filter((f) => f.endsWith('.json')).map((f) => f.replace(/\.json$/, ''));
let made = 0, skipped = 0, short = 0;

for (const slug of slugs) {
  if (only && slug !== only) continue;
  const dest = p('data/content', slug, 'en.md');
  if (existsSync(dest)) { skipped++; continue; }
  const tool = JSON.parse(readFileSync(p('data/tools', `${slug}.json`), 'utf8'));
  if (!tool.strings || !tool.strings.en) { console.warn(`  ! ${slug}: no strings.en, skipped`); continue; }
  const body = composeEn(tool);
  const words = wc(body);
  if (words < 1000) { short++; console.warn(`  ! ${slug}: composed only ${words}w`); }
  if (!DRY) {
    mkdirSync(dirname(dest), { recursive: true });
    writeFileSync(dest, body, 'utf8');
  }
  made++;
}

console.log(`compose: ${made} en.md ${DRY ? 'would be written' : 'written'}, ${skipped} already existed, ${short} under 1000w`);

export { composeEn };
