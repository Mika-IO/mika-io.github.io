## Find the square root of any number instantly

The square root is one of the most commonly used mathematical operations. From the Pythagorean theorem to standard deviation, from quadratic equations to financial formulas, square roots appear everywhere. Enter any non-negative number and its square root is shown immediately, along with the square (n²) for reference.

## What is a square root?

The square root of a number n is the value that, when multiplied by itself, equals n. Written as √n or n^(1/2). For example:
- √9 = 3 because 3 × 3 = 9
- √25 = 5 because 5 × 5 = 25
- √2 ≈ 1.4142135... (an irrational number)
- √100 = 10

Every positive number has two square roots: a positive one and a negative one. The positive root is called the principal square root. The square root of zero is zero.

## Perfect squares

A perfect square is a number that has an integer square root:
- 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225...

Recognising perfect squares is useful in arithmetic, geometry, and algebra.

## Irrational square roots

Most numbers do not have exact integer square roots. √2, √3, √5, √6, √7, and many others are irrational — their decimal expansions are infinite and non-repeating. These values are important in geometry: the diagonal of a unit square has length √2 ≈ 1.41421356...

## Applications

**Pythagorean theorem**: The hypotenuse c of a right triangle satisfies c = √(a² + b²). Computing this requires taking a square root.

**Standard deviation**: The standard deviation of a dataset is the square root of the variance. Taking the square root returns the measure to the original units of the data.

**Quadratic formula**: The solutions to ax² + bx + c = 0 are x = (-b ± √(b² - 4ac)) / 2a. The discriminant b² - 4ac under the square root determines whether solutions are real.

**Distance formula**: The distance between two points (x₁, y₁) and (x₂, y₂) is √((x₂-x₁)² + (y₂-y₁)²).

**Financial models**: Standard deviation of returns measures investment risk. Portfolio mathematics uses square roots extensively.

**Physics**: Wave equations, energy calculations, and many physical relationships involve square roots.

## Negative numbers and imaginary numbers

The square root of a negative number is not a real number. In the complex number system, √(-1) is defined as the imaginary unit i. Complex numbers have the form a + bi and are used in electrical engineering, quantum mechanics, and many other fields.

## How the calculation works

The calculator uses JavaScript's Math.sqrt() function, which implements the IEEE 754 double-precision floating-point square root algorithm. Results are accurate to about 15-16 significant figures.

## How to use the calculator

Type any non-negative number into the box and both its square root and its square appear immediately, updating as you type. There is no button to press and nothing to configure. Trying a few numbers side by side is a quick way to build intuition — notice how the square root of a number less than 1 is actually larger than the number itself (√0.25 = 0.5), which surprises many people the first time they see it, while the square root of any number greater than 1 is always smaller than the number.

## Estimating a square root by hand

Before reaching for a calculator, it helps to know how to estimate a square root roughly. Find the two nearest perfect squares that bracket your number: for √50, the nearest perfect squares are 49 (√49 = 7) and 64 (√64 = 8), so the answer must lie between 7 and 8, and because 50 is much closer to 49, the answer should be close to 7 but a little higher — the true value, 7.07, confirms this instinct. This bracketing technique is a useful sanity check whenever you want to confirm that a calculator's result is in the right ballpark, and it is exactly the kind of estimation skill that mental arithmetic and early algebra courses aim to build.

## Newton's method, the algorithm behind the scenes

Modern computers do not look up square roots in a table; they compute them using fast iterative methods, the most famous being Newton's method (also called the Babylonian method, since a version of it was known to ancient Babylonian mathematicians). Starting from a rough guess, each step refines the estimate using the formula: next guess = (guess + number ÷ guess) ÷ 2. Applied to finding √10 starting from a guess of 3: (3 + 10/3)/2 ≈ 3.1667, then (3.1667 + 10/3.1667)/2 ≈ 3.1623, which is already extremely close to the true value of 3.16228. Each iteration roughly doubles the number of correct digits, which is why modern processors can compute a square root to full precision in only a handful of steps.

## Squares and square roots as inverse operations

Squaring and taking a square root undo each other, which is why this calculator shows both at once: square root of n² returns n (for non-negative n), and the square of √n returns n. This inverse relationship is fundamental across algebra — it is exactly how equations involving squared terms, such as the quadratic formula or the Pythagorean theorem, are solved by applying the square root to both sides at the right moment.

## Private and instant

The calculation runs entirely in your browser using standard double-precision arithmetic, accurate to roughly fifteen significant figures, so the result appears instantly and no number you enter is ever uploaded, logged or shared.

