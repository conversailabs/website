'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Clock, MessageSquare, TrendingUp, Users, Zap, Bot, Shield, ChevronRight, Sparkles, Star, Play, Award } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CountdownTimer from '@/components/utilities/CountdownTimer';

const SmartDeskPage = () => {
  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'growth' | 'scale'>('growth');
  const [messageCount, setMessageCount] = useState(0);
  const [responseTime, setResponseTime] = useState(0);
  const [satisfaction, setSatisfaction] = useState(0);
  const [revenueSaved, setRevenueSaved] = useState(0);

  // Animated counter effect
  useEffect(() => {
    const animateValue = (setter: (value: number) => void, start: number, end: number, duration: number) => {
      const range = end - start;
      const increment = end > start ? 1 : -1;
      const stepTime = Math.abs(Math.floor(duration / range));
      let current = start;
      
      const timer = setInterval(() => {
        current += increment * Math.ceil(range / 50);
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
          setter(end);
          clearInterval(timer);
        } else {
          setter(current);
        }
      }, stepTime);
    };

    // Trigger animations when component mounts
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateValue(setMessageCount, 0, 5000, 2000);
          animateValue(setResponseTime, 0, 15, 1500);
          animateValue(setSatisfaction, 0, 98, 1800);
          animateValue(setRevenueSaved, 0, 2, 2000);
        }
      });
    });

    const metricsSection = document.getElementById('metrics-section');
    if (metricsSection) observer.observe(metricsSection);

    return () => observer.disconnect();
  }, []);

  const handleGetStarted = () => {
    window.open('https://wa.me/918076018082?text=Hi%2C%20I%27m%20interested%20in%20SmartDesk%20for%20WhatsApp', '_blank');
  };

  const testimonials = [
    {
      name: "Priya Sharma",
      business: "Sharma Boutique",
      image: "/api/placeholder/60/60",
      quote: "SmartDesk reduced our response time by 90%. We never miss a customer query now!",
      metric: "90% faster responses"
    },
    {
      name: "Rajesh Kumar",
      business: "Kumar Electronics",
      image: "/api/placeholder/60/60",
      quote: "We saved ₹2L+ monthly by automating repetitive queries. Game changer!",
      metric: "₹2L+ saved monthly"
    },
    {
      name: "Anita Patel",
      business: "Patel Sweets",
      image: "/api/placeholder/60/60",
      quote: "Our customers love the instant responses. Sales increased by 40%!",
      metric: "40% sales increase"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 overflow-x-hidden">
      <Header />
      
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-teal-200 rounded-full opacity-20 animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-emerald-200 rounded-full opacity-20 animate-float"></div>
        <MessageSquare className="absolute top-1/3 right-1/4 w-16 h-16 text-green-300 opacity-30 animate-float-delayed" />
        <Bot className="absolute bottom-1/3 left-1/3 w-20 h-20 text-teal-300 opacity-30 animate-float" />
      </div>
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative z-10">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              AI-Powered WhatsApp Assistant
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent animate-slide-up">
              SmartDesk
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4 animate-slide-up-delayed">
              AI-powered responses convert 90% of WhatsApp queries into sales opportunities
            </p>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 animate-fade-in-delayed">
              Your AI Employee that drafts perfect responses in WhatsApp Web, helping growing businesses respond 10x faster and never miss a sale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delayed">
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
                className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-6 text-lg transform hover:scale-105 transition-all"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              No credit card required • 14-day free trial
            </p>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
              <Bot className="w-5 h-5 text-green-600" />
              <span className="text-sm font-semibold">Powered by GPT-4</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
              <Award className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-semibold">14-day Money Back</span>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Demo Section */}
      <section id="features" className="py-20 bg-white relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            See SmartDesk in Action
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* WhatsApp Mockup */}
            <div className="relative">
              <div className="bg-gray-100 rounded-2xl p-4 shadow-2xl">
                <div className="bg-white rounded-xl overflow-hidden">
                  {/* WhatsApp Header */}
                  <div className="bg-green-600 text-white p-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-full"></div>
                    <div>
                      <p className="font-semibold">Customer Support</p>
                      <p className="text-xs opacity-80">online</p>
                    </div>
                  </div>
                  
                  {/* Chat Messages */}
                  <div className="p-4 space-y-3 h-96 overflow-y-auto">
                    <div className="flex justify-start">
                      <div className="bg-gray-200 rounded-lg p-3 max-w-xs">
                        <p className="text-sm">Hi, what&apos;s the price for bulk orders?</p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-green-100 rounded-lg p-3 max-w-xs">
                        <p className="text-sm">Hello! For bulk orders above 100 units, we offer 15% discount. Orders above 500 units get 25% off! 🎉</p>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-gray-200 rounded-lg p-3 max-w-xs">
                        <p className="text-sm">Do you deliver to Mumbai?</p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-green-100 rounded-lg p-3 max-w-xs">
                        <p className="text-sm">Yes, we deliver all across Mumbai! Standard delivery takes 2-3 days. Express delivery available for ₹99 extra.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SmartDesk AI Suggestion Overlay */}
              <div className="absolute -right-4 top-1/3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg p-4 shadow-xl max-w-xs animate-pulse">
                <p className="text-xs font-semibold mb-1">SmartDesk AI Suggestion:</p>
                <p className="text-sm">&ldquo;For bulk pricing, mention the 15% and 25% discount tiers. Add delivery info for Mumbai.&rdquo;</p>
                <div className="flex gap-2 mt-2">
                  <button className="bg-white text-green-600 px-3 py-1 rounded text-xs font-semibold">Insert</button>
                  <button className="border border-white px-3 py-1 rounded text-xs">Edit</button>
                </div>
              </div>
            </div>

            {/* Benefits List */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-6">Instant AI-Powered Responses</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Real-time Suggestions</h4>
                    <p className="text-gray-600">Get instant response drafts as messages come in</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Bot className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Context-Aware AI</h4>
                    <p className="text-gray-600">Understands conversation history and customer intent</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">One-Click Response</h4>
                    <p className="text-gray-600">Review and send with a single click</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Impact Section */}
      <section id="metrics-section" className="py-20 bg-gradient-to-r from-green-600 to-teal-600 text-white relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Early Results from Beta Testing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-5xl font-bold mb-2">{messageCount.toLocaleString()}+</p>
              <p className="text-green-100">Messages Tested</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold mb-2">&lt;{responseTime}s</p>
              <p className="text-green-100">Average Response Time</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold mb-2">{satisfaction}%</p>
              <p className="text-green-100">Success Rate</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold mb-2">₹{revenueSaved}L+</p>
              <p className="text-green-100">Cost Savings (Monthly)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Loved by Small Merchants Everywhere
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300 ${
                  index === 1 ? 'md:-rotate-2' : index === 2 ? 'md:rotate-2' : ''
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.business}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="bg-green-50 text-green-800 px-3 py-1 rounded-full text-sm font-semibold inline-block">
                  {testimonial.metric}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual How It Works Timeline */}
      <section className="py-20 bg-white relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-4">
            Get Started in 3 Simple Steps
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            SmartDesk learns from your past conversations and creates an AI assistant that responds just like you would
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold mb-4">Upload Your Data</h3>
              <p className="text-gray-600 mb-4">Connect WhatsApp Business and upload past chats</p>
              <div className="bg-green-50 rounded-lg p-4">
                <Check className="w-6 h-6 text-green-600 mb-2 mx-auto" />
                <p className="text-sm font-semibold">5-minute setup</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold mb-4">AI Learns Your Style</h3>
              <p className="text-gray-600 mb-4">Creates instant responses in your brand voice</p>
              <div className="bg-blue-50 rounded-lg p-4">
                <Bot className="w-6 h-6 text-blue-600 mb-2 mx-auto" />
                <p className="text-sm font-semibold">Auto-learns your style</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold mb-4">Start Responding</h3>
              <p className="text-gray-600 mb-4">Get AI suggestions in WhatsApp Web instantly</p>
              <div className="bg-purple-50 rounded-lg p-4">
                <Zap className="w-6 h-6 text-purple-600 mb-2 mx-auto" />
                <p className="text-sm font-semibold">10x faster replies</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Comparison */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-teal-50 relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Transform Your WhatsApp Support
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Before */}
            <div className="bg-red-50 rounded-2xl p-8 border-2 border-red-200">
              <h3 className="text-2xl font-bold text-red-800 mb-6">Without SmartDesk</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs">✕</span>
                  </div>
                  <p className="text-gray-700">Hours spent on repetitive questions</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs">✕</span>
                  </div>
                  <p className="text-gray-700">Customers wait hours for responses</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs">✕</span>
                  </div>
                  <p className="text-gray-700">Lost sales due to slow replies</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs">✕</span>
                  </div>
                  <p className="text-gray-700">Inconsistent answers from team</p>
                </div>
              </div>
            </div>

            {/* After */}
            <div className="bg-green-50 rounded-2xl p-8 border-2 border-green-200">
              <h3 className="text-2xl font-bold text-green-800 mb-6">With SmartDesk</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">90% queries answered instantly</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">Customers get replies in seconds</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">Capture every sales opportunity</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">Perfect consistency every time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-white relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            WhatsApp is overwhelming your team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
                <Clock className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-semibold mb-2">Slow Responses</h3>
              <p className="text-sm text-gray-600">Customers expect replies in minutes, not hours</p>
            </div>
            <div className="text-center group hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                <MessageSquare className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">Repetitive Questions</h3>
              <p className="text-sm text-gray-600">Same queries asked 100 times a day</p>
            </div>
            <div className="text-center group hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-200 transition-colors">
                <Users className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold mb-2">Inconsistent Answers</h3>
              <p className="text-sm text-gray-600">Different team members, different responses</p>
            </div>
            <div className="text-center group hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Lost Sales</h3>
              <p className="text-sm text-gray-600">Every delayed response is money lost</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50 relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything you need to scale customer support
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-600 text-white rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Instant FAQ Matching</h3>
              <p className="text-gray-600">
                70% of customer queries get instant, accurate responses from your FAQ database
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center mb-4">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Context-Aware AI</h3>
              <p className="text-gray-600">
                For complex queries, AI analyzes conversation history and generates perfect responses
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">One-Click Response</h3>
              <p className="text-gray-600">
                Review AI suggestions and insert them into WhatsApp with a single click
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-orange-600 text-white rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Tone Customization</h3>
              <p className="text-gray-600">
                Choose between Friendly or Formal tone to match your brand personality
              </p>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-teal-600 text-white rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Smart Escalation</h3>
              <p className="text-gray-600">
                Complex queries automatically escalate to your team via Slack with full context
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Response Analytics</h3>
              <p className="text-gray-600">
                Track response times, customer satisfaction, and revenue impact in real-time
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-4">
            Limited-Time July Pricing 🔥
          </h2>
          <p className="text-xl text-gray-600 text-center mb-4">
            Save up to ₹2,000/month - offer expires July 31st!
          </p>
          <p className="text-lg text-gray-500 text-center mb-12">
            Choose the plan that fits your team size
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter Plan */}
            <div 
              className={`rounded-2xl p-8 cursor-pointer transition-all transform hover:scale-105 ${
                selectedPlan === 'starter' 
                  ? 'bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-500' 
                  : 'bg-gray-50 border-2 border-gray-200'
              }`}
              onClick={() => setSelectedPlan('starter')}
            >
              <h3 className="text-2xl font-bold mb-2">Starter</h3>
              <p className="text-4xl font-bold mb-4">₹999<span className="text-lg font-normal">/month</span></p>
              <p className="text-gray-600 mb-6">For solo entrepreneurs</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">1 WhatsApp number</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Up to 1,000 messages/month</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">15 FAQ templates</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Basic analytics</span>
                </li>
              </ul>
              <Button 
                className="w-full"
                variant={selectedPlan === 'starter' ? 'default' : 'outline'}
                onClick={(e) => {
                  e.stopPropagation();
                  handleGetStarted();
                }}
              >
                Get Started
              </Button>
            </div>

            {/* Growth Plan */}
            <div 
              className={`rounded-2xl p-8 cursor-pointer transition-all relative transform hover:scale-105 ${
                selectedPlan === 'growth' 
                  ? 'bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-500' 
                  : 'bg-gray-50 border-2 border-gray-200'
              }`}
              onClick={() => setSelectedPlan('growth')}
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-4">Growth</h3>
              <CountdownTimer />
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-4xl font-bold text-green-600">₹999<span className="text-lg font-normal">/month</span></p>
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">July Only!</span>
                </div>
                <p className="text-lg text-gray-500 line-through">₹2,999/month</p>
              </div>
              <p className="text-gray-600 mb-6">For growing teams (4-5 people)</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">3 WhatsApp numbers</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Up to 5,000 messages/month</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">50 FAQ templates</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Slack integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Advanced analytics</span>
                </li>
              </ul>
              <Button 
                className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
                onClick={(e) => {
                  e.stopPropagation();
                  handleGetStarted();
                }}
              >
                Get Started
              </Button>
            </div>

            {/* Scale Plan */}
            <div 
              className={`rounded-2xl p-8 cursor-pointer transition-all transform hover:scale-105 ${
                selectedPlan === 'scale' 
                  ? 'bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-500' 
                  : 'bg-gray-50 border-2 border-gray-200'
              }`}
              onClick={() => setSelectedPlan('scale')}
            >
              <h3 className="text-2xl font-bold mb-2">Scale</h3>
              <p className="text-4xl font-bold mb-4">₹9,999<span className="text-lg font-normal">/month</span></p>
              <p className="text-gray-600 mb-6">For growing businesses</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Unlimited WhatsApp numbers</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Up to 20,000 messages/month</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Unlimited FAQ templates</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Priority support</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Custom integrations</span>
                </li>
              </ul>
              <Button 
                className="w-full"
                variant={selectedPlan === 'scale' ? 'default' : 'outline'}
                onClick={(e) => {
                  e.stopPropagation();
                  handleGetStarted();
                }}
              >
                Contact Sales
              </Button>
            </div>
          </div>

          <p className="text-center text-gray-600 mt-8">
            All plans include 14-day free trial • No credit card required
          </p>
          
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-6 mt-8 text-center">
            <p className="text-lg font-semibold text-red-800 mb-2">
              ⚠️ July Special Pricing Ends Soon!
            </p>
            <p className="text-gray-700">
              After July 31st, Growth plan returns to ₹2,999/month. Lock in your savings today!
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50 relative z-10">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold mb-2">How does SmartDesk work with WhatsApp Web?</h3>
              <p className="text-gray-600">
                SmartDesk works through a lightweight browser extension that integrates seamlessly with WhatsApp Web. It reads incoming messages and suggests responses in a sidebar without interfering with your WhatsApp interface.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold mb-2">Is my data secure?</h3>
              <p className="text-gray-600">
                Yes, absolutely. All your data is encrypted and stored securely. We never share your customer data with third parties, and you maintain complete control over your information.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold mb-2">Can I customize the AI responses?</h3>
              <p className="text-gray-600">
                Yes! SmartDesk learns from your communication style and allows you to choose between different tones (Friendly or Formal). You can also edit any suggested response before sending.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold mb-2">What happens to complex queries?</h3>
              <p className="text-gray-600">
                For queries that require human attention, SmartDesk automatically escalates them to your team via Slack with full conversation context, ensuring nothing falls through the cracks.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold mb-2">Do I need technical knowledge to set it up?</h3>
              <p className="text-gray-600">
                Not at all! SmartDesk is designed for non-technical users. The setup takes just 5 minutes - upload your past chats and documents, and you&apos;re ready to go.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-teal-600 text-white relative z-10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to 10x your WhatsApp response speed?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Join 100+ growing businesses already using SmartDesk to delight customers
          </p>
          <Button 
            size="lg"
            onClick={handleGetStarted}
            className="bg-white text-green-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold transform hover:scale-105 transition-all"
          >
            Start Your 14-Day Free Trial
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
          <p className="text-sm text-green-100 mt-4">
            No credit card required • Setup in 5 minutes
          </p>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 6s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }
        
        .animate-fade-in-delayed {
          animation: fadeIn 0.8s ease-out;
          animation-delay: 0.3s;
          animation-fill-mode: both;
        }
        
        .animate-slide-up {
          animation: slideUp 0.8s ease-out;
        }
        
        .animate-slide-up-delayed {
          animation: slideUp 0.8s ease-out;
          animation-delay: 0.2s;
          animation-fill-mode: both;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default SmartDeskPage;