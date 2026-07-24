from pydantic import BaseModel
from typing import List

class RecommendationRequest(BaseModel):
    preferences: str
    budget: str
    travelers_count: int

class HomestayResponse(BaseModel):
    name: str
    location: str
    price_per_night: float
    description: str

class RecommendationResponse(BaseModel):
    recommended_destination: str
    destination_overview: str
    homestays: List[HomestayResponse]