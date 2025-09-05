'use client';

import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set target date to end of July 2025
    const targetDate = new Date('2025-07-31T23:59:59');
    
    const updateTimer = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 rounded-lg mb-6">
      <div className="flex items-center justify-center gap-2 mb-3">
        <Clock className="w-5 h-5" />
        <span className="font-bold text-lg">July Special Ends In:</span>
      </div>
      
      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="bg-white/20 rounded-lg p-2">
          <div className="text-2xl font-bold">{timeLeft.days}</div>
          <div className="text-xs uppercase tracking-wider">Days</div>
        </div>
        <div className="bg-white/20 rounded-lg p-2">
          <div className="text-2xl font-bold">{timeLeft.hours}</div>
          <div className="text-xs uppercase tracking-wider">Hours</div>
        </div>
        <div className="bg-white/20 rounded-lg p-2">
          <div className="text-2xl font-bold">{timeLeft.minutes}</div>
          <div className="text-xs uppercase tracking-wider">Minutes</div>
        </div>
        <div className="bg-white/20 rounded-lg p-2">
          <div className="text-2xl font-bold">{timeLeft.seconds}</div>
          <div className="text-xs uppercase tracking-wider">Seconds</div>
        </div>
      </div>
      
      <div className="text-center mt-3 text-sm opacity-90">
        🔥 Save ₹2,000/month with this limited-time offer!
      </div>
    </div>
  );
};

export default CountdownTimer;