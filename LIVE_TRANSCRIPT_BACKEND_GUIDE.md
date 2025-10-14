# Live Transcript Backend Integration Guide

## Overview

The Voice Booking feature now relies **entirely on the backend WebSocket** to send transcript data for both user and agent conversations. This is more efficient and reliable than client-side speech recognition.

## What Changed

### ❌ Removed
- Client-side Web Speech API
- `useSpeechRecognition` hook
- All local speech-to-text processing

### ✅ Now Using
- Backend WebSocket transcript messages
- Server-side speech-to-text
- Unified transcript handling for both user and agent

## Backend WebSocket Message Format

### Transcript Messages (REQUIRED)

Your backend MUST send transcript messages in this format:

```json
{
  "type": "transcript",
  "role": "user" | "agent",
  "text": "The transcribed text content",
  "is_final": true | false,
  "timestamp": 1234567890.123
}
```

#### Field Descriptions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | string | ✅ Yes | Must be `"transcript"` |
| `role` | string | ✅ Yes | Either `"user"` or `"agent"` |
| `text` | string | ✅ Yes | The transcribed text content |
| `is_final` | boolean | ✅ Yes | `true` for final transcript, `false` for interim (typing indicator) |
| `timestamp` | number | ⚠️ Optional | Unix timestamp in seconds (with milliseconds) |
| `metadata` | object | ⚠️ Optional | Additional metadata to store with the message |

### Examples

#### User Speaking (Interim)
```json
{
  "type": "transcript",
  "role": "user",
  "text": "I want to book a demo for",
  "is_final": false,
  "timestamp": 1734567890.123
}
```

#### User Speaking (Final)
```json
{
  "type": "transcript",
  "role": "user",
  "text": "I want to book a demo for next Tuesday",
  "is_final": true,
  "timestamp": 1734567890.456
}
```

#### Agent Speaking (Interim)
```json
{
  "type": "transcript",
  "role": "agent",
  "text": "Great! Let me check available",
  "is_final": false,
  "timestamp": 1734567891.123
}
```

#### Agent Speaking (Final)
```json
{
  "type": "transcript",
  "role": "agent",
  "text": "Great! Let me check available slots for next Tuesday.",
  "is_final": true,
  "timestamp": 1734567891.789
}
```

## How the Frontend Handles Transcripts

### Interim Messages (is_final: false)
- Displayed with a "typing..." indicator
- Shows real-time progress of what's being said
- Automatically cleared when final message arrives

### Final Messages (is_final: true)
- Permanently added to the transcript
- Displayed with timestamp
- Clears the corresponding interim message

### Visual Display
- **User messages**: Blue gradient bubbles on the right
- **Agent messages**: Gray bubbles on the left
- **Labels**: "You" for user, "Agent" for agent
- **Timestamps**: Formatted as "h:mm a" (e.g., "2:30 PM")

## Frontend Code Location

All transcript handling is in:
- **VoiceBooking.tsx** (lines 201-243): WebSocket message handler
- **TranscriptPanel.tsx**: Visual display of transcripts
- **TranscriptMessage.tsx**: Individual message rendering

## Fallback Handlers

The frontend also includes fallback handlers for different message formats:

### Alternative Message Types
```json
// These are also supported if your backend uses different message types:
{"type": "response", "text": "..."}
{"type": "agent_response", "text": "..."}
{"type": "completion", "content": "..."}
```

### Catch-All Handler
The frontend will attempt to extract text from any message with common text fields:
- `text`
- `content`
- `message`
- `response`
- `output`
- `delta`
- `choices`

**However**, using the standard `transcript` message format is **strongly recommended**.

## Implementation Checklist

### Backend Requirements

- [ ] Send `transcript` messages for **user speech**
  - [ ] Include interim messages (is_final: false) for real-time feedback
  - [ ] Include final messages (is_final: true) for permanent transcript

- [ ] Send `transcript` messages for **agent speech**
  - [ ] Include interim messages (is_final: false) during AI generation
  - [ ] Include final messages (is_final: true) when complete

- [ ] Include timestamps (optional but recommended)

- [ ] Test with various speaking speeds and interruptions

### Frontend (Already Complete) ✅

- [x] WebSocket connection handling
- [x] Transcript message parsing
- [x] Interim/final message logic
- [x] User/agent role differentiation
- [x] Real-time display with scrolling
- [x] Typing indicators
- [x] Timestamps

## Testing

### Manual Testing Steps

1. Start the voice call
2. Speak as the user - verify user transcript appears
3. Wait for AI agent response - verify agent transcript appears
4. Check that interim messages show "typing..." indicator
5. Verify final messages persist in transcript
6. Test scrolling with many messages

### Expected Console Logs

When working correctly, you should see:
```
📥 RECEIVED WEBSOCKET MESSAGE
================================================================================
Message Type: transcript
Full Message: {
  "type": "transcript",
  "role": "user",
  "text": "I want to book a demo",
  "is_final": true,
  "timestamp": 1734567890.123
}
================================================================================

💬 BACKEND TRANSCRIPT [USER]: I want to book a demo
   📋 Full message: {...}
   - is_final: true
   - timestamp: 1734567890.123
   - role: user
   ✅ Adding final user message to transcript
   💾 New message added: {...}
```

## Troubleshooting

### No Transcripts Appearing

1. Check browser console for WebSocket messages
2. Verify backend is sending `transcript` type messages
3. Check that `role` field is either "user" or "agent"
4. Verify `is_final` field is a boolean

### Only User Transcripts, No Agent

- Backend is not sending transcript messages for agent responses
- Backend might only be sending audio without text
- Check backend configuration for transcript forwarding

### Duplicated Messages

- Backend sending multiple final messages with same content
- Check backend deduplication logic

### Interim Messages Not Clearing

- Backend not sending final message with is_final: true
- Check backend state management for interim vs final

## Support

If you need help with the backend integration:
1. Check the console logs for detailed WebSocket messages
2. Verify the message format matches the spec above
3. Test with the fallback handlers to see if your message format is supported

## Architecture

```
User speaks → Backend STT → WebSocket {type:"transcript", role:"user"} → Frontend displays

AI responds → Backend TTS → WebSocket {type:"transcript", role:"agent"} → Frontend displays
                          → WebSocket {type:"audio", data:"..."} → Frontend plays audio
```

Both text transcript and audio are sent separately, allowing for:
- Visual transcript display
- Audio playback
- Complete conversation history
