"use client";

import React, { useState } from "react";
import { MessageSquare, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import { scrollToElement } from "@/utils/scrollToElement";
import { Button } from "@/components/ui/button";
import FeaturesOverlay from "@/components/sections/FeaturesOverlay";

const industries = [
  { name: "Healthcare", slug: "healthcare-and-wellness" },
  { name: "Education", slug: "education" },
  { name: "Finance", slug: "finance-and-legal" },
  { name: "Real Estate", slug: "real-estate-and-housing" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const pathname = usePathname();

  // const handleNavClick = (
  //   e: React.MouseEvent<HTMLAnchorElement>,
  //   sectionId: string
  // ) => {
  //   if (pathname === "/" || pathname === "/smartdesk") {
  //     e.preventDefault();
  //     scrollToElement(sectionId);
  //   }
  //   setMobileOpen(false);
  // };

  // Common class for glassmorphic navigation items
  const navItemClasses = "glassmorphic-nav-item text-gray-700 rounded-md px-4 py-2 text-sm font-medium transition-all duration-300";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="glassmorphic-header">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <div className="relative">
              <MessageSquare className="w-8 h-8 text-blue-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900 leading-tight">
                ConversAI Labs
              </span>
              <span className="text-xs text-gray-500 -mt-1">
                AI-Powered Conversations
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4 lg:pr-0">
            <button
              onClick={() => setFeaturesOpen(true)}
              className={navItemClasses}
            >
              Features
            </button>

            {pathname !== "/smartdesk" && industries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className={navItemClasses}
              >
                {industry.name}
              </Link>
            ))}

            <Button
              onClick={() => window.open('/schedule-demo', '_self')}
              className="glassmorphic-primary-button px-5 py-2 text-sm rounded-md font-medium"
            >
              Schedule Demo
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
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="lg:hidden glassmorphic-mobile-menu mx-4 mt-2 rounded-lg">
          <div className="flex flex-col px-6 py-4 space-y-2 text-sm">
            <button
              onClick={() => {
                setFeaturesOpen(true);
                setMobileOpen(false);
              }}
              className="text-gray-800 hover:text-blue-600 font-medium py-2 text-left"
            >
              Features
            </button>

            {pathname !== "/smartdesk" && industries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="text-gray-800 hover:text-blue-600 font-medium py-2"
                onClick={() => setMobileOpen(false)}
              >
                {industry.name}
              </Link>
            ))}

            <Button
              onClick={() => {
                  window.open('/schedule-demo', '_self');
                  setMobileOpen(false);
              }}
              className="w-full mt-4 glassmorphic-primary-button"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
        )}
      </header>

      {/* Features Overlay */}
      <FeaturesOverlay isOpen={featuresOpen} onClose={() => setFeaturesOpen(false)} />

      <style jsx global>{`
        .glassmorphic-header {
          background: linear-gradient(135deg,
            rgba(255, 255, 255, 0.25) 0%,
            rgba(255, 255, 255, 0.2) 100%);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow:
            0 4px 16px rgba(0, 0, 0, 0.03),
            0 2px 8px rgba(0, 0, 0, 0.02),
            inset 0 1px 1px rgba(255, 255, 255, 0.5);
        }

        .glassmorphic-nav-item {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .glassmorphic-nav-item:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.25);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .glassmorphic-primary-button {
          background: linear-gradient(135deg,
            rgba(59, 130, 246, 0.1) 0%,
            rgba(147, 51, 234, 0.1) 100%);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(59, 130, 246, 0.2);
          color: #1e40af;
          box-shadow:
            0 4px 12px rgba(59, 130, 246, 0.1),
            inset 0 1px 1px rgba(255, 255, 255, 0.2);
        }

        .glassmorphic-primary-button:hover {
          background: linear-gradient(135deg,
            rgba(59, 130, 246, 0.15) 0%,
            rgba(147, 51, 234, 0.15) 100%);
          transform: translateY(-1px) scale(1.02);
          box-shadow:
            0 6px 20px rgba(59, 130, 246, 0.15),
            inset 0 1px 1px rgba(255, 255, 255, 0.3);
        }

        .glassmorphic-mobile-menu {
          background: linear-gradient(135deg,
            rgba(255, 255, 255, 0.95) 0%,
            rgba(255, 255, 255, 0.9) 100%);
          backdrop-filter: blur(20px) saturate(150%);
          -webkit-backdrop-filter: blur(20px) saturate(150%);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow:
            0 10px 40px rgba(0, 0, 0, 0.08),
            inset 0 1px 1px rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </>
  );
};

export default Header;