"use client";

import React from "react";
import CallIQHeader from "@/components/layout/CallIQHeader";
import CallIQFooter from "@/components/layout/CallIQFooter";
import { 
  Brain, 
  TrendingUp, 
  Users, 
  Upload,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Star,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, useScroll, useTransform } from "framer-motion";

const CallIQPage = () => {
  const { scrollYProgress } = useScroll();
  
  // Parallax effects
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  const howItWorks = [
    {
      step: "1",
      title: "Upload your sales call recording",
      icon: <Upload className="w-6 h-6" />,
      color: "from-blue-500 to-blue-600"
    },
    {
      step: "2", 
      title: "Get AI-powered analysis in minutes",
      icon: <Brain className="w-6 h-6" />,
      color: "from-purple-500 to-purple-600"
    },
    {
      step: "3",
      title: "Coach your team with data-driven insights",
      icon: <Users className="w-6 h-6" />,
      color: "from-green-500 to-green-600"
    }
  ];

  const benefits = [
    "Spot winning patterns from top performers",
    "Know exactly where deals go wrong",
    "Scale your best rep's approach to everyone",
    "25% improvement in close rates"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
      <CallIQHeader />
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <motion.section 
        style={{ y: heroY, opacity: heroOpacity }}
        className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              AI-Powered Sales Intelligence
              <Sparkles className="w-4 h-4" />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl sm:text-7xl font-bold text-gray-900 mb-6"
            >
              Turn Every Sales Rep Into
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient-x">
                Your Top Performer
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-12"
            >
              AI-powered sales intelligence that analyzes calls to show why deals win or lose
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <a href="https://wa.me/918076018082" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 w-full">
                  Get Early Access
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-12 mx-auto max-w-4xl"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-2xl blur-xl opacity-20 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-purple-200 shadow-2xl">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
                        <Star className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <p className="text-lg sm:text-xl text-gray-800 font-medium leading-relaxed">
                      Every sales team has that <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500 font-bold">ONE rep who crushes it</span>. 
                      We&apos;re building an AI tool that analyzes sales calls to decode their 
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-bold"> winning patterns</span> - 
                      helping entire teams close like top performers.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Problem Section */}
      <section id="problem" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-20 right-0 w-64 h-64 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-8"
            >
              <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 relative">
                The Sales Performance 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600"> Gap</span>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                />
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto mb-9">
              {/* Top Performer Card */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative bg-white rounded-3xl p-4 shadow-xl border border-green-100">
                  <div className="flex items-center justify-center mb-4">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      className="text-6xl"
                    >
                      🏆
                    </motion.div>
                  </div>
                  <p className="text-gray-600 text-lg mb-2">Your best rep closes</p>
                  <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                    40%
                  </div>
                  <p className="text-green-600 font-semibold mt-2">of deals</p>
                </div>
              </motion.div>

              {/* Average Performer Card */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-400 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative bg-white rounded-3xl p-4 shadow-xl border border-red-100">
                  <div className="flex items-center justify-center mb-4">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      className="text-6xl"
                    >
                      😰
                    </motion.div>
                  </div>
                  <p className="text-gray-600 text-lg mb-2">Everyone else struggles at</p>
                  <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-600">
                    15%
                  </div>
                  <p className="text-red-600 font-semibold mt-2">only</p>
                </div>
              </motion.div>
            </div>

            {/* Call IQ Solution */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-2xl opacity-10"></div>
              <div className="relative bg-gradient-to-br from-white to-purple-50 rounded-3xl p-5 shadow-2xl border border-purple-100 max-w-3xl mx-auto">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", delay: 0.7 }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6"
                >
                  <Brain className="w-8 h-8 text-white" />
                </motion.div>
                
                <h3 className="text-4xl font-bold mb-4">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    Call IQ finds out
                  </span>
                </h3>
                
                <p className="text-xl text-gray-700 leading-relaxed">
                  by analyzing every call to uncover the exact patterns that separate top performers from the rest.
                </p>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="mt-6 flex items-center justify-center gap-4"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-600">Pattern Recognition</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-600">AI Analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-600">Instant Insights</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center"
              >
                <Zap className="w-6 h-6 text-white" />
              </motion.div>
              <h2 className="text-5xl font-bold">
                <span className="text-gray-900">Simple as </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">1-2-3</span>
              </h2>
            </div>
            <p className="text-xl text-gray-600">
              Get started in minutes, see results instantly
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative"
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 border-gray-200 overflow-hidden">
                  <CardHeader>
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${item.color} text-white mb-4 text-2xl font-bold`}>
                      {item.step}
                    </div>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${item.color} text-white opacity-20`}>
                      {item.icon}
                    </div>
                  </CardContent>
                </Card>
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-center mt-12"
          >
            <a href="https://wa.me/918076018082" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="px-8 py-6 text-lg border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white rounded-full transition-all duration-300 font-semibold">
                See Sample Analysis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-green-200 to-blue-200 rounded-full opacity-20 blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", duration: 0.8 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6"
            >
              <Star className="w-4 h-4 fill-current" />
              Loved by Sales Teams
              <Star className="w-4 h-4 fill-current" />
            </motion.div>
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Why Sales Teams 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Love </span>
              Call IQ
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transform your sales performance with features that actually make a difference
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {benefits.map((benefit, index) => {
              const icons = [
                { icon: <TrendingUp className="w-8 h-8" />, color: "from-blue-500 to-blue-600", bgColor: "from-blue-50 to-blue-100" },
                { icon: <Brain className="w-8 h-8" />, color: "from-purple-500 to-purple-600", bgColor: "from-purple-50 to-purple-100" },
                { icon: <Users className="w-8 h-8" />, color: "from-green-500 to-green-600", bgColor: "from-green-50 to-green-100" },
                { icon: <Zap className="w-8 h-8" />, color: "from-orange-500 to-orange-600", bgColor: "from-orange-50 to-orange-100" }
              ];
              const currentIcon = icons[index % icons.length];
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl"></div>
                  <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                    <div className="flex items-start gap-6">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${currentIcon.bgColor} rounded-2xl flex items-center justify-center`}
                      >
                        <div className={`text-transparent bg-clip-text bg-gradient-to-r ${currentIcon.color}`}>
                          {currentIcon.icon}
                        </div>
                      </motion.div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-sm font-semibold text-green-600">PROVEN BENEFIT</span>
                        </div>
                        <p className="text-lg text-gray-800 font-semibold leading-relaxed">
                          {benefit}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section - Beta Program */}
      <section id="beta" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", duration: 0.8 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6"
          >
            <Zap className="w-10 h-10 text-white" />
          </motion.div>

          <h2 className="text-4xl font-bold text-white mb-6">
            Be Among The First
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            We&apos;re selecting 10 companies for our beta program.
            <br />
            Get free access and shape the product.
          </p>
          <a href="https://wa.me/918076018082" target="_blank" rel="noopener noreferrer">
            <Button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              Apply for Early Access
              <Sparkles className="ml-2 w-5 h-5" />
            </Button>
          </a>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-8 text-white/80 text-sm"
          >
            Limited spots available • Free during beta • Direct access to founders
          </motion.p>
        </motion.div>
      </section>

      <CallIQFooter />
      
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default CallIQPage;