from typing import List, Literal
from fastapi import APIRouter, Request, Query
from pydantic import BaseModel

from app.controllers.roadmapController import roadmapCreator
from app.controllers.promptController import prompt_formatter
from app.controllers.promptController import resume_prompt_formatter

from app.models.PromptRequest import PromptRequest
from app.models.RoadmapRequest import RoadmapRequest
from app.models.ResumePromptRequest import ResumePromptRequest
from app.models.QuizInput import QuizInput

from app.services.Prompt_formatter import format_quiz_prompt
from app.services.quiz_generation import generate_next_question

from app.PromptTemplate.QuizPrompt import quiz_prompt


router = APIRouter()


@router.post('/create-roadmap')
async def create(request: RoadmapRequest):
    # print(request)

    roadmap = await roadmapCreator(system_prompt=request.system, human_prompt=request.human)
    print(f"Roadmap Generated Successfully {roadmap}")
    return roadmap


@router.post('/format-prompt')
async def format_prompt(request: PromptRequest):
    # print(request)
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


@router.post("/format-resume-prompt")
async def format(request: ResumePromptRequest):
    body = {
        "resume": request.resume,
        "goals": request.goals,
        "duration": request.duration
    }
    prompt = await resume_prompt_formatter(body)
    return {
        "success": True,
        "message": "Prompt Generated",
        "formatted_message": prompt
    }


@router.post("/create-quiz")
async def create_quiz(request: QuizInput):
    body = {
        "topic": request.topic,
        "purpose": request.purpose,
        "num_questions": request.num_questions
    }
    prompt = await format_quiz_prompt(body)
    quiz = await generate_next_question(prompt)
    return {
        "message": "Question get generated Successfully",
        "quiz": quiz
    }
