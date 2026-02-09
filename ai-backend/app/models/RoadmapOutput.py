from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel, Field


# ---------- METADATA ----------

class RoadmapMetadata(BaseModel):
    role: str = Field(..., description="Target role or profile")
    goal: str = Field(..., description="Learning or career goal")
    experience_level: str = Field(
        ..., description="Beginner | Intermediate | Advanced"
    )
    time_commitment: Optional[str] = Field(
        None, description="e.g. 10 hours/week"
    )
    total_duration: Optional[str] = Field(
        None, description="e.g. 6 months"
    )
    generated_at: datetime = Field(
        default_factory=datetime.utcnow
    )


# ---------- TOPICS ----------

class Topic(BaseModel):
    topic_name: str
    subtopics: List[str]
    priority: Optional[str] = Field(
        None, description="high | medium | low"
    )


# ---------- HANDS-ON ----------

class HandsOn(BaseModel):
    exercises: Optional[List[str]] = None
    mini_project: Optional[str] = None


# ---------- RESOURCES ----------

class Resource(BaseModel):
    title: str
    url: Optional[str] = None


class PhaseResources(BaseModel):
    articles: Optional[List[Resource]] = None
    videos: Optional[List[Resource]] = None
    courses: Optional[List[Resource]] = None


# ---------- PHASE ----------

class RoadmapPhase(BaseModel):
    phase_id: int
    phase_title: str
    duration: str
    objective: Optional[str] = None
    topics: List[Topic]
    hands_on: Optional[HandsOn] = None
    resources: Optional[PhaseResources] = None
    milestones: Optional[List[str]] = None


# ---------- PROJECTS ----------

class Project(BaseModel):
    project_title: str
    description: str
    skills_covered: List[str]


# ---------- ASSESSMENT ----------

class Assessment(BaseModel):
    self_check_questions: Optional[List[str]] = None
    evaluation_criteria: Optional[List[str]] = None


# ---------- NEXT STEPS ----------

class NextSteps(BaseModel):
    career_paths: Optional[List[str]] = None
    advanced_topics: Optional[List[str]] = None


# ---------- MAIN ROADMAP ----------

class RoadmapOutput(BaseModel):
    metadata: RoadmapMetadata
    roadmap_overview: Optional[str] = None
    phases: List[RoadmapPhase]
    projects: Optional[List[Project]] = None
    assessment: Optional[Assessment] = None
    next_steps: Optional[NextSteps] = None
