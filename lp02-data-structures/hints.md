# LP 02 hints

Open one level at a time. Run `python lp02-data-structures/check.py` after each change.

## 1. unique_names
<details><summary>Hint 1: look</summary>The first appearance decides the position.</details>
<details><summary>Hint 2: plan</summary>Use one collection for order and another for membership.</details>
<details><summary>Hint 3: shape</summary>Append a name only when it is not in `seen`, then add it to `seen`.</details>

## 2. highest_score
<details><summary>Hint 1: look</summary>The first tied name must stay the winner.</details>
<details><summary>Hint 2: plan</summary>Track the current name and its score while visiting `.items()`.</details>
<details><summary>Hint 3: shape</summary>Update only when a new score is strictly greater than the best one.</details>

## 3. save_names
<details><summary>Hint 1: look</summary>Nonempty files end with a newline; empty files stay empty.</details>
<details><summary>Hint 2: plan</summary>Join the names before writing, then add one final line ending.</details>
<details><summary>Hint 3: shape</summary>Use `"\n".join(names)` and write with `encoding="utf-8"`.</details>

## 4. load_names
<details><summary>Hint 1: look</summary>The given code returns raw lines and fails on a missing file.</details>
<details><summary>Hint 2: plan</summary>Open as UTF-8, strip each line, and keep only nonblank names.</details>
<details><summary>Hint 3: shape</summary>Use `with open(...)` inside `try`, and catch `FileNotFoundError` to return `[]`.</details>

## 5. word_counts
<details><summary>Hint 1: look</summary>`Cat` and `cat` count as one key.</details>
<details><summary>Hint 2: plan</summary>Split into words, lowercase each one, and update a dictionary.</details>
<details><summary>Hint 3: shape</summary>`counts.get(word, 0)` supplies the starting count.</details>

## 6. ranked
<details><summary>Hint 1: look</summary>High scores come first; tied names use alphabetical order.</details>
<details><summary>Hint 2: plan</summary>Sort dictionary items using both score and name.</details>
<details><summary>Hint 3: shape</summary>A key can use a negative score for descending order and the name for ties.</details>

## 7. group_by_length
<details><summary>Hint 1: look</summary>The key is a length, and each value is a list.</details>
<details><summary>Hint 2: plan</summary>Visit words in input order and append each to its length group.</details>
<details><summary>Hint 3: shape</summary>`setdefault(length, [])` gives you a list to append to.</details>

## 8. top_n
<details><summary>Hint 1: look</summary>The given sort puts the smallest score first.</details>
<details><summary>Hint 2: plan</summary>Reverse the sort and handle a nonpositive request.</details>
<details><summary>Hint 3: shape</summary>Slice the descending list with `[:n]` after checking `n <= 0`.</details>

## 9. parse_roster
<details><summary>Hint 1: look</summary>Blank lines have no comma to split.</details>
<details><summary>Hint 2: plan</summary>Skip blanks, then unpack the name and score text.</details>
<details><summary>Hint 3: shape</summary>Strip both fields and convert the score with `int()` before assigning the key.</details>

## 10. meeting_text
<details><summary>Hint 1: look</summary>The minute in `(20, 0)` needs two digits.</details>
<details><summary>Hint 2: plan</summary>Unpack the pair into hour and minute.</details>
<details><summary>Hint 3: shape</summary>Use `:02d` for each integer in an f-string.</details>

## 11. remove_short_words
<details><summary>Hint 1: look</summary>The given loop skips a short neighbor after removing an item.</details>
<details><summary>Hint 2: plan</summary>Leave the input alone and collect the words you want to keep.</details>
<details><summary>Hint 3: shape</summary>Test `len(word) >= min_length` while building a new list.</details>
