# LP 03 hints

Open one level at a time. Run `python lp03-more-python-skills/check.py` after each change.

## 1. Tally
<details><summary>Hint 1: look</summary>An unseen label has appeared zero times.</details>
<details><summary>Hint 2: plan</summary>Give each instance a dictionary, then update one key at a time.</details>
<details><summary>Hint 3: shape</summary>Use `.get(label, 0)` both when increasing and when reading a count.</details>

## 2. long_words
<details><summary>Hint 1: look</summary>A word exactly at the minimum length belongs in the result.</details>
<details><summary>Hint 2: plan</summary>Keep input order while filtering by length.</details>
<details><summary>Hint 3: shape</summary>Use a list comprehension with `if len(word) >= min_length`.</details>

## 3. make_multiplier
<details><summary>Hint 1: look</summary>The returned value must be callable later.</details>
<details><summary>Hint 2: plan</summary>Define an inner function that uses the outer factor.</details>
<details><summary>Hint 3: shape</summary>Return the inner function itself, without calling it yet.</details>

## 4. count_calls
<details><summary>Hint 1: look</summary>The given wrapper updates calls but drops the original result.</details>
<details><summary>Hint 2: plan</summary>Start `.calls` at zero before the first call and increase inside the wrapper.</details>
<details><summary>Hint 3: shape</summary>Return the value from `func(*args, **kwargs)` inside the wrapper.</details>

## 5. make_counter
<details><summary>Hint 1: look</summary>Two counters must remember separate numbers.</details>
<details><summary>Hint 2: plan</summary>Put the count in the outer function and update it in the inner one.</details>
<details><summary>Hint 3: shape</summary>Use `nonlocal count` before increasing it.</details>

## 6. once
<details><summary>Hint 1: look</summary>The given wrapper calls the original every time.</details>
<details><summary>Hint 2: plan</summary>Remember both whether the first call happened and what it returned.</details>
<details><summary>Hint 3: shape</summary>Use a Boolean flag separate from the cached result, because the result may be `None`.</details>

## 7. Stack
<details><summary>Hint 1: look</summary>The most recently pushed item leaves first.</details>
<details><summary>Hint 2: plan</summary>Use the end of a list as the top of the stack.</details>
<details><summary>Hint 3: shape</summary>Check empty before `pop` or `peek`; `__len__` returns the item count.</details>

## 8. group_scores
<details><summary>Hint 1: look</summary>The rows have two parts: name and score.</details>
<details><summary>Hint 2: plan</summary>Make each name a key and each score its value.</details>
<details><summary>Hint 3: shape</summary>A dictionary comprehension can unpack each row directly.</details>

## 9. compose
<details><summary>Hint 1: look</summary>For `compose(f, g)`, g runs first.</details>
<details><summary>Hint 2: plan</summary>The returned function needs to remember both functions.</details>
<details><summary>Hint 3: shape</summary>Inside the closure, pass the result of `g(value)` into `f`.</details>

## 10. Gradebook project
<details><summary>Hint 1: look</summary>One student can have no marks; the report puts that student last.</details>
<details><summary>Hint 2: plan</summary>Store a list of marks per name, compute each average once, then sort report pairs.</details>
<details><summary>Hint 3: shape</summary>Use a dictionary comprehension for averages, `sorted(..., key=...)` for the report, and `@property` for the read-only count.</details>
