'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { TranscriptPanel } from './TranscriptPanel';
import { ArrowLeft, Phone, PhoneOff } from 'lucide-react';
import type { Message } from './TranscriptMessage';
import type { AvailabilityData } from './BookingAvailabilityCard';
import type { Booking } from './BookingConfirmationCard';
import { useTranscript } from '@/hooks/use-transcript';

interface VoiceBookingProps {
  onBack: () => void;
  onClose: () => void;
}

// Get backend API URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';
const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:7860';

export function VoiceBooking({ onBack, onClose }: VoiceBookingProps) {
  // Call state
  const [isCallActive, setIsCallActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  // Transcript state
  const [transcriptMessages, setTranscriptMessages] = useState<Message[]>([]);
  const [userInterimMessage, setUserInterimMessage] = useState<string | null>(null);
  const [agentInterimMessage, setAgentInterimMessage] = useState<string | null>(null);
  const [availabilityData, setAvailabilityData] = useState<AvailabilityData | null>(null);
  const [bookingConfirmation, setBookingConfirmation] = useState<Booking | null>(null);
  const [agentSpeaking, setAgentSpeaking] = useState(false);
  const [userSpeaking, setUserSpeaking] = useState(false);

  // Use transcript hook for live transcript WebSocket
  const {
    transcripts: liveTranscripts,
    isConnected: isTranscriptConnected,
    connect: connectTranscript,
    disconnect: disconnectTranscript,
  } = useTranscript();

  // WebSocket and audio processing refs
  const wsRef = useRef<WebSocket | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const audioQueueRef = useRef<Int16Array[]>([]);
  const isPlayingRef = useRef(false);
  const isCallActiveRef = useRef(false);
  const isInteractingRef = useRef(false);

  // Add live transcripts to transcript messages
  useEffect(() => {
    if (liveTranscripts.length > 0) {
      console.log('[VoiceBooking] Received live transcripts:', liveTranscripts);
      // Add new transcripts to the messages
      const newMessages: Message[] = liveTranscripts.map(t => ({
        id: t.id,
        role: t.speaker === 'user' ? 'user' : 'agent',
        text: t.text,
        timestamp: new Date(t.timestamp),
        isFinal: t.is_final,
        metadata: {
          source: 'live-transcript-ws'
        }
      }));
      setTranscriptMessages(prev => {
        // Avoid duplicates by checking IDs
        const existingIds = new Set(prev.map(m => m.id));
        const uniqueNew = newMessages.filter(m => !existingIds.has(m.id));
        return [...prev, ...uniqueNew];
      });
    }
  }, [liveTranscripts]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isCallActive) {
        console.log('Component unmounted - ending call');
        stopWebSocketCall();
      }
    };
  }, [isCallActive]);

  // Initialize microphone and audio processing
  const initializeMicrophone = async () => {
    try {
      console.log('Requesting microphone access...');

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 16000,
        }
      });

      mediaStreamRef.current = stream;

      const audioContext = new AudioContext({ sampleRate: 16000 });
      audioContextRef.current = audioContext;

      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(1024, 1, 1);
      processorRef.current = processor;

      let audioChunkCount = 0;
      processor.onaudioprocess = (e) => {
        if (!isInteractingRef.current || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
          return;
        }

        const inputData = e.inputBuffer.getChannelData(0);
        const pcm16 = new Int16Array(inputData.length);

        for (let i = 0; i < inputData.length; i++) {
          pcm16[i] = Math.max(-32768, Math.min(32767, inputData[i] * 32768));
        }

        const audioData = btoa(String.fromCharCode(...new Uint8Array(pcm16.buffer)));

        // Send audio chunk
        wsRef.current.send(JSON.stringify({
          type: 'audio',
          data: audioData
        }));

        // Log every 50th chunk to avoid console spam
        audioChunkCount++;
        if (audioChunkCount % 50 === 0) {
          console.log(`📤 Sent audio chunk #${audioChunkCount} (${pcm16.length} samples)`);
        }
      };

      source.connect(processor);
      processor.connect(audioContext.destination);

      console.log('Microphone initialized successfully');
      return true;
    } catch (error) {
      console.error('Microphone error:', error);
      alert('Unable to access microphone. Please grant permission and try again.');
      return false;
    }
  };

  // Play audio received from WebSocket
  const playNextAudioChunk = () => {
    if (audioQueueRef.current.length === 0) {
      isPlayingRef.current = false;
      return;
    }

    if (!audioContextRef.current) return;

    isPlayingRef.current = true;
    const pcm16 = audioQueueRef.current.shift()!;

    const float32 = new Float32Array(pcm16.length);
    for (let i = 0; i < pcm16.length; i++) {
      float32[i] = pcm16[i] / 32768;
    }

    const buffer = audioContextRef.current.createBuffer(1, float32.length, 16000);
    buffer.copyToChannel(float32, 0);

    const source = audioContextRef.current.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContextRef.current.destination);

    source.onended = () => {
      playNextAudioChunk();
    };

    source.start();
  };

  // Connect to WebSocket server
  const connectWebSocket = (websocketUrl: string) => {
    return new Promise<boolean>((resolve) => {
      console.log('Connecting to WebSocket:', websocketUrl);

      const ws = new WebSocket(websocketUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('WebSocket connected');

        const handshake = {
          type: 'browser_audio',
          action: 'start',
          sampleRate: 16000,
          format: 'pcm16',
          tts_provider: 'elevenlabs'
        };
        ws.send(JSON.stringify(handshake));
        console.log('Sent handshake:', handshake);

        resolve(true);
      };

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          console.log('\n' + '='.repeat(80));
          console.log('📥 RECEIVED WEBSOCKET MESSAGE');
          console.log('='.repeat(80));
          console.log('Message Type:', message.type);
          console.log('Full Message:', JSON.stringify(message, null, 2));
          console.log('='.repeat(80) + '\n');

          // Handle session_id and connect to transcript WebSocket
          if (message.type === 'session_id' && message.session_id) {
            console.log('[VoiceBooking] Received session_id:', message.session_id);
            setSessionId(message.session_id);
            // Connect to transcript WebSocket
            console.log('[VoiceBooking] Connecting to transcript WebSocket...');
            connectTranscript(message.session_id, WS_URL);
          }

          // Audio playback
          if (message.type === 'audio' && message.data) {
            console.log('🔊 Received audio chunk, length:', message.data.length);
            const audioData = atob(message.data);
            const pcm16 = new Int16Array(audioData.length / 2);

            for (let i = 0; i < pcm16.length; i++) {
              const byte1 = audioData.charCodeAt(i * 2);
              const byte2 = audioData.charCodeAt(i * 2 + 1);
              pcm16[i] = (byte2 << 8) | byte1;
            }

            audioQueueRef.current.push(pcm16);
            if (!isPlayingRef.current) {
              playNextAudioChunk();
            }
          }

          // Transcript messages from backend (both user and agent)
          if (message.type === 'transcript') {
            const role = message.role || 'agent'; // Default to agent if role not specified
            console.log(`\n💬 BACKEND TRANSCRIPT [${role.toUpperCase()}]:`, message.text);
            console.log(`   📋 Full message:`, JSON.stringify(message, null, 2));
            console.log(`   - is_final: ${message.is_final}`);
            console.log(`   - timestamp: ${message.timestamp}`);
            console.log(`   - role: ${message.role}`);

            if (message.is_final) {
              console.log(`   ✅ Adding final ${role} message to transcript`);
              setTranscriptMessages(prev => {
                const newMessage = {
                  id: `${role}-backend-${Date.now()}-${Math.random()}`,
                  role: role,
                  text: message.text,
                  timestamp: new Date(message.timestamp || Date.now()),
                  isFinal: true,
                  metadata: {
                    ...message.metadata,
                    source: 'backend-websocket'
                  }
                };
                console.log(`   💾 New message added:`, newMessage);
                return [...prev, newMessage];
              });

              // Clear the appropriate interim message
              if (role === 'agent') {
                setAgentInterimMessage(null);
              } else {
                setUserInterimMessage(null);
              }
            } else {
              console.log(`   ⏳ Setting interim ${role} message`);
              // Set interim message based on role
              if (role === 'agent') {
                setAgentInterimMessage(message.text);
              } else {
                setUserInterimMessage(message.text);
              }
            }
          }

          // FALLBACK: Check for response/completion messages that might contain agent text
          if (message.type === 'response' || message.type === 'agent_response' || message.type === 'completion') {
            console.log(`\n🤖 AGENT RESPONSE MESSAGE:`, message);
            if (message.text || message.content) {
              const agentText = message.text || message.content;
              console.log(`   ✅ Adding agent response to transcript: ${agentText}`);
              setTranscriptMessages(prev => [...prev, {
                id: `agent-response-${Date.now()}-${Math.random()}`,
                role: 'agent',
                text: agentText,
                timestamp: new Date(message.timestamp || Date.now()),
                isFinal: true,
                metadata: {
                  source: 'backend-response',
                  type: message.type
                }
              }]);
            }
          }

          // CATCH-ALL: Look for any message with text-like content that's not audio or control
          if (message.type !== 'audio' &&
              message.type !== 'control' &&
              message.type !== 'transcript' &&
              message.type !== 'response' &&
              message.type !== 'agent_response' &&
              message.type !== 'completion' &&
              message.type !== 'function_result' &&
              message.type !== 'booking_confirmed' &&
              message.type !== 'agent_speaking' &&
              message.type !== 'user_speaking') {

            // Check if this message has any text fields
            const possibleTextFields = ['text', 'content', 'message', 'response', 'output', 'delta', 'choices'];
            let foundText: string | null = null;

            for (const field of possibleTextFields) {
              if (message[field]) {
                if (typeof message[field] === 'string') {
                  foundText = message[field];
                } else if (message[field]?.text) {
                  foundText = message[field].text;
                } else if (message[field]?.content) {
                  foundText = message[field].content;
                } else if (Array.isArray(message[field]) && message[field][0]?.text) {
                  foundText = message[field][0].text;
                }

                if (foundText && typeof foundText === 'string') {
                  console.log(`\n⚡ CATCH-ALL: Found text in field "${field}":`, foundText);
                  console.log(`   Message type: ${message.type}`);
                  console.log(`   Adding to transcript as AGENT message`);

                  const textValue: string = foundText; // Explicitly type as string
                  setTranscriptMessages(prev => [...prev, {
                    id: `agent-catchall-${Date.now()}-${Math.random()}`,
                    role: 'agent',
                    text: textValue,
                    timestamp: new Date(message.timestamp || Date.now()),
                    isFinal: true,
                    metadata: {
                      source: 'catch-all',
                      originalType: message.type,
                      field: field
                    }
                  }]);
                  break;
                }
              }
            }
          }

          // Function call result - availability
          if (message.type === 'function_result' && message.function_name === 'check_availability') {
            console.log('📅 Availability result:', message.result);
            setAvailabilityData(message.result);
          }

          // Booking confirmation
          if (message.type === 'booking_confirmed') {
            console.log('✅ Booking confirmed:', message.booking);
            setBookingConfirmation(message.booking);
            setAvailabilityData(null);
          }

          // Speaking status
          if (message.type === 'agent_speaking') {
            setAgentSpeaking(message.is_speaking);
          }

          if (message.type === 'user_speaking') {
            setUserSpeaking(message.is_speaking);
          }

          // Handle control messages (prevent auto-disconnect)
          if (message.type === 'control') {
            console.log('🎛️ Control message received:', message.action);

            // Ignore cancel, end, and interruption actions - keep call active
            // Only the user should be able to end the call by clicking the button
            if (message.action === 'cancel' || message.action === 'end' || message.action === 'interruption') {
              console.log(`⚠️ Control action "${message.action}" received from backend - IGNORING to keep call active`);
              console.log('💡 Only user can end the call by clicking the End Call button');
              // Don't do anything - let the user manually end the call
              return;
            }

            // Handle terminate action (force disconnect)
            if (message.action === 'terminate' || message.action === 'force_disconnect') {
              console.log('🔴 Terminate action received - ending call');
              stopWebSocketCall();
            }
          }

        } catch (error) {
          console.error('❌ Message processing error:', error);
          console.error('Raw event data:', event.data);
        }
      };

      ws.onerror = (error) => {
        console.error('❌ WebSocket error:', error);
        alert('Failed to connect to voice server. Please try again.');
        resolve(false);
      };

      ws.onclose = (event) => {
        console.log('🔴 WebSocket closed');
        console.log('Close code:', event.code);
        console.log('Close reason:', event.reason);
        console.log('Was clean close:', event.wasClean);

        // Only clean up if the call is still supposed to be active
        // Code 1000 is normal closure, but we'll check if it was intentional
        if (isCallActiveRef.current) {
          // For ANY closure when call is active, we want to keep the call going
          // This prevents automatic disconnection from backend control messages
          console.log('⚠️ WebSocket closed but call is still active - PREVENTING auto-cleanup');
          console.log('💡 User must manually end call using End Call button');
          console.log('📡 Note: New messages will not be received until backend reconnects');

          // Don't clean up - keep UI active
          // The user will see the call is still "active" even though WS is closed
          // This is intentional to prevent auto-disconnect
          return;
        }
      };
    });
  };

  // Start WebSocket voice call
  const startWebSocketCall = async () => {
    try {
      setIsConnecting(true);
      console.log('Starting WebSocket voice call for booking...');

      const response = await fetch(`${API_BASE_URL}/browser/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          security_key: "a7f4d2e3-8b5c-4d9e-b3a1-6c9f8e7d5b4a",
          tts_provider: "elevenlabs",
//           custom_prompt: `You are a helpful AI assistant for booking demo appointments.
// You can help users schedule appointments by:
// 1. Checking available time slots
// 2. Booking appointments when they choose a time
// 3. Collecting their email for confirmation

// When a user wants to book:
// - Ask for their preferred date
// - Use the check_availability function to get available slots
// - Present the options clearly
// - Once they choose, get their email
// - Use the book_appointment function to confirm

// Always be friendly and conversational. After booking, congratulate them and provide all details.`
        }),
      });

      if (!response.ok) {
        let errorMessage = 'Failed to get session URL from server';
        try {
          const errorData = await response.json();
          errorMessage = errorData.detail || errorData.message || errorMessage;
        } catch {
          const errorText = await response.text();
          errorMessage = errorText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      const websocketUrl = data.websocket_url || data.url || data.ws_url;

      if (!websocketUrl) {
        throw new Error('No WebSocket URL returned from server');
      }

      const micInitialized = await initializeMicrophone();
      if (!micInitialized) {
        setIsConnecting(false);
        return;
      }

      // CRITICAL: Set interacting flags BEFORE connecting WebSocket
      // This ensures audio chunks start flowing immediately when WS connects
      console.log('🎙️ Setting interacting flags to enable audio streaming...');
      isInteractingRef.current = true;
      isCallActiveRef.current = true;
      setIsInteracting(true);
      setIsCallActive(true);

      const wsConnected = await connectWebSocket(websocketUrl);
      if (!wsConnected) {
        setIsConnecting(false);
        setIsInteracting(false);
        setIsCallActive(false);
        isInteractingRef.current = false;
        isCallActiveRef.current = false;
        return;
      }

      setIsConnecting(false);

      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        console.log('📞 Sending start_conversation signal...');
        wsRef.current.send(JSON.stringify({ type: 'start_conversation' }));
      }

      console.log('✅ WebSocket call started successfully - audio should be streaming now');
    } catch (error) {
      console.error('Error starting WebSocket call:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to start call';
      alert(`Unable to start call: ${errorMessage}\n\nPlease try again or contact support.`);
      setIsConnecting(false);
      setIsInteracting(false);
      stopWebSocketCall();
    }
  };

  // Stop WebSocket voice call
  const stopWebSocketCall = () => {
    console.log('Stopping WebSocket call');

    setIsInteracting(false);
    setIsCallActive(false);
    setIsConnecting(false);
    isCallActiveRef.current = false;
    isInteractingRef.current = false;

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'end_conversation' }));
      wsRef.current.close();
    }
    wsRef.current = null;

    // Disconnect from transcript WebSocket
    console.log('[VoiceBooking] Disconnecting from transcript WebSocket...');
    disconnectTranscript();
    setSessionId(null);

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }

    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    audioQueueRef.current = [];
    isPlayingRef.current = false;

    // Clear transcript
    setTranscriptMessages([]);
    setUserInterimMessage(null);
    setAgentInterimMessage(null);
    setAvailabilityData(null);
    setBookingConfirmation(null);
    setAgentSpeaking(false);
    setUserSpeaking(false);
  };

  const handleCallToggle = () => {
    if (isCallActive) {
      stopWebSocketCall();
    } else {
      startWebSocketCall();
    }
  };

  // Handle sending text messages
  const handleSendTextMessage = (message: string) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.error('[VoiceBooking] Cannot send text: WebSocket not connected');
      return;
    }

    console.log('[VoiceBooking] Sending text message:', message);

    // Send text message to backend via WebSocket
    // The message will come back through the transcript WebSocket
    wsRef.current.send(JSON.stringify({
      type: 'user_text',
      text: message
    }));
  };

  return (
    <div className="h-screen max-h-screen overflow-hidden flex flex-col p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <Button
          variant="ghost"
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <h2 className="text-2xl font-bold text-gray-900">Voice Booking</h2>

        <Button
          variant="ghost"
          onClick={onClose}
          className="text-gray-600 hover:text-gray-900"
        >
          Close
        </Button>
      </div>

      {/* Call Interface */}
      <div className="flex flex-col items-center mb-4 flex-shrink-0">
        <motion.div
          className="relative w-32 h-32 cursor-pointer mb-3"
          onClick={handleCallToggle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <div
            className={`
              w-full h-full rounded-full flex items-center justify-center
              ${isCallActive
                ? 'bg-gradient-to-br from-red-500 to-red-600'
                : 'bg-gradient-to-br from-blue-600 to-cyan-500'
              }
              shadow-2xl
            `}
          >
            {isCallActive ? (
              <PhoneOff className="w-12 h-12 text-white" />
            ) : (
              <Phone className="w-12 h-12 text-white" />
            )}
          </div>

          {(isInteracting || isCallActive) && (
            <>
              <div className="absolute inset-0 rounded-full border-4 border-cyan-300/70 animate-ping" />
              <div
                className="absolute -inset-4 rounded-full border-2 border-cyan-300/50 animate-ping"
                style={{ animationDelay: '300ms' }}
              />
            </>
          )}
        </motion.div>

        <div className="text-center">
          <p className="text-lg font-semibold text-gray-900 mb-1">
            {isConnecting ? 'Connecting...' : isCallActive ? 'End Call' : 'Start Voice Call'}
          </p>
          <p className="text-xs text-gray-600">
            {isCallActive
              ? 'Click to end the call'
              : 'Click to start talking with our AI assistant'}
          </p>
        </div>
      </div>

      {/* Transcript Panel - Takes remaining space */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <TranscriptPanel
          messages={transcriptMessages}
          availabilityData={availabilityData}
          bookingConfirmation={bookingConfirmation}
          isVisible={isCallActive}
          agentSpeaking={agentSpeaking}
          userSpeaking={userSpeaking}
          userInterimMessage={userInterimMessage}
          agentInterimMessage={agentInterimMessage}
          onSendMessage={handleSendTextMessage}
        />
      </div>

      {!isCallActive && (
        <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
          <h3 className="font-semibold text-gray-900 mb-3">How it works:</h3>
          <ol className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue-600">1.</span>
              <span>Click the button above to start the voice call</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue-600">2.</span>
              <span>Tell our AI when you&apos;d like to schedule your demo</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue-600">3.</span>
              <span>Choose from available time slots</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue-600">4.</span>
              <span>Provide your email to receive confirmation</span>
            </li>
          </ol>
        </div>
      )}
    </div>
  );
}
