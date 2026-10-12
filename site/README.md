# Learning hub maintenance

The repository root [`index.html`](../index.html) is the GitHub Pages learning hub. The existing Pages site publishes from this repository and serves the weekly slide files directly. [`plan.js`](plan.js) holds the visible curriculum data; [`artifacts.js`](artifacts.js) holds instructor-reviewed Gemini Notebook artifact links; [`app.js`](app.js) renders the journey map, search, filters, hash-routed lesson views, and browser-local completion marks. The site is static, dependency-free, and uses relative links so it works at a GitHub Pages project path or a custom domain path.

## Routes

- `#journey`, `#studio`, `#resources`, `#top` — hub sections.
- `#/week01` — full lesson view for a unit. `#/week01/try` deep-links a step (`start`, `watch`, `practice`, `try`, `check`, `unstuck`, `deeper`).
- `#week01` (no slash) is accepted for backward compatibility and upgraded to `#/week01`.

## Add a new lesson or week

1. Add the lesson's files in the repository. Weekly slide decks follow `weekNN/weekNN-slides.html`; build them with `python resources/slides/build.py`.
2. Add or update one unit in `plan.js`. Set `phase` to one of `launch`, `core`, `data`, or `world`. Use `status: "planned"`, `"preview"`, or `"live"`. Add a concise goal, topics, and one action for each of `teach`, `together`, and `solo`.
3. When the unit is teachable, add a `lesson` object: an `estimate` string (a soft range such as `"≈60–90 min"`) and `steps`, each with `key` (lowercase, unique per unit, used in deep links), `label`, `text`, an optional `mode` of `"I DO"`, `"WE DO"`, or `"YOU DO"`, and a `links` array. Live weekly sessions use the full seven-step route: start, watch, practice, try, check, unstuck, deeper. Preview labs can use fewer steps.
4. Add links once they exist. Relative slide links such as `week03/week03-slides.html` work in the published site. Markdown and Python files link to their GitHub file pages so learners can see the source and download it. Shared Gemini Notebook artifacts go in `artifacts.js`, not in `plan.js`.
5. Run `node site/check.mjs` and `python site/build.py`, then open the built `_site/index.html` in a browser. Check search, filters, lesson selection, `#/unit` and `#/unit/step` deep links, the back link, mobile layout, and keyboard focus. The build script includes all `weekNN/*-slides.html` files automatically; the hub's summary counts come from `plan.js`.
6. Commit and push to `main`. The existing GitHub Pages branch publishing rebuilds the site after each push. Verify the live URL afterward — the local `_site` preview does not prove the CDN updated.

## Notebook artifacts

[`artifacts.js`](artifacts.js) lists Studio outputs that an instructor has generated, reviewed for accuracy, and confirmed accessible to students. Each entry records `unit`, `title`, `format`, `scope`, `reviewDate`, `visibility` (`public` or `cohort`), `url`, and a one-line `alt` text equivalent. `node site/check.mjs` validates every field. The list ships empty until an artifact is verified — do not add links straight from generation.

## Publish checklist for a new week

1. Write `weekNN/notebook-source.md` and `resources/slides/weekNN.js`; rebuild decks.
2. Add the `plan.js` unit (with `lesson` once teachable) and any `artifacts.js` entries.
3. `node site/check.mjs`, `python resources/slides/build.py`, `python site/build.py`.
4. Browse `_site/index.html`: map card, lesson route, deep links, keyboard path, narrow viewport.
5. Commit, push, verify the live custom URL, then announce the new route to the cohort.

Only units marked `live` count toward the completion indicator. When a new session becomes live, change its unit status and its completion checkbox appears automatically. Progress stays in a learner's browser; it is a personal marker, not synced and not sent to a server.

The Gemini Notebook is a separate service. The hub links to the cohort notebook and the [Studio production guide](../GEMINI_NOTEBOOK.md). If access to the notebook changes, update the link in `index.html` and check its sharing settings before directing students there.
