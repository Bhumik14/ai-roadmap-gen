from pydantic import BaseModel
from typing import List

class PromptRequest(BaseModel):

    target_role: str
    experience: str
    skills: List[str]
    goals: List[str]
    duration: str
