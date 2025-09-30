'use client'

import { motion } from 'framer-motion'
import { Heart, FileText, DollarSign, MousePointer } from 'lucide-react'

interface DermaClinicDemoProps {
  onSwitchToPromptBuilder?: () => void
  onSwitchToDebtCollection?: () => void
}

export default function DermaClinicDemo({ onSwitchToPromptBuilder, onSwitchToDebtCollection }: DermaClinicDemoProps) {
  return (
    <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 px-4 py-2 rounded-full mb-4">
            <Heart className="w-4 h-4 text-pink-600" />
            <span className="text-sm font-medium">Healthcare Use Case</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
            AI Assistant for{' '}
            <span className="bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent">
              Dermatology Clinics
            </span>
          </h2>
          
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            See how our AI agent handles appointment scheduling, patient inquiries, and follow-ups for dermatology clinics.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 items-center justify-between max-w-7xl mx-auto mb-12">
          {/* Left Stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:flex flex-col gap-4 flex-shrink-0"
          >
            <div className="text-center p-4 bg-pink-50 rounded-lg">
              <div className="text-3xl font-bold text-pink-600">95%</div>
              <div className="text-sm text-gray-600">Booking Rate</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600">24/7</div>
              <div className="text-sm text-gray-600">Patient Support</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">3min</div>
              <div className="text-sm text-gray-600">Avg Call Time</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">1000+</div>
              <div className="text-sm text-gray-600">Appointments/mo</div>
            </div>
          </motion.div>

          {/* Video Section (Center) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex-1 max-w-2xl"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 blur-3xl opacity-40" />
            
            <div className="relative">
              {/* Browser mockup frame */}
              <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-t-2xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="bg-gray-700 rounded-md px-4 py-1.5 flex items-center gap-2 text-sm text-gray-300">
                      <span>agent.conversailabs.com/derma-clinic</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <MousePointer className="w-4 h-4" />
                    <span>Live Demo</span>
                  </div>
                </div>
              </div>
              
              {/* Video container */}
              <div className="bg-black rounded-b-2xl overflow-hidden">
                <iframe
                  src="https://www.youtube.com/embed/45wr1jqiWwc?rel=0&modestbranding=1"
                  className="w-full h-[400px] md:h-[500px]"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.div>

          {/* Right Side Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex-shrink-0 space-y-4 w-full lg:w-auto"
          >
            {/* Demo Switch Buttons */}
            <div className="flex flex-col items-start space-y-3">
              {onSwitchToPromptBuilder && (
                <button
                  onClick={onSwitchToPromptBuilder}
                  className="group w-full lg:w-60 px-4 py-3 rounded-xl border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                      <FileText className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">Prompt Builder</div>
                      <div className="text-sm text-gray-600">View Demo</div>
                    </div>
                  </div>
                </button>
              )}
              
              {onSwitchToDebtCollection && (
                <button
                  onClick={onSwitchToDebtCollection}
                  className="group w-full lg:w-60 px-4 py-3 rounded-xl border-2 border-gray-300 hover:border-green-400 hover:bg-green-50 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 group-hover:bg-green-100 flex items-center justify-center transition-colors">
                      <DollarSign className="w-5 h-5 text-gray-600 group-hover:text-green-600 transition-colors" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">Debt Collection</div>
                      <div className="text-sm text-gray-600">View Demo</div>
                    </div>
                  </div>
                </button>
              )}
            </div>
            
            {/* Key Features */}
            <div className="hidden lg:block space-y-3">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Key Features</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                    Smart appointment booking
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                    Treatment inquiries
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                    HIPAA compliant
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}