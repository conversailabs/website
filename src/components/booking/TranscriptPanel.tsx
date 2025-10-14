'use client';

import { useEffect, useRef, useState } from 'react';
import { TranscriptMessage, type Message } from './TranscriptMessage';
import { BookingAvailabilityCard, type AvailabilityData } from './BookingAvailabilityCard';
import { BookingConfirmationCard, type Booking } from './BookingConfirmationCard';
import { Mic, Volume2, ArrowDown, Send } from 'lucide-react';

interface TranscriptPanelProps {
  messages: Message[];
  availabilityData: AvailabilityData | null;
  bookingConfirmation: Booking | null;
  isVisible: boolean;
  agentSpeaking: boolean;
  userSpeaking: boolean;
  userInterimMessage?: string | null;
  agentInterimMessage?: string | null;
  onSendMessage?: (message: string) => void;
}

export function TranscriptPanel({
  messages,
  availabilityData,
  bookingConfirmation,
  isVisible,
  agentSpeaking,
  userSpeaking,
  userInterimMessage,
  agentInterimMessage,
  onSendMessage
}: TranscriptPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [textInput, setTextInput] = useState('');

  // Check if user is at bottom of scroll
  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const atBottom = scrollHeight - scrollTop - clientHeight < 50; // 50px threshold
      setIsAtBottom(atBottom);
      setShowScrollButton(!atBottom && messages.length > 0);
    }
  };

  // Scroll to bottom function
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      // Always scroll to bottom for new messages (use setTimeout to ensure DOM is updated)
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, 0);
    }
  }, [messages, availabilityData, bookingConfirmation, userInterimMessage, agentInterimMessage]);

  // Handle sending text message
  const handleSendMessage = () => {
    if (textInput.trim() && onSendMessage) {
      onSendMessage(textInput.trim());
      setTextInput('');
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="w-full h-full max-w-4xl mx-auto flex flex-col pb-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col h-full max-h-full">
        {/* Modern Header with dark gradient inspired by Docket */}
        <div className="px-6 py-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg tracking-tight">Live Conversation</h3>
              <p className="text-xs text-gray-400 mt-1">
                Real-time transcription powered by AI
              </p>
            </div>

            <div className="flex items-center gap-2">
              {userSpeaking && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium border border-white/20">
                  <div className="relative">
                    <Mic className="w-3.5 h-3.5" />
                    <div className="absolute inset-0 w-3.5 h-3.5">
                      <div className="w-full h-full bg-white rounded-full animate-ping opacity-75"></div>
                    </div>
                  </div>
                  <span>Speaking</span>
                </div>
              )}

              {agentSpeaking && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium border border-white/20">
                  <div className="relative">
                    <Volume2 className="w-3.5 h-3.5" />
                    <div className="absolute inset-0 w-3.5 h-3.5">
                      <div className="w-full h-full bg-white rounded-full animate-ping opacity-75"></div>
                    </div>
                  </div>
                  <span>AI Responding</span>
                </div>
              )}

              {!userSpeaking && !agentSpeaking && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 backdrop-blur-sm rounded-full text-xs font-medium border border-green-500/30">
                  <div className="relative">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-75"></div>
                  </div>
                  <span className="text-green-200">Live</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Transcript Content - Takes remaining space */}
        <div className="relative flex-1 min-h-0">
          <div
            ref={scrollRef}
            onScroll={checkScrollPosition}
            className="h-full overflow-y-auto bg-gradient-to-b from-gray-50/50 via-white to-gray-50/30 scroll-smooth"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#9ca3af #f3f4f6'
            }}
          >
            <div className="px-6 py-6 pb-4 min-h-full flex flex-col">
              {messages.length === 0 && !userInterimMessage && !agentInterimMessage ? (
                <div className="text-center py-20 flex-1 flex flex-col items-center justify-center">
                  {/* Animated empty state inspired by Docket */}
                  <div className="relative w-20 h-20 mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full animate-pulse" />
                    <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center shadow-inner">
                      <Mic className="w-8 h-8 text-gray-700" />
                    </div>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 mb-2">Ready to start</p>
                  <p className="text-sm text-gray-500 max-w-xs">
                    Begin speaking and your conversation will appear here in real-time
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3 pb-8">
                  {messages.map((message) => (
                    <TranscriptMessage key={message.id} message={message} />
                  ))}

                  {/* User interim message (typing) */}
                  {userInterimMessage && (
                    <TranscriptMessage
                      message={{
                        id: 'user-interim',
                        role: 'user',
                        text: userInterimMessage,
                        timestamp: new Date(),
                        isFinal: false
                      }}
                    />
                  )}

                  {/* Agent interim message (typing) */}
                  {agentInterimMessage && (
                    <TranscriptMessage
                      message={{
                        id: 'agent-interim',
                        role: 'agent',
                        text: agentInterimMessage,
                        timestamp: new Date(),
                        isFinal: false
                      }}
                    />
                  )}

                  {/* Show availability card when function returns data */}
                  {availabilityData && (
                    <BookingAvailabilityCard data={availabilityData} />
                  )}

                  {/* Show confirmation when booking is complete */}
                  {bookingConfirmation && (
                    <BookingConfirmationCard booking={bookingConfirmation} />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Scroll to Bottom Button - Modern styling */}
          {showScrollButton && (
            <button
              onClick={scrollToBottom}
              className="absolute bottom-6 right-6 bg-gray-900 hover:bg-gray-800 text-white rounded-full p-3 shadow-xl transition-all duration-200 hover:scale-110 z-10 animate-fade-in border border-gray-700"
              aria-label="Scroll to bottom"
            >
              <ArrowDown className="w-5 h-5" />
            </button>
          )}

          {/* Scroll Fade Indicator (shows when not at bottom) */}
          {showScrollButton && (
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          )}
        </div>

        {/* Text Input - Modern styling */}
        <div className="px-6 py-4 bg-white border-t border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent focus:bg-white transition-all"
            />
            <button
              onClick={handleSendMessage}
              disabled={!textInput.trim()}
              className="p-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md disabled:shadow-none"
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Footer - Clean minimal design */}
        <div className="px-6 py-3 bg-gray-50/50 border-t border-gray-100 flex-shrink-0">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium">Secure connection</span>
            </span>
            <span className="font-medium">{messages.length} {messages.length === 1 ? 'message' : 'messages'}</span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        /* Custom Scrollbar Styling for Webkit Browsers (Chrome, Safari, Edge) */
        .overflow-y-auto::-webkit-scrollbar {
          width: 8px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: #e5e7eb;
          border-radius: 10px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #60a5fa;
          border-radius: 10px;
          transition: background 0.2s ease;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #3b82f6;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:active {
          background: #2563eb;
        }
      `}</style>
    </div>
  );
}
