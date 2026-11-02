# Handoff log

Append only. Newest entry last. Format is defined in `PROTOCOL.md`.

## 2026-11-02 16:55 ET | claude | T-01 | in review
- Did: Wave 0 fixes on `claude/wave0-fixes`. One LP 01 label ("keep practicing") in the practice and solutions files. Hub counters fixed (`includes("LP")`, planned count). Weeks 3 to 5 marked live, with a "this week" hero button that follows the newest live week. LP 02 practice checks now catch unordered output, wrong tie-breaking, and non-UTF-8 files. Added `CONTRIBUTORS.md`, README credit line, hub footer credit, `scripts/mutation_check.py`, and this protocol.
- Evidence (all run on the branch, Linux, Chromium via Playwright): `scripts/check_lessons.py` all pass; `scripts/mutation_check.py` 12 of 12 wrong solutions caught (was 9 of 12); `site/check.mjs` pass; `node --check` pass; `site/build.py` and `resources/slides/build.py` pass with no deck diff; `scripts/browser_audit.js` reports no problems (hub counters 05 / 03 / 08 match `plan.js`, all live routes open, no overflow at 375 px, every deck reaches its last slide by keyboard). Hero, shelf, and mobile layouts viewed as screenshots. One warning remains: Week 1 slide 18 is 25 px too tall at 1920 by 1080 (task T-10). Two pre-existing em dashes on lines I touched (`index.html`, `README.md`) were removed.
- Not verified: Windows PowerShell, Safari, Firefox, screen readers, the Gemini Notebook, and the live site after merge.
- NEXT: codex T-02 (review T-01), then T-03.

## 2026-11-02 16:36 ET | codex | T-02 | in review
- Did: Reviewed [PR #5](https://github.com/StrayDogSyn/python-fall26-code-alongs/pull/5) on Windows. CHANGES NEEDED: (1) LP 02's new raw-byte UTF-8 assertion rejects correct CRLF text output on Windows, in both practice and solutions; (2) the browser audit treats blocked Google Fonts as page errors here. Findings posted in [PR comment](https://github.com/StrayDogSyn/python-fall26-code-alongs/pull/5#issuecomment-6589059332). GitHub refused a formal REQUEST_CHANGES review because the connected account owns the pull request.
- Evidence: `python scripts/check_lessons.py` FAIL at LP 02 solutions line 48; byte probe showed `b'Jos\\xc3\\xa9\\r\\nZo\\xc3\\xab\\r\\n'`. `python scripts/mutation_check.py` PASS 12/12. `node site/check.mjs` PASS. `node --check site/app.js` PASS. `node --check site/plan.js` PASS. `python site/build.py` PASS. `python resources/slides/build.py` PASS with no deck diff. `node scripts/browser_audit.js` FAIL on five `ERR_NETWORK_ACCESS_DENIED` font messages; its 375 px check found zero overflow, counters were 05 / 03 / 08, and all decks reached the last slide. `python` worked in PowerShell.
- Not verified: Safari, Firefox, screen readers, Gemini Notebook content, and live site after merge.
- NEXT: codex T-03 Windows command check; Claude fixes PR #5 findings.
