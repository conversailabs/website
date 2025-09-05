"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

type FAQ = {
  question: string;
  answer: string;
};

const colorVariants = {
  blue: { 
    bg: 'bg-blue-50', 
    text: 'text-blue-900', 
    accent: 'text-blue-600',
    border: 'border-blue-200',
    hover: 'hover:bg-blue-100'
  },
  purple: { 
    bg: 'bg-purple-50', 
    text: 'text-purple-900', 
    accent: 'text-purple-600',
    border: 'border-purple-200',
    hover: 'hover:bg-purple-100'
  },
  green: { 
    bg: 'bg-green-50', 
    text: 'text-green-900', 
    accent: 'text-green-600',
    border: 'border-green-200',
    hover: 'hover:bg-green-100'
  },
  indigo: { 
    bg: 'bg-indigo-50', 
    text: 'text-indigo-900', 
    accent: 'text-indigo-600',
    border: 'border-indigo-200',
    hover: 'hover:bg-indigo-100'
  },
  orange: { 
    bg: 'bg-orange-50', 
    text: 'text-orange-900', 
    accent: 'text-orange-600',
    border: 'border-orange-200',
    hover: 'hover:bg-orange-100'
  },
  default: { 
    bg: 'bg-gray-50', 
    text: 'text-gray-900', 
    accent: 'text-gray-600',
    border: 'border-gray-200',
    hover: 'hover:bg-gray-100'
  }
};

type FAQSectionProps = {
  industry: string;
  faqs: FAQ[];
  color?: keyof typeof colorVariants;
};

const FAQSection: React.FC<FAQSectionProps> = ({
  industry,
  faqs,
  color = 'blue'
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const selectedColors = colorVariants[color] || colorVariants.default;

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            <HelpCircle className={`w-10 h-10 ${selectedColors.accent}`} />
            <h2 className={`text-3xl font-bold ${selectedColors.text}`}>
              Frequently Asked Questions
            </h2>
          </div>
          <p className={`text-lg ${selectedColors.text} opacity-70`}>
            Got questions about {industry} AI solutions? We&apos;ve got answers.
          </p>
        </div>

        <div className="space-y-4">
          <AnimatePresence>
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div 
                  className={`
                    border rounded-xl overflow-hidden
                    ${selectedColors.border}
                    ${selectedColors.bg}
                    shadow-sm
                  `}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className={`
                      w-full flex justify-between items-center p-6 text-left
                      transition-colors duration-300
                      ${selectedColors.hover}
                      focus:outline-none
                    `}
                  >
                    <span className={`text-lg font-semibold ${selectedColors.text}`}>
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ 
                        rotate: openIndex === index ? 180 : 0 
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown 
                        className={`w-6 h-6 ${selectedColors.accent}`} 
                      />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ 
                          opacity: 1, 
                          height: 'auto',
                          transition: { 
                            duration: 0.3,
                            height: { duration: 0.3 }
                          }
                        }}
                        exit={{ 
                          opacity: 0, 
                          height: 0,
                          transition: { 
                            duration: 0.3,
                            height: { duration: 0.3 }
                          }
                        }}
                        className={`
                          px-6 pb-6 
                          ${selectedColors.text} 
                          opacity-80
                        `}
                      >
                        <p>{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;