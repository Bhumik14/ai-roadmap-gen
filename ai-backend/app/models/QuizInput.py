from pydantic import BaseModel
from typing import List

class QuizInput(BaseModel):
    topic: str
    purpose: str
    num_questions: int

