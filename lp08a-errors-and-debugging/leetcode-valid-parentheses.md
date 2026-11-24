# Class solve: LeetCode 20, Valid Parentheses

[Open the official problem](https://leetcode.com/problems/valid-parentheses/). Difficulty: Easy. The official page was checked November 23, 2026. It supplies a nonempty string of at most 10,000 bracket characters. Our local helper also accepts empty text as a documented extension.

## Why this fits Week 8

A bracket checker can work for a normal pair and crash on a leading closer. We can reproduce that IndexError, inspect the stack, and fix the precondition. A mismatched or unfinished expression is ordinary False data; it does not need an exception. The exercise combines earlier strings, dictionaries, loops, and functions with today's defensive programming.

## I Do | 0 to 3 minutes

Paraphrase the goal: verify matching bracket types and nesting order. Ask the class to decide `"{[()]}"`, `"([)]"`, `"]"`, and `"(("` by hand. Counts alone cannot establish nesting. Introduce a stack as a list whose last item is removed first. Keep the next expected closing symbol on top.

## We Do | 3 to 8 minutes

Start with this deliberately faulty helper:

```python
def broken(text):
    expected = {"(": ")", "[": "]", "{": "}"}
    stack = []
    for char in text:
        if char in expected:
            stack.append(expected[char])
        elif stack.pop() != char:
            return False
    return not stack
```

Run `broken("]")` in a scratch file. Read IndexError at the bottom, then locate pop. Predict stack contents at that moment. Repair with `not stack or ...`: short-circuit evaluation stops pop when the stack is empty. A broad exception handler would obscure the missing precondition.

| Character in `{[()]}` | Stack afterward |
| --- | --- |
| `{` | `['}']` |
| `[` | `['}', ']']` |
| `(` | `['}', ']', ')']` |
| `)` | `['}', ']']` |
| `]` | `['}']` |
| `}` | `[]` |

## You Do | 8 to 12 minutes

Before revealing the answer, let learners repair the helper and supply a check for unmatched openers. Test a single closer, crossed nesting, mixed adjacent pairs, and leftover openers. Explain why both the guard and final stack test are needed.

<details><summary>Reveal the reference and LeetCode submission wrapper</summary>

```python
class Solution:
    def isValid(self, s: str) -> bool:
        expected = {"(": ")", "[": "]", "{": "}"}
        stack = []
        for char in s:
            if char in expected:
                stack.append(expected[char])
            elif not stack or stack.pop() != char:
                return False
        return not stack
```

Each character is visited once: O(n) time and O(n) worst-case extra space for unmatched openers. The invariant: the stack contains the closing symbols still needed, with the next one on top. Checking only balanced counts fails on crossed nesting.

</details>

The packet's `balanced_brackets` exercise uses this same algorithm without the platform class wrapper. Its local checker includes empty text, a contract extension beyond the official problem. Keep both contracts clear when students compare results.
