from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.index import router as roadmap_router
import dotenv
dotenv.load_dotenv()
app = FastAPI(title="AI Roadmap Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
app.include_router(roadmap_router, prefix="/api/roadmap")
