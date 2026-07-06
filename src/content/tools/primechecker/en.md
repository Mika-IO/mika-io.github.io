## Is this number prime?

A prime number is one of the most fundamental concepts in mathematics — a positive integer greater than 1 that cannot be divided evenly by any number other than 1 and itself. Determining whether a given number is prime is a question that has fascinated mathematicians for millennia and remains practically important in modern cryptography. This tool answers it instantly for any number you enter, and also shows the complete list of divisors and the prime factorization.

## What makes a number prime?

The definition is simple: a positive integer is prime if its only positive divisors are 1 and itself. The number 7 is prime because it can only be divided evenly by 1 and 7. The number 8 is not prime — it is also divisible by 2 and 4. The number 1 is a special case: by modern mathematical convention it is not considered prime, because including it would break the uniqueness of prime factorization.

The first few primes are 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47. Note that 2 is the only even prime number, because every other even number is divisible by 2.

## Primality testing at larger scales

Trial division, the method this tool uses, works perfectly well for numbers up to the millions but becomes impractical for the truly enormous numbers used in real-world cryptography, which can run to hundreds of digits. For those, mathematicians and computer scientists use probabilistic primality tests, such as the Miller-Rabin test, which cannot guarantee a number is prime with absolute certainty but can rule out compositeness with a probability of error so small it is considered negligible in practice — smaller, in fact, than the chance of a hardware error occurring during the same calculation. Understanding trial division first is the right foundation before appreciating why these faster, probabilistic methods were needed at all.

## Prime factorization

The Fundamental Theorem of Arithmetic states that every integer greater than 1 can be expressed as a product of prime numbers in exactly one way, up to the order of the factors. This is called the prime factorization. For example: 12 = 2 × 2 × 3, written as 2² × 3. The number 360 = 2³ × 3² × 5. Finding the prime factorization of a number means breaking it down into its prime components, which reveals its mathematical structure.

## Why primes matter

Primes are the building blocks of all integers — every composite (non-prime) number can be constructed by multiplying primes together. This makes them central to number theory, the branch of mathematics concerned with the properties of integers.

In modern computing, the difficulty of factoring large numbers into their prime components is the foundation of RSA encryption, which secures most of the internet's encrypted communications. Two large primes are multiplied together to create a public key. Factoring that product back into its primes — without knowing them in advance — is computationally infeasible for sufficiently large numbers.

## How the check works

The tool uses trial division: it tests whether the number is divisible by any integer from 2 up to the square root of the number. If any such divisor exists, the number is composite and the tool records its factors. If none exist, the number is prime. The square root limit works because if a number n has a factor larger than √n, it must also have a corresponding factor smaller than √n, so we can stop at the square root.

## A quick worked example

Take the number 91. It is odd, not divisible by 3 (9+1=10, not a multiple of 3), and does not end in 0 or 5, so the small, obvious tests all suggest it might be prime — but checking division by 7 reveals 91 ÷ 7 = 13 exactly, so 91 is actually composite, with prime factorization 7 × 13. This is a classic example used to illustrate why "it doesn't look divisible by anything obvious" is not the same as "it is prime": the only reliable way to know for certain is to check every candidate divisor up to the square root, exactly what this tool does automatically and instantly.

## Everyday uses

While the deep mathematical importance of primes is in cryptography and number theory, everyday uses include puzzles, educational exercises, and programming challenges. Students learning about divisibility, factors, and multiples frequently need to check primality and find factorizations as part of arithmetic exercises.

## How to use the checker

Type any positive integer into the box and the result appears immediately: whether the number is prime, and if not, its complete list of divisors and its prime factorization broken down into individual prime powers. There is no practical limit on the size of number you can check for everyday use, since the trial-division method this tool uses handles numbers well into the millions and beyond almost instantly.

## Primes are infinite

Euclid proved over two thousand years ago that there is no largest prime number — the list goes on forever. His proof is a beautiful piece of ancient logic: assume for a moment that there were only finitely many primes, multiply them all together, and add one. The resulting number cannot be divided evenly by any prime on the original list, since dividing by any of them always leaves a remainder of one, so either this new number is itself prime, or it has some other prime factor that was missing from the supposedly complete list — either way, contradicting the assumption that the list was complete. This elegant argument, requiring no advanced mathematics at all, remains one of the most celebrated proofs in the history of the subject.

## Private and instant

The calculation runs entirely in your browser, so the result appears the instant you type and no number you enter is ever sent to any server, logged or shared.

