# Devin handoff: Code the Dream Python learning hub

## Mission

Continue the Fall 2026 Code the Dream Intro to Python learning hub where Claude and Codex left off. Turn the existing GitHub Pages course map into a polished, accessible, durable home for live and remote learners. Keep the weekly teaching sequence, independent practice, source-grounded Gemini Notebook study routes, recordings, and future lesson packets easy to find as the cohort grows.

- **Repository:** https://github.com/StrayDogSyn/python-fall26-code-alongs
- **Published hub:** https://ehunter-straydogsyn.me/python-fall26-code-alongs/
- **Cohort Gemini Notebook:** https://notebook.google.com/notebook/2d456bd7-b94f-47d8-aa78-8bb958fa0de8
- **Instructor recordings channel:** https://www.youtube.com/@EricHunterPetross
- **Earlier practice site:** https://straydogsyn.github.io/Python-Essentials-Bridge-The-Dream/

Work in this repository. Inspect current `main` before changing files. The user has already authorized committing and pushing enhancements to this repository. Keep the deployed site working at its project path and custom URL. Coordinate any signed-in Gemini Notebook changes with the instructor if Devin cannot access that account.

## Course facts to preserve

- This is a public resource for Code the Dream students, tied to the Fall 2026 Monday 8:00 PM Eastern live code-along. Students may use it asynchronously.
- **Week 01, “Learn the Controls,”** teaches tool setup, editor and terminal roles, working directories, paths, running a Python file, and the **Look → Move → Act** troubleshooting loop.
- **Week 02, “Save Points,”** teaches Git versus GitHub, the working folder/staging/local history/GitHub model, status/add/commit/push, forks, `origin` and `upstream`, weekly sync, `.gitignore`, and safe repository maintenance.
- **LP 01 and LP 02 are separate supplemental Python topic labs**, not alternate names for Weeks 01 and 02. LP 01 covers Python fundamentals; LP 02 covers collections and file handling.
- LP 03–11 are roadmap entries. Their status is **planned** until actual materials and instructor approval make them ready. The prior cohort's practice site has a different order after LP 04; link by topic, not by matching week number.
- Keep **I Do → We Do → You Do** visible in every lesson: a narrated, prediction-rich model; a small shared change with learner input; and an independent transfer task with a checkable result. Remote learners need pause points, text equivalents, and one-hint-at-a-time support.

## Current implementation (verified 2026-10-12)

The public homepage returned HTTP 200 and served the `Python Fall 26 · Learning Hub` title with `site/app.js`. The checkout was clean on `main` before this handoff was written. Recent foundation commits were `2936f9f` (Week 1/2 teaching packets), `0db6710` (hub), and `c84fe2b` (empty-search fix). Recheck live deployment after future pushes; a successful local build does not prove the Pages CDN has updated.

| Area | Source of truth and behavior |
| --- | --- |
| Hub shell | Root `index.html`; static, dependency-free, relative asset links for GitHub Pages project hosting. |
| Visual style | `site/style.css`; custom course-map design with responsive layouts and visible focus styling. |
| Curriculum data | `site/plan.js`; 13 stops across four phases. W01/W02 are `live`; LP01/LP02 are `preview`; LP03–11 are `planned`. Each unit has an objective and I/We/You actions. |
| Interaction | `site/app.js`; search, status filters, lesson detail panel, hash-addressable selection, and browser-local completion checkmarks for live weeks. Progress uses `localStorage`, so it does not sync across devices. |
| Site checks | `site/check.mjs` validates unit fields and local links; `site/build.py` creates an ignored `_site/` preview. The repository root is the current Pages publishing source; there is no required Pages build workflow. |
| Week decks | `week01/week01-slides.html` and `week02/week02-slides.html` are built outputs. Edit `resources/slides/engine.html`, `glossary.js`, and `week01.js`/`week02.js`, then run `python resources/slides/build.py`. Read `resources/slides/README.md` first. The decks include OS switching, speaker notes, glossary, quizzes, a terminal simulator, and a Git staging visualizer. |
| Notebook guide | `GEMINI_NOTEBOOK.md` specifies source selection and prompts for grounded chat, mind maps, audio/video overviews, infographics, flashcards, quizzes, data tables, and guided reports. |
| Weekly sources | `week01/notebook-source.md`, `resources/command-line-basics.md`, `week02/notebook-source.md`, `resources/git-commands.md`. |
| Topic labs | `lp01-intro-to-python/` and `lp02-data-structures/` contain README, Notebook source, code-along, practice starter, and solutions. |

The existing hub has a strong overview and two interactive decks. It does **not yet have** verified, individually linked Notebook Studio outputs, a per-lesson resource index, recording-to-lesson mapping, cross-device progress, or completed LP03–11 material. Do not describe any of these as live until checked. The link in the opening paragraph of `GEMINI_NOTEBOOK.md` currently points to `docs/index.html`; correct it to the actual hub URL or `index.html` as an early maintenance fix.

## Gemini Notebook state and source workflow

The prior assistant could not inspect or modify the signed-in cohort notebook. The instructor was given a prompt to upload the four Markdown sources below, but **upload, artifact generation, and student sharing are unverified**. Check the actual Notebook source list before creating or linking artifacts; avoid duplicate or stale sources.

| Title to use | Repository file | Scope |
| --- | --- | --- |
| `W01 · Learn the Controls` | `week01/notebook-source.md` | Week 01 |
| `W01 · Terminal reference` | `resources/command-line-basics.md` | Week 01 |
| `W02 · Save Points` | `week02/notebook-source.md` | Week 02 |
| `W02 · Git reference` | `resources/git-commands.md` | Week 02 |

Use only the two matching sources for each week's Studio outputs; use all four for a cross-week review. Treat uploaded Markdown as a snapshot: when the repository source changes, replace the stale Notebook copy and recheck dependent outputs. Add LP sources only when those labs are actually taught. Verify each generated command, operating-system variant, quiz key, and citation against the repository source before sharing. Never upload student data, private notes, or credentials. If a Studio format is unavailable to students, keep an equivalent text-and-practice route on the hub.

An appropriate Week 01 package is a path/working-directory mind map, a Look → Move → Act infographic, OS command comparison, audio or video walkthrough with prediction pauses, flashcards, quiz, and a guided report. Week 02 should show the four Git locations and transitions, an edit/stage/commit/push visual, a daily loop and fork-upkeep infographic, scenario-based quiz, flashcards, and a guided practice report. The full production prompts already live in `GEMINI_NOTEBOOK.md`; reuse and refine them rather than inventing a parallel syllabus.

## Next implementation brief

### 1. Audit and stabilize the learner journey

Walk the published hub as a learner on desktop and mobile. Verify every visible link, search/filter/selection state, keyboard path, empty state, progress behavior, and both decks. Fix the broken link in `GEMINI_NOTEBOOK.md`. Check the GitHub Pages publishing configuration and the custom-domain path before changing any deployment mechanism. Keep relative internal links or a tested base-path strategy.

### 2. Turn each ready stop into a complete lesson entry

Extend the `site/plan.js` content model in a maintainable way. For W01 and W02, expose clearly labeled **Start here**, **Watch/observe**, **Practice together**, **Try independently**, **Check understanding**, **Get unstuck**, and **Go deeper** routes. Link the existing slides, Markdown guides, practice missions, Notebook source/study assets, and recordings where verified. Make the next action obvious; show a realistic time estimate if the instructor confirms one. Provide a way back to the course map from every lesson resource.

Add an editable resource manifest or structured fields to each unit so new weeks can be published by adding data, not duplicating page markup. Separate `live`, `preview`, and `planned` meaningfully. Planned entries should communicate the learning goal without dead buttons, invented dates, or placeholder links. Preserve deep links to units and consider shareable links to sections or activities.

### 3. Improve the infographic and interaction

Make progression through the four phases readable at a glance and visually coherent with the existing design. Show dependencies and current position without turning the page into a dense dashboard. Strengthen small-screen use, touch targets, focus order, selected-state announcements, reduced-motion behavior, color contrast, and a text equivalent for visual relationships. Ensure the detail panel and hash navigation do not trap or unexpectedly move keyboard focus. Keep interaction useful with JavaScript unavailable where practical; at minimum provide direct access to ready lessons.

Use Code the Dream's name accurately. Do not assume use of its logo or official brand assets is licensed; request an approved asset or keep the current independent course identity. Favor fast-loading, readable, dependency-light implementation unless a new dependency solves a concrete problem.

### 4. Make Notebook materials discoverable and trustworthy

Once Notebook access is available, confirm the four sources, generate the highest-value Week 01 and 02 artifacts, review them with the instructor, and check anonymous/student access. Add **verified direct artifact links** to the corresponding lesson entries and a text alternative for each media item. Record artifact title, source scope, review date, visibility, and URL in a small maintainable manifest. If the Notebook cannot be inspected, prepare the manifest/schema and publish only the existing notebook and guide links with accurate wording.

### 5. Set the pattern for future cohort updates

Document the exact authoring path: add a weekly source and slides, build the deck, add the plan entry and resources, generate/review Notebook artifacts, validate links and accessibility, publish, then verify the live URL. Add lightweight automated checks for new data fields and internal links. Avoid claiming lesson completion from a simple local checkmark; label it as a personal browser marker. Keep the main README, hub, Notebook guide, and slides consistent when the curriculum changes.

## Definition of done for Devin's first enhancement pass

- W01 and W02 each have a clear, complete, distinct route from orientation to independent practice and feedback, using I Do → We Do → You Do.
- Setup, terminal, Git, GitHub, forks, and upkeep remain fully covered, with Windows PowerShell and macOS/Linux commands checked against the guides.
- Ready material is reachable in a few obvious actions from the homepage; LP previews and future roadmap stops are labeled honestly.
- The site works at the custom Pages URL on narrow phones, tablets, and desktop; links and hash navigation work from a project subpath.
- Keyboard-only use, readable focus, meaningful labels, contrast, and reduced-motion behavior are reviewed. Media has a text route.
- Search, filters, empty results, lesson selection, progress marking, and progress persistence are checked. No console errors or broken local links.
- `node site/check.mjs`, `node --check site/app.js`, `node --check site/plan.js`, `python site/build.py`, and any relevant lesson checks pass. Rebuild slides if their sources change.
- Any Notebook artifact linked from the hub was opened in a learner-accessible context and reviewed for accuracy; unverified assets stay clearly unlisted.
- Changes are documented in `site/README.md` and the main README where learner-facing behavior changes, committed, pushed, and verified on the live custom URL. Report the commit, live URL, completed work, and remaining access-dependent items.

## Suggested first commands

```bash
git status --short --branch
git log -5 --oneline
node site/check.mjs
node --check site/app.js
node --check site/plan.js
python site/build.py
python resources/slides/build.py
```

Read `README.md`, `site/README.md`, `GEMINI_NOTEBOOK.md`, and `resources/slides/README.md` before editing. Inspect the live page and the two built decks after the local checks. Keep generated `_site/` out of commits. If new content is proposed beyond the documented roadmap, verify it with the instructor before marking it live.
