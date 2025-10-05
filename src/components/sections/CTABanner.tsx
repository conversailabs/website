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
  blue: 'from-blue-100 to-blue-200',
  green: 'from-green-100 to-green-200',
  purple: 'from-purple-100 to-purple-200',
  orange: 'from-orange-100 to-orange-200',
  red: 'from-red-600 to-red-800',
  '#FFB380': 'from-orange-50 to-orange-100',
  '#10B981': 'from-emerald-50 to-emerald-100',
  '#34656D': 'from-teal-50 to-teal-100',
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
      <section className="py-6 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass}`} />

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />


        <div className="relative max-w-4xl mx-auto text-center text-black">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-2"
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
            className="text-2xl md:text-3xl font-bold mb-2 leading-tight tracking-tight"
          >
            Ready to Transform Your {industry} Operations?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-base text-black/70 mb-3 max-w-xl mx-auto leading-relaxed"
          >
            Join thousands of {industry.toLowerCase()} companies that have already revolutionized their operations with our cutting-edge solutions.
          </motion.p>

          {/* Benefits list */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4 max-w-4xl mx-auto"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + (index * 0.1) }}
                viewport={{ once: true }}
                className="flex items-center text-left bg-white/20 p-2 rounded-lg backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all duration-200"
              >
                <CheckCircle className="w-4 h-4 mr-2 text-green-600 flex-shrink-0" />
                <span className="text-black/80 text-xs font-medium">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col gap-1.5 justify-center items-center"
          >
            <Button
              size="lg"
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-gray-900 cursor-pointer hover:bg-gray-50 px-5 py-2.5 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-gray-300"
            >
              Get Started Now
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>

            <div className="text-black/60 text-xs">
              No credit card required • Setup in minutes
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