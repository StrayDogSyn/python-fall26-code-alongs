# Week 8 mentor session | November 23, 2026 | 90 minutes

Open the [deck](../week08/week08-slides.html), [code-along](code-along.py), [practice starter](practice.py), and [LeetCode walkthrough](leetcode-valid-parentheses.md). Run the code-along and reference check before students arrive. No downloads are needed.

| Minutes | Phase | Activity and evidence |
| --- | --- | --- |
| 0 to 9 | Check-in, I Do | Ask for a Week 7 bug story. Use the tiny traceback from the walkthrough. Learners name the class, source line, and caller. |
| 9 to 19 | I Do, We Do | Classify runtime failures and isolate the lookup. Compare KeyError recovery with an unexpected TypeError. |
| 19 to 30 | We Do | Trace try, except, else, finally on success, failure, and return. Raise a required-label error and preserve its cause in date parsing. |
| 30 to 40 | We Do | Reuse Week 7 files and investigate the index guard. Shrink a failing case; show breakpoint, variables, and one step, or use print as a fallback. |
| 40 to 51 | I Do, We Do | Configure logging once; compare warning with exception. Briefly distinguish standard library, pip, and virtual environments. Match vocabulary. |
| 51 to 59 | You Do | Pick a Warm-up or Fix it. Run the local check and explain one edge case. Offer the first hint only. |
| 59 to 71 | We Do, You Do | Solve LeetCode 20 together: trace, trigger the empty-stack error, guard it, then test nesting and leftovers. Let learners supply the final check. |
| 71 to 76 | Exit quiz | Take the nine-question deck quiz; explain the exception boundary and cleanup behavior. |
| 76 to 80 | Before next session | Save practice and name the reproduce, shrink, inspect, repair, verify cycle. |
| 80 to 90 | Mentor support | Use the remaining ten minutes for questions, slow typing, and a learner explanation of a fresh failing input. |

The deck notes total 80 teaching minutes, matching the first 80 minutes above. Reserve the final ten minutes for questions and mentor support; shorten demonstrations if earlier questions consume that buffer. For a 60-minute session: omit the environment discussion and vocabulary match, take one independent exercise, and give the bracket task as follow-up.

## Mentor heads-up

- Full Week 8 assignment text has not been supplied. The course map confirms exceptions, raise, logging, defensive programming, and environment concepts. The known warmup is numeric input validation. This packet avoids an interactive numeric-input solution. Check exact assignment overlap before sharing reference answers; do not describe unknown instructions as verified.
- Ask for the whole traceback and smallest failing input. Distinguish SyntaxError, runtime exceptions, and silent logic errors.
- Reject `except: pass` as a repair. Ask what the function should do for this specific failure, and let unrelated errors surface.
- Missing files and denied access are different. Do not substitute empty data for every OSError.
- On Windows, Week 7's append/write references now explicitly use LF newlines to match their checks. Python's default text-mode write otherwise translates LF to CRLF.
- Logging normally uses stderr, while print uses stdout. Mixed ordering does not mean the recovery ran twice.
- `finally` is for cleanup, not a place to return. For opened files prefer `with`.
- A student may think the TODO is a failed program. Eleven NOT STARTED lines are the untouched starter's expected result.

## Before students leave

Ask for one failure, its cause, the chosen recovery policy, and one new check. Do not claim a recording or Notebook artifact exists. The study source is ready for the mentor to upload.
