## Generate cryptographic hashes for any text

A hash function takes any input and produces a fixed-length fingerprint called a hash or digest. The same input always produces the same output, but even a single character change produces a completely different hash — a property called the avalanche effect. This tool generates SHA-256, SHA-1, and MD5 hashes for any text you enter, computed entirely in your browser.

## What are hash functions used for?

**File integrity**: Download websites publish the SHA-256 hash of each file. After downloading, you compute the hash and compare it to the published value. If they match, the file was not corrupted or tampered with in transit.

**Password storage**: Websites should never store plain-text passwords. Instead, they store a hash (ideally SHA-256 or bcrypt with a random salt) and hash your login attempt for comparison.

**Digital signatures**: Signing a document involves hashing it and encrypting the hash with a private key. The recipient can verify the hash using the public key.

**Bitcoin mining**: SHA-256 is used in Bitcoin's proof-of-work algorithm. Miners must find an input (nonce) that produces a hash beginning with a certain number of zeros.

**Version control**: Git uses SHA-1 (being migrated to SHA-256) to identify every commit, file, and object in the repository. The hash is the unique identifier.

## SHA-256 vs SHA-1 vs MD5

**SHA-256** (Secure Hash Algorithm 256-bit): Part of the SHA-2 family. Produces a 256-bit (64 hexadecimal character) hash. Considered cryptographically secure for all current applications.

**SHA-1** (Secure Hash Algorithm 1): Older standard producing a 160-bit (40 hexadecimal character) hash. Deprecated for security purposes since 2017 after collisions were demonstrated. Still used in some legacy systems and git (being phased out).

**MD5** (Message Digest 5): Produces a 128-bit (32 hexadecimal character) hash. Cryptographically broken — collisions can be generated deliberately. Used only for non-security purposes like non-critical file checksums and database lookups.

## The avalanche effect

A defining property of cryptographic hash functions is that even tiny input changes produce dramatically different outputs:

"Hello" → SHA-256: 185f8db3...
"hello" → SHA-256: 2cf24dba...

The two hashes share no visible relationship despite differing only in capitalization. This is the avalanche effect.

## One-way function

Hashes are one-way: you can compute a hash from input, but you cannot reverse the process to recover input from the hash. The only way to "crack" a hash is to try many inputs (brute force or dictionary attack) and see which one produces the same hash.

## Private and instant

SHA-256 and SHA-1 are computed using the browser's built-in Web Crypto API. MD5 is computed using a pure JavaScript implementation. No text you enter is sent anywhere.

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
