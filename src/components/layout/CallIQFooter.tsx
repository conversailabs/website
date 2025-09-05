"use client";

import React from "react";
import { Brain, Mail, Phone, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const CallIQFooter = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white" style={{ color: 'white' }}>Call IQ</h3>
                <p className="text-xs text-gray-400">by ConversAI Labs</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Building AI for Sales Teams. We decode winning patterns from top performers 
              to help entire teams close like champions.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-white" style={{ color: 'white' }}>Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#problem" 
                  className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                >
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  The Problem We Solve
                </a>
              </li>
              <li>
                <a 
                  href="#how-it-works" 
                  className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                >
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  How CallIQ Works
                </a>
              </li>
              <li>
                <a 
                  href="#benefits" 
                  className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                >
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  Benefits
                </a>
              </li>
              <li>
                <Link 
                  href="/" 
                  className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                >
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  Back to ConversAI Labs
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-white" style={{ color: 'white' }}>Join the Beta</h4>
            <p className="text-gray-300">
              Be among the first 10 companies to shape the future of sales intelligence.
            </p>
            <a 
              href="https://wa.me/918076018082" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Apply for Early Access
              <ArrowRight className="w-4 h-4" />
            </a>
            
            <div className="pt-4 space-y-2">
              <a 
                href="https://wa.me/918076018082" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>+91 807 601 8082</span>
              </a>
              <a 
                href="mailto:connect@conversailabs.com" 
                className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>connect@conversailabs.com</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm text-gray-400">
                © 2025 ConversAI Labs | Building AI for Sales Teams
              </p>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="/policy" className="text-gray-400 hover:text-white transition-colors">
                Privacy
              </Link>
              <a 
                href="https://wa.me/918076018082" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
    </footer>
  );
};

export default CallIQFooter;