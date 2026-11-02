# Codex handoff: Week 5, Iteration and Algorithms (task T-13)

This is the first job in the queue and it is time boxed. Class is **Monday, November 2, 2026, 8:00 PM Eastern**. Read `PROTOCOL.md`, then `OFFICIAL_COURSE_MAP.md`, then this file. Hunter merges. You and Claude never push to `main`.

## 1. Why this exists

The official Python Intro 26.4 course teaches **Iteration and Algorithms** in Week 5. Our Week 5 packet (`lp03-more-python-skills`) teaches classes, decorators, and closures, which the official course does not teach. Students need loop material tonight.

The repository stays the single source of truth for Hunter's class. This task adds a new, additive packet. It must not degrade what students already use.

## 2. The kindred idea

Hunter teaches two audiences from one repository:

1. **Python Intro 26.4** (this cohort, official calendar in `OFFICIAL_COURSE_MAP.md`).
2. **Python Essentials: Bridge the Dream** (the previous cohort's sequence and its practice site, `https://straydogsyn.github.io/Python-Essentials-Bridge-The-Dream/`). Hunter is improving it starting tonight.

The new packet is a **kindred lesson packet**: one set of files that serves both. It is named for the skill, not for a cohort's week number, so either course can point at it.

Hard consequences:

- Do **not** rename, move, or renumber `lp01-intro-to-python`, `lp02-data-structures`, or `lp03-more-python-skills`, or change their plan.js `id`s or `code`s. Bridge the Dream links to them by number.
- Do **not** edit the Bridge the Dream repository or site. Read it only. If you cannot reach it, log that and leave the Bridge column in your mapping table as `TBD (Hunter)`. Never guess its contents.
- Do **not** delete or shrink existing student material. Everything you do to existing files must be additive, except the small hub edits in section 6, which you must call out in the pull request.

## 3. Deliverables

New folder **`lp03a-iteration-and-algorithms/`** (hub code `W05 / LP 03A`, id `lp03a`, title `Iteration & Algorithms`):

| File | Purpose |
| --- | --- |
| `README.md` | The packet. I Do, We Do, You Do visible. Both course names, an honest "what this covers" list, run commands. |
| `code-along.py` | Hunter's live script (I Do). Runs top to bottom with no errors. Each section marked with a comment banner. |
| `practice.py` | Student starter (You Do). Every function starts as `raise NotImplementedError("TODO")` with a spec docstring. |
| `solutions.py` | Reference solutions with one-line "why this way" comments. |
| `check.py` | One command from the repository root: `python lp03a-iteration-and-algorithms/check.py`. Prints one line per exercise: `PASS`, `FAIL` plus a nudge, or `NOT STARTED`. Standard library `unittest` only. |
| `hints.md` | Three `<details>` levels per exercise. Never the answer. |
| `week05-walkthrough.md` | Catch-up text for students who missed class. |
| `run-of-show.md` | Minute-by-minute plan for a 90 minute session (see section 5). |
| `notebook-source.md` | Source file for Hunter's Gemini Notebook. Match the format of the existing three. |
| `bridge-the-dream-map.md` | Table of each topic here against the matching Bridge the Dream module. Fill only what you verified. |

Then the deck: **`week05/week05-iteration-slides.html`**, built from a new `resources/slides/week05b.js` through `build.py` (add one entry to `DECKS`). **Keep `week05/week05-slides.html` exactly as it is**; it is already shared.

## 4. Content spec (teach in our own words)

Concept order, each with a predict-then-reveal:

1. **Loop patterns:** counting, accumulating, searching, filtering. `range` with start, stop, step. `enumerate`.
2. **`while` loops:** conditions, sentinel values, validation loops, a guard against infinite loops.
3. **Debugging loops:** off-by-one, the infinite loop, an accumulator reset in the wrong place, a `return` inside the loop, tracing with `print`. These are the `Fix it` exercises.
4. **Linear search:** return the index or `-1`; first match versus all matches. Show a version that also reports how many comparisons it made.
5. **Binary search:** the sorted-list requirement, the low/high/mid walk, why it needs about log2(n) steps. Iterative only. Report comparisons so students can compare it with linear search.
6. **Bubble sort and selection sort:** trace each pass by hand in the deck, then code it. Swap with tuple unpacking.
7. **Nested loops:** pairs, a multiplication table, duplicate detection and its cost.
8. **List comprehension versus loop:** same task both ways, and when the loop is the clearer choice.

### Exercises: at least 10

Each exercise needs a docstring spec with one worked example and one edge case, and a tier tag: `Warm-up`, `Fix it`, `Build`, `Extend`, or `Transfer`. At least 40 percent must be `Warm-up` or `Fix it`. Tests must name the failure: which input, what was expected, what came back, and a one-line nudge. At least two plausible wrong solutions per exercise go into `scripts/mutation_check.py`.

Suggested set (change freely, keep the coverage):

1. `total_of_evens(numbers)` (accumulate with a condition). `Warm-up`
2. `count_up_by(start, stop, step)` returns a list; handle a step that never reaches `stop`. `Build`
3. `last_index_of(items, target)` (search from the other end). `Build`
4. `first_negative(numbers)` returns the first negative or `None`. `Build`
5. `repair_average(numbers)`: a given function with an accumulator reset inside the loop. `Fix it`
6. `repair_first_even(numbers)`: a given function that returns inside the loop on the first pass. `Fix it`
7. `ask_until_valid(read, low, high)`: a validation `while` loop where `read` is a function argument, so tests can feed values without `input()`. `Build`
8. `linear_search(items, target)` returning `(index, comparisons)`; no `.index()`, no `in`. `Build`
9. `binary_search(sorted_items, target)` returning `(index, comparisons)`. `Build`
10. `selection_sort(items)` returning a new list, input left unchanged. `Build`
11. `bubble_sort_passes(items)` returning the list after each pass (a list of lists). `Extend`
12. `has_duplicates(items)` with nested loops, then `Extend` to return the first duplicated pair. `Extend`
13. `squares_of_odds(numbers)` once as a loop and once as a comprehension; the test checks both agree. `Transfer`

### Integrity rule (read twice)

Code the Dream's Week 5 **assignment** is graded student work. Our `solutions.py` is public. Therefore:

- Do **not** include or solve the assigned warmups or the assigned mini-project. That means no "sum 1 to 100", no "positive-integer validation", no plain "linear search without `.index()` or `in`", no FizzBuzz, and no menu-driven min/max/search/bubble-sort program.
- Practice problems must be **different problems that teach the same skills** (the list above is built that way; keep it that way). The packet teaches the tools; students assemble their own assignment from them.
- Say so in the packet README in one friendly sentence.

## 5. Run of show (90 minutes)

Write `run-of-show.md` with times. Suggested shape: 10 minutes recap and check-in, 15 minutes loop patterns (I Do), 15 minutes debugging loops (We Do, students predict first), 20 minutes search (linear then binary, with the comparison counter), 20 minutes sorting trace and code, 10 minutes `check.py` and questions. Include one "failure to plan for" per block (for example, students mutating a list while looping).

## 6. Hub and README edits (additive, flagged in the pull request)

- `site/plan.js`: add unit `lp03a` after `lp03`, `status: "live"` only when the packet files exist and `check.py` passes. Give the existing `lp03` entry an added `note` such as "Extension: classes, comprehensions, decorators, closures. Also useful after Week 6." Do not change its id, code, title, or links.
- Make the Week 5 primary call to action point at `lp03a`. Update `index.html` fallback counters so they match the new live count, then run `scripts/browser_audit.js`.
- `README.md`: add one row to the "Weeks 3 to 5" table and the roadmap table: `LP 03A | Iteration & Algorithms | Loops, search, sorting, debugging loops | kindred packet for Python Intro 26.4 Week 5 and Bridge the Dream`. Do not reorder LP 01 to LP 11.
- `resources/slides/glossary.js`: add `iterate`, `accumulator`, `sentinel`, `linear search`, `binary search`, `comparison`, `pass`, `swap`. Do not remove terms.

## 7. Order of work and cut lines

The class is tonight. Ship in this order, as separate commits on one branch `codex/T-13-iteration-algorithms`, pushing after each tier:

- **Tier A (target 7:00 PM ET):** `code-along.py`, `practice.py`, `solutions.py`, `check.py`, `README.md`, `run-of-show.md`. Gate passes.
- **Tier B (target 7:30 PM ET):** deck, hub entry, `hints.md`, walkthrough.
- **Tier C (after class):** `notebook-source.md`, `bridge-the-dream-map.md`, mutation entries beyond the first two per exercise, README rows, glossary.

If you are behind, stop after Tier A and log it. A complete Tier A is worth more than an unfinished Tier B.

## 8. Do not

- Do not touch `lp01`, `lp02`, or `lp03` file contents, `week05/week05-slides.html`, or anything Bridge the Dream.
- Do not copy wording from the Code the Dream portal. Do not claim the packet is "official".
- Do not add dependencies. No em dashes. Commands must match the existing READMEs.
- Do not mark anything verified that you did not run. Do not push to `main`.

## 9. Done means

The gate in `PROTOCOL.md` passes; `check.py` shows `NOT STARTED` for every exercise on the untouched starter and `PASS` for all on `solutions.py`; `mutation_check.py` catches the wrong solutions; `browser_audit.js` reports no problems; the existing three packets and the old Week 5 deck are byte-for-byte unchanged (`git diff origin/main -- lp01-intro-to-python lp02-data-structures lp03-more-python-skills week05/week05-slides.html` is empty). Then open a pull request, append a `LOG.md` entry, and end it with a `NEXT:` line for Claude to review.

## Appendix: Bridge the Dream mapping, verified by Claude on November 2, 2026

Read from a shallow clone of `StrayDogSyn/Python-Essentials-Bridge-The-Dream` (commit `9b66bec`, private repository, read only). Use this to fill `bridge-the-dream-map.md`. Verify anything else yourself or write `TBD (Hunter)`.

| Topic in `lp03a` | Closest Bridge the Dream material | Status |
| --- | --- | --- |
| Loop patterns, `range`, `for` | Lesson 1, section 1.5 "Control Flow", subsection "Loops" (`python-essentials-v2/lessons/01IntroToPython.md`); notebook `notebook-sessions/week1/session1_intro_to_python.ipynb` | Partial: syntax only, no accumulate/search patterns |
| `while`, validation loops | Lesson 1, section 1.5 | Partial |
| Debugging loops | None found | Gap |
| Linear search, binary search | None found (searched `python-essentials-v2`, `lesson-plans`, `docs` for "linear search", "binary search", "bubble") | Gap |
| Bubble and selection sort | None found | Gap |
| Nested loops | None found as a lesson | Gap |
| List comprehensions | Lesson 3 `03MorePythonSkills.md` | Covered elsewhere |

Takeaway for the packet README: `lp03a` fills a hole in Bridge the Dream as well as serving Python Intro 26.4. Say that plainly, once. Bridge the Dream lesson 1 also covers conditionals (section 1.5) and lesson 2 covers collections, slicing, CSV files (2.2), and modules (2.3), which line up with official Weeks 3, 4, and 7.
