# Task queue

Statuses: `ready`, `in progress`, `in review`, `merged`, `blocked`, `hunter`. Owners: `codex`, `claude`, `any`, `hunter`. Edit only your own task's row in your own branch, to keep merges clean.

Decisions already made by Hunter (November 2, 2026): adopt the official Python Intro 26.4 week mapping (Q-03); new work is additive kindred packets and never renames lp01 to lp03; mark Weeks 3 to 5 live; credit ChatGPT and Gemini; expand local Python exercises first and add an in-browser runner after; the Spyder tour waits and is a supplemental for a later date.

| ID | Owner | Status | Task | Depends on | Acceptance criteria |
| --- | --- | --- | --- | --- | --- |
| T-01 | claude | merged | Wave 0 fixes: one LP 01 label, hub counters, Weeks 3 to 5 live with a "this week" button, LP 02 test hardening, credits, mutation script, this protocol | none | Gate green; Hunter merges before the 8:00 PM Eastern class on November 2 |
| T-02 | codex | merged | Review T-01: check out `claude/wave0-fixes`, run the gate and `scripts/browser_audit.js`, test the hub on a narrow window, and log `APPROVE` or `CHANGES NEEDED` | T-01 | Review in `LOG.md`; every claim in the T-01 pull request confirmed or corrected |
| T-03 | codex | merged | Windows check: run every lesson command from READMEs, decks, and walkthroughs in PowerShell; fix any command that fails; record `python` versus `py` | T-01 | A table in `LOG.md` of command, shell, result; fixes in a separate small pull request |
| T-04 | codex | merged | Expand LP 01 to at least 8 graded exercises (see Brief section 3) | T-01 | See Brief; mutation check extended with at least 2 new wrong solutions per new exercise |
| T-05 | codex | blocked | Expand LP 02 to at least 8 graded exercises | T-04 pattern settled | Same |
| T-06 | codex | blocked | Expand LP 03 to at least 6 graded exercises plus one small project; replace the Week 5 quiz question about call counts; remove the slide 6 assertion leak | T-04 pattern settled | Same |
| T-07 | codex | blocked | Upgrade the Week 3, 4, and 5 decks to the new exercises: at least 5 quiz questions each, a predict-then-reveal for every concept, links to the check command | T-04, T-05, T-06 | Decks rebuild with no stray diff; every slide keeps five speaker notes |
| T-08 | codex | blocked | In-browser Python runner (see Brief section 4) | T-04, T-05, T-06 merged | Design note first in a draft pull request; implementation second |
| T-09 | codex | blocked | Add `.gitattributes` marking built decks as generated so language statistics reflect authored source | T-08 merged | `git check-attr linguist-generated` shows true for the decks |
| T-13 | codex | in progress | **Priority 0, due before class tonight.** Week 5 Iteration and Algorithms kindred packet `lp03a-iteration-and-algorithms` plus deck. Full spec in `CODEX_WEEK5.md`. Follow the LP 01 `check.py`, `tests.py`, `hints.md` pattern from T-04 | none | Tier A by 7:00 PM ET, Tier B by 7:30 PM ET; existing packets and the old Week 5 deck unchanged |
| T-14 | claude | in progress | Week 3 Control Flow kindred packet `lp01a-control-flow` (conditions, `elif`, `and`/`or`/`not`, truthy/falsy, `input()` decisions), same pattern as T-04 | none (own folder) | Same quality bar as `CODEX_WEEK5.md` section 4; do not edit plan.js until T-13 merges |
| T-15 | claude | ready | Week 4 Data Structures and Loops kindred packet `lp02a-data-structures-and-loops` (mutability, choosing a structure, looping over each, comprehensions) | T-14 pattern | Same |
| T-16 | codex | ready | Week 6 Functions and Scope kindred packet `lp06a-functions-and-scope`, due Tuesday Nov 3 for the Nov 9 class (def, defaults, return, scope, docstrings, refactoring) | T-13 merged or in review | Same bar as T-13; no solution to the graded Week 6 warmups or the Number Cruncher refactor |
| T-17 | claude | ready | Hub realignment after T-13, T-14, T-15 merge: re-point Weeks 3, 4, 5 primary links, label lp01/lp02/lp03 as catch-up and extension, retire LP 04 to 11 from the "upcoming" roadmap text (keep as Bridge the Dream), update counters | T-13, T-14, T-15 merged | Browser audit clean; old URLs still work |
| T-10 | codex | ready | Fix Week 1 slide 18 overflow (25 px at 1920 by 1080) | none | Browser audit shows no overflowing slide in any deck |
| T-11 | claude | ready | Review every Codex pull request marked `in review`; rerun the gate; log the verdict | any Codex PR | Log entry per pull request |
| T-12 | claude | ready | Re-audit the site and repository after each merge; update the numbers in `resources/agents/AUDIT.md` if present | any merge | Short dated entry in `LOG.md` |
| H-01 | hunter | hunter | Upload `lp01`, `lp02`, `lp03` `notebook-source.md` files to the cohort Gemini Notebook and run the prompts in `resources/weeks-3-5-handoff.md` | none | Verified artifacts only, then link in `plan.js` through a new task |
| H-02 | hunter | hunter | Merge reviewed pull requests; decide Open Questions | none | n/a |
| H-03 | hunter | hunter | Map recordings to lessons; supply the YouTube links | none | n/a |

## Open Questions

Format: `Q-NN | raised by | question | recommendation | answer`

| ID | Raised by | Question | Recommendation | Answer |
| --- | --- | --- | --- | --- |
| Q-01 | claude | The Spyder tour (`week01/spyder-ide.py`) is deferred. Keep it where it is, or move it to `lp01-intro-to-python/` as a supplemental? | Move later, as a supplemental, with a README note | Deferred by Hunter |
| Q-02 | claude | Should the Pyodide runner (T-08) pin a specific version, and which? | Pin an exact released version at least two weeks old; verify the CDN URL returns 200 before use | open |
| Q-03 | claude | The official Python Intro 26.4 outline (`OFFICIAL_COURSE_MAP.md`) does not match LP 01 to 03 or the LP 04 to 11 roadmap. Adopt it? | Yes: kindred packets for Weeks 3, 4, 5, 6; retire LP 04 to 11 from the upcoming roadmap (keep as Bridge the Dream); keep LP 03 as an extension | **Yes (Hunter, Nov 2, 2026, 5:35 PM ET).** T-05 to T-09 stay blocked until rebased on the new packets |
