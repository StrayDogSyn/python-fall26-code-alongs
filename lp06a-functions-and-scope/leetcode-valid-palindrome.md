# LeetCode warm-up | 125 Valid Palindrome (Easy)

Link: [leetcode.com/problems/valid-palindrome](https://leetcode.com/problems/valid-palindrome/)

**Why this one for Week 6.** It is a text-cleaning job that wants a named helper and a returned `True` or `False`, not a printed answer.

## The problem in plain words

Lowercase the text, keep only letters and digits, and return whether it reads the same forward and backward.

| s | answer |
| --- | --- |
| `"A man, a plan, a canal: Panama"` | `True` |
| `"race a car"` | `False` |
| `" "` | `True` |

## Starter skeleton

```python
class Solution:
    def isPalindrome(self, s: str) -> bool:
        cleaned = ...
        return ...
```

## Walkthrough for class (about 15 minutes)

1. **Predict (3 min).** What does `"Ab, c!".lower()` leave, and which characters must go?
2. **I Do (5 min).** Write `clean(text)` as its own function that returns the cleaned string.
3. **We Do (5 min).** Call `clean` and compare with its reverse. Ask why returning beats printing here.
4. **You Do (2 min).** Rename the helper and explain which names it can see.

## Reference solution (open after your own attempt)

```python
class Solution:
    def isPalindrome(self, s):
        cleaned = [char.lower() for char in s if char.isalnum()]
        return cleaned == cleaned[::-1]
```

Takeaway: a small named function that returns a value is easy to test.
