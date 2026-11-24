"""Week 9 offline checks: --solutions or --module PATH selects another file."""
import argparse
import copy
from contextlib import redirect_stdout
from io import StringIO
import importlib.util
import json
from pathlib import Path
import sys
import unittest
from unittest.mock import Mock
from support import Response, HTTPStatusError

HERE = Path(__file__).resolve().parent
EXERCISES = ('decode_object', 'status_group', 'ticket_titles', 'repair_available', 'repair_fetch', 'api_headers', 'next_page', 'request_object', 'safe_board', 'merge_tickets', 'destination_city')

def load_module(path):
    spec = importlib.util.spec_from_file_location("week9_work", path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module

class LessonChecks(unittest.TestCase):
    target = None

    def expect(self,name,args,expected,nudge):
        try:
            actual=getattr(self.target,name)(*args)
        except NotImplementedError:
            raise
        except Exception as error:
            self.fail(f"input {args!r}; expected {expected!r}, got {type(error).__name__}: {error}. Hint: {nudge}")
        self.assertIs(type(actual),type(expected),f"input {args!r}. Hint: {nudge}")
        self.assertEqual(actual,expected,f"input {args!r}. Hint: {nudge}")
        return actual

    def test_01_decode_object(self):
        self.expect("decode_object", ('{"open":true,"note":null}',), {"open": True, "note": None}, "Decode, do not evaluate Python source.")
        self.expect("decode_object", ('{}',), {}, "An empty object is still an object.")
        for text in ('[]', 'null', '7'):
            with self.assertRaisesRegex(ValueError, "object required"):
                self.target.decode_object(text)
        with self.assertRaises(json.JSONDecodeError):
            self.target.decode_object("{'open': True}")

    def test_02_status_group(self):
        for code, expected in [(100,"other"),(199,"other"),(200,"success"),(204,"success"),(299,"success"),(300,"other"),(399,"other"),(400,"client"),(499,"client"),(500,"server"),(599,"server"),(600,"other")]:
            self.expect("status_group", (code,), expected, "Use half-open ranges, not only status 200.")

    def test_03_ticket_titles(self):
        payload={"tickets":[{"dish":"Soup"},{"dish":"Soup"},{"dish":"Tart"}]}
        before=copy.deepcopy(payload)
        self.expect("ticket_titles", (payload,), ["Soup","Soup","Tart"], "Keep order and duplicates.")
        self.assertEqual(payload,before)
        self.expect("ticket_titles", ({"tickets":[]},), [], "Empty success differs from missing data.")
        for payload in ({},[],{"tickets":None},{"tickets":[{}]},{"tickets":[{"dish":7}]},{"tickets":[None]}):
            with self.assertRaisesRegex(ValueError,"tickets required"):
                self.target.ticket_titles(payload)

    def test_04_repair_available(self):
        rows=[{"item":"Soup","available":True},{"item":"Tart","available":"false"},{"item":"Rice","available":1},{"item":"Bread","available":False},{"item":"Salt"}]
        before=copy.deepcopy(rows)
        self.expect("repair_available", (rows,), ["Soup"], "Only the JSON Boolean true should pass.")
        self.assertEqual(rows,before)
        self.expect("repair_available", ([],), [], "No inventory gives no items.")

    def test_05_repair_fetch(self):
        params={"station":"Hot line"};before=dict(params)
        fetch=Mock(return_value=Response(200,'{}'))
        self.expect("repair_fetch", (fetch,"https://example.test/board",params), 200, "Use params, not data, and supply timeout.")
        fetch.assert_called_once_with("https://example.test/board",params=params,timeout=3)
        self.assertEqual(params,before)
        for status in (204, 404, 503):
            fetch = Mock(return_value=Response(status, '{}'))
            self.expect("repair_fetch", (fetch, "https://example.test/board", params), status, "Return the actual status, including a non-200 response.")
            fetch.assert_called_once_with("https://example.test/board", params=params, timeout=3)
        error=TimeoutError("slow")
        with self.assertRaises(TimeoutError) as caught:
            self.target.repair_fetch(Mock(side_effect=error),"x",{})
        self.assertIs(caught.exception,error)

    def test_06_api_headers(self):
        output=StringIO()
        with redirect_stdout(output):
            self.expect("api_headers", (" CLASSROOM_ONLY ",), {"Authorization":"Bearer CLASSROOM_ONLY","Accept":"application/json"}, "Trim the key and keep it in a header.")
        self.assertEqual(output.getvalue(),"")
        with self.assertRaisesRegex(ValueError,"key required"):
            self.target.api_headers(" \t")

    def test_07_next_page(self):
        self.expect("next_page", ({"next_page":2},), 2, "Use the server-provided continuation.")
        self.expect("next_page", ({"next_page":None},), None, "Null means there is no next page.")
        for payload in ({},{"next_page":0},{"next_page":-1},{"next_page":True},{"next_page":"2"}):
            with self.assertRaisesRegex(ValueError,"invalid page"):
                self.target.next_page(payload)

    def test_08_request_object(self):
        fetch=Mock(return_value=Response(200,'{"tickets":[]}'))
        self.expect("request_object", (fetch,"x",{"station":"Grill"}), {"tickets":[]}, "Check status before decoding.")
        fetch.assert_called_once_with("x",params={"station":"Grill"},timeout=3)
        for status in (204,404,429,500):
            response=Mock(status_code=status)
            with self.assertRaises(HTTPStatusError) as caught:
                self.target.request_object(Mock(return_value=response),"x",{})
            self.assertEqual(caught.exception.status,status)
            response.json.assert_not_called()
        error = OSError("connection failure")
        with self.assertRaises(OSError) as caught:
            self.target.request_object(Mock(side_effect=error), "x", {})
        self.assertIs(caught.exception, error, "Do not replace a transport exception with a new one.")
        with self.assertRaises(json.JSONDecodeError):
            self.target.request_object(Mock(return_value=Response(200,'not JSON')),"x",{})
        with self.assertRaisesRegex(ValueError,"object required"):
            self.target.request_object(Mock(return_value=Response(200,'[]')),"x",{})

    def test_09_safe_board(self):
        for response, expected in [(Response(200,'{"tickets":[]}'),([],None)),(Response(200,'{"tickets":[{"dish":"Soup"}]}'),(["Soup"],None)),(Response(404,'{}'),([],"http")),(Response(200,'{'),([],"json")),(Response(200,'{}'),([],"shape")),(Response(200,'[]'),([],"shape"))]:
            self.expect("safe_board", (Mock(return_value=response),"x"), expected, "Keep empty success distinct from a failed request.")
        for error,reason in [(TimeoutError("slow"),"timeout"),(OSError("offline"),"connection")]:
            self.expect("safe_board", (Mock(side_effect=error),"x"), ([],reason), "Catch the more specific class first.")
        with self.assertRaises(TypeError):
            self.target.safe_board(Mock(side_effect=TypeError("caller bug")),"x")

    def test_10_merge_tickets(self):
        pages=[{"tickets":[{"id":3,"dish":"Soup"}]},{"tickets":[{"id":3,"dish":"Changed"},{"id":4,"dish":"Soup"}]}]
        before=copy.deepcopy(pages)
        actual=self.expect("merge_tickets", (pages,), [{"id":3,"dish":"Soup"},{"id":4,"dish":"Soup"}], "Deduplicate by ID, keeping the first version.")
        actual[0]["dish"]="edited"
        self.assertEqual(pages,before,"Do not share row dictionaries with the caller.")
        self.expect("merge_tickets", ([],), [], "No pages means no tickets.")

    def test_11_destination_city(self):
        for paths,expected in [([["B","C"],["A","B"]],"C"),([["A","Z"]],"Z"),([["D","B"],["C","A"],["B","C"]],"A")]:
            before=copy.deepcopy(paths)
            self.expect("destination_city", (paths,), expected, "The last row is not necessarily the end of the route.")
            self.assertEqual(paths,before)

class LineResult(unittest.TestResult):
    def __init__(self):
        super().__init__()
        self.statuses = {}

    @staticmethod
    def name(test):
        return test._testMethodName.split("_", 2)[2]

    def addSuccess(self, test):
        super().addSuccess(test)
        name = self.name(test)
        self.statuses[name] = "PASS"
        print(f"PASS {name}")

    def addFailure(self, test, error):
        super().addFailure(test, error)
        name = self.name(test)
        self.statuses[name] = "FAIL"
        print(f"FAIL {name}: {error[1]}")

    def addError(self, test, error):
        super().addError(test, error)
        name = self.name(test)
        if isinstance(error[1], NotImplementedError):
            self.statuses[name] = "NOT STARTED"
            print(f"NOT STARTED {name}: {error[1]}")
        else:
            self.statuses[name] = "FAIL"
            print(f"FAIL {name}: {type(error[1]).__name__}: {error[1]}")


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    group = parser.add_mutually_exclusive_group()
    group.add_argument("--solutions", action="store_true")
    group.add_argument("--module", type=Path)
    args = parser.parse_args(argv)
    path = args.module or HERE / ("solutions.py" if args.solutions else "practice.py")
    LessonChecks.target = load_module(path)
    result = LineResult()
    unittest.defaultTestLoader.loadTestsFromTestCase(LessonChecks).run(result)
    return 0 if len(result.statuses) == len(EXERCISES) and all(
        status == "PASS" for status in result.statuses.values()
    ) else 1


if __name__ == "__main__":
    raise SystemExit(main())
