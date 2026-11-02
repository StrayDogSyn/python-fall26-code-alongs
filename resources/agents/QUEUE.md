# Task queue

Statuses: `ready`, `in progress`, `in review`, `merged`, `blocked`, `hunter`. Owners: `codex`, `claude`, `any`, `hunter`. Edit only your own task's row in your own branch, to keep merges clean.

Decisions already made by Hunter (November 2, 2026): mark Weeks 3 to 5 live; credit ChatGPT and Gemini; expand local Python exercises first and add an in-browser runner after; the Spyder tour waits and is a supplemental for a later date.

| ID | Owner | Status | Task | Depends on | Acceptance criteria |
| --- | --- | --- | --- | --- | --- |
| T-01 | claude | in review | Wave 0 fixes: one LP 01 label, hub counters, Weeks 3 to 5 live with a "this week" button, LP 02 test hardening, credits, mutation script, this protocol | none | Gate green; Hunter merges before the 8:00 PM Eastern class on November 2 |
| T-02 | codex | ready | Review T-01: check out `claude/wave0-fixes`, run the gate and `scripts/browser_audit.js`, test the hub on a narrow window, and log `APPROVE` or `CHANGES NEEDED` | T-01 | Review in `LOG.md`; every claim in the T-01 pull request confirmed or corrected |
| T-03 | codex | in review | Windows check: run every lesson command from READMEs, decks, and walkthroughs in PowerShell; fix any command that fails; record `python` versus `py` | T-01 | A table in `LOG.md` of command, shell, result; fixes in a separate small pull request |
| T-04 | codex | in review | Expand LP 01 to at least 8 graded exercises (see Brief section 3) | T-01 | See Brief; mutation check extended with at least 2 new wrong solutions per new exercise |
| T-05 | codex | in review | Expand LP 02 to at least 8 graded exercises | T-04 pattern settled | Same |
| T-06 | codex | ready | Expand LP 03 to at least 6 graded exercises plus one small project; replace the Week 5 quiz question about call counts; remove the slide 6 assertion leak | T-04 pattern settled | Same |
| T-07 | codex | ready | Upgrade the Week 3, 4, and 5 decks to the new exercises: at least 5 quiz questions each, a predict-then-reveal for every concept, links to the check command | T-04, T-05, T-06 | Decks rebuild with no stray diff; every slide keeps five speaker notes |
| T-08 | codex | ready | In-browser Python runner (see Brief section 4) | T-04, T-05, T-06 merged | Design note first in a draft pull request; implementation second |
| T-09 | codex | ready | Add `.gitattributes` marking built decks as generated so language statistics reflect authored source | T-08 merged | `git check-attr linguist-generated` shows true for the decks |
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
