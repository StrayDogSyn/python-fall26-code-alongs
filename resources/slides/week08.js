/* Week 8: rebuild with python resources/slides/build.py. */
window.GLOSSARY.push(...[
  {
    "id": "traceback_w8",
    "term": "Traceback",
    "say": "TRAYS-bak",
    "meaning": "The call path and location recorded when an exception escapes.",
    "usage": "Start at the final exception line."
  },
  {
    "id": "exception_w8",
    "term": "Exception",
    "say": "ek-SEP-shun",
    "meaning": "An object describing a runtime failure.",
    "usage": "A missing station key raises KeyError."
  },
  {
    "id": "handler_w8",
    "term": "Exception handler",
    "say": "HAN-dler",
    "meaning": "An except block that responds to a matching exception.",
    "usage": "Catch only the missing-file error you can recover from."
  },
  {
    "id": "raise_w8",
    "term": "raise",
    "say": "rayz",
    "meaning": "A statement that signals an exception.",
    "usage": "Raise ValueError for a required blank label."
  },
  {
    "id": "finally_w8",
    "term": "finally",
    "say": "FY-nuh-lee",
    "meaning": "A cleanup block run as control leaves a try statement.",
    "usage": "Cleanup still runs when the operation raises."
  },
  {
    "id": "logging_w8",
    "term": "Logging",
    "say": "LOG-ing",
    "meaning": "Recording events with levels and useful context.",
    "usage": "Warn when a station record is missing."
  },
  {
    "id": "guard_w8",
    "term": "Guard",
    "say": "gard",
    "meaning": "A condition that checks a precondition before an operation.",
    "usage": "Check the stack is nonempty before pop."
  }
]);
window.DECK = {
  title: "Python Intro, Week 8: Errors and Debugging",
  "terms": {
    "review": [
      "function",
      "dictionary",
      "list"
    ],
    "fresh": [
      "traceback_w8",
      "exception_w8",
      "handler_w8",
      "raise_w8",
      "finally_w8",
      "logging_w8",
      "guard_w8"
    ]
  },
  "slides": [
    {
      title: "Errors & Debugging",
      "html": "<h2>Errors &amp; Debugging</h2><p class=\"kicker\">Fall 26 · Week 8 · November 23</p><p class=\"lead\">A crash gives you evidence. A wrong answer needs a check.</p><p>I Do: trace a failure. We Do: repair its cause. You Do: prove the fix with a new input.</p><p><a href=\"../lp08a-errors-and-debugging/README.md\">Lesson packet</a> · <a href=\"../lp08a-errors-and-debugging/run-of-show.md\">Mentor plan</a> · <a href=\"../lp08a-errors-and-debugging/leetcode-valid-parentheses.md\">Class LeetCode solve</a></p>",
      "notes": {
        "timing": "3 min",
        "talking": "Ask for a Week 7 file bug. Use kitchen examples so nobody needs to paste graded work.",
        "question": "What did your last error message tell you?",
        "failure": "If no one has a bug story, offer a missing station key.",
        "action": "Ask for one prediction before running any code."
      }
    },
    {
      title: "Read a traceback from the bottom",
      "html": "<h2>Read a traceback from the bottom</h2><pre class=\"cmd\"><code>def announce(notes):\n    return notes[&quot;Grill&quot;]\n\nprint(announce({}))</code></pre><p>Last line: exception class and message. Above it: the failing line, then the caller. Follow the evidence back into your code.</p><details class=\"reveal\"><summary>Predict: does print receive a value?</summary><div>No. The dictionary lookup raises <code>KeyError</code> before announce can return.</div></details>",
      "notes": {
        "timing": "6 min",
        "talking": "I Do. Run the tiny scratch program to show a real traceback. Locate the lookup and its caller.",
        "question": "Which line names the exception, and which points into your function?",
        "failure": "Do not paste a long traceback into a slide; open the small scratch file.",
        "action": "Have a learner identify the failing expression."
      },
      "companions": [
        "traceback_w8",
        "exception_w8"
      ]
    },
    {
      title: "Different failures need different questions",
      "html": "<h2>Different failures need different questions</h2><p><code>KeyError</code>: missing key. <code>IndexError</code>: unavailable position. <code>TypeError</code>: unsupported type. <code>ValueError</code>: unusable value.</p><p><code>ZeroDivisionError</code>: zero divisor. <code>FileNotFoundError</code>: missing path. <code>NameError</code>: undefined name.</p><pre class=\"cmd\"><code>int(&quot;grill&quot;)       # ValueError\n3 + &quot;2&quot;            # TypeError\n[][0]              # IndexError</code></pre><details class=\"reveal\"><summary>Predict: does every wrong answer raise?</summary><div>No. A logic error can finish normally. A syntax error stops broken source from starting.</div></details>",
      "notes": {
        "timing": "4 min",
        "talking": "I Do then We Do. Read examples rather than running them as one script; the first failure would stop it.",
        "question": "What distinguishes a bad type from a bad value?",
        "failure": "If students confuse syntax and runtime, contrast a missing colon with a missing key.",
        "action": "Ask students to classify one fresh failing expression."
      }
    },
    {
      title: "Catch the failure you can handle",
      "html": "<h2>Catch the failure you can handle</h2><pre class=\"cmd\"><code>try:\n    note = notes[station]\nexcept KeyError:\n    note = &quot;No note&quot;</code></pre><p>Keep the risky block small. Missing data may have a fallback; unrelated caller mistakes should stay visible.</p><details class=\"reveal\"><summary>Predict: what if station is []?</summary><div><code>TypeError</code> propagates. The handler catches only <code>KeyError</code>.</div></details>",
      "notes": {
        "timing": "6 min",
        "talking": "We Do. Compare missing key, present empty string, and unhashable key. Walk station_note.",
        "question": "Why would except Exception hide useful evidence here?",
        "failure": "If a fallback replaces an empty string, distinguish absent data from empty data.",
        "action": "Ask learners to name the exact recoverable failure."
      },
      "companions": [
        "handler_w8"
      ]
    },
    {
      title: "Success, failure, and cleanup",
      "html": "<h2>Success, failure, and cleanup</h2><pre class=\"cmd\"><code>try:\n    result = operation()\nexcept ValueError:\n    print(&quot;Bad value&quot;)\nelse:\n    print(&quot;Success&quot;)\nfinally:\n    cleanup()</code></pre><p><code>else</code> runs after a successful try. <code>finally</code> runs as control leaves, including on return or an unhandled exception.</p><details class=\"reveal\"><summary>Predict: operation raises TypeError</summary><div>Cleanup runs, then TypeError continues to the caller. Neither except ValueError nor else runs.</div></details>",
      "notes": {
        "timing": "6 min",
        "talking": "We Do. Trace success, handled failure, and unhandled failure. Explain that a return in finally can suppress errors.",
        "question": "What happens to an exception if finally returns a value?",
        "failure": "If learners put success work inside try, explain how it broadens the handler accidentally.",
        "action": "Run run_with_cleanup from the code-along and predict the caller recovery."
      },
      "companions": [
        "finally_w8"
      ]
    },
    {
      title: "Raise a useful error",
      "html": "<h2>Raise a useful error</h2><pre class=\"cmd\"><code>label = text.strip()\nif not label:\n    raise ValueError(&quot;label required&quot;)</code></pre><p>Your function can enforce its own contract. The caller decides how to recover.</p><pre class=\"cmd\"><code>except ValueError as error:\n    raise ValueError(&quot;invalid service date&quot;) from error</code></pre><details class=\"reveal\"><summary>Predict: why keep from error?</summary><div>The traceback retains the original cause while the new message adds domain context.</div></details>",
      "notes": {
        "timing": "5 min",
        "talking": "I Do then We Do. The second snippet belongs after a try around datetime.strptime. It is not a standalone program.",
        "question": "Should a required blank label silently become unknown?",
        "failure": "If learners raise text directly, show that raise needs an exception object.",
        "action": "Compare a blank label with an impossible date."
      },
      "companions": [
        "raise_w8"
      ]
    },
    {
      title: "Return to last week's files",
      "html": "<h2>Return to last week's files</h2><pre class=\"cmd\"><code>try:\n    with open(path, encoding=&quot;utf-8&quot;) as handle:\n        text = handle.read()\nexcept FileNotFoundError:\n    text = &quot;&quot;</code></pre><p>Only an optional missing file becomes empty data. Permission failures and encoding failures need their own evidence. The with block closes an opened handle.</p><details class=\"reveal\"><summary>Predict: what if path names a directory?</summary><div>An operating-system error surfaces. Missing and unreadable are different failures.</div></details>",
      "notes": {
        "timing": "5 min",
        "talking": "We Do. Reconnect to Week 7 and the read_optional exercise. All checks use temporary files.",
        "question": "When is empty data a reasonable recovery?",
        "failure": "If students catch OSError broadly, ask whether denied access should look like an empty menu.",
        "action": "Ask for a test beyond a missing file."
      }
    },
    {
      title: "Debug one cause at a time",
      "html": "<h2>Debug one cause at a time</h2><pre class=\"cmd\"><code>if index &lt;= len(labels):\n    return labels[index]</code></pre><p>Reproduce → shrink → inspect → repair → verify. Put a breakpoint before the condition and inspect index and length, or print them.</p><details class=\"reveal\"><summary>Predict: labels=[], index=0</summary><div><code>0 &lt;= 0</code> enters the branch and raises IndexError. Repair with <code>0 &lt;= index &lt; len(labels)</code>, then check negative and valid indices.</div></details>",
      "notes": {
        "timing": "5 min",
        "talking": "We Do. Show a breakpoint and step-over in the available editor; use print if debugger setup is missing.",
        "question": "What is the smallest failing case?",
        "failure": "Do not alter several lines while investigating one boundary.",
        "action": "Have a learner propose a valid case that the repair must preserve."
      },
      "companions": [
        "guard_w8"
      ]
    },
    {
      title: "Log the context you need",
      "html": "<h2>Log the context you need</h2><pre class=\"cmd\"><code>import logging\nlogging.basicConfig(level=logging.INFO)\nlogger = logging.getLogger(__name__)\nlogger.warning(&quot;Missing station: %s&quot;, station)</code></pre><p>DEBUG: detail. INFO: progress. WARNING: recoverable issue. ERROR: failed operation. CRITICAL: severe failure.</p><p>Inside an except block, <code>logger.exception(\"Read failed\")</code> includes the traceback. Configure once at the program entry point.</p><details class=\"reveal\"><summary>Predict: does a normal lookup need a warning?</summary><div>No. Log the missing station only. Keep sensitive data out of logs.</div></details>",
      "notes": {
        "timing": "5 min",
        "talking": "I Do then We Do. Run logged_lookup and explain stderr versus stdout ordering. Use lazy formatting arguments.",
        "question": "Why pass a station name with the warning?",
        "failure": "If no INFO output appears, explain the default WARNING threshold and entry-point configuration.",
        "action": "Let a learner choose warning versus exception for two examples."
      },
      "companions": [
        "logging_w8"
      ]
    },
    {
      title: "Check the Python environment",
      "html": "<h2>Check the Python environment</h2><p>A virtual environment keeps project packages separate. pip installs packages into an environment.</p><p><code>csv</code>, <code>datetime</code>, and <code>logging</code> already ship with Python. This lesson needs no install.</p><p>Use the <a href=\"https://github.com/StrayDogSyn/python-fall26-code-alongs#getting-started\">existing setup guide</a> when creating or activating your environment.</p><details class=\"reveal\"><summary>Predict: should you pip install logging?</summary><div>No. It is in the standard library. First check which Python and environment your editor is using.</div></details>",
      "notes": {
        "timing": "3 min",
        "talking": "Keep this conceptual; do not turn tonight into package installation. The course introduces third-party API libraries later.",
        "question": "What problem does an isolated environment solve?",
        "failure": "If an import fails, inspect the active interpreter before editing a working program.",
        "action": "Ask learners to name a module that needs no download."
      }
    },
    {
      title: "Match the vocabulary",
      "html": "<h2>Match the vocabulary</h2><p>Pair each term with its meaning, then give a kitchen example.</p><div data-match=\"w8\"></div>",
      "notes": {
        "timing": "3 min",
        "talking": "We Do. Let learners pair the terms before showing the definitions.",
        "question": "Which term describes cleanup on both success and failure?",
        "failure": "Use the text walkthrough if the interactive activity cannot run.",
        "action": "Ask one learner to contrast raise and except."
      }
    },
    {
      title: "Your turn: make a failure useful",
      "html": "<h2>Your turn: make a failure useful</h2><p>Choose a Warm-up or Fix it in <a href=\"../lp08a-errors-and-debugging/practice.py\">practice.py</a>.</p><pre class=\"cmd\"><code>python lp08a-errors-and-debugging/check.py</code></pre><p>Every exercise reports PASS, FAIL, or NOT STARTED. Open <a href=\"../lp08a-errors-and-debugging/hints.md\">one hint</a> at a time.</p><details class=\"reveal\"><summary>Predict: an untouched starter</summary><div>Eleven NOT STARTED lines. Then prove that your first repair handles an edge case while keeping a valid case correct.</div></details>",
      "notes": {
        "timing": "8 min",
        "talking": "You Do. Give quiet work time and offer a first hint before a reference answer.",
        "question": "Which failure are you handling, and which should propagate?",
        "failure": "If TODO seems like a defect, explain that it marks unimplemented work.",
        "action": "Ask learners to explain a test input before editing."
      }
    },
    {
      title: "Class solve: Valid Parentheses",
      "html": "<h2>Class solve: Valid Parentheses</h2><p><a href=\"https://leetcode.com/problems/valid-parentheses/\">LeetCode 20 · Easy</a>. Track the closer you expect next in a list stack. See the <a href=\"../lp08a-errors-and-debugging/leetcode-valid-parentheses.md\">class walkthrough</a>.</p><pre class=\"cmd\"><code>elif stack.pop() != char:\n    return False</code></pre><details class=\"reveal\"><summary>Predict: text begins with ]</summary><div>An empty stack raises IndexError. Guard with <code>not stack or stack.pop() != char</code>. Finish by checking that no expected closers remain.</div></details><p>I Do: hand trace. We Do: reproduce and repair. You Do: test crossed nesting and leftover openers.</p>",
      "notes": {
        "timing": "12 min",
        "talking": "Use the companion guide. Allow students to discover the empty-stack case before revealing the guard. Explain short-circuit or.",
        "question": "Why can matching counts still accept crossed nesting?",
        "failure": "If time is short, trace only the leading closer and assign the remaining cases.",
        "action": "Have learners add the final not stack return, then explain O(n) time and space."
      }
    },
    {
      title: "Week 8 check",
      "html": "<h2>Week 8 check</h2><div data-quiz=\"w8\"></div><p>Explain a reason after each choice.</p>",
      "notes": {
        "timing": "5 min",
        "talking": "Use the quiz as an exit check, not a speed competition. Ask for reasoning and one counterexample.",
        "question": "Can your chosen recovery hide a different bug?",
        "failure": "If the quiz widget fails, read questions from the source or walkthrough.",
        "action": "Collect one explanation of finally and one of a specific handler."
      }
    },
    {
      title: "Before next session",
      "html": "<h2>Before next session</h2><p>Save one repair and its smallest failing input. Explain what changed and how you verified it.</p><p>Then try <code>collect_dates</code> or <code>run_with_cleanup</code>. Use the <a href=\"../lp08a-errors-and-debugging/week08-walkthrough.md\">walkthrough</a> for missed-class review.</p><p>Next official topic: External Libraries and APIs. Today's selective recovery will help when a network request fails.</p><details class=\"reveal\"><summary>Exit prompt: one new input</summary><div>Choose an input that would expose a plausible wrong repair. Explain the expected outcome before running it.</div></details>",
      "notes": {
        "timing": "4 min",
        "talking": "Close on evidence: failure, cause, recovery policy, and new check. No recording or Notebook artifact is claimed.",
        "question": "What would convince you the bug is fixed?",
        "failure": "Do not turn the wrap-up into a graded assignment solution.",
        "action": "Ask everyone for one next practice step."
      },
      "unlockAll": true
    }
  ],
  "quizzes": {
    "w8": [
      {
        "q": "Where should you begin reading a traceback?",
        "options": [
          {
            "text": "The final exception class and message",
            "correct": true
          },
          {
            "text": "Ignore it and retry"
          },
          {
            "text": "Only the first file listed"
          }
        ],
        "why": "Then follow the relevant frames upward into your source."
      },
      {
        "q": "A dictionary key is missing. Which specific exception fits?",
        "options": [
          {
            "text": "KeyError",
            "correct": true
          },
          {
            "text": "IndexError"
          },
          {
            "text": "NameError"
          }
        ],
        "why": "An absent dictionary key raises KeyError."
      },
      {
        "q": "When does else run after try?",
        "options": [
          {
            "text": "When try finishes without an exception",
            "correct": true
          },
          {
            "text": "After every except"
          },
          {
            "text": "Only after finally"
          }
        ],
        "why": "An exception in else is outside the preceding handlers."
      },
      {
        "q": "When try returns, what happens to finally?",
        "options": [
          {
            "text": "It runs before the function leaves",
            "correct": true
          },
          {
            "text": "It is skipped"
          },
          {
            "text": "It repeats the try"
          }
        ],
        "why": "Avoid returning from finally because it can replace results or suppress failures."
      },
      {
        "q": "Why catch FileNotFoundError rather than every Exception?",
        "options": [
          {
            "text": "Other failures should remain visible",
            "correct": true
          },
          {
            "text": "All exceptions mean a missing file"
          },
          {
            "text": "It installs the file"
          }
        ],
        "why": "A directory or unreadable file is different from a missing optional file."
      },
      {
        "q": "How should a required blank label be rejected?",
        "options": [
          {
            "text": "Raise a ValueError with a useful message",
            "correct": true
          },
          {
            "text": "Return a success placeholder"
          },
          {
            "text": "Use except: pass"
          }
        ],
        "why": "A caller can handle a clear contract violation."
      },
      {
        "q": "What records an active traceback from an except block?",
        "options": [
          {
            "text": "logger.exception(...)",
            "correct": true
          },
          {
            "text": "logger.info(...) always"
          },
          {
            "text": "print never returns"
          }
        ],
        "why": "logger.exception logs at ERROR and includes exception details."
      },
      {
        "q": "Why guard a stack before pop?",
        "options": [
          {
            "text": "An empty stack cannot supply an item",
            "correct": true
          },
          {
            "text": "Lists cannot store text"
          },
          {
            "text": "pop sorts a list"
          }
        ],
        "why": "A leading closer should produce False rather than IndexError."
      },
      {
        "q": "Which listed tool needs no pip install?",
        "options": [
          {
            "text": "logging",
            "correct": true
          },
          {
            "text": "Every import needs pip"
          },
          {
            "text": "A virtual environment downloads all packages"
          }
        ],
        "why": "logging is part of the standard library."
      }
    ]
  },
  "matches": {
    "w8": [
      {
        "term": "Traceback",
        "meaning": "The call path and location recorded when an exception escapes."
      },
      {
        "term": "Exception",
        "meaning": "An object describing a runtime failure."
      },
      {
        "term": "Exception handler",
        "meaning": "An except block that responds to a matching exception."
      },
      {
        "term": "raise",
        "meaning": "A statement that signals an exception."
      },
      {
        "term": "finally",
        "meaning": "A cleanup block run as control leaves a try statement."
      }
    ]
  }
};
