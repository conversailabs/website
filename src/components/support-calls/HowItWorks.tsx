"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Upload, Settings, Rocket, BarChart3 } from 'lucide-react'

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Upload Your Knowledge Base",
      description: "Import your FAQs, product info, policies, and support documentation. Alex learns everything about your business instantly.",
      icon: Upload,
      color: "from-purple-600 to-blue-600"
    },
    {
      number: "02",
      title: "Customize Alex's Personality",
      description: "Choose voice, tone, and response style. Set up custom workflows for returns, exchanges, and escalations.",
      icon: Settings,
      color: "from-blue-600 to-cyan-600"
    },
    {
      number: "03",
      title: "Deploy in Minutes",
      description: "Connect your phone number and go live. Alex starts handling calls immediately with no downtime.",
      icon: Rocket,
      color: "from-cyan-600 to-green-600"
    },
    {
      number: "04",
      title: "Monitor & Optimize",
      description: "Track performance in real-time. Alex learns from every interaction and gets smarter over time.",
      icon: BarChart3,
      color: "from-green-600 to-purple-600"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-black to-purple-900/20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Get Started in 4 Simple Steps
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              From setup to first call in under 30 minutes. No technical expertise required.
            </p>
          </motion.div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="relative"
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-purple-600/50 to-transparent -z-10" />
                )}

                <div className="bg-gradient-to-br from-purple-900/30 to-black/50 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 h-full">
                  {/* Step Number */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-5xl font-bold text-purple-600/30">{step.number}</span>
                    <div className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center`}>
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>

                  {/* Hover Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-purple-600/0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    whileHover={{ opacity: 1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Timeline for Mobile */}
          <div className="lg:hidden mt-8 flex justify-center">
            <div className="flex items-center gap-2">
              {steps.map((_, index) => (
                <React.Fragment key={index}>
                  <div className="w-3 h-3 bg-purple-600 rounded-full" />
                  {index < steps.length - 1 && (
                    <div className="w-12 h-0.5 bg-purple-600/50" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks