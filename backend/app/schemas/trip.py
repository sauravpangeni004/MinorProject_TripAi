from pydantic import BaseModel

class TripCreate(BaseModel):
    destination: str
    start_date: str
    end_date: str

class TripResponse(BaseModel):
    id: int
    destination: str
    start_date: str
    end_date: str
    user_id: int

    class Config:
        from_attributes = True