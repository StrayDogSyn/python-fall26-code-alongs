# Iteration & Algorithms

This kindred packet serves the Python Intro 26.4 Week 5 session and Python Essentials: Bridge the Dream. It teaches counting, searching, sorting, and loop debugging with new examples. It fills a loop and algorithm gap in the earlier materials. The [course map](../resources/agents/OFFICIAL_COURSE_MAP.md) records the week topics; the [topic map](bridge-the-dream-map.md) records verified overlap with the other course.

These practice problems teach the tools, so you can assemble your own answer to your graded assignment. They are different problems, and the reference file is for this packet only.

## Start here

From the repository root, with Python installed:

1. Read a prediction in the [walkthrough](week05-walkthrough.md), then run `python lp03a-iteration-and-algorithms/code-along.py`.
2. Open [practice.py](practice.py). Replace one `NotImplementedError("TODO")` at a time.
3. Run `python lp03a-iteration-and-algorithms/check.py` after each change. It prints one `PASS`, `FAIL` with an input and nudge, or `NOT STARTED` line per exercise.
4. Open one level at a time in [hints.md](hints.md). Compare with [solutions.py](solutions.py) only after your own attempt.

No packages are required. On macOS or Linux, use `python3` if `python` is not available.

## I Do, We Do, You Do

| Phase | Activity | Evidence |
| --- | --- | --- |
| I Do | Trace Hunter's [code-along](code-along.py) before each printed result. | Predict the count, search position, and one sorting pass. |
| We Do | Repair a reset accumulator and an early return in a scratch copy. | Explain the line that caused the wrong value. |
| You Do | Complete the eleven independent exercises in [practice.py](practice.py). | Show one check line and explain what changed. |

## Exercise ladder

| Tier | Exercises | Skill |
| --- | --- | --- |
| Warm-up | `total_of_evens`, `count_up_by`, `squares_of_odds` | Accumulation, `range`, loop versus comprehension |
| Fix it | `repair_average`, `repair_first_even` | Reset and early-return bugs |
| Build | `ask_until_valid`, `linear_search`, `binary_search`, `selection_sort`, `duplicate_pair` | Bounded `while`, comparisons, sorted windows, nested loops |
| Extend | `bubble_sort_passes` | Trace each pass and keep snapshots |

Every exercise has an example and an edge case in its docstring. The search exercises count comparisons so you can compare a one-by-one scan with a sorted-list search. Binary search needs ascending input. The sorting exercises use new lists so the caller's input stays intact.

**Exit check:** If a list has eight sorted values, how does the binary-search window change after a low midpoint? Why can `return` inside a search loop be correct while `return None` inside the first unsuccessful visit is wrong?
