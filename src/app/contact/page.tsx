'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Phone, MapPin, Clock, MessageSquare } from 'lucide-react';

const ContactPage: React.FC = () => {

  const handleWhatsApp = () => {
    window.open('https://wa.me/918076018082', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      <div className="pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ready to transform your customer interactions with AI? We&apos;re here to help you get started.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Options */}
            <div className="order-2 lg:order-1">
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
                <p className="text-gray-600 mb-8">Connect with our team instantly via WhatsApp. We&apos;ll respond within 24 hours.</p>
                
                <button
                  onClick={handleWhatsApp}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center gap-3 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <MessageSquare className="w-6 h-6" />
                  Chat with us on WhatsApp
                </button>
                
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="flex items-center justify-center gap-2 text-gray-600">
                    <Phone className="w-5 h-5 text-green-600" />
                    <span className="font-semibold">+91 8076 018 082</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-500 mt-6">
                  Available Monday - Friday: 10:00 AM - 6:00 PM IST
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="order-1 lg:order-2 space-y-8">
              {/* Quick Contact Card */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold mb-6">Connect Instantly</h2>
                <div className="space-y-4">
                  <button
                    onClick={handleWhatsApp}
                    className="w-full flex items-center gap-4 p-4 rounded-lg bg-green-50 hover:bg-green-100 transition text-left"
                  >
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold">WhatsApp Us</p>
                      <p className="text-gray-600">+91 8076 018 082</p>
                    </div>
                  </button>

                  <a
                    href="tel:+918076018082"
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold">Call Us</p>
                      <p className="text-gray-600">+91 8076 018 082</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Office Location */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold mb-6">Visit Our Office</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Address</p>
                      <p className="text-gray-600">
                        ConversAI Labs<br />
                        Sector 62, Noida<br />
                        Uttar Pradesh, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Business Hours</p>
                      <p className="text-gray-600">
                        Monday - Friday: 10:00 AM - 6:00 PM IST<br />
                        Saturday - Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-6 text-center">
                <p className="text-lg font-semibold mb-2">
                  We typically respond within 24-48 hours
                </p>
                <p className="text-sm opacity-90">
                  For urgent inquiries, please call us directly or use WhatsApp
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;