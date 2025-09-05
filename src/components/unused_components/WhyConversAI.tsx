import React, { useRef, useEffect } from 'react';
import { MessageSquare, Users, Phone, FileText, Check } from 'lucide-react';

const WhyConversAI = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Add id to the section for navigation
    if (sectionRef.current) {
      sectionRef.current.id = 'why-conversai';
    }
  }, []);
  const differentiators = [
    {
      icon: MessageSquare,
      title: "Omnichannel by Design",
      description: "Voice, WhatsApp, Email, SMS, Web—one platform.",
      highlight: "Unlike competitors who focus on single channels"
    },
    {
      icon: Users,
      title: "LLM-Powered Automation",
      description: "State-of-the-art generative and extractive AI, always learning.",
      highlight: "Advanced AI that improves with every interaction"
    },
    {
      icon: Phone,
      title: "Enterprise-Grade",
      description: "Secure, reliable, compliance-ready.",
      highlight: "SOC 2 Type II, GDPR compliant, 99.9% uptime"
    },
    {
      icon: FileText,
      title: "Integrates Everywhere",
      description: "CRM, WhatsApp, Twilio, Email, and more.",
      highlight: "200+ pre-built integrations"
    }
  ];

  const results = [
    { metric: "3.2x", label: "Faster Speed-to-Lead" },
    { metric: "65%", label: "Higher Conversions" },
    { metric: "80%", label: "Lower Manual Workload" },
    { metric: "24/7", label: "Always Available" }
  ];

  return (
    <div ref={sectionRef} className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Why Leading Teams Choose ConversAI Labs
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Differentiators */}
          <div className="space-y-6">
            {differentiators.map((item, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-700 mb-2">
                      {item.description}
                    </p>
                    <p className="text-sm text-blue-600 font-medium">
                      {item.highlight}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Results */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Proven Results
            </h3>
            
            <div className="grid grid-cols-2 gap-6">
              {results.map((result, index) => (
                <div 
                  key={index}
                  className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl animate-scale-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text mb-2">
                    {result.metric}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {result.label}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
              <div className="flex items-center space-x-3">
                <Check className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-semibold text-gray-900">ROI Guarantee</p>
                  <p className="text-sm text-gray-600">See positive ROI within 90 days or get your money back</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyConversAI;
