/* Week 5: LP 03. Rebuild with python resources/slides/build.py. */
window.DECK = {
  title: "Intro to Python, Week 5: More Python Skills",
  terms: {
    review: ["editor", "terminal", "shell", "prompt", "commandline", "option", "argument", "directory", "path", "repository", "clone", "venv", "interactive", "commit", "remote", "main", "staging", "push", "branch", "fork", "origin", "upstream", "pull", "variable", "type", "condition", "function", "parse", "exception", "while", "iterate", "enumerate", "list", "dictionary", "set", "tuple", "sort", "slice", "encoding"],
    fresh: ["class", "instance", "comprehension", "decorator", "closure", "property", "stack"]
  },
  slides: [
    {
      title: "More Python Skills",
      html: `<p class="kicker">Fall 26 · Week 5 · LP 03</p><h1>More Python Skills</h1><p class="lead">Read a class, build a list, wrap a function, and keep a value for later.</p><p><a href="../lp03-more-python-skills/week05-run-of-show.md">Session plan</a> · <a href="../lp03-more-python-skills/README.md">Lesson packet</a> · <a href="../lp03-more-python-skills/notebook-source.md">Text route</a></p>`,
      notes: { timing: "5 min", talking: "Connect to prior weeks: values and collections still drive every example. Today we organize behavior around them.", question: "Which of today's ideas have you seen in code? Invite examples without requiring definitions.", failure: "If students missed Weeks 3 or 4, point to their text walkthroughs after class.", action: "Say class, comprehension, decorator, closure." }
    },
    {
      title: "Gradebook instances",
      companions: ["class", "instance"],
      html: `<h2>Gradebook instances</h2><pre class="cmd"><code>class Gradebook:
    def __init__(self):
        self.scores = {}

    def add_score(self, name, score):
        self.scores.setdefault(name, []).append(score)</code></pre><p><code>self</code> is the instance that receives the method call. Each new <code>Gradebook()</code> starts with its own empty scores dictionary.</p><details class="reveal"><summary>Predict book.scores after adding Maya's 82</summary><div><code>{'Maya': [82]}</code>.</div></details>`,
      notes: { timing: "8 min", talking: "Trace self through construction and add_score. Ask where the dictionary lives and what a second instance starts with.", question: "Does a second Gradebook share book.scores? No, __init__ creates a new dictionary for that instance.", failure: "If setdefault is unfamiliar, say it makes an empty list only when a name is new.", action: "Have a learner point to the class and an instance." }
    },
    {
      title: "Averages and comprehensions",
      companions: ["comprehension"],
      html: `<h2>Averages and comprehensions</h2><pre class="cmd"><code>names = ["Maya", "Luis", "Ari"]
averages = {name: book.average(name) for name in names}
passing = [name for name in names if is_passing(averages[name])]</code></pre><p>Maya has 82 and 74. Luis has 61 and 66. Ari has no score.</p><details class="reveal"><summary>Predict averages and passing at a cutoff of 70</summary><div><code>{'Maya': 78.0, 'Luis': 63.5, 'Ari': None}</code>; passing is <code>['Maya']</code>.</div></details>`,
      notes: { timing: "8 min", talking: "Read the comprehension as output, source, condition. Compute averages before revealing the list.", question: "Why is Ari's average None? The Gradebook has no marks for Ari.", failure: "If None triggers a comparison error in a learner variation, show the guard in make_checker.", action: "Ask the room to say which name passes and why." }
    },
    {
      title: "Decorators wrap calls",
      companions: ["decorator"],
      html: `<h2>Decorators wrap calls</h2><pre class="cmd"><code>@log_call
def describe(name, average):
    return f"{name}: {average:.1f}"

print(describe("Maya", 78.0))</code></pre><p><code>@log_call</code> means <code>describe = log_call(describe)</code>. The wrapper prints a message, then calls the original function.</p><details class="reveal"><summary>Predict which line prints first</summary><div>The wrapper's <code>-&gt; calling describe...</code> message prints first. Then <code>Maya: 78.0</code> prints.</div></details>`,
      notes: { timing: "8 min", talking: "Point to the decoration line before the call. The wrapper returns the original result, so print receives the description.", question: "Does the @ line call describe with Maya? No, it wraps the function when it is defined.", failure: "If a learner's wrapper loses the result, check for return func(*args, **kwargs).", action: "Have learners name wrapper output and function output in order." }
    },
    {
      title: "Closures remember values",
      companions: ["closure"],
      html: `<h2>Closures remember values</h2><pre class="cmd"><code>def make_checker(threshold):
    def is_passing(average):
        return average is not None and average >= threshold
    return is_passing

check_70 = make_checker(70)</code></pre><p>The returned function still uses <code>threshold</code> after <code>make_checker</code> has returned.</p><details class="reveal"><summary>Predict check_70(69) and make_checker(60)(65)</summary><div><code>False</code>, then <code>True</code>. Each returned function remembers the threshold used to create it.</div></details>`,
      notes: { timing: "6 min", talking: "Compare the two checkers. The value from the outer call remains available to the inner function.", question: "What does check_70 remember? The threshold value 70.", failure: "If learners confuse calling the factory with calling the returned function, write each call separately.", action: "Ask one learner to explain why 65 passes for one checker but not another." }
    },
    {
      title: "A counter remembers and a wrapper caches",
      companions: ["closure", "decorator"],
      html: `<h2>A counter remembers and a wrapper caches</h2><pre class="cmd"><code>def make_turn():
    number = 0
    def next_turn():
        nonlocal number
        number += 1
        return number
    return next_turn</code></pre><p><code>nonlocal</code> lets the inner function update its outer value. A <code>once</code> wrapper also remembers state: whether it ran and what it returned.</p><details class="reveal"><summary>Predict two calls to one counter and one call to a new counter</summary><div><code>1, 2</code>, then <code>1</code>. Each factory call creates its own memory. A caching wrapper needs a separate flag because <code>None</code> can be a valid result.</div></details>`,
      notes: { timing: "5 min", talking: "Trace the counter's state across two calls, then create a second counter. Connect the same memory idea to once.", question: "Why can a cache not use None as its not-run signal? The first result might be None.", failure: "If nonlocal is unfamiliar, point to number in the outer function and the inner update.", action: "Have learners predict the first call to a second counter." }
    },
    {
      title: "Stack and function order",
      companions: ["stack", "closure"],
      html: `<h2>Stack and function order</h2><pre class="cmd"><code>items = ["class", "list"]
items.append("decorator")
top = items[-1]
last_out = items.pop()

result = (4 + 3) * 2</code></pre><p>A stack removes the last item added. In <code>compose(f, g)</code>, run <code>g</code> first, then <code>f</code>, just as the inner calculation runs first above.</p><details class="reveal"><summary>Predict top, last_out, and result</summary><div><code>'decorator'</code>, <code>'decorator'</code>, and <code>14</code>. Peeking at the top does not remove it.</div></details>`,
      notes: { timing: "5 min", talking: "Use the list as a model of Stack. Trace append, peek, and pop before discussing compose order.", question: "What if we pop an empty Stack? The exercise requires a clear IndexError.", failure: "If learners reverse compose, write the nested call f(g(4)) explicitly.", action: "Ask which operation happens first inside f(g(4))." }
    },
    {
      title: "Rank a Gradebook report",
      companions: ["class", "comprehension", "property"],
      html: `<h2>Rank a Gradebook report</h2><p>The mini project stores scores per student, computes one-decimal averages, and sorts a report. A student without marks has average <code>None</code> and goes last.</p><pre class="cmd"><code>averages = {name: book.average(name) for name in names}
ranked = sorted(averages.items(), key=report_key)</code></pre><p><code>@property</code> makes <code>book.student_count</code> readable like a value.</p><details class="reveal"><summary>Predict order: Maya 78, Ari no marks, Luis 91</summary><div><code>[('Luis', 91.0), ('Maya', 78.0), ('Ari', None)]</code>. Tied averages use alphabetical names.</div></details>`,
      notes: { timing: "5 min", talking: "Keep the sort key as a design task. Ask for the ordering rules before code.", question: "Where does a student with no marks go? Last, after scored students.", failure: "If None cannot be compared with a number, build a sort key that handles empty records first.", action: "Have learners name the report's three ordering rules." }
    },
    {
      title: "Independent practice",
      html: `<h2>Independent practice</h2><p>Begin with <code>Tally</code> and <code>long_words</code>, then choose a Fix it or Build exercise. Finish with the <code>Gradebook</code> mini project.</p><p>Open one level at a time in <a href="../lp03-more-python-skills/hints.md">hints.md</a>. Share one check result and explain the line that produced it.</p>`,
      notes: { timing: "24 min", talking: "Give silent work time. Use the session plan for checkpoints. Offer one hint at a time. Keep the reference closed until students attempt the task.", question: "Where should wrapper.calls start? Zero, before any calls happen.", failure: "A NOT STARTED line means the TODO remains. A FAIL line names the input, expected result, actual result, and a nudge.", action: "Ask for one check result and one explanation." }
    },
    {
      title: "Run the local check",
      html: `<h2>Run the local check</h2><p>From the repository root, run this after each TODO you replace:</p><pre class="cmd"><code>python lp03-more-python-skills/check.py</code></pre><p>Each exercise gets a <code>PASS</code>, <code>FAIL</code> with a nudge, or <code>NOT STARTED</code> line. The Gradebook project has its own line.</p><details class="reveal"><summary>Predict the untouched starter's result</summary><div>Ten <code>NOT STARTED</code> lines. Each points to one exercise or the mini project.</div></details>`,
      notes: { timing: "3 min", talking: "Run the command from the repository root. Read the check line for the exercise being changed.", question: "What does the Gradebook line cover? Its project behavior, including report order.", failure: "If a TODO remains, use its NOT STARTED line to find the next function.", action: "Ask learners to identify their next check line." }
    },
    {
      title: "Week 5 check",
      html: `<h2>Week 5 check</h2><div data-quiz="w5"></div><p>Compare with <a href="../lp03-more-python-skills/solutions.py">solutions.py</a> only after the independent attempt. The <a href="../lp03-more-python-skills/notebook-source.md">text source</a> is available for review.</p>`,
      notes: { timing: "8 min", talking: "Ask students to explain one answer from the code, then name a use for each idea.", question: "Which idea still feels least clear? Use the answer to plan the next review.", failure: "If quiz interaction fails, ask each question aloud and discuss the explanations.", action: "Close with class, comprehension, decorator, and closure in learners' own words." }
    }
  ],
  quizzes: { w5: [
    { q: "What does <code>self</code> refer to in <code>book.add_score</code>?", options: [{ text: "The book instance", correct: true }, { text: "The Gradebook class itself" }, { text: "The name string" }], why: "The method runs on the instance named book." },
    { q: "At a cutoff of 70, which name passes?", options: [{ text: "Maya", correct: true }, { text: "Luis" }, { text: "Ari" }], why: "Maya's average is 78.0; Luis is 63.5; Ari has no score." },
    { q: "What does check_70 remember?", options: [{ text: "The threshold 70", correct: true }, { text: "Only its most recent average" }, { text: "The Gradebook class" }], why: "The closure keeps access to threshold from make_checker(70)." },
    { q: "What does a decorator return to replace the original function?", options: [{ text: "A callable wrapper", correct: true }, { text: "The original function's first result" }, { text: "Only a count of calls" }], why: "A decorator takes a function and returns a callable, often a wrapper that adds behavior." },
    { q: "What does a new make_counter closure return on its first call?", options: [{ text: "1", correct: true }, { text: "The previous counter's value" }, { text: "None" }], why: "Each call to the factory creates a separate count starting at zero, then increases it." },
    { q: "Why does once need a Boolean flag beside its saved result?", options: [{ text: "None can be a valid saved result", correct: true }, { text: "The flag sorts results" }, { text: "The flag counts students" }], why: "Checking result is None cannot tell an uncached call from a cached None." },
    { q: "After pushing a then b, what does Stack.pop return?", options: [{ text: "b", correct: true }, { text: "a" }, { text: "Both items" }], why: "A stack removes the most recently pushed item first." },
    { q: "What order does compose(f, g) apply its functions?", options: [{ text: "g, then f", correct: true }, { text: "f, then g" }, { text: "Both at once" }], why: "The composed result is f(g(value))." }
  ] }
};
