from pydantic import BaseModel

class ItineraryCreate(BaseModel):
    trip_id: int
    content: str

class ItineraryResponse(BaseModel):
    id: int
    trip_id: int
    content: str

    class Config:
        from_attributes = True