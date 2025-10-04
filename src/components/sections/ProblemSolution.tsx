'use client';

import React from 'react';
import { Clock, Users, Phone, TrendingDown, CheckCircle, Zap, Target, Shield } from 'lucide-react';

const ProblemSolution = () => {
  const problems = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Leads Go Cold While You Sleep",
      description: "78% of customers expect immediate responses, but your team can't be available 24/7",
      stat: "78% expect instant response",
      color: "from-red-500 to-red-600"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Human Agents Can't Scale",
      description: "Hiring and training sales staff is expensive and time-consuming",
      stat: "Average cost per hire: ₹3,95,000",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Missed Calls = Lost Revenue",
      description: "Every missed call is a potential customer going to your competition",
      stat: "Companies miss 27% of calls",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      icon: <TrendingDown className="w-8 h-8" />,
      title: "Inconsistent Lead Qualification",
      description: "Different sales reps ask different questions, leading to poor data quality",
      stat: "60% of leads poorly qualified",
      color: "from-purple-500 to-purple-600"
    }
  ];

  const solutions = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Voice Response",
      description: "AI voice agents answer phone calls within seconds, 24/7/365",
      benefit: "Never miss another call",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Perfect Phone Qualification",
      description: "Consistent voice conversations and data extraction from every phone call",
      benefit: "Voice-qualified leads",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Voice Scales Infinitely",
      description: "Handle thousands of phone calls simultaneously without hiring",
      benefit: "Unlimited voice capacity",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Voice Agent ROI",
      description: "One AI voice agent costs less than one part-time caller",
      benefit: "90% phone cost reduction",
      color: "from-teal-500 to-teal-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Stop Losing Leads to Slow Response Times
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              While you&apos;re sleeping, your competitors are answering phone calls and capturing leads. Here&apos;s how ConversAI Labs voice agents solve the biggest challenges in phone-based lead management.
            </p>
          </div>

          {/* Problems Section */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">
              The Problems Costing You Revenue
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {problems.map((problem, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${problem.color} rounded-xl flex items-center justify-center mb-4`}>
                    <div className="text-white">
                      {problem.icon}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    {problem.title}
                  </h4>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {problem.description}
                  </p>
                  
                  {/* Stat */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm font-semibold text-gray-900">{problem.stat}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Solution Arrow */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-4 bg-white rounded-full px-8 py-4 shadow-lg">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ConversAI Labs Solution
              </span>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          {/* Solutions Section */}
          <div>
            <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">
              How We Fix Every Problem
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {solutions.map((solution, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                >
                  {/* Benefit Badge */}
                  <div className="absolute top-4 right-4 bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-semibold">
                    {solution.benefit}
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${solution.color} rounded-xl flex items-center justify-center mb-4`}>
                    <div className="text-white">
                      {solution.icon}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    {solution.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {solution.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ROI Comparison */}
          <div className="mt-20 bg-white rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">
              The Math is Simple
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Without ConversAI */}
              <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200">
                <h4 className="text-xl font-bold text-red-800 mb-4">Without ConversAI Labs</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">2 Sales Reps (salary + benefits)</span>
                    <span className="font-semibold text-red-700">₹1,00,00,000/year</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Missed calls (27%)</span>
                    <span className="font-semibold text-red-700">-₹1,68,00,000 lost revenue</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Inconsistent qualification</span>
                    <span className="font-semibold text-red-700">-40% lead quality</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between">
                    <span className="text-lg font-bold text-red-800">Total Annual Impact</span>
                    <span className="text-lg font-bold text-red-700">-₹2,68,00,000</span>
                  </div>
                </div>
              </div>

              {/* With ConversAI */}
              <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                <h4 className="text-xl font-bold text-green-800 mb-4">With ConversAI Labs</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">ConversAI Voice Professional Plan</span>
                    <span className="font-semibold text-green-700">₹10,00,000/year</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">24/7 phone availability</span>
                    <span className="font-semibold text-green-700">+₹1,68,00,000 captured revenue</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Perfect voice qualification</span>
                    <span className="font-semibold text-green-700">+85% lead quality</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between">
                    <span className="text-lg font-bold text-green-800">Total Annual Impact</span>
                    <span className="text-lg font-bold text-green-700">+₹1,58,00,000</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ROI Summary */}
            <div className="mt-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-6">
              <h4 className="text-2xl font-bold mb-2">Total ROI: 1,567%</h4>
              <p className="text-blue-100">
                ConversAI Labs pays for itself in the first month and generates ₹4,26,00,000 in additional value annually
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;