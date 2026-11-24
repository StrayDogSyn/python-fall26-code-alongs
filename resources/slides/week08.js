/* Week 8 Errors and Debugging. Rebuild with python resources/slides/build.py. */
window.GLOSSARY.push(...window.WEEK07_GLOSSARY, ...window.WEEK08_GLOSSARY);
window.DECK = {
  title: "Python Intro, Week 8: Errors and Debugging",
  terms: {
    review: ["variable", "function", "parse", "exception", "dictionary", "stack", "with_block", "csv_file", "dict_reader", "working_directory"],
    fresh: ["runtime_error", "traceback", "try_except", "guard_clause", "defensive_programming", "log_level", "assertion", "venv", "package", "requirements_file"]
  },
  slides: [
    {
      title: "Errors and Debugging",
      html: `<p class="kicker">Fall 26 · Week 8 · LP 08A</p><h1>Errors &amp; Debugging</h1><p class="lead">Every program so far assumed the cooler thermometer would be readable. Tonight the thermometer breaks, and the program keeps cooking.</p><p><a href="../lp08a-errors-and-debugging/README.md">Lesson packet</a> · <a href="../lp08a-errors-and-debugging/week08-walkthrough.md">Text walkthrough</a> · <a href="../lp08a-errors-and-debugging/run-of-show.md">Session plan</a> · <a href="../lp08a-errors-and-debugging/leetcode-valid-parentheses.md">LeetCode warm-up</a></p>`,
      notes: { timing: "3 min", talking: "Today's files come from a restaurant kitchen: a cooler log, deliveries, and order tickets. They are not the graded assignment files. Ask who is blocked on the assignment, then promise the session ends with time for it. Mention that registration closes November 25.", question: "What happens to a program the moment a line fails? It stops, and everything after it never runs.", failure: "If students paste their own assignment code into chat, steer them to the kitchen examples.", action: "Ask learners to say the word exception out loud and give one example they have already seen." }
    },
    {
      title: "Two kinds of error, and how to read one",
      companions: ["runtime_error", "traceback"],
      html: `<h2>Two kinds of error, and how to read one</h2><pre class="out">Traceback (most recent call last):
  File "log.py", line 3, in &lt;module&gt;
    temp = int("38.5")
ValueError: invalid literal for int() with base 10: '38.5'</pre><p>A <strong>syntax error</strong> means Python cannot read the program, so nothing runs. A <strong>runtime error</strong> means it started, then one line met one bad input. Read the traceback <strong>bottom first</strong>: the last line is the error type and message, and the line above it is where.</p><p>Six you will meet: <code>ValueError</code>, <code>TypeError</code>, <code>KeyError</code>, <code>IndexError</code>, <code>FileNotFoundError</code>, <code>ZeroDivisionError</code>.</p><details class="reveal"><summary>Predict: which error does int(None) raise?</summary><div><code>TypeError</code>. The type is wrong (None is not text or a number). <code>ValueError</code> is for the right type with the wrong content, like <code>int("twelve")</code>.</div></details>`,
      notes: { timing: "6 min", talking: "Run the code-along section 1 so the class sees one syntax error and six runtime errors. Read one traceback bottom first, out loud, then say where the line is.", question: "Which line of a traceback do you read first? The last one.", failure: "If learners panic at a long traceback, show that only the last line names the problem.", action: "Ask the room to say runtime error and traceback, then read one aloud." }
    },
    {
      title: "try, except, else, finally",
      companions: ["try_except"],
      html: `<h2>try, except, else, finally</h2><pre class="cmd"><code>def read_temp(text):
    try:
        value = float(text)
    except ValueError:
        value = None
    else:
        print("parsed fine")
    finally:
        print("always runs")
    return value</code></pre><p><code>try</code> holds the line that can fail. <code>except</code> handles one named failure. <code>else</code> runs only if nothing failed. <code>finally</code> runs every time, and is the place for cleanup.</p><details class="reveal"><summary>Predict what prints for "n/a"</summary><div>Only <code>always runs</code>. The <code>except</code> ran, so <code>else</code> was skipped. For <code>"38.5"</code> both <code>parsed fine</code> and <code>always runs</code> print.</div></details>`,
      notes: { timing: "7 min", talking: "I Do. Run code-along section 2, which prints a trail of the blocks visited. Keep the try block to one line and say why.", question: "Does finally only run after an error? No, it runs every time.", failure: "If learners put ten lines in the try, ask which line they expect to fail and move the rest out.", action: "Ask learners to name the four blocks in order and what each one is for." }
    },
    {
      title: "Catch the failure you expect",
      companions: [],
      html: `<h2>Catch the failure you expect</h2><pre class="cmd"><code>def sloppy_qty(text):
    try:
        return int(txt)      # typo
    except Exception:
        return 0

sloppy_qty("12")</code></pre><p>The function returns <code>0</code> and nothing complains. The typo raised <code>NameError</code>, and <code>except Exception</code> swallowed it. A bare <code>except:</code> is worse: it also catches Ctrl+C. Name the one exception you expect, and let everything else show.</p><details class="reveal"><summary>Predict: what should int(None) do inside a function that only expects bad text?</summary><div>Raise <code>TypeError</code>. Passing <code>None</code> is a bug in the caller, and a loud failure is how you find it.</div></details>`,
      notes: { timing: "6 min", talking: "Run code-along section 3. Let the class find the typo before you reveal it. Say the rule plainly: catch what you expect, nothing else.", question: "Why is a wrong answer worse than a crash? You do not know it is wrong.", failure: "If learners say always use except Exception to be safe, show the swallowed typo again.", action: "Ask learners to say specific exception and explain it in one sentence." }
    },
    {
      title: "We Do: repair the catch-all",
      companions: [],
      html: `<h2>We Do: repair the catch-all</h2><pre class="cmd"><code>def repair_parse_qty(text):
    try:
        return int(text)
    except:
        return 0</code></pre><p>Open <code>practice.py</code>, remove the TODO line, and run the check. One input fails. Find it before you read on.</p><details class="reveal"><summary>Predict which input fails, and the fix</summary><div><code>None</code>: the function returns <code>0</code> when it should raise <code>TypeError</code>. Catch only <code>ValueError</code>. Do not widen it to a tuple that includes <code>TypeError</code>, because that makes the same mistake again.</div></details>`,
      notes: { timing: "6 min", talking: "Let the class diagnose it from the check output, not from the code. The nudge in the failure message points at the answer.", question: "Which exception does int of oops raise? ValueError.", failure: "If learners fix it with except Exception, rerun the check and read the failure aloud.", action: "Ask learners to explain the fix as catch less, not more." }
    },
    {
      title: "as e and raise",
      companions: [],
      html: `<h2>as e and raise</h2><pre class="cmd"><code>try:
    int("12.5")
except ValueError as error:
    print(error)

def pick_portion(guests):
    if guests &lt; 1:
        raise ValueError(f"guests must be at least 1, got {guests}")
    return 120 * guests</code></pre><p><code>as error</code> names the error so you can use its message. <code>raise</code> lets you signal a problem yourself, with a message that helps the next reader. A bare <code>raise</code> inside an <code>except</code> passes the original error along unchanged.</p><details class="reveal"><summary>Predict: after a bare raise, does the caller see the error?</summary><div>Yes. You can leave a note, then still stop. The traceback stays intact.</div></details>`,
      notes: { timing: "6 min", talking: "Show the message as data: print it, put it in an f-string, read its type name. Then raise your own with the bad value inside the message.", question: "Why put the bad value in the message? So the next reader can see what went wrong.", failure: "If learners confuse raise with return, trace what the caller receives in each case.", action: "Ask learners to write one raise line for a rule from their own assignment." }
    },
    {
      title: "Guard clauses",
      companions: ["guard_clause", "defensive_programming"],
      html: `<h2>Guard clauses</h2><pre class="cmd"><code>def label(reading):
    if reading is None:
        return "missing"
    if reading &lt;= 0:
        return "check sensor"
    if reading &gt; 41:
        return "warm"
    return "ok"</code></pre><p><strong>Defensive programming</strong> means checking input before you use it. A guard clause handles each bad case first and returns early, so the good path reads straight down instead of nesting three levels. The nested version and this one give identical answers.</p><details class="reveal"><summary>Predict: label(None)</summary><div><code>"missing"</code>. Without the first guard, <code>None &lt;= 0</code> would raise <code>TypeError</code>.</div></details>`,
      notes: { timing: "6 min", talking: "Show label_nested and label_guarded from the code-along side by side. Print both lists and prove they match.", question: "Where does the good path live in a guarded function? At the bottom, with no extra indent.", failure: "If learners nest anyway, ask them to flip one condition and return early.", action: "Ask learners to say guard clause and early return in the same sentence." }
    },
    {
      title: "Failing loudly versus silently",
      companions: [],
      html: `<h2>Failing loudly versus silently</h2><pre class="cmd"><code>items = ["Corn", "Ramen"]
items[-1]              # no error
float("nan")           # no error</code></pre><p>The worst bugs raise nothing. A negative index wraps around to the end instead of failing. <code>float("nan")</code> converts without complaint, so an unreadable thermometer can slip a bad number into an average. When a quiet wrong answer is possible, a guard clause or an explicit check has to stop it, because <code>try/except</code> never fires.</p><details class="reveal"><summary>Predict: does ["Corn", "Ramen"][-1] raise?</summary><div>No. It returns <code>"Ramen"</code>. If a negative index is a mistake in your program, only your own check will notice. <code>math.isfinite</code> answers the <code>nan</code> question.</div></details><p>Check cheaply when you can. Catch when the check costs as much as the work, or when things can change between the check and the use.</p>`,
      notes: { timing: "5 min", talking: "Run both lines live. Ask the class which exercise in the packet protects against each one. Then give the check-versus-catch rule.", question: "Which is more dangerous, a crash or a quiet wrong answer? The quiet one.", failure: "If learners think try/except covers everything, show the negative index passing straight through.", action: "Ask learners to say fail loudly and describe one silent failure they now know about." }
    },
    {
      title: "Put the try inside the loop",
      companions: [],
      html: `<h2>Put the try inside the loop</h2><pre class="cmd"><code>total = 0.0
for text in ["5", "oops", "7"]:
    try:
        total += float(text)
    except ValueError:
        continue</code></pre><p>With the <code>try</code> wrapped around the whole loop, the first bad entry jumps out and the good entries after it are lost. With the <code>try</code> inside, each entry is guarded on its own and one bad item only skips itself. This is the pattern for any list of messy rows.</p><details class="reveal"><summary>Predict the total, inside versus around the loop</summary><div>Inside: <code>12.0</code>. Around the whole loop: <code>5.0</code>, because the loop ended at <code>"oops"</code>. Open <code>repair_total_weight</code> and fix it.</div></details>`,
      notes: { timing: "6 min", talking: "We Do. Run the starter and watch it return 5.0. Move the try inside the loop together and rerun the check.", question: "Why does it matter where the try sits? It decides how much work one bad item can destroy.", failure: "If learners add continue and pass both, say either works and ask which they would explain to a reviewer.", action: "Ask learners to say row by row and tie it to the video reflection question." }
    },
    {
      title: "What DictReader does with a ragged row",
      companions: [],
      html: `<h2>What DictReader does with a ragged row</h2><pre class="out">header: name,qty,unit
Butter,3            -> {'name': 'Butter', 'qty': '3', 'unit': None}
Salt,1,lbs,extra    -> {'name': 'Salt', 'qty': '1', 'unit': 'lbs', None: ['extra']}</pre><p><code>DictReader</code> does not raise on a wrong number of fields. A <strong>short row</strong> gets <code>None</code> for the missing value, so <code>int(None)</code> raises <code>TypeError</code>, not <code>ValueError</code>. A <strong>long row</strong> files the extras as a list under the key <code>None</code>, so <code>None in row</code> is the test. Blank lines are skipped, so a row number counts records, not file lines.</p><details class="reveal"><summary>Predict: what is row["unit"] for the Butter row?</summary><div><code>None</code>, not an empty string. Catching only <code>ValueError</code> will let a short row crash the program.</div></details>`,
      notes: { timing: "5 min", talking: "Show the in-memory sample from code-along section 7, not a student's assignment file. Read each printed dictionary aloud.", question: "Which error does a short row cause when you convert? TypeError, because the value is None.", failure: "If learners ask whether this is their assignment, say the packet uses its own sample and they should open their own data file and look.", action: "Ask learners to say None key and None value and where each one appears." }
    },
    {
      title: "Fail gracefully: logging and assert",
      companions: ["log_level", "assertion"],
      html: `<h2>Fail gracefully: logging and assert</h2><pre class="cmd"><code>import logging
logger = logging.getLogger("kitchen")

logger.debug("walk-in door opened")
logger.info("cooler check started")
logger.warning("reading 45.0 is above 41")
logger.error("sensor 3 did not answer")

assert guests &gt; 0, "guests must be positive"</code></pre><p>Graceful means a safe default plus a record of what happened. Four levels: <code>DEBUG</code> (developer detail), <code>INFO</code> (normal events), <code>WARNING</code> (odd but survivable), <code>ERROR</code> (a failure). A handler set to <code>INFO</code> hides the <code>DEBUG</code> line without deleting it.</p><p><code>assert</code> is a tripwire for you while you build. Python run with <code>-O</code> removes it, so never use it to check what a user typed.</p><details class="reveal"><summary>Predict: at level INFO, which messages print?</summary><div><code>INFO</code>, <code>WARNING</code>, and <code>ERROR</code>. <code>DEBUG</code> is below the level, so it is hidden.</div></details>`,
      notes: { timing: "7 min", talking: "Run code-along section 8 and watch the debug line disappear. Show the missing-log case returning None with an ERROR line. Then trip the assert and explain why it is not input validation.", question: "Which level for a warm cooler, and which for a dead sensor? Warning, then error.", failure: "If learners print instead of log, show that print cannot be filtered or turned down.", action: "Ask learners to say log level and name the four levels in order." }
    },
    {
      title: "pip and virtual environments",
      companions: ["venv", "package", "requirements_file"],
      html: `<h2>pip and virtual environments</h2><pre class="cmd"><code>python -m venv .venv
<span class="os-win">.venv\\Scripts\\activate</span><span class="os-mac">source .venv/bin/activate</span>
pip install requests
pip freeze &gt; requirements.txt
pip install -r requirements.txt</code></pre><p>pip installs <strong>packages</strong> from PyPI. Install everything into one global Python and every project shares one pile, so two projects that need different versions cannot both be happy. A virtual environment is a private folder with its own Python and its own pile. <code>requirements.txt</code> records exactly what is installed, so someone else can rebuild it.</p><p>Commit <code>requirements.txt</code>. Do not commit the <code>.venv</code> folder; list <code>.venv/</code> in <code>.gitignore</code>.</p><details class="reveal"><summary>Predict: the install worked, but import fails in the editor</summary><div>The editor is running a different Python. Select the <code>.venv</code> interpreter in the editor. A long <code>pip freeze</code> list means the environment was not active.</div></details>`,
      notes: { timing: "7 min", talking: "Conceptual, with the code-along section 10 check of sys.prefix. Show the prompt prefix after activation. Say why the global pile causes trouble before the commands. Mention that the course reflection asks them to show their own setup.", question: "Why commit requirements.txt but not .venv? The text file rebuilds the folder, and the folder is large and machine-specific.", failure: "If PowerShell blocks the activate script, allow local scripts for the current user and retry. If the import fails after install, check which interpreter the editor uses.", action: "Ask learners to say virtual environment, package, and requirements file in one sentence." }
    },
    {
      title: "Match the vocabulary",
      html: `<h2>Match the vocabulary</h2><p>Pair each term with its meaning before you run the check.</p><div data-match="w8"></div>`,
      notes: { timing: "3 min", talking: "Let learners work in pairs, then read one pairing aloud with an example from today.", question: "Which pairing was hardest to decide? Return to the slide where that term appeared.", failure: "If two terms blur, trace one example of each side by side.", action: "Ask each learner to use one term in a sentence." }
    },
    {
      title: "Run the local check",
      html: `<h2>Run the local check</h2><p>From the repository root, replace one TODO, then run:</p><pre class="cmd"><code>python lp08a-errors-and-debugging/check.py</code></pre><p>Each of eleven exercises gets <code>PASS</code>, <code>FAIL</code> with an input and nudge, or <code>NOT STARTED</code>. Open <a href="../lp08a-errors-and-debugging/hints.md">hints.md</a> one level at a time.</p><details class="reveal"><summary>Predict the untouched starter result</summary><div>Eleven <code>NOT STARTED</code> lines. Choose a Warm-up or Fix it before a Build exercise. Students blocked on the graded work can use the session-plan checklist instead.</div></details>`,
      notes: { timing: "10 min", talking: "You Do: let students choose one kitchen task and run its check. Remind them the check builds its own temporary files, so nothing real is touched. Circulate to anyone stuck on the graded assignment.", question: "What does NOT STARTED mean? The function still raises its TODO.", failure: "If the command cannot find check.py, return to the repository root.", action: "Ask each student to explain one test input before editing." }
    },
    {
      title: "Optional: LeetCode 20, Valid Parentheses",
      html: `<h2>Optional: LeetCode 20, Valid Parentheses</h2><p>The first draft crashes on purpose, and the crash is this week's lesson.</p><pre class="cmd"><code>[].pop()      # IndexError: pop from empty list

isValid(")")  # what should this return?</code></pre><p>Solve it with a stack. Then fix the empty-stack case two ways, a guard clause and a <code>try/except IndexError</code>, and decide which one a stranger reads faster. See the <a href="../lp08a-errors-and-debugging/leetcode-valid-parentheses.md">class walkthrough</a>.</p><details class="reveal"><summary>Predict: isValid("(((")</summary><div><code>False</code>. The loop ends without any error, yet three openers were never closed. A quiet wrong answer is possible here, so the last line has to check the stack is empty.</div></details>`,
      notes: { timing: "20 min, optional", talking: "Use the walkthrough file. Run the first draft on a closer-first string and read the traceback bottom first. Fix it with the guard, then with the try, and compare.", question: "Which fix would you rather read in a month, and why? Usually the guard, because it is shorter here.", failure: "If time is short, assign it as practice and open the next session with the two-fix comparison.", action: "Ask learners to submit their solution in the cohort channel." }
    },
    {
      title: "Week 8 check",
      html: `<h2>Week 8 check</h2><div data-quiz="w8"></div><p>Use the <a href="../lp08a-errors-and-debugging/week08-walkthrough.md">text walkthrough</a> to revisit a trace. Try the packet before reading its reference answers.</p>`,
      notes: { timing: "7 min", talking: "Ask for a reason after every quiz choice, then close with one prediction, observed result, and explanation. Remind the class to take the AIRHub quiz and about registration.", question: "Which idea still needs another example: specific exceptions, guard clauses, logging, or environments?", failure: "If interaction is unavailable, read the question and choices aloud.", action: "Collect one explanation of why except Exception is risky and one use of a guard clause." }
    }
  ],
  quizzes: { w8: [
    { q: "What is the difference between a syntax error and a runtime error?", options: [{ text: "A syntax error stops the program before it runs; a runtime error happens while it runs", correct: true }, { text: "A runtime error stops the program before it runs" }, { text: "There is no difference" }], why: "Python cannot start a program it cannot read. A runtime error appears later, on one line with one input." },
    { q: "Which line of a traceback names the error?", options: [{ text: "The last line", correct: true }, { text: "The first line" }, { text: "The line in the middle" }], why: "Read bottom first: the last line is the error type and message, and the line above shows where." },
    { q: "When does a finally block run?", options: [{ text: "Every time, error or not", correct: true }, { text: "Only after an error" }, { text: "Only when nothing fails" }], why: "finally is for cleanup that must always happen. else is the block that runs only when nothing failed." },
    { q: "Why is except Exception risky?", options: [{ text: "It can swallow a bug, like a typo, and hide a wrong answer", correct: true }, { text: "It is slower" }, { text: "It only works on files" }], why: "Catch the one failure you expect so everything else still shows up loudly." },
    { q: "What does int(None) raise?", options: [{ text: "TypeError", correct: true }, { text: "ValueError" }, { text: "IndexError" }], why: "ValueError is the right type with the wrong content, like int(\"twelve\"). None is the wrong type." },
    { q: "Why put the try inside a loop over messy rows?", options: [{ text: "So one bad row only skips itself", correct: true }, { text: "It runs faster" }, { text: "Python requires it" }], why: "A try around the whole loop ends the loop at the first bad row and loses every good row after it." },
    { q: "A CSV row has too few fields. What does DictReader put for the missing value?", options: [{ text: "None", correct: true }, { text: "An empty string" }, { text: "It raises KeyError" }], why: "float(None) then raises TypeError, so catching only ValueError is not enough." },
    { q: "Which log level fits a cooler that is warm but still running?", options: [{ text: "WARNING", correct: true }, { text: "DEBUG" }, { text: "ERROR" }], why: "WARNING is for something odd but survivable. ERROR is for a failure." },
    { q: "What does requirements.txt do?", options: [{ text: "Lists the exact packages so someone else can rebuild the environment", correct: true }, { text: "Installs Python" }, { text: "Hides your code" }], why: "Commit requirements.txt, not the .venv folder. pip install -r requirements.txt rebuilds it." }
  ] },
  matches: { w8: [
      { term: "Traceback", meaning: "The report Python prints when an error stops the program" },
      { term: "Guard clause", meaning: "An early return that handles a bad case first" },
      { term: "Virtual environment", meaning: "A private folder with its own Python and packages" },
      { term: "Log level", meaning: "A label that says how serious a message is" },
      { term: "requirements.txt", meaning: "A file listing the exact packages a project needs" }
  ] }
};
