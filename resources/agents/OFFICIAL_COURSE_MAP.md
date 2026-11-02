# Official course map: Code the Dream, Python Intro v1, cohort 26.4

Source: the CTD Learns portal, read on November 2, 2026 through Hunter's signed-in browser (course page `python-intro-v1/python-intro-26.4`). This file records the **structure** only: week names, dates, the stated objectives and topics in short form, and assignment titles. It deliberately does not copy lesson text or assignment instructions. Teach the concepts in our own words and examples; do not reproduce CTD's wording or solve CTD's assignments for students.

Where a week says "not read," Hunter or an agent with portal access should read it before building for it.

## The calendar

| Week | Dates (2026) | Lesson | Block |
| --- | --- | --- | --- |
| 0 | Sep 23 to Sep 29 | Getting Ready for Class | Getting ready |
| 1 | Sep 30 to Oct 6 | Python Basics | Getting started |
| 2 | Oct 7 to Oct 13 | CLI and Professional Environment | Getting started |
| 3 | Oct 14 to Oct 20 | Control Flow | Core Python programming |
| 4 | Oct 21 to Oct 27 | Data Structures and Loops | Core Python programming |
| **5** | **Oct 28 to Nov 3** | **Iteration and Algorithms** | Core Python programming |
| 6 | Nov 4 to Nov 10 | Functions and Scope | Core Python programming |
| 7 | Nov 11 to Nov 17 | Text Data and Modules | Working with real data |
| 8 | Nov 18 to Nov 24 | Errors and Debugging | Working with real data |
| 9 | Nov 25 to Dec 1 | External Libraries and APIs | Working with real data |
| 10 | Dec 2 to Dec 8 | Final Project I | Final project |
| 11 | Dec 9 to Dec 15 | Final Project II | Final project |

## What each week covers (short form)

| Week | Stated objectives and topics | Assignment titles |
| --- | --- | --- |
| 1 | Variables, data types, `print` and `input`; simple scripts with visible output; reading error messages; version control as a concept | not read |
| 2 | Install Python locally and set up VS Code; `cd`, `ls`/`dir`, `mkdir`, `pwd`; the terminal in a professional workflow; run scripts from the command line; install Git and meet repos and commits | not read |
| 3 | `if`/`elif`/`else` and comparison operators; Boolean operators (`and`, `or`, `not`), truthy and falsy; decision-making scripts using `input()`; GitHub first commit and pull request (clone, `add`, `commit`, `push`) | Warmups: letter grades, age categories, Boolean expression practice, sign and parity. Mini-project: Day Planner |
| 4 | Lists, tuples, dictionaries, sets; why each exists and when to use it; mutability; list comprehensions; `for` and `while` loops over structures | not read |
| **5** | `for` and `while`; loop patterns (counting, accumulating, searching); list comprehensions versus loops; linear search; binary search (concept and implementation); bubble sort and/or selection sort; debugging loops (off-by-one, infinite loops, wrong accumulator, tracing with `print`) | Warmups: sum with a `for` loop, input validation with a `while` loop, linear search without `.index()` or `in`, FizzBuzz. Mini-project: Number Cruncher (a menu-driven program with min, max, linear search, and bubble sort, no built-in `min`, `max`, `sorted`, or `.sort()`) |
| 6 | `def`, parameters, defaults, `return`; variable scope (local, global, shadowing); refactoring earlier scripts into functions; docstrings | Warmups: default parameters, functions that return values, scope in action, a validation function. Mini-project: refactor the Number Cruncher |
| 7 | `open()` modes and `with`; `.txt` and `.csv` files; `csv.reader`, `csv.DictReader`, writers; reading a CSV into a list of dictionaries; standard library `csv`, `os`, `datetime`; when to write code versus import it | Assignment 7 (titles not fully read) |
| 8 | `try/except/else/finally`; catching specific exceptions; `raise`; common runtime errors; the `logging` module; defensive programming; pip and virtual environments as a concept | Warmups include validating numeric input (rest not fully read) |
| 9 | `requests`, JSON parsing; public APIs and status codes; query parameters; `try/except` around API calls; API keys as a concept | Warmups: first API request, specific JSON fields, looping a JSON list, handling request errors. Mini-project: Country Explorer CLI |
| 10, 11 | Final project | not read |

Every weekly assignment also asks students to use the GitHub cycle (branch, commit, push, pull request into their own fork), submit the pull request link and a short video reflection, finish a weekly quiz, and complete a mindset reflection. Our Week 2 Git material supports that cycle; it is not a separate course topic.

## How the repository compares (as of November 2, 2026)

| Official week | What this repository has | Fit |
| --- | --- | --- |
| 1 Python Basics | Part of `lp01-intro-to-python` (types, `int()`, variables) and `week01/spyder-ide.py` (print, input, f-strings) | Partial |
| 2 CLI and Professional Environment | `week01` "Learn the Controls" and `week02` "Save Points" decks; command-line and Git guides | Strong; a little ahead on Git |
| 3 Control Flow | Only `classify_score` in `lp01`. Nothing on `elif` chains, `and`/`or`/`not`, truthy and falsy, or `input()`-driven decision scripts | **Gap** |
| 4 Data Structures and Loops | `lp02` collections (list, dict, set, tuple); no mutability lesson, no list comprehension lesson, no loops over structures | Partial |
| **5 Iteration and Algorithms** | **Nothing.** `lp03` teaches classes, decorators, and closures; none appear in any objective or topic read for Weeks 1 to 9 | **Mismatch** |
| 6 Functions and Scope | Functions appear inside other lessons; no scope lesson, no defaults, no refactor exercise | Partial |
| 7 Text Data and Modules | `lp02` covers `pathlib` file reading and writing; the official course teaches `open`, `with`, and `csv` | Different tools |
| 8 Errors and Debugging | Spyder tour cell on `try/except` and the debugger; no lesson | Gap |
| 9 External Libraries and APIs | None | Gap |
| 10 to 11 Final project | None | Gap |

The README roadmap (LP 01 to LP 11: pandas, cleaning, wrangling, visualization, scraping, SQL) comes from the previous cohort's sequence. It is not the Python Intro 26.4 outline. Do not treat LP 04 to LP 11 as upcoming weeks of this course.

## What this means for work in progress

- Tonight's session (Week 5) should teach **Iteration and Algorithms**.
- Weeks 3 and 4 catch-ups should teach **Control Flow** and **Data Structures and Loops**.
- Week 6 (next Monday) is **Functions and Scope** and builds on the Number Cruncher.
- Queue tasks T-04 to T-09 are on hold until Hunter confirms the realignment. See `QUEUE.md`.
