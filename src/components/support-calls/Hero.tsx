"use client"

import React, { useState, useEffect } from 'react'
import { Phone, Sparkles, TrendingUp, Clock, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

const SupportCallsHero = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
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
          className="absolute top-40 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
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
        <motion.div 
          className="absolute -bottom-8 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={mounted ? {
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          } : {}}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        {/* Additional gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-24 pb-16">
        <div className="max-w-5xl mx-auto">
          {/* Main Hero Content */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-4 py-2 rounded-full mb-6 border border-white/10"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-gray-300 text-sm font-medium">AI-Powered Support Agent</span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="block !text-white">AI phone rep for Shopify that</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400">
                instantly resolves 70%+ of support calls
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              Picks up every call. Finds orders, handles returns & exchanges, answers product & policy questions.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 !text-white px-8 py-6 text-lg rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                onClick={() => window.open('/schedule-demo', '_self')}
              >
                <Phone className="w-5 h-5 mr-2" />
                Start Free Trial - $0 today
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 hover:border-gray-500 bg-gray-900/50 backdrop-blur-sm !text-white px-8 py-6 text-lg hover:bg-gray-800/50 transition-all duration-300 rounded-lg"
                onClick={() => window.open('/schedule-demo', '_self')}
              >
                Prefer to talk? 15-min demo →
              </Button>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Resolution Rate */}
            <motion.div 
              className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 group cursor-pointer"
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.div 
                className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <TrendingUp className="w-6 h-6 text-white" />
              </motion.div>
              <motion.h3 
                className="text-3xl font-bold !text-white mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.5 
                }}
              >73%</motion.h3>
              <p className="text-gray-400 text-sm font-medium">Average Resolution Rate with AI</p>
              <p className="text-blue-400 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">(Aug 2025, across 2,100 stores)</p>
            </motion.div>

            {/* ROI */}
            <motion.div 
              className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 group cursor-pointer"
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <motion.div 
                className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-green-600 rounded-lg flex items-center justify-center mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <DollarSign className="w-6 h-6 text-white" />
              </motion.div>
              <motion.h3 
                className="text-3xl font-bold !text-white mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.6 
                }}
              >5.9x</motion.h3>
              <p className="text-gray-400 text-sm font-medium">Average ROI with ConversAI</p>
            </motion.div>

            {/* Wait Time */}
            <motion.div 
              className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 group cursor-pointer"
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <motion.div 
                className="w-12 h-12 bg-gradient-to-r from-green-600 to-purple-600 rounded-lg flex items-center justify-center mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Clock className="w-6 h-6 text-white" />
              </motion.div>
              <motion.h3 
                className="text-3xl font-bold !text-white mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.7 
                }}
              >&lt;30s</motion.h3>
              <p className="text-gray-400 text-sm font-medium">Average Wait Time</p>
              <p className="text-blue-400 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">vs 3-5 mins industry average</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  )
}

export default SupportCallsHero