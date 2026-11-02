# LP 03 supplemental lab: More Python Skills

**Goal:** Read a small class, predict what a comprehension builds, and explain what a decorator wraps and what a closure remembers. This is the topic lab for LP 03 in the [course roadmap](../README.md#the-roadmap). It is the packet for the Week 5 live session.

**Week 5 presentation:** Open the [interactive slides](../week05/week05-slides.html). The instructor's [run of show](week05-run-of-show.md) has timed prompts and checkpoints; the source below is the equivalent text route.

## Start here

1. Read [the Gemini Notebook source](notebook-source.md). Write down a prediction at each **Predict** prompt before you read the answer.
2. Run the instructor's [code-along](code-along.py) from the repository root: `python lp03-more-python-skills/code-along.py`. On macOS or Linux, use `python3` if needed.
3. Work through [practice.py](practice.py). Run `python lp03-more-python-skills/check.py` after each TODO. It prints one `PASS`, `FAIL` with a nudge, or `NOT STARTED` line per exercise. The untouched starter reports ten `NOT STARTED` lines.
4. Open one level at a time in [hints.md](hints.md) when stuck. Compare with [solutions.py](solutions.py) after your own attempt.

No packages are needed. The [Gemini Notebook kit](../GEMINI_NOTEBOOK.md) is optional.

## I Do → We Do → You Do

| Phase | Activity | Remote participation |
| --- | --- | --- |
| I Do | Instructor traces `Gradebook`, a comprehension, a decorator, a closure, and a small stack. | Predict each result before running the code. |
| We Do | Together, add a `Tally` method, change a checker threshold, and trace a counter's next value. | Post your prediction and the line that explains it. |
| You Do | Complete nine exercises and the `Gradebook` transfer project in `practice.py`. | Share one check result and explain a design choice. |

## Exercise ladder

| Tier | Exercises | What you practice |
| --- | --- | --- |
| Warm-up | `Tally`, `long_words`, `group_scores` | Instance state and comprehensions |
| Fix it | `count_calls`, `once` | Preserve returns and cache the first result |
| Build | `make_multiplier`, `make_counter`, `Stack`, `compose` | Closures, `nonlocal`, and object behavior |
| Transfer | `Gradebook` | Combine a class, comprehension, sorting, and `@property` |

Each spec gives an example and an edge case. The [check module](tests.py) identifies the failing input, expected result, actual result, and a nudge. All ten reference answers pass `python lp03-more-python-skills/check.py --solutions`.

### Mini project: Gradebook v2

Start a fresh `Gradebook`, add students and scores, then produce a report of `(name, average)` pairs. Rank scored students by average, highest first; break ties alphabetically and place students without scores last. Averages have one decimal place. `student_count` is a read-only property. The project brings together the four ideas from this packet, and its own check line covers empty books, ties, rounding, and separate instances.

**Exit check:** Explain why `make_checker(70)` still knows `70` after it returns. Say what `@log_call` does to `describe` before the function runs. Then predict the length and contents of `[x for x in words if len(x) > 3]` for any list you choose.

**Accessibility:** Every example appears as text in the source, so the packet works without audio, video, or a Gemini account.

## Why these four ideas

Each one is a way to get more done with less repetition, and each one hides a rule you can read in one line once you know it:

- **Classes** bundle data with the functions that operate on it, so `book.average("Maya")` knows whose scores to use.
- **Comprehensions** are a loop with its paperwork removed. Read them left to right: what you keep, where it comes from, and the condition.
- **Decorators** are a wrapper. The `@` line is shorthand for `describe = log_call(describe)`.
- **Closures** are functions that carry a little memory. `make_checker` returns a function that still holds its `threshold`.

If you have ever sent a letter through a mail slot with a sticky note on it, you have built a closure. The note stays with the letter.
