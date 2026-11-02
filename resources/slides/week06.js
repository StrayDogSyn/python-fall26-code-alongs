/* Week 6 Functions and Scope. Rebuild with python resources/slides/build.py. */
window.GLOSSARY.push(...window.WEEK06_GLOSSARY);
window.DECK = {
  title: "Python Intro, Week 6: Functions and Scope",
  terms: {
    review: ["function", "variable", "condition", "list"],
    fresh: ["parameter", "argument", "default", "keyword_argument", "return_value", "scope", "shadowing", "docstring", "refactor", "closure"]
  },
  slides: [
    {
      title: "Functions and Scope",
      html: `<p class="kicker">Fall 26 · Week 6 · LP 06A</p><h1>Functions &amp; Scope</h1><p class="lead">Give a small job a name, return its result, and know which names it can see.</p><p><a href="../lp06a-functions-and-scope/README.md">Lesson packet</a> · <a href="../lp06a-functions-and-scope/week06-walkthrough.md">Text walkthrough</a> · <a href="../lp06a-functions-and-scope/run-of-show.md">Session plan</a></p>`,
      notes: { timing: "3 min", talking: "This packet uses event and library text, not the graded assignment. Ask for predictions before revealing output.", question: "What repeated job in last week's work could have a name?", failure: "If learners start discussing the graded refactor, return to these separate examples.", action: "Name parameters, return values, scope, and refactoring." }
    },
    {
      title: "Define, call, return",
      companions: ["function", "parameter", "argument", "return_value"],
      html: `<h2>Define, call, return</h2><pre class="cmd"><code>def shelf_tag(title, shelf):
    """Return a short tag for a library book."""
    return f"{shelf}: {title}"

tag = shelf_tag("Night Sky", "Science")</code></pre><p><code>title</code> and <code>shelf</code> are parameters. The two strings in the call are arguments. <code>return</code> gives the caller a value.</p><details class="reveal"><summary>Predict tag</summary><div><code>Science: Night Sky</code>. The function does not print by itself.</div></details>`,
      notes: { timing: "7 min", talking: "Point to definition, parameters, call, arguments, and returned value in that order.", question: "What value is stored in tag? Science: Night Sky.", failure: "If students think defining runs the body, point to the later call line.", action: "Ask what one missing argument would cause." }
    },
    {
      title: "Defaults and named choices",
      companions: ["default", "keyword_argument"],
      html: `<h2>Defaults and named choices</h2><pre class="cmd"><code>def postcard(city, stamp="standard"):
    return f"{city} / {stamp}"

postcard("Detroit")
postcard("Detroit", stamp="express")</code></pre><p>A default is used only when that argument is omitted. A keyword argument names the choice at the call site.</p><details class="reveal"><summary>Predict both results</summary><div><code>Detroit / standard</code> and <code>Detroit / express</code>. An explicitly empty stamp would stay empty.</div></details>`,
      notes: { timing: "8 min", talking: "Contrast omitted and supplied arguments; do not treat an empty string as omitted.", question: "Which call uses the default? The first.", failure: "If learners think keyword arguments change the definition, keep the two lines side by side.", action: "Ask for a call that chooses priority postage." }
    },
    {
      title: "A printed line is not a return",
      companions: ["return_value"],
      html: `<h2>A printed line is not a return</h2><pre class="cmd"><code>def announce_tag(title):
    print("Announced:", title)

result = announce_tag("Field Guide")
print(result)</code></pre><p>Printing changes the terminal. Returning hands a value to the caller so it can store, combine, or display it later.</p><details class="reveal"><summary>Predict both printed lines</summary><div><code>Announced: Field Guide</code>, then <code>None</code>. This function has no return statement.</div></details>`,
      notes: { timing: "9 min", talking: "Store the call result visibly. We Do: inspect the print-only starter in repair_price_line without completing it for students.", question: "Why is result None when the first line looks right? Print does not return text.", failure: "If output and return blur, assign the call to a variable and inspect that variable.", action: "Ask which choice makes a function reusable by a different caller." }
    },
    {
      title: "Local and module names",
      companions: ["scope"],
      html: `<h2>Local and module names</h2><pre class="cmd"><code>theme = "sky"

def card_color(place):
    label = f"{place}:{theme}"
    return label

card_color("hall")</code></pre><p><code>label</code> belongs to the function call. The function can read the module's <code>theme</code>, but that does not move <code>label</code> into the module.</p><details class="reveal"><summary>Predict the result and module theme</summary><div>The result is <code>hall:sky</code>. The module theme remains <code>sky</code>.</div></details>`,
      notes: { timing: "8 min", talking: "Draw a module box and a call box. Put label only in the call box.", question: "Which name can a caller receive through return? The label value.", failure: "If students imagine every name is global, point to the function boundary.", action: "Ask learners to point to where label is created." }
    },
    {
      title: "Shadowing changes which name you see",
      companions: ["shadowing", "scope"],
      html: `<h2>Shadowing changes which name you see</h2><pre class="cmd"><code>theme = "sky"

def make_card(place):
    def inner():
        theme = f"{place}:local"
        return theme
    return inner()

make_card("hall")</code></pre><p>The inner <code>theme</code> hides the module name inside that nested call. It does not replace the module value.</p><details class="reveal"><summary>Predict the returned text and outer theme</summary><div><code>hall:local</code> is returned. The module <code>theme</code> is still <code>sky</code>.</div></details>`,
      notes: { timing: "8 min", talking: "Trace the inner and module names as two boxes. Then point to repair_shadowed_prefix as a different accidental shadow.", question: "Which theme is visible inside inner? Its local name.", failure: "If someone expects the module value to change, rerun the call and print the module name afterward.", action: "Ask why a custom prefix could be lost by reassignment." }
    },
    {
      title: "A safe collection default",
      companions: ["default"],
      html: `<h2>A safe collection default</h2><pre class="cmd"><code>def add_stop(stop, stops=None):
    if stops is None:
        stops = []
    return [*stops, stop]

add_stop("A")
add_stop("B")</code></pre><p>A fresh list avoids surprising shared state across calls. Defaults are chosen when the function is defined, not rebuilt for each call.</p><details class="reveal"><summary>Predict both returned lists</summary><div><code>["A"]</code> and <code>["B"]</code>. Neither omitted call inherits the other stop.</div></details>`,
      notes: { timing: "7 min", talking: "Keep this as a short extension of default parameters. Show the two independent calls.", question: "Why use None rather than a list default here? To make a fresh list for each omitted call.", failure: "If the first list appears to persist, have learners run the two calls separately.", action: "Ask whether a caller-supplied list is changed by this function." }
    },
    {
      title: "A docstring states the contract",
      companions: ["docstring"],
      html: `<h2>A docstring states the contract</h2><pre class="cmd"><code>def agenda_line(time, activity):
    """Return one event line."""
    return f"{time} | {activity}"</code></pre><p>A useful docstring says what the function returns and any important edge case. The practice file adds a worked example and edge case for every TODO.</p><details class="reveal"><summary>Predict agenda_line("9 AM", "Doors")</summary><div><code>9 AM | Doors</code>. The docstring describes a returned line, so a print-only body would break its contract.</div></details>`,
      notes: { timing: "6 min", talking: "Read the docstring before the body. Explain that examples and edge cases are part of the student starter contracts.", question: "What does this docstring promise? One returned event line.", failure: "If students treat a docstring as executable output, point out that the return line performs the job.", action: "Ask for one edge case the docstring could also state." }
    },
    {
      title: "Refactor the event agenda",
      companions: ["refactor", "return_value"],
      html: `<h2>Refactor the event agenda</h2><pre class="cmd"><code>def agenda_line(time, activity):
    return f"{time} | {activity}"

def agenda_text(heading, entries):
    lines = [heading]
    for time, activity in entries:
        lines.append(agenda_line(time, activity))
    return "\\n".join(lines)</code></pre><p>One helper owns the row format; the outer function owns the complete block. The caller decides whether to print it.</p><details class="reveal"><summary>Predict one entry under Monday</summary><div><code>Monday</code> on the first line and <code>9 AM | Doors</code> on the second. The returned text has one newline.</div></details>`,
      notes: { timing: "10 min", talking: "I Do the helper, then We Do the outer caller. Keep this event scenario separate from the graded menu refactor.", question: "Which function owns the row format? agenda_line.", failure: "If a helper prints instead of returning, the outer join receives None and cannot build the text.", action: "Ask what changes if a second agenda entry is added." }
    },
    {
      title: "An inner function remembers",
      companions: ["closure", "scope"],
      html: `<h2>An inner function remembers</h2><pre class="cmd"><code>def make_click_counter(start=0):
    count = start
    def click():
        nonlocal count
        count += 1
        return count
    return click</code></pre><p>This is an extension. Each call to <code>make_click_counter</code> creates an independent local count.</p><details class="reveal"><summary>Predict two calls from start 2</summary><div>The returned counter gives <code>3</code>, then <code>4</code>. A different counter has its own state.</div></details>`,
      notes: { timing: "8 min", talking: "Keep the core target on def, defaults, return, and scope; the closure is optional stretch work.", question: "Why does a second counter not inherit the first one's count? Each outer call creates new local state.", failure: "If nonlocal is unfamiliar, trace only the count box before explaining the keyword.", action: "Ask what one fresh default counter returns first." }
    },
    {
      title: "Run the local check",
      html: `<h2>Run the local check</h2><p>From the repository root, replace one TODO, then run:</p><pre class="cmd"><code>python lp06a-functions-and-scope/check.py</code></pre><p>Each of eleven exercises gets <code>PASS</code>, <code>FAIL</code> with an input and nudge, or <code>NOT STARTED</code>. Open <a href="../lp06a-functions-and-scope/hints.md">hints.md</a> one level at a time.</p><details class="reveal"><summary>Predict the untouched starter result</summary><div>Eleven <code>NOT STARTED</code> lines. Choose a Warm-up or Fix it before a Build exercise.</div></details>`,
      notes: { timing: "8 min", talking: "You Do: let students choose one non-graded event or text task and run its check.", question: "What does NOT STARTED mean? The function still raises its TODO.", failure: "If the command cannot find check.py, return to the repository root.", action: "Ask each student to explain one test input before editing." }
    },
    {
      title: "Week 6 check",
      html: `<h2>Week 6 check</h2><div data-quiz="w6"></div><p>Use the <a href="../lp06a-functions-and-scope/week06-walkthrough.md">text walkthrough</a> to revisit a trace. Try the packet before reading its reference answers.</p>`,
      notes: { timing: "8 min", talking: "Ask for a reason after every quiz choice, then close with one prediction, observed result, and explanation.", question: "Which function boundary still needs another example?", failure: "If interaction is unavailable, read the question and choices aloud.", action: "Collect one return-value and one scope explanation." }
    }
  ],
  quizzes: { w6: [
    { q: "What is a parameter?", options: [{ text: "A name in a function definition", correct: true }, { text: "A printed result" }, { text: "A module folder" }], why: "The definition names parameters; callers supply arguments." },
    { q: "When is a default value used?", options: [{ text: "When that argument is omitted", correct: true }, { text: "Whenever it is an empty string" }, { text: "Only after a print call" }], why: "An explicitly supplied value is used even if it is empty." },
    { q: "What does announce_tag return without a return statement?", options: [{ text: "None", correct: true }, { text: "Its printed line" }, { text: "The title twice" }], why: "Printing and returning are separate actions." },
    { q: "What happens to module theme when inner assigns a local theme?", options: [{ text: "It stays sky", correct: true }, { text: "It becomes hall:local" }, { text: "It disappears" }], why: "The nested assignment belongs to its own scope." },
    { q: "Why is None useful as a collection default here?", options: [{ text: "It allows a fresh list per omitted call", correct: true }, { text: "It sorts the list" }, { text: "It prints a warning" }], why: "The body creates a new list instead of sharing one default list." },
    { q: "What does a docstring describe?", options: [{ text: "A function's purpose and contract", correct: true }, { text: "Only the last print" }, { text: "A Git branch" }], why: "It tells a reader what the function is for and what it returns." },
    { q: "Which function owns the event row format?", options: [{ text: "agenda_line", correct: true }, { text: "The browser" }, { text: "The input list" }], why: "The helper gives one formatting rule a name." },
    { q: "What does a fresh counter starting at 2 return first?", options: [{ text: "3", correct: true }, { text: "2" }, { text: "0" }], why: "The inner call increments before returning." }
  ] }
};
