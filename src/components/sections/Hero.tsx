"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { validateBusinessEmail } from "@/lib/emailValidation";

// Landing page agent ID
const LANDING_PAGE_AGENT_ID = "agent_fdb605cbf88227c104786cd227";

type LiquidOrbProps = {
  size: number;
  initialX: number;
  duration?: number;
  className?: string;
};

const LiquidOrb = ({
  size,
  initialX,
  duration = 20,
  className = "",
}: LiquidOrbProps) => {
  const [randomDelay] = useState(() => -(Math.random() * duration));

  return (
    <motion.div
      className="absolute"
      style={{ width: size, height: size }}
      initial={{ y: "110vh", x: initialX, opacity: 0 }}
      animate={{
        y: ["110vh", "-25vh"],
        x: initialX,
        opacity: 1,
        transition: {
          duration,
          delay: randomDelay,
          repeat: Infinity,
          ease: "linear",
        },
      }}
    >
      <div className={`relative w-full h-full liquid-orb ${className}`}></div>
    </motion.div>
  );
};

const VoiceHero = () => {
  const [isRecording, setIsRecording] = useState(false);
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

  // Cleanup: Auto-end call when component unmounts (user navigates away)
  useEffect(() => {
    return () => {
      if (isCallActive && retellClientRef.current) {
        console.log('Page navigation detected - ending call automatically');
        retellClientRef.current.stopCall();
        retellClientRef.current = null;
      }
    };
  }, [isCallActive]);

  const getEmailSuggestions = () => {
    if (!email) return savedEmails.slice(0, 5);

    return savedEmails
      .filter(savedEmail =>
        savedEmail.toLowerCase().includes(email.toLowerCase())
      )
      .slice(0, 5);
  };

  const emailSuggestions = getEmailSuggestions();

  const startRetellCall = async () => {
    try {
      setIsConnecting(true);
      console.log(`Starting call with agent: ${LANDING_PAGE_AGENT_ID}`);

      // Call API to create web call
      const response = await fetch("/api/createWebCall", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId: LANDING_PAGE_AGENT_ID,
          metadata: {
            source: "home_page_tap_to_talk",
            page: typeof window !== 'undefined' ? window.location.pathname : 'unknown',
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Failed to create web call" }));
        console.error("API error:", errorData);
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const { access_token } = await response.json();
      console.log("Access token received");

      // Dynamically import Retell SDK
      const { RetellWebClient } = await import("retell-client-js-sdk");
      const retell = new RetellWebClient();
      retellClientRef.current = retell;

      // Register event listeners
      retell.on("call_started", () => {
        console.log("Call started");
        setIsCallActive(true);
        setIsConnecting(false);
        setIsRecording(true);
      });

      retell.on("agent_start_talking", () => {
        console.log("Agent started talking");
      });

      retell.on("agent_stop_talking", () => {
        console.log("Agent stopped talking");
      });

      retell.on("call_ended", () => {
        console.log("Call ended");
        setIsCallActive(false);
        setIsConnecting(false);
        setIsRecording(false);
      });

      retell.on("error", (error) => {
        console.error("Retell error:", error);
        alert("Call error: " + (error?.message || "Unknown error occurred"));
        setIsCallActive(false);
        setIsConnecting(false);
        setIsRecording(false);
      });

      // Start the call
      await retell.startCall({ accessToken: access_token });
    } catch (error) {
      console.error("Error starting call:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to start call";
      alert(`Unable to start call: ${errorMessage}\n\nPlease try again or contact support.`);
      setIsConnecting(false);
      setIsRecording(false);
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
    console.log("Tap to talk clicked!");

    // If call is active, stop it
    if (isCallActive) {
      stopRetellCall();
      return;
    }

    // Check if email exists in localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('savedEmails');
      const emails = saved ? JSON.parse(saved) : [];
      console.log("Saved emails:", emails);
      if (emails.length > 0) {
        // Email exists, start call
        console.log("Email exists, starting call");
        startRetellCall();
      } else {
        // No email, show dialog
        console.log("No email, showing dialog");
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

    const { isValid, error } = validateBusinessEmail(email);
    if (!isValid && error) {
      setEmailError(error);
      return;
    }

    // Save to localStorage
    if (!savedEmails.includes(email)) {
      const updatedEmails = [email, ...savedEmails].slice(0, 10);
      setSavedEmails(updatedEmails);
      localStorage.setItem('savedEmails', JSON.stringify(updatedEmails));
    }

    // Save to database via existing backend API (non-blocking - silent failure)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          name: 'Tap to Talk User',
          message: 'Tap to talk call request',
          source: `home_page_tap_to_talk - ${typeof window !== 'undefined' ? window.location.pathname : 'unknown'}`,
        }),
      });
      console.log('Email saved to database successfully');
    } catch (error) {
      // Silent failure - don't interrupt user experience
      console.error('Failed to save email to database:', error);
    }

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
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center bg-transparent">
      {/* Background Orbs */}
      <LiquidOrb size={80} initialX={-500} duration={35} className="morphing-orb" />
      <LiquidOrb size={50} initialX={-200} duration={40} className="morphing-orb" />
      <LiquidOrb size={90} initialX={480} duration={30} className="morphing-orb" />
      <LiquidOrb size={60} initialX={200} duration={45} className="morphing-orb" />
      <LiquidOrb size={65} initialX={-400} duration={38} className="morphing-orb" />
      <LiquidOrb size={55} initialX={350} duration={42} className="morphing-orb" />
      <LiquidOrb size={70} initialX={-100} duration={33} className="morphing-orb" />
      <LiquidOrb size={30} initialX={-300} duration={50} className="morphing-orb" />
      <LiquidOrb size={40} initialX={100} duration={48} className="morphing-orb" />
      <LiquidOrb size={25} initialX={550} duration={55} className="morphing-orb" />
      <LiquidOrb size={35} initialX={-600} duration={46} className="morphing-orb" />
      <LiquidOrb size={45} initialX={-50} duration={39} className="morphing-orb" />

      <div className="relative z-10 flex flex-col items-center justify-start text-center px-4 pt-28 md:pt-36 pb-4 md:pb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">
             VoiceAI Platform for Customer Conversations
        </h1>
        <p className="text-md text-gray-500 mb-4 max-w-3xl leading-relaxed">
          Automate phone calls, empower reps in real-time, and unlock insights
          <br className="hidden md:block" />
          from every interaction to increase revenue, reduce costs,
          <br className="hidden md:block" />
          and improve customer experience
        </p>

        <div className="relative w-full h-48 md:h-80 flex items-center justify-center mb-4">
          <motion.div
            className="relative w-40 h-40 md:w-64 md:h-64 z-10 cursor-pointer"
            onClick={handleTalkClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="w-full h-full liquid-orb morphing-orb">
              <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-semibold select-none z-20">
                {isConnecting ? 'Connecting...' : isCallActive ? 'End Call' : 'Tap to Talk'}
              </div>
            </div>
            {(isRecording || isCallActive) && (
              <>
                <div className="absolute inset-0 rounded-full border-2 border-cyan-300/70 animate-ping" />
                <div
                  className="absolute -inset-4 rounded-full border border-cyan-300/50 animate-ping"
                  style={{ animationDelay: "300ms" }}
                />
              </>
            )}
          </motion.div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <Button
            onClick={() => window.open('/schedule-demo', '_self')}
            className="bg-gray-800 hover:bg-black text-white px-8 py-3 text-md rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
          >
            Book a demo
          </Button>
          <Button
            onClick={() => window.open('https://dashboard.conversailabs.com/agents', '_blank')}
            className="bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-800 hover:border-black px-8 py-3 text-md rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
          >
            Go to Dashboard
          </Button>
        </div>
      </div>

      {/* Email Input Dialog */}
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

      <style jsx global>{`
        .liquid-orb {
          border-radius: 50%;
          position: relative;
          overflow: hidden;
          background: linear-gradient(45deg, #2193b0, #6dd5ed);
          box-shadow: inset 0 0 60px rgba(0, 0, 0, 0.4),
            0 10px 40px rgba(33, 147, 176, 0.5),
            0 0 0 10px rgba(255, 255, 255, 0.1);
        }

        .liquid-orb::before {
          content: "";
          position: absolute;
          top: -20%;
          left: -20%;
          width: 140%;
          height: 140%;
          background: radial-gradient(
              circle at 30% 30%,
              rgba(255, 255, 255, 0.8),
              transparent 50%
            ),
            radial-gradient(
              circle at 70% 80%,
              rgba(220, 240, 255, 0.9),
              transparent 40%
            );
          filter: blur(30px);
          animation: rotateTexture 20s linear infinite;
        }

        .liquid-orb::after {
          content: "";
          position: absolute;
          top: 5%;
          left: 10%;
          width: 80%;
          height: 40%;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.6),
            transparent
          );
          border-radius: 50% / 100%;
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
          transform: rotate(-15deg);
        }

        @keyframes rotateTexture {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes rotateTexture {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }


        @keyframes morphAnimation {
          0%,
          100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
            transform: scale(1) rotate(0deg);
          }
          25% {
            border-radius: 30% 70% 70% 30% / 30% 40% 60% 70%;
            transform: scale(1.02) rotate(5deg);
          }
          50% {
            border-radius: 70% 30% 60% 40% / 70% 60% 40% 30%;
            transform: scale(0.98) rotate(-5deg);
          }
          75% {
            border-radius: 40% 60% 30% 70% / 60% 70% 30% 40%;
            transform: scale(1.01) rotate(2deg);
          }
        }

        .morphing-orb {
          animation: morphAnimation 12s ease-in-out infinite;
        }


      `}</style>
    </div>
  );
};

export default VoiceHero;