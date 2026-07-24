from fastapi import APIRouter, Depends, status
from app.core.dependencies import get_current_user
from app.models.user import User
from app.schemas.recommendation import RecommendationRequest, RecommendationResponse
from app.services.recommendation_service import get_ai_recommendations

router = APIRouter(
    prefix="/recommendations",
    tags=["Recommendations"],  # <--- Fixed here (changed tags- to tags=)
)

@router.post("/", response_model=RecommendationResponse)
async def fetch_recommendations(
    data: RecommendationRequest, 
    current_user: User = Depends(get_current_user)
):
    result = await get_ai_recommendations(data)
    return result