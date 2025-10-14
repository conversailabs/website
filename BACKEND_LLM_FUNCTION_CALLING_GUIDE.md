# Backend LLM Function Calling Guide
## Voice-Based Appointment Booking with Cal.com

This document explains how to implement LLM function calling for the voice booking feature.

---

## Overview

The frontend has been set up to handle live transcription and booking confirmation. Your backend needs to:

1. **Use an LLM with function calling** (OpenAI, Anthropic Claude, or similar)
2. **Define booking-related functions/tools** for the LLM
3. **Integrate with Cal.com API** for availability and booking
4. **Send WebSocket messages** to the frontend with results

---

## Function Definitions for LLM

Define these two functions/tools in your LLM configuration:

### Function 1: check_availability

**Purpose:** Check available time slots for a given date

**Definition (OpenAI format):**
```json
{
  "name": "check_availability",
  "description": "Check available appointment slots for booking a demo. Use this when the user wants to schedule an appointment or asks about available times.",
  "parameters": {
    "type": "object",
    "properties": {
      "date": {
        "type": "string",
        "description": "The date to check availability for, in YYYY-MM-DD format (e.g., '2025-10-15')"
      },
      "duration": {
        "type": "integer",
        "description": "Duration of the meeting in minutes. Default is 30 minutes.",
        "default": 30,
        "enum": [15, 30, 60]
      }
    },
    "required": ["date"]
  }
}
```

**Definition (Anthropic Claude format):**
```json
{
  "name": "check_availability",
  "description": "Check available appointment slots for booking a demo. Use this when the user wants to schedule an appointment or asks about available times.",
  "input_schema": {
    "type": "object",
    "properties": {
      "date": {
        "type": "string",
        "description": "The date to check availability for, in YYYY-MM-DD format (e.g., '2025-10-15')"
      },
      "duration": {
        "type": "integer",
        "description": "Duration of the meeting in minutes. Default is 30 minutes.",
        "default": 30,
        "enum": [15, 30, 60]
      }
    },
    "required": ["date"]
  }
}
```

---

### Function 2: book_appointment

**Purpose:** Book an appointment at a specific date and time

**Definition (OpenAI format):**
```json
{
  "name": "book_appointment",
  "description": "Book an appointment slot for the user. Use this after the user has selected a specific time from the available slots.",
  "parameters": {
    "type": "object",
    "properties": {
      "date": {
        "type": "string",
        "description": "Date of the appointment in YYYY-MM-DD format"
      },
      "time": {
        "type": "string",
        "description": "Time of the appointment in HH:MM format (24-hour, e.g., '14:30' for 2:30 PM)"
      },
      "email": {
        "type": "string",
        "format": "email",
        "description": "User's email address for sending the calendar invite"
      },
      "name": {
        "type": "string",
        "description": "User's full name"
      },
      "duration": {
        "type": "integer",
        "description": "Duration of the meeting in minutes",
        "default": 30
      },
      "notes": {
        "type": "string",
        "description": "Any additional notes or requirements from the user"
      }
    },
    "required": ["date", "time", "email"]
  }
}
```

**Definition (Anthropic Claude format):**
```json
{
  "name": "book_appointment",
  "description": "Book an appointment slot for the user. Use this after the user has selected a specific time from the available slots.",
  "input_schema": {
    "type": "object",
    "properties": {
      "date": {
        "type": "string",
        "description": "Date of the appointment in YYYY-MM-DD format"
      },
      "time": {
        "type": "string",
        "description": "Time of the appointment in HH:MM format (24-hour, e.g., '14:30' for 2:30 PM)"
      },
      "email": {
        "type": "string",
        "description": "User's email address for sending the calendar invite"
      },
      "name": {
        "type": "string",
        "description": "User's full name"
      },
      "duration": {
        "type": "integer",
        "description": "Duration of the meeting in minutes",
        "default": 30
      },
      "notes": {
        "type": "string",
        "description": "Any additional notes or requirements from the user"
      }
    },
    "required": ["date", "time", "email"]
  }
}
```

---

## System Prompt for LLM

```
You are a helpful AI assistant for booking demo appointments.

Your responsibilities:
1. Help users schedule appointments by checking availability and booking time slots
2. Collect necessary information (date, time, email) conversationally
3. Use the check_availability function to find available slots
4. Use the book_appointment function to confirm bookings
5. Always be friendly, clear, and professional

Conversation flow:
- When a user wants to book, first ask for their preferred date
- Use check_availability to get available slots
- Present the options clearly (e.g., "I have these times available: 2:00 PM, 3:30 PM, 5:00 PM")
- Once they choose a time, get their email address
- Use book_appointment to confirm the booking
- After booking, congratulate them and provide all details

Important:
- Always confirm details before booking
- Be patient if users need to reschedule
- Format dates and times in a human-friendly way
- After successful booking, provide the booking confirmation details
```

---

## Cal.com API Integration

### Setup

1. **Create Cal.com Account**: Sign up at https://cal.com
2. **Get API Key**: Go to Settings > Developer > API Keys
3. **Create Event Type**: Create a "Demo Call" event type
4. **Note Event Type ID**: You'll need this for API calls

### Environment Variables

```env
CAL_COM_API_KEY=cal_live_xxxxxxxxxxxxxxxxxxxxx
CAL_COM_EVENT_TYPE_ID=123456
CAL_COM_API_URL=https://api.cal.com/v1
```

---

### Implementation: check_availability

```python
import httpx
from datetime import datetime, timedelta

async def check_availability(date: str, duration: int = 30):
    """
    Check available slots on Cal.com for a given date

    Args:
        date: Date in YYYY-MM-DD format
        duration: Meeting duration in minutes

    Returns:
        dict with available slots
    """

    # Parse the date
    target_date = datetime.strptime(date, "%Y-%m-%d")
    start_time = target_date.replace(hour=0, minute=0, second=0)
    end_time = target_date.replace(hour=23, minute=59, second=59)

    # Cal.com API endpoint for availability
    url = f"{CAL_COM_API_URL}/availability"

    headers = {
        "Authorization": f"Bearer {CAL_COM_API_KEY}",
        "Content-Type": "application/json"
    }

    params = {
        "eventTypeId": CAL_COM_EVENT_TYPE_ID,
        "startTime": start_time.isoformat(),
        "endTime": end_time.isoformat(),
        "timeZone": "UTC"  # or get from user
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers, params=params)
        response.raise_for_status()
        data = response.json()

    # Format the available slots
    slots = []
    for slot in data.get("slots", []):
        time_obj = datetime.fromisoformat(slot["time"])
        slots.append({
            "time": time_obj.strftime("%H:%M"),
            "formatted": time_obj.strftime("%I:%M %p")  # e.g., "02:30 PM"
        })

    return {
        "date": date,
        "slots": slots
    }
```

---

### Implementation: book_appointment

```python
async def book_appointment(
    date: str,
    time: str,
    email: str,
    name: str = "Anonymous",
    duration: int = 30,
    notes: str = None
):
    """
    Book an appointment on Cal.com

    Args:
        date: Date in YYYY-MM-DD format
        time: Time in HH:MM format (24-hour)
        email: User's email
        name: User's name
        duration: Meeting duration in minutes
        notes: Additional notes

    Returns:
        dict with booking confirmation
    """

    # Combine date and time
    datetime_str = f"{date}T{time}:00"
    start_time = datetime.fromisoformat(datetime_str)

    # Cal.com API endpoint for bookings
    url = f"{CAL_COM_API_URL}/bookings"

    headers = {
        "Authorization": f"Bearer {CAL_COM_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "eventTypeId": CAL_COM_EVENT_TYPE_ID,
        "start": start_time.isoformat() + "Z",
        "responses": {
            "name": name,
            "email": email,
            "notes": notes or "Booked via voice call"
        },
        "timeZone": "UTC",
        "language": "en",
        "metadata": {
            "source": "voice_booking",
            "bookingTime": datetime.now().isoformat()
        }
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(url, headers=headers, json=payload)
        response.raise_for_status()
        booking_data = response.json()

    # Format response for frontend
    return {
        "success": True,
        "id": booking_data["id"],
        "uid": booking_data["uid"],
        "date": date,
        "time": time,
        "formatted_time": start_time.strftime("%A, %B %d at %I:%M %p"),
        "duration": duration,
        "email": email,
        "calendar_link": booking_data.get("meetingUrl") or booking_data.get("videoCallUrl"),
        "name": name
    }
```

---

## WebSocket Message Protocol

Send these messages from your backend to the frontend:

### Message Type 1: Transcript

Send transcription of user speech and agent responses:

```json
{
  "type": "transcript",
  "role": "user" | "agent",
  "text": "The transcribed or generated text",
  "is_final": true,
  "timestamp": "2025-10-10T14:30:00Z"
}
```

**Example:**
```json
{
  "type": "transcript",
  "role": "user",
  "text": "I'd like to schedule a demo for next Tuesday",
  "is_final": true,
  "timestamp": "2025-10-10T14:30:15Z"
}
```

---

### Message Type 2: Function Result (Availability)

After calling `check_availability`, send the results:

```json
{
  "type": "function_result",
  "function_name": "check_availability",
  "status": "success",
  "result": {
    "date": "2025-10-15",
    "slots": [
      {"time": "14:00", "formatted": "2:00 PM"},
      {"time": "15:30", "formatted": "3:30 PM"},
      {"time": "17:00", "formatted": "5:00 PM"}
    ]
  }
}
```

**Frontend behavior:** Displays an availability card with the time slots

---

### Message Type 3: Booking Confirmation

After calling `book_appointment`, send the confirmation:

```json
{
  "type": "booking_confirmed",
  "booking": {
    "id": "booking_abc123",
    "uid": "unique_booking_id",
    "date": "2025-10-15",
    "time": "15:30",
    "formatted_time": "Tuesday, October 15th at 3:30 PM",
    "duration": 30,
    "email": "user@example.com",
    "calendar_link": "https://cal.com/join/abc123",
    "name": "John Doe"
  }
}
```

**Frontend behavior:** Displays a confirmation card with booking details

---

### Message Type 4: Speaking Status

Indicate who is currently speaking:

```json
{
  "type": "agent_speaking",
  "is_speaking": true
}
```

```json
{
  "type": "user_speaking",
  "is_speaking": true
}
```

---

## Complete Example Flow

### User Journey:

1. User clicks "Book a demo" → Chooses "Talk to AI"
2. User says: "I want to schedule a demo"
3. Backend sends transcript message
4. LLM responds: "I'd be happy to help! What date works for you?"
5. Backend sends agent transcript + audio
6. User says: "How about next Tuesday?"
7. Backend:
   - Sends user transcript
   - LLM calls `check_availability` for next Tuesday
   - Sends `function_result` with available slots
   - LLM says: "I have 2:00 PM, 3:30 PM available. Which works?"
   - Sends agent transcript + audio
8. User says: "3:30 PM"
9. LLM asks: "Great! What's your email?"
10. User provides email
11. Backend:
    - LLM calls `book_appointment`
    - Sends `booking_confirmed` message
    - LLM says: "Perfect! I've booked your demo for Tuesday at 3:30 PM"

---

## Example Implementation (Python + OpenAI)

```python
from openai import AsyncOpenAI
import json

# Initialize OpenAI client
openai_client = AsyncOpenAI(api_key=OPENAI_API_KEY)

# Function definitions
FUNCTIONS = [
    {
        "name": "check_availability",
        "description": "Check available appointment slots",
        "parameters": {
            "type": "object",
            "properties": {
                "date": {"type": "string"},
                "duration": {"type": "integer", "default": 30}
            },
            "required": ["date"]
        }
    },
    {
        "name": "book_appointment",
        "description": "Book an appointment",
        "parameters": {
            "type": "object",
            "properties": {
                "date": {"type": "string"},
                "time": {"type": "string"},
                "email": {"type": "string"},
                "name": {"type": "string"},
                "duration": {"type": "integer", "default": 30}
            },
            "required": ["date", "time", "email"]
        }
    }
]

async def handle_voice_conversation(websocket, user_transcript):
    """
    Handle a single turn in the voice conversation

    Args:
        websocket: WebSocket connection to frontend
        user_transcript: What the user said
    """

    # Send user transcript to frontend
    await websocket.send(json.dumps({
        "type": "transcript",
        "role": "user",
        "text": user_transcript,
        "is_final": True,
        "timestamp": datetime.now().isoformat()
    }))

    # Add to conversation history
    conversation_history.append({
        "role": "user",
        "content": user_transcript
    })

    # Get LLM response with function calling
    response = await openai_client.chat.completions.create(
        model="gpt-4-turbo-preview",
        messages=conversation_history,
        tools=[{"type": "function", "function": f} for f in FUNCTIONS],
        tool_choice="auto"
    )

    message = response.choices[0].message

    # Check if LLM wants to call a function
    if message.tool_calls:
        for tool_call in message.tool_calls:
            function_name = tool_call.function.name
            function_args = json.loads(tool_call.function.arguments)

            # Execute the function
            if function_name == "check_availability":
                result = await check_availability(**function_args)

                # Send result to frontend
                await websocket.send(json.dumps({
                    "type": "function_result",
                    "function_name": "check_availability",
                    "status": "success",
                    "result": result
                }))

            elif function_name == "book_appointment":
                result = await book_appointment(**function_args)

                # Send booking confirmation to frontend
                await websocket.send(json.dumps({
                    "type": "booking_confirmed",
                    "booking": result
                }))

            # Add function result to conversation
            conversation_history.append({
                "role": "assistant",
                "content": None,
                "tool_calls": message.tool_calls
            })
            conversation_history.append({
                "role": "tool",
                "tool_call_id": tool_call.id,
                "content": json.dumps(result)
            })

        # Get LLM's final response after function execution
        response = await openai_client.chat.completions.create(
            model="gpt-4-turbo-preview",
            messages=conversation_history
        )

        message = response.choices[0].message

    # Send agent response to frontend
    agent_text = message.content

    await websocket.send(json.dumps({
        "type": "transcript",
        "role": "agent",
        "text": agent_text,
        "is_final": True,
        "timestamp": datetime.now().isoformat()
    }))

    # Convert to speech and send audio
    audio = await text_to_speech(agent_text)
    await websocket.send(json.dumps({
        "type": "audio",
        "data": base64.b64encode(audio).decode()
    }))

    # Add to conversation history
    conversation_history.append({
        "role": "assistant",
        "content": agent_text
    })
```

---

## Testing Checklist

- [ ] LLM can successfully call `check_availability`
- [ ] Frontend displays availability card with time slots
- [ ] LLM can successfully call `book_appointment`
- [ ] Frontend displays booking confirmation card
- [ ] Calendar invite is sent to user's email
- [ ] Booking appears in Cal.com dashboard
- [ ] Error handling works (invalid dates, no availability, etc.)
- [ ] Conversation flow feels natural
- [ ] Audio and transcription sync properly

---

## Environment Setup Summary

```env
# LLM (choose one)
OPENAI_API_KEY=sk-xxxxxxxxxxxxx
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx

# Cal.com
CAL_COM_API_KEY=cal_live_xxxxxxxxxxxxx
CAL_COM_EVENT_TYPE_ID=123456
CAL_COM_API_URL=https://api.cal.com/v1

# Backend
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
```

---

## Additional Resources

- **Cal.com API Docs**: https://cal.com/docs/api-reference
- **OpenAI Function Calling**: https://platform.openai.com/docs/guides/function-calling
- **Claude Tool Use**: https://docs.anthropic.com/en/docs/build-with-claude/tool-use

---

## Support

If you encounter issues:
1. Check the browser console for frontend errors
2. Check backend logs for function calling errors
3. Verify Cal.com API key and event type ID
4. Test Cal.com API endpoints directly using Postman/curl

---

**End of Guide**
