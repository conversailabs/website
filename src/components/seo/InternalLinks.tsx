'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface RelatedLink {
  title: string;
  description: string;
  href: string;
  category?: string;
}

interface InternalLinksProps {
  links: RelatedLink[];
  title?: string;
  className?: string;
}

export default function InternalLinks({ links, title = "Related Resources", className = "" }: InternalLinksProps) {
  return (
    <section className={`py-12 bg-gray-50 ${className}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">{title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group"
              >
                {link.category && (
                  <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2 block">
                    {link.category}
                  </span>
                )}
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
                    {link.title}
                  </h3>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
                </div>
                <p className="text-gray-600 text-sm">{link.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Pre-configured link sets for different pages
export const productLinks: RelatedLink[] = [
  {
    title: "AI Operator",
    description: "Autonomous voice AI phone agents for 24/7 customer operations",
    href: "/ai-operator",
    category: "Product"
  },
  {
    title: "CallIQ",
    description: "Conversation intelligence platform for insights and analytics",
    href: "/call-iq",
    category: "Product"
  },
  {
    title: "SmartDesk",
    description: "AI-powered customer support and helpdesk automation",
    href: "/smartdesk",
    category: "Product"
  }
];

export const industryLinks: RelatedLink[] = [
  {
    title: "Healthcare & Wellness",
    description: "HIPAA-compliant AI agents for patient care and appointments",
    href: "/industries/healthcare-and-wellness",
    category: "Industry"
  },
  {
    title: "Real Estate",
    description: "AI agents for property inquiries and tenant management",
    href: "/industries/real-estate-and-housing",
    category: "Industry"
  },
  {
    title: "Education",
    description: "AI assistants for student support and admissions",
    href: "/industries/education",
    category: "Industry"
  },
  {
    title: "Finance & Legal",
    description: "Secure consultations and compliance-ready client management",
    href: "/industries/finance-and-legal",
    category: "Industry"
  },
  {
    title: "Home Services",
    description: "Emergency response and booking automation",
    href: "/industries/home-services",
    category: "Industry"
  },
  {
    title: "View All Industries",
    description: "Explore AI solutions for 12+ industries",
    href: "/industries",
    category: "Industry"
  }
];

export const resourceLinks: RelatedLink[] = [
  {
    title: "Pricing Plans",
    description: "Transparent pricing with 14-day free trial",
    href: "/pricing",
    category: "Resources"
  },
  {
    title: "Schedule a Demo",
    description: "See our AI agents in action",
    href: "/demo",
    category: "Resources"
  },
  {
    title: "Contact Sales",
    description: "Get in touch with our team",
    href: "/contact",
    category: "Resources"
  },
  {
    title: "About Us",
    description: "Learn about our mission and team",
    href: "/about",
    category: "Company"
  }
];

// Component for product cross-linking
export function ProductCrossLinks({ currentProduct }: { currentProduct: string }) {
  const otherProducts = productLinks.filter(p => !p.href.includes(currentProduct));

  return (
    <InternalLinks
      links={otherProducts}
      title="Explore Other Products"
      className="bg-white"
    />
  );
}

// Component for industry cross-linking
export function IndustryCrossLinks({ excludeIndustry }: { excludeIndustry?: string }) {
  const links = excludeIndustry
    ? industryLinks.filter(i => !i.href.includes(excludeIndustry))
    : industryLinks;

  return (
    <InternalLinks
      links={links.slice(0, 6)}
      title="Other Industries We Serve"
    />
  );
}

// Breadcrumb component
interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6" aria-label="Breadcrumb">
      <Link href="/" className="hover:text-blue-600 transition-colors">
        Home
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <span className="text-gray-400">/</span>
          {item.href ? (
            <Link href={item.href} className="hover:text-blue-600 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
