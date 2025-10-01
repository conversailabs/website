"use client"
import React, { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import AIAgents from '@/components/sections/AIAgents';
import Footer from '@/components/layout/Footer';
import { updateSEO } from '@/utils/seo';
import { addStructuredData, createOrganizationStructuredData, createWebsiteStructuredData } from '@/utils/structuredData';

const Index = () => {
  useEffect(() => {
    // Update SEO metadata when component mounts
    updateSEO({
      title: 'Build AI Voice Agents That Sound Human & Convert | ConversAI',
      description: 'Create intelligent voice agents that handle phone calls like real humans. Upload your script, pick a professional voice, and let AI qualify leads 24/7 with natural conversations. Voice-first AI agent builder.',
      keywords: 'ai voice agent, voice bot, phone automation, voice ai, lead qualification calls, automated phone calls, conversational voice ai, voice agent builder, ai phone system',
      url: window.location.href,
    });
    
    // Add structured data for better search engine understanding
    addStructuredData(createOrganizationStructuredData());
    addStructuredData(createWebsiteStructuredData());
  }, []);
  return (
    <div className="w-full overflow-x-hidden">
      <Header />
      <Hero />
      <AIAgents />
      {/* <DemoSection /> */}
      {/* <ProblemSolution />
      <TechnicalFeatures />
      <AgentTemplates /> */}
      {/* <Features /> */}
      {/* <CTA /> */}
      <Footer />
    </div>
  );
};

export default Index;
