from langchain_core.prompts import ChatPromptTemplate
import json
async def prompt_formatter(body: dict):
    # body = await request.json()

    target_role = body["target_role"]
    experience = body["experience"]
    skills = body["skills"]
    goals = body["goals"]
    weekly_time = body["weekly_time"]

    template = ChatPromptTemplate.from_messages([
        ("system", "You are an expert career coach and learning roadmap generator. Create personalized, actionable learning roadmaps for tech roles. Structure output as JSON with steps, resources, timelines, and milestones. Consider user's experience level, current skills, specific goals, and available weekly time."),
        ("human", "Target Role: {target_role} Current Experience: {experience} Current Skills: {skills} Learning Goals: {goals} Available Weekly Time: {weekly_time} hours Generate a detailed step-by-step roadmap to reach this role."),
        ("ai", "Understood. Generating personalized roadmap...")
    ])

    formatted_prompt = template.format_messages(
        target_role=target_role,
        experience=experience,
        skills=skills,
        goals=goals,
        weekly_time=weekly_time
    )
    return formatted_prompt

