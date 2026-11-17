# Week 7 run of show | 90 minutes

| Time | Phase | Plan | Failure to plan for |
| --- | --- | --- | --- |
| 0 to 10 min | Check-in | Ask what a program has known so far (typed-in values, `input()`) and what it could know if it could open a file. Name the graded warmups only as "your assignment", without solving them. | Students paste their own assignment code into chat; steer them to this packet's kitchen files instead. |
| 10 to 25 min | I Do | Run sections 1 and 2 of the code-along. Predict `Lines read` versus `kept`, then show `a` versus `w` on a temporary file. | Opening in `w` mode "just to look" erases a real file; say it plainly, then show the recovery plan: version control. |
| 25 to 40 min | We Do | Trace `csv.reader` versus `csv.DictReader` on `prep.csv`. Show that every value is text, then convert `qty` and total by station. Repair `repair_total_qty` together. | A blank cell becomes `''` and `int('')` raises `ValueError`; show `value or 0` and say why a blank is falsey. |
| 40 to 55 min | We Do | Section 5: split a CSV line by hand and watch `Fries, large` break into two pieces. Then read it with `csv`. State the decision rule out loud. | Students conclude "never write your own"; the rule is to import for solved problems and write your own to learn or to fit a tiny special case. |
| 55 to 70 min | I Do, then pair | `os.path.join`, `os.path.exists`, and the working-directory trap: run the script from two folders and compare. Then `datetime`: `strptime`, `timedelta`, `strftime`. | A relative path such as `../data/file.csv` fails with `FileNotFoundError` when python starts from another folder; print `os.getcwd()` before changing anything. |
| 70 to 83 min | You Do | Pick a Warm-up or Fix it, run `python lp07a-text-data-and-modules/check.py`, then try a Build exercise. | A TODO traceback is mistaken for a broken check; `NOT STARTED` names the next function to edit. |
| 83 to 90 min | Exit check | Answer the deck quiz and explain what `with` does and why `w` is dangerous. Close with the LeetCode warm-up as optional practice. | If a learner answers from memory, ask them to predict a new file read before revealing it. |

## Optional second half: LeetCode 819 (20 to 25 minutes)

Use [leetcode-most-common-word.md](leetcode-most-common-word.md). It fits after the exit check or as the first block of the next session. It repeats the Week 6 habit (clean text inside a function) and ends on the import-or-write-it question.

## Mentor heads-up for the graded Week 7 work

These are common stumbling blocks. None of them gives away an answer.

- **Working directory.** The assignment tells students to reach data files with a `../data/` path from their working folder. That path only works when the terminal or IDE starts python inside the assignment folder. If a student runs the file from the repository root, or presses Run in an editor that sets another folder, they see `FileNotFoundError`. The fix is to check `os.getcwd()` first.
- **Text encoding.** One report line in the mini-project contains a typographic dash. Open the output file with `encoding="utf-8"` so that character is written the same way on every machine.
- **Strings from CSV.** Every value arrives as text. Arithmetic on text either concatenates or raises `TypeError`.
- **Dates.** `strftime` pads day numbers with a leading zero by default, which matches a two-digit day format. Check the example in the instructions against what the program prints on a day such as the 4th.
- **Closing files.** A student who writes `open(...)` without `with` and without `close()` may see an empty output file until the program ends.
- **Debugging mindset.** The weekly reflection asks about debugging. A bug story from this week, such as an empty file after opening in `w` mode, makes a good answer.

Keep the graded Week 7 assignment out of the live code-along and public reference. The independent packet uses shift log, prep list, and order ticket scenarios only.
