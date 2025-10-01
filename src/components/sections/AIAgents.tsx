"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type AgentCardProps = {
  title: string;
  description: string;
  features: string[];
  image: string;
  index: number;
  cardRef: React.RefObject<HTMLDivElement | null>;
};

const AgentCard = ({ title, description, features, image, index, cardRef }: AgentCardProps) => {
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4 + index * 0.15 }}
      className="group relative bg-gray-50/80 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-200/50 p-5"
    >
      {/* Top Content - Title and Description */}
      <div className="mb-4 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>

      {/* Image Container with Features */}
      <div className="relative rounded-2xl overflow-hidden mb-4">
        <div className="aspect-[4/3] w-full relative">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Feature List Overlay */}
        <div className="absolute bottom-3 left-3 right-3 space-y-2">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6 + idx * 0.1 }}
              className="flex items-center space-x-1 bg-white backdrop-blur-md border border-gray-200 rounded-full px-2 py-1 shadow-md w-fit max-w-[90%]"
            >
              <div className="flex-shrink-0 w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-white" strokeWidth={3} />
              </div>
              <span className="text-gray-900 text-xs font-medium">{feature}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Button */}
      <Button
        variant="outline"
        className="w-full bg-blue-600 text-white border-0 hover:bg-blue-700 transition-all duration-300 py-4 text-sm font-semibold rounded-xl shadow-sm"
      >
        Contact Sales
      </Button>
    </motion.div>
  );
};

const AIAgents = () => {
  const logoRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [paths, setPaths] = useState<{ d: string; gradient: string }[]>([]);

  const agents = [
    {
      title: "AI Phone Call Agent",
      description: "Runs calls 24/7 with human-like finesse.",
      image: "/card1.jpg",
      features: [
        "Zero missed leads",
        "Connect with leads in < 60 secs",
        "Deliver sales-ready leads to your agents",
      ],
    },
    {
      title: "Real-time Assist Agent",
      description: "Makes every agent smarter on every call.",
      image: "/card2.webp",
      features: [
        "60% Faster Ramp-Up",
        "100% Compliance Monitoring",
        "58 sec Lower AHT",
      ],
    },
    {
      title: "Conversation Intelligence Agent",
      description: "Analyses 100% of customer conversations.",
      image: "/card3.jpg",
      features: [
        // "100% QA",
        "27% Higher Sales",
        "37% Higher CSAT",
        "100% Compliance Monitoring",
      ],
    },
  ];

  useEffect(() => {
    const updatePaths = () => {
      if (!logoRef.current || !svgRef.current) return;

      const logoRect = logoRef.current.getBoundingClientRect();
      const svgRect = svgRef.current.getBoundingClientRect();
      const cardRefs = [card1Ref, card2Ref, card3Ref];

      const newPaths = cardRefs.map((cardRef, index) => {
        if (!cardRef.current) return null;

        const cardRect = cardRef.current.getBoundingClientRect();

        // Calculate positions relative to SVG
        const startX = logoRect.left + logoRect.width / 2 - svgRect.left;
        const startY = logoRect.top + logoRect.height / 2 - svgRect.top;
        const endX = cardRect.left + cardRect.width / 2 - svgRect.left;
        const endY = cardRect.top - svgRect.top;

        // Create smooth curved path with better control points
        const midY = startY + (endY - startY) * 0.5;
        const controlX1 = startX;
        const controlY1 = midY;
        const controlX2 = endX;
        const controlY2 = midY;

        // Use cubic bezier for smoother curves
        const d = `M ${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}`;

        const gradients = ['url(#gradient-blue)', 'url(#gradient-blue)', 'url(#gradient-blue)'];

        return { d, gradient: gradients[index] };
      }).filter(Boolean) as { d: string; gradient: string }[];

      setPaths(newPaths);
    };

    // Update on mount and resize
    updatePaths();
    window.addEventListener('resize', updatePaths);

    // Also update after a short delay to ensure all elements are rendered
    const timer = setTimeout(updatePaths, 100);
    const timer2 = setTimeout(updatePaths, 500);

    return () => {
      window.removeEventListener('resize', updatePaths);
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <section className="relative pt-8 pb-8 bg-transparent overflow-visible">
      <div className="container mx-auto px-4 sm:px-6 relative">
        {/* Logo Circle - Positioned at top center, overlapping previous section */}
        <motion.div
          ref={logoRef}
          initial={{ scale: 0, opacity: 0, rotate: -180 }}
          whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="absolute -top-12 left-1/2 -translate-x-1/2 z-30 w-24 h-24 rounded-full shadow-2xl overflow-hidden bg-white flex items-center justify-center"
        >
          <Image
            src="/favicon.png"
            alt="ConversAI Logo"
            width={96}
            height={96}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Main Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative bg-[#FAFBFC] pt-16 pb-12 px-8 md:px-16 mt-16"
        >
          {/* Connecting Lines SVG */}
          <svg
            ref={svgRef}
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
            style={{ overflow: 'visible' }}
          >
            <defs>
              <linearGradient id="gradient-blue" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="gradient-purple" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="gradient-pink" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            {paths.map((path, index) => (
              <motion.path
                key={index}
                d={path.d}
                stroke="url(#gradient-blue)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5 + index * 0.15, ease: "easeInOut" }}
              />
            ))}
          </svg>

          {/* Heading Area */}
          <div className="text-center mb-12 relative z-20">
            {/* Main Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Meet ConversAI&apos;s AI Agents
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Unleash one or all to crush your toughest goals
            </motion.p>
          </div>

          {/* Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto relative z-20">
            <AgentCard {...agents[0]} index={0} cardRef={card1Ref} />
            <AgentCard {...agents[1]} index={1} cardRef={card2Ref} />
            <AgentCard {...agents[2]} index={2} cardRef={card3Ref} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AIAgents;