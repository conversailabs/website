"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Minus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FAQOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const faqs = [
  {
    question: 'How quickly can I get started with ConversAI?',
    answer: 'You can get started in minutes! Simply sign up, upload your conversation script or choose from our templates, select a voice, and your AI agent is ready to make calls. No technical setup required.'
  },
  {
    question: 'What integrations does ConversAI support?',
    answer: 'ConversAI integrates seamlessly with popular CRM platforms like Salesforce, HubSpot, and Zoho, as well as communication tools including Slack, WhatsApp, and email. We also offer API access for custom integrations.'
  },
  {
    question: 'How does pricing work?',
    answer: 'We offer flexible pricing based on call volume and features. Plans start with a free trial, followed by pay-as-you-go or monthly subscription options. Contact our sales team for custom enterprise pricing tailored to your needs.'
  },
  {
    question: 'Is ConversAI secure and compliant?',
    answer: 'Yes, we take security seriously. ConversAI is SOC 2 compliant, uses end-to-end encryption, and follows GDPR and other data protection regulations. All call data is securely stored and never shared with third parties.'
  },
  {
    question: 'Can I customize the AI agents?',
    answer: 'Absolutely! You have full control over conversation flows, agent personality, response styles, escalation rules, and more. Our no-code admin panel makes customization easy, and our team can help with advanced configurations.'
  },
  {
    question: 'What languages and accents are supported?',
    answer: 'Our AI agents support 50+ languages and multiple accents including American, British, Australian English, and regional accents for other languages. The AI automatically detects customer language preferences and responds accordingly.'
  }
];

const FAQOverlay: React.FC<FAQOverlayProps> = ({ isOpen, onClose }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    // Handle escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] overflow-hidden"
        >
          {/* Glassmorphic Background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gray-900/10 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Content Container */}
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative h-full flex flex-col"
            onClick={() => {
              onClose();
            }}
          >
            {/* Header */}
            <div className="relative z-10 p-6" onClick={(e) => e.stopPropagation()}>
              <div className="glassmorphic-overlay-header max-w-4xl mx-auto rounded-2xl p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-gray-600 max-w-2xl">
                    Get answers to common questions about ConversAI
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="glassmorphic-close-button p-3 rounded-full transition-all hover:scale-105"
                  aria-label="Close FAQ overlay"
                >
                  <X className="w-6 h-6 text-gray-700" />
                </button>
              </div>
            </div>

            {/* FAQ Content */}
            <div className="flex-1 overflow-y-auto px-6 pb-6">
              <div className="max-w-4xl mx-auto space-y-4" onClick={(e) => e.stopPropagation()}>
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className={cn(
                      "glassmorphic-faq-card rounded-2xl overflow-hidden transition-all duration-300",
                      openIndex === index ? "shadow-xl" : "shadow-sm"
                    )}
                  >
                    <button
                      onClick={() => setOpenIndex(openIndex === index ? null : index)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/30 transition-colors"
                    >
                      <h3 className="text-base md:text-lg font-semibold text-gray-900 pr-4">
                        {faq.question}
                      </h3>
                      <motion.div
                        initial={false}
                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {openIndex === index ? (
                          <Minus className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        ) : (
                          <Plus className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        )}
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {openIndex === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-6 pb-5"
                        >
                          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <style jsx global>{`
            .glassmorphic-faq-card {
              background: linear-gradient(135deg,
                rgba(255, 255, 255, 0.95) 0%,
                rgba(255, 255, 255, 0.9) 100%);
              backdrop-filter: blur(20px) saturate(150%);
              -webkit-backdrop-filter: blur(20px) saturate(150%);
              border: 1px solid rgba(255, 255, 255, 0.3);
              box-shadow:
                0 4px 16px rgba(0, 0, 0, 0.06),
                inset 0 1px 1px rgba(255, 255, 255, 0.5);
            }

            .glassmorphic-faq-card:hover {
              box-shadow:
                0 8px 24px rgba(0, 0, 0, 0.1),
                inset 0 1px 1px rgba(255, 255, 255, 0.6);
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FAQOverlay;
