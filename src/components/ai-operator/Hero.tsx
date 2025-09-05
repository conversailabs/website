"use client"

import React, { useState } from 'react'
import { Phone, MessageSquare, ArrowRight, Sparkles } from 'lucide-react'
import ContactModal from '@/components/forms/ContactModal'
import { motion } from 'framer-motion'

export default function AIOperatorHero() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  return (
    <section className="relative bg-gradient-to-b from-gray-950 via-gray-900 to-black pt-32 pb-20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-gray-300">AI-Powered 24/7 Operations</span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center mb-8"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              <span className="block bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                ConversAI is a 24/7 Operator
              </span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mt-2">
                purpose-built for real estates
              </span>
            </h1>
          </motion.div>

          {/* Subheadline with enhanced styling */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center max-w-4xl mx-auto mb-12"
          >
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed">
              <span className="font-semibold !text-white">A new way to automate your frontline communications.</span>{' '}
              <span className="text-gray-400">
                Operator is powered by <span className="text-blue-400 font-medium">AI and humans</span>, designed to
                <span className="text-purple-400 font-medium"> convert leads</span> and
                <span className="text-purple-400 font-medium"> resolve issues</span>. 
                It works seamlessly with your existing phone lines & systems to answer every call and message,
                <span className="!text-white font-medium"> by day or night</span>.
              </span>
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 !text-white px-8 py-3 text-base font-semibold group shadow-xl hover:shadow-2xl transition-all duration-300 rounded-lg"
            >
              <span className="relative z-10 flex items-center justify-center">
                Schedule a Demo
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
            </button>
            <button 
              onClick={() => window.open('https://dashboard.conversailabs.com/', '_blank')}
              className="relative border-2 border-gray-600 hover:border-gray-500 bg-gray-900/50 backdrop-blur-sm !text-white px-8 py-3 text-base font-semibold group hover:bg-gray-800/50 transition-all duration-300 shadow-xl hover:shadow-2xl rounded-lg"
            >
              <span className="flex items-center justify-center">
                <Phone className="mr-2 w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors" />
                Call AI Operator
              </span>
            </button>
          </motion.div>

          {/* Feature Pills with glow effect */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            {[
              { icon: Phone, text: "Voice Calls", color: "blue" },
              { icon: MessageSquare, text: "SMS & WhatsApp", color: "purple" },
              { icon: Sparkles, text: "Email Support", color: "pink" }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <div className={`absolute inset-0 rounded-full bg-gradient-to-r 
                  ${feature.color === 'blue' ? 'from-blue-500/20 to-blue-600/20' : ''}
                  ${feature.color === 'purple' ? 'from-purple-500/20 to-purple-600/20' : ''}
                  ${feature.color === 'pink' ? 'from-pink-500/20 to-pink-600/20' : ''}
                  blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} 
                />
                <div className="relative flex items-center gap-3 px-6 py-3 rounded-full bg-gray-900/70 border border-gray-700 group-hover:border-gray-600 transition-colors backdrop-blur-sm">
                  <feature.icon className={`w-5 h-5 
                    ${feature.color === 'blue' ? 'text-blue-400' : ''}
                    ${feature.color === 'purple' ? 'text-purple-400' : ''}
                    ${feature.color === 'pink' ? 'text-pink-400' : ''}
                  `} />
                  <span className="text-gray-200 font-medium">{feature.text}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>

      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </section>
  )
}