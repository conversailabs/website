"use client";

import React, { useState } from "react";
import { MessageSquare, ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const aiCrmIndustries = [
  { name: "Real Estate", slug: "real-estate" },
  { name: "Insurance", slug: "insurance" },
  { name: "Home Services", slug: "home-services" },
  { name: "SaaS & Technology", slug: "saas-technology" },
  { name: "Healthcare & Wellness", slug: "healthcare-wellness" },
];

const AICRMHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileIndustryOpen, setMobileIndustryOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/ai-crm"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <div className="relative">
              <MessageSquare className="w-8 h-8 text-blue-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900 leading-tight">
                AI CRM
              </span>
              <span className="text-xs text-gray-500 -mt-1">
                Run on Autopilot
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {/* Industries Dropdown */}
            <div className="relative group">
              <div 
                className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-all duration-300 font-medium px-3 py-2 rounded-md hover:bg-blue-50 cursor-pointer"
              >
                <span>Industries</span>
                <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
              </div>

              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-80 bg-white rounded-lg shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-40">
                <div className="py-3">
                  <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                    AI CRM Solutions
                  </div>
                  {aiCrmIndustries.map((industry, index) => (
                    <Link
                      key={index}
                      href={`/ai-crm/${industry.slug}`}
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 border-l-2 border-transparent hover:border-blue-400 transition-all"
                    >
                      {industry.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/ai-crm#pricing"
              className="text-gray-600 hover:text-blue-600 transition-all duration-300 font-medium relative group px-3 py-2 rounded-md hover:bg-blue-50"
            >
              Pricing
              <span className="absolute -bottom-1 left-3 right-3 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>

            <Button
              onClick={() => window.open('/schedule-demo', '_self')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Get Demo
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
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-md">
          <div className="flex flex-col px-6 py-4 space-y-2 text-sm">
            {/* Expandable Industries in Mobile */}
            <div>
              <button
                className="flex items-center justify-between w-full text-gray-800 font-medium hover:text-blue-600"
                onClick={() => setMobileIndustryOpen(!mobileIndustryOpen)}
              >
                <span>Industries</span>
                <ChevronDown
                  className={`w-4 h-4 transform transition-transform duration-200 ${
                    mobileIndustryOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {mobileIndustryOpen && (
                <ul className="mt-2 pl-4 border-l border-gray-200 space-y-2">
                  {aiCrmIndustries.map((industry, index) => (
                    <li key={index}>
                      <Link
                        href={`/ai-crm/${industry.slug}`}
                        className="block px-2 py-1 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-700 border-l-2 border-transparent hover:border-blue-500 transition-all"
                        onClick={() => setMobileOpen(false)}
                      >
                        {industry.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Link
              href="/ai-crm#pricing"
              className="text-gray-800 hover:text-blue-600"
              onClick={() => setMobileOpen(false)}
            >
              Pricing
            </Link>

            <Button
              onClick={() => {
                window.open('/schedule-demo', '_self');
                setMobileOpen(false);
              }}
              className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              Get Demo
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default AICRMHeader;