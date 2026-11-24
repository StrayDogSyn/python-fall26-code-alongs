# Errors & Debugging

This kindred packet serves Python Intro 26.4 Week 8. It teaches the difference between syntax errors and runtime errors, `try`, `except`, `else`, and `finally`, catching specific exceptions, the `as e` form, `raise`, the common runtime errors, the `logging` module and its levels, defensive programming (validating input, guard clauses, checking for `None`, failing loudly versus silently, `assert`), returning safe defaults, and a first look at pip and virtual environments. Its scenarios come from a restaurant kitchen: a cooler log, deliveries, and order tickets. It does not give an answer to the graded Week 8 warmups or the defensive CSV reader. See the [course map](https://github.com/StrayDogSyn/python-fall26-code-alongs/blob/main/resources/agents/OFFICIAL_COURSE_MAP.md) for the official week topics.

## Start here

From the repository root:

1. Predict the next printed result, then run `python lp08a-errors-and-debugging/code-along.py`.
2. Open [practice.py](practice.py), replace one `NotImplementedError("TODO")` at a time, and keep the given function names and parameters.
3. Run `python lp08a-errors-and-debugging/check.py`. Each exercise reports `PASS`, `FAIL` with an input and nudge, or `NOT STARTED`.
4. Open one level at a time in [hints.md](hints.md), then compare with [solutions.py](solutions.py) after your own attempt.

No packages are required. Use `python3` on macOS or Linux if `python` is unavailable. The sample file lives in [data/](data/): `cooler_log.txt`. The scripts build their paths from their own folder, so they run from any working directory.

## I Do, We Do, You Do

| Phase | Activity | Evidence |
| --- | --- | --- |
| I Do | Trace a `try` with `else` and `finally`, then six runtime errors, in the [code-along](code-along.py). | Predict which blocks run before running. |
| We Do | Repair a bare `except` that hides a real error and a `try` that wraps a whole loop. | Explain which input fails and why the fix catches less, not more. |
| You Do | Complete the eleven independent exercises and run the local check. | Show one test result and explain its input. |

## Exercise ladder

| Tier | Exercises | Skill |
| --- | --- | --- |
| Warm-up | `parse_temp`, `average_temp`, `ticket_field` | `try/except` with a specific exception, `ZeroDivisionError`, `IndexError`, a guard clause |
| Fix it | `repair_parse_qty`, `repair_total_weight` | A bare `except` hides bugs; a `try` belongs around one item, not the whole loop |
| Build | `delivery_problems`, `read_cooler_log`, `log_reading`, `parse_ticket_strict`, `collect_tickets` | Validating input, a narrow `try` around a file, logging levels, `raise` with a clear message, `except ... as error` |
| Extend | `call_with_retries` | Retrying only the failure worth retrying, re-raising with a bare `raise` |

Five of eleven exercises are Warm-up or Fix it. Every spec has an example and an edge case. The public reference answers use a cooler log, deliveries, and order tickets. They do not contain a loop that asks for a number until it parses, a program that divides two typed numbers, a missing-file message for a named file, a virtual environment script, or a CSV reader that prints rows attempted, parsed, and skipped. A [text walkthrough](week08-walkthrough.md), a [session plan](run-of-show.md) with a mentor heads-up for the graded work, and a [LeetCode warm-up](leetcode-valid-parentheses.md) support missed-class review.
