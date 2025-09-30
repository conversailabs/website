"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Phone, MessageSquare, Users, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Features = () => {
  const featuresSectionRef = React.useRef<HTMLDivElement>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  React.useEffect(() => {
    if (featuresSectionRef.current) {
      featuresSectionRef.current.id = 'features';
    }
  }, []);

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
      gradient: "from-blue-600 to-cyan-500"
    },
    {
      icon: MessageSquare,
      title: "Omnichannel Messaging",
      shortDescription: "Unified AI conversations across all messaging platforms",
      points: [
        "WhatsApp, Email, SMS, Web Chat",
        "Dynamic two-way conversations",
        "Context-aware follow-ups"
      ],
      gradient: "from-purple-600 to-pink-500"
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
      gradient: "from-green-600 to-emerald-500"
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
      gradient: "from-orange-600 to-red-500"
    }
  ];

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  return (
    <div ref={featuresSectionRef} className="py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Voice-first AI technology that transforms conversations into qualified leads
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
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
            <CarouselContent className="-ml-2 md:-ml-4">
              {features.map((feature, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <div
                    className="p-1 cursor-pointer"
                    onClick={() => scrollTo(index)}
                  >
                    <div
                      className={cn(
                        "relative bg-white rounded-2xl border border-gray-200 p-6 h-full transition-all duration-500 transform-gpu",
                        current === index
                          ? "scale-100 md:scale-105 opacity-100 shadow-2xl border-gray-300"
                          : "scale-95 md:scale-90 opacity-60 md:opacity-70 shadow-md hover:opacity-80",
                        current !== index && "md:blur-[0.5px]"
                      )}
                    >
                      {/* Icon */}
                      <div className="flex justify-center mb-4">
                        <div className={cn(
                          "w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br shadow-lg",
                          feature.gradient
                        )}>
                          <feature.icon className="w-7 h-7 text-white" />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className={cn(
                        "text-xl font-bold text-center mb-3 transition-all duration-300",
                        current === index ? "text-gray-900" : "text-gray-700"
                      )}>
                        {feature.title}
                      </h3>

                      {/* Description */}
                      <p className={cn(
                        "text-sm text-center mb-4 transition-all duration-300",
                        current === index ? "text-gray-600" : "text-gray-500"
                      )}>
                        {feature.shortDescription}
                      </p>

                      {/* Points - Only visible on active card */}
                      <div className={cn(
                        "space-y-2 transition-all duration-500",
                        current === index
                          ? "opacity-100 max-h-40"
                          : "opacity-0 max-h-0 overflow-hidden"
                      )}>
                        {feature.points.map((point, pointIndex) => (
                          <div key={pointIndex} className="flex items-start">
                            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 mt-1.5 mr-2 flex-shrink-0" />
                            <span className="text-xs text-gray-600">{point}</span>
                          </div>
                        ))}
                      </div>

                      {/* Active Indicator */}
                      {current === index && (
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-b-2xl" />
                      )}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 z-10",
              "w-10 h-10 md:w-12 md:h-12 rounded-full",
              "bg-white/90 backdrop-blur-sm border-gray-200",
              "hover:bg-gray-50 hover:border-gray-300",
              "transition-all duration-200 shadow-lg",
              "hidden md:flex"
            )}
            onClick={scrollPrev}
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            <span className="sr-only">Previous feature</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className={cn(
              "absolute right-0 top-1/2 -translate-y-1/2 z-10",
              "w-10 h-10 md:w-12 md:h-12 rounded-full",
              "bg-white/90 backdrop-blur-sm border-gray-200",
              "hover:bg-gray-50 hover:border-gray-300",
              "transition-all duration-200 shadow-lg",
              "hidden md:flex"
            )}
            onClick={scrollNext}
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            <span className="sr-only">Next feature</span>
          </Button>
        </div>

        {/* Mobile Navigation Dots */}
        <div className="flex justify-center items-center gap-2 mt-6 md:hidden">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={cn(
                "transition-all duration-300",
                current === index
                  ? "w-8 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                  : "w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400"
              )}
              aria-label={`Go to feature ${index + 1}`}
            />
          ))}
        </div>

        {/* Desktop Dots */}
        <div className="hidden md:flex justify-center items-center gap-3 mt-8">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={cn(
                "transition-all duration-300",
                current === index
                  ? "w-10 h-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-lg"
                  : "w-2.5 h-2.5 bg-gray-300 rounded-full hover:bg-gray-400 hover:scale-125"
              )}
              aria-label={`Go to ${features[index].title}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;