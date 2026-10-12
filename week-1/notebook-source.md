# W1 | Intro to Python | Fall 26

This is the canonical Gemini Notebook source for Week 1. It contains explanations and worked examples, not the independent exercise answers. Run Python locally to verify any generated explanation or code.

## Learning targets

By the end of this week, you can identify a value's type, store it in a variable, convert numeric text when needed, choose a branch with a Boolean condition, trace a loop, write a function with a return value, and use an error message to locate a mistake.

## 1. Values, types, and variables

A **value** is data. `4` is an integer (`int`), `4.0` is a floating-point number (`float`), `'4'` is text (`str`), and `True` is a Boolean (`bool`). A **variable** is a name referring to a value. Assignment uses `=`; it does not ask a question.

```python
student = 'Maya'
sessions = 4
print(student, sessions)
print(type(sessions).__name__)  # int
```

`'4' + '2'` produces `'42'` because the values are text. `int('4') + 2` produces `6` because `int` converts numeric text to an integer first. `int('four')` raises `ValueError`; conversion needs text that represents a valid integer.

**Predict before running:** What does `print(type('7').__name__)` show? What does `print(int('7') + 1)` show? Explain why the two lines do different things.

## 2. Conditions and comparisons

A condition evaluates to `True` or `False`. `==` compares two values; `=` assigns a value to a name. Indentation groups the statements belonging to each branch.

```python
score = 72
if score >= 70:
    print('ready')
else:
    print('keep practicing')
```

The output is `ready`. Changing `score` to `69` selects the `else` branch. A common error is comparing numeric text directly with an integer, such as `'72' >= 70`; in Python 3 this raises `TypeError`. Convert input text first.

**Predict before running:** With `score = 70`, which branch runs? Which symbol in the condition means “greater than or equal to”?

## 3. Loops and state

A loop repeats a block. Track a variable's value after each pass instead of trying to read the whole loop at once.

```python
total = 0
for points in [2, 3, 4]:
    total = total + points
    print(total)
```

| Pass | `points` | `total` after update |
| --- | ---: | ---: |
| 1 | 2 | 2 |
| 2 | 3 | 5 |
| 3 | 4 | 9 |

The printed lines are `2`, `5`, and `9`. The loop body runs once per item. The variable `total` keeps its new value between passes.

**Predict before running:** If the list changes to `[2, 3, 5]`, what are the three printed lines? What is `total` after the loop?

## 4. Functions and return values

A function names a reusable action. Parameters are names for inputs. `return` sends a value back to the caller; `print` only displays a value. A function without an explicit return produces `None`.

```python
def add_bonus(score, bonus):
    return score + bonus

new_score = add_bonus(72, 5)
print(new_score)  # 77
```

In the code-along, `classify_score(score)` returns a label based on a threshold. Notice that calling a function does not run the body when the `def` line is read; the body runs when the function is called.

**Predict before running:** What will `add_bonus(70, 2)` return? What happens if the function uses `print(score + bonus)` in place of `return score + bonus`, and its caller stores the result?

## 5. Reading an error

Read a traceback from the bottom. The final line names the error, and the line above points to the code that triggered it.

```python
age_text = 'twenty'
age = int(age_text)  # ValueError: invalid literal for int()
```

For this example, inspect `age_text` first. A useful debugging loop is **predict → run → observe → change one thing → rerun**. Print a variable with `repr(value)` when invisible spaces or quotes may matter. Do not hide an exception simply to make the program appear to work.

**Try this:** Read `TypeError`, `ValueError`, and `NameError` aloud in plain English. Give one likely cause for each. Then intentionally misspell a variable and see which error Python reports.

## We Do: change one thing together

Start with `score = 68`. Predict the output of `classify_score(score)` in the code-along. Then change `score` to `75`, predict again, and run. Explain which condition changed truth value. Next, change the list in the loop to `[1, 4, 2]` and trace `total` after each pass.

## You Do: independent transfer

Open `practice.py`. Write `classify_score(score)` and `count_passing(scores)` from their docstrings. Before running, write two expected outputs on paper or in a note. Run the file, compare observed outputs, and revise one thing at a time. Do not ask an AI tutor to write the function. Ask it to question your prediction or explain an error line.

## Check your understanding

1. Why does `'5' + '2'` differ from `int('5') + 2`?
2. In `if score == 70:`, what does `==` do?
3. After `for n in [1, 2, 3]: total += n`, starting at zero, what is `total`?
4. How does `return` differ from `print`?
5. Which part of a traceback would you read first, and why?

For more practice, use the [Python Essentials: Bridge the Dream](https://straydogsyn.github.io/Python-Essentials-Bridge-The-Dream/) site by **topic**, because its earlier cohort's week numbers may differ.
