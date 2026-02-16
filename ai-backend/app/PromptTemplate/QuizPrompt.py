from langchain_core.prompts import ChatPromptTemplate

quiz_prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            """
You are an expert quiz generation assistant.

Your task is to create high-quality multiple-choice quiz questions based on the given topic and purpose.

Guidelines:
- Generate exactly the requested number of questions.
- Each question should be clear, relevant, and appropriate for the topic.
- Provide four distinct answer choices (A, B, C, D).
- Only one option must be correct.
- Include a brief explanation justifying why the correct answer is right.
- Match the difficulty level to the purpose (e.g., exam practice, learning, interview prep).
- Keep the questions accurate, engaging, and well-structured.
"""
        ),
        (
            "human",
            """
Generate a quiz with the following details:

Topic: {topic}
Purpose: {purpose}
Number of Questions: {num_questions}

Now create the quiz questions accordingly.
"""
        ),
    ]
)
