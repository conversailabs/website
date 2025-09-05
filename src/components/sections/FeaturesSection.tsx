'use client';

import { motion } from 'framer-motion';
import { Shield, Zap, Target, Users, BarChart3, Settings } from 'lucide-react';

interface FeaturesSectionProps {
  industry: string;
  features: string[];
  color: string;
}

const iconMap = {
  'HIPAA Compliance': Shield,
  'Patient Data Analytics': BarChart3,
  'Telemedicine Integration': Users,
  'Risk Management': Shield,
  'Fraud Detection': Target,
  'Regulatory Compliance': Settings,
  'Learning Management': Users,
  'Student Analytics': BarChart3,
  'Virtual Classrooms': Zap,
  'Inventory Management': Settings,
  'Customer Analytics': BarChart3,
  'E-commerce Integration': Zap,
  'Process Automation': Settings,
  'Quality Control': Target,
  'Supply Chain Optimization': BarChart3,
  'Custom Solutions': Settings,
  'Industry Expertise': Users,
  'Scalable Technology': Zap,
};

const colorMap = {
  blue: 'text-blue-600 bg-blue-100',
  green: 'text-green-600 bg-green-100',
  purple: 'text-purple-600 bg-purple-100',
  orange: 'text-orange-600 bg-orange-100',
  red: 'text-red-600 bg-red-100',
};

export function FeaturesSection({ industry, features, color }: FeaturesSectionProps) {
  const colorClass = colorMap[color as keyof typeof colorMap] || colorMap.blue;

  const allFeatures = [
    {
      icon: iconMap[features[0] as keyof typeof iconMap] || Shield,
      title: features[0] || 'Security First',
      description: 'Enterprise-grade security measures to protect your sensitive data and ensure compliance with industry standards.',
    },
    {
      icon: iconMap[features[1] as keyof typeof iconMap] || BarChart3,
      title: features[1] || 'Advanced Analytics',
      description: 'Powerful analytics and reporting tools to gain actionable insights and make data-driven decisions.',
    },
    {
      icon: iconMap[features[2] as keyof typeof iconMap] || Zap,
      title: features[2] || 'Seamless Integration',
      description: 'Easy integration with your existing systems and workflows to maximize efficiency and productivity.',
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Specialized Features for{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {industry}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive suite of tools and features designed specifically for the {industry.toLowerCase()} industry.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {allFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${colorClass} mb-6`}
                >
                  <Icon className="w-8 h-8" />
                </motion.div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
                  viewport={{ once: true }}
                  className="mt-6 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform origin-left"
                />
              </motion.div>
            );
          })}
        </div>

        {/* Additional capabilities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              And Much More...
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Our platform offers dozens of additional features tailored specifically for your industry needs, 
              from advanced automation to comprehensive reporting.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                'API Integration',
                'Custom Workflows',
                'Real-time Monitoring',
                'Multi-tenant Support',
                'Advanced Security',
                'Mobile Apps'
              ].map((capability, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 + (index * 0.1) }}
                  viewport={{ once: true }}
                  className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm"
                >
                  {capability}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}