# Week 4 walkthrough: Data Structures & Files

Use this after a missed live session or beside the recording. Work from the repository root. On Windows PowerShell, `python` works on the instructor's machine; use `py` if needed. On macOS or Linux, use `python3` if needed.

## Goal and materials

Choose a collection that fits a task and explain a file round trip. Open the [LP 02 source](notebook-source.md), [code-along](code-along.py), and [practice starter](practice.py). Keep [solutions.py](solutions.py) closed until you have tried the tasks.

## I Do: trace the roster (15 minutes)

1. Read the list `names`, dictionary `scores`, and tuple `meeting_time` in `code-along.py`. Predict `names[0]`, `scores["Ari"]`, and `meeting_time[0]`.
2. Trace the second `"Maya"` sign-in. Predict `len(names)` and `len(set(names))`. Explain why a set helps with duplicates but loses the list's sign-in order.
3. Predict the exact lines written to `attendance-demo.txt`, including the repeated name. Run `python lp02-data-structures/code-along.py`, then open the file to check.

## We Do: change the roster (15 minutes)

1. Add `"Noor"` to the list and a score for Noor to the dictionary. Predict both the printed lookup and the new file's last line.
2. Add a second `"Ari"` to the list. Predict the unique count again. Explain why the file still includes both Ari entries.
3. Read the saved file with `splitlines()`. State the resulting list and why it has no newline characters.

Ask: “Which collection stores order, which answers a name-to-score lookup, and which checks uniqueness?”

## You Do: independent transfer (20 minutes)

Implement `unique_names`, `highest_score`, and `save_names` in `practice.py`. The starter raises `NotImplementedError` until each TODO is replaced. Run `python lp02-data-structures/practice.py` after each change. Check the empty input cases and the final newline. Compare with `solutions.py` after your checks pass.

**One hint at a time:** For `unique_names`, keep a result list for order and a set for names already seen. For `highest_score`, keep the first tied name by updating only when a new score is strictly higher.

**Exit evidence:** Show the collection you chose for each task and the exact text your file contains. The code-along creates `attendance-demo.txt`; you may delete that generated file after inspecting it.
