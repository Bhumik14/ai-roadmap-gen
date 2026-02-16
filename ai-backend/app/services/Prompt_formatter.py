from app.PromptTemplate.QuizPrompt import quiz_prompt

async def format_quiz_prompt(body):
    prompt = quiz_prompt.format_messages(
        purpose=body['purpose'],
        topic=body['topic'],
        num_questions=body['num_questions']
    )
    return prompt
