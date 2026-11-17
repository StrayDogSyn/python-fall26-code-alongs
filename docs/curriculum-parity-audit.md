# Curriculum parity audit (Weeks 1 to 7)

Audited 2026-11-16 against the Week 6 and Week 7 packets, which are the current quality bar. UX and structure come from one shared engine (`resources/slides/engine.html`), so the weeks already match on navigation, keyboard use, theme, glossary, speaker notes, reduced motion, focus rings and mobile layout. The browser audit (`scripts/browser_audit.js`) shows no page errors, no broken links and no 375 px overflow on any deck. The gaps are in content depth, not interface.

## Deck depth

| Deck | Slides | Quiz questions | Reveal (predict) | Copyable code blocks |
|------|-------:|---------------:|-----------------:|---------------------:|
| Week 1 | 21 | 5 | 3 | 2 |
| Week 2 | 20 | 5 | 2 | 9 |
| Week 3 | 10 | 6 | 7 | 7 |
| Week 4 | 10 | 6 | 7 | 6 |
| Week 5 (LP 03) | 11 | 8 | 8 | 8 |
| Week 5 (LP 03A) | 13 | 8 | 11 | 11 |
| Week 6 | 12 | 8 | 10 | 10 |
| Week 7 | 16 | 9 | 14 | 14 |

## Packet depth

| Packet | Exercises | Hints lines | Walkthrough or run-of-show lines | Bridge the Dream map | Data files |
|--------|----------:|------------:|---------------------------------:|:--------------------:|:----------:|
| LP 01 (Week 3) | 21 | 63 | 32 | no | no |
| LP 02 (Week 4) | 23 | 58 | 31 | no | one demo file |
| LP 03 (Week 5) | 29 | 53 | 22 | no | no |
| LP 03A (Week 5) | 22 | 69 | 65 | yes | no |
| LP 06A (Week 6) | 22 | 69 | 46 | yes | no |
| LP 07A (Week 7) | 22 | 69 | 95 | yes | yes |

## Gaps, ranked by learner impact

1. **Weeks 3 and 4 decks are the thinnest** (10 slides, 6 quiz questions). Add a repair slide (broken code to fix, like Weeks 6 and 7), two more quiz questions each, and a closing "what to do before Monday" slide.
2. **LP 01, LP 02 and LP 03 have no run-of-show** in the Week 6/7 format (timed segments, mentor heads-up, failure modes). LP 03 has an older one; LP 01 and LP 02 have only a catch-up walkthrough.
3. **No Bridge the Dream map for LP 01, LP 02 or LP 03.** Add one each, using `TBD (Hunter)` for any claim not yet verified.
4. **Week 1 and 2 quizzes have 5 questions** against 8 or 9 for newer weeks. Raise to 8.
5. **Only Week 7 has a LeetCode companion.** Decide whether earlier weeks need one; Weeks 3 to 5 have natural fits (two-sum style lists, FizzBuzz, valid anagram).
6. **No matching game after Week 2.** The engine supports `data-match`; Weeks 3 to 7 could use one for vocabulary (types, collections, file modes).
7. **Week 6 slide 2 is 46 px taller than a 1080p viewport.** Trim the predict text or move the reveal below the code.
8. **Mutation checks and `check.py` coverage** are strongest for LP 06A and LP 07A. Confirm LP 01 to LP 03 mutants cover each exercise (see `scripts/mutation_check.py`).

## Fixed in this pass

- Added an inline favicon to the hub and to every deck (removes the only console 404 the browser audit reported).

## Not changed (needs Hunter's call)

Items 1 to 6 change what learners see in weeks already taught. They are queued, not built, so a taught week does not shift under the cohort without approval.
