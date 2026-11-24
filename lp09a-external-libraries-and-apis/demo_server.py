"""Instructor-only local HTTP service; no public network or API key required."""
from contextlib import contextmanager
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from threading import Thread
from urllib.parse import parse_qs, urlsplit
from transport import fixture_fetch


class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        parsed = urlsplit(self.path)
        params = {name: values[-1] for name, values in parse_qs(parsed.query).items()}
        response = fixture_fetch("http://classroom.test" + parsed.path, params=params, timeout=3)
        body = response.text.encode("utf-8")
        self.send_response(response.status_code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, *args):
        pass  # quiet classroom service; no request URLs or headers logged


@contextmanager
def local_api():
    # Port zero asks the OS for an available port; listen only on this machine.
    server = ThreadingHTTPServer(("127.0.0.1", 0), Handler)
    thread = Thread(target=server.serve_forever, daemon=True)
    thread.start()
    try:
        yield f"http://127.0.0.1:{server.server_port}"
    finally:
        server.shutdown()
        server.server_close()
        thread.join()
