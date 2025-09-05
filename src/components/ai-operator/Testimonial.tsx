"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Quote } from 'lucide-react'

export default function Testimonial() {
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          >
            {/* Left side - Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-full"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl h-full min-h-[400px] lg:min-h-[450px]">
                <Image
                  src="/gen img.jpeg"
                  alt="Customer testimonial"
                  width={600}
                  height={450}
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
            </motion.div>

            {/* Right side - Quote */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative h-full"
            >
              {/* Quote box with stylish design */}
              <div className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 rounded-2xl p-8 lg:p-10 border border-gray-800 shadow-2xl h-full min-h-[400px] lg:min-h-[450px] flex flex-col justify-center">
                {/* Quote icon */}
                <div className="absolute -top-4 -left-2 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <Quote className="w-6 h-6 text-white rotate-180" />
                </div>
                
                {/* Quote text */}
                <blockquote className="relative z-10">
                  <p className="text-xl lg:text-2xl font-light !text-white leading-relaxed mb-6 italic">
                    <span className="text-3xl font-serif text-blue-400 mr-2">&ldquo;</span>
                    AI has completely transformed how we handle support. Our users get faster responses, and our team can actually focus on the problems that matter. I honestly couldn&apos;t imagine doubling in size without it.
                    <span className="text-3xl font-serif text-blue-400 ml-2">&rdquo;</span>
                  </p>
                  
                  {/* Attribution (optional - you can customize this) */}
                  <div className="flex items-center gap-4 mt-8">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                    <div>
                      <p className="font-semibold !text-white">Customer Success Leader</p>
                      <p className="text-sm text-gray-400">James Harrington</p>
                    </div>
                  </div>
                </blockquote>
                
                {/* Decorative dots */}
                <div className="absolute bottom-4 right-4 flex gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  <div className="w-2 h-2 bg-pink-500 rounded-full" />
                </div>
              </div>
              
              {/* Background decoration */}
              <div className="absolute -z-10 inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl rounded-2xl transform scale-110" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}