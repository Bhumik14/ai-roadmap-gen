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
        ("human", "Target Role: {role} Current Skills: {skills} Learning Goals: {goals} Available duration: {duration} months. Generate a detailed step-by-step roadmap to reach this role."),
        ("ai", "Understood. Generating personalized roadmap...")
    ])

    formatted_prompt = template.format_messages(
        role=target_role,
        skills=skills,
        goals=goals,
        duration=duration
    )
    return formatted_prompt

