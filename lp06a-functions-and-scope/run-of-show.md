# Week 6 run of show | 90 minutes

| Time | Phase | Plan | Failure to plan for |
| --- | --- | --- | --- |
| 0 to 10 min | Check-in | Revisit a Week 5 loop result, then ask what a named function could reuse. | Students try to copy the graded refactor; keep this session's examples on event text. |
| 10 to 25 min | I Do | Predict and run `shelf_tag`, a default, and a keyword call. | A default is mistaken for a required argument; omit it once, then pass it explicitly. |
| 25 to 40 min | We Do | Compare a print-only function with a function that returns text; repair `repair_price_line`. | The printed line looks correct but the caller receives `None`; store and inspect the return. |
| 40 to 55 min | We Do | Trace local, outer, and shadowed names; repair `repair_shadowed_prefix`. | A local reassignment hides the caller's keyword argument; show the argument before and after. |
| 55 to 70 min | I Do, then pair | Read docstrings and refactor an event agenda into `agenda_line` and `agenda_text`. | Helpers are called but their returned strings are dropped; keep a visible caller result. |
| 70 to 83 min | You Do | Pick a Warm-up or Fix it, run `python lp06a-functions-and-scope/check.py`, then try a Build exercise. | A TODO traceback is mistaken for a broken check; `NOT STARTED` names the next function to edit. |
| 83 to 90 min | Exit check | Answer the deck quiz and explain one return value and one scope boundary. | If a learner answers from memory, ask them to predict a new call before revealing it. |

Keep the graded Week 6 assignment out of the live code-along and public reference. The independent packet uses event and library scenarios only.
