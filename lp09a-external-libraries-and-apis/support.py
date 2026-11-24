"""Instructor helpers shared by the offline exercises. No third-party imports."""
import json
from dataclasses import dataclass


class HTTPStatusError(ValueError):
    """This lesson's JSON endpoint requires HTTP 200, not another status."""
    def __init__(self, status):
        self.status = status
        super().__init__(f"Expected HTTP 200, got {status}")


@dataclass
class Response:
    status_code: int
    text: str

    def json(self):
        return json.loads(self.text)
