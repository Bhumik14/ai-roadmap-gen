from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.agents import create_agent
from app.models.RoadmapOutput import RoadmapOutput
import getpass
import os
from langchain_ollama import ChatOllama

# llm = ChatGoogleGenerativeAI(
#     model = "gemini-2.5-flash",
#     temperature = 0.7,
#     max_tokens=1000,
#     google_api_key = "AIzaSyA64NJ3o9FZDNkKI8-uQlKVYYbqNRG4Uec",
# )


model = ChatOllama(
    model="ministral-3:3b",
    temperature=0
)
model = model.with_structured_output(RoadmapOutput)


# model = create_agent(
#     model=llm,
#     response_format=RoadmapOutput
# )
