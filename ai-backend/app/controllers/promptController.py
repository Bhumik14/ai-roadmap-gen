from langchain_core.prompts import ChatPromptTemplate
import json

async def prompt_formatter(body: dict):
    # body = await request.json()

    target_role = body["target_role"]
    skills = body["skills"]
    goals = body["goals"]
    duration = body["duration"]

    template = ChatPromptTemplate.from_messages([
        ("system", "You are an expert career coach and learning roadmap generator. Create personalized, actionable learning roadmaps for tech roles. Structure output as JSON with steps, resources, timelines, and milestones. Consider user's experience level, current skills, specific goals, and available weekly time."),
        ("human", "Target Role: {role} Current Skills: {skills} Learning Goals: {goals} Available duration: {duration} months. Generate a detailed step-by-step roadmap to reach this role.")
    ])

    formatted_prompt = template.format_messages(
        role=target_role,
        skills=skills,
        goals=goals,
        duration=duration
    )
    return formatted_prompt



async def resume_prompt_formatter(body: dict):
    resume = body['resume']
    goals = body['goals']
    duration = body['duration']

    template = ChatPromptTemplate([
        (
            "system",
            """
You are an expert career mentor and learning roadmap planner.

Your job is to analyze a candidate’s resume and create a highly personalized learning roadmap.

You MUST:
- Understand the candidate’s current level (student, fresher, junior engineer, etc.)
- Identify their strongest skills from the resume
- Detect missing skills and knowledge gaps required for the target goal
- Recommend realistic learning steps based on the given duration
- Keep the roadmap aligned with industry expectations

Roadmap should be:
- Practical, structured, and step-by-step
- Personalized based on the candidate’s experience
- Focused on the skills needed for the goal role
- Divided into weeks or months depending on duration

Output must be clear, detailed, and motivating.
            """
        ),
        (
            "human",
            """
Here is the candidate's resume text:

==================== RESUME ====================
{resume}
================================================

The candidate’s learning/career goal is:
➡️ {goals}

The candidate wants to achieve this within:
⏳ {duration}

Your task:

1. Summarize the candidate’s current profile (education, projects, skills).
2. Identify what level they are currently at (beginner/intermediate/advanced).
3. Identify missing or weak skills compared to the goal role.
4. Create a detailed roadmap for the given duration.

Roadmap must include:
- Key skills to learn
- Recommended resources or project ideas
- Weekly/monthly breakdown
- Milestones to track progress
- Final portfolio/project suggestions

Make the roadmap realistic for the candidate’s background and timeframe.
            """
        )
    ])

    formatted_prompt = template.format_messages(
        resume=resume,
        goals=goals,
        duration=duration
    )

    return formatted_prompt

async def format_quiz_prompt(body):
    pass
