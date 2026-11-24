# Week 9 walkthrough | External Libraries & APIs

## I Do: know which tool you are importing

A module is code you can import. A package can organize modules; pip installs distributions into a Python environment. `json` ships with Python. Requests is an external distribution. Install into the interpreter used by your editor, then run the import there. The optional requirements pin the versions tested for this lesson; the offline lesson does not import Requests.

```python
import json
payload = json.loads('{"open": true, "next_page": null}')
print(type(payload).__name__, payload["next_page"])
```

**Predict:** `dict None`. JSON is text; the decoded result is Python data. Do not use eval to interpret received data. JSON objects usually become dictionaries, arrays become lists, true/false become True/False, and null becomes None. A valid JSON root can also be a scalar, so syntax success does not prove the object shape. See [Python's JSON documentation](https://docs.python.org/3/library/json.html).

## I Do: follow one request

Client sends a GET to an endpoint, adding documented query fields. Server answers with a status, headers, and a body. A public API has a published contract; it may still require credentials or impose usage limits. Use HTTPS for remote services and read the service's documentation before choosing field names or authentication. This packet's `.test` URLs are labels for local fixtures, not public services to contact.

Run `python lp09a-external-libraries-and-apis/code-along.py`. Its default transport opens no socket. Trace the response's status, raw text, decoded object, and tickets list separately. Then run the optional `--requests` route if its dependencies were installed before class: the same lesson uses an actual local HTTP service. The separately selected `--public` route makes one real GET for this course's public GitHub repository; it can fail or be rate-limited, so retain the fixture fallback.

## We Do: project nested records into clean dictionaries

The invented nested-orders.json fixture contains a board object, an orders list, and a dish object inside each order. With that known valid fixture, clean_order_records selects ticket IDs, strips dish labels and station text, and builds new dictionaries. Predict the output before running the code-along. For data from an unfamiliar service, validate the wrapper and field types before applying the same projection. Country data uses its own documented shape; this drill is not its parser.

## We Do: query parameters have a place

With Requests, the call looks like this after obtaining the documented URL:

```python
response = requests.get(url, params={"station": "Hot line"}, timeout=3)
response.raise_for_status()
payload = response.json()
```

This is a call-site fragment: import Requests and supply url in the optional demo first. `params` encodes the query string. A GET body supplied with `data` is not a replacement for a documented query parameter. Do not concatenate a city or station name into a URL by hand; spaces, ampersands, and other characters need encoding. **Predict:** the fixture preview shows `station=Hot+line`. The API decodes that as a space. See the [Requests interface](https://requests.readthedocs.io/en/latest/api/).

## I Do: successful HTTP and usable data are different

| Boundary | Example | What to inspect |
| --- | --- | --- |
| Transport | Cannot connect or response activity stalls | The exception and timeout policy |
| HTTP | 404, 429, 503 | Status and documented response contract |
| JSON syntax | An HTML error page instead of JSON | JSON decoding error |
| Shape | An array where an object is required | Root and field types |
| Domain | "available" is text instead of Boolean | Meaning and schema, not truthiness |

2xx indicates HTTP success; 4xx includes client/request problems and rate limiting; 5xx indicates server failure. A 204 response can succeed with no body, so blindly calling json() is wrong. A 503 body can be valid JSON and still describe an HTTP failure. Requests' raise_for_status handles 4xx/5xx, not every response outside 200. Our exercise endpoint explicitly requires 200; its custom HTTPStatusError records any other status. No automatic retry loop is part of this lesson. For 429, inspect the service's Retry-After policy instead of retrying rapidly.

## We Do: keep recovery selective

The instructor helpers provide a Response object with status_code, text, and json(). This makes the exercises repeatable without a real network. request_object checks status before decoding, then checks the root shape. safe_board maps expected failures to reasons while leaving caller TypeError visible.

Catch subclasses first: TimeoutError before OSError; our HTTPStatusError and JSONDecodeError before ValueError. Otherwise one broad handler erases useful distinctions. **Predict:** `([], None)` is an empty successful board; `([], "timeout")` is a failed request. Do not turn both into the same empty screen.

A Requests timeout is a limit on waiting for connection/read activity, not a guaranteed deadline for the whole download. The adapter uses the supplied timeout and preserves the original exception as its cause. In native Requests code, catch Requests' Timeout, HTTPError, JSONDecodeError, and RequestException as appropriate. The [quickstart's error and timeout sections](https://requests.readthedocs.io/en/latest/user/quickstart/#timeouts) explain their library-specific types.

## We Do: inspect the values you received

```python
rows = [{"item": "Soup", "available": True},
        {"item": "Tart", "available": "false"}]
```

**Predict:** both values are truthy, but only the first is the Boolean True. In this exercise, require `is True`. Even `1 == True` is True, so equality is too loose for this contract. Repair the starter and run its check.

## I Do: credentials and pagination

A key authenticates an application under a provider's rules; it is not a guarantee of unlimited access. Read a real value from an environment variable at the caller, never from a committed literal. The api_headers exercise models Bearer authentication because that is its specified contract; other APIs use other schemes. Do not print request headers, keys, or URLs containing credentials. The local demo needs no key and does not send one.

The board's next_page field is an integer or null. Follow the documented continuation, not a guess based on whether a page happened to be empty. merge_tickets demonstrates why repeated IDs at a page boundary should not duplicate displayed work. A production pagination loop also needs a page limit and protection against repeated continuation values; writing that loop is outside these eleven exercises.

## You Do: prove one boundary

Run `python lp09a-external-libraries-and-apis/check.py`. Start with decode_object, repair_available, or repair_fetch. Explain the input that distinguishes a correct solution from a plausible wrong one. The fake fetch records keyword arguments, so a request that omits timeout or sends data instead of params fails clearly.

Then use [Destination City](leetcode-destination-city.md): data arrives as pairs, and your job is to reason about them. LeetCode supplies the Python list directly; there is no HTTP request to write there.

## Exit check

1. What is the type before and after JSON decoding?
2. Can a successful JSON decode accompany HTTP 503?
3. Why does a 204 response need different body handling?
4. What does a timeout bound, and which error class does native Requests use?
5. How do you distinguish an empty successful board from a failed request?

Answers: text then a JSON-derived Python value; yes; it may have no body; waiting for activity, using Requests Timeout; preserve a separate failure reason rather than collapsing both to an empty list.
