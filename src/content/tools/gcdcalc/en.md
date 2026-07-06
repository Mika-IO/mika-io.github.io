## Find the Greatest Common Divisor of any numbers

The Greatest Common Divisor (GCD) — also called the Greatest Common Factor (GCF) or Highest Common Factor (HCF) — is the largest number that divides all given numbers without leaving a remainder. Enter two or more numbers separated by commas and the GCD is computed instantly using the Euclidean algorithm.

## Definition and examples

- GCD(12, 18) = 6 — because 6 is the largest number that divides both 12 and 18.
- GCD(48, 36, 24) = 12 — the largest number dividing all three.
- GCD(7, 13) = 1 — these are coprime (no common factor other than 1).

## The Euclidean algorithm

The most famous method for computing GCD is the Euclidean algorithm, described by Euclid around 300 BCE in his Elements. The algorithm states that GCD(a, b) = GCD(b, a mod b), and repeats until b = 0. For example: GCD(48, 36) → GCD(36, 12) → GCD(12, 0) = 12.

## Simplifying fractions

The most common everyday use of GCD is simplifying fractions to lowest terms. To simplify 48/72, compute GCD(48, 72) = 24, then divide both by 24: 2/3. The result is fully reduced because the numerator and denominator are now coprime.

## Cryptography

RSA encryption, the algorithm that secures most internet communications, depends fundamentally on number theory involving GCD and coprime numbers. The RSA key generation algorithm requires selecting two large prime numbers, which are always coprime to each other and to their products.

## Dividing things into equal groups

A very hands-on use of GCD is splitting collections of different sizes into the largest possible number of identical groups with nothing left over. If you have 48 apples and 36 oranges and want to make identical fruit baskets using all of the fruit with no leftovers, the largest number of baskets you can make is GCD(48, 36) = 12, each containing 4 apples and 3 oranges. This same logic applies to cutting lengths of fabric or timber into equal pieces, arranging chairs into equal rows across rooms of different sizes, or dividing a budget across departments in the largest even instalments possible.

## Engineering

In mechanical engineering, the GCD of tooth counts on two gears determines how frequently the same pair of teeth meet. If gear A has 48 teeth and gear B has 36 teeth, GCD(48, 36) = 12, meaning every 12 teeth on gear A mesh with every 12 teeth on gear B.

## How to use the calculator

Type your numbers into the box separated by commas — two numbers, or as many as you like. Press calculate and the GCD of the whole set appears immediately, along with the step-by-step Euclidean reduction so you can see exactly how the answer was reached rather than treating it as a black box. Entering a single number, or numbers that share no common factor beyond 1, is handled gracefully: the tool simply reports a GCD of 1 in the latter case, confirming the numbers are coprime.

## Why the Euclidean algorithm is so efficient

Before Euclid's method, finding a GCD meant listing every factor of each number and picking the largest one they had in common — workable for small numbers but hopelessly slow for large ones. The Euclidean algorithm instead repeatedly replaces the larger number with the remainder of dividing it by the smaller, shrinking the problem fast. For two numbers of any realistic size, it typically finishes in well under fifty steps, which is why it remains the standard method taught today and the one built into virtually every calculator, spreadsheet function and programming language library that computes a GCD.

## Extending to more than two numbers

When you enter three or more numbers, the calculator does not need a new algorithm — it simply applies the two-number case repeatedly. The GCD of a whole list equals the GCD of the first two numbers combined with the third, and so on: GCD(a, b, c) = GCD(GCD(a, b), c). This works because any number that divides all of a, b and c must divide the GCD of any pair of them first, so reducing the list two at a time never loses information. It is a good illustration of how a simple building block — the two-number GCD — scales cleanly to handle an arbitrarily long list.

## Coprime numbers and what a GCD of 1 tells you

When the calculator reports a GCD of 1, the numbers you entered are called coprime, or relatively prime, meaning they share no factor larger than 1 even though each may individually have many factors. For example, 8 and 15 are coprime even though 8 = 2×2×2 and 15 = 3×5 — they simply share none of the same prime building blocks. Coprimality shows up constantly in number theory and cryptography, because many algorithms rely on selecting numbers that are guaranteed not to share hidden common structure.

## A worked example, step by step

Watch the Euclidean algorithm in action for GCD(48, 18). First, 48 = 2×18 + 12, so the problem becomes GCD(18, 12). Next, 18 = 1×12 + 6, so it becomes GCD(12, 6). Finally, 12 = 2×6 + 0, so the remainder reaches zero and the last non-zero remainder, 6, is the GCD. Each step of the algorithm shrinks the numbers involved quickly, which is exactly why it finishes in only a handful of steps even for very large numbers, unlike listing every factor, which slows down rapidly as the numbers grow.

## Private and instant

All calculations run entirely in your browser using the Euclidean algorithm, so the result appears the instant you type and no numbers you enter are ever sent to a server, logged or shared. It works offline once the page has loaded, and every calculation is discarded the moment you close or reload the tab.

