'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
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

// Color gradient mapping for orbs
const orbColorMap = {
  blue: { primary: '#3B82F6', secondary: '#1E40AF' },
  green: { primary: '#16A34A', secondary: '#15803D' },
  purple: { primary: '#9333EA', secondary: '#6B21A8' },
  orange: { primary: '#FB923C', secondary: '#EA580C' },
  red: { primary: '#EF4444', secondary: '#B91C1C' },
};

// Liquid Orb Component for Background
const LiquidOrb = ({
  size,
  initialX,
  duration = 20,
  className = "",
  color = "blue"
}: {
  size: number;
  initialX: number;
  duration?: number;
  className?: string;
  color?: string;
}) => {
  const [randomDelay] = useState(() => -(Math.random() * duration));
  const orbColors = orbColorMap[color as keyof typeof orbColorMap] || orbColorMap.blue;

  return (
    <motion.div
      className="absolute"
      style={{ width: size, height: size }}
      initial={{ y: "110vh", x: initialX, opacity: 0 }}
      animate={{
        y: ["110vh", "-25vh"],
        x: initialX,
        opacity: 1,
        transition: {
          duration,
          delay: randomDelay,
          repeat: Infinity,
          ease: "linear",
        },
      }}
    >
      <div
        className={`relative w-full h-full liquid-orb ${className}`}
        style={{
          background: `linear-gradient(45deg, ${orbColors.primary}, ${orbColors.secondary})`,
          boxShadow: `inset 0 0 60px rgba(0, 0, 0, 0.4), 0 10px 40px ${orbColors.primary}80, 0 0 0 10px rgba(255, 255, 255, 0.1)`
        }}
      ></div>
    </motion.div>
  );
};

export function HeroSection({ industry, description, color }: HeroSectionProps) {
  const gradientClass = colorMap[color as keyof typeof colorMap] || colorMap.blue;
  const [isInteracting, setIsInteracting] = useState(false);

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col items-center bg-[#F0F2F5]">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_40%,_rgba(0,0,0,0.1))]"></div>

      {/* Background Orbs */}
      <LiquidOrb size={80} initialX={-500} duration={35} className="morphing-orb" color={color} />
      <LiquidOrb size={50} initialX={-200} duration={40} className="morphing-orb" color={color} />
      <LiquidOrb size={90} initialX={480} duration={30} className="morphing-orb" color={color} />
      <LiquidOrb size={60} initialX={200} duration={45} className="morphing-orb" color={color} />
      <LiquidOrb size={65} initialX={-400} duration={38} className="morphing-orb" color={color} />
      <LiquidOrb size={55} initialX={350} duration={42} className="morphing-orb" color={color} />
      <LiquidOrb size={70} initialX={-100} duration={33} className="morphing-orb" color={color} />
      <LiquidOrb size={30} initialX={-300} duration={50} className="morphing-orb" color={color} />
      <LiquidOrb size={40} initialX={100} duration={48} className="morphing-orb" color={color} />
      <LiquidOrb size={25} initialX={550} duration={55} className="morphing-orb" color={color} />
      <LiquidOrb size={35} initialX={-600} duration={46} className="morphing-orb" color={color} />
      <LiquidOrb size={45} initialX={-50} duration={39} className="morphing-orb" color={color} />

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-16 pb-4 md:pt-20 md:pb-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight"
        >
          {/* class="jsx-160e1da9fc16ccc text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight" */}
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
          className="text-base md:text-xl text-gray-600 mb-4 md:mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          {description}
        </motion.p>

        {/* Central Liquid Orb */}
        <div className="relative w-full h-64 md:h-80 flex items-center justify-center mb-4 md:mb-8">
          <motion.div
            className="relative w-48 h-48 md:w-64 md:h-64 z-10 cursor-pointer"
            onClick={() => setIsInteracting(!isInteracting)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div
              className="w-full h-full liquid-orb morphing-orb"
              style={{
                background: `linear-gradient(45deg, ${orbColorMap[color as keyof typeof orbColorMap]?.primary || '#3B82F6'}, ${orbColorMap[color as keyof typeof orbColorMap]?.secondary || '#1E40AF'})`,
                boxShadow: `inset 0 0 60px rgba(0, 0, 0, 0.4), 0 10px 40px ${orbColorMap[color as keyof typeof orbColorMap]?.primary || '#3B82F6'}80, 0 0 0 10px rgba(255, 255, 255, 0.1)`
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <span className="text-white text-xl md:text-2xl font-bold tracking-wide uppercase drop-shadow-lg">
                  Try Agent
                </span>
              </div>
            </div>
            {isInteracting && (
              <>
                <div className="absolute inset-0 rounded-full border-2 border-cyan-300/70 animate-ping" />
                <div
                  className="absolute -inset-4 rounded-full border border-cyan-300/50 animate-ping"
                  style={{ animationDelay: "300ms" }}
                />
              </>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            onClick={() => window.open('https://dashboard.conversailabs.com/', '_blank')}
            className="bg-gray-800 hover:bg-black text-white px-8 py-3 text-md rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
          >
            Build Custom Agent
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            onClick={() => window.open('/schedule-demo', '_self')}
            className="px-8 py-3 text-md rounded-lg font-semibold border-2 hover:bg-gray-50"
          >
            Schedule Demo
          </Button>
        </motion.div>

        {/* Stats section */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
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
        </motion.div> */}

        {/* Trust indicators */}
        <div className="flex flex-col items-center gap-4 mt-8">
          <div className="text-gray-500 text-sm font-medium">
            Trusted by leading {industry} companies
          </div>
          {/* <div className="flex items-center gap-8 opacity-60">
            <p className="font-bold text-xl">excel</p>
            <p className="font-bold text-xl">SG Benefit</p>
            <p className="font-bold text-xl">bamboo</p>
            <p className="font-bold text-xl">Highview</p>
          </div> */}
        </div>
      </div>

      <style jsx global>{`
        .liquid-orb {
          border-radius: 50%;
          position: relative;
          overflow: hidden;
        }

        .liquid-orb::before {
          content: "";
          position: absolute;
          top: -20%;
          left: -20%;
          width: 140%;
          height: 140%;
          background: radial-gradient(
              circle at 30% 30%,
              rgba(255, 255, 255, 0.8),
              transparent 50%
            ),
            radial-gradient(
              circle at 70% 80%,
              rgba(220, 240, 255, 0.9),
              transparent 40%
            );
          filter: blur(30px);
          animation: rotateTexture 20s linear infinite;
        }

        .liquid-orb::after {
          content: "";
          position: absolute;
          top: 5%;
          left: 10%;
          width: 80%;
          height: 40%;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.6),
            transparent
          );
          border-radius: 50% / 100%;
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
          transform: rotate(-15deg);
        }

        @keyframes rotateTexture {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes morphAnimation {
          0%,
          100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
            transform: scale(1) rotate(0deg);
          }
          25% {
            border-radius: 30% 70% 70% 30% / 30% 40% 60% 70%;
            transform: scale(1.02) rotate(5deg);
          }
          50% {
            border-radius: 70% 30% 60% 40% / 70% 60% 40% 30%;
            transform: scale(0.98) rotate(-5deg);
          }
          75% {
            border-radius: 40% 60% 30% 70% / 60% 70% 30% 40%;
            transform: scale(1.01) rotate(2deg);
          }
        }

        .morphing-orb {
          animation: morphAnimation 12s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}