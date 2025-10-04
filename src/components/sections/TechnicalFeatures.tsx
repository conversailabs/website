'use client';

import React from 'react';
import { Brain, Database, Repeat, BarChart3, Upload, Mic, Settings, Target } from 'lucide-react';

const TechnicalFeatures = () => {
  const features = [
    {
      icon: <Mic className="w-8 h-8" />,
      title: "Professional Voice Selection",
      description: "Choose from multiple languages and accents. US English, UK English, and Hinglish voices with male/female options.",
      highlight: "6+ voice options"
    },
    {
      icon: <Upload className="w-8 h-8" />,
      title: "Multi-Source Agent Creation",
      description: "Upload scripts, paste website content, or use call recordings to generate AI agents automatically with our YAML builder.",
      highlight: "3 ways to build"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Smart Data Extraction",
      description: "Configure custom fields (name, email, budget, timeline) and AI extracts them automatically from conversations.",
      highlight: "Custom fields"
    },
    {
      icon: <Repeat className="w-8 h-8" />,
      title: "Intelligent Call Cycling",
      description: "Set retry intervals, max attempts, and calling hours based on outcomes. Never over-call or miss follow-ups.",
      highlight: "Auto retry logic"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Real-Time Analytics",
      description: "See live conversation data, success rates, cost per qualified lead, and detailed call transcripts.",
      highlight: "Live insights"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Outcome-Based Actions",
      description: "Define what happens for each call result: retry, schedule callback, transfer to human, or mark complete.",
      highlight: "Smart routing"
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: "Usage Controls",
      description: "Set daily limits for calls and minutes. Automatic budget controls to prevent overspending.",
      highlight: "Cost protection"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "No-Code Flow Builder",
      description: "Visual prompt builder with conditional logic. Create complex conversation flows without programming.",
      highlight: "Visual editor"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Why ConversAI Labs is Different
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unlike generic chatbots, we&apos;re built specifically for voice-first AI agents that handle phone conversations and convert leads through natural dialogue.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Highlight Badge */}
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                {feature.highlight}
              </div>
              
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <div className="text-blue-600 group-hover:text-purple-600 transition-colors duration-300">
                  {feature.icon}
                </div>
              </div>
              
              {/* Content */}
              <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full px-8 py-4">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white"></div>
              <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white"></div>
              <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-white"></div>
            </div>
            <span className="text-gray-700 font-medium">
              Join 50+ businesses already using ConversAI Labs to automate their phone calls
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalFeatures;