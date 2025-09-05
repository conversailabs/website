'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Calendar, Clock, Users, CheckCircle, Phone, Video, MessageSquare } from 'lucide-react'

const benefits = [
  {
    icon: Users,
    title: 'Personalized for Your Industry',
    description: 'See exactly how ConversAI works for your specific business type and use cases'
  },
  {
    icon: Phone,
    title: 'Live AI Agent Demo',
    description: 'Watch a real AI agent handle calls and conversations in real-time'
  },
  {
    icon: MessageSquare,
    title: 'Custom Setup Walkthrough',
    description: 'Learn how to configure agents for your specific workflows and requirements'
  },
  {
    icon: CheckCircle,
    title: 'Q&A Session',
    description: 'Get immediate answers to your questions about features, pricing, and implementation'
  }
]

const demoIncludes = [
  'Live admin panel walkthrough',
  'Industry-specific agent examples',
  'Voice AI demonstration',
  'Integration capabilities review',
  'Pricing discussion for your needs',
  'Implementation timeline planning',
  'Q&A session',
  'Next steps consultation'
]

export default function ScheduleDemoPage() {
  useEffect(() => {
    // Load Cal.com embed script and initialize
    const script = document.createElement('script')
    script.src = 'https://app.cal.com/embed/embed.js'
    script.async = true
    
    script.onload = () => {
      // Initialize Cal.com embed after script loads
      if (window.Cal) {
        window.Cal('init', {
          origin: 'https://app.cal.com'
        })
      }
    }
    
    document.body.appendChild(script)

    return () => {
      // Cleanup script when component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Calendar className="w-4 h-4" />
                Live Demo Available
              </div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              See ConversAI Labs in Action
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              Book a personalized 30-minute demo to see how ConversAI Labs can transform 
              your customer conversations and boost your lead conversion rates.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-6 text-sm text-gray-600"
            >
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                30-minute session
              </div>
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-blue-600" />
                Via Zoom/Teams
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                No obligation
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              
              {/* Left Side - Benefits */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold mb-8">What You&apos;ll Experience</h2>
                
                <div className="space-y-6 mb-8">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4">Your Demo Will Include:</h3>
                  <div className="grid md:grid-cols-2 gap-2">
                    {demoIncludes.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Right Side - Cal.com Embed */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
              >
                <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <h3 className="text-xl font-semibold mb-2">Schedule Your Demo</h3>
                  <p className="text-blue-100">Pick a time that works for you</p>
                </div>
                
                <div className="p-6">
                  {/* Cal.com Embed */}
                  <div className="min-h-[600px]">
                    <iframe
                      src={`https://app.cal.com/${process.env.NEXT_PUBLIC_CAL_LINK || "demo-not-configured"}?embed=true&theme=light`}
                      width="100%"
                      height="600"
                      frameBorder="0"
                      title="Schedule a demo"
                      className="rounded-lg"
                    ></iframe>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Demo FAQ</h2>
              <p className="text-xl text-gray-600">Common questions about our demo sessions</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-lg p-6 shadow-sm"
              >
                <h3 className="font-semibold mb-2">How long is the demo?</h3>
                <p className="text-gray-600 text-sm">
                  30 minutes - enough time for a comprehensive walkthrough and Q&A, 
                  but respect for your busy schedule.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-lg p-6 shadow-sm"
              >
                <h3 className="font-semibold mb-2">Is this a sales call?</h3>
                <p className="text-gray-600 text-sm">
                  It&apos;s primarily educational. We&apos;ll show you the platform and answer 
                  questions. No pressure, no obligation.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-lg p-6 shadow-sm"
              >
                <h3 className="font-semibold mb-2">Who will conduct the demo?</h3>
                <p className="text-gray-600 text-sm">
                  A product specialist who understands your industry and can 
                  customize the demo to your specific needs.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-lg p-6 shadow-sm"
              >
                <h3 className="font-semibold mb-2">Can I bring my team?</h3>
                <p className="text-gray-600 text-sm">
                  Absolutely! We encourage decision-makers and technical team 
                  members to join for a more comprehensive discussion.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold mb-4"
            >
              Still Have Questions?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl opacity-90 mb-8"
            >
              Prefer to chat first? We&apos;re here to help however works best for you.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="mailto:connect@conversailabs.com"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Email Us
              </a>
              <a
                href="https://wa.me/918076018082"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                WhatsApp Chat
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}