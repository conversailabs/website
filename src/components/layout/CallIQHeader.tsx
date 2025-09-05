"use client";

import React, { useState } from "react";
import { Brain, Menu, X, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const CallIQHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleContactUs = () => {
    window.open("https://wa.me/918076018082", "_blank");
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-gray-200 z-50"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Back to Home + Logo */}
          <div className="flex items-center space-x-6">
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline font-medium">Back</span>
            </Link>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900 leading-tight">
                  Call IQ
                </span>
                <span className="text-xs text-gray-500">
                  by ConversAI Labs
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a
              href="#problem"
              className="text-gray-600 hover:text-blue-600 transition-all duration-300 font-medium"
            >
              The Problem
            </a>
            <a
              href="#how-it-works"
              className="text-gray-600 hover:text-blue-600 transition-all duration-300 font-medium"
            >
              How It Works
            </a>
            <a
              href="#benefits"
              className="text-gray-600 hover:text-blue-600 transition-all duration-300 font-medium"
            >
              Benefits
            </a>
            <a
              href="#beta"
              className="text-gray-600 hover:text-blue-600 transition-all duration-300 font-medium"
            >
              Beta Program
            </a>
            
            <Button
              onClick={handleContactUs}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Early Access
            </Button>
          </nav>

          {/* Mobile Hamburger Icon */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              className="text-black p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-white border-t border-gray-200 shadow-md"
        >
          <div className="flex flex-col px-6 py-4 space-y-4">
            <a
              href="#problem"
              onClick={() => setMobileOpen(false)}
              className="text-gray-800 hover:text-blue-600 font-medium"
            >
              The Problem
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileOpen(false)}
              className="text-gray-800 hover:text-blue-600 font-medium"
            >
              How It Works
            </a>
            <a
              href="#benefits"
              onClick={() => setMobileOpen(false)}
              className="text-gray-800 hover:text-blue-600 font-medium"
            >
              Benefits
            </a>
            <a
              href="#beta"
              onClick={() => setMobileOpen(false)}
              className="text-gray-800 hover:text-blue-600 font-medium"
            >
              Beta Program
            </a>

            <Button
              onClick={() => {
                handleContactUs();
                setMobileOpen(false);
              }}
              className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              Get Early Access
            </Button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default CallIQHeader;