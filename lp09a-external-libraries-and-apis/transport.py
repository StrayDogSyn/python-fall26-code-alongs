"""Two transports with the same small interface. Requests is optional and lazy."""
import json
from pathlib import Path
from urllib.parse import urlencode
from support import Response

DATA = Path(__file__).resolve().parent / "data"


def fixture_fetch(url, *, params, timeout):
    """Return classroom responses without opening any socket."""
    if timeout <= 0:
        raise ValueError("timeout must be positive")
    if url.endswith("/timeout"):
        raise TimeoutError("classroom timeout")
    if url.endswith("/offline"):
        raise OSError("classroom connection failure")
    if url.endswith("/bad-json"):
        return Response(200, "not JSON")
    if url.endswith("/unavailable"):
        return Response(503, '{"error":"kitchen unavailable"}')
    if not url.endswith("/board"):
        return Response(404, '{"error":"not found"}')
    filename = "page-two.json" if str(params.get("page", "1")) == "2" else "board.json"
    payload = json.loads((DATA / filename).read_text(encoding="utf-8"))
    station = params.get("station")
    if station is not None:
        payload["tickets"] = [row for row in payload["tickets"] if row["station"] == station]
    return Response(200, json.dumps(payload))


def requests_fetch(url, *, params, timeout):
    """Make a real HTTP GET, retaining status/body for the lesson's validation."""
    try:
        import requests
    except ImportError as error:
        raise RuntimeError("Optional Requests demo needs requirements-optional.txt; see README.md") from error
    try:
        # No embedded credentials or automatic redirects in this classroom client.
        with requests.get(url, params=params, timeout=timeout, allow_redirects=False) as response:
            return Response(response.status_code, response.text)
    except requests.exceptions.Timeout as error:
        raise TimeoutError("request timed out") from error
    except requests.exceptions.RequestException as error:
        raise OSError("request could not complete") from error


def query_preview(base, params):
    """Teaching aid: show how a library encodes query fields, not string concatenation."""
    return base + "?" + urlencode(params)
