'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Phone, Calendar } from 'lucide-react';
import { VoiceBooking } from './VoiceBooking';
import { ManualBooking } from './ManualBooking';

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type BookingMode = 'selection' | 'voice' | 'manual';

export function BookingDialog({ open, onOpenChange }: BookingDialogProps) {
  const [mode, setMode] = useState<BookingMode>('selection');

  const handleClose = () => {
    setMode('selection');
    onOpenChange(false);
  };

  const handleBack = () => {
    setMode('selection');
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden p-0">
        {mode === 'selection' && (
          <div className="p-8">
            <DialogHeader className="mb-8">
              <DialogTitle className="text-3xl font-bold text-center">
                Book Your Demo
              </DialogTitle>
              <p className="text-center text-gray-600 mt-2">
                Choose how you&apos;d like to schedule your appointment
              </p>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Voice Booking Option */}
              <button
                onClick={() => setMode('voice')}
                className="group relative p-8 border-2 border-gray-200 rounded-2xl hover:border-blue-500 hover:shadow-xl transition-all duration-300 text-left"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Phone className="w-10 h-10 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Talk to Our AI Assistant
                  </h3>

                  <p className="text-gray-600 text-sm mb-4">
                    Have a natural conversation and book your appointment through voice
                  </p>

                  <ul className="text-left text-sm text-gray-500 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      Live voice conversation
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      Real-time transcription
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      Instant booking confirmation
                    </li>
                  </ul>
                </div>
              </button>

              {/* Manual Booking Option */}
              <button
                onClick={() => setMode('manual')}
                className="group relative p-8 border-2 border-gray-200 rounded-2xl hover:border-green-500 hover:shadow-xl transition-all duration-300 text-left"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Calendar className="w-10 h-10 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Manual Calendar Booking
                  </h3>

                  <p className="text-gray-600 text-sm mb-4">
                    Select your preferred date and time from our calendar
                  </p>

                  <ul className="text-left text-sm text-gray-500 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                      View all available slots
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                      Choose your timezone
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                      Traditional booking form
                    </li>
                  </ul>
                </div>
              </button>
            </div>
          </div>
        )}

        {mode === 'voice' && (
          <VoiceBooking onBack={handleBack} onClose={handleClose} />
        )}

        {mode === 'manual' && (
          <ManualBooking onBack={handleBack} onClose={handleClose} />
        )}
      </DialogContent>
    </Dialog>
  );
}
