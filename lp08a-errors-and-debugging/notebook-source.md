# LP 08A | Errors & Debugging | Fall 26

Upload-ready study text. No Notebook upload or generated artifact is claimed.

## I Do: read the evidence

An exception is a runtime failure represented by an object. A syntax error prevents the broken source from starting. A logic error can produce a wrong answer with no exception at all.

Type this small program into a scratch file and run it:

```python
def announce(notes):
    return notes["Grill"]

print(announce({}))
```

**Predict:** does print receive a value? No. `notes["Grill"]` raises `KeyError`. Read the last traceback line for the class and missing key; move upward to the line inside `announce`, then the call site. A traceback is a route to the failure, not a request to wrap the whole program in `except`.

| Evidence | Meaning | First check |
| --- | --- | --- |
| `ValueError` | Correct kind of argument, unusable value | Inspect the string or calendar date. |
| `TypeError` | Operation does not support that type | Print `type(value)` or inspect it in the debugger. |
| `KeyError` | Dictionary key is missing | Inspect keys and spelling. |
| `IndexError` | List position is unavailable | Compare index and length. |
| `ZeroDivisionError` | Divisor is zero | Decide the domain rule for zero. |
| `FileNotFoundError` | Requested path does not exist | Inspect the path and working directory. |
| `NameError` | Name has not been defined | Check spelling and scope. |

Run `python lp08a-errors-and-debugging/code-along.py`. It demonstrates expected failures safely. The warning is written to stderr; printed lines go to stdout, so terminal ordering between those streams can vary.

## We Do: choose a recovery boundary

```python
try:
    note = notes[station]
except KeyError:
    note = "No note"
else:
    print("Found a note")
finally:
    print("Lookup finished")
```

**Predict:** on a missing key, which blocks run? `try`, `except`, `finally`. On a present key: `try`, `else`, `finally`. An unrelated `TypeError` propagates after `finally`. `else` belongs to successful work and its exceptions are not caught by the preceding handlers. Keep the risky operation small.

`finally` runs when a return or exception leaves `try` during normal Python execution. Do not return from `finally`: that can replace the result or swallow the exception. For files, use Week 7's `with` rather than manually reproducing file closure.

Raise an error when your own function's contract is violated. A required kitchen label containing only spaces should raise `ValueError("label required")`. If you replace a library exception with a domain message, `raise ... from error` retains the original cause. Catch it at a caller that can make a useful decision.

## We Do: repair one cause

Broken guard:

```python
if index <= len(labels):
    return labels[index]
```

**Predict:** what does `labels=[]`, `index=0` do? It enters the branch and raises `IndexError`. A one-item list with index `-1` also violates this exercise's rule, though Python accepts it. Repair to `0 <= index < len(labels)`. Confirm both failing cases and a valid case. Do not use a broad catch to conceal an incorrect boundary.

In VS Code, put a breakpoint before the guard, start the Python debugger if configured, and inspect `labels`, `index`, and `len(labels)`. Step over the condition. If a debugger is unavailable, print `repr(labels)` and the index. Use the same cycle: reproduce, shrink, predict, change one cause, rerun the failing case, then check a nearby valid case.

## I Do: record useful context

```python
import logging
logger = logging.getLogger(__name__)
logger.warning("Missing station: %s", station)
```

Set `logging.basicConfig(level=logging.INFO)` once at the program entry point. DEBUG is detailed investigation; INFO is normal progress; WARNING signals a recoverable issue; ERROR means an operation failed; CRITICAL means a severe failure. Inside an `except` block, `logger.exception("Could not read manifest")` records ERROR plus the active traceback. Avoid sensitive data in logs. Reusable functions accept or obtain a named logger; they should not reconfigure global logging.

## Environment check

An environment problem and a program bug need different evidence. If an import fails, check the active Python and environment before changing source. `csv`, `datetime`, and `logging` ship with Python; do not install them with pip. A virtual environment keeps project packages separate; pip installs packages for a Python environment. Use the [existing setup guide](../README.md#getting-started) to create and activate one. This packet needs no external package.

## You Do: prove recovery is selective

Run `python lp08a-errors-and-debugging/check.py`. Start with `station_note`, `repair_pick`, or `require_label`. A passing normal case is only the beginning: missing data, empty data, and wrong types reveal different defects. Then try `run_with_cleanup` or `collect_dates` and explain why one bad date does not discard later valid dates.

Use the [LeetCode class exercise](leetcode-valid-parentheses.md) to apply the same method to a fresh problem. A leading closing bracket is a useful smallest failing input.

## Exit check

1. Which traceback line tells you the exception class? Which tells you your source location?
2. Why does a missing dictionary key need different treatment from an unhashable key?
3. What runs after return when a finally block is present?
4. Why should a successful lookup with empty text keep that empty text?
5. Give one input that finds an error a happy-path test misses.

Answers: the last line and the relevant frame above it; KeyError is a known missing value while TypeError suggests a caller mistake; finally runs before leaving; empty and missing are different states; examples include `]`, an empty list at index zero, and a non-leap February 29.


## Source-grounded tutor prompts

- I Do: give me a tiny traceback and ask me to identify the exception and source line before explaining.
- We Do: show a faulty list boundary and ask for a smallest failing input. Give one hint at a time.
- You Do: ask me to choose a specific exception handler, a cleanup policy, and three meaningful checks for a kitchen manifest function.
- Quiz me on try/except/else/finally, raise, logging levels, and environment concepts. Require a reason for each answer.

Use only these supplemental examples. Do not invent assignment requirements or solve graded work. For bracket input, distinguish LeetCode's nonempty contract from our local empty-string extension.
