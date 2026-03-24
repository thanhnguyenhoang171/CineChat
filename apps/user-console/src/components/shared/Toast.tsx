'use client';

import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ToastType = 'success' | 'error';

interface ToastProps {
  message: string;
  type?: ToastType;
  onClose: () => void;
}

export const Toast = ({ message, type = 'success', onClose }: ToastProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 50, x: '-50%' }}
    animate={{ opacity: 1, y: 0, x: '-50%' }}
    exit={{ opacity: 0, y: 20, x: '-50%' }}
    className={cn(
      'fixed bottom-10 left-1/2 z-[500] px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border font-bold text-sm min-w-[300px] justify-between',
      type === 'success' ? 'bg-emerald-500 border-emerald-400 text-white' : 'bg-destructive border-destructive/50 text-white'
    )}
  >
    <div className='flex items-center gap-2'>
       {type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
       {message}
    </div>
    <button onClick={onClose} className='hover:opacity-70 transition-opacity'><X size={16} /></button>
  </motion.div>
);
