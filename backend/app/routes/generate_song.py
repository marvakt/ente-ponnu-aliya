from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.music import generate_music

router = APIRouter()

class GenerateSongRequest(BaseModel):
    lyrics: str
    language: str

@router.post("/generate-song")
async def generate_song(request: GenerateSongRequest):
    """
    Accepts lyrics and language.
    Calls Google Lyria API to generate an actual song audio.
    Returns the URL to the generated audio file.
    """
    if not request.lyrics:
        raise HTTPException(status_code=400, detail="Lyrics cannot be empty")
        
    if request.language not in ["malayalam", "manglish"]:
        raise HTTPException(status_code=400, detail="Language must be 'malayalam' or 'manglish'")
        
    try:
        # Call Lyria Service
        audio_url = await generate_music(
            lyrics=request.lyrics,
            language=request.language
        )
        
        return {
            "success": True,
            "audioUrl": audio_url
        }
    except Exception as e:
        print(f"Error in /generate-song: {e}")
        # Return a clean error instead of crashing, handling quota/billing gracefully
        raise HTTPException(status_code=500, detail=f"Failed to generate song. Error: {str(e)}")
