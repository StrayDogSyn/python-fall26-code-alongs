# LP 01 supplemental lab: Intro to Python

**Goal:** Read, predict, run, and change Python programs using values, conditions, loops, functions, exceptions, and strings. This is a topic lab for LP 01 in the [course roadmap](../README.md#the-roadmap), separate from the Week 01 setup session.

**Week 3 catch-up route:** Use the [interactive slides](../week03/week03-slides.html) with the [text walkthrough](week03-walkthrough.md). Both follow the I Do → We Do → You Do sequence below.

## Start here

1. Read [the Gemini Notebook source](notebook-source.md). Stop at each **Predict** prompt and write your answer before reading on.
2. Run the instructor's [code-along](code-along.py): `python lp01-intro-to-python/code-along.py` from the repository root. On macOS or Linux, use `python3` if needed. The optional `ask_age()` demo shows `input()` and recovery from bad text.
3. Work through [practice.py](practice.py) independently. After each change, run `python lp01-intro-to-python/check.py` from the repository root. It prints one `PASS`, `FAIL` with a hint, or `NOT STARTED` line per exercise. An untouched starter is meant to say `NOT STARTED` ten times.
4. Open one level at a time in [hints.md](hints.md) when stuck. Compare with [solutions.py](solutions.py) only after you have tried and tested your own version.

No packages or Gemini account are needed to run the Python files. The Gemini Notebook adds a source-grounded tutor, audio or video review, a mind map, and retrieval practice; see the [notebook teaching kit](../GEMINI_NOTEBOOK.md).

## I Do → We Do → You Do

| Phase | Activity | Remote participation |
| --- | --- | --- |
| I Do | Instructor traces `total_points`, parses numeric text, and shows `while`, `enumerate`, `min`, `max`, and string cleanup in the code-along. | Post a predicted output before the screen runs. |
| We Do | Together, change a threshold, a name, and one input. | Put the new branch and total in chat; discuss different predictions. |
| You Do | Complete the ten exercises in `practice.py`, beginning with the two warm-ups. | Show one check result, its input, and the line that explains it. |

## Exercise ladder

| Tier | Exercises | What you practice |
| --- | --- | --- |
| Warm-up | `classify_score`, `count_passing` | Boundaries and a running counter |
| Fix it | `parse_score`, `total_points` | Repair bad conversion and an early return |
| Build | `average`, `lowest_and_highest`, `countdown`, `numbered_lines` | Empty inputs, builtins, a changing while condition, and `enumerate` |
| Extend | `clean_name` | Collapse whitespace and title-case words |
| Transfer | `grade_letter` | Apply ordered conditions to a new setting |

Each function docstring gives an example and an edge case. The [check module](tests.py) names the input, expected result, actual result, and a nudge when a test fails. All ten reference answers pass `python lp01-intro-to-python/check.py --solutions`.

**Exit check:** Explain `=` versus `==`, predict the return value of a function, and identify the last line of a traceback. If one is unclear, ask the notebook for a hint tied to the LP 01 source, then try another example.

**Accessibility:** The source document contains every code example as text. A learner can pause a recording, use the text-only route, and complete the same task without Studio media.
