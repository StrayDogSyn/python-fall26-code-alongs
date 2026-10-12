# W2 | Data structures and files | Fall 26

This is the canonical Gemini Notebook source for Week 2. It provides worked examples and independent questions without revealing the `practice.py` answers. Run Python locally to verify generated output.

## Learning targets

By the end of this week, you can choose among lists, dictionaries, tuples, and sets; access and update a collection; explain duplicate handling; and write and read a UTF-8 text file with a safe path.

## 1. Lists: ordered, changeable sequences

Use a list when order matters and items may be added or changed. Indexes start at zero. Accessing an index that does not exist raises `IndexError`.

```python
names = ['Maya', 'Luis']
print(names[0])       # Maya
names.append('Ari')
print(names)          # ['Maya', 'Luis', 'Ari']
```

**Predict:** What is `names[1]` after the append? What would `names[3]` do? Explain without running first.

## 2. Dictionaries: keys to values

Use a dictionary for a lookup such as participant name to score. Keys must be unique in one dictionary; assigning an existing key replaces its value. Looking up a missing key with square brackets raises `KeyError`; `.get(key)` returns `None` by default when the key is absent.

```python
scores = {'Maya': 82, 'Luis': 75}
scores['Ari'] = 91
print(scores['Maya'])        # 82
print(scores.get('Sam'))     # None
```

**Predict:** What is `scores['Ari']`? What would happen with `scores['Sam']`? How would you avoid that error if “not found” is expected?

## 3. Tuples and sets

A tuple is an ordered sequence you do not intend to change. It supports indexing but not item assignment. A set stores unique items and is useful for membership or removing duplicates; do not rely on set iteration order.

```python
meeting_time = (20, 0)  # hour, minute
print(meeting_time[0])   # 20

tags = {'python', 'remote', 'python'}
print(len(tags))         # 2
print('remote' in tags)  # True
```

`meeting_time[0] = 19` raises `TypeError`. `list(set(names))` removes duplicates but can scramble the original order. If order matters, use a list plus a set to remember which names you have seen.

**Predict:** If the tag `'remote'` is added again, what is `len(tags)`? Why?

## 4. Choosing a collection

| Need | Choose | Why |
| --- | --- | --- |
| Participants in sign-in order | list | Order and append matter. |
| Name → score lookup | dictionary | A key identifies the value. |
| Fixed hour and minute | tuple | A small ordered pair stays together. |
| Unique topic tags | set | Membership and uniqueness matter. |

No collection is “best” everywhere. State the task first, then choose the operations you need.

## 5. Files: a round trip

A file path tells Python where data lives. `Path(__file__).with_name(...)` places a demo file beside the script, regardless of the terminal's current folder. `write_text` replaces the file's prior contents. `read_text` reads it back. `encoding='utf-8'` makes the text encoding explicit.

```python
from pathlib import Path

path = Path(__file__).with_name('attendance-demo.txt')
names = ['Maya', 'Luis']
path.write_text('\n'.join(names) + '\n', encoding='utf-8')
loaded_names = path.read_text(encoding='utf-8').splitlines()
print(loaded_names)  # ['Maya', 'Luis']
```

The `\n` between names creates separate lines. The final `\n` ends the last line cleanly. `splitlines()` returns a list of lines without their line-ending characters. If the file does not exist, `read_text` raises `FileNotFoundError`. Writing to a path may fail if the folder is missing or unwritable.

**Predict:** What exact lines are saved if `names` becomes `['Maya', 'Luis', 'Ari']`? What does `splitlines()` return? What changes if `write_text` runs twice with different names?

## We Do: build a tiny roster

Start with `names = ['Maya', 'Luis']` and `scores = {'Maya': 82, 'Luis': 75}`. Add `'Ari'` to the list and assign a score in the dictionary. Predict `names[2]` and `scores['Ari']`; then run the code. Add `'Maya'` to the names list again and discuss why a set can detect the duplicate, but a plain `set(names)` would not preserve sign-in order. Save the names to a file and inspect the exact lines.

## You Do: independent transfer

Open `practice.py`. Implement `unique_names(names)` so it preserves the first occurrence order, `highest_score(scores)` so it returns the name with the highest score, and `save_names(path, names)` so it writes one name per line. The docstrings specify the empty-input behavior. Predict two results, run the checks, then add a case of your own. Ask the notebook for a hint or error explanation, not a completed solution.

## Check your understanding

1. Why does `names[0]` use a number while `scores['Maya']` uses a name?
2. What happens when you assign the same dictionary key twice?
3. Why might `list(set(names))` be wrong for sign-in order?
4. Which structure fits a fixed `(hour, minute)` pair?
5. What does `write_text` do to a file that already exists?
6. How can you confirm that written data can be read back correctly?

For extra practice, use [Python Essentials: Bridge the Dream](https://straydogsyn.github.io/Python-Essentials-Bridge-The-Dream/) by **topic**, since its earlier cohort's week order may differ.
