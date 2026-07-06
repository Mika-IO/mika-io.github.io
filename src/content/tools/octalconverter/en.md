## Convert between binary, octal, decimal and hexadecimal

Computers fundamentally represent everything as binary — sequences of ones and zeros — but binary is tedious for humans to read and write, so several other number bases are used as more convenient shorthand. Octal (base 8) and hexadecimal (base 16) are the two most common, chosen specifically because they convert to and from binary in a clean, mechanical way. This tool converts any number you enter, in any of the four common bases, into all the others at once. Choose the base your input is written in, type the value, and every representation appears immediately.

## How to use the converter

This is especially handy for students working through number-base exercises, developers debugging a value that appeared in a log file as hex but needs to be checked in decimal, or anyone curious about how a particular number looks written in a different base.

Select the base your input number is written in from the dropdown — decimal, binary, octal or hexadecimal — then type the value into the field and press convert. All four representations appear together: binary, octal, decimal and hexadecimal, so you can read off whichever one you actually need without a second step. Hexadecimal input accepts both upper and lower case letters for the digits A through F, and the result is always shown in upper case for clarity.

## Why octal and hexadecimal exist

Binary numbers get long very quickly — the decimal number 255 is 11111111 in binary, eight digits for a fairly modest number — which makes them error-prone to read, write and compare by eye. Octal and hexadecimal exist to solve exactly this problem, because both bases are powers of two: 8 is 2³ and 16 is 2⁴. This means each octal digit corresponds to exactly three binary digits, and each hexadecimal digit corresponds to exactly four, so converting between binary and either of them is a simple grouping exercise rather than genuine arithmetic. Grouping 11111111 into sets of three from the right gives 11 111 111, which is 3, 7, 7 in octal — 377. Grouping the same number into sets of four gives 1111 1111, which is F, F in hexadecimal — FF.

## Converting decimal to another base by hand

To convert a decimal number to another base without a calculator, repeatedly divide by the target base and record the remainders. Converting 255 to octal: 255 ÷ 8 = 31 remainder 7; 31 ÷ 8 = 3 remainder 7; 3 ÷ 8 = 0 remainder 3. Reading the remainders from the last division to the first gives 377. The same process converts to any base — divide by 2 repeatedly for binary, by 16 for hexadecimal — and this tool performs exactly this calculation instantly for any of the three target bases at once.

## Where each base is actually used

Binary is the native language of digital logic and is used directly when discussing bitwise operations, flags and low-level hardware behaviour. Octal was historically important in early computing, particularly on systems where the word size was a multiple of three bits, and it still appears today in Unix and Linux file permission notation, where a permission like 755 describes read, write and execute bits for owner, group and everyone in a compact octal form. Hexadecimal is by far the most common of the two in modern software, appearing in colour codes for web design (#FF5733), memory addresses, error codes, and as a compact way to display raw byte data in debugging tools, because its four-bits-per-digit relationship with binary makes conversion by eye relatively easy with a little practice.

## A worked example across all four bases

Take the decimal number 100. In binary, it is 1100100 — obtained by repeatedly dividing by 2 and reading the remainders bottom to top. In octal, grouping those binary digits into sets of three from the right (1 100 100) gives 1, 4, 4, so 100 in decimal is 144 in octal. In hexadecimal, grouping into sets of four (0110 0100) gives 6 and 4, so 100 in decimal is 64 in hex. Running 100 through this converter with decimal selected as the input base confirms all three at once, which is a good way to build confidence in the grouping method before relying on it for a larger number where checking by hand would be tedious. The reverse direction works identically: paste a binary, octal or hex value in, select the matching input base, and the tool derives the other three representations, including the decimal value, using the same grouping and positional-value rules run backward. This makes it equally useful whichever direction your original number happens to be in, without needing to remember which conversion formula applies to which pair of bases, or keep four different sets of division and grouping rules straight in your head.

## Private and instant

The conversion runs entirely in your browser using standard integer arithmetic, so results appear the instant you press convert and no value you enter is ever sent to a server, logged or shared. It works offline once the page has loaded, ready whenever a base-conversion problem comes up in coursework, debugging or curiosity, with no account, no cost and no limit on how many numbers you convert, one after another, for as long as you need it.
