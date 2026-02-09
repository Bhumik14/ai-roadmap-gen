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
    # json_block = re.search(r"```json\s*(\{.*?\})\s*```", content, re.DOTALL).group(1)
    # json_block = re.sub(r"//.*?$", "", json_block, flags=re.MULTILINE)

    # roadmap_json = json.loads(json_block)



    return content