"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Phone, Users, FileText, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface FeaturesOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeaturesOverlay: React.FC<FeaturesOverlayProps> = ({ isOpen, onClose }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [, setCount] = useState(0);

  const features = [
    {
      icon: Phone,
      title: "Voice Conversations",
      shortDescription: "Natural AI phone calls that handle leads like your best sales rep",
      points: [
        "Handles inbound/outbound calls naturally",
        "6+ languages with perfect accents",
        "Real-time call transcription"
      ],
      gradient: "from-blue-500/10 to-cyan-500/10"
    },
    {
      icon: Users,
      title: "Lead Intelligence",
      shortDescription: "Voice-powered insights that score and qualify leads instantly",
      points: [
        "Voice tone & pattern analysis",
        "Automatic lead scoring",
        "Natural data extraction"
      ],
      gradient: "from-green-500/10 to-emerald-500/10"
    },
    {
      icon: FileText,
      title: "Analytics & CRM",
      shortDescription: "Complete call insights with automatic CRM integration",
      points: [
        "AI-generated call summaries",
        "Automatic CRM updates",
        "Searchable call recordings"
      ],
      gradient: "from-orange-500/10 to-red-500/10"
    }
  ];

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

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

  const scrollTo = useCallback((index: number) => {
    api?.scrollTo(index);
  }, [api]);

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

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
            onClick={(e) => {
              console.log("Content container clicked", e.target);
              onClose();
            }}
          >
            {/* Header */}
            <div className="relative z-10 p-6" onClick={(e) => e.stopPropagation()}>
              <div className="glassmorphic-overlay-header max-w-7xl mx-auto rounded-2xl p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Powerful Features
                  </h2>
                  <p className="text-gray-600 max-w-2xl">
                    Voice-first AI technology that transforms conversations into qualified leads
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="glassmorphic-close-button p-3 rounded-full transition-all hover:scale-105"
                  aria-label="Close features overlay"
                >
                  <X className="w-6 h-6 text-gray-700" />
                </button>
              </div>
            </div>

            {/* Carousel Container */}
            <div className="flex-1 flex items-center justify-center px-6 pb-6">
              <div className="relative max-w-7xl w-full mx-auto" onClick={(e) => e.stopPropagation()}>
                <Carousel
                  setApi={setApi}
                  className="w-full"
                  opts={{
                    align: "center",
                    loop: true,
                    skipSnaps: false,
                    inViewThreshold: 0.7,
                  }}
                >
                  <CarouselContent className="-ml-4">
                    {features.map((feature, index) => (
                      <CarouselItem
                        key={index}
                        className="pl-4 basis-full md:basis-2/3 lg:basis-1/2"
                      >
                        <motion.div
                          className="p-1 cursor-pointer h-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            scrollTo(index);
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div
                            className={cn(
                              "glassmorphic-feature-card relative h-full rounded-2xl p-8 transition-all duration-500",
                              current === index
                                ? "scale-105 shadow-2xl"
                                : "scale-95 opacity-80 hover:opacity-90"
                            )}
                          >
                            {/* Gradient Background */}
                            <div className={cn(
                              "absolute inset-0 rounded-2xl bg-gradient-to-br opacity-30",
                              feature.gradient
                            )} />

                            {/* Icon */}
                            <div className="relative flex justify-center mb-6">
                              <div className={cn(
                                "w-16 h-16 rounded-2xl flex items-center justify-center glassmorphic-icon",
                                "bg-gradient-to-br", feature.gradient
                              )}>
                                <feature.icon className="w-8 h-8 text-gray-700" />
                              </div>
                            </div>

                            {/* Content */}
                            <div className="relative">
                              <h3 className="text-xl font-bold text-center mb-3 text-gray-900">
                                {feature.title}
                              </h3>
                              <p className="text-sm text-center mb-6 text-gray-600">
                                {feature.shortDescription}
                              </p>

                              {/* Points */}
                              <div className="space-y-3">
                                {feature.points.map((point, pointIndex) => (
                                  <div key={pointIndex} className="flex items-start">
                                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 mt-1.5 mr-3 flex-shrink-0" />
                                    <span className="text-sm text-gray-700">{point}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Active Indicator */}
                            {current === index && (
                              <motion.div
                                layoutId="activeIndicator"
                                className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500/50 to-cyan-500/50 rounded-b-2xl"
                              />
                            )}
                          </div>
                        </motion.div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>

                {/* Navigation Buttons */}
                <Button
                  variant="outline"
                  size="icon"
                  className="glassmorphic-nav-button absolute -left-6 top-1/2 -translate-y-1/2 z-10 hidden lg:flex w-14 h-14"
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollPrev();
                  }}
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="glassmorphic-nav-button absolute -right-6 top-1/2 -translate-y-1/2 z-10 hidden lg:flex w-14 h-14"
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollNext();
                  }}
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>

                {/* Navigation Dots */}
                <div className="flex justify-center items-center gap-3 mt-8">
                  {features.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        scrollTo(index);
                      }}
                      className={cn(
                        "transition-all duration-300",
                        current === index
                          ? "w-10 h-2.5 glassmorphic-dot-active rounded-full"
                          : "w-2.5 h-2.5 glassmorphic-dot rounded-full hover:scale-125"
                      )}
                      aria-label={`Go to ${features[index].title}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <style jsx global>{`
            .glassmorphic-overlay-header {
              background: linear-gradient(135deg,
                rgba(255, 255, 255, 0.95) 0%,
                rgba(255, 255, 255, 0.9) 100%);
              backdrop-filter: blur(20px) saturate(150%);
              -webkit-backdrop-filter: blur(20px) saturate(150%);
              border: 1px solid rgba(255, 255, 255, 0.3);
              box-shadow:
                0 10px 40px rgba(0, 0, 0, 0.08),
                inset 0 1px 1px rgba(255, 255, 255, 0.5);
            }

            .glassmorphic-close-button {
              background: rgba(255, 255, 255, 0.1);
              backdrop-filter: blur(10px);
              -webkit-backdrop-filter: blur(10px);
              border: 1px solid rgba(255, 255, 255, 0.2);
              box-shadow:
                0 4px 12px rgba(0, 0, 0, 0.05),
                inset 0 1px 1px rgba(255, 255, 255, 0.2);
            }

            .glassmorphic-close-button:hover {
              background: rgba(255, 255, 255, 0.15);
              box-shadow:
                0 6px 16px rgba(0, 0, 0, 0.08),
                inset 0 1px 1px rgba(255, 255, 255, 0.3);
            }

            .glassmorphic-feature-card {
              background: linear-gradient(135deg,
                rgba(255, 255, 255, 0.9) 0%,
                rgba(255, 255, 255, 0.85) 100%);
              backdrop-filter: blur(20px) saturate(120%);
              -webkit-backdrop-filter: blur(20px) saturate(120%);
              border: 1px solid rgba(255, 255, 255, 0.3);
              box-shadow:
                0 10px 40px rgba(0, 0, 0, 0.06),
                inset 0 1px 1px rgba(255, 255, 255, 0.5);
            }

            .glassmorphic-icon {
              backdrop-filter: blur(10px);
              -webkit-backdrop-filter: blur(10px);
              border: 1px solid rgba(255, 255, 255, 0.2);
              box-shadow:
                0 4px 12px rgba(0, 0, 0, 0.05),
                inset 0 1px 1px rgba(255, 255, 255, 0.3);
            }

            .glassmorphic-nav-button {
              background: linear-gradient(135deg,
                rgba(255, 255, 255, 0.95) 0%,
                rgba(255, 255, 255, 0.85) 100%);
              backdrop-filter: blur(20px) saturate(150%);
              -webkit-backdrop-filter: blur(20px) saturate(150%);
              border: 1.5px solid rgba(59, 130, 246, 0.2);
              border-radius: 50%;
              box-shadow:
                0 8px 24px rgba(59, 130, 246, 0.15),
                0 4px 12px rgba(0, 0, 0, 0.08),
                inset 0 1px 2px rgba(255, 255, 255, 0.4);
              transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .glassmorphic-nav-button:hover {
              background: linear-gradient(135deg,
                rgba(59, 130, 246, 0.15) 0%,
                rgba(147, 51, 234, 0.1) 100%);
              border-color: rgba(59, 130, 246, 0.4);
              transform: scale(1.1) translateY(-2px);
              box-shadow:
                0 12px 32px rgba(59, 130, 246, 0.25),
                0 6px 16px rgba(0, 0, 0, 0.12),
                inset 0 1px 2px rgba(255, 255, 255, 0.5);
            }

            .glassmorphic-nav-button:active {
              transform: scale(1.05) translateY(0);
            }

            .glassmorphic-dot {
              background: rgba(156, 163, 175, 0.3);
              backdrop-filter: blur(5px);
              border: 1px solid rgba(255, 255, 255, 0.2);
            }

            .glassmorphic-dot-active {
              background: linear-gradient(to right,
                rgba(59, 130, 246, 0.3),
                rgba(6, 182, 212, 0.3));
              backdrop-filter: blur(5px);
              border: 1px solid rgba(255, 255, 255, 0.3);
              box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FeaturesOverlay;