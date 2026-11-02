# Week 5 catch-up: Iteration & Algorithms

Use this text route if you missed the session or want to pause longer than a slide allows. Start in the repository root. Read each **Predict** prompt before running `python lp03a-iteration-and-algorithms/code-along.py`.

## 1. Four jobs a loop can do

A loop can **count** visits, **accumulate** a value, **search** for a match, or **filter** values into a new list. In the code-along, the waits are `[4, 7, 2, 9]`. The loop keeps a separate count and total, collects waits below five, and remembers the first wait of at least eight minutes. `enumerate` gives both position and value.

**Predict:** How many visits, what total, which short waits, and what first-long position? Then reveal: `count=4`, `total=22`, `short=[4, 2]`, `first_long=3`. `range(2, 10, 3)` visits `2, 5, 8`; stop is excluded.

## 2. A `while` loop needs a route out

A `while` loop checks its condition before every visit. A **sentinel** is a value that signals a stop, such as the code-along's `"go"`. A separate attempt count guards against an endless loop when the sentinel never arrives.

**Predict:** With readings `"wait", "wait", "go", "wait"`, how many are read? Reveal: three. The fourth reading is untouched because the sentinel ended the loop.

For independent practice, `ask_until_valid` receives a `read` function and a maximum attempt count. Tests can feed it values without asking a person to type anything. It is a bounded validation loop, not a solution to the graded input task.

## 3. Trace bugs before fixing them

Write the value of each variable after each visit. A total that resets *inside* a loop loses earlier contributions. A no-match return *inside* the first unsuccessful visit stops a search too early. An off-by-one loop includes or excludes one extra step. A `while` loop whose condition never moves toward false can run forever.

**Predict:** What running totals follow adding `2`, `5`, and `1`? Reveal: `2`, `7`, `8`. If the total resets each time, it ends at `1` instead. A temporary `print` of the running total can expose that bug; remove or silence the trace when the function works.

## 4. Search one by one

**Linear search** compares each value in order. It can stop at the first match or keep going to collect every match. The packet's search exercise asks for the first index and the number of comparisons, so the cost is visible.

**Predict:** Searching `[17, 24, 31, 42, 58]` for `42`, how many comparisons? Reveal: four, at index three. A missing value needs five comparisons. An empty list needs zero.

## 5. Cut a sorted search window

**Binary search** needs an ascending sorted list. It checks the middle value, then discards the half that cannot contain the target. Keep `low`, `high`, and `mid` visible as you trace. With eight items, halving the window takes about three checks, compared with up to eight for a linear scan. The exact count depends on the target.

**Predict:** For sorted room codes `[17, 24, 31, 42, 58]` and target `42`, which middle values are checked? Reveal: `31`, then `42`. Two comparisons. If the list were unsorted, discarding half would not be justified.

## 6. Trace sorting passes

A **bubble pass** compares neighbors and swaps an out-of-order pair. The largest unsorted value drifts right during a pass. **Selection sort** scans the unsorted tail for its smallest value and swaps that value into the next open position. Tuple unpacking makes a swap readable: `left, right = right, left`.

**Predict:** After one bubble pass on `[8, 3, 5]`, what remains? Reveal: `[3, 5, 8]`. For selection sort on the original list, the first chosen minimum is `3`, so the first position becomes `3`. The practice functions work on copies so the input list stays unchanged.

## 7. Nested loops and two ways to filter

For every first position, an inner loop can visit each later position. That is useful for checking pairs, but its number of comparisons grows quickly as the list grows. A plain loop and a list comprehension can filter the same values. Use the loop when several steps need names or a trace.

**Predict:** Which waits above four remain from `[4, 7, 2, 9]`? Reveal: `[7, 9]` in both forms. The comprehension is short; the loop makes the append step explicit.

## Your turn

Open [practice.py](practice.py) and begin with a Warm-up or Fix it task. Run `python lp03a-iteration-and-algorithms/check.py` after replacing each TODO. Read one result line, then open only the matching section in [hints.md](hints.md). The [reference](solutions.py) is for comparison after your own attempt.
