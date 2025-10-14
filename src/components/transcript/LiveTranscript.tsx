'use client';

/**
 * LiveTranscript Component
 *
 * Real-time transcript display for voice calls.
 * Connects to the backend WebSocket and displays live transcriptions.
 *
 * @example
 * ```tsx
 * <LiveTranscript callId="call-123" wsUrl="ws://localhost:7860" />
 * ```
 */

import React, { useEffect, useRef } from 'react';
import { useTranscript, type TranscriptEntry } from '@/hooks/use-transcript';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertCircle, User, Bot, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

export interface LiveTranscriptProps {
  callId: string;
  wsUrl?: string;
  autoScroll?: boolean;
  showTimestamps?: boolean;
  className?: string;
  onCallEnd?: () => void;
}

export function LiveTranscript({
  callId,
  wsUrl,
  autoScroll = true,
  showTimestamps = true,
  className = '',
  onCallEnd,
}: LiveTranscriptProps) {
  const {
    transcripts,
    isConnected,
    isConnecting,
    callStatus,
    error,
    connect,
    disconnect,
    clearTranscripts,
  } = useTranscript();

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // Connect on mount
  useEffect(() => {
    if (callId) {
      connect(callId, wsUrl);
    }

    return () => {
      disconnect();
    };
  }, [callId, wsUrl]);

  // Auto-scroll to bottom when new transcripts arrive
  useEffect(() => {
    if (autoScroll && endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [transcripts, autoScroll]);

  // Trigger callback when call ends
  useEffect(() => {
    if (callStatus === 'ended' && onCallEnd) {
      onCallEnd();
    }
  }, [callStatus, onCallEnd]);

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const getStatusBadge = () => {
    if (isConnecting) {
      return (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
          <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
          <span className="text-xs font-medium text-white">Connecting...</span>
        </div>
      );
    }

    if (!isConnected) {
      return (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-red-500/20 backdrop-blur-sm rounded-full border border-red-500/30">
          <XCircle className="w-3.5 h-3.5 text-red-300" />
          <span className="text-xs font-medium text-red-200">Disconnected</span>
        </div>
      );
    }

    if (callStatus === 'started') {
      return (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 backdrop-blur-sm rounded-full border border-green-500/30">
          <div className="relative">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-75" />
          </div>
          <span className="text-xs font-medium text-green-200">Live</span>
        </div>
      );
    }

    if (callStatus === 'ended') {
      return (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
          <CheckCircle className="w-3.5 h-3.5 text-gray-300" />
          <span className="text-xs font-medium text-gray-300">Call Ended</span>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
        <CheckCircle className="w-3.5 h-3.5 text-white" />
        <span className="text-xs font-medium text-white">Connected</span>
      </div>
    );
  };

  const renderTranscriptEntry = (entry: TranscriptEntry) => {
    const isUser = entry.speaker === 'user';

    return (
      <div
        key={entry.id}
        className={`flex gap-4 p-4 rounded-xl transition-all duration-200 ${
          isUser
            ? 'bg-gradient-to-br from-blue-50 to-blue-100/50 ml-8'
            : 'bg-gradient-to-br from-gray-50 to-gray-100/50 mr-8'
        } ${!entry.is_final ? 'opacity-70' : ''}`}
      >
        <div className="flex-shrink-0">
          {isUser ? (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-md ring-2 ring-blue-200">
              <User className="w-5 h-5 text-white" />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center shadow-md ring-2 ring-gray-300">
              <Bot className="w-5 h-5 text-white" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-sm text-gray-900">
              {isUser ? 'You' : 'AI Assistant'}
            </span>
            {showTimestamps && (
              <span className="text-xs text-gray-500 font-medium">
                {formatTimestamp(entry.timestamp)}
              </span>
            )}
            {!entry.is_final && (
              <Badge variant="outline" className="text-xs bg-white/50 border-gray-300">
                Typing...
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
            {entry.text}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Modern Header with gradient */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-t-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">Live Transcript</h3>
            {callId && (
              <p className="text-xs text-gray-400 mt-1">Session: {callId}</p>
            )}
          </div>
          {getStatusBadge()}
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-b-2xl shadow-xl border border-gray-100">
        {error && (
          <div className="p-4">
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        )}

        <ScrollArea className="h-[600px] w-full p-6" ref={scrollAreaRef}>
          {transcripts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              {/* Animated waiting state inspired by Docket */}
              <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full animate-pulse" />
                <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                  <Bot className="w-10 h-10 text-gray-700" />
                </div>
              </div>
              <p className="text-lg font-medium text-gray-900 mb-2">
                {isConnected ? "Ready to transcribe" : "Connecting..."}
              </p>
              <p className="text-sm text-gray-500 max-w-xs">
                {isConnected
                  ? "Start speaking and your conversation will appear here in real-time"
                  : "Establishing connection to transcription service..."
                }
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {transcripts.map(renderTranscriptEntry)}
              <div ref={endOfMessagesRef} />
            </div>
          )}
        </ScrollArea>

        {transcripts.length > 0 && (
          <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-100">
            <p className="text-xs text-gray-600 font-medium">
              {transcripts.length} message{transcripts.length !== 1 ? 's' : ''}
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearTranscripts}
              disabled={transcripts.length === 0}
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-200"
            >
              Clear Transcript
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LiveTranscript;
