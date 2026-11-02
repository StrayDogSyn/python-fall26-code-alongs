# Week 3 walkthrough: Intro to Python

Use this after a missed live session or beside the recording. Work from the repository root in a terminal. On Windows PowerShell, `python` works on the instructor's machine; use `py` if your installation exposes that launcher instead. On macOS or Linux, use `python3` if `python` is unavailable.

## Goal and materials

Explain the result of a short program with a variable, conversion, condition, loop, and function. Then build and repair ten small functions. Open the [LP 01 source](notebook-source.md), [code-along](code-along.py), and [practice starter](practice.py). Keep [solutions.py](solutions.py) closed until the independent attempt.

## I Do: predict, then trace (15 minutes)

1. In `code-along.py`, read `score_text = "72"`. Predict the type before and after `int(score_text)`. Why would comparing the original text with `70` fail?
2. Predict `classify_score(72)` and `classify_score(69)`. Point to the branch that returns each result.
3. Trace `total_points([2, 3, 4])` on paper. Fill in `total` after each loop visit before running it.
4. Run `python lp01-intro-to-python/code-along.py`. Compare the output with your predictions. The final total is `9`.
5. Read the guest numbers, range, mean, and weather label in the output. Find `enumerate`, `min`, `max`, `round`, and `if/elif` in the file. The optional `ask_age()` function models `input()`, `while`, and `try/except` for a live demonstration.

## We Do: change one thing (15 minutes)

1. Copy the code-along to a personal scratch file if you want to keep the original intact. Change `score_text` to `"70"` and predict the label.
2. Change the cutoff in `classify_score` from `70` to `75`. Predict the new label for `72` before running.
3. Try `total_points([])`. Explain why the answer is `0` without entering the loop.
4. Change the raw guest text to add Ari with extra spaces. Predict the printed guest number and cleaned name.

Ask the room or your study partner: “Which line changed the behavior, and what did the program show?”

## You Do: independent transfer (50 to 70 minutes)

Complete the ten functions in `practice.py` in order. First do the warm-ups `classify_score` and `count_passing`. Then repair `parse_score` and `total_points`. Build `average`, `lowest_and_highest`, `countdown`, and `numbered_lines`; finish with `clean_name` and `grade_letter`. The docstrings give examples and edge cases. Run `python lp01-intro-to-python/check.py` from the repository root after each change. The untouched starter says `NOT STARTED` for every exercise. A wrong answer says `FAIL` with the input, expected result, actual result, and a nudge. Open one level of [hints](hints.md) at a time. When all ten say `PASS`, compare with [solutions.py](solutions.py).

**One hint at a time:** Start `count_passing` at zero. For each score, ask whether it meets the cutoff. Return the counter after the loop. For later exercises, use the matching section in `hints.md`.

**Exit evidence:** Share one prediction, the observed result, and the line that explains it. For example: “I predicted two passing scores; the assertion passed; the condition counts `70` and `91`."
