from langchain_google_genai import ChatGoogleGenerativeAI
import getpass
import os

llm = ChatGoogleGenerativeAI(
    model = "gemini-2.5-flash",
    temperature = 0.7,
    max_tokens=1000,
    google_api_key = "AIzaSyA64NJ3o9FZDNkKI8-uQlKVYYbqNRG4Uec",
)
