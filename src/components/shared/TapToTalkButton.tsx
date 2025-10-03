"use client";

import React, { useState, useRef } from "react";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface TapToTalkButtonProps {
  source: string;
  agentId: string;
}

const DAILY_CALL_LIMIT = 10;

const TapToTalkButton: React.FC<TapToTalkButtonProps> = ({ source, agentId }) => {
  const { toast } = useToast();
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [savedEmails, setSavedEmails] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('savedEmails');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Retell AI state
  const [isCallActive, setIsCallActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const retellClientRef = useRef<any>(null);

  // Rate limiting and enquiry tracking
  const checkAndResetDailyLimit = () => {
    if (typeof window === 'undefined') return { count: 0, canCall: true };

    const today = new Date().toISOString().split('T')[0];
    const stored = localStorage.getItem('tapToTalkLimits');

    if (!stored) {
      return { count: 0, canCall: true };
    }

    const data = JSON.parse(stored);

    // Reset if new day
    if (data.date !== today) {
      localStorage.setItem('tapToTalkLimits', JSON.stringify({ date: today, count: 0 }));
      return { count: 0, canCall: true };
    }

    return { count: data.count, canCall: data.count < DAILY_CALL_LIMIT };
  };

  const incrementCallCount = () => {
    if (typeof window === 'undefined') return;

    const today = new Date().toISOString().split('T')[0];
    const { count } = checkAndResetDailyLimit();

    localStorage.setItem('tapToTalkLimits', JSON.stringify({
      date: today,
      count: count + 1
    }));
  };

  const isEnquirySubmitted = () => {
    if (typeof window === 'undefined') return false;

    const stored = localStorage.getItem('tapToTalkEnquiry');
    return stored === 'true';
  };

  const markEnquirySubmitted = () => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('tapToTalkEnquiry', 'true');
  };

  const getEmailSuggestions = () => {
    if (!email) return savedEmails.slice(0, 5);

    return savedEmails
      .filter(savedEmail =>
        savedEmail.toLowerCase().includes(email.toLowerCase())
      )
      .slice(0, 5);
  };

  const emailSuggestions = getEmailSuggestions();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const startRetellCall = async () => {
    // Check rate limit
    const { count, canCall } = checkAndResetDailyLimit();

    if (!canCall) {
      toast({
        title: "Daily Limit Reached",
        description: `You've reached the maximum of ${DAILY_CALL_LIMIT} calls per day. Please try again tomorrow.`,
        variant: "destructive",
      });
      return;
    }

    // Show info toast if enquiry already submitted
    if (isEnquirySubmitted()) {
      toast({
        title: "Your data is already saved",
        description: `Starting call... (${count + 1}/${DAILY_CALL_LIMIT} calls today)`,
      });
    }

    try {
      setIsConnecting(true);
      console.log(`Starting call with agent: ${agentId}`);

      const response = await fetch("/api/createWebCall", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentId }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Failed to create web call" }));
        console.error("API error:", errorData);
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const { access_token } = await response.json();
      console.log("Access token received");

      const { RetellWebClient } = await import("retell-client-js-sdk");
      const retell = new RetellWebClient();
      retellClientRef.current = retell;

      retell.on("call_started", () => {
        console.log("Call started");
        setIsCallActive(true);
        setIsConnecting(false);
        // Increment call count when call actually starts
        incrementCallCount();
      });

      retell.on("call_ended", () => {
        console.log("Call ended");
        setIsCallActive(false);
        setIsConnecting(false);
      });

      retell.on("error", (error) => {
        console.error("Retell error:", error);
        alert("Call error: " + (error?.message || "Unknown error occurred"));
        setIsCallActive(false);
        setIsConnecting(false);
      });

      await retell.startCall({ accessToken: access_token });
    } catch (error) {
      console.error("Error starting call:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to start call";
      alert(`Unable to start call: ${errorMessage}\n\nPlease try again or contact support.`);
      setIsConnecting(false);
    }
  };

  const stopRetellCall = () => {
    if (retellClientRef.current) {
      console.log("Stopping call");
      retellClientRef.current.stopCall();
      retellClientRef.current = null;
    }
  };

  const handleTalkClick = () => {
    if (isCallActive) {
      stopRetellCall();
      return;
    }

    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('savedEmails');
      const emails = saved ? JSON.parse(saved) : [];
      if (emails.length > 0) {
        startRetellCall();
      } else {
        setShowEmailDialog(true);
        setEmail("");
        setEmailError("");
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
      }
    }
  };

  const handleEmailSubmit = async () => {
    if (!email) {
      setEmailError("Please enter your email address");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    if (!savedEmails.includes(email)) {
      const updatedEmails = [email, ...savedEmails].slice(0, 10);
      setSavedEmails(updatedEmails);
      localStorage.setItem('savedEmails', JSON.stringify(updatedEmails));
    }

    // Mark enquiry as submitted
    markEnquirySubmitted();

    // Save to database via existing backend API
    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        name: 'Tap to Talk User',
        message: 'Tap to talk call request',
        source: source,
      }),
    }).catch(error => console.error('DB save failed:', error));

    setEmailError("");
    setShowEmailDialog(false);
    startRetellCall();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (selectedSuggestionIndex >= 0 && emailSuggestions[selectedSuggestionIndex]) {
        e.preventDefault();
        setEmail(emailSuggestions[selectedSuggestionIndex]);
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
      } else {
        handleEmailSubmit();
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (emailSuggestions.length > 0) {
        setSelectedSuggestionIndex(prev =>
          prev < emailSuggestions.length - 1 ? prev + 1 : prev
        );
        setShowSuggestions(true);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (emailSuggestions.length > 0) {
        setSelectedSuggestionIndex(prev => prev > 0 ? prev - 1 : -1);
        setShowSuggestions(true);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
    }
  };

  return (
    <>
      {/* Floating Tap to Talk Button */}
      <button
        onClick={handleTalkClick}
        disabled={isConnecting}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label={isCallActive ? "End call" : "Tap to talk"}
      >
        <Phone className={`w-7 h-7 text-white ${isCallActive ? 'animate-pulse' : ''}`} />

        {/* Ripple effect when active */}
        {isCallActive && (
          <>
            <span className="absolute inset-0 rounded-full border-2 border-cyan-300 animate-ping" />
            <span className="absolute inset-0 rounded-full border border-cyan-300 animate-ping" style={{ animationDelay: '300ms' }} />
          </>
        )}

        {/* Tooltip */}
        <span className="absolute right-full mr-3 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {isConnecting ? 'Connecting...' : isCallActive ? 'End Call' : 'Tap to Talk'}
        </span>
      </button>

      {/* Email Dialog */}
      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">Enter Your Email</DialogTitle>
            <DialogDescription className="text-sm text-gray-600 mt-1">
              Please provide your email to start the conversation
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-4">
            <div className="relative">
              <Input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                  setSelectedSuggestionIndex(-1);
                  if (savedEmails.length > 0) {
                    setShowSuggestions(true);
                  }
                }}
                onKeyDown={handleKeyDown}
                onFocus={() => {
                  if (savedEmails.length > 0) {
                    setShowSuggestions(true);
                  }
                }}
                onBlur={() => {
                  setTimeout(() => setShowSuggestions(false), 200);
                }}
                className="w-full h-12 text-lg font-medium text-gray-900 px-4 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder:text-gray-400"
                style={{ fontSize: "16px" }}
                autoComplete="off"
              />
              {showSuggestions && emailSuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-auto">
                  {emailSuggestions.map((suggestion, index) => (
                    <button
                      key={suggestion}
                      type="button"
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-blue-50 focus:bg-blue-50 focus:outline-none transition-colors ${
                        index === selectedSuggestionIndex ? "bg-blue-50 text-blue-700" : "text-gray-700"
                      }`}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setEmail(suggestion);
                        setShowSuggestions(false);
                        setSelectedSuggestionIndex(-1);
                      }}
                      onMouseEnter={() => setSelectedSuggestionIndex(index)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {emailError && (
              <p className="text-xs text-red-500 -mt-2">{emailError}</p>
            )}
            <div className="flex gap-3 justify-end mt-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowEmailDialog(false);
                  setEmail("");
                  setEmailError("");
                }}
                className="px-6 py-2 bg-white hover:bg-gray-50 text-gray-700 border-gray-300 font-medium transition-all duration-200 hover:shadow-md"
              >
                Cancel
              </Button>
              <Button
                onClick={handleEmailSubmit}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                Continue
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TapToTalkButton;
