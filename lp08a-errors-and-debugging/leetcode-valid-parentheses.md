# LeetCode warm-up | 20 Valid Parentheses (Easy)

Link: [leetcode.com/problems/valid-parentheses](https://leetcode.com/problems/valid-parentheses/)

**Why this one for Week 8.** The classic first attempt crashes. It calls `stack.pop()` on a stack that might be empty, and Python answers with `IndexError: pop from empty list`. That is this week's lesson in a single line: decide what "nothing there" means before it bites. The problem has two honest fixes, a guard clause (look before you leap) and a `try/except IndexError` (ask forgiveness), so the class gets to compare both on real code.

Last week's problem was 819 Most Common Word (a tally). The week before was 125 Valid Palindrome (cleaning text).

## The problem in plain words

You get a string made only of the brackets `(` `)` `{` `}` `[` `]`. Return `True` when it is valid and `False` when it is not. A string is valid when every opening bracket is closed by the same type of bracket, the brackets close in the correct order, and every closing bracket has an opener to match.

The string is between 1 and 10,000 characters long and holds only those six characters.

**Examples to run first**

| s | answer | why |
| --- | --- | --- |
| `"()"` | `True` | one pair |
| `"()[]{}"` | `True` | three pairs in a row |
| `"(]"` | `False` | wrong type of closer |
| `"([])"` | `True` | nested correctly |
| `"([)]"` | `False` | closed in the wrong order |

Edge cases to add yourself: `")"` (a closer with nothing open), `"((("` (openers nobody closed), and `"]"`.

## Starter skeleton

```python
class Solution:
    def isValid(self, s: str) -> bool:
        # Step 1: map each closer to the opener it needs
        pairs = {")": "(", "]": "[", "}": "{"}

        # Step 2: a stack of openers that are still waiting for their closer
        stack = []

        # Step 3: walk the string one character at a time
        for char in s:
            ...

        # Step 4: what must be true at the very end?
        ...
```

## Walkthrough for class (about 25 minutes)

Think of a stack of plates at the dish station. The last plate set down is the first one picked up. Brackets nest the same way: the last one opened is the first one that has to close. In a game, it is the undo button: the most recent move is the first to come back.

1. **Predict (3 min).** Run `[].pop()` and ask for the error name before pressing Enter. Answer: `IndexError: pop from empty list`. Then ask: what string would make our program call `pop()` on an empty stack? Answer: any string that starts with a closer, such as `")"`.
2. **I Do (7 min).** Build the loop live with a `print(char, stack)` inside. Trace `"([)]"`: the stack grows to `['(', '[']`, then `)` arrives and the top is `[`, so it fails. Students see why order matters.
3. **We Do (7 min).** Run the first working draft on `")"` and watch it crash. Fix it two ways on the board, side by side. Guard clause: `if not stack` before popping. Try/except: catch `IndexError` around the pop. Ask which one a stranger would understand faster, and why catching only `IndexError` matters.
4. **You Do (5 min).** Students finish step 4 on their own. Hint: run `"((("` and see what your loop says. The loop ends without an error, yet the answer must be `False`. Leftover openers are an unmatched-brackets bug that no exception will ever announce.
5. **The Week 8 reveal (3 min).** Name the three kinds of failure in this one problem: a crash (`IndexError`), a wrong answer that raises nothing (`"((("` slipping through), and an input you can reject up front (an odd length can never pair up). Ask which of the three is the dangerous one. The silent one.

## Reference solutions (open after your own attempt)

With a guard clause, looking before you leap:

```python
class Solution:
    def isValid(self, s):
        if len(s) % 2 == 1:  # guard clause: an odd length can never pair up
            return False
        pairs = {")": "(", "]": "[", "}": "{"}
        stack = []
        for char in s:
            if char in pairs:  # a closer
                if not stack or stack.pop() != pairs[char]:
                    return False
            else:  # an opener
                stack.append(char)
        return not stack  # anything left over was never closed
```

With `try/except`, asking forgiveness:

```python
class Solution:
    def isValid(self, s):
        pairs = {")": "(", "]": "[", "}": "{"}
        stack = []
        for char in s:
            if char in pairs:
                try:
                    opener = stack.pop()
                except IndexError:  # nothing open, so this closer has no partner
                    return False
                if opener != pairs[char]:
                    return False
            else:
                stack.append(char)
        return not stack
```

Both pass every example above, and both were checked against a brute-force reference on 20,000 random strings. Time is linear in the length of the string, and the stack can grow as long as the string.

In the first version, `not stack or stack.pop() != ...` reads left to right and stops early. When the stack is empty, `not stack` is already `True`, so `pop()` never runs. That short-circuit is the guard.

## Look before you leap, or ask forgiveness?

| Question | Guard clause (`if not stack`) | `try/except IndexError` |
| --- | --- | --- |
| Which reads faster here? | One short condition | Five lines for one idea |
| Does it hide other bugs? | No | Only if the `try` grows past the `pop()` |
| When does it win? | The bad case is common and easy to test | The bad case is rare, or testing for it is as hard as doing it |

A decent rule: when you can check cheaply, check. Reach for `try/except` when the check would be as much work as the operation itself, such as opening a file that someone may delete a moment after you looked. Keep the `try` block as small as the one line that can fail.

## If it feels like too much

Warm-up: [9 Palindrome Number](https://leetcode.com/problems/palindrome-number/) opens with a guard clause (a negative number can never be a palindrome), then a plain check. Another gentle option is [1 Two Sum](https://leetcode.com/problems/two-sum/), a dictionary lookup problem you can solve with `if key in dict` or with `dict.get`.

## Stretch

[8 String to Integer (atoi)](https://leetcode.com/problems/string-to-integer-atoi/) is a Medium that is pure defensive parsing: skip spaces, read an optional sign, read digits until something else appears, return `0` when there are no digits, and clamp the result to the 32-bit range. Every rule is a "what if the input is not what I hoped" decision. Compare it with `int()`, which raises `ValueError` instead of returning `0`.

## Edge cases that break first attempts

- A closer arrives while the stack is empty (`")"`), so `pop()` raises `IndexError`.
- Openers are left on the stack at the end (`"((("`), and the loop finishes without complaint.
- The closer is the right shape for a different opener (`"(]"`), so only comparing counts misses it.
- Brackets close in the wrong order (`"([)]"`), so counting each type separately misses it.
- A string of length 1, which can never be valid.
