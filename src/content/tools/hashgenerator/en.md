## Generate cryptographic hashes for any text

A hash function takes any input and produces a fixed-length fingerprint called a hash or digest. The same input always produces the same output, but even a single character change produces a completely different hash — a property called the avalanche effect. This tool generates SHA-256, SHA-1, and MD5 hashes for any text you enter, computed entirely in your browser.

## SHA-256, SHA-1 and MD5 compared

SHA-256, part of the SHA-2 family, produces a 256-bit hash written as 64 hexadecimal characters and is considered cryptographically secure for all current applications, which is why it is the default choice for new systems today. SHA-1 produces a shorter 160-bit hash and has been deprecated for security purposes since 2017, after researchers demonstrated that two different inputs could be deliberately crafted to produce the same hash — a collision that undermines the guarantees the algorithm was meant to provide, though it remains present in some legacy systems and in older parts of Git, itself gradually migrating away from it. MD5 produces an even shorter 128-bit hash and is considered cryptographically broken: collisions can be generated deliberately and quickly with modern hardware, so MD5 today is suitable only for non-security purposes such as basic file checksums or fast database lookups where an adversary crafting a malicious collision is not a concern.

## What are hash functions used for?

**File integrity**: Download websites publish the SHA-256 hash of each file. After downloading, you compute the hash and compare it to the published value. If they match, the file was not corrupted or tampered with in transit.

**Password storage**: Websites should never store plain-text passwords. Instead, they store a hash (ideally SHA-256 or bcrypt with a random salt) and hash your login attempt for comparison.

**Digital signatures**: Signing a document involves hashing it and encrypting the hash with a private key. The recipient can verify the hash using the public key.

**Bitcoin mining**: SHA-256 is used in Bitcoin's proof-of-work algorithm. Miners must find an input (nonce) that produces a hash beginning with a certain number of zeros.

**Version control**: Git uses SHA-1 (being migrated to SHA-256) to identify every commit, file, and object in the repository. The hash is the unique identifier.

## The avalanche effect

A defining property of cryptographic hash functions is that even tiny input changes produce dramatically different outputs:

"Hello" → SHA-256: 185f8db3...
"hello" → SHA-256: 2cf24dba...

The two hashes share no visible relationship despite differing only in capitalization. This is the avalanche effect.

## One-way function

Hashes are one-way: you can compute a hash from input, but you cannot reverse the process to recover input from the hash. The only way to "crack" a hash is to try many inputs (brute force or dictionary attack) and see which one produces the same hash.

## How to use the tool

Type or paste any text into the input box and all three hashes — SHA-256, SHA-1 and MD5 — appear immediately below it, recalculating with every keystroke. This makes it easy to verify a file's published checksum, generate a quick unique identifier for a piece of text, or simply explore how the avalanche effect behaves by editing your input one character at a time and watching every hash change completely.

## Why you cannot reverse a hash

A cryptographic hash function is deliberately designed to destroy information in a specific way: it takes an input of any length and compresses it down to a fixed, short output, discarding far more information than it keeps. Because countless different inputs could theoretically compress down to the same short output, there is no unique inverse operation to recover the original input from the hash — the process only works in one direction. The only way to find an input that produces a given hash is to try candidate inputs one after another and check whether any of them happen to match, which is exactly why hashing passwords rather than storing them directly is effective: even if a hash is stolen, recovering the original password from it is computationally infeasible for a well-chosen hash algorithm and a sufficiently long password.

## Choosing the right hash for the job

For anything security-related today — password storage, digital signatures, verifying that a downloaded file has not been tampered with — SHA-256 or a stronger member of the SHA-2 or SHA-3 family is the appropriate choice, since both SHA-1 and MD5 have known weaknesses that a determined attacker can exploit. SHA-1 and MD5 remain useful only in contexts where security is not the point at all: a quick checksum to catch accidental corruption, a fast way to generate a short unique key for a cache lookup, or compatibility with an older system that has not been updated. When in doubt about which to use for anything that matters, SHA-256 is almost always the safer default.

## Private and instant

SHA-256 and SHA-1 are computed using the browser's built-in Web Crypto API, and MD5 is computed using a pure JavaScript implementation, so every hash appears instantly and no text you enter is ever sent anywhere, logged or shared, and it works offline once the page has loaded, with no limit on how many hashes you generate, no cost and nothing to install.

