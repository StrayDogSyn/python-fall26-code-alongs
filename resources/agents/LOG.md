# Handoff log

Append only. Newest entry last. Format is defined in `PROTOCOL.md`.

## 2026-11-02 16:55 ET | claude | T-01 | in review
- Did: Wave 0 fixes on `claude/wave0-fixes`. One LP 01 label ("keep practicing") in the practice and solutions files. Hub counters fixed (`includes("LP")`, planned count). Weeks 3 to 5 marked live, with a "this week" hero button that follows the newest live week. LP 02 practice checks now catch unordered output, wrong tie-breaking, and non-UTF-8 files. Added `CONTRIBUTORS.md`, README credit line, hub footer credit, `scripts/mutation_check.py`, and this protocol.
- Evidence (all run on the branch, Linux, Chromium via Playwright): `scripts/check_lessons.py` all pass; `scripts/mutation_check.py` 12 of 12 wrong solutions caught (was 9 of 12); `site/check.mjs` pass; `node --check` pass; `site/build.py` and `resources/slides/build.py` pass with no deck diff; `scripts/browser_audit.js` reports no problems (hub counters 05 / 03 / 08 match `plan.js`, all live routes open, no overflow at 375 px, every deck reaches its last slide by keyboard). Hero, shelf, and mobile layouts viewed as screenshots. One warning remains: Week 1 slide 18 is 25 px too tall at 1920 by 1080 (task T-10). Two pre-existing em dashes on lines I touched (`index.html`, `README.md`) were removed.
- Not verified: Windows PowerShell, Safari, Firefox, screen readers, the Gemini Notebook, and the live site after merge.
- NEXT: codex T-02 (review T-01), then T-03.
