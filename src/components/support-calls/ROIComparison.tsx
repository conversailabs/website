"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check, X, TrendingUp, Clock, Globe, Users } from 'lucide-react'

const ROIComparison = () => {
  const [hoveredCard, setHoveredCard] = useState<'human' | 'ai' | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  const comparisonData = [
    {
      human: "Works 40 hrs/week",
      ai: "Works 168 hrs/week",
      humanIcon: false,
      aiIcon: true
    },
    {
      human: "~$2.35 cost per call",
      ai: "~$0.38 cost per call",
      humanIcon: false,
      aiIcon: true
    },
    {
      human: "Takes 1 call at a time",
      ai: "Takes 15+ calls at a time",
      humanIcon: false,
      aiIcon: true
    },
    {
      human: "Speaks 1 or 2 languages",
      ai: "Speaks 30 languages",
      humanIcon: false,
      aiIcon: true
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl"
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
          className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
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
      <div className="absolute inset-0 bg-grid-gray-800/[0.03] bg-grid" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
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
              The ROI of ConversAI
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              See how Alex delivers 83% cost savings while providing superior service
            </motion.p>
          </motion.div>

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Humans Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-800 hover:border-gray-700 transition-all duration-300"
              onMouseEnter={() => setHoveredCard('human')}
              onMouseLeave={() => setHoveredCard(null)}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              <motion.h3 
                className="text-2xl font-bold !text-white mb-8 text-center"
                animate={{ 
                  scale: hoveredCard === 'human' ? 1.05 : 1 
                }}
                transition={{ duration: 0.2 }}
              >
                Humans
              </motion.h3>
              <div className="space-y-6">
                {comparisonData.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3 group"
                    whileHover={{ x: 5 }}
                  >
                    <motion.div 
                      className="w-8 h-8 rounded-full bg-red-900/30 flex items-center justify-center flex-shrink-0"
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <X className="w-5 h-5 text-red-400" />
                    </motion.div>
                    <span className="text-gray-400 text-lg group-hover:text-gray-300 transition-colors">{item.human}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* AI Column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-blue-900/30 rounded-2xl p-8 border-2 border-blue-500/50 shadow-xl relative overflow-hidden hover:border-blue-400/60 transition-all duration-300"
              onMouseEnter={() => setHoveredCard('ai')}
              onMouseLeave={() => setHoveredCard(null)}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              <motion.div 
                className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-20 blur-2xl"
                animate={{
                  scale: hoveredCard === 'ai' ? 1.5 : 1,
                  opacity: hoveredCard === 'ai' ? 0.3 : 0.2
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.h3 
                className="text-2xl font-bold !text-white mb-8 text-center"
                animate={{ 
                  scale: hoveredCard === 'ai' ? 1.05 : 1 
                }}
                transition={{ duration: 0.2 }}
              >
                Alex, the AI support rep
              </motion.h3>
              <div className="space-y-6">
                {comparisonData.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3 group"
                    whileHover={{ x: -5 }}
                  >
                    <motion.div 
                      className="w-8 h-8 rounded-full bg-green-900/30 flex items-center justify-center flex-shrink-0"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Check className="w-5 h-5 text-green-400" />
                    </motion.div>
                    <span className="text-gray-300 text-lg font-medium group-hover:text-white transition-colors">{item.ai}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Savings Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.6, 
              delay: 0.5,
              type: "spring",
              stiffness: 200
            }}
            className="text-center"
          >
            <motion.div 
              className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-7 py-3.5 rounded-full shadow-xl"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span 
                className="text-xl md:text-2xl font-bold"
                animate={mounted ? { opacity: [1, 0.8, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                You save
              </motion.span>
              <motion.span 
                className="text-3xl md:text-4xl font-bold"
                animate={mounted ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                83%
              </motion.span>
              <motion.span 
                className="text-2xl"
                animate={mounted ? { rotate: [0, 10, -10, 0] } : {}}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                🤯
              </motion.span>
            </motion.div>
          </motion.div>

          {/* Additional Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <motion.div 
              className="text-center group cursor-pointer"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div 
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full mb-3 mx-auto"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Clock className="w-8 h-8 text-white" />
              </motion.div>
              <motion.div 
                className="text-3xl font-bold text-blue-400 mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.8 
                }}
              >
                24/7
              </motion.div>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">Available round the clock</p>
            </motion.div>
            <motion.div 
              className="text-center group cursor-pointer"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div 
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-600 to-green-600 rounded-full mb-3 mx-auto"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Users className="w-8 h-8 text-white" />
              </motion.div>
              <motion.div 
                className="text-3xl font-bold text-blue-400 mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.9 
                }}
              >
                0s
              </motion.div>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">Wait time for customers</p>
            </motion.div>
            <motion.div 
              className="text-center group cursor-pointer"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div 
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-purple-600 rounded-full mb-3 mx-auto"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <TrendingUp className="w-8 h-8 text-white" />
              </motion.div>
              <motion.div 
                className="text-3xl font-bold text-blue-400 mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 1.0 
                }}
              >
                ∞
              </motion.div>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">Scalability potential</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ROIComparison