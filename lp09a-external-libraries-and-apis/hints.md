# Week 9 hints

Try the I Do prediction and We Do repair before your You Do exercise. Open one hint at a time.

## decode_object

<details><summary>Hint 1</summary>

JSON text is not yet a dictionary.

</details>

<details><summary>Hint 2</summary>

Use json.loads; JSON true and null become Python values.

</details>

<details><summary>Hint 3</summary>

Check isinstance(value, dict) after decoding.

</details>

## status_group

<details><summary>Hint 1</summary>

Group by range, not one familiar code.

</details>

<details><summary>Hint 2</summary>

A 204 response is successful without a JSON body.

</details>

<details><summary>Hint 3</summary>

Check 200 <= code < 300, then the 4xx and 5xx ranges.

</details>

## ticket_titles

<details><summary>Hint 1</summary>

Inspect the root, the tickets list, and a row separately.

</details>

<details><summary>Hint 2</summary>

Missing is not the same as an empty list.

</details>

<details><summary>Hint 3</summary>

Validate each dish is a string before appending it.

</details>

## repair_available

<details><summary>Hint 1</summary>

The string "false" is truthy in Python.

</details>

<details><summary>Hint 2</summary>

Equality to True also accepts the integer 1.

</details>

<details><summary>Hint 3</summary>

Use is True for this schema.

</details>

## repair_fetch

<details><summary>Hint 1</summary>

GET query fields belong in params.

</details>

<details><summary>Hint 2</summary>

A timeout prevents an unbounded wait for activity.

</details>

<details><summary>Hint 3</summary>

Return the response status; let unexpected failures remain visible.

</details>

## api_headers

<details><summary>Hint 1</summary>

Different services document different authentication schemes.

</details>

<details><summary>Hint 2</summary>

This exercise contract specifically uses Bearer authorization.

</details>

<details><summary>Hint 3</summary>

Validate the stripped key and never print the resulting headers.

</details>

## next_page

<details><summary>Hint 1</summary>

An empty first page is not necessarily the last page.

</details>

<details><summary>Hint 2</summary>

Use the continuation field rather than guessing page + 1.

</details>

<details><summary>Hint 3</summary>

type(page) is int excludes Boolean values.

</details>

## request_object

<details><summary>Hint 1</summary>

A JSON error body can decode successfully on HTTP 500.

</details>

<details><summary>Hint 2</summary>

Check the endpoint status contract before parsing the body.

</details>

<details><summary>Hint 3</summary>

JSON syntax and root shape are separate validations.

</details>

## safe_board

<details><summary>Hint 1</summary>

These exception classes overlap by inheritance.

</details>

<details><summary>Hint 2</summary>

TimeoutError is an OSError; JSONDecodeError and HTTPStatusError are ValueErrors.

</details>

<details><summary>Hint 3</summary>

Catch subclasses before the broader classes, and keep TypeError visible.

</details>

## merge_tickets

<details><summary>Hint 1</summary>

Page boundaries can repeat a record.

</details>

<details><summary>Hint 2</summary>

Track IDs, not dish names; choose first-seen behavior.

</details>

<details><summary>Hint 3</summary>

Append dict(row) so changing an output row cannot change input.

</details>

## destination_city

<details><summary>Hint 1</summary>

Ask which city never appears as an origin.

</details>

<details><summary>Hint 2</summary>

Build a set of every origin before examining destinations.

</details>

<details><summary>Hint 3</summary>

Return a destination absent from that set.

</details>
