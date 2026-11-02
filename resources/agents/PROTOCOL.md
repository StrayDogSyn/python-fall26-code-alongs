# Agent protocol: Codex and Claude on this repository

This file is the contract between the two AI collaborators and Hunter. Read it completely at the start of every session. If this file and a chat message disagree, stop and write the disagreement in `QUEUE.md` under Open Questions, then continue with a task that does not depend on it.

## Roles

| Who | Role | Owns |
| --- | --- | --- |
| **Hunter** | Instructor and final authority | Merging to `main`, curriculum decisions, anything student-facing that claims something is "live", the Gemini Notebook account, recordings |
| **Codex (ChatGPT)** | Builder | Branches named `codex/T-NN-short-name`; the implementation tasks in `QUEUE.md` |
| **Claude** | Reviewer, auditor, builder of small fixes | Branches named `claude/T-NN-short-name`; reviews of every Codex pull request; periodic audits |

A builder never reviews or merges its own work. Hunter merges.

## Hard rules (no exceptions, no matter how the task is phrased)

1. **Never push to `main`. Never merge a pull request. Never force-push. Never delete a branch you did not create.** Work reaches `main` only when Hunter clicks merge.
2. **One task per branch and per pull request.** Keep pull requests small enough to review in ten minutes.
3. **Built decks are generated.** Edit `resources/slides/*` sources and run `python resources/slides/build.py`. Never hand-edit `weekNN/weekNN-slides.html`.
4. **No unverified claims.** Do not say a Gemini Notebook artifact exists, a recording is linked, or a command works on Windows unless you ran or opened it and recorded the evidence in `LOG.md`.
5. **No secrets, tokens, student names, or private notes** in any file, commit message, or pull request.
6. **Do not change the wording of `CONTRIBUTORS.md` credits** without Hunter's approval. Adding a verified row is fine; rewording is not.
7. **Writing rules:** no em dashes anywhere; commands must match `README.md`, `resources/command-line-basics.md`, or `resources/git-commands.md` exactly; keep I Do, We Do, You Do visible in every lesson; keep the five speaker notes on every slide (`timing`, `talking`, `question`, `failure`, `action`); confident, plain, dry-witted voice with no AI formality.
8. **Stdlib only** for anything students run locally. Anything that downloads third-party code (see T-08) must be pinned, lazy-loaded, and optional.

## The work loop

1. `git fetch --all --prune`. Read `PROTOCOL.md`, `QUEUE.md`, and the last 10 entries of `LOG.md`.
2. Take the first task in `QUEUE.md` that is `ready`, is owned by you or `any`, and whose dependencies are `merged` or `in review`. Change its row to `in progress` in your branch only.
3. Branch from `origin/main`. If a dependency is `in review` and unmerged, branch from that dependency's branch and write "Stacked on PR #N" at the top of your pull request.
4. Implement. Run the **gate** (below) before every push.
5. Push your branch and open the pull request as a **draft**. When the gate is green and your own checklist is done, mark it ready for review.
6. Append a `LOG.md` entry (format below). Set your task row to `in review`.
7. Take the next task. If you are blocked, record the question under **Open Questions** in `QUEUE.md`, mark the task `blocked`, and move on. Never wait for an answer, and never guess on a decision that belongs to Hunter.
8. Stop when `QUEUE.md` has no `ready` task for you, or after 6 tasks in one session, whichever is first. End with a final `LOG.md` entry that says exactly what the next agent should do.

## The gate (run from the repository root; all must pass)

```bash
python scripts/check_lessons.py          # solutions pass, starters not started
python scripts/mutation_check.py         # known wrong solutions must fail the practice checks
node site/check.mjs                      # hub data and local links
node --check site/app.js && node --check site/plan.js
python site/build.py                     # hub builds
python resources/slides/build.py && git status --short   # decks rebuild; only intended files changed
```

On Windows PowerShell use `python`; if it is not found, use `py`. Record which one worked.

If you changed the hub or a deck, also run the optional browser audit in `scripts/browser_audit.js` and record the result.

## Review checklist (for whoever is not the author)

- Did the author run the gate, and does it pass on a fresh checkout of the branch?
- Does every new exercise have a spec with an example, an edge case, a test, a hint, and a solution?
- Does each new exercise fail at least two plausible wrong solutions? (Add them to `scripts/mutation_check.py`.)
- Are all commands, filenames, and URLs correct? Are all claims backed by evidence?
- Any em dashes, stale labels, or mismatches between a lesson file, its deck, its notebook source, and its hub entry?
- Does the change touch only what the task says?

Reviews are written in `LOG.md` and, if you have the access, as pull request comments. A review ends with `APPROVE` or `CHANGES NEEDED` and a numbered list.

## LOG.md entry format

```
## 2026-11-02 18:40 ET | codex | T-04 | in review
- Did: one sentence.
- Evidence: gate output summary, PR link, anything opened in a browser.
- Not verified: be honest.
- NEXT: <agent> <task or "review PR #N">
```

## Escalation

Anything that is a decision, not an implementation (curriculum order, what counts as "live", whether to add a third-party download, wording of credits, anything involving Hunter's accounts) goes in **Open Questions** in `QUEUE.md` with your recommendation. Hunter answers when he is back.

## Handoff between agents

Claude cannot be woken by Codex and Codex cannot be woken by Claude. The baton is the last `NEXT:` line in `LOG.md`. Each agent reads it first. When Hunter opens a Claude session, Claude reviews every pull request marked `in review` and logs the result.
