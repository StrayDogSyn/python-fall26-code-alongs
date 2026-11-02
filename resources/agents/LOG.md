# Handoff log

Append only. Newest entry last. Format is defined in `PROTOCOL.md`.

## 2026-11-02 16:55 ET | claude | T-01 | in review
- Did: Wave 0 fixes on `claude/wave0-fixes`. One LP 01 label ("keep practicing") in the practice and solutions files. Hub counters fixed (`includes("LP")`, planned count). Weeks 3 to 5 marked live, with a "this week" hero button that follows the newest live week. LP 02 practice checks now catch unordered output, wrong tie-breaking, and non-UTF-8 files. Added `CONTRIBUTORS.md`, README credit line, hub footer credit, `scripts/mutation_check.py`, and this protocol.
- Evidence (all run on the branch, Linux, Chromium via Playwright): `scripts/check_lessons.py` all pass; `scripts/mutation_check.py` 12 of 12 wrong solutions caught (was 9 of 12); `site/check.mjs` pass; `node --check` pass; `site/build.py` and `resources/slides/build.py` pass with no deck diff; `scripts/browser_audit.js` reports no problems (hub counters 05 / 03 / 08 match `plan.js`, all live routes open, no overflow at 375 px, every deck reaches its last slide by keyboard). Hero, shelf, and mobile layouts viewed as screenshots. One warning remains: Week 1 slide 18 is 25 px too tall at 1920 by 1080 (task T-10). Two pre-existing em dashes on lines I touched (`index.html`, `README.md`) were removed.
- Not verified: Windows PowerShell, Safari, Firefox, screen readers, the Gemini Notebook, and the live site after merge.
- NEXT: codex T-02 (review T-01), then T-03.

## 2026-11-02 16:42 ET | codex | T-03 | in review
- Did: Ran the runnable Windows lesson commands in PowerShell. Fixed the LP 02 UTF-8 assertion to accept Windows CRLF while still rejecting Latin-1, and made the browser audit ignore blocked Google Fonts only when the failed request URL is a Google Fonts URL. [Draft PR #7](https://github.com/StrayDogSyn/python-fall26-code-alongs/pull/7), stacked on PR #5.
- Evidence: `python scripts/check_lessons.py` PASS (all six files); `python scripts/mutation_check.py` PASS (12/12 wrong solutions caught); `node site/check.mjs` PASS; `node --check site/app.js` PASS; `node --check site/plan.js` PASS; `python site/build.py` PASS; `python resources/slides/build.py` PASS with only intended source and log changes; `node scripts/browser_audit.js` PASS (05 / 03 / 08 counters, zero overflow at 375 px, all decks traversed). The browser audit used temporary Playwright and Chromium installed outside the repository. `python` resolved to Python 3.13.15; `py --version` returned "No installed Python found!" on this machine.

| Command from lesson materials | Shell and location | Result |
| --- | --- | --- |
| `git clone https://github.com/StrayDogSyn/python-fall26-code-alongs.git` | PowerShell, temporary folder | PASS; cloned `main` |
| `cd python-fall26-code-alongs` | PowerShell, temporary folder | PASS |
| `python -m venv venv`; `venv\\Scripts\\Activate.ps1` | PowerShell, temporary clone | PASS; Python available in activated shell |
| `python --version`; `git --version`; `python -c "print('Hello, Fall 26!')"` | PowerShell, temporary clone | PASS; Python 3.13.15, Git 2.55.0, expected greeting |
| `pwd`; `ls`; `ls -Force`; `mkdir terminal-gym`; `cd terminal-gym`; `New-Item hello.py`; `python hello.py`; `cat hello.py`; `cp hello.py backup.py`; `mv backup.py greet.py`; `rm greet.py`; `cd ..`; `cd ~` | PowerShell, disposable folder | PASS after retrying `mv` in a clean folder; the first retry target already existed from the previous probe |
| `git config --global user.name "Your Name"`; `git config --global user.email "you@example.com"`; `git config --global init.defaultBranch main`; `git config --global pull.rebase false`; `git config --global core.editor "code --wait"`; `git config --global --list` | PowerShell, isolated temporary Git config | PASS; the real global config was untouched |
| `git init`; `git status`; `git add my-work/hello_mine.py`; `git add .`; `git diff`; `git diff --staged`; `git commit -m "Add my version of the hello script"`; `git commit -m "Save my LP 01 practice before syncing"`; `git log --oneline` | PowerShell, disposable Git repository | PASS |
| `git remote rename origin upstream`; `git remote add origin`; `git remote -v`; `git push -u origin main`; `git pull upstream main`; `git push` | PowerShell, disposable clone and local bare remotes | PASS using local remotes; no push to the course's `main` |
| `python lp01-intro-to-python/code-along.py`; `python lp02-data-structures/code-along.py`; `python lp03-more-python-skills/code-along.py` | PowerShell, repository root | PASS; expected output, including LP 01 total 9 and LP 02 roster read-back |
| `python lp01-intro-to-python/practice.py`; `python lp02-data-structures/practice.py`; `python lp03-more-python-skills/practice.py` | PowerShell, repository root | Expected `NotImplementedError` from untouched starters |
| `python lp01-intro-to-python/solutions.py`; `python lp02-data-structures/solutions.py`; `python lp03-more-python-skills/solutions.py` | PowerShell, repository root | PASS after LP 02 assertion fix; LP 02 failed before it |

- Not verified: Commands containing `YOUR-USERNAME`, `COMMIT-ID`, or other student-specific placeholders; actual pushes to a student's GitHub fork; macOS/Linux; Safari, Firefox, screen readers, Gemini Notebook, and live site after merge. The Week 2 Git commands were tested against disposable local remotes.
- NEXT: codex T-04 LP 01 exercise expansion; Claude review the T-03 draft PR after PR #5 is fixed.

## 2026-11-02 16:53 ET | codex | T-04 | in review
- Did: Expanded LP 01 from two to ten graded exercises with four Warm-up or Fix it tiers, examples and edge cases in every spec, three hints per exercise, reference solutions, and one-line `unittest` results. Added a scripted input retry to the code-along and aligned the README, notebook source, walkthrough, hub route, and Week 3 deck. [Draft PR #8](https://github.com/StrayDogSyn/python-fall26-code-alongs/pull/8), stacked on PR #7 and PR #5.
- Evidence: `python scripts/check_lessons.py` PASS, including ten LP 01 solution PASS lines, ten untouched-starter NOT STARTED lines, code-along label and total, and scripted input retry. `python scripts/mutation_check.py` PASS 29/29, with two caught wrong solutions for each of the ten LP 01 exercises. `node site/check.mjs` PASS. `node --check site/app.js` PASS. `node --check site/plan.js` PASS. `python site/build.py` PASS. `python resources/slides/build.py` PASS; only Week 3's generated deck changed from its source. `node scripts/browser_audit.js` PASS with counters 05 / 03 / 08, zero horizontal overflow at 375 px, and all five decks traversed.
- Not verified: macOS/Linux, Safari, Firefox, screen readers, a live deployed site after merge, or the private Gemini Notebook. The browser runner is a later task.
- NEXT: codex T-05 LP 02 expansion, using the T-04 check and hint pattern; Claude review the T-04 pull request.

## 2026-11-02 17:50 ET | claude | T-13 | handoff
- Did: PR #5 merged at 17:01 before my later commits, so the course map and Codex handoff never reached `main`. Rebuilt them on `main` here: `OFFICIAL_COURSE_MAP.md`, `CODEX_WEEK5.md` (T-13 with a verified Bridge the Dream mapping appendix), queue updates (T-01 to T-04 merged, T-05 to T-09 blocked, T-13 to T-17 added), Q-03 answered "yes" by Hunter. T-02 (separate review of T-01) was skipped because Hunter merged PR #5 directly; T-11 review of T-03 and T-04 is still owed.
- Evidence: queue and log edits only; no code changed.
- Not verified: nothing run.
- NEXT: codex T-13 (branch from this PR or `main` once merged). claude T-14 in progress.
