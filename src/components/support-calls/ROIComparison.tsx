"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'

const ROIComparison = () => {
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
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-purple-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-gray-100/[0.03] bg-grid" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              The ROI of ConversAI
            </h2>
          </motion.div>

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Humans Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Humans</h3>
              <div className="space-y-6">
                {comparisonData.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                      <X className="w-5 h-5 text-red-500" />
                    </div>
                    <span className="text-gray-700 text-lg">{item.human}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* AI Column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-purple-50 via-white to-blue-50 rounded-2xl p-8 border-2 border-purple-300 shadow-xl relative overflow-hidden"
            >
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full opacity-20 blur-2xl" />
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Alex, the AI support rep
              </h3>
              <div className="space-y-6">
                {comparisonData.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-gray-700 text-lg font-medium">{item.ai}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Savings Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-7 py-3.5 rounded-full shadow-xl">
              <span className="text-xl md:text-2xl font-bold">You save</span>
              <span className="text-3xl md:text-4xl font-bold">83%</span>
              <span className="text-2xl">🤯</span>
            </div>
          </motion.div>

          {/* Additional Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
              <p className="text-gray-600">Available round the clock</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">0s</div>
              <p className="text-gray-600">Wait time for customers</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">∞</div>
              <p className="text-gray-600">Scalability potential</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ROIComparison