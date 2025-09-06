"use client"

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Volume2, Package, Ruler, RefreshCw, Phone, MessageCircle, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

const MeetYourAgent = () => {
  const [activeDemo, setActiveDemo] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [mounted, setMounted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Generate deterministic waveform heights
  const waveformHeights = [
    65, 45, 75, 55, 85, 40, 70, 60, 80, 50,
    75, 55, 70, 45, 85, 60, 75, 50, 80, 45,
    70, 60, 75, 55, 65, 45, 80, 60, 70, 50
  ]

  const demos = [
    {
      title: "Alex tracks an order",
      icon: Package,
      duration: "0:48",
      audioUrl: "https://uvmtfpyjtpryamcwhjhz.supabase.co/storage/v1/object/public/recording/alex%20tracks%20order.wav",
      description: "Watch Alex instantly locate customer orders and provide real-time tracking updates",
      transcript: [
        { time: "0:02", text: "Hi, I'm calling about my order #12345" },
        { time: "0:05", text: "I can help you with that! Let me pull up your order..." },
        { time: "0:08", text: "I found it! Your order was shipped yesterday via FedEx" },
        { time: "0:15", text: "It's currently in transit and will arrive by Thursday" }
      ]
    },
    {
      title: "Alex gives size advice",
      icon: Ruler,
      duration: "2:00",
      audioUrl: "https://uvmtfpyjtpryamcwhjhz.supabase.co/storage/v1/object/public/recording/alex%20gives%20style%20advice.wav",
      description: "See how Alex provides personalized product recommendations based on customer preferences",
      transcript: [
        { time: "0:02", text: "I'm not sure what size to order for the jacket" },
        { time: "0:05", text: "I'd be happy to help! What's your usual size in other brands?" },
        { time: "0:10", text: "Based on that, I recommend going with a Medium" },
        { time: "0:20", text: "Our jackets run true to size with a relaxed fit" }
      ]
    },
    {
      title: "Alex handles an exchange",
      icon: RefreshCw,
      duration: "1:19",
      audioUrl: "https://uvmtfpyjtpryamcwhjhz.supabase.co/storage/v1/object/public/recording/alex%20handles%20an%20exchange.wav",
      description: "Experience Alex seamlessly processing returns and exchanges with empathy",
      transcript: [
        { time: "0:02", text: "I need to exchange this item for a different size" },
        { time: "0:05", text: "No problem! I'll help you with the exchange right away" },
        { time: "0:10", text: "I'm sending you a prepaid return label via email" },
        { time: "0:15", text: "Your new size will ship as soon as we receive the return" }
      ]
    }
  ]

  const capabilities = [
    { icon: Phone, label: "Voice Calls", description: "Natural conversations" },
    { icon: MessageCircle, label: "Live Chat", description: "Instant responses" },
    { icon: Mail, label: "Email Support", description: "24/7 availability" }
  ]

  // Handle play/pause
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Reset audio when switching demos
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsPlaying(false)
    }
  }, [activeDemo])

  // Handle audio ended
  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      const handleEnded = () => setIsPlaying(false)
      audio.addEventListener('ended', handleEnded)
      return () => audio.removeEventListener('ended', handleEnded)
    }
  }, [])

  return (
    <section className="py-24 bg-gradient-to-b from-gray-950 via-gray-900 to-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold !text-white mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.7,
                type: "spring",
                stiffness: 100
              }}
            >
              Meet Alex, your AI phone support rep
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Trained on your business, speaking your brand&apos;s voice, solving problems like your best agent
            </motion.p>
          </motion.div>

          {/* Demo Selector Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {demos.map((demo, index) => (
              <motion.button
                key={demo.title}
                onClick={() => setActiveDemo(index)}
                className={`flex items-center gap-3 px-6 py-3 rounded-full border transition-all duration-300 ${
                  activeDemo === index 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'bg-gray-900/50 border-gray-700 text-gray-300 hover:border-blue-500 hover:text-white hover:bg-gray-800/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <demo.icon className="w-5 h-5" />
                <span className="font-medium">{demo.title}</span>
              </motion.button>
            ))}
          </div>

          {/* Demo Player */}
          <motion.div 
            className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 mb-12 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            key={activeDemo}
          >
            <div className="flex justify-center">
              {/* Audio Player */}
              <div className="space-y-6 max-w-2xl w-full">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 shadow-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold !text-white">{demos[activeDemo].title}</h3>
                    <span className="text-gray-400 text-sm font-medium px-3 py-1 bg-gray-700/30 rounded-full">{demos[activeDemo].duration}</span>
                  </div>
                  
                  {/* Waveform Visualization */}
                  <div className="bg-black/40 backdrop-blur-sm rounded-xl p-5 mb-6">
                    <div className="flex items-center gap-1 h-20">
                      {waveformHeights.map((height, i) => (
                        <motion.div
                          key={i}
                          className="flex-1 bg-gradient-to-t from-blue-400 via-blue-500 to-purple-400 rounded-full shadow-lg transition-opacity duration-300"
                          initial={{ height: 0 }}
                          animate={{ 
                            height: mounted ? `${height}%` : 0,
                            opacity: isPlaying ? 0.9 : 0.5
                          }}
                          transition={{
                            height: { duration: 0.3, delay: i * 0.02 },
                            opacity: { duration: 0.2 }
                          }}
                          style={{
                            animation: mounted && isPlaying ? `pulse ${1.2 + (i % 3) * 0.2}s ease-in-out infinite` : 'none'
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-4">
                    <Button
                      onClick={togglePlayPause}
                      className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 flex items-center justify-center shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                      {isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 ml-1 text-white" />}
                    </Button>
                    <div className="flex-1 h-3 bg-gray-800/40 rounded-full overflow-hidden shadow-inner">
                      <div className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full shadow-lg" style={{ width: isPlaying ? '60%' : '0%', transition: 'width 1s' }} />
                    </div>
                    <Volume2 className="w-6 h-6 text-gray-400" />
                  </div>
                </div>

                <p className="text-gray-300 text-base text-center font-medium">{demos[activeDemo].description}</p>
                
                {/* Hidden Audio Element */}
                {demos[activeDemo].audioUrl && (
                  <audio 
                    ref={audioRef} 
                    src={demos[activeDemo].audioUrl}
                    preload="auto"
                  />
                )}
              </div>
            </div>
          </motion.div>

          {/* Capabilities */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {capabilities.map((capability, index) => (
              <motion.div
                key={capability.label}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-blue-500/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-gray-800/50 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  y: -5,
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <capability.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="!text-white font-semibold group-hover:!text-blue-400 transition-colors duration-300">{capability.label}</h3>
                    <p className="text-gray-400 text-sm">{capability.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.5); }
        }
      `}</style>
    </section>
  )
}

export default MeetYourAgent