/* Week 3: LP 01. Rebuild with python resources/slides/build.py. */
window.DECK = {
  title: "Intro to Python, Week 3: Intro to Python",
  terms: {
    review: ["editor", "terminal", "shell", "prompt", "commandline", "option", "argument", "directory", "path", "repository", "clone", "venv", "interactive", "commit", "remote", "main", "staging", "push", "branch", "fork", "origin", "upstream", "pull"],
    fresh: ["variable", "type", "condition", "function", "parse", "exception", "while", "iterate", "enumerate"]
  },
  slides: [
    {
      title: "Intro to Python",
      html: `<p class="kicker">Fall 26 · Week 3 · LP 01</p><h1>Intro to Python</h1><p class="lead">Predict a program, run it, then explain the difference.</p><p>Today: values and types, conditions, loops, and functions.</p><p><a href="../lp01-intro-to-python/week03-walkthrough.md">Text walkthrough</a> · <a href="../lp01-intro-to-python/README.md">Lesson packet</a></p>`,
      notes: { timing: "3 min", talking: "This is the first Python topic lab after the tool and Git sessions. Ask learners to keep a written prediction before every run.", question: "What does a program know before we run it? Only the values and rules we gave it.", failure: "If Python is unavailable, use the text walkthrough and compare predictions with the shown output later.", action: "Say variable and type out loud." }
    },
    {
      title: "Values have types",
      companions: ["variable", "type"],
      html: `<h2>Values have types</h2><pre class="cmd"><code>score_text = "72"
score = int(score_text)
print(type(score_text).__name__)
print(type(score).__name__)</code></pre><details class="reveal"><summary>Predict the two printed words</summary><div><code>str</code>, then <code>int</code>. The quotes make the first value text. <code>int()</code> converts it to a number.</div></details><p>Use <code>=</code> to assign a value. Use <code>==</code> to ask whether values are equal.</p>`,
      notes: { timing: "8 min", talking: "Point at the quotes. Ask for the type before and after conversion. Show the difference between assigning and comparing.", question: "Would comparing score_text with 70 work? No, that compares text with an integer.", failure: "A ValueError from int() means the text was not a valid integer. Read the last traceback line.", action: "Learners say variable and type, then name one example of each." }
    },
    {
      title: "Conditions and loops",
      companions: ["condition"],
      html: `<h2>Conditions and loops</h2><pre class="cmd"><code>def classify_score(score):
    if score >= 70:
        return "ready"
    return "keep practicing"

total = 0
for point in [2, 3, 4]:
    total = total + point</code></pre><details class="reveal"><summary>Predict: classify_score(69) and the final total</summary><div><code>"keep practicing"</code> and <code>9</code>. The loop visits 2, then 3, then 4.</div></details><p>Trace the changing <code>total</code>: 0, 2, 5, 9.</p>`,
      notes: { timing: "12 min", talking: "Trace the condition at 69 and 70. Have students write the total after each loop visit before you reveal it.", question: "What happens for an empty points list? The loop does not run, so total stays zero.", failure: "If indentation breaks the run, compare the if and for blocks with the code-along file.", action: "Say condition, then point to the exact true or false test." }
    },
    {
      title: "A function returns a result",
      companions: ["function"],
      html: `<h2>A function returns a result</h2><p><code>classify_score(72)</code> sends <code>72</code> into the function. The returned text can be printed, stored, or tested.</p><pre class="cmd"><code>python lp01-intro-to-python/code-along.py</code></pre><p>From the repository root, run the code-along. If Windows exposes the launcher instead, use <code>py</code>. On macOS or Linux, use <code>python3</code> if needed.</p><details class="reveal"><summary>Predict the final line before running</summary><div><code>Final total: 9</code>.</div></details>`,
      notes: { timing: "10 min", talking: "Show the file and its output. Pause before Enter. Ask which call produces each output line.", question: "Does return print by itself? No. The caller decides what to do with the result.", failure: "If the file is not found, check the working directory with pwd and list the files.", action: "Have one learner explain the input and returned value." }
    },
    {
      title: "Parse text and recover",
      companions: ["parse", "exception"],
      html: `<h2>Parse text and recover</h2><pre class="cmd"><code>text = " 72 "
try:
    score = int(text.strip())
except ValueError:
    score = None</code></pre><p><code>strip()</code> removes edge spaces. <code>int()</code> parses the remaining text. A bad number raises <code>ValueError</code>, which the exception handler catches.</p><details class="reveal"><summary>Predict score for " 72 " and for "oops"</summary><div><code>72</code>, then <code>None</code>. The second text cannot become an integer.</div></details>`,
      notes: { timing: "7 min", talking: "Trace the normal path and the ValueError path. Show that except runs only when conversion fails.", question: "What does strip remove here? Spaces at the edges.", failure: "If a learner catches every exception, ask which specific error int raises for bad text.", action: "Ask learners to name one valid and one invalid input." }
    },
    {
      title: "Repeat and number",
      companions: ["while", "iterate", "enumerate"],
      html: `<h2>Repeat and number</h2><pre class="cmd"><code>remaining = 3
steps = []
while remaining &gt; 0:
    steps.append(remaining)
    remaining -= 1

labels = [f"{number}. {name}" for number, name in enumerate(["Maya", "Ari"], 1)]</code></pre><p>A <code>while</code> loop repeats while its condition stays true. <code>enumerate</code> supplies a number with each item.</p><details class="reveal"><summary>Predict steps and labels</summary><div><code>[3, 2, 1]</code> and <code>['1. Maya', '2. Ari']</code>. Updating <code>remaining</code> lets the loop stop.</div></details>`,
      notes: { timing: "8 min", talking: "Trace remaining before each condition check. Point to the update that prevents an endless loop.", question: "Why does zero stay out of steps? The loop condition is false at zero.", failure: "If the loop never ends, inspect whether the changing variable moves toward the stop condition.", action: "Have learners say the three values appended in order." }
    },
    {
      title: "Trace a return bug",
      companions: ["function", "iterate"],
      html: `<h2>Trace a return bug</h2><pre class="cmd"><code>def total_points(points):
    total = 0
    for point in points:
        total += point
        return total</code></pre><p>The indentation places <code>return</code> inside the loop. Trace the first visit before editing the function.</p><details class="reveal"><summary>Predict total_points([2, 3, 4])</summary><div><code>2</code>. The first return stops the function. Moving the return after the loop lets it use all three points.</div></details>`,
      notes: { timing: "6 min", talking: "Trace the first iteration and stop at return. Connect this to the Fix it exercise without opening its solution.", question: "Does the loop visit 3 after return? No, the function has ended.", failure: "If indentation is hard to see, count spaces before return and for.", action: "Ask where return belongs for a total of all points." }
    },
    {
      title: "Shared change and independent practice",
      html: `<h2>Change one rule together</h2><p>We Do: change the cutoff to 75 in a scratch copy. Predict what happens to score 72 before running.</p><h3>Your turn</h3><p>Start with <code>classify_score</code> and <code>count_passing</code>, then work through the eight new exercises in <code>practice.py</code>. Replace one TODO at a time.</p><p>Open one level in <a href="../lp01-intro-to-python/hints.md">hints.md</a> when stuck.</p>`,
      notes: { timing: "19 min", talking: "Begin the ten-exercise ladder here and let students continue after class. Offer only the first hint: start the count at zero. Ask learners to explain a passing check.", question: "Why test 70? It is the boundary of the condition.", failure: "A student sees NOT STARTED after fixing one function. Point them to the next TODO and the matching hint section.", action: "Have learners state one prediction, the observed result, and the explaining line." }
    },
    {
      title: "Run the local check",
      html: `<h2>Run the local check</h2><p>From the repository root, run this after each TODO you replace:</p><pre class="cmd"><code>python lp01-intro-to-python/check.py</code></pre><p>One line per exercise: <code>PASS</code>, <code>FAIL</code> with the input and a nudge, or <code>NOT STARTED</code>. Read that line before opening another hint.</p><details class="reveal"><summary>Predict the untouched starter's result</summary><div>Ten <code>NOT STARTED</code> lines, one for each exercise. A TODO is a checkpoint, not a traceback wall.</div></details>`,
      notes: { timing: "4 min", talking: "Run the check from the repository root. Read one line, then return to that function.", question: "What does NOT STARTED mean? A TODO is still in that exercise.", failure: "If the file is not found, return to the repository root before running the command.", action: "Have learners point to their next check line." }
    },
    {
      title: "Week 3 check",
      html: `<h2>Week 3 check</h2><div data-quiz="w3"></div><p>After your own attempt, compare with <a href="../lp01-intro-to-python/solutions.py">solutions.py</a>. The <a href="../lp01-intro-to-python/notebook-source.md">text source</a> covers the same examples.</p>`,
      notes: { timing: "8 min", talking: "Let students explain each answer. Close with the relation between a prediction and actual output.", question: "What should you read first in a traceback? The last line names the error.", failure: "If quiz interaction fails, ask the questions aloud and use the explanation in the answers.", action: "Say variable, type, condition, function once more." }
    }
  ],
  quizzes: { w3: [
    { q: "What is the type of <code>\"72\"</code>?", options: [{ text: "str", correct: true }, { text: "int" }, { text: "bool" }], why: "Quotes make it text until int() converts it." },
    { q: "What does <code>classify_score(70)</code> return?", options: [{ text: "ready", correct: true }, { text: "keep practicing" }, { text: "None" }], why: "70 meets the score >= 70 condition." },
    { q: "What does <code>total_points([])</code> return?", options: [{ text: "0", correct: true }, { text: "None" }, { text: "9" }], why: "The loop has no items, so total remains zero." },
    { q: "What should parse_score return for text that cannot become an integer?", options: [{ text: "None", correct: true }, { text: "Zero" }, { text: "The original text" }], why: "The ValueError path returns None for bad text." },
    { q: "When does a while loop stop?", options: [{ text: "When its condition becomes false", correct: true }, { text: "After one visit" }, { text: "When it prints" }], why: "The condition is checked before each visit." },
    { q: "Where should return sit to total every point in a loop?", options: [{ text: "After the loop", correct: true }, { text: "Inside the first iteration" }, { text: "Before total starts" }], why: "Returning inside the loop ends the function after its first item." }
  ] }
};
