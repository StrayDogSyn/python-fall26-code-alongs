# Brief for Codex: make the Python the product

Hunter is resting. You and Claude are polishing this course together without him, under `PROTOCOL.md`. This brief tells you exactly what to build, in what order, and what "done" means. Read `PROTOCOL.md` and `QUEUE.md` first.

> **Update, November 2, 2026, 5:30 PM ET:** do `CODEX_WEEK5.md` (T-13) first. Hunter approved the official week mapping (Q-03). T-05 to T-09 are blocked until rebased on the new kindred packets; sections 3 to 5 below assume the old mapping. Keep the LP 01 pattern from T-04 (check.py, tests.py, hints.md).

## 0. Why this work exists

An audit on November 2, 2026 found the course teaches too little Python. Across Weeks 3 to 5 there are 9 student deliverables and 250 lines of lesson code. No lesson uses `while`, `try/except`, `range`, `input`, `sorted`, `open`, string methods, or slicing. Nothing runs Python in the browser. The decks for Weeks 3 to 5 are 6 and 7 slides against 20 and 21 for Weeks 1 and 2. Fixing that is the whole job. Decorations are not the job.

## 1. Start procedure (first 15 minutes, every session)

1. `git fetch --all --prune`; read `resources/agents/PROTOCOL.md`, `QUEUE.md`, and the last 10 entries of `LOG.md`.
2. If `claude/wave0-fixes` (task T-01) is not merged into `main`, base your branches on it and say "Stacked on PR #N" in each pull request.
3. Run the gate from `PROTOCOL.md` once, untouched, to learn the baseline. Record any pre-existing failure in `LOG.md` before changing anything.
4. Do T-02 (review T-01) first. Then T-03 (Windows check). Then T-04, T-05, T-06 in order. Do not start T-07 until the first exercise pattern in T-04 is settled in a pull request.

## 2. Quality bar for every exercise

Each exercise must have all of these:

- **A spec in the docstring** with one worked example and one edge case, written in plain language.
- **A tier tag:** `Warm-up` (predict or tiny change), `Fix it` (repair a given broken function), `Build` (write from the spec), `Extend` (change working code to meet a new rule), or `Transfer` (same idea in a new setting). At least 40 percent of exercises in a packet must be Warm-up or Fix it, so reading and tracing come before writing.
- **Tests that name the failure.** A failing check says which input, what was expected, what came back, and a one-line nudge. No bare `AssertionError`.
- **At least two plausible wrong solutions** that the tests catch, added to `scripts/mutation_check.py`. If you cannot think of two, the exercise is too easy to game; rewrite it.
- **Three levels of hints** in the packet's `hints.md`, each inside its own `<details>` block, ordered from "what to look at" to "the shape of the answer". Never the solution.
- **A reference solution** in `solutions.py`, with a short comment on why it is written that way.

Voice: the same plain, confident, lightly witty tone as the existing packets. No em dashes. Dry jokes are seasoning, not the meal.

## 3. T-04, T-05, T-06: expand the local exercises

Floors, not ceilings. Improve them if you see better ones; keep the concept coverage.

**LP 01, at least 8 exercises.** Keep `classify_score` and `count_passing` (label is `"keep practicing"`). Add:

1. `parse_score(text)`: strip spaces, convert to `int`, return `None` for bad text (`try/except ValueError`).
2. `average(scores)`: `sum` and `len`, return `0.0` for an empty list, round to one decimal.
3. `lowest_and_highest(scores)`: `min` and `max`, return a tuple, `None` for empty.
4. `countdown(n)`: a `while` loop that returns `[n, ..., 1]`.
5. `numbered_lines(names)`: `enumerate` and f-strings, for example `"1. Maya"`.
6. `clean_name(text)`: `strip`, `title`, collapse inner spaces.
7. `grade_letter(score)`: `if/elif/else` order matters; boundary tests at 90, 80, 70.
8. One `Fix it`: a given `total_points` that returns inside the loop; the student repairs it.

**LP 02, at least 8 exercises.** Keep `unique_names`, `highest_score`, `save_names`. Add:

1. `load_names(path)`: `open` with `with`, strip lines, return `[]` if the file does not exist.
2. `word_counts(text)`: `split`, `lower`, dictionary counting with `get`.
3. `ranked(scores)`: `sorted` with `key=`, highest first, ties alphabetical.
4. `group_by_length(words)`: dictionary of lists with `setdefault`.
5. `top_n(scores, n)`: slicing.
6. `parse_roster(lines)`: lines like `"Maya,82"` into a dictionary of `int` values, skipping blank lines (tuple unpacking).
7. `meeting_text(time_tuple)`: tuple unpacking and zero-padded formatting, for example `(20, 0)` to `"20:00"`.
8. One `Fix it`: a given function that mutates a list while looping over it.

**LP 03, at least 6 exercises plus one small project.** Keep `Tally`, `long_words`, `make_multiplier`, `count_calls`. Add:

1. `make_counter()`: closure with `nonlocal`.
2. `once(func)`: a decorator that runs the function only the first time and returns the stored result afterwards.
3. `Stack` class with `push`, `pop`, `peek`, `__len__`; `pop` on empty raises `IndexError` with a clear message.
4. `group_scores(rows)`: dictionary comprehension.
5. `compose(f, g)`: a closure that returns `f(g(x))`.
6. **Mini project, `Gradebook` v2:** add students and scores, compute averages, return a ranked report, using a class, a comprehension, `sorted`, and one decorator. It has its own tests and a short README section.

Also in T-06: replace Week 5 quiz question 4 (it asks how many times `shout` is called, which tests the harness, not Python) with a question about what a decorator returns, and remove the slide 6 sentence that reveals the exact assertion.

### Test harness (all three packets)

- Students run **one command from the repository root** (for example `python lp01-intro-to-python/check.py`) that runs the tests against their `practice.py` and prints one line per exercise: `PASS`, `FAIL` with the nudge, or `NOT STARTED`.
- A starter that still holds a `NotImplementedError` TODO reports `NOT STARTED`, never a traceback wall.
- Standard library `unittest` only. Must run identically on Windows, macOS, and Linux.
- `scripts/check_lessons.py` must verify that `solutions.py` passes every exercise and that an untouched starter reports every exercise as `NOT STARTED`. Update it; do not weaken it.
- Keep `code-along.py` coherent with the new exercises: it should model the pattern each exercise uses (I Do), and the README must still show I Do, We Do, You Do.
- Update each packet's `README.md`, `notebook-source.md`, and week walkthrough, and the matching `site/plan.js` text, so the files agree with each other. After any `plan.js` edit run `node site/check.mjs`.

## 4. T-08: the in-browser runner (after T-04 to T-06 are merged)

Hunter approved this. Open a draft pull request with a design note first (one page, no code), then implement.

- **Engine:** Pyodide, loaded from a CDN, **pinned to an exact released version at least two weeks old**. Fetch the URL and confirm it returns 200 before you write it into the page. Log the version and the check in `LOG.md`.
- **Opt-in and lazy:** nothing downloads until the student clicks "Run in browser", and the button states the download size first. Everything else on the hub must still work with JavaScript off or the download declined.
- **Isolation:** run student code in a Web Worker. Enforce a time limit (for example 5 seconds) by terminating and recreating the worker, so a `while` loop that never ends cannot freeze the tab.
- **One source of truth:** the browser runs the **same test module** as the local `check.py`. Do not rewrite tests in JavaScript.
- **Privacy:** student code never leaves the browser. No network requests after the engine loads, no analytics. Saving a draft in `localStorage` is allowed only inside `try/catch` and must be optional.
- **Accessibility:** a labeled editor, run on `Ctrl+Enter` and `Cmd+Enter`, results announced in an `aria-live` region, visible focus, no motion beyond `prefers-reduced-motion`, and a plain-text "Run it locally instead" path beside it.
- **Proof it works:** in headless Chromium, load the page, run every exercise's reference solution through the browser runner, and assert all pass; run every `mutation_check.py` wrong solution and assert each fails. Put that script in `scripts/` and add it to the gate if it can run without a network (otherwise document it as a manual check).

## 5. T-07: decks for Weeks 3 to 5

Raise each deck toward the Week 1 and 2 standard: a predict-then-reveal for every concept, at least 5 quiz questions each, a matching game or tracing slide where it helps, and the check command on its own slide. Edit only `resources/slides/week03.js`, `week04.js`, `week05.js` and `glossary.js` (new terms: `while`, `exception`, `iterate`, `parse`, `closure`, `decorator`, `instance`, and any others you introduce). Rebuild. Keep every slide's five speaker notes.

## 6. How to report

At the end of each task, append a `LOG.md` entry in the protocol format. Include the exact gate commands you ran and the pass or fail of each, the pull request link, and what you did not verify. At the end of the session, write a final entry whose `NEXT:` line tells Claude or Hunter exactly what to do first.

## 7. Do not

- Do not push to `main`, merge, force-push, or delete branches you did not make.
- Do not mark anything verified that you did not run. Do not claim Gemini Notebook outputs exist.
- Do not hand-edit built decks.
- Do not add dependencies students must install.
- Do not reword `CONTRIBUTORS.md` credits.
- Do not stay on a blocked task. Log the question and move on.
