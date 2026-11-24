# External Libraries & APIs | Week 9

Python Intro 26.4 session prep for Monday, November 30, 2026, 8:00 PM Eastern. Use last week's selective error handling to work with a kitchen order-board API. This is supplemental practice, separate from the graded Country Explorer project.

## Start here

1. Open the [slides](../week09/week09-slides.html) and [90-minute mentor plan](run-of-show.md).
2. Predict, then run `python lp09a-external-libraries-and-apis/code-along.py` from the repository root.
3. Edit one TODO in [practice.py](practice.py). Run `python lp09a-external-libraries-and-apis/check.py`.
4. Use [three-level hints](hints.md), then compare [solutions.py](solutions.py) after attempting the problem.

The default code-along, all eleven exercises, and their checks use only the standard library and local [fixtures](data/). They work without internet, an account, or an API key. Scripts find their own data folders. Eleven NOT STARTED results are expected before editing. Use `python3` if your system has no `python` command.

## I Do, We Do, You Do

| Phase | Work | Evidence |
| --- | --- | --- |
| I Do | Separate request, response status, JSON text, Python object, and expected schema. | Predict the type at each step. |
| We Do | Repair truthiness of a JSON field and a request missing query parameters and timeout. | Explain which boundary failed before changing code. |
| You Do | Complete a checked exercise, then work through Destination City with the class. | Show an edge case and explain the result. |

## Optional: real HTTP with Requests

Create and activate the environment using the [existing setup guide](https://github.com/StrayDogSyn/python-fall26-code-alongs#getting-started). Then, from the repository root:

```powershell
python -m pip install -r lp09a-external-libraries-and-apis/requirements-optional.txt
python lp09a-external-libraries-and-apis/code-along.py --requests
python lp09a-external-libraries-and-apis/check-http.py
```

[Requests](https://pypi.org/project/requests/) and its dependencies are pinned in the [optional requirements](requirements-optional.txt). The optional code starts a temporary service on 127.0.0.1, makes real HTTP GETs with Requests, and stops the service afterward. It uses an available port and does not contact a public API. The timeout and dropped-connection routes now demonstrate transport failures without a server traceback; blank station query values keep the same meaning as in the fixtures. Installation needs package access; running the prepared demo needs only loopback networking. The service is a teaching tool, not a production server.

For one optional public API request using the same pinned library:

```powershell
python lp09a-external-libraries-and-apis/code-along.py --public
```

This reads only this course repository's public GitHub metadata. It sends no explicit key, disables redirects, and makes one request; shared classroom IP addresses may hit GitHub's unauthenticated rate limit. Failures produce a useful message and nonzero exit so the mentor can switch to fixtures. Read the [endpoint documentation](https://docs.github.com/en/rest/repos/repos#get-a-repository) and [rate-limit documentation](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api). Results can change. This demo neither signs up for nor contacts the graded country's API.

This path also demonstrates the native `requests.get`, `params`, timeout, `raise_for_status()`, and `response.json()` interfaces. See the [Requests quickstart](https://requests.readthedocs.io/en/latest/user/quickstart/). The small adapter translates transport exceptions into the standard-library exceptions used by the offline exercises; HTTP statuses remain available for explicit checks.

## Exercise ladder

| Function | Tier | Contract and edge case |
| --- | --- | --- |
| `decode_object(text)` | Warm-up | Decode JSON text and return a dictionary. Example: '{"open":true,"note":null}' gives {"open": True, "note": None}. Edge: an empty object is valid; valid JSON that is not an object raises ValueError("object required"). Invalid JSON keeps its JSONDecodeError. |
| `status_group(code)` | Warm-up | For an integer HTTP status, return "success" for 200..299, "client" for 400..499, "server" for 500..599, and "other" otherwise. Example: 404 gives "client". Edge: 204 is success, but may have no body; 300 is other. |
| `ticket_titles(payload)` | Warm-up | Return the dish strings from payload["tickets"] in order, keeping duplicates. Require a dictionary with a tickets list of dictionaries, each with a string dish; otherwise raise ValueError("tickets required"). Example: {"tickets":[{"dish":"Soup"},{"dish":"Soup"}]} gives ["Soup","Soup"]. Edge: {"tickets":[]} gives []; missing tickets is invalid. Do not mutate payload. |
| `repair_available(rows)` | Fix it | Return item strings only from rows whose available value is exactly True. Inputs are dictionaries with item strings and an optional available value. Example: [{"item":"Soup","available":True},{"item":"Tart","available":"false"}] gives ["Soup"]. Edge: 1, "true", missing values, and False do not qualify; [] gives []. Repair a truthiness filter. |
| `repair_fetch(fetch, url, params)` | Fix it | Call the supplied fetch exactly once with url, params=params, timeout=3; return its integer status_code. Do not change params or catch errors. Example: a fake 200 response gives 200. Edge: a TimeoutError still reaches the caller. Repair a call that sends query fields as data and omits timeout. |
| `api_headers(key)` | Build | Strip the supplied key string and return {"Authorization": "Bearer " + key, "Accept": "application/json"}. Raise ValueError("key required") for blank strings. Example: " CLASSROOM_ONLY " gives a Bearer header using CLASSROOM_ONLY. Edge: whitespace-only input raises. Do not print or log the key; read real keys from the environment at the caller. |
| `next_page(payload)` | Build | Return payload["next_page"] when it is a positive int, or None when it is null. Require the field; raise ValueError("invalid page") for missing, zero, negative, Boolean, or non-integer values. Example: {"next_page":2} gives 2. Edge: {"next_page":None} ends pagination; True is invalid even though bool subclasses int. |
| `request_object(fetch, url, params)` | Build | Call fetch(url, params=params, timeout=3). Require status 200 before decoding; otherwise raise support.HTTPStatusError(status). Decode with response.json() and require a dictionary, otherwise ValueError("object required"). Let the original transport failures and JSONDecodeError propagate unchanged. Example: a 200 object response returns that object. Edge: 204 is not this endpoint's required 200 and must not be JSON-decoded. |
| `safe_board(fetch, url)` | Build | Use request_object(fetch,url,{}) then ticket_titles. Return (titles, None) on success, or ([], reason) for these expected failures: TimeoutError -> "timeout", OSError -> "connection", HTTPStatusError -> "http", JSONDecodeError -> "json", other ValueError -> "shape". Example: a valid empty board gives ([], None). Edge: malformed JSON differs from wrong shape; unrelated TypeError must propagate. |
| `merge_tickets(pages)` | Build | Each page is a dictionary with a tickets list of dictionaries containing integer id and string dish. Return new dictionaries for the first occurrence of each id in page order. Keep different IDs even when dishes match. Example: pages containing id 3 Soup twice and id 4 Soup once give two rows. Edge: [] gives []; do not change pages or share returned row objects with the input. Input is already validated. |
| `destination_city(paths)` | Extend | Given nonempty two-city paths forming one directed chain without a cycle, return its terminal city. Example: [["B","C"],["A","B"]] gives "C". Edge: [["A","Z"]] gives "Z". Path row order is arbitrary; input is already valid under LeetCode 1436's contract. Do not change it. |

Five exercises are Warm-up or Fix it. Each has an example, edge case, local check, three hints, and reference answer. The two repair exercises include deliberately faulty code below the TODO; remove that TODO and repair the given code.

## Session material

[Walkthrough](week09-walkthrough.md) · [mentor plan](run-of-show.md) · [LeetCode 1436](leetcode-destination-city.md) · [Notebook source](notebook-source.md) · [topic map](bridge-the-dream-map.md) · [technical sources](sources.md).

The full Week 9 instructions supplied by the mentor were compared with this packet. No Agify warmup, REST Countries parser, or Country Explorer menu solution is included. The actual graded sample JSON and authenticated country response remain unverified. The [mentor plan](run-of-show.md) flags the keyless-practice wording and country-field sample discrepancies. Week 9 remains a hub preview pending release review.
