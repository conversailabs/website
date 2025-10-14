'use client';

import { Calendar, Clock } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { motion } from 'framer-motion';

export interface AvailabilitySlot {
  time: string;
  formatted: string;
}

export interface AvailabilityData {
  date: string;
  slots: AvailabilitySlot[];
}

interface BookingAvailabilityCardProps {
  data: AvailabilityData;
}

export function BookingAvailabilityCard({ data }: BookingAvailabilityCardProps) {
  const formattedDate = format(parseISO(data.date), 'EEEE, MMMM d, yyyy');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="my-4 p-5 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 rounded-xl border-2 border-blue-200 shadow-md"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <Calendar className="w-5 h-5 text-white" />
        </div>
        <div>
          <h4 className="font-bold text-gray-900">Available Time Slots</h4>
          <p className="text-sm text-gray-600">{formattedDate}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {data.slots.map((slot, index) => (
          <motion.div
            key={slot.time}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            className="flex items-center gap-2 px-3 py-2.5 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all"
          >
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-semibold text-gray-700">
              {slot.formatted}
            </span>
          </motion.div>
        ))}
      </div>

      <p className="text-xs text-gray-500 mt-3 text-center">
        Tell me which time works best for you
      </p>
    </motion.div>
  );
}
