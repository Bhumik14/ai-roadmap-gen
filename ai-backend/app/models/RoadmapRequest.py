from pydantic import BaseModel

class RoadmapRequest(BaseModel):
    system: str
    human: str
