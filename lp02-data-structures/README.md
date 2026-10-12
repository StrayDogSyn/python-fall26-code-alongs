# LP 02 supplemental lab: Data structures and files

**Goal:** Choose the right collection for a task, inspect and update data, and save a small roster to a text file. This is a topic lab for LP 02 in the [course roadmap](../README.md#the-roadmap), separate from the Week 02 Git session.

## Start here

1. Read [the Gemini Notebook source](notebook-source.md). Predict before revealing each worked result.
2. Run [code-along.py](code-along.py): `python lp02-data-structures/code-along.py` from the repository root. It writes a small `attendance-demo.txt` file in this folder so you can inspect the result.
3. Complete [practice.py](practice.py). Run `python lp02-data-structures/practice.py` after each change.
4. Compare with [solutions.py](solutions.py) only after an honest attempt. The solution checks use a temporary directory, so they do not overwrite your files.

No third-party Python packages are required. The [Gemini Notebook kit](../GEMINI_NOTEBOOK.md) explains how to use the source with a mind map, audio or video recap, flashcards, quizzes, and a source-grounded tutor.

## I Do → We Do → You Do

| Phase | Activity | Remote participation |
| --- | --- | --- |
| I Do | Instructor models a roster using a list and dictionary, then saves names to a UTF-8 file. | Predict the value returned by each index or key lookup. |
| We Do | Together, add one participant, deduplicate names with a set, and predict the file's lines. | Post the collection choice and predicted lines in chat. |
| You Do | Implement `unique_names`, `highest_score`, and `save_names` in `practice.py`. | Share a small test and explain one design choice. |

**Exit check:** Choose a collection for ordered names, name-to-score lookup, an unchanging coordinate pair, and unique tags. Explain what `splitlines()` returns after reading the saved file.

**Accessibility:** All examples and prompts appear in text in the source. Media is optional; the runnable code and text activities cover the same outcomes.
