# Week 4 walkthrough: Data Structures & Files

Use this after a missed live session or beside the recording. Work from the repository root. On Windows PowerShell, `python` works on the instructor's machine; use `py` if needed. On macOS or Linux, use `python3` if needed.

## Goal and materials

Choose a collection that fits a task, explain a file round trip, then rank, group, and parse data. Open the [LP 02 source](notebook-source.md), [code-along](code-along.py), and [practice starter](practice.py). Keep [solutions.py](solutions.py) closed until you have tried the tasks.

## I Do: trace the roster (15 minutes)

1. Read the list `names`, dictionary `scores`, and tuple `meeting_time` in `code-along.py`. Predict `names[0]`, `scores["Ari"]`, and `meeting_time[0]`.
2. Trace the second `"Maya"` sign-in. Predict `len(names)` and `len(set(names))`. Explain why a set helps with duplicates but loses the list's sign-in order.
3. Predict the exact lines written to `attendance-demo.txt`, including the repeated name. Run `python lp02-data-structures/code-along.py`, then open the file to check.
4. Trace the added `open` read, ordered unique list, word counts, top score, length groups, and meeting text. Point to `sorted`, slicing, `setdefault`, and tuple unpacking.

## We Do: change the roster (15 minutes)

1. Add `"Noor"` to the list and a score for Noor to the dictionary. Predict both the printed lookup and the new file's last line.
2. Add a second `"Ari"` to the list. Predict the unique count again. Explain why the file still includes both Ari entries.
3. Read the saved file with `splitlines()`. State the resulting list and why it has no newline characters.
4. Change Ari's score to tie Maya's. Predict which pair comes first after sorting by score and then name.

Ask: “Which collection stores order, which answers a name-to-score lookup, and which checks uniqueness?”

## You Do: independent transfer (60 to 80 minutes)

Complete eleven functions in `practice.py`, beginning with `unique_names`, `highest_score`, and `save_names`. Then read names, count words, rank and group data, slice top scores, parse a roster, format a meeting time, and repair a loop that removes items while visiting them. Each docstring gives an example and an edge case. Run `python lp02-data-structures/check.py` from the repository root after each change. The untouched starter says `NOT STARTED` eleven times. A wrong answer says `FAIL` with the input, expected result, actual result, and a nudge. Open one level in [hints.md](hints.md) if needed. Compare with [solutions.py](solutions.py) only after all eleven say `PASS`.

**One hint at a time:** For `unique_names`, keep a result list for order and a set for names already seen. For `highest_score`, keep the first tied name by updating only when a new score is strictly higher. Later exercises have three hint levels each in `hints.md`.

**Exit evidence:** Show the collection you chose for each task and the exact text your file contains. The code-along creates `attendance-demo.txt`; you may delete that generated file after inspecting it.
