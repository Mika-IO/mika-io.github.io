## Find the Least Common Multiple of any numbers

The Least Common Multiple (LCM) — also called Minimum Common Multiple or in Portuguese Mínimo Múltiplo Comum (MMC) — is the smallest positive integer that is evenly divisible by all the numbers in a given set. Enter two or more numbers separated by commas and the LCM appears instantly, along with the Greatest Common Divisor (GCD) as a bonus.

## Definition and examples

The LCM of a set of numbers is the smallest number that all of them divide into without a remainder.

- LCM(4, 6) = 12 — because 12 ÷ 4 = 3 and 12 ÷ 6 = 2, and no smaller number works for both.
- LCM(3, 5) = 15 — because 3 and 5 are coprime (share no common factors), their LCM is simply their product.
- LCM(12, 18, 24) = 72 — the smallest number divisible by all three.

## How LCM is calculated

The most efficient method uses the relationship between LCM and GCD: LCM(a, b) = |a × b| / GCD(a, b). For more than two numbers, the LCM is computed pairwise: LCM(a, b, c) = LCM(LCM(a, b), c).

The GCD is computed using the Euclidean algorithm, which repeatedly divides the larger number by the smaller and takes the remainder until the remainder is zero. The last non-zero remainder is the GCD.

## Adding fractions with different denominators

The most common everyday application of LCM is in fraction arithmetic. To add 1/4 and 1/6, you need a common denominator. The LCM of 4 and 6 is 12, so: 1/4 = 3/12 and 1/6 = 2/12, giving 5/12. Using the LCM gives the most reduced form immediately, whereas using any other common multiple (like 24) gives a result that still needs simplification.

## Scheduling and cycles

LCM appears in scheduling problems where events repeat at different intervals. If bus A runs every 12 minutes and bus B every 18 minutes, and both depart at 8:00 AM, when will they next depart simultaneously? LCM(12, 18) = 36, so they next coincide at 8:36 AM.

Similarly, gears in mechanical systems have tooth counts where LCM determines when the same teeth mesh again. Production lines with machines operating at different cycle times use LCM to find synchronization points.

## Stocking up without waste

LCM also solves a very concrete shopping problem: if hot dogs come in packs of 10 and buns come in packs of 8, how many packs of each do you need to buy so that you end up with exactly the same number of hot dogs and buns with none left over? The answer is the smallest number that both 10 and 8 divide into evenly, which is LCM(10, 8) = 40 — so you would buy 4 packs of hot dogs and 5 packs of buns. This exact scenario, and countless variations of it involving any two differently sized packs, shows up whenever you are trying to match up two things sold in different quantities.

## Music theory

In music, LCM determines when rhythmic patterns repeat. A pattern of 3 beats played against a pattern of 4 beats creates a cycle of LCM(3, 4) = 12 beats before the downbeats coincide again. This is the basis of polyrhythmic music.

## How to use the calculator

Enter two or more numbers separated by commas and the LCM appears instantly, alongside the GCD used to calculate it. There is nothing to submit and no limit to how many numbers you can list — the calculator reduces the whole set pairwise behind the scenes, so a list of five or six numbers is handled just as easily as a pair. Changing any number updates the result immediately, which makes it easy to explore how adding one more number to a set changes the LCM.

## Why LCM and GCD are two sides of the same coin

The Least Common Multiple and the Greatest Common Divisor describe opposite ends of the same relationship between two numbers, and the neat identity LCM(a, b) × GCD(a, b) = a × b connects them directly. Intuitively, the GCD strips out everything two numbers have in common, while the LCM is the smallest number big enough to contain everything both numbers need. Because computing a GCD via the Euclidean algorithm is fast even for large numbers, and the LCM formula only needs one extra multiplication and division once the GCD is known, this indirect route is far quicker than searching through multiples directly, especially as the numbers grow.

## A worked example step by step

Take LCM(21, 6). First find the GCD: 21 = 3×6 + 3, then 6 = 2×3 + 0, so GCD(21, 6) = 3. Then apply the formula: LCM(21, 6) = (21 × 6) / 3 = 126 / 3 = 42. You can check this directly — 42 ÷ 21 = 2 and 42 ÷ 6 = 7, both whole numbers, and no smaller positive number divides evenly by both 21 and 6. This two-step process, GCD first and then a single multiplication and division, is exactly what the calculator performs instantly behind the results you see.

## Everyday situations beyond fractions and schedules

LCM quietly appears in situations people do not always label as a maths problem. Recipe scaling that needs whole quantities of two ingredients sold in different pack sizes, packing identical goody bags from items that come in boxes of different counts, or working out how many rounds of a game with two different-length rounds line back up at the start — all of these are LCM problems in disguise. Whenever you need the smallest quantity, time or count that satisfies two or more repeating requirements at once, the LCM is the number you are looking for.

## Private and instant

All calculations run entirely in your browser using the Euclidean algorithm, so nothing you enter is ever uploaded, logged or shared. The result appears the instant you type, it works offline once the page has loaded, and every number disappears the moment you close or reload the tab.

