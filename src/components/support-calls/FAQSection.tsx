"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "How quickly can I get Alex up and running?",
      answer: "Most businesses are live within 30 minutes. Simply upload your knowledge base, customize Alex's personality, and connect your phone number. Our onboarding team will guide you through each step to ensure a smooth launch."
    },
    {
      question: "What languages does Alex support?",
      answer: "Alex supports over 95 languages with native fluency. The AI automatically detects the customer's language and responds accordingly. You can also set preferred languages and customize responses for different regions."
    },
    {
      question: "How does Alex handle complex or emotional situations?",
      answer: "Alex is trained to recognize emotional cues and respond with empathy. For complex issues or escalated situations, Alex seamlessly transfers calls to human agents while providing full context of the conversation."
    },
    {
      question: "Can I customize Alex's voice and personality?",
      answer: "Absolutely! Choose from dozens of natural-sounding voices or clone your own. Customize tone, speaking speed, and personality traits to match your brand. You can even create different personas for different types of calls."
    },
    {
      question: "What happens if Alex doesn't know an answer?",
      answer: "Alex will never make up information. If unsure, Alex will either ask clarifying questions, offer to find the information, or seamlessly transfer to a human agent. You can configure fallback responses for different scenarios."
    },
    {
      question: "How secure is my customer data?",
      answer: "We're SOC 2 Type II compliant with end-to-end encryption for all data. Customer information is never used to train our models. We support GDPR, CCPA, and HIPAA compliance requirements."
    },
    {
      question: "Can Alex integrate with my existing phone system?",
      answer: "Yes! Alex works with any phone system including VoIP, traditional landlines, and cloud-based systems. We support direct integration with popular providers like Twilio, RingCentral, and 8x8."
    },
    {
      question: "What's included in the free trial?",
      answer: "The 14-day free trial includes full access to all features, 100 free calls, complete customization options, and dedicated onboarding support. No credit card required to start."
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-black to-purple-900/20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-400">
              Everything you need to know about Alex
            </p>
          </motion.div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="bg-gradient-to-br from-purple-900/20 to-black/50 backdrop-blur-xl rounded-xl border border-purple-500/20 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-purple-900/10 transition-colors"
                >
                  <h3 className="text-lg font-medium text-white pr-4">{faq.question}</h3>
                  <ChevronDown 
                    className={`w-5 h-5 text-purple-400 flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-5">
                        <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Contact Support */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <p className="text-gray-400 mb-4">Still have questions?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.open('/schedule-demo', '_self')}
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                Schedule a demo →
              </button>
              <span className="text-gray-600 hidden sm:inline">•</span>
              <button 
                onClick={() => window.open('mailto:support@conversai.com', '_blank')}
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                Email support →
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default FAQSection