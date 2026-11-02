# Week 5 live session: More Python Skills

**Monday, November 2, 2026, 8:00 PM Eastern.** This run of show uses the [LP 03 packet](README.md). Open [code-along.py](code-along.py) and [practice.py](practice.py) before students arrive. Keep [solutions.py](solutions.py) closed until the independent attempt. The text route is [notebook-source.md](notebook-source.md).

| Time (ET) | Instructor action | Learner evidence |
| --- | --- | --- |
| 8:00–8:05 | Welcome and recap: a function takes inputs and returns a value. State today's four ideas. | Chat: one prediction about `Gradebook()` and `self.scores`. |
| 8:05–8:25 | I Do: trace `Gradebook`, the averages dictionary, the passing list, and `describe`. Run `python lp03-more-python-skills/code-along.py` after each prediction. | Predicted average for Maya (`78.0`), Luis (`63.5`), and Ari (`None`). |
| 8:25–8:40 | We Do: add a `Tally` method in a scratch copy, then change `make_checker(70)` to `make_checker(65)`. Ask which names pass before running. | A learner names the changed line and predicts `Maya` only at 65. |
| 8:40–9:00 | You Do, part 1: start `Tally` and `long_words` in `practice.py`. Run after each TODO is replaced. | One passing assertion and one explanation of `self` or the comprehension filter. |
| 9:00–9:15 | You Do, part 2: implement `make_multiplier` and `count_calls`. Offer one hint at a time. | Explain what `factor` remembers and why `shout.calls` becomes `2`. |
| 9:15–9:25 | Compare approaches with `solutions.py`, then ask the exit check. | Explain the wrapper call order and one closure value. |

## Presenter checkpoints

- Start from the repository root. On Windows PowerShell, `python` works on the instructor's machine; use `py` if another Windows installation needs it. On macOS or Linux, use `python3` if needed.
- The code-along prints a wrapper message before `Maya: 78.0`. A second `Gradebook()` would start with its own empty `scores` dictionary.
- `make_checker(65)` still excludes Luis, whose average is `63.5`. At `60`, Luis would pass.
- The practice starter's `NotImplementedError` is expected. Each TODO becomes a smaller checkpoint; do not show the solution before learners have tried it.
- If time runs short, finish classes and comprehensions live. Use the text source and practice file for decorators and closures after class.

**Remote route:** Pause the recording at each prediction. Read the same code in the source, run it locally, then write “I predicted ___; Python showed ___; the line that explains it is ___.”
