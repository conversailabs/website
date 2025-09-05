'use client'

import { motion } from 'framer-motion'
import { Sparkles, MousePointer, DollarSign, Heart } from 'lucide-react'

interface PromptBuilderDemoProps {
  onSwitchDemo?: () => void
  onSwitchToDebtCollection?: () => void
  onSwitchToDermaClinic?: () => void
}

export default function PromptBuilderDemo({ onSwitchDemo, onSwitchToDebtCollection, onSwitchToDermaClinic }: PromptBuilderDemoProps) {
  return (
    <section className="py-12 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium">See It In Action</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
            Build Your AI Agent in{' '}
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Just Minutes
            </span>
          </h2>
          
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Watch how easily you can create a professional voice agent using our intuitive prompt builder.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 items-center justify-between max-w-full mx-auto">
          {/* Left Stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:flex flex-col gap-4 flex-shrink-0"
          >
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">2-3</div>
              <div className="text-sm text-gray-600">Minutes Setup</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">100%</div>
              <div className="text-sm text-gray-600">No Coding</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600">24/7</div>
              <div className="text-sm text-gray-600">Available</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-3xl font-bold text-orange-600">500+</div>
              <div className="text-sm text-gray-600">Agents Created</div>
            </div>
          </motion.div>

          {/* Video Section (Center) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex-1 max-w-5xl"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 blur-3xl opacity-40" />
            
            <div className="relative">
              {/* Browser mockup frame */}
              <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-t-2xl p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="bg-gray-700 rounded-md px-4 py-1.5 flex items-center gap-2 text-sm text-gray-300">
                      <span>admin.conversailabs.com</span>
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
                  src="https://www.youtube.com/embed/lArWNymlnI4?rel=0&modestbranding=1"
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
            className="flex-shrink-0 space-y-4"
          >
            {/* Demo Switch Buttons */}
            <div className="flex flex-col items-start space-y-3">
              {(onSwitchDemo || onSwitchToDebtCollection) && (
                <button
                  onClick={onSwitchDemo || onSwitchToDebtCollection}
                  className="group w-60 px-4 py-3 rounded-xl border-2 border-gray-300 hover:border-green-400 hover:bg-green-50 transition-all duration-200"
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
              
              {onSwitchToDermaClinic && (
                <button
                  onClick={onSwitchToDermaClinic}
                  className="group w-60 px-4 py-3 rounded-xl border-2 border-gray-300 hover:border-pink-400 hover:bg-pink-50 transition-all duration-200"
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
            
            {/* Quick Features */}
            <div className="hidden lg:block space-y-3">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Builder Features</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    Upload call transcripts
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    Choose professional voice
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    Test instantly
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