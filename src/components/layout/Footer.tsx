"use client";

import React, { useState } from "react";
import { MessageSquare } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ContactModal from "../forms/ContactModal";

const Footer = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  
  const footerSections = [
    {
      title: "Company",
      links: [
        { name: "Admin Panel", path: "https://dashboard.conversailabs.com/" },
        { name: "About Us", path: "/about" },
        { name: "Contact Sales", path: "#", onClick: () => setIsContactModalOpen(true) },
        { name: "Privacy Policy", path: "/policy" },
        { name: "Terms & Conditions", path: "/terms" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", path: "/contact" },
        { name: "Cancellation & Refund", path: "/refund" },
        { name: "Shipping & Delivery", path: "/shipping" },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {/* Brand */}
          <div className="md:col-span-2 flex flex-col items-start pb-2 md:pb-0">
            <div className="flex items-center space-x-3 mb-1.5">
              <MessageSquare className="w-5 h-5 text-blue-400" />
              <span className="text-base md:text-lg font-bold">ConversAI Labs</span>
              <Image
                src="https://eleven-public-cdn.elevenlabs.io/payloadcms/cy7rxce8uki-IIElevenLabsGrants%201.webp"
                alt="ElevenLabs"
                width={140}
                height={56}
                className="object-contain"
              />
            </div>
            <p className="text-gray-400 mb-1.5 text-xs leading-relaxed">
              No-code AI agent builder. Create intelligent voice bots that<br /> qualify leads 24/7 across voice,
             WhatsApp,and  <br />email.
            </p>
            <p className="text-gray-400 mb-2 text-xs">
              Email: connect@conversailabs.com
            </p>
            <div className="flex space-x-2">
              <a
                href="https://www.linkedin.com/company/conversailabs/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <span className="text-xs font-semibold">Li</span>
              </a>
              <div className="w-7 h-7 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                <span className="text-xs font-semibold">Tw</span>
              </div>
              <div className="w-7 h-7 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                <span className="text-xs font-semibold">Yt</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-sm font-semibold mb-2 text-white">{section.title}</h3>
              <ul className="space-y-1.5">
                {(section.links as { name: string; path: string; onClick?: () => void }[]).map((linkObj, i) => (
                  <li key={i}>
                    {linkObj.onClick ? (
                      <button
                        onClick={linkObj.onClick}
                        className="text-gray-400 hover:text-white transition-colors text-xs block"
                      >
                        {linkObj.name}
                      </button>
                    ) : linkObj.path.startsWith('http') ? (
                      <a
                        href={linkObj.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors text-xs block"
                      >
                        {linkObj.name}
                      </a>
                    ) : (
                      <Link
                        href={linkObj.path}
                        className="text-gray-400 hover:text-white transition-colors text-xs block"
                      >
                        {linkObj.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-3 pt-2 flex flex-col md:flex-row md:justify-between md:items-center gap-2">
          <p className="text-gray-400 text-xs text-center md:text-left">
            © 2024 ConversAI Labs. All rights reserved.
          </p>
          <div className="text-gray-400 text-xs text-center md:text-right">
            Built with ❤️ for businesses everywhere
          </div>
        </div>
      </div>
      
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </footer>
  );
};

export default Footer;
