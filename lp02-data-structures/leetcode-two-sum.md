# LeetCode warm-up | 1 Two Sum (Easy)

Link: [leetcode.com/problems/two-sum](https://leetcode.com/problems/two-sum/)

**Why this one for Week 4.** The first answer uses a list and two loops. The better answer uses a dictionary for lookup. It is the "which collection fits?" question from the deck with a real payoff.

## The problem in plain words

Given a list of integers `nums` and a `target`, return the indexes of the two numbers that add up to `target`. Exactly one answer exists, and you may not use the same item twice.

| nums | target | answer |
| --- | --- | --- |
| `[2, 7, 11, 15]` | 9 | `[0, 1]` |
| `[3, 2, 4]` | 6 | `[1, 2]` |
| `[3, 3]` | 6 | `[0, 1]` |

## Starter skeleton

```python
from typing import List


class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        seen = {}
        for index, value in enumerate(nums):
            ...
        return []
```

## Walkthrough for class (about 20 minutes)

1. **Predict (3 min).** For `[2, 7, 11, 15]` and 9, ask which number pairs with 2. The partner is `9 - 2 = 7`.
2. **I Do (6 min).** Write the double loop. Count the comparisons for a long list.
3. **We Do (7 min).** Store each value's index in a dictionary as you go, and ask `target - value in seen` before storing the current one.
4. **You Do (4 min).** Trace `[3, 3]` with 6. Why does checking before storing matter?

## Reference solution (open after your own attempt)

```python
class Solution:
    def twoSum(self, nums, target):
        seen = {}
        for index, value in enumerate(nums):
            partner = target - value
            if partner in seen:
                return [seen[partner], index]
            seen[value] = index
        return []
```

Takeaway: a dictionary answers "have I seen this?" in one step.
