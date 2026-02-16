from app.clients.llm import model
import re
import json

async def roadmapCreator(system_prompt: str, human_prompt: str):
    prompt = f"""
       SYSTEM:
       {system_prompt}

       USER:
       {human_prompt}
       """
    roadmap = model.invoke(prompt)
    content = roadmap
    print(content)
    
    return content