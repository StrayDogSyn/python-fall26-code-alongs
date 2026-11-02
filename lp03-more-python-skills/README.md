# LP 03 supplemental lab: More Python Skills

**Goal:** Read a small class, predict what a comprehension builds, and explain what a decorator wraps and what a closure remembers. This is the topic lab for LP 03 in the [course roadmap](../README.md#the-roadmap). It is the packet for the Week 5 live session.

## Start here

1. Read [the Gemini Notebook source](notebook-source.md). Write down a prediction at each **Predict** prompt before you read the answer.
2. Run the instructor's [code-along](code-along.py) from the repository root: `python lp03-more-python-skills/code-along.py`. On macOS or Linux, use `python3` if needed.
3. Work through [practice.py](practice.py). It raises `NotImplementedError` at each TODO on purpose. Replace one TODO at a time and run the file after each change.
4. Compare with [solutions.py](solutions.py) only after you have a working version of your own.

No packages are needed. The [Gemini Notebook kit](../GEMINI_NOTEBOOK.md) is optional.

## I Do → We Do → You Do

| Phase | Activity | Remote participation |
| --- | --- | --- |
| I Do | Instructor builds a `Gradebook` class, then traces one comprehension and one decorator call. | Predict the printed dictionary and the names that pass before the screen runs. |
| We Do | Together, add a `Tally` method, then change the threshold passed to `make_checker`. | Post your predicted output in chat and say which line produced it. |
| You Do | Implement `Tally`, `long_words`, `make_multiplier`, and `count_calls` in `practice.py`. | Share one assertion that passed and one that failed first, then explain the fix. |

**Exit check:** Explain why `make_checker(70)` still knows `70` after it returns. Say what `@log_call` does to `describe` before the function runs. Then predict the length and contents of `[x for x in words if len(x) > 3]` for any list you choose.

**Accessibility:** Every example appears as text in the source, so the packet works without audio, video, or a Gemini account.

## Why these four ideas

Each one is a way to get more done with less repetition, and each one hides a rule you can read in one line once you know it:

- **Classes** bundle data with the functions that operate on it, so `book.average("Maya")` knows whose scores to use.
- **Comprehensions** are a loop with its paperwork removed. Read them left to right: what you keep, where it comes from, and the condition.
- **Decorators** are a wrapper. The `@` line is shorthand for `describe = log_call(describe)`.
- **Closures** are functions that carry a little memory. `make_checker` returns a function that still holds its `threshold`.

If you have ever sent a letter through a mail slot with a sticky note on it, you have built a closure. The note stays with the letter.
