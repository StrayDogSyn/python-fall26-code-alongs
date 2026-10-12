# Gemini Notebook teaching kit: Weeks 1 and 2

This kit accompanies the [Python Fall 26 code-alongs](README.md). It is designed for the existing Gemini Notebook used by the instructor. The repository is the version-controlled source of truth; generated notebook outputs are study aids, and Python remains the place to run and verify code.

## Add the sources

1. In the instructor notebook, add [Week 1 source](week-1/notebook-source.md) and [Week 2 source](week-2/notebook-source.md) as **Markdown file uploads**. Gemini Notebook supports `.md` uploads. Give the sources clear titles: `W1 | Intro to Python | Fall 26` and `W2 | Data structures and files | Fall 26`.
2. For a Week 1 activity, select only the Week 1 source in the Sources panel. For Week 2, select only the Week 2 source. Select both only for the bridge and cumulative review. This keeps a Week 1 question from being answered with later material.
3. When a source changes in GitHub, upload the revised Markdown file again and remove the stale copy. A file upload is a snapshot, not a live link to this repository.
4. Keep `practice.py` out of the notebook until learners have attempted it. Keep `solutions.py` out of student-facing sources so a source-grounded tutor cannot reveal the answer accidentally. The reference solution remains in GitHub for comparison after an attempt.
5. If a session recording is public and captioned, add its YouTube URL after checking that it matches the week. Ask the notebook for a transcript-based recap, and check any generated code against the repository files.

The [official source guide](https://support.google.com/gemininotebook/answer/16215270?hl=en) documents source types and the difference between uploaded files and synced Google Drive sources. The [official product guide](https://knowledge.workspace.google.com/admin/generative-ai/gemini-notebook/turn-gemini-notebook-on-or-off-for-users) lists chat, reports, audio, video, quizzes, flashcards, and mind maps. Some newer features roll out gradually and account access varies; use the text activities below whenever a Studio option is absent.

## Teaching rhythm

| Phase | Instructor action | Learner action | Evidence of learning |
| --- | --- | --- | --- |
| **I Do** | Run a short example, narrate each prediction, then inspect the output or error. | Predict before watching the run; write one question. | Prediction and observed result differ or agree for a stated reason. |
| **We Do** | Give a partially changed example, ask for a prediction, and let learners choose the next line in chat or aloud. | Explain the choice to a partner or in chat, then run it locally. | A concrete explanation of state, type, or data structure. |
| **You Do** | Provide an independent task and a check, then wait before showing the reference. | Edit `practice.py`, run it, explain the result, and compare later. | Working code plus a brief explanation of why it works. |

For remote learners, show the prompt and expected behavior before typing. Pause the recording after each prediction question. Ask students to post a value, trace, or error line in chat rather than only “done.” Offer a text transcript and code path for anyone unable to use audio or video. Generated media never replaces an executable example.

## Week 1 studio plan

Read [Week 1 README](week-1/README.md) and select the Week 1 source.

| Feature | Use it for | Custom instruction or prompt |
| --- | --- | --- |
| **Mind map** | Preview relationships before coding. | “Map the path from a value and its type to a variable, expression, condition, loop, function, and error message. Use only W1. Keep `=` and `==` separate.” |
| **Audio Overview** | A second explanation for commuters and replay. | “Two patient hosts teach a new Python learner. Pause after asking what `int('4') + 2` prints. Explain conversion, then show how `==` differs from `=`. End with one try-it-yourself task; do not give its answer.” |
| **Video Overview** | Short visual recap of a trace. | “Show the value of `total` after each loop iteration in W1. Label the line that changes it. Avoid presenting generated code as executable proof.” |
| **Infographic** | One-screen syntax and decision aid. | “Make a readable beginner infographic with `str` versus `int`, `=` versus `==`, and the predict → run → observe → revise loop. Use one correct micro-example for each distinction.” |
| **Slide Deck** | Instructor-paced I Do and We Do. | “Make a short deck: goal, value/type demo, loop trace, branch prediction, function return prediction, independent task. Put each prediction on a slide before its answer slide.” |
| **Flashcards** | Retrieval, not recognition. | “Make cards on `str` versus `int`, conversion, `=` versus `==`, indentation, `return`, and reading a traceback. Include a tiny code prediction on at least half the cards.” |
| **Quiz** | Pre and post check. | “Create 6 questions from W1: 2 predictions, 2 error diagnoses, 1 function return value, 1 transfer problem. Include plausible distractors and an explanation tied to the source. Do not use W2.” |
| **Learning guide / report** | Guided review after class. | “Use I Do, We Do, You Do. Show one worked trace, ask me to predict a changed trace, then ask for an independent function. Wait for my response before explaining. Cite W1.” |

**Live tutor chat prompt:** “Use only the selected W1 source. Ask me to predict the next value in the `total` trace. Wait for my answer. If I am wrong, give one hint and ask again. Show the answer only after my second attempt, and cite the relevant source section.”

## Week 2 studio plan

Read [Week 2 README](week-2/README.md) and select the Week 2 source.

| Feature | Use it for | Custom instruction or prompt |
| --- | --- | --- |
| **Mind map** | Compare the four collections and file flow. | “Show list, dictionary, tuple, and set by access pattern, mutability, duplicates, and a course example. Add the path from a list of names to a UTF-8 text file and back.” |
| **Audio Overview** | Contrast similar looking structures. | “Teach a learner choosing between a list, dictionary, tuple, and set. Ask them which stores a participant name with a score. Explain why a set is useful for unique names. End with a file-handling prediction.” |
| **Video Overview** | Make indexing and file flow visible. | “Animate `names[0]`, `scores['Maya']`, and the two lines produced by `write_text`. Label indexes, keys, and newline characters.” |
| **Data Table** | Compare structures with the same criteria. | “Create a table of list, dictionary, tuple, and set with order, mutability, duplicates, lookup style, and a W2 example. Check every cell against W2 before sharing.” |
| **Infographic** | Visual collection chooser. | “Show four choices from a learner's need: ordered sign-ins → list, name-to-score → dictionary, fixed pair → tuple, unique tags → set. Include an example and one common trap for each.” |
| **Slide Deck** | Guided collection and file demo. | “Make a short deck: collection choice, index/key predictions, set uniqueness, file round trip, then an independent roster challenge. Keep the challenge answer off the final slide.” |
| **Flashcards** | Mixed retrieval practice. | “Create 8 cards: two choose-the-structure cases, two output predictions, two common errors, one set uniqueness case, and one file mode or path case.” |
| **Quiz** | Diagnose transfer. | “Create 6 W2 questions: collection choice, index versus key, dictionary lookup, set deduplication, tuple immutability, and file round trip. Include a short explanation and citation for each answer.” |
| **Learning guide / report** | Scaffold independent work. | “Use I Do, We Do, You Do to guide a roster-to-file task. Demonstrate one record, ask me to extend it, then give a fresh task without its solution. Wait for my attempt before hints.” |

**Live tutor chat prompt:** “Use only the selected W2 source. Present a tiny roster with two names and scores. Ask me to choose a collection and explain why. Wait, then offer one counterexample. Do not write my practice solution.”

## Cross-week review and quality check

Select both sources and ask: “How do Week 1 functions and loops help process a Week 2 list of dictionary records? Show a three-step plan, one small code sketch, and two questions for me to answer. Cite both sources.”

If **custom chat** is available, set its behavior to: “Act as a patient Python tutor for beginners. Ground answers in the selected weekly source and cite it. Ask for a prediction before explaining. Give one hint at a time. Ask the learner to run code locally and report the observed output. Do not supply a complete `practice.py` solution before the learner has made an attempt.” If **analytics** are available on the instructor account, use them to identify which study formats learners opened and decide what to revisit; do not treat an open count as proof of understanding. Use the exit checks and runnable practice for that.

Before sharing a generated artifact with students, check its code by running it, check its citations against the selected source, and fix any misleading explanation. For quizzes, verify each answer and distractor. Share the notebook only after checking its Google sharing setting and that the selected sources contain no private student data. Students can use the public repository without a premium subscription; the text prompts and runnable files cover the same learning targets.

## Student study loop

1. Read the weekly source and predict each worked example before running the code-along.
2. Use the mind map or audio/video recap to explain the idea in a different form.
3. Ask the notebook tutor for one hint at a time while working in `practice.py`.
4. Run the local checks, then use flashcards and the quiz for retrieval practice.
5. Compare with `solutions.py` only after an attempt. Write down one difference and why it matters.

Suggested reflection to paste into a class chat or learning journal: “I predicted ___; Python did ___ because ___; next I will try ___.”
