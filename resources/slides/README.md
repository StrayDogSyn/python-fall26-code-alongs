# Slide Deck Sources

The weekly slide decks in `week01/`, `week02/`, and later week folders are **built files**. Edit the sources in this folder, then rebuild. Students only ever need the built `.html` file: it is self-contained and works offline (Google Fonts is the one optional download).

[🏠 Back to the main README](../../README.md)

## What lives here

| File | Job |
|------|-----|
| `engine.html` | The shared design and every interactive piece: navigation, OS toggle, theme, speaker notes, glossary, quiz, matching game, jargon decoder, practice terminal, Git staging visualizer, Undo Guide |
| `glossary.js` | Every "career companion" term, defined once for the whole course, using the docs' vocabulary tables |
| `week01.js`, `week02.js` | One content file per week: slides, speaker notes, quiz questions, matching pairs |
| `build.py` | Stitches `engine.html` + `glossary.js` + a week file into `weekNN/weekNN-slides.html` |

## Rebuild after an edit

From the repository root:

```bash
python resources/slides/build.py
```

On macOS or Linux without an active virtual environment, use `python3`. The script prints a `WARNING` if a content file contains an em dash, a single backslash that would vanish inside JavaScript, or a stray `</script>`.

## Add next week's deck

1. Copy `week02.js` to `week03.js` and change the title and slides.
2. Add any new terms to `glossary.js`, then list them in the week's `terms.fresh`. Put every earlier term in `terms.review` so the glossary starts with them unlocked.
3. Add `"week03.js": "week03/week03-slides.html"` to `DECKS` in `build.py`.
4. Rebuild, open the result in a browser, and click through every slide with both OS settings.

## Content rules

- **Source of truth.** Every command, flag, file name, and URL must match `README.md`, `command-line-basics.md`, or `git-commands.md` exactly.
- **Slides are HTML inside JavaScript backtick strings.** Write a literal backslash as `\\`, write `<` as `&lt;`, and never type `${`.
- **OS-specific text** goes in `<span class="os-win">…</span><span class="os-mac">…</span>`, so the OS button can swap it.
- **Commands students should copy** go in `<pre class="cmd"><code>…</code></pre>`, which adds a Copy button that copies only the active OS's lines. Sample output goes in `<pre class="out">`.
- **Predict, then reveal:** `<details class="reveal"><summary>Predict: …</summary><div>…</div></details>`.
- **Interactive pieces** are placeholders the engine fills in: `<div data-quiz="key">`, `<div data-match="key">`, `<div data-jargon="key">`, `<div data-sim="key">`, `<div data-gitviz="key">`, `<div data-undo="key">`. The `key` points at that week's `quizzes`, `matches`, `jargon`, or `undo` data.
- **Every slide gets all five speaker notes:** `timing`, `talking`, `question`, `failure`, `action`. The `action` names the slide's new terms for the room to say out loud.
- **No more than three `companions` per slide**, and no em dashes anywhere.

## Keyboard shortcuts (for presenting)

| Key | Does |
|-----|------|
| <kbd>→</kbd> <kbd>Space</kbd> / <kbd>←</kbd> | Next / previous slide |
| <kbd>Home</kbd> / <kbd>End</kbd> | First / last slide |
| <kbd>N</kbd> | Speaker notes |
| <kbd>G</kbd> | Glossary |
| <kbd>O</kbd> | Overview of all slides |
| <kbd>F</kbd> | Full screen |
| <kbd>Esc</kbd> | Close drawers and overview |

Adding `#7` to the end of the file's address jumps straight to slide 7. On phones, swipe left or right.
