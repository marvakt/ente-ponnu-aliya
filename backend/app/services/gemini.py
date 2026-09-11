import os
import json
from google import genai
from google.genai import types
from dotenv import load_dotenv
from app.prompts.roast_prompt import ROAST_SYSTEM_PROMPT

load_dotenv()

# Initialize the Gemini client. It will automatically pick up GEMINI_API_KEY from the environment.
client = genai.Client()

async def generate_roast_lyrics(language: str, audio_bytes: bytes = None, audio_mime: str = None, image_bytes: bytes = None, image_mime: str = None) -> dict:
    """
    Calls the Gemini API to generate the roasting lyrics and motivation text.
    Returns a dict with 'lyrics' and 'motivation'.
    """
    
    parts = []
    
    # Add System Prompt Part (simulating system instruction through prompt setup, or explicitly if supported)
    # The gemini-2.5-flash model supports system instructions.
    
    # Add Image Part
    if image_bytes and image_mime:
        parts.append(
            types.Part.from_bytes(
                data=image_bytes,
                mime_type=image_mime,
            )
        )
        
    # Add Audio Part
    if audio_bytes and audio_mime:
        parts.append(
            types.Part.from_bytes(
                data=audio_bytes,
                mime_type=audio_mime,
            )
        )
        
    # Add the text prompt telling it what language to use
    user_prompt = f"The user has shared their problem with you. IMPORTANT: language = \"{language.lower()}\". Please follow the LANGUAGE rules from the system instructions strictly."
    parts.append(user_prompt)
    
    # Setup configuration for JSON output and system instructions
    config = types.GenerateContentConfig(
        system_instruction=ROAST_SYSTEM_PROMPT,
        response_mime_type="application/json",
        temperature=0.8,
    )
    
    try:
        response = client.models.generate_content(
            model='gemini-3.6-flash',
            contents=parts,
            config=config
        )
        
        response_text = response.text
        # Parse the JSON string from Gemini
        try:
            result = json.loads(response_text)
            return {
                "lyrics": result.get("lyrics", ""),
                "motivation": result.get("motivation", "")
            }
        except json.JSONDecodeError:
            # Fallback if Gemini somehow didn't return perfect JSON despite the response_mime_type
            return {
                "lyrics": "Error parsing lyrics.",
                "motivation": "Could not parse motivation from AI.",
                "raw_response": response_text
            }
            
    except Exception as e:
        print(f"Gemini API Error: {e}")
        raise
