# Week 8 run of show | 90 minutes

**Timing note for Monday, November 23.** The graded Week 8 work is due Tuesday, November 24, so many students arrive mid-assignment. Open with a quick "who is blocked, and on what?" and let the answers decide how long the We Do blocks run. Teach the idea with the kitchen files, then send each student back to their own assignment with the checklist in the mentor heads-up below.

| Time | Phase | Plan | Failure to plan for |
| --- | --- | --- | --- |
| 0 to 10 min | Check-in | Ask what a program has done so far when something went wrong (a red traceback and a stopped program). Ask who is blocked. Mention registration (see below) in one sentence. Name the graded work only as "your assignment", without solving it. | Students paste their own assignment code into chat; steer them to this packet's kitchen files instead. |
| 10 to 25 min | I Do | Sections 1 to 4 of the code-along. Show a syntax error caught before anything runs, then six runtime errors, then the `try`, `except`, `else`, `finally` trail. Predict which rooms each input visits. | Students think `finally` only runs after an error; the trail shows it runs every time. |
| 25 to 40 min | We Do | Section 3, then repair `repair_parse_qty` together. Watch `sloppy_qty` return 0 for `'12'` because a typo was swallowed. Rule out loud: catch the failure you expect and nothing else. | A bare `except:` also swallows `KeyboardInterrupt`, so Ctrl+C stops working in that loop; demonstrate it on a throwaway loop. |
| 40 to 55 min | We Do | Sections 5 and 6: `raise`, guard clauses, and the negative-index quiet wrong answer. Rewrite the nested `label_nested` as `label_guarded` and show both give the same list. Then repair `repair_total_weight` (the `try` belongs inside the loop). | Students conclude "always use try/except"; the rule is to check cheaply when you can, and catch when checking costs as much as doing. |
| 55 to 70 min | I Do, then pair | Section 7 (what `DictReader` does with a ragged row), then logging at four levels, then the venv screen. Pairs compare `sys.prefix` inside and outside an environment if time allows. | `pip install` into the global Python works today and breaks another project next week; say why before showing the environment. |
| 70 to 83 min | You Do | Pick a Warm-up or Fix it, run `python lp08a-errors-and-debugging/check.py`, then try a Build exercise. Students who are blocked on the graded work get the checklist below instead. | A TODO traceback is mistaken for a broken check; `NOT STARTED` names the next function to edit. |
| 83 to 90 min | Exit check | Explain the difference between a syntax error and a runtime error, and why `except Exception` is risky. Close with the LeetCode warm-up as optional practice. | If a learner answers from memory, ask them to predict what a new bad input would do before revealing it. |

## Optional second half: LeetCode 20 (20 to 25 minutes)

Use [leetcode-valid-parentheses.md](leetcode-valid-parentheses.md). It fits after the exit check or as the first block of the next session. The first working draft crashes with `IndexError` on `")"`, which turns the lesson into a live debugging exercise, and the fix can be written as a guard clause or as a `try/except`.

## Mentor heads-up for the graded Week 8 work

These are common stumbling blocks. None of them gives away an answer. They were checked against Python behavior, but the graded data file `messy_data.csv` was not available when this was written, so confirm anything data-specific by opening that file.

**Warmup 1, validating numeric input**
- The sample prints `42.0`, which means the number was converted with `float()`, not `int()`.
- `float()` accepts text that is not a sensible reading: `nan`, `inf`, `1e3`, and `" 5 "`. If a student's loop accepts `nan`, that is Python working as designed, not a bug in the loop.
- A bare `except:` also catches Ctrl+C, so the program cannot be stopped. Catch `ValueError` only.

**Warmup 2, safe division**
- Typing letters instead of a number raises `ValueError`, not `ZeroDivisionError`. A `try` that only has a `ZeroDivisionError` clause still crashes on `abc`. Ask the student what they want to happen, then add that clause.
- Keep the `try` block as small as the line that can fail. A `try` wrapped around `input()`, the conversion, and the division makes it hard to tell which failure you caught.

**Warmup 3, missing file (the trap that hides another trap)**
- `../data/missing.txt` is measured from the folder where Python started, not the folder holding the script. If the working directory is wrong, even a file that exists raises `FileNotFoundError`. This warmup is supposed to say "not found", so it appears to work for the wrong reason.
- The mini-project uses the same kind of path. A student who ran Warmup 3 from the wrong folder will see "file not found" for `messy_data.csv` and believe the data is missing.
- Teach one habit: put the path you tried in the error message, and print `os.getcwd()` when a path fails. A message that says only "file not found" fails the next person who reads it.

**Warmup 4, virtual environment**
- Activation differs by shell. Windows PowerShell: `.venv\Scripts\Activate.ps1`. Windows `cmd`: `.venv\Scripts\activate.bat`. macOS and Linux: `source .venv/bin/activate`. The prompt shows `(.venv)` when it worked.
- PowerShell may refuse to run the activation script with "running scripts is disabled on this system". The documented fix is to allow locally written scripts for the current user (`Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`).
- The most common failure: `pip install requests` succeeded inside the environment, but the editor runs a different Python, so `import requests` raises `ModuleNotFoundError`. Select the `.venv` interpreter in the editor. Spyder also needs `spyder-kernels` installed in that environment before it can use it.
- If `pip freeze` prints a very long list, the environment was not active and it listed the global pile.
- `pip freeze` lists packages that `requests` pulled in, not only `requests`. That is normal, and the assignment says the versions will differ.
- Do not commit the `.venv` folder. Commit `requirements.txt` and add `.venv/` to `.gitignore`.
- On some systems (recent Debian, Ubuntu, and Homebrew Python), installing into the system Python is blocked with an "externally managed environment" error. That error is a good reason to use an environment.

**Mini-project, Defensive CSV Reader**
- A row with too few columns does not raise. `DictReader` fills the missing value with `None`, so `float(None)` raises `TypeError`, which `except ValueError` does not catch. If any data row has fewer than three fields, the program crashes unless the student also handles `TypeError`. Open the data file and look.
- A row with too many columns stores the extras as a list under the key `None`. The assignment's hint says to test `if None in row` before the `try`. That test only works if it runs before the code that reads `row["amount"]`.
- `KeyError` normally never fires with `DictReader`; it would only appear if a header were misspelled. The assignment asks for the clause anyway, so a student who sees it never run has not made a mistake.
- The sample line `could not convert '' to float` is not what Python's own message says (`could not convert string to float: ''`). Students build their own text from the bad value, for example with `!r`. Check the rubric before telling anyone their wording is wrong.
- Row numbers count records, not file lines. `DictReader` skips blank lines, so a blank line in the file does not get a row number. `enumerate(reader, start=1)` is the numbering the assignment asks for.
- Use a separate variable for the collected rows and for the loop variable. Reusing `row` for both overwrites the data.
- Money is shown with two decimals and a dollar sign, as in `$12.50`. An f-string format of `.2f` does that.

**Video reflection and mindset**
- Syntax error versus runtime error: a bug story from this week works well, such as a missing parenthesis versus a `ValueError` on bad input.
- Row by row, not around the whole loop: one bad row would stop the whole run and lose every good row after it. Compare with `repair_total_weight`.
- The mindset assignment this week is Problem Solving. It asks whether a student already has a process and what they learned from watching classmates solve problems differently. The error-handling lesson is a good example of a process: reproduce, read the message, shrink the problem, fix one thing.

**Reminders to read aloud**
- Registration for next term's classes runs November 12 to 25. This is the last week and the only chance before May 2027. The course page has the registration link, and Mary Alice Moore is the contact on Slack if registration fails.
- The weekly quiz is on AIRHub under Cohorts, then the week's lesson, then Start Quiz.
- Submission: merge last week's pull request, run `git pull origin main`, branch `assignment-8`, work inside `week-8/assignment-8/`, and submit the pull request URL (ending in `/pull/` and a number) plus the video link.

Keep the graded Week 8 assignment out of the live code-along and public reference. The independent packet uses cooler logs, deliveries, and order tickets only.
