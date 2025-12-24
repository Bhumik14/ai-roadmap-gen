from app.clients.llm import llm

async def roadmapCreator(system_prompt: str, human_prompt: str):
    prompt = f"""
       SYSTEM:
       {system_prompt}

       USER:
       {human_prompt}
       """
    roadmap = llm.invoke(prompt)



    return {
        "success": True,
        "roadmap": roadmap
    }