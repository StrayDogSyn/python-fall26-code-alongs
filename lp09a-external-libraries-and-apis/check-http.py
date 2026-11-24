"""Optional Requests checks. Install requirements-optional.txt first."""
import json
import copy
from contextlib import redirect_stdout, redirect_stderr
from io import StringIO
from pathlib import Path
import runpy
import unittest
from unittest.mock import MagicMock, patch
from demo_server import local_api
from transport import fixture_fetch, requests_fetch


class HTTPChecks(unittest.TestCase):
    requests = None

    def test_local_status_query_and_body(self):
        with local_api() as base:
            response = requests_fetch(base + "/board", params={"station":"Hot line"}, timeout=3)
            self.assertEqual(response.status_code, 200)
            self.assertEqual([row["dish"] for row in response.json()["tickets"]], ["Soup", "Soup"])
            self.assertEqual(response.json()["next_page"], 2)
            self.assertEqual(requests_fetch(base + "/missing", params={}, timeout=3).status_code,404)
            self.assertEqual(requests_fetch(base + "/unavailable", params={}, timeout=3).status_code,503)
            with self.assertRaises(json.JSONDecodeError):
                requests_fetch(base + "/bad-json", params={}, timeout=3).json()

    def test_fixture_and_http_preserve_query_values(self):
        with local_api() as base:
            for params in ({}, {"station": ""}, {"station": "Hot line"}, {"station": "A&B"}, {"page": 2}):
                before = copy.deepcopy(params)
                expected = fixture_fetch("https://classroom.test/board", params=params, timeout=3)
                actual = requests_fetch(base + "/board", params=params, timeout=3)
                self.assertEqual(actual.status_code, expected.status_code)
                self.assertEqual(actual.json(), expected.json(), f"Query contract differs for {params!r}")
                self.assertEqual(params, before)

    def test_real_transport_failure_routes_are_quiet(self):
        errors = StringIO()
        with redirect_stderr(errors), local_api() as base:
            with self.assertRaises(TimeoutError):
                requests_fetch(base + "/timeout", params={}, timeout=0.1)
            with self.assertRaises(OSError) as caught:
                requests_fetch(base + "/offline", params={}, timeout=3)
            self.assertNotIsInstance(caught.exception, TimeoutError)
        self.assertEqual(errors.getvalue(), "", "Teaching failure routes should not crash a server handler.")

    def test_transport_failure_mapping_preserves_cause(self):
        for error, kind in [(self.requests.exceptions.Timeout("slow"),TimeoutError),(self.requests.exceptions.ConnectionError("offline"),OSError)]:
            with patch("requests.get",side_effect=error):
                with self.assertRaises(kind) as caught:
                    requests_fetch("https://example.test/board",params={},timeout=3)
                self.assertIs(caught.exception.__cause__,error)

    def test_public_demo_success_and_http_fallback(self):
        demo=runpy.run_path(str(Path(__file__).with_name("code-along.py")))["public_demo"]
        for status,payload,expected in [(200,{"full_name":"StrayDogSyn/python-fall26-code-alongs","default_branch":"main"},0),(429,{},1),(302,{},1),(200,[],1)]:
            context=MagicMock()
            response=context.__enter__.return_value
            response.status_code=status
            response.json.return_value=payload
            with patch("requests.get",return_value=context) as fetch, redirect_stdout(StringIO()):
                self.assertEqual(demo(self.requests),expected)
            fetch.assert_called_once()
            self.assertEqual(fetch.call_args.kwargs["timeout"],3)
            self.assertIs(fetch.call_args.kwargs["allow_redirects"],False)
            self.assertNotIn("Authorization",fetch.call_args.kwargs["headers"])
            if status != 200:
                response.json.assert_not_called()
        for error in (self.requests.exceptions.Timeout("slow"), self.requests.exceptions.ConnectionError("offline")):
            with patch("requests.get", side_effect=error), redirect_stdout(StringIO()):
                self.assertEqual(demo(self.requests),1)
        context = MagicMock()
        context.__enter__.return_value.status_code = 200
        context.__enter__.return_value.json.side_effect = self.requests.exceptions.JSONDecodeError("bad", "x", 0)
        with patch("requests.get", return_value=context), redirect_stdout(StringIO()):
            self.assertEqual(demo(self.requests),1)

    def test_delegates_query_timeout_and_disables_redirects(self):
        response=MagicMock()
        response.__enter__.return_value.status_code=200
        response.__enter__.return_value.text='{}'
        with patch("requests.get",return_value=response) as fetch:
            result=requests_fetch("https://example.test/board",params={"station":"A&B"},timeout=3)
            self.assertEqual(result.json(),{})
            fetch.assert_called_once_with("https://example.test/board",params={"station":"A&B"},timeout=3,allow_redirects=False)
            response.__exit__.assert_called_once()


if __name__ == "__main__":
    try:
        import requests
    except ImportError:
        raise SystemExit("Install optional requirements first; see README.md")
    HTTPChecks.requests=requests
    unittest.main()
