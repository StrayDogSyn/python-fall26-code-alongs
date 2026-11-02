# Week 5 live session: Iteration & Algorithms

**Monday, November 2, 2026, 8:00 to 9:30 PM Eastern.** Open the [packet](README.md), [code-along](code-along.py), and [practice starter](practice.py) before class. Keep the [reference](solutions.py) closed during the independent attempt.

| Time (ET) | Phase and action | Learner evidence | Failure to plan for |
| --- | --- | --- | --- |
| 8:00 to 8:10 | Check-in: recap lists and conditions; name counting, accumulating, searching, filtering. Ask for predictions before any run. | One written prediction for a loop over `[4, 7, 2, 9]`. | A learner treats count and sum as the same value; trace both columns separately. |
| 8:10 to 8:25 | I Do: run code-along sections 1 and 2. Trace `range` start, stop, step; `enumerate`; bounded `while` and a sentinel. | Predict `range(2, 10, 3)` and the reading that stops the loop. | A `while` condition never changes; point to the attempt guard and updated signal. |
| 8:25 to 8:40 | We Do: trace a reset accumulator and a return inside a loop. Let learners name the bad line before editing a scratch copy. | Explain why the total or first match is wrong, then predict the repair. | A student moves the accumulator back inside the loop; keep its initialization outside. |
| 8:40 to 9:00 | I Do, then We Do: compare linear and binary search on sorted room codes. Count each comparison and walk low, high, and mid aloud. | Record both comparison counts and explain why sorted input matters. | Binary search on unsorted values gives misleading results; sort the demonstration list first. |
| 9:00 to 9:20 | I Do: trace one bubble pass and one selection step; show tuple swap, nested-loop pairs, and a loop beside its comprehension. Students sketch the next pass. | Predict the list after one pass and name the selected minimum. | A learner changes the input list while claiming to return a new list; make a copy first. |
| 9:20 to 9:30 | You Do: start one Warm-up or Fix it exercise, run `python lp03a-iteration-and-algorithms/check.py`, and ask questions. Assign the remaining ladder for independent work. | One `PASS`, `FAIL`, or `NOT STARTED` line and a next step. | A TODO looks like a crash; show how the check reports it without a traceback wall. |

The [walkthrough](week05-walkthrough.md) provides the text route for anyone who misses the session. Pause the recording at each prediction and run the code locally.
