'use client';

import { motion } from 'framer-motion';
import { ArrowRight} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  industry: string;
  description: string;
  color: string;
}

const colorMap = {
  blue: 'from-blue-600 to-blue-800',
  green: 'from-green-600 to-green-800',
  purple: 'from-purple-600 to-purple-800',
  orange: 'from-orange-600 to-orange-800',
  red: 'from-red-600 to-red-800',
};

export function HeroSection({ industry, description, color }: HeroSectionProps) {
  const gradientClass = colorMap[color as keyof typeof colorMap] || colorMap.blue;

  return (
    <section className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
      {/* Background with gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-5`} />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20"
        />
        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-green-400/20 to-blue-400/20"
        />
      </div>

      <div className="relative max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          {/* <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4 mr-2" />
            Industry Solutions
          </div> */}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
        >
          AI Agents Built for{' '}
          <span className={`bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent`}>
            {industry}
          </span>{' '}
          Success
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button 
            size="lg"
            onClick={() => window.open('https://dashboard.conversailabs.com/', '_blank')}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Try {industry} Agent Template
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => window.open('https://dashboard.conversailabs.com/', '_blank')}
            className="px-8 py-3 rounded-full font-semibold border-2 hover:bg-gray-50"
          >
            Build Custom Agent
          </Button>
        </motion.div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 pt-16 border-t border-gray-200"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { number: '85%', label: 'Lead Qualification Rate' },
              { number: '<10min', label: 'Agent Setup Time' },
              { number: '24/7', label: 'AI Availability' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + (index * 0.1) }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}