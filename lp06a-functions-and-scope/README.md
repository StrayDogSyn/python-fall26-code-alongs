# Functions & Scope

This kindred packet serves Python Intro 26.4 Week 6. It teaches `def`, parameters, defaults, `return`, local and outer scope, docstrings, and refactoring with event and library examples. It does not give an answer to the graded Week 6 warmups or the Number Cruncher refactor. See the [course map](../resources/agents/OFFICIAL_COURSE_MAP.md) for the official week topics.

## Start here

From the repository root:

1. Predict the next printed result, then run `python lp06a-functions-and-scope/code-along.py`.
2. Open [practice.py](practice.py), replace one `NotImplementedError("TODO")` at a time, and keep the given function names and parameters.
3. Run `python lp06a-functions-and-scope/check.py`. Each exercise reports `PASS`, `FAIL` with an input and nudge, or `NOT STARTED`.
4. Open one level at a time in [hints.md](hints.md), then compare with [solutions.py](solutions.py) after your own attempt.

No packages are required. Use `python3` on macOS or Linux if `python` is unavailable.

## I Do, We Do, You Do

| Phase | Activity | Evidence |
| --- | --- | --- |
| I Do | Trace a function call, a default, a returned value, and a local name in the [code-along](code-along.py). | Predict the values before running. |
| We Do | Repair a function that prints instead of returning and another that overwrites a caller's argument. | Explain which caller-visible result changes. |
| You Do | Complete the eleven independent exercises and run the local check. | Show one test result and explain its input. |

## Exercise ladder

| Tier | Exercises | Skill |
| --- | --- | --- |
| Warm-up | `badge_line`, `headline`, `format_duration` | Defaults, keyword arguments, returned text |
| Fix it | `repair_price_line`, `repair_shadowed_prefix` | Return versus print, shadowing a parameter |
| Build | `card_from_parts`, `scope_snapshot`, `make_signoff`, `render_agenda`, `batch_badges` | Named parameters, local scope, composition, refactoring |
| Extend | `make_visit_tracker` | Independent enclosed state |

Five of eleven exercises are Warm-up or Fix it. Every spec has an example and an edge case. The public reference answers use event badges, agenda text, and local counters. They do not contain a greeting function, a temperature converter, a score validator, or a Number Cruncher menu. A [text walkthrough](week06-walkthrough.md) and [session plan](run-of-show.md) support missed-class review.
