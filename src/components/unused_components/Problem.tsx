import React from 'react';
import { Clock, Users, MessageSquare, TrendingDown } from 'lucide-react';

const Problem = () => {
  const painPoints = [
    {
      icon: Clock,
      title: "Manual follow-ups waste time and miss leads",
      description: "Sales teams spend hours on repetitive tasks instead of closing deals"
    },
    {
      icon: MessageSquare,
      title: "Disconnected channels mean missed context",
      description: "Fragmented conversations across phone, email, and messaging platforms"
    },
    {
      icon: Users,
      title: "Too much time qualifying unfit prospects",
      description: "Sales reps waste energy on leads that will never convert"
    },
    {
      icon: TrendingDown,
      title: "Slow responses = lost business",
      description: "Every minute of delay decreases conversion probability by 10%"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Don&apos;t Let Leads Slip Through the Cracks
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {painPoints.map((point, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <point.icon className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {point.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-xl font-semibold mb-4">
            What if you had an AI teammate that never sleeps, works across every channel, and keeps every lead moving forward?
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
