## Compare two texts and find the differences

Whether you are proofreading a revised document, checking what changed in a contract, comparing two versions of an essay, or verifying that a copy-paste was accurate, a text diff tool saves time by highlighting exactly what changed. Paste the original text in the first box and the new version in the second, and the differences are marked instantly.

## How word-level diff works

The tool uses the Longest Common Subsequence (LCS) algorithm — the same algorithm underlying the Unix diff command and git diff. It finds the largest sequence of words that appear in both texts in the same order, then marks everything outside that sequence as added or deleted.

Words shown in red with strikethrough are in the original but not in the new version (deleted). Words highlighted in green are in the new version but not in the original (added). Unchanged words appear in normal text.

## Common uses for text comparison

**Document revisions**: When a collaborator returns a revised document, quickly see exactly which words or sentences changed without reading both versions in full.

**Contract review**: Legal professionals use diff to track changes between contract versions. A "redline" or "markup" document is essentially a diff applied to legal text.

**Academic proofreading**: Compare a first draft to a revised draft to verify the intended edits were made correctly and no unintended changes were introduced.

**Code review**: While code diffs are best handled by tools like git diff (which operates line-by-line), a word-level diff can help when reviewing documentation or comments.

**Plagiarism checking**: Compare a submitted text against an original to spot paraphrasing — reordered or substituted words that preserve the same meaning.

**Translation verification**: Compare a source text to its translation word-for-word to ensure completeness (though this is approximate due to natural language differences).

## Limitations of word-level diff

This tool compares words without understanding semantics. A sentence that is entirely rewritten with the same meaning will appear fully deleted and added. For understanding semantic similarity, natural language processing tools are needed.

The comparison also does not distinguish formatting, capitalization, or punctuation within words unless they are part of a word token. "Hello" and "hello" are treated as different words.

## How to use the tool

Paste the original text into the first box and the revised version into the second, and the comparison appears immediately below, with deletions struck through in red and additions highlighted in green. There is no button to press to trigger the comparison — it updates live, so you can paste a new version at any time and immediately see how it differs from what came before.

## Why word-level comparison, not character-level

A diff tool could theoretically compare character by character rather than word by word, but that approach produces results that are technically accurate and practically useless: fixing a single typo in the middle of a long sentence would show almost the entire rest of the sentence as changed, because every character after the correction shifts position. Comparing at the word level instead means a single corrected word shows as one deletion and one addition, while everything else in the sentence that did not actually change is correctly left alone — a far more useful signal for a human trying to understand what was actually edited, which is exactly the level of granularity most real editing and proofreading tasks care about.

## Reading a diff efficiently

When reviewing a long comparison, it helps to scan for clusters of colour rather than reading every word: a tight cluster of red and green next to each other usually indicates a small rewording, while a long uninterrupted run of one colour indicates a genuinely new or deleted passage rather than an edit. Getting comfortable with this pattern-scanning approach is what lets experienced editors and legal reviewers process a multi-page redline in a few minutes rather than re-reading the entire document line by line.

## Diff tools in software vs prose

Programmers use line-based diff tools like git diff constantly, and it is worth understanding why a word-level diff like this one is a different, complementary tool rather than a replacement. Source code is naturally organized into discrete lines, so comparing line by line is the right granularity — a changed line is a changed unit of logic. Prose has no such natural line boundaries; a single sentence might wrap across several lines depending on window width, and the meaningful unit of change is the word or phrase, not wherever a line happens to break. That is precisely why comparing prose requires a word-level approach rather than reusing a code-oriented, line-based diff tool.

## Comparing translation drafts

Bilingual editors and translators sometimes use a word-level diff to compare two versions of a translation of the same source text — for instance, a human translator's draft against a machine-translated version, or two successive revisions of the same paragraph — to quickly spot exactly where word choices diverge, without needing to re-read the entire passage hunting for the difference.

## A quick sanity check before relying on a diff

Before trusting a diff result for something important — a legal document, a graded assignment — paste a small known change into the two boxes first and confirm the tool highlights exactly that change and nothing else, the same way you would test a new kitchen scale with a known weight before trusting it for a recipe.

## Private and instant

All comparisons run entirely in your browser using the Longest Common Subsequence algorithm, so results appear instantly and no text you paste is ever sent to any server, logged or shared.

