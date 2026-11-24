"""Week 9 reference answers. Attempt practice.py first."""

import json
from support import HTTPStatusError


def decode_object(text):
    """Warm-up:
    Decode JSON text and return a dictionary. Example: '{"open":true,"note":null}' gives
    {"open": True, "note": None}. Edge: an empty object is valid; valid JSON that is not
    an object raises ValueError("object required"). Invalid JSON keeps its
    JSONDecodeError.
    """
    value = json.loads(text)
    if not isinstance(value, dict):
        raise ValueError("object required")
    return value


def status_group(code):
    """Warm-up:
    For an integer HTTP status, return "success" for 200..299, "client" for 400..499,
    "server" for 500..599, and "other" otherwise. Example: 404 gives "client". Edge: 204
    is success, but may have no body; 300 is other.
    """
    if 200 <= code < 300:
        return "success"
    if 400 <= code < 500:
        return "client"
    if 500 <= code < 600:
        return "server"
    return "other"


def ticket_titles(payload):
    """Warm-up:
    Return the dish strings from payload["tickets"] in order, keeping duplicates.
    Require a dictionary with a tickets list of dictionaries, each with a string dish;
    otherwise raise ValueError("tickets required"). Example:
    {"tickets":[{"dish":"Soup"},{"dish":"Soup"}]} gives ["Soup","Soup"]. Edge:
    {"tickets":[]} gives []; missing tickets is invalid. Do not mutate payload.
    """
    if not isinstance(payload, dict) or not isinstance(payload.get("tickets"), list):
        raise ValueError("tickets required")
    titles = []
    for row in payload["tickets"]:
        if not isinstance(row, dict) or not isinstance(row.get("dish"), str):
            raise ValueError("tickets required")
        titles.append(row["dish"])
    return titles


def repair_available(rows):
    """Fix it:
    Return item strings only from rows whose available value is exactly True. Inputs are
    dictionaries with item strings and an optional available value. Example:
    [{"item":"Soup","available":True},{"item":"Tart","available":"false"}] gives
    ["Soup"]. Edge: 1, "true", missing values, and False do not qualify; [] gives [].
    Repair a truthiness filter.
    """
    return [row["item"] for row in rows if row.get("available") is True]


def repair_fetch(fetch, url, params):
    """Fix it:
    Call the supplied fetch exactly once with url, params=params, timeout=3; return its
    integer status_code. Do not change params or catch errors. Example: a fake 200
    response gives 200. Edge: a TimeoutError still reaches the caller. Repair a call
    that sends query fields as data and omits timeout.
    """
    response = fetch(url, params=params, timeout=3)
    return response.status_code


def api_headers(key):
    """Build:
    Strip the supplied key string and return {"Authorization": "Bearer " + key,
    "Accept": "application/json"}. Raise ValueError("key required") for blank strings.
    Example: " CLASSROOM_ONLY " gives a Bearer header using CLASSROOM_ONLY. Edge:
    whitespace-only input raises. Do not print or log the key; read real keys from the
    environment at the caller.
    """
    key = key.strip()
    if not key:
        raise ValueError("key required")
    return {"Authorization": "Bearer " + key, "Accept": "application/json"}


def next_page(payload):
    """Build:
    Return payload["next_page"] when it is a positive int, or None when it is null.
    Require the field; raise ValueError("invalid page") for missing, zero, negative,
    Boolean, or non-integer values. Example: {"next_page":2} gives 2. Edge:
    {"next_page":None} ends pagination; True is invalid even though bool subclasses int.
    """
    if "next_page" not in payload:
        raise ValueError("invalid page")
    page = payload["next_page"]
    if page is None:
        return None
    if type(page) is not int or page < 1:
        raise ValueError("invalid page")
    return page


def request_object(fetch, url, params):
    """Build:
    Call fetch(url, params=params, timeout=3). Require status 200 before decoding;
    otherwise raise support.HTTPStatusError(status). Decode with response.json() and
    require a dictionary, otherwise ValueError("object required"). Let the original
    transport failures and JSONDecodeError propagate unchanged. Example: a 200 object
    response returns that object.
    Edge: 204 is not this endpoint's required 200 and must not be JSON-decoded.
    """
    response = fetch(url, params=params, timeout=3)
    if response.status_code != 200:
        raise HTTPStatusError(response.status_code)
    payload = response.json()
    if not isinstance(payload, dict):
        raise ValueError("object required")
    return payload


def safe_board(fetch, url):
    """Build:
    Use request_object(fetch,url,{}) then ticket_titles. Return (titles, None) on
    success, or ([], reason) for these expected failures: TimeoutError -> "timeout",
    OSError -> "connection", HTTPStatusError -> "http", JSONDecodeError -> "json", other
    ValueError -> "shape". Example: a valid empty board gives ([], None). Edge:
    malformed JSON differs from wrong shape; unrelated TypeError must propagate.
    """
    try:
        payload = request_object(fetch, url, {})
        return ticket_titles(payload), None
    except TimeoutError:
        return [], "timeout"
    except OSError:
        return [], "connection"
    except HTTPStatusError:
        return [], "http"
    except json.JSONDecodeError:
        return [], "json"
    except ValueError:
        return [], "shape"


def merge_tickets(pages):
    """Build:
    Each page is a dictionary with a tickets list of dictionaries containing integer id
    and string dish. Return new dictionaries for the first occurrence of each id in page
    order. Keep different IDs even when dishes match. Example: pages containing id 3
    Soup twice and id 4 Soup once give two rows. Edge: [] gives []; do not change pages
    or share returned row objects with the input. Input is already validated.
    """
    result, seen = [], set()
    for page in pages:
        for row in page["tickets"]:
            if row["id"] not in seen:
                seen.add(row["id"])
                result.append(dict(row))
    return result


def destination_city(paths):
    """Extend:
    Given nonempty two-city paths forming one directed chain without a cycle, return its
    terminal city. Example: [["B","C"],["A","B"]] gives "C". Edge: [["A","Z"]] gives
    "Z". Path row order is arbitrary; input is already valid under LeetCode 1436's
    contract. Do not change it.
    """
    origins = {origin for origin, destination in paths}
    for origin, destination in paths:
        if destination not in origins:
            return destination


if __name__ == "__main__":
    from check import main

    raise SystemExit(main())
