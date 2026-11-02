# LP 01 hints

Open one hint at a time. Run `python lp01-intro-to-python/check.py` after each change.

## 1. classify_score

<details><summary>Hint 1: look</summary>Find the exact boundary in the docstring.</details>
<details><summary>Hint 2: plan</summary>One branch handles scores at or above the boundary; the other handles scores below it.</details>
<details><summary>Hint 3: shape</summary>Use `if score >= ...:` and return one of the two full labels.</details>

## 2. count_passing

<details><summary>Hint 1: look</summary>Trace which items in `[70, 62, 91]` count.</details>
<details><summary>Hint 2: plan</summary>Start a counter before the loop and update it only for passing items.</details>
<details><summary>Hint 3: shape</summary>Put `return count` after the `for` block so the whole list is visited.</details>

## 3. parse_score

<details><summary>Hint 1: look</summary>The given conversion raises an error for `oops`.</details>
<details><summary>Hint 2: plan</summary>Remove edge spaces, then catch the error from `int()`.</details>
<details><summary>Hint 3: shape</summary>Use `try` for conversion and `except ValueError` to return `None`.</details>

## 4. average

<details><summary>Hint 1: look</summary>What divisor would an empty list give you?</details>
<details><summary>Hint 2: plan</summary>Handle empty input first, then divide the total by the item count.</details>
<details><summary>Hint 3: shape</summary>Use `sum(scores)`, `len(scores)`, and `round(..., 1)`.</details>

## 5. lowest_and_highest

<details><summary>Hint 1: look</summary>Check the order of the two values in the example tuple.</details>
<details><summary>Hint 2: plan</summary>Empty input needs a separate return before either builtin runs.</details>
<details><summary>Hint 3: shape</summary>For nonempty input, put `min(scores)` first and `max(scores)` second.</details>

## 6. countdown

<details><summary>Hint 1: look</summary>The result stops at 1, not 0.</details>
<details><summary>Hint 2: plan</summary>Append the current value, then make it smaller.</details>
<details><summary>Hint 3: shape</summary>Start with an empty list and loop while `n > 0`.</details>

## 7. numbered_lines

<details><summary>Hint 1: look</summary>The first label is 1 even though list indexes begin at 0.</details>
<details><summary>Hint 2: plan</summary>Ask `enumerate` to begin at the number students see.</details>
<details><summary>Hint 3: shape</summary>Build each string with an f-string containing the number, a period, and the name.</details>

## 8. clean_name

<details><summary>Hint 1: look</summary>`strip()` handles only the edges, not the wide gaps inside.</details>
<details><summary>Hint 2: plan</summary>Turn the text into words, join them with single spaces, then fix capitalization.</details>
<details><summary>Hint 3: shape</summary>Use `text.split()`, `" ".join(...)`, and `.title()` in that order.</details>

## 9. grade_letter

<details><summary>Hint 1: look</summary>A score of 90 also passes the 80 test. Which branch should run first?</details>
<details><summary>Hint 2: plan</summary>Check cutoffs from highest to lowest and use the final branch for F.</details>
<details><summary>Hint 3: shape</summary>Use `if`, then `elif` for 80, 70, and 60, then `else`.</details>

## 10. total_points

<details><summary>Hint 1: look</summary>The given function returns after the first point.</details>
<details><summary>Hint 2: plan</summary>Make the loop finish before the total leaves the function.</details>
<details><summary>Hint 3: shape</summary>Keep the running total inside the loop and move `return` outside it.</details>
