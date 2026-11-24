# Week 8 hints

Try each I Do prediction and We Do repair before your You Do exercise. Open one hint at a time.

## describe_error

<details><summary>Hint 1</summary>

An exception has a type and a message.

</details>

<details><summary>Hint 2</summary>

Use type(error) to inspect its class.

</details>

<details><summary>Hint 3</summary>

The class has a __name__ attribute.

</details>

## station_note

<details><summary>Hint 1</summary>

A missing dictionary key raises KeyError.

</details>

<details><summary>Hint 2</summary>

Keep only the lookup inside try.

</details>

<details><summary>Hint 3</summary>

Return the fallback only from except KeyError.

</details>

## portion_size

<details><summary>Hint 1</summary>

Use already supplied arguments; do not prompt.

</details>

<details><summary>Hint 2</summary>

Division can fail for more than one reason.

</details>

<details><summary>Hint 3</summary>

Catch ZeroDivisionError and let TypeError surface.

</details>

## repair_pick

<details><summary>Hint 1</summary>

The smallest failing list is empty.

</details>

<details><summary>Hint 2</summary>

Python accepts negative indices; this contract does not.

</details>

<details><summary>Hint 3</summary>

Use 0 <= index < len(labels).

</details>

## require_label

<details><summary>Hint 1</summary>

A placeholder can hide a missing required value.

</details>

<details><summary>Hint 2</summary>

Check after stripping, so spaces do not pass.

</details>

<details><summary>Hint 3</summary>

Raise ValueError with the specified message.

</details>

## read_optional

<details><summary>Hint 1</summary>

Reuse Week 7 with and encoding.

</details>

<details><summary>Hint 2</summary>

A missing file is different from an unreadable file.

</details>

<details><summary>Hint 3</summary>

Catch FileNotFoundError around the with block.

</details>

## parse_service_date

<details><summary>Hint 1</summary>

strptime already checks calendar dates.

</details>

<details><summary>Hint 2</summary>

A useful domain message can keep its original cause.

</details>

<details><summary>Hint 3</summary>

Use raise ValueError(...) from error.

</details>

## run_with_cleanup

<details><summary>Hint 1</summary>

Returning does not skip finally.

</details>

<details><summary>Hint 2</summary>

An except that returns a fallback would hide the error.

</details>

<details><summary>Hint 3</summary>

Put cleanup() inside finally with no return there.

</details>

## logged_lookup

<details><summary>Hint 1</summary>

A warning should describe the context.

</details>

<details><summary>Hint 2</summary>

Do not configure the root logger in a reusable function.

</details>

<details><summary>Hint 3</summary>

Inject a logger and use a %s placeholder with a separate argument.

</details>

## collect_dates

<details><summary>Hint 1</summary>

Catch inside the loop to keep later valid records.

</details>

<details><summary>Hint 2</summary>

enumerate(..., start=1) preserves useful row numbers.

</details>

<details><summary>Hint 3</summary>

Append to valid in else, rejected in except.

</details>

## balanced_brackets

<details><summary>Hint 1</summary>

Store the closer you expect to see next.

</details>

<details><summary>Hint 2</summary>

A leading closer must not pop an empty stack.

</details>

<details><summary>Hint 3</summary>

Use elif not stack or stack.pop() != char; finish with not stack.

</details>
