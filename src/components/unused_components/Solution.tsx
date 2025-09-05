
import React from 'react';
import { Phone, MessageSquare, Users, FileText } from 'lucide-react';

const Solution = () => {
  const capabilities = [
    {
      icon: Phone,
      title: "Conversational Voice AI",
      description: "Outbound/inbound calls, dynamic dialog, instant follow-up.",
      color: "blue"
    },
    {
      icon: MessageSquare,
      title: "Omnichannel Messaging",
      description: "WhatsApp, Email, SMS, Web Chat—seamless, two-way engagement.",
      color: "green"
    },
    {
      icon: Users,
      title: "LLM Lead Intelligence",
      description: "Automated intent & fit scoring, real-time segmentation, data enrichment.",
      color: "purple"
    },
    {
      icon: FileText,
      title: "CRM Sync & Summarization",
      description: "Every call/message logged, summarized, and auto-synced to your CRM.",
      color: "indigo"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: "bg-blue-100 text-blue-600 border-blue-200",
      green: "bg-green-100 text-green-600 border-green-200",
      purple: "bg-purple-100 text-purple-600 border-purple-200",
      indigo: "bg-indigo-100 text-indigo-600 border-indigo-200"
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            ConversAI: Your End-to-End AI-Powered Lead Engine
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Manage the entire lead journey—qualification, nurturing, objection handling, enrichment, and CRM logging—on autopilot.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {capabilities.map((capability, index) => (
            <div 
              key={index}
              className="text-center group hover:transform hover:scale-105 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl border-2 flex items-center justify-center group-hover:shadow-lg transition-all duration-300 ${getColorClasses(capability.color)}`}>
                <capability.icon className="w-8 h-8" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {capability.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {capability.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solution;
