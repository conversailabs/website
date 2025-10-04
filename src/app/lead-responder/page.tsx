'use client';

import { useState, useEffect } from 'react';
import { Check, MessageSquare, Clock, TrendingUp, ChevronRight, Phone, Zap, Users, ArrowRight, Star, BarChart3, Target, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { motion } from 'framer-motion';
import Footer from '@/components/layout/Footer';
import ContactModal from '@/components/forms/ContactModal';

export default function LeadResponderPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Height of fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'problem', 'solution', 'demo', 'how-it-works', 'pricing', 'faq'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'problem', label: 'Problem' },
    { id: 'solution', label: 'Solution' },
    { id: 'demo', label: 'Demo' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'faq', label: 'FAQ' }
  ];

  return (
    <>
      {/* Custom Header for Landing Page */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                LeadResponder AI
              </h2>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                    activeSection === item.id ? 'text-blue-600' : 'text-gray-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Button 
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={() => setIsContactModalOpen(true)}
              >
                Start Free Trial
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden py-4 border-t border-gray-200"
            >
              <nav className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left px-4 py-2 text-sm font-medium transition-colors hover:text-blue-600 ${
                      activeSection === item.id ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <div className="px-4 pt-3">
                  <Button 
                    size="sm"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsContactModalOpen(true);
                    }}
                  >
                    Start Free Trial
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </div>
      </header>

      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <section id="home" className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden pt-24 pb-20">
          {/* Background Animation */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-10 left-4 w-40 h-40 sm:w-72 sm:h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
            <div className="absolute top-32 right-4 w-40 h-40 sm:w-72 sm:h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
            <div className="absolute -bottom-8 left-20 w-40 h-40 sm:w-72 sm:h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                AI WhatsApp Agents for UK Estate Agents
              </span>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Be the First Agent in Your Area with
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  24/7 AI WhatsApp Response
                </span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
                While you&apos;re at dinner, sleeping, or showing properties, your competition is stealing your WhatsApp leads. 
                Get a dedicated AI WhatsApp number that never stops working.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold"
                  onClick={() => setIsContactModalOpen(true)}
                >
                  Start Free 14-Day Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => scrollToSection('demo')}
                  className="border-2 border-gray-300 hover:border-blue-500 px-8 py-4 text-lg font-semibold"
                >
                  Watch Live Demo
                </Button>
              </div>
              
              <p className="text-xs sm:text-sm text-gray-500 italic">
                No credit card required • Setup in 2 hours • Cancel anytime
              </p>
            </motion.div>
          </div>
        </section>

        {/* Problem Section */}
        <section id="problem" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  You Know These Painful Moments
                </h2>
                <p className="text-base sm:text-lg text-gray-600">
                  Every UK estate agent loses £8,000+ monthly from slow WhatsApp responses
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card className="bg-red-50 border-red-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <Clock className="w-10 h-10 text-red-600 mb-4" />
                    <h3 className="font-bold text-gray-900 mb-2">9:47 PM - Rightmove Inquiry</h3>
                    <p className="text-gray-700 mb-3">
                      You&apos;re watching Netflix. You&apos;ll reply tomorrow.
                    </p>
                    <p className="text-red-600 font-semibold">
                      Tomorrow: They&apos;ve already booked with another agent.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-red-50 border-red-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <Users className="w-10 h-10 text-red-600 mb-4" />
                    <h3 className="font-bold text-gray-900 mb-2">2:23 AM - Dubai Investor</h3>
                    <p className="text-gray-700 mb-3">
                      International buyer messages. You&apos;re sleeping.
                    </p>
                    <p className="text-red-600 font-semibold">
                      8 AM: They bought from someone who responded instantly.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-red-50 border-red-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <MessageSquare className="w-10 h-10 text-red-600 mb-4" />
                    <h3 className="font-bold text-gray-900 mb-2">Weekend Viewings</h3>
                    <p className="text-gray-700 mb-3">
                      Showing properties all day. 12 WhatsApp messages piling up.
                    </p>
                    <p className="text-red-600 font-semibold">
                      Monday: Half of them found other agents.
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-gray-300">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">The Cold, Hard Numbers</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">78%</p>
                      <p className="text-gray-600 mt-2">of buyers expect responses within 1 hour</p>
                    </div>
                    <div>
                      <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">4-12 hrs</p>
                      <p className="text-gray-600 mt-2">Average agent response time</p>
                    </div>
                    <div>
                      <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">£8,000</p>
                      <p className="text-gray-600 mt-2">Monthly revenue lost from slow responses</p>
                    </div>
                  </div>
                  <p className="mt-6 text-sm text-gray-500">*Source: Rightmove Agent Report 2023</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Solution Section */}
        <section id="solution" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Your Dedicated AI WhatsApp Number
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
                Get a second WhatsApp number powered by AI that works alongside your main number. 
                Never touch your existing WhatsApp. Zero risk.
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {[
                  { 
                    icon: Phone, 
                    title: 'New WhatsApp Number',
                    description: 'We provide a dedicated WhatsApp Business number for AI'
                  },
                  { 
                    icon: MessageSquare, 
                    title: 'Add to Listings',
                    description: 'Include "24/7 WhatsApp: 07XXX" on Rightmove'
                  },
                  { 
                    icon: Zap, 
                    title: 'Instant AI Response',
                    description: 'AI responds to every message within seconds'
                  },
                  { 
                    icon: Users, 
                    title: 'Qualified Leads',
                    description: 'Hot leads forwarded to your personal phone'
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="bg-white hover:shadow-lg transition-all hover:-translate-y-1">
                      <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          <item.icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
              
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold"
                onClick={() => setIsContactModalOpen(true)}
              >
                Claim Your AI Number - Free Trial
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Live Demo Section */}
        <section id="demo" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Watch AI Handle Real Property Inquiries
                </h2>
                <p className="text-base sm:text-lg text-gray-600">
                  Actual WhatsApp conversation from yesterday at 11:47 PM
                </p>
              </div>
              
              <Card className="overflow-hidden border-2 border-blue-200">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 sm:p-8">
                    <div className="space-y-4 max-w-3xl mx-auto">
                      {[
                        { type: 'buyer', time: '11:47 PM', message: 'Hi, is the 2-bed flat in Canary Wharf still available?' },
                        { type: 'ai', time: '11:47 PM', message: 'Hi! Yes, the 2-bedroom flat at Canary Wharf (£650,000) is still available. It features 2 bedrooms, 2 bathrooms, and a private balcony. When were you looking to view?' },
                        { type: 'buyer', message: 'This weekend possible?' },
                        { type: 'ai', message: 'I can arrange a viewing this Saturday or Sunday. What&apos;s your preferred time? Morning (10-12), Afternoon (1-4), or Evening (5-7)?' },
                        { type: 'buyer', message: 'Saturday afternoon works' },
                        { type: 'ai', message: 'Perfect! To confirm your Saturday afternoon viewing, could you share your budget range? This helps ensure we show you the most suitable properties.' },
                        { type: 'buyer', message: '650-750k' },
                        { type: 'ai', message: 'Excellent, you&apos;re within range. I&apos;ll book you for Saturday at 2 PM. What&apos;s your name and best contact number?' }
                      ].map((msg, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: msg.type === 'buyer' ? -20 : 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className={`flex items-start gap-3 ${msg.type === 'ai' ? 'flex-row-reverse' : ''}`}
                        >
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0 ${
                            msg.type === 'buyer' ? 'bg-blue-500' : 'bg-gradient-to-r from-blue-600 to-purple-600'
                          }`}>
                            {msg.type === 'buyer' ? 'B' : 'AI'}
                          </div>
                          <div className={`flex-1 ${msg.type === 'ai' ? 'text-right' : ''}`}>
                            {msg.time && (
                              <p className="text-xs text-gray-500 mb-1">{msg.type === 'buyer' ? 'Buyer' : 'AI Agent'} • {msg.time}</p>
                            )}
                            <div className={`inline-block rounded-lg p-3 ${
                              msg.type === 'buyer' 
                                ? 'bg-white shadow-sm border border-gray-200' 
                                : 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200'
                            }`}>
                              <p className="text-gray-800">{msg.message}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      viewport={{ once: true }}
                      className="mt-8 text-center"
                    >
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        <Check className="w-4 h-4" />
                        Lead qualified and forwarded to agent
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Early Access Program */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-50 to-white">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-12">
                <Badge variant="default" className="mb-4 bg-purple-600">LIMITED OFFER</Badge>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Exclusive Launch for Forward-Thinking Agents
                </h2>
                <p className="text-base sm:text-lg text-gray-600">
                  We&apos;re selecting <strong>20 UK estate agents</strong> for our founder program
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-white hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500" />
                      What You Get
                    </h3>
                    <ul className="space-y-4">
                      {[
                        '14-day free trial (no card required)',
                        '£197/month after trial (normally £297)',
                        'Founder pricing locked forever',
                        'Priority support direct to founders',
                        'Input on new features',
                        'First access to voice AI (coming soon)'
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <Target className="w-5 h-5 text-blue-600" />
                      Perfect For Agents Who
                    </h3>
                    <ul className="space-y-4">
                      {[
                        'Get WhatsApp inquiries from Rightmove/Zoopla',
                        'Want to capture after-hours leads',
                        'Are tired of losing international buyers',
                        'Want competitive advantage in their area',
                        'Believe AI is the future of real estate',
                        'Are willing to provide feedback'
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <ChevronRight className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <div className="text-center mt-8">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold"
                  onClick={() => setIsContactModalOpen(true)}
                >
                  Apply for Early Access
                </Button>
                <p className="mt-4 text-sm text-gray-500">
                  *Applications close when 20 spots fill
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  From Sign-Up to First Lead: 2 Hours
                </h2>
                <p className="text-base sm:text-lg text-gray-600">
                  Simple setup process that gets you running today
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    step: '1',
                    title: 'Get Your AI Number',
                    time: '30 mins',
                    description: 'We provide a new WhatsApp Business number with complete technical setup'
                  },
                  {
                    step: '2',
                    title: 'Train Your AI',
                    time: '45 mins',
                    description: 'Upload property listings, set qualifying questions, choose response style'
                  },
                  {
                    step: '3',
                    title: 'Add to Marketing',
                    time: '45 mins',
                    description: 'Update Rightmove, website, and Instagram with your new 24/7 number'
                  },
                  {
                    step: '4',
                    title: 'Watch Leads Flow',
                    time: 'Ongoing',
                    description: 'AI responds instantly, qualified leads sent to your phone'
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="bg-gradient-to-b from-gray-50 to-white hover:shadow-lg transition-all h-full">
                      <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                          {item.step}
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-sm text-blue-600 font-semibold mb-3">{item.time}</p>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
              
              <div className="text-center mt-12">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold"
                  onClick={() => setIsContactModalOpen(true)}
                >
                  Start Your 2-Hour Setup
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Simple, Transparent Pricing
                </h2>
                <p className="text-base sm:text-lg text-gray-600">
                  One plan, everything included, cancel anytime
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <Card className="bg-white border-2 border-blue-200">
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Early Access Pricing</h3>
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">£197</span>
                        <span className="text-gray-600">/month</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2 line-through">Normal price: £297/month</p>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">14-day free trial</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">No credit card required</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">Cancel anytime</span>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      onClick={() => setIsContactModalOpen(true)}
                    >
                      Start Free Trial
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-gray-50 to-blue-50">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Everything Included</h3>
                    <ul className="space-y-3">
                      {[
                        'Dedicated WhatsApp Business number',
                        'Unlimited conversations',
                        'Unlimited property listings',
                        'Calendar integration',
                        'All qualified leads forwarded',
                        'Conversation dashboard',
                        'UK-based support',
                        'Regular AI improvements'
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Quick ROI Math</h3>
                  <div className="grid md:grid-cols-3 gap-6 text-center">
                    <div>
                      <BarChart3 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-gray-600">Your Investment</p>
                      <p className="text-2xl font-bold">£197/mo</p>
                    </div>
                    <div>
                      <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <p className="text-gray-600">One Extra Deal</p>
                      <p className="text-2xl font-bold text-green-600">£5,000+</p>
                    </div>
                    <div>
                      <Zap className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <p className="text-gray-600">Payback Period</p>
                      <p className="text-2xl font-bold text-purple-600">1.5 days</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
                Frequently Asked Questions
              </h2>
              
              <Accordion type="single" collapsible className="space-y-4">
                {[
                  {
                    question: 'Why do I need a new WhatsApp number?',
                    answer: 'WhatsApp Business API requires a dedicated number. This keeps your personal WhatsApp unchanged and risk-free. You continue using your personal number as normal.'
                  },
                  {
                    question: 'How do clients know about my AI number?',
                    answer: 'Add it to your listings as "24/7 WhatsApp Response: 07XXX". Marketing it as always-available actually attracts more inquiries.'
                  },
                  {
                    question: 'Will clients know it&apos;s AI?',
                    answer: 'Your choice. Most agents say "AI assistant for instant response" - clients actually prefer the speed over waiting hours for a human.'
                  },
                  {
                    question: 'What if the AI makes mistakes?',
                    answer: 'You see every conversation in your dashboard. You can jump in anytime. Complex queries automatically forward to you.'
                  },
                  {
                    question: 'Can I customize the AI responses?',
                    answer: 'Yes! Set your tone (formal/friendly), qualifying questions, property details, and brand voice. The AI adapts to match your style.'
                  },
                  {
                    question: 'Why should I trust a new service?',
                    answer: 'That&apos;s why we offer 14 days free with no card required. Test it risk-free. Most agents see their first qualified lead within 48 hours.'
                  }
                ].map((item, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`} 
                    className="bg-gray-50 rounded-lg border border-gray-200 px-6"
                  >
                    <AccordionTrigger className="text-left hover:no-underline">
                      <span className="font-semibold text-gray-900">{item.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-purple-600">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
                Two Types of Agents in 2025
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="bg-white/10 backdrop-blur border-white/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3">Type 1: The Old Way</h3>
                    <p className="text-white/90">
                      Responds to WhatsApp when they can. Loses leads every night and weekend.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/20 backdrop-blur border-white/30">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3">Type 2: The Smart Way</h3>
                    <p className="text-white/90">
                      Has AI responding 24/7. Captures every opportunity. Dominates their area.
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <p className="text-2xl font-semibold text-white mb-8">
                Which one wins more listings?
              </p>
              
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                onClick={() => setIsContactModalOpen(true)}
              >
                Be Type 2 - Start Free Trial
              </Button>
              
              <p className="mt-6 text-white/80">
                14 days free • No credit card • 2-hour setup
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </>
  );
}