"use client"

import React, { useState, useEffect } from 'react'
import { Phone, PhoneOff, Mic, MicOff, Volume2, Loader2, Sparkles, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { RetellWebClient } from 'retell-client-js-sdk'

const DemoCallPage = () => {
  const [retellClient, setRetellClient] = useState<RetellWebClient | null>(null)
  const [callStatus, setCallStatus] = useState<'idle' | 'connecting' | 'connected' | 'ended' | 'error'>('idle')
  const [isMuted, setIsMuted] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  // Retell AI Agent ID
  const AGENT_ID = 'agent_7c78280fe497ff4870661e62c9'

  useEffect(() => {
    setMounted(true)
    return () => {
      if (retellClient) {
        retellClient.stopCall()
      }
    }
  }, [retellClient])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (callStatus === 'connected') {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1)
      }, 1000)
    } else {
      setCallDuration(0)
    }
    return () => clearInterval(interval)
  }, [callStatus])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const startCall = async () => {
    try {
      setCallStatus('connecting')
      setError(null)

      // Create web call via API
      const response = await fetch('/api/createWebCall', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ agentId: AGENT_ID }),
      })

      if (!response.ok) {
        throw new Error('Failed to create web call')
      }

      const data = await response.json()
      
      // Initialize Retell client
      const client = new RetellWebClient()
      
      // Set up event listeners
      client.on('call_started', () => {
        console.log('Call started')
        setCallStatus('connected')
      })

      client.on('call_ended', () => {
        console.log('Call ended')
        setCallStatus('ended')
      })

      client.on('error', (error) => {
        console.error('Call error:', error)
        setError('Connection error occurred')
        setCallStatus('error')
      })

      // Start the call with the access token
      await client.startCall({
        accessToken: data.access_token,
      })

      setRetellClient(client)
    } catch (err) {
      console.error('Error starting call:', err)
      setError('Failed to connect. Please try again.')
      setCallStatus('error')
    }
  }

  const endCall = () => {
    if (retellClient) {
      retellClient.stopCall()
      setRetellClient(null)
      setCallStatus('ended')
    }
  }

  const toggleMute = () => {
    if (retellClient) {
      if (isMuted) {
        retellClient.unmute()
      } else {
        retellClient.mute()
      }
      setIsMuted(!isMuted)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={mounted ? {
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          } : {}}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={mounted ? {
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.25, 0.1],
          } : {}}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4" />
              AI Voice Assistant Demo
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-bold !text-white mb-4">
              Experience Our AI Voice Agent
            </h1>
            <p className="text-xl text-gray-400 max-w-xl mx-auto">
              Click the button below to start a real conversation with our AI assistant. No setup required.
            </p>
          </motion.div>

          {/* Call Interface */}
          <motion.div 
            className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-800 shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Status Display */}
            <div className="text-center mb-8">
              <AnimatePresence mode="wait">
                {callStatus === 'idle' && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-2"
                  >
                    <div className="text-gray-400">Ready to connect</div>
                  </motion.div>
                )}
                
                {callStatus === 'connecting' && (
                  <motion.div
                    key="connecting"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-2"
                  >
                    <Loader2 className="w-8 h-8 text-blue-400 animate-spin mx-auto" />
                    <div className="text-blue-400">Connecting to AI assistant...</div>
                  </motion.div>
                )}
                
                {callStatus === 'connected' && (
                  <motion.div
                    key="connected"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-center gap-2 text-green-400">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Connected</span>
                    </div>
                    <div className="text-3xl font-mono text-white">{formatDuration(callDuration)}</div>
                    
                    {/* Voice Visualizer */}
                    <div className="flex items-center justify-center gap-1 h-16 mt-4">
                      {[...Array(20)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1 bg-gradient-to-t from-blue-400 to-purple-400 rounded-full"
                          animate={{
                            height: callStatus === 'connected' ? 
                              [16, 48, 32, 64, 24, 48, 16] : 16,
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.1,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
                
                {callStatus === 'ended' && (
                  <motion.div
                    key="ended"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-2"
                  >
                    <div className="text-gray-400">Call ended</div>
                    <button
                      onClick={() => setCallStatus('idle')}
                      className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
                    >
                      Make another call →
                    </button>
                  </motion.div>
                )}
                
                {callStatus === 'error' && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-2"
                  >
                    <AlertCircle className="w-8 h-8 text-red-400 mx-auto" />
                    <div className="text-red-400">{error || 'An error occurred'}</div>
                    <button
                      onClick={() => setCallStatus('idle')}
                      className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
                    >
                      Try again →
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Call Controls */}
            <div className="flex items-center justify-center gap-4">
              {(callStatus === 'idle' || callStatus === 'ended' || callStatus === 'error') && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Button
                    onClick={startCall}
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-8 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group"
                  >
                    <Phone className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                    Start Demo Call
                  </Button>
                </motion.div>
              )}

              {(callStatus === 'connecting' || callStatus === 'connected') && (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <Button
                      onClick={toggleMute}
                      size="lg"
                      variant="outline"
                      className={`rounded-full p-4 ${
                        isMuted 
                          ? 'bg-red-500/20 border-red-500/50 hover:bg-red-500/30' 
                          : 'bg-gray-800/50 border-gray-700 hover:bg-gray-700/50'
                      }`}
                    >
                      {isMuted ? (
                        <MicOff className="w-6 h-6 text-red-400" />
                      ) : (
                        <Mic className="w-6 h-6 text-white" />
                      )}
                    </Button>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  >
                    <Button
                      onClick={endCall}
                      size="lg"
                      className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300"
                    >
                      <PhoneOff className="w-6 h-6" />
                    </Button>
                  </motion.div>
                </>
              )}
            </div>

            {/* Instructions */}
            {callStatus === 'idle' && (
              <motion.div
                className="mt-8 text-center text-gray-400 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p>📞 Click the button to connect instantly</p>
                <p className="mt-2">🎤 Speak naturally - our AI understands context</p>
                <p className="mt-2">🔊 Make sure your microphone is enabled</p>
              </motion.div>
            )}
          </motion.div>

          {/* Features */}
          <motion.div 
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Volume2 className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="!text-white font-medium mb-1">Natural Voice</h3>
              <p className="text-gray-400 text-sm">Human-like conversation flow</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="!text-white font-medium mb-1">Smart Context</h3>
              <p className="text-gray-400 text-sm">Understands and remembers context</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="!text-white font-medium mb-1">Instant Response</h3>
              <p className="text-gray-400 text-sm">Real-time conversation with no delays</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default DemoCallPage