# LP 03 | More Python Skills | Fall 26

This is a supplemental Gemini Notebook source for LP 03, the packet for the Week 5 live session. It contains explanations and worked examples, not the independent exercise answers. Run `python lp03-more-python-skills/check.py` locally to check each attempt.

## Learning targets

By the end of this lab, you can read a small class and name what each method owns, build list and dictionary comprehensions, explain what a decorator wraps, and describe what a closure remembers.

## 1. Classes bundle data and behavior

A **class** is a blueprint. Each **instance** holds its own data. `self` refers to the instance a method was called on.

```python
class Gradebook:
    def __init__(self):
        self.scores = {}

    def add_score(self, name, score):
        self.scores.setdefault(name, []).append(score)
```

`__init__` runs once when you create an instance. `Gradebook()` builds the object; `book.add_score('Maya', 82)` runs a method on that object's own `scores`.

**Predict before running:** After `book = Gradebook()` and `book.add_score('Maya', 82)`, what is `book.scores`? What would change if you created a second `Gradebook`?

## 2. Comprehensions build a list in one line

A list comprehension has three parts: what to keep, where it comes from, and an optional condition.

```python
names = ['Maya', 'Luis', 'Ari']
long_names = [name for name in names if len(name) > 3]
```

This is the same work as a loop that appends to a list. The comprehension does not change what the program does, only how much typing it takes to say it. Use a plain loop when the body has several steps.

**Predict before running:** What does `long_names` contain? How many items would `[n.upper() for n in names]` return?

## 3. Decorators wrap a function

A **decorator** is a function that takes a function and returns a new one. The `@` line is shorthand:

```python
@log_call
def describe(name, average):
    ...

# means the same as:
describe = log_call(describe)
```

The wrapper usually calls the original function and adds something around it, such as printing, counting, or timing. `*args` and `**kwargs` let the wrapper accept any arguments.

**Predict before running:** If `log_call` prints before it calls the original, which prints first: the call's output or the wrapper's message?

## 4. Closures remember their surroundings

A **closure** is an inner function that still has access to variables from the function that created it, even after that outer function has returned.

```python
def make_checker(threshold):
    def is_passing(average):
        return average >= threshold
    return is_passing

check_70 = make_checker(70)
print(check_70(82))  # True
```

`check_70` keeps its own copy of `threshold`, which is 70. Calling `make_checker(60)` makes a separate function with a different memory.

**Predict before running:** What does `make_checker(60)(65)` return? What does `check_70(69)` return?

## 5. Reading an error

The local check prints one line per exercise. `NOT STARTED` means its TODO still raises `NotImplementedError`. A `FAIL` line names the input, expected result, actual result, and a nudge. Replace one TODO and run the check again.

## 6. More patterns in the practice ladder

`make_counter` is a closure that changes its remembered number. The inner function needs `nonlocal count` before it can increase that outer variable. Two calls to the factory make two independent counters. **Predict:** What should the first call to each new counter return?

The `once` decorator must remember whether it has already run the function. Store a Boolean flag as well as the result, because `None` can itself be the first result. **Predict:** If the first call returns `None`, should a second call run the original again?

A `Stack` puts new items on top. A list's end can be that top: append to push, inspect the last item to peek, and remove the last item to pop. An empty stack needs a clear `IndexError`. **Predict:** After pushing `a`, then `b`, what does peek return, and what should the length still be?

`group_scores` turns `(name, score)` rows into a dictionary. Later duplicate names replace earlier scores. `compose(f, g)` returns a function that runs `g` first, then `f`. **Predict:** If `g` adds 3 and `f` doubles, what is `compose(f, g)(4)`?

## 7. Mini project: Gradebook v2

The transfer project combines the packet's ideas. Keep each book's score lists on its own instance. Compute each average to one decimal place, with `None` for a student without marks. Use a dictionary comprehension to make a name-to-average lookup, then `sorted` to rank scored students highest first, tied names alphabetically, and empty records last. Use `@property` so `book.student_count` reads as a value. The project has a separate check line in `python lp03-more-python-skills/check.py`.

**Predict before running:** If Maya has 82 and 74, Ari has no marks, and Luis has 91, what order should the report use? What should a second new book count?

## Check yourself

1. Explain what `self` refers to in `book.add_score`.
2. Rewrite `squares = []` plus a loop as a comprehension, then say which version you find easier to debug and why.
3. In `@log_call`, what does `describe` refer to after the decorator runs?
4. Name one value a closure remembers after its outer function has returned.
5. Why does `once` need a separate flag when a function may return `None`?
6. What order should `compose(f, g)` call its two functions?
