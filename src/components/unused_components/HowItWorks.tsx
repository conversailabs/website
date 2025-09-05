import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {  Phone, MessageSquare, Users, FileText, Search, Check } from 'lucide-react';

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Add id to the section for navigation
    if (sectionRef.current) {
      sectionRef.current.id = 'how-it-works';
    }
  }, []);
  
  const steps = [
    {
      icon: Phone,
      title: "AI Engages Instantly",
      description: "AI reaches out via call or message within seconds of a new lead—no more wait time.",
      details: "Our AI responds in under 30 seconds, ensuring you never lose a hot lead to slow response times."
    },
    {
      icon: MessageSquare,
      title: "Converses & Qualifies",
      description: "Smart, natural conversation: asks scripted and adaptive questions, handles objections, answers FAQs.",
      details: "Multi-language support with natural conversation flow that adapts based on lead responses."
    },
    {
      icon: Search,
      title: "Parses & Enriches Data",
      description: "Extracts key info from conversations, fills missing fields, and tags objections automatically.",
      details: "Automatically enriches lead data from LinkedIn, company websites, and other sources."
    },
    {
      icon: Users,
      title: "Scores & Segments",
      description: "LLM analyzes intent, fit, urgency; hot leads routed instantly, cold leads enter nurturing.",
      details: "Advanced scoring algorithm considers 50+ data points for accurate lead prioritization."
    },
    {
      icon: MessageSquare,
      title: "Nurtures & Follows Up",
      description: "AI sends personalized messages tailored to each lead's stage, activity, and behavior.",
      details: "Dynamic follow-up sequences that adapt based on engagement and lead behavior patterns."
    },
    {
      icon: FileText,
      title: "Logs & Summarizes Everything",
      description: "Summaries, transcripts, and next steps pushed to your CRM. Nothing lost, no manual work.",
      details: "Complete conversation history with actionable insights and automated CRM updates."
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            How ConversAI Works
          </h2>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Steps List */}
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                    activeStep === index 
                      ? 'bg-white shadow-lg border-l-4 border-blue-600' 
                      : 'bg-white/70 hover:bg-white hover:shadow-md'
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      activeStep === index 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      <step.icon className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                          activeStep === index 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          Step {index + 1}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm">
                        {step.description}
                      </p>
                    </div>
                    
                    {activeStep === index && (
                      <Check className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Active Step Details */}
            <div className="lg:sticky lg:top-8">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                    {React.createElement(steps[activeStep].icon, { 
                      className: "w-8 h-8 text-white" 
                    })}
                  </div>
                  <div>
                    <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                      Step {activeStep + 1}
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">
                      {steps[activeStep].title}
                    </h3>
                  </div>
                </div>
                
                <p className="text-lg text-gray-700 mb-6">
                  {steps[activeStep].description}
                </p>
                
                <p className="text-gray-600 mb-8">
                  {steps[activeStep].details}
                </p>
                
                <div className="flex space-x-3">
                  {activeStep > 0 && (
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveStep(activeStep - 1)}
                    >
                      Previous
                    </Button>
                  )}
                  {activeStep < steps.length - 1 && (
                    <Button 
                      onClick={() => setActiveStep(activeStep + 1)}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      Next Step
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
