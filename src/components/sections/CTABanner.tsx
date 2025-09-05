'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight,CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ContactModal from '../forms/ContactModal';

interface CTABannerProps {
  industry: string;
  color: string;
}

const colorMap = {
  blue: 'from-blue-600 to-blue-800',
  green: 'from-green-600 to-green-800',
  purple: 'from-purple-600 to-purple-800',
  orange: 'from-orange-600 to-orange-800',
  red: 'from-red-600 to-red-800',
};

export function CTABanner({ industry, color }: CTABannerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const gradientClass = colorMap[color as keyof typeof colorMap] || colorMap.blue;

  const benefits = [
    'Free consultation with industry experts',
    'Custom solution tailored to your needs',
    'Implementation support included',
    '30-day money-back guarantee'
  ];

  return (
    <>
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass}`} />
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-10 right-10 w-32 h-32 rounded-full bg-white/10"
          />
          <motion.div
            animate={{
              rotate: -360,
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-10 left-10 w-24 h-24 rounded-full bg-white/10"
          />
          <motion.div
            animate={{
              y: [-20, 20, -20],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-white/5"
          />
        </div>

        <div className="relative max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            {/* <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4 mr-2" />
              Limited Time Offer
            </div> */}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
          >
            Ready to Transform Your {industry} Operations?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
          >
            Join thousands of {industry.toLowerCase()} companies that have already revolutionized their operations with our cutting-edge solutions.
          </motion.p>

          {/* Benefits list */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 max-w-2xl mx-auto"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + (index * 0.1) }}
                viewport={{ once: true }}
                className="flex items-center text-left"
              >
                <CheckCircle className="w-5 h-5 mr-3 text-green-300 flex-shrink-0" />
                <span className="text-white/90">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
         
            <Button
              size="lg"
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-gray-900 cursor-pointer hover:bg-gray-100 px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-200 "
            >
              Contact Us
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
        
            
            <div className="text-white/80 text-sm">
              No credit card required • Setup in minutes
            </div>
          </motion.div>

          {/* Urgency indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20"
          >
            <div className="text-lg font-semibold mb-2">🚀 Early Adopter Bonus</div>
            <div className="text-white/90">
             Advanced features included in your plan forever
            </div>
          </motion.div>
        </div>
      </section>

      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        industry={industry}
      />
    </>
  );
}