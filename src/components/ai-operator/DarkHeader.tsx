"use client";

import React, { useState } from "react";
import { MessageSquare, Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";


const DarkHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleConnectWithUs = () => {
    window.open("https://wa.me/918076018082", "_blank");
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-950/90 backdrop-blur-md border-b border-gray-800 z-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <div className="relative">
              <MessageSquare className="w-8 h-8 text-blue-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400 rounded-full animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold !text-white leading-tight">
                ConversAI Labs
              </span>
              <span className="text-xs text-gray-400 -mt-1">
                AI-Powered Conversations
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Button
              onClick={() => window.open('/schedule-demo', '_self')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 !text-white px-6 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              style={{ cursor: 'pointer' }}
            >
              Schedule Demo
            </Button>
          </nav>

          {/* Mobile Hamburger Icon */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              className="!text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="lg:hidden bg-gray-950 border-t border-gray-800 shadow-md">
          <div className="flex flex-col px-6 py-4 space-y-2 text-sm">
            <Button
              onClick={handleConnectWithUs}
              className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 !text-white"
            >
              Connect with Us
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default DarkHeader;