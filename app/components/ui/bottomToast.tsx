// components/ui/BottomToast.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ToastProps = {
  message: string;
  type?: 'success' | 'error';
  duration?: number;
  onClose?: () => void;
};

export function BottomToast({
  message,
  type = 'success',
  duration = 4000,
  onClose,
}: ToastProps) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          onClose?.();
          return 0;
        }
        return prev - 100 / (duration / 16.67); // approx 60fps
      });
    }, 16.67);
    return () => clearInterval(interval);
  }, [duration, onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 100, opacity: 0 }}
        className={`fixed bottom-5 right-5 z-50 px-6 py-4 rounded-lg shadow-lg text-white ${
          type === 'success' ? 'bg-green-600' : 'bg-red-600'
        }`}
      >
        <p>{message}</p>
        <motion.div
          className="h-1 bg-white mt-2 rounded"
          style={{ width: `${progress}%` }}
          transition={{ ease: 'linear' }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
