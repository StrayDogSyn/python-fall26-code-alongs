/* Week 9: rebuild with python resources/slides/build.py. */
window.GLOSSARY.push(...[
  {
    "id": "library_w9",
    "term": "External distribution",
    "say": "diss-trih-BYOO-shun",
    "meaning": "A separately installed bundle of Python code.",
    "usage": "Requests is installed; json ships with Python."
  },
  {
    "id": "endpoint_w9",
    "term": "Endpoint",
    "say": "END-point",
    "meaning": "An API URL for a particular operation or resource.",
    "usage": "The board endpoint returns kitchen tickets."
  },
  {
    "id": "response_w9",
    "term": "Response",
    "say": "ree-SPONS",
    "meaning": "The status, headers, and body returned to a client.",
    "usage": "Inspect status before assuming the body is useful."
  },
  {
    "id": "json_w9",
    "term": "JSON",
    "say": "JAY-sun",
    "meaning": "A text format used to exchange structured values.",
    "usage": "Decode JSON text into Python data."
  },
  {
    "id": "schema_w9",
    "term": "Schema",
    "say": "SKEE-muh",
    "meaning": "The expected fields, types, and rules for data.",
    "usage": "This endpoint requires a tickets list."
  },
  {
    "id": "query_w9",
    "term": "Query parameter",
    "say": "KWEER-ee puh-RAM-eh-ter",
    "meaning": "A named URL query field used by an endpoint.",
    "usage": "station=Hot+line filters the board."
  },
  {
    "id": "status_w9",
    "term": "HTTP status",
    "say": "AYCH-tee-tee-PEE STAY-tus",
    "meaning": "A numeric response code describing an HTTP outcome.",
    "usage": "A 503 indicates a server failure."
  },
  {
    "id": "timeout_w9",
    "term": "Timeout",
    "say": "TYME-out",
    "meaning": "A bound on waiting for request activity.",
    "usage": "It is not a whole-download deadline."
  },
  {
    "id": "key_w9",
    "term": "API key",
    "say": "AY-pee-EYE kee",
    "meaning": "A credential used under a service's authentication rules.",
    "usage": "Read it at the boundary; never print it."
  },
  {
    "id": "page_w9",
    "term": "Pagination",
    "say": "pay-jih-NAY-shun",
    "meaning": "Splitting a result across multiple responses.",
    "usage": "Follow the documented continuation field."
  }
]);
window.DECK = {
  title: "Python Intro, Week 9: External Libraries and APIs",
  "terms": {
    "review": [
      "function",
      "list",
      "dictionary"
    ],
    "fresh": [
      "library_w9",
      "endpoint_w9",
      "response_w9",
      "json_w9",
      "schema_w9",
      "query_w9",
      "status_w9",
      "timeout_w9",
      "key_w9",
      "page_w9"
    ]
  },
  "slides": [
    {
      title: "External Libraries & APIs",
      "html": "<h2>External Libraries &amp; APIs</h2><p class=\"kicker\">Fall 26 · Week 9 · November 30</p><p class=\"lead\">The kitchen board lives somewhere else. Ask for data, inspect the reply, and keep failures visible.</p><p>I Do: trace a request. We Do: repair the boundary. You Do: prove it with an edge case.</p><p><a href=\"../lp09a-external-libraries-and-apis/README.md\">Lesson packet</a> · <a href=\"../lp09a-external-libraries-and-apis/run-of-show.md\">Mentor plan</a> · <a href=\"../lp09a-external-libraries-and-apis/leetcode-destination-city.md\">Class LeetCode solve</a></p>",
      "notes": {
        "timing": "3 min",
        "talking": "Ask for one Week 8 exception and its recovery policy. Use invented kitchen records rather than graded country data.",
        "question": "Which failures can happen before any data reaches Python?",
        "failure": "If learners bring assignment code, return to the fixture contract.",
        "action": "Collect one prediction before running anything."
      }
    },
    {
      title: "Import a tool into the right Python",
      "html": "<h2>Import a tool into the right Python</h2><p><code>json</code> is in the standard library. Requests is an external distribution installed into a Python environment.</p><pre class=\"cmd\"><code>python -m pip install -r lp09a-external-libraries-and-apis/requirements-optional.txt\npython lp09a-external-libraries-and-apis/code-along.py --requests\n# Optional public read: use --public instead of --requests</code></pre><p>Optional: prepare this before class using the existing <a href=\"https://github.com/StrayDogSyn/python-fall26-code-alongs#getting-started\">environment setup guide</a>. All exercises and the default demo work without installs or internet.</p><details class=\"reveal\"><summary>Predict: pip install json?</summary><div>No. Import the standard-library module directly. If Requests is missing after installation, check which Python the editor uses.</div></details>",
      "notes": {
        "timing": "4 min",
        "talking": "Explain import versus installation. The optional path makes real HTTP requests only to a temporary local service.",
        "question": "What does python -m pip help align?",
        "failure": "Do not spend class waiting for downloads; use the offline demo.",
        "action": "Ask learners to identify a standard-library tool and an external distribution."
      },
      "companions": [
        "library_w9"
      ]
    },
    {
      title: "Request, response, then data",
      "html": "<h2>Request, response, then data</h2><p>A client sends a GET to an endpoint. The response includes a status, headers, and a body. An API contract tells you what each part means.</p><pre class=\"cmd\"><code>response = fetch(url, params={&quot;station&quot;: &quot;Hot line&quot;}, timeout=3)\nprint(response.status_code)\nprint(type(response.text).__name__)</code></pre><p>This fragment uses the lesson's supplied fetch helper. Default fixtures open no socket; the optional Requests adapter makes local HTTP calls. A separate --public mode reads this course's public repository once.</p><details class=\"reveal\"><summary>Predict: is response.text a dictionary?</summary><div>No. It is text. Decode the body, then validate its structure.</div></details>",
      "notes": {
        "timing": "4 min",
        "talking": "I Do. Run the code-along and explicitly name the selected transport. A public API has published docs but may require credentials or impose limits.",
        "question": "Which part tells you whether the server accepted the request?",
        "failure": "Do not describe a fixture run as a public API call.",
        "action": "Have learners point to endpoint, status, and body."
      },
      "companions": [
        "endpoint_w9",
        "response_w9"
      ]
    },
    {
      title: "JSON text becomes Python values",
      "html": "<h2>JSON text becomes Python values</h2><pre class=\"cmd\"><code>import json\npayload = json.loads(&#x27;{&quot;open&quot;:true,&quot;next_page&quot;:null}&#x27;)\nprint(type(payload).__name__)\nprint(payload[&quot;next_page&quot;])</code></pre><p>Object → dict. Array → list. true/false → True/False. null → None. Decode received text with a JSON parser.</p><details class=\"reveal\"><summary>Predict the printed values</summary><div><code>dict</code> and <code>None</code>. A valid JSON root can also be a list or scalar; decoding alone does not prove the shape you need.</div></details>",
      "notes": {
        "timing": "6 min",
        "talking": "I Do. Compare the wire text with the resulting Python values. Explain json.loads versus a Response json method.",
        "question": "Why does single-quoted Python dict text fail as JSON?",
        "failure": "If learners use eval, return to the JSON parser.",
        "action": "Try an array root and ask whether it meets an object contract."
      },
      "companions": [
        "json_w9",
        "schema_w9"
      ]
    },
    {
      title: "Read the shape before the field",
      "html": "<h2>Read the shape before the field</h2><p>The known valid nested-orders.json fixture has a board object, an orders list, and a dish object in each order.</p><pre class=\"cmd\"><code>rows = raw[&quot;board&quot;][&quot;orders&quot;]\nclean = [{&quot;id&quot;: row[&quot;ticket&quot;],\n          &quot;dish&quot;: row[&quot;dish&quot;][&quot;label&quot;].strip(),\n          &quot;station&quot;: row[&quot;station&quot;].strip()}\n         for row in rows]</code></pre><p>Project the fields into new dictionaries. For unfamiliar responses, validate the wrapper and field types first.</p><details class=\"reveal\"><summary>Predict: a missing orders list versus an empty list</summary><div>Missing violates the contract; an empty list can be a valid empty board. The code-along shows a nested-record projection; ticket_titles practices required-field validation.</div></details>",
      "notes": {
        "timing": "5 min",
        "talking": "We Do. Inspect nested-orders.json, then trace clean_order_records in the code-along. Strip the labels and project into a clean list of dictionaries. Do not give a Country Explorer parser.",
        "question": "Where does the first dictionary become a list?",
        "failure": "Do not hide missing required fields with an empty default.",
        "action": "Have learners propose a wrong-shaped row."
      },
      "companions": [
        "schema_w9"
      ]
    },
    {
      title: "Query fields belong in params",
      "html": "<h2>Query fields belong in params</h2><pre class=\"cmd\"><code>requests.get(url, params={&quot;station&quot;: &quot;Hot line&quot;}, timeout=3)</code></pre><p>After importing Requests and supplying url, use the documented parameter names. The library handles URL encoding. A GET body sent with data is not the same query.</p><details class=\"reveal\"><summary>Predict the query preview</summary><div><code>station=Hot+line</code>. The encoded plus represents a space in this query. Repair repair_fetch so it passes params and timeout.</div></details>",
      "notes": {
        "timing": "5 min",
        "talking": "We Do. Show repair_fetch with its faulty data keyword, then inspect the recorded fake call.",
        "question": "Why avoid concatenating unescaped values into a URL?",
        "failure": "If Requests was not installed, use the offline callable and inspect its arguments.",
        "action": "Ask learners to name the two missing or wrong keywords."
      },
      "companions": [
        "query_w9"
      ]
    },
    {
      title: "HTTP status is one boundary",
      "html": "<h2>HTTP status is one boundary</h2><p>2xx: HTTP success. 4xx: request/client problems, including rate limits. 5xx: server failures.</p><pre class=\"cmd\"><code>response.raise_for_status()\npayload = response.json()</code></pre><p>These are native Requests methods. raise_for_status checks 4xx/5xx; it does not validate a schema or require exactly 200.</p><details class=\"reveal\"><summary>Predict: a 204 reply, or a JSON body on 503</summary><div>204 can succeed with no body. JSON on 503 can decode but still describe failure. Our board endpoint specifically requires 200 before decoding.</div></details>",
      "notes": {
        "timing": "5 min",
        "talking": "I Do. Run the native optional demo if prepared. The offline HTTPStatusError is a custom lesson class, not Requests HTTPError.",
        "question": "Can a valid JSON body accompany an HTTP error?",
        "failure": "Do not treat successful JSON decoding as a status check.",
        "action": "Ask which check belongs before decoding."
      },
      "companions": [
        "status_w9"
      ]
    },
    {
      title: "Keep failures separate",
      "html": "<h2>Keep failures separate</h2><p>Transport → HTTP → JSON syntax → shape → domain rules. Identify the boundary before choosing recovery.</p><pre class=\"cmd\"><code>try:\n    payload = request_object(fetch, url, {})\n    titles = ticket_titles(payload)\nexcept TimeoutError:\n    print(&quot;Try later&quot;)</code></pre><p>This fragment uses the exercise helpers. Native Requests has its own Timeout and RequestException classes; the adapter translates them for our offline checks.</p><details class=\"reveal\"><summary>Predict: empty success versus timeout</summary><div><code>([], None)</code> versus <code>([], \"timeout\")</code>. Catch subclasses first. A timeout bounds waiting for activity, not the total download duration.</div></details>",
      "notes": {
        "timing": "7 min",
        "talking": "We Do. Trace safe_board. TimeoutError subclasses OSError; JSONDecodeError and our status exception subclass ValueError. Catch specific cases first.",
        "question": "Which failure is lost if ValueError is caught first?",
        "failure": "Avoid except Exception returning an empty success.",
        "action": "Ask for one failing input per boundary."
      },
      "companions": [
        "timeout_w9"
      ]
    },
    {
      title: "We Do: false is not \"false\"",
      "html": "<h2>We Do: false is not \"false\"</h2><pre class=\"cmd\"><code>rows = [{&quot;item&quot;: &quot;Soup&quot;, &quot;available&quot;: True},\n        {&quot;item&quot;: &quot;Tart&quot;, &quot;available&quot;: &quot;false&quot;}]\n[row[&quot;item&quot;] for row in rows if row.get(&quot;available&quot;)]</code></pre><p>Both values are truthy. The schema requires the actual Boolean True.</p><details class=\"reveal\"><summary>Predict the bug and repair</summary><div>The faulty filter includes Tart. Use <code>row.get(\"available\") is True</code>. Equality also accepts integer 1, which this contract rejects.</div></details>",
      "notes": {
        "timing": "4 min",
        "talking": "We Do. Remove the repair_available TODO, run its existing bug, then use the failure to choose a repair.",
        "question": "What is bool(\"false\")?",
        "failure": "If == True seems enough, show the integer 1 counterexample.",
        "action": "Ask learners for a third value that should not pass."
      }
    },
    {
      title: "Keys belong at the boundary",
      "html": "<h2>Keys belong at the boundary</h2><pre class=\"cmd\"><code>import os\nkey = os.environ.get(&quot;KITCHEN_API_KEY&quot;)\nif not key:\n    raise ValueError(&quot;key required&quot;)</code></pre><p>This fragment checks for a caller-supplied environment value; no real key is needed for class. Follow each service's authentication documentation. Our api_headers exercise models one Bearer-header contract.</p><details class=\"reveal\"><summary>Predict: should you print the headers?</summary><div>No. Keep keys out of shared screens, logs, source, and URLs. The local demo does not use a key.</div></details>",
      "notes": {
        "timing": "4 min",
        "talking": "I Do. Discuss key handling without entering any live value. A public API can still need credentials.",
        "question": "Does a key promise unlimited usage?",
        "failure": "Ask for a redacted example if a learner needs help.",
        "action": "Have learners identify where the real key would enter the program."
      },
      "companions": [
        "key_w9"
      ]
    },
    {
      title: "One page may not be all the data",
      "html": "<h2>One page may not be all the data</h2><pre class=\"cmd\"><code>payload = {&quot;tickets&quot;: [], &quot;next_page&quot;: 2}</code></pre><p>Follow the documented continuation. Empty results alone do not prove you reached the last page. Repeated IDs across pages should not duplicate tickets.</p><details class=\"reveal\"><summary>Predict: what ends this pagination contract?</summary><div><code>next_page: null</code>. next_page validates the field; merge_tickets keeps the first row for each ID. A production loop also needs a page limit and repeated-page protection.</div></details>",
      "notes": {
        "timing": "3 min",
        "talking": "We Do. Inspect board.json and page-two.json. Show the repeated ID and an added ticket.",
        "question": "Should equal dish names mean equal tickets?",
        "failure": "Do not imply this lesson implements an unbounded pagination loop.",
        "action": "Ask learners to explain why IDs matter."
      },
      "companions": [
        "page_w9"
      ]
    },
    {
      title: "Match the vocabulary",
      "html": "<h2>Match the vocabulary</h2><p>Pair terms with meanings, then give an example from the board.</p><div data-match=\"w9\"></div>",
      "notes": {
        "timing": "3 min",
        "talking": "Let learners work in pairs and explain one pairing.",
        "question": "What distinguishes an endpoint from a response?",
        "failure": "Use the walkthrough if the widget is unavailable.",
        "action": "Ask each learner to name one boundary."
      }
    },
    {
      title: "Your turn: prove a boundary",
      "html": "<h2>Your turn: prove a boundary</h2><p>Choose a Warm-up or Fix it in <a href=\"../lp09a-external-libraries-and-apis/practice.py\">practice.py</a>.</p><pre class=\"cmd\"><code>python lp09a-external-libraries-and-apis/check.py</code></pre><p>Use <a href=\"../lp09a-external-libraries-and-apis/hints.md\">one hint</a> at a time. All eleven checks work offline.</p><details class=\"reveal\"><summary>Predict the untouched starter</summary><div>Eleven NOT STARTED results. Try a normal case and a counterexample before reading the reference.</div></details>",
      "notes": {
        "timing": "12 min",
        "talking": "You Do. Allow quiet work time. The supplied fetch and Response helpers are scaffolding, not new exercises to implement.",
        "question": "Which input distinguishes your repair from the original bug?",
        "failure": "If setup is blocked, use the offline path immediately.",
        "action": "Collect one explanation of a checked edge case."
      }
    },
    {
      title: "Class solve: Destination City",
      "html": "<h2>Class solve: Destination City</h2><p><a href=\"https://leetcode.com/problems/destination-city/description/\">LeetCode 1436 · Easy</a>. Reason about structured records after they are available. LeetCode supplies the list directly.</p><pre class=\"cmd\"><code>paths = [[&quot;B&quot;, &quot;C&quot;], [&quot;A&quot;, &quot;B&quot;]]\n# Wrong guess: paths[-1][1]</code></pre><details class=\"reveal\"><summary>Predict the answer before writing code</summary><div><code>C</code>, not B. Build a set of all origins, then find a destination absent from it. Row order is not route order.</div></details><p>I Do: trace. We Do: reject the last-row guess. You Do: finish the condition and test reordered rows. See the <a href=\"../lp09a-external-libraries-and-apis/leetcode-destination-city.md\">class guide</a>.</p>",
      "notes": {
        "timing": "12 min",
        "talking": "Use the twelve-minute companion. Keep network requests out of the LeetCode submission. Explain the single-chain guarantee.",
        "question": "Why must we collect all origins before checking destinations?",
        "failure": "If learners sort city names, show that alphabetical order is unrelated to route order.",
        "action": "Have learners supply the final condition and a one-leg test."
      }
    },
    {
      title: "Week 9 check",
      "html": "<h2>Week 9 check</h2><div data-quiz=\"w9\"></div><p>Give a reason after every choice.</p>",
      "notes": {
        "timing": "5 min",
        "talking": "Ask for one concrete counterexample after a wrong answer.",
        "question": "Can valid JSON still describe a failed request?",
        "failure": "Read the questions aloud if interaction is unavailable.",
        "action": "Collect one distinction between transport, HTTP, and data shape."
      }
    },
    {
      title: "Save the evidence, then mentor support",
      "html": "<h2>Save the evidence, then mentor support</h2><p>Spend two minutes saving one repair and its failing input. Use the remaining six minutes for blockers.</p><p><a href=\"../lp09a-external-libraries-and-apis/week09-walkthrough.md\">Walkthrough</a> · <a href=\"../lp09a-external-libraries-and-apis/notebook-source.md\">Study source</a> · <a href=\"../lp09a-external-libraries-and-apis/sources.md\">Primary technical references</a></p><details class=\"reveal\"><summary>Exit prompt: what changed?</summary><div>Name the boundary, the input that exposed it, the recovery policy, and the check that now proves the result.</div></details>",
      "notes": {
        "timing": "8 min",
        "talking": "Use two minutes for wrap and six for mentor support. The full Week 9 instructions are compared in the overlap checklist. Flag keyless wording versus required country-key setup and the common/official sample mismatch. The next official weeks are the final project.",
        "question": "What remains uncertain about a real service's contract?",
        "failure": "Do not claim an upload, recording, or public deployment exists.",
        "action": "Ask everyone for one next practice step."
      },
      "unlockAll": true
    }
  ],
  "quizzes": {
    "w9": [
      {
        "q": "Which tool ships with Python?",
        "options": [
          {
            "text": "json",
            "correct": true
          },
          {
            "text": "Requests"
          },
          {
            "text": "Every pip package"
          }
        ],
        "why": "json is standard-library code; Requests is an external distribution."
      },
      {
        "q": "What can a decoded JSON root be?",
        "options": [
          {
            "text": "A dictionary, list, or another JSON value",
            "correct": true
          },
          {
            "text": "Only a dictionary"
          },
          {
            "text": "Always a string"
          }
        ],
        "why": "Check the root type after syntax succeeds."
      },
      {
        "q": "Where do documented GET query fields go in Requests?",
        "options": [
          {
            "text": "params=",
            "correct": true
          },
          {
            "text": "data= instead"
          },
          {
            "text": "In the timeout argument"
          }
        ],
        "why": "params encodes URL query values."
      },
      {
        "q": "Can HTTP 503 have a valid JSON body?",
        "options": [
          {
            "text": "Yes",
            "correct": true
          },
          {
            "text": "No"
          },
          {
            "text": "Only if the request succeeded"
          }
        ],
        "why": "Syntax success is separate from HTTP success."
      },
      {
        "q": "Why avoid blindly decoding a 204 response?",
        "options": [
          {
            "text": "It can have no body",
            "correct": true
          },
          {
            "text": "204 always means bad JSON"
          },
          {
            "text": "204 means a failed login"
          }
        ],
        "why": "HTTP success does not guarantee a JSON document."
      },
      {
        "q": "What does a Requests timeout guarantee?",
        "options": [
          {
            "text": "A limit on waiting for connection/read activity",
            "correct": true
          },
          {
            "text": "A total download deadline"
          },
          {
            "text": "A retry will happen"
          }
        ],
        "why": "The timeout is not a total wall-clock bound."
      },
      {
        "q": "Which availability value meets the exercise contract?",
        "options": [
          {
            "text": "The Boolean True",
            "correct": true
          },
          {
            "text": "The string \"false\""
          },
          {
            "text": "The integer 1"
          }
        ],
        "why": "Truthiness and equality are too broad for this schema."
      },
      {
        "q": "Where should a real key come from in this lesson?",
        "options": [
          {
            "text": "An environment value at the caller",
            "correct": true
          },
          {
            "text": "A committed literal"
          },
          {
            "text": "A shared-screen printout"
          }
        ],
        "why": "The local demo needs no key; avoid exposing real credentials."
      },
      {
        "q": "Why collect every origin before checking a route destination?",
        "options": [
          {
            "text": "A later row may contain that city as an origin",
            "correct": true
          },
          {
            "text": "Rows are alphabetical"
          },
          {
            "text": "The last row is always the final leg"
          }
        ],
        "why": "Input row order is arbitrary; membership uses the whole data set."
      }
    ]
  },
  "matches": {
    "w9": [
      {
        "term": "Endpoint",
        "meaning": "An API URL for a particular operation or resource."
      },
      {
        "term": "Response",
        "meaning": "The status, headers, and body returned to a client."
      },
      {
        "term": "JSON",
        "meaning": "A text format used to exchange structured values."
      },
      {
        "term": "Query parameter",
        "meaning": "A named URL query field used by an endpoint."
      },
      {
        "term": "Timeout",
        "meaning": "A bound on waiting for request activity."
      }
    ]
  }
};
