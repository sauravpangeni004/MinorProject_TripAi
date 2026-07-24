import httpx
from app.schemas.recommendation import RecommendationRequest, RecommendationResponse

# If your friend's model is hosted on another URL/port, put it here:
FRIEND_ML_MODEL_URL = "http://localhost:8001/predict-destination"

async def get_ai_recommendations(data: RecommendationRequest) -> RecommendationResponse:
    async with httpx.AsyncClient() as client:
        try:
            # Sending user preferences to your friend's ML service
            response = await client.post(FRIEND_ML_MODEL_URL, json=data.dict(), timeout=30.0)
            response.raise_for_status()
            return RecommendationResponse(**response.json())
        except httpx.HTTPError as e:
            # Fallback mock data if your friend's server isn't running yet during development
            return RecommendationResponse(
                recommended_destination="Kyoto, Japan",
                destination_overview="A serene city known for classical Buddhist temples, gardens, and imperial palaces.",
                homestays=[
                    {
                        "name": "Traditional Machiya Stay",
                        "location": "Gion District",
                        "price_per_night": 120.0,
                        "description": "Authentic wooden townhouse experience close to historic sites."
                    }
                ]
            )