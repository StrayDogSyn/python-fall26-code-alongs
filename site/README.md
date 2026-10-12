# Learning hub maintenance

The repository root [`index.html`](../index.html) is the GitHub Pages learning hub. The existing Pages site publishes from this repository and serves the weekly slide files directly. [`plan.js`](plan.js) holds the visible curriculum data; [`app.js`](app.js) renders the journey, search, filters, details, and browser-local completion marks. The site is static, dependency-free, and uses relative links so it works at a GitHub Pages project path or a custom domain path.

## Add a new lesson or week

1. Add the lesson's files in the repository. Weekly slide decks follow `weekNN/weekNN-slides.html`; build them with `python resources/slides/build.py`.
2. Add or update one unit in `plan.js`. Set `phase` to one of `launch`, `core`, `data`, or `world`. Use `status: "planned"`, `"preview"`, or `"live"`. Add a concise goal, topics, and one action for each of `teach`, `together`, and `solo`.
3. Add links once they exist. Relative slide links such as `week03/week03-slides.html` work in the published site. Markdown and Python files link to their GitHub file pages so learners can see the source and download it. Shared Gemini Notebook artifacts can be added as unit links after their access and accuracy are checked.
4. Run `node site/check.mjs` and `python site/build.py`, then open the built `_site/index.html` in a browser. Check search, filters, lesson selection, mobile layout, links, and keyboard focus. The build script includes all `weekNN/*-slides.html` files automatically; the hub's summary counts come from `plan.js`.
5. Commit and push to `main`. The existing GitHub Pages branch publishing rebuilds the site after each push. The local `site/build.py` command makes a small `_site` preview copy but is not needed for publication.

Only units marked `live` count toward the completion indicator. When a new session becomes live, change its unit status and its completion checkbox appears automatically. Progress stays in a learner's browser; it is not sent to a server and will not follow them to another device.

The Gemini Notebook is a separate service. The hub links to the cohort notebook and the [Studio production guide](../GEMINI_NOTEBOOK.md). If access to the notebook changes, update the link in `index.html` and check its sharing settings before directing students there.
