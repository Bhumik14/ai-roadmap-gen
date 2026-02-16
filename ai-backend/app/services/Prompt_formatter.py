from app.PromptTemplate.QuizPrompt import quiz_prompt

async def format_quiz_prompt(body):
    prompt = quiz_prompt.format_messages(
        purpose=body['purpose'],
        topic=body['topic'],
        previous_q_summary=body['previous_summary']
    )
    return prompt
