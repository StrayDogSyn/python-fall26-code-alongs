# LP 02 supplemental lab: Data structures and files

**Goal:** Choose collections, rank and group data, parse a roster, and read and write UTF-8 files. This is a topic lab for LP 02 in the [course roadmap](../README.md#the-roadmap), separate from the Week 02 Git session.

**Week 4 catch-up route:** Use the [interactive slides](../week04/week04-slides.html) with the [text walkthrough](week04-walkthrough.md). Both follow the I Do → We Do → You Do sequence below.

## Start here

1. Read [the Gemini Notebook source](notebook-source.md). Predict before revealing each worked result.
2. Run [code-along.py](code-along.py): `python lp02-data-structures/code-along.py` from the repository root. It writes a small `attendance-demo.txt` file in this folder so you can inspect the result.
3. Complete [practice.py](practice.py). Run `python lp02-data-structures/check.py` from the repository root after each change. It prints one `PASS`, `FAIL` with a nudge, or `NOT STARTED` line per exercise. The untouched starter says `NOT STARTED` eleven times.
4. Open one level at a time in [hints.md](hints.md) when stuck. Compare with [solutions.py](solutions.py) only after an honest attempt. The file exercise checks use temporary directories, so they do not overwrite your files.

No third-party Python packages are required. The [Gemini Notebook kit](../GEMINI_NOTEBOOK.md) explains how to use the source with a mind map, audio or video recap, flashcards, quizzes, and a source-grounded tutor.

## I Do → We Do → You Do

| Phase | Activity | Remote participation |
| --- | --- | --- |
| I Do | Instructor models a roster, reads it with `open`, then shows parsing, sorting, grouping, slicing, and formatting. | Predict each printed collection before running. |
| We Do | Together, add one participant, deduplicate names, and predict a ranking and the file's lines. | Post the collection choice and predicted lines in chat. |
| You Do | Complete eleven exercises from warm-up to transfer in `practice.py`. | Share one check result and explain one design choice. |

## Exercise ladder

| Tier | Exercises | What you practice |
| --- | --- | --- |
| Warm-up | `unique_names`, `highest_score`, `word_counts`, `meeting_text` | Order, ties, dictionary counts, and tuple formatting |
| Fix it | `load_names`, `top_n`, `remove_short_words` | Missing files, sort direction, and safe list filtering |
| Build | `save_names`, `ranked`, `group_by_length`, `parse_roster` | UTF-8, sort keys, grouped lists, and text parsing |

Each function docstring gives an example and an edge case. The [check module](tests.py) names the input, expected result, actual result, and a nudge when a test fails. All eleven reference answers pass `python lp02-data-structures/check.py --solutions`.

**Exit check:** Choose a collection for ordered names, name-to-score lookup, an unchanging coordinate pair, and unique tags. Explain what `splitlines()` returns after reading the saved file.

**Accessibility:** All examples and prompts appear in text in the source. Media is optional; the runnable code and text activities cover the same outcomes.
