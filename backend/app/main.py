from fastapi import FastAPI

from app.api.auth.auth import router as auth_router
from app.api.users.routes import router as users_router
from app.api.trips.trip import router as trip_router
from app.api.trips.recommendation import router as recommendation_router

from app.core.database import Base, engine

# Import models so SQLAlchemy creates their tables
from app.models.user import User
from app.models.trip import Trip
from app.models.itinerary import Itinerary

app = FastAPI(
    title="TripAI Backend",
    version="1.0.0",
    description="TripAI API",
)

# Create database tables
Base.metadata.create_all(bind=engine)

# Register routers
app.include_router(auth_router)
app.include_router(users_router)
app.include_router(trip_router)
app.include_router(recommendation_router)


@app.get("/")
def root():
    return {
        "message": "Welcome to TripAI Backend 🚀"
    }