# Graded-assignment overlap list

Purpose: public solutions in this repository must never solve a Code the Dream graded task. Check every new public exercise and every `solutions.py` against this list before you add it. This is a paraphrase made on November 2, 2026 from the course pages, not a copy. Hunter or Claude re-read the portal if a wording question matters.

Rule: a practice exercise may use the same **skill** as a graded task. It may not use the same **problem**, the same **function name and signature**, or the same **scenario**. If a student could paste your solution into their assignment and pass, the exercise is too close.

## Week 3, Control Flow (graded)

- Four warmups: grading text for score ranges, grouping ages into categories, a Boolean expression practice sheet, and a number sign and parity check.
- Mini-project: Day Planner (an `input()` driven decision script).
- Avoid: letter grades from scores, age bands, sign or odd/even classification, daily planners.

## Week 5, Iteration and Algorithms (graded)

- Warmups: add up a numeric range with `for`; keep asking with `while` until a positive whole number arrives; find a value in a list by looping, without `.index()` or `in`; the classic fizz and buzz counting printout.
- Mini-project: Number Cruncher, a menu loop offering minimum, maximum, search, and bubble sort, with no built-in `min`, `max`, `sorted`, or `.sort()`.
- Avoid: first-match linear search without built-ins, positive-integer input validation, the fizz/buzz printout, a summing exercise over 1 to 100, and any menu program covering min, max, search, and bubble sort.
- Already handled: PR #14 replaced the practice `linear_search` with `last_match_search`.

## Week 6, Functions and Scope (graded, due November 10)

Four warmups, each a separate file:

1. **Default parameters.** A greeting function `greet(name, greeting="Hello")` that prints, then three calls: name only, name plus custom greeting, greeting as a keyword argument.
2. **Return values.** Two temperature converters, Celsius to Fahrenheit and the reverse, called with a few values and printed with f-strings rounded to one decimal.
3. **Scope.** One file showing a function-local variable failing with `NameError` outside the function (error pasted in a comment), then fixing it with `return` and assignment.
4. **Validation function.** `is_valid_score(score)` returns whether an integer is from 0 to 100 inclusive; the script reads input, converts with `int()`, and prints one of two messages.

Mini-project: **refactor the Number Cruncher.** A new file with `find_min`, `find_max`, `search(numbers, target)` (returns an index or -1 and does not print), `bubble_sort` (returns a new list, input unchanged), `show_menu()` (prints options and returns the choice), and `main()` (the loop that dispatches and prints "Found at index" or "Not found"). No logic outside functions except the data list and the call to `main()`.

Avoid in public solutions:

- Function names `greet`, `celsius_to_fahrenheit`, `fahrenheit_to_celsius`, `is_valid_score`, `find_min`, `find_max`, `search`, `bubble_sort`, `show_menu`, and `main` used for these jobs.
- Any temperature converter, any 0 to 100 score validator, any greeting with a default, any menu dispatcher over min, max, search, and sort.
- A scope demo that is only "local variable raises NameError, then return it" with the same shape.
- A full refactor of a Week 5 style menu script.

Safe Week 6 ideas that teach the same skills with different problems:

| Skill | Different problem |
| --- | --- |
| Defaults and keyword arguments | `shipping_label(city, country="USA", express=False)`, `box_volume(length, width, height=1)` |
| Return versus print | `price_with_tax(price, rate=0.07)` and a caller that prints; a `Fix it` where the function prints but should return |
| Scope | A counter bug where a function assigns to a name that exists globally; `Fix it` with an `UnboundLocalError`; shadowing a built-in name by accident |
| Validation | `is_valid_username(text)` (length and allowed characters), `is_valid_time(hour, minute)` |
| Refactoring | A given 25 line script about a library fine or parking fee, split into three named functions with the same output; the check runs both versions on the same inputs |
| Docstrings | Write the docstring for a given function; the check reads `__doc__` for a first-line summary |

## Weeks 7 to 9, titles only (read before building)

- Week 8 warmup: validating numeric input (the other warmups were not fully read).
- Week 9 warmups: a first API request, picking specific JSON fields, looping a JSON list, handling request errors. Mini-project: a country explorer command line tool.
- Weeks 7, 10, 11: assignment text not read. Read it before building any packet.

## Process

1. Before adding an exercise, list its function name, signature, and scenario. Compare with this file.
2. Put the comparison in the pull request description in one line per exercise.
3. If you are unsure, change the scenario. Cost: a few minutes. Cost of a leaked solution: a graded student submission.
