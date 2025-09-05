"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Volume2, Package, Ruler, RefreshCw, Phone, MessageCircle, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

const MeetYourAgent = () => {
  const [activeDemo, setActiveDemo] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const demos = [
    {
      title: "Alex tracks an order",
      icon: Package,
      duration: "0:48",
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

  return (
    <section className="py-24 bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Meet Alex, your AI phone support rep
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Trained on your business, speaking your brand&apos;s voice, solving problems like your best agent
            </p>
          </motion.div>

          {/* Demo Selector Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {demos.map((demo, index) => (
              <motion.button
                key={demo.title}
                onClick={() => setActiveDemo(index)}
                className={`flex items-center gap-3 px-6 py-3 rounded-full border transition-all duration-300 ${
                  activeDemo === index 
                    ? 'bg-purple-600 border-purple-600 text-white' 
                    : 'bg-white/10 border-purple-400/30 text-gray-300 hover:border-purple-300 hover:text-white hover:bg-purple-800/30'
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
            className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/30 mb-12 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            key={activeDemo}
          >
            <div className="flex justify-center">
              {/* Audio Player */}
              <div className="space-y-6 max-w-2xl w-full">
                <div className="bg-gradient-to-br from-purple-800/40 to-blue-800/40 backdrop-blur-xl rounded-2xl p-8 border border-purple-400/20 shadow-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold !text-white">{demos[activeDemo].title}</h3>
                    <span className="text-purple-200 text-sm font-medium px-3 py-1 bg-purple-700/30 rounded-full">{demos[activeDemo].duration}</span>
                  </div>
                  
                  {/* Waveform Visualization */}
                  <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 backdrop-blur-sm rounded-xl p-5 mb-6">
                    <div className="flex items-center gap-1 h-20">
                      {[...Array(30)].map((_, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-gradient-to-t from-purple-300 via-purple-400 to-blue-300 rounded-full shadow-lg"
                          style={{
                            height: `${Math.random() * 100}%`,
                            opacity: isPlaying ? 0.9 : 0.5,
                            animation: isPlaying ? `pulse ${1 + Math.random()}s ease-in-out infinite` : 'none'
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-4">
                    <Button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 flex items-center justify-center shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                      {isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 ml-1 text-white" />}
                    </Button>
                    <div className="flex-1 h-3 bg-purple-900/40 rounded-full overflow-hidden shadow-inner">
                      <div className="h-full bg-gradient-to-r from-purple-300 to-blue-300 rounded-full shadow-lg" style={{ width: isPlaying ? '60%' : '0%', transition: 'width 1s' }} />
                    </div>
                    <Volume2 className="w-6 h-6 text-purple-200" />
                  </div>
                </div>

                <p className="text-purple-100 text-base text-center font-medium">{demos[activeDemo].description}</p>
              </div>
            </div>
          </motion.div>

          {/* Capabilities */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {capabilities.map((capability, index) => (
              <motion.div
                key={capability.label}
                className="bg-gradient-to-br from-purple-800/30 to-blue-800/30 backdrop-blur-xl rounded-xl p-6 border border-purple-400/20 hover:border-purple-300/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-purple-800/40"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg">
                    <capability.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{capability.label}</h3>
                    <p className="text-purple-100 text-sm">{capability.description}</p>
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