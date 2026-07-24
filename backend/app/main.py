from fastapi import FastAPI

from app.api.auth.auth import router as auth_router
from app.api.trips.recommendation import router as recommendation_router
from app.api.trips.trip import router as trip_router
from app.core.database import Base, engine
from app.models.itinerary import Itinerary
from app.models.trip import Trip
from app.models.user import User

# 1. Initialize FastAPI instance FIRST
app = FastAPI(
    title="TripAI Backend",
    version="1.0.0",
    description="TripAI API",
)

# 2. Create database tables
Base.metadata.create_all(bind=engine)

# 3. Include all routers AFTER app is initialized
app.include_router(auth_router)
app.include_router(trip_router)
app.include_router(recommendation_router)


@app.get("/")
def root():
    return {"message": "Welcome to TripAI Backend 🚀"}