# FizzBuzz PlunkO

Open [index.html](index.html) in a browser. The page is a standalone resource in `testcode`; it is not linked from the learning hub or copied by the site build.

Type positive whole numbers separated by commas, semicolons, spaces, or new lines. The page lists every rejected entry and explains why it cannot drop. **Clean my input** keeps ASCII digits from each entry, removes empty or zero entries, and leaves the result in the text box for review. It never starts the game automatically. Valid entries can be very large because the classification uses JavaScript `BigInt`.

**Try a surprise mix** loads eight valid numbers, with two examples for each bucket. Each landed number remains visible in its bucket on the board; the scoreboard below shows the complete value for large numbers.

Choose **Showtime** or **Turbo**, then drop the list through the board. **Skip animation** finishes the current list without losing results. **Reset board** clears results but keeps the text box. The animation is skipped automatically when the browser asks for reduced motion.

This is an interactive classification game for visitor-supplied entries. It does not generate a counting range or provide a Python answer to the graded Week 5 warmup.
