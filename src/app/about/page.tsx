'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/layout/Header'
import { Button } from '@/components/ui/button'
import { ExternalLink, Users, Target, Lightbulb, Heart } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              About ConversAI Labs
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              Democratizing AI-powered conversations for businesses of all sizes. 
              We believe every business should have access to intelligent, human-like AI agents.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-gray-600 leading-relaxed">
                  To make advanced AI conversation technology accessible to every business, 
                  regardless of size or technical expertise. We&apos;re building the no-code platform 
                  that empowers businesses to create intelligent AI agents that understand, 
                  engage, and convert customers 24/7.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mb-6">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                <p className="text-gray-600 leading-relaxed">
                  A world where every customer interaction is meaningful, timely, and personalized. 
                  We envision AI agents that don&apos;t just respond—they understand context, 
                  build relationships, and drive real business results across voice, text, 
                  and multimedia channels.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Meet Our Founder</h2>
              <p className="text-xl text-gray-600">
                Built by entrepreneurs, for entrepreneurs
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">SG</span>
                  </div>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-2">Shashwat Gupta</h3>
                  <p className="text-blue-600 font-semibold mb-4">Founder & CEO</p>
                  
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Shashwat is a seasoned entrepreneur and technologist with a passion for making 
                    AI accessible to businesses everywhere. With a background in building scalable 
                    technology solutions, he founded ConversAI Labs to bridge the gap between 
                    advanced AI capabilities and practical business applications.
                  </p>
                  
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Having experienced firsthand the challenges of customer engagement and lead 
                    qualification in growing businesses, Shashwat envisioned a platform where 
                    any business could deploy intelligent AI agents without needing a team of 
                    developers or data scientists.
                  </p>
                  
                  <Button
                    variant="outline"
                    onClick={() => window.open('https://www.linkedin.com/in/shashwatg/', '_blank')}
                    className="flex items-center gap-2"
                  >
                    Connect on LinkedIn
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The principles that guide everything we do at ConversAI Labs
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Customer-First</h3>
                <p className="text-gray-600">
                  Every feature we build starts with understanding our customers&apos; real needs 
                  and challenges. Your success is our success.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Innovation</h3>
                <p className="text-gray-600">
                  We&apos;re constantly pushing the boundaries of what&apos;s possible with AI, 
                  making complex technology simple and accessible.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-pink-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Transparency</h3>
                <p className="text-gray-600">
                  We believe in honest communication, clear pricing, and building 
                  trust through transparency in everything we do.
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
              Join Us on This Journey
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl opacity-90 mb-8 max-w-3xl mx-auto"
            >
              Whether you&apos;re a startup looking to scale customer interactions or an enterprise 
              seeking to automate complex processes, we&apos;re here to help you succeed.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button 
                size="lg"
                onClick={() => window.open('https://dashboard.conversailabs.com/', '_blank')}
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                Start Building Today
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-blue-600"
                onClick={() => window.open('/contact', '_self')}
              >
                Get in Touch
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}