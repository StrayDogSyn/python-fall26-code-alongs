# LP 06A | Functions & Scope | Fall 26

This is source text Hunter can add to the cohort Gemini Notebook. No upload or generated Notebook artifact is claimed. The packet uses event and library examples so public reference code does not solve the graded Week 6 work.

## Learning targets

Define a small function, choose parameter names, call it with positional and keyword arguments, use a default when an argument is omitted, return a value, recognize local and outer names, write a useful docstring, and refactor repeated event text into named helpers.

## 1. A function has a caller

`shelf_tag(title, shelf)` returns a library label. The caller chooses the two argument values. A returned string can be printed, stored, or passed to another function. **Predict:** What is returned for title `Night Sky` and shelf `Science`? What does a call with one missing required argument do?

## 2. Defaults and keyword arguments

`postcard(city, stamp="standard")` uses the default stamp only when the caller omits that argument. A keyword call, `postcard("Detroit", stamp="express")`, names the chosen change. **Predict:** Is an explicitly empty stamp replaced by `"standard"`?

## 3. Return versus print

`announce_tag` prints a line and has no return statement, so its caller receives `None`. The practice `repair_price_line` asks for returned text; its example and edge case are printed in the spec. **Predict:** Why does a test that compares a return value fail even if a human sees the right line in the terminal?

## 4. Scope and shadowing

The module-level `theme` is `"sky"`. A nested function can assign its own `theme` without replacing the module name. A parameter can also be shadowed accidentally, as `repair_shadowed_prefix` shows. **Predict:** Which value stays after the nested function returns? Why is a custom prefix lost if the body assigns a new fixed prefix?

## 5. Docstrings and refactoring

A docstring gives a reader the purpose and contract of a function. A text task can be split into `agenda_line` for one event and `agenda_text` for the full block. The caller decides when to print. **Predict:** What would break if the helper printed a row but returned `None` to the outer function?

## 6. A bounded extension

A returned inner function can remember an author or a local count from the call that created it. Two calls create separate state. This is an extension after the core `def`, default, return, and scope work. **Predict:** If two counters begin at zero, does calling the first counter twice change the second counter?

## Check yourself

1. Name the difference between a parameter and an argument.
2. Say when Python uses a default value.
3. Explain what a function without `return` gives its caller.
4. Explain why an inner local name need not change an outer name.
5. Name one reason to use a helper function when formatting several agenda rows.
