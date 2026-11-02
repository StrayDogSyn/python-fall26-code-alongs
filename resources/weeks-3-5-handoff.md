# Weeks 3 to 5: Handoff for Gemini and Codex

Prepared Monday, November 2, 2026, for the Monday 8:00 PM Eastern session. This document maps the missed weeks onto the existing roadmap, records what is verified, and keeps the Gemini Notebook production prompts together.

## The mapping

| Live week | Packet | Folder | Status |
|-----------|--------|--------|--------|
| Week 3 | LP 01 · Intro to Python | `lp01-intro-to-python/` | Packet, interactive deck, and text walkthrough are ready. |
| Week 4 | LP 02 · Data Structures & Files | `lp02-data-structures/` | Packet, interactive deck, and text walkthrough are ready. |
| Week 5 | LP 03 · More Python Skills | `lp03-more-python-skills/` | Packet, interactive deck, and timed session plan are ready. |

The hub pairs each LP with its week number so remote students can tell what to open.

## Verified today

- `python lp01-intro-to-python/code-along.py` and `solutions.py`: pass.
- `python lp02-data-structures/code-along.py` and `solutions.py`: pass.
- `python lp03-more-python-skills/code-along.py` and `solutions.py`: pass.
- `py_compile` on every packet file: pass.
- `practice.py` for LP 03: stops at its first TODO with `NotImplementedError`, which is the intended starting state.

Windows PowerShell on the instructor's computer runs `python` (Python 3.13.15). The `py` launcher reported no installed Python. The local lesson check script passes all three reference solutions and confirms that every practice starter stops at a TODO. Gemini Notebook uploads and Studio outputs remain unverified.

## Gemini Notebook section

The cohort notebook is at `https://notebook.google.com/notebook/2d456bd7-b94f-47d8-aa78-8bb958fa0de8`. Add these sources with the titles shown. Select only the matching source for each artifact.

| Source title | File |
|--------------|------|
| `LP 01 · Intro to Python` | `lp01-intro-to-python/notebook-source.md` |
| `LP 02 · Data Structures & Files` | `lp02-data-structures/notebook-source.md` |
| `LP 03 · More Python Skills` | `lp03-more-python-skills/notebook-source.md` |

Prompts to run, in this order. Each one says to cite the source and to stop at each prediction.

1. **Flashcards (LP 03, 8 cards):** "Make 8 flashcards from the LP 03 source: class, instance, `self`, `__init__`, comprehension, decorator, closure, and what a closure remembers. At least half should ask for a prediction. Cite the section for each card."
2. **Quiz (LP 03, 5 questions):** "Make 5 multiple-choice questions on the LP 03 source: one trace of `self`, one comprehension output, one decorator order question, one closure value, one traceback reading. Give the answer key and cite each one."
3. **Audio Overview (about 8 minutes):** "Two hosts walk a beginner through LP 03. Before explaining each idea, ask the listener to predict the output of the example. Use the mail-slot-with-a-sticky-note image for closures. Do not reveal the You Do answers."
4. **Tutor chat behavior:** "Use only the LP 03 source. Ask what the learner already tried before explaining. Give one hint at a time. Never give the solution to practice.py."
5. **Week 3 and Week 4 review (optional):** Use the LP 01 and LP 02 sources with the same flashcard and quiz prompts. Keep each artifact limited to one source to avoid mixed answers.

Before anything is shared, run every generated code snippet against the packet files. Replace any artifact that disagrees with the packet.

## Codex section completed locally

Windows PowerShell runs `python` for all three code-alongs. This computer's `py` launcher does not find an installation. `scripts/check_lessons.py` runs the reference solutions and checks that each practice starter reaches a TODO. Weeks 3 and 4 have walkthroughs and decks; Week 5 has a deck and a timed plan. The hub labels each LP with its week and lists LP 03 as a preview until the live session has occurred. No change to `main` is part of this handoff.

## Tonight's run of show (8:00 PM ET)

Use [`lp03-more-python-skills/week05-run-of-show.md`](../lp03-more-python-skills/week05-run-of-show.md) for the timed presenter plan. The [practice site](https://straydogsyn.github.io/Python-Essentials-Bridge-The-Dream/) is pinned near the top of the main README.

## Current files

- Weeks 3 and 4 each have an interactive deck and a text walkthrough.
- Week 5 has an interactive deck and `lp03-more-python-skills/week05-run-of-show.md`.
- `scripts/check_lessons.py` checks the reference solutions and starter TODO behavior.
- Notebook source files are ready for Gemini Notebook import. The signed-in notebook source list and output sharing still need verification there.
