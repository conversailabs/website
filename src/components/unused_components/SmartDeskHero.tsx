'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, ChevronRight, Sparkles, Zap } from 'lucide-react';

const SmartDeskHero = () => {
  const handleGetStarted = () => {
    window.open('https://wa.me/918076018082?text=Hi%2C%20I%27m%20interested%20in%20SmartDesk%20for%20WhatsApp', '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-teal-200 rounded-full opacity-20 animate-float-delayed"></div>
        <MessageSquare className="absolute top-1/3 right-1/4 w-16 h-16 text-green-300 opacity-30 animate-float-delayed" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            New Product Launch
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
            Meet SmartDesk
          </h2>
          
          <p className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
            AI-powered responses convert 90% of WhatsApp queries into sales opportunities
          </p>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Your AI Employee that drafts perfect responses in WhatsApp Web, helping growing businesses respond 10x faster and never miss a sale.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-8 py-6 text-lg transform hover:scale-105 transition-all"
            >
              Get Early Access
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => window.open('/smartdesk', '_self')}
              className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-6 text-lg transform hover:scale-105 transition-all"
            >
              Learn More
            </Button>
          </div>
          
          <p className="text-sm text-gray-500 mt-4">
            No credit card required • 14-day free trial
          </p>
        </div>

        {/* Key benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div 
            className="bg-white rounded-xl p-6 shadow-lg text-center transform hover:scale-105 transition-all cursor-pointer"
            onClick={() => window.open('/smartdesk', '_self')}
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Instant AI Responses</h3>
            <p className="text-sm text-gray-600">Get suggested replies in seconds</p>
          </div>
          
          <div 
            className="bg-white rounded-xl p-6 shadow-lg text-center transform hover:scale-105 transition-all cursor-pointer"
            onClick={() => window.open('/smartdesk', '_self')}
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">WhatsApp Integration</h3>
            <p className="text-sm text-gray-600">Works directly in WhatsApp Web</p>
          </div>
          
          <div 
            className="bg-white rounded-xl p-6 shadow-lg text-center transform hover:scale-105 transition-all cursor-pointer"
            onClick={() => window.open('/smartdesk', '_self')}
          >
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">Smart Learning</h3>
            <p className="text-sm text-gray-600">Learns from your conversation style</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartDeskHero;