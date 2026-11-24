# Graded-assignment overlap list

Purpose: public solutions in this repository must never solve a Code the Dream graded task. Check every new public exercise and every `solutions.py` against this list before you add it. This is a paraphrase made on November 2, 2026 from the course pages, not a copy. Hunter or Claude re-read the portal if a wording question matters.

Rule: a practice exercise may use the same **skill** as a graded task. It may not use the same **problem**, the same **function name and signature**, or the same **scenario**. If a student could paste your solution into their assignment and pass, the exercise is too close.

## Week 3, Control Flow (graded)

- Four warmups: grading text for score ranges, grouping ages into categories, a Boolean expression practice sheet, and a number sign and parity check.
- Mini-project: Day Planner (an `input()` driven decision script).
- Avoid: letter grades from scores, age bands, sign or odd/even classification, daily planners.

## Week 5, Iteration and Algorithms (graded)

- Warmups: add up a numeric range with `for`; keep asking with `while` until a positive whole number arrives; find a value in a list by looping, without `.index()` or `in`; the classic fizz and buzz counting printout.
- Mini-project: Number Cruncher, a menu loop offering minimum, maximum, search, and bubble sort, with no built-in `min`, `max`, `sorted`, or `.sort()`.
- Avoid: first-match linear search without built-ins, positive-integer input validation, the fizz/buzz printout, a summing exercise over 1 to 100, and any menu program covering min, max, search, and bubble sort.
- Already handled: PR #14 replaced the practice `linear_search` with `last_match_search`.

## Week 6, Functions and Scope (graded, due November 10)

Four warmups, each a separate file:

1. **Default parameters.** A greeting function `greet(name, greeting="Hello")` that prints, then three calls: name only, name plus custom greeting, greeting as a keyword argument.
2. **Return values.** Two temperature converters, Celsius to Fahrenheit and the reverse, called with a few values and printed with f-strings rounded to one decimal.
3. **Scope.** One file showing a function-local variable failing with `NameError` outside the function (error pasted in a comment), then fixing it with `return` and assignment.
4. **Validation function.** `is_valid_score(score)` returns whether an integer is from 0 to 100 inclusive; the script reads input, converts with `int()`, and prints one of two messages.

Mini-project: **refactor the Number Cruncher.** A new file with `find_min`, `find_max`, `search(numbers, target)` (returns an index or -1 and does not print), `bubble_sort` (returns a new list, input unchanged), `show_menu()` (prints options and returns the choice), and `main()` (the loop that dispatches and prints "Found at index" or "Not found"). No logic outside functions except the data list and the call to `main()`.

Avoid in public solutions:

- Function names `greet`, `celsius_to_fahrenheit`, `fahrenheit_to_celsius`, `is_valid_score`, `find_min`, `find_max`, `search`, `bubble_sort`, `show_menu`, and `main` used for these jobs.
- Any temperature converter, any 0 to 100 score validator, any greeting with a default, any menu dispatcher over min, max, search, and sort.
- A scope demo that is only "local variable raises NameError, then return it" with the same shape.
- A full refactor of a Week 5 style menu script.

Safe Week 6 ideas that teach the same skills with different problems:

| Skill | Different problem |
| --- | --- |
| Defaults and keyword arguments | `shipping_label(city, country="USA", express=False)`, `box_volume(length, width, height=1)` |
| Return versus print | `price_with_tax(price, rate=0.07)` and a caller that prints; a `Fix it` where the function prints but should return |
| Scope | A counter bug where a function assigns to a name that exists globally; `Fix it` with an `UnboundLocalError`; shadowing a built-in name by accident |
| Validation | `is_valid_username(text)` (length and allowed characters), `is_valid_time(hour, minute)` |
| Refactoring | A given 25 line script about a library fine or parking fee, split into three named functions with the same output; the check runs both versions on the same inputs |
| Docstrings | Write the docstring for a given function; the check reads `__doc__` for a first-line summary |

## Week 7, Text Data and Modules (graded, due November 17)

Paraphrased on November 16, 2026 from the course page text Hunter supplied. Four warmups, each a separate file, using sample data files in a `data` folder next to the assignment folder:

1. **Numbered lines.** Open `notes.txt` with a `with` block, read it line by line, strip the newline, and print each line with a line number.
2. **DictReader.** Read `students.csv` (name, subject, score) with `csv.DictReader` and print each student's name and score on one line.
3. **The os module.** One script that prints the working directory, reports whether `expenses.csv` exists, and builds the path to it from its parts with `os.path.join`.
4. **datetime.** Print today's date as a sentence with the month spelled out, using `datetime.now()` and `strftime`.

Mini-project: **Expense Report Generator.** Check that `expenses.csv` exists before opening it, and stop with a message if it does not. Read it with `DictReader` (columns date, category, description, amount), convert `amount` to float, keep only the rows whose category is Food, total them, and write `food_report.txt`: a heading line that includes the generated date, one line per expense showing its date and amount, and a last line with the total to two decimals. Optional: make the category a variable and write a report for any category.

Avoid in public solutions:

- A script or function that reads a notes file and prints numbered lines, or that reads a student file and prints name and score.
- An exists check plus `os.path.join` on a file named `expenses.csv`, or any script whose only job is to print the working directory, an exists message, and a joined path.
- A "Today is Month DD, YYYY" sentence built from `datetime.now()`.
- Any category-filtered expense report with a generated-date heading, a date and amount line per row, and a Total line, and any generalization of it to another category.
- The file names `notes.txt`, `students.csv`, `expenses.csv`, `food_report.txt` and the column names date, category, description, amount used together.

Safe Week 7 ideas that teach the same skills with different problems (the shipped packet `lp07a-text-data-and-modules` uses these):

| Skill | Different problem | Packet exercise |
| --- | --- | --- |
| `with` and line-by-line reading | Return the non-blank, non-comment lines of a shift log | `read_clean_lines`, `longest_line` |
| Modes `a` and `w` | Append a note; repair a loop that wipes its file | `append_note`, `repair_save_lines` |
| `DictReader` and types | Sum a prep list's quantity column; load rows into dicts | `repair_total_qty`, `load_prep` |
| Grouping a list of dicts | Total quantity per kitchen station | `totals_by_station` |
| `DictWriter` | Write a station summary CSV | `write_prep_report` |
| Parsing a line | Split a pipe-separated order ticket into a dict | `parse_ticket_line` |
| `os` and `os.path` | Return the first existing path from a list of names | `first_existing` |
| `datetime` | List consecutive ISO dates with `timedelta` | `shift_dates` |

Checked on November 16, 2026: none of the packet's function names, signatures, data files, or scenarios match the graded list above. The packet's date exercise uses ISO dates and `timedelta`, not a month-name sentence from `now()`. The packet's CSV files are `prep.csv` and `tickets.csv`, not the graded file names.

## Week 8, Errors and Debugging (graded, due November 24)

Paraphrased on November 23, 2026 from the course page text Hunter supplied. Four warmups, each a separate file, using sample data in a `data` folder next to the assignment folder:

1. **Validate numeric input.** A loop asks for a number. Text that cannot be converted raises `ValueError`, which `try/except` catches; the program prints a message and asks again. A valid number is printed (as a float) and the loop stops.
2. **Safe division.** Ask for two numbers, divide the first by the second, and catch `ZeroDivisionError` to print a friendly message instead of crashing. A normal division prints the equation and result.
3. **Missing file.** Open `../data/missing.txt` (which does not exist), catch `FileNotFoundError`, and print a helpful message that names the file instead of a traceback.
4. **Virtual environment.** Create a virtual environment, install `requests`, generate `requirements.txt` with `pip freeze`, and write a short script that imports `requests` and prints its version, with the `requirements.txt` contents pasted as a comment at the top.

Mini-project: **Defensive CSV Reader.** Read `messy_data.csv` (fields name, category, amount; some rows have missing values, non-numeric amounts, or extra columns) with `csv.DictReader`. Wrap the file open in `try/except FileNotFoundError` and stop with a message if missing. Process each row inside `try/except`, catching at least `ValueError` (amount not a float) and `KeyError` (included even if it never runs). Guard extra columns with `if None in row` before the `try`. Collect parsed rows as a list of dictionaries, number rows with `enumerate(reader, start=1)`, and print a summary: rows attempted, rows parsed, rows skipped, a list of skipped rows with a reason each, and the clean data as `name | category | $amount`.

Mindset: Problem Solving (a process, plus what the student learned from classmates' approaches).

Avoid in public solutions:

- A loop that reads typed input with `input()`, converts with `float()`, catches `ValueError`, and repeats until valid, and any function shaped as "ask until a number parses".
- A script that asks for two numbers and divides them with a `ZeroDivisionError` message, and any `divide(a, b)` whose point is a friendly division-by-zero message.
- A script that opens `missing.txt` (or any single named file) and prints a message from a `FileNotFoundError` handler.
- A script that imports `requests`, prints `requests.__version__`, or carries a pasted `requirements.txt` comment.
- A `csv.DictReader` loop over a name, category, amount file that tries `float(row["amount"])` per row, checks `None in row`, collects parsed rows, and prints an "attempted, parsed, skipped" report with row numbers and reasons, or the `name | category | $amount` clean-data lines.
- The file names `messy_data.csv` and `missing.txt`, or the column names name, category, amount used together.

Safe Week 8 ideas that teach the same skills with different problems (the shipped packet `lp08a-errors-and-debugging` uses these):

| Skill | Different problem | Packet exercise |
| --- | --- | --- |
| `try/except ValueError` | Turn thermometer text into a finite float or `None` | `parse_temp` |
| `ZeroDivisionError` | Average of readings, `None` for an empty list | `average_temp` |
| `IndexError` and a guard clause | Read a ticket field by position with a default | `ticket_field` |
| Specific versus broad `except` | Repair a bare `except` that hides `None` | `repair_parse_qty` |
| `try` inside the loop | Repair a total that stops at the first bad entry | `repair_total_weight` |
| Validating input | List the problems with a delivery record | `delivery_problems` |
| `FileNotFoundError` as a return value, bad-line numbers | Read a pipe-separated cooler log from a text file | `read_cooler_log` |
| `logging` levels | Log a cooler reading as INFO, WARNING, or ERROR | `log_reading` |
| `raise` | Parse an order ticket line and raise a `ValueError` naming the field | `parse_ticket_strict` |
| `except ... as error` per item | Collect good tickets and numbered error strings | `collect_tickets` |
| Retry and re-raise | Retry an action on `ConnectionError` only | `call_with_retries` |

Checked on November 23, 2026: none of the packet's function names, signatures, data files, or scenarios match the graded list above. The two closest are `read_cooler_log` (defensive per-line reading and bad-line numbers, but a pipe-separated text file, no `DictReader`, no `None in row` guard, a returned dictionary instead of a printed report, and a different file and fields) and `collect_tickets` (per-item `try/except ValueError` with numbered errors, but in-memory strings, a tuple result, and no printed summary). The code-along's `DictReader` demo uses an in-memory ragged sample to show what `None` keys and values look like; it is not a reader program and has no summary. The packet's data file is `cooler_log.txt`, not the graded file names. The graded data file `messy_data.csv` was not available when this was checked.

## Week 9, External Libraries and APIs (graded, due December 1)

Paraphrased November 23, 2026 from the complete course and assignment text Hunter supplied. The actual sample_countries.json and authenticated service response were not supplied or fetched.

Warmups:
1. Fetch an Agify prediction for a named person and print the HTTP status and full decoded response.
2. From that same prediction, print name and age and use a missing birthday field with a fallback.
3. Fetch the Europe region from REST Countries v5 with a Bearer key, navigate data.objects and names.common, and print only the first ten names.
4. Catch Requests RequestException around a deliberately failing public URL; reject non-200 statuses before decoding.

Mini-project: Country Explorer CLI. Fetch the country dataset once, normalize name/capital/region/population, search names by case-insensitive substring, filter by region and sort population descending, display a missing-capital fallback, and stop with a useful error if the initial request fails. Do not publish this fetch-and-menu program or its component functions in the same country scenario.

The assignment requires an environment-held REST Countries key and a Bearer header. Its lesson overview also mentions keyless practice; flag this discrepancy rather than promising the graded country endpoint is keyless. Requested names.common and the displayed sample's names.official differ; capitals in the sample are a list of objects. Inspect the student's actual sample and service docs before assuming a field layout. The stated monthly allowance belongs to the assignment text, not a verified dashboard quota.

Avoid public solutions using Agify person predictions, name/age/birthday extraction, the REST Countries country endpoints, the exact country wrapper and fields, an arbitrary-failing-URL warmup script, or a country-search/region-sort menu with name/capital/region/population output. General Requests, JSON, query, authentication, and exception concepts remain necessary teaching material.

Supplemental packet comparison:

| Signature | Distinct problem |
| --- | --- |
| decode_object(text) | Validate a supplied JSON object's root without a network call |
| status_group(code) | Classify a supplied status code, not a request-and-print script |
| ticket_titles(payload) | Kitchen ticket schema, ordered duplicate dish labels |
| repair_available(rows) | Actual Boolean availability versus truthy text |
| repair_fetch(fetch, url, params) | Injected callable keyword contract and timeout |
| api_headers(key) | Generic trimmed header builder, no environment setup or country call |
| next_page(payload) | Validate a kitchen-board continuation field |
| request_object(fetch, url, params) | Injected response contract and typed failure, no arbitrary failing live URL |
| safe_board(fetch, url) | Kitchen results with distinct failure reasons, no country CLI |
| merge_tickets(pages) | Deduplicate already validated tickets by ID without a menu |
| destination_city(paths) | Directed city-pair chain reasoning, no country attributes or API |

The code-along additionally projects invented nested kitchen orders into clean dictionaries. Its optional public demo reads only this course's public GitHub repository metadata. It does not use Agify, the country APIs, country parsing, a search/filter menu, or the graded failing URL. The optional loopback API uses only invented local records. Compared by function signatures, fields, outputs, and scenarios against the supplied assignment; no copyable graded warmup or mini-project solution was found.

## Weeks 10 and 11

Final-project assignment text not read. Read it before building a final-project packet.

## Process

1. Before adding an exercise, list its function name, signature, and scenario. Compare with this file.
2. Put the comparison in the pull request description in one line per exercise.
3. If you are unsure, change the scenario. Cost: a few minutes. Cost of a leaked solution: a graded student submission.
