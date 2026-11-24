# Errors & Debugging | Week 8

For Python Intro 26.4, November 23, 2026, 8:00 PM Eastern. Build on Week 7's kitchen files: keep useful work, identify bad records, and explain failures. The lesson follows the official Week 8 topics in the [course map](../resources/agents/OFFICIAL_COURSE_MAP.md).

## Start here

1. Open the [slides](../week08/week08-slides.html) and [90-minute mentor plan](run-of-show.md).
2. Predict each result, then run `python lp08a-errors-and-debugging/code-along.py` from the repository root.
3. Edit one TODO in [practice.py](practice.py), then run `python lp08a-errors-and-debugging/check.py`.
4. Open one hint at a time in [hints.md](hints.md). Compare [solutions.py](solutions.py) after your attempt.

All student scripts use the standard library. No install is required. Use `python3` if your macOS or Linux machine has no `python` command. The code-along and check find their own files and can run from another working directory. The check uses temporary files.

## I Do, We Do, You Do

| Phase | Task | Evidence |
| --- | --- | --- |
| I Do | Read a traceback bottom up; trace a specific exception and the caller that handles it. | Predict the class and the line that failed. |
| We Do | Repair an index guard, follow cleanup on success and failure, then debug a bracket validator together. | Name a smallest failing input before changing code. |
| You Do | Choose a Warm-up or Fix it, then a Build exercise. | Run the local check and explain why an unexpected TypeError should still surface. |

## Exercise ladder

| Function | Tier | Contract and edge case |
| --- | --- | --- |
| `describe_error(error)` | Warm-up | Return the exception class name, not its message. Example: KeyError("oven") gives "KeyError". Edge: ValueError("") still gives "ValueError". |
| `station_note(notes, station)` | Warm-up | Look up a station in a dictionary. Catch only KeyError and return "No note" for a missing key. Example: ({"Grill": "hot"}, "Grill") gives "hot". Edge: an existing empty note stays ""; an unhashable key must still raise TypeError. |
| `portion_size(total, trays)` | Warm-up | Divide total by trays; return None only for ZeroDivisionError. Example: (9, 2) gives 4.5. Edge: (0, 2) gives 0.0, (9, 0) gives None; ("9", 2) must raise TypeError. No input() loop. |
| `repair_pick(labels, index)` | Fix it | Return labels[index] only for a nonnegative index within the list. Otherwise return None. Example: (["soup", "tart"], 1) gives "tart". Edge: index -1 and an empty list give None. Inputs are a list and an integer. Repair the faulty guard: if index <= len(labels): return labels[index]. |
| `require_label(text)` | Fix it | Return stripped text, but raise ValueError("label required") for blank text. Example: " Grill " gives "Grill". Edge: " \t" must raise. Repair the faulty response: if not text: return "unknown". The caller supplies a string. |
| `read_optional(path)` | Build | Read all UTF-8 text with with; return "" only when the file is missing. Example: a file containing "menu\n" gives "menu\n". Edge: a missing path gives ""; a directory or invalid UTF-8 must still raise its own error. |
| `parse_service_date(text)` | Build | Parse YYYY-MM-DD with datetime.strptime and return a date object. Chain ValueError("invalid service date") from the original ValueError when parsing fails. Example: "2028-02-29" is a valid leap date. Edge: "2026-02-29" raises; wrong argument types must propagate TypeError. |
| `run_with_cleanup(operation, cleanup)` | Build | Call operation() and return its result; always call cleanup() exactly once afterward. Do not suppress an operation exception. cleanup itself is assumed not to raise. Example: an operation returning 7 gives 7 after cleanup. Edge: a failing operation still cleans up. |
| `logged_lookup(notes, station, logger)` | Build | Return a stored note. On KeyError, call logger.warning("Missing station: %s", station) once and return None. Example: ({"Grill": "ready"}, "Grill", logger) gives "ready" with no log. Edge: missing station logs; a TypeError propagates without a warning. |
| `collect_dates(texts)` | Build | For strings in texts, return (valid, rejected). valid contains date objects in input order; rejected contains one-based positions of invalid calendar strings. Catch only ValueError per item. Example: ["2026-11-23", "oops"] gives ([date(2026,11,23)], [2]). Edge: [] gives ([], []); None in the list must raise TypeError. Do not alter the input. |
| `balanced_brackets(text)` | Extend | For bracket-only text, return whether (), [] and {} close in reverse opening order. Example: "{[]}" gives True, "([)]" gives False. Edge: "]" and "((" give False; "" gives True as a local extension beyond LeetCode's nonempty input contract. Other characters are outside this function's contract. |

Five exercises are Warm-up or Fix it. Each has examples, edge cases, a local check, three hints, and a reference answer. The check reports PASS, FAIL with a nudge, or NOT STARTED. Eleven NOT STARTED results and a nonzero exit are expected before editing.

## More session material

- [Text walkthrough](week08-walkthrough.md): predictions, repairs, debugger steps, and exit questions.
- [LeetCode 20: Valid Parentheses](leetcode-valid-parentheses.md): a twelve-minute class plan, broken version, trace, and reveal.
- [Notebook source](notebook-source.md): upload-ready study text; no upload is claimed.
- [Bridge the Dream map](bridge-the-dream-map.md): topic crosswalk with unverified external coverage marked.

The full graded Week 8 assignment text is unavailable in this checkout. These are supplemental kitchen and bracket exercises compared against the known overlap checklist. They do not implement the known numeric-input warmup. Exact assignment overlap still needs a mentor comparison before sharing reference answers. See the mentor plan for the distinction between general support and assignment-specific claims.
