# Week 3 walkthrough: Intro to Python

Use this after a missed live session or beside the recording. Work from the repository root in a terminal. On Windows PowerShell, `python` works on the instructor's machine; use `py` if your installation exposes that launcher instead. On macOS or Linux, use `python3` if `python` is unavailable.

## Goal and materials

Explain the result of a short program with a variable, conversion, condition, loop, and function. Open the [LP 01 source](notebook-source.md), [code-along](code-along.py), and [practice starter](practice.py). Keep [solutions.py](solutions.py) closed until the independent attempt.

## I Do: predict, then trace (15 minutes)

1. In `code-along.py`, read `score_text = "72"`. Predict the type before and after `int(score_text)`. Why would comparing the original text with `70` fail?
2. Predict `classify_score(72)` and `classify_score(69)`. Point to the branch that returns each result.
3. Trace `total_points([2, 3, 4])` on paper. Fill in `total` after each loop visit before running it.
4. Run `python lp01-intro-to-python/code-along.py`. Compare the output with your predictions. The final total is `9`.

## We Do: change one thing (15 minutes)

1. Copy the code-along to a personal scratch file if you want to keep the original intact. Change `score_text` to `"70"` and predict the label.
2. Change the cutoff in `classify_score` from `70` to `75`. Predict the new label for `72` before running.
3. Try `total_points([])`. Explain why the answer is `0` without entering the loop.

Ask the room or your study partner: “Which line changed the behavior, and what did the program show?”

## You Do: independent transfer (20 minutes)

Implement `classify_score` and `count_passing` in `practice.py`. The starter raises `NotImplementedError` until you replace each TODO. Run `python lp01-intro-to-python/practice.py` after each function. Add a boundary check for `70` and an empty-list check. When all assertions pass, explain the difference between `=` and `==` and identify the last line of a traceback. Then compare with `solutions.py`.

**One hint at a time:** Start `count_passing` at zero. For each score, ask whether it meets the cutoff. Return the counter after the loop.

**Exit evidence:** Share one prediction, the observed result, and the line that explains it. For example: “I predicted two passing scores; the assertion passed; the condition counts `70` and `91`."
