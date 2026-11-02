/* Week 4: LP 02. Rebuild with python resources/slides/build.py. */
window.DECK = {
  title: "Intro to Python, Week 4: Data Structures and Files",
  terms: {
    review: ["editor", "terminal", "shell", "prompt", "commandline", "option", "argument", "directory", "path", "repository", "clone", "venv", "interactive", "commit", "remote", "main", "staging", "push", "branch", "fork", "origin", "upstream", "pull", "variable", "type", "condition", "function"],
    fresh: ["list", "dictionary", "set", "tuple"]
  },
  slides: [
    {
      title: "Data Structures and Files",
      html: `<p class="kicker">Fall 26 · Week 4 · LP 02</p><h1>Data Structures and Files</h1><p class="lead">Choose a collection, change a roster, and read back what you saved.</p><p><a href="../lp02-data-structures/week04-walkthrough.md">Text walkthrough</a> · <a href="../lp02-data-structures/README.md">Lesson packet</a></p>`,
      notes: { timing: "3 min", talking: "Connect this lesson to Week 3 variables. Today one variable can refer to many values.", question: "What would you store for a roster of names? An ordered list is a useful start.", failure: "If learners missed Week 3, link the Week 3 walkthrough and continue with concrete examples.", action: "Say list, dictionary, set, and tuple." }
    },
    {
      title: "Four collection choices",
      companions: ["list", "dictionary", "set"],
      html: `<h2>Four collection choices</h2><div class="tbl-wrap"><table class="tbl"><tr><th>Task</th><th>Use</th><th>Why</th></tr><tr><td>Keep sign-ins in order</td><td>List</td><td>Order and repeated names remain</td></tr><tr><td>Look up a score by name</td><td>Dictionary</td><td>A name is the key</td></tr><tr><td>Count unique names</td><td>Set</td><td>Duplicates collapse</td></tr><tr><td>Store a fixed hour and minute</td><td>Tuple</td><td>The pair stays together</td></tr></table></div><p>Each choice solves a different question about the same roster.</p>`,
      notes: { timing: "10 min", talking: "Ask learners which property matters in each row. Avoid presenting collections as interchangeable.", question: "Why not use a set for sign-ins? The repeated name and original order matter here.", failure: "If tuple feels abstract, point to (20, 0) as hour and minute.", action: "Have learners name the collection for each task before showing the answer." }
    },
    {
      title: "Roster trace",
      companions: ["tuple"],
      html: `<h2>Roster trace</h2><pre class="cmd"><code>names = ["Maya", "Luis"]
scores = {"Maya": 82, "Luis": 75}
meeting_time = (20, 0)
names.append("Ari")
scores["Ari"] = 91
names.append("Maya")</code></pre><details class="reveal"><summary>Predict: names[0], scores["Ari"], and len(set(names))</summary><div><code>"Maya"</code>, <code>91</code>, and <code>3</code>. The list has four sign-ins, including Maya twice.</div></details>`,
      notes: { timing: "12 min", talking: "Trace the changes line by line. Count list entries separately from unique names.", question: "What is meeting_time[0]? 20, the hour in the fixed pair.", failure: "A KeyError means the requested dictionary key is absent. Show how to inspect keys.", action: "Have a learner explain why four sign-ins yield three unique names." }
    },
    {
      title: "A file round trip",
      html: `<h2>A file round trip</h2><p>The code-along joins names with newline characters, writes UTF-8 text, reads the file, then calls <code>splitlines()</code>.</p><pre class="cmd"><code>python lp02-data-structures/code-along.py</code></pre><details class="reveal"><summary>Predict the read-back list</summary><div><code>['Maya', 'Luis', 'Ari', 'Maya']</code>. The file keeps both Maya sign-ins. <code>splitlines()</code> returns lines without newline characters.</div></details><p>The run creates <code>lp02-data-structures/attendance-demo.txt</code> for inspection.</p>`,
      notes: { timing: "12 min", talking: "Pause before the run. Open the generated file and compare its exact lines with the prediction. Note that the file ends with a newline.", question: "Does a set change the saved file here? No. The code writes the original names list.", failure: "If the file is not found, run from the repository root and check the printed path.", action: "Have learners distinguish file text from the list returned by splitlines()." }
    },
    {
      title: "Shared change and independent practice",
      html: `<h2>Change the roster together</h2><p>We Do: add Noor to the list and dictionary. Predict the new last file line. Add a second Ari and predict the unique count.</p><h3>Your turn</h3><p>Start with <code>unique_names</code>, <code>highest_score</code>, and <code>save_names</code>, then continue through eight new exercises in <code>practice.py</code>.</p><pre class="cmd"><code>python lp02-data-structures/check.py</code></pre><p>The check prints one <code>PASS</code>, <code>FAIL</code>, or <code>NOT STARTED</code> line per exercise. Open one level in <a href="../lp02-data-structures/hints.md">hints.md</a> when stuck.</p>`,
      notes: { timing: "24 min", talking: "Begin the eleven-exercise ladder here and let students continue after class. Offer one hint at a time: a result list plus a seen set preserves first appearance.", question: "What should highest_score return for an empty dictionary? None, as the starter specifies.", failure: "NOT STARTED identifies the next unfinished TODO. An unexpected file value calls for reading the exact text.", action: "Ask for a collection choice and one passing check from each learner." }
    },
    {
      title: "Week 4 check",
      html: `<h2>Week 4 check</h2><div data-quiz="w4"></div><p>After your own attempt, compare with <a href="../lp02-data-structures/solutions.py">solutions.py</a>. The <a href="../lp02-data-structures/notebook-source.md">text source</a> covers the same task.</p>`,
      notes: { timing: "8 min", talking: "Ask why each answer fits. End with the exact saved text, not only the printed list.", question: "What does splitlines() remove? The line endings from the returned strings.", failure: "If quiz interaction fails, use the questions aloud.", action: "Say list, dictionary, set, and tuple once more." }
    }
  ],
  quizzes: { w4: [
    { q: "Which collection keeps repeated sign-ins in order?", options: [{ text: "List", correct: true }, { text: "Set" }, { text: "Dictionary" }], why: "A list preserves the sequence and repeats." },
    { q: "What is <code>len(set(['Maya', 'Luis', 'Maya']))</code>?", options: [{ text: "2", correct: true }, { text: "3" }, { text: "1" }], why: "The set contains Maya and Luis once each." },
    { q: "What does <code>'Maya\\nLuis\\n'.splitlines()</code> return?", options: [{ text: "['Maya', 'Luis']", correct: true }, { text: "['Maya\\n', 'Luis\\n']" }, { text: "'Maya Luis'" }], why: "splitlines() gives a list of lines without newline characters." }
  ] }
};
