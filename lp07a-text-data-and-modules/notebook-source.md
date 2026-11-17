# LP 07A | Text Data & Modules | Fall 26

This is source text Hunter can add to the cohort Gemini Notebook. No upload or generated Notebook artifact is claimed. The packet uses a restaurant kitchen's shift log, prep list, and order tickets so public reference code does not solve the graded Week 7 work.

## Learning targets

Open a text file with `with`, read it line by line, strip each line, choose among the modes `r`, `w`, and `a`, read a CSV with `csv.reader` and `csv.DictReader`, convert text values to numbers, build a list of dictionaries, write a CSV with `csv.DictWriter`, build and test paths with `os.path`, parse and format dates with `datetime`, and decide when to import a module versus write the code yourself.

## 1. A file handle needs closing

`with open(path, encoding="utf-8") as handle:` opens a file and closes it when the block ends, even if an error occurs. Reading `for raw in handle` yields one line at a time, newline included, so `strip()` is usually the first step. **Predict:** If a log has 9 physical lines and 4 are blank or comments, how many are kept after stripping and filtering?

## 2. Modes

Mode `r` reads, mode `a` appends and creates a missing file, and mode `w` replaces the whole file the moment it opens. A loop that reopens the file in `w` mode on every pass keeps only the last line. **Predict:** What does a file contain after write `first`, append `second`, then write `third`?

## 3. CSV rows and headers

`csv.reader` yields lists. `csv.DictReader` yields dictionaries keyed by the header row. Every value is a string. Open CSV files with `newline=""`. **Predict:** What is the type of `row["qty"]`? What does adding two numeric-looking strings do?

## 4. A list of dictionaries

Read rows, convert the fields you need, then filter and group. A blank cell is an empty string, which is falsey, so `int(value or 0)` supplies a fallback. A dictionary tally uses the group name as the key and a running total as the value. **Predict:** What are the Grill and Saute totals in `prep.csv`?

## 5. Import or write your own

A hand-written comma split breaks when a field contains a comma. The `csv` module handles quoting, so it is the better tool for real CSV data. Write your own code when the problem is tiny or when you are learning how the tool works. Check the standard library first, then third-party packages, and treat unknown packages with care. **Predict:** How many fields does `102,7,"Fries, large",1,4.25` have for `split(",")` and for `csv`?

## 6. Paths with `os`

`os.path.join` builds a path with the correct separator. `os.path.exists` tests for a path without raising an error. A relative path is measured from the working directory (`os.getcwd()`), not from the script's own folder. **Predict:** Which folder does `../data` start from?

## 7. Dates with `datetime`

`strptime` parses text into a datetime, `timedelta` adds a span, and `strftime` formats the result. **Predict:** What is `2026-11-29` plus three days?

## 8. Writing CSV

`csv.DictWriter(handle, fieldnames=[...])` with `writeheader()` and `writerow()` writes a CSV. Use `newline=""` when opening the output file. **Predict:** How many lines does a three-row summary have with its header?

## 9. A tally with `Counter`

`collections.Counter` counts items. The hand-written dictionary tally and `Counter` give the same result, so the module is a time saver after you understand the pattern. **Predict:** Does the dictionary version match `Counter` on the same words?

## Check yourself

1. Explain what a `with` block does for a file.
2. Name the difference between modes `a` and `w`.
3. Explain why a value read from a CSV needs `int()` before arithmetic.
4. Give one reason to use the `csv` module instead of `split(",")`.
5. Explain why `../data/file.csv` can fail even when the file exists.
