"use client";

import type React from "react";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X, Phone, PhoneOff, Mic, MicOff } from "lucide-react";
import agentsData from "@/data/usecases1.json";

interface AgentDetailsExplorerProps {
  agentName: string;
  onBack?: () => void;
  isMobile?: boolean;
}

const AgentDetailsExplorer: React.FC<AgentDetailsExplorerProps> = ({
  agentName,
}) => {
  const [agent, setAgent] = useState<any | null>(null);
  const [showCallDialog, setShowCallDialog] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isAgentSpeaking, setIsAgentSpeaking] = useState(false);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [currentSpeaker, setCurrentSpeaker] = useState<"agent" | "user" | null>(
    null
  );
  const retellClientRef = useRef<any>(null);
  const callTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const allAgents: any[] = [];
    Object.values(agentsData).forEach((category: any) => {
      Object.values(category.agents).forEach((agent: any) =>
        allAgents.push(agent)
      );
    });

    const normalizedSearch = agentName.toLowerCase().trim();
    const found = allAgents.find((a) =>
      a.name.toLowerCase().includes(normalizedSearch)
    );
    setAgent(found || null);
  }, [agentName]);

  useEffect(() => {
    if (isCallActive) {
      callTimerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
        callTimerRef.current = null;
      }
    }

    return () => {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
      }
    };
  }, [isCallActive]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const startCall = async () => {
    setIsConnecting(true);
    setCallDuration(0);

    try {
      const res = await fetch("/api/createWebCall", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentId: agent.agentId }),
      });

      if (!res.ok) throw new Error(await res.text());
      const { access_token } = await res.json();

      const { RetellWebClient } = await import("retell-client-js-sdk");
      const retell = new RetellWebClient();
      retellClientRef.current = retell;

      retell.on("call_started", () => {
        setIsCallActive(true);
        setIsConnecting(false);
      });

      retell.on("call_ended", () => {
        setIsCallActive(false);
        setIsAgentSpeaking(false);
        setIsUserSpeaking(false);
        setCurrentSpeaker(null);
      });

      retell.on("agent_start_talking", () => {
        setIsAgentSpeaking(true);
        setCurrentSpeaker("agent");
      });

      retell.on("agent_stop_talking", () => {
        setIsAgentSpeaking(false);
        if (!isUserSpeaking) setCurrentSpeaker(null);
      });

      retell.on("user_start_talking", () => {
        setIsUserSpeaking(true);
        setCurrentSpeaker("user");
      });

      retell.on("user_stop_talking", () => {
        setIsUserSpeaking(false);
        if (!isAgentSpeaking) setCurrentSpeaker(null);
      });

      retell.on("error", (error) => {
        console.error("Call error:", error);
        setIsCallActive(false);
        setIsConnecting(false);
        setCurrentSpeaker(null);
      });

      await retell.startCall({ accessToken: access_token });
    } catch (err: any) {
      console.error("Failed to start call:", err);
      setIsConnecting(false);
    }
  };

  const endCall = async () => {
    if (retellClientRef.current && isCallActive) {
      try {
        await retellClientRef.current.stopCall();
      } catch (error) {
        console.error("Error ending call:", error);
      }
    }
    setIsCallActive(false);
    setIsConnecting(false);
    setIsAgentSpeaking(false);
    setIsUserSpeaking(false);
    setCurrentSpeaker(null);
    retellClientRef.current = null;
  };

  const closeDialog = () => {
    if (isCallActive || isConnecting) {
      endCall();
    }
    setShowCallDialog(false);
    setCallDuration(0);
  };

  if (!agent) {
    return (
      <div className="text-center text-gray-500 py-10">
        Loading agent details…
      </div>
    );
  }

  return (
    <>
      <Card className="p-8 bg-gradient-to-br text-xs from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden h-[600px] w-full shadow-2xl border-0">
        <div className="relative z-10 grid md:grid-cols-2 gap-8 h-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center items-center space-y-6"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-1 shadow-2xl"
            >
              <Avatar className="w-full h-full border-2 border-white/20">
                <AvatarImage src="/placeholder.svg?height=80&width=80" />
                <AvatarFallback className="bg-white text-gray-900 text-2xl font-bold">
                  {agent.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </motion.div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white">{agent.name}</h1>
              <p className="text-sm text-white/70">{agent.role}</p>
              <Button
                className="mt-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                onClick={() => setShowCallDialog(true)}
              >
                <Phone className="w-4 h-4 mr-2" />
                Demo Call
              </Button>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 w-full">
              <h2 className="text-sm font-semibold mb-2 text-white">
                Description
              </h2>
              <p className="text-xs text-white/85">{agent.description}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6 overflow-y-auto max-h-full pr-2"
          >
            {agent.functionality?.primary_functions?.length > 0 && (
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
                <h2 className="text-sm font-semibold mb-3 text-white">
                  Primary Functions
                </h2>
                <ul className="space-y-2">
                  {agent.functionality.primary_functions.map(
                    (func: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-white/50" />
                        <span className="text-xs text-white/85">{func}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
          </motion.div>
        </div>
      </Card>

      <Dialog open={showCallDialog} onOpenChange={closeDialog}>
        <DialogContent className="max-w-lg h-[500px] p-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-0">
          <DialogHeader className="p-6 pb-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    {agent.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <DialogTitle className="text-lg font-semibold text-white">
                    {agent.name}
                  </DialogTitle>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    {isCallActive && (
                      <>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span>Connected • {formatDuration(callDuration)}</span>
                      </>
                    )}
                    {isConnecting && (
                      <>
                        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                        <span>Connecting...</span>
                      </>
                    )}
                    {!isCallActive && !isConnecting && (
                      <>
                        <div className="w-2 h-2 bg-gray-500 rounded-full" />
                        <span>Ready to connect</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {/* <Button
                variant="ghost"
                size="sm"
                onClick={closeDialog}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </Button> */}
            </div>
          </DialogHeader>

          {/* Microphone Visualization */}
          <div className="flex-1 flex flex-col items-center justify-center px-6">
            <div className="relative flex items-center justify-center">
              {/* Outer Pulse Rings */}
              <AnimatePresence>
                {(isAgentSpeaking || isUserSpeaking) && (
                  <>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 2, opacity: 0 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeOut",
                      }}
                      className={`absolute w-32 h-32 rounded-full border-2 ${
                        currentSpeaker === "agent"
                          ? "border-blue-500/30"
                          : "border-green-500/30"
                      }`}
                    />
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeOut",
                        delay: 0.3,
                      }}
                      className={`absolute w-32 h-32 rounded-full border-2 ${
                        currentSpeaker === "agent"
                          ? "border-blue-500/50"
                          : "border-green-500/50"
                      }`}
                    />
                  </>
                )}
              </AnimatePresence>

              {/* Main Microphone */}
              <motion.div
                animate={{
                  scale: isAgentSpeaking || isUserSpeaking ? [1, 1.1, 1] : 1,
                  boxShadow:
                    isAgentSpeaking || isUserSpeaking
                      ? currentSpeaker === "agent"
                        ? [
                            "0 0 0 0 rgba(59, 130, 246, 0.7)",
                            "0 0 0 20px rgba(59, 130, 246, 0)",
                            "0 0 0 0 rgba(59, 130, 246, 0)",
                          ]
                        : [
                            "0 0 0 0 rgba(34, 197, 94, 0.7)",
                            "0 0 0 20px rgba(34, 197, 94, 0)",
                            "0 0 0 0 rgba(34, 197, 94, 0)",
                          ]
                      : "0 0 0 0 rgba(0, 0, 0, 0)",
                }}
                transition={{
                  scale: {
                    duration: 0.6,
                    repeat:
                      isAgentSpeaking || isUserSpeaking
                        ? Number.POSITIVE_INFINITY
                        : 0,
                  },
                  boxShadow: {
                    duration: 1.5,
                    repeat:
                      isAgentSpeaking || isUserSpeaking
                        ? Number.POSITIVE_INFINITY
                        : 0,
                  },
                }}
                className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCallActive
                    ? currentSpeaker === "agent"
                      ? "bg-gradient-to-r from-blue-500 to-blue-600"
                      : currentSpeaker === "user"
                      ? "bg-gradient-to-r from-green-500 to-green-600"
                      : "bg-gradient-to-r from-gray-600 to-gray-700"
                    : "bg-gradient-to-r from-gray-700 to-gray-800"
                }`}
              >
                <motion.div
                  animate={{
                    rotate: isAgentSpeaking || isUserSpeaking ? 360 : 0,
                  }}
                  transition={{
                    duration: 2,
                    repeat:
                      isAgentSpeaking || isUserSpeaking
                        ? Number.POSITIVE_INFINITY
                        : 0,
                    ease: "linear",
                  }}
                >
                  {isCallActive ? (
                    <Mic className="w-12 h-12 text-white" />
                  ) : (
                    <MicOff className="w-12 h-12 text-white/70" />
                  )}
                </motion.div>
              </motion.div>

              {/* Sound Bars */}
              <AnimatePresence>
                {(isAgentSpeaking || isUserSpeaking) && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 4 }}
                        animate={{ height: [4, 20, 4] }}
                        exit={{ height: 4 }}
                        transition={{
                          duration: 0.5,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.1,
                          ease: "easeInOut",
                        }}
                        className={`w-1 mx-1 rounded-full ${
                          currentSpeaker === "agent"
                            ? "bg-blue-300"
                            : "bg-green-300"
                        }`}
                        style={{
                          transform: `rotate(${i * 45}deg) translateY(-60px)`,
                          transformOrigin: "center 60px",
                        }}
                      />
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Speaker Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-center"
            >
              {isConnecting && (
                <div className="text-yellow-400 font-medium">
                  <div className="w-6 h-6 mx-auto mb-2 animate-spin rounded-full border-2 border-yellow-400 border-t-transparent" />
                  Connecting...
                </div>
              )}
              {isCallActive && (
                <div className="space-y-2">
                  {currentSpeaker === "agent" && (
                    <div className="text-blue-400 font-medium flex items-center justify-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                      {agent.name} is speaking
                    </div>
                  )}
                  {currentSpeaker === "user" && (
                    <div className="text-green-400 font-medium flex items-center justify-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      You are speaking
                    </div>
                  )}
                  {!currentSpeaker && (
                    <div className="text-gray-400 font-medium">
                      Listening...
                    </div>
                  )}
                </div>
              )}
              {!isCallActive && !isConnecting && (
                <div className="text-gray-400 font-medium">
                  Ready to start call
                </div>
              )}
            </motion.div>
          </div>

          {/* Call Controls */}
          <div className="p-6 pt-0">
            <div className="flex items-center justify-center gap-4">
              {!isCallActive && !isConnecting && (
                <Button
                  onClick={startCall}
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Start Call
                </Button>
              )}

              {isConnecting && (
                <Button
                  disabled
                  className="bg-yellow-500 text-white px-8 py-3 rounded-full text-lg font-medium"
                >
                  <div className="w-5 h-5 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Connecting...
                </Button>
              )}

              {isCallActive && (
                <Button
                  onClick={endCall}
                  className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg"
                >
                  <PhoneOff className="w-5 h-5 mr-2" />
                  End Call
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AgentDetailsExplorer;
