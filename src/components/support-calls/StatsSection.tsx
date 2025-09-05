"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Clock, DollarSign } from 'lucide-react'

const StatsSection = () => {
  const stats = [
    {
      number: "2,179+",
      label: "Businesses Scaling with ConversAI",
      icon: Users,
      gradient: "from-purple-600 to-blue-600"
    },
    {
      number: "73%",
      label: "Average Resolution Rate with AI",
      subtitle: "(Aug 2025, across 2,100 stores)",
      icon: TrendingUp,
      gradient: "from-blue-600 to-cyan-600"
    },
    {
      number: "5.9x",
      label: "Average ROI with ConversAI",
      icon: DollarSign,
      gradient: "from-cyan-600 to-green-600"
    },
    {
      number: "<30s",
      label: "Average Wait Time",
      subtitle: "vs 3-5 mins industry average",
      icon: Clock,
      gradient: "from-green-600 to-purple-600"
    }
  ]

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-gray-200/[0.05] bg-grid" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative group"
              >
                <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 hover:border-purple-400 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  {/* Icon */}
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.gradient} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Number */}
                  <h3 className="text-4xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </h3>
                  
                  {/* Label */}
                  <p className="text-gray-600 text-sm font-medium">
                    {stat.label}
                  </p>
                  
                  {/* Subtitle */}
                  {stat.subtitle && (
                    <p className="text-purple-600 text-xs mt-2">
                      {stat.subtitle}
                    </p>
                  )}
                  
                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/20 to-purple-600/0 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-grid {
          background-size: 50px 50px;
        }
      `}</style>
    </section>
  )
}

export default StatsSection