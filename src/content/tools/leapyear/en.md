## Is this year a leap year?

A leap year is a calendar year containing an extra day — February 29 — making it 366 days long instead of the usual 365. Leap years exist to keep the calendar aligned with the Earth's orbit around the Sun, which takes approximately 365.2422 days rather than exactly 365. Without periodic corrections, the calendar would drift against the seasons by about 6 hours per year, accumulating to a full day's drift every four years and eventually moving Christmas into summer in the Northern Hemisphere.

## The Gregorian leap year rule

The modern Gregorian calendar, adopted gradually across the world from 1582 onward, uses a three-part rule to determine leap years:

1. A year divisible by 4 is a leap year — so 2024, 2028, and 2032 are all leap years.
2. **Exception**: A year divisible by 100 is not a leap year — so 1900, 1800, and 1700 were not leap years, despite being divisible by 4.
3. **Exception to the exception**: A year divisible by 400 is a leap year — so 2000 and 1600 were leap years.

This three-part rule means that over a 400-year cycle there are 97 leap years rather than 100, giving an average year length of 365.2425 days. This is extremely close to the solar year of 365.2422 days — the error is less than one day per 3,000 years.

## History: the Julian calendar and its drift

Before the Gregorian reform, the Julian calendar (introduced by Julius Caesar in 45 BCE) added a leap day every four years without the century exception. This resulted in an average year of 365.25 days — slightly too long. Over centuries, the Julian calendar drifted against the solar year by about 11 minutes per year, accumulating to 10 days by the 16th century. Pope Gregory XIII's 1582 reform deleted 10 days from the calendar and introduced the century exception to prevent future drift.

## Birthdays on February 29

People born on February 29 — sometimes called "leaplings" or "leap day babies" — technically have a birthday that exists only every four years. In common usage, they celebrate on either February 28 or March 1 in non-leap years. Legally, most jurisdictions count their birthday as February 28 or March 1 for official purposes.

The probability of being born on February 29 is approximately 1 in 1,461 (one in four years, each with 365 days plus one extra), or about 0.068%. Several million people worldwide are leap day babies.

## Effects on finance and law

Leap years affect interest calculations, contract durations, and legal deadlines. A loan with daily interest accrual accumulates one extra day of interest in a leap year. Annual contracts that specify 365 days may technically expire one day early in a leap year, depending on jurisdiction and contract language. Payroll systems for salaried employees may differ in how they handle the extra day — some annual salaries are divided by 365 or 366 depending on the year.

## Other calendar systems

The Islamic Hijri calendar is a purely lunar calendar and does not use the Gregorian leap year system, though it has its own leap year cycle for keeping lunar months aligned. The Hebrew calendar is a lunisolar calendar that adds an entire leap month (Adar I) seven times in every 19-year cycle. The Iranian (Solar Hijri) calendar has an 8-day leap year rule even more accurate than the Gregorian system.

## How to use the checker

Type any year, past or future, and the tool tells you instantly whether it is a leap year, applying the three-part Gregorian rule automatically so you never have to remember the century exception yourself. It is useful for programmers testing edge cases in date-handling code, for anyone calculating deadlines or contract durations that span a February, or simply for satisfying curiosity about a particular year.

## Testing the rule on a few tricky years

The century exception is where most people trip up, so it is worth testing a few cases directly. The year 2100 is divisible by 4, which suggests a leap year, but it is also divisible by 100 and not by 400, so the exception applies and 2100 will not be a leap year — the first time since 1900 that a "divisible by 4" year turns out not to be one. By contrast, 2000 was divisible by 4, by 100 and by 400, so the exception to the exception restored it as a leap year. Running both years through this checker is a quick way to build confidence in the rule before applying it to a date calculation that actually matters.

## Quick reference for the next few century years

Because the century exception is rare and easy to forget, it helps to have a couple of concrete future dates in mind: 2100, 2200 and 2300 will all fail the "divisible by 4" leap year test despite qualifying on the surface, while 2400 will be a leap year again, just as 2000 was. Software that hard-codes "every fourth year is a leap year" without the century exception will quietly produce a wrong answer starting in 2100 — a bug that will not surface for decades, which is exactly the kind of long-dormant edge case this checker helps you verify today.

## Private and instant

The leap year check uses simple arithmetic running entirely in your browser, so the result appears the instant you type a year and nothing you enter is ever sent to a server, logged or shared.

