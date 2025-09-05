import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "ConversAI Labs helped us triple our qualified demo bookings—without hiring more SDRs.",
      author: "Sarah Chen",
      title: "VP of Sales",
      company: "TechFlow Solutions",
      rating: 5
    },
    {
      quote: "Our response time went from hours to seconds. Leads now feel heard—instantly.",
      author: "Marcus Rodriguez",
      title: "Marketing Director",
      company: "GrowthCorp",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 300}ms` }}
            >
              <Quote className="w-8 h-8 text-blue-600 mb-4" />
              
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-lg text-gray-700 mb-6 italic">
                &quot;{testimonial.quote}&quot;
              </p>
              
              <div>
                <p className="font-semibold text-gray-900">{testimonial.author}</p>
                <p className="text-gray-600">{testimonial.title}</p>
                <p className="text-blue-600 font-medium">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
