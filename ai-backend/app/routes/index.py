from typing import List, Literal

from fastapi import APIRouter, Request, Query
from pydantic import BaseModel

from app.controllers.roadmapController import roadmapCreator
from app.controllers.promptController import prompt_formatter

router = APIRouter()

class PromptRequest(BaseModel):
    target_role: str
    experience: str
    skills: List[str]
    goals: List[str]
    duration: str

class RoadmapRequest(BaseModel):
    system: str
    human: str

@router.post('/create-roadmap')
async def create(request: RoadmapRequest):
    print(request)

    roadmap = await roadmapCreator(system_prompt=request.system, human_prompt=request.human)
    print(f"Roadmap Generated Successfully {roadmap}")
    return roadmap


@router.post('/format-prompt')
async def format_prompt(request: PromptRequest):
    print(request)
    body = {
        "target_role": request.target_role,
        "experience": request.experience,
        "skills": request.skills,
        "goals": request.goals,
        "duration": request.duration,
    }
    formatted = await prompt_formatter(body)
    print(f"Prompt Generated Successfully {formatted}")
    return {
        "success": True,
        "message": "Prompt Generated",
        "formatted_message": formatted
    }
