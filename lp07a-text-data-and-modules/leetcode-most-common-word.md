# LeetCode warm-up | 819 Most Common Word (Easy)

Link: [leetcode.com/problems/most-common-word](https://leetcode.com/problems/most-common-word/)

**Why this one for Week 7.** It is a text-data problem in miniature. You receive raw text with punctuation and mixed case, you clean it, you turn it into a tally, and you pick a winner. That is the same shape as reading a log file and summarizing it. It also hands us the Week 7 question, "write it yourself or import it?", with a real answer: solve it by hand first, then meet `re` and `collections.Counter` and see exactly which lines they replace.

Last week's problem was 125 Valid Palindrome (cleaning text with a function). This one reuses that cleaning skill and adds a dictionary.

## The problem in plain words

You get a paragraph of text and a list of banned words. Return the word that appears most often, ignoring banned words. Case does not matter, punctuation is not part of a word, and the answer comes back in lowercase. LeetCode promises at least one word is not banned, and that the winner is unique, so you do not need a tie-break rule.

Allowed punctuation in the input: `! ? ' , ; .` and spaces. Paragraph length is at most 1000 characters and there are at most 100 banned words.

**Examples to run first**

| paragraph | banned | answer |
| --- | --- | --- |
| `"Bob hit a ball, the hit BALL flew far after it was hit."` | `["hit"]` | `"ball"` |
| `"a."` | `[]` | `"a"` |

Kitchen versions to try next: `("Ramen!? ramen; RAMEN, fries. Fries.", ["fries"])` gives `"ramen"`, and `("Corn corn,corn butter butter", ["corn"])` gives `"butter"`.

## Starter skeleton

```python
from typing import List


class Solution:
    def mostCommonWord(self, paragraph: str, banned: List[str]) -> str:
        # Step 1: put banned words in a set (fast "is it in here?" checks)
        banned_set = ...

        # Step 2: walk the text one character at a time.
        #         Letters build up the current word. Anything else ends it.
        counts = {}
        word = ""
        for char in paragraph.lower() + " ":
            ...

        # Step 3: pick the word with the biggest count
        ...
```

The extra space added to the end of the text is a trick worth stating out loud: it forces the last word to be counted when the loop sees a non-letter.

## Walkthrough for class (about 25 minutes)

Think of this as mise en place. A cook does not start the sauce before the shallots are chopped, and a program should not start counting before the text is clean.

1. **Predict (3 min).** Run `"Bob hit a ball, the hit BALL".split()` and ask the class what the words are. Answer: `["Bob", "hit", "a", "ball,", "the", "hit", "BALL"]`. Two problems appear at once: `ball,` carries a comma, and `BALL` is not `ball`. Splitting alone is not cleaning.
2. **I Do (7 min).** Build the character loop live. Print `word` and `counts` after each character for the first sentence. Students see the word grow and reset.
3. **We Do (7 min).** Add the banned set. Ask: why a set and not the list? Both work at this size. A set answers membership in one step no matter how many banned words there are, which is the habit worth building.
4. **You Do (5 min).** Students finish step 3, the winner search, without `max()`. It is the Week 5 running-best pattern again.
5. **The Week 7 reveal (3 min).** Show the stdlib version below. Count the lines it replaces. Then ask the decision question: when is the by-hand version the better call?

## Reference solutions (open after your own attempt)

By hand, using only what we have learned:

```python
class Solution:
    def mostCommonWord(self, paragraph, banned):
        banned_set = set(banned)
        counts = {}
        word = ""
        for char in paragraph.lower() + " ":
            if char.isalpha():
                word += char
            else:
                if word and word not in banned_set:
                    counts[word] = counts.get(word, 0) + 1
                word = ""
        best_word, best_count = "", 0
        for candidate, count in counts.items():
            if count > best_count:
                best_word, best_count = candidate, count
        return best_word
```

With the standard library:

```python
import re
from collections import Counter


class Solution:
    def mostCommonWord(self, paragraph, banned):
        banned_set = set(banned)
        words = re.findall(r"[a-z]+", paragraph.lower())
        counts = Counter(word for word in words if word not in banned_set)
        return counts.most_common(1)[0][0]
```

Both pass the examples above. Time is linear in the paragraph length for either version.

## Import or write it yourself?

| Question | By hand | `re` and `Counter` |
| --- | --- | --- |
| Do I understand what is happening? | Every step is visible | Two lines hide a lot |
| How much code do I maintain? | More | Less |
| Will a reader know the tools? | Anyone who knows loops | Anyone who knows the standard library |
| What if the rules change (keep apostrophes, ignore numbers)? | Edit one `if` | Edit a pattern string |

A decent rule: write it by hand the first time so you know what the tool is doing, then import the tool when the problem is already solved and tested. `re` and `collections` ship with Python, so there is nothing to install. That is exactly the line between the standard library and third-party packages that this week's lesson draws.

## If it feels like too much

Warm-up: [242 Valid Anagram](https://leetcode.com/problems/valid-anagram/) is a tally comparison with no punctuation. Another gentle option is [929 Unique Email Addresses](https://leetcode.com/problems/unique-email-addresses/), which is pure string parsing with `split` and `replace`.

## Stretch

Return the top 2 words instead of the top 1, then decide your own tie rule. For a harder cousin, try [692 Top K Frequent Words](https://leetcode.com/problems/top-k-frequent-words/), which makes the tie rule part of the problem.

## Edge cases that break first attempts

- A word glued to punctuation (`ball,` and `ball` must be the same word).
- Mixed case (`Ramen` and `ramen`).
- The last word of the paragraph never gets counted because no separator follows it.
- Banned words compared before lowercasing.
- A paragraph that is a single word with a period, such as `"a."`.
