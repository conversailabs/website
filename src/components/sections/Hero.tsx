import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Phone } from 'lucide-react';
import ContactModal from '../forms/ContactModal';

const Hero = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleSeeHowItWorks = () => {
    window.open('https://dashboard.conversailabs.com/', '_blank');
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden pt-24 pb-20 overflow-x-hidden min-h-[80vh]">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-4 w-40 h-40 sm:w-72 sm:h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-32 right-4 w-40 h-40 sm:w-72 sm:h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
        <div className="absolute -bottom-8 left-20 w-40 h-40 sm:w-72 sm:h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left: Text */}
          <div className="text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Build AI Voice Agents
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> 
                That Sound Human & Convert
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
              Create intelligent voice agents that handle phone calls like real humans. Upload your script, pick a professional voice, and let AI qualify leads 24/7 with natural conversations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6 sm:mb-8">
              <Button 
                size="lg" 
                onClick={handleSeeHowItWorks}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold"
                style={{ cursor: 'pointer' }}
              >
                Build Your First AI Agent Free
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => setIsContactModalOpen(true)}
                className="border-2 border-gray-300 hover:border-blue-500 px-8 py-4 text-lg font-semibold text-black"
                style={{ cursor: 'pointer' }}
              >
                Contact Us
              </Button>
            </div>
            
            <p className="text-xs sm:text-sm text-gray-500 italic">
              No credit card required • 50 free calls • Setup in under 10 minutes
            </p>
          </div>
          
          {/* Right: Dashboard */}
          <div className="relative mt-8 lg:mt-0 w-full">
            {/* Make dashboard horizontally scrollable on mobile */}
            <div className="w-full max-w-md mx-auto overflow-x-auto">
              <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 border border-gray-200 w-full min-w-[300px] sm:min-w-0">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">Agent Builder Dashboard</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs sm:text-sm text-gray-600">Active</span>
                  </div>
                </div>
                
                {/* Agent Cards */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-blue-50 rounded-lg border border-blue-200 animate-fade-in">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm font-medium text-gray-900">Voice Lead Qualifier</p>
                      <p className="text-[10px] sm:text-xs text-gray-600">Professional voice • 47 phone calls today</p>
                    </div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  
                  <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-green-50 rounded-lg border border-green-200 animate-fade-in delay-300">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm font-medium text-gray-900">Voice Support Agent</p>
                      <p className="text-[10px] sm:text-xs text-gray-600">Phone • Multi-accent • 23 calls resolved</p>
                    </div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  
                  <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-purple-50 rounded-lg border border-purple-200 animate-fade-in delay-500">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm font-medium text-gray-900">Voice Appointment Setter</p>
                      <p className="text-[10px] sm:text-xs text-gray-600">Phone bookings • 12 appointments set</p>
                    </div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
                
              </div>
            </div>
            
            {/* Floating Stats - hide on xs, show on sm+ */}
            <div className="hidden sm:block absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4 border border-gray-200 animate-scale-in">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">10x</div>
                <div className="text-xs text-gray-600">Better Than Text</div>
              </div>
            </div>
            
            <div className="hidden sm:block absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4 border border-gray-200 animate-scale-in delay-700">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">85%</div>
                <div className="text-xs text-gray-600">Voice Conversion Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
      </div>
      
      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        title="Get Started with AI Agents"
      />
    </section>
  );
};

export default Hero;
