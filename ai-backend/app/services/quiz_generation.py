from app.clients.llm import quiz_model

async def generate_next_question(prompt):
    print("Prompt", prompt)
    print("Entered in quiz generation")
    question = quiz_model.invoke(prompt)
    print("Question", question)
    return question
