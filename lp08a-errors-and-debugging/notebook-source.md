# LP 08A | Errors & Debugging | Fall 26

This is source text Hunter can add to the cohort Gemini Notebook. No upload or generated Notebook artifact is claimed. The packet uses a restaurant kitchen's cooler log, deliveries, and order tickets so public reference code does not solve the graded Week 8 work.

## Learning targets

Tell a syntax error from a runtime error, name the common runtime errors (`ValueError`, `TypeError`, `KeyError`, `IndexError`, `FileNotFoundError`, `ZeroDivisionError`), use `try`, `except`, `else`, and `finally`, catch a specific exception instead of every exception, use `as` to read an error's message, raise an error with `raise`, validate input with guard clauses and checks for `None`, tell failing loudly from failing silently, use `assert` for development-time checks, return a safe default and log what went wrong with the four `logging` levels, and explain what pip and a virtual environment are for.

## 1. Two kinds of error

A syntax error stops Python before anything runs. A runtime error happens on one line with one input while the program is running. **Predict:** Which exception does `int(None)` raise?

## 2. try, except, else, finally

`try` holds the line that can fail, `except` handles a named failure, `else` runs only when nothing failed, and `finally` runs every time. **Predict:** For the text `n/a`, which of the four run, in what order?

## 3. Specific versus broad

`except Exception` and a bare `except:` also catch typos and, for a bare one, Ctrl+C. A wrong answer with no error is worse than a crash. Catch the one failure you expect. **Predict:** What should `int(None)` do inside a function that only expects bad text?

## 4. `as` and `raise`

`except ValueError as error` names the error so its message can be used. `raise ValueError("message")` raises one on purpose, and a bare `raise` inside an `except` passes the original error along. **Predict:** Does the caller still see an error after a bare `raise`?

## 5. Defensive programming

Validate input before use. A guard clause is an early return for a bad case, which keeps the good path from nesting. A negative index does not raise on a non-empty list, and `float("nan")` converts without error, so some bad input needs an explicit check. **Predict:** Does `["Corn", "Ramen"][-1]` raise?

## 6. Ragged CSV rows

`csv.DictReader` fills a short row's missing values with `None` and files extra values as a list under the key `None`. It skips blank lines. **Predict:** What is the `unit` of the row `Butter,3` under the header `name,qty,unit`?

## 7. Graceful failure and logging

Return a safe default, and leave a record. `DEBUG` is for developer detail, `INFO` for normal events, `WARNING` for something odd but survivable, and `ERROR` for a failure. A handler's level hides lower messages. **Predict:** At level `INFO`, which of the four levels print?

## 8. assert

`assert condition, message` is a tripwire for the programmer. Running Python with `-O` removes it, so it is not input validation.

## 9. pip and virtual environments

pip installs packages from PyPI. A virtual environment is a private folder with its own Python and packages, so projects do not share one pile. Create it with `python -m venv .venv`, activate it, install into it, record it with `pip freeze > requirements.txt`, and rebuild with `pip install -r requirements.txt`. Commit `requirements.txt`, not the `.venv` folder. **Predict:** What does `sys.prefix != sys.base_prefix` tell you?

## Check yourself

1. Explain the difference between a syntax error and a runtime error.
2. Name when each of `try`, `except`, `else`, and `finally` runs.
3. Explain why `except Exception` can hide a bug.
4. Give one reason a guard clause can be better than `try/except`, and one reason it cannot.
5. Explain what `requirements.txt` is for.
