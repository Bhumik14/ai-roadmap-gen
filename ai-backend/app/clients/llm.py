from langchain_ollama import ChatOllama

from app.models.RoadmapOutput import RoadmapOutput
from app.models.QuizOutput import QuizOutput

llm = ChatOllama(
    model="ministral-3:3b",
    temperature=0
)
model = llm.with_structured_output(RoadmapOutput)
quiz_model = llm.with_structured_output(QuizOutput)
