# Hints | Errors & Debugging

Open one level, try a change, then run `python lp08a-errors-and-debugging/check.py` again. These hints stop before the full answer.

## 1. `parse_temp`

<details><summary>Hint 1</summary>`float(text)` does the conversion. What does it do when the text is `n/a`?</details>
<details><summary>Hint 2</summary>Put the conversion in a `try` block and catch the one exception it raises for bad text.</details>
<details><summary>Hint 3</summary>`float("nan")` and `float("inf")` succeed, so a second question comes after the `try`. `math.isfinite(value)` answers it.</details>

## 2. `average_temp`

<details><summary>Hint 1</summary>An average is a sum divided by a count. What is the count of an empty list?</details>
<details><summary>Hint 2</summary>Dividing by zero raises one specific error. You can catch that exact one.</details>
<details><summary>Hint 3</summary>Put `round(sum(readings) / len(readings), 1)` in the `try` and return `None` in the `except ZeroDivisionError`. An `if not readings` guard also works, so pick the one you can explain.</details>

## 3. `ticket_field`

<details><summary>Hint 1</summary>`fields[3]` on a three-item list raises `IndexError`.</details>
<details><summary>Hint 2</summary>Try `fields[-1]` on a list. Does it raise? That is why catching `IndexError` alone is not enough.</details>
<details><summary>Hint 3</summary>Return the default for a negative index first (a guard clause). Then put the lookup in a `try` that catches `IndexError`.</details>

## 4. `repair_parse_qty`

<details><summary>Hint 1</summary>Remove the TODO line and run the check. Which input fails, and what did the function do instead of raising?</details>
<details><summary>Hint 2</summary>A bare `except:` catches everything, so the `TypeError` for `None` disappears. Which exception does `int("oops")` raise?</details>
<details><summary>Hint 3</summary>Name that one exception in the `except` clause and nothing else. Do not widen it to `Exception` or to a tuple that includes `TypeError`.</details>

## 5. `repair_total_weight`

<details><summary>Hint 1</summary>Run the check on `["5", "oops", "7"]`. What total do you get, and which entries were counted?</details>
<details><summary>Hint 2</summary>The `try` wraps the whole loop, so the first bad entry jumps out of the loop for good.</details>
<details><summary>Hint 3</summary>Move the `try` inside the loop so it guards one entry at a time. Use `continue` or `pass` in the `except`.</details>

## 6. `delivery_problems`

<details><summary>Hint 1</summary>Start with an empty list called `problems` and append one string per check. The checks run in the order the docstring gives.</details>
<details><summary>Hint 2</summary>`record.get("item")` returns `None` for a missing key instead of raising `KeyError`. `(value or "").strip()` handles `None` and blank text together.</details>
<details><summary>Hint 3</summary>Write a small helper that returns a finite float or `None`, and let it catch both `ValueError` and `TypeError`. Only check `too warm` when the temp was readable, so use `elif`.</details>

## 7. `read_cooler_log`

<details><summary>Hint 1</summary>Open and read the whole file inside a small `try`, and return `None` from the `except` for the missing file.</details>
<details><summary>Hint 2</summary>`enumerate(lines, start=1)` numbers every physical line, so number first and skip second.</details>
<details><summary>Hint 3</summary>After stripping, skip blank lines and lines that start with `#`. Split on `"|"`, strip each part, and treat the line as bad unless there are exactly two parts and `parse_temp` accepts the second.</details>

## 8. `log_reading`

<details><summary>Hint 1</summary>`logger.info(...)`, `logger.warning(...)`, and `logger.error(...)` are the three levels you need. One call per reading.</details>
<details><summary>Hint 2</summary>Check the `None` case first. Comparing `None > 41` raises a `TypeError`.</details>
<details><summary>Hint 3</summary>Use a format such as `logger.warning("cooler warm: %.1f F", reading)` so the number lands in the message. Return `True` only on the info path.</details>

## 9. `parse_ticket_strict`

<details><summary>Hint 1</summary>`str.split("|")` gives a list. Check its length before you unpack it.</details>
<details><summary>Hint 2</summary>`raise ValueError("...")` stops the function and hands the message to whoever called it. Put the field name in the message.</details>
<details><summary>Hint 3</summary>Convert ticket, table, and qty in a `try`, and in the `except ValueError` raise a new `ValueError` that names the field. Then check dish, qty below 1, and the price in the order the docstring lists.</details>

## 10. `collect_tickets`

<details><summary>Hint 1</summary>Call `parse_ticket_strict` once per line and keep two lists, one for tickets and one for error strings.</details>
<details><summary>Hint 2</summary>`except ValueError as error` gives you the message as `str(error)`, or inside an f-string as `{error}`.</details>
<details><summary>Hint 3</summary>Number the lines with `enumerate(lines, start=1)`, skip blank lines before the `try`, and return the two lists as a tuple.</details>

## 11. `call_with_retries`

<details><summary>Hint 1</summary>Reject `attempts` below 1 before you call anything. Which exception fits a bad argument?</details>
<details><summary>Hint 2</summary>A `for` loop over the attempt number gives you a try counter. Return from inside the `try` the moment `action()` works.</details>
<details><summary>Hint 3</summary>Catch only `ConnectionError`. On the last attempt, use a bare `raise` inside the `except` so the original error leaves unchanged. Other exceptions are not in your `except`, so they leave at once.</details>
