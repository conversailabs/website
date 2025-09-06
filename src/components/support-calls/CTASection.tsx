"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Phone, ArrowRight, CheckCircle, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

const CTASection = () => {
  const benefits = [
    "14-day free trial",
    "No credit card required",
    "Setup in 30 minutes",
    "Cancel anytime"
  ]

  return (
    <section className="py-32 bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="bg-gradient-to-br from-white/10 to-purple-900/20 backdrop-blur-xl rounded-3xl p-10 md:p-16 border border-purple-400/20 shadow-2xl text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <motion.div 
              className="inline-flex items-center gap-2 bg-purple-900/50 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-purple-500/30"
              whileHover={{ scale: 1.05 }}
            >
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-purple-200 text-sm font-medium">Trusted by 2,179+ businesses</span>
            </motion.div>

            {/* Main Headline */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Ready to transform your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                customer support?
              </span>
            </h2>

            {/* Subheadline */}
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses using Alex to deliver exceptional support experiences. 
              Start your free trial today and see results within hours.
            </p>

            {/* Benefits List */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                onClick={() => window.open('/schedule-demo', '_self')}
              >
                <Phone className="w-5 h-5 mr-2" />
                Start Free Trial
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-400/50 text-black hover:text-purple-200 px-8 py-6 text-lg rounded-full bg-white/90 hover:bg-purple-900/30 transition-all duration-300"
                onClick={() => window.open('/schedule-demo', '_self')}
              >
                Schedule a Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6 border-t border-purple-500/20">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
                <span className="ml-2 text-purple-200 font-medium">4.9/5 rating</span>
              </div>
              <span className="text-gray-500 hidden sm:inline">•</span>
              <span className="text-purple-200">2,100+ stores using Alex</span>
              <span className="text-gray-500 hidden sm:inline">•</span>
              <span className="text-purple-200">73% call resolution rate</span>
            </div>

            {/* Urgency Message */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <p className="text-purple-300 text-sm">
                🎉 Limited time offer: Get 20% off annual plans when you sign up this month
              </p>
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
      `}</style>
    </section>
  )
}

export default CTASection