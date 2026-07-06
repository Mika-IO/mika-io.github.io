## Count business days between any two dates

Not all days are working days. Weekends interrupt the flow of business, and knowing how many actual working days exist between two dates is essential for project planning, contract management, invoice terms, legal deadlines, and HR calculations. This calculator counts Monday-through-Friday days between any start and end date, excluding Saturdays and Sundays.

## Business days vs calendar days

Calendar days count every day from start to finish, including weekends. Business days (also called working days or weekdays) exclude Saturdays and Sundays. The difference matters when:

- A contract specifies a "30 business day" delivery window — this is six calendar weeks, not 30 days.
- A legal deadline is 10 business days from an event — missing the calendar date would be an error.
- A payment is due "net 30 days" — this usually means 30 calendar days, but some jurisdictions interpret it as business days.
- An employment notice period of 2 weeks — this is 10 business days.

## How the calculator works

The calculator iterates through every day between the two dates and counts only those that fall on Monday, Tuesday, Wednesday, Thursday, or Friday. Both the start date and the end date are included if they are weekdays. The total also shows the breakdown: calendar days, working days, and weekend days.

## Project planning

Project managers use business day calculations constantly. A project plan with 20 tasks, each taking 2 business days, spans at minimum 40 business days — 8 calendar weeks. Adding buffer, dependencies, and review cycles requires knowing exactly how many working days fit into a given calendar span.

Sprint planning in software development typically uses 2-week sprints, which contain 10 working days. Knowing the business days in a longer roadmap horizon helps estimate how many sprints fit between now and a major milestone.

## Invoice and payment terms

Net 30, net 60, and net 90 payment terms are almost always in calendar days. However, some industries and contracts use business days, making the distinction important. A net 30 calendar day invoice issued on a Monday is due 30 calendar days later, regardless of how many weekends fall in between. A 30 business day term ends significantly later — over six calendar weeks.

## Employment and HR

Notice periods for employment termination are frequently specified in weeks or working days. A 2-week notice period starting on a Tuesday ends on the Monday two weeks later — 10 business days. Annual leave entitlements are often in working days per year. HR systems track working day balances for leave requests and approvals.

## Public holidays

This calculator excludes only weekends. Public holidays vary enormously by country, region, state, and even industry, and cannot be determined automatically without additional information. For calculations that must exclude specific holidays, use the result from this calculator as a starting point and manually subtract the relevant holidays that fall within the date range.

## How to use the calculator

Choose a start date and an end date, and the total number of business days between them appears immediately, broken down alongside the calendar day count and the number of weekend days that fall within the range. Because both figures update together, you can see at a glance exactly how many weekends are eating into a given calendar span — useful context whenever a deadline sounds generous in calendar days but turns out to be tight once weekends are subtracted.

## Why the distinction trips people up

The confusion between business days and calendar days is one of the most common small misunderstandings in contracts and project planning, precisely because both are described using the same everyday word "days" with no built-in signal for which one is meant. A "10 day" turnaround sounds identical whether it means ten calendar days or ten business days, but the two can differ by as much as four days depending on how many weekends fall in between, which is exactly the kind of ambiguity that causes genuine disputes over whether a deadline was actually met. Reading a contract or a project plan carefully enough to know which kind of day is meant, and using a calculator like this one to convert between the two, removes the ambiguity before it becomes a disagreement.

## SLAs and turnaround guarantees

Service level agreements frequently promise a response or resolution within a fixed number of business days — "support tickets answered within 2 business days," for example. Calculating whether an SLA has actually been met requires exactly the business-day arithmetic this tool performs: a ticket filed at 4 PM on a Friday and answered Monday morning has technically been answered on the very next business day, even though nearly three calendar days have passed, and the reverse confusion (assuming a Friday-to-Monday gap violates a "1 business day" SLA) is a common source of unnecessary customer complaints.

## Working backwards from a deadline

The calculator also works in reverse for planning purposes: if you know a deliverable is due on a specific date and you know how many business days the work will take, you can count backwards from the deadline to find the latest safe start date. Subtracting business days rather than calendar days from a deadline is exactly what prevents a project plan from silently assuming that work happens on weekends — a mistake that turns a comfortable two-week schedule into a rushed one once someone accounts for the four weekend days actually embedded within it.

## Private and instant

All calculations run entirely in your browser, so the count appears the instant you choose your dates and no dates you enter are ever sent to a server, logged or shared.

