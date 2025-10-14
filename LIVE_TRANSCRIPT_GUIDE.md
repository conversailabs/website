# Live Transcript WebSocket Implementation Guide

This guide explains how to use the live transcript streaming feature to display real-time transcripts from voice calls on your frontend.

## Architecture Overview

The live transcript system consists of three main components:

1. **Backend WebSocket Server** (`transcript_manager.py` + `server.py`)
   - Manages WebSocket connections from frontend clients
   - Broadcasts transcript messages in real-time
   - Handles call status updates

2. **Bot Integration** (`bot.py`)
   - Captures transcript frames from Pipecat pipeline
   - Emits transcripts to the TranscriptManager
   - Distinguishes between user and assistant speech

3. **Frontend Components** (React/Next.js)
   - `useTranscript` hook: Manages WebSocket connection
   - `LiveTranscript` component: Displays transcripts in real-time

## Backend Setup

### Files Created

1. **`conversailabs_voice_ai_backend/transcript_manager.py`**
   - Manages WebSocket connections per call_id
   - Broadcasts transcript messages to connected clients
   - Handles connection lifecycle

2. **Modified: `conversailabs_voice_ai_backend/server.py`**
   - Added `/transcript/{call_id}` WebSocket endpoint
   - Imported `transcript_manager`
   - Updated API documentation

3. **Modified: `conversailabs_voice_ai_backend/bot.py`**
   - Modified `PipelineMonitor` class to accept `call_id`
   - Added transcript broadcasting for user speech (TranscriptionFrame)
   - Added transcript broadcasting for assistant responses (LLMFullResponseEndFrame)
   - Added call status notifications (started/ended)

### Backend API

#### WebSocket Endpoint

```
ws://your-backend-url:7860/transcript/{call_id}
```

Replace `{call_id}` with your actual call identifier (session_id, call_sid, etc.)

#### Message Types

The backend sends JSON messages with the following types:

**1. Connection Confirmation**
```json
{
  "type": "connected",
  "call_id": "call-123",
  "message": "Connected to live transcript stream"
}
```

**2. Transcript Message**
```json
{
  "type": "transcript",
  "call_id": "call-123",
  "speaker": "user",  // or "assistant"
  "text": "Hello, how can I help you?",
  "timestamp": 1678901234.567,
  "is_final": true
}
```

**3. Call Status**
```json
{
  "type": "call_status",
  "call_id": "call-123",
  "status": "started",  // or "ended", "error"
  "metadata": {}
}
```

## Frontend Setup

### Files Created

1. **`src/hooks/use-transcript.ts`**
   - Custom React hook for WebSocket management
   - Handles connection, reconnection, and message parsing
   - Provides transcript state and control functions

2. **`src/components/transcript/LiveTranscript.tsx`**
   - React component for displaying live transcripts
   - Auto-scrolling, timestamps, speaker identification
   - Status indicators and error handling

### Installation

No additional dependencies are required! The implementation uses native WebSocket API.

### Environment Variables

Add to your `.env.local` (optional):

```env
NEXT_PUBLIC_WS_URL=ws://localhost:7860
```

For production:
```env
NEXT_PUBLIC_WS_URL=wss://your-production-backend.com
```

## Usage Examples

### Basic Usage

```tsx
import { LiveTranscript } from '@/components/transcript/LiveTranscript';

function CallMonitorPage() {
  const callId = "call-123"; // Get from your call initiation

  return (
    <div className="container mx-auto p-4">
      <h1>Call Monitor</h1>
      <LiveTranscript
        callId={callId}
        wsUrl="ws://localhost:7860"
      />
    </div>
  );
}
```

### Advanced Usage with Custom Logic

```tsx
'use client';

import { useEffect } from 'react';
import { useTranscript } from '@/hooks/use-transcript';

function CustomTranscriptView() {
  const {
    transcripts,
    isConnected,
    isConnecting,
    callStatus,
    error,
    connect,
    disconnect,
    clearTranscripts
  } = useTranscript();

  useEffect(() => {
    // Connect to a specific call
    connect('call-123', 'ws://localhost:7860');

    // Cleanup on unmount
    return () => disconnect();
  }, []);

  useEffect(() => {
    if (callStatus === 'ended') {
      console.log('Call ended! Final transcript:', transcripts);
      // Save transcript to database, etc.
    }
  }, [callStatus, transcripts]);

  return (
    <div>
      <div>Status: {isConnected ? 'Connected' : 'Disconnected'}</div>
      <div>Call: {callStatus}</div>

      {error && <div className="error">{error}</div>}

      <div className="transcripts">
        {transcripts.map((entry) => (
          <div key={entry.id} className={entry.speaker === 'user' ? 'user' : 'assistant'}>
            <strong>{entry.speaker}:</strong> {entry.text}
            <small>{new Date(entry.timestamp).toLocaleTimeString()}</small>
          </div>
        ))}
      </div>

      <button onClick={clearTranscripts}>Clear</button>
    </div>
  );
}
```

### Integration with Existing Call Flow

```tsx
'use client';

import { useState } from 'react';
import { LiveTranscript } from '@/components/transcript/LiveTranscript';

function VoiceCallInterface() {
  const [callId, setCallId] = useState<string | null>(null);
  const [isCallActive, setIsCallActive] = useState(false);

  const startCall = async () => {
    // Initiate call via your backend API
    const response = await fetch('http://localhost:7860/exotel/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        security_key: 'your-security-key',
        phone_number: '+1234567890',
        agent_id: 'agent-123'
      })
    });

    const data = await response.json();
    setCallId(data.call_sid);
    setIsCallActive(true);
  };

  const handleCallEnd = () => {
    console.log('Call ended, transcript available');
    setIsCallActive(false);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h2>Call Control</h2>
        <button onClick={startCall} disabled={isCallActive}>
          Start Call
        </button>
      </div>

      <div>
        {callId && (
          <LiveTranscript
            callId={callId}
            onCallEnd={handleCallEnd}
            autoScroll={true}
            showTimestamps={true}
          />
        )}
      </div>
    </div>
  );
}
```

## Component Props

### LiveTranscript Component

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `callId` | string | Yes | - | Unique identifier for the call |
| `wsUrl` | string | No | `ws://localhost:7860` | WebSocket server URL |
| `autoScroll` | boolean | No | `true` | Auto-scroll to latest message |
| `showTimestamps` | boolean | No | `true` | Show timestamps for each message |
| `className` | string | No | `''` | Additional CSS classes |
| `onCallEnd` | function | No | - | Callback when call ends |

### useTranscript Hook

**Returns:**

```typescript
{
  transcripts: TranscriptEntry[];     // Array of transcript messages
  isConnected: boolean;                // WebSocket connection status
  isConnecting: boolean;               // Connection in progress
  callStatus: 'idle' | 'started' | 'ended' | 'error';  // Call status
  error: string | null;                // Error message if any
  connect: (callId: string, wsUrl?: string) => void;   // Connect function
  disconnect: () => void;              // Disconnect function
  clearTranscripts: () => void;        // Clear transcript history
}
```

## Testing

### 1. Start Backend Server

```bash
cd conversailabs_voice_ai_backend
python server.py
```

Server will start on `http://localhost:7860`

### 2. Test WebSocket Connection

You can test the WebSocket endpoint using a browser console or tool:

```javascript
const ws = new WebSocket('ws://localhost:7860/transcript/test-call-123');

ws.onopen = () => console.log('Connected!');
ws.onmessage = (event) => console.log('Message:', JSON.parse(event.data));
ws.onerror = (error) => console.error('Error:', error);
```

### 3. Initiate a Test Call

```bash
curl -X POST http://localhost:7860/exotel/start \
  -H "Content-Type: application/json" \
  -d '{
    "security_key": "a7f4d2e3-8b5c-4d9e-b3a1-6c9f8e7d5b4a",
    "phone_number": "+1234567890",
    "agent_id": "your-agent-id"
  }'
```

### 4. Start Frontend

```bash
npm run dev
```

Then navigate to your page with the LiveTranscript component.

## Troubleshooting

### Issue: WebSocket Connection Fails

**Solution:**
- Check if backend server is running on correct port
- Verify `NEXT_PUBLIC_WS_URL` environment variable
- Check browser console for CORS errors
- Ensure firewall allows WebSocket connections

### Issue: No Transcripts Appearing

**Solution:**
- Verify `call_id` matches between frontend and backend
- Check backend logs for transcript broadcasts
- Ensure call is actually active and generating speech
- Check if Deepgram STT is configured correctly

### Issue: Connection Keeps Disconnecting

**Solution:**
- Check network stability
- Verify WebSocket timeout settings
- Review backend logs for errors
- Ensure call hasn't ended (calls automatically close WebSocket)

### Issue: Transcripts Delayed

**Solution:**
- This is expected behavior (STT + LLM processing time)
- Check PipelineMonitor logs for latency metrics
- Consider upgrading Deepgram plan for faster STT
- Optimize LLM model settings (temperature, max_tokens)

## Production Considerations

### Security

1. **Authentication**: Add authentication to WebSocket endpoint
   ```python
   @app.websocket("/transcript/{call_id}")
   async def transcript_websocket(websocket: WebSocket, call_id: str, token: str = Query(...)):
       # Verify token before accepting connection
       if not verify_token(token):
           await websocket.close(code=1008, reason="Unauthorized")
           return
       # ... rest of the code
   ```

2. **Rate Limiting**: Implement rate limiting for WebSocket connections

3. **HTTPS/WSS**: Use secure WebSocket (WSS) in production
   ```env
   NEXT_PUBLIC_WS_URL=wss://your-production-backend.com
   ```

### Scalability

For high-traffic scenarios:

1. **Use Redis Pub/Sub** for multi-server transcript broadcasting
2. **Implement Connection Pooling** to limit concurrent WebSocket connections
3. **Add Load Balancing** with sticky sessions for WebSocket connections
4. **Monitor Memory Usage** - disconnect idle clients

### Monitoring

Add logging and metrics:

```python
import logging
from prometheus_client import Counter

ws_connections = Counter('ws_transcript_connections', 'Active WebSocket connections')
transcript_messages = Counter('transcript_messages_sent', 'Transcript messages sent')
```

## Additional Features

### Export Transcript

```typescript
function exportTranscript(transcripts: TranscriptEntry[]) {
  const text = transcripts
    .map(t => `[${new Date(t.timestamp).toISOString()}] ${t.speaker}: ${t.text}`)
    .join('\n');

  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `transcript-${Date.now()}.txt`;
  a.click();
}
```

### Search Transcript

```typescript
const searchTranscripts = (query: string, transcripts: TranscriptEntry[]) => {
  return transcripts.filter(t =>
    t.text.toLowerCase().includes(query.toLowerCase())
  );
};
```

### Real-time Analytics

```typescript
const analyzeTranscript = (transcripts: TranscriptEntry[]) => {
  const totalMessages = transcripts.length;
  const userMessages = transcripts.filter(t => t.speaker === 'user').length;
  const assistantMessages = transcripts.filter(t => t.speaker === 'assistant').length;
  const avgUserMessageLength = transcripts
    .filter(t => t.speaker === 'user')
    .reduce((acc, t) => acc + t.text.length, 0) / userMessages;

  return { totalMessages, userMessages, assistantMessages, avgUserMessageLength };
};
```

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review backend logs in `conversailabs_voice_ai_backend`
3. Check browser console for frontend errors
4. Verify all environment variables are set correctly

## License

This implementation is part of the ConverAI Labs Voice AI Backend project.
