# Gemini Notebook studio: Weeks 01 to 05

The [cohort notebook](https://notebook.google.com/notebook/2d456bd7-b94f-47d8-aa78-8bb958fa0de8) accompanies the [learning hub](https://ehunter-straydogsyn.me/python-fall26-code-alongs/). These are the **actual** first two weekly sessions: Week 01 covers setup and the terminal; Week 02 covers Git, GitHub, and maintaining a fork. LP 01 and LP 02 Python topic labs live separately in [`lp01-intro-to-python`](lp01-intro-to-python/README.md) and [`lp02-data-structures`](lp02-data-structures/README.md).

The repository is the version-controlled source of truth. Generated Notebook artifacts need an instructor accuracy check before they are shared. A Gemini account is optional for the repository lessons and slide decks.

## Build the source set

Add these Markdown files to the cohort notebook, using the shown titles:

| Source | Notebook title | Purpose |
| --- | --- | --- |
| [`week01/notebook-source.md`](week01/notebook-source.md) | `W01 · Learn the Controls` | Short, task-focused Week 01 source |
| [`resources/command-line-basics.md`](resources/command-line-basics.md) | `W01 · Terminal reference` | Full commands, OS differences, troubleshooting |
| [`week02/notebook-source.md`](week02/notebook-source.md) | `W02 · Save Points` | Short, task-focused Week 02 source |
| [`resources/git-commands.md`](resources/git-commands.md) | `W02 · Git reference` | Full Git, GitHub, fork, sync, and undo guide |

Gemini Notebook [supports Markdown uploads](https://support.google.com/gemininotebook/answer/16215270?hl=en). A local upload is a snapshot. Re-upload changed files and remove stale copies after a curriculum edit. If captioned class recordings are published, add the matching YouTube URL as another source and check that the transcript agrees with current course material. Upload only material that can be shared with students; do not include student names, private notes, tokens, or credentials.

Select **only the W01 sources** for Week 01 artifacts, **only the W02 sources** for Week 02 artifacts, and all four only for cross-week review. This keeps generated answers anchored to the right session. Add the LP 01 and LP 02 supplemental sources later, when those topics are actually taught.

## Remote I Do → We Do → You Do

| Phase | Instructor | Learner | Proof to collect |
| --- | --- | --- | --- |
| **I Do** | Show a short task, say what you expect, run it, and explain the result. | Predict before the click or Enter. | Prediction and observed result. |
| **We Do** | Change one condition and ask the room what to try next. | Post the next command and a reason in chat; run it locally. | A path, status section, or remote URL explained in the learner's own words. |
| **You Do** | Give an independent mission and one check; wait before revealing a solution. | Work in a safe practice folder or personal fork, then report the result. | A working command sequence plus an explanation of where data or history went. |

Pause a recording after each prediction prompt. Keep the full command as selectable text on screen for learners who cannot use audio or video. Ask for a concrete observation (“What did `pwd` print?”), rather than a generic “done.” A Notebook tutor should give one hint at a time and ask the learner to verify it in their own terminal.

## Week 01 Studio production: Learn the Controls

**Source selection:** `W01 · Learn the Controls` + `W01 · Terminal reference`.

| Format | Instructor prompt or direction | Learning use |
| --- | --- | --- |
| **Mind Map** | “Map Python, editor, terminal, shell, Git, working directory, relative path, and Look → Move → Act. Show how a wrong folder leads to file-not-found. Cite W01.” | Preview the tool ecosystem. |
| **Audio Overview** | “Two patient hosts guide a beginner through a first terminal session. Ask listeners to predict the output of `pwd`, `ls`, and `cd ..` before explaining. Include Windows PowerShell and macOS/Linux differences. Finish with a mission, without its answer.” | Review away from a screen. |
| **Video Overview / Short Video** | “Visually follow the prompt as the learner enters and leaves `python-fall26-code-alongs`. Label the working directory after each command. Keep commands and output legible.” | Make path movement visible. |
| **Infographic** | “Create a one-page Look → Move → Act flow. Pair common symptoms with the first safe check: command not found, file not found, wrong folder, wrong shell flag. Use exact commands from the W01 sources.” | Printable troubleshooting aid. |
| **Data Table** | “Compare PowerShell with macOS/Linux for listing hidden files and creating an empty file; include `pwd`, `ls`, `cd`, and running Python. Note when `python3` may be needed.” | OS-specific quick reference. |
| **Flashcards** | “Make 8 cards: terminal vs shell, prompt, current directory, `.` and `..`, absolute vs relative path, `pwd`, hidden files, and the first response to file-not-found. At least half should ask for a prediction.” | Recall without rereading. |
| **Quiz** | “Make 6 W01 questions: two path traces, one command anatomy, one OS choice, one file-not-found diagnosis, and one transfer task. Explain answers with source citations.” | Check mental model. |
| **Interactive learning report** | “Teach Look → Move → Act in I Do, We Do, You Do order. After one worked trace, stop and ask the learner to choose the next command. Give one hint if needed, then an independent folder mission.” | Guided practice. |

**Tutor chat behavior:** “Use only the selected Week 01 sources. Ask me where I am before suggesting a command. If I report an error, ask for the exact command and `pwd`/`ls` output. Give one next step, wait for my observation, then explain with a citation.”

## Week 02 Studio production: Save Points

**Source selection:** `W02 · Save Points` + `W02 · Git reference`.

| Format | Instructor prompt or direction | Learning use |
| --- | --- | --- |
| **Mind Map** | “Show the four places for code: working folder → staging area → local repository → GitHub. Put `git status`, `git add`, `git commit`, `git push`, and `git pull` on the correct transitions. Add fork, origin, and upstream.” | See the flow before memorizing commands. |
| **Audio Overview** | “Explain Git as save points. Pause for predictions after staging and committing: where is the newest version now? Compare a local commit with a pushed one. End with the difference between origin and upstream.” | Conceptual replay. |
| **Video Overview / Short Video** | “Animate one file through edit, stage, commit, and push. Show a second edit after staging and why another `git add` is needed. Label the status sections.” | Visualize hidden Git state. |
| **Infographic** | “Create a one-page daily Git loop and a separate small panel for weekly fork upkeep. Use only safe first checks; do not recommend `reset --hard` or forced push.” | Desk reference. |
| **Slide Deck** | “Make a six-slide I Do, We Do, You Do deck: four places, read status, stage one file, commit, push to origin, independent mission. Put predictions before answers.” | Live remote teaching. |
| **Flashcards** | “Make 10 cards on Git vs GitHub, status sections, staging, commit, push, fork, origin, upstream, pull, and `.gitignore`. Use realistic status snippets.” | Retrieval practice. |
| **Quiz** | “Make 7 questions about the four places, a status reading, staging after a second edit, push destination, fork sync, ignored files, and a safe first step after push rejection. Cite sources.” | Diagnose misconceptions. |
| **Interactive learning report** | “Guide a learner from one saved edit to a pushed commit. Pause after every status change for a prediction. Then give an independent practice-repo mission without solving it.” | Scaffold transfer. |

**Tutor chat behavior:** “Use only W02 sources. Ask me to paste a non-sensitive `git status` summary and say where my change currently lives. Explain the next safe command and why, one step at a time. Never suggest a destructive recovery command without identifying the exact state first.”

## Cross-week capstone and review

Select all four sources and ask: “A student cannot run `hello.py` from their repo, then wants to save the fix to their fork. Guide them through **Look → Move → Act → Status → Add → Commit → Push**. Ask for a prediction at each boundary. Explain the role of the working directory and the role of `origin`, with citations from both weeks.”

Before sharing any Studio output, check every command against the source and the target operating system. Run any generated commands in a disposable practice folder or fork. Check quiz keys and distractors. If a format is unavailable for a learner's account, the source text, slide deck, and practice mission provide an equivalent route. Google documents current [feature and account differences](https://knowledge.workspace.google.com/admin/generative-ai/gemini-notebook/turn-gemini-notebook-on-or-off-for-users).

The student reflection for both weeks is: “I predicted ___; the tool showed ___; that tells me ___; my next safe step is ___.”

## Weeks 3 to 5 source set

The Week 3 and 4 catch-up lessons and Week 5 live lesson use LP packets. Upload these Markdown files as separate sources if they are not already present in the cohort notebook. Confirm the source list before adding duplicates. A source upload and any Studio output remain unverified until the instructor checks them in the signed-in notebook.

| Lesson | Source title | Repository file |
| --- | --- | --- |
| Week 3 / LP 01 | `LP 01 · Intro to Python` | [`lp01-intro-to-python/notebook-source.md`](lp01-intro-to-python/notebook-source.md) |
| Week 4 / LP 02 | `LP 02 · Data Structures & Files` | [`lp02-data-structures/notebook-source.md`](lp02-data-structures/notebook-source.md) |
| Week 5 / LP 03 | `LP 03 · More Python Skills` | [`lp03-more-python-skills/notebook-source.md`](lp03-more-python-skills/notebook-source.md) |

Select one matching LP source for each artifact. Use these prompts in Gemini Notebook, then check every answer against the runnable packet and the source before sharing:

1. **Week 3 quiz:** “Using only LP 01, write five questions: text versus integer, `=` versus `==`, the 70 boundary, the running total for `[2, 3, 4]`, and the empty-list case. Ask for a prediction before each answer. Cite the source section and explain each answer. Do not reveal the practice starter's solutions.”
2. **Week 4 quiz:** “Using only LP 02, write five questions about list order, dictionary lookup, set uniqueness, tuple indexing, and the exact lines returned by `splitlines()`. Include one empty-input case. Cite the source section and explain each answer.”
3. **Week 5 flashcards:** “Using only LP 03, make eight cards on class, instance, `self`, `__init__`, comprehension, decorator, closure, and what the returned checker remembers. At least half should ask for a code prediction. Cite each card.”
4. **Week 5 quiz:** “Using only LP 03, make five questions: trace `self`, predict a comprehension, order decorator output, predict a closure value, and read the final traceback line. Cite the source section. Keep the independent practice answers hidden.”
5. **Week 5 audio overview:** “Using only LP 03, explain the four ideas in about eight minutes. Pause for a prediction before revealing each worked example. End with a prompt to try `practice.py`, without providing its answers.”

For a tutor chat, ask the learner what they tried, give one hint tied to the selected source, and wait for a new observation. The [Week 3 walkthrough](lp01-intro-to-python/week03-walkthrough.md), [Week 4 walkthrough](lp02-data-structures/week04-walkthrough.md), and [Week 5 slides](week05/week05-slides.html) provide text and practice routes even when Studio outputs are unavailable.
