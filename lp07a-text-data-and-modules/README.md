# Text Data & Modules

This kindred packet serves Python Intro 26.4 Week 7. It teaches `open()` with `with`, the `r`, `w`, and `a` modes, reading text line by line, `csv.reader`, `csv.DictReader`, `csv.DictWriter`, parsing rows into a list of dictionaries, and the standard library modules `csv`, `os`, and `datetime`. It also teaches when to import a tool and when to write your own. Its scenarios come from a restaurant kitchen: shift logs, prep lists, and order tickets. It does not give an answer to the graded Week 7 warmups or the expense report. See the [course map](../resources/agents/OFFICIAL_COURSE_MAP.md) for the official week topics.

## Start here

From the repository root:

1. Predict the next printed result, then run `python lp07a-text-data-and-modules/code-along.py`.
2. Open [practice.py](practice.py), replace one `NotImplementedError("TODO")` at a time, and keep the given function names and parameters.
3. Run `python lp07a-text-data-and-modules/check.py`. Each exercise reports `PASS`, `FAIL` with an input and nudge, or `NOT STARTED`.
4. Open one level at a time in [hints.md](hints.md), then compare with [solutions.py](solutions.py) after your own attempt.

No packages are required. Use `python3` on macOS or Linux if `python` is unavailable. The sample files live in [data/](data/): `shift_log.txt`, `prep.csv`, and `tickets.csv`. The scripts build their paths from their own folder, so they run from any working directory.

## I Do, We Do, You Do

| Phase | Activity | Evidence |
| --- | --- | --- |
| I Do | Trace a `with` block, a CSV row, a path, and a date in the [code-along](code-along.py). | Predict the printed values before running. |
| We Do | Repair a loop that wipes its own file and a total that adds text instead of numbers. | Explain which line changes what the file or the sum contains. |
| You Do | Complete the eleven independent exercises and run the local check. | Show one test result and explain its input. |

## Exercise ladder

| Tier | Exercises | Skill |
| --- | --- | --- |
| Warm-up | `read_clean_lines`, `longest_line`, `append_note` | `with`, line by line, `strip()`, modes `r` and `a` |
| Fix it | `repair_total_qty`, `repair_save_lines` | Strings versus numbers, mode `w` wipes the file |
| Build | `load_prep`, `totals_by_station`, `write_prep_report`, `parse_ticket_line`, `first_existing` | `DictReader`, list of dicts, `DictWriter`, splitting a line, `os.path` |
| Extend | `shift_dates` | `datetime`, `strptime`, `strftime`, `timedelta` |

Five of eleven exercises are Warm-up or Fix it. Every spec has an example and an edge case. The public reference answers use shift logs, prep lists, and order tickets. They do not contain a numbered line printer, a student score reader, a working-directory script, a date greeting, or a category expense report. A [text walkthrough](week07-walkthrough.md), a [session plan](run-of-show.md), and a [LeetCode warm-up](leetcode-most-common-word.md) support missed-class review.
