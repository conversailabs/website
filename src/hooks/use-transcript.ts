/**
 * useTranscript Hook
 *
 * Custom React hook to connect to the backend WebSocket endpoint
 * and receive live transcripts from voice calls.
 *
 * @example
 * ```tsx
 * const { transcripts, isConnected, error, connect, disconnect } = useTranscript();
 *
 * // Connect to a call
 * useEffect(() => {
 *   connect('call-id-123');
 *   return () => disconnect();
 * }, []);
 * ```
 */

import { useState, useEffect, useRef, useCallback } from 'react';

export interface TranscriptMessage {
  type: 'transcript' | 'call_status' | 'connected';
  call_id?: string;
  speaker?: 'user' | 'assistant';
  text?: string;
  timestamp?: number;
  is_final?: boolean;
  status?: 'started' | 'ended' | 'error';
  metadata?: Record<string, any>;
  message?: string;
}

export interface TranscriptEntry {
  id: string;
  speaker: 'user' | 'assistant';
  text: string;
  timestamp: number;
  is_final: boolean;
}

export interface UseTranscriptReturn {
  transcripts: TranscriptEntry[];
  isConnected: boolean;
  isConnecting: boolean;
  callStatus: 'idle' | 'started' | 'ended' | 'error';
  error: string | null;
  connect: (callId: string, wsUrl?: string) => void;
  disconnect: () => void;
  clearTranscripts: () => void;
}

const DEFAULT_WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:7860';

export function useTranscript(): UseTranscriptReturn {
  const [transcripts, setTranscripts] = useState<TranscriptEntry[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [callStatus, setCallStatus] = useState<'idle' | 'started' | 'ended' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 5;
  const messageCounterRef = useRef(0); // Counter for unique IDs

  const clearTranscripts = useCallback(() => {
    setTranscripts([]);
    messageCounterRef.current = 0; // Reset counter when clearing
  }, []);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    setIsConnected(false);
    setIsConnecting(false);
    reconnectAttemptsRef.current = 0;
  }, []);

  const connect = useCallback((callId: string, wsUrl: string = DEFAULT_WS_URL) => {
    // Clean up existing connection
    disconnect();

    if (!callId) {
      setError('Call ID is required');
      return;
    }

    setIsConnecting(true);
    setError(null);
    messageCounterRef.current = 0; // Reset counter for new connection

    try {
      // Construct WebSocket URL
      const url = `${wsUrl}/transcript/${callId}`;
      console.log('[useTranscript] Connecting to:', url);

      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('[useTranscript] Connected to transcript stream');
        setIsConnected(true);
        setIsConnecting(false);
        setError(null);
        reconnectAttemptsRef.current = 0;
      };

      ws.onmessage = (event) => {
        try {
          const message: TranscriptMessage = JSON.parse(event.data);
          console.log('[useTranscript] Received message:', message);

          switch (message.type) {
            case 'connected':
              console.log('[useTranscript] Connection confirmed:', message.message);
              break;

            case 'transcript':
              if (message.text && message.speaker) {
                // All messages are now complete and final
                messageCounterRef.current += 1;

                const entry: TranscriptEntry = {
                  id: `${message.timestamp || Date.now()}-${message.speaker}-${messageCounterRef.current}`,
                  speaker: message.speaker,
                  text: message.text,
                  timestamp: message.timestamp || Date.now(),
                  is_final: message.is_final ?? true,
                };

                setTranscripts((prev) => [...prev, entry]);
              }
              break;

            case 'call_status':
              if (message.status) {
                setCallStatus(message.status as any);
                console.log('[useTranscript] Call status:', message.status);
              }
              break;

            default:
              console.warn('[useTranscript] Unknown message type:', message.type);
          }
        } catch (err) {
          console.error('[useTranscript] Error parsing message:', err);
        }
      };

      ws.onerror = (event) => {
        console.error('[useTranscript] WebSocket error:', event);
        setError('WebSocket connection error');
        setIsConnected(false);
      };

      ws.onclose = (event) => {
        console.log('[useTranscript] WebSocket closed:', event.code, event.reason);
        setIsConnected(false);
        setIsConnecting(false);

        // Attempt to reconnect if not a normal closure
        if (event.code !== 1000 && reconnectAttemptsRef.current < maxReconnectAttempts) {
          const delay = Math.min(1000 * Math.pow(2, reconnectAttemptsRef.current), 30000);
          console.log(`[useTranscript] Reconnecting in ${delay}ms (attempt ${reconnectAttemptsRef.current + 1}/${maxReconnectAttempts})`);

          reconnectTimeoutRef.current = setTimeout(() => {
            reconnectAttemptsRef.current += 1;
            connect(callId, wsUrl);
          }, delay);
        } else if (reconnectAttemptsRef.current >= maxReconnectAttempts) {
          setError('Max reconnection attempts reached');
          setCallStatus('error');
        }
      };
    } catch (err) {
      console.error('[useTranscript] Error creating WebSocket:', err);
      setError(err instanceof Error ? err.message : 'Failed to connect');
      setIsConnecting(false);
    }
  }, [disconnect]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    transcripts,
    isConnected,
    isConnecting,
    callStatus,
    error,
    connect,
    disconnect,
    clearTranscripts,
  };
}
