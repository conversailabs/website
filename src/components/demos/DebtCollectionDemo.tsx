'use client'

import { motion } from 'framer-motion'
import { DollarSign, FileText, Heart, MousePointer } from 'lucide-react'

interface DebtCollectionDemoProps {
  onSwitchDemo?: () => void
  onSwitchToPromptBuilder?: () => void
  onSwitchToDermaClinic?: () => void
}

export default function DebtCollectionDemo({ onSwitchDemo, onSwitchToPromptBuilder, onSwitchToDermaClinic }: DebtCollectionDemoProps) {
  return (
    <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-4">
            <DollarSign className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium">Real-World Use Case</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
            See AI Handle{' '}
            <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              Debt Recovery Calls
            </span>
          </h2>
          
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Watch how our AI agent professionally handles sensitive debt collection conversations with empathy and compliance.
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
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">40%</div>
              <div className="text-sm text-gray-600">Higher Recovery</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">100%</div>
              <div className="text-sm text-gray-600">Compliant</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-3xl font-bold text-orange-600">70%</div>
              <div className="text-sm text-gray-600">Cost Reduction</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600">85%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
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
                      <span>agent.conversailabs.com/debt-recovery</span>
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
                  src="https://www.youtube.com/embed/JyC-FR46SYs?rel=0&modestbranding=1"
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
              {(onSwitchDemo || onSwitchToPromptBuilder) && (
                <button
                  onClick={onSwitchDemo || onSwitchToPromptBuilder}
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
              
              {onSwitchToDermaClinic && (
                <button
                  onClick={onSwitchToDermaClinic}
                  className="group w-full lg:w-60 px-4 py-3 rounded-xl border-2 border-gray-300 hover:border-pink-400 hover:bg-pink-50 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 group-hover:bg-pink-100 flex items-center justify-center transition-colors">
                      <Heart className="w-5 h-5 text-gray-600 group-hover:text-pink-600 transition-colors" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">Derma Clinic&nbsp;&nbsp;&nbsp;</div>
                      <div className="text-sm text-gray-600">View Demo</div>
                    </div>
                  </div>
                </button>
              )}
            </div>
            
            {/* Key Benefits */}
            <div className="hidden lg:block space-y-3">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Key Benefits</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    Empathetic approach
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    Payment negotiation
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    Auto documentation
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