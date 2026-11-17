/* Week 7 Text Data and Modules. Rebuild with python resources/slides/build.py. */
window.GLOSSARY.push(...window.WEEK07_GLOSSARY);
window.DECK = {
  title: "Python Intro, Week 7: Text Data and Modules",
  terms: {
    review: ["variable", "list", "dictionary", "function", "path", "encoding", "parse"],
    fresh: ["file_handle", "with_block", "file_mode", "csv_file", "dict_reader", "module", "import_statement", "standard_library", "working_directory", "datetime"]
  },
  slides: [
    {
      title: "Text Data and Modules",
      html: `<p class="kicker">Fall 26 · Week 7 · LP 07A</p><h1>Text Data &amp; Modules</h1><p class="lead">Until now your programs only knew what you typed. Today they learn to read the shift log.</p><p><a href="../lp07a-text-data-and-modules/README.md">Lesson packet</a> · <a href="../lp07a-text-data-and-modules/week07-walkthrough.md">Text walkthrough</a> · <a href="../lp07a-text-data-and-modules/run-of-show.md">Session plan</a> · <a href="../lp07a-text-data-and-modules/leetcode-most-common-word.md">LeetCode warm-up</a></p>`,
      notes: { timing: "3 min", talking: "Today's files come from a restaurant kitchen: a shift log, a prep list, and order tickets. They are not the graded assignment files. Ask for predictions before revealing output.", question: "What could a program do if it could open a file?", failure: "If learners start discussing the graded assignment, return to this packet's kitchen files.", action: "Ask each learner to name one real file they would like Python to read." }
    },
    {
      title: "Open it, then let it close itself",
      companions: ["file_handle", "with_block"],
      html: `<h2>Open it, then let it close itself</h2><pre class="cmd"><code>with open("shift_log.txt", encoding="utf-8") as handle:
    lines = handle.readlines()

print(len(lines))</code></pre><p><code>open()</code> gives you a file handle. A <code>with</code> block closes it when the block ends, even if your code crashes. Think of the walk-in cooler: whoever opens the door has to shut it.</p><details class="reveal"><summary>Predict what happens to the handle after the block</summary><div>It is closed. You still have <code>lines</code>, because the list lives in your program, not in the file. That is why you do your reading inside the block and your thinking after it.</div></details>`,
      notes: { timing: "7 min", talking: "I Do. Open the file once with a with block. Say the encoding out loud. Point at the indent: the handle only works inside it.", question: "Why use with instead of open and close? It closes the file even when an error interrupts the code.", failure: "If learners try to read after the block, show the ValueError for a closed file and move the read inside.", action: "Ask learners to say what lines holds after the block ends." }
    },
    {
      title: "Line by line, then strip",
      companions: ["parse"],
      html: `<h2>Line by line, then strip</h2><pre class="cmd"><code>kept = []
with open("shift_log.txt", encoding="utf-8") as handle:
    for raw in handle:
        line = raw.strip()
        if line and not line.startswith("#"):
            kept.append(line)</code></pre><p>Each <code>raw</code> line ends with a newline, and some have stray spaces. <code>strip()</code> removes both. An empty string is falsey, so <code>if line</code> skips blank lines.</p><details class="reveal"><summary>Predict: 9 lines in the file, 4 blank or comments</summary><div>5 lines are kept. The code-along prints <code>Lines read: 9, kept: 5</code>.</div></details>`,
      notes: { timing: "8 min", talking: "Loop over the handle itself instead of readlines when you can. Strip first, then decide. Reuse the truthiness idea from Week 3.", question: "Why strip before testing for a comment? A line with leading spaces would hide its # otherwise.", failure: "If learners print raw lines and see blank gaps, point at the newline each line carries.", action: "Ask learners to add a second comment marker and rerun." }
    },
    {
      title: "Three modes, three promises",
      companions: ["file_mode"],
      html: `<h2>Three modes, three promises</h2><pre class="cmd"><code>open(path, "r")   # read, file must exist
open(path, "a")   # add to the end, create if missing
open(path, "w")   # start fresh, wipes what was there</code></pre><p>Mode <code>w</code> is a save slot with no backup. It empties the file the instant it opens, before you write a character.</p><details class="reveal"><summary>Predict the final file: write first, append second, write third</summary><div>Only <code>third</code>. The last <code>w</code> wiped the earlier lines. Run section 2 of the code-along to watch it happen on a temporary file.</div></details>`,
      notes: { timing: "8 min", talking: "Use a temporary file so nothing real is at risk. Show a, then w. Say the danger plainly: no warning, no undo.", question: "Which mode would you use to add one line to a log? a.", failure: "If learners open a real file in w mode to look at it, explain recovery: version control and backups.", action: "Ask which mode a nightly script that runs twice should use, and why." }
    },
    {
      title: "We Do: the loop that wipes its own file",
      companions: [],
      html: `<h2>We Do: the loop that wipes its own file</h2><pre class="cmd"><code>def save_lines(path, lines):
    for line in lines:
        with open(path, "w") as handle:
            handle.write(line + "\\n")</code></pre><p>The function runs without an error, and the file holds one line. Find the bug before you read on.</p><details class="reveal"><summary>Predict what the file holds after saving a, b, c</summary><div>Only <code>c</code>. Every pass reopened the file in <code>w</code> mode and emptied it. Open once, loop inside the block. The practice exercise <code>repair_save_lines</code> asks for this repair.</div></details>`,
      notes: { timing: "8 min", talking: "Let the class diagnose it first. Trace the file contents after each pass on the board.", question: "How many times is the file opened? Once per line.", failure: "If learners switch to a mode and get duplicates on a rerun, show that a keeps old content and w replaces it once.", action: "Ask learners to say the repaired structure in one sentence: open once, loop inside." }
    },
    {
      title: "CSV: lists or dictionaries",
      companions: ["csv_file", "dict_reader"],
      html: `<h2>CSV: lists or dictionaries</h2><pre class="cmd"><code>import csv

with open("prep.csv", newline="", encoding="utf-8") as handle:
    rows = list(csv.DictReader(handle))

print(rows[0])
print(type(rows[0]["qty"]))</code></pre><p><code>csv.reader</code> gives lists. <code>csv.DictReader</code> uses the header row as keys, so the code reads <code>row["qty"]</code> instead of column 3. Open CSV files with <code>newline=""</code>.</p><details class="reveal"><summary>Predict the type of the qty value</summary><div><code>&lt;class 'str'&gt;</code>. Every CSV value is text, including numbers. <code>"4" + "6"</code> is <code>"46"</code>, not 10.</div></details>`,
      notes: { timing: "9 min", talking: "Show reader and DictReader side by side on the same file. Land on the fact that everything is a string.", question: "What does adding two numeric strings do? It joins them.", failure: "If learners forget newline, mention blank rows on Windows and move on.", action: "Ask which version they would rather read in a month, and why." }
    },
    {
      title: "Rows to a list of dictionaries, then questions",
      companions: [],
      html: `<h2>Rows to a list of dictionaries, then questions</h2><pre class="cmd"><code>prep = []
for row in rows:
    prep.append({
        "station": row["station"],
        "item": row["item"],
        "qty": int(row["qty"] or 0),
    })

totals = {}
for row in prep:
    totals[row["station"]] = totals.get(row["station"], 0) + row["qty"]</code></pre><p>Read, convert, then ask questions. A blank cell is an empty string, which is falsey, so <code>or 0</code> supplies a fallback. The tally is the same pattern as Week 5.</p><details class="reveal"><summary>Predict the Grill total and the whole total</summary><div>Grill is <code>30</code> (12 plus 18). All stations together make <code>45</code>. Saute is <code>3</code> because the blank butter quantity counted as 0.</div></details>`,
      notes: { timing: "9 min", talking: "I Do the conversion, then We Do the totals. Connect the dictionary tally to the accumulator from Week 5.", question: "Why does int of an empty string fail without or 0? An empty string is not a number.", failure: "If learners get a ValueError on the blank cell, print the row and look at the quantity.", action: "Ask learners to predict the total for one more station before running." }
    },
    {
      title: "Write it yourself, or import it?",
      companions: ["module"],
      html: `<h2>Write it yourself, or import it?</h2><pre class="cmd"><code>line = '102,7,"Fries, large",1,4.25'

line.split(",")          # by hand
next(csv.reader([line])) # csv module</code></pre><p>A comma inside a quoted field breaks the hand-written split. The <code>csv</code> module already met that case, fixed it, and tested it.</p><details class="reveal"><summary>Predict how many pieces each approach finds</summary><div>6 pieces by hand, 5 fields from <code>csv</code>. Rule of thumb: import when the problem is solved and the edge cases are many; write it yourself when it is tiny or when you are learning what the tool does.</div></details>`,
      notes: { timing: "8 min", talking: "Break the hand-written split on purpose. Then state the decision rule. The weekly reflection asks for one real decision, so give them a model.", question: "When is writing your own the better call? When the task is tiny or you are learning how the tool works.", failure: "If learners conclude to never write their own, say that the first time by hand teaches what the module does.", action: "Ask learners to name one past task where they would now import instead." }
    },
    {
      title: "Exploring a module",
      companions: ["import_statement", "standard_library"],
      html: `<h2>Exploring a module</h2><pre class="cmd"><code>import os

dir(os.path)           # what is in here?
help(os.path.join)     # what does this one do?</code></pre><p><code>import</code> brings a module's tools into your program. The standard library ships with Python, so there is nothing to install: <code>csv</code>, <code>os</code>, <code>datetime</code>, <code>re</code>, <code>collections</code>. Check it first, then the Python docs at docs.python.org, before you reach for a package or write your own.</p><details class="reveal"><summary>Predict: what does help(os.path.join) show?</summary><div>A short description of the function and how it combines path pieces. Reading it is the skill. Nobody memorizes a library; they learn to look things up quickly.</div></details>`,
      notes: { timing: "6 min", talking: "Show dir and help live, then open the docs page for os.path. Name the three tiers: standard library, third-party packages, your own code.", question: "Where do you look before installing a package? The standard library docs.", failure: "If the output of dir is overwhelming, filter it by eye for names starting with e or j.", action: "Ask each learner to look up one function in os.path and say what it returns." }
    },
    {
      title: "Two import styles, and vetting a package",
      companions: [],
      html: `<h2>Two import styles, and vetting a package</h2><pre class="cmd"><code>import math          # call math.sqrt(16)
from math import sqrt  # call sqrt(16)</code></pre><p><code>import x</code> keeps the origin visible. <code>from x import y</code> is shorter, but two modules can define the same name and the later import wins quietly. Both are fine; pick one and stay consistent.</p><p>Before you install a package that is not in the standard library, ask five questions: Is it already in the standard library? Is it maintained (recent release, open issues answered)? Do people use it (downloads, stars, other projects)? Is the license and documentation clear? Can you read what it does? Install it in a virtual environment and check the exact name, because look-alike names exist.</p><details class="reveal"><summary>Predict: which style protects you from a name collision?</summary><div><code>import math</code>, because every call is written <code>math.something</code>. A package that fails the five questions is a good reason to write your own small version instead.</div></details>`,
      notes: { timing: "7 min", talking: "Show both import styles on one line of math. Then walk the five-question checklist on a real package page. Connect it to the weekly reflection about import versus write your own.", question: "Which question would stop you from installing a package? Unmaintained, unclear license, or a name that looks like another package.", failure: "If learners treat popular as safe, point out that the name check and the maintenance check still apply.", action: "Ask learners to pick one package they have heard of and answer the five questions in the cohort channel." }
    },
    {
      title: "os, paths, and the working directory trap",
      companions: ["working_directory", "path"],
      html: `<h2>os, paths, and the working directory trap</h2><pre class="cmd"><code>import os

os.path.join("..", "data", "prep.csv")
os.path.exists("../data/prep.csv")
os.getcwd()</code></pre><p><code>join</code> picks the right slash for your computer. <code>exists</code> answers yes or no without crashing. A relative path like <code>../data/prep.csv</code> is measured from the <strong>working directory</strong>, the folder where you started python, not from the folder the script lives in.</p><details class="reveal"><summary>Predict: the file exists, but you get FileNotFoundError</summary><div>You started python from a different folder. Print <code>os.getcwd()</code> before you change anything. The code-along builds its paths from <code>__file__</code>, so it works from any folder.</div></details>`,
      notes: { timing: "9 min", talking: "Run the code-along from the repo root, then from another folder. Show getcwd. This is the most common Week 7 failure, so spend the time.", question: "Which folder is ../data measured from? The working directory.", failure: "If an IDE runs the script from a different folder, show the run configuration or run from the terminal.", action: "Ask learners to print getcwd in their own scripts before they close the laptop." }
    },
    {
      title: "datetime: parse, add, format",
      companions: ["datetime"],
      html: `<h2>datetime: parse, add, format</h2><pre class="cmd"><code>from datetime import datetime, timedelta

service = datetime.strptime("2026-11-29", "%Y-%m-%d")
later = service + timedelta(days=3)
print(later.strftime("%Y-%m-%d"))</code></pre><p><code>strptime</code> parses text into a date. <code>timedelta</code> is a span you can add. <code>strftime</code> formats a date back into text. Month ends and leap days are handled for you.</p><details class="reveal"><summary>Predict the printed date</summary><div><code>2026-12-02</code>. Try <code>2028-02-28</code> plus two days to see a leap day appear without any special code.</div></details>`,
      notes: { timing: "8 min", talking: "Say the mnemonic: p is for parse (text to date), f is for format (date to text). Show a month rollover.", question: "Which function turns text into a date? strptime.", failure: "If the format codes feel arbitrary, keep the table of %Y %m %d visible while they type.", action: "Ask learners to format today's date two different ways." }
    },
    {
      title: "Writing a CSV",
      companions: [],
      html: `<h2>Writing a CSV</h2><pre class="cmd"><code>with open("summary.csv", "w", newline="", encoding="utf-8") as handle:
    writer = csv.DictWriter(handle, fieldnames=["station", "total"])
    writer.writeheader()
    for station, total in totals.items():
        writer.writerow({"station": station, "total": total})</code></pre><p>Name the columns, write the header, then write one row per dictionary. Open the file with <code>"w"</code> and <code>newline=""</code> so Windows does not add blank lines.</p><p><code>csv.writer</code> is the list version: <code>csv.writer(handle).writerow(["Grill", 30])</code>. You keep the column order straight yourself, so <code>DictWriter</code> is safer when a file has many columns.</p><details class="reveal"><summary>Predict the line count for 4 stations</summary><div>5 lines: one header and four rows. Read it back with <code>DictReader</code> to prove it round-trips.</div></details>`,
      notes: { timing: "8 min", talking: "Mirror the reader. Write, then read the result back to prove it. Mention the w danger again.", question: "What does writeheader do? It writes the column names as the first row.", failure: "If learners see doubled line breaks, add newline and rerun.", action: "Ask learners to add a third column and update the dictionary keys." }
    },
    {
      title: "Run the local check",
      html: `<h2>Run the local check</h2><p>From the repository root, replace one TODO, then run:</p><pre class="cmd"><code>python lp07a-text-data-and-modules/check.py</code></pre><p>Each of eleven exercises gets <code>PASS</code>, <code>FAIL</code> with an input and nudge, or <code>NOT STARTED</code>. Open <a href="../lp07a-text-data-and-modules/hints.md">hints.md</a> one level at a time.</p><details class="reveal"><summary>Predict the untouched starter result</summary><div>Eleven <code>NOT STARTED</code> lines. Choose a Warm-up or Fix it before a Build exercise.</div></details>`,
      notes: { timing: "8 min", talking: "You Do: let students choose one kitchen file task and run its check. Remind them the check builds its own temporary files, so nothing real is touched.", question: "What does NOT STARTED mean? The function still raises its TODO.", failure: "If the command cannot find check.py, return to the repository root.", action: "Ask each student to explain one test input before editing." }
    },
    {
      title: "Optional: LeetCode 819, Most Common Word",
      html: `<h2>Optional: LeetCode 819, Most Common Word</h2><p>Messy text in, one winner out. It is a text-data problem in miniature, and it asks the Week 7 question at the end.</p><pre class="cmd"><code>paragraph = "Ramen!? ramen; RAMEN, fries. Fries."
banned = ["fries"]</code></pre><p>Solve it by hand first with a character loop and a dictionary tally. Then compare with <code>re</code> and <code>collections.Counter</code>. See the <a href="../lp07a-text-data-and-modules/leetcode-most-common-word.md">class walkthrough</a>.</p><details class="reveal"><summary>Predict the answer</summary><div><code>ramen</code>. Three ramen beats the one fries that remains, and fries is banned anyway. Case and punctuation do not matter.</div></details>`,
      notes: { timing: "15 min, optional", talking: "Use the walkthrough file. Build the character loop live, add the banned set, then reveal the stdlib version and count the lines it replaces.", question: "Why did we add a space to the end of the paragraph? So the last word gets counted.", failure: "If time is short, assign it as practice and open the next session with the stdlib comparison.", action: "Ask learners to submit their solution in the cohort channel." }
    },
    {
      title: "Week 7 check",
      html: `<h2>Week 7 check</h2><div data-quiz="w7"></div><p>Use the <a href="../lp07a-text-data-and-modules/week07-walkthrough.md">text walkthrough</a> to revisit a trace. Try the packet before reading its reference answers.</p>`,
      notes: { timing: "8 min", talking: "Ask for a reason after every quiz choice, then close with one prediction, observed result, and explanation.", question: "Which idea still needs another example: modes, CSV types, paths, or import versus write?", failure: "If interaction is unavailable, read the question and choices aloud.", action: "Collect one explanation of with and one decision about import versus write." }
    }
  ],
  quizzes: { w7: [
    { q: "What does a with block do for a file?", options: [{ text: "Closes it when the block ends", correct: true }, { text: "Deletes it" }, { text: "Converts it to CSV" }], why: "The block closes the file automatically, even if an error interrupts the code." },
    { q: "Which mode wipes the file the moment it opens?", options: [{ text: "w", correct: true }, { text: "a" }, { text: "r" }], why: "Mode w starts a new empty file; a adds to the end." },
    { q: "What type is a number read by csv.DictReader?", options: [{ text: "A string", correct: true }, { text: "An int" }, { text: "A float" }], why: "Every CSV value arrives as text and needs int() or float() before math." },
    { q: "Why does int(row[\"qty\"]) fail on a blank cell?", options: [{ text: "An empty string is not a number", correct: true }, { text: "int only works on floats" }, { text: "DictReader hides blank cells" }], why: "Use int(value or 0) when a blank should count as zero." },
    { q: "Why use the csv module instead of split(\",\")?", options: [{ text: "It handles commas inside quoted fields", correct: true }, { text: "It is always shorter" }, { text: "split cannot read files" }], why: "A quoted comma splits a hand-written line into the wrong pieces." },
    { q: "A relative path is measured from where?", options: [{ text: "The working directory", correct: true }, { text: "The folder holding the script" }, { text: "The desktop" }], why: "os.getcwd() shows the folder python considers current." },
    { q: "Which datetime function parses text into a date?", options: [{ text: "strptime", correct: true }, { text: "strftime" }, { text: "timedelta" }], why: "p is for parse, f is for format, and timedelta is a span of time." },
    { q: "Which is a good check before installing an outside package?", options: [{ text: "Whether it is maintained and already in the standard library", correct: true }, { text: "Whether its name is short" }, { text: "Whether it has a logo" }], why: "Check the standard library first, then maintenance, usage, license, documentation, and the exact package name." },
    { q: "When is writing your own code the better call?", options: [{ text: "When the task is tiny or you are learning how the tool works", correct: true }, { text: "Never" }, { text: "Whenever a module exists" }], why: "Import for solved, edge-case-heavy problems; write your own to learn or for tiny special cases." }
  ] }
};
