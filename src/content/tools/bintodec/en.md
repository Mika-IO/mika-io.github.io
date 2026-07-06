## Convert numbers between any base instantly

The number base converter lets you type any number in binary (base 2), octal (base 8), decimal (base 10), or hexadecimal (base 16) and instantly see its equivalent in all four systems. There is no need to remember conversion formulas or do mental arithmetic — select your source base, type the number, and the tool does the rest in real time.

## Why do different number bases exist?

Humans naturally count in base 10 (decimal) because we have ten fingers. But computers have no fingers — they work with electrical signals that are either on or off, giving rise to base 2 (binary). Other bases emerged as practical shorthands for binary: base 8 (octal) groups three binary digits together, and base 16 (hexadecimal) groups four, making long binary strings much more readable and writable for engineers.

## Binary — base 2

Binary is the bedrock of digital computing. Every value stored in a computer, every instruction executed by a processor, every pixel on a screen ultimately resolves into a sequence of 0s and 1s. A single binary digit is called a bit. Eight bits form a byte. Because binary numbers grow long quickly — the decimal number 255 requires eight binary digits (11111111) — programmers rarely write raw binary. They prefer hexadecimal, which is far more compact.

Understanding binary is essential for computer science students, software engineers, and anyone working close to the hardware. Bit manipulation — using operations like AND, OR, XOR, and NOT — is a common technique in systems programming, cryptography, and graphics processing.

## Octal — base 8

Octal uses the digits 0 through 7. One octal digit represents exactly three binary digits, so groups of three bits map cleanly to a single octal digit. This made octal very convenient in the era of mainframes and minicomputers, where memory was often organised in three-bit groups.

Today, octal's most visible use is in Unix and Linux file permission codes. When you run `chmod 755` on a file, you are setting permissions using octal notation: 7 (rwx), 5 (r-x), 5 (r-x). Each digit encodes three permission bits (read, write, execute) for the owner, group, and others. Any sysadmin or developer who works with Linux systems encounters octal permissions daily.

## Decimal — base 10

Decimal is the everyday number system used by virtually every human culture. It uses the digits 0 through 9. Each position in a decimal number represents a power of 10: ones, tens, hundreds, thousands, and so on. Decimal is the default for human-facing applications — bank balances, temperatures, distances, and timestamps are all displayed in decimal.

Inside a computer, however, decimal is relatively expensive. Processors work natively in binary, so representing decimal numbers requires encoding schemes like Binary Coded Decimal (BCD) or conversion algorithms. For this reason, most internal computations use binary arithmetic, and only the final output is converted to decimal for display.

## Hexadecimal — base 16

Hexadecimal extends the digit set beyond 9 by using the letters A through F to represent 10 through 15. One hexadecimal digit represents exactly four binary digits (a nibble). This makes hex an extremely compact representation of binary data. The 8-bit byte 11111111 in binary becomes just FF in hex.

Hexadecimal is ubiquitous in computing and electronics. Memory addresses in debuggers, color codes in web design (#FF6347 is Tomato red), MAC addresses, SHA hashes, and bytecode listings all use hexadecimal. If you have ever read a hex dump of a file or inspected a network packet, you have worked with hexadecimal directly.

## How base conversion works

Converting a number from any base to decimal is straightforward: multiply each digit by its base raised to the power of its position (counting from the right starting at 0), then sum the results.

For example, the binary number 1011 converts to decimal as:
1×2³ + 0×2² + 1×2¹ + 1×2⁰ = 8 + 0 + 2 + 1 = 11

Converting from decimal to another base requires repeated division: divide the number by the target base, record the remainder as the next digit (from right to left), and repeat with the quotient until the quotient is zero.

For example, to convert 11 to binary:
11 ÷ 2 = 5 remainder 1, 5 ÷ 2 = 2 remainder 1, 2 ÷ 2 = 1 remainder 0, 1 ÷ 2 = 0 remainder 1. Reading remainders from bottom to top: 1011.

## Real-world applications

**Color codes:** Web design and graphic design rely on hexadecimal color codes. Every CSS color like #3A86FF is three pairs of hex digits encoding red, green, and blue channels, each ranging from 00 (0) to FF (255).

**Network addresses:** MAC addresses and IPv6 addresses are written in hexadecimal. An IPv6 address like 2001:0db8:85a3::8a2e:0370:7334 packs 128 bits into a human-readable (if still complex) format.

**Debugging:** When stepping through assembly code or inspecting memory in a debugger, addresses and raw data values are shown in hex. Being able to quickly translate between hex and decimal — or understand that 0xFF = 255 — is a core skill for low-level developers.

**Permissions:** Linux and macOS file system permissions use octal. Understanding that 644 means the owner can read and write (4+2=6), while group and others can only read (4), is essential for server administration.

## Tips for mental conversion

With practice, certain conversions become second nature:

- Binary 1111 = Hex F = Decimal 15
- Binary 1000 = Hex 8 = Decimal 8
- Hex FF = Decimal 255 = Binary 11111111
- Hex 10 = Decimal 16 = Binary 10000

A useful shortcut: split a binary number into groups of 4 from the right and convert each group to a hex digit independently. For 11111100, split into 1111 and 1100 → F and C → FC in hex.

## Private and instant

All calculations run entirely in your browser. No data is sent to any server. The conversion happens locally using JavaScript's built-in parseInt and toString methods, which are highly reliable for integers within JavaScript's safe integer range (up to 2^53 − 1).

## Frequently asked questions — general

**Is this tool free?** Yes, completely free, with no signup or subscription required.

**Does it work without internet?** Once the page has loaded, the tool works entirely offline.

**Can I use it on my phone?** Yes. The tool is mobile-optimised and works on iOS and Android.

**What is the largest number supported?** The tool works accurately up to JavaScript's safe integer limit (Number.MAX_SAFE_INTEGER = 9,007,199,254,740,991 in decimal).
