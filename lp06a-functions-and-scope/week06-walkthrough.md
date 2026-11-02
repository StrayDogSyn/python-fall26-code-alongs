# Week 6 catch-up | Functions & Scope

Use this after class or beside the slides. Predict before each run, then compare with `python lp06a-functions-and-scope/code-along.py`. The examples use event and library text, not the graded assignment.

## 1. Give repeated work a name

`def shelf_tag(title, shelf)` names a small job. A call supplies arguments in the parameter order and gets a string back. **Predict:** What does `shelf_tag("Night Sky", "Science")` return? What happens if the call supplies only the title?

## 2. Choose a default only when omitted

`postcard(city, stamp="standard")` can be called with just a city or with `stamp="express"`. Keyword arguments make the second call easy to read. **Predict:** Which stamp appears in each call? What happens when the caller passes `stamp=""` explicitly?

## 3. Separate return from display

`announce_tag` prints text but has no return statement. Python hands its caller `None`. A function that returns text lets another caller print it, save it, or combine it with more text. **Predict:** What does `result = announce_tag("Field Guide")` store?

## 4. Trace scope by name and location

The module has `theme = "sky"`. `show_theme` reads it, while a nested function assigns another `theme` that belongs only to that nested call. The module name remains `"sky"`. **Predict:** Which `theme` survives after the call? How would a parameter with the same name change what the function sees?

## 5. Defaults are values, not storage for future calls

For a collection default, `None` is a useful marker. `add_stop(stop, stops=None)` creates a fresh list on each omitted call, so two calls do not share hidden items. **Predict:** What would be risky about a default of `[]` if the function appended to it?

## 6. Refactor a small text task

`agenda_line` formats one entry. `agenda_text` creates a heading and calls the helper for each event. The caller prints only after the text is complete. **Predict:** If the entries are `[("9 AM", "Doors"), ("10 AM", "Talk")]`, how many newline characters are in the returned text?

## 7. Read a docstring and try a local check

The triple-quoted sentence under a function definition is its docstring. Use it to state inputs, output, and important edge cases. Start with a Warm-up or Fix it task in [practice.py](practice.py), run `python lp06a-functions-and-scope/check.py`, and open [hints.md](hints.md) only as needed. A `NOT STARTED` line points to a TODO, while a `FAIL` line names the input and expected result.

**Exit check:** Explain why a printed line can look correct while the caller still receives `None`. Explain which `theme` is local to the nested function. Give one reason to split a text task into two named functions.
