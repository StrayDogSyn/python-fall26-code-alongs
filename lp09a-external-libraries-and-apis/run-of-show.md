# Week 9 mentor session | November 30, 2026 | 90 minutes

Open the [slides](../week09/week09-slides.html), [code-along](code-along.py), [starter](practice.py), and [Destination City guide](leetcode-destination-city.md). Run the offline code-along and reference check before class. If using real HTTP, install the optional requirements beforehand and test `--requests`; the offline path teaches the same boundaries if installation or networking is unavailable.

| Minutes | Phase | Plan and evidence |
| --- | --- | --- |
| 0 to 7 | Check-in, I Do | Recall one Week 8 exception. Distinguish json from the external Requests distribution; show the active interpreter. |
| 7 to 17 | I Do | Trace request, response, JSON text, and Python value. Show the optional native Requests call or the fixture equivalent. |
| 17 to 27 | We Do | Read tickets from the nested payload and encode a station query. Repair data-versus-params and missing timeout. |
| 27 to 39 | I Do, We Do | Compare transport, HTTP, JSON, and shape failures. Trace handler order and the difference between empty success and failure. |
| 39 to 50 | We Do | Repair Boolean truthiness. Discuss keys without showing a real key, then continuation fields and repeated IDs. |
| 50 to 53 | Vocabulary | Match endpoint, response, JSON, query parameter, and timeout. |
| 53 to 65 | You Do | Choose one Warm-up or Fix it; run its check. Ask for one edge case before giving a hint. |
| 65 to 77 | Class LeetCode solve | Destination City: trace, reject the last-row guess, build origins, find the terminal destination, test reordered input. |
| 77 to 82 | Exit quiz | Nine questions. Require a reason for each choice. |
| 82 to 90 | Wrap and mentor support | Two minutes to save a repair and explain its evidence, then six minutes for blockers. |

## Mentor heads-up

- The complete Week 9 instructions supplied by the mentor were compared with this packet. Use kitchen records and route pairs in public examples; keep Agify and the Country Explorer implementation out of reference answers. Assignment due date: December 1. Actual graded sample data and authenticated country responses have not been inspected.
- The optional Requests demo is real HTTP to 127.0.0.1 on a temporary port. The default demo is a fixture with no network. Say which one you are running. Neither pretends to be a public API. A separately selected --public mode makes one real GET for this course's public GitHub metadata; do not run it repeatedly on a shared classroom IP. Redirects are not followed; a redirect is reported as a non-200 result so this mode really makes only one request.
- The code-along now visibly catches the fixture or real local timeout and dropped connection before comparing them with a 503 response. These failures should produce short messages, not a server traceback. An explicitly blank station query matches no rows in both modes.
- Real public services have their own contract, uptime, authentication, and limits. Read their docs and respect their published policies. No public-service availability is required for class.
- ModuleNotFoundError after an install often means the editor uses another interpreter. The optional requirements pin Requests and its tested dependencies. Do not install json with pip.
- JSONDecodeError differs from HTTPError. In our exercises, custom HTTPStatusError is a ValueError; native Requests uses its own exception classes. The adapter translation is instructor scaffolding, not a claim these classes are identical.
- A 200 response can still have invalid JSON or the wrong root. A valid JSON error body on 503 is still a failed request. A 204 response can have no body.
- A timeout is not a strict deadline for the complete request. Do not teach three seconds as a guaranteed total wall-clock limit.
- Missing data and an empty list are different states. Avoid catch-all handlers and silent fallbacks.
- The text "false" and integer 1 are not the Boolean True required by the availability schema.
- No real key is needed. If a learner needs help with a key, ask for a redacted example; never paste a key into the shared screen or repository. The example.test and classroom.test URLs are reserved classroom labels.
- The helper server listens only on loopback and closes on leaving its context. It is not meant to be hosted or exposed to a network.

## Assignment-specific support checklist

- The overview says keyless practice, while the country tasks explicitly require a REST Countries account and key. Follow the assignment's current authentication instructions; do not tell students an older keyless endpoint or v3 response layout will work.
- The requested common-name field and sample official-name field differ. The supplied sample's capitals are objects inside a list, not a list of strings. Ask students to inspect sample_countries.json and a redacted response shape before selecting fields. This packet does not publish that parser.
- A 401 suggests checking presence and header format without displaying the key. Missing environment values and changing shells or editor interpreters are separate issues.
- The assignment describes a monthly allowance. Check the student's dashboard for the current quota; do not spend requests in the input loop. Fetch once, then work on the in-memory data as instructed.
- API data changes: do not grade predicted ages, counts, or country ordering against fixed example values. Preserve request failures separately from empty data.
- The region filter requires descending population order; the search requires a case-insensitive partial match. Ask the learner to name those contracts and propose tests without giving them a ready-made implementation.
- The reflection is 3 to 5 minutes: explain JSON-to-dicts/lists, normalization, and missing data in the learner's own code. Submission needs a pull-request URL and video link. The mindset topic is Accessibility: give examples of access barriers and a concrete improvement. Remind learners about the AIRHub quiz.
- Make CLI failure messages readable and actionable; do not rely on color alone. This connects error handling with accessibility without claiming an accessibility audit was run.

## If time or setup runs short

Use the offline code-along, skip live installation, keep one checked repair, and retain the twelve-minute LeetCode block. Assign pagination and the external package installation as follow-up. The class can still demonstrate all five response boundaries.

## Before students leave

Ask for the failing boundary, one concrete input, the expected result, and the evidence that a repair worked. Link the study source for optional mentor upload; no recording, upload, or live deployment is claimed.
