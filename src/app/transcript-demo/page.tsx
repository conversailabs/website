'use client';

/**
 * Live Transcript Demo Page
 *
 * Example page demonstrating how to use the LiveTranscript component
 * with a real voice call.
 */

import React, { useState } from 'react';
import { LiveTranscript } from '@/components/transcript/LiveTranscript';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Phone, PhoneOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function TranscriptDemoPage() {
  const [callId, setCallId] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState('+1234567890');
  const [isCallActive, setIsCallActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:7860';
  const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:7860';
  const securityKey = process.env.NEXT_PUBLIC_SECURITY_KEY || 'a7f4d2e3-8b5c-4d9e-b3a1-6c9f8e7d5b4a';

  const startCall = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`${backendUrl}/exotel/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          security_key: securityKey,
          phone_number: phoneNumber,
          // Optional: Provide agent_id if you have a specific agent
          // agent_id: 'your-agent-id',
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to start call: ${response.statusText}`);
      }

      const data = await response.json();
      setCallId(data.call_sid);
      setIsCallActive(true);

      toast({
        title: 'Call Started',
        description: `Call initiated with ID: ${data.call_sid}`,
      });
    } catch (error) {
      console.error('Error starting call:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to start call',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const endCall = () => {
    setIsCallActive(false);
    toast({
      title: 'Call Ended',
      description: 'The call has been ended. Transcript is still available.',
    });
  };

  const handleCallEnd = () => {
    console.log('Call ended automatically');
    setIsCallActive(false);
  };

  return (
    <div className="container mx-auto p-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Live Transcript Demo</h1>
        <p className="text-gray-600">
          Start a voice call and see the live transcript in real-time
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Call Control Panel */}
        <Card>
          <CardHeader>
            <CardTitle>Call Control</CardTitle>
            <CardDescription>
              Configure and initiate a voice call
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+1234567890"
                disabled={isCallActive}
              />
              <p className="text-xs text-gray-500">
                Enter the phone number to call (include country code)
              </p>
            </div>

            {callId && (
              <div className="space-y-2">
                <Label>Call ID</Label>
                <Input value={callId} readOnly />
              </div>
            )}

            <div className="flex gap-2">
              {!isCallActive ? (
                <Button
                  onClick={startCall}
                  disabled={isLoading || !phoneNumber}
                  className="flex-1"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  {isLoading ? 'Starting...' : 'Start Call'}
                </Button>
              ) : (
                <Button
                  onClick={endCall}
                  variant="destructive"
                  className="flex-1"
                >
                  <PhoneOff className="w-4 h-4 mr-2" />
                  End Call
                </Button>
              )}
            </div>

            <div className="pt-4 border-t">
              <h3 className="font-semibold mb-2">Configuration</h3>
              <div className="space-y-1 text-sm">
                <p><strong>Backend URL:</strong> {backendUrl}</p>
                <p><strong>WebSocket URL:</strong> {wsUrl}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Transcript Display */}
        <div>
          {callId ? (
            <LiveTranscript
              callId={callId}
              wsUrl={wsUrl}
              onCallEnd={handleCallEnd}
              autoScroll={true}
              showTimestamps={true}
            />
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="text-center">
                <Phone className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">
                  Start a call to see the live transcript
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Instructions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>How to Use</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <ol className="list-decimal list-inside space-y-2">
            <li>Ensure your backend server is running on <code className="bg-gray-100 px-1 py-0.5 rounded">{backendUrl}</code></li>
            <li>Enter a valid phone number (with country code)</li>
            <li>Click "Start Call" to initiate the call</li>
            <li>The live transcript will appear in real-time as the conversation progresses</li>
            <li>User speech and AI assistant responses are shown separately</li>
            <li>Click "End Call" when finished</li>
          </ol>

          <div className="pt-4 mt-4 border-t">
            <p className="font-semibold mb-2">Environment Variables (Optional)</p>
            <p className="text-xs text-gray-600">
              Set these in your <code className="bg-gray-100 px-1 py-0.5 rounded">.env.local</code> file:
            </p>
            <pre className="bg-gray-50 p-2 rounded mt-2 text-xs overflow-x-auto">
{`NEXT_PUBLIC_BACKEND_URL=http://localhost:7860
NEXT_PUBLIC_WS_URL=ws://localhost:7860
NEXT_PUBLIC_SECURITY_KEY=a7f4d2e3-8b5c-4d9e-b3a1-6c9f8e7d5b4a`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
