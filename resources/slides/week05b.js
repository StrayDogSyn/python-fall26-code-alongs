/* Week 5 Iteration and Algorithms. Rebuild with python resources/slides/build.py. */
window.GLOSSARY.push(...window.WEEK05B_GLOSSARY);
window.DECK = {
  title: "Python Intro, Week 5: Iteration and Algorithms",
  terms: {
    review: ["variable", "type", "condition", "function", "list", "dictionary", "set", "tuple", "comprehension"],
    fresh: ["iterate", "accumulator", "sentinel", "linear_search", "binary_search", "comparison", "pass", "swap", "range", "enumerate", "while", "nested_loop", "bubble_sort", "selection_sort"]
  },
  slides: [
    {
      title: "Iteration and Algorithms",
      html: `<p class="kicker">Fall 26 · Week 5 · LP 03A</p><h1>Iteration &amp; Algorithms</h1><p class="lead">Trace a loop, count the work, and explain why an algorithm stops.</p><p><a href="../lp03a-iteration-and-algorithms/README.md">Lesson packet</a> · <a href="../lp03a-iteration-and-algorithms/week05-walkthrough.md">Text walkthrough</a> · <a href="../lp03a-iteration-and-algorithms/run-of-show.md">Session plan</a></p>`,
      notes: { timing: "3 min", talking: "Say the goal: make a prediction before every run, then compare it with the trace.", question: "What can a loop remember from one visit to the next? A variable outside it.", failure: "If someone missed the prior weeks, point to the text walkthrough after class.", action: "Name counting, searching, and sorting." }
    },
    {
      title: "Four loop jobs",
      companions: ["iterate", "accumulator"],
      html: `<h2>Four loop jobs</h2><pre class="cmd"><code>waits = [4, 7, 2, 9]
count = 0
total = 0
short = []
for minutes in waits:
    count += 1
    total += minutes
    if minutes &lt; 5:
        short.append(minutes)</code></pre><p>Count visits, accumulate a sum, search for a match, or filter into a new list. Keep state outside the loop.</p><details class="reveal"><summary>Predict count, total, and short</summary><div><code>4</code>, <code>22</code>, and <code>[4, 2]</code>. The same loop can do several jobs.</div></details>`,
      notes: { timing: "7 min", talking: "Trace one column each for count, total, and short values.", question: "What would happen if total = 0 were inside the loop? Earlier values would be lost.", failure: "If count and sum blur together, track them in separate columns.", action: "Ask for the value of total after the second visit." }
    },
    {
      title: "Start, stop, step, position",
      companions: ["range", "enumerate"],
      html: `<h2>Start, stop, step, position</h2><pre class="cmd"><code>list(range(2, 10, 3))
for index, value in enumerate(["red", "blue"]):
    print(index, value)</code></pre><p><code>range</code> excludes its stop. <code>enumerate</code> supplies an index with each value. A negative step can count down.</p><details class="reveal"><summary>Predict the range and printed pairs</summary><div><code>[2, 5, 8]</code>; then <code>0 red</code> and <code>1 blue</code>.</div></details>`,
      notes: { timing: "6 min", talking: "Point to each range argument. Walk the values until the next step reaches or passes stop.", question: "Is 10 included? No, stop is excluded.", failure: "If learners expect enumerate to begin at one, show its default index zero.", action: "Ask what range(9, 2, -3) visits." }
    },
    {
      title: "A while loop needs an exit",
      companions: ["while", "sentinel"],
      html: `<h2>A while loop needs an exit</h2><pre class="cmd"><code>readings = iter(["wait", "wait", "go", "wait"])
attempts = 0
signal = None
while signal != "go" and attempts &lt; 3:
    signal = next(readings)
    attempts += 1</code></pre><p><code>"go"</code> is the sentinel. The attempt guard also stops the loop if it never arrives.</p><details class="reveal"><summary>Predict attempts and the unread value</summary><div><code>3</code> attempts. The last <code>"wait"</code> is never read.</div></details>`,
      notes: { timing: "7 min", talking: "Trace signal and attempts before each condition check.", question: "What prevents an infinite loop if go never appears? The attempt limit.", failure: "If a learner checks only the sentinel, add a second guard.", action: "Ask why the fourth reading is untouched." }
    },
    {
      title: "Find the loop bug",
      companions: ["accumulator", "comparison"],
      html: `<h2>Find the loop bug</h2><pre class="cmd"><code>total = 0
for value in [2, 5, 1]:
    total = 0  # reset bug
    total += value
    print(total)</code></pre><p>Other common bugs: a range one step too long, a <code>while</code> condition that never changes, and a no-match <code>return</code> inside the first unsuccessful visit.</p><details class="reveal"><summary>Predict the three printed totals</summary><div><code>2</code>, <code>5</code>, <code>1</code>. Move the reset before the loop to get <code>2, 7, 8</code>. Temporary prints make state visible.</div></details>`,
      notes: { timing: "8 min", talking: "We Do: let learners point to the bad line before moving it. Mention the early return and off-by-one patterns.", question: "Why is the final total one? The reset erased earlier visits.", failure: "If students change the addition instead, trace the reset first.", action: "Ask where total = 0 belongs." }
    },
    {
      title: "Linear search counts every check",
      companions: ["linear_search", "comparison"],
      html: `<h2>Linear search counts every check</h2><pre class="cmd"><code>codes = [17, 24, 31, 42, 58]
for index, code in enumerate(codes):
    if code == 42:
        print(index)
        break</code></pre><p>Stop for the first match; keep scanning if you need all matches. Count each equality comparison, including the successful one.</p><details class="reveal"><summary>Predict the index and comparison count</summary><div>Index <code>3</code> after <code>4</code> comparisons. Missing <code>42</code> would take five checks on this list.</div></details>`,
      notes: { timing: "10 min", talking: "Trace each code compared with 42 and count aloud.", question: "What changes if we need every match? Do not break at the first one.", failure: "If students use list.index, return to the explicit comparisons being counted.", action: "Ask how many checks an absent value needs." }
    },
    {
      title: "Binary search cuts the window",
      companions: ["binary_search", "comparison"],
      html: `<h2>Binary search cuts the window</h2><p>Only use this walk on an ascending sorted list.</p><pre class="cmd"><code>low = 0
high = 4
mid = (low + high) // 2
# compare codes[mid] with 42, then move one bound</code></pre><p>After each comparison, discard half the remaining positions. Roughly <code>log2(n)</code> checks can cover <code>n</code> values.</p><details class="reveal"><summary>Predict middle values checked for 42</summary><div>First <code>31</code> at index 2, then <code>42</code> at index 3. Two comparisons, versus four for the linear scan.</div></details>`,
      notes: { timing: "10 min", talking: "Walk low, high, and mid on the board. Do not call this on unsorted input.", question: "Why can we discard the left half after 31? Every value there is at most 31.", failure: "If a bound stays on mid, show why the window may stop shrinking.", action: "Compare two checks with the linear search's four." }
    },
    {
      title: "Bubble sort: one pass",
      companions: ["bubble_sort", "pass", "swap"],
      html: `<h2>Bubble sort: one pass</h2><pre class="cmd"><code>values = [8, 3, 5]
# compare 8 and 3, then 8 and 5
left, right = right, left  # tuple swap shape</code></pre><p>Compare neighbors. Swap a pair if it is out of order. The largest unsorted value reaches the right edge in a full pass.</p><details class="reveal"><summary>Trace each comparison and reveal the pass</summary><div><code>[3, 8, 5]</code> after the first swap; <code>[3, 5, 8]</code> after the second. The next pass checks the left pair.</div></details>`,
      notes: { timing: "8 min", talking: "Move three cards by hand, then point to tuple unpacking as a swap shape.", question: "Which value is fixed at the right after this pass? Eight.", failure: "If a learner swaps non-neighbors, keep the comparison to adjacent positions.", action: "Ask for the list after the first comparison." }
    },
    {
      title: "Selection sort: choose a minimum",
      companions: ["selection_sort", "swap"],
      html: `<h2>Selection sort: choose a minimum</h2><pre class="cmd"><code>values = [8, 3, 5]
# scan the unsorted tail for the smallest value
# swap it into the first open position</code></pre><p>Selection sort asks a different question from bubble sort: which value belongs here next?</p><details class="reveal"><summary>Predict the first selection and swap</summary><div>The minimum is <code>3</code> at index 1. After swapping with the first position: <code>[3, 8, 5]</code>. The next position then chooses 5.</div></details>`,
      notes: { timing: "8 min", talking: "Trace the minimum index before doing the swap. Compare the first pass with bubble sort.", question: "Does selection sort need to swap every neighbor? No, it chooses one minimum per position.", failure: "If students sort the input in the exercise, remind them to work on a copy.", action: "Ask which value belongs in position one next." }
    },
    {
      title: "Nested loops visit pairs",
      companions: ["nested_loop"],
      html: `<h2>Nested loops visit pairs</h2><pre class="cmd"><code>for left in range(3):
    for right in range(left + 1, 3):
        print(left, right)</code></pre><p>The inner loop compares each position with later positions. This can find duplicate pairs. The number of pairs grows much faster than the list length.</p><details class="reveal"><summary>Predict the three printed pairs</summary><div><code>(0, 1)</code>, <code>(0, 2)</code>, <code>(1, 2)</code>. A list twice as long has more than twice as many pairs.</div></details>`,
      notes: { timing: "7 min", talking: "Draw a grid and cross out self-pairs and reversed repeats.", question: "Why begin right at left plus one? Earlier positions have already been checked.", failure: "If duplicate pairs repeat, show the triangular half of the grid.", action: "Ask how many pairs four items have." }
    },
    {
      title: "Loop or comprehension?",
      companions: ["comprehension"],
      html: `<h2>Loop or comprehension?</h2><pre class="cmd"><code>chosen = []
for wait in [4, 7, 2, 9]:
    if wait &gt; 4:
        chosen.append(wait)

short_form = [wait for wait in [4, 7, 2, 9] if wait &gt; 4]</code></pre><p>Both forms express the same filter. A loop is easier to trace when several steps need names or printed checks.</p><details class="reveal"><summary>Predict both lists</summary><div>Both are <code>[7, 9]</code>. The comprehension shortens this one-step filter.</div></details>`,
      notes: { timing: "6 min", talking: "Read the comprehension as output, source, condition. Compare with the plain loop.", question: "When might the longer loop be clearer? When each visit needs several steps or a trace.", failure: "If students read the condition first, point to the output expression and source before it.", action: "Have learners name one reason to choose each form." }
    },
    {
      title: "Run the local check",
      html: `<h2>Run the local check</h2><p>From the repository root, replace one TODO, then run:</p><pre class="cmd"><code>python lp03a-iteration-and-algorithms/check.py</code></pre><p>Each of eleven exercises gets <code>PASS</code>, <code>FAIL</code> with a nudge, or <code>NOT STARTED</code>. Use <a href="../lp03a-iteration-and-algorithms/hints.md">hints.md</a> one level at a time.</p><details class="reveal"><summary>Predict the untouched starter's result</summary><div>Eleven <code>NOT STARTED</code> lines. The check does not show a traceback wall for a TODO.</div></details>`,
      notes: { timing: "5 min", talking: "Show one local check line, then return to the matching exercise.", question: "What does NOT STARTED mean? That exercise still raises its TODO.", failure: "If a command cannot find the file, return to the repository root.", action: "Ask learners to choose a Warm-up or Fix it first." }
    },
    {
      title: "Week 5 check",
      html: `<h2>Week 5 check</h2><div data-quiz="w5b"></div><p>Keep the <a href="../lp03a-iteration-and-algorithms/week05-walkthrough.md">text walkthrough</a> beside the deck. Compare with the packet's reference only after trying the exercises.</p>`,
      notes: { timing: "5 min", talking: "Ask learners to explain why each answer follows from the trace.", question: "Which loop or search step needs another example?", failure: "If quiz interaction is unavailable, read questions and explanations aloud.", action: "Close with one prediction, observed result, and reason." }
    }
  ],
  quizzes: { w5b: [
    { q: "What does range(2, 10, 3) visit?", options: [{ text: "2, 5, 8", correct: true }, { text: "2, 5, 8, 10" }, { text: "3, 6, 9" }], why: "The start is 2, the step is 3, and stop 10 is excluded." },
    { q: "What stops the bounded while loop if the sentinel never arrives?", options: [{ text: "The attempt guard", correct: true }, { text: "The list sort" }, { text: "The first print" }], why: "The attempt count eventually makes the loop condition false." },
    { q: "Where should a running total be initialized?", options: [{ text: "Before the loop", correct: true }, { text: "At each visit" }, { text: "After return" }], why: "Initializing inside the loop erases earlier values." },
    { q: "How many checks does linear search need to find 42 in [17, 24, 31, 42, 58]?", options: [{ text: "4", correct: true }, { text: "2" }, { text: "5" }], why: "It checks 17, 24, 31, then 42." },
    { q: "What must be true before binary search discards half a list?", options: [{ text: "The list is sorted", correct: true }, { text: "The list is empty" }, { text: "The list contains no repeats" }], why: "Sorted order tells which half cannot contain the target." },
    { q: "What moves to the right edge after a full bubble pass?", options: [{ text: "The largest remaining value", correct: true }, { text: "The smallest value" }, { text: "The first input value" }], why: "Neighbor swaps move the largest active value rightward." },
    { q: "What does selection sort choose for each open position?", options: [{ text: "The smallest remaining value", correct: true }, { text: "The next random value" }, { text: "Only a neighboring value" }], why: "It scans the unsorted tail for the minimum." },
    { q: "What pairs do the nested loops visit for three items?", options: [{ text: "(0,1), (0,2), (1,2)", correct: true }, { text: "Only (0,1)" }, { text: "All self-pairs" }], why: "The inner loop starts after the outer position." }
  ] }
};
