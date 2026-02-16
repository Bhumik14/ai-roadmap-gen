from pydantic import BaseModel

class ResumePromptRequest(BaseModel):
    resume: str
    goals: str
    duration: str
