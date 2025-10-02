'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'success' | 'error';
  title?: string;
  message?: string;
  actionLabel?: string;
  autoCloseDelay?: number;
}

export default function StatusModal({
  isOpen,
  onClose,
  type,
  title,
  message,
  actionLabel,
  autoCloseDelay = 0
}: StatusModalProps) {
  const [isIconAnimated, setIsIconAnimated] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsIconAnimated(false);
      const timer = setTimeout(() => setIsIconAnimated(true), 100);

      if (autoCloseDelay > 0) {
        const closeTimer = setTimeout(() => {
          onClose();
        }, autoCloseDelay);

        return () => {
          clearTimeout(timer);
          clearTimeout(closeTimer);
        };
      }

      return () => clearTimeout(timer);
    }
  }, [isOpen, autoCloseDelay, onClose]);

  const isSuccess = type === 'success';

  const defaultTitle = isSuccess ? 'Success!' : 'Error!';
  const defaultMessage = isSuccess
    ? "We've confirmed your submission. Thank you!"
    : "We're Sorry! Something went wrong, and we were unable to complete your request.";
  const defaultActionLabel = isSuccess ? 'Continue' : 'Try Again';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-[101] p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{
                type: "spring",
                duration: 0.5,
                bounce: 0.3
              }}
              className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Content */}
              <div className="px-8 py-12 text-center">
                {/* Animated Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: isIconAnimated ? 1 : 0 }}
                  transition={{
                    type: "spring",
                    duration: 0.6,
                    bounce: 0.5,
                    delay: 0.1
                  }}
                  className="mx-auto mb-6 relative"
                  style={{ width: '80px', height: '80px' }}
                >
                  {/* Glow Effect */}
                  <div
                    className={`absolute inset-0 rounded-full blur-2xl opacity-60 ${
                      isSuccess ? 'bg-green-400' : 'bg-red-400'
                    }`}
                  />

                  {/* Icon Circle */}
                  <div
                    className={`relative w-full h-full rounded-full flex items-center justify-center ${
                      isSuccess
                        ? 'bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/50'
                        : 'bg-gradient-to-br from-red-500 to-rose-600 shadow-lg shadow-red-500/50'
                    }`}
                  >
                    {isSuccess ? (
                      <Check className="w-10 h-10 text-white" strokeWidth={3} />
                    ) : (
                      <X className="w-10 h-10 text-white" strokeWidth={3} />
                    )}
                  </div>
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="text-3xl font-bold text-gray-900 mb-4"
                >
                  {title || defaultTitle}
                </motion.h2>

                {/* Message */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  className="text-gray-600 mb-8 leading-relaxed"
                >
                  {message || defaultMessage}
                </motion.p>

                {/* Action Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  <Button
                    onClick={onClose}
                    className={`w-full h-12 text-base font-semibold rounded-xl shadow-lg transition-all ${
                      isSuccess
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-green-500/30 hover:shadow-green-500/50'
                        : 'bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white shadow-red-500/30 hover:shadow-red-500/50'
                    }`}
                  >
                    {actionLabel || defaultActionLabel}
                  </Button>
                </motion.div>
              </div>

              {/* Bottom Colored Bar */}
              <div
                className={`h-2 w-full ${
                  isSuccess
                    ? 'bg-gradient-to-r from-green-500 via-emerald-500 to-green-500'
                    : 'bg-gradient-to-r from-red-500 via-rose-500 to-red-500'
                }`}
              />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
