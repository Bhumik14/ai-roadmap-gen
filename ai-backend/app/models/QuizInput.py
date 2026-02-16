from pydantic import BaseModel
from typing import List

class QuizInput(BaseModel):
    topic: str
    purpose: str
    previous_q_summary: List[str]

