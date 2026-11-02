# Week 5 live session: More Python Skills

**Monday, November 2, 2026, 8:00 PM Eastern.** This run of show uses the [LP 03 packet](README.md). Open [code-along.py](code-along.py) and [practice.py](practice.py) before students arrive. Keep [solutions.py](solutions.py) closed until the independent attempt. The text route is [notebook-source.md](notebook-source.md).

| Time (ET) | Instructor action | Learner evidence |
| --- | --- | --- |
| 8:00–8:05 | Welcome and recap: a function takes inputs and returns a value. State today's four ideas. | Chat: one prediction about `Gradebook()` and `self.scores`. |
| 8:05–8:25 | I Do: trace `Gradebook`, both comprehensions, the decorated call, the stack list, and the counter. Run `python lp03-more-python-skills/code-along.py` after each prediction. | Predict Maya's average (`78.0`), the stack top, and the counter's next value. |
| 8:25–8:40 | We Do: add a `Tally` method in a scratch copy, then change `make_checker(70)` to `make_checker(65)`. Ask which names pass before running. | A learner names the changed line and predicts `Maya` only at 65. |
| 8:40–9:00 | You Do, part 1: start the Warm-up and Fix it exercises in `practice.py`. Run `python lp03-more-python-skills/check.py` after each TODO. | One `PASS` or `FAIL` line and an explanation of its nudge. |
| 9:00–9:15 | You Do, part 2: choose a Build exercise, then outline the `Gradebook` report. Offer one hint level at a time. | Explain what a closure remembers and how to order the report. |
| 9:15–9:25 | Ask the exit check and assign unfinished exercises and the mini project for independent work. | Explain the wrapper call order and the use of `@property`. |

## Presenter checkpoints

- Start from the repository root. On Windows PowerShell, `python` works on the instructor's machine; use `py` if another Windows installation needs it. On macOS or Linux, use `python3` if needed.
- The code-along prints a wrapper message before `Maya: 78.0`. A second `Gradebook()` would start with its own empty `scores` dictionary.
- `make_checker(65)` still excludes Luis, whose average is `63.5`. At `60`, Luis would pass.
- The untouched starter reports ten `NOT STARTED` lines. A `FAIL` line shows the input, expected value, actual value, and a nudge. Keep the reference closed until learners attempt the task.
- If time runs short, assign the remaining Build exercises and Gradebook as independent practice. Use the text source and hints for review after class.

**Remote route:** Pause the recording at each prediction. Read the same code in the source, run it locally, then write “I predicted ___; Python showed ___; the line that explains it is ___.”
