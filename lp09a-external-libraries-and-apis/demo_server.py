"""Instructor-only local HTTP service; no public network or API key required."""
from contextlib import contextmanager
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from threading import Event, Thread
from urllib.parse import parse_qs, urlsplit
from transport import fixture_fetch


class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        parsed = urlsplit(self.path)
        # These routes model transport failures, not HTTP error responses.
        if parsed.path == "/timeout":
            self.server.release_delayed_requests.wait()
            self.close_connection = True
            return
        if parsed.path == "/offline":
            self.close_connection = True  # close without a response, like a dropped connection
            return
        params = {name: values[-1] for name, values in parse_qs(parsed.query, keep_blank_values=True).items()}
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
    server.release_delayed_requests = Event()
    thread = Thread(target=server.serve_forever, daemon=True)
    thread.start()
    try:
        yield f"http://127.0.0.1:{server.server_port}"
    finally:
        server.release_delayed_requests.set()
        server.shutdown()
        server.server_close()
        thread.join()
