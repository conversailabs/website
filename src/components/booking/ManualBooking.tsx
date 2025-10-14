'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface ManualBookingProps {
  onBack: () => void;
  onClose: () => void;
}

export function ManualBooking({ onBack, onClose }: ManualBookingProps) {
  useEffect(() => {
    // Load Cal.com embed script only once
    if (!document.querySelector('script[src*="cal.com/embed"]')) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://app.cal.com/embed/embed.js';
      script.async = true;
      document.head.appendChild(script);
      console.log('📅 Loading Cal.com embed script...');
    } else {
      console.log('ℹ️ Cal.com script already loaded');
    }
  }, []);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <Button
          variant="ghost"
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <h2 className="text-2xl font-bold text-gray-900">Schedule Your Demo</h2>

        <Button
          variant="ghost"
          onClick={onClose}
          className="text-gray-600 hover:text-gray-900"
        >
          Close
        </Button>
      </div>

      {/* Cal.com Embed */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto">
          {/* Cal.com Inline Embed */}
          <div
            className="cal-inline-embed"
            style={{ width: '100%', minHeight: '630px' }}
          >
            <iframe
              src="https://cal.com/vaibhav-27lg/appointment-booking?embed=true"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ minHeight: '630px', border: 'none' }}
              title="Schedule a meeting"
            />
          </div>

          {/* Instructions */}
          <div className="mt-8 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-sm">
                ℹ️
              </span>
              Setup Instructions for Developers
            </h3>

            <div className="space-y-3 text-sm text-gray-700">
              <div className="bg-white p-4 rounded-lg border border-green-200">
                <p className="font-semibold mb-2">To enable Cal.com booking:</p>
                <ol className="list-decimal list-inside space-y-2 ml-2">
                  <li>Create a free account at <a href="https://cal.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">cal.com</a></li>
                  <li>Create an event type (e.g., &quot;Demo Call&quot;, &quot;30 Min Meeting&quot;)</li>
                  <li>Copy your booking link (e.g., &quot;yourname/demo&quot;)</li>
                  <li>
                    Update this component:
                    <code className="block mt-2 p-2 bg-gray-900 text-green-400 rounded text-xs overflow-x-auto">
                      data-cal-link=&quot;<span className="text-yellow-400">your-username/demo</span>&quot;
                    </code>
                  </li>
                  <li>The calendar will automatically load with your availability</li>
                </ol>
              </div>

              <div className="bg-white p-4 rounded-lg border border-green-200">
                <p className="font-semibold mb-2">Environment Variable (Optional):</p>
                <p className="mb-2">Add to your <code className="bg-gray-100 px-2 py-1 rounded">.env.local</code>:</p>
                <code className="block p-2 bg-gray-900 text-green-400 rounded text-xs">
                  NEXT_PUBLIC_CAL_COM_USERNAME=your-username/demo
                </code>
              </div>

              <div className="bg-white p-4 rounded-lg border border-green-200">
                <p className="font-semibold mb-2">Cal.com Features:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Automatic timezone detection</li>
                  <li>Email confirmations & reminders</li>
                  <li>Google Calendar integration</li>
                  <li>Zoom/Meet video links</li>
                  <li>Customizable booking forms</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
