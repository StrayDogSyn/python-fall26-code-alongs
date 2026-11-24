# Week 8 catch-up | Errors & Debugging

Use this after class or beside the slides. Predict before each run, then compare with `python lp08a-errors-and-debugging/code-along.py`. The examples use a restaurant kitchen's cooler log, deliveries, and order tickets, not the graded assignment.

## 1. Two kinds of error

A syntax error means Python cannot read your program, so nothing runs at all. A runtime error means the program started and then one line met one bad input. Think of a recipe with a smudged line (syntax) versus a recipe that says "add the shallots" when the shallots are gone (runtime). The six runtime errors you will meet most: `ValueError` (right type, wrong content, as in `int("twelve")`), `TypeError` (wrong type, as in `"4" + 6`), `KeyError` (a dictionary key that is not there), `IndexError` (a list position that is not there), `FileNotFoundError` (a path that does not lead to a file), and `ZeroDivisionError`. **Predict:** Which of the six does `int(None)` raise? (Hint: it is about the type, not the content.)

## 2. try, except, else, finally

| Block | Runs when |
| --- | --- |
| `try` | Always first. Put only the line that can fail in here. |
| `except ValueError` | Only when the `try` raised that exact error. |
| `else` | Only when the `try` raised nothing. |
| `finally` | Every time, error or not. Use it for cleanup. |

The code-along records a trail so you can see the order. **Predict:** For the text `"n/a"`, which of the four names appear in the trail, and in what order?

## 3. Catch the failure you expect, not every failure

`except Exception` and a bare `except:` catch things you did not plan for, including your own typos. The code-along shows `sloppy_qty("12")` returning `0` because a misspelled variable raised `NameError` and the catch-all swallowed it. The program kept running and gave a wrong answer, which is worse than a crash. A bare `except:` goes further and also catches Ctrl+C, so you cannot even stop the program. The rule: name the one exception you expect. **Predict:** What does `careful_qty(None)` do, and why is that the right behavior?

## 4. `as e`: the message is data

`except ValueError as error:` gives the error a name. `str(error)` or `{error}` in an f-string is the message, and `type(error).__name__` is the class name. You can log them, show them, or build a better sentence from them. **Predict:** What message does `int("12.5")` give?

## 5. `raise`: say so loudly

When you find the problem yourself, raise the error yourself, with a message that helps the next reader: `raise ValueError(f"guests must be at least 1, got {guests}")`. A bare `raise` inside an `except` passes the original error along unchanged, which is useful when you want to leave a note and still stop. **Predict:** If you catch an error, print a note, and use a bare `raise`, does the caller see the error?

## 6. Defensive programming

Validate input before you use it. Use guard clauses, which are early returns for the bad cases, so the good path reads straight down instead of nesting three levels deep. The code-along has `label_nested` and `label_guarded` giving identical answers. Check for `None` before you compare or call a method on a value.

Not every problem raises an error. `items[-1]` never raises on a non-empty list, so if a negative index is a mistake in your program, only a guard clause will catch it. And `float("nan")` converts without complaint, so an unreadable thermometer can slip a bad number into your average. Failing loudly (an error you can see) beats failing silently (a wrong number nobody notices). **Predict:** Does `["Corn", "Ramen"][-1]` raise an error?

Check cheaply when you can (`if key in menu`). Catch when the check costs as much as the work, or when the situation can change between the check and the use (a file someone deletes a moment after you looked). Keep the `try` as small as the one line that can fail.

## 7. What `csv.DictReader` does with a ragged row

`DictReader` does not raise when a row has the wrong number of fields. A short row gets `None` for the missing values, so `int(None)` raises `TypeError`, not `ValueError`. A long row files the extra values as a list under the key `None`, so `None in row` is the test. Blank lines are skipped, so "Row N" counts records, not file lines. **Predict:** For the row `Butter,3` under the header `name,qty,unit`, what is `row["unit"]`?

## 8. Fail gracefully

Graceful means the program keeps going with a safe default and leaves a record of what happened, instead of crashing or going quiet. The `logging` module has levels so you can tell a note from an alarm: `DEBUG` for details only a developer wants, `INFO` for normal events, `WARNING` for something odd but survivable, and `ERROR` for a failure. Set the handler to `INFO` and the `DEBUG` line disappears without you deleting it. A missing log returns `None` and logs an `ERROR`, and a bad line logs a `WARNING` and is skipped. **Predict:** With the level set to `INFO`, which of the four messages print?

## 9. `assert`

`assert guests > 0, "guests must be positive"` is a tripwire for the programmer. Running Python with `-O` removes every `assert`, so never use one to check input that a user might get wrong. Use `if` and `raise` for that.

## 10. pip and virtual environments

pip installs packages from PyPI, the public package index. If everything installs into one global Python, every project shares one pile, and two projects that need different versions of the same package cannot both be happy. A virtual environment is a private folder with its own Python and its own pile. The steps, in order: create it (`python -m venv .venv`), activate it (`.venv\Scripts\activate` on Windows, `source .venv/bin/activate` on macOS and Linux), install into it (`pip install requests`), write down exactly what is installed (`pip freeze > requirements.txt`), and rebuild the same pile somewhere else (`pip install -r requirements.txt`). Do not commit the `.venv` folder itself; commit `requirements.txt` and list `.venv/` in `.gitignore`. **Predict:** What does `sys.prefix != sys.base_prefix` tell you?

## Run the local check

Start with a Warm-up or Fix it task in [practice.py](practice.py), run `python lp08a-errors-and-debugging/check.py`, and open [hints.md](hints.md) only as needed. A `NOT STARTED` line points to a TODO, while a `FAIL` line names the input and expected result. When you want more reps, the [LeetCode warm-up](leetcode-valid-parentheses.md) is a problem where the first draft crashes on purpose.

**Exit check:** Explain the difference between a syntax error and a runtime error. Explain why `except Exception` is risky. Give one case where you would check first and one where you would catch.
