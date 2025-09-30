"use client";

import React, { useState } from "react";
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

  const handleTalkClick = () => {
    setShowEmailDialog(true);
    setEmail("");
    setEmailError("");
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
  };

  const handleEmailSubmit = () => {
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

    setEmailError("");
    setShowEmailDialog(false);
    setIsRecording(!isRecording);
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
    <div className="relative h-screen w-full overflow-hidden flex flex-col items-center bg-[#F0F2F5]">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_40%,_rgba(0,0,0,0.1))]"></div>

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

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-20 pb-8 h-full">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
          Insurance Voice AI workers from Sales to Service
        </h1>
        <p className="text-lg text-gray-600 mb-6 max-w-2xl">
          AI phone to automate quote intake, endorsements, FNOL, and renewals
          24x7,
          <br />
          without sacrificing the human touch
        </p>

        <div className="relative w-full h-80 flex items-center justify-center mb-6">
          <motion.div
            className="relative w-64 h-64 z-10 cursor-pointer"
            onClick={handleTalkClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="w-full h-full liquid-orb morphing-orb">
              <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-semibold z-20">
                Tap to talk
              </div>
            </div>
            {isRecording && (
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

        <Button
          onClick={() => window.open('/schedule-demo', '_self')}
          className="bg-gray-800 hover:bg-black text-white px-8 py-3 text-md rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 mb-2 font-semibold"
        >
          Book a demo
        </Button>
        <p className="text-gray-500 text-sm mb-6">
          Go live in a day, increase quote intake by 74%
        </p>
        <div className="flex flex-col items-center gap-4">
          <div className="text-gray-500 text-sm font-medium">
            Trusted by MGAs and Agencies across the US
          </div>
          <div className="flex items-center gap-8 opacity-60">
            <p className="font-bold text-xl">excel</p>
            <p className="font-bold text-xl">SG Benefit</p>
            <p className="font-bold text-xl">bamboo</p>
            <p className="font-bold text-xl">Highview</p>
          </div>
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