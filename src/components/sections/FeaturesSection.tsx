'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import ContactModal from '@/components/forms/ContactModal';

interface FeaturesSectionProps {
  industry: string;
  features: string[];
  color: string;
}

const cardImages = ['/card1.jpg', '/card2.webp', '/education1.jpg', '/education3.jpg'];

const featureDescriptions = [
  'Enterprise-grade security measures to protect your sensitive data and ensure compliance with industry standards.',
  'Powerful analytics and reporting tools to gain actionable insights and make data-driven decisions.',
  'Easy integration with your existing systems and workflows to maximize efficiency and productivity.',
];

type FeatureCardProps = {
  feature: {
    title: string;
    description: string;
    image: string;
    features: string[];
  };
  onContactClick: () => void;
};

const FeatureCard = ({ feature, onContactClick }: FeatureCardProps) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={{
        scale: isHovered ? 1.05 : 1,
        z: isHovered ? 50 : 0,
      }}
      transition={{
        scale: isHovered
          ? { type: "spring", stiffness: 300, damping: 20 }
          : { duration: 0.1 },
        z: isHovered
          ? { type: "spring", stiffness: 300, damping: 20 }
          : { duration: 0.1 }
      }}
      className="group relative h-full flex flex-col bg-gray-50/80 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-100 overflow-hidden border border-gray-200/50 p-5"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Top Content - Title and Description */}
      <div className="mb-4 text-center flex-shrink-0">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 min-h-[3.5rem] flex items-center justify-center">
          {feature.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed min-h-[4rem]">{feature.description}</p>
      </div>

      {/* Image Container with Features */}
      <div className="relative rounded-2xl overflow-hidden mb-4 flex-grow">
        <div className="aspect-[4/3] w-full relative">
          <Image
            src={feature.image}
            alt={feature.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Feature List Overlay */}
        <div className="absolute bottom-2 left-2 right-2 space-y-1.5">
          {feature.features.map((feat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6 + idx * 0.1 }}
              className="flex items-center space-x-0.5 bg-white backdrop-blur-md border border-gray-200 rounded-full px-1.5 py-0.5 shadow-md w-fit max-w-[90%]"
            >
              <div className="flex-shrink-0 w-4 h-4 bg-gray-900 rounded-full flex items-center justify-center">
                <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
              </div>
              <span className="text-gray-900 text-[10px] font-medium">{feat}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Button */}
      <div className="flex-shrink-0">
        <Button
          variant="outline"
          onClick={onContactClick}
          className="w-full bg-blue-600 text-white border-0 hover:bg-blue-700 transition-all duration-300 py-4 text-sm font-semibold rounded-xl shadow-sm"
        >
          Contact Sales
        </Button>
      </div>
    </motion.div>
  );
};

export function FeaturesSection({ industry, features }: FeaturesSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const allFeatures = [
    {
      title: features[0] || 'Security First',
      description: featureDescriptions[0],
      image: cardImages[0],
      features: features.slice(0, 3),
    },
    {
      title: features[1] || 'Advanced Analytics',
      description: featureDescriptions[1],
      image: cardImages[1],
      features: features.slice(3, 6),
    },
    {
      title: features[2] || 'Seamless Integration',
      description: featureDescriptions[2],
      image: cardImages[2],
      features: features.slice(0, 3),
    },
    {
      title: 'Build Your Custom Agent',
      description: 'Create AI agents tailored to your unique business needs.',
      image: cardImages[3],
      features: [
        'No-code drag & drop builder',
        'Custom workflows & logic',
        'Personalized brand experience'
      ],
    },
  ];

  return (
    <>
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAFBFC]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Specialized Features for{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {industry}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive suite of tools and features designed specifically for the {industry.toLowerCase()} industry.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
          {allFeatures.map((feature, index) => (
            <FeatureCard key={index} feature={feature} onContactClick={() => setIsModalOpen(true)} />
          ))}
        </div>
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