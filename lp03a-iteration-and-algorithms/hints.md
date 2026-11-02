# Week 5 hints

Open one level at a time, then run `python lp03a-iteration-and-algorithms/check.py` again.

## 1. total_of_evens

<details><summary>Hint 1: look</summary>Which values make the even test true, including below zero?</details>
<details><summary>Hint 2: plan</summary>Keep one total outside the loop and update it only for a match.</details>
<details><summary>Hint 3: shape</summary>Use the remainder after division by two as the condition.</details>

## 2. count_up_by

<details><summary>Hint 1: look</summary>The stop value is excluded, even when a step lands on it.</details>
<details><summary>Hint 2: plan</summary>Check a zero step, then let `range` handle direction.</details>
<details><summary>Hint 3: shape</summary>Turn `range(start, stop, step)` into a list.</details>

## 3. repair_average

<details><summary>Hint 1: look</summary>Trace total after every visit. Why does it forget earlier values?</details>
<details><summary>Hint 2: plan</summary>Handle an empty list before dividing; initialize the total only once.</details>
<details><summary>Hint 3: shape</summary>Move one assignment outside the loop and round the final quotient to one decimal.</details>

## 4. repair_first_even

<details><summary>Hint 1: look</summary>The starter stops after the first odd value.</details>
<details><summary>Hint 2: plan</summary>Keep looking until a match arrives or every value has been checked.</details>
<details><summary>Hint 3: shape</summary>Place the no-match return after the loop.</details>

## 5. ask_until_valid

<details><summary>Hint 1: look</summary>The reader is a function; each call gives one candidate.</details>
<details><summary>Hint 2: plan</summary>Track how many attempts remain, and stop on an inclusive in-range value.</details>
<details><summary>Hint 3: shape</summary>Use a bounded `while` condition, update the attempt count, then test both bounds.</details>

## 6. linear_search

<details><summary>Hint 1: look</summary>How many values have been compared when the first match appears?</details>
<details><summary>Hint 2: plan</summary>Visit values in order and return immediately on the first equality.</details>
<details><summary>Hint 3: shape</summary>`enumerate` supplies indices; increase a comparison count for every visited item.</details>

## 7. binary_search

<details><summary>Hint 1: look</summary>This works only because the input is already sorted.</details>
<details><summary>Hint 2: plan</summary>Keep low and high around the remaining window; compare its middle value.</details>
<details><summary>Hint 3: shape</summary>If the middle is too small, move low past it; otherwise move high before it. Count each middle check.</details>

## 8. selection_sort

<details><summary>Hint 1: look</summary>Which value belongs in the first open position?</details>
<details><summary>Hint 2: plan</summary>Work on a copy. For each position, scan the unsorted tail for the smallest value.</details>
<details><summary>Hint 3: shape</summary>Remember the smallest index, then swap using two assignments or tuple unpacking.</details>

## 9. bubble_sort_passes

<details><summary>Hint 1: look</summary>After one pass, the largest remaining value reaches the right edge.</details>
<details><summary>Hint 2: plan</summary>Compare neighbors, swap out-of-order pairs, then record what the list looks like.</details>
<details><summary>Hint 3: shape</summary>Append a fresh copy after every pass, even when that pass made no swap.</details>

## 10. duplicate_pair

<details><summary>Hint 1: look</summary>The answer is two positions, not a true/false value.</details>
<details><summary>Hint 2: plan</summary>Fix a first position, then compare it with each later position.</details>
<details><summary>Hint 3: shape</summary>The inner range begins one position after the outer index.</details>

## 11. squares_of_odds

<details><summary>Hint 1: look</summary>Both returned lists need the same values in the same order.</details>
<details><summary>Hint 2: plan</summary>Build one list with `append`; build the other by reading that loop as a comprehension.</details>
<details><summary>Hint 3: shape</summary>Filter by odd remainder, then square the kept value in each form.</details>
