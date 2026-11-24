# Class solve | LeetCode 1436: Destination City

[Official problem](https://leetcode.com/problems/destination-city/description/), Easy, checked November 23, 2026. The input contains 1 to 100 directed city pairs forming a single chain without a cycle. There is one terminal destination. City labels are nonempty strings. This guarantee is part of the problem, not something your solution must discover for arbitrary graphs.

## Why this fits Week 9

After an API has returned structured records, you still need to ask the right question of those records. Pair lists give us a compact version of that step. LeetCode passes a Python list directly; no Requests import, JSON decoding, or network call belongs in the submission. This is separate from the graded Country Explorer CLI.

## I Do | 0 to 3 minutes

Use `paths = [["B", "C"], ["A", "B"]]`. Trace A to B to C. The rows are shuffled, so the last row's destination is not the answer. A terminal city never appears in the origin column. Draw two columns and mark the origins before revealing code.

## We Do | 3 to 8 minutes

Start with the deliberately wrong guess `return paths[-1][1]`. It gives B on the shuffled example; the expected answer is C. Build a set of every origin first. Then walk the destinations and return the one absent from that set. Do not check against only the origins seen so far: a later row can contain an origin you still need.

```python
class Solution:
    def destCity(self, paths):
        origins = set()
        for origin, destination in paths:
            origins.add(origin)
        for origin, destination in paths:
            # YOU DO: which destination cannot lead anywhere else?
            ...
```

## You Do | 8 to 12 minutes

Complete the final condition and test a one-leg route, shuffled pairs, and a longer chain. Explain why swapping row order must preserve the answer. The packet's destination_city exercise checks this same contract without the class wrapper.

<details><summary>Reveal the complete submission</summary>

```python
class Solution:
    def destCity(self, paths):
        origins = {origin for origin, destination in paths}
        for origin, destination in paths:
            if destination not in origins:
                return destination
```

The chain guarantee ensures a result. Every origin is recorded before we test destinations. Under ordinary set lookup assumptions, runtime is O(n) and extra space is O(n), treating city labels as bounded-length strings. A last-row answer fails when rows are shuffled; looking for a city that is never a destination finds the start instead of the end.

</details>

## Transfer back to APIs

A JSON wrapper such as {"paths": [["B", "C"], ["A", "B"]]} requires selecting the paths field before using this algorithm. Validate the wrapper at your application boundary. Do not add speculative network calls or graph-repair logic to a LeetCode problem whose input is already guaranteed valid.
