/* Week 5: LP 03. Rebuild with python resources/slides/build.py. */
window.DECK = {
  title: "Intro to Python, Week 5: More Python Skills",
  terms: {
    review: ["editor", "terminal", "shell", "prompt", "commandline", "option", "argument", "directory", "path", "repository", "clone", "venv", "interactive", "commit", "remote", "main", "staging", "push", "branch", "fork", "origin", "upstream", "pull", "variable", "type", "condition", "function", "list", "dictionary", "set", "tuple"],
    fresh: ["class", "instance", "comprehension", "decorator", "closure"]
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
      notes: { timing: "12 min", talking: "Trace self through construction and add_score. Ask where the dictionary lives and what a second instance starts with.", question: "Does a second Gradebook share book.scores? No, __init__ creates a new dictionary for that instance.", failure: "If setdefault is unfamiliar, say it makes an empty list only when a name is new.", action: "Have a learner point to the class and an instance." }
    },
    {
      title: "Averages and comprehensions",
      companions: ["comprehension"],
      html: `<h2>Averages and comprehensions</h2><pre class="cmd"><code>names = ["Maya", "Luis", "Ari"]
averages = {name: book.average(name) for name in names}
passing = [name for name in names if is_passing(averages[name])]</code></pre><p>Maya has 82 and 74. Luis has 61 and 66. Ari has no score.</p><details class="reveal"><summary>Predict averages and passing at a cutoff of 70</summary><div><code>{'Maya': 78.0, 'Luis': 63.5, 'Ari': None}</code>; passing is <code>['Maya']</code>.</div></details>`,
      notes: { timing: "13 min", talking: "Read the comprehension as output, source, condition. Compute averages before revealing the list.", question: "Why is Ari's average None? The Gradebook has no marks for Ari.", failure: "If None triggers a comparison error in a learner variation, show the guard in make_checker.", action: "Ask the room to say which name passes and why." }
    },
    {
      title: "Decorators wrap calls",
      companions: ["decorator"],
      html: `<h2>Decorators wrap calls</h2><pre class="cmd"><code>@log_call
def describe(name, average):
    return f"{name}: {average:.1f}"

print(describe("Maya", 78.0))</code></pre><p><code>@log_call</code> means <code>describe = log_call(describe)</code>. The wrapper prints a message, then calls the original function.</p><details class="reveal"><summary>Predict which line prints first</summary><div>The wrapper's <code>-&gt; calling describe...</code> message prints first. Then <code>Maya: 78.0</code> prints.</div></details>`,
      notes: { timing: "12 min", talking: "Point to the decoration line before the call. The wrapper returns the original result, so print receives the description.", question: "Does the @ line call describe with Maya? No, it wraps the function when it is defined.", failure: "If a learner's wrapper loses the result, check for return func(*args, **kwargs).", action: "Have learners name wrapper output and function output in order." }
    },
    {
      title: "Closures remember values",
      companions: ["closure"],
      html: `<h2>Closures remember values</h2><pre class="cmd"><code>def make_checker(threshold):
    def is_passing(average):
        return average is not None and average >= threshold
    return is_passing

check_70 = make_checker(70)</code></pre><p>The returned function still uses <code>threshold</code> after <code>make_checker</code> has returned.</p><details class="reveal"><summary>Predict check_70(69) and make_checker(60)(65)</summary><div><code>False</code>, then <code>True</code>. Each returned function remembers the threshold used to create it.</div></details>`,
      notes: { timing: "10 min", talking: "Compare the two checkers. The value from the outer call remains available to the inner function.", question: "What does check_70 remember? The threshold value 70.", failure: "If learners confuse calling the factory with calling the returned function, write each call separately.", action: "Ask one learner to explain why 65 passes for one checker but not another." }
    },
    {
      title: "Independent practice",
      html: `<h2>Independent practice</h2><p>First implement <code>Tally</code> and <code>long_words</code>. Then implement <code>make_multiplier</code> and <code>count_calls</code>. Replace one TODO at a time.</p><pre class="cmd"><code>python lp03-more-python-skills/code-along.py
python lp03-more-python-skills/practice.py</code></pre><p>The starter raises <code>NotImplementedError</code> until the TODOs are replaced. It checks that <code>shout.calls == 2</code>.</p><p>Share one passing assertion and explain the line that made it pass.</p>`,
      notes: { timing: "32 min", talking: "Give silent work time. Use the session plan for checkpoints. Offer one hint at a time. Do not open the solution early.", question: "Where should wrapper.calls start? Zero, before any calls happen.", failure: "If practice stops at a TODO, that is expected. If a call count is three, count the two shout calls in the main block.", action: "Ask for one successful test and one explanation." }
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
    { q: "How many times is shout called in the practice checks?", options: [{ text: "2", correct: true }, { text: "1" }, { text: "3" }], why: "The main block calls shout with hi and again." }
  ] }
};
