/* Week 3: LP 01. Rebuild with python resources/slides/build.py. */
window.DECK = {
  title: "Intro to Python, Week 3: Intro to Python",
  terms: {
    review: ["editor", "terminal", "shell", "prompt", "commandline", "option", "argument", "directory", "path", "repository", "clone", "venv", "interactive", "commit", "remote", "main", "staging", "push", "branch", "fork", "origin", "upstream", "pull"],
    fresh: ["variable", "type", "condition", "function"]
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
      title: "Shared change and independent practice",
      html: `<h2>Change one rule together</h2><p>We Do: change the cutoff to 75 in a scratch copy. Predict what happens to score 72 before running.</p><h3>Your turn</h3><p>Start with <code>classify_score</code> and <code>count_passing</code>, then work through the eight new exercises in <code>practice.py</code>. Replace one TODO at a time.</p><pre class="cmd"><code>python lp01-intro-to-python/check.py</code></pre><p>The check prints one <code>PASS</code>, <code>FAIL</code>, or <code>NOT STARTED</code> line per exercise. Open one level in <a href="../lp01-intro-to-python/hints.md">hints.md</a> when stuck.</p>`,
      notes: { timing: "22 min", talking: "Begin the ten-exercise ladder here and let students continue after class. Offer only the first hint: start the count at zero. Ask learners to explain a passing check.", question: "Why test 70? It is the boundary of the condition.", failure: "A student sees NOT STARTED after fixing one function. Point them to the next TODO and the matching hint section.", action: "Have learners state one prediction, the observed result, and the explaining line." }
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
    { q: "What does <code>total_points([])</code> return?", options: [{ text: "0", correct: true }, { text: "None" }, { text: "9" }], why: "The loop has no items, so total remains zero." }
  ] }
};
