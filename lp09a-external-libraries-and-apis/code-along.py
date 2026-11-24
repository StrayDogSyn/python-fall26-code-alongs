"""Run offline by default. --requests opts into real HTTP on the local machine."""
import argparse
import json
from pathlib import Path
from support import Response
from transport import fixture_fetch, requests_fetch, query_preview

DATA = Path(__file__).resolve().parent / "data"


def clean_order_records(raw):
    """Projection drill for the known valid nested-orders.json fixture."""
    return [{"id": row["ticket"], "dish": row["dish"]["label"].strip(),
             "station": row["station"].strip()} for row in raw["board"]["orders"]]


def public_demo(requests):
    """One optional public GET for this course's repository; no explicit key."""
    url = "https://api.github.com/repos/StrayDogSyn/python-fall26-code-alongs"
    headers = {"Accept": "application/vnd.github+json", "X-GitHub-Api-Version": "2026-03-10"}
    try:
        with requests.get(url, headers=headers, timeout=3) as response:
            print("Public HTTP:", response.status_code)
            if response.status_code != 200:
                print("Public demo unavailable; use the offline or local HTTP path.")
                return 1
            payload = response.json()
            if not isinstance(payload, dict) or not isinstance(payload.get("full_name"), str):
                print("Public response shape changed; inspect the documented contract.")
                return 1
            print("Public repository:", payload["full_name"])
            print("Default branch:", payload.get("default_branch", "not supplied"))
            return 0
    except requests.exceptions.JSONDecodeError:
        print("Public demo received invalid JSON; use the local fixture.")
    except requests.exceptions.Timeout:
        print("Public demo timed out; use the local fixture.")
    except requests.exceptions.RequestException:
        print("Public demo could not connect; use the local fixture.")
    return 1


def demonstrate(fetch, base):
    # I Do: separate the response status, JSON text, and decoded Python object.
    params = {"station": "Hot line"}
    print("Query:", query_preview(base + "/board", params))
    response = fetch(base + "/board", params=params, timeout=3)
    print("HTTP:", response.status_code)
    payload = response.json()
    print("Root type:", type(payload).__name__)
    print("Dishes:", [row["dish"] for row in payload["tickets"]])
    print("Next page:", payload["next_page"])
    print("JSON null becomes:", json.loads('{"note":null}')["note"])
    nested = json.loads((DATA / "nested-orders.json").read_text(encoding="utf-8"))
    print("Clean records:", clean_order_records(nested))
    # We Do: JSON parsing is not a status check. Error JSON is still JSON.
    failed = fetch(base + "/unavailable", params={}, timeout=3)
    print("Error JSON:", failed.status_code, failed.json()["error"])
    malformed = fetch(base + "/bad-json", params={}, timeout=3)
    try:
        malformed.json()
    except json.JSONDecodeError:
        print("Malformed JSON: caught")
    # You Do: preserve the distinction between empty success and failure.
    empty = fetch(base + "/board", params={"station": "No such station"}, timeout=3)
    print("Empty success:", empty.status_code, empty.json()["tickets"])
    # No live key is needed or printed. Authentication is a separate concept.
    routes = json.loads((DATA / "routes.json").read_text(encoding="utf-8"))
    print("Class route pairs:", len(routes["paths"]))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument("--public", action="store_true", help="One optional public GET for the course GitHub repository")
    mode.add_argument("--requests", action="store_true", help="Use optional Requests against a temporary loopback API")
    args = parser.parse_args()
    if args.requests or args.public:
        # Verify the optional dependency before opening a local server.
        try:
            import requests
        except ImportError:
            parser.exit(2, "Install the optional pinned requirements first; see the packet README.\n")
        if args.public:
            return public_demo(requests)
        from demo_server import local_api
        print("Transport: Requests (local HTTP)")
        with local_api() as base:
            demonstrate(requests_fetch, base)
            # The library's native API, before our small exercise adapter.
            with requests.get(base + "/board", params={"station":"Pastry"}, timeout=3) as response:
                response.raise_for_status()
                print("Native Requests JSON:", response.json()["tickets"][0]["dish"])
            with requests.get(base + "/unavailable", timeout=3) as response:
                try:
                    response.raise_for_status()
                except requests.exceptions.HTTPError:
                    print("Native Requests HTTPError:", response.status_code)
            with requests.get(base + "/bad-json", timeout=3) as response:
                response.raise_for_status()
                try:
                    response.json()
                except requests.exceptions.JSONDecodeError:
                    print("Native Requests JSONDecodeError: caught")
    else:
        print("Transport: offline fixtures (no network)")
        demonstrate(fixture_fetch, "https://classroom.test")


if __name__ == "__main__":
    raise SystemExit(main())
