from pydantic import BaseModel
from typing import Literal


class QuestionOutput(BaseModel):
    question: str
    optionA: str
    optionB: str
    optionC: str
    optionD: str
    answer: Literal["A", "B", "C", "D"]
    explanation: str
