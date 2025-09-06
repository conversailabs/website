"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Zap, Shield, Globe, Brain, 
  HeartHandshake, TrendingUp, Clock, Languages,
  CreditCard, Database, Workflow, Users
} from 'lucide-react'

const FeaturesGrid = () => {
  const features = [
    {
      icon: Zap,
      title: "Instant Resolution",
      description: "Resolve 70%+ of support calls without human intervention",
      gradient: "from-yellow-600 to-orange-600"
    },
    {
      icon: Brain,
      title: "AI-Powered Learning",
      description: "Gets smarter with every interaction, learning from your best agents",
      gradient: "from-purple-600 to-pink-600"
    },
    {
      icon: Globe,
      title: "24/7 Availability",
      description: "Never miss a call. Support customers across all time zones",
      gradient: "from-blue-600 to-cyan-600"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "SOC 2 compliant with end-to-end encryption and data privacy",
      gradient: "from-green-600 to-teal-600"
    },
    {
      icon: HeartHandshake,
      title: "Empathetic Responses",
      description: "Natural conversations that understand context and emotion",
      gradient: "from-pink-600 to-red-600"
    },
    {
      icon: TrendingUp,
      title: "Real-Time Analytics",
      description: "Track performance, sentiment, and resolution rates instantly",
      gradient: "from-indigo-600 to-purple-600"
    },
    {
      icon: Clock,
      title: "Zero Wait Time",
      description: "Answer every call immediately, no queues or hold music",
      gradient: "from-orange-600 to-red-600"
    },
    {
      icon: Languages,
      title: "Multilingual Support",
      description: "Serve customers in 95+ languages with native fluency",
      gradient: "from-teal-600 to-blue-600"
    },
    {
      icon: CreditCard,
      title: "Process Payments",
      description: "Secure payment processing and order management built-in",
      gradient: "from-purple-600 to-blue-600"
    },
    {
      icon: Database,
      title: "CRM Integration",
      description: "Seamlessly connects with Salesforce, HubSpot, and more",
      gradient: "from-cyan-600 to-blue-600"
    },
    {
      icon: Workflow,
      title: "Custom Workflows",
      description: "Build complex decision trees for any scenario",
      gradient: "from-pink-600 to-purple-600"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Seamless handoff to human agents when needed",
      gradient: "from-green-600 to-cyan-600"
    }
  ]

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Everything You Need to Scale Support
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Powerful features that transform how you handle customer support
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <div className="bg-gradient-to-br from-purple-900/20 to-black/50 backdrop-blur-xl rounded-xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 h-full">
                  {/* Icon */}
                  <div className={`w-10 h-10 bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/5 to-purple-600/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturesGrid