## Find the day of the week for any date

Knowing what day of the week a specific date falls on is useful for a surprising range of purposes: checking what day of the week you were born, finding out the day of an important historical event, verifying what day a future meeting or holiday lands on, or solving trivia questions. Enter any date and the day of the week is shown instantly.

## How day-of-week calculation works

The day of the week for any date can be determined through a formula called Zeller's Congruence or the Doomsday algorithm, both of which use modular arithmetic. The JavaScript Date object used by this calculator applies the Gregorian calendar rules automatically, giving accurate results for any date in the Gregorian calendar era.

## Historical curiosities

Several historically significant dates have interesting day-of-week properties:

- **January 1, 2000** (Y2K): Saturday — the widely feared computer bug hit on a weekend, reducing immediate business disruption.
- **July 4, 1776** (US Independence): Thursday — the Continental Congress approved the Declaration of Independence on a Thursday.
- **November 9, 1989** (Berlin Wall falls): Thursday.
- **September 11, 2001**: Tuesday — the attacks on the World Trade Center occurred on a Tuesday morning.
- **December 25, 2025** (Christmas): Thursday.

## Birthday curiosity

Many people are curious about what day of the week they were born. This calculation requires only the birth date. Famous birthdays reveal interesting patterns — Albert Einstein was born on a Friday (March 14, 1879), and William Shakespeare both was born and died on an April 23 that fell on a Tuesday (1564) and Wednesday (1616) respectively.

## Day of the week for planning

Knowing the day of the week for a future date helps with practical planning: confirming that a scheduled event does not fall on a weekend, checking which day of the week a public holiday falls on (a Monday holiday creates a long weekend), or verifying the day of the week for a visa appointment, flight booking, or contract deadline.

## The Gregorian calendar and other systems

The Gregorian calendar was introduced in 1582 by Pope Gregory XIII as a reform of the Julian calendar. Different countries adopted it at different times — Britain and its colonies switched in 1752, Russia not until 1918. Dates before a country's adoption of the Gregorian calendar technically fall under the Julian calendar, where the same date corresponds to a different day of the week. This calculator uses the proleptic Gregorian calendar — the Gregorian rules applied consistently backward — which is the standard approach for historical date calculations.

## How to use the tool

Pick any date using the date field, past or future, and the day of the week appears immediately below it. There is no separate button to press — changing the date instantly recalculates the result, so you can quickly step through a range of dates, such as checking every anniversary of an event for the next ten years, or scan backward to check a string of historical dates one after another.

## A trick for working it out in your head

The Doomsday rule, popularised by mathematician John Conway, is a mental shortcut for finding the day of the week for any date without a calculator. It works by memorising the "doomsday" for each year — a day of the week that several easy-to-remember dates always fall on, such as 4/4, 6/6, 8/8, 10/10 and 12/12 — and then counting forward or backward from the nearest of those dates to the date you want. It takes some practice to use quickly, but it is a genuinely impressive party trick once learned, and this calculator gives you an easy way to check your mental arithmetic against a guaranteed-correct answer.

## Why the same date can be a different weekday in different years

Because a normal year has 365 days — not a multiple of 7 — the weekday that any fixed date (like your birthday) falls on shifts forward by one day each year, and by two days across a leap year, since the extra February day pushes everything after it forward an additional step. This is why a birthday drifts from a Tuesday one year to a Wednesday the next, then jumps to a Friday after a leap year gets in the way. Over a long enough stretch the pattern repeats: any given date returns to the same weekday after a cycle of 28 years under the old Julian-style spacing of leap years, though the Gregorian century exceptions occasionally stretch that cycle slightly.

## Checking a date without a computer

If you ever need to verify a day of the week away from any device, the Doomsday method is worth learning properly. Each year has a single "doomsday" weekday, and a short list of easy anchor dates — 4/4, 6/6, 8/8, 10/10, 12/12, and also 9/5 and 5/9, 7/11 and 11/7 — always fall on it within that year. Once you know the year's doomsday, you count forward or backward in whole weeks from the nearest anchor date to reach the date you actually care about, since moving by exactly seven days never changes the weekday. With practice, people who learn this trick can name the weekday for almost any date within a couple of seconds, and this calculator is the perfect place to check your answer instantly against a guaranteed-correct result.

## Private and instant

The calculation uses JavaScript's built-in Date object running entirely in your browser, applying the Gregorian calendar rules automatically, so the result appears the instant you pick a date and nothing you enter is ever sent to a server, logged or shared.

