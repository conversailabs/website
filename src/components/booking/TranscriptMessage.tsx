'use client';

import { format } from 'date-fns';

export interface Message {
  id: string;
  role: 'user' | 'agent';
  text: string;
  timestamp: Date;
  isFinal: boolean;
  metadata?: {
    function_call?: string;
    contains_booking_info?: boolean;
    source?: string;
  };
}

interface TranscriptMessageProps {
  message: Message;
}

export function TranscriptMessage({ message }: TranscriptMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className="flex gap-3 mb-3 animate-fade-in group">
      {/* Avatar Circle - Minimal and clean */}
      <div className="flex-shrink-0">
        <div
          className={`
            w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold
            ${isUser
              ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-sm'
              : 'bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-sm'
            }
          `}
        >
          {isUser ? 'U' : 'AI'}
        </div>
      </div>

      {/* Message Content */}
      <div className="flex-1 min-w-0">
        {/* Header with name and timestamp */}
        <div className="flex items-baseline gap-2 mb-1.5">
          <span className="text-sm font-semibold text-gray-900">
            {isUser ? 'You' : 'AI Assistant'}
          </span>
          <span className="text-xs text-gray-500 font-medium">
            {format(message.timestamp, 'h:mm a')}
          </span>
          {!message.isFinal && (
            <span className="text-xs text-gray-400 italic">
              typing...
            </span>
          )}
        </div>

        {/* Message Text - Clean background with subtle styling */}
        <div
          className={`
            px-4 py-2.5 rounded-xl inline-block max-w-full
            ${isUser
              ? 'bg-gradient-to-br from-blue-50 to-blue-100/80 border border-blue-200/50'
              : 'bg-gradient-to-br from-gray-50 to-gray-100/80 border border-gray-200/50'
            }
            ${!message.isFinal ? 'opacity-70' : ''}
            transition-all duration-200
          `}
        >
          <p className="text-sm leading-relaxed text-gray-900 whitespace-pre-wrap">
            {message.text}
          </p>
        </div>
      </div>
    </div>
  );
}
