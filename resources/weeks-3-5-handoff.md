# Weeks 3 to 5: Handoff for Gemini and Codex

Prepared Monday, November 2, 2026, for the Monday 8:00 PM Eastern session. This document is the working plan. It maps the missed weeks onto the existing roadmap, records what is verified, and gives each tool its section.

## The mapping

| Live week | Packet | Folder | Status |
|-----------|--------|--------|--------|
| Week 3 | LP 01 · Intro to Python | `lp01-intro-to-python/` | Packet exists. Code-along, solutions, and notebook source run clean. Needs a Week 3 slide deck or a plain walkthrough for remote students. |
| Week 4 | LP 02 · Data Structures & Files | `lp02-data-structures/` | Packet exists. Code-along and solutions run clean, and the demo file is deleted after each run. Needs the same Week 4 walkthrough. |
| Week 5 | LP 03 · More Python Skills | `lp03-more-python-skills/` | **New tonight.** README, notebook source, code-along, practice, and solutions. Code-along and solutions verified. Practice raises `NotImplementedError` at each TODO, as intended. |

Students see the roadmap, not week numbers, for LP packets. Keep the labels "Week 3 / 4 / 5" in the live session and in the hub's lesson entries so remote students can tell what to open.

## Verified today

- `python lp01-intro-to-python/code-along.py` and `solutions.py`: pass.
- `python lp02-data-structures/code-along.py` and `solutions.py`: pass.
- `python lp03-more-python-skills/code-along.py` and `solutions.py`: pass.
- `py_compile` on every packet file: pass.
- `practice.py` for LP 03: stops at its first TODO with `NotImplementedError`, which is the intended starting state.

Not yet verified: Windows PowerShell behavior (`python` versus `py`), the hub's rendering of the LP 03 entry, and anything in the Gemini Notebook.

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

## Codex section

Codex should work in this repository on a new branch. It should not push to `main` without Hunter's approval.

1. **Run the Windows check.** In PowerShell from the repository root, run `python lp01-intro-to-python/code-along.py`, then `py` in place of `python` if `python` is not recognized. Report which command worked in each packet's README, and fix the README if the command differs. Do not change code behavior.
2. **Add a lesson check script.** Create `scripts/check_lessons.py` that runs each packet's `solutions.py`, then confirms `practice.py` raises `NotImplementedError` before any TODO is replaced. Exit nonzero on failure. Keep it standard library only.
3. **Week 3 and Week 4 walkthroughs.** Draft `lp01-intro-to-python/week03-walkthrough.md` and `lp02-data-structures/week04-walkthrough.md`: one page each, with the I Do, We Do, You Do steps, the predictions to ask for, and the exact commands. Keep the same wording and command style as the existing READMEs.
4. **Site entries (for Devin's pass, not this one).** Note in the PR description that `site/plan.js` still marks LP 03 as `planned`. It should become `preview` when Hunter approves it for tonight.

Output: one branch, one commit per numbered item, and a short summary listing anything that failed on Windows.

## Tonight's run of show (8:00 PM ET)

| Time | Block | Source |
|------|-------|--------|
| 8:00 | Welcome, and a quick look at the Week 5 goal | `lp03-more-python-skills/README.md` |
| 8:05 | I Do: `Gradebook`, one comprehension, one decorator call | `code-along.py` |
| 8:25 | We Do: add a `Tally` method, change the threshold | `code-along.py` |
| 8:40 | You Do: implement `Tally` and `long_words` first | `practice.py` |
| 8:55 | Check-in in chat: one passing assertion each | Chat |
| 9:05 | Closures and `count_calls` (You Do part 2) | `practice.py` |
| 9:20 | Compare with `solutions.py` after the honest attempt | `solutions.py` |

Recording goes to the instructor's YouTube channel. Pin the practice site in the README if it is not already pinned.

## Open items

- Hunter decides whether Week 3 and Week 4 need full slide decks, or whether the packets plus walkthroughs are enough.
- Nothing has been committed or pushed. The working tree has the new LP 03 packet and this document.
- The computer's Documents and Desktop folders were not attached this session, so no local files on that machine were read.
