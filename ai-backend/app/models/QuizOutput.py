from pydantic import BaseModel
from typing import List, Literal


class QuizQuestion(BaseModel):
    question: str
    optionA: str
    optionB: str
    optionC: str
    optionD: str
    answer: Literal["A", "B", "C", "D"]
    explanation: str

class QuizOutput(BaseModel):
    topic: str
    purpose: str
    total_questions: int
    questions: List[QuizQuestion]
