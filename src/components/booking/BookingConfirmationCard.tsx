'use client';

import { CheckCircle, Calendar, Clock, Mail, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export interface Booking {
  id: string;
  date: string;
  time: string;
  formatted_time: string;
  duration: number;
  email: string;
  calendar_link?: string;
  name?: string;
}

interface BookingConfirmationCardProps {
  booking: Booking;
}

export function BookingConfirmationCard({ booking }: BookingConfirmationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', duration: 0.6 }}
      className="my-6 p-6 bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 rounded-2xl border-2 border-green-400 shadow-xl"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2, duration: 0.5 }}
            className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg"
          >
            <CheckCircle className="w-8 h-8 text-white" />
          </motion.div>
        </div>

        <div className="flex-1">
          <motion.h3
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl font-bold text-gray-900 mb-3"
          >
            Appointment Confirmed!
          </motion.h3>

          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-3 text-sm text-gray-700"
            >
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-green-600" />
              </div>
              <span className="font-semibold">{booking.formatted_time}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3 text-sm text-gray-700"
            >
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-green-600" />
              </div>
              <span>{booking.duration} minutes</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-3 text-sm text-gray-700"
            >
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Mail className="w-4 h-4 text-green-600" />
              </div>
              <span>Confirmation sent to {booking.email}</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-5 flex flex-wrap gap-3"
          >
            {booking.calendar_link && (
              <Button
                asChild
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md"
              >
                <a
                  href={booking.calendar_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Add to Calendar
                </a>
              </Button>
            )}

            <Button
              variant="outline"
              className="border-green-300 text-green-700 hover:bg-green-50"
            >
              View Details
            </Button>
          </motion.div>

          <p className="text-xs text-gray-500 mt-4 italic">
            You will receive a calendar invite and reminder emails before your appointment.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
