# LeetCode warm-up | 704 Binary Search (Easy)

Link: [leetcode.com/problems/binary-search](https://leetcode.com/problems/binary-search/)

**Why this one for Week 5.** The class traced linear search step by step. Binary search is the same question asked smarter: how many steps does it take on a sorted list?

## The problem in plain words

Given a sorted list `nums` and a `target`, return the index of `target`, or `-1` if it is missing.

| nums | target | answer |
| --- | --- | --- |
| `[-1, 0, 3, 5, 9, 12]` | 9 | 4 |
| `[-1, 0, 3, 5, 9, 12]` | 2 | -1 |

## Starter skeleton

```python
from typing import List


class Solution:
    def search(self, nums: List[int], target: int) -> int:
        low, high = 0, len(nums) - 1
        while low <= high:
            ...
        return -1
```

## Walkthrough for class (about 20 minutes)

1. **Predict (3 min).** Open a dictionary to the middle. Is the word before or after? Ask how many pages you ruled out.
2. **I Do (6 min).** Trace `[-1, 0, 3, 5, 9, 12]` for 9 and print `low`, `high`, `middle` each pass.
3. **We Do (7 min).** Move `low` or `high` past `middle`, and ask why `middle + 1` and `middle - 1`.
4. **You Do (4 min).** Count passes for a list of 1000 items. Compare with linear search.

## Reference solution (open after your own attempt)

```python
class Solution:
    def search(self, nums, target):
        low, high = 0, len(nums) - 1
        while low <= high:
            middle = (low + high) // 2
            if nums[middle] == target:
                return middle
            if nums[middle] < target:
                low = middle + 1
            else:
                high = middle - 1
        return -1
```

Takeaway: halving the search space each pass turns 1000 checks into about 10.
