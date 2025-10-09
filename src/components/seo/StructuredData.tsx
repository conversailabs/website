'use client';

import React from 'react';

interface ProductSchemaProps {
  name: string;
  description: string;
  url: string;
  image?: string;
  offers?: {
    price: string;
    priceCurrency: string;
    availability: string;
  };
}

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
}

interface StructuredDataProps {
  type: 'organization' | 'product' | 'faq' | 'website';
  data?: ProductSchemaProps | FAQSchemaProps;
}

export const OrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ConversAI Labs",
    "alternateName": "ConversAI",
    "url": "https://conversailabs.com",
    "logo": "https://conversailabs.com/icon.svg",
    "description": "ConversAI Labs helps businesses automate conversations with AI across voice, WhatsApp, email and more, increasing customer satisfaction and reducing response times.",
    "foundingDate": "2024",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91",
      "contactType": "customer service",
      "email": "connect@conversailabs.com",
      "areaServed": "Worldwide",
      "availableLanguage": ["English", "Hindi"]
    },
    "sameAs": [
      "https://www.linkedin.com/company/conversailabs/"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export const WebsiteSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ConversAI Labs",
    "url": "https://conversailabs.com",
    "description": "Voice AI Platform for Customer Operations",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://conversailabs.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export const ProductSchema = ({ name, description, url, image, offers }: ProductSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": name,
    "description": description,
    "url": url,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": offers ? {
      "@type": "Offer",
      "price": offers.price,
      "priceCurrency": offers.priceCurrency,
      "availability": `https://schema.org/${offers.availability}`,
      "url": url
    } : undefined,
    "image": image || "https://conversailabs.com/og-image.jpg",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "50",
      "bestRating": "5",
      "worstRating": "1"
    },
    "provider": {
      "@type": "Organization",
      "name": "ConversAI Labs",
      "url": "https://conversailabs.com"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export const FAQSchema = ({ faqs }: FAQSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export const BreadcrumbSchema = ({ items }: BreadcrumbSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export const LocalBusinessSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "ConversAI Labs",
    "description": "Voice AI Platform for Customer Operations",
    "url": "https://conversailabs.com",
    "telephone": "+91",
    "email": "connect@conversailabs.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "addressCountry": "IN"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "priceRange": "₹₹",
    "image": "https://conversailabs.com/og-image.jpg"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default function StructuredData({ type, data }: StructuredDataProps) {
  switch (type) {
    case 'organization':
      return <OrganizationSchema />;
    case 'website':
      return <WebsiteSchema />;
    case 'product':
      if (data && 'name' in data) {
        return <ProductSchema {...(data as ProductSchemaProps)} />;
      }
      return null;
    case 'faq':
      if (data && 'faqs' in data) {
        return <FAQSchema {...(data as FAQSchemaProps)} />;
      }
      return null;
    default:
      return null;
  }
}
