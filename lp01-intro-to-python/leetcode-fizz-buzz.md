# LeetCode warm-up | 412 Fizz Buzz (Easy)

Link: [leetcode.com/problems/fizz-buzz](https://leetcode.com/problems/fizz-buzz/)

**Why this one for Week 3.** It is conditions, a loop, and a returned list in one small problem. The trap is the order of the conditions, which is the same boundary thinking as `classify_score(70)`.

## The problem in plain words

Return a list of strings for the numbers 1 to `n`. Use `"FizzBuzz"` when the number divides by 3 and 5, `"Fizz"` for 3 only, `"Buzz"` for 5 only, and the number as text otherwise.

| n | answer |
| --- | --- |
| 3 | `["1", "2", "Fizz"]` |
| 5 | `["1", "2", "Fizz", "4", "Buzz"]` |
| 15 | ends with `"FizzBuzz"` |

## Starter skeleton

```python
from typing import List


class Solution:
    def fizzBuzz(self, n: int) -> List[str]:
        answer = []
        for number in range(1, n + 1):
            ...
        return answer
```

## Walkthrough for class (about 15 minutes)

1. **Predict (3 min).** Ask what `15 % 3` and `15 % 5` give. Both are `0`, so 15 passes two tests.
2. **I Do (5 min).** Write the loop with `if number % 3 == 0` first. Run `n = 15` and watch 15 become `"Fizz"`. The order is the bug.
3. **We Do (5 min).** Move the both-divisible test first. Ask why it must come before the single tests.
4. **You Do (2 min).** Return the list after the loop, not inside it (the `total_points` bug from the deck).

## Reference solution (open after your own attempt)

```python
class Solution:
    def fizzBuzz(self, n):
        answer = []
        for number in range(1, n + 1):
            if number % 15 == 0:
                answer.append("FizzBuzz")
            elif number % 3 == 0:
                answer.append("Fizz")
            elif number % 5 == 0:
                answer.append("Buzz")
            else:
                answer.append(str(number))
        return answer
```

Takeaway: the most specific condition goes first.
