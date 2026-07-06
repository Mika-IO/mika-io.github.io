## Add and subtract time durations easily

Adding or subtracting time seems simple until you hit the arithmetic. Hours, minutes, and seconds use a base-60 system rather than base-10, which means the usual mental arithmetic does not apply directly. Adding 2 hours 45 minutes to 1 hour 30 minutes gives 4 hours 15 minutes, not 4:75. This calculator handles the conversion automatically — enter the hours, minutes, and seconds for each duration, choose add or subtract, and the correctly formatted result appears instantly.

## Common uses for a time calculator

**Total work hours**: If you worked from 8:30 AM to 12:15 PM and then from 1:00 PM to 5:45 PM, add the two sessions to get your total. Enter 3 hours 45 minutes for the morning and 4 hours 45 minutes for the afternoon; the total is 8 hours 30 minutes.

**Travel time**: Adding driving, walking, and transit segments into a total journey time is a frequent use. Three separate legs of 45 minutes, 20 minutes, and 1 hour 10 minutes sum to 2 hours 15 minutes.

**Project tracking**: Summing the time spent on different tasks across a day or week gives total billable hours. Freelancers and contractors often track time in hours and minutes and need to sum multiple entries.

**Sports and competition**: Comparing lap times, summing stage times in a race, or calculating how much time a competitor needs to make up.

**Cooking**: Multiple dishes with different cooking times starting at different points can be tracked by adding elapsed times.

## The base-60 system

Time uses sexagesimal (base-60) arithmetic, inherited from ancient Babylonian mathematics. There are 60 seconds in a minute and 60 minutes in an hour, so carrying from seconds to minutes happens at 60, not at 100. This is why simple decimal addition produces wrong results for time: 45 minutes + 30 minutes = 75 minutes = 1 hour 15 minutes, not 0.75 hours.

The calculator converts all inputs to total seconds, performs the arithmetic in seconds, then converts back to hours, minutes, and seconds for display. This approach handles all carrying and borrowing correctly regardless of the values entered.

## Negative results

When subtracting, if Time A is less than Time B the result is negative — for example, if you subtract 3 hours from 1 hour you get minus 2 hours. The calculator displays the absolute value with a minus sign prefix. This can be useful for understanding how much time you are over a budget or target.

## Hours beyond 24

Unlike a clock, the hours field accepts any non-negative integer, so you can work with durations of 48 hours, 100 hours, or more. This is useful for multi-day project tracking, total marathon split times, or any other large-scale time arithmetic.

## How to use the calculator

Enter the hours, minutes and seconds for your first duration, choose whether to add or subtract, then enter the second duration the same way. The result appears immediately in correctly carried hours, minutes and seconds — you never need to manually work out that 75 minutes should display as 1 hour 15 minutes, since the calculator always normalises the result for you.

## Why simple addition goes wrong

The root of the confusion is that a duration like "1 hour 45 minutes" is not really the number 1.45 — it is 1 hour plus 45 out of 60 minutes, a mixed-base value that decimal arithmetic was never designed to handle directly. If you tried to add 1:45 and 0:30 by simply adding the digits, you would get 1:75, which is not a valid time at all. The calculator sidesteps this entirely by converting everything to a single unit — total seconds — doing the addition or subtraction as ordinary arithmetic on that one number, and only converting back to hours, minutes and seconds for the final display. This "convert to one unit, calculate, convert back" pattern is the standard, reliable way to handle any base-60 arithmetic correctly, and it is exactly what happens behind the scenes every time you press calculate.

## Sports and cooking

Comparing lap times, summing stage times across a multi-stage race, or working out how much time a competitor needs to make up over the remaining distance are all common uses in sport. In the kitchen, tracking several dishes with different cooking times that started at different points is easier when you can add and subtract elapsed durations directly rather than watching several separate timers and doing the arithmetic in your head.

## Total work hours, worked through

If you worked from 8:30 AM to 12:15 PM and then again from 1:00 PM to 5:45 PM, working out your total hours for the day means adding two separate durations: 3 hours 45 minutes for the morning session and 4 hours 45 minutes for the afternoon session. Added together that comes to 8 hours 30 minutes, not the 8:90 you would get from careless decimal addition. Freelancers, contractors and anyone billing by the hour run this exact calculation regularly, often summing several such sessions across a week to arrive at a total for an invoice, and small arithmetic slips compound quickly when done by hand across many entries.

## Private and instant

All calculations run entirely in your browser, converting to total seconds and back for correctly carried results, so nothing you enter is ever sent to a server, logged or shared. It works offline once loaded and keeps no record of any duration you calculate.

