# LP 03A | Iteration & Algorithms | Fall 26

This is source text Hunter can add to the cohort Gemini Notebook. It explains the packet and gives prediction prompts; it does not include answers to the graded Week 5 assignment. Run `python lp03a-iteration-and-algorithms/code-along.py` and `python lp03a-iteration-and-algorithms/check.py` locally to verify any generated explanation. No Notebook upload or output is claimed here.

## Learning targets

Trace counting, accumulation, searching, and filtering loops. Use `range` and `enumerate` deliberately. Explain how a bounded `while` loop stops. Find reset, early-return, and off-by-one bugs by tracing state. Compare a linear scan with a binary search on sorted values. Trace bubble and selection passes, nested loops, and a comprehension beside its loop form.

## 1. Keep loop state where it survives

An accumulator begins before a loop and changes on each visit. A counter tracks visits, while a search may stop early. A filter collects only selected values into a new list. The code-along uses waits `[4, 7, 2, 9]` for all four jobs.

**Predict before running:** What total follows the second value? What is the first position whose wait is at least eight? What breaks if `total = 0` moves inside the loop?

`range(2, 10, 3)` starts at two, steps by three, and excludes ten. `enumerate(waits)` gives `(index, value)` pairs. **Predict:** Does a negative step work when start is below stop?

## 2. Bound a `while` loop

A `while` loop checks its condition before another visit. A sentinel such as `"go"` can signal completion. A maximum attempt count is a second exit path if the sentinel never arrives. In the practice packet, `ask_until_valid` receives a `read` function so tests can supply candidates without interactive input.

**Predict before running:** For readings `"wait", "wait", "go", "wait"`, which value remains unread? Which variable changes so the loop cannot continue forever?

## 3. Debug with a small trace

Write down a variable's value after each visit or print it temporarily. A reset inside the loop forgets earlier work. A no-match return inside the first unsuccessful visit stops a search too soon. An off-by-one boundary may visit one too many or one too few values. A `while` loop with no progress toward a false condition may never stop.

**Predict before running:** If a total resets before each addition of `2`, `5`, `1`, what is its final value? Where should the reset move?

## 4. Count linear search comparisons

Linear search checks values one by one. It can stop at the first match or continue to collect all matches. Count each equality comparison, including the successful one. A missing value requires checking every item.

**Predict before running:** How many codes in `[17, 24, 31, 42, 58]` are checked before finding `42`? How many if the target is absent?

## 5. Binary search needs sorted input

Binary search checks the middle of a sorted window. If the middle value is too small, move `low` past it. If too large, move `high` before it. The window shrinks on every visit. About `log2(n)` checks can cover `n` sorted values, though an exact count depends on the target.

**Predict before running:** Which middle values are checked for `42` in the sorted room-code list? What could go wrong if the list were shuffled first?

## 6. Trace two kinds of sort

Bubble sort compares neighbors and swaps those out of order; after a pass, the largest active value reaches the right edge. Selection sort scans the remaining values for a minimum and places it in the next open position. A swap can use tuple unpacking. The independent sorting exercises return new lists, leaving the input intact.

**Predict before running:** On `[8, 3, 5]`, what does one bubble pass produce? Which value does selection sort choose first?

## 7. Pairs and comprehensions

Nested loops can visit every later pair: first index zero with one and two, then first index one with two. Pair counts grow rapidly with list length. A comprehension can express a simple filter in one line, while a plain loop is easier to trace when each visit has several actions.

**Predict before running:** Which waits above four remain? What pairs are visited for three items?

## Check yourself

1. Name one way a `while` loop can be guaranteed to stop.
2. Explain why a no-match return often belongs after a search loop.
3. State what sorted input lets binary search discard.
4. Compare a bubble pass with a selection step.
5. Explain when you would keep the longer loop instead of a comprehension.
