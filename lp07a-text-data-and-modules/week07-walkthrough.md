# Week 7 catch-up | Text Data & Modules

Use this after class or beside the slides. Predict before each run, then compare with `python lp07a-text-data-and-modules/code-along.py`. The examples use a restaurant kitchen's shift log, prep list, and order tickets, not the graded assignment.

## 1. A file is a door; `with` closes it for you

`open(path)` hands you a file handle. Think of the walk-in cooler: whoever opens the door has to shut it, or the whole shift pays for it. A `with` block shuts the door automatically, even when your code crashes halfway through. Reading line by line (`for raw in handle`) gives you each line with its newline attached, so `strip()` is the first move. **Predict:** The log has 9 physical lines, but 4 of them are blank or comments. How many lines survive `strip()` plus the filter?

## 2. Three modes, three promises

| Mode | Promise | Danger |
| --- | --- | --- |
| `r` | Read only. The file must exist. | None. |
| `a` | Add to the end. Create the file if it is missing. | Duplicates when a script runs twice. |
| `w` | Start a brand new file. | Wipes what was there the moment it opens. |

Mode `w` is a save slot with no backup. In a game you notice the moment you overwrite your best run. In Python nothing warns you. **Predict:** A file holds `first`, you append `second`, then you open it with `w` and write `third`. What is in the file at the end?

## 3. CSV rows: lists or dictionaries

`csv.reader` gives each row as a list, so you remember that column 2 is the quantity. `csv.DictReader` uses the header row as keys, so you write `row["qty"]` and the code explains itself. Always open CSV files with `newline=""`. Every value comes back as text, even the numbers. **Predict:** What is `type(row["qty"])`? What does `"4" + "6"` give?

## 4. Turn rows into a list of dictionaries, then ask questions

The pattern is the same one data people use all day: read, convert the types you need, then filter, group, and total. A blank cell is the empty string, which is falsey, so `int(value or 0)` handles it. Grouping uses a dictionary where the group name is the key and the running total is the value, exactly like the tally in Week 5. **Predict:** For `prep.csv`, what are the totals for `Grill` and `Saute`?

## 5. Write it yourself, or import it?

Splitting a CSV line on commas works until a field contains a comma. The ticket `102,7,"Fries, large",1,4.25` splits into six pieces by hand and five fields with the `csv` module. This is the real answer to "why import?": someone already met this edge case, wrote the fix, and tested it. A good rule:

- Import when the problem is already solved and the edge cases are many (CSV quoting, dates, paths).
- Write it yourself when the problem is tiny, when you are learning how the tool works, or when the tool would hide the thing you need to see.
- Check the standard library before you reach for a package. `csv`, `os`, `datetime`, `re`, and `collections` ship with Python.

**Predict:** How many fields does `"Fries, large"` count as to `csv`? To `split(",")`?

## 6. Paths: `os`, `os.path`, and the working directory

`os.path.join("..", "data", "prep.csv")` builds a path with the right slash for the computer it runs on. `os.path.exists(path)` answers yes or no without crashing. The trap: a relative path such as `../data/prep.csv` is measured from the folder where you started python, which `os.getcwd()` reports, not from the folder where the script file lives. When you see `FileNotFoundError`, print `os.getcwd()` before you change anything. **Predict:** Run the code-along from the repository root, then from another folder. Does the output change? (This packet builds its paths from `__file__`, so it does not.)

## 7. Dates: parse, do math, format

`datetime.strptime("2026-11-29", "%Y-%m-%d")` turns text into a date. `timedelta(days=3)` is a span you can add. `strftime("%a %d %b %Y")` turns a date back into text. Months, year ends, and leap days are handled for you, which is the best argument for importing instead of rolling your own calendar. **Predict:** What date is three days after 2026-11-29? How many days from then to Christmas?

## 8. Writing a CSV

`csv.DictWriter` takes `fieldnames`, writes a header with `writeheader()`, and writes one row per `writerow`. Open the file with `"w"` and `newline=""`. Without `newline=""`, Windows can print a blank line after every row. **Predict:** If you summarize three stations, how many lines does the file have, counting the header?

`csv.writer` is the list version: `csv.writer(handle).writerow(["Grill", 30])` writes values in the order you give them, so you keep the column order straight. `DictWriter` matches by name, which is safer when a file has many columns. **Predict:** what does `writer.writerow(["Grill", 30])` put on the line?

## 8b. Two import styles

`import math` means every call reads `math.sqrt(16)`, so the origin stays visible. `from math import sqrt` lets you write `sqrt(16)`, which is shorter, but two modules can define the same name and the later import wins without a warning. **Predict:** which style protects you from a name collision?

## 8c. Vetting a package that is not in the standard library

Ask five questions before you install one: Is it already in the standard library? Is it maintained (a recent release, open issues answered)? Do people use it? Is the license and documentation clear? Can you read what it does? Install in a virtual environment, and check the exact package name because look-alike names exist. A package that fails these questions is a good reason to write your own small version. **Predict:** which question would stop you?

## 9. `Counter` is a dictionary that learned to count

`by_hand[word] = by_hand.get(word, 0) + 1` and `Counter(words)` give the same tally. The hand-written version teaches you the pattern. The module version saves you the typing once you own the pattern. **Predict:** Does `dict(counted) == by_hand` print `True`?

## Run the local check

Start with a Warm-up or Fix it task in [practice.py](practice.py), run `python lp07a-text-data-and-modules/check.py`, and open [hints.md](hints.md) only as needed. A `NOT STARTED` line points to a TODO, while a `FAIL` line names the input and expected result. When you want more reps, the [LeetCode warm-up](leetcode-most-common-word.md) is a text-data problem in miniature.

**Exit check:** Explain what `with open(...) as f:` does and why Python uses it. Explain why every CSV value arrives as text. Give one case where you would import a module and one where you would write the code yourself.
