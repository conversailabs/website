"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Phone, Calendar, CheckCircle } from 'lucide-react'
import ContactModal from '@/components/forms/ContactModal'

export default function CTASection() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  const benefits = [
    'No credit card required',
    '14-day free trial',
    'Setup in 5 minutes',
    'Cancel anytime'
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-black to-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Main CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-12 lg:p-20"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 text-center">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold !text-white mb-6">
                Ready to transform your business?
              </h2>
              <p className="text-xl sm:text-2xl !text-white/90 mb-8 max-w-3xl mx-auto">
                Join thousands of companies using ConversAI to deliver exceptional customer experiences at scale.
              </p>

              {/* Benefits */}
              <div className="flex flex-wrap gap-4 justify-center mb-10">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 !text-white/80" />
                    <span className="!text-white/90">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.open('https://dashboard.conversailabs.com/', '_blank')}
                  className="px-8 py-4 rounded-lg bg-white text-gray-900 font-semibold text-lg hover:bg-gray-100 transition-colors group"
                >
                  Start Free Trial
                  <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => setIsContactModalOpen(true)}
                  className="px-8 py-4 rounded-lg bg-white/10 backdrop-blur-sm !text-white font-semibold text-lg border-2 border-white/20 hover:bg-white/20 transition-colors"
                >
                  <Calendar className="inline-block mr-2 w-5 h-5" />
                  Schedule Demo
                </button>
              </div>
            </div>
          </motion.div>

          {/* Secondary CTAs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <Phone className="w-12 h-12 mx-auto mb-4 text-blue-400" />
              <h3 className="text-xl font-semibold !text-white mb-2">Talk to Sales</h3>
              <p className="text-gray-400 mb-4">Get a personalized demo and pricing for your business</p>
              <button 
                onClick={() => setIsContactModalOpen(true)}
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                Contact Sales →
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <span className="!text-white font-bold text-xl">AI</span>
              </div>
              <h3 className="text-xl font-semibold !text-white mb-2">Try Live Demo</h3>
              <p className="text-gray-400 mb-4">Experience our AI operator with a real phone call</p>
              <button 
                onClick={() => window.open('https://dashboard.conversailabs.com/', '_blank')}
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                Call Now →
              </button>
            </motion.div>
          </div>

        
        </div>
      </div>

      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </section>
  )
}